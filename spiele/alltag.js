/* Lernspiele Alltagswortschatz: Reisen, Einkaufen, Ämter, Arzt, Wohnung (spiele.js / DMGame, spiele/kit.js / DMKit) */
(() => {
  if (!window.DMGame || !window.DMKit) return;

  /* Wort-Sprint: Thema → [Bild, Erklärung, Wort] */
  const SPRINT = {
    reisen: ['Reisen & Verkehr', [
      ['🎫', 'Das brauche ich im Bus oder Zug. Ohne sie fahre ich schwarz.', 'die Fahrkarte'],
      ['🛤️', 'Auf der Anzeige steht: „Abfahrt von ___ 7“.', 'das Gleis'],
      ['⏰', 'Der Zug kommt 20 Minuten zu spät.', 'die Verspätung'],
      ['🔁', 'In Köln wechsle ich in einen anderen Zug.', 'umsteigen'],
      ['🧳', 'Darin sind meine Kleider für die Reise.', 'der Koffer'],
      ['🛂', 'Dieses Dokument brauche ich für Reisen in viele andere Länder.', 'der Reisepass'],
      ['🏨', 'Hier schlafe ich im Urlaub: Hotel, Pension oder Ferienwohnung.', 'die Unterkunft'],
      ['↔️', 'Ich fahre nach Köln und am Abend wieder nach Hause.', 'hin und zurück'],
      ['🛫', 'Das Flugzeug startet um 14 Uhr.', 'der Abflug'],
      ['🛬', 'Um 18 Uhr bin ich am Ziel.', 'die Ankunft'],
      ['🚏', 'Hier warte ich auf den Bus.', 'die Haltestelle'],
      ['🗓️', 'Hier stehen alle Abfahrtszeiten von Bus und Bahn.', 'der Fahrplan'],
      ['💺', 'Ich habe einen Sitzplatz im Zug extra für mich gebucht.', 'die Reservierung'],
      ['🎒', 'Diese kleine Tasche darf ich mit ins Flugzeug nehmen.', 'das Handgepäck'],
      ['❌', 'Der Zug fährt heute gar nicht.', 'ausfallen'],
      ['🔄', 'Mein nächster Zug nach dem Umsteigen – hoffentlich verpasse ich ihn nicht!', 'der Anschluss'],
      ['🚆', 'Mit diesem Monatsticket fahre ich mit Bus und Regionalzügen durch ganz Deutschland.', 'das Deutschlandticket'],
      ['📍', 'Dorthin möchte ich fahren.', 'das Reiseziel'],
      ['🛏️', 'Ein Hotelzimmer für eine Person.', 'das Einzelzimmer'],
      ['📧', 'Eine E-Mail mit allen Daten meiner Buchung.', 'die Buchungsbestätigung'],
      ['🕵️', 'Im Zug prüft jemand, ob alle ein Ticket haben.', 'die Fahrkartenkontrolle'],
      ['🅿️', 'Hier stelle ich mein Auto ab.', 'der Parkplatz']]],
    einkaufen: ['Einkaufen', [
      ['🧾', 'Diesen Zettel bekomme ich an der Kasse.', 'der Kassenbon'],
      ['🏷️', 'Die Ware ist diese Woche billiger.', 'das Sonderangebot'],
      ['🛒', 'Darin lege ich im Supermarkt meine Waren.', 'der Einkaufswagen'],
      ['🪙', 'Das Geld, das ich an der Kasse zurückbekomme.', 'das Wechselgeld'],
      ['🔁', 'Die Hose passt nicht. Ich bringe sie zurück und nehme eine andere.', 'umtauschen'],
      ['🚪', 'Hier probiere ich im Geschäft Kleidung an.', 'die Umkleidekabine'],
      ['📏', '„Welche ___ haben Sie?“ – „40.“', 'die Größe'],
      ['🍾', 'Für Flaschen bezahle ich extra Geld und bekomme es im Laden zurück.', 'das Pfand'],
      ['⚖️', '1000 Gramm.', 'das Kilo'],
      ['🛍️', 'Darin trage ich die Einkäufe nach Hause.', 'die Tüte'],
      ['💳', 'Ich bezahle nicht bar, sondern mit Karte.', 'die Kartenzahlung'],
      ['📆', 'Bis zu diesem Tag ist das Lebensmittel mindestens gut.', 'das Mindesthaltbarkeitsdatum'],
      ['🕗', 'Wann hat das Geschäft geöffnet?', 'die Öffnungszeiten'],
      ['😠', 'Das Gerät ist kaputt. Ich beschwere mich im Geschäft und will Ersatz.', 'die Reklamation'],
      ['📦', 'Das Paket mit meiner Online-Bestellung kommt zu mir nach Hause.', 'die Lieferung'],
      ['↩️', 'Ich schicke die Online-Bestellung zurück.', 'die Rücksendung'],
      ['💯', 'Ich bezahle 20 Prozent weniger.', 'der Rabatt'],
      ['🧴', 'Hier kaufe ich Shampoo, Zahnpasta und Seife.', 'die Drogerie'],
      ['🥬', 'Einmal pro Woche verkaufen Händler auf einem Platz Obst und Gemüse.', 'der Wochenmarkt'],
      ['💶', 'Hier bezahle ich im Geschäft.', 'die Kasse'],
      ['📝', 'Darauf steht, was ich kaufen muss.', 'der Einkaufszettel'],
      ['🛡️', 'Zwei Jahre lang repariert der Händler das kaputte Gerät kostenlos.', 'die Garantie']]],
    amt: ['Behörden & Ämter', [
      ['📅', 'Am Montag um 9 Uhr muss ich beim Bürgeramt sein.', 'der Termin'],
      ['🏠', 'Nach dem Umzug melde ich meine neue Adresse beim Bürgeramt.', 'die Anmeldung'],
      ['📄', 'Mit diesem Formular bitte ich offiziell um etwas, z. B. um Kindergeld.', 'der Antrag'],
      ['✍️', 'Mein Name, mit der Hand unter das Formular geschrieben.', 'die Unterschrift'],
      ['🪪', 'Diese Karte zeigt, dass ich in Deutschland leben darf.', 'der Aufenthaltstitel'],
      ['🔢', 'Diese Zahl ziehe ich am Automaten. Dann warte ich, bis sie aufgerufen wird.', 'die Wartenummer'],
      ['📬', 'Ein Brief vom Amt mit einer Entscheidung.', 'der Bescheid'],
      ['⏳', 'Bis zu diesem Datum muss ich das Formular abgeben.', 'die Frist'],
      ['⚖️', 'Ich bin mit der Entscheidung vom Amt nicht einverstanden und schreibe zurück.', 'der Widerspruch'],
      ['📑', 'Ich gebe nicht das Original ab, sondern ein zweites Exemplar.', 'die Kopie'],
      ['🗂️', 'Alle Papiere und Dokumente, die ich zum Termin mitbringen muss.', 'die Unterlagen'],
      ['🧑‍💼', 'Diese Person im Amt bearbeitet meinen Antrag.', 'die Sachbearbeiterin'],
      ['🏛️', 'Hier melde ich meine Wohnung an und beantrage einen Ausweis.', 'das Bürgeramt'],
      ['💼', 'Hier bekomme ich Hilfe bei der Arbeitssuche und Geld zum Leben, wenn ich nicht genug verdiene.', 'das Jobcenter'],
      ['🛂', 'Hier verlängere ich meinen Aufenthaltstitel.', 'die Ausländerbehörde'],
      ['💶', 'Dieses Geld muss ich für den neuen Ausweis bezahlen.', 'die Gebühr'],
      ['🖊️', 'Ich schreibe meine Daten in die Felder vom Formular.', 'ausfüllen'],
      ['📎', 'Ein Dokument, das etwas beweist, z. B. die Lohnabrechnung.', 'der Nachweis'],
      ['🔖', 'Diese Nummer steht auf jedem Brief vom Amt. Ich schreibe sie in meine Antwort.', 'das Aktenzeichen'],
      ['🏷️', 'Dieses Papier zeigt, unter welcher Adresse ich gemeldet bin.', 'die Meldebescheinigung'],
      ['🕘', 'Zu diesen Zeiten ist das Amt für Besucher geöffnet.', 'die Sprechzeiten'],
      ['👶', 'Geld vom Staat für Eltern – jeden Monat für jedes Kind.', 'das Kindergeld'],
      ['🏘️', 'Mit diesem Papier darf ich eine Sozialwohnung mieten.', 'der Wohnberechtigungsschein']]],
    arzt: ['Arzt & Apotheke', [
      ['💳', 'Diese Karte von der Krankenkasse zeige ich in der Arztpraxis.', 'die Gesundheitskarte'],
      ['📝', 'Damit bekomme ich in der Apotheke ein Medikament.', 'das Rezept'],
      ['🛌', 'Der Arzt bestätigt, dass ich krank bin und nicht arbeiten kann.', 'die Krankschreibung'],
      ['🚨', 'Im Krankenhaus: Hier hilft man sofort bei Notfällen.', 'die Notaufnahme'],
      ['☎️', 'Die Nummer 112: Hier rufe ich im Notfall an.', 'der Notruf'],
      ['😵', 'Das Medikament hilft, aber ich bekomme Kopfschmerzen davon.', 'die Nebenwirkung'],
      ['🕑', 'Zu dieser Zeit behandelt die Ärztin Patienten.', 'die Sprechstunde'],
      ['👨‍⚕️', 'Zu diesem Arzt gehe ich zuerst. Er kennt mich und meine Familie.', 'der Hausarzt'],
      ['➡️', 'Damit schickt mich der Hausarzt zu einer Fachärztin.', 'die Überweisung'],
      ['🦷', 'Er kontrolliert meine Zähne.', 'der Zahnarzt'],
      ['💉', 'Sie schützt mich vor einer Krankheit, z. B. vor Grippe.', 'die Impfung'],
      ['🌡️', 'Meine Temperatur ist 39 Grad.', 'das Fieber'],
      ['🤧', 'Ich habe Schnupfen, Husten und Halsschmerzen.', 'die Erkältung'],
      ['🥜', 'Ich vertrage keine Nüsse. Mein Körper reagiert stark darauf.', 'die Allergie'],
      ['💊', 'Hier kaufe ich Medikamente.', 'die Apotheke'],
      ['🪑', 'Hier sitze ich, bis die Ärztin mich aufruft.', 'das Wartezimmer'],
      ['🏢', 'Hier bin ich versichert. Sie bezahlt meine Behandlung beim Arzt.', 'die Krankenkasse'],
      ['🩺', 'Die Ärztin hört mein Herz ab und misst den Blutdruck.', 'die Untersuchung'],
      ['🌙', 'Nachts und am Wochenende hat nur eine Apotheke in der Nähe geöffnet.', 'der Notdienst'],
      ['🧠', 'Dieser Arzt ist Spezialist für ein Gebiet, z. B. für Augen oder Haut.', 'der Facharzt'],
      ['🤕', 'Mir tut der Kopf weh.', 'die Kopfschmerzen']]],
    wohnung: ['Wohnung & Vermieter', [
      ['💶', 'Dieses Geld zahle ich jeden Monat für die Wohnung.', 'die Miete'],
      ['🚿', 'Geld für Wasser, Heizung und Müll – zusätzlich zur Kaltmiete.', 'die Nebenkosten'],
      ['🔐', 'Geld, das ich beim Einzug zahle und beim Auszug zurückbekomme.', 'die Kaution'],
      ['📜', 'Diesen Vertrag unterschreibe ich, wenn ich eine Wohnung miete.', 'der Mietvertrag'],
      ['🧔', 'Ihm gehört die Wohnung. Ich zahle ihm die Miete.', 'der Vermieter'],
      ['🛠️', 'Er repariert kleine Sachen und kümmert sich um das Haus.', 'der Hausmeister'],
      ['📋', 'Regeln für alle Mieter im Haus, z. B. zum Treppenhaus und zur Ruhe.', 'die Hausordnung'],
      ['✉️', 'Ich beende den Mietvertrag mit einem Brief.', 'die Kündigung'],
      ['🚚', 'Ich ziehe mit allen Möbeln in eine neue Wohnung.', 'der Umzug'],
      ['➕', 'Die Miete mit allen Nebenkosten.', 'die Warmmiete'],
      ['➖', 'Die Miete ohne Nebenkosten.', 'die Kaltmiete'],
      ['♻️', 'Papier, Plastik und Bioabfall kommen in verschiedene Tonnen.', 'die Mülltrennung'],
      ['🏠', 'Diese Person wohnt in der Wohnung neben mir.', 'der Nachbar'],
      ['🔥', 'Im Winter macht sie die Wohnung warm.', 'die Heizung'],
      ['🍄', 'Schwarze Flecken an der feuchten Wand im Bad.', 'der Schimmel'],
      ['👀', 'Ich schaue mir die Wohnung an, bevor ich sie miete.', 'die Besichtigung'],
      ['🛋️', 'Die Wohnung hat schon Möbel.', 'möbliert'],
      ['🤫', 'Zwischen 22 und 6 Uhr sollen alle im Haus leise sein.', 'die Nachtruhe'],
      ['🧾', 'Dieses Formular vom Vermieter brauche ich für die Anmeldung beim Bürgeramt.', 'die Wohnungsgeberbestätigung'],
      ['📊', 'Einmal im Jahr: Habe ich zu viel oder zu wenig für Wasser und Heizung bezahlt?', 'die Nebenkostenabrechnung'],
      ['🔌', 'Er zeigt, wie viel Strom ich verbrauche.', 'der Stromzähler'],
      ['🪟', 'Etwas in der Wohnung ist kaputt, z. B. das Fenster schließt nicht. Das melde ich dem Vermieter.', 'der Mangel'],
      ['🏢', 'Ein Zimmer in einer Wohnung, die ich mit anderen teile.', 'die WG']]]
  };

  /* Wo bin ich? [Ort, Satz] */
  const ORTE = [
    ['am Bahnhof', 'Einmal nach Dortmund, hin und zurück, bitte.'],
    ['am Bahnhof', 'Achtung an Gleis 3: Der Regionalexpress hat zehn Minuten Verspätung.'],
    ['am Bahnhof', 'Muss ich in Duisburg umsteigen?'],
    ['im Supermarkt', 'Wo finde ich das Mehl? – In Gang drei, ganz oben im Regal.'],
    ['im Supermarkt', 'Möchten Sie den Kassenbon? Und haben Sie eine Kundenkarte?'],
    ['im Supermarkt', 'Die Pfandflaschen geben Sie bitte am Automaten neben dem Eingang ab.'],
    ['beim Bürgeramt', 'Ich möchte meine neue Adresse anmelden.'],
    ['beim Bürgeramt', 'Haben Sie die Wohnungsgeberbestätigung von Ihrem Vermieter dabei?'],
    ['beim Bürgeramt', 'Ihr neuer Personalausweis ist in ungefähr vier Wochen fertig.'],
    ['in der Arztpraxis', 'Haben Sie Ihre Gesundheitskarte dabei? Nehmen Sie bitte noch im Wartezimmer Platz.'],
    ['in der Arztpraxis', 'Machen Sie bitte den Oberkörper frei. Ich höre Sie jetzt ab.'],
    ['in der Arztpraxis', 'Seit wann haben Sie die Schmerzen?'],
    ['in der Apotheke', 'Für dieses Medikament brauchen Sie ein Rezept.'],
    ['in der Apotheke', 'Das Medikament haben wir nicht da. Wir bestellen es, Sie können es heute Nachmittag abholen.'],
    ['in der Apotheke', 'Gegen den Husten empfehle ich Ihnen diesen Saft.'],
    ['bei der Bank', 'Ich möchte ein Girokonto eröffnen.'],
    ['bei der Bank', 'Ihre neue Karte und die PIN bekommen Sie getrennt per Post.'],
    ['bei der Bank', 'Der Geldautomat hat meine Karte nicht zurückgegeben.'],
    ['bei der Post', 'Ich möchte dieses Paket nach Polen schicken.'],
    ['bei der Post', 'Den Brief bitte als Einschreiben.'],
    ['bei der Post', 'Ich habe eine Benachrichtigungskarte im Briefkasten gefunden. Hier ist mein Ausweis.'],
    ['beim Jobcenter', 'Bitte bringen Sie zum nächsten Termin Ihren Lebenslauf und Ihre Kontoauszüge mit.'],
    ['beim Jobcenter', 'Haben Sie sich schon auf die Stelle als Lagerhelfer beworben?'],
    ['beim Jobcenter', 'Ihr Weiterbewilligungsantrag muss bis Ende des Monats bei uns sein.'],
    ['im Restaurant', 'Haben Sie reserviert? – Ja, auf den Namen Ahmadi.'],
    ['im Restaurant', 'Zahlen Sie zusammen oder getrennt?'],
    ['im Restaurant', 'Was darf ich Ihnen zu trinken bringen?'],
    ['in der Schule', 'Der Elternabend ist am Donnerstag um 19 Uhr im Klassenraum.'],
    ['in der Schule', 'Bitte geben Sie die Einverständniserklärung für den Ausflug bis Freitag ab.'],
    ['in der Schule', 'Ihre Tochter hat heute im Unterricht sehr gut mitgearbeitet.'],
    ['in der Autowerkstatt', 'Ihr Auto ist fertig. Wir haben die Bremsen erneuert.'],
    ['in der Autowerkstatt', 'Die Winterreifen können wir Ihnen nächste Woche wechseln.'],
    ['im Hotel', 'Das Frühstück gibt es von 7 bis 10 Uhr im Erdgeschoss.'],
    ['im Hotel', 'Haben Sie noch ein Doppelzimmer für zwei Nächte frei?'],
    ['im Hotel', 'Bitte geben Sie bei der Abreise die Schlüsselkarte an der Rezeption ab.'],
    ['bei der Wohnungsbesichtigung', 'Die Wohnung hat 65 Quadratmeter. Die Kaution beträgt drei Kaltmieten.'],
    ['bei der Wohnungsbesichtigung', 'Ist die Küche in der Miete schon dabei?'],
    ['in der Bäckerei', 'Ich hätte gern sechs Brötchen und ein Vollkornbrot, bitte.'],
    ['in der Bäckerei', 'Soll ich Ihnen das Brot schneiden?']
  ];

  /* Formular-Profi */
  const PERSONEN = [
    { name: 'Amina Haddad', f: { 'Vorname': 'Amina', 'Familienname': 'Haddad', 'Geburtsdatum': '14.03.1991', 'Geburtsort': 'Aleppo', 'Staatsangehörigkeit': 'syrisch', 'Familienstand': 'verheiratet', 'Straße, Hausnummer': 'Kettwiger Straße 12', 'Postleitzahl': '45127', 'Wohnort': 'Essen', 'Telefon': '0201 123456', 'E-Mail': 'a.haddad@mail.de', 'Beruf': 'Krankenpflegerin', 'Anzahl der Kinder': '2', 'Muttersprache': 'Arabisch' } },
    { name: 'Oleksandr Kovalenko', f: { 'Vorname': 'Oleksandr', 'Familienname': 'Kovalenko', 'Geburtsdatum': '02.11.1985', 'Geburtsort': 'Charkiw', 'Staatsangehörigkeit': 'ukrainisch', 'Familienstand': 'geschieden', 'Straße, Hausnummer': 'Hagener Straße 7', 'Postleitzahl': '58285', 'Wohnort': 'Gevelsberg', 'Telefon': '0176 98765432', 'E-Mail': 'o.kovalenko@web.de', 'Beruf': 'Elektriker', 'Anzahl der Kinder': '1', 'Muttersprache': 'Ukrainisch' } },
    { name: 'Sevgi Yilmaz', f: { 'Vorname': 'Sevgi', 'Familienname': 'Yilmaz', 'Geburtsdatum': '27.07.1998', 'Geburtsort': 'Izmir', 'Staatsangehörigkeit': 'türkisch', 'Familienstand': 'ledig', 'Straße, Hausnummer': 'Bochumer Straße 45', 'Postleitzahl': '44866', 'Wohnort': 'Bochum', 'Telefon': '0234 556677', 'E-Mail': 'sevgi.y@gmx.de', 'Beruf': 'Verkäuferin', 'Anzahl der Kinder': '0', 'Muttersprache': 'Türkisch' } }
  ];
  const ABK = [
    ['PLZ', 'Postleitzahl'], ['Tel.', 'Telefon'], ['Str.', 'Straße'], ['Nr.', 'Nummer'], ['geb.', 'geboren'],
    ['ggf.', 'gegebenenfalls (wenn nötig)'], ['z. B.', 'zum Beispiel'], ['bzw.', 'beziehungsweise'], ['u. a.', 'unter anderem'],
    ['inkl.', 'inklusive (mit)'], ['zzgl.', 'zuzüglich (plus)'], ['NK', 'Nebenkosten'], ['KM', 'Kaltmiete'], ['Zi.', 'Zimmer'],
    ['EG', 'Erdgeschoss'], ['OG', 'Obergeschoss'], ['WG', 'Wohngemeinschaft'], ['MwSt.', 'Mehrwertsteuer'], ['Mo.–Fr.', 'Montag bis Freitag'],
    ['Std.', 'Stunde'], ['ca.', 'circa (ungefähr)'], ['led.', 'ledig'], ['verh.', 'verheiratet'], ['Anl.', 'Anlage (beigelegtes Dokument)'],
    ['z. Hd.', 'zu Händen (für eine bestimmte Person)'], ['Abs.', 'Absender'], ['Betr.', 'Betreff'], ['usw.', 'und so weiter'], ['Kfz', 'Kraftfahrzeug (Auto)'],
    ['Ust-ID', 'Umsatzsteuer-Identifikationsnummer']
  ].filter(x => x[0] !== 'Ust-ID');

  DMGame.register({
    id: 'alltag-sprint', cat: 'alltag', title: 'Wort-Sprint Alltag', icon: '🏃', level: 'A2–B1',
    desc: 'Hau den Maulwurf: Das passende Wort taucht auf – schnell antippen! Fünf Alltagsthemen.',
    intro: 'Lies die Erklärung. In den Löchern tauchen Wörter auf – tippe schnell auf das passende, bevor es wieder verschwindet. Falsche Wörter kosten ein Leben. 75 Sekunden, 3 Leben, Serien geben doppelte Punkte. Wähle ein Thema.',
    optionsLabel: 'Thema',
    options: Object.entries(SPRINT).map(([id, [label]]) => ({ id, label })),
    start(api, opt) {
      const [, rows] = SPRINT[opt] || SPRINT.reisen, words = rows.map(r => r[2]);
      const items = rows.map(([pic, q, a]) => ({ pic, q: q.replace('___', '…'), a, opts: [a, ...DMKit.distract(api, words, a)], correct: `${a} – ${q.replace('___', '…')}` }));
      DMArcade.whack(api, { items, seconds: 75, lives: 3 });
    }
  });

  DMGame.register({
    id: 'alltag-wo', cat: 'alltag', title: 'Wo bin ich?', icon: '📍', level: 'A2–B1',
    desc: 'Fangspiel: Du hörst oder liest einen Satz – fang den richtigen Ort mit dem Korb!',
    intro: 'Wo spricht man so? Orte fallen vom Himmel – bewege den Korb und fang den richtigen Ort. Falsche Orte musst du ausweichen. Im Hör-Modus wird der Satz nur vorgelesen. 12 Sätze, 3 Leben.',
    optionsLabel: 'Modus',
    options: [{ id: 'lesen', label: '📖 Lesen' }, { id: 'hoeren', label: '🎧 Hören' }],
    start(api, opt) {
      const places = [...new Set(ORTE.map(o => o[0]))];
      const hear = opt === 'hoeren';
      const items = ORTE.map(([a, q]) => ({ q: `„${q}“`, say: hear ? q : null, a, opts: [a, ...DMKit.distract(api, places, a)], sub: 'Wo hörst du diesen Satz?', correct: `${a}: „${q}“` }));
      DMArcade.catcher(api, { items: items.map(x => ({ ...x, sub: null })), rounds: 12, lives: 3, autoSay: hear });
    }
  });

  DMGame.register({
    id: 'alltag-formular', cat: 'alltag', title: 'Formular-Profi', icon: '📝', level: 'A2–B1',
    desc: 'Sortierspiel: Angaben und Abkürzungen in den richtigen Korb steuern – PLZ, Familienstand, z. Hd. …',
    intro: 'Eine Karte fällt herunter – zum Beispiel „14.03.1991“ oder „PLZ“. Tippe auf den richtigen Korb, bevor sie unten ankommt: Welches Formularfeld? Was bedeutet die Abkürzung? Zweimal tippen lässt die Karte schneller fallen. 12 Karten, 3 Leben.',
    optionsLabel: 'Aufgaben',
    options: [{ id: 'felder', label: 'Formularfelder' }, { id: 'abk', label: 'Abkürzungen' }, { id: 'mix', label: 'Gemischt' }],
    start(api, opt) {
      const items = [];
      if (opt !== 'abk') PERSONEN.forEach(p => {
        const keys = Object.keys(p.f);
        // Karte = Angabe, Körbe = Formularfelder
        keys.forEach(k => items.push({ pic: '📝', q: p.f[k], a: k, opts: [k, ...DMKit.distract(api, keys.filter(x => p.f[x] !== p.f[k]), k)], tip: `${p.name}: ${k} = ${p.f[k]}`, correct: `${k}: ${p.f[k]}` }));
      });
      if (opt !== 'felder') {
        const means = ABK.map(x => x[1]);
        ABK.forEach(([k, m]) => items.push({ q: k, a: m, opts: [m, ...DMKit.distract(api, means, m)], correct: `${k} = ${m}` }));
      }
      DMArcade.sorter(api, { items, rounds: 12, lives: 3, title: opt === 'abk' ? 'Was bedeutet die Abkürzung?' : 'In welches Feld gehört die Angabe?', sub: 'Steuere die Karte in den richtigen Korb.' });
    }
  });
})();
