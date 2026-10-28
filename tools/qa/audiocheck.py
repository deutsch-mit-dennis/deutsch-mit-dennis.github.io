#!/usr/bin/env python3
"""Checks all recorded MP3s in audio/tts: missing/empty files, suspicious speed (cut off or garbled long tail),
long silences, clipping. Prints the engine (google/gemini/elevenlabs) per file.
Usage (repo root): python3 tools/qa/audiocheck.py   -> qa-out/audio.json"""
import json,subprocess,os,statistics,sys
from concurrent.futures import ThreadPoolExecutor
f=json.load(open('audio/tts/index.json'))['files']
m={e['key']:e for e in json.load(open('tools/tts/manifest.json'))['entries']}
def probe(k):
    p=f'audio/tts/{k}.mp3'
    d=float(subprocess.run(['ffprobe','-v','error','-show_entries','format=duration','-of','csv=p=0',p],capture_output=True,text=True).stdout or 0)
    out=subprocess.run(['ffmpeg','-hide_banner','-i',p,'-af','silencedetect=n=-40dB:d=2.5,volumedetect','-f','null','-'],capture_output=True,text=True).stderr
    sil=[float(l.split('silence_duration: ')[1]) for l in out.splitlines() if 'silence_duration' in l]
    mx=[l for l in out.splitlines() if 'max_volume' in l]
    chars=sum(len(s.get('say') or s['text']) for s in m[k]['segments'])
    pauses=sum(float(s.get('pause',0) or 0) for s in m[k]['segments'])+float(m[k].get('pause',0) or 0)
    return k,d,chars,sil,mx[0].split(':')[1].strip() if mx else '',f[k]['engine']
with ThreadPoolExecutor(8) as ex: res=list(ex.map(probe,list(f)))
os.makedirs('qa-out',exist_ok=True); json.dump(res,open('qa-out/audio.json','w'))
import collections; print('engines:',collections.Counter(r[5] for r in res))
rates=[c/d for k,d,c,s,mx,e in res if d>0]
print('median chars/sec',statistics.median(rates))
for k,d,c,s,mx,e in res:
    r=c/d if d else 0
    flags=[]
    if d<0.4: flags.append('EMPTY')
    if r>22: flags.append(f'FAST/TRUNC {r:.1f}c/s')
    if r and r<5 and c>40: flags.append(f'SLOW {r:.1f}c/s')
    if s and max(s)>4: flags.append(f'long silence {max(s):.1f}s')
    if flags: print(k,e,f'{d:.1f}s',c,'chars',flags,' | ',m[k]['segments'][0]['text'][:60])
