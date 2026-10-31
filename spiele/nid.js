/* Lernspiel „Neu in Deutschland“ – Story-Abenteuer in Kapiteln (A2–B1).
   Du spielst eine Figur, die neu in die Stadt Lindenfeld zieht: Wohnung, Bürgeramt, Arzt, Sprachkurs.
   Schritt-Arten: story (Erzähltext), talk (Gespräch – das Gegenüber spricht per api.speak), read (Dokument + Frage),
   form (Formular ausfüllen), order (Satz bauen), item (Dokument für den Ordner, beendet das Kapitel).
   Platzhalter {vn} {nn} … nur in Anzeige-Texten, nie in gesprochenen Sätzen (sonst passt die Aufnahme nicht).
   Fortschritt: localStorage 'dm-nid' { c: Figur, done: { <kapitel>: Sterne } }.
   Gesprochene Sätze: node tools/collect-spiele-tts.mjs → spiele/tts-nid.json */
(() => {
  if (!window.DMGame) return;
  const ID = 'nid', KEY = 'dm-nid';

  const CSS = `
.sp-nid-me{display:flex;align-items:center;gap:12px;padding:12px 14px;border-radius:16px;background:#f3f5fb}
.sp-nid-me b{display:block;font-size:18px}.sp-nid-me small{display:block;color:#55607a;font-size:14px}
.sp-nid-face{display:grid;place-items:center;flex:0 0 48px;width:48px;height:48px;border-radius:50%;background:#fff;font-size:28px;line-height:1}
.sp-nid-bag{margin:12px 0 4px;padding:10px 14px;border:1px dashed #c5cdf0;border-radius:14px;font-size:15px;color:#3b4560}
.sp-nid-bag span{display:inline-block;margin:2px 6px 2px 0;padding:3px 10px;border-radius:99px;background:#eef1f8;font-weight:700;color:var(--dm-ink)}
.sp-nid-h{font-size:18px;margin:16px 2px 4px}
.sp-nid-tip{margin:0 2px 10px;color:#55607a;font-size:14.5px;line-height:1.4}
.sp-nid-map{display:grid;gap:10px}
.sp-nid-ch{display:flex;align-items:center;gap:12px;width:100%;min-height:72px;padding:12px 14px;border:2px solid var(--dm-line);border-radius:16px;background:#fff;font:inherit;color:var(--dm-ink);text-align:left;cursor:pointer}
.sp-nid-ch:hover:not(:disabled){border-color:var(--dm-tinte)}
.sp-nid-ch:focus-visible{outline:3px solid var(--dm-tinte);outline-offset:2px}
.sp-nid-ch.is-next{border-color:var(--dm-tinte);background:var(--dm-tinte-soft)}
.sp-nid-ch .sp-nid-ic{flex:0 0 44px;font-size:30px;text-align:center}
.sp-nid-ch>span:nth-child(2){flex:1;min-width:0}
.sp-nid-ch small{display:block;color:#55607a;font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:.03em}
.sp-nid-ch b{display:block;font-size:17px;line-height:1.3}
.sp-nid-ch em{display:block;font-style:normal;color:#55607a;font-size:14px;line-height:1.35}
.sp-nid-st{flex:0 0 auto;font-size:15px;white-space:nowrap}
.sp-nid-who{display:grid;grid-template-columns:repeat(auto-fit,minmax(118px,1fr));gap:10px;margin-top:10px}
.sp-nid-who .sp-nid-ch{flex-direction:column;text-align:center;justify-content:center;gap:4px;padding:14px 8px}
.sp-nid-who .sp-nid-ic{flex:none;font-size:40px}
.sp-nid-kick{margin:0 2px 8px;color:#55607a;font-size:14px;font-weight:700}
.sp-nid-story{display:flex;gap:12px;padding:16px;border-radius:16px;background:#fff8e6;border:1px solid #f2dfae;font-size:17px;line-height:1.5}
.sp-nid-story>span{font-size:26px;line-height:1}
.sp-nid-story p{margin:0}
.sp-nid-npc{display:flex;align-items:center;gap:10px;margin-bottom:10px}
.sp-nid-npc b{display:block;font-size:17px}.sp-nid-npc small{display:block;color:#55607a;font-size:14px}
.sp-nid-av{display:grid;place-items:center;flex:0 0 44px;width:44px;height:44px;border-radius:50%;color:#fff;font-weight:800;font-size:16px}
.sp-nid-bubble{display:flex;align-items:flex-start;gap:4px;padding:10px 6px 10px 16px;border-radius:6px 18px 18px 18px;background:#fff;border:1px solid #e1e5ef;box-shadow:0 2px 6px rgba(23,32,54,.05);margin-bottom:12px}
.sp-nid-bubble p{flex:1;margin:0;padding-top:3px;font-size:18px;line-height:1.45}
.sp-nid-bubble.is-react{background:#fdf6f5;border-color:#f0cfcb}
.sp-nid-say{flex:0 0 44px;width:44px;height:44px;margin:-6px 0;border:0;border-radius:50%;background:transparent;font-size:18px;cursor:pointer}
.sp-nid-say:hover,.sp-nid-say:focus-visible{background:#eef1f8}
.sp-nid-doc{margin:0 0 12px;padding:14px 16px;border-radius:12px;background:#fff;border:1px solid #d9deea;box-shadow:0 3px 10px rgba(23,32,54,.07);font-size:16px;line-height:1.5}
.sp-nid-doc h3{margin:0 0 8px;font-size:15px;color:#2b3550;border-bottom:2px solid #eef1f8;padding-bottom:6px}
.sp-nid-doc p{margin:4px 0}
.sp-nid-q{font-weight:700;font-size:17px;margin:4px 2px 10px}
.sp-nid-form{margin:0;display:grid;grid-template-columns:minmax(0,40%) 1fr;gap:0;border-top:1px solid #eef1f8}
.sp-nid-form dt,.sp-nid-form dd{margin:0;padding:8px 4px;border-bottom:1px solid #eef1f8;font-size:15px;line-height:1.35;overflow-wrap:anywhere}
.sp-nid-form dt{color:#55607a}
.sp-nid-form dd{font-weight:700;color:#8a93a8}
.sp-nid-form dd.is-cur{background:#fff8e6;color:#b45309}
.sp-nid-form dd.is-ok{color:#1f6f43}.sp-nid-form dd.is-bad{color:#b42318}
.sp-nid-item{text-align:center;padding:20px 14px;border-radius:18px;background:linear-gradient(#f3f5fb,#fff);border:1px solid #e1e5ef}
.sp-nid-item .sp-nid-big{font-size:56px;line-height:1.1}
.sp-nid-item h3{margin:6px 0;font-size:20px}
.sp-nid-item p{margin:6px auto 0;max-width:34em;color:#3b4560;line-height:1.5}
.sp-nid .ch-opts{display:grid;gap:10px}
.sp-nid .ch-opt{justify-content:flex-start;font-size:17px}
@media (max-width:420px){.sp-nid-bubble p,.sp-nid .ch-opt,.sp-nid-story{font-size:16px}.sp-nid-form dt,.sp-nid-form dd{padding:6px 3px;font-size:14px}}`;

  // Figuren: Werte für die Platzhalter in Anzeige-Texten (Formulare, Erzähltexte)
  const FIG = [
    { id: 'amira', face: '👩🏽', vn: 'Amira', nn: 'Haddad', land: 'Syrien', aus: 'Syrien', nat: 'syrisch', lang: 'Arabisch', ort: 'Aleppo', born: '14.03.1994' },
    { id: 'olena', face: '👩🏼', vn: 'Olena', nn: 'Kovalenko', land: 'Ukraine', aus: 'der Ukraine', nat: 'ukrainisch', lang: 'Ukrainisch', ort: 'Charkiw', born: '02.11.1988' },
    { id: 'kemal', face: '👨🏽', vn: 'Kemal', nn: 'Aydın', land: 'Türkei', aus: 'der Türkei', nat: 'türkisch', lang: 'Türkisch', ort: 'İzmir', born: '27.07.1991' },
    { id: 'luis', face: '🧑🏻', vn: 'Luis', nn: 'Moreno', land: 'Kolumbien', aus: 'Kolumbien', nat: 'kolumbianisch', lang: 'Spanisch', ort: 'Medellín', born: '09.05.1997' }
  ];

  const P = {
    becker: { name: 'Frau Becker', role: 'Info-Schalter · Bahnhof', voice: 'f3', color: '#0369a1' },
    mira: { name: 'Mira', role: 'deine Freundin', voice: 'f2', color: '#c026d3' },
    wagner: { name: 'Herr Wagner', role: 'Vermieter', voice: 'm1', color: '#7c3aed' },
    petrovic: { name: 'Frau Petrović', role: 'Nachbarin', voice: 'f2', color: '#db2777' },
    schulz: { name: 'Frau Schulz', role: 'Bürgeramt Lindenfeld', voice: 'f1', color: '#0f766e' },
    haas: { name: 'Frau Haas', role: 'Praxis Dr. Neumann · Telefon', voice: 'f3', color: '#b45309' },
    neumann: { name: 'Dr. Neumann', role: 'Hausarzt', voice: 'm2', color: '#1d4ed8' },
    brandt: { name: 'Herr Brandt', role: 'Sprachschule „Wort für Wort“', voice: 'm3', color: '#15803d' },
    lange: { name: 'Frau Lange', role: 'Personalleiterin · Stadtwerke Lindenfeld', voice: 'f1', color: '#be123c' },
    kraus: { name: 'Herr Kraus', role: 'Wohngeldstelle Lindenfeld', voice: 'm2', color: '#4d7c0f' }
  };

  const ANZEIGE = { title: 'Anzeige · Lindenfelder Wochenblatt', lines: ['Schöne 2 ZKB, 58 m², 3. OG, Balkon', 'KM 520 € + NK 160 €', 'Kaution: 2 KM', 'Frei ab 01.11. · Tel. 0151 2345678 (Wagner)'] };
  const AMT = { title: 'buergeramt.lindenfeld.de · Wohnung anmelden', lines: ['Bitte buchen Sie online einen Termin.', 'Mitbringen: Pass oder Personalausweis, Wohnungsgeberbestätigung, ausgefülltes Anmeldeformular.', 'Die Anmeldung ist kostenlos.'] };
  const ADR = 'Gartenstraße 12, 34567 Lindenfeld';

  /* talk: p = Person, s = Satz des Gegenübers, a = passende Antwort, n = Hinweis, w = [falsche Antwort, Reaktion (gesprochen), Erklärung]
     read: doc, q, a, w = falsche Antworten, n.   form: title, f = [Feld, richtig, [falsch …], Hinweis].
     order: q, a = Wörter in richtiger Reihenfolge, alt = weitere richtige Sätze, n.   item: icon, name, text */
  const CH = [
    { id: 'ankommen', lv: 'A1', icon: '🚉', title: 'Ankommen in Lindenfeld', sum: 'Am Bahnhof nach dem Weg fragen, Freundin begrüßen, Busplan lesen.', steps: [
      { t: 'story', text: 'Du bist {vn} {nn} und kommst aus {aus}. Heute kommst du mit dem Zug in Lindenfeld an. Deine Freundin Mira wartet am Ausgang auf dich.' },
      { t: 'talk', p: 'becker', s: 'Guten Tag! Kann ich Ihnen helfen?', a: 'Guten Tag! Wo ist der Ausgang, bitte?', n: 'Mit „Wo ist …, bitte?“ fragst du höflich nach dem Weg.', w: [
        ['Guten Tag! Wie heißt du?', 'Ich heiße Becker. Aber was suchen Sie denn?', 'Hier fragst du nach dem Weg, nicht nach dem Namen.'],
        ['Tschüss!', 'Tschüss? Sie sind doch gerade erst gekommen!', '„Tschüss“ sagt man am Ende. Am Anfang: „Guten Tag!“']] },
      { t: 'talk', p: 'becker', s: 'Der Ausgang ist dort links, neben dem Café.', a: 'Links neben dem Café. Vielen Dank!', n: 'Wiederholen und „Danke“ sagen.', w: [
        ['Rechts neben dem Café?', 'Nein, links! Dort, neben dem Café.', 'links ⬅ – rechts ➡'],
        ['Bitte.', 'Ähm … gern geschehen?', 'Wenn dir jemand hilft, sagst du „Danke!“. „Bitte“ ist die Antwort darauf.']] },
      { t: 'talk', p: 'mira', s: 'Hallo! Herzlich willkommen in Lindenfeld! Wie war die Reise?', a: 'Hallo Mira! Die Reise war lang, aber gut.', n: 'Mit Freunden sprichst du locker und mit „du“.', w: [
        ['Hallo Mira! Ich heiße gut.', 'Haha! Du heißt doch nicht „gut“! Wie war die Reise?', '„Ich heiße …“ sagt man für den Namen. Für die Reise: „Die Reise war gut.“'],
        ['Guten Abend, Frau Mira. Sehr erfreut.', 'Frau Mira? Wir sind doch Freunde! Sag einfach Mira.', 'Mit Freunden sprichst du locker: „Hallo Mira!“']] },
      { t: 'read', doc: { title: 'Bus 7 · Bahnhof → Rosenweg', lines: ['Bahnhof ab: 14:10 · 14:40 · 15:10', 'Marktplatz: 14:16 · 14:46 · 15:16', 'Rosenweg: 14:22 · 14:52 · 15:22', 'Fahrkarte: Erwachsene 2,50 € · Kinder 1,30 €'] }, q: 'Es ist 14:30 Uhr. Wann fährt der nächste Bus?', a: 'um 14:40 Uhr', w: ['um 14:10 Uhr', 'um 15:10 Uhr', 'um 14:22 Uhr'], n: '14:10 Uhr ist schon vorbei. Der nächste Bus fährt um 14:40 Uhr.' },
      { t: 'read', doc: { title: 'Bus 7 · Bahnhof → Rosenweg', lines: ['Bahnhof ab: 14:10 · 14:40 · 15:10', 'Marktplatz: 14:16 · 14:46 · 15:16', 'Rosenweg: 14:22 · 14:52 · 15:22', 'Fahrkarte: Erwachsene 2,50 € · Kinder 1,30 €'] }, q: 'Was kostet eine Fahrkarte für dich?', a: '2,50 €', w: ['1,30 €', '14,40 €', 'nichts'], n: 'Du bist erwachsen: 2,50 €. 1,30 € ist der Preis für Kinder.' },
      { t: 'order', q: 'Im Bus fragt ein Mann: „Woher kommen Sie?“ Antworte.', a: ['Ich', 'komme', 'aus {aus}.'], n: 'Das Verb steht auf Position 2: „Ich komme aus …“' },
      { t: 'talk', p: 'mira', s: 'So, hier ist meine Wohnung. Möchtest du einen Tee oder einen Kaffee?', a: 'Einen Tee, bitte. Danke!', n: 'Bei einer Oder-Frage wählst du eins.', w: [
        ['Ich möchte ein Tee.', 'Einen Tee? Klar, gern!', '„der Tee“ – im Akkusativ: „einen Tee“.'],
        ['Ja.', 'Ja … was denn? Tee oder Kaffee?', 'Bei einer Oder-Frage wählst du eins: „Einen Tee, bitte.“']] },
      { t: 'item', icon: '🗺️', name: 'Stadtplan', text: 'Mira schenkt dir einen Stadtplan von Lindenfeld. Morgen beginnt die Wohnungssuche!' }
    ] },
    { id: 'wohnung', lv: 'A2', icon: '🏠', title: 'Die erste Wohnung', sum: 'Anzeige lesen, beim Vermieter anrufen, Wohnung besichtigen.', steps: [
      { t: 'story', text: 'Du bist {vn} {nn} aus {aus}. Seit zwei Wochen wohnst du bei deiner Freundin Mira in Lindenfeld und schläfst auf dem Sofa. Heute suchst du eine eigene Wohnung – in der Zeitung steht eine Anzeige.' },
      { t: 'read', doc: ANZEIGE, q: 'Wie viel Miete zahlst du jeden Monat insgesamt?', a: '680 €', w: ['520 €', '160 €', '1.040 €'], n: 'KM = Kaltmiete (520 €), NK = Nebenkosten (160 €). Zusammen ist das die Warmmiete: 680 € im Monat.' },
      { t: 'read', doc: ANZEIGE, q: 'Was bedeutet „2 ZKB“?', a: '2 Zimmer, Küche, Bad', w: ['2 Zimmer, Keller, Balkon', '2 Küchen und 1 Bad', 'Wohnung im 2. Stock'], n: 'ZKB = Zimmer, Küche, Bad. Die Wohnung hat zwei Zimmer und dazu Küche und Bad.' },
      { t: 'talk', p: 'wagner', s: 'Wagner, guten Tag.', a: 'Guten Tag, Herr Wagner. Ich rufe wegen der Wohnung in der Gartenstraße an.', n: 'Grüßen, den Namen nennen und gleich sagen, warum du anrufst.', w: [
        ['Hallo, ist die Wohnung noch da?', 'Welche Wohnung meinen Sie denn? Ich habe zwei Wohnungen in der Zeitung.', 'Sag genau, welche Wohnung du meinst: „wegen der Wohnung in der Gartenstraße“.'],
        ['Guten Tag, ich möchte eine Wohnung kaufen.', 'Kaufen? Nein, die Wohnung ist nur zu vermieten. Warum rufen Sie an?', 'In der Anzeige geht es um Miete, nicht um Kauf.']] },
      { t: 'talk', p: 'wagner', s: 'Ah, die Zweizimmerwohnung. Die ist noch frei. Möchten Sie sie ansehen?', a: 'Ja, sehr gern. Wann passt es Ihnen?', n: 'Interesse zeigen und höflich nach einem Termin fragen.', w: [
        ['Ja, gern. Wann passt es dir?', 'Wir kennen uns ja noch gar nicht … Also, wann möchten Sie kommen?', 'Mit dem Vermieter sprichst du mit „Sie“: „Wann passt es Ihnen?“'],
        ['Nein, ich nehme sie sofort, ohne Besichtigung.', 'Ohne Besichtigung? Sehen Sie sich die Wohnung lieber zuerst an.', 'Eine Wohnung immer zuerst ansehen – erst dann entscheiden.']] },
      { t: 'talk', p: 'wagner', s: 'Passt es Ihnen morgen um 17 Uhr? Die Adresse ist Gartenstraße 12.', a: 'Morgen um 17 Uhr passt gut. Vielen Dank, bis morgen!', n: 'Den Termin wiederholen, zusagen und sich bedanken.', w: [
        ['Ok. Tschüss.', 'Tschüss? Also kommen Sie morgen um 17 Uhr oder nicht?', '„Ok, tschüss“ ist zu knapp. Sag den Termin zu und bedanke dich.'],
        ['Morgen um 17 Uhr? Nein.', 'Hm. Und wann haben Sie Zeit?', 'Wenn du Nein sagst, nenn einen anderen Termin. Hier passt der Termin – also zusagen!']] },
      { t: 'story', text: 'Am nächsten Tag stehst du mit Herrn Wagner in der Wohnung. Sie ist hell, die Küche ist neu, vom Balkon siehst du einen Park. Nur im Bad tropft der Wasserhahn.' },
      { t: 'talk', p: 'wagner', s: 'Na, wie gefällt Ihnen die Wohnung?', a: 'Sie gefällt mir sehr gut. Nur der Wasserhahn im Bad tropft.', n: 'Erst etwas Positives sagen, dann das Problem freundlich nennen – so wird es vor dem Einzug repariert.', w: [
        ['Die Wohnung ist schlecht. Das Bad ist kaputt.', 'Kaputt? Was genau meinen Sie denn?', 'Zu negativ und zu ungenau. Besser: loben und dann genau sagen, was nicht funktioniert.'],
        ['Sie gefallen mir sehr gut.', 'Ich? Ähm … danke. Und die Wohnung?', '„Sie gefallen mir“ heißt: Herr Wagner gefällt dir. Gemeint ist die Wohnung: „Sie gefällt mir.“']] },
      { t: 'talk', p: 'wagner', s: 'Das repariere ich bis zum Einzug. Ich brauche noch eine Kopie von Ihrem Ausweis und einen Nachweis über Ihr Einkommen.', a: 'Kein Problem, ich bringe Ihnen die Unterlagen morgen vorbei.', n: 'Vermieter fragen fast immer nach Ausweis und Einkommen (z. B. Gehaltsabrechnung oder Bescheid vom Jobcenter). Das ist normal.', w: [
        ['Warum brauchen Sie das? Das geht Sie nichts an.', 'Ohne Unterlagen kann ich Ihnen die Wohnung leider nicht geben.', 'Ausweis und Einkommensnachweis sind normal bei der Wohnungssuche.'],
        ['Kein Problem, ich bringe die Unterlagen gestern vorbei.', 'Gestern? Gestern ist doch schon vorbei.', '„Gestern“ ist Vergangenheit. Für die Zukunft: „morgen“.']] },
      { t: 'order', q: 'Schreib Herrn Wagner eine SMS: Du möchtest die Wohnung nehmen.', a: ['Ich', 'möchte', 'die Wohnung', 'gern', 'mieten.'], alt: ['Gern möchte ich die Wohnung mieten.'], n: 'Das Modalverb „möchte“ steht auf Position 2, der Infinitiv „mieten“ am Ende.' },
      { t: 'read', doc: { title: 'Mietvertrag · § 3 Miete und Kaution', lines: ['Die Kaltmiete beträgt 520 €.', 'Die Vorauszahlung für Nebenkosten beträgt 160 €.', 'Die Miete ist bis zum 3. Werktag jedes Monats zu zahlen.', 'Die Kaution beträgt zwei Kaltmieten (1.040 €).'] }, q: 'Bis wann musst du die Miete jeden Monat bezahlen?', a: 'bis zum 3. Werktag des Monats', w: ['am Ende des Monats', 'wann ich will', 'einmal im Jahr'], n: '„Bis zum 3. Werktag“ – also ganz am Anfang des Monats. Am einfachsten mit einem Dauerauftrag bei der Bank.' },
      { t: 'item', icon: '📄', name: 'Mietvertrag', text: 'Herr Wagner gibt dir den Mietvertrag und die Schlüssel. Beim Einzug bekommst du von ihm noch die Wohnungsgeberbestätigung – die brauchst du im nächsten Kapitel beim Amt!' }
    ] },
    { id: 'amt', lv: 'A2', icon: '🏛️', title: 'Anmeldung beim Bürgeramt', sum: 'Nachbarin kennenlernen, Formular ausfüllen, Wohnung anmelden.', steps: [
      { t: 'story', text: 'Geschafft: Seit dem 1. November wohnst du in der Gartenstraße 12! Die Kisten sind noch nicht ausgepackt, da klingelt es an der Tür.' },
      { t: 'talk', p: 'petrovic', s: 'Hallo! Ich bin Frau Petrović, ich wohne nebenan. Sie sind neu hier, oder?', a: 'Ja, ich bin gerade eingezogen. Freut mich, Sie kennenzulernen!', n: 'Gute Nachbarn sind Gold wert: freundlich antworten und sich vorstellen.', w: [
        ['Ja. Und?', 'Oh … ich wollte nur kurz Hallo sagen.', 'Etwas freundlicher! Zum Beispiel: „Freut mich, Sie kennenzulernen.“'],
        ['Nein, ich wohne hier schon seit zehn Jahren.', 'Wirklich? Ich habe Sie hier noch nie gesehen!', 'Du bist gerade erst eingezogen – also: „Ja, ich bin neu hier.“']] },
      { t: 'talk', p: 'petrovic', s: 'Haben Sie sich schon beim Bürgeramt angemeldet? Das muss man innerhalb von zwei Wochen machen.', a: 'Noch nicht. Danke für den Tipp, ich buche gleich einen Termin.', n: 'Nach dem Umzug musst du dich innerhalb von zwei Wochen anmelden. Sonst kann es ein Bußgeld geben.', w: [
        ['Nein, das mache ich nächstes Jahr.', 'Nächstes Jahr? Dann kann es ein Bußgeld geben!', 'Die Anmeldung muss innerhalb von zwei Wochen nach dem Einzug passieren.'],
        ['Was ist ein Bürgeramt? Ein Restaurant?', 'Nein! Dort meldet man die Wohnung an und bekommt Ausweise und Pässe.', 'Das Bürgeramt (in manchen Städten: Einwohnermeldeamt) ist für den Wohnsitz und Ausweise zuständig.']] },
      { t: 'read', doc: AMT, q: 'Welches Dokument bekommst du vom Vermieter?', a: 'die Wohnungsgeberbestätigung', w: ['den Pass', 'das Anmeldeformular', 'den Termin'], n: 'Die Wohnungsgeberbestätigung füllt der Vermieter aus. Sie zeigt: Du wohnst wirklich dort.' },
      { t: 'read', doc: AMT, q: 'Was kostet die Anmeldung?', a: 'Sie kostet nichts.', w: ['10 €', '50 €', 'eine Monatsmiete'], n: '„kostenlos“ = es kostet nichts.' },
      { t: 'story', text: 'Dienstag, 9:30 Uhr im Bürgeramt. Du ziehst eine Wartenummer: B 214. Während du wartest, füllst du das Anmeldeformular aus.' },
      { t: 'form', title: 'Anmeldung bei der Meldebehörde', f: [
        ['Familienname', '{nn}', ['{vn}', 'Lindenfeld'], 'Familienname = Nachname. Dein Familienname ist {nn}.'],
        ['Vorname', '{vn}', ['{nn}', 'Gartenstraße'], 'Der Vorname ist {vn}.'],
        ['Geburtsdatum', '{born}', ['01.11.2026', '{ort}'], 'Das Geburtsdatum ist der Tag deiner Geburt – nicht das Datum von heute.'],
        ['Geburtsort', '{ort}', ['Lindenfeld', '{nat}'], 'Geburtsort = die Stadt, in der du geboren bist.'],
        ['Staatsangehörigkeit', '{nat}', ['{ort}', 'deutsch'], 'Bei der Staatsangehörigkeit steht oft ein Adjektiv: syrisch, ukrainisch, türkisch …'],
        ['Neue Wohnung', ADR, ['Gartenstraße 34567, 12 Lindenfeld', '{ort}, {land}'], 'Erst Straße und Hausnummer, dann Postleitzahl und Ort.'],
        ['Tag des Einzugs', '01.11.2026', ['{born}', '31.12.2026'], 'Du bist am 1. November eingezogen.']] },
      { t: 'talk', p: 'schulz', s: 'Guten Morgen. Was kann ich für Sie tun?', a: 'Guten Morgen. Ich möchte meine neue Wohnung anmelden.', n: 'Grüßen und in einem ganzen Satz sagen, was du möchtest.', w: [
        ['Ich möchte einen Pass kaufen.', 'Einen Pass aus Ihrem Heimatland bekommen Sie bei Ihrer Botschaft. Was möchten Sie hier erledigen?', 'Du bist zum Anmelden hier: „Ich möchte meine Wohnung anmelden.“'],
        ['Morgen. Wohnung.', 'Ähm … Sie möchten Ihre Wohnung anmelden?', 'Ein ganzer Satz ist höflicher: „Ich möchte meine neue Wohnung anmelden.“']] },
      { t: 'talk', p: 'schulz', s: 'Gut. Ich brauche Ihren Pass, das Formular und die Wohnungsgeberbestätigung.', a: 'Hier sind meine Unterlagen. Bitte schön.', n: 'Immer alle Unterlagen mitbringen – am besten mit einer Checkliste.', w: [
        ['Hier ist meinen Pass.', 'Danke. Und die anderen Unterlagen?', '„Pass“ ist maskulin, hier im Nominativ: „Hier ist mein Pass.“'],
        ['Die Bestätigung habe ich zu Hause vergessen.', 'Ohne die Bestätigung geht es leider nicht. Schauen Sie doch noch einmal in Ihre Tasche.', 'Ohne Wohnungsgeberbestätigung gibt es keine Anmeldung.']] },
      { t: 'talk', p: 'schulz', s: 'Danke. Wohnen Sie allein in der Wohnung, oder zieht noch jemand mit ein?', a: 'Ich wohne allein.', n: 'Kurz und klar auf die Frage antworten.', w: [
        ['Ich wohne in Lindenfeld.', 'Ja, das sehe ich. Aber wohnen Sie allein?', 'Die Frage ist: allein oder mit anderen Personen? Nicht: wo?'],
        ['Ich bin allein gewohnt.', 'Sie meinen: Sie wohnen allein?', 'Hier passt das Präsens: „Ich wohne allein.“']] },
      { t: 'talk', p: 'schulz', s: 'So, fertig. Hier ist Ihre Meldebescheinigung. Bitte gut aufbewahren, die brauchen Sie oft.', a: 'Vielen Dank! Einen schönen Tag noch.', n: 'Die Meldebescheinigung braucht man z. B. für die Bank, die Krankenkasse oder den Sprachkurs.', w: [
        ['Das brauche ich nicht. Sie können sie behalten.', 'Doch, doch! Die brauchen Sie für die Bank, die Krankenkasse und den Sprachkurs.', 'Die Meldebescheinigung ist wichtig – gut aufheben!']] },
      { t: 'item', icon: '🪪', name: 'Meldebescheinigung', text: 'Du bist offiziell in Lindenfeld angemeldet! In ein paar Wochen kommt auch deine Steuer-Identifikationsnummer per Post.' }
    ] },
    { id: 'arzt', lv: 'A2–B1', icon: '🩺', title: 'Krank – was nun?', sum: 'Brief der Krankenkasse, Termin beim Hausarzt, Apotheke.', steps: [
      { t: 'story', text: 'November in Lindenfeld: Es regnet seit Tagen. Heute Morgen hast du Halsschmerzen, Fieber und Kopfschmerzen. Zum Glück kam gestern ein Brief von deiner Krankenkasse.' },
      { t: 'read', doc: { title: 'Gesund+ Krankenkasse', lines: ['Guten Tag {vn} {nn},', 'anbei erhalten Sie Ihre elektronische Gesundheitskarte.', 'Bitte unterschreiben Sie die Karte auf der Rückseite.', 'Zeigen Sie die Karte bei jedem Arztbesuch vor.'] }, q: 'Was musst du mit der Karte machen?', a: 'auf der Rückseite unterschreiben', w: ['an die Krankenkasse zurückschicken', 'beim Bürgeramt abgeben', 'jeden Monat bezahlen'], n: 'Karte unterschreiben und zu jedem Arztbesuch mitnehmen.' },
      { t: 'talk', p: 'haas', s: 'Hausarztpraxis Dr. Neumann, Haas am Apparat.', a: 'Guten Morgen, ich bin krank und brauche heute einen Termin.', n: 'Grüßen und sofort sagen, warum du anrufst.', w: [
        ['Guten Morgen, ich möchte eine Pizza bestellen.', 'Hier ist eine Arztpraxis! Was kann ich für Sie tun?', 'Sag, warum du anrufst: „Ich bin krank und brauche einen Termin.“'],
        ['Morgen. Termin. Schnell!', 'Bitte etwas freundlicher. Möchten Sie einen Termin?', 'Am Telefon: grüßen und einen ganzen Satz sagen.']] },
      { t: 'talk', p: 'haas', s: 'Welche Beschwerden haben Sie denn?', a: 'Ich habe Fieber, Halsschmerzen und Kopfschmerzen.', n: 'Beschwerden mit „haben“: Ich habe Fieber, Husten, Schnupfen …', w: [
        ['Ich bin Fieber und Halsschmerzen.', 'Sie meinen, Sie haben Fieber?', 'Mit „haben“: „Ich habe Fieber.“'],
        ['Mir geht es gut, danke.', 'Warum brauchen Sie dann einen Termin?', 'Bei „Beschwerden“ sagst du, was dir wehtut oder fehlt.']] },
      { t: 'talk', p: 'haas', s: 'Kommen Sie bitte um 11 Uhr. Und bringen Sie Ihre Gesundheitskarte mit.', a: 'Gut, ich komme um 11 Uhr. Danke schön!', n: 'Uhrzeit wiederholen – so gibt es kein Missverständnis.', w: [
        ['Welche Karte? Meine Bankkarte?', 'Nein, die Karte von Ihrer Krankenkasse.', 'Die Gesundheitskarte (Versichertenkarte) kommt von der Krankenkasse.']] },
      { t: 'talk', p: 'neumann', s: 'Guten Tag. Was fehlt Ihnen denn?', a: 'Seit gestern habe ich hohes Fieber und mein Hals tut sehr weh.', n: 'Sagen, seit wann und was genau wehtut.', w: [
        ['Mir fehlt nichts, ich habe alles.', '„Was fehlt Ihnen?“ heißt: Welche Beschwerden haben Sie?', '„Was fehlt Ihnen?“ fragt nach deiner Krankheit.'],
        ['Seit gestern ich habe hohes Fieber.', 'Seit gestern haben Sie Fieber, verstehe. Und was noch?', 'Nach „Seit gestern“ kommt das Verb auf Position 2: „Seit gestern habe ich …“']] },
      { t: 'talk', p: 'neumann', s: 'Sie haben eine starke Erkältung. Nehmen Sie dreimal täglich eine Tablette, immer nach dem Essen.', a: 'Also dreimal am Tag nach dem Essen. Verstanden.', n: 'Wiederholen, was der Arzt sagt – so merkst du es dir besser.', w: [
        ['Also dreimal pro Woche vor dem Essen?', 'Nein, nein: dreimal täglich, nach dem Essen.', '„täglich“ = jeden Tag; „nach dem Essen“ = wenn du gegessen hast.']] },
      { t: 'talk', p: 'neumann', s: 'Bleiben Sie ein paar Tage zu Hause und trinken Sie viel Tee. Gute Besserung!', a: 'Danke schön, Herr Doktor. Auf Wiedersehen!', n: 'Auf „Gute Besserung!“ antwortest du einfach mit „Danke“.', w: [
        ['Danke, gleichfalls!', 'Ha, danke! Aber ich bin doch nicht krank.', '„Gleichfalls“ sagt man z. B. bei „Schönes Wochenende!“ – nicht bei „Gute Besserung!“.']] },
      { t: 'order', q: 'In der Apotheke: Sag höflich, was du möchtest.', a: ['Ich', 'hätte', 'gern', 'dieses', 'Medikament.'], n: 'Höflich bitten mit „Ich hätte gern …“.' },
      { t: 'read', doc: { title: 'Packungsbeilage · Dosierung', lines: ['Erwachsene: 3 × täglich 1 Tablette.', 'Nach den Mahlzeiten mit Wasser einnehmen.', 'Ohne ärztlichen Rat nicht länger als 5 Tage einnehmen.', 'Für Kinder unzugänglich aufbewahren.'] }, q: 'Wie lange darfst du die Tabletten ohne Arzt höchstens nehmen?', a: '5 Tage', w: ['3 Tage', '1 Tag', 'so lange ich will'], n: '„Nicht länger als 5 Tage ohne ärztlichen Rat“ – danach wieder zum Arzt.' },
      { t: 'item', icon: '💳', name: 'Gesundheitskarte', text: 'Gute Besserung! Deine Gesundheitskarte ist unterschrieben und liegt jetzt in deinem Ordner.' }
    ] },
    { id: 'kurs', lv: 'B1', icon: '📚', title: 'Der Integrationskurs', sum: 'Brief verstehen, bei der Sprachschule anmelden, Kurs-E-Mail lesen.', steps: [
      { t: 'story', text: 'Du bist wieder gesund – und möchtest jetzt richtig gut Deutsch lernen. In der Post liegt ein wichtiger Brief: Du darfst einen Integrationskurs besuchen.' },
      { t: 'read', doc: { title: 'Bestätigung · Teilnahme am Integrationskurs', lines: ['Sie sind berechtigt, an einem Integrationskurs teilzunehmen.', 'Bitte melden Sie sich bald bei einem Kursträger in Ihrer Nähe an.', 'Bringen Sie diese Bestätigung zur Anmeldung mit.'] }, q: 'Was musst du jetzt tun?', a: 'mich bei einem Kursträger anmelden', w: ['ein Jahr warten', 'den Brief zurückschicken', 'zum Bürgeramt gehen'], n: 'Der Kursträger ist die Sprachschule. Dort meldest du dich mit dem Brief an.' },
      { t: 'talk', p: 'brandt', s: 'Sprachschule Wort für Wort, Brandt. Guten Tag!', a: 'Guten Tag! Ich möchte mich für einen Integrationskurs anmelden.', n: 'Genau sagen, welchen Kurs du möchtest.', w: [
        ['Guten Tag! Ich möchte Englisch lernen.', 'Englisch? Wir haben nur Deutschkurse. Was möchten Sie denn?', 'Du möchtest den Integrationskurs – also Deutsch.'],
        ['Hallo, ich will Kurs.', 'Einen Kurs? Was für einen Kurs möchten Sie denn?', 'Ganzer Satz und genau sagen, welcher Kurs: „Ich möchte mich für einen Integrationskurs anmelden.“']] },
      { t: 'talk', p: 'brandt', s: 'Sehr gern. Zuerst machen Sie bei uns einen Einstufungstest. Dann wissen wir, welcher Kurs für Sie passt.', a: 'Einverstanden. Wann kann ich den Test machen?', n: 'Der Einstufungstest zeigt nur, welches Niveau passt – keine Angst!', w: [
        ['Ich brauche keinen Test, ich kann schon alles.', 'Der Test ist für alle. Er ist ganz kurz. Wann haben Sie Zeit?', 'Den Einstufungstest machen alle. Er entscheidet, in welchem Kurs du beginnst.']] },
      { t: 'talk', p: 'brandt', s: 'Möchten Sie lieber einen Kurs am Vormittag oder am Abend?', a: 'Lieber am Vormittag, weil ich nachmittags arbeiten möchte.', n: 'Nach „weil“ steht das konjugierte Verb am Ende.', w: [
        ['Lieber am Vormittag, weil ich möchte nachmittags arbeiten.', 'Am Vormittag, gut. Und warum? Das habe ich nicht ganz verstanden.', 'Nach „weil“ steht das Verb am Ende: „…, weil ich nachmittags arbeiten möchte.“'],
        ['Ja.', 'Ja … was denn? Vormittag oder Abend?', 'Bei einer Oder-Frage wählst du eine Möglichkeit.']] },
      { t: 'form', title: 'Anmeldung · Sprachschule Wort für Wort', f: [
        ['Name, Vorname', '{nn}, {vn}', ['{vn}, {ort}', 'Wort für Wort'], 'Erst der Familienname, dann der Vorname.'],
        ['Anschrift', ADR, ['Sprachschule Wort für Wort', '{ort}, {land}'], 'Deine Adresse in Lindenfeld.'],
        ['Muttersprache', '{lang}', ['Deutsch', '{land}'], 'Muttersprache = die Sprache, die du als Kind gelernt hast.'],
        ['Kurszeit', 'Vormittag', ['Abend', 'Wochenende'], 'Du hast „lieber am Vormittag“ gesagt.']] },
      { t: 'order', q: 'Herr Brandt sagt dir den Kursbeginn. Bilde den Satz.', a: ['Der Kurs', 'beginnt', 'am Montag', 'um 8:30 Uhr.'], alt: ['Am Montag beginnt der Kurs um 8:30 Uhr.'], n: 'Das Verb „beginnt“ steht auf Position 2.' },
      { t: 'read', doc: { title: 'E-Mail · Ihr Integrationskurs', lines: ['Guten Tag {vn} {nn},', 'Ihr Kurs beginnt am Montag, 7. Dezember, um 8:30 Uhr in Raum 3.', 'Bitte bringen Sie einen Stift, ein Heft und Ihre Bestätigung mit.', 'Wenn Sie krank sind, melden Sie sich bitte vor Kursbeginn ab.', 'Viele Grüße, Thomas Brandt'] }, q: 'Was machst du, wenn du krank bist?', a: 'mich vor Kursbeginn abmelden', w: ['einfach nicht kommen', 'nächsten Monat eine E-Mail schreiben', 'einen neuen Kurs suchen'], n: '„Wenn Sie krank sind, melden Sie sich bitte vor Kursbeginn ab.“ Also anrufen oder schreiben, bevor der Kurs beginnt.' },
      { t: 'item', icon: '🎓', name: 'Kursanmeldung', text: 'Montag, 8:30 Uhr, Raum 3: Neben dir sitzt … Frau Petrović, deine Nachbarin! Ein neues Kapitel in Lindenfeld beginnt.' }
    ] },
    { id: 'arbeit', lv: 'B1–B2', icon: '💼', title: 'Arbeit suchen', sum: 'Stellenanzeige verstehen, Bewerbung beginnen, Vorstellungsgespräch.', steps: [
      { t: 'story', text: 'Dein Deutsch wird jeden Tag besser. Jetzt möchtest du arbeiten. Auf der Website der Stadtwerke Lindenfeld findest du eine interessante Stellenanzeige.' },
      { t: 'read', doc: { title: 'Stellenanzeige · Stadtwerke Lindenfeld', lines: ['Wir suchen ab sofort eine Mitarbeiterin / einen Mitarbeiter (m/w/d) im Kundenservice – Teilzeit, 25 Std./Woche.', 'Ihre Aufgaben: Beratung von Kundinnen und Kunden am Telefon und per E-Mail.', 'Ihr Profil: Deutsch mindestens B1, freundliches Auftreten, Teamfähigkeit.', 'Wir bieten: unbefristeten Vertrag, flexible Arbeitszeiten, Jobticket.'] }, q: 'Was bedeutet „unbefristeter Vertrag“?', a: 'Der Vertrag hat kein Enddatum.', w: ['Der Vertrag gilt nur ein Jahr.', 'Man arbeitet ohne Vertrag.', 'Der Vertrag gilt nur für Teilzeit.'], n: 'unbefristet = ohne Ende; befristet = nur bis zu einem bestimmten Datum.' },
      { t: 'read', doc: { title: 'Stellenanzeige · Stadtwerke Lindenfeld', lines: ['Wir suchen ab sofort eine Mitarbeiterin / einen Mitarbeiter (m/w/d) im Kundenservice – Teilzeit, 25 Std./Woche.', 'Ihre Aufgaben: Beratung von Kundinnen und Kunden am Telefon und per E-Mail.', 'Ihr Profil: Deutsch mindestens B1, freundliches Auftreten, Teamfähigkeit.', 'Wir bieten: unbefristeten Vertrag, flexible Arbeitszeiten, Jobticket.'] }, q: 'Was steht NICHT in der Anzeige?', a: 'Man braucht einen Führerschein.', w: ['Die Stelle ist in Teilzeit.', 'Man braucht Deutsch auf B1-Niveau.', 'Es gibt ein Jobticket.'], n: 'Ein Führerschein wird nicht verlangt. Anzeigen genau lesen – Prüfungen fragen oft genau so.' },
      { t: 'order', q: 'Der erste Satz für dein Anschreiben:', a: ['Hiermit', 'bewerbe ich mich', 'um die Stelle', 'im Kundenservice.'], n: '„sich bewerben um“ + Akkusativ. Nach „Hiermit“ kommt das Verb: „Hiermit bewerbe ich mich …“' },
      { t: 'talk', p: 'lange', s: 'Guten Tag, schön, dass Sie da sind. Erzählen Sie doch bitte kurz etwas über sich.', a: 'Gern. Ich komme aus {aus}, lebe seit einem Jahr in Lindenfeld und habe schon Erfahrung im Kundenkontakt.', n: 'Herkunft, aktuelle Situation, passende Erfahrung – kurz und positiv.', w: [
        ['Ich bin {vn}. Ich habe keine Arbeit und brauche Geld.', 'Verstehe. Und was qualifiziert Sie für diese Stelle?', 'Im Vorstellungsgespräch stellst du deine Erfahrung und Stärken vor – sachlich und positiv.'],
        ['Das steht doch alles in meinem Lebenslauf.', 'Das stimmt, aber ich möchte es gern von Ihnen hören.', 'Auch wenn es im Lebenslauf steht: Erzähl es kurz und freundlich.']] },
      { t: 'talk', p: 'lange', s: 'Was sind Ihre Stärken?', a: 'Ich bin geduldig und zuverlässig, und ich arbeite gern im Team.', n: 'Konkrete Stärken nennen, die zur Stelle passen.', w: [
        ['Ich habe keine Schwächen, ich bin perfekt.', 'Interessant. Können Sie ein konkretes Beispiel nennen?', 'Bleib bescheiden und nenne konkrete Stärken.'],
        ['Ich bin geduldig, zuverlässig und arbeiten gern im Team.', 'Sie arbeiten gern im Team, verstehe.', '„ich arbeite“ – das Verb muss zum Subjekt „ich“ passen.']] },
      { t: 'talk', p: 'lange', s: 'Und warum möchten Sie gerade bei uns arbeiten?', a: 'Mir gefällt, dass Ihnen guter Service wichtig ist, und ich möchte mich beruflich weiterentwickeln.', n: 'Zeig, dass du dich für die Firma interessierst.', w: [
        ['Weil ich irgendeinen Job brauche.', 'Das ist ehrlich. Aber was interessiert Sie an unserer Firma?', 'Zeig Interesse an der Firma, nicht nur am Geld.'],
        ['Weil Sie mich bestimmt nehmen wollen.', 'Das entscheiden wir noch.', 'Zu selbstsicher. Nenne Gründe, die zur Firma passen.']] },
      { t: 'talk', p: 'lange', s: 'Haben Sie noch Fragen an uns?', a: 'Ja: Wie sieht die Einarbeitung in den ersten Wochen aus?', n: 'Eine eigene Frage zeigt Interesse – z. B. zur Einarbeitung, zum Team oder zu den Aufgaben.', w: [
        ['Nein, keine.', 'Gut, dann melden wir uns bei Ihnen.', 'Stell immer eine Frage – das zeigt echtes Interesse.'],
        ['Wie viele Urlaubstage habe ich im ersten Monat?', 'Darüber sprechen wir später beim Vertrag.', 'Fragen zu Urlaub und Gehalt lieber nicht als erste Frage.']] },
      { t: 'read', doc: { title: 'E-Mail · Ihre Bewerbung', lines: ['Guten Tag {vn} {nn},', 'vielen Dank für das angenehme Gespräch. Wir freuen uns, Ihnen die Stelle anbieten zu können.', 'Bitte teilen Sie uns bis Freitag mit, ob Sie das Angebot annehmen.', 'Ihr Arbeitsbeginn wäre der 1. März.'] }, q: 'Was sollst du bis Freitag tun?', a: 'mitteilen, ob ich die Stelle annehme', w: ['am 1. März anfangen', 'eine neue Bewerbung schicken', 'ein zweites Gespräch führen'], n: '„Bitte teilen Sie uns bis Freitag mit, ob …“ – du sollst antworten.' },
      { t: 'item', icon: '📝', name: 'Arbeitsvertrag', text: 'Herzlichen Glückwunsch! Du hast deinen ersten Job in Deutschland – ab 1. März im Kundenservice der Stadtwerke.' }
    ] },
    { id: 'nebenkosten', lv: 'B2', icon: '🧾', title: 'Ärger mit der Abrechnung', sum: 'Nebenkostenabrechnung prüfen, formell widersprechen, verhandeln.', steps: [
      { t: 'story', text: 'Über ein Jahr wohnst du jetzt in der Gartenstraße. Heute liegt ein dicker Brief von Herrn Wagner im Briefkasten: die Nebenkostenabrechnung. Du sollst 420 € nachzahlen!' },
      { t: 'read', doc: { title: 'Nebenkostenabrechnung 2027 · Gartenstraße 12, 3. OG', lines: ['Ihr Anteil an den Gesamtkosten: 2.340 €', 'Ihre Vorauszahlungen: 12 × 160 € = 1.920 €', 'Nachzahlung: 420 €, fällig innerhalb von 30 Tagen', 'Darin enthalten: Gartenpflege, anteilig 170 €'] }, q: 'Warum musst du nachzahlen?', a: 'Die Kosten waren höher als die Vorauszahlungen.', w: ['Ich habe die Miete nicht bezahlt.', 'Die Kaution wird erhöht.', 'Der Vermieter verlangt eine Strafe.'], n: '2.340 € Kosten minus 1.920 € Vorauszahlungen = 420 € Nachzahlung.' },
      { t: 'story', text: 'Du vergleichst die Abrechnung mit deinem Mietvertrag. Dort steht: „Den Garten nutzt ausschließlich die Wohnung im Erdgeschoss. Sie trägt die Kosten der Gartenpflege allein.“' },
      { t: 'read', q: 'Welcher Posten der Abrechnung ist wahrscheinlich falsch?', a: 'die Kosten für die Gartenpflege', w: ['die Vorauszahlungen', 'die Frist von 30 Tagen', 'die Gesamtsumme der Vorauszahlungen'], n: 'Laut Mietvertrag zahlt nur die Erdgeschosswohnung die Gartenpflege. Diesen Posten kannst du beanstanden.' },
      { t: 'order', q: 'Beginne deinen Brief an Herrn Wagner formell:', a: ['Hiermit', 'erhebe ich', 'Einwände gegen', 'die Nebenkostenabrechnung.'], n: 'Formell: „Hiermit erhebe ich Einwände gegen …“ – nach „Hiermit“ steht das Verb auf Position 2.' },
      { t: 'read', q: 'Welche Formulierung ist Nominalstil?', a: 'nach Prüfung der Abrechnung', w: ['nachdem ich die Abrechnung geprüft habe', 'als ich die Abrechnung prüfte', 'ich habe die Abrechnung geprüft'], n: 'Nominalstil macht aus dem Verb ein Nomen: prüfen → die Prüfung. Typisch für Briefe an Firmen und Ämter.' },
      { t: 'read', q: 'Welcher Satz passt am besten in deinen formellen Brief?', a: 'Ich bitte Sie, die Kosten für die Gartenpflege aus der Abrechnung zu streichen.', w: ['Nimm die Gartenkosten raus, das ist unfair!', 'Ich will nicht zahlen, weil der Garten mir egal ist.', 'Könnten Sie vielleicht eventuell mal schauen, ob das so stimmt?'], n: 'Sachlich, höflich und konkret: „Ich bitte Sie, … zu …“' },
      { t: 'talk', p: 'wagner', s: 'Wagner hier. Ich habe Ihren Brief bekommen. Aber die Gartenpflege zahlen doch alle Mieter, das war schon immer so.', a: 'Das verstehe ich. Laut Mietvertrag trägt diese Kosten aber allein die Wohnung im Erdgeschoss.', n: 'Erst Verständnis zeigen, dann mit dem Vertrag argumentieren.', w: [
        ['Das ist mir egal, ich zahle das nicht!', 'Na, so geht das aber nicht. Haben Sie denn einen Grund?', 'Sachlich bleiben. Ein Argument überzeugt mehr als Ärger.'],
        ['Sie haben recht, entschuldigen Sie die Störung.', 'Ach so? Dann ist ja alles in Ordnung … oder?', 'Du hast ein gutes Argument – gib nicht sofort nach!']] },
      { t: 'talk', p: 'wagner', s: 'Hm, da haben Sie recht. Ich korrigiere die Abrechnung. Dann zahlen Sie nur noch zweihundertfünfzig Euro nach.', a: 'Vielen Dank. Würden Sie mir die korrigierte Abrechnung bitte schriftlich schicken?', n: 'Wichtige Absprachen immer schriftlich bestätigen lassen.', w: [
        ['Super, dann zahle ich gar nichts!', 'Doch, die anderen Kosten sind ja korrekt.', 'Nur der falsche Posten fällt weg – den Rest musst du zahlen.']] },
      { t: 'item', icon: '✅', name: 'Korrigierte Abrechnung', text: 'Mit deinem sachlichen Brief hast du 170 € gespart. Stark – das war B2-Niveau!' }
    ] },
    { id: 'widerspruch', lv: 'C1', icon: '⚖️', title: 'Der Widerspruch', sum: 'Behördenbescheid verstehen, Widerspruch formulieren, Telefonat mit dem Amt.', steps: [
      { t: 'story', text: 'Du hast Wohngeld beantragt, einen Zuschuss zur Miete. Jetzt kommt der Bescheid: abgelehnt! Angeblich fehlten Unterlagen. Dabei hast du alles rechtzeitig abgegeben – du hast sogar eine Eingangsbestätigung.' },
      { t: 'read', doc: { title: 'Bescheid · Wohngeldstelle Lindenfeld', lines: ['Ihr Antrag vom 12.04. wird abgelehnt, da die angeforderten Einkommensnachweise nicht fristgerecht vorgelegt wurden.', 'Rechtsbehelfsbelehrung: Gegen diesen Bescheid kann innerhalb eines Monats nach Bekanntgabe Widerspruch erhoben werden.', 'Der Widerspruch ist schriftlich oder zur Niederschrift bei der Wohngeldstelle einzulegen.'] }, q: 'Was bedeutet „nicht fristgerecht vorgelegt“?', a: 'Die Unterlagen kamen nicht innerhalb der Frist an.', w: ['Die Unterlagen waren gefälscht.', 'Die Unterlagen waren schlecht übersetzt.', 'Die Unterlagen wurden zu früh abgegeben.'], n: 'fristgerecht = rechtzeitig, innerhalb der Frist.' },
      { t: 'read', doc: { title: 'Bescheid · Wohngeldstelle Lindenfeld', lines: ['Rechtsbehelfsbelehrung: Gegen diesen Bescheid kann innerhalb eines Monats nach Bekanntgabe Widerspruch erhoben werden.', 'Der Widerspruch ist schriftlich oder zur Niederschrift bei der Wohngeldstelle einzulegen.'] }, q: 'Was heißt „zur Niederschrift“?', a: 'Man geht persönlich hin, und die Behörde schreibt den Widerspruch auf.', w: ['Man muss den Widerspruch mit der Hand schreiben.', 'Man schickt eine Sprachnachricht.', 'Man muss einen Anwalt beauftragen.'], n: '„Zur Niederschrift“: Du sprichst bei der Behörde vor, und dein Widerspruch wird dort protokolliert. Die Frist (ein Monat) gilt trotzdem!' },
      { t: 'order', q: 'Formuliere den ersten Satz deines Widerspruchs:', a: ['Hiermit', 'lege ich', 'gegen den Bescheid', 'vom 2. Mai', 'Widerspruch ein.'], n: 'Die feste Formel: „Hiermit lege ich gegen den Bescheid vom … Widerspruch ein.“ Das trennbare Verb „einlegen“ bildet eine Satzklammer.' },
      { t: 'read', q: 'Welche Begründung ist am überzeugendsten?', a: 'Die Nachweise habe ich am 20. April fristgerecht eingereicht; eine Kopie der Eingangsbestätigung liegt bei.', w: ['Ich finde die Entscheidung ungerecht und bitte um Verständnis.', 'Ihre Behörde verliert ständig Unterlagen, das weiß jeder.', 'Ich habe alles abgegeben, glauben Sie mir bitte.'], n: 'Eine starke Begründung nennt Fakten (Datum) und Belege (Eingangsbestätigung) – ohne Vorwürfe.' },
      { t: 'read', q: 'Wie formulierst du deinen Antrag am Ende des Widerspruchs?', a: 'Ich beantrage, den Bescheid aufzuheben und meinem Antrag stattzugeben.', w: ['Heben Sie den Bescheid sofort auf!', 'Den Bescheid aufheben, bitte.', 'Kann man da vielleicht noch was machen?'], n: 'Typisch für Widersprüche: „Ich beantrage, … aufzuheben und … stattzugeben.“ (Infinitiv mit zu, Fachsprache).' },
      { t: 'talk', p: 'kraus', s: 'Kraus, Wohngeldstelle. Ich rufe wegen Ihres Widerspruchs an. Ihre Unterlagen wurden tatsächlich falsch zugeordnet. Das bedauern wir.', a: 'Danke für Ihren Anruf. Darf ich davon ausgehen, dass mein Antrag nun erneut geprüft wird?', n: 'Höflich bleiben und sich das weitere Vorgehen bestätigen lassen.', w: [
        ['Na endlich! Das hätten Sie auch gleich merken können.', 'Ich verstehe Ihren Ärger. Wir kümmern uns jetzt darum.', 'Auch wenn du recht hast: Vorwürfe helfen nicht weiter.'],
        ['Kein Problem, dann ziehe ich meinen Widerspruch einfach zurück.', 'Moment, das ist gar nicht nötig. Wir möchten Ihrem Widerspruch abhelfen.', 'Den Widerspruch nicht zurückziehen – die Behörde will dir ja recht geben.']] },
      { t: 'talk', p: 'kraus', s: 'Ja. Wir helfen Ihrem Widerspruch ab und bewilligen das Wohngeld rückwirkend ab April.', a: 'Das freut mich sehr. Vielen Dank für die schnelle Bearbeitung.', n: '„Einem Widerspruch abhelfen“ heißt: Die Behörde gibt dir recht.', w: [
        ['Abhelfen? Das klingt nicht gut. Muss ich jetzt klagen?', 'Nein, im Gegenteil: Wir geben Ihnen recht.', '„Einem Widerspruch abhelfen“ heißt: Die Behörde gibt dir recht.'],
        ['Rückwirkend? Also bekomme ich erst nächstes Jahr Geld?', 'Nein, rückwirkend heißt: auch für die Monate seit April.', 'rückwirkend = auch für die Zeit in der Vergangenheit.']] },
      { t: 'item', icon: '⚖️', name: 'Abhilfebescheid', text: 'Du hast dich erfolgreich gegen einen falschen Bescheid gewehrt – auf C1-Niveau. Lindenfeld ist jetzt wirklich dein Zuhause.' }
    ] }
  ];
  const SOON = [['🏦', 'Ein Konto eröffnen'], ['👨‍👩‍👧', 'Kita und Schule']];

  const get = () => { try { return JSON.parse(localStorage.getItem(KEY) || '{}'); } catch { return {}; } };
  const put = s => { try { localStorage.setItem(KEY, JSON.stringify(s)); } catch {} };
  const ini = n => n.replace(/^(Herr|Frau|Dr\.)\s+/, '').slice(0, 2).toUpperCase();
  const stars = n => '⭐'.repeat(n) + '☆'.repeat(3 - n);
  const maxOf = ch => ch.steps.reduce((m, s) => m + (s.t === 'form' ? s.f.length : /talk|read|order/.test(s.t) ? 1 : 0), 0);

  DMGame.register({
    id: ID, title: 'Neu in Deutschland', icon: '🧳', level: 'A1–C1', cat: 'abenteuer', againLabel: 'Zu den Kapiteln',
    desc: 'Eine Geschichte in 8 Kapiteln – vom ersten „Guten Tag“ bis zum Widerspruch beim Amt. Du entscheidest, was du sagst.',
    intro: 'Du ziehst neu in die Stadt Lindenfeld. Kapitel für Kapitel erlebst du echte Situationen: Du telefonierst, liest Briefe, füllst Formulare aus und sammelst wichtige Dokumente in deinem Ordner. Die Geschichte wächst mit deinem Deutsch: Kapitel 1 ist A1, das letzte Kapitel C1. Anfänger beginnen vorn, Fortgeschrittene springen direkt zu ihrem Niveau.',
    tts: () => CH.flatMap(c => c.steps.filter(s => s.t === 'talk').flatMap(s => [s.s, ...s.w.map(w => w[1])].map(text => ({ text, voice: P[s.p].voice })))),
    start(api) {
      if (!document.getElementById('sp-nid-css')) document.head.insertAdjacentHTML('beforeend', `<style id="sp-nid-css">${CSS}</style>`);
      const e = api.esc, el = api.el, top = () => window.scrollTo({ top: 0, behavior: 'instant' });
      el.closest('.sp-play')?.classList.add('sp-nid');
      const hudBar = el.closest('.sp-play')?.querySelector('.sp-hud');
      const showHud = on => { if (hudBar) hudBar.style.display = on ? '' : 'none'; };
      let st = get(), fig = FIG.find(f => f.id === st.c);
      const fill = s => String(s).replace(/\{(\w+)\}/g, (m, k) => fig?.[k] ?? m);
      const opts = list => `<div class="ch-opts">${list.map((t, i) => `<button type="button" class="ch-opt" data-k="${i}"><kbd>${i + 1}</kbd><span>${e(fill(t))}</span></button>`).join('')}</div>`;
      const doc = d => `<div class="sp-nid-doc"><h3>${e(fill(d.title))}</h3>${d.lines.map(l => `<p>${e(fill(l))}</p>`).join('')}</div>`;

      function choose() {
        showHud(false); top();
        el.innerHTML = `<p class="sp-nid-q">Wer bist du in dieser Geschichte?</p>
          <div class="sp-nid-who">${FIG.map((f, i) => `<button type="button" class="sp-nid-ch" data-i="${i}"><span class="sp-nid-ic" aria-hidden="true">${f.face}</span><span><b>${e(f.vn)}</b><em>aus ${e(f.aus)}</em></span></button>`).join('')}</div>`;
        el.querySelectorAll('.sp-nid-ch').forEach(b => { b.onclick = () => { fig = FIG[+b.dataset.i]; st = { ...get(), c: fig.id }; put(st); map(); }; });
      }

      function map() {
        showHud(false); top(); api.clearFeedback();
        const done = st.done || {}, items = CH.filter(c => done[c.id]);
        const next = CH.findIndex(c => !done[c.id]);
        el.innerHTML = `<div class="sp-nid-me"><span class="sp-nid-face" aria-hidden="true">${fig.face}</span><div><b>${e(fig.vn)} ${e(fig.nn)}</b><small>aus ${e(fig.aus)} · neu in Lindenfeld</small></div></div>
          <div class="sp-nid-bag"><b>📁 Dein Ordner:</b> ${items.length ? items.map(c => { const it = c.steps[c.steps.length - 1]; return `<span>${it.icon} ${e(it.name)}</span>`; }).join('') : 'noch leer – sammle wichtige Dokumente!'}</div>
          <h2 class="sp-nid-h">Kapitel</h2><p class="sp-nid-tip">Neu beim Deutschlernen? Starte mit Kapitel 1. Schon fortgeschritten? Spring direkt zu deinem Niveau.</p>
          <div class="sp-nid-map">${CH.map((c, i) => {
            return `<button type="button" class="sp-nid-ch${i === next ? ' is-next' : ''}" data-i="${i}"><span class="sp-nid-ic" aria-hidden="true">${c.icon}</span><span><small>Kapitel ${i + 1} · ${c.lv}</small><b>${e(c.title)}</b><em>${e(c.sum)}</em></span><span class="sp-nid-st" aria-label="${done[c.id] ? done[c.id] + ' von 3 Sternen' : 'noch nicht gespielt'}">${done[c.id] ? stars(done[c.id]) : '▶'}</span></button>`;
          }).join('')}${SOON.map(([ic, t], i) => `<div class="sp-nid-ch" aria-disabled="true" style="opacity:.55;cursor:default"><span class="sp-nid-ic" aria-hidden="true">${ic}</span><span><small>Kapitel ${CH.length + i + 1} · bald</small><b>${e(t)}</b></span></div>`).join('')}</div>
          <p class="sp-nid-tip" style="margin-top:14px"><button type="button" class="dm-btn dm-btn-quiet" id="sp-nid-fig">👤 Andere Figur wählen</button></p>`;
        el.querySelector('#sp-nid-fig').onclick = choose;
        el.querySelectorAll('button.sp-nid-ch').forEach(b => { b.onclick = () => play(CH[+b.dataset.i]); });
      }

      function play(ch) {
        let i = -1, score = 0;
        const max = maxOf(ch), wrong = [], N = ch.steps.length;
        showHud(true);
        const step = () => {
          i++; api.clearFeedback(); top();
          api.hud({ step: `${i + 1}/${N}`, progress: i / N, score });
          const s = ch.steps[i], kick = `<p class="sp-nid-kick">${ch.icon} Kapitel ${CH.indexOf(ch) + 1}: ${e(ch.title)}</p>`;
          ({ story, talk, read, form, order, item })[s.t](s, kick);
        };
        const point = () => { score++; api.hud({ score }); };
        const miss = (correct, tip) => wrong.push({ correct: fill(correct), tip: fill(tip || '') });

        function story(s, kick) {
          el.innerHTML = `${kick}<div class="sp-nid-story"><span aria-hidden="true">📖</span><p>${e(fill(s.text))}</p></div>`;
          api.next('Weiter', step);
        }

        function talk(s, kick) {
          const p = P[s.p], list = api.shuffle([s.a, ...s.w.map(w => w[0])]);
          let first = true;
          el.innerHTML = `${kick}<div class="sp-nid-npc"><span class="sp-nid-av" style="background:${p.color}" aria-hidden="true">${e(ini(p.name))}</span><div><b>${e(p.name)}</b><small>${e(p.role)}</small></div></div>
            <div class="sp-nid-bubble"><p></p><button type="button" class="sp-nid-say" aria-label="Noch einmal anhören">🔊</button></div>
            <p class="ch-label">Deine Antwort:</p>${opts(list)}`;
          const bub = el.querySelector('.sp-nid-bubble'), say = t => { bub.querySelector('p').textContent = t; bub.querySelector('button').dataset.line = t; api.speak(t); };
          bub.querySelector('button').onclick = ev => api.speak(ev.currentTarget.dataset.line);
          say(s.s);
          el.querySelectorAll('.ch-opt').forEach((b, k) => {
            b.onclick = () => {
              const t = list[k], w = s.w.find(x => x[0] === t);
              if (w) {
                b.classList.add('is-wrong'); b.disabled = true;
                if (first) miss(s.a, w[2]); first = false;
                bub.classList.add('is-react'); say(w[1]);
                api.feedback(false, `${e(fill(w[2]))}<br><small>Versuch es noch einmal.</small>`);
                return;
              }
              b.classList.add('is-right'); el.querySelectorAll('.ch-opt').forEach(x => { x.disabled = true; });
              if (first) point();
              api.feedback(true, `${first ? '✓ Genau so! ' : ''}${e(fill(s.n || ''))}`);
              api.next('Weiter', step);
            };
          });
        }

        function read(s, kick) {
          const list = api.shuffle([s.a, ...s.w]);
          el.innerHTML = `${kick}${s.doc ? doc(s.doc) : ''}<p class="sp-nid-q">${e(fill(s.q))}</p>${opts(list)}`;
          el.querySelectorAll('.ch-opt').forEach((b, k) => {
            b.onclick = () => {
              const ok = list[k] === s.a;
              el.querySelectorAll('.ch-opt').forEach((x, j) => { x.disabled = true; if (list[j] === s.a) x.classList.add('is-right'); });
              if (ok) point(); else { b.classList.add('is-wrong'); miss(s.a, s.n); }
              api.feedback(ok, `${ok ? '✓ Richtig! ' : `Richtig ist: <b>${e(fill(s.a))}</b>. `}${e(fill(s.n))}`);
              api.next('Weiter', step);
            };
          });
        }

        function form(s, kick) {
          let f = 0;
          el.innerHTML = `${kick}<div class="sp-nid-doc"><h3>📝 ${e(s.title)}</h3><dl class="sp-nid-form">${s.f.map(x => `<dt>${e(x[0])}</dt><dd>……</dd>`).join('')}</dl></div><p class="sp-nid-q"></p><div class="sp-nid-fo"></div>`;
          const dds = el.querySelectorAll('.sp-nid-form dd'), q = el.querySelector('.sp-nid-q'), box = el.querySelector('.sp-nid-fo');
          const field = () => {
            const [label, a, w] = s.f[f], list = api.shuffle([a, ...w].map(fill));
            dds[f].classList.add('is-cur'); dds[f].textContent = '?';
            q.textContent = `Was schreibst du bei „${label}“?`;
            box.innerHTML = opts(list);
            if (f) box.lastElementChild.lastElementChild.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
            box.querySelectorAll('.ch-opt').forEach((b, k) => {
              b.onclick = () => {
                const [, a2, , tip] = s.f[f], ok = list[k] === fill(a2);
                dds[f].className = ok ? 'is-ok' : 'is-bad'; dds[f].textContent = (ok ? '✓ ' : '✗ → ') + fill(a2);
                if (ok) point(); else miss(`${label}: ${a2}`, tip);
                f++;
                const end = f === s.f.length;
                if (ok && !end) { api.clearFeedback(); field(); return; }
                box.querySelectorAll('.ch-opt').forEach(x => { x.disabled = true; if (list[[...box.querySelectorAll('.ch-opt')].indexOf(x)] === fill(a2)) x.classList.add('is-right'); });
                if (!ok) b.classList.add('is-wrong');
                api.feedback(ok, ok ? '✓ Das Formular ist vollständig ausgefüllt.' : `${e(fill(tip))}`);
                api.next('Weiter', end ? step : () => { api.clearFeedback(); field(); });
              };
            });
          };
          field();
        }

        function order(s, kick) {
          const words = s.a.map(fill), target = words.join(' ');
          let pool = api.shuffle(words.map((w, k) => ({ w, k })));
          if (pool.every((x, k) => x.k === k)) pool = [...pool.slice(1), pool[0]];
          const built = [];
          el.innerHTML = `${kick}<p class="sp-nid-q">${e(fill(s.q))}</p><p class="ch-label">Tippe die Wörter in der richtigen Reihenfolge an:</p><div class="ch-built" aria-live="polite"></div><div class="ch-pool"></div>`;
          const bEl = el.querySelector('.ch-built'), pEl = el.querySelector('.ch-pool');
          const draw = () => {
            bEl.innerHTML = built.map((x, k) => `<button type="button" class="ch-chip is-placed" data-b="${k}">${e(x.w)}</button>`).join('');
            pEl.innerHTML = pool.map((x, k) => `<button type="button" class="ch-chip" data-p="${k}">${e(x.w)}</button>`).join('');
            bEl.querySelectorAll('button').forEach(b => { b.onclick = () => { pool.push(...built.splice(+b.dataset.b, 1)); draw(); }; });
            pEl.querySelectorAll('button').forEach(b => { b.onclick = () => { built.push(...pool.splice(+b.dataset.p, 1)); draw(); if (!pool.length) check(); }; });
          };
          const check = () => {
            const said = built.map(x => x.w).join(' '), ok = said === target || (s.alt || []).includes(said);
            bEl.classList.add(ok ? 'is-right' : 'is-wrong'); bEl.querySelectorAll('button').forEach(b => { b.disabled = true; });
            if (ok) point(); else miss(target, s.n);
            api.feedback(ok, `${ok ? '✓ Perfekt! ' : `Richtig ist: <b>${e(target)}</b><br>`}${e(s.n)}`);
            api.next('Weiter', step);
          };
          draw();
        }

        function item(s, kick) {
          api.hud({ progress: 1 });
          el.innerHTML = `${kick}<div class="sp-nid-item"><div class="sp-nid-big" aria-hidden="true">${s.icon}</div><h3>Neu in deinem Ordner: ${e(s.name)}</h3><p>${e(fill(s.text))}</p></div>`;
          api.next('Kapitel abschließen', () => {
            const pct = max ? score / max : 1, n = pct >= 0.9 ? 3 : pct >= 0.6 ? 2 : 1;
            st = get(); st.done = { ...(st.done || {}), [ch.id]: Math.max(n, st.done?.[ch.id] || 0) }; put(st);
            api.finish({ score, max, wrong });
          });
        }

        step();
      }

      fig ? map() : choose();
    }
  });
})();
