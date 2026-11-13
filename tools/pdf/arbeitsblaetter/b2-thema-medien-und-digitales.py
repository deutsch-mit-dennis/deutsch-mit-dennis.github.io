# Arbeitsblatt telc Deutsch B2 (allgemein): Thema „Medien und digitales Leben“
# Wortschatz, Leseverstehen (Stil Teil 2), Hörverstehen (Stil Teil 2), Mündlich Teil 2, Schriftlicher Ausdruck.
# Eigene Übungstexte im Stil der Prüfung, keine telc-Originale. Formate: tools/pdf/b2-formate-offiziell.md
# Aufruf aus dem Repo-Wurzelordner: py -X utf8 tools/pdf/arbeitsblaetter/b2-thema-medien-und-digitales.py
import os, sys

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from arbeitsblatt_lib import *
from arbeitsblatt_lib import LINE, TINTE, fallback
from reportlab.lib.styles import ParagraphStyle
from reportlab.platypus import Table, TableStyle, CondPageBreak  # noqa

SLUG = "b2-thema-medien-und-digitales"
TITLE = "telc B2 Themen: Medien und digitales Leben"
HEAD = "telc B2 Thema: Medien und digitales Leben"  # page header (max. 70 characters)
LEVEL = "B2"
KICK = "B2 · Thema · Arbeitsblatt · telc Deutsch B2"
H1 = "Medien und digitales Leben"
LEAD = ("Smartphone, Nachrichten, soziale Netzwerke: Wortschatz, Lesen, Hören, Diskutieren und Schreiben zu einem "
        "typischen Alltagsthema der telc-B2-Prüfung.")

WORDS = [
    ("die Nachricht", "die Nachricht, -en", "Die Nachricht verbreitete sich in wenigen Minuten."),
    ("die Quelle", "die Quelle, -n", "Bevor ich etwas teile, prüfe ich die Quelle."),
    ("die Falschmeldung", "die Falschmeldung, -en", "Falschmeldungen lösen oft Angst oder Wut aus."),
    ("der Beitrag", "der Beitrag, Beiträge", "Ihr Beitrag im Forum bekam viele Kommentare."),
    ("das soziale Netzwerk", "das soziale Netzwerk, -e", "Er ist in keinem sozialen Netzwerk aktiv."),
    ("die Bildschirmzeit", "die Bildschirmzeit (nur Sg.)", "Sie möchte ihre Bildschirmzeit reduzieren."),
    ("die Benachrichtigung", "die Benachrichtigung, -en", "Ich habe die Benachrichtigungen abgestellt."),
    ("der Datenschutz", "der Datenschutz (nur Sg.)", "Beim Datenschutz lohnt sich ein genauer Blick."),
    ("die Privatsphäre", "die Privatsphäre (nur Sg.)", "Fotos von Kindern verletzen schnell die Privatsphäre."),
    ("die Erreichbarkeit", "die Erreichbarkeit (nur Sg.)", "Ständige Erreichbarkeit kann stressig sein."),
    ("die Abhängigkeit", "die Abhängigkeit, -en", "Manche sprechen schon von einer Abhängigkeit."),
    ("der Algorithmus", "der Algorithmus, Algorithmen", "Der Algorithmus zeigt mir ähnliche Videos."),
    ("die Medienkompetenz", "die Medienkompetenz (nur Sg.)", "Medienkompetenz sollte man früh lernen."),
    ("teilen", "teilt – teilte – hat geteilt", "Sie hat den Artikel mit ihren Freunden geteilt."),
    ("verbreiten", "verbreitet – verbreitete – hat verbreitet", "Wer Gerüchte verbreitet, schadet anderen."),
    ("überprüfen", "überprüft – überprüfte – hat überprüft", "Die Redaktion hat das Foto überprüft."),
    ("löschen", "löscht – löschte – hat gelöscht", "Er hat sein altes Konto gelöscht."),
    ("herunterladen", "lädt herunter – lud herunter – hat heruntergeladen", "Die App kann man kostenlos herunterladen."),
    ("sich informieren über + Akk.", "informiert sich – informierte sich – hat sich informiert",
     "Ich informiere mich meistens online über Politik."),
    ("verzichten auf + Akk.", "verzichtet – verzichtete – hat verzichtet", "Eine Woche lang verzichtete sie aufs Handy."),
    ("sich ablenken lassen", "lässt sich ablenken – ließ sich ablenken – hat sich ablenken lassen",
     "Beim Lernen lasse ich mich schnell ablenken."),
    ("angewiesen sein auf + Akk.", "ist – war – ist angewiesen gewesen", "Viele sind beruflich auf ihr Handy angewiesen."),
    ("in Kontakt bleiben mit + Dat.", "bleibt – blieb – ist geblieben", "So bleibe ich mit meiner Familie in Kontakt."),
    ("eine Rolle spielen", "spielt – spielte – hat gespielt", "Das Internet spielt in meinem Alltag eine große Rolle."),
    ("etw. kritisch hinterfragen", "hinterfragt – hinterfragte – hat hinterfragt",
     "Man sollte jede Schlagzeile kritisch hinterfragen."),
]
GAP_BOX = ["Quelle", "verzichten", "Benachrichtigungen", "angewiesen", "überprüft", "Privatsphäre", "ablenken", "teilen"]
GAPS = [
    "Bevor ich einen Artikel weiterleite, schaue ich nach, wer ihn geschrieben hat – die ___ ist mir wichtig.",
    "Seit ich die ___ für soziale Netzwerke abgestellt habe, schaue ich viel seltener aufs Handy.",
    "Im Schichtdienst bin ich auf mein Smartphone ___, weil der Dienstplan nur in der App steht.",
    "Beim Lernen lege ich das Handy in die Küche, sonst lasse ich mich zu leicht ___.",
    "Die Redaktion hat das Foto genau ___ und festgestellt, dass es schon fünf Jahre alt ist.",
    "Ich finde, man sollte keine Fotos von fremden Kindern posten – das verletzt ihre ___.",
]
GAP_SOL = ["Quelle", "Benachrichtigungen", "angewiesen", "ablenken", "überprüft", "Privatsphäre"]
GAP_REST = ["verzichten", "teilen"]

ART_TITLE = "Einfach mal offline"
ART_SUB = "In Lindenfeld haben 40 Erwachsene eine Woche lang auf ihr Smartphone verzichtet – mit überraschenden Ergebnissen"
ART = [
    "Am ersten Morgen griff Joanna Kowalczyk siebenmal in die leere Jackentasche. „Ich wollte nur schnell auf die Uhr "
    "sehen – dachte ich jedenfalls“, erzählt die 41-jährige Pflegekraft und lacht. Sie ist eine von 40 Teilnehmenden, die "
    "sich auf ein Experiment der Volkshochschule Lindenfeld eingelassen haben: sieben Tage ohne Smartphone. Telefonieren "
    "mit einem einfachen Handy war erlaubt, Messenger, soziale Netzwerke und Videos dagegen nicht.",
    "Die Idee stammt von der Medienpädagogin Yasmin Haddad. „Mir geht es nicht darum, das Smartphone schlechtzumachen“, "
    "betont sie. „Ich möchte, dass die Menschen bewusster entscheiden, wann sie es benutzen.“ Viele hätten vorher gar nicht "
    "gewusst, wie viel Zeit sie täglich vor dem Bildschirm verbringen. Bei einer Befragung zu Beginn schätzten die meisten "
    "ihre Bildschirmzeit auf etwa zwei Stunden; die Statistik auf ihren Geräten zeigte im Durchschnitt fast das Doppelte.",
    "Die ersten beiden Tage waren für fast alle schwierig. Felix Hoffmann, 23, Student der Informatik, fühlte sich „wie "
    "abgeschnitten“. Seine Lerngruppe organisiert sich ausschließlich über einen Messenger, und so verpasste er gleich am "
    "Dienstag eine Terminänderung. „Das war ärgerlich. Aber ab Mittwoch habe ich gemerkt, dass ich viel länger konzentriert "
    "lesen kann.“",
    "Ähnliche Erfahrungen machten auch andere. Mehrere Teilnehmende berichteten, sie hätten besser geschlafen, weil sie "
    "abends nicht mehr im Bett durch Videos gescrollt hätten. Emmanuel Osei, 67, hat die Woche genutzt, um wieder Briefe "
    "zu schreiben – an seine Enkelin, die in Hamburg studiert. „Sie hat mir geantwortet, auch mit der Hand. Das hat mich "
    "mehr gefreut als jedes Foto im Familienchat.“",
    "Doch nicht alle sind begeistert. Kritiker weisen darauf hin, dass ein solcher Verzicht für viele Menschen gar nicht "
    "möglich sei. Wer im Schichtdienst arbeitet, kleine Kinder hat oder Termine bei Behörden online buchen muss, sei auf "
    "das Gerät angewiesen. Auch Haddad räumt ein: „Eine Woche ist ein Experiment, kein Lebensmodell.“",
    "Nach dem Ende des Projekts haben die meisten ihr Smartphone wieder eingeschaltet – aber anders als vorher. Kowalczyk "
    "hat die Benachrichtigungen für soziale Netzwerke abgestellt, Hoffmann lässt das Gerät beim Lernen in einem anderen "
    "Raum. Und Osei? Der schreibt weiter Briefe. Die Volkshochschule plant bereits eine zweite Runde im Frühjahr – mit "
    "neuen Teilnehmenden.",
]
MC = [
    ("Was durften die Teilnehmenden während des Experiments tun?",
     ["Kurze Nachrichten über einen Messenger schreiben.", "Abends Videos auf dem Smartphone ansehen.",
      "Mit einem einfachen Handy telefonieren."]),
    ("Was zeigte die Befragung zu Beginn?",
     ["Die meisten nutzten ihr Smartphone weniger als zwei Stunden am Tag.",
      "Die Teilnehmenden unterschätzten ihre Bildschirmzeit deutlich.",
      "Die meisten wussten genau, wie lange sie täglich am Bildschirm sind."]),
    ("Wie erging es Felix Hoffmann?",
     ["Er konnte sich nach einigen Tagen besser konzentrieren.",
      "Er brach das Experiment nach der Terminänderung ab.",
      "Seine Lerngruppe hat sich nicht mehr bei ihm gemeldet."]),
    ("Was sagen die Kritiker?",
     ["Eine Woche ist zu kurz, um etwas zu verändern.",
      "Das Experiment stellt das Smartphone zu negativ dar.",
      "Viele Menschen brauchen das Smartphone im Alltag unbedingt."]),
    ("Was erfährt man über die Zeit nach dem Projekt?",
     ["Die meisten Teilnehmenden benutzen kein Smartphone mehr.",
      "Einige Teilnehmende nutzen ihr Smartphone jetzt bewusster.",
      "Alle Teilnehmenden machen im Frühjahr noch einmal mit."]),
]
MC_SOL = [
    ("c", "„Telefonieren mit einem einfachen Handy war erlaubt“. Falsch: a) und b) Messenger und Videos waren nicht erlaubt."),
    ("b", "Geschätzt: etwa zwei Stunden, tatsächlich „fast das Doppelte“. Falsch: a) Gegenteil. c) „gar nicht gewusst“."),
    ("a", "„ab Mittwoch … viel länger konzentriert lesen“. Falsch: b) Er verpasste einen Termin, brach aber nicht ab. c) steht nicht im Text."),
    ("c", "„auf das Gerät angewiesen“ (Schichtdienst, Kinder, Behörden). Falsch: a) steht so nicht im Text – Haddad sagt nur, eine Woche sei „kein Lebensmodell“. b) Haddad will das Smartphone nicht schlechtmachen; das ist kein Argument der Kritiker."),
    ("b", "Benachrichtigungen abgestellt, Handy in einem anderen Raum. Falsch: a) Sie haben es „wieder eingeschaltet“. c) Die zweite Runde ist „mit neuen Teilnehmenden“."),
]

HOER_SIT = "Sie hören im Radio die Sendung „Alltag digital“. Die Moderatorin spricht mit einem Faktenprüfer."
HOER = [
    ("Moderatorin", "Herzlich willkommen bei „Alltag digital“. Heute geht es um Falschmeldungen im Netz. Bei mir im Studio "
                    "ist Daniel Petrović. Er arbeitet in der Faktencheck-Redaktion einer großen Tageszeitung. Herr Petrović, "
                    "was machen Sie eigentlich den ganzen Tag?"),
    ("Petrović", "Wir prüfen Meldungen, die sich gerade stark im Netz verbreiten – zum Beispiel ein Foto von einer angeblichen "
                 "Überschwemmung oder ein Zitat, das angeblich von einer Politikerin stammt. Wir suchen die ursprüngliche "
                 "Quelle, rufen bei Behörden an und vergleichen Bilder. Manchmal dauert das zehn Minuten, manchmal drei Tage."),
    ("Moderatorin", "Warum verbreiten sich falsche Nachrichten eigentlich so schnell?"),
    ("Petrović", "Weil sie oft starke Gefühle auslösen, vor allem Angst oder Wut. Wer sich ärgert, klickt schneller auf "
                 "„Teilen“ und denkt weniger nach. Dazu kommt: Die meisten Leute lesen nur die Überschrift und nicht den "
                 "ganzen Artikel."),
    ("Moderatorin", "Was können unsere Hörerinnen und Hörer selbst tun?"),
    ("Petrović", "Drei einfache Fragen helfen schon viel: Wer hat das veröffentlicht? Wann ist es passiert? Und berichten "
                 "auch andere seriöse Medien darüber? Bei Fotos lohnt sich außerdem die umgekehrte Bildersuche. Damit sieht "
                 "man oft sofort, dass ein Bild schon Jahre alt ist und aus einem ganz anderen Land stammt."),
    ("Moderatorin", "Und wenn man selbst aus Versehen etwas Falsches geteilt hat?"),
    ("Petrović", "Dann sollte man den Beitrag nicht einfach still löschen, sondern kurz dazuschreiben, dass er falsch war. "
                 "Sonst glauben die anderen weiter daran. Das ist keine Schande – das passiert sogar Journalisten."),
    ("Moderatorin", "Herr Petrović, vielen Dank für das Gespräch."),
]
RF = [
    ("Daniel Petrović arbeitet für eine Zeitung.", True),
    ("Eine Überprüfung dauert immer mindestens einen Tag.", False),
    ("Falschmeldungen verbreiten sich schnell, weil sie oft Gefühle wie Angst oder Wut auslösen.", True),
    ("Laut Petrović lesen die meisten Menschen einen Artikel ganz, bevor sie ihn teilen.", False),
    ("Mit der umgekehrten Bildersuche kann man herausfinden, ob ein Foto alt ist.", True),
    ("Wer etwas Falsches geteilt hat, sollte den Beitrag ohne Kommentar löschen.", False),
]
RF_WHY = [
    "„Faktencheck-Redaktion einer großen Tageszeitung“.",
    "„manchmal zehn Minuten, manchmal drei Tage“.",
    "„Weil sie oft starke Gefühle auslösen, vor allem Angst oder Wut.“",
    "„Die meisten Leute lesen nur die Überschrift.“",
    "„… dass ein Bild schon Jahre alt ist“.",
    "„nicht einfach still löschen, sondern kurz dazuschreiben, dass er falsch war“.",
]

DISK_TITLE = "Soziale Netzwerke erst ab 16?"
DISK = (
    "Sollen Jugendliche soziale Netzwerke erst ab 16 Jahren nutzen dürfen? Diese Frage wird zurzeit in vielen Familien "
    "und Schulen heftig diskutiert. Befürworter sagen, Kinder und junge Jugendliche seien dem ständigen Vergleich mit "
    "anderen, der Werbung und dem Druck, immer online zu sein, noch nicht gewachsen. Ein klares Mindestalter würde auch "
    "den Eltern helfen, die sonst jeden Tag neu mit ihren Kindern verhandeln müssen. Gegner halten dagegen: Ein Verbot "
    "lasse sich kaum kontrollieren, Jugendliche würden einfach heimlich weitermachen – und dann mit ihren Problemen "
    "allein bleiben. Viel wichtiger sei es, Medienkompetenz früh in der Schule zu unterrichten."
)
PRO = ["Schutz vor Druck, Vergleich und Werbung", "klare Regel entlastet Eltern", "mehr Zeit für Hobbys, Freunde, Schlaf"]
CONTRA = ["schwer zu kontrollieren", "Jugendliche verlieren Kontakt zu Freunden", "besser: Medienkompetenz lernen"]
DISK_Q = ["Ab welchem Alter hatten Sie / Ihre Kinder ein Smartphone?", "Wer ist verantwortlich: Eltern, Schule oder Staat?",
          "Wie ist das in Ihrem Herkunftsland?", "Welcher Kompromiss wäre möglich?"]

MAIL_SIT = ("Sie haben in der Lokalzeitung gelesen, dass die Stadtbibliothek einen Abendkurs „Sicher im Netz – Datenschutz "
            "für Erwachsene“ anbietet. Sie interessieren sich dafür. Schreiben Sie eine E-Mail an die Bibliothek.")
MAIL_LP = ["Inhalte des Kurses", "Termine und Dauer", "Kosten und Anmeldung", "technische Voraussetzungen (eigenes Gerät?)"]
MUSTER_LP = "Inhalte, Termine, Gerät"
MUSTER = [
    "<b>Betreff:</b> Anfrage zum Kurs „Sicher im Netz“",
    "Sehr geehrte Damen und Herren,",
    "in der Lokalzeitung habe ich gelesen, dass Sie einen Abendkurs zum Thema Datenschutz anbieten. Da ich mich schon "
    "lange mit diesem Thema beschäftigen möchte, interessiere ich mich sehr für den Kurs.",
    "Zunächst würde ich gern wissen, welche Inhalte genau behandelt werden. Ich nutze mein Smartphone täglich für "
    "Online-Banking und für Termine bei Behörden und frage mich oft, ob meine Daten dabei sicher sind. Werden auch "
    "solche praktischen Fragen besprochen?",
    "Außerdem möchte ich mich nach den Terminen erkundigen. Ich arbeite im Schichtdienst und habe nur jede zweite Woche "
    "abends frei. Könnten Sie mir bitte mitteilen, an welchen Tagen der Kurs stattfindet und wie lange er insgesamt dauert?",
    "Schließlich hätte ich noch eine Frage zur Technik: Muss ich ein eigenes Gerät mitbringen, oder stellt die "
    "Bibliothek Computer zur Verfügung? Mein Laptop ist schon ziemlich alt.",
    "Vielen Dank im Voraus für Ihre Mühe. Über eine baldige Antwort würde ich mich sehr freuen.",
    "Mit freundlichen Grüßen<br/>Amina Rahimi",
]

# ── Render (same layout for all B2 theme sheets) ──
BOX = sym("☐")
BL = '<font color="#8A93A8">______</font>'
_R = R
R = lambda html, s="p": _R(fallback(html) if "<font name" not in html else html, s)
st["txt"] = ParagraphStyle("txt", parent=st["cell"], fontSize=10, leading=13.4)
st["art"] = ParagraphStyle("art", parent=st["cell"], fontSize=9.9, leading=13)
st["wd"] = ParagraphStyle("wd", parent=st["cell"], fontSize=9.1, leading=11)
st["q"] = ParagraphStyle("q", parent=st["item"], fontSize=10.3, leading=13, spaceAfter=0.5, spaceBefore=2.5)
st["opt"] = ParagraphStyle("opt", parent=st["item"], fontSize=10, leading=12.3, spaceAfter=0.3)
st["sol"] = ParagraphStyle("sol", parent=st["item"], fontSize=9.4, leading=11.8, spaceAfter=1)
st["solh"] = ParagraphStyle("solh", parent=st["h3"], fontSize=10.5, leading=13, spaceBefore=4, spaceAfter=1.5)
st["dlg"] = ParagraphStyle("dlg", parent=st["item"], fontSize=9.8, leading=12.6, spaceAfter=2)
st["mu"] = ParagraphStyle("mu", parent=st["cell"], fontSize=9.4, leading=12, spaceAfter=3)


def tbl(rows, widths, style_extra=()):
    t = Table(rows, colWidths=[w * mm for w in widths])
    t.setStyle(TableStyle([("VALIGN", (0, 0), (-1, -1), "TOP"), ("TOPPADDING", (0, 0), (-1, -1), 2.5),
                           ("BOTTOMPADDING", (0, 0), (-1, -1), 2.5)] + list(style_extra)))
    return t


REDEMITTEL = [
    ("Inhalt wiedergeben", "In dem Text geht es um … · Der Text beschreibt zwei Positionen: … · "
                           "Befürworter meinen, dass … Kritiker halten dagegen, dass …"),
    ("Meinung äußern", "Meiner Meinung nach … · Ich bin der Ansicht, dass … · Aus eigener Erfahrung kann ich sagen, dass …"),
    ("zustimmen", "Da haben Sie / hast du völlig recht. · Das sehe ich genauso, denn … · Das ist ein wichtiger Punkt."),
    ("widersprechen", "Da bin ich anderer Meinung. · Das stimmt zwar, aber … · Ich sehe das etwas anders: …"),
    ("nachfragen", "Wie meinen Sie / meinst du das genau? · Können Sie / Kannst du ein Beispiel nennen?"),
    ("Vorschlag, Kompromiss", "Wie wäre es, wenn …? · Man könnte doch … · Wir sind uns also einig, dass …"),
]

s = [R(KICK, "kick"), R(H1, "h1"), R(LEAD, "lead")]
s += [box(R(
    "<b>Was Sie hier üben:</b> Themen-Wortschatz · Leseverstehen im Stil von Teil 2 (Multiple Choice) · Hörverstehen im Stil "
    "von Teil 2 (Interview, richtig/falsch) · Mündlich Teil 2 (Diskussion über einen Zeitungstext) · Schriftlicher Ausdruck "
    "(halbformelle E-Mail mit Leitpunkten). Alle Texte sind eigene Übungstexte; Namen und Orte sind erfunden, "
    "Zahlen sind Beispielzahlen und keine echte Statistik.", "cell"), SOFT, TINTE), Spacer(1, 2)]

# Übung 1: vocabulary
s += task(1, "Themen-Wortschatz", "Lesen Sie die Wörter und Beispiele. Markieren Sie fünf Wörter, die für Sie neu sind, "
          "und schreiben Sie mit jedem einen eigenen Satz.", 1)
wrows = [[R("<b>Wort / Wendung</b>", "wd"), R("<b>Plural / Präteritum – Perfekt</b>", "wd"), R("<b>Beispiel</b>", "wd")]]
def _forms(w, f):
    if f.startswith(w + ", "): return "Pl. " + f[len(w) + 2:]
    if f.startswith(w + " ("): return f[len(w) + 2:-1]
    parts = f.split(" – ")
    return " – ".join(parts[1:]) if len(parts) == 3 else f
wrows += [[R(f"<b>{w}</b>", "wd"), R(_forms(w, f), "wd"), R(f"<i>{b}</i>", "wd")] for w, f, b in WORDS]
s += [tbl(wrows, [48, 44, 82], [("BACKGROUND", (0, 0), (-1, 0), SOFT), ("LINEBELOW", (0, 0), (-1, -1), 0.4, LINE)])]

# Übung 2: vocabulary in context
s += [KeepTogether(task(2, "Wortschatz anwenden", "Ergänzen Sie die Sätze mit Wörtern aus dem Kasten. Achten Sie auf die "
          "richtige Form. Zwei Wörter bleiben übrig.", 1)
      + [box(R(" · ".join(f"<b>{w}</b>" for w in GAP_BOX), "cell"), NOTE, GELB), Spacer(1, 2)]
      + [R(f"<b>{i}.</b> {t.replace('___', GAP)}", "item") for i, t in enumerate(GAPS, 1)])]

# Übung 3: reading (telc Leseverstehen Teil 2 style)
s += [Spacer(1, 4)]
s += task(3, "Leseverstehen: Detailverstehen", "Lesen Sie den Zeitungsartikel und lösen Sie die Aufgaben 1–5. Welche Lösung "
          "(a, b oder c) ist richtig? Kreuzen Sie an. (Stil: telc B2, Leseverstehen Teil 2)", 2)
arows = [[[R(f"<b>{ART_TITLE}</b>", "h3"), R(f"<i>{ART_SUB}</i>", "small")]]] + [[R(p, "art")] for p in ART]
s += [tbl(arows, [174], [("BACKGROUND", (0, 0), (-1, -1), HELLGRUEN), ("LEFTPADDING", (0, 0), (-1, -1), 10),
                         ("RIGHTPADDING", (0, 0), (-1, -1), 10)]), Spacer(1, 1)]
for i, (q, opts) in enumerate(MC, 1):
    s += [KeepTogether([R(f"<b>{i}. {q}</b>", "q")] + [R(f"{BOX} {chr(97 + j)}) {o}", "opt") for j, o in enumerate(opts)])]

# Übung 4: listening (telc Hörverstehen Teil 2 style)
u4 = task(4, "Hörverstehen: Radio-Interview", "Sie hören ein Interview <b>einmal</b>. Lesen Sie vorher 60 Sekunden lang die "
          "Aussagen 1–6. Sind sie richtig oder falsch? (Stil: telc B2, Hörverstehen Teil 2)", 2)
u4 += [box(R("<b>Ohne Audio üben:</b> Eine Partnerin, ein Partner oder die Lehrkraft liest den Text „Hörtext zum Vorlesen“ "
             "(nach Übung 6) in normalem Tempo vor. Wer übt, schaut <b>nicht</b> in den Text.", "cell"), NOTE, GELB),
       Spacer(1, 3), R(f"<i>{HOER_SIT}</i>", "small")]
rf = [[R(f"<b>{i}</b>", "txt"), R(t, "txt"), R(f"{BOX} richtig   {BOX} falsch", "txt")] for i, (t, _) in enumerate(RF, 1)]
u4 += [tbl(rf, [8, 128, 38], [("LINEBELOW", (0, 0), (-1, -1), 0.4, LINE)])]
s += [KeepTogether(u4)]

# Übung 5: speaking part 2
s += task(5, "Mündlich Teil 2: Diskussion", "Bereiten Sie sich vor (in der Prüfung: 20 Minuten für Teil 2 und 3). Geben Sie "
          "den Text zuerst kurz wieder (höchstens 1 Minute). Diskutieren Sie dann ca. 5 Minuten mit Ihrer Partnerin / "
          "Ihrem Partner: Sagen Sie Ihre Meinung, begründen Sie sie und reagieren Sie auf die Argumente.", 3)
s += [tbl([[[R(f"<b>{DISK_TITLE}</b>", "h3"), R(DISK, "art")]]], [174],
          [("BACKGROUND", (0, 0), (-1, -1), HELLGRUEN), ("LEFTPADDING", (0, 0), (-1, -1), 10),
           ("RIGHTPADDING", (0, 0), (-1, -1), 10)]), Spacer(1, 3)]
s += [KeepTogether([R("Ideen für die Diskussion", "h3"), tbl([[R("<b>Pro</b>", "wd"), R("<b>Contra</b>", "wd")],
           [R("<br/>".join(f"+ {x}" for x in PRO), "wd"), R("<br/>".join(f"– {x}" for x in CONTRA), "wd")]],
          [87, 87], [("BACKGROUND", (0, 0), (-1, 0), SOFT), ("BOX", (0, 0), (-1, -1), 0.5, LINE),
                     ("INNERGRID", (0, 0), (-1, -1), 0.5, LINE)])])]
s += [R("Redemittel", "h3")]
s += [tbl([[R(f"<b>{a}</b>", "wd"), R(b, "wd")] for a, b in REDEMITTEL], [38, 136],
          [("LINEBELOW", (0, 0), (-1, -1), 0.4, LINE)])]
s += [R("<b>Fragen für die Diskussion:</b> " + " · ".join(DISK_Q), "small")]

# Übung 6: writing
u6 = task(6, "Schriftlicher Ausdruck: halbformelle E-Mail", "Schreiben Sie eine E-Mail (mindestens 150 Wörter, 30 Minuten). "
          "Behandeln Sie <b>drei</b> der vier Leitpunkte – oder <b>zwei</b> Leitpunkte und einen eigenen Aspekt. Denken Sie an "
          "Betreff, Anrede, Einleitung, Schluss und Gruß. In der Prüfung wählen Sie zwischen zwei Aufgaben.", 3)
u6 += [box([R(MAIL_SIT, "cell"), Spacer(1, 3)] + [R(f"{sym('▸')} {lp}", "cell") for lp in MAIL_LP], NOTE, GELB),
       Spacer(1, 3),
       R("<b>Tipp:</b> Jeder Leitpunkt bekommt einen eigenen Absatz mit 2–3 Sätzen: Frage oder Anliegen + eigene Situation + "
         "Grund. Siezen Sie die Person durchgehend.", "small")]
s += [KeepTogether(u6)]

# listening text to read aloud
s += [CondPageBreak(70 * mm), Spacer(1, 6), R("Hörtext zum Vorlesen (Partner/Lehrkraft)", "h2"),
      R("Bitte erst nach Übung 4 lesen. Lesen Sie in normalem Tempo und nur einmal vor.", "small")]
s += [R(f"<b>{sp}:</b> {t}", "dlg") for sp, t in HOER]

# solutions
s += [Spacer(1, 4), KeepTogether([
    R("Lösungen", "h2"), R("Zum Selbstkontrollieren – erst üben, dann nachschauen!", "small"),
    R(f"Übung 2 · Wortschatz (übrig: {', '.join(GAP_REST)})", "solh"),
    R(" · ".join(f"<b>{i}</b> {w}" for i, w in enumerate(GAP_SOL, 1)), "sol")])]
s += [R("Übung 3 · Leseverstehen", "solh")] + [R(f"<b>{i} – {a}</b>  {b}", "sol") for i, (a, b) in enumerate(MC_SOL, 1)]
s += [R("Übung 4 · Hörverstehen", "solh")] + [
    R(f"<b>{i} – {'richtig' if ok else 'falsch'}</b>  {RF_WHY[i - 1]}", "sol") for i, (_, ok) in enumerate(RF, 1)]
s += [KeepTogether([R("Übung 6 · Mustertext (Leitpunkte: " + MUSTER_LP + ")", "solh"),
      box([R(p, "mu") for p in MUSTER], HELLGRUEN, GRUEN)]),
      R(f"<i>Ca. {sum(len(p.split()) for p in MUSTER[1:])} Wörter ohne Betreff. Ihr Text darf anders aussehen – wichtig sind "
        "Leitpunkte, Absätze, passende Anrede und Schluss.</i>", "small")]

if __name__ == "__main__":
    build(SLUG, HEAD, LEVEL, s)
