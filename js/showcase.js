import { config } from './config.js';
import { content, showcase, aiApplications, solutions, softwareStories } from './data.js';

const motion = () => !matchMedia('(prefers-reduced-motion: reduce)').matches && !document.documentElement.classList.contains('motion-paused');
let e, icon;

export function renderShowcase(helpers) {
  ({ e, icon } = helpers);
  const { hero, statement, ai, software, about } = showcase;
  return `
    <section class="hero studio-hero" id="hero">
      <div class="fluid-field" id="aurora" aria-hidden="true"><div class="fluid-blob blob-one"></div><div class="fluid-blob blob-two"></div><div class="fluid-blob blob-three"></div><div class="fluid-blob blob-four"></div></div>
      <div class="hero-grain" aria-hidden="true"></div>
      <div class="studio-hero-content">
        <div class="hero-kicker mono"><span class="status-dot"></span>${e(hero.label)}</div>
        <h1>${hero.lines.map(line=>`<span>${e(line)}</span>`).join('')}</h1>
        <div class="hero-bottom-layout"><div><p>${e(hero.description)}</p><span class="hero-location mono">${e(config.location)} <span>↗</span> ${e(config.region)}</span></div><a href="#collections" class="studio-button hero-explore">${e(hero.cta)}<span>${icon('arrow')}</span></a></div>
        <div class="hero-baseline mono"><span>${e(hero.footnote)}</span><a href="#collections">SCROLL TO DISCOVER ${icon('down')}</a></div>
      </div>
    </section>
    <div class="collection-switch wrap" id="collections" aria-label="The two application collections">
      <a href="#ai" class="collection-entry ai-entry"><div class="collection-symbol">${icon('ai')}</div><span class="mono">01 / Intelligence</span><h2>AI-based applications ${icon()}</h2><p>From Novo Agent to your own custom chatbot.</p></a>
      <a href="#solutions" class="collection-entry software-entry"><div class="collection-symbol">${icon('systems')}</div><span class="mono">02 / Engineering</span><h2>Software applications ${icon()}</h2><p>Purpose-built platforms. One connected business.</p></a>
    </div>
    <section class="manifesto wrap" aria-label="The approach"><span class="mono section-caption">${e(statement.label)}</span><p class="manifesto-copy"><span>${e(statement.lead)}</span> <span class="muted">${e(statement.rest)}</span></p><div class="signal-ribbons" aria-hidden="true">${ribbons()}</div></section>
    <section class="application-section wrap" id="ai"><span id="expertise" class="anchor-alias"></span><div class="collection-heading"><div class="section-caption mono">01 / ${e(ai.title)}</div><div><h2>${e(ai.subtitle)}</h2><p>${e(ai.description)}</p></div></div>
      <div class="ai-showcase"><div class="ai-selector" role="tablist" aria-label="AI-based applications" aria-orientation="vertical">${aiApplications.map((app,i)=>`<button role="tab" id="ai-tab-${app.id}" aria-selected="${i===0}" aria-controls="ai-panel" tabindex="${i===0?0:-1}" data-ai="${i}"><span class="mono">${String(i+1).padStart(2,'0')}</span><span>${e(app.title)}</span>${icon()}</button>`).join('')}<div class="selector-note"><span class="status-dot"></span>Built around your business.<br>Connected to your systems.</div></div><div id="ai-panel" role="tabpanel" aria-labelledby="ai-tab-novoagent" tabindex="0">${aiPanel(aiApplications[0])}</div></div>
      <div class="application-footer"><span class="mono">Intelligence is useful when it can do something.</span><a class="text-link" href="./work.html">Explore the project outlines ${icon()}</a></div>
    </section>
    <section class="application-section software-section wrap" id="solutions"><div class="collection-heading"><div class="section-caption mono">02 / ${e(software.title)}</div><div><h2>${e(software.subtitle)}</h2><p>${e(software.description)}</p></div></div>
      <div class="software-carousel" role="region" aria-roledescription="carousel" aria-label="Software applications storyboard" tabindex="0">
        <div class="software-picker" role="tablist" aria-label="Choose a software application">${solutions.map((s,i)=>`<button role="tab" id="software-tab-${s.id}" aria-selected="${i===0}" aria-controls="software-panel" tabindex="${i===0?0:-1}" data-software="${i}"><span class="mono">${String(i+1).padStart(2,'0')}</span>${e(shortName(s))}</button>`).join('')}</div>
        <div class="software-story" id="software-panel" role="tabpanel" aria-labelledby="software-tab-emr" tabindex="0">${softwarePanel(solutions[0],0)}</div>
        <div class="story-controls"><div class="story-progress"><span id="story-position" class="mono">01 / ${String(solutions.length).padStart(2,'0')}</span><div class="story-meter" aria-hidden="true"><span style="width:${100/solutions.length}%"></span></div><span class="story-current">${e(solutions[0].title)}</span></div><div class="story-arrows"><button class="story-prev" aria-label="Previous software application">${icon('arrow')}</button><button class="story-next" aria-label="Next software application">${icon('arrow')}</button></div></div>
        <div class="sr-only" id="story-announcement" role="status" aria-live="polite"></div>
      </div><div class="application-footer"><span class="mono">15 solutions. Designed to work together.</span><a class="text-link" href="./solutions.html">View the complete collection ${icon()}</a></div>
    </section>
    <div class="industry-line wrap"><span class="mono">Built for your world</span><div>${content.industries.map(i=>`<span>${e(i)}</span>`).join('')}</div></div>
    <section class="studio-about wrap" id="about"><div class="collection-heading"><div class="section-caption mono">The person behind the platforms</div><div><h2>${e(about.title)}<br><span class="muted">${e(about.emphasis)}</span></h2><p>${e(about.text)}</p></div></div><div class="principle-grid" id="process">${about.principles.map((p,i)=>`<article class="principle-card" tabindex="0">${icon(['input','systems','ai'][i])}<span class="mono">0${i+1} / ${['Understand','Connect','Evolve'][i]}</span><h3>${e(p.title)}</h3><p>${e(p.text)}</p></article>`).join('')}</div><div class="application-footer" id="work"><span class="mono">${e(config.title)}</span><a class="text-link" href="${e(config.linkedin)}" target="_blank" rel="noopener noreferrer">Meet me on LinkedIn ${icon()}</a></div></section>
    <div class="stack-strip" aria-label="Technology stack" tabindex="0"><div class="stack-track">${[false,true].map(hidden=>`<div class="stack-group" ${hidden?'aria-hidden="true"':''}>${content.stack.map(s=>`<span>${e(s)}</span>`).join('')}</div>`).join('')}</div></div>
    <div class="studio-contact">${helpers.contactSection()}</div>
  `;
}

function ribbons() {
  return `<svg viewBox="0 0 1400 210" preserveAspectRatio="none"><defs><linearGradient id="ribbon-gradient"><stop stop-color="#61bbc8"/><stop offset=".4" stop-color="#bec8ee"/><stop offset=".7" stop-color="#ebad83"/><stop offset="1" stop-color="#cfcd69"/></linearGradient></defs>${Array.from({length:7},(_,i)=>`<path d="M-30 ${140+i*5} C250 ${5+i*13},360 ${240-i*28},640 ${85+i*8} S1120 ${30+i*14},1430 ${155-i*5}" fill="none" stroke="url(#ribbon-gradient)" stroke-width="${i%3+1.3}" opacity="${.4+i*.08}"/>`).join('')}</svg>`;
}

function aiPanel(app) {
  return `<div class="ai-story-copy"><span class="mono section-caption">${e(app.type)}</span><h3>${e(app.headline).replace('\n','<br>')}</h3><p>${e(app.summary)}</p><div class="story-features">${app.features.map(f=>`<span>${icon('plus')}${e(f)}</span>`).join('')}</div><div class="story-links"><a class="studio-button" href="./index.html?interest=AI#contact">Build it for my business <span>${icon()}</span></a><a class="quiet-link" href="./case.html?id=${e(app.caseId)}">Explore the approach ↗</a></div></div><div class="ai-visual visual-${app.color}">${agentPreview(app)}<span class="visual-caption mono">Interface concept · illustrative workflow</span></div>`;
}

function agentPreview(app) {
  const chat=app.visual==='chat';
  return `<div class="agent-window" aria-hidden="true"><div class="agent-window-top"><span class="agent-brand">${icon('ai')} ${e(app.title)}</span><span class="window-dots"><i></i><i></i><i></i></span></div><div class="agent-workspace"><span class="preview-eyebrow">${chat?'YOUR CUSTOMER, CONNECTED':'A LITTLE CONTEXT. A LOT OF POSSIBILITY.'}</span>${app.visual==='voice'?`<div class="voice-wave">${Array.from({length:34},(_,i)=>`<i style="--bar:${20+Math.sin(i*1.3)**2*65}%;--delay:${i*.08}s"></i>`).join('')}</div>`:app.visual==='vision'?`<div class="vision-frame"><div class="vision-person person-one"></div><div class="vision-person person-two"></div><span>Occupancy / activity zones</span></div>`:`<div class="agent-welcome">${icon('ai')}<h4>${chat?'Every conversation,<br>a little more helpful.':'What can we<br>move forward today?'}</h4></div>`}<div class="preview-user"><span>${e(app.prompt)}</span><b>S</b></div><div class="preview-answer"><span class="assistant-glyph">${icon('ai')}</span><p>${e(app.response)}</p></div><div class="agent-tasklist">${app.steps.map((s,i)=>`<div><span class="task-check">${i<2?'✓':'·'}</span>${e(s)}<span>${i<2?'Ready':'Review'}</span></div>`).join('')}</div><div class="agent-composer"><span>${chat?'Write a message…':'Ask, connect, or create…'}</span><b>↑</b></div></div></div><div class="floating-token token-one">${icon('systems')} ${chat?'Your knowledge':'Your systems'}</div><div class="floating-token token-two"><span class="tiny-spark"></span> ${chat?'Human handoff':'You stay in control'}</div>`;
}

const shortName = s => ({emr:'EMR',insurance:'Insurance',mobile:'Mobile apps',hrms:'HR software',attendance:'Attendance',crm:'CRM',erp:'ERP',finance:'Finance',banking:'Banking',gym:'Gym',dms:'Documents',assets:'Assets',token:'Queues',web:'Websites',brand:'Branding'}[s.id]||s.title);

function softwarePanel(s,index) {
  const story=softwareStories[s.id]||{headline:s.title,category:s.category,visual:'board',color:'mint'};
  return `<div class="software-story-copy"><div class="story-eyebrow mono"><span>APPLICATION / ${String(index+1).padStart(2,'0')}</span><span>${e(story.category)}</span></div><h3>${e(story.headline).replace('\n','<br>')}</h3><p>${e(s.summary)}</p><div class="module-pills">${s.modules.slice(0,5).map(m=>`<span>${e(m)}</span>`).join('')}${s.modules.length>5?`<span>+${s.modules.length-5} more</span>`:''}</div><a class="studio-button" href="./solution.html?id=${e(s.id)}">Explore ${e(shortName(s))}<span>${icon()}</span></a></div><div class="software-visual visual-${story.color}">${softwarePreview(s,story)}<span class="visual-caption mono">Interface concept · sample data</span></div>`;
}

function softwarePreview(s,story) {
  if(story.visual==='mobile')return `<div class="phone-composition" aria-hidden="true"><div class="phone-back"></div><div class="phone-front"><div class="phone-camera"></div><div class="phone-status">9:41 <span>••• ▰</span></div><div class="phone-greeting">Good morning,<br><strong>make today count.</strong></div><div class="phone-orb">${icon('ai')}</div><div class="phone-card"><small>YOUR DAY, CONNECTED</small><strong>Everything in one place.</strong><p>Appointments, updates, and the next useful step.</p></div><div class="phone-apps">${['Home','Explore','Updates'].map(x=>`<span>${icon('software')}${x}</span>`).join('')}</div></div><span class="platform-chip">iOS · Android · Cross-platform</span></div>`;
  if(story.visual==='brand')return `<div class="brand-composition" aria-hidden="true"><div class="brand-sheet"><span class="mono">IDENTITY / SYSTEM 01</span><div class="brand-monogram">s<span>↗</span></div><div class="brand-sheet-footer">A distinct point of view.<div><i></i><i></i><i></i></div></div></div><div class="brand-small">Made to<br><em>move.</em></div></div>`;
  if(story.visual==='web')return `<div class="browser-preview web-preview" aria-hidden="true"><div class="browser-chrome"><i></i><i></i><i></i><span>your-next-idea.com</span></div><div class="mini-website"><div class="mini-web-nav">Studio / <span>About &nbsp; Work &nbsp; Contact ↗</span></div><h4>Some ideas<br>deserve a<br><em>bigger canvas.</em></h4><div class="mini-web-orb"></div><div class="mini-web-bottom">Built to be remembered. <span>Explore ↗</span></div></div></div>`;
  const clinic=story.visual==='clinic', people=story.visual==='people',finance=story.visual==='finance';
  const labels=clinic?['Appointments','Checked in','Awaiting review']:people?['Team members','On schedule','Pending review']:finance?['Income','Expenses','Pending review']:['Active items','In progress','Awaiting review'];
  const values=clinic?['24','08','03']:people?['48','42','06']:finance?['84,200','32,800','04']:['32','18','06'];
  const rows=clinic?[['09:00','Consultation','Confirmed'],['09:30','Follow-up','Checked in'],['10:00','Consultation','Scheduled']]:people?[['AM','Operations','Present'],['AM','Client services','Present'],['PM','Engineering','Scheduled']]:finance?[['INV-01','Consulting','Received'],['INV-02','Services','Pending'],['INV-03','Operations','Received']]:[['01',s.modules[0],'In progress'],['02',s.modules[1],'Ready'],['03',s.modules[2],'Review']];
  return `<div class="browser-preview dashboard-preview" aria-hidden="true"><div class="browser-chrome"><i></i><i></i><i></i><span>${e(shortName(s).toLowerCase())} / workspace</span></div><div class="dashboard-body"><aside class="preview-sidebar"><div class="preview-app-icon">${icon('software')}</div>${[0,1,2,3,4].map((n)=>`<div class="sidebar-mark ${n===0?'selected':''}">${icon(['input','systems','software','automation','ai'][n])}</div>`).join('')}<div class="sidebar-avatar">S</div></aside><div class="preview-main"><div class="preview-top"><div><span class="preview-eyebrow">${e(s.title)}</span><h4>${clinic?'A good day for better care.':people?'Your people, in the picture.':finance?'A clear view of the numbers.':'Your operation, in focus.'}</h4></div><span class="preview-user-avatar">S</span></div><div class="preview-stats">${labels.map((label,i)=>`<div><span>${label}</span><strong>${values[i]}</strong><small>${i===0?'Overview':'This workspace'}</small></div>`).join('')}</div><div class="preview-chart"><div><span>${finance?'Cash flow overview':clinic?'Appointment activity':'Activity overview'}</span><small>THIS WEEK</small></div><div class="chart-bars">${[36,57,43,74,63,86,68,52,78,95,64,82].map((height,i)=>`<i style="height:${height}%;--delay:${i*.035}s"></i>`).join('')}</div><div class="chart-axis"><span>MON</span><span>TUE</span><span>WED</span><span>THU</span><span>FRI</span></div></div><div class="preview-table"><div class="preview-table-head"><span>${clinic?'Today’s appointments':people?'Team overview':finance?'Recent transactions':'Recent activity'}</span><span>View all ↗</span></div>${rows.map(([a,b,c])=>`<div class="preview-table-row"><span>${e(a)}</span><span>${e(b)}</span><span>${e(c)}</span></div>`).join('')}</div></div></div></div><div class="software-floating-card"><span class="floating-check">✓</span><div>Everything, connected.<small>One shared source of truth.</small></div></div>`;
}

export function initShowcase() {
  const aiTabs=[...document.querySelectorAll('[data-ai]')];
  const softwareTabs=[...document.querySelectorAll('[data-software]')];
  let softwareIndex=0;
  function transition(panel,render) {
    panel.getAnimations().forEach(animation=>animation.cancel());
    render();
    if(motion())panel.animate([{opacity:.2,transform:'translateY(9px)'},{opacity:1,transform:'translateY(0)'}],{duration:420,easing:'cubic-bezier(.2,.65,.2,1)'});
  }
  function selectAI(index) {
    aiTabs.forEach((tab,i)=>{tab.setAttribute('aria-selected',String(i===index));tab.tabIndex=i===index?0:-1;});
    const panel=document.querySelector('#ai-panel');panel.setAttribute('aria-labelledby',aiTabs[index].id);
    transition(panel,()=>{panel.innerHTML=aiPanel(aiApplications[index]);});
  }
  function selectSoftware(index,{focus=false}={}) {
    softwareIndex=(index+solutions.length)%solutions.length;
    softwareTabs.forEach((tab,i)=>{tab.setAttribute('aria-selected',String(i===softwareIndex));tab.tabIndex=i===softwareIndex?0:-1;});
    const active=softwareTabs[softwareIndex],panel=document.querySelector('#software-panel');
    panel.setAttribute('aria-labelledby',active.id);
    transition(panel,()=>{panel.innerHTML=softwarePanel(solutions[softwareIndex],softwareIndex);});
    document.querySelector('#story-position').textContent=`${String(softwareIndex+1).padStart(2,'0')} / ${String(solutions.length).padStart(2,'0')}`;
    document.querySelector('.story-current').textContent=solutions[softwareIndex].title;
    document.querySelector('.story-meter span').style.width=`${(softwareIndex+1)/solutions.length*100}%`;
    document.querySelector('#story-announcement').textContent=`${solutions[softwareIndex].title}, application ${softwareIndex+1} of ${solutions.length}`;
    const track=document.querySelector('.software-picker');
    track.scrollTo({left:active.offsetLeft-track.offsetLeft-track.clientWidth/2+active.offsetWidth/2,behavior:motion()?'smooth':'instant'});
    if(focus)active.focus({preventScroll:true});
  }
  function bindTabs(tabs,select,vertical=false) {
    tabs.forEach((tab,i)=>{
      tab.addEventListener('click',()=>select(i));
      tab.addEventListener('keydown',event=>{
        let next=i;
        if(event.key==='ArrowRight'||vertical&&event.key==='ArrowDown')next=(i+1)%tabs.length;
        else if(event.key==='ArrowLeft'||vertical&&event.key==='ArrowUp')next=(i-1+tabs.length)%tabs.length;
        else if(event.key==='Home')next=0;
        else if(event.key==='End')next=tabs.length-1;
        else return;
        event.preventDefault();select(next);tabs[next].focus({preventScroll:true});
      });
    });
  }
  bindTabs(aiTabs,selectAI,true);bindTabs(softwareTabs,selectSoftware);
  const aiLayout=matchMedia('(max-width:950px)');
  const orient=()=>document.querySelector('.ai-selector').setAttribute('aria-orientation',aiLayout.matches?'horizontal':'vertical');
  orient();aiLayout.addEventListener('change',orient);
  const requestedApp=aiApplications.findIndex(app=>app.id===new URLSearchParams(location.search).get('app'));
  if(requestedApp>=0)selectAI(requestedApp);
  document.querySelector('.story-prev').addEventListener('click',()=>selectSoftware(softwareIndex-1));
  document.querySelector('.story-next').addEventListener('click',()=>selectSoftware(softwareIndex+1));
  const carousel=document.querySelector('.software-carousel');
  carousel.addEventListener('keydown',event=>{if(event.target.closest('[role=tablist]')||!['ArrowLeft','ArrowRight'].includes(event.key))return;event.preventDefault();selectSoftware(softwareIndex+(event.key==='ArrowRight'?1:-1));});
  let touchStart;
  const panel=document.querySelector('#software-panel');
  panel.addEventListener('touchstart',event=>{touchStart={x:event.changedTouches[0].clientX,y:event.changedTouches[0].clientY};},{passive:true});
  panel.addEventListener('touchend',event=>{if(!touchStart)return;const dx=event.changedTouches[0].clientX-touchStart.x,dy=event.changedTouches[0].clientY-touchStart.y;if(Math.abs(dx)>70&&Math.abs(dx)>Math.abs(dy)*1.5)selectSoftware(softwareIndex+(dx<0?1:-1));touchStart=null;},{passive:true});
  const interest=new URLSearchParams(location.search).get('interest');
  if(content.contact.interests.includes(interest))document.querySelector('#service').value=interest;
  const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting)document.querySelectorAll('[data-section]').forEach(a=>a.classList.toggle('active',a.dataset.section===entry.target.id));}),{rootMargin:'-15% 0px -50% 0px'});
  document.querySelectorAll('main section[id]').forEach(s=>observer.observe(s));
}
