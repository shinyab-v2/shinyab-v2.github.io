(() => {
 const body=document.querySelector("#lesson-body");
 if(!body)return;
 if(window.renderMathInElement)renderMathInElement(body,{delimiters:[{left:'$$',right:'$$',display:true},{left:'$',right:'$',display:false}],throwOnError:false});
 const headings=[...body.querySelectorAll('h1,h2')];
 const toc=document.querySelector("#toc-links");
 headings.forEach((h,i)=>{h.id='section-'+(i+1);const a=document.createElement('a');a.href='#'+h.id;a.textContent=h.textContent;toc.append(a);});
})();
