# Formato dati del Cervello (per la dashboard Quest Sessione)

Versione del 26 novembre 2026: **i JSON ora stanno sul repo git**, non più sul Mac (prima: 24/11, aggiunti `sessioni` e `profilo.json`). Vale per tutti i tutor e per il Cervello centrale.

## Idea in breve

I file `.md` del Cervello restano come sono, sul Mac in `UNIVERSITA/CERVELLO/` (li leggono i tutor e Pietro).
I file JSON per la dashboard invece stanno **sul repo git** `ArcidiaconoPietro/quest-sessione`, nella cartella `dati/` del branch `main`. Ogni autore ha **un file JSON tutto suo**, sempre con la stessa forma:

```
quest-sessione (repo git, branch main)
└── dati/
    ├── analisi.json      ← lo scrive SOLO il tutor di Analisi
    ├── geometria.json    ← lo scrive SOLO il tutor di Geometria
    ├── fondamenti.json   ← lo scrive SOLO il tutor di Fondamenti
    ├── oggi.json         ← lo scrive SOLO il Cervello centrale (coordinatore)
    └── profilo.json      ← lo scrive SOLO il Cervello centrale (coordinatore)
```

La cartella `CERVELLO/dati/` sul Mac non si usa più: non scriverci (Pietro vuole i materiali generati su git, non sul suo PC). Il repo è pubblico: niente dati personali oltre all'andamento dello studio (niente email, telefoni, indirizzi).

Un file per autore: così due chat non si sovrascrivono mai a vicenda.

## File materia: `dati/<materia>.json`

```json
{
  "materia": "analisi",
  "aggiornato": "2026-11-20T18:30",
  "giorni": {
    "2026-11-09": "fatto",
    "2026-11-12": "parziale",
    "2026-11-16": "da_fare"
  },
  "argomenti": [
    { "nome": "Limiti di successioni", "giorno": "2026-11-12", "stato": "in_corso", "sicurezza": 2 },
    { "nome": "Teorema dei carabinieri", "giorno": "2026-11-12", "stato": "da_ripassare", "sicurezza": 1 }
  ],
  "errori": [
    { "testo": "Dimentica di controllare che il termine generale tenda a 0", "volte": 3, "ultimo": "2026-11-20", "risolto": false }
  ],
  "prossimo_passo": "Finire i carabinieri (Foglio 4, es. 3-6), poi serie del 16/11.",
  "ultima_sessione": { "data": "2026-11-20", "minuti": 90, "fatto": "Esercizi limiti 1-5", "umore": "stanco ma ok" },
  "sessioni": [
    { "data": "2026-11-20", "minuti": 90, "esercizi_tentati": 8, "esercizi_giusti": 5, "lasciati": 2, "concentrazione": 3, "nota": "calo dopo 40 min" }
  ]
}
```

Regole:

| Campo | Cosa mettere |
|---|---|
| `materia` | esattamente `analisi`, `geometria` o `fondamenti` |
| `aggiornato` | data e ora dell'ultima modifica (`AAAA-MM-GGTHH:MM`) |
| `giorni` | per ogni giorno del piano di **questa materia** (data della cartella in STUDIO GIORNO PER GIORNO): `fatto`, `parziale` o `da_fare`. Si scrive solo dopo averlo verificato con Pietro. |
| `argomenti[].stato` | `fatto`, `in_corso`, `da_ripassare`, `da_fare` |
| `argomenti[].sicurezza` | 1 = non lo so fare, 2 = con aiuto, 3 = da solo |
| `argomenti[].giorno` | la data del piano in cui l'argomento è previsto |
| `errori[]` | errori **ricorrenti**, non ogni singolo sbaglio. Se si ripete, aumenta `volte` e aggiorna `ultimo`. Quando non lo fa più per 2 sessioni, `risolto: true`. |
| `prossimo_passo` | una frase: cosa fare alla prossima sessione |
| `ultima_sessione` | riassunto in una riga dell'ultima sessione |
| `sessioni` | (dal 24/11) storico delle sessioni per il **Profilo**: a fine sessione si aggiunge una riga, si tengono le ultime 30. Vedi sotto. |

### Campo `sessioni` (serve alla scheda Profilo)

Una riga per ogni sessione fatta davvero con Pietro. Si scrive solo quello che si è visto, senza inventare: un campo che non si sa si omette.

| Campo | Cosa mettere |
|---|---|
| `data` | giorno della sessione `AAAA-MM-GG` |
| `minuti` | minuti effettivi di studio con il tutor |
| `esercizi_tentati` | esercizi a cui Pietro ha dato una risposta o che ha provato (anche dalla lavagna, con "Copia i miei risultati") |
| `esercizi_giusti` | quanti di quelli erano giusti al primo colpo |
| `lasciati` | esercizi proposti a cui non ha risposto ("andiamo avanti" senza risultati, risultati della lavagna non incollati) |
| `concentrazione` | 1-5, giudizio del tutor: 1 = si è perso/bloccato presto, 3 = normale con qualche calo, 5 = attento fino in fondo. Segnali: errori di distrazione, risposte fuori tema, richieste di pausa, crolli dopo troppa teoria |
| `nota` | facoltativa, una riga (es. "calo dopo 40 min", "veloce sui complessi") |

La dashboard da qui calcola da sola: minuti e giorni di studio degli ultimi 7 giorni, esercizi l'ora, percentuale di esercizi giusti, esercizi lasciati, media della concentrazione.

- I giorni misti (es. "Analisi + Fondamenti") li segnano entrambi i tutor, ognuno per la sua parte.
- Il tutor riscrive il file intero a fine sessione (non aggiunge pezzi in fondo) e controlla che sia JSON valido, per esempio con `python3 -m json.tool dati/analisi.json`. Poi lo salva su git (vedi "Come si salva su git").
- Il tutor aggiorna anche il suo `.md` come sempre: il JSON è il riassunto per la dashboard, il `.md` resta il registro completo.

## File del Cervello centrale: `dati/oggi.json`

```json
{
  "data": "2026-11-21",
  "messaggio": "Oggi recuperiamo Analisi: Geometria è in pari.",
  "piano": [
    { "materia": "analisi",   "cosa": "Carabinieri: Foglio 4 es. 3-6", "file": "STUDIO GIORNO PER GIORNO/2026-11-12 .../03 - ...pdf", "minuti": 60 },
    { "materia": "geometria", "cosa": "Piano del giorno: spazi vettoriali", "file": "", "minuti": 90 }
  ],
  "schede": ["schede/2026-11-21 ripasso carabinieri.md"]
}
```

## File del Cervello centrale: `dati/profilo.json`

È il **profilo di Pietro come studente**: un voto da 1 a 5 per ogni parametro, il perché e una cosa concreta da migliorare. Lo scrive solo il Cervello centrale, dopo aver letto `profilo.md`, i tre `.md` dei tutor, i file `dati/*.json` e i risultati incollati dai tutor. Si aggiorna almeno una volta a settimana (la domenica) o quando un parametro cambia davvero.

```json
{
  "aggiornato": "2026-11-24T09:30",
  "in_breve": "Una o due frasi su come sta andando, rivolte a Pietro (tu).",
  "priorita": "chiusura",
  "parametri": [
    {
      "id": "costanza",
      "nome": "Costanza",
      "voto": 2,
      "prima": null,
      "fonte": "misurato",
      "perche": "Cosa si è visto, con date o numeri.",
      "migliora": "Un'azione concreta e piccola, da fare da domani."
    }
  ],
  "punti_forza": ["..."],
  "come_impari": ["..."],
  "allarmi": ["..."],
  "storico": [
    { "data": "2026-11-24", "voti": { "costanza": 2, "velocita": 3 } }
  ]
}
```

Parametri (usare questi `id`, nello stesso ordine; se ne serve uno nuovo si può aggiungere con un `id` nuovo):

| `id` | Cosa misura | Da dove si ricava |
|---|---|---|
| `costanza` | studia tutti i giorni, non salta blocchi | giorni del piano chiusi, streak, `sessioni` degli ultimi 7 giorni |
| `velocita` | ritmo rispetto al piano e tempo per esercizio | giorni indietro per materia, esercizi l'ora da `sessioni` |
| `comprensione` | capisce davvero (non solo "spiegato") | `argomenti[].sicurezza` e `stato`, misconcezioni nei `.md` |
| `concentrazione` | tiene l'attenzione per tutta la sessione | `sessioni[].concentrazione`, errori di distrazione, crolli dopo troppa teoria |
| `precisione` | calcoli e segni giusti | `esercizi_giusti / esercizi_tentati`, errori ricorrenti di calcolo |
| `autonomia` | fa gli esercizi da solo, senza aiuto | quanti argomenti hanno `sicurezza: 3` |
| `chiusura` | finisce e manda gli esercizi, non dice solo "andiamo avanti" | `sessioni[].lasciati`, capitoli della lavagna senza risultati |
| `ripasso` | rifà gli errori finché spariscono | `errori[].risolto`, schede errori fatte |

Regole:

| Campo | Cosa mettere |
|---|---|
| `voto` | 1 = da costruire, 2 = debole, 3 = discreto, 4 = buono, 5 = ottimo. Onesto, non gentile: serve a Pietro per sapere cosa migliorare |
| `prima` | il voto della volta precedente (la dashboard mostra ▲/▼). `null` la prima volta |
| `fonte` | `misurato` se si basa su dati (numeri, esercizi), `stima` se è un'impressione dei tutor |
| `perche` | fatti, con date o numeri. Mai percentuali inventate |
| `migliora` | una sola azione concreta, scritta a Pietro col "tu" |
| `priorita` | l'`id` del parametro da migliorare per primo (va in evidenza in cima). Se manca, la dashboard usa quello col voto più basso |
| `storico` | si aggiunge una riga con tutti i voti a ogni aggiornamento, non si cancellano le vecchie |

Il file si riscrive intero e si controlla con `python3 -m json.tool dati/profilo.json`.

## Come si salva su git (per tutor e Cervello centrale)

1. Collega il repo `ArcidiaconoPietro/quest-sessione` alla chat con accesso in scrittura (push).
2. Prendi la versione più recente di `main` e leggi il tuo file `dati/<tuo-file>.json` da lì (non da una copia vecchia).
3. Riscrivi **solo il tuo file** e controllalo con `python3 -m json.tool`.
4. Fai un commit che tocca solo quel file, con un messaggio tipo `dati: analisi, sessione del 26/11`, e fai push **direttamente su `main`**. Sono solo dati, non serve una PR.
5. Se il push su `main` viene rifiutato, apri una PR piccola con solo quel file e chiedi a Pietro di scrivere "merge" nel thread: senza il suo "merge" scritto non si unisce.

Non toccare i file degli altri autori, `index.html` o le lavagne in questo commit.

## Come arriva alla dashboard

La dashboard legge da sola i file `dati/*.json` dal repo, senza far scegliere cartelle:
- all'apertura del sito e poi ogni 2 minuti;
- quando Pietro preme **📥 Aggiorna dal Cervello** (scheda Missione o Profilo).

Prima prova `raw.githubusercontent.com/.../main/dati/` (si aggiorna pochi minuti dopo il push), poi la copia pubblicata col sito. Quindi dopo un push possono servire 1-5 minuti prima di vedere i dati nuovi.

I dati letti vengono salvati anche su Supabase in `studio_settings` con le chiavi `brain:analisi`, `brain:geometria`, `brain:fondamenti`, `brain:oggi`, `brain:profilo` (solo quando la dashboard è aperta da Pietro). Nessuna tabella nuova, nessun dato esistente toccato. Le spunte manuali di Pietro restano nel browser/Supabase come prima.

Alternativa nascosta: **Maiusc + clic** sul pulsante apre ancora la scelta della cartella o dei file `.json` (come prima), se un giorno servisse caricare file a mano.

A fine sessione il tutor dice a Pietro solo: "ho salvato i dati su git, la dashboard si aggiorna da sola tra qualche minuto".

## Cosa mostra la dashboard

- **Missione**: nella colonna di destra un riquadro "🧠 Piano del Cervello" con `messaggio` e `piano` di oggi (se `data` è oggi).
- **Boss**: per ogni materia, "in pari / indietro di N giorni / avanti di N giorni", calcolato confrontando `giorni` con i giorni del piano già passati (oggi escluso). Se `giorni` è vuoto non mostra nulla.
- **Errori**: una sezione "Errori frequenti (dai tutor)" separata dagli errori in rosso che segna Pietro.
- **Mappa**: i giorni che il tutor ha segnato hanno un segno in basso a destra: ✓ verde = fatto, ½ giallo = a metà. Le spunte di Pietro **non** vengono toccate.
- **Supervisione (Barbie)**: stesso riepilogo per materia + `ultima_sessione`.
- **Profilo** (scheda 🧬): in cima `in_breve` e il parametro da migliorare per primo; poi una scheda per parametro con voto, ▲/▼ rispetto a prima, perché, la misura calcolata dalla dashboard (📊) e "Cosa migliorare"; in fondo punti di forza, come impari meglio e segnali di allarme. Finché il Cervello non carica il suo `profilo.json`, si vede il profilo iniziale pubblicato col sito (`dati/profilo.json` nel repo).
