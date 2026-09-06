from __future__ import annotations

import math
from dataclasses import dataclass
from typing import Any, Mapping, Tuple

import numpy as np
import pandas as pd


DEFAULT_CONFIG = {
    "provider": "alpaca",
    "primary_timeframe": "60Min",
    "source_timeframe": "30Min",
    "secondary_timeframe": "1Day",
    "market_filter": "미국",
    "rsi_period": 14,
    "bb_period": 20,
    "bb_std": 2.0,
    "rvol_period": 20,
    "swing_window": 20,
    "buy_alert_threshold": 65,
    "sell_alert_threshold": 65,
    "support_proximity_pct": 2.0,
    "resistance_proximity_pct": 2.0,
    "rvol_high": 1.5,
}


@dataclass(frozen=True)
class Holding:
    name: str
    symbol: str
    quantity: float


@dataclass(frozen=True)
class Signal:
    name: str
    symbol: str
    quantity: float
    price: float
    daily_trend: str
    trend_60m: str
    ma20: float
    ma30: float
    ma60: float
    rsi14: float
    rvol20: float
    support: float
    resistance: float
    bollinger_pos: str
    buy_score: int
    sell_score: int
    action: str
    provider: str
    bar_time: str
    status: str


def as_number(value: Any, default: float = 0.0) -> float:
    if value in (None, ""):
        return default
    if isinstance(value, (int, float)):
        return float(value)
    text = str(value).strip().replace(",", "")
    for token in ("₩", "$", "%"):
        text = text.replace(token, "")
    try:
        return float(text)
    except ValueError:
        return default


def clean_config(raw: Mapping[str, Any]) -> dict[str, Any]:
    cfg = dict(DEFAULT_CONFIG)
    cfg.update({k: v for k, v in raw.items() if v not in (None, "")})
    for key in ("rsi_period", "bb_period", "rvol_period", "swing_window",
                "buy_alert_threshold", "sell_alert_threshold"):
        cfg[key] = int(float(cfg[key]))
    for key in ("bb_std", "support_proximity_pct",
                "resistance_proximity_pct", "rvol_high"):
        cfg[key] = float(cfg[key])
    return cfg


def resample_regular_60m(frame: pd.DataFrame) -> pd.DataFrame:
    """Align completed 60m bars to the 09:30 ET regular-session open."""
    if frame.empty:
        return frame.copy()
    df = frame.copy()
    ny_ts = df["timestamp"].dt.tz_convert("America/New_York")
    minute = ny_ts.dt.hour * 60 + ny_ts.dt.minute
    df = df[(minute >= 570) & (minute < 960)].copy()
    if df.empty:
        return df

    ny_ts = df["timestamp"].dt.tz_convert("America/New_York")
    minute = ny_ts.dt.hour * 60 + ny_ts.dt.minute
    df["_date"] = ny_ts.dt.date
    df["_bucket"] = ((minute - 570) // 60).astype(int)
    out = (
        df.groupby(["_date", "_bucket"], sort=True)
        .agg(
            timestamp=("timestamp", "min"),
            open=("open", "first"),
            high=("high", "max"),
            low=("low", "min"),
            close=("close", "last"),
            volume=("volume", "sum"),
            source_count=("timestamp", "count"),
        )
        .reset_index(drop=True)
    )
    out = out[out["source_count"] >= 2]
    return out[["timestamp", "open", "high", "low", "close", "volume"]].reset_index(drop=True)


def rsi(series: pd.Series, period: int) -> pd.Series:
    delta = series.diff()
    gain = delta.clip(lower=0.0)
    loss = -delta.clip(upper=0.0)
    avg_gain = gain.ewm(alpha=1 / period, adjust=False, min_periods=period).mean()
    avg_loss = loss.ewm(alpha=1 / period, adjust=False, min_periods=period).mean()
    rs = avg_gain / avg_loss.replace(0.0, np.nan)
    value = 100 - (100 / (1 + rs))
    flat = (avg_gain == 0) & (avg_loss == 0)
    value = value.where(~flat, 50.0)
    value = value.where(avg_loss != 0, 100.0)
    return value


def add_indicators(frame: pd.DataFrame, cfg: Mapping[str, Any]) -> pd.DataFrame:
    df = frame.copy()
    if df.empty:
        return df
    close = df["close"].astype(float)
    volume = df["volume"].astype(float)
    for p in (20, 30, 60, 120):
        df[f"ma{p}"] = close.rolling(p).mean()

    bp = int(cfg["bb_period"])
    mid = close.rolling(bp).mean()
    std = close.rolling(bp).std(ddof=0)
    df["bb_mid"] = mid
    df["bb_upper"] = mid + float(cfg["bb_std"]) * std
    df["bb_lower"] = mid - float(cfg["bb_std"]) * std
    df["rsi"] = rsi(close, int(cfg["rsi_period"]))

    rp = int(cfg["rvol_period"])
    df["rvol"] = volume / volume.shift(1).rolling(rp).mean().replace(0.0, np.nan)

    sw = int(cfg["swing_window"])
    df["support"] = df["low"].shift(1).rolling(sw).min()
    df["resistance"] = df["high"].shift(1).rolling(sw).max()

    body = (df["close"] - df["open"]).abs().replace(0.0, np.nan)
    lower_wick = np.minimum(df["open"], df["close"]) - df["low"]
    upper_wick = df["high"] - np.maximum(df["open"], df["close"])
    df["bullish_reversal"] = (
        (df["close"] > df["open"]) & ((lower_wick / body) >= 1.5) & (lower_wick > upper_wick)
    ).fillna(False)
    df["bearish_reversal"] = (
        (df["close"] < df["open"]) & ((upper_wick / body) >= 1.5) & (upper_wick > lower_wick)
    ).fillna(False)
    df["breakout"] = (df["close"] > df["resistance"] * 1.002) & (df["rvol"] >= 1.2)
    df["breakdown"] = df["close"] < df["support"] * 0.998
    df["rsi_rising"] = df["rsi"] > df["rsi"].shift(1)
    df["rsi_falling"] = df["rsi"] < df["rsi"].shift(1)
    df["bb_lower_rebound"] = (
        (df["close"].shift(1) <= df["bb_lower"].shift(1)) & (df["close"] > df["bb_lower"])
    )
    return df


def trend_label(row: pd.Series) -> str:
    c, m30, m60 = float(row["close"]), float(row["ma30"]), float(row["ma60"])
    if any(math.isnan(v) for v in (m30, m60)):
        return "N/A"
    if c > m30 > m60:
        return "Bullish"
    if c < m30 < m60:
        return "Bearish"
    return "Neutral"


def daily_trend_label(row: pd.Series) -> str:
    c = float(row["close"])
    m30, m60, m120 = (float(row["ma30"]), float(row["ma60"]), float(row["ma120"]))
    if any(math.isnan(v) for v in (m30, m60, m120)):
        return "N/A"
    if c > m30 > m60 > m120:
        return "Bullish"
    if c < m30 < m60:
        return "Bearish"
    return "Neutral"


def bollinger_position(row: pd.Series) -> str:
    c = float(row["close"])
    lo, mid, hi = float(row["bb_lower"]), float(row["bb_mid"]), float(row["bb_upper"])
    if any(math.isnan(v) for v in (lo, mid, hi)):
        return "N/A"
    if c < lo:
        return "BelowLower"
    if c > hi:
        return "AboveUpper"
    return "LowerHalf" if c < mid else "UpperHalf"


def near_level(price: float, level: float, pct: float) -> bool:
    return bool(level and not math.isnan(level) and level > 0 and abs(price - level) / level * 100 <= pct)


def score_signal(hourly: pd.DataFrame, daily: pd.DataFrame, cfg: Mapping[str, Any]) -> Tuple[int, int, str]:
    row, drow = hourly.iloc[-1], daily.iloc[-1]
    buy = sell = 0
    dtrend, t60 = daily_trend_label(drow), trend_label(row)

    buy += 15 if dtrend == "Bullish" else 0
    sell += 15 if dtrend == "Bearish" else 0
    buy += 10 if t60 == "Bullish" else 0
    sell += 10 if t60 == "Bearish" else 0

    price, ma30, ma60 = map(float, (row["close"], row["ma30"], row["ma60"]))
    buy += 10 if price > ma30 else 0
    sell += 15 if price <= ma30 else 0
    buy += 10 if ma30 > ma60 else 0
    sell += 10 if ma30 < ma60 else 0

    support, resistance = float(row["support"]), float(row["resistance"])
    buy += 15 if near_level(price, support, float(cfg["support_proximity_pct"])) else 0
    sell += 10 if near_level(price, resistance, float(cfg["resistance_proximity_pct"])) else 0

    rvol = 0.0 if pd.isna(row["rvol"]) else float(row["rvol"])
    if rvol >= float(cfg["rvol_high"]):
        buy += 10 if bool(row["bullish_reversal"]) else 0
        sell += 10 if bool(row["bearish_reversal"]) else 0

    rsi_now = float(row["rsi"])
    buy += 10 if 40 <= rsi_now <= 65 and bool(row["rsi_rising"]) else 0
    sell += 10 if rsi_now >= 70 and bool(row["rsi_falling"]) else 0
    buy += 10 if bool(row["bullish_reversal"]) else 0
    sell += 15 if bool(row["bearish_reversal"]) else 0
    buy += 15 if bool(row["breakout"]) else 0
    sell += 20 if bool(row["breakdown"]) else 0
    buy += 5 if bool(row["bb_lower_rebound"]) else 0
    sell += 10 if price < float(row["bb_lower"]) else 0
    buy, sell = min(100, buy), min(100, sell)

    bt, st = int(cfg["buy_alert_threshold"]), int(cfg["sell_alert_threshold"])
    if sell >= st and sell >= buy + 10:
        action = "SELL" if bool(row["breakdown"]) or t60 == "Bearish" else "TRIM"
    elif buy >= bt and buy >= sell + 10:
        action = "ADD"
    elif sell >= max(50, st - 15):
        action = "WATCH_TRIM"
    elif buy >= max(50, bt - 15):
        action = "WATCH_ADD"
    else:
        action = "HOLD"
    return buy, sell, action


def safe_float(value: Any) -> float:
    return float("nan") if value is None or pd.isna(value) else float(value)


def calculate_signal(holding: Holding, hourly_raw: pd.DataFrame, daily_raw: pd.DataFrame,
                     provider: str, cfg: Mapping[str, Any]) -> Signal:
    hourly, daily = add_indicators(hourly_raw, cfg), add_indicators(daily_raw, cfg)
    if len(hourly) < max(120, int(cfg["swing_window"]) + 2, int(cfg["rvol_period"]) + 2):
        raise ValueError("insufficient 60m history")
    if len(daily) < 125:
        raise ValueError("insufficient daily history")

    row, drow = hourly.iloc[-1], daily.iloc[-1]
    buy, sell, action = score_signal(hourly, daily, cfg)
    ts = pd.Timestamp(row["timestamp"])
    if ts.tzinfo is None:
        ts = ts.tz_localize("UTC")
    age_hours = (pd.Timestamp.now(tz="UTC") - ts).total_seconds() / 3600
    return Signal(
        name=holding.name, symbol=holding.symbol, quantity=holding.quantity,
        price=safe_float(row["close"]), daily_trend=daily_trend_label(drow),
        trend_60m=trend_label(row), ma20=safe_float(row["ma20"]),
        ma30=safe_float(row["ma30"]), ma60=safe_float(row["ma60"]),
        rsi14=safe_float(row["rsi"]), rvol20=safe_float(row["rvol"]),
        support=safe_float(row["support"]), resistance=safe_float(row["resistance"]),
        bollinger_pos=bollinger_position(row), buy_score=buy, sell_score=sell,
        action=action, provider=provider, bar_time=ts.isoformat(),
        status="OK" if age_hours <= 72 else "STALE",
    )
