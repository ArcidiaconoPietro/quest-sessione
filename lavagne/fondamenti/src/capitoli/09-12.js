/* Capitoli 9-12: array e stringhe, struct e matrici, file, liste. Programmi verificati con gcc -Wall. */

/* ================= 9 · ARRAY E STRINGHE ================= */
CH.push({
  id:'array-stringhe', n:9, short:'Array e stringhe', when:'piano del 2/12 · slide 12a-12c · esercitazioni 08 e 09',
  title:'Array e stringhe',
  serve:'<p class="big">Al PC i dati si tengono in <b>vettori</b> (array) e i nomi sono <b>stringhe</b>. Nello scritto il "cosa stampa" gioca quasi sempre con le stringhe: il carattere <code>\'\\0\'</code> in fondo, <code>strlen</code>, l\'aritmetica dei caratteri.</p>',
  exam:'tema del 9 feb 2026: <code>do { i++; } while (*(source + i) != \'\\0\');</code> conta i caratteri fino al terminatore. Al PC: "restituisca un vettore … e la sua dimensione logica".',
  idea:{ title:'Una fila di armadietti numerati', html:
    '<p>Un array è una fila di armadietti tutti dello stesso tipo, numerati <b>da 0</b>. <code>int voti[5];</code> crea 5 armadietti: voti[0], voti[1], voti[2], voti[3], voti[4]. <b>voti[5] non esiste</b>.</p>'
   +'<p>Una <b>stringa</b> è un array di char che finisce con il carattere speciale <code>\'\\0\'</code> (terminatore, vale 0). <code>char nome[] = "Pia";</code> occupa <b>4</b> caselle: P, i, a, \\0.</p>'
   +'<div class="note"><b>Dimensione fisica</b> = quante caselle ho creato (es. 100). <b>Dimensione logica</b> = quante ne sto usando davvero (es. 12). All\'esame te la chiedono sempre: va restituita o passata a parte, perché l\'array non la sa.</div>' },
  widgets:[
    { type:'tracer', title:'Il massimo di un array', intro:'Le caselle evidenziate in verde sono quelle che il ciclo sta guardando.',
      code:String.raw`
#include <stdio.h>
#include <string.h>
#define N 5

int massimo(int v[], int dim) {
    int i, max = v[0];
    for (i = 1; i < dim; i++)
        if (v[i] > max)
            max = v[i];
    return max;
}

int main(void) {
    int voti[N] = {24, 18, 30, 27, 21};
    char nome[] = "Pia";
    int m = massimo(voti, N);
    printf("max = %d\n", m);
    printf("%s ha %d lettere\n", nome, (int) strlen(nome));
    return 0;
}`,
      steps:[
        { l:14, f:[['main',{}]], arr:[{n:'voti (int[5])',v:['24','18','30','27','21']}], say:'Array di 5 interi, inizializzato con le graffe. Gli indici vanno da 0 a 4.' },
        { l:15, f:[['main',{}]], arr:[{n:'voti (int[5])',v:['24','18','30','27','21']},{n:'nome (char[4])',v:['P','i','a','\\0']}], say:'"Pia" sono 3 lettere, ma l\'array è lungo 4: in fondo il C mette da solo il terminatore \\0.' },
        { l:16, f:[['main',{}]], arr:[{n:'voti (int[5])',v:['24','18','30','27','21']}], say:'Passo l\'array e la sua dimensione. Un array passato a una funzione passa il suo <b>indirizzo</b>: la funzione lavora sull\'array originale.' },
        { l:6, f:[['main',{}],['massimo',{v:'indirizzo di voti',dim:'5',i:'???',max:'24'}]], arr:[{n:'voti',v:['24','18','30','27','21'],hl:[0]}], say:'Parto dicendo che il massimo è il primo elemento, v[0] = 24.' },
        { l:8, f:[['main',{}],['massimo',{v:'indirizzo di voti',dim:'5',i:'1',max:'24'}]], arr:[{n:'voti',v:['24','18','30','27','21'],hl:[1]}], say:'i = 1: 18 &gt; 24? No.' },
        { l:9, f:[['main',{}],['massimo',{v:'indirizzo di voti',dim:'5',i:'2',max:'30'}]], arr:[{n:'voti',v:['24','18','30','27','21'],hl:[2]}], say:'i = 2: 30 &gt; 24? Sì, max = 30.' },
        { l:8, f:[['main',{}],['massimo',{v:'indirizzo di voti',dim:'5',i:'3',max:'30'}]], arr:[{n:'voti',v:['24','18','30','27','21'],hl:[3]}], say:'i = 3: 27 &gt; 30? No.' },
        { l:8, f:[['main',{}],['massimo',{v:'indirizzo di voti',dim:'5',i:'4',max:'30'}]], arr:[{n:'voti',v:['24','18','30','27','21'],hl:[4]}], say:'i = 4: 21 &gt; 30? No.' },
        { l:10, f:[['main',{}],['massimo',{v:'indirizzo di voti',dim:'5',i:'5',max:'30'}]], arr:[{n:'voti',v:['24','18','30','27','21']}], say:'i = 5: 5 &lt; 5 è falso, esco. Restituisco 30. Nota: il ciclo si ferma prima di toccare v[5], che non esiste.' },
        { l:17, f:[['main',{m:'30'}]], out:'max = 30\n', say:'m = 30.' },
        { l:18, f:[['main',{m:'30'}]], arr:[{n:'nome',v:['P','i','a','\\0']}], out:'max = 30\nPia ha 3 lettere\n', say:'<code>%s</code> stampa i caratteri fino al \\0. <code>strlen</code> conta i caratteri <b>prima</b> del \\0: 3.' }
      ] },
    { type:'html', eyebrow:'Tabella da tenere davanti (string.h)', title:'Le funzioni delle stringhe', html:
      '<div class="scroll"><table class="t"><tr><th>Funzione</th><th>Cosa fa</th><th>Attenzione</th></tr>'
     +'<tr><td><code>strlen(s)</code></td><td>quanti caratteri prima del \\0</td><td>"Pia" → 3 (l\'array è lungo 4)</td></tr>'
     +'<tr><td><code>strcpy(dest, src)</code></td><td>copia src dentro dest</td><td>Non si può scrivere <code>dest = src;</code> con gli array</td></tr>'
     +'<tr><td><code>strcmp(a, b)</code></td><td>confronta: <b>0 se sono uguali</b>, negativo se a viene prima in ordine alfabetico, positivo se dopo</td><td>Per "uguali" si scrive <code>strcmp(a, b) == 0</code>, non <code>a == b</code></td></tr>'
     +'<tr><td><code>strcat(dest, src)</code></td><td>attacca src in fondo a dest</td><td>dest deve avere spazio</td></tr>'
     +'<tr><td><code>scanf("%s", s)</code></td><td>legge una parola (fino allo spazio)</td><td><b>Senza &amp;</b>: il nome dell\'array è già un indirizzo</td></tr></table></div>' }
  ],
  why:[
    { easy:true, f:'Gli indici partono da 0, l\'ultimo è dim − 1', t:'L\'indice è "quante caselle salto dall\'inizio": la prima casella è a distanza 0. Per questo i cicli sono <code>for (i = 0; i &lt; dim; i++)</code>, con il &lt; e non il &lt;=.' },
    { easy:true, f:'Un array passato a una funzione può essere modificato dalla funzione', t:'Il nome dell\'array è l\'indirizzo della prima casella. La funzione riceve l\'indirizzo, quindi lavora sull\'originale (come coi puntatori del capitolo 7).' },
    { easy:true, f:'Una stringa deve avere spazio per il \\0', t:'Per un nome di al massimo 30 caratteri serve <code>char nome[31];</code>. Per questo nei temi d\'esame trovi sempre "max 30 caratteri" e le soluzioni usano [31].' },
    { easy:true, f:'v[i] e *(v + i) sono la stessa cosa', t:'v è l\'indirizzo della prima casella; v + i è l\'indirizzo della casella i; * ci va dentro. Il tema del 9 feb 2026 usa proprio <code>*(source + i)</code>.' },
    { easy:false, f:'strcmp restituisce 0 quando le stringhe sono uguali', t:'È al contrario di quello che ti aspetteresti ("vero" = uguali). È una convenzione: imparala a memoria.' }
  ],
  warn:{ title:'Uscire dall\'array', html:'<p>Il C non controlla gli indici. Se scrivi <code>v[5]</code> in un array di 5, leggi o scrivi memoria che non è tua: il programma può dare numeri a caso o bloccarsi, senza nessun errore di compilazione. Controlla sempre il <code>&lt;</code> del ciclo.</p>' },
  guided:{ title:'Stringhe come nello scritto', intro:code(String.raw`
char s[10] = "casa";
char t[10];
int i;
strcpy(t, s);
t[0] = 'r';
for (i = 0; s[i] != '\0'; i++)
    s[i] = s[i] + 1;
printf("%s %s %d\n", s, t, (int) strlen(t));`), steps:[
      { h:'Dopo strcpy e t[0] = \'r\', cosa c\'è in t?', type:'text', ans:['rasa'], ok:'Sì: t è una copia, cambiare t non cambia s.', bad:'t è una copia di "casa", poi la prima lettera diventa r.' },
      { h:'Il ciclo aggiunge 1 a ogni carattere di s. Cosa diventa "casa"?', type:'text', ans:['dbtb'], ok:'Giusto: c→d, a→b, s→t, a→b.', bad:'Ogni lettera diventa la successiva dell\'alfabeto.' },
      { h:'Cosa stampa l\'ultima riga?', type:'text', ans:['dbtb rasa 4'], ok:'Perfetto.', bad:'s, poi t, poi la lunghezza di t.' }
    ], done:'<b>Fatto!</b> Tutti i passaggi:<ol class="pass"><li>s = "casa": caselle c, a, s, a, \\0.</li><li>strcpy(t, s): copio carattere per carattere → t = "casa".</li><li>t[0] = \'r\' → t = "rasa". s non cambia.</li><li>Ciclo su s: i = 0: \'c\' + 1 = \'d\'; i = 1: \'a\' + 1 = \'b\'; i = 2: \'s\' + 1 = \'t\'; i = 3: \'a\' + 1 = \'b\'; i = 4: s[4] = \'\\0\' → esco. Ora s = "dbtb".</li><li>strlen(t) = caratteri prima del \\0 in "rasa" = 4.</li><li>printf → <b>dbtb rasa 4</b>.</li></ol>Stampa <code>dbtb rasa 4</code>. Il ciclo <code>for (i = 0; s[i] != \'\\0\'; i++)</code> è lo schema per scorrere una stringa: ricordatelo.' },
  ex:[
    { id:'e1', type:'out', q:'Cosa stampa?'+code(String.raw`
int v[6] = {3, 8, 1, 9, 4, 6};
int i, s = 0;
for (i = 0; i < 6; i = i + 2)
    s = s + v[i];
printf("%d %d\n", s, v[i - 1]);`), a:'8 6', hint:'i prende 0, 2, 4. Dopo il ciclo i vale 6.', sol:'<pre class="code">8 6</pre><ol class="pass"><li>v = {3, 8, 1, 9, 4, 6}: v[0] = 3, v[1] = 8, v[2] = 1, v[3] = 9, v[4] = 4, v[5] = 6. s = 0.</li><li>i = 0: 0 &lt; 6 vero → s = 0 + v[0] = 0 + 3 = 3. i = 0 + 2 = 2.</li><li>i = 2: vero → s = 3 + v[2] = 3 + 1 = 4. i = 4.</li><li>i = 4: vero → s = 4 + v[4] = 4 + 4 = 8. i = 6.</li><li>i = 6: 6 &lt; 6 falso → esco. i vale 6.</li><li>v[i − 1] = v[6 − 1] = v[5] = 6.</li><li>printf → <b>8 6</b>.</li></ol>' },
    { id:'e2', type:'out', q:'Cosa stampa?'+code(String.raw`
void azzera_negativi(int v[], int dim) {
    int i;
    for (i = 0; i < dim; i++)
        if (v[i] < 0) v[i] = 0;
}
int main(void) {
    int a[4] = {5, -2, 7, -1};
    int i;
    azzera_negativi(a, 4);
    for (i = 0; i < 4; i++) printf("%d ", a[i]);
    printf("\n");
    return 0;
}`), a:'5 0 7 0', hint:'L\'array passato alla funzione è l\'originale.', sol:'<pre class="code">5 0 7 0 </pre><ol class="pass"><li>a = {5, −2, 7, −1}. azzera_negativi riceve l\'indirizzo di a, quindi lavora sull\'originale.</li><li>i = 0: 5 &lt; 0 falso, resta 5.</li><li>i = 1: −2 &lt; 0 vero → a[1] = 0.</li><li>i = 2: 7 &lt; 0 falso, resta 7.</li><li>i = 3: −1 &lt; 0 vero → a[3] = 0.</li><li>Nel main a = {5, 0, 7, 0}; il ciclo stampa ogni valore seguito da uno spazio → <b>5 0 7 0 </b>, poi a capo.</li></ol>' },
    { id:'e3', type:'choice', q:'Come controlli se la stringa <code>nome</code> è uguale a "Rossi"?', opts:['if (nome == "Rossi")','if (strcmp(nome, "Rossi") == 0)','if (strcmp(nome, "Rossi") == 1)'], a:1, hint:'strcmp restituisce 0 se sono uguali.', sol:'<code>if (strcmp(nome, "Rossi") == 0)</code>. Con == confronteresti gli indirizzi, non il testo.' },
    { id:'e4', type:'text', q:'Quante caselle occupa <code>char s[] = "esame";</code> ?', a:['6'], hint:'Conta le lettere e aggiungi il terminatore.', sol:'<ol class="pass"><li>Lettere: e, s, a, m, e → 5.</li><li>Il C aggiunge in fondo il terminatore \\0 → 1 casella in più.</li><li>5 + 1 = <b>6</b> caselle: s[0] = \'e\' … s[4] = \'e\', s[5] = \'\\0\'.</li></ol>' },
    { id:'e5', type:'code', tag:'al PC', q:'Scrivi <code>int conta_maggiori(int v[], int dim, int soglia)</code> che restituisce quanti elementi di v sono maggiori di soglia, e un main che la prova su {4, 12, 7, 20, 3} con soglia 5 (risultato 3).', hint:'Ciclo da 0 a dim − 1, contatore.', sol:code(String.raw`
#include <stdio.h>

int conta_maggiori(int v[], int dim, int soglia) {
    int i, cont = 0;
    for (i = 0; i < dim; i++)
        if (v[i] > soglia)
            cont++;
    return cont;
}

int main(void) {
    int a[5] = {4, 12, 7, 20, 3};
    printf("%d\n", conta_maggiori(a, 5, 5));
    return 0;
}`)+'<ol class="pass"><li>i = 0: 4 &gt; 5 falso → cont = 0</li><li>i = 1: 12 &gt; 5 vero → cont = 1</li><li>i = 2: 7 &gt; 5 vero → cont = 2</li><li>i = 3: 20 &gt; 5 vero → cont = 3</li><li>i = 4: 3 &gt; 5 falso → cont resta 3</li><li>i = 5: 5 &lt; 5 falso → esco, return <b>3</b></li></ol>' }
  ],
  quaderno:[
    '<b>Indici da 0 a dim − 1.</b> Ciclo tipo: <code>for (i = 0; i &lt; dim; i++)</code>.',
    '<b>Array a una funzione:</b> <code>int f(int v[], int dim)</code>; la funzione può modificarlo.',
    '<b>Stringa:</b> array di char con <code>\'\\0\'</code> in fondo; spazio = lunghezza massima + 1.',
    '<b>Scorrere una stringa:</b> <code>for (i = 0; s[i] != \'\\0\'; i++)</code>.',
    '<b>strcmp(a, b) == 0</b> vuol dire uguali. Copiare: strcpy. Lunghezza: strlen. scanf("%s", s) senza &amp;.'
  ]
});

/* ================= 10 · STRUCT E MATRICI ================= */
CH.push({
  id:'struct-matrici', n:10, short:'Struct, enum, matrici', when:'piano del 2/12 e del 5/12 · slide 12d, 13, 14',
  title:'Struct (record), enum e matrici',
  serve:'<p class="big">Ogni prova al PC comincia con "<b>Si definisca una struttura dati Prodotto</b> che rappresenti i dati di un prodotto". Le struct sono il modo di mettere insieme dati diversi (un id, un nome, un prezzo) in un\'unica variabile.</p>',
  exam:'7 gen 2026: struct Prodotto (ID, nome, categoria, prezzo, quantità), struct Acquisto, struct Ordine con dentro un vettore dinamico di Acquisto. Le matrici escono meno, ma sono nel programma.',
  idea:{ title:'La scheda anagrafica', html:
    '<p>Una struct è una <b>scheda</b> con dei campi da compilare. Definisci una volta com\'è fatta la scheda, poi crei quante schede vuoi.</p>'
   +code(String.raw`
typedef struct {
    int id;
    char nome[31];
    float prezzo;
} Prodotto;`)
   +'<p>Da qui in poi <code>Prodotto</code> è un tipo come int. <code>Prodotto p;</code> crea una scheda. Ai campi si arriva con il punto: <code>p.id</code>, <code>p.prezzo</code>.</p>'
   +'<div class="note">Se invece hai un <b>puntatore</b> alla scheda (<code>Prodotto *q = &amp;p;</code>) si usa la freccia: <code>q-&gt;prezzo</code>, che vuol dire esattamente <code>(*q).prezzo</code>.</div>' },
  widgets:[
    { type:'tracer', title:'Il prodotto più economico',
      code:String.raw`
#include <stdio.h>

typedef struct {
    int id;
    char nome[31];
    float prezzo;
} Prodotto;

int main(void) {
    Prodotto v[3] = { {7, "mouse", 19.5}, {3, "cavo", 4.0}, {9, "monitor", 129.9} };
    Prodotto *p;
    int i, imin = 0;
    for (i = 1; i < 3; i++)
        if (v[i].prezzo < v[imin].prezzo)
            imin = i;
    printf("%s costa %.2f\n", v[imin].nome, v[imin].prezzo);
    p = &v[2];
    p->prezzo = 99.0;
    printf("%d %.1f\n", v[2].id, v[2].prezzo);
    return 0;
}`,
      steps:[
        { l:3, say:'Definisco il tipo Prodotto: tre campi. Non crea ancora nessuna variabile.' },
        { l:10, f:[['main',{}]], arr:[{n:'v (Prodotto[3]): id nome prezzo',v:['7 mouse 19.5','3 cavo 4.0','9 monitor 129.9']}], say:'Un array di 3 struct. Ogni casella è una scheda intera.' },
        { l:12, f:[['main',{i:'???',imin:'0'}]], arr:[{n:'v',v:['7 mouse 19.5','3 cavo 4.0','9 monitor 129.9'],hl:[0]}], say:'imin è l\'<b>indice</b> del più economico finora: parto da 0. Conviene tenere l\'indice, non il prezzo, così alla fine ho tutta la scheda.' },
        { l:15, f:[['main',{i:'1',imin:'1'}]], arr:[{n:'v',v:['7 mouse 19.5','3 cavo 4.0','9 monitor 129.9'],hl:[1]}], say:'i = 1: v[1].prezzo = 4.0 &lt; v[0].prezzo = 19.5. Sì: imin = 1.' },
        { l:14, f:[['main',{i:'2',imin:'1'}]], arr:[{n:'v',v:['7 mouse 19.5','3 cavo 4.0','9 monitor 129.9'],hl:[2]}], say:'i = 2: 129.9 &lt; 4.0? No.' },
        { l:16, f:[['main',{i:'3',imin:'1'}]], arr:[{n:'v',v:['7 mouse 19.5','3 cavo 4.0','9 monitor 129.9'],hl:[1]}], out:'cavo costa 4.00\n', say:'Stampo nome e prezzo della scheda v[1].' },
        { l:17, f:[['main',{i:'3',imin:'1',p:'indirizzo di v[2]'}]], arr:[{n:'v',v:['7 mouse 19.5','3 cavo 4.0','9 monitor 129.9'],hl:[2]}], out:'cavo costa 4.00\n', say:'p è un puntatore a Prodotto e punta alla terza scheda.' },
        { l:18, f:[['main',{i:'3',imin:'1',p:'indirizzo di v[2]'}]], arr:[{n:'v',v:['7 mouse 19.5','3 cavo 4.0','9 monitor 99.0'],hl:[2]}], out:'cavo costa 4.00\n', say:'<code>p-&gt;prezzo</code> = il campo prezzo della scheda puntata da p. Cambia v[2].' },
        { l:19, f:[['main',{i:'3',imin:'1',p:'indirizzo di v[2]'}]], arr:[{n:'v',v:['7 mouse 19.5','3 cavo 4.0','9 monitor 99.0']}], out:'cavo costa 4.00\n9 99.0\n', say:'Stampa id e nuovo prezzo di v[2].' }
      ] },
    { type:'html', eyebrow:'Matrici ed enum', title:'Una tabella di numeri, e i nomi al posto dei numeri', html:
      '<p>Una <b>matrice</b> è un array di array: <code>int m[2][3];</code> ha 2 righe e 3 colonne. <code>m[i][j]</code> è l\'elemento di riga i e colonna j (entrambi da 0). Si scorre con due cicli uno dentro l\'altro:</p>'
     +code(String.raw`
int m[2][3] = { {1, 2, 3}, {4, 5, 6} };
int i, j;
for (i = 0; i < 2; i++) {          /* righe */
    for (j = 0; j < 3; j++)        /* colonne */
        printf("%d ", m[i][j]);
    printf("\n");
}`)
     +'<p>Stampa la tabella riga per riga: <code>1 2 3</code> e poi <code>4 5 6</code>.</p>'
     +'<p>Un <b>enum</b> dà nomi a dei numeri: <code>typedef enum { ELETTRONICA, CASA, SPORT } Categoria;</code> vuol dire ELETTRONICA = 0, CASA = 1, SPORT = 2. Serve solo a rendere il codice più leggibile.</p>' }
  ],
  why:[
    { easy:true, f:'punto per la struct, freccia per il puntatore a struct', t:'<code>q-&gt;campo</code> è solo un modo corto di scrivere <code>(*q).campo</code>: prima vai alla struct puntata, poi prendi il campo.' },
    { easy:true, f:'Le struct si passano per valore (copia intera)', t:'Come gli int: se una funzione riceve <code>Prodotto p</code> e lo modifica, cambia la copia. Per modificare l\'originale si passa <code>Prodotto *p</code> e si usa la freccia.' },
    { easy:true, f:'Una struct si può assegnare con =, un array no', t:'<code>p1 = p2;</code> copia tutti i campi (anche le stringhe dentro). È comodo negli scambi dell\'ordinamento (capitolo 13).' },
    { easy:false, f:'typedef struct { ... } Nome; contro struct nome { ... };', t:'Sono due modi di scrivere. Con typedef poi scrivi solo <code>Nome</code>, senza la parola struct. Usa sempre la forma con typedef, come nelle soluzioni del prof.' }
  ],
  guided:{ title:'Definire la struct del tema', intro:'<p>Dal tema del 7 gen 2026: "ogni riga rappresenta un prodotto con i campi: un intero ID; il nome, una stringa senza spazi di al massimo 30 caratteri; la categoria, un carattere; il prezzo unitario, un float; la quantità in magazzino, un intero."</p>', steps:[
      { h:'Che tipo usi per il nome (max 30 caratteri)?', type:'choice', opts:['char nome;','char nome[30];','char nome[31];'], ans:2, ok:'Giusto: 30 caratteri + il \\0.', bad:'Una stringa ha bisogno di una casella in più per il terminatore.' },
      { h:'E per la categoria (\'E\', \'C\' o \'S\')?', type:'choice', opts:['char categoria;','char categoria[2];','int categoria;'], ans:0, ok:'Sì: un solo carattere è un char.', bad:'È un singolo carattere, non una stringa.' },
      { h:'Come scrivi il campo per la quantità?', type:'text', ans:['intquantita;','intqta;','intquantità;'], ok:'Bene. (Nel tema si consiglia "quantita" senza accento.)', bad:'Un intero: int seguito dal nome e dal punto e virgola.' }
    ], done:'<b>Fatto!</b> La struct completa:'+code(String.raw`
typedef struct {
    int id;
    char nome[31];
    char categoria;
    float prezzo;
    int quantita;
} Prodotto;`) },
  ex:[
    { id:'e1', type:'out', q:'Cosa stampa?'+code(String.raw`
typedef struct { char nome[20]; int voto; } Studente;
void promuovi(Studente *s) { s->voto = s->voto + 2; }
void prova(Studente s) { s.voto = 0; }
int main(void) {
    Studente a = {"Ugo", 17};
    promuovi(&a);
    prova(a);
    printf("%s %d\n", a.nome, a.voto);
    return 0;
}`), a:'Ugo 19', hint:'promuovi riceve l\'indirizzo, prova riceve una copia.', sol:'<pre class="code">Ugo 19</pre><ol class="pass"><li>a = {nome "Ugo", voto 17}.</li><li>promuovi(&amp;a): s punta ad a. s-&gt;voto = s-&gt;voto + 2 = 17 + 2 = 19 → cambia l\'originale: a.voto = 19.</li><li>prova(a): s è una copia di a. s.voto = 0 cambia solo la copia; a.voto resta 19.</li><li>printf → <b>Ugo 19</b>.</li></ol>' },
    { id:'e2', type:'out', q:'Cosa stampa?'+code(String.raw`
int m[2][3] = { {1, 2, 3}, {4, 5, 6} };
int i, j, s = 0;
for (i = 0; i < 2; i++)
    for (j = 0; j < 3; j++)
        if (i != j) s = s + m[i][j];
printf("%d %d\n", s, m[1][0]);`), a:'15 4', hint:'Si saltano gli elementi con i uguale a j: m[0][0] e m[1][1].', sol:'<pre class="code">15 4</pre><ol class="pass"><li>i = 0, j = 0: i == j → salto (m[0][0] = 1).</li><li>i = 0, j = 1: s = 0 + m[0][1] = 0 + 2 = 2.</li><li>i = 0, j = 2: s = 2 + m[0][2] = 2 + 3 = 5.</li><li>i = 1, j = 0: s = 5 + m[1][0] = 5 + 4 = 9.</li><li>i = 1, j = 1: i == j → salto (m[1][1] = 5).</li><li>i = 1, j = 2: s = 9 + m[1][2] = 9 + 6 = 15.</li><li>m[1][0] = riga 1, colonna 0 = 4.</li><li>printf → <b>15 4</b>.</li></ol>' },
    { id:'e3', type:'choice', q:'<code>Prodotto *q;</code> Come leggi il prezzo del prodotto puntato da q?', opts:['q.prezzo','q-&gt;prezzo','*q.prezzo'], a:1, hint:'Puntatore a struct = freccia.', sol:'<code>q-&gt;prezzo</code> (oppure <code>(*q).prezzo</code>, con le parentesi). <code>*q.prezzo</code> senza parentesi è sbagliato.' },
    { id:'e4', type:'code', tag:'al PC', q:'Definisci <code>typedef struct { int id; char nome[31]; float prezzo; int quantita; } Prodotto;</code> e scrivi <code>float valore_totale(Prodotto v[], int dim)</code> che restituisce la somma di prezzo · quantita di tutti i prodotti.', hint:'Accumulatore float che parte da 0, ciclo su v[i].prezzo * v[i].quantita.', sol:code(String.raw`
float valore_totale(Prodotto v[], int dim) {
    int i;
    float tot = 0;
    for (i = 0; i < dim; i++)
        tot = tot + v[i].prezzo * v[i].quantita;
    return tot;
}`)+'<p>Prova a mano con v = { {1, "mouse", 19.5, 4}, {2, "cavo", 4.0, 10} } e dim = 2:</p><ol class="pass"><li>tot = 0.</li><li>i = 0: tot = 0 + 19.5 * 4 = 0 + 78.0 = 78.0</li><li>i = 1: tot = 78.0 + 4.0 * 10 = 78.0 + 40.0 = 118.0</li><li>i = 2: 2 &lt; 2 falso → esco, return <b>118.0</b></li></ol>' }
  ],
  quaderno:[
    '<b>Struct:</b> <code>typedef struct { campi } Nome;</code> nel .h (all\'esame in element.h).',
    '<b>Campi:</b> <code>p.campo</code>; con puntatore <code>q-&gt;campo</code>.',
    '<b>Stringhe nella struct:</b> <code>char nome[31]</code> per max 30 caratteri.',
    '<b>Modificare una struct in una funzione:</b> parametro <code>Nome *p</code>, dentro <code>p-&gt;campo = ...</code>.',
    '<b>Matrice:</b> <code>m[riga][colonna]</code>, due cicli annidati.'
  ]
});

/* ================= 11 · FILE ================= */
CH.push({
  id:'file', n:11, short:'File di testo e binari', when:'piano del 9/12 · slide 15, 16a, 16b · esercitazione File',
  title:'Leggere e scrivere file',
  serve:'<p class="big">La prova al PC comincia <b>sempre</b> con "si definisca la funzione che legge i dati dal file <code>prodotti.txt</code>". Se non sai leggere il file non hai dati, e tutto il resto della prova non si può provare. È il pezzo più importante da tenere pronto in RACCOLTA_C.</p>',
  exam:'scritto 18 giu 2026 e 22 gen 2026, domanda di teoria: "le funzioni per l\'I/O su file con formato (fprintf e fscanf) a confronto con fread e fwrite". Al PC: file di testo con righe tipo <code>11 Smartphone_Eco E 299.99 15</code>.',
  idea:{ title:'Il quaderno con il segnalibro', html:
    '<p>Un file aperto è un quaderno con un <b>segnalibro</b>. <code>fopen</code> apre il quaderno e mette il segnalibro all\'inizio. Ogni <code>fscanf</code> legge da dove sta il segnalibro e lo sposta avanti. Quando il segnalibro arriva in fondo, fscanf non riesce più a leggere.</p>'
   +'<p><code>fscanf</code> è uguale a <code>scanf</code>, solo che legge dal file invece che dalla tastiera, e restituisce <b>quanti valori è riuscito a leggere</b>.</p>'
   +'<div class="note">Schema di lettura: <b>apri</b> (e controlla che non sia NULL) → <b>ciclo finché fscanf legge tutti i campi</b> → <b>chiudi</b> con fclose.</div>' },
  widgets:[
    { type:'tracer', title:'Il valore del magazzino', intro:'Il file prodotti.txt ha 3 righe: id, nome, prezzo, quantità. La riga verde del file è quella dove sta il segnalibro.',
      code:String.raw`
#include <stdio.h>

int main(void) {
    FILE *f;
    int id, q;
    float prezzo, totale = 0;
    char nome[31];
    f = fopen("prodotti.txt", "r");
    if (f == NULL) {
        printf("Errore apertura\n");
        return 1;
    }
    while (fscanf(f, "%d %s %f %d", &id, nome, &prezzo, &q) == 4) {
        totale = totale + prezzo * q;
    }
    fclose(f);
    printf("Valore magazzino: %.2f\n", totale);
    return 0;
}`,
      steps:[
        { l:4, v:{f:'???'}, arr:[{n:'file prodotti.txt',v:['1 mouse 19.50 4','2 cavo 4.00 10','3 monitor 129.90 1']}], say:'<code>FILE *f</code>: un puntatore che rappresenterà il file aperto.' },
        { l:8, v:{f:'file aperto in lettura',totale:'0'}, arr:[{n:'file prodotti.txt',v:['1 mouse 19.50 4','2 cavo 4.00 10','3 monitor 129.90 1'],hl:[0]}], say:'<code>fopen(nome, "r")</code> apre in lettura ("r" = read). Il segnalibro è all\'inizio.' },
        { l:9, v:{f:'file aperto in lettura',totale:'0'}, arr:[{n:'file prodotti.txt',v:['1 mouse 19.50 4','2 cavo 4.00 10','3 monitor 129.90 1'],hl:[0]}], say:'Se il file non esiste fopen restituisce NULL. Il controllo è obbligatorio: senza, il programma si blocca alla prima lettura.' },
        { l:13, v:{f:'file aperto in lettura',id:'1',nome:'"mouse"',prezzo:'19.50',q:'4',totale:'0'}, arr:[{n:'file prodotti.txt',v:['1 mouse 19.50 4','2 cavo 4.00 10','3 monitor 129.90 1'],hl:[0]}], say:'fscanf legge 4 valori dalla prima riga e restituisce 4. 4 == 4: vero, entro. (nome senza &amp;: è un array.)' },
        { l:14, v:{f:'file aperto in lettura',id:'1',nome:'"mouse"',prezzo:'19.50',q:'4',totale:'78.00'}, arr:[{n:'file prodotti.txt',v:['1 mouse 19.50 4','2 cavo 4.00 10','3 monitor 129.90 1'],hl:[0]}], say:'totale = 0 + 19.50 · 4 = 78.00.' },
        { l:13, v:{f:'file aperto in lettura',id:'2',nome:'"cavo"',prezzo:'4.00',q:'10',totale:'78.00'}, arr:[{n:'file prodotti.txt',v:['1 mouse 19.50 4','2 cavo 4.00 10','3 monitor 129.90 1'],hl:[1]}], say:'Seconda riga, di nuovo 4 valori letti.' },
        { l:14, v:{f:'file aperto in lettura',id:'2',nome:'"cavo"',prezzo:'4.00',q:'10',totale:'118.00'}, arr:[{n:'file prodotti.txt',v:['1 mouse 19.50 4','2 cavo 4.00 10','3 monitor 129.90 1'],hl:[1]}], say:'totale = 78 + 4.00 · 10 = 118.00.' },
        { l:13, v:{f:'file aperto in lettura',id:'3',nome:'"monitor"',prezzo:'129.90',q:'1',totale:'118.00'}, arr:[{n:'file prodotti.txt',v:['1 mouse 19.50 4','2 cavo 4.00 10','3 monitor 129.90 1'],hl:[2]}], say:'Terza riga.' },
        { l:14, v:{f:'file aperto in lettura',id:'3',nome:'"monitor"',prezzo:'129.90',q:'1',totale:'247.90'}, arr:[{n:'file prodotti.txt',v:['1 mouse 19.50 4','2 cavo 4.00 10','3 monitor 129.90 1'],hl:[2]}], say:'totale = 118 + 129.90 = 247.90.' },
        { l:13, v:{f:'file aperto in lettura',id:'3',nome:'"monitor"',prezzo:'129.90',q:'1',totale:'247.90'}, arr:[{n:'file prodotti.txt',v:['1 mouse 19.50 4','2 cavo 4.00 10','3 monitor 129.90 1']}], say:'Il file è finito: fscanf non legge niente e restituisce EOF (un numero negativo), che non è 4. Esco dal ciclo.' },
        { l:16, v:{f:'chiuso',totale:'247.90'}, say:'fclose chiude il file. Va sempre fatto.' },
        { l:17, v:{f:'chiuso',totale:'247.90'}, out:'Valore magazzino: 247.90\n', say:'Stampa il totale.' }
      ] },
    { type:'html', eyebrow:'Righe con un numero variabile di pezzi', title:'Il trucco del tema del 7 gennaio 2026', html:
      '<p>Riga del file: <code>ORD100 Alice_Verdi 2 11-1 35-2</code>. Dopo il nome c\'è <b>quante coppie seguono</b> (2), poi le coppie "id-quantità" separate da un trattino.</p>'
     +'<p>Si legge prima la parte fissa, poi un ciclo per le coppie. Nel formato di fscanf il trattino si scrive così com\'è: <code>"%d-%d"</code> vuol dire "un intero, un trattino, un intero".</p>'
     +code(String.raw`
while (fscanf(f, "%s %s %d", id, cliente, &n) == 3) {
    for (i = 0; i < n; i++)
        fscanf(f, "%d-%d", &prod, &qta);
    /* qui ho letto un ordine intero */
}`) },
    { type:'html', eyebrow:'Risposta pronta per lo scritto (1 punto)', title:'File di testo contro file binari', html:
      '<div class="exam"><p><b>fprintf / fscanf</b> fanno I/O <b>con formato</b> su file di <b>testo</b>: i dati vengono convertiti in caratteri leggibili (il numero 247 diventa i caratteri \'2\' \'4\' \'7\'), usando una stringa di formato come in printf/scanf. Il file si apre con "r", "w" o "a".</p>'
     +'<p><b>fwrite / fread</b> fanno I/O <b>binario</b>: copiano i byte della memoria così come sono, senza conversione, a blocchi: <code>fwrite(&amp;x, sizeof(x), 1, f)</code> scrive 1 elemento grande sizeof(x). Il file si apre con "rb" o "wb", non è leggibile con un editor, ma è più veloce e compatto.</p>'
     +'<p>Entrambe restituiscono quanti elementi sono riuscite a leggere/scrivere: si usa per capire quando il file è finito.</p></div>' }
  ],
  why:[
    { easy:true, f:'while (fscanf(...) == numero di campi)', t:'fscanf restituisce quanti valori ha letto. Finché legge tutti i campi della riga, la riga è buona; quando il file finisce restituisce EOF e il ciclo si ferma da solo. È più sicuro di <code>while (!feof(f))</code>, che fa un giro in più.' },
    { easy:true, f:'Controllare fopen == NULL', t:'Se il file non c\'è o il nome è sbagliato, fopen dà NULL. Leggere da NULL fa bloccare il programma, quindi all\'esame il controllo è richiesto.' },
    { easy:false, f:'Modi di apertura: "r" lettura, "w" scrittura (cancella il file!), "a" aggiunge in fondo, con "b" per i binari', t:'Sono convenzioni: tienile nella tabella in RACCOLTA_C.' },
    { easy:true, f:'%s in fscanf legge fino al primo spazio', t:'Per questo i temi d\'esame dicono sempre "una stringa senza spazi" (Alice_Verdi con il trattino basso).' }
  ],
  warn:{ title:'"w" cancella il file', html:'<p>Aprire con <code>fopen("prodotti.txt", "w")</code> svuota il file subito, anche se poi non scrivi niente. All\'esame il file di prova ti serve: aprilo solo con "r".</p>' },
  guided:{ title:'Leggere le righe del tema', intro:'<p>File ord.txt:</p>'+code(String.raw`
ORD1 2 11-1 35-2
ORD2 3 21-4 22-1 41-1`)+code(String.raw`
while (fscanf(f, "%s %d", id, &n) == 2) {
    tot = 0;
    for (i = 0; i < n; i++) {
        fscanf(f, "%d-%d", &prod, &qta);
        tot = tot + qta;
    }
    printf("%s %d\n", id, tot);
}`), steps:[
      { h:'Prima riga: cosa legge il primo fscanf in id e n?', type:'choice', opts:['id = "ORD1", n = 2','id = "ORD1", n = 11','id = "ORD1 2", n = 11'], ans:0, ok:'Giusto: %s si ferma allo spazio.', bad:'%s legge fino allo spazio, poi %d legge il numero seguente.' },
      { h:'Poi il for legge 2 coppie: 11-1 e 35-2. Quanto vale tot?', type:'text', ans:['3'], ok:'Sì: 1 + 2.', bad:'Si sommano le quantità, cioè il numero dopo il trattino.' },
      { h:'Cosa stampa per la seconda riga?', type:'text', ans:['ORD2 6'], ok:'Perfetto: 4 + 1 + 1.', bad:'Tre coppie: le quantità sono 4, 1, 1.' }
    ], done:'<b>Fatto!</b> Tutti i passaggi:<ol class="pass"><li>Riga 1, fscanf("%s %d"): id = "ORD1", n = 2. Restituisce 2 → entro. tot = 0.</li><li>i = 0: fscanf("%d-%d") legge 11-1 → prod = 11, qta = 1 → tot = 0 + 1 = 1.</li><li>i = 1: legge 35-2 → prod = 35, qta = 2 → tot = 1 + 2 = 3. i = 2: 2 &lt; 2 falso, esco dal for.</li><li>printf → <b>ORD1 3</b>.</li><li>Riga 2: id = "ORD2", n = 3. tot = 0.</li><li>21-4 → tot = 0 + 4 = 4; 22-1 → tot = 4 + 1 = 5; 41-1 → tot = 5 + 1 = 6.</li><li>printf → <b>ORD2 6</b>.</li><li>fscanf non trova altro → restituisce EOF, non 2 → esco dal while.</li></ol>Stampa <code>ORD1 3</code> e <code>ORD2 6</code>. Schema "parte fissa + ciclo per le parti variabili": è proprio il cuore della funzione leggi_singolo_ordine del tema.' },
  ex:[
    { id:'e1', type:'choice', q:'Cosa restituisce fscanf quando il file è finito?', opts:['0 sempre','EOF (un numero negativo)','NULL'], a:1, hint:'NULL è di fopen.', sol:'EOF. Per questo si controlla <code>== numero di campi</code>, che copre sia EOF sia una riga scritta male.' },
    { id:'e2', type:'choice', q:'Vuoi aggiungere una riga in fondo a un file senza perdere quelle che ci sono. Che modo usi?', opts:['"r"','"w"','"a"'], a:2, hint:'a come append (aggiungi).', sol:'<code>"a"</code>. Con "w" il file verrebbe svuotato.' },
    { id:'e3', type:'choice', q:'Quale differenza è giusta tra fprintf e fwrite?', opts:['fprintf scrive caratteri leggibili con un formato, fwrite copia i byte così come sono','Sono uguali','fwrite scrive solo stringhe'], a:0, hint:'Testo contro binario.', sol:'fprintf: testo con formato. fwrite: binario, a blocchi di byte, senza conversione.' },
    { id:'e4', type:'code', tag:'al PC', q:'Crea a mano un file voti.txt con righe "nome voto" (es. <code>Ugo 24</code>). Scrivi un programma che lo legge e stampa la media dei voti e quanti studenti hanno preso almeno 18.', hint:'Apri e controlla NULL; while (fscanf(f, "%s %d", nome, &amp;voto) == 2); somma, contatore totale e contatore promossi; attenzione alla divisione intera per la media.', sol:code(String.raw`
#include <stdio.h>

int main(void) {
    FILE *f;
    char nome[31];
    int voto, n = 0, promossi = 0, somma = 0;
    f = fopen("voti.txt", "r");
    if (f == NULL) {
        printf("Errore apertura\n");
        return 1;
    }
    while (fscanf(f, "%s %d", nome, &voto) == 2) {
        somma = somma + voto;
        n++;
        if (voto >= 18)
            promossi++;
    }
    fclose(f);
    if (n > 0)
        printf("Media %.2f, promossi %d\n", (float) somma / n, promossi);
    return 0;
}`)+'<p>Prova a mano con il file <code>Ugo 24</code> / <code>Ada 15</code> / <code>Leo 30</code>:</p><ol class="pass"><li>Riga 1: nome = "Ugo", voto = 24 → somma = 0 + 24 = 24, n = 1. 24 &gt;= 18 → promossi = 1.</li><li>Riga 2: "Ada", 15 → somma = 24 + 15 = 39, n = 2. 15 &gt;= 18 falso → promossi resta 1.</li><li>Riga 3: "Leo", 30 → somma = 39 + 30 = 69, n = 3. 30 &gt;= 18 → promossi = 2.</li><li>fscanf restituisce EOF → esco, fclose.</li><li>(float) somma / n = 69.0 / 3 = 23.00 → stampa <b>Media 23.00, promossi 2</b>.</li></ol><p>Nota il <code>(float)</code>: senza, la media sarebbe una divisione intera (capitolo 3). Qui 69 / 3 = 23 esatto, ma con 70 / 3 avresti 23 invece di 23.33.</p>' }
  ],
  quaderno:[
    '<b>Schema lettura:</b> <code>f = fopen(nome, "r"); if (f == NULL) {...} while (fscanf(f, "...", ...) == N) {...} fclose(f);</code>',
    '<b>fscanf</b> restituisce quanti campi ha letto; EOF a fine file.',
    '<b>Modi:</b> "r" leggi, "w" scrivi (svuota!), "a" aggiungi; "rb" / "wb" binari.',
    '<b>Righe variabili:</b> leggo la parte fissa, poi un for per le coppie (es. <code>"%d-%d"</code>).',
    '<b>Teoria:</b> fprintf/fscanf = testo con formato; fwrite/fread = binario a blocchi, senza conversione.'
  ]
});

/* ================= 12 · LISTE ================= */
CH.push({
  id:'liste', n:12, short:'Liste', when:'piano del 12/12 · slide 18 · list.h e list.c',
  title:'Le liste e la ricorsione sulle liste',
  serve:'<p class="big">È <b>l\'esercizio 1 dello scritto, 6 punti su 12</b>, in tutti i temi del 2025-2026. Ed è anche nella prova al PC (leggi_prodotti restituisce una list). Questo è il capitolo che vale di più: lo schema è sempre lo stesso, e si impara.</p>',
  exam:'"Si definisca una funzione RICORSIVA <code>list almenoDue(list matr, list esami)</code> … usando le primitive dell\'ADT lista … e una funzione main che crei le liste dell\'esempio e stampi il risultato." showlist non è una primitiva: se la usi, la devi scrivere.',
  idea:{ title:'Il trenino', html:
    '<p>Una lista è un <b>trenino</b>: ogni vagone porta un valore e un gancio verso il vagone dopo. L\'ultimo vagone ha il gancio vuoto (NULL). La lista vuota è un trenino senza vagoni.</p>'
   +'<p>Non si lavora mai sui ganci a mano: si usano 5 <b>primitive</b> (le trovi in list.h):</p>'
   +'<div class="scroll"><table class="t"><tr><th>Primitiva</th><th>Cosa fa</th><th>Esempio con l = [4, 9, 2]</th></tr>'
   +'<tr><td><code>emptylist()</code></td><td>restituisce la lista vuota</td><td>[ ]</td></tr>'
   +'<tr><td><code>empty(l)</code></td><td>vero se l è vuota</td><td>falso</td></tr>'
   +'<tr><td><code>head(l)</code></td><td>il primo valore</td><td>4</td></tr>'
   +'<tr><td><code>tail(l)</code></td><td>la lista senza il primo vagone</td><td>[9, 2]</td></tr>'
   +'<tr><td><code>cons(x, l)</code></td><td>una nuova lista con x attaccato <b>davanti</b></td><td>cons(1, l) = [1, 4, 9, 2]</td></tr></table></div>'
   +'<div class="note">La lista [4, 9, 2, 7] si costruisce dall\'interno verso l\'esterno: <code>cons(4, cons(9, cons(2, cons(7, emptylist()))))</code>. Il primo cons scritto è il primo elemento.</div>'
   +'<p>Passo passo, partendo dal cons più interno:</p><ol class="pass">'
   +'<li><code>emptylist()</code> = [ ]</li>'
   +'<li><code>cons(7, [ ])</code> = [7]</li>'
   +'<li><code>cons(2, [7])</code> = [2, 7]</li>'
   +'<li><code>cons(9, [2, 7])</code> = [9, 2, 7]</li>'
   +'<li><code>cons(4, [9, 2, 7])</code> = <b>[4, 9, 2, 7]</b></li></ol>' },
  widgets:[
    { type:'tracer', title:'Lo schema dell\'esame: tenere solo alcuni elementi', intro:'maggiori(l, s) restituisce una nuova lista con gli elementi di l maggiori di s. È lo stesso schema di almenoDue, filtra, listBuild dei temi.',
      code:String.raw`
#include <stdio.h>
#include "element.h"
#include "list.h"

void showlist(list l) {
    while (!empty(l)) {
        printf("%d ", head(l));
        l = tail(l);
    }
    printf("\n");
}

list maggiori(list l, int s) {
    if (empty(l))
        return emptylist();
    if (head(l) > s)
        return cons(head(l), maggiori(tail(l), s));
    return maggiori(tail(l), s);
}

int main(void) {
    list l, r;
    l = cons(4, cons(9, cons(2, cons(7, emptylist()))));
    r = maggiori(l, 5);
    showlist(r);
    freelist(l);
    freelist(r);
    return 0;
}`,
      steps:[
        { l:23, f:[['main',{}]], list:{l:['4','9','2','7']}, say:'Costruisco l = [4, 9, 2, 7].' },
        { l:24, f:[['main',{r:'???'}]], list:{l:['4','9','2','7']}, say:'Chiamo maggiori(l, 5): voglio gli elementi &gt; 5, cioè [9, 7].' },
        { l:18, f:[['main',{r:'???'}],['maggiori 1',{l:'[4, 9, 2, 7]',s:'5'}]], say:'l non è vuota. head = 4: 4 &gt; 5? No. Quindi <b>lo salto</b>: il risultato è quello della chiamata sulla coda.' },
        { l:17, f:[['main',{r:'???'}],['maggiori 1',{l:'[4, 9, 2, 7]',s:'5'}],['maggiori 2',{l:'[9, 2, 7]',s:'5'}]], say:'head = 9 &gt; 5: sì. Lo <b>tengo</b>: il risultato sarà cons(9, risultato della coda). Aspetto la coda.' },
        { l:18, f:[['main',{r:'???'}],['maggiori 1',{l:'[4, 9, 2, 7]',s:'5'}],['maggiori 2',{l:'[9, 2, 7] (attende per fare cons 9)',s:'5'}],['maggiori 3',{l:'[2, 7]',s:'5'}]], say:'head = 2: no, lo salto.' },
        { l:17, f:[['main',{r:'???'}],['maggiori 1',{l:'[4, 9, 2, 7]',s:'5'}],['maggiori 2',{l:'[9, 2, 7] (attende per fare cons 9)',s:'5'}],['maggiori 3',{l:'[2, 7]',s:'5'}],['maggiori 4',{l:'[7]',s:'5'}]], say:'head = 7: sì, lo tengo. Aspetto la coda, che è vuota.' },
        { l:15, f:[['main',{r:'???'}],['maggiori 1',{l:'[4, 9, 2, 7]',s:'5'}],['maggiori 2',{l:'[9, 2, 7] (attende per fare cons 9)',s:'5'}],['maggiori 3',{l:'[2, 7]',s:'5'}],['maggiori 4',{l:'[7] (attende per fare cons 7)',s:'5'}],['maggiori 5',{l:'[ ]',s:'5'}]], say:'<b>Caso base:</b> lista vuota → restituisco la lista vuota. Ora si risale.' },
        { l:17, f:[['main',{r:'???'}],['maggiori 1',{l:'[4, 9, 2, 7]',s:'5'}],['maggiori 2',{l:'[9, 2, 7] (attende per fare cons 9)',s:'5'}],['maggiori 3',{l:'[2, 7]',s:'5'}],['maggiori 4',{l:'[7]',s:'5'}]], say:'maggiori 4 riceve [ ] e restituisce cons(7, [ ]) = [7].' },
        { l:18, f:[['main',{r:'???'}],['maggiori 1',{l:'[4, 9, 2, 7]',s:'5'}],['maggiori 2',{l:'[9, 2, 7] (attende per fare cons 9)',s:'5'}],['maggiori 3',{l:'[2, 7]',s:'5'}]], say:'maggiori 3 aveva saltato il 2: restituisce [7] così com\'è.' },
        { l:17, f:[['main',{r:'???'}],['maggiori 1',{l:'[4, 9, 2, 7]',s:'5'}],['maggiori 2',{l:'[9, 2, 7]',s:'5'}]], say:'maggiori 2 riceve [7] e restituisce cons(9, [7]) = [9, 7].' },
        { l:18, f:[['main',{r:'???'}],['maggiori 1',{l:'[4, 9, 2, 7]',s:'5'}]], say:'maggiori 1 aveva saltato il 4: restituisce [9, 7].' },
        { l:24, f:[['main',{}]], list:{l:['4','9','2','7'], r:['9','7']}, say:'r = [9, 7]. È una lista <b>nuova</b>: l è rimasta uguale.' },
        { l:25, f:[['main',{}]], list:{l:['4','9','2','7'], r:['9','7']}, out:'9 7 \n', say:'showlist (scritta da noi, iterativa) stampa i valori.' },
        { l:26, f:[['main',{}]], out:'9 7 \n', say:'freelist libera la memoria delle liste (le primitive cons usano malloc).' }
      ] },
    { type:'recipe', title:'La ricetta per l\'esercizio 1 dello scritto', intro:'Vale per tutte le funzioni ricorsive che costruiscono una lista nuova.', steps:[
      { h:'Caso base', html:code(String.raw`
if (empty(l))
    return emptylist();`)+'<p>Lista vuota in ingresso → lista vuota in uscita.</p>' },
      { h:'Decidi se tenere head(l)', html:'<p>Scrivi la condizione del testo: "compare almeno due volte nella lista esami", "è maggiore di s", "è presente nell\'altra lista"… Spesso per la condizione serve una funzione <b>iterativa</b> di aiuto (es. <code>conta</code>).</p>' },
      { h:'Se lo tieni: cons davanti al risultato della coda', html:code(String.raw`return cons(head(l), f(tail(l), ...));`) },
      { h:'Se non lo tieni: solo il risultato della coda', html:code(String.raw`return f(tail(l), ...);`) },
      { h:'Scrivi il main dell\'esempio', html:'<p>Costruisci le liste dell\'esempio con cons annidati, chiama la funzione, stampa il risultato con una showlist <b>scritta da te</b>, poi freelist. Includi <code>"element.h"</code> e <code>"list.h"</code>.</p>' }
    ] }
  ],
  why:[
    { easy:true, f:'cons attacca davanti, non in fondo', t:'Attaccare davanti è facile (un vagone nuovo che si aggancia al primo). Per questo con cons e ricorsione l\'ordine si conserva, mentre con un ciclo che fa cons l\'ordine si inverte (vedi esercizio 4).' },
    { easy:true, f:'La ricorsione sulle liste usa tail(l) come "problema più piccolo"', t:'La coda ha un elemento in meno: prima o poi si arriva alla lista vuota, che è il caso base.' },
    { easy:true, f:'head e tail di una lista vuota fanno terminare il programma', t:'In list.c c\'è <code>if (empty(l)) exit(-2);</code>. Quindi prima di head/tail controlla sempre empty.' },
    { easy:false, f:'Come sono fatte dentro le primitive (malloc, puntatore next)', t:'Allo scritto le primitive "non è necessario riportarle". Basta saperle usare.' }
  ],
  guided:{ title:'Scrivi almenoUno: elementi di a presenti anche in b', intro:'<p>Funzione iterativa di aiuto già pronta:</p>'+code(String.raw`
int conta(int x, list l) {     /* quante volte x compare in l */
    int c = 0;
    while (!empty(l)) {
        if (head(l) == x) c++;
        l = tail(l);
    }
    return c;
}`)+'<p>Vuoi <code>list comuni(list a, list b)</code>: gli elementi di a che compaiono almeno una volta in b, nello stesso ordine.</p>', steps:[
      { h:'Caso base: cosa restituisci se a è vuota?', type:'choice', opts:['b','emptylist()','NULL di b'], ans:1, ok:'Giusto.', bad:'Se non ci sono elementi da controllare, il risultato è la lista vuota.' },
      { h:'Che condizione usi per tenere head(a)?', type:'choice', opts:['conta(head(a), b) &gt; 0','head(a) == head(b)','conta(head(b), a) &gt; 0'], ans:0, ok:'Sì: head(a) compare almeno una volta in b.', bad:'Devi cercare head(a) in tutta la lista b.' },
      { h:'Se la condizione è vera, cosa restituisci?', type:'choice', opts:['cons(head(a), comuni(tail(a), b))','cons(head(a), comuni(tail(a), tail(b)))','comuni(tail(a), b)'], ans:0, ok:'Perfetto. Nota: b si passa intera, non la sua coda.', bad:'La ricorsione va sulla coda di a. b resta intera, perché devi poterci cercare tutto.' },
      { h:'Con a = [3, 5, 1, 3] e b = [1, 2, 3], quale lista esce?', type:'text', ans:['[3,1,3]','3,1,3','313'], ok:'Esatto: 5 non è in b.', bad:'Tieni gli elementi di a che stanno in b, nell\'ordine di a, anche ripetuti.' }
    ], done:'<b>Fatto!</b>'+code(String.raw`
list comuni(list a, list b) {
    if (empty(a))
        return emptylist();
    if (conta(head(a), b) > 0)
        return cons(head(a), comuni(tail(a), b));
    return comuni(tail(a), b);
}`)+'<p><b>Svolgimento completo</b> con a = [3, 5, 1, 3] e b = [1, 2, 3]. Prima scendo (una chiamata per ogni elemento di a), poi risalgo.</p><ol class="pass">'
   +'<li>comuni([3, 5, 1, 3], b): a non è vuota. head(a) = 3. conta(3, [1, 2, 3]) = 1, e 1 &gt; 0 è vero → <b>tengo il 3</b>: risultato = cons(3, comuni([5, 1, 3], b)).</li>'
   +'<li>comuni([5, 1, 3], b): head = 5. conta(5, [1, 2, 3]) = 0, e 0 &gt; 0 è falso → <b>salto il 5</b>: risultato = comuni([1, 3], b).</li>'
   +'<li>comuni([1, 3], b): head = 1. conta(1, [1, 2, 3]) = 1 &gt; 0 vero → <b>tengo l\'1</b>: risultato = cons(1, comuni([3], b)).</li>'
   +'<li>comuni([3], b): head = 3. conta(3, [1, 2, 3]) = 1 &gt; 0 vero → <b>tengo il 3</b>: risultato = cons(3, comuni([ ], b)).</li>'
   +'<li>comuni([ ], b): a è vuota → <b>caso base</b>, restituisco [ ].</li>'
   +'<li>Risalgo: comuni([3], b) = cons(3, [ ]) = [3].</li>'
   +'<li>comuni([1, 3], b) = cons(1, [3]) = [1, 3].</li>'
   +'<li>comuni([5, 1, 3], b) = comuni([1, 3], b) = [1, 3] (il 5 era saltato).</li>'
   +'<li>comuni([3, 5, 1, 3], b) = cons(3, [1, 3]) = <b>[3, 1, 3]</b>.</li></ol>'
   +'<p>Ricetta: caso base, condizione con la funzione di aiuto, cons + ricorsione oppure solo ricorsione.</p>' },
  ex:[
    { id:'e1', type:'text', q:'l = cons(1, cons(2, cons(3, emptylist()))). Quanto vale head(tail(l))?', a:['2'], hint:'tail(l) = [2, 3].', sol:'<ol class="pass"><li>Costruisco l dal cons più interno: cons(3, [ ]) = [3]; cons(2, [3]) = [2, 3]; cons(1, [2, 3]) = [1, 2, 3]. Quindi l = [1, 2, 3].</li><li>Calcolo prima la funzione più interna: tail(l) = tail([1, 2, 3]) = [2, 3] (tolgo il primo vagone, l\'1).</li><li>head([2, 3]) = il primo valore = <b>2</b>.</li></ol>' },
    { id:'e2', type:'text', q:code(String.raw`
int lung(list l) {
    if (empty(l)) return 0;
    return 1 + lung(tail(l));
}`)+'Con l = [1, 2, 3], quanto restituisce lung(l)?', a:['3'], hint:'Ogni chiamata aggiunge 1, la lista vuota vale 0.', sol:'Scendo:<ol class="pass"><li>lung([1, 2, 3]): non vuota → 1 + lung([2, 3])</li><li>lung([2, 3]): non vuota → 1 + lung([3])</li><li>lung([3]): non vuota → 1 + lung([ ])</li><li>lung([ ]): vuota → <b>caso base</b>, restituisce 0</li></ol>Risalgo:<ol class="pass"><li>lung([3]) = 1 + 0 = 1</li><li>lung([2, 3]) = 1 + 1 = 2</li><li>lung([1, 2, 3]) = 1 + 2 = <b>3</b></li></ol>' },
    { id:'e3', type:'text', q:code(String.raw`
list doppi(list l) {
    if (empty(l)) return emptylist();
    return cons(2 * head(l), doppi(tail(l)));
}`)+'Con l = [1, 2, 3], quale lista restituisce? (scrivi come [a, b, c])', a:['[2,4,6]','2,4,6'], hint:'Ogni elemento raddoppiato, stesso ordine.', sol:'Scendo:<ol class="pass"><li>doppi([1, 2, 3]) = cons(2 * 1, doppi([2, 3])) = cons(2, doppi([2, 3]))</li><li>doppi([2, 3]) = cons(2 * 2, doppi([3])) = cons(4, doppi([3]))</li><li>doppi([3]) = cons(2 * 3, doppi([ ])) = cons(6, doppi([ ]))</li><li>doppi([ ]) = [ ] (caso base)</li></ol>Risalgo:<ol class="pass"><li>doppi([3]) = cons(6, [ ]) = [6]</li><li>doppi([2, 3]) = cons(4, [6]) = [4, 6]</li><li>doppi([1, 2, 3]) = cons(2, [4, 6]) = <b>[2, 4, 6]</b></li></ol>' },
    { id:'e4', type:'text', q:code(String.raw`
list mistero(list l) {
    list r = emptylist();
    while (!empty(l)) {
        r = cons(head(l), r);
        l = tail(l);
    }
    return r;
}`)+'Con l = [1, 2, 3], cosa restituisce?', a:['[3,2,1]','3,2,1'], hint:'cons attacca davanti: il primo letto finisce in fondo.', sol:'Seguo il ciclo giro per giro:<ol class="pass"><li>Prima del ciclo: r = [ ], l = [1, 2, 3].</li><li>Giro 1: l non è vuota. head(l) = 1 → r = cons(1, [ ]) = [1]. l = tail(l) = [2, 3].</li><li>Giro 2: head(l) = 2 → r = cons(2, [1]) = [2, 1]. l = [3].</li><li>Giro 3: head(l) = 3 → r = cons(3, [2, 1]) = [3, 2, 1]. l = [ ].</li><li>Controllo !empty(l): l è vuota, quindi la condizione è falsa → esco dal ciclo e restituisco r.</li></ol>Risultato <b>[3, 2, 1]</b>: la lista al contrario. Con un ciclo iterativo e cons l\'ordine si inverte; con la ricorsione no.' },
    { id:'e5', type:'code', tag:'come allo scritto, 6 punti', q:'Si definisca una funzione RICORSIVA <code>list almenoK(list v, list conteggi, int k)</code> che restituisce gli elementi di v che compaiono almeno k volte nella lista conteggi, usando una funzione ITERATIVA <code>int conta(int x, list l)</code>. Si scriva il main che costruisce v = [5, 3, 17, 29] e conteggi = [5, 17, 5, 29, 17, 17], chiama almenoK(v, conteggi, 2) e stampa il risultato [5, 17].', hint:'È lo schema di comuni, con la condizione conta(head(v), conteggi) &gt;= k. Nel main ti serve anche una showlist tua.', sol:code(String.raw`
#include <stdio.h>
#include "element.h"
#include "list.h"

int conta(int x, list l) {
    int c = 0;
    while (!empty(l)) {
        if (head(l) == x)
            c++;
        l = tail(l);
    }
    return c;
}

list almenoK(list v, list conteggi, int k) {
    if (empty(v))
        return emptylist();
    if (conta(head(v), conteggi) >= k)
        return cons(head(v), almenoK(tail(v), conteggi, k));
    return almenoK(tail(v), conteggi, k);
}

void showlist(list l) {
    while (!empty(l)) {
        printf("%d ", head(l));
        l = tail(l);
    }
    printf("\n");
}

int main(void) {
    list v, c, r;
    v = cons(5, cons(3, cons(17, cons(29, emptylist()))));
    c = cons(5, cons(17, cons(5, cons(29, cons(17, cons(17, emptylist()))))));
    r = almenoK(v, c, 2);
    showlist(r);          /* 5 17 */
    freelist(v);
    freelist(c);
    freelist(r);
    return 0;
}`)+'<p><b>Svolgimento completo</b> con v = [5, 3, 17, 29], conteggi = [5, 17, 5, 29, 17, 17], k = 2.</p>'
   +'<p>1) Come lavora conta(5, conteggi), giro per giro:</p><ol class="pass">'
   +'<li>c = 0. head = 5, 5 == 5 → c = 1. Passo alla coda.</li>'
   +'<li>head = 17, 17 == 5 no → c resta 1.</li>'
   +'<li>head = 5, 5 == 5 → c = 2.</li>'
   +'<li>head = 29 no, head = 17 no, head = 17 no → c resta 2.</li>'
   +'<li>Lista vuota → esco dal while, restituisco <b>2</b>.</li></ol>'
   +'<p>Allo stesso modo: conta(3, conteggi) = 0, conta(17, conteggi) = 3 (posizioni 2, 5, 6), conta(29, conteggi) = 1.</p>'
   +'<p>2) La ricorsione, scendendo:</p><ol class="pass">'
   +'<li>almenoK([5, 3, 17, 29]): conta(5) = 2, e 2 &gt;= 2 vero → tengo 5: cons(5, almenoK([3, 17, 29])).</li>'
   +'<li>almenoK([3, 17, 29]): conta(3) = 0, e 0 &gt;= 2 falso → salto 3: almenoK([17, 29]).</li>'
   +'<li>almenoK([17, 29]): conta(17) = 3, e 3 &gt;= 2 vero → tengo 17: cons(17, almenoK([29])).</li>'
   +'<li>almenoK([29]): conta(29) = 1, e 1 &gt;= 2 falso → salto 29: almenoK([ ]).</li>'
   +'<li>almenoK([ ]): v vuota → caso base, [ ].</li></ol>'
   +'<p>3) Risalendo:</p><ol class="pass">'
   +'<li>almenoK([29]) = [ ]</li>'
   +'<li>almenoK([17, 29]) = cons(17, [ ]) = [17]</li>'
   +'<li>almenoK([3, 17, 29]) = [17]</li>'
   +'<li>almenoK([5, 3, 17, 29]) = cons(5, [17]) = <b>[5, 17]</b> → showlist stampa "5 17 ".</li></ol>'
   +'<p>Confronta con la soluzione del prof del 9 feb 2026 (almenoDue): è identica, con 2 al posto di k.</p>' }
  ],
  quaderno:[
    '<b>Primitive:</b> emptylist(), empty(l), head(l), tail(l), cons(x, l). showlist e member <b>non</b> sono primitive: se le usi le scrivi.',
    '<b>Costruire [a, b, c]:</b> <code>cons(a, cons(b, cons(c, emptylist())))</code>.',
    '<b>Ricetta ricorsiva (es. 1 scritto):</b> if empty → emptylist(); if condizione su head → cons(head, f(tail)); else → f(tail).',
    '<b>Iterativa (funzione di aiuto):</b> <code>while (!empty(l)) { ... head(l) ...; l = tail(l); }</code>.',
    '<b>Main:</b> include "element.h" e "list.h", crea le liste dell\'esempio, chiama, stampa, freelist.'
  ]
});
