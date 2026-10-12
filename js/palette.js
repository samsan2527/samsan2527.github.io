import { config } from './config.js';
import { content, pillars, solutions, caseStudies, aiApplications } from './data.js';
import { copyEmail } from './contact.js';

export function initPalette({icon,escapeHTML:e}) {
  const items=[...aiApplications.map(app=>({label:app.title,keywords:app.summary,group:'AI application',url:`./index.html?app=${app.id}#ai`})),...content.navigation.map(n=>({label:n.label,group:'Section',url:`./index.html#${n.id}`})),...['process','contact'].map(id=>({label:id==='process'?'How I work':'Contact',group:'Section',url:`./index.html#${id}`})),...pillars.flatMap(p=>p.services.map(s=>({label:s.name,keywords:s.detail,group:p.title,url:`./index.html?interest=${p.id==='ai'?'AI':p.title}#contact`}))),...solutions.map(s=>({label:s.title,keywords:s.modules.join(' '),group:'Solution',url:`./solution.html?id=${s.id}`})),...caseStudies.map(c=>({label:c.title,keywords:c.summary,group:'Project',url:`./case.html?id=${c.id}`})),{label:'Copy email',group:'Action',action:copyEmail},{label:'Open LinkedIn',group:'Action',url:config.linkedin,external:true}];
  const dialog=document.createElement('dialog');dialog.className='palette';dialog.setAttribute('aria-label','Search the portfolio');
  dialog.innerHTML=`<div class="palette-top">${icon('search')}<label class="sr-only" for="palette-search">Search sections, services, solutions and projects</label><input class="palette-input" id="palette-search" type="search" autocomplete="off" placeholder="Where would you like to go?" role="combobox" aria-expanded="true" aria-controls="palette-results" aria-autocomplete="list"><button class="palette-close" aria-label="Close command palette"><kbd>esc</kbd></button></div><ul class="palette-results" id="palette-results" role="listbox" aria-label="Search results"></ul><div class="palette-help"><span>↑ ↓ to navigate</span><span>↵ to open</span><span>esc to close</span></div><div class="sr-only" role="status" id="palette-status"></div>`;
  document.body.append(dialog);
  const input=dialog.querySelector('input'),results=dialog.querySelector('.palette-results');let matches=[],selected=0,opener;
  function score(item,query) {
    const label=item.label.toLowerCase();const text=`${label} ${item.keywords||''}`.toLowerCase();if(!query)return 1;if(label.includes(query))return 100-query.length/100;if(text.includes(query))return 50;
    let pos=0;for(const char of query){pos=text.indexOf(char,pos);if(pos<0)return 0;pos++;}return 10/(1+pos-query.length);
  }
  function render() {
    const query=input.value.toLowerCase().trim();matches=items.map(item=>({item,score:score(item,query)})).filter(x=>x.score>0).sort((a,b)=>b.score-a.score).slice(0,10).map(x=>x.item);selected=0;
    results.innerHTML=matches.length?matches.map((item,i)=>`<li class="palette-option" id="result-${i}" role="option" aria-selected="${i===0}" data-index="${i}"><span class="result-label">${e(item.label)}</span><span class="mono">${e(item.group)} ↗</span></li>`).join(''):'<li class="empty-state">No matching systems. Try “EMR”, “AI” or “email”.</li>';
    if(matches.length)input.setAttribute('aria-activedescendant','result-0');else input.removeAttribute('aria-activedescendant');
    dialog.querySelector('#palette-status').textContent=`${matches.length} results`;
  }
  function select(index){selected=index;results.querySelectorAll('[role=option]').forEach((el,i)=>el.setAttribute('aria-selected',String(i===index)));input.setAttribute('aria-activedescendant',`result-${index}`);document.getElementById(`result-${index}`)?.scrollIntoView({block:'nearest'});}
  function close(){dialog.close();document.body.style.overflow='';opener?.focus();}
  function open(){if(dialog.open)return;opener=document.activeElement;input.value='';render();dialog.showModal();document.body.style.overflow='hidden';input.focus();}
  function choose(){const item=matches[selected];if(!item)return;close();if(item.action)item.action();else if(item.external)window.open(item.url,'_blank','noopener,noreferrer');else location.assign(item.url);}
  document.querySelector('.palette-trigger').addEventListener('click',open);
  document.addEventListener('keydown',event=>{if((event.metaKey||event.ctrlKey)&&event.key.toLowerCase()==='k'){event.preventDefault();dialog.open?close():open();}});
  input.addEventListener('input',render);
  input.addEventListener('keydown',event=>{if(event.key==='ArrowDown'||event.key==='ArrowUp'){event.preventDefault();if(matches.length)select((selected+(event.key==='ArrowDown'?1:-1)+matches.length)%matches.length);}else if(event.key==='Enter'){event.preventDefault();choose();}});
  results.addEventListener('click',event=>{const row=event.target.closest('[data-index]');if(row){selected=Number(row.dataset.index);choose();}});
  dialog.querySelector('.palette-close').addEventListener('click',close);dialog.addEventListener('cancel',event=>{event.preventDefault();close();});dialog.addEventListener('click',event=>{if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)close();}});
}
