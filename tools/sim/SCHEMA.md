# Datenformat der Prüfungssimulationen (`sim/<id>.js`)

Jede Datei registriert genau eine Prüfung:

```js
(window.SIM = window.SIM || {})['telc-b1'] = { ... };
```

Alle Texte sind **reiner Text** (kein HTML). Absätze mit `\n`. Die Seite maskiert alles selbst.
Alle Inhalte sind **eigene, neu geschriebene Übungsaufgaben im Stil der Prüfung** – nichts aus offiziellen Modelltests oder Lehrbüchern abschreiben.

## Kopf

| Feld | Bedeutung |
|---|---|
| `id` | `dtz`, `telc-b1`, `dtb-b1`, `telc-b2`, `dtb-b2` |
| `title` | z. B. `telc Deutsch B1` |
| `short` | kurzer Name für Karten, z. B. `telc B1` |
| `provider` | `g.a.s.t.` oder `telc` |
| `level` | `A2–B1`, `B1`, `B2` |
| `intro` | 1–2 Sätze: für wen ist die Prüfung |
| `rule` | `dtz`, `telc` oder `dtb` (Bestehensregel, rechnet die Seite) |
| `skills` | Objekt `{ key: { label, max } }` – Punkte-Töpfe (siehe unten) |
| `sections` | Prüfungsabschnitte in Prüfungsreihenfolge (jeder mit eigener Uhr) |
| `prep` | nur telc-b1, telc-b2, dtb-b1, dtb-b2: Vorbereitungsseite (siehe unten) |

### `skills` je Regel
- `dtz`: `{ hl:{label:'Hören und Lesen',max:45}, s:{label:'Schreiben',max:20}, m:{label:'Sprechen',max:100} }`
- `telc`: `{ lesen:{…,max:75}, sb:{label:'Sprachbausteine',max:30}, hoeren:{…,max:75}, schreiben:{…,max:45}, muendlich:{label:'Mündliche Prüfung',max:75} }`
- `dtb`: `{ lesen:{max:60}, hoeren:{max:60}, schreiben:{max:60}, sprechen:{max:60} }`

## Abschnitt (`sections[]`)

```js
{ id:'lesen', title:'Leseverstehen und Sprachbausteine', minutes:90, prepMinutes:0, note:'optional: kurzer Hinweis', parts:[ … ] }
```
`prepMinutes` nur beim Sprechen (telc: 20). Die Uhr des Abschnitts läuft `minutes` (bei Vorbereitung zuerst `prepMinutes`).

## Teil (`parts[]`) – drei Arten

### 1) Aufgaben mit fester Lösung (Standard, `kind` weglassen)
```js
{
  title:'Leseverstehen Teil 1', skill:'lesen', pts:5,
  instr:'Lesen Sie zuerst die zehn Überschriften. …',
  material:[ { h:'Text 1', t:'…' }, … ],      // Lesetexte, Anzeigen, Lückentext (optional)
  audio:[ { h:'Nachricht 1', lines:[ {s:'n', t:'…'} ] } ], plays:2,  // nur Hören (optional)
  opts:['a) …','b) …'],                          // gemeinsame Auswahl für Zuordnung bzw. ['Richtig','Falsch']
  items:[ { q:'Text 1', a:2, why:'kurze Begründung, warum richtig' },
          { q:'Was …?', opts:['…','…','…'], a:0, why:'…' } ]
}
```
- `a` = Index (0-basiert) der richtigen Antwort in `item.opts` – oder, wenn das Item keine eigenen `opts` hat, in `part.opts`.
- Richtig/Falsch: `opts:['Richtig','Falsch']` am Teil.
- „Keine Lösung passt“ (z. B. telc Lesen Teil 3, DTB „x“): als letzte Option in `part.opts` z. B. `'x) keine passende Anzeige'`.
- Lückentexte: im `material`-Text Lücken als `{1}`, `{2}` … (Nummer = Position des Items in diesem Teil, 1-basiert). Die Seite ersetzt sie durch die echte Aufgabennummer.
- `pts` = Punkte pro richtiger Antwort.
- `why` immer ausfüllen (ein Satz, bezieht sich auf die Textstelle).
- Lösungen gleichmäßig verteilen (nicht immer a), Distraktoren plausibel, eindeutig nur eine richtige Lösung.

**Hören:** `audio` = Liste von Hörtexten, jeder mit `lines`. Sprecher `s`: `'n'` Sprecher/Ansage (neutral), `'f'` Frau, `'m'` Mann, `'f2'`, `'m2'` weitere Stimmen. Natürliche gesprochene Sprache (äh, also, ja genau …, Nummern wiederholen). `plays` = wie oft man ihn hören darf (1 oder 2, wie in der Prüfung). Optional `item.au` = Index des Hörtextes, zu dem das Item gehört (die Seite zeigt das Item dann direkt unter dem Hörtext).

### 2) Schreiben (`kind:'write'`)
```js
{ kind:'write', title:'Schriftlicher Ausdruck', skill:'schreiben', pts:45,
  instr:'Wählen Sie eine der beiden Aufgaben …',
  material:[…], audio:[…], plays:2,          // optional (z. B. DTB Telefonnotiz, Kundenbeschwerde)
  options:[ { h:'Aufgabe A', situation:'…', task:'…', points:['Grund für Ihr Schreiben','…'], muster:'Kompletter Mustertext' }, … ],
  minWords:150,
  check:['Alle Leitpunkte bearbeitet', 'Passende Anrede und Gruß', …]   // 5–8 Punkte zur Selbstbewertung
}
```
Eine Option, wenn es in der Prüfung keine Wahl gibt.

### 3) Sprechen (`kind:'speak'`)
```js
{ kind:'speak', title:'Teil 2: Über ein Thema sprechen', skill:'muendlich', pts:25, minutes:5,
  instr:'…', task:'Aufgabenkarte als Text', material:[…],
  img:{ src:'assets/sim/<datei>.webp', alt:'Foto: genaue Bildbeschreibung' },   // optional, für Bildaufgaben (KI-Bild 3:2, 1536×1024)
  prompts:['Fragen/Impulse des Prüfers oder der Partnerin, werden nacheinander vorgelesen', …],
  redemittel:['…'], muster:'Musterantwort bzw. Musterdialog (für Partneraufgaben als Dialog mit A:/B:)',
  check:['…'] }
```

## Vorbereitung (`prep`, nur telc-b1, telc-b2, dtb-b1, dtb-b2)
```js
prep:{
  lead:'2–3 Sätze: worum es geht, wer sie braucht',
  facts:[ ['Dauer','ca. 2,5 Stunden'], ['Bestehen','…'], ['Ergebnis','…'], ['Wer braucht sie?','…'] ],
  parts:[ { name:'Lesen Teil 1', skill:'Lesen', time:'ca. 15 Min.', what:'Was passiert in diesem Teil (2 Sätze)',
            steps:['Strategie Schritt 1', …],      // 3–5
            traps:['typische Falle', …],           // 2–4
            tip:'Tipp vom Prüfer (1–2 Sätze)',
            mini:{ /* ein Teil wie oben (Art 1), 2–3 Items, kurz */ } },   // mini optional bei Schreiben/Sprechen
          … ],                                     // alle Teile der Prüfung
  redemittel:[ { h:'Beschwerde beantworten', list:['…'] }, … ],   // 4–6 Gruppen
  fehler:[ ['falscher Satz','richtiger Satz','kurze Erklärung'], … ],  // 8–10
  plan:[ { w:'Woche 1', tasks:['…','…','…'] }, … ]   // 4 Wochen, je 4–6 Aufgaben
}
```

## Prüfen
`node tools/sim/validate.mjs sim/<id>.js` – muss ohne Fehler laufen.
