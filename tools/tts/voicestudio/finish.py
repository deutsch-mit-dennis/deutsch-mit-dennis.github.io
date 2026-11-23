#!/usr/bin/env python3
"""Turns checked VoiceStudio takes into website MP3s and registers them in audio/tts/index.json.

Usage (repo root): py -X utf8 tools/tts/voicestudio/finish.py <jobs.json> <wav_dir> <report.json> [--accept key ...]
Only takes that passed check_takes.py are used (plus keys named after --accept, after listening).
Index entries get engine "voicestudio" (RANK 4): audio.yml never replaces them. version.json is bumped."""
import json, os, subprocess, sys, tempfile
sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), '..'))
import generate as G  # noqa: E402

args = sys.argv[1:]
accept = set(args[args.index('--accept') + 1:]) if '--accept' in args else set()
jobs_path, wav_dir, report_path = args[:3]
jobs = json.load(open(jobs_path, encoding='utf-8'))
report = json.load(open(report_path, encoding='utf-8'))
entries = {e['key']: e for e in G.load_entries()}
index = json.load(open(G.INDEX, encoding='utf-8'))
files = index['files']
done, missing = 0, []
for j in jobs:
    e, r = entries[j['key']], report.get(j['key'])
    wav = os.path.join(wav_dir, j['key'] + '.wav')
    if not (r and os.path.exists(wav) and (r['ok'] or j['key'] in accept)):
        missing.append(j['key']); continue
    pause = float(e.get('pause', 0.55))
    target = os.path.join(G.OUT, j['key'] + '.mp3')
    with tempfile.TemporaryDirectory() as td:
        trimmed = os.path.join(td, 't.wav')
        # trim silence at both ends, then the same framing and loudness as generate.py build()
        G.run(['ffmpeg', '-y', '-loglevel', 'error', '-i', wav, '-af',
               'highpass=f=40,silenceremove=start_periods=1:start_threshold=-50dB,areverse,'
               'silenceremove=start_periods=1:start_threshold=-50dB,areverse', '-ar', '24000', '-ac', '1', trimmed])
        G.run(['ffmpeg', '-y', '-loglevel', 'error', '-i', trimmed, '-af',
               f'adelay={int(pause * 1000)},apad=pad_dur={pause},loudnorm=I=-17:TP=-1.5:LRA=11',
               '-ar', '44100', '-ac', '1', '-codec:a', 'libmp3lame', '-b:a', '96k', target])
    files[j['key']] = {'sig': G.signature(e, 'voicestudio'), 'engine': 'voicestudio', 'text': G.signature(e, 'text')}
    done += 1
G.write_index(files)
print(f'{done} MP3s written/registered · not ready: {len(missing)} {missing}')
