# A1-Wortliste nach Alltagsthemen (für den Start in Deutschland) + Karteikarten zum Ausschneiden
# Aufruf aus dem Repo-Wurzelordner: py -X utf8 tools/pdf/arbeitsblaetter/a1-wortliste-alltagsthemen.py
# Gleiche Datenstruktur (THEMEN / KARTEN / KURZ) wie b2-wortliste-pruefungsthemen.py -> gleicher Karteikarten-Export.
import os, sys

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from arbeitsblatt_lib import *
from arbeitsblatt_lib import LINE, MUTED, TINTE
from reportlab.platypus import Table, TableStyle
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.enums import TA_CENTER

SLUG = "a1-wortliste-alltagsthemen"
TITLE = "A1-Wortliste nach Alltagsthemen"
LEVEL = "A1"

ART = {"der": "#2341B5", "die": "#C2362B", "das": "#1D7A45"}
N = lambda t: f'<b><font color="#2341B5">{t}</font></b>'  # Nomen in Wendungen
V = lambda t: f'<b><font color="#C2362B">{t}</font></b>'  # Verb in Wendungen

# Eintrag: (Wortart, Wort, Formen, Beispielsatz)
# N = Nomen (Artikel + Plural), V = Verb (Präsens 3. Pers. + Perfekt), A = Adjektiv (Gegenteil / Rektion)
THEMEN = [
    ("Ich und meine Familie", [
        ("N", "die Familie", "die Familien", "Meine Familie ist sehr groß."),
        ("N", "der Name", "die Namen", "Mein Name ist Amira Haddad."),
        ("N", "die Adresse", "die Adressen", "Wie ist Ihre Adresse?"),
        ("N", "die Mutter", "die Mütter", "Meine Mutter heißt Elena."),
        ("N", "der Vater", "die Väter", "Mein Vater ist 60 Jahre alt."),
        ("N", "die Eltern", "nur Plural", "Meine Eltern wohnen in der Türkei."),
        ("N", "der Bruder", "die Brüder", "Ich habe zwei Brüder."),
        ("N", "die Schwester", "die Schwestern", "Meine Schwester ist Lehrerin."),
        ("N", "das Kind", "die Kinder", "Wir haben drei Kinder."),
        ("N", "der Sohn", "die Söhne", "Mein Sohn ist acht Jahre alt."),
        ("N", "die Tochter", "die Töchter", "Unsere Tochter geht in die Schule."),
        ("N", "der Mann", "die Männer", "Mein Mann arbeitet bei der Post."),
        ("N", "die Frau", "die Frauen", "Das ist meine Frau Mariam."),
        ("V", "heißen", "heißt · hat geheißen", "Ich heiße Kofi."),
        ("V", "wohnen", "wohnt · hat gewohnt", "Wir wohnen in Leipzig."),
        ("V", "kommen (aus + Dat.)", "kommt · <b>ist</b> gekommen", "Ich komme aus Afghanistan."),
        ("V", "sprechen", "spricht · hat gesprochen", "Sie spricht Arabisch und Deutsch."),
        ("A", "verheiratet", "Gegenteil: ledig", "Ich bin verheiratet."),
    ], [
        (f"{N('Geburtstag')} {V('haben')}", "Heute habe ich Geburtstag."),
        (f"{N('Deutsch')} {V('lernen')}", "Ich lerne seit drei Monaten Deutsch."),
        (f"eine {N('Frage')} {V('haben')}", "Entschuldigung, ich habe eine Frage."),
    ]),
    ("Wohnen", [
        ("N", "die Wohnung", "die Wohnungen", "Die Wohnung ist klein, aber schön."),
        ("N", "das Haus", "die Häuser", "Wir wohnen in einem Haus."),
        ("N", "das Zimmer", "die Zimmer", "Die Wohnung hat drei Zimmer."),
        ("N", "die Küche", "die Küchen", "Die Küche ist neu."),
        ("N", "das Bad", "die Bäder", "Das Bad ist rechts."),
        ("N", "das Schlafzimmer", "die Schlafzimmer", "Das Schlafzimmer ist sehr hell."),
        ("N", "der Balkon", "die Balkone", "Wir haben einen Balkon."),
        ("N", "die Miete", "die Mieten", "Die Miete ist 600 Euro."),
        ("N", "der Tisch", "die Tische", "Der Tisch steht in der Küche."),
        ("N", "der Stuhl", "die Stühle", "Wir brauchen vier Stühle."),
        ("N", "das Bett", "die Betten", "Das Bett ist sehr bequem."),
        ("N", "der Schrank", "die Schränke", "Der Schrank ist zu groß."),
        ("N", "der Schlüssel", "die Schlüssel", "Wo ist mein Schlüssel?"),
        ("N", "der Nachbar", "die Nachbarn", "Mein Nachbar heißt Herr Nowak."),
        ("V", "mieten", "mietet · hat gemietet", "Wir mieten eine Wohnung."),
        ("V", "suchen", "sucht · hat gesucht", "Ich suche ein Zimmer."),
        ("V", "putzen", "putzt · hat geputzt", "Am Samstag putze ich das Bad."),
        ("A", "groß", "Gegenteil: klein", "Das Zimmer ist groß und hell."),
        ("A", "teuer", "Gegenteil: billig", "Die Wohnung ist zu teuer."),
    ], [
        (f"die {N('Miete')} {V('bezahlen')}", "Ich bezahle die Miete am Monatsanfang."),
        (f"den {N('Müll')} {V('wegbringen')}", "Kannst du bitte den Müll wegbringen?"),
        (f"das {N('Licht')} {V('anmachen')}", "Mach bitte das Licht an."),
    ]),
    ("Essen und Trinken", [
        ("N", "das Brot", "die Brote", "Ich kaufe ein Brot."),
        ("N", "das Brötchen", "die Brötchen", "Zum Frühstück esse ich zwei Brötchen."),
        ("N", "der Käse", "meist ohne Plural", "Ich esse gern Käse."),
        ("N", "die Milch", "ohne Plural", "Die Milch ist im Kühlschrank."),
        ("N", "das Ei", "die Eier", "Möchtest du ein Ei?"),
        ("N", "das Fleisch", "ohne Plural", "Ich esse kein Fleisch."),
        ("N", "das Gemüse", "ohne Plural", "Gemüse ist gesund."),
        ("N", "das Obst", "ohne Plural", "Ich esse jeden Tag Obst."),
        ("N", "der Apfel", "die Äpfel", "Der Apfel ist rot."),
        ("N", "die Kartoffel", "die Kartoffeln", "Heute kochen wir Kartoffeln."),
        ("N", "das Wasser", "ohne Plural", "Ein Glas Wasser, bitte."),
        ("N", "der Kaffee", "die Kaffees", "Trinken Sie Kaffee oder Tee?"),
        ("N", "das Frühstück", "die Frühstücke", "Das Frühstück ist um sieben Uhr."),
        ("N", "das Restaurant", "die Restaurants", "Das Restaurant ist am Montag geschlossen."),
        ("V", "essen", "isst · hat gegessen", "Was isst du gern?"),
        ("V", "trinken", "trinkt · hat getrunken", "Ich trinke Tee mit Zucker."),
        ("V", "kochen", "kocht · hat gekocht", "Heute koche ich eine Suppe."),
        ("V", "bestellen", "bestellt · hat bestellt", "Ich bestelle eine Pizza."),
        ("A", "satt", "Gegenteil: hungrig", "Danke, ich bin satt."),
    ], [
        (f"{N('Hunger')} {V('haben')}", "Ich habe großen Hunger."),
        (f"{N('Durst')} {V('haben')}", "Hast du Durst?"),
        (f"{N('Frühstück')} {V('machen')}", "Am Sonntag macht Papa Frühstück."),
    ]),
    ("Einkaufen", [
        ("N", "der Supermarkt", "die Supermärkte", "Der Supermarkt ist bis 20 Uhr offen."),
        ("N", "die Bäckerei", "die Bäckereien", "Die Bäckerei ist neben der Bank."),
        ("N", "das Geschäft", "die Geschäfte", "Das Geschäft ist am Sonntag zu."),
        ("N", "der Preis", "die Preise", "Der Preis ist gut."),
        ("N", "der Euro", "die Euro", "Das kostet drei Euro."),
        ("N", "das Geld", "ohne Plural", "Ich habe kein Geld dabei."),
        ("N", "die Kasse", "die Kassen", "Bitte zahlen Sie an der Kasse."),
        ("N", "die Tüte", "die Tüten", "Brauchen Sie eine Tüte?"),
        ("N", "die Flasche", "die Flaschen", "Ich nehme zwei Flaschen Wasser."),
        ("N", "das Kilo", "die Kilos", "Ein Kilo Tomaten, bitte."),
        ("N", "die Hose", "die Hosen", "Die Hose ist zu lang."),
        ("N", "die Jacke", "die Jacken", "Die Jacke kostet 50 Euro."),
        ("N", "der Schuh", "die Schuhe", "Ich brauche neue Schuhe."),
        ("V", "kaufen", "kauft · hat gekauft", "Ich kaufe Brot und Milch."),
        ("V", "kosten", "kostet · hat gekostet", "Was kostet das?"),
        ("V", "bezahlen", "bezahlt · hat bezahlt", "Kann ich bar bezahlen?"),
        ("V", "brauchen", "braucht · hat gebraucht", "Wir brauchen noch Eier."),
        ("A", "billig", "Gegenteil: teuer", "Die Äpfel sind heute billig."),
    ], [
        (f"mit {N('Karte')} {V('bezahlen')}", "Ich bezahle mit Karte."),
        (f"eine {N('Hose')} {V('anprobieren')}", "Kann ich die Hose anprobieren?"),
        (f"an der {N('Kasse')} {V('warten')}", "Wir warten an der Kasse."),
    ]),
    ("In der Stadt und unterwegs", [
        ("N", "der Bahnhof", "die Bahnhöfe", "Wo ist der Bahnhof?"),
        ("N", "der Bus", "die Busse", "Der Bus kommt um acht Uhr."),
        ("N", "die Haltestelle", "die Haltestellen", "Die Haltestelle ist dort drüben."),
        ("N", "der Zug", "die Züge", "Der Zug fährt nach Köln."),
        ("N", "die Fahrkarte", "die Fahrkarten", "Ich brauche eine Fahrkarte."),
        ("N", "das Auto", "die Autos", "Mein Auto ist kaputt."),
        ("N", "das Fahrrad", "die Fahrräder", "Ich fahre mit dem Fahrrad."),
        ("N", "die Straße", "die Straßen", "Ich wohne in der Goethestraße."),
        ("N", "die Ampel", "die Ampeln", "An der Ampel gehen Sie links."),
        ("N", "die Bank", "die Banken", "Die Bank ist neben der Post."),
        ("N", "die Post", "meist ohne Plural", "Ich gehe zur Post."),
        ("N", "der Weg", "die Wege", "Ist der Weg weit?"),
        ("V", "fahren", "fährt · <b>ist</b> gefahren", "Wir fahren mit dem Zug."),
        ("V", "gehen", "geht · <b>ist</b> gegangen", "Ich gehe nach Hause."),
        ("V", "abfahren", "fährt ab · <b>ist</b> abgefahren", "Der Zug fährt um 9 Uhr ab."),
        ("V", "ankommen", "kommt an · <b>ist</b> angekommen", "Wann kommt der Bus an?"),
        ("V", "umsteigen", "steigt um · <b>ist</b> umgestiegen", "In Hamburg steigen Sie um."),
        ("A", "weit", "Gegenteil: nah", "Der Bahnhof ist nicht weit."),
    ], [
        (f"zu {N('Fuß')} {V('gehen')}", "Ich gehe zu Fuß zur Arbeit."),
        (f"mit dem {N('Bus')} {V('fahren')}", "Fährst du mit dem Bus?"),
        (f"eine {N('Fahrkarte')} {V('kaufen')}", "Die Fahrkarte kaufe ich am Automaten."),
    ]),
    ("Arbeit und Termine", [
        ("N", "die Arbeit", "meist ohne Plural", "Die Arbeit beginnt um sieben Uhr."),
        ("N", "der Beruf", "die Berufe", "Was sind Sie von Beruf?"),
        ("N", "die Firma", "die Firmen", "Ich arbeite bei einer Firma in Bremen."),
        ("N", "der Kollege / die Kollegin", "die Kollegen / die Kolleginnen", "Meine Kollegen sind sehr nett."),
        ("N", "der Chef / die Chefin", "die Chefs / die Chefinnen", "Die Chefin heißt Frau Yilmaz."),
        ("N", "der Termin", "die Termine", "Ich habe morgen einen Termin."),
        ("N", "die Uhr", "die Uhren", "Wie viel Uhr ist es?"),
        ("N", "die Stunde", "die Stunden", "Ich arbeite acht Stunden am Tag."),
        ("N", "die Woche", "die Wochen", "Nächste Woche habe ich frei."),
        ("N", "das Wochenende", "die Wochenenden", "Am Wochenende arbeite ich nicht."),
        ("N", "der Montag", "die Montage", "Am Montag habe ich Deutschkurs."),
        ("N", "der Kurs", "die Kurse", "Der Kurs beginnt um neun Uhr."),
        ("N", "der Kalender", "die Kalender", "Der Termin steht im Kalender."),
        ("V", "arbeiten", "arbeitet · hat gearbeitet", "Ich arbeite im Krankenhaus."),
        ("V", "anfangen", "fängt an · hat angefangen", "Der Film fängt um acht Uhr an."),
        ("V", "anrufen", "ruft an · hat angerufen", "Bitte rufen Sie mich morgen an."),
        ("V", "warten (auf + Akk.)", "wartet · hat gewartet", "Wir warten auf die Chefin."),
        ("A", "pünktlich", "Gegenteil: unpünktlich", "Ich bin immer pünktlich."),
    ], [
        (f"einen {N('Termin')} {V('machen')}", "Ich möchte einen Termin machen."),
        (f"{N('Pause')} {V('machen')}", "Um zwölf machen wir Pause."),
        (f"{N('Urlaub')} {V('haben')}", "Im August habe ich Urlaub."),
    ]),
    ("Gesundheit und Körper", [
        ("N", "der Arzt / die Ärztin", "die Ärzte / die Ärztinnen", "Mein Arzt heißt Dr. Wang."),
        ("N", "die Apotheke", "die Apotheken", "Die Apotheke ist neben dem Supermarkt."),
        ("N", "das Krankenhaus", "die Krankenhäuser", "Er liegt im Krankenhaus."),
        ("N", "das Medikament", "die Medikamente", "Das Medikament hilft gut."),
        ("N", "der Kopf", "die Köpfe", "Mein Kopf ist heiß."),
        ("N", "der Bauch", "die Bäuche", "Hast du Schmerzen im Bauch?"),
        ("N", "der Rücken", "die Rücken", "Mein Rücken tut weh."),
        ("N", "das Auge", "die Augen", "Sie hat blaue Augen."),
        ("N", "die Hand", "die Hände", "Ich wasche mir die Hände."),
        ("N", "der Zahn", "die Zähne", "Ich putze zweimal am Tag die Zähne."),
        ("N", "das Fieber", "ohne Plural", "Das Kind hat Fieber."),
        ("N", "der Schmerz", "die Schmerzen", "Haben Sie Schmerzen?"),
        ("V", "wehtun", "tut weh · hat wehgetan", "Mein Bein tut weh."),
        ("V", "helfen (+ Dat.)", "hilft · hat geholfen", "Können Sie mir helfen?"),
        ("V", "schlafen", "schläft · hat geschlafen", "Ich schlafe heute schlecht."),
        ("A", "krank", "Gegenteil: gesund", "Mein Sohn ist krank."),
        ("A", "müde", "Gegenteil: wach", "Ich bin heute sehr müde."),
    ], [
        (f"zum {N('Arzt')} {V('gehen')}", "Morgen gehe ich zum Arzt."),
        (f"{N('Kopfschmerzen')} {V('haben')}", "Ich habe seit gestern Kopfschmerzen."),
        (f"eine {N('Tablette')} {V('nehmen')}", "Nehmen Sie morgens eine Tablette."),
    ]),
    ("Freizeit und Wetter", [
        ("N", "die Freizeit", "ohne Plural", "Was machst du in der Freizeit?"),
        ("N", "das Hobby", "die Hobbys", "Mein Hobby ist Kochen."),
        ("N", "der Sport", "meist ohne Plural", "Sport ist gesund."),
        ("N", "das Kino", "die Kinos", "Wir gehen heute ins Kino."),
        ("N", "die Musik", "ohne Plural", "Ich höre gern Musik."),
        ("N", "das Buch", "die Bücher", "Das Buch ist sehr gut."),
        ("N", "der Park", "die Parks", "Die Kinder spielen im Park."),
        ("N", "das Wetter", "ohne Plural", "Wie ist das Wetter heute?"),
        ("N", "die Sonne", "meist ohne Plural", "Die Sonne scheint."),
        ("N", "der Regen", "ohne Plural", "Bei Regen bleiben wir zu Hause."),
        ("N", "der Schnee", "ohne Plural", "Im Winter gibt es Schnee."),
        ("N", "der Sommer", "die Sommer", "Im Sommer fahren wir ans Meer."),
        ("V", "spielen", "spielt · hat gespielt", "Spielst du gern Karten?"),
        ("V", "lesen", "liest · hat gelesen", "Ich lese gern Bücher."),
        ("V", "schwimmen", "schwimmt · <b>ist</b> geschwommen", "Im Sommer schwimmen wir im See."),
        ("V", "treffen", "trifft · hat getroffen", "Ich treffe meine Freunde im Café."),
        ("A", "warm", "Gegenteil: kalt", "Heute ist es warm."),
        ("A", "schön", "Gegenteil: hässlich", "Das Wetter ist heute schön."),
    ], [
        (f"{N('Zeit')} {V('haben')}", "Hast du am Samstag Zeit?"),
        (f"{N('Fußball')} {V('spielen')}", "Am Sonntag spielen wir Fußball."),
        (f"{N('Spaß')} {V('machen')}", "Tanzen macht mir viel Spaß."),
    ]),
]

# 24 wichtige Wörter für die Karteikarten: (Thema-Index, Wort genau wie in der Liste)
KARTEN = [
    (0, "die Eltern"), (0, "der Bruder"), (0, "kommen (aus + Dat.)"),
    (1, "das Zimmer"), (1, "der Schlüssel"), (1, "mieten"),
    (2, "das Brötchen"), (2, "das Ei"), (2, "essen"),
    (3, "die Tüte"), (3, "die Flasche"), (3, "kosten"),
    (4, "die Haltestelle"), (4, "die Fahrkarte"), (4, "umsteigen"),
    (5, "der Termin"), (5, "das Wochenende"), (5, "anrufen"),
    (6, "der Zahn"), (6, "die Apotheke"), (6, "wehtun"),
    (7, "das Wetter"), (7, "der Regen"), (7, "schwimmen"),
]

st["wl"] = ParagraphStyle("wl", parent=st["cell"], fontSize=9.5, leading=11.5)
st["wls"] = ParagraphStyle("wls", parent=st["cell"], fontSize=9, leading=11, textColor=MUTED)
st["kf"] = ParagraphStyle("kf", fontName="Atk-B", fontSize=12.5, leading=15, alignment=TA_CENTER)
st["kh"] = ParagraphStyle("kh", fontName="Atk", fontSize=8, leading=10, textColor=MUTED, alignment=TA_CENTER)
st["kb"] = ParagraphStyle("kb", fontName="Atk", fontSize=8.5, leading=10.5, alignment=TA_CENTER)


def wort(kind, w):
    """Wort fett, Artikel farbig (der blau · die rot · das grün)."""
    if kind == "N":
        parts = []
        for chunk in w.split(" / "):
            art, rest = chunk.split(" ", 1)
            sp = '&nbsp;' if len(rest) < 18 else ' '  # sehr lange Wörter dürfen nach dem Artikel umbrechen
            parts.append(f'<font color="{ART[art]}">{art}</font>{sp}{rest}')
        return "<b>" + " / ".join(parts) + "</b>"
    return f"<b>{w}</b>"


def themenblock(nr, name, eintraege, nvv):
    head = [R(f"{nr} · {name}", "h2"),
            R(f"{len(eintraege)} Wörter + {len(nvv)} feste Wendungen · Hake ab, was du sicher kannst.", "small")]
    rows = [[R("", "wl"), R("<b>Wort</b>", "wl"), R("<b>Plural / Formen</b>", "wl"), R("<b>Beispielsatz</b>", "wl")]]
    for kind, w, f, ex in eintraege:
        rows.append([R(sym("☐"), "wl"), R(wort(kind, w), "wl"), R(f, "wls"), R(ex, "wl")])
    t = Table(rows, colWidths=[6 * mm, 47 * mm, 41 * mm, 80 * mm], repeatRows=1)
    t.setStyle(TableStyle([
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LINEBELOW", (0, 0), (-1, -1), 0.4, LINE),
        ("TOPPADDING", (0, 0), (-1, -1), 1.8), ("BOTTOMPADDING", (0, 0), (-1, -1), 1.8),
        ("LEFTPADDING", (0, 0), (-1, -1), 3), ("RIGHTPADDING", (0, 0), (-1, -1), 3),
        ("BACKGROUND", (0, 0), (-1, 0), SOFT),
    ]))
    nv = Table([[R(v, "wl"), R(ex, "wl")] for v, ex in nvv], colWidths=[66 * mm, 88 * mm])
    nv.setStyle(TableStyle([
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LINEBELOW", (0, 0), (-1, -2), 0.4, LINE),
        ("TOPPADDING", (0, 0), (-1, -1), 2), ("BOTTOMPADDING", (0, 0), (-1, -1), 2),
        ("LEFTPADDING", (0, 0), (-1, -1), 0),
    ]))
    nvbox = box([R("Feste Wendungen", "h3"), nv], NOTE, GELB)
    return head + [t, Spacer(1, 6), KeepTogether(nvbox)]


s = [
    R("A1 · Wortschatz · Wortliste zum Lernen", "kick"),
    R(TITLE, "h1"),
    R("Acht Alltagsthemen für den Start in Deutschland – mit Artikel, Plural, Perfekt, kurzem Beispielsatz "
      "und festen Wendungen. Am Ende: 24 Karteikarten zum Ausschneiden.", "lead"),
    box(R(
        f"<b>So lernst du:</b> Nomen immer <b>mit Artikel und Plural</b> "
        f'(<font color="{ART["der"]}"><b>der</b></font> blau · <font color="{ART["die"]}"><b>die</b></font> rot · '
        f'<font color="{ART["das"]}"><b>das</b></font> grün). Verben mit <b>Perfekt</b> – Achtung bei '
        f"<b>ist</b> (kommen, gehen, fahren, ankommen, umsteigen, schwimmen). Lies die Sätze laut, bilde eigene Sätze "
        f"und hake {sym('☐')} ab, was sitzt.",
        "cell"),
        NOTE, GELB),
]
for i, (name, eintraege, nvv) in enumerate(THEMEN, 1):
    if i > 1:
        s.append(PageBreak())
    s += themenblock(i, name, eintraege, nvv)

# ---------- Karteikarten ----------
lookup = {(ti, e[1]): e for ti, (_, es, _) in enumerate(THEMEN) for e in es}


def front(ti, w):
    kind, word, forms, ex = lookup[(ti, w)]
    if kind == "N":
        lemma = word.split(" ", 1)[1]
        frage = "Artikel? Plural?"
    elif kind == "V":
        lemma = word.split(" (")[0]
        frage = "Präposition / Kasus? Perfekt?"
    else:
        lemma = word.split(" (")[0]
        frage = "Bedeutung? Gegenteil?"
    return [R(KURZ[ti], "kh"), Spacer(1, 3), R(lemma, "kf"), Spacer(1, 3), R(frage, "kh")]


def back(ti, w):
    kind, word, forms, ex = lookup[(ti, w)]
    return [R(wort(kind, word), "kb"), R(forms, "kb"), Spacer(1, 2), R(f"<i>{ex}</i>", "kb")]


KURZ = ["Familie", "Wohnen", "Essen und Trinken", "Einkaufen", "Stadt und unterwegs", "Arbeit und Termine",
        "Gesundheit", "Freizeit und Wetter"]
CW, CH = 58 * mm, 28 * mm


def kartenseite(cells_fn, mirror):
    data = []
    for r in range(8):
        row = [cells_fn(*KARTEN[r * 3 + c]) for c in range(3)]
        data.append(row[::-1] if mirror else row)
    t = Table(data, colWidths=[CW] * 3, rowHeights=[CH] * 8)
    t.setStyle(TableStyle([
        ("GRID", (0, 0), (-1, -1), 0.6, MUTED, None, (3, 3)),
        ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
        ("LEFTPADDING", (0, 0), (-1, -1), 5), ("RIGHTPADDING", (0, 0), (-1, -1), 5),
        ("TOPPADDING", (0, 0), (-1, -1), 2), ("BOTTOMPADDING", (0, 0), (-1, -1), 2),
    ]))
    return t


def kartenkopf(titel, hinweis):
    """Gleich hoher Kopf auf Vorder- und Rückseite, damit die Karten beim Duplexdruck deckungsgleich liegen."""
    t = Table([[[R(titel, "h3"), R(hinweis, "small")]]], colWidths=[174 * mm], rowHeights=[17 * mm])
    t.setStyle(TableStyle([("VALIGN", (0, 0), (-1, -1), "TOP"), ("LEFTPADDING", (0, 0), (-1, -1), 0),
                           ("TOPPADDING", (0, 0), (-1, -1), 0), ("BOTTOMPADDING", (0, 0), (-1, -1), 0)]))
    return t


s += [
    PageBreak(),
    kartenkopf(f"Karteikarten zum Ausschneiden · Vorderseite {sym('✂')}",
               "Doppelseitig drucken (an der langen Kante spiegeln) – dann liegt die Rückseite genau hinter der Vorderseite. "
               "Oder einseitig drucken und die Karten zusammenkleben."),
    kartenseite(front, False),
    PageBreak(),
    kartenkopf(f"Karteikarten zum Ausschneiden · Rückseite {sym('✂')}",
               "Die Spalten sind gespiegelt, damit sie beim doppelseitigen Druck passen."),
    kartenseite(back, True),
]

if __name__ == "__main__":
    build(SLUG, TITLE, LEVEL, s)
