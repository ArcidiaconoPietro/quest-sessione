  /* ===== capitolo 9: Continuità e derivata ===== */
  order.push('continuita-derivata'); NAMES['continuita-derivata'] = '9 Continuità e derivata';
  const LIMH = '<span class="lim">lim<span>h→0</span></span>';
  const DC = [
    { fns:[x=>x*x/2+0.5], pts:[{x:1,y:1}], t:'Limite sinistro per x → 1⁻ = 1 · limite destro per x → 1⁺ = 1 · f(1) = 1. Tutto uguale: <b>continua</b>.' },
    { fns:[x=>x<1?x:NaN, x=>x>=1?x+1:NaN], pts:[{x:1,y:1,open:true},{x:1,y:2}], t:'Limite sinistro per x → 1⁻ = 1 · limite destro per x → 1⁺ = 2. Finiti ma diversi: <b>salto, prima specie</b>.' },
    { fns:[x=>x], pts:[{x:1,y:1,open:true},{x:1,y:2.2}], t:'Limite per x → 1 = 1 (destro e sinistro uguali), ma f(1) = 2,2. Limite ≠ valore: <b>eliminabile</b>. Se ridefinisco f(1) = 1, torna continua.' },
    { fns:[x=>1/(x-1)], pts:[], t:'Limite sinistro per x → 1⁻ = −∞ · limite destro per x → 1⁺ = +∞. Infiniti: <b>seconda specie</b>.' }
  ];
  const DV = [
    { f:x=>x*x, x0:1, m:2, xr:[-1,3], yr:[-1.5,6], t:'Il rapporto tende a 2 per h → 0: f′(1) = 2.' },
    { f:Math.sin, x0:0, m:1, xr:[-3,3], yr:[-1.6,1.6], t:'Il rapporto tende a 1 per h → 0: f′(0) = 1. (È il limite notevole sin h / h del capitolo 8!)' },
    { f:Math.abs, x0:0, m:null, xr:[-2,2], yr:[-1,2], t:'Con h &gt; 0 il rapporto vale sempre 1, con h &lt; 0 vale sempre −1. Destra e sinistra diverse: il limite per h → 0 non esiste, |x| <b>non è derivabile</b> in 0 (punto angoloso).' }
  ];
  draws['continuita-derivata'] = () => {
    const d = DC[+$('dcS').value];
    plotF($('plotDC'), { xmin:-1, xmax:3, ymin:-3, ymax:4, fns:d.fns.map(f=>({f, color:'--ink', width:2.5})), points:d.pts.map(p=>({...p, color:'--thief'})), vlines:[{x:1, color:'--muted', label:'x₀ = 1'}] });
    $('dcOut').innerHTML = '<span style="font-size:1rem">'+d.t+'</span>';
    const c = DV[+$('dvS').value]; let h = (+$('dvH').value)/100 * 1.5; if (Math.abs(h) < 0.01) h = 0.01;
    const y0 = c.f(c.x0), y1 = c.f(c.x0+h), m = (y1-y0)/h;
    const fns = [{f:c.f, color:'--ink', width:2}, {f:x=>y0+m*(x-c.x0), color:'--thief', width:2}];
    if (c.m!==null) fns.push({f:x=>y0+c.m*(x-c.x0), color:'--cop', dash:true, width:1.5});
    plotF($('plotDV'), { xmin:c.xr[0], xmax:c.xr[1], ymin:c.yr[0], ymax:c.yr[1], fns, points:[{x:c.x0,y:y0,color:'--cop'},{x:c.x0+h,y:y1,color:'--thief'}] });
    $('dvOut').innerHTML = 'h = '+it(h,3)+' · '+FR('f(x₀ + h) − f(x₀)','h')+' = <b class="thief">'+it(m,4)+'</b><br><span style="font-size:1rem">'+c.t+'</span>';
  };
  $('dcS').addEventListener('change', () => draws['continuita-derivata']());
  $('dvS').addEventListener('change', () => draws['continuita-derivata']());
  $('dvH').addEventListener('input', () => draws['continuita-derivata']());

  guided('continuita-derivata', 'lavagna-continuita-derivata', [
    { h:'Passo 1 · f(3 + h) = (3 + h)² = 9 + 6h + h². Quanto fa f(3 + h) − f(3)?', type:'choice', ans:1,
      opts:['9 + 6h + h²','6h + h²','6h'],
      ok:'Giusto: f(3) = 9, e il 9 se ne va.', bad:'f(3) = 3² = 9. Togli 9 da 9 + 6h + h².' },
    { h:'Passo 2 · Divido per h: (6h + h²)/h = ?', type:'choice', ans:0,
      opts:['6 + h','6h','6 + h²'],
      ok:'Sì: raccolgo h sopra, h(6 + h)/h = 6 + h. Posso semplificare perché h ≠ 0 (h si avvicina a 0 ma non è 0).', bad:'Raccogli h sopra: h(6 + h).' },
    { h:'Passo 3 · Faccio il limite per h → 0.', type:'nums', ans:[6],
      html:'f′(3) = '+LIMH+' (6 + h) = '+inp('f′(3)'),
      ok:'Perfetto: f′(3) = 6. La tangente in x₀ = 3 ha pendenza 6.', bad:'Metti h = 0 in 6 + h.' },
    { h:'Passo 4 · Retta tangente: y = f(3) + f′(3)(x − 3) = 9 + 6(x − 3). Scrivila come y = 6x + q.', type:'nums', ans:[-9],
      html:'y = 6x + '+inp('q'),
      ok:'Esatto: 9 + 6x − 18 = 6x − 9.', bad:'9 + 6x − 18 = 6x + …' }
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
