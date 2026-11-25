  /* ===== capitolo 4: Criterio del rapporto ===== */
  order.push('rapporto'); NAMES['rapporto'] = '4 Criterio del rapporto';
  const RA = (an1, an, step2, simpl) => FR('a<sub>n+1</sub>','a<sub>n</sub>')+' = '+an1+' · '+an+(step2?' = '+step2:'')+' = '+simpl;
  const Q = [
    { r:n=>2/(n+1), L:'0', calc:[
        'a<sub>n</sub> = '+FR('2ⁿ','n!')+', quindi a<sub>n+1</sub> = '+FR('2<sup>n+1</sup>','(n + 1)!'),
        RA(FR('2<sup>n+1</sup>','(n + 1)!'), FR('n!','2ⁿ'), FR('2 · 2ⁿ','(n + 1) · n!')+' · '+FR('n!','2ⁿ'), FR('2','n + 1')),
        'Con i numeri: n = 1 → 2/2 = 1; n = 9 → 2/10 = 0,2; n = 99 → 2/100 = 0,02',
        'L = '+LIM+' '+FR('2','n + 1')+' = 0 (2 diviso un numero che cresce senza fine)',
        'L = 0 &lt; 1, quindi '+LIM+' 2ⁿ/n! = <b>0</b>'] },
    { r:n=>(n+1)/3, L:'+∞', calc:[
        'a<sub>n</sub> = '+FR('n!','3ⁿ')+', quindi a<sub>n+1</sub> = '+FR('(n + 1)!','3<sup>n+1</sup>'),
        RA(FR('(n + 1)!','3<sup>n+1</sup>'), FR('3ⁿ','n!'), FR('(n + 1) · n!','3 · 3ⁿ')+' · '+FR('3ⁿ','n!'), FR('n + 1','3')),
        'Con i numeri: n = 2 → 3/3 = 1; n = 8 → 9/3 = 3; n = 29 → 30/3 = 10',
        'L = '+LIM+' '+FR('n + 1','3')+' = +∞',
        'L = +∞ &gt; 1, quindi '+LIM+' n!/3ⁿ = <b>+∞</b>'] },
    { r:n=>Math.pow((n+1)/n,2)/2, L:'1/2', calc:[
        'a<sub>n</sub> = '+FR('n²','2ⁿ')+', quindi a<sub>n+1</sub> = '+FR('(n + 1)²','2<sup>n+1</sup>'),
        RA(FR('(n + 1)²','2<sup>n+1</sup>'), FR('2ⁿ','n²'), FR('(n + 1)²','2 · 2ⁿ')+' · '+FR('2ⁿ','n²'), FR('1','2')+' · ('+FR('n + 1','n')+')²'),
        FR('n + 1','n')+' = 1 + '+FR('1','n')+', e 1/n tende a 0, quindi ('+FR('n + 1','n')+')² tende a 1² = 1',
        'L = '+FR('1','2')+' · 1 = '+FR('1','2'),
        'L = 1/2 &lt; 1, quindi '+LIM+' n²/2ⁿ = <b>0</b>'] },
    { r:n=>Math.pow(n/(n+1),n), L:'1/e ≈ 0,37', calc:[
        'a<sub>n</sub> = '+FR('n!','nⁿ')+', quindi a<sub>n+1</sub> = '+FR('(n + 1)!','(n + 1)<sup>n+1</sup>'),
        RA(FR('(n + 1)!','(n + 1)<sup>n+1</sup>'), FR('nⁿ','n!'), FR('(n + 1) · n! · nⁿ','(n + 1) · (n + 1)ⁿ · n!'), FR('nⁿ','(n + 1)ⁿ')+' = ('+FR('n','n + 1')+')ⁿ'),
        '('+FR('n','n + 1')+')ⁿ = '+FR('1','(1 + 1/n)ⁿ')+' e (1 + 1/n)ⁿ tende a e (capitolo 3)',
        'L = 1/e ≈ 0,37',
        'L &lt; 1, quindi '+LIM+' n!/nⁿ = <b>0</b> (era l\'errore G5!)'] },
    { r:n=>Math.pow((n+1)/n,2), L:'1', calc:[
        'a<sub>n</sub> = n², quindi a<sub>n+1</sub> = (n + 1)²',
        FR('a<sub>n+1</sub>','a<sub>n</sub>')+' = '+FR('(n + 1)²','n²')+' = ('+FR('n + 1','n')+')² = (1 + '+FR('1','n')+')²',
        '1/n tende a 0, quindi L = (1 + 0)² = 1',
        'L = 1: il criterio <b>non dice niente</b>. Lo sai per altra via: '+LIM+' n² = +∞'] }
  ];
  draws.rapporto = () => {
    const q = Q[+$('qS').value];
    plot($('plotQ'), { N:40, series:[{f:q.r, color:'--thief'}], hlines:[{y:1, color:'--bad', label:'1'}] });
    $('qOut').innerHTML = '<span style="font-size:1rem">'+SV(...q.calc)+'</span>';
  };
  $('qS').addEventListener('change', () => draws.rapporto());
  const drawQM = () => {
    const r = (+$('qM').value)/100, a = n => 100*Math.pow(r, n-1);
    plot($('plotQM'), { N:12, series:[{f:a, color:'--thief', line:true},{f:a, color:'--thief'}], hlines:[{y:100, color:'--muted', label:'partenza 100'}] });
    const fin = r<1 ? 'Moltiplicatore '+it(r,2)+' &lt; 1: si rimpicciolisce, '+LIM+' a<sub>n</sub> = 0.' : r>1 ? 'Moltiplicatore '+it(r,2)+' &gt; 1: si ingrandisce, '+LIM+' a<sub>n</sub> = +∞.' : 'Moltiplicatore 1: resta sempre 100.';
    $('qMOut').innerHTML = 'Termini: '+[1,2,3,4,5,6].map(n=>it(a(n),2)).join(' · ')+' …<br><span style="font-size:1rem">'+fin+'</span>';
    let rows = '<tr><th>n</th><th>a<sub>n</sub> = 5ⁿ/n!</th><th>moltiplicatore 5/(n+1)</th></tr>', v = 5;
    for (let n=1; n<=12; n++){ rows += '<tr><td>'+n+'</td><td>'+it(v,2)+'</td><td>'+it(5/(n+1),2)+(5/(n+1)>1?' (cresce)':5/(n+1)===1?' (resta)':' (cala)')+'</td></tr>'; v = v*5/(n+1); }
    $('qTab').innerHTML = rows;
  };
  const oldR = draws.rapporto; draws.rapporto = () => { oldR(); drawQM(); };
  $('qM').addEventListener('input', drawQM);


  video('rapporto', [/*problema*/
    { show:'<b>Il caso</b><br><span class="lim">lim<span>n→+∞</span></span> <span class="fr"><span>5ⁿ</span><span>n!</span></span> = ?', say:'Ecco un limite che con quello che sai non riesci a risolvere davvero: limite per n che tende a più infinito di cinque alla n diviso n fattoriale.' },
    { show:'<b>Provo con quello che so</b><br>Sopra 5ⁿ → +∞, sotto n! → +∞: forma ∞/∞. Raccolgo la potenza più alta come con i polinomi? Non ci sono potenze di n da raccogliere. Carabinieri? Non c\'è un pezzo limitato che oscilla. E i numeri prima <b>salgono</b>: 5; 12,5; 20,8; 26; 26; poi 21,7…', say:'Sopra e sotto vanno a infinito: infinito su infinito. Raccogliere la potenza più alta non si può, non ci sono potenze di n. I carabinieri non si vedono. E i numeri prima salgono, cinque, dodici e mezzo, venti, ventisei, e poi scendono.' },
    { show:'<b>Perché si inceppa</b><br>La gerarchia dice "n! vince su 5ⁿ", ma è una regola da ricordare, non un calcolo: non dice <b>perché</b>, e non funziona con casi misti come n² · 3ⁿ/n! o nⁿ/n!, dove non sai chi vince.', say:'La gerarchia dice che il fattoriale vince, ma è una regola da ricordare, non un calcolo. Non spiega perché, e con casi misti come n alla n su n fattoriale non sai chi vince.' },
    { show:'<b>Quindi serve</b><br>Guardare <b>di quanto si moltiplica</b> un termine per passare al successivo: a<sub>n+1</sub>/a<sub>n</sub>. Con fattoriali e potenze questo rapporto si semplifica tantissimo. È il criterio del rapporto.', say:'Serve guardare di quanto si moltiplica un termine per passare al successivo: a con n più uno diviso a con n. Con fattoriali e potenze questo rapporto si semplifica tantissimo. È il criterio del rapporto.' },
    { show:'<b>Lo userai per</b><br>Tutti i limiti con n!, aⁿ, nⁿ insieme: nⁿ/n!, n!/nⁿ, n² · 3ⁿ/n!, 2ⁿ/n⁵. E nel capitolo 6 per le serie.', say:'Lo userai per tutti i limiti dove compaiono insieme fattoriali e potenze, e poi per le serie.' },
    { show:'<h3>Il criterio del rapporto</h3>Serve per i limiti con fattoriali e potenze: n!, 5ⁿ, nⁿ.',
      say:'Il criterio del rapporto serve per calcolare i limiti di successioni con fattoriali e potenze, per esempio n fattoriale, cinque alla n, n alla n.' },
    { show:'Esempio: a<sub>n</sub> = '+FR('5ⁿ','n!'),
      say:'Prendiamo un esempio: a con n uguale a cinque alla n, diviso n fattoriale.' },
    { show:'a₁ = 5/1 = 5 · a₂ = 25/2 = 12,5 · a₃ = 125/6 ≈ 20,8 · a₄ = 625/24 ≈ 26 · a₅ = 3125/120 ≈ 26 · a₆ = 15625/720 ≈ 21,7',
      say:'Prima guardiamo i numeri. a uno vale cinque. a due vale venticinque mezzi, cioè dodici e mezzo. a tre circa venti virgola otto. a quattro e a cinque circa ventisei. a sei circa ventuno virgola sette. Prima cresce, poi comincia a calare.' },
    { show:'Domanda: per quanto moltiplico un termine per avere il successivo?<br>'+FR('a₂','a₁')+' = '+FR('12,5','5')+' = 2,5 · '+FR('a₆','a₅')+' ≈ '+FR('21,7','26')+' ≈ 0,83',
      say:'La domanda del criterio è: per quanto devo moltiplicare un termine per ottenere il successivo? Da a uno ad a due moltiplico per due virgola cinque. Da a cinque ad a sei moltiplico per circa zero virgola ottantatré, cioè meno di uno: per questo cala.' },
    { show:'Lo calcolo per un n qualsiasi. Scrivo a<sub>n+1</sub>: al posto di n metto n + 1<br>a<sub>n+1</sub> = '+FR('5<sup>n+1</sup>','(n + 1)!'),
      say:'Adesso lo calcolo per un n qualsiasi. Scrivo a con n più uno: dappertutto al posto di n metto n più uno. Viene cinque alla n più uno, diviso n più uno fattoriale.' },
    { show:FR('a<sub>n+1</sub>','a<sub>n</sub>')+' = '+FR('5<sup>n+1</sup>','(n + 1)!')+' · '+FR('n!','5ⁿ'),
      say:'Faccio il rapporto. Dividere per una frazione vuol dire moltiplicare per la frazione capovolta: quindi cinque alla n più uno su n più uno fattoriale, per n fattoriale su cinque alla n.' },
    { show:'Spezzo: 5<sup>n+1</sup> = 5 · 5ⁿ e (n + 1)! = (n + 1) · n!<br>= '+FR('5 · 5ⁿ','(n + 1) · n!')+' · '+FR('n!','5ⁿ'),
      say:'Spezzo le potenze e i fattoriali. Cinque alla n più uno è cinque per cinque alla n. n più uno fattoriale è n più uno per n fattoriale.' },
    { show:'Semplifico 5ⁿ con 5ⁿ e n! con n!:<br>'+FR('a<sub>n+1</sub>','a<sub>n</sub>')+' = '+FR('5','n + 1'),
      say:'Ora semplifico: cinque alla n sopra con cinque alla n sotto, n fattoriale sotto con n fattoriale sopra. Resta cinque diviso n più uno.' },
    { show:'Controllo con i numeri: n = 1 → 5/2 = 2,5 ✓ · n = 5 → 5/6 ≈ 0,83 ✓',
      say:'Controllo che sia giusto con i numeri di prima. Con n uguale a uno, cinque mezzi fa due virgola cinque: torna. Con n uguale a cinque, cinque sesti fa circa zero virgola ottantatré: torna.' },
    { show:'L = '+LIM+' '+FR('5','n + 1')+' = 0<br><span style="font-size:.95rem">5 diviso un numero che cresce senza fine: n = 99 → 0,05; n = 999 → 0,005</span>',
      say:'Ora faccio il limite per n che tende a più infinito di cinque diviso n più uno. Sopra c\'è cinque fisso, sotto un numero che cresce senza fine: con n uguale a novantanove fa zero virgola zero cinque, con novecentonovantanove fa zero virgola zero zero cinque. Quindi L è uguale a zero.' },
    { show:'<h3>Perché L &lt; 1 vuol dire che va a 0</h3>Da n = 9 in poi il moltiplicatore 5/(n + 1) è al massimo 5/10 = 0,5:<br>a<sub>n+1</sub> ≤ 0,5 · a<sub>n</sub>',
      say:'Perché L minore di uno vuol dire che la successione va a zero? Guardiamo il calcolo. Da n uguale a nove in poi, il moltiplicatore cinque su n più uno è al massimo cinque decimi, cioè zero virgola cinque. Quindi ogni termine è al massimo la metà del precedente.' },
    { show:'a₉ ≈ 5,38 → a₁₀ ≤ 0,5 · 5,38 ≈ 2,69 → a₁₁ ≤ 0,5 · 2,69 ≈ 1,35 → a₁₂ ≤ 0,67 …<br>Dopo k passi: a<sub>9+k</sub> ≤ 0,5<sup>k</sup> · 5,38',
      say:'Partiamo da a nove, che vale circa cinque virgola trentotto. a dieci è al massimo la metà, circa due virgola sessantanove. a undici al massimo la metà di questo, circa uno virgola trentacinque. Dopo k passi ho moltiplicato k volte per zero virgola cinque: a con nove più k è al massimo zero virgola cinque alla k, per cinque virgola trentotto.' },
    { show:'0,5<sup>10</sup> ≈ 0,001 · 0,5<sup>20</sup> ≈ 0,000001 → <span class="lim">lim<span>k→+∞</span></span> 0,5<sup>k</sup> = 0',
      say:'Quanto fa zero virgola cinque alla k quando k cresce? Alla dieci fa circa un millesimo, alla venti circa un milionesimo. Un numero tra zero e uno moltiplicato per sé stesso diventa sempre più piccolo: il limite è zero.' },
    { show:'Carabinieri: 0 &lt; a<sub>9+k</sub> ≤ 0,5<sup>k</sup> · 5,38 → 0<br>Quindi '+LIM+' '+FR('5ⁿ','n!')+' = <b>0</b>',
      say:'Ora uso i carabinieri. a con nove più k è positivo, quindi sta sopra zero, e sta sotto zero virgola cinque alla k per cinque virgola trentotto, che tende a zero. Tutti e due i carabinieri tendono a zero, quindi il limite per n che tende a più infinito di cinque alla n su n fattoriale è zero.' },
    { show:'<h3>La regola</h3>L &lt; 1 (anche L = 0) → '+LIM+' a<sub>n</sub> = 0<br>L &gt; 1 (anche L = +∞) → '+LIM+' a<sub>n</sub> = +∞<br>L = 1 → il criterio non dice niente',
      say:'Ecco la regola. Se L è minore di uno, anche zero, il limite di a con n è zero. Se L è maggiore di uno, anche più infinito, il limite è più infinito: è lo stesso calcolo al contrario, ogni termine è più grande del precedente. Se L è uguale a uno, il criterio non dice niente.' },
    { show:'Perché L = 1 non decide:<br>a<sub>n</sub> = 1/n: '+FR('a<sub>n+1</sub>','a<sub>n</sub>')+' = '+FR('n','n + 1')+' → 1, ma '+LIM+' 1/n = 0<br>a<sub>n</sub> = n: '+FR('a<sub>n+1</sub>','a<sub>n</sub>')+' = '+FR('n + 1','n')+' → 1, ma '+LIM+' n = +∞',
      say:'Perché con L uguale a uno non si decide? Due esempi. Con a n uguale a uno su n, il rapporto è n su n più uno, che tende a uno, ma la successione tende a zero. Con a n uguale a n, il rapporto è n più uno su n, che tende a uno, ma la successione tende a più infinito. Stesso L, finali opposti.' },
    { show:'<h3>Ricetta</h3>1) scrivo a<sub>n+1</sub> · 2) faccio a<sub>n+1</sub>/a<sub>n</sub> e capovolgo · 3) spezzo (n + 1)! e potenze · 4) semplifico · 5) limite = L · 6) confronto L con 1',
      say:'Riassunto della ricetta. Uno: scrivo a con n più uno. Due: faccio il rapporto e capovolgo la seconda frazione. Tre: spezzo i fattoriali e le potenze. Quattro: semplifico. Cinque: faccio il limite e trovo L. Sei: confronto L con uno. Adesso prova tu con l\'esercizio guidato.' }
  ]);

  guided('rapporto', 'lavagna-rapporto', [
    { h:'Passo 1 · Scrivi a<sub>n+1</sub>: al posto di n metti n+1', type:'choice', ans:2,
      html:'a<sub>n</sub> = 5ⁿ / n!',
      opts:['5ⁿ / (n! + 1)','5<sup>n+1</sup> / n!','5<sup>n+1</sup> / (n+1)!'],
      ok:'Esatto: n diventa n+1 dappertutto.', bad:'Devi sostituire n+1 sia nell\'esponente sia nel fattoriale.' },
    { h:'Passo 2 · Semplifica il rapporto a<sub>n+1</sub> / a<sub>n</sub>', type:'choice', ans:1,
      html:'<span class="fr"><span>5<sup>n+1</sup> / (n+1)!</span><span>5ⁿ / n!</span></span> = <span class="fr"><span>5 · 5ⁿ</span><span>(n+1) · n!</span></span> · <span class="fr"><span>n!</span><span>5ⁿ</span></span>',
      opts:['(n+1) / 5','5 / (n+1)','5n'],
      ok:'Giusto: 5ⁿ e n! si semplificano, resta 5/(n+1).', bad:'Cancella 5ⁿ con 5ⁿ e n! con n!. Cosa resta sopra e sotto?' },
    { h:'Passo 3 · Quanto fa il limite di 5/(n+1)? Questo è L', type:'nums', ans:[0],
      html:'L = '+LIM+' 5/(n+1) = '+inp('valore di L'), ok:'Sì, L = 0.', bad:'5 diviso un numero enorme…' },
    { h:'Passo 4 · L = 0 è minore di 1. Quindi '+LIM+' 5ⁿ/n! fa…', type:'choice', ans:0,
      opts:['0','+∞','non si può dire'],
      ok:'Perfetto! L &lt; 1 vuol dire che si rimpicciolisce sempre: il limite è 0.', bad:'Ricontrolla la regola: se L &lt; 1 il limite di a<sub>n</sub> è…?' }
  ], '<b>Fatto!</b> '+LIM+' 5ⁿ/n! = 0, adesso dimostrato: '+LIM+' 5/(n+1) = 0 &lt; 1.');

  const A1 = 'a<sub>n+1</sub>', A0 = 'a<sub>n</sub>';
  EX['rapporto'] = [
      { id:'e1', type:'num', q:LIM+' n! / 4ⁿ', a:Infinity, hint:'Rapporto: (n+1)!/n! = n+1 e 4ⁿ/4<sup>n+1</sup> = 1/4.', sol:SV(
        '<i>Scrivo '+A1+' (al posto di n metto n + 1):</i> '+A1+' = '+FR('(n + 1)!','4<sup>n+1</sup>'),
        '<i>Scrivo il rapporto (dividere per una frazione = moltiplicare per la sua capovolta):</i> '+FR(A1,A0)+' = '+FR('(n + 1)!','4<sup>n+1</sup>')+' · '+FR('4ⁿ','n!'),
        '<i>Spezzo (n + 1)! = (n + 1) · n! e 4<sup>n+1</sup> = 4 · 4ⁿ:</i> = '+FR('(n + 1) · n!','4 · 4ⁿ')+' · '+FR('4ⁿ','n!'),
        '<i>Semplifico n! con n! e 4ⁿ con 4ⁿ:</i> = '+FR('n + 1','4'),
        '<i>Faccio il limite:</i> L = '+LIM+' '+FR('n + 1','4')+' = +∞ (sopra cresce senza fine, sotto resta 4)',
        '<i>Applico il criterio:</i> L = +∞ &gt; 1, quindi '+LIM+' n!/4ⁿ = <b>+∞</b>') },
      { id:'e2', type:'num', q:LIM+' n³ / 2ⁿ', a:0, hint:'Rapporto = ((n+1)/n)³ · 1/2. Per n → +∞ dove va (n+1)/n?', sol:SV(
        '<i>Scrivo '+A1+':</i> '+A1+' = '+FR('(n + 1)³','2<sup>n+1</sup>'),
        '<i>Scrivo il rapporto:</i> '+FR(A1,A0)+' = '+FR('(n + 1)³','2<sup>n+1</sup>')+' · '+FR('2ⁿ','n³'),
        '<i>Spezzo 2<sup>n+1</sup> = 2 · 2ⁿ e semplifico 2ⁿ:</i> = '+FR('(n + 1)³','2 · n³'),
        '<i>Metto insieme le potenze con lo stesso esponente:</i> = '+FR('1','2')+' · ('+FR('n + 1','n')+')³ = '+FR('1','2')+' · (1 + '+FR('1','n')+')³',
        '<i>Faccio il limite per n → +∞:</i> 1/n tende a 0, quindi (1 + 1/n)³ tende a 1³ = 1',
        '<i>Quindi:</i> L = '+FR('1','2')+' · 1 = '+FR('1','2'),
        '<i>Applico il criterio:</i> L = 1/2 &lt; 1, quindi '+LIM+' n³/2ⁿ = <b>0</b>') },
      { id:'e3', type:'num', q:LIM+' n! / nⁿ <span style="font-size:1rem">(era un tuo errore)</span>', a:0, hint:'Rapporto = (n+1)! / (n+1)<sup>n+1</sup> · nⁿ / n! = nⁿ/(n+1)ⁿ = (n/(n+1))ⁿ. Ricorda il capitolo 3.', sol:SV(
        '<i>Scrivo '+A1+' (n + 1 va nel fattoriale, nella base e nell\'esponente):</i> '+A1+' = '+FR('(n + 1)!','(n + 1)<sup>n+1</sup>'),
        '<i>Scrivo il rapporto:</i> '+FR(A1,A0)+' = '+FR('(n + 1)!','(n + 1)<sup>n+1</sup>')+' · '+FR('nⁿ','n!'),
        '<i>Spezzo (n + 1)! = (n + 1) · n! e semplifico n!:</i> = '+FR('(n + 1) · nⁿ','(n + 1)<sup>n+1</sup>'),
        '<i>Spezzo (n + 1)<sup>n+1</sup> = (n + 1) · (n + 1)ⁿ e semplifico (n + 1):</i> = '+FR('nⁿ','(n + 1)ⁿ'),
        '<i>Stesso esponente sopra e sotto, lo metto fuori:</i> = ('+FR('n','n + 1')+')ⁿ',
        '<i>Capovolgo la frazione dentro (così compare il numero e):</i> ('+FR('n','n + 1')+')ⁿ = '+FR('1','((n + 1)/n)ⁿ')+' = '+FR('1','(1 + 1/n)ⁿ'),
        '<i>Faccio il limite (capitolo 3):</i> '+LIM+' (1 + 1/n)ⁿ = e, quindi L = '+FR('1','e')+' ≈ 0,37',
        '<i>Applico il criterio:</i> L = 1/e &lt; 1, quindi '+LIM+' n!/nⁿ = <b>0</b>: nⁿ batte n!') },
      { id:'e4', type:'num', q:'Per a<sub>n</sub> = 1/n, quanto vale L, il limite del rapporto?', a:1, hint:'(1/(n+1)) / (1/n) = n/(n+1).', sol:SV(
        '<i>Scrivo '+A1+':</i> '+A1+' = '+FR('1','n + 1'),
        '<i>Scrivo il rapporto:</i> '+FR(A1,A0)+' = '+FR('1','n + 1')+' · '+FR('n','1')+' = '+FR('n','n + 1'),
        '<i>Divido sopra e sotto per n:</i> = '+FR('1','1 + 1/n'),
        '<i>Faccio il limite:</i> 1/n tende a 0, quindi L = '+FR('1','1 + 0')+' = <b>1</b>',
        '<i>Conclusione:</i> con L = 1 il criterio non dice niente. Che '+LIM+' 1/n = 0 lo sai per un\'altra strada.') }
    ];
