from __future__ import annotations

import math
from typing import Any

import numpy as np
import pandas as pd


RETURN_WINDOWS = {
    "ret_2d": 2,
    "ret_10d": 10,
    "ret_1m": 21,
    "ret_3m": 63,
    "ret_6m": 126,
}

MODEL_WEIGHTS = {
    "STABLE": {
        "ret_6m": 0.30, "ret_3m": 0.25, "ret_1m": 0.15, "ret_10d": 0.05,
        "ret_2d": 0.02, "rs_3m": 0.10, "trend_score": 0.08, "rvol20": 0.05,
    },
    "TECH_GROWTH": {
        "ret_6m": 0.10, "ret_3m": 0.25, "ret_1m": 0.20, "ret_10d": 0.12,
        "ret_2d": 0.05, "rs_3m": 0.15, "trend_score": 0.08, "rvol20": 0.05,
    },
    "EARLY_REVIEW": {
        "ret_6m": 0.05, "ret_3m": 0.20, "ret_1m": 0.25, "ret_10d": 0.15,
        "ret_2d": 0.07, "rs_3m": 0.13, "trend_score": 0.05, "rvol20": 0.10,
    },
    "GROWTH": {
        "ret_6m": 0.18, "ret_3m": 0.25, "ret_1m": 0.20, "ret_10d": 0.10,
        "ret_2d": 0.04, "rs_3m": 0.13, "trend_score": 0.07, "rvol20": 0.03,
    },
    "CYCLICAL": {
        "ret_6m": 0.25, "ret_3m": 0.25, "ret_1m": 0.15, "ret_10d": 0.08,
        "ret_2d": 0.02, "rs_3m": 0.12, "trend_score": 0.08, "rvol20": 0.05,
    },
    "REVIEW": {
        "ret_6m": 0.18, "ret_3m": 0.22, "ret_1m": 0.18, "ret_10d": 0.10,
        "ret_2d": 0.04, "rs_3m": 0.13, "trend_score": 0.08, "rvol20": 0.07,
    },
}

MIN_COVERAGE = {
    "STABLE": 0.80,
    "TECH_GROWTH": 0.65,
    "EARLY_REVIEW": 0.50,
    "GROWTH": 0.70,
    "CYCLICAL": 0.70,
    "REVIEW": 0.70,
}


def _return(close: pd.Series, sessions: int) -> float:
    if len(close) <= sessions:
        return math.nan
    old = float(close.iloc[-1 - sessions])
    new = float(close.iloc[-1])
    if old <= 0:
        return math.nan
    return new / old - 1.0


def symbol_metrics(frame: pd.DataFrame) -> dict[str, float]:
    if frame is None or frame.empty:
        return {}
    work = frame.dropna(subset=["close"]).sort_values("timestamp").drop_duplicates("timestamp")
    if work.empty:
        return {}

    close = work["close"].astype(float)
    volume = work["volume"].astype(float)
    out: dict[str, float] = {"price": float(close.iloc[-1])}
    for key, sessions in RETURN_WINDOWS.items():
        out[key] = _return(close, sessions)

    out["ma30"] = float(close.tail(30).mean()) if len(close) >= 30 else math.nan
    out["ma60"] = float(close.tail(60).mean()) if len(close) >= 60 else math.nan

    if len(volume) >= 21:
        base = float(volume.iloc[-21:-1].mean())
        out["rvol20"] = float(volume.iloc[-1]) / base if base > 0 else math.nan
    else:
        out["rvol20"] = math.nan

    price, ma30, ma60 = out["price"], out["ma30"], out["ma60"]
    if math.isnan(ma30):
        out["trend_score"] = math.nan
    elif math.isnan(ma60):
        out["trend_score"] = 0.5 if price > ma30 else 0.0
    else:
        out["trend_score"] = (0.5 if price > ma30 else 0.0) + (0.5 if ma30 > ma60 else 0.0)
    out["above_ma30"] = float(not math.isnan(ma30) and price > ma30)
    return out


def add_relative_strength(frame: pd.DataFrame, spy_metrics: dict[str, float]) -> pd.DataFrame:
    result = frame.copy()
    for window in ("ret_1m", "ret_3m", "ret_6m"):
        benchmark = spy_metrics.get(window, math.nan)
        result[f"rs_{window[4:]}"] = result[window] - benchmark if not math.isnan(benchmark) else math.nan
    return result


def score_candidates(frame: pd.DataFrame) -> pd.DataFrame:
    result = frame.copy()
    rank_metrics = ["ret_6m", "ret_3m", "ret_1m", "ret_10d", "ret_2d", "rs_3m", "rvol20"]
    for metric in rank_metrics:
        result[f"{metric}_rank"] = result[metric].rank(pct=True, method="average")

    scores, coverages = [], []
    for _, row in result.iterrows():
        model = str(row.get("discoveryModel") or "REVIEW")
        weights = MODEL_WEIGHTS.get(model, MODEL_WEIGHTS["REVIEW"])
        total_weight = sum(weights.values())
        available_weight = 0.0
        weighted = 0.0

        for metric, weight in weights.items():
            if metric == "trend_score":
                value = row.get(metric)
            else:
                value = row.get(f"{metric}_rank")
            if value is None or pd.isna(value):
                continue
            available_weight += weight
            weighted += float(value) * weight

        coverage = available_weight / total_weight if total_weight else 0.0
        base = weighted / available_weight if available_weight else 0.0
        min_coverage = MIN_COVERAGE.get(model, 0.70)
        penalty = min(1.0, coverage / min_coverage) if min_coverage else 1.0
        scores.append(round(base * penalty * 100.0, 2))
        coverages.append(round(coverage, 3))

    result["preScore"] = scores
    result["dataCoverage"] = coverages
    result["allPositive"] = (
        (result["ret_6m"] > 0) & (result["ret_3m"] > 0) &
        (result["ret_1m"] > 0) & (result["ret_2d"] > 0)
    )
    return result


def aggregate_clusters(frame: pd.DataFrame) -> pd.DataFrame:
    if frame.empty:
        return pd.DataFrame()
    rows: list[dict[str, Any]] = []
    for (macro, cluster), group in frame.groupby(["macroSector", "investmentCluster"], dropna=False):
        valid = group.dropna(subset=["price"])
        if valid.empty:
            continue

        def breadth(col: str) -> float:
            s = valid[col].dropna()
            return float((s > 0).mean()) if len(s) else math.nan

        b3 = breadth("ret_3m")
        b1 = breadth("ret_1m")
        b10 = breadth("ret_10d")
        bma = float(valid["above_ma30"].dropna().mean()) if valid["above_ma30"].notna().any() else math.nan
        median_score = float(valid["preScore"].median())
        pieces = [(b3, 0.25), (b1, 0.25), (b10, 0.15), (bma, 0.15), (median_score / 100.0, 0.20)]
        denom = sum(w for v, w in pieces if not pd.isna(v))
        fast = sum(v * w for v, w in pieces if not pd.isna(v)) / denom if denom else math.nan
        top = valid.sort_values("preScore", ascending=False)["ticker"].head(5).tolist()

        rows.append({
            "macroSector": macro,
            "investmentCluster": cluster,
            "members": int(len(group)),
            "validMembers": int(len(valid)),
            "medianPreScore": round(median_score, 2),
            "breadth3M": b3,
            "breadth1M": b1,
            "breadth10D": b10,
            "breadthAboveMA30": bma,
            "median3M": float(valid["ret_3m"].median()) if valid["ret_3m"].notna().any() else math.nan,
            "median1M": float(valid["ret_1m"].median()) if valid["ret_1m"].notna().any() else math.nan,
            "fastRotationScore": round(fast * 100.0, 2) if not pd.isna(fast) else math.nan,
            "topCandidates": ",".join(top),
        })
    return pd.DataFrame(rows).sort_values("fastRotationScore", ascending=False, na_position="last")
