/* Il problema che apre ogni capitolo (regola di Pietro, 25/11):
   prima un caso concreto che con i capitoli precedenti NON sai risolvere, poi perché non ci riesci,
   poi lo strumento nuovo. In fondo: quali casi si risolvono così.
   PB(id, { caso, perche:[...], strumento, scene:[[lavagna, voce]...], uso:[[lavagna, voce]...] })
   Le scene aprono la videolezione, gli "uso" la chiudono. */
window.PB = (id, p) => { const ch = CH.find(c => c.id === id); if (ch) ch.problema = p; };

PB('primi-passi', {
  caso: '<p>Hai i voti <b>24, 18 e 30</b> e vuoi la media. Con la calcolatrice la fai: (24 + 18 + 30) / 3 = 72 / 3 = 24. Ma all\'esame la deve fare <b>il computer</b>, e domani con altri voti.</p>',
  perche: ['Il computer non capisce l\'italiano né la scrittura della calcolatrice: capisce solo istruzioni in un linguaggio preciso.', 'Non sai ancora dove "mettere" i numeri dentro il computer, né come fargli scrivere il risultato sullo schermo.'],
  strumento: 'Un <b>programma C</b>: le <b>variabili</b> tengono i numeri, un\'espressione fa il calcolo, <b>printf</b> stampa, e il <b>compilatore</b> traduce tutto per il computer.',
  scene: [
    ['P', 'Il problema'],
    ['voti 24, 18, 30 → media?', 'Partiamo da un problema concreto. Hai tre voti, 24, 18 e 30, e vuoi la media.'],
    ['a mano: (24 + 18 + 30) / 3 = 72 / 3 = 24', 'A mano lo sai fare: 24 più 18 più 30 fa 72, e 72 diviso 3 fa 24.'],
    ['ma deve farlo <b>il computer</b> → non capisce l\'italiano', 'Ma all\'esame il calcolo lo deve fare il computer. E il computer non capisce l\'italiano: non sai ancora come dirglielo, né dove mettere i numeri, né come fargli scrivere il risultato.'],
    ['serve: variabili + calcolo + printf + compilatore', 'Ti servono quattro cose: le variabili per tenere i numeri, un calcolo, printf per stampare, e il compilatore che traduce. Vediamole una alla volta.']
  ],
  uso: [
    ['ogni esercizio: <code>#include &lt;stdio.h&gt;</code> + <code>int main(void) { ... return 0; }</code>', 'Questo schema lo userai in ogni esercizio: include di stdio, poi main, poi return 0.'],
    ['stampare un risultato: printf con %d, %f, %c, %s', 'Ogni volta che devi mostrare un risultato usi printf, con il codice giusto per il tipo: percento d, percento f, percento c, percento s.'],
    ['consegna al PC: compilare con zero warning', 'E alla prova al PC compili sempre controllando che non ci siano warning.']
  ]
});

PB('complemento-a-2', {
  caso: '<p>Il computer ha 8 caselle che contengono solo <b>0 o 1</b>. 37 lo sai scrivere: 37 = 32 + 4 + 1 → <span class="mono">00100101</span>. Ma come scrivi <b>−37</b>? E come fa la macchina a calcolare <b>−37 − 7</b>, se sa solo sommare?</p>',
  perche: ['Nelle 8 caselle non c\'è posto per il segno "meno": ci sono solo 0 e 1.', 'Con il binario normale sai scrivere solo numeri da 0 in su, e sai solo sommare.'],
  strumento: 'Il <b>complemento a 2</b>: il primo bit pesa <b>−128</b>. Così i negativi si scrivono con gli stessi 0 e 1, e la sottrazione diventa una somma.',
  scene: [
    ['P', 'Il problema'],
    ['8 caselle, solo 0 o 1 · 37 = 32 + 4 + 1 → <span class="mono">00100101</span>', 'Il computer ha 8 caselle che contengono solo 0 o 1. 37 lo sai scrivere: 32 più 4 più 1, quindi 0 0 1 0 0 1 0 1.'],
    ['−37 = ??? · non c\'è una casella per il "meno"', 'Ma meno 37? Non c\'è nessuna casella per il segno meno. Con quello che sai, non lo puoi scrivere.'],
    ['−37 − 7 = ??? · la macchina sa solo sommare', 'E poi l\'esame ti chiede meno 37 meno 7, ma la macchina sa solo sommare.'],
    ['serve: il <b>complemento a 2</b> → primo bit = −128', 'La soluzione è il complemento a 2: il primo bit, invece di pesare più 128, pesa meno 128. Vediamo come funziona e poi rifacciamo il tema d\'esame.']
  ],
  uso: [
    ['esercizio 2 dello scritto: "a − b su 8 bit in complemento a 2"', 'Lo usi nell\'esercizio 2 dello scritto: un\'operazione su 8 bit in complemento a 2, con la verifica in decimale.'],
    ['scrivere un negativo · leggere un binario che inizia con 1 · riconoscere l\'overflow', 'In pratica serve a tre cose: scrivere un negativo, leggere un numero binario che inizia con 1, e riconoscere l\'overflow.']
  ]
});

PB('espressioni', {
  caso: '<p>Con quello che sai dal capitolo 1 scrivi la media di 7 e 2:</p>'+code(String.raw`
int a = 7, b = 2;
float m = (a + b) / 2;
printf("%f\n", m);`)+'<p>Ti aspetti <b>4.500000</b>. Il programma stampa <b>4.000000</b>. E se ti chiedo "n è pari?", con le operazioni che conosci non sai scriverlo.</p>',
  perche: ['Nel capitolo 1 non hai visto che il C ha <b>due divisioni diverse</b>, e sceglie quale usare guardando i tipi.', 'Non conosci ancora l\'operatore del resto, che serve per pari e dispari, né ++ e ? : che trovi nei "cosa stampa".'],
  strumento: 'Le regole delle espressioni: <b>int / int</b> è divisione intera, il <b>cast</b> <code>(float)</code> la rende con la virgola, <b>%</b> dà il resto, <b>++</b> e <b>? :</b>.',
  scene: [
    ['P', 'Il problema'],
    ['<code>float m = (a + b) / 2;</code> con a = 7, b = 2', 'Con quello che sai dal capitolo 1 scrivi la media di 7 e 2: m uguale a più b, diviso 2.'],
    ['ti aspetti 9 / 2 = 4.5 · stampa <b>4.000000</b>', 'Ti aspetti 4 virgola 5. Invece stampa 4 punto 0 0 0 0 0 0. Con quello che sai, non capisci perché.'],
    ['"n è pari?" → non sai scriverlo', 'E se ti chiedo di controllare se un numero è pari, non hai ancora un\'operazione per farlo.'],
    ['serve: le regole di / · % · cast · ++ · ? :', 'Ti servono le regole delle espressioni: le due divisioni, il resto, il cast, il più più e il punto interrogativo. Le vediamo una per una.']
  ],
  uso: [
    ['medie → cast <code>(float)</code> · pari, ultima cifra → %', 'Le userai per calcolare medie corrette con il cast, per controllare pari e dispari, e per prendere l\'ultima cifra con percento 10.'],
    ['esercizio 3 dello scritto ("cosa stampa")', 'E soprattutto nell\'esercizio 3 dello scritto, il cosa stampa, dove queste trappole escono sempre.']
  ]
});

PB('cicli', {
  caso: '<p>Vuoi la somma dei numeri da 1 a <b>n</b>, dove n lo scrive l\'utente quando il programma parte. Se n = 4 la somma è 1 + 2 + 3 + 4 = 10. Se n = 1000?</p>',
  perche: ['Con i capitoli 1-3 i numeri li scrivi tu nel codice: non sai leggere un numero da tastiera.', 'Dovresti scrivere <code>1 + 2 + 3 + … + 1000</code> a mano, e cambiare il programma ogni volta che cambia n.'],
  strumento: '<b>scanf</b> per leggere n, e un <b>ciclo</b> (for, while, do-while) che ripete <code>somma = somma + i</code> tante volte quanto serve.',
  scene: [
    ['P', 'Il problema'],
    ['somma da 1 a n · n lo scrive l\'utente', 'Il problema: vuoi la somma dei numeri da 1 a n, e n lo decide l\'utente quando il programma parte.'],
    ['n = 4 → 1 + 2 + 3 + 4 = 10 · n = 1000 → ???', 'Se n vale 4 la scrivi a mano: 1 più 2 più 3 più 4 fa 10. Ma se n vale 1000?'],
    ['non so leggere n · dovrei scrivere 1000 somme a mano', 'Con quello che sai non puoi: non sai leggere un numero da tastiera, e dovresti scrivere mille somme a mano.'],
    ['serve: scanf + un ciclo che ripete', 'Ti servono due cose: scanf per leggere n, e un ciclo che ripete la stessa istruzione tante volte quanto serve.']
  ],
  uso: [
    ['leggere da tastiera · ripetere un calcolo · scorrere dati', 'Userai i cicli ogni volta che devi ripetere: sommare, contare, cercare un massimo.'],
    ['al PC: ogni lettura da file è un ciclo · scritto: tracce giro per giro', 'Al PC ogni lettura da file è un ciclo, e allo scritto i cosa stampa si risolvono seguendo il ciclo giro per giro.']
  ]
});

PB('funzioni', {
  caso: '<p>Devi contare i divisori di 12, poi di 7, poi di 30. Con i cicli del capitolo 4 scrivi <b>tre volte lo stesso ciclo</b>, cambiando solo il numero. E il testo d\'esame ti dà questa riga da completare:</p>'+code(String.raw`int conta(int x, list l);`)+'<p>Con quello che sai, non sai cosa vuol dire né come scriverla.</p>',
  perche: ['Finora tutto il programma sta dentro main: non sai dare un nome a un pezzo di codice e riusarlo.', 'Non sai come un pezzo di codice riceve dei valori e restituisce un risultato.'],
  strumento: 'La <b>funzione</b>: un pezzo di programma con un nome, che riceve <b>parametri</b> e restituisce un valore con <b>return</b>.',
  scene: [
    ['P', 'Il problema'],
    ['divisori di 12, di 7, di 30 → 3 cicli uguali', 'Devi contare i divisori di 12, poi di 7, poi di 30. Con il capitolo 4 scrivi tre volte lo stesso ciclo.'],
    ['il testo dà <code>int conta(int x, list l);</code> → ???', 'E all\'esame il testo ti dà una riga come int conta, tra parentesi int x e list l. Con quello che sai, non sai cosa vuol dire.'],
    ['serve: la <b>funzione</b> (nome, parametri, return)', 'Ti serve la funzione: un pezzo di codice con un nome, che riceve dei valori e restituisce un risultato. Lo scrivi una volta e lo chiami quante volte vuoi.']
  ],
  uso: [
    ['ogni esercizio d\'esame = scrivere il corpo di una funzione con la firma data', 'L\'esame è fatto solo di funzioni: il testo ti dà la firma e tu scrivi il corpo.'],
    ['calcolo ripetuto · funzione di aiuto (es. conta)', 'Le usi ogni volta che un calcolo si ripete, e per le funzioni di aiuto come conta.']
  ]
});

PB('ricorsione', {
  caso: '<p>Il tema chiede: "si definisca una funzione <b>RICORSIVA</b> … senza cicli". Esempio piccolo: calcola il fattoriale 4! = 4 · 3 · 2 · 1 = 24 <b>senza usare for né while</b>.</p>',
  perche: ['Con il capitolo 4 l\'unico modo che conosci per ripetere è un ciclo, e qui è vietato.', 'Con il capitolo 5 sai scrivere funzioni, ma ognuna fa il suo lavoro una volta sola.'],
  strumento: 'La <b>ricorsione</b>: la funzione chiama <b>se stessa</b> su un problema più piccolo, fino a un <b>caso base</b> che si risolve subito.',
  scene: [
    ['P', 'Il problema'],
    ['4! = 4 · 3 · 2 · 1 = 24 · <b>senza cicli</b>', 'Il problema: calcola 4 fattoriale, cioè 4 per 3 per 2 per 1, che fa 24. Ma senza usare né for né while, come chiede il tema d\'esame.'],
    ['ripetere senza ciclo? → non so farlo', 'Con quello che sai, l\'unico modo di ripetere è un ciclo. Senza ciclo non sai come fare.'],
    ['osservo: 4! = 4 · 3! · 3! = 3 · 2! · … · 1! = 1', 'Però osserva: 4 fattoriale è 4 per 3 fattoriale. E 3 fattoriale è 3 per 2 fattoriale, e così via, fino a 1 fattoriale che vale 1.'],
    ['serve: la funzione che chiama se stessa → <b>ricorsione</b>', 'Quindi la funzione può chiamare se stessa su un numero più piccolo. Questa è la ricorsione.']
  ],
  uso: [
    ['esercizio 1 dello scritto: funzione RICORSIVA sulle liste (6 punti)', 'La userai nell\'esercizio 1 dello scritto, sei punti: una funzione ricorsiva sulle liste.'],
    ['esercizio 2: traccia delle chiamate · teoria: record di attivazione', 'E nell\'esercizio 2, quando ti chiedono la sequenza delle chiamate, e nella domanda di teoria sul record di attivazione.']
  ]
});

PB('puntatori', {
  caso: '<p>Con il capitolo 5 scrivi una funzione che scambia due variabili del main:</p>'+code(String.raw`
void scambia(int x, int y) {
    int t = x;  x = y;  y = t;
}
/* main: a = 1, b = 2; scambia(a, b); printf("%d %d", a, b); */`)+'<p>Ti aspetti <b>2 1</b>. Stampa <b>1 2</b>. E una funzione che restituisca quoziente <b>e</b> resto non la sai scrivere: return ne restituisce uno solo.</p>',
  perche: ['Dal capitolo 5: la funzione riceve <b>copie</b>. Scambia le copie x e y, mentre a e b del main restano uguali.', 'return restituisce un solo valore.'],
  strumento: 'I <b>puntatori</b>: passo alla funzione l\'<b>indirizzo</b> della variabile (<code>&amp;a</code>), e la funzione con <code>*</code> arriva fino all\'originale e lo cambia.',
  scene: [
    ['P', 'Il problema'],
    ['<code>scambia(a, b)</code> con a = 1, b = 2 → ti aspetti 2 1', 'Con il capitolo 5 scrivi una funzione scambia che riceve a e b e li scambia. Con a uguale 1 e b uguale 2, ti aspetti 2 1.'],
    ['x = 1, y = 2 (copie) → scambio le copie → a, b restano → <b>1 2</b>', 'Invece stampa 1 2. Perché? Dal capitolo 5: x e y sono copie. La funzione scambia le copie, e a e b del main non cambiano.'],
    ['quoziente <b>e</b> resto → return ne dà uno solo', 'Stesso problema se vuoi una funzione che restituisca quoziente e resto: return ne restituisce uno solo.'],
    ['serve: passare l\'<b>indirizzo</b> → puntatori', 'Ti serve un modo per dare alla funzione non il valore, ma l\'indirizzo della variabile. Così la funzione arriva all\'originale. Sono i puntatori.']
  ],
  uso: [
    ['una funzione deve cambiare una variabile del chiamante → parametro <code>int *x</code>', 'Li usi quando una funzione deve cambiare una variabile di chi la chiama.'],
    ['più risultati: al PC <code>int *dim</code> · scritto: "cosa stampa" con * e &amp;', 'E quando deve restituire più risultati: al PC la dimensione con int asterisco dim, e allo scritto nei cosa stampa pieni di asterischi e e commerciali.']
  ]
});

PB('piu-file', {
  caso: '<p>All\'esame consegni <b>element.h, shop.h, shop.c, main.c</b>, e main.c usa funzioni scritte in shop.c. Finora hai scritto tutto in un file solo. Se sposti <code>quadrato</code> in un altro file, compilando main.c ottieni:</p>'+code(String.raw`warning: implicit declaration of function 'quadrato'
undefined reference to 'quadrato'`),
  perche: ['main.c non "vede" il codice che sta in un altro file: il compilatore legge un file alla volta.', 'Non sai ancora come dire a main.c che la funzione esiste, né come compilare più file insieme.'],
  strumento: 'Il file <b>.h</b> con i prototipi (incluso con <code>#include "shop.h"</code>), il file <b>.c</b> con il codice, e la compilazione di <b>tutti i .c insieme</b>.',
  scene: [
    ['P', 'Il problema'],
    ['consegna: element.h · shop.h · shop.c · main.c', 'All\'esame consegni più file: element punto h, shop punto h, shop punto c e main punto c.'],
    ['sposto quadrato in un altro file → implicit declaration · undefined reference', 'Finora hai scritto tutto in un file. Se sposti una funzione in un altro file, compilando main ottieni due errori: implicit declaration e undefined reference.'],
    ['main.c non vede l\'altro file', 'Il motivo è che il compilatore legge un file alla volta: main punto c non sa che quella funzione esiste.'],
    ['serve: .h (prototipi) + #include + compilare tutti i .c', 'Ti servono il file punto h con i prototipi, l\'include in main, e la compilazione di tutti i punto c insieme.']
  ],
  uso: [
    ['ogni prova al PC: element.h · list.h/.c · modulo.h/.c · main.c', 'Lo userai in ogni prova al PC: la consegna è sempre divisa in questi file.'],
    ['leggere gli errori: implicit → include · undefined → .c · redefinition → guardie', 'E ti serve per capire gli errori di compilazione e sapere subito cosa manca.']
  ]
});

PB('array-stringhe', {
  caso: '<p>Hai i voti di <b>30 studenti</b>: vuoi il massimo e poi stamparli tutti. Con il capitolo 4 li leggi uno alla volta, ma ogni voto nuovo cancella il precedente. Dovresti creare <code>voto1, voto2, …, voto30</code>, e un ciclo non può scorrere 30 nomi diversi. E il nome "Rossi" in una variabile <code>char</code> non ci sta: un char tiene <b>una</b> lettera.</p>',
  perche: ['Una variabile tiene un solo valore.', 'Un ciclo non può cambiare il nome della variabile a ogni giro.'],
  strumento: 'L\'<b>array</b>: tante caselle con un nome solo e un numero, <code>voto[i]</code>, che il ciclo scorre. La <b>stringa</b> è un array di char che finisce con <code>\'\\0\'</code>.',
  scene: [
    ['P', 'Il problema'],
    ['30 voti → massimo e poi stamparli tutti', 'Il problema: hai i voti di 30 studenti, vuoi il massimo e poi stamparli tutti.'],
    ['una variabile → un valore · voto1 … voto30? un ciclo non li scorre', 'Una variabile tiene un solo valore. Dovresti creare voto1, voto2, fino a voto30, e un ciclo non può passare da un nome all\'altro.'],
    ['"Rossi" in un char? → un char = una lettera', 'E per i nomi: un char tiene una lettera sola, Rossi non ci sta.'],
    ['serve: <b>array</b> voto[i] · <b>stringa</b> = array di char + \\0', 'Ti serve l\'array: tante caselle con un nome solo e un numero, che il ciclo scorre con i. E la stringa, che è un array di caratteri.']
  ],
  uso: [
    ['tanti dati dello stesso tipo · ciclo <code>for (i = 0; i &lt; dim; i++)</code>', 'Usi gli array quando hai tanti dati dello stesso tipo da scorrere con un ciclo.'],
    ['nomi e testi → stringhe · al PC: vettori con dimensione logica', 'Le stringhe per nomi e testi. Al PC i dati si tengono in vettori con la loro dimensione logica.']
  ]
});

PB('struct-matrici', {
  caso: '<p>Ogni prodotto ha <b>id, nome, prezzo e quantità</b>. Con il capitolo 9 usi quattro array separati: <code>id[]</code>, <code>nome[][31]</code>, <code>prezzo[]</code>, <code>quantita[]</code>. Per ordinare per prezzo devi scambiare in <b>tutti e quattro</b> gli array insieme, e una funzione non può restituire "un prodotto", perché sono quattro valori.</p>',
  perche: ['Un array tiene dati tutti dello stesso tipo, mentre un prodotto mescola int, stringa e float.', 'return restituisce un valore solo.'],
  strumento: 'La <b>struct</b>: una scheda con più campi di tipi diversi, che si usa come una variabile sola (<code>p.prezzo</code>, oppure <code>q-&gt;prezzo</code> con un puntatore).',
  scene: [
    ['P', 'Il problema'],
    ['prodotto = id + nome + prezzo + quantità', 'Ogni prodotto ha quattro dati: id, nome, prezzo e quantità.'],
    ['4 array separati → ordinare = scambiare in 4 array', 'Con il capitolo 9 useresti quattro array separati. Ma per ordinare per prezzo dovresti scambiare in tutti e quattro, sempre insieme.'],
    ['una funzione che restituisce "un prodotto"? → sono 4 valori', 'E una funzione non può restituire un prodotto intero: sono quattro valori di tipi diversi.'],
    ['serve: la <b>struct</b> = una scheda con più campi', 'Ti serve la struct: una scheda che mette insieme campi di tipi diversi in una variabile sola.']
  ],
  uso: [
    ['ogni prova al PC inizia con "si definisca una struttura dati…"', 'Ogni prova al PC comincia chiedendo di definire una struct.'],
    ['array di struct · ordinamento con scambio intero · matrici per tabelle', 'Poi lavori con array di struct, che si scambiano intere con l\'uguale. Le matrici servono per le tabelle di numeri.']
  ]
});

PB('file', {
  caso: '<p>I prodotti sono in <b>prodotti.txt</b>, con 200 righe come <code>11 Smartphone_Eco E 299.99 15</code>. Con scanf (capitolo 4) dovresti <b>riscriverle tutte a mano</b> da tastiera ogni volta che esegui il programma.</p>',
  perche: ['scanf legge solo dalla tastiera.', 'Non sai ancora come aprire un file, leggerlo riga per riga e capire quando è finito.'],
  strumento: '<b>fopen</b> apre il file, <b>fscanf</b> legge come scanf ma dal file (e dice quanti campi ha letto), <b>fclose</b> lo chiude.',
  scene: [
    ['P', 'Il problema'],
    ['prodotti.txt · 200 righe · <code>11 Smartphone_Eco E 299.99 15</code>', 'Il problema: i dati sono in un file, prodotti punto txt, con 200 righe.'],
    ['scanf legge dalla tastiera → 200 righe a mano', 'Con scanf leggi solo dalla tastiera: dovresti riscrivere a mano 200 righe ogni volta che esegui il programma.'],
    ['serve: fopen · fscanf · fclose', 'Ti servono tre funzioni: fopen apre il file, fscanf legge come scanf ma dal file, fclose lo chiude.']
  ],
  uso: [
    ['Es. 1 della prova al PC: "leggere i dati dal file …"', 'Lo userai all\'inizio di ogni prova al PC, nell\'esercizio 1: leggere i dati dal file.'],
    ['righe con parti variabili · teoria: fprintf/fscanf contro fwrite/fread', 'Anche per le righe con un numero variabile di pezzi, e nella domanda di teoria su testo contro binario.']
  ]
});

PB('liste', {
  caso: '<p>Tema del 9 feb 2026: dalla lista v = [5, 3, 17, 29] tieni gli elementi che compaiono <b>almeno due volte</b> in [5, 17, 5, 29, 17, 17], e restituisci il risultato. Non sai quanti saranno. Con un array del capitolo 9 non sai quanto farlo grande, e non puoi restituire un array locale (capitolo 7: sparisce con la funzione).</p>',
  perche: ['Un array ha una dimensione fissa, decisa prima.', 'Un array locale sparisce quando la funzione finisce.', 'Il testo chiede una funzione ricorsiva che "usi le primitive dell\'ADT lista".'],
  strumento: 'La <b>lista</b>: un elemento alla volta attaccato davanti con <b>cons</b>, letto con <b>head</b> e <b>tail</b>, e la <b>ricorsione</b> del capitolo 6 che scorre la coda.',
  scene: [
    ['P', 'Il problema'],
    ['v = [5, 3, 17, 29] · tengo chi compare ≥ 2 volte in [5, 17, 5, 29, 17, 17]', 'Il tema del 9 febbraio: dalla lista 5, 3, 17, 29 tieni gli elementi che compaiono almeno due volte nell\'altra lista.'],
    ['quanti saranno? non lo so prima', 'Non sai prima quanti elementi avrà il risultato.'],
    ['array: dimensione fissa · array locale sparisce (cap. 7)', 'Con un array non sai quanto farlo grande, e un array locale sparisce quando la funzione finisce, come hai visto nel capitolo 7.'],
    ['serve: <b>lista</b> (cons, head, tail) + <b>ricorsione</b>', 'Ti serve la lista: si costruisce un elemento alla volta con cons e si legge con head e tail. Insieme alla ricorsione del capitolo 6 risolve l\'esercizio.']
  ],
  uso: [
    ['esercizio 1 dello scritto (6 punti): filtro ricorsivo su lista + conta iterativa + main', 'La userai nell\'esercizio 1 dello scritto, sei punti: un filtro ricorsivo su una lista, con una funzione iterativa di aiuto e il main.'],
    ['prova al PC: leggi_prodotti restituisce una list', 'E alla prova al PC, dove la lettura del file restituisce spesso una lista.']
  ]
});

PB('malloc-ordinamento', {
  caso: '<p>Tema del 7 gen 2026: <code>Ordine* leggi_ordini(char* fileName, int* dim)</code>. Non sai quanti ordini ci sono nel file. Con <code>Ordine v[100];</code>, se nel file ce ne sono 101 il programma si rompe, e comunque l\'array locale sparisce al return (capitolo 7). Poi devi restituirli <b>ordinati per prezzo</b>: con il capitolo 9 trovi il massimo, ma non sai mettere in ordine tutto il vettore.</p>',
  perche: ['Gli array del capitolo 9 hanno dimensione fissa e vivono nello stack, quindi spariscono.', 'Trovare il massimo non basta per ordinare.'],
  strumento: '<b>malloc</b>: memoria nel heap grande quanto serve, che resta fino a <b>free</b>. Il <b>bubble sort</b> con una funzione <b>confronta</b> per i criteri.',
  scene: [
    ['P', 'Il problema'],
    ['<code>Ordine* leggi_ordini(char* fileName, int* dim)</code> · quanti ordini? non si sa', 'Il tema del 7 gennaio chiede una funzione che legga gli ordini da un file e restituisca un vettore. Non sai quanti ordini ci sono.'],
    ['Ordine v[100] → con 101 ordini si rompe · e sparisce al return', 'Un array fisso da 100 si rompe se gli ordini sono 101, e comunque sparisce quando la funzione finisce.'],
    ['ordinare per prezzo → so trovare il massimo, non ordinare tutto', 'Poi li devi ordinare per prezzo. Con il capitolo 9 sai trovare il massimo, ma non mettere in ordine tutto il vettore.'],
    ['serve: <b>malloc</b> / <b>free</b> + <b>bubble sort</b>', 'Ti servono malloc, che prende memoria grande quanto serve e che resta, e un algoritmo di ordinamento come il bubble sort.']
  ],
  uso: [
    ['al PC: "restituisca un vettore dinamicamente allocato" + <code>int *dim</code>', 'Al PC lo usi ogni volta che il testo dice vettore dinamicamente allocato.'],
    ['"ordinato in modo decrescente … a parità …" · teoria: stack e heap', 'E quando chiede un vettore ordinato con più criteri. Allo scritto, nella domanda di teoria su stack e heap.']
  ]
});

PB('prova-pc', {
  caso: '<p>Hai tutti i pezzi: struct, file, liste, malloc, ordinamento. Ma hai <b>2 ore</b> per 4 esercizi. Se parti dall\'ordinamento non hai ancora dati per provarlo. Se a 5 minuti dalla fine il progetto non compila, vale quasi zero, anche con dentro cose giuste.</p>',
  perche: ['Sai scrivere i pezzi uno per uno, ma non hai ancora un piano per metterli in fila sotto tempo.'],
  strumento: 'La <b>ricetta delle 2 ore</b>: prima la lettura del file stampata e controllata, compilare dopo ogni funzione, test nel main, mai consegnare un progetto che non compila.',
  scene: [
    ['P', 'Il problema'],
    ['tutti i pezzi + 2 ore + 4 esercizi', 'Ormai hai tutti i pezzi. Il problema adesso è il tempo: due ore per quattro esercizi.'],
    ['parto dall\'ordinamento → niente dati per provarlo', 'Se parti dall\'ordinamento non hai ancora i dati per provarlo.'],
    ['non compila alla fine → vale quasi zero', 'E se alla fine il progetto non compila, vale quasi zero anche se dentro ci sono cose giuste.'],
    ['serve: un piano minuto per minuto', 'Ti serve un piano, minuto per minuto.']
  ],
  uso: [
    ['ogni prova al PC e ogni simulazione a tempo', 'Lo userai in ogni prova al PC e in ogni simulazione a tempo prima dell\'esame.']
  ]
});
