  /* ===== capitolo 7: Serie con parametro e Leibniz ===== */
  order.push('serie-parametro'); NAMES['serie-parametro'] = '7 Serie con parametro';
  const AS = [
    { r:n=>((n+3)/(n*n*n+1))/(1/(n*n)), l:'1', calc:[
      '<i>Rapporto:</i> '+FR('n + 3','n³ + 1')+' : '+FR('1','n²')+' = '+FR('n + 3','n³ + 1')+' · n² = '+FR('n³ + 3n²','n³ + 1'),
      '<i>Con i numeri:</i> n = 10 → 1300/1001 ≈ 1,30; n = 40 → 68 800/64 001 ≈ 1,07',
      '<i>Limite (divido per n³):</i> '+FR('1 + 3/n','1 + 1/n³')+' → '+FR('1 + 0','1 + 0')+' = 1',
      '<i>ℓ = 1, finito e ≠ 0:</i> stesso carattere di Σ 1/n²',
      '<i>Conclusione:</i> p = 2 &gt; 1, quindi Σ (n+3)/(n³+1) <b>converge</b>'] },
    { r:n=>Math.sin(1/n)/(1/n), l:'1', calc:[
      '<i>Rapporto:</i> sin(1/n) : '+FR('1','n')+' = '+FR('sin(1/n)','1/n'),
      '<i>Chiamo t = 1/n:</i> per n → +∞, t tende a 0, e il rapporto è sin t / t',
      '<i>Con i numeri:</i> n = 2 → sin(0,5)/0,5 ≈ 0,479/0,5 ≈ 0,96; n = 10 → sin(0,1)/0,1 ≈ 0,0998/0,1 ≈ 0,998',
      '<i>Limite notevole:</i> sin t / t → 1 per t → 0, quindi ℓ = 1',
      '<i>Conclusione:</i> stesso carattere di Σ 1/n (armonica, p = 1), quindi Σ sin(1/n) <b>diverge</b>'] },
    { r:n=>Math.log(1+1/(n*n))/(1/(n*n)), l:'1', calc:[
      '<i>Rapporto:</i> ln(1 + 1/n²) : '+FR('1','n²')+' = '+FR('ln(1 + 1/n²)','1/n²'),
      '<i>Chiamo t = 1/n²:</i> per n → +∞, t tende a 0, e il rapporto è ln(1 + t)/t',
      '<i>Con i numeri:</i> n = 2 → ln(1,25)/0,25 ≈ 0,223/0,25 ≈ 0,89; n = 10 → ln(1,01)/0,01 ≈ 0,00995/0,01 ≈ 0,995',
      '<i>Limite notevole:</i> ln(1 + t)/t → 1 per t → 0, quindi ℓ = 1',
      '<i>Conclusione:</i> stesso carattere di Σ 1/n² (p = 2 &gt; 1), quindi <b>converge</b>'] },
    { r:n=>(1-Math.cos(1/n))/(1/(n*n)), l:'1/2', calc:[
      '<i>Rapporto:</i> (1 − cos(1/n)) : '+FR('1','n²')+' = '+FR('1 − cos(1/n)','1/n²'),
      '<i>Chiamo t = 1/n:</i> 1/n² = t², e il rapporto è (1 − cos t)/t² con t → 0',
      '<i>Con i numeri:</i> n = 10 → (1 − cos 0,1)/0,01 ≈ 0,0049958/0,01 ≈ 0,4996',
      '<i>Limite notevole:</i> (1 − cos t)/t² → 1/2 per t → 0, quindi ℓ = 1/2',
      '<i>ℓ = 1/2 è finito e ≠ 0:</i> va bene lo stesso, non serve che sia 1',
      '<i>Conclusione:</i> stesso carattere di Σ 1/n² (p = 2 &gt; 1), quindi <b>converge</b>'] }
  ];
  draws['serie-parametro'] = () => {
    const a = AS[+$('asS').value];
    plot($('plotAs'), { N:40, zero:false, series:[{f:a.r, color:'--thief'}], hlines:[{y:a.l==='1/2'?0.5:1, color:'--cop', label:'ℓ = '+a.l}] });
    $('asOut').innerHTML = SV(...a.calc);
    const S=[0]; for (let n=1;n<=40;n++) S[n]=S[n-1]+(n%2===1?1:-1)/n;
    plot($('plotLeib'), { N:40, zero:false, series:[{f:n=>S[n], color:'--thief', line:true},{f:n=>S[n], color:'--thief'}], hlines:[{y:Math.log(2), color:'--cop', label:'0,693…'}] });
  };
  $('asS').addEventListener('change', () => draws['serie-parametro']());

  video('serie-parametro', [
    { show:'<h3>Serie con parametro</h3>Tre attrezzi: confronto asintotico, Leibniz, schema con parametro',
      say:'In questa lezione vediamo tre attrezzi: il confronto asintotico, il criterio di Leibniz, e lo schema per le serie con parametro. Facciamo tutti i calcoli.' },
    { show:'Attrezzo 1. Esempio: '+SUM(1)+' '+FR('n + 3','n³ + 1'),
      say:'Primo esempio: la serie di n più tre, diviso n al cubo più uno.' },
    { show:'Termine dominante: sopra n, sotto n³ → b<sub>n</sub> = '+FR('n','n³')+' = '+FR('1','n²'),
      say:'Per n molto grande, sopra conta n e sotto conta n al cubo. Quindi il termine assomiglia a n su n al cubo, cioè uno su n al quadrato. Lo chiamo b con n.' },
    { show:'Rapporto: '+FR('n + 3','n³ + 1')+' · n² = '+FR('n³ + 3n²','n³ + 1'),
      say:'Controllo facendo il rapporto tra a con n e b con n. Dividere per uno su n al quadrato vuol dire moltiplicare per n al quadrato. Sopra viene n al cubo più tre n al quadrato, sotto n al cubo più uno.' },
    { show:'n = 10 → 1300/1001 ≈ 1,30 · n = 100 → 1 030 000/1 000 001 ≈ 1,03',
      say:'Con i numeri: per n uguale a dieci viene milletrecento su milleuno, circa uno virgola tre. Per n uguale a cento viene circa uno virgola zero tre. Si avvicina a uno.' },
    { show:'Divido per n³: '+FR('1 + 3/n','1 + 1/n³')+' → '+FR('1 + 0','1 + 0')+' = 1',
      say:'Per il limite divido sopra e sotto per n al cubo: uno più tre su n, diviso uno più uno su n al cubo. Tre su n e uno su n al cubo tendono a zero, quindi il rapporto tende a uno.' },
    { show:'ℓ = 1, finito e ≠ 0 → stesso carattere di Σ 1/n², p = 2 &gt; 1 → <b>converge</b>',
      say:'Il limite è uno, un numero finito e diverso da zero. Allora le due serie fanno la stessa fine. La serie di uno su n al quadrato converge perché p è due, maggiore di uno. Quindi anche la nostra converge.' },
    { show:'Perché: da un certo n in poi 0,5 · b<sub>n</sub> ≤ a<sub>n</sub> ≤ 2 · b<sub>n</sub>',
      say:'Perché funziona? Se il rapporto tende a uno, da un certo punto in poi sta tra zero virgola cinque e due. Quindi a con n è al massimo due volte b con n. Se la serie dei b converge, converge anche quella dei due b, e la nostra è più piccola, quindi converge.' },
    { show:'Attrezzo 2. Leibniz: 1 − '+FR('1','2')+' + '+FR('1','3')+' − '+FR('1','4')+' + …',
      say:'Secondo attrezzo: le serie a segni alterni. Esempio: uno meno un mezzo più un terzo meno un quarto, e così via.' },
    { show:'S₁ = 1 · S₂ = 1 − 0,5 = 0,5 · S₃ = 0,5 + 0,333 = 0,833 · S₄ = 0,833 − 0,25 = 0,583',
      say:'Calcolo le somme parziali. S uno è uno. S due è uno meno zero virgola cinque, cioè zero virgola cinque. S tre è zero virgola cinque più zero virgola trecentotrentatré, cioè zero virgola ottocentotrentatré. S quattro è zero virgola ottocentotrentatré meno zero virgola venticinque, cioè zero virgola cinquecentottantatré.' },
    { show:'S₅ = 0,583 + 0,2 = 0,783 · S₆ = 0,783 − 0,167 = 0,617<br>Dispari scendono: 1; 0,833; 0,783 · Pari salgono: 0,5; 0,583; 0,617',
      say:'S cinque è zero virgola settecentottantatré, S sei è zero virgola seicentodiciassette. Guarda: le somme dispari scendono, le pari salgono. E la distanza tra loro è il termine che aggiungo, che diventa sempre più piccolo. Si stringono su zero virgola seicentonovantatré.' },
    { show:'Leibniz: b<sub>n</sub> ≥ 0 decrescente e '+LIM+' b<sub>n</sub> = 0 ⇒ Σ (−1)ⁿ b<sub>n</sub> converge',
      say:'Il criterio di Leibniz dice proprio questo: se b con n è positivo, decrescente, e tende a zero per n che tende a più infinito, la serie a segni alterni converge.' },
    { show:'Attrezzo 3. Per quali x converge '+SUM(1)+' '+FR('xⁿ','n')+' ?',
      say:'Terzo attrezzo: le serie con parametro. Per quali x converge la serie di x alla n diviso n?' },
    { show:FR('|x|<sup>n+1</sup>','n + 1')+' · '+FR('n','|x|ⁿ')+' = |x| · '+FR('n','n + 1')+' → |x| · 1 = |x|',
      say:'Uso il rapporto con il valore assoluto. Il termine n più uno diviso il termine n fa: valore assoluto di x alla n più uno su n più uno, per n su valore assoluto di x alla n. Si semplifica e resta valore assoluto di x per n su n più uno. n su n più uno tende a uno, quindi L è il valore assoluto di x.' },
    { show:'|x| &lt; 1 → converge · |x| &gt; 1 → non converge · x = 0,5: L = 0,5 · x = 2: L = 2',
      say:'Se il valore assoluto di x è minore di uno, converge. Per esempio x uguale a zero virgola cinque dà L uguale a zero virgola cinque. Se è maggiore di uno non converge: con x uguale a due, L è due.' },
    { show:'x = 1: '+FR('1ⁿ','n')+' = '+FR('1','n')+' → armonica, <b>diverge</b>',
      say:'Ora i confini, dove L è uno e il criterio non dice niente. Con x uguale a uno, uno alla n su n è uno su n: la serie armonica, che diverge.' },
    { show:'x = −1: '+FR('(−1)ⁿ','n')+' → Leibniz: 1/n → 0 e decresce → <b>converge</b>',
      say:'Con x uguale a meno uno viene meno uno alla n su n: segni alterni. Uno su n tende a zero ed è decrescente, quindi per Leibniz converge.' },
    { show:'Risposta: converge per <b>−1 ≤ x &lt; 1</b>',
      say:'Metto insieme: converge per x maggiore o uguale a meno uno e minore di uno. Meno uno è incluso, uno è escluso. Questo è lo schema di quasi tutti gli esercizi con parametro.' }
  ]);

  guided('serie-parametro', 'lavagna-serie-parametro', [
    { h:'Passo 1 · Rapporto con il valore assoluto: |a<sub>n+1</sub>| / |a<sub>n</sub>| = |x| · n/(n+1). Quanto fa il limite per n → +∞?', type:'choice', ans:1,
      opts:['L = 1','L = |x|','L = x²'],
      ok:'Giusto. I calcoli: |a<sub>n+1</sub>|/|a<sub>n</sub>| = '+FR('|x|<sup>n+1</sup>','n + 1')+' · '+FR('n','|x|ⁿ')+' = |x| · '+FR('n','n + 1')+'. Poi '+FR('n','n + 1')+' = '+FR('1','1 + 1/n')+' → '+FR('1','1 + 0')+' = 1 per n → +∞. Quindi L = |x| · 1 = |x|.', bad:'|x|<sup>n+1</sup>/|x|ⁿ = |x|, e '+LIM+' n/(n+1) = …' },
    { h:'Passo 2 · Cosa dice il criterio?', type:'choice', ans:0,
      opts:['Se |x| &lt; 1 converge (anche assolutamente), se |x| &gt; 1 non converge','Converge sempre','Se |x| &lt; 1 diverge'],
      ok:'Esatto. Esempi: x = 0,5 → L = 0,5 &lt; 1, converge; x = 3 → L = 3 &gt; 1, non converge. Restano i confini |x| = 1, cioè x = 1 e x = −1, dove L = 1 e il criterio non dice niente.', bad:'L &lt; 1 → converge, L &gt; 1 → no. Qui L = |x|.' },
    { h:'Passo 3 · Caso x = 1: la serie diventa Σ 1/n. Che fine fa?', type:'choice', ans:1,
      opts:['Converge','Diverge: è l\'armonica','È irregolare'],
      ok:'Sì. Con x = 1: xⁿ/n = 1ⁿ/n = 1/n. È l\'armonica Σ 1/n<sup>p</sup> con p = 1, e p ≤ 1 diverge.', bad:'Σ 1/n è la serie armonica.' },
    { h:'Passo 4 · Caso x = −1: la serie diventa Σ (−1)ⁿ/n. Che fine fa?', type:'choice', ans:0,
      opts:['Converge per Leibniz: 1/n decresce e tende a 0','Diverge come l\'armonica','Non si può dire'],
      ok:'Perfetto. Con x = −1: (−1)ⁿ/n, segni alterni con b<sub>n</sub> = 1/n. Controllo 1: '+LIM+' 1/n = 0 ✓. Controllo 2: 1 &gt; 1/2 &gt; 1/3 &gt; …, decrescente ✓. Leibniz: converge.', bad:'Segni alterni: quale criterio?' },
    { h:'Passo 5 · Risposta finale: per quali x converge?', type:'choice', ans:2,
      opts:['−1 &lt; x &lt; 1','−1 &lt; x ≤ 1','−1 ≤ x &lt; 1'],
      ok:'Perfetto! x = −1 incluso (Leibniz), x = 1 escluso (armonica).', bad:'Rimetti insieme: |x| &lt; 1 sì, x = 1 no, x = −1 sì.' }
  ], '<b>Fatto!</b> '+SUM(1)+' xⁿ/n converge per −1 ≤ x &lt; 1. Questo è lo schema di quasi tutti gli esercizi con parametro: criterio con |x|, poi i confini a mano.');

  const CV2 = ['converge','diverge','non converge (irregolare)'];
  EX['serie-parametro'] = [
    { id:'e1', type:'choice', q:SUM(1)+' '+FR('n + 3','n³ + 1'), a:0, opts:CV2, hint:'Termine dominante sopra e sotto: n/n³.', sol:SV(
      '<i>Termine dominante sopra:</i> in n + 3, per n → +∞ conta n',
      '<i>Termine dominante sotto:</i> in n³ + 1 conta n³',
      '<i>Scrivo l\'equivalenza:</i> '+FR('n + 3','n³ + 1')+' ~ '+FR('n','n³'),
      '<i>Semplifico:</i> '+FR('n','n³')+' = '+FR('1','n²'),
      '<i>Controllo (rapporto tra i due termini):</i> '+LIM+' '+FR('(n + 3)/(n³ + 1)','1/n²')+' = '+LIM+' '+FR('n³ + 3n²','n³ + 1')+' = 1, finito e ≠ 0 ✓',
      '<i>Confronto asintotico:</i> stessa fine di Σ 1/n², che ha p = 2 &gt; 1',
      '<i>Conclusione:</i> <b>converge</b>') },
    { id:'e2', type:'choice', q:SUM(1)+' '+FR('2n + 1','n² + 4'), a:1, opts:CV2, hint:'Termine dominante: 2n/n² = 2/n. La costante 2 non conta.', sol:SV(
      '<i>Termine dominante sopra:</i> 2n',
      '<i>Termine dominante sotto:</i> n²',
      '<i>Scrivo l\'equivalenza:</i> '+FR('2n + 1','n² + 4')+' ~ '+FR('2n','n²')+' = '+FR('2','n'),
      '<i>La costante 2 non cambia la fine:</i> Σ 2/n = 2 · Σ 1/n',
      '<i>Ricordo:</i> Σ 1/n è l\'armonica, p = 1, diverge',
      '<i>Conclusione:</i> <b>diverge</b>') },
    { id:'e3', type:'choice', q:SUM(1)+' sin(1/n²)', a:0, opts:CV2, hint:'Per n → +∞, 1/n² tende a 0, e sin(piccolo) ~ piccolo.', sol:SV(
      '<i>Guardo cosa c\'è dentro il seno:</i> 1/n² tende a 0 per n → +∞',
      '<i>Uso il limite notevole sin(t)/t → 1 per t → 0, con t = 1/n²:</i> sin(1/n²) ~ 1/n²',
      '<i>Termini positivi (sin di un numero piccolo positivo è positivo):</i> posso usare il confronto asintotico',
      '<i>Confronto:</i> stessa fine di Σ 1/n², p = 2 &gt; 1',
      '<i>Conclusione:</i> <b>converge</b>') },
    { id:'e4', type:'choice', q:SUM(1)+' '+FR('(−1)ⁿ','√n'), a:0, opts:CV2, hint:'Segni alterni. 1/√n è decrescente? Tende a 0?', sol:SV(
      '<i>Riconosco il tipo:</i> segni alterni, Σ (−1)ⁿ b<sub>n</sub> con b<sub>n</sub> = 1/√n ≥ 0',
      '<i>Leibniz, controllo 1 (b<sub>n</sub> tende a 0):</i> '+LIM+' 1/√n = 0 ✓',
      '<i>Leibniz, controllo 2 (b<sub>n</sub> decrescente):</i> se n cresce, √n cresce, quindi 1/√n diminuisce ✓',
      '<i>Applico Leibniz:</i> tutte e due le condizioni valgono',
      '<i>Conclusione:</i> <b>converge</b> (senza i segni, Σ 1/√n divergerebbe: p = 1/2)') },
    { id:'e5', type:'choice', q:SUM(1)+' (−1)ⁿ · '+FR('n','n + 1'), a:2, opts:CV2, hint:'Primo controllo: il termine tende a 0? n/(n+1) per n → +∞ tende a…', sol:SV(
      '<i>Primo controllo, condizione necessaria:</i> il termine deve tendere a 0',
      '<i>Guardo la parte senza segno:</i> '+FR('n','n + 1')+' = '+FR('1','1 + 1/n')+', che tende a 1 per n → +∞',
      '<i>Quindi i termini:</i> per n pari sono vicini a +1, per n dispari vicini a −1: non tendono a 0',
      '<i>Condizione necessaria non vale:</i> la serie non converge',
      '<i>Le somme parziali:</i> aggiungono circa +1, −1, +1, −1… e oscillano senza fermarsi',
      '<i>Conclusione:</i> <b>non converge (irregolare)</b>. Leibniz non si può usare: b<sub>n</sub> non tende a 0') },
    { id:'e6', type:'choice', q:SUM(1)+' 1 − cos(1/n)', a:0, opts:CV2, hint:'Equivalenza: 1 − cos(piccolo) ~ (piccolo)²/2.', sol:SV(
      '<i>Guardo cosa c\'è dentro il coseno:</i> 1/n tende a 0',
      '<i>Uso il limite notevole (1 − cos t)/t² → 1/2 per t → 0, con t = 1/n:</i> 1 − cos(1/n) ~ '+FR('1','2')+' · '+FR('1','n²'),
      '<i>Termini positivi:</i> cos(1/n) &lt; 1, quindi 1 − cos(1/n) &gt; 0',
      '<i>Confronto asintotico:</i> stessa fine di Σ 1/(2n²), cioè di Σ 1/n² (la costante 1/2 non conta), p = 2',
      '<i>Conclusione:</i> <b>converge</b>') },
    { id:'e7', type:'choice', q:'Per quali α converge '+SUM(1)+' '+FR('1','n<sup>α − 1</sup>')+' ?', a:1, opts:['α &gt; 1','α &gt; 2','α ≥ 2'], hint:'È una 1/n<sup>p</sup> con p = α − 1. Serve p &gt; 1.', sol:SV(
      '<i>Riconosco il tipo:</i> armonica generalizzata con p = α − 1',
      '<i>Scrivo la condizione per convergere:</i> p &gt; 1',
      '<i>Sostituisco p:</i> α − 1 &gt; 1',
      '<i>Porto 1 dall\'altra parte:</i> α &gt; 1 + 1',
      '<i>Conclusione:</i> converge per <b>α &gt; 2</b> (con α = 2 è l\'armonica e diverge)') },
    { id:'e8', type:'choice', q:'Per quali x converge '+SUM(0)+' xⁿ ?', a:0, opts:['−1 &lt; x &lt; 1','−1 ≤ x ≤ 1','x &gt; 0'], hint:'È la geometrica del capitolo 6 con q = x.', sol:SV(
      '<i>Riconosco il tipo:</i> geometrica con ragione q = x',
      '<i>Ricordo la regola:</i> converge se e solo se |q| &lt; 1',
      '<i>Scrivo |x| &lt; 1 come doppia disuguaglianza:</i> −1 &lt; x &lt; 1',
      '<i>Controllo x = 1:</i> Σ 1ⁿ = 1 + 1 + 1 + … diverge',
      '<i>Controllo x = −1:</i> Σ (−1)ⁿ = 1 − 1 + 1 − … oscilla, irregolare',
      '<i>Conclusione:</i> converge per <b>−1 &lt; x &lt; 1</b>, estremi esclusi') }
  ];
