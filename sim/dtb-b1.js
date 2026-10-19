// DTB B1 – Deutsch-Test für den Beruf (telc im Auftrag des BAMF)
// Eigene Übungsaufgaben im Stil der Prüfung, keine offiziellen Aufgaben. Alle Firmen, Personen und Telefonnummern sind erfunden.
(window.SIM = window.SIM || {})["dtb-b1"] = {
  id: "dtb-b1",
  title: "DTB B1 – Deutsch-Test für den Beruf",
  short: "DTB B1",
  provider: "telc",
  level: "B1",
  intro:
    "Die Prüfung für alle, die im Berufssprachkurs B1 oder für die Arbeit nachweisen müssen, dass sie im Berufsalltag auf Deutsch zurechtkommen: Anzeigen, Anweisungen, Kunden-E-Mails, Telefonate und Gespräche mit Kollegen.",
  rule: "dtb",
  skills: {
    lesen: { label: "Lesen", max: 60 },
    hoeren: { label: "Hören", max: 60 },
    schreiben: { label: "Schreiben", max: 60 },
    sprechen: { label: "Sprechen", max: 60 },
  },
  sections: [
    // ───────────────────────────── LESEN ─────────────────────────────
    {
      id: "lesen",
      title: "Lesen",
      minutes: 40,
      note: "Vier Teile. Arbeiten Sie zügig – pro Teil ca. 10 Minuten.",
      parts: [
        {
          title: "Lesen Teil 1: Stellenanzeigen",
          skill: "lesen",
          pts: 3,
          instr:
            "Lesen Sie die Situationen 1–5 und die Anzeigen a–h. Welche Anzeige passt zu welcher Person? Jede Anzeige können Sie nur einmal verwenden. Für eine Person gibt es keine passende Anzeige. Markieren Sie dann x.",
          material: [
            {
              h: "a) Logistik Brandt GmbH, Hagen",
              t: "Wir suchen ab sofort Lagerhelfer/innen in Teilzeit (25 Std./Woche). Arbeitszeit: Frühschicht Mo–Fr 6:00–11:00 Uhr. Aufgaben: Ware kommissionieren, verpacken, etikettieren. Ein Staplerschein ist nicht nötig. Bewerbung bitte per E-Mail an personal@brandt-logistik-hagen.de.",
            },
            {
              h: "b) Kessler Logistikzentrum, Dortmund",
              t: "Fachkraft für Lagerlogistik oder Lagermitarbeiter/in mit Erfahrung (m/w/d) in Vollzeit gesucht. Gültiger Staplerschein erforderlich. Arbeit im Dreischichtsystem mit Schichtzulagen. Unbefristeter Vertrag nach der Probezeit. Tel. 0231 / 66 40 18 (Herr Albers).",
            },
            {
              h: "c) Seniorenzentrum Haus Lindenhof, Bochum",
              t: "Pflegehelfer/in in Teilzeit (20 Std./Woche) – auch ohne Ausbildung! Sie unterstützen unsere Pflegefachkräfte bei der Betreuung unserer Bewohnerinnen und Bewohner. Arbeit im Frühdienst, jedes zweite Wochenende. Den Pflegebasiskurs bezahlen wir. Pflegeerfahrung aus dem Heimatland ist ein Plus.",
            },
            {
              h: "d) Glanzwerk Gebäudeservice, Essen",
              t: "Reinigungskräfte für Büroreinigung gesucht – Minijob, Mo–Fr 17:30–20:00 Uhr. Keine Erfahrung nötig, wir arbeiten Sie ein. Gute Erreichbarkeit mit Bus und Bahn. Rufen Sie einfach an: 0201 / 38 72 05.",
            },
            {
              h: "e) Hotel Am Stadtpark, Essen",
              t: "Zimmermädchen/Roomboy (m/w/d) in Vollzeit. Arbeitszeit 7:00–15:30 Uhr, Wochenendarbeit nach Plan. Deutschkenntnisse B1. Für neue Mitarbeitende aus anderen Städten können wir für die ersten sechs Monate ein möbliertes Zimmer im Personalhaus anbieten.",
            },
            {
              h: "f) Bäckerei Kornfeld, Wuppertal",
              t: "Verkäufer/in in Teilzeit für unsere Filiale am Hauptbahnhof. Arbeitsbeginn 5:30 Uhr, auch samstags. Freundliches Auftreten und gute Deutschkenntnisse sind uns wichtig. Bewerbungen bitte direkt in der Filiale abgeben.",
            },
            {
              h: "g) FrischMarkt Supermarkt, Gelsenkirchen",
              t: "Kassierer/in in Teilzeit gesucht. Spätschicht 14:00–21:00 Uhr, auch samstags. Erfahrung an der Kasse wünschenswert, aber keine Bedingung. Kurze Bewerbung an: filiale.ge@frischmarkt-beispiel.de",
            },
            {
              h: "h) Spedition Hollmann & Söhne, Duisburg",
              t: "Bürokraft für den Empfang (m/w/d) in Vollzeit, Mo–Fr 8:00–16:30 Uhr. Sie nehmen Telefonate an, begrüßen Kunden und bearbeiten die Post. Sehr gute PC-Kenntnisse und Englisch erforderlich.",
            },
          ],
          opts: [
            "a) Logistik Brandt",
            "b) Kessler Logistikzentrum",
            "c) Haus Lindenhof",
            "d) Glanzwerk Gebäudeservice",
            "e) Hotel Am Stadtpark",
            "f) Bäckerei Kornfeld",
            "g) FrischMarkt",
            "h) Spedition Hollmann",
            "x) keine passende Anzeige",
          ],
          items: [
            {
              q: "1. Olena war in der Ukraine Krankenschwester. Bis ihr Abschluss anerkannt ist, möchte sie mit älteren Menschen arbeiten – wegen der Kinder nur halbtags. Am Wochenende kann ihr Mann auf die Kinder aufpassen.",
              a: 2,
              why: "Haus Lindenhof: Teilzeit, ohne Ausbildung, Pflegeerfahrung aus dem Heimatland ist ein Plus, Wochenenddienst ist für Olena kein Problem.",
            },
            {
              q: "2. Tarek hat seit drei Jahren einen Staplerschein und sucht eine feste Vollzeitstelle im Lager. Nachtschichten sind für ihn kein Problem.",
              a: 1,
              why: "Kessler: Vollzeit, Staplerschein erforderlich, Dreischichtsystem, unbefristet. Brandt (a) ist nur Teilzeit.",
            },
            {
              q: "3. Amina besucht von Montag bis Freitag bis 16 Uhr einen Integrationskurs. Sie möchte danach etwas dazuverdienen. Berufserfahrung hat sie noch nicht.",
              a: 3,
              why: "Glanzwerk: Minijob ab 17:30 Uhr, keine Erfahrung nötig. Der FrischMarkt (g) beginnt schon um 14 Uhr.",
            },
            {
              q: "4. Lucía möchte im Hotel arbeiten und zieht dafür aus Spanien ins Ruhrgebiet. Eine Wohnung hat sie dort noch nicht.",
              a: 4,
              why: "Hotel Am Stadtpark: bietet neuen Mitarbeitenden aus anderen Städten ein Zimmer im Personalhaus an.",
            },
            {
              q: "5. Herr Yılmaz hat gute PC-Kenntnisse und spricht Englisch. Er sucht eine Stelle im Büro, kann aber nur vormittags arbeiten, weil er nachmittags seine Mutter pflegt.",
              a: 8,
              why: "Die Bürostelle bei Hollmann (h) ist Vollzeit bis 16:30 Uhr – keine Anzeige passt, also x.",
            },
          ],
        },
        {
          title: "Lesen Teil 2: Informationen zu Weiterbildungen",
          skill: "lesen",
          pts: 3,
          instr:
            "Lesen Sie den Text und die Aufgaben 6–9. Welche Antwort (a, b oder c) passt am besten?",
          material: [
            {
              h: "Bildungszentrum Rhein-Ruhr – Weiterbildungen für Beschäftigte, Herbst/Winter 2026",
              t: "1. Staplerschein\nSie lernen, einen Gabelstapler sicher zu bedienen. Der Kurs dauert drei Tage: Theorie am Freitag, Praxis am Samstag und am Montag. Am Ende gibt es eine theoretische und eine praktische Prüfung. Nach bestandener Prüfung bekommen Sie Ihren Fahrausweis. Kosten: 390 Euro. Viele Firmen übernehmen die Kosten – fragen Sie in Ihrem Betrieb nach.\n\n2. Deutsch am Arbeitsplatz (B1–B2)\nZweimal pro Woche, dienstags und donnerstags von 18:00 bis 20:15 Uhr. Themen: telefonieren, E-Mails schreiben, Gespräche mit Kunden und Kollegen. Vor Kursbeginn machen alle Teilnehmenden einen kurzen Einstufungstest, damit Sie in die richtige Gruppe kommen. Der Kurs kann vom Jobcenter oder von der Agentur für Arbeit gefördert werden.\n\n3. Excel für Einsteiger\nDieser Kurs findet nur online statt. Sie lernen bequem von zu Hause aus am eigenen Computer. Vier Termine, jeweils mittwochs von 17:00 bis 19:00 Uhr. Sie brauchen einen Computer mit Kamera, Mikrofon und Internet.\n\n4. Erste Hilfe im Betrieb\nEin Tag (Samstag, 9:00–16:30 Uhr) für Ersthelferinnen und Ersthelfer in Firmen. Wenn Ihre Firma Sie anmeldet, übernimmt meistens die Berufsgenossenschaft die Kosten. Privatpersonen zahlen 65 Euro.\n\nAnmeldung\nÜber unsere Internetseite oder persönlich in unserem Büro (Mo–Do 8:00–16:00 Uhr, Fr 8:00–12:00 Uhr). Telefonische Anmeldungen sind leider nicht möglich. Bitte melden Sie sich spätestens zwei Wochen vor Kursbeginn an. Wenn Sie weniger als sieben Tage vor Kursbeginn absagen, berechnen wir 50 % der Kursgebühr.",
            },
          ],
          items: [
            {
              q: "6. Im Kurs „Staplerschein“ …",
              opts: [
                "a) lernt man nur am Wochenende.",
                "b) gibt es am Ende zwei Prüfungen.",
                "c) bezahlt immer die Firma die Kosten.",
              ],
              a: 1,
              why: "„Am Ende gibt es eine theoretische und eine praktische Prüfung.“ Der Kurs ist auch am Freitag und Montag; die Firma zahlt nur oft, nicht immer.",
            },
            {
              q: "7. Wer den Kurs „Deutsch am Arbeitsplatz“ besuchen möchte, …",
              opts: [
                "a) muss vorher einen Test machen.",
                "b) braucht eine Bestätigung vom Jobcenter.",
                "c) hat am Vormittag Unterricht.",
              ],
              a: 0,
              why: "„Vor Kursbeginn machen alle Teilnehmenden einen kurzen Einstufungstest.“ Eine Förderung durch das Jobcenter ist nur möglich, nicht Pflicht.",
            },
            {
              q: "8. Den Kurs „Excel für Einsteiger“ …",
              opts: [
                "a) besucht man im Bildungszentrum.",
                "b) gibt es an vier Samstagen.",
                "c) macht man zu Hause am Computer.",
              ],
              a: 2,
              why: "„Dieser Kurs findet nur online statt. Sie lernen bequem von zu Hause aus.“",
            },
            {
              q: "9. Für alle Kurse gilt: …",
              opts: [
                "a) Man kann sich auch telefonisch anmelden.",
                "b) Bei jeder Absage muss man die Hälfte bezahlen.",
                "c) Man muss sich mindestens zwei Wochen vorher anmelden.",
              ],
              a: 2,
              why: "„Bitte melden Sie sich spätestens zwei Wochen vor Kursbeginn an.“ 50 % zahlt man nur bei Absage weniger als sieben Tage vorher.",
            },
          ],
        },
        {
          title: "Lesen Teil 3: Arbeitsanweisungen verstehen",
          skill: "lesen",
          pts: 3,
          instr:
            "Lesen Sie den Text und die Aufgaben 10–13. Welche Antwort (a, b oder c) passt am besten?",
          material: [
            {
              h: "Logistikzentrum Kessler GmbH – Arbeitsanweisung „Sicherheit im Lager“ (gültig ab 1. November)",
              t: "• Sicherheitsschuhe und Warnweste sind in allen Lagerbereichen Pflicht – auch für Besucher. Besucher bekommen am Empfang eine Warnweste.\n• Gabelstapler dürfen nur Mitarbeitende mit gültigem Fahrausweis fahren. Die Schlüssel geben Sie nach Schichtende beim Schichtleiter ab. Lassen Sie den Schlüssel nie im Fahrzeug stecken.\n• Die gelb markierten Wege sind nur für Fußgänger. Die Bereiche vor Notausgängen und Feuerlöschern müssen immer frei bleiben. Stellen Sie dort keine Paletten ab – auch nicht für ein paar Minuten.\n• Kartons über 25 kg heben Sie bitte zu zweit oder mit dem Hubwagen.\n• Beschädigte Ware stellen Sie bitte nicht zurück ins Regal. Legen Sie sie in die rote Box an Tor 3 und tragen Sie sie in die Liste neben der Box ein. Fotos macht die Qualitätskontrolle.\n• Jeden Unfall – auch kleine Verletzungen – melden Sie bitte sofort dem Schichtleiter und tragen ihn ins Verbandbuch ein. Der Verbandkasten hängt neben dem Pausenraum.\n• Rauchen ist nur in der Raucherzone am Parkplatz erlaubt. Während der Fahrt mit dem Stapler ist das Handy verboten.",
            },
          ],
          items: [
            {
              q: "10. Was machen Sie mit dem Staplerschlüssel nach der Schicht?",
              opts: [
                "a) Ich lasse ihn im Stapler stecken.",
                "b) Ich gebe ihn dem Schichtleiter.",
                "c) Ich lege ihn in die rote Box.",
              ],
              a: 1,
              why: "„Die Schlüssel geben Sie nach Schichtende beim Schichtleiter ab.“",
            },
            {
              q: "11. Vor einem Notausgang …",
              opts: [
                "a) dürfen gar keine Paletten stehen.",
                "b) darf man Paletten kurz abstellen.",
                "c) beginnt der gelbe Weg für Fußgänger.",
              ],
              a: 0,
              why: "„Stellen Sie dort keine Paletten ab – auch nicht für ein paar Minuten.“",
            },
            {
              q: "12. Ein Karton ist beschädigt. Was tun Sie?",
              opts: [
                "a) Ich mache ein Foto für die Qualitätskontrolle.",
                "b) Ich stelle ihn zurück und informiere den Schichtleiter.",
                "c) Ich bringe ihn in die rote Box und trage ihn in die Liste ein.",
              ],
              a: 2,
              why: "„Legen Sie sie in die rote Box an Tor 3 und tragen Sie sie in die Liste … ein.“ Fotos macht die Qualitätskontrolle selbst.",
            },
            {
              q: "13. Sie haben sich leicht an der Hand verletzt. Was müssen Sie tun?",
              opts: [
                "a) Die Verletzung sofort melden und ins Verbandbuch eintragen.",
                "b) Nur ein Pflaster aus dem Verbandkasten nehmen.",
                "c) Bis zur Pause warten und dann zum Arzt gehen.",
              ],
              a: 0,
              why: "„Jeden Unfall – auch kleine Verletzungen – melden Sie bitte sofort … und tragen ihn ins Verbandbuch ein.“",
            },
          ],
        },
        {
          title: "Lesen Teil 4: Aufgaben und Aufgabenverteilung",
          skill: "lesen",
          pts: 3,
          instr:
            "Lesen Sie die E-Mail und die Aussagen 14–18. Sind die Aussagen richtig oder falsch?",
          material: [
            {
              h: "E-Mail",
              t: "Von: Sabine Krämer (Hausdamenleitung)\nAn: Team Housekeeping, Hotel Am Stadtpark\nBetreff: Planung für nächste Woche\n\nHallo zusammen,\n\nnächste Woche ist von Mittwoch bis Freitag die große Möbelmesse, und unser Hotel ist komplett ausgebucht. Deshalb ändere ich ein paar Dinge:\n\n– Von Mittwoch bis Freitag fangen wir schon um 7:00 Uhr an statt um 8:00 Uhr. Wer nicht früher kommen kann, meldet sich bitte bis Montag bei mir.\n– Ivana und Mehmet übernehmen die Zimmer im 3. und 4. Stock. Die Suiten im 5. Stock macht wie immer Frau Lindner.\n– Neu: Die Minibars kontrolliert und füllt ab sofort nicht mehr das Housekeeping, sondern der Zimmerservice. Bitte meldet nur, wenn ein Kühlschrank kaputt ist.\n– Am Donnerstag fängt unsere neue Kollegin Joanna an. Sie arbeitet in ihrer ersten Woche mit Ivana zusammen.\n– Am Mittwoch wird die Wäsche zweimal abgeholt, um 10 und um 15 Uhr. Bitte bringt die Säcke rechtzeitig in den Keller.\n\nUrlaubswünsche für Dezember tragt bitte bis zum 15. November in die Liste im Personalraum ein. Danach kann ich den Plan leider nicht mehr ändern.\n\nDanke für eure Hilfe in dieser stressigen Woche!\nSabine",
            },
          ],
          opts: ["Richtig", "Falsch"],
          items: [
            {
              q: "14. In der Messewoche beginnt die Arbeit an drei Tagen eine Stunde früher.",
              a: 0,
              why: "„Von Mittwoch bis Freitag fangen wir schon um 7:00 Uhr an statt um 8:00 Uhr.“",
            },
            {
              q: "15. Frau Lindner reinigt nächste Woche die Zimmer im 3. Stock.",
              a: 1,
              why: "Den 3. und 4. Stock übernehmen Ivana und Mehmet; Frau Lindner macht die Suiten im 5. Stock.",
            },
            {
              q: "16. Das Housekeeping soll die Minibars weiterhin auffüllen.",
              a: 1,
              why: "Die Minibars füllt ab sofort der Zimmerservice; das Housekeeping meldet nur Defekte.",
            },
            {
              q: "17. Joanna wird in ihrer ersten Woche von Ivana begleitet.",
              a: 0,
              why: "„Sie arbeitet in ihrer ersten Woche mit Ivana zusammen.“",
            },
            {
              q: "18. Urlaubswünsche für Dezember kann man auch nach dem 15. November noch eintragen.",
              a: 1,
              why: "„Danach kann ich den Plan leider nicht mehr ändern.“",
            },
          ],
        },
      ],
    },
    // ─────────────────────── LESEN UND SCHREIBEN ───────────────────────
    {
      id: "lesen-schreiben",
      title: "Lesen und Schreiben",
      minutes: 20,
      note: "Erst die E-Mail und die Notiz genau lesen, dann die Aufgaben lösen und die Antwort schreiben.",
      parts: [
        {
          title: "Lesen und Schreiben Teil 1: Eine Kundenanfrage verstehen",
          skill: "lesen",
          pts: 3,
          instr:
            "Sie arbeiten bei der Firma Glanzwerk Gebäudeservice in Essen. Lesen Sie die E-Mail einer Kundin und die Notiz Ihrer Chefin. Lösen Sie die Aufgaben 19 und 20. Welche Antwort (a, b oder c) passt am besten?",
          material: [
            {
              h: "E-Mail von Frau Berger",
              t: "Von: Dr. Martina Berger, Hausarztpraxis Berger, Rüttenscheider Straße 88, Essen\nAn: info@glanzwerk-essen.de\nBetreff: Reinigung am Montag\n\nSehr geehrte Damen und Herren,\n\nseit zwei Jahren reinigt Ihre Firma unsere Praxis, und bisher waren wir immer sehr zufrieden. Am Montagabend war die Reinigung aber leider nicht in Ordnung: Im Wartezimmer wurde nicht gesaugt, und die Mülleimer in den Behandlungszimmern waren am Dienstagmorgen noch voll. Das ist in einer Arztpraxis ein großes Problem.\n\nAußerdem möchte ich fragen, ob Sie ab Dezember die Praxis zusätzlich samstags reinigen können. Wir haben ab Dezember auch samstags Sprechstunde.\n\nBitte melden Sie sich bald bei mir.\n\nMit freundlichen Grüßen\nMartina Berger",
            },
            {
              h: "Notiz der Chefin",
              t: "Bitte antworten Sie Frau Berger heute noch!\n– entschuldigen: Frau Nowak war krank, Vertretung war neu\n– kostenlose Zusatzreinigung anbieten: Donnerstag, 18 Uhr\n– Samstag: im Dezember leider kein Personal, ab Januar möglich → Angebot schicken wir nächste Woche\n– bei Fragen: mich anrufen, 0201 / 38 72 05\nC. Weber",
            },
          ],
          items: [
            {
              q: "19. Warum schreibt Frau Berger?",
              opts: [
                "a) Sie möchte den Vertrag mit Glanzwerk beenden.",
                "b) Die Reinigung am Montag war nicht gut gemacht.",
                "c) Die Mülleimer in der Praxis sind kaputt.",
              ],
              a: 1,
              why: "„Am Montagabend war die Reinigung aber leider nicht in Ordnung“ – sie war bisher zufrieden und will nicht kündigen.",
            },
            {
              q: "20. Was möchte Frau Berger außerdem?",
              opts: [
                "a) Sie möchte die Reinigung am Montag verschieben.",
                "b) Sie möchte ab Januar eine andere Reinigungskraft.",
                "c) Sie möchte ab Dezember auch eine Reinigung am Samstag.",
              ],
              a: 2,
              why: "„ob Sie ab Dezember die Praxis zusätzlich samstags reinigen können.“",
            },
          ],
        },
        {
          kind: "write",
          title: "Lesen und Schreiben Teil 2: Eine Antwort-E-Mail schreiben",
          skill: "schreiben",
          pts: 25,
          instr:
            "Schreiben Sie eine Antwort an Frau Berger. Berücksichtigen Sie alle Punkte aus der Notiz Ihrer Chefin. Schreiben Sie mindestens 70 Wörter. Achten Sie auf Anrede und Gruß.",
          options: [
            {
              h: "Aufgabe",
              situation:
                "Sie arbeiten im Büro der Firma Glanzwerk Gebäudeservice. Frau Dr. Berger hat sich über die Reinigung ihrer Praxis beschwert und fragt nach einer Reinigung am Samstag. Ihre Chefin, Frau Weber, hat Ihnen eine Notiz geschrieben (siehe Teil 1).",
              task: "Antworten Sie Frau Berger per E-Mail und setzen Sie die Anweisungen Ihrer Chefin um.",
              points: [
                "sich entschuldigen und den Grund nennen",
                "eine kostenlose Zusatzreinigung anbieten (Donnerstag, 18 Uhr)",
                "auf die Frage nach dem Samstag antworten (Dezember nicht, ab Januar ja, Angebot nächste Woche)",
                "Kontaktmöglichkeit für Fragen nennen",
              ],
              muster:
                "Sehr geehrte Frau Dr. Berger,\n\nvielen Dank für Ihre E-Mail. Es tut uns sehr leid, dass die Reinigung am Montag nicht in Ordnung war. Unsere Mitarbeiterin Frau Nowak war leider krank, und die Vertretung war noch neu. Wir möchten Ihnen gern eine kostenlose Zusatzreinigung anbieten, und zwar am Donnerstag um 18 Uhr. Bitte sagen Sie uns kurz, ob Ihnen der Termin passt.\n\nZu Ihrer Frage nach dem Samstag: Im Dezember haben wir leider kein Personal dafür. Ab Januar ist eine Reinigung am Samstag aber möglich. Ein Angebot schicken wir Ihnen nächste Woche.\n\nWenn Sie Fragen haben, können Sie meine Chefin, Frau Weber, gern unter 0201 / 38 72 05 anrufen.\n\nMit freundlichen Grüßen\nAndrea Kurz\nGlanzwerk Gebäudeservice",
            },
          ],
          minWords: 70,
          check: [
            "Formelle Anrede („Sehr geehrte Frau Dr. Berger“) und Gruß („Mit freundlichen Grüßen“)",
            "Entschuldigung mit Grund (Krankheit, neue Vertretung)",
            "Zusatzreinigung kostenlos, Donnerstag, 18 Uhr",
            "Samstag: Dezember nein, ab Januar ja, Angebot nächste Woche",
            "Telefonnummer bzw. Ansprechpartnerin genannt",
            "Sie-Form durchgehend, höflicher Ton",
            "Mindestens 70 Wörter, Sätze verbunden (deshalb, aber, und zwar)",
          ],
        },
      ],
    },
    // ───────────────────────────── HÖREN ─────────────────────────────
    {
      id: "hoeren",
      title: "Hören",
      minutes: 20,
      note: "Teil 1–3 hören Sie nur einmal, Teil 4 zweimal. Lesen Sie die Aufgaben immer vor dem Hören.",
      parts: [
        {
          title: "Hören Teil 1: Arbeitsabläufe, Probleme, Vorschläge",
          skill: "hoeren",
          pts: 3,
          plays: 1,
          instr:
            "Sie hören vier Gespräche. Sie hören jedes Gespräch einmal. Lösen Sie zu jedem Gespräch zwei Aufgaben: Ist die Aussage richtig oder falsch? Und welche Antwort (a, b oder c) passt am besten?",
          audio: [
            {
              h: "Gespräch 1",
              lines: [
                {
                  s: "m",
                  t: "Du, Svetlana, hast du mal kurz Zeit? Mein Scanner spinnt schon wieder. Der zeigt nur noch Fehler zwölf an.",
                },
                {
                  s: "f",
                  t: "Ach nee, nicht schon wieder. Hast du ihn mal neu gestartet?",
                },
                {
                  s: "m",
                  t: "Ja, zweimal sogar. Nichts. Und die Lieferung für Hollmann muss bis zwei raus, also bis vierzehn Uhr.",
                },
                {
                  s: "f",
                  t: "Hm. Okay, dann nimm erst mal meinen. Ich mach jetzt sowieso zwanzig Minuten Pause. Und den kaputten, den bringst du bitte nicht in die IT, die sind heute gar nicht da. Leg ihn einfach ins Büro vom Schichtleiter, mit einem Zettel dran.",
                },
                {
                  s: "m",
                  t: "Mit Zettel, alles klar. Und was schreib ich da drauf?",
                },
                {
                  s: "f",
                  t: "Na, die Fehlernummer, also die Zwölf, und deinen Namen. Dann kümmert sich Herr Albers morgen drum.",
                },
                { s: "m", t: "Super. Danke dir, echt!" },
              ],
            },
            {
              h: "Gespräch 2",
              lines: [
                {
                  s: "f",
                  t: "Jonas, noch kurz zur Übergabe, bevor ich geh. Frau Schulz, Zimmer vierzehn, hat heute Mittag fast nichts gegessen. Sie sagt, das Fleisch ist ihr zu hart.",
                },
                {
                  s: "m",
                  t: "Hm. Das hat sie doch letzte Woche auch schon gesagt, oder?",
                },
                {
                  s: "f",
                  t: "Genau. Und ich hab mir überlegt, wir sprechen mal mit der Küche, ob sie das Essen klein geschnitten kriegen kann. Oder eben weicher. Kannst du das heute noch machen? Die Küche ist bis achtzehn Uhr besetzt.",
                },
                {
                  s: "m",
                  t: "Klar, mach ich. Soll ich auch gleich die Tochter anrufen?",
                },
                {
                  s: "f",
                  t: "Nein, nein, die kommt morgen sowieso zu Besuch, dann red ich selbst mit ihr. Aber trag bitte ins Protokoll ein, wie viel Frau Schulz heute Abend trinkt. Das ist wichtig, ja?",
                },
                { s: "m", t: "Mhm. Trinken ins Protokoll. Geht klar." },
              ],
            },
            {
              h: "Gespräch 3",
              lines: [
                {
                  s: "m",
                  t: "Natalia, hast du kurz? An Kasse zwei haben gestern Abend zwanzig Euro gefehlt. Weißt du da was drüber?",
                },
                {
                  s: "f",
                  t: "Gestern? Moment … da war ich bis siebzehn Uhr an der Zwei, dann hat Patrick übernommen.",
                },
                { s: "m", t: "Ah so. Und habt ihr bei der Übergabe gezählt?" },
                {
                  s: "f",
                  t: "Ehrlich gesagt … nein. Es war so voll, die Schlange ging bis hinten zu den Getränken.",
                },
                {
                  s: "m",
                  t: "Ja, versteh ich. Aber in Zukunft machen wir das so: Bei jedem Wechsel wird gezählt, auch wenn's voll ist. Ich hol dann jemanden, der kurz eine andere Kasse aufmacht.",
                },
                {
                  s: "f",
                  t: "Okay, gute Idee. Und wer zählt dann? Wir beide zusammen?",
                },
                {
                  s: "m",
                  t: "Genau, beide zusammen. Und beide unterschreiben auf dem Zettel.",
                },
              ],
            },
            {
              h: "Gespräch 4",
              lines: [
                {
                  s: "f",
                  t: "Du, Ali, der Gast aus der Zweihundertacht, Herr Fischer, hat sich gerade beschwert. Er sagt, das Zimmer ist zu laut, wegen der Straße.",
                },
                {
                  s: "m",
                  t: "Schon wieder die Zweihundertacht … Haben wir noch was frei zur Hofseite?",
                },
                {
                  s: "f",
                  t: "Heute nicht, wir sind komplett voll. Morgen wird die Dreihundertzwölf frei, die ist ruhig.",
                },
                {
                  s: "m",
                  t: "Hm. Dann würde ich vorschlagen: Heute geben wir ihm Ohrstöpsel und ein Getränk an der Bar, natürlich gratis. Und morgen ab zwölf zieht er um in die Dreihundertzwölf.",
                },
                { s: "f", t: "Gute Idee. Und sein Koffer? Muss er den selbst …" },
                {
                  s: "m",
                  t: "Nee, den bringt der Hausdienst rüber. Er muss sich um nichts kümmern.",
                },
                { s: "f", t: "Okay. Dann ruf ich ihn gleich mal an." },
              ],
            },
          ],
          items: [
            {
              au: 0,
              q: "21. Der Mann hat seinen Scanner schon neu gestartet.",
              opts: ["Richtig", "Falsch"],
              a: 0,
              why: "„Ja, zweimal sogar. Nichts.“",
            },
            {
              au: 0,
              q: "22. Was soll der Mann mit dem kaputten Scanner machen?",
              opts: [
                "a) Ihn in die IT-Abteilung bringen.",
                "b) Ihn mit einem Zettel ins Büro des Schichtleiters legen.",
                "c) Ihn nach der Pause selbst reparieren.",
              ],
              a: 1,
              why: "„Leg ihn einfach ins Büro vom Schichtleiter, mit einem Zettel dran.“ Die IT ist heute nicht da.",
            },
            {
              au: 1,
              q: "23. Frau Schulz hat sich heute zum ersten Mal über das Essen beschwert.",
              opts: ["Richtig", "Falsch"],
              a: 1,
              why: "Sie hat es „letzte Woche auch schon gesagt“.",
            },
            {
              au: 1,
              q: "24. Was soll Jonas heute noch machen?",
              opts: [
                "a) Die Tochter von Frau Schulz anrufen.",
                "b) Das Fleisch für Frau Schulz selbst klein schneiden.",
                "c) Mit der Küche sprechen und das Trinken notieren.",
              ],
              a: 2,
              why: "Er soll mit der Küche sprechen und ins Protokoll eintragen, wie viel sie trinkt. Mit der Tochter spricht die Kollegin selbst.",
            },
            {
              au: 2,
              q: "25. Bei der Kassenübergabe gestern wurde das Geld nicht gezählt.",
              opts: ["Richtig", "Falsch"],
              a: 0,
              why: "„Habt ihr bei der Übergabe gezählt?“ – „Ehrlich gesagt … nein.“",
            },
            {
              au: 2,
              q: "26. Was ändert sich in Zukunft?",
              opts: [
                "a) Beim Kassenwechsel zählen beide Kollegen das Geld.",
                "b) Natalia arbeitet nur noch an Kasse 2.",
                "c) Der Filialleiter zählt jeden Abend allein.",
              ],
              a: 0,
              why: "„Bei jedem Wechsel wird gezählt … beide zusammen. Und beide unterschreiben auf dem Zettel.“",
            },
            {
              au: 3,
              q: "27. Das Hotel hat heute noch ein ruhiges Zimmer frei.",
              opts: ["Richtig", "Falsch"],
              a: 1,
              why: "„Heute nicht, wir sind komplett voll.“ Erst morgen wird die Dreihundertzwölf frei.",
            },
            {
              au: 3,
              q: "28. Was bekommt der Gast heute?",
              opts: [
                "a) Ein ruhiges Zimmer zur Hofseite.",
                "b) Ein Getränk an der Bar, ohne zu bezahlen.",
                "c) Hilfe beim Tragen seines Koffers.",
              ],
              a: 1,
              why: "„Heute geben wir ihm Ohrstöpsel und ein Getränk an der Bar, natürlich gratis.“ Umzug und Koffer erst morgen.",
            },
          ],
        },
        {
          title: "Hören Teil 2: Meinungen",
          skill: "hoeren",
          pts: 3,
          plays: 1,
          instr:
            "Sie hören eine Teambesprechung in einer Reinigungsfirma. Sie hören das Gespräch einmal. Was meinen die Personen? Ordnen Sie zu: Welche Aussage (a–d) passt zu welcher Person? Zwei Aussagen passen nicht.",
          audio: [
            {
              h: "Teambesprechung",
              lines: [
                {
                  s: "f",
                  t: "So, nächster Punkt: der Dienstplan. Bis jetzt hängt der ja immer auf Papier im Pausenraum. Und ich möchte, dass wir ab Januar eine App benutzen. Dann sieht jeder seinen Plan auf dem Handy, auch am Wochenende, von zu Hause aus.",
                },
                {
                  s: "m",
                  t: "Also, ich weiß nicht. Ich bin ja ehrlich gesagt nicht so der Handy-Typ. Und nicht jeder hat ein gutes Smartphone. Ich finde, der Plan sollte trotzdem weiter im Pausenraum hängen. Für alle, die das lieber auf Papier haben.",
                },
                { s: "f", t: "Hm, ja, das könnten wir machen, Herr Kowalski. Frau Demir, was meinen Sie?" },
                {
                  s: "f2",
                  t: "Also, ich finde die App eigentlich super. Mein Problem ist eher: Wenn sich kurzfristig was ändert, erfahr ich das oft zu spät. Erst wenn ich morgens in den Pausenraum komme, und dann ist es schon passiert. Mit der App kriegt man doch eine Nachricht, oder? Das wär für mich das Wichtigste.",
                },
                {
                  s: "f",
                  t: "Genau, bei jeder Änderung kriegt man eine Nachricht aufs Handy.",
                },
                {
                  s: "m",
                  t: "Und wer erklärt uns das? Ich will da ja keine Fehler machen.",
                },
                {
                  s: "f",
                  t: "Keine Sorge. Wir machen im Dezember eine kurze Schulung, so eine halbe Stunde, während der Arbeitszeit.",
                },
              ],
            },
          ],
          opts: [
            "a) Änderungen im Dienstplan sollen schneller bekannt sein.",
            "b) Man soll den Dienstplan auch am Wochenende sehen können.",
            "c) Der Dienstplan soll zusätzlich auf Papier aushängen.",
            "d) Die Schulung soll nach der Arbeitszeit stattfinden.",
          ],
          items: [
            {
              au: 0,
              q: "29. Herr Kowalski",
              a: 2,
              why: "„Ich finde, der Plan sollte trotzdem weiter im Pausenraum hängen.“ (b sagt die Chefin, d sagt niemand)",
            },
            {
              au: 0,
              q: "30. Frau Demir",
              a: 0,
              why: "„Wenn sich kurzfristig was ändert, erfahr ich das oft zu spät … Das wär für mich das Wichtigste.“",
            },
          ],
        },
        {
          title: "Hören Teil 3: Gespräche über Produkte und Abläufe",
          skill: "hoeren",
          pts: 3,
          plays: 1,
          instr:
            "Sie hören zwei Gespräche. Sie hören jedes Gespräch einmal. Lösen Sie zu jedem Gespräch zwei Aufgaben. Welche Antwort (a, b oder c) passt am besten?",
          audio: [
            {
              h: "Gespräch 1",
              lines: [
                {
                  s: "f",
                  t: "So, Herr Okafor, ich zeig Ihnen noch schnell unsere Zeiterfassung. Ihre Karte haben Sie schon, ja?",
                },
                { s: "m", t: "Ja, hier, die hab ich." },
                {
                  s: "f",
                  t: "Gut. Also, morgens halten Sie die Karte hier an das Gerät am Eingang, dann piept es einmal. Abends genauso. Für die Mittagspause müssen Sie nicht stempeln, die halbe Stunde wird automatisch abgezogen.",
                },
                {
                  s: "m",
                  t: "Ah, praktisch. Und wenn ich mal direkt zum Kunden fahre, also gar nicht ins Büro komme?",
                },
                {
                  s: "f",
                  t: "Dann tragen Sie Ihre Zeit in der App ein. Am selben Tag bitte, spätestens am nächsten Morgen. Ach ja, und noch was: Wenn Sie die Karte verlieren, sagen Sie sofort am Empfang Bescheid. Eine neue kostet nämlich zehn Euro.",
                },
                { s: "m", t: "Oh, zehn Euro. Gut, dass ich das weiß. Dann pass ich mal gut drauf auf." },
              ],
            },
            {
              h: "Gespräch 2",
              lines: [
                {
                  s: "f",
                  t: "Entschuldigung, können Sie mir kurz helfen? Ich suche einen Staubsauger ohne Kabel. Für eine kleine Wohnung.",
                },
                {
                  s: "m",
                  t: "Ja, gern. Da hätten wir zum Beispiel den hier, den Turbo dreihundert, für hundertneunundvierzig Euro. Und den Clean Max, der kostet hundertneunundneunzig.",
                },
                { s: "f", t: "Mhm. Und was ist der Unterschied?" },
                {
                  s: "m",
                  t: "Vor allem der Akku. Der Turbo hält so ungefähr dreißig Minuten, der Clean Max fast eine Stunde. Aber ehrlich gesagt, für eine kleine Wohnung reicht der Turbo völlig.",
                },
                { s: "f", t: "Und wenn er mal kaputtgeht?" },
                {
                  s: "m",
                  t: "Beide haben zwei Jahre Garantie. Beim Clean Max können Sie für neunzehn Euro auf vier Jahre verlängern.",
                },
                {
                  s: "f",
                  t: "Hm. Nee, ich nehme den günstigeren. Kann man den auch liefern lassen?",
                },
                {
                  s: "m",
                  t: "Geht, die Lieferung kostet sechs Euro neunzig. Aber den Turbo haben wir hier auf Lager, den können Sie sofort mitnehmen.",
                },
                { s: "f", t: "Ach so, na dann nehm ich ihn gleich mit." },
              ],
            },
          ],
          items: [
            {
              au: 0,
              q: "31. Was gilt für die Mittagspause?",
              opts: [
                "a) Man muss vor und nach der Pause stempeln.",
                "b) Die Pause wird automatisch abgezogen.",
                "c) Man trägt die Pause in der App ein.",
              ],
              a: 1,
              why: "„Für die Mittagspause müssen Sie nicht stempeln, die halbe Stunde wird automatisch abgezogen.“",
            },
            {
              au: 0,
              q: "32. Was macht Herr Okafor, wenn er direkt zum Kunden fährt?",
              opts: [
                "a) Er trägt seine Arbeitszeit in der App ein.",
                "b) Er meldet sich beim Empfang.",
                "c) Er stempelt am nächsten Morgen im Büro.",
              ],
              a: 0,
              why: "„Dann tragen Sie Ihre Zeit in der App ein.“ Beim Empfang meldet man nur eine verlorene Karte.",
            },
            {
              au: 1,
              q: "33. Warum empfiehlt der Verkäufer den Turbo 300?",
              opts: [
                "a) Er hat den stärkeren Akku.",
                "b) Man kann die Garantie verlängern.",
                "c) Er reicht für eine kleine Wohnung.",
              ],
              a: 2,
              why: "„Für eine kleine Wohnung reicht der Turbo völlig.“ Der stärkere Akku und die Garantieverlängerung gehören zum Clean Max.",
            },
            {
              au: 1,
              q: "34. Was macht die Kundin?",
              opts: [
                "a) Sie nimmt den Staubsauger sofort mit.",
                "b) Sie lässt den Staubsauger liefern.",
                "c) Sie kauft den Clean Max mit vier Jahren Garantie.",
              ],
              a: 0,
              why: "„Na dann nehm ich ihn gleich mit.“",
            },
          ],
        },
        {
          title: "Hören Teil 4: Anliegen",
          skill: "hoeren",
          pts: 3,
          plays: 2,
          instr:
            "Sie hören fünf Nachrichten auf dem Anrufbeantworter bzw. der Mailbox. Sie hören jede Nachricht zweimal. Welche Antwort (a, b oder c) passt am besten?",
          audio: [
            {
              h: "Nachricht 1",
              lines: [
                {
                  s: "f",
                  t: "Ja, hallo, Herr Haddad, hier ist Melanie Groß von Personalservice Nordstern. Äh, wir hätten ab Montag einen Einsatz für Sie, im Lager bei der Firma Kaltenbach in Bochum. Frühschicht, Beginn um sechs Uhr. Bringen Sie bitte Ihre Sicherheitsschuhe mit, die Warnweste bekommen Sie dort. Und ganz wichtig: Rufen Sie mich bitte bis Freitag zurück, ob Sie den Einsatz annehmen. Meine Nummer ist null zwei drei vier, fünfundfünfzig, einundachtzig, zwanzig. Ich wiederhole: null zwei drei vier, fünfundfünfzig, einundachtzig, zwanzig. Danke, tschüss!",
                },
              ],
            },
            {
              h: "Nachricht 2",
              lines: [
                {
                  s: "f",
                  t: "Hallo Ewa, hier ist Gül. Du, ich bin krank, ich hab Fieber, mir geht's echt nicht gut. Kannst du morgen meine Schicht im Bistro übernehmen? Das ist die Spätschicht, von vierzehn bis zweiundzwanzig Uhr. Mit Herrn Stein hab ich schon gesprochen, der ist einverstanden. Dafür arbeite ich nächsten Samstag für dich, okay? Schreib mir einfach kurz eine SMS. Danke dir, tschüss!",
                },
              ],
            },
            {
              h: "Nachricht 3",
              lines: [
                {
                  s: "m",
                  t: "Guten Tag, hier spricht Herbert Voss, Hausverwaltung Voss und Partner. Es geht um die Treppenhausreinigung in der Gartenstraße zwölf. Die Mieter haben sich bei mir beschwert, die Reinigung ist diese Woche ausgefallen. Äh, ja. Bitte schicken Sie noch vor dem Wochenende jemanden vorbei. Und für nächstes Jahr bräuchte ich dann noch ein neues Angebot, und zwar auch für die Fenster. Rückruf bitte unter null zwei null eins, siebenundvierzig, neununddreißig, sechsundsechzig. Also noch mal: null zwei null eins, siebenundvierzig, neununddreißig, sechsundsechzig. Vielen Dank, auf Wiederhören.",
                },
              ],
            },
            {
              h: "Nachricht 4",
              lines: [
                {
                  s: "f",
                  t: "Ja, guten Tag, hier ist Albrecht vom Bildungszentrum Rhein-Ruhr. Das ist eine Nachricht für Frau Jovanović. Es geht um Ihren Erste-Hilfe-Kurs am Samstag. Der findet leider nicht in Raum hundertvier statt, sondern in Gebäude B, Raum zwölf. Also noch mal: Gebäude B, Raum zwölf. Die Uhrzeit bleibt gleich, neun Uhr. Und bitte denken Sie an Ihren Personalausweis. Vielen Dank, auf Wiederhören.",
                },
              ],
            },
            {
              h: "Nachricht 5",
              lines: [
                {
                  s: "f",
                  t: "Hallo Herr Demirel, hier ist Brigitte Lang aus der Personalabteilung. Ich wollte Ihnen nur kurz sagen: Unser Gespräch wegen der Verlängerung von Ihrem Vertrag ist nicht am Mittwoch, sondern am Donnerstag. Gleiche Uhrzeit, also um halb elf. Ach ja, und noch was: Bringen Sie bitte die Bescheinigung von Ihrem Staplerkurs mit, die brauchen wir noch für die Personalakte. Gut, dann bis Donnerstag. Tschüss!",
                },
              ],
            },
          ],
          items: [
            {
              au: 0,
              q: "35. Was soll Herr Haddad tun?",
              opts: [
                "a) Am Montag eine Warnweste mitbringen.",
                "b) Frau Groß bis Freitag zurückrufen.",
                "c) Bei der Firma Kaltenbach anrufen.",
              ],
              a: 1,
              why: "„Rufen Sie mich bitte bis Freitag zurück.“ Die Warnweste bekommt er vor Ort.",
            },
            {
              au: 1,
              q: "36. Was bietet Gül an?",
              opts: [
                "a) Sie arbeitet nächsten Samstag für Ewa.",
                "b) Sie spricht noch mit Herrn Stein.",
                "c) Sie tauscht ihre Spätschicht gegen eine Frühschicht.",
              ],
              a: 0,
              why: "„Dafür arbeite ich nächsten Samstag für dich.“ Mit Herrn Stein hat sie schon gesprochen.",
            },
            {
              au: 2,
              q: "37. Was möchte Herr Voss?",
              opts: [
                "a) Er möchte nur noch die Fenster reinigen lassen.",
                "b) Er möchte den Vertrag kündigen.",
                "c) Die ausgefallene Reinigung soll nachgeholt werden.",
              ],
              a: 2,
              why: "„Bitte schicken Sie noch vor dem Wochenende jemanden vorbei.“ Die Fenster soll das neue Angebot zusätzlich enthalten.",
            },
            {
              au: 3,
              q: "38. Was ändert sich beim Erste-Hilfe-Kurs?",
              opts: ["a) Der Raum.", "b) Die Uhrzeit.", "c) Der Tag."],
              a: 0,
              why: "„… nicht in Raum hundertvier statt, sondern in Gebäude B, Raum zwölf … Die Uhrzeit bleibt gleich.“",
            },
            {
              au: 4,
              q: "39. Was soll Herr Demirel mitbringen?",
              opts: [
                "a) Seinen Arbeitsvertrag.",
                "b) Seinen Personalausweis.",
                "c) Die Bescheinigung vom Staplerkurs.",
              ],
              a: 2,
              why: "„Bringen Sie bitte die Bescheinigung von Ihrem Staplerkurs mit.“",
            },
          ],
        },
      ],
    },
    // ─────────────────────── HÖREN UND SCHREIBEN ───────────────────────
    {
      id: "hoeren-schreiben",
      title: "Hören und Schreiben",
      minutes: 5,
      note: "Sie hören ein Telefonat zweimal. Machen Sie schon beim ersten Hören Stichpunkte.",
      parts: [
        {
          title: "Hören und Schreiben Teil 1: Ein Telefonat verstehen",
          skill: "hoeren",
          pts: 3,
          plays: 2,
          instr:
            "Sie arbeiten an der Rezeption im Hotel Ruhrblick in Essen. Sie hören ein Telefongespräch zweimal. Lösen Sie die Aufgabe 40. Welche Antwort (a, b oder c) passt am besten?",
          audio: [
            {
              h: "Telefongespräch",
              lines: [
                {
                  s: "m",
                  t: "Hotel Ruhrblick, guten Tag, Sie sprechen mit Yıldız.",
                },
                {
                  s: "f",
                  t: "Ja, guten Tag, Kaminski hier, von der Firma Technoplast in Witten. Ich hätte gern Herrn Brandt gesprochen. Es geht um eine Veranstaltung.",
                },
                {
                  s: "m",
                  t: "Oh, Herr Brandt ist heute leider nicht im Haus. Kann ich ihm etwas ausrichten?",
                },
                {
                  s: "f",
                  t: "Ja, gern. Also, wir planen eine Schulung für unsere Mitarbeiter, und zwar am sechsundzwanzigsten und siebenundzwanzigsten November. Wir bräuchten einen Seminarraum für vierzehn Personen, mit Beamer. Und Zimmer für zwei Nächte … nein, Entschuldigung, nur eine Nacht, vom sechsundzwanzigsten auf den siebenundzwanzigsten.",
                },
                { s: "m", t: "Moment, ich schreib mit … Eine Nacht, für vierzehn Personen. Einzelzimmer?" },
                {
                  s: "f",
                  t: "Ja, genau, alles Einzelzimmer. Und mittags hätten wir gern ein Mittagessen, an beiden Tagen. Bitte auch mit einer vegetarischen Möglichkeit.",
                },
                { s: "m", t: "Mhm, vegetarisch auch. Alles klar. Soll Herr Brandt Sie zurückrufen?" },
                {
                  s: "f",
                  t: "Er soll mir bitte bis Freitag ein Angebot schicken, per E-Mail, die Adresse hat er. Und wenn er Fragen hat, kann er mich gern anrufen. Die Nummer ist null zwei drei null zwei, achtundsiebzig, einundvierzig, fünfzehn.",
                },
                { s: "m", t: "Ich wiederhole: null zwei drei null zwei, achtundsiebzig, einundvierzig, fünfzehn." },
                { s: "f", t: "Genau. Vielen Dank! Auf Wiederhören." },
              ],
            },
          ],
          items: [
            {
              au: 0,
              q: "40. Was möchte Frau Kaminski?",
              opts: [
                "a) Zimmer für zwei Nächte für ihr Team buchen.",
                "b) Herrn Brandt am Freitag persönlich treffen.",
                "c) Raum, Zimmer und Essen für eine Schulung anfragen.",
              ],
              a: 2,
              why: "Sie braucht einen Seminarraum, Einzelzimmer für eine Nacht und Mittagessen für eine Schulung; „zwei Nächte“ korrigiert sie sofort.",
            },
          ],
        },
        {
          kind: "write",
          title: "Hören und Schreiben Teil 2: Eine Gesprächsnotiz schreiben",
          skill: "schreiben",
          pts: 15,
          plays: 2,
          instr:
            "Hören Sie das Telefongespräch noch einmal. Schreiben Sie für Ihren Kollegen Herrn Brandt eine Gesprächsnotiz. Notieren Sie die wichtigsten Informationen in Stichpunkten.",
          audio: [
            {
              h: "Telefongespräch (noch einmal)",
              lines: [
                {
                  s: "m",
                  t: "Hotel Ruhrblick, guten Tag, Sie sprechen mit Yıldız.",
                },
                {
                  s: "f",
                  t: "Ja, guten Tag, Kaminski hier, von der Firma Technoplast in Witten. Ich hätte gern Herrn Brandt gesprochen. Es geht um eine Veranstaltung.",
                },
                {
                  s: "m",
                  t: "Oh, Herr Brandt ist heute leider nicht im Haus. Kann ich ihm etwas ausrichten?",
                },
                {
                  s: "f",
                  t: "Ja, gern. Also, wir planen eine Schulung für unsere Mitarbeiter, und zwar am sechsundzwanzigsten und siebenundzwanzigsten November. Wir bräuchten einen Seminarraum für vierzehn Personen, mit Beamer. Und Zimmer für zwei Nächte … nein, Entschuldigung, nur eine Nacht, vom sechsundzwanzigsten auf den siebenundzwanzigsten.",
                },
                { s: "m", t: "Moment, ich schreib mit … Eine Nacht, für vierzehn Personen. Einzelzimmer?" },
                {
                  s: "f",
                  t: "Ja, genau, alles Einzelzimmer. Und mittags hätten wir gern ein Mittagessen, an beiden Tagen. Bitte auch mit einer vegetarischen Möglichkeit.",
                },
                { s: "m", t: "Mhm, vegetarisch auch. Alles klar. Soll Herr Brandt Sie zurückrufen?" },
                {
                  s: "f",
                  t: "Er soll mir bitte bis Freitag ein Angebot schicken, per E-Mail, die Adresse hat er. Und wenn er Fragen hat, kann er mich gern anrufen. Die Nummer ist null zwei drei null zwei, achtundsiebzig, einundvierzig, fünfzehn.",
                },
                { s: "m", t: "Ich wiederhole: null zwei drei null zwei, achtundsiebzig, einundvierzig, fünfzehn." },
                { s: "f", t: "Genau. Vielen Dank! Auf Wiederhören." },
              ],
            },
          ],
          options: [
            {
              h: "Gesprächsnotiz",
              situation:
                "Herr Brandt ist für Veranstaltungen im Hotel Ruhrblick zuständig. Er war heute nicht im Haus.",
              task: "Schreiben Sie eine Gesprächsnotiz für Herrn Brandt. Füllen Sie die Felder in Stichpunkten aus.",
              points: [
                "Wer? (Name, Firma, Telefon)",
                "Anliegen",
                "Termin / Details",
                "Was tun?",
              ],
              muster:
                "Gesprächsnotiz für Herrn Brandt\n\nWer? Frau Kaminski, Firma Technoplast, Witten – Tel. 02302 / 78 41 15\nAnliegen: Schulung für Mitarbeiter im Hotel – Seminarraum für 14 Pers. mit Beamer, Mittagessen an beiden Tagen (auch vegetarisch)\nTermin / Details: 26. + 27. November; 14 Einzelzimmer für 1 Nacht (26. auf 27.11.)\nWas tun? Bis Freitag Angebot per E-Mail schicken; bei Fragen Frau Kaminski anrufen\n\nYıldız, Rezeption",
            },
          ],
          minWords: 15,
          check: [
            "Name und Firma richtig (Kaminski, Technoplast, Witten)",
            "Telefonnummer vollständig und richtig",
            "Anliegen: Seminarraum (14 Personen, Beamer) und Mittagessen",
            "Termin: 26./27. November, nur 1 Nacht, Einzelzimmer",
            "Aufgabe: Angebot per E-Mail bis Freitag",
          ],
        },
      ],
    },
    // ─────────────────── SPRACHBAUSTEINE UND SCHREIBEN ───────────────────
    {
      id: "sprachbausteine",
      title: "Sprachbausteine und Schreiben",
      minutes: 10,
      parts: [
        {
          title:
            "Sprachbausteine Teil 1: Auf Anfragen und Vorschläge reagieren",
          skill: "schreiben",
          pts: 1,
          instr:
            "Lesen Sie die E-Mail. Welche Lösung (a, b oder c) passt in die Lücken 41–46?",
          material: [
            {
              h: "E-Mail an die Filialleiterin",
              t: "Liebe Frau Wolters,\n\nvielen Dank für Ihre Nachricht. {1} am Samstag für Frau Klein einspringen, das ist kein Problem. Ich kann allerdings erst um 10 Uhr kommen, {2} ich vormittags meinen Sohn zum Fußballtraining bringe. Ist das in Ordnung?\n\nIhren Vorschlag mit der Schulung zum neuen Kassensystem finde ich sehr gut. {3}, dass wir die Schulung an einem Montag machen, weil dann im Laden weniger los ist.\n\nLeider kann ich am 3. Dezember nicht teilnehmen, weil ich an dem Tag einen Arzttermin habe. {4} einen anderen Termin anbieten?\n\nWegen meines Urlaubs im Januar wollte ich noch {5}, ob die zwei Wochen frei sind.\n\n{6}\n\nViele Grüße\nAhmad Rahimi",
            },
          ],
          items: [
            {
              q: "",
              opts: [
                "a) Ich würde gern",
                "b) Ich hätte gern",
                "c) Ich wäre gern",
              ],
              a: 0,
              why: "„Ich würde gern … einspringen“ – würde + Infinitiv; „hätte/wäre gern“ passen nicht zu einspringen.",
            },
            {
              q: "",
              opts: ["a) deshalb", "b) weil", "c) obwohl"],
              a: 1,
              why: "Grund mit Verb am Ende („… bringe“): weil.",
            },
            {
              q: "",
              opts: [
                "a) Ich bezweifle",
                "b) Ich frage mich",
                "c) Ich schlage vor",
              ],
              a: 2,
              why: "Er findet die Idee gut und macht einen Vorschlag: „Ich schlage vor, dass …“.",
            },
            {
              q: "",
              opts: [
                "a) Könnten Sie mir",
                "b) Müssten Sie mir",
                "c) Dürften Sie mir",
              ],
              a: 0,
              why: "Höfliche Bitte: „Könnten Sie mir … anbieten?“",
            },
            {
              q: "",
              opts: [
                "a) kurz beantworten",
                "b) kurz nachfragen",
                "c) kurz verschieben",
              ],
              a: 1,
              why: "„nachfragen, ob …“ – er möchte eine Information von der Chefin.",
            },
            {
              q: "",
              opts: [
                "a) Ich warte für Ihre Antwort.",
                "b) Ich bedanke mich auf Ihre Antwort.",
                "c) Ich freue mich auf Ihre Antwort.",
              ],
              a: 2,
              why: "Feste Formel: sich freuen auf; „warten auf“ und „sich bedanken für“ wären richtig.",
            },
          ],
        },
        {
          kind: "write",
          title:
            "Sprachbausteine und Schreiben Teil 2: Seine Meinung im Team-Chat schreiben",
          skill: "schreiben",
          pts: 14,
          instr:
            "Lesen Sie die Nachricht Ihrer Chefin im Team-Chat. Schreiben Sie eine Antwort, in der Sie Ihre Meinung sagen und begründen. Schreiben Sie mindestens 40 Wörter.",
          material: [
            {
              h: "Team-Chat „Lager Halle 2“ – Nachricht von Teamleiterin Petra Schäfer",
              t: "Liebes Team, ich habe eine Idee: Ab Januar möchte ich, dass ihr in festen Zweier-Teams arbeitet. Jedes Team ist dann immer für denselben Bereich zuständig, z. B. Wareneingang oder Versand. Bis jetzt teile ich ja jeden Morgen neu ein. Was haltet ihr davon? Schreibt mir eure Meinung bis Freitag hier in den Chat. Danke! Petra",
            },
          ],
          options: [
            {
              h: "Aufgabe",
              situation:
                "Sie arbeiten im Lager. Ihre Teamleiterin möchte feste Zweier-Teams einführen und fragt nach Ihrer Meinung.",
              task: "Antworten Sie im Team-Chat: Sagen Sie Ihre Meinung, begründen Sie sie und machen Sie einen Vorschlag.",
              points: [
                "Meinung zum Vorschlag",
                "Begründung (Vorteil oder Nachteil)",
                "eigener Vorschlag oder Wunsch",
              ],
              muster:
                "Hallo Petra, danke für die Frage! Ich finde die Idee mit den festen Teams grundsätzlich gut. Wenn man immer im selben Bereich arbeitet, kennt man die Abläufe genau und macht weniger Fehler. Aber es kann auch langweilig werden. Deshalb schlage ich vor, dass wir die Bereiche alle drei Monate tauschen. So lernen alle trotzdem das ganze Lager kennen. Viele Grüße, Milan",
            },
          ],
          minWords: 40,
          check: [
            "Kurze Anrede und Gruß passend zum Team-Chat (du-Form möglich)",
            "Meinung klar gesagt (Ich finde …, Meiner Meinung nach …)",
            "Mindestens eine Begründung mit weil/denn/deshalb",
            "Ein konkreter Vorschlag (Ich schlage vor, dass …)",
            "Mindestens 40 Wörter, verständlich und höflich",
          ],
        },
      ],
    },
    // ───────────────────────────── SPRECHEN ─────────────────────────────
    {
      id: "sprechen",
      title: "Sprechen",
      minutes: 16,
      prepMinutes: 0,
      note: "Keine Vorbereitungszeit. Teil 1 sprechen Sie allein, Teil 2 und 3 mit Ihrer Partnerin oder Ihrem Partner.",
      parts: [
        {
          kind: "speak",
          title: "Sprechen Teil 1A: Über ein Thema sprechen",
          skill: "sprechen",
          pts: 12,
          minutes: 2,
          instr:
            "Sprechen Sie etwa eine Minute über das Thema. Die Stichpunkte helfen Ihnen.",
          task: "Thema: Arbeiten im Team\n\n• Wo und mit wem arbeiten Sie (oder haben Sie) im Team gearbeitet?\n• Was ist gut an Teamarbeit?\n• Was kann schwierig sein?\n• Wie löst man Probleme im Team?",
          prompts: ["So, dann fangen wir an. Bitte erzählen Sie etwas zum Thema Arbeiten im Team. Sie haben ungefähr eine Minute."],
          redemittel: [
            "Ich möchte etwas über … erzählen.",
            "Zurzeit arbeite ich als … bei …",
            "Ein Vorteil ist, dass …",
            "Schwierig finde ich manchmal, wenn …",
            "Wenn es ein Problem gibt, dann …",
            "Zum Schluss möchte ich sagen, dass …",
          ],
          muster:
            "Ich möchte etwas über Teamarbeit erzählen. Zurzeit arbeite ich als Lagerhelfer in einem Logistikzentrum. Wir sind ein Team von sechs Leuten und arbeiten im Wareneingang. Teamarbeit finde ich gut, weil man sich gegenseitig helfen kann. Wenn zum Beispiel ein Karton sehr schwer ist, heben wir ihn zu zweit. Außerdem lernt man viel von erfahrenen Kollegen. Schwierig ist es manchmal, wenn jemand seine Arbeit nicht richtig macht oder oft zu spät kommt. Dann müssen die anderen mehr arbeiten. Wenn es ein Problem gibt, sprechen wir zuerst direkt mit der Person, ruhig und freundlich. Wenn das nicht hilft, sagen wir es dem Schichtleiter. Insgesamt arbeite ich lieber im Team als allein.",
          check: [
            "Alle vier Stichpunkte angesprochen",
            "Etwa eine Minute zusammenhängend gesprochen",
            "Beispiele aus dem eigenen Berufsleben",
            "Sätze verbunden (weil, wenn, deshalb, außerdem)",
          ],
        },
        {
          kind: "speak",
          title: "Sprechen Teil 1B: Fragen beantworten",
          skill: "sprechen",
          pts: 12,
          minutes: 2,
          instr:
            "Die Prüferin / der Prüfer stellt Ihnen Fragen zu Ihrem Thema. Antworten Sie in ganzen Sätzen und begründen Sie Ihre Antworten.",
          task: "Antworten Sie auf die Fragen zum Thema „Arbeiten im Team“.",
          prompts: [
            "Arbeiten Sie lieber allein oder im Team? Und warum?",
            "Was machen Sie, wenn ein Kollege oder eine Kollegin die Arbeit nicht richtig macht?",
            "Wie war die Teamarbeit in Ihrem Heimatland? Gibt es da Unterschiede zu Deutschland?",
            "Und zum Schluss: Was ist für Sie ein guter Teamleiter oder eine gute Teamleiterin?",
          ],
          redemittel: [
            "Ich arbeite lieber …, weil …",
            "Das kommt darauf an, ob …",
            "In meinem Heimatland war es so, dass …",
            "In Deutschland habe ich bemerkt, dass …",
            "Für mich ist wichtig, dass …",
          ],
          muster:
            "1) Ich arbeite lieber im Team, weil die Arbeit dann schneller geht und mehr Spaß macht. Für Büroarbeit, zum Beispiel Listen schreiben, bin ich aber gern allein, weil ich mich dann besser konzentrieren kann.\n2) Zuerst spreche ich ruhig mit ihm. Vielleicht hat er ein Problem oder ist krank. Wenn es öfter passiert, informiere ich die Teamleitung.\n3) In Syrien habe ich in einer Werkstatt gearbeitet. Dort war der Chef sehr wichtig, er hat alles entschieden. In Deutschland fragt die Teamleiterin oft nach unserer Meinung. Das finde ich gut.\n4) Eine gute Teamleiterin ist fair und erklärt die Aufgaben klar. Sie hört zu, wenn wir Probleme haben, und sie lobt auch mal.",
          check: [
            "Jede Frage direkt beantwortet",
            "Jede Antwort mit Begründung oder Beispiel",
            "Ganze Sätze, nicht nur ein Wort",
            "Bei Unklarheit nachgefragt („Können Sie die Frage bitte wiederholen?“)",
          ],
        },
        {
          kind: "speak",
          title:
            "Sprechen Teil 2: Mit Kollegen sprechen – Erfahrungen austauschen",
          skill: "sprechen",
          pts: 16,
          minutes: 4,
          instr:
            "Sie sind Kolleginnen / Kollegen und sprechen in der Pause über Ihre Erfahrungen. Erzählen Sie von sich, stellen Sie Fragen und reagieren Sie auf das, was Ihre Partnerin / Ihr Partner sagt.",
          task: "Thema: Der erste Arbeitstag in einer neuen Firma\n\n• Wie war Ihr erster Arbeitstag? Wer hat Ihnen geholfen?\n• Was war schwierig oder überraschend?\n• Was hätten Sie sich gewünscht?\n• Welche Tipps haben Sie für neue Kollegen?",
          prompts: [
            "Sie sind Kollegen und sitzen zusammen in der Pause. Erzählen Sie doch mal: Wie war Ihr erster Arbeitstag?",
            "Und jetzt fragen Sie bitte Ihre Partnerin oder Ihren Partner: Wie war das bei ihr oder bei ihm?",
            "Was war für Sie schwierig? Und was hätten Sie sich gewünscht?",
            "Zum Schluss: Welche Tipps geben Sie neuen Kolleginnen und Kollegen?",
          ],
          redemittel: [
            "Bei mir war das so: …",
            "Und wie war das bei dir / Ihnen?",
            "Das kenne ich! / Das war bei mir ganz anders.",
            "Am schwierigsten war für mich …",
            "Ich hätte mir gewünscht, dass …",
            "Mein Tipp ist: …",
          ],
          muster:
            "A: Sag mal, wie war eigentlich dein erster Arbeitstag hier im Hotel?\nB: Ehrlich gesagt war ich sehr nervös. Ich hatte Angst, dass ich etwas falsch mache. Aber eine Kollegin, Ivana, hat mir alles gezeigt. Und bei dir?\nA: Bei mir war das ein bisschen anders. Ich habe in einer Reinigungsfirma angefangen, und am ersten Tag war niemand da, der Zeit hatte. Ich habe nur einen Plan bekommen und musste allein arbeiten.\nB: Oh, das ist ja schwierig! Was war für dich am schwierigsten?\nA: Die vielen Reinigungsmittel. Ich wusste nicht, welches Mittel für welche Fläche ist. Und was war für dich schwierig?\nB: Die Wörter! Alle haben „Housekeeping“, „Turndown“ und so gesagt, und ich habe nichts verstanden.\nA: Das kenne ich. Ich hätte mir gewünscht, dass mir jemand am ersten Tag eine Stunde alles erklärt.\nB: Genau. Mein Tipp für neue Kollegen ist: Immer fragen, auch wenn man denkt, die Frage ist dumm.\nA: Da hast du recht. Und ich würde sagen: Schreib dir wichtige Wörter in ein kleines Heft.\nB: Gute Idee, das mache ich auch immer noch.",
          check: [
            "Eigene Erfahrungen erzählt",
            "Fragen an die Partnerin / den Partner gestellt",
            "Auf die Partnerin / den Partner reagiert (Das kenne ich …)",
            "Wunsch mit „Ich hätte mir gewünscht …“ formuliert",
            "Gesprächsanteile ungefähr gleich verteilt",
          ],
        },
        {
          kind: "speak",
          title: "Sprechen Teil 3: Etwas gemeinsam planen",
          skill: "sprechen",
          pts: 20,
          minutes: 5,
          instr:
            "Nächsten Montag fängt eine neue Kollegin in Ihrem Team an. Ihre Chefin hat Sie beide gebeten, ihre erste Woche zu planen. Machen Sie Vorschläge, reagieren Sie auf die Vorschläge Ihrer Partnerin / Ihres Partners und einigen Sie sich.",
          task: "Einarbeitung der neuen Kollegin Frau Petrova planen\n\n• Wer begleitet sie in der ersten Woche?\n• Was zeigt man ihr am ersten Tag (Rundgang, Pausenraum, Arbeitskleidung …)?\n• Welche Informationen braucht sie (Arbeitszeiten, Sicherheitsregeln, Telefonliste …)?\n• Wann gibt es ein Gespräch, wie die erste Woche war?\n• Wer kümmert sich um was?",
          prompts: [
            "Beginnen Sie bitte. Wer soll Frau Petrova in der ersten Woche begleiten?",
            "Was zeigen Sie ihr denn am ersten Tag?",
            "Welche Informationen und Unterlagen braucht sie noch?",
            "Wann soll es ein Feedbackgespräch geben, und mit wem?",
            "Fassen Sie bitte zum Schluss zusammen: Wer übernimmt welche Aufgabe?",
          ],
          redemittel: [
            "Ich schlage vor, dass …",
            "Wie wäre es, wenn wir …?",
            "Was hältst du / halten Sie davon, wenn …?",
            "Gute Idee! / Das finde ich gut, aber …",
            "Ich bin nicht sicher, ob … Vielleicht besser …",
            "Dann machen wir es so: Du übernimmst …, ich kümmere mich um …",
            "Also, zusammengefasst: …",
          ],
          muster:
            "A: Also, nächsten Montag kommt Frau Petrova. Wer soll sie denn in der ersten Woche begleiten?\nB: Ich schlage vor, dass ich das mache. Ich habe in der ersten Woche Frühschicht, genau wie sie.\nA: Gute Idee. Dann kann ich am Mittwoch und Donnerstag übernehmen, da hast du doch deinen Kurs, oder?\nB: Stimmt, das ist super. Was zeigen wir ihr am ersten Tag?\nA: Wie wäre es mit einem Rundgang durch das ganze Lager? Dann zeigen wir ihr den Pausenraum, die Toiletten und den Verbandkasten.\nB: Ja, und sie braucht am ersten Tag ihre Arbeitskleidung: Sicherheitsschuhe und Warnweste. Darum kümmere ich mich, ich frage am Freitag schon nach ihrer Schuhgröße.\nA: Prima. Und welche Informationen braucht sie?\nB: Auf jeden Fall die Sicherheitsregeln und den Schichtplan. Was hältst du davon, wenn wir ihr auch eine Telefonliste geben, für den Fall, dass sie krank ist?\nA: Das finde ich sehr wichtig. Die Liste mache ich fertig. Sollen wir ihr am ersten Tag schon alles erklären?\nB: Ich bin nicht sicher, ob das gut ist. Das sind zu viele Informationen. Vielleicht besser: am Montag nur Rundgang und Sicherheitsregeln, den Rest am Dienstag.\nA: Einverstanden. Und wann machen wir ein Gespräch, wie die Woche war?\nB: Am Freitag nach der Schicht, mit der Chefin zusammen, ungefähr 20 Minuten.\nA: Gut. Also, zusammengefasst: Du begleitest sie Montag, Dienstag und Freitag und besorgst die Arbeitskleidung. Ich übernehme Mittwoch und Donnerstag und mache die Telefonliste. Am Freitag gibt es das Gespräch mit der Chefin.\nB: Genau, so machen wir es.",
          check: [
            "Eigene Vorschläge gemacht",
            "Auf Vorschläge reagiert (zustimmen, ablehnen mit Grund, Alternative)",
            "Alle Punkte der Aufgabe besprochen",
            "Aufgaben verteilt und am Ende zusammengefasst",
            "Gemeinsam eine Lösung gefunden",
          ],
        },
      ],
    },
  ],

  // ───────────────────────────── VORBEREITUNG ─────────────────────────────
  prep: {
    lead: "Der DTB B1 (Deutsch-Test für den Beruf) prüft Deutsch im Berufsalltag: Stellenanzeigen, Arbeitsanweisungen, Kunden-E-Mails, Telefonnotizen, Gespräche mit Kollegen. Sie brauchen ihn meist am Ende eines Berufssprachkurses B1 oder eines Spezialkurses – und er ist ein guter Nachweis für Bewerbungen.",
    facts: [
      ["Anbieter", "telc gGmbH im Auftrag des BAMF"],
      [
        "Dauer",
        "ca. 95 Minuten schriftlich + ca. 16 Minuten mündlich (Paarprüfung, keine Vorbereitungszeit)",
      ],
      [
        "Punkte",
        "240 Punkte, je Fertigkeit 60: Lesen, Hören, Schreiben, Sprechen",
      ],
      [
        "Bestehen",
        "Wie beim DTB B2 gilt: insgesamt mindestens 60 % (144 Punkte), in mindestens drei Fertigkeiten 60 % und in der vierten mindestens 40 %. Die genaue Bewertung steht in Ihrem Ergebnisbogen.",
      ],
      [
        "Wer braucht sie?",
        "Teilnehmende im Berufssprachkurs B1 oder in Spezialkursen (z. B. Gewerbe/Technik, Pflege) – und alle, die für Arbeitgeber, Jobcenter oder Agentur für Arbeit ihr Berufsdeutsch nachweisen möchten.",
      ],
    ],
    parts: [
      {
        name: "Lesen Teil 1 – Stellenanzeigen",
        skill: "Lesen",
        time: "ca. 10 Min.",
        what: "Sie lesen fünf kurze Situationen und acht Stellenanzeigen. Sie ordnen jeder Person eine Anzeige zu; für eine Person passt oft keine Anzeige (x).",
        steps: [
          "Lesen Sie zuerst die Personen und unterstreichen Sie die Bedingungen: Arbeitszeit, Teilzeit/Vollzeit, Branche, Führerschein/Staplerschein, Ort.",
          "Lesen Sie dann die Anzeigen nur nach diesen Punkten durch (Scanning).",
          "Prüfen Sie jede Bedingung der Person – eine falsche Bedingung reicht, und die Anzeige passt nicht.",
          "Streichen Sie verwendete Anzeigen durch.",
          "Wenn wirklich keine Anzeige alle Bedingungen erfüllt: x.",
        ],
        traps: [
          "Die Branche passt, aber die Arbeitszeit nicht (z. B. Vollzeit statt halbtags).",
          "Gleiche Wörter in Person und Anzeige („Lager“), aber eine Bedingung fehlt (Staplerschein).",
          "Man vergisst die x-Lösung und zwingt eine Anzeige passend.",
        ],
        tip: "Ich sehe oft: Die Leute lesen die Anzeigen ganz genau – das kostet Zeit. Lesen Sie die Personen genau und die Anzeigen nur suchend.",
        mini: {
          instr:
            "Welche Anzeige passt? Für eine Person gibt es keine passende Anzeige (x).",
          material: [
            {
              h: "a) Pflegedienst Sonnenschein",
              t: "Pflegehelfer/in, Teilzeit vormittags, Führerschein Klasse B nötig.",
            },
            {
              h: "b) Café Mühlenhof",
              t: "Servicekraft am Wochenende, Sa + So 10–18 Uhr, Erfahrung nicht nötig.",
            },
            {
              h: "c) Autohaus Becker",
              t: "Fahrzeugpfleger/in Vollzeit, Mo–Fr 7–16 Uhr.",
            },
          ],
          opts: [
            "a) Pflegedienst Sonnenschein",
            "b) Café Mühlenhof",
            "c) Autohaus Becker",
            "x) keine passende Anzeige",
          ],
          items: [
            {
              q: "Herr Ali studiert unter der Woche und sucht einen Job für das Wochenende.",
              a: 1,
              why: "Café Mühlenhof: nur Samstag und Sonntag.",
            },
            {
              q: "Frau Lukas möchte vormittags in der Pflege arbeiten, hat aber keinen Führerschein.",
              a: 3,
              why: "Der Pflegedienst verlangt einen Führerschein – also x.",
            },
          ],
        },
      },
      {
        name: "Lesen Teil 2 – Informationen zu Weiterbildungen",
        skill: "Lesen",
        time: "ca. 10 Min.",
        what: "Sie lesen einen längeren Informationstext, z. B. ein Kursprogramm. Zu vier Aussagen wählen Sie a, b oder c.",
        steps: [
          "Lesen Sie zuerst die Aufgabe und markieren Sie das Schlüsselwort (z. B. „Excel“, „Anmeldung“).",
          "Suchen Sie im Text den passenden Abschnitt (Überschriften helfen).",
          "Lesen Sie diesen Abschnitt genau und vergleichen Sie jede Option.",
          "Achten Sie auf kleine Wörter: nur, immer, auch, nicht, meistens.",
        ],
        traps: [
          "„Viele Firmen übernehmen die Kosten“ ≠ „Die Firma bezahlt immer“.",
          "Eine Option nennt Informationen aus einem anderen Kurs.",
          "Zahlen und Tage werden vertauscht (zwei Wochen / sieben Tage).",
        ],
        tip: "Wörter wie „immer“, „nur“ oder „alle“ in einer Option sind oft ein Warnsignal. Prüfen Sie, ob der Text wirklich so absolut ist.",
        mini: {
          instr: "Lesen Sie den Text. Welche Antwort passt?",
          material: [
            {
              h: "Kurs „Kundenkommunikation“",
              t: "Der Kurs findet an zwei Samstagen statt. Die Kosten (120 Euro) übernimmt in vielen Fällen der Arbeitgeber. Eine Anmeldung ist nur online möglich, bis eine Woche vor Kursbeginn.",
            },
          ],
          items: [
            {
              q: "Der Kurs …",
              opts: [
                "a) ist kostenlos.",
                "b) wird manchmal vom Arbeitgeber bezahlt.",
                "c) dauert eine Woche.",
              ],
              a: 1,
              why: "„Die Kosten … übernimmt in vielen Fällen der Arbeitgeber“ – also oft, aber nicht immer.",
            },
            {
              q: "Anmelden kann man sich …",
              opts: [
                "a) nur im Internet.",
                "b) auch am ersten Kurstag.",
                "c) telefonisch.",
              ],
              a: 0,
              why: "„Eine Anmeldung ist nur online möglich.“",
            },
          ],
        },
      },
      {
        name: "Lesen Teil 3 – Arbeitsanweisungen verstehen",
        skill: "Lesen",
        time: "ca. 10 Min.",
        what: "Sie lesen eine Anweisung aus dem Betrieb, z. B. Sicherheitsregeln, einen Hygieneplan oder eine Bedienungsanleitung. Vier Aufgaben a/b/c.",
        steps: [
          "Lesen Sie die Frage und stellen Sie sich die Situation vor: Was muss ich tun?",
          "Suchen Sie den passenden Punkt in der Anweisung.",
          "Achten Sie auf Verbote und Pflichten: muss, darf nicht, nur, nie, sofort.",
          "Prüfen Sie, wer etwas tut (ich? der Schichtleiter? die Qualitätskontrolle?).",
        ],
        traps: [
          "Eine Option nennt eine Handlung aus dem Text, aber eine andere Person macht sie.",
          "„auch nicht für ein paar Minuten“ wird überlesen.",
          "Zwei Schritte gehören zusammen, eine Option nennt nur einen.",
        ],
        tip: "In Arbeitsanweisungen ist jedes kleine Wort wichtig – genau wie im echten Betrieb. Lesen Sie Verneinungen zweimal.",
        mini: {
          instr: "Lesen Sie die Anweisung. Welche Antwort passt?",
          material: [
            {
              h: "Hygieneplan Küche",
              t: "Hände vor Arbeitsbeginn und nach jeder Pause waschen. Schmuck ablegen – Eheringe sind erlaubt. Kranke Mitarbeitende melden sich vor Schichtbeginn telefonisch bei der Küchenleitung.",
            },
          ],
          items: [
            {
              q: "Was gilt für Schmuck?",
              opts: [
                "a) Jeder Schmuck ist verboten.",
                "b) Man darf den Ehering tragen.",
                "c) Schmuck muss man nach der Pause waschen.",
              ],
              a: 1,
              why: "„Eheringe sind erlaubt.“",
            },
            {
              q: "Sie sind krank. Was tun Sie?",
              opts: [
                "a) Ich schreibe nach der Schicht eine E-Mail.",
                "b) Ich sage es einem Kollegen.",
                "c) Ich rufe vor der Schicht die Küchenleitung an.",
              ],
              a: 2,
              why: "„… melden sich vor Schichtbeginn telefonisch bei der Küchenleitung.“",
            },
          ],
        },
      },
      {
        name: "Lesen Teil 4 – Aufgaben und Aufgabenverteilung",
        skill: "Lesen",
        time: "ca. 10 Min.",
        what: "Sie lesen eine E-Mail, Notiz oder einen Plan der Teamleitung. Zu fünf Aussagen entscheiden Sie: richtig oder falsch.",
        steps: [
          "Lesen Sie die Aussage und markieren Sie Person, Tag, Uhrzeit, Aufgabe.",
          "Suchen Sie die Stelle im Text.",
          "Vergleichen Sie genau: Wer macht was, wann?",
          "Nur wenn alles stimmt: richtig.",
        ],
        traps: [
          "Namen und Aufgaben werden vertauscht.",
          "„ab sofort nicht mehr“ – eine alte Regel gilt nicht mehr.",
          "Fristen: „bis zum 15.“ und „danach nicht mehr“.",
        ],
        tip: "Machen Sie sich eine kleine Tabelle im Kopf: Wer? – Was? – Wann? Dann sehen Sie Vertauschungen sofort.",
        mini: {
          instr: "Richtig oder falsch?",
          material: [
            {
              h: "Notiz der Teamleitung",
              t: "Diese Woche macht Herr Kaya den Wareneingang, Frau Lis den Versand. Ab Montag gibt es Kaffee nicht mehr gratis – 50 Cent pro Tasse.",
            },
          ],
          opts: ["Richtig", "Falsch"],
          items: [
            {
              q: "Frau Lis arbeitet diese Woche im Wareneingang.",
              a: 1,
              why: "Frau Lis macht den Versand.",
            },
            {
              q: "Ab Montag muss man für Kaffee bezahlen.",
              a: 0,
              why: "„Ab Montag … nicht mehr gratis – 50 Cent pro Tasse.“",
            },
          ],
        },
      },
      {
        name: "Lesen und Schreiben Teil 1 – Kundenanfrage verstehen",
        skill: "Lesen",
        time: "ca. 5 Min.",
        what: "Sie lesen eine Kunden-E-Mail und eine Notiz Ihrer Chefin. Zwei Fragen a/b/c zeigen, ob Sie das Anliegen verstanden haben.",
        steps: [
          "Lesen Sie die Kunden-E-Mail: Was ist das Problem? Was wünscht der Kunde zusätzlich?",
          "Lesen Sie die Notiz der Chefin – sie ist die Grundlage für Teil 2.",
          "Beantworten Sie die zwei Fragen.",
          "Markieren Sie schon jetzt alle Punkte der Notiz für Ihre Antwort.",
        ],
        traps: [
          "Eine Option übertreibt (Kündigung), obwohl der Kunde zufrieden war.",
          "Ein Wort aus dem Text (Mülleimer) wird falsch verwendet („kaputt“).",
        ],
        tip: "Diese zwei Aufgaben sind schnelle Punkte. Nutzen Sie die Zeit vor allem für die Antwort-E-Mail.",
        mini: {
          instr: "Welche Antwort passt?",
          material: [
            {
              h: "Kunden-E-Mail",
              t: "Die bestellten Stühle sind gestern angekommen, aber zwei sind beschädigt. Bitte schicken Sie Ersatz. Außerdem möchte ich noch zwei Tische bestellen.",
            },
          ],
          items: [
            {
              q: "Was ist das Problem?",
              opts: [
                "a) Die Lieferung kam zu spät.",
                "b) Zwei Stühle sind kaputt.",
                "c) Es fehlen zwei Tische.",
              ],
              a: 1,
              why: "„zwei sind beschädigt“",
            },
            {
              q: "Was möchte der Kunde außerdem?",
              opts: [
                "a) Weitere Möbel bestellen.",
                "b) Sein Geld zurück.",
                "c) Die Stühle selbst abholen.",
              ],
              a: 0,
              why: "„Außerdem möchte ich noch zwei Tische bestellen.“",
            },
          ],
        },
      },
      {
        name: "Lesen und Schreiben Teil 2 – Antwort-E-Mail an Kunden",
        skill: "Schreiben",
        time: "ca. 15 Min.",
        what: "Sie schreiben eine Antwort an den Kunden und setzen alle Punkte aus der Notiz Ihrer Chefin um (mind. 70 Wörter).",
        steps: [
          "Machen Sie aus jedem Punkt der Notiz einen Satz – Reihenfolge der Notiz übernehmen.",
          "Formelle Anrede, Dank für die E-Mail, Entschuldigung.",
          "Konkrete Angaben (Tag, Uhrzeit, Telefonnummer) genau abschreiben.",
          "Freundlicher Schluss + „Mit freundlichen Grüßen“ + Name + Firma.",
          "Am Ende: Alle Notizpunkte abhaken, Zahlen prüfen.",
        ],
        traps: [
          "Ein Punkt der Notiz wird vergessen (z. B. Telefonnummer).",
          "Sie-Form und du-Form gemischt.",
          "Notiz-Stil wird abgeschrieben („Samstag: Dezember nein“) statt ganzer Sätze.",
        ],
        tip: "Die Notiz ist Ihre Checkliste. Wer alle Punkte in ganzen, höflichen Sätzen bringt, hat schon den größten Teil der Punkte.",
      },
      {
        name: "Hören Teil 1 – Arbeitsabläufe, Probleme, Vorschläge",
        skill: "Hören",
        time: "ca. 6 Min.",
        what: "Vier kurze Gespräche unter Kollegen. Zu jedem Gespräch eine Richtig/Falsch-Aussage und eine Frage a/b/c. Sie hören nur einmal.",
        steps: [
          "Lesen Sie vor jedem Gespräch beide Aufgaben.",
          "Achten Sie auf Problem und Lösung: Was ist kaputt/falsch? Wer macht was?",
          "Achten Sie auf Korrekturen: „nicht …, sondern …“, „das nicht, aber …“.",
          "Entscheiden Sie sofort und gehen Sie weiter.",
        ],
        traps: [
          "Ein Vorschlag wird abgelehnt („Nein, nein, … dann red ich selbst mit ihr“).",
          "Was heute passiert und was morgen passiert, wird vermischt.",
          "„schon wieder“, „auch letzte Woche“ zeigen: nicht zum ersten Mal.",
        ],
        tip: "Bei einmaligem Hören gilt: Lieber eine schnelle Entscheidung als hängen bleiben – sonst verpassen Sie das nächste Gespräch.",
        mini: {
          instr: "Sie hören ein Gespräch einmal. Lösen Sie die Aufgaben.",
          audio: [
            {
              h: "Gespräch",
              lines: [
                {
                  s: "f",
                  t: "Kemal, die Spülmaschine in der Küche läuft nicht. Hast du schon den Techniker angerufen?",
                },
                {
                  s: "m",
                  t: "Echt? Nein, noch nicht. Ich ruf gleich an. Bis dahin spülen wir halt per Hand, oder?",
                },
                {
                  s: "f",
                  t: "Nee, das schaffen wir nicht, heute Mittag ist alles voll. Nimm lieber das Einweggeschirr aus dem Lager. Nur für heute.",
                },
              ],
            },
          ],
          plays: 1,
          items: [
            {
              q: "Kemal hat den Techniker schon angerufen.",
              opts: ["Richtig", "Falsch"],
              a: 1,
              why: "„Nein, noch nicht. Ich ruf gleich an.“",
            },
            {
              q: "Was machen sie heute?",
              opts: [
                "a) Sie spülen per Hand.",
                "b) Sie benutzen Einweggeschirr.",
                "c) Sie schließen die Küche.",
              ],
              a: 1,
              why: "„Nimm lieber das Einweggeschirr …“ – per Hand wird abgelehnt.",
            },
          ],
        },
      },
      {
        name: "Hören Teil 2 – Meinungen",
        skill: "Hören",
        time: "ca. 4 Min.",
        what: "Sie hören eine Teambesprechung. Sie ordnen zwei Personen die passende Meinung zu; zwei Aussagen bleiben übrig.",
        steps: [
          "Lesen Sie die vier Aussagen und merken Sie sich die Schlüsselwörter.",
          "Notieren Sie beim Hören zu jedem Namen ein Stichwort.",
          "Unterscheiden Sie: Wer sagt seine eigene Meinung, wer gibt nur Informationen (oft die Chefin)?",
          "Achten Sie auf Sätze mit „Ich finde …“, „Mein Problem ist …“, „Für mich ist wichtig …“.",
        ],
        traps: [
          "Eine Aussage stammt von der Chefin, nicht von den gesuchten Personen.",
          "Eine Person nennt ein Thema, hat aber eine andere Meinung dazu.",
          "Eine Aussage sagt niemand – sie klingt aber logisch.",
        ],
        tip: "Die Chefin stellt meist das Thema vor. Die Meinungen der Kollegen kommen danach – da genau zuhören.",
        mini: {
          instr: "Wer meint was? Eine Aussage passt nicht.",
          audio: [
            {
              h: "Besprechung",
              lines: [
                {
                  s: "f",
                  t: "So, kurz noch zur Weihnachtsfeier. Wir überlegen, die dieses Jahr hier im Betrieb zu machen, statt im Restaurant. Was meint ihr?",
                },
                {
                  s: "m",
                  t: "Also, im Betrieb ist es mir ehrlich gesagt zu ungemütlich. Ich bin fürs Restaurant.",
                },
                {
                  s: "f2",
                  t: "Hm, mir ist der Ort eigentlich egal. Hauptsache, die Feier ist nicht am Freitag, da kann ich nie.",
                },
              ],
            },
          ],
          plays: 1,
          opts: [
            "a) Die Feier soll im Restaurant sein.",
            "b) Der Tag ist wichtiger als der Ort.",
            "c) Die Feier soll ausfallen.",
          ],
          items: [
            {
              q: "Der Kollege (Mann)",
              a: 0,
              why: "„Ich bin fürs Restaurant.“",
            },
            {
              q: "Die Kollegin",
              a: 1,
              why: "„Mir ist der Ort eigentlich egal. Hauptsache, … nicht am Freitag.“",
            },
          ],
        },
      },
      {
        name: "Hören Teil 3 – Gespräche über Produkte und Abläufe",
        skill: "Hören",
        time: "ca. 4 Min.",
        what: "Zwei Gespräche, z. B. eine Einweisung in ein Gerät oder ein Verkaufsgespräch. Je zwei Fragen a/b/c, einmal hören.",
        steps: [
          "Lesen Sie die Fragen: Geht es um einen Ablauf (zuerst, dann) oder um ein Produkt (Preis, Unterschied)?",
          "Bei Produkten: Merken Sie, welche Eigenschaft zu welchem Produkt gehört.",
          "Bei Abläufen: Achten Sie auf Bedingungen („wenn …, dann …“).",
          "Achten Sie auf die Entscheidung am Ende des Gesprächs.",
        ],
        traps: [
          "Eigenschaften von zwei Produkten werden vertauscht.",
          "Eine Möglichkeit wird genannt (Lieferung), aber nicht gewählt.",
          "Ausnahme-Regeln (verlorene Karte) werden mit der Hauptregel verwechselt.",
        ],
        tip: "Verkaufsgespräche enden fast immer mit einer Entscheidung – die letzte Aussage der Kundin ist oft die Lösung.",
        mini: {
          instr: "Sie hören ein Gespräch einmal. Welche Antwort passt?",
          audio: [
            {
              h: "Einweisung",
              lines: [
                {
                  s: "m",
                  t: "So, das ist die neue Kaffeemaschine. Morgens drücken Sie zuerst den grünen Knopf hier, und dann warten Sie zwei Minuten.",
                },
                { s: "f", t: "Okay. Und abends? Einfach ausschalten?" },
                {
                  s: "m",
                  t: "Nein, abends nur den Wassertank leeren. Die Maschine bleibt an, die geht nachts automatisch aus.",
                },
              ],
            },
          ],
          plays: 1,
          items: [
            {
              q: "Was macht man abends?",
              opts: [
                "a) Den grünen Knopf drücken.",
                "b) Die Maschine ausschalten.",
                "c) Den Wassertank leeren.",
              ],
              a: 2,
              why: "„Nein, abends nur den Wassertank leeren. Die Maschine bleibt an …“",
            },
          ],
        },
      },
      {
        name: "Hören Teil 4 – Anliegen",
        skill: "Hören",
        time: "ca. 6 Min.",
        what: "Fünf Nachrichten auf dem Anrufbeantworter oder der Mailbox. Zu jeder Nachricht eine Frage a/b/c. Sie hören zweimal.",
        steps: [
          "Lesen Sie die Frage: Was soll man tun? Was ändert sich? Was soll man mitbringen?",
          "Beim ersten Hören: Antwort wählen.",
          "Beim zweiten Hören: kontrollieren, besonders Korrekturen („nicht …, sondern …“).",
          "Achten Sie darauf, wer was macht.",
        ],
        traps: [
          "Gegenstände, die man vor Ort bekommt (Warnweste), statt solche, die man mitbringt.",
          "„Die Uhrzeit bleibt gleich“ – die Uhrzeit wird genannt, ändert sich aber nicht.",
          "Etwas ist schon erledigt („Mit Herrn Stein hab ich schon gesprochen“).",
        ],
        tip: "Mailbox-Nachrichten enden meistens mit der Bitte. Hören Sie das Ende beim zweiten Mal besonders genau.",
        mini: {
          instr: "Sie hören eine Nachricht zweimal. Welche Antwort passt?",
          audio: [
            {
              h: "Nachricht",
              lines: [
                {
                  s: "f",
                  t: "Ja, hallo, Herr Ivanov, hier ist Frau Holt vom Personalbüro. Ich wollte nur kurz Bescheid sagen: Ihr Vorstellungsgespräch ist nicht um neun, sondern um elf Uhr. Also um elf. Und bitte bringen Sie Ihre Zeugnisse mit. Kaffee gibt's bei uns, keine Sorge! Tschüss.",
                },
              ],
            },
          ],
          plays: 2,
          items: [
            {
              q: "Was ändert sich?",
              opts: ["a) Die Uhrzeit.", "b) Der Tag.", "c) Der Ort."],
              a: 0,
              why: "„nicht um neun, sondern um elf Uhr“",
            },
            {
              q: "Was soll Herr Ivanov mitbringen?",
              opts: ["a) Kaffee.", "b) Seine Zeugnisse.", "c) Seinen Ausweis."],
              a: 1,
              why: "„Bitte bringen Sie Ihre Zeugnisse mit.“",
            },
          ],
        },
      },
      {
        name: "Hören und Schreiben Teil 1 – Telefonat verstehen",
        skill: "Hören",
        time: "ca. 2 Min.",
        what: "Sie hören ein Kundentelefonat zweimal und beantworten eine Frage a/b/c zum Anliegen.",
        steps: [
          "Lesen Sie die Frage und die Felder der Notiz (Teil 2) schon vor dem Hören.",
          "Notieren Sie beim ersten Hören Stichpunkte: Name, Firma, Zahlen.",
          "Achten Sie auf Selbstkorrekturen der Anruferin.",
          "Beantworten Sie die Frage nach dem Gesamtanliegen.",
        ],
        traps: [
          "Die Anruferin korrigiert sich („zwei Nächte … nein, eine Nacht“).",
          "Eine Option nennt ein Detail, aber nicht das ganze Anliegen.",
        ],
        tip: "Diese Aufgabe und die Notiz gehören zusammen: Ihre Stichpunkte aus dem ersten Hören sind schon die halbe Notiz.",
        mini: {
          instr: "Sie hören ein Telefonat. Welche Antwort passt?",
          audio: [
            {
              h: "Telefonat",
              lines: [
                {
                  s: "m",
                  t: "Ja, guten Tag, Berger hier, von der Firma Optik Klar. Äh, wir bräuchten nächste Woche jemanden für die Fensterreinigung in unserem Geschäft. Am Dienstag … ach nein, Mittwoch. Am Mittwoch, und zwar vor neun Uhr, bevor wir aufmachen.",
                },
              ],
            },
          ],
          plays: 2,
          items: [
            {
              q: "Was möchte Herr Berger?",
              opts: [
                "a) Eine Fensterreinigung am Dienstag.",
                "b) Eine Fensterreinigung am Mittwoch früh.",
                "c) Eine Brille bestellen.",
              ],
              a: 1,
              why: "Er korrigiert sich: „Am Dienstag … ach nein, Mittwoch“ – und zwar vor neun Uhr.",
            },
          ],
        },
      },
      {
        name: "Hören und Schreiben Teil 2 – Gesprächsnotiz",
        skill: "Schreiben",
        time: "ca. 3 Min.",
        what: "Sie hören das Telefonat noch einmal und schreiben eine Notiz für eine Kollegin / einen Kollegen: Wer? Anliegen, Termin/Details, Was tun?",
        steps: [
          "Stichpunkte genügen – keine ganzen Sätze nötig.",
          "Name, Firma und Telefonnummer vollständig und korrekt notieren.",
          "Zahlen (Personen, Datum, Uhrzeit) beim zweiten Hören kontrollieren.",
          "Bei „Was tun?“ eine klare Handlung: zurückrufen, Angebot schicken, Termin bestätigen …",
        ],
        traps: [
          "Telefonnummer unvollständig oder mit Zahlendreher.",
          "Die korrigierte Information wird nicht notiert.",
          "Zu lange Sätze – dann fehlt die Zeit für wichtige Details.",
        ],
        tip: "Eine gute Notiz kann die Kollegin lesen, ohne nachzufragen. Fragen Sie sich am Ende: Kann sie jetzt sofort handeln?",
      },
      {
        name: "Sprachbausteine Teil 1 – Auf Anfragen reagieren",
        skill: "Schreiben",
        time: "ca. 4 Min.",
        what: "Eine E-Mail mit sechs Lücken. Sie wählen jeweils die passende Formulierung (a, b oder c) – Grammatik und typische Wendungen für Anfragen, Bitten und Vorschläge.",
        steps: [
          "Lesen Sie den ganzen Satz – auch nach der Lücke (Verb am Ende = Nebensatz).",
          "Überlegen Sie die Funktion: Bitte? Vorschlag? Grund? Zustimmung?",
          "Prüfen Sie feste Verbindungen: sich freuen auf, warten auf, nachfragen ob.",
          "Setzen Sie die Option ein und lesen Sie laut im Kopf.",
        ],
        traps: [
          "Konnektoren mit anderer Wortstellung (deshalb vs. weil).",
          "Falsche Präposition in festen Ausdrücken.",
          "Eine Option ist grammatisch richtig, passt aber nicht zur Bedeutung (Ich bezweifle …).",
        ],
        tip: "Hier gibt es nur je einen Punkt – nicht zu lange überlegen. Lieber am Ende mehr Zeit für den Chat-Text.",
        mini: {
          instr: "Welche Lösung passt in die Lücken?",
          material: [
            {
              h: "Kurze E-Mail",
              t: "Liebe Frau Kraus,\nich habe eine Bitte: {1} Sie mir bitte den neuen Schichtplan schicken? Ich kann am Montag nicht, {2} ich einen Termin beim Amt habe.\nViele Grüße",
            },
          ],
          items: [
            {
              q: "",
              opts: ["a) Könnten", "b) Hätten", "c) Wären"],
              a: 0,
              why: "Höfliche Bitte: Könnten Sie … schicken?",
            },
            {
              q: "",
              opts: ["a) deshalb", "b) trotzdem", "c) weil"],
              a: 2,
              why: "Grund, Verb am Ende: weil.",
            },
          ],
        },
      },
      {
        name: "Sprachbausteine und Schreiben Teil 2 – Meinung im Team-Chat",
        skill: "Schreiben",
        time: "ca. 6 Min.",
        what: "Sie antworten kurz (mind. 40 Wörter) im Team-Chat oder Intranet auf einen Vorschlag und begründen Ihre Meinung.",
        steps: [
          "Kurz grüßen und Bezug nehmen („danke für die Frage“).",
          "Meinung in einem Satz sagen.",
          "Mit weil/denn einen Grund nennen, ggf. einen Nachteil.",
          "Einen konkreten Vorschlag machen.",
          "Kurzer Gruß und Name.",
        ],
        traps: [
          "Nur „Gute Idee!“ ohne Begründung.",
          "Zu formell (Sehr geehrte …) – im Chat ist ein kollegialer Ton richtig, aber höflich.",
          "Den Vorschlag der Chefin falsch verstanden.",
        ],
        tip: "Drei Bausteine reichen: Meinung – Grund – Vorschlag. Das sind schnell 50 Wörter.",
      },
      {
        name: "Sprechen Teil 1A – Über ein Thema sprechen",
        skill: "Sprechen",
        time: "ca. 2 Min.",
        what: "Sie sprechen ca. eine Minute allein über ein Thema aus dem Berufsleben, z. B. „Arbeiten im Team“ oder „Mein Arbeitsweg“. Stichpunkte helfen.",
        steps: [
          "Einleitung: „Ich möchte etwas über … erzählen.“",
          "Jeden Stichpunkt mit 2–3 Sätzen bearbeiten.",
          "Ein konkretes Beispiel aus Ihrem Arbeitsleben bringen.",
          "Mit einem Satz abschließen.",
        ],
        traps: [
          "Nur Stichpunkte vorlesen statt erzählen.",
          "Zu kurz (20 Sekunden) – dann fehlen Punkte.",
          "Auswendig gelernter Text, der nicht zum Thema passt.",
        ],
        tip: "Bereiten Sie zu Themen wie Arbeitsweg, Arbeitszeit, Team, Weiterbildung, Kunden je ein kleines Beispiel aus Ihrem Leben vor.",
      },
      {
        name: "Sprechen Teil 1B – Fragen beantworten",
        skill: "Sprechen",
        time: "ca. 2 Min.",
        what: "Die Prüfenden stellen Ihnen Fragen zu Ihrem Thema. Sie antworten spontan und begründen.",
        steps: [
          "Gut zuhören – bei Unklarheit nachfragen.",
          "Direkt antworten, dann begründen (weil, denn).",
          "Ein Beispiel nennen.",
          "Ganze Sätze sprechen.",
        ],
        traps: [
          "Nur „Ja“ oder „Nein“ antworten.",
          "Eine andere Frage beantworten als die gestellte.",
        ],
        tip: "Nachfragen ist erlaubt und zeigt Kommunikationsfähigkeit: „Meinen Sie …?“ ist besser als eine falsche Antwort.",
      },
      {
        name: "Sprechen Teil 2 – Erfahrungen austauschen",
        skill: "Sprechen",
        time: "ca. 4 Min.",
        what: "Sie sprechen mit Ihrer Partnerin / Ihrem Partner wie unter Kollegen über Erfahrungen, z. B. den ersten Arbeitstag.",
        steps: [
          "Erzählen Sie kurz von sich.",
          "Stellen Sie Fragen: „Und wie war das bei dir?“",
          "Reagieren Sie: „Das kenne ich!“, „Das war bei mir anders.“",
          "Sprechen Sie über Wünsche und Tipps.",
        ],
        traps: [
          "Zwei Monologe nacheinander statt Gespräch.",
          "Eine Person spricht viel länger als die andere.",
        ],
        tip: "Bewertet wird das Gespräch. Eine gute Frage an die Partnerin ist genauso viel wert wie ein langer eigener Satz.",
      },
      {
        name: "Sprechen Teil 3 – Etwas gemeinsam planen",
        skill: "Sprechen",
        time: "ca. 5 Min.",
        what: "Sie planen mit Ihrer Partnerin / Ihrem Partner etwas im Betrieb, z. B. die Einarbeitung einer neuen Kollegin oder ein Betriebsfest. Sie machen Vorschläge und einigen sich.",
        steps: [
          "Mit einem Vorschlag beginnen („Ich schlage vor, dass …“).",
          "Auf jeden Vorschlag reagieren: zustimmen oder höflich ablehnen + Alternative.",
          "Alle Punkte der Aufgabenkarte besprechen.",
          "Aufgaben verteilen: „Du übernimmst …, ich kümmere mich um …“.",
          "Am Ende zusammenfassen.",
        ],
        traps: [
          "Immer nur „Ja, gut“ – ohne eigene Ideen.",
          "Punkte der Aufgabenkarte vergessen.",
          "Keine Einigung am Ende.",
        ],
        tip: "Ein freundliches „Ich bin nicht sicher, ob … Vielleicht besser …“ zeigt mehr Sprachkönnen als immer nur Zustimmung.",
      },
    ],
    redemittel: [
      {
        h: "E-Mail an Kunden beantworten",
        list: [
          "Sehr geehrte Frau … / Sehr geehrter Herr …,",
          "vielen Dank für Ihre E-Mail.",
          "Es tut uns sehr leid, dass …",
          "Der Grund dafür war, dass …",
          "Als Entschuldigung möchten wir Ihnen … anbieten.",
          "Zu Ihrer Frage nach …: …",
          "Bei Fragen erreichen Sie uns unter …",
          "Mit freundlichen Grüßen",
        ],
      },
      {
        h: "Gesprächsnotiz schreiben",
        list: [
          "Anruf von: … (Firma …), Tel. …",
          "Anliegen: möchte … / fragt nach …",
          "Termin: am … um …",
          "Bitte zurückrufen bis …",
          "Bitte Angebot schicken an …",
          "Notiert von: …, Datum, Uhrzeit",
        ],
      },
      {
        h: "Meinung im Team-Chat",
        list: [
          "Danke für die Frage / die Idee!",
          "Ich finde die Idee gut / nicht so gut, weil …",
          "Meiner Meinung nach …",
          "Ein Vorteil / Nachteil ist, dass …",
          "Ich schlage vor, dass …",
          "Was haltet ihr davon?",
        ],
      },
      {
        h: "Auf Anfragen und Vorschläge reagieren",
        list: [
          "Ich würde gern … übernehmen.",
          "Das ist kein Problem.",
          "Leider kann ich …, weil …",
          "Könnten Sie mir bitte … ?",
          "Ich wollte noch kurz nachfragen, ob …",
          "Ich freue mich auf Ihre Antwort.",
        ],
      },
      {
        h: "Sprechen: planen und vorschlagen",
        list: [
          "Ich schlage vor, dass …",
          "Wie wäre es, wenn …?",
          "Was hältst du davon, wenn …?",
          "Das ist eine gute Idee. / Da bin ich einverstanden.",
          "Ich bin nicht sicher, ob … Vielleicht besser …",
          "Wer kümmert sich um …?",
          "Also, zusammengefasst: …",
        ],
      },
      {
        h: "Sprechen: Erfahrungen austauschen",
        list: [
          "Bei mir war das so: …",
          "Und wie war das bei dir?",
          "Das kenne ich! / Das war bei mir ganz anders.",
          "Am schwierigsten war für mich …",
          "Ich hätte mir gewünscht, dass …",
          "Mein Tipp ist: …",
        ],
      },
    ],
    fehler: [
      [
        "Ich kann nicht kommen, weil ich habe einen Arzttermin.",
        "Ich kann nicht kommen, weil ich einen Arzttermin habe.",
        "Nach weil steht das Verb am Ende.",
      ],
      [
        "Deshalb ich komme später.",
        "Deshalb komme ich später.",
        "Nach deshalb kommt sofort das Verb (Position 2).",
      ],
      [
        "Ich freue mich für Ihre Antwort.",
        "Ich freue mich auf Ihre Antwort.",
        "Auf etwas in der Zukunft: sich freuen auf.",
      ],
      [
        "Sehr geehrte Frau Berger, danke für deine E-Mail.",
        "Sehr geehrte Frau Berger, vielen Dank für Ihre E-Mail.",
        "Formelle Anrede = Sie-Form durchgehend.",
      ],
      [
        "Ich habe gestern bis 22 Uhr gearbeiten.",
        "Ich habe gestern bis 22 Uhr gearbeitet.",
        "Partizip II von arbeiten: gearbeitet.",
      ],
      [
        "Ich arbeite hier seit zwei Jahre.",
        "Ich arbeite hier seit zwei Jahren.",
        "seit + Dativ: zwei Jahren.",
      ],
      [
        "Wir müssen die Kartons zu zwei heben.",
        "Wir müssen die Kartons zu zweit heben.",
        "Feste Form: zu zweit, zu dritt.",
      ],
      [
        "Ich habe mit dem Chef gesprechen.",
        "Ich habe mit dem Chef gesprochen.",
        "sprechen – sprach – gesprochen.",
      ],
      [
        "Können Sie mir sagen, wann beginnt die Schulung?",
        "Können Sie mir sagen, wann die Schulung beginnt?",
        "Indirekte Frage: Verb am Ende.",
      ],
      [
        "Ich bin einverstanden mit dir Vorschlag.",
        "Ich bin mit deinem Vorschlag einverstanden.",
        "mit + Dativ, Possessivartikel dekliniert.",
      ],
    ],
    plan: [
      {
        w: "Woche 1",
        tasks: [
          "Prüfungsaufbau kennenlernen: diese Simulation einmal ohne Zeitdruck durchsehen.",
          "Lesen Teil 1 und 4 üben: echte Stellenanzeigen aus dem Internet lesen und Bedingungen markieren.",
          "Wortschatz Arbeitswelt: Schicht, Vertretung, Einarbeitung, Lieferung, Angebot – Liste anlegen.",
          "Sprechen 1A: Zu drei Berufsthemen je eine Minute frei sprechen und mit dem Handy aufnehmen.",
          "Redemittel „E-Mail an Kunden“ lernen.",
        ],
      },
      {
        w: "Woche 2",
        tasks: [
          "Lesen Teil 2 und 3 üben: Hausordnungen, Hygienepläne, Kursprogramme lesen.",
          "Zwei Antwort-E-Mails an Kunden schreiben (70–100 Wörter) und mit der Checkliste prüfen.",
          "Hören: täglich 10 Minuten Mailbox-Nachrichten / Durchsagen hören und Stichpunkte machen.",
          "Grammatik: Nebensätze mit weil, dass, ob, wenn wiederholen.",
          "Sprechen 2: mit einer Lernpartnerin Erfahrungen austauschen (erster Arbeitstag, Pausen, Kunden).",
        ],
      },
      {
        w: "Woche 3",
        tasks: [
          "Hören Teil 1–3 mit nur einmaligem Hören trainieren.",
          "Gesprächsnotizen schreiben: Telefonnummern und Daten diktieren lassen.",
          "Sprachbausteine: feste Verbindungen (sich freuen auf, warten auf, sich kümmern um) üben.",
          "Zwei Chat-Nachrichten mit Meinung + Grund + Vorschlag schreiben.",
          "Sprechen 3: zwei Planungsaufgaben durchspielen (Einarbeitung, Betriebsfest).",
        ],
      },
      {
        w: "Woche 4",
        tasks: [
          "Komplette Simulation mit Zeitvorgabe machen.",
          "Fehler analysieren: Welcher Teil kostet die meisten Punkte?",
          "Schwächsten Teil gezielt wiederholen.",
          "Mündliche Prüfung mit Partner/in in Originalzeit durchspielen.",
          "Am Tag vorher: Ausweis, Einladung, Stifte bereitlegen, früh schlafen.",
        ],
      },
    ],
  },
};
