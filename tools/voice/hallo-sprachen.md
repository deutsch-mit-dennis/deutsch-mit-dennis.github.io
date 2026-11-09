# Dennis begrüßt in 7 Sprachen (VoiceStudio, Klonstimme)

Ziel: sieben kurze Begrüßungen (je ca. 15–25 Sekunden) in Dennis' Klonstimme: Ukrainisch, Russisch, Arabisch, Persisch, Türkisch, Spanisch, Italienisch.
Die Texte stehen in `tools/voice/hallo-texte.json` (Zahlen: keine, alles ausgeschrieben). Sie zeigt die Website schon als Text auf `#hallo`.

## Ablauf (auf Dennis' PC, VoiceStudio lokal)
1. Pro Sprache den Text aus `hallo-texte.json` mit Dennis' Klonstimme vertonen.
2. Ergebnis als MP3 nach `assets/hallo/<code>.mp3` (`uk`, `ru`, `ar`, `fa`, `tr`, `es`, `it`).
3. Jede Datei anhören: Stimme klingt nach Dennis, keine abgeschnittenen Sätze, keine falsch gesprochenen Wörter, Name „Dennis“ sauber.
4. Video mit Dennis' Foto erzeugen: `python tools/voice/make-hallo-videos.py` (macht aus Foto + MP3 je ein MP4 im Hochformat und eine Untertitel-Datei `.vtt`).
5. Pro fertiger Sprache in `assets/hallo/manifest.json` unter `files` eintragen, z. B. `"uk": { "src": "assets/hallo/uk.mp3", "video": "assets/hallo/uk.mp4", "vtt": "assets/hallo/uk.vtt" }`. Video und Player erscheinen dann automatisch auf der Seite `#hallo`.

Der **animierte Avatar** (Begrüßungsvideo `assets/avatar/willkommen.mp4`) bleibt nur auf Deutsch. In den anderen Sprachen gibt es Foto + Stimme.

## Lizenz (wichtig)
- Standard-Engine **OmniVoice** ist **nicht kommerziell (CC-BY-NC)** → nur **Entwürfe zum Anhören**, **nicht** in `manifest.json` eintragen und nicht veröffentlichen.
- Für die **Veröffentlichung** die Engine **Confucius4-TTS (Apache-2.0, kommerziell erlaubt)** nehmen. Sie ist auf Dennis' PC sehr langsam → nur kurze Clips, Sprache für Sprache.
- Unterstützt Confucius4-TTS eine Sprache nicht oder klingt sie schlecht (bei Persisch und Arabisch ist das offen), diese Sprache **nicht** mit einer anderen Engine „retten“, sondern Dennis Bescheid geben.
- Eine fremde Stimme ersetzt die Klonstimme nicht.

## Kennzeichnung und Qualität
- Die Seite zeigt automatisch „Stimme mit KI erstellt (Stimmklon von Dennis)“, sobald Audio da ist.
- Dennis spricht diese Sprachen nicht selbst. Vor dem Veröffentlichen sollte je Sprache eine Muttersprachlerin oder ein Muttersprachler den **Text und die Aussprache** prüfen.
