import numpy as np
import pandas as pd

from quant.core import add_indicators, clean_config, resample_regular_60m, trend_label


def test_regular_session_resample_creates_six_complete_hours():
    ts = pd.date_range(
        "2026-09-01 09:30",
        periods=13,
        freq="30min",
        tz="America/New_York",
    ).tz_convert("UTC")
    frame = pd.DataFrame({
        "timestamp": ts,
        "open": np.arange(13) + 100.0,
        "high": np.arange(13) + 101.0,
        "low": np.arange(13) + 99.0,
        "close": np.arange(13) + 100.5,
        "volume": np.full(13, 1000.0),
    })
    out = resample_regular_60m(frame)
    assert len(out) == 6
    assert out.iloc[0]["open"] == 100.0
    assert out.iloc[0]["close"] == 101.5
    assert out.iloc[0]["volume"] == 2000.0
    assert out.iloc[-1]["timestamp"].tz_convert("America/New_York").strftime("%H:%M") == "14:30"


def test_indicator_trend_on_rising_series_is_bullish():
    cfg = clean_config({})
    ts = pd.date_range("2026-01-01", periods=150, freq="h", tz="UTC")
    close = np.linspace(100, 180, 150)
    frame = pd.DataFrame({
        "timestamp": ts,
        "open": close - 0.3,
        "high": close + 0.7,
        "low": close - 0.8,
        "close": close,
        "volume": np.linspace(1000, 1600, 150),
    })
    out = add_indicators(frame, cfg)
    assert trend_label(out.iloc[-1]) == "Bullish"
    assert out.iloc[-1]["ma30"] > out.iloc[-1]["ma60"]
    assert 0 <= out.iloc[-1]["rsi"] <= 100


def test_support_and_resistance_ignore_current_bar():
    cfg = clean_config({"swing_window": 20})
    ts = pd.date_range("2026-01-01", periods=40, freq="h", tz="UTC")
    frame = pd.DataFrame({
        "timestamp": ts,
        "open": np.full(40, 100.0),
        "high": np.arange(40, dtype=float) + 101,
        "low": np.arange(40, dtype=float) + 80,
        "close": np.arange(40, dtype=float) + 100,
        "volume": np.full(40, 1000.0),
    })
    out = add_indicators(frame, cfg)
    last = out.iloc[-1]
    assert last["resistance"] == frame.iloc[-21:-1]["high"].max()
    assert last["support"] == frame.iloc[-21:-1]["low"].min()
