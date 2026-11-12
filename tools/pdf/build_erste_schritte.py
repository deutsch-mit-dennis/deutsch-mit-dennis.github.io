# Worksheets for "Erste Schritte" (erste-schritte-data.js) -> material/arbeitsblaetter/es-<topic>.pdf
# Picture dictionary + exercises + solutions. Run from the repo root: python3 tools/pdf/build_erste_schritte.py [topic-id ...]
import json, math, os, random, subprocess, sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from arbeitsblatt_lib import *  # noqa
from arbeitsblatt_lib import REPO, INK, TINTE, MUTED, LINE, fallback
from reportlab.platypus import Table, TableStyle, Image, Flowable
from reportlab.lib.colors import HexColor

ART = {"der": "#2463c7", "die": "#c2362b", "das": "#1d7a45"}
LOES = '<font color="#1D7A45"><b>Lösungen</b></font>'


def topics():
    js = (
        "const fs=require('fs');global.window={};eval(fs.readFileSync('erste-schritte-data.js','utf8'));"
        "console.log(JSON.stringify(window.DM.ersteSchritte.topics))"
    )
    return json.loads(
        subprocess.check_output(["node", "-e", js], cwd=REPO, encoding="utf-8")
    )


class Clock(Flowable):
    def __init__(self, time, size=26 * mm):
        super().__init__()
        self.time, self.size = time, size
        self.width = self.height = size

    def draw(self):
        c, r = self.canv, self.size / 2
        h, m = map(int, self.time.split(":"))
        c.setStrokeColor(INK)
        c.setLineWidth(1.6)
        c.circle(r, r, r - 2)
        for i in range(12):
            a = math.radians(i * 30)
            r1 = r - (6 if i % 3 == 0 else 4.5)
            c.setLineWidth(1.4 if i % 3 == 0 else 0.7)
            c.line(
                r + r1 * math.sin(a),
                r + r1 * math.cos(a),
                r + (r - 2.5) * math.sin(a),
                r + (r - 2.5) * math.cos(a),
            )
        ha, ma = math.radians(((h % 12) + m / 60) * 30), math.radians(m * 6)
        c.setLineCap(1)
        c.setLineWidth(3)
        c.line(r, r, r + r * 0.5 * math.sin(ha), r + r * 0.5 * math.cos(ha))
        c.setStrokeColor(HexColor("#d7263d"))
        c.setLineWidth(1.8)
        c.line(r, r, r + r * 0.78 * math.sin(ma), r + r * 0.78 * math.cos(ma))
        c.setFillColor(INK)
        c.circle(r, r, 1.6, fill=1, stroke=0)


class Swatch(Flowable):
    def __init__(self, color, size=20 * mm):
        super().__init__()
        self.color, self.size = color, size
        self.width = self.height = size

    def draw(self):
        self.canv.setFillColor(HexColor(self.color))
        self.canv.setStrokeColor(LINE)
        self.canv.circle(
            self.size / 2, self.size / 2, self.size / 2 - 1, fill=1, stroke=1
        )


def visual(it, size=30 * mm):
    if it.get("color"):
        return Swatch(it["color"], size * 0.7)
    if it.get("time"):
        return Clock(it["time"], size * 0.85)
    img = it.get("img") or ""
    if "/" in img:
        p = os.path.join(REPO, "assets", img + ".webp")
        if os.path.exists(p):
            # JPEG keeps the PDF small (webp would be embedded lossless)
            from PIL import Image as PILImage
            import io

            buf = io.BytesIO()
            PILImage.open(p).convert("RGB").save(buf, "JPEG", quality=78)
            buf.seek(0)
            return Image(buf, width=size, height=size)
    if img or it.get("art") or len(it["w"]) > 12:
        return Spacer(1, 1)  # emoji or missing picture: the word below is enough
    big = it["w"] if any(ch.isalnum() for ch in it["w"]) else it.get("sub", "")
    if "big" not in st:
        st["big"] = type(st["p"])(
            "big",
            parent=st["p"],
            fontName="Atk-B",
            fontSize=26,
            leading=30,
            textColor=TINTE,
            alignment=1,
        )
    return (
        R(fallback(big), "big") if len(big) < 5 else Spacer(1, 1)
    )


def word(it):
    w = fallback(it["w"] if any(ch.isalnum() for ch in it["w"]) else it.get("sub", ""))  # emoji tiles: use the word
    return (
        f'<font color="{ART[it["art"]]}"><b>{it["art"]}</b></font> <b>{w}</b>'
        if it.get("art")
        else f"<b>{w}</b>"
    )


def grid(cells, cols=3, width=174 * mm):
    rows = [
        cells[i : i + cols] + [""] * (cols - len(cells[i : i + cols]))
        for i in range(0, len(cells), cols)
    ]
    t = Table(rows, colWidths=[width / cols] * cols)
    t.setStyle(
        TableStyle(
            [
                ("ALIGN", (0, 0), (-1, -1), "CENTER"),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("BOX", (0, 0), (-1, -1), 0.4, LINE),
                ("INNERGRID", (0, 0), (-1, -1), 0.4, LINE),
                ("TOPPADDING", (0, 0), (-1, -1), 6),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 6),
            ]
        )
    )
    return t


def cell(parts):
    t = Table([[p] for p in parts], colWidths=[54 * mm])
    t.setStyle(
        TableStyle(
            [
                ("ALIGN", (0, 0), (-1, -1), "CENTER"),
                ("LEFTPADDING", (0, 0), (-1, -1), 2),
                ("RIGHTPADDING", (0, 0), (-1, -1), 2),
                ("TOPPADDING", (0, 0), (-1, -1), 1),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 1),
            ]
        )
    )
    return t


def centered(html, s="cell"):
    st[s + "c"] = st.get(s + "c") or type(st[s])(s + "c", parent=st[s], alignment=1)
    return R(html, s + "c")


def sheet(t):
    rnd = random.Random(t["id"])
    items, kind, level = t["items"], t["kind"], t["level"]
    lvl = "A0" if level == "A0" else "A1"
    story = [
        R(f"Erste Schritte · {lvl}", "kick"),
        R(fallback(t["title"]), "h1"),
        R(fallback(t["intro"]), "lead"),
        Spacer(1, 2 * mm),
    ]
    # 1) picture dictionary
    story.append(R("Bildwörterbuch", "h2"))
    story.append(
        R(
            "Hör die Wörter auf der Website und sprich nach. Schreib die Übersetzung in deine Sprache auf die Linie.",
            "small",
        )
    )
    cells = []
    for it in items:
        parts = [visual(it, 26 * mm if kind == "pic" else 22 * mm), centered(word(it))]
        if it.get("sub") and kind != "phrase" and any(ch.isalnum() for ch in it["w"]):
            parts.append(
                centered(f'<font color="#566078">{fallback(it["sub"])}</font>')
            )
        if it.get("pl"):
            parts.append(centered(f'<font color="#566078">{fallback(it["pl"])}</font>'))
        if kind != "tile" or it.get("tr"):
            parts.append(centered('<font color="#8A93A8">________________</font>'))
        cells.append(cell(parts))
    story.append(grid(cells, 2 if kind == "phrase" else 4 if kind == "tile" else 3))
    sol = []
    nr = 1
    nouns = [it for it in items if it.get("art")]
    # 2) articles
    if len(nouns) >= 4:
        story.append(PageBreak())
        story += task(
            nr,
            "Der, die oder das?",
            "Schreib den Artikel. Tipp: der = blau, die = rot, das = grün.",
            1,
        )
        sh = nouns[:]
        rnd.shuffle(sh)
        story.append(
            table(
                [
                    [
                        f"{i + 1}. ______ <b>{fallback(sh[i]['w'])}</b>",
                        (
                            f"{i + 2}. ______ <b>{fallback(sh[i + 1]['w'])}</b>"
                            if i + 1 < len(sh)
                            else ""
                        ),
                    ]
                    for i in range(0, len(sh), 2)
                ],
                [87, 87],
                head=False,
            )
        )
        sol.append(
            f"<b>Übung {nr}:</b> "
            + ", ".join(
                f"{i + 1}. {it['art']} {fallback(it['w'])}" for i, it in enumerate(sh)
            )
        )
        nr += 1
    # 3) picture -> word
    # only items with a real picture – a text fallback would give the answer away
    pick = [
        it
        for it in items
        if kind != "pic"
        or os.path.exists(
            os.path.join(REPO, "assets", (it.get("img") or "x") + ".webp")
        )
    ] if kind in ("pic", "clock", "color") else []
    if pick:  # no pictures yet (topic waits for its images): skip this task
        rnd.shuffle(pick)
        pick = pick[: 9 if kind != "clock" else 6]
        title, hint = (
            (
                "Wie spät ist es?",
                "Schreib die Uhrzeit wie im Alltag, z. B. „halb zehn“.",
            )
            if kind == "clock"
            else ("Welche Farbe ist das?", "Schreib die Farbe unter den Kreis.")
            if kind == "color"
            else (
                "Was ist das?",
                "Schreib das Wort unter das Bild – bei Nomen mit Artikel.",
            )
        )
        story += task(nr, title, hint, 2)
        story.append(
            grid(
                [
                    cell(
                        [
                            visual(it, 24 * mm),
                            centered(
                                f'{i + 1}. <font color="#8A93A8">________________</font>'
                            ),
                        ]
                    )
                    for i, it in enumerate(pick)
                ],
                3,
            )
        )
        sol.append(
            f"<b>Übung {nr}:</b> "
            + ", ".join(
                f"{i + 1}. {fallback(it.get('sub') if kind == 'clock' else (it['art'] + ' ' + it['w']) if it.get('art') else it['w'])}"
                for i, it in enumerate(pick)
            )
        )
        nr += 1
    if t["id"] == "zahlen":
        pick = [it for it in items if it["w"] not in ("0", "1", "100")]
        rnd.shuffle(pick)
        pick = pick[:12]
        story += task(nr, "Schreib die Zahlen als Wort.", "Beispiel: 7 → sieben", 2)
        story.append(
            table(
                [
                    [
                        f"<b>{pick[i]['w']}</b> {ARROW} ________________",
                        (
                            f"<b>{pick[i + 1]['w']}</b> {ARROW} ________________"
                            if i + 1 < len(pick)
                            else ""
                        ),
                    ]
                    for i in range(0, len(pick), 2)
                ],
                [87, 87],
                head=False,
            )
        )
        sol.append(
            f"<b>Übung {nr}:</b> "
            + ", ".join(f"{it['w']} = {fallback(it['sub'])}" for it in pick)
        )
        nr += 1
    if t["id"] == "alphabet":
        story += task(
            nr,
            "Buchstabiere!",
            "Schreib deinen Namen, deine Straße und deine Stadt. Buchstabiere laut: „Em – I – El – A“.",
            1,
        )
        story.append(
            table(
                [
                    ["Vorname:", ""],
                    ["Familienname:", ""],
                    ["Straße:", ""],
                    ["Stadt:", ""],
                ],
                [40, 134],
                head=False,
            )
        )
        nr += 1
    if kind == "phrase":
        story += task(
            nr, "Was passt?", "Schreib den Satz zu deiner Situation auf die Linie.", 2
        )
        pick = items[:]
        rnd.shuffle(pick)
        pick = pick[:6]
        for i, it in enumerate(pick):
            tr = (it.get("tr") or "").split("|")[0]
            story.append(
                R(
                    f"{i + 1}. <i>{fallback(tr)}</i> (English) {ARROW} {GAP}{GAP}",
                    "item",
                )
            )
        sol.append(
            f"<b>Übung {nr}:</b> "
            + ", ".join(f"{i + 1}. {fallback(it['w'])}" for i, it in enumerate(pick))
        )
        nr += 1
    # 4) sentences
    story += task(
        nr,
        "Sätze schreiben",
        "Lies die Sätze laut. Schreib dann zwei eigene Sätze über dich.",
        3,
    )
    for s in t["sentences"]:
        story.append(R(f"{sym('▸')} {fallback(s[0])}", "item"))
    story.append(Spacer(1, 2 * mm))
    story.append(lines(3))
    # solutions
    if sol:
        story += [
            Spacer(1, 4 * mm),
            box([R(LOES, "h3")] + [R(s, "small") for s in sol], bg=HELLGRUEN),
        ]
    return build("es-" + t["id"], fallback(t["title"]), lvl, story)


if __name__ == "__main__":
    want = set(sys.argv[1:])
    res = {}
    for t in topics():
        if want and t["id"] not in want:
            continue
        res[t["id"]] = sheet(t)
    print(json.dumps(res))
