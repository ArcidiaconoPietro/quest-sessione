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
    { id:'e1', type:'num', lbl:'f′(2)', q:'f(x) = x³', a:12, hint:'(xᵃ)′ = a x<sup>a−1</sup>.', sol:'f′(x) = 3x², f′(2) = 12.' },
    { id:'e2', type:'num', lbl:'f′(1)', q:'f(x) = 5x² − 3x + 7', a:7, hint:'Somma: derivi pezzo per pezzo. La costante 7 ha derivata 0.', sol:'f′(x) = 10x − 3, f′(1) = 7.' },
    { id:'e3', type:'num', lbl:'f′(0)', q:'f(x) = x · eˣ', a:1, hint:'Prodotto: f′g + f g′.', sol:'f′(x) = eˣ + x eˣ, f′(0) = 1 + 0 = 1.' },
    { id:'e4', type:'num', lbl:'f′(e)', q:'f(x) = x · ln x', a:2, hint:'Prodotto: 1 · ln x + x · (1/x).', sol:'f′(x) = ln x + 1, f′(e) = 1 + 1 = 2.' },
    { id:'e5', type:'num', lbl:'f′(1)', q:'f(x) = '+FR('x','x + 1'), a:0.25, hint:'Quoziente: (f′g − f g′)/g², con f = x e g = x + 1.', sol:'[1 · (x + 1) − x · 1]/(x + 1)² = 1/(x + 1)². In x = 1: 1/4.' },
    { id:'e6', type:'num', lbl:'f′(0)', q:'f(x) = sin(3x)', a:3, hint:'Catena: fuori sin, dentro 3x.', sol:'f′(x) = cos(3x) · 3, f′(0) = 3.' },
    { id:'e7', type:'num', lbl:'f′(1)', q:'f(x) = ln(x² + 1)', a:1, hint:'Catena: (ln u)′ = 1/u, poi per u′ = 2x.', sol:'f′(x) = 2x/(x² + 1), f′(1) = 2/2 = 1.' },
    { id:'e8', type:'num', lbl:'f′(4)', q:'f(x) = √x', a:0.25, hint:'√x = x<sup>1/2</sup>: usa (xᵃ)′ con a = 1/2.', sol:'f′(x) = (1/2) x<sup>−1/2</sup> = 1/(2√x), f′(4) = 1/4.' },
    { id:'e9', type:'choice', q:'(arctan x)′ = ?', a:2, opts:['1/cos² x','1/√(1 − x²)','1/(1 + x²)'], hint:'È nella tabellina. La prima è di tan x, la seconda di arcsin x.', sol:'1/(1 + x²).' }
  ];
