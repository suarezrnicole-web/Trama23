
/* Trama 23 Studio — comportamiento del portafolio. Generado por build.py */
// Clave de Web3Forms (web3forms.com). Pega aquí la que te llegue por correo:
const CLAVE_FORMULARIO='4a7153c3-f429-4c5e-b118-f8811c301554';
 
(function(){
  const raiz=document.documentElement;
  raiz.classList.remove('no-js'); raiz.classList.add('js');
  const reducir=matchMedia('(prefers-reduced-motion: reduce)').matches;
 
  // Largo de cada garabato para poder "dibujarlo"
  document.querySelectorAll('.dibujar path').forEach(p=>{
    try{ p.style.setProperty('--len', Math.ceil(p.getTotalLength())+2); }catch(e){}
  });
 
  // Contadores
  function contar(el){
    if(reducir) return;
    const meta=parseFloat(el.dataset.count), dec=+el.dataset.dec||0, suf=el.dataset.suf||'';
    const t0=performance.now(), dur=1600;
    function paso(t){
      const k=Math.min(1,(t-t0)/dur), e=1-Math.pow(1-k,3);
      el.textContent=(meta*e).toLocaleString('es-MX',{minimumFractionDigits:dec,maximumFractionDigits:dec})+suf;
      if(k<1) requestAnimationFrame(paso);
    }
    requestAnimationFrame(paso);
  }
 
  // Aparición al entrar en pantalla
  const objetivos=document.querySelectorAll('.reveal,.dibujar,.costura,[data-count],.sobre');
  if('IntersectionObserver' in window && !reducir){
    const io=new IntersectionObserver((entradas)=>{
      entradas.forEach(en=>{
        if(!en.isIntersecting) return;
        const el=en.target;
        el.classList.add('is-in');
        if(el.dataset.count!==undefined) contar(el);
        io.unobserve(el);
      });
    },{threshold:.14,rootMargin:'0px 0px -6% 0px'});
    objetivos.forEach(el=>{ if(!el.closest('.mosaico')) io.observe(el); });
    const ioGal=new IntersectionObserver((entradas)=>{
      entradas.forEach(en=>{
        if(!en.isIntersecting) return;
        en.target.querySelectorAll('.reveal').forEach(f=>f.classList.add('is-in'));
        ioGal.unobserve(en.target);
      });
    },{threshold:0,rootMargin:'0px 0px -8% 0px'});
    document.querySelectorAll('.mosaico').forEach(m=>ioGal.observe(m));
  }else{
    objetivos.forEach(el=>el.classList.add('is-in'));
  }
 
  // Menú de celular
  const menuBtn=document.getElementById('menuBtn'), navEl=document.getElementById('nav');
  function menu(abrir){ navEl.classList.toggle('abierta',abrir); menuBtn.setAttribute('aria-expanded',String(abrir)); menuBtn.querySelector('.menu-txt').textContent=abrir?'Cerrar':'Menú'; }
  menuBtn.addEventListener('click',()=>menu(!navEl.classList.contains('abierta')));
  navEl.querySelectorAll('ul a').forEach(a=>a.addEventListener('click',()=>menu(false)));
  addEventListener('keydown',e=>{ if(e.key==='Escape' && navEl.classList.contains('abierta')){ menu(false); menuBtn.focus(); } });
 
  // Navegación: se esconde al bajar y regresa al subir
  const nav=document.getElementById('nav'); let ultimo=scrollY;
  addEventListener('scroll',()=>{
    const y=scrollY;
    nav.classList.toggle('escondida', y>ultimo && y>220 && !nav.classList.contains('abierta'));
    ultimo=y;
  },{passive:true});
 
  // Paralaje suave en las piezas del collage
  const flotantes=[...document.querySelectorAll('[data-vel]')];
  if(!reducir && flotantes.length){
    let pendiente=false;
    function mover(){
      pendiente=false;
      const vh=innerHeight;
      flotantes.forEach(el=>{
        const r=el.getBoundingClientRect(); const v=parseFloat(el.dataset.vel);
        el.style.translate='0 '+((r.top+r.height/2-vh/2)*v).toFixed(1)+'px';
      });
    }
    addEventListener('scroll',()=>{ if(!pendiente){pendiente=true;requestAnimationFrame(mover);} },{passive:true});
    mover();
  }
 
  // Fichas de servicio: "qué incluye"
  document.querySelectorAll('.incluye-btn').forEach(b=>{
    b.addEventListener('click',()=>{
      const panel=document.getElementById(b.getAttribute('aria-controls'));
      const abierto=b.getAttribute('aria-expanded')==='true';
      b.setAttribute('aria-expanded', String(!abierto));
      panel.style.maxHeight = abierto ? '0px' : panel.scrollHeight+'px';
    });
  });
 
  // Visor de piezas
  const visor=document.getElementById('visor'), vImg=document.getElementById('visorImg'), vTit=document.getElementById('visorTit');
  let origen=null;
  document.querySelectorAll('[data-zoom]').forEach(b=>{
    b.addEventListener('click',()=>{
      origen=b; vImg.src=b.dataset.zoom; vImg.alt=b.getAttribute('aria-label')||''; vTit.textContent=b.dataset.titulo||'';
      visor.classList.add('abierto'); document.getElementById('visorCerrar').focus();
    });
  });
  function cerrar(){ visor.classList.remove('abierto'); if(origen) origen.focus(); }
  document.getElementById('visorCerrar').addEventListener('click',cerrar);
  visor.addEventListener('click',e=>{ if(e.target===visor) cerrar(); });
  addEventListener('keydown',e=>{ if(e.key==='Escape' && visor.classList.contains('abierto')) cerrar(); });
 
  // Un solo video sonando a la vez
  document.querySelectorAll('video').forEach(v=>v.addEventListener('play',()=>{
    document.querySelectorAll('video').forEach(o=>{ if(o!==v) o.pause(); });
  }));
 
  // Formulario (sin backend: muestra la confirmación)
  let servicio='';
  document.querySelectorAll('[data-chip]').forEach(c=>c.addEventListener('click',()=>{
    servicio = servicio===c.dataset.chip ? '' : c.dataset.chip;
    document.querySelectorAll('[data-chip]').forEach(x=>x.classList.toggle('on', x.dataset.chip===servicio));
  }));
  const formulario=document.getElementById('formulario'), gracias=document.getElementById('gracias');
  const btnEnviar=document.getElementById('enviarMensaje'), aviso=document.getElementById('avisoForm');
  const val=id=>document.getElementById(id).value.trim();
  function avisar(txt){ aviso.textContent=txt; aviso.hidden=!txt; }
  btnEnviar.addEventListener('click',async()=>{
    const datos={nombre:val('f-nombre'),marca:val('f-marca'),instagram:val('f-ig'),contexto:val('f-contexto')};
    if(!datos.nombre||!datos.instagram||!datos.contexto){ avisar('Completa tu nombre, tu Instagram y el contexto para poder responderte.'); return; }
    if(document.getElementById('f-bot').checked) return;
    if(!CLAVE_FORMULARIO || CLAVE_FORMULARIO.indexOf('PEGA')===0){ avisar('El formulario aún no está conectado. Escríbeme por Instagram: @trama23mx'); return; }
    avisar(''); btnEnviar.disabled=true; const txtBtn=btnEnviar.innerHTML; btnEnviar.textContent='Enviando…';
    try{
      const r=await fetch('https://api.web3forms.com/submit',{method:'POST',headers:{'Content-Type':'application/json',Accept:'application/json'},
        body:JSON.stringify({access_key:CLAVE_FORMULARIO,subject:'Nuevo mensaje desde el portafolio — '+(datos.marca||datos.nombre),from_name:'Portafolio Trama 23',
          Nombre:datos.nombre,Marca:datos.marca||'—',Instagram:datos.instagram,'Qué necesita':servicio||'—',Contexto:datos.contexto})});
      const j=await r.json();
      if(!r.ok||!j.success) throw new Error(j.message||'error');
      formulario.hidden=true; gracias.hidden=false;
    }catch(e){ avisar('No se pudo enviar. Intenta de nuevo o escríbeme por Instagram: @trama23mx'); }
    finally{ btnEnviar.disabled=false; btnEnviar.innerHTML=txtBtn; }
  });
  document.getElementById('otroMensaje').addEventListener('click',()=>{
    formulario.querySelectorAll('input,textarea').forEach(c=>c.value='');
    servicio=''; document.querySelectorAll('[data-chip]').forEach(x=>x.classList.remove('on'));
    gracias.hidden=true; formulario.hidden=false;
  });
})();
 
