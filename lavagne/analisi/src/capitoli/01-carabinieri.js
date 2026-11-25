  /* ===== capitolo 1: Due carabinieri ===== */
  order.push('carabinieri'); NAMES['carabinieri'] = '1 Due carabinieri';
  draws.carabinieri = () => {
    plot($('plot1'), { N:+$('n1').value, series:[ ...( $('c1').checked ? [{f:n=>-1/n, color:'--cop', line:true},{f:n=>1/n, color:'--cop', line:true}] : []), {f:n=>Math.sin(n)/n, color:'--thief'} ] });
    plot($('plot2'), { N:40, series:[{f:()=>-1, color:'--cop', line:true},{f:()=>1, color:'--cop', line:true},{f:n=>Math.cos(n), color:'--thief'}] });
    plot($('plot3'), { N:40, series:[{f:n=>2/n, color:'--cop', line:true},{f:n=>4/n, color:'--cop', line:true},{f:n=>(3+Math.cos(n))/n, color:'--thief'}] });
  };
  $('n1').addEventListener('input', () => { $('n1v').textContent = $('n1').value; draws.carabinieri(); });
  $('c1').addEventListener('change', () => draws.carabinieri());

  video('carabinieri', [/*problema*/
    { show:'<b>Il caso</b><br><span class="lim">lim<span>n→+∞</span></span> <span class="fr"><span>sin n</span><span>n</span></span> = ?', say:'Ecco un limite che con quello che sai non riesci a calcolare: limite per n che tende a più infinito di seno di n diviso n.' },
    { show:'<b>Provo con quello che so</b><br>Limite di un prodotto = prodotto dei limiti: <span class="fr"><span>sin n</span><span>n</span></span> = sin n · <span class="fr"><span>1</span><span>n</span></span>. <span class="lim">lim<span>n→+∞</span></span> 1/n = 0, ma <span class="lim">lim<span>n→+∞</span></span> sin n <b>non esiste</b>: sin 1 ≈ 0,84; sin 4 ≈ −0,76; sin 8 ≈ 0,99; sin 11 ≈ −1,00, salta per sempre.', say:'Provo con la regola del prodotto: seno di n per uno su n. Uno su n tende a zero, ma il seno di n non ha limite: vale zero virgola ottantaquattro, poi meno zero virgola settantasei, poi zero virgola novantanove, salta per sempre.' },
    { show:'<b>Perché si inceppa</b><br>La regola "limite del prodotto = prodotto dei limiti" vale solo se <b>tutti e due</b> i limiti esistono. Qui uno non esiste, quindi la regola non si può usare. E la gerarchia degli infiniti non c\'entra: sin n non va all\'infinito.', say:'La regola del prodotto funziona solo se esistono tutti e due i limiti. Qui uno non esiste, quindi non posso usarla. E la gerarchia degli infiniti non aiuta, perché il seno non va all\'infinito.' },
    { show:'<b>Quindi serve</b><br>Un modo per trovare il limite <b>senza calcolarlo direttamente</b>: chiudo sin n / n tra due successioni facili che hanno lo stesso limite. È il teorema dei due carabinieri.', say:'Serve un modo per trovare il limite senza calcolarlo direttamente: chiudere la successione tra due successioni facili con lo stesso limite. È il teorema dei due carabinieri.' },
    { show:'<b>Lo userai per</b><br>Tutti i limiti con un pezzo che oscilla ma resta limitato: (−1)ⁿ/n, (3 + cos n)/n, sin(n²)/√n, n/(n² + sin n). E nel capitolo 2 per <span class="rt"><sup>n</sup>√<span class="ov">2ⁿ + 3ⁿ</span></span>.', say:'Lo userai per tutti i limiti con un pezzo che oscilla ma resta limitato: meno uno alla n su n, tre più coseno di n su n, e così via. E nel prossimo capitolo per le radici n-esime.' },
    { show:'<h3>Il teorema dei due carabinieri</h3>Esempio: '+LIM+' '+FR('sin n','n'),
      say:'Il teorema dei due carabinieri. Esempio: limite per n che tende a più infinito di seno di n diviso n.' },
    { show:'sin 1 ≈ 0,84 · sin 4 ≈ −0,76 · sin 8 ≈ 0,99 · sin 11 ≈ −1,00',
      say:'Il problema è il seno: salta su e giù. Seno di uno è circa zero virgola ottantaquattro, seno di quattro meno zero virgola settantasei, seno di otto zero virgola novantanove, seno di undici circa meno uno. Non ha limite.' },
    { show:'Passo 1: −1 ≤ sin n ≤ 1 per ogni n',
      say:'Però una cosa la so sempre: il seno sta tra meno uno e uno. Per ogni n.' },
    { show:'Passo 2: divido tutto per n &gt; 0 → '+FR('−1','n')+' ≤ '+FR('sin n','n')+' ≤ '+FR('1','n'),
      say:'Nella successione il seno è diviso per n. Allora divido tutti e tre i pezzi per n. n è positivo, quindi i segni minore o uguale non si girano.' },
    { show:'n = 10: −0,1 ≤ '+FR('−0,544','10')+' = −0,054 ≤ 0,1 ✓',
      say:'Controllo con n uguale a dieci. Meno uno su dieci è meno zero virgola uno. Seno di dieci è circa meno zero virgola cinquecentoquarantaquattro, diviso dieci fa meno zero virgola zero cinquantaquattro. Uno su dieci è zero virgola uno. Sta in mezzo, giusto.' },
    { show:'Passo 3: '+FR('1','n')+' = 0,1 · 0,01 · 0,001 → 0 · '+FR('−1','n')+' = −0,1 · −0,01 · −0,001 → 0',
      say:'Dove vanno i carabinieri? Uno su n vale zero virgola uno, poi zero virgola zero uno, poi zero virgola zero zero uno: tende a zero. Meno uno su n fa lo stesso con il meno: tende a zero anche lui.' },
    { show:'Passo 4: stesso limite 0 → '+LIM+' '+FR('sin n','n')+' = <b>0</b>',
      say:'Tutti e due i carabinieri vanno a zero, quindi anche il ladro in mezzo va a zero. Il limite è zero.' },
    { show:'Perché: con n = 1000 il ladro è tra −0,001 e 0,001',
      say:'Perché funziona? Con n uguale a mille, il ladro è chiuso tra meno zero virgola zero zero uno e più zero virgola zero zero uno. Più n cresce, più la gabbia si stringe intorno a zero.' },
    { show:'Attenzione: −1 ≤ cos n ≤ 1, ma −1 ≠ 1 → non si conclude niente',
      say:'Attenzione: i due carabinieri devono andare nello stesso posto. Con meno uno minore o uguale coseno di n minore o uguale uno, i carabinieri restano meno uno e uno, posti diversi. E infatti coseno di n non ha limite.' },
    { show:'Esercizio: '+LIM+' '+FR('3 + cos n','n')+' → −1 + 3 ≤ 3 + cos n ≤ 1 + 3 → 2 ≤ 3 + cos n ≤ 4',
      say:'Proviamo l\'esercizio guidato: tre più coseno di n, diviso n. Parto da meno uno minore o uguale coseno di n minore o uguale uno, e aggiungo tre a tutti e tre i pezzi: meno uno più tre fa due, uno più tre fa quattro.' },
    { show:FR('2','n')+' ≤ '+FR('3 + cos n','n')+' ≤ '+FR('4','n')+' · 2/n → 0 e 4/n → 0 → limite <b>0</b>',
      say:'Divido tutto per n: due su n, minore o uguale al nostro termine, minore o uguale quattro su n. Due su n e quattro su n tendono tutti e due a zero, quindi il limite è zero.' }
  ]);

  guided('carabinieri', 'lavagna-carabinieri', [
    { h:'Passo 1 · Parti da −1 ≤ cos n ≤ 1 e aggiungi 3 a tutti e tre i pezzi', type:'nums', ans:[2,4],
      html: inp('numero a sinistra')+' ≤ <span class="box thief">3 + cos n</span> ≤ '+inp('numero a destra'),
      ok:'Giusto: −1+3 = 2 e 1+3 = 4.', bad:'Non ancora. Fai −1 + 3 e poi 1 + 3.' },
    { h:'Passo 2 · Ora dividi tutto per n. Quale riga è giusta?', type:'choice', ans:1,
      opts:['3/n ≤ (3 + cos n)/n ≤ 5/n','2/n ≤ (3 + cos n)/n ≤ 4/n','2 ≤ (3 + cos n)/n ≤ 4'],
      ok:'Esatto: divido 2, 3+cos n e 4 per n. Controllo con n = 10: 2/10 = 0,2; (3 + cos 10)/10 ≈ (3 − 0,84)/10 = 0,216; 4/10 = 0,4. E 0,2 ≤ 0,216 ≤ 0,4 ✓', bad:'Ricontrolla: i numeri del passo 1 erano 2 e 4, e vanno divisi per n tutti e tre i pezzi.' },
    { h:'Passo 3 · Per n → +∞, dove vanno i carabinieri 2/n e 4/n? Quindi quanto fa il limite?', type:'nums', ans:[0],
      html:LIM+' (3 + cos n)/n = '+inp('valore del limite'), ok:'Perfetto! 2/n: 0,2; 0,02; 0,002 per n = 10, 100, 1000 → 0. 4/n: 0,4; 0,04; 0,004 → 0. Stesso limite 0, quindi il limite è 0.', bad:'Pensa: 2 diviso un numero enorme quanto fa, più o meno?' }
  ], '<b>Fatto!</b> '+LIM+' 2/n = 0 e '+LIM+' 4/n = 0, stesso limite, quindi '+LIM+' (3 + cos n)/n = 0. Il ladro giallo è schiacciato tra 2/n e 4/n.<canvas id="plot3" style="margin-top:10px" aria-label="Grafico: 3 più cos n su n tra 2 su n e 4 su n"></canvas>');

  EX['carabinieri'] = [
      { id:'e1', type:'num', q:LIM+' (2 + sin n) / n²', a:0, hint:'Parti da −1 ≤ sin n ≤ 1, aggiungi 2, poi dividi per n².', sol:SV(
        '<i>Parto da quello che so sul seno:</i> −1 ≤ sin n ≤ 1',
        '<i>Aggiungo 2 a tutti e tre i pezzi:</i> −1 + 2 ≤ 2 + sin n ≤ 1 + 2, cioè 1 ≤ 2 + sin n ≤ 3',
        '<i>Divido tutto per n² (positivo, i ≤ restano):</i> '+FR('1','n²')+' ≤ '+FR('2 + sin n','n²')+' ≤ '+FR('3','n²'),
        '<i>Carabiniere sotto:</i> '+LIM+' '+FR('1','n²')+' = 0',
        '<i>Carabiniere sopra:</i> '+LIM+' '+FR('3','n²')+' = 0',
        '<i>Stesso limite, applico i carabinieri:</i> '+LIM+' '+FR('2 + sin n','n²')+' = <b>0</b>') },
      { id:'e2', type:'num', q:LIM+' (−1)ⁿ / n', a:0, hint:'(−1)ⁿ vale −1 oppure 1: quindi −1 ≤ (−1)ⁿ ≤ 1. Poi dividi per n.', sol:SV(
        '<i>(−1)ⁿ vale −1 o 1, quindi:</i> −1 ≤ (−1)ⁿ ≤ 1',
        '<i>Divido per n (positivo):</i> '+FR('−1','n')+' ≤ '+FR('(−1)ⁿ','n')+' ≤ '+FR('1','n'),
        '<i>Carabiniere sotto:</i> '+LIM+' (−1/n) = 0',
        '<i>Carabiniere sopra:</i> '+LIM+' 1/n = 0',
        '<i>Stesso limite:</i> '+LIM+' (−1)ⁿ/n = <b>0</b>') },
      { id:'e3', type:'num', q:LIM+' (n + sin n) / n', a:1, hint:'Aggiungi n: n − 1 ≤ n + sin n ≤ n + 1. Poi dividi per n. Per n → +∞, dove vanno (n−1)/n e (n+1)/n?', sol:SV(
        '<i>Parto da:</i> −1 ≤ sin n ≤ 1',
        '<i>Aggiungo n a tutti e tre:</i> n − 1 ≤ n + sin n ≤ n + 1',
        '<i>Divido per n:</i> '+FR('n − 1','n')+' ≤ '+FR('n + sin n','n')+' ≤ '+FR('n + 1','n'),
        '<i>Spezzo le frazioni dei carabinieri:</i> '+FR('n − 1','n')+' = 1 − '+FR('1','n')+' e '+FR('n + 1','n')+' = 1 + '+FR('1','n'),
        '<i>Limiti:</i> 1/n tende a 0, quindi 1 − 1/n tende a 1 e 1 + 1/n tende a 1',
        '<i>Stesso limite:</i> '+LIM+' (n + sin n)/n = <b>1</b> (non sempre viene 0!)') },
      { id:'e4', type:'num', q:LIM+' (5 cos n) / n', a:0, hint:'Moltiplica −1 ≤ cos n ≤ 1 per 5 (positivo, i segni restano), poi dividi per n.', sol:SV(
        '<i>Parto da:</i> −1 ≤ cos n ≤ 1',
        '<i>Moltiplico per 5 (positivo, i ≤ restano):</i> −5 ≤ 5 cos n ≤ 5',
        '<i>Divido per n:</i> '+FR('−5','n')+' ≤ '+FR('5 cos n','n')+' ≤ '+FR('5','n'),
        '<i>Limiti dei carabinieri:</i> −5/n tende a 0 e 5/n tende a 0',
        '<i>Stesso limite:</i> '+LIM+' 5 cos n / n = <b>0</b>') }
    ];
