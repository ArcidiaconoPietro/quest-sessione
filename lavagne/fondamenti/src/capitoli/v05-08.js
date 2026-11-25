/* Videolezioni dei capitoli 5-8 (formato in v01-04.js). */

/* ---------- 5 · FUNZIONI ---------- */
V('funzioni', 'Chiamare una funzione: cosa succede in memoria', [
  ['P', 'La firma'],
  ['<code>int quadrato(int x)</code>', 'Questa è la firma di una funzione. Si legge: la funzione quadrato riceve un intero, che dentro chiamerà x, e restituisce un intero.'],
  ['tipo restituito · nome · (parametri) · <code>void</code> = non restituisce niente', 'Prima c\'è il tipo restituito, poi il nome, poi tra parentesi i parametri. Se non restituisce niente si scrive void.'],
  ['prototipo <code>int quadrato(int x);</code> prima del main', 'Il prototipo, cioè la firma con il punto e virgola, va prima del main, così il compilatore la conosce quando main la usa.'],
  ['P', 'La chiamata, passo passo'],
  ['main: a = 3, r = ???', 'Nel main a vale 3, r non ha ancora un valore.'],
  ['<code>r = quadrato(a + 1);</code> → prima calcolo a + 1 = 3 + 1 = 4', 'Prima di chiamare la funzione si calcola l\'argomento: a più 1 fa 3 più 1, cioè 4.'],
  ['nasce il riquadro di quadrato: x = 4 (una copia)', 'Si entra in quadrato. In memoria nasce un riquadro nuovo, con x uguale a 4. È una copia del valore: x non è a.'],
  ['q = x · x = 4 · 4 = 16', 'Dentro, q vale x per x, cioè 4 per 4, 16.'],
  ['x = 0 → cambia solo la copia, a resta 3', 'Poi x diventa 0. Ma cambia solo la copia: la a del main resta 3.'],
  ['return q → restituisce 16 e il riquadro sparisce', 'return q restituisce 16 a chi ha chiamato. Il riquadro di quadrato sparisce, con x e q.'],
  ['r = 16 → printf → <b>3 16</b>', 'Il 16 va in r. La printf stampa a e r: 3 e 16. a non è cambiata.'],
  ['P', 'Passaggio per valore'],
  ['<code>raddoppia(k)</code> con k = 7 → n = 7 (copia)', 'Altro esempio: chiamo raddoppia con k uguale a 7. Il parametro n riceve una copia, 7.'],
  ['n = n · 2 = 7 · 2 = 14 → <b>dentro: 14</b>', 'Dentro, n diventa 7 per 2, cioè 14, e la funzione stampa dentro 14.'],
  ['la funzione finisce · k è ancora 7 → <b>fuori: 7</b>', 'La funzione finisce e n sparisce. Nel main k è ancora 7, quindi stampa fuori 7.'],
  ['<b>Regola:</b> la funzione lavora su copie dei valori', 'La regola: una funzione riceve copie dei valori. Cambiarle non cambia le variabili di chi l\'ha chiamata.'],
  ['P', 'Due funzioni insieme'],
  ['massimo(4, 9): 4 > 9 falso → return 9', 'massimo di 4 e 9: 4 è maggiore di 9? No, quindi restituisce 9.'],
  ['9 − 4 = 5 → stampa_riga(5) → i = 0,1,2,3,4 → <b>*****</b>', 'Poi 9 meno 4 fa 5, e stampa riga riceve 5. Il ciclo gira con i uguale a 0, 1, 2, 3, 4: cinque giri, cinque asterischi.'],
  ['a · 3 = 4 · 3 = 12 → massimo(12, 9): 12 > 9 → <b>12</b>', 'Ultima riga: a per 3 fa 4 per 3, 12. massimo di 12 e 9: 12 è maggiore, stampa 12.']
]);

/* ---------- 6 · RICORSIONE ---------- */
V('ricorsione', 'La ricorsione: scendere e risalire', [
  ['P', 'Le due parti di ogni funzione ricorsiva'],
  ['1) caso base: risposta subito, senza richiamarsi', 'Ogni funzione ricorsiva ha due parti. Primo: il caso base, un caso così semplice che la risposta si sa subito.'],
  ['2) passo ricorsivo: mi richiamo su un problema <b>più piccolo</b>', 'Secondo: il passo ricorsivo. La funzione richiama se stessa su un problema più piccolo e usa il risultato.'],
  ['<code>fatt(n): if (n <= 1) return 1; return n * fatt(n - 1);</code>', 'Esempio: il fattoriale. Se n è minore o uguale a 1 restituisce 1. Altrimenti restituisce n per fattoriale di n meno 1.'],
  ['P', 'fatt(3): si scende'],
  ['fatt(3): 3 ≤ 1? no → 3 · fatt(2), aspetto', 'fatt di 3. 3 è minore o uguale a 1? No. Deve calcolare 3 per fatt di 2, e resta in attesa.'],
  ['fatt(2): 2 ≤ 1? no → 2 · fatt(1), aspetto', 'Nuovo record di attivazione per fatt di 2. 2 minore o uguale a 1? No. Deve calcolare 2 per fatt di 1, in attesa.'],
  ['fatt(1): 1 ≤ 1? <b>sì</b> → caso base → return 1', 'fatt di 1. 1 minore o uguale a 1? Sì: è il caso base. Restituisce 1 senza richiamarsi.'],
  ['P', 'fatt(3): si risale'],
  ['fatt(2) = 2 · 1 = 2', 'Ora si risale. fatt di 2 riceve 1 e calcola 2 per 1, cioè 2.'],
  ['fatt(3) = 3 · 2 = 6', 'fatt di 3 riceve 2 e calcola 3 per 2, cioè 6.'],
  ['main: r = 6 → stampa <b>6</b>', 'Si torna al main, r vale 6 e viene stampato.'],
  ['P', 'Traccia come all\'esame: f(20, 3)'],
  ['<code>f(a, b): if (a < b) return a; return f(a - b, b + 1);</code>', 'Esercizio d\'esame. Se a è minore di b, restituisce a. Altrimenti si richiama con a meno b e b più 1.'],
  ['f(20, 3): 20 < 3 falso → f(20 − 3, 3 + 1) = f(17, 4)', 'f di 20 e 3: 20 è minore di 3? No. Mi richiamo con 20 meno 3, cioè 17, e 3 più 1, cioè 4.'],
  ['f(17, 4): falso → f(17 − 4, 4 + 1) = f(13, 5)', 'f di 17 e 4: 17 minore di 4? No. 17 meno 4 fa 13, 4 più 1 fa 5.'],
  ['f(13, 5): falso → f(13 − 5, 5 + 1) = f(8, 6)', 'f di 13 e 5: no. 13 meno 5 fa 8, 5 più 1 fa 6.'],
  ['f(8, 6): falso → f(8 − 6, 6 + 1) = f(2, 7)', 'f di 8 e 6: 8 minore di 6? No. 8 meno 6 fa 2, 6 più 1 fa 7.'],
  ['f(2, 7): 2 < 7 <b>vero</b> → caso base → return 2', 'f di 2 e 7: 2 è minore di 7, sì. Caso base: restituisce a, cioè 2.'],
  ['ogni chiamata restituisce quello che riceve → main stampa <b>2</b>', 'Risalendo, ogni chiamata restituisce lo stesso valore che riceve, quindi al main arriva 2.'],
  ['P', 'Record di attivazione (1 punto di teoria)'],
  ['creato nello <b>stack</b> a ogni chiamata, distrutto al return', 'Il record di attivazione è l\'area di memoria creata nello stack a ogni chiamata di funzione, e distrutta quando la funzione termina.'],
  ['contiene: parametri · variabili locali · indirizzo di ritorno · valore restituito', 'Contiene quattro cose: i parametri, le variabili locali, l\'indirizzo di ritorno e lo spazio per il valore restituito.'],
  ['politica LIFO: l\'ultimo creato è il primo distrutto', 'I record si impilano: l\'ultimo creato è il primo distrutto. Si chiama politica LIFO.']
]);

/* ---------- 7 · PUNTATORI ---------- */
V('puntatori', 'Puntatori: arrivare a una variabile dal suo indirizzo', [
  ['P', '& e *'],
  ['a abita all\'indirizzo 1000 e vale 1', 'Ogni variabile abita in una casella di memoria con un indirizzo. Diciamo che a abita all\'indirizzo 1000 e vale 1.'],
  ['<code>&a</code> = 1000 · <code>int *pa = &a;</code> → pa contiene 1000', 'E commerciale a vuol dire: l\'indirizzo di a, cioè 1000. pa è un puntatore: contiene 1000, quindi punta ad a.'],
  ['<code>*pa = 5;</code> → vado all\'indirizzo 1000 e ci scrivo 5 → a = 5', 'Asterisco pa vuol dire: vai all\'indirizzo scritto in pa. Asterisco pa uguale 5 va all\'indirizzo 1000 e ci scrive 5. Quindi a diventa 5, senza nominarla.'],
  ['P', 'scambia(&a, &b)'],
  ['a = 5 (@1000), b = 2 (@1004)', 'Ora a vale 5 e sta al 1000, b vale 2 e sta al 1004.'],
  ['chiamo scambia(&a, &b) → p = 1000, q = 1004', 'Chiamo scambia passando gli indirizzi. Dentro, p contiene 1000 e q contiene 1004.'],
  ['t = *p = valore al 1000 = 5', 't uguale asterisco p: il valore all\'indirizzo 1000, cioè 5.'],
  ['*p = *q → al 1000 metto il valore del 1004 (2) → a = 2', 'Asterisco p uguale asterisco q: all\'indirizzo 1000 metto il valore che c\'è al 1004, cioè 2. La a del main diventa 2.'],
  ['*q = t → al 1004 metto 5 → b = 5', 'Asterisco q uguale t: all\'indirizzo 1004 metto 5. La b del main diventa 5.'],
  ['printf → <b>2 5</b>: lo scambio resta', 'La funzione finisce, ma lo scambio resta, perché ha lavorato direttamente su a e b. Stampa 2 5.'],
  ['P', 'Valore o indirizzo? (esercizio guidato)'],
  ['<code>f(a, &b)</code> con a = 2, b = 10 · p = &b', 'Nel main a vale 2, b vale 10, e p punta a b. Chiamo f passando a per valore e b per indirizzo.'],
  ['x = copia di a = 2 → x = 2 + 1 = 3 (a resta 2)', 'x è una copia di a, vale 2. x uguale x più 1 fa 3. La a del main resta 2.'],
  ['*y = *y + x → b = 10 + 3 = 13', 'y punta a b. Asterisco y uguale asterisco y più x vuol dire b uguale 10 più 3, cioè 13.'],
  ['printf a, b, *p → <b>2 13 13</b>', 'La printf stampa a, cioè 2, b, cioè 13, e asterisco p, che è il valore di b, 13.'],
  ['*p = *p · 2 → b = 13 · 2 = 26 → <b>26</b>', 'Poi asterisco p uguale asterisco p per 2: b diventa 13 per 2, cioè 26.'],
  ['P', 'Più risultati da una funzione'],
  ['<code>dividi(17, 5, &q, &r)</code>', 'Una funzione può restituire più risultati con parametri puntatore. dividi riceve 17, 5 e gli indirizzi di q e r.'],
  ['*q = 17 / 5: 5 · 3 = 15 ≤ 17, 5 · 4 = 20 > 17 → 3', 'Asterisco q uguale 17 diviso 5 tra interi. 5 per 3 fa 15, che ci sta. 5 per 4 fa 20, troppo. Quindi 3.'],
  ['*r = 17 % 5 = 17 − 15 = 2 → stampa <b>3 2</b>', 'Asterisco r uguale 17 percento 5: 17 meno 15 fa 2. Il main stampa 3 e 2.']
]);

/* ---------- 8 · PIÙ FILE ---------- */
V('piu-file', 'Un progetto su più file', [
  ['P', 'Il menù e la cucina'],
  ['<b>.h</b> = il menù: prototipi e tipi', 'Il file punto h è il menù: dice quali funzioni esistono, con i prototipi, e definisce i tipi come le struct.'],
  ['<b>.c</b> = la cucina: il codice delle funzioni', 'Il file punto c con lo stesso nome è la cucina: contiene il codice vero delle funzioni.'],
  ['<code>#include "matematica.h"</code> in chi usa le funzioni', 'Chi usa le funzioni, per esempio main punto c, include il punto h con le virgolette.'],
  ['<code>&lt;stdio.h&gt;</code> sistema · <code>"mio.h"</code> file miei', 'Parentesi angolari per le librerie di sistema, virgolette per i file tuoi.'],
  ['P', 'Le guardie'],
  ['<code>#ifndef MATEMATICA_H</code> / <code>#define MATEMATICA_H</code> / … / <code>#endif</code>', 'In ogni punto h ci sono le guardie.'],
  ['1ª inclusione: MATEMATICA_H non esiste → passa e lo definisco', 'La prima volta che il file viene incluso, MATEMATICA_H non è definito: il contenuto passa, e MATEMATICA_H viene definito.'],
  ['2ª inclusione: esiste già → salto tutto → niente doppioni', 'La seconda volta MATEMATICA_H esiste già, quindi tutto il contenuto viene saltato. Così niente definizioni doppie.'],
  ['P', 'Compilare ed eseguire'],
  ['<code>gcc -Wall -o prog main.c matematica.c</code>', 'Si compilano tutti i file punto c insieme. I punto h no, vengono inclusi.'],
  ['massimo(quadrato(3), 5): quadrato(3) = 3 · 3 = 9', 'Il main stampa massimo di quadrato di 3 e 5. Prima quadrato di 3: 3 per 3 fa 9.'],
  ['massimo(9, 5): 9 > 5 vero → 9 → stampa <b>9</b>', 'Poi massimo di 9 e 5: 9 è maggiore di 5, quindi 9. Stampa 9.'],
  ['P', 'I tre errori tipici'],
  ['implicit declaration → manca l\'#include del .h', 'Implicit declaration vuol dire che usi una funzione che il compilatore non ha visto: manca l\'include del punto h.'],
  ['undefined reference → manca un .c nella compilazione', 'Undefined reference vuol dire che il prototipo c\'è, ma il codice no: non hai compilato il punto c insieme, o non è nel progetto.'],
  ['redefinition → mancano le guardie', 'Redefinition vuol dire che lo stesso punto h è stato incluso due volte: mancano le guardie.']
]);
