from __future__ import annotations

import json
import os
import sys
from datetime import datetime, timedelta, timezone
from zoneinfo import ZoneInfo

import pandas as pd

from .core import calculate_signal, resample_regular_60m
from .io import AlpacaProvider, load_config, load_holdings, open_spreadsheet, write_signals


def force_run() -> bool:
    return os.environ.get("FORCE_RUN", "").strip().lower() in {"1", "true", "yes"}


def in_signal_window() -> bool:
    if force_run():
        return True
    now = datetime.now(ZoneInfo("America/New_York"))
    if now.weekday() >= 5:
        return False
    minute = now.hour * 60 + now.minute
    return 10 * 60 + 45 <= minute <= 15 * 60 + 59


def has_today_bar(hourly_map: dict[str, pd.DataFrame]) -> bool:
    if force_run():
        return True
    today = datetime.now(ZoneInfo("America/New_York")).date()
    for frame in hourly_map.values():
        if frame.empty:
            continue
        ts = pd.Timestamp(frame.iloc[-1]["timestamp"])
        if ts.tzinfo is None:
            ts = ts.tz_localize("UTC")
        if ts.tz_convert("America/New_York").date() == today:
            return True
    return False


def run() -> int:
    if not in_signal_window():
        print(json.dumps({"status": "skipped", "reason": "outside_signal_window"}))
        return 0

    spreadsheet = open_spreadsheet()
    cfg = load_config(spreadsheet)
    holdings = load_holdings(spreadsheet, cfg)
    if not holdings:
        raise RuntimeError("No eligible US holdings")

    provider = AlpacaProvider()
    symbols = [h.symbol for h in holdings]

    end = datetime.now(timezone.utc) - timedelta(minutes=16)
    source_start = end - timedelta(days=45)

    now_ny = datetime.now(ZoneInfo("America/New_York"))
    daily_end_ny = now_ny.replace(hour=0, minute=0, second=0, microsecond=0) - timedelta(seconds=1)
    daily_end = daily_end_ny.astimezone(timezone.utc)
    daily_start = daily_end - timedelta(days=300)

    source = provider.fetch_many(symbols, str(cfg["source_timeframe"]), source_start, end)
    hourly = {symbol: resample_regular_60m(frame) for symbol, frame in source.items()}
    if not has_today_bar(hourly):
        print(json.dumps({"status": "skipped", "reason": "no_current_session_bar"}))
        return 0

    daily = provider.fetch_many(symbols, str(cfg["secondary_timeframe"]), daily_start, daily_end)

    signals, failures = [], 0
    for holding in holdings:
        try:
            signals.append(calculate_signal(
                holding,
                hourly.get(holding.symbol, pd.DataFrame()),
                daily.get(holding.symbol, pd.DataFrame()),
                provider.name,
                cfg,
            ))
        except Exception:
            failures += 1

    signals.sort(key=lambda s: (s.action == "HOLD", -max(s.buy_score, s.sell_score), s.symbol))
    write_signals(spreadsheet, signals, failures)

    print(json.dumps({
        "status": "ok",
        "eligible_count": len(holdings),
        "signal_count": len(signals),
        "failure_count": failures,
    }))
    return 0 if signals else 2


if __name__ == "__main__":
    try:
        sys.exit(run())
    except Exception as exc:
        print(json.dumps({"status": "error", "error_type": type(exc).__name__}))
        sys.exit(1)
