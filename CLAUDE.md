# CLAUDE.md – Lernwebsite „Deutsch mit Dennis“

Arbeitsanleitung für Claude Code. Wird bei jeder Sitzung in diesem Repository automatisch gelesen.

## Wer, was, wo
- **Betreiber:** Dennis (Dzianis Prudnikau), DaZ-Lehrer, DTZ- und telc-Prüfer. Kein Entwickler → Erklärungen auf **Deutsch, einfach, ohne Fachchinesisch**. Code, Kommentare und Commit-Nachrichten auf **Englisch**.
- **Website:** https://deutsch-mit-dennis.de – kostenlose Lern-Website A1–C1 (Lektionen, Hören, Lesen, Sprechen/Schreiben, Prüfungssimulationen DTZ/LiD/telc/DTB, Lernspiele, Lieder).
- **Hosting:** GitHub Pages, Repo `deutsch-mit-dennis/deutsch-mit-dennis.github.io`, Branch `main`. Jeder Push auf `main` ist nach ca. 1 Min. live. Domain bei INWX (Datei `CNAME`).
- **Die meisten Besucher kommen mit dem Handy.** Alles muss auf 320, 360 und 390 px Breite funktionieren (keine waagerechte Scrollleiste, Knöpfe ≥ 44 px).

## Aufbau (reines HTML/CSS/JS, kein Build-Schritt)
- `index.html` lädt alle Skripte. **Nach jeder Änderung an einer .js/.css-Datei die `?v=JJJJMMTTx`-Nummer in `index.html` erhöhen** (sonst sehen Besucher die alte Version aus dem Cache).
- Routing über `#hash`: `site.js` (`window.route`, `OWN`-Routen, `DM.routes.*`). Ältere Bereiche (Lektionen, Wortschatz) in `app.js`, `book.js`, `vocab.js`, `platform.js`.
- Inhalte: `site-data.js` (Seiten, Lernpakete), `hoeren-data.js`, `lesen-data.js`, `lieder-data.js`, `lid-katalog.js` (LiD-Fragen), `sim/<id>.js` (Prüfungssimulationen, Format: `tools/sim/SCHEMA.md`).
- Lernspiele: `spiele.js` (Rahmen, API siehe Kopfkommentar) + `spiele/<id>.js`. Lino (Jump’n’Run): neue Fragen in `spiele/lino-extra.js`, nicht in `lino.js`.
- Teilen-Seiten/Vorschaubilder: `python3 tools/make-share-pages.py` (nach neuen Paketen, Preisen, Bereichen).

## Hörtexte (natürliche Stimmen statt Gerätestimme)
- Jeder vorgelesene Satz ist ein Eintrag in `tools/tts/manifest.json` → MP3 in `audio/tts/<key>.mp3`, Übersicht `audio/tts/index.json` (welcher Anbieter: `engine`).
- Neue Texte eintragen (je nach Bereich): `node tools/sync-listening-audio.mjs` (Hören/Üben), `node tools/sim/sync-sim-audio.mjs` (Simulationen), `node tools/collect-spiele-tts.mjs` + `python3 tools/sync-spiele-audio.py` (Spiele).
- Zahlen/Uhrzeiten zum Vorlesen ausschreiben: Feld `"say"` im Segment (Anzeige bleibt `"text"`). Eine geänderte `say` erzwingt eine Neuaufnahme.
- Vertonung macht der GitHub-Workflow „Hörtexte vertonen“ (`audio.yml`, nachts automatisch). Reihenfolge: Gemini → ElevenLabs → Google Chirp 3 HD. Gemini/ElevenLabs gelten als „menschlich“, Google-Aufnahmen werden automatisch ersetzt, sobald wieder Guthaben da ist. Stand in `audio/tts/status.json`.
- Nie zwei Vertonungsläufe gleichzeitig starten. Neu starten mit `gh api -X POST repos/deutsch-mit-dennis/deutsch-mit-dennis.github.io/actions/workflows/audio.yml/dispatches -f ref=main`.
- Lieder: nur als Suno-Einbettung, keine eigenen MP3s. Neue Lieder: Länge in `SONG_SEC` (site.js) nachtragen.

## Prüfen vor jedem Push (Pflicht)
```bash
python3 -m http.server 8765 &            # Website lokal starten
python3 tools/qa/crawl.py                # alle Seiten: JS-Fehler, 404, leere Seiten, Überlauf
python3 tools/qa/games.py [spiel-id]     # Spiele bis zum Ergebnis durchspielen (390 + 320 px)
python3 tools/qa/audiocheck.py           # MP3s: fehlend, abgeschnitten, verrauscht, Anbieter
```
Voraussetzung einmalig: `pip install playwright && playwright install chromium`. Ergebnisse in `qa-out/` (nicht im Repo).
Nach Änderungen an Simulationen: `node tools/sim/validate.mjs sim/<id>.js`, danach `python3 tools/sim/build_listening_mp3.py` und `python3 tools/pdf/build_sim_pdf.py`.

## Feste Regeln
- **Nichts löschen oder überschreiben ohne Rückfrage bei Dennis.** Besonders nicht: `google34659683a6a2bee5.html` (Search Console), `CNAME`, `sw.js`, `pwa.js` (räumen alte Service Worker ab).
- Keine Zugangsdaten/API-Schlüssel ins Repo – nur als GitHub-Secrets (`GEMINI_API_KEY`, `ELEVENLABS_API_KEY`, `GOOGLE_TTS_API_KEY`, `CF_API_TOKEN`, `CF_ACCOUNT_ID`).
- Seiten mit Fragen aus dem LiD-Katalog immer mit `LID_QUELLE_HTML` (Quellenangabe, Hinweis „nicht vom BAMF“).
- Eigene Prüfungsaufgaben nur „im Stil der Prüfung“ – keine Originalaufgaben von telc, g.a.s.t. oder BAMF.
- Kostenlose Lösungen zuerst. Bezahlte Lernpakete laufen über Digistore24 (Produktbilder dort nicht ohne Dennis tauschen).
- PDFs zum Download tragen das Wasserzeichen „created by D.Prudnikau“ (bezahlte Pakete: Lizenzhinweis statt Wasserzeichen).
- Commit-Nachrichten auf Englisch, kurz. Neuigkeiten für Besucher in `neu.json` eintragen.
- Am Ende jeder Arbeit: Dennis in 2–3 Sätzen auf Deutsch sagen, was sich geändert hat und wo er es sieht.

## Automatik (GitHub Actions)
- `youtube-feed.yml` täglich 5:17 UTC: Videos, Musik, Kahoots, Feed.
- `audio.yml` täglich 3:41 UTC: Vertonung.
- `witz.yml` täglich 4:17 UTC: Übersetzungen „Witz des Tages“.
- `besuche.yml` täglich 4:07 UTC: Besucherzahlen (Cloudflare) → `stats/besuche.json`.
- Whisper-Worker für die Sprech-Mitschrift: `tools/whisper-worker/` (Cloudflare, Änderungen im Dashboard deployen).
