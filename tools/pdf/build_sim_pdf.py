# Printable PDFs of the written exam part of every simulation (#simulation/<id>).
# Source: sim/<id>.js (format: tools/sim/SCHEMA.md) and lid-katalog.js.
# Output: material/simulation/<id>-schriftlich.pdf (+ lid-test-1.pdf, lid-test-2.pdf)
# Run from the repo root:  python3 tools/pdf/build_sim_pdf.py [id ...]
# Re-run after every change to sim/*.js or lid-katalog.js.
import io, json, os, random, re, subprocess, sys
from xml.sax.saxutils import escape
from PIL import Image as PILImage
from reportlab.graphics.barcode import qr
from reportlab.graphics.shapes import Drawing
from reportlab.platypus import Image, CondPageBreak

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import arbeitsblatt_lib as L
from arbeitsblatt_lib import (
    R,
    st,
    box,
    table,
    Spacer,
    PageBreak,
    KeepTogether,
    NOTE,
    SOFT,
    GRUEN,
    ROT,
    mm,
    BaseDocTemplate,
    PageTemplate,
    Frame,
    Table,
    TableStyle,
    ParagraphStyle,
    Paragraph,
    A4,
    PdfReader,
    PdfWriter,
    _overlay,
    _page,
    LINE,
    INK,
    MUTED,
    TINTE,
)

REPO = L.REPO
OUT = os.path.join(REPO, "material", "simulation")
BASE = "https://deutsch-mit-dennis.de/#simulation/"
IDS = ["dtz", "telc-b1", "dtb-b1", "telc-b2", "dtb-b2"]
W = 174 * mm

st["q"] = ParagraphStyle(
    "q",
    fontName="Atk-B",
    fontSize=11,
    leading=15,
    textColor=INK,
    spaceBefore=5,
    spaceAfter=2,
    leftIndent=24,
    firstLineIndent=-24,
)
st["opt"] = ParagraphStyle(
    "opt",
    fontName="Atk",
    fontSize=10.5,
    leading=14,
    textColor=INK,
    leftIndent=40,
    firstLineIndent=-16,
    spaceAfter=1,
)
st["mat"] = ParagraphStyle(
    "mat", fontName="Atk", fontSize=10.5, leading=14.5, textColor=INK, spaceAfter=4
)
st["math"] = ParagraphStyle(
    "math", fontName="Atk-B", fontSize=10.5, leading=14, textColor=TINTE, spaceAfter=2
)
st["sec"] = ParagraphStyle(
    "sec", fontName="Atk-B", fontSize=18, leading=22, textColor=INK, spaceAfter=4
)
st["tr"] = ParagraphStyle(
    "tr",
    fontName="Atk",
    fontSize=10,
    leading=13.5,
    textColor=INK,
    leftIndent=28,
    firstLineIndent=-28,
    spaceAfter=1,
)

esc = lambda s: L.fallback(escape(str(s or "")))
BOX = L.sym("☐")
SPK = {"n": "Ansage", "f": "Frau", "m": "Mann", "f2": "Frau 2", "m2": "Mann 2"}


MARKS = {}
LID_SETS = {}


def load_marks(id):
    MARKS.clear()
    f = os.path.join(OUT, f"{id}-hoeren.json")
    if os.path.exists(f):
        for m in json.load(open(f))["marks"]:
            MARKS[(m["part"], m["clip"])] = m["start"]


def clip_head(p, ai, a, extra=""):
    plays = p.get("plays", 1)
    t = MARKS.get((p["title"], ai))
    mp3 = f' <font color="#566078">· MP3 ab {t // 60}:{t % 60:02d}</font>' if t is not None else ""
    name = a.get("h") or f"Hörtext {ai + 1}"
    return box(
        [R(f"{L.sym('♪')} {esc(name)} – Sie hören den Text {'zweimal' if plays == 2 else 'einmal'}.{extra}{mp3}", "math")],
        bg=NOTE,
        border=TINTE,
    )


def load(id):
    if id == "lid":
        js = "global.window={};require('./lid-katalog.js');process.stdout.write(JSON.stringify({K:window.LID_KATALOG,h:window.LID_HINWEIS_TEXT}))"
    else:
        js = f"global.window={{}};require('./sim/{id}.js');process.stdout.write(JSON.stringify(window.SIM['{id}']))"
    return json.loads(subprocess.check_output(["node", "-e", js], cwd=REPO))


def paras(text, style="mat", gap=None):
    out = []
    for t in re.split(r"\n+", str(text or "")):
        t = t.strip()
        if not t:
            continue
        h = esc(t)
        if gap:
            h = re.sub(
                r"\{(\d+)\}", lambda m: f"<b>({gap(int(m.group(1)))})</b> ________", h
            )
        out.append(R(h, style))
    return out


def qrcode(url, size=26 * mm):
    w = qr.QrCodeWidget(url)
    b = w.getBounds()
    d = Drawing(
        size, size, transform=[size / (b[2] - b[0]), 0, 0, size / (b[3] - b[1]), 0, 0]
    )
    d.add(w)
    return d


def write_lines(n):
    t = Table([[""] for _ in range(n)], colWidths=[W], rowHeights=[8 * mm] * n)
    t.setStyle(TableStyle([("LINEBELOW", (0, 0), (-1, -1), 0.5, LINE)]))
    return t


def letter(o, i):
    return "" if re.match(r"^[a-z]\)", o, re.I) else f"{'abcdefghijklmno'[i]}) "


# ---------------------------------------------------------------- tasks
def item_flow(p, it, n, has_gaps):
    opts = it.get("opts") or p.get("opts") or []
    shared = not it.get("opts") and len(p.get("opts") or []) > 4
    q = it.get("q") or (f"Lücke {n}" if has_gaps else "")
    fl = []
    if shared:
        fl.append(
            R(f"<b>{n}</b>&nbsp;&nbsp;{esc(q)}&nbsp;&nbsp;&nbsp;Lösung: ______", "q")
        )
    else:
        fl.append(R(f"<b>{n}</b>&nbsp;&nbsp;&nbsp;{esc(q)}", "q"))
        if len(opts) == 2:
            fl.append(
                R(
                    "&nbsp;&nbsp;&nbsp;&nbsp;".join(f"{BOX} {esc(o)}" for o in opts),
                    "opt",
                )
            )
        else:
            fl += [
                R(f"{BOX} {letter(o, i)}{esc(o)}", "opt") for i, o in enumerate(opts)
            ]
    return KeepTogether(fl)


def opt_list(p):
    rows = "<br/>".join(esc(o) for o in p["opts"])
    return box([R("Auswahl", "math"), R(rows, "mat")], bg=NOTE)


def material(p):
    mats = p.get("material") or []
    if not mats:
        return []
    items = p.get("items") or []
    gap = lambda k: items[k - 1]["_n"] if 0 < k <= len(items) else k
    fl = []
    for m in mats:
        inner = ([R(esc(m["h"]), "math")] if m.get("h") else []) + paras(
            m.get("t"), gap=gap
        )
        fl += [box(inner, bg=SOFT), Spacer(1, 3)]
    return fl


def part_flow(p, sid):
    fl = [
        CondPageBreak(60 * mm),
        R(esc(p["title"]), "h2"),
        R(esc(p.get("instr", "")), "small"),
    ]
    items = p.get("items") or []
    has_gaps = any(
        re.search(r"\{\d+\}", m.get("t", "")) for m in p.get("material") or []
    )
    shared = (
        p.get("opts") and len(p["opts"]) > 4 and not any(it.get("opts") for it in items)
    )
    if shared:
        fl += [opt_list(p), Spacer(1, 4)]
    done = set()
    for ai, a in enumerate(p.get("audio") or []):
        fl.append(clip_head(p, ai, a))
        for it in items:
            if it.get("au") == ai:
                fl.append(item_flow(p, it, it["_n"], has_gaps))
                done.add(it["_n"])
        fl.append(Spacer(1, 4))
    fl += material(p)
    fl += [item_flow(p, it, it["_n"], has_gaps) for it in items if it["_n"] not in done]
    return fl


def write_flow(p):
    fl = [
        CondPageBreak(80 * mm),
        R(esc(p["title"]), "h2"),
        R(esc(p.get("instr", "")), "small"),
    ]
    fl += material(p)
    for ai, a in enumerate(p.get("audio") or []):
        fl.append(clip_head(p, ai, a, " Machen Sie Notizen."))
        fl.append(Spacer(1, 4))
    opts = p["options"]
    for i, o in enumerate(opts):
        inner = []
        if o.get("h") and len(opts) > 1:
            inner.append(R(esc(o["h"]), "math"))
        if o.get("situation"):
            inner += paras(o["situation"])
        inner += paras(o.get("task"))
        inner += [R(f"•&nbsp;&nbsp;{esc(x)}", "item") for x in o.get("points") or []]
        fl += [box(inner, bg=SOFT), Spacer(1, 4)]
    mw = p.get("minWords") or 0
    n = max(10, min(26, round(mw / 7) + 6)) if mw else 14
    head = "Ihr Text" + (
        f" (Aufgabe {' oder '.join('ABCD'[: len(opts)])} – bitte ankreuzen: "
        + "  ".join(f"{BOX} {'ABCD'[i]}" for i in range(len(opts)))
        + ")"
        if len(opts) > 1
        else ""
    )
    fl += [R(head + (f" · mindestens {mw} Wörter" if mw else ""), "h3"), write_lines(n)]
    return fl


# ---------------------------------------------------------------- answer sheet & solutions
def answer_sheet(ex, secs):
    fl = [
        PageBreak(),
        R("Antwortbogen", "h1"),
        R(
            "Tragen Sie hier Ihre Lösungen ein (Buchstabe, Richtig/Falsch, Nummer). So können Sie mit dem Lösungsschlüssel schnell vergleichen.",
            "lead",
        ),
    ]
    for s in secs:
        cells = []
        for p in s["parts"]:
            for it in p.get("items") or []:
                cells.append(it["_n"])
        if not cells:
            continue
        fl.append(R(f"{esc(s['title'])}", "h3"))
        cols = 8
        rows = [
            [f"{c}  ______" for c in cells[i : i + cols]]
            for i in range(0, len(cells), cols)
        ]
        rows[-1] += [""] * (cols - len(rows[-1]))
        t = Table(rows, colWidths=[W / cols] * cols, rowHeights=[9 * mm] * len(rows))
        t.setStyle(
            TableStyle(
                [
                    ("FONTNAME", (0, 0), (-1, -1), "Atk"),
                    ("FONTSIZE", (0, 0), (-1, -1), 10.5),
                    ("GRID", (0, 0), (-1, -1), 0.4, LINE),
                    ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
                ]
            )
        )
        fl += [t, Spacer(1, 4)]
    fl += [
        Spacer(1, 6),
        R(
            "Punkte selbst zählen: Richtige Antworten × Punkte pro Aufgabe (steht im Lösungsschlüssel).",
            "small",
        ),
    ]
    return fl


def answer_text(p, it):
    opts = it.get("opts") or p.get("opts") or []
    o = opts[it["a"]] if 0 <= it["a"] < len(opts) else "?"
    return (f"{letter(o, it['a'])}{o}").strip()


def solutions(ex, secs):
    fl = [
        PageBreak(),
        R("Lösungen mit Erklärung", "h1"),
        R("Erst nach dem Test lesen!", "lead"),
    ]
    for s in secs:
        fl.append(R(esc(s["title"]), "h2"))
        for p in s["parts"]:
            if p.get("kind") == "write":
                fl.append(
                    R(f"{esc(p['title'])} – Checkliste zur Selbstbewertung", "h3")
                )
                fl += [
                    R(f"{BOX}&nbsp;&nbsp;{esc(c)}", "item")
                    for c in p.get("check") or []
                ]
                for o in p["options"]:
                    if o.get("muster"):
                        fl.append(
                            KeepTogether(
                                [
                                    R(
                                        f"Mustertext{' – ' + esc(o['h']) if o.get('h') and len(p['options']) > 1 else ''}",
                                        "h3",
                                    )
                                ]
                                + [
                                    box(
                                        paras(o["muster"]), bg=L.HELLGRUEN, border=GRUEN
                                    )
                                ]
                            )
                        )
                continue
            items = p.get("items") or []
            if not items:
                continue
            rows = [["Nr.", "Lösung", "Erklärung"]] + [
                [f"<b>{it['_n']}</b>", esc(answer_text(p, it)), esc(it.get("why", ""))]
                for it in items
            ]
            fl += [
                R(
                    f'{esc(p["title"])} <font size="9" color="#566078">· {p.get("pts", 1)} Punkt{"e" if p.get("pts", 1) != 1 else ""} pro Aufgabe</font>',
                    "h3",
                ),
                table(rows, [12, 50, 112]),
                Spacer(1, 4),
            ]
    return fl


def transcripts(secs):
    clips = [(p, a) for s in secs for p in s["parts"] for a in p.get("audio") or []]
    if not clips:
        return []
    fl = [
        PageBreak(),
        R("Anhang: Hörtexte (Transkripte)", "h1"),
        R(
            "Für Lehrkräfte oder Lernpartner: Lesen Sie die Texte laut vor, wenn Sie ohne Internet üben. Lernende lesen die Transkripte erst nach dem Test.",
            "lead",
        ),
    ]
    for p, a in clips:
        lines = [
            R(
                f"<b>{esc(SPK.get(l.get('s'), l.get('s', '')))}:</b> {esc(l.get('t'))}",
                "tr",
            )
            for l in a.get("lines") or []
        ]
        fl.append(
            KeepTogether(
                [R(f"{esc(p['title'])} · {esc(a.get('h') or 'Hörtext')}", "h3")]
                + lines[:4]
            )
        )
        fl += lines[4:] + [Spacer(1, 3)]
    return fl


# ---------------------------------------------------------------- cover
def cover(ex, id, secs, total, has_audio, sub="Schriftliche Prüfung – Übungsheft zum Ausdrucken"):
    url = BASE + id
    rows = (
        [["Prüfungsteil", "Zeit (Empfehlung)"]]
        + [[esc(s["title"]), f"{s['minutes']} Min."] for s in secs]
        + [["<b>Gesamt</b>", f"<b>{total} Min.</b>"]]
    )
    hints = [
        "Drucken Sie das Heft aus und legen Sie einen Stift und eine Uhr bereit.",
        f"Arbeiten Sie ohne Wörterbuch und ohne Handy. Sie haben insgesamt <b>{total} Minuten</b>.",
        "Kreuzen Sie an oder schreiben Sie direkt ins Heft. Übertragen Sie Ihre Lösungen danach auf den Antwortbogen.",
    ]
    if has_audio:
        hints.append(
            f"<b>Hören:</b> Laden Sie die MP3 „Hörverstehen“ herunter (QR-Code scannen, dann in der Simulation auf „Hörverstehen als MP3“ tippen). Sie läuft wie in der Prüfung: Signalton, Zeit zum Lesen, Hörtext, bei Bedarf Wiederholung. Bei jedem Hörtext steht im Heft, ab welcher Minute er in der MP3 beginnt. Ohne Internet kann jemand die Texte aus dem Anhang vorlesen."
        )
    hints.append(
        "Am Ende des Heftes: Antwortbogen, Lösungen mit Erklärung, Mustertexte und Checkliste für das Schreiben. Schneller geht es online: Antworten unter „Papier-Antworten prüfen“ eintragen – die Seite rechnet Punkte und Ergebnis aus."
    )
    qrt = Table(
        [
            [
                qrcode(url),
                [
                    R("Online üben und Hörtexte", "math"),
                    R(
                        f"Simulation mit Uhr, automatischer Auswertung und allen Hörtexten:<br/><b>{esc(url.replace('https://', ''))}</b>",
                        "mat",
                    ),
                ],
            ]
        ],
        colWidths=[32 * mm, W - 32 * mm],
    )
    qrt.setStyle(
        TableStyle(
            [
                ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
                ("BACKGROUND", (0, 0), (-1, -1), SOFT),
                ("LEFTPADDING", (0, 0), (-1, -1), 8),
            ]
        )
    )
    name = Table(
        [["Name:", "", "Datum:", ""]],
        colWidths=[18 * mm, 90 * mm, 18 * mm, 48 * mm],
        rowHeights=[10 * mm],
    )
    name.setStyle(
        TableStyle(
            [
                ("FONTNAME", (0, 0), (-1, -1), "Atk-B"),
                ("LINEBELOW", (1, 0), (1, 0), 0.6, INK),
                ("LINEBELOW", (3, 0), (3, 0), 0.6, INK),
                ("VALIGN", (0, 0), (-1, -1), "BOTTOM"),
            ]
        )
    )
    return (
        [
            R(f"PRÜFUNGSSIMULATION · {esc(ex.get('level', ''))}", "kick"),
            R(esc(ex["title"]), "h1"),
            R(sub, "lead"),
            Spacer(1, 6),
            name,
            Spacer(1, 10),
            table(rows, [130, 44]),
            Spacer(1, 8),
            R("So arbeiten Sie mit dem Heft", "h2"),
        ]
        + [R(f"{i + 1}.&nbsp;&nbsp;{h}", "item") for i, h in enumerate(hints)]
        + [
            Spacer(1, 10),
            qrt,
            Spacer(1, 8),
            R(
                "Eigene Übungsaufgaben im Stil der Prüfung – keine offiziellen Prüfungsaufgaben. Unabhängiges Lernangebot, kein Angebot von g.a.s.t., telc oder BAMF.",
                "small",
            ),
        ]
    )


# ---------------------------------------------------------------- build
def render(path, title, level, story):
    tmp = path + ".raw.pdf"
    doc = BaseDocTemplate(
        tmp,
        pagesize=A4,
        leftMargin=18 * mm,
        rightMargin=18 * mm,
        topMargin=20 * mm,
        bottomMargin=19 * mm,
        title=title,
        author="Dzianis Prudnikau",
        subject=L.MARK,
    )
    fr = Frame(doc.leftMargin, doc.bottomMargin, doc.width, doc.height, id="f")
    doc.addPageTemplates(
        [
            PageTemplate(
                id="p", frames=[fr], onPage=lambda c, d: _page(c, d, title, level)
            )
        ]
    )
    doc.build(story)
    r = PdfReader(tmp)
    w = PdfWriter()
    for p in r.pages:
        p.merge_page(_overlay(float(p.mediabox.width), float(p.mediabox.height)))
        w.add_page(p)
    for p in w.pages:
        p.compress_content_streams()
    w.compress_identical_objects(remove_identicals=True, remove_orphans=True)
    w.add_metadata(
        {
            "/Title": f"{title} – Deutsch mit Dennis",
            "/Author": "Dzianis Prudnikau",
            "/Creator": "Deutsch mit Dennis",
            "/Subject": L.MARK,
        }
    )
    with open(path, "wb") as f:
        w.write(f)
    os.remove(tmp)
    print(
        f"{os.path.relpath(path, REPO)}: {len(r.pages)} Seiten, {os.path.getsize(path) // 1024} KB"
    )


def build_exam(id, only=None):
    load_marks(id)
    ex = load(id)
    n = 0
    for s in ex["sections"]:
        for p in s["parts"]:
            for it in p.get("items") or []:
                n += 1
                it["_n"] = n
    secs = [
        s
        for s in ex["sections"]
        if not any(p.get("kind") == "speak" for p in s["parts"])
    ]
    if only == "hoeren":
        secs = [s for s in secs if any(p.get("audio") for p in s["parts"])]
        if not secs:
            return
    total = sum(s["minutes"] for s in secs)
    has_audio = any(p.get("audio") for s in secs for p in s["parts"])
    story = cover(ex, id, secs, total, has_audio, *(["Hörverstehen – Übungsheft zum Ausdrucken (mit MP3)"] if only else []))
    for s in secs:
        story += [
            PageBreak(),
            R(
                f'{esc(s["title"])} <font size="11" color="#566078">· ca. {s["minutes"]} Min.</font>',
                "sec",
            ),
        ]
        if s.get("note"):
            story.append(R(esc(s["note"]), "small"))
        for p in s["parts"]:
            story += (
                write_flow(p) if p.get("kind") == "write" else part_flow(p, s["id"])
            )
    story += answer_sheet(ex, secs) + solutions(ex, secs) + transcripts(secs)
    render(
        os.path.join(OUT, f"{id}-{only or 'schriftlich'}.pdf"),
        f"{ex['short']} – {'Hörverstehen' if only else 'Schriftliche Prüfung'}",
        ex.get("level", ""),
        story,
    )


# ---------------------------------------------------------------- LiD (fixed sets, NRW)
def lid_img(f, w):
    path = os.path.join(REPO, "assets", "lid-fragen", f)
    im = PILImage.open(path).convert("RGB")
    buf = io.BytesIO()
    im.save(buf, "JPEG", quality=82)
    buf.seek(0)
    return Image(buf, width=w, height=w * im.height / im.width)


def build_lid(nr):
    d = load("lid")
    K = d["K"]
    rnd = random.Random(1000 + nr)
    gen = [q for q in K if isinstance(q["nr"], int)]
    land = [
        q for q in K if not isinstance(q["nr"], int) and str(q["nr"]).startswith("NRW")
    ]
    qs = rnd.sample(gen, 30) + rnd.sample(land, 3)
    LID_SETS[str(nr)] = [q["id"] for q in qs]
    url = BASE + "lid"
    story = [
        R("TEST „LEBEN IN DEUTSCHLAND“ · ÜBUNGSBOGEN", "kick"),
        R(f"Probetest {nr}", "h1"),
        R(
            "33 Fragen aus dem offiziellen Gesamtfragenkatalog (30 allgemeine Fragen + 3 Fragen zu Nordrhein-Westfalen). Zeit: 60 Minuten. Pro Frage ist genau eine Antwort richtig.",
            "lead",
        ),
        box(
            [
                R(
                    "<b>Bestanden:</b> ab 15 richtigen Antworten (Orientierungskurs) · <b>Einbürgerung:</b> ab 17 richtigen Antworten. Die Lösungen stehen am Ende.",
                    "mat",
                )
            ],
            bg=NOTE,
        ),
        Spacer(1, 6),
    ]
    for i, q in enumerate(qs, 1):
        pic = len(q["img"]) == 4 and re.match(r"^Bild \d$", q["a"][0])
        fl = [R(f"<b>{i}</b>&nbsp;&nbsp;&nbsp;{esc(q['q'])}", "q")]
        if q["img"] and not pic:
            fl.append(Table([[lid_img(f, 60 * mm) for f in q["img"]]], hAlign="LEFT"))
        if pic:
            cells = [
                [lid_img(f, 36 * mm) for f in q["img"]],
                [R(f"{BOX} {'abcd'[j]}) {esc(a)}", "cell") for j, a in enumerate(q["a"])],
            ]
            t = Table(cells, colWidths=[42 * mm] * 4, hAlign="LEFT")
            t.setStyle(TableStyle([("VALIGN", (0, 0), (-1, -1), "MIDDLE")]))
            fl.append(t)
        else:
            fl += [R(f"{BOX} {'abcd'[j]}) {esc(a)}", "opt") for j, a in enumerate(q["a"])]
        story.append(KeepTogether(fl))
    story += [
        PageBreak(),
        R("Lösungen", "h1"),
        table(
            [["Nr.", "Richtige Antwort", "Katalog"]]
            + [
                [
                    f"<b>{i}</b>",
                    "abcd"[q["s"]] + ") " + esc(q["a"][q["s"]]),
                    esc(
                        q["nr"] if not isinstance(q["nr"], int) else f"Frage {q['nr']}"
                    ),
                ]
                for i, q in enumerate(qs, 1)
            ],
            [12, 120, 42],
        ),
        Spacer(1, 8),
        R(
            f"Weitere Probetests mit neuen Fragen bei jedem Start: <b>{url.replace('https://', '')}</b>",
            "mat",
        ),
        Spacer(1, 6),
        R(
            "<b>Quelle:</b> Gesamtfragenkatalog zum Test „Leben in Deutschland“ und zum Einbürgerungstest, herausgegeben vom Bundesamt für Migration und Flüchtlinge (BAMF), Stand 28.09.2026, bamf.de.",
            "small",
        ),
        R(f"<b>Hinweis:</b> {esc(d['h'])}", "small"),
    ]
    render(
        os.path.join(OUT, f"lid-test-{nr}.pdf"),
        f"LiD – Probetest {nr}",
        "Orientierungskurs",
        story,
    )


if __name__ == "__main__":
    os.makedirs(OUT, exist_ok=True)
    want = sys.argv[1:] or IDS + ["lid"]
    for id in want:
        if id == "lid":
            build_lid(1)
            build_lid(2)
            json.dump(LID_SETS, open(os.path.join(OUT, "lid-sets.json"), "w"))
            continue
        else:
            build_exam(id)
            build_exam(id, "hoeren")
