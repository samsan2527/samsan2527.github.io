import { config } from './config.js';
import { content, solutions, caseStudies, aiApplications } from './data.js';
import { initPalette } from './palette.js';
import { initContact, copyEmail } from './contact.js';
import { notifyVisit } from './notify.js';
import { renderShowcase, initShowcase } from './showcase.js';

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
  input: '<path d="M3 5h18v14H3zM3 10h18M8 14h2m3 0h3"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="1.5"/><path d="m3.5 6 8.5 7 8.5-7"/>', calendar: '<rect x="3" y="5" width="18" height="16" rx="1.5"/><path d="M3 10h18M8 3v4m8-4v4"/>',
  chat: '<path d="M4 5h16v11H9l-5 4Z"/><path d="M8.5 10.5h.01M12 10.5h.01M15.5 10.5h.01"/>', task: '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="m8 12 3 3 5-6"/>', check: '<path d="m5 12.5 4.5 4.5L19 7"/>', systems: '<rect x="3" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><path d="M14 6h4v8M6 10v8h8"/>',
};
export const icon = (type='arrow', cls='') => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${iconPaths[type] || iconPaths.arrow}</svg>`;
const tags = items => `<div class="tags">${items.map(t => `<span class="tag">${e(t)}</span>`).join('')}</div>`;
const heading = (item, extra='') => `<div class="section-label">${e(item.label)}</div><div class="section-head ${extra}"><h2 class="reveal"><span class="line-mask"><span>${e(item.title)}</span></span><span class="line-mask"><span><em>${e(item.emphasis)}</em></span></span></h2><p>${e(item.description)}</p></div>`;
// Words sit under solid blocks that wipe away when the heading scrolls into view.
const blocks = text => text.split(' ').map(w => `<span class="lm-block">${e(w)}</span>`).join(' ');
const endCTA = () => `<div class="lm-end lm-wrap"><h2 class="lm-blocks" data-blocks>${blocks('Build with intent.')}<span class="lm-line lm-dim">${blocks('Ship without limits.')}</span></h2><a class="lm-split" href="./index.html#contact"><span>Start a conversation</span><b aria-hidden="true">${icon()}</b></a></div>`;

function renderShell() {
  const sun='<svg class="sun-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5"/></svg><svg class="moon-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25" aria-hidden="true"><path d="M20 15.5A8.5 8.5 0 0 1 8.5 4 8.5 8.5 0 1 0 20 15.5Z"/></svg>';
  const chat='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 5h16v11H9l-5 4Z"/><path d="M8.5 10.5h.01M12 10.5h.01M15.5 10.5h.01"/></svg>';
  const brand=`<span class="lm-brand-mark" aria-hidden="true"></span><span>${e(config.displayName)}</span>`;
  document.querySelector('#site-header').innerHTML = `<div class="lm-header-inner"><a class="lm-brand" href="./index.html" aria-label="${e(config.displayName)} — home">${brand}</a><div class="lm-navpill"><nav class="lm-nav" id="navigation" aria-label="Main navigation">${content.navigation.map(n => `<a href="${href(n.id)}" data-section="${n.id}">${e(n.label)}</a>`).join('')}</nav><a class="lm-cta" href="${href('contact')}">Let’s talk</a><button class="lm-menu" aria-label="Toggle navigation" aria-expanded="false" aria-controls="navigation">${icon('menu')}</button></div></div>`;
  const software=solutions.filter(s=>s.id!=='mobile');
  const col=(title,links)=>`<div><h2 class="lm-mono">${e(title)}</h2><ul>${links.map(([label,url,ext])=>`<li><a href="${e(url)}"${ext?' target="_blank" rel="noopener noreferrer"':''}>${e(label)}</a></li>`).join('')}</ul></div>`;
  document.querySelector('#site-footer').innerHTML = `<div class="lm-footer-inner lm-wrap"><div class="lm-footer-brand"><a class="lm-brand lm-brand-plain" href="./index.html">${brand}</a><p>Software, AI and mobile apps for businesses across the UAE &amp; KSA — designed, built and connected by one engineer.</p></div><nav class="lm-footer-cols" aria-label="Footer">${col('Software',[...software.slice(0,5).map(s=>[s.title,`./solution.html?id=${s.id}`]),['All software','./solutions.html']])}${col('AI apps',aiApplications.map(a=>[a.title,`./index.html?app=${a.id}#app-${a.id}`]))}${col('Explore',[['About',href('about')],['Mobile apps',href('mobile')],['Projects','./work.html'],['Contact',href('contact')]])}${col('Connect',[['Email',`mailto:${config.email}`],['LinkedIn',config.linkedin,true]])}</nav></div><div class="lm-footer-base lm-wrap"><p>© ${new Date().getFullYear()} ${e(config.displayName)}. All rights reserved.</p><p>${e(config.location)} · ${e(config.region)}</p><a href="#main">Back to top ↑</a></div>`;
  document.body.insertAdjacentHTML('beforeend', `<div class="lm-dock" role="group" aria-label="Site tools"><button class="lm-dock-btn palette-trigger" aria-label="Open command palette" aria-keyshortcuts="Meta+K Control+K" title="Search (⌘K)">${icon('search')}</button><button class="lm-dock-btn theme-toggle" aria-label="Switch to light mode" aria-pressed="false">${sun}</button><a class="lm-dock-chat" href="${href('contact')}" aria-label="Start a conversation" title="Start a conversation">${chat}</a></div><div class="page-transition" aria-hidden="true"></div><div class="toast" role="status" aria-live="polite"></div>`);
  document.querySelector('.lm-menu').addEventListener('click', event => {
    const open = event.currentTarget.getAttribute('aria-expanded') !== 'true';
    event.currentTarget.setAttribute('aria-expanded', String(open));
    document.querySelector('.lm-nav').classList.toggle('open', open);
  });
  document.querySelectorAll('.lm-nav a').forEach(a => a.addEventListener('click', () => {
    document.querySelector('.lm-nav').classList.remove('open');
    document.querySelector('.lm-menu').setAttribute('aria-expanded', 'false');
  }));
}

function workCard(item, index) {
  return `<article class="work-card"><a href="./case.html?id=${encodeURIComponent(item.id)}" aria-label="Read ${e(item.title)} project outline"><div class="work-cover glow-card"><img src="${e(item.cover)}" alt="${e(item.title)} conceptual system illustration" loading="lazy" width="640" height="460"><span class="work-number mono">PROJECT / ${String(index + 1).padStart(2,'0')}</span><span class="cover-arrow">${icon()}</span><div class="work-hover">${tags(item.stack)}<div class="mini-architecture">${item.architecture.map(e).join(' → ')}</div></div></div><div class="work-meta mono"><span>${e(item.pillar)} / ${e(item.industry)}</span><span>Project outline</span></div><h3>${e(item.title)}</h3><p>${e(item.summary)}</p></a></article>`;
}

function contactSection() {
  const c = content.contact;
  return `<section class="section wrap" id="contact"><div class="section-label">${e(c.label)}</div><div class="contact-layout"><div class="contact-copy"><h2 class="lm-blocks" data-blocks>${blocks(c.title)}<span class="lm-line lm-dim">${blocks(c.emphasis)}</span></h2><p>${e(c.description)}</p><div class="contact-links"><div class="email-row"><a class="underlink" href="mailto:${e(config.email)}">${e(config.email)}</a><button class="icon-button copy-email" aria-label="Copy email address">${icon('copy')}</button></div><a class="text-link" href="${e(config.linkedin)}" target="_blank" rel="noopener noreferrer">Connect on LinkedIn ${icon()}</a></div></div><form class="contact-form" id="contact-form" novalidate><div class="field"><label for="name">Your name</label><input id="name" name="name" placeholder="Your name" autocomplete="name" required maxlength="100" aria-describedby="name-error"><span class="field-error" id="name-error"></span></div><div class="field"><label for="email">Email address</label><input id="email" name="email" type="email" placeholder="you@company.com" autocomplete="email" required maxlength="254" aria-describedby="email-error"><span class="field-error" id="email-error"></span></div><div class="field"><label for="company">Company <span>(optional)</span></label><input id="company" name="company" placeholder="Company name" autocomplete="organization" maxlength="150"></div><div class="field"><label for="service">What can I help with?</label><select id="service" name="service" required aria-describedby="service-error"><option value="">Select a service</option>${c.interests.map(s=>`<option>${e(s)}</option>`).join('')}</select><span class="field-error" id="service-error"></span></div><div class="field full"><label for="budget">Budget range <span>(optional)</span></label><select id="budget" name="budget">${c.budgets.map((b,i)=>`<option value="${i ? e(b) : ''}">${e(b)}</option>`).join('')}</select></div><div class="field full"><label for="message">Tell me about your project</label><textarea id="message" name="message" placeholder="What would you like to build or improve?" required minlength="10" maxlength="5000" aria-describedby="message-error"></textarea><span class="field-error" id="message-error"></span></div><input type="checkbox" name="botcheck" class="sr-only" tabindex="-1" aria-hidden="true" hidden><div class="form-footer"><p>A conversation, not a commitment.</p><button type="submit" class="button magnetic">Send enquiry ${icon()}</button></div><div class="form-status" role="status" aria-live="polite" hidden></div></form></div></section>`;
}

function renderHome() {
  document.querySelector('#main').innerHTML = renderShowcase({ e, icon, contactSection });
  initShowcase();
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

let motionPaused=false;

function initGlow() {
  document.querySelectorAll('.glow-card').forEach(card=>{if(card.dataset.glowReady)return;card.dataset.glowReady='true';card.addEventListener('pointermove',event=>{const r=card.getBoundingClientRect();card.style.setProperty('--x',`${event.clientX-r.left}px`);card.style.setProperty('--y',`${event.clientY-r.top}px`);});});
}

function initPageBehavior() {
  const header=document.querySelector('#site-header');
  const scroll=()=>{header.classList.toggle('solid',scrollY>30||!home);};
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
  if(home&&!reduced.matches){document.querySelector('.lm-dock').insertAdjacentHTML('afterbegin','<button class="lm-dock-btn motion-toggle" aria-pressed="false" aria-label="Pause decorative motion" title="Pause motion"><svg class="pause-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M9 6v12M15 6v12"/></svg><svg class="play-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" aria-hidden="true"><path d="M8 5.5v13l10-6.5Z"/></svg></button>');document.querySelector('.motion-toggle').addEventListener('click',event=>{motionPaused=!motionPaused;document.documentElement.classList.toggle('motion-paused',motionPaused);const label=motionPaused?'Resume decorative motion':'Pause decorative motion';event.currentTarget.setAttribute('aria-pressed',String(motionPaused));event.currentTarget.setAttribute('aria-label',label);event.currentTarget.title=motionPaused?'Resume motion':'Pause motion';document.querySelectorAll('.flow-paths').forEach(s=>motionPaused?s.pauseAnimations():s.unpauseAnimations());document.dispatchEvent(new CustomEvent('motionchange',{detail:{paused:motionPaused}}));});}
  document.querySelectorAll('[data-blocks]').forEach(heading=>heading.querySelectorAll('.lm-block').forEach((block,i)=>block.style.setProperty('--i',i)));
  const blockObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(!entry.isIntersecting)return;entry.target.classList.add('is-in');blockObserver.unobserve(entry.target);}),{threshold:.4});
  document.querySelectorAll('[data-blocks]').forEach(el=>blockObserver.observe(el));
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
if(home&&config.enableAurora&&!reduced.matches)import('./fluid.js').then(({initFluid})=>initFluid()).catch(()=>{});
if('requestIdleCallback' in window)requestIdleCallback(initMotionLibraries,{timeout:1800});else setTimeout(initMotionLibraries,600);
// JS-rendered anchors must be resolved after the content exists.
if(location.hash)requestAnimationFrame(()=>{try{document.getElementById(decodeURIComponent(location.hash.slice(1)))?.scrollIntoView();}catch{/* Ignore malformed URL escapes. */}});
