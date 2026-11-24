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
      { id:'e1', type:'num', q:LIM+' (2 + sin n) / n²', a:0, hint:'Parti da −1 ≤ sin n ≤ 1, aggiungi 2, poi dividi per n².', sol:'1 ≤ 2 + sin n ≤ 3, quindi 1/n² ≤ (2 + sin n)/n² ≤ 3/n². Per n → +∞ entrambi tendono a 0: limite 0.' },
      { id:'e2', type:'num', q:LIM+' (−1)ⁿ / n', a:0, hint:'(−1)ⁿ vale −1 oppure 1: quindi −1 ≤ (−1)ⁿ ≤ 1. Poi dividi per n.', sol:'−1/n ≤ (−1)ⁿ/n ≤ 1/n, e per n → +∞ entrambi tendono a 0: limite 0.' },
      { id:'e3', type:'num', q:LIM+' (n + sin n) / n', a:1, hint:'Aggiungi n: n − 1 ≤ n + sin n ≤ n + 1. Poi dividi per n. Per n → +∞, dove vanno (n−1)/n e (n+1)/n?', sol:'Per n → +∞: (n−1)/n = 1 − 1/n tende a 1 e (n+1)/n = 1 + 1/n tende a 1. Stesso limite: 1. Non sempre fa 0!' },
      { id:'e4', type:'num', q:LIM+' (5 cos n) / n', a:0, hint:'Moltiplica −1 ≤ cos n ≤ 1 per 5 (positivo, i segni restano), poi dividi per n.', sol:'−5/n ≤ 5 cos n / n ≤ 5/n, e per n → +∞ entrambi tendono a 0: limite 0.' }
    ];
