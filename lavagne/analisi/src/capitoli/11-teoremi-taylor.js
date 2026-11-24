  /* ===== capitolo 11: Rolle, Lagrange, De L'Hôpital, Taylor ===== */
  order.push('teoremi-taylor'); NAMES['teoremi-taylor'] = '11 Rolle, Lagrange, Taylor';
  const fact = n => n<2 ? 1 : n*fact(n-1);
  const TY = [
    { f:Math.exp, c:k=>1/fact(k), t:['1','+ x','+ x²/2','+ x³/6','+ x⁴/24','+ x⁵/120','+ x⁶/720','+ x⁷/5040','+ x⁸/40320','+ x⁹/362880'], yr:[-2,8], xr:[-4,3] },
    { f:Math.sin, c:k=>k%2 ? (k%4===1?1:-1)/fact(k) : 0, t:['','x','','− x³/6','','+ x⁵/120','','− x⁷/5040','','+ x⁹/362880'], yr:[-2,2], xr:[-7,7] },
    { f:Math.cos, c:k=>k%2 ? 0 : (k%4===0?1:-1)/fact(k), t:['1','','− x²/2','','+ x⁴/24','','− x⁶/720','','+ x⁸/40320',''], yr:[-2,2], xr:[-7,7] },
    { f:x=>x>-1?Math.log(1+x):NaN, c:k=>k===0?0:(k%2?1:-1)/k, t:['','x','− x²/2','+ x³/3','− x⁴/4','+ x⁵/5','− x⁶/6','+ x⁷/7','− x⁸/8','+ x⁹/9'], yr:[-3,2], xr:[-1,2], dom:x=>x>-1 }
  ];
  const lgf = x => 0.3*x*x*x - x + 1, LGA = -2;
  draws['teoremi-taylor'] = () => {
    const b = -0.8 + (+$('lgB').value)/100 * 3.3, ya = lgf(LGA), yb = lgf(b), m = (yb-ya)/(b-LGA);
    const cs = [Math.sqrt((m+1)/0.9), -Math.sqrt((m+1)/0.9)].filter(c => isFinite(c) && c > LGA && c < b);
    const fns = [{f:lgf, color:'--ink', width:2.5}, {f:x=>ya+m*(x-LGA), color:'--thief', width:2}];
    cs.forEach(c => fns.push({f:x=>lgf(c)+m*(x-c), color:'--cop', dash:true, width:1.5}));
    plotF($('plotLG'), { xmin:-2.5, xmax:3, ymin:-2, ymax:5, fns,
      points:[{x:LGA,y:ya,color:'--thief',label:'A'},{x:b,y:yb,color:'--thief',label:'B'}, ...cs.map(c=>({x:c,y:lgf(c),color:'--cop',label:'c'}))] });
    $('lgOut').innerHTML = 'pendenza della secante = '+FR('f(b) − f(a)','b − a')+' = <b class="thief">'+it(m,3)+'</b> · '+(cs.length ? 'f′(c) = <b class="cop">'+it(m,3)+'</b> in c = '+cs.map(c=>it(c,2)).join(' e c = ') : '');
    const T = TY[+$('tyS').value], n = +$('tyN').value;
    const P = x => { let s=0; for (let k=0;k<=n;k++) s += T.c(k)*Math.pow(x,k); return (T.dom && !T.dom(x)) ? NaN : s; };
    plotF($('plotTY'), { xmin:T.xr[0], xmax:T.xr[1], ymin:T.yr[0], ymax:T.yr[1], fns:[{f:T.f, color:'--ink', width:2.5}, {f:P, color:'--thief', width:2}] });
    let poly = T.t.slice(0,n+1).filter(s=>s).join(' ').replace(/^\+ /,''); if (!poly) poly = '0';
    $('tyOut').innerHTML = 'Grado '+n+': <b class="thief">'+poly+'</b><br><span style="font-size:1rem">In x = 0,5: funzione = '+it(T.f(0.5),5)+' · polinomio = '+it(P(0.5),5)+'</span>';
  };
  $('lgB').addEventListener('input', () => draws['teoremi-taylor']());
  $('tyS').addEventListener('change', () => draws['teoremi-taylor']());
  $('tyN').addEventListener('input', () => draws['teoremi-taylor']());

  guided('teoremi-taylor', 'lavagna-teoremi-taylor', [
    { h:'Passo 1 · Sostituisco x = 0. Che forma esce?', type:'choice', ans:0,
      opts:['0/0','1/0','0'],
      ok:'Giusto: sopra e⁰ − 1 − 0 = 0, sotto 0. Forma indeterminata.', bad:'Sopra: e⁰ − 1 − 0. Sotto: 0².' },
    { h:'Passo 2 · Sotto c\'è x², quindi sviluppo eˣ fino a x². Quale?', type:'choice', ans:2,
      opts:['eˣ = 1 + x + o(x)','eˣ = x + x²/2 + o(x²)','eˣ = 1 + x + x²/2 + o(x²)'],
      ok:'Esatto.', bad:'eˣ = 1 + x + x²/2 + x³/6 + …: fermati a x².' },
    { h:'Passo 3 · Sopra: (1 + x + x²/2 + o(x²)) − 1 − x = ?', type:'choice', ans:1,
      opts:['x + x²/2 + o(x²)','x²/2 + o(x²)','o(x²)'],
      ok:'Sì: 1 e x si cancellano, resta x²/2 + o(x²).', bad:'Togli 1 e togli x.' },
    { h:'Passo 4 · Divido per x² e faccio il limite per x → 0. Ricorda: o(x²)/x² → 0.', type:'nums', ans:[0.5],
      html:LIMX('0')+' ('+FR('1','2')+' + '+FR('o(x²)','x²')+') = '+inp('risultato'),
      ok:'Perfetto: 1/2.', bad:'1/2 + 0 = …' }
  ], '<b>Fatto!</b> '+LIMX('0')+' (eˣ − 1 − x)/x² = '+LIMX('0')+' (x²/2 + o(x²))/x² = 1/2. Regola d\'oro: sviluppa fino alla potenza che c\'è sotto.');

  EX['teoremi-taylor'] = [
    { id:'e1', type:'num', lbl:'c', q:'Lagrange per f(x) = x² su [0, 2]: per quale c vale f′(c) = [f(2) − f(0)]/(2 − 0)?', a:1, hint:'La pendenza media è (4 − 0)/2 = 2. Risolvi f′(c) = 2c = 2.', sol:SV(
      '<i>Pendenza media (secante):</i> '+FR('f(2) − f(0)','2 − 0')+' = '+FR('4 − 0','2')+' = 2',
      '<i>Derivata:</i> f′(x) = 2x, quindi f′(c) = 2c',
      '<i>Lagrange dice f′(c) = pendenza media:</i> 2c = 2',
      '<i>Divido per 2:</i> <b>c = 1</b>, che sta in (0, 2) ✓') },
    { id:'e2', type:'num', lbl:'c', q:'Rolle per f(x) = x² − 2x su [0, 2] (f(0) = f(2) = 0): dove f′(c) = 0?', a:1, hint:'f′(x) = 2x − 2.', sol:SV(
      '<i>Controllo le ipotesi:</i> polinomio (continuo e derivabile), f(0) = 0 e f(2) = 4 − 4 = 0 ✓',
      '<i>Derivo:</i> f′(x) = 2x − 2',
      '<i>Pongo f′(c) = 0:</i> 2c − 2 = 0',
      '<i>Risolvo:</i> 2c = 2, <b>c = 1</b>') },
    { id:'e3', type:'num', q:LIMX('1')+' '+FR('ln x','x − 1'), a:1, hint:'0/0: De L\'Hôpital, derivi sopra (1/x) e sotto (1).', sol:SV(
      '<i>Sostituisco x = 1:</i> ln 1 = 0 sopra, 0 sotto: forma 0/0 ✓',
      '<i>De L\'Hôpital, derivo sopra:</i> (ln x)′ = 1/x',
      '<i>Derivo sotto (separatamente!):</i> (x − 1)′ = 1',
      '<i>Nuovo limite:</i> '+LIMX('1')+' '+FR('1/x','1')+' = '+LIMX('1')+' '+FR('1','x'),
      '<i>Sostituisco x = 1:</i> 1/1 = <b>1</b>') },
    { id:'e4', type:'num', q:LIMX('+∞')+' '+FR('x','eˣ'), a:0, hint:'∞/∞: De L\'Hôpital una volta.', sol:SV(
      '<i>Forma per x → +∞:</i> ∞/∞ ✓',
      '<i>Derivo sopra:</i> (x)′ = 1',
      '<i>Derivo sotto:</i> (eˣ)′ = eˣ',
      '<i>Nuovo limite:</i> '+LIMX('+∞')+' '+FR('1','eˣ'),
      '<i>eˣ → +∞, quindi 1/eˣ → 0:</i> risultato <b>0</b>') },
    { id:'e5', type:'num', q:LIMX('0')+' '+FR('x − sin x','x³'), a:1/6, hint:'sin x = x − x³/6 + o(x³).', sol:SV(
      '<i>Forma per x → 0:</i> (0 − 0)/0 = 0/0',
      '<i>Sotto c\'è x³: sviluppo sin x fino a x³:</i> sin x = x − '+FR('x³','6')+' + o(x³)',
      '<i>Sostituisco sopra:</i> x − (x − x³/6 + o(x³))',
      '<i>Tolgo la parentesi (cambio i segni):</i> x − x + x³/6 − o(x³) = '+FR('x³','6')+' + o(x³)',
      '<i>Divido per x³:</i> '+FR('1','6')+' + '+FR('o(x³)','x³'),
      '<i>Limite (o(x³)/x³ → 0):</i> <b>1/6</b>') },
    { id:'e6', type:'num', q:LIMX('0')+' '+FR('ln(1 + x) − x','x²'), a:-0.5, hint:'ln(1 + x) = x − x²/2 + o(x²).', sol:SV(
      '<i>Forma:</i> (0 − 0)/0 = 0/0',
      '<i>Sotto x²: sviluppo ln(1 + x) fino a x²:</i> x − '+FR('x²','2')+' + o(x²)',
      '<i>Sopra:</i> x − x²/2 + o(x²) − x = −'+FR('x²','2')+' + o(x²)',
      '<i>Divido per x²:</i> −'+FR('1','2')+' + '+FR('o(x²)','x²'),
      '<i>Limite:</i> <b>−1/2</b>') },
    { id:'e7', type:'num', lbl:'coefficiente', q:'Nello sviluppo di cos x per x → 0, qual è il coefficiente di x²?', a:-0.5, hint:'cos x = 1 − x²/2 + …', sol:SV(
      '<i>Formula:</i> coefficiente di x² = '+FR('f″(0)','2!'),
      '<i>Derivo cos x due volte:</i> f′ = −sin x, f″ = −cos x',
      '<i>Calcolo in 0:</i> f″(0) = −cos 0 = −1',
      '<i>Divido per 2! = 2:</i> −1/2',
      '<i>Risultato:</i> <b>−1/2</b> (infatti cos x = 1 − x²/2 + …)') },
    { id:'e8', type:'num', q:LIMX('0⁺')+' x · ln x', a:0, hint:'0 · ∞: riscrivi come ln x / (1/x), che è ∞/∞, poi De L\'Hôpital.', sol:SV(
      '<i>Forma per x → 0⁺:</i> x → 0 e ln x → −∞: 0 · ∞, prima va riscritta',
      '<i>Riscrivo come frazione:</i> x · ln x = '+FR('ln x','1/x'),
      '<i>Nuova forma:</i> (−∞)/(+∞), va bene per De L\'Hôpital',
      '<i>Derivo sopra e sotto:</i> (ln x)′ = 1/x, (1/x)′ = −1/x²',
      '<i>Nuovo rapporto:</i> '+FR('1/x','−1/x²')+' = '+FR('1','x')+' · (−x²) = −x',
      '<i>Limite per x → 0⁺:</i> −x → <b>0</b>') },
    { id:'e9', type:'choice', q:'Si può usare De L\'Hôpital per '+LIMX('0')+' '+FR('x + 1','x')+' ?', a:1, opts:['sì','no: non è 0/0 né ∞/∞','sì, ma solo da destra'], hint:'Sostituisci x = 0: che forma esce?', sol:SV(
      '<i>Sostituisco x = 0:</i> sopra 0 + 1 = 1, sotto 0',
      '<i>Forma 1/0:</i> NON è 0/0 né ∞/∞',
      '<i>Quindi:</i> De L\'Hôpital <b>non si può usare</b>',
      '<i>Cosa succede davvero:</i> da destra 1/(piccolo positivo) → +∞, da sinistra → −∞: il limite non esiste') }
  ];
