/* Videolezioni dei capitoli 1-4.
   Formato: V(id capitolo, titolo, scene). Ogni scena è [lavagna, voce]:
   - lavagna = HTML scritto sulla lavagna in quel passo (si aggiunge sotto ai precedenti);
   - voce = cosa legge la voce del browser (frasi intere, numeri e parole, niente simboli).
   ['P', 'titolo'] apre una pagina nuova della lavagna. Ogni conclusione ha il suo calcolo prima. */
window.V = (id, title, scenes) => { const ch = CH.find(c => c.id === id); if (ch) ch.video = { title, scenes }; };

/* ---------- 1 · PRIMI PASSI ---------- */
V('primi-passi', 'Dal file .c al programma che stampa', [
  ['P', 'Che cosa succede quando scrivi un programma'],
  ['<b>prog.c</b> = il testo che scrivi tu (sorgente)', 'Tu scrivi il programma in un file di testo che finisce con punto c. Si chiama sorgente.'],
  ['<b>gcc -Wall -o prog prog.c</b> → controlla e traduce', 'Il compilatore gcc legge il file, controlla che sia scritto bene e lo traduce in linguaggio macchina. L\'opzione meno W all accende tutti gli avvisi.'],
  ['errore → nessun eseguibile · warning → eseguibile, ma da correggere', 'Se trova un errore non produce niente. Se trova solo un warning produce il programma, ma ti avvisa che probabilmente c\'è un problema. All\'esame i warning vanno tolti tutti.'],
  ['<b>./prog</b> → il programma gira e stampa', 'Alla fine esegui il programma, e vedi sullo schermo quello che stampa.'],
  ['P', 'Il primo programma, riga per riga'],
  ['<code>int a = 5;</code> → a vale 5', 'Prima riga del main: creo una variabile intera a e ci metto 5.'],
  ['<code>int b = 2;</code> → b vale 2', 'Poi una variabile intera b, che vale 2.'],
  ['<code>float media;</code> → media = ??? (valore a caso)', 'Poi creo media, di tipo float, cioè numero con la virgola. Non le do un valore, quindi dentro c\'è un numero a caso.'],
  ['<code>media = (a + b) / 2.0;</code>', 'Ora calcolo la media. Si parte dalla parentesi.'],
  ['a + b = 5 + 2 = 7', 'a più b fa 5 più 2, cioè 7.'],
  ['7 / 2.0 → 2.0 ha la virgola → divisione con la virgola', 'Poi divido 7 per 2 punto 0. Siccome 2 punto 0 ha la virgola, il C fa la divisione con la virgola.'],
  ['7 / 2.0 = 3.5 → media = 3.5', '7 diviso 2 fa 3 virgola 5. Quindi media vale 3 virgola 5.'],
  ['<code>printf("a = %d, b = %d\\n", a, b);</code> → <b>a = 5, b = 2</b>', 'Nella prima printf, il primo percento d viene sostituito da a, cioè 5, il secondo da b, cioè 2. Barra n va a capo.'],
  ['<code>printf("media = %f\\n", media);</code> → <b>media = 3.500000</b>', 'Percento f stampa un float con sei cifre dopo la virgola: 3 virgola 5 diventa 3 punto 5 0 0 0 0 0.'],
  ['P', 'Un char è un numero'],
  ['\'A\' = 65 · \'a\' = 97 · \'0\' = 48', 'Il computer conserva solo numeri. Ogni carattere ha il suo numero nella tabella ASCII: A maiuscola è 65, a minuscola è 97, il carattere zero è 48.'],
  ['<code>char c = \'A\'; int k = c + 2;</code> → k = 65 + 2 = 67', 'Se c vale A, cioè 65, allora c più 2 fa 65 più 2, cioè 67.'],
  ['%d di c → <b>65</b> · %c di 67 → A=65, B=66, C=67 → <b>C</b>', 'Con percento d stampo il numero, 65. Con percento c stampo il carattere: contando, A è 65, B è 66, C è 67. Quindi stampa C.'],
  ['<b>Ricorda:</b> lo stesso numero si stampa come numero (%d) o come carattere (%c)', 'Ricorda: lo stesso numero si può stampare come numero con percento d, oppure come carattere con percento c.']
]);

/* ---------- 2 · COMPLEMENTO A 2 ---------- */
V('complemento-a-2', 'Il tema del 9 febbraio 2026: −37 − 7 su 8 bit', [
  ['P', 'I pesi degli 8 bit'],
  ['pesi: <span class="mono">−128 64 32 16 8 4 2 1</span>', 'In complemento a 2 su 8 bit, ogni bit ha un peso. Il primo a sinistra pesa meno 128, gli altri 64, 32, 16, 8, 4, 2 e 1.'],
  ['valore = somma dei pesi dei bit a 1', 'Il valore del numero è la somma dei pesi dei bit che valgono 1.'],
  ['<span class="mono">11111111</span> = −128 + 64 + 32 + 16 + 8 + 4 + 2 + 1', 'Esempio: tutti i bit a 1. Sommo meno 128 più 64 più 32 più 16 più 8 più 4 più 2 più 1.'],
  ['64 + 32 + 16 + 8 + 4 + 2 + 1 = 127 → −128 + 127 = <b>−1</b>', 'I positivi fanno 127. Meno 128 più 127 fa meno 1. Quindi 1 1 1 1 1 1 1 1 vale meno 1.'],
  ['P', 'Passo 1 · la sottrazione diventa somma'],
  ['−37 − 7 = (−37) + (−7)', 'La macchina sa solo sommare. Quindi meno 37 meno 7 diventa meno 37 più meno 7. Devo scrivere in binario sia meno 37 sia meno 7.'],
  ['P', 'Passo 2 · scrivo −37'],
  ['37 − 32 = 5 → bit del 32 a 1', 'Prima scrivo 37 in binario. Cerco il peso più grande che ci sta: 64 è troppo, 32 ci sta. 37 meno 32 fa 5.'],
  ['5 − 4 = 1 → bit del 4 a 1', 'Resta 5. 16 e 8 sono troppo grandi, 4 ci sta. 5 meno 4 fa 1.'],
  ['1 − 1 = 0 → bit dell\'1 a 1', 'Resta 1. Il 2 è troppo grande, l\'1 ci sta. 1 meno 1 fa 0: ho finito.'],
  ['128 64 32 16 8 4 2 1 → 0 0 1 0 0 1 0 1 → <span class="mono">00100101</span>', 'Metto 1 sotto 32, 4 e 1, e 0 sotto gli altri: 0 0 1 0 0 1 0 1.'],
  ['inverto ogni bit → <span class="mono">11011010</span>', 'Per fare il negativo inverto tutti i bit: ogni 0 diventa 1 e ogni 1 diventa 0. Ottengo 1 1 0 1 1 0 1 0.'],
  ['+1: ultimo bit 0 + 1 = 1 → <b class="mono">11011011</b> = −37', 'Poi aggiungo 1. L\'ultimo bit è 0, 0 più 1 fa 1, senza riporto. Ottengo 1 1 0 1 1 0 1 1, che è meno 37.'],
  ['verifica: −128 + 64 + 16 + 8 + 2 + 1 = −128 + 91 = −37 ✓', 'Verifico con i pesi: meno 128 più 64 più 16 più 8 più 2 più 1. I positivi fanno 91, e meno 128 più 91 fa meno 37. Giusto.'],
  ['P', 'Passo 3 · scrivo −7'],
  ['7 = 4 + 2 + 1 → <span class="mono">00000111</span>', '7 è 4 più 2 più 1: 7 meno 4 fa 3, 3 meno 2 fa 1, 1 meno 1 fa 0. In binario 0 0 0 0 0 1 1 1.'],
  ['inverto → <span class="mono">11111000</span> · +1 → <b class="mono">11111001</b> = −7', 'Inverto: 1 1 1 1 1 0 0 0. Aggiungo 1: l\'ultimo bit 0 più 1 fa 1. Ottengo 1 1 1 1 1 0 0 1, cioè meno 7.'],
  ['verifica: −128 + 121 = −7 ✓', 'Verifica: meno 128 più 64 più 32 più 16 più 8 più 1. I positivi fanno 121, meno 128 più 121 fa meno 7.'],
  ['P', 'Passo 4 · somma in colonna, da destra'],
  ['<pre class="code">  11011011\n+ 11111001</pre>', 'Scrivo i due numeri uno sotto l\'altro e sommo colonna per colonna, partendo da destra. Ricorda: 1 più 1 fa 2, che in binario si scrive 0 con riporto 1.'],
  ['col. 1: 1 + 1 = 2 → scrivo 0, riporto 1', 'Prima colonna: 1 più 1 fa 2. Scrivo 0 e riporto 1.'],
  ['col. 2: 1 + 0 + 1 = 2 → scrivo 0, riporto 1', 'Seconda colonna: 1 più 0 più il riporto 1 fa 2. Scrivo 0 e riporto 1.'],
  ['col. 3: 0 + 0 + 1 = 1 → scrivo 1, riporto 0', 'Terza colonna: 0 più 0 più il riporto 1 fa 1. Scrivo 1, nessun riporto.'],
  ['col. 4: 1 + 1 = 2 → scrivo 0, riporto 1', 'Quarta colonna: 1 più 1 fa 2. Scrivo 0 e riporto 1.'],
  ['col. 5: 1 + 1 + 1 = 3 → scrivo 1, riporto 1', 'Quinta colonna: 1 più 1 più il riporto fa 3. 3 in binario è 1 1: scrivo 1 e riporto 1.'],
  ['col. 6: 0 + 1 + 1 = 2 → scrivo 0, riporto 1', 'Sesta colonna: 0 più 1 più il riporto fa 2. Scrivo 0 e riporto 1.'],
  ['col. 7: 1 + 1 + 1 = 3 → scrivo 1, riporto 1', 'Settima colonna: 1 più 1 più il riporto fa 3. Scrivo 1 e riporto 1.'],
  ['col. 8: 1 + 1 + 1 = 3 → scrivo 1, riporto 1 (nono bit)', 'Ottava colonna: ancora 1 più 1 più il riporto, 3. Scrivo 1, e il riporto 1 finirebbe in un nono bit.'],
  ['risultato <span class="mono">1|11010100</span> → butto il nono bit → <b class="mono">11010100</b>', 'La macchina ha solo 8 posti, quindi il nono bit si butta via. Resta 1 1 0 1 0 1 0 0.'],
  ['P', 'Passo 5 · verifica in decimale'],
  ['primo bit = 1 → negativo', 'Il primo bit è 1, quindi il risultato è negativo.'],
  ['inverto <span class="mono">11010100</span> → <span class="mono">00101011</span>', 'Per leggerlo rifaccio la ricetta: inverto i bit e ottengo 0 0 1 0 1 0 1 1.'],
  ['+1: 1+1 = 0 rip. 1 · 1+1 = 0 rip. 1 · 0+1 = 1 → <span class="mono">00101100</span>', 'Aggiungo 1: l\'ultimo bit 1 più 1 fa 0 con riporto 1, il penultimo 1 più 1 fa 0 con riporto 1, il terzultimo 0 più 1 fa 1. Ottengo 0 0 1 0 1 1 0 0.'],
  ['<span class="mono">00101100</span> = 32 + 8 + 4 = 44 → risultato <b>−44</b>', 'Questo vale 32 più 8 più 4, cioè 44. Quindi il risultato è meno 44.'],
  ['controllo: −37 − 7 = −44 ✓', 'Controllo in decimale: meno 37 meno 7 fa proprio meno 44. L\'esercizio è giusto.'],
  ['P', 'E l\'overflow?'],
  ['8 bit: da −128 a +127', 'Con 8 bit si va da meno 128 a più 127. Se il risultato vero esce da qui, c\'è overflow.'],
  ['100 + 50 = 150 > 127 → overflow', 'Per esempio 100 più 50 fa 150, che è più grande di 127.'],
  ['<span class="mono">01100100 + 00110010 = 10010110</span> = −128 + 22 = −106', 'In binario la somma dà 1 0 0 1 0 1 1 0, che vale meno 128 più 16 più 4 più 2, cioè meno 106.'],
  ['due positivi → un negativo: <b>overflow</b>', 'Due numeri positivi hanno dato un negativo: è il segnale dell\'overflow. All\'esame lo scrivi e spieghi che 150 non sta tra meno 128 e 127.']
]);

/* ---------- 3 · ESPRESSIONI ---------- */
V('espressioni', 'Le trappole delle espressioni, una alla volta', [
  ['P', 'int a = 7, b = 2'],
  ['<code>c = a / b;</code> → 7 / 2 tra due int', 'Prima trappola: a diviso b. Sono tutti e due interi, quindi il C fa la divisione intera.'],
  ['7 / 2 = 3,5 → butto la parte dopo la virgola → <b>c = 3</b>', '7 diviso 2 farebbe 3 virgola 5, ma nella divisione intera la parte dopo la virgola si butta. Non si arrotonda: resta 3.'],
  ['<code>x = a / b;</code> con x float → prima 7 / 2 = 3 → poi x = <b>3.0</b>', 'Seconda trappola: metto lo stesso calcolo in un float. Il C prima calcola 7 diviso 2 tra interi, che fa 3, e solo dopo mette 3 nel float. Quindi x vale 3 punto 0, non 3 punto 5.'],
  ['<code>x = (float) a / b;</code> → a diventa 7.0 → 7.0 / 2 = <b>3.5</b>', 'Con il cast, float tra parentesi, trasformo a in 7 punto 0 prima di dividere. Adesso c\'è un numero con la virgola, quindi 7 punto 0 diviso 2 fa 3 virgola 5.'],
  ['P', 'Il resto: %'],
  ['<code>c = a % b;</code> → 7 / 2 = 3, 2 · 3 = 6, 7 − 6 = <b>1</b>', 'Percento è il resto della divisione intera. 7 diviso 2 fa 3. 2 per 3 fa 6. 7 meno 6 fa 1. Quindi 7 percento 2 vale 1.'],
  ['pari: <code>n % 2 == 0</code> · ultima cifra: <code>n % 10</code>', 'Il resto serve tantissimo: un numero è pari se il resto della divisione per 2 è 0, e n percento 10 è la sua ultima cifra.'],
  ['P', 'a++ e ++b'],
  ['<code>c = a++ + ++b;</code> con a = 7, b = 2', 'Terza trappola: a più più, più, più più b.'],
  ['a++ → nel calcolo uso 7, poi a diventa 8', 'a più più, con il più più dopo: prima uso il valore vecchio, 7, e solo dopo a diventa 8.'],
  ['++b → prima b diventa 3, poi nel calcolo uso 3', 'Più più b, con il più più prima: prima b diventa 3, poi uso 3.'],
  ['c = 7 + 3 = <b>10</b> · a = 8 · b = 3', 'Quindi c vale 7 più 3, cioè 10. Alla fine a vale 8 e b vale 3.'],
  ['<code>printf("%d %d %d %.1f\\n", a, b, c, x);</code> → <b>8 3 10 3.5</b>', 'La printf stampa a, b, c e x con una cifra dopo la virgola: 8, 3, 10, 3 punto 5.'],
  ['P', 'L\'operatore ? :'],
  ['<code>m = (a > b) ? a : b;</code> con a = 3, b = 8', 'Il punto interrogativo è un if in una riga. Se la condizione è vera prendo quello prima dei due punti, altrimenti quello dopo.'],
  ['3 > 8 → falso → prendo quello dopo i due punti → m = b = <b>8</b>', '3 è maggiore di 8? No, è falso. Quindi prendo quello dopo i due punti: m vale b, cioè 8.'],
  ['<code>a = (b % a == 2) ? a * 10 : 0;</code> → 8 % 3: 3 · 2 = 6, 8 − 6 = 2', 'Secondo esempio. Calcolo b percento a, cioè 8 percento 3: 8 diviso 3 fa 2, 3 per 2 fa 6, 8 meno 6 fa 2.'],
  ['2 == 2 → vero → a = a * 10 = 3 · 10 = <b>30</b>', '2 uguale 2 è vero, quindi prendo quello prima dei due punti: a per 10, cioè 3 per 10, 30.'],
  ['vero = qualsiasi numero diverso da 0 · falso = 0', 'Ricorda: in C vero è qualsiasi numero diverso da zero, falso è zero.'],
  ['P', 'Caratteri e aritmetica'],
  ['<code>char c = \'g\' - 3;</code> → \'g\' = 103 → 103 − 3 = 100 = <b>\'d\'</b>', 'Un char è un numero: g minuscola vale 103. 103 meno 3 fa 100, che è la d. Quindi c contiene d, tre lettere prima della g.']
]);

/* ---------- 4 · CICLI ---------- */
V('cicli', 'Il for della somma, giro per giro', [
  ['P', 'Il programma'],
  ['<code>scanf("%d", &n);</code> → scrivi 4 → n = 4', 'Il programma chiede un numero e lo legge con scanf. La e commerciale davanti a n dice dove metterlo. Supponiamo che tu scriva 4: n vale 4.'],
  ['somma = 0 (accumulatore)', 'somma parte da 0: è un accumulatore, deve partire da zero.'],
  ['<code>for (i = 1; i <= n; i++) somma = somma + i;</code>', 'Il for si legge così: parto con i uguale a 1; prima di ogni giro controllo che i sia minore o uguale a n; alla fine di ogni giro aumento i di 1.'],
  ['P', 'Giro per giro'],
  ['i = 1: 1 ≤ 4 vero → somma = 0 + 1 = 1', 'i vale 1. Controllo: 1 è minore o uguale a 4, vero. Entro: somma diventa 0 più 1, cioè 1.'],
  ['i++ → i = 2: 2 ≤ 4 vero → somma = 1 + 2 = 3', 'Fine del giro, i diventa 2. 2 minore o uguale a 4, vero. somma diventa 1 più 2, cioè 3.'],
  ['i = 3: 3 ≤ 4 vero → somma = 3 + 3 = 6', 'i diventa 3. 3 minore o uguale a 4, vero. somma diventa 3 più 3, cioè 6.'],
  ['i = 4: 4 ≤ 4 vero → somma = 6 + 4 = 10', 'i diventa 4. 4 minore o uguale a 4 è vero, perché è uguale. somma diventa 6 più 4, cioè 10.'],
  ['i = 5: 5 ≤ 4 <b>falso</b> → esco · i vale 5', 'i diventa 5. 5 minore o uguale a 4 è falso: esco dal ciclo. Attenzione, dopo il ciclo i vale 5, non 4.'],
  ['<code>if (somma > MAX)</code> → 10 > 100 falso → else → <b>Somma = 10</b>', 'Poi l\'if: 10 è maggiore di 100? No. Quindi va all\'else e stampa Somma uguale 10.'],
  ['P', 'Quante volte gira? (esercizio guidato)'],
  ['<code>for (i = 10; i > 0; i = i - 3) if (i % 2 == 0) n++;</code> · n = 0', 'Altro ciclo: i parte da 10, va avanti finché è maggiore di 0, e a ogni giro toglie 3. Conto i numeri pari in n.'],
  ['i = 10: 10 > 0 vero · 10 % 2 = 0 → pari → n = 1 · i = 10 − 3 = 7', 'i vale 10. 10 è maggiore di 0, entro. 10 percento 2 fa 0, quindi è pari: n diventa 1. Poi i diventa 10 meno 3, cioè 7.'],
  ['i = 7: vero · 7 % 2 = 1 → dispari · i = 4', 'i vale 7. Entro. 7 percento 2 fa 1, dispari, n resta 1. i diventa 4.'],
  ['i = 4: vero · 4 % 2 = 0 → n = 2 · i = 1', 'i vale 4. Entro. 4 percento 2 fa 0, pari: n diventa 2. i diventa 1.'],
  ['i = 1: vero · 1 % 2 = 1 → dispari · i = 1 − 3 = −2', 'i vale 1. 1 è maggiore di 0, entro. Dispari, n resta 2. i diventa 1 meno 3, cioè meno 2.'],
  ['i = −2: −2 > 0 falso → esco → stampa <b>-2 2</b>', 'meno 2 è maggiore di 0? No: esco. La printf stampa i, cioè meno 2, e n, cioè 2.'],
  ['P', 'while e do-while'],
  ['<code>while (cond) {...}</code> controlla <b>prima</b> → può fare 0 giri', 'Il while controlla la condizione prima del giro, quindi può non fare nessun giro.'],
  ['<code>do {...} while (cond);</code> controlla <b>dopo</b> → almeno 1 giro', 'Il do while controlla dopo il giro, quindi fa sempre almeno un giro.'],
  ['k = 10: stampo 10 · k = 10 − 4 = 6 · 6 > 10 falso → esco', 'Esempio: k vale 10. Il do while entra senza controllare, stampa 10, poi k diventa 10 meno 4, cioè 6. Ora controlla: 6 maggiore di 10 è falso, quindi esce. Ha fatto un giro solo.']
]);
