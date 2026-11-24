#!/usr/bin/env python3
"""Answer-first landing pages for AI search (AEO/GEO): /antworten/ + /antworten/<slug>/.

Content:  tools/answers/answers.json  (question, direct answer, facts table, practice links, FAQ)
Facts:    pruefung-fakten.js (window.DMFakten), tools/pruefung-statistik.json, site_facts in answers.json
Run:      python3 -X utf8 tools/make-answer-pages.py      (seiten.yml runs it before make-share-pages.py,
                                                          whose last step writes the sitemap)

Safety net against invented numbers: every number in a page text (answer, table, FAQ, links, title,
description) must appear in one of the facts the page references. Otherwise the script stops with an error.
Output is stable: dateModified/Stand = newest of answers.json "stand" and the dates of the referenced facts."""
import datetime
import html
import json
import os
import re
import subprocess
import sys

R = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SITE = "https://deutsch-mit-dennis.de"
BASE = "antworten"
e = html.escape
PERSON = {
    "@type": "Person",
    "@id": SITE + "/#dennis",
    "name": "Dennis Prudnikau",
    "url": SITE + "/ueber-mich/",
    "jobTitle": "DaZ-Lehrer und Prüfer (DTZ, telc)",
}
ORG = {"@type": "EducationalOrganization", "@id": SITE + "/#org", "name": "Deutsch mit Dennis", "url": SITE + "/"}
BYLINE = "Dennis Prudnikau, DaZ-Lehrer und lizenzierter Prüfer für DTZ und telc"
ENTITY = "Deutsch mit Dennis – die kostenlose Lernwebsite von Dennis Prudnikau"
INDEPENDENT = "Unabhängiges Lernangebot, kein Angebot von g.a.s.t., telc oder BAMF."
LEGAL = "Keine Rechtsberatung. Ob dein Zertifikat reicht, entscheidet immer die Behörde."
STYLE_NOTE = "Die Probeprüfungen auf Deutsch mit Dennis sind eigene Übungsaufgaben im Stil der Prüfung – keine offiziellen Aufgaben von telc, g.a.s.t. oder BAMF."

# ---------------- data ----------------
NODE = r"""
const fs=require('fs'),vm=require('vm');
const c={console:{log(){},warn(){},error(){}}};c.window=c;c.DM={esc:s=>String(s)};
vm.createContext(c);
for(const f of ['pruefung-fakten.js','lid-katalog.js'])vm.runInContext(fs.readFileSync(f,'utf8'),c,{filename:f});
const F=c.DMFakten;
process.stdout.write(JSON.stringify({stand:F.STAND,data:F.data,sources:F.sources,
  lidQuelle:c.LID_QUELLE_HTML||'',lidStand:c.LID_KATALOG_STAND||''}));
"""
D = json.loads(subprocess.run(["node", "-e", NODE], cwd=R, capture_output=True, text=True, encoding="utf-8", check=True).stdout)
FX, SRC = D["data"], D["sources"]
STATS = json.load(open(os.path.join(R, "tools", "pruefung-statistik.json"), encoding="utf-8"))
A = json.load(open(os.path.join(R, "tools", "answers", "answers.json"), encoding="utf-8"))

# same look as the other generated pages: CSS is read (not imported) from make-seo-pages.py / make-learn-pages.py
def _css():
    css = ""
    try:
        css = re.search(r'CSS = """(.*?)"""', open(os.path.join(R, "tools", "make-seo-pages.py"), encoding="utf-8").read(), re.S).group(1)
        m = re.search(r'CSS \+= """(.*?)"""', open(os.path.join(R, "tools", "make-learn-pages.py"), encoding="utf-8").read(), re.S)
        css += m.group(1) if m else ""
    except (OSError, AttributeError):
        css = ":root{--ink:#172036;--blue:#2341B5;--muted:#4a5573;--line:#dfe4f0;--paper:#fbfbf8}body{margin:0;background:var(--paper);color:var(--ink);font:17px/1.6 system-ui,sans-serif}header,main,footer{max-width:760px;margin:0 auto;padding:0 16px}"
    return css + """
.answer{background:#fff;border:2px solid var(--blue);border-radius:12px;padding:14px 16px;margin:12px 0;font-size:1.08rem}.answer p{margin:0}
.byline{color:var(--muted);font-size:.92rem;margin:4px 0 12px}table.facts{background:#fff;border:1px solid var(--line);border-radius:12px;display:table}
table.facts caption{text-align:left;font-weight:700;padding:0 0 6px}table.facts .src{display:block;color:var(--muted);font-size:.82rem;margin-top:4px}
.grid a{overflow-wrap:anywhere}ol.steps li{margin:6px 0}
.pills{display:flex;flex-wrap:wrap;gap:8px}.pills a{display:inline-flex;align-items:center;min-height:44px;padding:0 14px;border:1px solid var(--line);border-radius:99px;background:#fff;text-decoration:none}"""
CSS = _css()

def count_dirs(base, pat):
    p = os.path.join(R, base)
    return len([d for d in os.listdir(p) if re.fullmatch(pat, d) and os.path.isfile(os.path.join(p, d, "index.html"))]) if os.path.isdir(p) else 0

SIM_IDS = ["dtz", "lid", "telc-b1", "telc-b2", "dtb-b1", "dtb-b2"]
COUNTS = {f"sims:{i}": count_dirs("simulation", re.escape(i) + r"(-\d+)?") for i in SIM_IDS}
COUNTS["n:sims"] = sum(COUNTS[f"sims:{i}"] for i in SIM_IDS)
COUNTS["n:grammar"] = count_dirs("grammatik", r"[a-c]\d-.+")
COUNTS["n:lessons"] = count_dirs("lektion", r"[a-z0-9-]+")
_dv = json.loads(subprocess.run(["node", "-e", "global.window=global;require('./verben-data.js');require('./diktat-data.js');process.stdout.write(JSON.stringify([DM.verben.length,Object.values(DM.diktat).reduce((n,l)=>n+l.length,0)]))"], cwd=R, capture_output=True, text=True, check=True).stdout)
COUNTS["n:verbs"], COUNTS["n:diktat"] = _dv  # numbers of verbs and dictation sentences, always from the data

def fill(s):
    return re.sub(r"\{((?:sims|n):[a-z0-9-]+)\}", lambda m: str(COUNTS[m.group(1)]), s)

def iso(de):  # "11.11.2026" -> "2026-11-11"
    d, m, y = de.split(".")
    return f"{y}-{m}-{d}"

def de(iso_):
    y, m, d = iso_.split("-")
    return f"{d}.{m}.{y}"

def page_text(path):
    f = os.path.join(R, path.strip("/"), "index.html")
    s = open(f, encoding="utf-8").read()
    s = re.sub(r"<script.*?</script>|<style.*?</style>", " ", s, flags=re.S)
    return html.unescape(re.sub(r"<[^>]+>", " ", s))

# ref -> {text, src: [(name, url)], stand: iso}
def resolve(ref):
    if ref.startswith("stat:"):
        p = STATS["seiten"][ref[5:]]
        q = STATS["quellen"][p["quelle"]]
        return {"text": " ".join(p["fakten"]), "src": [(q["name"] + ", " + p["fundstelle"], q["url"])], "stand": "2026-11-20"}
    if ref.startswith("site:"):
        sf = A["site_facts"][ref[5:]]
        text = fill(sf["text"])
        missing = nums(text) - {str(v) for v in COUNTS.values()} - nums(page_text(sf["page"]))
        if missing:  # a site fact must be backed by the local page it points to
            ERR.append(f"site fact {ref}: number(s) {sorted(missing)} not on {sf['page']}")
        return {"text": text, "src": [(sf["name"], sf["page"])], "stand": A["stand"]}
    exam, kind, *rest = ref.split(".")
    x = FX[exam]
    if kind == "parts":
        part = x["parts"][int(rest[0])]
        return {"text": " ".join(part), "src": [tuple(SRC[k]) for k in x["partsSrc"]], "stand": iso(D["stand"])}
    b = x["blocks"][int(rest[0])]
    text = b["h"] + " " + (b["list"][int(rest[1])] if len(rest) > 1 else " ".join(b["list"]))
    return {"text": text, "src": [tuple(SRC[k]) for k in b["src"]], "stand": iso(b.get("stand") or D["stand"])}

NUM = re.compile(r"(?<![\w.,])\d+(?:[.,]\d+)*")
def nums(s):
    return {n.replace(" ", "") for n in NUM.findall(s)}

ERR = []
def check(where, text, refs):
    allowed = {str(v) for v in COUNTS.values()}
    for r in refs:
        allowed |= nums(resolve(r)["text"])
    bad = nums(text) - allowed
    if bad:
        ERR.append(f"{where}: number(s) {sorted(bad)} not found in refs {refs}")

def src_line(refs, label="Quelle"):
    seen, items, stands = set(), [], []
    for r in refs:
        x = resolve(r)
        stands.append(x["stand"])
        for n, u in x["src"]:
            if u in seen:
                continue
            seen.add(u)
            ext = u.startswith("http")
            rel = ' rel="noopener nofollow"' if ext else ""
            items.append(f'<a href="{e(u)}"{rel}>{e(n)}</a>')
    return f'{label}: {" · ".join(items)} · geprüft: {e(de(max(stands)))}', max(stands)

# ---------------- page shell ----------------
def write(path, title, desc, body, crumbs, og, ld):
    url = f"{SITE}/{path}/"
    assert len(title) < 60, f"title too long ({len(title)}): {title}"
    assert len(desc) < 155, f"description too long ({len(desc)}): {desc}"
    bl = [{"@type": "ListItem", "position": i + 1, "name": n, "item": f"{SITE}/{p}" + ("/" if p else "")}
          for i, (n, p) in enumerate([("Start", "")] + crumbs)]
    blocks = [{"@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": bl}] + ld
    ldh = "\n".join('<script type="application/ld+json">' + json.dumps(b, ensure_ascii=False) + "</script>" for b in blocks)
    nav = " › ".join(['<a href="/">Start</a>'] + [f'<a href="/{p}/">{e(n)}</a>' for n, p in crumbs[:-1]] + [e(crumbs[-1][0])])
    doc = f"""<!DOCTYPE html>
<!-- generated by tools/make-answer-pages.py from tools/answers/answers.json – do not edit -->
<html lang="de"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>{e(title)}</title>
<meta name="description" content="{e(desc)}">
<link rel="canonical" href="{url}">
<meta property="og:type" content="article"><meta property="og:site_name" content="Deutsch mit Dennis"><meta property="og:locale" content="de_DE">
<meta property="og:title" content="{e(title)}"><meta property="og:description" content="{e(desc)}"><meta property="og:url" content="{url}">
<meta property="og:image" content="{SITE}/assets/og/{og}.jpg"><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="/favicon.svg">
{ldh}
<style>{CSS}</style>
</head><body>
<header><a class="brand" href="/">Deutsch <i>mit Dennis</i></a><a href="/#start">Zur Lern-App →</a></header>
<main><nav class="crumbs" aria-label="Brotkrumen">{nav}</nav>
{body}
</main>
<footer><a href="/">Startseite</a><a href="/kurs/">Kurse A0–B2</a><a href="/pruefung/">Prüfung</a><a href="/simulation/">Probeprüfungen</a><a href="/{BASE}/">Antworten</a><a href="/impressum/">Impressum</a><a href="/datenschutz/">Datenschutz</a><br>{e(ENTITY)}, DaZ-Lehrer und lizenzierter Prüfer für DTZ und telc. Kostenlos, ohne Anmeldung.</footer>
</body></html>
"""
    f = os.path.join(R, path, "index.html")
    os.makedirs(os.path.dirname(f), exist_ok=True)
    open(f, "w", encoding="utf-8", newline="\n").write(doc)
    return url

def is_ext(h):
    return h.startswith("http")

def build(p):
    slug = p["slug"]
    path = f"{BASE}/{slug}"
    url = f"{SITE}/{path}/"
    answer, title, desc, h1 = fill(p["answer"]), fill(p["title"]), fill(p["desc"]), fill(p["h1"])
    refs_all = list(p["refs"])
    for k in ("facts", "faq"):
        for it in p.get(k, []):
            refs_all += it["ref"]
    check(f"{slug} answer", answer, p["refs"])
    check(f"{slug} title/desc/h1", " ".join([title, desc, h1]), refs_all)
    stands = [A["stand"]]

    rows, facts_txt = [], []
    for it in p["facts"]:
        v = fill(it["v"])
        check(f"{slug} fact '{it['k']}'", v, it["ref"])
        line, st = src_line(it["ref"])
        stands.append(st)
        rows.append(f'<tr><th scope="row">{e(it["k"])}</th><td>{e(v)}<span class="src">{line}</span></td></tr>')
        names = []
        for r in it["ref"]:
            for n, u in resolve(r)["src"]:
                n = n if u.startswith("http") else "deutsch-mit-dennis.de" + u
                if n not in names:
                    names.append(n)
        facts_txt.append(f'{it["k"]}: {v} (Quelle: {"; ".join(names)})')
    for k in p.get("official", []):
        n, u = SRC[k]
        rows.append(f'<tr><th scope="row">Offizielles Übungsmaterial</th><td><a href="{e(u)}" rel="noopener nofollow">{e(n)}</a><span class="src">Quelle: Prüfungsanbieter · geprüft: {e(D["stand"])}</span></td></tr>')
    if slug.startswith("dtz-pruefung"):
        n, u = SRC["gastUeb"]
        rows.append(f'<tr><th scope="row">Offizielles Übungsmaterial</th><td><a href="{e(u)}" rel="noopener nofollow">{e(n)}</a><span class="src">Quelle: g.a.s.t. · geprüft: {e(D["stand"])}</span></td></tr>')

    faqs = []
    for i, it in enumerate(p["faq"]):
        q, a = fill(it["q"]), fill(it["a"])
        check(f"{slug} faq {i + 1}", q + " " + a, it["ref"])
        stands.append(src_line(it["ref"])[1])
        faqs.append((q, a))

    stand_iso = max(stands)
    stand = de(stand_iso)

    prac = []
    for it in p["practice"]:
        check(f"{slug} link {it['href']}", it["t"] + " " + it["d"], refs_all)
        prac.append(f'<li><a href="{e(it["href"])}"><b>{e(it["t"])}</b><span class="d">{e(it["d"])}</span></a></li>')
    if p.get("letters"):
        letters = [b for b in json.load(open(os.path.join(R, "tools", "dtz-schreiben", "briefe.json"), encoding="utf-8"))["briefe"]
                   if not b.get("draft") and os.path.isfile(os.path.join(R, "dtz-schreiben", b["slug"], "index.html"))]
        label = {"beschwerde": "Beschwerde", "termin-absagen": "Termin absagen", "bitte-um-information": "Bitte um Information"}
        prac[1:1] = [f'<li><a href="/dtz-schreiben/{e(b["slug"])}/"><b>Musterbrief: {e(label.get(b["slug"], b["title"]))}</b>'
                     f'<span class="d">Brief mit Aufgabe, Muster und Erklärung (B1)</span></a></li>' for b in letters]
    states = ""
    if p.get("states"):
        lands = sorted(d for d in os.listdir(os.path.join(R, "lid")) if d.startswith("fragen-") and not re.match(r"fragen-\d", d))
        name = lambda d: (d[7:].replace("ae", "ä").replace("ue", "ü").replace("oe", "ö").replace("-", " ").title().replace(" ", "-") if d != "fragen-nrw" else "Nordrhein-Westfalen")
        fix = {"Mecklenburg-Vorpommern": "Mecklenburg-Vorpommern", "Baden-Württemberg": "Baden-Württemberg", "Thüringen": "Thüringen"}
        states = '<h3>Fragen für dein Bundesland</h3><p class="pills">' + "".join(f'<a href="/lid/{d}/">{e(fix.get(name(d), name(d)))}</a>' for d in lands) + "</p>"

    steps = ""
    if p.get("steps"):
        s = p["steps"]
        check(f"{slug} steps", " ".join(s["list"]), [s["ref"]])
        line, _ = src_line([s["ref"]], "Aus")
        steps = f'<h2>{e(s["h"])}</h2><ol class="steps">' + "".join(f"<li>{e(x)}</li>" for x in s["list"]) + f'</ol><p class="small">{line}</p>'

    notes = []
    if p.get("lid"):
        notes.append(D["lidQuelle"])
        notes.append('<p class="small">Erklärungen („Warum?“): Deutsch mit Dennis – nicht vom BAMF.</p>')
    if any("/simulation/" in it["href"] for it in p["practice"]) and not p.get("lid"):
        notes.append(f'<p class="small">{e(STYLE_NOTE)}</p>')
    if p.get("legal"):
        notes.append(f'<p class="small"><b>Wichtig:</b> {e(LEGAL)}</p>')

    body = f"""<h1>{e(h1)}</h1>
<p class="byline">Von <a href="/ueber-mich/">{e(BYLINE)}</a> · Stand: {e(stand)}</p>
<section class="answer" aria-label="Kurze Antwort"><p>{e(answer)}</p></section>
<h2>Die wichtigsten Fakten</h2>
<table class="facts"><caption>Stand: {e(stand)} · Zahlen nur aus den genannten Quellen</caption>{"".join(rows)}</table>
{'<p class="small"><b>Wichtig:</b> ' + e(LEGAL) + '</p>' if p.get("legal") else ''}
{steps}
<h2>So übst du hier</h2>
<ul class="grid">{"".join(prac)}</ul>
{states}
<h2>Häufige Fragen</h2>
{"".join(f"<h3>{e(q)}</h3><p>{e(a)}</p>" for q, a in faqs)}
{"".join(n for n in notes if not (p.get("legal") and "Rechtsberatung" in n))}
<p class="muted">{e(ENTITY)}. Alle Angaben ohne Gewähr. {e(INDEPENDENT)}</p>
<p>Mehr Antworten: <a href="/{BASE}/">alle Fragen im Überblick</a> · <a href="/pruefungsinfo/">Prüfungsinfos mit Quellen</a></p>"""

    ld = [
        {"@context": "https://schema.org", "@type": "WebPage", "@id": url, "url": url, "name": h1, "description": desc,
         "inLanguage": "de", "isPartOf": {"@id": SITE + "/#website"}, "publisher": ORG, "author": PERSON,
         "dateModified": stand_iso, "isAccessibleForFree": True},
        {"@context": "https://schema.org", "@type": "FAQPage", "url": url, "inLanguage": "de",
         "mainEntity": [{"@type": "Question", "name": q, "acceptedAnswer": {"@type": "Answer", "text": a}} for q, a in faqs],
         "author": PERSON, "dateModified": stand_iso},
    ]
    write(path, title, desc, body, [("Antworten", BASE), (p["crumb"], path)], p.get("og", "start"), ld)
    return {"slug": slug, "url": url, "title": title, "h1": h1, "answer": answer, "stand": stand, "facts": facts_txt, "crumb": p["crumb"]}

def hub(done):
    stand_iso = max(iso(d["stand"]) for d in done)
    items = "".join(f'<li><a href="/{BASE}/{d["slug"]}/"><b>{e(d["h1"])}</b><span class="d">{e(d["answer"][:150].rsplit(" ", 1)[0])} …</span></a></li>' for d in done)
    body = f"""<h1>Antworten auf häufige Fragen zu Deutsch und Deutschprüfungen</h1>
<p class="byline">Von <a href="/ueber-mich/">{e(BYLINE)}</a> · Stand: {e(de(stand_iso))}</p>
<p class="lead">Kurze, klare Antworten zu DTZ, telc, DTB, „Leben in Deutschland“ und Einbürgerung – jede Zahl mit Quelle und Datum. Dazu direkte Links zu den kostenlosen Übungen.</p>
<ul class="grid">{items}</ul>
<p class="muted">{e(ENTITY)}. Alle Angaben ohne Gewähr. {e(INDEPENDENT)} {e(LEGAL)}</p>"""
    url = f"{SITE}/{BASE}/"
    ld = [{"@context": "https://schema.org", "@type": "ItemList", "name": "Antworten auf häufige Fragen", "url": url,
           "itemListElement": [{"@type": "ListItem", "position": i + 1, "url": d["url"], "name": d["h1"]} for i, d in enumerate(done)],
           "author": PERSON, "dateModified": stand_iso}]
    write(BASE, "Antworten: DTZ, telc, DTB, LiD und Einbürgerung", "Kurze Antworten mit Quellen: DTZ, telc B1/B2, DTB, Leben in Deutschland, Einbürgerung und kostenlos Deutsch lernen – von einem lizenzierten Prüfer.",
          body, [("Antworten", BASE)], "pruefung", ld)

done = [build(p) for p in A["pages"]]
if ERR:
    sys.exit("make-answer-pages: unsourced numbers – fix answers.json:\n  " + "\n  ".join(ERR))
hub(done)

# llms.txt: the block between the markers is rewritten on every run (rest of the file stays as it is)
LLMS = os.path.join(R, "llms.txt")
START, END = "<!-- antworten:start (tools/make-answer-pages.py) -->", "<!-- antworten:end -->"
lines = [START, "## Antworten auf häufige Fragen (mit Quellen)",
         f"Kurze Antworten von {BYLINE}. Übersicht: {SITE}/{BASE}/", ""]
for d in done:
    lines.append(f"- [{d['h1']}]({d['url']}): {d['answer']}")
lines += ["", "### Wichtige Fakten nach Thema (jede Zahl aus der genannten Quelle)"]
for d in done:
    lines += ["", f"#### {d['crumb']} – Stand: {d['stand']} – {d['url']}"] + [f"- {f}" for f in d["facts"]]
lines += ["", "Hinweis: " + INDEPENDENT + " " + LEGAL + " Probeprüfungen sind eigene Aufgaben im Stil der Prüfung; Fragen zu „Leben in Deutschland“ stammen aus dem öffentlichen BAMF-Gesamtfragenkatalog, die Erklärungen sind nicht vom BAMF.", END]
NL = chr(10)
block = NL.join(lines)
txt = open(LLMS, encoding="utf-8").read()
if START in txt and END in txt:
    txt = txt[: txt.index(START)] + block + txt[txt.index(END) + len(END):]
else:
    anchor = "## Über mich"
    txt = txt.replace(anchor, block + NL * 2 + anchor, 1) if anchor in txt else txt.rstrip() + NL * 2 + block + NL
open(LLMS, "w", encoding="utf-8", newline=NL).write(txt)
for d in done:
    print(f"/{BASE}/{d['slug']}/  ·  {d['title']}  ·  Stand {d['stand']}")
print(f"/{BASE}/  ·  hub  ·  {len(done)} pages")
