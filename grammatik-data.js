/* Grammar trainer data (route #grammatik, rendered by grammatik.js).
   window.DMGrammatik = [ topic, ... ] in learning order.
   topic: { id, level, title, kurz, kurz_i18n{en,uk,ru,ar,fa,tr,es,it}, tabelle?{head,rows}, beispiele[], fehler[[wrong, right, reason]], items[] }
   *asterisks* mark the key forms (renderer turns them into <mark>).
   items (every item has `why`, difficulty rises within a topic):
     mc    { t:'mc', q, opts[3], a:0, why }        first option is the correct one (renderer shuffles)
     gap   { t:'gap', q, a:[accepted...], why }     a[0] is the spelling shown as solution
     order { t:'order', words[], sol, alt?[], why } chips in solution order (renderer shuffles); alt = other accepted sentences
     fix   { t:'fix', good, bad, why }              pick the correct sentence of two
   Check after every change: node tools/... not needed – run the validator described in the header of grammatik.js. */
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

  window.DMGrammatik = TOPICS;
  if (typeof module !== 'undefined' && module.exports) module.exports = TOPICS;
})();
