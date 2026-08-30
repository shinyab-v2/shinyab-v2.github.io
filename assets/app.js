const learningItems = [
  { icon: "D", title: "Daily Report", description: "투자 브리핑과 일일 보고서", state: "연동 예정" },
  { icon: "E", title: "영어 공부", description: "문법, 이디엄, 읽기와 퀴즈", state: "매일 08:00" },
  { icon: "C", title: "차트 공부", description: "실전 차트 분석과 한 장 요약", state: "학습 이력 준비" },
  { icon: "AI", title: "AI 학습", description: "전문 개발 역량을 위한 커리큘럼", state: "학습 이력 준비" }
];

const list = document.querySelector("#learning-list");
learningItems.forEach((item) => {
  const row = document.createElement("div");
  row.className = "learning-item";
  row.innerHTML = `
    <span class="learning-icon" aria-hidden="true">${item.icon}</span>
    <div><h3>${item.title}</h3><p>${item.description}</p></div>
    <span class="learning-state">${item.state}</span>`;
  list.append(row);
});

document.querySelector("#updated-at").textContent = new Intl.DateTimeFormat("ko-KR", {
  year: "numeric", month: "2-digit", day: "2-digit"
}).format(new Date());
