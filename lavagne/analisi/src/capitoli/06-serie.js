  /* ===== capitolo 6: Serie numeriche ===== */
  order.push('serie'); NAMES['serie'] = '6 Serie numeriche';
  const SER = [
    { a:n=>1/Math.pow(2,n), lim:1, txt:'S₁ = 0,5 · S₂ = 0,75 · S₃ = 0,875: ogni volta manca 1/2ⁿ, quindi S<sub>n</sub> = 1 − 1/2ⁿ, che tende a 1 − 0 = 1. La serie <b>converge</b> e la somma è 1.' },
    { a:n=>1/n, lim:null, txt:'S₁ = 1 · S₂ = 1,5 · S₄ ≈ 2,08 · S₈ ≈ 2,72 · S₁₆ ≈ 3,38: ogni volta che raddoppio n aggiungo almeno 1/2 (vedi i blocchi sotto). Cresce piano ma senza fermarsi: la serie <b>diverge</b>. Eppure i termini 1/n tendono a 0!' },
    { a:n=>1/(n*n), lim:Math.PI*Math.PI/6, txt:'S₁ = 1 · S₂ = 1 + 0,25 = 1,25 · S₃ = 1,25 + 0,111 ≈ 1,361 · S₁₀ ≈ 1,550 · S₁₀₀ ≈ 1,635: i pezzi aggiunti diventano piccolissimi molto in fretta e le somme si fermano a circa 1,645. La serie <b>converge</b> (p = 2 &gt; 1).' },
    { a:n=>(n%2===1)?1:-1, lim:null, txt:'S₁ = 1 · S₂ = 1 − 1 = 0 · S₃ = 0 + 1 = 1 · S₄ = 1 − 1 = 0: le somme valgono 1, 0, 1, 0 per sempre, il limite non esiste. La serie è <b>irregolare</b>.' }
  ];
  draws.serie = () => {
    const k = +$('serS').value, N = +$('serN').value, s = SER[k];
    const S = [0]; for (let n=1;n<=N;n++) S[n] = S[n-1] + s.a(n);
    plot($('plotSer'), { N, series:[{f:n=>S[n], color:'--thief'}], hlines: s.lim!==null ? [{y:s.lim, color:'--cop', label:'somma = '+it(s.lim,3)}] : [] });
    $('serOut').innerHTML = 'S<sub>'+N+'</sub> = <b>'+it(S[N],4)+'</b>. '+s.txt;
  };
  $('serS').addEventListener('change', () => draws.serie());
  $('serN').addEventListener('input', () => { $('serNv').textContent = $('serN').value; draws.serie(); });

  video('serie', [
    { show:'<h3>Le serie: sommare infiniti numeri</h3>'+SUM(1)+' a<sub>n</sub> = a₁ + a₂ + a₃ + …',
      say:'Una serie è una somma di infiniti numeri: a uno più a due più a tre, e così via per sempre. La domanda è: questa somma fa un numero preciso, oppure esplode?' },
    { show:'Come si fa: somme parziali S<sub>n</sub> = a₁ + … + a<sub>n</sub>, poi '+LIM+' S<sub>n</sub>',
      say:'Non posso sommare infiniti numeri direttamente. Allora sommo i primi n e chiamo il risultato somma parziale, S con n. Poi guardo cosa fa S con n quando n tende a più infinito.' },
    { show:'Esempio: 1/2 + 1/4 + 1/8 + …<br>S₁ = 1/2 · S₂ = 1/2 + 1/4 = 3/4 · S₃ = 3/4 + 1/8 = 7/8',
      say:'Esempio: un mezzo più un quarto più un ottavo, e così via. S uno è un mezzo. S due è un mezzo più un quarto, cioè due quarti più un quarto, tre quarti. S tre è tre quarti più un ottavo, cioè sei ottavi più un ottavo, sette ottavi.' },
    { show:'Manca sempre l\'ultima fetta: S<sub>n</sub> = 1 − '+FR('1','2ⁿ')+' → 1 − 0 = 1. <b>Converge, somma 1</b>',
      say:'Vedi lo schema: a un mezzo manca un mezzo per arrivare a uno, a tre quarti manca un quarto, a sette ottavi manca un ottavo. Quindi S con n è uno meno uno su due alla n. Due alla n cresce senza fine, quindi uno su due alla n tende a zero, e S con n tende a uno. La serie converge e la somma è uno.' },
    { show:'<h3>La geometrica</h3>'+SUM(0)+' qⁿ = 1 + q + q² + …<br>S<sub>n</sub> = 1 + q + … + qⁿ · q · S<sub>n</sub> = q + q² + … + q<sup>n+1</sup>',
      say:'La serie più importante è la geometrica: uno più q più q al quadrato, e così via. Per trovare la somma parziale uso un trucco: scrivo S con n, e sotto scrivo q per S con n, che è la stessa somma spostata di un posto.' },
    { show:'Sottraggo: tutto si cancella tranne 1 e −q<sup>n+1</sup><br>S<sub>n</sub>(1 − q) = 1 − q<sup>n+1</sup> → S<sub>n</sub> = '+FR('1 − q<sup>n+1</sup>','1 − q'),
      say:'Sottraggo le due righe. q si cancella con meno q, q al quadrato con meno q al quadrato, e così via. Restano solo uno e meno q alla n più uno. A sinistra raccolgo S con n: S con n per uno meno q. Divido per uno meno q e ottengo la formula.' },
    { show:'Se −1 &lt; q &lt; 1: q<sup>n+1</sup> → 0, quindi S<sub>n</sub> → '+FR('1','1 − q')+'<br>Esempio q = 1/2: '+FR('1','1 − 1/2')+' = '+FR('1','1/2')+' = 2',
      say:'Se q sta tra meno uno e uno, q alla n più uno tende a zero: per esempio un mezzo alla dieci è circa un millesimo. Quindi S con n tende a uno diviso uno meno q. Con q uguale a un mezzo: uno diviso un mezzo, che fa due.' },
    { show:'<h3>Primo controllo: condizione necessaria</h3>a<sub>n</sub> = S<sub>n</sub> − S<sub>n−1</sub> → S − S = 0',
      say:'Prima di ogni criterio, si fa sempre un controllo. Il termine a con n è la differenza tra due somme parziali vicine: S con n meno S con n meno uno. Se la serie converge a S, tutte e due tendono a S, quindi a con n tende a S meno S, cioè zero.' },
    { show:'Quindi: se '+LIM+' a<sub>n</sub> ≠ 0 → la serie NON converge<br>Ma attenzione: 1 + 1/2 + 1/3 + … ha termini → 0 e diverge',
      say:'Quindi se il termine non tende a zero, la serie non converge. Attenzione però: se tende a zero non basta. La serie armonica, uno più un mezzo più un terzo, ha termini che tendono a zero eppure diverge.' },
    { show:'Armonica: 1/3 + 1/4 ≥ 1/4 + 1/4 = 1/2 · 1/5 + … + 1/8 ≥ 4 · 1/8 = 1/2 · …<br>ogni blocco aggiunge almeno 1/2 → diverge',
      say:'Perché diverge? Raggruppo. Un terzo più un quarto è almeno un quarto più un quarto, cioè un mezzo. Da un quinto a un ottavo sono quattro termini, ognuno almeno un ottavo: almeno quattro ottavi, cioè un mezzo. Ogni blocco aggiunge almeno un mezzo, infinite volte: la somma cresce senza fine.' },
    { show:'<h3>Esempio con il rapporto</h3>'+SUM(1)+' '+FR('n','3ⁿ')+' · controllo: n = 10 → 10/59049 ≈ 0,0002 → 0 ✓',
      say:'Ora un esercizio completo: la serie di n diviso tre alla n. Primo controllo: il termine tende a zero? Con n uguale a dieci fa circa due decimillesimi. Tre alla n cresce molto più in fretta di n, quindi sì, tende a zero. Serve un criterio.' },
    { show:'a<sub>n+1</sub> = '+FR('n + 1','3<sup>n+1</sup>')+' → '+FR('a<sub>n+1</sub>','a<sub>n</sub>')+' = '+FR('n + 1','3<sup>n+1</sup>')+' · '+FR('3ⁿ','n'),
      say:'C\'è una potenza, tre alla n, quindi uso il rapporto. Scrivo a con n più uno: n più uno su tre alla n più uno. Il rapporto è n più uno su tre alla n più uno, per tre alla n su n.' },
    { show:'3<sup>n+1</sup> = 3 · 3ⁿ, semplifico 3ⁿ: = '+FR('n + 1','3n')+' = '+FR('1 + 1/n','3'),
      say:'Tre alla n più uno è tre per tre alla n. Semplifico tre alla n. Resta n più uno su tre n. Divido sopra e sotto per n: uno più uno su n, diviso tre.' },
    { show:'L = '+LIM+' '+FR('1 + 1/n','3')+' = '+FR('1 + 0','3')+' = '+FR('1','3')+' &lt; 1 → <b>la serie converge</b>',
      say:'Faccio il limite: uno su n tende a zero, quindi L è uno più zero diviso tre, cioè un terzo. Un terzo è minore di uno, quindi per il criterio del rapporto la serie converge.' },
    { show:'Perché L &lt; 1 → converge: da un certo punto a<sub>n+1</sub> ≤ '+FR('1','2')+' a<sub>n</sub>, quindi la coda ≤ a<sub>N</sub>(1 + 1/2 + 1/4 + …) = 2 a<sub>N</sub>, finita',
      say:'Perché L minore di uno vuol dire che converge? Da un certo punto ogni termine è al massimo la metà del precedente. Allora la coda della serie è al massimo a con N per uno più un mezzo più un quarto e così via, che è una geometrica e fa due. Quindi la somma è finita.' },
    { show:'<h3>Schema</h3>1) '+LIM+' a<sub>n</sub> ≠ 0? → non converge · 2) geometrica o 1/n<sup>p</sup>? · 3) n! o 3ⁿ → rapporto · 4) (…)ⁿ → radice · 5) polinomi → confronto',
      say:'Lo schema per ogni serie. Uno: il termine tende a zero? Se no, non converge. Due: è una geometrica o una uno su n alla p? Uso le formule. Tre: ci sono fattoriali o potenze? Rapporto. Quattro: è tutto elevato alla n? Radice. Cinque: solo polinomi? Confronto.' }
  ]);

  guided('serie', 'lavagna-serie', [
    { h:'Passo 1 · Primo controllo: quanto fa il limite del termine generale?', type:'nums', ans:[0],
      html: LIM+' '+FR('n','3ⁿ')+' = '+inp('limite del termine'),
      ok:'Giusto: 3ⁿ batte n (gerarchia degli infiniti). Coi numeri: n = 5 → 5/243 ≈ 0,02; n = 10 → 10/59049 ≈ 0,0002. Quindi il termine tende a 0. La condizione necessaria è rispettata, ma non basta: serve un criterio.', bad:'Gerarchia: chi cresce più in fretta tra n e 3ⁿ?' },
    { h:'Passo 2 · Quale criterio usi?', type:'choice', ans:1,
      opts:['Confronto con 1/n','Rapporto, perché c\'è 3ⁿ','Radice, perché c\'è la n all\'esponente di tutto'],
      ok:'Esatto: con le potenze tipo 3ⁿ il rapporto si semplifica bene. (Anche la radice funzionerebbe, ma il rapporto è più comodo.)', bad:'Guarda lo schema: c\'è una potenza 3ⁿ ma non è "tutto elevato alla n".' },
    { h:'Passo 3 · Semplifica il rapporto a<sub>n+1</sub> / a<sub>n</sub>', type:'choice', ans:0,
      html: FR('(n+1) / 3<sup>n+1</sup>','n / 3ⁿ')+' = '+FR('n+1','3<sup>n+1</sup>')+' · '+FR('3ⁿ','n'),
      opts:[FR('n+1','3n'), FR('3(n+1)','n'), FR('n+1','n')],
      ok:'Giusto: 3ⁿ / 3<sup>n+1</sup> = 1/3.', bad:'Ricorda 3<sup>n+1</sup> = 3 · 3ⁿ. Cosa resta dopo aver semplificato 3ⁿ?' },
    { h:'Passo 4 · Quanto vale L?', type:'nums', ans:[1/3],
      html: 'L = '+LIM+' '+FR('n+1','3n')+' = '+inp('valore di L'),
      ok:'Sì: divido sopra e sotto per n, '+FR('n+1','3n')+' = '+FR('1 + 1/n','3')+', e 1/n tende a 0, quindi L = '+FR('1 + 0','3')+' = 1/3.', bad:'Divido sopra e sotto per n: (1 + 1/n)/3. Dove va 1/n? Scrivi la frazione, tipo 1/5.' },
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
