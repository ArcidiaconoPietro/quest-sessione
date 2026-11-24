#!/usr/bin/env python3
"""Unisce i pezzi in src/ (in ordine di nome) in:
- lavagna.html : versione per l'Artifact (senza <html>/<head>, li aggiunge la piattaforma)
- index.html   : versione per GitHub Pages (pagina completa)"""
import pathlib
here = pathlib.Path(__file__).parent
body = "".join(p.read_text(encoding="utf-8") for p in sorted((here / "src").glob("*.html")))
(here / "lavagna.html").write_text(body, encoding="utf-8")
page = ('<!doctype html>\n<html lang="it">\n<head>\n<meta charset="utf-8">\n'
        '<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">\n'
        '<style>:root{padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px)}body{margin:0}[hidden]{display:none!important}</style>\n'
        '</head>\n<body>\n' + body + '\n</body>\n</html>\n')
(here / "index.html").write_text(page, encoding="utf-8")
print("ok", len(body), "byte")
