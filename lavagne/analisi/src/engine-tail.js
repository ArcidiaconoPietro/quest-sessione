  Object.keys(EX).forEach(ch => exercises(ch, 'lavagna-'+ch, EX[ch]));

  /* ---------------- copia risultati per il tutor ---------------- */
  const LAB = { ok:'giusto', 'ok-dopo':'giusto dopo errore o aiuto', errore:'sbagliato', 'soluzione vista':'guardato la soluzione' };
  const plain = h => { const t=document.createElement('div'); t.innerHTML=h; return t.textContent.replace(/\s+/g,' ').trim(); };
  document.querySelectorAll('[data-copy]').forEach(box => {
    const ch = box.dataset.copy;
    box.innerHTML = '<div class="row"><button>Copia i miei risultati per il tutor</button><span class="feedback"></span></div><textarea hidden readonly style="width:100%;min-height:110px;font:inherit;margin-top:8px"></textarea>';
    const btn = box.querySelector('button'), fb = box.querySelector('.feedback'), ta = box.querySelector('textarea');
    btn.onclick = () => {
      const res = store.get('lavagna-'+ch), lines = ['Lavagna Analisi, capitolo '+NAMES[ch]+':'];
      Object.keys(res).filter(k=>/^g\d+$/.test(k)).sort().forEach(k => lines.push('Guidato passo '+k.slice(1)+': '+(LAB[res[k]]||res[k])));
      EX[ch].forEach((e,i) => lines.push('Esercizio '+(i+1)+' ('+plain(e.q)+'): '+(LAB[res[e.id]]||'non fatto')+(res[e.id+'_aiuto']?', aperto aiuto':'')));
      const txt = lines.join('\n'); ta.value = txt;
      const fallback = () => { ta.hidden=false; ta.select(); say(fb,true,'Seleziona il testo qui sotto e copialo nella chat.'); };
      try { navigator.clipboard.writeText(txt).then(()=>say(fb,true,'Copiato: incollalo nella chat del tutor.'), fallback); } catch(e){ fallback(); }
    };
  });

  /* ---------------- capitoli (navigazione) ---------------- */
  document.querySelectorAll('.chapter').forEach((c,i) => {
    if (i < order.length-1){ const nx=document.createElement('div'); nx.className='next';
      nx.innerHTML='<a href="#'+order[i+1]+'"><button class="primary" tabindex="-1">Capitolo successivo: '+NAMES[order[i+1]].slice(2)+' →</button></a>'; c.appendChild(nx); }
  });
  function show(){
    let ch = (location.hash||'').slice(1); if (!order.includes(ch)) ch = order[0];
    document.querySelectorAll('.chapter').forEach(c => c.hidden = c.dataset.ch !== ch);
    document.querySelectorAll('#nav a').forEach(a => a.classList.toggle('on', a.dataset.ch === ch));
    requestAnimationFrame(() => draws[ch] && draws[ch]());
  }
  window.addEventListener('hashchange', () => { show(); window.scrollTo(0,0); });
  const redraw = () => { const c = document.querySelector('.chapter:not([hidden])'); if (c && draws[c.dataset.ch]) draws[c.dataset.ch](); };
  window.addEventListener('resize', redraw);
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener?.('change', redraw);
  new MutationObserver(redraw).observe(document.documentElement, {attributes:true, attributeFilter:['data-theme']});
  order.forEach(markDone);
  show();
})();
