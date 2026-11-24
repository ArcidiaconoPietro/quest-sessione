  /* ===== capitolo 7: Serie con parametro e Leibniz ===== */
  order.push('serie-parametro'); NAMES['serie-parametro'] = '7 Serie con parametro';
  const AS = [
    { r:n=>((n+3)/(n*n*n+1))/(1/(n*n)), l:'1', t:'Il rapporto tende a 1: Σ (n+3)/(n³+1) si comporta come Σ 1/n², che converge.' },
    { r:n=>Math.sin(1/n)/(1/n), l:'1', t:'Il rapporto tende a 1: Σ sin(1/n) si comporta come Σ 1/n, che diverge.' },
    { r:n=>Math.log(1+1/(n*n))/(1/(n*n)), l:'1', t:'Il rapporto tende a 1: Σ ln(1 + 1/n²) si comporta come Σ 1/n², che converge.' },
    { r:n=>(1-Math.cos(1/n))/(1/(n*n)), l:'1/2', t:'Il rapporto tende a 1/2 (finito e diverso da 0): Σ (1 − cos(1/n)) si comporta come Σ 1/n², che converge.' }
  ];
  draws['serie-parametro'] = () => {
    const a = AS[+$('asS').value];
    plot($('plotAs'), { N:40, zero:false, series:[{f:a.r, color:'--thief'}], hlines:[{y:a.l==='1/2'?0.5:1, color:'--cop', label:'ℓ = '+a.l}] });
    $('asOut').innerHTML = a.t;
    const S=[0]; for (let n=1;n<=40;n++) S[n]=S[n-1]+(n%2===1?1:-1)/n;
    plot($('plotLeib'), { N:40, zero:false, series:[{f:n=>S[n], color:'--thief', line:true},{f:n=>S[n], color:'--thief'}], hlines:[{y:Math.log(2), color:'--cop', label:'0,693…'}] });
  };
  $('asS').addEventListener('change', () => draws['serie-parametro']());

  guided('serie-parametro', 'lavagna-serie-parametro', [
    { h:'Passo 1 · Rapporto con il valore assoluto: |a<sub>n+1</sub>| / |a<sub>n</sub>| = |x| · n/(n+1). Quanto fa il limite per n → +∞?', type:'choice', ans:1,
      opts:['L = 1','L = |x|','L = x²'],
      ok:'Giusto: '+LIM+' n/(n+1) = 1, quindi resta |x|.', bad:'|x|<sup>n+1</sup>/|x|ⁿ = |x|, e '+LIM+' n/(n+1) = …' },
    { h:'Passo 2 · Cosa dice il criterio?', type:'choice', ans:0,
      opts:['Se |x| &lt; 1 converge (anche assolutamente), se |x| &gt; 1 non converge','Converge sempre','Se |x| &lt; 1 diverge'],
      ok:'Esatto. Restano da fare a mano i confini x = 1 e x = −1, dove L = 1.', bad:'L &lt; 1 → converge, L &gt; 1 → no. Qui L = |x|.' },
    { h:'Passo 3 · Caso x = 1: la serie diventa Σ 1/n. Che fine fa?', type:'choice', ans:1,
      opts:['Converge','Diverge: è l\'armonica','È irregolare'],
      ok:'Sì: armonica, p = 1, diverge.', bad:'Σ 1/n è la serie armonica.' },
    { h:'Passo 4 · Caso x = −1: la serie diventa Σ (−1)ⁿ/n. Che fine fa?', type:'choice', ans:0,
      opts:['Converge per Leibniz: 1/n decresce e tende a 0','Diverge come l\'armonica','Non si può dire'],
      ok:'Perfetto: segni alterni e 1/n decrescente con limite 0.', bad:'Segni alterni: quale criterio?' },
    { h:'Passo 5 · Risposta finale: per quali x converge?', type:'choice', ans:2,
      opts:['−1 &lt; x &lt; 1','−1 &lt; x ≤ 1','−1 ≤ x &lt; 1'],
      ok:'Perfetto! x = −1 incluso (Leibniz), x = 1 escluso (armonica).', bad:'Rimetti insieme: |x| &lt; 1 sì, x = 1 no, x = −1 sì.' }
  ], '<b>Fatto!</b> '+SUM(1)+' xⁿ/n converge per −1 ≤ x &lt; 1. Questo è lo schema di quasi tutti gli esercizi con parametro: criterio con |x|, poi i confini a mano.');

  const CV2 = ['converge','diverge','non converge (irregolare)'];
  EX['serie-parametro'] = [
    { id:'e1', type:'choice', q:SUM(1)+' '+FR('n + 3','n³ + 1'), a:0, opts:CV2, hint:'Termine dominante sopra e sotto: n/n³.', sol:'~ 1/n², p = 2 &gt; 1: converge.' },
    { id:'e2', type:'choice', q:SUM(1)+' '+FR('2n + 1','n² + 4'), a:1, opts:CV2, hint:'Termine dominante: 2n/n² = 2/n. La costante 2 non conta.', sol:'~ 2/n, si comporta come l\'armonica: diverge.' },
    { id:'e3', type:'choice', q:SUM(1)+' sin(1/n²)', a:0, opts:CV2, hint:'Per n → +∞, 1/n² tende a 0, e sin(piccolo) ~ piccolo.', sol:'sin(1/n²) ~ 1/n², p = 2: converge.' },
    { id:'e4', type:'choice', q:SUM(1)+' '+FR('(−1)ⁿ','√n'), a:0, opts:CV2, hint:'Segni alterni. 1/√n è decrescente? Tende a 0?', sol:'Sì e sì: converge per Leibniz. (Senza i segni, Σ 1/√n divergerebbe.)' },
    { id:'e5', type:'choice', q:SUM(1)+' (−1)ⁿ · '+FR('n','n + 1'), a:2, opts:CV2, hint:'Primo controllo: il termine tende a 0? n/(n+1) per n → +∞ tende a…', sol:'n/(n+1) tende a 1, quindi i termini fanno quasi ±1 e non tendono a 0: la serie non converge, le somme oscillano.' },
    { id:'e6', type:'choice', q:SUM(1)+' 1 − cos(1/n)', a:0, opts:CV2, hint:'Equivalenza: 1 − cos(piccolo) ~ (piccolo)²/2.', sol:'~ 1/(2n²), si comporta come Σ 1/n²: converge.' },
    { id:'e7', type:'choice', q:'Per quali α converge '+SUM(1)+' '+FR('1','n<sup>α − 1</sup>')+' ?', a:1, opts:['α &gt; 1','α &gt; 2','α ≥ 2'], hint:'È una 1/n<sup>p</sup> con p = α − 1. Serve p &gt; 1.', sol:'α − 1 &gt; 1, cioè α &gt; 2.' },
    { id:'e8', type:'choice', q:'Per quali x converge '+SUM(0)+' xⁿ ?', a:0, opts:['−1 &lt; x &lt; 1','−1 ≤ x ≤ 1','x &gt; 0'], hint:'È la geometrica del capitolo 6 con q = x.', sol:'Geometrica: converge solo per −1 &lt; x &lt; 1. Per x = 1 diverge, per x = −1 è irregolare.' }
  ];
