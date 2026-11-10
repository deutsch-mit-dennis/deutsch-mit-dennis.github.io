# Deutsch mit Dennis

Kostenlose Lernwebsite von Dennis (Dzianis Prudnikau): Lektionen von A1 bis B2 Beruf, Sprechen, Schreiben, Hören, DTZ- und B2-Prüfungstraining, Leben in Deutschland und Erklärvideos.

Online: https://deutsch-mit-dennis.de

Arbeitsanleitung für Claude Code und Wartung: siehe `CLAUDE.md`. Qualitätsprüfung: `tools/qa/`.

- `index.html`, `site.css`, `site.js`, `site-data.js` – Rahmen, Design, Navigation und neue Seiten
- übrige `.js`/`.css` – Lektionen, Wortschatz, Prüfungstraining, Leben in Deutschland, Kahoot, Hilfe
- `youtube-feed.json` – Videoliste, wird täglich von `.github/workflows/youtube-feed.yml` aktualisiert
- `assets/`, `audio/`, `material/` – Bilder, Aufnahmen und PDFs

## Affiliate links

- The Amazon PartnerNet tracking ID lives in one place only: `TAG` at the top of `affiliate.js`.
- Add a book: put the plain product link (`https://www.amazon.de/dp/ASIN`) into `DM.books` in `site-data.js`. `DM.amazonUrl()` turns it into `https://www.amazon.de/dp/ASIN?tag=…` when the page is rendered.
- Any other Amazon link (also links added later by JavaScript) gets the tag, `rel="sponsored nofollow noopener"` and `target="_blank"` on click.
- Required notices: `DM.amazonNote` (asterisk text next to book links), the footer sentence in `index.html` and section 4c-2 in the privacy policy (`tools/legal/datenschutz.html`).

## Ladezeit (seit 2026-11-08)
Seitenspezifische Skripte werden erst geladen, wenn eine Seite sie braucht: `lazy.js` (Spiele in `spiele/`, `hoeren-data.js`, `lesen-data.js`, `bild-data.js` + `bild.js`). **Neues Spiel:** Datei in `lazy.js` bei `GROUPS.spiele` eintragen, nicht in `index.html`. Neue Seite, die eines davon braucht: Route bei `NEED` ergänzen.
Kleine Bildversionen: `assets/lehrer-tip.jpg`, `assets/alltag-cover.webp`, `assets/avatar/dennis-avatar-klein.jpg` (Originale bleiben liegen).

## SEO und statische Seiten (seit 2026-11-10)
Die App läuft über `#route`. Damit Google alle Bereiche findet, gibt es zusätzlich echte Seiten unter `/pfad/`.

| Was | Wo / Befehl |
|---|---|
| **Sitemap** mit `<lastmod>` | `node tools/build-sitemap.js` – nimmt jede `index.html` (außer `noindex`). Datum = letzter Git-Commit der Datei, bei ungespeicherten Änderungen das Datei-Datum. Die Startseite nimmt das neueste Datum von `index.html`, `site.js`, `site-data.js`, `neu.json`. Läuft automatisch am Ende der Generatoren unten. |
| Teilen-Seiten der Bereiche (`/pruefung/` …) | `python3 tools/make-share-pages.py` (leiten zur App weiter, mit BreadcrumbList) |
| Lieder, LiD-Fragen, Simulationen, **Impressum, Datenschutz** | `python3 tools/make-seo-pages.py` – Rechtstexte stehen in `tools/legal/impressum.html` und `tools/legal/datenschutz.html` (dort ändern, dann Skript laufen lassen). Alte Links `/#impressum` leiten weiter. |
| DTZ-Musterbriefe `/dtz-schreiben/<brieftyp>/` | Inhalt in `tools/dtz-schreiben/briefe.json`, Seiten bauen mit `python3 tools/make-dtz-briefe.py` (`"draft": true` = gelbes Entwurf-Schild) |
| Einleitungstext der Startseite | in `index.html` zwischen `<!--intro:start-->` und `<!--intro:end-->` ändern, dann `python3 tools/sync-home-intro.py` (kopiert ihn in den `<noscript>`-Teil, zählt Wörter). `site.js` hängt ihn unten an die Startseite. |
| Navigation/Fußzeile | echte Links (`/pruefung/`), `site.js` fängt den Klick ab und routet in der App (`SECTION_LINK`). Neue Bereiche dort und in `index.html` ergänzen. |
| Bilder > 200 KB | `python3 tools/make-webp.py` legt eine WebP-Kopie daneben und stellt `youtube-feed.json`/`kahoot-feed.json` darauf um (Original bleibt). |
| alt-Texte der LiD-Bilder | `lid-bilder-alt.js` |
| Prüfung | `python3 tools/seo-audit.py` – lang, ein H1, Title < 60, Description < 155, img ohne alt, Skripte ohne defer |

JSON-LD: Startseite `WebSite` + `Person` + `EducationalOrganization` (in `index.html`), alle Unterseiten `BreadcrumbList`, Simulationen, LiD-Seiten und Musterbriefe zusätzlich `LearningResource`.
