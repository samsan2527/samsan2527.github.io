import { config } from './config.js';
import { hasFormKey } from './contact.js';

export async function notifyVisit() {
  if(!config.notifyOnVisit||!hasFormKey()||['localhost','127.0.0.1','::1','[::1]'].includes(location.hostname)||navigator.webdriver||/bot|crawl|spider|slurp|headless|lighthouse|preview|facebookexternalhit/i.test(navigator.userAgent))return;
  try {
    const flag='portfolio:visit-notified';if(sessionStorage.getItem(flag))return;
    // Mark before sending: one attempt per tab session, including failures.
    sessionStorage.setItem(flag,'1');
    await fetch('https://api.web3forms.com/submit',{method:'POST',headers:{'Content-Type':'application/json',Accept:'application/json'},body:JSON.stringify({access_key:config.web3formsKey,subject:'Portfolio visited',from_name:'Portfolio',botcheck:false,page:location.pathname,referrer:document.referrer||'Direct',timestamp:new Date().toISOString(),timezone:Intl.DateTimeFormat().resolvedOptions().timeZone,language:navigator.language,screen_size:`${screen.width} × ${screen.height}`}),signal:AbortSignal.timeout(10000)});
  } catch { /* Notifications are optional and never interrupt the visit. */ }
}
