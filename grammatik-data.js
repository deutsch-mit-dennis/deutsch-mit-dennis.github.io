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
    uk: "Дієслово отримує закінчення: ich lerne, du lernst, er/sie lernt. Деякі дієслова змінюють голосний з du та er/sie: du sprichst, du fährst.",
    ru: "Глагол получает окончание: ich lerne, du lernst, er/sie lernt. У некоторых глаголов с du и er/sie меняется гласная: du sprichst, du fährst.",
    ar: "يأخذ الفعل نهاية حسب الشخص: ich lerne, du lernst, er/sie lernt. بعض الأفعال تغيّر الحرف الصوتي مع du و er/sie: du sprichst, du fährst.",
    fa: "فعل برای هر شخص یک پایانه می‌گیرد: ich lerne, du lernst, er/sie lernt. در بعضی فعل‌ها با du و er/sie حرف صدادار عوض می‌شود: du sprichst, du fährst.",
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
  id: "a1-fragen",
  level: "A1",
  title: "Fragen: Wo wohnen Sie? Haben Sie Zeit?",
  kurz: "W-Frage: zuerst das Fragewort, dann das Verb, dann die Person: *Wo wohnen* Sie? Ja/Nein-Frage: Das Verb steht auf Platz 1: *Haben* Sie Zeit? Bei einer Frage mit „nicht“ oder „kein“ sagt man statt „ja“: *doch*.",
  kurz_i18n: {
    en: "W-question: first the question word, then the verb, then the person: Wo wohnen Sie? Yes/no question: the verb is in position 1: Haben Sie Zeit? If the question contains nicht or kein, you say doch instead of ja.",
    uk: "Питання з питальним словом: спочатку питальне слово, потім дієслово, потім особа: Wo wohnen Sie? Питання «так чи ні»: дієслово стоїть на першому місці: Haben Sie Zeit? Якщо в питанні є nicht або kein, замість ja кажуть doch.",
    ru: "Вопрос с вопросительным словом: сначала вопросительное слово, потом глагол, потом лицо: Wo wohnen Sie? Вопрос «да или нет»: глагол стоит на первом месте: Haben Sie Zeit? Если в вопросе есть nicht или kein, вместо ja говорят doch.",
    ar: "السؤال بأداة استفهام: أولًا أداة الاستفهام، ثم الفعل، ثم الشخص: Wo wohnen Sie?‏ سؤال نعم/لا: يأتي الفعل في المكان الأول: Haben Sie Zeit?‏ وإذا كان في السؤال nicht أو kein نقول doch بدلًا من ja.",
    fa: "سؤال با کلمهٔ پرسشی: اول کلمهٔ پرسشی، بعد فعل، بعد شخص: Wo wohnen Sie?‏ سؤال بله/نه: فعل در جای اول می‌آید: Haben Sie Zeit?‏ اگر در سؤال nicht یا kein باشد، به‌جای ja می‌گوییم doch.",
    tr: "Soru kelimeli soru: önce soru kelimesi, sonra fiil, sonra kişi: Wo wohnen Sie? Evet/hayır sorusu: fiil birinci sıradadır: Haben Sie Zeit? Soruda nicht veya kein varsa ja yerine doch denir.",
    es: "Pregunta con palabra interrogativa: primero la palabra interrogativa, luego el verbo y después la persona: Wo wohnen Sie? Pregunta de sí o no: el verbo va en la posición 1: Haben Sie Zeit? Si la pregunta lleva nicht o kein, se dice doch en lugar de ja.",
    it: "Domanda con parola interrogativa: prima la parola interrogativa, poi il verbo, poi la persona: Wo wohnen Sie? Domanda sì/no: il verbo è in posizione 1: Haben Sie Zeit? Se nella domanda c'è nicht o kein, si dice doch al posto di ja.",
  },
  tabelle: {
    head: ["", "Platz 1", "Platz 2", ""],
    rows: [
      ["W-Frage", "*Wo*", "*wohnen*", "Sie?"],
      ["W-Frage", "*Wann*", "*beginnt*", "der Kurs?"],
      ["Ja/Nein-Frage", "*Wohnen*", "Sie", "in Essen?"],
      ["Ja/Nein-Frage", "*Haben*", "Sie", "morgen Zeit?"],
    ],
  },
  beispiele: [
    "*Wie heißen* Sie? – Ich heiße Amina Diallo.",
    "*Woher kommt* Ihre Familie? – Aus Polen.",
    "*Was kostet* das Ticket? – Drei Euro.",
    "*Wann beginnt* der Kurs? – Um neun Uhr.",
    "*Haben* Sie einen Termin? – Ja, um zehn Uhr.",
    "Hast du keine Zeit? – *Doch*, ich habe Zeit.",
  ],
  fehler: [
    [
      "Wo Sie wohnen?",
      "Wo wohnen Sie?",
      "In der W-Frage steht das Verb direkt nach „wo“.",
    ],
    [
      "Haben heute Sie Zeit?",
      "Haben Sie heute Zeit?",
      "Ja/Nein-Frage: zuerst das Verb, dann sofort „Sie“.",
    ],
    [
      "Wo kommen Sie? – Aus Syrien.",
      "Woher kommen Sie? – Aus Syrien.",
      "Antwort mit „aus“ + Land → Frage mit „woher“.",
    ],
    [
      "Wer sind Sie von Beruf?",
      "Was sind Sie von Beruf?",
      "„wer“ fragt nach der Person. Nach dem Beruf fragt man mit „was“.",
    ],
    [
      "Hast du keine Zeit? – Ja, ich habe Zeit.",
      "Hast du keine Zeit? – Doch, ich habe Zeit.",
      "Frage mit „kein“, aber die Antwort ist positiv → doch.",
    ],
  ],
  items: [
    mc(
      "___ heißen Sie? – Ich heiße Mariam Haddad.",
      ["Wie", "Wer", "Wo"],
      "Nach dem Namen fragt man: Wie heißen Sie?",
    ),
    mc(
      "___ wohnen Sie? – In Duisburg.",
      ["Wo", "Woher", "Wohin"],
      "Antwort: in Duisburg (ein Ort) → Wo?",
    ),
    mc(
      "___ beginnt der Deutschkurs? – Um neun Uhr.",
      ["Wann", "Wo", "Wer"],
      "Antwort: um neun Uhr (Zeit) → Wann?",
    ),
    gap(
      "___ kommen Sie? – Ich komme aus Marokko.",
      ["Woher", "Von wo"],
      "Antwort: aus Marokko → Woher?",
    ),
    fix(
      "Wo arbeitest du?",
      "Wo du arbeitest?",
      "W-Frage: Nach „wo“ kommt sofort das Verb.",
    ),
    order(
      "Wann | hast | du | heute | Zeit?",
      "Fragewort – Verb – Person: Wann hast du …?",
    ),
    mc(
      "___ ist das? – Das ist meine Nachbarin.",
      ["Wer", "Was", "Wann"],
      "Antwort: eine Person → Wer?",
    ),
    gap(
      "___ kostet die Fahrkarte? – Vier Euro.",
      ["Was", "Wie viel"],
      "Nach dem Preis fragt man: Was kostet …? oder: Wie viel kostet …?",
    ),
    mc(
      "Welche Frage ist richtig?",
      [
        "Haben Sie morgen Zeit?",
        "Haben morgen Sie Zeit?",
        "Morgen Zeit haben Sie?",
      ],
      "Ja/Nein-Frage: zuerst das Verb, dann die Person.",
    ),
    order(
      "Kommen | Sie | aus | der Türkei?",
      "Ja/Nein-Frage: Das Verb steht auf Platz 1.",
    ),
    gap(
      "___ ihr Kinder? – Ja, wir haben zwei Kinder. (haben)",
      ["Habt"],
      "Bei „ihr“: habt. Das Verb steht auf Platz 1.",
    ),
    mc(
      "Hast du keinen Hunger? – ___, ich habe großen Hunger.",
      ["Doch", "Ja", "Nein"],
      "Frage mit „kein“, aber die Antwort ist positiv → doch.",
    ),
    fix(
      "Wie lange lernen Sie schon Deutsch?",
      "Wie lange Sie lernen schon Deutsch?",
      "„Wie lange“ ist das Fragewort. Dann kommt das Verb, dann „Sie“.",
    ),
    gap(
      "___ fährst du am Wochenende? – Ich fahre nach Köln.",
      ["Wohin"],
      "Antwort: nach Köln (Richtung) → Wohin?",
    ),
    mc(
      "___ Kinder haben Sie? – Drei.",
      ["Wie viele", "Wie lange", "Wie oft"],
      "Antwort: eine Zahl → Wie viele?",
    ),
    order(
      "Wie oft | gehst | du | zum Sport?",
      "„Wie oft“ ist das Fragewort. Dann kommt das Verb, dann die Person.",
    ),
    gap(
      "___ kommst du heute nicht zum Kurs? – Mein Kind ist krank.",
      ["Warum", "Wieso", "Weshalb", "Weswegen"],
      "Die Antwort nennt den Grund → Warum?",
    ),
    mc(
      "Arbeiten Sie heute? – ___",
      ["Nein, heute habe ich frei.", "In einer Bäckerei.", "Um acht Uhr."],
      "Das Verb steht auf Platz 1. Das ist eine Ja/Nein-Frage → ja oder nein.",
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
  id: "a1-negation",
  level: "A1",
  title: "nicht oder kein? Nein sagen",
  kurz: "*kein* steht vor einem Nomen. Ohne Verneinung hat das Nomen „ein“ oder keinen Artikel: ein Auto → *kein* Auto, Zeit → *keine* Zeit. *nicht* verneint zum Beispiel ein Verb, ein Adjektiv, einen Ort oder ein Nomen mit „der“ oder „mein“: Ich komme *nicht*. Die Wohnung ist *nicht* groß.",
  kurz_i18n: {
    en: "kein stands before a noun. Without negation, the noun has ein or no article: ein Auto → kein Auto, Zeit → keine Zeit. nicht negates, for example, a verb, an adjective, a place or a noun with der or mein: Ich komme nicht. Die Wohnung ist nicht groß.",
    uk: "kein стоїть перед іменником. Без заперечення цей іменник має ein або не має артикля: ein Auto → kein Auto, Zeit → keine Zeit. nicht заперечує, наприклад, дієслово, прикметник, місце або іменник із der чи mein: Ich komme nicht. Die Wohnung ist nicht groß.",
    ru: "kein стоит перед существительным. Без отрицания у существительного есть ein или нет артикля: ein Auto → kein Auto, Zeit → keine Zeit. nicht отрицает, например, глагол, прилагательное, место или существительное с der или mein: Ich komme nicht. Die Wohnung ist nicht groß.",
    ar: "تأتي kein قبل الاسم. بدون النفي يكون مع الاسم ein أو يكون بلا أداة: ein Auto → kein Auto، ‏Zeit → keine Zeit. أمّا nicht فتنفي مثلًا الفعل أو الصفة أو المكان أو الاسم مع der أو mein: ‏Ich komme nicht. ‏Die Wohnung ist nicht groß.",
    fa: "‏kein قبل از اسم می‌آید. بدون نفی، آن اسم ein دارد یا حرف تعریف ندارد: ein Auto → kein Auto، ‏Zeit → keine Zeit. nicht مثلاً فعل، صفت، مکان یا اسمِ همراه با der یا mein را منفی می‌کند: ‏Ich komme nicht. ‏Die Wohnung ist nicht groß.",
    tr: "kein ismin önünde durur. Olumsuz olmayan cümlede isim ein alır ya da artikelsizdir: ein Auto → kein Auto, Zeit → keine Zeit. nicht ise örneğin bir fiili, bir sıfatı, bir yeri ya da der veya mein ile kullanılan bir ismi olumsuz yapar: Ich komme nicht. Die Wohnung ist nicht groß.",
    es: "kein va delante de un sustantivo. Sin negación, el sustantivo lleva ein o no lleva artículo: ein Auto → kein Auto, Zeit → keine Zeit. nicht niega, por ejemplo, un verbo, un adjetivo, un lugar o un sustantivo con der o mein: Ich komme nicht. Die Wohnung ist nicht groß.",
    it: "kein sta davanti a un nome. Senza negazione, il nome ha ein o non ha articolo: ein Auto → kein Auto, Zeit → keine Zeit. nicht nega, per esempio, un verbo, un aggettivo, un luogo o un nome con der o mein: Ich komme nicht. Die Wohnung ist nicht groß.",
  },
  tabelle: {
    head: ["", "der", "die", "das", "Plural"],
    rows: [
      ["Das ist / sind …", "kein Termin", "kein*e* Frage", "kein Auto", "kein*e* Kinder"],
      ["Ich habe …", "kein*en* Termin", "kein*e* Frage", "kein Auto", "kein*e* Kinder"],
    ],
  },
  beispiele: [
    "Das ist *kein* Problem.",
    "Ich habe heute *keinen* Kurs.",
    "Wir haben *keine* Kinder.",
    "Ich verstehe das Wort *nicht*.",
    "Der Schlüssel ist *nicht* neu.",
    "Herr Nowak wohnt *nicht* in Essen.",
  ],
  fehler: [
    [
      "Ich habe nicht Zeit.",
      "Ich habe keine Zeit.",
      "„Zeit“ steht hier ohne Artikel → keine Zeit.",
    ],
    [
      "Ich habe kein Termin.",
      "Ich habe keinen Termin.",
      "der Termin: Nach „ich habe“ sagt man „keinen Termin“.",
    ],
    [
      "Ich nicht verstehe das.",
      "Ich verstehe das nicht.",
      "Das Verb steht auf Platz 2. „nicht“ kommt danach.",
    ],
    [
      "Die Wohnung ist keine groß.",
      "Die Wohnung ist nicht groß.",
      "„groß“ ist ein Adjektiv ohne Nomen → nicht.",
    ],
    [
      "Das ist kein mein Schlüssel.",
      "Das ist nicht mein Schlüssel.",
      "Vor „mein“ steht „nicht“, nicht „kein“.",
    ],
  ],
  items: [
    mc(
      "Ich habe ___ Auto. Ich fahre mit dem Bus.",
      ["kein", "nicht", "keine"],
      "das Auto: ein Auto → kein Auto.",
    ),
    mc(
      "Meine Küche ist ___ groß.",
      ["nicht", "kein", "keine"],
      "„groß“ ist ein Adjektiv → nicht.",
    ),
    mc(
      "Das ist ___ Problem. Ich helfe Ihnen gern.",
      ["kein", "keine", "nicht"],
      "das Problem: ein Problem → kein Problem.",
    ),
    gap(
      "Herr Nowak hat heute leider ___ Zeit. (kein)",
      ["keine"],
      "die Zeit → keine Zeit.",
    ),
    fix(
      "Ich verstehe die Frage nicht.",
      "Ich nicht verstehe die Frage.",
      "Das Verb steht auf Platz 2. „nicht“ kommt danach.",
    ),
    mc(
      "Kommst du morgen zum Kurs? – Nein, ich komme morgen ___.",
      ["nicht", "kein", "keinen"],
      "Das Verb „komme“ wird verneint → nicht.",
    ),
    gap(
      "Ich habe heute ___ Termin beim Arzt. (kein)",
      ["keinen"],
      "der Termin: Ich habe einen Termin → keinen Termin.",
    ),
    order(
      "Ich | verstehe | den Brief | nicht.",
      "Das Verb steht auf Platz 2. „nicht“ steht hier am Ende.",
    ),
    mc(
      "Das ist ___ mein Schlüssel. Mein Schlüssel ist rot.",
      ["nicht", "kein", "keinen"],
      "Vor „mein“ steht nicht.",
    ),
    fix(
      "Frau Haddad hat keine Kinder.",
      "Frau Haddad hat nicht Kinder.",
      "„Kinder“ steht hier ohne Artikel → keine Kinder.",
    ),
    gap(
      "Wohnst du in Essen? – Nein, ich wohne ___ in Essen. (nicht / kein)",
      ["nicht"],
      "„in Essen“ ist ein Ort → nicht.",
    ),
    mc(
      "Am Abend trinke ich ___ Kaffee.",
      ["keinen", "kein", "keine"],
      "der Kaffee: Ich trinke einen Kaffee → keinen Kaffee.",
    ),
    order(
      "Die Kinder | sind heute | nicht | in der Kita.",
      "„nicht“ steht hier vor dem Ort: nicht in der Kita.",
    ),
    gap(
      "Im Kühlschrank ist ___ Milch. (kein)",
      ["keine"],
      "die Milch → keine Milch.",
    ),
    mc(
      "Ich kann heute leider ___ kommen. Mein Sohn ist krank.",
      ["nicht", "kein", "keine"],
      "Das Verb „kommen“ wird verneint → nicht.",
    ),
    fix(
      "Mein Mann kocht nicht gern.",
      "Mein Mann kocht kein gern.",
      "„gern“ ist kein Nomen → nicht gern.",
    ),
    gap(
      "Haben Sie noch Fragen? – Nein, ich habe ___ Fragen. (kein)",
      ["keine"],
      "die Fragen (Plural) → keine Fragen.",
    ),
    mc(
      "Hast du einen Führerschein? – Nein, ich habe ___ Führerschein.",
      ["keinen", "kein", "nicht"],
      "der Führerschein: einen Führerschein → keinen Führerschein.",
    ),
  ],
});

T({
  id: "a1-possessiv",
  level: "A1",
  title: "Mein, dein, sein, ihr: Wem gehört das?",
  kurz: "ich → *mein*, du → *dein*, er/es → *sein*, sie → *ihr*, wir → *unser*, ihr → *euer*, sie (Plural) → *ihr*, Sie → *Ihr*. Die Endungen sind wie bei „kein“: mein Bruder, mein*e* Schwester, mein Kind, mein*e* Eltern. Nach „ich suche“ oder „ich habe“ (Akkusativ) bei „der“: mein*en* Schlüssel.",
  kurz_i18n: {
    en: "ich → mein (my), du → dein (your), er/es → sein (his/its), sie → ihr (her), wir → unser (our), ihr → euer (your), sie plural → ihr (their), Sie → Ihr (your, polite). The endings are like those of kein: mein Bruder, meine Schwester, mein Kind, meine Eltern. After ich suche or ich habe (accusative) with der nouns: meinen Schlüssel.",
    uk: "ich → mein (мій), du → dein (твій), er/es → sein (його), sie → ihr (її), wir → unser (наш), ihr → euer (ваш), sie (множина) → ihr (їхній), Sie → Ihr (Ваш, ввічливо). Закінчення такі, як у kein: mein Bruder, meine Schwester, mein Kind, meine Eltern. Після ich suche або ich habe (Akkusativ) з der: meinen Schlüssel.",
    ru: "ich → mein (мой), du → dein (твой), er/es → sein (его), sie → ihr (её), wir → unser (наш), ihr → euer (ваш), sie (мн. ч.) → ihr (их), Sie → Ihr (Ваш, вежливо). Окончания как у kein: mein Bruder, meine Schwester, mein Kind, meine Eltern. После ich suche или ich habe (Akkusativ) с der: meinen Schlüssel.",
    ar: "‏ich → mein (لي)، du → dein (لك)، er/es → sein (له)، sie → ihr (لها)، wir → unser (لنا)، ihr → euer (لكم)، sie (الجمع) ← ihr (لهم)، Sie → Ihr (لحضرتك). النهايات مثل kein: ‏mein Bruder, meine Schwester, mein Kind, meine Eltern. وبعد ich suche أو ich habe (Akkusativ) مع der: ‏meinen Schlüssel.",
    fa: "‏ich → mein (مالِ من)، du → dein (مالِ تو)، er/es → sein (مالِ او)، sie → ihr (مالِ او، مؤنث)، wir → unser (مالِ ما)، ihr → euer (مالِ شما)، sie (جمع) ← ihr (مالِ آن‌ها)، Sie → Ihr (مالِ شما، محترمانه). پایانه‌ها مثل kein است: ‏mein Bruder, meine Schwester, mein Kind, meine Eltern. بعد از ich suche یا ich habe (Akkusativ) با der: ‏meinen Schlüssel.",
    tr: "ich → mein (benim), du → dein (senin), er/es → sein (onun), sie → ihr (onun, kadın), wir → unser (bizim), ihr → euer (sizin), sie (çoğul) → ihr (onların), Sie → Ihr (sizin, kibar). Ekler kein gibidir: mein Bruder, meine Schwester, mein Kind, meine Eltern. ich suche veya ich habe sonrasında (Akkusativ) der ile: meinen Schlüssel.",
    es: "ich → mein (mi), du → dein (tu), er/es → sein (su, de él), sie → ihr (su, de ella), wir → unser (nuestro), ihr → euer (vuestro), sie plural → ihr (su, de ellos), Sie → Ihr (su, de usted). Las terminaciones son como las de kein: mein Bruder, meine Schwester, mein Kind, meine Eltern. Después de ich suche o ich habe (acusativo) con der: meinen Schlüssel.",
    it: "ich → mein (mio), du → dein (tuo), er/es → sein (suo, di lui), sie → ihr (suo, di lei), wir → unser (nostro), ihr → euer (vostro), sie plurale → ihr (loro), Sie → Ihr (Suo, forma di cortesia). Le desinenze sono come quelle di kein: mein Bruder, meine Schwester, mein Kind, meine Eltern. Dopo ich suche o ich habe (accusativo) con der: meinen Schlüssel.",
  },
  tabelle: {
    head: ["", "der", "die", "das", "Plural"],
    rows: [
      ["Das ist / sind …", "mein Sohn", "mein*e* Tochter", "mein Kind", "mein*e* Kinder"],
      ["Ich suche …", "mein*en* Sohn", "mein*e* Tochter", "mein Kind", "mein*e* Kinder"],
      ["Das ist / sind …", "euer Sohn", "*eure* Tochter", "euer Kind", "*eure* Kinder"],
      ["Ihr sucht …", "*euren* Sohn", "*eure* Tochter", "euer Kind", "*eure* Kinder"],
    ],
  },
  beispiele: [
    "Das ist *mein* Bruder und das ist *meine* Schwester.",
    "Karim besucht *seine* Mutter.",
    "Elena sucht *ihren* Schlüssel.",
    "*Unsere* Wohnung hat drei Zimmer.",
    "Ist das *euer* Sohn? Und ist das *eure* Tochter?",
    "Wie ist *Ihre* Adresse, Herr Weber?",
  ],
  fehler: [
    [
      "Das ist meine Bruder.",
      "Das ist mein Bruder.",
      "der Bruder → mein Bruder, ohne -e.",
    ],
    [
      "Ich suche mein Schlüssel.",
      "Ich suche meinen Schlüssel.",
      "der Schlüssel: Nach „ich suche“ sagt man „meinen Schlüssel“.",
    ],
    [
      "Das ist Lara und das ist sein Mann.",
      "Das ist Lara und das ist ihr Mann.",
      "Lara = sie → ihr Mann.",
    ],
    [
      "Wie ist ihre Adresse, Frau Kim?",
      "Wie ist Ihre Adresse, Frau Kim?",
      "Höflich mit „Sie“: Ihr / Ihre schreibt man groß.",
    ],
  ],
  items: [
    mc(
      "Ich habe einen Bruder. ___ Bruder heißt Samir.",
      ["Mein", "Meine", "Meinen"],
      "der Bruder. Wer heißt Samir? → mein Bruder.",
    ),
    mc(
      "Das ist Frau Costa und das ist ___ Mann. Sie sind verheiratet.",
      ["ihr", "ihre", "sein"],
      "Frau Costa = sie → ihr. der Mann → ihr Mann, ohne -e.",
    ),
    mc(
      "Herr Yildiz wohnt in Bochum. ___ Wohnung ist klein.",
      ["Seine", "Sein", "Seinen"],
      "Herr Yildiz = er → sein. die Wohnung → seine Wohnung.",
    ),
    gap(
      "Wir haben ein Auto. Das ist ___ Auto. (wir)",
      ["unser"],
      "wir → unser. das Auto → unser Auto, ohne Endung.",
    ),
    fix(
      "Das ist meine Schwester.",
      "Das ist mein Schwester.",
      "die Schwester → meine Schwester.",
    ),
    gap(
      "Wie ist ___ Telefonnummer, Ali? (du)",
      ["deine"],
      "du → dein. die Telefonnummer → deine Telefonnummer.",
    ),
    mc(
      "Ich suche ___ Schlüssel. Er ist nicht in der Tasche.",
      ["meinen", "mein", "meine"],
      "der Schlüssel (Er ist nicht …). Ich suche … → meinen Schlüssel.",
    ),
    mc(
      "Kinder, wo sind ___ Jacken?",
      ["eure", "euer", "euren"],
      "ihr → euer. die Jacken (Plural) → eure Jacken.",
    ),
    order(
      "Wir | besuchen | am Sonntag | unsere Großeltern.",
      "wir → unser. die Großeltern (Plural) → unsere Großeltern.",
    ),
    gap(
      "Elena bringt ___ Sohn in die Kita. (sie)",
      ["ihren"],
      "Elena = sie → ihr. der Sohn: Wen bringt sie? → ihren Sohn.",
    ),
    mc(
      "Guten Tag, Herr Weber! Wie ist ___ Adresse?",
      ["Ihre", "Ihr", "Ihren"],
      "Sie → Ihr. die Adresse → Ihre Adresse.",
    ),
    fix(
      "Karim ruft seine Frau an.",
      "Karim ruft sein Frau an.",
      "Karim = er → sein. die Frau → seine Frau.",
    ),
    gap(
      "Wir suchen ___ Hund. Er ist weg! (wir)",
      ["unseren", "unsren", "unsern"],
      "wir → unser. der Hund: Wir suchen … → unseren Hund.",
    ),
    mc(
      "Das sind Lina und Jonas. ___ Sohn ist zwei Jahre alt.",
      ["Ihr", "Ihre", "Ihren"],
      "Lina und Jonas = sie (Plural) → ihr. der Sohn → ihr Sohn.",
    ),
    gap(
      "Ich kenne ___ Lehrer. Er ist nett. (ihr)",
      ["euren", "eueren", "euern"],
      "ihr → euer. der Lehrer: Wen kenne ich? → euren Lehrer.",
    ),
    order(
      "Frau Bauer | sucht | seit gestern | ihre Brille.",
      "Frau Bauer = sie → ihr. die Brille → ihre Brille.",
    ),
    fix(
      "Das ist Lara und das ist ihr Bruder.",
      "Das ist Lara und das ist ihre Bruder.",
      "Lara = sie → ihr. der Bruder → ihr Bruder, ohne -e.",
    ),
    gap(
      "Ist das ___ Auto? Dann parkt es bitte woanders. (ihr)",
      ["euer"],
      "ihr → euer. das Auto → euer Auto, ohne Endung.",
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
    ar: "‏können = أستطيع. müssen = يجب. möchten و wollen = رغبة. dürfen = مسموح. الفعل المساعد يأتي في الموقع الثاني، والفعل الثاني في آخر الجملة: Ich kann gut kochen.",
    fa: "‏können = توانستن. müssen = باید. möchten و wollen = خواستن. dürfen = اجازه داشتن. فعل کمکی در جای دوم است و فعل دوم آخر جمله می‌آید: Ich kann gut kochen.",
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
    ar: "‏und = و. aber = لكن. oder = أو. denn = لأنّ (السبب). بعد هذه الكلمات يبقى ترتيب الجملة عاديًا: Ich bleibe zu Hause, denn ich bin krank.",
    fa: "‏und = و. aber = اما. oder = یا. denn = چون (دلیل). بعد از این کلمه‌ها ترتیب جمله عادی می‌ماند: Ich bleibe zu Hause, denn ich bin krank.",
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
T({
  id: "a1-perfekt",
  level: "A1",
  title: "Perfekt: Ich habe gearbeitet. Ich bin gefahren.",
  kurz: "Über Vergangenes sprichst du meist im Perfekt: *haben* oder *sein* + Partizip II am Satzende. Ich *habe* gearbeitet. Ich *bin* nach Hause gefahren. Die meisten Verben nehmen haben. Mit *sein*: Bewegung von A nach B (gehen, fahren, kommen), Veränderung (aufstehen, einschlafen) und die Verben sein, bleiben, passieren.",
  kurz_i18n: {
    en: "For the past you usually use the Perfekt: haben or sein + participle II at the end of the sentence. Ich habe gearbeitet. Ich bin nach Hause gefahren. Most verbs take haben. sein is used for movement from A to B (gehen, fahren, kommen), for a change (aufstehen, einschlafen) and with sein, bleiben, passieren.",
    uk: "Про минуле зазвичай говорять у Perfekt: haben або sein + Partizip II у кінці речення. Ich habe gearbeitet. Ich bin nach Hause gefahren. Більшість дієслів – з haben. sein – для руху з A в B (gehen, fahren, kommen), для зміни стану (aufstehen, einschlafen) і з дієсловами sein, bleiben, passieren.",
    ru: "О прошлом обычно говорят в Perfekt: haben или sein + Partizip II в конце предложения. Ich habe gearbeitet. Ich bin nach Hause gefahren. Большинство глаголов – с haben. sein – для движения из A в B (gehen, fahren, kommen), для изменения состояния (aufstehen, einschlafen) и с глаголами sein, bleiben, passieren.",
    ar: "للحديث عن الماضي تستخدم غالبًا زمن Perfekt: ‏haben أو sein + ‏Partizip II في آخر الجملة. Ich habe gearbeitet. Ich bin nach Hause gefahren. معظم الأفعال تأخذ haben. وتأخذ sein أفعالُ الحركة من مكان إلى آخر (gehen, fahren, kommen) وأفعالُ تغيّر الحالة (aufstehen, einschlafen) والأفعال sein و bleiben و passieren.",
    fa: "برای گذشته معمولاً از Perfekt استفاده می‌کنی: haben یا sein + Partizip II در آخر جمله. Ich habe gearbeitet. Ich bin nach Hause gefahren. بیشتر فعل‌ها با haben می‌آیند. sein برای حرکت از جایی به جای دیگر (gehen, fahren, kommen)، برای تغییر حالت (aufstehen, einschlafen) و با فعل‌های sein، bleiben و passieren است.",
    tr: "Geçmişten söz ederken çoğunlukla Perfekt kullanılır: haben veya sein + cümlenin sonunda Partizip II. Ich habe gearbeitet. Ich bin nach Hause gefahren. Fiillerin çoğu haben alır. sein ile: bir yerden başka bir yere hareket (gehen, fahren, kommen), durum değişikliği (aufstehen, einschlafen) ve sein, bleiben, passieren fiilleri.",
    es: "Para hablar del pasado se usa casi siempre el Perfekt: haben o sein + participio II al final de la frase. Ich habe gearbeitet. Ich bin nach Hause gefahren. La mayoría de los verbos lleva haben. Con sein: movimiento de A a B (gehen, fahren, kommen), cambio de estado (aufstehen, einschlafen) y los verbos sein, bleiben, passieren.",
    it: "Per parlare del passato si usa quasi sempre il Perfekt: haben o sein + participio II alla fine della frase. Ich habe gearbeitet. Ich bin nach Hause gefahren. La maggior parte dei verbi prende haben. Con sein: movimento da A a B (gehen, fahren, kommen), cambiamento di stato (aufstehen, einschlafen) e i verbi sein, bleiben, passieren.",
  },
  tabelle: {
    head: ["Verb", "Partizip II", "Beispiel"],
    rows: [
      ["regelmäßig: machen", "*ge*mach*t*", "Ich habe Kaffee gemacht."],
      ["unregelmäßig: schreiben", "*ge*schrieb*en*", "Ich habe eine E-Mail geschrieben."],
      ["trennbar: einkaufen", "ein*ge*kauf*t*", "Wir haben eingekauft."],
      ["ohne ge-: bezahlen, telefonieren", "bezahl*t*, telefonier*t*", "Ich habe die Rechnung bezahlt."],
      ["mit sein: fahren, aufstehen", "*ge*fahr*en*, auf*ge*stand*en*", "Sie ist zum Amt gefahren."],
    ],
  },
  beispiele: [
    "Ich *habe* gestern lange *gearbeitet*.",
    "Lina *hat* im Supermarkt Obst *eingekauft*.",
    "Wir *sind* mit dem Bus zum Arzt *gefahren*.",
    "Mein Sohn *ist* heute um sechs Uhr *aufgestanden*.",
    "*Hast* du die Miete schon *bezahlt*?",
    "Herr Okafor *hat* mit dem Vermieter *telefoniert*.",
  ],
  fehler: [
    [
      "Ich habe nach Hause gegangen.",
      "Ich bin nach Hause gegangen.",
      "Bewegung von A nach B → sein.",
    ],
    [
      "Ich habe gemacht meine Hausaufgaben.",
      "Ich habe meine Hausaufgaben gemacht.",
      "Das Partizip II steht am Satzende.",
    ],
    [
      "Ich habe den Brief geschreibt.",
      "Ich habe den Brief geschrieben.",
      "schreiben ist unregelmäßig: geschrieben.",
    ],
    [
      "Wir haben geeinkauft.",
      "Wir haben eingekauft.",
      "Trennbare Verben: ge- steht in der Mitte → ein-ge-kauft.",
    ],
    [
      "Ich habe die Rechnung gebezahlt.",
      "Ich habe die Rechnung bezahlt.",
      "Verben mit be-, ver-, er- und Verben auf -ieren haben kein ge-.",
    ],
  ],
  items: [
    mc(
      "Ich ___ gestern lange gearbeitet.",
      ["habe", "bin", "hat"],
      "arbeiten ist keine Bewegung → haben. Bei „ich“: habe.",
    ),
    mc(
      "Wir ___ mit dem Zug nach Köln gefahren.",
      ["sind", "haben", "seid"],
      "fahren von A nach B → sein. Bei „wir“: sind.",
    ),
    gap(
      "Ich habe am Wochenende viel Deutsch ___. (lernen)",
      ["gelernt"],
      "lernen ist regelmäßig: ge + lern + t → gelernt.",
    ),
    mc(
      "Was ist das Partizip II von „schreiben“?",
      ["geschrieben", "geschreibt", "schrieben"],
      "schreiben ist unregelmäßig: ge…en → geschrieben.",
    ),
    fix(
      "Sie ist zu Fuß zur Arbeit gegangen.",
      "Sie hat zu Fuß zur Arbeit gegangen.",
      "gehen = Bewegung von A nach B → sein: Sie ist gegangen.",
    ),
    gap(
      "Lena ist heute sehr früh ___. (aufstehen)",
      ["aufgestanden"],
      "Trennbar: auf + ge + standen. Veränderung → sein.",
    ),
    order(
      "Gestern | habe | ich | lange | gearbeitet.",
      "Das Hilfsverb steht auf Position 2, das Partizip II am Ende.",
    ),
    mc(
      "Das Paket ___ heute angekommen.",
      ["ist", "hat", "habe"],
      "ankommen = Bewegung zu einem Ziel → sein. Das Paket = es: ist.",
    ),
    gap(
      "Herr Yilmaz hat gestern mit dem Arzt ___. (telefonieren)",
      ["telefoniert"],
      "Verben auf -ieren haben kein ge-: telefoniert.",
    ),
    fix(
      "Wir haben im Supermarkt eingekauft.",
      "Wir haben im Supermarkt geeinkauft.",
      "Trennbare Verben: ge- steht in der Mitte → ein-ge-kauft.",
    ),
    mc(
      "Mein Sohn ___ um acht Uhr eingeschlafen.",
      ["ist", "hat", "haben"],
      "einschlafen = Veränderung (wach → schlafen) → sein.",
    ),
    gap(
      "Wir ___ am Sonntag zu Hause geblieben. (haben oder sein?)",
      ["sind"],
      "bleiben nimmt immer sein: Wir sind geblieben.",
    ),
    order(
      "Am Samstag | sind | wir | in den Park | gegangen.",
      "sein steht auf Position 2, „gegangen“ am Ende.",
    ),
    mc(
      "Was ist das Partizip II von „verstehen“?",
      ["verstanden", "geverstanden", "versteht"],
      "Verben mit ver- haben kein ge-: verstanden.",
    ),
    gap(
      "Hast du die Rechnung schon ___? (bezahlen)",
      ["bezahlt"],
      "Verben mit be- haben kein ge-: bezahlt.",
    ),
    fix(
      "Ich habe den Antrag ausgefüllt.",
      "Ich habe ausgefüllt den Antrag.",
      "Das Partizip II steht am Satzende.",
    ),
    mc(
      "Was ___ passiert?",
      ["ist", "hat", "bist"],
      "passieren nimmt sein: Was ist passiert?",
    ),
    order(
      "Heute | ist | sie | früh | aufgestanden.",
      "aufstehen = Veränderung → sein. Das Partizip steht am Ende.",
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
    ar: "للحديث عن الأمس والماضي: sein → ich war (كنتُ)، haben → ich hatte (كان عندي). Gestern war ich krank. Ich hatte Fieber.",
    fa: "برای دیروز و گذشته: sein → ich war (بودم)، haben → ich hatte (داشتم). Gestern war ich krank. Ich hatte Fieber.",
    tr: "Dün ve geçmiş için: sein → ich war (-dim, idim), haben → ich hatte (…m vardı). Gestern war ich krank. Ich hatte Fieber.",
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
  id: "a2-weil-denn",
  level: "A2",
  title: "Gründe nennen: weil und denn",
  kurz: "Mit *weil* nennst du einen Grund. Nach weil steht das Verb ganz am Ende: Ich komme nicht, *weil* ich krank *bin*. *denn* bedeutet dasselbe, aber danach bleibt das Verb auf Position 2: Ich komme nicht, *denn* ich *bin* krank. Auf die Frage *Warum?* antwortest du mit *Weil* …",
  kurz_i18n: {
    en: "With weil (because) you give a reason. After weil the verb goes to the very end: Ich komme nicht, weil ich krank bin. denn means the same, but after it the verb stays in position 2: Ich komme nicht, denn ich bin krank. You answer the question Warum? (why?) with Weil …",
    uk: "Словом weil (бо, тому що) ти називаєш причину. Після weil дієслово стоїть у самому кінці: Ich komme nicht, weil ich krank bin. denn означає те саме, але після нього дієслово залишається на 2-му місці: Ich komme nicht, denn ich bin krank. На питання Warum? (чому?) відповідаєш: Weil …",
    ru: "Словом weil (потому что) ты называешь причину. После weil глагол стоит в самом конце: Ich komme nicht, weil ich krank bin. denn значит то же самое, но после него глагол остаётся на 2-м месте: Ich komme nicht, denn ich bin krank. На вопрос Warum? (почему?) отвечаешь: Weil …",
    ar: "بكلمة weil (لأنّ) تذكر السبب. بعد weil يأتي الفعل في آخر الجملة: Ich komme nicht, weil ich krank bin. كلمة denn لها المعنى نفسه، لكن بعدها يبقى الفعل في المكان الثاني: Ich komme nicht, denn ich bin krank. وعلى سؤال Warum? (لماذا؟) تجيب بـ Weil …",
    fa: "با weil (چون، زیرا) دلیل را می‌گویی. بعد از weil فعل در آخر جمله می‌آید: Ich komme nicht, weil ich krank bin. denn همان معنی را دارد، اما بعد از آن فعل در جایگاه دوم می‌ماند: Ich komme nicht, denn ich bin krank. به سؤال Warum? (چرا؟) با Weil … جواب می‌دهی.",
    tr: "weil (çünkü, -dığı için) ile bir sebep söylersin. weil'den sonra fiil en sona gider: Ich komme nicht, weil ich krank bin. denn aynı anlama gelir, ama ondan sonra fiil 2. yerde kalır: Ich komme nicht, denn ich bin krank. Warum? (neden?) sorusuna Weil … ile cevap verirsin.",
    es: "Con weil (porque) das una razón. Después de weil el verbo va al final: Ich komme nicht, weil ich krank bin. denn significa lo mismo, pero después el verbo se queda en la posición 2: Ich komme nicht, denn ich bin krank. A la pregunta Warum? (¿por qué?) respondes con Weil …",
    it: "Con weil (perché) dai un motivo. Dopo weil il verbo va alla fine: Ich komme nicht, weil ich krank bin. denn significa lo stesso, ma dopo denn il verbo resta in seconda posizione: Ich komme nicht, denn ich bin krank. Alla domanda Warum? (perché?) rispondi con Weil …",
  },
  tabelle: {
    head: ["Satz 1", "Grund"],
    rows: [
      ["Ich komme heute nicht,", "*weil* ich krank *bin*."],
      ["Ich komme heute nicht,", "*denn* ich *bin* krank."],
      ["Ich rufe an,", "*weil* ich morgen nicht kommen *kann*."],
      ["*Weil* ich krank *bin*,", "*komme* ich heute nicht."],
    ],
  },
  beispiele: [
    "Ich bleibe zu Hause, *weil* mein Kind Fieber *hat*.",
    "Frau Rossi lernt Deutsch, *weil* sie als Pflegerin arbeiten *möchte*.",
    "Wir suchen eine neue Wohnung, *weil* die alte zu klein *ist*.",
    "Ich komme zu spät, *weil* der Bus nicht *gekommen ist*.",
    "Ich gehe heute zum Arzt, *denn* ich *habe* Rückenschmerzen.",
    "*Weil* der Kurs um acht Uhr *anfängt*, *stehe* ich früh auf.",
  ],
  fehler: [
    [
      "Ich komme nicht, weil ich bin krank.",
      "Ich komme nicht, weil ich krank bin.",
      "Nach „weil“ steht das Verb am Ende.",
    ],
    [
      "Ich komme nicht, denn ich krank bin.",
      "Ich komme nicht, denn ich bin krank.",
      "Nach „denn“ bleibt das Verb auf Position 2.",
    ],
    [
      "Weil ich krank bin, ich komme nicht.",
      "Weil ich krank bin, komme ich nicht.",
      "Nach dem weil-Satz kommt sofort das Verb.",
    ],
    [
      "Ich komme zu spät, weil der Zug ist ausgefallen.",
      "Ich komme zu spät, weil der Zug ausgefallen ist.",
      "Im weil-Satz steht das Hilfsverb ganz am Ende: ausgefallen ist.",
    ],
    [
      "Denn ich krank bin, komme ich nicht.",
      "Weil ich krank bin, komme ich nicht.",
      "„denn“ kann nicht am Anfang stehen. Am Satzanfang nimmst du „weil“.",
    ],
  ],
  items: [
    mc(
      "Ich gehe heute nicht zur Arbeit, ___",
      ["weil ich krank bin.", "weil ich bin krank.", "weil bin ich krank."],
      "Nach „weil“ steht das Verb am Ende: … krank bin.",
    ),
    mc(
      "Ich gehe heute nicht zur Arbeit, denn ___",
      ["ich bin krank.", "ich krank bin.", "krank ich bin."],
      "Nach „denn“: normale Wortstellung, das Verb steht auf Position 2.",
    ),
    gap(
      "Ich lerne jeden Tag, weil ich die Prüfung bestehen ___. (wollen)",
      ["will"],
      "Bei „ich“: will. Im weil-Satz steht das Modalverb ganz am Ende.",
    ),
    fix(
      "Wir ziehen um, weil die Wohnung zu klein ist.",
      "Wir ziehen um, weil die Wohnung ist zu klein.",
      "Nach „weil“ steht das Verb am Ende: … zu klein ist.",
    ),
    mc(
      "Ich komme später, ___ mein Bus Verspätung hat.",
      ["weil", "denn", "aber"],
      "Das Verb „hat“ steht am Ende → weil.",
    ),
    mc(
      "Ich komme später, ___ mein Bus hat Verspätung.",
      ["denn", "weil", "dass"],
      "Das Verb „hat“ steht auf Position 2 → denn. (Nach „weil“ steht es im richtigen Deutsch am Ende.)",
    ),
    order(
      "Ich | bleibe | zu Hause, | weil | mein Kind | Fieber | hat.",
      "Im weil-Satz steht das Verb am Ende: … Fieber hat.",
    ),
    gap(
      "Herr Ahmadi kann nicht kommen, weil er einen Termin beim Arzt ___. (haben)",
      ["hat"],
      "Bei „er“: hat. Nach „weil“ steht das Verb am Ende.",
    ),
    mc(
      "Warum lernst du Deutsch? – ___",
      [
        "Weil ich in Deutschland arbeiten möchte.",
        "Denn ich in Deutschland arbeiten möchte.",
        "Weil ich möchte in Deutschland arbeiten.",
      ],
      "Auf „Warum?“ antwortest du mit „Weil …“. Das Modalverb steht am Ende.",
    ),
    fix(
      "Weil es regnet, nehmen wir das Auto.",
      "Weil es regnet, wir nehmen das Auto.",
      "Nach dem weil-Satz kommt sofort das Verb: nehmen wir.",
    ),
    gap(
      "Ich komme zu spät, weil der Zug ___ ist. (ausfallen)",
      ["ausgefallen"],
      "Perfekt im weil-Satz: Partizip II + „ist“ am Ende.",
    ),
    order(
      "Weil | der Kurs | um acht Uhr anfängt, | stehe | ich | früh auf.",
      "Nach dem weil-Satz kommt sofort das Verb: stehe ich …",
    ),
    mc(
      "Ich gehe zum Amt, denn ___",
      ["ich brauche einen neuen Pass.", "ich einen neuen Pass brauche.", "brauche ich einen neuen Pass."],
      "Nach „denn“ kommt zuerst das Subjekt, dann das Verb auf Position 2.",
    ),
    gap(
      "Wir kaufen heute nicht ein, ___ der Supermarkt geschlossen ist.",
      ["weil", "da"],
      "Das Verb „ist“ steht am Ende → weil.",
    ),
    fix(
      "Ich rufe an, weil ich morgen nicht kommen kann.",
      "Ich rufe an, weil ich morgen nicht kann kommen.",
      "Im weil-Satz steht das Modalverb ganz am Ende: kommen kann.",
    ),
    order(
      "Sie | sucht | eine neue Stelle, | denn | sie | möchte | mehr verdienen.",
      "Nach „denn“: Subjekt + Verb auf Position 2: sie möchte …",
    ),
    mc(
      "Welcher Satz ist richtig? (Grund am Anfang)",
      [
        "Weil ich krank bin, komme ich nicht.",
        "Denn ich krank bin, komme ich nicht.",
        "Weil ich bin krank, komme ich nicht.",
      ],
      "Nur „weil“ kann am Satzanfang stehen. Im weil-Satz steht das Verb am Ende.",
    ),
    gap(
      "Ich nehme heute ein Taxi, denn ich ___ spät dran. (sein)",
      ["bin"],
      "Nach „denn“ steht das Verb auf Position 2: ich bin.",
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
    fa: "مقایسه: صفت + ‎-er‏ + als: Der Bus ist schneller als das Fahrrad. شمارهٔ 1: am …-sten: Der Zug ist am schnellsten. برابر: so groß wie.",
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
  id: "a2-kasus",
  level: "A2",
  title: "Nominativ, Akkusativ, Dativ: der – den – dem",
  kurz: "Der Kasus zeigt die Rolle im Satz. Nominativ (*wer?*): *Der* Mann kauft ein. Akkusativ (*wen? was?*): Ich sehe *den* Mann. Dativ (*wem?*): Ich helfe *dem* Mann. Im Akkusativ ändert sich nur maskulin: der → den. Im Dativ: dem (m/n), der (f), den + -n (Plural). Pronomen: ich – mich – mir, du – dich – dir, er – ihn – ihm, sie – sie – ihr, wir – uns – uns, Sie – Sie – Ihnen.",
  kurz_i18n: {
    en: "The case shows the role in the sentence. Nominative (wer? – who?): Der Mann kauft ein. Accusative (wen? was? – whom? what?): Ich sehe den Mann. Dative (wem? – to whom?): Ich helfe dem Mann. In the accusative only the masculine changes: der → den. Dative: dem (m/n), der (f), den + -n (plural). Pronouns: ich – mich – mir, du – dich – dir, er – ihn – ihm, sie – sie – ihr, wir – uns – uns, Sie – Sie – Ihnen.",
    uk: "Відмінок показує роль слова в реченні. Nominativ (wer? – хто?): Der Mann kauft ein. Akkusativ (wen? was? – кого? що?): Ich sehe den Mann. Dativ (wem? – кому?): Ich helfe dem Mann. В Akkusativ змінюється лише чоловічий рід: der → den. Dativ: dem (ч./с.), der (ж.), den + -n (множина). Займенники: ich – mich – mir, du – dich – dir, er – ihn – ihm, sie – sie – ihr, wir – uns – uns, Sie – Sie – Ihnen.",
    ru: "Падеж показывает роль слова в предложении. Nominativ (wer? – кто?): Der Mann kauft ein. Akkusativ (wen? was? – кого? что?): Ich sehe den Mann. Dativ (wem? – кому?): Ich helfe dem Mann. В Akkusativ меняется только мужской род: der → den. Dativ: dem (м./ср.), der (ж.), den + -n (мн. ч.). Местоимения: ich – mich – mir, du – dich – dir, er – ihn – ihm, sie – sie – ihr, wir – uns – uns, Sie – Sie – Ihnen.",
    ar: "الحالة الإعرابية تُظهر دور الكلمة في الجملة. Nominativ (‏wer? – مَن؟): Der Mann kauft ein. Akkusativ (‏wen? was? – مَن؟ ماذا؟ للمفعول به): Ich sehe den Mann. Dativ (‏wem? – لِمَن؟): Ich helfe dem Mann. في Akkusativ يتغيّر المذكّر فقط: der → den. في Dativ: ‏dem (مذكّر/محايد)، der (مؤنّث)، den + ‏-n (جمع). الضمائر: ich – mich – mir, du – dich – dir, er – ihn – ihm, sie – sie – ihr, wir – uns – uns, Sie – Sie – Ihnen.",
    fa: "حالت (Kasus) نقش کلمه را در جمله نشان می‌دهد. Nominativ (‏wer? – چه کسی؟): Der Mann kauft ein. Akkusativ (‏wen? was? – چه کسی را؟ چه چیزی را؟): Ich sehe den Mann. Dativ (‏wem? – به چه کسی؟): Ich helfe dem Mann. در Akkusativ فقط مذکر عوض می‌شود: der → den. در Dativ: ‏dem (مذکر/خنثی)، der (مؤنث)، den + ‏-n (جمع). ضمیرها: ich – mich – mir, du – dich – dir, er – ihn – ihm, sie – sie – ihr, wir – uns – uns, Sie – Sie – Ihnen.",
    tr: "Hâl (Kasus), kelimenin cümledeki görevini gösterir. Nominativ (wer? – kim?): Der Mann kauft ein. Akkusativ (wen? was? – kimi? neyi?): Ich sehe den Mann. Dativ (wem? – kime?): Ich helfe dem Mann. Akkusativ'de sadece eril değişir: der → den. Dativ: dem (eril/nötr), der (dişil), den + -n (çoğul). Zamirler: ich – mich – mir, du – dich – dir, er – ihn – ihm, sie – sie – ihr, wir – uns – uns, Sie – Sie – Ihnen.",
    es: "El caso muestra la función en la frase. Nominativo (wer? – ¿quién?): Der Mann kauft ein. Acusativo (wen? was? – ¿a quién? ¿qué?): Ich sehe den Mann. Dativo (wem? – ¿a quién?, objeto indirecto): Ich helfe dem Mann. En acusativo solo cambia el masculino: der → den. Dativo: dem (m/n), der (f), den + -n (plural). Pronombres: ich – mich – mir, du – dich – dir, er – ihn – ihm, sie – sie – ihr, wir – uns – uns, Sie – Sie – Ihnen.",
    it: "Il caso mostra la funzione nella frase. Nominativo (wer? – chi?): Der Mann kauft ein. Accusativo (wen? was? – chi? che cosa?, complemento oggetto): Ich sehe den Mann. Dativo (wem? – a chi?): Ich helfe dem Mann. All'accusativo cambia solo il maschile: der → den. Dativo: dem (m/n), der (f), den + -n (plurale). Pronomi: ich – mich – mir, du – dich – dir, er – ihn – ihm, sie – sie – ihr, wir – uns – uns, Sie – Sie – Ihnen.",
  },
  tabelle: {
    head: ["", "der", "die", "das", "Plural"],
    rows: [
      ["Nom.", "der / ein", "die / eine", "das / ein", "die"],
      ["Akk.", "*den* / *einen*", "die / eine", "das / ein", "die"],
      ["Dat.", "*dem* / *einem*", "*der* / *einer*", "*dem* / *einem*", "*den*"],
    ],
  },
  beispiele: [
    "*Der* Vermieter repariert *den* Herd.",
    "Ich suche *einen* Kitaplatz für meine Tochter.",
    "Kannst du *mir* bitte helfen?",
    "Ich gebe *dem* Kind *einen* Apfel.",
    "Ich rufe *ihn* morgen an.",
    "Das Fahrrad gehört *meinem* Bruder.",
  ],
  fehler: [
    [
      "Ich habe ein Termin beim Jobcenter.",
      "Ich habe einen Termin beim Jobcenter.",
      "haben + Akkusativ: der Termin → einen Termin.",
    ],
    [
      "Ich helfe dich.",
      "Ich helfe dir.",
      "helfen + Dativ: du → dir.",
    ],
    [
      "Ich fahre mit der Bus.",
      "Ich fahre mit dem Bus.",
      "mit + Dativ: der Bus → mit dem Bus.",
    ],
    [
      "Ich rufe er an.",
      "Ich rufe ihn an.",
      "anrufen + Akkusativ: er → ihn.",
    ],
    [
      "Die Tasche gehört die Frau.",
      "Die Tasche gehört der Frau.",
      "gehören + Dativ: die Frau → der Frau.",
    ],
  ],
  items: [
    mc(
      "Ich habe ___ Termin beim Arzt.",
      ["einen", "ein", "einem"],
      "haben + Akkusativ. der Termin → einen Termin.",
    ),
    mc(
      "Kannst du ___ bitte helfen?",
      ["mir", "mich", "ich"],
      "helfen + Dativ: ich → mir.",
    ),
    gap(
      "Wir kaufen morgen ___ Kühlschrank. (ein)",
      ["einen"],
      "der Kühlschrank. kaufen + Akkusativ → einen.",
    ),
    mc(
      "___ hilfst du? – Meiner Nachbarin.",
      ["Wem", "Wen", "Wer"],
      "helfen + Dativ → Frage mit „wem“.",
    ),
    mc(
      "___ besuchst du am Sonntag? – Meinen Onkel.",
      ["Wen", "Wem", "Wer"],
      "besuchen + Akkusativ → Frage mit „wen“.",
    ),
    fix(
      "Ich rufe ihn morgen an.",
      "Ich rufe er morgen an.",
      "anrufen + Akkusativ: er → ihn.",
    ),
    gap(
      "Das Handy gehört ___ Lehrerin. (die)",
      ["der"],
      "gehören + Dativ: die Lehrerin → der Lehrerin.",
    ),
    mc(
      "Der Vermieter schickt ___ Mieter einen Brief.",
      ["dem", "den", "der"],
      "Wem schickt er den Brief? Person im Dativ: der Mieter → dem Mieter.",
    ),
    order(
      "Am Montag | rufe | ich | dich | an.",
      "anrufen + Akkusativ: dich. „an“ steht am Ende.",
    ),
    gap(
      "Ich fahre jeden Tag mit ___ Bus zur Arbeit. (der)",
      ["dem"],
      "mit + Dativ: der Bus → mit dem Bus.",
    ),
    fix(
      "Ich danke Ihnen für die Hilfe.",
      "Ich danke Sie für die Hilfe.",
      "danken + Dativ: Sie → Ihnen.",
    ),
    mc(
      "Die Ärztin fragt ___: „Wo tut es weh?“",
      ["ihn", "ihm", "er"],
      "fragen + Akkusativ: er → ihn.",
    ),
    gap(
      "Die Lehrerin erklärt ___ Kindern die Aufgabe. (die)",
      ["den"],
      "Dativ Plural: den Kindern (Nomen mit -n).",
    ),
    mc(
      "Wie gefällt ___ die neue Wohnung?",
      ["dir", "dich", "du"],
      "gefallen + Dativ: du → dir.",
    ),
    order(
      "Morgen | besuche | ich | meinen Opa.",
      "besuchen + Akkusativ: der Opa → meinen Opa.",
    ),
    fix(
      "Ich habe keinen Führerschein.",
      "Ich habe kein Führerschein.",
      "der Führerschein. haben + Akkusativ → keinen.",
    ),
    mc(
      "Wer ist das? – Das ist ___ neue Kollege.",
      ["der", "den", "dem"],
      "sein + Nominativ: Das ist der neue Kollege.",
    ),
    gap(
      "Ich brauche das Formular für ___ Sohn. (mein)",
      ["meinen"],
      "für + Akkusativ: der Sohn → für meinen Sohn.",
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
    ar: "بعد mit, bei, zu, von, nach, aus, seit: ‏der/das → dem و die → der (Dativ). بعد für, ohne, durch, gegen, um: ‏der → den (Akkusativ). مع in, an, auf: أين؟ ← im Büro, in der Küche. إلى أين؟ ← ins Büro, in die Küche.",
    fa: "بعد از mit, bei, zu, von, nach, aus, seit: ‏der/das → dem و die → der (Dativ). بعد از für, ohne, durch, gegen, um: ‏der → den (Akkusativ). با in, an, auf: کجا؟ ← im Büro, in der Küche. به کجا؟ ← ins Büro, in die Küche.",
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
  id: "a2-wechselpraepositionen",
  level: "A2",
  title: "Wechselpräpositionen: Wo? oder Wohin?",
  kurz: "Neun Präpositionen wechseln den Kasus: *in, an, auf, über, unter, vor, hinter, neben, zwischen*. Bei Orten gilt: Wo? → Dativ: Das Rad steht *vor dem* Haus. Wohin? → Akkusativ: Ich stelle das Rad *vor das* Haus. *stehen, liegen, sitzen* = Wo? · *stellen, legen, sich setzen* = Wohin? · *hängen* = Wo? oder Wohin?",
  kurz_i18n: {
    en: "Nine prepositions change their case: in, an, auf, über, unter, vor, hinter, neben, zwischen. For places: Where? → dative: Das Rad steht vor dem Haus. Where to? → accusative: Ich stelle das Rad vor das Haus. stehen, liegen, sitzen = where? stellen, legen, sich setzen = where to? hängen = where? or where to?",
    uk: "Дев’ять прийменників змінюють відмінок: in, an, auf, über, unter, vor, hinter, neben, zwischen. Коли йдеться про місце: Де? → Dativ: Das Rad steht vor dem Haus. Куди? → Akkusativ: Ich stelle das Rad vor das Haus. stehen, liegen, sitzen = де? stellen, legen, sich setzen = куди? hängen = де? або куди?",
    ru: "Девять предлогов меняют падеж: in, an, auf, über, unter, vor, hinter, neben, zwischen. Когда речь о месте: Где? → Dativ: Das Rad steht vor dem Haus. Куда? → Akkusativ: Ich stelle das Rad vor das Haus. stehen, liegen, sitzen = где? stellen, legen, sich setzen = куда? hängen = где? или куда?",
    ar: "تسعة حروف جر تغيّر الحالة الإعرابية: in, an, auf, über, unter, vor, hinter, neben, zwischen. مع الأماكن: أين؟ ← Dativ: ‏Das Rad steht vor dem Haus. إلى أين؟ ← Akkusativ: ‏Ich stelle das Rad vor das Haus. الأفعال stehen, liegen, sitzen = أين؟ والأفعال stellen, legen, sich setzen = إلى أين؟ أمّا hängen = أين؟ أو إلى أين؟",
    fa: "نه حرف اضافه حالت را عوض می‌کنند: in, an, auf, über, unter, vor, hinter, neben, zwischen. برای مکان: کجا؟ ← Dativ: ‏Das Rad steht vor dem Haus. به کجا؟ ← Akkusativ: ‏Ich stelle das Rad vor das Haus. فعل‌های stehen, liegen, sitzen = کجا؟ و فعل‌های stellen, legen, sich setzen = به کجا؟ و hängen = کجا؟ یا به کجا؟",
    tr: "Dokuz edat hâl değiştirir: in, an, auf, über, unter, vor, hinter, neben, zwischen. Yer bildirirken: Nerede? → Dativ: Das Rad steht vor dem Haus. Nereye? → Akkusativ: Ich stelle das Rad vor das Haus. stehen, liegen, sitzen = nerede? stellen, legen, sich setzen = nereye? hängen = nerede? ya da nereye?",
    es: "Nueve preposiciones cambian de caso: in, an, auf, über, unter, vor, hinter, neben, zwischen. Con lugares: ¿Dónde? → dativo: Das Rad steht vor dem Haus. ¿Adónde? → acusativo: Ich stelle das Rad vor das Haus. stehen, liegen, sitzen = ¿dónde? stellen, legen, sich setzen = ¿adónde? hängen = ¿dónde? o ¿adónde?",
    it: "Nove preposizioni cambiano caso: in, an, auf, über, unter, vor, hinter, neben, zwischen. Con i luoghi: Dove? → dativo: Das Rad steht vor dem Haus. Verso dove? → accusativo: Ich stelle das Rad vor das Haus. stehen, liegen, sitzen = dove? stellen, legen, sich setzen = verso dove? hängen = dove? o verso dove?",
  },
  tabelle: {
    head: ["", "der", "die", "das", "Plural"],
    rows: [
      ["Wo? neben …", "*dem* Tisch", "*der* Tür", "*dem* Regal", "*den* Stühle*n*"],
      ["Wohin? neben …", "*den* Tisch", "*die* Tür", "*das* Regal", "*die* Stühle"],
    ],
  },
  beispiele: [
    "Das Fahrrad *steht vor dem* Haus. – Ich *stelle* es *vor das* Haus.",
    "Der Brief *liegt neben der* Lampe. – Ich *lege* ihn *neben die* Lampe.",
    "Die Uhr *hängt über dem* Sofa. – Ich *hänge* sie *über das* Sofa.",
    "Der Drucker steht *zwischen den* Schreibtischen.",
    "Setzen Sie sich bitte *neben meine* Kollegin.",
    "Die Kinder stehen *am* Fenster. – Geht bitte nicht *ans* Fenster!",
  ],
  fehler: [
    [
      "Ich stelle die Tasche unter dem Tisch.",
      "Ich stelle die Tasche unter den Tisch.",
      "stellen = Wohin? → Akkusativ: unter den Tisch.",
    ],
    [
      "Das Auto steht vor das Haus.",
      "Das Auto steht vor dem Haus.",
      "stehen = Wo? → Dativ: vor dem Haus.",
    ],
    [
      "Ich stehe den Stuhl neben das Fenster.",
      "Ich stelle den Stuhl neben das Fenster.",
      "Ich bewege den Stuhl → stellen. „stehen“ sagt nur, wo etwas ist.",
    ],
    [
      "Die Lampe hängt über den Tisch.",
      "Die Lampe hängt über dem Tisch.",
      "Wo ist die Lampe? → Dativ: über dem Tisch.",
    ],
    [
      "Wir sitzen zwischen die Nachbarn.",
      "Wir sitzen zwischen den Nachbarn.",
      "sitzen = Wo? → Dativ Plural: den Nachbarn.",
    ],
  ],
  items: [
    mc(
      "Das Fahrrad steht vor ___ Haus.",
      ["dem", "das", "den"],
      "Wo steht es? → Dativ: das Haus → vor dem Haus.",
    ),
    mc(
      "Ich stelle mein Fahrrad hinter ___ Haus.",
      ["das", "dem", "der"],
      "Wohin stelle ich es? → Akkusativ: hinter das Haus.",
    ),
    gap(
      "Die Lampe hängt über ___ Schreibtisch. (der)",
      ["dem"],
      "Wo hängt sie? → Dativ: der Schreibtisch → über dem Schreibtisch.",
    ),
    mc(
      "Leg den Brief bitte neben ___ Tastatur.",
      ["die", "der", "dem"],
      "legen = Wohin? → Akkusativ: die Tastatur → neben die Tastatur.",
    ),
    fix(
      "Unter dem Stuhl liegt ein Handy.",
      "Unter den Stuhl liegt ein Handy.",
      "Wo liegt das Handy? → Dativ: unter dem Stuhl.",
    ),
    gap(
      "Die Katze schläft unter ___ Bett. (das)",
      ["dem"],
      "Wo schläft sie? → Dativ: das Bett → unter dem Bett.",
    ),
    mc(
      "Die Kollegin ___ die Ordner ins Regal.",
      ["stellt", "steht", "liegt"],
      "Wohin? ins Regal. Sie bewegt die Ordner → stellen.",
    ),
    order(
      "Mein Auto | steht | hinter | dem Supermarkt.",
      "stehen = Wo? → Dativ: hinter dem Supermarkt.",
    ),
    mc(
      "Bitte warten Sie einen Moment vor ___ Tür!",
      ["der", "die", "dem"],
      "Wo soll man warten? → Dativ: die Tür → vor der Tür.",
    ),
    gap(
      "Wir setzen uns an ___ Tisch beim Fenster. (der)",
      ["den"],
      "sich setzen = Wohin? → Akkusativ: der Tisch → an den Tisch.",
    ),
    fix(
      "Stell den Eimer bitte neben die Tür.",
      "Stell den Eimer bitte neben der Tür.",
      "stellen = Wohin? → Akkusativ: neben die Tür.",
    ),
    mc(
      "Der Drucker steht zwischen ___ Schreibtischen.",
      ["den", "die", "dem"],
      "Wo steht er? → Dativ Plural: zwischen den Schreibtischen.",
    ),
    gap(
      "Setz dich doch neben ___ Oma! (die)",
      ["die"],
      "sich setzen = Wohin? → Akkusativ: die Oma → neben die Oma.",
    ),
    order(
      "Frau Petrova | stellt | die Blumen | auf den Balkon.",
      "stellen = Wohin? → Akkusativ: auf den Balkon.",
    ),
    mc(
      "Der Kalender ___ über dem Kopierer.",
      ["hängt", "stellt", "legt"],
      "Wo ist der Kalender? Über dem Kopierer → er hängt.",
    ),
    gap(
      "Viele Familien sitzen auf ___ Bänken im Park. (die)",
      ["den"],
      "sitzen = Wo? → Dativ Plural: auf den Bänken.",
    ),
    mc(
      "Bringen Sie die Kisten bitte in ___ Keller.",
      ["den", "dem", "der"],
      "Wohin? → Akkusativ: der Keller → in den Keller.",
    ),
    fix(
      "Zwischen der Apotheke und der Bank ist eine Haltestelle.",
      "Zwischen die Apotheke und die Bank ist eine Haltestelle.",
      "Wo ist die Haltestelle? → Dativ: zwischen der Apotheke und der Bank.",
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
  id: "b1-relativsatz",
  level: "B1",
  title: "Relativsätze: der Arzt, den ich kenne",
  kurz: "Ein Relativsatz erklärt ein Nomen genauer. Das Relativpronomen bekommt Genus und Zahl vom Nomen, den Kasus aber vom Verb im Relativsatz. Das Verb steht am Ende. Der Arzt, *der* mir geholfen hat (wer? → Nominativ) · der Arzt, *den* ich kenne (wen? → Akkusativ) · der Arzt, *dem* ich vertraue (wem? → Dativ). Mit Präposition steht die Präposition vorne: die Firma, *bei der* ich arbeite.",
  kurz_i18n: {
    en: "A relative clause describes a noun more precisely. The relative pronoun takes gender and number from the noun, but its case from the verb in the relative clause. The verb goes to the end. Der Arzt, der mir geholfen hat (nominative) · den ich kenne (accusative) · dem ich vertraue (dative). With a preposition, the preposition comes first: die Firma, bei der ich arbeite (the company I work for).",
    uk: "Підрядне означальне речення точніше пояснює іменник. Відносний займенник бере рід і число від іменника, а відмінок – від дієслова в підрядному реченні. Дієслово стоїть у кінці. Der Arzt, der mir geholfen hat (Nominativ) · den ich kenne (Akkusativ) · dem ich vertraue (Dativ). З прийменником прийменник стоїть попереду: die Firma, bei der ich arbeite.",
    ru: "Определительное придаточное точнее объясняет существительное. Относительное местоимение берёт род и число от существительного, а падеж – от глагола в придаточном. Глагол стоит в конце. Der Arzt, der mir geholfen hat (Nominativ) · den ich kenne (Akkusativ) · dem ich vertraue (Dativ). С предлогом предлог стоит впереди: die Firma, bei der ich arbeite.",
    ar: "جملة الصلة (Relativsatz) تشرح الاسم بدقّة أكبر. يأخذ اسم الموصول الجنس والعدد من الاسم، لكن الحالة الإعرابية من الفعل داخل جملة الصلة. والفعل يأتي في آخرها. Der Arzt, der mir geholfen hat (Nominativ) · den ich kenne (Akkusativ) · dem ich vertraue (Dativ). ومع حرف الجر يأتي حرف الجر أولًا: die Firma, bei der ich arbeite.",
    fa: "جملهٔ موصولی (Relativsatz) یک اسم را دقیق‌تر توضیح می‌دهد. ضمیر موصولی جنس و تعداد را از اسم می‌گیرد، اما حالت (Kasus) را از فعلِ جملهٔ موصولی. فعل در آخر می‌آید. Der Arzt, der mir geholfen hat (Nominativ) · den ich kenne (Akkusativ) · dem ich vertraue (Dativ). با حرف اضافه، حرف اضافه اول می‌آید: die Firma, bei der ich arbeite.",
    tr: "İlgi cümlesi (Relativsatz) bir ismi daha ayrıntılı açıklar. İlgi zamiri cinsiyet ve sayıyı isimden, hâli ise ilgi cümlesindeki fiilden alır. Fiil sona gider. Der Arzt, der mir geholfen hat (Nominativ) · den ich kenne (Akkusativ) · dem ich vertraue (Dativ). Edat varsa edat başa gelir: die Firma, bei der ich arbeite.",
    es: "Una oración de relativo explica mejor un sustantivo. El pronombre relativo toma el género y el número del sustantivo, pero el caso del verbo de la oración de relativo. El verbo va al final. Der Arzt, der mir geholfen hat (nominativo) · den ich kenne (acusativo) · dem ich vertraue (dativo). Con preposición, la preposición va delante: die Firma, bei der ich arbeite.",
    it: "Una frase relativa spiega meglio un nome. Il pronome relativo prende genere e numero dal nome, ma il caso dal verbo della frase relativa. Il verbo va alla fine. Der Arzt, der mir geholfen hat (nominativo) · den ich kenne (accusativo) · dem ich vertraue (dativo). Con una preposizione, la preposizione va davanti: die Firma, bei der ich arbeite.",
  },
  tabelle: {
    head: ["", "der", "die", "das", "Plural"],
    rows: [
      ["Nom.", "der", "die", "das", "die"],
      ["Akk.", "*den*", "die", "das", "die"],
      ["Dat.", "*dem*", "*der*", "*dem*", "*denen*"],
    ],
  },
  beispiele: [
    "Das ist die Kollegin, *die* mir beim Antrag geholfen hat.",
    "Der Termin, *den* ich beim Bürgeramt habe, ist am Montag.",
    "Die Nachbarn, *denen* wir beim Umzug geholfen haben, haben uns zum Essen eingeladen.",
    "Das ist die Firma, *bei der* ich seit zwei Jahren arbeite.",
    "Der Arzt, *zu dem* ich immer gehe, hat heute keine Sprechstunde.",
    "Das Formular, *das* du ausfüllen musst, liegt auf dem Tisch.",
  ],
  fehler: [
    [
      "Das ist der Mann, der ich gestern gesehen habe.",
      "Das ist der Mann, den ich gestern gesehen habe.",
      "Ich habe ihn gesehen → Akkusativ: den.",
    ],
    [
      "Die Frau, die ich geholfen habe, wohnt nebenan.",
      "Die Frau, der ich geholfen habe, wohnt nebenan.",
      "helfen + Dativ, feminin → der.",
    ],
    [
      "Die Eltern, den ich die Einladung geschickt habe, kommen alle.",
      "Die Eltern, denen ich die Einladung geschickt habe, kommen alle.",
      "Dativ Plural: denen.",
    ],
    [
      "Das ist die Firma, die ich bei arbeite.",
      "Das ist die Firma, bei der ich arbeite.",
      "Die Präposition steht vor dem Relativpronomen: bei der.",
    ],
    [
      "Der Kurs, der hat um neun Uhr angefangen, war gut.",
      "Der Kurs, der um neun Uhr angefangen hat, war gut.",
      "Im Relativsatz steht das Verb am Ende.",
    ],
    [
      "Das Formular, die ich ausfüllen muss, ist sehr lang.",
      "Das Formular, das ich ausfüllen muss, ist sehr lang.",
      "das Formular ist neutral → das.",
    ],
  ],
  items: [
    mc(
      "Das ist der Kollege, ___ mir immer hilft.",
      ["der", "den", "dem"],
      "Wer hilft mir? Er → Nominativ: der.",
    ),
    mc(
      "Das ist der Kollege, ___ ich jeden Tag sehe.",
      ["den", "der", "dem"],
      "Ich sehe ihn → Akkusativ: den.",
    ),
    mc(
      "Das ist der Kollege, ___ ich oft helfe.",
      ["dem", "den", "der"],
      "Ich helfe ihm → Dativ: dem.",
    ),
    gap(
      "Die Wohnung, ___ wir gefunden haben, hat drei Zimmer.",
      ["die"],
      "die Wohnung. Wir haben sie gefunden → Akkusativ feminin: die.",
    ),
    gap(
      "Die Ärztin, ___ ich meine Probleme erklärt habe, war sehr freundlich.",
      ["der"],
      "Ich habe ihr die Probleme erklärt → Dativ feminin: der.",
    ),
    fix(
      "Das ist das Formular, das du unterschreiben musst.",
      "Das ist das Formular, die du unterschreiben musst.",
      "das Formular ist neutral → das.",
    ),
    mc(
      "Das sind die Nachbarn, ___ wir beim Umzug geholfen haben.",
      ["denen", "den", "die"],
      "helfen + Dativ, Plural → denen.",
    ),
    order(
      "Der Bus, | den | ich | jeden Tag nehme, | ist heute ausgefallen.",
      "Ich nehme ihn → den. Im Relativsatz steht das Verb am Ende.",
    ),
    gap(
      "Das ist die Firma, bei ___ ich ein Praktikum mache.",
      ["der"],
      "bei + Dativ, die Firma → bei der.",
    ),
    mc(
      "Der Kurs, ___ ich mich angemeldet habe, beginnt im März.",
      ["für den", "für dem", "den"],
      "sich anmelden für + Akkusativ: für den Kurs → für den.",
    ),
    fix(
      "Die Frau, der ich das Paket gegeben habe, wohnt im dritten Stock.",
      "Die Frau, die ich das Paket gegeben habe, wohnt im dritten Stock.",
      "Wem habe ich das Paket gegeben? → Dativ feminin: der.",
    ),
    gap(
      "Das Kind, ___ dort spielt, ist mein Neffe.",
      ["das"],
      "das Kind. Wer spielt? → Nominativ neutral: das.",
    ),
    order(
      "Das ist | die Lehrerin, | mit | der | ich | oft | spreche.",
      "mit + Dativ: mit der. Das Verb steht am Ende.",
    ),
    mc(
      "Die Stadt, ___ ich wohne, ist klein.",
      ["in der", "in die", "die"],
      "Wo wohne ich? in + Dativ: in der Stadt → in der.",
    ),
    gap(
      "Die Kunden, mit ___ ich telefoniert habe, waren zufrieden.",
      ["denen"],
      "mit + Dativ Plural: mit denen.",
    ),
    fix(
      "Der Termin, den ich verschoben habe, ist jetzt am Freitag.",
      "Der Termin, den ich habe verschoben, ist jetzt am Freitag.",
      "Im Relativsatz steht das Hilfsverb ganz am Ende: verschoben habe.",
    ),
    mc(
      "Das Jobcenter hat mir einen Brief geschickt, ___ ich schnell beantworten muss.",
      ["den", "der", "dem"],
      "der Brief. Ich muss ihn beantworten → Akkusativ: den.",
    ),
    gap(
      "Wie heißt der Arzt, zu ___ du immer gehst?",
      ["dem"],
      "zu + Dativ, der Arzt → zu dem.",
    ),
  ],
});

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
  id: "b1-verben-praepositionen",
  level: "B1",
  title: "Verben mit Präposition: warten auf, worauf, darauf",
  kurz: "Viele Verben haben eine feste Präposition mit einem festen Kasus: warten *auf* + Akkusativ, sich kümmern *um* + Akkusativ, teilnehmen *an* + Dativ. Frage nach einer Sache: *Worauf* wartest du? – *Darauf.* Frage nach einer Person: *Auf wen* wartest du? – *Auf ihn.* Beginnt die Präposition mit einem Vokal, kommt ein r dazu: wo*r*auf, da*r*an.",
  kurz_i18n: {
    en: "Many verbs have a fixed preposition with a fixed case: warten auf + accusative (wait for), sich kümmern um + accusative (take care of), teilnehmen an + dative (take part in). Asking about a thing: Worauf wartest du? – Darauf. Asking about a person: Auf wen wartest du? – Auf ihn. If the preposition starts with a vowel, an r is added: worauf, daran.",
    uk: "Багато дієслів мають сталий прийменник зі сталим відмінком: warten auf + Akkusativ (чекати на), sich kümmern um + Akkusativ (дбати про), teilnehmen an + Dativ (брати участь у). Питання про річ: Worauf wartest du? – Darauf. Питання про людину: Auf wen wartest du? – Auf ihn. Якщо прийменник починається з голосного, додається r: worauf, daran.",
    ru: "У многих глаголов есть постоянный предлог с постоянным падежом: warten auf + Akkusativ (ждать), sich kümmern um + Akkusativ (заботиться о), teilnehmen an + Dativ (участвовать в). Вопрос о предмете: Worauf wartest du? – Darauf. Вопрос о человеке: Auf wen wartest du? – Auf ihn. Если предлог начинается с гласной, добавляется r: worauf, daran.",
    ar: "لكثير من الأفعال حرف جر ثابت وحالة إعرابية ثابتة: ‏warten auf + Akkusativ (ينتظر)، ‏sich kümmern um + Akkusativ (يعتني بـ)، ‏teilnehmen an + Dativ (يشارك في). السؤال عن شيء: ‏Worauf wartest du? – Darauf.‏ السؤال عن شخص: ‏Auf wen wartest du? – Auf ihn.‏ وإذا بدأ حرف الجر بحرف صوتي يُضاف r: ‏worauf, daran.",
    fa: "بسیاری از فعل‌ها حرف اضافهٔ ثابت با حالت ثابت دارند: ‏warten auf + Akkusativ (منتظر بودن)، ‏sich kümmern um + Akkusativ (مراقبت و رسیدگی کردن)، ‏teilnehmen an + Dativ (شرکت کردن در). سؤال دربارهٔ چیز: ‏Worauf wartest du? – Darauf.‏ سؤال دربارهٔ شخص: ‏Auf wen wartest du? – Auf ihn.‏ اگر حرف اضافه با حرف صدادار شروع شود، یک r اضافه می‌شود: ‏worauf, daran.",
    tr: "Birçok fiilin sabit bir edatı ve sabit bir hâli vardır: warten auf + Akkusativ (beklemek), sich kümmern um + Akkusativ (ilgilenmek), teilnehmen an + Dativ (katılmak). Bir şey sorulurken: Worauf wartest du? – Darauf. Bir kişi sorulurken: Auf wen wartest du? – Auf ihn. Edat ünlüyle başlıyorsa araya r gelir: worauf, daran.",
    es: "Muchos verbos tienen una preposición fija con un caso fijo: warten auf + acusativo (esperar), sich kümmern um + acusativo (ocuparse de), teilnehmen an + dativo (participar en). Pregunta por una cosa: Worauf wartest du? – Darauf. Pregunta por una persona: Auf wen wartest du? – Auf ihn. Si la preposición empieza por vocal, se añade una r: worauf, daran.",
    it: "Molti verbi hanno una preposizione fissa con un caso fisso: warten auf + accusativo (aspettare), sich kümmern um + accusativo (occuparsi di), teilnehmen an + dativo (partecipare a). Domanda su una cosa: Worauf wartest du? – Darauf. Domanda su una persona: Auf wen wartest du? – Auf ihn. Se la preposizione comincia per vocale, si aggiunge una r: worauf, daran.",
  },
  tabelle: {
    head: ["Präposition", "Verben", "Sache: Frage – Antwort"],
    rows: [
      ["*auf* + Akk.", "warten, achten, sich freuen (es kommt noch)", "worauf? – darauf"],
      ["*um* + Akk.", "sich kümmern, bitten", "worum? – darum"],
      ["*über* + Akk.", "sprechen, sich beschweren, sich ärgern, sich freuen (es ist da)", "worüber? – darüber"],
      ["*mit* + Dat.", "sprechen, anfangen, aufhören", "womit? – damit"],
      ["*an* + Akk.", "denken, sich erinnern, sich gewöhnen", "woran? – daran"],
      ["*an* + Dat.", "teilnehmen", "woran? – daran"],
      ["*nach* + Dat.", "fragen, suchen", "wonach? – danach"],
      ["*von* + Dat.", "abhängen, träumen", "wovon? – davon"],
    ],
  },
  beispiele: [
    "*Worauf* wartest du? – Ich *warte auf* den Bus.",
    "*Auf wen* wartest du? – Ich *warte auf* meinen Bruder.",
    "Herr Nowak *kümmert sich um* die Anmeldung.",
    "Wir *nehmen am* Elternabend *teil*.",
    "Der Termin ist am Montag. *Denk* bitte *daran*!",
    "Sie *freut sich darauf*, ihre Familie zu sehen.",
  ],
  fehler: [
    [
      "Ich warte für den Bus.",
      "Ich warte auf den Bus.",
      "warten auf + Akkusativ.",
    ],
    [
      "Ich kümmere mich über meine Eltern.",
      "Ich kümmere mich um meine Eltern.",
      "sich kümmern um + Akkusativ.",
    ],
    [
      "Ich nehme an einen Kurs teil.",
      "Ich nehme an einem Kurs teil.",
      "teilnehmen an + Dativ: an einem Kurs.",
    ],
    [
      "Ich denke oft über meine Familie.",
      "Ich denke oft an meine Familie.",
      "Die Familie ist in meinen Gedanken → denken an + Akkusativ.",
    ],
    [
      "Wo bleibt Frau Lehmann? Alle warten darauf.",
      "Wo bleibt Frau Lehmann? Alle warten auf sie.",
      "Frau Lehmann ist eine Person → Präposition + Pronomen: auf sie.",
    ],
  ],
  items: [
    mc(
      "Ich warte schon seit zwanzig Minuten ___ den Bus.",
      ["auf", "für", "nach"],
      "warten auf + Akkusativ.",
    ),
    mc(
      "Wer kümmert sich heute Abend ___ die Kinder?",
      ["um", "auf", "für"],
      "sich kümmern um + Akkusativ.",
    ),
    mc(
      "Frau Haddad nimmt ___ einer Weiterbildung teil.",
      ["an", "mit", "auf"],
      "teilnehmen an + Dativ.",
    ),
    gap(
      "Denk bitte ___ deinen Termin beim Zahnarzt!",
      ["an"],
      "denken an + Akkusativ.",
    ),
    fix(
      "Herr Okafor bittet um einen neuen Termin.",
      "Herr Okafor bittet für einen neuen Termin.",
      "bitten um + Akkusativ.",
    ),
    gap(
      "Der Kunde hat sich ___ die lange Wartezeit beschwert.",
      ["über"],
      "sich beschweren über + Akkusativ.",
    ),
    mc(
      "___ wartest du? – Auf die Zusage von der Firma.",
      ["Worauf", "Woran", "Wovon"],
      "warten auf. Die Zusage ist eine Sache → worauf?",
    ),
    mc(
      "___ wartest du? – Auf meine Schwester.",
      ["Auf wen", "Worauf", "Auf wem"],
      "Die Schwester ist eine Person. warten auf + Akkusativ → auf wen?",
    ),
    order(
      "Ich | erinnere | mich | gern | an meine Schulzeit.",
      "sich erinnern an + Akkusativ. „mich“ steht direkt nach dem Verb.",
    ),
    gap(
      "Morgen ist der Elternabend. Denkst du bitte ___? (da + an)",
      ["daran", "dran"],
      "denken an. Eine Sache, „an“ beginnt mit einem Vokal → daran.",
    ),
    fix(
      "Die Nachbarin hat nach deiner Adresse gefragt.",
      "Die Nachbarin hat über deine Adresse gefragt.",
      "fragen nach + Dativ.",
    ),
    mc(
      "Die Höhe der Miete hängt ___ der Größe der Wohnung ab.",
      ["von", "an", "mit"],
      "abhängen von + Dativ.",
    ),
    gap(
      "___ sprecht ihr gerade? – Über den neuen Dienstplan. (wo + über)",
      ["Worüber"],
      "sprechen über. Der Dienstplan ist eine Sache → worüber?",
    ),
    mc(
      "Herr Weber war gestern hier. Ich habe lange ___ gesprochen.",
      ["mit ihm", "damit", "mit ihn"],
      "Herr Weber ist eine Person. sprechen mit + Dativ → mit ihm.",
    ),
    order(
      "Ich | freue | mich | darauf, | dich bald | zu sehen.",
      "sich freuen auf. „darauf“ zeigt auf den Satz mit „zu“.",
    ),
    gap(
      "Ich muss mich noch ___ das frühe Aufstehen gewöhnen.",
      ["an"],
      "sich gewöhnen an + Akkusativ.",
    ),
    fix(
      "Am Freitag nehmen wir an einer Besprechung teil.",
      "Am Freitag nehmen wir an eine Besprechung teil.",
      "teilnehmen an + Dativ: an einer Besprechung.",
    ),
    mc(
      "Nächste Woche beginnt mein Praktikum. Ich freue mich schon sehr ___.",
      ["darauf", "davon", "dagegen"],
      "sich freuen auf. Das Praktikum ist eine Sache → darauf.",
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
    ar: "تقرأ وتكتب Präteritum (الماضي البسيط) كثيرًا في التقارير والصحف والقصص. الأفعال المنتظمة: ‎-te‏: machen → ich machte. كثير من الأفعال الشائعة غير منتظمة: gehen → ging, kommen → kam. مع ich و er/sie لا توجد نهاية إضافية.",
    fa: "‏Präteritum (گذشتهٔ ساده) را بیشتر در گزارش‌ها، روزنامه‌ها و داستان‌ها می‌خوانی و می‌نویسی. فعل‌های باقاعده: ‎-te‏: machen → ich machte. خیلی از فعل‌های پرکاربرد بی‌قاعده‌اند: gehen → ging, kommen → kam. با ich و er/sie پایانهٔ دیگری نیست.",
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
  id: "b1-als-wenn",
  level: "B1",
  title: "Als oder wenn? Über früher erzählen",
  kurz: "*als*: ein einmaliges Ereignis oder eine Zeit in der Vergangenheit: *Als* ich ein Kind war, wohnten wir auf dem Land. *wenn*: etwas, das sich wiederholt, auch früher: Immer *wenn* ich krank war, kochte meine Mutter Suppe. Für jetzt und später steht auch *wenn*: *Wenn* ich morgen Zeit habe, rufe ich an. Das Verb steht am Ende des Nebensatzes.",
  kurz_i18n: {
    en: "als: a single event or one period in the past: Als ich ein Kind war, wohnten wir auf dem Land. wenn: something that is repeated, also in the past: Immer wenn ich krank war, kochte meine Mutter Suppe. For now and later you also use wenn: Wenn ich morgen Zeit habe, rufe ich an. The verb is at the end of the subordinate clause.",
    uk: "als: одноразова подія або один період у минулому: Als ich ein Kind war, wohnten wir auf dem Land. wenn: те, що повторюється, також у минулому: Immer wenn ich krank war, kochte meine Mutter Suppe. Про теперішнє й майбутнє теж кажуть wenn: Wenn ich morgen Zeit habe, rufe ich an. Дієслово стоїть у кінці підрядного речення.",
    ru: "als: однократное событие или один период в прошлом: Als ich ein Kind war, wohnten wir auf dem Land. wenn: то, что повторяется, также в прошлом: Immer wenn ich krank war, kochte meine Mutter Suppe. О настоящем и будущем тоже говорят wenn: Wenn ich morgen Zeit habe, rufe ich an. Глагол стоит в конце придаточного.",
    ar: "‏als: حدث وقع مرّة واحدة أو فترة واحدة في الماضي: ‏Als ich ein Kind war, wohnten wir auf dem Land. ‏wenn: شيء يتكرّر، حتى في الماضي: ‏Immer wenn ich krank war, kochte meine Mutter Suppe. وللحاضر والمستقبل نستخدم wenn أيضًا: ‏Wenn ich morgen Zeit habe, rufe ich an. ويأتي الفعل في آخر الجملة الفرعية.",
    fa: "‏als: یک اتفاقِ یک‌باره یا یک دوره در گذشته: ‏Als ich ein Kind war, wohnten wir auf dem Land. ‏wenn: چیزی که تکرار می‌شود، در گذشته هم: ‏Immer wenn ich krank war, kochte meine Mutter Suppe. برای حال و آینده هم wenn می‌آید: ‏Wenn ich morgen Zeit habe, rufe ich an. فعل در آخر جملهٔ پیرو می‌آید.",
    tr: "als: geçmişte bir kez olan bir olay ya da tek bir dönem: Als ich ein Kind war, wohnten wir auf dem Land. wenn: tekrarlanan bir şey, geçmişte de: Immer wenn ich krank war, kochte meine Mutter Suppe. Şimdi ve gelecek için de wenn kullanılır: Wenn ich morgen Zeit habe, rufe ich an. Fiil yan cümlenin sonundadır.",
    es: "als: un hecho único o una época en el pasado: Als ich ein Kind war, wohnten wir auf dem Land. wenn: algo que se repite, también en el pasado: Immer wenn ich krank war, kochte meine Mutter Suppe. Para ahora y el futuro también se usa wenn: Wenn ich morgen Zeit habe, rufe ich an. El verbo va al final de la oración subordinada.",
    it: "als: un fatto unico o un periodo nel passato: Als ich ein Kind war, wohnten wir auf dem Land. wenn: qualcosa che si ripete, anche nel passato: Immer wenn ich krank war, kochte meine Mutter Suppe. Anche per il presente e il futuro si usa wenn: Wenn ich morgen Zeit habe, rufe ich an. Il verbo sta alla fine della frase secondaria.",
  },
  tabelle: {
    head: ["", "einmal / eine Zeit", "mehrmals / immer"],
    rows: [
      ["früher", "*als*", "*wenn*"],
      ["jetzt und später", "*wenn*", "*wenn*"],
    ],
  },
  beispiele: [
    "*Als* ich nach Deutschland kam, war ich 28 Jahre alt.",
    "*Als* wir noch in Polen wohnten, hatten wir einen Garten.",
    "Immer *wenn* ich meine Oma besuchte, backte sie Brot.",
    "Jedes Mal, *wenn* der Bus zu spät kam, ging ich zu Fuß.",
    "*Wenn* der Kurs zu Ende ist, suche ich eine Arbeit.",
  ],
  fehler: [
    [
      "Wenn ich sechs Jahre alt war, kam ich in die Schule.",
      "Als ich sechs Jahre alt war, kam ich in die Schule.",
      "Eine bestimmte Zeit in der Vergangenheit, nur einmal → als.",
    ],
    [
      "Als ich morgen Zeit habe, helfe ich dir.",
      "Wenn ich morgen Zeit habe, helfe ich dir.",
      "Es geht um morgen, nicht um früher → wenn.",
    ],
    [
      "Immer als ich krank war, blieb ich im Bett.",
      "Immer wenn ich krank war, blieb ich im Bett.",
      "„immer“ zeigt: Es war mehrmals so → wenn.",
    ],
    [
      "Wann ich ein Kind war, spielte ich oft draußen.",
      "Als ich ein Kind war, spielte ich oft draußen.",
      "„wann“ steht in Fragen. Eine Zeit in der Vergangenheit → als.",
    ],
    [
      "Als ich ankam, es regnete.",
      "Als ich ankam, regnete es.",
      "Nach dem als-Satz kommt sofort das Verb.",
    ],
  ],
  items: [
    mc(
      "___ ich ein Kind war, hatten wir einen Hund.",
      ["Als", "Wenn", "Wann"],
      "Die Kindheit ist eine Zeit in der Vergangenheit → als.",
    ),
    mc(
      "Ich rufe dich an, ___ ich morgen zu Hause bin.",
      ["wenn", "als", "wann"],
      "morgen = Zukunft → wenn.",
    ),
    mc(
      "Immer ___ es stark regnete, kam der Zug zu spät.",
      ["wenn", "als", "wann"],
      "„immer“ = mehrmals → wenn, auch in der Vergangenheit.",
    ),
    gap(
      "___ ich 2019 meinen Führerschein machte, war ich sehr nervös. (als / wenn)",
      ["Als"],
      "2019, ein einmaliges Ereignis → als.",
    ),
    fix(
      "Als wir letztes Jahr umgezogen sind, hat es geregnet.",
      "Wenn wir letztes Jahr umgezogen sind, hat es geregnet.",
      "Letztes Jahr, ein einmaliges Ereignis → als.",
    ),
    gap(
      "___ mein Bruder krank ist, bleibt er zu Hause. (als / wenn)",
      ["Wenn"],
      "Das ist Gegenwart (ist, bleibt) → wenn.",
    ),
    order(
      "Als | ich | nach Hause | kam, | war | die Tür | offen.",
      "Im als-Satz steht das Verb am Ende: kam. Danach kommt sofort „war“.",
    ),
    mc(
      "Als ich in Deutschland ankam, ___ niemanden.",
      ["kannte ich", "ich kannte", "ich niemand kannte"],
      "Nach dem als-Satz kommt sofort das Verb: kannte ich.",
    ),
    mc(
      "___ Frau Diallo ihre erste Stelle bekam, feierte sie mit Freunden.",
      ["Als", "Wenn", "Wann"],
      "Die erste Stelle bekommt man nur einmal → als.",
    ),
    gap(
      "Jedes Mal, ___ ich ihn besuchte, kochte er Tee für uns. (als / wenn)",
      ["wenn"],
      "„jedes Mal“ = mehrmals → wenn.",
    ),
    fix(
      "Wenn du morgen ankommst, hole ich dich ab.",
      "Als du morgen ankommst, hole ich dich ab.",
      "morgen = Zukunft → wenn.",
    ),
    order(
      "Immer wenn | wir | im Urlaub | waren, | goss unsere Nachbarin | die Blumen.",
      "„immer“ = mehrmals → wenn. Nach dem wenn-Satz kommt sofort „goss“.",
    ),
    mc(
      "Gestern war ich gerade in der Küche, ___ das Telefon klingelte.",
      ["als", "wenn", "wann"],
      "Ein einzelner Moment gestern → als.",
    ),
    gap(
      "Als ich gestern zum Arzt ___, war die Praxis geschlossen. (kommen, Präteritum)",
      ["kam"],
      "Präteritum von „kommen“: ich kam. Das Verb steht am Ende.",
    ),
    mc(
      "Früher haben wir jedes Mal gefeiert, ___ jemand eine Prüfung bestanden hatte.",
      ["wenn", "als", "wann"],
      "„jedes Mal“ = mehrmals → wenn.",
    ),
    fix(
      "Als der Kurs zu Ende war, gingen alle nach Hause.",
      "Als der Kurs war zu Ende, gingen alle nach Hause.",
      "Im als-Satz steht das Verb am Ende: … zu Ende war.",
    ),
    gap(
      "___ meine Tochter zum ersten Mal allein zur Schule ging, war ich aufgeregt. (als / wenn)",
      ["Als"],
      "„zum ersten Mal“ = einmalig → als.",
    ),
    mc(
      "Welcher Satz erzählt von einem einzigen Moment in der Vergangenheit?",
      [
        "Als der Strom ausfiel, saßen wir im Aufzug.",
        "Immer wenn der Strom ausfiel, suchten wir Kerzen.",
        "Wenn der Strom ausfällt, suchen wir Kerzen.",
      ],
      "„als“ + Präteritum: Es ist einmal passiert.",
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
    ar: "يجيب Genitiv عن السؤال «لمن؟»: das Auto des Chefs (سيارة المدير)، die Tasche der Kollegin. ‏der/das → des (+ ‎-s أو ‎-es في آخر الاسم)، die والجمع ← der. يأتي Genitiv أيضًا بعد wegen (بسبب)، trotz (رغم)، während (أثناء).",
    fa: "‏Genitiv به پرسش «مالِ چه کسی؟» جواب می‌دهد: das Auto des Chefs (ماشینِ رئیس)، die Tasche der Kollegin. ‏der/das → des (+ ‎-s یا ‎-es در آخر اسم)، die و جمع ← der. بعد از wegen (به‌خاطر)، trotz (با وجود)، während (در طولِ) هم Genitiv می‌آید.",
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
T({
  id: "b1-um-zu-damit",
  level: "B1",
  title: "um … zu oder damit? Ziele ausdrücken",
  kurz: "Wozu? Mit *um … zu* und *damit* nennst du ein Ziel. Gleiche Person in beiden Teilen → meist *um … zu* + Infinitiv: Ich lerne, *um* die Prüfung *zu bestehen*. Zwei verschiedene Personen oder Sachen → *damit*, das Verb steht am Ende: Ich spreche langsam, *damit* du mich *verstehst*.",
  kurz_i18n: {
    en: "What for? With um … zu and damit you state a goal. Same person in both parts → usually um … zu + infinitive: Ich lerne, um die Prüfung zu bestehen (in order to pass). Two different people or things → damit (so that), with the verb at the end: Ich spreche langsam, damit du mich verstehst.",
    uk: "Для чого? За допомогою um … zu і damit ти називаєш мету. Та сама особа в обох частинах → зазвичай um … zu + інфінітив: Ich lerne, um die Prüfung zu bestehen (щоб скласти). Дві різні особи або речі → damit (щоб), дієслово стоїть у кінці: Ich spreche langsam, damit du mich verstehst.",
    ru: "Для чего? С помощью um … zu и damit ты называешь цель. Одно и то же лицо в обеих частях → обычно um … zu + инфинитив: Ich lerne, um die Prüfung zu bestehen (чтобы сдать). Два разных лица или предмета → damit (чтобы), глагол стоит в конце: Ich spreche langsam, damit du mich verstehst.",
    ar: "لأيّ هدف؟ باستخدام um … zu و damit تذكر الهدف. الشخص نفسه في الجزأين ← غالبًا um … zu مع المصدر: ‏Ich lerne, um die Prüfung zu bestehen (لكي أنجح). شخصان أو شيئان مختلفان ← damit (لكي)، والفعل في الآخر: ‏Ich spreche langsam, damit du mich verstehst.",
    fa: "برای چه هدفی؟ با um … zu و damit هدف را می‌گویی. شخص یکسان در هر دو بخش ← معمولاً um … zu + مصدر: ‏Ich lerne, um die Prüfung zu bestehen (برای اینکه قبول شوم). دو شخص یا دو چیز متفاوت ← damit (برای اینکه)، فعل در آخر می‌آید: ‏Ich spreche langsam, damit du mich verstehst.",
    tr: "Ne amaçla? um … zu ve damit ile bir amaç söylersin. İki bölümde de aynı kişi → çoğunlukla um … zu + mastar: Ich lerne, um die Prüfung zu bestehen (geçmek için). İki farklı kişi ya da şey → damit (-sin diye), fiil sonda durur: Ich spreche langsam, damit du mich verstehst.",
    es: "¿Para qué? Con um … zu y damit expresas un objetivo. La misma persona en las dos partes → normalmente um … zu + infinitivo: Ich lerne, um die Prüfung zu bestehen (para aprobar). Dos personas o cosas diferentes → damit (para que), con el verbo al final: Ich spreche langsam, damit du mich verstehst.",
    it: "A che scopo? Con um … zu e damit esprimi uno scopo. La stessa persona nelle due parti → di solito um … zu + infinito: Ich lerne, um die Prüfung zu bestehen (per superare). Due persone o cose diverse → damit (affinché), con il verbo alla fine: Ich spreche langsam, damit du mich verstehst.",
  },
  tabelle: {
    head: ["Wann?", "Form", "Beispiel"],
    rows: [
      ["gleiche Person", "*um … zu* + Infinitiv", "Ich rufe an, *um* nach dem Preis *zu* fragen."],
      ["trennbares Verb", "*zu* in der Mitte", "Sie geht zum Amt, *um* den Ausweis ab*zu*holen."],
      ["mit Modalverb", "*zu* vor dem Modalverb", "Er spart, *um* reisen *zu* können."],
      ["verschiedene Personen", "*damit* … Verb am Ende", "Ich rufe an, *damit* du Bescheid *weißt*."],
    ],
  },
  beispiele: [
    "Ich lerne jeden Abend, *um* die Prüfung *zu bestehen*.",
    "Sie geht zum Amt, *um* ihren Ausweis *abzuholen*.",
    "*Um* pünktlich *zu sein*, nehme ich den früheren Bus.",
    "Die Lehrerin spricht langsam, *damit* alle sie *verstehen*.",
    "Wir suchen eine größere Wohnung, *damit* jedes Kind ein Zimmer *hat*.",
  ],
  fehler: [
    [
      "Ich gehe zum Amt, um einen Antrag stellen.",
      "Ich gehe zum Amt, um einen Antrag zu stellen.",
      "„um“ braucht „zu“ beim Infinitiv.",
    ],
    [
      "Ich lerne Deutsch, für eine Arbeit zu finden.",
      "Ich lerne Deutsch, um eine Arbeit zu finden.",
      "Ein Ziel mit Infinitiv → um … zu, nicht „für“.",
    ],
    [
      "Ich helfe ihr, um sie die Prüfung besteht.",
      "Ich helfe ihr, damit sie die Prüfung besteht.",
      "Zwei verschiedene Personen (ich – sie) → damit.",
    ],
    [
      "Ich rufe an, um ich einen Termin bekomme.",
      "Ich rufe an, um einen Termin zu bekommen.",
      "Im Satz mit „um … zu“ steht kein „ich“.",
    ],
    [
      "Er fährt in die Stadt, um zu einkaufen.",
      "Er fährt in die Stadt, um einzukaufen.",
      "Trennbares Verb: „zu“ steht in der Mitte: ein-zu-kaufen.",
    ],
    [
      "Ich mache das Licht an, damit du kannst lesen.",
      "Ich mache das Licht an, damit du lesen kannst.",
      "Nach „damit“ steht das konjugierte Verb am Ende.",
    ],
  ],
  items: [
    mc(
      "Ich lerne Deutsch, ___ eine gute Arbeit zu finden.",
      ["um", "damit", "für"],
      "Gleiche Person, Infinitiv mit „zu“ → um … zu.",
    ),
    mc(
      "Ich schreibe dir die Adresse auf, ___ du den Weg findest.",
      ["damit", "um", "für"],
      "Zwei Personen (ich – du) → damit.",
    ),
    gap(
      "Frau Kim geht zur Bank, um ein Konto ___ eröffnen.",
      ["zu"],
      "um … zu + Infinitiv: um ein Konto zu eröffnen.",
    ),
    fix(
      "Wir sparen Geld, um eine Reise zu machen.",
      "Wir sparen Geld, um eine Reise machen.",
      "„um“ braucht „zu“ beim Infinitiv.",
    ),
    mc(
      "Die Ärztin spricht langsam, ___ ihre Patienten sie gut verstehen.",
      ["damit", "um", "ohne"],
      "Verschiedene Personen, Verb am Ende → damit.",
    ),
    order(
      "Ich | gehe | zum Jobcenter, | um | einen Antrag | abzugeben.",
      "Trennbares Verb: ab-zu-geben. Es steht am Ende.",
    ),
    gap(
      "Samir steht früh auf, um pünktlich bei der Arbeit zu ___. (sein)",
      ["sein"],
      "um … zu + Infinitiv: um pünktlich zu sein.",
    ),
    mc(
      "Heute fahre ich in die Stadt, um ___.",
      ["einzukaufen", "zu einkaufen", "einkaufen zu"],
      "Trennbares Verb: „zu“ steht in der Mitte: ein-zu-kaufen.",
    ),
    fix(
      "Die Eltern sprechen leise, damit das Baby nicht aufwacht.",
      "Die Eltern sprechen leise, um das Baby nicht aufwacht.",
      "Verschiedene Personen (die Eltern – das Baby) → damit.",
    ),
    gap(
      "Der Chef schickt eine E-Mail, ___ alle den neuen Plan kennen. (um / damit)",
      ["damit"],
      "Verschiedene Personen (der Chef – alle) → damit.",
    ),
    order(
      "Ich | mache | das Fenster zu, | damit | es | nicht so laut | ist.",
      "Nach „damit“ steht das Verb am Ende: ist.",
    ),
    mc(
      "Er macht eine Fortbildung, ___.",
      [
        "um im Beruf weiterzukommen",
        "um im Beruf zu weiterkommen",
        "um er im Beruf weiterkommt",
      ],
      "um … zu, ohne „er“. Trennbares Verb: weiter-zu-kommen.",
    ),
    gap(
      "Ich schalte das Handy aus, um besser schlafen ___ können.",
      ["zu"],
      "Mit Modalverb steht „zu“ vor dem Modalverb: schlafen zu können.",
    ),
    fix(
      "Um Strom zu sparen, schalten wir das Licht aus.",
      "Um Strom zu sparen, wir schalten das Licht aus.",
      "Der Satz mit „um … zu“ steht auf Platz 1. Dann kommt sofort das Verb.",
    ),
    mc(
      "Frau Novak bringt ihr Kind in die Kita, ___.",
      [
        "um arbeiten zu können",
        "um arbeiten können",
        "damit arbeiten zu können",
      ],
      "Gleiche Person: um … zu. „zu“ steht vor dem Modalverb.",
    ),
    order(
      "Um | Geld | zu sparen, | kocht Karim | jeden Tag | selbst.",
      "Nach dem Satz mit „um … zu“ kommt sofort das Verb: kocht Karim.",
    ),
    gap(
      "Ich lege den Schlüssel auf den Tisch, damit mein Mann ihn sofort ___. (finden)",
      ["findet"],
      "Nach „damit“ steht das Verb am Ende: mein Mann = er → findet.",
    ),
    mc(
      "Welcher Satz braucht „damit“?",
      [
        "Ich rufe an, … mein Kollege Bescheid weiß.",
        "Ich rufe an, … einen Termin zu bekommen.",
        "Ich rufe an, … nach dem Preis zu fragen.",
      ],
      "Nur hier gibt es zwei Personen (ich – mein Kollege) → damit. Die anderen Sätze haben einen Infinitiv mit „zu“ → um.",
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
    ar: "في النصوص الرسمية يتحوّل الفعل أو الصفة كثيرًا إلى اسم: prüfen → die Prüfung, pünktlich → die Pünktlichkeit. عندها تتحوّل الجملة الفرعية إلى مجموعة كلمات مع حرف جر: Weil es regnet, … → Wegen des Regens … (بسبب المطر).",
    fa: "در متن‌های رسمی، فعل یا صفت اغلب به اسم تبدیل می‌شود: prüfen → die Prüfung, pünktlich → die Pünktlichkeit. آن‌وقت جملهٔ پیرو به یک گروه کلمه با حرف اضافه تبدیل می‌شود: Weil es regnet, … → Wegen des Regens … (به‌خاطر باران).",
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
    ar: "يمكن أن يأتي Partizip قبل الاسم مثل الصفة ويعوّض جملة الوصل. Partizip I (المصدر + d): الشيء يحدث الآن – die steigenden Preise (الأسعار التي ترتفع). Partizip II: الشيء تمّ بالفعل – der ausgefüllte Antrag (الطلب الذي تمّت تعبئته).",
    fa: "‏Partizip می‌تواند مثل صفت قبل از اسم بیاید و جای جملهٔ موصولی را بگیرد. Partizip I (مصدر + d): کار همین حالا در جریان است – die steigenden Preise (قیمت‌های رو به افزایش). Partizip II: کار انجام شده است – der ausgefüllte Antrag (فرمِ پرشده).",
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
