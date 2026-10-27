# dmd-whisper (Cloudflare Worker)

Genauere Spracherkennung nach der Aufnahme (Prüfungsmodus, Simulationen, Sprech-Coach).

- Läuft unter https://dmd-whisper.dennis-prudnikau.workers.dev/ (Cloudflare-Konto dennis.prudnikau@gmail.com)
- Binding: Workers AI, Name `AI`; Modell `@cf/openai/whisper-large-v3-turbo`
- Nur Anfragen von deutsch-mit-dennis.de (und localhost) werden angenommen, max. 4 MB, 40 Aufnahmen pro Stunde und IP
- Kosten: 10.000 Neuronen pro Tag gratis ≈ 200 Minuten Audio/Tag. Ist das aufgebraucht, nutzt die Seite automatisch nur die Browser-Mitschrift.
- Ändern: Dashboard → Workers & Pages → dmd-whisper → „Edit code“, Inhalt von `worker.js` einfügen, „Deploy“.
- Aufruf auf der Website: `DMMitschrift.whisper(blob)` in `mitschrift.js`
