"""Batch voice cloning with Confucius4-TTS (Apache-2.0). Runs in the Confucius4 venv, cwd = Confucius4 clone.

Usage: python gen_batch.py <clone_dir> <jobs.json> <refs.json> <wav_dir> [keys_to_redo.json]
refs.json: {"f2": "path/to/ref.wav", ...}. Resumable: existing <key>.wav files are skipped.
A redo list ({"key": attempt}) regenerates those keys with another seed (attempt number)."""
import json
import os
import sys
import time

clone_dir, jobs_path, refs_path, wav_dir = sys.argv[1:5]
redo = json.load(open(sys.argv[5], encoding='utf-8')) if len(sys.argv) > 5 else {}
sys.path.insert(0, clone_dir)
import soundfile as sf  # noqa: E402
import torch  # noqa: E402
from confuciustts.cli.inference import ConfuciusTTS  # noqa: E402

jobs = json.load(open(jobs_path, encoding='utf-8'))
refs = json.load(open(refs_path, encoding='utf-8'))
os.makedirs(wav_dir, exist_ok=True)
todo = [j for j in jobs if j['key'] in redo or not os.path.exists(os.path.join(wav_dir, j['key'] + '.wav'))]
print(f'{len(todo)} of {len(jobs)} to generate', flush=True)
if not todo: sys.exit(0)
device = 'cuda' if torch.cuda.is_available() else 'cpu'
model = ConfuciusTTS(config_path=os.path.join(clone_dir, 'config', 'inference_config.yaml'), device=device)
sr = model.sample_rate
log = open(os.path.join(wav_dir, 'gen_log.jsonl'), 'a', encoding='utf-8')
for n, j in enumerate(todo, 1):
    attempt = int(redo.get(j['key'], 0))
    torch.manual_seed(1234 + 7919 * attempt)
    t = time.time()
    try:
        audio = model.generate(j['text'], 'de', refs[j['voice']], raw=True)
        wav = audio.squeeze().float().cpu().numpy()
        tmp = os.path.join(wav_dir, j['key'] + '.tmp.wav')
        sf.write(tmp, wav, sr, subtype='PCM_16')
        os.replace(tmp, os.path.join(wav_dir, j['key'] + '.wav'))
        rec = {'key': j['key'], 'voice': j['voice'], 'attempt': attempt, 'gen_s': round(time.time() - t, 1),
               'audio_s': round(len(wav) / sr, 2)}
    except Exception as e:  # noqa: BLE001
        rec = {'key': j['key'], 'error': f'{type(e).__name__}: {e}'[:300]}
    rec['n'] = f'{n}/{len(todo)}'
    print(json.dumps(rec, ensure_ascii=False), flush=True)
    log.write(json.dumps(rec, ensure_ascii=False) + '\n'); log.flush()
