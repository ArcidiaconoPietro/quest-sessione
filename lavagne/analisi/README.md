# Lavagna di Analisi T-1

Lavagna interattiva del tutor di Analisi: un capitolo per argomento, nell'ordine del calendario di studio.

- Apri `index.html` nel browser (oppure da GitHub Pages: `lavagne/analisi/`).
- I risultati degli esercizi restano nel browser; il pulsante "Copia i miei risultati per il tutor" li copia per incollarli nella chat del tutor.

## Come è fatta

- `src/style.css`, `src/engine-head.js`, `src/engine-tail.js`: aspetto e motore comune (grafici, esercizio guidato, esercizi, copia risultati).
- `src/capitoli/NN-id.html` + `NN-id.js`: un capitolo. Per aggiungerne uno basta creare la coppia di file con il numero successivo.
- `python3 build.py` rimette tutto insieme in `index.html`.

Regole di scrittura: notazione completa (sempre "lim per x → x₀", mai sottinteso), per ogni formula si dice se il perché è facile (e si spiega) o se conviene impararla a memoria.
