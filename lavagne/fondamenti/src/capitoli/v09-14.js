/* Videolezioni dei capitoli 9-14 (formato in v01-04.js). */

/* ---------- 9 · ARRAY E STRINGHE ---------- */
V('array-stringhe', 'Array e stringhe, casella per casella', [
  ['P', 'Un array'],
  ['<code>int voti[5] = {24, 18, 30, 27, 21};</code>', 'Un array è una fila di caselle dello stesso tipo. Questo ha 5 interi.'],
  ['indici 0 1 2 3 4 · voti[5] <b>non esiste</b>', 'Le caselle sono numerate da 0: voti di 0, 1, 2, 3, 4. La casella 5 non esiste, perché partendo da 0 l\'ultima è 5 meno 1, cioè 4.'],
  ['P', 'Il massimo, giro per giro'],
  ['max = v[0] = 24', 'Per trovare il massimo parto dicendo che il massimo è il primo elemento, 24.'],
  ['i = 1: 18 > 24? no → max = 24', 'i uguale 1: 18 è maggiore di 24? No, max resta 24.'],
  ['i = 2: 30 > 24? sì → max = 30', 'i uguale 2: 30 è maggiore di 24? Sì, max diventa 30.'],
  ['i = 3: 27 > 30? no · i = 4: 21 > 30? no', 'i uguale 3: 27 maggiore di 30? No. i uguale 4: 21 maggiore di 30? No.'],
  ['i = 5: 5 &lt; 5 falso → esco → <b>max = 30</b>', 'i uguale 5: 5 minore di 5 è falso, esco. Il ciclo si ferma prima di toccare la casella 5. Il massimo è 30.'],
  ['P', 'Una stringa'],
  ['<code>char nome[] = "Pia";</code> → P · i · a · \\0 → <b>4</b> caselle', 'Una stringa è un array di char che finisce con il terminatore barra zero. Pia ha 3 lettere, più il terminatore, quindi 4 caselle.'],
  ['strlen("Pia") = caratteri prima di \\0 = 3', 'strlen conta i caratteri prima del terminatore: 3.'],
  ['uguali? <code>strcmp(a, b) == 0</code> · copiare: <code>strcpy(dest, src)</code>', 'Per sapere se due stringhe sono uguali si usa strcmp uguale uguale zero. Per copiare si usa strcpy, non l\'uguale.'],
  ['P', 'Stringhe come nello scritto'],
  ['s = "casa" · strcpy(t, s) → t = "casa"', 's vale casa. strcpy copia s in t, carattere per carattere: anche t vale casa.'],
  ['t[0] = \'r\' → t = "rasa" (s non cambia)', 't di 0 uguale r: la prima lettera di t diventa r, quindi t vale rasa. s non cambia, perché t è una copia.'],
  ['c+1 = d · a+1 = b · s+1 = t · a+1 = b → s = "dbtb"', 'Il ciclo aggiunge 1 a ogni carattere di s fino al terminatore. c più 1 fa d, a più 1 fa b, s più 1 fa t, a più 1 fa b. s diventa d b t b.'],
  ['strlen(t) = 4 → stampa <b>dbtb rasa 4</b>', 'strlen di rasa fa 4. La printf stampa d b t b, rasa, 4.']
]);

/* ---------- 10 · STRUCT E MATRICI ---------- */
V('struct-matrici', 'Struct: la scheda con i campi', [
  ['P', 'Definire la struct del tema'],
  ['nome max 30 caratteri → <code>char nome[31];</code>', 'Il testo dice: nome, stringa di al massimo 30 caratteri. Servono 30 caselle più una per il terminatore, quindi 31.'],
  ['categoria = un carattere → <code>char categoria;</code>', 'La categoria è un solo carattere, quindi un char semplice.'],
  ['<pre class="code">typedef struct {\n    int id;\n    char nome[31];\n    char categoria;\n    float prezzo;\n    int quantita;\n} Prodotto;</pre>', 'Ecco la struct completa: id intero, nome, categoria, prezzo float, quantità intera. Da qui in poi Prodotto è un tipo come int.'],
  ['P', 'Il più economico'],
  ['v = mouse 19.5 · cavo 4.0 · monitor 129.9 · imin = 0', 'Ho tre prodotti: mouse a 19 e 50, cavo a 4, monitor a 129 e 90. imin è l\'indice del più economico finora: parto da 0.'],
  ['i = 1: 4.0 &lt; 19.5? sì → imin = 1', 'i uguale 1: il prezzo del cavo, 4, è minore di 19 e 50? Sì, imin diventa 1.'],
  ['i = 2: 129.9 &lt; 4.0? no → imin resta 1', 'i uguale 2: 129 e 90 è minore di 4? No, imin resta 1.'],
  ['v[1].nome, v[1].prezzo → <b>cavo costa 4.00</b>', 'Stampo il nome e il prezzo della scheda in posizione 1: cavo costa 4 punto 0 0.'],
  ['P', 'Punto e freccia'],
  ['<code>p.prezzo</code> con la struct · <code>q->prezzo</code> con il puntatore', 'Con una struct si usa il punto. Con un puntatore alla struct si usa la freccia, che vuol dire: vai alla struct puntata e prendi il campo.'],
  ['promuovi(&a): s->voto = 17 + 2 = 19 → cambia a', 'promuovi riceve l\'indirizzo di a: s freccia voto diventa 17 più 2, cioè 19, e cambia proprio a.'],
  ['prova(a): s.voto = 0 sulla copia → a.voto resta 19 → <b>Ugo 19</b>', 'prova riceve una copia: azzera solo la copia. Quindi a punto voto resta 19, e stampa Ugo 19.'],
  ['P', 'Matrice: due cicli'],
  ['m = {1,2,3} / {4,5,6} · salto quando i == j', 'Matrice di 2 righe e 3 colonne. Sommo tutti gli elementi tranne quelli con riga uguale a colonna.'],
  ['riga 0: salto m[0][0]=1 · 2 + 3 = 5', 'Riga 0: salto m di 0 0, che vale 1. Sommo 2 e 3: 5.'],
  ['riga 1: 5 + 4 = 9 · salto m[1][1]=5 · 9 + 6 = <b>15</b>', 'Riga 1: aggiungo 4, fa 9. Salto m di 1 1, che vale 5. Aggiungo 6: 15.']
]);

/* ---------- 11 · FILE ---------- */
V('file', 'Leggere un file riga per riga', [
  ['P', 'Lo schema'],
  ['<code>f = fopen("prodotti.txt", "r");</code>', 'fopen apre il file in lettura, con r. Il segnalibro è all\'inizio.'],
  ['<code>if (f == NULL)</code> → file non trovato → esco', 'Se il file non c\'è, fopen restituisce NULL. Il controllo è obbligatorio, altrimenti il programma si blocca alla prima lettura.'],
  ['<code>while (fscanf(f, "%d %s %f %d", ...) == 4)</code>', 'Poi un ciclo: finché fscanf riesce a leggere tutti e 4 i campi della riga, la riga è buona.'],
  ['P', 'Riga per riga'],
  ['riga 1: 1 mouse 19.50 4 → letti 4 → totale = 0 + 19.50 · 4 = 78.00', 'Prima riga: fscanf legge 4 valori e restituisce 4. totale diventa 0 più 19 e 50 per 4: 19 e 50 per 4 fa 78.'],
  ['riga 2: 2 cavo 4.00 10 → totale = 78 + 4 · 10 = 78 + 40 = 118.00', 'Seconda riga: 4 per 10 fa 40. 78 più 40 fa 118.'],
  ['riga 3: 3 monitor 129.90 1 → totale = 118 + 129.90 = 247.90', 'Terza riga: 129 e 90 per 1 fa 129 e 90. 118 più 129 e 90 fa 247 e 90.'],
  ['fine file → fscanf restituisce EOF ≠ 4 → esco', 'Il file è finito: fscanf non legge niente e restituisce EOF, che non è 4. Esco dal ciclo.'],
  ['<code>fclose(f);</code> → stampa <b>Valore magazzino: 247.90</b>', 'Chiudo il file con fclose e stampo il totale.'],
  ['P', 'Righe con parti variabili'],
  ['ORD1 2 11-1 35-2 → id = ORD1, n = 2', 'Riga del tema: prima leggo la parte fissa, id e n. Percento s si ferma allo spazio, quindi id vale ORD1 e n vale 2.'],
  ['for 2 volte "%d-%d": 11-1 → tot = 1 · 35-2 → tot = 1 + 2 = 3', 'Poi un for che gira n volte. Il trattino nel formato si scrive com\'è. Prima coppia 11 trattino 1: tot vale 1. Seconda 35 trattino 2: tot vale 1 più 2, cioè 3. Stampa ORD1 3.'],
  ['P', 'Teoria (1 punto)'],
  ['fprintf / fscanf → testo, con formato, leggibile', 'fprintf e fscanf fanno input output con formato su file di testo: i numeri diventano caratteri leggibili.'],
  ['fwrite / fread → binario, byte così come sono, a blocchi', 'fwrite e fread fanno input output binario: copiano i byte della memoria così come sono, a blocchi, senza conversione. Il file si apre con r b o w b.']
]);

/* ---------- 12 · LISTE ---------- */
V('liste', 'L\'esercizio 1 dello scritto: maggiori(l, 5)', [
  ['P', 'Le primitive'],
  ['emptylist() · empty(l) · head(l) · tail(l) · cons(x, l)', 'Le liste si usano solo con cinque primitive: emptylist, empty, head, tail e cons.'],
  ['l = [4, 9, 2] → head(l) = 4 · tail(l) = [9, 2] · cons(1, l) = [1, 4, 9, 2]', 'Con l uguale 4, 9, 2: head è il primo valore, 4. tail è la lista senza il primo, 9, 2. cons di 1 e l attacca 1 davanti: 1, 4, 9, 2.'],
  ['cons(7, [ ]) = [7] → cons(2, [7]) = [2, 7] → cons(9, …) = [9, 2, 7] → cons(4, …) = [4, 9, 2, 7]', 'Per costruire 4, 9, 2, 7 si parte dal cons più interno: cons di 7 e la lista vuota dà 7. Poi cons di 2 dà 2, 7. Poi 9, 2, 7. Poi 4, 9, 2, 7.'],
  ['P', 'La funzione'],
  ['<code>if (empty(l)) return emptylist();</code>', 'Caso base: se la lista è vuota restituisco la lista vuota.'],
  ['<code>if (head(l) > s) return cons(head(l), maggiori(tail(l), s));</code>', 'Se il primo elemento è maggiore di s lo tengo: cons del primo elemento e del risultato sulla coda.'],
  ['<code>return maggiori(tail(l), s);</code>', 'Altrimenti lo salto: restituisco solo il risultato sulla coda.'],
  ['P', 'Si scende: maggiori([4, 9, 2, 7], 5)'],
  ['[4, 9, 2, 7]: head = 4 · 4 > 5? no → <b>salto</b> → maggiori([9, 2, 7])', 'Prima chiamata. head vale 4. 4 è maggiore di 5? No, lo salto: il risultato è quello della chiamata sulla coda, 9, 2, 7.'],
  ['[9, 2, 7]: head = 9 · 9 > 5? sì → <b>tengo</b> → cons(9, maggiori([2, 7]))', 'Seconda chiamata. head vale 9. 9 maggiore di 5? Sì, lo tengo: cons di 9 e il risultato su 2, 7. Aspetto.'],
  ['[2, 7]: head = 2 · 2 > 5? no → salto → maggiori([7])', 'Terza. head vale 2. 2 maggiore di 5? No, salto.'],
  ['[7]: head = 7 · 7 > 5? sì → tengo → cons(7, maggiori([ ]))', 'Quarta. head vale 7. 7 maggiore di 5? Sì, lo tengo: cons di 7 e il risultato sulla lista vuota.'],
  ['[ ]: vuota → <b>caso base</b> → [ ]', 'Quinta. La lista è vuota: caso base, restituisco la lista vuota. Ora si risale.'],
  ['P', 'Si risale'],
  ['maggiori([7]) = cons(7, [ ]) = [7]', 'La quarta chiamata riceve la lista vuota e fa cons di 7: ottiene 7.'],
  ['maggiori([2, 7]) = [7] (il 2 era saltato)', 'La terza aveva saltato il 2: restituisce 7 così com\'è.'],
  ['maggiori([9, 2, 7]) = cons(9, [7]) = [9, 7]', 'La seconda fa cons di 9 e 7: 9, 7.'],
  ['maggiori([4, 9, 2, 7]) = [9, 7] → r = <b>[9, 7]</b>', 'La prima aveva saltato il 4: restituisce 9, 7. Il risultato è una lista nuova, e l è rimasta uguale.'],
  ['P', 'La ricetta per l\'esame'],
  ['1) if empty → emptylist() · 2) condizione su head · 3) tengo: cons(head, f(tail)) · 4) salto: f(tail)', 'La ricetta vale per tutti gli esercizi 1: caso base, condizione sul primo elemento, se lo tengo cons più ricorsione, se lo salto solo ricorsione.'],
  ['condizione con funzione iterativa di aiuto (es. conta) · main con showlist tua · freelist', 'Spesso la condizione usa una funzione iterativa di aiuto, come conta. Nel main costruisci le liste dell\'esempio, stampi con una showlist scritta da te e liberi con freelist.']
]);

/* ---------- 13 · MALLOC E ORDINAMENTO ---------- */
V('malloc-ordinamento', 'Vettori dinamici e bubble sort', [
  ['P', 'Stack e heap'],
  ['stack = variabili locali, spariscono al return', 'Le variabili locali stanno nello stack e spariscono quando la funzione finisce.'],
  ['heap = <code>malloc(n * sizeof(int))</code>, resta fino a <code>free</code>', 'Con malloc prendi spazio nell\'heap: resta tuo finché non lo restituisci con free, anche dopo la fine della funzione.'],
  ['P', 'leggi_positivi(4, &d) con 6, −2, 9, 0'],
  ['malloc di 4 int · *dim = 0 → d = 0', 'La funzione prende spazio per 4 interi e mette a 0 la dimensione logica d del main, passando dal puntatore.'],
  ['6 > 0 → v[0] = 6 · d = 1', 'Legge 6, positivo: v di 0 vale 6 e d diventa 1.'],
  ['−2 > 0? no → salto', 'Legge meno 2: non è positivo, salto.'],
  ['9 > 0 → v[1] = 9 · d = 2', 'Legge 9: v di 1 vale 9 e d diventa 2.'],
  ['0 > 0? no → salto · return v', 'Legge 0: non è positivo. Il ciclo è finito e restituisco l\'indirizzo del blocco.'],
  ['dimensione fisica 4 · logica 2 → stampa <b>6 9 (2)</b> · free(p)', 'Lo spazio chiesto è 4, ma ne uso 2. Il main stampa 6, 9 e la dimensione 2, poi libera la memoria con free.'],
  ['P', 'Bubble sort su [5, 1, 4, 2]'],
  ['giro 0: 5 > 1 scambio → [1, 5, 4, 2]', 'Primo giro. Confronto 5 e 1: 5 è maggiore, scambio. Ottengo 1, 5, 4, 2.'],
  ['5 > 4 scambio → [1, 4, 5, 2] · 5 > 2 scambio → [1, 4, 2, 5]', 'Confronto 5 e 4: scambio. Poi 5 e 2: scambio. Il 5, il più grande, è arrivato in fondo.'],
  ['giro 1: 1 > 4? no · 4 > 2 scambio → [1, 2, 4, 5]', 'Secondo giro, l\'ultimo è già a posto. 1 maggiore di 4? No. 4 maggiore di 2? Sì, scambio: 1, 2, 4, 5.'],
  ['giro 2: 1 > 2? no → fine → <b>1 2 4 5</b>', 'Terzo giro: 1 maggiore di 2? No. Finito: 1, 2, 4, 5.'],
  ['scambio con appoggio: t = v[j]; v[j] = v[j+1]; v[j+1] = t;', 'Lo scambio si fa sempre con una variabile di appoggio t e tre assegnazioni.'],
  ['P', 'Ordinare con più criteri'],
  ['prezzo decrescente → a parità quantità crescente → a parità id crescente', 'Il tema chiede: prezzo dal più alto, a parità di prezzo meno pezzi prima, a ulteriore parità id crescente.'],
  ['B 1199 vs A 299.99 → prezzi diversi → più caro prima → B', 'B costa 1199, A 299 e 99. I prezzi sono diversi, quindi decide il prezzo: il più caro va prima, B.'],
  ['A (15 pezzi) vs C (5 pezzi), stesso prezzo → meno pezzi prima → C', 'A e C costano uguale, quindi guardo la quantità: C ne ha 5, A 15. Prima C.'],
  ['A (id 11) vs D (id 13), tutto uguale → id crescente → A', 'A e D hanno stesso prezzo e stessi pezzi: decide l\'id, 11 prima di 13.'],
  ['ordine finale: <b>12, 14, 11, 13</b>', 'Ordine finale degli id: 12, 14, 11, 13.']
]);

/* ---------- 14 · LA PROVA AL PC ---------- */
V('prova-pc', 'Le 2 ore della prova al PC', [
  ['P', 'Il punteggio'],
  ['servono <b>11 su 20</b> · non serve finire tutto', 'Servono 11 punti su 20. Non serve finire tutto: serve un progetto che compila, con le prime parti fatte bene e provate nel main.'],
  ['P', 'Minuto per minuto'],
  ['0-10 · leggo il testo e guardo le righe dei file', 'Nei primi 10 minuti leggi tutto e apri i file di esempio: guarda esattamente com\'è fatta una riga, spazi, trattini, numero di campi.'],
  ['10-20 · creo i file e compilo il progetto vuoto', 'Dal minuto 10 al 20 crei i file richiesti, copi lo scheletro dai tuoi appunti e compili subito.'],
  ['20-55 · Es. 1: struct + lettura + <b>stampa di quello che ho letto</b>', 'Dal 20 al 55 l\'esercizio 1: struct e lettura del file. Nel main stampi quello che hai letto, e non vai avanti finché non è identico al file.'],
  ['55-75 · Es. 2: confronta + bubble sort', 'Dal 55 al 75 l\'ordinamento: una funzione confronta con i criteri del testo e il bubble sort.'],
  ['75-105 · Es. 3: calcoli e filtri, uno alla volta, provati nel main', 'Dal 75 al 105 le funzioni di calcolo e di filtro, una alla volta, ognuna provata nel main.'],
  ['105-120 · Es. 4: stampe finali, free, Rebuild All senza warning', 'Negli ultimi 15 minuti le stampe finali, la free di tutto, e Rebuild All: zero errori e zero warning.'],
  ['P', 'Le regole d\'oro'],
  ['compilo dopo ogni funzione', 'Compila dopo ogni funzione: così se c\'è un errore è per forza in quella appena scritta.'],
  ['bloccato? lascio la funzione che compila e vado avanti', 'Se ti blocchi, lascia la funzione incompleta ma che compila, e passa all\'esercizio dopo.'],
  ['mai consegnare un progetto che non compila · firme identiche al testo', 'Non consegnare mai un progetto che non compila, e copia le firme delle funzioni esattamente come nel testo.']
]);
