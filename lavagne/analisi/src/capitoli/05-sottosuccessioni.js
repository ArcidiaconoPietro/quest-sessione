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

  guided('sottosuccessioni', 'lavagna-sottosuccessioni', [
    { h:'Passo 1 · Prendi solo gli n pari: (−1)ⁿ = 1. Quanto fa il limite di 2 + 1/n?', type:'nums', ans:[2],
      html:'n pari: '+LIM+' (2 + 1/n) = '+inp('limite dei pari'), ok:'Sì, i pari hanno limite 2.', bad:'Per n → +∞, 1/n tende a 0, quindi 2 + quasi 0…' },
    { h:'Passo 2 · Ora solo gli n dispari: (−1)ⁿ = −1. Quanto fa il limite di −(2 + 1/n)?', type:'nums', ans:[-2],
      html:'n dispari: '+LIM+' −(2 + 1/n) = '+inp('limite dei dispari'), ok:'Sì, i dispari hanno limite −2.', bad:'È come prima ma con il segno meno davanti.' },
    { h:'Passo 3 · Cosa concludi?', type:'choice', ans:2,
      opts:['Il limite è 0, la media tra 2 e −2','Il limite è 2','Il limite non esiste: due sottosuccessioni con limiti diversi'],
      ok:'Perfetto! Pari: limite 2. Dispari: limite −2. Il limite non esiste.', bad:'Non si fa la media. Rileggi la contronominale.' }
  ], '<b>Fatto!</b> Questa è esattamente la frase da scrivere all\'esame: "la sottosuccessione dei pari tende a 2, quella dei dispari a −2, quindi il limite non esiste".');

  EX['sottosuccessioni'] = [
      { id:'e1', type:'choice', q:LIM+' cos(nπ)', a:2, opts:['1','0','non esiste'], hint:'cos(nπ) per n pari vale 1, per n dispari vale −1.', sol:'Pari: limite 1. Dispari: limite −1. Limiti diversi, quindi il limite non esiste.' },
      { id:'e2', type:'choice', q:LIM+' (−1)ⁿ / n', a:0, opts:['0','non esiste','1'], hint:'Pari: 1/n. Dispari: −1/n. Per n → +∞ dove vanno?', sol:'Per n → +∞ tutte e due tendono a 0: il limite è 0 (l\'hai fatto anche coi carabinieri).' },
      { id:'e3', type:'choice', q:LIM+' (−1)ⁿ + 1/n', a:1, opts:['0','non esiste','1'], hint:'Pari: 1 + 1/n. Dispari: −1 + 1/n.', sol:'Pari: limite 1. Dispari: limite −1. Il limite non esiste.' },
      { id:'e4', type:'choice', q:'a<sub>n</sub> = sin n sta sempre tra −1 e 1. Cosa garantisce Bolzano-Weierstrass?', a:1,
        opts:['Che sin n converge','Che esiste almeno una sottosuccessione di sin n che converge','Niente, perché sin n oscilla'], hint:'BW parla solo di una parte della successione.', sol:'sin n è limitata, quindi ha almeno una sottosuccessione convergente. Tutta la successione invece non converge.' }
    ];
