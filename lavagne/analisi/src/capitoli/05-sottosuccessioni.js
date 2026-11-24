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
