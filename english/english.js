const contentNode = document.querySelector("#reading-content");
const glossaryNode = document.querySelector("#glossary-grid");
const popover = document.querySelector("#word-popover");
let activeWord = null;

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  })[character]);
}

function highlightVocabulary(text, vocabulary) {
  const ordered = [...vocabulary].sort((a, b) => b.term.length - a.term.length);
  const pattern = ordered
    .map((item) => item.term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
    .join("|");
  const lookup = new Map(ordered.map((item, index) => [item.term.toLowerCase(), { item, index }]));

  return escapeHtml(text).replace(new RegExp(`\\b(${pattern})\\b`, "gi"), (match) => {
    const entry = lookup.get(match.toLowerCase());
    return `<button class="vocab-word" type="button" data-term="${escapeHtml(entry.item.term)}" aria-expanded="false">${match}</button>`;
  });
}

function positionPopover(target) {
  if (window.matchMedia("(max-width: 760px)").matches) return;
  const targetBox = target.getBoundingClientRect();
  const popoverBox = popover.getBoundingClientRect();
  const margin = 12;
  let left = targetBox.left + targetBox.width / 2 - popoverBox.width / 2;
  left = Math.max(margin, Math.min(left, window.innerWidth - popoverBox.width - margin));
  let top = targetBox.bottom + 10;
  if (top + popoverBox.height > window.innerHeight - margin) {
    top = targetBox.top - popoverBox.height - 10;
  }
  popover.style.left = `${left}px`;
  popover.style.top = `${Math.max(margin, top)}px`;
}

function openPopover(target, vocabulary) {
  const entry = vocabulary.find((item) => item.term === target.dataset.term);
  if (!entry) return;
  if (activeWord && activeWord !== target) activeWord.setAttribute("aria-expanded", "false");
  activeWord = target;
  target.setAttribute("aria-expanded", "true");
  document.querySelector("#popover-term").textContent = entry.term;
  document.querySelector("#popover-pos").textContent = entry.partOfSpeech;
  document.querySelector("#popover-meaning").textContent = entry.meaning;
  document.querySelector("#popover-context").textContent = entry.context;
  popover.classList.add("is-visible");
  popover.setAttribute("aria-hidden", "false");
  requestAnimationFrame(() => positionPopover(target));
}

function closePopover() {
  if (activeWord) activeWord.setAttribute("aria-expanded", "false");
  activeWord = null;
  popover.classList.remove("is-visible");
  popover.setAttribute("aria-hidden", "true");
}

function attachWordInteractions(vocabulary) {
  document.querySelectorAll(".vocab-word").forEach((word) => {
    word.addEventListener("click", (event) => {
      event.stopPropagation();
      if (activeWord === word) closePopover();
      else openPopover(word, vocabulary);
    });
    word.addEventListener("focus", () => {
      if (word.matches(":focus-visible")) openPopover(word, vocabulary);
    });
    word.addEventListener("mouseenter", () => openPopover(word, vocabulary));
    word.addEventListener("mouseleave", () => {
      if (!word.matches(":focus") && !window.matchMedia("(pointer: coarse)").matches) closePopover();
    });
  });

  document.addEventListener("click", closePopover);
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closePopover();
  });
  window.addEventListener("resize", () => {
    if (activeWord) positionPopover(activeWord);
  });
  window.addEventListener("scroll", () => {
    if (activeWord && !window.matchMedia("(max-width: 760px)").matches) positionPopover(activeWord);
  }, { passive: true });
}

function renderLesson(lesson) {
  document.querySelector("#lesson-date").textContent = new Intl.DateTimeFormat("ko-KR", {
    year: "numeric", month: "long", day: "numeric"
  }).format(new Date(`${lesson.date}T00:00:00`));
  document.querySelector("#lesson-title").textContent = lesson.readingTitle;
  document.querySelector("#grammar-topic").textContent = `Grammar · ${lesson.grammarTopic}`;
  document.querySelector("#notion-link").href = lesson.notionUrl;
  document.querySelector("#word-count").textContent = `${lesson.vocabulary.length} words`;

  contentNode.innerHTML = lesson.paragraphs
    .map((paragraph) => `<p>${highlightVocabulary(paragraph, lesson.vocabulary)}</p>`)
    .join("");

  glossaryNode.innerHTML = lesson.vocabulary.map((item) => `
    <div class="glossary-card">
      <strong>${escapeHtml(item.term)}</strong>
      <span>${escapeHtml(item.meaning)}</span>
      <p>${escapeHtml(item.context)}</p>
    </div>`).join("");

  attachWordInteractions(lesson.vocabulary);
}

fetch("../data/learning-history.json")
  .then((response) => {
    if (!response.ok) throw new Error("Learning history request failed");
    return response.json();
  })
  .then((data) => {
    if (!data.english?.length) throw new Error("No English lessons available");
    const latest = [...data.english].sort((a, b) => b.date.localeCompare(a.date))[0];
    renderLesson(latest);
  })
  .catch(() => {
    document.querySelector("#error-state").hidden = false;
    document.querySelector(".reader-shell").hidden = true;
  });
