# Kurstagebuch

Bereich `/kurstagebuch/` der Website: Für jeden Kurstag des aktuellen Integrationskurses (A1) gibt es
ein **Protokoll** (Tafelbild, Redemittel, Wörter, Regeln mit Übersetzungen in 8 Sprachen) und
**Übungen** für das Handy (mit sofortiger Rückmeldung). Dazu ein **PDF** mit allen Übersetzungen und einem QR-Code zu den Übungen.

Datenformat: `SCHEMA.md` (genau daran halten). Sprachen immer in dieser Reihenfolge:
`uk, ar, fa, tr, ro, sq, mn, fr`.

**Datenschutz:** Nie echte Namen oder persönliche Angaben aus dem Kurs eintragen – nur erfundene Namen
(z. B. Mira, Ali, Olena, Bat, Ardit). Keinen Kursträger, keine Kursnummer, keine E-Mail.

## Ordner

```
kurstagebuch/
  index.html               Übersicht aller Kurstage (liest daten/tage.js)
  kt.css, kt.js            Aussehen + Programm für alle Seiten (keine Bibliotheken)
  daten/tage.js            Liste der Kurstage (neuester zuerst)
  daten/<datum>.js         Protokoll eines Tages (window.KT_DAY)
  daten/<datum>-ueben.js   Übungen eines Tages (window.KT_UEBEN)
  <datum>/index.html       Protokoll-Seite
  <datum>/ueben/index.html Übungs-Seite
  <datum>/qr-ueben.svg     QR-Code zu den Übungen
  <datum>/protokoll-<datum>.pdf  Druckversion
  <datum>/arbeitsblatt-<datum>.pdf  Arbeitsblatt + Lösungsseite
tools/kurstagebuch/make_pdf.py   erstellt QR-Code + 3 PDFs (lang mit 8 Sprachen, kurz nur Deutsch, Arbeitsblatt)
```

Die Seiten sind nur „Hüllen“: `kt.js` liest `data-view` und `data-date` aus dem `<body>` und lädt die passende Datendatei.
Sprachwahl wird im Browser gespeichert (`kt-lang`). `?alle=1` an der Adresse zeigt alle 8 Übersetzungen.

## Funktionen

Alles steckt in `kt.js`/`kt.css` und funktioniert für jeden neuen Kurstag automatisch – **keine neuen Datenfelder nötig**.
Gespeichert wird nur im Browser (`localStorage`). Ist der Speicher gesperrt, funktioniert die Seite trotzdem, nur ohne Merken.

- **Sprache beim ersten Besuch:** Ist noch keine Sprache gespeichert, wird sie aus der Handy-Sprache vorgewählt (wenn eine der 8 Sprachen).
  Die Sprach-Knöpfe brechen auf dem Handy um (alle sichtbar). Gespeichert wird erst beim Antippen (`kt-lang`).
- **Protokoll:** großer Knopf „✏️ Üben“ unter der Überschrift, dazu „🃏 Karteikarten“ und „📤 Teilen“.
  Auf Handys (bis 600 px) sind QR-Bild und „scannen“-Satz ausgeblendet – im Druck/PDF bleiben sie.
- **„Das kann ich“:** Jedes Lernziel hat 😊 🙂 😕 zum Selbst-Einschätzen (`kt-kann`, nicht im Druck).
- **Karteikarten** (`<datum>/?karten=1`): alle Wörter aus `words`-Blöcken. Vorne Deutsch + Emoji, Tippen = Rückseite
  mit Übersetzung. „✓ Weiß ich“ / „✗ Noch nicht“ (kommt ans Ende), Zähler, Richtung umschalten.
  Bei „Nur Deutsch“/„Alle“ wird zuerst nach der Sprache gefragt. Gewusste Karten: `kt-karten-<datum>`. Nicht im Druck.
- **Übungen:** Fortschritt wird pro Tag gespeichert (`kt-ueben-<datum>`) und beim Öffnen wiederhergestellt.
  Ändert sich der Inhalt einer Übung, wird ihr alter Stand verworfen (Prüfsumme). Steckbrief-Eingaben werden **nie** gespeichert.
  Oben eine schmale, mitlaufende Fortschrittsleiste und Knöpfe für alle Übungen (✓ = fertig).
  Nach jeder Übung „Weiter ➜“, am Ende eine Abschlusskarte „🎉 Fertig! x von y richtig“ mit „Fehler üben“
  (nur Übungen mit Fehlern starten neu). „Nochmal“ leert nur diese Übung. Unten: „Meinen Fortschritt löschen“.
  Rückmeldungen und Knöpfe haben eine Übersetzung in der gewählten Sprache (Texte in `UI` in `kt.js`).
- **Zuordnen:** Rückmeldung über dem Raster, gefundene Paare bekommen auf beiden Seiten dieselbe Nummer.
- **Satzbau:** Ein Wort im Satz antippen → es geht zurück.
- **Übersicht:** pro Tag „✓ x/y“ (erledigte Aufgaben) und „📤 Teilen“.
- **Teilen:** Handy-Teilen-Menü, sonst WhatsApp-Link + „🔗 Link kopieren“.
- **„↑“-Knopf** nach dem Scrollen (alle Seiten), Brotkrümel-Links mindestens 44 px hoch.
- **Arbeitsblatt** (`<datum>/ueben/?druck=blatt`): druckbare A4-Fassung aller Übungen aus `KT_UEBEN` (schwarz-weiß-tauglich),
  für jeden Tag automatisch. Kopf „Arbeitsblatt – Tag N: Titel“, Datum, „Name/Datum“-Linien, QR-Code „Online üben mit Lösungen“.
  Pro Übung: Nummer, Titel, deutsche Anweisung + 8 Übersetzungen klein (Kürzel links). Auswahl: a) b) c) mit Kästchen;
  Lücke: Schreiblinie + Wörter in Klammern; Satzbau: Wörter gemischt mit „ / “ + Schreiblinie; Zuordnen: 1–n links,
  a–… rechts gemischt + Antwortzeile; Steckbrief: Feld + Schreiblinie. Reihenfolge fest (gleicher Seed wie die Lösungen,
  nie dreimal hintereinander derselbe Buchstabe). Danach auf neuer Seite „Lösungen“ (zweispaltig, ohne Steckbrief).
  `&loesung=0` lässt die Lösungen weg. Ohne Sprachwahl, Knöpfe, Fortschritt und „↑“.
  Links: Übungsseite unten „🖨️ Arbeitsblatt (PDF)“, Protokoll-Seite in der PDF-Zeile „Arbeitsblatt mit Lösungen“.

## Neuen Kurstag hinzufügen (Beispiel: 2026-11-20)

1. **Daten schreiben:** `daten/2026-11-20.js` (Protokoll) und `daten/2026-11-20-ueben.js` (Übungen) nach `SCHEMA.md`.
   Fehler aus dem Tafelbild korrigieren, Übersetzungen selbst prüfen.
2. **Liste ergänzen:** in `daten/tage.js` oben einen Eintrag einfügen:
   `{date:'2026-11-20', nr:2, title:'…', level:'A1', teaser:'…'}`.
3. **Seiten kopieren:** Ordner `2026-11-19/` (mit `ueben/`) nach `2026-11-20/` kopieren, aber **ohne** `qr-ueben.svg` und PDF.
   In beiden `index.html` ändern: `data-date`, `<title>`, `meta description`, `canonical`.
4. **QR-Code** (im Ordner `kurstagebuch/2026-11-20/`):
   ```
   py -X utf8 -c "import segno; segno.make('https://deutsch-mit-dennis.de/kurstagebuch/2026-11-20/ueben/', error='m').save('qr-ueben.svg', scale=8, border=2)"
   ```
   (macht Schritt 5 auch automatisch, wenn die Datei fehlt).
5. **PDF** (im Repo-Ordner):
   ```
   py -X utf8 tools/kurstagebuch/make_pdf.py 2026-11-20 [Zielordner]
   → protokoll-<datum>.pdf (Deutsch + 8 Sprachen), protokoll-<datum>-deutsch.pdf (kurz, nur Deutsch, zweispaltig)
     und arbeitsblatt-<datum>.pdf (Arbeitsblatt + Lösungsseite, aus …/ueben/?druck=blatt)
   ```
   Alle drei werden in den Zielordner kopiert (falls angegeben). Optional `py -m pip install pymupdf` = halb so große PDFs.
   Einmalig nötig: `py -m pip install segno playwright` und `py -m playwright install chromium`.
6. **Prüfen:** `py -m http.server 8765` starten, `http://localhost:8765/kurstagebuch/2026-11-20/` und `…/ueben/`
   auf dem Handy-Format (320/390 px) ansehen, PDF öffnen.
7. **Veröffentlichen:** nur nach OK von Dennis – `git add kurstagebuch tools/kurstagebuch`, `git commit -m "Kurstagebuch: day 2"`, `git push`.
   Nach Änderungen an `kt.css`/`kt.js` die Nummer `?v=…` in allen Seiten-Hüllen erhöhen.

## Qualitätsregeln (von Dennis, 19.11.2026)
- **Keine Wiederholungen:** Jeder Satz, jedes Wort und jede Grammatikregel steht nur einmal. Was schon in einer Regel-Tabelle steht, kommt nicht noch als Wortliste oder Beispielsatz. Pro Thema höchstens 2 Beispielsätze aus dem Kurs.
- **Einheitliches Layout:** Übersetzungen immer „Kürzel links, Text daneben“ (auch Arabisch/Persisch). In einer Wortliste haben entweder alle Einträge ein Emoji oder keiner (Lücke wird automatisch freigehalten). Lange Tabellen (z. B. Alphabet) zweispaltig.
- **Drei PDFs:** kurz nur Deutsch (zweispaltig, ca. 10 Seiten), lang mit 8 Sprachen und das Arbeitsblatt mit Lösungen. Alle vor dem Push öffnen und ansehen.
