#!/usr/bin/env python3
"""Builds the letter pages /dtz-schreiben/<brieftyp>/ (template for every DTZ letter type).

Content:  tools/dtz-schreiben/briefe.json   (one entry per letter type; "draft": true shows the draft badge)
Output:   dtz-schreiben/<slug>/index.html   + the link list "Musterbriefe nach Thema" on /dtz-schreiben/
          (between <!--briefe:start--> and <!--briefe:end-->), then sitemap.xml via tools/build-sitemap.js
Run in the repo folder:  python3 tools/make-dtz-briefe.py"""
import html
import json
import os
import re
import subprocess

R = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SITE = "https://deutsch-mit-dennis.de"
e = html.escape
D = json.load(open(os.path.join(R, "tools", "dtz-schreiben", "briefe.json"), encoding="utf-8"))["briefe"]

CSS = """@font-face{font-family:Atk;font-weight:400;font-display:swap;src:url(/assets/fonts/atkinson-hyperlegible-latin-400-normal.woff2) format("woff2")}
@font-face{font-family:Atk;font-weight:700;font-display:swap;src:url(/assets/fonts/atkinson-hyperlegible-latin-700-normal.woff2) format("woff2")}
:root{--blue:#2a44b8;--ink:#1d2433;--soft:#eef1fb;--yellow:#f6d64a;--green:#1f9d55;--red:#c2362b;--bg:#f5f6fb;--muted:#5b6478}
*{box-sizing:border-box}html{-webkit-text-size-adjust:100%}
body{margin:0;font-family:Atk,system-ui,sans-serif;font-size:17px;line-height:1.55;color:var(--ink);background:var(--bg);overflow-wrap:break-word}
a{color:var(--blue)}
.top{display:flex;align-items:center;justify-content:space-between;gap:8px;max-width:720px;margin:0 auto;padding:10px 16px}
.top a{display:inline-flex;align-items:center;min-height:44px;font-weight:700;text-decoration:none}
.hero{background:var(--blue);color:#fff;padding:24px 16px 28px}.hero>div{max-width:688px;margin:0 auto}
.hero h1{font-size:28px;line-height:1.2;margin:4px 0 10px}.hero p{margin:0 0 10px;font-size:18px}
.crumbs{font-size:15px;margin:0 0 8px;opacity:.9}.crumbs a{color:#fff}
.draft{display:inline-block;background:var(--yellow);color:#4a3b00;font-weight:700;font-size:14px;border-radius:99px;padding:2px 12px;margin:0 0 8px}
main{max-width:720px;margin:0 auto;padding:18px 16px 40px}
.card{background:#fff;border-radius:18px;padding:20px 18px;margin:0 0 18px;box-shadow:0 2px 10px rgba(30,40,80,.08)}
.card h2{font-size:22px;margin:0 0 10px;line-height:1.25}
.task{background:var(--soft);border-left:5px solid var(--blue);border-radius:10px;padding:12px 14px}
.task p{margin:0 0 8px}.task ol{margin:0;padding-left:22px}
.rm{display:grid;gap:10px;margin:0;padding:0;list-style:none}.rm li{border:1px solid #dde2f2;border-radius:12px;padding:10px 12px}.rm b{display:block}
.letter{background:#fffdf3;border:1px solid #efe3a6;border-radius:12px;padding:14px;margin:8px 0 14px}
.letter p{margin:0 0 10px;white-space:pre-line}.letter p:last-child{margin:0}
.wc{font-size:14px;color:var(--muted);font-weight:400}
ul.err{padding-left:22px}ul.err li{margin-bottom:8px}
.more{list-style:none;padding:0;margin:0;display:grid;gap:8px}
.more a{display:flex;align-items:center;min-height:48px;padding:8px 12px;border-radius:12px;background:var(--soft);font-weight:700;text-decoration:none}
.btn{display:inline-flex;align-items:center;min-height:48px;padding:10px 18px;border-radius:14px;font-weight:700;background:var(--blue);color:#fff;text-decoration:none}
.note{font-size:14px;color:var(--muted)}
footer{text-align:center;padding:0 16px 32px;font-size:14px;color:var(--muted)}footer a{display:inline-flex;align-items:center;min-height:44px;padding:0 6px}
@media (min-width:600px){.hero h1{font-size:36px}.rm{grid-template-columns:1fr 1fr}}
@media print{.top,.noprint,footer{display:none!important}body{background:#fff;font-size:12pt}.hero{background:#fff;color:#000}.crumbs a{color:#000}.card{box-shadow:none;border:1px solid #ccc;break-inside:avoid-page}
 main::after{content:"created by D.Prudnikau · deutsch-mit-dennis.de";display:block;text-align:center;font-size:9pt;color:#777;margin-top:12px}}"""


def words(paras):
    return len(re.findall(r"[\wÄÖÜäöüß-]+", " ".join(paras)))


def letter(paras):
    return '<div class="letter">' + "".join(f"<p>{e(p)}</p>" for p in paras) + "</div>"


def build(b):
    url = f"{SITE}/dtz-schreiben/{b['slug']}/"
    ld = [
        {"@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [
            {"@type": "ListItem", "position": 1, "name": "Start", "item": SITE + "/"},
            {"@type": "ListItem", "position": 2, "name": "DTZ Schreiben", "item": SITE + "/dtz-schreiben/"},
            {"@type": "ListItem", "position": 3, "name": b["name"], "item": url}]},
        {"@context": "https://schema.org", "@type": "LearningResource", "name": b["title"], "description": b["description"],
         "url": url, "inLanguage": "de", "educationalLevel": "A2–B1", "isAccessibleForFree": True,
         "learningResourceType": "Musterbrief", "teaches": "DTZ Schreiben: " + b["name"],
         "author": {"@type": "Person", "@id": SITE + "/#dennis", "name": "Dennis Prudnikau"}},
    ]
    others = "".join(f'<li><a href="/dtz-schreiben/{o["slug"]}/">{e(o["name"])}</a></li>' for o in D if o["slug"] != b["slug"])
    a = b["aufgabe"]
    return f"""<!doctype html>
<html lang="de">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{e(b['title'] + ' – Deutsch mit Dennis' if len(b['title']) < 39 else b['title'])}</title>
<meta name="description" content="{e(b['description'])}">
<link rel="canonical" href="{url}">
<meta property="og:type" content="article"><meta property="og:site_name" content="Deutsch mit Dennis"><meta property="og:locale" content="de_DE">
<meta property="og:title" content="{e(b['title'])}"><meta property="og:description" content="{e(b['description'])}"><meta property="og:url" content="{url}">
<meta property="og:image" content="{SITE}/assets/og/vorbereitung.jpg"><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="#2a44b8">
<link rel="icon" href="/favicon.svg">
{''.join(f'<script type="application/ld+json">{json.dumps(x, ensure_ascii=False)}</script>' + chr(10) for x in ld)}<style>
{CSS}
</style>
</head>
<body>
<div class="top"><a href="/dtz-schreiben/">← DTZ Schreiben</a><a href="/">Deutsch mit Dennis</a></div>
<header class="hero"><div>
<nav class="crumbs" aria-label="Brotkrumen"><a href="/">Start</a> › <a href="/dtz-schreiben/">DTZ Schreiben</a> › {e(b['name'])}</nav>
{'<p class="draft">Entwurf – Dennis prüft diesen Text noch</p>' if b.get('draft') else ''}
<h1>{e(b['title'])}</h1>
<p>{e(b['intro'])}</p>
</div></header>
<main>
<section class="card"><h2>Die Aufgabe</h2>
<div class="task"><p>{e(a['situation'])}</p><p><b>Schreiben Sie zu allen vier Punkten:</b></p><ol>{''.join(f'<li>{e(x)}</li>' for x in a['leitpunkte'])}</ol></div>
<p class="note">Übungsaufgabe im Stil des DTZ – keine Originalaufgabe von telc, g.a.s.t. oder BAMF. Zeit in der Prüfung: 30 Minuten.</p>
</section>
<section class="card"><h2>Redemittel</h2>
<ul class="rm">{''.join(f'<li><b>{e(k)}</b>{e(v)}</li>' for k, v in b['redemittel'])}</ul>
</section>
<section class="card"><h2>Musterbrief A2 <span class="wc">· {words(b['a2'])} Wörter</span></h2>
<p>Kurz, aber vollständig: Zu jedem Leitpunkt steht mindestens ein Satz.</p>
{letter(b['a2'])}
<h2>Musterbrief B1 <span class="wc">· {words(b['b1'])} Wörter</span></h2>
<p>Mehr Details und Satzverbinder wie „weil“, „deshalb“ und „dass“.</p>
{letter(b['b1'])}
</section>
<section class="card"><h2>Typische Fehler</h2>
<ul class="err">{''.join(f'<li>{e(x)}</li>' for x in b['fehler'])}</ul>
</section>
<section class="card noprint"><h2>Weiter üben</h2>
<p>Briefgerüst, Übungen, Checkliste und 2-Wochen-Plan findest du im <a href="/dtz-schreiben/">Vorbereitungspaket DTZ Schreiben</a>.</p>
<h3>Weitere Musterbriefe</h3><ul class="more">{others}</ul>
<p><a class="btn" href="/#training/dtz-schreiben">✍️ Brief in der App schreiben</a></p>
</section>
</main>
<footer><a href="/">deutsch-mit-dennis.de</a> · <a href="/impressum/">Impressum</a> · <a href="/datenschutz/">Datenschutz</a><p>Übungsmaterial im Stil des DTZ · created by D.Prudnikau</p></footer>
</body>
</html>
"""


for b in D:
    out = os.path.join(R, "dtz-schreiben", b["slug"], "index.html")
    os.makedirs(os.path.dirname(out), exist_ok=True)
    open(out, "w", encoding="utf-8", newline="\n").write(build(b))
    print(f"/dtz-schreiben/{b['slug']}/  A2 {words(b['a2'])} Wörter, B1 {words(b['b1'])} Wörter")

# link list on the hub page
hub = os.path.join(R, "dtz-schreiben", "index.html")
s = open(hub, encoding="utf-8").read()
items = "".join(f'<li><a style="display:inline-flex;align-items:center;min-height:44px;font-weight:700" href="/dtz-schreiben/{b["slug"]}/">{e(b["name"])}</a></li>' for b in D)
block = (f'<!--briefe:start-->\n  <section class="card noprint" id="briefe">\n    <h2>Musterbriefe nach Thema</h2>\n'
         f'    <p>Je eine Aufgabe mit Redemitteln, Musterbrief A2 und B1 und typischen Fehlern.</p>\n'
         f'    <ul>{items}</ul>\n  </section>\n  <!--briefe:end-->')
if "<!--briefe:start-->" in s:
    s = re.sub(r"<!--briefe:start-->.*?<!--briefe:end-->", lambda _: block, s, flags=re.S)
else:
    s = s.replace('  <section class="card" id="checkliste">', "  " + block + '\n\n  <section class="card" id="checkliste">', 1)
open(hub, "w", encoding="utf-8", newline="").write(s)

subprocess.run(["node", os.path.join("tools", "build-sitemap.js")], cwd=R, check=True)
