/* Independent speaking tasks; format references are linked in oral.js. */
const oralProfiles=[
 ['name','Name und Alter','Ich heiße … und bin … Jahre alt.','Wie möchten Sie angesprochen werden?'],
 ['herkunft','Herkunft','Ich komme aus … . Dort bin ich in … aufgewachsen.','Was gefällt Ihnen an Ihrem Geburtsort?'],
 ['wohnen','Wohnort','Jetzt wohne ich in … . Ich lebe dort seit … .','Was gefällt Ihnen an Ihrem Wohnort?'],
 ['familie','Familie','Zu meiner Familie gehören … .','Was machen Sie gern mit Ihrer Familie oder mit Freunden?'],
 ['beruf','Beruf oder Ausbildung','Von Beruf bin ich … . Zurzeit … .','Was möchten Sie in Zukunft beruflich machen?'],
 ['sprachen','Sprachen','Meine Muttersprache ist … . Außerdem spreche ich … .','Wie lernen Sie neue deutsche Wörter?'],
 ['freizeit','Freizeit','In meiner Freizeit … . Das gefällt mir, weil … .','Welches Hobby würden Sie gern ausprobieren?']
];
const oralIntroQuestions=[
 'Was haben Sie gestern nach dem Deutschkurs gemacht?',
 'Welche Orte zeigen Sie Gästen in Ihrer Stadt?',
 'In welchen Situationen sprechen Sie Deutsch?',
 'Wie sieht ein normaler Tag bei Ihnen aus?',
 'Was möchten Sie in den nächsten Monaten lernen?',
 'Welche Arbeit haben Sie früher gemacht?',
 'Wie verbringen Sie einen freien Sonntag?',
 'Was war am Anfang in Deutschland neu für Sie?',
 'Wie kommen Sie normalerweise zum Deutschkurs?',
 'Welche Sprache möchten Sie noch lernen und warum?',
 'Was machen Sie gern mit Freunden?',
 'Welche Pläne haben Sie für das nächste Wochenende?'
];
const oralPictures=[
 {id:'markt',title:'Auf dem Wochenmarkt',alt:'Eine Kundin in blauer Jacke kauft Äpfel bei einem Verkäufer an einem Marktstand.',questions:['Wo befinden sich die Personen?','Was macht die Kundin? Was macht der Verkäufer?','Welche Lebensmittel und Gegenstände siehst du?','Welche Kleidung tragen die Personen?'],experience:['Wo kaufst du Obst und Gemüse ein?','Was ist dir beim Einkaufen wichtig?']},
 {id:'arzt',title:'In der Arztpraxis',alt:'Eine Person in grünem Pullover spricht am Schreibtisch mit einer Ärztin im weißen Kittel.',questions:['Wo findet das Gespräch statt?','Welche Personen siehst du?','Wie sitzen die Personen und was machen sie?','Welche Gegenstände helfen dir, den Ort zu erkennen?'],experience:['Wie vereinbarst du einen Arzttermin?','Was nimmst du zu einem Termin in der Praxis mit?']},
 {id:'park',title:'Freizeit im Park',alt:'Zwei Erwachsene sitzen auf einer Bank im Park. Ein Kind spielt auf dem Rasen mit einem Ball.',questions:['Was siehst du im Vordergrund und im Hintergrund?','Was machen die Erwachsenen? Was macht das Kind?','Wie ist das Wetter? Woran erkennst du das?','Wie wirkt die Situation auf dich?'],experience:['Was machst du gern draußen?','Welche Freizeitmöglichkeiten gibt es in deiner Nähe?']},
 {id:'umzug',title:'Eine neue Wohnung',alt:'Zwei Erwachsene tragen gemeinsam einen Umzugskarton durch eine Tür; weitere Kartons stehen daneben.',questions:['Was tragen die Personen?','Wo stehen die anderen Gegenstände?','Was könnte der Anlass sein?','Wie helfen sich die Personen?'],experience:['Wie kann man jemandem beim Umzug helfen?','Was ist dir bei einer Wohnung wichtig?']},
 {id:'kueche',title:'Zusammen kochen',alt:'Zwei Erwachsene bereiten gemeinsam Gemüse in einer hellen Küche vor.',questions:['In welchem Raum sind die Personen?','Was machen ihre Hände?','Welche Lebensmittel und Küchengeräte siehst du?','Wie könnten die Personen die Aufgaben aufteilen?'],experience:['Was kochst du gern?','Kochst du lieber allein oder mit anderen? Warum?']},
 {id:'bus',title:'An der Haltestelle',alt:'Drei Erwachsene warten an einer Bushaltestelle in der Stadt. Ein Bus nähert sich.',questions:['Wo warten die Personen?','Was siehst du auf der Straße?','Was tragen die Personen bei sich?','Was könnte als Nächstes passieren?'],experience:['Welche Verkehrsmittel benutzt du im Alltag?','Was machst du, wenn dein Bus Verspätung hat?']}
];
const oralPictureStarters=[
 ['Ort und Überblick','Auf dem Bild sehe ich … . Die Szene spielt vermutlich … .'],
 ['Personen und Handlungen','Im Vordergrund … . Die Person links … . Im Hintergrund … .'],
 ['Kleidung und Einzelheiten','Die Person trägt … . Neben … steht … .'],
 ['Vermutungen begründen','Vielleicht … . Ich vermute das, weil … .'],
 ['Eigene Erfahrungen','Bei mir ist das so: … . Ich habe einmal … .'],
 ['Vergleichen','In meinem Herkunftsland … . Hier in Deutschland … .']
];
const oralPlanCases=[
 {title:'Ein Picknick organisieren',task:'Euer Deutschkurs möchte am Wochenende gemeinsam picknicken.',points:['Ort und Treffpunkt','Tag und Uhrzeit','Essen und Getränke','Anreise und Kosten','Alternative bei Regen'],twist:'Für den geplanten Tag ist Regen angekündigt.'},
 {title:'Beim Umzug helfen',task:'Eine Person aus eurem Kurs zieht in eine neue Wohnung. Ihr möchtet helfen.',points:['Passender Termin','Fahrzeug und Transport','Kartons und Werkzeug','Aufgabenverteilung','Essen für die Helfer'],twist:'Das ausgeliehene Auto steht nur vormittags zur Verfügung.'},
 {title:'Eine Abschiedsfeier planen',task:'Eine Person aus eurem Kurs zieht in eine andere Stadt. Ihr plant eine kleine Feier.',points:['Ort und Termin','Einladungen','Essen und Getränke','Geschenk und Budget','Vorbereitung und Aufräumen'],twist:'Der gewünschte Raum ist an diesem Tag schon belegt.'},
 {title:'Gemeinsam ins Kino gehen',task:'Ihr möchtet mit Freunden einen Film auf Deutsch sehen.',points:['Film auswählen','Tag und Vorstellung','Treffpunkt und Anreise','Karten kaufen','Etwas nach dem Film unternehmen'],twist:'Ein Freund kann erst ab 19 Uhr kommen.'},
 {title:'Einen Kursraum verschönern',task:'Euer Kursraum soll freundlicher werden. Ihr organisiert einen gemeinsamen Nachmittag.',points:['Termin','Ideen für den Raum','Material und Kosten','Aufgaben verteilen','Raum anschließend aufräumen'],twist:'Ihr dürft nichts an die Wände kleben oder bohren.'},
 {title:'Einen Ausflug machen',task:'Ihr plant mit dem Kurs einen Tagesausflug in eine Nachbarstadt.',points:['Ziel und Aktivitäten','Hin- und Rückfahrt','Treffpunkt','Verpflegung','Gemeinsames Budget'],twist:'Eine Person kann nicht lange zu Fuß gehen.'},
 {title:'Eine Lerngruppe gründen',task:'Ihr möchtet euch regelmäßig außerhalb des Kurses auf die DTZ-Prüfung vorbereiten.',points:['Tag und Dauer','Treffpunkt','Materialien','Themen und Aufgaben','Kontakt bei Absagen'],twist:'Eine Person kann nur von zu Hause aus teilnehmen.'},
 {title:'Einen Geburtstag vorbereiten',task:'Eine Freundin hat bald Geburtstag. Ihr organisiert gemeinsam eine Überraschung.',points:['Termin und Ort','Gäste einladen','Geschenk','Essen und Getränke','Aufgaben verteilen'],twist:'Die Freundin hat am Geburtstag selbst keine Zeit.'}
];
const oralPlanPhrases=[['Vorschlagen','Wir könnten … . Wie wäre es mit …?'],['Nachfragen','Wann passt es dir? Was meinst du dazu?'],['Zustimmen','Das passt gut. Damit bin ich einverstanden.'],['Anders vorschlagen','Das geht bei mir leider nicht. Können wir stattdessen …?'],['Aufgaben verteilen','Ich kümmere mich um … . Könntest du … übernehmen?'],['Zusammenfassen','Also: Wir treffen uns … . Du … und ich … .']];
const oralB2Topics=[
 {title:'Ein Betrieb, den ich kenne',prompt:'Stelle einen früheren oder gewünschten Arbeitgeber vor. Erkläre anhand konkreter Beispiele, wie dort gearbeitet wird.',points:['Was bietet der Betrieb an?','Welche Aufgaben haben verschiedene Teams?','Was findest du dort besonders interessant?'],questions:['Welche Aufgabe würden Sie dort besonders gern übernehmen?','Was unterscheidet diesen Betrieb von anderen?','Welche Herausforderung könnte Sie dort erwarten?']},
 {title:'Gute Bedingungen bei der Arbeit',prompt:'Erkläre, unter welchen Bedingungen du gut arbeiten kannst. Begründe deine Prioritäten mit Beispielen.',points:['Sicherheit und Entwicklungsmöglichkeiten','Zusammenarbeit und Bezahlung','Eine Erfahrung, die deine Meinung geprägt hat'],questions:['Was wäre Ihnen bei einem Stellenwechsel am wichtigsten?','Wie könnte ein Team seine Zusammenarbeit verbessern?','Welchen Kompromiss würden Sie akzeptieren?']},
 {title:'Mein Weg zum Beruf',prompt:'Erzähle, wie du zu deinem Beruf oder Berufswunsch gekommen bist.',points:['Ein entscheidendes Erlebnis','Menschen, die dir geholfen haben','Was sich dadurch für dich verändert hat'],questions:['Würden Sie sich heute wieder so entscheiden?','Welche andere Tätigkeit wäre für Sie interessant?','Welche Fähigkeit mussten Sie besonders üben?']},
 {title:'Eine Person als berufliches Vorbild',prompt:'Stelle eine Person vor, von der du für dein Berufsleben etwas gelernt hast.',points:['Woher kennst du die Person?','Ein Beispiel für ihre Arbeitsweise','Was möchtest du selbst davon übernehmen?'],questions:['Was haben Sie bereits von dieser Person übernommen?','Welche Eigenschaft beeindruckt Sie besonders?','Gibt es auch etwas, das Sie anders machen würden?']},
 {title:'Eine neue Stelle suchen',prompt:'Erkläre an einem selbst gewählten Land, wie du bei der Suche nach einer passenden Stelle vorgehen würdest.',points:['Geeignete Angebote finden','Kontakt zum Betrieb aufnehmen','Die Bewerbung vorbereiten'],questions:['Wie würden Sie ein passendes Angebot erkennen?','Was tun Sie, wenn Sie keine Antwort bekommen?','Welche Unterstützung würden Sie nutzen?']},
 {title:'Im Vorstellungsgespräch überzeugen',prompt:'Erkläre für ein Land und ein Berufsfeld deiner Wahl, wie du dich auf ein Vorstellungsgespräch vorbereitest.',points:['Informationen über den Betrieb','Auftreten und Kleidung','Eigene Beispiele und Fragen'],questions:['Wie reagieren Sie auf eine schwierige Frage?','Welche Frage würden Sie dem Arbeitgeber stellen?','Wie zeigen Sie Ihre Stärken anhand eines Beispiels?']},
 {title:'Ein Angebot mit Nutzen',prompt:'Stelle ein Produkt oder eine Dienstleistung vor, die du gut kennst, und bewerte sie.',points:['Eigenschaften und Zielgruppe','Nutzen im Alltag','Stärken und Grenzen'],questions:['Für wen ist das Angebot weniger geeignet?','Was würden Sie an dem Angebot verbessern?','Woran erkennen Sie, ob Kunden zufrieden sind?']},
 {title:'Meine Idee für die Selbstständigkeit',prompt:'Entwickle eine Geschäftsidee und erkläre, wie du erste Kunden erreichen möchtest.',points:['Angebot und Zielgruppe','Was macht deine Idee besonders?','Erste Schritte und mögliche Schwierigkeiten'],questions:['Wie würden Sie Ihre ersten Kunden gewinnen?','Welche Kosten müssten Sie zuerst einplanen?','Wie könnten Sie Ihre Idee mit wenig Risiko ausprobieren?']}
];
const oralSmallTalk=[
 ['Mittagspause','Ich bringe meistens Essen von zu Hause mit. Wie machst du das?','Zeit nach Feierabend','Nach der Arbeit bin ich oft müde. Wie entspannst du dich?'],
 ['Weiterbildung','Ich möchte einen Computerkurs besuchen. Was würdest du gern lernen?','Arbeitsweg','Ich überlege, mit dem Fahrrad zur Arbeit zu fahren. Wäre das etwas für dich?'],
 ['Urlaub','Ich bleibe im nächsten Urlaub zu Hause. Was machst du gern im Urlaub?','Zusammenarbeit','Mir hilft es, Aufgaben morgens kurz im Team zu besprechen. Wie ist das bei dir?'],
 ['Früher anfangen','Ich arbeite morgens besonders gern. Wann kannst du dich am besten konzentrieren?','Bewegung','Ich möchte mich in den Pausen mehr bewegen. Hast du eine Idee?'],
 ['Neue Kollegen','Morgen beginnt jemand Neues bei uns. Wie war dein erster Arbeitstag?','Essen bestellen','Wir könnten am Freitag zusammen etwas bestellen. Was würdest du wählen?'],
 ['Erreichbarkeit','Nach Feierabend schaue ich selten auf mein Diensthandy. Wie hältst du das?','Lernen im Alltag','Ich höre auf dem Arbeitsweg deutsche Podcasts. Wie übst du Deutsch?']
];
const oralB2Problems=[
 {title:'Zu wenige Tagungsmappen',text:'Ihr arbeitet in einem Tagungshaus. Morgen werden 45 Gäste erwartet, aber es sind nur 30 Mappen angekommen. Die Druckerei ist heute schwer erreichbar.',points:['Was ist jetzt am dringendsten?','Welche Alternative gibt es?','Wer fragt bei wem nach?','Wie informiert ihr die Veranstaltungsleitung?','Wie verhindert ihr eine Wiederholung?'],twist:'Die Leitung genehmigt höchstens 60 Euro zusätzliche Kosten.'},
 {title:'Ausfall an der Rezeption',text:'Ihr arbeitet in einem Hotel. Eine Person an der Rezeption fällt kurzfristig aus. Heute Abend kommt eine Reisegruppe, und mehrere Zimmer sind noch nicht fertig.',points:['Welche Aufgaben haben Vorrang?','Wer kann unterstützen?','Wie stimmt ihr euch mit dem Reinigungsteam ab?','Was sagt ihr wartenden Gästen?','Wie verbessert ihr die Vertretungsplanung?'],twist:'Aus dem Nachbarteam kann erst in einer Stunde jemand helfen.'},
 {title:'Ein Termin kann nicht stattfinden',text:'Ihr arbeitet in einem Handwerksbetrieb. Für morgen ist eine Reparatur zugesagt, aber ein benötigtes Ersatzteil wird verspätet geliefert. Der Kunde braucht das Gerät dringend.',points:['Lieferstatus prüfen','Eine Zwischenlösung finden','Den Kunden informieren','Zuständigkeiten festlegen','Zuverlässigere Terminplanung'],twist:'Der Kunde lehnt eine Verschiebung auf die nächste Woche ab.'},
 {title:'Ein Raum ist doppelt gebucht',text:'Ihr organisiert Schulungen. Für morgen stehen zwei Gruppen im selben Raum im Kalender. Ein weiterer Raum ist kleiner und hat keinen Bildschirm.',points:['Anforderungen beider Gruppen klären','Andere Räume oder Technik organisieren','Vor- und Nachteile vergleichen','Teilnehmende informieren','Doppelbuchungen verhindern'],twist:'Eine Gruppe braucht unbedingt einen barrierefreien Raum.'},
 {title:'Die Bestellung ist unvollständig',text:'Ihr arbeitet in einer Großküche. Für das Mittagessen fehlen wichtige Zutaten. In zwei Stunden sollen 70 Essen fertig sein, darunter mehrere vegetarische Gerichte.',points:['Bestände prüfen','Ein Ersatzgericht planen','Kosten und Einkauf klären','Gäste informieren','Lieferkontrolle verbessern'],twist:'Das Ersatzgericht muss auch ohne Milchprodukte möglich sein.'},
 {title:'Probleme mit der neuen Software',text:'Ihr arbeitet in einem Büro. Seit einer Umstellung können mehrere Mitarbeitende keine Rechnungen erstellen. Heute müssen wichtige Aufträge abgeschlossen werden.',points:['Fehler eingrenzen','Technische Hilfe organisieren','Eine sichere Zwischenlösung prüfen','Kunden und Leitung informieren','Künftige Umstellungen vorbereiten'],twist:'Der technische Support kann erst am Nachmittag zurückrufen.'}
];
