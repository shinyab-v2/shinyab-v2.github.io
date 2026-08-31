const STORAGE_WORDS = "dailyEnglish.words.v1";
const STORAGE_PROGRESS = "dailyEnglish.progress.v1";

const nodes = {
  content: document.querySelector("#reading-content"),
  glossary: document.querySelector("#glossary-grid"),
  popover: document.querySelector("#word-popover"),
  quiz: document.querySelector("#quiz-list"),
  toast: document.querySelector("#toast")
};

let activeWord = null;
let activeEntry = null;
let currentLesson = null;
let savedWords = readStorage(STORAGE_WORDS, []);
let progressStore = readStorage(STORAGE_PROGRESS, {});

function readStorage(key, fallback) {
  try {
    const value = JSON.parse(localStorage.getItem(key));
    return value ?? fallback;
  } catch (_) {
    return fallback;
  }
}

function writeStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function escapeHtml(value = "") {
  return String(value).replace(/[&<>"']/g, (character) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;"
  })[character]);
}

function showToast(message) {
  nodes.toast.textContent = message;
  nodes.toast.classList.add("is-visible");
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => nodes.toast.classList.remove("is-visible"), 1800);
}

function lessonProgress() {
  if (!currentLesson) return { answers: {}, sections: {}, complete: false };
  return progressStore[currentLesson.date] || { answers: {}, sections: {}, complete: false };
}

function saveProgress(next) {
  if (!currentLesson) return;
  progressStore[currentLesson.date] = next;
  writeStorage(STORAGE_PROGRESS, progressStore);
  updateProgressUI();
}

function updateProgressUI() {
  if (!currentLesson) return;
  const progress = lessonProgress();
  const questions = currentLesson.quiz || [];
  const answered = Object.keys(progress.answers || {}).length;
  const sectionCount = Object.keys(progress.sections || {}).length;
  const quizPart = questions.length ? answered / questions.length * 50 : 50;
  const studyPart = Math.min(sectionCount, 4) / 4 * 40;
  const completePart = progress.complete ? 10 : 0;
  const percent = Math.round(Math.min(100, quizPart + studyPart + completePart));
  document.querySelector("#progress-text").textContent = `${percent}% 완료`;
  document.querySelector("#progress-bar").style.width = `${percent}%`;
  document.querySelector("#complete-lesson").textContent = progress.complete ? "✓ 오늘 학습 완료" : "오늘 학습 완료하기";
  document.querySelector("#complete-lesson").classList.toggle("is-complete", Boolean(progress.complete));

  const correct = questions.reduce((total, question, index) => total + (progress.answers?.[index] === question.answer ? 1 : 0), 0);
  document.querySelector("#score-chip").textContent = `${correct} / ${questions.length}`;
}

function markSection(section) {
  const progress = lessonProgress();
  if (progress.sections?.[section]) return;
  saveProgress({ ...progress, sections: { ...(progress.sections || {}), [section]: true } });
}

function highlightVocabulary(text, vocabulary) {
  const ordered = [...vocabulary].sort((a, b) => b.term.length - a.term.length);
  if (!ordered.length) return escapeHtml(text);
  const pattern = ordered.map((item) => item.term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|");
  const lookup = new Map(ordered.map((item) => [item.term.toLowerCase(), item]));
  return escapeHtml(text).replace(new RegExp(`\\b(${pattern})\\b`, "gi"), (match) => {
    const entry = lookup.get(match.toLowerCase());
    return `<button class="vocab-word" type="button" data-term="${escapeHtml(entry.term)}" aria-expanded="false">${match}</button>`;
  });
}

function positionPopover(target) {
  if (window.matchMedia("(max-width: 760px)").matches) return;
  const targetBox = target.getBoundingClientRect();
  const popoverBox = nodes.popover.getBoundingClientRect();
  const margin = 12;
  let left = targetBox.left + targetBox.width / 2 - popoverBox.width / 2;
  left = Math.max(margin, Math.min(left, window.innerWidth - popoverBox.width - margin));
  let top = targetBox.bottom + 10;
  if (top + popoverBox.height > window.innerHeight - margin) top = targetBox.top - popoverBox.height - 10;
  nodes.popover.style.left = `${left}px`;
  nodes.popover.style.top = `${Math.max(margin, top)}px`;
}

function isWordSaved(term) {
  return savedWords.some((item) => item.term.toLowerCase() === term.toLowerCase());
}

function updatePopoverButton() {
  const button = document.querySelector("#save-popover-word");
  const saved = activeEntry && isWordSaved(activeEntry.term);
  button.textContent = saved ? "✓ 단어장에 저장됨" : "＋ 단어장에 저장";
  button.classList.toggle("is-saved", Boolean(saved));
}

function openPopover(target, vocabulary) {
  const entry = vocabulary.find((item) => item.term === target.dataset.term);
  if (!entry) return;
  if (activeWord && activeWord !== target) activeWord.setAttribute("aria-expanded", "false");
  activeWord = target;
  activeEntry = entry;
  target.setAttribute("aria-expanded", "true");
  document.querySelector("#popover-term").textContent = entry.term;
  document.querySelector("#popover-pos").textContent = entry.partOfSpeech;
  document.querySelector("#popover-meaning").textContent = entry.meaning;
  document.querySelector("#popover-context").textContent = entry.context;
  updatePopoverButton();
  nodes.popover.classList.add("is-visible");
  nodes.popover.setAttribute("aria-hidden", "false");
  requestAnimationFrame(() => positionPopover(target));
}

function closePopover() {
  if (activeWord) activeWord.setAttribute("aria-expanded", "false");
  activeWord = null;
  activeEntry = null;
  nodes.popover.classList.remove("is-visible");
  nodes.popover.setAttribute("aria-hidden", "true");
}

function saveWord(entry) {
  if (!entry || isWordSaved(entry.term)) {
    showToast("이미 단어장에 저장되어 있습니다.");
    return;
  }
  savedWords.unshift({ ...entry, lessonDate: currentLesson?.date || "", savedAt: new Date().toISOString(), learned: false });
  writeStorage(STORAGE_WORDS, savedWords);
  renderWordbook();
  renderGlossary(currentLesson?.vocabulary || []);
  updatePopoverButton();
  showToast(`“${entry.term}”을 단어장에 저장했습니다.`);
}

function removeWord(term) {
  savedWords = savedWords.filter((item) => item.term !== term);
  writeStorage(STORAGE_WORDS, savedWords);
  renderWordbook(document.querySelector("#word-search").value);
  renderGlossary(currentLesson?.vocabulary || []);
  showToast("단어장에서 삭제했습니다.");
}

function toggleLearned(term) {
  savedWords = savedWords.map((item) => item.term === term ? { ...item, learned: !item.learned } : item);
  writeStorage(STORAGE_WORDS, savedWords);
  renderWordbook(document.querySelector("#word-search").value);
}

function attachWordInteractions(vocabulary) {
  document.querySelectorAll(".vocab-word").forEach((word) => {
    word.addEventListener("click", (event) => {
      event.stopPropagation();
      if (activeWord === word) closePopover(); else openPopover(word, vocabulary);
    });
    word.addEventListener("focus", () => openPopover(word, vocabulary));
    word.addEventListener("mouseenter", () => openPopover(word, vocabulary));
    word.addEventListener("mouseleave", () => {
      if (!word.matches(":focus") && !window.matchMedia("(pointer: coarse)").matches) closePopover();
    });
  });
}

function renderGrammar(grammar) {
  document.querySelector("#grammar-title").textContent = grammar?.title || currentLesson.grammarTopic;
  document.querySelector("#grammar-summary").textContent = grammar?.summary || "핵심 문법 설명은 다음 학습 데이터부터 제공됩니다.";
  document.querySelector("#grammar-grid").innerHTML = (grammar?.points || []).map((point, index) => `
    <article class="grammar-card"><span class="card-number">${String(index + 1).padStart(2, "0")}</span><h3>${escapeHtml(point.title)}</h3><p>${escapeHtml(point.explanation)}</p>
    <div class="example-box">${(point.examples || []).map((example) => `<span>${escapeHtml(example)}</span>`).join("")}</div></article>`).join("");
}

function renderIdioms(idioms = []) {
  document.querySelector("#idiom-list").innerHTML = idioms.map((item, index) => `
    <article class="idiom-row"><span class="idiom-number">${index + 1}</span><div><h3>${escapeHtml(item.term)}</h3><strong>${escapeHtml(item.meaning)}</strong><p>${escapeHtml(item.example)}</p></div></article>`).join("");
}

function renderGlossary(vocabulary) {
  nodes.glossary.innerHTML = vocabulary.map((item) => {
    const saved = isWordSaved(item.term);
    return `<article class="glossary-card"><div><strong>${escapeHtml(item.term)}</strong><span>${escapeHtml(item.meaning)}</span></div><p>${escapeHtml(item.context)}</p>
      <button class="card-save ${saved ? "is-saved" : ""}" type="button" data-save-term="${escapeHtml(item.term)}">${saved ? "✓ 저장됨" : "＋ 단어장"}</button></article>`;
  }).join("");
  document.querySelectorAll("[data-save-term]").forEach((button) => button.addEventListener("click", () => {
    saveWord(vocabulary.find((item) => item.term === button.dataset.saveTerm));
  }));
}

function renderQuiz(quiz = []) {
  const answers = lessonProgress().answers || {};
  nodes.quiz.innerHTML = quiz.map((question, questionIndex) => {
    const selected = answers[questionIndex];
    const answered = selected !== undefined;
    return `<article class="quiz-card ${answered ? (selected === question.answer ? "is-correct" : "is-wrong") : ""}">
      <span class="question-number">Q${questionIndex + 1}</span><h3>${escapeHtml(question.question)}</h3>
      <div class="choices">${question.choices.map((choice, choiceIndex) => `<button type="button" data-question="${questionIndex}" data-choice="${choiceIndex}" class="choice ${selected === choiceIndex ? "is-selected" : ""}" ${answered ? "disabled" : ""}><span>${String.fromCharCode(65 + choiceIndex)}</span>${escapeHtml(choice)}</button>`).join("")}</div>
      <div class="answer-note" ${answered ? "" : "hidden"}><strong>${selected === question.answer ? "정답입니다." : `정답: ${String.fromCharCode(65 + question.answer)}`}</strong><p>${escapeHtml(question.explanation)}</p></div>
    </article>`;
  }).join("");
  document.querySelectorAll(".choice").forEach((button) => button.addEventListener("click", () => answerQuestion(Number(button.dataset.question), Number(button.dataset.choice))));
  updateProgressUI();
}

function answerQuestion(questionIndex, choiceIndex) {
  const progress = lessonProgress();
  saveProgress({ ...progress, answers: { ...(progress.answers || {}), [questionIndex]: choiceIndex }, sections: { ...(progress.sections || {}), quiz: true } });
  renderQuiz(currentLesson.quiz || []);
}

function renderWordbook(query = "") {
  const normalized = query.trim().toLowerCase();
  const filtered = savedWords.filter((item) => `${item.term} ${item.meaning} ${item.context}`.toLowerCase().includes(normalized));
  document.querySelector("#saved-count").textContent = savedWords.length;
  document.querySelector("#wordbook-total").textContent = savedWords.length;
  document.querySelector("#empty-wordbook").hidden = savedWords.length > 0;
  document.querySelector("#wordbook-grid").innerHTML = filtered.map((item) => `
    <article class="wordbook-card ${item.learned ? "is-learned" : ""}"><div class="word-card-top"><div><h2>${escapeHtml(item.term)}</h2><span>${escapeHtml(item.partOfSpeech)}</span></div>
    <button class="remove-word" type="button" data-remove="${escapeHtml(item.term)}" aria-label="${escapeHtml(item.term)} 삭제">×</button></div>
    <strong>${escapeHtml(item.meaning)}</strong><p>${escapeHtml(item.context)}</p><footer><time>${escapeHtml(item.lessonDate)}</time>
    <button type="button" data-learned="${escapeHtml(item.term)}">${item.learned ? "✓ 암기함" : "암기 표시"}</button></footer></article>`).join("");
  document.querySelectorAll("[data-remove]").forEach((button) => button.addEventListener("click", () => removeWord(button.dataset.remove)));
  document.querySelectorAll("[data-learned]").forEach((button) => button.addEventListener("click", () => toggleLearned(button.dataset.learned)));
}

function exportWords() {
  if (!savedWords.length) return showToast("내보낼 단어가 없습니다.");
  const quote = (value) => `"${String(value ?? "").replace(/"/g, '""')}"`;
  const rows = [["word", "part_of_speech", "meaning", "context", "lesson_date", "learned"], ...savedWords.map((item) => [item.term, item.partOfSpeech, item.meaning, item.context, item.lessonDate, item.learned ? "yes" : "no"])];
  const blob = new Blob(["\ufeff" + rows.map((row) => row.map(quote).join(",")).join("\n")], { type: "text/csv;charset=utf-8" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `daily-english-vocabulary-${new Date().toISOString().slice(0, 10)}.csv`;
  link.click();
  URL.revokeObjectURL(link.href);
}

function switchView(view) {
  const wordbook = view === "wordbook";
  document.querySelector("#lesson-view").hidden = wordbook;
  document.querySelector("#wordbook-view").hidden = !wordbook;
  document.querySelectorAll("[data-view]").forEach((button) => button.classList.toggle("is-active", button.dataset.view === view));
  if (wordbook) renderWordbook(document.querySelector("#word-search").value);
  history.replaceState(null, "", wordbook ? "#wordbook" : "#lesson");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function renderLesson(lesson) {
  currentLesson = lesson;
  document.querySelector("#lesson-date").textContent = new Intl.DateTimeFormat("ko-KR", { year: "numeric", month: "long", day: "numeric" }).format(new Date(`${lesson.date}T00:00:00`));
  document.querySelector("#lesson-title").textContent = lesson.readingTitle;
  document.querySelector("#grammar-topic").textContent = `Grammar · ${lesson.grammarTopic}`;
  document.querySelector("#word-count").textContent = `${lesson.vocabulary.length} words`;
  renderGrammar(lesson.grammar);
  renderIdioms(lesson.idioms || []);
  nodes.content.innerHTML = lesson.paragraphs.map((paragraph) => `<p>${highlightVocabulary(paragraph, lesson.vocabulary)}</p>`).join("");
  renderGlossary(lesson.vocabulary);
  renderQuiz(lesson.quiz || []);
  attachWordInteractions(lesson.vocabulary);
  renderWordbook();
  updateProgressUI();

  const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
    if (entry.isIntersecting) markSection(entry.target.id);
  }), { threshold: 0.2 });
  ["grammar", "idioms", "reading"].forEach((id) => observer.observe(document.getElementById(id)));
}

document.querySelectorAll("[data-view]").forEach((button) => button.addEventListener("click", () => switchView(button.dataset.view)));
document.querySelector("#word-search").addEventListener("input", (event) => renderWordbook(event.target.value));
document.querySelector("#export-words").addEventListener("click", exportWords);
document.querySelector("#print-lesson").addEventListener("click", () => window.print());
document.querySelector("#save-popover-word").addEventListener("click", (event) => { event.stopPropagation(); saveWord(activeEntry); });
document.querySelector("#complete-lesson").addEventListener("click", () => {
  const progress = lessonProgress();
  saveProgress({ ...progress, complete: !progress.complete });
  showToast(progress.complete ? "완료 표시를 해제했습니다." : "오늘 학습을 완료했습니다!");
});
document.addEventListener("click", closePopover);
document.addEventListener("keydown", (event) => { if (event.key === "Escape") closePopover(); });
window.addEventListener("resize", () => { if (activeWord) positionPopover(activeWord); });
window.addEventListener("scroll", () => { if (activeWord && !window.matchMedia("(max-width: 760px)").matches) positionPopover(activeWord); }, { passive: true });

fetch("../data/learning-history.json")
  .then((response) => { if (!response.ok) throw new Error("Learning history request failed"); return response.json(); })
  .then((data) => {
    if (!data.english?.length) throw new Error("No English lessons available");
    const today = new Intl.DateTimeFormat("en-CA", {
      timeZone: "Asia/Kuala_Lumpur", year: "numeric", month: "2-digit", day: "2-digit"
    }).format(new Date());
    const ordered = [...data.english].sort((a, b) => b.date.localeCompare(a.date));
    const lesson = ordered.find((item) => item.date === today)
      || ordered.find((item) => item.date < today)
      || ordered[ordered.length - 1];
    renderLesson(lesson);
    if (location.hash === "#wordbook") switchView("wordbook");
  })
  .catch(() => {
    document.querySelector("#error-state").hidden = false;
    document.querySelector("#lesson-view").hidden = true;
  });
