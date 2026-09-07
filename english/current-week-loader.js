(() => {
  const nativeFetch = window.fetch.bind(window);
  const weeklySources = [
    "week-2026-09-07/2026-09-07.json",
    "week-2026-09-07/2026-09-08.json",
    "week-2026-09-07/2026-09-09.json",
    "week-2026-09-07/rest.json"
  ];

  function normalize(payload) {
    if (!payload) return [];
    return Array.isArray(payload) ? payload : [payload];
  }

  window.fetch = async function(input, init) {
    const url = typeof input === "string" ? input : input?.url || "";
    if (!url.endsWith("../data/learning-history.json") && !url.endsWith("/data/learning-history.json")) {
      return nativeFetch(input, init);
    }

    const [baseResponse, ...weekResponses] = await Promise.all([
      nativeFetch(input, init),
      ...weeklySources.map((source) => nativeFetch(source))
    ]);

    if (!baseResponse.ok) return baseResponse;
    const base = await baseResponse.json();
    const week = [];
    for (const response of weekResponses) {
      if (!response.ok) continue;
      const payload = await response.json();
      week.push(...normalize(payload));
    }

    const byDate = new Map((base.english || []).map((lesson) => [lesson.date, lesson]));
    week.forEach((lesson) => {
      if (lesson?.date) byDate.set(lesson.date, lesson);
    });
    base.english = [...byDate.values()].sort((a, b) => a.date.localeCompare(b.date));

    return new Response(JSON.stringify(base), {
      status: 200,
      headers: { "Content-Type": "application/json; charset=utf-8" }
    });
  };
})();