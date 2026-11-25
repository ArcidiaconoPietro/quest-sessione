
(function(){
  const $ = id => document.getElementById(id);
  const css = n => getComputedStyle(document.documentElement).getPropertyValue(n).trim();
  const store = {
    get(k){ try { return JSON.parse(localStorage.getItem(k)) || {}; } catch(e){ return {}; } },
    set(k,v){ try { localStorage.setItem(k, JSON.stringify(v)); } catch(e){} }
  };

  function markDone(ch){ const a = document.querySelector('#nav a[data-ch="'+ch+'"]'); if (a && store.get('lavagna-'+ch).done && !a.querySelector('.tick')) a.insertAdjacentHTML('beforeend',' <span class="tick">✓</span>'); }

  /* ---------------- grafici ---------------- */
  // o: {n0, N, series:[{f, color, line}], hlines:[{y,color,dash}], zero}
  function plot(cv, o){
    if (!cv || !cv.offsetParent) return;
    const dpr = window.devicePixelRatio || 1;
    const W = cv.clientWidth, H = cv.clientHeight;
    cv.width = W*dpr; cv.height = H*dpr;
    const g = cv.getContext('2d'); g.setTransform(dpr,0,0,dpr,0,0); g.clearRect(0,0,W,H);
    const n0 = o.n0 || 1, N = o.N, pad = {l:44, r:12, t:14, b:26};
    let ys = [];
    o.series.forEach(s => { for (let n=n0;n<=N;n++){ const v=s.f(n); if (isFinite(v)) ys.push(v); } });
    (o.hlines||[]).forEach(h => ys.push(h.y));
    if (o.zero !== false) ys.push(0);
    let ymin = Math.min(...ys), ymax = Math.max(...ys);
    const m = (ymax-ymin)*0.08 || 0.5; ymin -= m; ymax += m;
    const X = n => pad.l + (n-n0)/Math.max(N-n0,1)*(W-pad.l-pad.r);
    const Y = y => pad.t + (ymax-y)/(ymax-ymin)*(H-pad.t-pad.b);
    const ink = css('--muted');
    g.font = '12px ' + css('--text'); g.fillStyle = ink; g.strokeStyle = css('--line'); g.lineWidth = 1;
    niceTicks(ymin, ymax, 5).forEach(t => { g.beginPath(); g.moveTo(pad.l, Y(t)); g.lineTo(W-pad.r, Y(t)); g.stroke(); g.fillText(fmt(t), 4, Y(t)+4); });
    if (ymin < 0 && ymax > 0){ g.strokeStyle = ink; g.globalAlpha = .6; g.beginPath(); g.moveTo(pad.l, Y(0)); g.lineTo(W-pad.r, Y(0)); g.stroke(); g.globalAlpha = 1; }
    g.fillStyle = ink; g.fillText('n = '+n0, pad.l, H-8); const lbl='n = '+N; g.fillText(lbl, W-pad.r-g.measureText(lbl).width, H-8);
    (o.hlines||[]).forEach(h => { g.strokeStyle = css(h.color||'--ink'); g.lineWidth = 1.5; g.setLineDash([6,5]); g.beginPath(); g.moveTo(pad.l, Y(h.y)); g.lineTo(W-pad.r, Y(h.y)); g.stroke(); g.setLineDash([]);
      if (h.label){ g.fillStyle = css(h.color||'--ink'); g.fillText(h.label, W-pad.r-g.measureText(h.label).width-2, Y(h.y)-6); } });
    const r = (N-n0)>60 ? 2.5 : 4;
    o.series.forEach(s => {
      const col = css(s.color);
      if (s.line){ g.strokeStyle = col; g.lineWidth = 2.5; g.beginPath(); let st=false;
        for (let n=n0;n<=N;n++){ const v=s.f(n); if(!isFinite(v)) continue; const x=X(n), y=Y(v); st?g.lineTo(x,y):(g.moveTo(x,y),st=true);} g.stroke(); return; }
      g.fillStyle = col;
      for (let n=n0;n<=N;n++){ const v=s.f(n); if(!isFinite(v)) continue; g.beginPath(); g.arc(X(n), Y(v), r, 0, 7); g.fill(); }
    });
  }
  function niceTicks(a,b,k){ const span=b-a, step0=span/k, p=Math.pow(10,Math.floor(Math.log10(step0))); const s=[1,2,5,10].map(x=>x*p).find(x=>x>=step0); const out=[]; for(let t=Math.ceil(a/s)*s;t<=b+1e-12;t+=s) out.push(+t.toFixed(10)); return out; }
  function fmt(t){ return Math.abs(t)<1e-9 ? '0' : (+t.toFixed(3)).toString().replace('.', ','); }
  const LIM = '<span class="lim">lim<span>n→+∞</span></span>';
  const it = (x, d=4) => x.toFixed(d).replace('.', ',');


  const SUM = (from, to='+∞') => '<span class="sig"><span>'+to+'</span><b>Σ</b><span>n='+from+'</span></span>';
  const LIMX = to => '<span class="lim">lim<span>x→'+to+'</span></span>';
  const FR = (a,b) => '<span class="fr"><span>'+a+'</span><span>'+b+'</span></span>';
  // grafico di funzioni: o = {xmin,xmax,ymin,ymax, fns:[{f,color,dash,width}], points:[{x,y,color,open}], vlines:[{x,color,label}], hlines:[{y,color,label}], area:{f,a,b,color}}
  function plotF(cv, o){
    if (!cv || !cv.offsetParent) return;
    const dpr = window.devicePixelRatio || 1, W = cv.clientWidth, H = cv.clientHeight;
    cv.width = W*dpr; cv.height = H*dpr;
    const g = cv.getContext('2d'); g.setTransform(dpr,0,0,dpr,0,0); g.clearRect(0,0,W,H);
    const pad = {l:40, r:12, t:12, b:24};
    const X = x => pad.l + (x-o.xmin)/(o.xmax-o.xmin)*(W-pad.l-pad.r);
    const Y = y => pad.t + (o.ymax-y)/(o.ymax-o.ymin)*(H-pad.t-pad.b);
    const ink = css('--muted');
    g.font = '12px ' + css('--text'); g.lineWidth = 1;
    g.strokeStyle = css('--line'); g.fillStyle = ink;
    niceTicks(o.ymin, o.ymax, 5).forEach(t => { g.beginPath(); g.moveTo(pad.l, Y(t)); g.lineTo(W-pad.r, Y(t)); g.stroke(); g.fillText(fmt(t), 4, Y(t)+4); });
    niceTicks(o.xmin, o.xmax, 6).forEach(t => { g.beginPath(); g.moveTo(X(t), pad.t); g.lineTo(X(t), H-pad.b); g.stroke(); const s=fmt(t); g.fillText(s, X(t)-g.measureText(s).width/2, H-8); });
    g.strokeStyle = ink; g.globalAlpha = .7;
    if (o.ymin<0 && o.ymax>0){ g.beginPath(); g.moveTo(pad.l, Y(0)); g.lineTo(W-pad.r, Y(0)); g.stroke(); }
    if (o.xmin<0 && o.xmax>0){ g.beginPath(); g.moveTo(X(0), pad.t); g.lineTo(X(0), H-pad.b); g.stroke(); }
    g.globalAlpha = 1;
    const steps = Math.max(200, W*2);
    if (o.area){ const A=o.area; g.fillStyle = css(A.color||'--thief'); g.globalAlpha = .25; g.beginPath(); g.moveTo(X(A.a), Y(0));
      for (let i=0;i<=steps;i++){ const x=A.a+(A.b-A.a)*i/steps; g.lineTo(X(x), Y(Math.max(o.ymin, Math.min(o.ymax, A.f(x))))); }
      g.lineTo(X(A.b), Y(0)); g.closePath(); g.fill(); g.globalAlpha = 1; }
    (o.hlines||[]).forEach(h => { g.strokeStyle = css(h.color||'--ink'); g.lineWidth = 1.5; g.setLineDash([6,5]); g.beginPath(); g.moveTo(pad.l, Y(h.y)); g.lineTo(W-pad.r, Y(h.y)); g.stroke(); g.setLineDash([]); if (h.label){ g.fillStyle=css(h.color||'--ink'); g.fillText(h.label, W-pad.r-g.measureText(h.label).width-2, Y(h.y)-6);} });
    (o.vlines||[]).forEach(v => { g.strokeStyle = css(v.color||'--ink'); g.lineWidth = 1.5; g.setLineDash([6,5]); g.beginPath(); g.moveTo(X(v.x), pad.t); g.lineTo(X(v.x), H-pad.b); g.stroke(); g.setLineDash([]); if (v.label){ g.fillStyle=css(v.color||'--ink'); g.fillText(v.label, X(v.x)+4, pad.t+12);} });
    (o.fns||[]).forEach(F => {
      g.strokeStyle = css(F.color||'--thief'); g.lineWidth = F.width||2.5; if (F.dash) g.setLineDash([6,5]);
      g.beginPath(); let on=false, py=null;
      for (let i=0;i<=steps;i++){ const x=o.xmin+(o.xmax-o.xmin)*i/steps, y=F.f(x);
        if (!isFinite(y) || (py!==null && Math.abs(y-py) > (o.ymax-o.ymin)*2)) { on=false; py=null; continue; }
        const yy = Math.max(o.ymin-(o.ymax-o.ymin), Math.min(o.ymax+(o.ymax-o.ymin), y));
        on ? g.lineTo(X(x), Y(yy)) : (g.moveTo(X(x), Y(yy)), on=true); py=y; }
      g.stroke(); g.setLineDash([]);
    });
    (o.points||[]).forEach(p => { const c=css(p.color||'--ink'); g.beginPath(); g.arc(X(p.x), Y(p.y), 5, 0, 7);
      if (p.open){ g.fillStyle=css('--soft'); g.fill(); g.strokeStyle=c; g.lineWidth=2; g.stroke(); } else { g.fillStyle=c; g.fill(); }
      if (p.label){ g.fillStyle=c; g.fillText(p.label, X(p.x)+8, Y(p.y)-8); } });
  }

  const draws = {}, EX = {}, NAMES = {}, order = [];

  /* ---------------- ricette a passi ---------------- */
  document.querySelectorAll('[data-recipe]').forEach(box => {
    const steps = [...box.querySelectorAll('.step')], sec = box.closest('section');
    let shown = 1;
    sec.querySelector('[data-next]').onclick = () => { if (shown < steps.length){ steps[shown].hidden=false; steps[shown].classList.add('reveal'); shown++; } };
    sec.querySelector('[data-reset]').onclick = () => { steps.forEach((s,i)=>s.hidden=i>0); shown=1; };
  });

  /* ---------------- lettura risposte ---------------- */
  function num(s){
    let v = String(s).trim().toLowerCase().replace(/\s/g,'').replace(',', '.').replace('−','-');
    if (v==='') return NaN;
    if (/^\+?(inf|infinito|∞|\+inf)$/.test(v)) return Infinity;
    if (/^-(inf|infinito|∞)$/.test(v)) return -Infinity;
    if (/^-?\d+(\.\d+)?\/\d+(\.\d+)?$/.test(v)){ const [a,b]=v.split('/'); return +a/+b; }
    return Number(v);
  }
  // risposte non intere: va bene anche il decimale arrotondato a 2 cifre (0,33 per 1/3)
  const same = (a,b) => (a===b) || (isFinite(a) && isFinite(b) && (Math.abs(a-b) < 1e-6 || (!Number.isInteger(b) && Math.abs(a-b) <= 0.006*Math.max(1,Math.abs(b)))));
  const say = (el, ok, txt) => { el.textContent = txt; el.className = 'feedback '+(ok?'ok':'bad'); };

  /* ---------------- esercizi guidati ---------------- */
  // step: {h, html, type:'nums'|'choice'|'num', ans, opts, ok, bad}
  function guided(ch, key, steps, done){
    const box = $('guided-'+ch), res = store.get(key);
    const els = steps.map((s,i) => {
      const d = document.createElement('div'); d.className = 'step'; d.hidden = i>0;
      let body = '';
      if (s.type==='choice') body = '<div class="choice">'+s.opts.map((o,j)=>'<button data-j="'+j+'">'+o+'</button>').join('')+'</div>';
      else body = '<div class="math left">'+s.html+'</div><div class="row"><button data-check>Controlla</button></div>';
      d.innerHTML = '<h3>'+s.h+'</h3>'+(s.type==='choice' && s.html ? '<div class="math left">'+s.html+'</div>' : '')+body+'<span class="feedback"></span>';
      box.appendChild(d); return d;
    });
    const fin = document.createElement('div'); fin.className = 'note reveal'; fin.hidden = true; fin.innerHTML = done; box.appendChild(fin);
    const id = i => 'g'+(i+1);
    const pass = i => { res[id(i)] = res[id(i)]==='errore' ? 'ok-dopo' : (res[id(i)]||'ok'); store.set(key,res); if (i+1<els.length) els[i+1].hidden=false; else { fin.hidden=false; res.done=true; store.set(key,res); requestAnimationFrame(()=>draws[ch] && draws[ch]()); markDone(ch); } };
    const fail = i => { if (!/^ok/.test(res[id(i)]||'')) res[id(i)]='errore'; store.set(key,res); };
    steps.forEach((s,i) => {
      const d = els[i], fb = d.querySelector('.feedback');
      if (s.type==='choice'){
        d.querySelectorAll('[data-j]').forEach(b => b.onclick = () => {
          d.querySelectorAll('[data-j]').forEach(x=>x.classList.remove('right','wrong'));
          if (+b.dataset.j===s.ans){ b.classList.add('right'); say(fb,true,s.ok); pass(i); } else { b.classList.add('wrong'); say(fb,false,s.bad); fail(i); }
        });
      } else {
        d.querySelector('[data-check]').onclick = () => {
          const ins = [...d.querySelectorAll('input')], vals = ins.map(x=>num(x.value));
          const ans = Array.isArray(s.ans) ? s.ans : [s.ans];
          if (vals.every((v,k)=>same(v,ans[k]))){ say(fb,true,s.ok); pass(i); } else { say(fb,false,s.bad); fail(i); }
        };
      }
      if (/^ok/.test(res[id(i)]||'')){ if (i+1<els.length) els[i+1].hidden=false; else { fin.hidden=false; res.done=true; store.set(key,res); } }
    });
  }
  const inp = (lbl, w) => '<input type="text" inputmode="decimal" aria-label="'+lbl+'"'+(w?' style="width:'+w+'"':'')+'>';
  // svolgimento completo: ogni riga = cosa faccio + formula
  const SV = (...r) => '<b>Svolgimento passo passo</b><ol class="sv">'+r.map(x=>'<li>'+x+'</li>').join('')+'</ol>';
  const R = (idx, inner) => '<span class="rt"><sup>'+idx+'</sup>√<span class="ov">'+inner+'</span></span>';

  /* ---------------- videolezione ---------------- */
  // scenes: [{show: html sulla lavagna, say: testo letto dalla voce (parole, niente simboli)}]
  function video(ch, scenes){
    const box = $('video-'+ch); if (!box) return;
    box.className = 'video';
    box.innerHTML = '<div class="vboard" aria-live="polite"></div><p class="vsub"></p>'
      + '<div class="row vctl"><button data-vb aria-label="Passo indietro">⟨ Indietro</button><button class="primary" data-vp>▶ Avvia</button><button data-vn aria-label="Passo avanti">Avanti ⟩</button></div>'
      + '<div class="controls"><span class="vcount"></span><label>Voce <input type="checkbox" data-vv checked></label>'
      + '<label>Velocità <select data-vs><option value="0.85">lenta</option><option value="1" selected>normale</option><option value="1.15">veloce</option></select></label></div>';
    const board = box.querySelector('.vboard'), sub = box.querySelector('.vsub'), cnt = box.querySelector('.vcount');
    const bP = box.querySelector('[data-vp]'), vv = box.querySelector('[data-vv]'), vs = box.querySelector('[data-vs]');
    const synth = window.speechSynthesis;
    let i = -1, playing = false, timer = null, token = 0;
    const voice = () => { try { const v = synth.getVoices(); return v.find(x=>/^it/i.test(x.lang)) || null; } catch(e){ return null; } };
    if (!synth) { vv.checked = false; vv.disabled = true; }
    const stop = () => { token++; clearTimeout(timer); try { synth && synth.cancel(); } catch(e){} };
    const render = () => {
      board.innerHTML = scenes.slice(0, i+1).map((sc,k)=>'<div class="vstep'+(k===i?' cur':'')+'">'+sc.show+'</div>').join('') || '<p class="vhint">Premi ▶ Avvia: ogni calcolo compare uno alla volta e la voce lo spiega. Puoi fermarti e tornare indietro quando vuoi.</p>';
      sub.textContent = i>=0 ? scenes[i].say : '';
      cnt.textContent = 'Passo '+Math.max(0,i+1)+' di '+scenes.length;
      const cur = board.querySelector('.cur'); if (cur) board.scrollTop = cur.offsetTop - board.offsetTop - 8;
    };
    const after = (t) => { if (!playing || t!==token) return; if (i < scenes.length-1) { timer = setTimeout(()=>{ if (t===token) { i++; render(); speak(); } }, 700); } else { playing = false; bP.textContent = '↺ Ricomincia'; } };
    const speak = () => {
      const t = ++token, txt = scenes[i].say, rate = +vs.value;
      if (vv.checked && synth){
        try { synth.cancel(); const u = new SpeechSynthesisUtterance(txt); u.lang = 'it-IT'; u.rate = rate; const v = voice(); if (v) u.voice = v;
          const t0 = Date.now(), minT = txt.length*55/rate; const done = () => { const left = minT - (Date.now()-t0); if (left > 300) timer = setTimeout(()=>after(t), left); else after(t); };
          u.onend = done; u.onerror = done; synth.speak(u);
          // rete di sicurezza: se la voce non parte, vado avanti a tempo
          timer = setTimeout(()=>{ if (t===token && !synth.speaking) after(t); }, 1500 + txt.length*90/rate);
        } catch(e){ timer = setTimeout(()=>after(t), 1200 + txt.length*60/rate); }
      } else timer = setTimeout(()=>after(t), 1200 + txt.length*60/rate);
    };
    bP.onclick = () => {
      if (playing){ playing = false; stop(); bP.textContent = '▶ Continua'; return; }
      if (i >= scenes.length-1) i = -1;
      playing = true; bP.textContent = '⏸ Pausa';
      if (i < 0) i = 0; render(); speak();
    };
    box.querySelector('[data-vn]').onclick = () => { if (i < scenes.length-1){ stop(); i++; render(); if (playing) speak(); else if (vv.checked) { playing = false; speakOnce(); } } };
    box.querySelector('[data-vb]').onclick = () => { if (i > 0){ stop(); i--; render(); if (playing) speak(); else if (vv.checked) speakOnce(); } };
    const speakOnce = () => { if (!synth) return; try { synth.cancel(); const u = new SpeechSynthesisUtterance(scenes[i].say); u.lang='it-IT'; u.rate=+vs.value; const v=voice(); if (v) u.voice=v; synth.speak(u); } catch(e){} };
    vv.onchange = () => { if (!vv.checked) { try { synth && synth.cancel(); } catch(e){} } };
    window.addEventListener('hashchange', () => { if (playing){ playing=false; stop(); bP.textContent='▶ Continua'; } });
    render();
  }

  /* ---------------- esercizi da solo ---------------- */
  // e: {id, q, type:'num'|'exp'|'choice', a, opts, hint, sol, lbl (etichetta della casella, default 'limite')}
  function exercises(ch, key, list){
    const box = $('ex-'+ch), res = store.get(key);
    list.forEach((e,i) => {
      const d = document.createElement('div'); d.className = 'ex';
      let ans;
      if (e.type==='choice') ans = '<div class="choice">'+e.opts.map((o,j)=>'<button data-j="'+j+'">'+o+'</button>').join('')+'</div>';
      else ans = '<div class="row">'+(e.type==='exp' ? 'limite = e<sup>'+inp('esponente','3.5em')+'</sup>' : (e.lbl||'limite')+' = '+inp('risultato'))+'<button data-c>Controlla</button></div>';
      d.innerHTML = '<div class="head"><b>Esercizio '+(i+1)+'</b><span class="badge"></span></div><div class="math left">'+e.q+'</div>'+ans
        +'<div class="row"><button data-h>Aiuto</button><button data-s>Soluzione</button></div><span class="feedback"></span>'
        +'<p class="note" data-hint hidden>'+e.hint+'</p><div class="note" data-sol hidden>'+e.sol+'</div>';
      box.appendChild(d);
      const fb = d.querySelector('.feedback'), bd = d.querySelector('.badge');
      const badge = () => { const r=res[e.id];
        if (r==='ok'){ bd.textContent='giusto al primo colpo'; bd.className='badge done'; }
        else if (r==='ok-dopo'){ bd.textContent='giusto dopo errore o aiuto'; bd.className='badge done'; }
        else if (r==='errore'){ bd.textContent='da rifare'; bd.className='badge'; }
        else if (r==='soluzione vista'){ bd.textContent='soluzione vista'; bd.className='badge'; }
        else { bd.textContent='da fare'; bd.className='badge'; } };
      badge();
      const right = () => { res[e.id] = (res[e.id]==='errore' || res[e.id]==='soluzione vista' || res[e.id+'_aiuto']) ? 'ok-dopo' : (res[e.id]||'ok'); say(fb,true,'Giusto!'); store.set(key,res); badge(); };
      const wrong = msg => { if (!/^ok/.test(res[e.id]||'')) res[e.id]='errore'; say(fb,false,msg); store.set(key,res); badge(); };
      if (e.type==='choice'){
        d.querySelectorAll('[data-j]').forEach(b => b.onclick = () => {
          d.querySelectorAll('[data-j]').forEach(x=>x.classList.remove('right','wrong'));
          if (+b.dataset.j===e.a){ b.classList.add('right'); right(); } else { b.classList.add('wrong'); wrong('Non è questa. Prova con l\'aiuto.'); }
        });
      } else {
        d.querySelector('[data-c]').onclick = () => { const v = num(d.querySelector('input').value);
          if (isNaN(v)) { say(fb,false,'Scrivi un numero (per +∞ scrivi inf).'); return; }
          same(v,e.a) ? right() : wrong('Non è questo. Prova con l\'aiuto.'); };
      }
      d.querySelector('[data-h]').onclick = () => { d.querySelector('[data-hint]').hidden=false; res[e.id+'_aiuto']=true; store.set(key,res); };
      d.querySelector('[data-s]').onclick = () => { d.querySelector('[data-sol]').hidden=false; if (!/^ok/.test(res[e.id]||'')){ res[e.id]='soluzione vista'; store.set(key,res); badge(); } };
    });
  }

