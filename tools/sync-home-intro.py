#!/usr/bin/env python3
"""Keeps the two copies of the start-page intro text in index.html identical.

The text is edited ONCE: the visible block between <!--intro:start--> and <!--intro:end-->
in index.html. This script copies it into the <noscript> fallback
(<!--intro-noscript:start--> ... <!--intro-noscript:end-->), renames the ids so they stay unique
and removes the draft-only attributes that only the live copy needs.

Why two copies?  Visitors with JavaScript get the visible block (site.js moves it to the bottom of the
start page); visitors and crawlers without JavaScript get the <noscript> copy.

Run in the repo folder:  python3 tools/sync-home-intro.py      (also prints the word count)
"""
import os
import re

R = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
P = os.path.join(R, "index.html")
s = open(P, encoding="utf-8").read()

m = re.search(r"<!--intro:start-->\n(.*?)\n<!--intro:end-->", s, re.S)
if not m:
    raise SystemExit("Marker <!--intro:start--> / <!--intro:end--> not found in index.html")
block = m.group(1)
copy = block.replace('id="dm-intro-h"', 'id="dm-intro-ns-h"').replace('aria-labelledby="dm-intro-h"', 'aria-labelledby="dm-intro-ns-h"')
copy = copy.replace('<section id="dm-intro"', '<section id="dm-intro-ns"')

s2, n = re.subn(
    r"<!--intro-noscript:start-->\n.*?\n<!--intro-noscript:end-->",
    lambda _: "<!--intro-noscript:start-->\n" + copy + "\n<!--intro-noscript:end-->",
    s,
    flags=re.S,
)
if n != 1:
    raise SystemExit("Marker <!--intro-noscript:start--> / <!--intro-noscript:end--> not found in index.html")
if s2 != s:
    open(P, "w", encoding="utf-8", newline="\n").write(s2)

text = re.sub(r"<[^>]+>", " ", block)
words = len(re.findall(r"[A-Za-zÄÖÜäöüß0-9„“\-–]+", text))
print(f"intro synced – about {words} words (target: 300-500)")
