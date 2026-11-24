  /* ===== capitolo 6: Serie numeriche ===== */
  order.push('serie'); NAMES['serie'] = '6 Serie numeriche';
  const SER = [
    { a:n=>1/Math.pow(2,n), lim:1, txt:'Le somme salgono ma si fermano a 1: la serie <b>converge</b> e la somma è 1.' },
    { a:n=>1/n, lim:null, txt:'Le somme crescono sempre, piano piano, senza fermarsi: la serie <b>diverge</b>. Eppure i termini 1/n tendono a 0!' },
    { a:n=>1/(n*n), lim:Math.PI*Math.PI/6, txt:'Le somme si fermano a circa 1,645: la serie <b>converge</b>. (La somma esatta è π²/6, non serve saperla.)' },
    { a:n=>(n%2===1)?1:-1, lim:null, txt:'Le somme saltano tra 1 e 0 per sempre: la serie è <b>irregolare</b>.' }
  ];
  draws.serie = () => {
    const k = +$('serS').value, N = +$('serN').value, s = SER[k];
    const S = [0]; for (let n=1;n<=N;n++) S[n] = S[n-1] + s.a(n);
    plot($('plotSer'), { N, series:[{f:n=>S[n], color:'--thief'}], hlines: s.lim!==null ? [{y:s.lim, color:'--cop', label:'somma = '+it(s.lim,3)}] : [] });
    $('serOut').innerHTML = 'S<sub>'+N+'</sub> = <b>'+it(S[N],4)+'</b>. '+s.txt;
  };
  $('serS').addEventListener('change', () => draws.serie());
  $('serN').addEventListener('input', () => { $('serNv').textContent = $('serN').value; draws.serie(); });

  guided('serie', 'lavagna-serie', [
    { h:'Passo 1 · Primo controllo: quanto fa il limite del termine generale?', type:'nums', ans:[0],
      html: LIM+' '+FR('n','3ⁿ')+' = '+inp('limite del termine'),
      ok:'Giusto: 3ⁿ batte n (gerarchia degli infiniti), quindi il termine tende a 0. La condizione necessaria è rispettata, ma non basta: serve un criterio.', bad:'Gerarchia: chi cresce più in fretta tra n e 3ⁿ?' },
    { h:'Passo 2 · Quale criterio usi?', type:'choice', ans:1,
      opts:['Confronto con 1/n','Rapporto, perché c\'è 3ⁿ','Radice, perché c\'è la n all\'esponente di tutto'],
      ok:'Esatto: con le potenze tipo 3ⁿ il rapporto si semplifica bene. (Anche la radice funzionerebbe, ma il rapporto è più comodo.)', bad:'Guarda lo schema: c\'è una potenza 3ⁿ ma non è "tutto elevato alla n".' },
    { h:'Passo 3 · Semplifica il rapporto a<sub>n+1</sub> / a<sub>n</sub>', type:'choice', ans:0,
      html: FR('(n+1) / 3<sup>n+1</sup>','n / 3ⁿ')+' = '+FR('n+1','3<sup>n+1</sup>')+' · '+FR('3ⁿ','n'),
      opts:[FR('n+1','3n'), FR('3(n+1)','n'), FR('n+1','n')],
      ok:'Giusto: 3ⁿ / 3<sup>n+1</sup> = 1/3.', bad:'Ricorda 3<sup>n+1</sup> = 3 · 3ⁿ. Cosa resta dopo aver semplificato 3ⁿ?' },
    { h:'Passo 4 · Quanto vale L?', type:'nums', ans:[1/3],
      html: 'L = '+LIM+' '+FR('n+1','3n')+' = '+inp('valore di L'),
      ok:'Sì, L = 1/3.', bad:'Termine dominante: n/(3n). Scrivi la frazione, tipo 1/5.' },
    { h:'Passo 5 · Conclusione', type:'choice', ans:0,
      opts:['L = 1/3 &lt; 1: la serie converge','L = 1/3 &lt; 1: la serie diverge','Non si può dire'],
      ok:'Perfetto!', bad:'Ripassa la regola del rapporto: L &lt; 1 → ?' }
  ], '<b>Fatto!</b> Per il criterio del rapporto, '+LIM+' a<sub>n+1</sub>/a<sub>n</sub> = 1/3 &lt; 1, quindi '+SUM(1)+' n/3ⁿ converge. Questa frase è proprio quella da scrivere all\'esame.');

  const CV = ['converge','diverge','è irregolare'];
  EX['serie'] = [
    { id:'e1', type:'num', q:SUM(0)+' (1/3)ⁿ = ?', a:1.5, hint:'Geometrica con q = 1/3, parte da n = 0: somma 1/(1 − q).', sol:SV(
      '<i>Riconosco il tipo:</i> è una geometrica Σ qⁿ con ragione q = 1/3, che parte da n = 0',
      '<i>Controllo se converge:</i> |q| = 1/3 &lt; 1, quindi converge',
      '<i>Scrivo la formula della somma (vale se parte da n = 0):</i> '+SUM(0)+' qⁿ = '+FR('1','1 − q'),
      '<i>Sostituisco q = 1/3:</i> '+FR('1','1 − 1/3'),
      '<i>Faccio il conto sotto:</i> 1 − 1/3 = 3/3 − 1/3 = 2/3, quindi = '+FR('1','2/3'),
      '<i>Dividere per una frazione = moltiplicare per la capovolta:</i> 1 · '+FR('3','2')+' = <b>3/2</b>') },
    { id:'e2', type:'choice', q:SUM(1)+' '+FR('n + 1','n'), a:1, opts:CV, hint:'Primo controllo: quanto fa il limite del termine per n → +∞?', sol:SV(
      '<i>Primo controllo, la condizione necessaria:</i> calcolo '+LIM+' '+FR('n + 1','n'),
      '<i>Divido sopra e sotto per n:</i> '+FR('n + 1','n')+' = 1 + '+FR('1','n'),
      '<i>Faccio il limite:</i> 1/n tende a 0, quindi 1 + 1/n tende a 1',
      '<i>Confronto con 0:</i> il termine tende a 1 ≠ 0, quindi la serie NON converge',
      '<i>Termini positivi:</i> sommo infinite volte numeri vicini a 1, la somma cresce senza fine',
      '<i>Conclusione:</i> <b>diverge</b> (a +∞)') },
    { id:'e3', type:'choice', q:SUM(1)+' '+FR('1','n³'), a:0, opts:CV, hint:'È una 1/n<sup>p</sup>. Quanto vale p?', sol:SV(
      '<i>Riconosco il tipo:</i> è un\'armonica generalizzata Σ 1/n<sup>p</sup>',
      '<i>Leggo p:</i> p = 3',
      '<i>Ricordo la regola:</i> Σ 1/n<sup>p</sup> converge se p &gt; 1, diverge se p ≤ 1',
      '<i>Confronto:</i> 3 &gt; 1',
      '<i>Conclusione:</i> <b>converge</b>') },
    { id:'e4', type:'choice', q:SUM(1)+' '+FR('1','√n'), a:1, opts:CV, hint:'√n = n<sup>1/2</sup>. Quanto vale p?', sol:SV(
      '<i>Riscrivo la radice come potenza:</i> √n = n<sup>1/2</sup>, quindi '+FR('1','√n')+' = '+FR('1','n<sup>1/2</sup>'),
      '<i>Riconosco il tipo:</i> armonica generalizzata con p = 1/2',
      '<i>Ricordo la regola:</i> converge solo se p &gt; 1',
      '<i>Confronto:</i> 1/2 ≤ 1',
      '<i>Conclusione:</i> <b>diverge</b>') },
    { id:'e5', type:'choice', q:SUM(1)+' '+FR('2ⁿ','n!'), a:0, opts:CV, hint:'C\'è un fattoriale: rapporto. (n+1)! = (n+1) · n!.', sol:SV(
      '<i>Scelgo il criterio:</i> c\'è un fattoriale, uso il rapporto. a<sub>n</sub> = '+FR('2ⁿ','n!'),
      '<i>Scrivo a<sub>n+1</sub> (al posto di n metto n + 1):</i> a<sub>n+1</sub> = '+FR('2<sup>n+1</sup>','(n + 1)!'),
      '<i>Scrivo il rapporto:</i> '+FR('a<sub>n+1</sub>','a<sub>n</sub>')+' = '+FR('2<sup>n+1</sup>','(n + 1)!')+' · '+FR('n!','2ⁿ'),
      '<i>Spezzo 2<sup>n+1</sup> = 2 · 2ⁿ e (n + 1)! = (n + 1) · n!:</i> = '+FR('2 · 2ⁿ','(n + 1) · n!')+' · '+FR('n!','2ⁿ'),
      '<i>Semplifico 2ⁿ e n!:</i> = '+FR('2','n + 1'),
      '<i>Faccio il limite:</i> L = '+LIM+' '+FR('2','n + 1')+' = 0',
      '<i>Applico il criterio delle serie:</i> L = 0 &lt; 1, quindi la serie <b>converge</b>') },
    { id:'e6', type:'choice', q:SUM(1)+' ('+FR('n','2n + 1')+')ⁿ', a:0, opts:CV, hint:'È tutto elevato alla n: radice. La radice n-esima smonta la potenza.', sol:SV(
      '<i>Scelgo il criterio:</i> tutto il termine è elevato alla n, uso la radice',
      '<i>Faccio la radice n-esima (la radice n-esima di (qualcosa)ⁿ è il qualcosa):</i> ⁿ√('+FR('n','2n + 1')+')ⁿ = '+FR('n','2n + 1'),
      '<i>Divido sopra e sotto per n:</i> '+FR('n','2n + 1')+' = '+FR('1','2 + 1/n'),
      '<i>Faccio il limite:</i> 1/n tende a 0, quindi L = '+FR('1','2 + 0')+' = '+FR('1','2'),
      '<i>Applico il criterio:</i> L = 1/2 &lt; 1, quindi la serie <b>converge</b>') },
    { id:'e7', type:'choice', q:SUM(1)+' '+FR('1','n² + 5'), a:0, opts:CV, hint:'Confronto: 1/(n² + 5) è più piccolo di quale serie che conosci?', sol:SV(
      '<i>Scelgo il criterio:</i> somiglia a 1/n², uso il confronto',
      '<i>Confronto i denominatori:</i> n² + 5 &gt; n²',
      '<i>Denominatore più grande = frazione più piccola:</i> '+FR('1','n² + 5')+' &lt; '+FR('1','n²'),
      '<i>So che la serie più grande converge:</i> Σ 1/n² ha p = 2 &gt; 1, converge',
      '<i>Applico il confronto:</i> se la serie più grande converge, anche quella più piccola (a termini positivi) converge',
      '<i>Conclusione:</i> <b>converge</b>') },
    { id:'e8', type:'choice', q:SUM(0)+' (5/4)ⁿ', a:1, opts:CV, hint:'Geometrica: quanto vale q? È minore di 1?', sol:SV(
      '<i>Riconosco il tipo:</i> geometrica con ragione q = 5/4',
      '<i>Calcolo q in decimale:</i> 5/4 = 1,25',
      '<i>Ricordo la regola:</i> converge solo se |q| &lt; 1; se q ≥ 1 diverge',
      '<i>Confronto:</i> 1,25 ≥ 1 (ogni termine è più grande del precedente)',
      '<i>Conclusione:</i> <b>diverge</b> (a +∞)') }
  ];
