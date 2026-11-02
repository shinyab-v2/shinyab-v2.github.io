(() => {
  function renderAll() {
    const body = document.querySelector('#lesson-body') || document.querySelector('.lesson-main') || document.body;
    if (!body) return;

    // 1. KaTeX 수식 렌더링 방어
    if (window.renderMathInElement) {
      renderMathInElement(body, {
        delimiters: [
          { left: '$$', right: '$$', display: true },
          { left: '$', right: '$', display: false },
          { left: '\\(', right: '\\)', display: false },
          { left: '\\[', right: '\\]', display: true }
        ],
        throwOnError: false
      });
    }

    // 2. TOC 자동 생성
    const headings = [...body.querySelectorAll('h1,h2')];
    const toc = document.querySelector('#toc-links');
    if (toc && toc.children.length === 0) {
      headings.forEach((h, i) => {
        if (!h.id) h.id = 'section-' + (i + 1);
        const a = document.createElement('a');
        a.href = '#' + h.id;
        a.textContent = h.textContent;
        toc.append(a);
      });
    }

    // 3. 텍스트 흐름 다이어그램 자동 변환
    [...body.querySelectorAll('pre.text')].forEach(pre => {
      const raw = pre.textContent.trim();
      const hasFlow = /[↓↑→←]|\n\s*\|\s*\n|Filter\s*#|Feature map/i.test(raw);
      if (!hasFlow) { pre.classList.add('concept-text'); return; }
      const lines = raw.split('\n').map(s => s.trim()).filter(Boolean);
      const diagram = document.createElement('div');
      diagram.className = 'visual-flow';
      diagram.setAttribute('role', 'figure');
      diagram.setAttribute('aria-label', '학습 개념 시각화');
      lines.forEach((line) => {
        if (/^(↓|↑|→|←|\||▼|▲)$/.test(line) || /^↓\s|^↑\s/.test(line)) {
          const arrow = document.createElement('div');
          arrow.className = 'flow-arrow';
          arrow.textContent = line;
          diagram.append(arrow);
          return;
        }
        const node = document.createElement('div');
        node.className = 'flow-node';
        if (/^\[.*\]$/.test(line) || /torch\.Size|\d+\s*[×x]\s*\d+/.test(line)) node.classList.add('tensor-node');
        if (/Conv|Downsampling|ReLU|Pool|Linear|Loss|Backbone|Classifier|Head/i.test(line)) node.classList.add('op-node');
        if (/Filter\s*#|Feature map/i.test(line)) node.classList.add('feature-node');
        const label = document.createElement('span');
        label.textContent = line;
        node.append(label);
        diagram.append(node);
      });
      const wrap = document.createElement('div');
      wrap.className = 'visual-wrap';
      const cap = document.createElement('div');
      cap.className = 'visual-caption';
      cap.innerHTML = '<span>VISUAL CONCEPT</span><b>텍스트 흐름을 구조도로 변환</b>';
      wrap.append(cap, diagram);
      pre.replaceWith(wrap);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderAll);
  } else {
    renderAll();
  }
  window.addEventListener('load', renderAll);
})();
