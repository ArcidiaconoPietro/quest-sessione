# Lavagna di Fondamenti di Informatica T

Una pagina, 14 capitoli nell'ordine del piano di studio (11/11 → 19/12):

1. Primi passi in C · 2. Complemento a 2 · 3. Espressioni · 4. Input-output, if e cicli
5. Funzioni · 6. Ricorsione e record di attivazione · 7. Puntatori · 8. Progetti su più file
9. Array e stringhe · 10. Struct, enum, matrici · 11. File di testo e binari · 12. Liste
13. Allocazione dinamica e ordinamento · 14. La prova al PC

Ogni capitolo: a cosa serve all'esame → idea → codice che si esegue passo passo (memoria e stampa) →
ricetta → "da capire o a memoria" → esercizio guidato → esercizi da solo con aiuto e soluzione →
quaderno + "Copia i miei risultati per il tutor".

- `index.html`: la pagina pronta (si apre anche da GitHub Pages in `/lavagne/fondamenti/`).
- `src/`: sorgenti. `head.html` (stile), `engine.js` (motore), `capitoli/*.js` (un file per gruppo di capitoli).
  Rigenerare con `python3 src/build.py`.
- Tutti i programmi C della lavagna sono stati compilati ed eseguiti con `gcc -Wall` per verificare le uscite.
