from __future__ import annotations

import json
import math
import os
from datetime import datetime, timezone
from typing import Any, Mapping, Sequence

import gspread
import pandas as pd
import requests
from google.oauth2.service_account import Credentials

from .core import Holding, Signal, as_number, clean_config


SIGNAL_HEADERS = [
    "UpdatedAt", "종목명", "Symbol", "보유수량", "Price", "DailyTrend", "Trend60m",
    "MA20", "MA30", "MA60", "RSI14", "RVOL20", "Support", "Resistance",
    "BollingerPos", "BuyScore", "SellScore", "Action", "DataProvider", "BarTime", "Status",
]


def open_spreadsheet() -> gspread.Spreadsheet:
    raw = os.environ.get("GOOGLE_SERVICE_ACCOUNT_JSON", "").strip()
    sheet_id = os.environ.get("GOOGLE_SHEET_ID", "").strip()
    if not raw or not sheet_id:
        raise RuntimeError("Google Sheet secrets are not configured")
    try:
        info = json.loads(raw)
    except json.JSONDecodeError as exc:
        raise RuntimeError("Invalid Google service account JSON") from exc
    scopes = [
        "https://www.googleapis.com/auth/spreadsheets",
        "https://www.googleapis.com/auth/drive.readonly",
    ]
    creds = Credentials.from_service_account_info(info, scopes=scopes)
    return gspread.authorize(creds).open_by_key(sheet_id)


def load_config(spreadsheet: gspread.Spreadsheet) -> dict[str, Any]:
    try:
        rows = spreadsheet.worksheet("QuantConfig").get_all_records()
    except gspread.WorksheetNotFound:
        return clean_config({})
    return clean_config({
        str(row.get("Key", "")).strip(): row.get("Value")
        for row in rows if str(row.get("Key", "")).strip()
    })


def load_holdings(spreadsheet: gspread.Spreadsheet, cfg: Mapping[str, Any]) -> list[Holding]:
    rows = spreadsheet.worksheet("투자종목").get_all_records()
    market_filter = str(cfg["market_filter"]).strip()
    holdings, seen = [], set()
    for row in rows:
        symbol = str(row.get("종목", "")).strip().upper()
        market = str(row.get("시장", "")).strip()
        qty = as_number(row.get("수량"))
        if market != market_filter or qty <= 0 or not symbol or symbol in seen:
            continue
        if not symbol.replace(".", "").replace("-", "").isalnum():
            continue
        seen.add(symbol)
        holdings.append(Holding(
            name=str(row.get("종목명", "")).strip() or symbol,
            symbol=symbol,
            quantity=qty,
        ))
    return holdings


class AlpacaProvider:
    name = "alpaca-sip-delayed"

    def __init__(self) -> None:
        key = os.environ.get("ALPACA_API_KEY", "").strip()
        secret = os.environ.get("ALPACA_SECRET_KEY", "").strip()
        if not key or not secret:
            raise RuntimeError("Alpaca API secrets are not configured")
        self.session = requests.Session()
        self.session.headers.update({
            "APCA-API-KEY-ID": key,
            "APCA-API-SECRET-KEY": secret,
        })
        self.url = "https://data.alpaca.markets/v2/stocks/bars"

    def fetch_many(self, symbols: Sequence[str], timeframe: str,
                   start: datetime, end: datetime) -> dict[str, pd.DataFrame]:
        base = {
            "symbols": ",".join(symbols),
            "timeframe": timeframe,
            "start": start.astimezone(timezone.utc).isoformat().replace("+00:00", "Z"),
            "end": end.astimezone(timezone.utc).isoformat().replace("+00:00", "Z"),
            "adjustment": "split",
            "feed": "sip",
            "sort": "asc",
            "limit": 10000,
        }
        buckets = {symbol: [] for symbol in symbols}
        token = None
        while True:
            params = dict(base)
            if token:
                params["page_token"] = token
            response = self.session.get(self.url, params=params, timeout=30)
            response.raise_for_status()
            payload = response.json()
            for symbol, bars in (payload.get("bars") or {}).items():
                if symbol in buckets:
                    buckets[symbol].extend(bars)
            token = payload.get("next_page_token")
            if not token:
                break

        result = {}
        for symbol, bars in buckets.items():
            if not bars:
                result[symbol] = pd.DataFrame()
                continue
            frame = pd.DataFrame(bars).rename(columns={
                "t": "timestamp", "o": "open", "h": "high",
                "l": "low", "c": "close", "v": "volume",
            })
            frame["timestamp"] = pd.to_datetime(frame["timestamp"], utc=True)
            result[symbol] = (
                frame[["timestamp", "open", "high", "low", "close", "volume"]]
                .dropna().sort_values("timestamp").drop_duplicates("timestamp")
                .reset_index(drop=True)
            )
        return result


def _fmt(value: float, digits: int = 2) -> Any:
    if value is None or math.isnan(value) or math.isinf(value):
        return ""
    return round(value, digits)


def signal_row(signal: Signal, updated_at: str) -> list[Any]:
    qty = int(signal.quantity) if float(signal.quantity).is_integer() else round(signal.quantity, 4)
    return [
        updated_at, signal.name, signal.symbol, qty, _fmt(signal.price, 4),
        signal.daily_trend, signal.trend_60m, _fmt(signal.ma20, 4),
        _fmt(signal.ma30, 4), _fmt(signal.ma60, 4), _fmt(signal.rsi14, 2),
        _fmt(signal.rvol20, 2), _fmt(signal.support, 4), _fmt(signal.resistance, 4),
        signal.bollinger_pos, signal.buy_score, signal.sell_score, signal.action,
        signal.provider, signal.bar_time, signal.status,
    ]


def write_signals(spreadsheet: gspread.Spreadsheet, signals: Sequence[Signal],
                  failure_count: int) -> None:
    ws = spreadsheet.worksheet("QuantSignal")
    now = datetime.now(timezone.utc).isoformat()
    rows = [SIGNAL_HEADERS] + [signal_row(s, now) for s in signals]
    if failure_count:
        rows.append([now] + [""] * 19 + [f"{failure_count} symbol(s) failed"])
    ws.clear()
    ws.update(rows, "A1", value_input_option="RAW")
    ws.format("A1:U1", {
        "backgroundColor": {"red": 0.9, "green": 0.93, "blue": 0.98},
        "textFormat": {"bold": True},
    })
