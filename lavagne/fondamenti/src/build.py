"""Rigenera la lavagna: python3 src/build.py
Scrive index.html (pagina completa, per GitHub Pages) e, se esiste la cartella del progetto,
lavagna-fondamenti.html (versione per l'Artifact, senza scheletro <html>)."""
import glob, os
d = os.path.dirname(os.path.abspath(__file__))
head = open(os.path.join(d, 'head.html')).read()
js = ''.join(open(f).read() + '\n' for f in sorted(glob.glob(os.path.join(d, 'capitoli', '*.js'))))
js += open(os.path.join(d, 'engine.js')).read()
body = head + '\n<script>\n' + js.replace('</script', '<\\/script') + '\n</script>\n'
skel = ('<!doctype html>\n<html lang="it">\n<head>\n<meta charset="utf-8">\n'
        '<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">\n'
        '<style>[hidden]{display:none!important} body{margin:0}</style>\n</head>\n<body>\n')
out = os.path.join(os.path.dirname(d), 'index.html')
open(out, 'w').write(skel + body + '</body>\n</html>\n')
print(out, os.path.getsize(out))
