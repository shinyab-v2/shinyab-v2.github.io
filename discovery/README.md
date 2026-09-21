# Investment Discovery Phase 2

This module scans the normalized `_DISCOVERY_UNIVERSE` and calculates daily momentum and sector-rotation signals.

## Inputs

- Google Sheet: `_DISCOVERY_UNIVERSE`
- Alpaca daily bars
- SPY benchmark

## Outputs

- `_DISCOVERY_SIGNAL`: ranked stock candidates
- `_SECTOR_SIGNAL`: investment-cluster breadth and rotation score
- `_DISCOVERY_SCAN_STATUS`: run summary

## Manual smoke test

Run the **Investment Discovery Scan** workflow and keep the default symbols for the first validation run.

Required repository secrets:

- `GOOGLE_SERVICE_ACCOUNT_JSON` (already used by the Quant workflow)
- `ALPACA_API_KEY` (already used by the Quant workflow)
- `ALPACA_SECRET_KEY` (already used by the Quant workflow)
- `DISCOVERY_SHEET_ID` (new; set to the ticker spreadsheet ID)

The service-account email from `GOOGLE_SERVICE_ACCOUNT_JSON.client_email` must have Editor access to the ticker spreadsheet.

The scheduled full-universe run is intentionally not enabled until the smoke test and API-throughput validation pass.
