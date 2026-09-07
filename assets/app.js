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
    description: "B2 Daily English · 2026.09.07–09.13 주간 학습",
    state: "이번 주 학습 →",
    url: "english/week-2026-09-07.html"
  },
  {
    icon: "C",
    title: "차트 공부",
    description: "추세·지지저항·거래량·RSI·MACD·돌파·멀티 타임프레임",
    state: "이번 주 학습 →",
    url: "chart/week-2026-09-07.html"
  },
  {
    icon: "AI",
    title: "AI 학습",
    description: "Conv2d부터 U-Net·runtime instrumentation까지 7일 실습",
    state: "이번 주 학습 →",
    url: "ai/week-2026-09-07.html"
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