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
      { id:'e1', type:'exp', q:LIM+' (1 + 2/n)<sup>n</sup>', a:2, hint:'Regola rapida: '+LIM+' (1 + a/n)<sup>n</sup> = e<sup>a</sup>.', sol:SV(
        '<i>Controllo la forma:</i> la base 1 + 2/n tende a 1, l\'esponente n tende a +∞: forma 1<sup>∞</sup>',
        '<i>Trovo il pezzo piccolo u (quello aggiunto a 1):</i> u = 2/n',
        '<i>Moltiplico u per l\'esponente:</i> '+FR('2','n')+' · n = 2',
        '<i>Faccio il limite del prodotto:</i> '+LIM+' 2 = 2',
        '<i>Ricetta: il limite è e elevato a quel numero:</i> <b>e²</b>') },
      { id:'e2', type:'exp', q:LIM+' (1 + 1/n)<sup>5n</sup>', a:5, hint:'u = 1/n, esponente 5n. Moltiplica.', sol:SV(
        '<i>Forma:</i> base → 1, esponente 5n → +∞: 1<sup>∞</sup>',
        '<i>Pezzo piccolo:</i> u = 1/n',
        '<i>u per l\'esponente:</i> '+FR('1','n')+' · 5n = 5',
        '<i>Limite:</i> 5',
        '<i>Risultato:</i> <b>e⁵</b>') },
      { id:'e3', type:'exp', q:LIM+' (1 − 1/n)<sup>n</sup>', a:-1, hint:'Il pezzo piccolo è −1/n, col segno meno.', sol:SV(
        '<i>Forma:</i> base 1 − 1/n → 1, esponente → +∞: 1<sup>∞</sup>',
        '<i>Pezzo piccolo, col suo segno:</i> u = −1/n',
        '<i>u per l\'esponente:</i> (−'+FR('1','n')+') · n = −1',
        '<i>Limite:</i> −1',
        '<i>Risultato:</i> <b>e<sup>−1</sup></b> = 1/e') },
      { id:'e4', type:'exp', q:LIM+' <span class="fr"><span>n + 3</span><span>n + 1</span></span><sup>n</sup>', a:2, hint:'Riscrivi la base: (n+3)/(n+1) = 1 + 2/(n+1). Poi u · esponente = 2n/(n+1).', sol:SV(
        '<i>Forma:</i> la base (n + 3)/(n + 1) tende a 1, l\'esponente n a +∞: 1<sup>∞</sup>',
        '<i>Devo scrivere la base come 1 + qualcosa. Spezzo il numeratore: n + 3 = (n + 1) + 2</i>',
        '<i>Divido:</i> '+FR('(n + 1) + 2','n + 1')+' = '+FR('n + 1','n + 1')+' + '+FR('2','n + 1')+' = 1 + '+FR('2','n + 1'),
        '<i>Pezzo piccolo:</i> u = '+FR('2','n + 1'),
        '<i>u per l\'esponente:</i> '+FR('2','n + 1')+' · n = '+FR('2n','n + 1'),
        '<i>Limite (divido sopra e sotto per n):</i> '+FR('2n','n + 1')+' = '+FR('2','1 + 1/n')+' → 2',
        '<i>Risultato:</i> <b>e²</b>') },
      { id:'e5', type:'num', q:LIM+' (1 + 1/n)<sup>7</sup> <span style="font-size:1rem">(attento!)</span>', a:1, hint:'Per n → +∞ l\'esponente tende a +∞?', sol:SV(
        '<i>Controllo la forma:</i> la base 1 + 1/n tende a 1',
        '<i>L\'esponente:</i> è 7, un numero fisso, NON tende a +∞',
        '<i>Quindi non è 1<sup>∞</sup>:</i> la ricetta del numero e non serve',
        '<i>Calcolo direttamente:</i> (1 + 0)<sup>7</sup> = 1<sup>7</sup> = <b>1</b>') }
    ];
