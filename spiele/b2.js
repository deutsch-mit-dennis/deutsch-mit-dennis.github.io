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


  /* 5) Arbeitsabläufe: jeder Ablauf in der richtigen Reihenfolge */
  const ABLAEUFE = [
    { title: 'Sich bewerben', steps: ['Eine passende Stellenanzeige finden', 'Lebenslauf und Anschreiben vorbereiten', 'Die Bewerbung abschicken', 'Eine Einladung zum Vorstellungsgespräch bekommen', 'Am Vorstellungsgespräch teilnehmen', 'Den Arbeitsvertrag unterschreiben', 'Am ersten Arbeitstag pünktlich erscheinen'] },
    { title: 'Sich krankmelden', steps: ['Morgens merken: Ich habe Fieber.', 'Vor Arbeitsbeginn die Vorgesetzte anrufen', 'Zum Arzt gehen', 'Die Krankschreibung bekommen (der Arzt meldet sie elektronisch an die Krankenkasse)', 'Zu Hause bleiben und sich erholen', 'Sich nach der Genesung bei der Arbeit zurückmelden'] },
    { title: 'Urlaub beantragen', steps: ['Im Teamkalender freie Tage prüfen', 'Mit den Kollegen die Vertretung absprechen', 'Den Urlaubsantrag ausfüllen', 'Den Antrag bei der Vorgesetzten einreichen', 'Die Genehmigung bekommen', 'Vor dem Urlaub die Abwesenheitsnotiz einrichten'] },
    { title: 'Eine Besprechung organisieren', steps: ['Das Ziel der Besprechung festlegen', 'Einen Termin mit allen abstimmen', 'Einen Raum buchen', 'Die Einladung mit Tagesordnung verschicken', 'Die Besprechung leiten', 'Das Protokoll schreiben und verschicken', 'Die vereinbarten Aufgaben kontrollieren'] },
    { title: 'Eine Kundenbeschwerde bearbeiten', steps: ['Die Beschwerde des Kunden lesen', 'Den Eingang der Beschwerde bestätigen', 'Den Fall intern prüfen', 'Eine Lösung mit der Chefin abstimmen', 'Dem Kunden eine Antwort mit Lösung schreiben', 'Nachfragen, ob der Kunde zufrieden ist'] },
    { title: 'Material bestellen', steps: ['Feststellen, dass das Material knapp wird', 'Angebote von mehreren Lieferanten einholen', 'Die Angebote vergleichen', 'Die Bestellung aufgeben', 'Die Lieferung annehmen und auf Schäden prüfen', 'Die Rechnung zur Zahlung weitergeben'] },
    { title: 'Wareneingang im Lager', steps: ['Der Lkw kommt an der Rampe an', 'Den Lieferschein entgegennehmen', 'Die Paletten abladen', 'Menge und Zustand mit dem Lieferschein vergleichen', 'Den Wareneingang im System buchen', 'Die Ware am Lagerplatz einräumen'] },
    { title: 'Eine neue Kollegin einarbeiten', steps: ['Den Arbeitsplatz und die Zugänge vorbereiten', 'Die Kollegin am ersten Tag begrüßen', 'Am ersten Tag: das Team und die Räume zeigen', 'In der ersten Woche: die wichtigsten Aufgaben erklären', 'Danach: die ersten Aufgaben gemeinsam erledigen', 'Nach einigen Wochen ein Feedbackgespräch führen'] },
    { title: 'Einen Arbeitsunfall melden', steps: ['Erste Hilfe leisten', 'Die Vorgesetzte informieren', 'Zum Durchgangsarzt (D-Arzt) gehen', 'Der Betrieb füllt die Unfallanzeige aus', 'Der Betrieb schickt die Unfallanzeige an die Berufsgenossenschaft'] },
    { title: 'Schichtwechsel in der Pflege', steps: ['Die Pflegedokumentation aktualisieren', 'Sich mit der nächsten Schicht treffen', 'Bei der Übergabe jeden Bewohner kurz besprechen', 'Offene Aufgaben weitergeben', 'Die Schicht beenden und sich abmelden'] },
    { title: 'Kündigen (Arbeitnehmer)', steps: ['Die Kündigungsfrist im Arbeitsvertrag nachlesen', 'Die Kündigung schriftlich formulieren und unterschreiben', 'Die Kündigung rechtzeitig übergeben', 'Die Arbeit an die Nachfolge übergeben', 'Das Arbeitszeugnis bekommen'] },
    { title: 'Eine Präsentation halten', steps: ['Das Thema und die Zielgruppe klären', 'Informationen sammeln', 'Die Folien erstellen', 'Den Vortrag üben', 'Die Präsentation halten', 'Fragen aus dem Publikum beantworten'] }
  ];

  /* 6) Quiz-Leiter Arbeitsrecht & Arbeitswelt (Stand: deutsches Recht 2026) */
  const RECHT = [
    ['Wie muss eine Kündigung in Deutschland sein, damit sie gültig ist?', 'schriftlich mit Unterschrift auf Papier', ['per E-Mail', 'per WhatsApp', 'mündlich reicht'], 'Kündigung nur schriftlich mit eigenhändiger Unterschrift (§ 623 BGB).'],
    ['Wie lang darf die Probezeit höchstens sein?', 'sechs Monate', ['drei Monate', 'ein Jahr', 'zwei Jahre'], 'Probezeit: höchstens 6 Monate.'],
    ['Welche Kündigungsfrist gilt in der Probezeit (wenn im Vertrag nichts anderes steht)?', 'zwei Wochen', ['ein Tag', 'drei Monate', 'sechs Wochen'], 'In der Probezeit: 2 Wochen Kündigungsfrist.'],
    ['Wie lang ist die gesetzliche Grundkündigungsfrist nach der Probezeit?', 'vier Wochen zum 15. oder zum Monatsende', ['eine Woche', 'drei Monate zum Jahresende', 'sechs Monate'], 'Grundfrist: 4 Wochen zum 15. oder Monatsende; für den Arbeitgeber wird sie mit der Dauer der Beschäftigung länger.'],
    ['Wie viele Urlaubstage gibt es gesetzlich mindestens bei einer 5-Tage-Woche?', '20 Arbeitstage', ['10 Arbeitstage', '30 Arbeitstage', '14 Arbeitstage'], 'Mindesturlaub: 24 Werktage bei 6 Tagen = 20 Tage bei 5 Tagen pro Woche.'],
    ['Ab wann brauchen Sie normalerweise eine ärztliche Krankschreibung?', 'wenn Sie länger als drei Tage krank sind', ['schon ab dem ersten Tag immer', 'erst nach zwei Wochen', 'nie'], 'Ab dem 4. Krankheitstag – der Arbeitgeber darf sie aber auch früher verlangen.'],
    ['Wie lange zahlt der Arbeitgeber bei Krankheit den Lohn weiter?', 'bis zu sechs Wochen', ['drei Tage', 'ein Jahr', 'gar nicht'], 'Entgeltfortzahlung 6 Wochen, danach Krankengeld von der Krankenkasse.'],
    ['Wer zahlt nach sechs Wochen Krankheit Geld?', 'die Krankenkasse (Krankengeld)', ['der Arbeitgeber weiter den vollen Lohn', 'das Finanzamt', 'die Rentenversicherung'], 'Krankengeld kommt von der Krankenkasse.'],
    ['Wie viel Pause steht Ihnen bei mehr als 6 Stunden Arbeit zu?', 'mindestens 30 Minuten', ['10 Minuten', 'eine Stunde', 'keine'], 'Über 6 Stunden: 30 Minuten, über 9 Stunden: 45 Minuten Pause.'],
    ['Wie lange muss die Ruhezeit zwischen zwei Arbeitstagen mindestens sein?', 'elf Stunden', ['sechs Stunden', 'acht Stunden', '24 Stunden'], 'Ruhezeit: mindestens 11 Stunden ohne Unterbrechung.'],
    ['Wie viele Stunden darf man pro Werktag normalerweise höchstens arbeiten?', 'acht – kurzzeitig bis zu zehn', ['zwölf', 'sechs', 'so viele, wie der Chef will'], 'Arbeitszeitgesetz: 8 Stunden, bis 10, wenn es im Durchschnitt wieder ausgeglichen wird.'],
    ['Innerhalb welcher Frist muss man gegen eine Kündigung klagen?', 'innerhalb von drei Wochen', ['innerhalb von drei Monaten', 'innerhalb eines Jahres', 'es gibt keine Frist'], 'Kündigungsschutzklage beim Arbeitsgericht: 3 Wochen nach Zugang der Kündigung.'],
    ['Was bekommen Sie, wenn ein Arbeitsverhältnis endet?', 'ein Arbeitszeugnis', ['einen Aufenthaltstitel', 'eine Abmahnung', 'einen Mietvertrag'], 'Sie haben Anspruch auf ein (qualifiziertes) Arbeitszeugnis.'],
    ['Was ist eine Abmahnung?', 'eine Warnung des Arbeitgebers wegen eines Fehlverhaltens', ['eine Gehaltserhöhung', 'ein Urlaubsantrag', 'eine Kündigung durch den Arbeitnehmer'], 'Vor einer verhaltensbedingten Kündigung kommt meist eine Abmahnung.'],
    ['Ab wie vielen Beschäftigten kann ein Betriebsrat gewählt werden?', 'ab fünf', ['ab 50', 'ab 500', 'ab zwei'], 'Betriebsrat: ab 5 ständigen wahlberechtigten Arbeitnehmern.'],
    ['Wie lange darf ein befristeter Vertrag ohne sachlichen Grund höchstens dauern?', 'zwei Jahre', ['fünf Jahre', 'sechs Monate', 'unbegrenzt'], 'Sachgrundlose Befristung: höchstens 2 Jahre, bis zu dreimal verlängert.'],
    ['Wie lange gilt der Mutterschutz nach der Geburt normalerweise?', 'acht Wochen', ['zwei Wochen', 'ein Jahr', 'drei Jahre'], 'Mutterschutz: 6 Wochen vor und 8 Wochen nach der Geburt.'],
    ['Wie lange können Eltern pro Kind höchstens Elternzeit nehmen?', 'bis zu drei Jahre', ['sechs Monate', 'zehn Jahre', 'vier Wochen'], 'Elternzeit: bis zu 3 Jahre pro Kind.'],
    ['Wer ist nach einem Arbeitsunfall zuständig?', 'die Berufsgenossenschaft (Unfallversicherung)', ['die Haftpflichtversicherung des Kollegen', 'das Jobcenter', 'das Ordnungsamt'], 'Arbeitsunfälle: gesetzliche Unfallversicherung, also Berufsgenossenschaft.'],
    ['Wer bezahlt die gesetzliche Unfallversicherung?', 'nur der Arbeitgeber', ['nur der Arbeitnehmer', 'beide je zur Hälfte', 'die Stadt'], 'Die Unfallversicherung zahlt allein der Arbeitgeber.'],
    ['Was bedeutet „brutto“ auf der Gehaltsabrechnung?', 'der Lohn vor Steuern und Sozialabgaben', ['der Lohn, der auf das Konto kommt', 'das Urlaubsgeld', 'die Überstunden'], 'Brutto = vor Abzügen, netto = was ausgezahlt wird.'],
    ['Was ist ein Tarifvertrag?', 'ein Vertrag zwischen Gewerkschaft und Arbeitgebern über Lohn und Arbeitszeit', ['ein Handyvertrag', 'ein Mietvertrag für die Firma', 'ein Vertrag mit dem Jobcenter'], 'Tarifverträge regeln Löhne, Arbeitszeit und Urlaub für eine Branche.'],
    ['Was macht ein Betriebsrat?', 'Er vertritt die Interessen der Beschäftigten im Betrieb.', ['Er stellt die Gehaltsabrechnungen aus.', 'Er führt den Betrieb.', 'Er kontrolliert die Steuern.'], 'Der Betriebsrat redet z. B. bei Arbeitszeiten und Kündigungen mit.'],
    ['Was gehört NICHT zur Sozialversicherung?', 'die Kfz-Versicherung', ['die Rentenversicherung', 'die Krankenversicherung', 'die Arbeitslosenversicherung'], 'Fünf Zweige: Kranken-, Pflege-, Renten-, Arbeitslosen- und Unfallversicherung.'],
    ['Was darf im Vorstellungsgespräch normalerweise NICHT gefragt werden?', 'ob Sie schwanger sind', ['welche Erfahrungen Sie haben', 'wann Sie anfangen können', 'warum Sie die Stelle wollen'], 'Fragen nach Schwangerschaft sind unzulässig – Sie müssen nicht wahrheitsgemäß antworten.'],
    ['Ab welcher Betriebsgröße gilt das Kündigungsschutzgesetz?', 'ab mehr als zehn Beschäftigten', ['ab einem Beschäftigten', 'ab 100 Beschäftigten', 'nur im öffentlichen Dienst'], 'Kündigungsschutz: mehr als 10 Beschäftigte und länger als 6 Monate im Betrieb.'],
    ['Was bedeutet „Teilzeit“?', 'Man arbeitet weniger Stunden als in Vollzeit.', ['Man arbeitet nur im Sommer.', 'Man arbeitet ohne Vertrag.', 'Man arbeitet in zwei Firmen gleichzeitig Vollzeit.'], 'Teilzeit = weniger Stunden als die übliche Vollzeit im Betrieb.'],
    ['Wer zieht die Lohnsteuer vom Gehalt ab und zahlt sie ans Finanzamt?', 'der Arbeitgeber', ['der Arbeitnehmer selbst jeden Monat', 'die Bank', 'die Krankenkasse'], 'Der Arbeitgeber behält die Lohnsteuer ein und überweist sie.'],
    ['Was ist ein „Arbeitszeugnis“?', 'eine schriftliche Beurteilung der Arbeit durch den Arbeitgeber', ['ein Ausweis für den Betrieb', 'eine Lohnabrechnung', 'ein Diplom der Berufsschule'], 'Ein qualifiziertes Zeugnis bewertet Leistung und Verhalten.'],
    ['Was ist ein „Aufhebungsvertrag“?', 'Arbeitgeber und Arbeitnehmer beenden das Arbeitsverhältnis gemeinsam.', ['ein Vertrag für eine Gehaltserhöhung', 'ein neuer Arbeitsvertrag nach der Probezeit', 'eine Krankmeldung'], 'Achtung: Beim Aufhebungsvertrag kann es eine Sperrzeit beim Arbeitslosengeld geben.']
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

  DMGame.register({
    id: 'b2-ablauf', cat: 'b2', title: 'Arbeitsabläufe ordnen', icon: '🔢', level: 'B1–B2 Beruf',
    desc: 'Bewerbung, Krankmeldung, Wareneingang, Übergabe: Bring die Schritte in die richtige Reihenfolge – gegen die Uhr.',
    intro: 'Im Beruf musst du Abläufe beschreiben können – auch in der mündlichen Prüfung. Du bekommst die Schritte eines Ablaufs durcheinander und tippst sie in der richtigen Reihenfolge an. Jede Runde ein neuer Ablauf mit mehr Karten. Schnell sein bringt Bonuspunkte. 3 Leben.',
    optionsLabel: 'Schwierigkeit',
    options: [{ id: 'leicht', label: 'Leicht (3–5 Schritte)' }, { id: 'schwer', label: 'Schwer (bis 7 Schritte)' }],
    start(api, opt) { DMArcade.order(api, { sets: ABLAEUFE, sizes: opt === 'schwer' ? [4, 5, 5, 6, 6, 7] : [3, 3, 4, 4, 5, 5], lives: 3 }); }
  });

  DMGame.register({
    id: 'b2-recht', cat: 'b2', title: 'Quiz-Leiter Arbeitsrecht', icon: '🪜', level: 'B1–B2 Beruf',
    desc: 'Kündigung, Urlaub, Krankmeldung, Probezeit: Klettere mit Jokern die Leiter hoch.',
    intro: 'Was steht dir im Job zu? 12 Stufen, 30 Sekunden pro Frage und drei Joker (50:50, +15 Sekunden, andere Frage). Bei einem Fehler fällst du auf die letzte gelbe Sicherheitsstufe zurück. Nach jeder Antwort siehst du die Regel. Stand: deutsches Arbeitsrecht 2026 – keine Rechtsberatung.',
    optionsLabel: 'Modus',
    options: [{ id: 'leiter', label: '🪜 Leiter (12 Stufen)' }, { id: 'marathon', label: '❤️ Marathon (3 Leben)' }],
    start(api, opt) {
      const items = RECHT.map(([q, a, d, tip]) => ({ q, a, opts: [a, ...d], tip, correct: `${q} → ${a}` }));
      DMArcade.ladder(api, opt === 'marathon' ? { items, endless: true, lives: 3, seconds: 25 } : { items, steps: 12, safe: [4, 8], seconds: 30 });
    }
  });
})();
