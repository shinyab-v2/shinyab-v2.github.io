import pandas as pd

from discovery.core import aggregate_clusters, score_candidates, symbol_metrics


def test_standard_returns_use_past_price_as_denominator():
    n = 140
    frame = pd.DataFrame({
        "timestamp": pd.date_range("2026-01-01", periods=n, freq="B", tz="UTC"),
        "close": [100.0 + i for i in range(n)],
        "volume": [1000 + i for i in range(n)],
    })
    out = symbol_metrics(frame)
    expected = (239.0 / 237.0) - 1.0
    assert abs(out["ret_2d"] - expected) < 1e-12


def test_early_growth_can_score_with_shorter_history():
    frame = pd.DataFrame([{
        "ticker": "TEST", "discoveryModel": "EARLY_REVIEW", "macroSector": "Technology",
        "investmentCluster": "Other", "price": 10.0, "ret_6m": float("nan"),
        "ret_3m": 0.30, "ret_1m": 0.20, "ret_10d": 0.10, "ret_2d": 0.03,
        "rs_3m": 0.20, "rvol20": 1.5, "trend_score": 1.0, "above_ma30": 1.0,
    }])
    scored = score_candidates(frame)
    assert scored.iloc[0]["preScore"] > 0
    assert scored.iloc[0]["dataCoverage"] >= 0.5


def test_sector_breadth():
    frame = pd.DataFrame([
        {"ticker": "A", "macroSector": "Technology", "investmentCluster": "Memory & Storage",
         "price": 10, "preScore": 80, "ret_3m": 0.2, "ret_1m": 0.1, "ret_10d": 0.05, "above_ma30": 1},
        {"ticker": "B", "macroSector": "Technology", "investmentCluster": "Memory & Storage",
         "price": 20, "preScore": 70, "ret_3m": 0.1, "ret_1m": -0.02, "ret_10d": 0.03, "above_ma30": 1},
    ])
    out = aggregate_clusters(frame)
    assert len(out) == 1
    assert out.iloc[0]["breadth3M"] == 1.0
    assert out.iloc[0]["breadth1M"] == 0.5
