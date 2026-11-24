#!/usr/bin/env python3
"""Costruisce la Lavagna di Analisi da src/. Uso: python3 build.py
Ogni capitolo = src/capitoli/NN-id.html (markup, <div class="chapter" data-ch="id">) + NN-id.js (codice).
Output: index.html (copia per git) e ../lavagna-analisi.html (sorgente dell'Artifact)."""
import os, re, glob
here = os.path.dirname(os.path.abspath(__file__))
src = os.path.join(here, 'src')
caps = sorted(glob.glob(os.path.join(src, 'capitoli', '*.html')))
nav, chapters_html, chapters_js = [], [], []
for i, p in enumerate(caps):
    base = os.path.basename(p)[:-5]
    num, cid = base.split('-', 1)
    js = open(p[:-5] + '.js').read()
    name = re.search(r"NAMES\['" + re.escape(cid) + r"'\] = '\d+ ([^']+)'", js).group(1)
    nav.append(f'    <a href="#{cid}" data-ch="{cid}">{int(num)} · {name}</a>')
    h = open(p).read()
    if i > 0: h = h.replace(f'<div class="chapter" data-ch="{cid}">', f'<div class="chapter" data-ch="{cid}" hidden>', 1)
    chapters_html.append(f'  <!-- ================= CAPITOLO {int(num)} ================= -->\n' + h)
    chapters_js.append(js)
style = open(os.path.join(src, 'style.css')).read()
head_js = open(os.path.join(src, 'engine-head.js')).read()
tail_js = open(os.path.join(src, 'engine-tail.js')).read()
page = f'''<title>Lavagna di Analisi</title>
<meta name="claude:viewport-fit-sides" content="cover">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Atkinson+Hyperlegible:ital,wght@0,400;0,700;1,400&family=Caveat:wght@500;700&display=swap">
<style>
{style}</style>

<div class="wrap">
  <header>
    <h1>Lavagna di Analisi</h1>
    <p>Una lavagna che cresce: ogni argomento diventa un capitolo. Prima a cosa serve, poi il disegno, poi tocca a te. I capitoli con ✓ hanno l'esercizio guidato finito.</p>
  </header>

  <nav class="chapters" aria-label="Capitoli" id="nav">
{chr(10).join(nav)}
  </nav>

{chr(10).join(chapters_html)}
  <footer>Lavagna del tutor di Analisi T-1 · fonti: lavagne di Mughetti e Albano, dispensa Unibo (Arcozzi-Galeotti) · esame 25 gennaio 2027</footer>
</div>

<script>
{head_js}
{chr(10).join(chapters_js)}
{tail_js}</script>
'''
open(os.path.join(here, 'index.html'), 'w').write(page)
full = '<!doctype html>\n<html lang="it">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">\n</head>\n<body>\n' + page + '</body>\n</html>\n'
open(os.path.join(here, 'index.html'), 'w').write(full)
art = os.path.join(here, '..', 'lavagna-analisi.html')
if os.path.exists(art):  # solo nella cartella del progetto, non nel repo git
    open(art, 'w').write(page)
print('capitoli:', len(caps), 'byte:', len(page))
