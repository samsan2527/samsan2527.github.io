import { config } from './config.js';
import { content, solutions, aiApplications, simpleDescriptions, mobileApps, personalAgent } from './data.js';

const software=solutions.filter(s=>s.id!=='mobile');
const pad=n=>String(n).padStart(2,'0');
const words=(text,e)=>text.split(' ').map(w=>`<span class="lm-word">${e(w)}</span>`).join(' ');

export function renderShowcase({e,icon,contactSection}) {
  const split=(label,url,cls='')=>`<a class="lm-split ${cls}" href="${url}"><span>${e(label)}</span><b aria-hidden="true">${icon()}</b></a>`;
  const featured=(s,i)=>`<div class="lm-featured-copy"><h3>${e(s.title)}</h3><p>${e(simpleDescriptions[s.id])}</p><a class="lm-visit" href="./solution.html?id=${e(s.id)}">View details <b aria-hidden="true">${icon()}</b></a></div><div class="lm-featured-panel"><span class="lm-mono">${pad(i+1)} / ${pad(software.length)}</span><strong>${e(s.title)}</strong><span class="lm-mono">${e(s.category)} · ${s.modules.length} modules</span></div>`;
  const tiles=[
    {n:'01',icon:'software',title:'Software Apps',text:`${software.length} business applications for clinics, sales, HR, finance and more.`,href:'#solutions'},
    {n:'02',icon:'ai',title:'AI Apps',text:'Assistants, chatbots and vision that answer questions and reduce repetitive work.',href:'#ai'},
    {n:'03',icon:'systems',title:'Mobile Apps',text:'iPhone and Android apps with AI features, connected to the tools you use.',href:'#mobile'},
  ];
  return `
    <section class="hero studio-hero lm-hero" id="about">
      <span id="hero" class="anchor-alias"></span>
      <div class="fluid-field" id="aurora" aria-hidden="true"><div class="fluid-blob blob-one"></div><div class="fluid-blob blob-two"></div><div class="fluid-blob blob-three"></div><div class="fluid-blob blob-four"></div></div>
      <div class="lm-hero-content">
        <p class="lm-hero-kicker">Hi, I’m ${e(config.displayName)} — software & AI engineer</p>
        <h1><span class="lm-rise"><span>Simple solutions,</span></span><span class="lm-rise"><span>for your business.</span></span></h1>
        <div class="lm-hero-bottom"><div><p>I build software and AI apps that help you manage your business, support customers, and save time.</p><span class="lm-mono">${e(config.location)} · ${e(config.region)}</span></div>${split('Explore my apps','#offer','lm-split-light')}</div>
      </div>
    </section>

    <section class="lm-statement" aria-labelledby="approach-title">
      <div class="lm-wrap">
        <div class="lm-statement-top"><p>From an idea to a working application — without the hand-offs in between.</p><a class="lm-ghost" href="#offer">How I can help ${icon()}</a></div>
        <div class="lm-statement-grid">
          <div class="lm-label-stack"><span class="lm-pill">01 / 03</span><span class="lm-mono">The approach</span></div>
          <h2 id="approach-title" class="lm-scrub" data-scrub><span class="lm-lead">Most businesses juggle too many tools.</span> ${words('Tell me what you need. I’ll help you choose the right approach, build it, and connect it to the tools you already use.',e)}</h2>
        </div>
      </div>
      <canvas class="lm-ribbons" aria-hidden="true"></canvas>
    </section>

    <section class="lm-offer" id="offer" aria-labelledby="offer-title">
      <span id="expertise" class="anchor-alias"></span>
      <div class="lm-arc" aria-hidden="true"></div>
      <div class="lm-wrap lm-offer-grid">
        <div class="lm-label-stack"><span class="lm-pill">02 / 03</span><span class="lm-mono">What I build</span></div>
        <div class="lm-offer-copy">
          <h2 id="offer-title" class="lm-display">Everything your business needs to run, built to actually <span class="lm-dim">move work forward.</span></h2>
          <p>I replace the patchwork of spreadsheets, inboxes and disconnected tools with software shaped around the way your team works. AI takes care of the repetitive tasks, and mobile apps keep everyone connected on the go.</p>
          ${split('Discover the apps','#solutions')}
        </div>
      </div>
      <ul class="lm-tiles">${tiles.map(t=>`<li><a href="${t.href}"><span class="lm-tile-num lm-mono">${t.n}.</span>${icon(t.icon,'lm-tile-icon')}<span class="lm-tile-copy"><strong>${e(t.title)}</strong><span>${e(t.text)}</span></span></a></li>`).join('')}</ul>
    </section>

    <section class="lm-section lm-wrap lm-agent" id="agent" aria-labelledby="agent-title">
      <div class="lm-head"><div class="lm-label-stack"><span class="lm-pill">Personal agent</span></div><div><h2 id="agent-title" class="lm-display">${e(personalAgent.title)} <span class="lm-dim">${e(personalAgent.emphasis)}</span></h2><p>${e(personalAgent.description)}</p></div></div>
      <div class="lm-agent-grid">
        <div class="lm-agent-copy">
          <ul class="lm-checks">${personalAgent.points.map(p=>`<li>${icon('check')}<span>${e(p)}</span></li>`).join('')}</ul>
          ${split('Ask about Personal Agent','./index.html?interest=Personal%20Agent#contact')}
        </div>
        <figure class="lm-agent-chat">
          <figcaption class="lm-chat-head"><span class="lm-chat-dot" aria-hidden="true"></span><strong>Personal Agent</strong><span class="lm-mono">Example · ${personalAgent.connectors.length} apps connected</span></figcaption>
          <p class="lm-bubble lm-bubble-user">${e(personalAgent.example.prompt)}</p>
          <div class="lm-bubble lm-bubble-agent"><p>${e(personalAgent.example.reply)}</p><ul>${personalAgent.example.items.map(([source,text])=>`<li><span class="lm-source">${e(source)}</span>${e(text)}</li>`).join('')}</ul></div>
        </figure>
      </div>
      <ul class="lm-connectors" aria-label="Apps the Personal Agent connects to">${personalAgent.connectors.map(c=>`<li>${icon(c.icon,'lm-connector-icon')}<strong>${e(c.name)}</strong><span>${e(c.detail)}</span></li>`).join('')}<li class="lm-connector-hub">${icon('ai','lm-connector-icon')}<strong>One agent</strong><span>No switching between portals</span></li></ul>
    </section>

    <section class="lm-section lm-wrap" id="solutions" aria-labelledby="software-title">
      <div class="lm-head"><div class="lm-label-stack"><span class="lm-pill">Software apps</span></div><div><h2 id="software-title" class="lm-display">Software for everyday work.</h2><p>Choose an application to see what it can do for your business.</p></div></div>
      <div class="lm-featured" data-featured>${featured(software[0],0)}</div>
      <ul class="lm-logo-grid">${software.map((s,i)=>`<li><a class="lm-logo" href="./solution.html?id=${e(s.id)}" data-index="${i}"${i===0?' aria-current="true"':''}><span class="lm-mono">${pad(i+1)}</span><strong>${e(s.title)}</strong></a></li>`).join('')}<li><a class="lm-logo lm-logo-more" href="./solutions.html"><span class="lm-mono">All</span><strong>See the full collection ${icon()}</strong></a></li><li><a class="lm-logo lm-logo-more" href="#contact"><span class="lm-mono">Custom</span><strong>Something else? Let’s talk ${icon()}</strong></a></li></ul>
    </section>

    <section class="lm-section lm-wrap" id="ai" aria-labelledby="ai-title">
      <div class="lm-head"><div class="lm-label-stack"><span class="lm-pill">AI apps</span></div><div><h2 id="ai-title" class="lm-display">A little help <span class="lm-dim">from AI.</span></h2><p>Answer questions, reduce repetitive work, and find the information you need.</p></div></div>
      <ul class="lm-ai-grid">${aiApplications.map((app,i)=>`<li id="app-${e(app.id)}" class="lm-ai-card"><span class="lm-tile-num lm-mono">${pad(i+1)}.</span>${icon(i===4?'input':'ai','lm-tile-icon')}<h3>${e(app.title)}</h3><p>${e(simpleDescriptions[app.id])}</p><a href="./index.html?interest=AI#contact" aria-label="Ask about ${e(app.title)}">Ask about this app ${icon()}</a></li>`).join('')}</ul>
    </section>

    <section class="lm-section lm-wrap" id="mobile" aria-labelledby="mobile-title">
      <div class="lm-head"><div class="lm-label-stack"><span class="lm-pill">Mobile apps</span></div><div><h2 id="mobile-title" class="lm-display">Your business. <span class="lm-dim">On mobile.</span></h2><p>Custom iPhone and Android apps, with AI features and connections to the tools you use.</p></div></div>
      <ul class="lm-plans">${mobileApps.map(app=>`<li class="lm-plan"><h3>${e(app.title)}</h3><p>${e(app.description)}</p>${split('Let’s discuss','./index.html?interest=Mobile%20Apps#contact','lm-split-dark')}</li>`).join('')}</ul>
      <a class="lm-ghost lm-more" href="./solution.html?id=mobile">More about mobile app development ${icon()}</a>
    </section>

    <div class="lm-contact">${contactSection()}</div>
  `;
}

export function initShowcase() {
  const params=new URLSearchParams(location.search);
  const interest=params.get('interest');
  if(content.contact.interests.includes(interest))document.querySelector('#service').value=interest;
  const app=aiApplications.find(item=>item.id===params.get('app'));
  if(app)requestAnimationFrame(()=>{const card=document.getElementById(`app-${app.id}`);card.classList.add('highlighted');card.scrollIntoView({block:'center'});});

  const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{
    if(!entry.isIntersecting)return;
    document.querySelectorAll('[data-section]').forEach(link=>{
      const active=link.dataset.section===entry.target.id;
      link.classList.toggle('active',active);
      if(active)link.setAttribute('aria-current','location');else link.removeAttribute('aria-current');
    });
  }),{rootMargin:'-15% 0px -50% 0px'});
  document.querySelectorAll('main section[id]').forEach(section=>observer.observe(section));

  initFeatured();
  initScrub();
  const ribbons=document.querySelector('.lm-ribbons');
  if(ribbons)import('./ribbons.js').then(({initRibbons})=>initRibbons(ribbons)).catch(()=>{});
}

// Hovering or focusing an app in the grid previews it in the featured card.
function initFeatured() {
  const host=document.querySelector('[data-featured]');
  if(!host)return;
  const e=value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const copy=host.querySelector('.lm-featured-copy'),panel=host.querySelector('.lm-featured-panel');
  let current=0;
  const show=index=>{
    if(index===current)return;current=index;const s=software[index];
    document.querySelectorAll('.lm-logo[data-index]').forEach(a=>a.toggleAttribute('aria-current',Number(a.dataset.index)===index));
    copy.querySelector('h3').textContent=s.title;copy.querySelector('p').textContent=simpleDescriptions[s.id];copy.querySelector('a').href=`./solution.html?id=${encodeURIComponent(s.id)}`;
    panel.innerHTML=`<span class="lm-mono">${pad(index+1)} / ${pad(software.length)}</span><strong>${e(s.title)}</strong><span class="lm-mono">${e(s.category)} · ${s.modules.length} modules</span>`;
    host.classList.remove('lm-swap');void host.offsetWidth;host.classList.add('lm-swap');
  };
  document.querySelectorAll('.lm-logo[data-index]').forEach(a=>{
    const pick=()=>show(Number(a.dataset.index));
    a.addEventListener('pointerenter',pick);a.addEventListener('focus',pick);
  });
}

// Words brighten as the statement scrolls through the viewport.
function initScrub() {
  const el=document.querySelector('[data-scrub]');
  if(!el)return;
  const list=[...el.querySelectorAll('.lm-word')];
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  let queued=false;
  const update=()=>{
    queued=false;
    if(reduced.matches||document.documentElement.classList.contains('motion-paused')){list.forEach(w=>w.classList.add('lit'));return;}
    const r=el.getBoundingClientRect(),start=innerHeight*.85,end=innerHeight*.35;
    const progress=Math.min(1,Math.max(0,(start-r.top)/(start-end+r.height*.6)));
    const lit=Math.round(progress*list.length);
    list.forEach((w,i)=>w.classList.toggle('lit',i<lit));
  };
  const queue=()=>{if(!queued){queued=true;requestAnimationFrame(update);}};
  addEventListener('scroll',queue,{passive:true});addEventListener('resize',queue);
  document.addEventListener('motionchange',queue);reduced.addEventListener('change',queue);
  update();
}
