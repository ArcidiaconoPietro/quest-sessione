/* Capitoli 1-4: primi passi, complemento a 2, espressioni, input-output e cicli. Programmi verificati con gcc -Wall. */

/* ================= 1 · PRIMI PASSI ================= */
CH.push({
  id:'primi-passi', n:1, short:'Primi passi in C', when:'piano dell\'11/11 · slide Modulo 1 da 01a a 04 · esercitazioni 02, 03, 04a',
  title:'Primi passi in C: dal file .c al programma che gira',
  serve:'<p class="big">Serve a tutto il resto: all\'esame al PC devi consegnare file che <b>compilano senza errori e senza warning</b>, altrimenti la prova parte male. Qui impari com\'è fatto un programma C, cosa fa il compilatore e quali tipi di dato esistono.</p>',
  exam:'alla prova al PC il testo dice "per verificare l\'assenza di warning, eseguire sempre Rebuild All". I tipi (int, float, char) e i codici di printf (%d, %f, %c, %s) servono in ogni esercizio, scritto e PC.',
  idea:{ title:'Il compilatore è un traduttore', html:
    '<p>Tu scrivi il programma in C, in un file di testo che finisce con <code>.c</code> (si chiama <b>sorgente</b>). Il computer però capisce solo il linguaggio macchina, fatto di 0 e 1.</p>'
   +'<p>Il <span class="fon">compilatore</span> (per esempio <code>gcc</code>) è il traduttore: legge il tuo file .c, controlla che sia scritto bene e produce un file <b>eseguibile</b>, che è il programma vero e proprio.</p>'
   +'<div class="note"><b>sorgente</b> <code>prog.c</code> → <b>compilatore</b> <code>gcc</code> → <b>eseguibile</b> <code>prog</code> → lo esegui e stampa sullo schermo.</div>'
   +'<p>Se il compilatore trova un <b>errore</b> non produce niente. Se trova un <b>warning</b> (avviso) produce l\'eseguibile, ma ti dice che probabilmente c\'è qualcosa di sbagliato. All\'esame i warning vanno tolti tutti.</p>' },
  widgets:[
    { type:'tracer', title:'Il primo programma, riga per riga', intro:'Premi "Avanti": la riga verde è quella che il computer sta eseguendo. A destra vedi la memoria (le variabili) e cosa compare sullo schermo.',
      code:String.raw`
#include <stdio.h>

int main(void) {
    int a = 5;
    int b = 2;
    float media;
    media = (a + b) / 2.0;
    printf("a = %d, b = %d\n", a, b);
    printf("media = %f\n", media);
    return 0;
}`,
      steps:[
        { l:1, say:'<code>#include &lt;stdio.h&gt;</code> dice al compilatore: "usa la libreria standard di input/output". Senza questa riga <code>printf</code> non esiste.' },
        { l:3, f:[['main',{}]], say:'Il programma comincia <b>sempre</b> da <code>main</code>. <code>int</code> davanti vuol dire che main restituisce un numero intero al sistema operativo. <code>void</code> tra parentesi vuol dire che non riceve parametri.' },
        { l:4, v:{'a (int)':'5'}, say:'Creo una variabile di nome <code>a</code>, di tipo <code>int</code> (numero intero), e le metto dentro 5.' },
        { l:5, v:{'a (int)':'5','b (int)':'2'}, say:'Stessa cosa per <code>b</code>, che vale 2.' },
        { l:6, v:{'a (int)':'5','b (int)':'2','media (float)':'???'}, say:'Creo <code>media</code> di tipo <code>float</code> (numero con la virgola) ma non le do un valore. Dentro c\'è "spazzatura": un numero a caso. Per questo si dice che una variabile <b>non inizializzata</b> ha valore indefinito.' },
        { l:7, v:{'a (int)':'5','b (int)':'2','media (float)':'3.500000'}, say:'(a + b) = 7. Poi 7 / 2.0: siccome 2.0 ha la virgola, la divisione è "con la virgola" e fa 3.5. Il risultato va in media.' },
        { l:8, v:{'a (int)':'5','b (int)':'2','media (float)':'3.500000'}, out:'a = 5, b = 2\n', say:'<code>printf</code> stampa il testo tra virgolette. Ogni <code>%d</code> viene sostituito, in ordine, dal valore intero dopo la virgola: il primo %d da a, il secondo da b. <code>\\n</code> vuol dire "vai a capo".' },
        { l:9, v:{'a (int)':'5','b (int)':'2','media (float)':'3.500000'}, out:'a = 5, b = 2\nmedia = 3.500000\n', say:'<code>%f</code> stampa un float. Di base mette <b>6 cifre dopo la virgola</b>: 3.500000.' },
        { l:10, v:{'a (int)':'5','b (int)':'2','media (float)':'3.500000'}, out:'a = 5, b = 2\nmedia = 3.500000\n', say:'<code>return 0;</code> fa finire main e dice al sistema operativo "è andato tutto bene" (0 = nessun errore).' }
      ] },
    { type:'html', eyebrow:'Tabella da tenere davanti', title:'I tipi di dato e i loro codici in printf', html:
      '<div class="scroll"><table class="t"><tr><th>Tipo</th><th>Cosa contiene</th><th>Esempio</th><th>Codice in printf / scanf</th></tr>'
     +'<tr><td><code>int</code></td><td>numero intero</td><td><code>int n = -7;</code></td><td><code>%d</code></td></tr>'
     +'<tr><td><code>float</code></td><td>numero con la virgola (precisione normale)</td><td><code>float p = 2.5;</code></td><td><code>%f</code></td></tr>'
     +'<tr><td><code>double</code></td><td>numero con la virgola (più preciso)</td><td><code>double d = 3.14159;</code></td><td><code>%f</code> in printf, <code>%lf</code> in scanf</td></tr>'
     +'<tr><td><code>char</code></td><td>un carattere, che in realtà è un piccolo numero (codice ASCII)</td><td><code>char c = \'A\';</code></td><td><code>%c</code> (carattere) oppure <code>%d</code> (il suo numero)</td></tr>'
     +'<tr><td><code>char[]</code></td><td>una stringa (testo)</td><td><code>char s[] = "ciao";</code></td><td><code>%s</code></td></tr></table></div>'
     +'<p>Codici ASCII da sapere: <code>\'A\'</code> = 65, <code>\'a\'</code> = 97, <code>\'0\'</code> = 48. Le lettere sono in fila: <code>\'B\'</code> = 66, <code>\'C\'</code> = 67, e così via.</p>' },
    { type:'recipe', title:'Compilare ed eseguire', intro:'Due modi: dal terminale (Mac) oppure con un ambiente come Code::Blocks o Visual Studio, quello che si usa all\'esame.', steps:[
      { h:'Scrivi il file', html:'<p>Salva il programma in un file, per esempio <code>prog.c</code>.</p>' },
      { h:'Compila con tutti gli avvisi accesi', html:'<p>Nel terminale, nella cartella del file:</p>'+code(String.raw`gcc -Wall -o prog prog.c`)+'<p><code>-Wall</code> vuol dire "mostrami tutti i warning". <code>-o prog</code> dà il nome all\'eseguibile.</p>' },
      { h:'Leggi i messaggi', html:'<p>Se esce <b>error</b>: correggi la riga indicata (il numero dopo i due punti, es. <code>prog.c:7:</code> = riga 7). Se esce <b>warning</b>: il programma parte, ma correggi lo stesso.</p>' },
      { h:'Esegui', html:code(String.raw`./prog`)+'<p>In Code::Blocks: <b>Build → Rebuild</b> e poi <b>Run</b>. "Rebuild" ricompila tutti i file da zero, così vedi tutti i warning.</p>' }
    ] }
  ],
  why:[
    { easy:true, f:'Un char è un numero', t:'Il computer conserva solo numeri. Per i caratteri c\'è una tabella (ASCII) che dà a ogni carattere un numero: \'A\' è 65. Quindi \'A\' + 2 è 67, cioè \'C\'.' },
    { easy:true, f:'Variabile non inizializzata = valore a caso', t:'Creare una variabile vuol dire prendere un pezzo di memoria. Dentro c\'è quello che c\'era prima, nessuno lo pulisce.' },
    { easy:false, f:'%d per int, %f per float e double, %c per char, %s per stringa, %lf per leggere un double con scanf', t:'Sono convenzioni della libreria: non c\'è un perché da capire. Tienile nella tabella qui sopra (anche nella RACCOLTA_C: all\'esame al PC gli appunti sono ammessi).' },
    { easy:false, f:'Le grammatiche EBNF (slide 02-03)', t:'Servono a descrivere le regole di un linguaggio. Negli scritti 2025-2026 non sono mai uscite: basta saper leggere una regola, non serve scriverle.' }
  ],
  guided:{ title:'Cosa stampa?', intro:code(String.raw`
char c = 'A';
int k = c + 2;
printf("%d %c %c\n", c, c + 2, k);`),
    steps:[
      { h:'Il primo valore stampato è c con il codice %d. Che numero è \'A\'?', type:'text', ans:['65'], ok:'Giusto: %d stampa il numero che c\'è dentro il char.', bad:'Guarda la tabella: il codice ASCII di \'A\'.' },
      { h:'Il secondo è c + 2 con %c. Che carattere è 65 + 2 = 67?', type:'text', ans:['C',"'C'"], ok:'Sì, la lettera due posti dopo A.', bad:'Le lettere sono in fila: A = 65, B = 66, …' },
      { h:'Il terzo è k (un int che vale 67) stampato con %c. Cosa compare?', type:'choice', opts:['67','C','errore di compilazione'], ans:1, ok:'Esatto: %c prende un numero e stampa il carattere con quel codice.', bad:'Il codice %c stampa sempre un carattere, anche se gli passi un int.' }
    ],
    done:'<b>Fatto!</b> Stampa <code>65 C C</code>. Regola: lo stesso numero si può stampare come numero (%d) o come carattere (%c).' },
  ex:[
    { id:'e1', type:'choice', q:'Quale codice usi in printf per stampare una variabile <code>float prezzo</code>?', opts:['%d','%f','%c','%s'], a:1, hint:'f come float.', sol:'<code>printf("%f", prezzo);</code> Con <code>%.2f</code> stampi solo 2 cifre dopo la virgola.' },
    { id:'e2', type:'choice', q:'Il compilatore ti dà un <b>warning</b> e nessun errore. Cosa succede?', opts:['Non viene creato nessun eseguibile','L\'eseguibile viene creato, ma probabilmente c\'è un problema da correggere','Il programma è sicuramente giusto'], a:1, hint:'Warning = avviso, non blocco.', sol:'Con i soli warning l\'eseguibile esiste. All\'esame però vanno tolti tutti.' },
    { id:'e3', type:'text', q:'Che carattere stampa <code>printf("%c", \'a\' + 3);</code> ?', a:['d',"'d'"], hint:'\'a\' = 97. Conta tre lettere dopo la a.', sol:'97 + 3 = 100, che è \'d\'.' },
    { id:'e4', type:'out', q:'Cosa stampa?'+code(String.raw`
int x = 4;
float y = x / 8.0;
printf("x=%d\ny=%f\n", x, y);`), a:'x=4\ny=0.500000', hint:'8.0 ha la virgola: la divisione è con la virgola. %f mette 6 cifre decimali. \\n va a capo.', sol:'<pre class="code">x=4\ny=0.500000</pre>4 / 8.0 = 0.5, e %f lo stampa come 0.500000.' },
    { id:'e5', type:'code', tag:'al PC', q:'Scrivi, compila (con <code>-Wall</code>) ed esegui un programma che crea due variabili int <code>base = 6</code> e <code>altezza = 4</code>, calcola l\'area del rettangolo e stampa <code>Area: 24</code>.', hint:'Ti servono: #include &lt;stdio.h&gt;, int main(void), una variabile area, printf con %d, return 0.', sol:code(String.raw`
#include <stdio.h>

int main(void) {
    int base = 6;
    int altezza = 4;
    int area;
    area = base * altezza;
    printf("Area: %d\n", area);
    return 0;
}`) }
  ],
  quaderno:[
    '<b>Schema di ogni programma:</b> <code>#include &lt;stdio.h&gt;</code>, poi <code>int main(void) { ... return 0; }</code>.',
    '<b>Tabella tipi → codici:</b> int %d · float %f · double %f (scanf %lf) · char %c · stringa %s.',
    '<b>ASCII:</b> \'A\' = 65, \'a\' = 97, \'0\' = 48, le lettere sono consecutive.',
    '<b>Compilare:</b> <code>gcc -Wall -o prog prog.c</code>, poi <code>./prog</code>. All\'esame: Rebuild All, zero warning.'
  ]
});

/* ================= 2 · COMPLEMENTO A 2 ================= */
CH.push({
  id:'complemento-a-2', n:2, short:'Complemento a 2', when:'dentro le slide 03-04 (rappresentazione dei numeri)',
  title:'Il complemento a 2: i numeri negativi in binario',
  serve:'<p class="big">È l\'esercizio 2 dello scritto in 5 temi su 7 del 2025-2026: <b>2 punti</b> quasi regalati, perché è solo una ricetta meccanica. Per passare lo scritto servono 7 punti su 12: questi 2 devi prenderli sempre.</p>',
  exam:'"Un elaboratore rappresenta i numeri interi su 8 bit tramite la notazione in complemento a 2. Indicare come viene svolta la seguente operazione (es. −37 − 7) calcolandone il risultato… e si trasli il risultato in decimale per verificare". Devi mostrare i passaggi in binario.',
  idea:{ title:'Il contachilometri che torna indietro', html:
    '<p>Immagina un contachilometri con 3 cifre che segna 000. Se vai indietro di 1 non può segnare −1: segna <b>999</b>. Allora conveniamo che 999 "vuol dire" −1, 998 vuol dire −2, e così via.</p>'
   +'<p>Il complemento a 2 fa la stessa cosa in binario su 8 bit: <span class="mono">11111111</span> vuol dire −1. In pratica il <b>primo bit a sinistra pesa −128</b> invece di +128. Tutti gli altri pesano come al solito: 64, 32, 16, 8, 4, 2, 1.</p>'
   +'<div class="note">Se il primo bit è 1 il numero è negativo, se è 0 è positivo. Con 8 bit si va da <b>−128</b> (<span class="mono">10000000</span>) a <b>+127</b> (<span class="mono">01111111</span>).</div>' },
  widgets:[
    { type:'bits', title:'8 interruttori: accendi i bit', intro:'Clicca sui bit per accenderli. Sotto ogni bit c\'è il suo peso: il primo pesa <b>−128</b>. Il valore è la somma dei pesi dei bit accesi. Oppure scrivi un numero e guarda la ricetta.' },
    { type:'recipe', title:'Il tema del 9 febbraio 2026: −37 − 7', intro:'Ricetta dell\'esame. Trucco: una sottrazione si fa sempre come somma, −37 − 7 = (−37) + (−7).', steps:[
      { h:'Trasforma la sottrazione in somma', html:'<p>−37 − 7 = (−37) + (−7). Devo scrivere in complemento a 2 sia −37 sia −7.</p>' },
      { h:'Scrivi −37: binario di 37, inverti, aggiungi 1', html:'<p>37 = 32 + 4 + 1 → <span class="mono">00100101</span><br>inverto tutti i bit → <span class="mono">11011010</span><br>aggiungo 1 → <b class="mono">11011011</b> = −37</p>' },
      { h:'Scrivi −7 allo stesso modo', html:'<p>7 = 4 + 2 + 1 → <span class="mono">00000111</span><br>inverto → <span class="mono">11111000</span><br>aggiungo 1 → <b class="mono">11111001</b> = −7</p>' },
      { h:'Somma in colonna, da destra, con i riporti', html:code(String.raw`
   11011011   (-37)
 + 11111001   (-7)
 ----------
 1 11010100`)+'<p>Il risultato ha 9 bit: il <b>riporto oltre l\'ottavo bit si butta via</b>. Resta <b class="mono">11010100</b>.</p>' },
      { h:'Verifica in decimale', html:'<p>Il primo bit è 1, quindi è negativo. Per sapere quanto vale rifaccio la ricetta al contrario: inverto e aggiungo 1.<br><span class="mono">11010100</span> → inverto <span class="mono">00101011</span> → +1 <span class="mono">00101100</span> = 44.<br>Quindi il risultato è <b>−44</b>, e infatti −37 − 7 = −44. ✓</p>' }
    ] }
  ],
  why:[
    { easy:true, f:'Il primo bit pesa −128', t:'È la definizione del complemento a 2. Esempio: 11111111 = −128 + 64 + 32 + 16 + 8 + 4 + 2 + 1 = −128 + 127 = −1. Con gli interruttori qui sopra lo vedi subito.' },
    { easy:false, f:'"Inverti tutti i bit e aggiungi 1" dà il numero opposto', t:'Il motivo esiste (x + inverso di x = 11111111 = −1, quindi inverso + 1 = −x), ma all\'esame non serve: impara la ricetta a memoria.' },
    { easy:true, f:'Il riporto oltre l\'ottavo bit si butta', t:'La macchina ha solo 8 posti. Il nono bit non ha dove stare: sparisce, come il contachilometri che da 999 torna a 000.' },
    { easy:true, f:'Overflow: due positivi danno un negativo (o due negativi un positivo)', t:'Succede quando il risultato vero esce dall\'intervallo da −128 a 127. Esempio: 100 + 50 = 150, che con 8 bit non ci sta. Lo riconosci dal segno sbagliato.' }
  ],
  warn:{ title:'L\'overflow', html:'<p>Se sommi due numeri dello stesso segno e il risultato ha il segno opposto, c\'è <b>overflow</b>: il risultato vero non sta in 8 bit. All\'esame scrivi "overflow" e spiega che il risultato esce dall\'intervallo da −128 a 127.</p>'
    +'<p>Esempio: −60 − 70 = −130, ma −130 &lt; −128. In binario: <span class="mono">11000100 + 10111010 = 1|01111110</span> → <span class="mono">01111110</span> = +126. Due negativi danno un positivo: overflow.</p>' },
  guided:{ title:'Calcola −18 + 5 su 8 bit', steps:[
      { h:'Scrivi 18 in binario su 8 bit (18 = 16 + 2)', type:'text', ans:['00010010'], ok:'Giusto.', bad:'16 è il quarto bit da destra contando da 1, 2, 4, 8, 16. Scrivi 8 cifre.' },
      { h:'Inverti tutti i bit di 00010010 e aggiungi 1: quanto fa −18?', type:'text', ans:['11101110'], ok:'Sì: 11101101 + 1 = 11101110.', bad:'Inverti: 11101101. Ora aggiungi 1 all\'ultima cifra.' },
      { h:'5 = 00000101. Somma 11101110 + 00000101', type:'text', ans:['11110011'], ok:'Giusto, e qui non c\'è nessun nono bit da buttare.', bad:'Somma da destra: 0+1=1, 1+0=1, 1+1=10 (scrivo 0, riporto 1)…' },
      { h:'11110011 inizia con 1, quindi è negativo. Inverti e aggiungi 1 per trovare il valore: quanto fa?', type:'text', ans:['-13','−13'], ok:'Perfetto: 00001100 + 1 = 00001101 = 13, quindi −13. E infatti −18 + 5 = −13.', bad:'Inverti: 00001100. Aggiungi 1: 00001101. Quanto vale? Poi metti il meno.' }
    ], done:'<b>Fatto!</b> −18 + 5 = <span class="mono">11110011</span> = −13. All\'esame scrivi tutti questi passaggi: si danno punti anche ai passaggi.' },
  ex:[
    { id:'e1', type:'text', q:'Scrivi −1 in complemento a 2 su 8 bit.', a:['11111111'], hint:'1 = 00000001. Inverti e aggiungi 1.', sol:'00000001 → 11111110 → +1 = <b>11111111</b>.' },
    { id:'e2', type:'text', q:'Quanto vale in decimale <span class="mono">10000000</span> (complemento a 2, 8 bit)?', a:['-128','−128'], hint:'Solo il primo bit è acceso. Quanto pesa il primo bit?', sol:'Solo il bit di peso −128: vale <b>−128</b>, il numero più piccolo con 8 bit.' },
    { id:'e3', type:'text', q:'Scrivi −20 in complemento a 2 su 8 bit.', a:['11101100'], hint:'20 = 16 + 4 = 00010100.', sol:'00010100 → inverto 11101011 → +1 = <b>11101100</b>.' },
    { id:'e4', type:'text', q:'Calcola 12 − 30 su 8 bit e scrivi il risultato in binario.', a:['11101110'], hint:'12 − 30 = 12 + (−30). 12 = 00001100, 30 = 00011110 → −30 = 11100010.', sol:'00001100 + 11100010 = <b>11101110</b> → inverto 00010001, +1 = 00010010 = 18 → −18. ✓ (12 − 30 = −18)' },
    { id:'e5', type:'choice', q:'100 + 50 su 8 bit in complemento a 2: cosa succede?', opts:['Fa 150, nessun problema','Overflow: 01100100 + 00110010 = 10010110, che vale −106','Errore del compilatore'], a:1, hint:'Il massimo con 8 bit è 127.', sol:'150 &gt; 127. La somma dà 10010110, che inizia con 1 quindi è negativo (−106): due positivi danno un negativo, è <b>overflow</b>.' }
  ],
  quaderno:[
    '<b>Intervallo con 8 bit:</b> da −128 a +127. Il primo bit pesa −128.',
    '<b>Negativo:</b> binario del valore assoluto → inverto tutti i bit → aggiungo 1.',
    '<b>Sottrazione:</b> a − b = a + (−b). Somma in colonna, il nono bit si butta.',
    '<b>Verifica:</b> se il risultato inizia con 1, inverto e aggiungo 1 per leggere il valore, poi metto il meno.',
    '<b>Overflow:</b> stesso segno in ingresso, segno opposto in uscita.'
  ]
});

/* ================= 3 · ESPRESSIONI ================= */
CH.push({
  id:'espressioni', n:3, short:'Espressioni e conversioni', when:'piano del 14/11 · esercitazione Modulo 2 04b',
  title:'Espressioni: divisione intera, resto, cast, ++ e l\'operatore ?:',
  serve:'<p class="big">Sono le trappole preferite dell\'esercizio 3 dello scritto ("cosa stampa", <b>3 punti</b>). Se sai esattamente cosa fanno <code>/</code> tra interi, <code>%</code>, <code>++</code> e <code>? :</code>, quell\'esercizio diventa una traccia a mano.</p>',
  exam:'nel tema del 9 febbraio 2026 c\'è <code>(i &lt; max) ? i=max : i++;</code> e <code>result[i] = source[i] - max;</code> (aritmetica dei char). Al PC servono per calcolare medie, contatori, indici.',
  idea:{ title:'Due calcolatrici diverse', html:
    '<p>Il C ha due calcolatrici. Se <b>tutti e due</b> i numeri sono interi usa la calcolatrice "delle elementari": <code>7 / 2</code> fa <b>3</b> e il resto lo trovi con <code>7 % 2</code> = <b>1</b>.</p>'
   +'<p>Se <b>almeno uno</b> dei due ha la virgola usa la calcolatrice normale: <code>7 / 2.0</code> fa <b>3.5</b>.</p>'
   +'<div class="note">La decisione si prende <b>prima</b> di guardare dove va il risultato. <code>float x = 7 / 2;</code> mette in x il valore 3.0, non 3.5: la divisione era già intera.</div>' },
  widgets:[
    { type:'tracer', title:'Le trappole in fila',
      code:String.raw`
#include <stdio.h>

int main(void) {
    int a = 7, b = 2, c;
    float x;
    c = a / b;
    x = a / b;
    x = (float) a / b;
    c = a % b;
    c = a++ + ++b;
    printf("%d %d %d %.1f\n", a, b, c, x);
    return 0;
}`,
      steps:[
        { l:4, v:{'a (int)':'7','b (int)':'2','c (int)':'???'}, say:'Tre interi: a = 7, b = 2, c senza valore.' },
        { l:5, v:{'a (int)':'7','b (int)':'2','c (int)':'???','x (float)':'???'}, say:'Un float x, senza valore.' },
        { l:6, v:{'a (int)':'7','b (int)':'2','c (int)':'3','x (float)':'???'}, say:'7 / 2 tra due int: <b>divisione intera</b>, la parte dopo la virgola si butta. c = 3.' },
        { l:7, v:{'a (int)':'7','b (int)':'2','c (int)':'3','x (float)':'3.0'}, say:'Trappola: a / b è ancora tra due int, fa 3. Solo dopo il 3 viene messo nel float: x = 3.0, <b>non</b> 3.5.' },
        { l:8, v:{'a (int)':'7','b (int)':'2','c (int)':'3','x (float)':'3.5'}, say:'<code>(float) a</code> è un <b>cast</b>: trasforma a in 7.0 prima della divisione. Ora c\'è un numero con la virgola, quindi 7.0 / 2 = 3.5.' },
        { l:9, v:{'a (int)':'7','b (int)':'2','c (int)':'1','x (float)':'3.5'}, say:'<code>%</code> è il <b>resto</b> della divisione intera: 7 = 2 · 3 + 1, quindi 7 % 2 = 1.' },
        { l:10, v:{'a (int)':'8','b (int)':'3','c (int)':'10','x (float)':'3.5'}, say:'<code>a++</code> (dopo): nel calcolo usa il valore vecchio 7, poi a diventa 8. <code>++b</code> (prima): b diventa 3 e nel calcolo usa 3. Quindi c = 7 + 3 = 10.' },
        { l:11, v:{'a (int)':'8','b (int)':'3','c (int)':'10','x (float)':'3.5'}, out:'8 3 10 3.5\n', say:'<code>%.1f</code> stampa il float con 1 cifra dopo la virgola.' },
        { l:12, v:{'a (int)':'8','b (int)':'3','c (int)':'10','x (float)':'3.5'}, out:'8 3 10 3.5\n', say:'Fine.' }
      ] }
  ],
  why:[
    { easy:true, f:'int / int = divisione intera', t:'Il C guarda i tipi dei due numeri: se sono entrambi interi, anche il risultato deve essere intero, quindi la parte decimale si butta (non si arrotonda: 7/2 = 3, anche 9/5 = 1).' },
    { easy:true, f:'a++ usa il valore vecchio, ++a usa il valore nuovo', t:'Leggi l\'ordine: in <code>a++</code> prima c\'è a (lo uso) e poi ++ (lo aumento). In <code>++a</code> prima aumento, poi uso.' },
    { easy:true, f:'condizione ? A : B', t:'È un if in una riga: se la condizione è vera il risultato è A, altrimenti B. <code>m = (a &gt; b) ? a : b;</code> mette in m il più grande.' },
    { easy:true, f:'In C "vero" è qualsiasi numero diverso da 0, "falso" è 0', t:'Non esiste un tipo vero/falso. Per questo <code>if (5)</code> entra sempre, e <code>(msg[0]) ? 3 : 10</code> nel tema del 9 feb 2026 vale 3, perché msg[0] = \'d\' che è diverso da 0.' },
    { easy:false, f:'Ordine di precedenza degli operatori', t:'La tabella completa è lunga: tieni a mente solo che * / % vengono prima di + −, e che i confronti (&lt; &gt; ==) vengono prima di && e ||. Nel dubbio, all\'esame metti le parentesi.' }
  ],
  warn:{ title:'Mai due ++ sulla stessa variabile nella stessa riga', html:'<p><code>j = --i + i;</code> oppure <code>i = i++;</code> hanno risultato <b>indefinito</b>: compilatori diversi danno numeri diversi e gcc dà un warning. All\'esame non escono, e tu non scriverli.</p>' },
  guided:{ title:'L\'operatore ? : come nel tema d\'esame', intro:code(String.raw`
int a = 3, b = 8, m;
m = (a > b) ? a : b;
printf("%d\n", m);
a = (b % a == 2) ? a * 10 : 0;
printf("%d\n", a);`), steps:[
      { h:'a &gt; b, cioè 3 &gt; 8, è vero o falso?', type:'choice', opts:['vero','falso'], ans:1, ok:'Falso, quindi si prende la parte dopo i due punti.', bad:'3 è più grande di 8?' },
      { h:'Quindi quanto vale m e cosa stampa la prima printf?', type:'text', ans:['8'], ok:'Sì, m = b = 8.', bad:'Condizione falsa → si prende quello dopo i due punti.' },
      { h:'Quanto fa b % a, cioè 8 % 3?', type:'text', ans:['2'], ok:'Giusto: 8 = 3 · 2 + 2.', bad:'Il resto: 8 diviso 3 fa 2 con resto…' },
      { h:'La condizione 8 % 3 == 2 è vera. Cosa stampa la seconda printf?', type:'text', ans:['30'], ok:'Perfetto: a = a * 10 = 30.', bad:'Condizione vera → si prende quello prima dei due punti: a * 10.' }
    ], done:'<b>Fatto!</b> Stampa <code>8</code> e poi <code>30</code>, su due righe.' },
  ex:[
    { id:'e1', type:'out', q:'Cosa stampa?'+code(String.raw`
int x = 10, y = 4;
float f;
f = x / y;
printf("%d %d %.2f\n", x / y, x % y, f);
f = x / (float) y;
printf("%.2f\n", f);`), a:'2 2 2.00\n2.50', hint:'x / y è tra due int. Il cast (float) y cambia tutto.', sol:'<pre class="code">2 2 2.00\n2.50</pre>10 / 4 = 2 (intera), 10 % 4 = 2, f = 2.00 perché la divisione era intera. Col cast: 10 / 4.0 = 2.50.' },
    { id:'e2', type:'out', q:'Cosa stampa?'+code(String.raw`
int i = 5, j;
j = i++ * 2;
printf("%d %d\n", i, j);
j = --i * 3;
printf("%d %d\n", i, j);`), a:'6 10\n5 15', hint:'i++ usa 5 e poi i diventa 6. --i prima diminuisce.', sol:'<pre class="code">6 10\n5 15</pre>j = 5 · 2 = 10 e i = 6. Poi --i porta i a 5 e j = 5 · 3 = 15.' },
    { id:'e3', type:'text', q:'Quanto vale <code>17 % 5</code> ?', a:['2'], hint:'17 = 5 · 3 + ?', sol:'17 = 5 · 3 + 2, resto <b>2</b>.' },
    { id:'e4', type:'choice', q:'Come si controlla in C se un intero n è pari?', opts:['n / 2 == 0','n % 2 == 0','n % 2 == 1'], a:1, hint:'Pari = il resto della divisione per 2 è zero.', sol:'<code>if (n % 2 == 0)</code>. Serve spessissimo al PC.' },
    { id:'e5', type:'text', q:'<code>char c = \'g\' - 3;</code> Che carattere c\'è in c?', a:['d',"'d'"], hint:'Tre lettere prima della g.', sol:'g, f, e, <b>d</b>. È lo stesso trucco del tema del 9 feb 2026 (source[i] − max).' }
  ],
  quaderno:[
    '<b>int / int</b> butta la parte decimale. Per avere la virgola: almeno un numero float, oppure cast <code>(float)</code>.',
    '<b>%</b> = resto. Pari: <code>n % 2 == 0</code>. Ultima cifra: <code>n % 10</code>.',
    '<b>a++</b> usa e poi aumenta; <b>++a</b> aumenta e poi usa.',
    '<b>c ? A : B</b> = se c è vero A, altrimenti B. Vero = diverso da 0.',
    '<b>char</b> = numero: <code>\'a\' + 1</code> è <code>\'b\'</code>.'
  ]
});

/* ================= 4 · INPUT, IF, CICLI ================= */
CH.push({
  id:'cicli', n:4, short:'Input-output, if e cicli', when:'piano del 18/11 · slide 06a-07c · esercitazioni 05 e 06a',
  title:'Leggere da tastiera, decidere con if, ripetere con i cicli',
  serve:'<p class="big">Ogni funzione che scriverai all\'esame ha un ciclo dentro: scorrere un array, leggere un file riga per riga, contare quante volte compare un valore. Qui impari i tre cicli del C e come leggere un numero con <code>scanf</code>.</p>',
  exam:'nel tema scritto del 9 feb 2026 la funzione iterativa <code>conta</code> è un ciclo while. Al PC tutte le letture da file sono cicli. Nello scritto le tracce "cosa stampa" hanno quasi sempre un ciclo da seguire a mano.',
  idea:{ title:'Il giro di pista', html:
    '<p>Un ciclo è un corridore che fa giri di pista. Prima di ogni giro controlla un cartello (la <b>condizione</b>): se c\'è scritto "continua" fa un altro giro, se c\'è scritto "stop" si ferma.</p>'
   +'<p><code>for (i = 1; i &lt;= n; i++)</code> si legge: "parto con i = 1; <b>prima di ogni giro</b> controllo che i &lt;= n; <b>alla fine di ogni giro</b> aumento i di 1".</p>'
   +'<div class="note"><code>while (condizione) { ... }</code> controlla <b>prima</b> del giro: può fare zero giri.<br><code>do { ... } while (condizione);</code> controlla <b>dopo</b> il giro: fa sempre almeno un giro.</div>' },
  widgets:[
    { type:'tracer', title:'Somma da 1 a n (scrivi 4 da tastiera)', intro:'Supponiamo che quando il programma chiede il numero tu scriva <b>4</b> e premi invio.',
      code:String.raw`
#include <stdio.h>
#define MAX 100

int main(void) {
    int n, i, somma = 0;
    printf("Quanti numeri? ");
    scanf("%d", &n);
    for (i = 1; i <= n; i++) {
        somma = somma + i;
    }
    if (somma > MAX)
        printf("Troppo grande\n");
    else
        printf("Somma = %d\n", somma);
    return 0;
}`,
      steps:[
        { l:2, say:'<code>#define MAX 100</code> è un\'istruzione del <b>preprocessore</b>: prima di compilare, ogni MAX nel file viene sostituito con 100. Non è una variabile.' },
        { l:5, v:{n:'???',i:'???',somma:'0'}, say:'Tre interi. Solo somma parte da 0: è un <b>accumulatore</b>, deve partire da 0 sennò la somma parte da un numero a caso.' },
        { l:6, v:{n:'???',i:'???',somma:'0'}, out:'Quanti numeri? ', say:'Stampa la domanda (senza \\n, quindi il cursore resta sulla stessa riga).' },
        { l:7, v:{n:'4',i:'???',somma:'0'}, out:'Quanti numeri? 4\n', say:'<code>scanf("%d", &amp;n)</code> aspetta che tu scriva un intero e lo mette in n. La <b>&amp;</b> davanti a n è obbligatoria: vuol dire "l\'indirizzo di n", cioè "mettilo lì dentro". Il 4 che vedi l\'hai scritto tu.' },
        { l:8, v:{n:'4',i:'1',somma:'0'}, out:'Quanti numeri? 4\n', say:'Inizio del for: i = 1. Controllo 1 &lt;= 4: vero, entro.' },
        { l:9, v:{n:'4',i:'1',somma:'1'}, out:'Quanti numeri? 4\n', say:'Giro 1: somma = 0 + 1 = 1.' },
        { l:8, v:{n:'4',i:'2',somma:'1'}, out:'Quanti numeri? 4\n', say:'Fine giro: i++ porta i a 2. Controllo 2 &lt;= 4: vero.' },
        { l:9, v:{n:'4',i:'2',somma:'3'}, out:'Quanti numeri? 4\n', say:'Giro 2: somma = 1 + 2 = 3.' },
        { l:8, v:{n:'4',i:'3',somma:'3'}, out:'Quanti numeri? 4\n', say:'i = 3. 3 &lt;= 4: vero.' },
        { l:9, v:{n:'4',i:'3',somma:'6'}, out:'Quanti numeri? 4\n', say:'Giro 3: somma = 3 + 3 = 6.' },
        { l:8, v:{n:'4',i:'4',somma:'6'}, out:'Quanti numeri? 4\n', say:'i = 4. 4 &lt;= 4: vero (minore <b>o uguale</b>).' },
        { l:9, v:{n:'4',i:'4',somma:'10'}, out:'Quanti numeri? 4\n', say:'Giro 4: somma = 6 + 4 = 10.' },
        { l:8, v:{n:'4',i:'5',somma:'10'}, out:'Quanti numeri? 4\n', say:'i = 5. 5 &lt;= 4: <b>falso</b>, esco dal ciclo. Nota: dopo il ciclo i vale 5, non 4.' },
        { l:11, v:{n:'4',i:'5',somma:'10'}, out:'Quanti numeri? 4\n', say:'10 &gt; 100? Falso, quindi salto la riga 12 e vado all\'else.' },
        { l:14, v:{n:'4',i:'5',somma:'10'}, out:'Quanti numeri? 4\nSomma = 10\n', say:'Stampa la somma.' },
        { l:15, v:{n:'4',i:'5',somma:'10'}, out:'Quanti numeri? 4\nSomma = 10\n', say:'Fine.' }
      ] }
  ],
  why:[
    { easy:true, f:'scanf vuole la & davanti alla variabile', t:'scanf deve <b>scrivere</b> dentro la tua variabile, quindi le serve sapere dove si trova in memoria (il suo indirizzo). printf invece deve solo leggere il valore, quindi niente &amp;. Lo capirai meglio nel capitolo dei puntatori.' },
    { easy:true, f:'Dopo for (i = 1; i &lt;= n; i++) la variabile i vale n + 1', t:'Il ciclo si ferma proprio quando la condizione diventa falsa, cioè quando i ha superato n.' },
    { easy:true, f:'= assegna, == confronta', t:'<code>if (x = 0)</code> mette 0 in x e poi controlla 0, che è falso: non entra mai. Il confronto si scrive <code>if (x == 0)</code>. gcc -Wall ti avvisa.' },
    { easy:false, f:'scanf restituisce quanti valori è riuscito a leggere', t:'Serve per i file (capitolo 11): <code>while (fscanf(f, "%d", &amp;x) == 1)</code> vuol dire "finché riesco a leggere un numero". Segnatela.' }
  ],
  warn:{ title:'Il punto e virgola dopo il for', html:'<p><code>for (i = 0; i &lt; 10; i++);</code> con il <b>;</b> alla fine fa 10 giri <b>vuoti</b>, e il blocco tra graffe sotto viene eseguito una volta sola. Errore classico, difficile da vedere.</p>' },
  guided:{ title:'Quante volte gira?', intro:code(String.raw`
int i, n = 0;
for (i = 10; i > 0; i = i - 3) {
    if (i % 2 == 0)
        n++;
}
printf("%d %d\n", i, n);`), steps:[
      { h:'Scrivi i valori che prende i dentro il ciclo, separati da virgola', type:'text', ans:['10,7,4,1'], ok:'Giusto: dopo 1 viene −2, che non è &gt; 0.', bad:'Parti da 10 e togli 3 ogni volta, finché i &gt; 0.' },
      { h:'Quali di questi sono pari? Quindi quanto vale n alla fine?', type:'text', ans:['2'], ok:'Sì: 10 e 4 sono pari, n = 2.', bad:'Pari: resto della divisione per 2 uguale a 0.' },
      { h:'E quanto vale i quando esce dal ciclo?', type:'text', ans:['-2','−2'], ok:'Perfetto: 1 − 3 = −2, e −2 &gt; 0 è falso.', bad:'L\'ultimo i dentro il ciclo è 1. Poi si fa ancora i = i − 3.' }
    ], done:'<b>Fatto!</b> Stampa <code>-2 2</code>.' },
  ex:[
    { id:'e1', type:'out', q:'Cosa stampa?'+code(String.raw`
int i = 1, p = 1;
while (i < 5) {
    p = p * 2;
    i = i + 2;
}
printf("%d %d\n", i, p);`), a:'5 4', hint:'Fai una tabellina con i e p a ogni giro.', sol:'<pre class="code">5 4</pre>Giro 1: p = 2, i = 3. Giro 2: p = 4, i = 5. 5 &lt; 5 è falso, esco.' },
    { id:'e2', type:'out', q:'Cosa stampa? (attento al tipo di ciclo)'+code(String.raw`
int k = 10;
do {
    printf("%d ", k);
    k = k - 4;
} while (k > 10);
printf("\nfine %d\n", k);`), a:'10\nfine 6', hint:'do-while fa sempre almeno un giro, e controlla dopo.', sol:'<pre class="code">10 \nfine 6</pre>Stampa 10, k diventa 6, 6 &gt; 10 è falso: esce. Un while normale non avrebbe fatto nessun giro.' },
    { id:'e3', type:'choice', q:'Quale riga legge correttamente un intero in <code>int eta;</code> ?', opts:['scanf("%d", eta);','scanf("%d", &amp;eta);','scanf(&amp;eta);','printf("%d", &amp;eta);'], a:1, hint:'Ricordati della &amp;.', sol:'<code>scanf("%d", &amp;eta);</code>' },
    { id:'e4', type:'text', q:'Quante volte gira <code>for (i = 0; i &lt; 10; i = i + 3)</code> ?', a:['4'], hint:'i vale 0, 3, …', sol:'i = 0, 3, 6, 9: <b>4</b> giri. Con 12 si ferma.' },
    { id:'e5', type:'code', tag:'al PC', q:'Scrivi un programma che legge numeri interi da tastiera finché l\'utente scrive 0, e alla fine stampa quanti numeri <b>positivi</b> ha scritto (lo 0 non conta).', hint:'Ti serve un contatore che parte da 0 e un ciclo while (oppure do-while) che legge con scanf e si ferma quando il numero è 0.', sol:code(String.raw`
#include <stdio.h>

int main(void) {
    int x, positivi = 0;
    printf("Scrivi numeri (0 per finire): ");
    scanf("%d", &x);
    while (x != 0) {
        if (x > 0)
            positivi++;
        scanf("%d", &x);
    }
    printf("Positivi: %d\n", positivi);
    return 0;
}`)+'<p>Schema da ricordare: <b>leggo una volta prima del ciclo, poi in fondo a ogni giro</b>. Così il controllo <code>x != 0</code> vede sempre il numero appena letto.</p>' }
  ],
  quaderno:[
    '<b>scanf</b>: <code>scanf("%d", &amp;n);</code> sempre con la &amp; (tranne le stringhe, capitolo 9).',
    '<b>for</b>: inizio; condizione controllata prima di ogni giro; aggiornamento alla fine di ogni giro.',
    '<b>while</b> può fare 0 giri, <b>do-while</b> almeno 1.',
    '<b>Accumulatore</b> (somma, contatore) parte da 0; <b>prodotto</b> parte da 1.',
    '<b>Schema "leggi finché"</b>: leggo prima del ciclo, ciclo con la condizione, rileggo in fondo al giro.',
    '<b>= assegna, == confronta.</b> Niente ; dopo for(...) e while(...).'
  ]
});
