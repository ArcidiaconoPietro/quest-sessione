  /* ===== capitolo 1: Due carabinieri ===== */
  order.push('carabinieri'); NAMES['carabinieri'] = '1 Due carabinieri';
  draws.carabinieri = () => {
    plot($('plot1'), { N:+$('n1').value, series:[ ...( $('c1').checked ? [{f:n=>-1/n, color:'--cop', line:true},{f:n=>1/n, color:'--cop', line:true}] : []), {f:n=>Math.sin(n)/n, color:'--thief'} ] });
    plot($('plot2'), { N:40, series:[{f:()=>-1, color:'--cop', line:true},{f:()=>1, color:'--cop', line:true},{f:n=>Math.cos(n), color:'--thief'}] });
    plot($('plot3'), { N:40, series:[{f:n=>2/n, color:'--cop', line:true},{f:n=>4/n, color:'--cop', line:true},{f:n=>(3+Math.cos(n))/n, color:'--thief'}] });
  };
  $('n1').addEventListener('input', () => { $('n1v').textContent = $('n1').value; draws.carabinieri(); });
  $('c1').addEventListener('change', () => draws.carabinieri());

  guided('carabinieri', 'lavagna-carabinieri', [
    { h:'Passo 1 · Parti da −1 ≤ cos n ≤ 1 e aggiungi 3 a tutti e tre i pezzi', type:'nums', ans:[2,4],
      html: inp('numero a sinistra')+' ≤ <span class="box thief">3 + cos n</span> ≤ '+inp('numero a destra'),
      ok:'Giusto: −1+3 = 2 e 1+3 = 4.', bad:'Non ancora. Fai −1 + 3 e poi 1 + 3.' },
    { h:'Passo 2 · Ora dividi tutto per n. Quale riga è giusta?', type:'choice', ans:1,
      opts:['3/n ≤ (3 + cos n)/n ≤ 5/n','2/n ≤ (3 + cos n)/n ≤ 4/n','2 ≤ (3 + cos n)/n ≤ 4'],
      ok:'Esatto: divido 2, 3+cos n e 4 per n.', bad:'Ricontrolla: i numeri del passo 1 erano 2 e 4, e vanno divisi per n tutti e tre i pezzi.' },
    { h:'Passo 3 · Per n → +∞, dove vanno i carabinieri 2/n e 4/n? Quindi quanto fa il limite?', type:'nums', ans:[0],
      html:LIM+' (3 + cos n)/n = '+inp('valore del limite'), ok:'Perfetto!', bad:'Pensa: 2 diviso un numero enorme quanto fa, più o meno?' }
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
