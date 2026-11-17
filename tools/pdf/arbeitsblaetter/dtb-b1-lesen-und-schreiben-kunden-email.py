# Arbeitsblatt DTB B1 Prüfung: Lesen und Schreiben – eine Kunden-E-Mail verstehen und beantworten
# Format laut pruefung-fakten.js (dtb-b1) und sim/dtb-b1*.js: 20 Min.; Teil 1 = Aufgaben 19–20 (a/b/c, je 3 Punkte, zählen zu Lesen),
# Teil 2 = Antwort-E-Mail mit allen Punkten aus der Notiz der Chefin / des Chefs, mindestens 70 Wörter (zählt zu Schreiben).
# Eigene Texte im Stil der Prüfung, keine Originalaufgaben. Firmen und Personen sind erfunden.
# Aufruf aus dem Repo-Wurzelordner: python3 tools/pdf/arbeitsblaetter/dtb-b1-lesen-und-schreiben-kunden-email.py
import os, sys

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from arbeitsblatt_lib import *
from arbeitsblatt_lib import fallback, R as _R, table as _table
from reportlab.lib.styles import ParagraphStyle
from reportlab.platypus import Table, TableStyle, CondPageBreak

SLUG = "dtb-b1-lesen-und-schreiben-kunden-email"
TITLE = "DTB B1 Lesen und Schreiben: auf eine Kunden-E-Mail antworten"
LEVEL = "B1"
K = lambda t: f'<b><font color="#2341B5">{t}</font></b>'  # Redemittel


def R(h, s="p"):
    return _R(fallback(h), s)


def table(rows, widths, head=True):
    return _table(
        [[fallback(c) if isinstance(c, str) else c for c in r] for r in rows],
        widths,
        head,
    )


st["mat"] = ParagraphStyle("mat", parent=st["cell"], fontSize=9.6, leading=12.4)
st["sol"] = ParagraphStyle(
    "sol", parent=st["item"], fontSize=10, leading=13, spaceAfter=2
)
st["solh"] = ParagraphStyle(
    "solh", parent=st["h3"], fontSize=10.5, leading=13, spaceBefore=5, spaceAfter=2
)
st["tip"] = ParagraphStyle(
    "tip",
    parent=st["cell"],
    fontSize=9.5,
    leading=11.8,
    leftIndent=10,
    firstLineIndent=-10,
    spaceAfter=2,
)

BOX = sym("☐")


def tips_traps(title, tips, traps):
    left = [R("<b>So gehen Sie vor</b>", "cell")] + [
        R(f"{i}. {t}", "tip") for i, t in enumerate(tips, 1)
    ]
    right = [R('<b><font color="#C2362B">Achtung, Falle!</font></b>', "cell")] + [
        R(f"– {t}", "tip") for t in traps
    ]
    t = Table([[left, right]], colWidths=[96 * mm, 78 * mm])
    t.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (0, 0), HELLGRUEN),
                ("BACKGROUND", (1, 0), (1, 0), NOTE),
                ("LINEBEFORE", (0, 0), (0, 0), 3, GRUEN),
                ("LINEBEFORE", (1, 0), (1, 0), 3, GELB),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LEFTPADDING", (0, 0), (-1, -1), 8),
                ("RIGHTPADDING", (0, 0), (-1, -1), 8),
                ("TOPPADDING", (0, 0), (-1, -1), 5),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 4),
            ]
        )
    )
    return KeepTogether([R(title, "h2"), t])


def abc(nr, q, opts):
    row = [
        R(f'<font color="#566078">{BOX}</font> {l}) {o}', "tip")
        for l, o in zip("abc", opts)
    ]
    t = Table([row], colWidths=[56 * mm] * 3, hAlign="RIGHT")
    t.setStyle(
        TableStyle(
            [
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LEFTPADDING", (0, 0), (-1, -1), 2),
                ("RIGHTPADDING", (0, 0), (-1, -1), 4),
                ("TOPPADDING", (0, 0), (-1, -1), 0),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 3),
            ]
        )
    )
    return KeepTogether([R(f"<b>{nr}.</b> {q}", "item"), t])


def sbox(paras, bg=SOFT, first=True, last=True, style="mat"):
    """Box that may break across pages: one table row per paragraph."""
    t = Table([[R(p, style)] for p in paras], colWidths=[174 * mm])
    t.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, -1), bg),
                ("LEFTPADDING", (0, 0), (-1, -1), 10),
                ("RIGHTPADDING", (0, 0), (-1, -1), 10),
                ("TOPPADDING", (0, 0), (-1, -1), 1.5),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 1.5),
                ("TOPPADDING", (0, 0), (-1, 0), 7 if first else 1.5),
                ("BOTTOMPADDING", (0, -1), (-1, -1), 7 if last else 1.5),
            ]
        )
    )
    return t


def mail_and_note(mail, note):
    """Customer e-mail (left, blue) and the boss's note (right, yellow) side by side."""
    left = [R(p, "mat") for p in mail]
    right = [R(p, "mat") for p in note]
    t = Table([[left, right]], colWidths=[108 * mm, 66 * mm])
    t.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (0, 0), SOFT),
                ("BACKGROUND", (1, 0), (1, 0), NOTE),
                ("LINEBEFORE", (1, 0), (1, 0), 3, GELB),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LEFTPADDING", (0, 0), (-1, -1), 8),
                ("RIGHTPADDING", (0, 0), (-1, -1), 8),
                ("TOPPADDING", (0, 0), (-1, -1), 6),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 6),
            ]
        )
    )
    return t


def checklist(items):
    half = (len(items) + 1) // 2
    a, b = items[:half], items[half:] + [""] * (2 * half - len(items))
    ct = Table(
        [
            [R(f"{BOX} {x}", "tip"), R(f"{BOX} {y}" if y else "", "tip")]
            for x, y in zip(a, b)
        ],
        colWidths=[85 * mm, 85 * mm],
    )
    ct.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, -1), SOFT),
                ("LEFTPADDING", (0, 0), (-1, -1), 8),
                ("TOPPADDING", (0, 0), (-1, -1), 1.5),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 1.5),
                ("TOPPADDING", (0, 0), (-1, 0), 6),
                ("BOTTOMPADDING", (0, -1), (-1, -1), 6),
            ]
        )
    )
    return KeepTogether(
        [R("<b>Checkliste – haken Sie nach dem Schreiben ab:</b>", "p"), ct]
    )


# ───────────────────────── Kopf + Überblick ─────────────────────────
s = [
    R("B1 · Prüfung DTB · Arbeitsblatt", "kick"),
    R("Auf eine Kunden-E-Mail antworten", "h1"),
    R(
        "Eine Kundin hat ein Problem und eine Frage, Ihre Chefin hat Ihnen eine Notiz geschrieben. Sie verstehen beides und "
        "schreiben die Antwort – genau wie im Büro. Mit zwei Übungssätzen im Stil der Prüfung.",
        "lead",
    ),
    R("So läuft der Teil", "h2"),
    table(
        [
            ["<b>Teil</b>", "<b>Was Sie tun</b>", "<b>Punkte</b>"],
            [
                "<b>Lesen und Schreiben Teil 1:</b> Eine Kundenanfrage verstehen",
                "Sie lesen die E-Mail einer Kundin oder eines Kunden und eine Notiz Ihrer Chefin oder Ihres Chefs. "
                "Dazu lösen Sie 2 Aufgaben (19 und 20) mit a, b oder c.",
                "2 × 3 (zählen zu Lesen)",
            ],
            [
                "<b>Lesen und Schreiben Teil 2:</b> Eine Antwort-E-Mail schreiben",
                "Sie schreiben die Antwort an die Kundin / den Kunden. Alle Punkte aus der Notiz müssen in die E-Mail. "
                "<b>Mindestens 70 Wörter</b>, mit Anrede und Gruß.",
                "zählt zu Schreiben",
            ],
        ],
        [52, 92, 30],
    ),
    Spacer(1, 3),
    box(
        R(
            "<b>Zeit: 20 Minuten für beide Teile.</b> Die Aufgaben 19 und 20 sind schnell gelöst – planen Sie etwa 5 Minuten "
            "dafür ein. Den Rest der Zeit brauchen Sie für die Antwort-E-Mail und die Kontrolle am Ende.",
            "cell",
        ),
        NOTE,
        GELB,
    ),
]

s += [
    tips_traps(
        "Strategie: von der Notiz zur E-Mail",
        [
            "Kunden-E-Mail lesen: Was ist das <b>Problem</b>? Was möchte die Person <b>zusätzlich</b> wissen oder bestellen?",
            "Notiz lesen und jeden Punkt nummerieren (1, 2, 3, 4). Das ist Ihre Checkliste.",
            "Aus jedem Punkt der Notiz machen Sie einen ganzen, höflichen Satz – in derselben Reihenfolge.",
            "Zahlen, Tage, Uhrzeiten und Telefonnummern genau abschreiben.",
            "Am Ende: Punkte abhaken, Wörter grob zählen (mind. 70).",
        ],
        [
            "Ein Punkt der Notiz fehlt – oft die Telefonnummer oder die Bitte um Bestätigung.",
            "Den Notizstil abschreiben („Samstag: Dezember nein“) statt ganze Sätze.",
            "Interne Informationen wörtlich weitergeben („Meine Chefin sagt, …“).",
            "Die Kundin will nicht kündigen, aber eine Option behauptet das.",
        ],
    )
]

# ───────────────────────── Aufbau + Redemittel ─────────────────────────
s += (
        [
            R("Aufbau und Redemittel – Baustein für Baustein", "h2"),
            table(
                [
                    ["<b>Baustein</b>", "<b>Redemittel</b>"],
                    [
                        "<b>Betreff</b>",
                        f"{K('Ihre E-Mail vom …')} · {K('Ihre Anfrage zu …')} · {K('Re: …')}",
                    ],
                    [
                        "<b>Anrede</b>",
                        f"{K('Sehr geehrte Frau …,')} · {K('Sehr geehrter Herr …,')} (danach klein weiterschreiben)",
                    ],
                    [
                        "<b>Dank / Bezug</b>",
                        f"{K('vielen Dank für Ihre E-Mail.')} · {K('Danke, dass Sie uns informiert haben.')}",
                    ],
                    [
                        "<b>Entschuldigung + Grund</b>",
                        f"{K('Es tut uns sehr leid, dass …')} · {K('Bitte entschuldigen Sie …')} · "
                        f"{K('Leider war unser Mitarbeiter krank.')} · {K('Der Grund war, dass …')}",
                    ],
                    [
                        "<b>Lösung / Angebot</b>",
                        f"{K('Wir möchten Ihnen gern … anbieten.')} · {K('Wir kommen am … um … Uhr.')} · "
                        f"{K('Als kleine Entschuldigung …')}",
                    ],
                    [
                        "<b>Antwort auf die Frage</b>",
                        f"{K('Zu Ihrer Frage nach …:')} · {K('Das ist leider erst ab … möglich.')} · "
                        f"{K('Gern schicken wir Ihnen ein Angebot.')}",
                    ],
                    [
                        "<b>Bitte</b>",
                        f"{K('Bitte sagen Sie uns kurz, ob …')} · {K('Könnten Sie uns bitte bestätigen, dass …?')}",
                    ],
                    [
                        "<b>Kontakt + Schluss</b>",
                        f"{K('Bei Fragen erreichen Sie … unter …')} · {K('Wir freuen uns auf Ihre Antwort.')}",
                    ],
                    [
                        "<b>Gruß</b>",
                        f"{K('Mit freundlichen Grüßen')} · Vorname Nachname · Firma",
                    ],
                ],
                [40, 134],
            ),
        ]
)

s += task(
    1,
    "Aus der Notiz wird ein Satz",
    "Schreiben Sie die Stichpunkte als ganze, höfliche Sätze an einen Kunden. Benutzen Sie die Redemittel oben.",
    1,
)
u1 = [
    "Fehler in der Rechnung – Entschuldigung!",
    "neuer Termin: Mi., 9 Uhr – passt das?",
    "Mitarbeiter war krank",
    "Lieferung am Samstag: erst ab Februar",
    "Angebot kommt nächste Woche per Post",
    "bei Fragen: Herr Weiß, Tel. 0211 / 55 40 12",
]
for i, t in enumerate(u1, 1):
    s += [KeepTogether([R(f"{i}. <i>{t}</i>", "item"), lines(1)])]

# ───────────────────────── Übungssatz A ─────────────────────────
mailA = [
    "<b>E-Mail von Herrn Okonkwo</b>",
    "Von: Chinedu Okonkwo · An: info@holzwerk-brinkmann.de<br/>Betreff: Montage am Dienstag",
    "Sehr geehrte Damen und Herren,",
    "Ende Oktober habe ich bei Ihnen einen Einbauschrank für unser Schlafzimmer bestellt. Die Montage war für Dienstag, 8 Uhr, "
    "geplant. Ich habe mir extra freigenommen und bis 11 Uhr gewartet – aber niemand ist gekommen. Angerufen hat auch niemand. "
    "Darüber habe ich mich sehr geärgert.",
    "Außerdem möchte ich fragen, ob Sie auch ein passendes Regal für das Kinderzimmer bauen können.",
    "Bitte melden Sie sich bald.",
    "Mit freundlichen Grüßen<br/>Chinedu Okonkwo",
]
noteA = [
    "<b>Notiz Ihres Chefs</b>",
    "Bitte heute noch an Herrn Okonkwo schreiben!",
    "– entschuldigen: Monteur hatte am Dienstag eine Autopanne, Büro hat den Anruf vergessen<br/>"
    "– neuer Termin: Do., 14 Uhr – bitte bestätigen lassen<br/>"
    "– Regal: ja, machen wir! Frau Lehmann kommt beim Termin zum Ausmessen mit, Angebot danach<br/>"
    "– Montage für ihn diesmal kostenlos<br/>"
    "– Fragen: mich anrufen, 0521 / 88 36 07",
    "K. Brinkmann",
]
s += task(
    2,
    "Übungssatz A: Tischlerei",
    "Sie arbeiten im Büro der Tischlerei Holzwerk Brinkmann in Bielefeld. Lesen Sie die E-Mail eines Kunden und die "
    "Notiz Ihres Chefs. Lösen Sie die Aufgaben 19 und 20. Welche Antwort (a, b oder c) passt am besten?",
    2,
)
s += [
    mail_and_note(mailA, noteA),
    Spacer(1, 4),
    abc(
        19,
        "Warum schreibt Herr Okonkwo?",
        [
            "Der Schrank ist kaputt angekommen.",
            "Der Monteur ist nicht zum Termin gekommen.",
            "Er möchte seine Bestellung zurückgeben.",
        ],
    ),
    abc(
        20,
        "Was möchte Herr Okonkwo außerdem?",
        [
            "ein Regal für das Kinderzimmer",
            "einen zweiten Schrank",
            "einen Termin am Wochenende",
        ],
    ),
    Spacer(1, 3),
]
s += [
    KeepTogether(
        [
            R(
                "<b>Teil 2 – Antwort planen:</b> Schreiben Sie zu jedem Punkt der Notiz zuerst einen Satz.",
                "p",
            ),
            table(
                [["<b>Punkt der Notiz</b>", "<b>Mein Satz für Herrn Okonkwo</b>"]]
                + [
                    [f"<b>{i}</b> {p}", ""]
                    for i, p in enumerate(
                        [
                            "Entschuldigung + Grund",
                            "neuer Termin + Bitte um Bestätigung",
                            "Regal: Ausmessen, Angebot",
                            "Montage kostenlos",
                            "Kontakt für Fragen",
                        ],
                        1,
                    )
                ],
                [52, 122],
            ),
        ]
    )
]
s += [
    R(
        "Schreiben Sie jetzt die ganze E-Mail (mindestens 70 Wörter) auf ein extra Blatt – mit Betreff, Anrede und Gruß.",
        "small",
    )
]

# ───────────────────────── Übungssatz B ─────────────────────────
mailB = [
    "<b>E-Mail von Frau Szymańska</b>",
    "Von: Ewa Szymańska, Restaurant Bernstein · An: service@frischwerk-textil.de<br/>Betreff: Tischdecken und Rechnung",
    "Sehr geehrte Damen und Herren,",
    "seit einem Jahr waschen Sie unsere Tischdecken, und wir sind sehr zufrieden. Letzte Woche kamen die sauberen Tischdecken "
    "aber erst am Freitagabend, nicht wie immer am Donnerstag. Wir hatten am Freitagmittag eine große Feier und mussten "
    "Tischdecken kaufen. Außerdem haben Sie uns in der Rechnung vom 3. November die Lieferung zweimal berechnet.",
    "Noch eine Frage: Können Sie in Zukunft auch die Kochjacken für unser Küchenteam waschen?",
    "Mit freundlichen Grüßen<br/>Ewa Szymańska",
]
noteB = [
    "<b>Notiz Ihrer Chefin</b>",
    "Bitte antworten Sie Frau Szymańska – wichtige Kundin!",
    "– entschuldigen: unser Lieferwagen war kaputt<br/>"
    "– Rechnung: unser Fehler, neue Rechnung kommt diese Woche per Post<br/>"
    "– als Entschuldigung: nächste Wäsche 20 % billiger<br/>"
    "– Kochjacken: ja, 2,50 € pro Stück, wir holen sie montags mit den Tischdecken ab<br/>"
    "– Fragen: Herr Ito, Tel. 0231 / 47 19 30",
    "D. Kühn",
]
s += task(
    3,
    "Übungssatz B: Textilreinigung",
    "Sie arbeiten im Kundenservice der Textilreinigung Frischwerk in Dortmund. Lesen Sie die E-Mail einer Kundin und die "
    "Notiz Ihrer Chefin. Lösen Sie die Aufgaben 19 und 20. Schreiben Sie dann die Antwort (mindestens 70 Wörter). "
    "Stoppen Sie die Zeit: 20 Minuten.",
    3,
)
s += [
    mail_and_note(mailB, noteB),
    Spacer(1, 4),
    abc(
        19,
        "Was ist das Problem von Frau Szymańska?",
        [
            "Die Tischdecken waren nicht sauber.",
            "Die Lieferung kam zu spät und die Rechnung ist falsch.",
            "Sie möchte den Vertrag beenden.",
        ],
    ),
    abc(
        20,
        "Was fragt Frau Szymańska?",
        [
            "ob Frischwerk auch Arbeitskleidung wäscht",
            "ob sie neue Tischdecken kaufen kann",
            "ob die Lieferung am Freitag möglich ist",
        ],
    ),
    Spacer(1, 3),
    R("<b>Teil 2 – Ihre Antwort-E-Mail:</b>", "p"),
    lines(12, indent=0),
    Spacer(1, 4),
]
s += [
    checklist(
        [
            "Betreff, Anrede, Gruß mit Name und Firma",
            "Dank für die E-Mail und Entschuldigung",
            "Grund: Lieferwagen kaputt",
            "Rechnung: Fehler, neue Rechnung per Post",
            "20 % Rabatt auf die nächste Wäsche",
            "Kochjacken: ja, 2,50 € pro Stück, Abholung montags",
            "Kontakt: Herr Ito, Telefonnummer",
            "Sie-Form, ganze Sätze, mind. 70 Wörter",
        ]
    )
]

# ───────────────────────── Lösungen ─────────────────────────
s += [
    PageBreak(),
    R("Lösungen mit Begründung", "h2"),
    R(
        "Zum Selbstkontrollieren – erst üben, dann nachschauen! "
        "Bei den Sätzen und E-Mails sind auch andere Formulierungen richtig.",
        "small",
    ),
]
s += [R("Übung 1 · Mögliche Sätze", "solh")] + [
    R(t, "sol")
    for t in [
        "1. Es tut uns sehr leid, dass in unserer Rechnung ein Fehler war.",
        "2. Wir möchten Ihnen einen neuen Termin anbieten: Mittwoch um 9 Uhr. Bitte sagen Sie uns kurz, ob Ihnen das passt.",
        "3. Leider war unser Mitarbeiter krank.",
        "4. Eine Lieferung am Samstag ist leider erst ab Februar möglich.",
        "5. Unser Angebot schicken wir Ihnen nächste Woche per Post.",
        "6. Bei Fragen erreichen Sie Herrn Weiß unter 0211 / 55 40 12.",
    ]
]
s += [R("Übungssatz A · Teil 1", "solh")] + [
    R(t, "sol")
    for t in [
        "<b>19 b</b> – „bis 11 Uhr gewartet – aber niemand ist gekommen“. a) Vom Schrank selbst sagt er nichts. "
        "c) Er ärgert sich, aber er will nichts zurückgeben – er möchte sogar noch etwas bestellen.",
        "<b>20 a</b> – „ein passendes Regal für das Kinderzimmer“.",
    ]
]
s += [
    KeepTogether(
        [
            R("Übungssatz A · Teil 2 – Mustertext (ca. 110 Wörter)", "solh"),
            sbox(
                [
                    "<b>Betreff:</b> Ihre E-Mail – Montage Ihres Einbauschranks",
                    "Sehr geehrter Herr Okonkwo,",
                    "vielen Dank für Ihre E-Mail. Es tut uns sehr leid, dass am Dienstag niemand zu Ihnen gekommen ist. Unser Monteur hatte "
                    "leider eine Autopanne, und wir haben vergessen, Sie anzurufen. Bitte entschuldigen Sie das.",
                    "Wir möchten Ihnen gern einen neuen Termin anbieten, und zwar am Donnerstag um 14 Uhr. Bitte bestätigen Sie uns kurz, "
                    "ob Ihnen der Termin passt. Die Montage ist für Sie diesmal natürlich kostenlos.",
                    "Ein Regal für das Kinderzimmer bauen wir sehr gern. Unsere Kollegin Frau Lehmann kommt am Donnerstag mit und misst "
                    "alles aus. Danach schicken wir Ihnen ein Angebot.",
                    "Bei Fragen können Sie Herrn Brinkmann gern unter 0521 / 88 36 07 anrufen.",
                    "Mit freundlichen Grüßen<br/>Samira Haddad<br/>Tischlerei Holzwerk Brinkmann",
                ],
                HELLGRUEN,
            ),
        ]
    )
]
s += [R("Übungssatz B · Teil 1", "solh")] + [
    R(t, "sol")
    for t in [
        "<b>19 b</b> – Lieferung am Freitag statt am Donnerstag und die Lieferung doppelt in der Rechnung. "
        "a) Sie ist „sehr zufrieden“ mit der Wäsche. c) Von einer Kündigung schreibt sie nichts.",
        "<b>20 a</b> – Kochjacken sind Arbeitskleidung. b) Sie musste Tischdecken kaufen, aber das ist keine Frage.",
    ]
]
s += [
    KeepTogether(
        [
            R("Übungssatz B · Teil 2 – Mustertext (ca. 115 Wörter)", "solh"),
            sbox(
                [
                    "<b>Betreff:</b> Ihre E-Mail – Lieferung und Rechnung vom 3. November",
                    "Sehr geehrte Frau Szymańska,",
                    "vielen Dank für Ihre E-Mail und Ihr Vertrauen. Es tut uns sehr leid, dass die Tischdecken letzte Woche zu spät "
                    "gekommen sind. Leider war unser Lieferwagen kaputt. Auch in der Rechnung war ein Fehler, das war unser Fehler. "
                    "Eine neue Rechnung schicken wir Ihnen noch diese Woche per Post.",
                    "Als kleine Entschuldigung ist Ihre nächste Wäsche 20 Prozent billiger.",
                    "Zu Ihrer Frage: Wir waschen sehr gern auch die Kochjacken für Ihr Küchenteam. Das kostet 2,50 Euro pro Stück. "
                    "Wir holen die Jacken montags zusammen mit den Tischdecken ab.",
                    "Wenn Sie Fragen haben, erreichen Sie meinen Kollegen Herrn Ito unter 0231 / 47 19 30.",
                    "Mit freundlichen Grüßen<br/>Jonas Petersen<br/>Textilreinigung Frischwerk",
                ],
                HELLGRUEN,
            ),
        ]
    )
]

if __name__ == "__main__":
    build(SLUG, TITLE, LEVEL, s)
