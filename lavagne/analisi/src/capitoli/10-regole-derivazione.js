  /* ===== capitolo 10: Regole di derivazione ===== */
  order.push('regole-derivazione'); NAMES['regole-derivazione'] = '10 Regole di derivazione';
  const RD = [
    { f:x=>x*x, d:x=>2*x, xr:[-2.5,2.5], yr:[-5,6], n:'2x' },
    { f:x=>x*x*x, d:x=>3*x*x, xr:[-2,2], yr:[-6,8], n:'3x²' },
    { f:Math.sin, d:Math.cos, xr:[-6.3,6.3], yr:[-1.6,1.6], n:'cos x' },
    { f:Math.exp, d:Math.exp, xr:[-3,2], yr:[-1,7.5], n:'eˣ (uguale a f: il grafico arancione copre quello nero)' },
    { f:x=>x>0?Math.log(x):NaN, d:x=>x>0?1/x:NaN, xr:[0,5], yr:[-3,4], n:'1/x', pos:true }
  ];
  draws['regole-derivazione'] = () => {
    const c = RD[+$('rdS').value], t = (+$('rdX').value)/100;
    let x0 = c.xr[0] + t*(c.xr[1]-c.xr[0]); if (c.pos && x0 < 0.15) x0 = 0.15;
    const y0 = c.f(x0), m = c.d(x0);
    plotF($('plotRD'), { xmin:c.xr[0], xmax:c.xr[1], ymin:c.yr[0], ymax:c.yr[1],
      fns:[{f:c.f, color:'--ink', width:2.5}, {f:c.d, color:'--thief', width:2}, {f:x=>y0+m*(x-x0), color:'--cop', dash:true, width:1.5}],
      points:[{x:x0, y:y0, color:'--cop'}, {x:x0, y:Math.max(c.yr[0], Math.min(c.yr[1], m)), color:'--thief'}], vlines:[{x:x0, color:'--muted'}] });
    $('rdOut').innerHTML = 'x₀ = '+it(x0,2)+' · pendenza della tangente = <b class="cop">'+it(m,3)+'</b> = f′(x₀) (punto arancione)<br><span style="font-size:1rem">Qui f′(x) = '+c.n+'.</span>';
  };
  $('rdS').addEventListener('change', () => draws['regole-derivazione']());
  $('rdX').addEventListener('input', () => draws['regole-derivazione']());

  guided('regole-derivazione', 'lavagna-regole-derivazione', [
    { h:'Passo 1 · È una composta: chi sta fuori e chi sta dentro?', type:'choice', ans:0,
      opts:['fuori: u⁵ · dentro: u = 3x + 1','fuori: 3x + 1 · dentro: x⁵','è un prodotto, non una composta'],
      ok:'Giusto: prima calcoli 3x + 1, poi lo elevi alla quinta. L\'ultima operazione è quella "fuori".', bad:'Se metti un numero al posto di x, cosa fai per ultimo?' },
    { h:'Passo 2 · Derivo il fuori, lasciando dentro com\'è: (u⁵)′ = 5u⁴. Quindi…', type:'choice', ans:1,
      opts:['5x⁴','5(3x + 1)⁴','5(3x + 1)⁴ · x'],
      ok:'Sì: dentro resta (3x + 1).', bad:'Al posto di u rimetti quello che c\'era dentro.' },
    { h:'Passo 3 · Moltiplico per la derivata del dentro: (3x + 1)′ = ?', type:'nums', ans:[3],
      html:'(3x + 1)′ = '+inp('derivata del dentro'),
      ok:'Esatto: f′(x) = 5(3x + 1)⁴ · 3 = 15(3x + 1)⁴.', bad:'La derivata di 3x è 3, quella di 1 è 0.' },
    { h:'Passo 4 · Calcolo f′(0) = 15 · (3 · 0 + 1)⁴.', type:'nums', ans:[15],
      html:'f′(0) = '+inp('f′(0)'),
      ok:'Perfetto!', bad:'(0 + 1)⁴ = 1.' }
  ], '<b>Fatto!</b> f′(x) = 5(3x + 1)⁴ · 3 = 15(3x + 1)⁴, quindi f′(0) = 15. Schema della catena: trovo fuori e dentro, derivo il fuori lasciando dentro uguale, moltiplico per la derivata del dentro.');

  EX['regole-derivazione'] = [
    { id:'e1', type:'num', lbl:'f′(2)', q:'f(x) = x³', a:12, hint:'(xᵃ)′ = a x<sup>a−1</sup>.', sol:SV(
      '<i>Regola:</i> (xᵃ)′ = a · x<sup>a−1</sup>, qui a = 3',
      '<i>Derivo:</i> f′(x) = 3 · x<sup>3−1</sup> = 3x²',
      '<i>Sostituisco x = 2:</i> 3 · 2² = 3 · 4 = <b>12</b>') },
    { id:'e2', type:'num', lbl:'f′(1)', q:'f(x) = 5x² − 3x + 7', a:7, hint:'Somma: derivi pezzo per pezzo. La costante 7 ha derivata 0.', sol:SV(
      '<i>Derivo pezzo per pezzo (somma):</i> (5x²)′ − (3x)′ + (7)′',
      '<i>Primo pezzo:</i> (5x²)′ = 5 · 2x = 10x',
      '<i>Secondo pezzo:</i> (3x)′ = 3',
      '<i>Terzo pezzo:</i> (7)′ = 0 (costante)',
      '<i>Metto insieme:</i> f′(x) = 10x − 3',
      '<i>Sostituisco x = 1:</i> 10 − 3 = <b>7</b>') },
    { id:'e3', type:'num', lbl:'f′(0)', q:'f(x) = x · eˣ', a:1, hint:'Prodotto: f′g + f g′.', sol:SV(
      '<i>È un prodotto f · g con</i> f = x, g = eˣ',
      '<i>Derivate dei pezzi:</i> f′ = 1, g′ = eˣ',
      '<i>Regola del prodotto f′g + fg′:</i> 1 · eˣ + x · eˣ',
      '<i>Sostituisco x = 0:</i> e⁰ + 0 · e⁰ = 1 + 0 = <b>1</b>') },
    { id:'e4', type:'num', lbl:'f′(e)', q:'f(x) = x · ln x', a:2, hint:'Prodotto: 1 · ln x + x · (1/x).', sol:SV(
      '<i>Prodotto con</i> f = x, g = ln x',
      '<i>Derivate:</i> f′ = 1, g′ = 1/x',
      '<i>Regola del prodotto:</i> 1 · ln x + x · '+FR('1','x'),
      '<i>Semplifico x · 1/x = 1:</i> f′(x) = ln x + 1',
      '<i>Sostituisco x = e:</i> ln e + 1 = 1 + 1 = <b>2</b>') },
    { id:'e5', type:'num', lbl:'f′(1)', q:'f(x) = '+FR('x','x + 1'), a:0.25, hint:'Quoziente: (f′g − f g′)/g², con f = x e g = x + 1.', sol:SV(
      '<i>Quoziente f/g con</i> f = x, g = x + 1',
      '<i>Derivate:</i> f′ = 1, g′ = 1',
      '<i>Regola (f′g − fg′)/g²:</i> '+FR('1 · (x + 1) − x · 1','(x + 1)²'),
      '<i>Semplifico sopra:</i> x + 1 − x = 1, quindi f′(x) = '+FR('1','(x + 1)²'),
      '<i>Sostituisco x = 1:</i> '+FR('1','(1 + 1)²')+' = '+FR('1','4'),
      '<i>Risultato:</i> <b>1/4</b>') },
    { id:'e6', type:'num', lbl:'f′(0)', q:'f(x) = sin(3x)', a:3, hint:'Catena: fuori sin, dentro 3x.', sol:SV(
      '<i>Composta: fuori sin, dentro 3x</i>',
      '<i>Derivo il fuori lasciando dentro uguale:</i> cos(3x)',
      '<i>Moltiplico per la derivata del dentro:</i> (3x)′ = 3, quindi f′(x) = 3 cos(3x)',
      '<i>Sostituisco x = 0:</i> 3 · cos 0 = 3 · 1 = <b>3</b>') },
    { id:'e7', type:'num', lbl:'f′(1)', q:'f(x) = ln(x² + 1)', a:1, hint:'Catena: (ln u)′ = 1/u, poi per u′ = 2x.', sol:SV(
      '<i>Composta: fuori ln, dentro u = x² + 1</i>',
      '<i>Derivo il fuori:</i> (ln u)′ = 1/u = '+FR('1','x² + 1'),
      '<i>Derivata del dentro:</i> (x² + 1)′ = 2x',
      '<i>Moltiplico:</i> f′(x) = '+FR('2x','x² + 1'),
      '<i>Sostituisco x = 1:</i> '+FR('2','1 + 1')+' = <b>1</b>') },
    { id:'e8', type:'num', lbl:'f′(4)', q:'f(x) = √x', a:0.25, hint:'√x = x<sup>1/2</sup>: usa (xᵃ)′ con a = 1/2.', sol:SV(
      '<i>Riscrivo la radice come potenza:</i> √x = x<sup>1/2</sup>',
      '<i>Regola (xᵃ)′ con a = 1/2:</i> '+FR('1','2')+' · x<sup>1/2 − 1</sup> = '+FR('1','2')+' · x<sup>−1/2</sup>',
      '<i>Esponente negativo = va sotto:</i> x<sup>−1/2</sup> = '+FR('1','√x')+', quindi f′(x) = '+FR('1','2√x'),
      '<i>Sostituisco x = 4:</i> '+FR('1','2 · √4')+' = '+FR('1','2 · 2')+' = <b>1/4</b>') },
    { id:'e9', type:'choice', q:'(arctan x)′ = ?', a:2, opts:['1/cos² x','1/√(1 − x²)','1/(1 + x²)'], hint:'È nella tabellina. La prima è di tan x, la seconda di arcsin x.', sol:SV(
      '<i>Cerco nella tabellina:</i> (arctan x)′ = '+FR('1','1 + x²'),
      '<i>Le altre due:</i> 1/cos² x è (tan x)′, 1/√(1 − x²) è (arcsin x)′',
      '<i>Risultato:</i> <b>1/(1 + x²)</b>') }
  ];
