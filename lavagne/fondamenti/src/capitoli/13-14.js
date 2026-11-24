/* Capitoli 13-14: allocazione dinamica e ordinamento, ricetta della prova al PC. Programmi verificati con gcc -Wall. */

/* ================= 13 · MALLOC E ORDINAMENTO ================= */
CH.push({
  id:'malloc-ordinamento', n:13, short:'Allocazione dinamica e ordinamento', when:'piano del 16/12 · slide 19 (ordinamento) e 20 (allocazione dinamica)',
  title:'Allocazione dinamica (malloc, free) e ordinamento',
  serve:'<p class="big">Al PC quasi ogni funzione "restituisce un <b>vettore dinamicamente allocato</b>" e una vuole il vettore "<b>ordinato</b> in modo decrescente in base al prezzo, a parità…". Allo scritto la domanda di teoria del 13 feb 2025, del 7 gen 2026 e del 9 lug 2026 era proprio la gestione della memoria (stack, heap, malloc, free).</p>',
  exam:'7 gen 2026: <code>Ordine* leggi_ordini(char* fileName, int* dim)</code> ("non è noto a priori il numero di ordini, quindi il vettore dovrà essere dinamicamente allocato") e <code>Prodotto* prodotti_ordinati(list prodotti, int *dim)</code> "con qualsiasi algoritmo visto a lezione, ad eccezione di NaiveSort".',
  idea:{ title:'Lo stack è il banco, l\'heap è il magazzino', html:
    '<p>Le variabili normali stanno nello <b>stack</b>, il banco di lavoro di ogni funzione: quando la funzione finisce, il banco viene sgombrato. Per questo una funzione non può restituire un array locale.</p>'
   +'<p>Con <code>malloc</code> chiedi spazio nel <b>heap</b>, il magazzino: quello spazio resta tuo finché non lo restituisci con <code>free</code>, anche dopo che la funzione è finita. E puoi chiederne quanto ti serve <b>mentre il programma gira</b> (per esempio dopo aver contato le righe di un file).</p>'
   +code(String.raw`int *v = (int *) malloc(n * sizeof(int));   /* spazio per n interi */`)
   +'<div class="note">Si legge: "dammi n · (quanto è grande un int) byte, e trattali come un array di int". Da qui in poi <code>v[0]</code> … <code>v[n-1]</code> si usano come un array normale. Alla fine: <code>free(v);</code></div>' },
  widgets:[
    { type:'tracer', title:'Una funzione che restituisce un vettore e la sua dimensione', intro:'Da tastiera arrivano 6, −2, 9, 0. La funzione tiene solo i positivi. Guarda il riquadro "heap": sopravvive alla fine della funzione.',
      code:String.raw`
#include <stdio.h>
#include <stdlib.h>

int *leggi_positivi(int n, int *dim) {
    int *v, i, x;
    v = (int *) malloc(n * sizeof(int));
    *dim = 0;
    for (i = 0; i < n; i++) {
        scanf("%d", &x);
        if (x > 0) {
            v[*dim] = x;
            (*dim)++;
        }
    }
    return v;
}

int main(void) {
    int *p, d, i;
    p = leggi_positivi(4, &d);
    for (i = 0; i < d; i++)
        printf("%d ", p[i]);
    printf("(%d)\n", d);
    free(p);
    return 0;
}`,
      steps:[
        { l:20, f:[['main',{p:'???',d:'???'}]], say:'main chiama leggi_positivi(4, &amp;d): al massimo 4 numeri; la dimensione logica tornerà dentro d (parametro puntatore, capitolo 7).' },
        { l:6, f:[['main',{p:'???',d:'???'}],['leggi_positivi',{n:'4',dim:'indirizzo di d',v:'5000 (heap)',i:'???',x:'???'}]], heap:{'4 int a partire da 5000':'?  ?  ?  ?'}, say:'malloc prende nel heap lo spazio per 4 int (dimensione fisica 4) e restituisce l\'indirizzo, che va in v.' },
        { l:7, f:[['main',{p:'???',d:'0'}],['leggi_positivi',{n:'4',dim:'indirizzo di d',v:'5000 (heap)',i:'???',x:'???'}]], heap:{'4 int a partire da 5000':'?  ?  ?  ?'}, say:'*dim = 0: la d del main parte da 0 (nessun elemento usato).' },
        { l:12, f:[['main',{p:'???',d:'1'}],['leggi_positivi',{n:'4',dim:'indirizzo di d',v:'5000 (heap)',i:'0',x:'6'}]], heap:{'4 int a partire da 5000':'6  ?  ?  ?'}, say:'Legge 6, positivo: v[0] = 6 e (*dim)++ porta d a 1. Le parentesi in (*dim)++ servono: prima vado a d, poi aumento.' },
        { l:10, f:[['main',{p:'???',d:'1'}],['leggi_positivi',{n:'4',dim:'indirizzo di d',v:'5000 (heap)',i:'1',x:'-2'}]], heap:{'4 int a partire da 5000':'6  ?  ?  ?'}, say:'Legge −2: non positivo, salto.' },
        { l:12, f:[['main',{p:'???',d:'2'}],['leggi_positivi',{n:'4',dim:'indirizzo di d',v:'5000 (heap)',i:'2',x:'9'}]], heap:{'4 int a partire da 5000':'6  9  ?  ?'}, say:'Legge 9: v[1] = 9, d = 2.' },
        { l:15, f:[['main',{p:'???',d:'2'}],['leggi_positivi',{n:'4',dim:'indirizzo di d',v:'5000 (heap)',i:'4',x:'0'}]], heap:{'4 int a partire da 5000':'6  9  ?  ?'}, say:'Legge 0: salto. Ciclo finito. Restituisco v, cioè l\'indirizzo 5000.' },
        { l:20, f:[['main',{p:'5000 (heap)',d:'2'}]], heap:{'4 int a partire da 5000':'6  9  ?  ?'}, say:'Il record di leggi_positivi è sparito, ma il blocco nel heap no: p lo punta. Dimensione fisica 4, logica 2.' },
        { l:23, f:[['main',{p:'5000 (heap)',d:'2',i:'2'}]], heap:{'4 int a partire da 5000':'6  9  ?  ?'}, out:'6 9 (2)\n', say:'Stampo solo i primi d elementi.' },
        { l:24, f:[['main',{p:'5000 (liberato)',d:'2',i:'2'}]], out:'6 9 (2)\n', say:'free(p) restituisce il blocco al magazzino. Da qui p non va più usato.' }
      ] },
    { type:'tracer', title:'Bubble sort su [5, 1, 4, 2]', intro:'Confronta due vicini alla volta e li scambia se sono nell\'ordine sbagliato. Dopo ogni giro esterno il più grande rimasto è arrivato in fondo.',
      code:String.raw`
#include <stdio.h>

void bubble_sort(int v[], int n) {
    int i, j, t;
    for (i = 0; i < n - 1; i++)
        for (j = 0; j < n - 1 - i; j++)
            if (v[j] > v[j + 1]) {
                t = v[j];
                v[j] = v[j + 1];
                v[j + 1] = t;
            }
}

int main(void) {
    int a[4] = {5, 1, 4, 2};
    int i;
    bubble_sort(a, 4);
    for (i = 0; i < 4; i++)
        printf("%d ", a[i]);
    printf("\n");
    return 0;
}`,
      steps:[
        { l:17, f:[['main',{}]], arr:[{n:'a',v:['5','1','4','2']}], say:'Ordino a in modo crescente.' },
        { l:7, f:[['main',{}],['bubble_sort',{n:'4',i:'0',j:'0'}]], arr:[{n:'a',v:['5','1','4','2'],hl:[0,1]}], say:'Giro i = 0. Confronto v[0] = 5 e v[1] = 1: 5 &gt; 1, vanno scambiati.' },
        { l:10, f:[['main',{}],['bubble_sort',{n:'4',i:'0',j:'0',t:'5'}]], arr:[{n:'a',v:['1','5','4','2'],hl:[0,1]}], say:'Scambio con la variabile di appoggio t (servono 3 assegnazioni).' },
        { l:10, f:[['main',{}],['bubble_sort',{n:'4',i:'0',j:'1',t:'5'}]], arr:[{n:'a',v:['1','4','5','2'],hl:[1,2]}], say:'j = 1: 5 &gt; 4, scambio.' },
        { l:10, f:[['main',{}],['bubble_sort',{n:'4',i:'0',j:'2',t:'5'}]], arr:[{n:'a',v:['1','4','2','5'],hl:[2,3]}], say:'j = 2: 5 &gt; 2, scambio. Fine del giro: il 5, il più grande, è in fondo.' },
        { l:7, f:[['main',{}],['bubble_sort',{n:'4',i:'1',j:'0',t:'5'}]], arr:[{n:'a',v:['1','4','2','5'],hl:[0,1]}], say:'Giro i = 1 (si arriva solo fino a n − 1 − i, l\'ultimo è già a posto). 1 &gt; 4? No.' },
        { l:10, f:[['main',{}],['bubble_sort',{n:'4',i:'1',j:'1',t:'4'}]], arr:[{n:'a',v:['1','2','4','5'],hl:[1,2]}], say:'j = 1: 4 &gt; 2, scambio.' },
        { l:7, f:[['main',{}],['bubble_sort',{n:'4',i:'2',j:'0',t:'4'}]], arr:[{n:'a',v:['1','2','4','5'],hl:[0,1]}], say:'Giro i = 2: 1 &gt; 2? No. Fine.' },
        { l:20, f:[['main',{i:'4'}]], arr:[{n:'a',v:['1','2','4','5']}], out:'1 2 4 5 \n', say:'Ordinato. La funzione ha modificato l\'array del main (capitolo 9).' }
      ] }
  ],
  why:[
    { easy:true, f:'malloc(n * sizeof(tipo))', t:'malloc conta in byte. sizeof(int) dice quanti byte è grande un int (di solito 4), così non devi saperlo tu. Per una struct: <code>malloc(n * sizeof(Prodotto))</code>.' },
    { easy:true, f:'Ogni malloc ha il suo free', t:'Il magazzino non si svuota da solo. Se non liberi, la memoria resta occupata finché il programma finisce (memory leak). L\'esercizio 4 della prova al PC chiede esplicitamente la "de-allocazione memoria".' },
    { easy:true, f:'realloc(v, nuova_dim * sizeof(tipo)) allarga un blocco', t:'Serve quando non sai quanti elementi arriveranno: parti piccolo e allarghi. Restituisce il nuovo indirizzo, quindi si scrive <code>v = realloc(v, ...)</code>.' },
    { easy:true, f:'Ordinare con più criteri: una funzione di confronto', t:'Scrivi <code>int confronta(Prodotto a, Prodotto b)</code> che restituisce un numero negativo se a deve venire prima, positivo se dopo. Dentro: prima il criterio principale, poi, solo a parità, il secondo, poi il terzo. Nel bubble sort cambi solo la condizione dello scambio.' },
    { easy:false, f:'Quanto è veloce ogni algoritmo (bubble sort, selection sort, merge sort, quick sort)', t:'Per il 18 basta saperne scrivere bene uno (il bubble sort qui sopra) e adattarlo alle struct. Le complessità segnale a memoria dalla slide 19 se vuoi la domanda di teoria completa.' }
  ],
  warn:{ title:'Due errori che fanno crashare', html:'<p>1) Usare un puntatore <b>dopo</b> free. 2) Scrivere oltre la dimensione chiesta a malloc (per esempio v[4] con spazio per 4). Nessuno dei due dà errore di compilazione: il programma si comporta in modo strano o si blocca.</p>' },
  guided:{ title:'L\'ordinamento del tema del 7 gennaio 2026', intro:'<p>"Vettore di prodotti ordinato in modo <b>decrescente</b> in base al prezzo; a parità di prezzo, prima i prodotti con <b>meno</b> elementi in magazzino; a ulteriore parità, <b>crescente</b> rispetto all\'ID."</p>'+code(String.raw`
int confronta(Prodotto a, Prodotto b) {
    if (a.prezzo != b.prezzo)
        return (a.prezzo > b.prezzo) ? -1 : 1;
    if (a.quantita != b.quantita)
        return (a.quantita < b.quantita) ? -1 : 1;
    return (a.id < b.id) ? -1 : 1;
}
/* nel bubble sort: if (confronta(v[j], v[j + 1]) > 0) scambio */`), steps:[
      { h:'Prodotti: A (id 11, 299.99 €, 15 pezzi) e B (id 12, 1199 €, 8 pezzi). Chi viene prima?', type:'choice', opts:['A','B'], ans:1, ok:'Giusto: prezzo decrescente, il più caro va prima.', bad:'Il primo criterio è il prezzo, dal più alto al più basso.' },
      { h:'A (id 11, 299.99, 15 pezzi) e C (id 14, 299.99, 5 pezzi). Chi viene prima?', type:'choice', opts:['A','C'], ans:1, ok:'Sì: stesso prezzo, quindi conta la quantità, e prima chi ne ha meno.', bad:'Prezzi uguali: si passa al secondo criterio, meno pezzi in magazzino.' },
      { h:'A (id 11) e D (id 13), entrambi 299.99 € e 15 pezzi. Chi viene prima?', type:'choice', opts:['A','D'], ans:0, ok:'Giusto: terzo criterio, ID crescente.', bad:'Tutto uguale tranne l\'ID: si va in ordine crescente di ID.' },
      { h:'Ordina B, A, C, D: scrivi gli id nell\'ordine finale, separati da virgola', type:'text', ans:['12,14,11,13'], ok:'Perfetto: è esattamente quello che stampa il programma.', bad:'Prima il più caro (12). Poi tra i tre da 299.99: meno pezzi (14), poi ID crescente (11, 13).' }
    ], done:'<b>Fatto!</b> Ordine: 12, 14, 11, 13. Lo schema è sempre lo stesso: un if per criterio, nell\'ordine del testo, e si passa al successivo solo a parità.' },
  ex:[
    { id:'e1', type:'choice', q:'Spazio per n struct Ordine nel heap:', opts:['Ordine v[n];','Ordine *v = (Ordine *) malloc(n * sizeof(Ordine));','Ordine *v = malloc(n);'], a:1, hint:'Servono n volte la grandezza di un Ordine.', sol:'<code>malloc(n * sizeof(Ordine))</code>. <code>malloc(n)</code> darebbe solo n byte.' },
    { id:'e2', type:'choice', q:'Dove stanno le variabili locali e dove la memoria presa con malloc?', opts:['Tutte e due nello stack','Locali nello stack, malloc nel heap','Locali nel heap, malloc nello stack'], a:1, hint:'Stack = banco della funzione, heap = magazzino.', sol:'Locali (e parametri) nello <b>stack</b>, nei record di attivazione; malloc nel <b>heap</b>. Il codice del programma sta in una terza area ("area codice").' },
    { id:'e3', type:'text', q:'Dopo il primo giro esterno del bubble sort crescente su [3, 8, 2, 6], com\'è l\'array? (scrivi come 1,2,3,4)', a:['3,2,6,8'], hint:'Confronta 3-8, poi 8-2, poi 8-6, scambiando quando serve.', sol:'3-8 ok → 8-2 scambio [3, 2, 8, 6] → 8-6 scambio [3, 2, 6, 8]. Risposta <b>3, 2, 6, 8</b>: l\'8 è arrivato in fondo.' },
    { id:'e4', type:'code', tag:'al PC', q:'Scrivi <code>Prodotto *sopra_soglia(Prodotto v[], int dim, float soglia, int *dimRes)</code> che restituisce un vettore dinamico con i prodotti di prezzo maggiore di soglia, e la sua dimensione in *dimRes. (È lo schema di ordini_sopra_soglia del tema.)', hint:'Primo modo semplice: malloc di dim elementi (il caso peggiore), poi copi quelli buoni contando con *dimRes.', sol:code(String.raw`
Prodotto *sopra_soglia(Prodotto v[], int dim, float soglia, int *dimRes) {
    Prodotto *res;
    int i;
    res = (Prodotto *) malloc(dim * sizeof(Prodotto));
    *dimRes = 0;
    for (i = 0; i < dim; i++) {
        if (v[i].prezzo > soglia) {
            res[*dimRes] = v[i];      /* le struct si copiano con = */
            (*dimRes)++;
        }
    }
    return res;
}`)+'<p>Chi chiama poi farà <code>free(res)</code>. Variante più fine: prima conti quanti sono, poi fai malloc esattamente di quella dimensione.</p>' }
  ],
  quaderno:[
    '<b>Vettore dinamico:</b> <code>T *v = (T *) malloc(n * sizeof(T));</code> … <code>free(v);</code>',
    '<b>Restituire vettore + dimensione:</b> <code>T *f(..., int *dim)</code>, dentro <code>*dim = 0;</code> e <code>(*dim)++</code>.',
    '<b>Stack</b> = variabili locali e record di attivazione (spariscono). <b>Heap</b> = malloc (resta fino a free). <b>Area codice</b> = le istruzioni.',
    '<b>Bubble sort:</b> due for, <code>j &lt; n - 1 - i</code>, scambio con t.',
    '<b>Più criteri:</b> funzione confronta con un if per criterio; nel sort scambio se confronta(v[j], v[j+1]) &gt; 0.'
  ]
});

/* ================= 14 · LA PROVA AL PC ================= */
CH.push({
  id:'prova-pc', n:14, short:'La prova al PC: la ricetta', when:'piano del 19/12 (prima prova a tempo) e fase 4',
  title:'La prova al PC: come prendere almeno 11 su 20',
  serve:'<p class="big">Hai 2 ore, slide e appunti ammessi, niente internet. Servono <b>11 punti su 20</b>. Non serve finire tutto: serve consegnare un progetto <b>che compila</b> con le prime parti fatte bene e provate nel main.</p>',
  exam:'struttura fissa (7 gen 2026): Esercizio 1 strutture dati e lettura dei file · Esercizio 2 ordinamento · Esercizio 3 funzioni di calcolo e filtro · Esercizio 4 stampe nel main e free. "Il main non è opzionale; i test richiesti vanno implementati."',
  idea:{ title:'Prima le fondamenta, poi i piani', html:
    '<p>Gli esercizi sono in fila come i piani di una casa: senza la lettura dei file (Esercizio 1) non hai dati per provare niente del resto. Quindi l\'Esercizio 1 si fa per primo e si fa bene, anche a costo di lasciare indietro l\'ultimo.</p>'
   +'<div class="note"><b>Regola d\'oro:</b> compila spesso (ogni funzione nuova). Un progetto che non compila vale quasi zero, anche se dentro ci sono cose giuste. Se una funzione non ti riesce, lasciala che compila (anche incompleta) e passa avanti.</div>' },
  widgets:[
    { type:'recipe', title:'Le 2 ore, minuto per minuto', steps:[
      { h:'0-10 min · Leggi tutto e guarda i file', html:'<p>Leggi il testo intero. Apri prodotti.txt e ordini.txt e guarda <b>esattamente</b> com\'è fatta una riga (spazi, trattini, quanti campi). Segna i nomi delle funzioni e le firme: vanno copiate identiche.</p>' },
      { h:'10-20 min · Prepara il progetto', html:'<p>Crea i file come chiede il testo: element.h, list.h / list.c (te li danno), modulo.h / modulo.c, main.c. Copia dalla tua RACCOLTA_C lo scheletro pronto (sotto). <b>Compila subito</b> il progetto vuoto.</p>' },
      { h:'20-55 min · Esercizio 1: struct e lettura', html:'<p>Scrivi le struct in element.h. Scrivi la funzione di lettura (schema del capitolo 11). Nel main: leggi e <b>stampa</b> quello che hai letto. Finché la stampa non è identica al file, non andare avanti.</p>' },
      { h:'55-75 min · Esercizio 2: ordinamento', html:'<p>Funzione confronta con i criteri del testo + bubble sort (capitolo 13). Prova nel main stampando il vettore ordinato.</p>' },
      { h:'75-105 min · Esercizio 3: le funzioni di calcolo', html:'<p>Sono quasi sempre: un calcolo su un elemento (es. valore di un ordine), un filtro che restituisce un vettore dinamico (sopra soglia), un conteggio. Una alla volta, ognuna provata nel main.</p>' },
      { h:'105-120 min · Esercizio 4 e consegna', html:'<p>Stampe finali richieste e <b>free</b> di tutto (freelist per le liste, free per i vettori). Rebuild All: zero errori e zero warning. Commento in cima a ogni file con nome, cognome, matricola e numero della prova.</p>' }
    ] },
    { type:'html', eyebrow:'Da copiare in RACCOLTA_C prima dell\'esame', title:'Lo scheletro della lettura in lista', html:
      '<p>È la funzione che c\'è in tutte le prove: legge un file di testo e restituisce una lista di struct. Cambi solo la struct e la stringa di formato.</p>'
     +code(String.raw`
/* element.h */
#ifndef ELEMENT_H
#define ELEMENT_H
typedef struct {
    int id;
    char nome[31];
    char categoria;
    float prezzo;
    int quantita;
} Prodotto;
typedef Prodotto element;
#endif

/* shop.c */
#include <stdio.h>
#include <stdlib.h>
#include "element.h"
#include "list.h"
#include "shop.h"

list leggi_prodotti(char *fileName) {
    FILE *f;
    Prodotto p;
    list l = emptylist();
    f = fopen(fileName, "r");
    if (f == NULL) {
        printf("Errore apertura %s\n", fileName);
        return emptylist();
    }
    while (fscanf(f, "%d %s %c %f %d", &p.id, p.nome, &p.categoria,
                  &p.prezzo, &p.quantita) == 5) {
        l = cons(p, l);
    }
    fclose(f);
    return l;
}`)
     +'<p>Nota <code>" %c"</code>: per leggere un singolo carattere dopo uno spazio, lo spazio nel formato prima di %c salta gli spazi. Qui c\'è già lo spazio dopo <code>%s</code>, quindi va bene. Con cons in un ciclo la lista esce al contrario rispetto al file: di solito il testo lo accetta; se chiede lo stesso ordine, si inverte alla fine.</p>' }
  ],
  why:[
    { easy:true, f:'Compilare dopo ogni funzione', t:'Se compili dopo 5 funzioni e hai 30 errori, non sai da dove vengono. Se compili dopo ognuna, l\'errore è per forza in quella appena scritta.' },
    { easy:true, f:'Stampare quello che hai letto prima di andare avanti', t:'Se la lettura è sbagliata, tutti i calcoli dopo sono sbagliati anche se il codice è giusto, e non capisci perché.' },
    { easy:true, f:'Il main con i test vale punti', t:'Il testo dice "realizzare nel main opportuni test". Ogni funzione che scrivi va chiamata e il risultato stampato, altrimenti per il correttore non è provata.' }
  ],
  guided:{ title:'Scelte sotto pressione', steps:[
      { h:'Sono passati 70 minuti e la funzione di ordinamento non funziona. Cosa fai?', type:'choice', opts:['Continuo finché non va, anche se ci metto un\'ora','La lascio che compila (anche imperfetta), la segno e passo all\'Esercizio 3','Cancello tutto e ricomincio'], ans:1, ok:'Giusto: i punti dell\'Esercizio 3 valgono quanto quelli che stai inseguendo. Ci torni se avanza tempo.', bad:'Il tempo è la risorsa più scarsa. Un pezzo incompleto che compila non fa perdere il resto.' },
      { h:'Mancano 5 minuti e il progetto ha un errore di compilazione in una funzione dell\'Esercizio 3. Cosa fai?', type:'choice', opts:['Consegno così','Commento la funzione rotta (e la sua chiamata nel main) e consegno un progetto che compila','Riscrivo la funzione'], ans:1, ok:'Esatto: un progetto che compila con 3 esercizi su 4 vale molto più di uno che non compila.', bad:'Un progetto che non compila non si può provare: perderesti anche i punti delle parti giuste.' },
      { h:'Il testo dice <code>float valore_ordine(Ordine o, list prodotti)</code>. Tu preferiresti passare un puntatore. Cosa fai?', type:'choice', opts:['Cambio la firma','Uso esattamente la firma del testo'], ans:1, ok:'Sempre la firma del testo: il correttore la cerca così.', bad:'Le firme si copiano identiche.' }
    ], done:'<b>Fatto!</b> Strategia: Esercizio 1 perfetto, compilare sempre, test nel main per ogni funzione, mai consegnare un progetto che non compila.' },
  ex:[
    { id:'e1', type:'choice', q:'Qual è la prima cosa da fare dopo aver letto il testo?', opts:['Scrivere l\'ordinamento','Aprire i file di esempio e guardare come sono fatte le righe','Scrivere il main finale'], a:1, hint:'Tutto parte dalla lettura dei file.', sol:'Guardare i file: il formato di fscanf dipende da come sono fatte le righe (spazi, trattini, numero di campi).' },
    { id:'e2', type:'choice', q:'Quale di questi warning va corretto prima di consegnare?', opts:['Nessuno, i warning non contano','Tutti: il testo chiede "verificare l\'assenza di warning"','Solo quelli rossi'], a:1, hint:'Leggi l\'avvertenza del testo.', sol:'Tutti. Spesso un warning è un errore vero (es. scanf senza &amp;, = al posto di ==).' },
    { id:'e3', type:'code', tag:'simulazione, 2 ore', q:'Fai la prova al PC del <b>7 gennaio 2026</b> a tempo (file in MATERIALI/Fondamenti: "TEMA Prova al PC 7 gennaio 2026"). Timer 2 ore, solo slide e tuoi appunti, niente internet. Poi confronta con la soluzione del prof e dai un punteggio onesto su 20.', hint:'Segui le 2 ore minuto per minuto qui sopra. Comincia dallo scheletro della lettura.', sol:'<p>La soluzione ufficiale è nello stesso PDF, dopo il testo. Quando hai finito, scrivi al tutor: il punteggio che ti dai, quali esercizi hai completato e dove ti sei bloccato. Da lì si preparano le schede sugli errori.</p>' }
  ],
  quaderno:[
    '<b>Ordine:</b> leggo testo e file → progetto che compila → Es. 1 (struct + lettura + stampa) → Es. 2 → Es. 3 → Es. 4 e free.',
    '<b>Compilo dopo ogni funzione.</b> Rebuild All finale: zero errori, zero warning.',
    '<b>Firme identiche al testo.</b> Test nel main per ogni funzione.',
    '<b>Se mi blocco:</b> lascio la funzione che compila e vado avanti. Mai consegnare un progetto che non compila.',
    '<b>RACCOLTA_C:</b> scheletro lettura in lista, lettura in vettore dinamico, bubble sort con confronta, showlist, free.'
  ]
});
