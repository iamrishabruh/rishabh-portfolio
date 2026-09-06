// Progressive enhancement only. Every page and every media file works without this module.
document.documentElement.classList.add('js');
const legacy = {experience:'/work/#experience',projects:'/work/#projects',music:'/life/#music',education:'/about/#education',honors:'/about/#honors',skills:'/about/#skills',documents:'/archive/#documents'};
if(location.pathname==='/' && legacy[location.hash.slice(1)]) location.replace(legacy[location.hash.slice(1)]);
const menu=document.querySelector('.mobile-menu');
if(menu){
 document.addEventListener('keydown',event=>{if(event.key==='Escape'&&menu.open){menu.open=false;menu.querySelector('summary').focus();}});
 document.addEventListener('click',event=>{if(menu.open&&!menu.contains(event.target)) menu.open=false;});
 matchMedia('(min-width: 701px)').addEventListener('change',event=>{if(event.matches) menu.open=false;});
}
const copy=document.querySelector('.copy-email');
copy?.addEventListener('click',async()=>{
 const status=document.querySelector('.copy-status');
 try{await navigator.clipboard.writeText(copy.dataset.email);status.textContent='Email copied.';}
 catch{status.textContent='Copy unavailable. Use the email link above.';}
});
const player=document.querySelector('[data-player]');
if(player){
 const audio=player.querySelector('audio');
 const buttons=[...player.querySelectorAll('[data-track]')];
 const status=player.querySelector('.player-status');
 const heading=player.querySelector('[data-now-playing]');
 const retry=player.querySelector('.retry-audio');
 let current=audio.getAttribute('src');
 let request=0;
 function update(){
  for(const button of buttons){
   const active=button.dataset.track===current&&!audio.paused;
   button.setAttribute('aria-pressed',String(active));
   button.setAttribute('aria-label',`${active?'Pause':'Play'} ${button.dataset.title}`);
   button.querySelector('.play-symbol').textContent=active?'Ⅱ':'▷';
  }
 }
 async function play(){
  const id=++request;
  status.textContent='Loading audio…';retry.hidden=true;
  try{await audio.play();if(id===request) update();}
  catch(error){if(id!==request||error.name==='AbortError')return;status.textContent='This track could not play. Retry, or use its Audio link.';retry.hidden=false;update();}
 }
 for(const button of buttons) button.addEventListener('click',()=>{
  if(current===button.dataset.track&&!audio.paused){request++;audio.pause();return;}
  if(current!==button.dataset.track){request++;audio.pause();current=button.dataset.track;audio.src=current;heading.textContent=button.dataset.title;}
  void play();
 });
 retry.addEventListener('click',()=>{audio.load();void play();});
 audio.addEventListener('play',()=>{status.textContent='Playing.';retry.hidden=true;update();});
 audio.addEventListener('pause',()=>{if(!audio.error)status.textContent='Paused.';update();});
 audio.addEventListener('ended',()=>{status.textContent='Track finished.';update();});
 audio.addEventListener('waiting',()=>{status.textContent='Buffering audio…';});
 audio.addEventListener('playing',()=>{status.textContent='Playing.';retry.hidden=true;});
 audio.addEventListener('error',()=>{status.textContent='This track could not load. Retry, or use its Audio link.';retry.hidden=false;update();});
 update();
}
const dialog=document.querySelector('.lightbox');
if(dialog&&typeof dialog.showModal==='function'){
 const image=dialog.querySelector('img');
 const caption=dialog.querySelector('#lightbox-caption');
 let trigger=null;
 for(const link of document.querySelectorAll('[data-lightbox]')) link.addEventListener('click',event=>{
  if(event.metaKey||event.ctrlKey||event.shiftKey||event.altKey||event.button!==0)return;
  event.preventDefault();trigger=link;image.src=link.href;image.alt=link.dataset.caption;
  caption.textContent=link.dataset.caption;dialog.querySelector('.lightbox-original').href=link.href;
  dialog.showModal();document.body.classList.add('lightbox-open');
 });
 dialog.querySelector('.lightbox-close').addEventListener('click',()=>dialog.close());
 dialog.addEventListener('click',event=>{if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();}});
 dialog.addEventListener('close',()=>{document.body.classList.remove('lightbox-open');image.removeAttribute('src');trigger?.focus();});
}
