# Local voicing with VoiceStudio (Confucius4-TTS)

Since 22.11.2026 the lesson dialogues (`lek-<lesson>-d<n>`) and new Lino sentences are voiced locally instead of by
`audio.yml` (Gemini → ElevenLabs → Google). Engine: Confucius4-TTS (Apache-2.0, commercial use allowed), zero-shot
cloning from ~10 s reference clips. Index entries get `engine: "voicestudio"` (RANK 4 in `generate.py`), so the
nightly cloud run never replaces them.

## Reference voices (not Dennis' clone voice)
| Role | Speaker | Licence |
|---|---|---|
| f2 | Franziska Nelson (LibriVox) | Public Domain |
| f3 | Eva K. (LibriVox) | Public Domain |
| m1 | Thorsten Müller (Thorsten-Voice) | CC0-1.0 |
| m2 | Stefan Schmelz (LibriVox) | Public Domain |

Clips and sources: `VoiceStudio-Test\referenz\rollen\` (see `CLIPS-UND-LIZENZEN.md` there and in the repo root).

## Steps (Windows, Git Bash, repo root)
1. Add the texts to the manifest: `node tools/sync-lesson-dialog-audio.mjs` / `py -X utf8 tools/sync-spiele-audio.py`.
   Spoken text must not contain digits (Confucius4 reads them in English): use `"say"` or `tools/tts/say-overrides.json`.
2. Job list: `py -X utf8 tools/tts/voicestudio/prepare_jobs.py "<work>/jobs.json"` (all entries without MP3)
   and a `<work>/refs.json` like `{"f2": "…/f2_nelson.wav", "f3": …, "m1": …, "m2": …}`.
3. Overnight: `bash tools/tts/voicestudio/run_night.sh` (≈ 2–3 min per sentence on the GTX 1660 Ti).
   It generates (`gen_batch.py`, resumable), back-transcribes with Whisper (`check_takes.py`, retakes up to 2× with
   another seed), then `finish.py` writes `audio/tts/<key>.mp3`, the index entries and `version.json`, and runs
   `tools/qa/audiocheck.py`.
4. Listen to the takes listed as failed in `<work>/report.json`; accept good ones with
   `finish.py … --accept <key>`. Push manifest + MP3s + index **together**.
