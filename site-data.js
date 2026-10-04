/* Deutsch mit Dennis – Inhalte der neuen Startseite, Lernwege, Schreibwerkstatt, Hörtraining und Videos.
   Alle Texte sind eigene Übungsmaterialien, keine offiziellen Prüfungsaufgaben. */
const DM = window.DM || (window.DM = {});

DM.teacher = {
  name: 'Dennis',
  fullName: 'Dzianis Prudnikau',
  email: 'dennis.prudnikau@gmail.com',
  whatsapp: 'https://wa.me/491738775907',
  donate: 'https://www.donationalerts.com/r/dennis_prudnikau',
  youtube: 'https://www.youtube.com/@deutsch-mit-Dennis',
  channelId: 'UCMacEMD2p8zCKY2UrGiMUrA',
  address: ['Dzianis Prudnikau', 'Sperberstr. 42', '58285 Gevelsberg']
};

/* Gruppen: für wen ist der Weg? */
DM.groups = {
  start: { label: 'Neu in Deutsch', color: 'mint' },
  alltag: { label: 'Ohne Prüfung', color: 'sky' },
  pruefung: { label: 'Prüfung', color: 'sun' },
  beruf: { label: 'Beruf', color: 'ink' }
};

/* Lernwege für die Zielgruppen der Gruppe. Jeder Schritt: [Titel, Link, Beschreibung, Art] */
DM.paths = {
  start: {
    icon: '👋', group: 'start', level: 'A1',
    title: 'Ich fange mit Deutsch an',
    who: 'Du lernst gerade die ersten Wörter.',
    intro: 'Kleine Schritte: hören, nachsprechen, einen Satz sagen. Jeden Tag 15 Minuten reichen.',
    tip: 'Sprich jeden Satz laut. Auch wenn er noch nicht perfekt ist.',
    plan: ['5 Minuten hören und nachsprechen', '5 Minuten Wörter mit Artikel lernen', '5 Minuten einen eigenen Satz sagen oder schreiben'],
    steps: [
      ['Hallo, das bin ich', '#lektion/ankommen', 'Die erste Lektion: sich vorstellen.', 'Lektion'],
      ['Die ersten 20 Wörter', '#wortschatz/ankommen/0', 'Wortkarten mit Bild, Artikel und Beispiel.', 'Wörter'],
      ['Hören und nachsprechen', '#lektion/ankommen/3', 'Ein Dialog zum Mitlesen und Nachsprechen.', 'Hören'],
      ['Mich vorstellen', '#ueben/sprechen/A1/0', 'Name, Wohnort, Sprache – laut sprechen.', 'Sprechen'],
      ['Meine ersten Sätze schreiben', '#ueben/schreiben/A1/0', 'Zwei, drei kurze Sätze über dich.', 'Schreiben'],
      ['Einkaufen', '#lektion/einkaufen', 'Brot, Milch, Preise und Artikel.', 'Lektion'],
      ['Einen Termin machen', '#lektion/termine', 'Uhrzeiten, Wochentage und höfliche Fragen.', 'Lektion'],
      ['Meine Wohnung', '#lektion/wohnen', 'Zimmer beschreiben und „kein“ und „nicht“ benutzen.', 'Lektion']
    ]
  },
  sprechen: {
    icon: '💬', group: 'alltag', level: 'A1–B2',
    title: 'Ich möchte mehr sprechen',
    who: 'Du brauchst keine Prüfung. Du willst im Alltag sicherer reden.',
    intro: 'Kurze Gespräche aus dem Alltag. Erst mit Hilfen, dann frei. Allein oder zu zweit.',
    tip: 'Übe ein Gespräch zweimal: einmal mit Satzanfängen, einmal ohne.',
    plan: ['3 Minuten Redemittel ansehen', '7 Minuten ein Gespräch sprechen (beide Rollen)', '5 Minuten Hören und eine Sache verändern'],
    steps: [
      ['Einen Termin verschieben', '#ueben/sprechen/A2/0', 'Am Telefon höflich um einen neuen Termin bitten.', 'Sprechen'],
      ['Ein Treffen verabreden', '#ueben/sprechen/A2/1', 'Zeit und Treffpunkt vereinbaren.', 'Sprechen'],
      ['Alltagsansagen verstehen', '#hoeren/alltag', 'Bahnhof, Arztpraxis, Supermarkt: hören und verstehen.', 'Hören'],
      ['Meine Meinung sagen', '#lektion/meinung', 'weil, deshalb, obwohl – Meinung begründen.', 'Lektion'],
      ['Gemeinsam etwas planen', '#ueben/sprechen/B1/0', 'Vorschläge machen und reagieren.', 'Sprechen'],
      ['Etwas reklamieren', '#ueben/sprechen/B1/1', 'Ein Problem freundlich, aber klar ansprechen.', 'Sprechen'],
      ['Umgangssprache im Video', '#videos/deutsch', 'Wie Muttersprachler wirklich reden.', 'Video']
    ]
  },
  schreiben: {
    icon: '✍️', group: 'alltag', level: 'A1–B2',
    title: 'Ich möchte besser schreiben',
    who: 'Nachrichten, E-Mails und Briefe sollen klarer werden.',
    intro: 'Planen, schreiben, mit einem Muster vergleichen und verbessern. Dein Text bleibt auf deinem Gerät gespeichert.',
    tip: 'Schreib zuerst Stichwörter zu jedem Punkt. Dann erst ganze Sätze.',
    plan: ['5 Minuten Aufgabe lesen und Stichwörter planen', '15 Minuten schreiben', '5 Minuten mit Checkliste und Muster verbessern'],
    steps: [
      ['Schreib-Bausteine', '#schreiben/bausteine', 'Anrede, Gruß, Verbindungswörter und typische Sätze.', 'Werkzeug'],
      ['Eine kurze Nachricht', '#ueben/schreiben/A1/2', 'Krank? Dem Kurs Bescheid sagen.', 'Schreiben'],
      ['Einen Termin verschieben', '#ueben/schreiben/A2/0', 'Grund nennen und neuen Termin erfragen.', 'Schreiben'],
      ['An den Vermieter schreiben', '#ueben/schreiben/A2/2', 'Etwas ist kaputt: höflich um Hilfe bitten.', 'Schreiben'],
      ['Eine Beschwerde', '#ueben/schreiben/B1/2', 'Ein Problem beschreiben und eine Lösung fordern.', 'Schreiben'],
      ['DTZ: einen Brief schreiben', '#training/dtz-schreiben', 'Alle vier Punkte bearbeiten – mit Mustertext.', 'Prüfung'],
      ['B2: Kundenantwort', '#training/dtb-schreiben', 'Professionell auf eine Beschwerde reagieren.', 'Beruf']
    ]
  },
  dtz: {
    icon: '🎯', group: 'pruefung', level: 'A2–B1',
    title: 'Ich bereite mich auf den DTZ vor',
    who: 'Du bist im Integrationskurs oder hast die Prüfung bald.',
    intro: 'Alle Teile des Deutsch-Tests für Zuwanderer: Sprechen, Schreiben, Lesen und Hören. Beginne mit dem Teil, der dir am schwersten fällt.',
    tip: 'Im Sprechen zählt nicht Perfektion. Antworte vollständig und reagiere auf deinen Partner.',
    plan: ['Montag: Sprechen Teil 1 und 2', 'Mittwoch: Brief schreiben', 'Freitag: Lesen und Hören', 'Wochenende: Sprechen Teil 3 zu zweit'],
    steps: [
      ['Sprechen 1: sich vorstellen', '#training/dtz-vorstellen', 'Mit eigenen Informationen antworten.', 'Sprechen'],
      ['Sprechen 2: Bild beschreiben', '#training/dtz-bild', 'Beschreiben und von eigenen Erfahrungen erzählen.', 'Sprechen'],
      ['Sprechen 3: gemeinsam planen', '#training/dtz-sprechen', 'Vorschlagen, reagieren, gemeinsam entscheiden.', 'Sprechen'],
      ['Schreiben: einen Brief', '#training/dtz-schreiben', 'Alle Leitpunkte bearbeiten und den Text prüfen.', 'Schreiben'],
      ['Schreib-Bausteine für Briefe', '#schreiben/bausteine', 'Anrede, Gruß und feste Formulierungen.', 'Werkzeug'],
      ['Lesen: Mitteilungen verstehen', '#training/dtz-lesen', 'Wichtige Informationen finden.', 'Lesen'],
      ['Hören: Ansagen und Nachrichten', '#hoeren/alltag', 'Durchsagen, Anrufbeantworter, Radio.', 'Hören'],
      ['Leben in Deutschland', '#orientierungskurs', 'Für den Test „Leben in Deutschland“.', 'Orientierung'],
      ['Videos zur Prüfung', '#videos/pruefung', 'Bildbeschreibung, Planen, Briefe – erklärt von Dennis.', 'Video']
    ]
  },
  bridge: {
    icon: '🌉', group: 'beruf', level: 'B1 → B2 Beruf',
    title: 'Ich möchte in den B2-Kurs starten',
    who: 'Du hast den Integrationskurs geschafft und willst weiter zu B2 Beruf.',
    intro: 'Baue auf B1 auf: erst sicher begründen, dann genauer formulieren und im Beruf höflich reagieren.',
    tip: 'Lerne Redemittel als ganze Sätze. Im Beruf wirken sie sofort professioneller.',
    plan: ['10 Minuten eine B2-Lektion', '10 Minuten berufliche Nachricht schreiben', '5 Minuten Hören im Beruf'],
    steps: [
      ['B1 wiederholen: Meinung begründen', '#lektion/meinung/2', 'weil, deshalb und obwohl sicher benutzen.', 'Lektion'],
      ['Über Berufserfahrung sprechen', '#lektion/arbeit/3', 'Einen Dialog lesen und eigene Erfahrungen ergänzen.', 'Lektion'],
      ['Beruflich weiterkommen', '#lektion/bewerbung-b2', 'Die erste B2-Lektion.', 'Lektion'],
      ['Ein Gespräch im Beruf', '#ueben/sprechen/B2/0', 'Nachfragen, erklären, einen Vorschlag machen.', 'Sprechen'],
      ['Eine berufliche E-Mail', '#ueben/schreiben/B2/2', 'Eine Weiterbildung beantragen.', 'Schreiben'],
      ['Hören im Beruf', '#hoeren/beruf', 'Mailbox, Durchsagen, Gespräche unter Kollegen.', 'Hören'],
      ['Alle B2-Lektionen', '#lernen/B2', 'Ausgewählte Themen zur Vorbereitung auf den Kurs.', 'Lektion']
    ]
  },
  repeat: {
    icon: '🔄', group: 'beruf', level: 'B2 Beruf',
    title: 'Ich möchte B2 gezielt wiederholen',
    who: 'Du hast B2 nicht bestanden und willst es noch einmal versuchen.',
    intro: 'Du musst nicht von vorne beginnen. Schau in dein Ergebnis und wähle den Teil, der dir gefehlt hat.',
    tip: 'Übe den schwächsten Teil zuerst – jeden Tag ein bisschen, nicht einmal pro Woche viel.',
    plan: ['Ergebnis ansehen: Welcher Teil hat gefehlt?', 'Jeden Tag 20 Minuten nur diesen Teil', 'Einmal pro Woche eine komplette Übung'],
    steps: [
      ['Sprechen 1: über ein Thema sprechen', '#training/dtb-thema', 'Strukturieren, Beispiele geben, Nachfragen beantworten.', 'Sprechen'],
      ['Sprechen 2: mit Kollegen sprechen', '#training/dtb-kollegen', 'Auf das Gegenüber eingehen und nachfragen.', 'Sprechen'],
      ['Sprechen 3: Lösungen diskutieren', '#training/dtb-sprechen', 'Vergleichen und sich einigen.', 'Sprechen'],
      ['Schreiben: Kundenantwort', '#training/dtb-schreiben', 'Mit internen Informationen antworten.', 'Schreiben'],
      ['Schreiben: Forumsbeitrag', '#ueben/schreiben/B2/3', 'Eine Position mit Argumenten vertreten.', 'Schreiben'],
      ['Lesen: betriebliche Regelung', '#training/dtb-lesen', 'Auf Einschränkungen und Fristen achten.', 'Lesen'],
      ['Hören im Beruf', '#hoeren/beruf', 'Mailbox, Durchsagen, Gespräche.', 'Hören']
    ]
  }
};
DM.pathOrder = ['start', 'sprechen', 'schreiben', 'dtz', 'bridge', 'repeat'];

/* Zusätzliche Situationen für Sprechen & Schreiben. Die ersten zwei je Niveau stammen aus der bisherigen Website. */
DM.extraScenes = {
  A1: [
    { title: 'Ich bin krank', image: 'sprechen/arzt', task: 'Du bist krank und kannst heute nicht zum Kurs kommen. Schreib deiner Lehrerin eine kurze Nachricht.', prompts: ['An wen schreibst du?', 'Was ist los?', 'Wann kommst du wieder?'], starters: ['Hallo Frau …,', 'Ich bin krank.', 'Ich komme am … wieder.'], model: 'Hallo Frau Weber,\nich bin krank. Ich kann heute nicht kommen. Ich komme am Montag wieder.\nViele Grüße\nAli', reply: 'Gute Besserung, Ali! Bis Montag.', checks: ['Ich schreibe eine Anrede.', 'Ich sage, was los ist.', 'Ich schreibe einen Gruß und meinen Namen.'], lesson: 'termine' },
    { title: 'Meine Familie', image: 'alltag', task: 'Erzähl von deiner Familie. Wer gehört dazu? Wo wohnen sie?', prompts: ['Hast du Kinder oder Geschwister?', 'Wie heißen sie?', 'Wo wohnen sie?'], starters: ['Ich habe …', 'Sie heißt … / Er heißt …', 'Meine Eltern wohnen in …'], model: 'Ich habe zwei Kinder. Meine Tochter heißt Lea. Mein Sohn heißt Tim. Meine Eltern wohnen in der Ukraine.', reply: 'Wie alt sind deine Kinder?', checks: ['Ich nenne zwei Personen.', 'Ich benutze „mein“ und „meine“.', 'Das Verb steht auf Platz 2.'], lesson: 'ankommen' }
  ],
  A2: [
    { title: 'Die Heizung ist kaputt', image: 'sprechen/umzug', task: 'In deiner Wohnung funktioniert die Heizung nicht. Schreib deinem Vermieter. Sag, was das Problem ist, seit wann, und wann du zu Hause bist.', prompts: ['Was ist kaputt?', 'Seit wann?', 'Wann kann jemand kommen?'], starters: ['Sehr geehrter Herr …,', 'seit … funktioniert … nicht.', 'Ich bin am … ab … Uhr zu Hause.', 'Mit freundlichen Grüßen'], model: 'Sehr geehrter Herr Schmitz,\nseit Montag funktioniert die Heizung in meiner Wohnung nicht. Es ist sehr kalt, besonders im Kinderzimmer. Bitte schicken Sie schnell einen Handwerker. Ich bin am Donnerstag und Freitag ab 14 Uhr zu Hause.\nMit freundlichen Grüßen\nMila Petrova', reply: 'Der Handwerker kann erst am Montag um 9 Uhr kommen. Passt das?', checks: ['Ich nenne das Problem und seit wann.', 'Ich bitte um Hilfe.', 'Ich nenne Zeiten, an denen ich zu Hause bin.', 'Anrede und Gruß sind formell.'], lesson: 'wohnen' },
    { title: 'Eine Einladung absagen', image: 'sprechen/park', task: 'Eine Kollegin lädt dich zu ihrer Geburtstagsfeier ein. Du kannst nicht kommen. Bedank dich, sag ab und erkläre warum.', prompts: ['Wofür bedankst du dich?', 'Warum kannst du nicht kommen?', 'Was schlägst du stattdessen vor?'], starters: ['Vielen Dank für die Einladung!', 'Leider kann ich nicht kommen, weil …', 'Wollen wir uns am … treffen?'], model: 'Liebe Sara,\nvielen Dank für die Einladung! Leider kann ich am Samstag nicht kommen, weil meine Schwester uns besucht. Wollen wir nächste Woche zusammen einen Kaffee trinken? Ich wünsche dir eine schöne Feier!\nViele Grüße\nOmar', reply: 'Schade! Ja, Kaffee nächste Woche ist eine gute Idee. Hast du am Dienstag Zeit?', checks: ['Ich bedanke mich.', 'Ich sage ab und nenne einen Grund.', 'Ich mache einen Vorschlag.', 'Nach „weil“ steht das Verb am Ende.'], lesson: 'schule' }
  ],
  B1: [
    { title: 'Zu laut im Haus', image: 'sprechen/umzug', task: 'Deine Nachbarn sind seit Wochen nachts sehr laut. Ein Gespräch hat nicht geholfen. Schreib an die Hausverwaltung.', prompts: ['Was ist das Problem und seit wann?', 'Was hast du schon versucht?', 'Was soll die Hausverwaltung tun?'], starters: ['Ich wende mich an Sie, weil …', 'Ich habe bereits …', 'Deshalb bitte ich Sie, …', 'Ich würde mich über eine schnelle Antwort freuen.'], model: 'Sehr geehrte Damen und Herren,\nich wende mich an Sie, weil es in unserem Haus seit etwa drei Wochen nachts sehr laut ist. Die Mieter in der Wohnung über mir hören bis 2 Uhr laute Musik. Ich habe bereits mit ihnen gesprochen, aber leider hat sich nichts geändert. Da ich früh aufstehen muss, schlafe ich zu wenig. Deshalb bitte ich Sie, die Mieter an die Hausordnung zu erinnern. Ich würde mich über eine schnelle Antwort freuen.\nMit freundlichen Grüßen\nMila Petrova', reply: 'Vielen Dank für Ihre Nachricht. Können Sie uns genau mitteilen, an welchen Tagen es laut war?', checks: ['Ich beschreibe das Problem genau.', 'Ich erkläre, was ich schon versucht habe.', 'Ich formuliere eine klare Bitte.', 'Ich bleibe sachlich und höflich.'], lesson: 'reklamation' },
    { title: 'Informationen erfragen', image: 'alltag', task: 'Du interessierst dich für einen Computerkurs an der Volkshochschule. Schreib eine E-Mail und frag nach Terminen, Kosten und Voraussetzungen.', prompts: ['Warum schreibst du?', 'Was möchtest du genau wissen?', 'Wie kann man dich erreichen?'], starters: ['Ich habe gelesen, dass …', 'Ich hätte gern Informationen zu …', 'Könnten Sie mir bitte mitteilen, …?', 'Vielen Dank im Voraus.'], model: 'Sehr geehrte Damen und Herren,\nich habe auf Ihrer Internetseite gelesen, dass Sie im Herbst einen Computerkurs für Anfänger anbieten. Ich hätte gern mehr Informationen dazu. Könnten Sie mir bitte mitteilen, an welchen Tagen der Kurs stattfindet und wie viel er kostet? Außerdem möchte ich wissen, ob ich einen eigenen Laptop brauche. Sie erreichen mich am besten per E-Mail.\nVielen Dank im Voraus.\nMit freundlichen Grüßen\nYusuf Demir', reply: 'Der Kurs findet dienstags von 18 bis 20 Uhr statt. Leider ist er schon voll. Möchten Sie auf die Warteliste?', checks: ['Ich nenne den Grund meiner E-Mail.', 'Ich stelle mindestens drei konkrete Fragen.', 'Ich benutze indirekte Fragen (ob, wie viel, wann).', 'Anrede und Gruß sind formell.'], lesson: 'arbeit' }
  ],
  B2: [
    { title: 'Eine Weiterbildung beantragen', image: 'beruf', task: 'Du möchtest an einer zweitägigen Weiterbildung teilnehmen. Schreib deiner Vorgesetzten. Begründe den Nutzen für das Team und kläre die Vertretung.', prompts: ['Welche Weiterbildung, wann und wo?', 'Welchen Nutzen hat sie für das Team?', 'Wer übernimmt deine Aufgaben?'], starters: ['Ich möchte Sie bitten, …', 'Die Weiterbildung wäre für unser Team hilfreich, da …', 'Meine Aufgaben würde in dieser Zeit … übernehmen.', 'Für Rückfragen stehe ich gern zur Verfügung.'], model: 'Sehr geehrte Frau Krüger,\nich möchte Sie bitten, mir die Teilnahme an der Weiterbildung „Professionell telefonieren mit Kunden“ am 14. und 15. November zu genehmigen. Die Schulung findet bei der IHK in Hagen statt und kostet 280 Euro.\nDie Weiterbildung wäre für unser Team hilfreich, da wir zunehmend Anfragen per Telefon bekommen und ich die Inhalte anschließend an die Kolleginnen und Kollegen weitergeben könnte. Meine Aufgaben würde in dieser Zeit Herr Aydın übernehmen; ich habe das bereits mit ihm abgesprochen.\nFür Rückfragen stehe ich Ihnen gern zur Verfügung.\nMit freundlichen Grüßen\nMila Petrova', reply: 'Die Weiterbildung klingt sinnvoll. Das Budget für dieses Jahr ist aber fast aufgebraucht. Gibt es eine günstigere Alternative?', checks: ['Ich nenne alle wichtigen Angaben (Titel, Datum, Ort, Kosten).', 'Ich begründe den Nutzen für das Team.', 'Ich kläre die Vertretung.', 'Mein Ton ist höflich und sachlich.', 'Ich verwende Konjunktiv II für Höflichkeit.'], lesson: 'bewerbung-b2' },
    { title: 'Forumsbeitrag: Homeoffice für alle?', image: 'beruf', task: 'Im Mitarbeiterforum wird diskutiert: Soll es für alle Abteilungen zwei Tage Homeoffice pro Woche geben? Schreib einen Beitrag mit deiner Meinung, Argumenten und einem Beispiel.', prompts: ['Was ist deine Position?', 'Welche zwei Argumente hast du?', 'Welches Gegenargument nimmst du auf?'], starters: ['Meiner Ansicht nach …', 'Ein wichtiges Argument dafür ist, dass …', 'Man könnte zwar einwenden, dass …, allerdings …', 'Abschließend möchte ich vorschlagen, …'], model: 'Liebe Kolleginnen und Kollegen,\nmeiner Ansicht nach ist Homeoffice eine gute Möglichkeit – allerdings nicht für alle Abteilungen in gleichem Umfang. Ein wichtiges Argument dafür ist, dass viele von uns lange Fahrtwege haben. Wer zu Hause arbeitet, spart Zeit und kann sich oft besser konzentrieren. In unserer Buchhaltung hat das in der Testphase gut funktioniert.\nMan könnte zwar einwenden, dass die Zusammenarbeit leidet, allerdings lässt sich das mit festen Teamtagen lösen. In der Produktion oder im Lager ist Homeoffice dagegen kaum möglich. Abschließend möchte ich vorschlagen, dass jede Abteilung selbst eine passende Regelung entwickelt.\nViele Grüße\nMila', reply: 'Ich finde, dann entsteht eine Ungerechtigkeit zwischen den Abteilungen. Wie sollen wir damit umgehen?', checks: ['Meine Position ist klar.', 'Ich nenne mindestens zwei Argumente.', 'Ich gehe auf ein Gegenargument ein.', 'Ich gebe ein Beispiel.', 'Ich verbinde meine Sätze mit Konnektoren.'], lesson: 'forum-b2' }
  ]
};

/* Schreib-Bausteine: Redemittel und Checklisten */
DM.toolkit = [
  { title: 'Anrede und Gruß', level: 'A1–B2', groups: [
    ['Formell (Amt, Vermieter, Firma, Lehrkraft)', ['Sehr geehrte Damen und Herren,', 'Sehr geehrte Frau Weber,', 'Sehr geehrter Herr Schmitz,', 'Mit freundlichen Grüßen']],
    ['Informell (Freunde, Familie, Kursleute)', ['Liebe Sara, / Lieber Omar,', 'Hallo Mila,', 'Viele Grüße', 'Liebe Grüße / Bis bald!']]
  ], note: 'Nach der Anrede steht ein Komma. Danach schreibst du klein weiter: „Sehr geehrte Frau Weber, ich schreibe Ihnen, weil …“' },
  { title: 'Der Brief im DTZ', level: 'A2–B1', groups: [
    ['So baust du den Brief auf', ['Anrede', 'Grund: Warum schreibe ich?', 'Zu jedem Leitpunkt 1–2 Sätze', 'Bitte oder Frage am Ende', 'Gruß und Name']],
    ['Nützliche Sätze', ['Ich schreibe Ihnen, weil …', 'Leider muss ich Ihnen mitteilen, dass …', 'Könnten Sie mir bitte sagen, …?', 'Vielen Dank für Ihre Hilfe.']]
  ], note: 'Bearbeite alle Leitpunkte. Ein fehlender Punkt kostet mehr als ein kleiner Grammatikfehler.' },
  { title: 'Sätze verbinden', level: 'A1–B2', groups: [
    ['A1–A2: Verb auf Platz 2', ['und, aber, oder, denn', 'dann, danach, deshalb (Verb direkt danach)']],
    ['A2–B1: Verb am Ende', ['weil, dass, wenn, ob', 'obwohl, damit, als', 'Ich komme nicht, weil ich krank bin.']],
    ['B2: genauer verbinden', ['zwar …, aber …', 'sodass / sofern / indem', 'trotzdem, dennoch, allerdings', 'nicht nur …, sondern auch …']]
  ], note: 'Ein Text wirkt sofort besser, wenn die Sätze verbunden sind. Benutze nicht immer „und dann“.' },
  { title: 'Bitten, beschweren, vorschlagen', level: 'B1–B2', groups: [
    ['Höflich bitten', ['Könnten Sie mir bitte …?', 'Ich wäre Ihnen dankbar, wenn …', 'Ich möchte Sie bitten, …']],
    ['Sich beschweren', ['Leider muss ich mich über … beschweren.', 'Ich bin mit … nicht zufrieden, da …', 'Ich erwarte, dass …']],
    ['Vorschlagen und reagieren', ['Ich würde vorschlagen, dass …', 'Wie wäre es, wenn wir …?', 'Das verstehe ich, allerdings …']]
  ], note: 'Im Beruf: lieber Konjunktiv II (könnten, wäre, würde) – das klingt höflicher.' },
  { title: 'Vor dem Abschicken prüfen', level: 'A1–B2', groups: [
    ['Meine Fehler-Checkliste', ['Steht das Verb im Hauptsatz auf Platz 2?', 'Steht das Verb nach weil, dass, wenn am Ende?', 'Schreibe ich Nomen groß?', 'Schreibe ich „Sie“, „Ihnen“, „Ihr“ in der höflichen Form groß?', 'Passt die Verbendung zur Person (ich wohne, du wohnst)?', 'Habe ich alle Punkte der Aufgabe bearbeitet?']]
  ], note: 'Lies deinen Text einmal laut. Was komisch klingt, ist oft falsch.' }
];

/* Hörtraining. Die Texte liest die Stimme deines Geräts vor (Sprachausgabe des Browsers). */
const HQ = (q, options, answer, why) => ({ q, options, answer, why });
DM.listening = {
  alltag: {
    title: 'Hören im Alltag', level: 'A2–B1', exam: 'DTZ-Vorbereitung',
    intro: 'Kurze Ansagen und Nachrichten wie im Alltag und im DTZ. Hör jeden Text zweimal. Lies zuerst die Frage.',
    items: [
      { type: 'Ansage am Bahnhof', text: 'Achtung an Gleis 4. Der Regionalexpress nach Dortmund, planmäßige Abfahrt 14 Uhr 12, fährt heute von Gleis 7. Wir bitten um Beachtung.', questions: [HQ('Von welchem Gleis fährt der Zug heute?', ['Gleis 4', 'Gleis 7', 'Gleis 12'], 1, 'Planmäßig wäre Gleis 4. Heute fährt der Zug von Gleis 7.')] },
      { type: 'Anrufbeantworter', text: 'Guten Tag, hier ist die Praxis Doktor Kaya. Frau Novak, Ihr Termin am Mittwoch um zehn Uhr muss leider ausfallen. Wir können Ihnen Donnerstag um halb neun anbieten. Bitte rufen Sie uns bis morgen Mittag zurück.', questions: [HQ('Was soll Frau Novak tun?', ['Am Mittwoch um zehn kommen', 'Bis morgen Mittag zurückrufen', 'Eine E-Mail schreiben'], 1, 'Die Praxis bittet um einen Rückruf bis morgen Mittag.'), HQ('Welchen neuen Termin bietet die Praxis an?', ['Donnerstag, 8:30 Uhr', 'Donnerstag, 9:30 Uhr', 'Mittwoch, 10 Uhr'], 0, '„Halb neun“ bedeutet 8:30 Uhr.')] },
      { type: 'Durchsage im Supermarkt', text: 'Liebe Kundinnen und Kunden, nur heute bis 20 Uhr: Alle Obst- und Gemüsesorten sind zwanzig Prozent günstiger. Außerdem ist Kasse 3 ab sofort für Sie geöffnet.', questions: [HQ('Was ist heute billiger?', ['Brot und Milch', 'Obst und Gemüse', 'Alle Getränke'], 1, 'Obst und Gemüse sind heute 20 Prozent günstiger.')] },
      { type: 'Verkehrsmeldung im Radio', text: 'Und nun der Verkehr: Auf der A 1 zwischen Hagen und Wuppertal gibt es nach einem Unfall fünf Kilometer Stau. Bitte fahren Sie über die A 43 aus.', questions: [HQ('Was empfiehlt das Radio?', ['Auf der A 1 warten', 'Über die A 43 fahren', 'Mit dem Zug fahren'], 1, 'Die Meldung empfiehlt die A 43 als Umweg.')] },
      { type: 'Nachricht von einem Freund', text: 'Hallo Mila, hier ist Omar. Wir treffen uns heute nicht um drei, sondern um vier, weil mein Bus Verspätung hat. Und wir treffen uns direkt am Kino, nicht am Bahnhof. Bis dann!', questions: [HQ('Wann treffen sich Mila und Omar?', ['Um drei', 'Um vier', 'Um fünf'], 1, 'Omar sagt: nicht um drei, sondern um vier.'), HQ('Wo treffen sie sich?', ['Am Bahnhof', 'An der Bushaltestelle', 'Am Kino'], 2, 'Der neue Treffpunkt ist direkt am Kino.')] },
      { type: 'Telefonansage einer Behörde', text: 'Willkommen beim Bürgerbüro. Für Termine zum Personalausweis drücken Sie die Eins. Für Fragen zur Anmeldung einer Wohnung drücken Sie die Zwei. Unsere Öffnungszeiten: Montag bis Freitag von 8 bis 13 Uhr, donnerstags zusätzlich bis 18 Uhr.', questions: [HQ('Du willst deine neue Wohnung anmelden. Welche Taste drückst du?', ['Die Eins', 'Die Zwei', 'Keine – ich warte'], 1, 'Für die Anmeldung einer Wohnung drückt man die Zwei.'), HQ('An welchem Tag ist das Bürgerbüro auch am Nachmittag geöffnet?', ['Montag', 'Donnerstag', 'Freitag'], 1, 'Donnerstags ist zusätzlich bis 18 Uhr geöffnet.')] },
      { type: 'Ansage in der Schule', text: 'Liebe Eltern, am Freitag endet der Unterricht schon um 11 Uhr 30, weil die Lehrkräfte eine Konferenz haben. Die Nachmittagsbetreuung findet wie immer statt.', questions: [HQ('Was ist am Freitag anders?', ['Es gibt keine Betreuung.', 'Der Unterricht endet früher.', 'Der Unterricht beginnt später.'], 1, 'Der Unterricht endet um 11:30 Uhr. Die Betreuung findet normal statt.')] },
      { type: 'Wetterbericht', text: 'Das Wetter für morgen: Im Ruhrgebiet wird es regnerisch und kühl, die Temperaturen erreichen höchstens zwölf Grad. Am Wochenende scheint dann wieder die Sonne.', questions: [HQ('Wie wird das Wetter morgen?', ['Sonnig und warm', 'Regnerisch und kühl', 'Schnee und Wind'], 1, 'Morgen wird es regnerisch und kühl, höchstens 12 Grad.')] }
    ]
  },
  beruf: {
    title: 'Hören im Beruf', level: 'B1–B2', exam: 'B2 Beruf',
    intro: 'Mailbox-Nachrichten, Durchsagen und Gespräche aus dem Arbeitsalltag. Achte auf Aufgaben, Fristen und Zuständigkeiten.',
    items: [
      { type: 'Mailbox der Teamleitung', text: 'Hallo Frau Jovanović, hier ist Markus Lenz. Das Meeting mit dem Kunden wird auf Donnerstag um neun Uhr verschoben. Könnten Sie bitte bis Mittwochabend die aktuellen Verkaufszahlen vorbereiten und an alle Teilnehmenden schicken? Die Präsentation übernehme ich selbst.', questions: [HQ('Was soll Frau Jovanović tun?', ['Die Präsentation halten', 'Die Verkaufszahlen vorbereiten und verschicken', 'Den Kunden anrufen'], 1, 'Sie soll die Zahlen bis Mittwochabend vorbereiten und an alle schicken.'), HQ('Wer hält die Präsentation?', ['Frau Jovanović', 'Herr Lenz', 'Der Kunde'], 1, 'Herr Lenz sagt: Die Präsentation übernehme ich selbst.')] },
      { type: 'Durchsage im Betrieb', text: 'Wegen Wartungsarbeiten ist das Zeiterfassungssystem am Samstag zwischen 6 und 14 Uhr nicht verfügbar. Bitte tragen Sie Ihre Arbeitszeiten in dieser Zeit in die ausliegenden Listen ein. Die Personalabteilung überträgt die Daten am Montag.', questions: [HQ('Was sollen die Mitarbeitenden am Samstag tun?', ['Zu Hause bleiben', 'Die Arbeitszeit in eine Liste eintragen', 'Die Personalabteilung anrufen'], 1, 'Die Arbeitszeiten werden in die ausliegenden Listen eingetragen.')] },
      { type: 'Gespräch unter Kollegen', text: 'Hast du schon gehört, dass die Spätschicht ab nächsten Monat eine Stunde früher beginnt? – Ja, aber nur in der Logistik. In der Produktion bleibt alles beim Alten. – Dann muss ich meine Kinderbetreuung neu organisieren.', questions: [HQ('Für wen ändert sich die Arbeitszeit?', ['Für die Produktion', 'Für die Logistik', 'Für alle Abteilungen'], 1, 'Die Änderung gilt nur in der Logistik.')] },
      { type: 'Anruf einer Kundin', text: 'Guten Tag, Schulz von der Firma Brandt. Wir haben gestern 200 Kartons bestellt, brauchen aber dringend 300. Falls die zusätzliche Menge nicht bis Freitag lieferbar ist, nehmen wir vorerst nur die 200 und bestellen den Rest später.', questions: [HQ('Was möchte Frau Schulz, wenn 300 Kartons bis Freitag nicht möglich sind?', ['Die Bestellung stornieren', 'Erst 200 Kartons bekommen', 'Bis nächste Woche warten'], 1, 'Dann nimmt die Firma vorerst nur die 200 Kartons.')] },
      { type: 'Hinweis der Personalabteilung', text: 'Liebe Kolleginnen und Kollegen, Urlaubsanträge für die Zeit zwischen Weihnachten und Neujahr müssen bis zum 15. November über das Mitarbeiterportal gestellt werden. Später eingereichte Anträge können wir leider nur berücksichtigen, wenn die Abteilung zustimmt.', questions: [HQ('Was gilt für Anträge nach dem 15. November?', ['Sie werden immer abgelehnt.', 'Sie brauchen die Zustimmung der Abteilung.', 'Sie müssen auf Papier eingereicht werden.'], 1, 'Spätere Anträge werden nur berücksichtigt, wenn die Abteilung zustimmt.')] }
    ]
  }
};

/* Niveau-Wegweiser */
DM.wegweiser = {
  level: {
    q: 'Welchen Satz verstehst du gut? Wähle den schwersten Satz, den du ohne Hilfe verstehst.',
    options: [
      ['A0', 'Ich verstehe noch fast nichts auf Deutsch.'],
      ['A1', 'Ich heiße Ali und wohne in Essen.'],
      ['A2', 'Gestern bin ich zum Arzt gefahren, weil ich krank war.'],
      ['B1', 'Obwohl die Wohnung teuer ist, haben wir sie genommen, weil sie nah an der Schule liegt.'],
      ['B2', 'Sofern die Lieferung nicht fristgerecht erfolgt, behalten wir uns vor, vom Vertrag zurückzutreten.']
    ]
  },
  goal: {
    q: 'Was ist dein Ziel?',
    options: [
      ['dtz', 'Ich mache bald den DTZ (Deutsch-Test für Zuwanderer).'],
      ['bridge', 'Ich möchte einen B2-Kurs (Beruf) beginnen.'],
      ['repeat', 'Ich habe B2 nicht bestanden und will es wiederholen.'],
      ['sprechen', 'Keine Prüfung – ich möchte mehr sprechen.'],
      ['schreiben', 'Ich möchte besser schreiben.']
    ]
  }
};

/* Sicherheitskopie der Videoliste. Die Website lädt zuerst youtube-feed.json; diese Liste gilt nur, wenn die Datei fehlt. */
DM.videoSnapshot = [
  { id: '6wdCdGV1nWE', title: 'Wählen in Deutschland: Recht oder Pflicht? | Bundestagswahl einfach erklärt | LiD-Test', published: '2026-09-30T22:00:05+00:00', category: 'orientierung' },
  { id: '5EcgHJ2-7OQ', title: 'Wer regiert Deutschland? Bundestag, Bundesrat & Bundesregierung einfach erklärt | LiD-Test', published: '2026-09-30T13:42:54+00:00', category: 'orientierung' },
  { id: '2xV67QRP8B8', title: 'Grundrechte & Rechtsstaat einfach erklärt | Leben in Deutschland Test (LiD)', published: '2026-09-25T10:57:59+00:00', category: 'orientierung' },
  { id: 'o-25cZxNKDo', title: 'Trennbare Verben im Deutschen | Einfache Erklärung + Übungen', published: '2026-09-24T08:51:21+00:00', category: 'deutsch' },
  { id: 'bk1qXM6Ngbc', title: 'Machst du diese Fehler auch? | Empfindlich vs. Empfindsam, Wissen vs. Kennen & Co. | Deutsch lernen', published: '2025-06-25T13:00:08+00:00', category: 'deutsch' },
  { id: 'ey2Taffihac', title: 'Briefe schreiben (DTZ-Prüfung) mit echten Beispielen', published: '2025-05-16T09:40:16+00:00', category: 'pruefung' },
  { id: 'qL8vvlug8eQ', title: 'DTZ mündliche Prüfung: So planst du richtig! Mit echten Prüfungsbeispielen!', published: '2025-03-17T08:14:40+00:00', category: 'pruefung' },
  { id: 'P0_U5Y6V2FU', title: '🔥 50 Wichtige Umgangssprachliche Ausdrücke im Deutschen – So sprechen die Muttersprachler! 🔥', published: '2025-03-11T11:31:29+00:00', category: 'deutsch' },
  { id: 'kIlIwRPwGC0', title: 'Lerne Deutsch mit einer spannenden Geschichte!', published: '2025-02-28T09:17:08+00:00', category: 'deutsch' },
  { id: 'LBIJHgabfU4', title: 'DTZ Prüfung Teil 2: Perfekte Bildbeschreibung – So bereitest du dich vor!', published: '2025-02-18T10:51:19+00:00', category: 'pruefung' },
  { id: 'NMOVVhapeiM', title: 'Разговорная немецкая лексика для работы – 30 крутых выражений, которые используют носители!', published: '2025-02-06T16:12:29+00:00', category: 'deutsch' },
  { id: 'O4XAHW0eSqw', title: 'Не говори всегда «gut»! – Лучшие альтернативы для твоего словарного запаса | Учим немецкий B1-B2', published: '2025-01-30T23:00:30+00:00', category: 'deutsch' },
  { id: 'dV_f55rvHuA', title: 'Как успешно подготовиться к устному экзамену DTZ: типичные ошибки', published: '2025-01-23T18:13:48+00:00', category: 'pruefung' },
  { id: '9P8dxdZ7ckU', title: '🎄 Волшебная зимняя история: Миньоны и эльф Финн 🌟', published: '2025-01-14T12:05:05+00:00', category: 'deutsch' },
  { id: 'uybcrLV_zkM', title: 'Легкий способ выучить немецкие предлоги Dativ и Akkusativ', published: '2025-01-07T10:58:24+00:00', category: 'deutsch' }
];
DM.videoCategories = {
  alle: 'Alle Videos',
  deutsch: 'Deutsch lernen',
  pruefung: 'Prüfung',
  orientierung: 'Leben in Deutschland'
};

/* Arbeitsblätter zum Herunterladen (mit Wasserzeichen „created by D.Prudnikau“). Automatisch erzeugt. */
DM.materialCats = {"grammatik": "Grammatik", "wortschatz": "Wortschatz und Themen", "sprechen": "Sprechen", "lesen-hoeren": "Lesen und Hören", "pruefung": "Prüfung DTZ", "unterricht": "Ganze Unterrichtsstunden"};
DM.materials = [{"file": "material/arbeitsblaetter/dativ-nomen-durch-pronomen-ersetzen.pdf","title": "Dativ: Nomen durch Pronomen ersetzen","level": "A2","cat": "grammatik","desc": "Ich danke meinem Vater → Ich danke ihm.","pages": 2,"kb": 158},{"file": "material/arbeitsblaetter/dativ-und-akkusativ-saetze-kurz-machen.pdf","title": "Dativ und Akkusativ: Sätze kurz machen","level": "A2","cat": "grammatik","desc": "Zwei Objekte im Satz durch Pronomen ersetzen.","pages": 2,"kb": 116},{"file": "material/arbeitsblaetter/dativ-und-akkusativ-person-oder-sache-ersetzen.pdf","title": "Dativ und Akkusativ: Person oder Sache ersetzen","level": "A2","cat": "grammatik","desc": "Ein Satz, zwei Möglichkeiten.","pages": 1,"kb": 95},{"file": "material/arbeitsblaetter/trennbare-verben-partizip-ii.pdf","title": "Trennbare Verben: Partizip II","level": "A2","cat": "grammatik","desc": "einkaufen → eingekauft.","pages": 1,"kb": 123},{"file": "material/arbeitsblaetter/trennbare-verben-im-perfekt.pdf","title": "Trennbare Verben im Perfekt","level": "A2","cat": "grammatik","desc": "Sätze vom Präsens ins Perfekt – mit haben oder sein.","pages": 1,"kb": 129},{"file": "material/arbeitsblaetter/trennbare-verben-verb-und-vorsilbe-finden.pdf","title": "Trennbare Verben: Verb und Vorsilbe finden","level": "A1","cat": "grammatik","desc": "Peter ruft seine Freundin an.","pages": 1,"kb": 166},{"file": "material/arbeitsblaetter/imperativ-die-du-form.pdf","title": "Imperativ: die du-Form","level": "A1","cat": "grammatik","desc": "machen → mach!","pages": 2,"kb": 156},{"file": "material/arbeitsblaetter/imperativ-du-oder-sie.pdf","title": "Imperativ: du oder Sie?","level": "A1","cat": "grammatik","desc": "Bitten an die Lehrerin und an einen Freund.","pages": 1,"kb": 121},{"file": "material/arbeitsblaetter/personalpronomen-er-sie-es.pdf","title": "Personalpronomen: er, sie, es","level": "A1","cat": "grammatik","desc": "Der Laptop → er.","pages": 1,"kb": 151},{"file": "material/arbeitsblaetter/personalpronomen-im-akkusativ.pdf","title": "Personalpronomen im Akkusativ","level": "A1","cat": "grammatik","desc": "Ich verstehe dich sehr gut.","pages": 1,"kb": 112},{"file": "material/arbeitsblaetter/possessivartikel-einsetzen.pdf","title": "Possessivartikel einsetzen","level": "A1","cat": "grammatik","desc": "mein, dein, sein, ihr …","pages": 1,"kb": 94},{"file": "material/arbeitsblaetter/tabelle-ein-mein-dein-kein.pdf","title": "Tabelle: ein, mein, dein, kein","level": "A1","cat": "grammatik","desc": "Alle Formen auf einer Seite.","pages": 1,"kb": 87},{"file": "material/arbeitsblaetter/praepositionen-mit-akkusativ-fudgo.pdf","title": "Präpositionen mit Akkusativ (FUDGO)","level": "A2","cat": "grammatik","desc": "für, um, durch, gegen, ohne.","pages": 2,"kb": 148},{"file": "material/arbeitsblaetter/praepositionen-mit-dativ.pdf","title": "Präpositionen mit Dativ","level": "A2","cat": "grammatik","desc": "aus, bei, mit, nach, seit, von, zu.","pages": 2,"kb": 175},{"file": "material/arbeitsblaetter/verben-mit-dativ.pdf","title": "Verben mit Dativ","level": "A2","cat": "grammatik","desc": "Liste der wichtigsten Verben: Wem?","pages": 2,"kb": 121},{"file": "material/arbeitsblaetter/verben-mit-akkusativ.pdf","title": "Verben mit Akkusativ","level": "A2","cat": "grammatik","desc": "Liste der wichtigsten Verben: Wen? Was?","pages": 2,"kb": 142},{"file": "material/arbeitsblaetter/praeteritum-war-und-hatte.pdf","title": "Präteritum: war und hatte","level": "A2","cat": "grammatik","desc": "Über die Vergangenheit sprechen.","pages": 2,"kb": 216},{"file": "material/arbeitsblaetter/fragen-mit-modalverben-muessen-koennen.pdf","title": "Fragen mit Modalverben (müssen, können)","level": "A1","cat": "grammatik","desc": "Ja-/Nein-Fragen und W-Fragen.","pages": 2,"kb": 230},{"file": "material/arbeitsblaetter/ja-nein-fragen-bilden.pdf","title": "Ja-/Nein-Fragen bilden","level": "A1","cat": "grammatik","desc": "Kannst du mir helfen?","pages": 2,"kb": 123},{"file": "material/arbeitsblaetter/im-supermarkt-ein-eine-einen.pdf","title": "Im Supermarkt: ein, eine, einen","level": "A1","cat": "grammatik","desc": "Unbestimmter Artikel im Akkusativ.","pages": 1,"kb": 145},{"file": "material/arbeitsblaetter/lebensmittel-der-die-oder-das.pdf","title": "Lebensmittel: der, die oder das?","level": "A1","cat": "wortschatz","desc": "Grundwortschatz Lebensmittel mit Artikel.","pages": 3,"kb": 141},{"file": "material/arbeitsblaetter/im-caf-und-beim-einkaufen.pdf","title": "Im Café und beim Einkaufen","level": "A1","cat": "wortschatz","desc": "Nomen mit Artikel, Nominativ und Akkusativ.","pages": 5,"kb": 179},{"file": "material/arbeitsblaetter/berufe-maennlich-und-weiblich.pdf","title": "Berufe: männlich und weiblich","level": "A1","cat": "wortschatz","desc": "der Arzt – die Ärztin, mit Beispielsätzen.","pages": 5,"kb": 45},{"file": "material/arbeitsblaetter/berufe-mit-uebersetzungen.pdf","title": "Berufe – mit Übersetzungen","level": "A1","cat": "wortschatz","desc": "Beispielsätze mit Übersetzungen in mehrere Sprachen.","pages": 9,"kb": 190},{"file": "material/arbeitsblaetter/gute-gruende-fuer-traumberufe.pdf","title": "Gute Gründe für Traumberufe","level": "A1","cat": "wortschatz","desc": "Warum ist ein Beruf schön?","pages": 3,"kb": 146},{"file": "material/arbeitsblaetter/die-uhrzeit-digital-und-inoffiziell.pdf","title": "Die Uhrzeit: digital und inoffiziell","level": "A1","cat": "wortschatz","desc": "07:30 → halb acht.","pages": 1,"kb": 181},{"file": "material/arbeitsblaetter/uhrzeiten-auf-einen-blick.pdf","title": "Uhrzeiten auf einen Blick","level": "A1","cat": "wortschatz","desc": "Viertel nach, halb, Viertel vor.","pages": 1,"kb": 321},{"file": "material/arbeitsblaetter/fragen-zur-uhrzeit.pdf","title": "Fragen zur Uhrzeit","level": "A1","cat": "wortschatz","desc": "Wann? Wie lange? Um wie viel Uhr?","pages": 1,"kb": 167},{"file": "material/arbeitsblaetter/staedte-in-deutschland.pdf","title": "Städte in Deutschland","level": "A1","cat": "wortschatz","desc": "Kurze Texte über deutsche Städte.","pages": 2,"kb": 139},{"file": "material/arbeitsblaetter/personen-und-kleidung-beschreiben.pdf","title": "Personen und Kleidung beschreiben","level": "A2","cat": "wortschatz","desc": "Wortschatz für die Bildbeschreibung.","pages": 4,"kb": 172},{"file": "material/arbeitsblaetter/sich-vorstellen.pdf","title": "Sich vorstellen","level": "A1","cat": "sprechen","desc": "Name, Herkunft, Wohnort – Fragen und Antworten.","pages": 2,"kb": 74},{"file": "material/arbeitsblaetter/ueber-die-heimat-sprechen.pdf","title": "Über die Heimat sprechen","level": "A1","cat": "sprechen","desc": "W-Fragen und Antworten zum Thema Heimat.","pages": 1,"kb": 123},{"file": "material/arbeitsblaetter/ein-gespraech-am-esstisch.pdf","title": "Ein Gespräch am Esstisch","level": "A2","cat": "sprechen","desc": "Impulse und wichtige Sätze für ein Gespräch.","pages": 3,"kb": 74},{"file": "material/arbeitsblaetter/mein-lieblingsgericht.pdf","title": "Mein Lieblingsgericht","level": "A1","cat": "sprechen","desc": "Ein Gericht vorstellen – Schritt für Schritt.","pages": 2,"kb": 82},{"file": "material/arbeitsblaetter/dialoge-zum-vorlesen.pdf","title": "Dialoge zum Vorlesen","level": "A1","cat": "sprechen","desc": "Kurze Szenen mit verteilten Rollen.","pages": 3,"kb": 139},{"file": "material/arbeitsblaetter/im-caf-dialog-zum-mitlesen.pdf","title": "Im Café: Dialog zum Mitlesen","level": "A1","cat": "lesen-hoeren","desc": "Text zum Hörverstehen „Fragen zum Text“.","pages": 1,"kb": 88},{"file": "material/arbeitsblaetter/fragen-zum-text-1-hoerverstehen.pdf","title": "Fragen zum Text 1 (Hörverstehen)","level": "A1","cat": "lesen-hoeren","desc": "Preise, Hausnummern und Telefonnummern verstehen.","pages": 1,"kb": 102},{"file": "material/arbeitsblaetter/fragen-zum-text-2-hoerverstehen.pdf","title": "Fragen zum Text 2 (Hörverstehen)","level": "A1","cat": "lesen-hoeren","desc": "Zeiten und Gleise am Bahnhof.","pages": 1,"kb": 100},{"file": "material/arbeitsblaetter/am-bahnhof-richtig-oder-falsch.pdf","title": "Am Bahnhof: richtig oder falsch?","level": "A1","cat": "lesen-hoeren","desc": "Eine Durchsage verstehen.","pages": 1,"kb": 160},{"file": "material/arbeitsblaetter/durchsagen-verstehen.pdf","title": "Durchsagen verstehen","level": "A2","cat": "lesen-hoeren","desc": "Welche Überschrift passt?","pages": 1,"kb": 147},{"file": "material/arbeitsblaetter/dtz-lesen-teil-2-anzeigen.pdf","title": "DTZ Lesen Teil 2: Anzeigen","level": "B1","cat": "pruefung","desc": "Welche Anzeige passt zu welcher Person?","pages": 2,"kb": 134},{"file": "material/arbeitsblaetter/dtz-lesen-teil-3-fragen-zum-text.pdf","title": "DTZ Lesen Teil 3: Fragen zum Text","level": "B1","cat": "pruefung","desc": "Informationen in einem Text finden.","pages": 1,"kb": 79},{"file": "material/arbeitsblaetter/dtz-lesen-teil-4-lueckentext.pdf","title": "DTZ Lesen Teil 4: Lückentext","level": "B1","cat": "pruefung","desc": "Das passende Wort wählen.","pages": 1,"kb": 57},{"file": "material/arbeitsblaetter/loesungen-zu-dtz-lesen-teil-2-4.pdf","title": "Lösungen zu DTZ Lesen Teil 2–4","level": "B1","cat": "pruefung","desc": "Mit Erklärungen.","pages": 1,"kb": 3939},{"file": "material/arbeitsblaetter/dtz-bild-beschreiben-redemittel.pdf","title": "DTZ Bild beschreiben: Redemittel","level": "B1","cat": "pruefung","desc": "Einleitung, Ort, Personen, Vermutungen.","pages": 3,"kb": 200},{"file": "material/arbeitsblaetter/dtz-sprechen-teil-3-wortschatz-zum-planen.pdf","title": "DTZ Sprechen Teil 3: Wortschatz zum Planen","level": "B1","cat": "pruefung","desc": "Vorschläge machen, zustimmen, ablehnen.","pages": 6,"kb": 4004},{"file": "material/arbeitsblaetter/dtz-schreiben-briefe-schritt-fuer-schritt.pdf","title": "DTZ Schreiben: Briefe Schritt für Schritt","level": "B1","cat": "pruefung","desc": "Formell, halbformell, informell – mit Checkliste.","pages": 20,"kb": 4249},{"file": "material/arbeitsblaetter/dtz-bild-beschreiben-alle-themen.pdf","title": "DTZ Bild beschreiben: alle Themen","level": "B1","cat": "pruefung","desc": "Die 5 Themenbereiche mit Beispielantworten.","pages": 40,"kb": 6294},{"file": "material/arbeitsblaetter/dtz-gemeinsam-etwas-planen.pdf","title": "DTZ Gemeinsam etwas planen","level": "B1","cat": "pruefung","desc": "Situationen, Wortschatz und Redemittel.","pages": 15,"kb": 4031},{"file": "material/arbeitsblaetter/dtz-hoeren-loesungen-zum-uebungssatz-1-g-a-s-t.pdf","title": "DTZ Hören: Lösungen zum Übungssatz 1 (g.a.s.t.)","level": "B1","cat": "pruefung","desc": "Lösungen mit Begründung. Den Übungssatz selbst gibt es kostenlos bei g.a.s.t.","pages": 13,"kb": 243},{"file": "material/arbeitsblaetter/sich-vorstellen-und-berufe.pdf","title": "Sich vorstellen und Berufe","level": "A1","cat": "unterricht","desc": "Unterrichtsstunde mit Partnerübungen.","pages": 20,"kb": 341},{"file": "material/arbeitsblaetter/artikel-der-erkennen.pdf","title": "Artikel DER erkennen","level": "A1","cat": "unterricht","desc": "Endungen, Regeln und Übungen – mit Übersetzungen.","pages": 18,"kb": 4268},{"file": "material/arbeitsblaetter/artikel-das-erkennen.pdf","title": "Artikel DAS erkennen","level": "A1","cat": "unterricht","desc": "Endungen und Hörverstehen.","pages": 17,"kb": 461},{"file": "material/arbeitsblaetter/die-uhrzeit.pdf","title": "Die Uhrzeit","level": "A1","cat": "unterricht","desc": "Viertel, halb, Minuten – mit Übungen.","pages": 17,"kb": 624},{"file": "material/arbeitsblaetter/der-imperativ.pdf","title": "Der Imperativ","level": "A1","cat": "unterricht","desc": "Bitten und Aufforderungen – mit Übersetzungen.","pages": 19,"kb": 4282},{"file": "material/arbeitsblaetter/eine-e-mail-verstehen-elternabend.pdf","title": "Eine E-Mail verstehen: Elternabend","level": "A1","cat": "unterricht","desc": "Wortschatz und Verständnisfragen.","pages": 9,"kb": 4103},{"file": "material/arbeitsblaetter/modalverben.pdf","title": "Modalverben","level": "A1","cat": "unterricht","desc": "können, müssen, wollen, dürfen, sollen.","pages": 14,"kb": 376},{"file": "material/arbeitsblaetter/possessivartikel-im-akkusativ.pdf","title": "Possessivartikel im Akkusativ","level": "A1","cat": "unterricht","desc": "Wem gehört das?","pages": 14,"kb": 4245},{"file": "material/arbeitsblaetter/das-perfekt-wiederholen.pdf","title": "Das Perfekt wiederholen","level": "A2","cat": "unterricht","desc": "Haben oder sein – mit Übersetzungen.","pages": 22,"kb": 4200},{"file": "material/arbeitsblaetter/der-dativ.pdf","title": "Der Dativ","level": "A2","cat": "unterricht","desc": "Verben und Pronomen im Dativ.","pages": 20,"kb": 4353},{"file": "material/arbeitsblaetter/am-bahnhof-datum-und-ordnungszahlen.pdf","title": "Am Bahnhof, Datum und Ordnungszahlen","level": "A2","cat": "unterricht","desc": "Der Wievielte ist heute?","pages": 36,"kb": 4724},{"file": "material/arbeitsblaetter/heimat-himmelsrichtungen-und-bild-beschreiben.pdf","title": "Heimat, Himmelsrichtungen und Bild beschreiben","level": "A2","cat": "unterricht","desc": "Woher kommst du? Wo liegt das?","pages": 21,"kb": 4401},{"file": "material/arbeitsblaetter/beim-arzt.pdf","title": "Beim Arzt","level": "A2","cat": "unterricht","desc": "Wichtige Sätze, Dialoge und Übungen.","pages": 13,"kb": 360},{"file": "material/arbeitsblaetter/seit-und-vor-dativ.pdf","title": "seit und vor + Dativ","level": "A2","cat": "unterricht","desc": "Seit wann? Wann?","pages": 16,"kb": 4125},{"file": "material/arbeitsblaetter/ja-nein-oder-doch.pdf","title": "Ja, nein oder doch?","level": "A2","cat": "unterricht","desc": "Antworten auf negative Fragen.","pages": 14,"kb": 4250},{"file": "material/arbeitsblaetter/adjektive-kleidung-beschreiben.pdf","title": "Adjektive: Kleidung beschreiben","level": "A2","cat": "unterricht","desc": "Adjektivdeklination im Nominativ und Akkusativ.","pages": 15,"kb": 4458}];
