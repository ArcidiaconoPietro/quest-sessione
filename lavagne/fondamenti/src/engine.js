/* Motore della Lavagna di Fondamenti.
   Ogni capitolo è un oggetto in CH (vedi capitoli/*.js). Questo file lo disegna:
   a cosa serve → idea → codice passo passo (tracer) → ricetta → perché delle regole → attenzione
   → esercizio guidato → esercizi da solo → quaderno + copia risultati. */
(function(){
  const $ = id => document.getElementById(id);
  const esc = s => String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  const store = {
    get(k){ try { return JSON.parse(localStorage.getItem(k)) || {}; } catch(e){ return {}; } },
    set(k,v){ try { localStorage.setItem(k, JSON.stringify(v)); } catch(e){} }
  };
  const say = (el, ok, txt) => { el.innerHTML = txt; el.className = 'feedback '+(ok?'ok':'bad'); };
  const norm = s => String(s).toLowerCase().replace(/\s+/g,'').replace(/[“”]/g,'"').replace(/[‘’]/g,"'").replace(/,/g,'.');
  const normOut = s => String(s).replace(/\r/g,'').split('\n').map(x=>x.replace(/\s+$/,'').replace(/^\s+/,'')).join('\n').replace(/\n+$/,'').replace(/^\n+/,'');
  const plain = h => { const t=document.createElement('div'); t.innerHTML=h; return t.textContent.replace(/\s+/g,' ').trim(); };
  const CH = window.CH;
  const key = id => 'lavagna-fond-'+id;

  function board(eyebrow, title, inner){
    const s = document.createElement('section'); s.className = 'board';
    s.innerHTML = (eyebrow?'<div class="eyebrow">'+eyebrow+'</div>':'')+(title?'<h2>'+title+'</h2>':'')+(inner||'');
    return s;
  }

  /* ---------- tracer ---------- */
  function tracer(t){
    const s = board(t.eyebrow || 'Il codice si esegue passo passo', t.title || '', (t.intro?'<p>'+t.intro+'</p>':''));
    const lines = t.code.replace(/^\n/,'').replace(/\s+$/,'').split('\n');
    const wrap = document.createElement('div'); wrap.className = 'tracer';
    wrap.innerHTML = '<div class="src">'+lines.map((l,i)=>'<span class="ln" data-l="'+(i+1)+'"><i>'+(i+1)+'</i>'+(esc(l)||' ')+'</span>').join('')+'</div>'
      + '<div class="side"><div class="panel"><div class="lab">Memoria</div><div data-mem></div></div>'
      + '<div class="panel"><div class="lab">Stampa sullo schermo</div><div class="outbox" data-out></div></div></div>';
    s.appendChild(wrap);
    const sayEl = document.createElement('p'); sayEl.className = 'say note'; s.appendChild(sayEl);
    const ctr = document.createElement('div'); ctr.className = 'row';
    ctr.innerHTML = '<button data-prev>← Indietro</button><button class="primary" data-nxt>Avanti →</button><button data-rst>Ricomincia</button><span class="badge" data-cnt></span>';
    s.appendChild(ctr);
    let k = 0;
    const frames = st => st.f || (st.v ? [['main', st.v]] : []);
    const flat = st => { const o={}; frames(st).forEach(([fn,vs],i)=>Object.keys(vs).forEach(n=>o[i+'|'+fn+'|'+n]=vs[n])); return o; };
    function render(){
      const st = t.steps[k], prev = k>0 ? flat(t.steps[k-1]) : {};
      wrap.querySelectorAll('.ln').forEach(el => el.classList.toggle('on', +el.dataset.l === st.l));
      const fr = frames(st);
      let mem = fr.length ? fr.map(([fn,vs],i) => '<div class="frame'+(i===fr.length-1?' top':'')+'"><div class="fn">'+esc(fn)+'</div>'
        + (Object.keys(vs).length ? Object.keys(vs).map(n => { const ch = k>0 && prev[i+'|'+fn+'|'+n] !== vs[n];
            const m = /^(.*?)\s*@(\S+)$/.exec(n); const nm = m?m[1]:n, ad = m?'<span class="a">indirizzo '+m[2]+'</span>':'';
            return '<div class="var"><span class="n">'+esc(nm)+'</span><span class="v'+(ch?' chg':'')+'">'+esc(vs[n])+'</span>'+ad+'</div>'; }).join('')
          : '<div class="var"><span class="n">(nessuna variabile)</span></div>')
        + '</div>').join('') : '<div class="var"><span class="n">(vuota)</span></div>';
      if (st.list) mem += Object.keys(st.list).map(n => '<div class="frame"><div class="fn">lista '+esc(n)+'</div><div class="lst">'
          + st.list[n].map(x=>'<span class="cell">'+esc(x)+'</span><span class="arr">→</span>').join('')+'<span class="nil">NULL</span></div></div>').join('');
      if (st.arr) mem += st.arr.map(a => '<div class="frame"><div class="fn">'+esc(a.n)+'</div><div class="arrv">'
          + a.v.map((x,i)=>'<span'+((a.hl||[]).includes(i)?' class="hl"':'')+'>'+esc(x)+'<small>['+i+']</small></span>').join('')+'</div></div>').join('');
      if (st.heap) mem += '<div class="frame"><div class="fn">heap (memoria presa con malloc)</div>'+Object.keys(st.heap).map(n=>'<div class="var"><span class="n">'+esc(n)+'</span><span class="v">'+esc(st.heap[n])+'</span></div>').join('')+'</div>';
      wrap.querySelector('[data-mem]').innerHTML = mem;
      wrap.querySelector('[data-out]').textContent = st.out || '';
      sayEl.innerHTML = st.say || '';
      ctr.querySelector('[data-cnt]').textContent = 'passo '+(k+1)+' di '+t.steps.length;
      ctr.querySelector('[data-prev]').disabled = k===0;
      ctr.querySelector('[data-nxt]').disabled = k===t.steps.length-1;
    }
    ctr.querySelector('[data-prev]').onclick = () => { if (k>0){ k--; render(); } };
    ctr.querySelector('[data-nxt]').onclick = () => { if (k<t.steps.length-1){ k++; render(); } };
    ctr.querySelector('[data-rst]').onclick = () => { k=0; render(); };
    render();
    return s;
  }

  /* ---------- complemento a 2: 8 interruttori ---------- */
  function bits(w){
    const s = board(w.eyebrow || 'Prova tu', w.title || '8 interruttori', (w.intro?'<p>'+w.intro+'</p>':''));
    const W = [-128,64,32,16,8,4,2,1];
    const b = [0,0,0,0,0,0,0,0];
    const grid = document.createElement('div'); grid.className = 'bits';
    grid.innerHTML = W.map((w,i)=>'<div><button id="bit'+i+'" aria-label="bit di peso '+w+'">0</button><small'+(i===0?' class="neg"':'')+'>'+w+'</small></div>').join('');
    s.appendChild(grid);
    const out = document.createElement('p'); out.className = 'readout'; s.appendChild(out);
    const row = document.createElement('div'); row.className = 'row';
    row.innerHTML = '<label for="c2in">Scrivi un numero tra −128 e 127:</label><input type="text" id="c2in" inputmode="numeric" style="width:6em"><button data-go>Mostra in binario</button>';
    s.appendChild(row);
    const how = document.createElement('div'); how.className = 'note'; how.hidden = true; s.appendChild(how);
    function draw(){
      b.forEach((x,i)=>{ const el=grid.querySelector('#bit'+i); el.textContent=x; el.classList.toggle('one', !!x); });
      const v = b.reduce((a,x,i)=>a+x*W[i],0);
      out.innerHTML = 'Bit: <b class="mono">'+b.join('')+'</b> → valore <b>'+v+'</b> = '+(b.some(x=>x)?b.map((x,i)=>x?'('+W[i]+')':null).filter(Boolean).join(' + '):'0');
    }
    grid.querySelectorAll('button').forEach((el,i)=>el.onclick=()=>{ b[i]=1-b[i]; how.hidden=true; draw(); });
    row.querySelector('[data-go]').onclick = () => {
      const n = parseInt(String(row.querySelector('#c2in').value).replace('−','-'),10);
      if (isNaN(n) || n<-128 || n>127){ how.hidden=false; how.innerHTML='Con 8 bit in complemento a 2 si va da −128 a 127. Scrivi un numero in questo intervallo.'; return; }
      const bin = x => x.toString(2).padStart(8,'0');
      if (n>=0){ how.innerHTML = n+' è positivo: si scrive in binario normale su 8 bit → <b class="mono">'+bin(n)+'</b>.'; }
      else { const m=-n, p=bin(m), inv=p.split('').map(c=>c==='0'?'1':'0').join(''), r=bin(256+n);
        how.innerHTML = n+' è negativo. Ricetta:<br>1) scrivo '+m+' in binario: <span class="mono">'+p+'</span><br>2) inverto tutti i bit: <span class="mono">'+inv+'</span><br>3) aggiungo 1: <b class="mono">'+r+'</b>'; }
      how.hidden=false;
      bin(n<0?256+n:n).split('').forEach((c,i)=>b[i]=+c); draw();
    };
    draw();
    return s;
  }

  /* ---------- ricetta a passi ---------- */
  function recipe(r){
    const s = board(r.eyebrow || 'La ricetta, un passo alla volta', r.title, (r.intro?'<p>'+r.intro+'</p>':''));
    const box = document.createElement('div'); box.className='steps';
    box.innerHTML = r.steps.map((st,i)=>'<div class="step"'+(i?' hidden':'')+'><h3>Passo '+(i+1)+' · '+st.h+'</h3>'+st.html+'</div>').join('');
    s.appendChild(box);
    const row = document.createElement('div'); row.className='row';
    row.innerHTML = '<button class="primary" data-n>Passo successivo</button><button data-r>Ricomincia</button>'; s.appendChild(row);
    const els = [...box.children]; let shown = 1;
    row.querySelector('[data-n]').onclick = () => { if (shown<els.length){ els[shown].hidden=false; els[shown].classList.add('reveal'); shown++; } };
    row.querySelector('[data-r]').onclick = () => { els.forEach((e,i)=>e.hidden=i>0); shown=1; };
    return s;
  }

  /* ---------- perché delle regole ---------- */
  function why(list){
    const s = board('Il perché delle regole', 'Da capire o da imparare a memoria?',
      '<p>Per ogni regola ti dico se il motivo è <span class="tag easy">facile da capire</span> (e allora te lo spiego) oppure <span class="tag memo">a memoria</span> (il motivo è lungo o non serve: segnatela e basta).</p>');
    const d = document.createElement('div'); d.className='why';
    d.innerHTML = list.map(w=>'<div class="item"><span class="tag '+(w.easy?'easy':'memo')+'">'+(w.easy?'facile da capire':'a memoria')+'</span><div><b>'+w.f+'</b><br>'+w.t+'</div></div>').join('');
    s.appendChild(d); return s;
  }

  /* ---------- esercizio guidato ---------- */
  function guided(ch, g){
    const s = board('Tocca a te · esercizio guidato', g.title, (g.intro||''));
    const box = document.createElement('div'); box.className='steps'; s.appendChild(box);
    const res = store.get(key(ch.id));
    const els = g.steps.map((st,i)=>{
      const d = document.createElement('div'); d.className='step'; d.hidden = i>0;
      let body = st.html ? '<div>'+st.html+'</div>' : '';
      if (st.type==='choice') body += '<div class="choice">'+st.opts.map((o,j)=>'<button data-j="'+j+'">'+o+'</button>').join('')+'</div>';
      else body += '<div class="row"><input type="text" id="g-'+ch.id+'-'+i+'" aria-label="risposta"><button data-c>Controlla</button></div>';
      d.innerHTML = '<h3>Passo '+(i+1)+' · '+st.h+'</h3>'+body+'<span class="feedback"></span>';
      box.appendChild(d); return d;
    });
    const fin = document.createElement('div'); fin.className='note reveal'; fin.hidden=true; fin.innerHTML=g.done; box.appendChild(fin);
    const id = i => 'g'+(i+1);
    const pass = i => { res[id(i)] = res[id(i)]==='errore' ? 'ok-dopo' : (res[id(i)]||'ok'); store.set(key(ch.id),res); if (i+1<els.length) els[i+1].hidden=false; else fin.hidden=false; nav(); };
    const fail = i => { if (!/^ok/.test(res[id(i)]||'')) res[id(i)]='errore'; store.set(key(ch.id),res); };
    g.steps.forEach((st,i)=>{
      const d = els[i], fb = d.querySelector('.feedback');
      if (st.type==='choice') d.querySelectorAll('[data-j]').forEach(b=>b.onclick=()=>{
        d.querySelectorAll('[data-j]').forEach(x=>x.classList.remove('right','wrong'));
        if (+b.dataset.j===st.ans){ b.classList.add('right'); say(fb,true,st.ok); pass(i); } else { b.classList.add('wrong'); say(fb,false,st.bad); fail(i); }
      });
      else d.querySelector('[data-c]').onclick = () => {
        const v = norm(d.querySelector('input').value), ans = [].concat(st.ans).map(norm);
        if (ans.includes(v)){ say(fb,true,st.ok); pass(i); } else { say(fb,false,st.bad); fail(i); }
      };
      if (/^ok/.test(res[id(i)]||'')){ if (i+1<els.length) els[i+1].hidden=false; else fin.hidden=false; }
    });
    return s;
  }

  /* ---------- esercizi da solo ---------- */
  const LAB = { ok:'giusto al primo colpo', 'ok-dopo':'giusto dopo errore o aiuto', errore:'sbagliato', 'soluzione vista':'guardato la soluzione',
    'auto-ok':'fatto giusto (detto da Pietro)', 'auto-no':'sbagliato (detto da Pietro)' };
  function exercises(ch){
    const s = board('Esercizi da solo', ch.exTitle || 'Adesso senza aiuti', '<p>'+(ch.exIntro || 'Prova prima da solo, su carta come all\'esame. Se ti blocchi apri l\'aiuto, poi la soluzione.')+'</p>');
    const res = store.get(key(ch.id));
    ch.ex.forEach((e,i)=>{
      const d = document.createElement('div'); d.className='ex';
      let ans = '';
      if (e.type==='choice') ans = '<div class="choice">'+e.opts.map((o,j)=>'<button data-j="'+j+'">'+o+'</button>').join('')+'</div>';
      else if (e.type==='text') ans = '<div class="row"><input type="text" id="x-'+ch.id+'-'+e.id+'" aria-label="risposta"><button data-c>Controlla</button></div>';
      else if (e.type==='out') ans = '<label for="x-'+ch.id+'-'+e.id+'" class="eyebrow">Scrivi esattamente cosa stampa, una riga per riga</label><textarea id="x-'+ch.id+'-'+e.id+'"></textarea><div class="row"><button data-c>Controlla</button></div>';
      else if (e.type==='code') ans = '<label for="x-'+ch.id+'-'+e.id+'" class="eyebrow">Scrivi qui (o sul quaderno / al PC), poi confronta con la soluzione</label><textarea id="x-'+ch.id+'-'+e.id+'" style="min-height:8em"></textarea>';
      d.innerHTML = '<div class="head"><b>Esercizio '+(i+1)+(e.tag?' · '+e.tag:'')+'</b><span class="badge"></span></div><div>'+e.q+'</div>'+ans
        + '<div class="row">'+(e.hint?'<button data-h>Aiuto</button>':'')+'<button data-s>Soluzione</button></div><span class="feedback"></span>'
        + (e.hint?'<div class="note" data-hint hidden>'+e.hint+'</div>':'')+'<div class="note" data-sol hidden>'+e.sol
        + (e.type==='code'?'<div class="row" style="margin-top:10px"><button data-ao>L\'avevo fatto giusto</button><button data-an>Avevo sbagliato o non ci sono riuscito</button></div>':'')+'</div>';
      s.appendChild(d);
      const fb = d.querySelector('.feedback'), bd = d.querySelector('.badge');
      const badge = () => { const r=res[e.id]; bd.textContent = LAB[r] || 'da fare';
        bd.className = 'badge'+(/^ok|auto-ok/.test(r||'')?' done':(r==='errore'||r==='auto-no')?' bad':''); };
      badge();
      const right = () => { res[e.id] = (res[e.id]==='errore'||res[e.id]==='soluzione vista'||res[e.id+'_aiuto']) ? 'ok-dopo' : (res[e.id]||'ok'); say(fb,true,'Giusto!'); store.set(key(ch.id),res); badge(); nav(); };
      const wrong = msg => { if (!/^ok/.test(res[e.id]||'')) res[e.id]='errore'; say(fb,false,msg); store.set(key(ch.id),res); badge(); };
      if (e.type==='choice') d.querySelectorAll('[data-j]').forEach(b=>b.onclick=()=>{
        d.querySelectorAll('[data-j]').forEach(x=>x.classList.remove('right','wrong'));
        if (+b.dataset.j===e.a){ b.classList.add('right'); right(); } else { b.classList.add('wrong'); wrong('Non è questa. Prova con l\'aiuto.'); }
      });
      if (e.type==='text') d.querySelector('[data-c]').onclick = () => { const v=norm(d.querySelector('input').value);
        if (!v){ say(fb,false,'Scrivi una risposta.'); return; } [].concat(e.a).map(norm).includes(v) ? right() : wrong('Non è questo. Prova con l\'aiuto.'); };
      if (e.type==='out') d.querySelector('[data-c]').onclick = () => { const v=normOut(d.querySelector('textarea').value);
        if (!v){ say(fb,false,'Scrivi cosa stampa.'); return; } v===normOut(e.a) ? right() : wrong('Non torna, almeno una riga è diversa. Controlla spazi e a capo, poi prova con l\'aiuto.'); };
      if (e.hint) d.querySelector('[data-h]').onclick = () => { d.querySelector('[data-hint]').hidden=false; res[e.id+'_aiuto']=true; store.set(key(ch.id),res); };
      d.querySelector('[data-s]').onclick = () => { d.querySelector('[data-sol]').hidden=false;
        if (e.type!=='code' && !/^ok/.test(res[e.id]||'')){ res[e.id]='soluzione vista'; store.set(key(ch.id),res); badge(); } };
      if (e.type==='code'){
        d.querySelector('[data-ao]').onclick = () => { res[e.id]='auto-ok'; store.set(key(ch.id),res); badge(); nav(); };
        d.querySelector('[data-an]').onclick = () => { res[e.id]='auto-no'; store.set(key(ch.id),res); badge(); nav(); };
      }
    });
    return s;
  }

  /* ---------- quaderno + copia ---------- */
  function notebook(ch){
    const s = board('Sul quaderno (e nella cartella RACCOLTA_C)', 'Da scrivere a mano', '<ul class="recap">'+ch.quaderno.map(x=>'<li>'+x+'</li>').join('')+'</ul>');
    const box = document.createElement('div');
    box.innerHTML = '<div class="row"><button class="primary">Copia i miei risultati per il tutor</button><span class="feedback"></span></div><textarea hidden readonly style="margin-top:8px;min-height:120px"></textarea>';
    s.appendChild(box);
    const btn = box.querySelector('button'), fb = box.querySelector('.feedback'), ta = box.querySelector('textarea');
    btn.onclick = () => {
      const res = store.get(key(ch.id)), lines = ['Lavagna Fondamenti, capitolo '+ch.n+' '+plain(ch.short)+':'];
      Object.keys(res).filter(k=>/^g\d+$/.test(k)).sort().forEach(k=>lines.push('Guidato passo '+k.slice(1)+': '+(LAB[res[k]]||res[k])));
      ch.ex.forEach((e,i)=>lines.push('Esercizio '+(i+1)+' ('+plain(e.q).slice(0,70)+'): '+(LAB[res[e.id]]||'non fatto')+(res[e.id+'_aiuto']?', aperto aiuto':'')));
      const txt = lines.join('\n'); ta.value = txt;
      const fallback = () => { ta.hidden=false; ta.select(); say(fb,true,'Seleziona il testo qui sotto e incollalo nella chat del tutor.'); };
      try { navigator.clipboard.writeText(txt).then(()=>say(fb,true,'Copiato: incollalo nella chat del tutor di Fondamenti.'), fallback); } catch(e){ fallback(); }
    };
    return s;
  }

  /* ---------- montaggio del capitolo ---------- */
  function build(ch){
    const m = $('main'); m.innerHTML = '';
    const head = board('Capitolo '+ch.n+' · '+ch.when, ch.title, ch.serve + (ch.exam?'<div class="exam"><b>All\'esame:</b> '+ch.exam+'</div>':''));
    m.appendChild(head);
    if (ch.idea) m.appendChild(board('L\'idea in una immagine', ch.idea.title, ch.idea.html));
    (ch.widgets||[]).forEach(w => {
      if (w.type==='tracer') m.appendChild(tracer(w));
      else if (w.type==='bits') m.appendChild(bits(w));
      else if (w.type==='recipe') m.appendChild(recipe(w));
      else if (w.type==='html') { const s=board(w.eyebrow, w.title, w.html); m.appendChild(s); if (w.init) w.init(s); }
    });
    if (ch.why) m.appendChild(why(ch.why));
    if (ch.warn) m.appendChild(board('Attenzione', ch.warn.title, '<div class="warn">'+ch.warn.html+'</div>'));
    if (ch.guided) m.appendChild(guided(ch, ch.guided));
    if (ch.ex) m.appendChild(exercises(ch));
    if (ch.quaderno) m.appendChild(notebook(ch));
    const i = CH.indexOf(ch);
    if (i < CH.length-1){ const nx = document.createElement('div'); nx.className='next';
      nx.innerHTML = '<a href="#'+CH[i+1].id+'"><button class="primary" tabindex="-1">Capitolo '+CH[i+1].n+': '+plain(CH[i+1].short)+' →</button></a>'; m.appendChild(nx); }
  }

  function done(ch){ const r = store.get(key(ch.id)); return ch.ex && ch.ex.every(e=>/^ok|auto-ok/.test(r[e.id]||'')); }
  function nav(){
    const cur = current();
    $('nav').innerHTML = CH.map(c=>'<a href="#'+c.id+'" class="'+(c.id===cur?'on':'')+'">'+(done(c)?'<span class="tick">✓</span> ':'')+c.n+' · '+c.short+'</a>').join('');
  }
  function current(){ const h=(location.hash||'').slice(1); return CH.some(c=>c.id===h) ? h : CH[0].id; }
  function show(){ const ch = CH.find(c=>c.id===current()); build(ch); nav(); }
  window.addEventListener('hashchange', () => { show(); window.scrollTo(0,0); });
  show();
})();
