  /* ===== capitolo 12: Studio di funzione ===== */
  order.push('studio-funzione'); NAMES['studio-funzione'] = '12 Studio di funzione';
  const SF = [
    { f:x=>x*x*x-3*x, xr:[-3,3], yr:[-5,5], excl:[], asy:[], ext:[{x:-1,y:2,label:'max'},{x:1,y:-2,label:'min'}], fl:[{x:0,y:0,label:'flesso'}],
      sign:x=>x*x*x-3*x, zeros:[-Math.sqrt(3),0,Math.sqrt(3)],
      t:['<b>Dominio</b>'+SV(
           '<i>Cosa può dare problemi:</i> denominatori, logaritmi, radici pari. Qui x³ − 3x è un polinomio, non c\'è niente di questo',
           '<i>Quindi:</i> dominio = tutto ℝ',
           '<i>Simmetria, calcolo f(−x):</i> (−x)³ − 3(−x) = −x³ + 3x = −(x³ − 3x) = −f(x): è <b>dispari</b>, simmetrica rispetto all\'origine',
           '<i>Controllo con i numeri:</i> f(2) = 8 − 6 = 2 e f(−2) = −8 + 6 = −2 ✓'),
         '<b>Segno e assi</b>'+SV(
           '<i>Raccolgo x:</i> x³ − 3x = x(x² − 3)',
           '<i>Quando fa 0:</i> x = 0, oppure x² − 3 = 0 → x² = 3 → x = ±√3 ≈ ±1,73',
           '<i>Segno dei pezzi:</i> x &gt; 0 per x &gt; 0; x² − 3 &gt; 0 per x &lt; −√3 o x &gt; √3',
           '<i>Metto insieme (prodotto):</i> x &lt; −√3: (−)(+) = −; tra −√3 e 0: (−)(−) = +; tra 0 e √3: (+)(−) = −; x &gt; √3: (+)(+) = +',
           '<i>Controllo con i numeri:</i> f(−1) = −1 + 3 = 2 &gt; 0 ✓; f(1) = 1 − 3 = −2 &lt; 0 ✓',
           '<i>Asse y:</i> f(0) = 0. Zone verdi: sopra l\'asse; zone rosse: sotto'),
         '<b>Limiti e asintoti</b>'+SV(
           '<i>Raccolgo x³:</i> x³ − 3x = x³(1 − 3/x²)',
           '<i>Per x → +∞:</i> 3/x² → 0, quindi x³ · (1 − 0) → +∞. Con i numeri: f(10) = 1000 − 30 = 970',
           '<i>Per x → −∞:</i> x³ → −∞, quindi f → −∞. f(−10) = −970',
           '<i>Asintoto obliquo?</i> f(x)/x = x² − 3 → +∞, non è un numero: niente obliquo. Niente punti esclusi: niente verticali'),
         '<b>Derivata prima</b>'+SV(
           '<i>Derivo:</i> f′(x) = 3x² − 3 = 3(x² − 1)',
           '<i>Dove fa 0:</i> x² − 1 = 0 → x² = 1 → x = −1 oppure x = 1',
           '<i>Segno, provo un numero per zona:</i> f′(−2) = 12 − 3 = 9 &gt; 0; f′(0) = −3 &lt; 0; f′(2) = 9 &gt; 0',
           '<i>Quindi:</i> sale, scende, sale. In −1 da + a −: massimo. In 1 da − a +: minimo',
           '<i>Valori:</i> f(−1) = −1 + 3 = 2 → massimo (−1, 2); f(1) = 1 − 3 = −2 → minimo (1, −2)'),
         '<b>Derivata seconda</b>'+SV(
           '<i>Derivo f′ = 3x² − 3:</i> f″(x) = 6x',
           '<i>Segno:</i> f″(−1) = −6 &lt; 0 → ∩ per x &lt; 0; f″(1) = 6 &gt; 0 → ∪ per x &gt; 0',
           '<i>Cambio di segno in 0:</i> flesso, f(0) = 0 → flesso in (0, 0)'),
         '<b>Disegno</b>'+SV(
           '<i>Punti:</i> zeri −1,73; 0; 1,73 · massimo (−1, 2) · minimo (1, −2) · flesso (0, 0)',
           '<i>Andamento:</i> da −∞ sale fino al massimo, scende passando per il flesso, risale dopo il minimo verso +∞')] },
    { f:x=>x*x/(x-1), xr:[-4,5], yr:[-8,10], excl:[1], asy:[{type:'v',x:1},{type:'o',m:1,q:1}], ext:[{x:0,y:0,label:'max'},{x:2,y:4,label:'min'}], fl:[],
      sign:x=>x*x/(x-1), zeros:[0],
      t:['<b>Dominio</b>'+SV(
           '<i>C\'è un denominatore:</i> x − 1 ≠ 0 → x ≠ 1',
           '<i>Dominio:</i> tutto ℝ tranne 1. Linea tratteggiata: x = 1 è escluso',
           '<i>Simmetria:</i> f(2) = 4/1 = 4 e f(−2) = 4/(−3) ≈ −1,33: né uguali né opposti, quindi né pari né dispari'),
         '<b>Segno e assi</b>'+SV(
           '<i>Sopra:</i> x² ≥ 0 sempre, vale 0 solo in x = 0',
           '<i>Sotto:</i> x − 1 &gt; 0 per x &gt; 1, &lt; 0 per x &lt; 1',
           '<i>Quindi:</i> positiva per x &gt; 1, negativa per x &lt; 1 (tranne x = 0, dove vale 0)',
           '<i>Controllo:</i> f(2) = 4 &gt; 0; f(−1) = 1/(−2) = −0,5 &lt; 0; f(0,5) = 0,25/(−0,5) = −0,5 &lt; 0 ✓',
           '<i>Asse y:</i> f(0) = 0/(−1) = 0'),
         '<b>Limiti e asintoti</b>'+SV(
           '<i>x → 1⁺:</i> sopra → 1, sotto → 0 positivo, quindi +∞. Con i numeri: f(1,01) = 1,0201/0,01 ≈ 102',
           '<i>x → 1⁻:</i> sopra → 1, sotto → 0 negativo, quindi −∞. f(0,99) = 0,9801/(−0,01) ≈ −98. <b>Asintoto verticale x = 1</b>',
           '<i>x → ±∞:</i> divido per x: x/(1 − 1/x) → ±∞. Nessun orizzontale, provo l\'obliquo',
           '<i>m:</i> f(x)/x = x²/(x² − x) = 1/(1 − 1/x) → 1/(1 − 0) = 1',
           '<i>q:</i> f(x) − x = x²/(x − 1) − x = (x² − x(x − 1))/(x − 1) = (x² − x² + x)/(x − 1) = x/(x − 1) → 1',
           '<i>Asintoto obliquo y = x + 1.</i> Controllo: f(100) = 10 000/99 ≈ 101,01 e 100 + 1 = 101 ✓'),
         '<b>Derivata prima</b>'+SV(
           '<i>Quoziente:</i> f′ = '+FR('2x · (x − 1) − x² · 1','(x − 1)²')+' = '+FR('2x² − 2x − x²','(x − 1)²')+' = '+FR('x² − 2x','(x − 1)²')+' = '+FR('x(x − 2)','(x − 1)²'),
           '<i>Dove fa 0:</i> x = 0 oppure x − 2 = 0 → x = 2',
           '<i>Segno (sotto è un quadrato, sempre &gt; 0):</i> f′(−1) = (−1)(−3)/4 = 0,75 &gt; 0; f′(0,5) = 0,5 · (−1,5)/0,25 = −3 &lt; 0; f′(1,5) = 1,5 · (−0,5)/0,25 = −3 &lt; 0; f′(3) = 3 · 1/4 = 0,75 &gt; 0',
           '<i>Quindi + − − +:</i> massimo in 0, f(0) = 0 → (0, 0); minimo in 2, f(2) = 4/1 = 4 → (2, 4)'),
         '<b>Derivata seconda</b>'+SV(
           '<i>Trucco, divido x² per x − 1:</i> x² = (x − 1)(x + 1) + 1, quindi f(x) = x + 1 + '+FR('1','x − 1'),
           '<i>Derivo:</i> f′(x) = 1 − '+FR('1','(x − 1)²')+' (controllo: '+FR('(x − 1)² − 1','(x − 1)²')+' = '+FR('x² − 2x','(x − 1)²')+' ✓)',
           '<i>Derivo ancora:</i> f″(x) = '+FR('2','(x − 1)³'),
           '<i>Segno:</i> f″(0) = 2/(−1) = −2 &lt; 0 → ∩ per x &lt; 1; f″(2) = 2/1 = 2 &gt; 0 → ∪ per x &gt; 1',
           '<i>Flessi:</i> cambia segno solo in x = 1, ma lì f non esiste: nessun flesso'),
         '<b>Disegno</b>'+SV(
           '<i>Ramo sinistro:</i> arriva da −∞ attaccato a y = x + 1, sale al massimo (0, 0), scende a −∞ vicino a x = 1',
           '<i>Ramo destro:</i> scende da +∞ vicino a x = 1 fino al minimo (2, 4), poi risale attaccato a y = x + 1')] },
    { f:x=>x*Math.exp(-x), xr:[-1,6], yr:[-2,1], excl:[], asy:[{type:'h',y:0,from:0}], ext:[{x:1,y:Math.exp(-1),label:'max'}], fl:[{x:2,y:2*Math.exp(-2),label:'flesso'}],
      sign:x=>x, zeros:[0],
      t:['<b>Dominio</b>'+SV(
           '<i>x e e<sup>−x</sup> esistono per ogni x:</i> dominio = tutto ℝ',
           '<i>Simmetria:</i> f(1) = e<sup>−1</sup> ≈ 0,37 e f(−1) = −1 · e¹ ≈ −2,72: né pari né dispari'),
         '<b>Segno e assi</b>'+SV(
           '<i>e<sup>−x</sup> = 1/eˣ è sempre &gt; 0:</i> il segno è quello di x',
           '<i>Quindi:</i> positiva per x &gt; 0, negativa per x &lt; 0',
           '<i>Asse y:</i> f(0) = 0 · e⁰ = 0 · 1 = 0, passa per (0, 0)'),
         '<b>Limiti e asintoti</b>'+SV(
           '<i>x → +∞:</i> x e<sup>−x</sup> = x/eˣ, forma ∞/∞',
           '<i>Con i numeri:</i> f(5) = 5/148,4 ≈ 0,034; f(10) = 10/22 026 ≈ 0,00045',
           '<i>De L\'Hôpital:</i> (x)′/(eˣ)′ = 1/eˣ → 0. <b>Asintoto orizzontale y = 0</b> a destra',
           '<i>x → −∞:</i> x → −∞ e e<sup>−x</sup> → +∞, prodotto −∞. f(−3) = −3e³ ≈ −60'),
         '<b>Derivata prima</b>'+SV(
           '<i>Prodotto (e catena per e<sup>−x</sup>, la cui derivata è −e<sup>−x</sup>):</i> f′ = 1 · e<sup>−x</sup> + x · (−e<sup>−x</sup>) = e<sup>−x</sup>(1 − x)',
           '<i>Dove fa 0:</i> e<sup>−x</sup> non è mai 0, quindi 1 − x = 0 → x = 1',
           '<i>Segno:</i> f′(0) = 1 · 1 = 1 &gt; 0; f′(2) = e<sup>−2</sup> · (−1) ≈ −0,14 &lt; 0',
           '<i>Massimo in x = 1:</i> f(1) = 1/e ≈ 0,368 → (1; 0,37)'),
         '<b>Derivata seconda</b>'+SV(
           '<i>Derivo f′ = (1 − x)e<sup>−x</sup>:</i> (−1) · e<sup>−x</sup> + (1 − x) · (−e<sup>−x</sup>) = e<sup>−x</sup>(−1 − 1 + x) = (x − 2)e<sup>−x</sup>',
           '<i>Dove fa 0:</i> x = 2',
           '<i>Segno:</i> f″(0) = −2 &lt; 0 → ∩ prima di 2; f″(3) = e<sup>−3</sup> &gt; 0 → ∪ dopo 2',
           '<i>Flesso:</i> f(2) = 2e<sup>−2</sup> ≈ 2 · 0,135 = 0,271 → (2; 0,27)'),
         '<b>Disegno</b>'+SV(
           '<i>Andamento:</i> sale da −∞, passa per (0, 0), arriva al massimo (1; 0,37), scende',
           '<i>Dopo:</i> in (2; 0,27) cambia concavità e si appoggia piano sull\'asintoto y = 0')] }
  ];
  draws['studio-funzione'] = () => {
    const c = SF[+$('sfS').value], n = +$('sfN').value, o = { xmin:c.xr[0], xmax:c.xr[1], ymin:c.yr[0], ymax:c.yr[1], fns:[], points:[], vlines:[] };
    c.excl.forEach(x => { if (!(n>=3 && c.asy.some(a=>a.type==='v' && a.x===x))) o.vlines.push({x, color:'--bad', label:'x ≠ '+x}); });
    if (n>=2){ o.fns.push({f:x=>{ const s=c.sign(x); return isFinite(s) && s>0 ? c.yr[1]*0.04 : NaN; }, color:'--ok', width:6});
               o.fns.push({f:x=>{ const s=c.sign(x); return isFinite(s) && s<0 ? -c.yr[1]*0.04 : NaN; }, color:'--bad', width:6});
               c.zeros.forEach(z => o.points.push({x:z, y:0, color:'--ink'})); }
    if (n>=3) c.asy.forEach(a => { if (a.type==='v') o.vlines.push({x:a.x, color:'--cop', label:'asintoto x = '+a.x});
      if (a.type==='o') o.fns.push({f:x=>a.m*x+a.q, color:'--cop', dash:true, width:1.5});
      if (a.type==='h') o.fns.push({f:x=>x>=a.from?a.y:NaN, color:'--cop', dash:true, width:1.5}); });
    if (n>=4) c.ext.forEach(p => o.points.push({...p, color:'--thief'}));
    if (n>=5) c.fl.forEach(p => o.points.push({...p, color:'--cop'}));
    if (n>=6) o.fns.push({f:c.f, color:'--ink', width:2.5});
    plotF($('plotSF'), o);
    $('sfOut').innerHTML = 'Passo '+n+' di 6 · '+c.t[n-1];
  };
  $('sfS').addEventListener('change', () => { $('sfN').value = 1; draws['studio-funzione'](); });
  $('sfN').addEventListener('input', () => draws['studio-funzione']());

  video('studio-funzione', [
    { show:'<h3>Studio di funzione</h3>f(x) = '+FR('x²','x − 1'),
      say:'Studio di funzione completo, con tutti i calcoli. La funzione è x al quadrato diviso x meno uno.' },
    { show:'1 · Dominio: x − 1 ≠ 0 → <b>x ≠ 1</b>',
      say:'Primo passo, il dominio. C\'è un denominatore, che non può fare zero: x meno uno diverso da zero, cioè x diverso da uno.' },
    { show:'2 · Segno: x² ≥ 0 · x − 1 &gt; 0 per x &gt; 1 → f &gt; 0 per x &gt; 1, f &lt; 0 per x &lt; 1 · f(0) = 0',
      say:'Secondo, il segno. Sopra x al quadrato è sempre positivo o zero. Sotto x meno uno è positivo per x maggiore di uno. Quindi la funzione è positiva dopo uno e negativa prima. In zero vale zero.' },
    { show:'3 · x → 1⁺: f(1,01) = 1,0201/0,01 ≈ 102 → +∞ · x → 1⁻: f(0,99) ≈ −98 → −∞',
      say:'Terzo, i limiti. Vicino a uno da destra: uno virgola zero due zero uno diviso zero virgola zero uno, circa centodue. Va a più infinito. Da sinistra circa meno novantotto, va a meno infinito. Asintoto verticale x uguale a uno.' },
    { show:'m = '+LIMX('+∞')+' '+FR('x²','x² − x')+' = '+FR('1','1 − 1/x')+' → 1',
      say:'Per x che va all\'infinito la funzione va all\'infinito, quindi cerco l\'asintoto obliquo. m è il limite di f di x su x: x al quadrato su x al quadrato meno x. Divido per x al quadrato: uno su uno meno uno su x, che tende a uno.' },
    { show:'q = '+FR('x²','x − 1')+' − x = '+FR('x² − x² + x','x − 1')+' = '+FR('x','x − 1')+' → 1 → <b>y = x + 1</b>',
      say:'q è il limite di f di x meno m per x. Faccio il denominatore comune: x al quadrato meno x per x meno uno, cioè x al quadrato meno x al quadrato più x. Resta x su x meno uno, che tende a uno. Asintoto obliquo y uguale x più uno.' },
    { show:'Controllo: f(100) = 10 000/99 ≈ 101,01 · retta: 100 + 1 = 101',
      say:'Controllo: f di cento è diecimila su novantanove, circa centouno virgola zero uno. La retta dà centouno. Vicinissimi.' },
    { show:'4 · f′ = '+FR('2x(x − 1) − x²','(x − 1)²')+' = '+FR('x² − 2x','(x − 1)²')+' = '+FR('x(x − 2)','(x − 1)²'),
      say:'Quarto, la derivata prima, con la regola del quoziente. Sopra: due x per x meno uno, meno x al quadrato per uno. Due x al quadrato meno due x meno x al quadrato fa x al quadrato meno due x, cioè x per x meno due. Sotto x meno uno al quadrato.' },
    { show:'f′ = 0 in x = 0 e x = 2 · f′(−1) = 0,75 &gt; 0 · f′(0,5) = −3 · f′(1,5) = −3 · f′(3) = 0,75',
      say:'La derivata fa zero in zero e in due. Il segno lo provo con un numero per zona: in meno uno viene zero virgola settantacinque, positivo. In zero virgola cinque meno tre, negativo. In uno virgola cinque meno tre. In tre zero virgola settantacinque, positivo.' },
    { show:'+ − − + → massimo (0, 0), minimo (2, 4): f(2) = 4/1 = 4',
      say:'Quindi sale, scende, scende, sale. In zero da più a meno: massimo, e f di zero è zero. In due da meno a più: minimo, e f di due è quattro su uno, quattro.' },
    { show:'5 · f = x + 1 + '+FR('1','x − 1')+' → f″ = '+FR('2','(x − 1)³')+' · f″(0) = −2 ∩ · f″(2) = 2 ∪',
      say:'Quinto, la derivata seconda. Trucco: x al quadrato è x meno uno per x più uno, più uno. Quindi f è x più uno più uno su x meno uno. Derivando due volte viene due su x meno uno al cubo. In zero vale meno due, concava verso il basso. In due vale due, verso l\'alto. Cambia segno solo in uno, che è escluso: niente flessi.' },
    { show:'6 · Disegno: due rami, asintoto x = 1 e y = x + 1, max (0, 0), min (2, 4)',
      say:'Sesto, il disegno. Il ramo di sinistra arriva vicino alla retta y uguale x più uno, sale al massimo in zero e precipita a meno infinito vicino a uno. Il ramo di destra scende da più infinito al minimo in due, quattro, e poi risale vicino alla retta.' }
  ]);

  guided('studio-funzione', 'lavagna-studio-funzione', [
    { h:'Passo 1 · Derivata prima: f′(x) = 3x² − 12. Dove fa 0? (scrivi prima il più piccolo)', type:'nums', ans:[-2,2],
      html:'x = '+inp('prima soluzione','3.5em')+' e x = '+inp('seconda soluzione','3.5em'),
      ok:'Giusto: 3x² = 12, x² = 4, x = ±2.', bad:'3x² − 12 = 0 → x² = 4.' },
    { h:'Passo 2 · Segno di f′ = 3(x² − 4): positiva fuori da [−2, 2], negativa dentro. Dove c\'è il massimo?', type:'choice', ans:0,
      opts:['in x = −2: f′ passa da + a −','in x = 2: f′ passa da + a −','non ci sono massimi'],
      ok:'Esatto. Con i numeri: f′(−3) = 27 − 12 = 15 &gt; 0, f′(0) = −12 &lt; 0, f′(3) = 15 &gt; 0. In −2 da + a −: massimo. In x = 2 invece c\'è il minimo (da − a +): f(2) = 8 − 24 = −16.', bad:'Massimo = prima sale (f′ &gt; 0) poi scende (f′ &lt; 0).' },
    { h:'Passo 3 · Quanto vale il massimo? f(−2) = (−2)³ − 12 · (−2)', type:'nums', ans:[16],
      html:'f(−2) = '+inp('f(−2)'),
      ok:'Perfetto: −8 + 24 = 16. Il massimo è nel punto (−2, 16).', bad:'(−2)³ = −8 e −12 · (−2) = +24.' },
    { h:'Passo 4 · Derivata seconda f″(x) = 6x. Dove c\'è il flesso?', type:'choice', ans:1,
      opts:['in x = 2','in x = 0: f″ cambia segno','non c\'è'],
      ok:'Sì: f″(−1) = −6 &lt; 0 e f″(1) = 6 &gt; 0, quindi 6x cambia segno in 0. f(0) = 0 − 0 = 0: flesso in (0, 0).', bad:'Dove 6x cambia segno?' }
  ], '<b>Fatto!</b> f(x) = x³ − 12x: massimo in (−2, 16), minimo in (2, −16), flesso in (0, 0). È la stessa forma della prima funzione del grafico, solo più "stirata".');

  EX['studio-funzione'] = [
    { id:'e1', type:'choice', q:'Dominio di f(x) = ln(x − 3)', a:1, opts:['x ≠ 3','x &gt; 3','x ≥ 3'], hint:'L\'argomento del logaritmo deve essere strettamente positivo.', sol:SV(
      '<i>Regola del logaritmo:</i> l\'argomento deve essere strettamente positivo',
      '<i>Scrivo la condizione:</i> x − 3 &gt; 0',
      '<i>Porto 3 dall\'altra parte:</i> x &gt; 3',
      '<i>Dominio:</i> <b>x &gt; 3</b> (3 escluso: ln 0 non esiste)') },
    { id:'e2', type:'num', lbl:'x', q:'Asintoto verticale di f(x) = '+FR('x + 1','x − 4')+': x = ?', a:4, hint:'Dove si annulla il denominatore (e il numeratore no)?', sol:SV(
      '<i>Dove si annulla il denominatore?</i> x − 4 = 0, x = 4',
      '<i>Il numeratore lì vale</i> 4 + 1 = 5 ≠ 0, quindi è 5/0: infinito',
      '<i>Da destra (x = 4,01):</i> 5,01/0,01 ≈ 501 → +∞',
      '<i>Da sinistra (x = 3,99):</i> 4,99/(−0,01) ≈ −499 → −∞',
      '<i>Conclusione:</i> asintoto verticale <b>x = 4</b>') },
    { id:'e3', type:'num', lbl:'y', q:'Asintoto orizzontale di f(x) = '+FR('2x² + 1','x² − 3')+' per x → ±∞: y = ?', a:2, hint:'Termine dominante sopra e sotto.', sol:SV(
      '<i>Calcolo il limite per x → +∞:</i> forma ∞/∞',
      '<i>Raccolgo x² sopra e sotto:</i> '+FR('x²(2 + 1/x²)','x²(1 − 3/x²)'),
      '<i>Semplifico x²:</i> '+FR('2 + 1/x²','1 − 3/x²'),
      '<i>Limite:</i> 1/x² → 0 e 3/x² → 0, quindi '+FR('2','1')+' = 2',
      '<i>Per x → −∞ è uguale (x² è positivo):</i> asintoto orizzontale <b>y = 2</b>') },
    { id:'e4', type:'num', lbl:'q', q:'f(x) = '+FR('2x² + 3x','x + 1')+' ha asintoto obliquo y = 2x + q per x → +∞. Quanto vale q?', a:1, hint:'q = '+LIMX('+∞')+' [f(x) − 2x]. Fai il denominatore comune.', sol:SV(
      '<i>Formula:</i> q = '+LIMX('+∞')+' [f(x) − 2x]',
      '<i>Scrivo la differenza:</i> '+FR('2x² + 3x','x + 1')+' − 2x',
      '<i>Denominatore comune (x + 1):</i> '+FR('2x² + 3x − 2x(x + 1)','x + 1'),
      '<i>Sviluppo 2x(x + 1) = 2x² + 2x:</i> '+FR('2x² + 3x − 2x² − 2x','x + 1'),
      '<i>Semplifico sopra:</i> 2x² − 2x² = 0 e 3x − 2x = x, quindi '+FR('x','x + 1'),
      '<i>Limite (divido per x):</i> '+FR('1','1 + 1/x')+' → 1',
      '<i>Risultato:</i> <b>q = 1</b>, asintoto y = 2x + 1') },
    { id:'e5', type:'num', lbl:'x', q:'f(x) = x² − 4x + 1: in quale x c\'è il minimo?', a:2, hint:'f′(x) = 2x − 4.', sol:SV(
      '<i>Derivo:</i> f′(x) = 2x − 4',
      '<i>Pongo f′(x) = 0:</i> 2x − 4 = 0, x = 2',
      '<i>Segno di f′ prima di 2 (x = 0):</i> −4 &lt; 0, f scende',
      '<i>Segno di f′ dopo 2 (x = 3):</i> 2 &gt; 0, f sale',
      '<i>Scende e poi sale:</i> minimo in <b>x = 2</b>') },
    { id:'e6', type:'num', lbl:'x', q:'f(x) = x · e<sup>−x</sup>: in quale x c\'è il massimo?', a:1, hint:'f′(x) = (1 − x) e<sup>−x</sup>. Il fattore e<sup>−x</sup> è sempre positivo.', sol:SV(
      '<i>Derivo il prodotto x · e<sup>−x</sup>:</i> 1 · e<sup>−x</sup> + x · (−e<sup>−x</sup>)',
      '<i>Raccolgo e<sup>−x</sup>:</i> f′(x) = (1 − x) e<sup>−x</sup>',
      '<i>e<sup>−x</sup> &gt; 0 sempre:</i> il segno di f′ è il segno di 1 − x',
      '<i>1 − x &gt; 0 per x &lt; 1</i> (sale), <i>&lt; 0 per x &gt; 1</i> (scende)',
      '<i>Sale e poi scende:</i> massimo in <b>x = 1</b>') },
    { id:'e7', type:'num', lbl:'x', q:'f(x) = x³ − 6x²: in quale x c\'è il flesso?', a:2, hint:'f″(x) = 6x − 12.', sol:SV(
      '<i>Derivata prima:</i> f′(x) = 3x² − 12x',
      '<i>Derivata seconda:</i> f″(x) = 6x − 12',
      '<i>Pongo f″ = 0:</i> 6x = 12, x = 2',
      '<i>Controllo il cambio di segno:</i> x = 0 → −12 &lt; 0; x = 3 → 6 &gt; 0 ✓',
      '<i>Conclusione:</i> flesso in <b>x = 2</b>') },
    { id:'e8', type:'choice', q:'f(x) = x⁴ ha f″(0) = 0. In x = 0 c\'è un flesso?', a:1, opts:['sì','no: f″ = 12x² non cambia segno','non si può dire'], hint:'Guarda il segno di f″ = 12x² prima e dopo 0.', sol:SV(
      '<i>Derivate:</i> f′(x) = 4x³, f″(x) = 12x²',
      '<i>In 0:</i> f″(0) = 0, ma non basta',
      '<i>Segno di f″ prima di 0 (x = −1):</i> 12 &gt; 0',
      '<i>Segno di f″ dopo 0 (x = 1):</i> 12 &gt; 0',
      '<i>Non cambia segno:</i> <b>nessun flesso</b>. In 0 c\'è un minimo (f′ passa da − a +)') },
    { id:'e9', type:'choice', q:'Se f′(x) &gt; 0 per ogni x in (a, b), allora su (a, b) f è…', a:0, opts:['crescente','concava verso l\'alto','positiva'], hint:'f′ è la pendenza.', sol:SV(
      '<i>f′ è la pendenza della tangente</i>',
      '<i>f′ &gt; 0 vuol dire:</i> pendenza positiva in ogni punto, il grafico sale',
      '<i>Conseguenza di Lagrange:</i> f′ &gt; 0 su un intervallo ⇒ f crescente',
      '<i>Risposta:</i> <b>crescente</b> (positiva riguarda il segno di f, concava quello di f″)') }
  ];
