# PDF-Werkzeuge (Lernpakete, Unterrichtsstunden, Lerneinheiten)

Im Ordner `tools/pdf` ausführen (`cd tools/pdf`). Benötigt: python3, reportlab, pypdf, Pillow, PyMuPDF.

- `build_pakete.py` – rendert alle Lernpakete aus `pakete/*.json` nach `pakete-out/<id>.pdf`
  (Deckblatt, Lizenzzeile, Layout wie die vorhandenen Pakete). Schema: `pakete/_beispiel-schema.json`.
- `build_lehrer.py` – baut das Lehrerpaket „16 Stunden“ aus den Stunden-JSONs und Kahoot-Daten.
- `build_stunden.py`, `build_lessons.py`, `build_material.py` – Grundlagen (Stile, Schriften, Wasserzeichen).

**Wichtig:** Die Inhalte der kostenpflichtigen Pakete (`pakete/*.json`) und die fertigen Paket-PDFs
gehören NICHT ins öffentliche Repository (siehe `.gitignore`). Ins Repository kommen nur Leseprobe
(`material/leseproben/`), Produktbild (`assets/pakete/`) und der Eintrag in `DM.packages` (site-data.js).
