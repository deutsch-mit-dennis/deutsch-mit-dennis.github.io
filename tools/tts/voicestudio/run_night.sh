#!/usr/bin/env bash
# Overnight run: generate all takes, check them with Whisper, retake failures (max. 2x), build MP3s + index.
# Usage (Git Bash, repo root): bash tools/tts/voicestudio/run_night.sh
# Paths can be overridden: VS (VoiceStudio-Test folder), WORK (job folder with jobs.json + refs.json).
set -u
REPO="$(cd "$(dirname "$0")/../../.." && pwd)"
VS="${VS:-C:/Users/denni/Documents/Claude Neues/VoiceStudio-Test}"
WORK="${WORK:-$VS/work/dmd-dialoge}"
T="$REPO/tools/tts/voicestudio"
export HF_HOME="$VS/cache/hf" HF_HUB_OFFLINE=1
gen() { (cd "$VS/confucius4" && ./.venv/Scripts/python.exe -X utf8 "$T/gen_batch.py" "$VS/confucius4" "$WORK/jobs.json" "$WORK/refs.json" "$WORK/wav" "$@"); }
check() { "$VS/src/.venv/Scripts/python.exe" -X utf8 "$T/check_takes.py" "$WORK/jobs.json" "$WORK/wav" "$WORK/report.json"; }
echo "== start $(date)"
gen
for round in 1 2 3; do
  check
  if [ "$(cat "$WORK/wav/redo.json")" = "{}" ] || [ "$round" = 3 ]; then break; fi
  echo "== retake round $round $(date)"
  gen "$WORK/wav/redo.json"
done
cd "$REPO" && py -X utf8 "$T/finish.py" "$WORK/jobs.json" "$WORK/wav" "$WORK/report.json"
py -X utf8 tools/qa/audiocheck.py | tail -n 30
echo "== end $(date)"
