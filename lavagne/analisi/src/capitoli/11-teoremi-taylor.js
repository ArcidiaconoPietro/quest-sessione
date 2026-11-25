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
    $('lgOut').innerHTML = 'pendenza della secante = '+FR('f(b) − f(a)','b − a')+' = <b class="thief">'+it(m,3)+'</b> · '+(cs.length ? 'f′(c) = <b class="cop">'+it(m,3)+'</b> in c = '+cs.map(c=>it(c,2)).join(' e c = ') : '')
      + SV('<i>La funzione:</i> f(x) = 0,3x³ − x + 1, con a = −2 e b = '+it(b,2),
        '<i>f(a):</i> 0,3 · (−8) − (−2) + 1 = −2,4 + 2 + 1 = 0,6',
        '<i>f(b):</i> 0,3 · ('+it(b,2)+')³ − ('+it(b,2)+') + 1 ≈ '+it(yb,3),
        '<i>Pendenza della secante:</i> ('+it(yb,3)+' − 0,6)/('+it(b,2)+' + 2) = '+it(yb-ya,3)+'/'+it(b-LGA,2)+' ≈ '+it(m,3),
        '<i>Derivata:</i> f′(x) = 0,9x² − 1',
        '<i>Cerco c con f′(c) = '+it(m,3)+':</i> 0,9c² − 1 = '+it(m,3)+' → c² = ('+it(m,3)+' + 1)/0,9 = '+it((m+1)/0.9,3)+' → c = ±'+it(Math.sqrt(Math.max(0,(m+1)/0.9)),2),
        '<i>Tengo solo i c tra a e b:</i> '+(cs.length ? 'c = '+cs.map(c=>it(c,2)).join(' e c = ') : 'nessuno qui (sposta b)'));
    const T = TY[+$('tyS').value], n = +$('tyN').value;
    const P = x => { let s=0; for (let k=0;k<=n;k++) s += T.c(k)*Math.pow(x,k); return (T.dom && !T.dom(x)) ? NaN : s; };
    plotF($('plotTY'), { xmin:T.xr[0], xmax:T.xr[1], ymin:T.yr[0], ymax:T.yr[1], fns:[{f:T.f, color:'--ink', width:2.5}, {f:P, color:'--thief', width:2}] });
    let poly = T.t.slice(0,n+1).filter(s=>s).join(' ').replace(/^\+ /,''); if (!poly) poly = '0';
    const terms = []; for (let k=0;k<=n;k++) if (T.c(k)) terms.push((T.c(k)<0?'− ':'+ ')+it(Math.abs(T.c(k)*Math.pow(0.5,k)),5));
    $('tyOut').innerHTML = 'Grado '+n+': <b class="thief">'+poly+'</b>' + SV(
      '<i>Metto x = 0,5 in ogni termine del polinomio:</i> '+(terms.length ? terms.join(' ').replace(/^\+ /,'') : '0'),
      '<i>Sommo:</i> polinomio = '+it(P(0.5),5),
      '<i>La funzione vera in 0,5:</i> '+it(T.f(0.5),5),
      '<i>Errore (la parte o-piccolo):</i> '+it(Math.abs(T.f(0.5)-P(0.5)),5)+'. Alza il grado e guarda come scende');
  };
  $('lgB').addEventListener('input', () => draws['teoremi-taylor']());
  $('tyS').addEventListener('change', () => draws['teoremi-taylor']());
  $('tyN').addEventListener('input', () => draws['teoremi-taylor']());

  video('teoremi-taylor', [/*problema*/
    { show:'<b>Il caso</b><br><span class="lim">lim<span>x→0</span></span> <span class="fr"><span>x − sin x</span><span>x³</span></span> = ?', say:'Il caso: limite per x che tende a zero di x meno seno di x, diviso x al cubo.' },
    { show:'<b>Provo con quello che so</b><br>Sostituisco: (0 − 0)/0 = 0/0. Scompongo? Non è un polinomio. Limite notevole sin x/x → 1? Divido per x: (1 − sin x/x)/x² → (1 − 1)/0 = 0/0 di nuovo.', say:'Sostituisco: zero su zero. Scomporre non si può, non è un polinomio. Uso il limite notevole seno di x su x? Dividendo per x torno a zero su zero.' },
    { show:'<b>Perché si inceppa</b><br>Il limite notevole dice solo che sin x ≈ x vicino a 0. Ma qui x − sin x cancella proprio quella parte: serve sapere <b>di quanto</b> sin x è diverso da x. Con x = 0,1: 0,1 − 0,0998334 = 0,0001666, un numero piccolissimo.', say:'Il limite notevole dice solo che seno di x è circa x. Ma qui x meno seno di x cancella proprio quella parte: serve sapere di quanto seno di x è diverso da x.' },
    { show:'<b>Quindi serve</b><br><b>Taylor</b>: sin x = x − x³/6 + o(x³), un polinomio più preciso della sola x. Oppure <b>De L\'Hôpital</b>: con 0/0 derivo sopra e sotto. E i teoremi di Rolle e Lagrange che ci stanno dietro.', say:'Serve Taylor, che scrive seno di x come x meno x al cubo sesti più un errore piccolissimo. Oppure De L\'Hôpital, che con zero su zero deriva sopra e sotto. E i teoremi di Rolle e Lagrange che ci stanno dietro.' },
    { show:'<b>Lo userai per</b><br>Tutti i limiti con sin, cos, eˣ, ln mescolati, dove i notevoli non bastano. Lagrange per dimostrare che f′ &gt; 0 vuol dire f crescente.', say:'Lo userai per i limiti con seno, coseno, esponenziale e logaritmo mescolati, e Lagrange per dimostrare che derivata positiva vuol dire funzione crescente.' },
    { show:'<h3>Rolle, Lagrange, De L\'Hôpital, Taylor</h3>Due teoremi di teoria, due attrezzi per i limiti',
      say:'Quattro attrezzi: Rolle e Lagrange per la teoria, De L\'Hôpital e Taylor per calcolare i limiti.' },
    { show:'Rolle: f(a) = f(b) ⇒ f′(c) = 0 · x² − 2x su [0, 2]: f(0) = 0, f(2) = 4 − 4 = 0 · 2c − 2 = 0 → c = 1',
      say:'Rolle: se una funzione parte e arriva alla stessa quota, da qualche parte la derivata è zero. Esempio: x al quadrato meno due x tra zero e due. In zero vale zero, in due vale quattro meno quattro, zero. La derivata è due x meno due, che fa zero in x uguale a uno.' },
    { show:'Lagrange: '+FR('f(b) − f(a)','b − a')+' = f′(c) · x² su [1, 3]: '+FR('9 − 1','3 − 1')+' = 4 = 2c → c = 2',
      say:'Lagrange: da qualche parte la pendenza è uguale a quella media. Con x al quadrato tra uno e tre: nove meno uno, diviso tre meno uno, fa quattro. La derivata due c vale quattro in c uguale a due.' },
    { show:'Conseguenza: f′ &gt; 0 ⇒ f crescente · f(x₂) − f(x₁) = f′(c) · (x₂ − x₁) &gt; 0',
      say:'La conseguenza che usi sempre: se la derivata è positiva, la funzione cresce. Perché per Lagrange f di x due meno f di x uno è f primo di c per x due meno x uno, e sono due numeri positivi.' },
    { show:'De L\'Hôpital: 0/0 o ∞/∞ → '+FR('f′','g′')+' · '+LIMX('0')+' '+FR('1 − cos x','x²')+' : 0/0',
      say:'De L\'Hôpital: con zero su zero o infinito su infinito, derivo sopra e sotto separatamente. Esempio: uno meno coseno di x su x al quadrato. In zero viene uno meno uno su zero, zero su zero.' },
    { show:FR('sin x','2x')+' → ancora 0/0 → '+FR('cos x','2')+' → '+FR('cos 0','2')+' = '+FR('1','2'),
      say:'Derivo: sopra seno di x, sotto due x. Ancora zero su zero. Derivo di nuovo: sopra coseno di x, sotto due. In zero: coseno di zero diviso due, un mezzo.' },
    { show:'Taylor: eˣ = 1 + x + '+FR('x²','2')+' + '+FR('x³','6')+' + … · in 0,5: 1 + 0,5 + 0,125 + 0,0208 = 1,6458 ≈ 1,6487',
      say:'Taylor: un polinomio che copia la funzione vicino a zero. Per e alla x: uno più x più x al quadrato mezzi più x al cubo sesti. In zero virgola cinque: uno più zero virgola cinque più zero virgola centoventicinque più zero virgola zero due, uno virgola sei quattro cinque. Il valore vero è uno virgola sei quattro otto. Quasi uguale.' },
    { show:'sin x = x − '+FR('x³','6')+' + o(x³) · in 0,5: 0,5 − 0,0208 = 0,4792 ≈ 0,4794',
      say:'Per il seno: x meno x al cubo sesti, più o piccolo di x al cubo. In zero virgola cinque fa zero virgola quattro sette nove due, il vero è zero virgola quattro sette nove quattro.' },
    { show:'Esercizio: '+LIMX('0')+' '+FR('eˣ − 1 − x','x²')+' · forma '+FR('1 − 1 − 0','0')+' = 0/0',
      say:'Esercizio: e alla x meno uno meno x, diviso x al quadrato. In zero viene uno meno uno meno zero su zero: zero su zero.' },
    { show:'Sotto x² → sviluppo fino a x²: (1 + x + '+FR('x²','2')+' + o(x²)) − 1 − x = '+FR('x²','2')+' + o(x²)',
      say:'Sotto c\'è x al quadrato, quindi sviluppo e alla x fino a x al quadrato: uno più x più x al quadrato mezzi più o piccolo. Tolgo uno e tolgo x: resta x al quadrato mezzi più o piccolo di x al quadrato.' },
    { show:FR('x²/2 + o(x²)','x²')+' = '+FR('1','2')+' + '+FR('o(x²)','x²')+' → '+FR('1','2')+' + 0 = <b>'+FR('1','2')+'</b>',
      say:'Divido per x al quadrato: un mezzo più o piccolo di x al quadrato su x al quadrato, che tende a zero. Il limite è un mezzo.' },
    { show:'Controllo: x = 0,1 → (1,10517 − 1 − 0,1)/0,01 ≈ 0,517',
      say:'Controllo con x uguale a zero virgola uno: e alla zero virgola uno è uno virgola uno zero cinque uno sette. Tolgo uno virgola uno, divido per zero virgola zero uno: circa zero virgola cinque uno sette. Vicino a un mezzo.' }
  ]);

  guided('teoremi-taylor', 'lavagna-teoremi-taylor', [
    { h:'Passo 1 · Sostituisco x = 0. Che forma esce?', type:'choice', ans:0,
      opts:['0/0','1/0','0'],
      ok:'Giusto: sopra e⁰ − 1 − 0 = 0, sotto 0. Forma indeterminata.', bad:'Sopra: e⁰ − 1 − 0. Sotto: 0².' },
    { h:'Passo 2 · Sotto c\'è x², quindi sviluppo eˣ fino a x². Quale?', type:'choice', ans:2,
      opts:['eˣ = 1 + x + o(x)','eˣ = x + x²/2 + o(x²)','eˣ = 1 + x + x²/2 + o(x²)'],
      ok:'Esatto. Mi fermo a x² perché sotto c\'è x²: i termini dopo (x³/6, …) divisi per x² vanno a 0 e finiscono in o(x²).', bad:'eˣ = 1 + x + x²/2 + x³/6 + …: fermati a x².' },
    { h:'Passo 3 · Sopra: (1 + x + x²/2 + o(x²)) − 1 − x = ?', type:'choice', ans:1,
      opts:['x + x²/2 + o(x²)','x²/2 + o(x²)','o(x²)'],
      ok:'Sì: 1 + x + x²/2 + o(x²) − 1 − x = (1 − 1) + (x − x) + x²/2 + o(x²) = x²/2 + o(x²).', bad:'Togli 1 e togli x.' },
    { h:'Passo 4 · Divido per x² e faccio il limite per x → 0. Ricorda: o(x²)/x² → 0.', type:'nums', ans:[0.5],
      html:LIMX('0')+' ('+FR('1','2')+' + '+FR('o(x²)','x²')+') = '+inp('risultato'),
      ok:'Perfetto: (x²/2)/x² = 1/2, o(x²)/x² → 0, quindi 1/2 + 0 = 1/2. Controllo con x = 0,1: (e<sup>0,1</sup> − 1 − 0,1)/0,01 ≈ (1,10517 − 1,1)/0,01 ≈ 0,517 ✓', bad:'1/2 + 0 = …' }
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
