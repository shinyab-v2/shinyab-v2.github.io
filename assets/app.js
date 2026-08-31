const learningItems = [
  {
    icon: "D",
    title: "Daily Report",
    description: "투자 브리핑과 일일 보고서",
    state: "Notion 열기 →",
    url: "https://app.notion.com/p/d4c977cd00504bd78733ecf184620e82?pvs=204"
  },
  {
    icon: "E",
    title: "영어 공부",
    description: "문법, 이디엄, 읽기와 단어 뜻 풍선",
    state: "오늘의 읽기 →",
    url: "english/"
  },
  {
    icon: "C",
    title: "차트 공부",
    description: "실전 차트 분석과 한 장 요약",
    state: "Notion 열기 →",
    url: "https://app.notion.com/p/e7faf6d7cf0d40ca9f6646d7126fd23b"
  },
  {
    icon: "AI",
    title: "AI 학습",
    description: "모델 분석, 파인튜닝, 최적화와 프로젝트 실습",
    state: "Notion 열기 →",
    url: "https://app.notion.com/p/e407f1c0d6c5489c95056aac40c613af"
  }
];

const list = document.querySelector("#learning-list");
learningItems.forEach((item) => {
  const row = document.createElement(item.url ? "a" : "div");
  row.className = "learning-item";
  if (item.url) {
    row.classList.add("learning-item-link");
    row.href = item.url;
    row.target = "_blank";
    row.rel = "noopener noreferrer";
    row.setAttribute("aria-label", `${item.title} Notion에서 열기`);
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
