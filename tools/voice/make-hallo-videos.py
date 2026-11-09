#!/usr/bin/env python3
"""Photo of Dennis + greeting audio -> vertical MP4 (1080x1920, for the site, Reels, Shorts, TikTok) + WebVTT captions.

For every language with an MP3 in assets/hallo/<code>.mp3 this creates assets/hallo/<code>.mp4 and <code>.vtt.
The text comes from tools/voice/hallo-texte.json. Needs ffmpeg and ffprobe (the same ffmpeg that speak.py uses).

  python tools/voice/make-hallo-videos.py            # all languages that have an MP3
  python tools/voice/make-hallo-videos.py uk tr      # only these

Afterwards add "video" and "vtt" to the language in assets/hallo/manifest.json (see the note there).
The voice is AI-made: always say so in the description of a published video.
"""
import json, pathlib, subprocess, sys

ROOT = pathlib.Path(__file__).resolve().parents[2]
OUT = ROOT / "assets" / "hallo"
PHOTO = ROOT / "assets" / "avatar" / "dennis-avatar.jpg"
TEXTS = json.loads((ROOT / "tools" / "voice" / "hallo-texte.json").read_text(encoding="utf-8"))["languages"]


def duration(mp3):
    r = subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", str(mp3)],
                       capture_output=True, text=True, check=True)
    return float(r.stdout.strip())


def ts(sec):
    h, rem = divmod(sec, 3600)
    m, s = divmod(rem, 60)
    return "%02d:%02d:%06.3f" % (h, m, s)


def main(only):
    made = 0
    for lang in TEXTS:
        code = lang["code"]
        if only and code not in only:
            continue
        mp3 = OUT / (code + ".mp3")
        if not mp3.exists():
            print("skip %s (no %s)" % (code, mp3.name))
            continue
        dur = duration(mp3)
        (OUT / (code + ".vtt")).write_text("WEBVTT\n\n00:00:00.000 --> %s\n%s\n" % (ts(dur), lang["text"]), encoding="utf-8")
        cmd = ["ffmpeg", "-y", "-loop", "1", "-framerate", "25", "-i", str(PHOTO), "-i", str(mp3),
               "-filter_complex", "color=c=0x2341B5:s=1080x1920:r=25[bg];[0:v]scale=900:-2[ph];[bg][ph]overlay=(W-w)/2:(H-h)/2:shortest=1[v]",
               "-map", "[v]", "-map", "1:a", "-c:v", "libx264", "-tune", "stillimage", "-pix_fmt", "yuv420p",
               "-c:a", "aac", "-b:a", "160k", "-t", "%.2f" % dur, "-movflags", "+faststart", str(OUT / (code + ".mp4"))]
        subprocess.run(cmd, check=True)
        print("ok", code)
        made += 1
    print("%d video(s) made" % made)


if __name__ == "__main__":
    main(set(sys.argv[1:]))
