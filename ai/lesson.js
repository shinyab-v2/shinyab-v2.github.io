(() => {
 const body=document.querySelector('#lesson-body');
 if(!body)return;
 if(window.renderMathInElement)renderMathInElement(body,{delimiters:[{left:'$$',right:'$$',display:true},{left:'$',right:'$',display:false}],throwOnError:false});
 const headings=[...body.querySelectorAll('h1,h2')];
 const toc=document.querySelector('#toc-links');
 headings.forEach((h,i)=>{h.id='section-'+(i+1);if(toc){const a=document.createElement('a');a.href='#'+h.id;a.textContent=h.textContent;toc.append(a);}});

 // Turn plain-text tensor / architecture flows into responsive visual diagrams.
 [...body.querySelectorAll('pre.text')].forEach(pre=>{
   const raw=pre.textContent.trim();
   const hasFlow=/[↓↑→←]|\n\s*\|\s*\n|Filter\s*#|Feature map/i.test(raw);
   if(!hasFlow){pre.classList.add('concept-text');return;}
   const lines=raw.split('\n').map(s=>s.trim()).filter(Boolean);
   const diagram=document.createElement('div');diagram.className='visual-flow';diagram.setAttribute('role','figure');diagram.setAttribute('aria-label','학습 개념 시각화');
   lines.forEach((line,idx)=>{
     if(/^(↓|↑|→|←|\||▼|▲)$/.test(line)||/^↓\s|^↑\s/.test(line)){
       const arrow=document.createElement('div');arrow.className='flow-arrow';arrow.textContent=line;diagram.append(arrow);return;
     }
     const node=document.createElement('div');node.className='flow-node';
     if(/^\[.*\]$/.test(line)||/torch\.Size|\d+\s*[×x]\s*\d+/.test(line)) node.classList.add('tensor-node');
     if(/Conv|Downsampling|ReLU|Pool|Linear|Loss|Backbone|Classifier|Head/i.test(line)) node.classList.add('op-node');
     if(/Filter\s*#|Feature map/i.test(line)) node.classList.add('feature-node');
     const label=document.createElement('span');label.textContent=line;node.append(label);diagram.append(node);
   });
   const wrap=document.createElement('div');wrap.className='visual-wrap';
   const cap=document.createElement('div');cap.className='visual-caption';cap.innerHTML='<span>VISUAL CONCEPT</span><b>텍스트 흐름을 구조도로 변환</b>';
   wrap.append(cap,diagram);pre.replaceWith(wrap);
 });
})();
