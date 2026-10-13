// Run before stylesheets to avoid a flash of the wrong theme on page navigation.
(() => {
  const root=document.documentElement;
  const key='portfolio:theme';
  let theme='dark';
  try { const stored=localStorage.getItem(key);if(stored==='light'||stored==='dark')theme=stored; } catch { /* In-memory switching still works when storage is blocked. */ }
  function apply(value) {
    root.dataset.theme=value;
    root.style.colorScheme=value;
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content',value==='light'?'#fafafa':'#0a0a0a');
    document.querySelectorAll('.theme-toggle').forEach(button=>{
      button.setAttribute('aria-label',value==='dark'?'Switch to light mode':'Switch to dark mode');
      button.setAttribute('aria-pressed',String(value==='light'));
      button.title=value==='dark'?'Switch to light mode':'Switch to dark mode';
    });
    document.dispatchEvent(new CustomEvent('themechange',{detail:{theme:value}}));
  }
  apply(theme);
  document.addEventListener('click',event=>{
    if(!event.target.closest('.theme-toggle'))return;
    const value=root.dataset.theme==='dark'?'light':'dark';
    apply(value);try{localStorage.setItem(key,value);}catch{}
  });
  document.addEventListener('DOMContentLoaded',()=>apply(root.dataset.theme));
  window.addEventListener('storage',event=>{if(event.key===key)apply(event.newValue==='light'?'light':'dark');});
})();
