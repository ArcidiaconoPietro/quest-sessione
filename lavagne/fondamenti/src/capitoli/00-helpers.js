/* Aiuti per scrivere i capitoli. code(String.raw`...`) mostra un blocco di codice C. */
window.CH = [];
window.esc = s => String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
window.code = s => '<pre class="code">'+esc(String(s).replace(/^\n/,'').replace(/\s+$/,''))+'</pre>';
window.c = s => '<code>'+esc(s)+'</code>';
