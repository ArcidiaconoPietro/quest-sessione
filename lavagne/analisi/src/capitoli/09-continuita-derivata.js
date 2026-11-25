  /* ===== capitolo 9: Continuità e derivata ===== */
  order.push('continuita-derivata'); NAMES['continuita-derivata'] = '9 Continuità e derivata';
  const LIMH = '<span class="lim">lim<span>h→0</span></span>';
  const DC = [
    { fns:[x=>x*x/2+0.5], pts:[{x:1,y:1}], t:SV(
      '<i>Funzione:</i> f(x) = x²/2 + 1/2',
      '<i>Valore:</i> f(1) = 1/2 + 1/2 = 1',
      '<i>Da sinistra:</i> f(0,9) = 0,81/2 + 0,5 = 0,905; f(0,99) = 0,9801/2 + 0,5 ≈ 0,990 → 1',
      '<i>Da destra:</i> f(1,1) = 1,21/2 + 0,5 = 1,105; f(1,01) ≈ 1,010 → 1',
      '<i>Confronto:</i> sinistro 1 = destro 1 = f(1) = 1, quindi <b>continua</b>') },
    { fns:[x=>x<1?x:NaN, x=>x>=1?x+1:NaN], pts:[{x:1,y:1,open:true},{x:1,y:2}], t:SV(
      '<i>Funzione:</i> f(x) = x se x &lt; 1, f(x) = x + 1 se x ≥ 1',
      '<i>Da sinistra (uso x):</i> f(0,9) = 0,9; f(0,99) = 0,99 → 1',
      '<i>Da destra (uso x + 1):</i> f(1,1) = 2,1; f(1,01) = 2,01 → 2',
      '<i>Confronto:</i> 1 ≠ 2, finiti ma diversi: <b>salto, prima specie</b> (il salto è alto 2 − 1 = 1)') },
    { fns:[x=>x], pts:[{x:1,y:1,open:true},{x:1,y:2.2}], t:SV(
      '<i>Funzione:</i> f(x) = x per x ≠ 1, ma f(1) = 2,2',
      '<i>Da sinistra:</i> f(0,99) = 0,99 → 1. <i>Da destra:</i> f(1,01) = 1,01 → 1',
      '<i>Il limite esiste:</i> '+LIMX('1')+' f(x) = 1',
      '<i>Confronto con il valore:</i> 1 ≠ f(1) = 2,2: <b>eliminabile</b>. Se ridefinisco f(1) = 1, torna continua') },
    { fns:[x=>1/(x-1)], pts:[], t:SV(
      '<i>Funzione:</i> f(x) = 1/(x − 1), in x = 1 non esiste (1/0)',
      '<i>Da sinistra:</i> x = 0,9 → 1/(−0,1) = −10; x = 0,99 → 1/(−0,01) = −100 → −∞',
      '<i>Da destra:</i> x = 1,1 → 1/0,1 = 10; x = 1,01 → 100 → +∞',
      '<i>Confronto:</i> limiti infiniti: <b>seconda specie</b>') }
  ];
  const DV = [
    { f:x=>x*x, x0:1, m:2, xr:[-1,3], yr:[-1.5,6], t:h=>SV(
      '<i>Con questo h:</i> f(1 + h) = ('+it(1+h,3)+')² = '+it((1+h)*(1+h),4)+', f(1) = 1, rapporto = ('+it((1+h)*(1+h),4)+' − 1)/'+it(h,3)+' = '+it(2+h,4),
      '<i>In generale:</i> (1 + h)² − 1 = 1 + 2h + h² − 1 = 2h + h²',
      '<i>Divido per h:</i> (2h + h²)/h = 2 + h',
      '<i>Limite:</i> '+LIMH+' (2 + h) = 2 + 0 = 2, quindi <b>f′(1) = 2</b>') },
    { f:Math.sin, x0:0, m:1, xr:[-3,3], yr:[-1.6,1.6], t:h=>SV(
      '<i>Con questo h:</i> (sin('+it(h,3)+') − sin 0)/'+it(h,3)+' = '+it(Math.sin(h),4)+'/'+it(h,3)+' = '+it(Math.sin(h)/h,4),
      '<i>In generale:</i> (sin(0 + h) − sin 0)/h = (sin h − 0)/h = sin h / h',
      '<i>Limite notevole (capitolo 8):</i> '+LIMH+' sin h / h = 1, quindi <b>f′(0) = 1</b>') },
    { f:Math.abs, x0:0, m:null, xr:[-2,2], yr:[-1,2], t:h=>SV(
      '<i>Con questo h:</i> (|'+it(h,3)+'| − |0|)/'+it(h,3)+' = '+it(Math.abs(h),3)+'/'+it(h,3)+' = '+it(Math.abs(h)/h,0),
      '<i>h &gt; 0:</i> |h| = h, quindi |h|/h = h/h = 1. Esempio h = 0,5: 0,5/0,5 = 1',
      '<i>h &lt; 0:</i> |h| = −h, quindi |h|/h = −h/h = −1. Esempio h = −0,5: 0,5/(−0,5) = −1',
      '<i>Confronto:</i> 1 ≠ −1, il limite per h → 0 non esiste: |x| <b>non è derivabile</b> in 0 (punto angoloso)') }
  ];
  draws['continuita-derivata'] = () => {
    const d = DC[+$('dcS').value];
    plotF($('plotDC'), { xmin:-1, xmax:3, ymin:-3, ymax:4, fns:d.fns.map(f=>({f, color:'--ink', width:2.5})), points:d.pts.map(p=>({...p, color:'--thief'})), vlines:[{x:1, color:'--muted', label:'x₀ = 1'}] });
    $('dcOut').innerHTML = d.t;
    const c = DV[+$('dvS').value]; let h = (+$('dvH').value)/100 * 1.5; if (Math.abs(h) < 0.01) h = 0.01;
    const y0 = c.f(c.x0), y1 = c.f(c.x0+h), m = (y1-y0)/h;
    const fns = [{f:c.f, color:'--ink', width:2}, {f:x=>y0+m*(x-c.x0), color:'--thief', width:2}];
    if (c.m!==null) fns.push({f:x=>y0+c.m*(x-c.x0), color:'--cop', dash:true, width:1.5});
    plotF($('plotDV'), { xmin:c.xr[0], xmax:c.xr[1], ymin:c.yr[0], ymax:c.yr[1], fns, points:[{x:c.x0,y:y0,color:'--cop'},{x:c.x0+h,y:y1,color:'--thief'}] });
    $('dvOut').innerHTML = 'h = '+it(h,3)+' · '+FR('f(x₀ + h) − f(x₀)','h')+' = <b class="thief">'+it(m,4)+'</b>'+c.t(h);
  };
  $('dcS').addEventListener('change', () => draws['continuita-derivata']());
  $('dvS').addEventListener('change', () => draws['continuita-derivata']());
  $('dvH').addEventListener('input', () => draws['continuita-derivata']());

  video('continuita-derivata', [/*problema*/
    { show:'<b>Il caso</b><br>Qual è la <b>pendenza</b> della curva y = x² nel punto x = 1?', say:'Il caso: qual è la pendenza della curva y uguale x al quadrato nel punto x uguale a uno?' },
    { show:'<b>Provo con quello che so</b><br>La pendenza di una retta la sai: (y₂ − y₁)/(x₂ − x₁), servono <b>due</b> punti. Qui ho un punto solo, (1, 1): (1 − 1)/(1 − 1) = 0/0. E la curva non è una retta, la pendenza cambia da punto a punto.', say:'La pendenza di una retta la sai calcolare, ma servono due punti. Qui ne ho uno solo: verrebbe zero su zero. E la curva non è una retta, quindi la pendenza cambia da punto a punto.' },
    { show:'<b>Provo ancora</b><br>Prendo un secondo punto vicino, x = 1,1: (1,21 − 1)/0,1 = 2,1. Con x = 1,01: 2,01. Si avvicina a 2, ma ogni volta è una approssimazione: serve il <b>limite</b> (capitolo 8).', say:'Prendo un secondo punto vicino: con uno virgola uno la pendenza è due virgola uno, con uno virgola zero uno è due virgola zero uno. Si avvicina a due, ma è un\'approssimazione: serve un limite.' },
    { show:'<b>Quindi serve</b><br>La <b>derivata</b>: limite per h → 0 della pendenza tra x₀ e x₀ + h. E prima la <b>continuità</b>, che dice quando una funzione non fa salti.', say:'Serve la derivata, il limite della pendenza tra due punti sempre più vicini. E prima la continuità, che dice quando una funzione non fa salti.' },
    { show:'<b>Lo userai per</b><br>Rette tangenti, velocità, crescenza e massimi nello studio di funzione (capitolo 12). Con la continuità: dire che x³ + x − 1 = 0 ha una soluzione senza trovarla.', say:'Lo userai per le rette tangenti, per sapere dove una funzione cresce e dove ha i massimi, e con la continuità per dire che un\'equazione ha una soluzione senza trovarla.' },
    { show:'<h3>Continuità e derivata</h3>Continua in x₀: '+LIMX('x₀')+' f(x) = f(x₀)',
      say:'Continuità e derivata. Una funzione è continua in x zero se il limite per x che tende a x zero di f di x è uguale a f di x zero. In pratica: si disegna senza staccare la penna.' },
    { show:'Salto: f(x) = x se x &lt; 1, x + 1 se x ≥ 1 · sinistra: 0,9 · 0,99 → 1 · destra: 2,1 · 2,01 → 2',
      say:'Esempio di salto: f vale x prima di uno e x più uno da uno in poi. Da sinistra: zero virgola nove, zero virgola novantanove, si va a uno. Da destra: due virgola uno, due virgola zero uno, si va a due. Uno diverso da due: discontinuità di prima specie, un salto.' },
    { show:'Zeri: x³ + x − 1 · f(0) = −1 &lt; 0 · f(1) = 1 + 1 − 1 = 1 &gt; 0 → c tra 0 e 1',
      say:'Teorema degli zeri. Prendo x al cubo più x meno uno. In zero vale meno uno, negativo. In uno vale uno più uno meno uno, cioè uno, positivo. È continua e cambia segno, quindi tra zero e uno c\'è un punto dove vale zero.' },
    { show:'f(0,5) = 0,125 + 0,5 − 1 = −0,375 · f(0,75) ≈ 0,422 + 0,75 − 1 = 0,172 → c tra 0,5 e 0,75',
      say:'Posso anche stringere. In zero virgola cinque: zero virgola centoventicinque più zero virgola cinque meno uno, fa meno zero virgola trecentosettantacinque, negativo. In zero virgola settantacinque fa circa zero virgola diciassette, positivo. Lo zero è tra zero virgola cinque e zero virgola settantacinque.' },
    { show:'Derivata: rapporto incrementale '+FR('f(x₀ + h) − f(x₀)','h')+' = pendenza della secante',
      say:'Ora la derivata. Prendo due punti sulla curva: x zero e x zero più h. La pendenza della retta che li unisce è f di x zero più h meno f di x zero, diviso h. Si chiama rapporto incrementale.' },
    { show:'f(x) = x², x₀ = 1: h = 0,5 → (2,25 − 1)/0,5 = 2,5 · h = 0,1 → (1,21 − 1)/0,1 = 2,1 · h = 0,01 → 2,01',
      say:'Esempio con x al quadrato in uno. Con h uguale a zero virgola cinque: uno virgola cinque al quadrato è due virgola venticinque, meno uno fa uno virgola venticinque, diviso zero virgola cinque fa due virgola cinque. Con h uguale a zero virgola uno viene due virgola uno. Con zero virgola zero uno, due virgola zero uno. Si avvicina a due.' },
    { show:'(1 + h)² − 1 = 1 + 2h + h² − 1 = 2h + h² → '+FR('2h + h²','h')+' = 2 + h → 2',
      say:'Con il calcolo: uno più h al quadrato è uno più due h più h al quadrato. Tolgo uno: resta due h più h al quadrato. Divido per h: due più h. Per h che tende a zero, tende a due. Quindi la derivata di x al quadrato in uno è due.' },
    { show:'f′(x₀) = '+LIMH+' '+FR('f(x₀ + h) − f(x₀)','h')+' · tangente: y = f(x₀) + f′(x₀)(x − x₀)',
      say:'Questa è la definizione: la derivata è il limite per h che tende a zero del rapporto incrementale. È la pendenza della tangente. La retta tangente è y uguale f di x zero più f primo di x zero per x meno x zero.' },
    { show:'x² in 1: y = 1 + 2(x − 1) = 2x − 1 · in x = 1,1: tangente 1,2, curva 1,21',
      say:'Per x al quadrato in uno: y uguale uno più due per x meno uno, cioè due x meno uno. Controllo: in uno virgola uno la tangente vale uno virgola due e la curva uno virgola ventuno. Quasi uguali.' },
    { show:'|x| in 0: h = 0,5 → 0,5/0,5 = 1 · h = −0,5 → 0,5/(−0,5) = −1 → non derivabile',
      say:'Attenzione al valore assoluto di x in zero. Con h positivo, per esempio zero virgola cinque, il rapporto è zero virgola cinque su zero virgola cinque, uno. Con h negativo, meno zero virgola cinque, viene zero virgola cinque su meno zero virgola cinque, meno uno. Destra e sinistra diverse: non è derivabile. È un punto angoloso, anche se la funzione è continua.' },
    { show:'Derivabile ⇒ continua: f(x₀ + h) − f(x₀) = '+FR('f(x₀ + h) − f(x₀)','h')+' · h → f′(x₀) · 0 = 0',
      say:'Ultimo teorema: se f è derivabile allora è continua. La differenza f di x zero più h meno f di x zero la scrivo come rapporto incrementale per h. Il rapporto tende alla derivata, h tende a zero, quindi il prodotto tende a zero. Cioè f di x zero più h tende a f di x zero: continuità.' }
  ]);

  guided('continuita-derivata', 'lavagna-continuita-derivata', [
    { h:'Passo 1 · f(3 + h) = (3 + h)² = 9 + 6h + h². Quanto fa f(3 + h) − f(3)?', type:'choice', ans:1,
      opts:['9 + 6h + h²','6h + h²','6h'],
      ok:'Giusto: f(3) = 3² = 9, e (9 + 6h + h²) − 9 = 6h + h². (Da dove viene 9 + 6h + h²: (3 + h)² = 3² + 2 · 3 · h + h².)', bad:'f(3) = 3² = 9. Togli 9 da 9 + 6h + h².' },
    { h:'Passo 2 · Divido per h: (6h + h²)/h = ?', type:'choice', ans:0,
      opts:['6 + h','6h','6 + h²'],
      ok:'Sì: raccolgo h sopra, h(6 + h)/h = 6 + h. Posso semplificare perché h ≠ 0 (h si avvicina a 0 ma non è 0).', bad:'Raccogli h sopra: h(6 + h).' },
    { h:'Passo 3 · Faccio il limite per h → 0.', type:'nums', ans:[6],
      html:'f′(3) = '+LIMH+' (6 + h) = '+inp('f′(3)'),
      ok:'Perfetto: 6 + 0 = 6, quindi f′(3) = 6. Controllo con h = 0,1: (3,1² − 9)/0,1 = (9,61 − 9)/0,1 = 6,1, vicino a 6 ✓', bad:'Metti h = 0 in 6 + h.' },
    { h:'Passo 4 · Retta tangente: y = f(3) + f′(3)(x − 3) = 9 + 6(x − 3). Scrivila come y = 6x + q.', type:'nums', ans:[-9],
      html:'y = 6x + '+inp('q'),
      ok:'Esatto: 9 + 6(x − 3) = 9 + 6x − 18 = 6x − 9. Controllo: in x = 3 dà 18 − 9 = 9 = f(3) ✓', bad:'9 + 6x − 18 = 6x + …' }
  ], '<b>Fatto!</b> f′(3) = '+LIMH+' (6 + h) = 6, tangente y = 6x − 9. Schema della definizione: scrivi f(x₀ + h) − f(x₀), semplifica, dividi per h, fai il limite per h → 0.');

  const DISC = ['continua','salto (prima specie)','seconda specie','eliminabile'];
  EX['continuita-derivata'] = [
    { id:'e1', type:'num', lbl:'a', q:'f(x) = x² + 1 se x ≤ 1, f(x) = a · x se x &gt; 1. Per quale a è continua in x = 1?', a:2, hint:'Limite sinistro per x → 1⁻: 1² + 1. Limite destro per x → 1⁺: a · 1. Devono essere uguali.', sol:SV(
      '<i>Continuità in x = 1 vuol dire:</i> limite sinistro = limite destro = f(1)',
      '<i>Limite sinistro (x &lt; 1, uso x² + 1):</i> '+LIMX('1⁻')+' (x² + 1) = 1 + 1 = 2',
      '<i>f(1) (x ≤ 1 comprende 1, uso x² + 1):</i> f(1) = 2',
      '<i>Limite destro (x &gt; 1, uso a · x):</i> '+LIMX('1⁺')+' a · x = a · 1 = a',
      '<i>Impongo che siano uguali:</i> a = 2',
      '<i>Risultato:</i> <b>a = 2</b>') },
    { id:'e2', type:'choice', q:'f(x) = '+FR('x² − 4','x − 2')+' in x = 2', a:3, opts:DISC, hint:'In x = 2 non esiste (0/0). Il limite per x → 2 esiste? Lo hai calcolato nel capitolo 8.', sol:SV(
      '<i>Guardo f(2):</i> sotto 2 − 2 = 0, quindi f(2) non esiste',
      '<i>Calcolo il limite per x → 2:</i> sopra 4 − 4 = 0, sotto 0: forma 0/0',
      '<i>Scompongo sopra:</i> x² − 4 = (x − 2)(x + 2)',
      '<i>Semplifico (x − 2):</i> '+FR('(x − 2)(x + 2)','x − 2')+' = x + 2',
      '<i>Risostituisco:</i> '+LIMX('2')+' (x + 2) = 4, finito',
      '<i>Classifico:</i> limite finito ma f(2) non esiste: <b>eliminabile</b> (basta definire f(2) = 4)') },
    { id:'e3', type:'choice', q:'f(x) = 1 se x ≥ 0, f(x) = −1 se x &lt; 0, in x = 0', a:1, opts:DISC, hint:'Limite destro e sinistro per x → 0: sono finiti? Uguali?', sol:SV(
      '<i>Limite sinistro (x &lt; 0, f = −1):</i> '+LIMX('0⁻')+' f(x) = −1',
      '<i>Limite destro (x &gt; 0, f = 1):</i> '+LIMX('0⁺')+' f(x) = 1',
      '<i>Sono finiti?</i> Sì, −1 e 1',
      '<i>Sono uguali?</i> No, −1 ≠ 1',
      '<i>Classifico:</i> finiti e diversi = <b>salto (prima specie)</b>') },
    { id:'e4', type:'choice', q:'f(x) = '+FR('1','x²')+' in x = 0', a:2, opts:DISC, hint:'Cosa fa 1/x² per x → 0, da destra e da sinistra?', sol:SV(
      '<i>f(0):</i> 1/0, non esiste',
      '<i>Limite destro, provo con i numeri:</i> x = 0,1 → 1/0,01 = 100; x = 0,01 → 10000: va a +∞',
      '<i>Limite sinistro:</i> x = −0,1 → (−0,1)² = 0,01 → 100: anche qui +∞ (il quadrato è sempre positivo)',
      '<i>Classifico:</i> limite infinito = <b>seconda specie</b>') },
    { id:'e5', type:'num', lbl:'f′(5)', q:'f(x) = x². Calcola f′(5) con la definizione.', a:10, hint:'Come nel guidato: f(5 + h) − f(5) = 10h + h². Dividi per h.', sol:SV(
      '<i>Scrivo la definizione:</i> f′(5) = '+LIMH+' '+FR('f(5 + h) − f(5)','h'),
      '<i>Calcolo f(5 + h):</i> (5 + h)² = 25 + 10h + h²',
      '<i>Calcolo f(5):</i> 5² = 25',
      '<i>Sottraggo:</i> 25 + 10h + h² − 25 = 10h + h²',
      '<i>Divido per h (raccolgo h sopra):</i> '+FR('h(10 + h)','h')+' = 10 + h',
      '<i>Limite per h → 0:</i> 10 + 0 = <b>10</b>') },
    { id:'e6', type:'num', lbl:'f′(x₀)', q:'f(x) = 3x + 2. Quanto vale f′(x₀) in un punto qualsiasi?', a:3, hint:'f(x₀ + h) − f(x₀) = 3h. Il grafico è una retta: quale pendenza?', sol:SV(
      '<i>Calcolo f(x₀ + h):</i> 3(x₀ + h) + 2 = 3x₀ + 3h + 2',
      '<i>Sottraggo f(x₀) = 3x₀ + 2:</i> 3x₀ + 3h + 2 − 3x₀ − 2 = 3h',
      '<i>Divido per h:</i> '+FR('3h','h')+' = 3',
      '<i>Limite per h → 0:</i> resta <b>3</b>, per ogni x₀ (la pendenza della retta)') },
    { id:'e7', type:'num', lbl:'q', q:'Retta tangente a y = x² in x₀ = 1, scritta come y = mx + q. Quanto vale q?', a:-1, hint:'f(1) = 1, f′(1) = 2 (dal grafico sopra). y = 1 + 2(x − 1).', sol:SV(
      '<i>Scrivo la formula della tangente:</i> y = f(x₀) + f′(x₀)(x − x₀) con x₀ = 1',
      '<i>Calcolo f(1):</i> 1² = 1',
      '<i>Calcolo f′(1) (come nell\'esercizio 5: f′(x) = 2x):</i> f′(1) = 2',
      '<i>Sostituisco:</i> y = 1 + 2(x − 1)',
      '<i>Sviluppo la parentesi:</i> y = 1 + 2x − 2',
      '<i>Sommo i numeri:</i> y = 2x − 1, quindi <b>q = −1</b>') },
    { id:'e8', type:'choice', q:'f(x) = |x| è derivabile in x = 0?', a:1, opts:['sì, f′(0) = 0','no: punto angoloso','no: non è nemmeno continua'], hint:'Rapporto incrementale con h &gt; 0 e con h &lt; 0.', sol:SV(
      '<i>Rapporto incrementale in 0:</i> '+FR('|0 + h| − |0|','h')+' = '+FR('|h|','h'),
      '<i>Con h &gt; 0:</i> |h| = h, quindi '+FR('h','h')+' = 1: limite destro 1',
      '<i>Con h &lt; 0:</i> |h| = −h, quindi '+FR('−h','h')+' = −1: limite sinistro −1',
      '<i>Confronto:</i> 1 ≠ −1, il limite per h → 0 non esiste',
      '<i>Conclusione:</i> non derivabile, derivate destra e sinistra finite e diverse = <b>punto angoloso</b> (è continua: |h| → 0)') },
    { id:'e9', type:'choice', q:'L\'equazione x³ + x − 1 = 0 ha una soluzione tra 0 e 1?', a:0, opts:['sì, per il teorema degli zeri','no','non si può sapere senza risolverla'], hint:'f(x) = x³ + x − 1 è continua. Calcola f(0) e f(1).', sol:SV(
      '<i>Pongo:</i> f(x) = x³ + x − 1, è un polinomio quindi continua su [0, 1]',
      '<i>Calcolo f(0):</i> 0 + 0 − 1 = −1 &lt; 0',
      '<i>Calcolo f(1):</i> 1 + 1 − 1 = 1 &gt; 0',
      '<i>Segni opposti agli estremi + continua:</i> ipotesi del teorema degli zeri ✓',
      '<i>Conclusione:</i> <b>sì</b>, esiste c in (0, 1) con f(c) = 0') }
  ];
