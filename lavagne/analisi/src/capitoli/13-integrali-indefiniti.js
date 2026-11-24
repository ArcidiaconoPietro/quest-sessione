  /* ===== capitolo 13: Integrali indefiniti ===== */
  order.push('integrali-indefiniti'); NAMES['integrali-indefiniti'] = '13 Integrali indefiniti';
  const II = [
    { F:x=>x*x, f:x=>2*x, x0:1, xr:[-2.5,2.5], yr:[-4,8], n:'2x', Fn:'x²' },
    { F:Math.sin, f:Math.cos, x0:0.8, xr:[-4,4], yr:[-4,4.5], n:'cos x', Fn:'sin x' },
    { F:x=>x>0?Math.log(x):NaN, f:x=>1/x, x0:1, xr:[0,5], yr:[-5,5], n:'1/x', Fn:'ln x' }
  ];
  draws['integrali-indefiniti'] = () => {
    const c = II[+$('iiS').value], C = (+$('iiC').value)/10, m = c.f(c.x0);
    const fns = [-2,-1,0,1,2].map(k => ({f:x=>c.F(x)+k, color:'--muted', width:1}));
    fns.push({f:x=>c.F(x)+C, color:'--thief', width:2.5});
    fns.push({f:x=>c.F(c.x0)+C+m*(x-c.x0), color:'--cop', dash:true, width:1.5});
    plotF($('plotII'), { xmin:c.xr[0], xmax:c.xr[1], ymin:c.yr[0], ymax:c.yr[1], fns, points:[{x:c.x0, y:c.F(c.x0)+C, color:'--cop'}] });
    $('iiOut').innerHTML = 'F(x) = '+c.Fn+' '+(C<0?'− '+it(-C,1):'+ '+it(C,1))+' · pendenza in x₀ = '+it(c.x0,1)+': <b class="cop">'+it(m,3)+'</b> = f(x₀), qualunque sia C';
  };
  $('iiS').addEventListener('change', () => draws['integrali-indefiniti']());
  $('iiC').addEventListener('input', () => draws['integrali-indefiniti']());

  guided('integrali-indefiniti', 'lavagna-integrali-indefiniti', [
    { h:'Passo 1 · Per parti: chi derivo (f) e chi integro (g′)?', type:'choice', ans:0,
      opts:['f = x (da derivare), g′ = eˣ (da integrare)','f = eˣ, g′ = x','non serve, è immediato'],
      ok:'Giusto: derivata di x è 1 (più semplice), e eˣ integrato resta eˣ.', bad:'Il polinomio derivato si semplifica. eˣ integrato resta uguale.' },
    { h:'Passo 2 · f′ = 1 e g = eˣ. Applico ∫ f g′ = f g − ∫ f′ g:', type:'choice', ans:1,
      opts:['x eˣ + ∫ eˣ dx','x eˣ − ∫ eˣ dx','eˣ − ∫ x dx'],
      ok:'Esatto: f g = x eˣ, e ∫ f′ g = ∫ 1 · eˣ dx.', bad:'f g = x · eˣ; f′ g = 1 · eˣ; in mezzo c\'è il meno.' },
    { h:'Passo 3 · ∫ eˣ dx = eˣ. Quindi il risultato è:', type:'choice', ans:2,
      opts:['x eˣ + eˣ + C','x eˣ + C','x eˣ − eˣ + C'],
      ok:'Sì.', bad:'x eˣ − (eˣ) + C.' },
    { h:'Passo 4 · Controllo derivando: (x eˣ − eˣ)′ = eˣ + x eˣ − eˣ = ? Quanto vale in x = 1, se scrivo il risultato come k · e (scrivi k)?', type:'nums', ans:[1],
      html:'(x eˣ − eˣ)′ in x = 1 = '+inp('k','3em')+' · e',
      ok:'Perfetto: la derivata è x eˣ, che in x = 1 vale e. Torna la funzione di partenza: il risultato è giusto.', bad:'eˣ e −eˣ si cancellano: resta x eˣ. In x = 1 vale 1 · e.' }
  ], '<b>Fatto!</b> ∫ x eˣ dx = x eˣ − eˣ + C = (x − 1) eˣ + C. Controllo: (x eˣ − eˣ)′ = x eˣ ✓.');

  EX['integrali-indefiniti'] = [
    { id:'e1', type:'choice', q:'∫ (3x² + 2x) dx', a:0, opts:['x³ + x² + C','6x + 2 + C','x³ + 2x² + C'], hint:'xᵃ → x<sup>a+1</sup>/(a + 1), pezzo per pezzo.', sol:SV(
      '<i>Spezzo (linearità):</i> ∫ 3x² dx + ∫ 2x dx',
      '<i>Primo pezzo, regola xᵃ → x<sup>a+1</sup>/(a + 1):</i> 3 · '+FR('x³','3')+' = x³',
      '<i>Secondo pezzo:</i> 2 · '+FR('x²','2')+' = x²',
      '<i>Metto insieme:</i> <b>x³ + x² + C</b>',
      '<i>Controllo derivando:</i> (x³ + x²)′ = 3x² + 2x ✓') },
    { id:'e2', type:'choice', q:'∫ cos(2x) dx', a:1, opts:['sin(2x) + C','sin(2x)/2 + C','2 sin(2x) + C'], hint:'f(ax + b) → F(ax + b)/a.', sol:SV(
      '<i>Sostituzione:</i> t = 2x, dt = 2 dx, quindi dx = dt/2',
      '<i>Riscrivo:</i> ∫ cos t · '+FR('dt','2')+' = '+FR('1','2')+' ∫ cos t dt',
      '<i>Integro:</i> '+FR('1','2')+' sin t + C',
      '<i>Rimetto t = 2x:</i> <b>'+FR('sin(2x)','2')+' + C</b>',
      '<i>Controllo:</i> (sin(2x)/2)′ = cos(2x) · 2 / 2 = cos(2x) ✓') },
    { id:'e3', type:'choice', q:'∫ '+FR('2x','x² + 1')+' dx', a:2, opts:['2x · arctan x + C','arctan(x²) + C','ln(x² + 1) + C'], hint:'Sopra c\'è la derivata di quello che sta sotto.', sol:SV(
      '<i>Guardo sotto:</i> g(x) = x² + 1, la sua derivata è g′(x) = 2x',
      '<i>Sopra c\'è proprio 2x = g′:</i> è della forma ∫ g′/g dx',
      '<i>Regola:</i> ∫ g′/g dx = ln |g| + C',
      '<i>Applico:</i> ln |x² + 1| + C = <b>ln(x² + 1) + C</b> (x² + 1 è sempre positivo)') },
    { id:'e4', type:'choice', q:'∫ x cos x dx', a:0, opts:['x sin x + cos x + C','x sin x − cos x + C','(x²/2) sin x + C'], hint:'Per parti: f = x, g′ = cos x, quindi g = sin x.', sol:SV(
      '<i>Per parti:</i> f = x (da derivare), g′ = cos x (da integrare)',
      '<i>Calcolo:</i> f′ = 1, g = sin x',
      '<i>Formula f g − ∫ f′ g:</i> x sin x − ∫ 1 · sin x dx',
      '<i>Integro sin x:</i> ∫ sin x dx = −cos x',
      '<i>Sostituisco (meno per meno fa più):</i> x sin x − (−cos x) = <b>x sin x + cos x + C</b>') },
    { id:'e5', type:'choice', q:'∫ ln x dx', a:1, opts:['1/x + C','x ln x − x + C','x ln x + C'], hint:'Per parti con ln x · 1: f = ln x, g′ = 1.', sol:SV(
      '<i>Scrivo ln x come ln x · 1 e uso le parti:</i> f = ln x, g′ = 1',
      '<i>Calcolo:</i> f′ = 1/x, g = x',
      '<i>Formula:</i> x ln x − ∫ '+FR('1','x')+' · x dx',
      '<i>Semplifico (1/x) · x = 1:</i> x ln x − ∫ 1 dx',
      '<i>Integro 1:</i> ∫ 1 dx = x',
      '<i>Risultato:</i> <b>x ln x − x + C</b>') },
    { id:'e6', type:'num', lbl:'F(1)', q:'F(x) = ∫ 6x² dx, scelta con F(0) = 0. Quanto vale F(1)?', a:2, hint:'Primitiva: 2x³ + C. F(0) = 0 dice C = 0.', sol:SV(
      '<i>Integro 6x²:</i> 6 · '+FR('x³','3')+' = 2x³, quindi F(x) = 2x³ + C',
      '<i>Uso F(0) = 0:</i> 2 · 0 + C = 0, quindi C = 0',
      '<i>Ora F(x) = 2x³:</i> F(1) = 2 · 1 = <b>2</b>') },
    { id:'e7', type:'num', lbl:'A', q:FR('1','(x − 1)(x + 1)')+' = '+FR('A','x − 1')+' + '+FR('B','x + 1')+'. Quanto vale A?', a:0.5, hint:'Denominatore comune: A(x + 1) + B(x − 1) = 1. Metti x = 1.', sol:SV(
      '<i>Faccio il denominatore comune a destra:</i> '+FR('A(x + 1) + B(x − 1)','(x − 1)(x + 1)'),
      '<i>Uguaglio i numeratori:</i> A(x + 1) + B(x − 1) = 1 per ogni x',
      '<i>Scelgo x = 1 (così sparisce B):</i> A · 2 + B · 0 = 1',
      '<i>Risolvo:</i> 2A = 1, <b>A = 1/2</b>',
      '<i>(Per B, x = −1:</i> −2B = 1, B = −1/2)') },
    { id:'e8', type:'choice', q:'∫ '+FR('eˣ','1 + eˣ')+' dx', a:0, opts:['ln(1 + eˣ) + C','eˣ · ln(1 + eˣ) + C','arctan(eˣ) + C'], hint:'La derivata di 1 + eˣ è eˣ.', sol:SV(
      '<i>Guardo sotto:</i> g = 1 + eˣ, g′ = eˣ',
      '<i>Sopra c\'è eˣ = g′:</i> forma ∫ g′/g dx',
      '<i>Regola:</i> ln |g| + C',
      '<i>Risultato:</i> <b>ln(1 + eˣ) + C</b> (1 + eˣ è sempre positivo)') },
    { id:'e9', type:'choice', q:'∫ '+FR('1','1 + x²')+' dx', a:2, opts:['ln(1 + x²) + C','tan x + C','arctan x + C'], hint:'Tabellina.', sol:SV(
      '<i>Tabellina:</i> (arctan x)′ = '+FR('1','1 + x²'),
      '<i>Lette al contrario:</i> ∫ '+FR('1','1 + x²')+' dx = <b>arctan x + C</b>') }
  ];
