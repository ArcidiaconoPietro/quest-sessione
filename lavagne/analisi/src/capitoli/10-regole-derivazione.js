  /* ===== capitolo 10: Regole di derivazione ===== */
  order.push('regole-derivazione'); NAMES['regole-derivazione'] = '10 Regole di derivazione';
  const RD = [
    { f:x=>x*x, d:x=>2*x, xr:[-2.5,2.5], yr:[-5,6], n:'2x', c:x=>'2 · ('+it(x,2)+') = '+it(2*x,3) },
    { f:x=>x*x*x, d:x=>3*x*x, xr:[-2,2], yr:[-6,8], n:'3x²', c:x=>'3 · ('+it(x,2)+')² = 3 · '+it(x*x,4)+' = '+it(3*x*x,3) },
    { f:Math.sin, d:Math.cos, xr:[-6.3,6.3], yr:[-1.6,1.6], n:'cos x', c:x=>'cos('+it(x,2)+') = '+it(Math.cos(x),3) },
    { f:Math.exp, d:Math.exp, xr:[-3,2], yr:[-1,7.5], n:'eˣ (uguale a f: il grafico arancione copre quello nero)', c:x=>'e<sup>'+it(x,2)+'</sup> = '+it(Math.exp(x),3) },
    { f:x=>x>0?Math.log(x):NaN, d:x=>x>0?1/x:NaN, xr:[0,5], yr:[-3,4], n:'1/x', pos:true, c:x=>'1/'+it(x,2)+' = '+it(1/x,3) }
  ];
  draws['regole-derivazione'] = () => {
    const c = RD[+$('rdS').value], t = (+$('rdX').value)/100;
    let x0 = c.xr[0] + t*(c.xr[1]-c.xr[0]); if (c.pos && x0 < 0.15) x0 = 0.15;
    const y0 = c.f(x0), m = c.d(x0);
    plotF($('plotRD'), { xmin:c.xr[0], xmax:c.xr[1], ymin:c.yr[0], ymax:c.yr[1],
      fns:[{f:c.f, color:'--ink', width:2.5}, {f:c.d, color:'--thief', width:2}, {f:x=>y0+m*(x-x0), color:'--cop', dash:true, width:1.5}],
      points:[{x:x0, y:y0, color:'--cop'}, {x:x0, y:Math.max(c.yr[0], Math.min(c.yr[1], m)), color:'--thief'}], vlines:[{x:x0, color:'--muted'}] });
    $('rdOut').innerHTML = 'x₀ = '+it(x0,2)+' · pendenza della tangente = <b class="cop">'+it(m,3)+'</b> = f′(x₀) (punto arancione)' + SV(
      '<i>Regola della tabellina:</i> f′(x) = '+c.n,
      '<i>Sostituisco x₀ = '+it(x0,2)+':</i> f′(x₀) = '+c.c(x0),
      '<i>Controllo con il rapporto incrementale, h = 0,01:</i> (f('+it(x0+0.01,2)+') − f('+it(x0,2)+'))/0,01 = ('+it(c.f(x0+0.01),4)+' − '+it(y0,4)+')/0,01 ≈ '+it((c.f(x0+0.01)-y0)/0.01,3)+', quasi uguale ✓');
  };
  $('rdS').addEventListener('change', () => draws['regole-derivazione']());
  $('rdX').addEventListener('input', () => draws['regole-derivazione']());

  video('regole-derivazione', [/*problema*/
    { show:'<b>Il caso</b><br>Derivata di f(x) = (3x + 1)⁵ in x = 0.', say:'Il caso: la derivata di tre x più uno alla quinta, in x uguale a zero.' },
    { show:'<b>Provo con quello che so</b><br>Con la definizione: <span class="lim">lim<span>h→0</span></span> [(3h + 1)⁵ − 1]/h. Devo sviluppare (3h + 1)⁵: sono 6 termini con coefficienti 1, 5, 10, 10, 5, 1 e potenze di 3. Si può, ma è lunghissimo, e con sin(x²) · eˣ non si fa proprio.', say:'Con la definizione dovrei sviluppare tre h più uno alla quinta: sei termini con coefficienti e potenze di tre. Si può, ma è lunghissimo, e con funzioni come seno di x al quadrato per e alla x non si fa proprio.' },
    { show:'<b>Perché si inceppa</b><br>La definizione funziona sempre, ma ogni funzione nuova richiede un limite nuovo. All\'esame non c\'è tempo.', say:'La definizione funziona sempre, ma ogni funzione nuova richiede un limite nuovo, e all\'esame non c\'è tempo.' },
    { show:'<b>Quindi serve</b><br>Una <b>tabellina</b> di derivate fatte una volta per tutte, e <b>regole</b> per combinarle (somma, prodotto, quoziente, catena). Qui: 5(3x + 1)⁴ · 3, in 0 fa 15.', say:'Serve una tabellina di derivate fatte una volta per tutte, e regole per combinarle. Qui con la regola della catena viene quindici in un attimo.' },
    { show:'<b>Lo userai per</b><br>Tutte le derivate dell\'esame: studio di funzione, De L\'Hôpital, Taylor, e al contrario negli integrali.', say:'Lo userai per tutte le derivate dell\'esame: studio di funzione, De L\'Hôpital, Taylor, e al contrario per gli integrali.' },
    { show:'<h3>Regole di derivazione</h3>Una tabellina + cinque regole, invece del limite per h → 0',
      say:'Le regole di derivazione. Con la definizione ogni derivata è un limite lungo. Con una tabellina e cinque regole si fa in un attimo.' },
    { show:'(xᵃ)′ = a · x<sup>a−1</sup> → (x³)′ = 3x² → in x = 2: 3 · 4 = 12',
      say:'Prima regola della tabellina: x alla a si deriva in a per x alla a meno uno. Per esempio x al cubo dà tre x al quadrato. In due vale tre per quattro, dodici.' },
    { show:'Controllo: (2,01³ − 2³)/0,01 = (8,120601 − 8)/0,01 ≈ 12,06 ✓',
      say:'Controllo con il rapporto incrementale: due virgola zero uno al cubo è otto virgola dodici zero sei zero uno. Tolgo otto, divido per zero virgola zero uno: circa dodici virgola zero sei. Torna.' },
    { show:'(eˣ)′ = eˣ · (ln x)′ = 1/x · (sin x)′ = cos x · (cos x)′ = −sin x',
      say:'Le altre da sapere: la derivata di e alla x è e alla x stessa. Logaritmo di x dà uno su x. Seno dà coseno. Coseno dà meno seno.' },
    { show:'Prodotto: (f · g)′ = f′ · g + f · g′ · (x · eˣ)′ = 1 · eˣ + x · eˣ',
      say:'Regola del prodotto: derivata del primo per il secondo, più il primo per la derivata del secondo. Per x per e alla x: uno per e alla x più x per e alla x.' },
    { show:'In x = 1: e + e = 2e ≈ 5,44 · controllo: (1,01 · e<sup>1,01</sup> − e)/0,01 ≈ 5,48 ✓',
      say:'In uno viene e più e, due e, circa cinque virgola quarantaquattro. Controllo con il rapporto incrementale: circa cinque virgola quarantotto. Giusto. Se avessi moltiplicato solo le derivate avrei avuto e, sbagliato.' },
    { show:'Quoziente: '+FR('f′ · g − f · g′','g²')+' · ('+FR('x','x + 1')+')′ = '+FR('1 · (x + 1) − x · 1','(x + 1)²')+' = '+FR('1','(x + 1)²'),
      say:'Regola del quoziente: derivata del sopra per il sotto, meno il sopra per la derivata del sotto, tutto diviso il sotto al quadrato. Per x su x più uno: uno per x più uno, meno x per uno, cioè uno, diviso x più uno al quadrato.' },
    { show:'Catena: [f(g(x))]′ = f′(g(x)) · g′(x) · (sin(3x))′ = cos(3x) · 3',
      say:'Regola della catena, per le funzioni composte: derivo quella fuori lasciando dentro com\'è, poi moltiplico per la derivata di quella dentro. Seno di tre x: coseno di tre x, per tre.' },
    { show:'In x = 0: 3 · cos 0 = 3 · 1 = 3 · controllo: sin(0,03)/0,01 ≈ 3,00 ✓',
      say:'In zero: tre per coseno di zero, tre per uno, tre. Controllo: seno di zero virgola zero tre diviso zero virgola zero uno fa circa tre. Giusto.' },
    { show:'Esercizio: (3x + 1)⁵ · fuori u⁵, dentro u = 3x + 1',
      say:'Esercizio guidato: tre x più uno, alla quinta. Fuori c\'è la potenza quinta, dentro tre x più uno.' },
    { show:'5(3x + 1)⁴ · 3 = 15(3x + 1)⁴ · f′(0) = 15 · (0 + 1)⁴ = 15 · 1 = 15',
      say:'Derivo il fuori: cinque per tre x più uno alla quarta. Moltiplico per la derivata del dentro, tre. Viene quindici per tre x più uno alla quarta. In zero: tre per zero più uno fa uno, uno alla quarta fa uno, quindici per uno fa quindici.' }
  ]);

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
      ok:'Perfetto: 3 · 0 + 1 = 1, 1⁴ = 1, 15 · 1 = 15. Controllo con h = 0,01: ((1,03)⁵ − 1⁵)/0,01 ≈ (1,1593 − 1)/0,01 ≈ 15,9, vicino a 15 (con h più piccolo si avvicina ancora) ✓', bad:'(0 + 1)⁴ = 1.' }
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
