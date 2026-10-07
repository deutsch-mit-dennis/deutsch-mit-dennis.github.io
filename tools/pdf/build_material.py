# Baut die Materialien: Arbeitsblätter mit Wasserzeichen, LiD-Merkblätter, Hörbeispiele.
# Aufruf: python3 build_material.py <eingang> <repo>
import sys, os, io, json, re, subprocess, shutil, glob
from pypdf import PdfReader, PdfWriter
from reportlab.pdfgen import canvas
from reportlab.lib.colors import Color
from PIL import Image

IN, REPO = sys.argv[1], sys.argv[2]
SRC = os.path.join(IN, 'files', '199 Gevelsberg')
MAT = os.path.join(REPO, 'material')
MARK = 'created by D.Prudnikau'
SITE = 'deutsch-mit-dennis.github.io'

def u(name):  # Dateinamen im ZIP sind mit #Uxxxx kodiert
    name = re.sub(r'#L([0-9a-fA-F]{6})', lambda m: chr(int(m.group(1), 16)), name)
    return re.sub(r'#U([0-9a-fA-F]{4})', lambda m: chr(int(m.group(1), 16)), name)

def overlay(w, h):
    buf = io.BytesIO(); c = canvas.Canvas(buf, pagesize=(w, h))
    size = max(28, min(w, h) / 11)
    c.saveState(); c.setFillColor(Color(0.14, 0.25, 0.71, alpha=0.10)); c.setFont('Helvetica-Bold', size)
    c.translate(w / 2, h / 2); c.rotate(35); c.drawCentredString(0, -size / 3, MARK); c.restoreState()
    c.setFillColor(Color(0.30, 0.34, 0.45, alpha=0.75)); c.setFont('Helvetica', 7.5)
    c.drawRightString(w - 18, 12, f'{MARK} · {SITE}')
    c.save(); buf.seek(0); return PdfReader(buf).pages[0]

def watermark(src, dst):
    r = PdfReader(src); w = PdfWriter()
    for p in r.pages:
        rot = (p.get('/Rotate') or 0) % 360
        if rot: p.transfer_rotation_to_content()
        box = p.mediabox; pw, ph = float(box.width), float(box.height)
        ov = overlay(pw, ph)
        if float(box.left) or float(box.bottom):
            from pypdf import Transformation
            ov.add_transformation(Transformation().translate(float(box.left), float(box.bottom)))
        p.merge_page(ov)
        w.add_page(p)
    for p in w.pages:
        p.compress_content_streams()
    w.compress_identical_objects(remove_identicals=True, remove_orphans=True)
    w.add_metadata({'/Author': 'Dzianis Prudnikau', '/Creator': 'Deutsch mit Dennis', '/Subject': MARK})
    os.makedirs(os.path.dirname(dst), exist_ok=True)
    with open(dst, 'wb') as f: w.write(f)
    return len(r.pages)

# Auswahl: (Datei, Titel, Niveau, Kategorie, Beschreibung)
# Kategorien: grammatik, wortschatz, sprechen, lesen-hoeren, schreiben, pruefung, unterricht
C = [
 # Grammatik
 ('Übung 1 Dativ.pdf','Dativ: Nomen durch Pronomen ersetzen','A2','grammatik','Ich danke meinem Vater → Ich danke ihm.'),
 ('Übung 2 Dat Akk.pdf','Dativ und Akkusativ: Sätze kurz machen','A2','grammatik','Zwei Objekte im Satz durch Pronomen ersetzen.'),
 ('Übung 3 Dativ Akk Hausaufgabe.pdf','Dativ und Akkusativ: Person oder Sache ersetzen','A2','grammatik','Ein Satz, zwei Möglichkeiten.'),
 ('Übung 1 trenn.pdf','Trennbare Verben: Partizip II','A2','grammatik','einkaufen → eingekauft.'),
 ('Übung 2 trenn.pdf','Trennbare Verben im Perfekt','A2','grammatik','Sätze vom Präsens ins Perfekt – mit haben oder sein.'),
 ('Hausaufgaben.pdf','Trennbare Verben: Verb und Vorsilbe finden','A1','grammatik','Peter ruft seine Freundin an.'),
 ('Übung 3 imper.pdf','Imperativ: die du-Form','A1','grammatik','machen → mach!'),
 ('Übungen Imperativ.pdf','Imperativ: du oder Sie?','A1','grammatik','Bitten an die Lehrerin und an einen Freund.'),
 ('Übungen der er die sie das es.pdf','Personalpronomen: er, sie, es','A1','grammatik','Der Laptop → er.'),
 ('Übung Personal.pdf','Personalpronomen im Akkusativ','A1','grammatik','Ich verstehe dich sehr gut.'),
 ('Übung possessiv.pdf','Possessivartikel einsetzen','A1','grammatik','mein, dein, sein, ihr …'),
 ('Deklinationstabelle.pdf','Tabelle: ein, mein, dein, kein','A1','grammatik','Alle Formen auf einer Seite.'),
 ('Präpositionen mit Akk.pdf','Präpositionen mit Akkusativ (FUDGO)','A2','grammatik','für, um, durch, gegen, ohne.'),
 ('Präpositionen mit Dativ.pdf','Präpositionen mit Dativ','A2','grammatik','aus, bei, mit, nach, seit, von, zu.'),
 ('Verben Dativ.pdf','Verben mit Dativ','A2','grammatik','Liste der wichtigsten Verben: Wem?'),
 ('Verben mit Akkusativ.pdf','Verben mit Akkusativ','A2','grammatik','Liste der wichtigsten Verben: Wen? Was?'),
 ('Arbeitsblatt 2.pdf','Präteritum: war und hatte','A2','grammatik','Über die Vergangenheit sprechen.'),
 ('Arbeitsblatt.pdf','Fragen mit Modalverben (müssen, können)','A1','grammatik','Ja-/Nein-Fragen und W-Fragen.'),
 ('Aufgaben.pdf','Ja-/Nein-Fragen bilden','A1','grammatik','Kannst du mir helfen?'),
 ('Hausaufgabe.pdf','Im Supermarkt: ein, eine, einen','A1','grammatik','Unbestimmter Artikel im Akkusativ.'),
 # Wortschatz & Themen
 ('Übung 1.pdf','Lebensmittel: der, die oder das?','A1','wortschatz','Grundwortschatz Lebensmittel mit Artikel.'),
 ('Im Café.pdf','Im Café und beim Einkaufen','A1','wortschatz','Nomen mit Artikel, Nominativ und Akkusativ.'),
 ('Berufe.pdf','Berufe: männlich und weiblich','A1','wortschatz','der Arzt – die Ärztin, mit Beispielsätzen.'),
 ('Berufe übersetzt.pdf','Berufe – mit Übersetzungen','A1','wortschatz','Beispielsätze mit Übersetzungen in mehrere Sprachen.'),
 ('Gute Gründe für Traumberufe.pdf','Gute Gründe für Traumberufe','A1','wortschatz','Warum ist ein Beruf schön?'),
 ('Übung Uhrzeit.pdf','Die Uhrzeit: digital und inoffiziell','A1','wortschatz','07:30 → halb acht.'),
 ('Uhrzeiten.pdf','Uhrzeiten auf einen Blick','A1','wortschatz','Viertel nach, halb, Viertel vor.'),
 ('Übung Fragen Uhrzeit.pdf','Fragen zur Uhrzeit','A1','wortschatz','Wann? Wie lange? Um wie viel Uhr?'),
 ('Übung Städte.pdf','Städte in Deutschland','A1','wortschatz','Kurze Texte über deutsche Städte.'),
 ('Wortschatz zum Thema Personenbeschreibung und Kleidung.pdf','Personen und Kleidung beschreiben','A2','wortschatz','Wortschatz für die Bildbeschreibung.'),
 # Sprechen
 ('sich vorstellen.pdf','Sich vorstellen','A1','sprechen','Name, Herkunft, Wohnort – Fragen und Antworten.'),
 ('Übung Heimat.pdf','Über die Heimat sprechen','A1','sprechen','W-Fragen und Antworten zum Thema Heimat.'),
 ('Ein Gespräch am Esstisch.pdf','Ein Gespräch am Esstisch','A2','sprechen','Impulse und wichtige Sätze für ein Gespräch.'),
 ('Mein Lieblingsgericht.pdf','Mein Lieblingsgericht','A1','sprechen','Ein Gericht vorstellen – Schritt für Schritt.'),
 ('Texte zum Vorlesen.pdf','Dialoge zum Vorlesen','A1','sprechen','Kurze Szenen mit verteilten Rollen.'),
 # Lesen & Hören
 ('Sprecher 1.pdf','Im Café: Dialog zum Mitlesen','A1','lesen-hoeren','Text zum Hörverstehen „Fragen zum Text“.'),
 ('Fragen zum Text 1.pdf','Fragen zum Text 1 (Hörverstehen)','A1','lesen-hoeren','Preise, Hausnummern und Telefonnummern verstehen.'),
 ('Fragen zum Text 2.pdf','Fragen zum Text 2 (Hörverstehen)','A1','lesen-hoeren','Zeiten und Gleise am Bahnhof.'),
 ('Übung A1 27.11.pdf','Am Bahnhof: richtig oder falsch?','A1','lesen-hoeren','Eine Durchsage verstehen.'),
 ('Übung 2 27.11.pdf','Durchsagen verstehen','A2','lesen-hoeren','Welche Überschrift passt?'),
 # Prüfung DTZ
 ('Lesen Teil 2.pdf','DTZ Lesen Teil 2: Anzeigen','B1','pruefung','Welche Anzeige passt zu welcher Person?'),
 ('Lesen Teil 3.pdf','DTZ Lesen Teil 3: Fragen zum Text','B1','pruefung','Informationen in einem Text finden.'),
 ('Lesen Teil 4.pdf','DTZ Lesen Teil 4: Lückentext','B1','pruefung','Das passende Wort wählen.'),
 ('🔑 Lösungen.pdf','Lösungen zu DTZ Lesen Teil 2–4','B1','pruefung','Mit Erklärungen.'),
 ('Wortschatz.pdf','DTZ Bild beschreiben: Redemittel','B1','pruefung','Einleitung, Ort, Personen, Vermutungen.'),
 ('Wortschatz DTZ Teil 3.pdf','DTZ Sprechen Teil 3: Wortschatz zum Planen','B1','pruefung','Vorschläge machen, zustimmen, ablehnen.'),
 ('15.01.26.pdf','DTZ Schreiben: Briefe Schritt für Schritt','B1','pruefung','Formell, halbformell, informell – mit Checkliste.'),
 ('22.01.26.pdf','DTZ Bild beschreiben: alle Themen','B1','pruefung','Die 5 Themenbereiche mit Beispielantworten.'),
 ('05.02.26.pdf','DTZ Gemeinsam etwas planen','B1','pruefung','Situationen, Wortschatz und Redemittel.'),
 ('08.01.26.pdf','DTZ Hören: Lösungen zum Übungssatz 1 (g.a.s.t.)','B1','pruefung','Lösungen mit Begründung. Den Übungssatz selbst gibt es kostenlos bei g.a.s.t.'),
 # Unterrichtsmaterial (ganze Stunden)
 ('11.09.25.pdf','Sich vorstellen und Berufe','A1','unterricht','Unterrichtsstunde mit Partnerübungen.'),
 ('18.09.2025.pdf','Artikel DER erkennen','A1','unterricht','Endungen, Regeln und Übungen – mit Übersetzungen.'),
 ('25.09.25.pdf','Artikel DAS erkennen','A1','unterricht','Endungen und Hörverstehen.'),
 ('2.10.2025.pdf','Die Uhrzeit','A1','unterricht','Viertel, halb, Minuten – mit Übungen.'),
 ('9.10.2025.pdf','Der Imperativ','A1','unterricht','Bitten und Aufforderungen – mit Übersetzungen.'),
 ('16.10.2025.pdf','Eine E-Mail verstehen: Elternabend','A1','unterricht','Wortschatz und Verständnisfragen.'),
 ('30.10.25.pdf','Modalverben','A1','unterricht','können, müssen, wollen, dürfen, sollen.'),
 ('6.11.2025.pdf','Possessivartikel im Akkusativ','A1','unterricht','Wem gehört das?'),
 ('13.11.25.pdf','Das Perfekt wiederholen','A2','unterricht','Haben oder sein – mit Übersetzungen.'),
 ('19.11.25.pdf','Der Dativ','A2','unterricht','Verben und Pronomen im Dativ.'),
 ('27.11.25.pdf','Am Bahnhof, Datum und Ordnungszahlen','A2','unterricht','Der Wievielte ist heute?'),
 ('2.12.25.pdf','Heimat, Himmelsrichtungen und Bild beschreiben','A2','unterricht','Woher kommst du? Wo liegt das?'),
 ('4.12.25.pdf','Beim Arzt','A2','unterricht','Wichtige Sätze, Dialoge und Übungen.'),
 ('11.12.2025.pdf','seit und vor + Dativ','A2','unterricht','Seit wann? Wann?'),
 ('18.12.25.pdf','Ja, nein oder doch?','A2','unterricht','Antworten auf negative Fragen.'),
 ('12.2.26.pdf','Adjektive: Kleidung beschreiben','A2','unterricht','Adjektivdeklination im Nominativ und Akkusativ.'),
]

def slug(t):
    t = t.lower()
    for a, b in (('ä','ae'),('ö','oe'),('ü','ue'),('ß','ss')): t = t.replace(a, b)
    return re.sub(r'[^a-z0-9]+', '-', t).strip('-')[:60]

files = {u(os.path.basename(p)): p for p in glob.glob(os.path.join(SRC, '*.pdf'))}
out = []; total = 0
for name, title, level, cat, desc in C:
    src = files[name]
    s = slug(title); dst = os.path.join(MAT, 'arbeitsblaetter', s + '.pdf')
    pages = watermark(src, dst)
    kb = os.path.getsize(dst) // 1024; total += kb
    out.append({'file': f'material/arbeitsblaetter/{s}.pdf', 'title': title, 'level': level, 'cat': cat, 'desc': desc, 'pages': pages, 'kb': kb})
print('Arbeitsblätter:', len(out), 'Größe', total // 1024, 'MB')

# LiD-Merkblätter (Bilder -> A4-PDF + Vorschau)
LID = os.path.join(IN, 'erst')
lid_map = {
 'kanzler-praesident': 'Bundeskanzler oder Bundespräsident_.png',
 'lid-ueberblick': 'ChatGPT Image 25. Sept. 2026, 10_23_27.png',
 'wer-regiert': 'ChatGPT-Bild 1. Okt. 2026, 07_01_21.png',
 'erst-zweitstimme': 'Erststimme und Zweitstimme einfach erklärt.png',
 'foederalismus': 'Föderalismus in Deutschland_ Die 16 Bundesländer.png',
 'koalition-opposition': 'Koalition, Opposition und Fraktion erklärt.png',
 'parteien': 'Parteien im Deutschen Bundestag – einfach erklärt.png',
 'verfassungsorgane': 'WhatsApp Image 2026-09-30 at 12.41.51 (1).jpeg',
 'wahlen-demokratie': 'WhatsApp Image 2026-09-30 at 12.41.51.jpeg',
}
lfiles = {u(os.path.basename(p)): p for p in glob.glob(os.path.join(LID, '*'))}
od = os.path.join(MAT, 'orientierung'); os.makedirs(od, exist_ok=True)
order = ['lid-ueberblick','wer-regiert','kanzler-praesident','foederalismus','verfassungsorgane','wahlen-demokratie','erst-zweitstimme','koalition-opposition','parteien']
singles = []
for sl in order:
    im = Image.open(lfiles[lid_map[sl]]).convert('RGB')
    big = im.copy(); big.thumbnail((1600, 2400)); big.save(os.path.join(od, sl + '.webp'), quality=84, method=6)
    pv = im.copy(); pv.thumbnail((500, 700)); pv.save(os.path.join(od, sl + '-vorschau.webp'), quality=80, method=6)
    # PDF: Bild auf A4 einpassen
    from reportlab.lib.pagesizes import A4
    W, H = A4; buf = io.BytesIO(); c = canvas.Canvas(buf, pagesize=A4)
    jp = io.BytesIO(); hi = im.copy(); hi.thumbnail((2000, 2800)); hi.save(jp, 'JPEG', quality=86); jp.seek(0)
    from reportlab.lib.utils import ImageReader
    iw, ih = hi.size; sc = min((W - 36) / iw, (H - 48) / ih); dw, dh = iw * sc, ih * sc
    c.drawImage(ImageReader(jp), (W - dw) / 2, (H - dh) / 2 + 6, dw, dh); c.showPage(); c.save(); buf.seek(0)
    tmp = os.path.join(od, sl + '.raw.pdf'); open(tmp, 'wb').write(buf.read())
    watermark(tmp, os.path.join(od, sl + '.pdf')); os.remove(tmp); singles.append(os.path.join(od, sl + '.pdf'))
w = PdfWriter()
for f in singles:
    for p in PdfReader(f).pages: w.add_page(p)
w.add_metadata({'/Author': 'Dzianis Prudnikau', '/Title': 'Leben in Deutschland – alle Merkblätter', '/Subject': MARK})
with open(os.path.join(od, 'alle-merkblaetter.pdf'), 'wb') as f: w.write(f)
print('LiD-Merkblätter:', len(singles))

# Hörbeispiele: "ankommen-de.mp3 · A1.wav" -> audio/aufnahmen/ankommen-de.wav
ad = os.path.join(REPO, 'audio', 'aufnahmen'); os.makedirs(ad, exist_ok=True); n = 0
for p in glob.glob(os.path.join(IN, 'audio', '*.wav')):
    m = re.match(r'([a-z0-9-]+)-de\.mp3', u(os.path.basename(p)))
    if m: shutil.copy(p, os.path.join(ad, m.group(1) + '-de.wav')); n += 1
print('Hörbeispiele:', n)

json.dump(out, open(os.path.join(IN, 'materials.json'), 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
