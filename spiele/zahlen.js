/* Zahlen-Ohr – Hörspiel zu Zahlen (Uhrzeiten, Preise, Telefonnummern, Hausnummern, Daten) wie im DTZ-Hören.
   Jeder Eintrag: { cat, q, say, show, mark, answer, options }
   say  = genau der Text für api.speak (Zahlen als Wörter, damit die Stimme sie richtig liest)
   show = Mitschrift mit Ziffern (wird nach der Antwort gezeigt), mark = hervorgehobene Zahl darin.
   Alle say-Texte stehen auch in spiele/tts-zahlen.json (für natürliche Aufnahmen). */
(() => {
  if (!window.DMGame) return;
  const ID = 'zahlen', ROUNDS = 10, EXTRA_PLAYS = 2, SEEN_KEY = 'dm-zahlen-seen';

  document.head.insertAdjacentHTML('beforeend', `<style id="sp-zahlen-css">
.sp-zahlen-listen{display:flex;flex-direction:column;align-items:center;gap:6px;margin:4px 0 14px}
.sp-zahlen-play{display:inline-flex;align-items:center;justify-content:center;gap:10px;min-height:64px;min-width:min(100%,280px);padding:12px 26px;border:0;border-radius:99px;background:var(--dm-tinte);color:#fff;font:700 21px/1.2 var(--dm-font);cursor:pointer;box-shadow:0 8px 20px rgba(35,65,181,.25);transition:transform .08s,background .15s}
.sp-zahlen-play:hover:not(:disabled){background:var(--dm-tinte-dark)}
.sp-zahlen-play:active:not(:disabled){transform:scale(.97)}
.sp-zahlen-play:focus-visible{outline:3px solid #ff8a2a;outline-offset:3px}
.sp-zahlen-play:disabled{background:#c5cdf0;box-shadow:none;cursor:default}
.sp-zahlen-play.is-playing:disabled{opacity:1;color:#fff;background:var(--dm-tinte);box-shadow:0 8px 20px rgba(35,65,181,.25)}
.sp-zahlen-play.is-playing{animation:sp-zahlen-pulse 1s ease-in-out infinite}
.sp-zahlen-play kbd{font:600 12px var(--dm-font);color:#dfe5ff;border:1px solid rgba(255,255,255,.45);border-radius:6px;padding:1px 6px}
@keyframes sp-zahlen-pulse{50%{box-shadow:0 0 0 10px rgba(35,65,181,.15)}}
.sp-zahlen-left{font-size:14px;color:#5b6680;font-weight:700;min-height:1.4em}
.sp-zahlen-q{text-align:center}
.sp-zahlen-opts{grid-template-columns:repeat(2,minmax(0,1fr))}
.sp-zahlen-opts .ch-opt{justify-content:center!important;font-size:22px;font-variant-numeric:tabular-nums;min-height:64px}
.sp-zahlen-opts.is-long{grid-template-columns:1fr}
.sp-zahlen-opts .ch-opt kbd{position:absolute;top:6px;left:8px}
.sp-zahlen-say{display:block;margin-top:6px;font-style:italic;color:#3b4560}
.sp-zahlen-say b{font-style:normal;color:var(--dm-ink);background:#fff1d0;border-radius:4px;padding:0 3px}
@media (max-width:380px){.sp-zahlen-opts .ch-opt{font-size:19px}}
@media (prefers-reduced-motion:reduce){.sp-zahlen-play{transition:none}.sp-zahlen-play.is-playing{animation:none}}
</style>`);

  const POOL = [{"cat":"zeit","q":"Wann fährt der Zug nach Dortmund?","say":"Der Zug nach Dortmund fährt um vierzehn Uhr zwölf von Gleis sieben.","show":"Der Zug nach Dortmund fährt um 14:12 Uhr von Gleis 7.","mark":"14:12 Uhr","answer":"14:12","options":["14:12","14:20","4:12","12:14"]},
{"cat":"zeit","q":"Wann ist der Termin?","say":"Mein Termin ist am Dienstag um Viertel vor neun.","show":"Mein Termin ist am Dienstag um 8:45.","mark":"8:45","answer":"8:45","options":["8:45","9:15","9:45","8:15"]},
{"cat":"zeit","q":"Wann beginnt der Deutschkurs?","say":"Der Deutschkurs beginnt morgen um halb acht.","show":"Der Deutschkurs beginnt morgen um 7:30.","mark":"7:30","answer":"7:30","options":["7:30","8:30","7:15","6:30"]},
{"cat":"zeit","q":"Wann öffnet die Apotheke am Samstag?","say":"Die Apotheke öffnet am Samstag um neun Uhr.","show":"Die Apotheke öffnet am Samstag um 9:00 Uhr.","mark":"9:00 Uhr","answer":"9:00","options":["9:00","19:00","10:00","9:30"]},
{"cat":"zeit","q":"Wann landet das Flugzeug?","say":"Das Flugzeug aus Istanbul landet um sechzehn Uhr fünfundvierzig.","show":"Das Flugzeug aus Istanbul landet um 16:45 Uhr.","mark":"16:45 Uhr","answer":"16:45","options":["16:45","16:54","6:45","17:45"]},
{"cat":"zeit","q":"Wann fährt der nächste Bus?","say":"Der nächste Bus fährt um dreizehn Uhr dreißig.","show":"Der nächste Bus fährt um 13:30 Uhr.","mark":"13:30 Uhr","answer":"13:30","options":["13:30","13:13","3:30","12:30"]},
{"cat":"zeit","q":"Bis wann ist die Praxis heute geöffnet?","say":"Unsere Praxis ist heute bis achtzehn Uhr geöffnet.","show":"Unsere Praxis ist heute bis 18:00 Uhr geöffnet.","mark":"18:00 Uhr","answer":"18:00","options":["18:00","8:00","18:30","19:00"]},
{"cat":"zeit","q":"Wann wollen sie sich treffen?","say":"Treffen wir uns um Viertel nach drei vor dem Kino?","show":"Treffen wir uns um 3:15 vor dem Kino?","mark":"3:15","answer":"3:15","options":["3:15","2:45","3:45","4:15"]},
{"cat":"zeit","q":"Wann holt sie die Kinder ab?","say":"Ich hole die Kinder um zwanzig nach zwei vom Kindergarten ab.","show":"Ich hole die Kinder um 2:20 vom Kindergarten ab.","mark":"2:20","answer":"2:20","options":["2:20","1:40","2:40","3:20"]},
{"cat":"zeit","q":"Wann kommt der Techniker?","say":"Hier ist Herr Becker. Unser Techniker kommt am Mittwoch um zehn nach elf.","show":"Hier ist Herr Becker. Unser Techniker kommt am Mittwoch um 11:10.","mark":"11:10","answer":"11:10","options":["11:10","10:50","11:50","10:10"]},
{"cat":"zeit","q":"Wann fährt der ICE nach München?","say":"Achtung an Gleis drei: Der ICE nach München fährt heute um neunzehn Uhr achtzehn.","show":"Achtung an Gleis 3: Der ICE nach München fährt heute um 19:18 Uhr.","mark":"19:18 Uhr","answer":"19:18","options":["19:18","19:08","9:18","18:19"]},
{"cat":"zeit","q":"Wann beginnt der Film?","say":"Der Film beginnt um zwanzig Uhr fünfzehn.","show":"Der Film beginnt um 20:15 Uhr.","mark":"20:15 Uhr","answer":"20:15","options":["20:15","20:50","21:15","20:05"]},
{"cat":"zeit","q":"Wann ist die Pause zu Ende?","say":"Die Pause ist um fünf vor halb elf zu Ende.","show":"Die Pause ist um 10:25 zu Ende.","mark":"10:25","answer":"10:25","options":["10:25","10:35","11:25","9:25"]},
{"cat":"zeit","q":"Wann ist der Termin im Jobcenter?","say":"Bitte kommen Sie am Montag um zehn Uhr dreißig ins Jobcenter.","show":"Bitte kommen Sie am Montag um 10:30 Uhr ins Jobcenter.","mark":"10:30 Uhr","answer":"10:30","options":["10:30","10:13","9:30","11:30"]},
{"cat":"zeit","q":"Wann fängt er mit der Arbeit an?","say":"Ich fange jeden Morgen um sechs Uhr mit der Arbeit an.","show":"Ich fange jeden Morgen um 6:00 Uhr mit der Arbeit an.","mark":"6:00 Uhr","answer":"6:00","options":["6:00","7:00","16:00","6:30"]},
{"cat":"zeit","q":"Wann schließt der Supermarkt heute?","say":"Der Supermarkt schließt heute schon um sechzehn Uhr.","show":"Der Supermarkt schließt heute schon um 16:00 Uhr.","mark":"16:00 Uhr","answer":"16:00","options":["16:00","6:00","18:00","16:30"]},
{"cat":"zeit","q":"Wann fährt die Straßenbahn?","say":"Die Straßenbahnlinie hundertsieben fährt um siebzehn Uhr dreiundzwanzig.","show":"Die Straßenbahnlinie 107 fährt um 17:23 Uhr.","mark":"17:23 Uhr","answer":"17:23","options":["17:23","17:32","7:23","16:23"]},
{"cat":"zeit","q":"Wann ist das Elterngespräch?","say":"Das Elterngespräch ist am Donnerstag um halb fünf.","show":"Das Elterngespräch ist am Donnerstag um 4:30.","mark":"4:30","answer":"4:30","options":["4:30","5:30","4:15","3:30"]},
{"cat":"zeit","q":"Wann beginnt die Sprechstunde?","say":"Die Sprechstunde beginnt um Viertel nach acht.","show":"Die Sprechstunde beginnt um 8:15.","mark":"8:15","answer":"8:15","options":["8:15","7:45","8:45","9:15"]},
{"cat":"zeit","q":"Wann kommt der Zug aus Hagen an?","say":"Der Regionalexpress aus Hagen kommt um elf Uhr siebenundvierzig an.","show":"Der Regionalexpress aus Hagen kommt um 11:47 Uhr an.","mark":"11:47 Uhr","answer":"11:47","options":["11:47","11:57","11:17","12:47"]},
{"cat":"zeit","q":"Wann startet der Flug nach Athen?","say":"Ihr Flug nach Athen startet um sechs Uhr fünfzig.","show":"Ihr Flug nach Athen startet um 6:50 Uhr.","mark":"6:50 Uhr","answer":"6:50","options":["6:50","6:15","7:50","16:50"]},
{"cat":"zeit","q":"Wann soll man die Tablette nehmen?","say":"Nehmen Sie die Tablette bitte jeden Abend um einundzwanzig Uhr.","show":"Nehmen Sie die Tablette bitte jeden Abend um 21:00 Uhr.","mark":"21:00 Uhr","answer":"21:00","options":["21:00","12:00","20:00","22:00"]},
{"cat":"zeit","q":"Wann beginnt das Fußballspiel?","say":"Das Spiel beginnt am Sonntag um fünfzehn Uhr dreißig.","show":"Das Spiel beginnt am Sonntag um 15:30 Uhr.","mark":"15:30 Uhr","answer":"15:30","options":["15:30","15:13","5:30","16:30"]},
{"cat":"zeit","q":"Wann ist der Elternabend?","say":"Der Elternabend findet am Mittwoch um neunzehn Uhr statt.","show":"Der Elternabend findet am Mittwoch um 19:00 Uhr statt.","mark":"19:00 Uhr","answer":"19:00","options":["19:00","9:00","17:00","19:30"]},
{"cat":"zeit","q":"Wann kommt er nach Hause?","say":"Schatz, ich komme heute erst um zehn nach sieben nach Hause.","show":"Schatz, ich komme heute erst um 7:10 nach Hause.","mark":"7:10","answer":"7:10","options":["7:10","6:50","7:50","6:10"]},
{"cat":"zeit","q":"Wann fährt die S-Bahn nach Düsseldorf?","say":"Die S-Bahn nach Düsseldorf fährt um acht Uhr vierundfünfzig.","show":"Die S-Bahn nach Düsseldorf fährt um 8:54 Uhr.","mark":"8:54 Uhr","answer":"8:54","options":["8:54","8:45","9:54","8:04"]},
{"cat":"zeit","q":"Wann ist die Besprechung?","say":"Die Besprechung ist morgen um Viertel vor zwölf.","show":"Die Besprechung ist morgen um 11:45.","mark":"11:45","answer":"11:45","options":["11:45","12:15","12:45","11:15"]},
{"cat":"zeit","q":"Wann ist der Termin beim Zahnarzt?","say":"Ihr Termin beim Zahnarzt ist am Freitag um vierzehn Uhr vierzig.","show":"Ihr Termin beim Zahnarzt ist am Freitag um 14:40 Uhr.","mark":"14:40 Uhr","answer":"14:40","options":["14:40","14:14","14:04","4:40"]},
{"cat":"zeit","q":"Wann öffnet das Bürgerbüro?","say":"Das Bürgerbüro öffnet montags um sieben Uhr dreißig.","show":"Das Bürgerbüro öffnet montags um 7:30 Uhr.","mark":"7:30 Uhr","answer":"7:30","options":["7:30","7:13","6:30","17:30"]},
{"cat":"zeit","q":"Wann geht der Ausflug los?","say":"Der Ausflug geht um halb neun am Bahnhof los.","show":"Der Ausflug geht um 8:30 am Bahnhof los.","mark":"8:30","answer":"8:30","options":["8:30","9:30","8:15","7:30"]},
{"cat":"preis","q":"Was kostet ein Kilo Äpfel?","say":"Die Äpfel kosten heute nur zwei Euro neunundvierzig das Kilo.","show":"Die Äpfel kosten heute nur 2,49 € das Kilo.","mark":"2,49 €","answer":"2,49 €","options":["2,49 €","4,29 €","2,94 €","2,19 €"]},
{"cat":"preis","q":"Wie viel kostet die Jacke?","say":"Die Jacke kostet neunundfünfzig Euro.","show":"Die Jacke kostet 59 €.","mark":"59 €","answer":"59 €","options":["59 €","95 €","69 €","49 €"]},
{"cat":"preis","q":"Was kostet die Fahrkarte nach Köln?","say":"Eine Fahrkarte nach Köln kostet sechzehn Euro achtzig.","show":"Eine Fahrkarte nach Köln kostet 16,80 €.","mark":"16,80 €","answer":"16,80 €","options":["16,80 €","60,80 €","16,18 €","6,80 €"]},
{"cat":"preis","q":"Wie viel kostet das Brot?","say":"Das Brot kostet drei Euro fünfzehn.","show":"Das Brot kostet 3,15 €.","mark":"3,15 €","answer":"3,15 €","options":["3,15 €","3,50 €","3,05 €","13,15 €"]},
{"cat":"preis","q":"Wie hoch ist die Miete?","say":"Die Wohnung kostet sechshundertfünfzig Euro warm.","show":"Die Wohnung kostet 650 € warm.","mark":"650 €","answer":"650 €","options":["650 €","560 €","605 €","615 €"]},
{"cat":"preis","q":"Was kostet die Waschmaschine?","say":"Die Waschmaschine kostet im Angebot nur dreihundertneunundneunzig Euro.","show":"Die Waschmaschine kostet im Angebot nur 399 €.","mark":"399 €","answer":"399 €","options":["399 €","993 €","309 €","339 €"]},
{"cat":"preis","q":"Wie viel muss man bezahlen?","say":"Das macht zusammen siebzehn Euro dreißig, bitte.","show":"Das macht zusammen 17,30 €, bitte.","mark":"17,30 €","answer":"17,30 €","options":["17,30 €","70,30 €","17,13 €","7,30 €"]},
{"cat":"preis","q":"Was kostet ein Liter Milch?","say":"Ein Liter Milch kostet neunundneunzig Cent.","show":"Ein Liter Milch kostet 0,99 €.","mark":"0,99 €","answer":"0,99 €","options":["0,99 €","1,99 €","0,89 €","9,90 €"]},
{"cat":"preis","q":"Wie viel kostet der Haarschnitt?","say":"Ein Haarschnitt kostet bei uns fünfundzwanzig Euro.","show":"Ein Haarschnitt kostet bei uns 25 €.","mark":"25 €","answer":"25 €","options":["25 €","52 €","35 €","15 €"]},
{"cat":"preis","q":"Was kostet das Monatsticket?","say":"Das Monatsticket kostet dreiundsechzig Euro.","show":"Das Monatsticket kostet 63 €.","mark":"63 €","answer":"63 €","options":["63 €","36 €","53 €","73 €"]},
{"cat":"preis","q":"Wie viel kosten die Tomaten?","say":"Die Tomaten kosten eins neunundsiebzig.","show":"Die Tomaten kosten 1,79 €.","mark":"1,79 €","answer":"1,79 €","options":["1,79 €","1,97 €","7,19 €","1,69 €"]},
{"cat":"preis","q":"Was kostet das Fahrrad?","say":"Das gebrauchte Fahrrad kostet hundertzwanzig Euro.","show":"Das gebrauchte Fahrrad kostet 120 €.","mark":"120 €","answer":"120 €","options":["120 €","112 €","220 €","102 €"]},
{"cat":"preis","q":"Wie viel kostet ein Kaffee?","say":"Ein Kaffee kostet zwei Euro zwanzig.","show":"Ein Kaffee kostet 2,20 €.","mark":"2,20 €","answer":"2,20 €","options":["2,20 €","2,02 €","2,12 €","3,20 €"]},
{"cat":"preis","q":"Wie viel kostet das Handy?","say":"Das Handy kostet nur zweihundertneunundvierzig Euro.","show":"Das Handy kostet nur 249 €.","mark":"249 €","answer":"249 €","options":["249 €","294 €","429 €","245 €"]},
{"cat":"preis","q":"Wie viel kostet die Pizza?","say":"Die Pizza Margherita kostet acht Euro fünfzig.","show":"Die Pizza Margherita kostet 8,50 €.","mark":"8,50 €","answer":"8,50 €","options":["8,50 €","8,15 €","18,50 €","8,05 €"]},
{"cat":"preis","q":"Wie viel kostet die Reparatur?","say":"Die Reparatur kostet ungefähr achtzig Euro.","show":"Die Reparatur kostet ungefähr 80 €.","mark":"80 €","answer":"80 €","options":["80 €","18 €","88 €","70 €"]},
{"cat":"preis","q":"Wie viel kostet ein Kilo Hackfleisch?","say":"Ein Kilo Hackfleisch kostet heute sechs Euro neunundneunzig.","show":"Ein Kilo Hackfleisch kostet heute 6,99 €.","mark":"6,99 €","answer":"6,99 €","options":["6,99 €","7,99 €","6,19 €","16,99 €"]},
{"cat":"preis","q":"Wie viel kostet der Schwimmkurs?","say":"Der Schwimmkurs für Kinder kostet fünfundsiebzig Euro.","show":"Der Schwimmkurs für Kinder kostet 75 €.","mark":"75 €","answer":"75 €","options":["75 €","57 €","65 €","85 €"]},
{"cat":"preis","q":"Wie viel kosten die Schuhe?","say":"Die Schuhe kosten vierunddreißig Euro neunzig.","show":"Die Schuhe kosten 34,90 €.","mark":"34,90 €","answer":"34,90 €","options":["34,90 €","43,90 €","34,19 €","24,90 €"]},
{"cat":"preis","q":"Wie hoch sind die Nebenkosten?","say":"Die Nebenkosten betragen hundertachtzig Euro im Monat.","show":"Die Nebenkosten betragen 180 € im Monat.","mark":"180 €","answer":"180 €","options":["180 €","118 €","108 €","80 €"]},
{"cat":"preis","q":"Wie viel kostet die Briefmarke?","say":"Eine Briefmarke für einen Brief kostet fünfundneunzig Cent.","show":"Eine Briefmarke für einen Brief kostet 0,95 €.","mark":"0,95 €","answer":"0,95 €","options":["0,95 €","0,59 €","1,95 €","0,85 €"]},
{"cat":"preis","q":"Was kostet das Sofa?","say":"Das Sofa kostet tausendzweihundert Euro.","show":"Das Sofa kostet 1.200 €.","mark":"1.200 €","answer":"1.200 €","options":["1.200 €","1.020 €","2.100 €","1.300 €"]},
{"cat":"preis","q":"Wie viel kostet die Butter?","say":"Die Butter kostet heute eins neunundzwanzig.","show":"Die Butter kostet heute 1,29 €.","mark":"1,29 €","answer":"1,29 €","options":["1,29 €","1,92 €","2,19 €","1,19 €"]},
{"cat":"preis","q":"Wie viel kostet ein Einzelticket?","say":"Ein Einzelticket kostet drei Euro dreißig.","show":"Ein Einzelticket kostet 3,30 €.","mark":"3,30 €","answer":"3,30 €","options":["3,30 €","3,13 €","13,30 €","3,03 €"]},
{"cat":"preis","q":"Wie viel kostet der Fernseher jetzt?","say":"Der Fernseher ist reduziert und kostet jetzt vierhundertneunzig Euro.","show":"Der Fernseher ist reduziert und kostet jetzt 490 €.","mark":"490 €","answer":"490 €","options":["490 €","419 €","940 €","409 €"]},
{"cat":"preis","q":"Wie viel kostet das Parken pro Stunde?","say":"Parken kostet hier einen Euro fünfzig pro Stunde.","show":"Parken kostet hier 1,50 € pro Stunde.","mark":"1,50 €","answer":"1,50 €","options":["1,50 €","1,15 €","1,05 €","2,50 €"]},
{"cat":"preis","q":"Wie hoch ist die Gebühr?","say":"Die Gebühr beträgt zweiundzwanzig Euro fünfzig.","show":"Die Gebühr beträgt 22,50 €.","mark":"22,50 €","answer":"22,50 €","options":["22,50 €","22,15 €","12,50 €","20,50 €"]},
{"cat":"preis","q":"Wie viel kostet die Petersilie?","say":"Die Petersilie kostet neunundachtzig Cent.","show":"Die Petersilie kostet 0,89 €.","mark":"0,89 €","answer":"0,89 €","options":["0,89 €","0,98 €","8,90 €","0,79 €"]},
{"cat":"preis","q":"Wie viel kostet das Zimmer pro Nacht?","say":"Ein Doppelzimmer kostet fünfundachtzig Euro pro Nacht.","show":"Ein Doppelzimmer kostet 85 € pro Nacht.","mark":"85 €","answer":"85 €","options":["85 €","58 €","95 €","75 €"]},
{"cat":"preis","q":"Wie viel Geld bekommt man zurück?","say":"Sie bekommen drei Euro sechzig zurück.","show":"Sie bekommen 3,60 € zurück.","mark":"3,60 €","answer":"3,60 €","options":["3,60 €","3,16 €","6,30 €","3,06 €"]},
{"cat":"preis","q":"Wie viel kostet der Eintritt ins Schwimmbad?","say":"Der Eintritt ins Schwimmbad kostet vier Euro siebzig.","show":"Der Eintritt ins Schwimmbad kostet 4,70 €.","mark":"4,70 €","answer":"4,70 €","options":["4,70 €","4,17 €","7,40 €","14,70 €"]},
{"cat":"tel","q":"Wie ist die Telefonnummer?","say":"Rufen Sie uns an unter null zwei null eins, drei vier fünf sechs sieben acht.","show":"Rufen Sie uns an unter 0201 345678.","mark":"0201 345678","answer":"0201 345678","options":["0201 345678","0201 354678","0210 345678","0201 345687"]},
{"cat":"tel","q":"Wie ist die Handynummer von Herrn Yılmaz?","say":"Hier ist Herr Yılmaz. Meine Handynummer ist null eins sieben drei, vier zwei sechs, neun eins acht null.","show":"Hier ist Herr Yılmaz. Meine Handynummer ist 0173 4269180.","mark":"0173 4269180","answer":"0173 4269180","options":["0173 4269180","0137 4269180","0173 4629180","0173 4269810"]},
{"cat":"tel","q":"Wie ist die Nummer der Praxis?","say":"Die Praxis erreichen Sie unter null zwei drei drei zwei, vierundzwanzig, achtundsechzig.","show":"Die Praxis erreichen Sie unter 02332 2468.","mark":"02332 2468","answer":"02332 2468","options":["02332 2468","02332 4286","02323 2468","02332 2486"]},
{"cat":"tel","q":"Wie ist die Durchwahl?","say":"Meine Durchwahl ist die drei sieben eins.","show":"Meine Durchwahl ist die 371.","mark":"371","answer":"371","options":["371","317","731","377"]},
{"cat":"tel","q":"Wie ist die Telefonnummer?","say":"Meine Nummer ist null eins fünf sieben, achtundneunzig, sechsundvierzig, dreiunddreißig.","show":"Meine Nummer ist 0157 984633.","mark":"0157 984633","answer":"0157 984633","options":["0157 984633","0157 896433","0175 984633","0157 986433"]},
{"cat":"tel","q":"Unter welcher Nummer soll man zurückrufen?","say":"Bitte rufen Sie zurück unter null zwei null zwei, neun acht sieben sechs fünf.","show":"Bitte rufen Sie zurück unter 0202 98765.","mark":"0202 98765","answer":"0202 98765","options":["0202 98765","0220 98765","0202 89765","0202 98756"]},
{"cat":"tel","q":"Welche Nummer hat der Hausmeister?","say":"Der Hausmeister hat die Nummer null eins sechs null, fünf fünf drei, zwei zwei eins.","show":"Der Hausmeister hat die Nummer 0160 553221.","mark":"0160 553221","answer":"0160 553221","options":["0160 553221","0160 535221","0106 553221","0160 553212"]},
{"cat":"tel","q":"Wie ist die Servicenummer?","say":"Unsere Servicenummer lautet null acht null null, eins zwei drei, vier fünf sechs.","show":"Unsere Servicenummer lautet 0800 123456.","mark":"0800 123456","answer":"0800 123456","options":["0800 123456","0800 123465","0080 123456","0800 213456"]},
{"cat":"tel","q":"Wie ist die Handynummer von Frau Novak?","say":"Hallo, hier ist Frau Novak. Meine Handynummer ist null eins sieben sechs, dreiundsiebzig, vierzehn, fünfundfünfzig.","show":"Hallo, hier ist Frau Novak. Meine Handynummer ist 0176 731455.","mark":"0176 731455","answer":"0176 731455","options":["0176 731455","0176 371455","0167 731455","0176 734055"]},
{"cat":"tel","q":"Wie ist die Telefonnummer der Schule?","say":"Die Schule erreichen Sie unter null zwei drei drei zwei, fünf eins sechs null.","show":"Die Schule erreichen Sie unter 02332 5160.","mark":"02332 5160","answer":"02332 5160","options":["02332 5160","02332 5106","02332 1560","02323 5160"]},
{"cat":"tel","q":"Wie ist die Telefonnummer?","say":"Sie erreichen mich unter null zwo null eins, zwo drei drei sieben.","show":"Sie erreichen mich unter 0201 2337.","mark":"0201 2337","answer":"0201 2337","options":["0201 2337","0201 3237","0201 2373","0210 2337"]},
{"cat":"tel","q":"Wie ist die Nummer vom Taxi?","say":"Ein Taxi bestellen Sie unter null zwei null eins, sechsundachtzig, fünfundachtzig.","show":"Ein Taxi bestellen Sie unter 0201 8685.","mark":"0201 8685","answer":"0201 8685","options":["0201 8685","0201 6858","0201 8658","0201 6885"]},
{"cat":"tel","q":"Wie ist die Kundennummer?","say":"Ihre Kundennummer ist vier sieben eins neun drei.","show":"Ihre Kundennummer ist 47193.","mark":"47193","answer":"47193","options":["47193","47139","41793","74193"]},
{"cat":"tel","q":"Wie ist die Hausnummer?","say":"Ich wohne in der Hauptstraße einundachtzig.","show":"Ich wohne in der Hauptstraße 81.","mark":"81","answer":"81","options":["81","18","71","80"]},
{"cat":"tel","q":"Wie ist die Hausnummer?","say":"Unsere neue Adresse ist Bahnhofstraße dreizehn.","show":"Unsere neue Adresse ist Bahnhofstraße 13.","mark":"13","answer":"13","options":["13","30","3","33"]},
{"cat":"tel","q":"Wie ist die Hausnummer der Arztpraxis?","say":"Die Arztpraxis ist in der Goethestraße zwölf a.","show":"Die Arztpraxis ist in der Goethestraße 12a.","mark":"12a","answer":"12a","options":["12a","21a","2a","12"]},
{"cat":"tel","q":"Wie ist die Postleitzahl?","say":"Die Postleitzahl von Gevelsberg ist fünf acht zwei acht fünf.","show":"Die Postleitzahl von Gevelsberg ist 58285.","mark":"58285","answer":"58285","options":["58285","58258","85285","58225"]},
{"cat":"tel","q":"Wie ist die Hausnummer?","say":"Ich wohne jetzt in der Schillerstraße sechzig.","show":"Ich wohne jetzt in der Schillerstraße 60.","mark":"60","answer":"60","options":["60","16","6","66"]},
{"cat":"tel","q":"Wie ist die Hausnummer vom Kindergarten?","say":"Der Kindergarten ist in der Lindenstraße siebenundvierzig.","show":"Der Kindergarten ist in der Lindenstraße 47.","mark":"47","answer":"47","options":["47","74","57","46"]},
{"cat":"tel","q":"Wie ist die Hausnummer?","say":"Kommen Sie bitte in die Kirchstraße fünfzehn.","show":"Kommen Sie bitte in die Kirchstraße 15.","mark":"15","answer":"15","options":["15","50","5","16"]},
{"cat":"tel","q":"Wie ist die Hausnummer der Firma?","say":"Die Firma ist in der Industriestraße hundertzwölf.","show":"Die Firma ist in der Industriestraße 112.","mark":"112","answer":"112","options":["112","121","212","102"]},
{"cat":"tel","q":"Wie ist die Postleitzahl?","say":"Die Postleitzahl ist vier fünf eins drei null.","show":"Die Postleitzahl ist 45130.","mark":"45130","answer":"45130","options":["45130","45103","54130","45310"]},
{"cat":"tel","q":"Wie ist die Handynummer?","say":"Notieren Sie bitte meine Nummer: null eins fünf eins, zwei sechs drei, vier vier acht.","show":"Notieren Sie bitte meine Nummer: 0151 263448.","mark":"0151 263448","answer":"0151 263448","options":["0151 263448","0151 236448","0115 263448","0151 263484"]},
{"cat":"tel","q":"Wie ist die Hausnummer?","say":"Das Paket ist für die Gartenstraße neunzehn.","show":"Das Paket ist für die Gartenstraße 19.","mark":"19","answer":"19","options":["19","90","9","29"]},
{"cat":"tel","q":"Wie ist die Hausnummer?","say":"Wir wohnen in der Ringstraße zweiundsechzig.","show":"Wir wohnen in der Ringstraße 62.","mark":"62","answer":"62","options":["62","26","72","52"]},
{"cat":"tel","q":"Welche Telefonnummer hat die Kita?","say":"Die Kita hat die Telefonnummer null zwei drei drei zwei, sieben null neun drei.","show":"Die Kita hat die Telefonnummer 02332 7093.","mark":"02332 7093","answer":"02332 7093","options":["02332 7093","02332 7039","02332 9073","02332 7903"]},
{"cat":"tel","q":"Wie ist die Handynummer von Herrn Kowalski?","say":"Hier ist Herr Kowalski. Sie erreichen mich unter null eins sieben zwei, achtzehn, siebenundsechzig, neunzig.","show":"Hier ist Herr Kowalski. Sie erreichen mich unter 0172 186790.","mark":"0172 186790","answer":"0172 186790","options":["0172 186790","0172 806790","0172 187690","0127 186790"]},
{"cat":"tel","q":"Wie ist die Hausnummer?","say":"Ich wohne in der Mozartstraße dreiunddreißig b.","show":"Ich wohne in der Mozartstraße 33b.","mark":"33b","answer":"33b","options":["33b","33d","23b","43b"]},
{"cat":"tel","q":"Wie ist die Hausnummer der Schule?","say":"Die Schule liegt in der Parkstraße siebzig.","show":"Die Schule liegt in der Parkstraße 70.","mark":"70","answer":"70","options":["70","17","7","77"]},
{"cat":"tel","q":"Wie ist die Telefonnummer?","say":"Unsere Nummer ist null zwei null eins, zweiundvierzig, null null, dreizehn.","show":"Unsere Nummer ist 0201 420013.","mark":"0201 420013","answer":"0201 420013","options":["0201 420013","0201 240013","0201 420030","0201 420031"]},
{"cat":"nr","q":"Von welchem Gleis fährt der Zug?","say":"Der Regionalexpress nach Hamm fährt heute von Gleis sechzehn.","show":"Der Regionalexpress nach Hamm fährt heute von Gleis 16.","mark":"16","answer":"16","options":["16","6","60","17"]},
{"cat":"nr","q":"In welchem Zimmer ist die Prüfung?","say":"Die Prüfung ist in Zimmer zweihundertvierzehn.","show":"Die Prüfung ist in Zimmer 214.","mark":"214","answer":"214","options":["214","241","204","224"]},
{"cat":"nr","q":"Welcher Bus fährt zum Krankenhaus?","say":"Zum Krankenhaus fahren Sie mit der Buslinie hundertsechsundvierzig.","show":"Zum Krankenhaus fahren Sie mit der Buslinie 146.","mark":"146","answer":"146","options":["146","164","46","156"]},
{"cat":"nr","q":"In welchem Stock ist die Praxis?","say":"Die Praxis ist im dritten Stock.","show":"Die Praxis ist im 3. Stock.","mark":"3.","answer":"3. Stock","options":["3. Stock","2. Stock","4. Stock","13. Stock"]},
{"cat":"nr","q":"Welche Nummer wird aufgerufen?","say":"Die Nummer siebenundachtzig bitte zu Schalter vier.","show":"Die Nummer 87 bitte zu Schalter 4.","mark":"87","answer":"87","options":["87","78","97","67"]},
{"cat":"nr","q":"An welchem Gleis kommt der ICE an?","say":"Der ICE aus Berlin kommt heute an Gleis dreizehn an.","show":"Der ICE aus Berlin kommt heute an Gleis 13 an.","mark":"13","answer":"13","options":["13","30","3","14"]},
{"cat":"nr","q":"In welchem Raum wartet Herr Schulz?","say":"Herr Schulz wartet in Raum hundertachtzehn.","show":"Herr Schulz wartet in Raum 118.","mark":"118","answer":"118","options":["118","180","181","108"]},
{"cat":"nr","q":"Welchen Platz hat sie im Zug?","say":"Ich sitze in Wagen sieben auf Platz fünfundsechzig.","show":"Ich sitze in Wagen 7 auf Platz 65.","mark":"65","answer":"65","options":["65","56","75","64"]},
{"cat":"nr","q":"Welche Zimmernummer hat der Gast?","say":"Ihr Zimmer hat die Nummer dreihundertzwölf.","show":"Ihr Zimmer hat die Nummer 312.","mark":"312","answer":"312","options":["312","321","302","213"]},
{"cat":"nr","q":"Mit welcher Linie fährt sie?","say":"Ich fahre jeden Tag mit der Straßenbahn achtzehn.","show":"Ich fahre jeden Tag mit der Straßenbahn 18.","mark":"18","answer":"18","options":["18","80","8","19"]},
{"cat":"nr","q":"Wie viele Gäste kommen zur Feier?","say":"Zur Feier kommen ungefähr vierzig Personen.","show":"Zur Feier kommen ungefähr 40 Personen.","mark":"40","answer":"40","options":["40","14","4","44"]},
{"cat":"nr","q":"Wie alt ist der Sohn?","say":"Mein Sohn ist siebzehn Jahre alt.","show":"Mein Sohn ist 17 Jahre alt.","mark":"17","answer":"17","options":["17","70","7","16"]},
{"cat":"nr","q":"Wie weit ist es noch bis Bochum?","say":"Bis nach Bochum sind es noch dreiunddreißig Kilometer.","show":"Bis nach Bochum sind es noch 33 Kilometer.","mark":"33","answer":"33 km","options":["33 km","23 km","43 km","13 km"]},
{"cat":"nr","q":"Wie viele Stunden arbeitet sie pro Woche?","say":"Ich arbeite fünfundzwanzig Stunden pro Woche.","show":"Ich arbeite 25 Stunden pro Woche.","mark":"25","answer":"25","options":["25","52","35","20"]},
{"cat":"datum","q":"Wann ist der Termin?","say":"Ihr Termin ist am dritten Mai.","show":"Ihr Termin ist am 3. Mai.","mark":"3. Mai","answer":"3. Mai","options":["3. Mai","3. März","13. Mai","23. Mai"]},
{"cat":"datum","q":"Wann hat er Geburtstag?","say":"Ich habe am siebzehnten März Geburtstag.","show":"Ich habe am 17. März Geburtstag.","mark":"17. März","answer":"17. März","options":["17. März","7. März","27. März","17. Mai"]},
{"cat":"datum","q":"Wann beginnt der neue Kurs?","say":"Der neue Kurs beginnt am ersten September.","show":"Der neue Kurs beginnt am 1. September.","mark":"1. September","answer":"1. September","options":["1. September","1. Dezember","11. September","21. September"]},
{"cat":"datum","q":"Wann ist das Sommerfest?","say":"Das Sommerfest ist am zwanzigsten Juni.","show":"Das Sommerfest ist am 20. Juni.","mark":"20. Juni","answer":"20. Juni","options":["20. Juni","20. Juli","12. Juni","2. Juni"]},
{"cat":"datum","q":"Wann ist er geboren?","say":"Ich bin am zwölften zehnten neunzehnhundertneunundachtzig geboren.","show":"Ich bin am 12.10.1989 geboren.","mark":"12.10.1989","answer":"12.10.1989","options":["12.10.1989","10.12.1989","12.10.1998","20.10.1989"]},
{"cat":"datum","q":"Bis wann soll man die Unterlagen schicken?","say":"Bitte schicken Sie die Unterlagen bis zum fünfzehnten Januar.","show":"Bitte schicken Sie die Unterlagen bis zum 15. Januar.","mark":"15. Januar","answer":"15. Januar","options":["15. Januar","15. Juni","5. Januar","16. Januar"]},
{"cat":"datum","q":"Wann zieht er um?","say":"Wir ziehen am achtundzwanzigsten Februar um.","show":"Wir ziehen am 28. Februar um.","mark":"28. Februar","answer":"28. Februar","options":["28. Februar","28. Januar","18. Februar","8. Februar"]},
{"cat":"datum","q":"Wann ist die Prüfung?","say":"Die Prüfung findet am vierten Dezember statt.","show":"Die Prüfung findet am 4. Dezember statt.","mark":"4. Dezember","answer":"4. Dezember","options":["4. Dezember","14. Dezember","4. November","24. Dezember"]},
{"cat":"datum","q":"Wann hat sie einen Termin beim Arzt?","say":"Ich habe am dreißigsten April einen Termin beim Arzt.","show":"Ich habe am 30. April einen Termin beim Arzt.","mark":"30. April","answer":"30. April","options":["30. April","13. April","30. August","3. April"]},
{"cat":"datum","q":"Welches Datum ist heute?","say":"Heute ist der einundzwanzigste Oktober.","show":"Heute ist der 21. Oktober.","mark":"21. Oktober","answer":"21. Oktober","options":["21. Oktober","12. Oktober","21. November","20. Oktober"]},
{"cat":"datum","q":"Wann beginnen die Sommerferien?","say":"Die Sommerferien beginnen am siebten Juli.","show":"Die Sommerferien beginnen am 7. Juli.","mark":"7. Juli","answer":"7. Juli","options":["7. Juli","7. Juni","17. Juli","27. Juli"]},
{"cat":"datum","q":"Seit wann arbeitet er bei der Firma?","say":"Ich arbeite seit dem zweiten August bei der Firma.","show":"Ich arbeite seit dem 2. August bei der Firma.","mark":"2. August","answer":"2. August","options":["2. August","2. April","20. August","12. August"]},
{"cat":"datum","q":"In welchem Jahr ist sie nach Deutschland gekommen?","say":"Ich bin im Jahr zweitausendfünfzehn nach Deutschland gekommen.","show":"Ich bin im Jahr 2015 nach Deutschland gekommen.","mark":"2015","answer":"2015","options":["2015","2050","2005","2016"]},
{"cat":"datum","q":"Wann ist sein Vater geboren?","say":"Mein Vater ist neunzehnhundertvierundsechzig geboren.","show":"Mein Vater ist 1964 geboren.","mark":"1964","answer":"1964","options":["1964","1946","1974","1954"]},
{"cat":"datum","q":"Wann endet der Mietvertrag?","say":"Der Mietvertrag endet am einunddreißigsten Dezember.","show":"Der Mietvertrag endet am 31. Dezember.","mark":"31. Dezember","answer":"31. Dezember","options":["31. Dezember","13. Dezember","31. Oktober","30. Dezember"]},
{"cat":"datum","q":"Wann kommt die Lieferung?","say":"Ihre Lieferung kommt am neunten November.","show":"Ihre Lieferung kommt am 9. November.","mark":"9. November","answer":"9. November","options":["9. November","19. November","9. Dezember","10. November"]}];

  const readSeen = () => { try { return JSON.parse(localStorage.getItem(SEEN_KEY) || '[]'); } catch { return []; } };
  const writeSeen = a => { try { localStorage.setItem(SEEN_KEY, JSON.stringify(a.slice(-60))); } catch {} };

  function choose(api, opt) {
    const ids = POOL.map((x, i) => i).filter(i => opt === 'mix' || !opt || POOL[i].cat === opt);
    const seen = new Set(readSeen());
    const fresh = api.shuffle(ids.filter(i => !seen.has(i))), old = api.shuffle(ids.filter(i => seen.has(i)));
    const pick = [...fresh, ...old].slice(0, ROUNDS);
    writeSeen([...readSeen().filter(i => !pick.includes(i)), ...pick]);
    return pick.map(i => POOL[i]);
  }

  DMGame.register({
    id: ID, title: 'Zahlen-Ohr', icon: '🔢', level: 'A1–B1',
    desc: 'Hör genau hin: Uhrzeiten, Preise, Telefonnummern – wie im DTZ.',
    intro: 'Du hörst einen kurzen Satz mit einer Zahl. Wähle die richtige Antwort. Du kannst jeden Satz bis zu dreimal hören. 10 Runden.',
    optionsLabel: 'Was möchtest du üben?',
    options: [{ id: 'mix', label: 'Alles gemischt' }, { id: 'zeit', label: 'Uhrzeiten' }, { id: 'preis', label: 'Preise' }, { id: 'tel', label: 'Telefon & Hausnummern' }],
    start(api, opt) {
      const esc = api.esc, rounds = choose(api, opt), wrong = [];
      let n = 0, score = 0, streak = 0;
      const live = () => api.el.isConnected;

      function round() {
        const it = rounds[n];
        let left = EXTRA_PLAYS, answered = false, playing = false, guard = null;
        api.clearFeedback();
        api.hud({ step: `${n + 1}/${rounds.length}`, progress: n / rounds.length, score });
        const opts = api.shuffle(it.options);
        const long = opts.some(o => o.length > 9);
        api.el.innerHTML = `
          <div class="sp-zahlen-listen">
            <button type="button" class="sp-zahlen-play"><span aria-hidden="true">🔊</span> <span class="sp-zahlen-pl">Anhören</span> <kbd class="ch-keys">H</kbd></button>
            <span class="sp-zahlen-left" aria-live="polite"></span>
          </div>
          <p class="ch-q sp-zahlen-q">${esc(it.q)}</p>
          <div class="ch-opts sp-zahlen-opts${long ? ' is-long' : ''}" role="group" aria-label="Antworten">
            ${opts.map((o, k) => `<button type="button" class="ch-opt" data-k="${k}"><kbd>${k + 1}</kbd>${esc(o)}</button>`).join('')}
          </div>`;
        const btn = api.el.querySelector('.sp-zahlen-play'), lbl = btn.querySelector('.sp-zahlen-pl'), info = api.el.querySelector('.sp-zahlen-left');

        const paint = () => {
          btn.classList.toggle('is-playing', playing);
          if (answered) { lbl.textContent = 'Nochmal anhören'; info.textContent = ''; btn.disabled = playing; return; }
          lbl.textContent = playing ? 'Hör zu …' : 'Anhören';
          btn.disabled = playing || left <= 0;
          info.textContent = playing ? '' : left > 0 ? `Du kannst noch ${left}× hören.` : 'Jetzt wählen!';
        };
        const done = () => { if (!live()) return; clearTimeout(guard); playing = false; paint(); };
        const play = () => {
          if (playing || !live()) return;
          playing = true; paint();
          // Sicherheitsnetz, falls das Gerät kein „Ende“ meldet
          guard = setTimeout(done, Math.max(3500, it.say.length * 110));
          const ok = api.speak(it.say, done);
          if (ok === false) { done(); info.textContent = 'Dein Gerät kann gerade nicht vorlesen. Prüfe den Ton.'; }
        };
        btn.onclick = () => { if (!answered) { if (left <= 0) return; left--; } play(); };
        paint();

        api.el.querySelectorAll('.ch-opt').forEach(b => b.onclick = () => {
          if (answered) return;
          answered = true;
          const pickd = opts[+b.dataset.k], ok = pickd === it.answer;
          api.el.querySelectorAll('.ch-opt').forEach(x => { x.disabled = true; if (opts[+x.dataset.k] === it.answer) x.classList.add('is-right'); });
          if (!ok) b.classList.add('is-wrong');
          if (ok) { score++; streak++; } else { streak = 0; wrong.push({ correct: it.answer, tip: it.show }); }
          const shown = esc(it.show).replace(esc(it.mark), `<b>${esc(it.mark)}</b>`);
          api.feedback(ok, `${ok ? (streak >= 3 ? `Richtig! 🔥 ${streak} in Folge` : 'Richtig! ✅') : `Leider falsch. Richtig ist: <b>${esc(it.answer)}</b>`}
            <span class="sp-zahlen-say">„${shown}“</span>`);
          api.hud({ score, progress: (n + 1) / rounds.length });
          paint();
          const last = n === rounds.length - 1;
          api.next(last ? 'Zum Ergebnis' : 'Weiter', () => { if (last) api.finish({ score, max: rounds.length, wrong }); else { n++; round(); } });
        });

        // Startet automatisch einmal (zählt nicht zu den Wiederholungen)
        const auto = () => { if (live() && rounds[n] === it && !playing) play(); };
        Promise.race([window.DM?.ttsReady || Promise.resolve(), new Promise(r => setTimeout(r, 1200))]).then(() => setTimeout(auto, 250));
      }

      round();
    }
  });

  // Taste H = nochmal anhören
  document.addEventListener('keydown', e => {
    if (e.altKey || e.ctrlKey || e.metaKey || (e.key !== 'h' && e.key !== 'H')) return;
    const tag = document.activeElement?.tagName;
    if (tag === 'INPUT' || tag === 'TEXTAREA') return;
    const b = document.querySelector('.sp-play .sp-zahlen-play');
    if (b && !b.disabled) { e.preventDefault(); b.click(); }
  });
})();
