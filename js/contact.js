import { config } from './config.js';

let toastTimeout;
export function toast(message) {
  const el=document.querySelector('.toast');if(!el)return;
  el.textContent=message;el.classList.add('visible');clearTimeout(toastTimeout);toastTimeout=setTimeout(()=>el.classList.remove('visible'),3500);
}
export async function copyEmail() {
  try { await navigator.clipboard.writeText(config.email);toast('Copied — email address ready.'); }
  catch { toast(`Email: ${config.email}`); }
}
export function hasFormKey() {return Boolean(config.web3formsKey && config.web3formsKey!=='WEB3FORMS_KEY');}

export function initContact() {
  const form=document.querySelector('#contact-form');if(!form)return;
  const status=form.querySelector('.form-status');const button=form.querySelector('[type=submit]');
  const validators={name:input=>input.value.trim()?'':'Please enter your name.',email:input=>input.validity.valid&&input.value.trim()?'':'Please enter a valid email address.',service:input=>input.value?'':'Please select a service.',message:input=>input.value.trim().length>=10?'':'Please add a little detail (at least 10 characters).'};
  const validate=(name)=>{const field=form.elements[name];const error=validators[name](field);field.setAttribute('aria-invalid',String(Boolean(error)));document.getElementById(`${name}-error`).textContent=error;return !error;};
  Object.keys(validators).forEach(name=>{form.elements[name].addEventListener('blur',()=>validate(name));form.elements[name].addEventListener('input',()=>{if(form.elements[name].getAttribute('aria-invalid')==='true')validate(name);});});
  function showError(message) {
    status.replaceChildren(document.createTextNode(`${message} `));
    const link=document.createElement('a');link.className='underlink';link.textContent='Send an email instead';
    const body=`Name: ${form.elements.name.value}\nCompany: ${form.elements.company.value}\nService: ${form.elements.service.value}\nBudget: ${form.elements.budget.value}\n\n${form.elements.message.value}`;
    link.href=`mailto:${config.email}?subject=${encodeURIComponent(`Portfolio enquiry — ${form.elements.name.value}`)}&body=${encodeURIComponent(body)}`;
    status.append(link);status.hidden=false;status.className='form-status error';
  }
  form.addEventListener('submit',async event=>{
    event.preventDefault();if(button.disabled)return;
    if(form.elements.botcheck.checked)return;
    const valid=Object.keys(validators).map(validate).every(Boolean);
    if(!valid){form.querySelector('[aria-invalid=true]').focus();return;}
    if(!hasFormKey()){showError('The enquiry form is not connected yet.');return;}
    const original=button.innerHTML;button.disabled=true;button.textContent='Sending…';form.setAttribute('aria-busy','true');status.hidden=true;
    const controller=new AbortController();const timeout=setTimeout(()=>controller.abort(),15000);
    try {
      const payload=Object.fromEntries(new FormData(form));delete payload.botcheck;
      payload.access_key=config.web3formsKey;payload.subject=`New portfolio enquiry — ${payload.name.trim()}`;payload.from_name='Portfolio';payload.botcheck=false;
      const response=await fetch('https://api.web3forms.com/submit',{method:'POST',headers:{'Content-Type':'application/json',Accept:'application/json'},body:JSON.stringify(payload),signal:controller.signal});
      const result=await response.json();if(!response.ok||!result.success)throw new Error('Submission failed');
      status.textContent=config.responseMessage;status.className='form-status success';status.hidden=false;form.reset();
    } catch {showError('Your message couldn’t be sent. Please try again.');}
    finally {clearTimeout(timeout);button.disabled=false;button.innerHTML=original;form.removeAttribute('aria-busy');}
  });
}
