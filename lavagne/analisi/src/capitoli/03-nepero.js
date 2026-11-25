  /* ===== capitolo 3: Il numero e ===== */
  order.push('nepero'); NAMES['nepero'] = '3 Il numero e';
  draws.nepero = () => {
    const N = +$('eN').value;
    plot($('plotE'), { N:Math.max(N,2), zero:false, series:[{f:n=>Math.pow(1+1/n,n), color:'--thief'}], hlines:[{y:Math.E, color:'--cop', label:'e = 2,718…'},{y:2, color:'--muted', label:'2'}] });
    $('eOut').innerHTML = 'Con <b>'+N+'</b> rate: (1 + 1/'+N+')<sup>'+N+'</sup> = <b>'+it(Math.pow(1+1/N,N),4)+'</b> €'
      + SV('<i>Ogni rata:</i> 1/'+N+' ≈ '+it(1/N,4)+', quindi ogni volta moltiplico per 1 + 1/'+N+' ≈ '+it(1+1/N,4),
           '<i>Lo faccio '+N+' volte:</i> '+it(1+1/N,4)+'<sup>'+N+'</sup> ≈ '+it(Math.pow(1+1/N,N),4)+' €',
           '<i>Confronto con e ≈ 2,7183:</i> mancano ancora '+it(Math.E-Math.pow(1+1/N,N),4)+' €');
  };
  $('eN').addEventListener('input', () => { $('eNv').textContent = $('eN').value; draws.nepero(); });

  video('nepero', [/*problema*/
    { show:'<b>Il caso</b><br><span class="lim">lim<span>n→+∞</span></span> (1 + <span class="fr"><span>1</span><span>n</span></span>)<sup>n</sup> = ?', say:'Il caso: limite per n che tende a più infinito di uno più uno su n, tutto elevato alla n.' },
    { show:'<b>Provo con quello che so</b><br>La base 1 + 1/n tende a 1, e 1 elevato a qualsiasi cosa fa 1. Quindi fa 1? Provo i numeri: n = 10 → 1,1¹⁰ ≈ 2,594; n = 100 → 1,01¹⁰⁰ ≈ 2,705. <b>Non fa 1.</b>', say:'Ragiono: la base tende a uno, e uno elevato a qualsiasi cosa fa uno. Ma provo i numeri: con n uguale a dieci viene due virgola cinque nove, con cento due virgola sette. Non fa uno.' },
    { show:'<b>Provo ancora</b><br>Allora l\'esponente enorme vince e va a +∞? Ma i numeri si fermano sotto 2,72. Base che va a 1 ed esponente che va a +∞: forma 1<sup>∞</sup>, <b>indeterminata</b>. Né la gerarchia né i carabinieri dicono quanto fa.', say:'Allora vince l\'esponente e va a infinito? No, i numeri si fermano sotto due virgola settantadue. È la forma uno alla infinito, indeterminata, e niente di quello che sai dice quanto fa.' },
    { show:'<b>Quindi serve</b><br>Dare un nome a quel numero, <b>e ≈ 2,718</b>, e una ricetta per tutte le forme 1<sup>∞</sup>: pezzo piccolo × esponente → e elevato a quello.', say:'Serve dare un nome a quel numero, e, circa due virgola settecentodiciotto, e una ricetta per tutte le forme uno alla infinito.' },
    { show:'<b>Lo userai per</b><br>(1 + 3/n)ⁿ = e³, (1 − 2/n)ⁿ = e<sup>−2</sup>, (1 + 5/n)<sup>2n</sup> = e¹⁰, ((n + 1)/(n − 1))ⁿ, e più avanti per i limiti notevoli delle funzioni.', say:'Lo userai per tutte le potenze con base che tende a uno ed esponente che tende a infinito, e più avanti per i limiti notevoli.' },
    { show:'<h3>Il numero e</h3>'+LIM+' (1 + '+FR('1','n')+')<sup>n</sup> = e ≈ 2,718',
      say:'Il numero e. È il limite per n che tende a più infinito di uno più uno su n, tutto elevato alla n. Vale circa due virgola settecentodiciotto. Vediamo da dove viene, con i soldi.' },
    { show:'1 rata: 2¹ = 2 · 2 rate: 1,5² = 1,5 · 1,5 = 2,25 · 4 rate: 1,25⁴ ≈ 2,441',
      say:'Un euro in banca al cento per cento. Con una rata hai due euro. Con due rate, ognuna del cinquanta per cento: uno virgola cinque per uno virgola cinque, due virgola venticinque. Con quattro rate: uno virgola venticinque alla quarta, circa due virgola quarantaquattro.' },
    { show:'12 rate: (1 + 1/12)¹² ≈ 2,613 · 365 rate: (1 + 1/365)³⁶⁵ ≈ 2,7146',
      say:'Con dodici rate, una al mese, circa due virgola sessantuno. Con trecentosessantacinque, una al giorno, due virgola settantuno. Cresce, ma sempre più piano: si ferma vicino a due virgola settecentodiciotto, cioè e.' },
    { show:'1<sup>∞</sup>: (1 + 1/n²)ⁿ → 1 · (1 + 1/n)ⁿ → e · (1 + 1/n)<sup>n²</sup> → +∞',
      say:'Perché uno elevato a infinito non fa sempre uno? Guarda tre esempi: tutti hanno base che va a uno ed esponente che va a infinito. Il primo tende a uno, il secondo a e, il terzo a più infinito. Dipende da chi è più veloce, la base o l\'esponente.' },
    { show:'(1 + 1/n)<sup>n²</sup>: n = 10 → 1,1¹⁰⁰ ≈ 13 781',
      say:'Per esempio il terzo: con n uguale a dieci, uno virgola uno alla cento fa circa tredicimilasettecentottanta. L\'esponente vince.' },
    { show:'Ricetta: (1 + u)<sup>esponente</sup>, '+LIM+' u · esponente = L → risultato e<sup>L</sup>',
      say:'La ricetta: scrivo la base come uno più un pezzo piccolo u. Moltiplico u per l\'esponente e ne faccio il limite: lo chiamo L. Il risultato è e elevato a L.' },
    { show:'Prova: (1 + 1/n)ⁿ → u = 1/n, '+FR('1','n')+' · n = 1 → e¹ = e ✓',
      say:'Prova con la definizione: il pezzo è uno su n, l\'esponente è n. Uno su n per n fa uno. Quindi e alla uno, cioè e. Torna.' },
    { show:'Esercizio: '+LIM+' (1 + '+FR('5','n')+')<sup>2n</sup> · base: 1 + 5/n → 1 + 0 = 1, esponente 2n → +∞',
      say:'Esercizio: uno più cinque su n, elevato a due n. Prima controllo la forma: cinque su n tende a zero, quindi la base tende a uno. L\'esponente due n tende a più infinito. È uno alla infinito.' },
    { show:'u · esponente = '+FR('5','n')+' · 2n = '+FR('10n','n')+' = 10 → <b>e¹⁰</b>',
      say:'Il pezzo piccolo è cinque su n, l\'esponente due n. Cinque su n per due n fa dieci n su n, cioè dieci. Il risultato è e alla dieci.' },
    { show:'Perché: (1 + 5/n)<sup>2n</sup> = ((1 + 5/n)<sup>n/5</sup>)<sup>10</sup> → e¹⁰',
      say:'Perché funziona? Riscrivo l\'esponente due n come n quinti per dieci. Dentro ho uno più cinque su n elevato a n quinti, cioè a uno diviso il pezzo piccolo, e questo tende a e. Fuori resta l\'esponente dieci. Quindi e alla dieci.' },
    { show:'Controllo: n = 1000 → 1,005²⁰⁰⁰ ≈ 21 500 · e¹⁰ ≈ 22 026',
      say:'Controllo con i numeri: con n uguale a mille, uno virgola zero zero cinque alla duemila fa circa ventunomilaseicento, ed e alla dieci è circa ventiduemila. Ci siamo.' }
  ]);

  guided('nepero', 'lavagna-nepero', [
    { h:'Passo 1 · È una forma 1^∞? Quanto fa il limite della base?', type:'nums', ans:[1],
      html:LIM+' (1 + 5/n) = '+inp('limite della base'), ok:'Sì: per n → +∞ la base tende a 1 e l\'esponente 2n tende a +∞. È una forma 1^∞.', bad:'5 diviso un numero enorme è quasi 0. Quindi 1 + quasi 0…' },
    { h:'Passo 2 · Il pezzo piccolo u è 5/n e l\'esponente è 2n. Quanto fa u · esponente?', type:'nums', ans:[10],
      html:'<span class="box thief">5/n</span> · <span class="box cop">2n</span> = '+inp('prodotto'), ok:'Giusto: '+FR('5','n')+' · 2n = '+FR('5 · 2n','n')+' = '+FR('10n','n')+' = 10. Le n si semplificano.', bad:'Moltiplica: 5 · 2 = ? e n/n = 1.' },
    { h:'Passo 3 · Quindi il limite è e elevato a…', type:'nums', ans:[10],
      html:'e<sup>'+inp('esponente','3.5em')+'</sup>', ok:'Perfetto! Controllo con n = 1000: (1 + 5/1000)<sup>2000</sup> = 1,005<sup>2000</sup> ≈ 21 500, ed e<sup>10</sup> ≈ 22 026: ci si avvicina.', bad:'Il risultato è e elevato al numero del passo 2.' }
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
