# AI Daily — 새 채팅에서 쓰는 간편 실행 프롬프트

이 문서는 새로운 대화(New Chat)를 시작하거나 서로 다른 AI 에이전트(Claude, GPT, Gemini 등)에게 **긴 설명 없이 기존 요구사항과 커리큘럼을 즉시 호출하여 주간 강좌 제작을 지시**하기 위한 단축 프롬프트 모음이다.

---

## 1. 권장 한 줄 프롬프트 (차주 주간 자료 제작)

> GitHub `shinyab-v2/shinyab-v2.github.io`의 `requirements/ai-daily/README.md` 요구사항에 따라 **Week 2 (#07~#11) 차주 AI Daily 5일치 강좌**를 상세 작성하고, 반응형 Inline SVG·PyTorch 코드·초음파 실무 응용·5대 퀴즈를 포함하여 `main` 브랜치에 커밋 및 GitHub Pages 배포까지 완료해줘.

*이 한 줄 명령은 5개 심화 HTML 강좌 작성, `ai/index.html` 갱신, SVG 다이어그램 제작, 수식 및 코드 검증, git commit & push, 배포 URL 보고를 모두 포함합니다.*

---

## 2. 특정 주차 / 특정 날짜 지정 요청 프롬프트

### 특정 주차 지정:
> GitHub `shinyab-v2/shinyab-v2.github.io`의 AI Daily 표준 요구사항(`requirements/ai-daily/README.md`)을 참고하여 **Week 3 (#11~#15: 학습 디버깅, 가중치 전이, C++ 연산자)** 주간 강좌 5편을 작성하고 main에 배포해줘.

### 특정 날짜 범위 지정:
> GitHub `shinyab-v2/shinyab-v2.github.io`의 `requirements/ai-daily/README.md`에 따라 **2026-11-02 ~ 2026-11-06** 주간 AI Daily 5일치 강좌를 작성하고 index.html 반영 후 GitHub main에 배포해줘.

### 특정 단일 강좌 심화 보강 요청:
> GitHub `shinyab-v2/shinyab-v2.github.io`의 `ai/2026-09-08-detection-architecture.html` 강좌를 `requirements/ai-daily/README.md`의 16대 표준에 맞춰 반응형 SVG와 FPN/BiFPN 수식, PyTorch 코드를 보강하여 전면 개정해줘.

---

## 3. AI 에이전트가 반드시 따라야 할 실행 수칙

1. **최신 main 브랜치 우선 확인:**
   * 새 세션을 시작할 때 저장소의 최신 `git status`와 `ai/index.html`을 먼저 읽어 현재 작성된 강좌의 마지막 번호와 날짜를 파악한다.
2. **원리 → 수식 → Shape → 코드 → 초음파 응용의 7단계 깊이 준수:**
   * 단순 개념 나열이 아닌, C++ 내부 메모리, 텐서 스트라이드, FLOPs/VRAM 수치 계산, 의료 초음파 실전 예제를 반드시 포함한다.
3. **외부 이미지 링크 금지 & 반응형 Inline SVG 작성:**
   * 모든 아키텍처 다이어그램과 데이터 흐름도는 `<svg viewBox="..." ...>` 인라인 태그로 작성한다.
4. **Git 작업의 투명성 유지:**
   * 실제로 커밋과 푸시를 수행하지 않고 완료했다고 거짓 보고하지 않는다. 커밋 SHA와 실제 접근 가능한 URL을 명시한다.
5. **기존 강좌 무단 삭제 금지:**
   * 기존 완료된 강좌(#01~#06)의 핵심 내용을 훼손하거나 덮어쓰지 않는다.
