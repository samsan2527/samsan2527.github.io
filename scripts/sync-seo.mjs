// Optional publishing helper. The site itself has no build step or dependencies.
// Run after changing owner info, or setting config.siteUrl.
import { readFile, writeFile } from 'node:fs/promises';
import { config } from '../js/config.js';
import { content, solutions, caseStudies } from '../js/data.js';

const root=new URL('../',import.meta.url);
const escape=value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const name=config.displayName;
const pages=[['index.html',`${name} — AI, Automation & Software Engineer`,config.seoDescription],['solutions.html',`Software Solutions — ${name}`,content.solutions.description],['solution.html',`Solution Details — ${name}`,'Explore modules, features, integrations and technology for a custom business software solution.'],['work.html',`Selected Work — ${name}`,content.work.description],['case.html',`Project Architecture — ${name}`,'Explore the challenge, approach and architecture behind an AI, automation or software project.'],['404.html',`Page Not Found — ${name}`,'This page could not be found. Return to the portfolio.']];
let base='';
if(config.siteUrl){const url=new URL(config.siteUrl);if(!['https:','http:'].includes(url.protocol))throw new Error('siteUrl must be an HTTP(S) URL.');base=config.siteUrl.replace(/\/$/,'');}
for(const [filename,title,description] of pages){
  let html=await readFile(new URL(filename,root),'utf8');
  html=html.replace(/<title>.*?<\/title>/,`<title>${escape(title)}</title>`);
  for(const [key,value] of [['description',description],['og:title',title],['twitter:title',title],['og:description',description],['twitter:description',description],['og:image',base?`${base}/assets/og-image.png`:'./assets/og-image.png'],['twitter:image',base?`${base}/assets/og-image.png`:'./assets/og-image.png'],['og:url',base?`${base}/${filename==='index.html'?'':filename}`:''],['og:image:alt',`${name} — AI, automation and software. Intelligence, connected to the real world.`]]){
    html=html.replace(new RegExp(`(<meta (?:name|property)="${key}" content=")[^"]*(">)`),`$1${escape(value)}$2`);
  }
  html=html.replace(/<link rel="canonical"[^>]*>\n?\s*/g,'');
  // Query-based detail pages get their canonical URL client-side.
  if(base&&!['solution.html','case.html','404.html'].includes(filename))html=html.replace('</head>',`  <link rel="canonical" href="${escape(base+'/'+(filename==='index.html'?'':filename))}">\n</head>`);
  html=html.replace(/<script type="application\/ld\+json" id="structured-data">[\s\S]*?<\/script>\n?\s*/g,'');
  if(filename==='index.html'){
    const data={'@context':'https://schema.org','@graph':[{'@type':'Person',name:config.name,jobTitle:config.title,email:config.email,sameAs:[config.linkedin],address:{'@type':'PostalAddress',addressLocality:'Dubai',addressCountry:'AE'},...(base?{url:base}:{})},{'@type':'ProfessionalService',name:`${name} — AI, Automation & Software`,description:config.seoDescription,email:config.email,areaServed:['United Arab Emirates','Saudi Arabia','Bahrain','India'],address:{'@type':'PostalAddress',addressLocality:'Dubai',addressCountry:'AE'},...(base?{url:base}:{})}]};
    html=html.replace('</head>',`  <script type="application/ld+json" id="structured-data">${JSON.stringify(data).replace(/</g,'\\u003c')}</script>\n</head>`);
  }
  const fallback=`<noscript><div style="padding:120px 8%;max-width:900px"><h1>AI, automation &amp; software that run real businesses.</h1><p>${escape(name)} — ${escape(config.title)}. ${escape(config.location)} · ${escape(config.region)}.</p><p>This portfolio uses JavaScript to render its data-driven catalog. Enable JavaScript to explore the site.</p><p><a href="mailto:${escape(config.email)}">Email ${escape(name)}</a> · <a href="${escape(config.linkedin)}">LinkedIn</a></p></div></noscript>`;
  html=html.replace(/<noscript>[\s\S]*?<\/noscript>/,fallback);
  await writeFile(new URL(filename,root),html);
}
if(base){
  const paths=['','solutions.html','work.html',...solutions.map(s=>`solution.html?id=${encodeURIComponent(s.id)}`),...caseStudies.map(c=>`case.html?id=${encodeURIComponent(c.id)}`)];
  await writeFile(new URL('sitemap.xml',root),`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${paths.map(path=>`  <url><loc>${escape(base+'/'+path)}</loc></url>`).join('\n')}\n</urlset>\n`);
  await writeFile(new URL('robots.txt',root),`User-agent: *\nAllow: /\nSitemap: ${base}/sitemap.xml\n`);
  console.log('Updated metadata, structured data, sitemap and robots for',base);
}else console.log('Updated metadata and structured data. Set config.siteUrl, then rerun to populate the sitemap and absolute social URLs.');
