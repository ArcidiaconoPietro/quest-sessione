  /* ===== capitolo 5: Sottosuccessioni ===== */
  order.push('sottosuccessioni'); NAMES['sottosuccessioni'] = '5 Sottosuccessioni';
  draws.sottosuccessioni = () => {
    const P = $('sP').checked, D = $('sD').checked;
    const s = [];
    if (P) s.push({f:n=> n%2===0 ? n/(n+1) : NaN, color:'--cop'});
    if (D) s.push({f:n=> n%2===1 ? -n/(n+1) : NaN, color:'--thief'});
    if (!s.length) s.push({f:()=>NaN, color:'--ink'});
    plot($('plotS'), { N:40, series:s, hlines:[{y:1, color:'--cop', label:'1'},{y:-1, color:'--thief', label:'−1'}] });
  };
  $('sP').addEventListener('change', () => draws.sottosuccessioni());
  $('sD').addEventListener('change', () => draws.sottosuccessioni());

  video('sottosuccessioni', [
    { show:'<h3>Sottosuccessioni: a cosa servono</h3>Servono a dimostrare che un limite NON esiste.',
      say:'Le sottosuccessioni servono soprattutto a dimostrare che un limite non esiste. All\'esame la domanda tipica è: il limite esiste? E la risposta è no.' },
    { show:'Esempio: a<sub>n</sub> = (−1)ⁿ · '+FR('n','n + 1'),
      say:'Prendiamo questo esempio: a con n uguale a meno uno alla n, per n diviso n più uno.' },
    { show:'(−1)¹ = −1 · (−1)² = (−1)·(−1) = 1 · (−1)³ = −1 · (−1)⁴ = 1',
      say:'Prima capisco cosa fa meno uno alla n. Meno uno alla prima è meno uno. Alla seconda è meno uno per meno uno, cioè più uno. Alla terza torna meno uno, alla quarta più uno. Con n pari vale uno, con n dispari vale meno uno.' },
    { show:'a₁ = −1/2 = −0,5 · a₂ = 2/3 ≈ 0,67 · a₃ = −3/4 = −0,75 · a₄ = 4/5 = 0,8 · a₉ = −0,9 · a₁₀ ≈ 0,91',
      say:'Ora i numeri. a uno vale meno un mezzo. a due vale due terzi, circa zero virgola sessantasette. a tre meno tre quarti. a quattro quattro quinti, zero virgola otto. a nove meno zero virgola nove, a dieci circa zero virgola novantuno. Saltano da una parte all\'altra.' },
    { show:'Idea: divido la fila in due. <b>Pari</b>: n = 2, 4, 6, … · <b>Dispari</b>: n = 1, 3, 5, …',
      say:'L\'idea è dividere la successione in due file: quella dei termini con n pari e quella dei termini con n dispari. Ognuna è una sottosuccessione.' },
    { show:'n pari: a<sub>n</sub> = 1 · '+FR('n','n + 1')+' = '+FR('n','n + 1'),
      say:'Con n pari, meno uno alla n vale uno, quindi a con n è semplicemente n diviso n più uno.' },
    { show:'Divido sopra e sotto per n: '+FR('n','n + 1')+' = '+FR('1','1 + 1/n'),
      say:'Per fare il limite divido sopra e sotto per n. Sopra n diviso n fa uno. Sotto n più uno diviso n fa uno più uno su n.' },
    { show:'1/n → 0, quindi '+FR('1','1 + 1/n')+' → '+FR('1','1 + 0')+' = 1. <b>I pari tendono a 1</b>',
      say:'Quando n tende a più infinito, uno su n tende a zero. Quindi uno su uno più uno su n tende a uno su uno più zero, cioè uno. La sottosuccessione dei pari tende a uno.' },
    { show:'n dispari: a<sub>n</sub> = −1 · '+FR('n','n + 1')+' = −'+FR('n','n + 1')+' → −1. <b>I dispari tendono a −1</b>',
      say:'Con n dispari, meno uno alla n vale meno uno, quindi a con n è meno n su n più uno. È lo stesso conto di prima con il meno davanti: tende a meno uno.' },
    { show:'Regola: se '+LIM+' a<sub>n</sub> = L, ogni sottosuccessione tende a L.<br>Qui: pari → 1, dispari → −1, e 1 ≠ −1',
      say:'La regola dice: se la successione avesse un limite L, ogni sua sottosuccessione dovrebbe tendere allo stesso L. Ma qui i pari tendono a uno e i dispari a meno uno, che sono diversi.' },
    { show:'Conclusione: '+LIM+' (−1)ⁿ · '+FR('n','n + 1')+' <b>non esiste</b>',
      say:'Conclusione: il limite per n che tende a più infinito di meno uno alla n per n su n più uno non esiste. All\'esame scrivi proprio così: la sottosuccessione dei pari tende a uno, quella dei dispari a meno uno, quindi il limite non esiste.' },
    { show:'<h3>Bolzano-Weierstrass</h3>Ogni successione <b>limitata</b> ha almeno una sottosuccessione che converge.<br>Esempio: (−1)ⁿ sta tra −1 e 1 → i pari 1, 1, 1, … convergono a 1',
      say:'Ultima cosa, il teorema di Bolzano Weierstrass: ogni successione limitata ha almeno una sottosuccessione che converge. Per esempio meno uno alla n sta sempre tra meno uno e uno, quindi è limitata. Non converge, ma la sottosuccessione dei pari, uno, uno, uno, converge a uno. Attenzione: il teorema non dice che tutta la successione converge.' }
  ]);

  guided('sottosuccessioni', 'lavagna-sottosuccessioni', [
    { h:'Passo 1 · Prendi solo gli n pari: (−1)ⁿ = 1. Quanto fa il limite di 2 + 1/n?', type:'nums', ans:[2],
      html:'n pari: '+LIM+' (2 + 1/n) = '+inp('limite dei pari'), ok:'Sì, i pari hanno limite 2.', bad:'Per n → +∞, 1/n tende a 0, quindi 2 + quasi 0…' },
    { h:'Passo 2 · Ora solo gli n dispari: (−1)ⁿ = −1. Quanto fa il limite di −(2 + 1/n)?', type:'nums', ans:[-2],
      html:'n dispari: '+LIM+' −(2 + 1/n) = '+inp('limite dei dispari'), ok:'Sì, i dispari hanno limite −2.', bad:'È come prima ma con il segno meno davanti.' },
    { h:'Passo 3 · Cosa concludi?', type:'choice', ans:2,
      opts:['Il limite è 0, la media tra 2 e −2','Il limite è 2','Il limite non esiste: due sottosuccessioni con limiti diversi'],
      ok:'Perfetto! Pari: limite 2. Dispari: limite −2. Il limite non esiste.', bad:'Non si fa la media. Rileggi la contronominale.' }
  ], '<b>Fatto!</b> Questa è esattamente la frase da scrivere all\'esame: "la sottosuccessione dei pari tende a 2, quella dei dispari a −2, quindi il limite non esiste".');

  const LIMK = '<span class="lim">lim<span>k→+∞</span></span>';
  EX['sottosuccessioni'] = [
      { id:'e1', type:'choice', q:LIM+' cos(nπ)', a:2, opts:['1','0','non esiste'], hint:'cos(nπ) per n pari vale 1, per n dispari vale −1.', sol:SV(
        '<i>Calcolo i primi termini:</i> n = 1: cos π = −1; n = 2: cos 2π = 1; n = 3: cos 3π = −1; n = 4: cos 4π = 1',
        '<i>Divido in due sottosuccessioni:</i> n pari (n = 2k) e n dispari (n = 2k + 1)',
        '<i>Pari:</i> cos(2kπ) = 1 sempre, quindi '+LIMK+' cos(2kπ) = 1',
        '<i>Dispari:</i> cos((2k + 1)π) = −1 sempre, quindi '+LIMK+' cos((2k + 1)π) = −1',
        '<i>Confronto:</i> due sottosuccessioni con limiti diversi (1 ≠ −1)',
        '<i>Conclusione:</i> '+LIM+' cos(nπ) <b>non esiste</b>') },
      { id:'e2', type:'choice', q:LIM+' (−1)ⁿ / n', a:0, opts:['0','non esiste','1'], hint:'Pari: 1/n. Dispari: −1/n. Per n → +∞ dove vanno?', sol:SV(
        '<i>n pari:</i> (−1)ⁿ = 1, quindi il termine è 1/n',
        '<i>Limite dei pari:</i> 1/n tende a 0 per n → +∞',
        '<i>n dispari:</i> (−1)ⁿ = −1, quindi il termine è −1/n',
        '<i>Limite dei dispari:</i> −1/n tende a 0 per n → +∞',
        '<i>Confronto:</i> tutte e due tendono a 0, lo stesso numero',
        '<i>Conclusione:</i> '+LIM+' (−1)ⁿ/n = <b>0</b> (come coi carabinieri: −1/n ≤ (−1)ⁿ/n ≤ 1/n)') },
      { id:'e3', type:'choice', q:LIM+' (−1)ⁿ + 1/n', a:1, opts:['0','non esiste','1'], hint:'Pari: 1 + 1/n. Dispari: −1 + 1/n.', sol:SV(
        '<i>n pari:</i> (−1)ⁿ = 1, il termine è 1 + 1/n',
        '<i>Limite dei pari:</i> 1/n tende a 0, quindi 1 + 1/n tende a 1 + 0 = 1',
        '<i>n dispari:</i> (−1)ⁿ = −1, il termine è −1 + 1/n',
        '<i>Limite dei dispari:</i> −1 + 1/n tende a −1 + 0 = −1',
        '<i>Confronto:</i> 1 ≠ −1',
        '<i>Conclusione:</i> il limite per n → +∞ <b>non esiste</b>') },
      { id:'e4', type:'choice', q:'a<sub>n</sub> = sin n sta sempre tra −1 e 1. Cosa garantisce Bolzano-Weierstrass?', a:1,
        opts:['Che sin n converge','Che esiste almeno una sottosuccessione di sin n che converge','Niente, perché sin n oscilla'], hint:'BW parla solo di una parte della successione.', sol:SV(
        '<i>Ricordo l\'enunciato:</i> ogni successione limitata ha almeno una sottosuccessione convergente',
        '<i>Controllo l\'ipotesi:</i> −1 ≤ sin n ≤ 1 per ogni n, quindi sin n è limitata ✓',
        '<i>Applico il teorema:</i> esiste una sottosuccessione di sin n che converge',
        '<i>Attenzione a cosa NON dice:</i> non dice che tutta sin n converge (infatti non converge), né quale sia la sottosuccessione') }
    ];
