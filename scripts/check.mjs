// Dependency-free integrity checks and isolated form/notification tests.
// No real messages are sent. Run: node scripts/check.mjs
import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';
import { readFile, access } from 'node:fs/promises';
import { spawnSync } from 'node:child_process';
import { config } from '../js/config.js';
import { solutions, caseStudies, pillars } from '../js/data.js';
const root=new URL('../',import.meta.url);
let checks=0;
function ok(condition,message){assert.ok(condition,message);checks++;}
const pages=['index.html','solutions.html','solution.html','work.html','case.html','404.html'];
for(const page of pages){
  const source=await readFile(new URL(page,root),'utf8');
  ok(source.includes('name="description"')&&source.includes('name="viewport"'),`${page}: metadata`);
  for(const [,path] of source.matchAll(/(?:src|href)="(\.\/[^"?#]+)(?:[?#][^"]*)?"/g)){await access(new URL(path,root));checks++;}
  ok(!/(?:href|src)="\/(?!\/)/.test(source),`${page}: relative assets`);
}
for(const file of ['config','data','main','aurora','palette','contact','notify']){
  const result=spawnSync(process.execPath,['--check',fileURLToPath(new URL(`js/${file}.js`,root))],{encoding:'utf8'});
  assert.equal(result.status,0,result.stderr);checks++;
}
for(const collection of [solutions,caseStudies,pillars])ok(new Set(collection.map(item=>item.id)).size===collection.length,'Unique content IDs');
assert.equal(solutions.length,15);assert.equal(caseStudies.length,10);assert.equal(solutions[0].modules.length,21);checks+=3;
for(const item of solutions){for(const key of ['modules','features','integrations','stack'])ok(item[key]?.length,`${item.id}.${key}`);}
for(const item of caseStudies){await access(new URL(item.cover,root));ok(item.architecture.length>1&&item.metrics.length>0,`${item.id}: architecture and metrics`);}
const mainSource=await readFile(new URL('js/main.js',root),'utf8');
ok(!/(?:tel:|wa\.me\/|api\.whatsapp\.com\/send)/.test(mainSource),'No phone / WhatsApp contact links');

// Small DOM doubles exercise the actual contact module without a browser or network.
class Element {
  value='';textContent='';innerHTML='Send enquiry';hidden=true;disabled=false;checked=false;attrs={};listeners={};children=[];validity={valid:true};
  addEventListener(name,fn){this.listeners[name]=fn;}
  setAttribute(name,value){this.attrs[name]=value;}
  getAttribute(name){return this.attrs[name];}
  removeAttribute(name){delete this.attrs[name];}
  focus(){this.focused=true;}
  replaceChildren(...nodes){this.children=nodes;}
  append(node){this.children.push(node);}
}
const fields=Object.fromEntries(['name','email','company','service','budget','message','botcheck'].map(name=>[name,new Element()]));
const errors=Object.fromEntries(['name','email','service','message'].map(name=>[`${name}-error`,new Element()]));
const status=new Element(),button=new Element(),form=new Element();form.elements=fields;
form.querySelector=selector=>selector==='.form-status'?status:selector==='[type=submit]'?button:Object.values(fields).find(f=>f.attrs['aria-invalid']==='true');
form.reset=()=>{Object.values(fields).forEach(f=>f.value='');};
globalThis.document={querySelector:selector=>selector==='#contact-form'?form:null,getElementById:id=>errors[id],createTextNode:text=>({textContent:text}),createElement:()=>new Element(),referrer:'https://example.com/'};
globalThis.FormData=class {constructor(f){this.form=f;}*[Symbol.iterator](){for(const [key,el] of Object.entries(this.form.elements))if(key!=='botcheck')yield [key,el.value];}};
const {initContact}=await import('../js/contact.js');initContact();
let requests=[];globalThis.fetch=async(url,options)=>{requests.push({url,options});return{ok:true,json:async()=>({success:true})};};
const submit=()=>form.listeners.submit({preventDefault(){}});
await submit();ok(fields.name.focused&&requests.length===0,'Invalid form focuses first field and never sends');
const fill=()=>{fields.name.value='QA';fields.email.value='qa@example.com';fields.service.value='AI';fields.message.value='A local test of the enquiry workflow.';};fill();
await submit();ok(status.className==='form-status error'&&requests.length===0,'Placeholder key uses error fallback');ok(status.children.some(c=>c.href?.startsWith('mailto:')),'Email fallback contains enquiry');
const originalKey=config.web3formsKey;config.web3formsKey='TEST_ONLY';
await submit();ok(status.className==='form-status success'&&!button.disabled,'Success resets loading state');
let payload=JSON.parse(requests.at(-1).options.body);assert.equal(payload.subject,'New portfolio enquiry — QA');assert.equal(payload.botcheck,false);checks+=2;
fill();globalThis.fetch=async()=>{throw new Error('Offline');};await submit();ok(status.className==='form-status error'&&fields.message.value.length>0&&!button.disabled,'Failure preserves enquiry and re-enables button');
requests=[];globalThis.fetch=async(url,options)=>{requests.push({url,options});return{ok:true,json:async()=>({success:true})};};fields.botcheck.checked=true;await submit();ok(requests.length===0,'Honeypot suppresses submission');fields.botcheck.checked=false;

const {notifyVisit}=await import('../js/notify.js');
globalThis.location={hostname:'portfolio.example',pathname:'/repo/index.html'};
Object.defineProperty(globalThis,'navigator',{configurable:true,value:{webdriver:false,userAgent:'Test browser',language:'en'}});
globalThis.screen={width:1280,height:800};let storage=new Map();globalThis.sessionStorage={getItem:key=>storage.get(key),setItem:(key,value)=>storage.set(key,value)};
config.notifyOnVisit=false;await notifyVisit();ok(requests.length===0,'Visit notifications disabled by default');
config.notifyOnVisit=true;location.hostname='localhost';await notifyVisit();ok(requests.length===0,'Localhost is excluded');location.hostname='portfolio.example';navigator.webdriver=true;await notifyVisit();ok(requests.length===0,'Automation excluded');navigator.webdriver=false;
await notifyVisit();await notifyVisit();ok(requests.length===1,'One visit request per session');
payload=JSON.parse(requests[0].options.body);ok(payload.page==='/repo/index.html'&&payload.timezone&&payload.language==='en'&&!('ip' in payload),'Notification fields and no IP lookup');
storage=new Map();let attempts=0;globalThis.fetch=async()=>{attempts++;throw new Error('Offline');};await notifyVisit();await notifyVisit();ok(attempts===1,'Failed visit requests are silent and not retried');
config.web3formsKey=originalKey;config.notifyOnVisit=false;
console.log(`Passed ${checks} integrity and isolated behavior checks. No real network requests were made.`);
