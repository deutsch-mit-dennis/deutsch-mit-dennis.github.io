#!/usr/bin/env python3
"""Readable static pages for Google (real text, no redirect) for the learning content:
  /grammatik/ + /grammatik/<id>/      grammar trainer topics (grammatik-data.js)
  /lektionen/ + /lektion/<id>/        the lessons (content.js)
  /kurs/ + /kurs/<niveau>/            course outline per level (kurs-data.js)
  /lesen/<set>/, /hoeren/<set>/       reading texts and listening transcripts (lesen-data.js, hoeren-data.js)
  /pruefungsinfo/ + /pruefungsinfo/<id>/  exam facts (pruefung-fakten.js, only if it exposes window.DMFakten.pages)
  /einstufungstest/, /laute/, /fehlerheft/  short landing pages
Every page links into the app (/#route) for practising. Look and helpers follow tools/make-seo-pages.py
(the CSS is read from there). tools/make-seo-pages.py calls this script before it builds the sitemap.
Run in the repo folder:  python3 tools/make-learn-pages.py"""

import html
import json
import os
import re
import subprocess

R = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SITE = "https://deutsch-mit-dennis.de"
e = html.escape

NODE = r"""
const fs=require('fs'),vm=require('vm');
const c={console:{log(){},warn(){},error(){}}};c.window=c;c.DM={};
c.document={addEventListener(){},querySelector(){return null},querySelectorAll(){return[]},getElementById(){return null},createElement(){return{style:{},setAttribute(){},appendChild(){}}},head:{appendChild(){}},documentElement:{}};
c.localStorage={getItem(){return null},setItem(){}};c.location={hash:''};c.addEventListener=function(){};
vm.createContext(c);
const run=(f,extra)=>{try{vm.runInContext(fs.readFileSync(f,'utf8')+(extra||''),c,{filename:f})}catch(err){process.stderr.write(f+': '+err.message+'\n')}};
run('content.js',';window.__lessons=lessons;');
for(const f of ['site-data.js','hoeren-data.js','lesen-data.js','grammatik-data.js','kurs-data.js','pruefung-fakten.js'])if(fs.existsSync(f))run(f);
const G=c.DMGrammatik?Array.from({length:Object.keys(c.DMGrammatik).filter(k=>/^\d+$/.test(k)).length},(_,i)=>c.DMGrammatik[i]):[];
const pick=o=>o?JSON.parse(JSON.stringify(o)):null;
process.stdout.write(JSON.stringify({lessons:c.__lessons||[],grammar:pick(G),kurs:pick(c.DM.kurs)||{},
  reading:pick(Array.isArray(c.DM.reading)?c.DM.reading:Object.values(c.DM.reading||{})),listening:pick(c.DM.listening)||{},
  fakten:c.DMFakten&&c.DMFakten.data?pick({stand:c.DMFakten.STAND,ids:c.DMFakten.ids,data:c.DMFakten.data,sources:c.DMFakten.sources}):null}));
"""
D = json.loads(
    subprocess.run(
        ["node", "-e", NODE], cwd=R, capture_output=True, text=True, check=True
    ).stdout
)

seo_src = open(os.path.join(R, "tools", "make-seo-pages.py"), encoding="utf-8").read()
CSS = re.search(r'CSS = """(.*?)"""', seo_src, re.S).group(1)
CSS += """
mark{background:#fff3b0;padding:0 2px;border-radius:3px}.box{background:#fff;border:1px solid var(--line);border-radius:12px;padding:14px 16px;margin:12px 0}
.txt{white-space:pre-line}.bad{color:#a12a22}.good{color:var(--green);font-weight:700}.grid{display:grid;gap:10px;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));padding:0;list-style:none}
.grid a{display:block;background:#fff;border:1px solid var(--line);border-radius:12px;padding:12px 14px;text-decoration:none;min-height:44px}.grid a b{display:block}.grid a small{color:var(--muted)}"""

LEVEL_NAME = {
    "A0": "Der Anfang",
    "A1": "Erste Sätze",
    "A2": "Alltag",
    "B1": "Gespräche",
    "B2": "Beruf",
}


def seo_title(t):
    full = f"{t} – Deutsch mit Dennis"
    return full if len(full) < 60 else t


def seo_desc(d, n=154):
    d = " ".join(d.split())
    return d if len(d) <= n else d[: n - 1].rsplit(" ", 1)[0].rstrip(",;:–-") + "…"


def mk(s):
    """*word* -> <mark>word</mark> (escaped)."""
    return re.sub(r"\*(.+?)\*", r"<mark>\1</mark>", e(str(s)))


def plain(s):
    return re.sub(r"\*(.+?)\*", r"\1", str(s))


def learning_resource(path, name, desc, level, kind):
    return {
        "@context": "https://schema.org",
        "@type": "LearningResource",
        "name": name,
        "description": desc,
        "url": f"{SITE}/{path}/",
        "inLanguage": "de",
        "educationalLevel": level,
        "isAccessibleForFree": True,
        "learningResourceType": kind,
        "provider": {
            "@type": "EducationalOrganization",
            "name": "Deutsch mit Dennis",
            "url": SITE + "/",
        },
        "author": {
            "@type": "Person",
            "@id": SITE + "/#dennis",
            "name": "Dennis Prudnikau",
        },
    }


def page(path, title, desc, body, crumbs, og="start", extra_ld=None):
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
    blocks = [
        {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": bl,
        }
    ]
    if extra_ld:
        blocks += extra_ld if isinstance(extra_ld, list) else [extra_ld]
    ld = "\n".join(
        '<script type="application/ld+json">'
        + json.dumps(b, ensure_ascii=False)
        + "</script>"
        for b in blocks
    )
    nav = " › ".join(
        ['<a href="/">Start</a>']
        + [f'<a href="/{p}/">{e(n)}</a>' for n, p in crumbs[:-1]]
        + [e(crumbs[-1][0])]
    )
    desc = seo_desc(desc)
    doc = f"""<!DOCTYPE html>
<!-- generated by tools/make-learn-pages.py – do not edit -->
<html lang="de"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>{e(seo_title(title))}</title>
<meta name="description" content="{e(desc)}">
<link rel="canonical" href="{url}">
<meta property="og:type" content="article"><meta property="og:site_name" content="Deutsch mit Dennis"><meta property="og:locale" content="de_DE">
<meta property="og:title" content="{e(title)}"><meta property="og:description" content="{e(desc)}"><meta property="og:url" content="{url}">
<meta property="og:image" content="{SITE}/assets/og/{og}.jpg"><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="/favicon.svg">
{ld}
<style>{CSS}</style>
</head><body>
<header><a class="brand" href="/">Deutsch <i>mit Dennis</i></a><a href="/#start">Zur Lern-App →</a></header>
<main><nav class="crumbs" aria-label="Brotkrumen">{nav}</nav>
{body}
</main>
<footer><a href="/">Startseite</a><a href="/kurs/">Kurse A0–B2</a><a href="/grammatik/">Grammatik</a><a href="/lektionen/">Lektionen</a><a href="/pruefung/">Prüfung</a><a href="/impressum/">Impressum</a><a href="/datenschutz/">Datenschutz</a><br>Kostenlos Deutsch lernen von A1 bis B2 – von Dennis, DaZ-Lehrer und lizenzierter Prüfer.</footer>
</body></html>
"""
    f = os.path.join(R, path, "index.html")
    os.makedirs(os.path.dirname(f), exist_ok=True)
    open(f, "w", encoding="utf-8").write(doc)
    return url


def qa_html(questions):
    """Questions with the solution folded away."""
    out = []
    for q in questions:
        opts = "".join(f"<li>{e(o)}</li>" for o in q.get("options", []))
        sol = q["options"][q["answer"]] if q.get("options") else ""
        out.append(
            f'<div class="q"><h3>{e(q["q"])}</h3><ol type="a">{opts}</ol>'
            f'<details><summary>Lösung zeigen</summary><p class="good">{e(sol)}</p><p>{e(q.get("why", ""))}</p></details></div>'
        )
    return "".join(out)


urls = []

# ---------------- grammar ----------------
G = D["grammar"] or []
G_ORDER = ["A1", "A2", "B1", "B2"]


def g_item(it):
    t = it.get("t")
    if t == "mc":
        return (
            e(it["q"]),
            "".join(f"<li>{e(o)}</li>" for o in it["opts"]),
            it["opts"][it["a"]],
        )
    if t == "gap":
        return e(it["q"]), "", it["a"][0]
    if t == "order":
        import random

        w = it["words"][:]
        random.Random(len(it["sol"])).shuffle(w)
        return "Bilde einen Satz: " + e(" / ".join(w)), "", it["sol"]
    if t == "fix":
        pair = sorted([it["good"], it["bad"]])
        return (
            "Welcher Satz ist richtig?",
            "".join(f"<li>{e(o)}</li>" for o in pair),
            it["good"],
        )
    return "", "", ""


for i, t in enumerate(G):
    path = f"grammatik/{t['id']}"
    name = plain(t["title"])
    topic = name.split(":")[0]
    tab = ""
    if t.get("tabelle"):
        tb = t["tabelle"]
        tab = (
            "<table><tr>"
            + "".join(f"<th>{mk(h)}</th>" for h in tb.get("head", []))
            + "</tr>"
            + "".join(
                "<tr>" + "".join(f"<td>{mk(c)}</td>" for c in r) + "</tr>"
                for r in tb.get("rows", [])
            )
            + "</table>"
        )
    ex = "".join(f"<li>{mk(b)}</li>" for b in t.get("beispiele", []))
    fe = "".join(
        f'<div class="box"><p class="bad">✗ {e(f[0])}</p><p class="good">✓ {e(f[1])}</p><p class="muted">{e(f[2])}</p></div>'
        for f in t.get("fehler", [])
    )
    items = []
    for it in t.get("items", [])[:8]:
        q, opts, sol = g_item(it)
        if not q:
            continue
        items.append(
            f'<div class="q"><h3>{q}</h3>{f"<ol type=a>{opts}</ol>" if opts else ""}'
            f'<details><summary>Lösung zeigen</summary><p class="good">{e(sol)}</p><p>{e(it.get("why", ""))}</p></details></div>'
        )
    same = [o for o in G if o["level"] == t["level"] and o["id"] != t["id"]]
    more = "".join(
        f'<li><a href="/grammatik/{o["id"]}/">{e(plain(o["title"]))}</a></li>'
        for o in same
    )
    nxt = G[i + 1] if i + 1 < len(G) else None
    n_items = len(t.get("items", []))
    body = f"""<h1>{e(name)}</h1>
<p><span class="tag">Niveau {e(t["level"])}</span><span class="tag">Grammatik</span><span class="tag">{n_items} Übungen</span><span class="tag">Kostenlos</span></p>
<p class="lead">{mk(t["kurz"])}</p>
<p><a class="btn" href="/#grammatik/{e(t["id"])}">▶ Jetzt interaktiv üben ({n_items} Aufgaben)</a></p>
{f"<h2>Formen und Beispiele</h2>{tab}" if tab else ""}
<h2>Beispielsätze</h2><ul class="list">{ex}</ul>
{f"<h2>Typische Fehler</h2>{fe}" if fe else ""}
<h2>Übungen mit Lösungen</h2>
<p class="muted">Hier siehst du die ersten Aufgaben. In der Lern-App übst du alle {n_items} Aufgaben, bekommst sofort eine Erklärung und deine Fehler kommen ins Fehlerheft.</p>
{"".join(items)}
<p><a class="btn" href="/#grammatik/{e(t["id"])}">▶ Alle {n_items} Aufgaben üben</a>{f' <a class="btn ghost" href="/grammatik/{nxt["id"]}/">Nächstes Thema →</a>' if nxt else ""}</p>
<h2>Weitere Grammatik {e(t["level"])}</h2><ul class="list">{more}</ul>
<p><a href="/kurs/{t["level"].lower()}/">Zum Kurs {e(t["level"])}</a> · <a href="/grammatik/">Alle Grammatik-Themen</a></p>"""
    desc = f"{topic} ({t['level']}) einfach erklärt: {plain(t['kurz'])}"
    title = f"{topic}: Übungen {t['level']} mit Lösungen"
    if len(title) >= 60:
        title = f"{topic}: Übungen {t['level']}"
    urls.append(
        page(
            path,
            title,
            desc,
            body,
            [("Grammatik", "grammatik"), (topic, path)],
            "start",
            learning_resource(path, title, seo_desc(desc), t["level"], "Exercise"),
        )
    )

if G:
    secs = ""
    for lv in G_ORDER:
        its = [t for t in G if t["level"] == lv]
        if not its:
            continue
        secs += (
            f'<h2>Grammatik {lv}</h2><ul class="grid">'
            + "".join(
                f'<li><a href="/grammatik/{t["id"]}/"><b>{e(plain(t["title"]))}</b><small>{len(t.get("items", []))} Übungen mit Erklärung</small></a></li>'
                for t in its
            )
            + "</ul>"
        )
    total = sum(len(t.get("items", [])) for t in G)
    body = f"""<h1>Deutsche Grammatik üben: A1 bis B2</h1>
<p class="lead">{len(G)} Grammatik-Themen mit einfacher Regel, Beispielen, typischen Fehlern und {total} Übungen. Kostenlos, ohne Anmeldung, mit Erklärung zu jeder Lösung.</p>
<p><a class="btn" href="/#grammatik">▶ Grammatik-Trainer öffnen</a></p>
{secs}
<p class="muted">Die Regeln sind bewusst einfach formuliert. Kurze Hilfe gibt es in der App auch auf Englisch, Ukrainisch, Russisch, Arabisch, Persisch, Türkisch, Spanisch und Italienisch.</p>"""
    urls.append(
        page(
            "grammatik",
            "Deutsche Grammatik üben A1–B2: Regeln und Übungen",
            f"{len(G)} Grammatik-Themen von A1 bis B2: einfache Regel, Beispiele, typische Fehler und {total} kostenlose Übungen mit Lösungen und Erklärung.",
            body,
            [("Grammatik", "grammatik")],
        )
    )

# ---------------- lessons ----------------
LS = D["lessons"]
for i, l in enumerate(LS):
    path = f"lektion/{l['id']}"
    name = l["title"].rstrip(".")
    words = "".join(f"<li>{e(w)}</li>" for w in (l.get("words") or []))
    nxt = LS[i + 1] if i + 1 < len(LS) else None
    same = [o for o in LS if o["level"] == l["level"] and o["id"] != l["id"]]
    body = f"""<h1>{e(l["title"])}</h1>
<p><span class="tag">Niveau {e(l["level"])}</span><span class="tag">Lektion</span><span class="tag">Kostenlos</span></p>
<p class="lead">{e(l["goal"])}</p>
<p><a class="btn" href="/#lektion/{e(l["id"])}">▶ Lektion starten</a></p>
<h2>Grammatik in dieser Lektion</h2><div class="box"><p>{e(l["rule"])}</p><p><b>Beispiel:</b> {e(l["example"])}</p></div>
<h2>Lesetext</h2><div class="box txt">{e(l["text"])}</div>
<h2>Fragen zum Text</h2>{qa_html(l.get("questions") or [])}
<h2>Schreibaufgabe</h2><div class="box"><p>{e(l["task"])}</p><details><summary>Beispieltext zeigen</summary><p>{e(l["model"])}</p></details></div>
{f'<h2>Wichtige Wörter</h2><ul class="list">{words}</ul>' if words else ""}
<p>In der Lern-App hat die Lektion sieben Schritte: Einstieg, Wortschatz mit Bildern und Audio, Grammatik, Dialog, Übungen, eigener Text und Arbeitsblätter als PDF.</p>
<p><a class="btn" href="/#lektion/{e(l["id"])}">▶ Lektion in der App öffnen</a>{f' <a class="btn ghost" href="/lektion/{nxt["id"]}/">Nächste Lektion →</a>' if nxt else ""}</p>
<h2>Weitere Lektionen {e(l["level"])}</h2><ul class="list">{"".join(f'<li><a href="/lektion/{o["id"]}/">{e(o["title"])}</a></li>' for o in same)}</ul>
<p><a href="/kurs/{l["level"].lower()}/">Zum Kurs {e(l["level"])}</a> · <a href="/lektionen/">Alle Lektionen</a></p>"""
    title = f"{name} – Deutsch {l['level']} Lektion mit Übungen"
    if len(title) >= 60:
        title = f"{name} – Deutsch {l['level']} Lektion"
    desc = f"Deutsch {l['level']}: {l['goal']} Mit Lesetext, Grammatik, Fragen und Lösungen – kostenlos."
    urls.append(
        page(
            path,
            title,
            desc,
            body,
            [("Lektionen", "lektionen"), (name, path)],
            "start",
            learning_resource(path, title, seo_desc(desc), l["level"], "Lesson"),
        )
    )

if LS:
    secs = ""
    for lv in G_ORDER:
        its = [l for l in LS if l["level"] == lv]
        secs += (
            f'<h2>Lektionen {lv}{" Beruf" if lv == "B2" else ""}</h2><ul class="grid">'
            + "".join(
                f'<li><a href="/lektion/{l["id"]}/"><b>{e(l["title"])}</b><small>{e(l["goal"])}</small></a></li>'
                for l in its
            )
            + "</ul>"
        )
    body = f"""<h1>Deutsch-Lektionen von A1 bis B2</h1>
<p class="lead">{len(LS)} kostenlose Lektionen aus dem Alltag in Deutschland: vorstellen, einkaufen, Termine, Wohnung, Arzt, Amt, Arbeit und Bewerbung. Jede Lektion mit Wortschatz, Grammatik, Dialog, Übungen und Lösungen.</p>
<p><a class="btn" href="/#lernen">▶ Lektionen in der App öffnen</a> <a class="btn ghost" href="/kurs/">Kurs nach Niveau</a></p>
{secs}"""
    urls.append(
        page(
            "lektionen",
            "Deutsch-Lektionen A1 bis B2 – kostenlos mit Übungen",
            f"{len(LS)} kostenlose Deutsch-Lektionen von A1 bis B2 mit Wortschatz, Grammatik, Lesetext, Übungen und Lösungen – ohne Anmeldung.",
            body,
            [("Lektionen", "lektionen")],
        )
    )

# ---------------- course ----------------
K = D["kurs"] or {}
STATIC = {
    "lektion": lambda r: f"/lektion/{r[1]}/" if len(r) > 1 else "/lektionen/",
    "grammatik": lambda r: f"/grammatik/{r[1]}/" if len(r) > 1 else "/grammatik/",
    "lesen": lambda r: f"/lesen/{r[1]}/" if len(r) > 1 else "/lesen/",
    "hoeren": lambda r: (
        f"/hoeren/{r[1]}/" if len(r) > 1 and r[1] in D["listening"] else "/hoeren/"
    ),
    "laute": lambda r: "/laute/",
    "fehler": lambda r: "/fehlerheft/",
    "simulation": lambda r: f"/simulation/{r[1]}/" if len(r) > 1 else "/simulation/",
    "lid": lambda r: "/lid/",
    "spiele": lambda r: "/spiele/",
    "bild": lambda r: "/bild/",
}


def static_href(href):
    r = href.lstrip("#").split("/")
    f = STATIC.get(r[0])
    return f(r) if f else "/" + href  # other routes: open the app


for lv, k in K.items():
    path = f"kurs/{lv.lower()}"
    steps = sum(len(u["steps"]) for u in k["units"])
    mins = sum(s.get("min", 0) for u in k["units"] for s in u["steps"])
    n = 0
    units = ""
    for u in k["units"]:
        lis = ""
        for s in u["steps"]:
            n += 1
            lis += f'<li value="{n}"><a href="{e(static_href(s["href"]))}">{e(s["t"])}</a> <span class="muted">· {e(s.get("kind", ""))}{f" · {s['min']} Min." if s.get("min") else ""}</span></li>'
        units += f"<h2>{e(u['title'])}</h2><ol>{lis}</ol>"
    others = " · ".join(
        f'<a href="/kurs/{o.lower()}/">Kurs {o}</a>' for o in K if o != lv
    )
    body = f"""<h1>Deutschkurs {lv} online – kostenlos, Schritt für Schritt</h1>
<p><span class="tag">Niveau {lv}</span><span class="tag">{steps} Schritte</span><span class="tag">ca. {round(mins / 60)} Stunden</span><span class="tag">Ohne Anmeldung</span></p>
<p class="lead">{e(k.get("goal", ""))}</p>
<p><a class="btn" href="/#kurs/{lv}">▶ Kurs {lv} starten</a> <a class="btn ghost" href="/einstufungstest/">Welches Niveau habe ich?</a></p>
<p>Der Kurs zeigt dir immer genau einen nächsten Schritt. Erledigte Schritte hakt er selbst ab. Dein Fortschritt bleibt auf deinem Gerät gespeichert.</p>
{units}
<p><a class="btn" href="/#kurs/{lv}">▶ Kurs {lv} in der App starten</a></p>
<p>{others}</p>"""
    title = f"Deutschkurs {lv} online kostenlos – {steps} Schritte"
    desc = f"Kostenloser Online-Deutschkurs {lv} ({LEVEL_NAME.get(lv, '')}): {steps} Schritte mit Lektionen, Grammatik, Hören, Lesen und Wiederholung. {k.get('goal', '')}"
    urls.append(
        page(
            path,
            title,
            desc,
            body,
            [("Kurse", "kurs"), (f"Kurs {lv}", path)],
            "start",
            {
                "@context": "https://schema.org",
                "@type": "Course",
                "name": f"Deutschkurs {lv} online",
                "description": seo_desc(desc),
                "url": f"{SITE}/{path}/",
                "inLanguage": "de",
                "educationalLevel": lv,
                "isAccessibleForFree": True,
                "provider": {
                    "@type": "EducationalOrganization",
                    "name": "Deutsch mit Dennis",
                    "url": SITE + "/",
                },
                "offers": {
                    "@type": "Offer",
                    "price": "0",
                    "priceCurrency": "EUR",
                    "category": "Free",
                },
                "hasCourseInstance": {
                    "@type": "CourseInstance",
                    "courseMode": "Online",
                    "courseWorkload": f"PT{max(1, round(mins / 60))}H",
                },
            },
        )
    )

if K:
    cards = "".join(
        f'<li><a href="/kurs/{lv.lower()}/"><b>Kurs {lv} · {e(k.get("title", LEVEL_NAME.get(lv, "")))}</b><small>{sum(len(u["steps"]) for u in k["units"])} Schritte · {e(k.get("goal", ""))}</small></a></li>'
        for lv, k in K.items()
    )
    body = f"""<h1>Kostenlose Deutschkurse online: A0 bis B2</h1>
<p class="lead">Fünf Kurse mit fester Reihenfolge: vom ersten Wort bis zur Prüfung B2. Jeder Kurs zeigt dir den nächsten Schritt – Lektion, Grammatik, Hören, Lesen, Sprechen, Schreiben und Wiederholung.</p>
<p><a class="btn" href="/einstufungstest/">Einstufungstest (5 Minuten)</a> <a class="btn ghost" href="/#kurs">Kurse in der App</a></p>
<ul class="grid">{cards}</ul>
<h2>Für wen sind die Kurse?</h2>
<p>Für alle, die in Deutschland leben und Deutsch für Alltag, Integrationskurs, Beruf oder Prüfung brauchen. Du brauchst kein Konto. Die Kurse laufen am Handy und am Computer.</p>"""
    urls.append(
        page(
            "kurs",
            "Deutschkurs online kostenlos: A0, A1, A2, B1, B2",
            "Kostenlose Online-Deutschkurse von A0 bis B2 mit fester Reihenfolge: Lektionen, Grammatik, Hören, Lesen, Sprechen und Prüfungstraining. Ohne Anmeldung.",
            body,
            [("Kurse", "kurs")],
        )
    )

# ---------------- reading texts ----------------
for st in D["reading"]:
    path = f"lesen/{st['id']}"
    parts = ""
    for it in st["items"]:
        parts += (
            f'<h2>{e(it["title"])}</h2><p class="muted">{e(it.get("type", ""))}{" · " + e(it["situation"]) if it.get("situation") else ""}</p>'
            f'<div class="box txt">{e(it["text"])}</div>{qa_html(it.get("questions") or [])}'
        )
    body = f"""<h1>{e(st["title"])}</h1>
<p><span class="tag">Niveau {e(st["level"])}</span><span class="tag">{len(st["items"])} Lesetexte</span><span class="tag">Mit Lösungen</span></p>
<p class="lead">{e(st.get("intro", ""))}</p>
<p><a class="btn" href="/#lesen/{e(st["id"])}">▶ In der App üben</a></p>
{parts}
<p class="muted">Alle Lesetexte sind eigene Übungstexte, keine offiziellen Prüfungsaufgaben. Namen, Adressen und Zahlen sind erfunden.</p>
<p>{" · ".join(f'<a href="/lesen/{o["id"]}/">{e(o["title"])}</a>' for o in D["reading"] if o["id"] != st["id"])}</p>"""
    title = f"Leseverstehen {st['level']}: {len(st['items'])} Texte mit Lösungen"
    desc = (
        f"{len(st['items'])} kurze Lesetexte Deutsch {st['level']} mit Fragen und Lösungen: "
        + ", ".join(i["title"] for i in st["items"][:6])
        + "."
    )
    urls.append(
        page(
            path,
            title,
            desc,
            body,
            [("Lesen", "lesen"), (st["level"], path)],
            "start",
            learning_resource(
                path, title, seo_desc(desc), st["level"], "Reading exercise"
            ),
        )
    )

# ---------------- listening transcripts (beginner sets only) ----------------
for sid, st in D["listening"].items():
    path = f"hoeren/{sid}"
    parts = ""
    for it in st["items"]:
        segs = it.get("segments")
        txt = (
            "<br>".join("– " + e(s["text"]) for s in segs)
            if segs and len(segs) > 1
            else e(segs[0]["text"] if segs else it.get("text", ""))
        )
        parts += (
            f"<h2>{e(it.get('title') or it.get('type', 'Hörtext'))}</h2>{f'<p class=muted>{e(it["situation"])}</p>' if it.get('situation') else ''}"
            f"<details><summary>Text zum Mitlesen</summary><p>{txt}</p></details>{qa_html(it.get('questions') or [])}"
        )
    body = f"""<h1>{e(st["title"])}</h1>
<p><span class="tag">Niveau {e(st["level"])}</span><span class="tag">{len(st["items"])} Hörtexte</span><span class="tag">Mit Text und Lösungen</span></p>
<p class="lead">{e(st.get("intro", "Kurze Hörtexte aus dem Alltag mit Fragen, Text zum Mitlesen und Lösungen."))}</p>
<p><a class="btn" href="/#hoeren/{e(sid)}">▶ Hörtexte in der App anhören</a></p>
{parts}
<p class="muted">Alle Hörtexte sind eigene Übungstexte, keine offiziellen Prüfungsaufgaben.</p>"""
    title = f"Hörverstehen {st['level']}: {len(st['items'])} Hörtexte mit Lösungen"
    desc = f"{len(st['items'])} kurze Hörtexte Deutsch {st['level']} mit Fragen, Text zum Mitlesen und Lösungen – kostenlos online üben."
    urls.append(
        page(
            path,
            title,
            desc,
            body,
            [("Hören", "hoeren"), (st["level"], path)],
            "start",
            learning_resource(
                path, title, seo_desc(desc), st["level"], "Listening exercise"
            ),
        )
    )

# ---------------- exam facts (pruefung-fakten.js: window.DMFakten = {STAND, ids, data, sources}) ----------------
FK = D.get("fakten")
F = []
if FK:
    SRC, STAND = FK["sources"], FK["stand"]

    def src_line(keys):
        links = " · ".join(f'<a href="{e(SRC[k][1])}" rel="noopener nofollow">{e(SRC[k][0])}</a>' for k in (keys or []) if k in SRC)
        return f'<p class="small">Quelle: {links} · Stand: {e(STAND)}</p>' if links else f'<p class="small">Stand: {e(STAND)}</p>'

    for fid in FK["ids"]:
        x = FK["data"][fid]
        F.append((fid, x))
        path = f"pruefungsinfo/{fid}"
        rows = "".join(
            f'<div class="box"><b>{e(r[0])}</b> · {e(r[1])}'
            + (f'<br><span class="muted">{e(r[2])}</span>' if len(r) > 2 and r[2] else "")
            + (f"<br>{e(r[3])}" if len(r) > 3 and r[3] else "")
            + "</div>"
            for r in x["parts"]
        )
        blocks = "".join(
            f'<h2>{e(b["h"])}</h2><ul class="list">{"".join(f"<li>{e(t)}</li>" for t in b["list"])}</ul>'
            + (f'<p class="muted">{e(b["note"])}</p>' if b.get("note") else "")
            + ('<p class="small">Allgemeine Information, keine Rechtsberatung.</p>' if b.get("legal") else "")
            + src_line(b.get("src"))
            for b in x["blocks"]
        )
        others = " · ".join(f'<a href="/pruefungsinfo/{o}/">{e(FK["data"][o]["short"])}</a>' for o in FK["ids"] if o != fid)
        body = f"""<h1>{e(x["title"])}: Aufbau, Punkte, Anmeldung</h1>
<p><span class="tag">{e(x["tag"])}</span><span class="tag">Stand: {e(STAND)}</span></p>
<p class="lead">{e(x["lead"])}</p>
<h2>Die Teile der Prüfung</h2>
{rows}
{src_line(x.get("partsSrc"))}
{blocks}
<p><a class="btn" href="/simulation/{e(x["sim"])}/">▶ Kostenlose Probeprüfung {e(x["short"])}</a> <a class="btn ghost" href="/#pruefungsinfo/{e(fid)}">In der App öffnen</a></p>
<p class="muted">Alle Angaben ohne Gewähr. Unabhängiges Lernangebot, kein Angebot von g.a.s.t., telc oder BAMF. Keine Rechtsberatung.</p>
<p>Weitere Prüfungen: {others}</p>"""
        title = f"{x['short']}: Aufbau, Dauer, Punkte und Anmeldung"
        desc = f"{x['lead']} Teile, Dauer, Punkte, Bestehen, Anmeldung und Kosten – mit Quelle, Stand {STAND}."
        urls.append(page(path, title, desc, body, [("Prüfungsinfos", "pruefungsinfo"), (x["short"], path)], "pruefung"))
    cards = "".join(f'<li><a href="/pruefungsinfo/{fid}/"><b>{e(x["title"])}</b><small>{e(x["lead"])}</small></a></li>' for fid, x in F)
    urls.append(page("pruefungsinfo", "Deutschprüfungen: Aufbau, Punkte, Anmeldung",
                     "DTZ, telc B1/B2, DTB B1/B2 und Leben in Deutschland: Aufbau, Dauer, Punkte, Bestehen, Anmeldung und Kosten – mit Quelle und Stand.",
                     f'<h1>Deutschprüfungen im Überblick</h1><p class="lead">Aufbau, Dauer, Punkte, Bestehensregeln und Anmeldung für sechs Prüfungen. Jede Angabe hat eine Quelle und ein Datum (Stand: {e(STAND)}).</p><ul class="grid">{cards}</ul><p><a class="btn" href="/simulation/">Zu den Probeprüfungen</a></p>',
                     [("Prüfungsinfos", "pruefungsinfo")], "pruefung"))

# ---------------- short landing pages ----------------
urls.append(
    page(
        "einstufungstest",
        "Einstufungstest Deutsch kostenlos: A1 bis B2 in 5 Minuten",
        "Kostenloser Einstufungstest Deutsch: 16 Fragen von A1 bis B2, etwa 5 Minuten, ohne Anmeldung. Danach startest du direkt im passenden Kurs.",
        """<h1>Einstufungstest Deutsch: Welches Niveau habe ich?</h1>
<p><span class="tag">A1 bis B2</span><span class="tag">16 Fragen</span><span class="tag">ca. 5 Minuten</span><span class="tag">Kostenlos</span></p>
<p class="lead">Du weißt nicht, ob du A1, A2, B1 oder B2 bist? Der kurze Test zeigt dir dein ungefähres Niveau. Danach startest du direkt im passenden Kurs.</p>
<p><a class="btn" href="/#einstufung">▶ Test starten</a></p>
<h2>So funktioniert der Test</h2>
<ul class="list"><li>16 Fragen zu Grammatik, Wortschatz und Lesen – vier pro Niveau, von leicht zu schwer.</li><li>Der Test hört früher auf, wenn die Fragen zu schwer werden.</li><li>Am Ende siehst du dein ungefähres Niveau und den passenden Kurs.</li><li>Du brauchst kein Konto. Nichts wird übertragen.</li></ul>
<h2>Was bedeutet das Ergebnis?</h2>
<p>Der Test ist eine Orientierung und kein offizielles Zertifikat. Für einen Nachweis brauchst du eine Prüfung, zum Beispiel den <a href="/simulation/dtz/">Deutsch-Test für Zuwanderer (A2–B1)</a>, <a href="/simulation/telc-b1/">telc Deutsch B1</a> oder <a href="/simulation/telc-b2/">telc Deutsch B2</a>.</p>
<p>Du fängst ganz neu an? Dann starte ohne Test im <a href="/kurs/a0/">Kurs A0</a>.</p>""",
        [("Einstufungstest", "einstufungstest")],
    )
)
urls.append(
    page(
        "laute",
        "Deutsche Aussprache üben: Laute und Buchstaben",
        "Deutsche Aussprache für Anfänger: lange und kurze Vokale, ä ö ü, ei und ie, ch und sch, Wortakzent. Mit Audio, Hörquiz und Nachsprechen – kostenlos.",
        """<h1>Deutsche Aussprache: Laute und Buchstaben</h1>
<p><span class="tag">A0–A1</span><span class="tag">Mit Audio</span><span class="tag">Kostenlos</span></p>
<p class="lead">Hör zu, sprich nach und vergleiche: Hier übst du die Laute, die am Anfang schwer sind.</p>
<p><a class="btn" href="/#laute">▶ Aussprache üben</a></p>
<h2>Themen</h2>
<ul class="list"><li>Lange und kurze Vokale: Staat – Stadt, Miete – Mitte</li><li>Umlaute ä, ö, ü: schon – schön, Mutter – Mütter</li><li>ei, ie, eu, äu, au</li><li>ch und sch, sp und st am Wortanfang</li><li>r, die Endung -er und das h</li><li>z, s, ß, v, w und f</li><li>Wortakzent: einkaufen, besuchen</li><li>Satzmelodie: Aussage und Frage</li><li>Das Alphabet mit Beispielwörtern</li></ul>
<p>Zu jedem Thema gibt es ein Hörquiz („Welches Wort hörst du?“) und Nachsprechen mit eigener Aufnahme. Die Aussprache wird nicht automatisch bewertet – du hörst dich selbst und vergleichst.</p>
<p><a href="/kurs/a0/">Zum Kurs A0</a></p>""",
        [("Aussprache", "laute")],
    )
)
urls.append(
    page(
        "fehlerheft",
        "Fehlerheft: Fehler wiederholen und Deutsch behalten",
        "Das Fehlerheft sammelt deine Fehler aus Lektionen, Grammatik, Spielen und Tests und fragt sie nach 1, 3, 7 und 21 Tagen wieder ab – kostenlos, ohne Konto.",
        """<h1>Mein Fehlerheft: Fehler gezielt wiederholen</h1>
<p class="lead">Alle falschen Antworten aus Lektionen, Grammatik, Erste Schritte, Tages-Challenge und Leben in Deutschland landen in deinem Fehlerheft. Du wiederholst sie in kleinen Runden, bis sie sitzen.</p>
<p><a class="btn" href="/#fehler">▶ Fehlerheft öffnen</a></p>
<h2>So funktioniert das Wiederholen</h2>
<ul class="list"><li>Ein neuer Fehler kommt sofort wieder dran.</li><li>Richtig beantwortet? Dann kommt er nach 1 Tag, 3 Tagen, 7 Tagen und 21 Tagen noch einmal.</li><li>Falsch beantwortet? Dann fängt er wieder von vorn an.</li><li>Nach fünf richtigen Antworten gilt er als gelernt.</li></ul>
<p>Das Fehlerheft liegt nur auf deinem Gerät. Mit „Lernstand sichern“ nimmst du es auf ein neues Handy mit.</p>""",
        [("Fehlerheft", "fehlerheft")],
    )
)

print(
    f"{len(urls)} Lernseiten geschrieben (Grammatik {len(G)}, Lektionen {len(LS)}, Kurse {len(K)}, Lesen {len(D['reading'])}, Hören {len(D['listening'])}, Prüfungsinfos {len(F)})"
)
