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

  EX['rapporto'] = [
      { id:'e1', type:'num', q:LIM+' n! / 4ⁿ', a:Infinity, hint:'Rapporto: (n+1)!/n! = n+1 e 4ⁿ/4<sup>n+1</sup> = 1/4.', sol:'L = '+LIM+' (n+1)/4 = +∞ &gt; 1, quindi '+LIM+' n!/4ⁿ = +∞.' },
      { id:'e2', type:'num', q:LIM+' n³ / 2ⁿ', a:0, hint:'Rapporto = ((n+1)/n)³ · 1/2. Per n → +∞ dove va (n+1)/n?', sol:LIM+' (n+1)/n = 1, quindi L = 1/2 &lt; 1: limite 0.' },
      { id:'e3', type:'num', q:LIM+' n! / nⁿ <span style="font-size:1rem">(era un tuo errore)</span>', a:0, hint:'Rapporto = (n+1)! / (n+1)<sup>n+1</sup> · nⁿ / n! = nⁿ/(n+1)ⁿ = (n/(n+1))ⁿ. Ricorda il capitolo 3.', sol:'(n/(n+1))ⁿ → 1/e ≈ 0,37 &lt; 1: limite 0. nⁿ batte n!.' },
      { id:'e4', type:'num', q:'Per a<sub>n</sub> = 1/n, quanto vale L, il limite del rapporto?', a:1, hint:'(1/(n+1)) / (1/n) = n/(n+1).', sol:'L = 1: il criterio non dice niente, anche se sai che '+LIM+' 1/n = 0. È il caso dubbio.' }
    ];
