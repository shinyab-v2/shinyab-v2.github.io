# Project & Learning Hub

GitHub Pages 기반의 개인 프로젝트·학습 링크 허브입니다.

## 간략 주소

- `/investment/` — Investment Workstation
- `/vocab/` — Vocab English

사용자 사이트 저장소(`shinyab-v2.github.io`)로 배포하면 주소는 다음과 같습니다.

- `https://shinyab-v2.github.io/investment/`
- `https://shinyab-v2.github.io/vocab/`

## Investment Workstation 보안 설정

GitHub Pages는 정적 사이트이므로 금융 데이터의 접근 권한을 보호하지 않습니다. 실제 보안 경계는 Google Apps Script 배포에서 설정해야 합니다.

1. Apps Script의 **배포 > 새 배포 > 웹 앱**을 선택합니다.
2. **다음 사용자로 실행**은 배포 소유자로 설정합니다.
3. **액세스 권한이 있는 사용자**는 `나만`으로 설정합니다.
4. 배포 후 생성된 `/exec` URL로 `data/projects.json`의 기존 `/dev` 주소만 교체합니다.
5. 시크릿 창에서 허용 계정과 다른 계정으로 열어 접근이 차단되는지 확인합니다.

`/dev` URL은 개발자·편집자 테스트용이므로 최종 링크로 사용하지 않습니다.

## 배포

1. GitHub에 `shinyab-v2.github.io` 저장소를 만듭니다.
2. 이 디렉터리의 파일을 저장소 루트에 올립니다.
3. 저장소 **Settings > Pages > Source**를 `GitHub Actions`로 선택합니다.
4. `main` 브랜치에 변경 사항을 반영하면 자동으로 배포됩니다.

## 학습 이력

초기 이력 파일은 `data/learning-history.json`입니다. 향후 Notion 데이터베이스 또는 예약 작업 결과를 연결할 때 이 구조를 확장합니다.
