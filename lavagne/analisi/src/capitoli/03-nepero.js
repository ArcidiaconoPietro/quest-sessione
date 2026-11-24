  /* ===== capitolo 3: Il numero e ===== */
  order.push('nepero'); NAMES['nepero'] = '3 Il numero e';
  draws.nepero = () => {
    const N = +$('eN').value;
    plot($('plotE'), { N:Math.max(N,2), zero:false, series:[{f:n=>Math.pow(1+1/n,n), color:'--thief'}], hlines:[{y:Math.E, color:'--cop', label:'e = 2,718…'},{y:2, color:'--muted', label:'2'}] });
    $('eOut').innerHTML = 'Con <b>'+N+'</b> rate: (1 + 1/'+N+')<sup>'+N+'</sup> = <b>'+it(Math.pow(1+1/N,N),4)+'</b> €';
  };
  $('eN').addEventListener('input', () => { $('eNv').textContent = $('eN').value; draws.nepero(); });

  guided('nepero', 'lavagna-nepero', [
    { h:'Passo 1 · È una forma 1^∞? Quanto fa il limite della base?', type:'nums', ans:[1],
      html:LIM+' (1 + 5/n) = '+inp('limite della base'), ok:'Sì: per n → +∞ la base tende a 1 e l\'esponente 2n tende a +∞. È una forma 1^∞.', bad:'5 diviso un numero enorme è quasi 0. Quindi 1 + quasi 0…' },
    { h:'Passo 2 · Il pezzo piccolo u è 5/n e l\'esponente è 2n. Quanto fa u · esponente?', type:'nums', ans:[10],
      html:'<span class="box thief">5/n</span> · <span class="box cop">2n</span> = '+inp('prodotto'), ok:'Giusto: le n si semplificano, resta 10.', bad:'Moltiplica: 5 · 2 = ? e n/n = 1.' },
    { h:'Passo 3 · Quindi il limite è e elevato a…', type:'nums', ans:[10],
      html:'e<sup>'+inp('esponente','3.5em')+'</sup>', ok:'Perfetto!', bad:'Il risultato è e elevato al numero del passo 2.' }
  ], '<b>Fatto!</b> '+LIM+' (1 + 5/n)<sup>2n</sup> = e<sup>10</sup>. Ricetta: pezzo piccolo × esponente, poi e elevato a quello.');

  EX['nepero'] = [
      { id:'e1', type:'exp', q:LIM+' (1 + 2/n)<sup>n</sup>', a:2, hint:'Regola rapida: '+LIM+' (1 + a/n)<sup>n</sup> = e<sup>a</sup>.', sol:'u = 2/n, esponente n, prodotto 2: e².' },
      { id:'e2', type:'exp', q:LIM+' (1 + 1/n)<sup>5n</sup>', a:5, hint:'u = 1/n, esponente 5n. Moltiplica.', sol:'1/n · 5n = 5: e⁵.' },
      { id:'e3', type:'exp', q:LIM+' (1 − 1/n)<sup>n</sup>', a:-1, hint:'Il pezzo piccolo è −1/n, col segno meno.', sol:'−1/n · n = −1: e<sup>−1</sup> = 1/e.' },
      { id:'e4', type:'exp', q:LIM+' <span class="fr"><span>n + 3</span><span>n + 1</span></span><sup>n</sup>', a:2, hint:'Riscrivi la base: (n+3)/(n+1) = 1 + 2/(n+1). Poi u · esponente = 2n/(n+1).', sol:LIM+' 2n/(n+1) = 2, quindi il limite è e².' },
      { id:'e5', type:'num', q:LIM+' (1 + 1/n)<sup>7</sup> <span style="font-size:1rem">(attento!)</span>', a:1, hint:'Per n → +∞ l\'esponente tende a +∞?', sol:'No, l\'esponente è 7 fisso. Non è 1^∞: la base tende a 1, e 1<sup>7</sup> = 1.' }
    ];
