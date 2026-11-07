# Lernspiel „Mikula sucht den Weg nach Hause“

Mikula, ein Bauer aus dem Jahr 1024, braucht 10 Zeitkristalle für seine kaputte Zeitmaschine.
An jeder Station lösen die Lernenden 6 Aufgaben (A1, A2 oder B1) und bekommen einen Kristall plus eine Liste „Neue Wörter“.

- **Im Browser:** `#spiele/mikula` (Bereich Lernspiele → Abenteuer)
- **Code:** `spiele/mikula.js` (musst du nicht anfassen)
- **Inhalte:** nur JSON-Dateien in diesem Ordner

```
spiele/mikula/
├─ stations.json          ← Geschichte, Karte (Reihenfolge der Stationen), Ende-Bildschirm, Mikula-Bilder
├─ stations/
│  ├─ bahnhof.json        ← eine Datei pro Station
│  └─ supermarkt.json
├─ img/                   ← Bilder (zurzeit einfache Platzhalter-Zeichnungen)
└─ README.md              ← diese Anleitung
```

---

## 1. Eine neue Station hinzufügen

1. **Datei kopieren:** `stations/bahnhof.json` kopieren und umbenennen, z. B. `stations/post.json`.
2. **Oben in der neuen Datei** `id`, `title`, `icon` und `img` anpassen:
   ```json
   "id": "post", "title": "Bei der Post", "icon": "📮", "img": "spiele/mikula/img/station-post.svg",
   ```
3. **Texte und Aufgaben ersetzen** (Aufbau siehe Abschnitt 4). Pro Niveau (`A1`, `A2`, `B1`) gibt es 6 Aufgaben.
4. **In `stations.json` freischalten:** Die Station steht dort schon als `"status": "soon"`. Ändere sie so:
   ```json
   { "id": "post", "title": "Bei der Post", "icon": "📮", "file": "post.json", "status": "active" },
   ```
   - `active` = spielbar · `soon` = sichtbar mit Schloss „bald“ · `secret` = „???“
   - Die Reihenfolge in der Liste ist die Reihenfolge auf der Karte.
5. **Ende-Text anpassen:** In `stations.json` unter `"end"` steht „Zwei Kristalle habe ich schon“. Passe die Zahl an, wenn es mehr Stationen gibt.
6. **Prüfen** (siehe Abschnitt 5), dann erst veröffentlichen.

> Tipp: Lass Claude die neue Station schreiben: „Schreib die Station Post für das Mikula-Spiel im Format von bahnhof.json und prüf sie mit dem Validator.“

## 2. Bilder tauschen

Die Bilder liegen in `img/` (KI-Bilder aus Google Flow, Nano Banana Pro, Quelle siehe `CLIPS-UND-LIZENZEN.md`):

| Datei | Wo sie erscheint |
|---|---|
| `mikula-neutral.webp` | Mikula erklärt oder bittet um Hilfe |
| `mikula-staunen.webp` | Mikula sieht etwas Neues oder reagiert auf einen Fehler |
| `mikula-freude.webp` | Station geschafft, Ende |
| `station-bahnhof.webp`, `station-supermarkt.webp` | großes Bild oben in der Station (Format 3:2) |

**Neue Bilder in Flow:** Flow-Projekt „Nov 02 - 20:19“ (Outlook-Konto) → Bild-Modus, Nano Banana Pro (0 Credits) → mit `@` das Bild „Man posing for portrait photograph“ als Referenz anhängen, damit Mikula gleich aussieht. Neue Stations-Bilder bekommen in der Station-Datei auch ein `"imgAlt"` (kurze Bildbeschreibung für Screenreader).

**So tauschst du ein Bild:**
1. Neues Bild in `img/` legen, z. B. `mikula-staunen.png` (quadratisch, mind. 300 × 300 px; Stationsbilder 2:1, z. B. 1280 × 640 px). Am besten als `.webp` oder kleines `.png` (unter 200 KB).
2. Den Pfad ändern: Mikula-Bilder in `stations.json` unter `"images"`, Stationsbilder in der Station-Datei unter `"img"`.
   ```json
   "staunen": "spiele/mikula/img/mikula-staunen.png"
   ```
3. Bei KI-Bildern: Prompt vorher über den Agenten `vielfalt-bildpruefer` prüfen. Im Spiel steht dann ein Hinweis wie auf der Seite „Mikula lernt Deutsch“ („Bild ist KI-generiert“).

## 3. Vertonung (natürliche Stimmen)

Alle Sätze sind mit ElevenLabs vertont (Mikula = Stimme „Thomas“, Erzähler = Laura). Wer welche Stimme hat und die Lizenzen: `CLIPS-UND-LIZENZEN.md`.

**Nach neuen oder geänderten Sätzen** (neue Station, Text korrigiert) drei Befehle im Website-Ordner:
```bash
node tools/collect-spiele-tts.mjs
py -X utf8 tools/sync-spiele-audio.py
py -X utf8 tools/tts/voice_local.py mikula --dry
```
Der letzte Befehl zeigt nur, wie viele Zeichen (= ElevenLabs-Credits) nötig sind, und kostet nichts. Wenn das passt, denselben Befehl ohne `--dry` starten. Er nutzt deinen Schlüssel aus `.env`.
(Ohne diesen Schritt vertont der nächtliche GitHub-Workflow die neuen Sätze nach dem Veröffentlichen mit Gemini.)

Hinweis: `collect-spiele-tts.mjs` schreibt auch die Dateien der anderen Spiele neu. Ändern sich dort nur die Zeilenenden, mit `git checkout -- spiele/tts-*.json` zurücksetzen und nur `spiele/tts-mikula.json` behalten.

### Eigene Aufnahmen (deine Stimme)

Jeder Satz hat ein Feld `"audio": ""`.
- **Leer** → das Spiel liest den Text mit der Vorlese-Technik der Website (natürliche Aufnahme, falls schon vertont, sonst Gerätestimme).
- **Mit Pfad** → deine Aufnahme wird abgespielt:
  ```json
  { "who": "mikula", "mood": "staunen", "text": "Was ist das?", "audio": "spiele/mikula/audio/bahnhof-a1-01.mp3" }
  ```
  MP3-Dateien dafür in einen neuen Ordner `spiele/mikula/audio/` legen. Name frei wählbar, am besten `station-niveau-nummer.mp3`.
- **Zahlen und Uhrzeiten:** Steht im Text eine Ziffer (z. B. „Gleis 3“), gibt es zusätzlich `"say": "Gleis drei"`. So spricht die Stimme es richtig aus. Die Anzeige bleibt `"text"`.

## 4. Aufbau einer Station-Datei

```json
{
  "id": "bahnhof", "title": "Am Bahnhof", "icon": "🚉", "img": "spiele/mikula/img/station-bahnhof.svg",
  "intro":  { "A1": [Satz, Satz], "A2": [...], "B1": [...] },
  "tasks":  { "A1": [6 Aufgaben], "A2": [6 Aufgaben], "B1": [6 Aufgaben] },
  "outro":  { "A1": Satz, "A2": Satz, "B1": Satz },
  "words":  [ { "word": "Fahrkarte", "article": "die", "plural": "die Fahrkarten",
                "example": "Ich kaufe eine Fahrkarte.", "emoji": "🎫", "level": "A1", "audio": "" } ]
}
```
**Satz** = `{ "who": "mikula" | "erzaehler" | "Kassiererin", "mood": "neutral" | "staunen" | "freude", "text": "…", "audio": "" }`

**Aufgaben-Arten:**

| Art | Niveau | Was die Lernenden tun | Wichtige Felder |
|---|---|---|---|
| `choice` | A1 (auch A2) | 1 von 3 Antworten antippen (z. B. „die Fahrkarte“) | `emoji`, `question`, `options` (genau 3), `answer` (0, 1 oder 2 = Position der richtigen Antwort), `wrong`, `explain` |
| `order` | A2 | Wörter in die richtige Reihenfolge tippen | `words` (in **richtiger** Reihenfolge – das Spiel mischt sie), `alt` (weitere richtige Reihenfolgen, sonst `[]`) |
| `rate` | B1 | Die beste Antwort in einem Gespräch wählen | `situation`, `line` (wer spricht), `options` mit je `verdict`: genau einmal `passend`, `unhöflich`, `falsch` + `explain` |

- `wrong` = Mikulas lustige Reaktion bei einem Fehler (ein Satz).
- `explain` = kurze Erklärung in einfachem Deutsch.
- Bei einem Fehler kann man es nochmal versuchen. Beim Satzbauen zeigt das Spiel nach dem zweiten Fehler die Lösung.

## 5. Prüfen vor dem Veröffentlichen

```bash
py -X utf8 -m http.server 8765
```
Dann im Browser öffnen: http://localhost:8765/#spiele/mikula

Automatischer Test (spielt alle Niveaus auf Handybreite durch):
```bash
py -X utf8 tools/qa/games.py mikula
```

**Spielstand zurücksetzen:** Auf der Karte unten „↺ Spiel neu starten“ (zweimal tippen).
Der Spielstand liegt nur im Browser (`localStorage`, Schlüssel `dm-mikula`). Es wird nichts an einen Server geschickt.

## 6. Wo das Spiel auf der Website verlinkt ist
- Lernspiele → Abenteuer (automatisch über `DMGame.register` in `spiele/mikula.js`)
- Seite „Mikula lernt Deutsch“ (`#mikula`): Kasten „Neu: Lernspiel …“ (`mikula.js` im Hauptordner)
- Zahl „23 Spiele“: `site.js` (zweimal) und `spiele/index.html`. Bei neuen Spielen dort hochzählen.
