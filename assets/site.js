/* Octix · header dùng chung: menu Khoá học, menu điện thoại, nền header khi cuộn, hiện dần khi cuộn tới. */
(function(){
  var nav=document.getElementById('nav'); if(!nav) return;

  /* nền header khi cuộn */
  var onScroll=function(){ nav.classList.toggle('scrolled', scrollY>24); };
  addEventListener('scroll',onScroll,{passive:true}); onScroll();

  /* menu Khoá học: rê chuột hoặc bấm để mở, Esc hoặc bấm ra ngoài để đóng */
  document.querySelectorAll('.dd').forEach(function(dd){
    var btn=dd.querySelector('.dd-btn'), t=null;
    var set=function(o){ dd.classList.toggle('open',o); btn.setAttribute('aria-expanded',o); };
    btn.addEventListener('click',function(e){ e.stopPropagation(); set(!dd.classList.contains('open')); });
    if(matchMedia('(hover:hover)').matches){
      dd.addEventListener('mouseenter',function(){ clearTimeout(t); set(true); });
      dd.addEventListener('mouseleave',function(){ t=setTimeout(function(){ set(false); },160); });
    }
    dd.addEventListener('focusout',function(e){ if(!dd.contains(e.relatedTarget)) set(false); });
    document.addEventListener('click',function(e){ if(!dd.contains(e.target)) set(false); });
    addEventListener('keydown',function(e){ if(e.key==='Escape' && dd.classList.contains('open')){ set(false); btn.focus(); } });
  });

  /* menu điện thoại */
  var b=document.getElementById('menu-btn'), m=document.getElementById('mnav');
  if(b && m){
    var set=function(o){ nav.classList.toggle('open',o); b.setAttribute('aria-expanded',o); b.setAttribute('aria-label',o?'Đóng menu':'Mở menu'); };
    b.addEventListener('click',function(){ set(!nav.classList.contains('open')); });
    m.querySelectorAll('a').forEach(function(a){ a.addEventListener('click',function(){ set(false); }); });
    addEventListener('keydown',function(e){ if(e.key==='Escape') set(false); });
    matchMedia('(min-width:861px)').addEventListener('change',function(e){ if(e.matches) set(false); });
  }

  /* hiện dần khi cuộn tới (chỉ áp cho khối .rv nằm dưới màn hình đầu) */
  if(!document.documentElement.hasAttribute('data-own-reveal') && !matchMedia('(prefers-reduced-motion: reduce)').matches && 'IntersectionObserver' in window){
    var io=new IntersectionObserver(function(es){ es.forEach(function(e){ if(e.isIntersecting){ e.target.classList.remove('pre'); io.unobserve(e.target); } }); },{rootMargin:'0px 0px -8% 0px'});
    document.querySelectorAll('.rv').forEach(function(el){ if(el.getBoundingClientRect().top>innerHeight){ el.classList.add('pre'); io.observe(el); } });
  }
})();
