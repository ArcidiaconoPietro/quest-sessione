# Lavagne dei tutor

Una lavagna interattiva per materia, scritta dai tutor (Claude). Ogni capitolo: a cosa serve, disegno interattivo, definizioni con notazione completa, ricetta a passi, esercizio guidato, esercizi da solo con aiuto e soluzione, pulsante "Copia i miei risultati per il tutor".

- `geometria/` — Geometria e Algebra T. I pezzi stanno in `geometria/src/` (uno per capitolo); `python3 geometria/build.py` li unisce in:
  - `geometria/index.html` — pagina completa, servita da GitHub Pages
  - `geometria/lavagna.html` — stessa pagina senza `<html>/<head>`, per l'Artifact su claude.ai
