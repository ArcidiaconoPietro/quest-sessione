  /* ===== capitolo 14: Integrali definiti ===== */
  order.push('integrali-definiti'); NAMES['integrali-definiti'] = '14 Integrali definiti';
  const ID = [
    { f:x=>x*x, a:0, b:2, ex:8/3, exs:'8/3 ≈ 2,6667', xr:[-0.3,2.3], yr:[-0.5,4.5] },
    { f:Math.sin, a:0, b:Math.PI, ex:2, exs:'2', xr:[-0.3,3.5], yr:[-0.3,1.3] },
    { f:Math.exp, a:0, b:1, ex:Math.E-1, exs:'e − 1 ≈ 1,7183', xr:[-0.2,1.2], yr:[-0.3,3] }
  ];
  draws['integrali-definiti'] = () => {
    const c = ID[+$('idS').value], n = +$('idN').value, w = (c.b-c.a)/n;
    const step = x => { if (x < c.a || x > c.b) return 0; const k = Math.min(n-1, Math.floor((x-c.a)/w)); return c.f(c.a + (k+0.5)*w); };
    let S = 0; for (let k=0;k<n;k++) S += c.f(c.a+(k+0.5)*w)*w;
    plotF($('plotID'), { xmin:c.xr[0], xmax:c.xr[1], ymin:c.yr[0], ymax:c.yr[1], area:{f:step, a:c.a, b:c.b, color:'--thief'},
      fns:[{f:step, color:'--thief', width:1}, {f:c.f, color:'--ink', width:2.5}] });
    $('idOut').innerHTML = 'Somma di '+n+' rettangoli = <b class="thief">'+it(S,4)+'</b> · area vera = <b class="cop">'+c.exs+'</b><br><span style="font-size:1rem">Differenza: '+it(Math.abs(S-c.ex),4)+'. Più rettangoli, più si avvicina.</span>';
  };
  $('idS').addEventListener('change', () => draws['integrali-definiti']());
  $('idN').addEventListener('input', () => draws['integrali-definiti']());

  const INT = (a,b) => '<span class="sig"><span>'+b+'</span><b>∫</b><span>'+a+'</span></span>';
  guided('integrali-definiti', 'lavagna-integrali-definiti', [
    { h:'Passo 1 · Primitiva di x² + 1:', type:'choice', ans:1,
      opts:['2x + C','x³/3 + x','x³ + x'],
      ok:'Giusto. Per l\'integrale definito la C non serve: si cancella in F(b) − F(a).', bad:'xᵃ → x<sup>a+1</sup>/(a + 1). E 1 → x.' },
    { h:'Passo 2 · F(2) = 2³/3 + 2 = ?', type:'nums', ans:[14/3],
      html:'F(2) = '+inp('F(2)'),
      ok:'Sì: 8/3 + 6/3 = 14/3.', bad:'8/3 + 2 = 8/3 + 6/3.' },
    { h:'Passo 3 · F(0) = 0³/3 + 0 = ?', type:'nums', ans:[0],
      html:'F(0) = '+inp('F(0)'),
      ok:'Esatto.', bad:'Metti 0 al posto di x.' },
    { h:'Passo 4 · Risultato: F(2) − F(0).', type:'nums', ans:[14/3],
      html:INT(0,2)+' (x² + 1) dx = '+inp('risultato'),
      ok:'Perfetto: 14/3 ≈ 4,67.', bad:'14/3 − 0.' }
  ], '<b>Fatto!</b> '+INT(0,2)+' (x² + 1) dx = [x³/3 + x]<sub>0</sub><sup>2</sup> = 14/3 − 0 = 14/3. Schema: primitiva → F(b) → F(a) → sottrai.');

  EX['integrali-definiti'] = [
    { id:'e1', type:'num', lbl:'integrale', q:INT(0,1)+' x² dx', a:1/3, hint:'Primitiva x³/3.', sol:'1/3 − 0 = 1/3.' },
    { id:'e2', type:'num', lbl:'integrale', q:INT(0,'π')+' sin x dx', a:2, hint:'Primitiva −cos x. cos π = −1.', sol:'[−cos x] da 0 a π = −(−1) − (−1) = 2.' },
    { id:'e3', type:'num', lbl:'integrale', q:INT(1,'e')+' '+FR('1','x')+' dx', a:1, hint:'Primitiva ln x.', sol:'ln e − ln 1 = 1 − 0 = 1.' },
    { id:'e4', type:'num', lbl:'integrale', q:INT('−1',1)+' x³ dx', a:0, hint:'x³ è dispari.', sol:'Dispari su [−1, 1]: 0. Anche col conto: 1/4 − 1/4 = 0.' },
    { id:'e5', type:'num', lbl:'integrale', q:INT(0,'ln 2')+' eˣ dx', a:1, hint:'Primitiva eˣ. e<sup>ln 2</sup> = 2.', sol:'2 − 1 = 1.' },
    { id:'e6', type:'num', lbl:'area', q:'Area tra y = x e y = x² per x tra 0 e 1', a:1/6, hint:'Tra 0 e 1, x sta sopra x². Area = '+INT(0,1)+' (x − x²) dx.', sol:'1/2 − 1/3 = 1/6.' },
    { id:'e7', type:'num', lbl:'F′(2)', q:'F(x) = '+INT(0,'x')+' t² dt. Quanto vale F′(2)?', a:4, hint:'Teorema fondamentale: F′(x) = f(x).', sol:'F′(x) = x², F′(2) = 4. Non serve calcolare l\'integrale.' },
    { id:'e8', type:'num', lbl:'integrale', q:INT(0,1)+' 2x (x² + 1)³ dx', a:15/4, hint:'Sostituzione t = x² + 1, dt = 2x dx. Estremi: t da 1 a 2.', sol:INT(1,2)+' t³ dt = [t⁴/4] da 1 a 2 = 4 − 1/4 = 15/4.' },
    { id:'e9', type:'num', lbl:'integrale', q:INT(1,'+∞')+' '+FR('1','x²')+' dx', a:1, hint:'Integra da 1 a M, poi fai il limite per M → +∞.', sol:'[−1/x] da 1 a M = 1 − 1/M → 1 per M → +∞.' }
  ];
