/* Grammar trainer data (route #grammatik, rendered by grammatik.js).
   window.DMGrammatik = [ topic, ... ] in learning order.
   topic: { id, level, title, kurz, kurz_i18n{en,uk,ru,ar,fa,tr,es,it}, tabelle?{head,rows}, beispiele[], fehler[[wrong, right, reason]], items[] }
   *asterisks* mark the key forms (renderer turns them into <mark>).
   items (every item has `why`, difficulty rises within a topic):
     mc    { t:'mc', q, opts[3], a:0, why }        first option is the correct one (renderer shuffles)
     gap   { t:'gap', q, a:[accepted...], why }     a[0] is the spelling shown as solution
     order { t:'order', words[], sol, alt?[], why } chips in solution order (renderer shuffles); alt = other accepted sentences
     fix   { t:'fix', good, bad, why }              pick the correct sentence of two
   After every change run the validator (see final report): ids, 16–20 items, one correct option, why, 8 languages. */
(() => {
  const TOPICS = [];
  const T = t => TOPICS.push(t);
  const mc = (q, opts, why) => ({ t: 'mc', q, opts, a: 0, why });
  const gap = (q, a, why) => ({ t: 'gap', q, a, why });
  const order = (s, why, alt) => { const words = s.split(' | '); const o = { t: 'order', words, sol: words.join(' '), why }; if (alt) o.alt = alt; return o; };
  const fix = (good, bad, why) => ({ t: 'fix', good, bad, why });

/* ===================== A1 ===================== */
T({
  id: "a1-praesens",
  level: "A1",
  title: "Präsens: Verben im Jetzt",
  kurz: "Das Verb bekommt eine Endung: ich lern*e*, du lern*st*, er/sie lern*t*. Manche Verben ändern bei „du“ und „er/sie“ den Vokal: ich spreche – du spr*i*chst, ich fahre – du f*ä*hrst.",
  kurz_i18n: {
    en: "The verb gets an ending: ich lerne, du lernst, er/sie lernt. Some verbs change their vowel with du and er/sie: du sprichst, du fährst.",
    uk: "Дієслово отримує закінчення: ich lerne, du lernst, er/sie lernt. Деякі дієслова змінюють голосну з du та er/sie: du sprichst, du fährst.",
    ru: "Глагол получает окончание: ich lerne, du lernst, er/sie lernt. У некоторых глаголов с du и er/sie меняется гласная: du sprichst, du fährst.",
    ar: "يأخذ الفعل نهاية حسب الشخص: ich lerne, du lernst, er/sie lernt. بعض الأفعال تغيّر حرف العلة مع du و er/sie: du sprichst, du fährst.",
    fa: "فعل برای هر شخص یک پایانه می‌گیرد: ich lerne, du lernst, er/sie lernt. در بعضی فعل‌ها با du و er/sie واکه عوض می‌شود: du sprichst, du fährst.",
    tr: "Fiil kişiye göre bir ek alır: ich lerne, du lernst, er/sie lernt. Bazı fiillerde du ve er/sie ile ünlü değişir: du sprichst, du fährst.",
    es: "El verbo recibe una terminación: ich lerne, du lernst, er/sie lernt. Algunos verbos cambian la vocal con du y er/sie: du sprichst, du fährst.",
    it: "Il verbo prende una desinenza: ich lerne, du lernst, er/sie lernt. Alcuni verbi cambiano la vocale con du e er/sie: du sprichst, du fährst.",
  },
  tabelle: {
    head: ["", "lernen", "sprechen", "fahren"],
    rows: [
      ["ich", "lern*e*", "sprech*e*", "fahr*e*"],
      ["du", "lern*st*", "spr*i*chst", "f*ä*hrst"],
      ["er / sie / es", "lern*t*", "spr*i*cht", "f*ä*hrt"],
      ["wir", "lern*en*", "sprech*en*", "fahr*en*"],
      ["ihr", "lern*t*", "sprech*t*", "fahr*t*"],
      ["sie / Sie", "lern*en*", "sprech*en*", "fahr*en*"],
    ],
  },
  beispiele: [
    "Ich *lerne* Deutsch.",
    "Wo *wohnst* du?",
    "Mein Sohn *geht* in die Kita.",
    "Frau Demir *spricht* Türkisch und Deutsch.",
    "*Fährst* du mit dem Bus?",
    "Wir *arbeiten* am Montag.",
  ],
  fehler: [
    [
      "Ich wohnen in Köln.",
      "Ich wohne in Köln.",
      "Bei „ich“ hat das Verb die Endung -e.",
    ],
    [
      "Du sprechst gut Deutsch.",
      "Du sprichst gut Deutsch.",
      "sprechen: Bei „du“ und „er/sie“ wird e zu i.",
    ],
    [
      "Er arbeit heute.",
      "Er arbeitet heute.",
      "Nach t kommt -et: er arbeitet.",
    ],
  ],
  items: [
    mc(
      "Ich ___ in Hagen.",
      ["wohne", "wohnst", "wohnt"],
      "Bei „ich“ hat das Verb die Endung -e: ich wohne.",
    ),
    mc(
      "Du ___ Deutsch.",
      ["lernst", "lerne", "lernen"],
      "Bei „du“ hat das Verb die Endung -st: du lernst.",
    ),
    mc(
      "Meine Tochter ___ in die Schule.",
      ["geht", "gehe", "gehst"],
      "Meine Tochter = sie. Bei „er/sie“ hat das Verb die Endung -t.",
    ),
    gap(
      "Wir ___ in Deutschland. (wohnen)",
      ["wohnen"],
      "Bei „wir“ hat das Verb die Endung -en: wir wohnen.",
    ),
    fix(
      "Ich komme aus Syrien.",
      "Ich kommen aus Syrien.",
      "Bei „ich“ hat das Verb die Endung -e: ich komme.",
    ),
    order(
      "Mein Mann | arbeitet | in Köln.",
      "Das Verb steht auf Platz 2: Mein Mann arbeitet …",
    ),
    gap(
      "Woher ___ Sie? (kommen)",
      ["kommen"],
      "Bei „Sie“ hat das Verb die Endung -en: Sie kommen.",
    ),
    mc(
      "Er ___ heute bis 16 Uhr.",
      ["arbeitet", "arbeitest", "arbeiten"],
      "Bei „er“ kommt -t. Nach t sagt man -et: er arbeitet.",
    ),
    gap(
      "Ihr ___ sehr schnell. (lernen)",
      ["lernt"],
      "Bei „ihr“ hat das Verb die Endung -t: ihr lernt.",
    ),
    gap(
      "Du ___ sehr gut Deutsch. (sprechen)",
      ["sprichst"],
      "sprechen: Bei „du“ wird e zu i: du sprichst.",
    ),
    mc(
      "Mein Bruder ___ mit dem Bus zur Arbeit.",
      ["fährt", "fahrt", "fährst"],
      "fahren: Bei „er“ wird a zu ä: er fährt.",
    ),
    fix(
      "Fährst du heute zum Arzt?",
      "Fahrst du heute zum Arzt?",
      "fahren: Bei „du“ wird a zu ä: du fährst.",
    ),
    gap(
      "Was ___ du gern? (essen)",
      ["isst"],
      "essen: Bei „du“ wird e zu i: du isst.",
    ),
    mc(
      "Die Lehrerin ___ den Text.",
      ["liest", "lest", "lese"],
      "lesen: Bei „er/sie“ wird e zu ie: sie liest.",
    ),
    order(
      "Wann | fährt | der Bus | nach Bonn?",
      "Zuerst das Fragewort, dann das Verb: Wann fährt …?",
    ),
    gap(
      "Maria ___ ihrer Mutter. (helfen)",
      ["hilft"],
      "helfen: Bei „er/sie“ wird e zu i: sie hilft.",
    ),
    mc(
      "Der Arzt ___ Ihnen ein Rezept.",
      ["gibt", "gebt", "gebe"],
      "geben: Bei „er“ wird e zu i: er gibt.",
    ),
    fix(
      "Nimmst du den Bus oder die Bahn?",
      "Nehmst du den Bus oder die Bahn?",
      "nehmen: Bei „du“ heißt es: du nimmst.",
    ),
  ],
});

T({
  id: "a1-haben-sein",
  level: "A1",
  title: "haben und sein",
  kurz: "„sein“ sagt: Wer oder wie ist jemand? Ich *bin* Ali. Ich *bin* müde. „haben“ sagt: Was hat jemand? Ich *habe* ein Kind. Ich *habe* Zeit.",
  kurz_i18n: {
    en: "“sein” (to be) says who or how someone is: Ich bin Ali. Ich bin müde. “haben” (to have) says what someone has: Ich habe ein Kind. Ich habe Zeit.",
    uk: "«sein» (бути) каже, хто або який хтось є: Ich bin Ali. Ich bin müde. «haben» (мати) каже, що хтось має: Ich habe ein Kind. Ich habe Zeit.",
    ru: "«sein» (быть) говорит, кто или какой человек: Ich bin Ali. Ich bin müde. «haben» (иметь) говорит, что у человека есть: Ich habe ein Kind. Ich habe Zeit.",
    ar: "«sein» (يكون) يقول من هو الشخص أو كيف حاله: Ich bin Ali. Ich bin müde. «haben» (يملك) يقول ماذا عنده: Ich habe ein Kind. Ich habe Zeit.",
    fa: "«sein» (بودن) می‌گوید کسی کیست یا چطور است: Ich bin Ali. Ich bin müde. «haben» (داشتن) می‌گوید کسی چه دارد: Ich habe ein Kind. Ich habe Zeit.",
    tr: "“sein” (olmak) birinin kim ya da nasıl olduğunu söyler: Ich bin Ali. Ich bin müde. “haben” (sahip olmak) birinin neyi olduğunu söyler: Ich habe ein Kind. Ich habe Zeit.",
    es: "«sein» (ser/estar) dice quién o cómo es alguien: Ich bin Ali. Ich bin müde. «haben» (tener) dice qué tiene alguien: Ich habe ein Kind. Ich habe Zeit.",
    it: "«sein» (essere) dice chi o com’è qualcuno: Ich bin Ali. Ich bin müde. «haben» (avere) dice che cosa ha qualcuno: Ich habe ein Kind. Ich habe Zeit.",
  },
  tabelle: {
    head: ["", "sein", "haben"],
    rows: [
      ["ich", "*bin*", "*habe*"],
      ["du", "*bist*", "*hast*"],
      ["er / sie / es", "*ist*", "*hat*"],
      ["wir", "*sind*", "*haben*"],
      ["ihr", "*seid*", "*habt*"],
      ["sie / Sie", "*sind*", "*haben*"],
    ],
  },
  beispiele: [
    "Ich *bin* 30 Jahre alt.",
    "*Hast* du heute Zeit?",
    "Das *ist* meine Frau.",
    "Wir *haben* zwei Kinder.",
    "*Sind* Sie Herr Petrov?",
    "Ich *habe* Hunger.",
  ],
  fehler: [
    [
      "Ich habe 30 Jahre alt.",
      "Ich bin 30 Jahre alt.",
      "Das Alter sagt man immer mit „sein“.",
    ],
    [
      "Ich bin Hunger.",
      "Ich habe Hunger.",
      "Hunger, Durst, Zeit, Angst: immer mit „haben“.",
    ],
    ["Ihr seit müde.", "Ihr seid müde.", "„ihr seid“ schreibt man mit d."],
  ],
  items: [
    mc(
      "Ich ___ Samira.",
      ["bin", "bist", "ist"],
      "Bei „ich“ heißt es: ich bin.",
    ),
    mc(
      "Wir ___ zwei Kinder.",
      ["haben", "hat", "habt"],
      "Bei „wir“ heißt es: wir haben.",
    ),
    mc(
      "Das ___ mein Mann.",
      ["ist", "hat", "bin"],
      "Wer ist das? → sein. Bei „das“ heißt es: das ist.",
    ),
    gap("___ du Zeit? (haben)", ["Hast"], "Bei „du“ heißt es: du hast."),
    gap("Woher ___ Sie? (sein)", ["sind"], "Bei „Sie“ heißt es: Sie sind."),
    fix(
      "Ich bin 25 Jahre alt.",
      "Ich habe 25 Jahre alt.",
      "Das Alter sagt man mit „sein“: Ich bin … Jahre alt.",
    ),
    mc(
      "Mein Sohn ___ Fieber.",
      ["hat", "ist", "hast"],
      "Fieber „hat“ man. Mein Sohn = er: er hat.",
    ),
    order(
      "Hast | du | heute Zeit?",
      "In der Ja/Nein-Frage steht das Verb auf Platz 1.",
    ),
    gap("Ihr ___ sehr nett. (sein)", ["seid"], "Bei „ihr“ heißt es: ihr seid."),
    mc(
      "Ich ___ Kopfschmerzen.",
      ["habe", "bin", "hat"],
      "Schmerzen „hat“ man: Ich habe Kopfschmerzen.",
    ),
    mc(
      "___ Sie verheiratet?",
      ["Sind", "Haben", "Seid"],
      "Wie ist jemand? → sein. Bei „Sie“: Sind Sie …?",
    ),
    gap(
      "Meine Eltern ___ in der Türkei. (sein)",
      ["sind"],
      "Meine Eltern = sie (Plural): sie sind.",
    ),
    fix(
      "Hast du Hunger?",
      "Bist du Hunger?",
      "Hunger „hat“ man: Hast du Hunger?",
    ),
    mc(
      "Die Kinder ___ heute keine Schule.",
      ["haben", "sind", "hat"],
      "Schule „hat“ man. Die Kinder = sie (Plural): sie haben.",
    ),
    gap("Frau Kaya ___ krank. (sein)", ["ist"], "Frau Kaya = sie: sie ist."),
    order(
      "Mein Bruder | ist | 20 Jahre | alt.",
      "Das Verb steht auf Platz 2. Das Alter sagt man mit „sein“.",
    ),
    gap("___ ihr Kinder? (haben)", ["Habt"], "Bei „ihr“ heißt es: ihr habt."),
    mc(
      "Ich ___ müde und ich ___ Durst.",
      ["bin … habe", "habe … bin", "bin … bin"],
      "Müde „ist“ man, Durst „hat“ man.",
    ),
    fix(
      "Wir haben heute keine Zeit.",
      "Wir sind heute keine Zeit.",
      "Zeit „hat“ man: Wir haben keine Zeit.",
    ),
  ],
});

T({
  id: "a1-plural",
  level: "A1",
  title: "Plural: ein Kind – zwei Kinder",
  kurz: "Bei zwei, drei oder vielen Dingen ist der Artikel immer *die*. Das Wort bekommt oft eine Endung: *-e*, *-er*, *-n*, *-en* oder *-s*. Lerne jedes Wort mit Plural: das Kind – die Kind*er*.",
  kurz_i18n: {
    en: "For two, three or many things the article is always “die”. The word often gets an ending: -e, -er, -n, -en or -s. Learn every word with its plural: das Kind – die Kinder.",
    uk: "Коли речей дві, три або багато, артикль завжди «die». Слово часто отримує закінчення: -e, -er, -n, -en або -s. Вчи кожне слово разом з множиною: das Kind – die Kinder.",
    ru: "Когда предметов два, три или много, артикль всегда «die». Слово часто получает окончание: -e, -er, -n, -en или -s. Учи каждое слово вместе с множественным числом: das Kind – die Kinder.",
    ar: "مع شيئين أو ثلاثة أو أشياء كثيرة تكون أداة التعريف دائمًا «die». تأخذ الكلمة غالبًا نهاية: ‎-e أو ‎-er أو ‎-n أو ‎-en أو ‎-s. تعلّم كل كلمة مع جمعها: das Kind – die Kinder.",
    fa: "برای دو، سه یا چند چیز، حرف تعریف همیشه «die» است. کلمه معمولاً یک پایانه می‌گیرد: ‎-e، ‎-er، ‎-n، ‎-en یا ‎-s. هر کلمه را با جمعش یاد بگیر: das Kind – die Kinder.",
    tr: "İki, üç ya da çok şey için artikel her zaman “die” olur. Kelime çoğu zaman bir ek alır: -e, -er, -n, -en veya -s. Her kelimeyi çoğuluyla öğren: das Kind – die Kinder.",
    es: "Con dos, tres o muchas cosas el artículo siempre es «die». La palabra suele recibir una terminación: -e, -er, -n, -en o -s. Aprende cada palabra con su plural: das Kind – die Kinder.",
    it: "Con due, tre o molte cose l’articolo è sempre «die». La parola prende spesso una desinenza: -e, -er, -n, -en o -s. Impara ogni parola con il suo plurale: das Kind – die Kinder.",
  },
  tabelle: {
    head: ["Endung", "eins", "zwei, drei, viele"],
    rows: [
      ["-e", "der Tag", "die Tag*e*"],
      ["-e + ä/ö/ü", "der Arzt", "die *Ä*rzt*e*"],
      ["-er", "das Kind", "die Kind*er*"],
      ["-er + ä/ö/ü", "das Buch", "die B*ü*ch*er*"],
      ["-n / -en", "die Frau", "die Frau*en*"],
      ["-s", "das Auto", "die Auto*s*"],
      ["–", "der Lehrer", "die Lehrer"],
    ],
  },
  beispiele: [
    "Ich habe zwei *Kinder*.",
    "Die *Äpfel* kosten zwei Euro.",
    "Im Kurs sind zwölf *Frauen* und acht *Männer*.",
    "Wir brauchen vier *Stühle*.",
    "Die *Formulare* sind auf dem Tisch.",
  ],
  fehler: [
    [
      "Ich habe zwei Kind.",
      "Ich habe zwei Kinder.",
      "Nach zwei, drei, viele … steht der Plural.",
    ],
    [
      "Das Kinder spielen.",
      "Die Kinder spielen.",
      "Im Plural ist der Artikel immer „die“.",
    ],
    [
      "Im Kurs sind zwei Lehrers.",
      "Im Kurs sind zwei Lehrer.",
      "Wörter mit -er am Ende haben oft keine Plural-Endung.",
    ],
  ],
  items: [
    mc(
      "Ich habe zwei ___.",
      ["Kinder", "Kind", "Kinds"],
      "das Kind – die Kinder. Nach „zwei“ steht der Plural.",
    ),
    mc(
      "Wir kaufen drei ___.",
      ["Äpfel", "Apfel", "Apfels"],
      "der Apfel – die Äpfel. Der Plural hat hier ä.",
    ),
    gap(
      "ein Auto – zwei ___",
      ["Autos"],
      "das Auto – die Autos. Viele Wörter aus anderen Sprachen haben -s.",
    ),
    gap(
      "eine Frau – zwei ___",
      ["Frauen"],
      "die Frau – die Frauen. Viele „die“-Wörter haben -en oder -n.",
    ),
    fix(
      "Die Kinder sind in der Kita.",
      "Das Kinder sind in der Kita.",
      "Im Plural ist der Artikel immer „die“.",
    ),
    mc(
      "das Buch – viele …",
      ["Bücher", "Buche", "Buchs"],
      "das Buch – die Bücher. Der Plural hat -er und ü.",
    ),
    gap(
      "ein Tag – sieben ___",
      ["Tage"],
      "der Tag – die Tage. Viele „der“-Wörter haben -e.",
    ),
    mc(
      "der Mann – zwei …",
      ["Männer", "Manner", "Mannen"],
      "der Mann – die Männer. Der Plural hat -er und ä.",
    ),
    order(
      "Meine Kinder | gehen | in die Schule.",
      "Das Verb steht auf Platz 2. Kinder ist Plural: sie gehen.",
    ),
    gap(
      "eine Wohnung – zwei ___",
      ["Wohnungen"],
      "Wörter mit -ung haben im Plural immer -en: die Wohnungen.",
    ),
    mc(
      "Im Kurs sind zwei ___.",
      ["Lehrer", "Lehrers", "Lehrern"],
      "der Lehrer – die Lehrer. Wörter mit -er haben oft keine Endung.",
    ),
    fix(
      "Ich brauche zwei Fotos.",
      "Ich brauche zwei Fotoen.",
      "das Foto – die Fotos. Wörter mit -o am Ende haben -s.",
    ),
    gap(
      "ein Haus – viele ___",
      ["Häuser"],
      "das Haus – die Häuser. Der Plural hat -er und äu.",
    ),
    mc(
      "eine Stadt – zwei …",
      ["Städte", "Stadten", "Stadts"],
      "die Stadt – die Städte. Der Plural hat -e und ä.",
    ),
    gap(
      "ein Zimmer – drei ___",
      ["Zimmer"],
      "das Zimmer – die Zimmer. Wörter mit -er haben oft keine Endung.",
    ),
    mc(
      "ein Handy – zwei …",
      ["Handys", "Handyen", "Handyer"],
      "das Handy – die Handys. Wörter aus dem Englischen haben oft -s.",
    ),
    order(
      "Die Äpfel | kosten | zwei Euro.",
      "Die Äpfel = Plural. Das Verb steht auf Platz 2: kosten.",
    ),
    gap(
      "ein Arzt – zwei ___",
      ["Ärzte"],
      "der Arzt – die Ärzte. Der Plural hat -e und ä.",
    ),
    fix(
      "Wir haben drei Zimmer.",
      "Wir haben drei Zimmers.",
      "das Zimmer – die Zimmer. Hier gibt es keine Plural-Endung.",
    ),
  ],
});

T({
  id: "a1-trennbare-verben",
  level: "A1",
  title: "Trennbare Verben: Ich stehe auf.",
  kurz: "Manche Verben haben zwei Teile: *auf*stehen, *an*rufen, *ein*kaufen. Im Satz geht der kleine Teil ganz ans Ende: Ich *stehe* um 6 Uhr *auf*.",
  kurz_i18n: {
    en: "Some verbs have two parts: aufstehen, anrufen, einkaufen. In a sentence the small part goes to the very end: Ich stehe um 6 Uhr auf.",
    uk: "Деякі дієслова мають дві частини: aufstehen, anrufen, einkaufen. У реченні мала частина стоїть у самому кінці: Ich stehe um 6 Uhr auf.",
    ru: "У некоторых глаголов две части: aufstehen, anrufen, einkaufen. В предложении маленькая часть уходит в самый конец: Ich stehe um 6 Uhr auf.",
    ar: "بعض الأفعال تتكوّن من جزأين: aufstehen, anrufen, einkaufen. في الجملة يذهب الجزء الصغير إلى آخر الجملة: Ich stehe um 6 Uhr auf.",
    fa: "بعضی فعل‌ها دو بخش دارند: aufstehen, anrufen, einkaufen. در جمله بخش کوچک به آخر جمله می‌رود: Ich stehe um 6 Uhr auf.",
    tr: "Bazı fiillerin iki parçası vardır: aufstehen, anrufen, einkaufen. Cümlede küçük parça en sona gider: Ich stehe um 6 Uhr auf.",
    es: "Algunos verbos tienen dos partes: aufstehen, anrufen, einkaufen. En la frase, la parte pequeña va al final: Ich stehe um 6 Uhr auf.",
    it: "Alcuni verbi hanno due parti: aufstehen, anrufen, einkaufen. Nella frase la parte piccola va alla fine: Ich stehe um 6 Uhr auf.",
  },
  tabelle: {
    head: ["Verb", "Satz"],
    rows: [
      ["*auf*stehen", "Ich *stehe* früh *auf*."],
      ["*an*rufen", "Ich *rufe* den Arzt *an*."],
      ["*ein*kaufen", "Wir *kaufen* heute *ein*."],
      ["*mit*kommen", "*Kommst* du *mit*?"],
      ["*an*fangen", "Der Kurs *fängt* um 9 Uhr *an*."],
      ["*aus*füllen", "Ich *fülle* das Formular *aus*."],
    ],
  },
  beispiele: [
    "Ich *stehe* um 6 Uhr *auf*.",
    "Der Kurs *fängt* um 9 Uhr *an*.",
    "*Rufst* du die Praxis *an*?",
    "Ich *kaufe* am Samstag *ein*.",
    "Bitte *füllen* Sie das Formular *aus*.",
    "Ich möchte morgen *einkaufen*.",
  ],
  fehler: [
    [
      "Ich aufstehe um 6 Uhr.",
      "Ich stehe um 6 Uhr auf.",
      "Der kleine Teil „auf“ steht am Ende.",
    ],
    [
      "Ich rufe an den Arzt.",
      "Ich rufe den Arzt an.",
      "Der kleine Teil steht ganz am Ende vom Satz.",
    ],
    [
      "Ich muss das Formular füllen aus.",
      "Ich muss das Formular ausfüllen.",
      "Mit „muss“, „kann“, „möchte“ bleibt das Verb zusammen und steht am Ende.",
    ],
  ],
  items: [
    mc(
      "Ich stehe um 7 Uhr ___.",
      ["auf", "an", "ein"],
      "Das Verb heißt aufstehen. „auf“ steht am Ende.",
    ),
    mc(
      "Der Kurs fängt um 9 Uhr ___.",
      ["an", "auf", "mit"],
      "Das Verb heißt anfangen. „an“ steht am Ende.",
    ),
    fix(
      "Ich kaufe heute ein.",
      "Ich einkaufe heute.",
      "einkaufen ist trennbar: Ich kaufe … ein.",
    ),
    gap(
      "Ich rufe den Arzt ___. (anrufen)",
      ["an"],
      "anrufen: Der kleine Teil „an“ steht am Ende.",
    ),
    order(
      "Ich | stehe | um 6 Uhr | auf.",
      "Das Verb steht auf Platz 2, „auf“ steht am Ende.",
    ),
    mc(
      "Wir gehen ins Kino. Kommst du ___?",
      ["mit", "ein", "zu"],
      "Das Verb heißt mitkommen: Kommst du mit?",
    ),
    gap(
      "Wir ___ am Samstag ein. (einkaufen)",
      ["kaufen"],
      "einkaufen: wir kaufen … ein. Das Verb steht auf Platz 2.",
    ),
    mc(
      "Bitte füllen Sie das Formular ___.",
      ["aus", "an", "mit"],
      "Ein Formular füllt man aus: ausfüllen.",
    ),
    fix(
      "Wann fängt der Kurs an?",
      "Wann anfängt der Kurs?",
      "Auch in der Frage steht „an“ am Ende.",
    ),
    gap(
      "Der Bus ___ um 8 Uhr ab. (abfahren)",
      ["fährt"],
      "abfahren: der Bus fährt … ab. Bei „er“ wird a zu ä.",
    ),
    order(
      "Ich | rufe | die Praxis | an.",
      "Das Verb steht auf Platz 2, „an“ steht am Ende.",
    ),
    mc(
      "Mein Mann ___ die Kinder von der Kita ___.",
      ["holt … ab", "abholt … –", "holt … an"],
      "Das Verb heißt abholen: Er holt die Kinder ab.",
    ),
    gap(
      "Machen Sie bitte die Tür ___. (zumachen)",
      ["zu"],
      "zumachen: Der kleine Teil „zu“ steht am Ende.",
    ),
    fix(
      "Ich möchte morgen einkaufen.",
      "Ich möchte morgen kaufen ein.",
      "Mit „möchte“ bleibt das Verb zusammen und steht am Ende.",
    ),
    gap(
      "Ich ___ dich morgen an. (anrufen)",
      ["rufe"],
      "anrufen: ich rufe … an.",
    ),
    mc(
      "Ich muss das Formular ___.",
      ["ausfüllen", "füllen aus", "aus füllen"],
      "Mit „muss“ steht das Verb zusammen am Ende: ausfüllen.",
    ),
    order(
      "Wann | kommt | der Zug | an?",
      "Fragewort, dann Verb. „an“ steht am Ende.",
    ),
    gap(
      "Der Arzt sagt: „Bitte ___ Sie den Mund auf.“ (aufmachen)",
      ["machen"],
      "aufmachen: Machen Sie … auf.",
    ),
    order(
      "Bitte | füllen | Sie | das Formular | aus.",
      "füllen Sie … aus: Der kleine Teil steht am Ende.",
    ),
  ],
});

T({
  id: "a1-modalverben",
  level: "A1",
  title: "Modalverben: können, müssen, möchten, wollen, dürfen",
  kurz: "*können* = es geht. *müssen* = es ist nötig. *möchten* und *wollen* = Wunsch. *dürfen* = es ist erlaubt. Das Modalverb steht auf Platz 2, das zweite Verb steht am Ende: Ich *kann* gut *kochen*.",
  kurz_i18n: {
    en: "können = it is possible. müssen = it is necessary. möchten and wollen = a wish. dürfen = it is allowed. The modal verb is in position 2, the second verb goes to the end: Ich kann gut kochen.",
    uk: "können = можу, вмію. müssen = мушу. möchten і wollen = бажання. dürfen = дозволено. Модальне дієслово стоїть на 2-му місці, друге дієслово – в кінці: Ich kann gut kochen.",
    ru: "können = могу, умею. müssen = должен. möchten и wollen = желание. dürfen = разрешено. Модальный глагол стоит на 2-м месте, второй глагол – в конце: Ich kann gut kochen.",
    ar: "können = أستطيع. müssen = يجب. möchten و wollen = رغبة. dürfen = مسموح. الفعل المساعد يأتي في الموقع الثاني، والفعل الثاني في آخر الجملة: Ich kann gut kochen.",
    fa: "können = توانستن. müssen = باید. möchten و wollen = خواستن. dürfen = اجازه داشتن. فعل کمکی در جای دوم است و فعل دوم آخر جمله می‌آید: Ich kann gut kochen.",
    tr: "können = yapabilmek. müssen = zorunda olmak. möchten ve wollen = istek. dürfen = izinli olmak. Modal fiil 2. sırada, ikinci fiil cümlenin sonunda durur: Ich kann gut kochen.",
    es: "können = poder. müssen = tener que. möchten y wollen = deseo. dürfen = tener permiso. El verbo modal va en la posición 2 y el segundo verbo al final: Ich kann gut kochen.",
    it: "können = potere, saper fare. müssen = dovere. möchten e wollen = desiderio. dürfen = avere il permesso. Il verbo modale sta al posto 2, il secondo verbo va alla fine: Ich kann gut kochen.",
  },
  tabelle: {
    head: ["", "ich / er / sie", "du", "wir / sie / Sie", "ihr"],
    rows: [
      ["können", "kann", "kannst", "können", "könnt"],
      ["müssen", "muss", "musst", "müssen", "müsst"],
      ["möchten", "möchte", "möchtest", "möchten", "möchtet"],
      ["wollen", "will", "willst", "wollen", "wollt"],
      ["dürfen", "darf", "darfst", "dürfen", "dürft"],
    ],
  },
  beispiele: [
    "Ich *kann* ein bisschen Deutsch *sprechen*.",
    "Ich *muss* morgen zum Jobcenter *gehen*.",
    "Ich *möchte* einen Termin *machen*.",
    "Hier *darf* man nicht *rauchen*.",
    "Mein Sohn *will* Fußball *spielen*.",
    "*Können* Sie das bitte *wiederholen*?",
  ],
  fehler: [
    [
      "Ich kann schwimmen gut.",
      "Ich kann gut schwimmen.",
      "Das zweite Verb steht ganz am Ende.",
    ],
    [
      "Er kannt gut kochen.",
      "Er kann gut kochen.",
      "Bei „ich“ und „er/sie“ hat das Modalverb keine Endung.",
    ],
    [
      "Ich muss zu gehen.",
      "Ich muss gehen.",
      "Nach einem Modalverb steht kein „zu“.",
    ],
  ],
  items: [
    mc(
      "Ich ___ gut kochen.",
      ["kann", "kannst", "können"],
      "Bei „ich“ heißt es: ich kann.",
    ),
    mc(
      "Du ___ das Formular ausfüllen.",
      ["musst", "muss", "müssen"],
      "Bei „du“ heißt es: du musst.",
    ),
    mc(
      "Ich ___ einen Kaffee, bitte.",
      ["möchte", "möchtest", "möchten"],
      "Bei „ich“ heißt es: ich möchte.",
    ),
    fix(
      "Ich kann gut schwimmen.",
      "Ich kann schwimmen gut.",
      "Das zweite Verb (schwimmen) steht am Ende.",
    ),
    gap(
      "___ Sie mir bitte helfen? (können)",
      ["Können"],
      "Bei „Sie“ heißt es: Können Sie …?",
    ),
    order(
      "Ich | muss | heute | arbeiten.",
      "Modalverb auf Platz 2, das zweite Verb am Ende.",
    ),
    mc(
      "Hier ist Rauchen verboten. Hier ___ man nicht rauchen.",
      ["darf", "dürfen", "darfst"],
      "man = er/sie: man darf. Verboten = man darf nicht.",
    ),
    gap(
      "Mein Sohn ___ heute nicht in die Schule gehen. Er ist krank. (können)",
      ["kann"],
      "Mein Sohn = er: er kann.",
    ),
    mc(
      "Was bedeutet: „Ich muss zum Amt gehen.“?",
      ["Es ist nötig.", "Es ist verboten.", "Ich habe Lust."],
      "„müssen“ sagt: Es ist nötig. Ich habe keine Wahl.",
    ),
    gap(
      "Wir ___ morgen um 8 Uhr beim Arzt sein. (müssen)",
      ["müssen"],
      "Bei „wir“ heißt es: wir müssen.",
    ),
    fix(
      "Er will Deutsch lernen.",
      "Er willt Deutsch lernen.",
      "Bei „er/sie“ hat das Modalverb keine Endung: er will.",
    ),
    mc(
      "___ ich hier parken?",
      ["Darf", "Darfst", "Dürfen"],
      "Bei „ich“ heißt es: Darf ich …?",
    ),
    gap(
      "Was ___ du trinken? (möchten)",
      ["möchtest"],
      "Bei „du“ heißt es: du möchtest.",
    ),
    order(
      "Können | Sie | das bitte | wiederholen?",
      "In der Frage steht das Modalverb auf Platz 1, das zweite Verb am Ende.",
    ),
    mc(
      "Ihr ___ jetzt nach Hause gehen. Der Kurs ist zu Ende.",
      ["könnt", "kann", "können"],
      "Bei „ihr“ heißt es: ihr könnt.",
    ),
    gap(
      "Die Kinder ___ hier nicht spielen. Das ist verboten. (dürfen)",
      ["dürfen"],
      "Die Kinder = sie (Plural): sie dürfen.",
    ),
    fix(
      "Ich muss morgen früh aufstehen.",
      "Ich muss morgen früh stehen auf.",
      "Mit Modalverb bleibt „aufstehen“ zusammen und steht am Ende.",
    ),
    order(
      "Wir | wollen | eine Wohnung | mieten.",
      "Modalverb auf Platz 2, das zweite Verb am Ende.",
    ),
    gap(
      "Meine Frau ___ einen Deutschkurs machen. (wollen)",
      ["will"],
      "Meine Frau = sie: sie will. Keine Endung.",
    ),
  ],
});

T({
  id: "a1-imperativ",
  level: "A1",
  title: "Imperativ: Komm! Kommen Sie!",
  kurz: "So sagst du: Bitte mach das! Mit „Sie“: *Kommen Sie* bitte! Mit „du“: ohne „du“ und ohne -st: du kommst → *Komm* bitte! Mit „ihr“: *Kommt* bitte!",
  kurz_i18n: {
    en: "This is how you ask someone to do something. With Sie: Kommen Sie bitte! With du: no “du” and no -st: du kommst → Komm bitte! With ihr: Kommt bitte!",
    uk: "Так ти просиш когось щось зробити. Із Sie: Kommen Sie bitte! Із du: без «du» і без -st: du kommst → Komm bitte! Із ihr: Kommt bitte!",
    ru: "Так ты просишь кого-то что-то сделать. С Sie: Kommen Sie bitte! С du: без «du» и без -st: du kommst → Komm bitte! С ihr: Kommt bitte!",
    ar: "هكذا تطلب من شخص أن يفعل شيئًا. مع Sie: ‏Kommen Sie bitte!‏ مع du: بدون «du» وبدون ‎-st‏: du kommst ← ‏Komm bitte!‏ مع ihr: ‏Kommt bitte!",
    fa: "این‌طور از کسی می‌خواهی کاری بکند. با Sie: ‏Kommen Sie bitte!‏ با du: بدون «du» و بدون ‎-st‏: du kommst ← ‏Komm bitte!‏ با ihr: ‏Kommt bitte!",
    tr: "Birinden bir şey yapmasını böyle istersin. Sie ile: Kommen Sie bitte! du ile: “du” yok ve -st yok: du kommst → Komm bitte! ihr ile: Kommt bitte!",
    es: "Así pides a alguien que haga algo. Con Sie: Kommen Sie bitte! Con du: sin «du» y sin -st: du kommst → Komm bitte! Con ihr: Kommt bitte!",
    it: "Così chiedi a qualcuno di fare qualcosa. Con Sie: Kommen Sie bitte! Con du: senza «du» e senza -st: du kommst → Komm bitte! Con ihr: Kommt bitte!",
  },
  tabelle: {
    head: ["", "du", "ihr", "Sie"],
    rows: [
      ["kommen", "*Komm*!", "*Kommt*!", "*Kommen Sie*!"],
      ["warten", "*Warte*!", "*Wartet*!", "*Warten Sie*!"],
      ["nehmen", "*Nimm*!", "*Nehmt*!", "*Nehmen Sie*!"],
      ["anrufen", "*Ruf* an!", "*Ruft* an!", "*Rufen Sie* an!"],
      ["sein", "*Sei*!", "*Seid*!", "*Seien Sie*!"],
    ],
  },
  beispiele: [
    "*Kommen Sie* bitte herein!",
    "*Warte* bitte einen Moment!",
    "*Nehmen Sie* bitte Platz!",
    "*Nimm* die Tablette nach dem Essen!",
    "Kinder, *macht* bitte die Bücher auf!",
    "*Ruf* mich bitte *an*!",
  ],
  fehler: [
    ["Kommst bitte!", "Komm bitte!", "In der du-Form fällt -st weg."],
    ["Du komm bitte!", "Komm bitte!", "In der du-Form sagt man kein „du“."],
    [
      "Warten bitte hier!",
      "Warten Sie bitte hier!",
      "In der Sie-Form muss „Sie“ stehen.",
    ],
  ],
  items: [
    mc(
      "Zu Frau Müller: „___ bitte einen Moment!“",
      ["Warten Sie", "Warte", "Wartet"],
      "Zu Frau Müller sagst du „Sie“: Warten Sie!",
    ),
    mc(
      "Zu einem Freund: „___ bitte!“",
      ["Komm", "Kommst", "Kommen"],
      "du-Form: du kommst → Komm! (ohne -st)",
    ),
    fix(
      "Komm bitte her!",
      "Kommst bitte her!",
      "In der du-Form fällt -st weg: Komm!",
    ),
    gap(
      "Zum Kind: „___ deine Hausaufgaben!“ (machen)",
      ["Mach", "Mache"],
      "du-Form: du machst → Mach!",
    ),
    mc(
      "Der Arzt sagt: „___ Sie bitte viel Wasser!“",
      ["Trinken", "Trink", "Trinkt"],
      "Sie-Form: Verb mit -en + Sie: Trinken Sie!",
    ),
    order(
      "Kommen | Sie | bitte | herein!",
      "Sie-Form: Das Verb steht auf Platz 1, dann „Sie“.",
    ),
    gap(
      "Zu zwei Kindern: „___ bitte leise!“ (sein)",
      ["Seid"],
      "ihr-Form von „sein“: Seid!",
    ),
    mc(
      "Zu einem Freund: „___ doch ein Stück Kuchen!“",
      ["Nimm", "Nehm", "Nimmst"],
      "nehmen: du nimmst → Nimm!",
    ),
    gap(
      "Zu Herrn Ali: „___ Sie bitte das Formular aus!“ (ausfüllen)",
      ["Füllen"],
      "Sie-Form: Füllen Sie … aus! „aus“ steht am Ende.",
    ),
    fix(
      "Nehmen Sie bitte Platz!",
      "Nehmen bitte Platz!",
      "In der Sie-Form muss „Sie“ stehen.",
    ),
    mc(
      "Zu einem Kind: „___ bitte langsam!“",
      ["Sprich", "Sprech", "Sprichst"],
      "sprechen: du sprichst → Sprich!",
    ),
    gap(
      "Zu einer Freundin: „___ mich morgen an!“ (anrufen)",
      ["Ruf", "Rufe"],
      "du-Form: du rufst an → Ruf … an!",
    ),
    order(
      "Mach | bitte | das Fenster | zu!",
      "zumachen: Mach … zu! „zu“ steht am Ende.",
      ["Mach das Fenster bitte zu!"],
    ),
    mc(
      "Die Lehrerin sagt zu den Kindern: „___ bitte die Bücher auf!“",
      ["Macht", "Mach", "Machst"],
      "Mehrere Kinder = ihr: ihr macht → Macht!",
    ),
    gap(
      "Zu einem Freund: „___ nicht so schnell!“ (fahren)",
      ["Fahr", "Fahre"],
      "du-Form: Fahr! Hier gibt es kein ä.",
    ),
    fix(
      "Sei bitte pünktlich!",
      "Bist bitte pünktlich!",
      "du-Form von „sein“: Sei!",
    ),
    mc(
      "Zu einem Freund: „___ mir bitte!“",
      ["Hilf", "Helf", "Hilfst"],
      "helfen: du hilfst → Hilf!",
    ),
    gap(
      "Zu Frau Kaya: „___ Sie bitte leise!“ (sein)",
      ["Seien"],
      "Sie-Form von „sein“: Seien Sie!",
    ),
    order(
      "Geben | Sie | mir bitte | Ihren Ausweis!",
      "Sie-Form: Das Verb steht auf Platz 1, dann „Sie“.",
    ),
  ],
});

T({
  id: "a1-lokale-praepositionen",
  level: "A1",
  title: "Wo? Wohin? Woher? – in, nach, aus, bei, zu",
  kurz: "Woher? → *aus* Syrien, *vom* Arzt. Wo? → *in* Köln, *bei* Anna, *beim* Arzt, *zu* Hause. Wohin? → *nach* Köln, *zu* Anna, *zum* Arzt, *nach* Hause.",
  kurz_i18n: {
    en: "Where from? → aus Syrien, vom Arzt. Where? → in Köln, bei Anna, beim Arzt, zu Hause. Where to? → nach Köln, zu Anna, zum Arzt, nach Hause.",
    uk: "Звідки? → aus Syrien, vom Arzt. Де? → in Köln, bei Anna, beim Arzt, zu Hause. Куди? → nach Köln, zu Anna, zum Arzt, nach Hause.",
    ru: "Откуда? → aus Syrien, vom Arzt. Где? → in Köln, bei Anna, beim Arzt, zu Hause. Куда? → nach Köln, zu Anna, zum Arzt, nach Hause.",
    ar: "من أين؟ ← aus Syrien, vom Arzt. أين؟ ← in Köln, bei Anna, beim Arzt, zu Hause. إلى أين؟ ← nach Köln, zu Anna, zum Arzt, nach Hause.",
    fa: "از کجا؟ ← aus Syrien, vom Arzt. کجا؟ ← in Köln, bei Anna, beim Arzt, zu Hause. به کجا؟ ← nach Köln, zu Anna, zum Arzt, nach Hause.",
    tr: "Nereden? → aus Syrien, vom Arzt. Nerede? → in Köln, bei Anna, beim Arzt, zu Hause. Nereye? → nach Köln, zu Anna, zum Arzt, nach Hause.",
    es: "¿De dónde? → aus Syrien, vom Arzt. ¿Dónde? → in Köln, bei Anna, beim Arzt, zu Hause. ¿Adónde? → nach Köln, zu Anna, zum Arzt, nach Hause.",
    it: "Da dove? → aus Syrien, vom Arzt. Dove? → in Köln, bei Anna, beim Arzt, zu Hause. Verso dove? → nach Köln, zu Anna, zum Arzt, nach Hause.",
  },
  tabelle: {
    head: ["", "Woher?", "Wo?", "Wohin?"],
    rows: [
      ["Stadt, Land", "*aus* Köln", "*in* Köln", "*nach* Köln"],
      [
        "Land mit „die“",
        "*aus der* Türkei",
        "*in der* Türkei",
        "*in die* Türkei",
      ],
      ["Person", "*von* Anna", "*bei* Anna", "*zu* Anna"],
      ["Arzt, Amt", "*vom* Arzt", "*beim* Arzt", "*zum* Arzt"],
      ["Zuhause", "*von* zu Hause", "*zu* Hause", "*nach* Hause"],
    ],
  },
  beispiele: [
    "Ich komme *aus* Syrien.",
    "Ich wohne *in* Dortmund.",
    "Am Montag fahre ich *nach* Berlin.",
    "Ich bin gerade *beim* Arzt.",
    "Ich gehe morgen *zum* Jobcenter.",
    "Um 17 Uhr gehe ich *nach* Hause. Dann bin ich *zu* Hause.",
  ],
  fehler: [
    [
      "Ich gehe nach Arzt.",
      "Ich gehe zum Arzt.",
      "„nach“ nur bei Stadt, Land und „nach Hause“. Zu Personen: zu / zum.",
    ],
    [
      "Ich gehe zu Hause.",
      "Ich gehe nach Hause.",
      "Wohin? → nach Hause. Wo? → zu Hause.",
    ],
    [
      "Ich komme von Syrien.",
      "Ich komme aus Syrien.",
      "Bei Land und Stadt: Woher? → aus.",
    ],
  ],
  items: [
    mc(
      "Ich komme ___ der Ukraine.",
      ["aus", "nach", "bei"],
      "Woher? Bei einem Land sagt man „aus“.",
    ),
    mc(
      "Ich wohne ___ Essen.",
      ["in", "nach", "aus"],
      "Wo? Bei einer Stadt sagt man „in“.",
    ),
    mc(
      "Morgen fahre ich ___ Hamburg.",
      ["nach", "in", "zu"],
      "Wohin? Bei einer Stadt sagt man „nach“.",
    ),
    gap(
      "Woher kommen Sie? – Ich komme ___ Afghanistan.",
      ["aus"],
      "Woher? Bei einem Land sagt man „aus“.",
    ),
    fix(
      "Ich gehe zum Arzt.",
      "Ich gehe nach Arzt.",
      "Zu einer Person geht man „zu“: zum Arzt.",
    ),
    mc(
      "Wo bist du? – Ich bin ___ Hause.",
      ["zu", "nach", "in"],
      "Wo? → zu Hause.",
    ),
    gap(
      "Der Kurs ist zu Ende. Ich gehe jetzt ___ Hause.",
      ["nach"],
      "Wohin? → nach Hause.",
    ),
    mc(
      "Ich habe Fieber. Ich gehe ___ Arzt.",
      ["zum", "beim", "nach"],
      "Wohin? Zu einer Person: zum Arzt (zu + dem).",
    ),
    mc(
      "Wo ist Ali? – Er ist ___ Arzt.",
      ["beim", "zum", "nach"],
      "Wo? Bei einer Person: beim Arzt (bei + dem).",
    ),
    order(
      "Ich | fahre | morgen | nach Berlin.",
      "Das Verb steht auf Platz 2. Wohin? → nach Berlin.",
    ),
    gap(
      "Am Sonntag gehe ich ___ meiner Schwester.",
      ["zu"],
      "Wohin? Zu einer Person sagt man „zu“.",
    ),
    fix(
      "Meine Tochter ist bei Oma.",
      "Meine Tochter ist zu Oma.",
      "Wo? Bei einer Person sagt man „bei“.",
    ),
    mc(
      "Mein Mann arbeitet ___ einer Firma in Bochum.",
      ["bei", "zu", "nach"],
      "Wo arbeitet er? → bei einer Firma.",
    ),
    gap(
      "Ich muss morgen ___ Jobcenter gehen. (zu)",
      ["zum", "zu dem"],
      "zu + dem = zum: zum Jobcenter.",
    ),
    mc(
      "Im Sommer fliegen wir ___ die Türkei.",
      ["in", "nach", "zu"],
      "Die Türkei hat einen Artikel. Wohin? → in die Türkei.",
    ),
    gap(
      "Woher kommst du jetzt? – Ich komme ___ Arzt. (von)",
      ["vom", "von dem"],
      "von + dem = vom: vom Arzt.",
    ),
    fix(
      "Wir fahren nach Hause.",
      "Wir fahren zu Hause.",
      "Wohin? → nach Hause.",
    ),
    order(
      "Meine Eltern | wohnen | in der Türkei.",
      "Wo? → in der Türkei. Das Verb steht auf Platz 2.",
    ),
    mc(
      "Wo sind Sie gerade? – Ich bin ___ Friseur.",
      ["beim", "zum", "nach"],
      "Wo? Bei einer Person: beim Friseur.",
    ),
  ],
});

T({
  id: "a1-konnektoren",
  level: "A1",
  title: "Sätze verbinden: und, aber, oder, denn",
  kurz: "*und* = plus. *aber* = etwas ist anders. *oder* = A oder B. *denn* = Grund (Warum?). Nach diesen Wörtern bleibt der Satz normal: Ich bleibe zu Hause, denn ich *bin* krank.",
  kurz_i18n: {
    en: "und = and. aber = but. oder = or. denn = because (reason). After these words the sentence stays normal: Ich bleibe zu Hause, denn ich bin krank.",
    uk: "und = і. aber = але. oder = або. denn = бо (причина). Після цих слів порядок слів звичайний: Ich bleibe zu Hause, denn ich bin krank.",
    ru: "und = и. aber = но. oder = или. denn = потому что (причина). После этих слов порядок слов обычный: Ich bleibe zu Hause, denn ich bin krank.",
    ar: "und = و. aber = لكن. oder = أو. denn = لأنّ (السبب). بعد هذه الكلمات يبقى ترتيب الجملة عاديًا: Ich bleibe zu Hause, denn ich bin krank.",
    fa: "und = و. aber = اما. oder = یا. denn = چون (دلیل). بعد از این کلمه‌ها ترتیب جمله عادی می‌ماند: Ich bleibe zu Hause, denn ich bin krank.",
    tr: "und = ve. aber = ama. oder = veya. denn = çünkü (neden). Bu kelimelerden sonra cümle normal kalır: Ich bleibe zu Hause, denn ich bin krank.",
    es: "und = y. aber = pero. oder = o. denn = porque (motivo). Después de estas palabras la frase sigue normal: Ich bleibe zu Hause, denn ich bin krank.",
    it: "und = e. aber = ma. oder = o. denn = perché (motivo). Dopo queste parole la frase resta normale: Ich bleibe zu Hause, denn ich bin krank.",
  },
  tabelle: {
    head: ["Wort", "Idee", "Beispiel"],
    rows: [
      ["*und*", "+", "Ich koche *und* mein Mann putzt."],
      ["*aber*", "anders", "Ich bin müde, *aber* ich lerne."],
      ["*oder*", "A / B", "Kaffee *oder* Tee?"],
      ["*denn*", "Warum?", "Ich komme nicht, *denn* ich bin krank."],
    ],
  },
  beispiele: [
    "Ich komme aus Syrien *und* ich wohne in Hagen.",
    "Die Wohnung ist schön, *aber* sie ist teuer.",
    "Möchten Sie Kaffee *oder* Tee?",
    "Ich komme heute nicht, *denn* mein Kind ist krank.",
    "Ich lerne Deutsch, *denn* ich möchte arbeiten.",
  ],
  fehler: [
    [
      "Ich bleibe zu Hause, denn ich krank bin.",
      "Ich bleibe zu Hause, denn ich bin krank.",
      "Nach „denn“ steht das Verb auf Platz 2 – wie im normalen Satz.",
    ],
    [
      "Ich bin müde, aber lerne ich.",
      "Ich bin müde, aber ich lerne.",
      "Nach „aber“ kommt zuerst die Person, dann das Verb.",
    ],
    [
      "Ich komme nicht denn ich bin krank.",
      "Ich komme nicht, denn ich bin krank.",
      "Vor „denn“ und „aber“ steht ein Komma.",
    ],
  ],
  items: [
    mc(
      "Möchten Sie Kaffee ___ Tee?",
      ["oder", "denn", "aber"],
      "A oder B? Bei einer Wahl sagt man „oder“.",
    ),
    mc(
      "Ich habe einen Sohn ___ eine Tochter.",
      ["und", "denn", "aber"],
      "Sohn + Tochter: „und“ verbindet zwei Dinge.",
    ),
    mc(
      "Die Wohnung ist klein, ___ sie ist schön.",
      ["aber", "oder", "denn"],
      "klein ↔ schön: Das ist ein Gegensatz → aber.",
    ),
    mc(
      "Ich gehe zum Arzt, ___ ich habe Fieber.",
      ["denn", "aber", "oder"],
      "Warum gehe ich zum Arzt? Der Grund kommt mit „denn“.",
    ),
    fix(
      "Ich bleibe zu Hause, denn ich bin krank.",
      "Ich bleibe zu Hause, denn ich krank bin.",
      "Nach „denn“ steht das Verb auf Platz 2: ich bin krank.",
    ),
    gap(
      "Ich möchte kommen, ___ ich habe keine Zeit. (und / aber / oder / denn)",
      ["aber"],
      "Ich möchte ↔ keine Zeit: Gegensatz → aber.",
    ),
    gap(
      "Fahren wir mit dem Bus ___ mit dem Auto? (und / aber / oder / denn)",
      ["oder"],
      "Bus oder Auto? Bei einer Wahl sagt man „oder“.",
    ),
    order(
      "Ich | bin müde, | aber | ich | lerne.",
      "Nach „aber“ kommt die Person, dann das Verb: aber ich lerne.",
    ),
    mc(
      "Ich lerne viel, ___ ich möchte gut Deutsch sprechen.",
      ["denn", "oder", "aber"],
      "Warum lerne ich viel? Der Grund kommt mit „denn“.",
    ),
    fix(
      "Er ist krank, aber er arbeitet.",
      "Er ist krank, aber arbeitet er.",
      "Nach „aber“ bleibt der Satz normal: er arbeitet.",
    ),
    gap(
      "Ich heiße Omar ___ ich komme aus Syrien. (und / aber / oder / denn)",
      ["und"],
      "Zwei Informationen zusammen: „und“.",
    ),
    mc(
      "Das Auto ist alt, ___ es fährt gut.",
      ["aber", "denn", "oder"],
      "alt ↔ fährt gut: Gegensatz → aber.",
    ),
    gap(
      "Ich kaufe das Brot nicht, ___ es ist zu teuer. (und / aber / oder / denn)",
      ["denn"],
      "Warum kaufe ich es nicht? Grund → denn.",
    ),
    order(
      "Ich | komme nicht, | denn | mein Kind | ist krank.",
      "Nach „denn“ steht das Verb auf Platz 2: mein Kind ist krank.",
    ),
    fix(
      "Ich lerne Deutsch, denn ich möchte arbeiten.",
      "Ich lerne Deutsch, denn ich arbeiten möchte.",
      "Nach „denn“ steht das Verb „möchte“ auf Platz 2.",
    ),
    mc(
      "Ich möchte ein Brot ___ zwei Liter Milch, bitte.",
      ["und", "aber", "denn"],
      "Brot + Milch: „und“ verbindet zwei Dinge.",
    ),
    gap(
      "Wir können ins Kino gehen ___ wir bleiben zu Hause. Was möchtest du? (und / aber / oder / denn)",
      ["oder"],
      "Kino oder zu Hause? Eine Wahl → oder.",
    ),
    mc(
      "Er spricht gut Deutsch, ___ er schreibt nicht gern.",
      ["aber", "denn", "oder"],
      "spricht gut ↔ schreibt nicht gern: Gegensatz → aber.",
    ),
    gap(
      "Ich nehme den Bus, ___ ich habe kein Auto. (und / aber / oder / denn)",
      ["denn"],
      "Warum nehme ich den Bus? Grund → denn.",
    ),
    order(
      "Die Wohnung | ist schön, | aber | sie | ist teuer.",
      "Zuerst Satz 1, dann „aber“ + Person + Verb.",
    ),
  ],
});
/* ===================== A2 ===================== */
T({
  id: "a2-praeteritum-war-hatte",
  level: "A2",
  title: "Präteritum: war und hatte",
  kurz: "Für gestern und früher: sein → ich *war*, haben → ich *hatte*. Gestern *war* ich krank. Ich *hatte* Fieber.",
  kurz_i18n: {
    en: "For yesterday and the past: sein → ich war (I was), haben → ich hatte (I had). Gestern war ich krank. Ich hatte Fieber.",
    uk: "Про вчора і минуле: sein → ich war (я був/була), haben → ich hatte (я мав/мала). Gestern war ich krank. Ich hatte Fieber.",
    ru: "Про вчера и прошлое: sein → ich war (я был/была), haben → ich hatte (у меня было). Gestern war ich krank. Ich hatte Fieber.",
    ar: "للحديث عن الأمس والماضي: sein ← ich war (كنتُ)، haben ← ich hatte (كان عندي). Gestern war ich krank. Ich hatte Fieber.",
    fa: "برای دیروز و گذشته: sein ← ich war (بودم)، haben ← ich hatte (داشتم). Gestern war ich krank. Ich hatte Fieber.",
    tr: "Dün ve geçmiş için: sein → ich war (-dim, idim), haben → ich hatte (vardı). Gestern war ich krank. Ich hatte Fieber.",
    es: "Para ayer y el pasado: sein → ich war (era/estaba), haben → ich hatte (tenía). Gestern war ich krank. Ich hatte Fieber.",
    it: "Per ieri e il passato: sein → ich war (ero), haben → ich hatte (avevo). Gestern war ich krank. Ich hatte Fieber.",
  },
  tabelle: {
    head: ["", "sein", "haben"],
    rows: [
      ["ich", "*war*", "*hatte*"],
      ["du", "*warst*", "*hattest*"],
      ["er / sie / es", "*war*", "*hatte*"],
      ["wir", "*waren*", "*hatten*"],
      ["ihr", "*wart*", "*hattet*"],
      ["sie / Sie", "*waren*", "*hatten*"],
    ],
  },
  beispiele: [
    "Gestern *war* ich beim Arzt.",
    "Ich *hatte* starke Kopfschmerzen.",
    "Wo *warst* du am Wochenende?",
    "Wir *hatten* letzte Woche keinen Unterricht.",
    "Früher *war* mein Mann Lehrer.",
    "*Hatten* Sie schon einen Termin?",
  ],
  fehler: [
    [
      "Gestern ich war krank.",
      "Gestern war ich krank.",
      "Das Verb steht auf Platz 2 – auch nach „gestern“.",
    ],
    [
      "Er wart gestern nicht da.",
      "Er war gestern nicht da.",
      "Bei „ich“ und „er/sie“ gibt es keine Endung: war, hatte.",
    ],
    [
      "Ich war gestern Fieber.",
      "Ich hatte gestern Fieber.",
      "Fieber, Zeit, einen Termin „hat“ man → hatte.",
    ],
  ],
  items: [
    mc(
      "Gestern ___ ich krank.",
      ["war", "hatte", "bin"],
      "Gestern = Vergangenheit. Krank „ist“ man → ich war.",
    ),
    mc(
      "Letzte Woche ___ ich Fieber.",
      ["hatte", "war", "habe"],
      "Letzte Woche = Vergangenheit. Fieber „hat“ man → ich hatte.",
    ),
    mc(
      "Wo ___ du gestern?",
      ["warst", "war", "hattest"],
      "Wo …? → sein. Bei „du“: du warst.",
    ),
    gap(
      "Wir ___ am Sonntag bei meinen Eltern. (sein)",
      ["waren"],
      "Bei „wir“ heißt es: wir waren.",
    ),
    gap(
      "Gestern ___ ich keine Zeit. (haben)",
      ["hatte"],
      "Bei „ich“ heißt es: ich hatte.",
    ),
    fix(
      "Gestern war ich beim Arzt.",
      "Gestern ich war beim Arzt.",
      "Das Verb steht auf Platz 2: Gestern war ich …",
    ),
    mc(
      "___ ihr gestern im Kurs?",
      ["Wart", "Waren", "Hattet"],
      "Wo wart ihr? → sein. Bei „ihr“: ihr wart.",
    ),
    order(
      "Letzte Woche | hatte | ich | Urlaub.",
      "Das Verb steht auf Platz 2, danach kommt „ich“.",
    ),
    gap(
      "Früher ___ meine Frau Lehrerin. (sein)",
      ["war"],
      "Meine Frau = sie: sie war. Keine Endung.",
    ),
    mc(
      "Die Kinder ___ gestern keine Schule.",
      ["hatten", "waren", "hatte"],
      "Schule „hat“ man. Die Kinder = sie (Plural): sie hatten.",
    ),
    fix(
      "Er hatte gestern einen Termin beim Jobcenter.",
      "Er hattet gestern einen Termin beim Jobcenter.",
      "Bei „er“ gibt es keine Endung: er hatte.",
    ),
    gap(
      "___ Sie schon einmal in Berlin? (sein)",
      ["Waren"],
      "Bei „Sie“ heißt es: Waren Sie …?",
    ),
    mc(
      "Der Test ___ nicht schwer.",
      ["war", "hatte", "waren"],
      "Wie war der Test? → sein. Der Test = er: er war.",
    ),
    gap(
      "Du ___ recht. Der Bus war schon weg. (haben)",
      ["hattest"],
      "Bei „du“ heißt es: du hattest.",
    ),
    order(
      "Wie | war | dein Termin | beim Arzt?",
      "Fragewort, dann das Verb: Wie war …?",
    ),
    mc(
      "Als Kind ___ ich einen Hund.",
      ["hatte", "war", "hattet"],
      "Einen Hund „hat“ man. Bei „ich“: ich hatte.",
    ),
    gap(
      "Warum ___ ihr gestern keine Hausaufgaben? (haben)",
      ["hattet"],
      "Bei „ihr“ heißt es: ihr hattet.",
    ),
    fix(
      "Wir waren müde, aber wir hatten viel Spaß.",
      "Wir hatten müde, aber wir waren viel Spaß.",
      "Müde „ist“ man → waren. Spaß „hat“ man → hatten.",
    ),
    mc(
      "Gestern ___ das Wetter schlecht und wir ___ keine Lust auf einen Spaziergang.",
      ["war … hatten", "hatte … waren", "waren … hatte"],
      "Das Wetter war schlecht (sein). Wir hatten keine Lust (haben).",
    ),
  ],
});

T({
  id: "a2-dass-wenn",
  level: "A2",
  title: "Sätze mit dass und wenn",
  kurz: "Nach *dass* und *wenn* steht das Verb ganz am Ende. Ich weiß, *dass* du heute keine Zeit *hast*. *Wenn* ich krank *bin*, bleibe ich zu Hause.",
  kurz_i18n: {
    en: "After dass (that) and wenn (if/when) the verb goes to the very end. Ich weiß, dass du heute keine Zeit hast. Wenn ich krank bin, bleibe ich zu Hause.",
    uk: "Після dass (що) і wenn (якщо/коли) дієслово стоїть у самому кінці. Ich weiß, dass du heute keine Zeit hast. Wenn ich krank bin, bleibe ich zu Hause.",
    ru: "После dass (что) и wenn (если/когда) глагол стоит в самом конце. Ich weiß, dass du heute keine Zeit hast. Wenn ich krank bin, bleibe ich zu Hause.",
    ar: "بعد dass (أنّ) و wenn (إذا/عندما) يأتي الفعل في آخر الجملة. Ich weiß, dass du heute keine Zeit hast. Wenn ich krank bin, bleibe ich zu Hause.",
    fa: "بعد از dass (که) و wenn (اگر/وقتی) فعل در آخر جمله می‌آید. Ich weiß, dass du heute keine Zeit hast. Wenn ich krank bin, bleibe ich zu Hause.",
    tr: "dass (ki, -diğini) ve wenn (-se, -ince) kelimelerinden sonra fiil en sona gider. Ich weiß, dass du heute keine Zeit hast. Wenn ich krank bin, bleibe ich zu Hause.",
    es: "Después de dass (que) y wenn (si/cuando) el verbo va al final. Ich weiß, dass du heute keine Zeit hast. Wenn ich krank bin, bleibe ich zu Hause.",
    it: "Dopo dass (che) e wenn (se/quando) il verbo va alla fine. Ich weiß, dass du heute keine Zeit hast. Wenn ich krank bin, bleibe ich zu Hause.",
  },
  tabelle: {
    head: ["Satz 1", "Satz 2"],
    rows: [
      ["Ich hoffe,", "*dass* du bald *kommst*."],
      ["Ich rufe an,", "*wenn* ich Zeit *habe*."],
      ["*Wenn* ich Zeit *habe*,", "*rufe* ich an."],
    ],
  },
  beispiele: [
    "Ich weiß, *dass* der Kurs morgen *ausfällt*.",
    "Der Arzt sagt, *dass* ich viel trinken *soll*.",
    "*Wenn* es *regnet*, nehme ich den Bus.",
    "Bitte rufen Sie an, *wenn* Sie nicht kommen *können*.",
    "Ich finde, *dass* die Wohnung zu teuer *ist*.",
    "*Wenn* mein Kind krank *ist*, bleibe ich zu Hause.",
  ],
  fehler: [
    [
      "Ich weiß, dass er ist krank.",
      "Ich weiß, dass er krank ist.",
      "Nach „dass“ steht das Verb am Ende.",
    ],
    [
      "Wenn ich Zeit habe, ich komme.",
      "Wenn ich Zeit habe, komme ich.",
      "Nach dem wenn-Satz kommt sofort das Verb.",
    ],
    [
      "Ich weiß, dass der Kurs fängt um 9 Uhr an.",
      "Ich weiß, dass der Kurs um 9 Uhr anfängt.",
      "Trennbare Verben stehen am Ende wieder zusammen.",
    ],
  ],
  items: [
    mc(
      "Ich weiß, ___",
      ["dass er krank ist.", "dass er ist krank.", "dass ist er krank."],
      "Nach „dass“ steht das Verb am Ende: … krank ist.",
    ),
    mc(
      "Ich bleibe zu Hause, ___ ich krank bin.",
      ["wenn", "dass", "aber"],
      "„wenn“ nennt die Bedingung. Das Verb „bin“ steht am Ende.",
    ),
    mc(
      "Der Arzt sagt, ___ ich viel Wasser trinken soll.",
      ["dass", "wenn", "denn"],
      "Was sagt der Arzt? → dass … Das Verb steht am Ende.",
    ),
    fix(
      "Ich hoffe, dass du bald kommst.",
      "Ich hoffe, dass du kommst bald.",
      "Nach „dass“ steht das Verb am Ende: … bald kommst.",
    ),
    gap(
      "Ich glaube, dass der Bus heute nicht ___. (fahren)",
      ["fährt"],
      "Der Bus = er: er fährt. Das Verb steht am Ende.",
    ),
    order(
      "Ich | hoffe, | dass | du | Zeit | hast.",
      "Nach „dass“ steht das Verb am Ende: … Zeit hast.",
    ),
    mc(
      "Wenn ich Zeit habe, ___",
      ["rufe ich dich an.", "ich rufe dich an.", "ich dich anrufe."],
      "Nach dem wenn-Satz kommt sofort das Verb: … , rufe ich …",
    ),
    gap(
      "Rufen Sie bitte an, wenn Sie Fragen ___. (haben)",
      ["haben"],
      "Bei „Sie“: haben. Das Verb steht am Ende.",
    ),
    fix(
      "Wenn es regnet, nehme ich den Bus.",
      "Wenn es regnet, ich nehme den Bus.",
      "Nach dem wenn-Satz kommt sofort das Verb: nehme ich.",
    ),
    gap(
      "Meine Chefin sagt, dass ich morgen früher kommen ___. (müssen)",
      ["muss"],
      "Bei „ich“: muss. Das Modalverb steht ganz am Ende.",
    ),
    mc(
      "Es tut mir leid, ___ ich zu spät komme.",
      ["dass", "wenn", "oder"],
      "Was tut mir leid? → dass ich zu spät komme.",
    ),
    order(
      "Wenn | ich | krank bin, | bleibe | ich | zu Hause.",
      "Im wenn-Satz steht das Verb am Ende. Danach kommt sofort „bleibe“.",
    ),
    gap(
      "Ich finde, dass die Miete zu hoch ___. (sein)",
      ["ist"],
      "Die Miete = sie: sie ist. Das Verb steht am Ende.",
    ),
    mc(
      "„___ Sie umziehen, müssen Sie das beim Amt melden.“",
      ["Wenn", "Dass", "Denn"],
      "„wenn“ nennt die Bedingung: Wenn Sie umziehen, …",
    ),
    fix(
      "Ich weiß, dass der Kurs um 9 Uhr anfängt.",
      "Ich weiß, dass der Kurs um 9 Uhr fängt an.",
      "Im dass-Satz steht „anfängt“ zusammen am Ende.",
    ),
    gap(
      "Wenn du willst, ___ ich dir bei dem Formular. (helfen)",
      ["helfe"],
      "Nach dem wenn-Satz kommt sofort das Verb: helfe ich.",
    ),
    mc(
      "Die Lehrerin sagt, dass wir die Hausaufgaben bis Freitag ___.",
      ["machen müssen", "müssen machen", "machen muss"],
      "Im dass-Satz steht das Modalverb ganz am Ende: machen müssen.",
    ),
    order(
      "Der Arzt | sagt, | dass | ich | zu Hause | bleiben soll.",
      "Im dass-Satz stehen die Verben am Ende: bleiben soll.",
    ),
    gap(
      "Können Sie mir Bescheid sagen, wenn der Brief ___? (ankommen)",
      ["ankommt"],
      "Im wenn-Satz steht das trennbare Verb zusammen am Ende: ankommt.",
    ),
    fix(
      "Wenn mein Kind krank ist, kann ich nicht zum Kurs kommen.",
      "Wenn mein Kind ist krank, kann ich nicht zum Kurs kommen.",
      "Im wenn-Satz steht das Verb am Ende: … krank ist.",
    ),
  ],
});

T({
  id: "a2-komparativ",
  level: "A2",
  title: "Vergleichen: schneller, am schnellsten",
  kurz: "Vergleichen: Adjektiv + *-er* + *als*: Der Bus ist schnell*er als* das Fahrrad. Die Nummer 1: *am* …*-sten*: Der Zug ist *am* schnell*sten*. Gleich: *so* groß *wie*.",
  kurz_i18n: {
    en: "Comparing: adjective + -er + als: Der Bus ist schneller als das Fahrrad. Number 1: am …-sten: Der Zug ist am schnellsten. The same: so groß wie.",
    uk: "Порівняння: прикметник + -er + als: Der Bus ist schneller als das Fahrrad. Номер 1: am …-sten: Der Zug ist am schnellsten. Однаково: so groß wie.",
    ru: "Сравнение: прилагательное + -er + als: Der Bus ist schneller als das Fahrrad. Номер 1: am …-sten: Der Zug ist am schnellsten. Одинаково: so groß wie.",
    ar: "المقارنة: الصفة + ‎-er‏ + als: Der Bus ist schneller als das Fahrrad. الأول: am …-sten: Der Zug ist am schnellsten. التساوي: so groß wie.",
    fa: "مقایسه: صفت + ‎-er‏ + als: Der Bus ist schneller als das Fahrrad. شماره ۱: am …-sten: Der Zug ist am schnellsten. برابر: so groß wie.",
    tr: "Karşılaştırma: sıfat + -er + als: Der Bus ist schneller als das Fahrrad. Bir numara: am …-sten: Der Zug ist am schnellsten. Eşit: so groß wie.",
    es: "Comparar: adjetivo + -er + als: Der Bus ist schneller als das Fahrrad. El número 1: am …-sten: Der Zug ist am schnellsten. Igual: so groß wie.",
    it: "Confrontare: aggettivo + -er + als: Der Bus ist schneller als das Fahrrad. Il numero 1: am …-sten: Der Zug ist am schnellsten. Uguale: so groß wie.",
  },
  tabelle: {
    head: ["", "mehr", "Nummer 1"],
    rows: [
      ["schnell", "schnell*er*", "*am* schnell*sten*"],
      ["billig", "billig*er*", "*am* billig*sten*"],
      ["alt", "*ä*lt*er*", "*am* *ä*lt*esten*"],
      ["groß", "gr*ö*ß*er*", "*am* gr*ö*ß*ten*"],
      ["teuer", "teu*rer*", "*am* teuer*sten*"],
      ["gut", "*besser*", "*am besten*"],
      ["viel", "*mehr*", "*am meisten*"],
      ["gern", "*lieber*", "*am liebsten*"],
    ],
  },
  beispiele: [
    "Die Wohnung in Köln ist *teurer als* die Wohnung in Hagen.",
    "Mein Bruder ist *älter als* ich.",
    "Ich trinke *lieber* Tee *als* Kaffee.",
    "Der Zug ist *am schnellsten*.",
    "Mein Sohn ist *so groß wie* ich.",
    "Heute geht es mir *besser*.",
  ],
  fehler: [
    [
      "Das Handy ist mehr billig.",
      "Das Handy ist billiger.",
      "Im Deutschen sagt man nicht „mehr“ + Adjektiv, sondern Adjektiv + -er.",
    ],
    [
      "Köln ist größer wie Bonn.",
      "Köln ist größer als Bonn.",
      "Nach -er steht „als“. „wie“ steht nach „so“: so groß wie.",
    ],
    [
      "Mein Deutsch ist jetzt guter.",
      "Mein Deutsch ist jetzt besser.",
      "gut – besser – am besten.",
    ],
  ],
  items: [
    mc(
      "Der Zug ist ___ als der Bus.",
      ["schneller", "schnell", "am schnellsten"],
      "Vergleich mit „als“: Adjektiv + -er → schneller.",
    ),
    mc(
      "Köln ist größer ___ Bonn.",
      ["als", "wie", "so"],
      "Nach -er (größer) steht „als“.",
    ),
    gap(
      "Diese Wohnung ist ___ als die andere. (billig)",
      ["billiger"],
      "Vergleich: Adjektiv + -er → billiger.",
    ),
    fix(
      "Dieses Handy ist billiger.",
      "Dieses Handy ist mehr billig.",
      "Man sagt Adjektiv + -er, nicht „mehr billig“.",
    ),
    gap(
      "Mein Bruder ist ___ als ich. (alt)",
      ["älter"],
      "alt – älter: Viele kurze Adjektive bekommen ä, ö, ü.",
    ),
    mc(
      "Ich bin so groß ___ mein Vater.",
      ["wie", "als", "so"],
      "Gleich: so … wie.",
    ),
    gap(
      "Heute ist das Wetter ___ als gestern. (gut)",
      ["besser"],
      "gut – besser – am besten.",
    ),
    mc(
      "Welcher Weg ist am ___?",
      ["kürzesten", "kürzer", "kurz"],
      "Die Nummer 1: am + Adjektiv + -(e)sten → am kürzesten.",
    ),
    order(
      "Der Bus | ist | langsamer | als | die Bahn.",
      "Vergleich: Adjektiv + -er + als.",
    ),
    gap(
      "Ich trinke ___ Tee als Kaffee. (gern)",
      ["lieber"],
      "gern – lieber – am liebsten.",
    ),
    mc(
      "Im Winter ist es hier ___ als in meinem Heimatland.",
      ["kälter", "kalter", "am kältesten"],
      "kalt – kälter. Mit „als“ steht die Form mit -er.",
    ),
    fix(
      "Meine Schwester ist jünger als ich.",
      "Meine Schwester ist jünger wie ich.",
      "Nach -er steht „als“: jünger als.",
    ),
    gap(
      "Die neue Wohnung ist ___ als die alte. (teuer)",
      ["teurer"],
      "teuer – teurer: Das e vor r fällt weg.",
    ),
    gap(
      "Welche Sprache sprichst du am ___? (gut)",
      ["besten"],
      "gut – besser – am besten.",
    ),
    mc(
      "Ich arbeite jetzt ___ als früher.",
      ["mehr", "viel", "am meisten"],
      "viel – mehr – am meisten. Mit „als“: mehr.",
    ),
    order(
      "Am liebsten | esse | ich | Reis mit Gemüse.",
      "Das Verb steht auf Platz 2: Am liebsten esse ich …",
    ),
    gap(
      "Mit dem Fahrrad bin ich am ___ bei der Arbeit. (schnell)",
      ["schnellsten"],
      "Die Nummer 1: am schnellsten.",
    ),
    mc(
      "Deutsch finde ich ___ als Englisch.",
      ["schwerer", "schwer", "mehr schwer"],
      "Vergleich mit „als“: schwer + -er → schwerer.",
    ),
    fix(
      "Im Sommer sind die Tage länger als im Winter.",
      "Im Sommer sind die Tage langer als im Winter.",
      "lang – länger: mit ä.",
    ),
    gap(
      "Meine Tochter ist jetzt ___ als ich. (groß)",
      ["größer"],
      "groß – größer – am größten: mit ö.",
    ),
  ],
});

T({
  id: "a2-reflexive-verben",
  level: "A2",
  title: "Reflexive Verben: Ich freue mich.",
  kurz: "Manche Verben brauchen ein kleines Wort dazu: *mich, dich, sich, uns, euch*. Ich freue *mich*. Du freust *dich*. Er freut *sich*.",
  kurz_i18n: {
    en: "Some verbs need a small extra word: mich, dich, sich, uns, euch. Ich freue mich. Du freust dich. Er freut sich.",
    uk: "Деякі дієслова потребують маленького слова: mich, dich, sich, uns, euch (як українське «-ся»). Ich freue mich. Du freust dich. Er freut sich.",
    ru: "Некоторым глаголам нужно маленькое слово: mich, dich, sich, uns, euch (как русское «-ся»). Ich freue mich. Du freust dich. Er freut sich.",
    ar: "بعض الأفعال تحتاج إلى كلمة صغيرة معها: mich, dich, sich, uns, euch. ‏Ich freue mich. Du freust dich. Er freut sich.",
    fa: "بعضی فعل‌ها یک کلمهٔ کوچک هم لازم دارند: mich, dich, sich, uns, euch. ‏Ich freue mich. Du freust dich. Er freut sich.",
    tr: "Bazı fiiller yanında küçük bir kelime ister: mich, dich, sich, uns, euch. Ich freue mich. Du freust dich. Er freut sich.",
    es: "Algunos verbos necesitan una palabra pequeña (como «me, te, se»): mich, dich, sich, uns, euch. Ich freue mich. Du freust dich. Er freut sich.",
    it: "Alcuni verbi hanno bisogno di una parolina (come «mi, ti, si»): mich, dich, sich, uns, euch. Ich freue mich. Du freust dich. Er freut sich.",
  },
  tabelle: {
    head: ["", "sich freuen"],
    rows: [
      ["ich", "freue *mich*"],
      ["du", "freust *dich*"],
      ["er / sie / es", "freut *sich*"],
      ["wir", "freuen *uns*"],
      ["ihr", "freut *euch*"],
      ["sie / Sie", "freuen *sich*"],
    ],
  },
  beispiele: [
    "Ich *freue mich* auf das Wochenende.",
    "Bitte *setzen* Sie *sich*!",
    "Mein Sohn *wäscht sich* die Hände.",
    "Wir *treffen uns* um 15 Uhr vor der Schule.",
    "Ich *interessiere mich* für die Stelle.",
    "Hast du *dich* schon *angemeldet*?",
  ],
  fehler: [
    [
      "Ich freue sich auf den Urlaub.",
      "Ich freue mich auf den Urlaub.",
      "Bei „ich“ heißt es „mich“. „sich“ gehört zu er/sie/es und sie/Sie.",
    ],
    [
      "Ich mich freue auf den Urlaub.",
      "Ich freue mich auf den Urlaub.",
      "Das Verb steht auf Platz 2, danach kommt „mich“.",
    ],
    [
      "Wir treffen um 15 Uhr.",
      "Wir treffen uns um 15 Uhr.",
      "sich treffen: Das kleine Wort „uns“ darf nicht fehlen.",
    ],
  ],
  items: [
    mc(
      "Ich freue ___ auf den Urlaub.",
      ["mich", "sich", "dich"],
      "Bei „ich“ heißt es: mich.",
    ),
    mc(
      "Er wäscht ___ die Hände.",
      ["sich", "mich", "dich"],
      "Bei „er“ heißt es: sich.",
    ),
    mc(
      "Wir treffen ___ morgen um 10 Uhr.",
      ["uns", "sich", "mich"],
      "Bei „wir“ heißt es: uns.",
    ),
    gap("Setzen Sie ___ bitte!", ["sich"], "Bei „Sie“ heißt es: sich."),
    gap(
      "Freust du ___ auf das Wochenende?",
      ["dich"],
      "Bei „du“ heißt es: dich.",
    ),
    fix(
      "Ich interessiere mich für die Stelle.",
      "Ich interessiere sich für die Stelle.",
      "Bei „ich“ heißt es: mich.",
    ),
    mc(
      "Kinder, wascht ___ bitte die Hände!",
      ["euch", "sich", "uns"],
      "Kinder = ihr. Bei „ihr“ heißt es: euch.",
    ),
    order(
      "Ich | freue | mich | auf den Urlaub.",
      "Das Verb steht auf Platz 2, danach kommt „mich“.",
    ),
    gap(
      "Meine Tochter zieht ___ allein an.",
      ["sich"],
      "Meine Tochter = sie: sich.",
    ),
    mc(
      "Ich muss ___ beim Jobcenter melden.",
      ["mich", "sich", "mir"],
      "sich melden: Bei „ich“ heißt es: mich.",
    ),
    fix(
      "Wir treffen uns vor dem Bahnhof.",
      "Wir treffen vor dem Bahnhof.",
      "sich treffen: „uns“ darf nicht fehlen.",
    ),
    gap(
      "Ich habe ___ erkältet. Ich bleibe heute zu Hause.",
      ["mich"],
      "sich erkälten: Bei „ich“ heißt es: mich.",
    ),
    mc(
      "Herr Ali beschwert ___ über die hohe Rechnung.",
      ["sich", "ihn", "mich"],
      "sich beschweren: Herr Ali = er → sich.",
    ),
    order(
      "Bitte | melden | Sie | sich | bis Freitag | an.",
      "Nach „Sie“ kommt „sich“. Der Teil „an“ steht am Ende.",
    ),
    gap(
      "Wir möchten ___ für den Deutschkurs anmelden.",
      ["uns"],
      "sich anmelden: Bei „wir“ heißt es: uns.",
    ),
    mc(
      "Hast du ___ schon für die Prüfung angemeldet?",
      ["dich", "sich", "dir"],
      "sich anmelden: Bei „du“ heißt es: dich.",
    ),
    gap("Wofür interessiert ihr ___?", ["euch"], "Bei „ihr“ heißt es: euch."),
    fix(
      "Ich fühle mich heute nicht gut.",
      "Ich fühle heute nicht gut.",
      "sich fühlen: „mich“ darf nicht fehlen.",
    ),
    mc(
      "Die Kinder freuen ___ auf die Ferien.",
      ["sich", "ihnen", "sie"],
      "Die Kinder = sie (Plural): sich.",
    ),
    gap(
      "Ich kann ___ nicht an den Namen erinnern.",
      ["mich"],
      "sich erinnern: Bei „ich“ heißt es: mich.",
    ),
  ],
});

T({
  id: "a2-praepositionen-dativ-akkusativ",
  level: "A2",
  title: "Präpositionen: mit dem Bus, für den Chef",
  kurz: "Nach *mit, bei, zu, von, nach, aus, seit*: der/das → *dem*, die → *der*. Nach *für, ohne, durch, gegen, um*: der → *den*. Bei *in, an, auf*: Wo? → *im* Büro, *in der* Küche. Wohin? → *ins* Büro, *in die* Küche.",
  kurz_i18n: {
    en: "After mit, bei, zu, von, nach, aus, seit: der/das → dem, die → der (dative). After für, ohne, durch, gegen, um: der → den (accusative). With in, an, auf: Where? → im Büro, in der Küche. Where to? → ins Büro, in die Küche.",
    uk: "Після mit, bei, zu, von, nach, aus, seit: der/das → dem, die → der (Dativ). Після für, ohne, durch, gegen, um: der → den (Akkusativ). З in, an, auf: Де? → im Büro, in der Küche. Куди? → ins Büro, in die Küche.",
    ru: "После mit, bei, zu, von, nach, aus, seit: der/das → dem, die → der (Dativ). После für, ohne, durch, gegen, um: der → den (Akkusativ). С in, an, auf: Где? → im Büro, in der Küche. Куда? → ins Büro, in die Küche.",
    ar: "بعد mit, bei, zu, von, nach, aus, seit: ‏der/das ← dem و die ← der (Dativ). بعد für, ohne, durch, gegen, um: ‏der ← den (Akkusativ). مع in, an, auf: أين؟ ← im Büro, in der Küche. إلى أين؟ ← ins Büro, in die Küche.",
    fa: "بعد از mit, bei, zu, von, nach, aus, seit: ‏der/das ← dem و die ← der (Dativ). بعد از für, ohne, durch, gegen, um: ‏der ← den (Akkusativ). با in, an, auf: کجا؟ ← im Büro, in der Küche. به کجا؟ ← ins Büro, in die Küche.",
    tr: "mit, bei, zu, von, nach, aus, seit sonrası: der/das → dem, die → der (Dativ). für, ohne, durch, gegen, um sonrası: der → den (Akkusativ). in, an, auf ile: Nerede? → im Büro, in der Küche. Nereye? → ins Büro, in die Küche.",
    es: "Después de mit, bei, zu, von, nach, aus, seit: der/das → dem, die → der (dativo). Después de für, ohne, durch, gegen, um: der → den (acusativo). Con in, an, auf: ¿Dónde? → im Büro, in der Küche. ¿Adónde? → ins Büro, in die Küche.",
    it: "Dopo mit, bei, zu, von, nach, aus, seit: der/das → dem, die → der (dativo). Dopo für, ohne, durch, gegen, um: der → den (accusativo). Con in, an, auf: Dove? → im Büro, in der Küche. Verso dove? → ins Büro, in die Küche.",
  },
  tabelle: {
    head: ["", "der", "das", "die", "Plural"],
    rows: [
      [
        "mit, bei, zu …",
        "*dem* Bus",
        "*dem* Auto",
        "*der* Bahn",
        "*den* Kinder*n*",
      ],
      [
        "für, ohne …",
        "*den* Chef",
        "*das* Kind",
        "*die* Firma",
        "*die* Kinder",
      ],
      [
        "Wo? in, an, auf",
        "*im* Park",
        "*im* Büro",
        "*in der* Küche",
        "*in den* Zimmer*n*",
      ],
      [
        "Wohin? in, an, auf",
        "*in den* Park",
        "*ins* Büro",
        "*in die* Küche",
        "*in die* Zimmer",
      ],
    ],
  },
  beispiele: [
    "Ich fahre *mit dem* Bus zur Arbeit.",
    "Das Geschenk ist *für meinen* Bruder.",
    "Ich gehe nie *ohne mein* Handy aus dem Haus.",
    "*Seit einem* Jahr wohne ich in Deutschland.",
    "Ich bin *im* Büro. – Ich gehe *ins* Büro.",
    "Das Formular liegt *auf dem* Tisch. – Ich lege das Formular *auf den* Tisch.",
  ],
  fehler: [
    [
      "Ich fahre mit den Bus.",
      "Ich fahre mit dem Bus.",
      "Nach „mit“: der Bus → dem Bus.",
    ],
    [
      "Das ist für mein Bruder.",
      "Das ist für meinen Bruder.",
      "Nach „für“: der Bruder → den / meinen Bruder.",
    ],
    [
      "Ich gehe im Supermarkt.",
      "Ich gehe in den Supermarkt.",
      "Wohin? → in den Supermarkt. Wo? → im Supermarkt.",
    ],
  ],
  items: [
    mc(
      "Ich fahre mit ___ Bus.",
      ["dem", "den", "der"],
      "Nach „mit“: der Bus → dem Bus.",
    ),
    mc(
      "Das ist für ___ Sohn.",
      ["meinen", "meinem", "mein"],
      "Nach „für“: der Sohn → meinen Sohn.",
    ),
    mc(
      "Ich wohne bei ___ Schwester.",
      ["meiner", "meine", "meinen"],
      "Nach „bei“: die Schwester → meiner Schwester.",
    ),
    gap(
      "Nach ___ Kurs gehe ich einkaufen. (der)",
      ["dem"],
      "Nach „nach“: der Kurs → dem Kurs.",
    ),
    fix(
      "Ich komme ohne meinen Mann.",
      "Ich komme ohne meinem Mann.",
      "Nach „ohne“: der Mann → meinen Mann.",
    ),
    gap(
      "Ich bin seit ___ Jahr in Deutschland. (ein)",
      ["einem"],
      "Nach „seit“: das Jahr → einem Jahr.",
    ),
    mc(
      "Wo ist das Kind? – Es ist in ___ Kita.",
      ["der", "die", "den"],
      "Wo? → die Kita wird „in der Kita“.",
    ),
    mc(
      "Wohin gehst du? – Ich gehe in ___ Supermarkt.",
      ["den", "dem", "der"],
      "Wohin? → der Supermarkt wird „in den Supermarkt“.",
    ),
    order(
      "Das Geschenk | ist | für | meine Mutter.",
      "Nach „für“ bleibt „die“ gleich: für meine Mutter.",
    ),
    gap(
      "Der Brief ist von ___ Krankenkasse. (die)",
      ["der"],
      "Nach „von“: die Krankenkasse → der Krankenkasse.",
    ),
    mc(
      "Die Tasse steht auf ___ Tisch.",
      ["dem", "den", "der"],
      "Wo steht sie? → auf dem Tisch.",
    ),
    fix(
      "Ich lege das Buch auf den Tisch.",
      "Ich lege das Buch auf dem Tisch.",
      "legen = Wohin? → auf den Tisch.",
    ),
    gap(
      "Ich brauche das Dokument für ___ Amt. (das)",
      ["das"],
      "Nach „für“ bleibt „das“ gleich: für das Amt.",
    ),
    mc(
      "Wir gehen durch ___ Park.",
      ["den", "dem", "der"],
      "Nach „durch“: der Park → den Park.",
    ),
    gap(
      "Ich gehe zu ___ Ärztin. (die)",
      ["der"],
      "Nach „zu“: die Ärztin → der Ärztin.",
    ),
    mc(
      "Am Abend sitzen wir in ___ Küche und essen.",
      ["der", "die", "den"],
      "Wo sitzen wir? → in der Küche.",
    ),
    order(
      "Ich | hänge | das Bild | an die Wand.",
      "hängen = Wohin? → an die Wand.",
    ),
    gap(
      "Mit ___ Kindern gehe ich oft auf den Spielplatz. (die)",
      ["den"],
      "Nach „mit“ im Plural: den Kindern (mit -n).",
    ),
    mc(
      "Ich warte seit ___ Stunde beim Arzt.",
      ["einer", "eine", "einem"],
      "Nach „seit“: die Stunde → einer Stunde.",
    ),
    fix(
      "Die Kinder spielen im Garten.",
      "Die Kinder spielen in den Garten.",
      "Wo spielen sie? → im Garten (in + dem).",
    ),
  ],
});

T({
  id: "a2-adjektivendungen",
  level: "A2",
  title: "Adjektivendungen: ein neuer Job, die neue Wohnung",
  kurz: "Vor einem Nomen bekommt das Adjektiv eine Endung: der neu*e* Job, ein neu*er* Job, ein neu*es* Auto, eine neu*e* Wohnung. Nach *den, dem, einen, einem, einer* und im Plural mit Artikel ist die Endung immer *-en*.",
  kurz_i18n: {
    en: "Before a noun the adjective gets an ending: der neue Job, ein neuer Job, ein neues Auto, eine neue Wohnung. After den, dem, einen, einem, einer and in the plural with an article the ending is always -en.",
    uk: "Перед іменником прикметник отримує закінчення: der neue Job, ein neuer Job, ein neues Auto, eine neue Wohnung. Після den, dem, einen, einem, einer і в множині з артиклем закінчення завжди -en.",
    ru: "Перед существительным прилагательное получает окончание: der neue Job, ein neuer Job, ein neues Auto, eine neue Wohnung. После den, dem, einen, einem, einer и во множественном числе с артиклем окончание всегда -en.",
    ar: "قبل الاسم تأخذ الصفة نهاية: der neue Job, ein neuer Job, ein neues Auto, eine neue Wohnung. بعد den, dem, einen, einem, einer وفي الجمع مع أداة التعريف تكون النهاية دائمًا ‎-en.",
    fa: "قبل از اسم، صفت یک پایانه می‌گیرد: der neue Job, ein neuer Job, ein neues Auto, eine neue Wohnung. بعد از den, dem, einen, einem, einer و در جمع با حرف تعریف، پایانه همیشه ‎-en است.",
    tr: "İsimden önce sıfat bir ek alır: der neue Job, ein neuer Job, ein neues Auto, eine neue Wohnung. den, dem, einen, einem, einer kelimelerinden sonra ve artikelli çoğulda ek her zaman -en olur.",
    es: "Delante de un sustantivo el adjetivo recibe una terminación: der neue Job, ein neuer Job, ein neues Auto, eine neue Wohnung. Después de den, dem, einen, einem, einer y en plural con artículo la terminación siempre es -en.",
    it: "Davanti a un nome l’aggettivo prende una desinenza: der neue Job, ein neuer Job, ein neues Auto, eine neue Wohnung. Dopo den, dem, einen, einem, einer e al plurale con articolo la desinenza è sempre -en.",
  },
  tabelle: {
    head: ["", "der", "das", "die", "Plural"],
    rows: [
      [
        "Das ist …",
        "der neu*e* Job",
        "das neu*e* Auto",
        "die neu*e* Wohnung",
        "die neu*en* Jobs",
      ],
      [
        "Das ist …",
        "ein neu*er* Job",
        "ein neu*es* Auto",
        "eine neu*e* Wohnung",
        "neu*e* Jobs",
      ],
      [
        "Ich habe …",
        "den / einen neu*en* Job",
        "das neu*e* / ein neu*es* Auto",
        "die / eine neu*e* Wohnung",
        "die neu*en* Jobs",
      ],
      [
        "mit …",
        "dem / einem neu*en* Job",
        "dem / einem neu*en* Auto",
        "der / einer neu*en* Wohnung",
        "den neu*en* Jobs",
      ],
    ],
  },
  beispiele: [
    "Das ist ein gut*er* Arzt.",
    "Ich suche eine klein*e* Wohnung.",
    "Wir haben einen neu*en* Nachbarn.",
    "Das neu*e* Handy war teuer.",
    "Ich fahre mit dem alt*en* Auto.",
    "Die neu*en* Kollegen sind nett.",
  ],
  fehler: [
    [
      "Das ist ein neue Job.",
      "Das ist ein neuer Job.",
      "der Job → ein neuer Job. Das -r von „der“ geht an das Adjektiv.",
    ],
    [
      "Ich habe ein neuer Job.",
      "Ich habe einen neuen Job.",
      "Nach „haben“: der → einen. Nach „einen“ ist die Endung -en.",
    ],
    [
      "Die Wohnung ist schöne.",
      "Die Wohnung ist schön.",
      "Nach „sein“ und ohne Nomen danach hat das Adjektiv keine Endung.",
    ],
  ],
  items: [
    mc(
      "Das ist ein ___ Arzt.",
      ["guter", "gute", "guten"],
      "der Arzt → ein guter Arzt.",
    ),
    mc(
      "Die ___ Wohnung ist teuer.",
      ["neue", "neuer", "neues"],
      "Nach „die“ (eine Sache) ist die Endung -e: die neue Wohnung.",
    ),
    mc(
      "Ich suche eine ___ Wohnung.",
      ["billige", "billigen", "billiger"],
      "Nach „eine“ ist die Endung -e: eine billige Wohnung.",
    ),
    fix(
      "Die Wohnung ist schön.",
      "Die Wohnung ist schöne.",
      "Nach „ist“ hat das Adjektiv keine Endung.",
    ),
    gap("Das ist ein ___ Auto. (neu)", ["neues"], "das Auto → ein neues Auto."),
    gap(
      "Der ___ Kollege heißt Tarek. (neu)",
      ["neue"],
      "Nach „der“ ist die Endung -e: der neue Kollege.",
    ),
    mc(
      "Ich habe einen ___ Job.",
      ["neuen", "neuer", "neue"],
      "Nach „einen“ ist die Endung immer -en.",
    ),
    gap(
      "Ich kaufe einen ___ Mantel. (warm)",
      ["warmen"],
      "Nach „einen“ ist die Endung immer -en.",
    ),
    fix(
      "Wir haben einen netten Nachbarn.",
      "Wir haben ein netter Nachbar.",
      "Nach „haben“: einen. Nach „einen“ ist die Endung -en.",
    ),
    mc(
      "Ich fahre mit dem ___ Fahrrad.",
      ["alten", "alte", "altes"],
      "Nach „dem“ ist die Endung immer -en.",
    ),
    order(
      "Ich | suche | eine | kleine | Wohnung.",
      "Das Adjektiv steht zwischen Artikel und Nomen.",
    ),
    gap(
      "Das ___ Kind weint. (klein)",
      ["kleine"],
      "Nach „das“ ist die Endung -e: das kleine Kind.",
    ),
    mc(
      "Die ___ Nachbarn sind sehr nett.",
      ["neuen", "neue", "neuer"],
      "Plural mit Artikel: Endung -en → die neuen Nachbarn.",
    ),
    gap(
      "Sie trägt eine ___ Jacke. (rot)",
      ["rote"],
      "Nach „eine“ ist die Endung -e: eine rote Jacke.",
    ),
    mc(
      "Wir wohnen in einer ___ Stadt.",
      ["kleinen", "kleine", "kleiner"],
      "Nach „einer“ ist die Endung -en: in einer kleinen Stadt.",
    ),
    gap(
      "Ich wünsche dir einen ___ Tag! (schön)",
      ["schönen"],
      "Nach „einen“ ist die Endung immer -en.",
    ),
    fix(
      "Das ist ein schwieriges Formular.",
      "Das ist ein schwieriger Formular.",
      "das Formular → ein schwieriges Formular.",
    ),
    mc(
      "Im Kurs sind viele ___ Leute.",
      ["nette", "netten", "netter"],
      "Plural ohne Artikel (auch nach „viele“): Endung -e.",
    ),
    gap(
      "Ich habe ein ___ Problem mit meinem Vermieter. (groß)",
      ["großes"],
      "das Problem → ein großes Problem.",
    ),
    order(
      "Das | ist | ein | guter | Arzt.",
      "Das Adjektiv steht zwischen „ein“ und dem Nomen.",
    ),
  ],
});
/* ===================== B1 ===================== */
T({
  id: "b1-konjunktiv2",
  level: "B1",
  title: "Konjunktiv II: wäre, hätte, würde, könnte",
  kurz: "Mit *würde, wäre, hätte, könnte* bist du höflich oder sprichst über etwas, das nicht wirklich so ist: *Könnten* Sie mir helfen? Wenn ich Zeit *hätte*, *würde* ich mehr Sport machen.",
  kurz_i18n: {
    en: "With würde, wäre, hätte, könnte you are polite or you talk about something that is not real: Könnten Sie mir helfen? Wenn ich Zeit hätte, würde ich mehr Sport machen. (If I had time, I would …)",
    uk: "З würde, wäre, hätte, könnte ти говориш ввічливо або про те, чого насправді немає: Könnten Sie mir helfen? Wenn ich Zeit hätte, würde ich mehr Sport machen. (Якби я мав час, я б …)",
    ru: "С würde, wäre, hätte, könnte ты говоришь вежливо или о том, чего на самом деле нет: Könnten Sie mir helfen? Wenn ich Zeit hätte, würde ich mehr Sport machen. (Если бы у меня было время, я бы …)",
    ar: "باستخدام würde, wäre, hätte, könnte تتكلّم بأدب أو عن شيء غير حقيقي: Könnten Sie mir helfen? ‏Wenn ich Zeit hätte, würde ich mehr Sport machen. (لو كان عندي وقت، لَـ…)",
    fa: "با würde, wäre, hätte, könnte مؤدبانه حرف می‌زنی یا دربارهٔ چیزی که واقعی نیست: Könnten Sie mir helfen? ‏Wenn ich Zeit hätte, würde ich mehr Sport machen. (اگر وقت داشتم، …)",
    tr: "würde, wäre, hätte, könnte ile kibar konuşursun ya da gerçek olmayan bir şeyden söz edersin: Könnten Sie mir helfen? Wenn ich Zeit hätte, würde ich mehr Sport machen. (Zamanım olsaydı, …)",
    es: "Con würde, wäre, hätte, könnte hablas con cortesía o de algo que no es real: Könnten Sie mir helfen? Wenn ich Zeit hätte, würde ich mehr Sport machen. (Si tuviera tiempo, haría …)",
    it: "Con würde, wäre, hätte, könnte parli in modo cortese o di qualcosa che non è reale: Könnten Sie mir helfen? Wenn ich Zeit hätte, würde ich mehr Sport machen. (Se avessi tempo, farei …)",
  },
  tabelle: {
    head: ["", "sein", "haben", "werden", "können"],
    rows: [
      ["ich", "wäre", "hätte", "würde", "könnte"],
      ["du", "wärst", "hättest", "würdest", "könntest"],
      ["er / sie / es", "wäre", "hätte", "würde", "könnte"],
      ["wir", "wären", "hätten", "würden", "könnten"],
      ["ihr", "wärt", "hättet", "würdet", "könntet"],
      ["sie / Sie", "wären", "hätten", "würden", "könnten"],
    ],
  },
  beispiele: [
    "*Könnten* Sie mir bitte *helfen*?",
    "Ich *hätte* gern einen Termin.",
    "An deiner Stelle *würde* ich mit dem Chef *sprechen*.",
    "Wenn ich mehr Zeit *hätte*, *würde* ich einen Kurs *machen*.",
    "Es *wäre* schön, wenn Sie mir bald antworten *könnten*.",
    "Ich *wäre* jetzt gern am Meer.",
  ],
  fehler: [
    [
      "Wenn ich Zeit hätte, ich würde dir helfen.",
      "Wenn ich Zeit hätte, würde ich dir helfen.",
      "Nach dem wenn-Satz kommt sofort das Verb.",
    ],
    [
      "Wenn ich reich bin, würde ich ein Haus kaufen.",
      "Wenn ich reich wäre, würde ich ein Haus kaufen.",
      "Nicht real → in beiden Satzteilen Konjunktiv II.",
    ],
    [
      "Ich würde gern einen Termin hätte.",
      "Ich hätte gern einen Termin.",
      "Bei haben und sein nimmt man direkt hätte und wäre.",
    ],
  ],
  items: [
    mc(
      "___ Sie mir bitte sagen, wo das Büro von Frau Weber ist?",
      ["Könnten", "Hätten", "Wären"],
      "Höfliche Bitte mit Infinitiv (sagen): Könnten Sie …?",
    ),
    mc(
      "Ich ___ gern einen Termin für nächste Woche.",
      ["hätte", "wäre", "würde"],
      "Höflicher Wunsch: Ich hätte gern + Nomen.",
    ),
    mc(
      "An deiner Stelle ___ ich mich auf die Stelle bewerben.",
      ["würde", "hätte", "wäre"],
      "Ratschlag: An deiner Stelle würde ich + Infinitiv.",
    ),
    gap(
      "Es ___ schön, wenn Sie mich zurückrufen könnten. (sein)",
      ["wäre"],
      "Konjunktiv II von „sein“: es wäre.",
    ),
    fix(
      "Wenn ich Zeit hätte, würde ich dir helfen.",
      "Wenn ich Zeit hätte, ich würde dir helfen.",
      "Nach dem wenn-Satz kommt sofort das Verb: würde ich.",
    ),
    gap(
      "Wenn ich ein Auto ___, müsste ich nicht so früh aufstehen. (haben)",
      ["hätte"],
      "Nicht real: Ich habe kein Auto → wenn ich ein Auto hätte.",
    ),
    mc(
      "Welche Bitte ist am höflichsten?",
      [
        "Könnten Sie das Fenster schließen?",
        "Schließen Sie das Fenster!",
        "Sie schließen jetzt das Fenster.",
      ],
      "Eine Frage mit „Könnten Sie …?“ ist besonders höflich.",
    ),
    order(
      "Könnten | Sie | mir bitte | helfen?",
      "Höfliche Frage: Verb auf Platz 1, Infinitiv am Ende.",
    ),
    gap(
      "___ du mir bitte dein Handy leihen? (werden)",
      ["Würdest"],
      "Konjunktiv II von „werden“ bei „du“: würdest.",
    ),
    mc(
      "Wenn ich du ___, würde ich zum Arzt gehen.",
      ["wäre", "hätte", "würde"],
      "Feste Form für Ratschläge: Wenn ich du wäre, …",
    ),
    gap(
      "Ich ___ gern mehr Zeit für meine Familie. (haben)",
      ["hätte"],
      "Wunsch: Ich hätte gern …",
    ),
    fix(
      "Wenn ich Urlaub hätte, würde ich meine Eltern besuchen.",
      "Wenn ich Urlaub hätte, werde ich meine Eltern besuchen.",
      "Nicht real → auch im zweiten Teil Konjunktiv II: würde.",
    ),
    mc(
      "Wir ___ pünktlich, wenn der Bus nicht immer Verspätung hätte.",
      ["wären", "hätten", "würden"],
      "pünktlich sein → Konjunktiv II: wir wären.",
    ),
    gap(
      "Wenn das Wetter besser wäre, ___ wir einen Ausflug machen. (können)",
      ["könnten"],
      "Konjunktiv II von „können“ bei „wir“: könnten.",
    ),
    order(
      "An Ihrer Stelle | würde | ich | den Vertrag | genau lesen.",
      "Ratschlag: An Ihrer Stelle + würde + ich … + Infinitiv am Ende.",
    ),
    mc(
      "___ es möglich, den Termin zu verschieben?",
      ["Wäre", "Hätte", "Würde"],
      "möglich sein → Wäre es möglich …?",
    ),
    gap(
      "Ich ___ Sie bitten, mir die Unterlagen zu schicken. (werden)",
      ["würde"],
      "Höflich: Ich würde Sie bitten, …",
    ),
    fix(
      "Hätten Sie morgen Zeit für ein kurzes Gespräch?",
      "Wären Sie morgen Zeit für ein kurzes Gespräch?",
      "Zeit haben → Hätten Sie Zeit?",
    ),
    gap(
      "Wenn ich besser Deutsch sprechen ___, würde ich mich sofort bewerben. (können)",
      ["könnte"],
      "Im wenn-Satz steht das Verb am Ende: sprechen könnte.",
    ),
    mc(
      "Was bedeutet: „Wenn ich Geld hätte, würde ich umziehen.“?",
      [
        "Ich habe kein Geld und ziehe nicht um.",
        "Ich habe Geld und ziehe um.",
        "Ich bin schon umgezogen.",
      ],
      "Konjunktiv II zeigt: Das ist nicht real. In Wirklichkeit fehlt das Geld.",
    ),
  ],
});

T({
  id: "b1-passiv",
  level: "B1",
  title: "Passiv: Das Büro wird geputzt.",
  kurz: "Im Passiv ist wichtig, *was passiert* – nicht, wer es macht. Präsens: *werden* + Partizip II: Das Büro *wird* jeden Tag *geputzt*. Präteritum: *wurde* + Partizip II: Die Rechnung *wurde* gestern *bezahlt*.",
  kurz_i18n: {
    en: "In the passive the important thing is what happens – not who does it. Present: werden + past participle: Das Büro wird jeden Tag geputzt. Past: wurde + past participle: Die Rechnung wurde gestern bezahlt.",
    uk: "У пасиві важливо, що відбувається, а не хто це робить. Теперішній час: werden + Partizip II: Das Büro wird jeden Tag geputzt. Минулий час: wurde + Partizip II: Die Rechnung wurde gestern bezahlt.",
    ru: "В пассиве важно, что происходит, а не кто это делает. Настоящее время: werden + Partizip II: Das Büro wird jeden Tag geputzt. Прошедшее: wurde + Partizip II: Die Rechnung wurde gestern bezahlt.",
    ar: "في المبني للمجهول المهم هو ماذا يحدث، وليس من يفعله. المضارع: werden + Partizip II: ‏Das Büro wird jeden Tag geputzt. الماضي: wurde + Partizip II: ‏Die Rechnung wurde gestern bezahlt.",
    fa: "در مجهول مهم این است که چه اتفاقی می‌افتد، نه این‌که چه کسی انجامش می‌دهد. حال: werden + Partizip II: ‏Das Büro wird jeden Tag geputzt. گذشته: wurde + Partizip II: ‏Die Rechnung wurde gestern bezahlt.",
    tr: "Edilgen yapıda önemli olan ne olduğudur, kimin yaptığı değil. Şimdiki zaman: werden + Partizip II: Das Büro wird jeden Tag geputzt. Geçmiş: wurde + Partizip II: Die Rechnung wurde gestern bezahlt.",
    es: "En la pasiva lo importante es qué pasa, no quién lo hace. Presente: werden + participio: Das Büro wird jeden Tag geputzt. Pasado: wurde + participio: Die Rechnung wurde gestern bezahlt.",
    it: "Nel passivo conta che cosa succede, non chi lo fa. Presente: werden + participio: Das Büro wird jeden Tag geputzt. Passato: wurde + participio: Die Rechnung wurde gestern bezahlt.",
  },
  tabelle: {
    head: ["", "Präsens", "Präteritum"],
    rows: [
      ["ich", "*werde* informiert", "*wurde* informiert"],
      ["du", "*wirst* informiert", "*wurdest* informiert"],
      ["er / sie / es", "*wird* informiert", "*wurde* informiert"],
      ["wir", "*werden* informiert", "*wurden* informiert"],
      ["ihr", "*werdet* informiert", "*wurdet* informiert"],
      ["sie / Sie", "*werden* informiert", "*wurden* informiert"],
    ],
  },
  beispiele: [
    "Das Büro *wird* jeden Abend *geputzt*.",
    "Die Pakete *werden* morgen *geliefert*.",
    "Der Antrag *wurde* gestern *abgelehnt*.",
    "Ich *wurde* zum Vorstellungsgespräch *eingeladen*.",
    "Die Maschine *wird von* einem Techniker *repariert*.",
    "Wann *wurde* die Firma *gegründet*?",
  ],
  fehler: [
    [
      "Das Büro wird jeden Tag putzen.",
      "Das Büro wird jeden Tag geputzt.",
      "Passiv = werden + Partizip II (geputzt), nicht Infinitiv.",
    ],
    [
      "Die Pakete wird morgen geliefert.",
      "Die Pakete werden morgen geliefert.",
      "Die Pakete = Plural → werden.",
    ],
    [
      "Der Brief wurde von die Chefin unterschrieben.",
      "Der Brief wurde von der Chefin unterschrieben.",
      "Wer es macht, steht mit „von“ + Dativ.",
    ],
  ],
  items: [
    mc(
      "Das Büro ___ jeden Tag geputzt.",
      ["wird", "werden", "hat"],
      "Passiv: werden + Partizip II. Das Büro = Singular → wird.",
    ),
    mc(
      "Die Briefe ___ heute verschickt.",
      ["werden", "wird", "haben"],
      "Die Briefe = Plural → werden.",
    ),
    mc(
      "Hier wird ein neues Haus ___.",
      ["gebaut", "bauen", "baut"],
      "Passiv braucht das Partizip II: gebaut.",
    ),
    gap(
      "Die Rechnung ___ gestern bezahlt. (werden)",
      ["wurde"],
      "Gestern = Vergangenheit → Präteritum: wurde.",
    ),
    fix(
      "Der Kunde wird sofort informiert.",
      "Der Kunde wird sofort informieren.",
      "Passiv = werden + Partizip II: informiert.",
    ),
    gap(
      "Der Müll wird jeden Dienstag ___. (abholen)",
      ["abgeholt"],
      "Partizip II von abholen: abgeholt.",
    ),
    mc(
      "Ich ___ gestern zum Vorstellungsgespräch eingeladen.",
      ["wurde", "wurden", "werde"],
      "Gestern → Präteritum. Bei „ich“: wurde.",
    ),
    order(
      "Die Pakete | werden | morgen | geliefert.",
      "„werden“ steht auf Platz 2, das Partizip II am Ende.",
    ),
    gap(
      "In dieser Firma ___ Autoteile produziert. (werden)",
      ["werden"],
      "Autoteile = Plural → werden.",
    ),
    mc(
      "Der Antrag wurde ___ Sachbearbeiterin geprüft.",
      ["von der", "von die", "durch der"],
      "Die Person steht mit „von“ + Dativ: von der Sachbearbeiterin.",
    ),
    gap(
      "Die Prüfung wurde letzte Woche ___. (schreiben)",
      ["geschrieben"],
      "Partizip II von schreiben: geschrieben.",
    ),
    fix(
      "Die Mitarbeiter wurden gestern informiert.",
      "Die Mitarbeiter wurde gestern informiert.",
      "Die Mitarbeiter = Plural → wurden.",
    ),
    mc(
      "Aktiv: „Der Chef unterschreibt den Vertrag.“ – Passiv:",
      [
        "Der Vertrag wird vom Chef unterschrieben.",
        "Der Vertrag wurde vom Chef unterschrieben.",
        "Der Chef wird den Vertrag unterschrieben.",
      ],
      "Präsens bleibt Präsens: wird … unterschrieben. „den Vertrag“ wird zu „der Vertrag“.",
    ),
    gap(
      "Wann ___ Sie operiert? – Vor zwei Jahren. (werden)",
      ["wurden"],
      "Vor zwei Jahren → Präteritum. Bei „Sie“: wurden.",
    ),
    order(
      "Der Vertrag | wurde | gestern | unterschrieben.",
      "„wurde“ steht auf Platz 2, das Partizip II am Ende.",
    ),
    mc(
      "Aktiv: „Man eröffnete das Restaurant 2010.“ – Passiv:",
      [
        "Das Restaurant wurde 2010 eröffnet.",
        "Das Restaurant wird 2010 eröffnet.",
        "Das Restaurant hat 2010 eröffnet.",
      ],
      "Vergangenheit bleibt Vergangenheit: wurde … eröffnet. „man“ fällt weg.",
    ),
    gap(
      "Die Wohnung wurde vor dem Einzug frisch ___. (streichen)",
      ["gestrichen"],
      "Partizip II von streichen: gestrichen.",
    ),
    fix(
      "In der Kantine wird von 12 bis 14 Uhr Essen ausgegeben.",
      "In der Kantine wird von 12 bis 14 Uhr Essen ausgeben.",
      "Partizip II von ausgeben: ausgegeben.",
    ),
    mc(
      "Die neuen Kollegen ___ morgen vom Chef begrüßt.",
      ["werden", "wird", "wurden"],
      "Morgen → Präsens. Die Kollegen = Plural → werden.",
    ),
  ],
});

T({
  id: "b1-praeteritum",
  level: "B1",
  title: "Präteritum: ging, kam, machte",
  kurz: "Das Präteritum liest und schreibst du oft in Berichten, Zeitungen und Geschichten. Regelmäßige Verben: *-te*: machen → ich mach*te*. Viele häufige Verben sind unregelmäßig: gehen → *ging*, kommen → *kam*. Bei „ich“ und „er/sie“ gibt es keine weitere Endung.",
  kurz_i18n: {
    en: "You often read and write the Präteritum (simple past) in reports, newspapers and stories. Regular verbs: -te: machen → ich machte. Many common verbs are irregular: gehen → ging, kommen → kam. With ich and er/sie there is no extra ending.",
    uk: "Präteritum часто читають і пишуть у звітах, газетах та оповіданнях. Правильні дієслова: -te: machen → ich machte. Багато частих дієслів неправильні: gehen → ging, kommen → kam. З ich і er/sie немає додаткового закінчення.",
    ru: "Präteritum часто встречается в отчётах, газетах и рассказах. Правильные глаголы: -te: machen → ich machte. Многие частые глаголы неправильные: gehen → ging, kommen → kam. С ich и er/sie нет дополнительного окончания.",
    ar: "تقرأ وتكتب Präteritum (الماضي البسيط) كثيرًا في التقارير والصحف والقصص. الأفعال المنتظمة: ‎-te‏: machen ← ich machte. كثير من الأفعال الشائعة غير منتظمة: gehen ← ging, kommen ← kam. مع ich و er/sie لا توجد نهاية إضافية.",
    fa: "Präteritum (گذشتهٔ ساده) را بیشتر در گزارش‌ها، روزنامه‌ها و داستان‌ها می‌خوانی و می‌نویسی. فعل‌های باقاعده: ‎-te‏: machen ← ich machte. خیلی از فعل‌های پرکاربرد بی‌قاعده‌اند: gehen ← ging, kommen ← kam. با ich و er/sie پایانهٔ دیگری نیست.",
    tr: "Präteritum’u çoğunlukla raporlarda, gazetelerde ve hikâyelerde okur ve yazarsın. Düzenli fiiller: -te: machen → ich machte. Sık kullanılan birçok fiil düzensizdir: gehen → ging, kommen → kam. ich ve er/sie ile başka ek yoktur.",
    es: "El Präteritum se lee y se escribe sobre todo en informes, periódicos e historias. Verbos regulares: -te: machen → ich machte. Muchos verbos frecuentes son irregulares: gehen → ging, kommen → kam. Con ich y er/sie no hay otra terminación.",
    it: "Il Präteritum si legge e si scrive soprattutto in relazioni, giornali e racconti. Verbi regolari: -te: machen → ich machte. Molti verbi frequenti sono irregolari: gehen → ging, kommen → kam. Con ich e er/sie non c’è un’altra desinenza.",
  },
  tabelle: {
    head: ["Infinitiv", "ich / er / sie", "wir / sie / Sie"],
    rows: [
      ["machen", "mach*te*", "mach*ten*"],
      ["arbeiten", "arbeit*ete*", "arbeit*eten*"],
      ["gehen", "*ging*", "*gingen*"],
      ["kommen", "*kam*", "*kamen*"],
      ["geben", "*gab*", "*gaben*"],
      ["sehen", "*sah*", "*sahen*"],
      ["finden", "*fand*", "*fanden*"],
      ["wissen", "*wusste*", "*wussten*"],
      ["müssen", "*musste*", "*mussten*"],
      ["können", "*konnte*", "*konnten*"],
    ],
  },
  beispiele: [
    "Vor zehn Jahren *kam* ich nach Deutschland.",
    "Zuerst *arbeitete* ich in einem Restaurant.",
    "Am Anfang *konnte* ich kein Deutsch.",
    "Wir *gingen* jeden Tag zum Sprachkurs.",
    "Die Firma *suchte* neue Mitarbeiter.",
    "Es *gab* viele Bewerber.",
  ],
  fehler: [
    [
      "Er gingte zur Arbeit.",
      "Er ging zur Arbeit.",
      "Unregelmäßige Verben haben kein -te: ging, kam, sah.",
    ],
    [
      "Sie kamt um 8 Uhr.",
      "Sie kam um 8 Uhr.",
      "Bei „ich“ und „er/sie“ gibt es keine Endung: ich kam, sie kam.",
    ],
    [
      "Er arbeitte in einer Bäckerei.",
      "Er arbeitete in einer Bäckerei.",
      "Nach t oder d kommt -ete: arbeitete, wartete.",
    ],
  ],
  items: [
    mc(
      "Vor fünf Jahren ___ ich nach Deutschland.",
      ["kam", "kamte", "kamst"],
      "kommen ist unregelmäßig: ich kam (ohne Endung).",
    ),
    mc(
      "Zuerst ___ er in einer Bäckerei.",
      ["arbeitete", "arbeitte", "arbeiteten"],
      "Nach t kommt -ete: er arbeitete.",
    ),
    mc(
      "Am ersten Tag ___ wir zusammen ins Büro.",
      ["gingen", "gingten", "ging"],
      "gehen → ging. Bei „wir“: gingen.",
    ),
    gap(
      "Die Chefin ___ uns die neuen Regeln. (erklären)",
      ["erklärte"],
      "Regelmäßig: erklären → sie erklärte.",
    ),
    gap(
      "Früher ___ ich jeden Tag zwei Stunden mit dem Bus fahren. (müssen)",
      ["musste"],
      "müssen → ich musste (ohne ü).",
    ),
    fix(
      "Er ging zu Fuß zur Arbeit.",
      "Er gingte zu Fuß zur Arbeit.",
      "gehen ist unregelmäßig: er ging, ohne -te.",
    ),
    mc(
      "In der Firma ___ es eine Kantine.",
      ["gab", "gabt", "gebte"],
      "es gibt → es gab.",
    ),
    gap(
      "Als Kind ___ ich noch kein Deutsch. (können)",
      ["konnte"],
      "können → ich konnte (ohne ö).",
    ),
    order(
      "Im Jahr 2015 | kam | meine Familie | nach Deutschland.",
      "Das Verb steht auf Platz 2: Im Jahr 2015 kam …",
    ),
    mc(
      "Sie ___ lange keine Wohnung.",
      ["fand", "findete", "fanden"],
      "finden → sie fand (eine Person, ohne Endung).",
    ),
    gap(
      "Nach der Schule ___ sie eine Ausbildung als Pflegefachfrau. (machen)",
      ["machte"],
      "Regelmäßig: machen → sie machte.",
    ),
    gap(
      "Wir ___ die Stellenanzeige in der Zeitung. (sehen)",
      ["sahen"],
      "sehen → sah. Bei „wir“: sahen.",
    ),
    fix(
      "Ich wusste die Antwort nicht.",
      "Ich wisste die Antwort nicht.",
      "wissen → ich wusste (mit u).",
    ),
    mc(
      "Der Zug ___ um 7.15 Uhr ab.",
      ["fuhr", "fahrte", "fuhrt"],
      "abfahren → der Zug fuhr ab.",
    ),
    gap(
      "Das Gespräch ___ um 10 Uhr und dauerte eine Stunde. (beginnen)",
      ["begann"],
      "beginnen → es begann.",
    ),
    order(
      "Danach | schrieb | er | viele Bewerbungen.",
      "Das Verb steht auf Platz 2: Danach schrieb er …",
    ),
    mc(
      "Die Kollegen ___ mir am Anfang sehr.",
      ["halfen", "helften", "half"],
      "helfen → half. Die Kollegen = Plural: halfen.",
    ),
    gap(
      "Sie ___ drei Jahre in Hamburg, dann zog sie nach Köln. (bleiben)",
      ["blieb"],
      "bleiben → sie blieb.",
    ),
    fix(
      "Wir sprachen lange über das Problem.",
      "Wir sprechten lange über das Problem.",
      "sprechen ist unregelmäßig: wir sprachen.",
    ),
    gap(
      "Er ___ die Stelle, weil er gute Zeugnisse hatte. (bekommen)",
      ["bekam"],
      "bekommen → er bekam (wie kommen → kam).",
    ),
  ],
});

T({
  id: "b1-genitiv",
  level: "B1",
  title: "Genitiv: wegen des Wetters, trotz der Probleme",
  kurz: "Der Genitiv antwortet auf „Wessen?“ – zu wem gehört etwas? das Auto *des* Chef*s*, die Tasche *der* Kollegin. der/das → *des* (+ *-s* oder *-es* am Nomen), die und Plural → *der*. Auch nach *wegen, trotz, während* steht der Genitiv.",
  kurz_i18n: {
    en: "The genitive answers “Whose?”: das Auto des Chefs (the boss’s car), die Tasche der Kollegin. der/das → des (+ -s or -es on the noun), die and plural → der. The genitive also follows wegen (because of), trotz (despite), während (during).",
    uk: "Genitiv відповідає на питання «Чий?»: das Auto des Chefs (машина шефа), die Tasche der Kollegin. der/das → des (+ -s або -es до іменника), die і множина → der. Genitiv стоїть також після wegen (через), trotz (попри), während (під час).",
    ru: "Genitiv отвечает на вопрос «Чей?»: das Auto des Chefs (машина шефа), die Tasche der Kollegin. der/das → des (+ -s или -es у существительного), die и множественное число → der. Genitiv стоит также после wegen (из-за), trotz (несмотря на), während (во время).",
    ar: "يجيب Genitiv عن السؤال «لمن؟»: das Auto des Chefs (سيارة المدير)، die Tasche der Kollegin. ‏der/das ← des (+ ‎-s أو ‎-es في آخر الاسم)، die والجمع ← der. يأتي Genitiv أيضًا بعد wegen (بسبب)، trotz (رغم)، während (أثناء).",
    fa: "Genitiv به پرسش «مالِ چه کسی؟» جواب می‌دهد: das Auto des Chefs (ماشینِ رئیس)، die Tasche der Kollegin. ‏der/das ← des (+ ‎-s یا ‎-es در آخر اسم)، die و جمع ← der. بعد از wegen (به‌خاطر)، trotz (با وجود)، während (در طولِ) هم Genitiv می‌آید.",
    tr: "Genitiv “Kimin?” sorusuna cevap verir: das Auto des Chefs (şefin arabası), die Tasche der Kollegin. der/das → des (+ isimde -s veya -es), die ve çoğul → der. wegen (yüzünden), trotz (-e rağmen), während (sırasında) sonrası da Genitiv gelir.",
    es: "El genitivo responde a «¿De quién?»: das Auto des Chefs (el coche del jefe), die Tasche der Kollegin. der/das → des (+ -s o -es en el sustantivo), die y plural → der. También va después de wegen (a causa de), trotz (a pesar de), während (durante).",
    it: "Il genitivo risponde a «Di chi?»: das Auto des Chefs (l’auto del capo), die Tasche der Kollegin. der/das → des (+ -s o -es sul nome), die e plurale → der. Si usa anche dopo wegen (a causa di), trotz (nonostante), während (durante).",
  },
  tabelle: {
    head: ["", "der", "das", "die", "Plural"],
    rows: [
      [
        "der …",
        "*des* Chef*s*",
        "*des* Büro*s*",
        "*der* Firma",
        "*der* Kollegen",
      ],
      [
        "ein …",
        "*eines* Chef*s*",
        "*eines* Büro*s*",
        "*einer* Firma",
        "von Kollegen",
      ],
      [
        "mein …",
        "*meines* Chef*s*",
        "*meines* Büro*s*",
        "*meiner* Firma",
        "*meiner* Kollegen",
      ],
    ],
  },
  beispiele: [
    "Das ist das Büro *des Chefs*.",
    "Die Adresse *der Firma* steht im Brief.",
    "*Wegen des* schlechten *Wetters* fällt der Ausflug aus.",
    "*Trotz der* Erkältung ging er zur Arbeit.",
    "*Während der* Arbeitszeit darf man nicht privat telefonieren.",
    "Der Name *meiner Kollegin* ist Elif.",
  ],
  fehler: [
    [
      "Das ist das Büro des Chef.",
      "Das ist das Büro des Chefs.",
      "Bei der/das bekommt auch das Nomen -s oder -es.",
    ],
    [
      "Wegen die Baustelle kommt der Bus später.",
      "Wegen der Baustelle kommt der Bus später.",
      "Nach „wegen“: die → der.",
    ],
    [
      "Trotz das schlechte Wetter kamen alle.",
      "Trotz des schlechten Wetters kamen alle.",
      "Nach „trotz“: das → des, Adjektiv mit -en, Nomen mit -s.",
    ],
  ],
  items: [
    mc(
      "Das ist das Auto ___ Chefs.",
      ["des", "dem", "der"],
      "der Chef → des Chefs.",
    ),
    mc(
      "Die Adresse ___ Firma steht auf dem Brief.",
      ["der", "des", "die"],
      "die Firma → der Firma.",
    ),
    mc(
      "Wegen ___ Streiks fahren heute keine Busse.",
      ["des", "dem", "der"],
      "Nach „wegen“ steht der Genitiv: der Streik → des Streiks.",
    ),
    gap(
      "Das ist die Tasche ___ Kollegin. (die)",
      ["der"],
      "die Kollegin → der Kollegin.",
    ),
    gap(
      "Am Ende ___ Monats bekomme ich mein Gehalt. (der)",
      ["des"],
      "der Monat → des Monats.",
    ),
    fix(
      "Das ist das Büro des Chefs.",
      "Das ist das Büro des Chef.",
      "Bei der/das bekommt das Nomen -s: des Chefs.",
    ),
    mc(
      "Trotz ___ Regens gingen wir spazieren.",
      ["des", "dem", "den"],
      "Nach „trotz“ steht der Genitiv: der Regen → des Regens.",
    ),
    gap(
      "Während ___ Pause sprechen wir über das Wochenende. (die)",
      ["der"],
      "Nach „während“: die Pause → der Pause.",
    ),
    order(
      "Das | ist | die Meinung | der Kollegen.",
      "Der Genitiv steht nach dem Nomen: die Meinung der Kollegen.",
    ),
    gap(
      "Die Kinder ___ Nachbarin gehen in dieselbe Kita. (meine)",
      ["meiner"],
      "die Nachbarin → meiner Nachbarin.",
    ),
    mc(
      "Während ___ Arbeitszeit sind private Telefonate nicht erlaubt.",
      ["der", "des", "dem"],
      "die Arbeitszeit → während der Arbeitszeit.",
    ),
    fix(
      "Wegen der Baustelle kommt der Bus später.",
      "Wegen die Baustelle kommt der Bus später.",
      "Nach „wegen“: die Baustelle → der Baustelle.",
    ),
    gap(
      "Trotz ___ Probleme hat das Team das Projekt pünktlich beendet. (die, Plural)",
      ["der"],
      "Plural im Genitiv: der Probleme.",
    ),
    gap(
      "Der Name ___ Arztes steht auf dem Rezept. (der)",
      ["des"],
      "der Arzt → des Arztes.",
    ),
    mc(
      "Die Öffnungszeiten ___ finden Sie im Internet.",
      ["des Amtes", "dem Amt", "des Amt"],
      "das Amt → des Amtes. Das Nomen bekommt -es.",
    ),
    order(
      "Wegen einer Erkältung | konnte | sie | nicht | arbeiten.",
      "Nach „Wegen einer Erkältung“ kommt sofort das Verb.",
    ),
    gap(
      "Das ist die Unterschrift ___ Chefs. (mein)",
      ["meines"],
      "der Chef → meines Chefs.",
    ),
    mc(
      "Wie heißt der Genitiv von „der Kunde“?",
      ["des Kunden", "des Kundes", "der Kunde"],
      "Einige „der“-Wörter (Kunde, Kollege, Herr) bekommen -n statt -s.",
    ),
    fix(
      "Trotz des schlechten Wetters kamen alle pünktlich.",
      "Trotz das schlechte Wetter kamen alle pünktlich.",
      "Nach „trotz“ steht der Genitiv: des schlechten Wetters.",
    ),
  ],
});
/* ===================== B2 ===================== */
T({
  id: "b2-indirekte-rede",
  level: "B2",
  title: "Indirekte Rede: Er sagt, er habe keine Zeit.",
  kurz: "Du gibst wieder, was eine andere Person gesagt hat – neutral, ohne eigene Meinung. In formellen Texten steht dafür der Konjunktiv I: Er sagt, er *habe* keine Zeit. Sie sagt, sie *sei* krank. Sieht die Form aus wie das normale Präsens (sie haben), nimmt man den Konjunktiv II: sie *hätten*.",
  kurz_i18n: {
    en: "You report what another person said – neutrally, without your own opinion. Formal texts use Konjunktiv I for this: Er sagt, er habe keine Zeit. Sie sagt, sie sei krank. If the form looks like the normal present (sie haben), Konjunktiv II is used instead: sie hätten.",
    uk: "Ти передаєш слова іншої людини – нейтрально, без власної оцінки. У формальних текстах для цього вживають Konjunktiv I: Er sagt, er habe keine Zeit. Sie sagt, sie sei krank. Якщо форма збігається зі звичайним Präsens (sie haben), беруть Konjunktiv II: sie hätten.",
    ru: "Ты передаёшь слова другого человека – нейтрально, без своей оценки. В официальных текстах для этого используют Konjunktiv I: Er sagt, er habe keine Zeit. Sie sagt, sie sei krank. Если форма совпадает с обычным Präsens (sie haben), берут Konjunktiv II: sie hätten.",
    ar: "تنقل ما قاله شخص آخر بشكل محايد ودون رأيك. في النصوص الرسمية يُستعمل لذلك Konjunktiv I: ‏Er sagt, er habe keine Zeit. Sie sagt, sie sei krank. إذا كانت الصيغة مثل المضارع العادي (sie haben) يُستعمل Konjunktiv II: ‏sie hätten.",
    fa: "حرف شخص دیگری را بی‌طرفانه و بدون نظر خودت نقل می‌کنی. در متن‌های رسمی برای این کار Konjunktiv I می‌آید: Er sagt, er habe keine Zeit. Sie sagt, sie sei krank. اگر شکل فعل مثل زمان حال عادی باشد (sie haben)، از Konjunktiv II استفاده می‌شود: sie hätten.",
    tr: "Başka birinin söylediğini tarafsızca, kendi yorumun olmadan aktarırsın. Resmî metinlerde bunun için Konjunktiv I kullanılır: Er sagt, er habe keine Zeit. Sie sagt, sie sei krank. Biçim normal şimdiki zamanla aynıysa (sie haben) Konjunktiv II alınır: sie hätten.",
    es: "Reproduces lo que dijo otra persona de forma neutral, sin tu opinión. En textos formales se usa el Konjunktiv I: Er sagt, er habe keine Zeit. Sie sagt, sie sei krank. Si la forma es igual al presente normal (sie haben), se usa el Konjunktiv II: sie hätten.",
    it: "Riporti quello che ha detto un’altra persona in modo neutrale, senza la tua opinione. Nei testi formali si usa il Konjunktiv I: Er sagt, er habe keine Zeit. Sie sagt, sie sei krank. Se la forma è uguale al presente normale (sie haben), si usa il Konjunktiv II: sie hätten.",
  },
  tabelle: {
    head: ["", "er / sie / es", "sie (Plural)"],
    rows: [
      ["sein", "*sei*", "*seien*"],
      ["haben", "*habe*", "*hätten*"],
      ["werden", "*werde*", "*würden*"],
      ["können", "*könne*", "*könnten*"],
      ["müssen", "*müsse*", "*müssten*"],
      ["kommen", "*komme*", "*kämen*"],
    ],
  },
  beispiele: [
    "Der Chef sagt, er *habe* heute keine Zeit.",
    "Die Sprecherin erklärte, die Firma *sei* gut vorbereitet.",
    "Der Minister betonte, man *müsse* schnell handeln.",
    "Die Mitarbeiter sagten, sie *hätten* zu viel Arbeit.",
    "Die Kundin schreibt, die Ware *sei* beschädigt *angekommen*.",
    "Er fragte, ob ich morgen kommen *könne*.",
  ],
  fehler: [
    [
      "Der Sprecher erklärte, die Lage seien stabil.",
      "Der Sprecher erklärte, die Lage sei stabil.",
      "die Lage = Singular → sei. „seien“ ist Plural.",
    ],
    [
      "Die Kollegen sagten, sie haben keine Zeit.",
      "Die Kollegen sagten, sie hätten keine Zeit.",
      "Im Bericht: „haben“ sieht aus wie Präsens → Ersatzform „hätten“.",
    ],
    [
      "Lea sagt, ich komme später. (Lea: „Ich komme später.“)",
      "Lea sagt, sie komme später.",
      "Das Pronomen wechselt: ich → sie.",
    ],
  ],
  items: [
    mc(
      "Der Chef sagt, er ___ heute keine Zeit.",
      ["habe", "haben", "habt"],
      "Konjunktiv I von „haben“ bei er/sie: habe.",
    ),
    mc(
      "Die Ärztin sagt, der Patient ___ wieder gesund.",
      ["sei", "seien", "wären"],
      "Konjunktiv I von „sein“ im Singular: sei.",
    ),
    mc(
      "Die Firma teilt mit, das Produkt ___ nächste Woche geliefert.",
      ["werde", "werden", "würden"],
      "Konjunktiv I von „werden“ im Singular: werde.",
    ),
    gap(
      "Direkt: „Ich bin krank.“ – Indirekt: Er sagt, er ___ krank.",
      ["sei"],
      "bin → Konjunktiv I: er sei.",
    ),
    gap(
      "Direkt: „Ich habe keine Zeit.“ – Indirekt: Sie sagt, sie ___ keine Zeit.",
      ["habe"],
      "habe (ich) → Konjunktiv I: sie habe.",
    ),
    fix(
      "Der Sprecher erklärte, die Lage sei stabil.",
      "Der Sprecher erklärte, die Lage seien stabil.",
      "die Lage = Singular → sei.",
    ),
    mc(
      "Die Mitarbeiter sagen, sie ___ zu wenig Zeit.",
      ["hätten", "habe", "sei"],
      "Plural: „haben“ wäre wie Präsens → Ersatzform hätten.",
    ),
    gap(
      "Direkt: „Wir müssen sparen.“ – Indirekt: Die Chefin betont, man ___ sparen.",
      ["müsse"],
      "Konjunktiv I von „müssen“ bei man/er/sie: müsse.",
    ),
    order(
      "Er | sagt, | er | habe | den Brief | nicht bekommen.",
      "Vergangenheit in der indirekten Rede: habe + Partizip II.",
    ),
    mc(
      "Direkt: „Ich kann morgen nicht kommen.“ – Indirekt: Frau Kaya sagt, …",
      [
        "sie könne morgen nicht kommen.",
        "ich könne morgen nicht kommen.",
        "sie könnten morgen nicht kommen.",
      ],
      "ich → sie (Frau Kaya); kann → Konjunktiv I: könne.",
    ),
    gap(
      "Direkt: „Die Ware ist gestern angekommen.“ – Indirekt: Der Kunde schreibt, die Ware ___ gestern angekommen.",
      ["sei"],
      "ist angekommen → sei angekommen.",
    ),
    mc(
      "Direkt: „Ich habe die Rechnung bezahlt.“ – Indirekt: Er behauptet, …",
      [
        "er habe die Rechnung bezahlt.",
        "er habe die Rechnung bezahlen.",
        "er sei die Rechnung bezahlt.",
      ],
      "Vergangenheit: habe + Partizip II (bezahlt).",
    ),
    fix(
      "Die Kollegen sagten, sie hätten die E-Mail nicht bekommen.",
      "Die Kollegen sagten, sie habe die E-Mail nicht bekommen.",
      "sie = Plural → Ersatzform hätten. „habe“ ist Singular.",
    ),
    gap(
      "Direkt: „Kommen Sie morgen?“ – Indirekt: Er fragt, ___ ich morgen komme.",
      ["ob"],
      "Ja/Nein-Frage → indirekte Frage mit „ob“.",
    ),
    mc(
      "Direkt: „Wann beginnt die Schulung?“ – Indirekt: Sie möchte wissen, …",
      [
        "wann die Schulung beginne.",
        "ob die Schulung beginne.",
        "wann beginne die Schulung.",
      ],
      "Das Fragewort bleibt, das Verb geht ans Ende.",
    ),
    gap(
      "Direkt: „Der Vertrag wird morgen unterschrieben.“ – Indirekt: Die Sprecherin sagt, der Vertrag ___ morgen unterschrieben.",
      ["werde"],
      "wird → Konjunktiv I: werde.",
    ),
    order(
      "Die Ministerin | betonte, | man | müsse | jetzt | handeln.",
      "Nach dem Komma: Person + Konjunktiv I auf Platz 2, Infinitiv am Ende.",
    ),
    gap(
      "Direkt: „Wir kommen später.“ – Indirekt: Die Gäste sagen, sie ___ später. (Ersatzform: Konjunktiv II)",
      ["kämen"],
      "„kommen“ wäre wie Präsens → Konjunktiv II: kämen.",
    ),
    mc(
      "Warum steht in Zeitungen oft der Konjunktiv I?",
      [
        "Man gibt neutral wieder, was jemand gesagt hat.",
        "Man zeigt, dass die Aussage sicher falsch ist.",
        "Man spricht über die Zukunft.",
      ],
      "Der Konjunktiv I zeigt nur: Das hat jemand anderes gesagt.",
    ),
    fix(
      "Er sagte, er wisse nichts von dem Problem.",
      "Er sagte, er wissen nichts von dem Problem.",
      "Konjunktiv I von „wissen“ bei er/sie: wisse.",
    ),
  ],
});

T({
  id: "b2-nominalisierung",
  level: "B2",
  title: "Nominalisierung: weil es regnet → wegen des Regens",
  kurz: "In formellen Texten wird aus einem Verb oder Adjektiv oft ein Nomen: prüfen → *die Prüfung*, pünktlich → *die Pünktlichkeit*. Aus einem Nebensatz wird dann eine Wortgruppe mit Präposition: *Weil* es regnet, … → *Wegen des Regens* …",
  kurz_i18n: {
    en: "In formal texts a verb or adjective often becomes a noun: prüfen → die Prüfung, pünktlich → die Pünktlichkeit. A subordinate clause then becomes a phrase with a preposition: Weil es regnet, … → Wegen des Regens … (because of the rain).",
    uk: "У формальних текстах дієслово або прикметник часто стає іменником: prüfen → die Prüfung, pünktlich → die Pünktlichkeit. Тоді підрядне речення стає групою слів із прийменником: Weil es regnet, … → Wegen des Regens … (через дощ).",
    ru: "В официальных текстах глагол или прилагательное часто становится существительным: prüfen → die Prüfung, pünktlich → die Pünktlichkeit. Тогда придаточное предложение превращается в группу слов с предлогом: Weil es regnet, … → Wegen des Regens … (из-за дождя).",
    ar: "في النصوص الرسمية يتحوّل الفعل أو الصفة كثيرًا إلى اسم: prüfen ← die Prüfung, pünktlich ← die Pünktlichkeit. عندها تتحوّل الجملة الفرعية إلى مجموعة كلمات مع حرف جر: Weil es regnet, … ← Wegen des Regens … (بسبب المطر).",
    fa: "در متن‌های رسمی، فعل یا صفت اغلب به اسم تبدیل می‌شود: prüfen ← die Prüfung, pünktlich ← die Pünktlichkeit. آن‌وقت جملهٔ پیرو به یک گروه کلمه با حرف اضافه تبدیل می‌شود: Weil es regnet, … ← Wegen des Regens … (به‌خاطر باران).",
    tr: "Resmî metinlerde fiil veya sıfat çoğu zaman isme dönüşür: prüfen → die Prüfung, pünktlich → die Pünktlichkeit. O zaman yan cümle, edatlı bir söz grubuna dönüşür: Weil es regnet, … → Wegen des Regens … (yağmur yüzünden).",
    es: "En textos formales un verbo o adjetivo se convierte a menudo en sustantivo: prüfen → die Prüfung, pünktlich → die Pünktlichkeit. La oración subordinada pasa a ser un grupo con preposición: Weil es regnet, … → Wegen des Regens … (a causa de la lluvia).",
    it: "Nei testi formali un verbo o un aggettivo diventa spesso un nome: prüfen → die Prüfung, pünktlich → die Pünktlichkeit. La frase secondaria diventa allora un gruppo con preposizione: Weil es regnet, … → Wegen des Regens … (a causa della pioggia).",
  },
  tabelle: {
    head: ["Nebensatz mit …", "Präposition", "Beispiel"],
    rows: [
      ["weil", "*wegen / aufgrund* + Genitiv", "wegen der Verspätung"],
      ["obwohl", "*trotz* + Genitiv", "trotz des Regens"],
      ["wenn", "*bei* + Dativ", "bei Fragen"],
      ["nachdem", "*nach* + Dativ", "nach der Prüfung"],
      ["bevor", "*vor* + Dativ", "vor der Abreise"],
      ["während", "*während* + Genitiv", "während des Studiums"],
      ["um … zu / damit", "*zu* + Dativ", "zur Verbesserung"],
    ],
  },
  beispiele: [
    "*Wegen der Verspätung* des Zuges kam ich zu spät.",
    "*Trotz seiner Krankheit* arbeitete er weiter.",
    "*Bei Fragen* wenden Sie sich bitte an Frau Scholz.",
    "*Nach der Prüfung* erhalten Sie das Ergebnis per Post.",
    "Wir bitten um schnelle *Bearbeitung des Antrags*.",
    "*Zur Verbesserung* ihrer Sprachkenntnisse besucht sie einen Kurs.",
  ],
  fehler: [
    [
      "Wegen es regnet, bleiben wir zu Hause.",
      "Wegen des Regens bleiben wir zu Hause.",
      "Nach einer Präposition steht ein Nomen, kein Satz.",
    ],
    [
      "Wir bitten um Bearbeitung den Antrag.",
      "Wir bitten um Bearbeitung des Antrags.",
      "Das Objekt des Verbs steht beim Nomen im Genitiv.",
    ],
    [
      "Bei die Ankunft zeigen Sie bitte Ihren Ausweis.",
      "Bei der Ankunft zeigen Sie bitte Ihren Ausweis.",
      "Nach „bei“ steht der Dativ: die → der.",
    ],
  ],
  items: [
    mc(
      "Welches Nomen gehört zu „anmelden“?",
      ["die Anmeldung", "die Anmeldigkeit", "die Anmeldnis"],
      "Viele Verben bilden das Nomen mit -ung: die Anmeldung.",
    ),
    mc(
      "Welches Nomen gehört zu „pünktlich“?",
      ["die Pünktlichkeit", "die Pünktlichung", "die Pünktlichheit"],
      "Adjektive auf -lich bilden das Nomen mit -keit.",
    ),
    mc(
      "Weil es regnet, bleiben wir zu Hause. → ___ des Regens bleiben wir zu Hause.",
      ["Wegen", "Trotz", "Während"],
      "weil = Grund → wegen + Genitiv.",
    ),
    gap(
      "entscheiden → die ___",
      ["Entscheidung"],
      "entscheiden → die Entscheidung (mit -ung).",
    ),
    gap(
      "Obwohl es regnete, kamen alle. → ___ des Regens kamen alle.",
      ["Trotz"],
      "obwohl = Gegengrund → trotz + Genitiv.",
    ),
    fix(
      "Wegen der Verspätung kam ich zu spät.",
      "Wegen der Zug hatte Verspätung, kam ich zu spät.",
      "Nach „wegen“ steht ein Nomen im Genitiv, kein ganzer Satz.",
    ),
    mc(
      "Wenn Sie Fragen haben, rufen Sie bitte an. → ___ Fragen rufen Sie bitte an.",
      ["Bei", "Wegen", "Trotz"],
      "wenn (Bedingung) → bei + Dativ: bei Fragen.",
    ),
    gap(
      "Nachdem der Kurs geendet hat, bekommen Sie ein Zertifikat. → Nach dem ___ des Kurses bekommen Sie ein Zertifikat.",
      ["Ende"],
      "enden → das Ende.",
    ),
    mc(
      "Wir danken Ihnen dafür, dass Sie uns unterstützen. → Wir danken Ihnen für ___.",
      ["Ihre Unterstützung", "Ihrer Unterstützung", "Sie unterstützen"],
      "für + Akkusativ: für Ihre Unterstützung.",
    ),
    gap(
      "ankommen → die ___",
      ["Ankunft"],
      "ankommen → die Ankunft (unregelmäßig).",
    ),
    order(
      "Wegen einer Störung | fällt | der Unterricht | aus.",
      "Nach der Wortgruppe mit „wegen“ kommt sofort das Verb.",
    ),
    mc(
      "Bevor Sie abreisen, geben Sie bitte den Schlüssel ab. → ___ geben Sie bitte den Schlüssel ab.",
      ["Vor Ihrer Abreise", "Vor Ihre Abreise", "Bevor Ihrer Abreise"],
      "bevor → vor + Dativ: vor Ihrer Abreise.",
    ),
    gap(
      "Man prüft den Antrag. → die Prüfung ___ Antrags",
      ["des"],
      "Das Objekt (den Antrag) wird zum Genitiv: des Antrags.",
    ),
    fix(
      "Wir bitten um schnelle Bearbeitung des Antrags.",
      "Wir bitten um schnelle Bearbeitung den Antrag.",
      "Beim Nomen steht das Objekt im Genitiv: des Antrags.",
    ),
    mc(
      "Während er studierte, arbeitete er im Restaurant. → ___ arbeitete er im Restaurant.",
      ["Während seines Studiums", "Während sein Studium", "Während er Studium"],
      "während + Genitiv: während seines Studiums.",
    ),
    gap("teilnehmen → die ___", ["Teilnahme"], "teilnehmen → die Teilnahme."),
    mc(
      "Um die Qualität zu verbessern, führen wir Tests durch. → ___ führen wir Tests durch.",
      [
        "Zur Verbesserung der Qualität",
        "Zu verbessern die Qualität",
        "Wegen Verbesserung die Qualität",
      ],
      "um … zu (Ziel) → zu + Nomen: zur Verbesserung + Genitiv.",
    ),
    gap(
      "Weil er krank war, konnte er nicht arbeiten. → Wegen seiner ___ konnte er nicht arbeiten.",
      ["Krankheit", "Erkrankung"],
      "krank → die Krankheit.",
    ),
    order(
      "Nach der Besprechung | schickte | sie | allen | das Protokoll.",
      "Nach der Wortgruppe mit „nach“ kommt sofort das Verb.",
    ),
    fix(
      "Trotz seiner guten Zeugnisse bekam er die Stelle nicht.",
      "Trotz er gute Zeugnisse hatte, bekam er die Stelle nicht.",
      "Nach „trotz“ steht ein Nomen im Genitiv. Mit Satz: obwohl.",
    ),
  ],
});

T({
  id: "b2-passiv-modalverb",
  level: "B2",
  title: "Passiv mit Modalverb und Passiversatz",
  kurz: "Passiv mit Modalverb: Modalverb + Partizip II + *werden*: Der Antrag *muss* bis Freitag *abgegeben werden*. Dasselbe kann man anders sagen: Der Antrag *ist* bis Freitag *abzugeben*. Das Problem *lässt sich* lösen. Das Problem ist lös*bar*.",
  kurz_i18n: {
    en: "Passive with a modal verb: modal verb + past participle + werden: Der Antrag muss bis Freitag abgegeben werden. You can say the same in other ways: Der Antrag ist bis Freitag abzugeben. Das Problem lässt sich lösen. Das Problem ist lösbar.",
    uk: "Пасив з модальним дієсловом: модальне дієслово + Partizip II + werden: Der Antrag muss bis Freitag abgegeben werden. Те саме можна сказати інакше: Der Antrag ist bis Freitag abzugeben. Das Problem lässt sich lösen. Das Problem ist lösbar.",
    ru: "Пассив с модальным глаголом: модальный глагол + Partizip II + werden: Der Antrag muss bis Freitag abgegeben werden. То же самое можно сказать иначе: Der Antrag ist bis Freitag abzugeben. Das Problem lässt sich lösen. Das Problem ist lösbar.",
    ar: "المبني للمجهول مع فعل مساعد: الفعل المساعد + Partizip II + werden: ‏Der Antrag muss bis Freitag abgegeben werden. يمكن قول الشيء نفسه بطرق أخرى: Der Antrag ist bis Freitag abzugeben. Das Problem lässt sich lösen. Das Problem ist lösbar.",
    fa: "مجهول با فعل کمکی: فعل کمکی + Partizip II + werden: ‏Der Antrag muss bis Freitag abgegeben werden. همین را می‌شود جور دیگری هم گفت: Der Antrag ist bis Freitag abzugeben. Das Problem lässt sich lösen. Das Problem ist lösbar.",
    tr: "Modal fiille edilgen yapı: modal fiil + Partizip II + werden: Der Antrag muss bis Freitag abgegeben werden. Aynı şey başka biçimlerde de söylenir: Der Antrag ist bis Freitag abzugeben. Das Problem lässt sich lösen. Das Problem ist lösbar.",
    es: "Pasiva con verbo modal: verbo modal + participio + werden: Der Antrag muss bis Freitag abgegeben werden. Lo mismo se puede decir de otra forma: Der Antrag ist bis Freitag abzugeben. Das Problem lässt sich lösen. Das Problem ist lösbar.",
    it: "Passivo con verbo modale: verbo modale + participio + werden: Der Antrag muss bis Freitag abgegeben werden. Lo stesso si può dire in altri modi: Der Antrag ist bis Freitag abzugeben. Das Problem lässt sich lösen. Das Problem ist lösbar.",
  },
  tabelle: {
    head: ["Form", "Beispiel", "bedeutet"],
    rows: [
      [
        "Modalverb + Partizip II + *werden*",
        "Das Gerät kann repariert *werden*.",
        "–",
      ],
      [
        "*sein* + *zu* + Infinitiv",
        "Das Formular *ist* aus*zu*füllen.",
        "muss / kann … werden",
      ],
      [
        "*sich lassen* + Infinitiv",
        "Das Gerät *lässt sich* reparieren.",
        "kann … werden",
      ],
      ["Adjektiv mit *-bar*", "Das Gerät ist reparier*bar*.", "kann … werden"],
      ["*man* + Aktiv", "*Man* kann das Gerät reparieren.", "kann … werden"],
    ],
  },
  beispiele: [
    "Die Rechnung *muss* bis Montag *bezahlt werden*.",
    "Das Problem *kann* schnell *gelöst werden*.",
    "Hier *darf* nicht *geraucht werden*.",
    "Die Unterlagen *sind* bis Freitag *einzureichen*.",
    "Der Termin *lässt sich* leider nicht *verschieben*.",
    "Die Schrift ist gut *lesbar*.",
  ],
  fehler: [
    [
      "Der Antrag muss abgeben werden.",
      "Der Antrag muss abgegeben werden.",
      "Vor „werden“ steht das Partizip II, nicht der Infinitiv.",
    ],
    [
      "Die Rechnung muss werden bezahlt.",
      "Die Rechnung muss bezahlt werden.",
      "„werden“ steht ganz am Ende, das Partizip II davor.",
    ],
    [
      "Das Formular ist zu ausfüllen.",
      "Das Formular ist auszufüllen.",
      "Bei trennbaren Verben steht „zu“ in der Mitte: aus-zu-füllen.",
    ],
  ],
  items: [
    mc(
      "Die Rechnung muss bis Montag ___.",
      ["bezahlt werden", "bezahlen werden", "werden bezahlt"],
      "Modalverb + Partizip II + werden: bezahlt werden.",
    ),
    mc(
      "Das Gerät kann nicht mehr ___ werden.",
      ["repariert", "reparieren", "reparierte"],
      "Vor „werden“ steht das Partizip II: repariert.",
    ),
    mc(
      "In der Werkstatt ___ Schutzkleidung getragen werden.",
      ["muss", "müssen", "musst"],
      "Schutzkleidung = Singular → muss.",
    ),
    gap(
      "Der Antrag muss persönlich ___ werden. (abgeben)",
      ["abgegeben"],
      "Partizip II von abgeben: abgegeben.",
    ),
    fix(
      "Die Tür muss abgeschlossen werden.",
      "Die Tür muss werden abgeschlossen.",
      "„werden“ steht am Ende, das Partizip II davor.",
    ),
    gap(
      "Hier darf nicht ___ werden. (parken)",
      ["geparkt"],
      "Partizip II von parken: geparkt.",
    ),
    mc(
      "„Das Formular ist auszufüllen.“ bedeutet:",
      [
        "Das Formular muss ausgefüllt werden.",
        "Das Formular wurde ausgefüllt.",
        "Das Formular darf nicht ausgefüllt werden.",
      ],
      "sein + zu + Infinitiv drückt hier eine Pflicht aus: muss … werden.",
    ),
    gap(
      "Das Problem lässt ___ leicht lösen.",
      ["sich"],
      "sich lassen + Infinitiv = kann … werden.",
    ),
    order(
      "Die Unterlagen | müssen | bis Freitag | eingereicht | werden.",
      "Modalverb auf Platz 2, am Ende: Partizip II + werden.",
    ),
    mc(
      "„Das Gerät lässt sich reparieren.“ bedeutet:",
      [
        "Das Gerät kann repariert werden.",
        "Das Gerät muss repariert werden.",
        "Das Gerät wurde repariert.",
      ],
      "sich lassen + Infinitiv = es ist möglich: kann … werden.",
    ),
    gap(
      "Die Unterlagen sind bis Freitag ___. (einreichen, mit „zu“)",
      ["einzureichen"],
      "Trennbares Verb: „zu“ steht in der Mitte: einzureichen.",
    ),
    mc(
      "Die Schrift kann gut gelesen werden. → Die Schrift ist gut ___.",
      ["lesbar", "leslich", "gelesbar"],
      "Verbstamm + -bar = kann … werden: lesbar.",
    ),
    fix(
      "Der Fehler konnte schnell gefunden werden.",
      "Der Fehler konnte schnell gefunden worden.",
      "Nach dem Modalverb steht der Infinitiv „werden“.",
    ),
    gap(
      "Das Wasser kann man trinken. → Das Wasser ist ___.",
      ["trinkbar"],
      "trinken → trinkbar = man kann es trinken.",
    ),
    mc(
      "Die Lieferung ___ leider nicht rechtzeitig zugestellt werden.",
      ["konnte", "konnten", "könnt"],
      "Die Lieferung = Singular → konnte.",
    ),
    gap(
      "Der Termin kann nicht verschoben werden. → Der Termin ___ sich nicht verschieben. (lassen)",
      ["lässt"],
      "lassen bei er/sie/es: lässt.",
    ),
    order(
      "Das Formular | ist | vollständig | auszufüllen.",
      "sein auf Platz 2, „zu“ + Infinitiv am Ende.",
    ),
    mc(
      "Ich weiß, dass die Maschine heute noch ___.",
      [
        "repariert werden muss",
        "muss repariert werden",
        "repariert muss werden",
      ],
      "Im Nebensatz steht das Modalverb ganz am Ende.",
    ),
    gap(
      "Die Regeln müssen von allen Mitarbeitern beachtet werden. → Die Regeln sind von allen Mitarbeitern zu ___.",
      ["beachten"],
      "sein + zu + Infinitiv: sind … zu beachten.",
    ),
    fix(
      "Diese Aufgabe lässt sich in einer Stunde erledigen.",
      "Diese Aufgabe lässt sich in einer Stunde erledigt.",
      "Nach „lässt sich“ steht der Infinitiv.",
    ),
  ],
});

T({
  id: "b2-partizipialattribute",
  level: "B2",
  title: "Partizipialattribute: die steigenden Preise",
  kurz: "Ein Partizip kann wie ein Adjektiv vor dem Nomen stehen und einen Relativsatz ersetzen. Partizip I (Infinitiv + *d*): Es passiert gerade – die *steigenden* Preise (= die Preise, die steigen). Partizip II: Es ist schon gemacht – der *ausgefüllte* Antrag (= der Antrag, der ausgefüllt wurde).",
  kurz_i18n: {
    en: "A participle can stand before a noun like an adjective and replace a relative clause. Participle I (infinitive + d): it is happening now – die steigenden Preise (the rising prices). Participle II: it has already been done – der ausgefüllte Antrag (the completed form).",
    uk: "Дієприкметник може стояти перед іменником як прикметник і заміняти підрядне речення. Partizip I (інфінітив + d): це відбувається зараз – die steigenden Preise (ціни, що зростають). Partizip II: це вже зроблено – der ausgefüllte Antrag (заповнена заява).",
    ru: "Причастие может стоять перед существительным как прилагательное и заменять придаточное предложение. Partizip I (инфинитив + d): это происходит сейчас – die steigenden Preise (растущие цены). Partizip II: это уже сделано – der ausgefüllte Antrag (заполненное заявление).",
    ar: "يمكن أن يأتي Partizip قبل الاسم مثل الصفة ويعوّض جملة الوصل. Partizip I (المصدر + d): الشيء يحدث الآن – die steigenden Preise (الأسعار المرتفعة باستمرار). Partizip II: الشيء تمّ بالفعل – der ausgefüllte Antrag (الطلب الذي تمّت تعبئته).",
    fa: "Partizip می‌تواند مثل صفت قبل از اسم بیاید و جای جملهٔ موصولی را بگیرد. Partizip I (مصدر + d): کار همین حالا در جریان است – die steigenden Preise (قیمت‌های رو به افزایش). Partizip II: کار انجام شده است – der ausgefüllte Antrag (فرمِ پرشده).",
    tr: "Partizip, sıfat gibi ismin önünde durabilir ve ilgi cümlesinin yerini alır. Partizip I (mastar + d): olay şu anda oluyor – die steigenden Preise (artan fiyatlar). Partizip II: iş yapılmış, bitmiş – der ausgefüllte Antrag (doldurulmuş başvuru).",
    es: "Un participio puede ir delante del sustantivo como un adjetivo y sustituir una oración de relativo. Participio I (infinitivo + d): está pasando ahora – die steigenden Preise (los precios que suben). Participio II: ya está hecho – der ausgefüllte Antrag (la solicitud rellenada).",
    it: "Un participio può stare davanti al nome come un aggettivo e sostituire una frase relativa. Participio I (infinito + d): sta succedendo ora – die steigenden Preise (i prezzi in aumento). Participio II: è già stato fatto – der ausgefüllte Antrag (la domanda compilata).",
  },
  tabelle: {
    head: ["", "Beispiel", "Relativsatz"],
    rows: [
      ["Partizip I", "der *wartende* Kunde", "der Kunde, der wartet"],
      ["Partizip II", "die *bestellte* Ware", "die Ware, die bestellt wurde"],
      [
        "mit Angaben",
        "die *gestern bestellte* Ware",
        "die Ware, die gestern bestellt wurde",
      ],
    ],
  },
  beispiele: [
    "Die *steigenden* Mieten sind ein Problem.",
    "Bitte schicken Sie den *ausgefüllten* Antrag zurück.",
    "Die *wartenden* Kunden wurden informiert.",
    "Die *gestern bestellte* Ware ist schon angekommen.",
    "Alle *an der Schulung teilnehmenden* Mitarbeiter bekommen ein Zertifikat.",
    "Der *vom Chef unterschriebene* Vertrag liegt im Büro.",
  ],
  fehler: [
    [
      "Bitte schicken Sie den ausfüllenden Antrag zurück.",
      "Bitte schicken Sie den ausgefüllten Antrag zurück.",
      "Der Antrag füllt nicht selbst aus. Er wurde ausgefüllt → Partizip II.",
    ],
    [
      "Die bestellte gestern Ware ist da.",
      "Die gestern bestellte Ware ist da.",
      "Alle Angaben stehen vor dem Partizip.",
    ],
    [
      "Die steigende Preise sind ein Problem.",
      "Die steigenden Preise sind ein Problem.",
      "Das Partizip bekommt die Adjektivendung: Plural mit Artikel → -en.",
    ],
  ],
  items: [
    mc(
      "die Preise, die steigen → die ___ Preise",
      ["steigenden", "gestiegenen", "steigende"],
      "Es passiert gerade → Partizip I: steigend + Endung -en.",
    ),
    mc(
      "der Antrag, der ausgefüllt wurde → der ___ Antrag",
      ["ausgefüllte", "ausfüllende", "ausgefüllten"],
      "Passiv / schon gemacht → Partizip II. Nach „der“: Endung -e.",
    ),
    mc(
      "das Kind, das schläft → das ___ Kind",
      ["schlafende", "geschlafene", "schlafendes"],
      "Es passiert gerade → Partizip I. Nach „das“: Endung -e.",
    ),
    gap(
      "der Kunde, der wartet → der ___ Kunde",
      ["wartende"],
      "Partizip I: warten + d + Endung -e.",
    ),
    gap(
      "die Ware, die bestellt wurde → die ___ Ware",
      ["bestellte"],
      "Partizip II (bestellt) + Endung -e.",
    ),
    fix(
      "Bitte unterschreiben Sie das ausgefüllte Formular.",
      "Bitte unterschreiben Sie das ausfüllende Formular.",
      "Das Formular wurde ausgefüllt → Partizip II.",
    ),
    mc(
      "Die von der Änderung ___ Mitarbeiter wurden informiert.",
      ["betroffenen", "betreffenden", "betroffene"],
      "Die Mitarbeiter sind betroffen → Partizip II. Plural mit Artikel: -en.",
    ),
    gap(
      "die Kosten, die wachsen → die ___ Kosten",
      ["wachsenden"],
      "Partizip I: wachsend. Plural mit Artikel: -en.",
    ),
    order(
      "Die | gestern | bestellte | Ware | ist angekommen.",
      "Die Angabe „gestern“ steht vor dem Partizip.",
    ),
    mc(
      "der Zug, der gerade ankommt → der ___ Zug",
      ["ankommende", "angekommene", "ankommender"],
      "Es passiert gerade → Partizip I: ankommend + -e.",
    ),
    gap(
      "ein Brief, der gut geschrieben ist → ein gut ___ Brief",
      ["geschriebener"],
      "Partizip II + Adjektivendung: ein … geschriebener Brief.",
    ),
    mc(
      "„die an der Prüfung teilnehmenden Personen“ bedeutet:",
      [
        "die Personen, die an der Prüfung teilnehmen",
        "die Personen, die an der Prüfung teilgenommen haben",
        "die Personen, die geprüft werden",
      ],
      "Partizip I = aktiv und gleichzeitig: Sie nehmen (gerade) teil.",
    ),
    fix(
      "Der vom Chef unterschriebene Vertrag liegt im Büro.",
      "Der unterschriebene vom Chef Vertrag liegt im Büro.",
      "Die Angabe „vom Chef“ steht vor dem Partizip.",
    ),
    gap(
      "die Rechnung, die noch nicht bezahlt wurde → die noch nicht ___ Rechnung",
      ["bezahlte"],
      "Partizip II (bezahlt) + Endung -e.",
    ),
    mc(
      "die Maschine, die repariert wurde → …",
      [
        "die reparierte Maschine",
        "die reparierende Maschine",
        "die repariert Maschine",
      ],
      "Passiv → Partizip II mit Endung: die reparierte Maschine.",
    ),
    gap(
      "Mitarbeiter, die gut ausgebildet sind → gut ___ Mitarbeiter",
      ["ausgebildete"],
      "Plural ohne Artikel: Endung -e → gut ausgebildete Mitarbeiter.",
    ),
    order(
      "Die | in Köln | lebende | Familie | sucht | eine größere Wohnung.",
      "Zwischen Artikel und Nomen: Angabe + Partizip.",
    ),
    mc(
      "Welcher Relativsatz passt zu „die im Jahr 1990 gegründete Firma“?",
      [
        "die Firma, die im Jahr 1990 gegründet wurde",
        "die Firma, die im Jahr 1990 gründet",
        "die Firma, die im Jahr 1990 gründete",
      ],
      "Partizip II = Passiv: Die Firma wurde gegründet.",
    ),
    gap(
      "die Zahl der Menschen, die allein leben → die Zahl der allein ___ Menschen",
      ["lebenden"],
      "Partizip I: lebend. Genitiv Plural: Endung -en.",
    ),
    fix(
      "Die steigenden Mieten sind für viele Familien ein Problem.",
      "Die gesteigenden Mieten sind für viele Familien ein Problem.",
      "Partizip I = Infinitiv + d: steigend. Ohne ge-.",
    ),
  ],
});

  window.DMGrammatik = TOPICS;
  if (typeof module !== 'undefined' && module.exports) module.exports = TOPICS;
})();
