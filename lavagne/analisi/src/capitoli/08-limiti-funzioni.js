  /* ===== capitolo 8: Limiti di funzioni ===== */
  order.push('limiti-funzioni'); NAMES['limiti-funzioni'] = '8 Limiti di funzioni';
  const LF = [
    { f:x=>(x*x-1)/(x-1), x0:1, xr:[-1,3], yr:[-0.5,4.5], hole:{y:2}, txt:SV('<i>Sostituisco x = 1:</i> (1 − 1)/(1 − 1) = 0/0, in x = 1 la funzione non esiste (pallino vuoto)',
      '<i>Con i numeri da sinistra:</i> x = 0,9 → (0,81 − 1)/(0,9 − 1) = (−0,19)/(−0,1) = 1,9; x = 0,99 → 1,99',
      '<i>Con i numeri da destra:</i> x = 1,1 → (1,21 − 1)/(1,1 − 1) = 0,21/0,1 = 2,1; x = 1,01 → 2,01',
      '<i>Scompongo:</i> x² − 1 = (x − 1)(x + 1), quindi (x² − 1)/(x − 1) = x + 1 per x ≠ 1',
      '<i>Limite:</i> '+LIMX('1')+' (x + 1) = 1 + 1 = <b>2</b>') },
    { f:x=>Math.sin(x)/x, x0:0, xr:[-8,8], yr:[-0.5,1.3], hole:{y:1}, extra:[{f:x=>x, color:'--muted', dash:true, width:1.5}], txt:SV('<i>Sostituisco x = 0:</i> sin 0 / 0 = 0/0, forma indeterminata',
      '<i>Con i numeri da destra:</i> x = 1 → sin 1 / 1 ≈ 0,841; x = 0,5 → 0,479/0,5 ≈ 0,959; x = 0,1 → 0,0998/0,1 ≈ 0,998',
      '<i>Da sinistra:</i> sin(−x) = −sin x, quindi sin(−x)/(−x) = sin x / x: stessi numeri',
      '<i>Perché:</i> la linea tratteggiata è y = x; vicino a 0 sin x è quasi uguale a x, quindi sin x / x è quasi x/x = 1',
      '<i>Limite:</i> '+LIMX('0')+' sin(x)/x = <b>1</b>') },
    { f:x=>1/x, x0:0, xr:[-3,3], yr:[-8,8], txt:SV('<i>Sostituisco x = 0:</i> 1/0, non è un numero: guardo da destra e da sinistra',
      '<i>Da sinistra:</i> x = −0,1 → 1/(−0,1) = −10; x = −0,01 → −100: va a −∞',
      '<i>Da destra:</i> x = 0,1 → 10; x = 0,01 → 100: va a +∞',
      '<i>Confronto:</i> −∞ ≠ +∞, quindi '+LIMX('0')+' 1/x <b>non esiste</b>') },
    { f:x=>x===0?NaN:Math.abs(x)/x, x0:0, xr:[-3,3], yr:[-2,2], txt:SV('<i>Da sinistra, x &lt; 0:</i> |x| = −x, quindi |x|/x = −x/x = −1. Esempio x = −0,5: 0,5/(−0,5) = −1',
      '<i>Da destra, x &gt; 0:</i> |x| = x, quindi |x|/x = x/x = 1. Esempio x = 0,5: 0,5/0,5 = 1',
      '<i>Confronto:</i> −1 ≠ 1, quindi '+LIMX('0')+' |x|/x <b>non esiste</b>') }
  ];
  draws['limiti-funzioni'] = () => {
    const c = LF[+$('lfS').value], d = (+$('lfD').value)/100 * (c.xr[1]-c.x0) * 0.9;
    const xl = c.x0 - d, xr = c.x0 + d, yl = c.f(xl), yr = c.f(xr);
    const pts = [{x:xl, y:Math.max(c.yr[0], Math.min(c.yr[1], yl)), color:'--cop'}, {x:xr, y:Math.max(c.yr[0], Math.min(c.yr[1], yr)), color:'--thief'}];
    if (c.hole) pts.push({x:c.x0, y:c.hole.y, color:'--ink', open:true});
    plotF($('plotLF'), { xmin:c.xr[0], xmax:c.xr[1], ymin:c.yr[0], ymax:c.yr[1], fns:[...(c.extra||[]), {f:c.f, color:'--ink', width:2}], points:pts, vlines:[{x:c.x0, color:'--muted', label:'x₀'}] });
    $('lfOut').innerHTML = 'f('+it(xl,3)+') = <b class="cop">'+it(yl,3)+'</b> · f('+it(xr,3)+') = <b class="thief">'+it(yr,3)+'</b>'+c.txt;
  };
  $('lfS').addEventListener('change', () => draws['limiti-funzioni']());
  $('lfD').addEventListener('input', () => draws['limiti-funzioni']());

  video('limiti-funzioni', [
    { show:'<h3>Limiti di funzioni</h3>'+LIMX('x₀')+' f(x) = L',
      say:'Limiti di funzioni. Si legge: limite per x che tende a x zero di f di x uguale a L. Vuol dire: quando x si avvicina a x zero, f di x si avvicina a L.' },
    { show:'Esempio: '+LIMX('1')+' '+FR('x² − 1','x − 1')+' · sostituisco: '+FR('1 − 1','1 − 1')+' = '+FR('0','0'),
      say:'Primo esempio: limite per x che tende a uno di x al quadrato meno uno, diviso x meno uno. Se sostituisco uno, sopra viene zero e sotto zero. Zero su zero: in x uguale a uno la funzione non esiste.' },
    { show:'x = 0,9 → '+FR('0,81 − 1','0,9 − 1')+' = '+FR('−0,19','−0,1')+' = 1,9 · x = 1,1 → '+FR('1,21 − 1','0,1')+' = 2,1',
      say:'Allora provo con numeri vicini. Con x uguale a zero virgola nove: sopra zero virgola ottantuno meno uno, cioè meno zero virgola diciannove; sotto meno zero virgola uno. Fa uno virgola nove. Con x uguale a uno virgola uno viene due virgola uno.' },
    { show:'x = 0,99 → 1,99 · x = 1,01 → 2,01 · da tutte e due le parti si va verso 2',
      say:'Più vicino ancora: zero virgola novantanove dà uno virgola novantanove, uno virgola zero uno dà due virgola zero uno. Da sinistra e da destra si va verso due.' },
    { show:'Scompongo: x² − 1 = (x − 1)(x + 1) → '+FR('(x − 1)(x + 1)','x − 1')+' = x + 1 → 1 + 1 = <b>2</b>',
      say:'Lo stesso risultato con il calcolo. x al quadrato meno uno è una differenza di quadrati: x meno uno per x più uno. Semplifico x meno uno, che non è zero perché x è vicino a uno ma non uguale. Resta x più uno, e sostituendo uno viene due.' },
    { show:'Destra e sinistra: 1/x · x = −0,1 → −10, x = −0,01 → −100 · x = 0,1 → 10, x = 0,01 → 100',
      say:'Secondo esempio: uno su x vicino a zero. Da sinistra: meno zero virgola uno dà meno dieci, meno zero virgola zero uno dà meno cento, si va a meno infinito. Da destra: dieci, cento, si va a più infinito.' },
    { show:'Sinistro −∞ ≠ destro +∞ → '+LIMX('0')+' '+FR('1','x')+' <b>non esiste</b>',
      say:'Il limite sinistro e il limite destro sono diversi, quindi il limite per x che tende a zero di uno su x non esiste. Il limite esiste solo se destro e sinistro sono uguali.' },
    { show:'∞/∞: '+LIMX('+∞')+' '+FR('3x² + x','x² − 5')+' = '+FR('3 + 1/x','1 − 5/x²')+' → '+FR('3 + 0','1 − 0')+' = 3',
      say:'Quando x tende a più infinito e viene infinito su infinito, divido per la potenza più alta. Tre x al quadrato più x, diviso x al quadrato meno cinque: divido tutto per x al quadrato e ottengo tre più uno su x, diviso uno meno cinque su x al quadrato. Uno su x e cinque su x al quadrato tendono a zero, quindi il limite è tre.' },
    { show:'x = 10 → '+FR('310','95')+' ≈ 3,26 · x = 100 → '+FR('30 100','9995')+' ≈ 3,01',
      say:'Controllo: con x uguale a dieci viene trecentodieci su novantacinque, circa tre virgola ventisei. Con cento circa tre virgola zero uno. Giusto.' },
    { show:'Notevole: '+LIMX('0')+' '+FR('sin x','x')+' = 1 · x = 0,1 → '+FR('0,09983','0,1')+' = 0,9983',
      say:'Ora i limiti notevoli. Il più importante: seno di x diviso x tende a uno per x che tende a zero. Con x uguale a zero virgola uno, seno di zero virgola uno è circa zero virgola zero novantotto, e diviso zero virgola uno fa zero virgola novantanove. Quasi uno.' },
    { show:LIMX('0')+' '+FR('sin(5x)','x')+' = 5 · '+FR('sin(5x)','5x')+' , t = 5x → 0 , = 5 · 1 = <b>5</b>',
      say:'Come si usa: limite per x che tende a zero di seno di cinque x diviso x. Sotto mi serve cinque x, uguale a quello dentro il seno. Allora moltiplico e divido per cinque. Cinque x tende a zero, quindi seno di cinque x su cinque x tende a uno, e il risultato è cinque per uno, cioè cinque.' },
    { show:FR('1 − cos x','x²')+' = ('+FR('sin x','x')+')² · '+FR('1','1 + cos x')+' → 1 · '+FR('1','2')+' = '+FR('1','2'),
      say:'Uno meno coseno di x su x al quadrato: moltiplico sopra e sotto per uno più coseno di x. Sopra viene uno meno coseno al quadrato, cioè seno al quadrato. Così ho seno di x su x, al quadrato, per uno su uno più coseno di x. Tende a uno per un mezzo, cioè un mezzo.' },
    { show:'Schema: 1 sostituisco · 2 0/0 polinomi: scompongo · 3 ∞/∞: potenza più alta · 4 notevoli',
      say:'Riassumo lo schema: primo, sostituisco. Secondo, se viene zero su zero con polinomi, scompongo e semplifico. Terzo, se x va all\'infinito e viene infinito su infinito, divido per la potenza più alta. Quarto, con seno, coseno, logaritmo ed esponenziale uso i limiti notevoli.' }
  ]);

  guided('limiti-funzioni', 'lavagna-limiti-funzioni', [
    { h:'Passo 1 · Sostituisco x = 2. Cosa esce?', type:'choice', ans:1,
      opts:['4/0, quindi infinito','0/0, forma indeterminata','0'],
      ok:'Giusto: 2² − 4 = 0 e 2 − 2 = 0. Forma 0/0: serve semplificare.', bad:'Calcola sopra: 2² − 4. Sotto: 2 − 2.' },
    { h:'Passo 2 · Scompongo il numeratore: x² − 4 = ?', type:'choice', ans:0,
      opts:['(x − 2)(x + 2)','(x − 2)²','(x − 4)(x + 1)'],
      ok:'Sì: differenza di quadrati. E infatti c\'è il fattore (x − 2), come previsto.', bad:'Differenza di quadrati: a² − b² = (a − b)(a + b).' },
    { h:'Passo 3 · Semplifico (x − 2) sopra e sotto. Cosa resta?', type:'choice', ans:2,
      opts:['x − 2','1/(x + 2)','x + 2'],
      ok:'Esatto: '+FR('(x − 2)(x + 2)','x − 2')+' = x + 2. Posso semplificare perché x è vicino a 2 ma non uguale a 2, quindi x − 2 ≠ 0.', bad:'(x − 2)(x + 2) / (x − 2) = ?' },
    { h:'Passo 4 · Ora risostituisco x = 2. Quanto fa il limite?', type:'nums', ans:[4],
      html: LIMX('2')+' (x + 2) = '+inp('risultato'),
      ok:'Perfetto: 2 + 2 = 4. Controllo con i numeri: x = 2,01 → (4,0401 − 4)/(2,01 − 2) = 0,0401/0,01 = 4,01, vicino a 4 ✓', bad:'2 + 2…' }
  ], '<b>Fatto!</b> '+LIMX('2')+' (x² − 4)/(x − 2) = '+LIMX('2')+' (x + 2) = 4. Con 0/0 e polinomi la mossa è sempre questa: trova il fattore (x − x₀), semplificalo, risostituisci.');

  EX['limiti-funzioni'] = [
    { id:'e1', type:'num', q:LIMX('3')+' (x² + 1)', a:10, hint:'Prima mossa: sostituisci.', sol:SV(
      '<i>Prima mossa, sostituisco x = 3:</i> 3² + 1',
      '<i>Calcolo la potenza:</i> 3² = 9',
      '<i>Sommo:</i> 9 + 1 = 10',
      '<i>Controllo:</i> è un numero, nessuna forma indeterminata, ho finito: il limite è <b>10</b>') },
    { id:'e2', type:'num', q:LIMX('1')+' '+FR('x² − 1','x² − x'), a:2, hint:'0/0. Sopra (x − 1)(x + 1), sotto x(x − 1).', sol:SV(
      '<i>Sostituisco x = 1:</i> sopra 1 − 1 = 0, sotto 1 − 1 = 0: forma 0/0, devo semplificare',
      '<i>Scompongo sopra (differenza di quadrati):</i> x² − 1 = (x − 1)(x + 1)',
      '<i>Scompongo sotto (raccolgo x):</i> x² − x = x(x − 1)',
      '<i>Riscrivo:</i> '+FR('(x − 1)(x + 1)','x(x − 1)'),
      '<i>Semplifico (x − 1), che non è 0 perché x è vicino a 1 ma non uguale:</i> = '+FR('x + 1','x'),
      '<i>Risostituisco x = 1:</i> '+FR('1 + 1','1')+' = <b>2</b>') },
    { id:'e3', type:'num', q:LIMX('+∞')+' '+FR('3x² + x','x² − 5'), a:3, hint:'Termine dominante sopra e sotto.', sol:SV(
      '<i>Sostituisco x → +∞:</i> sopra +∞, sotto +∞: forma ∞/∞',
      '<i>Raccolgo x² sopra:</i> 3x² + x = x²(3 + 1/x)',
      '<i>Raccolgo x² sotto:</i> x² − 5 = x²(1 − 5/x²)',
      '<i>Semplifico x²:</i> '+FR('3 + 1/x','1 − 5/x²'),
      '<i>Faccio il limite:</i> 1/x → 0 e 5/x² → 0, quindi '+FR('3 + 0','1 − 0'),
      '<i>Risultato:</i> <b>3</b>') },
    { id:'e4', type:'num', q:LIMX('0')+' '+FR('sin(5x)','x'), a:5, hint:'Moltiplica e dividi per 5, così sotto c\'è 5x come dentro il seno.', sol:SV(
      '<i>Sostituisco x = 0:</i> sin 0 / 0 = 0/0, forma indeterminata',
      '<i>Voglio il limite notevole sin(t)/t con t = 5x: sotto mi serve 5x.</i> Moltiplico e divido per 5: '+FR('sin(5x)','x')+' = 5 · '+FR('sin(5x)','5x'),
      '<i>Pongo t = 5x:</i> per x → 0 anche t → 0',
      '<i>Uso il notevole:</i> '+LIMX('0')+' '+FR('sin(5x)','5x')+' = <span class="lim">lim<span>t→0</span></span> '+FR('sin t','t')+' = 1',
      '<i>Moltiplico:</i> 5 · 1 = <b>5</b>') },
    { id:'e5', type:'num', q:LIMX('0')+' '+FR('1 − cos x','x²'), a:0.5, hint:'È un limite notevole, direttamente.', sol:SV(
      '<i>Sostituisco x = 0:</i> (1 − 1)/0 = 0/0',
      '<i>Riconosco il limite notevole:</i> è esattamente '+LIMX('0')+' (1 − cos x)/x²',
      '<i>Lo scrivo dalla tabella:</i> vale 1/2',
      '<i>Risultato:</i> <b>1/2</b> (in decimale 0,5)') },
    { id:'e6', type:'num', q:LIMX('0')+' '+FR('ln(1 + 3x)','x'), a:3, hint:'Moltiplica e dividi per 3.', sol:SV(
      '<i>Sostituisco x = 0:</i> ln 1 / 0 = 0/0',
      '<i>Voglio il notevole ln(1 + t)/t con t = 3x: sotto mi serve 3x.</i> Moltiplico e divido per 3: = 3 · '+FR('ln(1 + 3x)','3x'),
      '<i>Pongo t = 3x:</i> per x → 0 anche t → 0',
      '<i>Uso il notevole:</i> <span class="lim">lim<span>t→0</span></span> '+FR('ln(1 + t)','t')+' = 1',
      '<i>Moltiplico:</i> 3 · 1 = <b>3</b>') },
    { id:'e7', type:'num', q:LIMX('0⁺')+' '+FR('1','x'), a:Infinity, hint:'Da destra x è un numero positivo piccolissimo. 1 diviso un positivo piccolissimo…', sol:SV(
      '<i>Sostituisco:</i> 1/0, non è una forma indeterminata: il risultato è infinito, devo capire il segno',
      '<i>0⁺ vuol dire da destra:</i> x è positivo e piccolissimo',
      '<i>Provo con i numeri:</i> x = 0,1 → 10; x = 0,01 → 100; x = 0,001 → 1000',
      '<i>Crescono senza limite e sono positivi:</i> il limite è <b>+∞</b> (scrivi inf)',
      '<i>Nota:</i> da sinistra (x = −0,01 → −100) sarebbe −∞') },
    { id:'e8', type:'num', q:LIMX('0')+' '+FR('e<sup>2x</sup> − 1','x'), a:2, hint:'Notevole (eˣ − 1)/x, con 2x al posto di x: moltiplica e dividi per 2.', sol:SV(
      '<i>Sostituisco x = 0:</i> (e⁰ − 1)/0 = (1 − 1)/0 = 0/0',
      '<i>Voglio il notevole (eᵗ − 1)/t con t = 2x.</i> Moltiplico e divido per 2: = 2 · '+FR('e<sup>2x</sup> − 1','2x'),
      '<i>Pongo t = 2x:</i> per x → 0 anche t → 0',
      '<i>Uso il notevole:</i> <span class="lim">lim<span>t→0</span></span> '+FR('eᵗ − 1','t')+' = 1',
      '<i>Moltiplico:</i> 2 · 1 = <b>2</b>') },
    { id:'e9', type:'choice', q:LIMX('0')+' '+FR('|x|','x'), a:2, opts:['1','0','non esiste'], hint:'Calcola il limite destro e quello sinistro.', sol:SV(
      '<i>Ricordo il valore assoluto:</i> |x| = x se x &gt; 0, |x| = −x se x &lt; 0',
      '<i>Da destra (x &gt; 0):</i> '+FR('|x|','x')+' = '+FR('x','x')+' = 1, quindi '+LIMX('0⁺')+' = 1',
      '<i>Da sinistra (x &lt; 0):</i> '+FR('|x|','x')+' = '+FR('−x','x')+' = −1, quindi '+LIMX('0⁻')+' = −1',
      '<i>Confronto:</i> destro 1 ≠ sinistro −1',
      '<i>Conclusione:</i> il limite <b>non esiste</b>') }
  ];
