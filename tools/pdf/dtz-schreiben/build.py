"""Printable worksheet for /dtz-schreiben/ (DTZ writing prep, new A2 rule from 1 Nov 2026).

Exercises with answer key, own tasks only (no original exam content).
Run from the repo root:  python3 tools/pdf/dtz-schreiben/build.py
Output: material/dtz-schreiben-vorbereitung.pdf
Keep the exercise data in sync with dtz-schreiben/index.html.
"""

import glob
import os
from html import escape
from pathlib import Path

from playwright.sync_api import sync_playwright

REPO = Path(__file__).resolve().parents[3]
OUT = REPO / "material/dtz-schreiben-vorbereitung.pdf"
FONTS = REPO / "tools/pdf/fonts"
URL = "https://deutsch-mit-dennis.de/dtz-schreiben/"

U1 = [
    ("E-Mail an Ihre Vermieterin", "Sie"),
    ("Nachricht an Ihre Schwester", "du"),
    ("Brief an die Leitung der Kita", "Sie"),
    ("E-Mail an Ihren Kollegen Tom – Sie duzen sich", "du"),
    ("Brief an das Jobcenter", "Sie"),
    ("Nachricht an Ihren Freund Ali", "du"),
]
U2 = [
    (
        "An Ihre Vermieterin Frau Schulz",
        "Sehr geehrte Frau Schulz,",
        ["Liebe Schulz,", "Sehr geehrte Frau Schulz,", "Hallo Frau Schulz,"],
    ),
    (
        "An Herrn Becker vom Amt",
        "Sehr geehrter Herr Becker,",
        ["Sehr geehrte Herr Becker,", "Sehr geehrter Herr Becker,", "Lieber Becker,"],
    ),
    (
        "An die Sprachschule – Sie kennen keinen Namen",
        "Sehr geehrte Damen und Herren,",
        ["Sehr geehrte Damen und Herren,", "Hallo zusammen,", "Liebe Sprachschule,"],
    ),
    (
        "An Ihren Freund Ali",
        "Lieber Ali,",
        ["Liebe Ali,", "Lieber Ali,", "Sehr geehrter Ali,"],
    ),
    (
        "Gruß an Frau Schulz",
        "Mit freundlichen Grüßen",
        ["Liebe Grüße", "Mit freundlichen Grüßen", "Tschüss"],
    ),
    (
        "Gruß an Ali",
        "Viele Grüße",
        ["Mit freundlichen Grüßen", "Hochachtungsvoll", "Viele Grüße"],
    ),
]
U3 = [
    ("Sie hat Fieber und kann morgen nicht in die Kita kommen.", 3),
    ("Mit freundlichen Grüßen – Leyla Demir", 7),
    ("Können Sie mir bitte sagen, ob es diese Woche wichtige Informationen gibt?", 5),
    ("Sehr geehrte Frau Becker,", 1),
    ("Der Arzt sagt, sie muss bis Freitag zu Hause bleiben.", 4),
    ("Vielen Dank! Ich freue mich auf Ihre Antwort.", 6),
    ("ich schreibe Ihnen, weil meine Tochter Mila krank ist.", 2),
]
U4 = [
    (
        "Sehr geehrte Damen und Herren, ich schreibe Ihnen,",
        "weil",
        ["weil", "dass", "denn"],
        "ich den Kurs wechseln möchte.",
    ),
    ("Leider", "habe", ["habe", "hat", "haben"], "ich am Vormittag keine Zeit."),
    (
        "Können Sie mir bitte sagen, was der Kurs",
        "kostet",
        ["kosten", "kostet", "kostest"],
        "?",
    ),
    ("Vielen Dank für Ihre", "Hilfe", ["helfen", "hilft", "Hilfe"], "."),
    ("Ich freue mich auf", "Ihre", ["deine", "Ihre", "Sie"], "Antwort."),
    ("Mit freundlichen", "Grüßen", ["Gruß", "grüßen", "Grüßen"], ""),
]
U5 = [
    (
        "für die Einladung danken",
        "Danke für deine Einladung! Ich habe mich sehr gefreut.",
    ),
    (
        "absagen und Grund nennen",
        "Leider kann ich nicht kommen, weil ich am Samstag arbeiten muss.",
    ),
    (
        "Geschenk ansprechen",
        "Ich habe schon ein kleines Geschenk für dich gekauft. Ich bringe es dir nächste Woche.",
    ),
    (
        "neues Treffen vorschlagen",
        "Hast du am Sonntag Zeit? Dann können wir zusammen Kaffee trinken.",
    ),
]
AUFGABEN = [
    (
        "1",
        "In Ihrer Wohnung ist die Heizung seit drei Tagen kaputt. Schreiben Sie an Ihre Vermieterin, Frau Schulz.",
        [
            "Problem beschreiben",
            "Folgen für Sie und Ihre Familie",
            "Termin für die Reparatur vorschlagen",
            "um schnelle Antwort bitten",
        ],
        "Ihre Freundin Maria hat Sie zu ihrem Geburtstag eingeladen. Sie können nicht kommen.",
        [
            "für die Einladung danken",
            "absagen und Grund nennen",
            "Geschenk ansprechen",
            "neues Treffen vorschlagen",
        ],
    ),
    (
        "2",
        "Ihr Kind ist krank und kann morgen nicht in die Kita. Schreiben Sie an die Erzieherin, Frau Becker.",
        [
            "Grund für das Fehlen",
            "wie lange Ihr Kind fehlt",
            "nach Informationen fragen",
            "um Rückmeldung bitten",
        ],
        "Ihr Freund Ali ist neu in Ihrer Stadt. Er sucht einen Deutschkurs.",
        [
            "wo Sie Deutsch gelernt haben",
            "wie der Kurs war",
            "was er beachten soll",
            "Hilfe anbieten",
        ],
    ),
    (
        "3",
        "Sie haben morgen einen Termin beim Jobcenter, können aber nicht kommen. Schreiben Sie an Ihre Ansprechpartnerin, Frau Klein.",
        [
            "sich entschuldigen",
            "Grund nennen",
            "neuen Termin vorschlagen",
            "fragen, welche Unterlagen Sie mitbringen sollen",
        ],
        "Sie sind umgezogen. Schreiben Sie Ihrem Bruder oder Ihrer Schwester.",
        [
            "wie die neue Wohnung ist",
            "was Ihnen gefällt und was nicht",
            "wie die Nachbarn sind",
            "zu Besuch einladen",
        ],
    ),
    (
        "4",
        "Sie haben einen Deutschkurs gebucht, möchten aber den Kurs wechseln. Schreiben Sie an die Sprachschule.",
        [
            "welchen Kurs Sie besuchen",
            "warum Sie wechseln möchten",
            "welche Zeit für Sie passt",
            "nach den Kosten fragen",
        ],
        "Ihr Kollege Tom hat Ihnen beim Umzug geholfen.",
        [
            "sich bedanken",
            "erzählen, wie es jetzt in der Wohnung ist",
            "zum Essen einladen",
            "Termin vorschlagen",
        ],
    ),
]
LETTERS = "abcdefg"
e = escape


def box(t):
    return f'<span class="bx"></span>{e(t)}'


def lines(n):
    return '<div class="ln"></div>' * n


def html():
    u1 = "".join(
        f"<tr><td>{e(t)}</td><td class='c'>{box('Sie')}</td><td class='c'>{box('du')}</td></tr>"
        for t, _ in U1
    )
    u2 = "".join(
        f"<li><b>{e(t)}</b><div class='opts'>{''.join(f'<span>{box(o)}</span>' for o in os_)}</div></li>"
        for t, _, os_ in U2
    )
    u3 = "".join(
        f"<tr><td class='num'><span class='nb'></span></td><td>{e(t)}</td></tr>"
        for t, _ in U3
    )
    u4 = "".join(
        f"<li>{e(a)} <span class='gap'></span> {e(c)} <span class='hint'>({' / '.join(map(e, o))})</span></li>"
        for a, _, o, c in U4
    )
    u5 = "".join(
        f"<li><b>Leitpunkt {i + 1}:</b> {e(t)}{lines(2)}</li>"
        for i, (t, _) in enumerate(U5)
    )
    tasks = "".join(
        f"<div class='task'><h3>Übungssatz {n}</h3>"
        f"<p><b>Aufgabe A</b> <span class='tag'>formell</span> {e(a)}</p><ul>{''.join(f'<li>{e(x)}</li>' for x in ap)}</ul>"
        f"<p><b>Aufgabe B</b> <span class='tag'>informell</span> {e(b)}</p><ul>{''.join(f'<li>{e(x)}</li>' for x in bp)}</ul></div>"
        for n, a, ap, b, bp in AUFGABEN
    )
    s1 = " · ".join(f"{i + 1}. {a}" for i, (_, a) in enumerate(U1))
    s2 = "".join(f"<li>{e(a)}</li>" for _, a, _ in U2)
    order = sorted(range(len(U3)), key=lambda i: U3[i][1])
    s3 = " · ".join(f"{U3[i][1]}. {e(U3[i][0])}" for i in order)
    s4 = " · ".join(f"{i + 1}. {e(a)}" for i, (_, a, _, _) in enumerate(U4))
    s5 = "".join(f"<li>{e(m)}</li>" for _, m in U5)
    return f"""<!doctype html><html lang="de"><head><meta charset="utf-8"><style>
@font-face{{font-family:Atk;font-weight:400;src:url(file://{FONTS}/Atk-R.ttf)}}
@font-face{{font-family:Atk;font-weight:700;src:url(file://{FONTS}/Atk-B.ttf)}}
@font-face{{font-family:Cav;src:url(file://{FONTS}/Cav.ttf)}}
@page{{size:A4;margin:16mm 16mm 18mm}}
body{{font-family:Atk,sans-serif;font-size:11pt;line-height:1.45;color:#1d2433;margin:0}}
h1{{font-size:21pt;color:#2a44b8;margin:0 0 2mm;line-height:1.15}}
h2{{font-size:14pt;color:#2a44b8;margin:7mm 0 2mm;border-bottom:2px solid #2a44b8;padding-bottom:1mm;break-after:avoid}}
h3{{font-size:12pt;margin:4mm 0 1mm}}
.from{{font-family:Cav;font-size:17pt;color:#2a44b8;margin:0}}
.lead{{font-weight:700}}
.box{{background:#eef1fb;border-radius:3mm;padding:3mm 4mm;margin:2mm 0;break-inside:avoid}}
table{{border-collapse:collapse;width:100%;break-inside:avoid}}
td,th{{border:1px solid #c8cfe6;padding:1.6mm 2.5mm;vertical-align:top;text-align:left}}
th{{background:#eef1fb}}
.c{{width:22mm;white-space:nowrap}}.num{{width:14mm}}
.bx{{display:inline-block;width:3.6mm;height:3.6mm;border:1.4px solid #1d2433;border-radius:.6mm;margin-right:1.6mm;vertical-align:-0.6mm}}
.nb{{display:inline-block;width:8mm;height:7mm;border:1.4px solid #1d2433;border-radius:1mm}}
.opts{{display:flex;flex-wrap:wrap;gap:1mm 6mm;margin:1mm 0 2mm}}
.gap{{display:inline-block;width:28mm;border-bottom:1.4px solid #1d2433}}
.hint{{color:#5b6478;font-size:10pt}}
.ln{{border-bottom:1px solid #9aa3bd;height:8mm}}
ul,ol{{margin:1mm 0 2mm;padding-left:6mm}}
.ex li{{margin-bottom:2mm;break-inside:avoid}}
.task{{break-inside:avoid;border:1px solid #c8cfe6;border-radius:3mm;padding:1mm 4mm 2mm;margin:0 0 3mm}}
.tag{{font-size:9pt;font-weight:700;background:#eef1fb;color:#2a44b8;border-radius:1.5mm;padding:.3mm 1.5mm}}
.letter{{background:#fffdf3;border:1px solid #efe3a6;border-radius:3mm;padding:3mm 4mm;margin:1mm 0 3mm;break-inside:avoid}}
.letter p{{margin:0 0 1.6mm}}
.ue{{break-inside:avoid;margin-bottom:4mm}}
.pb{{break-before:page}}
.sol li{{margin-bottom:1mm}}
.small{{font-size:9.5pt;color:#5b6478}}
</style></head><body>
<p class="from">Von Dennis, DTZ-Prüfer</p>
<h1>DTZ Schreiben – Vorbereitungspaket</h1>
<p class="lead">Neu ab 1. November 2026: Beim Schreiben braucht ihr mindestens A2. Ein leeres Blatt reicht nicht mehr.</p>

<h2>1 · Wann bekommt man das B1-Zertifikat?</h2>
<p>Grundregel: In „Sprechen“ immer B1, in einem weiteren Teil B1 und im dritten Teil mindestens A2. Es gibt genau diese 3 Möglichkeiten:</p>
<table><tr><th></th><th>Hören/Lesen</th><th>Schreiben</th><th>Sprechen</th></tr>
<tr><td>Fall 1 · alles B1</td><td>B1</td><td>B1</td><td>B1</td></tr>
<tr><td>Fall 2 · Schreiben schwächer</td><td>B1</td><td><b>mind. A2</b></td><td>B1</td></tr>
<tr><td>Fall 3 · Hören/Lesen schwächer</td><td><b>mind. A2</b></td><td>B1</td><td>B1</td></tr></table>

<h2>2 · So läuft der Teil Schreiben</h2>
<p>30 Minuten · eine von zwei Aufgaben wählen · eine E-Mail oder einen Brief zu <b>vier Leitpunkten</b> schreiben. „Sie“ an Firmen, Ämter, Vermieter, Lehrer – „du“ an Freunde und Familie.</p>
<div class="box"><b>So schafft ihr sicher A2:</b> alle vier Leitpunkte bearbeiten · immer Anrede, Einleitung, Schluss und Gruß · kurze, richtige Sätze · Wörter aus der Aufgabe benutzen · ca. 60–80 Wörter (A2), 80–100 Wörter mit „weil, dass, deshalb“ (B1) · am Ende die Checkliste prüfen.</div>

<h2>3 · Das Briefgerüst in 6 Schritten</h2>
<ol>
<li><b>Anrede:</b> Sehr geehrte Frau … / Sehr geehrter Herr … / Sehr geehrte Damen und Herren, · Liebe … / Lieber … / Hallo …,</li>
<li><b>Einleitung:</b> ich schreibe Ihnen/dir, weil …</li>
<li><b>Leitpunkt 1–4:</b> zu jedem Punkt 1–3 Sätze, in der Reihenfolge der Aufgabe</li>
<li><b>Bitte / Frage:</b> Können Sie / Kannst du mir bitte …?</li>
<li><b>Schluss:</b> Vielen Dank für Ihre Hilfe. Ich freue mich auf Ihre/deine Antwort.</li>
<li><b>Gruß + Name:</b> Mit freundlichen Grüßen · Viele Grüße / Liebe Grüße</li>
</ol>

<h2 class="pb">Vorbereitungsübungen</h2>
<div class="ue"><h3>Übung 1 · Sie oder du? Kreuze an.</h3><table>{u1}</table></div>
<div class="ue"><h3>Übung 2 · Anrede und Gruß. Kreuze die richtige Form an.</h3><ol class="ex">{u2}</ol></div>
<div class="ue"><h3>Übung 3 · Bring die E-Mail an die Kita in die richtige Reihenfolge (1–7).</h3><table>{u3}</table></div>
<div class="ue"><h3>Übung 4 · Ergänze das richtige Wort.</h3><ol class="ex">{u4}</ol></div>
<div class="ue"><h3>Übung 5 · Aus Leitpunkten werden Sätze.</h3>
<p>Deine Freundin Maria hat dich zum Geburtstag eingeladen. Du kannst nicht kommen. Schreib zu jedem Leitpunkt 1–2 Sätze.</p><ol class="ex" style="list-style:none;padding:0">{u5}</ol></div>

<h2 class="pb">Redemittel</h2>
<table><tr><th>Funktion</th><th>formell (Sie)</th><th>informell (du)</th></tr>
<tr><td>Grund nennen</td><td>Ich schreibe Ihnen, weil …</td><td>Ich schreibe dir, weil …</td></tr>
<tr><td>Problem beschreiben</td><td>Leider funktioniert … nicht.</td><td>Stell dir vor: … ist kaputt.</td></tr>
<tr><td>Sich entschuldigen</td><td>Es tut mir leid, dass …</td><td>Sorry, dass …</td></tr>
<tr><td>Absagen</td><td>Leider kann ich am … nicht kommen, weil …</td><td>Leider kann ich nicht kommen, weil …</td></tr>
<tr><td>Bitten</td><td>Können Sie bitte …?</td><td>Kannst du bitte …?</td></tr>
<tr><td>Vorschlag machen</td><td>Ich schlage vor, dass … / Geht es am …?</td><td>Wollen wir …? / Hast du am … Zeit?</td></tr>
<tr><td>Fragen stellen</td><td>Ich möchte gern wissen, ob …</td><td>Weißt du, ob …?</td></tr>
<tr><td>Danken</td><td>Vielen Dank für Ihre Hilfe.</td><td>Danke für die Einladung!</td></tr>
<tr><td>Schluss</td><td>Ich freue mich auf Ihre Antwort.</td><td>Ich freue mich auf deine Antwort. / Bis bald!</td></tr></table>

<h2>Prüfungsaufgaben (je 30 Minuten)</h2>
<p>Wähle in jedem Übungssatz eine Aufgabe und schreib auf ein eigenes Blatt.</p>
{tasks}

<h2 class="pb">Mustertexte (Übungssatz 1, Aufgabe A)</h2>
<h3>A2 · ca. 60 Wörter</h3>
<div class="letter"><p>Sehr geehrte Frau Schulz,</p><p>ich schreibe Ihnen, weil meine Heizung kaputt ist. Sie funktioniert seit drei Tagen nicht.</p><p>Es ist sehr kalt in der Wohnung. Meine Kinder sind krank.</p><p>Kann der Techniker am Montag kommen? Ich bin ab 14 Uhr zu Hause.</p><p>Bitte antworten Sie schnell.</p><p>Mit freundlichen Grüßen<br>Anna Novak</p></div>
<h3>B1 · ca. 100 Wörter</h3>
<div class="letter"><p>Sehr geehrte Frau Schulz,</p><p>ich schreibe Ihnen, weil die Heizung in meiner Wohnung seit Freitag nicht mehr funktioniert. Ich habe schon alles kontrolliert, aber die Heizkörper bleiben kalt.</p><p>Das ist ein großes Problem für uns, denn draußen sind es nur zwei Grad. Meine Tochter hat schon eine Erkältung, deshalb mache ich mir Sorgen.</p><p>Ich schlage vor, dass der Techniker am Montag oder Dienstag kommt. An beiden Tagen bin ich ab 14 Uhr zu Hause.</p><p>Können Sie mir bitte schnell antworten? Vielen Dank für Ihre Hilfe.</p><p>Mit freundlichen Grüßen<br>Anna Novak</p></div>

<h2>Checkliste vor der Abgabe</h2>
<ul style="list-style:none;padding:0">
<li>{box("Habe ich alle vier Leitpunkte bearbeitet?")}</li><li>{box("Passt die Anrede (Sie oder du)?")}</li>
<li>{box("Gibt es Einleitung, Schluss und Gruß?")}</li><li>{box("Steht in jedem Satz ein Verb (Position 2, bei „weil/dass“ am Ende)?")}</li>
<li>{box("Nomen großgeschrieben? Sie/Ihnen/Ihr großgeschrieben?")}</li><li>{box("Steht mein Name unter dem Gruß?")}</li></ul>

<h2 class="pb">Lösungen</h2>
<div class="sol">
<h3>Übung 1</h3><p>{s1}</p>
<h3>Übung 2</h3><ol>{s2}</ol>
<h3>Übung 3 – richtige Reihenfolge</h3><p>{s3}</p>
<h3>Übung 4</h3><p>{s4}</p>
<h3>Übung 5 – Beispiele (andere richtige Sätze sind möglich)</h3><ol>{s5}</ol>
</div>
<p class="small">Online mit Timer und Selbstkontrolle: {URL}<br>Übungsmaterial im Stil des DTZ – keine Originalaufgaben von telc, g.a.s.t. oder BAMF.</p>
</body></html>"""


def main():
    exe = (glob.glob("/opt/pw-browsers/chromium-*/chrome-linux*/chrome") or [None])[0]
    tmp = REPO / "tools/pdf/dtz-schreiben/.page.html"
    tmp.write_text(html(), encoding="utf-8")
    footer = (
        '<div style="font-family:sans-serif;font-size:8px;color:#777;width:100%;text-align:center">'
        'Deutsch mit Dennis · deutsch-mit-dennis.de · created by D.Prudnikau · Seite <span class="pageNumber"></span>/<span class="totalPages"></span></div>'
    )
    with sync_playwright() as p:
        b = p.chromium.launch(
            **({"executable_path": exe} if exe and os.path.exists(exe) else {})
        )
        pg = b.new_page()
        pg.goto(tmp.as_uri(), wait_until="networkidle")
        pg.pdf(
            path=str(OUT),
            format="A4",
            display_header_footer=True,
            header_template="<span></span>",
            footer_template=footer,
            margin={"top": "16mm", "bottom": "18mm", "left": "16mm", "right": "16mm"},
            print_background=True,
        )
        b.close()
    tmp.unlink()
    print(OUT, OUT.stat().st_size // 1024, "KB")


if __name__ == "__main__":
    main()
