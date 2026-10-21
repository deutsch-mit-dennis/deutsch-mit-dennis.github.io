// telc Deutsch B1 (Zertifikat Deutsch) – komplette Prüfungssimulation mit Vorbereitungsseite.
// Eigene Übungsaufgaben im Stil der Prüfung, keine offiziellen Aufgaben (keine Inhalte aus Modelltests oder Lehrbüchern).
(window.SIM = window.SIM || {})["telc-b1"] = {
  id: "telc-b1",
  title: "telc Deutsch B1 (Zertifikat Deutsch)",
  short: "telc B1",
  provider: "telc",
  level: "B1",
  intro:
    "Die allgemeine B1-Prüfung für den Alltag – zum Beispiel für Ausbildung, Arbeit oder die Einbürgerung. Du übst hier alle Teile mit echter Zeitvorgabe.",
  rule: "telc",
  skills: {
    lesen: { label: "Leseverstehen", max: 75 },
    sb: { label: "Sprachbausteine", max: 30 },
    hoeren: { label: "Hörverstehen", max: 75 },
    schreiben: { label: "Schriftlicher Ausdruck", max: 45 },
    muendlich: { label: "Mündliche Prüfung", max: 75 },
  },
  sections: [
    // ------------------------------------------------------------------ LESEN + SPRACHBAUSTEINE
    {
      id: "lesen",
      title: "Leseverstehen und Sprachbausteine",
      minutes: 90,
      note: "Teile frei einteilen – Empfehlung: Lesen 1 ca. 15, Lesen 2 ca. 20, Lesen 3 ca. 20, Sprachbausteine 1 ca. 15, Sprachbausteine 2 ca. 15 Min.",
      parts: [
        {
          title: "Leseverstehen Teil 1",
          skill: "lesen",
          pts: 5,
          instr:
            "Lesen Sie zuerst die zehn Überschriften. Lesen Sie dann die fünf Texte und entscheiden Sie, welche Überschrift (a–j) am besten zu welchem Text passt. Jede Überschrift passt nur einmal.",
          opts: [
            "a) Brot vom Vortag: Bäckerei kämpft gegen Verschwendung",
            "b) Unwetter: Stadtfest fällt dieses Jahr aus",
            "c) Lesen am Sonntag: Bücherei erweitert Öffnungszeiten",
            "d) Bücherei bleibt wegen Umbau monatelang geschlossen",
            "e) Immer mehr Unfälle mit Fahrrädern in der Innenstadt",
            "f) Wenn Schüler zu Lehrern werden",
            "g) Bäckereien müssen Preise erhöhen",
            "h) Lieber Rad als Auto: Junge Menschen verzichten auf den Führerschein",
            "i) Feiern trotz Regen: Fest zieht in die Halle um",
            "j) Handys im Unterricht bald verboten?",
          ],
          material: [
            {
              h: "Text 1",
              t: "Kassel. Gute Nachricht für alle Leseratten: Die Stadtbibliothek am Königsplatz hat ab dem 1. November auch sonntags von 11 bis 17 Uhr geöffnet. Nach dem großen Umbau im vergangenen Jahr gibt es dort ein Lesecafé und einen Bereich mit Spielen für Familien. „Viele Menschen haben unter der Woche einfach keine Zeit“, erklärt Bibliotheksleiterin Anke Morawe. Am Sonntag arbeiten Studierende und Ehrenamtliche. Ausleihen und zurückgeben kann man die Bücher an Automaten. Die Stadt will das Angebot zunächst ein Jahr lang testen.",
            },
            {
              h: "Text 2",
              t: "Hannover. Nur noch gut die Hälfte der 18- bis 24-Jährigen in Großstädten hat einen Führerschein. Das zeigt eine neue Umfrage der Hochschule Hannover. Viele junge Leute sagen, dass ein Auto zu teuer ist und dass man in der Stadt mit dem Fahrrad, dem Bus oder der Bahn schneller ans Ziel kommt. Für 41 Prozent ist auch der Umweltschutz ein wichtiger Grund. Die Angst vor Unfällen im Straßenverkehr nennen dagegen nur wenige. Auf dem Land sieht es ganz anders aus: Dort machen fast alle jungen Menschen den Führerschein.",
            },
            {
              h: "Text 3",
              t: "Würzburg. Was am Abend in der Bäckerei Lindner übrig bleibt, landet nicht mehr im Müll. Seit März verkauft der Familienbetrieb Brot und Brötchen vom Vortag in einer eigenen Ecke zum halben Preis. Was dann noch übrig ist, holt die Würzburger Tafel ab. „Früher haben wir jede Woche mehrere Säcke Brot weggeworfen. Das hat mir richtig wehgetan“, sagt Bäckermeister Paul Lindner. Obwohl auch für ihn Mehl und Strom teurer geworden sind, will er die normalen Preise in diesem Jahr nicht erhöhen.",
            },
            {
              h: "Text 4",
              t: "Rostock. Jeden Mittwochnachmittag wird es im Gemeindehaus St. Petri lebendig: Schülerinnen und Schüler der neunten Klasse des Goethe-Gymnasiums erklären älteren Menschen, wie Smartphone und Tablet funktionieren. Die Senioren lernen zum Beispiel, wie man Fotos an die Enkel schickt oder online einen Arzttermin bucht. „Die Jugendlichen sind sehr geduldig“, lobt die 78-jährige Helga Brandt. Auch die Schüler profitieren: Sie lernen, etwas verständlich zu erklären. Das Projekt läuft bis zu den Sommerferien.",
            },
            {
              h: "Text 5",
              t: "Bamberg. Ganz ins Wasser gefallen ist das Bamberger Sommerfest am Samstag nicht. Wegen einer Unwetterwarnung hatte die Stadt die Bühnen am Vormittag abbauen lassen. Absagen wollten die Veranstalter das Fest aber nicht. Kurzerhand zogen Bands, Essensstände und Kinderprogramm in die Brose-Halle um. Trotz des Wetters kamen rund 4.000 Besucherinnen und Besucher. „Die Stimmung war fantastisch, fast besser als draußen“, sagte Organisator Timo Reuß.",
            },
          ],
          items: [
            {
              q: "Text 1",
              a: 2,
              why: "Die Bibliothek hat ab November „auch sonntags“ geöffnet – der Umbau ist schon vorbei (nicht d).",
            },
            {
              q: "Text 2",
              a: 7,
              why: "Nur gut die Hälfte der jungen Städter hat einen Führerschein, sie fahren lieber Rad, Bus oder Bahn; Unfälle nennen „nur wenige“ (nicht e).",
            },
            {
              q: "Text 3",
              a: 0,
              why: "Brot vom Vortag wird billiger verkauft oder an die Tafel gegeben statt weggeworfen; die Preise will er „nicht erhöhen“ (nicht g).",
            },
            {
              q: "Text 4",
              a: 5,
              why: "Schülerinnen und Schüler erklären Senioren das Smartphone – sie sind also die „Lehrer“; ein Handyverbot (j) ist kein Thema.",
            },
            {
              q: "Text 5",
              a: 8,
              why: "Wegen des Unwetters zog das Fest in die Brose-Halle um; „Absagen wollten die Veranstalter das Fest aber nicht“ (nicht b).",
            },
          ],
        },
        {
          title: "Leseverstehen Teil 2",
          skill: "lesen",
          pts: 5,
          instr:
            "Lesen Sie den Text und die Aufgaben 1–5. Welche Lösung (a, b oder c) ist jeweils richtig?",
          material: [
            {
              h: "Reparieren statt wegwerfen: Ein Samstag im Repair-Café",
              t: "Es ist kurz nach zehn Uhr, und vor dem Gemeindehaus in Münster-Hiltrup stehen schon zwölf Menschen in einer Schlange. Eine ältere Dame hält einen Toaster im Arm, ein junger Mann trägt eine Stehlampe, ein Kind zieht einen Holzschlitten hinter sich her. Sie alle warten auf dasselbe: dass ihre kaputten Sachen wieder funktionieren.\nSeit drei Jahren gibt es das Repair-Café, immer am ersten Samstag im Monat. Gegründet hat es Thomas Breuer, ein pensionierter Elektriker. „Ich habe mich immer geärgert, wie viel weggeworfen wird“, erzählt der 67-Jährige. „Oft ist nur ein Kabel locker oder eine kleine Sicherung kaputt. Das kostet ein paar Cent, aber die Leute kaufen gleich ein neues Gerät.“ Am Anfang war Breuer mit zwei Freunden allein. Heute helfen 15 Ehrenamtliche mit: eine Schneiderin, zwei Fahrradmechaniker, ein Student, der sich mit Computern auskennt, und mehrere Rentner, die früher im Handwerk gearbeitet haben.\nGeld verlangt das Team nicht. Wer möchte, wirft etwas in eine Spendendose. Davon kauft der Verein Werkzeug und Ersatzteile. Kaffee und Kuchen gibt es gegen eine kleine Spende, den Kuchen backen meistens die Besucherinnen und Besucher selbst.\nWichtig ist Breuer eine Regel: Die Leute sollen ihr Gerät nicht einfach abgeben und später wieder abholen. „Wir reparieren zusammen“, sagt er. „Jeder soll sehen, wie sein Gerät innen aussieht, und beim nächsten Mal vielleicht selbst den Schraubenzieher in die Hand nehmen.“ Nicht jeder findet das am Anfang gut. Manche möchten lieber nur warten und Kaffee trinken. Aber am Ende seien die meisten richtig stolz, sagt Breuer.\nNicht alles kann gerettet werden. Ungefähr zwei von drei Reparaturen gelingen, schätzt das Team. Schwierig ist es vor allem bei modernen Handys, die fest verklebt sind, oder wenn es keine Ersatzteile mehr gibt. „Manche Hersteller machen es uns wirklich nicht leicht“, sagt der Student Jonas Kehl.\nDie Stadt Münster unterstützt das Projekt inzwischen: Sie stellt den Raum im Gemeindehaus kostenlos zur Verfügung. Breuer wünscht sich trotzdem noch etwas. „Wir brauchen dringend junge Leute, die mitmachen. Viele von uns sind schon über siebzig.“ Wer helfen möchte, muss übrigens kein Profi sein. „Neugier und Geduld reichen“, meint Breuer und lacht. Dann beugt er sich wieder über den Toaster der älteren Dame.",
            },
          ],
          items: [
            {
              q: "Das Repair-Café …",
              opts: [
                "a) gibt es seit drei Monaten.",
                "b) ist einmal im Monat geöffnet.",
                "c) wurde von der Stadt Münster gegründet.",
              ],
              a: 1,
              why: "„Seit drei Jahren … immer am ersten Samstag im Monat“; gegründet hat es Thomas Breuer, nicht die Stadt.",
            },
            {
              q: "Im Repair-Café helfen heute …",
              opts: [
                "a) Menschen mit ganz unterschiedlichen Fähigkeiten.",
                "b) nur Rentner, die im Handwerk gearbeitet haben.",
                "c) Thomas Breuer und zwei Freunde.",
              ],
              a: 0,
              why: "Es helfen eine Schneiderin, Fahrradmechaniker, ein Computer-Student und Rentner; mit zwei Freunden war Breuer nur „am Anfang“.",
            },
            {
              q: "Für eine Reparatur …",
              opts: [
                "a) muss man einen festen Preis bezahlen.",
                "b) bezahlt man nur die Ersatzteile.",
                "c) kann man freiwillig Geld spenden.",
              ],
              a: 2,
              why: "„Geld verlangt das Team nicht. Wer möchte, wirft etwas in eine Spendendose.“",
            },
            {
              q: "Thomas Breuer möchte, dass die Besucher …",
              opts: [
                "a) ihr Gerät abgeben und später abholen.",
                "b) bei der Reparatur selbst mitmachen.",
                "c) Kuchen für das Café mitbringen.",
              ],
              a: 1,
              why: "„Wir reparieren zusammen“ – die Leute sollen das Gerät gerade nicht nur abgeben.",
            },
            {
              q: "Was wünscht sich Thomas Breuer für die Zukunft?",
              opts: [
                "a) Einen kostenlosen Raum von der Stadt.",
                "b) Mehr Profis im Team.",
                "c) Mehr junge Helferinnen und Helfer.",
              ],
              a: 2,
              why: "„Wir brauchen dringend junge Leute“; den Raum stellt die Stadt schon zur Verfügung, Profis braucht man nicht.",
            },
          ],
        },
        {
          title: "Leseverstehen Teil 3",
          skill: "lesen",
          pts: 2.5,
          instr:
            "Lesen Sie die zehn Situationen und die zwölf Anzeigen (a–l). Welche Anzeige passt zu welcher Situation? Jede Anzeige können Sie nur einmal verwenden. Für manche Situationen gibt es keine passende Anzeige. Wählen Sie dann x.",
          opts: [
            "a) Schwimmschule Delfin",
            "b) Rad & Tat – Gebrauchtradmarkt",
            "c) Kochstudio Masala",
            "d) Lernstudio Plus",
            "e) Transporter-Vermietung Möller",
            "f) Yoga für werdende Mütter",
            "g) Familienservice Kleine Hände",
            "h) Musikschule Saitenklang",
            "i) Wanderfreunde Siebengebirge",
            "j) Fit am Computer – 60 plus",
            "k) Basar Kinderkram",
            "l) Salsa für Paare",
            "x) keine passende Anzeige",
          ],
          material: [
            {
              h: "a",
              t: "Schwimmschule Delfin – Nie zu spät! Schwimmkurse für erwachsene Anfänger in kleinen Gruppen (max. 6 Personen). Kurse dienstags und donnerstags 19:00–20:00 Uhr im Hallenbad Nord. Infos: 0231/77 45 20",
            },
            {
              h: "b",
              t: "Rad & Tat – Gebrauchtradmarkt jeden Samstag von 9 bis 14 Uhr auf dem Hof der Jugendwerkstatt. Alle Räder geprüft und repariert, Stadträder schon ab 60 Euro. Sie können auch Ihr altes Rad bei uns verkaufen!",
            },
            {
              h: "c",
              t: "Kochstudio Masala: Indisch kochen – ganz vegetarisch! Wochenendkurse für Anfänger und Fortgeschrittene. Currys, Dals und frisches Brot aus dem Ofen. Alle Zutaten inklusive. Anmeldung unter www.kochstudio-masala.de",
            },
            {
              h: "d",
              t: "Lernstudio Plus: Probleme in Mathe, Englisch oder Deutsch? Erfahrene Lehrkräfte helfen Schülerinnen und Schülern der Klassen 5 bis 10 – einzeln oder in Kleingruppen. Erste Stunde kostenlos! Tel. 0231/56 08 91",
            },
            {
              h: "e",
              t: "Transporter-Vermietung Möller – Umzug, Möbelkauf, Gartenabfälle? Bei uns mieten Sie Transporter von 3,5 t schon ab 3 Stunden. Auch am Wochenende. Führerschein Klasse B reicht. Kaiserstraße 104",
            },
            {
              h: "f",
              t: "Yoga für werdende Mütter: Sanfte Übungen für Rücken und Atmung in der Schwangerschaft. Mittwochs 10 Uhr, Hebammenpraxis am Markt. Viele Krankenkassen übernehmen die Kosten.",
            },
            {
              h: "g",
              t: "Familienservice Kleine Hände: Sie möchten einen Abend ausgehen? Wir vermitteln zuverlässige, geprüfte Babysitter für Kinder von 1 bis 10 Jahren – auch kurzfristig und am Wochenende. Anruf genügt: 0231/33 19 70",
            },
            {
              h: "h",
              t: "Musikschule Saitenklang: Gitarrenunterricht für Kinder ab 8 Jahren und Jugendliche. Einzel- und Gruppenunterricht, Leihgitarren vorhanden. Kostenlose Probestunde nach Vereinbarung.",
            },
            {
              h: "i",
              t: "Wanderfreunde Siebengebirge: Jeden Sonntag gemeinsame Touren von 10 bis 20 Kilometern, danach gemütliche Einkehr. Gäste sind herzlich willkommen – einfach am Treffpunkt Bahnhof vorbeikommen, 9 Uhr!",
            },
            {
              h: "j",
              t: "Fit am Computer – 60 plus: In unserem Kurs lernen Seniorinnen und Senioren in Ruhe die ersten Schritte: E-Mails schreiben und lesen, Fotos verschicken, sicher im Internet surfen. Volkshochschule, Raum 12, montags 15 Uhr.",
            },
            {
              h: "k",
              t: "Basar Kinderkram – Gut erhaltene Baby- und Kinderkleidung (Größe 50 bis 140), Spielzeug und Kinderwagen zu kleinen Preisen. Samstag, 10–13 Uhr, Gemeindesaal St. Josef. Kaffee und Kuchen im Foyer.",
            },
            {
              h: "l",
              t: "Salsa für Paare: Lernen Sie in acht Abenden die Grundschritte des Salsa! Freitags 20 Uhr, Tanzschule Rhythmo. Nur Anmeldung als Paar möglich.",
            },
          ],
          items: [
            {
              q: "Ihre Nachbarin ist 72 Jahre alt und möchte lernen, wie sie ihren Enkeln E-Mails schreiben kann.",
              a: 9,
              why: "Anzeige j: Kurs für 60 plus, „E-Mails schreiben und lesen“.",
            },
            {
              q: "Ein Kollege ist neu in der Stadt und möchte am Wochenende draußen in der Natur Leute kennenlernen.",
              a: 8,
              why: "Anzeige i: Sonntagswanderungen, „Gäste sind herzlich willkommen“.",
            },
            {
              q: "Sie ziehen um und brauchen für einen Nachmittag ein großes Auto.",
              a: 4,
              why: "Anzeige e: Transporter „schon ab 3 Stunden“ für den Umzug.",
            },
            {
              q: "Ihre Freundin kann nicht schwimmen und möchte es endlich lernen – aber nur abends nach der Arbeit.",
              a: 0,
              why: "Anzeige a: Kurse für erwachsene Anfänger, 19–20 Uhr.",
            },
            {
              q: "Sie suchen ein günstiges Fahrrad für den Weg zur Arbeit.",
              a: 1,
              why: "Anzeige b: geprüfte Gebrauchträder „schon ab 60 Euro“.",
            },
            {
              q: "Ihr Sohn ist 14 und hat schlechte Noten in Mathematik.",
              a: 3,
              why: "Anzeige d: Nachhilfe in Mathe für die Klassen 5 bis 10.",
            },
            {
              q: "Sie und Ihr Mann möchten am Samstagabend ins Theater gehen. Ihre Kinder sind drei und fünf Jahre alt.",
              a: 6,
              why: "Anzeige g: Babysitter für Kinder von 1 bis 10 Jahren, auch am Wochenende.",
            },
            {
              q: "Ein Freund möchte lernen, wie man Sushi und andere japanische Gerichte zubereitet.",
              a: 12,
              why: "Das Kochstudio c bietet nur indische Küche an – keine Anzeige passt.",
            },
            {
              q: "Ihre Tochter ist sechs Jahre alt und möchte unbedingt Gitarre spielen lernen.",
              a: 12,
              why: "Die Musikschule h nimmt Kinder erst „ab 8 Jahren“ – keine Anzeige passt.",
            },
            {
              q: "Sie erwarten ein Baby und möchten günstig Kleidung für das Kind kaufen.",
              a: 10,
              why: "Anzeige k: Babykleidung ab Größe 50 zu kleinen Preisen (Yoga in f ist für sie, nicht für Kleidung).",
            },
          ],
        },
        {
          title: "Sprachbausteine Teil 1",
          skill: "sb",
          pts: 1.5,
          instr:
            "Lesen Sie den folgenden Text. Welches Wort (a, b oder c) passt in die Lücken 1–10?",
          material: [
            {
              h: "Brief an eine Freundin",
              t: "Liebe Sabine,\nvielen Dank für deinen langen Brief! Ich habe mich sehr {1} gefreut. Entschuldige bitte, dass ich erst jetzt antworte, {2} in den letzten Wochen war bei uns wirklich viel los.\nWie du weißt, sind wir im Mai nach Freiburg gezogen. Die Wohnung, {3} wir gefunden haben, ist zwar etwas kleiner als die alte, aber sie hat einen schönen Balkon. Die Kinder haben sich schnell an die neue Schule gewöhnt. Lukas hat schon zwei Freunde, mit {4} er jeden Nachmittag Fußball spielt.\nIch selbst arbeite seit dem 1. Juni in einem Hotel {5} der Rezeption. Die Arbeit macht mir Spaß, aber ich muss oft am Wochenende arbeiten. {6} ich frei habe, fahren wir in den Schwarzwald und wandern.\nDu hast geschrieben, dass du im Herbst Urlaub hast. Hast du nicht Lust, uns {7} besuchen? Wir haben jetzt ein Gästezimmer, du {8} also gern bei uns übernachten. Wir können entweder die Altstadt besichtigen {9} einen Ausflug an den Bodensee machen.\nSchreib mir bald, ob es klappt. Und grüß bitte auch {10} Mann von mir!\nLiebe Grüße\ndeine Natalia",
            },
          ],
          items: [
            {
              q: "",
              opts: ["a) darüber", "b) darauf", "c) damit"],
              a: 0,
              why: "sich über etwas freuen (Vergangenes) → „darüber“; sich auf etwas freuen bezieht sich auf die Zukunft.",
            },
            {
              q: "",
              opts: ["a) weil", "b) denn", "c) deshalb"],
              a: 1,
              why: "Danach steht das Verb an Position 2 („war bei uns“) – das passt nur zu „denn“.",
            },
            {
              q: "",
              opts: ["a) den", "b) der", "c) die"],
              a: 2,
              why: "die Wohnung (feminin), Akkusativ als Objekt von „gefunden“ → „die“.",
            },
            {
              q: "",
              opts: ["a) die", "b) denen", "c) dem"],
              a: 1,
              why: "mit + Dativ Plural (zwei Freunde) → „denen“.",
            },
            {
              q: "",
              opts: ["a) an", "b) in", "c) auf"],
              a: 0,
              why: "Feste Verbindung: „an der Rezeption arbeiten“.",
            },
            {
              q: "",
              opts: ["a) Als", "b) Wann", "c) Wenn"],
              a: 2,
              why: "Wiederholte Situation in der Gegenwart → „wenn“; „als“ nur für einmalige Vergangenheit, „wann“ ist ein Fragewort.",
            },
            {
              q: "",
              opts: ["a) um", "b) zu", "c) für"],
              a: 1,
              why: "Lust haben, etwas zu tun → Infinitiv mit „zu“.",
            },
            {
              q: "",
              opts: ["a) kannst", "b) konntest", "c) könnt"],
              a: 0,
              why: "du + Präsens (es geht um den Besuch im Herbst) → „kannst“; „könnt“ passt zu „ihr“.",
            },
            {
              q: "",
              opts: ["a) und", "b) oder", "c) noch"],
              a: 1,
              why: "Zweiteiliger Konnektor „entweder … oder“.",
            },
            {
              q: "",
              opts: ["a) deinem", "b) deiner", "c) deinen"],
              a: 2,
              why: "grüßen + Akkusativ, der Mann (maskulin) → „deinen Mann“.",
            },
          ],
        },
        {
          title: "Sprachbausteine Teil 2",
          skill: "sb",
          pts: 1.5,
          instr:
            "Lesen Sie den folgenden Text. Welches Wort (a–o) passt in die Lücken 1–10? Jedes Wort passt nur einmal. Fünf Wörter bleiben übrig.",
          opts: [
            "a) aber",
            "b) aus",
            "c) dadurch",
            "d) dafür",
            "e) bei",
            "f) dass",
            "g) deutlich",
            "h) falls",
            "i) ihm",
            "j) ihn",
            "k) oder",
            "l) seit",
            "m) spätestens",
            "n) obwohl",
            "o) während",
          ],
          material: [
            {
              h: "Mitteilung der Hausverwaltung",
              t: "Sehr geehrte Mieterinnen und Mieter,\nwie Sie bereits {1} unserem letzten Schreiben wissen, werden ab dem 3. März die Fenster im ganzen Haus erneuert. Die Arbeiten dauern voraussichtlich zwei Wochen.\nBitte denken Sie daran, {2} die Handwerker an einem Tag in Ihre Wohnung kommen müssen. Sie sollten also zu Hause sein {3} einer Nachbarin oder einem Nachbarn Ihren Schlüssel geben. Den genauen Termin für Ihre Wohnung teilen wir Ihnen {4} eine Woche vorher mit.\nBitte räumen Sie vorher alle Gegenstände von den Fensterbänken. Die Firma Glas-Hoffmann ist {5} verantwortlich, die Möbel mit Folie abzudecken. Trotzdem kann es etwas staubig werden.\n{6} der Arbeiten kann es außerdem laut werden. Wir bitten dafür um Ihr Verständnis. {7} Sie Fragen haben, wenden Sie sich bitte an Herrn Krause. Sie erreichen {8} montags bis freitags von 9 bis 12 Uhr unter der Nummer 0221/48 37 15.\nDie neuen Fenster sind viel besser isoliert als die alten. {9} werden Ihre Heizkosten in Zukunft {10} sinken.\nMit freundlichen Grüßen\nIhre Hausverwaltung Berger & Lutz",
            },
          ],
          items: [
            {
              q: "",
              a: 1,
              why: "etwas aus einem Schreiben wissen → „aus unserem letzten Schreiben“.",
            },
            {
              q: "",
              a: 5,
              why: "Nebensatz nach „denken Sie daran“ mit Verb am Ende → „dass“.",
            },
            {
              q: "",
              a: 10,
              why: "Zwei Möglichkeiten: zu Hause sein „oder“ den Schlüssel abgeben.",
            },
            {
              q: "",
              a: 12,
              why: "„spätestens eine Woche vorher“ – zeitliche Grenze.",
            },
            {
              q: "",
              a: 3,
              why: "verantwortlich sein für etwas → „dafür verantwortlich, … abzudecken“.",
            },
            {
              q: "",
              a: 14,
              why: "„Während der Arbeiten“ (Genitiv) – zur gleichen Zeit wie die Arbeiten.",
            },
            {
              q: "",
              a: 7,
              why: "Bedingung mit Verb am Ende: „Falls Sie Fragen haben, …“; „obwohl“ ergibt keinen Sinn.",
            },
            {
              q: "",
              a: 9,
              why: "jemanden erreichen + Akkusativ, Herr Krause → „ihn“.",
            },
            {
              q: "",
              a: 2,
              why: "Folge der besseren Isolierung → „Dadurch“ (Verb direkt danach).",
            },
            {
              q: "",
              a: 6,
              why: "Adverb zu „sinken“: Die Kosten sinken „deutlich“.",
            },
          ],
        },
      ],
    },
    // ------------------------------------------------------------------ HÖREN
    {
      id: "hoeren",
      title: "Hörverstehen",
      minutes: 30,
      parts: [
        {
          title: "Hörverstehen Teil 1",
          skill: "hoeren",
          pts: 5,
          instr:
            "Sie hören fünf kurze Texte aus dem Radio. Sie hören jeden Text nur einmal. Lesen Sie zuerst die Aussage zu jedem Text. Entscheiden Sie beim Hören: Ist die Aussage richtig oder falsch?",
          plays: 1,
          opts: ["Richtig", "Falsch"],
          audio: [
            {
              h: "Text 1",
              lines: [
                {
                  s: "n",
                  t: "Und jetzt die Verkehrsmeldungen. Wer am Wochenende im Ruhrgebiet unterwegs ist, muss sich auf Behinderungen einstellen: Die A vierzig wird zwischen Essen-Kray und Gelsenkirchen in Richtung Dortmund voll gesperrt. Los geht's am Freitagabend um zweiundzwanzig Uhr, und die Sperrung dauert bis Montagmorgen, fünf Uhr. Grund sind Bauarbeiten an einer Brücke. In der Gegenrichtung, also Richtung Duisburg, ist die Strecke frei. Eine Umleitung ist ausgeschildert.",
                },
              ],
            },
            {
              h: "Text 2",
              lines: [
                {
                  s: "n",
                  t: "Und nun zum Wetter. Morgen ist Deutschland zweigeteilt: Im Norden und in der Mitte ziehen dichte Wolken auf, und es regnet immer wieder, zum Teil auch kräftig. Im Süden dagegen bleibt es sonnig und trocken. Die Höchstwerte liegen zwischen sechzehn Grad an der Küste und fünfundzwanzig Grad am Oberrhein. Zum Wochenende hin wird es dann überall etwas kühler.",
                },
              ],
            },
            {
              h: "Text 3",
              lines: [
                {
                  s: "n",
                  t: "Große Freude im Zoo Hannover: Dort ist in der Nacht zum Dienstag ein kleiner Elefant zur Welt gekommen. Mutter und Kind sind wohlauf. Das Elefantenmädchen wiegt ungefähr hundert Kilo. Wer es sehen möchte, muss sich allerdings noch etwas gedulden: Die beiden bleiben erst mal im Stall. Ab nächster Woche soll das Kleine dann zum ersten Mal auf die Außenanlage.",
                },
              ],
            },
            {
              h: "Text 4",
              lines: [
                {
                  s: "n",
                  t: "Gute Nachrichten für alle Pendlerinnen und Pendler: Der Streik bei der Bahn ist vorbei. Die Gewerkschaft und die Bahn haben sich heute Nachmittag geeinigt. Ab morgen früh sollen alle Züge wieder nach dem normalen Fahrplan fahren. Heute Abend müssen Fahrgäste aber noch mit Verspätungen und Zugausfällen rechnen.",
                },
              ],
            },
            {
              h: "Text 5",
              lines: [
                {
                  s: "n",
                  t: "Und noch ein Tipp aus Leipzig: Dort feiert man am Samstag den Tag des öffentlichen Nahverkehrs. Den ganzen Tag können alle Fahrgäste kostenlos mit Bussen und Straßenbahnen fahren, egal ob Kinder oder Erwachsene. Am Hauptbahnhof gibt's außerdem ein Fest mit Musik, und Kinder dürfen sich eine historische Straßenbahn von innen anschauen.",
                },
              ],
            },
          ],
          items: [
            {
              q: "Die A40 ist am Wochenende in Richtung Dortmund gesperrt.",
              au: 0,
              a: 0,
              why: "Die A40 wird „in Richtung Dortmund voll gesperrt“ – von Freitagabend bis Montagmorgen.",
            },
            {
              q: "Morgen scheint in ganz Deutschland die Sonne.",
              au: 1,
              a: 1,
              why: "Nur im Süden bleibt es sonnig, im Norden und in der Mitte regnet es.",
            },
            {
              q: "Die Besucher können das Elefantenbaby schon ab heute sehen.",
              au: 2,
              a: 1,
              why: "Mutter und Kind bleiben „erst mal im Stall“, erst „ab nächster Woche“ geht das Elefantenbaby nach draußen.",
            },
            {
              q: "Ab morgen fahren die Züge wieder normal.",
              au: 3,
              a: 0,
              why: "„Ab morgen früh sollen alle Züge wieder nach dem normalen Fahrplan fahren.“",
            },
            {
              q: "Am Samstag fahren in Leipzig nur Kinder kostenlos Bus und Bahn.",
              au: 4,
              a: 1,
              why: "Kostenlos für „alle Fahrgäste … egal ob Kinder oder Erwachsene“.",
            },
          ],
        },
        {
          title: "Hörverstehen Teil 2",
          skill: "hoeren",
          pts: 2.5,
          instr:
            "Sie hören ein Gespräch aus dem Radio. Sie hören das Gespräch zweimal. Lesen Sie zuerst die Aussagen 1–10. Entscheiden Sie beim Hören: Ist die Aussage richtig oder falsch?",
          plays: 2,
          opts: ["Richtig", "Falsch"],
          audio: [
            {
              h: "Radiosendung „Mittendrin“",
              lines: [
                {
                  s: "f",
                  t: "Guten Tag und herzlich willkommen bei Mittendrin, unserer Sendung über Menschen aus der Region. Bei mir im Studio sitzt heute Mehmet Aydın. Herr Aydın, Sie sind zweiundvierzig und arbeiten seit einem Jahr als Erzieher in einem Kindergarten in Bochum. Das ist ja eher ungewöhnlich, oder?",
                },
                {
                  s: "m",
                  t: "Ja, hallo, guten Tag. Also, ungewöhnlich ist das schon, ja. In meiner Kita bin ich der einzige Mann im Team. Wir sind elf Leute, zehn Frauen und ich.",
                },
                { s: "f", t: "Zehn Frauen und Sie, okay. Und was haben Sie vorher gemacht?" },
                {
                  s: "m",
                  t: "Ich war fast zwanzig Jahre bei einer Bank. Erst hab ich da die Ausbildung gemacht, dann war ich Kundenberater, für Kredite. Und das war, äh, eigentlich ein guter Job. Gutes Geld, nette Kollegen, da kann ich nichts sagen.",
                },
                { s: "f", t: "Hm. Und warum haben Sie dann gewechselt?" },
                {
                  s: "m",
                  t: "Tja, das ist eine längere Geschichte. Meine Filiale wurde vor vier Jahren geschlossen. Ich hätte nach Dortmund wechseln können, in eine andere Filiale, das hat man mir auch angeboten. Aber da hab ich gemerkt: Eigentlich will ich das gar nicht mehr. Ich saß den ganzen Tag am Computer und hab über Zahlen geredet. Und ich hab mich gefragt: Willst du das wirklich noch zwanzig Jahre machen?",
                },
                {
                  s: "f",
                  t: "Und wie sind Sie dann ausgerechnet auf Erzieher gekommen?",
                },
                {
                  s: "m",
                  t: "Durch meine eigenen Kinder, ehrlich gesagt. Ich hab zwei Töchter, und als die klein waren, bin ich oft bei Ausflügen vom Kindergarten mitgegangen, so als Begleitung. Das hat mir unglaublich viel Spaß gemacht. Und dann hat eine Erzieherin mal zu mir gesagt: Herr Aydın, Sie sollten das beruflich machen. Da hab ich nur gelacht. Aber der Satz ist mir nicht mehr aus dem Kopf gegangen. Meine Frau war übrigens am Anfang eher skeptisch.",
                },
                {
                  s: "f",
                  t: "Mhm. Aber so eine Ausbildung dauert ja normalerweise mehrere Jahre. Wie haben Sie das denn finanziell geschafft?",
                },
                {
                  s: "m",
                  t: "Ja, das war das größte Problem. Ich hab eine sogenannte praxisintegrierte Ausbildung gemacht, die dauert drei Jahre. Da arbeitet man von Anfang an schon in der Kita und bekommt auch ein Gehalt. Natürlich viel weniger als bei der Bank, so ungefähr die Hälfte. Aber meine Frau arbeitet auch, und wir hatten vorher ein bisschen was gespart. Trotzdem mussten wir auf manches verzichten. Wir sind zum Beispiel drei Jahre lang nicht in den Urlaub geflogen. Wir sind dann eben mit dem Auto an die Nordsee gefahren.",
                },
                {
                  s: "f",
                  t: "Und wie war das, mit fast vierzig noch mal in die Schule zu gehen?",
                },
                {
                  s: "m",
                  t: "Am Anfang komisch, ja. Die meisten in meiner Klasse waren so um die zwanzig, also halb so alt wie ich. Ich dachte, die finden mich bestimmt seltsam. Aber nee, das war überhaupt kein Problem. Im Gegenteil: Ich hab den Jüngeren oft bei Bewerbungen geholfen, und die haben mir dafür jede Menge Spiele und Lieder beigebracht.",
                },
                {
                  s: "f",
                  t: "Und die Eltern? Wie reagieren die denn auf einen Mann in der Kita?",
                },
                {
                  s: "m",
                  t: "Die allermeisten ganz positiv. Viele Väter sagen: Endlich mal ein Mann! Am Anfang gab's zwei, drei Mütter, die ein bisschen skeptisch waren. Aber das hat sich schnell gelegt, als sie gesehen haben, wie die Kinder mit mir umgehen.",
                },
                {
                  s: "f",
                  t: "Gibt's denn etwas, das Sie an Ihrem alten Job vermissen?",
                },
                {
                  s: "m",
                  t: "Ehrlich gesagt? Das Gehalt, ja. Und manchmal die Ruhe. In einer Kita ist es laut, den ganzen Tag. Wenn ich abends nach Hause komme, brauch ich erst mal eine halbe Stunde für mich. Aber bereut hab ich den Wechsel keinen einzigen Tag.",
                },
                {
                  s: "f",
                  t: "Zum Schluss noch: Was würden Sie Leuten raten, die auch über einen Neuanfang nachdenken?",
                },
                {
                  s: "m",
                  t: "Hm, gute Frage. Ich würde sagen: Nicht einfach sofort kündigen, sondern erst mal ausprobieren. Ich hab vor der Ausbildung zwei Wochen ein Praktikum gemacht, in meinem Urlaub. Und danach wusste ich: Ja, das ist es. Und man sollte gut mit der Familie sprechen, denn die ganze Familie muss mitmachen.",
                },
                {
                  s: "f",
                  t: "Herr Aydın, vielen Dank für das Gespräch und weiterhin ganz viel Freude in der Kita!",
                },
                { s: "m", t: "Danke schön. Hat Spaß gemacht." },
              ],
            },
          ],
          items: [
            {
              q: "Herr Aydın ist der einzige Mann im Team seiner Kita.",
              au: 0,
              a: 0,
              why: "„In meiner Kita bin ich der einzige Mann im Team.“",
            },
            {
              q: "Herr Aydın war mit seiner Arbeit bei der Bank immer unzufrieden.",
              au: 0,
              a: 1,
              why: "Er sagt: „eigentlich ein guter Job. Gutes Geld, nette Kollegen.“",
            },
            {
              q: "Herr Aydın hätte bei der Bank weiterarbeiten können.",
              au: 0,
              a: 0,
              why: "Man hat ihm angeboten, in eine Filiale nach Dortmund zu wechseln.",
            },
            {
              q: "Die Idee, Erzieher zu werden, kam von seiner Frau.",
              au: 0,
              a: 1,
              why: "Eine Erzieherin hat es vorgeschlagen; seine Frau war „eher skeptisch“.",
            },
            {
              q: "Während der Ausbildung hat Herr Aydın kein Geld verdient.",
              au: 0,
              a: 1,
              why: "In der praxisintegrierten Ausbildung „bekommt [man] auch ein Gehalt“ – ungefähr die Hälfte von früher.",
            },
            {
              q: "Die Familie ist während der Ausbildung nicht in den Urlaub geflogen.",
              au: 0,
              a: 0,
              why: "„Wir sind … drei Jahre lang nicht in den Urlaub geflogen“ – sie sind mit dem Auto an die Nordsee gefahren.",
            },
            {
              q: "Die meisten Mitschüler in der Ausbildung waren viel jünger als er.",
              au: 0,
              a: 0,
              why: "„Die meisten … waren so um die zwanzig, also halb so alt wie ich.“",
            },
            {
              q: "Viele Mütter waren gegen einen Mann in der Kita.",
              au: 0,
              a: 1,
              why: "Nur „zwei, drei Mütter“ waren skeptisch, die allermeisten Eltern reagieren positiv.",
            },
            {
              q: "Herr Aydın vermisst manchmal die Ruhe aus seinem alten Beruf.",
              au: 0,
              a: 0,
              why: "„Und manchmal die Ruhe. In einer Kita ist es laut …“",
            },
            {
              q: "Herr Aydın rät, schnell zu kündigen, wenn man unzufrieden ist.",
              au: 0,
              a: 1,
              why: "„Nicht einfach sofort kündigen, sondern erst mal ausprobieren.“",
            },
          ],
        },
        {
          title: "Hörverstehen Teil 3",
          skill: "hoeren",
          pts: 5,
          instr:
            "Sie hören fünf kurze Texte. Sie hören jeden Text zweimal. Lesen Sie zuerst die Aussage zu jedem Text. Entscheiden Sie beim Hören: Ist die Aussage richtig oder falsch?",
          plays: 2,
          opts: ["Richtig", "Falsch"],
          audio: [
            {
              h: "Text 1 – Am Bahnhof",
              lines: [
                {
                  s: "n",
                  t: "Achtung an Gleis sieben. Der ICE fünfhundertachtundsiebzig nach Hamburg-Altona, planmäßige Abfahrt vierzehn Uhr zwölf, fährt heute ausnahmsweise von Gleis neun. Ich wiederhole: Der ICE fünfhundertachtundsiebzig nach Hamburg-Altona fährt heute von Gleis neun. Bitte beachten Sie außerdem die geänderte Wagenreihung. Die Wagen der ersten Klasse halten im Abschnitt A.",
                },
              ],
            },
            {
              h: "Text 2 – Telefonansage",
              lines: [
                {
                  s: "n",
                  t: "Guten Tag, Sie sind verbunden mit der Hausarztpraxis Doktor Lehmann. Unsere Praxis ist vom dreizehnten bis zum vierundzwanzigsten Oktober wegen Urlaub geschlossen. In dringenden Fällen wenden Sie sich bitte an unsere Vertretung, Frau Doktor Simon, in der Bahnhofstraße zwölf. Die Telefonnummer ist null fünf sieben eins, achtunddreißig, neunundzwanzig, vierzig. Ich wiederhole: null fünf sieben eins, achtunddreißig, neunundzwanzig, vierzig. Ab dem sechsundzwanzigsten Oktober sind wir wieder für Sie da. Auf Wiederhören.",
                },
              ],
            },
            {
              h: "Text 3 – Im Kaufhaus",
              lines: [
                {
                  s: "n",
                  t: "Liebe Kundinnen und Kunden, haben Sie heute schon aus dem Fenster geschaut? Passend zum Wetter gibt es in unserer Abteilung im Erdgeschoss alle Regenschirme und Regenjacken dreißig Prozent günstiger. Aber Achtung: Das Angebot gilt nur heute, bis Ladenschluss um zwanzig Uhr. Wir wünschen Ihnen einen schönen Einkauf!",
                },
              ],
            },
            {
              h: "Text 4 – Veranstaltungstipp im Radio",
              lines: [
                {
                  s: "m",
                  t: "Und hier noch ein Tipp fürs Wochenende: Am Samstag ist wieder großer Flohmarkt am Rheinufer, und zwar von acht bis sechzehn Uhr. Am Sonntag gibt's dann an derselben Stelle einen Kinderflohmarkt, da dürfen nur Kinder verkaufen. Und ganz wichtig: Wer am Samstag selbst einen Stand haben möchte, muss sich vorher anmelden, im Internet, bis Donnerstag, achtzehn Uhr. Am Samstag selbst geht das leider nicht mehr. Also, nicht verpassen!",
                },
              ],
            },
            {
              h: "Text 5 – Telefonansage",
              lines: [
                {
                  s: "n",
                  t: "Herzlich willkommen beim Bürgerbüro der Stadt Minden. Leider sind im Moment alle Plätze besetzt. Bitte beachten Sie: Termine für Ausweise, Reisepässe und Anmeldungen vergeben wir ausschließlich online, unter minden Bindestrich termin Punkt de. Telefonisch können wir leider keine Termine vereinbaren. Bei allgemeinen Fragen bleiben Sie bitte in der Leitung. Sie werden mit dem nächsten freien Platz verbunden.",
                },
              ],
            },
          ],
          items: [
            {
              q: "Der ICE nach Hamburg fährt heute von Gleis 7 ab.",
              au: 0,
              a: 1,
              why: "Er fährt „heute ausnahmsweise von Gleis neun“.",
            },
            {
              q: "In dringenden Fällen können Patienten während des Urlaubs zu Frau Dr. Simon gehen.",
              au: 1,
              a: 0,
              why: "„In dringenden Fällen wenden Sie sich bitte an unsere Vertretung, Frau Doktor Simon.“",
            },
            {
              q: "Das Angebot für Regenschirme gilt nur heute.",
              au: 2,
              a: 0,
              why: "„Das Angebot gilt nur heute, bis Ladenschluss um zwanzig Uhr.“",
            },
            {
              q: "Man kann sich noch am Samstag als Verkäufer für den Flohmarkt anmelden.",
              au: 3,
              a: 1,
              why: "Anmeldung nur „bis Donnerstag, achtzehn Uhr“; „Am Samstag selbst geht das leider nicht mehr.“",
            },
            {
              q: "Einen Termin im Bürgerbüro bekommt man nur über das Internet.",
              au: 4,
              a: 0,
              why: "„Termine … vergeben wir ausschließlich online … Telefonisch … keine Termine.“",
            },
          ],
        },
      ],
    },
    // ------------------------------------------------------------------ SCHREIBEN
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
            "Wählen Sie eine der beiden Aufgaben (A oder B). Schreiben Sie einen Brief bzw. eine E-Mail. Behandeln Sie darin alle vier Leitpunkte. Überlegen Sie sich eine passende Reihenfolge der Leitpunkte. Vergessen Sie nicht Anrede, Einleitung und Gruß. Schreiben Sie etwa 100 bis 150 Wörter.",
          options: [
            {
              h: "Aufgabe A: E-Mail an eine Freundin",
              situation:
                "Sie haben folgende E-Mail von Ihrer Freundin Clara bekommen:\n\n„Liebe/r …,\nstell dir vor: Tobias und ich heiraten! Die Hochzeit ist am Samstag, den 13. Juni, in Lübeck. Wir feiern mit ungefähr 60 Gästen in einem Restaurant direkt an der Trave. Es wäre so schön, wenn du dabei wärst! Bitte sag mir bis Ende April Bescheid.\nViele Grüße\nClara“",
              task: "Antworten Sie Clara. Sie können leider nicht zur Hochzeit kommen. Schreiben Sie etwas zu den folgenden Punkten:",
              points: [
                "Dank und Glückwunsch",
                "Grund, warum Sie nicht kommen können",
                "Vorschlag für ein Treffen zu einem anderen Termin",
                "Frage nach einem Geschenkwunsch",
              ],
              muster:
                "Liebe Clara,\nvielen Dank für deine E-Mail und die tolle Nachricht! Ich gratuliere euch beiden ganz herzlich. Ich freue mich so sehr für dich und Tobias.\nLeider muss ich dir aber sagen, dass ich am 13. Juni nicht kommen kann. An diesem Wochenende heiratet nämlich mein Bruder in Polen, und die Flüge sind schon lange gebucht. Das tut mir wirklich leid, denn ich wäre sehr gern dabei gewesen.\nWas hältst du davon, wenn wir uns nach eurer Hochzeit treffen? Ich könnte euch im Juli in Lübeck besuchen. Dann kannst du mir alle Fotos zeigen und alles erzählen. Oder ihr kommt im Sommer zu mir nach Kassel – mein Gästezimmer ist frei.\nIch möchte euch natürlich trotzdem etwas schenken. Habt ihr einen besonderen Wunsch? Braucht ihr etwas für die Wohnung, oder sammelt ihr vielleicht Geld für die Hochzeitsreise?\nIch wünsche euch einen wunderschönen Tag!\nLiebe Grüße\ndeine Anna",
            },
            {
              h: "Aufgabe B: Anfrage an ein Fitnessstudio",
              situation:
                "Sie haben in der Zeitung folgende Anzeige gelesen:\n\n„NEU in Gelsenkirchen: Fitnessstudio AktivPunkt\nModerne Geräte, Kurse von Yoga bis Rückentraining, Sauna.\nKostenloses Probetraining! Infos per E-Mail: info@aktivpunkt-ge.de“",
              task: "Sie interessieren sich für das Angebot. Schreiben Sie eine E-Mail an das Fitnessstudio. Schreiben Sie etwas zu den folgenden Punkten:",
              points: [
                "Grund für Ihr Schreiben",
                "Öffnungszeiten und Kurszeiten",
                "Preise und Ermäßigungen",
                "Termin für ein Probetraining",
              ],
              muster:
                "Sehr geehrte Damen und Herren,\nich habe Ihre Anzeige in der Zeitung gelesen und interessiere mich sehr für Ihr neues Fitnessstudio. Ich sitze bei der Arbeit den ganzen Tag am Schreibtisch und habe deshalb oft Rückenschmerzen. Darum möchte ich gern regelmäßig Sport machen.\nKönnten Sie mir bitte mitteilen, wann Ihr Studio geöffnet ist? Ich arbeite bis 17 Uhr und könnte nur abends oder am Wochenende trainieren. Mich interessiert besonders das Rückentraining. An welchen Tagen und um wie viel Uhr finden diese Kurse statt?\nAußerdem würde ich gern wissen, wie viel eine Mitgliedschaft im Monat kostet. Gibt es auch Ermäßigungen, zum Beispiel für Paare? Mein Mann möchte vielleicht auch mitmachen.\nGern würde ich zuerst ein kostenloses Probetraining machen. Wäre das am nächsten Samstagvormittag möglich?\nIch freue mich auf Ihre Antwort.\nMit freundlichen Grüßen\nOlena Kovalenko",
            },
          ],
          minWords: 100,
          check: [
            "Alle vier Leitpunkte sind bearbeitet (je mindestens 1–2 Sätze).",
            "Passende Anrede und Gruß (Liebe … / Sehr geehrte Damen und Herren …; Liebe Grüße / Mit freundlichen Grüßen).",
            "Einleitung: Bezug auf die E-Mail bzw. die Anzeige.",
            "Du/Sie ist im ganzen Text einheitlich (Freundin: du – Firma: Sie).",
            "Sätze sind mit Konnektoren verbunden (denn, deshalb, aber, außerdem, weil …).",
            "Mindestens 100 Wörter, ungefähr 130–150 sind ideal.",
            "Verb an Position 2 im Hauptsatz und am Ende im Nebensatz.",
            "Schlusssatz vorhanden (Ich freue mich auf Ihre Antwort / Schreib mir bald).",
          ],
        },
      ],
    },
    // ------------------------------------------------------------------ SPRECHEN
    {
      id: "sprechen",
      title: "Mündliche Prüfung",
      minutes: 15,
      prepMinutes: 20,
      note: "Die mündliche Prüfung ist eine Paarprüfung. Du hast vorher 20 Minuten Zeit, um dich auf Teil 2 und Teil 3 vorzubereiten. Die Rolle der Partnerin übernimmt hier die Simulation.",
      parts: [
        {
          kind: "speak",
          title: "Teil 1: Kontaktaufnahme",
          skill: "muendlich",
          pts: 15,
          minutes: 3,
          instr:
            "Unterhalten Sie sich mit Ihrer Partnerin / Ihrem Partner. Stellen Sie sich gegenseitig vor und stellen Sie Fragen. Antworten Sie in ganzen Sätzen und fragen Sie auch zurück.",
          task: "Sprechen Sie zum Beispiel über:\n– Name\n– Herkunft\n– Wohnort / Wohnung\n– Familie\n– Arbeit / Beruf / Ausbildung\n– Sprachen\n– Freizeit / Hobbys",
          prompts: [
            "Hallo, ich bin Maria. Und wie heißen Sie?",
            "Freut mich! Und woher kommen Sie?",
            "Wie lange wohnen Sie denn schon in Deutschland? Und wo genau wohnen Sie?",
            "Und, wie gefällt Ihnen Ihre Stadt?",
            "Haben Sie Familie hier?",
            "Was machen Sie beruflich?",
            "Welche Sprachen sprechen Sie denn alles?",
            "Und was machen Sie gern in Ihrer Freizeit?",
          ],
          redemittel: [
            "Ich heiße … / Mein Name ist …",
            "Ich komme aus … und lebe seit … in …",
            "Ich wohne mit meiner Familie in einer Dreizimmerwohnung in …",
            "Ich arbeite als … / Ich mache gerade eine Ausbildung als …",
            "Ich spreche …, … und natürlich ein bisschen Deutsch.",
            "In meiner Freizeit … gern …",
            "Und Sie? / Wie ist das bei Ihnen?",
          ],
          muster:
            "A: Hallo, ich heiße Maria. Wie heißen Sie denn?\nB: Guten Tag, mein Name ist Ahmad Rahimi. Rahimi ist mein Familienname.\nA: Woher kommen Sie, Herr Rahimi?\nB: Ich komme aus Afghanistan, aus Herat. Ich lebe seit fünf Jahren in Deutschland. Und Sie?\nA: Ich komme aus Spanien, aus Valencia.\nB: Oh, schön! Ich wohne in Hagen, zusammen mit meiner Frau und meinen zwei Söhnen. Wir haben eine Dreizimmerwohnung in der Nähe vom Bahnhof.\nA: Und wie gefällt Ihnen Hagen?\nB: Ganz gut. Die Stadt ist nicht so groß, aber es gibt viel Natur und Wälder. Nur im Winter regnet es mir zu oft.\nA: Was machen Sie beruflich?\nB: Im Moment arbeite ich in einem Lager als Gabelstaplerfahrer. Aber ich möchte gern eine Ausbildung als Elektriker machen, deshalb brauche ich das B1-Zertifikat. Arbeiten Sie auch?\nA: Ja, ich bin Krankenschwester. Welche Sprachen sprechen Sie?\nB: Ich spreche Dari, Paschtu, ein bisschen Englisch und natürlich Deutsch.\nA: Und was machen Sie in Ihrer Freizeit?\nB: Am Wochenende spiele ich Fußball in einem Verein. Und ich koche sehr gern, besonders afghanische Gerichte für Freunde. Was machen Sie gern?",
          check: [
            "Ganze Sätze statt einzelner Wörter.",
            "Zu jedem Thema 2–3 Sätze mit Details (seit wann, wo, warum).",
            "Auch Gegenfragen gestellt („Und Sie?“).",
            "Verb an Position 2, richtige Perfektformen (Ich bin … gekommen / Ich habe … gearbeitet).",
            "Natürlich reagiert (Oh, schön! / Interessant!).",
          ],
        },
        {
          kind: "speak",
          title: "Teil 2: Gespräch über ein Thema",
          skill: "muendlich",
          pts: 30,
          minutes: 6,
          instr:
            "Sie haben einen kurzen Text gelesen. Ihre Partnerin / Ihr Partner hat einen anderen Text zum gleichen Thema. Berichten Sie kurz, worum es in Ihrem Text geht. Erzählen Sie dann von Ihren eigenen Erfahrungen und sagen Sie Ihre Meinung. Reagieren Sie auch auf die Fragen Ihrer Partnerin / Ihres Partners.",
          task: "Thema: Lebensmittel online einkaufen\n1. Worum geht es in Ihrem Text? (die wichtigsten Informationen)\n2. Wie ist das bei Ihnen? Kaufen Sie Lebensmittel online? Wie ist das in Ihrem Heimatland?\n3. Was ist Ihre Meinung: Vorteile und Nachteile?",
          material: [
            {
              h: "Immer mehr Menschen kaufen Lebensmittel online",
              t: "Milch, Gemüse und Brot per Mausklick: Immer mehr Menschen in Deutschland bestellen ihre Lebensmittel im Internet. Nach einer Umfrage hat schon fast jeder Dritte mindestens einmal Lebensmittel online gekauft. Vor fünf Jahren war es nur etwa jeder Zehnte. Besonders beliebt ist der Online-Einkauf bei Familien mit kleinen Kindern und bei Berufstätigen in großen Städten. Sie sagen, dass sie viel Zeit sparen und keine schweren Taschen tragen müssen. Kritiker meinen dagegen, dass die vielen Lieferwagen schlecht für die Umwelt sind und kleine Geschäfte in den Stadtteilen schließen müssen. Viele Kunden ärgern sich außerdem, wenn das Obst nicht frisch ist oder die Lieferung zu spät kommt. Auf dem Land gibt es den Service oft noch gar nicht.",
            },
          ],
          prompts: [
            "So, worum geht's denn in Ihrem Text?",
            "Ah, interessant. Und warum bestellen die Leute online? Was steht dazu im Text?",
            "Haben Sie selbst schon mal Lebensmittel im Internet bestellt?",
            "Und wie ist das in Ihrem Heimatland? Kaufen die Leute dort auch online ein?",
            "Also, ich finde das eigentlich ganz praktisch. Was meinen Sie?",
            "Hm, aber ist das nicht schlecht für die kleinen Geschäfte?",
            "Würden Sie denn auch Obst und Gemüse online kaufen?",
          ],
          redemittel: [
            "In meinem Text geht es um … / Der Text berichtet über …",
            "Laut einer Umfrage … / Im Text steht, dass …",
            "Bei mir ist das so: … / Ich habe einmal … bestellt.",
            "In meinem Heimatland ist das anders / ähnlich: …",
            "Meiner Meinung nach … / Ich finde, dass …",
            "Ein Vorteil ist … – ein Nachteil ist …",
            "Da haben Sie recht, aber … / Das sehe ich ein bisschen anders.",
          ],
          muster:
            "A: Worum geht es denn in Ihrem Text?\nB: In meinem Text geht es darum, dass immer mehr Menschen in Deutschland Lebensmittel im Internet kaufen. Laut einer Umfrage hat fast jeder Dritte das schon einmal gemacht. Vor fünf Jahren war es nur jeder Zehnte.\nA: Interessant. Und warum bestellen die Leute online?\nB: Im Text steht, dass vor allem Familien mit kleinen Kindern und Berufstätige in großen Städten online einkaufen. Sie sparen Zeit und müssen keine schweren Taschen tragen. Es gibt aber auch Kritik: Die vielen Lieferwagen sind schlecht für die Umwelt, und kleine Geschäfte müssen schließen. Manche Kunden ärgern sich auch, wenn das Obst nicht frisch ist.\nA: Haben Sie selbst schon einmal Lebensmittel im Internet bestellt?\nB: Ja, einmal, als mein Sohn krank war und ich nicht aus dem Haus gehen konnte. Das war praktisch. Aber normalerweise gehe ich lieber selbst in den Supermarkt. Ich möchte das Gemüse sehen und anfassen, bevor ich es kaufe.\nA: Und wie ist das in Ihrem Heimatland?\nB: In der Türkei, besonders in Istanbul, bestellen sehr viele Leute online. Dort bringen auch die kleinen Läden die Sachen nach Hause, oft in zwanzig Minuten. Auf dem Land kauft man aber eher auf dem Markt.\nA: Ich finde das eigentlich praktisch. Was meinen Sie?\nB: Für ältere oder kranke Menschen ist es auf jeden Fall eine gute Sache. Ich finde aber, dass man nicht alles online kaufen sollte. Wenn alle bestellen, gibt es bald keine Bäckerei und keinen Gemüseladen mehr in unserem Stadtteil, und das fände ich schade.\nA: Würden Sie Obst und Gemüse online kaufen?\nB: Eher nicht. Getränke oder Waschmittel ja, denn die sind schwer. Aber frische Sachen kaufe ich lieber selbst.",
          check: [
            "Den Inhalt des Textes mit eigenen Worten zusammengefasst (nicht vorgelesen).",
            "Wichtige Zahlen bzw. Informationen genannt.",
            "Eigene Erfahrungen und die Situation im Heimatland erzählt.",
            "Klare Meinung mit Begründung (weil, denn, deshalb).",
            "Auf die Fragen und Aussagen der Partnerin reagiert.",
            "Vorteile und Nachteile genannt.",
          ],
        },
        {
          kind: "speak",
          title: "Teil 3: Gemeinsam etwas planen",
          skill: "muendlich",
          pts: 30,
          minutes: 6,
          instr:
            "Ihre Kursleiterin, Frau Brenner, geht nach vielen Jahren in Rente. Sie möchten mit Ihrer Partnerin / Ihrem Partner im Namen des Kurses eine kleine Abschiedsfeier organisieren. Planen Sie gemeinsam. Machen Sie Vorschläge, reagieren Sie auf die Vorschläge Ihrer Partnerin / Ihres Partners und einigen Sie sich am Ende.",
          task: "Abschiedsfeier für die Kursleiterin planen\n– Wann? (Tag, Uhrzeit)\n– Wo? (Kursraum, Café, Park …)\n– Essen und Getränke?\n– Geschenk?\n– Wer macht was?",
          prompts: [
            "Also, wann wollen wir die Feier machen? Ich dachte an den letzten Kurstag, direkt nach dem Unterricht.",
            "Okay. Und wo feiern wir? Im Kursraum ist es ein bisschen langweilig, oder?",
            "Hm, ein Café ist aber ziemlich teuer. Wir sind ja sechzehn Leute.",
            "Und was machen wir mit dem Essen? Soll jeder etwas mitbringen?",
            "Und das Geschenk? Ich würde ihr gern Blumen schenken.",
            "Wie viel Geld sammeln wir denn pro Person ein?",
            "Gut. Und wer kümmert sich um was? Ich kann das Geld einsammeln.",
          ],
          redemittel: [
            "Wie wäre es, wenn wir …? / Ich schlage vor, dass …",
            "Was hältst du / halten Sie davon, wenn …?",
            "Das ist eine gute Idee! / Einverstanden.",
            "Das finde ich nicht so gut, weil … / Ich habe eine andere Idee: …",
            "Dann machen wir es so: …",
            "Ich kümmere mich um … / Kannst du … übernehmen?",
            "Also, zusammengefasst: …",
          ],
          muster:
            "A: Also, wann wollen wir die Feier machen? Ich dachte an den letzten Kurstag, nach dem Unterricht.\nB: Das ist eine gute Idee. Am letzten Kurstag sind alle da. Der Unterricht endet um 12 Uhr, dann könnten wir um halb eins anfangen.\nA: Hm, und wo feiern wir? Im Kursraum ist es ein bisschen langweilig, oder?\nB: Wie wäre es mit dem Café Ruhrblick? Das ist direkt neben der Schule.\nA: Ein Café ist aber teuer. Wir sind ja 16 Leute.\nB: Da hast du recht. Was hältst du davon, wenn wir im Kursraum feiern, aber den Raum schön dekorieren? Mit Luftballons und Blumen sieht er ganz anders aus.\nA: Gut, einverstanden. Was machen wir mit dem Essen? Soll jeder etwas mitbringen?\nB: Ja, ich finde, jeder bringt etwas aus seinem Heimatland mit. Das passt doch gut zu einem Deutschkurs. Ich backe zum Beispiel einen ukrainischen Kuchen. Und Getränke kaufen wir zusammen.\nA: Super. Und das Geschenk? Ich würde ihr gern Blumen schenken.\nB: Blumen sind schön, aber sie halten nicht lange. Ich habe eine andere Idee: Wir schenken ihr ein Fotobuch mit Fotos aus dem Kurs, und jeder schreibt ein paar Sätze auf Deutsch hinein. Dazu kann es ja trotzdem einen kleinen Blumenstrauß geben.\nA: Das gefällt mir! Wie viel Geld sammeln wir pro Person ein?\nB: Vielleicht fünf Euro. Dann haben wir 80 Euro für das Fotobuch, die Blumen und die Getränke.\nA: Gut. Wer kümmert sich um was? Ich kann das Geld einsammeln.\nB: Prima. Dann sammle ich die Fotos und bestelle das Fotobuch. Und die Getränke kaufen wir am Tag vorher zusammen.\nA: Also, zusammengefasst: Wir feiern am letzten Kurstag um halb eins im Kursraum, jeder bringt etwas zu essen mit, und wir schenken ein Fotobuch und Blumen.\nB: Genau. Frau Brenner wird sich bestimmt freuen!",
          check: [
            "Zu allen Punkten der Aufgabenkarte gesprochen.",
            "Eigene Vorschläge gemacht (Wie wäre es …? Ich schlage vor …).",
            "Auf die Vorschläge der Partnerin reagiert – zugestimmt oder begründet widersprochen.",
            "Alternativen angeboten, wenn man nicht einverstanden ist.",
            "Aufgaben verteilt (Wer macht was?).",
            "Am Ende das Ergebnis zusammengefasst.",
          ],
        },
      ],
    },
  ],
  // ==================================================================== VORBEREITUNG
  prep: {
    lead: "Das Zertifikat telc Deutsch B1 zeigt, dass du dich im Alltag und bei der Arbeit selbstständig auf Deutsch verständigen kannst. Die Prüfung hat einen schriftlichen Teil (Lesen, Sprachbausteine, Hören, Schreiben) und eine mündliche Paarprüfung. Viele brauchen das Zertifikat für Ausbildung, Beruf oder die Einbürgerung.",
    facts: [
      [
        "Dauer",
        "ca. 2,5 Stunden schriftlich (90 Min. Lesen + Sprachbausteine, ca. 30 Min. Hören, 30 Min. Schreiben) plus ca. 15 Min. mündliche Paarprüfung mit 20 Min. Vorbereitung",
      ],
      [
        "Punkte",
        "300 Punkte: 225 schriftlich (Lesen 75, Sprachbausteine 30, Hören 75, Schreiben 45) und 75 mündlich",
      ],
      [
        "Bestehen",
        "Mindestens 60 % in der schriftlichen Prüfung (135 von 225 Punkten) UND mindestens 60 % in der mündlichen Prüfung (45 von 75 Punkten).",
      ],
      [
        "Teilbestehen",
        "Wer nur den schriftlichen oder nur den mündlichen Teil besteht, kann den anderen Teil einzeln wiederholen – bis zum Ende des folgenden Kalenderjahres. Frag im Zweifel bei deinem Prüfungszentrum nach.",
      ],
      [
        "Ergebnis",
        "Zertifikat mit Punkten und Note (sehr gut, gut, befriedigend, ausreichend); es ist unbegrenzt gültig.",
      ],
      [
        "Wer braucht sie?",
        "Zum Beispiel für eine Ausbildung oder ein Studium, für den Beruf (Bewerbung, Anerkennung) und für die Einbürgerung – dafür ist Deutsch auf B1-Niveau nötig.",
      ],
    ],
    parts: [
      {
        name: "Leseverstehen Teil 1",
        skill: "Lesen",
        time: "ca. 15 Min.",
        what: "Du liest fünf kurze Zeitungsmeldungen und zehn Überschriften. Du suchst für jeden Text die passende Überschrift – fünf Überschriften bleiben übrig.",
        steps: [
          "Lies zuerst alle zehn Überschriften und markiere das Schlüsselwort (z. B. „sonntags“, „abgesagt“, „Preise“).",
          "Lies jeden Text einmal schnell: Was ist die Hauptinformation? Fass sie in 3–4 Wörtern zusammen.",
          "Vergleiche deine Zusammenfassung mit den Überschriften – nicht einzelne Wörter.",
          "Fang mit dem leichtesten Text an und streiche benutzte Überschriften durch.",
        ],
        traps: [
          "Zu einem Text passen meist zwei Überschriften zum gleichen Thema – nur eine trifft die Hauptaussage.",
          "Ein Wort aus der Überschrift steht im Text, aber mit „nicht“ oder „nur wenige“ (z. B. Preise werden NICHT erhöht).",
          "Eine Überschrift passt nur zu einem Detail, nicht zum ganzen Text.",
        ],
        tip: "Frag dich bei jeder Überschrift: Würde ein Journalist genau diesen Text so nennen? Wenn nur ein Satz passt, ist es die falsche Überschrift.",
        mini: {
          instr:
            "Welche Überschrift (a–d) passt zu welchem Text? Zwei Überschriften bleiben übrig.",
          opts: [
            "a) Bürger helfen der Stadt beim Gießen",
            "b) Stadt muss alte Bäume fällen",
            "c) Neuer Park im Zentrum eröffnet",
            "d) Hitze: Freibäder länger geöffnet",
          ],
          material: [
            {
              h: "Text 1",
              t: "Die Stadt Ulm hat in diesem Frühjahr 500 junge Bäume gepflanzt. Weil der Sommer sehr trocken war, bittet sie jetzt die Anwohner um Hilfe: Wer einen Baum vor seinem Haus regelmäßig mit Wasser versorgt, bekommt eine kleine Urkunde. Schon über 200 Menschen machen mit.",
            },
            {
              h: "Text 2",
              t: "Wegen der hohen Temperaturen öffnen die drei städtischen Freibäder in Augsburg ab Montag schon um 7 Uhr und schließen erst um 21 Uhr. Die neuen Zeiten gelten bis Ende August. Die Eintrittspreise bleiben gleich.",
            },
          ],
          items: [
            {
              q: "Text 1",
              a: 0,
              why: "Anwohner gießen die neuen Bäume – es werden keine Bäume gefällt.",
            },
            {
              q: "Text 2",
              a: 3,
              why: "Wegen der Hitze haben die Freibäder länger geöffnet.",
            },
          ],
        },
      },
      {
        name: "Leseverstehen Teil 2",
        skill: "Lesen",
        time: "ca. 20 Min.",
        what: "Du liest einen längeren Zeitungsartikel (ca. 350–400 Wörter) und beantwortest fünf Multiple-Choice-Aufgaben mit a, b oder c. Die Aufgaben folgen meistens der Reihenfolge im Text.",
        steps: [
          "Lies zuerst den Titel und die fünf Aufgaben – so weißt du, worauf du achten musst.",
          "Lies den Text abschnittsweise. Such die Stelle zu Aufgabe 1, dann zu Aufgabe 2 usw.",
          "Lies die passende Stelle genau und prüfe alle drei Lösungen.",
          "Streiche Lösungen, die der Text klar widerlegt.",
        ],
        traps: [
          "Falsche Lösungen benutzen oft dieselben Wörter wie der Text, sagen aber etwas anderes.",
          "Zeitangaben: „am Anfang“ und „heute“ werden verwechselt.",
          "Eine Lösung ist allgemein richtig, steht aber nicht im Text.",
        ],
        tip: "Achte auf kleine Wörter wie „nur“, „noch nicht“, „schon“, „früher“. Genau dort verstecken sich die meisten Fallen.",
        mini: {
          instr: "Lesen Sie den Text. Welche Lösung (a, b oder c) ist richtig?",
          material: [
            {
              h: "Ein Laden ohne Verpackung",
              t: "Seit einem Jahr gibt es in Erfurt einen Supermarkt ohne Plastik. Die Kunden bringen eigene Gläser und Dosen mit und füllen Nudeln, Reis oder Nüsse selbst ab. Wer nichts dabeihat, kann Gläser im Laden kaufen. Die Gründerin Lea Wendt war früher Lehrerin. „Am Anfang kamen fast nur Studenten“, erzählt sie. „Inzwischen kaufen hier auch viele Familien und Rentner ein.“",
            },
          ],
          items: [
            {
              q: "Kunden ohne eigene Gläser …",
              opts: [
                "a) dürfen nicht einkaufen.",
                "b) können im Laden Gläser kaufen.",
                "c) bekommen Plastiktüten.",
              ],
              a: 1,
              why: "„Wer nichts dabeihat, kann Gläser im Laden kaufen.“",
            },
            {
              q: "Heute kaufen in dem Laden …",
              opts: [
                "a) fast nur Studenten ein.",
                "b) vor allem Lehrer ein.",
                "c) ganz verschiedene Menschen ein.",
              ],
              a: 2,
              why: "Nur „am Anfang“ kamen fast nur Studenten, inzwischen auch Familien und Rentner.",
            },
          ],
        },
      },
      {
        name: "Leseverstehen Teil 3",
        skill: "Lesen",
        time: "ca. 20 Min.",
        what: "Du liest zehn Situationen und zwölf Anzeigen. Du suchst für jede Situation eine passende Anzeige. Für ein bis zwei Situationen passt keine Anzeige – dann wählst du x.",
        steps: [
          "Markiere in jeder Situation die wichtigen Bedingungen: Wer? (Alter), Was?, Wann?, Wie viel?",
          "Lies die Anzeigen quer: Welches Thema hat jede Anzeige? Notiere ein Stichwort daneben.",
          "Ordne zu und prüfe ALLE Bedingungen der Situation – nicht nur das Thema.",
          "Jede Anzeige gibt es nur einmal: Streiche benutzte Anzeigen durch.",
        ],
        traps: [
          "Thema passt, aber ein Detail nicht: Alter („ab 8 Jahren“), Uhrzeit („nur vormittags“), Ort oder Zielgruppe.",
          "Zwei Anzeigen zum gleichen Thema (z. B. zwei Sportangebote) – nur eine erfüllt alle Bedingungen.",
          "Man vergisst die Möglichkeit x und zwingt eine Anzeige in die Situation.",
        ],
        tip: "Wenn du bei einer Situation lange suchst und es immer „fast“ passt, ist x oft die richtige Lösung. In der Prüfung gibt es meistens eine oder zwei solche Situationen.",
        mini: {
          instr:
            "Welche Anzeige (a–d) passt? Wenn keine Anzeige passt, wählen Sie x.",
          opts: [
            "a) Tennisclub Grün-Weiß",
            "b) Malkurs Farbenfroh",
            "c) Fahrschule Tempo",
            "d) Gitarre für Erwachsene",
            "x) keine passende Anzeige",
          ],
          material: [
            {
              h: "a",
              t: "Tennisclub Grün-Weiß: Schnupperkurse für Kinder von 6 bis 12 Jahren, samstags 10 Uhr. Schläger werden gestellt.",
            },
            {
              h: "b",
              t: "Malkurs Farbenfroh: Aquarell für Anfänger, montags 18:30 Uhr, Volkshochschule. Material bitte selbst mitbringen.",
            },
            {
              h: "c",
              t: "Fahrschule Tempo: Intensivkurse in den Ferien – in zwei Wochen zum Führerschein Klasse B.",
            },
            {
              h: "d",
              t: "Gitarre für Erwachsene: Lieder begleiten in 10 Abenden, dienstags 19 Uhr. Für Anfänger ohne Notenkenntnisse.",
            },
          ],
          items: [
            {
              q: "Ihr Kollege möchte nach der Arbeit malen lernen.",
              a: 1,
              why: "Malkurs für Anfänger am Montagabend (b).",
            },
            {
              q: "Ihre Schwester (35) möchte Tennis spielen lernen.",
              a: 4,
              why: "Der Tennisclub bietet nur Kurse für Kinder von 6 bis 12 an – keine Anzeige passt.",
            },
            {
              q: "Ihr Sohn (18) möchte in den Sommerferien schnell den Autoführerschein machen.",
              a: 2,
              why: "Intensivkurs in den Ferien für Klasse B (c).",
            },
          ],
        },
      },
      {
        name: "Sprachbausteine Teil 1",
        skill: "Sprachbausteine",
        time: "ca. 15 Min.",
        what: "Du liest einen Brief mit zehn Lücken. Für jede Lücke gibt es drei Möglichkeiten (a, b, c). Hier wird vor allem Grammatik geprüft.",
        steps: [
          "Lies den ganzen Satz, nicht nur das Wort vor der Lücke.",
          "Frag dich: Was für ein Wort fehlt? Präposition, Artikel/Endung, Relativpronomen, Konnektor, Verbform?",
          "Prüfe Kasus (Akk./Dat.), Genus und Position des Verbs nach dem Konnektor.",
          "Setz deine Lösung ein und lies den Satz noch einmal leise.",
        ],
        traps: [
          "weil / denn / deshalb: Achte auf die Position des Verbs danach.",
          "wenn / als / wann: „als“ nur für eine einmalige Situation in der Vergangenheit.",
          "Verben mit festen Präpositionen: sich freuen über / auf, warten auf, denken an.",
          "Relativpronomen nach Präposition: mit denen, bei dem, für die.",
        ],
        tip: "Lerne Verben immer mit Präposition und Kasus (sich interessieren für + Akk.). Das bringt in diesem Teil die meisten Punkte.",
        mini: {
          instr: "Welches Wort (a, b oder c) passt in die Lücke?",
          material: [
            {
              h: "Kurze Nachricht",
              t: "Hallo Ben, ich warte schon seit einer Stunde {1} dich! Hast du vergessen, {2} wir heute ins Kino gehen wollten? Der Film, {3} ich ausgesucht habe, beginnt um acht. Ruf mich bitte an!",
            },
          ],
          items: [
            {
              q: "",
              opts: ["a) für", "b) auf", "c) an"],
              a: 1,
              why: "warten auf + Akkusativ.",
            },
            {
              q: "",
              opts: ["a) dass", "b) ob", "c) wenn"],
              a: 0,
              why: "vergessen, dass … – es ist eine Tatsache, keine offene Frage.",
            },
            {
              q: "",
              opts: ["a) der", "b) dem", "c) den"],
              a: 2,
              why: "der Film (maskulin), Akkusativ als Objekt von „ausgesucht“ → „den“.",
            },
          ],
        },
      },
      {
        name: "Sprachbausteine Teil 2",
        skill: "Sprachbausteine",
        time: "ca. 15 Min.",
        what: "Du liest einen Text, oft einen formellen Brief oder eine Mitteilung, mit zehn Lücken. Dazu gibt es 15 Wörter (a–o). Jedes Wort passt nur einmal, fünf bleiben übrig.",
        steps: [
          "Lies die 15 Wörter und sortiere sie grob: Präpositionen, Konnektoren, Pronomen, Adverbien.",
          "Lies den Text und überleg bei jeder Lücke, welche Wortart fehlt.",
          "Füll zuerst die sicheren Lücken aus und streiche die Wörter durch.",
          "Prüfe am Ende die übrigen Lücken mit den restlichen Wörtern.",
        ],
        traps: [
          "Ähnliche Wörter: ihm / ihn, dafür / damit, seit / seitdem.",
          "Konnektoren mit Verb am Ende (falls, obwohl) und mit Verb direkt danach (dadurch, deshalb) werden verwechselt.",
          "Ein Wort passt grammatisch, aber nicht zum Sinn (obwohl statt falls).",
        ],
        tip: "Nach einem Wort wie „dadurch“, „deshalb“, „trotzdem“ am Satzanfang kommt sofort das Verb. Nach „weil“, „falls“, „obwohl“ steht das Verb am Ende.",
        mini: {
          instr:
            "Welches Wort (a–e) passt in die Lücke? Zwei Wörter bleiben übrig.",
          opts: ["a) ihm", "b) deshalb", "c) seit", "d) ihn", "e) obwohl"],
          material: [
            {
              h: "Mitteilung",
              t: "Sehr geehrte Eltern,\nunser Hausmeister, Herr Bauer, ist {1} Montag krank. {2} bleibt die Turnhalle diese Woche geschlossen. Herr Kaya vertritt ihn. Bei Fragen können Sie {3} gern eine E-Mail schreiben.",
            },
          ],
          items: [
            {
              q: "",
              a: 2,
              why: "Zeitpunkt in der Vergangenheit bis jetzt: „seit Montag“.",
            },
            {
              q: "",
              a: 1,
              why: "Folge, Verb direkt danach: „Deshalb bleibt …“.",
            },
            {
              q: "",
              a: 0,
              why: "jemandem eine E-Mail schreiben → Dativ „ihm“ (= Herrn Kaya).",
            },
          ],
        },
      },
      {
        name: "Hörverstehen Teil 1",
        skill: "Hören",
        time: "ca. 5 Min.",
        what: "Du hörst fünf kurze Radiomeldungen (Nachrichten, Wetter, Verkehr). Du hörst jeden Text nur EINMAL und entscheidest, ob eine Aussage richtig oder falsch ist.",
        steps: [
          "Lies die Aussagen vor dem Hören und markiere die wichtigste Information (Ort, Zeit, Zahl, „nur“, „alle“).",
          "Konzentrier dich beim Hören auf diese eine Information.",
          "Entscheide sofort nach dem Text – es gibt keine zweite Chance.",
          "Wenn du unsicher bist: Kreuz trotzdem an und geh zum nächsten Text.",
        ],
        traps: [
          "Nur ein Teil der Aussage stimmt (Sonne – ja, aber nur im Süden).",
          "Zeitangaben: „ab heute“ statt „ab nächster Woche“.",
          "Wörter wie „nur“, „alle“, „ganz“ machen eine Aussage oft falsch.",
        ],
        tip: "Du hörst nur einmal – nicht in Panik geraten, wenn du ein Wort nicht verstehst. Meistens wird die wichtige Information mit anderen Worten noch einmal gesagt.",
        mini: {
          instr: "Sie hören zwei kurze Meldungen einmal. Richtig oder falsch?",
          plays: 1,
          opts: ["Richtig", "Falsch"],
          audio: [
            {
              h: "Meldung 1",
              lines: [
                {
                  s: "n",
                  t: "Das Hallenbad in Witten bleibt wegen Reparaturarbeiten bis Ende Februar geschlossen. Die Schwimmkurse für Kinder finden in dieser Zeit aber statt, und zwar im Hallenbad Herbede.",
                },
              ],
            },
            {
              h: "Meldung 2",
              lines: [
                {
                  s: "n",
                  t: "Am kommenden Sonntag haben die Geschäfte in der Hagener Innenstadt von dreizehn bis achtzehn Uhr geöffnet. Anlass ist das Herbstfest. Und: Parken ist an diesem Tag in allen städtischen Parkhäusern kostenlos.",
                },
              ],
            },
          ],
          items: [
            {
              q: "Die Schwimmkurse für Kinder fallen bis Ende Februar aus.",
              au: 0,
              a: 1,
              why: "Die Kurse fallen nicht aus, sie finden im Hallenbad Herbede statt.",
            },
            {
              q: "Am Sonntag kann man in den städtischen Parkhäusern kostenlos parken.",
              au: 1,
              a: 0,
              why: "„Parken ist an diesem Tag in allen städtischen Parkhäusern kostenlos.“",
            },
          ],
        },
      },
      {
        name: "Hörverstehen Teil 2",
        skill: "Hören",
        time: "ca. 15 Min.",
        what: "Du hörst ein längeres Radiogespräch oder Interview zweimal. Dazu gibt es zehn Aussagen: richtig oder falsch? Die Aussagen kommen in der Reihenfolge des Gesprächs.",
        steps: [
          "Nutze die Lesezeit: Lies alle zehn Aussagen und unterstreiche Schlüsselwörter.",
          "Beim ersten Hören: Kreuz an, was du sicher weißt, und folge dem Gespräch Aussage für Aussage.",
          "Beim zweiten Hören: Prüfe die unsicheren Aussagen.",
          "Achte darauf, WER etwas sagt oder meint (der Gast, seine Frau, andere Personen).",
        ],
        traps: [
          "Die Person nennt eine Möglichkeit, die sie dann NICHT gewählt hat („Ich hätte … können, aber …“).",
          "Eine Meinung wird einer anderen Person zugeordnet (die Frau statt die Kollegin).",
          "Mengenangaben: „viele“ in der Aussage, aber „zwei, drei“ im Gespräch.",
        ],
        tip: "Verlier nicht den Faden: Wenn du merkst, dass das Gespräch schon bei Aussage 5 ist, lass 4 erst einmal offen und hör beim zweiten Mal genau hin.",
        mini: {
          instr: "Sie hören ein kurzes Gespräch zweimal. Richtig oder falsch?",
          plays: 2,
          opts: ["Richtig", "Falsch"],
          audio: [
            {
              h: "Gespräch",
              lines: [
                {
                  s: "f",
                  t: "Frau Petrović, Sie haben vor zwei Jahren einen Gemeinschaftsgarten in Kassel gegründet. Wie viele Leute machen denn da inzwischen mit?",
                },
                {
                  s: "f2",
                  t: "Oh, inzwischen sind wir so um die dreißig. Am Anfang waren wir nur zu fünft, alles Nachbarn aus unserem Haus.",
                },
                { s: "f", t: "Mhm. Und was bauen Sie da an?" },
                {
                  s: "f2",
                  t: "Vor allem Tomaten, Zucchini und Kräuter. Kartoffeln haben wir auch mal probiert, aber dafür ist der Boden leider zu schlecht.",
                },
              ],
            },
          ],
          items: [
            {
              q: "Am Anfang haben fünf Nachbarn mitgemacht.",
              au: 0,
              a: 0,
              why: "„Am Anfang waren wir nur zu fünft, alles Nachbarn.“",
            },
            {
              q: "Im Garten wachsen gute Kartoffeln.",
              au: 0,
              a: 1,
              why: "Für Kartoffeln „ist der Boden leider zu schlecht“.",
            },
          ],
        },
      },
      {
        name: "Hörverstehen Teil 3",
        skill: "Hören",
        time: "ca. 10 Min.",
        what: "Du hörst fünf kurze Durchsagen und Ansagen, zum Beispiel am Bahnhof, im Kaufhaus, am Telefon oder im Radio. Du hörst jeden Text zweimal und entscheidest: richtig oder falsch?",
        steps: [
          "Lies die Aussage und überleg: Wo bin ich? Welche Information brauche ich (Gleis, Uhrzeit, Datum, Telefonnummer)?",
          "Beim ersten Hören die Information suchen, beim zweiten Hören kontrollieren.",
          "Achte auf Änderungen: „heute ausnahmsweise“, „statt“, „nicht mehr“.",
        ],
        traps: [
          "Die alte und die neue Information werden beide genannt (Gleis 7 → Gleis 9).",
          "Bedingungen: „nur bis Donnerstag“, „nur online“, „nur heute“.",
          "Zahlen klingen ähnlich: 13 / 30, 14 / 40.",
        ],
        tip: "Bei Durchsagen kommt die wichtige Information oft zweimal („Ich wiederhole …“). Notiere Zahlen sofort auf dem Aufgabenblatt.",
        mini: {
          instr: "Sie hören zwei Ansagen zweimal. Richtig oder falsch?",
          plays: 2,
          opts: ["Richtig", "Falsch"],
          audio: [
            {
              h: "Ansage 1",
              lines: [
                {
                  s: "n",
                  t: "Guten Tag, Sie sind verbunden mit dem Autohaus Reinhardt. Unsere Werkstatt ist heute wegen einer Betriebsfeier ab vierzehn Uhr geschlossen. Morgen früh sind wir ab halb acht wieder für Sie da. Vielen Dank für Ihren Anruf.",
                },
              ],
            },
            {
              h: "Ansage 2",
              lines: [
                {
                  s: "n",
                  t: "Sehr geehrte Fahrgäste, wegen eines Unfalls fährt die Straßenbahnlinie drei heute nur bis zum Hauptbahnhof. Bitte benutzen Sie ab dort die Busse der Linie einunddreißig. Wir bitten um Ihr Verständnis.",
                },
              ],
            },
          ],
          items: [
            {
              q: "Die Werkstatt ist heute den ganzen Tag geschlossen.",
              au: 0,
              a: 1,
              why: "Sie ist nur „ab vierzehn Uhr“ geschlossen.",
            },
            {
              q: "Ab dem Hauptbahnhof soll man den Bus nehmen.",
              au: 1,
              a: 0,
              why: "„Bitte benutzen Sie ab dort die Busse der Linie einunddreißig.“",
            },
          ],
        },
      },
      {
        name: "Schriftlicher Ausdruck",
        skill: "Schreiben",
        time: "30 Min.",
        what: "Du wählst eine von zwei Aufgaben und schreibst einen Brief oder eine E-Mail – persönlich an eine Freundin oder halbformell an eine Firma. Dabei bearbeitest du vier Leitpunkte.",
        steps: [
          "Wähl schnell (max. 2 Minuten) – die Aufgabe, zu der dir sofort Ideen kommen.",
          "Notiere zu jedem Leitpunkt zwei Stichwörter und leg eine sinnvolle Reihenfolge fest.",
          "Schreib: Anrede – Einleitung (Bezug) – vier Leitpunkte in eigenen Absätzen – Schluss – Gruß.",
          "Verbinde die Sätze mit Konnektoren (denn, deshalb, außerdem, aber, weil).",
          "Plane 5 Minuten am Ende ein, um Verbformen, Endungen und Du/Sie zu kontrollieren.",
        ],
        traps: [
          "Ein Leitpunkt wird vergessen – das kostet viele Punkte.",
          "Du und Sie werden gemischt, oder die Anrede passt nicht zum Gruß.",
          "Leitpunkte werden nur mit einem kurzen Satz bearbeitet.",
          "Zu viel Zeit für die Auswahl, zu wenig für die Kontrolle.",
        ],
        tip: "Als Prüfer achte ich zuerst darauf, ob alle vier Leitpunkte da sind. Ein einfacher, klarer Text mit allen Punkten ist besser als ein komplizierter Text, in dem einer fehlt.",
      },
      {
        name: "Sprechen Teil 1: Kontaktaufnahme",
        skill: "Sprechen",
        time: "ca. 3 Min.",
        what: "Du und deine Partnerin / dein Partner lernt euch kennen. Ihr stellt euch gegenseitig Fragen zu Herkunft, Wohnen, Arbeit, Familie, Sprachen und Hobbys.",
        steps: [
          "Bereite zu jedem Thema 2–3 Sätze über dich vor – mit Details (seit wann, warum, wie).",
          "Hör deiner Partnerin zu und stell Gegenfragen.",
          "Reagiere natürlich: „Oh, interessant! Und wie gefällt es Ihnen dort?“",
        ],
        traps: [
          "Nur Ein-Wort-Antworten („Syrien.“ – „Zwei.“).",
          "Man spricht nur über sich und fragt nicht zurück.",
          "Auswendig gelernte Monologe ohne Kontakt zur Partnerin.",
        ],
        tip: "Teil 1 ist das Aufwärmen. Sprich lieber einfach und flüssig – und zeig mit Rückfragen, dass du ein echtes Gespräch führst.",
      },
      {
        name: "Sprechen Teil 2: Gespräch über ein Thema",
        skill: "Sprechen",
        time: "ca. 6 Min.",
        what: "Jede Person hat einen kurzen Text zum gleichen Thema gelesen. Du berichtest kurz über deinen Text, erzählst von eigenen Erfahrungen, und ihr tauscht Meinungen aus.",
        steps: [
          "In der Vorbereitungszeit: 3–4 Stichwörter zum Inhalt notieren (Thema, Zahl, Gründe, Kritik).",
          "Den Inhalt mit eigenen Worten zusammenfassen – nicht vorlesen.",
          "Eigene Erfahrung und die Situation im Heimatland erzählen.",
          "Meinung mit Begründung sagen und auf die Partnerin reagieren.",
        ],
        traps: [
          "Ganze Sätze aus dem Text vorlesen.",
          "Nur den Text zusammenfassen und keine eigene Meinung sagen.",
          "Der Partnerin nicht zuhören und nicht auf ihren Text reagieren.",
        ],
        tip: "Stell deiner Partnerin am Ende eine Frage zu ihrem Text oder ihrer Meinung. So zeigst du, dass du ein Gespräch führen kannst – genau das wird bewertet.",
      },
      {
        name: "Sprechen Teil 3: Gemeinsam etwas planen",
        skill: "Sprechen",
        time: "ca. 6 Min.",
        what: "Du planst zusammen mit deiner Partnerin / deinem Partner etwas, zum Beispiel eine Feier oder einen Ausflug. Auf der Aufgabenkarte stehen Stichpunkte, über die ihr sprechen sollt.",
        steps: [
          "Geh die Stichpunkte der Reihe nach durch – keinen vergessen.",
          "Mach eigene Vorschläge und begründe sie.",
          "Reagiere auf die Vorschläge: zustimmen oder höflich widersprechen und eine Alternative nennen.",
          "Verteile Aufgaben und fasse am Ende das Ergebnis zusammen.",
        ],
        traps: [
          "Zu allem nur „Ja, gut.“ sagen – dann gibt es keine Diskussion.",
          "Eine Person redet die ganze Zeit, die andere kommt nicht zu Wort.",
          "Man vergisst, sich am Ende zu einigen.",
        ],
        tip: "Widersprich ruhig einmal – höflich und mit Begründung. Eine kleine Diskussion mit einer Einigung zeigt dein Sprachniveau viel besser als ständiges Zustimmen.",
      },
    ],
    redemittel: [
      {
        h: "Brief / E-Mail: Einleitung und Schluss",
        list: [
          "Vielen Dank für deine E-Mail. Ich habe mich sehr darüber gefreut.",
          "Entschuldige, dass ich erst jetzt antworte, aber …",
          "Ich habe Ihre Anzeige in der Zeitung gelesen und interessiere mich für …",
          "Ich schreibe Ihnen, weil …",
          "Ich freue mich auf deine Antwort. / Ich freue mich auf Ihre Antwort.",
          "Liebe Grüße / Viele Grüße – Mit freundlichen Grüßen",
        ],
      },
      {
        h: "Bitten und sich entschuldigen",
        list: [
          "Könnten Sie mir bitte mitteilen, …?",
          "Ich würde gern wissen, ob / wann / wie viel …",
          "Es wäre sehr nett, wenn du …",
          "Es tut mir wirklich leid, aber ich kann leider nicht kommen, weil …",
          "Leider muss ich unseren Termin absagen, denn …",
        ],
      },
      {
        h: "Vorschläge machen",
        list: [
          "Wie wäre es, wenn wir …?",
          "Was hältst du davon, wenn …?",
          "Ich schlage vor, dass wir …",
          "Wir könnten zum Beispiel …",
          "Hast du Lust, am Wochenende …?",
        ],
      },
      {
        h: "Meinung sagen",
        list: [
          "Meiner Meinung nach …",
          "Ich finde / denke / glaube, dass …",
          "Für mich ist es wichtig, dass …",
          "Ein Vorteil ist …, ein Nachteil ist …",
          "In meinem Heimatland ist das anders: …",
        ],
      },
      {
        h: "Zustimmen und widersprechen",
        list: [
          "Da hast du recht. / Das sehe ich genauso.",
          "Das ist eine gute Idee!",
          "Ich bin nicht ganz sicher, ob das eine gute Idee ist.",
          "Das finde ich nicht so gut, weil …",
          "Ja, aber … / Ich sehe das ein bisschen anders.",
        ],
      },
      {
        h: "Gemeinsam planen",
        list: [
          "Was machen wir mit …? / Wer kümmert sich um …?",
          "Ich kann … übernehmen. / Kannst du … machen?",
          "Dann machen wir es so: …",
          "Gut, dann sind wir uns einig.",
          "Also, zusammengefasst: …",
        ],
      },
    ],
    fehler: [
      [
        "Ich habe mich sehr auf deinen Brief gefreut.",
        "Ich habe mich sehr über deinen Brief gefreut.",
        "sich freuen über = etwas ist schon passiert; sich freuen auf = etwas kommt noch.",
      ],
      [
        "Ich kann nicht kommen, weil ich habe keine Zeit.",
        "Ich kann nicht kommen, weil ich keine Zeit habe.",
        "Nach „weil“, „dass“, „wenn“ steht das Verb am Ende.",
      ],
      [
        "Deshalb ich lerne jeden Tag Deutsch.",
        "Deshalb lerne ich jeden Tag Deutsch.",
        "Nach „deshalb“, „dann“, „trotzdem“ am Satzanfang kommt sofort das Verb (Position 2).",
      ],
      [
        "Als ich frei habe, fahre ich in die Berge.",
        "Wenn ich frei habe, fahre ich in die Berge.",
        "„als“ nur für einmalige Ereignisse in der Vergangenheit; Wiederholung → „wenn“.",
      ],
      ["Ich warte auf dir.", "Ich warte auf dich.", "warten auf + Akkusativ."],
      ["Ich helfe dich gern.", "Ich helfe dir gern.", "helfen + Dativ."],
      [
        "Ich wohne seit drei Jahre in Essen.",
        "Ich wohne seit drei Jahren in Essen.",
        "seit + Dativ, im Dativ Plural mit -n.",
      ],
      [
        "Ich bin in Deutschland seit 2019 gekommen.",
        "Ich bin 2019 nach Deutschland gekommen. / Ich lebe seit 2019 in Deutschland.",
        "„seit“ nur mit einem Zustand, der noch andauert, nicht mit einem einmaligen Ereignis.",
      ],
      [
        "Sehr geehrte Damen und Herren, … Liebe Grüße",
        "Sehr geehrte Damen und Herren, … Mit freundlichen Grüßen",
        "Formelle Anrede braucht einen formellen Gruß.",
      ],
      [
        "Ich habe Lust, dich besuchen.",
        "Ich habe Lust, dich zu besuchen.",
        "Nach „Lust haben“, „versuchen“, „vergessen“ steht der Infinitiv mit „zu“.",
      ],
    ],
    plan: [
      {
        w: "Woche 1",
        tasks: [
          "Eine komplette Simulation machen, um dein Niveau zu sehen – Punkte notieren.",
          "Prüfungsaufbau lernen: Welche Teile gibt es, wie viel Zeit, wie viele Punkte?",
          "Lesen Teil 1: jeden Tag zwei kurze Zeitungsmeldungen lesen und in einer Zeile zusammenfassen.",
          "Sprechen Teil 1: Vorstellung (Herkunft, Familie, Arbeit, Hobbys) laut üben und aufnehmen.",
          "Verben mit Präpositionen: jeden Tag 10 neue lernen (warten auf, sich freuen über …).",
        ],
      },
      {
        w: "Woche 2",
        tasks: [
          "Lesen Teil 2 und 3 mit Zeitvorgabe üben (je 20 Minuten).",
          "Sprachbausteine: Konnektoren (weil, denn, deshalb, obwohl, trotzdem) und Relativpronomen wiederholen.",
          "Hören: jeden Tag 10 Minuten Radionachrichten auf Deutsch hören und 3 Informationen notieren.",
          "Schreiben: eine persönliche E-Mail mit vier Leitpunkten schreiben und kontrollieren lassen.",
          "Redemittel für Briefe (Einleitung, Bitte, Entschuldigung, Schluss) auswendig lernen.",
        ],
      },
      {
        w: "Woche 3",
        tasks: [
          "Hören Teil 2: Interviews oder Podcasts hören und Richtig/Falsch-Aussagen üben.",
          "Schreiben: eine halbformelle E-Mail (Anfrage an eine Firma) in 30 Minuten schreiben.",
          "Sprechen Teil 2: einen kurzen Zeitungstext in 1 Minute mit eigenen Worten zusammenfassen und Meinung sagen.",
          "Sprechen Teil 3: mit einer Lernpartnerin eine Feier oder einen Ausflug planen.",
          "Typische Fehler aus deinen Texten sammeln und eine eigene Fehlerliste machen.",
        ],
      },
      {
        w: "Woche 4",
        tasks: [
          "Eine zweite komplette Simulation unter echten Bedingungen machen (ohne Pause, ohne Wörterbuch).",
          "Ergebnis mit Woche 1 vergleichen und die schwächsten Teile gezielt wiederholen.",
          "Zeitmanagement im Teil Lesen/Sprachbausteine trainieren (90 Minuten für alles).",
          "Mündliche Prüfung einmal komplett mit Partnerin durchspielen (Teil 1–3).",
          "Am Tag vor der Prüfung: nur noch Redemittel wiederholen, Ausweis bereitlegen, früh schlafen.",
        ],
      },
    ],
  },
};
