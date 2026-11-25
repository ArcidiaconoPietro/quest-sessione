  /* ===== capitolo 2: Radici n-esime ===== */
  order.push('radici'); NAMES['radici'] = '2 Radici n-esime';
  draws.radici = () => {
    const a = +$('rA').value, N = +$('rN').value;
    plot($('plotR'), { n0:5, N, zero:false, series:[{f:n=>Math.pow(a,1/n), color:'--thief'},{f:n=>Math.pow(n,1/n), color:'--cop'}], hlines:[{y:1, color:'--ink', label:'1'}] });
    const ns = [1,2,5,10,50,100,1000];
    $('rTab').innerHTML = '<tr><th>n</th>'+ns.map(n=>'<th>'+n+'</th>').join('')+'</tr>'
      + '<tr><th>radice n-esima di '+a+'</th>'+ns.map(n=>'<td>'+it(Math.pow(a,1/n),3)+'</td>').join('')+'</tr>'
      + '<tr><th>radice n-esima di n</th>'+ns.map(n=>'<td>'+it(Math.pow(n,1/n),3)+'</td>').join('')+'</tr>';
  };
  const big = x => x < 1e6 ? Math.round(x).toLocaleString('it-IT') : x.toExponential(2).replace('.', ',').replace('e+', ' · 10^');
  const drawP = () => {
    const n = +$('pN').value, a = Math.pow(2,n), b = Math.pow(3,n), s = a+b, peso = a/s*100;
    $('pTab').innerHTML = '<tr><th>n</th><th>2ⁿ</th><th>3ⁿ</th><th>2ⁿ + 3ⁿ</th><th>radice n-esima</th></tr>'
      + '<tr><td>'+n+'</td><td>'+big(a)+'</td><td>'+big(b)+'</td><td>'+big(s)+'</td><td><b>'+it(Math.pow(s,1/n),4)+'</b></td></tr>';
    $('pNote').innerHTML = 'Con n = '+n+', il pezzo 2ⁿ è solo il <b>'+it(peso,peso<1?3:1)+'%</b> della somma. La radice n-esima della somma vale <b>'+it(Math.pow(s,1/n),4)+'</b>.';
  };
  $('pN').addEventListener('input', () => { $('pNv').textContent = $('pN').value; drawP(); });
  drawP();
  $('rA').addEventListener('change', () => draws.radici());
  $('rN').addEventListener('input', () => { $('rNv').textContent = $('rN').value; draws.radici(); });

  video('radici', [
    { show:'<h3>Le radici n-esime</h3>'+R('n','a')+' = a<sup>1/n</sup>',
      say:'Le radici n-esime. La radice n-esima di a è a elevato a uno su n. Due fatti da sapere, e poi l\'esercizio del professore.' },
    { show:'Fatto 1: '+LIM+' '+R('n','a')+' = 1 · 2<sup>1/10</sup> ≈ 1,072 · 2<sup>1/100</sup> ≈ 1,007',
      say:'Primo fatto: la radice n-esima di un numero fisso tende a uno. Con a uguale a due: due alla un decimo è circa uno virgola zero settantadue, due alla un centesimo è circa uno virgola zero zero sette. Si avvicina a uno, perché l\'esponente uno su n tende a zero, e un numero elevato a zero fa uno.' },
    { show:'Fatto 2: '+LIM+' '+R('n','n')+' = 1 · 10<sup>1/10</sup> ≈ 1,259 · 100<sup>1/100</sup> ≈ 1,047 · 1000<sup>1/1000</sup> ≈ 1,007',
      say:'Secondo fatto: anche la radice n-esima di n tende a uno. Dieci alla un decimo è circa uno virgola duecentocinquantanove, cento alla un centesimo uno virgola zero quarantasette, mille alla un millesimo uno virgola zero zero sette. Va a uno.' },
    { show:'Esercizio: '+LIM+' '+R('n','2ⁿ + 3ⁿ')+' · n = 10: 1024 + 59 049 = 60 073 → 60 073<sup>1/10</sup> ≈ 3,005',
      say:'Ora l\'esercizio: radice n-esima di due alla n più tre alla n. Prima i numeri: con n uguale a dieci, due alla dieci è milleventiquattro, tre alla dieci è cinquantanovemilaquarantanove. La somma è sessantamilasettantatré, e la radice decima fa circa tre virgola zero zero cinque. Sembra tendere a tre.' },
    { show:'Carabiniere sotto: tolgo 2ⁿ → 3ⁿ ≤ 2ⁿ + 3ⁿ · n = 2: 9 ≤ 13',
      say:'Dimostriamolo con i carabinieri. Carabiniere sotto: se tolgo due alla n, la somma diventa più piccola. Quindi tre alla n è minore o uguale a due alla n più tre alla n. Con n uguale a due: nove minore o uguale tredici.' },
    { show:'Carabiniere sopra: 2ⁿ ≤ 3ⁿ → 2ⁿ + 3ⁿ ≤ 3ⁿ + 3ⁿ = 2 · 3ⁿ · n = 2: 13 ≤ 18',
      say:'Carabiniere sopra: due alla n è più piccolo di tre alla n. Se al suo posto metto tre alla n, la somma diventa più grande: tre alla n più tre alla n, cioè due per tre alla n. Con n uguale a due: tredici minore o uguale diciotto.' },
    { show:R('n','3ⁿ')+' ≤ '+R('n','2ⁿ + 3ⁿ')+' ≤ '+R('n','2 · 3ⁿ'),
      say:'Faccio la radice n-esima di tutti e tre i pezzi. La radice di un numero più grande è più grande, quindi i segni restano uguali.' },
    { show:'Sotto: '+R('n','3ⁿ')+' = 3 · Sopra: '+R('n','2 · 3ⁿ')+' = '+R('n','2')+' · 3',
      say:'Sotto: la radice n-esima di tre alla n è tre, la radice smonta la potenza. Sopra: la radice di un prodotto è il prodotto delle radici, quindi radice n-esima di due per tre.' },
    { show:R('n','2')+' · 3: n = 10 → 1,072 · 3 ≈ 3,215 · n = 100 → 1,007 · 3 ≈ 3,021 → 1 · 3 = 3',
      say:'La radice n-esima di due tende a uno, per il fatto uno. Con n uguale a dieci il carabiniere sopra vale circa tre virgola due, con cento circa tre virgola zero due. Tende a uno per tre, cioè tre.' },
    { show:'Sotto → 3, sopra → 3 → '+LIM+' '+R('n','2ⁿ + 3ⁿ')+' = <b>3</b>',
      say:'Carabiniere sotto tre, carabiniere sopra tende a tre. Stesso limite, quindi il limite è tre. Vince il più grande dei due numeri sotto la radice.' }
  ]);

  guided('radici', 'lavagna-radici', [
    { h:'Passo 1 · Carabiniere sotto: togli il più piccolo. Carabiniere sopra: al posto di 2ⁿ metti un altro 3ⁿ', type:'nums', ans:[2],
      html:'<span class="box cop">3ⁿ</span> ≤ <span class="box thief">2ⁿ + 3ⁿ</span> ≤ 3ⁿ + 3ⁿ = '+inp('quante volte 3 alla n','3.5em')+' · 3ⁿ',
      ok:'Sì: 3ⁿ + 3ⁿ = 2 · 3ⁿ.', bad:'Quanti 3ⁿ hai sommato? Uno più uno…' },
    { h:'Passo 2 · Fai la radice n-esima di tutti e tre i pezzi. Quanto fa la radice n-esima di 3ⁿ?', type:'nums', ans:[3],
      html: R('n','3ⁿ')+' = '+inp('radice di 3 alla n'),
      ok:'Giusto: la radice n-esima smonta la potenza n.', bad:'La radice n-esima e la potenza n si annullano a vicenda.' },
    { h:'Passo 3 · E il carabiniere sopra, la radice n-esima di 2 · 3ⁿ?', type:'choice', ans:0,
      html:'',
      opts:[R('n','2')+' · 3, che per n → +∞ tende a 1 · 3 = 3','2 · 3 = 6','tende a +∞'],
      ok:'Esatto: la radice si divide sul prodotto, e '+LIM+' '+R('n','2')+' = 1 (fatto numero 1).', bad:'Spezza: radice di 2·3ⁿ = (radice n-esima di 2) · (radice n-esima di 3ⁿ). Il primo pezzo, per n → +∞, dove va?' },
    { h:'Passo 4 · Per n → +∞ i due carabinieri tendono entrambi a 3. Quanto fa il limite?', type:'nums', ans:[3],
      html:LIM+' '+R('n','2ⁿ+3ⁿ')+' = '+inp('valore del limite'), ok:'Perfetto! Sotto: 3 sempre. Sopra: '+R('n','2')+' · 3, con n = 10 vale 1,072 · 3 ≈ 3,215, con n = 100 vale 1,007 · 3 ≈ 3,021 → 3. Stesso limite, quindi 3.', bad:'Carabiniere sotto 3, carabiniere sopra 3…' }
  ], '<b>Fatto!</b> 3 ≤ '+R('n','2ⁿ+3ⁿ')+' ≤ '+R('n','2')+' · 3, e per n → +∞ tutti e due gli estremi tendono a 3. Quindi '+LIM+' '+R('n','2ⁿ+3ⁿ')+' = 3: vince il più grande.');

  EX['radici'] = [
      { id:'e1', type:'num', q:LIM+' '+R('n','5ⁿ + 4ⁿ'), a:5, hint:'Comanda il più grande: 5ⁿ ≤ 5ⁿ + 4ⁿ ≤ 2 · 5ⁿ.', sol:SV(
        '<i>Chi comanda sotto la radice?</i> 5ⁿ, perché 5 &gt; 4',
        '<i>Carabiniere sotto (tolgo un pezzo positivo, la somma diventa più piccola):</i> 5ⁿ ≤ 5ⁿ + 4ⁿ',
        '<i>Carabiniere sopra (4ⁿ ≤ 5ⁿ, quindi lo sostituisco con 5ⁿ):</i> 5ⁿ + 4ⁿ ≤ 5ⁿ + 5ⁿ = 2 · 5ⁿ',
        '<i>Faccio la radice n-esima di tutti e tre:</i> '+R('n','5ⁿ')+' ≤ '+R('n','5ⁿ + 4ⁿ')+' ≤ '+R('n','2 · 5ⁿ'),
        '<i>Semplifico:</i> '+R('n','5ⁿ')+' = 5 e '+R('n','2 · 5ⁿ')+' = '+R('n','2')+' · 5',
        '<i>Limiti:</i> 5 resta 5; '+R('n','2')+' tende a 1 (fatto 1), quindi '+R('n','2')+' · 5 tende a 5',
        '<i>Carabinieri:</i> il limite è <b>5</b>') },
      { id:'e2', type:'num', q:LIM+' '+R('n','n³'), a:1, hint:R('n','n³')+' = '+R('n','n')+' · '+R('n','n')+' · '+R('n','n')+'. Per n → +∞ ognuno tende a…', sol:SV(
        '<i>Spezzo n³ = n · n · n:</i> '+R('n','n³')+' = '+R('n','n')+' · '+R('n','n')+' · '+R('n','n'),
        '<i>Uso il fatto 2:</i> '+LIM+' '+R('n','n')+' = 1',
        '<i>Prodotto dei limiti:</i> 1 · 1 · 1 = <b>1</b>') },
      { id:'e3', type:'num', q:LIM+' '+R('n','3n'), a:1, hint:'Spezza: '+R('n','3')+' · '+R('n','n')+'.', sol:SV(
        '<i>La radice di un prodotto è il prodotto delle radici:</i> '+R('n','3n')+' = '+R('n','3')+' · '+R('n','n'),
        '<i>Primo pezzo (fatto 1, numero fisso):</i> '+LIM+' '+R('n','3')+' = 1',
        '<i>Secondo pezzo (fatto 2):</i> '+LIM+' '+R('n','n')+' = 1',
        '<i>Prodotto:</i> 1 · 1 = <b>1</b>. Attenzione: qui 3n vuol dire 3 per n, non 3ⁿ') },
      { id:'e4', type:'num', q:LIM+' '+R('n','7ⁿ + n'), a:7, hint:'n è piccolissimo rispetto a 7ⁿ: da un certo n in poi 7ⁿ ≤ 7ⁿ + n ≤ 2 · 7ⁿ.', sol:SV(
        '<i>Chi comanda sotto la radice?</i> 7ⁿ: con n = 3 è 343 contro 3, e la differenza cresce',
        '<i>Carabiniere sotto: tolgo il pezzo n (positivo), la somma diventa più piccola:</i> 7ⁿ ≤ 7ⁿ + n',
        '<i>Carabiniere sopra: n ≤ 7ⁿ per ogni n ≥ 1, quindi sostituisco n con 7ⁿ:</i> 7ⁿ + n ≤ 7ⁿ + 7ⁿ = 2 · 7ⁿ',
        '<i>Il carabiniere sotto NON è il pezzo più piccolo (n): è una cosa ≤ della somma che ha un limite facile.</i> Per questo uso 7ⁿ',
        '<i>Radice n-esima di tutti e tre:</i> 7 ≤ '+R('n','7ⁿ + n')+' ≤ '+R('n','2')+' · 7',
        '<i>Limiti:</i> 7 resta 7; '+R('n','2')+' · 7 tende a 1 · 7 = 7',
        '<i>Carabinieri:</i> il limite è <b>7</b>') },
      { id:'e5', type:'num', q:LIM+' <span class="fr"><span>3<sup>n+1</sup> + 5<sup>n+1</sup></span><span>3ⁿ + 5ⁿ</span></span> <span style="font-size:1rem">(esercizio per casa del prof)</span>', a:5,
        hint:'Qui non c\'è radice. Raccogli 5ⁿ sopra e sotto. Ricorda 5<sup>n+1</sup> = 5 · 5ⁿ e '+LIM+' (3/5)ⁿ = 0.', sol:SV(
        '<i>Spezzo gli esponenti n + 1:</i> 3<sup>n+1</sup> = 3 · 3ⁿ e 5<sup>n+1</sup> = 5 · 5ⁿ',
        '<i>Riscrivo:</i> '+FR('3 · 3ⁿ + 5 · 5ⁿ','3ⁿ + 5ⁿ'),
        '<i>Raccolgo chi comanda (5ⁿ) sopra:</i> 3 · 3ⁿ + 5 · 5ⁿ = 5ⁿ (3 · '+FR('3ⁿ','5ⁿ')+' + 5) = 5ⁿ (3 · (3/5)ⁿ + 5)',
        '<i>Raccolgo 5ⁿ sotto:</i> 3ⁿ + 5ⁿ = 5ⁿ ((3/5)ⁿ + 1)',
        '<i>Semplifico 5ⁿ:</i> '+FR('3 · (3/5)ⁿ + 5','(3/5)ⁿ + 1'),
        '<i>Limite: 3/5 &lt; 1, quindi</i> '+LIM+' (3/5)ⁿ = 0',
        '<i>Sostituisco:</i> '+FR('3 · 0 + 5','0 + 1')+' = <b>5</b>') }
    ];
