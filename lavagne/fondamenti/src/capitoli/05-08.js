/* Capitoli 5-8: funzioni, ricorsione, puntatori, progetti su più file. Programmi verificati con gcc -Wall. */

/* ================= 5 · FUNZIONI ================= */
CH.push({
  id:'funzioni', n:5, short:'Funzioni', when:'piano del 21/11 · slide Modulo 1 08',
  title:'Funzioni: dare un nome a un pezzo di programma',
  serve:'<p class="big">L\'esame è fatto <b>solo</b> di funzioni: lo scritto ti chiede di scrivere <code>list almenoDue(list matr, list esami)</code>, la prova al PC ti chiede <code>leggi_prodotti</code>, <code>valore_ordine</code>, ecc. Qui impari come si scrive una funzione, come riceve i dati e come restituisce il risultato.</p>',
  exam:'il testo ti dà sempre la <b>firma</b> (es. <code>int conta(int id, list esami);</code>) e tu scrivi il corpo. Se cambi la firma perdi punti: tipo restituito, nome e parametri vanno copiati esattamente.',
  idea:{ title:'La macchinetta del caffè', html:
    '<p>Una funzione è una macchinetta: metti dentro qualcosa (i <b>parametri</b>), lei lavora, e ti restituisce un risultato (il <b>valore di ritorno</b>).</p>'
   +code(String.raw`int quadrato(int x)`)
   +'<p>Si legge: "la funzione <code>quadrato</code> riceve un int che dentro chiamerà <code>x</code>, e restituisce un <code>int</code>". Se una funzione non restituisce niente, al posto del tipo si scrive <code>void</code>.</p>'
   +'<div class="note"><b>Regola d\'oro (passaggio per valore):</b> la funzione riceve una <b>copia</b> del valore. Se dentro la funzione cambi x, la variabile originale del main non cambia.</div>' },
  widgets:[
    { type:'tracer', title:'Chiamare una funzione', intro:'Guarda la memoria: quando si chiama <code>quadrato</code> compare un nuovo riquadro con le sue variabili, e quando finisce sparisce.',
      code:String.raw`
#include <stdio.h>

int quadrato(int x);

int main(void) {
    int a = 3, r;
    r = quadrato(a + 1);
    printf("%d %d\n", a, r);
    return 0;
}

int quadrato(int x) {
    int q;
    q = x * x;
    x = 0;
    return q;
}`,
      steps:[
        { l:3, say:'Questo è il <b>prototipo</b>: dice al compilatore "più avanti esiste una funzione quadrato che riceve un int e restituisce un int". Serve perché main la usa prima che sia scritta.' },
        { l:6, f:[['main',{a:'3',r:'???'}]], say:'Nel main: a = 3, r ancora senza valore.' },
        { l:7, f:[['main',{a:'3',r:'???'}]], say:'Prima si calcola l\'argomento: a + 1 = 4. Poi si chiama quadrato passando il <b>valore</b> 4.' },
        { l:13, f:[['main',{a:'3',r:'???'}],['quadrato',{x:'4'}]], say:'Si entra in quadrato. Nasce un riquadro nuovo con il parametro x = 4 (una copia del valore, non a).' },
        { l:14, f:[['main',{a:'3',r:'???'}],['quadrato',{x:'4',q:'???'}]], say:'Variabile locale q: esiste solo dentro quadrato.' },
        { l:15, f:[['main',{a:'3',r:'???'}],['quadrato',{x:'4',q:'16'}]], say:'q = 4 · 4 = 16.' },
        { l:16, f:[['main',{a:'3',r:'???'}],['quadrato',{x:'0',q:'16'}]], say:'x = 0 cambia solo la copia. La a del main resta 3.' },
        { l:17, f:[['main',{a:'3',r:'???'}],['quadrato',{x:'0',q:'16'}]], say:'<code>return q;</code> restituisce 16 a chi ha chiamato e chiude la funzione.' },
        { l:7, f:[['main',{a:'3',r:'16'}]], say:'Il riquadro di quadrato è sparito (con x e q). Il 16 restituito va in r.' },
        { l:8, f:[['main',{a:'3',r:'16'}]], out:'3 16\n', say:'Stampa 3 e 16: a non è cambiata.' }
      ] }
  ],
  why:[
    { easy:true, f:'Passaggio per valore: la funzione lavora su una copia', t:'Al momento della chiamata il valore viene copiato nel parametro. Sono due variabili diverse, in due riquadri diversi della memoria.' },
    { easy:true, f:'Il prototipo va prima del main (o nel file .h)', t:'Il compilatore legge il file dall\'alto in basso. Se trova una chiamata a una funzione che non conosce ancora, non sa che tipi usa e dà un warning ("implicit declaration").' },
    { easy:true, f:'return esce subito dalla funzione', t:'Le righe dopo un return eseguito non vengono più lette. Per questo <code>if (x &gt; y) return x; else return y;</code> funziona.' },
    { easy:true, f:'Le variabili locali spariscono quando la funzione finisce', t:'Il riquadro della funzione viene buttato via al return. Per questo non si restituisce mai l\'indirizzo di una variabile locale (lo rivedrai coi puntatori).' }
  ],
  guided:{ title:'Due funzioni insieme', intro:code(String.raw`
int massimo(int x, int y) {
    if (x > y) return x;
    else return y;
}
void stampa_riga(int n) {
    int i;
    for (i = 0; i < n; i++) printf("*");
    printf("\n");
}
int main(void) {
    int a = 4, b = 9;
    stampa_riga(massimo(a, b) - a);
    printf("%d\n", massimo(a * 3, b));
    return 0;
}`), steps:[
      { h:'Quanto restituisce massimo(4, 9)?', type:'text', ans:['9'], ok:'Sì.', bad:'Il più grande tra 4 e 9.' },
      { h:'Quindi stampa_riga riceve 9 − 4. Quanti asterischi stampa?', type:'text', ans:['5'], ok:'Giusto: 5 asterischi e poi a capo.', bad:'9 − 4 = ?' },
      { h:'Seconda riga: massimo(a * 3, b) = massimo(12, 9). Cosa stampa?', type:'text', ans:['12'], ok:'Perfetto.', bad:'a * 3 = 12. Il più grande tra 12 e 9.' }
    ], done:'<b>Fatto!</b> Tutti i passaggi:<ol class="pass"><li>a = 4, b = 9.</li><li>Riga stampa_riga(massimo(a, b) − a): prima calcolo massimo(4, 9). Dentro: x = 4, y = 9. 4 &gt; 9 falso → else → return y = 9.</li><li>9 − a = 9 − 4 = 5 → chiamo stampa_riga(5).</li><li>Dentro stampa_riga, n = 5: i = 0, 1, 2, 3, 4 (5 giri, poi 5 &lt; 5 è falso) → 5 asterischi, poi \\n → <b>*****</b>.</li><li>Riga printf: a * 3 = 4 * 3 = 12 → massimo(12, 9): 12 &gt; 9 vero → return 12.</li><li>printf("%d\\n", 12) → <b>12</b>.</li></ol>Stampa <code>*****</code> e poi <code>12</code>. Nota: <code>stampa_riga</code> è <code>void</code>, non restituisce niente: la si usa da sola, non dentro un calcolo.' },
  ex:[
    { id:'e1', type:'out', q:'Cosa stampa?'+code(String.raw`
void raddoppia(int n) {
    n = n * 2;
    printf("dentro: %d\n", n);
}
int main(void) {
    int k = 7;
    raddoppia(k);
    printf("fuori: %d\n", k);
    return 0;
}`), a:'dentro: 14\nfuori: 7', hint:'Passaggio per valore: n è una copia di k.', sol:'<pre class="code">dentro: 14\nfuori: 7</pre><ol class="pass"><li>main: k = 7.</li><li>raddoppia(k): si copia il valore 7 nel parametro n. Ora ci sono due variabili: k = 7 (main) e n = 7 (raddoppia).</li><li>n = n * 2 = 7 * 2 = 14. Cambia solo n.</li><li>printf → <b>dentro: 14</b>.</li><li>raddoppia finisce, n sparisce. Nel main k è ancora 7 → <b>fuori: 7</b>.</li></ol>' },
    { id:'e2', type:'choice', q:'Il testo dice: "si realizzi una funzione che riceve un intero e un float e restituisce un float". Quale firma è giusta?', opts:['void f(int a, float b)','float f(int a, float b)','int f(float a, int b)'], a:1, hint:'Il tipo restituito si scrive prima del nome.', sol:'<code>float f(int a, float b)</code>' },
    { id:'e3', type:'choice', q:'Il compilatore dice <code>warning: implicit declaration of function \'media\'</code>. Cosa hai dimenticato?', opts:['Il return','Il prototipo di media prima del main (o l\'#include del suo .h)','Il punto e virgola'], a:1, hint:'"Implicit declaration" = l\'ho usata senza che fosse dichiarata prima.', sol:'Manca il prototipo, oppure l\'#include del file .h dove sta.' },
    { id:'e4', type:'text', q:'<code>int f(int n) { return n % 10 + n / 10; }</code> Quanto restituisce f(47)?', a:['11'], hint:'47 % 10 è l\'ultima cifra, 47 / 10 è la divisione intera.', sol:'<ol class="pass"><li>n = 47.</li><li>47 % 10: 10 · 4 = 40, 47 − 40 = 7 → 7 (l\'ultima cifra).</li><li>47 / 10 tra interi: 4,7 → butto la parte decimale → 4.</li><li>7 + 4 = <b>11</b>.</li></ol>' },
    { id:'e5', type:'code', tag:'al PC', q:'Scrivi una funzione <code>int conta_divisori(int n)</code> che restituisce quanti divisori ha n (per esempio conta_divisori(12) = 6: 1, 2, 3, 4, 6, 12) e un main che la prova con 12 e con 7.', hint:'Ciclo da 1 a n, contatore che aumenta quando n % i == 0.', sol:code(String.raw`
#include <stdio.h>

int conta_divisori(int n) {
    int i, cont = 0;
    for (i = 1; i <= n; i++) {
        if (n % i == 0)
            cont++;
    }
    return cont;
}

int main(void) {
    printf("%d\n", conta_divisori(12));   /* 6 */
    printf("%d\n", conta_divisori(7));    /* 2 */
    return 0;
}`)+'<p>Traccia di conta_divisori(12):</p><ol class="pass"><li>i = 1: 12 % 1 = 0 → cont = 1</li><li>i = 2: 12 % 2 = 0 → cont = 2</li><li>i = 3: 12 % 3 = 0 → cont = 3</li><li>i = 4: 12 % 4 = 0 → cont = 4</li><li>i = 5: 12 % 5 = 2 → no</li><li>i = 6: 12 % 6 = 0 → cont = 5</li><li>i = 7, 8, 9, 10, 11: resti 5, 4, 3, 2, 1 → no</li><li>i = 12: 12 % 12 = 0 → cont = 6</li><li>i = 13: 13 &lt;= 12 falso → esco, return <b>6</b></li></ol><p>Per 7: solo i = 1 e i = 7 danno resto 0 → <b>2</b>.</p>' }
  ],
  quaderno:[
    '<b>Firma:</b> <code>tipo_restituito nome(tipo1 par1, tipo2 par2)</code>. <code>void</code> se non restituisce niente.',
    '<b>Prototipo</b> (la firma con il ;) prima del main, o nel .h.',
    '<b>Passaggio per valore:</b> la funzione riceve copie; cambiarle non cambia le variabili del chiamante.',
    '<b>All\'esame</b> copia la firma del testo esattamente com\'è.'
  ]
});

/* ================= 6 · RICORSIONE ================= */
CH.push({
  id:'ricorsione', n:6, short:'Ricorsione', when:'piano del 25/11 · slide 09a-09b · esercitazione 06',
  title:'Ricorsione e record di attivazione',
  serve:'<p class="big">L\'esercizio 1 dello scritto (<b>6 punti</b>) chiede <b>sempre</b> una funzione RICORSIVA sulle liste. L\'esercizio 2 a volte chiede di seguire a mano una funzione ricorsiva, e la domanda di teoria del 9 feb 2026 e del 23 gen 2025 era il <b>record di attivazione</b>. Qui ci sono metà dei punti dello scritto.</p>',
  exam:'"Si consideri la seguente funzione ricorsiva… si indichi la sequenza delle chiamate e il valore restituito" (2 punti) e "Si illustri il concetto di record di attivazione" (1 punto).',
  idea:{ title:'La matrioska', html:
    '<p>Una funzione ricorsiva <b>chiama se stessa</b> su un problema più piccolo. Come una matrioska: per aprire quella grande, apri quella dentro, e così via, finché trovi la più piccola che non si apre (il <b>caso base</b>).</p>'
   +'<p>fatt(3) = 3 · fatt(2) = 3 · 2 · fatt(1) = 3 · 2 · 1 = 6.</p>'
   +'<div class="note">Ogni funzione ricorsiva ha due parti:<br>1) il <b>caso base</b>: un caso così semplice che la risposta si sa subito, senza richiamarsi;<br>2) il <b>passo ricorsivo</b>: richiamo la funzione su un problema <b>più piccolo</b>, e uso il suo risultato.</div>' },
  widgets:[
    { type:'tracer', title:'fatt(3): la pila dei record di attivazione', intro:'Ogni chiamata crea un nuovo riquadro (record di attivazione) sopra gli altri. Il riquadro con il bordo blu è quello attivo. Quando una chiamata finisce, il suo riquadro sparisce e si torna a quello sotto.',
      code:String.raw`
#include <stdio.h>

int fatt(int n) {
    if (n <= 1)
        return 1;
    return n * fatt(n - 1);
}

int main(void) {
    int r = fatt(3);
    printf("%d\n", r);
    return 0;
}`,
      steps:[
        { l:10, f:[['main',{r:'???'}]], say:'main chiama fatt(3). r aspetta il risultato.' },
        { l:4, f:[['main',{r:'???'}],['fatt(3)',{n:'3'}]], say:'Nuovo record di attivazione per fatt con n = 3. Controllo: 3 &lt;= 1? No.' },
        { l:6, f:[['main',{r:'???'}],['fatt(3)',{n:'3'}]], say:'Deve calcolare 3 · fatt(2). Non può finire finché fatt(2) non risponde: <b>resta in attesa</b>.' },
        { l:4, f:[['main',{r:'???'}],['fatt(3)',{n:'3'}],['fatt(2)',{n:'2'}]], say:'Nuovo record sopra: fatt con n = 2. Ci sono due n diverse in memoria, una per chiamata. 2 &lt;= 1? No.' },
        { l:6, f:[['main',{r:'???'}],['fatt(3)',{n:'3'}],['fatt(2)',{n:'2'}]], say:'Deve calcolare 2 · fatt(1). In attesa.' },
        { l:4, f:[['main',{r:'???'}],['fatt(3)',{n:'3'}],['fatt(2)',{n:'2'}],['fatt(1)',{n:'1'}]], say:'fatt con n = 1. 1 &lt;= 1? <b>Sì: caso base.</b>' },
        { l:5, f:[['main',{r:'???'}],['fatt(3)',{n:'3'}],['fatt(2)',{n:'2'}],['fatt(1)',{n:'1'}]], say:'Restituisce 1 senza richiamarsi. Ora la pila si "srotola" all\'indietro.' },
        { l:6, f:[['main',{r:'???'}],['fatt(3)',{n:'3'}],['fatt(2)',{n:'2'}]], say:'fatt(1) è sparita. fatt(2) riceve 1 e calcola 2 · 1 = 2. Restituisce 2.' },
        { l:6, f:[['main',{r:'???'}],['fatt(3)',{n:'3'}]], say:'fatt(3) riceve 2 e calcola 3 · 2 = 6. Restituisce 6.' },
        { l:10, f:[['main',{r:'6'}]], say:'Si torna nel main: r = 6.' },
        { l:11, f:[['main',{r:'6'}]], out:'6\n', say:'Stampa 6.' }
      ] },
    { type:'html', eyebrow:'Risposta pronta per lo scritto (1 punto)', title:'Cos\'è il record di attivazione', html:
      '<div class="exam"><p>Il <b>record di attivazione</b> è l\'area di memoria che viene creata nello <b>stack</b> ogni volta che si chiama una funzione, e distrutta quando la funzione termina.</p>'
     +'<p>Contiene: i <b>parametri</b> (con i valori ricevuti), le <b>variabili locali</b>, l\'<b>indirizzo di ritorno</b> (il punto del chiamante da cui riprendere) e lo spazio per il <b>valore restituito</b>.</p>'
     +'<p>I record si impilano: l\'ultimo creato è il primo distrutto (politica LIFO). Nella ricorsione ogni chiamata ha il suo record, quindi le variabili delle varie chiamate sono indipendenti.</p></div>'
     +'<p>Imparala quasi a parole: le 4 cose contenute e "stack, LIFO" sono quello che il prof vuole leggere.</p>' }
  ],
  why:[
    { easy:true, f:'Serve un caso base, altrimenti la ricorsione non finisce', t:'Senza caso base la funzione si richiama all\'infinito, la pila dei record cresce finché la memoria finisce e il programma si blocca (stack overflow).' },
    { easy:true, f:'La chiamata ricorsiva deve essere su un problema più piccolo', t:'Ogni chiamata deve avvicinarsi al caso base: n − 1 al posto di n, la coda della lista al posto della lista intera.' },
    { easy:true, f:'Le stampe prima della chiamata escono in un ordine, quelle dopo in ordine inverso', t:'Ciò che sta prima della chiamata ricorsiva viene eseguito mentre la pila cresce; ciò che sta dopo, mentre la pila si srotola.' }
  ],
  guided:{ title:'Traccia come all\'esame', intro:code(String.raw`
int f(int a, int b) {
    if (a < b)
        return a;
    return f(a - b, b + 1);
}
/* nel main: printf("%d\n", f(20, 3)); */`), steps:[
      { h:'f(20, 3): 20 &lt; 3 è falso. Con quali valori si richiama? Scrivi f(?, ?)', type:'text', ans:['f(17,4)','17,4'], ok:'Giusto: a − b = 17, b + 1 = 4.', bad:'a − b e b + 1, con a = 20 e b = 3.' },
      { h:'Continua: da f(17, 4) quale chiamata segue?', type:'text', ans:['f(13,5)','13,5'], ok:'Sì.', bad:'17 − 4 e 4 + 1.' },
      { h:'Poi f(8, 6), poi f(2, 7). In f(2, 7) vale 2 &lt; 7: cosa restituisce?', type:'text', ans:['2'], ok:'Perfetto: caso base, restituisce a = 2.', bad:'Se a &lt; b la funzione restituisce a.' },
      { h:'Ogni chiamata restituisce direttamente quello che riceve. Cosa stampa il main?', type:'text', ans:['2'], ok:'Esatto.', bad:'Il valore torna indietro uguale fino al main.' }
    ], done:'<b>Fatto!</b> Tutti i passaggi:<ol class="pass"><li>f(20, 3): 20 &lt; 3 falso → f(20 − 3, 3 + 1) = f(17, 4)</li><li>f(17, 4): 17 &lt; 4 falso → f(17 − 4, 4 + 1) = f(13, 5)</li><li>f(13, 5): 13 &lt; 5 falso → f(13 − 5, 5 + 1) = f(8, 6)</li><li>f(8, 6): 8 &lt; 6 falso → f(8 − 6, 6 + 1) = f(2, 7)</li><li>f(2, 7): 2 &lt; 7 vero → caso base, return a = 2</li><li>Risalgo: f(8, 6) = 2, f(13, 5) = 2, f(17, 4) = 2, f(20, 3) = 2 (ognuna restituisce quello che riceve)</li><li>main stampa <b>2</b></li></ol>All\'esame scrivi così: f(20,3) → f(17,4) → f(13,5) → f(8,6) → f(2,7) = 2.' },
  ex:[
    { id:'e1', type:'text', q:code(String.raw`
int s(int n) {
    if (n < 10) return n;
    return n % 10 + s(n / 10);
}`)+'Quanto restituisce s(352)?', a:['10'], hint:'352 % 10 = 2 e 352 / 10 = 35. Poi s(35) = 5 + s(3).', sol:'Scendo:<ol class="pass"><li>s(352): 352 &lt; 10 falso → 352 % 10 + s(352 / 10) = 2 + s(35)</li><li>s(35): 35 &lt; 10 falso → 35 % 10 + s(35 / 10) = 5 + s(3)</li><li>s(3): 3 &lt; 10 vero → caso base, return 3</li></ol>Risalgo:<ol class="pass"><li>s(35) = 5 + 3 = 8</li><li>s(352) = 2 + 8 = <b>10</b></li></ol>È la somma delle cifre (3 + 5 + 2).' },
    { id:'e2', type:'out', q:'Cosa stampa? (guarda dove sta la printf)'+code(String.raw`
int g(int n) {
    if (n == 0) return 0;
    printf("%d ", n);
    return g(n - 1) + 1;
}
int main(void) {
    int x = g(3);
    printf("\n%d\n", x);
    return 0;
}`), a:'3 2 1\n3', hint:'La printf è prima della chiamata: stampa mentre la pila cresce. Il valore restituito conta le chiamate.', sol:'<pre class="code">3 2 1 \n3</pre>Scendo (la printf è prima della chiamata):<ol class="pass"><li>g(3): 3 == 0 falso → stampa "3 " → chiama g(2)</li><li>g(2): stampa "2 " → chiama g(1)</li><li>g(1): stampa "1 " → chiama g(0)</li><li>g(0): 0 == 0 → caso base, return 0</li></ol>Risalgo:<ol class="pass"><li>g(1) = g(0) + 1 = 0 + 1 = 1</li><li>g(2) = g(1) + 1 = 1 + 1 = 2</li><li>g(3) = g(2) + 1 = 2 + 1 = 3 → x = 3</li><li>printf("\\n%d\\n", x): va a capo e stampa <b>3</b></li></ol>' },
    { id:'e3', type:'choice', q:'Cosa NON contiene il record di attivazione?', opts:['I parametri della funzione','Le variabili locali','L\'indirizzo di ritorno','Le variabili allocate con malloc'], a:3, hint:'La memoria di malloc sta in un\'altra zona.', sol:'La memoria presa con malloc sta nello <b>heap</b>, non nello stack. Lo vedrai nel capitolo 13.' },
    { id:'e4', type:'choice', q:'<code>int h(int n) { return n + h(n - 1); }</code> Cosa succede chiamando h(3)?', opts:['Restituisce 6','Restituisce 3','Non finisce mai: manca il caso base'], a:2, hint:'Quando si ferma?', sol:'Non c\'è nessun caso base: h(3) → h(2) → h(1) → h(0) → h(−1) → … finché la memoria dello stack finisce.' },
    { id:'e5', type:'code', tag:'su carta', q:'Scrivi una funzione RICORSIVA <code>int potenza(int b, int e)</code> che calcola b elevato a e (e ≥ 0), senza cicli.', hint:'Caso base: b<sup>0</sup> = 1. Passo: b<sup>e</sup> = b · b<sup>e−1</sup>.', sol:code(String.raw`
int potenza(int b, int e) {
    if (e == 0)
        return 1;
    return b * potenza(b, e - 1);
}`)+'<p>Prova con potenza(2, 3). Scendo:</p><ol class="pass"><li>potenza(2, 3): e = 3 ≠ 0 → 2 * potenza(2, 2)</li><li>potenza(2, 2): 2 * potenza(2, 1)</li><li>potenza(2, 1): 2 * potenza(2, 0)</li><li>potenza(2, 0): e == 0 → caso base, return 1</li></ol><p>Risalgo:</p><ol class="pass"><li>potenza(2, 1) = 2 * 1 = 2</li><li>potenza(2, 2) = 2 * 2 = 4</li><li>potenza(2, 3) = 2 * 4 = <b>8</b> = 2³ ✓</li></ol><p>Stesso schema di fatt: caso base, poi "un pezzo" per la chiamata sul problema più piccolo.</p>' }
  ],
  quaderno:[
    '<b>Ricetta ricorsiva:</b> 1) caso base (risposta immediata); 2) chiamata su un problema più piccolo; 3) uso il risultato.',
    '<b>Tracciare:</b> scrivo la catena delle chiamate f(...) → f(...) → … fino al caso base, poi risalgo con i risultati.',
    '<b>Record di attivazione:</b> nello stack, uno per chiamata; contiene parametri, variabili locali, indirizzo di ritorno, valore di ritorno; LIFO.',
    '<b>Stampe:</b> prima della chiamata → ordine di discesa; dopo la chiamata → ordine inverso.'
  ]
});

/* ================= 7 · PUNTATORI ================= */
CH.push({
  id:'puntatori', n:7, short:'Puntatori', when:'piano del 25/11 · slide 10a-10b · esercitazione 07',
  title:'Puntatori e passaggio per riferimento',
  serve:'<p class="big">Servono per due cose che all\'esame escono sempre: far <b>restituire più di un valore</b> a una funzione (al PC: <code>Ordine* leggi_ordini(char* fileName, int* dim)</code>, dove dim è un risultato in più) e capire il "cosa stampa" dello scritto, che è pieno di <code>*</code> e <code>&amp;</code>.</p>',
  exam:'nel tema del 9 feb 2026: <code>shift(msg, &amp;max)</code> con <code>*q = result[i - 1] - \'a\';</code> dentro la funzione. Cambiando *q cambia max nel main. Senza questo capitolo quel punto è perso.',
  idea:{ title:'L\'indirizzo di casa', html:
    '<p>Ogni variabile abita in una casella della memoria, e ogni casella ha un <b>indirizzo</b> (un numero), come una casa ha un indirizzo.</p>'
   +'<p><code>&amp;a</code> = "l\'indirizzo di a". Un <b>puntatore</b> è una variabile che contiene un indirizzo: <code>int *p = &amp;a;</code> si legge "p è un puntatore a int, e contiene l\'indirizzo di a".</p>'
   +'<p><code>*p</code> = "vai all\'indirizzo scritto in p e guarda (o cambia) cosa c\'è". Quindi <code>*p = 5;</code> mette 5 dentro a, passando per l\'indirizzo.</p>'
   +'<div class="note">Se do a una funzione l\'<b>indirizzo</b> di una variabile, la funzione può andare fin lì e cambiarla. È il <b>passaggio per riferimento</b> (in C si fa con i puntatori).</div>' },
  widgets:[
    { type:'tracer', title:'Scambiare due variabili', intro:'Gli indirizzi (1000, 1004) sono inventati, ma l\'idea è questa. Guarda come la funzione cambia a e b del main.',
      code:String.raw`
#include <stdio.h>

void scambia(int *p, int *q) {
    int t;
    t = *p;
    *p = *q;
    *q = t;
}

int main(void) {
    int a = 1, b = 2;
    int *pa = &a;
    *pa = 5;
    scambia(&a, &b);
    printf("%d %d\n", a, b);
    return 0;
}`,
      steps:[
        { l:11, f:[['main',{'a @1000':'1','b @1004':'2'}]], say:'a abita all\'indirizzo 1000 e vale 1; b abita al 1004 e vale 2.' },
        { l:12, f:[['main',{'a @1000':'1','b @1004':'2','pa':'1000 (punta ad a)'}]], say:'pa è un puntatore a int. Dentro c\'è <b>1000</b>, l\'indirizzo di a.' },
        { l:13, f:[['main',{'a @1000':'5','b @1004':'2','pa':'1000 (punta ad a)'}]], say:'<code>*pa = 5</code>: vado all\'indirizzo scritto in pa (1000) e ci metto 5. Quindi a diventa 5, senza nominarla.' },
        { l:14, f:[['main',{'a @1000':'5','b @1004':'2','pa':'1000 (punta ad a)'}]], say:'Chiamo scambia passando gli <b>indirizzi</b> di a e b, non i valori.' },
        { l:4, f:[['main',{'a @1000':'5','b @1004':'2','pa':'1000 (punta ad a)'}],['scambia',{'p':'1000 (punta ad a)','q':'1004 (punta a b)','t':'???'}]], say:'Dentro scambia: p contiene 1000, q contiene 1004.' },
        { l:5, f:[['main',{'a @1000':'5','b @1004':'2','pa':'1000 (punta ad a)'}],['scambia',{'p':'1000 (punta ad a)','q':'1004 (punta a b)','t':'5'}]], say:'t = *p: il valore all\'indirizzo 1000, cioè 5.' },
        { l:6, f:[['main',{'a @1000':'2','b @1004':'2','pa':'1000 (punta ad a)'}],['scambia',{'p':'1000 (punta ad a)','q':'1004 (punta a b)','t':'5'}]], say:'*p = *q: all\'indirizzo 1000 metto il valore che c\'è al 1004 (2). <b>a del main diventa 2.</b>' },
        { l:7, f:[['main',{'a @1000':'2','b @1004':'5','pa':'1000 (punta ad a)'}],['scambia',{'p':'1000 (punta ad a)','q':'1004 (punta a b)','t':'5'}]], say:'*q = t: all\'indirizzo 1004 metto 5. <b>b del main diventa 5.</b>' },
        { l:15, f:[['main',{'a @1000':'2','b @1004':'5','pa':'1000 (punta ad a)'}]], out:'2 5\n', say:'scambia è finita, ma le modifiche restano: erano fatte direttamente su a e b.' }
      ] }
  ],
  why:[
    { easy:true, f:'& prende l\'indirizzo, * va all\'indirizzo', t:'Sono uno l\'opposto dell\'altro: *&amp;a è di nuovo a. Nella dichiarazione <code>int *p</code> l\'asterisco dice solo "p è un puntatore".' },
    { easy:true, f:'Per far cambiare una variabile a una funzione le passo &variabile', t:'La funzione riceve l\'indirizzo (sempre per valore, cioè una copia dell\'indirizzo), ma con l\'indirizzo arriva alla variabile originale.' },
    { easy:true, f:'Per questo scanf vuole la &', t:'scanf deve scrivere dentro la tua variabile: le serve il suo indirizzo.' },
    { easy:true, f:'Una funzione può "restituire" più valori con parametri puntatore', t:'Esempio: <code>void dividi(int a, int b, int *q, int *r)</code> scrive quoziente e resto in due variabili del chiamante. Al PC: <code>int *dim</code> per restituire la lunghezza di un vettore.' },
    { easy:false, f:'Gli indirizzi veri sono numeri lunghi in esadecimale (es. 0x7ffd5e8c)', t:'Non serve saperli leggere: all\'esame conta solo "p punta ad a".' }
  ],
  warn:{ title:'Non restituire l\'indirizzo di una variabile locale', html:'<p><code>int *f(void) { int x = 3; return &amp;x; }</code> è sbagliato: quando f finisce il suo record di attivazione sparisce e x con lui. Il puntatore restituito punta a memoria non più valida. Se ti serve memoria che sopravvive alla funzione, si usa malloc (capitolo 13).</p>' },
  guided:{ title:'Valore o indirizzo?', intro:code(String.raw`
void f(int x, int *y) {
    x = x + 1;
    *y = *y + x;
}
int main(void) {
    int a = 2, b = 10;
    int *p = &b;
    f(a, &b);
    printf("%d %d %d\n", a, b, *p);
    *p = *p * 2;
    printf("%d\n", b);
    return 0;
}`), steps:[
      { h:'Dentro f, x è una copia di a. Quanto vale x dopo x = x + 1?', type:'text', ans:['3'], ok:'Sì, ma a nel main resta 2.', bad:'x parte da 2.' },
      { h:'*y = *y + x: y punta a b (che vale 10). Quanto diventa b?', type:'text', ans:['13'], ok:'Giusto: 10 + 3.', bad:'*y è b. b + x = 10 + 3.' },
      { h:'p punta a b. Cosa stampa la prima printf?', type:'text', ans:['2 13 13','2,13,13'], ok:'Perfetto: *p è b.', bad:'a è rimasta 2; b = 13; *p è il valore di b.' },
      { h:'*p = *p * 2 cambia b. Cosa stampa la seconda printf?', type:'text', ans:['26'], ok:'Esatto.', bad:'b = 13 · 2.' }
    ], done:'<b>Fatto!</b> Tutti i passaggi:<ol class="pass"><li>main: a = 2, b = 10, p = &amp;b (p punta a b).</li><li>f(a, &amp;b): x riceve una copia di a → x = 2; y riceve l\'indirizzo di b → y punta a b.</li><li>x = x + 1 = 2 + 1 = 3. Cambia solo la copia: a resta 2.</li><li>*y = *y + x: *y è b = 10 → b = 10 + 3 = 13.</li><li>f finisce. Prima printf: a = 2, b = 13, *p = valore di b = 13 → <b>2 13 13</b>.</li><li>*p = *p * 2: *p è b → b = 13 * 2 = 26.</li><li>Seconda printf → <b>26</b>.</li></ol>Stampa <code>2 13 13</code> e poi <code>26</code>. Il parametro senza * non tocca il main; quello con * sì.' },
  ex:[
    { id:'e1', type:'choice', q:'<code>int a = 7; int *p = &amp;a;</code> Cosa vale <code>*p</code>?', opts:['L\'indirizzo di a','7','L\'indirizzo di p'], a:1, hint:'* = vai all\'indirizzo e guarda.', sol:'*p è il valore all\'indirizzo contenuto in p, cioè a = 7.' },
    { id:'e2', type:'choice', q:'Vuoi una funzione che azzera una variabile int del chiamante. Quale firma e quale chiamata?', opts:['void azzera(int x) chiamata con azzera(n)','void azzera(int *x) chiamata con azzera(&amp;n), e dentro *x = 0','void azzera(int *x) chiamata con azzera(n)'], a:1, hint:'Deve ricevere l\'indirizzo.', sol:'<code>void azzera(int *x) { *x = 0; }</code> e <code>azzera(&amp;n);</code>' },
    { id:'e3', type:'out', q:'Cosa stampa?'+code(String.raw`
int a = 4, b = 6;
int *p = &a, *q = &b;
*p = *q + 1;
q = p;
*q = *q * 10;
printf("%d %d\n", a, b);`), a:'70 6', hint:'Attento a q = p: ora anche q punta ad a.', sol:'<pre class="code">70 6</pre><ol class="pass"><li>a = 4, b = 6. p punta ad a, q punta a b.</li><li>*p = *q + 1: *q è b = 6 → 6 + 1 = 7 → lo metto dove punta p, cioè in a → a = 7.</li><li>q = p: copio l\'indirizzo. Ora anche q punta ad a (non più a b).</li><li>*q = *q * 10: *q è a = 7 → 7 * 10 = 70 → a = 70.</li><li>b non è mai stata toccata: b = 6.</li><li>printf → <b>70 6</b>.</li></ol>' },
    { id:'e4', type:'code', tag:'al PC', q:'Scrivi <code>void dividi(int a, int b, int *q, int *r)</code> che mette in *q il quoziente intero e in *r il resto di a diviso b, e un main che la prova con 17 e 5 (deve stampare <code>3 2</code>).', hint:'*q = a / b; *r = a % b; nel main due variabili e la chiamata con &amp;.', sol:code(String.raw`
#include <stdio.h>

void dividi(int a, int b, int *q, int *r) {
    *q = a / b;
    *r = a % b;
}

int main(void) {
    int q, r;
    dividi(17, 5, &q, &r);
    printf("%d %d\n", q, r);
    return 0;
}`)+'<ol class="pass"><li>main chiama dividi(17, 5, &amp;q, &amp;r): a = 17, b = 5, il parametro q punta alla q del main, r alla r del main.</li><li>*q = a / b = 17 / 5: 5 · 3 = 15 ≤ 17, 5 · 4 = 20 &gt; 17 → 3. La q del main diventa 3.</li><li>*r = a % b = 17 − 15 = 2. La r del main diventa 2.</li><li>printf → <b>3 2</b>.</li></ol>' }
  ],
  quaderno:[
    '<b>&amp;a</b> = indirizzo di a. <b>int *p</b> = p è un puntatore a int. <b>*p</b> = il valore all\'indirizzo in p.',
    '<b>Modificare una variabile del chiamante:</b> parametro <code>tipo *x</code>, dentro <code>*x = ...</code>, chiamata con <code>&amp;variabile</code>.',
    '<b>Più risultati:</b> uno con return, gli altri con parametri puntatore (es. <code>int *dim</code>).',
    '<b>Mai</b> restituire l\'indirizzo di una variabile locale.'
  ]
});

/* ================= 8 · PIÙ FILE ================= */
CH.push({
  id:'piu-file', n:8, short:'Progetti su più file', when:'piano del 28/11 · slide 11a-11b',
  title:'Progetti su più file: .h e .c',
  serve:'<p class="big">La prova al PC si consegna <b>sempre</b> divisa in più file: <code>element.h</code>, <code>list.h</code> / <code>list.c</code>, un modulo tuo (es. <code>shop.h</code> / <code>shop.c</code>) e <code>main.c</code>. Se l\'organizzazione è sbagliata il progetto non compila, e un progetto che non compila vale pochissimo.</p>',
  exam:'il testo scrive già i nomi dei moduli: "Esercizio 1 – Strutture dati e funzioni di lettura (mod. element.h e shop.h/.c)".',
  idea:{ title:'Il menù e la cucina', html:
    '<p>Il file <b>.h</b> (header) è il <b>menù</b>: dice quali funzioni esistono e cosa ricevono/restituiscono (i prototipi), e definisce i tipi (struct, typedef). Non c\'è il codice delle funzioni.</p>'
   +'<p>Il file <b>.c</b> con lo stesso nome è la <b>cucina</b>: contiene il codice vero di quelle funzioni.</p>'
   +'<p>Chi vuole usare le funzioni (per esempio main.c) legge solo il menù: scrive <code>#include "matematica.h"</code>.</p>'
   +'<div class="note"><code>#include &lt;stdio.h&gt;</code> con le parentesi angolari = libreria di sistema.<br><code>#include "matematica.h"</code> con le virgolette = file tuo, nella cartella del progetto.</div>' },
  widgets:[
    { type:'html', eyebrow:'Un progetto completo', title:'Tre file che lavorano insieme', html:
      '<p><b>matematica.h</b> (il menù)</p>'+code(String.raw`
#ifndef MATEMATICA_H
#define MATEMATICA_H

int quadrato(int x);
int massimo(int a, int b);

#endif`)
     +'<p><b>matematica.c</b> (la cucina)</p>'+code(String.raw`
#include "matematica.h"

int quadrato(int x) {
    return x * x;
}

int massimo(int a, int b) {
    return (a > b) ? a : b;
}`)
     +'<p><b>main.c</b> (chi usa)</p>'+code(String.raw`
#include <stdio.h>
#include "matematica.h"

int main(void) {
    printf("%d\n", massimo(quadrato(3), 5));   /* stampa 9 */
    return 0;
}`)
     +'<p>Come si arriva a 9: quadrato(3) = 3 * 3 = 9; massimo(9, 5): 9 &gt; 5 vero → 9; printf stampa 9.</p>'
     +'<p>Si compilano <b>tutti i .c insieme</b> (i .h no, vengono inclusi):</p>'+code(String.raw`gcc -Wall -o prog main.c matematica.c`)
     +'<p>In Code::Blocks o Visual Studio: tutti i file devono essere aggiunti al <b>progetto</b>, poi Rebuild All.</p>' },
    { type:'html', eyebrow:'Quando non compila', title:'I tre errori tipici e cosa vogliono dire', html:
      '<div class="scroll"><table class="t"><tr><th>Messaggio</th><th>Cosa vuol dire</th><th>Come si risolve</th></tr>'
     +'<tr><td><code>implicit declaration of function \'quadrato\'</code></td><td>Usi una funzione che il compilatore non ha visto dichiarata</td><td>Manca <code>#include "matematica.h"</code> in quel file</td></tr>'
     +'<tr><td><code>undefined reference to \'quadrato\'</code></td><td>Il prototipo c\'è, ma il codice della funzione non si trova</td><td>Non hai compilato matematica.c insieme (o non è nel progetto), oppure il nome nel .c è diverso</td></tr>'
     +'<tr><td><code>redefinition of \'struct prodotto\'</code></td><td>Lo stesso .h è stato incluso due volte</td><td>Mancano le guardie <code>#ifndef … #define … #endif</code></td></tr></table></div>' }
  ],
  why:[
    { easy:true, f:'Le guardie #ifndef NOME_H / #define NOME_H / #endif', t:'La prima volta che il file viene incluso, NOME_H non è definito: il contenuto passa e NOME_H viene definito. La seconda volta NOME_H esiste già e il contenuto viene saltato. Così niente doppioni. (<code>#pragma once</code>, che trovi in list.h, fa la stessa cosa.)' },
    { easy:true, f:'Nel .h solo prototipi e tipi, niente codice delle funzioni', t:'Il .h viene copiato in ogni file che lo include. Se dentro ci fosse il codice di una funzione, quella funzione esisterebbe due volte e il linker si lamenterebbe.' },
    { easy:false, f:'Compilazione in due fasi: compilatore (ogni .c da solo) e linker (unisce tutto)', t:'Basta sapere che "undefined reference" è un errore del linker, cioè manca un .c o una funzione, non un include.' }
  ],
  guided:{ title:'Chi va dove?', steps:[
      { h:'<code>typedef struct { int id; float prezzo; } Prodotto;</code> dove la metti?', type:'choice', opts:['Nel .h, perché è un tipo che usano anche gli altri file','Nel main.c','In tutti i .c, copiata'], ans:0, ok:'Giusto: i tipi condivisi stanno nel .h (all\'esame spesso in element.h).', bad:'Se la copi in più file, il compilatore la vede due volte. Va in un solo posto condiviso.' },
      { h:'Il codice di <code>float valore_ordine(Ordine o, list prodotti) { ... }</code> dove va?', type:'choice', opts:['shop.h','shop.c','main.c'], ans:1, ok:'Sì: il corpo delle funzioni sta nel .c del modulo. In shop.h va solo il prototipo.', bad:'Nel .h vanno solo i prototipi.' },
      { h:'main.c usa valore_ordine. Che riga scrivi in cima a main.c?', type:'text', ans:['#include"shop.h"'], ok:'Perfetto.', bad:'Con le virgolette, ed è il file .h.' }
    ], done:'<b>Fatto!</b> Schema dell\'esame: element.h (tipi) · list.h / list.c (liste, già dati) · shop.h / shop.c (le tue funzioni) · main.c (i test).' },
  ex:[
    { id:'e1', type:'choice', q:'Che cosa scrivi per includere la libreria delle stringhe del sistema?', opts:['#include "string.h"','#include &lt;string.h&gt;','#include string.h'], a:1, hint:'Libreria di sistema = parentesi angolari.', sol:'<code>#include &lt;string.h&gt;</code>' },
    { id:'e2', type:'choice', q:'Compili con <code>gcc -Wall -o prog main.c</code> e ottieni <code>undefined reference to \'massimo\'</code>. Perché?', opts:['Manca l\'include di matematica.h','Non hai messo matematica.c nella compilazione','Manca il return 0'], a:1, hint:'Undefined reference = il codice della funzione non si trova.', sol:'Va compilato anche matematica.c: <code>gcc -Wall -o prog main.c matematica.c</code>.' },
    { id:'e3', type:'choice', q:'A cosa servono #ifndef / #define / #endif in un file .h?', opts:['A rendere il programma più veloce','A evitare che il contenuto del .h venga incluso due volte','A definire le costanti'], a:1, hint:'Pensa a cosa succede se due file includono lo stesso .h.', sol:'Sono le guardie: impediscono le definizioni doppie.' },
    { id:'e4', type:'code', tag:'al PC', q:'Prendi la funzione conta_divisori del capitolo 5 e dividi il programma in tre file: <code>numeri.h</code> (con guardie e prototipo), <code>numeri.c</code> (il codice), <code>main.c</code> (che la usa). Compila con un solo comando gcc.', hint:'Guarda l\'esempio matematica.h / matematica.c / main.c qui sopra.', sol:code(String.raw`
/* numeri.h */
#ifndef NUMERI_H
#define NUMERI_H
int conta_divisori(int n);
#endif

/* numeri.c */
#include "numeri.h"
int conta_divisori(int n) {
    int i, cont = 0;
    for (i = 1; i <= n; i++)
        if (n % i == 0) cont++;
    return cont;
}

/* main.c */
#include <stdio.h>
#include "numeri.h"
int main(void) {
    printf("%d\n", conta_divisori(12));
    return 0;
}`)+'<p>Comando: <code>gcc -Wall -o prog main.c numeri.c</code></p>' }
  ],
  quaderno:[
    '<b>.h</b> = prototipi + tipi (struct, typedef) + guardie. <b>.c</b> = codice delle funzioni, con <code>#include "suo.h"</code>.',
    '<b>Guardie:</b> <code>#ifndef X_H</code> / <code>#define X_H</code> / … / <code>#endif</code>.',
    '<b>&lt;...&gt;</b> sistema, <b>"..."</b> file miei.',
    '<b>Compilare:</b> tutti i .c insieme. In Code::Blocks: tutti i file nel progetto, Rebuild All.',
    '<b>Errori:</b> implicit declaration → manca include; undefined reference → manca un .c; redefinition → mancano le guardie.'
  ]
});
