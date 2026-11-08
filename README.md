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
- Required notices: `DM.amazonNote` (asterisk text next to book links), the footer sentence in `index.html` and section 4c-2 in the privacy policy (`site.js`).

## Ladezeit (seit 2026-11-08)
Seitenspezifische Skripte werden erst geladen, wenn eine Seite sie braucht: `lazy.js` (Spiele in `spiele/`, `hoeren-data.js`, `lesen-data.js`, `bild-data.js` + `bild.js`). **Neues Spiel:** Datei in `lazy.js` bei `GROUPS.spiele` eintragen, nicht in `index.html`. Neue Seite, die eines davon braucht: Route bei `NEED` ergänzen.
Kleine Bildversionen: `assets/lehrer-tip.jpg`, `assets/alltag-cover.webp`, `assets/avatar/dennis-avatar-klein.jpg` (Originale bleiben liegen).
