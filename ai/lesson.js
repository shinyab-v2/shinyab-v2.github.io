(() => {
 const src=document.querySelector("#lesson-source");
 if(!src)return;
 const raw=JSON.parse(src.textContent);
 const cleaned=raw
  .replace(/<callout[^>]*>/g,'<div class="callout">').replace(/<\/callout>/g,'</div>')
  .replace(/<table[^>]*>/g,'<table>').replace(/<td>/g,'<td>').replace(/<\/td>/g,'</td>')
  .replace(/<equation[^>]*>(.*?)<\/equation>/gs,'$$$$1$$')
  .replace(/^\t/gm,'');
 const body=document.querySelector("#lesson-body");
 if(window.marked){marked.setOptions({gfm:true,breaks:false});body.innerHTML=marked.parse(cleaned);}
 else{const pre=document.createElement("pre");pre.textContent=cleaned;body.append(pre);}
 if(window.renderMathInElement)renderMathInElement(body,{delimiters:[{left:'$$',right:'$$',display:true},{left:'$',right:'$',display:false}],throwOnError:false});
 const headings=[...body.querySelectorAll('h1,h2')];
 const toc=document.querySelector("#toc-links");
 headings.forEach((h,i)=>{h.id='section-'+(i+1);const a=document.createElement('a');a.href='#'+h.id;a.textContent=h.textContent;toc.append(a);});
})();
