const learningItems = [
  {
    icon: "S",
    title: "섹터 분석",
    description: "섹터별 구조·기업 비교·공식 근거를 분석일과 함께 축적하는 투자 리서치 아카이브",
    state: "섹터 분석 열기 →",
    url: "sector/"
  },
  {
    icon: "E",
    title: "영어 공부",
    description: "B2 Daily English · 문법·이디엄·5분 읽기·숨김 번역·퀴즈·Voice 리뷰·개인 단어장",
    state: "정식 학습 앱 →",
    url: "english/"
  },
  {
    icon: "C",
    title: "차트 공부",
    description: "고해상도 실제형 차트와 상세 설명으로 배우는 기술적 분석 아카이브",
    state: "정식 학습 앱 →",
    url: "chart/"
  },
  {
    icon: "AI",
    title: "AI 학습",
    description: "PyTorch 모델 구조 해부·수정·디버깅·배포까지 이어지는 날짜별 심화 학습",
    state: "정식 학습 앱 →",
    url: "ai/"
  }
];

const list = document.querySelector("#learning-list");
learningItems.forEach((item) => {
  const row = document.createElement(item.url ? "a" : "div");
  row.className = "learning-item";
  if (item.url) {
    row.classList.add("learning-item-link");
    row.href = item.url;
    if (/^https?:\/\//.test(item.url)) {
      row.target = "_blank";
      row.rel = "noopener noreferrer";
    }
    row.setAttribute("aria-label", `${item.title} 열기`);
  }
  row.innerHTML = `
    <span class="learning-icon" aria-hidden="true">${item.icon}</span>
    <div><h3>${item.title}</h3><p>${item.description}</p></div>
    <span class="learning-state">${item.state}</span>`;
  list.append(row);
});

document.querySelector("#updated-at").textContent = new Intl.DateTimeFormat("ko-KR", {
  year: "numeric", month: "2-digit", day: "2-digit"
}).format(new Date());