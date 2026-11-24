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
      html:LIM+' '+R('n','2ⁿ+3ⁿ')+' = '+inp('valore del limite'), ok:'Perfetto!', bad:'Carabiniere sotto 3, carabiniere sopra 3…' }
  ], '<b>Fatto!</b> 3 ≤ '+R('n','2ⁿ+3ⁿ')+' ≤ '+R('n','2')+' · 3, e per n → +∞ tutti e due gli estremi tendono a 3. Quindi '+LIM+' '+R('n','2ⁿ+3ⁿ')+' = 3: vince il più grande.');

  EX['radici'] = [
      { id:'e1', type:'num', q:LIM+' '+R('n','5ⁿ + 4ⁿ'), a:5, hint:'Comanda il più grande: 5ⁿ ≤ 5ⁿ + 4ⁿ ≤ 2 · 5ⁿ.', sol:'5 ≤ '+R('n','5ⁿ+4ⁿ')+' ≤ '+R('n','2')+' · 5, che per n → +∞ tende a 5. Limite 5.' },
      { id:'e2', type:'num', q:LIM+' '+R('n','n³'), a:1, hint:R('n','n³')+' = '+R('n','n')+' · '+R('n','n')+' · '+R('n','n')+'. Per n → +∞ ognuno tende a…', sol:'Ogni pezzo ha limite 1, quindi 1 · 1 · 1 = 1. Limite 1.' },
      { id:'e3', type:'num', q:LIM+' '+R('n','3n'), a:1, hint:'Spezza: '+R('n','3')+' · '+R('n','n')+'.', sol:'Per n → +∞ entrambi i pezzi hanno limite 1 (fatto 1 e fatto 2): limite 1.' },
      { id:'e4', type:'num', q:LIM+' '+R('n','7ⁿ + n'), a:7, hint:'n è piccolissimo rispetto a 7ⁿ: da un certo n in poi 7ⁿ ≤ 7ⁿ + n ≤ 2 · 7ⁿ.', sol:'Carabinieri 7 e '+R('n','2')+' · 7, che per n → +∞ tendono entrambi a 7. Limite 7.' },
      { id:'e5', type:'num', q:LIM+' <span class="fr"><span>3<sup>n+1</sup> + 5<sup>n+1</sup></span><span>3ⁿ + 5ⁿ</span></span> <span style="font-size:1rem">(esercizio per casa del prof)</span>', a:5,
        hint:'Qui non c\'è radice. Raccogli 5ⁿ sopra e sotto. Ricorda 5<sup>n+1</sup> = 5 · 5ⁿ e '+LIM+' (3/5)ⁿ = 0.', sol:'Sopra: 5ⁿ (3·(3/5)ⁿ + 5). Sotto: 5ⁿ ((3/5)ⁿ + 1). Si semplifica 5ⁿ: (0 + 5)/(0 + 1) = 5.' }
    ];
