const button = document.querySelector("#open-app");

fetch("../data/projects.json")
  .then((response) => {
    if (!response.ok) throw new Error("Project configuration unavailable");
    return response.json();
  })
  .then((projects) => {
    button.href = projects.investment.targetUrl;
    button.textContent = "Google 계정으로 계속";
    button.removeAttribute("aria-disabled");
  })
  .catch(() => {
    button.textContent = "연결 정보를 불러오지 못했습니다";
    button.classList.add("disabled");
  });
