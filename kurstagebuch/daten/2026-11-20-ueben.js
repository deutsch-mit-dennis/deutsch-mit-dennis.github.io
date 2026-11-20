// Exercises for lesson 2 (2026-11-20). Format: see ../SCHEMA.md
// All names in the examples are invented.
window.KT_UEBEN = {
  date: '2026-11-20',
  title: 'Übungen: Zahlen, Daten und Formulare',
  sets: [
    {
      id: 'mahlzeit', icon: '🍽️', title: 'Mahlzeit und Telefon', type: 'choice',
      items: [
        { q: 'Es ist 12 Uhr. Sie treffen eine Kollegin bei der Arbeit. Sie sagen:', options: ['Gute Nacht!', 'Mahlzeit!', 'Auf Wiederhören!'], answer: 1,
          why: 'Mittags bei der Arbeit sagt man oft „Mahlzeit!“ – wie „Guten Tag!“.' },
        { q: 'Ihr Kollege sagt: „Mahlzeit!“ Ihre Antwort:', options: ['Mahlzeit!', 'Tschüss!', 'Bitte!'], answer: 0,
          why: 'Auf „Mahlzeit!“ antwortet man einfach auch mit „Mahlzeit!“.' },
        { q: 'Sie essen mit Freunden. Vor dem Essen sagen Sie:', options: ['Auf Wiedersehen!', 'Gute Nacht!', 'Guten Appetit!'], answer: 2,
          why: 'Vor dem Essen wünscht man „Guten Appetit!“.' },
        { q: 'Frau Martin sagt: „Guten Appetit!“ Ihre Antwort:', options: ['Danke, dir auch!', 'Danke, Ihnen auch!', 'Danke, gut.'], answer: 1,
          why: 'Frau Martin – das ist Sie. Darum: „Danke, Ihnen auch!“ Mit Freunden: „Danke, dir auch!“' },
        { q: 'Ali sagt: „Guten Appetit!“ Ali ist Ihr Freund. Ihre Antwort:', options: ['Danke, dir auch!', 'Danke, Ihnen auch!', 'Mahlzeit, Frau Martin!'], answer: 0,
          why: 'Ali ist ein Freund – das ist du. Darum: „Danke, dir auch!“' },
        { q: 'Sie telefonieren mit dem Amt. Am Ende sagen Sie:', options: ['Guten Appetit!', 'Auf Wiederhören!', 'Mahlzeit!'], answer: 1,
          why: 'Am Telefon sieht man sich nicht, man hört sich. Darum: „Auf Wiederhören!“ statt „Auf Wiedersehen!“.' },
        { q: 'Sie gehen aus dem Büro von Frau Martin. Sie sagen:', options: ['Auf Wiederhören!', 'Guten Appetit!', 'Auf Wiedersehen!'], answer: 2,
          why: 'Man sieht sich – also „Auf Wiedersehen!“. „Auf Wiederhören!“ sagt man nur am Telefon.' }
      ]
    },
    {
      id: 'formular', icon: '📝', title: 'Formular-Wörter', type: 'match',
      items: [
        { pairs: [
          ['der Familienname', 'der Nachname'],
          ['die Anschrift', 'die Adresse (Straße + Hausnummer)'],
          ['die PLZ', 'die Postleitzahl'],
          ['der Geburtsort', 'die Stadt, wo ich geboren bin'],
          ['der Wohnort', 'die Stadt, wo ich wohne'],
          ['das Heimatland', 'das Land, woher ich komme'],
          ['die Vorwahl', '030 (am Anfang der Telefonnummer)']
        ] }
      ]
    },
    {
      id: 'mein-ihr', icon: '🗂️', title: 'Wie ist …? – mein, Ihr, sein, ihr', type: 'gap',
      items: [
        { text: 'Wie ist Ihre Adresse? = Wie ___ Ihre Adresse?', options: ['wohnt', 'lautet', 'kommt'], answer: 1,
          why: '„Wie ist …?“ = „Wie lautet …?“ – so fragt man im Formular.' },
        { text: 'Ich heiße Ali Demir. ___ Nachname ist Demir.', options: ['Mein', 'Meine', 'Ihre'], answer: 0,
          why: 'der Nachname → mein Nachname (der/das → mein).' },
        { text: 'Guten Tag, Frau Martin! Wie ist ___ Telefonnummer?', options: ['Ihr', 'deine', 'Ihre'], answer: 2,
          why: 'Frau Martin = Sie. die Telefonnummer → Ihre Telefonnummer.' },
        { text: 'Hallo Ali! Wie ist ___ Vorname?', options: ['dein', 'deine', 'Ihr'], answer: 0,
          why: 'Ali ist ein Freund = du. der Vorname → dein Vorname.' },
        { text: 'Das ist Timo. ___ Telefonnummer ist 0174 293.', options: ['Sein', 'Seine', 'Ihr'], answer: 1,
          why: 'Timo = er → sein. die Telefonnummer → seine (die → -e).' },
        { text: 'Das ist Nina. ___ Familienname ist Otto.', options: ['Ihre', 'Sein', 'Ihr'], answer: 2,
          why: 'Nina = sie → ihr. der Familienname → ihr (ohne -e).' },
        { text: 'Das ist Olena. ___ Muttersprache ist Ukrainisch.', options: ['Ihre', 'Seine', 'Ihr'], answer: 0,
          why: 'Olena = sie → ihr. die Muttersprache → ihre.' },
        { text: 'Das ist Ivan. ___ Muttersprache ist Ukrainisch.', options: ['Sein', 'Ihre', 'Seine'], answer: 2,
          why: 'Ivan = er → sein. die Muttersprache → seine.' }
      ]
    },
    {
      id: 'er-sie', icon: '👥', title: 'er, sie oder Sie?', type: 'choice',
      items: [
        { q: 'Das ist Herr Demir. ___ kommt aus der Türkei.', options: ['Sie', 'Er', 'Du'], answer: 1,
          why: 'Herr Demir ist ein Mann → er.' },
        { q: 'Das ist Frau Kovalenko. ___ wohnt in Hamburg.', options: ['Er', 'Du', 'Sie'], answer: 2,
          why: 'Frau Kovalenko ist eine Frau → sie. Am Satzanfang groß: Sie.' },
        { q: 'Guten Tag, Herr Abadi! Woher kommen ___?', options: ['Sie', 'er', 'du'], answer: 0,
          why: 'Man spricht mit Herrn Abadi direkt und höflich → Sie (immer groß).' },
        { q: 'Das ist Arben. ___ lernt Deutsch.', options: ['Er', 'Sie', 'Du'], answer: 0,
          why: 'Arben ist ein Mann → er lernt.' },
        { q: '„Sie wohnt in Köln.“ – Wer ist „Sie“?', options: ['Sie (höflich)', 'eine Frau', 'ein Mann'], answer: 1,
          why: 'Das Verb hat -t: wohnt → sie = eine Frau.' },
        { q: '„Frau Kovalenko, Sie wohnen in Köln?“ – Wer ist „Sie“?', options: ['ein Mann', 'eine andere Frau', 'Frau Kovalenko (höflich)'], answer: 2,
          why: 'Das Verb hat -en: wohnen → höfliche Anrede Sie.' }
      ]
    },
    {
      id: 'verben2', icon: '✏️', title: 'Verben: -t, -en und sein', type: 'gap',
      items: [
        { text: 'Ich wohn___ in der Bergstraße 4.', options: ['e', 't', 'en'], answer: 0,
          why: 'ich → -e: ich wohne.' },
        { text: 'Wo wohn___ du?', options: ['t', 'st', 'e'], answer: 1,
          why: 'du → -st: du wohnst.' },
        { text: 'Herr Wagner komm___ aus Deutschland.', options: ['en', 'e', 't'], answer: 2,
          why: 'Herr Wagner = er → -t: er kommt.' },
        { text: 'Wie heiß___ Sie, bitte?', options: ['en', 't', 'e'], answer: 0,
          why: 'Sie (höflich) → -en: Sie heißen.' },
        { text: 'Elona wohn___ in Stuttgart.', options: ['en', 't', 'st'], answer: 1,
          why: 'Elona = sie → -t: sie wohnt.' },
        { text: 'Wie heiß___ die Frau im Büro?', options: ['st', 'en', 't'], answer: 2,
          why: 'die Frau = sie → -t: sie heißt. Nach ß kommt kein extra s.' },
        { text: 'Hallo! Ich ___ Sara.', options: ['bin', 'ist', 'sind'], answer: 0,
          why: 'sein: ich bin.' },
        { text: 'Mein Familienname ___ Hoxha.', options: ['bin', 'ist', 'sind'], answer: 1,
          why: 'mein Familienname = er → ist.' },
        { text: 'Das ___ Herr Wagner. Er ist mein Lehrer.', options: ['sind', 'bist', 'ist'], answer: 2,
          why: 'sein: er/sie/das ist.' },
        { text: 'Guten Tag! ___ Sie Frau Hoxha?', options: ['Sind', 'Ist', 'Bist'], answer: 0,
          why: 'sein: Sie (höflich) sind.' },
        { text: 'Meine Muttersprachen ___ Arabisch und Kurdisch.', options: ['ist', 'sind', 'bin'], answer: 1,
          why: 'Zwei Sprachen = Plural: Meine Muttersprachen sind … (eine Sprache: Meine Muttersprache ist …).' }
      ]
    },
    {
      id: 'telefon', icon: '📞', title: 'Telefonnummern', type: 'choice',
      items: [
        { q: 'Was bedeutet „dreimal die Eins“?', options: ['13', '111', '31'], answer: 1,
          why: 'dreimal die Eins = 1 – 1 – 1.' },
        { q: 'Was bedeutet „viermal die Vier“?', options: ['44', '16', '4444'], answer: 2,
          why: 'viermal die Vier = 4 – 4 – 4 – 4.' },
        { q: 'Wie sagt man die Nummer 0173 884?', options: ['null – eins – sieben – drei – zweimal die Acht – vier', 'null – eins – sieben – drei – dreimal die Acht – vier', 'null – eins – sieben – drei – acht – vier'], answer: 0,
          why: 'Telefonnummern spricht man Ziffer für Ziffer. 88 = zweimal die Acht.' },
        { q: 'Wie sagt man 00173?', options: ['null – eins – sieben – drei', 'zweimal die Eins – null – sieben – drei', 'zweimal die Null – eins – sieben – drei'], answer: 2,
          why: '00 = zweimal die Null, dann 1 – 7 – 3.' },
        { q: '(0228) 819830 – die Zahl in Klammern ist …', options: ['die Hausnummer', 'die Vorwahl', 'die Postleitzahl'], answer: 1,
          why: 'Die Zahl am Anfang einer Telefonnummer ist die Vorwahl.' },
        { q: 'Nina sagt: „null – eins – sechs – zwei – vier – neun – fünf“. Welche Nummer ist das?', options: ['0162 495', '0162 459', '0126 495'], answer: 0,
          why: '0 – 1 – 6 – 2 – 4 – 9 – 5 = 0162 495.' },
        { q: 'Timo sagt: „null – eins – sieben – vier – zwei – neun – drei“. Welche Nummer ist das?', options: ['0147 293', '0174 239', '0174 293'], answer: 2,
          why: '0 – 1 – 7 – 4 – 2 – 9 – 3 = 0174 293.' }
      ]
    },
    {
      id: 'zahlen2', icon: '🔢', title: 'Zahlen 11–100', type: 'match',
      items: [
        { pairs: [
          ['12', 'zwölf'],
          ['14', 'vierzehn'],
          ['19', 'neunzehn'],
          ['22', 'zweiundzwanzig'],
          ['35', 'fünfunddreißig'],
          ['58', 'achtundfünfzig'],
          ['70', 'siebzig'],
          ['99', 'neunundneunzig']
        ] }
      ]
    },
    {
      id: 'zahlwort', icon: '🔤', title: 'Zahlen schreiben und sprechen', type: 'choice',
      items: [
        { q: 'Wie schreibt man 21?', options: ['ein und zwanzig', 'einundzwanzig', 'zwanzigeins'], answer: 1,
          why: 'Erst die Einer, dann „und“, dann die Zehner – alles in einem Wort: einundzwanzig.' },
        { q: 'Wie schreibt man 16?', options: ['sechzehn', 'sechszehn', 'sechzig'], answer: 0,
          why: '16 = sechzehn – ohne s! (sechzig = 60)' },
        { q: 'Wie schreibt man 60?', options: ['sechszig', 'sechzehn', 'sechzig'], answer: 2,
          why: '60 = sechzig – auch ohne s.' },
        { q: 'Wie schreibt man 17?', options: ['siebenzehn', 'siebzehn', 'siebzig'], answer: 1,
          why: '17 = siebzehn – ohne „en“. (siebzig = 70)' },
        { q: 'Wie schreibt man 30?', options: ['dreißig', 'dreizig', 'dreizehn'], answer: 0,
          why: '30 = dreißig – mit ß, nicht mit z.' },
        { q: 'Wie schreibt man 47?', options: ['vierundsiebzig', 'vierzigsieben', 'siebenundvierzig'], answer: 2,
          why: 'Erst die 7, dann die 40: sieben-und-vierzig.' },
        { q: 'Wie schreibt man 243?', options: ['zweihundertvierunddreißig', 'zweihundertdreiundvierzig', 'zweihundertvierzigdrei'], answer: 1,
          why: '243 = zweihundert + drei-und-vierzig.' },
        { q: 'Wie schreibt man 2363?', options: ['zweitausenddreihundertdreiundsechzig', 'zweitausenddreihundertsechsunddreißig', 'zweitausenddreiundsechzighundert'], answer: 0,
          why: '2363 = zweitausend + dreihundert + drei-und-sechzig.' },
        { q: 'Wie spricht man das „-ig“ in „zwanzig“?', options: ['wie „iks“', 'wie „ich“', 'wie „isch“'], answer: 1,
          why: '-ig am Ende klingt wie „ich“: zwanzig, billig, ledig.' },
        { q: 'Wie spricht man das „-er“ in „Mutter“?', options: ['wie ein kurzes „a“', 'wie „ehr“', 'wie „i“'], answer: 0,
          why: '-er am Ende klingt wie ein kurzes „a“: Mutter, Vater, Bruder.' }
      ]
    },
    {
      id: 'jahre', icon: '📆', title: 'Jahre, Monate, Jahreszeiten', type: 'choice',
      items: [
        { q: 'Wie sagt man das Jahr 1987?', options: ['neunzehnhundertachtundsiebzig', 'neunzehnhundertsiebenundachtzig', 'neunhundertsiebenundachtzig'], answer: 1,
          why: 'Jahre vor 2000: 19 + hundert + 87 → neunzehnhundertsiebenundachtzig.' },
        { q: 'Wie sagt man das Jahr 2026?', options: ['zwanzighundertsechsundzwanzig', 'zweitausendzweiundsechzig', 'zweitausendsechsundzwanzig'], answer: 2,
          why: 'Jahre ab 2000: zweitausend + sechsundzwanzig.' },
        { q: 'Wie sagt man das Jahr 1965?', options: ['neunzehnhundertfünfundsechzig', 'neunzehnhundertsechsundfünfzig', 'neunzehnhundertsechzigfünf'], answer: 0,
          why: '19 + hundert + fünfundsechzig (erst 5, dann 60).' },
        { q: 'Welches Jahr ist „zweitausendsechzehn“?', options: ['2060', '2016', '2006'], answer: 1,
          why: 'zweitausend = 2000, sechzehn = 16 → 2016.' },
        { q: 'Welcher Satz ist richtig?', options: ['Ich bin am 1987 geboren.', 'Ich bin im 1987 geboren.', 'Ich bin 1987 geboren.'], answer: 2,
          why: 'Nur das Jahr: ohne „am“. Mit Datum: Ich bin am 1. Januar 1987 geboren.' },
        { q: 'Welches Wort ist eine Jahreszeit?', options: ['der Montag', 'der Herbst', 'der Mai'], answer: 1,
          why: 'Jahreszeiten: der Frühling, der Sommer, der Herbst, der Winter.' },
        { q: 'Welches Wort ist ein Monat?', options: ['der Februar', 'der Frühling', 'der Dienstag'], answer: 0,
          why: 'Monate: Januar, Februar, März … Frühling ist eine Jahreszeit, Dienstag ein Wochentag.' },
        { q: 'Welches Wort ist ein Wochentag?', options: ['der Sommer', 'der Juli', 'der Freitag'], answer: 2,
          why: 'Wochentage: Montag, Dienstag, … Freitag, Samstag, Sonntag.' },
        { q: 'Heute ist Freitag. Morgen ist …', options: ['Samstag', 'Donnerstag', 'Sonntag'], answer: 0,
          why: 'Nach Freitag kommt Samstag. Donnerstag war gestern.' },
        { q: 'Welche Jahreszeit kommt nach dem Winter?', options: ['der Herbst', 'der Sommer', 'der Frühling'], answer: 2,
          why: 'Winter → Frühling → Sommer → Herbst.' },
        { q: 'Monate, Wochentage und Jahreszeiten haben den Artikel …', options: ['die', 'der', 'das'], answer: 1,
          why: 'Alle sind maskulin: der Januar, der Montag, der Winter.' }
      ]
    },
    {
      id: 'am-im', icon: '🗓️', title: 'am oder im?', type: 'gap',
      items: [
        { text: 'Ich habe ___ Montag eine Prüfung.', options: ['im', 'am', 'in'], answer: 1,
          why: 'Wochentag → am: am Montag.' },
        { text: 'Ich bin ___ Winter geboren.', options: ['im', 'am', 'in'], answer: 0,
          why: 'Jahreszeit → im: im Winter.' },
        { text: 'Ich habe ___ 21.11. einen Termin.', options: ['in', 'im', 'am'], answer: 2,
          why: 'Datum → am: am 21.11.' },
        { text: 'Ich fahre ___ Sommer in den Urlaub.', options: ['am', 'im', 'in'], answer: 1,
          why: 'Jahreszeit → im: im Sommer.' },
        { text: 'Ich habe ___ Dezember die Prüfung.', options: ['im', 'am', 'in'], answer: 0,
          why: 'Monat → im: im Dezember.' },
        { text: 'Ich bin ___ 1. Januar geboren.', options: ['im', 'in', 'am'], answer: 2,
          why: 'Datum → am: am 1. Januar.' },
        { text: 'Der Deutschkurs ist ___ Freitag.', options: ['am', 'im', 'in'], answer: 0,
          why: 'Wochentag → am: am Freitag.' },
        { text: 'Ich bin ___ Albanien geboren.', options: ['am', 'in', 'im'], answer: 1,
          why: 'Land oder Stadt → in: in Albanien, in Berlin.' }
      ]
    },
    {
      id: 'lesen-nina', icon: '📖', title: 'Lesetext: Nina bei der Anmeldung', type: 'choice',
      items: [
        { q: 'Nina wohnt in Bonn.', options: ['richtig', 'falsch'], answer: 1,
          why: 'Falsch: Nina wohnt in Berlin.' },
        { q: 'Nina kommt aus Albanien.', options: ['richtig', 'falsch'], answer: 0,
          why: 'Richtig: „Ich komme aus Albanien.“' },
        { q: 'Die Frau im Büro heißt Frau Martin.', options: ['falsch', 'richtig'], answer: 1,
          why: 'Richtig: Im Büro sitzt Frau Martin.' },
        { q: 'Die Hausnummer von Nina ist neun.', options: ['falsch', 'richtig'], answer: 0,
          why: 'Falsch: Nina wohnt in der Parkstraße 8.' },
        { q: 'Ali kommt aus Syrien.', options: ['richtig', 'falsch'], answer: 0,
          why: 'Richtig: „Ich heiße Ali. Ich komme aus Syrien.“' },
        { q: 'Wie ist der Familienname von Nina?', options: ['Martin', 'Otto', 'Ali'], answer: 1,
          why: '„Mein Familienname ist Otto: O – T – T – O.“' },
        { q: 'Wie ist die Adresse von Nina?', options: ['Waldstraße 6', 'Parkstraße 9', 'Parkstraße 8'], answer: 2,
          why: '„Ich wohne in der Parkstraße 8.“' },
        { q: 'Was sagen Nina und Ali am Ende?', options: ['Tschüss! Bis morgen!', 'Auf Wiederhören!', 'Guten Appetit!'], answer: 0,
          why: 'Sie gehen zusammen nach Hause und sagen: „Tschüss! Bis morgen!“' }
      ]
    },
    {
      id: 'lesen-timo', icon: '🏠', title: 'Lesetext: Timo und die neue Nachbarin', type: 'choice',
      items: [
        { q: 'Timo wohnt in Berlin.', options: ['richtig', 'falsch'], answer: 1,
          why: 'Falsch: Timo wohnt in Bonn, in der Waldstraße 6.' },
        { q: 'Die neue Nachbarin heißt Olena.', options: ['falsch', 'richtig'], answer: 1,
          why: 'Richtig: „Ich heiße Olena: O – L – E – N – A.“' },
        { q: 'Ivan kommt aus der Türkei.', options: ['falsch', 'richtig'], answer: 0,
          why: 'Falsch: „Das ist Ivan. Er kommt aus der Ukraine.“' },
        { q: 'Olena wohnt auch in der Waldstraße 6.', options: ['richtig', 'falsch'], answer: 0,
          why: 'Richtig: „Ich wohne auch hier in der Waldstraße 6, in Wohnung 3.“' },
        { q: 'Timo wohnt in Wohnung zehn.', options: ['richtig', 'falsch'], answer: 1,
          why: 'Falsch: „Ich wohne in Wohnung 2.“' },
        { q: 'Welcher Tag ist heute im Text?', options: ['Montag', 'Sonntag', 'Freitag'], answer: 1,
          why: '„Heute ist Sonntag.“' },
        { q: 'Woher kommt Timo?', options: ['aus Deutschland', 'aus der Ukraine', 'aus Syrien'], answer: 0,
          why: '„Ich heiße Timo. Ich komme aus Deutschland.“' },
        { q: 'Wo wohnt Olena genau?', options: ['Waldstraße 6, Wohnung 2', 'Parkstraße 8, Wohnung 3', 'Waldstraße 6, Wohnung 3'], answer: 2,
          why: '„… in der Waldstraße 6, in Wohnung 3.“ In Wohnung 2 wohnt Timo.' }
      ]
    },
    {
      id: 'satzbau2', icon: '🧩', title: 'Satzbau: Verb auf Platz 2', type: 'order',
      items: [
        { chunks: ['Meine Postleitzahl', 'ist', '53111.'],
          why: 'Aussagesatz: „Meine Postleitzahl“ ist Platz 1, das Verb „ist“ Platz 2.' },
        { chunks: ['Wie', 'lautet', 'Ihre Adresse?'],
          why: 'W-Frage: W-Wort, dann das Verb.' },
        { chunks: ['Mein Bruder', 'heißt', 'Amir.'],
          why: '„Mein Bruder“ ist Platz 1, das Verb „heißt“ Platz 2.' },
        { chunks: ['Woher', 'kommt', 'Frau Kovalenko?'],
          why: 'W-Frage: Woher + Verb + Person.' },
        { chunks: ['Wie', 'ist', 'die Telefonnummer?'],
          why: 'W-Frage: Wie + ist + …' },
        { chunks: ['Ich', 'bin', 'im Winter', 'geboren.'],
          why: '„bin“ auf Platz 2, „geboren“ steht am Ende.' },
        { chunks: ['Am Samstag', 'habe', 'ich', 'einen Termin.'],
          why: '„Am Samstag“ ist Platz 1 – dann kommt das Verb, dann „ich“.' },
        { chunks: ['Seine Muttersprache', 'ist', 'Arabisch.'],
          why: '„Seine Muttersprache“ ist Platz 1, „ist“ Platz 2.' }
      ]
    },
    {
      id: 'partner', icon: '🧑‍🤝‍🧑', title: 'Partner-Interview: Steckbrief', type: 'steckbrief',
      items: [
        {
          fields: [
            { key: 'wer', label: 'Mein Partner / Meine Partnerin', placeholder: 'Meine Partnerin' },
            { key: 'name', label: 'Name', placeholder: 'Lina' },
            { key: 'pron', label: 'Er oder Sie?', placeholder: 'Sie' },
            { key: 'land', label: 'Land (… kommt aus …) – mit der/dem, wenn nötig', placeholder: 'der Ukraine / Syrien' },
            { key: 'stadt', label: 'Wohnort (… wohnt in …)', placeholder: 'Bonn' },
            { key: 'seine', label: 'Seine oder Ihre? (die Muttersprache)', placeholder: 'Ihre' },
            { key: 'sprache', label: 'Muttersprache', placeholder: 'Arabisch' },
            { key: 'beruf', label: 'Beruf (ohne Artikel)', placeholder: 'Lehrerin' },
            { key: 'sein', label: 'Sein oder Ihr? (das Hobby)', placeholder: 'Ihr' },
            { key: 'hobby', label: 'Hobby', placeholder: 'Schwimmen' }
          ],
          template: '{wer} heißt {name}. {pron} kommt aus {land}. {pron} wohnt in {stadt}. {seine} Muttersprache ist {sprache}. {pron} ist {beruf} von Beruf. {sein} Hobby ist {hobby}.'
        }
      ]
    }
  ]
};
