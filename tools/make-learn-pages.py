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
// level pages: run the app's own levelPage (erste-schritte.js) and keep the HTML it renders (DM.page)
c.matchMedia=()=>({matches:false});
if(fs.existsSync('erste-schritte-data.js'))run('erste-schritte-data.js');
let pageHTML='';const levels={};
Object.assign(c.DM,{esc:s=>String(s??'').replace(/[&<>"]/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[ch])),
  store:{},save(){},crumbs:()=>'',note:()=>'',page:h=>{pageHTML=h}});
c.DM.routes=c.DM.routes||{};
run('erste-schritte.js');
if(c.DM.routes.niveau)for(const L of ['A0','A1','A2','B1','B2']){pageHTML='';c.DM.routes.niveau(['niveau',L]);levels[L]=pageHTML;}
// guided speaking tasks of the practice page (learner-paths.js: top-level const practiceScenes; the rest needs the app)
let practice={};
{const s=fs.readFileSync('learner-paths.js','utf8'),a=s.indexOf('const practiceScenes='),b=s.indexOf('const learnerDrafts',a);
 if(a>=0&&b>a){vm.runInContext(s.slice(a,b).replace('const practiceScenes=','window.__ps='),c);practice=c.__ps||{};}}
// exam preparation (sim/<id>.js: sections + prep) for the four prep pages
for(const f of ['telc-b1','telc-b2','dtb-b1','dtb-b2'])run('sim/'+f+'.js');
const prep={};for(const [id,s] of Object.entries(c.SIM||{}))if(s.prep){const p=pick(s.prep);(p.parts||[]).forEach(q=>delete q.mini);
  prep[id]={id,title:s.title,short:s.short,level:s.level,sections:(s.sections||[]).map(x=>({title:x.title,minutes:x.minutes||0,prepMinutes:x.prepMinutes||0,
  parts:(x.parts||[]).map(q=>({kind:q.kind||'',title:q.title,minWords:q.minWords||0,minutes:q.minutes||0,items:(q.items||[]).length}))})),prep:p};}
process.stdout.write(JSON.stringify({lessons:c.__lessons||[],grammar:pick(G),kurs:pick(c.DM.kurs)||{},
  reading:pick(Array.isArray(c.DM.reading)?c.DM.reading:Object.values(c.DM.reading||{})),listening:pick(c.DM.listening)||{},
  fakten:c.DMFakten&&c.DMFakten.data?pick({stand:c.DMFakten.STAND,ids:c.DMFakten.ids,data:c.DMFakten.data,sources:c.DMFakten.sources}):null,
  levels,materials:pick(c.DM.materials)||[],materialCats:pick(c.DM.materialCats)||{},
  speakB2:{extra:pick((c.DM.extraScenes||{}).B2)||[],practice:pick(practice.B2)||[]},prep}));
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
.grid a{display:block;background:#fff;border:1px solid var(--line);border-radius:12px;padding:12px 14px;text-decoration:none;min-height:44px}.grid a b{display:block}.grid a small{color:var(--muted)}
.grid a .d{display:block;color:var(--ink);font-size:.9rem;margin-top:4px}h3{font-size:1.08rem;margin:1.2em 0 .3em}table th{width:34%}.box ul{margin:.3em 0}"""

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
<footer><a href="/">Startseite</a><a href="/kurs/">Kurse A0–B2</a><a href="/grammatik/">Grammatik</a><a href="/lektionen/">Lektionen</a><a href="/pruefung/">Prüfung</a><a href="/material/">Arbeitsblätter</a><a href="/impressum/">Impressum</a><a href="/datenschutz/">Datenschutz</a><br>Kostenlos Deutsch lernen von A1 bis B2 – von Dennis, DaZ-Lehrer und lizenzierter Prüfer.</footer>
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
    "simulation": lambda r: (
        f"/simulation/{r[1]}/" if len(r) > 1 and os.path.exists(os.path.join(R, "simulation", r[1], "index.html"))
        else "/#" + "/".join(r) if len(r) > 1 else "/simulation/"
    ),
    "lid": lambda r: "/lid/",
    "spiele": lambda r: "/spiele/",
    "bild": lambda r: "/bild/",
    "einstufung": lambda r: "/einstufungstest/",
    "lernen": lambda r: "/lektionen/",
    "vorbereitung": lambda r: (
        f"/vorbereitung/{r[1]}/" if len(r) > 1 and r[1] in D["prep"] else "/vorbereitung/"
    ),
    "pruefungsinfo": lambda r: (
        f"/pruefungsinfo/{r[1]}/"
        if len(r) > 1 and D.get("fakten") and r[1] in D["fakten"]["data"]
        else "/pruefungsinfo/"
    ),
    "niveau": lambda r: f"/niveau/{r[1].lower()}/" if len(r) > 1 else "/niveau/a1/",
    "b2-30-tage": lambda r: "/b2-30-tage/" + (f"#{r[1]}" if len(r) > 1 else ""),
    "b2-woerter": lambda r: "/b2-woerter/",
    "dtz-30-tage": lambda r: "/dtz-30-tage/",
    "ueben": lambda r: (
        "/ueben/sprechen/b2/" if r[1:3] == ["sprechen", "B2"]
        else "/ueben/" if len(r) == 1 else "/#" + "/".join(r)
    ),
    "material": lambda r: (
        "/" + "/".join(r) if r[-1].endswith(".pdf")
        else f"/material/{r[2].lower()}/" if len(r) > 2 and r[2] in ("A1", "A2", "B1", "B2")
        else "/material/"
    ),
    "pruefung": lambda r: "/pruefung/" if len(r) == 1 else "/#" + "/".join(r),
    "lieder": lambda r: "/lieder/" if len(r) == 1 else "/#" + "/".join(r),
}


def static_href(href):
    if href.startswith("/"):
        return href  # already a real address (e.g. /dtz-schreiben/)
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
<p><a href="/niveau/{lv.lower()}/">Alle Materialien für {lv}</a> · {others}</p>"""
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
{f'<p><a href="/vorbereitung/{e(fid)}/">Aufbau und Strategien für jeden Teil: Vorbereitung {e(x["short"])}</a></p>' if fid in (D.get("prep") or ()) else ""}
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

# ---------------- worksheets /material/ + /material/<niveau>/ (DM.materials, site-data.js) ----------------
MATS = D.get("materials") or []
MCATS = D.get("materialCats") or {}
LVS = ["A1", "A2", "B1", "B2", "C1"]
FMT_NAME = {"dtb": "DTB B2 – Deutsch-Test für den Beruf", "telc": "telc Deutsch B2"}
ORG = {"@type": "EducationalOrganization", "@id": SITE + "/#org", "name": "Deutsch mit Dennis", "url": SITE + "/"}
missing_pdf = []


def has_lv(s, lv):
    """same rule as hasLv in erste-schritte.js: 'B1' or a range 'A2–B1' that includes lv."""
    parts = [t.strip() for t in re.split(r"[–-]", str(s or ""))]
    if lv in parts:
        return True
    if len(parts) == 2 and all(p in LVS for p in parts) and lv in LVS:
        return LVS.index(parts[0]) < LVS.index(lv) < LVS.index(parts[1])
    return False


def pdf_ok(f):
    ok = os.path.exists(os.path.join(R, f.split("?")[0]))
    if not ok:
        missing_pdf.append(f)
    return ok


def mat_li(m):
    meta = f'{e(m["level"])} · {m["pages"]} {"Seite" if m["pages"] == 1 else "Seiten"} · PDF{" · mit Lösungen" if m.get("loes") else ""}'
    return (
        f'<li><a href="/{e(m["file"])}"><b>{e(m["title"])}</b><small>{meta}</small>'
        f'<span class="d">{e(m.get("desc", ""))}</span></a></li>'
    )


def mat_ld(items, name):
    """ItemList of LearningResource (worksheets as PDF)."""
    return {
        "@context": "https://schema.org",
        "@type": "ItemList",
        "name": name,
        "numberOfItems": len(items),
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": i + 1,
                "item": {
                    "@type": "LearningResource",
                    "name": m["title"],
                    "description": seo_desc(m.get("desc", "") or m["title"], 300),
                    "educationalLevel": m["level"],
                    "learningResourceType": "Worksheet",
                    "encodingFormat": "application/pdf",
                    "url": f'{SITE}/{m["file"]}',
                    "isAccessibleForFree": True,
                    "inLanguage": "de",
                    "provider": ORG,
                },
            }
            for i, m in enumerate(items)
        ],
    }


if MATS:
    MATS = [m for m in MATS if pdf_ok(m["file"])]
    lv_links = " · ".join(f'<a href="/material/{l.lower()}/">Arbeitsblätter {l}</a>' for l in LVS[:4])
    secs = ""
    for k, name in MCATS.items():
        its = [m for m in MATS if m.get("cat") == k]
        if not its:
            continue
        secs += f'<h2>{e(name)} <span class="muted">({len(its)})</span></h2>'
        for lv in LVS:
            sub = [m for m in its if m["level"].split("–")[0].strip() == lv]
            if sub:
                secs += f'<h3>{e(name)} · {lv}</h3><ul class="grid mats">{"".join(mat_li(m) for m in sub)}</ul>'
    body = f"""<h1>Arbeitsblätter Deutsch als PDF: kostenlos zum Ausdrucken</h1>
<p><span class="tag">{len(MATS)} PDFs</span><span class="tag">A1 bis B2</span><span class="tag">Mit Lösungen</span><span class="tag">Kostenlos</span></p>
<p class="lead">Alle Arbeitsblätter von Dennis an einem Ort: Grammatik, Wortschatz, Sprechen, Lesen und Hören, Prüfungstraining für DTZ, telc und DTB und ganze Unterrichtsstunden. Jedes Blatt hat Regeln, Beispiele, Übungen und Lösungen – für den Kurs oder zum Lernen zu Hause.</p>
<p><a class="btn" href="/#material">▶ Materialien in der App filtern</a></p>
<p>Nach Niveau: {lv_links}</p>
{secs}
<p class="muted">Alle Arbeitsblätter sind eigene Materialien, keine offiziellen Prüfungsaufgaben. Ausdrucken und Kopieren für den Unterricht ist erlaubt.</p>"""
    urls.append(
        page(
            "material",
            "Arbeitsblätter Deutsch PDF kostenlos: A1 bis B2",
            f"{len(MATS)} kostenlose Arbeitsblätter Deutsch als PDF von A1 bis B2: Grammatik, Wortschatz, Sprechen, Lesen, Hören und Prüfung (DTZ, telc, DTB) – mit Lösungen.",
            body,
            [("Arbeitsblätter", "material")],
            "start",
            mat_ld(MATS, "Arbeitsblätter Deutsch als PDF"),
        )
    )
    MAT_INTRO = {
        "A1": "Arbeitsblätter für Anfänger: das Alphabet, Zahlen, sich vorstellen, einkaufen und erste Grammatik wie Artikel und Verben. Für ganz neue Lernende gibt es Bildwörterbücher zu den ersten Schritten.",
        "A2": "Arbeitsblätter für den Alltag in Deutschland: Termine, Wohnung, Arzt, Briefe an Behörden und die Grammatik von Perfekt bis Nebensatz – passend zum Integrationskurs und zur DTZ-Vorbereitung.",
        "B1": "Arbeitsblätter für B1: Meinung sagen, Briefe schreiben, Hören und Lesen wie im DTZ, in telc Deutsch B1 und im DTB B1 – mit Strategien und Lösungen.",
        "B2": "Deutsch B2 Prüfungsvorbereitung kostenlos zum Ausdrucken: DTB B2 Übungen als PDF (Beschwerde, Telefonnotiz, Forumsbeitrag), telc B2 Übungen zu Leseverstehen, Sprachbausteinen, Hören und E-Mail, dazu Grammatik und Wortschatz für beide Prüfungen.",
    }
    for lv in LVS[:4]:
        its = [m for m in MATS if has_lv(m["level"], lv)]
        if not its:
            continue
        if lv == "B2":
            groups = [
                ("Für alle Prüfungen: Grammatik, Wortschatz, Sprechen", [m for m in its if not m.get("fmt")]),
                (FMT_NAME["dtb"], [m for m in its if m.get("fmt") == "dtb"]),
                (FMT_NAME["telc"] + " – allgemein", [m for m in its if m.get("fmt") == "telc"]),
            ]
        else:
            groups = [(MCATS.get(k, k), [m for m in its if m.get("cat") == k]) for k in MCATS]
        secs = "".join(
            f'<h2>{e(h)} <span class="muted">({len(g)})</span></h2><ul class="grid mats">{"".join(mat_li(m) for m in g)}</ul>'
            for h, g in groups
            if g
        )
        others = " · ".join(f'<a href="/material/{o.lower()}/">{o}</a>' for o in LVS[:4] if o != lv)
        path = f"material/{lv.lower()}"
        title = (
            "DTB B2 und telc B2 Übungen als PDF – kostenlos"
            if lv == "B2"
            else f"Arbeitsblätter Deutsch {lv} als PDF – kostenlos"
        )
        body = f"""<h1>{"Deutsch B2 Arbeitsblätter: DTB B2 und telc B2 Übungen als PDF" if lv == "B2" else f"Arbeitsblätter Deutsch {lv} als PDF"}</h1>
<p><span class="tag">Niveau {lv}</span><span class="tag">{len(its)} PDFs</span><span class="tag">Mit Lösungen</span><span class="tag">Kostenlos</span></p>
<p class="lead">{e(MAT_INTRO[lv])}</p>
<p><a class="btn" href="/#material/alle/{lv}">▶ In der App öffnen</a> <a class="btn ghost" href="/niveau/{lv.lower()}/">Alles für {lv}</a></p>
{secs}
<p>Andere Niveaus: {others} · <a href="/material/">Alle Arbeitsblätter</a></p>"""
        desc = (
            f"{len(its)} kostenlose PDFs zur Deutsch B2 Prüfungsvorbereitung: DTB B2 Übungen, telc B2 Übungen, Grammatik und Wortschatz – mit Lösungen zum Ausdrucken."
            if lv == "B2"
            else f"{len(its)} kostenlose Arbeitsblätter Deutsch {lv} als PDF: " + ", ".join(m["title"].split(":")[0] for m in its[:4]) + " und mehr – mit Lösungen."
        )
        urls.append(
            page(
                path, title, desc, body,
                [("Arbeitsblätter", "material"), (f"Niveau {lv}", path)],
                "start",
                mat_ld(its, f"Arbeitsblätter Deutsch {lv} als PDF"),
            )
        )

# ---------------- level pages /niveau/<lv>/ (the app's level page, erste-schritte.js levelPage) ----------------
LEVELS = D.get("levels") or {}
LV_TITLE = {
    "A0": ("Deutsch A0 für Anfänger: die ersten Schritte", "Deutsch A0: die ersten Schritte – kostenlos für Anfänger"),
    "A1": ("Deutsch A1: Lektionen, Übungen und Arbeitsblätter", "Deutsch A1 lernen: Lektionen, Übungen, PDFs"),
    "A2": ("Deutsch A2: Lektionen, Übungen und DTZ-Vorbereitung", "Deutsch A2: Übungen, DTZ-Vorbereitung, PDFs"),
    "B1": ("Deutsch B1: Übungen und Prüfungsvorbereitung", "Deutsch B1: Übungen und Prüfungsvorbereitung"),
    "B2": ("Deutsch B2: Prüfungsvorbereitung telc B2 und DTB B2", "Deutsch B2 Prüfungsvorbereitung kostenlos"),
}
LV_INTRO = {
    "A0": "Du fängst ganz neu mit Deutsch an? Hier lernst du die ersten Wörter mit Bildern und Ton: begrüßen, das Alphabet, Zahlen, Farben und wichtige Sätze im Kurs. Danach geht es mit den ersten Lektionen auf Niveau A1 weiter – kostenlos und ohne Anmeldung.",
    "A1": "Alles für Deutsch A1 an einem Ort: Lektionen zu Alltagsthemen wie Vorstellen, Einkaufen und Termine, Wortkarten mit Bild und Ton, Sprechen und Schreiben mit Mustertexten und Arbeitsblätter zum Ausdrucken. Kostenlos und ohne Anmeldung.",
    "A2": "Deutsch A2 für den Alltag in Deutschland: Lektionen zu Wohnung, Arzt und Amt, Hören und Lesen mit Lösungen und Arbeitsblätter als PDF. Wer den Integrationskurs macht, findet hier auch die Vorbereitung auf den DTZ und den Test „Leben in Deutschland“.",
    "B1": "Deutsch B1: Gespräche führen, Meinung sagen, Briefe schreiben. Hier findest du Lektionen, Hören und Lesen, Arbeitsblätter und die Prüfungsvorbereitung für DTZ, telc Deutsch B1 und DTB B1 – mit Probeprüfungen, die du online oder auf Papier machst.",
    "B2": "Deutsch B2 Prüfungsvorbereitung kostenlos: Für den DTB B2 (Deutsch-Test für den Beruf) und für telc Deutsch B2 findest du hier Probeprüfungen mit Zeit, Aufbau und Strategien zu jedem Teil, B2-Wörter nach Prüfungsthemen und DTB B2 Übungen als PDF. Auch die telc B2 Übungen zu Lesen, Sprachbausteinen, Hören und E-Mail kannst du ausdrucken.",
}


def parse_level(h):
    """sections (h2) -> groups (h3) -> links of the rendered level page."""
    un = lambda s: html.unescape(re.sub(r"<[^>]+>", "", s)).strip()
    secs = []
    tok = re.compile(
        r'<h2 id="lv-[\w-]+">(.*?)</h2>|<h3 class="es-lv-h3">(.*?)</h3>|<a class="es-(?:link|tcard)" href="([^"]*)"[^>]*>(.*?)</a>',
        re.S,
    )
    for m in tok.finditer(h):
        if m.group(1) is not None:
            secs.append({"h": re.sub(r"^\d+ · ", "", un(m.group(1))), "groups": [{"h": "", "items": []}]})
        elif m.group(2) is not None and secs:
            secs[-1]["groups"].append({"h": un(m.group(2)), "items": []})
        elif m.group(3) is not None and secs:
            inner = m.group(4)
            b = re.search(r"<b>(.*?)</b>", inner, re.S)
            s = re.search(r"<small>(.*?)</small>", inner, re.S)
            secs[-1]["groups"][-1]["items"].append(
                (html.unescape(m.group(3)), un(b.group(1)) if b else "", un(s.group(1)) if s else "")
            )
    for s in secs:
        s["groups"] = [g for g in s["groups"] if g["items"]]
    return [s for s in secs if s["groups"]]


def level_li(href, t, sub):
    to = static_href(href)
    if to.endswith(".pdf") and not pdf_ok(to.lstrip("/")):
        return ""
    return f'<li><a href="{e(to)}"><b>{e(t)}</b>{f"<small>{e(sub)}</small>" if sub else ""}</a></li>'


for lv, h in LEVELS.items():
    secs = parse_level(h)
    if not secs:
        continue
    out = ""
    for s in secs:
        out += f"<h2>{e(s['h'])}</h2>"
        for g in s["groups"]:
            lis = "".join(level_li(*it) for it in g["items"])
            out += (f"<h3>{e(g['h'])}</h3>" if g["h"] else "") + f'<ul class="grid">{lis}</ul>'
    L = "A1" if lv == "A0" else lv
    tabs = " · ".join(f'<a href="/niveau/{o.lower()}/">{o}</a>' if o != lv else f"<b>{o}</b>" for o in LEVELS)
    h1, title = LV_TITLE.get(lv, (f"Deutsch {lv}", f"Deutsch {lv}"))
    body = f"""<h1>{e(h1)}</h1>
<p><span class="tag">Niveau {lv}</span><span class="tag">Kostenlos</span><span class="tag">Ohne Anmeldung</span></p>
<p class="lead">{e(LV_INTRO.get(lv, ""))}</p>
<p><a class="btn" href="/#niveau/{lv}">▶ In der App öffnen</a> <a class="btn ghost" href="/kurs/{lv.lower()}/">Kurs {lv} Schritt für Schritt</a></p>
<p>Niveau: {tabs}</p>
{out}
<p><a href="/material/{L.lower()}/">Alle Arbeitsblätter {L} (PDF)</a> · <a href="/kurs/{lv.lower()}/">Kurs {lv}</a> · <a href="/einstufungstest/">Welches Niveau habe ich?</a></p>"""
    desc = {
        "A0": "Deutsch für Anfänger ohne Vorkenntnisse: Bildkarten mit Ton, Alphabet, Zahlen, erste Lektionen und Spiele – kostenlos und ohne Anmeldung.",
        "B2": "Deutsch B2 Prüfungsvorbereitung kostenlos: Probeprüfungen DTB B2 und telc B2, Strategien, B2-Wörter, Hören, Lesen und DTB B2 Übungen als PDF.",
    }.get(lv, f"Alles für Deutsch {lv}: Lektionen, Wortschatz, Sprechen, Schreiben, Hören, Lesen, Arbeitsblätter als PDF und Prüfungsvorbereitung – kostenlos.")
    urls.append(page(f"niveau/{lv.lower()}", title, desc, body, [(f"Niveau {lv}", f"niveau/{lv.lower()}")]))

# ---------------- exam preparation /vorbereitung/<id>/ (sim/<id>.js prep, same content as prepPage in simulation.js) ----------------
PREP = D.get("prep") or {}
B2_SRC = "Quelle für Aufbau, Punkte und Bestehen: offizielle Modelltests der telc gGmbH (telc Deutsch B2, Übungstest 1, 2019; Deutsch-Test für den Beruf B2, Übungstest 1, 2020). Stand: 13.11.2026."
# FAQ: only facts from tools/pdf/b2-formate-offiziell.md (checked against the official model tests)
B2_DIFF = (
    "telc Deutsch B2 ist eine allgemeine Sprachprüfung mit Themen aus Alltag, Medien und Gesellschaft: 300 Punkte, "
    "schriftlich 140 Minuten, mündlich ca. 15 Minuten mit 20 Minuten Vorbereitung. Der DTB B2 (Deutsch-Test für den Beruf) "
    "spielt im Arbeitsleben: Kunden-E-Mails, Telefonnotizen, Besprechungen und Gespräche im Team. Er hat 240 Punkte, je 60 für "
    "Lesen, Hören, Schreiben und Sprechen, schriftlich 125 Minuten und mündlich ca. 16 Minuten ohne Vorbereitungszeit."
)
FAQ = {
    "telc-b2": [
        ("Was ist der Unterschied zwischen telc Deutsch B2 und DTB B2?", B2_DIFF),
        ("Wie oft hört man die Texte in telc Deutsch B2?", "Alle drei Teile des Hörverstehens hört man nur einmal. Vor Teil 1 gibt es 30 Sekunden und vor Teil 2 60 Sekunden Zeit, um die Aufgaben zu lesen."),
        ("Wie viele Punkte braucht man, um telc Deutsch B2 zu bestehen?", "Es gibt 300 Punkte: 225 in der schriftlichen und 75 in der mündlichen Prüfung. Man muss beide Teile mit mindestens 60 Prozent bestehen, also mindestens 135 Punkte schriftlich und 45 Punkte mündlich."),
        ("Wie lange dauert die Prüfung telc Deutsch B2?", "Die schriftliche Prüfung dauert 140 Minuten: 90 Minuten Leseverstehen und Sprachbausteine, ca. 20 Minuten Hörverstehen und 30 Minuten Schriftlicher Ausdruck. Die mündliche Prüfung dauert ca. 15 Minuten zu zweit, davor gibt es 20 Minuten Vorbereitung."),
    ],
    "dtb-b2": [
        ("Was ist der Unterschied zwischen DTB B2 und telc Deutsch B2?", B2_DIFF),
        ("Wie oft hört man die Texte im DTB B2?", "Alle Hörtexte hört man nur einmal – auch im Teil „Hören und Schreiben“, in dem man eine Telefonnotiz schreibt."),
        ("Wie viele Punkte braucht man, um den DTB B2 zu bestehen?", "Es gibt 240 Punkte, je 60 für Lesen, Hören, Schreiben und Sprechen. Man braucht insgesamt mindestens 60 Prozent (144 Punkte) und in mindestens drei der vier Fertigkeiten 60 Prozent (36 Punkte). Eine Fertigkeit darf zwischen 40 und 60 Prozent liegen."),
        ("Gibt es im DTB B2 eine Vorbereitungszeit für die mündliche Prüfung?", "Nein. Die mündliche Prüfung ist eine Paarprüfung von ca. 16 Minuten ohne Vorbereitungszeit. Sie hat drei Teile: über ein Thema sprechen, ein Gespräch mit Kolleginnen und Kollegen und gemeinsam eine Lösung für ein Problem am Arbeitsplatz finden."),
    ],
}
PREP_TITLE = {
    "telc-b1": "telc B1 Vorbereitung: Aufbau, Zeiten, Strategien",
    "telc-b2": "telc B2 Vorbereitung: Aufbau, Zeiten, Strategien",
    "dtb-b1": "DTB B1 Vorbereitung: Aufbau, Zeiten, Strategien",
    "dtb-b2": "DTB B2 Vorbereitung: Aufbau, Zeiten, Strategien",
}


def part_line(p):
    if p["kind"] == "write":
        return f'{p["title"]}: Text schreiben' + (f' (ab {p["minWords"]} Wörtern)' if p["minWords"] else "")
    if p["kind"] == "speak":
        return f'{p["title"]} (ca. {p["minutes"]} Min.)'
    return f'{p["title"]}: {p["items"]} Aufgaben'


for pid, x in PREP.items():
    P = x["prep"]
    short = x.get("short") or x["title"]
    path = f"vorbereitung/{pid}"
    facts = "".join(f"<tr><th scope=\"row\">{e(k)}</th><td>{e(v)}</td></tr>" for k, v in P.get("facts", []))
    aufbau = "".join(
        f'<tr><th scope="row">{e(s["title"])}</th><td>{s["minutes"]} Min.{f" + {s["prepMinutes"]} Min. Vorbereitung" if s["prepMinutes"] else ""}</td>'
        f'<td>{"<br>".join(e(part_line(p)) for p in s["parts"])}</td></tr>'
        for s in x["sections"]
    )
    parts, skill = "", None
    for i, q in enumerate(P.get("parts", [])):
        if q.get("skill") and q["skill"] != skill:
            skill = q["skill"]
            parts += f"<h3>{e(skill)}</h3>"
        parts += (
            f'<details><summary>{i + 1}. {e(q["name"])}{f" · {e(q["time"])}" if q.get("time") else ""}</summary>'
            f'<p>{e(q.get("what", ""))}</p><p><b>So gehst du vor</b></p><ol>{"".join(f"<li>{e(t)}</li>" for t in q.get("steps", []))}</ol>'
            f'<p><b>Achtung, Falle!</b></p><ul>{"".join(f"<li>{e(t)}</li>" for t in q.get("traps", []))}</ul>'
            + (f'<p class="box"><b>Tipp:</b> {e(q["tip"])}</p>' if q.get("tip") else "")
            + "</details>"
        )
    rede = "".join(
        f'<div class="box"><b>{e(g["h"])}</b><ul class="list">{"".join(f"<li>{e(r)}</li>" for r in g["list"])}</ul></div>'
        for g in P.get("redemittel", [])
    )
    fehler = "".join(
        f'<div class="box"><p class="bad">✗ {e(f)}</p><p class="good">✓ {e(r)}</p><p class="muted">{e(w)}</p></div>'
        for f, r, w in P.get("fehler", [])
    )
    plan = "".join(
        f'<h3>{e(w["w"])}</h3><ul class="list">{"".join(f"<li>{e(t)}</li>" for t in w["tasks"])}</ul>'
        for w in P.get("plan", [])
    )
    faq = FAQ.get(pid, [])
    faq_html = (
        "<h2>Häufige Fragen</h2>"
        + "".join(f"<h3>{e(q)}</h3><p>{e(a)}</p>" for q, a in faq)
        + f'<p class="small">{e(B2_SRC)}</p>'
        if faq
        else ""
    )
    others = " · ".join(f'<a href="/vorbereitung/{o}/">{e(PREP[o].get("short") or o)}</a>' for o in PREP if o != pid)
    lv = x.get("level", "")
    extra30 = (
        f' <a class="btn ghost" href="/b2-30-tage/#{"telc" if pid.startswith("telc") else "dtb"}">B2 in 30 Tagen</a>'
        if pid.endswith("b2")
        else ""
    )
    body = f"""<h1>Gezielte Vorbereitung: {e(x["title"])}</h1>
<p><span class="tag">Niveau {e(lv)}</span><span class="tag">Aufbau und Zeiten</span><span class="tag">Strategien</span><span class="tag">Kostenlos</span></p>
<p class="lead">{e(P.get("lead", ""))}</p>
<p><a class="btn" href="/#vorbereitung/{pid}">▶ Mit Mini-Übungen in der App öffnen</a> <a class="btn ghost" href="/simulation/{pid}/">Probeprüfung {e(short)}</a>{extra30}</p>
<h2>Das Wichtigste in Kürze</h2><table>{facts}</table>
<h2>Aufbau der Prüfung</h2><table><thead><tr><th>Teil</th><th>Zeit</th><th>Aufgaben</th></tr></thead><tbody>{aufbau}</tbody></table>
<h2>Jeder Prüfungsteil: Strategie und Fallen</h2>{parts}
<h2>Redemittel</h2>{rede}
<h2>Typische Fehler – und wie es richtig ist</h2>{fehler}
<h2>Lernplan: 4 Wochen</h2>{plan}
{faq_html}
<p><a class="btn" href="/simulation/{pid}/">⏱ Probeprüfung {e(short)} mit Uhr</a> <a class="btn ghost" href="/pruefungsinfo/{pid}/">Prüfungsinfos: Anmeldung und Kosten</a></p>
<p class="muted">Eigene Übungsaufgaben und Tipps – kein offizielles Material von telc. Unabhängiges Lernangebot.</p>
<p>Weitere Vorbereitung: {others}{f' · <a href="/niveau/{lv.lower()}/">Alles für {e(lv)}</a>' if lv in ("B1", "B2") else ""}</p>"""
    desc = f"{x['title']}: Aufbau, Zeiten und Punkte, Strategien und Fallen für jeden Teil, Redemittel, typische Fehler und 4-Wochen-Lernplan – kostenlos."
    ld = [learning_resource(path, PREP_TITLE.get(pid, x["title"]), seo_desc(desc), lv, "Exam preparation")]
    if faq:
        ld.append(
            {
                "@context": "https://schema.org",
                "@type": "FAQPage",
                "mainEntity": [
                    {"@type": "Question", "name": q, "acceptedAnswer": {"@type": "Answer", "text": a}}
                    for q, a in faq
                ],
            }
        )
    urls.append(
        page(
            path, PREP_TITLE.get(pid, f"{short} Vorbereitung"), desc, body,
            [("Vorbereitung", "vorbereitung"), (short, path)],
            "pruefung", ld,
        )
    )

# ---------------- B2 speaking tasks /ueben/sprechen/b2/ (DM.extraScenes.B2 + practiceScenes.B2) ----------------
SP = D.get("speakB2") or {}
SCENES = (SP.get("practice") or []) + (SP.get("extra") or [])
if SCENES:
    def grp(t):
        m = re.match(r"(telc B2|DTB B2) · Teil (\w+)", t)
        return f"{m.group(1)} · Teil {m.group(2)[0]}" if m else "Beruf und Alltag"

    order = []
    for s in SCENES:
        g = grp(s["title"])
        if g not in order:
            order.append(g)
    GNAME = {
        "telc B2 · Teil 1": "telc Deutsch B2 mündlich, Teil 1: Über Erfahrungen sprechen",
        "telc B2 · Teil 2": "telc Deutsch B2 mündlich, Teil 2: Diskussion",
        "telc B2 · Teil 3": "telc Deutsch B2 mündlich, Teil 3: Gemeinsam etwas planen",
        "DTB B2 · Teil 1": "DTB B2 Sprechen, Teil 1: Über ein Thema sprechen (1A–1C)",
        "DTB B2 · Teil 2": "DTB B2 Sprechen, Teil 2: Mit Kolleginnen und Kollegen sprechen",
        "DTB B2 · Teil 3": "DTB B2 Sprechen, Teil 3: Lösungswege diskutieren",
        "Beruf und Alltag": "Sprechen im Beruf und im Alltag",
    }
    toc, out = [], ""
    for gi, g in enumerate(sorted(order, key=lambda g: (g == "Beruf und Alltag", g))):
        toc.append(f'<li><a href="#g{gi}">{e(GNAME.get(g, g))}</a></li>')
        out += f'<h2 id="g{gi}">{e(GNAME.get(g, g))}</h2>'
        for s in [s for s in SCENES if grp(s["title"]) == g]:
            out += (
                f'<div class="box"><h3>{e(re.sub(r"^(telc B2|DTB B2) · Teil \w+: ", "", s["title"]))}</h3><p>{e(s["task"])}</p>'
                + (f'<p><b>Denk an:</b></p><ul class="list">{"".join(f"<li>{e(t)}</li>" for t in s.get("prompts", []))}</ul>' if s.get("prompts") else "")
                + (f'<p><b>Satzanfänge:</b> {" · ".join(e(t) for t in s.get("starters", []))}</p>' if s.get("starters") else "")
                + f'<details><summary>Musterantwort zeigen</summary><p class="txt">{e(s.get("model", ""))}</p></details>'
                + (f'<p class="muted"><b>Rückfrage:</b> {e(s["reply"])}</p>' if s.get("reply") else "")
                + "</div>"
            )
    body = f"""<h1>Sprechen B2: Prüfungsaufgaben mit Musterantwort</h1>
<p><span class="tag">Niveau B2</span><span class="tag">{len(SCENES)} Aufgaben</span><span class="tag">telc B2 und DTB B2</span><span class="tag">Kostenlos</span></p>
<p class="lead">Beispiele für die mündliche Prüfung telc Deutsch B2 und das Sprechen im DTB B2: Zu jeder Aufgabe gibt es Leitfragen, Satzanfänge und eine Musterantwort. Lies die Aufgabe, sprich zuerst selbst laut und vergleiche dann mit dem Beispiel.</p>
<p><a class="btn" href="/#ueben/sprechen/B2">▶ In der App üben</a> <a class="btn ghost" href="/vorbereitung/telc-b2/">Strategien telc B2</a> <a class="btn ghost" href="/vorbereitung/dtb-b2/">Strategien DTB B2</a></p>
<ul class="list">{"".join(toc)}</ul>
{out}
<p class="muted">Alle Aufgaben sind eigene Übungen „im Stil der Prüfung“, keine offiziellen Prüfungsaufgaben. Die Musterantworten sind Beispiele – andere passende Antworten sind auch richtig.</p>
<p><a href="/niveau/b2/">Alles für B2</a> · <a href="/b2-woerter/">B2-Wörter nach Prüfungsthemen</a> · <a href="/material/b2/">B2-Arbeitsblätter (PDF)</a></p>"""
    urls.append(
        page(
            "ueben/sprechen/b2",
            "telc B2 mündliche Prüfung und DTB B2 Sprechen: Beispiele",
            f"{len(SCENES)} Sprechaufgaben B2 mit Musterantwort: Beispiele für die mündliche Prüfung telc Deutsch B2 (Teil 1–3) und DTB B2 Sprechen – kostenlos.",
            body,
            [("Üben", "ueben"), ("Sprechen B2", "ueben/sprechen/b2")],
            "start",
            learning_resource("ueben/sprechen/b2", "Sprechaufgaben B2 mit Musterantwort", f"{len(SCENES)} Sprechaufgaben für telc Deutsch B2 und DTB B2 mit Musterantwort.", "B2", "Speaking exercise"),
        )
    )
if missing_pdf:
    print("WARNUNG – PDF fehlt, nicht verlinkt:", ", ".join(sorted(set(missing_pdf))))

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
