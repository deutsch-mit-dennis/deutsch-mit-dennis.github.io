#!/usr/bin/env python3
"""Converts large JPG/PNG images (> 200 KB) to WebP next to the original (the original stays).

Run in the repo folder:  python3 tools/make-webp.py            (scans assets/)
                         python3 tools/make-webp.py --dry-run  (only list)
Afterwards the video and Kahoot feeds point to the .webp file where one exists
(youtube-feed.json "thumb", kahoot-feed.json "cover"). The daily sync scripts
(tools/update-youtube-feed.mjs, tools/update-kahoot-feed.mjs) keep preferring the .webp.
Other references (HTML/JS/CSS) must be changed by hand – the script lists them.
Needs Pillow (pip install pillow)."""
import json
import os
import re
import sys

from PIL import Image

R = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
LIMIT = 200 * 1024
MAX_W = 1280
QUALITY = 80
dry = "--dry-run" in sys.argv

converted = []
for root, dirs, files in os.walk(os.path.join(R, "assets")):
    for f in files:
        if not f.lower().endswith((".jpg", ".jpeg", ".png")):
            continue
        src = os.path.join(root, f)
        if os.path.getsize(src) <= LIMIT:
            continue
        dst = os.path.splitext(src)[0] + ".webp"
        rel = os.path.relpath(src, R).replace("\\", "/")
        if os.path.exists(dst):
            converted.append((rel, os.path.relpath(dst, R).replace("\\", "/")))
            continue
        if dry:
            print(f"would convert {rel} ({os.path.getsize(src) // 1024} KB)")
            continue
        im = Image.open(src)
        im = im.convert("RGBA" if im.mode in ("RGBA", "LA", "P") else "RGB")
        # same sizes as the daily sync: video thumbnails 640 px, Kahoot covers 800 px wide
        unix = src.replace("\\", "/")
        max_w = 640 if "/assets/yt/" in unix else 800 if "/assets/kahoot/" in unix else MAX_W
        if im.width > max_w:
            im = im.resize((max_w, round(im.height * max_w / im.width)), Image.LANCZOS)
        im.save(dst, "WEBP", quality=QUALITY, method=6)
        d = os.path.relpath(dst, R).replace("\\", "/")
        print(f"{rel}: {os.path.getsize(src) // 1024} KB -> {d}: {os.path.getsize(dst) // 1024} KB")
        converted.append((rel, d))

if dry:
    sys.exit(0)

# feeds: point to the WebP version
for feed, key in (("youtube-feed.json", "videos"), ("kahoot-feed.json", "kahoots")):
    p = os.path.join(R, feed)
    data = json.load(open(p, encoding="utf-8"))
    changed = 0
    for item in data.get(key, []):
        for field in ("thumb", "cover"):
            v = item.get(field)
            if isinstance(v, str) and re.search(r"\.(jpe?g|png)$", v):
                w = re.sub(r"\.(jpe?g|png)$", ".webp", v)
                if os.path.exists(os.path.join(R, w)):
                    item[field] = w
                    changed += 1
    if changed:
        json.dump(data, open(p, "w", encoding="utf-8", newline="\n"), ensure_ascii=False, indent=2)
        open(p, "a", encoding="utf-8", newline="\n").write("\n")
    print(f"{feed}: {changed} references -> .webp")

# other references to converted files
names = {os.path.basename(a): a for a, _ in converted}
for root, dirs, files in os.walk(R):
    dirs[:] = [d for d in dirs if d not in {".git", "node_modules", "qa-out", "assets", "audio", "material"}]
    for f in files:
        if f.endswith((".html", ".js", ".css", ".mjs")) and f != "make-webp.py":
            t = open(os.path.join(root, f), encoding="utf-8", errors="replace").read()
            for n, a in names.items():
                if n in t:
                    print(f"note: {os.path.relpath(os.path.join(root, f), R)} still references {a}")
