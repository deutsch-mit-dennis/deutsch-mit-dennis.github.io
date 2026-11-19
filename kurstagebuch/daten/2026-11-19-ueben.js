// Exercises for lesson 1 (2026-11-19, "Sich vorstellen"). Format: see ../SCHEMA.md
// All names in the examples are invented.
window.KT_UEBEN = {
  date: '2026-11-19',
  title: 'Übungen: Sich vorstellen',
  sets: [
    {
      id: 'gruss', icon: '👋', title: 'Hallo und Tschüss', type: 'choice',
      items: [
        { q: 'Es ist 8 Uhr am Morgen. Sie sagen:', options: ['Guten Abend!', 'Guten Morgen!', 'Gute Nacht!'], answer: 1,
          why: 'Am Morgen sagt man „Guten Morgen!“.' },
        { q: 'Es ist 14 Uhr. Sie sagen:', options: ['Guten Tag!', 'Guten Morgen!', 'Guten Abend!'], answer: 0,
          why: 'Am Tag sagt man „Guten Tag!“.' },
        { q: 'Es ist 19 Uhr. Sie kommen in den Kurs. Sie sagen:', options: ['Gute Nacht!', 'Guten Morgen!', 'Guten Abend!'], answer: 2,
          why: 'Am Abend sagt man „Guten Abend!“. „Gute Nacht!“ sagt man vor dem Schlafen.' },
        { q: 'Sie gehen nach Hause. Sie sagen zu Ihrem Freund Ali:', options: ['Hallo!', 'Tschüss!', 'Guten Tag!'], answer: 1,
          why: '„Tschüss!“ sagt man am Ende, bei Freunden und Familie (du).' },
        { q: 'Sie gehen aus der Arztpraxis. Sie sagen zur Ärztin:', options: ['Auf Wiedersehen!', 'Tschüss!', 'Hallo!'], answer: 0,
          why: '„Auf Wiedersehen!“ ist formell (Sie). „Tschüss!“ ist informell (du).' },
        { q: '„Wie geht es Ihnen?“ – Ihre Antwort:', options: ['Danke, gut. Und dir?', 'Ich heiße Mira.', 'Danke, gut. Und Ihnen?'], answer: 2,
          why: 'Die Frage ist mit „Ihnen“ (Sie). Darum fragt man zurück: „Und Ihnen?“' },
        { q: '„Wie geht’s?“ – Ihre Antwort:', options: ['Mir geht’s gut, danke. Und dir?', 'Ich komme aus Syrien.', 'Gute Nacht!'], answer: 0,
          why: '„Wie geht’s?“ ist kurz für „Wie geht es dir?“. Antwort: „Mir geht’s gut.“' },
        { q: 'Sie möchten höflich etwas haben. Welches Wort passt?', options: ['Tschüss', 'bitte', 'Hallo'], answer: 1,
          why: 'Mit „bitte“ fragt man höflich. Danach sagt man „danke“.' }
      ]
    },
    {
      id: 'du-sie', icon: '🤝', title: 'du oder Sie?', type: 'choice',
      items: [
        { q: 'Sie sprechen mit Ihrer Lehrerin, Frau Ammann:', options: ['Wie heißt du?', 'Wie heißen Sie?', 'Wie heiße ich?'], answer: 1,
          why: 'Erwachsene, die man nicht gut kennt: Sie.' },
        { q: 'Sie sprechen mit einem Kind (6 Jahre):', options: ['Woher kommst du?', 'Woher kommen Sie?', 'Woher komme ich?'], answer: 0,
          why: 'Kinder, Freunde und Familie: du.' },
        { q: 'Im Amt fragt ein Mitarbeiter:', options: ['Was bist du von Beruf?', 'Was ist du von Beruf?', 'Was sind Sie von Beruf?'], answer: 2,
          why: 'Im Amt spricht man formell: Sie. Sie + sind.' },
        { q: 'In der Pause fragt Olena ihre Freundin:', options: ['Wie geht’s?', 'Wie geht es Ihnen?', 'Wie geht es dir, Frau Weber?'], answer: 0,
          why: 'Freunde sagen du. „Wie geht’s?“ ist kurz und informell. Mit „Frau + Nachname“ sagt man Sie.' },
        { q: 'Welche Frage ist formell (Sie)?', options: ['Hast du Kinder?', 'Hat du Kinder?', 'Haben Sie Kinder?'], answer: 2,
          why: 'Formell: Haben Sie …? Informell: Hast du …?' },
        { q: 'Sie treffen Ihren Nachbarn, Herrn Weber. Sie kennen ihn nicht gut:', options: ['Hallo! Wie geht’s dir?', 'Guten Tag, Herr Weber! Wie geht es Ihnen?', 'Tschüss, Herr Weber!'], answer: 1,
          why: 'Mit „Herr“ oder „Frau“ + Nachname sagt man Sie: „Wie geht es Ihnen?“' }
      ]
    },
    {
      id: 'frage-antwort', icon: '❓', title: 'Frage und Antwort', type: 'match',
      items: [
        { pairs: [
          ['Wie heißen Sie?', 'Ich heiße Mira Ammann.'],
          ['Woher kommen Sie?', 'Ich komme aus der Ukraine.'],
          ['Wo wohnen Sie?', 'Ich wohne in Essen.'],
          ['Was sind Sie von Beruf?', 'Ich bin Lehrerin.'],
          ['Wie lange lernen Sie Deutsch?', 'Seit zwei Monaten.'],
          ['Haben Sie Kinder?', 'Ja, ich habe einen Sohn.'],
          ['Was machen Sie gern in Ihrer Freizeit?', 'Ich lese gern.']
        ] }
      ]
    },
    {
      id: 'verben', icon: '✏️', title: 'Verb-Endungen', type: 'gap',
      items: [
        { text: 'Ich heiß___ Mira.', options: ['e', 't', 'en'], answer: 0,
          why: 'ich → Endung -e: ich heiße.' },
        { text: 'Wie heiß___ du?', options: ['st', 't', 'e'], answer: 1,
          why: 'du heißt – nur -t, weil ß schon wie s klingt.' },
        { text: 'Woher komm___ du?', options: ['t', 'en', 'st'], answer: 2,
          why: 'du → Endung -st: du kommst.' },
        { text: 'Woher komm___ Sie?', options: ['en', 'st', 'e'], answer: 0,
          why: 'Sie → Endung -en: Sie kommen.' },
        { text: 'Ich wohn___ in Essen.', options: ['st', 'e', 't'], answer: 1,
          why: 'ich → Endung -e: ich wohne.' },
        { text: 'Ich ___ Koch von Beruf.', options: ['bin', 'bist', 'sind'], answer: 0,
          why: 'sein: ich bin, du bist, Sie sind.' },
        { text: 'Was ___ du von Beruf?', options: ['bin', 'sind', 'bist'], answer: 2,
          why: 'sein: du bist.' },
        { text: 'Was ___ Sie von Beruf?', options: ['bist', 'sind', 'bin'], answer: 1,
          why: 'sein: Sie sind.' },
        { text: 'Ich ___ zwei Kinder.', options: ['habe', 'hast', 'haben'], answer: 0,
          why: 'haben: ich habe, du hast, Sie haben.' },
        { text: '___ du Geschwister?', options: ['Habe', 'Hast', 'Haben'], answer: 1,
          why: 'haben: du hast.' },
        { text: '___ Sie Kinder?', options: ['Hast', 'Habe', 'Haben'], answer: 2,
          why: 'haben: Sie haben.' }
      ]
    },
    {
      id: 'land', icon: '🌍', title: 'aus … / geboren in …', type: 'gap',
      items: [
        { text: 'Ich komme aus ___ Ukraine.', options: ['der', 'dem', 'das'], answer: 0,
          why: 'die Ukraine → aus der Ukraine.' },
        { text: 'Ich komme aus ___ Irak.', options: ['der', 'dem', 'den'], answer: 1,
          why: 'der Irak → aus dem Irak.' },
        { text: 'Ali kommt ___ Syrien.', options: ['aus der', 'aus dem', 'aus'], answer: 2,
          why: 'Syrien hat keinen Artikel → aus Syrien.' },
        { text: 'Bat kommt aus ___ Mongolei.', options: ['dem', 'der', 'die'], answer: 1,
          why: 'die Mongolei → aus der Mongolei.' },
        { text: 'Ich bin ___ Iran geboren.', options: ['im', 'am', 'in der'], answer: 0,
          why: 'der Iran → in + dem = im Iran.' },
        { text: 'Olena ist ___ der Ukraine geboren.', options: ['im', 'aus', 'in'], answer: 2,
          why: 'geboren in …: in der Ukraine.' },
        { text: 'Ardit ist ___ Albanien geboren.', options: ['in der', 'in', 'im'], answer: 1,
          why: 'Albanien hat keinen Artikel → in Albanien.' }
      ]
    },
    {
      id: 'seit', icon: '⏳', title: 'seit + -n', type: 'gap',
      items: [
        { text: 'Ich lerne seit zwei ___ Deutsch.', options: ['Monate', 'Monaten', 'Monat'], answer: 1,
          why: 'Plural nach „seit“: + -n → seit zwei Monaten.' },
        { text: 'Ich lerne seit drei ___ Deutsch.', options: ['Tagen', 'Tage', 'Tag'], answer: 0,
          why: 'der Tag – die Tage → seit drei Tagen.' },
        { text: 'Ich lerne seit vier ___ Deutsch.', options: ['Woche', 'Wochenen', 'Wochen'], answer: 2,
          why: 'die Woche – die Wochen: hat schon -n, also nichts dazu.' },
        { text: 'Ich wohne seit zwei ___ in Essen.', options: ['Jahre', 'Jahr', 'Jahren'], answer: 2,
          why: 'das Jahr – die Jahre → seit zwei Jahren.' },
        { text: 'Ich lerne seit einer ___ Deutsch.', options: ['Woche', 'Wochen', 'Wochenen'], answer: 0,
          why: 'Singular: seit einer Woche – kein -n.' },
        { text: 'Ich lerne seit einem ___ Deutsch.', options: ['Monaten', 'Monat', 'Monate'], answer: 1,
          why: 'Singular: seit einem Monat – kein -n.' },
        { text: 'Ich wohne seit einem ___ in Essen.', options: ['Jahr', 'Jahren', 'Jahre'], answer: 0,
          why: 'Singular: seit einem Jahr – kein -n.' }
      ]
    },
    {
      id: 'sprachen', icon: '💬', title: 'Sprachen und Familienstand', type: 'gap',
      items: [
        { text: '___ Sprachen sprechen Sie?', options: ['Wie', 'Welche', 'Woher'], answer: 1,
          why: 'Welche Sprachen …? – mehrere Sprachen.' },
        { text: 'Ich komme aus der Türkei. Meine Muttersprache ist ___.', options: ['Türkei', 'türkisch', 'Türkisch'], answer: 2,
          why: 'Sprachen schreibt man groß: Türkisch.' },
        { text: 'Du ___ Arabisch.', options: ['sprechst', 'sprichst', 'spreche'], answer: 1,
          why: 'sprechen: du sprichst (e → i).' },
        { text: 'Mira ___ Ukrainisch und Russisch.', options: ['spricht', 'sprecht', 'sprichst'], answer: 0,
          why: 'er/sie: spricht (e → i).' },
        { text: 'Ich habe eine Frau. Ich bin ___.', options: ['ledig', 'verheiratet', 'Einzelkind'], answer: 1,
          why: 'Mann oder Frau = verheiratet.' }
      ]
    },
    {
      id: 'satzbau', icon: '🧩', title: 'Satzbau: Verb auf Platz 2', type: 'order',
      items: [
        { chunks: ['Ich', 'heiße', 'Mira Ammann.'],
          why: 'Das Verb (heiße) steht auf Platz 2.' },
        { chunks: ['Ich', 'komme', 'aus der Ukraine.'],
          why: 'Das Verb (komme) steht auf Platz 2.' },
        { chunks: ['Woher', 'kommst', 'du?'],
          why: 'W-Frage: W-Wort auf Platz 1, Verb auf Platz 2.' },
        { chunks: ['Was', 'sind', 'Sie', 'von Beruf?'],
          why: 'W-Frage: Was (Platz 1), sind (Platz 2).' },
        { chunks: ['Seit zwei Monaten', 'lerne', 'ich', 'Deutsch.'],
          why: 'Platz 1 ist „Seit zwei Monaten“. Das Verb bleibt auf Platz 2, dann kommt „ich“.' },
        { chunks: ['Ich', 'habe', 'zwei Kinder.'],
          why: 'Das Verb (habe) steht auf Platz 2.' },
        { chunks: ['Am Wochenende', 'koche', 'ich', 'gern.'],
          why: 'Platz 1 ist „Am Wochenende“. Das Verb (koche) steht auf Platz 2.' },
        { chunks: ['Haben', 'Sie', 'Kinder?'],
          why: 'Ja/Nein-Frage: Verb auf Platz 1.' },
        { chunks: ['Ich', 'habe', '10 Jahre als Koch', 'gearbeitet.'],
          why: 'haben auf Platz 2, gearbeitet am Ende.' }
      ]
    },
    {
      id: 'berufe', icon: '👩‍⚕️', title: 'Berufe: Mann → Frau', type: 'choice',
      items: [
        { q: 'Er ist Arzt. Sie ist …', options: ['Arztin', 'Ärztin', 'Ärzterin'], answer: 1,
          why: 'a wird ä, dazu -in: die Ärztin.' },
        { q: 'Er ist Koch. Sie ist …', options: ['Köchin', 'Kochin', 'Köcherin'], answer: 0,
          why: 'o wird ö, dazu -in: die Köchin.' },
        { q: 'Er ist Kaufmann. Sie ist …', options: ['Kaufmannin', 'Kaufmännin', 'Kauffrau'], answer: 2,
          why: '-mann wird -frau: die Kauffrau.' },
        { q: 'Er ist Bauer. Sie ist …', options: ['Bäuerin', 'Bauerin', 'Bauerfrau'], answer: 0,
          why: 'au wird äu, dazu -in: die Bäuerin.' },
        { q: 'Er ist Lehrer. Sie ist …', options: ['Lehrin', 'Lehrerin', 'Lehrerfrau'], answer: 1,
          why: 'Lehrer + -in = Lehrerin.' },
        { q: 'Er ist Verkäufer. Sie ist …', options: ['Verkäuferfrau', 'Verkaufin', 'Verkäuferin'], answer: 2,
          why: 'Verkäufer + -in = Verkäuferin.' },
        { q: 'Er ist Ingenieur. Sie ist …', options: ['Ingenieurin', 'Ingenieurfrau', 'Ingenieuse'], answer: 0,
          why: 'Ingenieur + -in = Ingenieurin.' },
        { q: 'Sie sagen Ihren Beruf. Welcher Satz ist richtig?', options: ['Ich bin eine Lehrerin.', 'Ich bin Lehrerin.', 'Ich bin als Lehrerin.'], answer: 1,
          why: 'Beim Beruf: kein Artikel. „als“ nur mit arbeiten: Ich arbeite als Lehrerin.' }
      ]
    },
    {
      id: 'familie', icon: '👨‍👩‍👧', title: 'Familie', type: 'choice',
      items: [
        { q: 'der Bruder – zwei …', options: ['Bruders', 'Brüder', 'Brudern'], answer: 1,
          why: 'Plural: die Brüder (u wird ü).' },
        { q: 'die Schwester – zwei …', options: ['Schwestern', 'Schwesters', 'Schwester'], answer: 0,
          why: 'Plural: die Schwestern (+ -n).' },
        { q: 'der Sohn – zwei …', options: ['Sohne', 'Sohns', 'Söhne'], answer: 2,
          why: 'Plural: die Söhne (o wird ö, + -e).' },
        { q: 'die Tochter – zwei …', options: ['Tochters', 'Töchter', 'Töchtern'], answer: 1,
          why: 'Plural: die Töchter (o wird ö).' },
        { q: 'das Kind – zwei …', options: ['Kinder', 'Kinds', 'Kindern'], answer: 0,
          why: 'Plural: die Kinder (+ -er).' },
        { q: 'Ich habe … Sohn.', options: ['ein', 'eine', 'einen'], answer: 2,
          why: 'der Sohn → Ich habe einen Sohn.' },
        { q: 'Ich habe … Tochter.', options: ['eine', 'einen', 'ein'], answer: 0,
          why: 'die Tochter → Ich habe eine Tochter.' },
        { q: 'Ich habe … Kind.', options: ['einen', 'ein', 'eine'], answer: 1,
          why: 'das Kind → Ich habe ein Kind.' },
        { q: 'Ich habe keine Geschwister. Ich bin …', options: ['Bruder', 'Geschwister', 'Einzelkind'], answer: 2,
          why: 'Keine Brüder und keine Schwestern = Einzelkind.' },
        { q: 'Meine Tochter hat drei Kinder. Das sind meine …', options: ['Enkel', 'Enkeln', 'Enkels'], answer: 0,
          why: 'der Enkel – die Enkel (ohne -n). Man sagt auch: Enkelkinder.' }
      ]
    },
    {
      id: 'freizeit', icon: '⚽', title: 'Freizeit', type: 'gap',
      items: [
        { text: 'Ich lese ___.', options: ['mag', 'gern', 'mögen'], answer: 1,
          why: 'Verb + gern: Ich lese gern.' },
        { text: 'Ich ___ Musik.', options: ['mag', 'gern', 'mögen'], answer: 0,
          why: 'mögen + Nomen: Ich mag Musik. (mögen ≈ gern haben)' },
        { text: 'Was ___ du gern am Wochenende?', options: ['magst', 'machst', 'macht'], answer: 1,
          why: 'machen + gern: Was machst du gern? (du → -st)' },
        { text: 'Ich ___ gern Kuchen.', options: ['koche', 'lese', 'backe'], answer: 2,
          why: 'Kuchen, Brot, Kekse, Torte → backen.' },
        { text: 'Ich ___ gern Suppe.', options: ['koche', 'backe', 'lese'], answer: 0,
          why: 'Suppe, Reis, Kartoffeln → kochen.' },
        { text: 'Ich bleibe mit meinen Kindern ___.', options: ['nach Hause', 'zu Hause', 'bei Hause'], answer: 1,
          why: 'Wo? → zu Hause.' },
        { text: 'Nach dem Kurs gehe ich ___.', options: ['nach Hause', 'zu Hause', 'in Hause'], answer: 0,
          why: 'Wohin? → nach Hause.' },
        { text: 'Mein Hobby ___ Lesen.', options: ['sind', 'bin', 'ist'], answer: 2,
          why: 'Ein Hobby (Singular) → ist.' },
        { text: 'Meine Hobbys ___ Kochen und Wandern.', options: ['sind', 'ist', 'bin'], answer: 0,
          why: 'Viele Hobbys (Plural) → sind.' }
      ]
    },
    {
      id: 'buchstabieren', icon: '🔤', title: 'Buchstabieren', type: 'choice',
      items: [
        { q: 'H wie …', options: ['Apfel', 'Esel', 'Hand'], answer: 2,
          why: 'Hand beginnt mit H.' },
        { q: 'B – R – O – T. Das Wort ist:', options: ['Boot', 'Brot', 'Brett'], answer: 1,
          why: 'B – R – O – T = Brot.' },
        { q: 'A – Doppel-M – A – Doppel-N. Der Name ist:', options: ['Ammann', 'Amman', 'Aman'], answer: 0,
          why: 'Doppel-M = zweimal M, Doppel-N = zweimal N → Ammann.' },
        { q: 'E – I – S. Das Wort ist:', options: ['Ei', 'Ice', 'Eis'], answer: 2,
          why: 'Deutsch: Eis. „ei“ spricht man wie [ai].' },
        { q: 'Wie spricht man den Buchstaben V?', options: ['„we“', '„fau“', '„wi“'], answer: 1,
          why: 'V heißt „fau“ – wie in Vater.' },
        { q: 'Wie spricht man den Buchstaben W?', options: ['„we“', '„fau“', '„dabbelju“'], answer: 0,
          why: 'W heißt „we“ – wie in Wasser.' },
        { q: 'Wie spricht man den Buchstaben J?', options: ['„dschei“', '„ji“', '„jot“'], answer: 2,
          why: 'J heißt „jot“ – wie in Jahr.' },
        { q: 'Wie spricht man den Buchstaben Z?', options: ['„sett“ – mit s', '„zett“ – mit ts', '„zi“'], answer: 1,
          why: 'Z heißt „zett“ und klingt wie ts – wie in Zahl.' },
        { q: 'Sie wissen nicht, wie man ein Wort schreibt. Sie fragen:', options: ['Wie schreibt man das?', 'Wie heißt du?', 'Wie geht’s?'], answer: 0,
          why: 'Mit „Wie schreibt man das?“ fragt man nach den Buchstaben.' }
      ]
    },
    {
      id: 'zahlen', icon: '🔢', title: 'Zahlen 0–10', type: 'match',
      items: [
        { pairs: [
          ['0', 'null'],
          ['2', 'zwei'],
          ['3', 'drei'],
          ['6', 'sechs'],
          ['7', 'sieben'],
          ['8', 'acht'],
          ['10', 'zehn']
        ] }
      ]
    },
    {
      id: 'anweisungen', icon: '📋', title: 'Arbeitsanweisungen', type: 'match',
      items: [
        { pairs: [
          ['✍️', 'schreiben'],
          ['👂', 'hören'],
          ['📖', 'lesen'],
          ['☑️', 'ankreuzen'],
          ['🖍️', 'markieren'],
          ['🔢', 'zählen'],
          ['🗣️', 'sprechen']
        ] }
      ]
    },
    {
      id: 'steckbrief', icon: '🪪', title: 'Mein Steckbrief', type: 'steckbrief',
      items: [
        {
          fields: [
            { key: 'vorname', label: 'Vorname', placeholder: 'Mira' },
            { key: 'nachname', label: 'Nachname', placeholder: 'Ammann' },
            { key: 'land', label: 'Land (Ich komme aus …) – mit der/dem, wenn nötig', placeholder: 'der Ukraine / Syrien / dem Irak' },
            { key: 'stadt', label: 'Stadt (Ich wohne in …)', placeholder: 'Essen' },
            { key: 'beruf', label: 'Beruf (ohne Artikel)', placeholder: 'Lehrerin' },
            { key: 'sprache', label: 'Muttersprache', placeholder: 'Ukrainisch' },
            { key: 'seit', label: 'Ich lerne Deutsch seit …', placeholder: 'zwei Monaten' },
            { key: 'familie', label: 'Familie (Ich habe …)', placeholder: 'zwei Kinder' },
            { key: 'hobby', label: 'Hobby (Mein Hobby ist …)', placeholder: 'Lesen' }
          ],
          template: 'Hallo! Ich heiße {vorname} {nachname}. Ich komme aus {land}. Ich wohne in {stadt}. Ich bin {beruf} von Beruf. Meine Muttersprache ist {sprache}. Ich lerne seit {seit} Deutsch. Ich habe {familie}. Mein Hobby ist {hobby}.'
        }
      ]
    }
  ]
};
