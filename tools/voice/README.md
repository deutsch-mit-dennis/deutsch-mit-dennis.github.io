# Dennis' Stimme (ElevenLabs-Klon)

Alles, was mit **Dennis' eigener Stimme** vertont wird (Begrüßungsvideo der Website, später YouTube-Texte), nutzt diese eine Einstellung.

| Datei | Wozu |
|---|---|
| `dennis.json` | **Die einzige Stelle** für Stimme und Modell: `voice_id`, `model_id`, Klang-Einstellungen |
| `speak.py` | Text oder Text-Datei → MP3 in Dennis' Stimme |
| `../../.env` | API-Key: `ELEVENLABS_API_KEY=…` (steht in `.gitignore`, kommt nie ins Repo) |

## Aktuelle Stimme

- **Dennis DE v2 (7 Ausschnitte)**, Instant Voice Clone, `voice_id` `1OmuxvgWczLrqUVwrIrE`
- trainiert mit 7 Ausschnitten à ~32 s aus Dennis' deutschen Lehrer-Aufnahmen (`Downloads\Klon Stimme DE\ivc-samples\`)
- Modell **`eleven_v3`** (im Hörtest am natürlichsten), Ähnlichkeit 0.9

**Auf einen Profi-Klon wechseln:** in `dennis.json` nur `voice_id` (und ggf. `voice_name`) ändern. Fertig.

## Vertonen

**Am einfachsten (YouTube-Skripte):** Text als `.txt` oder `.md` speichern und mit der Maus auf
`tools\voice\vertonen.bat` ziehen. Die MP3 entsteht **neben der Text-Datei** (`skript.md` → `skript.mp3`).
Eine vorhandene MP3 wird nie überschrieben – dann heißt die neue z. B. `skript-2.mp3`.

Im Text darf stehen: Überschriften (`#`), Aufzählungen, **fett**, Links, `[pause]` – das wird vor dem Vorlesen entfernt
bzw. als Absatz-Pause gelesen. Jeder Absatz (Leerzeile) ist eine natürliche Pause.

Im Terminal:

```bash
python tools/voice/speak.py "Hallo und herzlich willkommen!" hallo.mp3
python tools/voice/speak.py skript.md                         # -> skript.mp3, lange Texte in Abschnitten
python tools/voice/speak.py text.txt a1.mp3 --speed 0.85      # langsamer (A1)
python tools/voice/speak.py text.txt test.mp3 --model eleven_v4   # anderes Modell testen
```

Lange Texte werden absatzweise (max. ~2.500 Zeichen pro Abschnitt) erzeugt und mit ffmpeg zusammengesetzt.
Aussprache-Probleme: Wort im Text anders schreiben (z. B. „Tee-Zett“ statt „DTZ“, falls nötig).

## Begrüßungsvideo der Website (Avatar)

Der sprechende Avatar ist ein **HeyGen-Video** (`assets/avatar/willkommen.mp4`, eingebunden in `tour.js`).
Neue Begrüßung:

1. Text in `assets/avatar/willkommen.vtt` ändern (eine Zeile je Untertitel).
2. Text als Datei speichern und vertonen: `python tools/voice/speak.py willkommen.txt willkommen-dennis.mp3`
3. In HeyGen (Konto mit dem Avatar „Dzianis-Dennis“): Projekt öffnen → Mikrofon-Symbol im Skript → **Audio hochladen** → MP3 wählen,
   „Sprachspiegelung“ **aus** → alte Text-Szene löschen → **Erstellen**. Danach das MP4 herunterladen.
4. MP4 als `assets/avatar/willkommen.mp4` ablegen. Untertitel-Zeiten (`willkommen.vtt`) und die Sekunden in `STEPS` (`tour.js`)
   an die neue Tonspur anpassen (Wort-Zeitstempel z. B. mit faster-whisper).
5. `?v=`-Nummer von `tour.js` in `index.html` erhöhen, testen, pushen.

## Kosten

- **ElevenLabs:** 1 Zeichen Text ≈ 1 Credit. Begrüßung (~510 Zeichen) ≈ 510 Credits; eine 10-Minuten-YouTube-Folge (~8.000 Zeichen) ≈ 8.000 Credits.
  Creator-Tarif: 100.000 Credits/Monat (Stand 11/2026, bitte im Konto prüfen).
- **HeyGen Gratis-Tarif:** 3 Videos/Monat, je bis 1 Minute, mit HeyGen-Wasserzeichen. Ohne Wasserzeichen: Creator-Tarif (~25 €/Monat).
- Auf der Website selbst entstehen **keine laufenden Kosten** – das Video ist eine fertige Datei, kein Key im Browser.
