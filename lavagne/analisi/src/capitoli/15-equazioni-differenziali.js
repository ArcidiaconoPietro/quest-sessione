  /* ===== capitolo 15: Equazioni differenziali ===== */
  order.push('equazioni-differenziali'); NAMES['equazioni-differenziali'] = '15 Equazioni differenziali';
  const ED = [
    { F:(x,y)=>y, sol:(x,y0)=>y0*Math.exp(x), t:y0=>SV(
      '<i>Soluzione costante:</i> y = 0 (0′ = 0 = y ✓)',
      '<i>Separo:</i> dy/y = dx → integro: ln |y| = x + C',
      '<i>Ricavo y:</i> |y| = e<sup>x + C</sup> = e<sup>C</sup> eˣ, quindi y = K eˣ',
      '<i>Uso y(0) = '+it(y0,1)+':</i> K · e⁰ = K = '+it(y0,1)+', quindi y = '+it(y0,1)+' · eˣ',
      '<i>Controllo:</i> y′ = '+it(y0,1)+' · eˣ = y ✓. Con i numeri: y(1) = '+it(y0,1)+' · 2,718 ≈ '+it(y0*Math.E,3)) },
    { F:(x,y)=>-2*x*y, sol:(x,y0)=>y0*Math.exp(-x*x), t:y0=>SV(
      '<i>Separo:</i> dy/y = −2x dx',
      '<i>Integro:</i> ln |y| = −x² + C → y = K e<sup>−x²</sup>',
      '<i>Uso y(0) = '+it(y0,1)+':</i> K e⁰ = K = '+it(y0,1),
      '<i>Controllo con la catena:</i> y′ = '+it(y0,1)+' · e<sup>−x²</sup> · (−2x) = −2x · y ✓',
      '<i>Forma:</i> y(1) = '+it(y0,1)+'/e ≈ '+it(y0/Math.E,3)+', y(2) = '+it(y0,1)+'/e⁴ ≈ '+it(y0*Math.exp(-4),3)+': una campana che va a 0 per x → ±∞') },
    { F:(x,y)=>x-y, sol:(x,y0)=>x-1+(y0+1)*Math.exp(-x), t:y0=>SV(
      '<i>Riscrivo:</i> y′ + y = x, lineare con a = 1, A = x, f = x',
      '<i>Formula:</i> y = e<sup>−x</sup> [∫ x eˣ dx + C]',
      '<i>Per parti (capitolo 13):</i> ∫ x eˣ dx = (x − 1)eˣ',
      '<i>Quindi:</i> y = e<sup>−x</sup>[(x − 1)eˣ + C] = x − 1 + C e<sup>−x</sup>',
      '<i>Uso y(0) = '+it(y0,1)+':</i> 0 − 1 + C = '+it(y0,1)+' → C = '+it(y0+1,1),
      '<i>Controllo:</i> y′ = 1 − C e<sup>−x</sup>; x − y = x − x + 1 − C e<sup>−x</sup> = 1 − C e<sup>−x</sup> ✓',
      '<i>Per x → +∞:</i> C e<sup>−x</sup> → 0, tutte si attaccano alla retta y = x − 1') },
    { F:(x,y)=>y*(1-y), sol:(x,y0)=> y0===0 ? 0 : 1/(1+((1-y0)/y0)*Math.exp(-x)), t:y0=>SV(
      '<i>Soluzioni costanti:</i> y(1 − y) = 0 per y = 0 e y = 1',
      '<i>Separo:</i> dy/(y(1 − y)) = dx; fratti semplici: 1/(y(1 − y)) = 1/y + 1/(1 − y)',
      '<i>Integro:</i> ln |y| − ln |1 − y| = x + C → y/(1 − y) = K eˣ',
      '<i>Ricavo y:</i> y = K eˣ (1 − y) → y(1 + K eˣ) = K eˣ → y = '+FR('K eˣ','1 + K eˣ'),
      '<i>Uso y(0) = '+it(y0,1)+':</i> K = y(0)/(1 − y(0)) = '+(y0===1?'(infinito: è la costante y = 1)':it(y0,1)+'/'+it(1-y0,1)+' ≈ '+it(y0/(1-y0),3)),
      '<i>Con i numeri:</i> y(2) ≈ '+it(y0===0?0:1/(1+((1-y0)/y0)*Math.exp(-2)),3)+'. Se parti tra 0 e 1, sali verso 1 per x → +∞') }
  ];
  draws['equazioni-differenziali'] = () => {
    const c = ED[+$('edS').value], y0 = (+$('edY').value)/10, cv = $('plotED');
    const o = { xmin:-3, xmax:3, ymin:-3, ymax:3 };
    plotF(cv, { ...o, fns:[{f:x=>c.sol(x,y0), color:'--thief', width:2.5}], points:[{x:0, y:y0, color:'--cop', label:'y(0)'}] });
    if (!cv.offsetParent) return;
    const g = cv.getContext('2d'), W = cv.clientWidth, H = cv.clientHeight, pad = {l:40, r:12, t:12, b:24};
    const X = x => pad.l + (x-o.xmin)/(o.xmax-o.xmin)*(W-pad.l-pad.r), Y = y => pad.t + (o.ymax-y)/(o.ymax-o.ymin)*(H-pad.t-pad.b);
    const sx = (W-pad.l-pad.r)/(o.xmax-o.xmin), sy = (H-pad.t-pad.b)/(o.ymax-o.ymin);
    g.strokeStyle = css('--muted'); g.lineWidth = 1.2; g.globalAlpha = .8;
    for (let x=-2.75; x<=2.76; x+=0.5) for (let y=-2.75; y<=2.76; y+=0.5){
      const m = c.F(x,y), dx = 1, dy = m, L = Math.hypot(dx*sx, dy*sy), k = 9/L;
      g.beginPath(); g.moveTo(X(x)-dx*sx*k, Y(y)+dy*sy*k); g.lineTo(X(x)+dx*sx*k, Y(y)-dy*sy*k); g.stroke(); }
    g.globalAlpha = 1;
    $('edOut').innerHTML = 'y(0) = <b class="cop">'+it(y0,1)+'</b>'+c.t(y0);
  };
  $('edS').addEventListener('change', () => draws['equazioni-differenziali']());
  $('edY').addEventListener('input', () => draws['equazioni-differenziali']());

  video('equazioni-differenziali', [
    { show:'<h3>Equazioni differenziali</h3>L\'incognita è una funzione y(x). Esempio: y′ = y',
      say:'Equazioni differenziali. Qui l\'incognita è una funzione, y di x, e l\'equazione lega y alle sue derivate. Esempio: y primo uguale y. Una funzione uguale alla sua derivata.' },
    { show:'y = eˣ → y′ = eˣ = y ✓ · y = 5eˣ → y′ = 5eˣ = y ✓ · tutte: y = K eˣ',
      say:'e alla x funziona: la sua derivata è e alla x. Ma anche cinque e alla x: derivata cinque e alla x. Tutte le funzioni K per e alla x sono soluzioni.' },
    { show:'Cauchy: y′ = y, y(0) = 2 → K · e⁰ = K = 2 → y = 2eˣ',
      say:'Per sceglierne una sola serve la condizione iniziale: il problema di Cauchy. Se y di zero è due, allora K per e alla zero, cioè K, vale due. La soluzione è due e alla x.' },
    { show:'Separabili: y′ = a(x) · b(y) → '+FR('dy','b(y)')+' = a(x) dx → integro tutti e due i lati',
      say:'Primo tipo: le equazioni a variabili separabili. y primo è un pezzo con la x per un pezzo con la y. Porto le y a sinistra e le x a destra, poi integro.' },
    { show:'Esercizio: y′ = 2y, y(0) = 3 · '+FR('dy','y')+' = 2 dx → ln|y| = 2x + C',
      say:'Esercizio: y primo uguale due y, con y di zero uguale tre. Separo: d y su y uguale due d x. Integro: logaritmo del valore assoluto di y uguale due x più C.' },
    { show:'|y| = e<sup>2x + C</sup> = e<sup>C</sup> · e<sup>2x</sup> → y = K e<sup>2x</sup>',
      say:'Faccio e alla tutti e due i lati: valore assoluto di y uguale e alla due x più C, che è e alla C per e alla due x. Chiamo K la costante: y uguale K e alla due x.' },
    { show:'y(0) = 3: K · e⁰ = K = 3 → y = 3e<sup>2x</sup> · controllo: y′ = 6e<sup>2x</sup> = 2y ✓',
      say:'Condizione iniziale: K per e alla zero uguale tre, quindi K è tre. La soluzione è tre e alla due x. Controllo: la derivata è tre per due e alla due x, sei e alla due x, che è proprio due volte y.' },
    { show:'Lineari: y′ + a(x) y = f(x) → y = e<sup>−A</sup>[∫ f e<sup>A</sup> dx + C]',
      say:'Secondo tipo: le lineari del primo ordine. y primo più a di x per y uguale f di x. La formula: y uguale e alla meno A per, integrale di f per e alla A, più C. A è una primitiva di a.' },
    { show:'y′ + y = 1: A = x → e<sup>−x</sup>(∫ eˣ dx + C) = e<sup>−x</sup>(eˣ + C) = 1 + C e<sup>−x</sup>',
      say:'Esempio: y primo più y uguale uno. a è uno, quindi A è x. Integrale di uno per e alla x: e alla x. Moltiplico per e alla meno x: uno più C e alla meno x.' },
    { show:'Controllo: y′ = −C e<sup>−x</sup> → y′ + y = −C e<sup>−x</sup> + 1 + C e<sup>−x</sup> = 1 ✓',
      say:'Controllo: la derivata è meno C e alla meno x. Sommata a y, i due pezzi con C si cancellano e resta uno. Giusto.' },
    { show:'Secondo ordine: y″ − 3y′ + 2y = 0 → λ² − 3λ + 2 = 0 → Δ = 9 − 8 = 1 → λ = 1, 2',
      say:'Terzo tipo: secondo ordine a coefficienti costanti. Esempio: y secondo meno tre y primo più due y uguale zero. Provo e alla lambda x e arrivo all\'equazione caratteristica: lambda al quadrato meno tre lambda più due. Delta è nove meno otto, uno. Le radici sono uno e due.' },
    { show:'y = c₁ eˣ + c₂ e<sup>2x</sup> · Δ = 0: (c₁ + c₂x)e<sup>λx</sup> · Δ &lt; 0: e<sup>αx</sup>(c₁ cos βx + c₂ sin βx)',
      say:'Con due radici la soluzione è c uno e alla x più c due e alla due x. Se delta è zero si mette c uno più c due x, per e alla lambda x. Se delta è negativo compaiono coseno e seno.' }
  ]);

  guided('equazioni-differenziali', 'lavagna-equazioni-differenziali', [
    { h:'Passo 1 · È separabile: dy/y = 2 dx. Integrando: ln |y| = 2x + C. Ricavo y:', type:'choice', ans:1,
      opts:['y = 2x + C','y = K e<sup>2x</sup>','y = e<sup>2x</sup> + C'],
      ok:'Giusto: |y| = e<sup>2x + C</sup> = e<sup>C</sup> e<sup>2x</sup>, e K = ±e<sup>C</sup> (o 0, la soluzione costante).', bad:'Fai e alla … di tutti e due i lati: e<sup>2x + C</sup> = e<sup>C</sup> · e<sup>2x</sup>.' },
    { h:'Passo 2 · Condizione y(0) = 3: K · e⁰ = 3. Quanto vale K?', type:'nums', ans:[3],
      html:'K = '+inp('K'),
      ok:'Sì: e⁰ = 1, K = 3. La soluzione è y = 3e<sup>2x</sup>.', bad:'e⁰ = 1.' },
    { h:'Passo 3 · Controllo: y′ = 6e<sup>2x</sup> e 2y = 6e<sup>2x</sup>. Torna? Calcola y(ln 2) = 3 e<sup>2 ln 2</sup>.', type:'nums', ans:[12],
      html:'y(ln 2) = '+inp('y(ln 2)'),
      ok:'Perfetto: e<sup>2 ln 2</sup> = (e<sup>ln 2</sup>)² = 2² = 4, quindi 3 · 4 = 12. E il controllo torna: y′ = 3 · e<sup>2x</sup> · 2 = 6e<sup>2x</sup> = 2 · 3e<sup>2x</sup> = 2y ✓', bad:'e<sup>2 ln 2</sup> = e<sup>ln 4</sup> = 4.' }
  ], '<b>Fatto!</b> y′ = 2y, y(0) = 3 ha soluzione y = 3e<sup>2x</sup>. Schema: separo, integro, ricavo y, uso y(0) per la costante, controllo derivando.');

  EX['equazioni-differenziali'] = [
    { id:'e1', type:'num', lbl:'y(ln 2)', q:'y′ = 3y, y(0) = 2. Quanto vale y(ln 2)?', a:16, hint:'Soluzione y = 2e<sup>3x</sup>.', sol:SV(
      '<i>Separo:</i> dy/y = 3 dx',
      '<i>Integro:</i> ln |y| = 3x + C',
      '<i>Ricavo y:</i> y = K e<sup>3x</sup>',
      '<i>Uso y(0) = 2:</i> K e⁰ = K = 2, quindi y = 2e<sup>3x</sup>',
      '<i>Calcolo y(ln 2):</i> 2 e<sup>3 ln 2</sup> = 2 (e<sup>ln 2</sup>)³ = 2 · 2³ = 2 · 8 = <b>16</b>') },
    { id:'e2', type:'num', lbl:'y(2)', q:'y′ = x, y(0) = 1. Quanto vale y(2)?', a:3, hint:'Basta integrare: y = x²/2 + C.', sol:SV(
      '<i>y′ = x: y è una primitiva di x</i>',
      '<i>Integro:</i> y = '+FR('x²','2')+' + C',
      '<i>Uso y(0) = 1:</i> 0 + C = 1, C = 1',
      '<i>Soluzione:</i> y = x²/2 + 1',
      '<i>y(2):</i> 4/2 + 1 = 2 + 1 = <b>3</b>') },
    { id:'e3', type:'choice', q:'Soluzione generale di y′ = 2x y', a:0, opts:['y = K e<sup>x²</sup>','y = x² + K','y = K e<sup>2x</sup>'], hint:'Separa: dy/y = 2x dx.', sol:SV(
      '<i>Soluzione costante:</i> y = 0 funziona (0 = 2x · 0)',
      '<i>Separo (y ≠ 0):</i> '+FR('dy','y')+' = 2x dx',
      '<i>Integro a sinistra e a destra:</i> ln |y| = x² + C',
      '<i>Faccio e alla:</i> |y| = e<sup>x² + C</sup> = e<sup>C</sup> e<sup>x²</sup>',
      '<i>Chiamo K = ±e<sup>C</sup> (o 0):</i> <b>y = K e<sup>x²</sup></b>') },
    { id:'e4', type:'num', q:'y′ + y = 1, y(0) = 0. Quanto vale '+LIMX('+∞')+' y(x)?', a:1, hint:'Dalla lavagna: y = 1 + C e<sup>−x</sup>. Trova C, poi il limite.', sol:SV(
      '<i>Lineare con a = 1, f = 1:</i> A(x) = x',
      '<i>Formula:</i> y = e<sup>−x</sup> [∫ 1 · eˣ dx + C] = e<sup>−x</sup> (eˣ + C) = 1 + C e<sup>−x</sup>',
      '<i>Uso y(0) = 0:</i> 1 + C · 1 = 0, C = −1',
      '<i>Soluzione:</i> y = 1 − e<sup>−x</sup>',
      '<i>Limite per x → +∞:</i> e<sup>−x</sup> → 0, quindi y → 1 − 0 = <b>1</b>') },
    { id:'e5', type:'choice', q:'Soluzione generale di y″ − 3y′ + 2y = 0', a:1, opts:['y = c₁ e<sup>−x</sup> + c₂ e<sup>−2x</sup>','y = c₁ eˣ + c₂ e<sup>2x</sup>','y = (c₁ + c₂ x) eˣ'], hint:'λ² − 3λ + 2 = 0.', sol:SV(
      '<i>Equazione caratteristica:</i> λ² − 3λ + 2 = 0',
      '<i>Δ:</i> 9 − 8 = 1 &gt; 0',
      '<i>Radici:</i> λ = '+FR('3 ± 1','2')+', cioè λ₁ = 1 e λ₂ = 2',
      '<i>Caso Δ &gt; 0:</i> y = c₁ e<sup>λ₁x</sup> + c₂ e<sup>λ₂x</sup>',
      '<i>Risultato:</i> <b>y = c₁ eˣ + c₂ e<sup>2x</sup></b>') },
    { id:'e6', type:'choice', q:'Soluzione generale di y″ + 4y = 0', a:2, opts:['y = c₁ e<sup>2x</sup> + c₂ e<sup>−2x</sup>','y = (c₁ + c₂ x) e<sup>2x</sup>','y = c₁ cos 2x + c₂ sin 2x'], hint:'λ² + 4 = 0: λ = ±2i, quindi α = 0, β = 2.', sol:SV(
      '<i>Equazione caratteristica:</i> λ² + 4 = 0',
      '<i>Risolvo:</i> λ² = −4, λ = ±2i',
      '<i>Leggo α e β (λ = α ± iβ):</i> α = 0, β = 2',
      '<i>Caso Δ &lt; 0:</i> y = e<sup>αx</sup>(c₁ cos βx + c₂ sin βx) = e⁰(c₁ cos 2x + c₂ sin 2x)',
      '<i>Risultato:</i> <b>y = c₁ cos 2x + c₂ sin 2x</b>') },
    { id:'e7', type:'choice', q:'Soluzione generale di y″ − 2y′ + y = 0', a:0, opts:['y = (c₁ + c₂ x) eˣ','y = c₁ eˣ + c₂ e<sup>−x</sup>','y = c₁ cos x + c₂ sin x'], hint:'λ² − 2λ + 1 = (λ − 1)².', sol:SV(
      '<i>Equazione caratteristica:</i> λ² − 2λ + 1 = 0',
      '<i>Riconosco il quadrato:</i> (λ − 1)² = 0, Δ = 4 − 4 = 0',
      '<i>Radice doppia:</i> λ = 1',
      '<i>Caso Δ = 0:</i> y = (c₁ + c₂ x) e<sup>λx</sup>',
      '<i>Risultato:</i> <b>y = (c₁ + c₂ x) eˣ</b>') },
    { id:'e8', type:'num', lbl:'c₁', q:'y″ − y = 0, y(0) = 2, y′(0) = 0. Con y = c₁ eˣ + c₂ e<sup>−x</sup>, quanto vale c₁?', a:1, hint:'y(0) = c₁ + c₂ = 2; y′(0) = c₁ − c₂ = 0.', sol:SV(
      '<i>Caratteristica:</i> λ² − 1 = 0, λ = ±1, quindi y = c₁ eˣ + c₂ e<sup>−x</sup>',
      '<i>Derivo:</i> y′ = c₁ eˣ − c₂ e<sup>−x</sup>',
      '<i>y(0) = 2:</i> c₁ + c₂ = 2',
      '<i>y′(0) = 0:</i> c₁ − c₂ = 0, quindi c₁ = c₂',
      '<i>Sostituisco nella prima:</i> c₁ + c₁ = 2, 2c₁ = 2',
      '<i>Risultato:</i> <b>c₁ = 1</b> (e c₂ = 1)') },
    { id:'e9', type:'num', lbl:'y_p', q:'y″ + y = 3: cerca una soluzione particolare costante y_p = A. Quanto vale A?', a:3, hint:'Se y = A costante, y″ = 0.', sol:SV(
      '<i>Provo y = A costante:</i> allora y′ = 0 e y″ = 0',
      '<i>Sostituisco nell\'equazione:</i> 0 + A = 3',
      '<i>Quindi:</i> <b>A = 3</b>',
      '<i>Soluzione generale:</i> omogenea (λ² + 1 = 0, λ = ±i) + particolare = c₁ cos x + c₂ sin x + 3') }
  ];
