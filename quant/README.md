# Quant Signal v0.1

`경제적자유` Google Sheet의 현재 미국 보유종목(`투자종목`, `시장=미국`, `수량>0`)을 읽고,
Alpaca SIP historical data를 사용해 정규장 기준 60분봉 기술 신호를 계산한 뒤
같은 스프레드시트의 `QuantSignal` 탭에 결과를 기록합니다.

## 보안 원칙

이 저장소와 GitHub Pages는 public입니다. 따라서 보유수량, 평단, 신호 결과 JSON을
저장소나 Pages에 커밋하지 않습니다. 실제 금융 데이터는 Google Sheet 안에만 남깁니다.
GitHub Actions 로그에도 보유 티커를 출력하지 않습니다.

## 데이터 흐름

1. `투자종목`에서 미국 보유종목을 읽음
2. Alpaca에서 30분봉(SIP, 지연 cutoff 적용)과 완료된 일봉을 읽음
3. 30분봉을 정규장 09:30 ET 기준으로 2개씩 묶어 완성된 60분봉 생성
4. MA20/30/60/120, Bollinger, RSI14, RVOL20, rolling support/resistance 계산
5. 규칙 기반 Buy/Sell score 산출
6. `QuantSignal` 탭 갱신

정규장은 6.5시간이므로 v0.1은 **완성된 60분봉 6개(09:30-15:30 ET)**만 신호에 사용합니다.
15:30-16:00의 마지막 30분은 60분이 아니므로 제외합니다.

## 현재 Score 규칙

v0.1의 가중치는 백테스트 최적화 전 초기값입니다.

Buy 측은 일봉/60분 상승추세, MA30/60 구조, 지지선 근접, RSI 반등, 반전 캔들,
거래량 동반 돌파를 평가합니다.

Sell 측은 일봉/60분 하락추세, MA30 이탈, 저항선 근접, RSI 과열 후 하락,
윗꼬리 반전, 거래량 동반 breakdown을 평가합니다.

Action은 `ADD`, `WATCH_ADD`, `HOLD`, `WATCH_TRIM`, `TRIM`, `SELL` 중 하나입니다.

## 필요한 GitHub Actions secrets

Repository > Settings > Secrets and variables > Actions 에 다음 4개를 등록해야 실제 실행됩니다.

- `GOOGLE_SERVICE_ACCOUNT_JSON`: Google service account JSON 전체
- `GOOGLE_SHEET_ID`: `경제적자유` Google Sheet ID
- `ALPACA_API_KEY`: Alpaca API key
- `ALPACA_SECRET_KEY`: Alpaca API secret

Google service account 이메일에는 `경제적자유` 스프레드시트를 **편집자(Editor)** 로
공유해야 `QuantSignal` 탭을 갱신할 수 있습니다.

## 실행 주기

Workflow: `.github/workflows/quant-signal.yml`

GitHub cron은 UTC 기준이라 DST/EST 양쪽을 포함하도록 넓게 실행합니다. 실제 Python 코드가
`America/New_York` 시각을 확인해 60분봉 신호 시간대만 처리합니다. 수동 실행
(`workflow_dispatch`)은 시간 제한을 우회해 최근 완료 봉으로 점검할 수 있습니다.

## 다음 단계

- RSI divergence
- Volume Profile / POC / HVN
- 신호 중복 방지와 최초 발생 시각
- Telegram/메일 알림
- 과거 3~5년 백테스트 후 score weight 재학습
- 기존 인증된 Investment Workstation Apps Script UI에 `Quant Signal` 화면 추가
