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
    { id:'e1', type:'num', q:SUM(0)+' (1/3)ⁿ = ?', a:1.5, hint:'Geometrica con q = 1/3, parte da n = 0: somma 1/(1 − q).', sol:'1/(1 − 1/3) = 1/(2/3) = 3/2.' },
    { id:'e2', type:'choice', q:SUM(1)+' '+FR('n + 1','n'), a:1, opts:CV, hint:'Primo controllo: quanto fa il limite del termine per n → +∞?', sol:LIM+' (n+1)/n = 1 ≠ 0: la condizione necessaria non vale, termini positivi, quindi diverge.' },
    { id:'e3', type:'choice', q:SUM(1)+' '+FR('1','n³'), a:0, opts:CV, hint:'È una 1/n<sup>p</sup>. Quanto vale p?', sol:'p = 3 &gt; 1: converge.' },
    { id:'e4', type:'choice', q:SUM(1)+' '+FR('1','√n'), a:1, opts:CV, hint:'√n = n<sup>1/2</sup>. Quanto vale p?', sol:'p = 1/2 ≤ 1: diverge.' },
    { id:'e5', type:'choice', q:SUM(1)+' '+FR('2ⁿ','n!'), a:0, opts:CV, hint:'C\'è un fattoriale: rapporto. (n+1)! = (n+1) · n!.', sol:'Rapporto = 2/(n+1), e '+LIM+' 2/(n+1) = 0 &lt; 1: converge.' },
    { id:'e6', type:'choice', q:SUM(1)+' ('+FR('n','2n + 1')+')ⁿ', a:0, opts:CV, hint:'È tutto elevato alla n: radice. La radice n-esima smonta la potenza.', sol:'Radice n-esima = n/(2n+1), e '+LIM+' n/(2n+1) = 1/2 &lt; 1: converge.' },
    { id:'e7', type:'choice', q:SUM(1)+' '+FR('1','n² + 5'), a:0, opts:CV, hint:'Confronto: 1/(n² + 5) è più piccolo di quale serie che conosci?', sol:'1/(n² + 5) ≤ 1/n², e Σ 1/n² converge (p = 2): converge.' },
    { id:'e8', type:'choice', q:SUM(0)+' (5/4)ⁿ', a:1, opts:CV, hint:'Geometrica: quanto vale q? È minore di 1?', sol:'q = 5/4 ≥ 1: diverge.' }
  ];
