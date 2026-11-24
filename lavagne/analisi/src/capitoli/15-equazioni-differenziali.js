  /* ===== capitolo 15: Equazioni differenziali ===== */
  order.push('equazioni-differenziali'); NAMES['equazioni-differenziali'] = '15 Equazioni differenziali';
  const ED = [
    { F:(x,y)=>y, sol:(x,y0)=>y0*Math.exp(x), t:y0=>'Soluzione: y = '+it(y0,1)+' · eˣ. Con y(0) = 0 resta sempre 0 (soluzione costante).' },
    { F:(x,y)=>-2*x*y, sol:(x,y0)=>y0*Math.exp(-x*x), t:y0=>'Separabile: y = '+it(y0,1)+' · e<sup>−x²</sup>, una "campana" che va a 0 per x → ±∞.' },
    { F:(x,y)=>x-y, sol:(x,y0)=>x-1+(y0+1)*Math.exp(-x), t:y0=>'Lineare: y = x − 1 + ('+it(y0+1,1)+') e<sup>−x</sup>. Tutte le soluzioni si attaccano alla retta y = x − 1 per x → +∞.' },
    { F:(x,y)=>y*(1-y), sol:(x,y0)=> y0===0 ? 0 : 1/(1+((1-y0)/y0)*Math.exp(-x)), t:y0=>'Logistica (separabile): y = 0 e y = 1 sono soluzioni costanti. Se parti tra 0 e 1, sali verso 1 per x → +∞.' }
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
    $('edOut').innerHTML = 'y(0) = <b class="cop">'+it(y0,1)+'</b><br><span style="font-size:1rem">'+c.t(y0)+'</span>';
  };
  $('edS').addEventListener('change', () => draws['equazioni-differenziali']());
  $('edY').addEventListener('input', () => draws['equazioni-differenziali']());

  guided('equazioni-differenziali', 'lavagna-equazioni-differenziali', [
    { h:'Passo 1 · È separabile: dy/y = 2 dx. Integrando: ln |y| = 2x + C. Ricavo y:', type:'choice', ans:1,
      opts:['y = 2x + C','y = K e<sup>2x</sup>','y = e<sup>2x</sup> + C'],
      ok:'Giusto: |y| = e<sup>2x + C</sup> = e<sup>C</sup> e<sup>2x</sup>, e K = ±e<sup>C</sup> (o 0, la soluzione costante).', bad:'Fai e alla … di tutti e due i lati: e<sup>2x + C</sup> = e<sup>C</sup> · e<sup>2x</sup>.' },
    { h:'Passo 2 · Condizione y(0) = 3: K · e⁰ = 3. Quanto vale K?', type:'nums', ans:[3],
      html:'K = '+inp('K'),
      ok:'Sì: e⁰ = 1, K = 3. La soluzione è y = 3e<sup>2x</sup>.', bad:'e⁰ = 1.' },
    { h:'Passo 3 · Controllo: y′ = 6e<sup>2x</sup> e 2y = 6e<sup>2x</sup>. Torna? Calcola y(ln 2) = 3 e<sup>2 ln 2</sup>.', type:'nums', ans:[12],
      html:'y(ln 2) = '+inp('y(ln 2)'),
      ok:'Perfetto: e<sup>2 ln 2</sup> = (e<sup>ln 2</sup>)² = 4, quindi 3 · 4 = 12.', bad:'e<sup>2 ln 2</sup> = e<sup>ln 4</sup> = 4.' }
  ], '<b>Fatto!</b> y′ = 2y, y(0) = 3 ha soluzione y = 3e<sup>2x</sup>. Schema: separo, integro, ricavo y, uso y(0) per la costante, controllo derivando.');

  EX['equazioni-differenziali'] = [
    { id:'e1', type:'num', lbl:'y(ln 2)', q:'y′ = 3y, y(0) = 2. Quanto vale y(ln 2)?', a:16, hint:'Soluzione y = 2e<sup>3x</sup>.', sol:'2e<sup>3 ln 2</sup> = 2 · 2³ = 16.' },
    { id:'e2', type:'num', lbl:'y(2)', q:'y′ = x, y(0) = 1. Quanto vale y(2)?', a:3, hint:'Basta integrare: y = x²/2 + C.', sol:'y = x²/2 + 1, y(2) = 2 + 1 = 3.' },
    { id:'e3', type:'choice', q:'Soluzione generale di y′ = 2x y', a:0, opts:['y = K e<sup>x²</sup>','y = x² + K','y = K e<sup>2x</sup>'], hint:'Separa: dy/y = 2x dx.', sol:'ln |y| = x² + C, y = K e<sup>x²</sup>.' },
    { id:'e4', type:'num', q:'y′ + y = 1, y(0) = 0. Quanto vale '+LIMX('+∞')+' y(x)?', a:1, hint:'Dalla lavagna: y = 1 + C e<sup>−x</sup>. Trova C, poi il limite.', sol:'y(0) = 1 + C = 0, C = −1: y = 1 − e<sup>−x</sup> → 1 per x → +∞.' },
    { id:'e5', type:'choice', q:'Soluzione generale di y″ − 3y′ + 2y = 0', a:1, opts:['y = c₁ e<sup>−x</sup> + c₂ e<sup>−2x</sup>','y = c₁ eˣ + c₂ e<sup>2x</sup>','y = (c₁ + c₂ x) eˣ'], hint:'λ² − 3λ + 2 = 0.', sol:'λ = 1 e λ = 2 (Δ &gt; 0): c₁ eˣ + c₂ e<sup>2x</sup>.' },
    { id:'e6', type:'choice', q:'Soluzione generale di y″ + 4y = 0', a:2, opts:['y = c₁ e<sup>2x</sup> + c₂ e<sup>−2x</sup>','y = (c₁ + c₂ x) e<sup>2x</sup>','y = c₁ cos 2x + c₂ sin 2x'], hint:'λ² + 4 = 0: λ = ±2i, quindi α = 0, β = 2.', sol:'Δ &lt; 0: e⁰(c₁ cos 2x + c₂ sin 2x).' },
    { id:'e7', type:'choice', q:'Soluzione generale di y″ − 2y′ + y = 0', a:0, opts:['y = (c₁ + c₂ x) eˣ','y = c₁ eˣ + c₂ e<sup>−x</sup>','y = c₁ cos x + c₂ sin x'], hint:'λ² − 2λ + 1 = (λ − 1)².', sol:'Radice doppia λ = 1 (Δ = 0): (c₁ + c₂ x) eˣ.' },
    { id:'e8', type:'num', lbl:'c₁', q:'y″ − y = 0, y(0) = 2, y′(0) = 0. Con y = c₁ eˣ + c₂ e<sup>−x</sup>, quanto vale c₁?', a:1, hint:'y(0) = c₁ + c₂ = 2; y′(0) = c₁ − c₂ = 0.', sol:'c₁ = c₂ = 1: y = eˣ + e<sup>−x</sup>.' },
    { id:'e9', type:'num', lbl:'y_p', q:'y″ + y = 3: cerca una soluzione particolare costante y_p = A. Quanto vale A?', a:3, hint:'Se y = A costante, y″ = 0.', sol:'0 + A = 3, A = 3. Soluzione generale: c₁ cos x + c₂ sin x + 3.' }
  ];
