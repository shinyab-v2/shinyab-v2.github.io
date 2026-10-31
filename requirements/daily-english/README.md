# Daily English — 주간 학습 자료 제작·배포 요구사항 (Source of Truth)

> **문서 목적:** 새 ChatGPT 채팅/Work에서 한 줄 요청만으로 기존 GitHub Pages의 Daily English 학습 콘텐츠를 같은 기준으로 생성, 검수, 게시한다. 이 문서는 주간 제작의 표준 요구사항이며, 새로운 채팅에 이전 대화 맥락이 없어도 독립적으로 실행할 수 있어야 한다.  
> **저장소:** https://github.com/shinyab-v2/shinyab-v2.github.io  
> **기준 브랜치:** `main` (항상 작업 시작 직전의 최신 `main`을 확인)  
> **실행 단축 프롬프트:** [QUICK_PROMPT.md](./QUICK_PROMPT.md)

## 1. 요청 해석 및 원칙

- 사용자가 "차주 Daily English 작성", "Git의 Daily English 참고해 차주 자료 작성"이라고 하면 **두 레벨(B1–B2 및 A1–A2), 월요일부터 일요일까지 하루 1개씩, 총 14개 수업**을 **작성 → 데이터 검증 → GitHub 반영 → GitHub Pages 배포 확인**하는 요청으로 해석한다.
- "금주"는 사용자 기준 현지 날짜가 포함된 월~일, "차주"는 그 다음 월~일을 의미한다. 별도 날짜가 명시되면 명시된 날짜를 우선한다. 상대 날짜는 **Asia/Kuala_Lumpur** 현지 날짜를 기준으로 해석하고, 응답에 **YYYY-MM-DD ~ YYYY-MM-DD**를 명시한다. 작업 시작 시 날짜를 새로 계산한다. 오늘 날짜 또는 지난번 작업 날짜를 재사용하지 않는다.
- **사용자의 추가 질문 없이 기존 명세로 착수**한다. 다만 외부 데이터·GitHub 접근 권한에 문제가 있으면 사실대로 설명하고 작성 가능한 결과를 제공한다. 접근하거나 게시하지 못한 상태를 "완료"라 하지 않는다.
- 무조건 **현재 GitHub main의 실제 코드·데이터·스키마를 우선**으로 확인하고, 본 문서와 기존 코드가 충돌하면 충돌을 알리고 학습 기능에 영향이 적은 방식으로 처리한다. 기존 수업의 날짜·기록·단어장·Progress·Voice 기능을 파괴하지 않는다.
- 이미 존재하는 주간은 날짜·내용·학습 경로를 대조하고, 14개 수업이 전부 맞는지 검증한다. **부분 작성된 주간(예: 성인 5일만 게시)은 완료로 보지 않는다.** 요청 대상 주간을 완성하는 것이 우선이며, 다른 주간의 누락은 별도 보고한다.
- "기존과 같은 품질"은 단순한 JSON 모양 복사만을 뜻하지 않는다. 설명의 깊이, 정확한 예시, 읽기와 문법의 연결, 수준별 난도, 자연스러운 한국어 번역, 상호작용 작동까지 포함한다.
- 기존 문법을 반복해 단순 복제하지 않는다. 필요 시 복습은 가능하지만 다른 문맥·오개념·확장 용법으로 분명한 학습 가치를 제시한다. 이전 주간 문법·이디엄·주제와 중복을 검토하고 **7일간 자연스럽게 난도가 이어지는 학습 순서**를 기획한다.

## 2. 학습 대상·방향

| 구분 | 성인 Daily English | 학생 Student Daily English |
|---|---|---|
| 수준 | CEFR **B1–B2** | CEFR **A1–A2** |
| 사이트 | https://shinyab-v2.github.io/english/ | https://shinyab-v2.github.io/student-english/ |
| 목표 | 문법 정확성, 뉘앙스·의미 비교, 실제 대화와 독해·작문 | 쉬운 문장 → 확장 문장, 생활·학교 소재, 자신감 있는 말하기 |
| 설명 | **한국어 중심의 상세 설명**, 기본 규칙·비교·예외·흔한 오류·실제 상황 | **한국어 중심**, 어려운 용어를 풀어 설명, A1→A2 예시 단계별 |
| 영어 표현 | 자연스러운 **British English**(일관된 철자·용례) | 자연스러운 **British English**, 어린 학습자에게 적절한 어휘 |
| 읽기 | 약 5분, 독해력을 기르는 이야기/설명문 | 약 3분, 친숙하고 일관된 이야기 |
| 음성 복습 | PC ChatGPT Voice: 한 번에 한 문제, 답변 후 교정·재진술 | British English: 쉬운 질문→짧은 확장 질문, 친절한 교정·재진술 |

- 과거 제공된 **English Grammar in Use (Raymond Murphy, Fifth Edition)** 및 학생용 **basic.pdf**가 실제로 접근 가능한 경우 문법 설명의 우선 참고 자료로 활용한다. **새 채팅에서 파일에 접근할 수 있다고 가정하거나 책의 실제 내용을 확인한 것처럼 말하지 않는다.** 저작물 예문은 대량 전재하지 않고 학습 자료용 자체 예문을 쓴다.
- B1–B2는 단순 형식 암기보다 의미 차이와 오용 교정을, A1–A2는 주어-동사·시제·의문문 형태와 말하기 활용을 중시한다.
- 읽기 소재는 학교·가정·취미·교통·여행·일상·직장·지역사회 등으로 순환한다. 한 주 안의 지문이 같은 플롯을 반복하지 않게 한다. 고유명사·특정 지역을 억지로 넣지 않는다.

## 3. **매일 1개 수업**에 반드시 들어갈 내용 (두 레벨 공통)

1. **문법(Grammar):** 하루에 중심 주제 1개; 한국어 요약 1개; 하위 설명 **5개 (`grammar.points`)**. 각 하위 설명은 **규칙과 의미·상황·오용/대조를 충분히 설명**하고, **영문+자연스러운 한국어 해석 예문 5개 이상**을 포함한다. 즉 매일 **최소 25개 예문**. 예문은 실제로 올바른 문법이어야 하며 반복·단순 변형으로 개수를 채우지 않는다. 학생용 예문은 가급적 **[A1] 3개 + [A2] 2개**로 표시한다. 예문 구조는 `English sentence. — 한국어 해석.`
2. **실용 이디엄/표현 3개(`idioms`):** 각 `term`, 한국어 `meaning`, 영문과 한국어 해석이 함께 담긴 `example`을 제공한다. 실제 구어에서 자연스러운 표현을 선정하고 성인·학생의 난도를 구별한다. **5개가 아니라 3개**가 고정 기준이다.
3. **읽기 1편(`readingTitle`, `paragraphs`):** **정확히 5단락**, 성인용 약 170~260단어/학생용 약 90~160단어를 권장(문장과 주제의 자연스러움을 우선). 매일 문법/표현을 실제 문맥에 2~4회 이상 자연스럽게 사용한다. 문장 흐름, 인과관계, 종료 문단까지 갖춘다.
4. **단락별 한국어 해석(`translations`):** 읽기 5단락과 **1:1 대응하는 정확히 5개**. 사이트에서는 기존 렌더러가 `<details>`로 단락별 번역을 **기본 접힌(hidden) 상태**로 보여준다. 번역을 독해 지문에 섞거나 전체 번역을 한 번에 노출하지 않는다.
5. **어휘 10개(`vocabulary`):** `term`, `partOfSpeech`, 한국어 `meaning`, 해당 문맥 설명 `context` 필수. **모든 어휘는 실제 읽기 영어 원문에 존재해야 하며**, 품사·뜻·대소문자 표기가 지문 사용과 맞아야 한다. 사이트에서 누르면 뜻을 보여 주고 단어장 저장이 가능하도록 기존 형식을 따른다.
6. **객관식 퀴즈 10문항(`quiz`):** 문법 약 5문항 + 독해 약 3문항 + 어휘 약 2문항을 권장. 각 문항에 `question`, 서로 다른 보기 **4개(`choices`)**, 0~3의 **정수 정답 인덱스(`answer`)**, 정답·오답 이유를 알려 주는 **한국어 `explanation`** 필수. 정답 중복·오답도 맞는 모호한 보기·읽기 내용과 불일치하는 정답은 금지한다.
7. **말하기 질문 5개(`discussionQuestions`):** 그날 배운 문법·이디엄·읽기를 실제 발화로 확인할 수 있는 개방형 질문. 학생용은 짧고 구체적이며 난도를 조금씩 높인다.
8. **Role play 1개(`rolePlay`):** `scenario`, `learnerRole`, `coachRole`, `goal` 필수. PC Voice에서 질문을 한 번에 하나씩 제시하며 문법·자연스러운 표현·발음을 교정하고 수정 문장을 다시 말하도록 돕는다.
9. **일관된 톤·출판 품질:** 한국어 설명의 띄어쓰기·오역·부자연스러운 번역·영국식 철자·예시 문법·퀴즈 정답을 교정한다. 학습자에게 틀린 어법을 정답으로 가르치지 않는다. 기사나 외부 출처에서 내용을 가져온 경우 검증 가능한 출처를 기록하고 원문을 무단 복제하지 않는다.

### 최소 산출량 (1주 / 2개 레벨 합산)

- **14개 수업** = 7일 × 2개 레벨.
- **문법 설명 최소 70개**, **문법 예문 최소 350개**, **실용 표현 42개**.
- **읽기 지문 14편 / 전체 70단락**, 각 단락의 **숨김 번역 70개**.
- **어휘 140개**, **객관식 퀴즈 140문항**, **말하기 질문 70개**, **Role play 14개**.

## 4. 기존 웹 콘텐츠 데이터 스키마 — 임의 변경 금지

기존 사이트의 JS 렌더러는 다음 JSON 속성 이름에 의존한다.

```json
{
  "date": "YYYY-MM-DD",
  "title": "Daily English — YYYY-MM-DD",
  "grammarTopic": "English grammar topic",
  "grammar": {
    "title": "한국어 제목",
    "summary": "한국어 상세 개요",
    "points": [
      {
        "title": "하위 주제",
        "explanation": "충분한 한국어 설명",
        "examples": ["English example. — 한국어 해석."]
      }
    ]
  },
  "idioms": [
    {
      "term": "phrase",
      "meaning": "뜻",
      "example": "English sentence. — 한국어 해석."
    }
  ],
  "readingTitle": "Reading title",
  "paragraphs": ["One English paragraph."],
  "translations": ["같은 순서의 한글 단락 번역."],
  "vocabulary": [
    {
      "term": "word",
      "partOfSpeech": "noun",
      "meaning": "뜻",
      "context": "해당 지문에서의 쓰임"
    }
  ],
  "quiz": [
    {
      "question": "Question?",
      "choices": ["A", "B", "C", "D"],
      "answer": 0,
      "explanation": "한국어 정답 해설"
    }
  ],
  "discussionQuestions": ["Speaking question?"],
  "rolePlay": {
    "scenario": "Situation",
    "learnerRole": "Learner's task",
    "coachRole": "Tutor's task",
    "goal": "Learning goal"
  }
}
```

- 배열 길이는 위 **3절 고정값**을 따른다. `date`는 날짜별 유일한 `YYYY-MM-DD`이며, JSON 배열은 날짜순으로 정렬한다. 학생용 `title`에는 `Student Daily English`를 사용한다.
- 본 스키마는 **필수 필드의 모양만 보여 주는 축약 예시**이므로 5개 문법 points, 3개 idioms 등 실제 수량은 본문 규칙이 우선이다.
- JSON 데이터 문자열에는 Markdown 제목(`#`), 불필요한 코드 펜스나 raw HTML을 넣지 않는다. 사이트 HTML·CSS·JS가 직접 콘텐츠를 렌더링한다. UI에 마크다운 별표가 그대로 나타나거나 줄바꿈/한국어가 깨지지 않게 한다.

## 5. GitHub 저장·게시 경로와 방법

### A. 소스 확인(반드시 매 실행)

1. `shinyab-v2/shinyab-v2.github.io`의 **최신 `main`**을 읽고 `README.md`, `english/index.html`, `english/english.js`, `english/current-week-loader.js`, `student-english/index.html`, `student-english/student-english.js` 및 최신 주간 JSON을 살펴본다.
2. 최근 **최소 4주 이상**의 문법 주제·이디엄·독해 소재를 비교해 반복을 줄인다. 필요 시 더 오래된 `data/learning-history.json` 및 학생용 누적 데이터를 확인한다.
3. 기존 주간이 **완전한 7일인지** 확인한다. 불완전한 자료를 품질 템플릿으로 삼지 않는다.

### B. 주간 데이터 게시 (월요일 날짜 = `YYYY-MM-DD`)

| 유형 | 생성·수정할 경로 | 규칙 |
|---|---|---|
| 성인 주간 원본 | `english/week-YYYY-MM-DD/week.json` | 해당 주 7개 수업을 담은 JSON 배열 |
| 학생 주간 원본 | `student-english/week-YYYY-MM-DD/week.json` | 해당 주 7개 수업을 담은 JSON 배열 |
| 성인 주간 로더 | `english/current-week-loader.js` | `weeklySources`에 성인 새 주간 JSON 경로 추가, 기존 경로 유지 |
| 학생 누적 이력 | `student-english/data/week.json` | 기존 배열을 **date 기준 병합·정렬**하고 신규 7일 추가; 이전 7일/단어 데이터 삭제 금지 |
| 성인 바로가기(선택) | `english/week-YYYY-MM-DD.html` | `./?date=YYYY-MM-DD`로 이동하는 HTML. 기존 규칙상 가능한 한 함께 제공 |
| 학생 바로가기(선택) | `student-english/week-YYYY-MM-DD.html` | 동일 |
| 캐시 관련 | `english/index.html`, `student-english/index.html` | 필요할 때만 쿼리 버전 갱신. 기존 스타일·JS를 불필요하게 변경하지 않음 |

- 성인 콘텐츠 로더는 `data/learning-history.json`의 `english` 기록과 `weeklySources`의 날짜별 자료를 병합한다. **주간 원본을 기록하려고 기본 히스토리를 무조건 재작성하지 않는다.**
- 학생 콘텐츠는 현재 `student-english/student-english.js`가 `student-english/data/week.json`을 직접 읽는다. **학생 주간 파일만 생성하면 사이트에서 보이지 않으므로 누적 이력 갱신은 필수다.**
- HTML 페이지를 매일 14개 복제하는 방식이 아닌 **JSON 데이터 + 기존 HTML 렌더러**가 운영 구조다.
- 새로운 페이지보다 **기존 학습/아카이브/단어장/Quiz/Voice/인쇄** 기능의 호환성이 우선이다.
- 수정은 **최신 main을 base**로, 가능하면 **주간 관련 변경을 한 논리적 커밋**에 모은다. 진행 중 다른 커밋이 추가되면 변경 내용을 다시 확인하고 충돌을 해결한다. 강제 push 금지. 권한 정책으로 직접 main 반영이 불가능하면 PR을 만들고 미배포 상태임을 알린다.
- 개인정보·학생 신상정보·비밀 토큰·유료 PDF 원문은 공개 GitHub에 게시하지 않는다.

## 6. 출판 전 필수 자동·수동 검증 (Acceptance Criteria)

**아래의 어느 하나라도 실패하면 주간 배포 완료라고 보고하지 않는다.**

1. `JSON.parse` 성공 및 필수 필드 타입/비어 있지 않음 검증: **성인 7일 + 학생 7일**, 중복 날짜 0, 정확히 월~일 연속 7일.
2. **매일** 문법 `points=5`, 각 `examples>=5`; `idioms=3`, `paragraphs=translations=5`, `vocabulary=10`, `quiz=10`, `discussionQuestions=5`, `rolePlay`의 4개 필수 속성 확인.
3. **단어 10개가 읽기 원문에 실제로 등장**하며 의미·품사와 맥락이 부합하는지 검증. 긴 구문·대소문자·불규칙 복수형은 실제 표면형까지 검토.
4. 퀴즈 10개 모두 서로 다른 선택지 4개, `answer`가 정수 0~3 범위, 인덱스로 지정한 정답이 유일하게 정확하고 해설이 정답과 일치하는지 검증. 문법·독해·어휘 비율 확인.
5. 영어 예문 모두 한국어 뜻을 포함하며 규칙과 실제 쓰임에 맞는지 검토. 번역 5개가 해당 문단을 빠뜨리지 않고 대응하는지 확인. 대화/표현의 British English 자연스러움 검토.
6. **이전 자료 보존:** 학생 누적 이력의 과거 날짜·내용 유지, 성인 로더의 기존 주간 목록 유지, 날짜 중복 제거. 전후 총수·최신 일자를 비교한다.
7. **웹 렌더링:** 각 레벨의 `?date=첫째날` 및 `?date=마지막날`에서 문법·이디엄·읽기·어휘·퀴즈가 실제 표시되는지 확인. 한국어 번역이 **기본 접힌 상태로 단락별 펼침**되고, 단어 클릭/저장·퀴즈 정오답·이전 날짜 아카이브·Voice 프롬프트·모바일 표시가 유지되는지 가능하면 브라우저로 확인한다.
8. **배포:** GitHub `main`에 커밋이 반영된 SHA 확인, Pages 워크플로 빌드/배포 성공 확인, 가능할 경우 실제 URL HTTP/브라우저 확인. 빌드 성공과 화면 기능 검증을 구분하여 보고한다.
9. 실패한 항목이 있으면 파일 경로, 실패 원인, 재현 조건, 복구 방법 및 완료하지 못한 검증 항목을 남긴다. 배포 전 실패는 수정 후 재검증하고, 일부만 생성한 상태를 전체 주간 완료라고 표현하지 않는다.

### 체크를 위한 최소 예시 의사코드

```js
assert(adult.length === 7 && student.length === 7);
for (const lessons of [adult, student]) {
  assert(isExactMondayToSunday(lessons, targetMonday));
  for (const lesson of lessons) {
    assert(lesson.grammar.points.length === 5);
    assert(lesson.grammar.points.every(p => p.examples.length >= 5));
    assert(lesson.idioms.length === 3);
    assert(lesson.paragraphs.length === 5 && lesson.translations.length === 5);
    assert(lesson.vocabulary.length === 10 && lesson.quiz.length === 10);
    assert(lesson.discussionQuestions.length === 5);
    assert(["scenario", "learnerRole", "coachRole", "goal"].every(k => lesson.rolePlay[k]));
    assert(lesson.quiz.every(q => q.choices.length === 4 && Number.isInteger(q.answer) && q.answer >= 0 && q.answer <= 3));
    assert(lesson.vocabulary.every(v => readingContainsTerm(lesson.paragraphs, v.term)));
  }
}
```

`isExactMondayToSunday` 및 `readingContainsTerm`는 기존 도구의 함수가 아니라 검증 시 실제로 구현해야 하는 조건을 설명한 의사코드다.

## 7. 주간 작업 순서와 완료 보고 양식

1. 요청 날짜 해석 → 최신 main 확인 → 지난 자료 검토.
2. B1–B2 / A1–A2 각각 7일 문법 및 이야기 주제 기획(중복 확인).
3. 각 날짜의 9개 콘텐츠 블록 작성 → 자체 문법·번역·정답 검수.
4. 주간 JSON 2개 생성 → 학생 누적 이력 병합 및 성인 로더 연결 → 필요한 링크 갱신.
5. JSON 및 수량 검증 → UI 가능 범위 테스트 → 최신 main 기반으로 변경 일괄 커밋.
6. Pages 배포 성공 여부 및 실제 접근 가능한 URL 확인.
7. 최종 응답에는 **학습 기간, 각 레벨 URL, 요일별 문법 주제 표, 총 수업/예문/표현/단락/문제 수, 커밋 링크, Pages 배포 결과, 테스트한 범위, 미완료/기존 누락 사항**을 명확히 제시한다.

## 8. 기존 자료의 품질 기준 및 주의사항

- **완성본 비교 기준:** `english/week-2026-10-19/week.json`와 `student-english/week-2026-10-19/week.json` (각 7일, 상세 문법 5×5, 5단락, 10문제).
- **2026-10-31 기준 발견된 기존 데이터 갭:** `english/week-2026-10-26/week.json`에는 **2026-10-26~30 5일**만 있고, 동일 날짜의 학생 주간 파일은 없음. 이는 이후 데이터가 변할 수 있는 **작성 당시 점검 결과**이며, 요청마다 현재 상태를 새로 확인한다. 미완성 주간을 정규 템플릿으로 삼거나 완성된 7일로 표기하지 않는다.
- 콘텐츠 개수보다 실제 학습의 정확성과 읽기 즐거움이 우선이지만, 이 문서의 최소 개수는 모두 충족한다.
- 개발/기능 수정을 요구받지 않은 일반 "차주 Daily English" 요청에서는 사이트의 구조를 재설계하지 않고 **콘텐츠 생성과 검증·배포에 집중**한다. 기능 결함 발견 시 별도 이슈/작업으로 구분한다.

---
**사용자에게 권장되는 가장 짧은 요청:**  
"GitHub shinyab-v2/shinyab-v2.github.io의 Daily English 요구사항에 따라 차주 B1~B2·A1~A2 자료를 작성·검증하고 main에 배포해줘."
