  /* ===== capitolo 12: Studio di funzione ===== */
  order.push('studio-funzione'); NAMES['studio-funzione'] = '12 Studio di funzione';
  const SF = [
    { f:x=>x*x*x-3*x, xr:[-3,3], yr:[-5,5], excl:[], asy:[], ext:[{x:-1,y:2,label:'max'},{x:1,y:-2,label:'min'}], fl:[{x:0,y:0,label:'flesso'}],
      sign:x=>x*x*x-3*x, zeros:[-Math.sqrt(3),0,Math.sqrt(3)],
      t:['<b>Dominio:</b> tutto ℝ (è un polinomio). È dispari: f(−x) = −f(x), quindi simmetrica rispetto all\'origine.',
         '<b>Segno:</b> x³ − 3x = x(x² − 3) &gt; 0 per −√3 &lt; x &lt; 0 e per x &gt; √3. Zone verdi: sopra l\'asse; zone rosse: sotto. Tocca l\'asse in −√3, 0, √3.',
         '<b>Limiti:</b> '+LIMX('+∞')+' f(x) = +∞, '+LIMX('−∞')+' f(x) = −∞. Niente asintoti (un polinomio di grado 3 non ha nemmeno l\'obliquo: f(x)/x → +∞).',
         '<b>f′(x) = 3x² − 3</b> = 0 per x = ±1. f′ &gt; 0 fuori da [−1, 1]: sale, scende, sale. Massimo in (−1, 2), minimo in (1, −2).',
         '<b>f″(x) = 6x</b>: negativa per x &lt; 0 (∩), positiva per x &gt; 0 (∪). Cambia segno in 0: flesso in (0, 0).',
         '<b>Disegno:</b> sale fino al massimo, scende passando per il flesso, risale dopo il minimo.'] },
    { f:x=>x*x/(x-1), xr:[-4,5], yr:[-8,10], excl:[1], asy:[{type:'v',x:1},{type:'o',m:1,q:1}], ext:[{x:0,y:0,label:'max'},{x:2,y:4,label:'min'}], fl:[],
      sign:x=>x*x/(x-1), zeros:[0],
      t:['<b>Dominio:</b> x ≠ 1 (il denominatore non può fare 0). Linea tratteggiata: x = 1 è escluso.',
         '<b>Segno:</b> x² ≥ 0 sempre, quindi il segno è quello di x − 1: positiva per x &gt; 1, negativa per x &lt; 1 (tranne x = 0, dove vale 0).',
         '<b>Limiti:</b> '+LIMX('1⁺')+' f(x) = +∞ e '+LIMX('1⁻')+' f(x) = −∞: asintoto verticale x = 1. Per x → ±∞, f → ±∞; m = 1, q = 1: asintoto obliquo y = x + 1.',
         '<b>f′(x) = x(x − 2)/(x − 1)²</b> = 0 per x = 0 e x = 2. Segno di f′: + − − +. Massimo in (0, 0), minimo in (2, 4).',
         '<b>f″(x) = 2/(x − 1)³</b>: negativa per x &lt; 1 (∩), positiva per x &gt; 1 (∪). Cambia segno in x = 1, ma lì f non esiste: nessun flesso.',
         '<b>Disegno:</b> due rami, uno a sinistra e uno a destra dell\'asintoto verticale, entrambi attaccati all\'obliqua y = x + 1 da lontano.'] },
    { f:x=>x*Math.exp(-x), xr:[-1,6], yr:[-2,1], excl:[], asy:[{type:'h',y:0,from:0}], ext:[{x:1,y:Math.exp(-1),label:'max'}], fl:[{x:2,y:2*Math.exp(-2),label:'flesso'}],
      sign:x=>x, zeros:[0],
      t:['<b>Dominio:</b> tutto ℝ.',
         '<b>Segno:</b> e<sup>−x</sup> &gt; 0 sempre, quindi il segno è quello di x: positiva per x &gt; 0, negativa per x &lt; 0. Passa per (0, 0).',
         '<b>Limiti:</b> '+LIMX('+∞')+' x e<sup>−x</sup> = '+LIMX('+∞')+' x/eˣ = 0 (l\'esponenziale vince): asintoto orizzontale y = 0 a destra. '+LIMX('−∞')+' f(x) = −∞.',
         '<b>f′(x) = (1 − x) e<sup>−x</sup></b>: positiva per x &lt; 1, negativa per x &gt; 1. Massimo in (1, 1/e) ≈ (1; 0,37).',
         '<b>f″(x) = (x − 2) e<sup>−x</sup></b>: cambia segno in x = 2. Flesso in (2, 2/e²) ≈ (2; 0,27).',
         '<b>Disegno:</b> sale da −∞, arriva al massimo in x = 1, scende piano verso 0 cambiando concavità in x = 2.'] }
  ];
  draws['studio-funzione'] = () => {
    const c = SF[+$('sfS').value], n = +$('sfN').value, o = { xmin:c.xr[0], xmax:c.xr[1], ymin:c.yr[0], ymax:c.yr[1], fns:[], points:[], vlines:[] };
    c.excl.forEach(x => { if (!(n>=3 && c.asy.some(a=>a.type==='v' && a.x===x))) o.vlines.push({x, color:'--bad', label:'x ≠ '+x}); });
    if (n>=2){ o.fns.push({f:x=>{ const s=c.sign(x); return isFinite(s) && s>0 ? c.yr[1]*0.04 : NaN; }, color:'--ok', width:6});
               o.fns.push({f:x=>{ const s=c.sign(x); return isFinite(s) && s<0 ? -c.yr[1]*0.04 : NaN; }, color:'--bad', width:6});
               c.zeros.forEach(z => o.points.push({x:z, y:0, color:'--ink'})); }
    if (n>=3) c.asy.forEach(a => { if (a.type==='v') o.vlines.push({x:a.x, color:'--cop', label:'asintoto x = '+a.x});
      if (a.type==='o') o.fns.push({f:x=>a.m*x+a.q, color:'--cop', dash:true, width:1.5});
      if (a.type==='h') o.fns.push({f:x=>x>=a.from?a.y:NaN, color:'--cop', dash:true, width:1.5}); });
    if (n>=4) c.ext.forEach(p => o.points.push({...p, color:'--thief'}));
    if (n>=5) c.fl.forEach(p => o.points.push({...p, color:'--cop'}));
    if (n>=6) o.fns.push({f:c.f, color:'--ink', width:2.5});
    plotF($('plotSF'), o);
    $('sfOut').innerHTML = '<span style="font-size:1rem">Passo '+n+' di 6 · '+c.t[n-1]+'</span>';
  };
  $('sfS').addEventListener('change', () => { $('sfN').value = 1; draws['studio-funzione'](); });
  $('sfN').addEventListener('input', () => draws['studio-funzione']());

  guided('studio-funzione', 'lavagna-studio-funzione', [
    { h:'Passo 1 · Derivata prima: f′(x) = 3x² − 12. Dove fa 0? (scrivi prima il più piccolo)', type:'nums', ans:[-2,2],
      html:'x = '+inp('prima soluzione','3.5em')+' e x = '+inp('seconda soluzione','3.5em'),
      ok:'Giusto: 3x² = 12, x² = 4, x = ±2.', bad:'3x² − 12 = 0 → x² = 4.' },
    { h:'Passo 2 · Segno di f′ = 3(x² − 4): positiva fuori da [−2, 2], negativa dentro. Dove c\'è il massimo?', type:'choice', ans:0,
      opts:['in x = −2: f′ passa da + a −','in x = 2: f′ passa da + a −','non ci sono massimi'],
      ok:'Esatto: prima sale, poi scende. In x = 2 invece c\'è il minimo (da − a +).', bad:'Massimo = prima sale (f′ &gt; 0) poi scende (f′ &lt; 0).' },
    { h:'Passo 3 · Quanto vale il massimo? f(−2) = (−2)³ − 12 · (−2)', type:'nums', ans:[16],
      html:'f(−2) = '+inp('f(−2)'),
      ok:'Perfetto: −8 + 24 = 16. Il massimo è nel punto (−2, 16).', bad:'(−2)³ = −8 e −12 · (−2) = +24.' },
    { h:'Passo 4 · Derivata seconda f″(x) = 6x. Dove c\'è il flesso?', type:'choice', ans:1,
      opts:['in x = 2','in x = 0: f″ cambia segno','non c\'è'],
      ok:'Sì: 6x &lt; 0 per x &lt; 0 e &gt; 0 per x &gt; 0. Flesso in (0, 0).', bad:'Dove 6x cambia segno?' }
  ], '<b>Fatto!</b> f(x) = x³ − 12x: massimo in (−2, 16), minimo in (2, −16), flesso in (0, 0). È la stessa forma della prima funzione del grafico, solo più "stirata".');

  EX['studio-funzione'] = [
    { id:'e1', type:'choice', q:'Dominio di f(x) = ln(x − 3)', a:1, opts:['x ≠ 3','x &gt; 3','x ≥ 3'], hint:'L\'argomento del logaritmo deve essere strettamente positivo.', sol:'x − 3 &gt; 0, cioè x &gt; 3.' },
    { id:'e2', type:'num', lbl:'x', q:'Asintoto verticale di f(x) = '+FR('x + 1','x − 4')+': x = ?', a:4, hint:'Dove si annulla il denominatore (e il numeratore no)?', sol:'x = 4: lì il limite da destra è +∞ e da sinistra −∞.' },
    { id:'e3', type:'num', lbl:'y', q:'Asintoto orizzontale di f(x) = '+FR('2x² + 1','x² − 3')+' per x → ±∞: y = ?', a:2, hint:'Termine dominante sopra e sotto.', sol:'2x²/x² = 2: y = 2.' },
    { id:'e4', type:'num', lbl:'q', q:'f(x) = '+FR('2x² + 3x','x + 1')+' ha asintoto obliquo y = 2x + q per x → +∞. Quanto vale q?', a:1, hint:'q = '+LIMX('+∞')+' [f(x) − 2x]. Fai il denominatore comune.', sol:'(2x² + 3x − 2x² − 2x)/(x + 1) = x/(x + 1) → 1 per x → +∞. q = 1.' },
    { id:'e5', type:'num', lbl:'x', q:'f(x) = x² − 4x + 1: in quale x c\'è il minimo?', a:2, hint:'f′(x) = 2x − 4.', sol:'2x − 4 = 0, x = 2. f′ passa da − a +: minimo.' },
    { id:'e6', type:'num', lbl:'x', q:'f(x) = x · e<sup>−x</sup>: in quale x c\'è il massimo?', a:1, hint:'f′(x) = (1 − x) e<sup>−x</sup>. Il fattore e<sup>−x</sup> è sempre positivo.', sol:'1 − x = 0, x = 1.' },
    { id:'e7', type:'num', lbl:'x', q:'f(x) = x³ − 6x²: in quale x c\'è il flesso?', a:2, hint:'f″(x) = 6x − 12.', sol:'6x − 12 = 0, x = 2, e f″ cambia segno lì.' },
    { id:'e8', type:'choice', q:'f(x) = x⁴ ha f″(0) = 0. In x = 0 c\'è un flesso?', a:1, opts:['sì','no: f″ = 12x² non cambia segno','non si può dire'], hint:'Guarda il segno di f″ = 12x² prima e dopo 0.', sol:'12x² ≥ 0 da tutte e due le parti: sempre ∪, niente flesso. In 0 c\'è un minimo.' },
    { id:'e9', type:'choice', q:'Se f′(x) &gt; 0 per ogni x in (a, b), allora su (a, b) f è…', a:0, opts:['crescente','concava verso l\'alto','positiva'], hint:'f′ è la pendenza.', sol:'Crescente (conseguenza di Lagrange). Positiva e concava sono altre cose: segno di f e di f″.' }
  ];
