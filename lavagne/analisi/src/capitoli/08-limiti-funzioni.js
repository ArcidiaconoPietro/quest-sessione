  /* ===== capitolo 8: Limiti di funzioni ===== */
  order.push('limiti-funzioni'); NAMES['limiti-funzioni'] = '8 Limiti di funzioni';
  const LF = [
    { f:x=>(x*x-1)/(x-1), x0:1, xr:[-1,3], yr:[-0.5,4.5], hole:{y:2}, txt:'Da sinistra e da destra si va verso 2. In x = 1 la funzione non esiste (pallino vuoto), ma il limite c\'è: '+LIMX('1')+' (x² − 1)/(x − 1) = 2.' },
    { f:x=>Math.sin(x)/x, x0:0, xr:[-8,8], yr:[-0.5,1.3], hole:{y:1}, extra:[{f:x=>x, color:'--muted', dash:true, width:1.5}], txt:'Da tutte e due le parti si va verso 1: '+LIMX('0')+' sin(x)/x = 1. La linea tratteggiata è y = x: vicino a 0 è quasi uguale a sin x.' },
    { f:x=>1/x, x0:0, xr:[-3,3], yr:[-8,8], txt:'Da sinistra si scende a −∞, da destra si sale a +∞. Destro e sinistro diversi: '+LIMX('0')+' 1/x non esiste.' },
    { f:x=>x===0?NaN:Math.abs(x)/x, x0:0, xr:[-3,3], yr:[-2,2], txt:'Da sinistra vale sempre −1, da destra sempre 1. Destro e sinistro diversi: il limite non esiste.' }
  ];
  draws['limiti-funzioni'] = () => {
    const c = LF[+$('lfS').value], d = (+$('lfD').value)/100 * (c.xr[1]-c.x0) * 0.9;
    const xl = c.x0 - d, xr = c.x0 + d, yl = c.f(xl), yr = c.f(xr);
    const pts = [{x:xl, y:Math.max(c.yr[0], Math.min(c.yr[1], yl)), color:'--cop'}, {x:xr, y:Math.max(c.yr[0], Math.min(c.yr[1], yr)), color:'--thief'}];
    if (c.hole) pts.push({x:c.x0, y:c.hole.y, color:'--ink', open:true});
    plotF($('plotLF'), { xmin:c.xr[0], xmax:c.xr[1], ymin:c.yr[0], ymax:c.yr[1], fns:[...(c.extra||[]), {f:c.f, color:'--ink', width:2}], points:pts, vlines:[{x:c.x0, color:'--muted', label:'x₀'}] });
    $('lfOut').innerHTML = 'f('+it(xl,3)+') = <b class="cop">'+it(yl,3)+'</b> · f('+it(xr,3)+') = <b class="thief">'+it(yr,3)+'</b><br><span style="font-size:1rem">'+c.txt+'</span>';
  };
  $('lfS').addEventListener('change', () => draws['limiti-funzioni']());
  $('lfD').addEventListener('input', () => draws['limiti-funzioni']());

  guided('limiti-funzioni', 'lavagna-limiti-funzioni', [
    { h:'Passo 1 · Sostituisco x = 2. Cosa esce?', type:'choice', ans:1,
      opts:['4/0, quindi infinito','0/0, forma indeterminata','0'],
      ok:'Giusto: 2² − 4 = 0 e 2 − 2 = 0. Forma 0/0: serve semplificare.', bad:'Calcola sopra: 2² − 4. Sotto: 2 − 2.' },
    { h:'Passo 2 · Scompongo il numeratore: x² − 4 = ?', type:'choice', ans:0,
      opts:['(x − 2)(x + 2)','(x − 2)²','(x − 4)(x + 1)'],
      ok:'Sì: differenza di quadrati. E infatti c\'è il fattore (x − 2), come previsto.', bad:'Differenza di quadrati: a² − b² = (a − b)(a + b).' },
    { h:'Passo 3 · Semplifico (x − 2) sopra e sotto. Cosa resta?', type:'choice', ans:2,
      opts:['x − 2','1/(x + 2)','x + 2'],
      ok:'Esatto. Posso semplificare perché x è vicino a 2 ma non uguale a 2, quindi x − 2 ≠ 0.', bad:'(x − 2)(x + 2) / (x − 2) = ?' },
    { h:'Passo 4 · Ora risostituisco x = 2. Quanto fa il limite?', type:'nums', ans:[4],
      html: LIMX('2')+' (x + 2) = '+inp('risultato'),
      ok:'Perfetto!', bad:'2 + 2…' }
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
