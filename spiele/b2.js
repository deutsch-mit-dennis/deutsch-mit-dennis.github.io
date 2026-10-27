/* Lernspiele für die Prüfung DTB B2 Beruf (spiele.js / DMGame, spiele/kit.js / DMKit) */
(() => {
  if (!window.DMGame || !window.DMKit) return;

  /* 1) Nomen-Verb-Verbindungen: [Satz mit ___, richtig, [3 Ablenker], Bedeutung] */
  const NVV = [
    ['Sie müssen bis Freitag einen Antrag auf Elterngeld ___.', 'stellen', ['machen', 'geben', 'nehmen'], 'einen Antrag stellen = etwas beantragen'],
    ['Die Geschäftsleitung wird morgen eine Entscheidung ___.', 'treffen', ['machen', 'stellen', 'ziehen'], 'eine Entscheidung treffen = entscheiden'],
    ['Darf ich einen Vorschlag ___?', 'machen', ['stellen', 'treffen', 'führen'], 'einen Vorschlag machen = etwas vorschlagen'],
    ['Der Kunde hat Kritik an unserem Service ___.', 'geübt', ['gemacht', 'gestellt', 'getroffen'], 'Kritik üben = kritisieren'],
    ['Bitte ___ Sie Rücksicht auf die Kollegen im Großraumbüro.', 'nehmen', ['geben', 'machen', 'halten'], 'Rücksicht nehmen auf = an andere denken'],
    ['Wir können Ihnen einen Laptop zur Verfügung ___.', 'stellen', ['geben', 'setzen', 'legen'], 'zur Verfügung stellen = bereitstellen'],
    ['Das neue System wird im Januar in Betrieb ___.', 'genommen', ['gesetzt', 'gestellt', 'gebracht'], 'in Betrieb nehmen = starten, benutzen'],
    ['Können wir das Problem im nächsten Meeting zur Sprache ___?', 'bringen', ['stellen', 'nehmen', 'setzen'], 'zur Sprache bringen = ansprechen'],
    ['Herr Weber hat sich mit dem Lieferanten in Verbindung ___.', 'gesetzt', ['gestellt', 'gelegt', 'gebracht'], 'sich in Verbindung setzen = Kontakt aufnehmen'],
    ['Der Betriebsrat muss seine Zustimmung ___.', 'geben', ['machen', 'stellen', 'nehmen'], 'die Zustimmung geben = zustimmen'],
    ['Wir müssen das Problem endlich in Angriff ___.', 'nehmen', ['bringen', 'setzen', 'stellen'], 'in Angriff nehmen = mit etwas anfangen'],
    ['Unser Team ___ die Verantwortung für das Projekt.', 'trägt', ['macht', 'stellt', 'gibt'], 'die Verantwortung tragen = verantwortlich sein'],
    ['Die Kollegin hat einen wichtigen Beitrag zum Erfolg ___.', 'geleistet', ['gemacht', 'gestellt', 'getan'], 'einen Beitrag leisten = beitragen'],
    ['Wir sollten die Kosten im Auge ___.', 'behalten', ['stellen', 'nehmen', 'bringen'], 'im Auge behalten = beobachten, kontrollieren'],
    ['Die neue Regel ___ am 1. Januar in Kraft.', 'tritt', ['kommt', 'geht', 'steht'], 'in Kraft treten = ab jetzt gelten'],
    ['Bitte ___ Sie mir Bescheid, wenn die Ware da ist.', 'geben', ['machen', 'stellen', 'nehmen'], 'Bescheid geben = informieren'],
    ['Wir müssen bis Montag eine Lösung ___.', 'finden', ['treffen', 'machen', 'stellen'], 'eine Lösung finden = ein Problem lösen'],
    ['Die Chefin hat mir eine Frist bis Ende des Monats ___.', 'gesetzt', ['gestellt', 'gemacht', 'genommen'], 'eine Frist setzen = einen letzten Termin bestimmen'],
    ['Ich ___ großen Wert auf Pünktlichkeit.', 'lege', ['stelle', 'mache', 'setze'], 'Wert legen auf = etwas wichtig finden'],
    ['Der Kunde ___ uns mit seinen Terminen unter Druck.', 'setzt', ['stellt', 'legt', 'macht'], 'unter Druck setzen = Stress machen'],
    ['Wir haben mit der Firma einen Vertrag ___.', 'abgeschlossen', ['gestellt', 'getroffen', 'genommen'], 'einen Vertrag abschließen = einen Vertrag machen und unterschreiben'],
    ['Die Teilnehmer ___ eine lebhafte Diskussion.', 'führten', ['stellten', 'trafen', 'legten'], 'eine Diskussion führen = diskutieren'],
    ['Am Ende des Projekts ___ die Leiterin Bilanz.', 'zog', ['stellte', 'nahm', 'traf'], 'Bilanz ziehen = das Ergebnis bewerten'],
    ['Herr Kaya ___ morgen einen Vortrag über Digitalisierung.', 'hält', ['stellt', 'führt', 'trifft'], 'einen Vortrag halten = vor Publikum sprechen'],
    ['Haben Sie schon Kontakt mit der Personalabteilung ___?', 'aufgenommen', ['gestellt', 'getroffen', 'gegeben'], 'Kontakt aufnehmen = sich melden'],
    ['Wir müssen die Wünsche der Kunden stärker in Betracht ___.', 'ziehen', ['nehmen', 'stellen', 'bringen'], 'in Betracht ziehen = berücksichtigen'],
    ['Wer ___ die Leitung des neuen Projekts?', 'übernimmt', ['stellt', 'trifft', 'legt'], 'die Leitung übernehmen = Chef/in werden'],
    ['Wir sollten uns ein Beispiel an diesem Team ___.', 'nehmen', ['machen', 'geben', 'stellen'], 'sich ein Beispiel nehmen an = etwas genauso gut machen wollen'],
    ['Der Lieferant hat uns ein gutes Angebot ___.', 'gemacht', ['gestellt', 'getroffen', 'geführt'], 'ein Angebot machen = etwas anbieten'],
    ['Ich möchte Ihre Aufmerksamkeit auf ein Problem ___.', 'lenken', ['stellen', 'setzen', 'machen'], 'die Aufmerksamkeit lenken auf = zeigen, was wichtig ist'],
    ['Bitte ___ Sie Stellung zu den Vorwürfen des Kunden.', 'nehmen', ['geben', 'machen', 'stellen'], 'Stellung nehmen = seine Meinung sagen, sich äußern'],
    ['Die Mitarbeiterin hat eine Beschwerde ___.', 'eingereicht', ['getroffen', 'gesetzt', 'genommen'], 'eine Beschwerde einreichen = sich offiziell beschweren'],
    ['Die Firma wird die Kosten in voller Höhe ___.', 'übernehmen', ['nehmen', 'treffen', 'stellen'], 'die Kosten übernehmen = bezahlen'],
    ['Der neue Kollege hat schnell Anschluss im Team ___.', 'gefunden', ['genommen', 'gemacht', 'gestellt'], 'Anschluss finden = Kontakt finden, dazugehören'],
    ['Können Sie bitte Auskunft über den Stand des Projekts ___?', 'geben', ['machen', 'stellen', 'nehmen'], 'Auskunft geben = informieren']
  ];

  /* 2) Verben mit Präposition: [Satz mit ___, richtig, [3 Ablenker], Regel] */
  const PRAEP = [
    ['Ich bewerbe mich ___ die Stelle als Sachbearbeiterin.', 'um', ['für', 'auf', 'an'], 'sich bewerben um + Akkusativ'],
    ['Der Kunde beschwert sich ___ die lange Lieferzeit.', 'über', ['von', 'auf', 'um'], 'sich beschweren über + Akkusativ'],
    ['Nächste Woche nehme ich ___ einer Schulung teil.', 'an', ['in', 'bei', 'zu'], 'teilnehmen an + Dativ'],
    ['Wer kümmert sich ___ die neuen Auszubildenden?', 'um', ['für', 'an', 'über'], 'sich kümmern um + Akkusativ'],
    ['Sie können sich ___ mich verlassen.', 'auf', ['an', 'zu', 'von'], 'sich verlassen auf + Akkusativ'],
    ['Ich möchte mich ___ die Verspätung entschuldigen.', 'für', ['über', 'um', 'von'], 'sich entschuldigen für + Akkusativ'],
    ['Ich beziehe mich ___ Ihre E-Mail vom 3. März.', 'auf', ['an', 'zu', 'über'], 'sich beziehen auf + Akkusativ'],
    ['Der Preis hängt ___ der Bestellmenge ab.', 'von', ['an', 'auf', 'mit'], 'abhängen von + Dativ'],
    ['Nach langer Diskussion haben wir uns ___ einen Kompromiss geeinigt.', 'auf', ['an', 'um', 'zu'], 'sich einigen auf + Akkusativ'],
    ['Bei dem Lärm kann ich mich nicht ___ meine Arbeit konzentrieren.', 'auf', ['an', 'für', 'zu'], 'sich konzentrieren auf + Akkusativ'],
    ['Ich habe mich schnell ___ die neuen Arbeitszeiten gewöhnt.', 'an', ['auf', 'zu', 'mit'], 'sich gewöhnen an + Akkusativ'],
    ['Frau Kraus ist ___ die Buchhaltung zuständig.', 'für', ['über', 'an', 'um'], 'zuständig sein für + Akkusativ'],
    ['Ich bedanke mich ___ Ihre schnelle Antwort.', 'für', ['über', 'um', 'auf'], 'sich bedanken für + Akkusativ'],
    ['Wir warten noch ___ die Antwort der Firma.', 'auf', ['für', 'nach', 'um'], 'warten auf + Akkusativ'],
    ['Ich freue mich schon ___ das Teamessen nächste Woche.', 'auf', ['über', 'an', 'um'], 'sich freuen auf = Zukunft · sich freuen über = jetzt/Vergangenheit'],
    ['Alle Abteilungen sollen sich ___ dem Projekt beteiligen.', 'an', ['bei', 'in', 'zu'], 'sich beteiligen an + Dativ'],
    ['Ich habe großes Interesse ___ dieser Stelle.', 'an', ['für', 'über', 'auf'], 'Interesse haben an + Dativ'],
    ['Bitte informieren Sie sich vorher ___ das Unternehmen.', 'über', ['von', 'um', 'an'], 'sich informieren über + Akkusativ'],
    ['Unser Team besteht ___ fünf Personen.', 'aus', ['von', 'mit', 'in'], 'bestehen aus + Dativ'],
    ['Achten Sie bitte ___ die Sicherheitsvorschriften.', 'auf', ['an', 'für', 'nach'], 'achten auf + Akkusativ'],
    ['Bei Fragen wenden Sie sich bitte ___ Frau Yilmaz.', 'an', ['zu', 'auf', 'bei'], 'sich wenden an + Akkusativ'],
    ['Darf ich Sie ___ unseren Termin morgen erinnern?', 'an', ['über', 'auf', 'von'], 'erinnern an + Akkusativ'],
    ['Jeder kann ___ einem guten Arbeitsklima beitragen.', 'zu', ['an', 'für', 'bei'], 'beitragen zu + Dativ'],
    ['Der kleine Fehler hat ___ großen Problemen geführt.', 'zu', ['an', 'nach', 'auf'], 'führen zu + Dativ'],
    ['Bei dem Anruf handelt es sich ___ eine Reklamation.', 'um', ['über', 'von', 'an'], 'es handelt sich um + Akkusativ'],
    ['Ich bin ___ dieser Idee überzeugt.', 'von', ['über', 'an', 'für'], 'überzeugt sein von + Dativ'],
    ['Wir müssen uns ___ den Wünschen der Kunden auseinandersetzen.', 'mit', ['über', 'an', 'zu'], 'sich auseinandersetzen mit + Dativ'],
    ['Die Chefin ist sehr zufrieden ___ deiner Arbeit.', 'mit', ['über', 'von', 'an'], 'zufrieden sein mit + Dativ'],
    ['Der Betriebsrat setzt sich ___ bessere Arbeitszeiten ein.', 'für', ['um', 'an', 'auf'], 'sich einsetzen für + Akkusativ'],
    ['Auf dieses Gerät können wir nicht verzichten. – Richtig: verzichten ___', 'auf', ['an', 'von', 'über'], 'verzichten auf + Akkusativ'],
    ['Niemand zweifelt ___ ihrer Kompetenz.', 'an', ['über', 'von', 'um'], 'zweifeln an + Dativ'],
    ['Ein Kunde hat ___ Ihnen gefragt.', 'nach', ['von', 'über', 'an'], 'fragen nach + Dativ'],
    ['Die Firma lädt alle Mitarbeitenden ___ der Weihnachtsfeier ein.', 'zu', ['an', 'für', 'auf'], 'einladen zu + Dativ'],
    ['Wir rechnen ___ einer Antwort bis Freitag.', 'mit', ['auf', 'an', 'für'], 'rechnen mit + Dativ'],
    ['Er hat sich sehr ___ den Fehler im Bericht geärgert.', 'über', ['an', 'von', 'um'], 'sich ärgern über + Akkusativ'],
    ['Wir sprechen morgen ___ das neue Budget.', 'über', ['von', 'an', 'um'], 'sprechen über + Akkusativ'],
    ['Die Kollegin sorgt ___ gute Stimmung im Team.', 'für', ['um', 'an', 'über'], 'sorgen für + Akkusativ'],
    ['Ich habe lange ___ das Angebot nachgedacht.', 'über', ['an', 'von', 'um'], 'nachdenken über + Akkusativ']
  ].filter(x => !x[0].includes('– Richtig'));

  /* 3) Konnektoren: [Satz mit ___, richtig, [3 Ablenker], Tipp] */
  const KON = [
    ['Die Lieferung kam zu spät, ___ hat sich der Kunde beschwert.', 'deshalb', ['obwohl', 'trotzdem', 'weil'], 'deshalb = Folge, danach Verb auf Position 2'],
    ['___ wir viel zu tun haben, nimmt sich die Chefin Zeit für uns.', 'Obwohl', ['Weil', 'Deshalb', 'Trotzdem'], 'obwohl = Gegensatz, Nebensatz (Verb am Ende)'],
    ['Der Drucker ist kaputt. ___ müssen wir den Bericht heute abgeben.', 'Trotzdem', ['Deshalb', 'Obwohl', 'Weil'], 'trotzdem = Gegensatz, Hauptsatz (Verb auf Position 2)'],
    ['Ich rufe den Kunden an, ___ wir den Termin bestätigen können.', 'damit', ['obwohl', 'trotzdem', 'deshalb'], 'damit = Ziel/Zweck (Nebensatz)'],
    ['___ Sie Fragen haben, melden Sie sich bitte bei mir.', 'Falls', ['Obwohl', 'Damit', 'Trotzdem'], 'falls = Bedingung (wie „wenn“)'],
    ['Wir sparen Kosten, ___ wir weniger Papier drucken.', 'indem', ['damit', 'obwohl', 'trotzdem'], 'indem = Art und Weise: Wie spart man Kosten?'],
    ['Es gab einen Stromausfall, ___ das System stundenlang nicht funktionierte.', 'sodass', ['damit', 'obwohl', 'indem'], 'sodass = Folge (Nebensatz)'],
    ['___ ich die Unterlagen habe, schicke ich sie Ihnen.', 'Sobald', ['Obwohl', 'Damit', 'Trotzdem'], 'sobald = direkt nachdem (Zeit)'],
    ['___ die eine Hälfte des Teams im Büro arbeitet, arbeitet die andere zu Hause.', 'Während', ['Damit', 'Indem', 'Trotzdem'], 'während = gleichzeitig oder Gegensatz'],
    ['Das Projekt hatte viele Probleme, ___ war es am Ende ein Erfolg.', 'trotzdem', ['deshalb', 'obwohl', 'weil'], 'trotzdem = Gegensatz (Hauptsatz)'],
    ['Nicht nur die Kosten sind gestiegen, ___ auch die Arbeitszeit.', 'sondern', ['aber', 'und', 'oder'], 'nicht nur … sondern auch'],
    ['Sie können uns entweder per E-Mail ___ telefonisch erreichen.', 'oder', ['und', 'noch', 'als'], 'entweder … oder'],
    ['Wir haben weder Zeit ___ Geld für ein neues Projekt.', 'noch', ['oder', 'und', 'nicht'], 'weder … noch'],
    ['Je mehr Erfahrung Sie haben, ___ höher ist meist das Gehalt.', 'desto', ['als', 'wie', 'dann'], 'je … desto (oder: je … umso)'],
    ['Ich konnte nicht zur Besprechung kommen, ___ ich krank war.', 'weil', ['deshalb', 'trotzdem', 'obwohl'], 'weil = Grund (Nebensatz)'],
    ['___ Sie das Gerät benutzen, lesen Sie bitte die Anleitung.', 'Bevor', ['Nachdem', 'Seitdem', 'Obwohl'], 'bevor = zuerst die Anleitung, dann das Gerät'],
    ['___ ich in dieser Firma arbeite, habe ich viel gelernt.', 'Seitdem', ['Bevor', 'Obwohl', 'Damit'], 'seitdem = von einem Zeitpunkt bis jetzt'],
    ['___ die Besprechung beendet war, gingen alle in die Mittagspause.', 'Nachdem', ['Obwohl', 'Damit', 'Indem'], 'nachdem = zuerst A, dann B (oft mit Plusquamperfekt)'],
    ['Der Kollege ist krank. ___ übernehme ich heute seine Termine.', 'Deshalb', ['Trotzdem', 'Obwohl', 'Weil'], 'deshalb = Folge (Hauptsatz)'],
    ['Das Meeting fällt aus, ___ der Chef auf Dienstreise ist.', 'da', ['deshalb', 'trotzdem', 'sodass'], 'da = weil (Grund, Nebensatz)'],
    ['Sie kam pünktlich zur Arbeit, ___ ihr Zug Verspätung hatte.', 'obwohl', ['weil', 'deshalb', 'damit'], 'obwohl = Gegensatz (Nebensatz)'],
    ['Bitte prüfen Sie die Rechnung, ___ Sie sie bezahlen.', 'bevor', ['nachdem', 'seitdem', 'obwohl'], 'bevor = zuerst prüfen, dann bezahlen'],
    ['Der Umsatz ist gesunken. ___ stellt die Firma zurzeit niemanden ein.', 'Folglich', ['Obwohl', 'Trotzdem', 'Damit'], 'folglich = deshalb (Folge, Hauptsatz)'],
    ['Ich mache eine Weiterbildung, ___ ich später Teamleiterin werden kann.', 'damit', ['obwohl', 'trotzdem', 'nachdem'], 'damit = Ziel/Zweck'],
    ['Einerseits ist Homeoffice bequem, ___ fehlt der Kontakt zu den Kollegen.', 'andererseits', ['einerseits', 'sondern', 'deshalb'], 'einerseits … andererseits'],
    ['Sowohl die Mitarbeitenden ___ auch die Kunden profitieren davon.', 'als', ['wie', 'und', 'noch'], 'sowohl … als auch'],
    ['___ lange zu warten, sollten wir den Kunden direkt anrufen.', 'Anstatt', ['Um', 'Damit', 'Obwohl'], 'anstatt … zu = etwas anderes machen'],
    ['Er hat den Vertrag unterschrieben, ___ ihn genau zu lesen.', 'ohne', ['um', 'damit', 'indem'], 'ohne … zu = etwas nicht machen'],
    ['Ich lerne jeden Abend Fachwörter, ___ in der Prüfung sicherer zu sein.', 'um', ['ohne', 'anstatt', 'damit'], 'um … zu = Ziel (gleiches Subjekt). „damit“ steht nie mit „zu“.'],
    ['Die Software ist zwar teuer, ___ sie spart uns viel Zeit.', 'aber', ['denn', 'oder', 'sondern'], 'zwar … aber'],
    ['Wir müssen schnell handeln, ___ der Kunde wartet auf eine Antwort.', 'denn', ['weil', 'deshalb', 'obwohl'], 'denn = Grund, aber Verb auf Position 2 (wie im Hauptsatz)'],
    ['___ der neue Kollege eingearbeitet ist, kann er allein arbeiten.', 'Sobald', ['Obwohl', 'Indem', 'Trotzdem'], 'sobald = direkt nachdem (Zeit)']
  ];

  /* 4) Redemittel: [Redemittel, Funktion, Bereich s = Sprechen / w = Schreiben] */
  const RM = [
    ['Meiner Ansicht nach sollten wir das Projekt verschieben.', 'Meinung äußern', 's'],
    ['Ich bin der Meinung, dass flexible Arbeitszeiten sinnvoll sind.', 'Meinung äußern', 's'],
    ['Aus meiner Sicht ist das die beste Lösung.', 'Meinung äußern', 's'],
    ['Ich vertrete den Standpunkt, dass Weiterbildung wichtig ist.', 'Meinung äußern', 's'],
    ['Da stimme ich Ihnen voll und ganz zu.', 'Zustimmen', 's'],
    ['Das sehe ich genauso.', 'Zustimmen', 's'],
    ['Da haben Sie völlig recht.', 'Zustimmen', 's'],
    ['Da bin ich anderer Meinung.', 'Widersprechen', 's'],
    ['Das sehe ich etwas anders.', 'Widersprechen', 's'],
    ['Da kann ich Ihnen leider nicht zustimmen.', 'Widersprechen', 's'],
    ['Wie wäre es, wenn wir das Treffen auf Donnerstag legen?', 'Einen Vorschlag machen', 's'],
    ['Ich schlage vor, dass wir zuerst die Kosten klären.', 'Einen Vorschlag machen', 's'],
    ['Was halten Sie davon, wenn wir ein Catering bestellen?', 'Einen Vorschlag machen', 's'],
    ['Wir könnten uns doch in der Mitte treffen.', 'Einen Kompromiss finden', 's'],
    ['Lassen Sie uns einen Mittelweg finden.', 'Einen Kompromiss finden', 's'],
    ['Wenn Sie die Präsentation übernehmen, kümmere ich mich um die Getränke.', 'Einen Kompromiss finden', 's'],
    ['Habe ich Sie richtig verstanden, dass Sie nur dienstags können?', 'Nachfragen', 's'],
    ['Könnten Sie das bitte genauer erklären?', 'Nachfragen', 's'],
    ['Was meinen Sie genau mit „kurzfristig“?', 'Nachfragen', 's'],
    ['Wir halten also fest: Das Treffen ist am Freitag um zehn.', 'Zusammenfassen', 's'],
    ['Dann sind wir uns also einig, dass Frau Lang die Leitung übernimmt.', 'Zusammenfassen', 's'],
    ['Zusammenfassend lässt sich sagen, dass beide Modelle Vorteile haben.', 'Zusammenfassen', 's'],
    ['Ich habe da gewisse Bedenken.', 'Bedenken äußern', 's'],
    ['Ich befürchte, dass das Budget nicht reicht.', 'Bedenken äußern', 's'],
    ['Das könnte problematisch werden, weil viele Kollegen im Urlaub sind.', 'Bedenken äußern', 's'],
    ['Kommen wir nun zum nächsten Punkt.', 'Das Gespräch strukturieren', 's'],
    ['Zunächst möchte ich kurz erklären, worum es geht.', 'Das Gespräch strukturieren', 's'],
    ['Ein weiterer wichtiger Aspekt ist die Zeitplanung.', 'Das Gespräch strukturieren', 's'],
    ['Bezug nehmend auf Ihr Schreiben vom 12. Mai möchte ich Ihnen mitteilen, …', 'Einleitung', 'w'],
    ['vielen Dank für Ihre Nachricht vom Montag.', 'Einleitung', 'w'],
    ['ich wende mich an Sie, weil ich eine Frage zu meiner Bestellung habe.', 'Einleitung', 'w'],
    ['Leider muss ich mich über die mangelhafte Lieferung beschweren.', 'Sich beschweren', 'w'],
    ['Zu meinem Bedauern musste ich feststellen, dass die Ware beschädigt ist.', 'Sich beschweren', 'w'],
    ['Mit Ihrem Service bin ich äußerst unzufrieden.', 'Sich beschweren', 'w'],
    ['Ich bitte Sie daher, mir den Betrag zu erstatten.', 'Eine Bitte äußern', 'w'],
    ['Ich wäre Ihnen dankbar, wenn Sie mir die Unterlagen schicken könnten.', 'Eine Bitte äußern', 'w'],
    ['Könnten Sie mir bitte bis Freitag mitteilen, ob der Termin passt?', 'Eine Bitte äußern', 'w'],
    ['Wir bitten vielmals um Entschuldigung für die Verzögerung.', 'Sich entschuldigen', 'w'],
    ['Es tut uns sehr leid, dass Sie warten mussten.', 'Sich entschuldigen', 'w'],
    ['Bitte entschuldigen Sie das Missverständnis.', 'Sich entschuldigen', 'w'],
    ['Hiermit teile ich Ihnen mit, dass ich am Seminar teilnehme.', 'Informieren', 'w'],
    ['Wir möchten Sie darauf hinweisen, dass das Büro am Freitag geschlossen ist.', 'Informieren', 'w'],
    ['Ich möchte Sie darüber informieren, dass sich meine Adresse geändert hat.', 'Informieren', 'w'],
    ['Als Entschädigung bieten wir Ihnen einen Gutschein über 20 Euro an.', 'Eine Lösung anbieten', 'w'],
    ['Gern schicken wir Ihnen kostenlos ein neues Gerät.', 'Eine Lösung anbieten', 'w'],
    ['Wir schlagen vor, dass ein Techniker bei Ihnen vorbeikommt.', 'Eine Lösung anbieten', 'w'],
    ['Für Rückfragen stehe ich Ihnen gern zur Verfügung.', 'Schluss', 'w'],
    ['Ich freue mich auf Ihre Antwort.', 'Schluss', 'w'],
    ['Mit freundlichen Grüßen', 'Schluss', 'w']
  ];

  const gapItems = (rows, tag) => rows.map(([q, a, d, tip]) => ({ q, gap: true, a, opts: [a, ...d], tip, tag, correct: q.replace(/_{3,}/, a) }));

  DMGame.register({
    id: 'b2-nvv', cat: 'b2', title: 'Nomen-Verb-Profi', icon: '🧱', level: 'B2 Beruf',
    desc: 'Hau den Maulwurf: Antrag stellen, Entscheidung treffen – tippe das passende Verb, sobald es auftaucht.',
    intro: 'Nomen-Verb-Verbindungen kommen im DTB B2 beim Lesen und Schreiben oft vor. Lies den Satz – in den Löchern tauchen Verben auf. Tippe schnell das passende, bevor es verschwindet. Falsche Verben kosten ein Leben. 75 Sekunden, 3 Leben.',
    start(api) { DMArcade.whack(api, { items: gapItems(NVV, 'Nomen + Verb'), seconds: 75, lives: 3 }); }
  });

  DMGame.register({
    id: 'b2-praep', cat: 'b2', title: 'Präpositionen-Blitz', icon: '⚡', level: 'B1–B2 Beruf',
    desc: 'Fangspiel: Präpositionen fallen vom Himmel – fang die richtige, weich den falschen aus!',
    intro: 'Welche Präposition gehört zum Verb? Drei Präpositionen fallen herunter – bewege den Korb und fang die richtige. Es wird immer schneller! Serien geben doppelte Punkte, am Ende siehst du alle Verben, die du noch üben solltest. 15 Sätze, 3 Leben.',
    start(api) { DMArcade.catcher(api, { items: gapItems(PRAEP, 'Verb + Präposition'), rounds: 15, lives: 3, speed: 0.19 }); }
  });

  DMGame.register({
    id: 'b2-konnektor', cat: 'b2', title: 'Konnektoren-Kette', icon: '🔗', level: 'B1–B2 Beruf',
    desc: 'Fangspiel: obwohl, trotzdem, damit … Fang den Konnektor, der die Sätze richtig verbindet.',
    intro: 'Gute Texte brauchen Konnektoren. Lies den Satz, dann fallen drei Konnektoren herunter – fang den, der logisch und grammatisch passt. Achte auf die Position des Verbs! 15 Sätze, 3 Leben.',
    start(api) { DMArcade.catcher(api, { items: gapItems(KON, 'Konnektor'), rounds: 15, lives: 3, speed: 0.15 }); }
  });

  DMGame.register({
    id: 'b2-redemittel', cat: 'b2', title: 'Redemittel-Radar', icon: '🎯', level: 'B2 Beruf',
    desc: 'Sortierspiel: Redemittel fallen herunter – ab in den richtigen Korb: Meinung, Widerspruch, Kompromiss …',
    intro: 'In der mündlichen Prüfung und in formellen E-Mails punktest du mit passenden Redemitteln. Ein Satz fällt herunter – tippe auf den Korb mit seiner Funktion, bevor er unten ankommt. 12 Sätze, 3 Leben.',
    optionsLabel: 'Bereich',
    options: [{ id: 's', label: 'Sprechen' }, { id: 'w', label: 'E-Mail schreiben' }, { id: 'all', label: 'Gemischt' }],
    start(api, opt) {
      const rows = RM.filter(r => opt === 'all' || !opt || r[2] === opt);
      const items = rows.map(([q, f, area]) => {
        const funcs = [...new Set(RM.filter(r => r[2] === area).map(r => r[1]))];
        return { q: q, a: f, opts: [f, ...DMKit.distract(api, funcs, f)], tag: area === 's' ? 'Sprechen' : 'E-Mail', sub: 'Wofür benutzt man diesen Satz?', tip: '', correct: `„${q}“ → ${f}` };
      });
      DMArcade.sorter(api, { items: items.map(x => ({ ...x, sub: null, tag: null })), rounds: 12, lives: 3, title: 'Wofür benutzt man den Satz?', sub: 'Steuere die Karte in den richtigen Korb.' });
    }
  });
})();
