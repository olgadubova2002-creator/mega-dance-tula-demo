(function(){
  var els=[].slice.call(document.querySelectorAll('[data-reveal]'));
  if(!('IntersectionObserver' in window)){els.forEach(function(e){e.classList.add('in')});}
  else{
    var io=new IntersectionObserver(function(es){es.forEach(function(x){if(x.isIntersecting){x.target.classList.add('in');io.unobserve(x.target)}})},{threshold:.12});
    els.forEach(function(e,i){e.style.setProperty('--d',(i%4)*70+'ms');io.observe(e)});
  }
  var P={'1':{8:4500,12:6000,16:null},'1.5':{8:6000,12:8000,16:10000}};
  var box=document.querySelector('[data-pass]');if(!box)return;
  var dur='1.5',n=8;
  var sum=box.querySelector('[data-sum]'),note=box.querySelector('[data-note]'),dots=box.querySelector('[data-dots]'),wa=box.querySelector('[data-wa]');
  function fmt(v){return String(v).replace(/\B(?=(\d{3})+(?!\d))/g,' ')+' ₽'}
  function render(){
    var p=P[dur][n],durTxt=dur==='1'?'1 часу':'1,5 часа',msg;
    dots.innerHTML='';
    for(var i=0;i<n;i++){var d=document.createElement('i');d.style.animationDelay=(i*25)+'ms';dots.appendChild(d)}
    if(p){sum.textContent=fmt(p);note.textContent=n+' занятий по '+durTxt+', около '+fmt(Math.round(p/n))+' за занятие';
      msg='Здравствуйте! Хочу абонемент в Mega Dance: '+n+' занятий по '+durTxt+' ('+fmt(p)+'). Подскажите направление и время.';}
    else{sum.textContent='уточнить';note.textContent=n+' занятий по '+durTxt+': цену подтвердим при записи';
      msg='Здравствуйте! Интересует абонемент в Mega Dance: '+n+' занятий по '+durTxt+'. Подскажите цену, направление и время.';}
    wa.href='https://wa.me/79308989777?text='+encodeURIComponent(msg);
  }
  box.addEventListener('click',function(e){
    var b=e.target.closest('.opt');if(!b)return;
    [].forEach.call(b.parentNode.children,function(c){c.setAttribute('aria-pressed',c===b?'true':'false')});
    if(b.dataset.dur)dur=b.dataset.dur;
    if(b.dataset.n)n=+b.dataset.n;
    render();
  });
  render();
})();
