from __future__ import annotations

import json
import math
import os
import re
from datetime import datetime, timedelta, timezone
from typing import Any

import gspread
import pandas as pd
from google.oauth2.service_account import Credentials

from discovery.core import add_relative_strength, aggregate_clusters, score_candidates, symbol_metrics
from quant.io import AlpacaProvider


UNIVERSE_SHEET = "_DISCOVERY_UNIVERSE"
SIGNAL_SHEET = "_DISCOVERY_SIGNAL"
SECTOR_SHEET = "_SECTOR_SIGNAL"
STATUS_SHEET = "_DISCOVERY_SCAN_STATUS"

SIGNAL_HEADERS = [
    "UpdatedAt", "Ticker", "Name", "Model", "MacroSector", "InvestmentCluster", "ThemeTags",
    "RiskTier", "Price", "Return6M", "Return3M", "Return1M", "Return10D", "Return2D",
    "MA30", "MA60", "AboveMA30", "RS3MvsSPY", "RVOL20", "DataCoverage",
    "PreScore", "AllPositive", "Status",
]

SECTOR_HEADERS = [
    "UpdatedAt", "MacroSector", "InvestmentCluster", "Members", "ValidMembers",
    "MedianPreScore", "Breadth3M", "Breadth1M", "Breadth10D", "BreadthAboveMA30",
    "Median3M", "Median1M", "FastRotationScore", "TopCandidates",
]


def open_spreadsheet() -> gspread.Spreadsheet:
    raw = os.environ.get("GOOGLE_SERVICE_ACCOUNT_JSON", "").strip()
    sheet_id = os.environ.get("DISCOVERY_SHEET_ID", "").strip()
    if not raw or not sheet_id:
        raise RuntimeError("GOOGLE_SERVICE_ACCOUNT_JSON and DISCOVERY_SHEET_ID are required")
    info = json.loads(raw)
    scopes = [
        "https://www.googleapis.com/auth/spreadsheets",
        "https://www.googleapis.com/auth/drive.readonly",
    ]
    creds = Credentials.from_service_account_info(info, scopes=scopes)
    return gspread.authorize(creds).open_by_key(sheet_id)


def worksheet_or_create(book: gspread.Spreadsheet, title: str, rows: int, cols: int) -> gspread.Worksheet:
    try:
        return book.worksheet(title)
    except gspread.WorksheetNotFound:
        return book.add_worksheet(title=title, rows=rows, cols=cols)


def load_universe(book: gspread.Spreadsheet) -> pd.DataFrame:
    rows = book.worksheet(UNIVERSE_SHEET).get_all_records()
    frame = pd.DataFrame(rows)
    if frame.empty:
        raise RuntimeError("Discovery universe is empty")
    frame["ticker"] = frame["ticker"].astype(str).str.strip().str.upper()
    keep = (
        frame["ticker"].str.match(r"^[A-Z0-9.\-]{1,12}$", na=False)
        & frame["discoveryEligible"].astype(str).str.upper().eq("YES")
        & ~frame["discoveryModel"].astype(str).str.upper().eq("EXCLUDE")
    )
    frame = frame.loc[keep].drop_duplicates("ticker").copy()

    requested = os.environ.get("DISCOVERY_SYMBOLS", "").strip().upper()
    if requested:
        symbols = {s.strip() for s in requested.split(",") if s.strip()}
        frame = frame[frame["ticker"].isin(symbols)]
    else:
        max_symbols = int(os.environ.get("DISCOVERY_MAX_SYMBOLS", "0") or 0)
        if max_symbols > 0:
            frame = frame.sort_values("ticker").head(max_symbols)
    return frame


def fetch_daily(symbols: list[str]) -> dict[str, pd.DataFrame]:
    provider = AlpacaProvider()
    lookback_days = int(os.environ.get("DISCOVERY_LOOKBACK_DAYS", "240"))
    batch_size = max(10, min(100, int(os.environ.get("DISCOVERY_BATCH_SIZE", "75"))))
    end = datetime.now(timezone.utc)
    start = end - timedelta(days=lookback_days)
    result: dict[str, pd.DataFrame] = {}
    for i in range(0, len(symbols), batch_size):
        batch = symbols[i:i + batch_size]
        result.update(provider.fetch_many(batch, "1Day", start, end))
    return result


def pct(value: Any) -> Any:
    if value is None or pd.isna(value):
        return ""
    return round(float(value) * 100.0, 2)


def num(value: Any, digits: int = 4) -> Any:
    if value is None or pd.isna(value):
        return ""
    value = float(value)
    if math.isnan(value) or math.isinf(value):
        return ""
    return round(value, digits)


def build_metrics(universe: pd.DataFrame, bars: dict[str, pd.DataFrame], spy: dict[str, float]) -> pd.DataFrame:
    rows = []
    lookup = universe.set_index("ticker").to_dict("index")
    for ticker, meta in lookup.items():
        metrics = symbol_metrics(bars.get(ticker, pd.DataFrame()))
        row = {
            "ticker": ticker,
            "name": meta.get("name", ""),
            "discoveryModel": meta.get("discoveryModel", "REVIEW"),
            "macroSector": meta.get("macroSector", "Other"),
            "investmentCluster": meta.get("investmentCluster", "Other / Unclassified"),
            "themeTags": meta.get("themeTags", ""),
            "riskTier": meta.get("riskTier", ""),
        }
        row.update(metrics)
        rows.append(row)
    frame = pd.DataFrame(rows)
    for col in ["price", "ret_6m", "ret_3m", "ret_1m", "ret_10d", "ret_2d",
                "ma30", "ma60", "rvol20", "trend_score", "above_ma30"]:
        if col not in frame:
            frame[col] = math.nan
    frame = add_relative_strength(frame, spy)
    return score_candidates(frame)


def write_outputs(book: gspread.Spreadsheet, candidates: pd.DataFrame, sectors: pd.DataFrame,
                  universe_count: int, fetched_count: int, failed_count: int) -> None:
    now = datetime.now(timezone.utc).isoformat()
    top_n = max(50, int(os.environ.get("DISCOVERY_OUTPUT_TOP", "500")))
    output = candidates.sort_values("preScore", ascending=False).head(top_n)

    signal_rows = [SIGNAL_HEADERS]
    for _, r in output.iterrows():
        signal_rows.append([
            now, r["ticker"], r["name"], r["discoveryModel"], r["macroSector"],
            r["investmentCluster"], r["themeTags"], r["riskTier"], num(r["price"]),
            pct(r["ret_6m"]), pct(r["ret_3m"]), pct(r["ret_1m"]), pct(r["ret_10d"]),
            pct(r["ret_2d"]), num(r["ma30"]), num(r["ma60"]),
            "YES" if r.get("above_ma30") == 1 else "NO",
            pct(r.get("rs_3m")), num(r.get("rvol20"), 2), num(r["dataCoverage"], 3),
            num(r["preScore"], 2), "YES" if bool(r["allPositive"]) else "NO",
            "CANDIDATE" if r["preScore"] >= 70 else "WATCH",
        ])

    sector_rows = [SECTOR_HEADERS]
    if not sectors.empty:
        for _, r in sectors.iterrows():
            sector_rows.append([
                now, r["macroSector"], r["investmentCluster"], int(r["members"]),
                int(r["validMembers"]), num(r["medianPreScore"], 2), pct(r["breadth3M"]),
                pct(r["breadth1M"]), pct(r["breadth10D"]), pct(r["breadthAboveMA30"]),
                pct(r["median3M"]), pct(r["median1M"]), num(r["fastRotationScore"], 2),
                r["topCandidates"],
            ])

    sws = worksheet_or_create(book, SIGNAL_SHEET, max(600, len(signal_rows) + 50), len(SIGNAL_HEADERS))
    sws.clear()
    sws.update(signal_rows, "A1", value_input_option="RAW")
    sws.freeze(rows=1)

    cws = worksheet_or_create(book, SECTOR_SHEET, max(100, len(sector_rows) + 20), len(SECTOR_HEADERS))
    cws.clear()
    cws.update(sector_rows, "A1", value_input_option="RAW")
    cws.freeze(rows=1)

    status = [
        ["UpdatedAt", "UniverseSelected", "Fetched", "Failed", "CandidatesWritten", "SectorRows", "Mode"],
        [now, universe_count, fetched_count, failed_count, len(signal_rows) - 1,
         max(0, len(sector_rows) - 1), "symbols" if os.environ.get("DISCOVERY_SYMBOLS") else "universe"],
    ]
    st = worksheet_or_create(book, STATUS_SHEET, 30, 10)
    st.clear()
    st.update(status, "A1", value_input_option="RAW")
    st.freeze(rows=1)


def main() -> None:
    book = open_spreadsheet()
    universe = load_universe(book)
    symbols = universe["ticker"].tolist()
    if not symbols:
        raise RuntimeError("No eligible discovery symbols")

    requested = symbols + ([] if "SPY" in symbols else ["SPY"])
    bars = fetch_daily(requested)
    spy = symbol_metrics(bars.get("SPY", pd.DataFrame()))
    metrics = build_metrics(universe, bars, spy)
    sectors = aggregate_clusters(metrics)

    fetched = int(metrics["price"].notna().sum())
    failed = int(len(metrics) - fetched)
    write_outputs(book, metrics, sectors, len(universe), fetched, failed)
    print(json.dumps({
        "ok": True,
        "selected": len(universe),
        "fetched": fetched,
        "failed": failed,
        "sectorRows": 0 if sectors.empty else len(sectors),
    }))


if __name__ == "__main__":
    main()
