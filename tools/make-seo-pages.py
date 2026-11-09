#!/usr/bin/env python3
"""Readable static pages for Google: songs, LiD questions, exam simulations.
Unlike the share stubs (tools/make-share-pages.py) these pages do NOT redirect:
they show the real content and link into the app (/#route) for practising.
Run in the repo folder: python3 tools/make-seo-pages.py
(make-share-pages.py calls it at the end, so the sitemap always contains both.)"""

import json, os, re, subprocess, html

R = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SITE = "https://deutsch-mit-dennis.de"
e = html.escape

NODE = r"""
const fs=require('fs'),vm=require('vm');const c={};c.window=c;vm.createContext(c);
const files=['lieder-data.js','lid-katalog.js',...fs.readdirSync('sim').filter(f=>/^[\w-]+\.js$/.test(f)).map(f=>'sim/'+f)];
for(const f of files)vm.runInContext(fs.readFileSync(f,'utf8'),c,{filename:f});
const sims=Object.values(c.SIM).map(s=>({id:s.id,title:s.title,short:s.short,provider:s.provider,level:s.level,intro:s.intro,
  sections:(s.sections||[]).map(x=>({title:x.title,minutes:x.minutes||0,note:x.note||''}))}));
process.stdout.write(JSON.stringify({songs:c.DM.songs,lid:c.LID_KATALOG,stand:c.LID_KATALOG_STAND,quelle:c.LID_QUELLE_HTML,sims}));
"""
D = json.loads(
    subprocess.run(
        ["node", "-e", NODE], cwd=R, capture_output=True, text=True, check=True
    ).stdout
)

CSS = """:root{--ink:#172036;--blue:#2341B5;--muted:#4a5573;--line:#dfe4f0;--paper:#fbfbf8;--sun:#FFE45C;--green:#1D7A45}
*{box-sizing:border-box}body{margin:0;background:var(--paper);color:var(--ink);font:17px/1.6 system-ui,-apple-system,"Segoe UI",sans-serif}
a{color:var(--blue)}header,main,footer{max-width:760px;margin:0 auto;padding:0 16px}
header{display:flex;align-items:center;justify-content:space-between;gap:12px;padding-top:14px;padding-bottom:14px;border-bottom:1px solid var(--line)}
.pn{display:flex;justify-content:space-between;gap:12px;flex-wrap:wrap}.pn a{min-height:44px;display:inline-flex;align-items:center}
header a{white-space:nowrap}td:last-child,th:last-child{white-space:nowrap}@media(max-width:360px){header{gap:8px}.brand{font-size:1rem}header a:last-child{font-size:.9rem}}.brand{font-weight:800;color:var(--ink);text-decoration:none;font-size:1.1rem}.brand i{font-style:normal;color:var(--blue)}
.crumbs{font-size:.9rem;color:var(--muted);margin:16px 0 4px}.crumbs a{color:var(--muted)}
h1{font-size:clamp(1.6rem,6vw,2.2rem);line-height:1.2;margin:.3em 0}h2{font-size:1.3rem;margin:1.6em 0 .4em}
.tag{display:inline-block;background:#e8edfa;color:var(--blue);font-weight:700;border-radius:99px;padding:2px 12px;font-size:.85rem;margin:0 6px 6px 0}
.lead{font-size:1.1rem}.muted,.small{color:var(--muted);font-size:.92rem}
.btn{display:inline-flex;align-items:center;min-height:48px;padding:10px 22px;border-radius:12px;background:var(--blue);color:#fff;font-weight:800;text-decoration:none;margin:8px 0}
.btn:hover{filter:brightness(1.1)}.btn.ghost{background:#fff;color:var(--blue);border:2px solid var(--blue)}
.lyrics{white-space:pre-line;background:#fff;border:1px solid var(--line);border-radius:12px;padding:16px 18px}
.lyrics b{display:block;color:var(--muted);font-size:.85rem;margin-top:10px}
table{border-collapse:collapse;width:100%}td,th{border-bottom:1px solid var(--line);padding:8px 6px;text-align:left;vertical-align:top}
.q{background:#fff;border:1px solid var(--line);border-radius:12px;padding:14px 16px;margin:12px 0}
.q h3{font-size:1rem;margin:0 0 8px}.q ol{margin:0;padding-left:1.4em}.q li.ok{font-weight:700;color:var(--green)}.q li.ok::after{content:" ✓"}
.q img{width:calc(25% - 6px);max-width:110px;height:auto;border:1px solid var(--line);border-radius:6px;margin:0 4px 6px 0}
.pager{display:flex;flex-wrap:wrap;gap:6px;margin:16px 0}.pager a{display:inline-flex;align-items:center;justify-content:center;min-width:44px;min-height:44px;padding:0 10px;border:1px solid var(--line);border-radius:10px;background:#fff;text-decoration:none}
.pager a[aria-current]{background:var(--blue);color:#fff;border-color:var(--blue)}
.list{padding-left:1.2em}.list li{margin:6px 0}
details{background:#fff;border:1px solid var(--line);border-radius:12px;padding:8px 16px;margin:12px 0}summary{cursor:pointer;font-weight:700;min-height:40px;display:flex;align-items:center}
.lid-src{font-size:.85rem;color:var(--muted);border-top:1px solid var(--line);padding-top:12px;margin-top:24px}
footer{border-top:1px solid var(--line);margin-top:40px;padding-top:16px;padding-bottom:40px;font-size:.9rem;color:var(--muted)}footer a{color:var(--muted);margin-right:14px;display:inline-block;min-height:32px}"""


def page(path, title, desc, body, crumbs, og="start"):
    url = f"{SITE}/{path}/"
    bl = [
        {
            "@type": "ListItem",
            "position": i + 1,
            "name": n,
            "item": f"{SITE}/{p}" + ("/" if p else ""),
        }
        for i, (n, p) in enumerate([("Start", "")] + crumbs)
    ]
    ld = json.dumps(
        {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": bl,
        },
        ensure_ascii=False,
    )
    nav = " › ".join(
        [f'<a href="/">Start</a>']
        + [f'<a href="/{p}/">{e(n)}</a>' for n, p in crumbs[:-1]]
        + [e(crumbs[-1][0])]
    )
    doc = f'''<!DOCTYPE html>
<html lang="de"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>{e(title)} – Deutsch mit Dennis</title>
<meta name="description" content="{e(desc)}">
<link rel="canonical" href="{url}">
<meta property="og:type" content="article"><meta property="og:site_name" content="Deutsch mit Dennis"><meta property="og:locale" content="de_DE">
<meta property="og:title" content="{e(title)}"><meta property="og:description" content="{e(desc)}"><meta property="og:url" content="{url}">
<meta property="og:image" content="{SITE}/assets/og/{og}.jpg"><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="/favicon.svg">
<script type="application/ld+json">{ld}</script>
<style>{CSS}</style>
</head><body>
<header><a class="brand" href="/">Deutsch <i>mit Dennis</i></a><a href="/#start">Zur Lern-App →</a></header>
<main><nav class="crumbs" aria-label="Brotkrumen">{nav}</nav>
{body}
</main>
<footer><a href="/">Startseite</a><a href="/#impressum">Impressum</a><a href="/#datenschutz">Datenschutz</a><br>Kostenlos Deutsch lernen von A1 bis B2 (Lieder bis C1) – von Dennis, DaZ-Lehrer und lizenzierter Prüfer.</footer>
</body></html>
'''
    f = os.path.join(R, path, "index.html")
    os.makedirs(os.path.dirname(f), exist_ok=True)
    open(f, "w", encoding="utf-8").write(doc)
    return url


urls = []

# ---------------- songs ----------------
songs = D["songs"]
LV = ["A1", "A2", "B1", "B2", "C1"]


PARTS = {
    "verse": "Strophe",
    "chorus": "Refrain",
    "pre-chorus": "Vor-Refrain",
    "bridge": "Bridge",
    "outro": "Schluss",
    "intro": "Anfang",
    "hook": "Refrain",
    "final chorus": "Letzter Refrain",
    "spoken": "Gesprochen",
    "rap": "Rap",
    "breakdown": "Zwischenteil",
    "interlude": "Zwischenspiel",
}


def part_name(t):
    m = re.fullmatch(r"([A-Za-z -]+?)\s*(\d*)", t.strip())
    if m and m.group(1).lower() in PARTS:
        return (
            PARTS[m.group(1).lower()] + (" " + m.group(2) if m.group(2) else "")
        ).strip()
    return t


def lyrics_html(t):
    out = []
    for ln in t.split("\n"):
        m = re.fullmatch(r"\[(.+?)\]", ln.strip())
        out.append(f"<b>{e(part_name(m.group(1)))}</b>" if m else e(ln))
    return "\n".join(out).strip()


for i, s in enumerate(songs):
    prev, nxt = (
        songs[i - 1] if i else None,
        songs[i + 1] if i + 1 < len(songs) else None,
    )
    voc = "".join(
        f"<tr><td><b>{e(a)}</b></td><td>{e(b)}</td></tr>"
        for a, b in s.get("vocab") or []
    )
    gap = s.get("gap") or {}
    gap_html = ""
    if gap.get("items"):
        gap_html = (
            f'<h2>{e(gap.get("title", "Lückentext"))}</h2><p>{e(gap.get("instruction", ""))}</p><ol class="list">'
            + "".join(f"<li>{e(x)}</li>" for x in gap["items"])
            + "</ol>"
            + (
                '<details><summary>Lösungen anzeigen</summary><ol class="list">'
                + "".join(f"<li>{e(x)}</li>" for x in gap.get("solutions", []))
                + "</ol></details>"
                if gap.get("solutions")
                else ""
            )
        )
    body = f"""<h1>{e(s["title"])}</h1>
<p><span class="tag">Niveau {e(s["level"])}</span><span class="tag">Lied zum Deutschlernen</span></p>
<p class="lead">{e(s.get("intro", ""))}</p>
<p><a class="btn" href="/#lieder/{e(s["id"])}">▶ Lied anhören und üben</a></p>
<p><b>Thema:</b> {e(s.get("theme", ""))}<br><b>Grammatik:</b> {e(s.get("grammar", ""))}</p>
<h2>Liedtext</h2><div class="lyrics">{lyrics_html(s.get("lyrics", ""))}</div>
<p class="small">Text: Dzianis Prudnikau. Musik mit KI erstellt (Suno).</p>
{f"<h2>Wörter aus dem Lied</h2><table>{voc}</table>" if voc else ""}
{gap_html}
<h2>Weitere Lieder</h2><p>{f'<a href="/lieder/{prev["id"]}/">← {e(prev["title"])} ({prev["level"]})</a><br>' if prev else ""}{f'<a href="/lieder/{nxt["id"]}/">{e(nxt["title"])} ({nxt["level"]}) →</a><br>' if nxt else ""}<a href="/lieder/alle/">Alle {len(songs)} Lieder im Überblick</a></p>"""
    desc = f"Deutsch lernen mit dem Lied „{s['title']}“ (Niveau {s['level']}): {s.get('theme', '')}. Mit Liedtext, Wörtern und Lückentext."
    urls.append(
        page(
            f"lieder/{s['id']}",
            f"{s['title']} – Lied {s['level']}",
            desc[:300],
            body,
            [("Lieder", "lieder"), (s["title"], f"lieder/{s['id']}")],
            "lieder",
        )
    )

body = f'<h1>Alle {len(songs)} Lieder zum Deutschlernen</h1><p class="lead">Eigene Lieder von A1 bis C1 – jedes mit Liedtext, wichtigen Wörtern und einem Lückentext. Hören und mitsingen kannst du in der Lern-App.</p><p><a class="btn" href="/#lieder">▶ Zu den Liedern in der App</a></p>'
for lv in LV:
    g = [s for s in songs if s["level"] == lv]
    if g:
        body += (
            f'<h2>Niveau {lv}</h2><ul class="list">'
            + "".join(
                f'<li><a href="/lieder/{s["id"]}/">{e(s["title"])}</a> – <span class="muted">{e(s.get("theme", ""))}</span></li>'
                for s in g
            )
            + "</ul>"
        )
urls.append(
    page(
        "lieder/alle",
        "Alle Lieder zum Deutschlernen (A1–C1)",
        f"{len(songs)} Lieder zum Deutschlernen von A1 bis C1 mit Liedtext, Wortschatz und Lückentext – kostenlos.",
        body,
        [("Lieder", "lieder"), ("Alle Lieder", "lieder/alle")],
        "lieder",
    )
)

# ---------------- LiD questions ----------------
lid, quelle = D["lid"], D["quelle"]
gen = [q for q in lid if q["id"].startswith("general-")]
nrw = [q for q in lid if not q["id"].startswith("general-")]
groups = [
    (f"fragen-{a:03d}-{a + 9:03d}", f"Fragen {a}–{a + 9}", gen[a - 1 : a + 9])
    for a in range(1, len(gen) + 1, 10)
]
groups.append(("fragen-nrw", "Fragen Nordrhein-Westfalen", nrw))


CUR = ' aria-current="page"'


def pager(cur):
    return (
        '<nav class="pager" aria-label="Fragengruppen">'
        + "".join(
            f'<a href="/lid/{slug}/"{CUR if slug == cur else ""}>{"NRW" if slug == "fragen-nrw" else int(slug[7:10])}</a>'
            for slug, _, _ in groups
        )
        + "</nav>"
    )


def qhtml(q):
    lab = f"Frage {q['nr']}" if isinstance(q["nr"], int) else str(q["nr"])
    imgs = "".join(
        f'<img src="/assets/lid-fragen/{e(im)}" alt="Bild {k + 1}" width="110" height="110" loading="lazy">'
        for k, im in enumerate(q.get("img") or [])
    )
    lis = "".join(
        ('<li class="ok">' if k == q["s"] else "<li>") + e(a) + "</li>"
        for k, a in enumerate(q["a"])
    )
    return f'<div class="q" id="{e(q["id"])}"><h3>{e(lab)}: {e(q["q"])}</h3>{f"<div>{imgs}</div>" if imgs else ""}<ol type="1">{lis}</ol></div>'


def prevnext(cur):
    i = [g[0] for g in groups].index(cur)
    a = f'<a href="/lid/{groups[i - 1][0]}/">← {e(groups[i - 1][1])}</a>' if i else ""
    b = (
        f'<a href="/lid/{groups[i + 1][0]}/">{e(groups[i + 1][1])} →</a>'
        if i + 1 < len(groups)
        else ""
    )
    return f'<p class="pn">{a}{b}</p>'


for slug, name, qs in groups:
    body = (
        f'<h1>Leben in Deutschland – {e(name)}</h1><p class="lead">Fragen aus dem offiziellen Gesamtfragenkatalog mit der richtigen Antwort (✓). '
        "Üben mit Lernmodus, Wiederholung und Prüfungssimulation kannst du kostenlos in der Lern-App.</p>"
        '<p><a class="btn" href="/#lid">▶ Fragen interaktiv üben</a></p>'
        + prevnext(slug)
        + "".join(qhtml(q) for q in qs)
        + pager(slug)
        + '<p><a href="/lid/fragen/">Alle Fragengruppen im Überblick</a></p>'
        + quelle
    )
    first = qs[0]["q"][:90]
    desc = f"Test „Leben in Deutschland“: {name} mit richtigen Antworten, z. B. „{first}“. Kostenlos üben mit Prüfungssimulation."
    urls.append(
        page(
            f"lid/{slug}",
            f"Leben in Deutschland: {name} mit Antworten",
            desc[:300],
            body,
            [("Leben in Deutschland", "lid"), (name, f"lid/{slug}")],
            "lid",
        )
    )

body = (
    '<h1>Leben in Deutschland: alle 310 Fragen mit Antworten</h1><p class="lead">Der Test „Leben in Deutschland“ hat 33 Fragen: 30 aus den 300 allgemeinen Fragen und 3 Fragen zu deinem Bundesland. '
    "Für das Bundesland sind hier die 10 Fragen für Nordrhein-Westfalen aufgeführt. Hier findest du alle Fragen nach Nummern geordnet – jeweils mit der richtigen Antwort.</p>"
    '<p><a class="btn" href="/#lid">▶ Kostenlos üben mit Prüfungssimulation</a></p><ul class="list">'
    + "".join(
        f'<li><a href="/lid/{slug}/">{e(name)}</a> <span class="muted">– {e(qs[0]["q"][:70])} …</span></li>'
        for slug, name, qs in groups
    )
    + "</ul>"
    + quelle
)
urls.append(
    page(
        "lid/fragen",
        "Leben in Deutschland: alle Fragen mit Antworten",
        "Alle 300 allgemeinen Fragen und die 10 NRW-Fragen zum Test „Leben in Deutschland“ mit richtigen Antworten – nach Nummern geordnet. Kostenlos üben.",
        body,
        [("Leben in Deutschland", "lid"), ("Alle Fragen", "lid/fragen")],
        "lid",
    )
)

# ---------------- exam simulations ----------------
sims = sorted(D["sims"], key=lambda s: (s["title"].split(" (")[0], s["id"]))
NOTE = '<p class="small">Eigene Übungsaufgaben im Stil der Prüfung – keine offiziellen Aufgaben von telc oder g.a.s.t.</p>'
for s in sims:
    total = sum(x["minutes"] for x in s["sections"])
    rows = "".join(
        f"<tr><td><b>{e(x['title'])}</b>{('<br><span class=muted>' + e(x['note']) + '</span>') if x['note'] else ''}</td><td>{x['minutes'] or '–'} Min.</td></tr>"
        for x in s["sections"]
    )
    others = "".join(
        f'<li><a href="/simulation/{o["id"]}/">{e(o["title"])}</a></li>'
        for o in sims
        if o["id"] != s["id"]
    )
    body = f"""<h1>{e(s["title"])}: Prüfungssimulation</h1>
<p><span class="tag">Niveau {e(s["level"])}</span><span class="tag">Kostenlos</span><span class="tag">Mit Zeitvorgabe</span></p>
<p class="lead">{e(s.get("intro", ""))}</p>
<p><a class="btn" href="/#simulation/{e(s["id"])}">▶ Simulation starten</a></p>
<h2>Aufbau der Simulation</h2><table><tr><th>Prüfungsteil</th><th>Zeit</th></tr>{rows}{f"<tr><td><b>Gesamt</b></td><td>{total} Min.</td></tr>" if total else ""}</table>
<h2>So funktioniert es</h2><ul class="list"><li>Du arbeitest mit echter Zeitvorgabe – wie in der Prüfung.</li><li>Am Ende siehst du deine Punkte, die Bestehensregel und die Lösungen.</li><li>Keine Anmeldung nötig, am Handy und am Computer.</li></ul>
{NOTE}
<h2>Weitere Simulationen</h2><ul class="list">{others}</ul>"""
    desc = (
        f"Kostenlose Prüfungssimulation {s['title']} (Niveau {s['level']}) mit Zeitvorgabe, Punkten und Lösungen: "
        + ", ".join(x["title"] for x in s["sections"])
        + "."
    )
    urls.append(
        page(
            f"simulation/{s['id']}",
            f"{s['title']} – kostenlose Simulation",
            desc[:300],
            body,
            [
                ("Simulationen", "simulation"),
                (s["short"] if s.get("short") else s["title"], f"simulation/{s['id']}"),
            ],
            "simulation",
        )
    )

# ---------------- sitemap: keep the share pages, replace our block ----------------
sm = os.path.join(R, "sitemap.xml")
old = re.findall(r"<loc>([^<]+)</loc>", open(sm, encoding="utf-8").read())
ours = set(urls)
keep = [
    u
    for u in old
    if u not in ours
    and not re.search(r"/(lieder/[^/]+|lid/fragen[^/]*|simulation/[^/]+)/$", u)
]
allu = keep + urls
open(sm, "w", encoding="utf-8").write(
    '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
    + "".join(f"  <url><loc>{u}</loc></url>\n" for u in allu)
    + "</urlset>\n"
)
print(len(urls), "Inhaltsseiten,", len(allu), "URLs in der Sitemap")
