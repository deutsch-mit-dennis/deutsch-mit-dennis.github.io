#!/usr/bin/env python3
"""SEO health check for all static HTML pages (no network, no browser needed).

Checks per page: <html lang="de">, exactly one <h1>, title length (< 60),
meta description length (< 155), <img> without alt, blocking <script src>,
JSON-LD types present. Prints a Markdown table of deviations.

Run in the repo folder:  python3 tools/seo-audit.py          (deviations only)
                         python3 tools/seo-audit.py --all    (every page)
                         python3 tools/seo-audit.py --imgs   (list <img> without alt in HTML, JS, CSS-free)
Content inside <noscript> is ignored for the H1 count (browsers with JavaScript
do not render it)."""
import json
import os
import re
import sys
from html.parser import HTMLParser

R = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SKIP_DIRS = {".git", "node_modules", "qa-out", "tools", ".github", "assets", "audio"}  # material/ has readable worksheet pages since 2026-11-13
SKIP_FILES = {"google34659683a6a2bee5.html", "google4d11dd3b62b27ae8.html"}
MAX_TITLE, MAX_DESC = 60, 155


class Page(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.lang = None
        self.h1 = 0
        self.h1_noscript = 0
        self.title = ""
        self._in_title = False
        self.desc = None
        self.noscript = 0
        self.imgs_no_alt = []
        self.blocking = []
        self.ld = []
        self._ld = False
        self._ldbuf = ""
        self.noindex = False

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag == "html":
            self.lang = a.get("lang")
        elif tag == "noscript":
            self.noscript += 1
        elif tag == "title":
            self._in_title = True
        elif tag == "h1":
            if self.noscript:
                self.h1_noscript += 1
            else:
                self.h1 += 1
        elif tag == "meta":
            n = (a.get("name") or "").lower()
            if n == "description":
                self.desc = a.get("content") or ""
            if n == "robots" and "noindex" in (a.get("content") or "").lower():
                self.noindex = True
        elif tag == "img" and not self.noscript:
            if "alt" not in a:
                self.imgs_no_alt.append(a.get("src", "?"))
        elif tag == "script":
            if a.get("type") == "application/ld+json":
                self._ld, self._ldbuf = True, ""
            elif a.get("src") and "defer" not in a and "async" not in a and a.get("type") != "module":
                self.blocking.append(a["src"])

    def handle_endtag(self, tag):
        if tag == "noscript":
            self.noscript = max(0, self.noscript - 1)
        elif tag == "title":
            self._in_title = False
        elif tag == "script" and self._ld:
            self._ld = False
            try:
                self.ld.append(json.loads(self._ldbuf))
            except ValueError:
                self.ld.append({"@type": "INVALID-JSON"})

    def handle_data(self, d):
        if self._in_title:
            self.title += d
        if self._ld:
            self._ldbuf += d


def ld_types(blocks):
    out = []

    def walk(o):
        if isinstance(o, dict):
            t = o.get("@type")
            if t:
                out.extend(t if isinstance(t, list) else [t])
            for v in o.values():
                walk(v)
        elif isinstance(o, list):
            for v in o:
                walk(v)

    walk(blocks)
    return out


def pages():
    for root, dirs, files in os.walk(R):
        dirs[:] = [d for d in dirs if d not in {".git", "node_modules", "qa-out"}]
        # top-level asset folders are skipped (below), nested ones (e.g. lernpakete/x/audio) are not
        for f in files:
            if f.endswith(".html") and f not in SKIP_FILES:
                p = os.path.join(root, f)
                rel = os.path.relpath(p, R).replace("\\", "/")
                if rel.split("/")[0] in SKIP_DIRS:
                    continue
                yield rel


def url_of(rel):
    return "/" + (rel[:-10] if rel.endswith("index.html") else rel)


def audit():
    rows = []
    for rel in sorted(pages()):
        p = Page()
        p.feed(open(os.path.join(R, rel), encoding="utf-8", errors="replace").read())
        probs = []
        if p.lang != "de":
            probs.append(f"lang={p.lang!r}")
        # app pages (start page copies) get their H1 from JavaScript; the <noscript> H1 is their fallback
        h1 = p.h1 or (1 if p.h1_noscript == 1 and '<base href="/">' in open(os.path.join(R, rel), encoding="utf-8").read() else 0)
        if h1 != 1:
            probs.append(f"{p.h1} × H1")
        t = " ".join(p.title.split())
        if not t:
            probs.append("kein Title")
        elif len(t) >= MAX_TITLE:
            probs.append(f"Title {len(t)} Z.")
        if p.desc is None:
            probs.append("keine Description")
        elif len(p.desc) >= MAX_DESC:
            probs.append(f"Description {len(p.desc)} Z.")
        if p.imgs_no_alt:
            probs.append(f"{len(p.imgs_no_alt)} img ohne alt")
        if p.blocking:
            probs.append(f"{len(p.blocking)} Script ohne defer")
        types = ld_types(p.ld)
        rows.append((rel, url_of(rel), probs, t, len(t), len(p.desc or ""), p.h1, types, p.noindex))
    return rows


def img_scan():
    """<img> tags without alt attribute in HTML files and in JS template strings."""
    pat = re.compile(r"<img\b[^>]*>", re.I)
    hits = []
    for root, dirs, files in os.walk(R):
        dirs[:] = [d for d in dirs if d not in {".git", "node_modules", "qa-out", "tools"}]
        for f in files:
            if not f.endswith((".html", ".js", ".mjs")) or f.endswith(".min.js"):
                continue
            p = os.path.join(root, f)
            rel = os.path.relpath(p, R).replace("\\", "/")
            txt = open(p, encoding="utf-8", errors="replace").read()
            for m in pat.finditer(txt):
                tag = m.group(0)
                if not re.search(r"\balt\s*=", tag):
                    line = txt.count("\n", 0, m.start()) + 1
                    hits.append((rel, line, tag[:160]))
    return hits


if __name__ == "__main__":
    if "--imgs" in sys.argv:
        for rel, line, tag in img_scan():
            print(f"{rel}:{line}: {tag}")
        sys.exit(0)
    rows = audit()
    show_all = "--all" in sys.argv
    bad = [r for r in rows if r[2]]
    print(f"{len(rows)} Seiten geprüft, {len(bad)} mit Abweichungen\n")
    print("| Seite | Abweichung | Title (Länge) | Description (Länge) |")
    print("|---|---|---|---|")
    for rel, url, probs, t, tl, dl, h1, types, noindex in rows:
        if probs or show_all:
            print(f"| {url} | {'; '.join(probs) or 'ok'} | {t[:70]} ({tl}) | {dl} |")
