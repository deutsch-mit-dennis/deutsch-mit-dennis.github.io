# Clips und Lizenzen – Lernspiel „Mikula sucht den Weg nach Hause“

Stand: 07.11.2026. Alle Medien sind eigene KI-Erzeugnisse von Dennis Prudnikau. Es wird kein fremdes Material verwendet.
Auf der Spielkarte steht der Hinweis: „Mikula ist eine KI-Figur: Bilder und Stimmen sind KI-generiert.“ (`aiNote` in `stations.json`).

## Bilder (`img/`)

| Datei | Quelle / Werkzeug | Konto | Datum | Original |
|---|---|---|---|---|
| `mikula-neutral.webp` | Google Flow, Nano Banana Pro (Referenz: Figur „Mikula“ aus Flow-Projekt „Nov 02 - 20:19“) | Outlook-Konto von Dennis | 07.11.2026 | `01_Content/Mikula/Foto/spiel/Man_posing_for_portrait_photograph_cd954169.jpg` |
| `mikula-staunen.webp` | Google Flow, Nano Banana Pro | dto. | 07.11.2026 | `…/spiel/Man_looking_up_with_wonder_2d88c50f.jpg` |
| `mikula-freude.webp` | Google Flow, Nano Banana Pro | dto. | 07.11.2026 | `…/spiel/Man_holding_glowing_purple_crystal_12e5cb8c.jpg` |
| `station-bahnhof.webp` | Google Flow, Nano Banana Pro | dto. | 07.11.2026 | `…/spiel/Man_greeting_ticket_vending_machine_aa320880.jpg` |
| `station-supermarkt.webp` | Google Flow, Nano Banana Pro | dto. | 07.11.2026 | `…/spiel/Man_surprised_at_supermarket_ent…_6427b178.jpg` |
| `station-jobcenter.webp` | Google Flow, Nano Banana Pro (Referenz: freundliches Porträt) | dto. | 07.11.2026 | `…/spiel/Man_sitting_in_waiting_area_2f6136f5.jpg` |
| `station-post.webp` | Google Flow, Nano Banana Pro | dto. | 07.11.2026 | `…/spiel/Man_opening_parcel_locker_1f5ced7c.jpg` |
| `station-baeckerei.webp` | Google Flow, Nano Banana Pro | dto. | 07.11.2026 | `…/spiel/Man_gazing_at_bakery_bread_aaf970b5.jpg` |
| `station-muell.webp` | Google Flow, Nano Banana Pro | dto. | 07.11.2026 | `…/spiel/Man_and_neighbor_discussing_recy…_c955318e.jpg` |
| Buchcover (KDP, `Amazon Bücher/source/mikula/img/cover-mikula.jpg`) | Google Flow, Nano Banana Pro, 2K | dto. | 07.11.2026 | `…/spiel/Man_holding_glowing_crystal_on_d046994c_2K.jpg` |
| `*.svg` | eigene Platzhalter-Zeichnungen (Code), werden zurzeit nicht genutzt | – | 07.11.2026 | – |

Prompts vorher mit dem Agenten `vielfalt-bildpruefer` geprüft (würdevoll, freundlich, keine Klischees, kein lesbarer Text, keine Logos).
Nutzungsrechte: laut Google-Bedingungen für generative KI darf Dennis die Ausgaben nutzen. Bitte bei Änderungen der Bedingungen erneut prüfen.

## Stimmen (`audio/tts/<key>.mp3`, Liste in `spiele/tts-mikula.json`)

| Rolle | Anbieter | Stimme | Lizenz |
|---|---|---|---|
| Mikula (`mk`) | ElevenLabs, eleven_multilingual_v2 | „Thomas – Warm German Explainer“ (Voice Library) | kommerzielle Nutzung im bezahlten ElevenLabs-Tarif von Dennis |
| Erzähler (`f1`) | ElevenLabs | Laura | dto. |
| Frauen-Rollen (`f2`) | ElevenLabs | Louisa | dto. |
| Männer-Rollen (`m1`) | ElevenLabs | Christian | dto. |

Vertont am 07.11.2026 mit `tools/tts/voice_local.py mikula`: 713 Sätze in 3 Durchgängen (ca. 7.200 + 8.800 + 33.400 Zeichen ≈ 49.400 ElevenLabs-Credits).
Zwei Sätze gab es schon vorher als Gemini-Aufnahme aus anderen Spielen. Sie werden wiederverwendet.
