# PDF-Werkzeuge (Lernpakete, Unterrichtsstunden, Lerneinheiten)

Im Ordner `tools/pdf` ausführen (`cd tools/pdf`). Benötigt: python3, reportlab, pypdf, Pillow, PyMuPDF.

- `build_pakete.py` – rendert alle Lernpakete aus `pakete/*.json` nach `pakete-out/<id>.pdf`
  (Deckblatt, Lizenzzeile, Layout wie die vorhandenen Pakete). Schema: `pakete/_beispiel-schema.json`.
- `build_lehrer.py` – baut das Lehrerpaket „16 Stunden“ aus den Stunden-JSONs und Kahoot-Daten.
- `build_stunden.py`, `build_lessons.py`, `build_material.py` – Grundlagen (Stile, Schriften, Wasserzeichen).

**Wichtig:** Die Inhalte der kostenpflichtigen Pakete (`pakete/*.json`) und die fertigen Paket-PDFs
gehören NICHT ins öffentliche Repository (siehe `.gitignore`). Ins Repository kommen nur Leseprobe
(`material/leseproben/`), Produktbild (`assets/pakete/`) und der Eintrag in `DM.packages` (site-data.js).
- `build_sim_pdf.py` – druckbare Hefte der **schriftlichen Prüfung** aller Simulationen nach `material/simulation/`
  (`<id>-schriftlich.pdf` für dtz, telc-b1, dtb-b1, telc-b2, dtb-b2; `lid-test-1.pdf`/`lid-test-2.pdf` mit festen NRW-Sätzen).
  Inhalt: Deckblatt mit QR-Code zur Online-Simulation (Hörtexte), Aufgaben, Schreiblinien, Antwortbogen, Lösungen mit
  Erklärung, Checklisten/Mustertexte, Transkripte. Aus dem Repo-Stamm: `python3 tools/pdf/build_sim_pdf.py [id …]` –
  nach jeder Änderung an `sim/*.js` oder `lid-katalog.js` neu ausführen. Die Knöpfe stehen in `simulation.js` (`PDFS`).
- **Hörverstehen als MP3:** `python3 tools/sim/build_listening_mp3.py [id …]` baut `material/simulation/<id>-hoeren.mp3`
  (Gong vor jedem Teil, Signalton + 8 s Lesezeit, Hörtext 1× oder 2× wie in der Prüfung) und `<id>-hoeren.json`
  mit den Startzeiten. **Danach** `build_sim_pdf.py` laufen lassen – dann stehen die Zeitmarken („MP3 ab 3:04“) im Heft.
  `build_sim_pdf.py` baut zusätzlich `<id>-hoeren.pdf` (nur Hören) und `lid-sets.json` (Fragen der LiD-Probetests für
  die Seite „Papier-Antworten prüfen“ `#simulation/<id>/pruefen`).
