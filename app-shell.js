(()=>{
'use strict';
const sidebar=document.getElementById('sidebar');
const backdrop=document.getElementById('sidebarBackdrop');
const menu=document.getElementById('menuBtn');
const more=document.getElementById('moreNav');
const bottom=document.querySelector('.bottom-nav');
const navButtons=[...document.querySelectorAll('#navigation [data-page]')];
function closeMenu(){sidebar.classList.remove('open');backdrop.hidden=true;menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','Open navigation');}
function openMenu(){sidebar.classList.add('open');backdrop.hidden=false;menu.setAttribute('aria-expanded','true');menu.setAttribute('aria-label','Close navigation');}
// Capture the existing menu click before the legacy listener to avoid double-toggle.
menu.addEventListener('click',e=>{e.stopImmediatePropagation();sidebar.classList.contains('open')?closeMenu():openMenu();},{capture:true});
backdrop.addEventListener('click',closeMenu);
more.addEventListener('click',openMenu);
navButtons.forEach(b=>b.addEventListener('click',closeMenu));
function sync(){const active=document.querySelector('#navigation .nav.active')?.dataset.page;bottom.querySelectorAll('[data-page]').forEach(b=>{b.classList.toggle('active',b.dataset.page===active);if(b.dataset.page===active)b.setAttribute('aria-current','page');else b.removeAttribute('aria-current');});}
bottom.addEventListener('click',e=>{const b=e.target.closest('[data-page]');if(!b)return;e.stopPropagation();const target=navButtons.find(x=>x.dataset.page===b.dataset.page);target?.click();sync();});
const observer=new MutationObserver(sync);observer.observe(document.getElementById('navigation'),{attributes:true,attributeFilter:['class'],subtree:true});sync();
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&sidebar.classList.contains('open'))closeMenu();});
window.addEventListener('resize',()=>{if(window.innerWidth>760)closeMenu();});
if('serviceWorker' in navigator && location.protocol==='https:')window.addEventListener('load',()=>navigator.serviceWorker.register('./sw.js').catch(()=>{}));
})();