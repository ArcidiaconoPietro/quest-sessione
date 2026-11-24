  /* ===== capitolo 4: Criterio del rapporto ===== */
  order.push('rapporto'); NAMES['rapporto'] = '4 Criterio del rapporto';
  const Q = [
    { r:n=>2/(n+1), L:'0', verdict:'L = 0 &lt; 1, quindi '+LIM+' 2ⁿ/n! = 0' },
    { r:n=>(n+1)/3, L:'+∞', verdict:'L = +∞ &gt; 1, quindi '+LIM+' n!/3ⁿ = +∞' },
    { r:n=>Math.pow((n+1)/n,2)/2, L:'1/2', verdict:'L = 1/2 &lt; 1, quindi '+LIM+' n²/2ⁿ = 0' },
    { r:n=>Math.pow(n/(n+1),n), L:'1/e ≈ 0,37', verdict:'L = 1/e &lt; 1, quindi '+LIM+' n!/nⁿ = 0 (era l\'errore G5!)' },
    { r:n=>Math.pow((n+1)/n,2), L:'1', verdict:'L = 1: il criterio non dice niente. (Lo sai per altra via: '+LIM+' n² = +∞.)' }
  ];
  draws.rapporto = () => {
    const q = Q[+$('qS').value];
    plot($('plotQ'), { N:40, series:[{f:q.r, color:'--thief'}], hlines:[{y:1, color:'--bad', label:'1'}] });
    $('qOut').innerHTML = 'Per n → +∞ il rapporto tende a <b>'+q.L+'</b>. '+q.verdict;
  };
  $('qS').addEventListener('change', () => draws.rapporto());
  const drawQM = () => {
    const r = (+$('qM').value)/100, a = n => 100*Math.pow(r, n-1);
    plot($('plotQM'), { N:12, series:[{f:a, color:'--thief', line:true},{f:a, color:'--thief'}], hlines:[{y:100, color:'--muted', label:'partenza 100'}] });
    const fin = r<1 ? 'Moltiplicatore '+it(r,2)+' &lt; 1: si rimpicciolisce, '+LIM+' a<sub>n</sub> = 0.' : r>1 ? 'Moltiplicatore '+it(r,2)+' &gt; 1: si ingrandisce, '+LIM+' a<sub>n</sub> = +∞.' : 'Moltiplicatore 1: resta sempre 100.';
    $('qMOut').innerHTML = 'Termini: '+[1,2,3,4,5,6].map(n=>it(a(n),2)).join(' · ')+' …<br><span style="font-size:1rem">'+fin+'</span>';
    let rows = '<tr><th>n</th><th>a<sub>n</sub> = 5ⁿ/n!</th><th>moltiplicatore 5/(n+1)</th></tr>', v = 5;
    for (let n=1; n<=12; n++){ rows += '<tr><td>'+n+'</td><td>'+it(v,2)+'</td><td>'+it(5/(n+1),2)+(5/(n+1)>1?' (cresce)':5/(n+1)===1?' (resta)':' (cala)')+'</td></tr>'; v = v*5/(n+1); }
    $('qTab').innerHTML = rows;
  };
  const oldR = draws.rapporto; draws.rapporto = () => { oldR(); drawQM(); };
  $('qM').addEventListener('input', drawQM);

  guided('rapporto', 'lavagna-rapporto', [
    { h:'Passo 1 · Scrivi a<sub>n+1</sub>: al posto di n metti n+1', type:'choice', ans:2,
      html:'a<sub>n</sub> = 5ⁿ / n!',
      opts:['5ⁿ / (n! + 1)','5<sup>n+1</sup> / n!','5<sup>n+1</sup> / (n+1)!'],
      ok:'Esatto: n diventa n+1 dappertutto.', bad:'Devi sostituire n+1 sia nell\'esponente sia nel fattoriale.' },
    { h:'Passo 2 · Semplifica il rapporto a<sub>n+1</sub> / a<sub>n</sub>', type:'choice', ans:1,
      html:'<span class="fr"><span>5<sup>n+1</sup> / (n+1)!</span><span>5ⁿ / n!</span></span> = <span class="fr"><span>5 · 5ⁿ</span><span>(n+1) · n!</span></span> · <span class="fr"><span>n!</span><span>5ⁿ</span></span>',
      opts:['(n+1) / 5','5 / (n+1)','5n'],
      ok:'Giusto: 5ⁿ e n! si semplificano, resta 5/(n+1).', bad:'Cancella 5ⁿ con 5ⁿ e n! con n!. Cosa resta sopra e sotto?' },
    { h:'Passo 3 · Quanto fa il limite di 5/(n+1)? Questo è L', type:'nums', ans:[0],
      html:'L = '+LIM+' 5/(n+1) = '+inp('valore di L'), ok:'Sì, L = 0.', bad:'5 diviso un numero enorme…' },
    { h:'Passo 4 · L = 0 è minore di 1. Quindi '+LIM+' 5ⁿ/n! fa…', type:'choice', ans:0,
      opts:['0','+∞','non si può dire'],
      ok:'Perfetto! L &lt; 1 vuol dire che si rimpicciolisce sempre: il limite è 0.', bad:'Ricontrolla la regola: se L &lt; 1 il limite di a<sub>n</sub> è…?' }
  ], '<b>Fatto!</b> '+LIM+' 5ⁿ/n! = 0, adesso dimostrato: '+LIM+' 5/(n+1) = 0 &lt; 1.');

  const A1 = 'a<sub>n+1</sub>', A0 = 'a<sub>n</sub>';
  EX['rapporto'] = [
      { id:'e1', type:'num', q:LIM+' n! / 4ⁿ', a:Infinity, hint:'Rapporto: (n+1)!/n! = n+1 e 4ⁿ/4<sup>n+1</sup> = 1/4.', sol:SV(
        '<i>Scrivo '+A1+' (al posto di n metto n + 1):</i> '+A1+' = '+FR('(n + 1)!','4<sup>n+1</sup>'),
        '<i>Scrivo il rapporto (dividere per una frazione = moltiplicare per la sua capovolta):</i> '+FR(A1,A0)+' = '+FR('(n + 1)!','4<sup>n+1</sup>')+' · '+FR('4ⁿ','n!'),
        '<i>Spezzo (n + 1)! = (n + 1) · n! e 4<sup>n+1</sup> = 4 · 4ⁿ:</i> = '+FR('(n + 1) · n!','4 · 4ⁿ')+' · '+FR('4ⁿ','n!'),
        '<i>Semplifico n! con n! e 4ⁿ con 4ⁿ:</i> = '+FR('n + 1','4'),
        '<i>Faccio il limite:</i> L = '+LIM+' '+FR('n + 1','4')+' = +∞ (sopra cresce senza fine, sotto resta 4)',
        '<i>Applico il criterio:</i> L = +∞ &gt; 1, quindi '+LIM+' n!/4ⁿ = <b>+∞</b>') },
      { id:'e2', type:'num', q:LIM+' n³ / 2ⁿ', a:0, hint:'Rapporto = ((n+1)/n)³ · 1/2. Per n → +∞ dove va (n+1)/n?', sol:SV(
        '<i>Scrivo '+A1+':</i> '+A1+' = '+FR('(n + 1)³','2<sup>n+1</sup>'),
        '<i>Scrivo il rapporto:</i> '+FR(A1,A0)+' = '+FR('(n + 1)³','2<sup>n+1</sup>')+' · '+FR('2ⁿ','n³'),
        '<i>Spezzo 2<sup>n+1</sup> = 2 · 2ⁿ e semplifico 2ⁿ:</i> = '+FR('(n + 1)³','2 · n³'),
        '<i>Metto insieme le potenze con lo stesso esponente:</i> = '+FR('1','2')+' · ('+FR('n + 1','n')+')³ = '+FR('1','2')+' · (1 + '+FR('1','n')+')³',
        '<i>Faccio il limite per n → +∞:</i> 1/n tende a 0, quindi (1 + 1/n)³ tende a 1³ = 1',
        '<i>Quindi:</i> L = '+FR('1','2')+' · 1 = '+FR('1','2'),
        '<i>Applico il criterio:</i> L = 1/2 &lt; 1, quindi '+LIM+' n³/2ⁿ = <b>0</b>') },
      { id:'e3', type:'num', q:LIM+' n! / nⁿ <span style="font-size:1rem">(era un tuo errore)</span>', a:0, hint:'Rapporto = (n+1)! / (n+1)<sup>n+1</sup> · nⁿ / n! = nⁿ/(n+1)ⁿ = (n/(n+1))ⁿ. Ricorda il capitolo 3.', sol:SV(
        '<i>Scrivo '+A1+' (n + 1 va nel fattoriale, nella base e nell\'esponente):</i> '+A1+' = '+FR('(n + 1)!','(n + 1)<sup>n+1</sup>'),
        '<i>Scrivo il rapporto:</i> '+FR(A1,A0)+' = '+FR('(n + 1)!','(n + 1)<sup>n+1</sup>')+' · '+FR('nⁿ','n!'),
        '<i>Spezzo (n + 1)! = (n + 1) · n! e semplifico n!:</i> = '+FR('(n + 1) · nⁿ','(n + 1)<sup>n+1</sup>'),
        '<i>Spezzo (n + 1)<sup>n+1</sup> = (n + 1) · (n + 1)ⁿ e semplifico (n + 1):</i> = '+FR('nⁿ','(n + 1)ⁿ'),
        '<i>Stesso esponente sopra e sotto, lo metto fuori:</i> = ('+FR('n','n + 1')+')ⁿ',
        '<i>Capovolgo la frazione dentro (così compare il numero e):</i> ('+FR('n','n + 1')+')ⁿ = '+FR('1','((n + 1)/n)ⁿ')+' = '+FR('1','(1 + 1/n)ⁿ'),
        '<i>Faccio il limite (capitolo 3):</i> '+LIM+' (1 + 1/n)ⁿ = e, quindi L = '+FR('1','e')+' ≈ 0,37',
        '<i>Applico il criterio:</i> L = 1/e &lt; 1, quindi '+LIM+' n!/nⁿ = <b>0</b>: nⁿ batte n!') },
      { id:'e4', type:'num', q:'Per a<sub>n</sub> = 1/n, quanto vale L, il limite del rapporto?', a:1, hint:'(1/(n+1)) / (1/n) = n/(n+1).', sol:SV(
        '<i>Scrivo '+A1+':</i> '+A1+' = '+FR('1','n + 1'),
        '<i>Scrivo il rapporto:</i> '+FR(A1,A0)+' = '+FR('1','n + 1')+' · '+FR('n','1')+' = '+FR('n','n + 1'),
        '<i>Divido sopra e sotto per n:</i> = '+FR('1','1 + 1/n'),
        '<i>Faccio il limite:</i> 1/n tende a 0, quindi L = '+FR('1','1 + 0')+' = <b>1</b>',
        '<i>Conclusione:</i> con L = 1 il criterio non dice niente. Che '+LIM+' 1/n = 0 lo sai per un\'altra strada.') }
    ];
