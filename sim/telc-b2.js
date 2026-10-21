// telc Deutsch B2 – komplette Prüfungssimulation mit Vorbereitungsseite.
// Eigene Übungsaufgaben im Stil der Prüfung, keine offiziellen Aufgaben (keine Inhalte aus Modelltests oder Lehrbüchern).
(window.SIM = window.SIM || {})["telc-b2"] = {
  id: "telc-b2",
  title: "telc Deutsch B2",
  short: "telc B2",
  provider: "telc",
  level: "B2",
  intro:
    "Für alle, die einen anerkannten B2-Nachweis für Beruf, Anerkennung, Weiterbildung oder Studium brauchen. Schriftlich: Lesen, Sprachbausteine, Hören und Schreiben – danach die mündliche Paarprüfung.",
  rule: "telc",
  skills: {
    lesen: { label: "Leseverstehen", max: 75 },
    sb: { label: "Sprachbausteine", max: 30 },
    hoeren: { label: "Hörverstehen", max: 75 },
    schreiben: { label: "Schriftlicher Ausdruck", max: 45 },
    muendlich: { label: "Mündliche Prüfung", max: 75 },
  },
  sections: [
    // ───────────────────────── LESEN + SPRACHBAUSTEINE ─────────────────────────
    {
      id: "lesen",
      title: "Leseverstehen und Sprachbausteine",
      minutes: 90,
      note: "Empfehlung: Lesen 1 ca. 15, Lesen 2 ca. 20, Lesen 3 ca. 20, Sprachbausteine 1 ca. 15, Sprachbausteine 2 ca. 20 Min.",
      parts: [
        {
          title: "Leseverstehen Teil 1",
          skill: "lesen",
          pts: 5,
          instr:
            "Lesen Sie zuerst die zehn Überschriften. Lesen Sie dann die fünf Texte und entscheiden Sie, welche Überschrift (a–j) am besten zu welchem Text passt. Fünf Überschriften bleiben übrig.",
          material: [
            {
              h: "Text 1",
              t: "Wer kennt das nicht: Der Kleiderschrank quillt über, im Flur stapeln sich die Schuhe, und auf dem Schreibtisch liegen noch Rechnungen vom letzten Jahr. Die Autorin Petra Lindholm verspricht keine Wunder über Nacht. Ihr Ansatz: jeden Tag nur 15 Minuten und jeden Tag nur eine Schublade, ein Regal oder eine Ecke. Mit Checklisten für jedes Zimmer und vielen Fotos zeigt sie, wie man entscheidet, was bleiben darf und was gehen muss. Neue Möbel oder teure Aufbewahrungssysteme braucht man dafür nicht – im Gegenteil: Lindholm erklärt, warum wir gerade dadurch oft noch mehr Dinge anhäufen.",
            },
            {
              h: "Text 2",
              t: "Tomaten, Zucchini, Kräuter und sogar Erdbeeren – und das auf nur vier Quadratmetern im dritten Stock. Der Journalist Marco Reiter hat vor fünf Jahren angefangen, auf seinem Stadtbalkon Gemüse anzubauen. Heute kauft er im Sommer kaum noch Gemüse im Supermarkt. In seinem Buch beschreibt er Schritt für Schritt, welche Pflanzen sich für Kübel und Kästen eignen, wie man mit wenig Wasser auskommt und was gegen Schnecken hilft. Ein Kalender zeigt, wann gesät und geerntet wird. Rezepte sucht man allerdings vergeblich – dafür gibt es viele Tipps, wie man die eigene Ernte haltbar macht.",
            },
            {
              h: "Text 3",
              t: "Um drei Uhr nachts wach liegen und an die Arbeit denken – rund ein Drittel der Erwachsenen kennt dieses Problem. Die Schlafmedizinerin Dr. Ulrike Brandt erklärt in ihrem Ratgeber verständlich, warum unser Schlaf so empfindlich auf Stress, spätes Essen oder das Licht von Bildschirmen reagiert. Mit dem Thema Träume beschäftigt sie sich nur am Rande. Im Mittelpunkt stehen praktische Übungen: Atemtechniken, feste Abendrituale und ein Vier-Wochen-Programm, mit dem Leserinnen und Leser ihren Schlafrhythmus Schritt für Schritt wieder in Ordnung bringen können – ganz ohne Tabletten.",
            },
            {
              h: "Text 4",
              t: "Der Kollege, der ständig fremde Ideen als seine eigenen ausgibt, die Kollegin, die in jeder Besprechung schlechte Laune verbreitet – Ärger im Team kostet Kraft und Nerven. Der Mediator Stefan Okafor zeigt anhand vieler Beispiele aus seiner Praxis, wie man schwierige Gespräche vorbereitet, ruhig bleibt und Grenzen setzt, ohne die Zusammenarbeit zu gefährden. Das Buch richtet sich ausdrücklich nicht an Vorgesetzte, sondern an Beschäftigte, die selbst etwas verändern wollen. Besonders hilfreich sind die Formulierungsvorschläge am Ende jedes Kapitels, die man direkt im Arbeitsalltag ausprobieren kann.",
            },
            {
              h: "Text 5",
              t: "Familie Schröder aus Kassel – zwei Erwachsene, drei Kinder – hat ein Jahr lang jeden Kassenbon gesammelt. Das Ergebnis war erschreckend: Fast ein Viertel der eingekauften Lebensmittel landete im Müll. Im Buch erzählen die Eltern, wie sie ihre Ausgaben für Essen und Trinken um mehr als 200 Euro im Monat gesenkt haben: mit Wochenplänen, Einkaufslisten, Resteessen und einem klaren Familienbudget. Dabei sind auch die Kinder eingebunden, die zum Beispiel den Speiseplan für den Sonntag selbst gestalten. Ein praktischer Ratgeber für alle, die bewusster und günstiger einkaufen wollen.",
            },
          ],
          opts: [
            "a) Endlich wieder durchschlafen – Wege aus der nächtlichen Unruhe",
            "b) Wie Familien beim Einkaufen von Lebensmitteln sparen können",
            "c) Erfolgreich bewerben im Ausland",
            "d) Mit kleinen Schritten zu mehr Ordnung in der Wohnung",
            "e) Schlafforschung: Was unsere Träume über uns verraten",
            "f) Wenn Kollegen zur Belastung werden – Konflikte im Team selbst lösen",
            "g) Die eigene Wohnung umbauen – günstig und ohne Handwerker",
            "h) Frisches Gemüse vom eigenen Balkon",
            "i) Kochen für Kinder: schnelle Rezepte ohne Fertigprodukte",
            "j) Gesund führen: Was Chefs für ihr Team tun können",
          ],
          items: [
            {
              q: "Text 1",
              a: 3,
              why: "„jeden Tag nur 15 Minuten … eine Schublade, ein Regal“ – Aufräumen in kleinen Schritten; neue Möbel oder Umbau (g) sind ausdrücklich nicht nötig.",
            },
            {
              q: "Text 2",
              a: 7,
              why: "„auf seinem Stadtbalkon Gemüse anzubauen“ – Rezepte gibt es dagegen nicht, also nicht (i).",
            },
            {
              q: "Text 3",
              a: 0,
              why: "Es geht um Schlafprobleme und ein Programm für den Schlafrhythmus; Träume behandelt die Autorin „nur am Rande“, also nicht (e).",
            },
            {
              q: "Text 4",
              a: 5,
              why: "Ärger mit Kollegen; das Buch richtet sich „ausdrücklich nicht an Vorgesetzte“, also nicht (j).",
            },
            {
              q: "Text 5",
              a: 1,
              why: "Die Familie senkt ihre „Ausgaben für Essen und Trinken um mehr als 200 Euro“ – es geht ums Sparen, nicht um Kinderrezepte (i).",
            },
          ],
        },
        {
          title: "Leseverstehen Teil 2",
          skill: "lesen",
          pts: 5,
          instr:
            "Lesen Sie den Text und lösen Sie die Aufgaben. Entscheiden Sie, welche Lösung (a, b oder c) richtig ist.",
          material: [
            {
              h: "Arbeiten zwischen Kuhweide und Kirchturm",
              t: "Wie Coworking-Räume auf dem Land Pendlern das Leben erleichtern sollen\n\nWenn Miriam Kessler morgens ihr Büro aufschließt, hört sie statt Straßenlärm das Läuten der Kirchenglocken. Die 38-jährige Grafikdesignerin arbeitet seit zwei Jahren in einem ehemaligen Bahnhofsgebäude in Lindenbrück, einem Dorf mit knapp 1.800 Einwohnern im Sauerland. Früher ist sie jeden Tag fast eine Stunde nach Dortmund gefahren – mit dem Auto, weil die Busverbindung zu unzuverlässig war. „Ich habe im Jahr ungefähr 400 Stunden im Stau verbracht“, erzählt sie. „Das sind zehn volle Arbeitswochen.“\n\nHeute teilt sie sich das renovierte Bahnhofsgebäude mit einem Steuerberater, zwei Programmierern und einer Übersetzerin. Für einen festen Schreibtisch zahlt sie 190 Euro im Monat, Internet, Kaffee und die Nutzung eines Besprechungsraums inklusive. Ihr Arbeitgeber, eine Werbeagentur, übernimmt die Hälfte der Kosten. An zwei Tagen pro Woche fährt Kessler weiterhin in die Stadt, um an Teamsitzungen teilzunehmen.\n\nDie Idee ist nicht neu. In Großstädten gibt es Coworking-Spaces schon seit vielen Jahren, vor allem für Selbstständige und junge Firmengründer. Neu ist, dass solche Angebote zunehmend auch in kleineren Orten entstehen. Nach Angaben eines Branchenverbands hat sich ihre Zahl im ländlichen Raum in den letzten fünf Jahren mehr als verdreifacht. Ein wichtiger Grund dafür ist die Erfahrung vieler Beschäftigter, dass ihre Arbeit auch außerhalb des Firmenbüros gut funktioniert.\n\nAllerdings ist das Homeoffice nicht für alle eine Lösung. „Zu Hause fehlt vielen die klare Trennung zwischen Beruf und Privatleben“, sagt die Arbeitspsychologin Dr. Hanna Velten. „Wer am Küchentisch arbeitet, hört oft gar nicht mehr richtig auf.“ Hinzu komme die Einsamkeit: Gerade Menschen, die allein leben, vermissten den Austausch mit anderen. Ein Coworking-Raum im Ort könne beides bieten – einen Arbeitsplatz außerhalb der eigenen vier Wände und soziale Kontakte, ohne dass man dafür weite Strecken fahren müsse.\n\nAuch die Gemeinden haben ein Interesse an den neuen Arbeitsorten. Lindenbrücks Bürgermeister Rolf Hagedorn hat das leer stehende Bahnhofsgebäude mit Fördergeldern des Landes umbauen lassen. „Wir verlieren seit Jahren junge Leute an die Städte“, sagt er. „Wenn sie hier arbeiten können, bleiben sie vielleicht – oder sie kommen sogar zurück.“ Tatsächlich sind zwei der heutigen Nutzer erst vor Kurzem aus Köln ins Dorf gezogen. Und auch die Bäckerei gegenüber profitiert: Mittags ist sie inzwischen deutlich voller als früher.\n\nGanz ohne Probleme läuft es aber nicht. Viele ländliche Coworking-Räume kämpfen ums wirtschaftliche Überleben, weil an manchen Tagen nur wenige Plätze besetzt sind. Besonders montags und freitags bleibt es oft leer. Einige Betreiber setzen deshalb auf zusätzliche Angebote: Abends finden Yoga- oder Sprachkurse statt, am Wochenende können Vereine die Räume mieten. Fachleute sind sich einig, dass die Orte langfristig nur bestehen können, wenn sie zu einem echten Treffpunkt für das ganze Dorf werden.\n\nMiriam Kessler jedenfalls möchte nicht mehr zurück. „Ich habe nicht nur Zeit gewonnen“, sagt sie, „sondern auch Nachbarn, die ich vorher gar nicht kannte.“",
            },
          ],
          items: [
            {
              q: "Warum arbeitet Miriam Kessler heute in Lindenbrück?",
              opts: [
                "Weil ihre Firma das Büro in Dortmund geschlossen hat.",
                "Weil sie die lange Fahrt zur Arbeit vermeiden wollte.",
                "Weil es von ihrem Dorf keine Busverbindung nach Dortmund gibt.",
              ],
              a: 1,
              why: "Sie ist früher fast eine Stunde gefahren und hat „400 Stunden im Stau verbracht“; der Bus war nur „unzuverlässig“, nicht gar nicht vorhanden.",
            },
            {
              q: "Was erfährt man über die Kosten für ihren Arbeitsplatz?",
              opts: [
                "Sie bezahlt die Miete vollständig selbst.",
                "Für den Besprechungsraum muss sie extra bezahlen.",
                "Ein Teil wird von ihrem Arbeitgeber übernommen.",
              ],
              a: 2,
              why: "„Ihr Arbeitgeber … übernimmt die Hälfte der Kosten“; der Besprechungsraum ist „inklusive“.",
            },
            {
              q: "Warum gibt es immer mehr Coworking-Räume auf dem Land?",
              opts: [
                "Viele Beschäftigte haben gemerkt, dass sie nicht unbedingt im Firmenbüro arbeiten müssen.",
                "Vor allem Firmengründer ziehen aus den Großstädten weg.",
                "Ein Branchenverband unterstützt neue Standorte finanziell.",
              ],
              a: 0,
              why: "„Ein wichtiger Grund dafür ist die Erfahrung vieler Beschäftigter, dass ihre Arbeit auch außerhalb des Firmenbüros gut funktioniert.“",
            },
            {
              q: "Was sagt Dr. Velten über das Homeoffice?",
              opts: [
                "Es ist für Menschen, die allein leben, besonders gut geeignet.",
                "Viele Menschen arbeiten dort weniger als im Büro.",
                "Vielen fällt es schwer, dort Arbeit und Privatleben zu trennen.",
              ],
              a: 2,
              why: "„Zu Hause fehlt vielen die klare Trennung zwischen Beruf und Privatleben“ – Alleinlebende fühlen sich eher einsam.",
            },
            {
              q: "Welches Problem haben viele Coworking-Räume auf dem Land?",
              opts: [
                "Die Gemeinden bekommen dafür keine Fördergelder.",
                "An manchen Tagen sind zu wenige Plätze belegt.",
                "Vereine und Kursanbieter wollen die Räume nicht nutzen.",
              ],
              a: 1,
              why: "Sie kämpfen ums Überleben, „weil an manchen Tagen nur wenige Plätze besetzt sind“.",
            },
          ],
        },
        {
          title: "Leseverstehen Teil 3",
          skill: "lesen",
          pts: 2.5,
          instr:
            "Lesen Sie die zehn Situationen und die zwölf Anzeigen. Welche Anzeige (a–l) passt zu welcher Situation? Jede Anzeige kann nur einmal gewählt werden. Für eine Situation gibt es keine passende Anzeige. Wählen Sie in diesem Fall x.",
          material: [
            {
              h: "a) Speiche & Co.",
              t: "Ihr Rad quietscht, die Bremsen greifen nicht mehr richtig? In unserer offenen Fahrradwerkstatt reparieren Sie Ihr Rad selbst – mit unserem Werkzeug und mit der Unterstützung erfahrener Ehrenamtlicher, die Ihnen jeden Handgriff erklären. Geöffnet Mi 16–20 Uhr und Sa 10–14 Uhr. Ersatzteile zum Selbstkostenpreis. Kantstraße 12, Münster",
            },
            {
              h: "b) Zweirad Bäumer",
              t: "Reparatur-Express: Abgabe bis 10 Uhr, Abholung am selben Tag ab 17 Uhr. Kostenloser Hol- und Bringservice im ganzen Stadtgebiet. Unsere Meisterwerkstatt repariert alle Marken, auch E-Bikes. Tel. 0251/44 87 20",
            },
            {
              h: "c) Sprachschule Lingua Viva",
              t: "Spanisch für den Beruf: telefonieren, E-Mails schreiben, verhandeln. Kleingruppen mit höchstens acht Personen, montags und mittwochs von 18.30 bis 20.00 Uhr in unseren Räumen direkt am Hauptbahnhof. Kostenloser Einstufungstest vor Kursbeginn.",
            },
            {
              h: "d) campus-live",
              t: "Business-Spanisch live: Lernen Sie bequem von zu Hause aus im virtuellen Klassenzimmer – mit muttersprachlichen Trainerinnen und Trainern. Dienstag und Donnerstag, 19.00–20.30 Uhr. Kurse für alle Niveaus von A2 bis C1. Die erste Stunde ist gratis!",
            },
            {
              h: "e) Rettungsdienst Westfalen-Mitte e. V.",
              t: "Erste Hilfe für Führerscheinbewerber: Unser eintägiger Kurs erfüllt alle Anforderungen der Fahrerlaubnisbehörde. Nächste Termine: Samstag, 7. November, und Samstag, 21. November, jeweils 9.00–16.30 Uhr. Anmeldung online oder unter 0251/39 11 50.",
            },
            {
              h: "f) Schwimmschule Delfin",
              t: "Ferien-Intensivkurse in den Herbstferien! Zwei Wochen lang täglich 45 Minuten – am Ende steht das Seepferdchen oder das Bronze-Abzeichen. Für Kinder von 5 bis 10 Jahren, auch für absolute Anfänger. Hallenbad Süd. Info: 0251/67 30 12",
            },
            {
              h: "g) TV Münster-Ost, Abteilung Schwimmen",
              t: "Aqua-Fitness: Training im Wasser schont die Gelenke und eignet sich besonders nach Verletzungen und Operationen. Für Erwachsene jeden Alters, montags und donnerstags um 19 Uhr. Die erste Schnupperstunde ist kostenlos.",
            },
            {
              h: "h) Ferienhaus Dünenblick, St. Peter-Ording",
              t: "Reetdachhaus für bis zu sechs Personen, nur 200 Meter bis zum Strand, mit Garten und Sauna. Nichtraucherhaus, Haustiere sind leider nicht erlaubt. Buchung: 04863/88 21 40",
            },
            {
              h: "i) Ferienwohnungen Möwennest, Büsum",
              t: "Gemütliche Wohnungen für zwei bis fünf Personen, direkt hinter dem Deich. Ihr Vierbeiner ist bei uns herzlich willkommen – eingezäunter Garten und Hundestrand ganz in der Nähe. Tel. 04834/91 70 33",
            },
            {
              h: "j) Volkshochschule Münster",
              t: "Smartphone-Sprechstunde für Seniorinnen und Senioren: Fotos verschicken, mit den Enkeln per Video telefonieren, Busfahrkarten per App kaufen – junge Ehrenamtliche beantworten geduldig Ihre Fragen. Jeden Dienstag 10–12 Uhr, ohne Anmeldung, kostenlos.",
            },
            {
              h: "k) Tanzschule Rhythmus",
              t: "Ihr großer Tag kommt bald? In unserem Crashkurs Hochzeitstanz lernen Paare ohne Vorkenntnisse an vier Abenden ihren Eröffnungstanz – gern auch zu Ihrem Lieblingslied. Einzelstunden auf Anfrage. Tel. 0251/52 08 66",
            },
            {
              h: "l) Restaurant Zur alten Mühle",
              t: "Wir suchen für Samstag und Sonntag freundliche Aushilfen im Service. Erfahrung ist kein Muss – wir arbeiten Sie gründlich ein. Faire Bezahlung plus Trinkgeld. Bewerbung per E-Mail oder einfach vorbeikommen!",
            },
          ],
          opts: [
            "a) Speiche & Co.",
            "b) Zweirad Bäumer",
            "c) Sprachschule Lingua Viva",
            "d) campus-live",
            "e) Rettungsdienst Westfalen-Mitte",
            "f) Schwimmschule Delfin",
            "g) TV Münster-Ost, Schwimmen",
            "h) Ferienhaus Dünenblick",
            "i) Ferienwohnungen Möwennest",
            "j) Volkshochschule Münster",
            "k) Tanzschule Rhythmus",
            "l) Restaurant Zur alten Mühle",
            "x) keine passende Anzeige",
          ],
          items: [
            {
              q: "Ihr Neffe macht gerade den Führerschein und braucht noch einen Erste-Hilfe-Kurs. Unter der Woche hat er keine Zeit.",
              a: 4,
              why: "Anzeige e: eintägiger Kurs für Führerscheinbewerber, Termine am Samstag.",
            },
            {
              q: "Ein Freund möchte lernen, wie er sein Fahrrad selbst reparieren kann.",
              a: 0,
              why: "Anzeige a: offene Werkstatt, man repariert selbst und bekommt „jeden Handgriff“ erklärt; b repariert nur für den Kunden.",
            },
            {
              q: "Ihre Freundin möchte ihr Spanisch für die Arbeit verbessern. Sie hat abends Zeit, möchte aber nicht extra in die Stadt fahren.",
              a: 3,
              why: "Anzeige d: Business-Spanisch online „bequem von zu Hause aus“, abends; c findet am Hauptbahnhof statt.",
            },
            {
              q: "Sie haben Ihr Studium beendet und möchten Ihre alten Fachbücher verkaufen.",
              a: 12,
              why: "Keine Anzeige bietet einen Ankauf oder Verkauf von Büchern an.",
            },
            {
              q: "Ihre Nachbarin ist 74 Jahre alt und hat ein neues Handy bekommen. Sie möchte lernen, damit Fotos an ihre Enkel zu schicken.",
              a: 9,
              why: "Anzeige j: Smartphone-Sprechstunde für Senioren, u. a. „Fotos verschicken“.",
            },
            {
              q: "Familie Yilmaz möchte mit ihrem Hund eine Woche Urlaub an der Nordsee machen.",
              a: 8,
              why: "Anzeige i: „Ihr Vierbeiner ist bei uns herzlich willkommen“; in h sind Haustiere nicht erlaubt.",
            },
            {
              q: "Ein Kollege hatte vor drei Monaten eine Knieoperation und möchte jetzt langsam wieder Sport treiben.",
              a: 6,
              why: "Anzeige g: Training im Wasser, schont die Gelenke, „besonders nach Verletzungen und Operationen“.",
            },
            {
              q: "Eine Bekannte sucht für ihre achtjährige Tochter, die noch nicht schwimmen kann, einen Kurs in den Ferien.",
              a: 5,
              why: "Anzeige f: Ferien-Intensivkurse für Kinder von 5 bis 10 Jahren, auch für Anfänger; g ist nur für Erwachsene.",
            },
            {
              q: "Ein Student sucht einen Job, mit dem er am Wochenende Geld verdienen kann. In der Gastronomie hat er noch nie gearbeitet.",
              a: 11,
              why: "Anzeige l: Aushilfen für Samstag und Sonntag, „Erfahrung ist kein Muss“.",
            },
            {
              q: "Ihr Bruder und seine Verlobte heiraten im Frühjahr. Sie haben noch nie getanzt, möchten auf ihrer Feier aber den ersten Tanz zeigen.",
              a: 10,
              why: "Anzeige k: Crashkurs Hochzeitstanz für Paare „ohne Vorkenntnisse“.",
            },
          ],
        },
        {
          title: "Sprachbausteine Teil 1",
          skill: "sb",
          pts: 1.5,
          instr:
            "Lesen Sie den Text und entscheiden Sie, welches Wort (a, b oder c) in die Lücken 1–10 passt.",
          material: [
            {
              h: "E-Mail an ein Tagungshotel",
              t: "Betreff: Anfrage für eine Fortbildung Ende November\n\nSehr geehrte Damen und Herren,\n\nwir sind ein mittelständisches Unternehmen aus Bielefeld, {1} sich auf Antriebstechnik spezialisiert hat. Für Ende November planen wir eine zweitägige Fortbildung für unsere Führungskräfte. Auf Ihrer Internetseite habe ich gelesen, {2} Ihr Tagungshotel über mehrere moderne Seminarräume verfügt.\n\nWir rechnen mit etwa 25 Teilnehmenden, von {3} die meisten mit dem Zug anreisen werden. Deshalb wäre es wichtig, dass vom Bahnhof ein Transfer {4} werden kann. {5} der langen Anreise einiger Kollegen wäre außerdem ein früher Check-in am Vormittag wünschenswert. Könnten Sie mir bitte auch mitteilen, ob die Räume {6} Beamer und Flipcharts ausgestattet sind?\n\nAm Nachmittag des zweiten Tages möchten wir gern Ihren Fahrradverleih in {7} nehmen, um gemeinsam eine kleine Tour zu machen. Wir {8} Ihnen sehr dankbar, wenn Sie uns dafür eine passende Route empfehlen könnten.\n\nDa wir die Entscheidung bald treffen müssen, bitte ich Sie, mir Ihr Angebot {9} zum 15. Oktober zuzusenden. {10} Sie im November keine freien Räume mehr haben, kämen für uns auch die ersten beiden Dezemberwochen infrage.\n\nMit freundlichen Grüßen\nKatrin Wolters\nPersonalabteilung\nHellmann Antriebstechnik GmbH",
            },
          ],
          items: [
            {
              q: "",
              opts: ["der", "das", "was"],
              a: 1,
              why: "Relativpronomen bezieht sich auf „das Unternehmen“ (neutral, Nominativ): das.",
            },
            {
              q: "",
              opts: ["ob", "weil", "dass"],
              a: 2,
              why: "Nach „ich habe gelesen“ folgt ein Inhaltssatz mit „dass“; „ob“ passt nur zu einer Frage.",
            },
            {
              q: "",
              opts: ["denen", "deren", "die"],
              a: 0,
              why: "„von“ verlangt den Dativ; Relativpronomen Dativ Plural: denen.",
            },
            {
              q: "",
              opts: ["organisieren", "organisiert", "organisierte"],
              a: 1,
              why: "Passiv mit Modalverb: organisiert werden kann (Partizip II + werden).",
            },
            {
              q: "",
              opts: ["Trotz", "Wegen", "Statt"],
              a: 1,
              why: "Die lange Anreise ist der Grund für den Wunsch: wegen + Genitiv.",
            },
            {
              q: "",
              opts: ["von", "durch", "mit"],
              a: 2,
              why: "Feste Verbindung: ausgestattet sein mit + Dativ.",
            },
            {
              q: "",
              opts: ["Auftrag", "Betracht", "Anspruch"],
              a: 2,
              why: "Nomen-Verb-Verbindung: etwas in Anspruch nehmen (= nutzen).",
            },
            {
              q: "",
              opts: ["würden", "wären", "hätten"],
              a: 1,
              why: "Höfliche Bitte mit Konjunktiv II von sein: Wir wären Ihnen dankbar, wenn … („würden“ ginge nur mit „sein“ am Ende).",
            },
            {
              q: "",
              opts: ["bis", "seit", "ab"],
              a: 0,
              why: "Eine Frist nennt man mit „bis zum 15. Oktober“.",
            },
            {
              q: "",
              opts: ["Falls", "Obwohl", "Damit"],
              a: 0,
              why: "Bedingung: Falls Sie keine Räume haben, kämen auch andere Termine infrage.",
            },
          ],
        },
        {
          title: "Sprachbausteine Teil 2",
          skill: "sb",
          pts: 1.5,
          instr:
            "Lesen Sie den Text und entscheiden Sie, welches Wort (a–o) in die Lücken 1–10 passt. Jedes Wort passt nur einmal. Fünf Wörter bleiben übrig.",
          material: [
            {
              h: "Ehrenamt im Wandel",
              t: "Immer mehr Menschen in Deutschland engagieren sich ehrenamtlich. Nach einer aktuellen {1} ist fast jeder dritte Erwachsene in einem Verein, einer Initiative oder einem sozialen Projekt aktiv. Besonders {2} sind Tätigkeiten im Sport, in der Kultur und in der Nachbarschaftshilfe.\n\nDie Gründe für ein Ehrenamt sind sehr unterschiedlich. Viele möchten der Gesellschaft etwas {3}, andere suchen neue Kontakte oder wollen Erfahrungen sammeln, die ihnen auch im Beruf {4}. {5} berichten Vereine seit einigen Jahren, dass es schwieriger geworden ist, Menschen für längere Zeit zu gewinnen. Viele Freiwillige möchten sich nicht mehr fest {6}, sondern lieber bei einzelnen Projekten mitarbeiten.\n\nDarauf haben einige Städte bereits {7}: Sie bieten Online-Plattformen an, auf {8} Interessierte kurzfristige Einsätze finden können – vom Vorlesen in der Kita bis zur Hilfe beim Stadtfest. Fachleute {9} jedoch davor, das klassische Vereinsleben zu vernachlässigen. {10} ohne die vielen Menschen, die sich regelmäßig engagieren, würden zahlreiche Angebote schnell verschwinden.",
            },
          ],
          opts: [
            "a) allerdings",
            "b) beliebt",
            "c) binden",
            "d) denen",
            "e) denn",
            "f) deren",
            "g) Ergebnis",
            "h) nützen",
            "i) obwohl",
            "j) reagiert",
            "k) Umfrage",
            "l) warnen",
            "m) weil",
            "n) zurückgeben",
            "o) zurücknehmen",
          ],
          items: [
            {
              q: "",
              a: 10,
              why: "„einer aktuellen …“ verlangt ein feminines Nomen: Umfrage („Ergebnis“ ist neutral).",
            },
            {
              q: "",
              a: 1,
              why: "Besonders beliebt sind … – Adjektiv nach „sind“.",
            },
            {
              q: "",
              a: 13,
              why: "der Gesellschaft etwas zurückgeben = etwas Gutes tun, weil man selbst etwas bekommen hat.",
            },
            {
              q: "",
              a: 7,
              why: "Erfahrungen, die ihnen (Dativ) im Beruf nützen.",
            },
            {
              q: "",
              a: 0,
              why: "Gegensatz mit Verb auf Position 2: Allerdings berichten Vereine …; „obwohl“ und „weil“ verlangen Verbendstellung.",
            },
            {
              q: "",
              a: 2,
              why: "sich (fest) binden = sich langfristig verpflichten.",
            },
            {
              q: "",
              a: 9,
              why: "auf etwas reagieren → Darauf haben einige Städte reagiert.",
            },
            {
              q: "",
              a: 3,
              why: "Relativpronomen nach „auf“ (Wo?) im Dativ Plural, bezogen auf Plattformen: auf denen.",
            },
            {
              q: "",
              a: 11,
              why: "warnen vor + Dativ → davor warnen, etwas zu tun.",
            },
            {
              q: "",
              a: 4,
              why: "„denn“ steht auf Position 0, danach folgt „ohne die vielen Menschen“ und das Verb; „weil“ würde Verbendstellung verlangen.",
            },
          ],
        },
      ],
    },

    // ───────────────────────── HÖREN ─────────────────────────
    {
      id: "hoeren",
      title: "Hörverstehen",
      minutes: 20,
      parts: [
        {
          title: "Hörverstehen Teil 1",
          skill: "hoeren",
          pts: 5,
          plays: 1,
          instr:
            "Sie hören fünf kurze Äußerungen zum Thema „Bezahlen ohne Bargeld“. Sie hören jede Äußerung nur einmal. Entscheiden Sie bei jeder Aussage, ob sie richtig oder falsch ist. Lesen Sie zuerst die Aussagen.",
          audio: [
            {
              h: "Beitrag 1",
              lines: [
                {
                  s: "f",
                  t: "Also, ich zahl eigentlich fast alles mit dem Handy. Im Supermarkt, an der Tankstelle, sogar im Kino. Geht einfach schneller, ne? Aber, äh, ganz ohne Bargeld geht's bei mir trotzdem nicht. Ich hab immer so zwanzig Euro im Portemonnaie, für den Wochenmarkt zum Beispiel, oder für den kleinen Bäcker bei uns um die Ecke. Der nimmt nämlich keine Karten.",
                },
              ],
            },
            {
              h: "Beitrag 2",
              lines: [
                {
                  s: "m",
                  t: "Ich bin da altmodisch, das geb ich zu. Am Monatsanfang heb ich einen festen Betrag ab und teil mir das Geld ein. Und wenn das Portemonnaie leer ist, dann ist es eben leer. Mit der Karte, da merkt man ja gar nicht, wie viel man ausgibt. Zack, bezahlt, und am Monatsende wundert man sich. So weiß ich wenigstens immer genau, wo ich stehe.",
                },
              ],
            },
            {
              h: "Beitrag 3",
              lines: [
                {
                  s: "f2",
                  t: "Ich hab ein kleines Café in der Altstadt. Lange Zeit hab ich nur Bargeld genommen, weil ich für jede Kartenzahlung Gebühren zahlen muss. Aber immer mehr Gäste haben gefragt, und manche sind sogar wieder gegangen. Na ja. Seit letztem Jahr kann man bei mir auch mit Karte zahlen, und, ehrlich gesagt, seitdem verkauf ich mehr. Die Leute bestellen dann eben noch ein Stück Kuchen dazu. Also, die Gebühren, die lohnen sich.",
                },
              ],
            },
            {
              h: "Beitrag 4",
              lines: [
                {
                  s: "m2",
                  t: "Praktisch ist das alles schon, keine Frage. Aber mich stört, dass bei jeder Zahlung irgendwo gespeichert wird, was ich wann und wo gekauft hab. Und wer hat denn Zugriff auf diese Daten? Die Bank, die Firma hinter der App, vielleicht noch andere? Das weiß doch keiner so genau. Deshalb zahl ich größere Sachen lieber bar.",
                },
              ],
            },
            {
              h: "Beitrag 5",
              lines: [
                {
                  s: "f",
                  t: "Ich bin Studentin und geh oft mit Freunden essen. Früher war das mit dem Bezahlen immer total kompliziert. Wer hat Kleingeld, wer kriegt noch was zurück, und so weiter. Heute zahlt einer die ganze Rechnung, und die anderen schicken ihm ihren Anteil einfach per App. Dauert zehn Sekunden. Bargeld hab ich, ehrlich gesagt, fast nie dabei.",
                },
              ],
            },
          ],
          opts: ["Richtig", "Falsch"],
          items: [
            {
              au: 0,
              q: "Die Frau bezahlt inzwischen gar nicht mehr mit Bargeld.",
              a: 1,
              why: "„ganz ohne Bargeld geht's bei mir trotzdem nicht“ – sie hat immer 20 Euro für Markt und Bäcker dabei.",
            },
            {
              au: 1,
              q: "Der Mann behält mit Bargeld besser den Überblick über seine Ausgaben.",
              a: 0,
              why: "„So weiß ich wenigstens immer genau, wo ich stehe.“",
            },
            {
              au: 2,
              q: "Die Café-Besitzerin ist unzufrieden, seit sie Kartenzahlung anbietet.",
              a: 1,
              why: "Seitdem verkauft sie mehr: „die Gebühren, die lohnen sich“.",
            },
            {
              au: 3,
              q: "Der Mann macht sich Sorgen darüber, was mit seinen Daten passiert.",
              a: 0,
              why: "„mich stört, dass … gespeichert wird“ und „Wer hat denn Zugriff auf diese Daten?“",
            },
            {
              au: 4,
              q: "Für die Studentin ist es mit Bargeld einfacher, eine Rechnung unter Freunden zu teilen.",
              a: 1,
              why: "Früher mit Bargeld war es „total kompliziert“, heute per App dauert es zehn Sekunden.",
            },
          ],
        },
        {
          title: "Hörverstehen Teil 2",
          skill: "hoeren",
          pts: 2.5,
          plays: 2,
          instr:
            "Sie hören ein Interview aus der Radiosendung „Arbeitswelten“. Sie hören das Interview zweimal. Entscheiden Sie bei den Aussagen 1–10, ob sie richtig oder falsch sind. Lesen Sie jetzt die Aussagen.",
          audio: [
            {
              h: "Interview: Vom Bankschalter in die Werkstatt",
              lines: [
                {
                  s: "f",
                  t: "Und hier ist wieder Arbeitswelten auf Radio Ruhrwelle, schön, dass Sie dabei sind. Mein Gast heute ist Jonas Behrendt. Er hat mit vierunddreißig Jahren seinen sicheren Job bei einer Bank aufgegeben und eine Ausbildung zum Tischler angefangen. Herr Behrendt, herzlich willkommen!",
                },
                { s: "m", t: "Hallo, danke, dass ich hier sein darf." },
                {
                  s: "f",
                  t: "Erzählen Sie doch mal. Wie sah Ihr beruflicher Weg bis dahin aus?",
                },
                {
                  s: "m",
                  t: "Ja, also, ganz klassisch eigentlich. Nach dem Abitur hab ich eine Ausbildung zum Bankkaufmann gemacht, bei einer Sparkasse hier in der Region. Und danach bin ich da geblieben, war zuletzt in der Kreditabteilung, äh, vor allem für Privatkunden zuständig. Insgesamt waren das, warten Sie mal, vierzehn Jahre.",
                },
                {
                  s: "f",
                  t: "Vierzehn Jahre, das ist ja eine lange Zeit. Gab's denn einen bestimmten Auslöser? Viele denken jetzt vielleicht, man hat Ihnen gekündigt.",
                },
                {
                  s: "m",
                  t: "Nein, nein, im Gegenteil. Mir wurde sogar eine Stelle als Abteilungsleiter angeboten. Aber, also, ich hab gemerkt, dass ich mich gar nicht darauf freue. Der eigentliche Auslöser war dann das Haus von meiner Großmutter. Das haben wir geerbt, und ich hab ein ganzes Jahr lang an den Wochenenden renoviert. Fenster, Türen, eine Treppe aus Eiche.",
                },
                { s: "f", t: "Mhm." },
                {
                  s: "m",
                  t: "Und da hab ich gemerkt: Das ist es. Wenn ich abends sehe, was ich mit meinen Händen gemacht hab, dann bin ich zufrieden.",
                },
                { s: "f", t: "Und wie hat Ihre Familie reagiert?" },
                {
                  s: "m",
                  t: "Hm, gemischt. Meine Eltern fanden's toll, mein Vater ist selbst Elektriker. Meine Frau war am Anfang, ehrlich gesagt, ziemlich skeptisch. Wir haben zwei Kinder, und da macht man sich natürlich Gedanken ums Geld. Wir haben uns dann zusammengesetzt und alles ganz genau durchgerechnet.",
                },
                {
                  s: "f",
                  t: "Ja, das Geld ist ja wirklich ein Thema. Als Azubi verdient man ja nicht gerade viel.",
                },
                {
                  s: "m",
                  t: "Genau. Im ersten Jahr waren das ungefähr neunhundert Euro brutto. Vorher hatte ich, na ja, ein Vielfaches davon. Wir hatten zum Glück ein bisschen gespart, und meine Frau hat ihre Stunden erhöht. Ohne das wär's nicht gegangen.",
                },
                { s: "f", t: "Wie lange dauert denn so eine Ausbildung?" },
                {
                  s: "m",
                  t: "Normalerweise drei Jahre. Aber weil ich schon Abitur und eine abgeschlossene Ausbildung hatte, konnte ich auf zwei Jahre verkürzen. Das war für uns natürlich ein großer Vorteil.",
                },
                {
                  s: "f",
                  t: "Und in der Berufsschule? Wie war das, mit Mitte dreißig zwischen lauter Siebzehnjährigen?",
                },
                {
                  s: "m",
                  t: "Ach, am Anfang war das schon komisch, ja. Die meisten waren wirklich halb so alt wie ich. Aber ich war nicht der Einzige. Neben mir saß ein ehemaliger Koch, der war sogar schon einundvierzig. Wir zwei waren dann so die, äh, die Opas der Klasse. Aber die Jungen waren total nett, und in Mathe hab ich ihnen oft geholfen.",
                },
                { s: "f", t: "Und wo arbeiten Sie heute?" },
                {
                  s: "m",
                  t: "Ich bin jetzt seit einem Jahr fertig und arbeite als Geselle in einer Tischlerei in Bochum. Wir sind sieben Leute und machen vor allem Möbel nach Maß, also Küchen, Einbauschränke und so weiter. Irgendwann möchte ich vielleicht die Meisterschule machen und mich selbstständig machen. Aber das ist noch Zukunftsmusik.",
                },
                {
                  s: "f",
                  t: "Hilft Ihnen eigentlich Ihre Erfahrung aus der Bank?",
                },
                {
                  s: "m",
                  t: "Ja, auf jeden Fall, mehr, als ich gedacht hätte. Wenn wir bei Kunden sind und ein Angebot besprechen, dann merk ich: Ich kann gut erklären, ich bleib ruhig, auch wenn jemand schwierig ist. Das hab ich bei der Bank ja jahrelang gemacht. Mein Chef schickt mich deshalb oft zu den Beratungsgesprächen.",
                },
                {
                  s: "f",
                  t: "Was würden Sie denn Menschen raten, die auch über einen Neuanfang nachdenken?",
                },
                {
                  s: "m",
                  t: "Also, ganz wichtig: nicht einfach kündigen und loslegen. Ich hab vorher zwei Wochen Urlaub genommen und in einer Tischlerei ein Praktikum gemacht. Da sieht man, wie der Alltag wirklich ist. Dass man früh aufstehen muss, dass es laut ist, dass man abends richtig müde ist. Das empfehle ich jedem.",
                },
                {
                  s: "f",
                  t: "Und zum Schluss: Bereuen Sie, dass Sie nicht schon früher gewechselt haben?",
                },
                {
                  s: "m",
                  t: "Hm, das werd ich oft gefragt. Ehrlich gesagt: nein. Die Jahre in der Bank waren nicht verloren. Ich hab da viel gelernt, und ohne die Ersparnisse hätte ich den Wechsel gar nicht machen können. Es war einfach der richtige Moment.",
                },
                {
                  s: "f",
                  t: "Herr Behrendt, vielen Dank für das Gespräch und weiterhin viel Freude in der Werkstatt!",
                },
                { s: "m", t: "Danke schön, tschüss!" },
              ],
            },
          ],
          opts: ["Richtig", "Falsch"],
          items: [
            {
              au: 0,
              q: "Herr Behrendt hat nach der Schule eine Ausbildung bei einer Bank gemacht.",
              a: 0,
              why: "„Nach dem Abitur hab ich eine Ausbildung zum Bankkaufmann gemacht“.",
            },
            {
              au: 0,
              q: "Er hat den Beruf gewechselt, weil ihm gekündigt wurde.",
              a: 1,
              why: "„Nein, nein, im Gegenteil“ – man hat ihm sogar eine Stelle als Abteilungsleiter angeboten.",
            },
            {
              au: 0,
              q: "Seine Familie war von Anfang an begeistert von der Idee.",
              a: 1,
              why: "Seine Frau war „am Anfang … ziemlich skeptisch“.",
            },
            {
              au: 0,
              q: "Während der Ausbildung hat er viel weniger verdient als vorher.",
              a: 0,
              why: "„ungefähr neunhundert Euro brutto“ – vorher „ein Vielfaches davon“.",
            },
            {
              au: 0,
              q: "Er konnte die Ausbildung verkürzen.",
              a: 0,
              why: "Wegen Abitur und abgeschlossener Ausbildung „auf zwei Jahre verkürzen“.",
            },
            {
              au: 0,
              q: "In der Berufsschule war er der Älteste in seiner Klasse.",
              a: 1,
              why: "Neben ihm saß ein ehemaliger Koch, der „sogar schon einundvierzig“ war.",
            },
            {
              au: 0,
              q: "Heute leitet er seine eigene Tischlerei.",
              a: 1,
              why: "Er arbeitet „als Geselle“; die Selbstständigkeit ist „noch Zukunftsmusik“.",
            },
            {
              au: 0,
              q: "Seine Erfahrung aus der Bank hilft ihm bei Gesprächen mit Kunden.",
              a: 0,
              why: "„Ich kann gut erklären, ich bleibe ruhig“ – sein Chef schickt ihn zu Beratungsgesprächen.",
            },
            {
              au: 0,
              q: "Er empfiehlt, vor einem Berufswechsel ein Praktikum zu machen.",
              a: 0,
              why: "„in einer Tischlerei ein Praktikum gemacht … Das empfehle ich jedem.“",
            },
            {
              au: 0,
              q: "Er bedauert, dass er nicht schon früher gewechselt hat.",
              a: 1,
              why: "„Ehrlich gesagt: nein. Die Jahre in der Bank waren nicht verloren.“",
            },
          ],
        },
        {
          title: "Hörverstehen Teil 3",
          skill: "hoeren",
          pts: 5,
          plays: 2,
          instr:
            "Sie hören fünf kurze Texte: Durchsagen, eine Telefonansage und Hinweise im Radio. Sie hören jeden Text zweimal. Entscheiden Sie bei jeder Aussage, ob sie richtig oder falsch ist.",
          audio: [
            {
              h: "Text 1",
              lines: [
                {
                  s: "n",
                  t: "Sehr geehrte Fahrgäste, eine Gleisänderung an Gleis fünf. Der Intercity zwanzig siebenundvierzig nach München Hauptbahnhof, planmäßige Abfahrt vierzehn Uhr zweiundfünfzig, fährt heute ausnahmsweise von Gleis sieben ab. Ich wiederhole: Der Intercity nach München fährt heute von Gleis sieben. Wir bitten um Beachtung.",
                },
              ],
            },
            {
              h: "Text 2",
              lines: [
                {
                  s: "f",
                  t: "Guten Tag, Sie sind verbunden mit der Hausarztpraxis Doktor Meinert. Unsere Praxis ist vom zwölften bis zum dreiundzwanzigsten Oktober wegen Urlaub geschlossen. In dringenden Fällen wenden Sie sich bitte an unsere Vertretung, die Praxis Doktor Aydın in der Bergstraße vierzehn. Die Telefonnummer ist null zwei drei vier, achtundfünfzig, neunzehn, null sieben. Ich wiederhole: null zwei drei vier, achtundfünfzig, neunzehn, null sieben. Bitte beachten Sie: Nachrichten auf diesem Anrufbeantworter werden während des Urlaubs nicht abgehört. Ab dem sechsundzwanzigsten Oktober sind wir wieder für Sie da. Auf Wiederhören.",
                },
              ],
            },
            {
              h: "Text 3",
              lines: [
                {
                  s: "n",
                  t: "Und jetzt der Verkehr. Auf der A vierzig Richtung Dortmund ist zwischen Essen-Frohnhausen und Essen-Zentrum nach einem Unfall mit einem Lastwagen nur ein Fahrstreifen frei. Der Stau dort ist inzwischen sechs Kilometer lang. Gute Nachrichten dagegen aus Bochum: Die Baustelle bei Bochum-Stahlhausen ist seit heute Morgen aufgehoben, da läuft der Verkehr wieder normal. Fahren Sie vorsichtig!",
                },
              ],
            },
            {
              h: "Text 4",
              lines: [
                {
                  s: "f2",
                  t: "Liebe Kundinnen und Kunden, wegen unserer jährlichen Inventur schließt unser Haus heute ausnahmsweise schon um achtzehn Uhr. Ab morgen sind wir wieder wie gewohnt von halb zehn bis zwanzig Uhr für Sie da. Nutzen Sie bis Ladenschluss noch unsere Angebote im Erdgeschoss: Alle Wintermäntel sind heute dreißig Prozent günstiger! Vielen Dank für Ihren Einkauf.",
                },
              ],
            },
            {
              h: "Text 5",
              lines: [
                {
                  s: "m2",
                  t: "Und noch ein wichtiger Hinweis für alle, die heute Abend zum Open-Air-Konzert in den Stadtpark wollten. Wegen der angekündigten Gewitter wird das Konzert verschoben, und zwar auf Sonntag, zwanzig Uhr. Ihre Eintrittskarten behalten ihre Gültigkeit. Und wer am Sonntag keine Zeit hat, bekommt sein Geld an den bekannten Vorverkaufsstellen zurück.",
                },
              ],
            },
          ],
          opts: ["Richtig", "Falsch"],
          items: [
            {
              au: 0,
              q: "Der Zug nach München fährt heute von einem anderen Gleis ab.",
              a: 0,
              why: "Er fährt „heute ausnahmsweise von Gleis 7“ statt von Gleis 5.",
            },
            {
              au: 1,
              q: "In dringenden Fällen soll man eine Nachricht auf dem Anrufbeantworter hinterlassen.",
              a: 1,
              why: "Man soll sich an die Vertretung wenden; Nachrichten „werden während des Urlaubs nicht abgehört“.",
            },
            {
              au: 2,
              q: "Auf der A40 bei Essen gibt es Stau wegen einer Baustelle.",
              a: 1,
              why: "Der Stau entsteht „nach einem Unfall mit einem Lastwagen“; die Baustelle bei Bochum ist aufgehoben.",
            },
            {
              au: 3,
              q: "Das Kaufhaus schließt heute früher als sonst.",
              a: 0,
              why: "Heute schon um 18 Uhr, normalerweise um 20 Uhr.",
            },
            {
              au: 4,
              q: "Die Eintrittskarten gelten auch für den neuen Termin.",
              a: 0,
              why: "„Ihre Eintrittskarten behalten ihre Gültigkeit.“",
            },
          ],
        },
      ],
    },

    // ───────────────────────── SCHREIBEN ─────────────────────────
    {
      id: "schreiben",
      title: "Schriftlicher Ausdruck",
      minutes: 30,
      parts: [
        {
          kind: "write",
          title: "Schriftlicher Ausdruck",
          skill: "schreiben",
          pts: 45,
          instr:
            "Wählen Sie eine der beiden Aufgaben (A oder B). Schreiben Sie einen formellen Brief bzw. eine formelle E-Mail. Bearbeiten Sie mindestens drei der vier Leitpunkte und überlegen Sie sich eine sinnvolle Reihenfolge. Achten Sie auf Betreff, Anrede, Einleitung, Schluss und Gruß. Schreiben Sie mindestens 150 Wörter.",
          options: [
            {
              h: "Aufgabe A: Bitte um Informationen",
              situation:
                "Sie haben in einer Fachzeitschrift folgende Anzeige gelesen:\n\nAkademie Rheinblick, Düsseldorf\nZertifikatslehrgang „Projektmanagement kompakt“\n– berufsbegleitend in sechs Monaten\n– Mischung aus Online-Seminaren und Präsenztagen\n– praxisnahe Fallstudien aus verschiedenen Branchen\n– Abschluss mit Zertifikat\nNächster Start: 15. Januar\nInformationen: Akademie Rheinblick, Kundenservice, info@akademie-rheinblick.de\n\nSie interessieren sich für den Lehrgang, weil Sie in Ihrer Firma bald mehr Verantwortung für Projekte übernehmen sollen.",
              task: "Schreiben Sie eine E-Mail an die Akademie und bitten Sie um weitere Informationen. Wählen Sie dazu mindestens drei der folgenden Punkte aus. Überlegen Sie sich eine passende Reihenfolge sowie eine passende Einleitung und einen passenden Schluss.",
              points: [
                "Termine und Ort der Präsenztage",
                "Voraussetzungen für die Teilnahme",
                "Kosten und Fördermöglichkeiten",
                "Anerkennung des Zertifikats",
              ],
              muster:
                "Betreff: Anfrage zum Zertifikatslehrgang „Projektmanagement kompakt“\n\nSehr geehrte Damen und Herren,\n\nin einer Fachzeitschrift habe ich Ihre Anzeige gelesen und interessiere mich sehr für Ihren Lehrgang. Ich arbeite seit fünf Jahren als Sachbearbeiterin in einem Logistikunternehmen und soll im nächsten Jahr die Leitung kleinerer Projekte übernehmen. Deshalb hätte ich noch einige Fragen.\n\nZunächst würde ich gern wissen, an welchen Tagen und zu welchen Uhrzeiten die Präsenztage stattfinden und ob sie nur in Düsseldorf oder auch an anderen Orten angeboten werden. Da ich Vollzeit arbeite, wären Termine am Freitagnachmittag oder am Samstag für mich ideal.\n\nAußerdem möchte ich fragen, ob man für die Teilnahme bestimmte Vorkenntnisse oder einen bestimmten Berufsabschluss braucht. Bisher habe ich nur an einer kurzen internen Schulung zum Thema Zeitmanagement teilgenommen.\n\nKönnten Sie mir bitte auch mitteilen, wie hoch die Kosten für den gesamten Lehrgang sind? Gibt es die Möglichkeit, in Raten zu zahlen, oder kann die Weiterbildung über ein Förderprogramm unterstützt werden?\n\nSchließlich interessiert mich, ob Ihr Zertifikat auch von anderen Arbeitgebern anerkannt wird.\n\nÜber eine baldige Antwort würde ich mich sehr freuen. Gern können Sie mir auch Informationsmaterial per E-Mail zuschicken.\n\nMit freundlichen Grüßen\nElena Petrova",
            },
            {
              h: "Aufgabe B: Beschwerde",
              situation:
                "Sie haben beim Reiseveranstalter „Sonnenweg Reisen“ eine fünftägige Busreise nach Prag gebucht (549 Euro pro Person; Drei-Sterne-Hotel im Stadtzentrum, Stadtführung und Bootsfahrt auf der Moldau inklusive). Während der Reise lief vieles nicht so, wie es im Katalog beschrieben war.",
              task: "Schreiben Sie eine Beschwerde an den Reiseveranstalter. Wählen Sie dazu mindestens drei der folgenden Punkte aus. Überlegen Sie sich eine passende Reihenfolge sowie eine passende Einleitung und einen passenden Schluss.",
              points: [
                "Was Sie gebucht hatten",
                "Was nicht in Ordnung war",
                "Welche Folgen das für Sie hatte",
                "Was Sie vom Reiseveranstalter erwarten",
              ],
              muster:
                "Betreff: Beschwerde über die Busreise nach Prag vom 6. bis 10. September, Buchungsnummer 48213\n\nSehr geehrte Damen und Herren,\n\nvom 6. bis 10. September habe ich mit meinem Mann an Ihrer Busreise nach Prag teilgenommen. Leider muss ich mich über mehrere Mängel beschweren.\n\nLaut Katalog hatten wir ein Drei-Sterne-Hotel im Stadtzentrum gebucht. Tatsächlich lag unser Hotel jedoch am Stadtrand, sodass wir jeden Tag fast 40 Minuten mit der Straßenbahn in die Altstadt fahren mussten. Außerdem war unser Zimmer sehr laut, weil direkt nebenan renoviert wurde. Darüber hinaus ist die angekündigte Bootsfahrt auf der Moldau ohne Begründung ausgefallen, und die Stadtführung wurde von drei Stunden auf eine Stunde gekürzt.\n\nDadurch haben wir viel Zeit und Geld verloren: Die Fahrkarten für die Straßenbahn mussten wir selbst bezahlen, und wegen des Lärms konnten wir kaum schlafen. Der Urlaub, auf den wir uns lange gefreut hatten, war deshalb sehr enttäuschend.\n\nIch erwarte daher, dass Sie uns mindestens 30 Prozent des Reisepreises zurückerstatten und die Kosten für die ausgefallene Bootsfahrt ersetzen. Bitte teilen Sie mir bis zum 30. September mit, wie Sie die Angelegenheit regeln möchten. Andernfalls sehe ich mich gezwungen, mich an die Verbraucherzentrale zu wenden.\n\nMit freundlichen Grüßen\nSabine Krämer",
            },
          ],
          minWords: 150,
          check: [
            "Mindestens drei Leitpunkte ausführlich bearbeitet",
            "Betreff, formelle Anrede und passender Gruß",
            "Einleitung mit dem Grund des Schreibens, Schluss mit Bitte bzw. Erwartung",
            "Logischer Aufbau mit Absätzen und Konnektoren (zunächst, außerdem, darüber hinaus, deshalb …)",
            "Durchgehend Sie-Form und höflich-formeller Stil (Könnten Sie …? Ich wäre Ihnen dankbar, wenn …)",
            "Abwechslungsreiche Strukturen: Nebensätze, Passiv, Nomen-Verb-Verbindungen",
            "Mindestens 150 Wörter",
            "Am Ende auf Endungen, Verbposition und Rechtschreibung geprüft",
          ],
        },
      ],
    },

    // ───────────────────────── MÜNDLICHE PRÜFUNG ─────────────────────────
    {
      id: "sprechen",
      title: "Mündliche Prüfung",
      minutes: 15,
      prepMinutes: 20,
      note: "Paarprüfung. In der Vorbereitungszeit bereitest du alle drei Teile vor; Notizen darfst du mitnehmen, aber nicht ablesen.",
      parts: [
        {
          kind: "speak",
          title: "Teil 1: Über Erfahrungen sprechen (Präsentation)",
          skill: "muendlich",
          pts: 25,
          minutes: 5,
          instr:
            "Wählen Sie eines der beiden Themen und sprechen Sie etwa anderthalb Minuten zusammenhängend darüber. Ihre Partnerin / Ihr Partner hört zu und stellt Ihnen danach Fragen. Anschließend tauschen Sie die Rollen. In der Simulation stellt Ihnen die Partnerin die Fragen unten.",
          task: "Thema A: Ein Ereignis, das mein Leben verändert hat\nThema B: Ein Buch oder Film, der mich beeindruckt hat\n\nSprechen Sie über:\n– worum es geht bzw. was passiert ist\n– warum es für Sie wichtig war\n– was sich dadurch verändert hat bzw. was Sie daraus gelernt haben\n– ob Sie es anderen empfehlen würden",
          prompts: [
            "Danke, das war wirklich interessant. Darf ich mal fragen, wie alt Sie damals waren?",
            "Hm, und was war für Sie in dieser Zeit am schwierigsten?",
            "Und wie haben die Leute in Ihrer Umgebung darauf reagiert, also Familie oder Freunde?",
            "Eine letzte Frage noch: Würden Sie heute etwas anders machen?",
          ],
          redemittel: [
            "Ich möchte heute über … sprechen.",
            "Das war ein Wendepunkt in meinem Leben, weil …",
            "Damals war ich … Jahre alt und …",
            "Am Anfang fiel es mir schwer, …",
            "Rückblickend kann ich sagen, dass …",
            "Was mich besonders beeindruckt hat, war …",
            "Ich kann das jedem empfehlen, der …",
          ],
          muster:
            "(Thema A) Ich möchte heute über ein Ereignis sprechen, das mein Leben stark verändert hat: meinen Umzug nach Deutschland vor vier Jahren.\n\nDamals war ich 29 Jahre alt und habe in meiner Heimat als Buchhalterin gearbeitet. Mein Mann hatte ein Jobangebot in Dortmund bekommen, und nach langem Überlegen haben wir uns entschieden, gemeinsam zu gehen. Am Anfang fiel es mir sehr schwer: Ich konnte kaum Deutsch, hatte keine Freunde und durfte zunächst nicht in meinem Beruf arbeiten, weil mein Abschluss noch nicht anerkannt war. Ich habe mich oft gefühlt, als würde ich wieder bei null anfangen.\n\nWichtig war dieses Ereignis für mich, weil ich gelernt habe, wie viel ich schaffen kann, wenn ich ein Ziel habe. Ich habe Integrationskurse und später einen Berufssprachkurs besucht, und heute arbeite ich wieder in einer Steuerkanzlei. Außerdem bin ich viel selbstständiger und offener geworden – früher hätte ich mich nie getraut, fremde Menschen anzusprechen.\n\nRückblickend kann ich sagen, dass der Umzug die beste, aber auch die schwierigste Entscheidung meines Lebens war. Ich würde jedem empfehlen, so einen Schritt zu wagen – allerdings nur gut vorbereitet und mit viel Geduld.\n\n(Mögliche Antworten auf Nachfragen)\nB: Was war für Sie am schwierigsten?\nA: Ehrlich gesagt die ersten Monate, weil ich bei Behörden und beim Arzt immer jemanden zum Übersetzen brauchte. Das war mir unangenehm.\nB: Würden Sie heute etwas anders machen?\nA: Ja, ich hätte schon in meiner Heimat mit dem Deutschlernen anfangen sollen. Dann wäre der Start leichter gewesen.",
          check: [
            "Etwa 1,5 Minuten frei gesprochen, nicht abgelesen",
            "Klare Gliederung: Einleitung – Hauptteil – Schluss",
            "Vergangenheitsformen sicher verwendet (Perfekt, Präteritum, Plusquamperfekt)",
            "Gründe und Folgen genannt (weil, deshalb, sodass)",
            "Auf Nachfragen ausführlich und spontan geantwortet",
          ],
        },
        {
          kind: "speak",
          title: "Teil 2: Diskussion",
          skill: "muendlich",
          pts: 25,
          minutes: 5,
          instr:
            "Lesen Sie den kurzen Zeitungstext. Diskutieren Sie mit Ihrer Partnerin / Ihrem Partner darüber. Äußern Sie Ihre Meinung, begründen Sie sie und gehen Sie auf die Argumente Ihrer Partnerin / Ihres Partners ein. Am Ende fassen Sie kurz zusammen, ob Sie sich einigen konnten.",
          material: [
            {
              h: "Zeitungsmeldung",
              t: "Vier Tage arbeiten – fünf Tage Lohn?\n\nEin halbes Jahr lang haben 45 Unternehmen aus ganz Deutschland die Viertagewoche getestet: Die Beschäftigten arbeiteten nur noch an vier Tagen, bekamen aber weiterhin den vollen Lohn. Die meisten Teilnehmenden berichten, dass sie sich erholter fühlen und seltener krank sind. Viele Firmen sagen, dass die Produktivität kaum gesunken ist. Gewerkschaften fordern deshalb, das Modell schnell einzuführen. Arbeitgeberverbände warnen dagegen: In vielen Branchen fehlten schon jetzt Fachkräfte – mit weniger Arbeitszeit werde das Problem noch größer.",
            },
          ],
          task: "Sollte die Viertagewoche bei vollem Lohn für alle Beschäftigten eingeführt werden? Diskutieren Sie: Welche Vorteile und Nachteile sehen Sie? Für wen wäre das Modell geeignet, für wen nicht? Welche Erfahrungen haben Sie selbst oder Menschen in Ihrem Umfeld?",
          prompts: [
            "Na ja, aber wer soll das bezahlen? Gerade kleine Firmen können sich das doch gar nicht leisten.",
            "Und in der Pflege oder im Einzelhandel? Da funktioniert das nicht, da braucht man die Leute jeden Tag.",
            "Also, ich weiß nicht. Wenn man in vier Tagen genauso viel schaffen muss, wird der Stress doch nur größer, oder?",
            "Hm, ich finde ehrlich gesagt, jeder sollte selbst entscheiden können, an wie vielen Tagen er arbeitet.",
          ],
          redemittel: [
            "Meiner Meinung nach … / Ich bin der Ansicht, dass …",
            "Ein wichtiges Argument dafür ist, dass …",
            "Da muss ich dir widersprechen: …",
            "Das sehe ich etwas anders, denn …",
            "Da hast du recht, aber man darf nicht vergessen, dass …",
            "Einerseits …, andererseits …",
            "Was hältst du davon, wenn …?",
            "Wir sind uns also einig, dass … / Wir konnten uns nicht ganz einigen.",
          ],
          muster:
            "A: Ich habe den Text über die Viertagewoche gelesen. Ich finde die Idee eigentlich sehr gut. Meiner Meinung nach sind ausgeruhte Beschäftigte motivierter und machen weniger Fehler.\nB: Das stimmt vielleicht, aber wer soll das bezahlen? Gerade kleine Firmen können sich das doch gar nicht leisten.\nA: Da hast du recht, für kleine Betriebe ist das schwieriger. Aber im Text steht ja, dass die Produktivität kaum gesunken ist. Und wenn die Leute seltener krank sind, spart die Firma auch Geld.\nB: Hm, das sehe ich etwas anders. In der Pflege oder im Einzelhandel funktioniert das nicht – da braucht man die Leute jeden Tag.\nA: Das ist ein wichtiger Punkt. Man könnte dort aber mit Schichtplänen arbeiten, sodass nicht alle am selben Tag frei haben. Meine Schwester ist Krankenpflegerin, und in ihrem Krankenhaus wird so ein Modell gerade getestet.\nB: Interessant. Trotzdem habe ich Bedenken: Wenn man in vier Tagen genauso viel schaffen muss, wird der Stress doch nur größer.\nA: Einerseits stimmt das, andererseits hat man dann drei Tage, um sich richtig zu erholen. Ich glaube, das gleicht den Stress wieder aus.\nB: Vielleicht. Ich finde aber, jeder sollte selbst entscheiden können, an wie vielen Tagen er arbeitet. Manche wollen lieber fünf kürzere Tage.\nA: Da stimme ich dir zu. Eine Pflicht für alle wäre wahrscheinlich nicht sinnvoll.\nB: Also, wir sind uns einig, dass die Viertagewoche viele Vorteile hat, aber freiwillig sein sollte und nicht für jede Branche passt.\nA: Genau, so würde ich es auch zusammenfassen.",
          check: [
            "Eigene Meinung klar geäußert und begründet",
            "Auf die Argumente der Partnerin eingegangen (zustimmen, widersprechen, nachfragen)",
            "Beispiele oder eigene Erfahrungen genannt",
            "Vielfältige Redemittel statt immer „Ich denke …“",
            "Am Ende ein Ergebnis zusammengefasst",
          ],
        },
        {
          kind: "speak",
          title: "Teil 3: Gemeinsam etwas planen",
          skill: "muendlich",
          pts: 25,
          minutes: 5,
          instr:
            "Sie sollen mit Ihrer Partnerin / Ihrem Partner gemeinsam etwas planen. Machen Sie Vorschläge, reagieren Sie auf die Vorschläge Ihrer Partnerin / Ihres Partners und einigen Sie sich am Ende.",
          task: "Ihre Kollegin Frau Albers geht nach 25 Jahren in der Firma in den Ruhestand. Sie und Ihre Partnerin / Ihr Partner sollen eine Abschiedsfeier organisieren.\n\nPlanen Sie gemeinsam:\n– Wann und wo soll die Feier stattfinden?\n– Wer wird eingeladen?\n– Essen und Getränke\n– Geschenk\n– Programm (Rede, Überraschung …)\n– Wer übernimmt welche Aufgaben?",
          prompts: [
            "Also, wie wär's, wenn wir einfach in der Kantine feiern? Das kostet nichts.",
            "Hm, ich würde nur unsere Abteilung einladen. Sonst wird's zu groß, oder?",
            "Und als Geschenk? Wir könnten ihr doch einfach einen Gutschein schenken.",
            "Ach ja, wer hält eigentlich die Rede? Ich bin darin ehrlich gesagt nicht so gut.",
          ],
          redemittel: [
            "Ich schlage vor, dass wir …",
            "Wie wäre es, wenn …?",
            "Das ist eine gute Idee, aber …",
            "Ich fände es besser, wenn …",
            "Damit bin ich einverstanden.",
            "Dann machen wir es so: …",
            "Kümmerst du dich um …? Dann übernehme ich …",
          ],
          muster:
            "A: Also, wir müssen die Abschiedsfeier für Frau Albers planen. Zuerst: Wann wollen wir feiern? Ich schlage ihren letzten Arbeitstag vor, das ist Freitag, der 28.\nB: Gute Idee. Und wo? Wie wäre es, wenn wir in der Kantine feiern? Das kostet nichts.\nA: Das ist praktisch, aber ich finde die Kantine ein bisschen ungemütlich. Nach 25 Jahren hat sie etwas Schöneres verdient. Was hältst du von dem italienischen Restaurant gegenüber? Die haben einen Nebenraum.\nB: Stimmt, das wäre schöner. Dann müssen wir aber genau wissen, wie viele Leute kommen. Ich würde nur unsere Abteilung einladen – sonst wird es zu groß.\nA: Hm, sie hat ja auch viel mit dem Vertrieb zusammengearbeitet. Ich fände es schön, wenn wir die Kolleginnen und Kollegen von dort auch einladen. Dann wären wir ungefähr 30 Personen.\nB: Einverstanden, 30 ist für den Nebenraum noch in Ordnung. Beim Essen könnten wir ein Buffet bestellen, dann ist für jeden etwas dabei.\nA: Ja, und die Getränke bezahlt die Firma – das frage ich beim Chef nach. Jetzt zum Geschenk: Hast du eine Idee?\nB: Als Geschenk könnten wir ihr einfach einen Gutschein schenken.\nA: Ein Gutschein ist nicht schlecht, aber ein bisschen unpersönlich. Sie erzählt doch immer, dass sie im Ruhestand Fahrrad fahren will. Wie wäre es mit einem Gutschein für eine Radtour an der Mosel – und dazu ein Fotobuch mit Bildern aus der Firma?\nB: Super, das ist persönlich und praktisch. Und wer hält eigentlich die Rede? Ich bin darin nicht so gut.\nA: Die Rede kann ich halten. Kümmerst du dich dann um das Fotobuch? Du kennst dich ja mit Fotos aus.\nB: Gern. Ich sammle die Bilder bei den Kollegen und bestelle das Buch. Dann sammle ich auch das Geld für das Geschenk ein.\nA: Prima. Und ich reserviere das Restaurant und bestelle das Buffet. Also: Freitag, der 28., im Restaurant gegenüber, etwa 30 Gäste, Buffet, Radtour-Gutschein mit Fotobuch und eine kurze Rede von mir.\nB: Genau, so machen wir es.",
          check: [
            "Zu allen Punkten Vorschläge gemacht",
            "Auf Vorschläge reagiert: zugestimmt, abgelehnt, Alternativen begründet",
            "Aktiv nachgefragt und die Partnerin einbezogen",
            "Aufgaben klar verteilt",
            "Ergebnis am Ende zusammengefasst",
          ],
        },
      ],
    },
  ],

  // ───────────────────────── VORBEREITUNG ─────────────────────────
  prep: {
    lead: "Die Prüfung telc Deutsch B2 bestätigt, dass du dich im Alltag und im Beruf selbstständig und differenziert auf Deutsch verständigen kannst. Sie besteht aus einer schriftlichen Prüfung (Lesen, Sprachbausteine, Hören, Schreiben) und einer mündlichen Paarprüfung. Viele brauchen sie für den Beruf, für die Anerkennung eines Abschlusses oder als nächsten Schritt in Richtung Studium.",
    facts: [
      [
        "Dauer",
        "ca. 3 Stunden: schriftlich 140 Min. (Lesen und Sprachbausteine 90, Hören ca. 20, Schreiben 30) plus Pause; mündlich ca. 15 Min. mit 20 Min. Vorbereitung",
      ],
      [
        "Punkte",
        "300 Punkte: schriftlich 225 (Lesen 75, Sprachbausteine 30, Hören 75, Schreiben 45), mündlich 75",
      ],
      [
        "Bestehen",
        "mindestens 60 % in beiden Teilen: schriftlich 135 von 225 Punkten und mündlich 45 von 75 Punkten",
      ],
      [
        "Ergebnis",
        "Zertifikat mit Gesamtnote (sehr gut, gut, befriedigend, ausreichend). Wer nur den schriftlichen oder nur den mündlichen Teil nicht besteht, kann diesen Teil unter bestimmten Bedingungen einzeln wiederholen – frag dein Prüfungszentrum.",
      ],
      [
        "Wer braucht sie?",
        "z. B. für Arbeitgeber, die B2 verlangen, für die Anerkennung von Berufen in Pflege und Gesundheit, für Ausbildung und Weiterbildung oder als Vorstufe zum Studium",
      ],
    ],
    parts: [
      {
        name: "Leseverstehen Teil 1",
        skill: "Lesen",
        time: "ca. 15 Min.",
        what: "Du ordnest fünf kurzen Texten (z. B. Buchbeschreibungen) die passende Überschrift zu. Es gibt zehn Überschriften, fünf bleiben übrig.",
        steps: [
          "Lies zuerst alle Überschriften und markiere das Schlüsselwort (z. B. „sparen“, „Chefs“, „Träume“).",
          "Lies jeden Text einmal zügig und frag dich: Was ist das Hauptthema – nicht ein Detail?",
          "Vergleiche deine Wahl mit ähnlichen Überschriften und such den Satz, der die andere ausschließt.",
          "Streiche benutzte Überschriften durch und lass schwierige Texte bis zum Schluss.",
        ],
        traps: [
          "Ein Wort aus der Überschrift kommt im Text vor, aber nur am Rande („Träume … nur am Rande“).",
          "Zwei Überschriften passen zum Thema, aber nur eine zur Zielgruppe (Beschäftigte vs. Vorgesetzte).",
          "Negationen übersehen: „Rezepte sucht man vergeblich“.",
        ],
        tip: "Frag dich bei jedem Text: Wie würde ich ihn in fünf Wörtern zusammenfassen? Die passende Überschrift sagt dasselbe mit anderen Wörtern.",
        mini: {
          title: "Mini-Übung: Überschriften",
          instr:
            "Welche Überschrift (a–d) passt zu welchem Text? Zwei Überschriften bleiben übrig.",
          material: [
            {
              h: "Text 1",
              t: "Die Autorin hat zwölf Monate lang auf Flugreisen verzichtet und ist trotzdem durch halb Europa gekommen – mit Zug, Fähre und Fahrrad. Ihr Buch enthält Routen, Preisvergleiche und Tipps für Nachtzüge.",
            },
            {
              h: "Text 2",
              t: "Dieser Ratgeber hilft Eltern, mit ihren Kindern über Geld zu sprechen: Ab wann bekommt ein Kind Taschengeld, wie viel ist angemessen und was tun, wenn es alles sofort ausgibt?",
            },
          ],
          opts: [
            "a) Billig fliegen – so finden Sie die besten Angebote",
            "b) Klimafreundlich unterwegs ohne Flugzeug",
            "c) Kinder und Geld – den Umgang früh lernen",
            "d) Sparen für die Ausbildung der Kinder",
          ],
          items: [
            {
              q: "Text 1",
              a: 1,
              why: "Sie reist ein Jahr ohne Flugzeug – „Billig fliegen“ ist das Gegenteil.",
            },
            {
              q: "Text 2",
              a: 2,
              why: "Es geht um Taschengeld und den Umgang mit Geld, nicht ums Sparen für die Ausbildung.",
            },
          ],
        },
      },
      {
        name: "Leseverstehen Teil 2",
        skill: "Lesen",
        time: "ca. 20 Min.",
        what: "Du liest einen längeren Zeitungs- oder Magazinartikel (ca. 500–600 Wörter) und beantwortest fünf Multiple-Choice-Aufgaben mit je drei Lösungen.",
        steps: [
          "Lies zuerst Überschrift und Untertitel: Worum geht es?",
          "Lies die Fragen (noch ohne Lösungen) – sie folgen meist der Reihenfolge des Textes.",
          "Such für jede Frage die passende Textstelle und lies dort genau.",
          "Prüfe jede Lösung a, b, c: Was steht wirklich im Text, was ist nur ähnlich formuliert?",
        ],
        traps: [
          "Eine Lösung verwendet Wörter aus dem Text, sagt aber etwas anderes („unzuverlässig“ ≠ „keine Verbindung“).",
          "Aussagen von verschiedenen Personen verwechseln (Expertin vs. Bürgermeister).",
          "Zu viel Allgemeinwissen: Nur der Text zählt, nicht, was du selbst für richtig hältst.",
        ],
        tip: "Unterstreiche im Text die Belegstelle. Wenn du keine Stelle findest, ist die Lösung wahrscheinlich falsch.",
        mini: {
          title: "Mini-Übung: Detailverstehen",
          instr: "Lesen Sie den Text. Welche Lösung (a, b oder c) ist richtig?",
          material: [
            {
              h: "Bibliothek ohne Personal",
              t: "In immer mehr Städten können Leserinnen und Leser Bibliotheken auch abends und am Sonntag nutzen – ganz ohne Mitarbeitende. Mit ihrem Bibliotheksausweis öffnen sie die Tür, leihen Bücher an Automaten aus und geben sie dort auch zurück. In der Kleinstadt Bergheide, wo das Modell seit einem Jahr läuft, ist die Zahl der Besuche um 30 Prozent gestiegen. Kritiker befürchten jedoch, dass Stellen abgebaut werden. Die Stadt widerspricht: Das Personal arbeite weiter zu den normalen Öffnungszeiten und habe nun sogar mehr Zeit für Lesungen und Kurse.",
            },
          ],
          items: [
            {
              q: "Was ist das Besondere an diesen Bibliotheken?",
              opts: [
                "Sie sind nur am Wochenende geöffnet.",
                "Man kann sie zu bestimmten Zeiten auch ohne Personal nutzen.",
                "Man braucht keinen Ausweis mehr.",
              ],
              a: 1,
              why: "„abends und am Sonntag … ganz ohne Mitarbeitende“; der Ausweis öffnet die Tür.",
            },
            {
              q: "Was sagt die Stadt zur Kritik?",
              opts: [
                "Es werden keine Mitarbeitenden eingespart.",
                "Lesungen und Kurse werden gestrichen.",
                "Das Personal arbeitet künftig weniger Stunden.",
              ],
              a: 0,
              why: "„Das Personal arbeite weiter zu den normalen Öffnungszeiten“.",
            },
          ],
        },
      },
      {
        name: "Leseverstehen Teil 3",
        skill: "Lesen",
        time: "ca. 20 Min.",
        what: "Du ordnest zehn Situationen zwölf Anzeigen zu. Für ein bis zwei Situationen gibt es keine passende Anzeige – dann wählst du x.",
        steps: [
          "Lies jede Situation und markiere alle Bedingungen (wer, wann, wo, was genau).",
          "Überfliege die Anzeigen und notiere zu jeder ein Stichwort.",
          "Prüfe jede mögliche Anzeige gegen ALLE Bedingungen der Situation.",
          "Erst ganz am Ende entscheidest du dich für x – wenn wirklich keine Anzeige alle Bedingungen erfüllt.",
        ],
        traps: [
          "Zwei Anzeigen zum selben Thema, aber nur eine passt im Detail (online vs. vor Ort, Kinder vs. Erwachsene).",
          "Eine kleine Einschränkung am Ende der Anzeige („Haustiere leider nicht erlaubt“).",
          "x zu früh wählen – oder gar nicht, obwohl es vorkommt.",
        ],
        tip: "Jede Anzeige gibt es nur einmal. Wenn du eine Anzeige zweimal wählen möchtest, stimmt eine der beiden Zuordnungen nicht.",
        mini: {
          title: "Mini-Übung: Anzeigen",
          instr:
            "Welche Anzeige (a–c) passt zu welcher Situation? Wenn keine passt, wählen Sie x.",
          material: [
            {
              h: "a) Nachhilfe-Team Kompass",
              t: "Mathe, Englisch und Deutsch für die Klassen 5 bis 10. Unterricht bei Ihnen zu Hause. Tel. 0201/77 31 08",
            },
            {
              h: "b) VHS Essen-Süd",
              t: "Computerkurs für Einsteiger ab 60: kleine Gruppen, viel Geduld. Donnerstags 9–11 Uhr.",
            },
            {
              h: "c) Musikschule Klangraum",
              t: "Gitarrenunterricht für Erwachsene – auch für Wiedereinsteiger. Abends und am Wochenende.",
            },
          ],
          opts: [
            "a) Nachhilfe-Team Kompass",
            "b) VHS Essen-Süd",
            "c) Musikschule Klangraum",
            "x) keine passende Anzeige",
          ],
          items: [
            {
              q: "Ihr Sohn (14) hat Probleme in Mathematik und braucht Unterstützung.",
              a: 0,
              why: "a: Mathe-Nachhilfe für die Klassen 5 bis 10.",
            },
            {
              q: "Ihr Vater (67) möchte lernen, E-Mails zu schreiben.",
              a: 1,
              why: "b: Computerkurs für Einsteiger ab 60.",
            },
            {
              q: "Ihre Kollegin möchte Klavier spielen lernen.",
              a: 3,
              why: "Die Musikschule bietet nur Gitarre an – keine Anzeige passt.",
            },
          ],
        },
      },
      {
        name: "Sprachbausteine Teil 1",
        skill: "Sprachbausteine",
        time: "ca. 15 Min.",
        what: "In einem formellen Brief oder einer E-Mail gibt es zehn Lücken mit je drei Lösungen. Geprüft wird vor allem Grammatik: Präpositionen und Kasus, Konnektoren, Relativpronomen, Passiv, Konjunktiv II.",
        steps: [
          "Lies den ganzen Satz, nicht nur die Wörter direkt an der Lücke.",
          "Frag dich: Welche Wortart fehlt? Welcher Kasus? Wo steht das Verb?",
          "Prüfe bei Konnektoren die Verbposition (weil → Verb am Ende, deshalb → Verb auf Position 2).",
          "Setz die Lösung ein und lies den Satz noch einmal leise mit.",
        ],
        traps: [
          "Konnektoren mit gleicher Bedeutung, aber anderer Wortstellung (denn / weil / deshalb).",
          "Relativpronomen nach Präposition: „von denen“, nicht „von die“.",
          "Feste Präpositionen: „ausgestattet mit“, „Antwort auf“, „sich interessieren für“.",
        ],
        tip: "Lerne Verben und Nomen immer mit ihrer Präposition und dem Kasus – das bringt in diesem Teil die meisten Punkte.",
        mini: {
          title: "Mini-Übung: Grammatik im Brief",
          instr: "Welches Wort (a, b oder c) passt in die Lücke?",
          material: [
            {
              h: "E-Mail",
              t: "Sehr geehrter Herr Lorenz,\n\nvielen Dank für Ihre Einladung {1} Informationsabend. Leider kann ich an diesem Tag nicht teilnehmen, {2} ich beruflich in Hamburg bin. {3} Sie mir die Unterlagen per E-Mail schicken?\n\nMit freundlichen Grüßen\nAnna Roth",
            },
          ],
          items: [
            {
              q: "",
              opts: ["zum", "beim", "im"],
              a: 0,
              why: "Einladung zu + Dativ: zum Informationsabend.",
            },
            {
              q: "",
              opts: ["denn", "deshalb", "weil"],
              a: 2,
              why: "Das Verb „bin“ steht am Ende – das passt nur zu „weil“.",
            },
            {
              q: "",
              opts: ["Hätten", "Könnten", "Wären"],
              a: 1,
              why: "Höfliche Bitte: Könnten Sie mir … schicken?",
            },
          ],
        },
      },
      {
        name: "Sprachbausteine Teil 2",
        skill: "Sprachbausteine",
        time: "ca. 20 Min.",
        what: "Ein Text hat zehn Lücken; dazu gibt es 15 Wörter (a–o). Jedes Wort passt nur einmal, fünf bleiben übrig. Hier geht es vor allem um Wortschatz und feste Verbindungen.",
        steps: [
          "Ordne die 15 Wörter zuerst nach Wortart: Nomen, Verben, Adjektive, Konnektoren, Pronomen.",
          "Bestimme für jede Lücke die Wortart (Artikel davor? Verb am Satzende?).",
          "Beginne mit den sicheren Lücken und streiche benutzte Wörter.",
          "Prüfe bei Nomen das Genus („einer aktuellen …“ → feminin).",
        ],
        traps: [
          "Zwei Wörter mit ähnlicher Bedeutung, aber unterschiedlicher Grammatik (Umfrage / Ergebnis).",
          "Verben mit fester Präposition („warnen vor“, „reagieren auf“).",
          "Konnektoren mit falscher Wortstellung (weil statt denn).",
        ],
        tip: "Achte auf das Wort direkt vor der Lücke: Artikel, Präposition oder „sich“ verraten oft schon die Lösung.",
        mini: {
          title: "Mini-Übung: Wortschatz",
          instr:
            "Welches Wort (a–e) passt in die Lücke? Zwei Wörter bleiben übrig.",
          material: [
            {
              h: "Gesünder leben",
              t: "Viele Menschen möchten gesünder leben. {1} fällt es ihnen schwer, alte Gewohnheiten zu ändern. Fachleute {2}, mit kleinen Zielen anzufangen, zum Beispiel jeden Tag zehn Minuten spazieren zu {3}.",
            },
          ],
          opts: [
            "a) allerdings",
            "b) empfehlen",
            "c) gehen",
            "d) obwohl",
            "e) verbieten",
          ],
          items: [
            {
              q: "",
              a: 0,
              why: "Gegensatz mit Verb auf Position 2: Allerdings fällt es ihnen schwer.",
            },
            { q: "", a: 1, why: "Fachleute empfehlen, etwas zu tun." },
            { q: "", a: 2, why: "Feste Verbindung: spazieren gehen." },
          ],
        },
      },
      {
        name: "Hörverstehen Teil 1",
        skill: "Hören",
        time: "ca. 5 Min.",
        what: "Du hörst mehrere kurze Meinungen oder Beiträge zu einem Thema – nur einmal. Zu jedem Beitrag entscheidest du, ob eine Aussage richtig oder falsch ist.",
        steps: [
          "Nutze die Lesezeit: Markiere in jeder Aussage das wichtigste Wort.",
          "Achte auf die Grundhaltung der Person: Ist sie dafür, dagegen oder unentschieden?",
          "Entscheide sofort nach jedem Beitrag – es gibt keine Wiederholung.",
          "Wenn du unsicher bist, kreuz trotzdem an und geh weiter.",
        ],
        traps: [
          "Einschränkungen wie „aber“, „trotzdem“, „ganz ohne … geht's nicht“ drehen die Aussage.",
          "Die Person nennt zuerst ein Gegenargument und dann ihre eigentliche Meinung.",
          "Absolute Wörter in der Aussage („gar nicht mehr“, „immer“) sind oft falsch.",
        ],
        tip: "Hör besonders auf den letzten Satz jedes Beitrags – dort steht oft das Fazit der Person.",
        mini: {
          title: "Mini-Übung: Meinungen",
          instr: "Sie hören zwei Äußerungen einmal. Richtig oder falsch?",
          plays: 1,
          audio: [
            {
              h: "Beitrag 1",
              lines: [
                {
                  s: "m",
                  t: "Also, ich fahr seit zwei Jahren mit dem Fahrrad zur Arbeit, auch im Winter. Nur wenn's glatt ist, nehm ich den Bus. Da bin ich dann doch vorsichtig.",
                },
              ],
            },
            {
              h: "Beitrag 2",
              lines: [
                {
                  s: "f",
                  t: "Homeoffice? Nee, ist nichts für mich. Ich brauch die Kolleginnen um mich herum, sonst fühl ich mich ganz schnell allein.",
                },
              ],
            },
          ],
          opts: ["Richtig", "Falsch"],
          items: [
            {
              au: 0,
              q: "Der Mann fährt bei jedem Wetter mit dem Fahrrad.",
              a: 1,
              why: "Bei Glätte nimmt er den Bus.",
            },
            {
              au: 1,
              q: "Die Frau arbeitet lieber im Büro.",
              a: 0,
              why: "„Homeoffice? Nee, ist nichts für mich. Ich brauch die Kolleginnen um mich herum.“",
            },
          ],
        },
      },
      {
        name: "Hörverstehen Teil 2",
        skill: "Hören",
        time: "ca. 10 Min.",
        what: "Du hörst ein längeres Radiointerview zweimal und entscheidest bei zehn Aussagen, ob sie richtig oder falsch sind.",
        steps: [
          "Lies alle zehn Aussagen vorher – sie folgen dem Ablauf des Interviews.",
          "Beim ersten Hören: Kreuz an, was du sicher verstehst.",
          "Beim zweiten Hören: Konzentrier dich auf die offenen Aussagen.",
          "Achte auf Fragen der Moderatorin – sie kündigen das nächste Thema an.",
        ],
        traps: [
          "Die Moderatorin sagt etwas („Viele denken, man hat Ihnen gekündigt“) – der Gast widerspricht.",
          "Zahlen und Vergleiche: „der Älteste“, „verkürzt“, „seit einem Jahr“.",
          "Pläne für die Zukunft werden als heutige Tatsachen formuliert („heute leitet er …“).",
        ],
        tip: "Notiere beim ersten Hören nur Stichwörter neben die Aussagen. Entscheide endgültig erst beim zweiten Durchgang.",
        mini: {
          title: "Mini-Übung: Interview",
          instr:
            "Sie hören einen Ausschnitt aus einem Interview zweimal. Richtig oder falsch?",
          plays: 2,
          audio: [
            {
              h: "Interview: Repair-Café",
              lines: [
                {
                  s: "f",
                  t: "Frau Novak, Sie haben vor drei Jahren ein Repair-Café gegründet. Wie kam's denn dazu?",
                },
                {
                  s: "f2",
                  t: "Also, eigentlich durch Zufall. Mein Toaster war kaputt, und im Geschäft hieß es, ach, eine Reparatur lohnt sich nicht. Ein Nachbar hat ihn dann in zehn Minuten repariert. Und da dachte ich: So was brauchen wir öfter.",
                },
                { s: "f", t: "Und wer kommt so zu Ihnen?" },
                {
                  s: "f2",
                  t: "Ganz gemischt, ehrlich. Viele denken, das sind nur Rentner, aber inzwischen kommen auch viele Studierende. Die haben oft wenig Geld und wollen nicht ständig was Neues kaufen.",
                },
              ],
            },
          ],
          opts: ["Richtig", "Falsch"],
          items: [
            {
              au: 0,
              q: "Ein Geschäft hat Frau Novaks Toaster repariert.",
              a: 1,
              why: "Im Geschäft sagte man, eine Reparatur lohne sich nicht – ein Nachbar hat ihn repariert.",
            },
            {
              au: 0,
              q: "Auch junge Leute besuchen das Repair-Café.",
              a: 0,
              why: "„inzwischen kommen auch viele Studierende“.",
            },
          ],
        },
      },
      {
        name: "Hörverstehen Teil 3",
        skill: "Hören",
        time: "ca. 5 Min.",
        what: "Du hörst kurze Durchsagen, Telefonansagen oder Radiohinweise zweimal und entscheidest jeweils, ob eine Aussage richtig oder falsch ist.",
        steps: [
          "Lies die Aussage und überleg: Nach welcher Information muss ich suchen (Ort, Zeit, Grund)?",
          "Achte auf Wörter wie „heute“, „ausnahmsweise“, „ab morgen“, „stattdessen“.",
          "Nutze das zweite Hören zur Kontrolle der Details.",
        ],
        traps: [
          "Mehrere Orte, Zeiten oder Gründe werden genannt – nur einer passt zur Aussage (Unfall vs. Baustelle).",
          "Der Normalfall und die Ausnahme werden beide erwähnt.",
          "Eine Handlung wird ausdrücklich ausgeschlossen („Nachrichten werden nicht abgehört“).",
        ],
        tip: "Durchsagen wiederholen das Wichtigste oft selbst („Ich wiederhole …“). Genau dort steckt meist die Lösung.",
        mini: {
          title: "Mini-Übung: Durchsagen",
          instr: "Sie hören zwei Texte zweimal. Richtig oder falsch?",
          plays: 2,
          audio: [
            {
              h: "Text 1",
              lines: [
                {
                  s: "n",
                  t: "Sehr geehrte Fahrgäste, wegen einer Signalstörung fällt die S-Bahn nach Düsseldorf heute aus. Bitte nutzen Sie den Regionalexpress um neun Uhr zwölf von Gleis drei. Ich wiederhole: Fahrgäste nach Düsseldorf nutzen bitte den Regionalexpress um neun Uhr zwölf, Gleis drei.",
                },
              ],
            },
            {
              h: "Text 2",
              lines: [
                {
                  s: "f",
                  t: "Hallo und herzlich willkommen beim Fitnessstudio Aktiv. Leider ist gerade niemand erreichbar. Unsere Öffnungszeiten: montags bis freitags von sechs bis zweiundzwanzig Uhr, am Wochenende von acht bis zwanzig Uhr. Bis bald!",
                },
              ],
            },
          ],
          opts: ["Richtig", "Falsch"],
          items: [
            {
              au: 0,
              q: "Fahrgäste nach Düsseldorf sollen einen anderen Zug nehmen.",
              a: 0,
              why: "„Bitte nutzen Sie den Regionalexpress um neun Uhr zwölf.“",
            },
            {
              au: 1,
              q: "Das Fitnessstudio ist am Wochenende geschlossen.",
              a: 1,
              why: "Am Wochenende ist es „von acht bis zwanzig Uhr“ geöffnet.",
            },
          ],
        },
      },
      {
        name: "Schriftlicher Ausdruck",
        skill: "Schreiben",
        time: "30 Min.",
        what: "Du wählst eine von zwei Aufgaben, meist eine Bitte um Informationen oder eine Beschwerde, und schreibst einen formellen Brief bzw. eine formelle E-Mail. Von vier Leitpunkten bearbeitest du mindestens drei.",
        steps: [
          "2–3 Minuten: Aufgabe wählen und Stichwörter zu jedem Leitpunkt notieren.",
          "Gliederung festlegen: Betreff – Anrede – Einleitung – Leitpunkte in sinnvoller Reihenfolge – Schluss – Gruß.",
          "Schreiben: Jeder Leitpunkt bekommt einen eigenen Absatz mit 2–3 Sätzen.",
          "Die letzten 5 Minuten: Verbposition, Endungen, Großschreibung und Sie-Form prüfen.",
        ],
        traps: [
          "Nur Fragen aneinanderreihen, ohne Begründung oder eigene Situation.",
          "Zu unhöflich bei der Beschwerde („Sie müssen sofort …“) oder zu informell („Hallo“, „Liebe Grüße“).",
          "Leitpunkte nur in einem Halbsatz erwähnen – dann gibt es kaum Punkte dafür.",
        ],
        tip: "Lieber drei Leitpunkte ausführlich als vier nur kurz. Und schreib lieber 180 sichere Wörter als 250 mit vielen Fehlern.",
      },
      {
        name: "Mündliche Prüfung Teil 1: Präsentation",
        skill: "Sprechen",
        time: "ca. 5 Min. (für beide)",
        what: "Du sprichst etwa anderthalb Minuten über ein Thema aus deinem Leben (z. B. ein wichtiges Ereignis, ein Buch oder einen Film). Danach stellt dir deine Partnerin bzw. dein Partner Fragen – und umgekehrt.",
        steps: [
          "In der Vorbereitung: Thema wählen und vier Stichpunkte notieren (Was? Warum wichtig? Was hat sich verändert? Empfehlung?).",
          "Mit einem klaren Einleitungssatz beginnen: „Ich möchte heute über … sprechen.“",
          "Frei sprechen, mit Beispielen und Gefühlen – nicht ablesen.",
          "Beim Zuhören der Partnerin mitdenken und eine echte Nachfrage stellen.",
        ],
        traps: [
          "Einen auswendig gelernten Text abspulen – die Prüfenden merken das.",
          "Zu kurz sprechen und dann schweigen.",
          "Bei der Partnerin nicht zuhören und eine Frage stellen, die schon beantwortet wurde.",
        ],
        tip: "Plane einen persönlichen Moment ein (ein Gefühl, eine kleine Anekdote). Das macht die Präsentation lebendig und zeigt B2-Wortschatz.",
      },
      {
        name: "Mündliche Prüfung Teil 2: Diskussion",
        skill: "Sprechen",
        time: "ca. 5 Min.",
        what: "Du liest einen kurzen Zeitungstext zu einem kontroversen Thema und diskutierst mit deiner Partnerin bzw. deinem Partner. Wichtig sind Meinung, Begründung und das Eingehen auf Gegenargumente.",
        steps: [
          "In der Vorbereitung: Je zwei Argumente dafür und dagegen notieren, dazu ein Beispiel.",
          "Mit einer klaren Meinung starten und begründen.",
          "Auf die Partnerin reagieren: zustimmen, widersprechen, nachfragen.",
          "Am Ende kurz zusammenfassen: Wo seid ihr euch einig, wo nicht?",
        ],
        traps: [
          "Monologe halten statt zu diskutieren.",
          "Sofort der Partnerin in allem zustimmen – dann entsteht keine Diskussion.",
          "Nur den Zeitungstext wiederholen, ohne eigene Gedanken.",
        ],
        tip: "Gute Diskussionen wechseln ab: Argument – Reaktion – Gegenargument. Sag ruhig auch: „Da hast du recht, aber …“.",
      },
      {
        name: "Mündliche Prüfung Teil 3: Gemeinsam etwas planen",
        skill: "Sprechen",
        time: "ca. 5 Min.",
        what: "Du planst mit deiner Partnerin bzw. deinem Partner etwas (z. B. eine Feier, einen Ausflug, ein Projekt). Auf der Aufgabenkarte stehen Punkte, zu denen ihr Vorschläge machen und euch einigen sollt.",
        steps: [
          "In der Vorbereitung: Zu jedem Punkt eine eigene Idee notieren.",
          "Vorschläge machen und begründen, Vorschläge der Partnerin bewerten.",
          "Alle Punkte der Karte ansprechen – auch, wer was übernimmt.",
          "Am Ende das Ergebnis zusammenfassen.",
        ],
        traps: [
          "Einen Punkt der Aufgabenkarte vergessen.",
          "Nur „Ja, gut.“ sagen, ohne eigene Ideen.",
          "Alles allein bestimmen und die Partnerin nicht einbeziehen.",
        ],
        tip: "Frag aktiv: „Was meinst du?“ – Zusammenarbeit wird in diesem Teil ausdrücklich bewertet.",
      },
    ],
    redemittel: [
      {
        h: "Formeller Brief: Einleitung und Bezug",
        list: [
          "Ich beziehe mich auf Ihre Anzeige in … vom …",
          "In Ihrer Anzeige habe ich gelesen, dass …",
          "Ich wende mich an Sie, weil …",
          "Mit großem Interesse habe ich … gelesen.",
        ],
      },
      {
        h: "Bitte um Informationen",
        list: [
          "Ich würde gern wissen, ob / wann / wie …",
          "Könnten Sie mir bitte mitteilen, …?",
          "Außerdem interessiert mich, …",
          "Ich wäre Ihnen dankbar, wenn Sie mir … zusenden könnten.",
        ],
      },
      {
        h: "Beschwerde und Forderung",
        list: [
          "Leider muss ich mich über … beschweren.",
          "Laut Katalog / Vertrag … Tatsächlich jedoch …",
          "Darüber hinaus / Hinzu kommt, dass …",
          "Ich erwarte daher, dass Sie … / Ich bitte Sie, … zu erstatten.",
          "Andernfalls sehe ich mich gezwungen, …",
        ],
      },
      {
        h: "Schluss im formellen Brief",
        list: [
          "Für Rückfragen stehe ich Ihnen gern zur Verfügung.",
          "Über eine baldige Antwort würde ich mich freuen.",
          "Bitte teilen Sie mir bis zum … mit, wie …",
          "Mit freundlichen Grüßen",
        ],
      },
      {
        h: "Diskussion: Meinung, Widerspruch, Abwägen",
        list: [
          "Meiner Meinung nach … / Ich bin der Ansicht, dass …",
          "Da muss ich dir widersprechen: …",
          "Das sehe ich etwas anders, denn …",
          "Einerseits …, andererseits …",
          "Man darf aber nicht vergessen, dass …",
        ],
      },
      {
        h: "Kompromiss finden und gemeinsam planen",
        list: [
          "Was hältst du davon, wenn wir …?",
          "Ich schlage vor, dass …",
          "Wie wäre es mit einem Kompromiss: …?",
          "Damit bin ich einverstanden.",
          "Dann halten wir fest: …",
        ],
      },
    ],
    fehler: [
      [
        "Ich warte seit drei Wochen auf Ihre Antwort von meiner E-Mail.",
        "Ich warte seit drei Wochen auf Ihre Antwort auf meine E-Mail.",
        "Antwort auf + Akkusativ – Nomen haben feste Präpositionen.",
      ],
      [
        "Wegen dem schlechten Wetter ist der Ausflug ausgefallen.",
        "Wegen des schlechten Wetters ist der Ausflug ausgefallen.",
        "In formellen Texten: wegen, trotz, während + Genitiv.",
      ],
      [
        "Ich interessiere mich für den Kurs, deshalb ich habe eine Frage.",
        "Ich interessiere mich für den Kurs, deshalb habe ich eine Frage.",
        "Nach deshalb, trotzdem, außerdem steht das Verb direkt auf Position 2.",
      ],
      [
        "Ich konnte nicht schlafen, weil das Zimmer war sehr laut.",
        "Ich konnte nicht schlafen, weil das Zimmer sehr laut war.",
        "Nach weil, obwohl, dass steht das konjugierte Verb am Ende.",
      ],
      [
        "Das Problem hat bis heute nicht gelöst.",
        "Das Problem ist bis heute nicht gelöst worden.",
        "Passiv Perfekt: sein + Partizip II + worden.",
      ],
      [
        "Ich möchte eine Entscheidung machen.",
        "Ich möchte eine Entscheidung treffen.",
        "Nomen-Verb-Verbindungen: eine Entscheidung treffen, eine Frage stellen, in Anspruch nehmen.",
      ],
      [
        "Ich hätte Ihnen dankbar, wenn Sie mir antworten könnten.",
        "Ich wäre Ihnen dankbar, wenn Sie mir antworten könnten.",
        "dankbar sein → Konjunktiv II von sein: „wäre“ (nicht „hätte“); im wenn-Satz klingt „könnten“ höflich.",
      ],
      [
        "Das ist die Kollegin, mit die ich das Projekt plane.",
        "Das ist die Kollegin, mit der ich das Projekt plane.",
        "Beim Relativpronomen bestimmt die Präposition den Kasus (mit + Dativ).",
      ],
      [
        "Ich freue mich über Ihre baldige Antwort.",
        "Ich freue mich auf Ihre baldige Antwort.",
        "sich freuen auf = etwas kommt noch; sich freuen über = etwas ist schon passiert.",
      ],
      [
        "Ich lebe seit 2020 in Deutschland und ich arbeite als Pflegekraft und ich möchte mich weiterbilden.",
        "Seit 2020 lebe ich in Deutschland. Hier arbeite ich als Pflegekraft und möchte mich nun weiterbilden.",
        "B2 heißt: abwechslungsreiche Satzanfänge und Verknüpfungen statt immer „und … und …“.",
      ],
    ],
    plan: [
      {
        w: "Woche 1",
        tasks: [
          "Eine komplette Simulation unter Zeitdruck machen und die Punkte pro Teil notieren",
          "Täglich einen Zeitungsartikel lesen und in drei Sätzen zusammenfassen (Lesen Teil 1 und 2)",
          "Jeden Tag zehn Nomen-Verb-Verbindungen und Verben mit Präposition lernen",
          "Täglich 15 Minuten Radionachrichten oder einen Podcast hören",
          "Eine persönliche Fehlerliste anlegen",
        ],
      },
      {
        w: "Woche 2",
        tasks: [
          "Sprachbausteine: Präpositionen mit Kasus, Konnektoren und Relativpronomen wiederholen",
          "Zwei Übungen zu Lesen Teil 3 (Anzeigen) mit Zeitlimit 20 Minuten",
          "Ein Interview hören und Stichpunkte notieren (Hören Teil 2)",
          "Eine Bitte um Informationen schreiben (30 Minuten) und mit der Checkliste prüfen",
        ],
      },
      {
        w: "Woche 3",
        tasks: [
          "Zwei Beschwerden schreiben – Redemittel vorher auf Karteikarten notieren",
          "Präsentation (Teil 1) zu zwei Themen vorbereiten und mit dem Handy aufnehmen",
          "Mit einer Lernpartnerin zu zwei aktuellen Themen diskutieren (Teil 2)",
          "Durchsagen und Verkehrsmeldungen hören (Hören Teil 3)",
          "Fehlerliste durchgehen und typische Fehler gezielt üben",
        ],
      },
      {
        w: "Woche 4",
        tasks: [
          "Zweite komplette Simulation machen und mit Woche 1 vergleichen",
          "Den schwächsten Prüfungsteil noch zweimal gezielt üben",
          "Gemeinsam etwas planen (Teil 3) mit einer Partnerin üben – alle Punkte der Karte abarbeiten",
          "Alle Redemittel-Karten wiederholen",
          "Am Tag vor der Prüfung: Weg, Uhrzeit und Ausweis klären, früh schlafen gehen",
        ],
      },
    ],
  },
};
