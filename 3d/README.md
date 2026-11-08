# 3D-Ansicht „Lernschreibtisch“ (Entwurf)

Optionale zweite Oberfläche für deutsch-mit-dennis.de. Erreichbar über den Knopf **3D** in der Kopfzeile (`index.html`, Stil in `site.css`).
Die 3D-Seite lädt **die echte Website** im Rahmen (`../index.html#route`) – Inhalte werden nicht kopiert.

- `index.html` – Seite (noindex, canonical auf die Startseite), Knopf **Klassisch** zurück zur gleichen Unterseite
- `werkstatt.js` – 3D-Schreibtisch (three.js), Kamerafahrten, Zuordnung Unterseite → Gegenstand (`ROUTES`), Tour
- `werkstatt-views.js` – Innenansichten der Gegenstände (Laptop, Heft, Player, Regal, Studio, Konsole, Prüfungsbogen, Globus, Radio, Tasse, Buchständer)
- `heft-buch.js` – 3D-Heft zum Blättern
- `werkstatt-leben.js` – kleine Dauer-Animationen auf dem Tisch (Dampf, Noten, LEDs, Pokal-Funkeln, Staub im Lampenlicht) und der „Teaser“: ohne Mausbewegung zeigt nach 5 s ein Gegenstand nach dem anderen, was er kann (mit Namensschild). Bei „Bewegung reduzieren“ aus.
- `basis.css`, `werkstatt.css` – Aussehen
- `vendor/three.module.min.js` – three.js 0.160.0, selbst gehostet (Datenschutz: keine fremden Server)
- `tour/` – geführte Tour: `dennis-tour.mp3` (ElevenLabs-Klon wie im Begrüßungsvideo), `timings.json` (wann die Kamera wohin fliegt), `tour-text.json`

Neue Unterseite der Website → in `werkstatt.js` bei `ROUTES` einem Gegenstand zuordnen (sonst öffnet sie im Laptop).
Bücher und Lernpakete kommen automatisch aus `site-data.js` (`DM.books` mit Amazon-Link, `DM.packages`).
Tour neu vertonen: Text in `tour/tour-text.json`, Satz für Satz mit `tools/voice/speak.py`, Zeiten in `tour/timings.json` anpassen.
