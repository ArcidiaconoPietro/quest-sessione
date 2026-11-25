  /* ===== capitolo 14: Integrali definiti ===== */
  order.push('integrali-definiti'); NAMES['integrali-definiti'] = '14 Integrali definiti';
  const ID = [
    { f:x=>x*x, a:0, b:2, ex:8/3, exs:'8/3 ≈ 2,6667', xr:[-0.3,2.3], yr:[-0.5,4.5], fn:'(X)²', ab:'[0, 2]', len:'2', ft:'F(x) = x³/3: F(2) − F(0) = 8/3 − 0 = 8/3 ≈ 2,6667' },
    { f:Math.sin, a:0, b:Math.PI, ex:2, exs:'2', xr:[-0.3,3.5], yr:[-0.3,1.3], fn:'sin X', ab:'[0, π]', len:'π', ft:'F(x) = −cos x: F(π) − F(0) = −cos π − (−cos 0) = 1 + 1 = 2' },
    { f:Math.exp, a:0, b:1, ex:Math.E-1, exs:'e − 1 ≈ 1,7183', xr:[-0.2,1.2], yr:[-0.3,3], fn:'e<sup>X</sup>', ab:'[0, 1]', len:'1', ft:'F(x) = eˣ: F(1) − F(0) = e − e⁰ = e − 1 ≈ 1,7183' }
  ];
  draws['integrali-definiti'] = () => {
    const c = ID[+$('idS').value], n = +$('idN').value, w = (c.b-c.a)/n;
    const step = x => { if (x < c.a || x > c.b) return 0; const k = Math.min(n-1, Math.floor((x-c.a)/w)); return c.f(c.a + (k+0.5)*w); };
    let S = 0; for (let k=0;k<n;k++) S += c.f(c.a+(k+0.5)*w)*w;
    plotF($('plotID'), { xmin:c.xr[0], xmax:c.xr[1], ymin:c.yr[0], ymax:c.yr[1], area:{f:step, a:c.a, b:c.b, color:'--thief'},
      fns:[{f:step, color:'--thief', width:1}, {f:c.f, color:'--ink', width:2.5}] });
    $('idOut').innerHTML = 'Somma di '+n+' rettangoli = <b class="thief">'+it(S,4)+'</b> · area vera = <b class="cop">'+c.exs+'</b>';
    const rows = []; for (let k=0;k<Math.min(n,4);k++){ const m=c.a+(k+0.5)*w; rows.push('rettangolo '+(k+1)+': punto di mezzo '+it(m,3)+', altezza '+c.fn.replace('X',it(m,3))+' ≈ '+it(c.f(m),4)+', area ≈ '+it(c.f(m),4)+' · '+it(w,3)+' ≈ '+it(c.f(m)*w,4)); }
    $('idOut').innerHTML += SV(
      '<i>Larghezza di ogni rettangolo:</i> lunghezza di '+c.ab+' diviso n = '+c.len+'/'+n+' ≈ '+it(w,4),
      '<i>I primi rettangoli:</i> '+rows.join('; ')+(n>4?'; … e così via fino al '+n+'°':''),
      '<i>Sommo tutte le aree:</i> ≈ '+it(S,4),
      '<i>Area vera con il teorema fondamentale:</i> '+c.ft,
      '<i>Differenza:</i> '+it(Math.abs(S-c.ex),4)+'. Più rettangoli, più si avvicina');
  };
  $('idS').addEventListener('change', () => draws['integrali-definiti']());
  $('idN').addEventListener('input', () => draws['integrali-definiti']());

  const INT = (a,b) => '<span class="sig"><span>'+b+'</span><b>∫</b><span>'+a+'</span></span>';
  video('integrali-definiti', [
    { show:'<h3>Integrali definiti</h3>'+INT('a','b')+' f(x) dx = area sotto il grafico tra a e b',
      say:'Integrali definiti. L\'integrale da a a b di f di x è l\'area sotto il grafico di f, tra x uguale a e x uguale b.' },
    { show:'x² su [0, 2] con 2 rettangoli: larghezza 2/2 = 1 · mezzi 0,5 e 1,5',
      say:'Esempio: x al quadrato tra zero e due. Non so l\'area sotto la curva, ma so quella dei rettangoli. Con due rettangoli, ognuno largo uno, i punti di mezzo sono zero virgola cinque e uno virgola cinque.' },
    { show:'0,5² · 1 = 0,25 · 1,5² · 1 = 2,25 · somma = 2,5',
      say:'Il primo rettangolo è alto zero virgola cinque al quadrato, zero virgola venticinque. Il secondo uno virgola cinque al quadrato, due virgola venticinque. Sommo: due virgola cinque.' },
    { show:'4 rettangoli larghi 0,5: (0,0625 + 0,5625 + 1,5625 + 3,0625) · 0,5 = 2,625',
      say:'Con quattro rettangoli larghi zero virgola cinque: le altezze sono zero virgola zero sei, zero virgola cinquantasei, uno virgola cinquantasei, tre virgola zero sei. Sommo e moltiplico per zero virgola cinque: due virgola sei due cinque. Si avvicina a otto terzi, due virgola sei sei sei.' },
    { show:'Teorema fondamentale: '+INT('a','b')+' f(x) dx = F(b) − F(a) · F primitiva di f',
      say:'Il teorema fondamentale del calcolo dice che per l\'area basta una primitiva: l\'integrale da a a b è F di b meno F di a.' },
    { show:'Perché: A(1,1) − A(1) = 1,331/3 − 1/3 ≈ 0,1104 ≈ f(1) · 0,1 = 0,1',
      say:'Perché? Chiamo A di x l\'area da zero fino a x. Se sposto x da uno a uno virgola uno, aggiungo una striscia sottile: circa zero virgola undici. È quasi un rettangolo alto f di uno, cioè uno, e largo zero virgola uno. Quindi la derivata dell\'area è f: l\'area è una primitiva.' },
    { show:INT(0,2)+' x² dx = ['+FR('x³','3')+']<sub>0</sub><sup>2</sup> = '+FR('8','3')+' − 0 = '+FR('8','3')+' ≈ 2,667',
      say:'Allora: la primitiva di x al quadrato è x al cubo su tre. In due vale otto terzi, in zero vale zero. L\'area è otto terzi, circa due virgola sei sei sette. Proprio dove andavano i rettangoli.' },
    { show:'Esercizio: '+INT(0,2)+' (x² + 1) dx · F(x) = '+FR('x³','3')+' + x · F′ = x² + 1 ✓',
      say:'Esercizio: integrale da zero a due di x al quadrato più uno. La primitiva è x al cubo su tre più x. Controllo: derivata x al quadrato più uno.' },
    { show:'F(2) = '+FR('8','3')+' + 2 = '+FR('8','3')+' + '+FR('6','3')+' = '+FR('14','3')+' · F(0) = 0 → '+FR('14','3')+' ≈ 4,67',
      say:'F di due: otto terzi più due, cioè otto terzi più sei terzi, quattordici terzi. F di zero: zero. Il risultato è quattordici terzi, circa quattro virgola sessantasette.' },
    { show:'Attenzione: sin x su [0, 2π]: 2 + (−2) = 0, ma area vera = 2 + |−2| = 4',
      say:'Attenzione: dove la funzione è sotto l\'asse, l\'integrale conta negativo. Seno da zero a pi greco fa due, da pi greco a due pi greco fa meno due. L\'integrale totale è zero, ma l\'area vera è due più due, quattro.' },
    { show:'Improprio: '+INT(1,'M')+' '+FR('1','x²')+' dx = 1 − '+FR('1','M')+' → 1 · '+INT(1,'M')+' '+FR('1','x')+' dx = ln M → +∞',
      say:'Ultimo: gli integrali fino a infinito. Da uno a M di uno su x al quadrato fa uno meno uno su M, che tende a uno: converge. Da uno a M di uno su x fa logaritmo di M, che va a più infinito: diverge. Come le serie: converge solo se p è maggiore di uno.' }
  ]);

  guided('integrali-definiti', 'lavagna-integrali-definiti', [
    { h:'Passo 1 · Primitiva di x² + 1:', type:'choice', ans:1,
      opts:['2x + C','x³/3 + x','x³ + x'],
      ok:'Giusto: x² → x³/3 e 1 → x. Controllo: (x³/3 + x)′ = x² + 1 ✓. La C non serve: (F(b) + C) − (F(a) + C) = F(b) − F(a).', bad:'xᵃ → x<sup>a+1</sup>/(a + 1). E 1 → x.' },
    { h:'Passo 2 · F(2) = 2³/3 + 2 = ?', type:'nums', ans:[14/3],
      html:'F(2) = '+inp('F(2)'),
      ok:'Sì: 8/3 + 6/3 = 14/3.', bad:'8/3 + 2 = 8/3 + 6/3.' },
    { h:'Passo 3 · F(0) = 0³/3 + 0 = ?', type:'nums', ans:[0],
      html:'F(0) = '+inp('F(0)'),
      ok:'Esatto: 0/3 + 0 = 0.', bad:'Metti 0 al posto di x.' },
    { h:'Passo 4 · Risultato: F(2) − F(0).', type:'nums', ans:[14/3],
      html:INT(0,2)+' (x² + 1) dx = '+inp('risultato'),
      ok:'Perfetto: 14/3 − 0 = 14/3 ≈ 4,67. Controllo a occhio: f va da 1 a 5 su un tratto lungo 2, quindi l\'area sta tra 1 · 2 = 2 e 5 · 2 = 10 ✓', bad:'14/3 − 0.' }
  ], '<b>Fatto!</b> '+INT(0,2)+' (x² + 1) dx = [x³/3 + x]<sub>0</sub><sup>2</sup> = 14/3 − 0 = 14/3. Schema: primitiva → F(b) → F(a) → sottrai.');

  EX['integrali-definiti'] = [
    { id:'e1', type:'num', lbl:'integrale', q:INT(0,1)+' x² dx', a:1/3, hint:'Primitiva x³/3.', sol:SV(
      '<i>Primitiva:</i> ∫ x² dx = '+FR('x³','3'),
      '<i>F(1):</i> 1/3',
      '<i>F(0):</i> 0',
      '<i>F(1) − F(0):</i> <b>1/3</b>') },
    { id:'e2', type:'num', lbl:'integrale', q:INT(0,'π')+' sin x dx', a:2, hint:'Primitiva −cos x. cos π = −1.', sol:SV(
      '<i>Primitiva:</i> ∫ sin x dx = −cos x',
      '<i>F(π):</i> −cos π = −(−1) = 1',
      '<i>F(0):</i> −cos 0 = −1',
      '<i>F(π) − F(0):</i> 1 − (−1) = <b>2</b>') },
    { id:'e3', type:'num', lbl:'integrale', q:INT(1,'e')+' '+FR('1','x')+' dx', a:1, hint:'Primitiva ln x.', sol:SV(
      '<i>Primitiva:</i> ln x (x &gt; 0 tra 1 ed e)',
      '<i>F(e):</i> ln e = 1',
      '<i>F(1):</i> ln 1 = 0',
      '<i>Differenza:</i> 1 − 0 = <b>1</b>') },
    { id:'e4', type:'num', lbl:'integrale', q:INT('−1',1)+' x³ dx', a:0, hint:'x³ è dispari.', sol:SV(
      '<i>Primitiva:</i> ∫ x³ dx = '+FR('x⁴','4'),
      '<i>F(1):</i> 1/4',
      '<i>F(−1):</i> (−1)⁴/4 = 1/4',
      '<i>Differenza:</i> 1/4 − 1/4 = <b>0</b>',
      '<i>Lo potevo dire subito:</i> x³ è dispari e l\'intervallo [−1, 1] è simmetrico') },
    { id:'e5', type:'num', lbl:'integrale', q:INT(0,'ln 2')+' eˣ dx', a:1, hint:'Primitiva eˣ. e<sup>ln 2</sup> = 2.', sol:SV(
      '<i>Primitiva:</i> eˣ',
      '<i>F(ln 2):</i> e<sup>ln 2</sup> = 2 (e e ln si annullano)',
      '<i>F(0):</i> e⁰ = 1',
      '<i>Differenza:</i> 2 − 1 = <b>1</b>') },
    { id:'e6', type:'num', lbl:'area', q:'Area tra y = x e y = x² per x tra 0 e 1', a:1/6, hint:'Tra 0 e 1, x sta sopra x². Area = '+INT(0,1)+' (x − x²) dx.', sol:SV(
      '<i>Chi sta sopra tra 0 e 1?</i> Con x = 0,5: x = 0,5 e x² = 0,25, quindi y = x sta sopra',
      '<i>Area = ∫ (sopra − sotto):</i> '+INT(0,1)+' (x − x²) dx',
      '<i>Primitiva:</i> '+FR('x²','2')+' − '+FR('x³','3'),
      '<i>In 1:</i> '+FR('1','2')+' − '+FR('1','3')+' = '+FR('3','6')+' − '+FR('2','6')+' = '+FR('1','6'),
      '<i>In 0:</i> 0',
      '<i>Area:</i> <b>1/6</b>') },
    { id:'e7', type:'num', lbl:'F′(2)', q:'F(x) = '+INT(0,'x')+' t² dt. Quanto vale F′(2)?', a:4, hint:'Teorema fondamentale: F′(x) = f(x).', sol:SV(
      '<i>Teorema fondamentale:</i> se F(x) = '+INT(0,'x')+' f(t) dt, allora F′(x) = f(x)',
      '<i>Qui f(t) = t², quindi:</i> F′(x) = x²',
      '<i>Sostituisco x = 2:</i> F′(2) = 4',
      '<i>Risultato:</i> <b>4</b>, senza calcolare l\'integrale') },
    { id:'e8', type:'num', lbl:'integrale', q:INT(0,1)+' 2x (x² + 1)³ dx', a:15/4, hint:'Sostituzione t = x² + 1, dt = 2x dx. Estremi: t da 1 a 2.', sol:SV(
      '<i>Sostituzione:</i> t = x² + 1, quindi dt = 2x dx',
      '<i>Cambio gli estremi:</i> x = 0 → t = 1; x = 1 → t = 2',
      '<i>Riscrivo (2x dx diventa dt):</i> '+INT(1,2)+' t³ dt',
      '<i>Primitiva:</i> '+FR('t⁴','4'),
      '<i>In 2:</i> 16/4 = 4; <i>in 1:</i> 1/4',
      '<i>Differenza:</i> 4 − '+FR('1','4')+' = '+FR('16','4')+' − '+FR('1','4')+' = <b>15/4</b>') },
    { id:'e9', type:'num', lbl:'integrale', q:INT(1,'+∞')+' '+FR('1','x²')+' dx', a:1, hint:'Integra da 1 a M, poi fai il limite per M → +∞.', sol:SV(
      '<i>Integrale improprio: integro fino a M e poi M → +∞</i>',
      '<i>Primitiva di 1/x² = x<sup>−2</sup>:</i> '+FR('x<sup>−1</sup>','−1')+' = −'+FR('1','x'),
      '<i>Da 1 a M:</i> (−'+FR('1','M')+') − (−'+FR('1','1')+') = 1 − '+FR('1','M'),
      '<i>Limite per M → +∞:</i> 1/M → 0',
      '<i>Risultato:</i> <b>1</b> (converge: p = 2 &gt; 1)') }
  ];
