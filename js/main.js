import { config } from './config.js';
import { content, pillars, solutions, caseStudies } from './data.js';
import { initPalette } from './palette.js';
import { initContact, copyEmail, toast } from './contact.js';
import { notifyVisit } from './notify.js';

export const escapeHTML = value => String(value).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const e = escapeHTML;
const reduced = matchMedia('(prefers-reduced-motion: reduce)');
const page = document.body.dataset.page;
const home = page === 'home';
const href = id => `${home ? '' : './index.html'}#${id}`;
const iconPaths = {
  arrow: '<path d="M5 19 19 5M5 5h14v14"/>', down: '<path d="M12 4v16m-6-6 6 6 6-6"/>', plus: '<path d="M12 5v14M5 12h14"/>',
  ai: '<path d="m12 2 2.8 7.2L22 12l-7.2 2.8L12 22l-2.8-7.2L2 12l7.2-2.8Z"/><path d="M20 2v4m-2-2h4"/>',
  automation: '<path d="M4 8a8 8 0 0 1 14-2l2 2M20 16a8 8 0 0 1-14 2l-2-2M20 3v5h-5M4 21v-5h5"/>',
  software: '<rect x="3" y="4" width="18" height="16" rx="1"/><path d="M3 9h18m-14 5 3 2-3 2m6 0h4"/>',
  copy: '<rect x="8" y="8" width="12" height="13" rx="1"/><path d="M16 8V3H3v13h5"/>',
  menu: '<path d="M4 8h16M4 16h16"/>', search: '<circle cx="10" cy="10" r="6"/><path d="m15 15 6 6"/>',
  input: '<path d="M3 5h18v14H3zM3 10h18M8 14h2m3 0h3"/>', systems: '<rect x="3" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><path d="M14 6h4v8M6 10v8h8"/>',
};
export const icon = (type='arrow', cls='') => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${iconPaths[type] || iconPaths.arrow}</svg>`;
const tags = items => `<div class="tags">${items.map(t => `<span class="tag">${e(t)}</span>`).join('')}</div>`;
const heading = (item, extra='') => `<div class="section-label">${e(item.label)}</div><div class="section-head ${extra}"><h2 class="reveal"><span class="line-mask"><span>${e(item.title)}</span></span><span class="line-mask"><span><em>${e(item.emphasis)}</em></span></span></h2><p>${e(item.description)}</p></div>`;
const endCTA = () => `<div class="end-cta wrap"><h2>Let’s make it <em>work for you.</em></h2><a href="./index.html#contact" class="button magnetic">Start a conversation ${icon()}</a></div>`;

function renderShell() {
  document.querySelector('#site-header').innerHTML = `<div class="header-inner wrap"><a class="wordmark" href="./index.html" aria-label="${e(config.displayName)} — home"><span class="wordmark-mark" aria-hidden="true">s.</span><span>${e(config.displayName.toLowerCase())}<small>.engineer</small></span></a><nav class="nav-links" id="navigation" aria-label="Main navigation">${content.navigation.map(n => `<a href="${href(n.id)}" data-section="${n.id}">${e(n.label)}</a>`).join('')}</nav><div class="header-actions"><button class="palette-trigger" aria-label="Open command palette" aria-keyshortcuts="Meta+K Control+K"><span>Press</span><kbd>⌘ K</kbd></button><a class="header-contact" href="${href('contact')}">Let’s talk ${icon()}</a><button class="menu-toggle" aria-label="Toggle navigation" aria-expanded="false" aria-controls="navigation">${icon('menu')}</button></div></div>`;
  document.querySelector('#site-footer').innerHTML = `<div class="footer-inner wrap"><a class="wordmark" href="./index.html"><span class="wordmark-mark" aria-hidden="true">s.</span>${e(config.displayName.toLowerCase())}</a><p>© ${new Date().getFullYear()} ${e(config.displayName)} · Thoughtfully engineered.</p><div class="footer-end"><p>${e(config.location)} · ${e(config.region)}</p><a href="#main">Back to top ↑</a></div></div>`;
  document.body.insertAdjacentHTML('beforeend', '<div class="page-transition" aria-hidden="true"></div><div class="toast" role="status" aria-live="polite"></div>');
  document.querySelector('.menu-toggle').addEventListener('click', event => {
    const open = event.currentTarget.getAttribute('aria-expanded') !== 'true';
    event.currentTarget.setAttribute('aria-expanded', String(open));
    document.querySelector('.nav-links').classList.toggle('open', open);
  });
  document.querySelectorAll('.nav-links a').forEach(a => a.addEventListener('click', () => {
    document.querySelector('.nav-links').classList.remove('open');
    document.querySelector('.menu-toggle').setAttribute('aria-expanded', 'false');
  }));
}

function schematic() {
  return `<aside class="hero-schematic" aria-label="Conceptual connected system"><div class="hero-schematic-head"><span><span class="status-dot"></span> SYSTEMS, CONNECTED</span><span>01—03</span></div><svg viewBox="0 0 250 60" fill="none" aria-hidden="true"><path d="M30 30H220" stroke="#2de2b045"/><path class="packet" d="M30 30H220" stroke="#2de2b0"/><circle cx="30" cy="30" r="18" fill="#11251d" stroke="#2b5141"/><path d="m30 20 3 7 7 3-7 3-3 7-3-7-7-3 7-3Z" stroke="#2de2b0"/><rect x="107" y="12" width="36" height="36" rx="3" fill="#11251d" stroke="#2b5141"/><path d="m117 25 5 5-5 5m10 0h7" stroke="#2de2b0"/><circle cx="220" cy="30" r="18" fill="#11251d" stroke="#2b5141"/><rect x="212" y="23" width="16" height="14" rx="1" stroke="#2de2b0"/><path d="M212 28h16" stroke="#2de2b0"/></svg><div class="hero-schematic-caption"><span>INTELLIGENCE</span><span>WORKFLOWS</span><span>SOFTWARE</span></div></aside>`;
}

function workCard(item, index) {
  return `<article class="work-card"><a href="./case.html?id=${encodeURIComponent(item.id)}" aria-label="Read ${e(item.title)} project outline"><div class="work-cover glow-card"><img src="${e(item.cover)}" alt="${e(item.title)} conceptual system illustration" loading="lazy" width="640" height="460"><span class="work-number mono">PROJECT / ${String(index + 1).padStart(2,'0')}</span><span class="cover-arrow">${icon()}</span><div class="work-hover">${tags(item.stack)}<div class="mini-architecture">${item.architecture.map(e).join(' → ')}</div></div></div><div class="work-meta mono"><span>${e(item.pillar)} / ${e(item.industry)}</span><span>Project outline</span></div><h3>${e(item.title)}</h3><p>${e(item.summary)}</p></a></article>`;
}

function contactSection() {
  const c = content.contact;
  return `<section class="section wrap" id="contact"><div class="section-label">${e(c.label)}</div><div class="contact-layout"><div class="contact-copy"><h2 class="reveal">${e(c.title)} <em>${e(c.emphasis)}</em></h2><p>${e(c.description)}</p><div class="contact-links"><div class="email-row"><a class="underlink" href="mailto:${e(config.email)}">${e(config.email)}</a><button class="icon-button copy-email" aria-label="Copy email address">${icon('copy')}</button></div><a class="text-link" href="${e(config.linkedin)}" target="_blank" rel="noopener noreferrer">Connect on LinkedIn ${icon()}</a></div></div><form class="contact-form" id="contact-form" novalidate><div class="field"><label for="name">Your name</label><input id="name" name="name" placeholder="A name to the idea" autocomplete="name" required maxlength="100" aria-describedby="name-error"><span class="field-error" id="name-error"></span></div><div class="field"><label for="email">Email address</label><input id="email" name="email" type="email" placeholder="you@company.com" autocomplete="email" required maxlength="254" aria-describedby="email-error"><span class="field-error" id="email-error"></span></div><div class="field"><label for="company">Company <span>(optional)</span></label><input id="company" name="company" placeholder="Where you’re building" autocomplete="organization" maxlength="150"></div><div class="field"><label for="service">What can I help with?</label><select id="service" name="service" required aria-describedby="service-error"><option value="">Select a service</option>${c.interests.map(s=>`<option>${e(s)}</option>`).join('')}</select><span class="field-error" id="service-error"></span></div><div class="field full"><label for="budget">Budget range <span>(optional)</span></label><select id="budget" name="budget">${c.budgets.map((b,i)=>`<option value="${i ? e(b) : ''}">${e(b)}</option>`).join('')}</select></div><div class="field full"><label for="message">Tell me about your project</label><textarea id="message" name="message" placeholder="The challenge, the idea, or the thing that takes too long…" required minlength="10" maxlength="5000" aria-describedby="message-error"></textarea><span class="field-error" id="message-error"></span></div><input type="checkbox" name="botcheck" class="sr-only" tabindex="-1" aria-hidden="true" hidden><div class="form-footer"><p>A conversation, not a commitment.</p><button type="submit" class="button magnetic">Send enquiry ${icon()}</button></div><div class="form-status" role="status" aria-live="polite" hidden></div></form></div></section>`;
}

function renderHome() {
  const h = content.hero;
  document.body.insertAdjacentHTML('afterbegin', '<div id="aurora" class="aurora" aria-hidden="true"><div class="aurora-ribbon"></div><div class="aurora-ribbon"></div><div class="aurora-ribbon"></div><div class="perspective-grid"></div></div>');
  document.querySelector('#main').innerHTML = `<section class="hero wrap" id="hero"><div class="hero-topline mono"><span class="status-dot"></span>${e(h.eyebrow)}</div><h1>${h.lines.map((line,i) => `<span class="line-mask"><span>${e(line)}${i===2 ? ` <em>${e(h.emphasis)}</em>` : ''}</span></span>`).join('')}</h1><p class="hero-description">${e(h.description)}</p><div class="hero-cta"><a class="button magnetic" href="#work">${e(h.primary)} ${icon()}</a><a class="button button-text" href="#contact">${e(h.secondary)} ${icon()}</a></div><span class="hero-side">25.2048° N &nbsp; 55.2708° E &nbsp; / &nbsp; ${e(config.region)}</span>${schematic()}<div class="hero-bottom"><div class="hero-rotation"><span class="bracket">[</span><span class="rotation-text">${e(h.rotating[0])}</span><span class="bracket">]</span></div><a class="hero-scroll" href="#expertise">Scroll to explore ${icon('down')}</a></div></section><div class="industries wrap"><span class="industries-label mono">Across industries</span><div class="industry-list">${content.industries.map(i=>`<span>${e(i)}</span>`).join('')}</div></div><section class="section wrap" id="expertise">${heading(content.expertise)}<div class="pillars">${pillars.map((p,i)=>`<article class="pillar glow-card ${i===0 ? 'active':''}" data-pillar="${p.id}"><div class="pillar-top"><span class="mono muted">${p.number} / ${p.id.toUpperCase()}</span>${icon(p.id,'pillar-icon')}</div><h3><button class="pillar-toggle" aria-expanded="${i===0}" aria-controls="pillar-services-${p.id}">${e(p.title)} ${icon('plus')}</button></h3><p class="pillar-short">${e(p.short)}</p><p class="pillar-description">${e(p.description)}</p><div class="pillar-services" id="pillar-services-${p.id}">${p.services.map(s=>`<a href="#contact" title="${e(s.detail)}" data-interest="${p.id==='ai'?'AI':p.title}">${e(s.name)} <span aria-hidden="true">↗</span></a>`).join('')}</div></article>`).join('')}</div><div class="section-foot"><p>Independent thinking. End-to-end execution.</p><a class="text-link" href="#contact">Find the right approach ${icon()}</a></div></section><section class="section wrap" id="solutions">${heading(content.solutions)}<div class="explorer"><div class="solution-tabs" role="tablist" aria-label="Explore software solutions">${['emr','crm','hrms','erp','finance'].map((id,i)=>{const s=solutions.find(x=>x.id===id);return `<button class="solution-tab" id="tab-${id}" role="tab" aria-selected="${i===0}" aria-controls="solution-panel" tabindex="${i===0?0:-1}" data-solution="${id}">${e(s.title)}</button>`}).join('')}</div><div class="explorer-body" id="solution-panel" role="tabpanel" aria-labelledby="tab-emr" tabindex="0"></div></div><div class="section-foot"><p>15 focused solutions. Designed to work together.</p><a class="text-link" href="./solutions.html">Explore all solutions ${icon()}</a></div></section><section class="section wrap home-work" id="work">${heading(content.work)}<div class="work-grid">${caseStudies.slice(0,3).map(workCard).join('')}</div><div class="section-foot"><p>${e(content.work.note)}</p><a class="text-link" href="./work.html">View all projects ${icon()}</a></div></section>${processSection()}<section class="section wrap" id="about"><div class="about-layout"><div><div class="section-label">${e(content.about.label)}</div><div class="about-mark" aria-hidden="true">s.</div><div class="about-location">${e(config.location)}<br>${e(config.region)}</div></div><div class="about-details"><h2 class="reveal">${e(content.about.title)}<em>${e(content.about.emphasis)}</em></h2>${content.about.paragraphs.map(p=>`<p>${e(p)}</p>`).join('')}<ul class="principles">${content.about.principles.map(p=>`<li>${e(p)}</li>`).join('')}</ul></div></div></section><div class="stack-strip" aria-label="Technology stack" tabindex="0"><div class="stack-track">${[false,true].map(hidden=>`<div class="stack-group" ${hidden?'aria-hidden="true"':''}>${content.stack.map(s=>`<span>${e(s)}</span>`).join('')}</div>`).join('')}</div></div>${contactSection()}`;
  renderExplorer('emr');
  initHomeInteractions();
}

function processSection() {
  const p = content.process;
  return `<section class="section wrap" id="process"><div class="process-layout"><div class="process-intro"><div class="section-label">${e(p.label)}</div><h2 class="reveal">${e(p.title)}<em>${e(p.emphasis)}</em></h2><p>${e(p.description)}</p></div><div class="process-steps">${p.steps.map((s,i)=>`<article class="process-step"><span class="mono">0${i+1} /</span><h3>${e(s.title)}</h3><p>${e(s.text)}</p></article>`).join('')}</div></div><div class="system-flow"><div class="flow-label mono">A connected architecture / from intent to action</div><div class="flow-nodes"><svg class="flow-paths" viewBox="0 0 1000 10" preserveAspectRatio="none" aria-hidden="true"><path id="flow-line" d="M0 5H1000"/>${[0,2,4].map(n=>`<circle class="flow-packet" r="2"><animateMotion dur="6s" begin="-${n}s" repeatCount="indefinite" path="M0 5H1000"/></circle>`).join('')}</svg>${p.nodes.map((n,i)=>`<div class="flow-node">${icon(['input','ai','automation','systems'][i])}<span>${e(n)}</span></div>`).join('')}</div></div></section>`;
}

function renderExplorer(id) {
  const s = solutions.find(s=>s.id===id);
  const panel = document.querySelector('#solution-panel');
  const oldRects = new Map([...panel.querySelectorAll('[data-module]')].map(el=>[el.dataset.module,el.getBoundingClientRect()]));
  panel.setAttribute('aria-labelledby',`tab-${id}`);
  panel.innerHTML = `<div class="explorer-summary"><span class="mono">${e(s.category)} / ${String(s.modules.length).padStart(2,'0')} modules</span><h3>${e(s.title)}</h3><p>${e(s.summary)}</p>${tags(s.stack)}<a class="text-link" href="./solution.html?id=${id}">Explore solution ${icon()}</a></div><div class="diagram-wrap">${id==='emr' ? emrMap(s) : `<div class="module-grid">${s.modules.map((m,i)=>`<div class="module-tile" data-module="${e(m)}"><span>${String(i+1).padStart(2,'0')}</span>${e(m)}</div>`).join('')}</div>`}</div>`;
  if(!reduced.matches && !document.documentElement.classList.contains('motion-paused')) panel.querySelectorAll('[data-module]').forEach((el,i)=>{
    const before=oldRects.get(el.dataset.module), after=el.getBoundingClientRect();
    const base=getComputedStyle(el).transform;const transform=base==='none'?'':base;
    const start=before?{transform:`translate(${before.left-after.left}px,${before.top-after.top}px) ${transform}`,opacity:.5}:{opacity:0,transform:`translateY(10px) ${transform}`};
    el.animate([start,{opacity:1,transform:transform||'none'}],{duration:340,delay:i*20,easing:'cubic-bezier(.2,.7,.2,1)'});
  });
  panel.querySelectorAll('.map-node[data-module]').forEach(node=>{
    const show=()=>{panel.querySelectorAll('.connector').forEach(p=>p.classList.toggle('highlight',p.dataset.link===node.dataset.index));const tooltip=panel.querySelector('.map-tooltip');tooltip.textContent=node.dataset.module;tooltip.hidden=false;};
    const hide=()=>{panel.querySelectorAll('.connector').forEach(p=>p.classList.remove('highlight'));panel.querySelector('.map-tooltip').hidden=true;};
    node.addEventListener('mouseenter',show);node.addEventListener('focus',show);node.addEventListener('mouseleave',hide);node.addEventListener('blur',hide);
    node.addEventListener('click',()=>location.assign(`./solution.html?id=emr#module-${node.dataset.index}`));
  });
}

function emrMap(s) {
  // Full module map: three rings laid out as two columns and two arcs.
  const positions = [[19,10],[43,9],[70,10],[86,21],[87,35],[87,49],[87,63],[86,77],[71,90],[45,91],[19,89],[13,76],[13,62],[13,48],[13,34],[13,22],[40,29],[63,29],[37,70],[63,70],[50,80]];
  return `<div class="node-map"><svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">${positions.map(([x,y],i)=>`<path class="connector" data-link="${i}" d="M50 50 Q${x} 50 ${x} ${y}" vector-effect="non-scaling-stroke"/>`).join('')}</svg><div class="map-node core" style="left:50%;top:50%">EMR Core<small>CONNECTED CARE</small></div>${s.modules.map((m,i)=>`<button class="map-node" data-index="${i}" data-module="${e(m)}" style="left:${positions[i][0]}%;top:${positions[i][1]}%" aria-label="Explore ${e(m)}">${e(m.replace(' & Scheduling','').replace(' & SOAP Notes','').replace('Insurance Claims & Pre-Auth','Claims & Pre-Auth').replace(' & App',''))}</button>`).join('')}<div class="map-tooltip" role="status" hidden></div></div><span class="map-caption mono">Hover to trace connections · select a module to explore</span>`;
}

function renderCatalog() {
  document.querySelector('#main').innerHTML = `<header class="page-heading wrap"><div class="section-label">The software collection / 15 solutions</div><h1>Built around<br><em>your business.</em></h1><p>${e(content.solutions.description)} Each solution is a starting point for a conversation about your workflow.</p></header><div class="catalog-grid wrap">${solutions.map((s,i)=>`<a class="catalog-card glow-card" href="./solution.html?id=${s.id}"><span class="mono">${String(i+1).padStart(2,'0')} / ${e(s.category)}</span><h2>${e(s.title)}</h2><p>${e(s.summary)}</p><div class="catalog-card-bottom mono"><span>${s.modules.length} modules</span>${icon()}</div></a>`).join('')}</div>${endCTA()}`;
}

function renderWork() {
  document.querySelector('#main').innerHTML = `<header class="page-heading wrap"><div class="section-label">Selected systems / project archive</div><h1>The thinking.<br><em>The architecture.</em></h1><p>${e(content.work.description)}</p><p class="work-note">${e(content.work.note)}</p></header><div class="all-work wrap"><div class="filter-bar" role="group" aria-label="Filter projects by discipline">${['All','AI','Automation','Software'].map((p,i)=>`<button class="filter-button" data-filter="${p}" aria-pressed="${i===0}">${p} <span class="muted">${p==='All'?caseStudies.length:caseStudies.filter(c=>c.pillar===p).length}</span></button>`).join('')}</div><div class="sr-only" id="filter-status" role="status"></div><div class="work-grid" id="work-results">${caseStudies.map(workCard).join('')}</div></div>${endCTA()}`;
  document.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',()=>{
    document.querySelectorAll('[data-filter]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
    const filtered=caseStudies.filter(c=>button.dataset.filter==='All'||c.pillar===button.dataset.filter);
    document.querySelector('#work-results').innerHTML=filtered.map(workCard).join('');
    document.querySelector('#filter-status').textContent=`${filtered.length} projects shown`;
    initGlow();
  }));
}

function renderSolution() {
  const s=solutions.find(s=>s.id===new URLSearchParams(location.search).get('id'));
  if(!s) return renderNotFound('This solution isn’t in the collection.');
  setMeta(`${s.title} — ${config.displayName}`,s.summary);
  document.querySelector('#main').innerHTML=`<header class="page-heading wrap"><div class="breadcrumb mono"><a href="./solutions.html">All solutions</a><span>/</span><span>${e(s.category)}</span></div><h1>${e(s.title)}</h1><p>${e(s.summary)}</p></header><div class="detail-layout wrap"><div class="detail-main"><section><div class="section-label">01 / The building blocks</div><h2>Every module. <em>Connected.</em></h2><div class="module-grid">${s.modules.map((m,i)=>`<div class="module-tile" id="module-${i}" tabindex="-1"><span>${String(i+1).padStart(2,'0')}</span>${e(m)}</div>`).join('')}</div></section><section><div class="section-label">02 / Designed around the work</div><h2>Purposeful <em>features.</em></h2><ul class="feature-list">${s.features.map(f=>`<li>${e(f)}</li>`).join('')}</ul></section><section><div class="section-label">03 / Part of your ecosystem</div><h2>Works with <em>your systems.</em></h2><ul class="feature-list">${s.integrations.map(f=>`<li>${e(f)}</li>`).join('')}</ul><p class="work-note">Integration scope depends on your systems, API access, and provider requirements. Named integrations describe potential project scope, not certifications or approvals.</p></section></div><aside class="detail-aside"><h3>Built for your context.</h3><p>Start with the modules you need. Shape the workflow around your team. Connect it to the systems you already use.</p><span class="mono">Suggested technology</span>${tags(s.stack)}<span class="mono">Delivery model</span><p>Custom development & integration</p><a class="button" href="./index.html?interest=${s.id==='web'?'Website':'Software'}#contact">Discuss this solution ${icon()}</a></aside></div>${endCTA()}`;
}

function renderCase() {
  const c=caseStudies.find(c=>c.id===new URLSearchParams(location.search).get('id'));
  if(!c) return renderNotFound('This project isn’t in the archive.');
  setMeta(`${c.title} — Project outline — ${config.displayName}`,c.summary);
  document.querySelector('#main').innerHTML=`<header class="page-heading wrap"><div class="breadcrumb mono"><a href="./work.html">All projects</a><span>/</span><span>${e(c.pillar)} · ${e(c.industry)}</span></div><h1>${e(c.title)}</h1><p>${e(c.summary)}</p></header><div class="detail-layout wrap"><article class="detail-main"><img class="detail-cover" src="${e(c.cover)}" width="640" height="460" alt="${e(c.title)} conceptual architecture" loading="lazy"><p class="case-status">${e(c.status)}</p><section><div class="section-label">01 / The challenge</div><h2>The point <em>of friction.</em></h2><p>${e(c.problem)}</p></section><section><div class="section-label">02 / The approach</div><h2>A considered <em>solution.</em></h2><p>${e(c.solution)}</p></section><section><div class="section-label">03 / The architecture</div><div class="case-architecture">${c.architecture.map((n,i)=>`${i?'<b aria-hidden="true">→</b>':''}<span>${e(n)}</span>`).join('')}</div></section><section><div class="section-label">04 / Measurement plan</div><h2>Outcomes to <em>validate.</em></h2>${c.metrics.map(m=>`<div class="metric"><strong ${typeof m.value==='number'?`data-count="${m.value}"`:''}>${e(m.value)}</strong><p>${e(m.label)}</p></div>`).join('')}</section></article><aside class="detail-aside"><h3>Project context</h3><span class="mono">Client profile · anonymized</span><p>${e(c.client)}</p><span class="mono">Discipline / Industry</span><p>${e(c.pillar)} / ${e(c.industry)}</p><span class="mono">Architecture stack</span>${tags(c.stack)}<a class="button" href="./index.html?interest=${encodeURIComponent(c.pillar)}#contact">Build something similar ${icon()}</a></aside></div>${endCTA()}`;
}

function renderNotFound(message='A small detour. Let’s get you back.') {
  setMeta(`Page not found — ${config.displayName}`,'The page you requested could not be found. Explore software solutions or return to the portfolio.');
  let robots=document.querySelector('meta[name="robots"]');if(!robots){robots=document.createElement('meta');robots.name='robots';document.head.append(robots);}robots.content='noindex';
  document.querySelector('#main').innerHTML=`<section class="page-heading wrap not-found"><div class="section-label">404 / Connection not found</div><h1>Even good systems<br><em>need a way back.</em></h1><p>${e(message)}</p><a class="button" href="./index.html">Back to the portfolio ${icon()}</a></section>`;
}

function setMeta(title,description) {
  document.title=title;
  document.querySelector('meta[name="description"]').content=description;
  ['og:title','twitter:title'].forEach(p=>document.querySelector(`meta[${p.startsWith('og')?'property':'name'}="${p}"]`)?.setAttribute('content',title));
  ['og:description','twitter:description'].forEach(p=>document.querySelector(`meta[${p.startsWith('og')?'property':'name'}="${p}"]`)?.setAttribute('content',description));
}

function initHomeInteractions() {
  const activate=panel=>document.querySelectorAll('.pillar').forEach(p=>{p.classList.toggle('active',p===panel);p.querySelector('button').setAttribute('aria-expanded',String(p===panel));});
  document.querySelectorAll('.pillar').forEach(p=>{p.addEventListener('mouseenter',()=>{if(matchMedia('(hover:hover)').matches)activate(p);});p.querySelector('button').addEventListener('click',()=>activate(p));p.addEventListener('focusin',()=>activate(p));});
  const tabs=[...document.querySelectorAll('.solution-tab')];
  const select=tab=>{tabs.forEach(t=>{t.setAttribute('aria-selected',String(t===tab));t.tabIndex=t===tab?0:-1;});renderExplorer(tab.dataset.solution);};
  tabs.forEach((tab,i)=>{tab.addEventListener('click',()=>select(tab));tab.addEventListener('keydown',event=>{let next=i;if(event.key==='ArrowRight')next=(i+1)%tabs.length;else if(event.key==='ArrowLeft')next=(i-1+tabs.length)%tabs.length;else if(event.key==='Home')next=0;else if(event.key==='End')next=tabs.length-1;else return;event.preventDefault();select(tabs[next]);tabs[next].focus();});});
  document.querySelectorAll('[data-interest]').forEach(a=>a.addEventListener('click',()=>{document.querySelector('#service').value=a.dataset.interest;}));
  const interest=new URLSearchParams(location.search).get('interest');
  if(content.contact.interests.includes(interest))document.querySelector('#service').value=interest;
  const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting)document.querySelectorAll('[data-section]').forEach(a=>a.classList.toggle('active',a.dataset.section===entry.target.id));}),{rootMargin:'-20% 0px -55% 0px'});
  document.querySelectorAll('main section[id]').forEach(s=>observer.observe(s));
  if(!reduced.matches)initScramble();
}

let motionPaused=false;
function initScramble() {
  const target=document.querySelector('.rotation-text');let index=0;
  setInterval(()=>{
    if(document.hidden||motionPaused||reduced.matches||scrollY>innerHeight)return;
    index=(index+1)%content.hero.rotating.length;const word=content.hero.rotating[index];const start=performance.now();
    const frame=now=>{if(reduced.matches||motionPaused){target.textContent=word;return;}const progress=Math.min((now-start)/650,1);target.textContent=[...word].map((c,i)=>c===' '?' ':i/word.length<progress?c:'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'[Math.floor(Math.random()*36)]).join('');if(progress<1)requestAnimationFrame(frame);};requestAnimationFrame(frame);
  },3600);
}

function initGlow() {
  document.querySelectorAll('.glow-card').forEach(card=>{if(card.dataset.glowReady)return;card.dataset.glowReady='true';card.addEventListener('pointermove',event=>{const r=card.getBoundingClientRect();card.style.setProperty('--x',`${event.clientX-r.left}px`);card.style.setProperty('--y',`${event.clientY-r.top}px`);});});
}

function initPageBehavior() {
  let last=scrollY;const header=document.querySelector('#site-header');
  const scroll=()=>{const y=scrollY;header.classList.toggle('solid',y>30||!home);header.classList.toggle('away',y>last&&y>200&&!header.contains(document.activeElement)&&!document.querySelector('.nav-links.open'));last=y;if(home){const hero=document.querySelector('.hero');document.querySelector('#aurora').style.opacity=Math.max(0,1-y/hero.offsetHeight);}};
  window.addEventListener('scroll',scroll,{passive:true});scroll();
  header.addEventListener('focusin',()=>header.classList.remove('away'));
  document.querySelectorAll('.copy-email').forEach(b=>b.addEventListener('click',copyEmail));
  initGlow();
  if(!reduced.matches && matchMedia('(pointer:fine)').matches)document.querySelectorAll('.magnetic').forEach(button=>{
    button.addEventListener('pointermove',event=>{if(motionPaused||reduced.matches)return;const r=button.getBoundingClientRect();const x=event.clientX-r.left-r.width/2,y=event.clientY-r.top-r.height/2;button.style.transform=`translate(${Math.max(-5,Math.min(5,x*.08))}px,${Math.max(-4,Math.min(4,y*.1))}px)`;});button.addEventListener('pointerleave',()=>button.style.transform='');
  });
  document.addEventListener('click',event=>{
    const a=event.target.closest('a');if(!a||a.target||a.hasAttribute('download')||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey||event.button!==0)return;
    const url=new URL(a.href,location.href);if(url.origin!==location.origin||url.protocol!=='http:'&&url.protocol!=='https:'||url.pathname===location.pathname&&url.search===location.search||reduced.matches)return;
    event.preventDefault();document.querySelector('.page-transition').classList.add('leaving');document.body.classList.add('leaving');setTimeout(()=>location.assign(url.href),180);
  });
  addEventListener('pageshow',()=>{document.querySelector('.page-transition').classList.remove('leaving');document.body.classList.remove('leaving');});
  if(home&&!reduced.matches){document.body.insertAdjacentHTML('beforeend','<button class="motion-toggle" aria-pressed="false" aria-label="Pause decorative motion">Pause motion</button>');document.querySelector('.motion-toggle').addEventListener('click',event=>{motionPaused=!motionPaused;document.documentElement.classList.toggle('motion-paused',motionPaused);event.currentTarget.textContent=motionPaused?'Resume motion':'Pause motion';event.currentTarget.setAttribute('aria-pressed',String(motionPaused));event.currentTarget.setAttribute('aria-label',motionPaused?'Resume decorative motion':'Pause decorative motion');document.querySelectorAll('.flow-paths').forEach(s=>motionPaused?s.pauseAnimations():s.unpauseAnimations());document.dispatchEvent(new CustomEvent('motionchange',{detail:{paused:motionPaused}}));});}
  const countObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(!entry.isIntersecting)return;const el=entry.target;const value=Number(el.dataset.count);countObserver.unobserve(el);if(reduced.matches)return;const start=performance.now();const run=t=>{const p=Math.min((t-start)/1000,1);el.textContent=Math.round(value*(1-(1-p)**3)).toLocaleString();if(p<1)requestAnimationFrame(run);};requestAnimationFrame(run);}),{threshold:.6});document.querySelectorAll('[data-count]').forEach(el=>countObserver.observe(el));
}

async function initMotionLibraries() {
  if(reduced.matches||motionPaused)return;
  try {
    const [{gsap},{ScrollTrigger}]=await Promise.all([import('https://cdn.jsdelivr.net/npm/gsap@3.12.5/+esm'),import('https://cdn.jsdelivr.net/npm/gsap@3.12.5/ScrollTrigger/+esm')]);
    gsap.registerPlugin(ScrollTrigger);
    gsap.matchMedia().add('(prefers-reduced-motion: no-preference)',()=>{
      document.querySelectorAll('.reveal').forEach(el=>{if(el.getBoundingClientRect().top<innerHeight)return;gsap.from(el.querySelectorAll('.line-mask>span').length?el.querySelectorAll('.line-mask>span'):el,{y:30,opacity:0,duration:.85,stagger:.1,ease:'power2.out',scrollTrigger:{trigger:el,start:'top 92%',once:true}});});
      document.querySelectorAll('.catalog-card,.work-card,.process-step').forEach((el,i)=>{if(el.getBoundingClientRect().top<innerHeight)return;gsap.from(el,{y:24,opacity:0,duration:.7,delay:(i%3)*.06,scrollTrigger:{trigger:el,start:'top 96%',once:true}});});
    });
    if(config.enableSmoothScroll && matchMedia('(pointer:fine)').matches){const {default:Lenis}=await import('https://cdn.jsdelivr.net/npm/lenis@1.1.18/+esm');if(reduced.matches)return;const lenis=new Lenis({duration:.9,smoothWheel:true,anchors:true,prevent:node=>node.closest('.palette')});lenis.on('scroll',ScrollTrigger.update);const tick=time=>lenis.raf(time*1000);gsap.ticker.add(tick);const disable=event=>{if(event.matches){lenis.destroy();gsap.ticker.remove(tick);}};reduced.addEventListener('change',disable);document.addEventListener('motionchange',event=>{if(event.detail.paused){lenis.destroy();gsap.ticker.remove(tick);}});}
  } catch { /* Native scrolling and visible content are the baseline. */ }
}

function structuredData() {
  if(!home)return;
  const json={ '@context':'https://schema.org','@graph':[{ '@type':'Person',name:config.name,jobTitle:config.title,email:config.email,sameAs:[config.linkedin],...(config.siteUrl?{url:config.siteUrl}:{}),address:{'@type':'PostalAddress',addressLocality:'Dubai',addressCountry:'AE'} },{'@type':'ProfessionalService',name:`${config.displayName} — AI, Automation & Software`,description:config.seoDescription,email:config.email,areaServed:['United Arab Emirates','Saudi Arabia'],address:{'@type':'PostalAddress',addressLocality:'Dubai',addressCountry:'AE'},...(config.siteUrl?{url:config.siteUrl}:{})}]};
  const script=document.querySelector('#structured-data')||document.createElement('script');script.id='structured-data';script.type='application/ld+json';script.textContent=JSON.stringify(json);if(!script.isConnected)document.head.append(script);
}

renderShell();
({home:renderHome,solutions:renderCatalog,solution:renderSolution,work:renderWork,case:renderCase,'404':renderNotFound}[page]||renderNotFound)();
if(home)setMeta(`${config.displayName} — AI, Automation & Software Engineer`,config.seoDescription);
if(config.siteUrl){const canonical=document.querySelector('link[rel=canonical]')||document.createElement('link');canonical.rel='canonical';canonical.href=`${config.siteUrl}/${home?'':location.pathname.split('/').pop()}${location.search}`;document.head.append(canonical);document.querySelectorAll('meta[property="og:image"],meta[name="twitter:image"]').forEach(m=>m.content=`${config.siteUrl}/assets/og-image.png`);document.querySelector('meta[property="og:url"]')?.setAttribute('content',canonical.href);}
structuredData();initPageBehavior();initPalette({icon,escapeHTML});initContact();notifyVisit();
if(home&&config.enableAurora&&!reduced.matches)import('./aurora.js').then(({initAurora})=>initAurora()).catch(()=>{});
if('requestIdleCallback' in window)requestIdleCallback(initMotionLibraries,{timeout:1800});else setTimeout(initMotionLibraries,600);
// JS-rendered anchors must be resolved after the content exists.
if(location.hash)requestAnimationFrame(()=>{try{document.getElementById(decodeURIComponent(location.hash.slice(1)))?.scrollIntoView();}catch{/* Ignore malformed URL escapes. */}});
