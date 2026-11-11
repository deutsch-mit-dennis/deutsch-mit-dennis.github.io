/* „Laute und Buchstaben“ (#laute, #laute/<section>, #laute/abc) – pronunciation and letter-sound training for A0/A1.
   Audio first: every word has a listen button (DM.speak: recording if one exists, else the device voice).
   Listening quiz with minimal pairs, record-and-compare without automatic scoring (MediaRecorder, stays on the device).
   Progress: DM.store.laute = { best: { <sectionId>: bestScore }, total: { <sectionId>: rounds } }.
   Lazy-loaded by lazy.js for route "laute"; the CSS below is injected from here. */
(function () {
  "use strict";
  const DM = window.DM || (window.DM = {});
  DM.routes = DM.routes || {};

  /* ---------- content ---------- */
  /* w: example words [text, shown?]  ·  pairs: minimal pairs for the listening quiz  ·  rounds: fixed quiz rounds
     rep: phrases for "Sprich nach"  ·  x: explanation in the learner's language (short second line) */
  const SECTIONS = [
    {
      id: "vokale",
      icon: "🅰️",
      title: "Vokale: kurz oder lang?",
      short: "Staat – Stadt, Miete – Mitte",
      de: [
        "Ein Vokal ist lang oder kurz. Das ändert das Wort!",
        "Lang: Staat, Miete, Ofen. Auch ie, aa, ee und Vokal + h sind lang.",
        "Kurz: Stadt, Mitte, offen. Vor tt, ff, mm, ll, nn ist der Vokal kurz.",
      ],
      w: [
        "der Staat",
        "die Stadt",
        "die Miete",
        "die Mitte",
        "der Ofen",
        "offen",
        "fühlen",
        "füllen",
        "das Beet",
        "das Bett",
      ],
      pairs: [
        ["Staat", "Stadt"],
        ["Miete", "Mitte"],
        ["Ofen", "offen"],
        ["fühlen", "füllen"],
        ["Beet", "Bett"],
        ["ihn", "in"],
        ["wen", "wenn"],
        ["Hüte", "Hütte"],
      ],
      rep: ["Staat. Stadt.", "Ich zahle die Miete.", "Der Ofen ist offen."],
      x: {
        en: "A vowel can be long or short. Before a double consonant (tt, ff, mm) it is short; aa, ee, ie and vowel + h are long.",
        uk: "Голосний може бути довгим або коротким. Перед подвоєним приголосним (tt, ff, mm) він короткий; aa, ee, ie та голосний + h – довгі.",
        ru: "Гласный может быть долгим или кратким. Перед удвоенной согласной (tt, ff, mm) он краткий; aa, ee, ie и гласный + h – долгие.",
        ar: "الحرف الصوتي قد يكون طويلاً أو قصيراً. قبل حرف ساكن مضاعف (tt, ff, mm) يكون قصيراً، أمّا aa و ee و ie وحرف صوتي + h فتكون طويلة.",
        fa: "واکه می‌تواند بلند یا کوتاه باشد. پیش از همخوان دوتایی (tt, ff, mm) کوتاه است؛ aa، ee، ie و واکه + h بلند هستند.",
        tr: "Bir ünlü uzun ya da kısa olabilir. Çift ünsüzden (tt, ff, mm) önce kısadır; aa, ee, ie ve ünlü + h uzundur.",
        es: "Una vocal puede ser larga o corta. Antes de una consonante doble (tt, ff, mm) es corta; aa, ee, ie y vocal + h son largas.",
        it: "Una vocale può essere lunga o breve. Prima di una consonante doppia (tt, ff, mm) è breve; aa, ee, ie e vocale + h sono lunghe.",
      },
    },
    {
      id: "umlaute",
      icon: "🔤",
      title: "Umlaute: ä, ö, ü",
      short: "schon – schön, Mutter – Mütter",
      de: [
        "ä, ö und ü sind eigene Laute.",
        "ü: Sag „i“ und mach die Lippen rund.",
        "ö: Sag „e“ und mach die Lippen rund.",
        "ä klingt wie ein offenes „e“: Käse, Äpfel.",
      ],
      w: [
        "schon",
        "schön",
        "die Mutter",
        "die Mütter",
        "zahlen",
        "zählen",
        "vier",
        "für",
        "der Käse",
        "das Öl",
        "die Tür",
        "fünf",
      ],
      pairs: [
        ["schon", "schön"],
        ["Mutter", "Mütter"],
        ["zahlen", "zählen"],
        ["vier", "für"],
        ["Bruder", "Brüder"],
        ["Tochter", "Töchter"],
        ["Apfel", "Äpfel"],
        ["Kuchen", "Küchen"],
      ],
      rep: ["schon. schön.", "Fünf Brötchen, bitte.", "Die Tür ist grün."],
      x: {
        en: "Say a German i and round your lips: that is ü. Say e and round your lips: that is ö. ä sounds like an open e.",
        uk: "Скажи німецьке i та округли губи – це ü. Скажи e та округли губи – це ö. ä звучить як відкрите e.",
        ru: "Скажи немецкое i и округли губы – это ü. Скажи e и округли губы – это ö. ä звучит как открытое e («э»).",
        ar: "انطق i الألمانية ثم دوّر شفتيك: هذا هو ü. انطق e ثم دوّر شفتيك: هذا هو ö. أمّا ä فيُنطق مثل e مفتوحة.",
        fa: "i آلمانی را بگو و لب‌ها را گرد کن: این ü است. e را بگو و لب‌ها را گرد کن: این ö است. ä مثل e باز تلفظ می‌شود.",
        tr: "ö ve ü, Türkçedeki ö ve ü gibidir. ä açık bir e gibi okunur.",
        es: "Di una i alemana y redondea los labios: eso es ü. Di una e y redondea los labios: eso es ö. La ä suena como una e abierta.",
        it: "Di’ una i tedesca e arrotonda le labbra: è la ü. Di’ una e e arrotonda le labbra: è la ö. La ä suona come una e aperta.",
      },
    },
    {
      id: "diphthonge",
      icon: "🔗",
      title: "ei, ie, eu, äu, au",
      short: "Wein – Wien, nein – neun",
      de: [
        "ei spricht man „ai“: mein, drei.",
        "ie ist ein langes „i“: wie, sieben.",
        "eu und äu klingen gleich, wie „oi“: heute, Häuser.",
        "au: Haus, Frau.",
      ],
      w: [
        "mein",
        "drei",
        "die Arbeit",
        "wie",
        "sieben",
        "die Liebe",
        "heute",
        "neu",
        "der Euro",
        "die Häuser",
        "das Haus",
        "die Frau",
      ],
      pairs: [
        ["Wein", "Wien"],
        ["Reise", "Riese"],
        ["Leid", "Lied"],
        ["nein", "neun"],
        ["Feier", "Feuer"],
        ["Laute", "Leute"],
        ["Eis", "aus"],
        ["heiß", "hieß"],
      ],
      rep: ["Wein. Wien.", "Ich heiße Mai.", "Heute kaufe ich neue Schuhe."],
      x: {
        en: "ei sounds like English “eye”, ie is a long “ee”, eu and äu sound like “oy”, au like “ow” in “now”.",
        uk: "ei читається як «ай», ie – довге «і», eu та äu – як «ой», au – як «ау».",
        ru: "ei читается как «ай», ie – долгое «и», eu и äu – как «ой», au – как «ау».",
        ar: "ei تُنطق «آي»، و ie هي i طويلة «إي»، و eu و äu تُنطقان «أُوي»، و au تُنطق «آو».",
        fa: "ei مثل «آی» خوانده می‌شود، ie یک «ای» بلند است، eu و äu مثل «اُی» و au مثل «آو».",
        tr: "ei “ay” gibi, ie uzun “i” gibi, eu ve äu “oy” gibi, au “au” gibi okunur.",
        es: "ei suena «ai», ie es una i larga, eu y äu suenan «oi», au suena «au».",
        it: "ei si legge «ai», ie è una i lunga, eu e äu si leggono «oi», au si legge «au».",
      },
    },
    {
      id: "ch-sch",
      icon: "💨",
      title: "ch, sch, sp und st",
      short: "ich – ach, Kirche – Kirsche",
      de: [
        "ch nach a, o, u, au kommt hinten aus dem Hals: Buch, acht, auch.",
        "ch nach e, i, ä, ö, ü, ei, eu und nach l, n, r ist weich und vorn: ich, Milch, sprechen.",
        "sch: Schule, Tasche.",
        "sp und st am Wortanfang spricht man „schp“ und „scht“: Sport, Straße.",
      ],
      w: [
        "ich",
        "die Milch",
        "sprechen",
        "das Buch",
        "acht",
        "auch",
        "die Schule",
        "die Tasche",
        "der Sport",
        "spielen",
        "die Straße",
        "der Stuhl",
      ],
      pairs: [
        ["Kirche", "Kirsche"],
        ["Männchen", "Menschen"],
        ["Nacht", "nackt"],
        ["reich", "Reis"],
        ["dich", "Tisch"],
        ["Fichte", "Fische"],
      ],
      rep: [
        "ich. auch.",
        "Ich spreche Deutsch.",
        "Die Schule ist in der Bachstraße.",
      ],
      x: {
        en: "After a, o, u, au, ch is made at the back of the mouth (Buch). After e, i, ä, ö, ü, ei, eu and after consonants it is soft and made at the front (ich). sch = English “sh”. At the start of a word, sp and st are spoken “shp” and “sht”.",
        uk: "Після a, o, u, au ch звучить твердо, як «х» (Buch). Після e, i, ä, ö, ü, ei, eu та приголосних – м’яко, як «хь» (ich). sch = «ш». На початку слова sp і st читаються «шп» і «шт».",
        ru: "После a, o, u, au ch звучит твёрдо, как «х» (Buch). После e, i, ä, ö, ü, ei, eu и согласных – мягко, как «хь» (ich). sch = «ш». В начале слова sp и st читаются «шп» и «шт».",
        ar: "بعد a و o و u و au يُنطق ch مثل «خ» (Buch). وبعد e و i و ä و ö و ü و ei و eu وبعد الحروف الساكنة يكون ليّناً ويخرج من مقدّمة الفم (ich). sch = «ش». في بداية الكلمة تُنطق sp و st «شپ» و «شت».",
        fa: "بعد از a، o، u و au حرف ch مثل «خ» تلفظ می‌شود (Buch). بعد از e، i، ä، ö، ü، ei، eu و همخوان‌ها نرم است و در جلوی دهان ساخته می‌شود (ich). sch = «ش». در آغاز واژه sp و st «شپ» و «شت» خوانده می‌شوند.",
        tr: "a, o, u, au’dan sonra ch gırtlaktan, sert okunur (Buch). e, i, ä, ö, ü, ei, eu ve ünsüzlerden sonra yumuşaktır, ağzın önünde çıkar (ich). sch = “ş”. Sözcük başında sp ve st “şp” ve “şt” okunur.",
        es: "Después de a, o, u, au, ch suena como la «j» española (Buch). Después de e, i, ä, ö, ü, ei, eu y de consonantes es más suave y se pronuncia delante (ich). sch = «sh». Al principio de palabra, sp y st se dicen «shp» y «sht».",
        it: "Dopo a, o, u, au, ch si pronuncia in gola (Buch). Dopo e, i, ä, ö, ü, ei, eu e dopo consonante è più dolce e si pronuncia in avanti (ich). sch = «sc» di «scena». A inizio parola sp e st si dicono «shp» e «sht».",
      },
    },
    {
      id: "r-h",
      icon: "🌬️",
      title: "r, -er und h",
      short: "Haus – aus, bitte – bitter",
      de: [
        "r am Anfang von einer Silbe hörst du gut: rot, Reis, Bruder.",
        "-er am Wortende klingt wie ein kurzes „a“: Mutter, Lehrer, Wasser.",
        "h am Wortanfang hörst du: Haus, heute.",
        "h nach einem Vokal hörst du nicht. Der Vokal ist dann lang: gehen, Uhr, wohnen.",
      ],
      w: [
        "rot",
        "der Reis",
        "der Bruder",
        "die Mutter",
        "der Lehrer",
        "das Wasser",
        "das Haus",
        "heute",
        "gehen",
        "die Uhr",
        "wohnen",
        "der Stuhl",
      ],
      pairs: [
        ["Haus", "aus"],
        ["hier", "ihr"],
        ["Hund", "und"],
        ["heiß", "Eis"],
        ["Halle", "alle"],
        ["Reise", "leise"],
        ["bitte", "bitter"],
        ["Liebe", "lieber"],
      ],
      rep: [
        "Haus. aus.",
        "Meine Mutter ist Lehrerin.",
        "Wir gehen um vier Uhr nach Hause.",
      ],
      x: {
        en: "r at the start of a syllable is clearly heard. The ending -er sounds like a short “a”. h at the start of a word is spoken; h after a vowel is silent and makes the vowel long.",
        uk: "r на початку складу чути добре. Закінчення -er звучить як коротке «а». h на початку слова вимовляється; h після голосного не вимовляється – голосний стає довгим.",
        ru: "r в начале слога слышно хорошо. Окончание -er звучит как краткое «а». h в начале слова произносится; h после гласного не произносится – гласный становится долгим.",
        ar: "يُسمع r بوضوح في بداية المقطع. النهاية er تُنطق مثل «a» قصيرة. يُنطق h في بداية الكلمة، أمّا h بعد حرف صوتي فلا يُنطق ويجعل الحرف الصوتي طويلاً.",
        fa: "r در آغاز هجا واضح شنیده می‌شود. پایانهٔ er مثل یک «a» کوتاه تلفظ می‌شود. h در آغاز واژه تلفظ می‌شود؛ h بعد از واکه تلفظ نمی‌شود و واکه را بلند می‌کند.",
        tr: "Hece başındaki r açıkça duyulur. Sözcük sonundaki -er kısa bir “a” gibi okunur. Sözcük başındaki h okunur; ünlüden sonraki h okunmaz, ünlüyü uzatır.",
        es: "La r al principio de sílaba se oye claramente. La terminación -er suena como una «a» corta. La h al principio de palabra se pronuncia (aspirada); después de vocal es muda y alarga la vocal.",
        it: "La r a inizio sillaba si sente bene. La desinenza -er suona come una «a» breve. La h a inizio parola si pronuncia (aspirata); dopo una vocale è muta e allunga la vocale.",
      },
    },
    {
      id: "z-s-v-w",
      icon: "🐝",
      title: "z, s, ß und v, w, f",
      short: "Zeit – seit, wir – vier",
      de: [
        "z spricht man „ts“: Zeit, zehn, Zug.",
        "s vor einem Vokal ist weich, es summt: Sonne, sehr, lesen.",
        "ß und ss sind scharf: Straße, heiß, Wasser.",
        "w spricht man mit Stimme: Wasser, wo. v klingt meistens wie f: Vater, vier.",
        "In Fremdwörtern klingt v wie w: Visum, Vase.",
      ],
      w: [
        "die Zeit",
        "zehn",
        "der Zug",
        "die Sonne",
        "lesen",
        "die Straße",
        "heiß",
        "der Vater",
        "vier",
        "das Wasser",
        "wo",
        "das Fenster",
        "das Visum",
      ],
      pairs: [
        ["Zeit", "seit"],
        ["Zoo", "so"],
        ["reisen", "reißen"],
        ["Kasse", "Katze"],
        ["wir", "vier"],
        ["Wein", "fein"],
        ["Wetter", "Vetter"],
      ],
      rep: [
        "Zeit. seit.",
        "Mein Vater trinkt Wasser.",
        "Der Zug fährt um zehn nach sieben.",
      ],
      x: {
        en: "z = “ts”. s before a vowel is voiced like English “z”. ß and ss are a sharp “s”. w = English “v”. v usually sounds like “f”.",
        uk: "z = «ц». s перед голосним = «з». ß і ss = «с». w = «в». v зазвичай звучить як «ф».",
        ru: "z = «ц». s перед гласным = «з». ß и ss = «с». w = «в». v обычно звучит как «ф».",
        ar: "z = «تس». s قبل حرف صوتي تُنطق «ز». ß و ss تُنطقان «س». w تُنطق مثل v الإنجليزية (ڤ). v تُنطق غالباً «ف».",
        fa: "z = «تس». s پیش از واکه مثل «ز» است. ß و ss مثل «س» هستند. w مثل «و» فارسی (v انگلیسی) است. v معمولاً مثل «ف» تلفظ می‌شود.",
        tr: "z = “ts”. Ünlüden önce s, Türkçedeki “z” gibidir. ß ve ss = “s”. w = Türkçedeki “v”. v çoğunlukla “f” gibi okunur.",
        es: "z = «ts». La s antes de vocal es sonora (vibra). ß y ss = «s» fuerte. w = «v» inglesa. v suena casi siempre como «f».",
        it: "z = «ts». La s davanti a vocale è sonora, come in «rosa». ß e ss = «s» sorda. w = «v» italiana. v suona quasi sempre come «f».",
      },
    },
    {
      id: "wortakzent",
      icon: "🥁",
      title: "Wortakzent",
      short: "EINkaufen – beSUchen",
      de: [
        "In jedem Wort ist eine Silbe laut und stark. Das ist der Akzent.",
        "Meistens ist die erste Silbe stark: ARbeiten, WOHnung.",
        "Trennbare Verben: Der erste Teil ist stark: EINkaufen, ANrufen.",
        "Verben mit be-, ver-, er-, ent-, ge-, zer-: Der Teil danach ist stark: beSUchen, verSTEhen.",
        "Viele Fremdwörter sind am Ende stark: StuDENT, PoliZEI.",
      ],
      w: [
        ["arbeiten", "ARbeiten"],
        ["die Wohnung", "die WOHnung"],
        ["einkaufen", "EINkaufen"],
        ["anrufen", "ANrufen"],
        ["aufstehen", "AUFstehen"],
        ["besuchen", "beSUchen"],
        ["verstehen", "verSTEhen"],
        ["bezahlen", "beZAHlen"],
        ["der Student", "der StuDENT"],
        ["die Polizei", "die PoliZEI"],
        ["die Information", "die InformaTION"],
        ["die Musik", "die MuSIK"],
      ],
      q: "Welche Silbe ist stark?",
      rounds: [
        ["einkaufen", "EINkaufen", "einKAUfen", 0],
        ["besuchen", "BEsuchen", "beSUchen", 1],
        ["anrufen", "ANrufen", "anRUfen", 0],
        ["verstehen", "VERstehen", "verSTEhen", 1],
        ["Student", "STUdent", "StuDENT", 1],
        ["aufstehen", "AUFstehen", "aufSTEhen", 0],
        ["bezahlen", "BEzahlen", "beZAHlen", 1],
        ["Musik", "MUsik", "MuSIK", 1],
      ],
      rep: [
        "einkaufen. besuchen.",
        "Ich kaufe heute ein.",
        "Der Student ruft die Polizei an.",
      ],
      x: {
        en: "Usually the first syllable is stressed. Separable verbs: the prefix is stressed (EINkaufen). Verbs with be-, ver-, er-, ent-, ge-, zer-: the stem is stressed (beSUchen). Many foreign words are stressed at the end.",
        uk: "Зазвичай наголос на першому складі. Відокремлювані дієслова: наголос на префіксі (EINkaufen). Дієслова з be-, ver-, er-, ent-, ge-, zer-: наголос на корені (beSUchen). Багато іншомовних слів мають наголос у кінці.",
        ru: "Обычно ударение на первом слоге. Отделяемые глаголы: ударение на приставке (EINkaufen). Глаголы с be-, ver-, er-, ent-, ge-, zer-: ударение на корне (beSUchen). Во многих иностранных словах ударение в конце.",
        ar: "يقع النبر غالباً على المقطع الأول. في الأفعال المنفصلة يكون النبر على البادئة (EINkaufen). في الأفعال التي تبدأ بـ be و ver و er و ent و ge و zer يكون النبر على جذر الفعل (beSUchen). كثير من الكلمات الأجنبية نبرها في آخرها.",
        fa: "تکیه معمولاً روی هجای اول است. در فعل‌های جداشدنی تکیه روی پیشوند است (EINkaufen). در فعل‌های دارای be، ver، er، ent، ge، zer تکیه روی ریشهٔ فعل است (beSUchen). در بسیاری از واژه‌های بیگانه تکیه در پایان واژه است.",
        tr: "Vurgu genellikle ilk hecededir. Ayrılabilen fiillerde ön ek vurguludur (EINkaufen). be-, ver-, er-, ent-, ge-, zer- ile başlayan fiillerde fiil kökü vurguludur (beSUchen). Birçok yabancı sözcükte vurgu sondadır.",
        es: "Normalmente se acentúa la primera sílaba. Verbos separables: se acentúa el prefijo (EINkaufen). Verbos con be-, ver-, er-, ent-, ge-, zer-: se acentúa la raíz (beSUchen). Muchos extranjerismos se acentúan al final.",
        it: "Di solito l’accento cade sulla prima sillaba. Verbi separabili: l’accento è sul prefisso (EINkaufen). Verbi con be-, ver-, er-, ent-, ge-, zer-: l’accento è sulla radice (beSUchen). Molte parole straniere hanno l’accento alla fine.",
      },
    },
    {
      id: "satzmelodie",
      icon: "🎵",
      title: "Satzmelodie: Aussage oder Frage?",
      short: "Du wohnst hier. – Du wohnst hier?",
      de: [
        "Aussage: Die Stimme geht am Ende nach unten ↘. „Das ist dein Buch.“",
        "Ja/Nein-Frage: Die Stimme geht am Ende nach oben ↗. „Ist das dein Buch?“",
        "W-Frage: Die Stimme geht meistens nach unten ↘. „Wo wohnst du?“",
      ],
      w: [
        ["Das ist dein Buch.", "Das ist dein Buch. ↘"],
        ["Ist das dein Buch?", "Ist das dein Buch? ↗"],
        ["Ich komme mit.", "Ich komme mit. ↘"],
        ["Kommst du mit?", "Kommst du mit? ↗"],
        ["Wo wohnst du?", "Wo wohnst du? ↘"],
        ["Du wohnst hier?", "Du wohnst hier? ↗"],
      ],
      q: "Aussage oder Frage?",
      sentence: true,
      melody: [
        "Du wohnst hier",
        "Das ist dein Buch",
        "Er kommt heute",
        "Sie arbeitet morgen",
        "Ihr habt Zeit",
        "Der Bus fährt um acht",
      ],
      rep: ["Das ist dein Buch.", "Ist das dein Buch?", "Wo wohnst du?"],
      x: {
        en: "Statement: the voice goes down at the end. Yes/no question: the voice goes up. W-question: the voice usually goes down.",
        uk: "Твердження: голос наприкінці йде вниз. Питання «так/ні»: голос іде вгору. W-питання: голос зазвичай іде вниз.",
        ru: "Утверждение: голос в конце идёт вниз. Вопрос «да/нет»: голос идёт вверх. W-вопрос: голос обычно идёт вниз.",
        ar: "في الجملة الخبرية ينخفض الصوت في النهاية. في سؤال «نعم/لا» يرتفع الصوت. في أسئلة W ينخفض الصوت غالباً.",
        fa: "در جملهٔ خبری صدا در پایان پایین می‌آید. در پرسش «بله/نه» صدا بالا می‌رود. در پرسش‌های W صدا معمولاً پایین می‌آید.",
        tr: "Düz cümlede ses sonda alçalır. Evet/hayır sorusunda ses yükselir. W-sorularında ses genellikle alçalır.",
        es: "Afirmación: la voz baja al final. Pregunta de sí/no: la voz sube. Pregunta con W: la voz normalmente baja.",
        it: "Affermazione: la voce scende alla fine. Domanda sì/no: la voce sale. Domanda con W: di solito la voce scende.",
      },
    },
  ];

  /* letter, name, what the voice says, example word */
  const ABC = [
    ["A a", "a", "A", "der Apfel"],
    ["B b", "be", "B", "das Brot"],
    ["C c", "ce", "C", "der Computer"],
    ["D d", "de", "D", "die Dusche"],
    ["E e", "e", "E", "das Essen"],
    ["F f", "ef", "F", "der Fisch"],
    ["G g", "ge", "G", "das Geld"],
    ["H h", "ha", "H", "das Haus"],
    ["I i", "i", "I", "die Insel"],
    ["J j", "jot", "J", "die Jacke"],
    ["K k", "ka", "K", "die Katze"],
    ["L l", "el", "L", "die Lampe"],
    ["M m", "em", "M", "die Milch"],
    ["N n", "en", "N", "die Nase"],
    ["O o", "o", "O", "das Obst"],
    ["P p", "pe", "P", "das Paket"],
    ["Q q", "ku", "Q", "die Quittung"],
    ["R r", "er", "R", "der Reis"],
    ["S s", "es", "S", "die Sonne"],
    ["T t", "te", "T", "der Tisch"],
    ["U u", "u", "U", "die Uhr"],
    ["V v", "vau", "V", "der Vogel"],
    ["W w", "we", "W", "das Wasser"],
    ["X x", "iks", "X", "das Taxi"],
    ["Y y", "üpsilon", "Ypsilon", "das Baby"],
    ["Z z", "zett", "Z", "der Zug"],
    ["Ä ä", "a-Umlaut", "Ä", "der Käse"],
    ["Ö ö", "o-Umlaut", "Ö", "das Öl"],
    ["Ü ü", "u-Umlaut", "Ü", "die Tür"],
    ["ß", "Eszett", "Eszett", "die Straße"],
  ];

  /* short helper lines in the learner's language */
  const UI = {
    intro: {
      en: "Listen, compare and repeat. You do not need to read much.",
      uk: "Слухай, порівнюй і повторюй. Читати багато не потрібно.",
      ru: "Слушай, сравнивай и повторяй. Много читать не нужно.",
      ar: "استمع وقارن وكرّر. لا تحتاج إلى قراءة الكثير.",
      fa: "گوش کن، مقایسه کن و تکرار کن. لازم نیست زیاد بخوانی.",
      tr: "Dinle, karşılaştır ve tekrar et. Çok okumana gerek yok.",
      es: "Escucha, compara y repite. No necesitas leer mucho.",
      it: "Ascolta, confronta e ripeti. Non devi leggere molto.",
    },
    quiz: {
      en: "Listen: which one do you hear?",
      uk: "Послухай: що ти чуєш?",
      ru: "Послушай: что ты слышишь?",
      ar: "استمع: ماذا تسمع؟",
      fa: "گوش کن: کدام را می‌شنوی؟",
      tr: "Dinle: Hangisini duyuyorsun?",
      es: "Escucha: ¿cuál oyes?",
      it: "Ascolta: quale senti?",
    },
    rep: {
      en: "Repeat. Record yourself and compare. Nothing is scored, and the recording stays on your device.",
      uk: "Повтори. Запиши себе й порівняй. Оцінки немає, запис залишається на твоєму пристрої.",
      ru: "Повтори. Запиши себя и сравни. Оценки нет, запись остаётся на твоём устройстве.",
      ar: "كرّر. سجّل صوتك وقارن. لا يوجد تقييم، والتسجيل يبقى على جهازك.",
      fa: "تکرار کن. صدایت را ضبط کن و مقایسه کن. نمره‌ای داده نمی‌شود و صدای ضبط‌شده روی دستگاه خودت می‌ماند.",
      tr: "Tekrar et. Sesini kaydet ve karşılaştır. Puan verilmez, kayıt cihazında kalır.",
      es: "Repite. Grábate y compara. No hay nota y la grabación se queda en tu dispositivo.",
      it: "Ripeti. Registrati e confronta. Non c’è voto e la registrazione resta sul tuo dispositivo.",
    },
    abc: {
      en: "The alphabet: letter, its name and an example word.",
      uk: "Алфавіт: літера, її назва та слово-приклад.",
      ru: "Алфавит: буква, её название и слово-пример.",
      ar: "الأبجدية: الحرف واسمه وكلمة كمثال.",
      fa: "الفبا: حرف، نام آن و یک واژه برای نمونه.",
      tr: "Alfabe: harf, harfin adı ve örnek bir sözcük.",
      es: "El alfabeto: la letra, su nombre y una palabra de ejemplo.",
      it: "L’alfabeto: la lettera, il suo nome e una parola di esempio.",
    },
  };

  /* ---------- helpers ---------- */
  const esc = (s) =>
    DM.esc
      ? DM.esc(s)
      : String(s ?? "").replace(
          /[&<>"']/g,
          (c) =>
            ({
              "&": "&amp;",
              "<": "&lt;",
              ">": "&gt;",
              '"': "&quot;",
              "'": "&#39;",
            })[c],
        );
  const lang = () => {
    try {
      return (DM.hi18n && DM.hi18n.get && DM.hi18n.get()) || "de";
    } catch {
      return "de";
    }
  };
  const l1 = (map) => {
    const l = lang(),
      t = map && map[l];
    return t
      ? `<p class="lt-l1" lang="${l}" dir="${l === "ar" || l === "fa" ? "rtl" : "ltr"}">${esc(t)}</p>`
      : "";
  };
  let fallback = {};
  const state = () => {
    const s = DM.store || fallback;
    if (!s.laute || typeof s.laute !== "object") s.laute = {};
    s.laute.best = s.laute.best || {};
    s.laute.total = s.laute.total || {};
    return s.laute;
  };
  const persist = () => {
    try {
      DM.save && DM.save();
    } catch {
      /* private mode */
    }
  };
  const shuffle = (a) => {
    a = a.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };
  /* stressed syllable (run of capitals) in bold */
  const accent = (s) =>
    esc(s).replace(/[A-ZÄÖÜ]{2,}/g, (m) => `<b class="lt-acc">${m}</b>`);
  /* same key as site.js uses for recordings (FNV-1a over the normalised text) */
  const fnv = (s) => {
    let h = 0x811c9dc5;
    for (const b of new TextEncoder().encode(
      String(s ?? "")
        .replace(/\s+/g, " ")
        .trim(),
    )) {
      h ^= b;
      h = Math.imul(h, 0x01000193) >>> 0;
    }
    return "t" + h.toString(16).padStart(8, "0");
  };
  const hasRec = (text) => {
    try {
      return !!(DM.ttsSrc && DM.ttsSrc(fnv(text)));
    } catch {
      return false;
    }
  };
  const canSpeak = () => !!window.speechSynthesis || !!DM.ttsSrc;
  const NORMAL = 0.9,
    SLOW = 0.6;
  let playing = null;
  function stopAudio() {
    try {
      window.speechSynthesis && window.speechSynthesis.cancel();
    } catch {
      /* ignore */
    }
    if (playing) {
      try {
        playing.pause();
      } catch {
        /* ignore */
      }
      playing = null;
    }
    document
      .querySelectorAll(".lt-root .is-playing")
      .forEach((b) => b.classList.remove("is-playing"));
  }
  function say(text, rate, btn, onend) {
    stopAudio();
    let ok = false;
    const end = () => {
      btn && btn.classList.remove("is-playing");
      onend && onend();
    };
    try {
      ok = !!(DM.speak && DM.speak(text, { rate: rate || NORMAL, onend: end }));
    } catch {
      ok = false;
    }
    if (ok) btn && btn.classList.add("is-playing");
    else {
      const h = document.querySelector(".lt-root .lt-novoice");
      if (h) h.hidden = false;
      onend && onend();
    }
    return ok;
  }
  const listenBtns = (text, shown, big) =>
    `<span class="lt-w${big ? " lt-w-big" : ""}"><button type="button" class="lt-say" data-say="${esc(text)}"><span aria-hidden="true">🔊</span> <span class="lt-word">${shown}</span></button><button type="button" class="lt-slow" data-say="${esc(text)}" data-slow="1" aria-label="${esc(text)} – langsam hören" title="Langsam">🐢</button></span>`;
  const voiceHint =
    '<p class="dm-small lt-device" hidden>Die Stimme kommt von deinem Gerät. Bald gibt es Aufnahmen.</p><p class="dm-hint lt-novoice" hidden>Dein Gerät kann hier nichts vorlesen. Probiere einen anderen Browser.</p>';
  function showVoiceHint(root, texts) {
    const check = () => {
      const el = root.querySelector(".lt-device");
      if (
        el &&
        root.isConnected &&
        window.speechSynthesis &&
        texts.some((t) => !hasRec(t))
      )
        el.hidden = false;
    };
    if (DM.ttsReady && DM.ttsReady.then) DM.ttsReady.then(check, check);
    else check();
  }

  /* ---------- CSS ---------- */
  function css() {
    if (document.getElementById("lt-css")) return;
    const s = document.createElement("style");
    s.id = "lt-css";
    s.textContent = `
.lt-root{display:grid;gap:18px;min-width:0}
.lt-root .dm-card{min-width:0}
.lt-root h2{margin:0 0 10px;font-size:clamp(21px,2.6vw,26px)}
.lt-l1{margin:8px 0 0;font-size:15px;line-height:1.5;color:var(--dm-muted,#566078);border-inline-start:3px solid var(--dm-tinte-soft,#E8ECFA);padding-inline-start:10px}
.lt-rules{margin:0;padding:0;list-style:none;display:grid;gap:8px}
.lt-rules li{padding-left:22px;position:relative;line-height:1.5}
.lt-rules li::before{content:'•';position:absolute;left:6px;color:var(--dm-tinte,#2341B5);font-weight:700}
.lt-words{display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:10px}
.lt-words.lt-sent{grid-template-columns:1fr}
.lt-w{display:flex;min-width:0;border:2px solid var(--dm-line,#DADFEA);border-radius:12px;background:var(--dm-surface,#fff);overflow:hidden}
.lt-w button{font:inherit;border:0;background:none;color:var(--dm-ink,#172036);cursor:pointer;min-height:48px}
.lt-say{flex:1;min-width:0;text-align:left;padding:8px 10px 8px 12px;font-size:19px!important;font-weight:700!important;overflow-wrap:anywhere}
.lt-slow{flex:none;width:48px;font-size:20px!important;border-left:1px solid var(--dm-line,#DADFEA)!important}
.lt-w button:hover,.lt-w button:focus-visible{background:var(--dm-tinte-soft,#E8ECFA)}
.lt-w button.is-playing{background:var(--dm-marker,#FFE45C)}
.lt-acc{color:var(--dm-tinte,#2341B5);text-decoration:underline;text-underline-offset:3px}
.lt-quiz-top{display:flex;justify-content:space-between;align-items:baseline;gap:10px;flex-wrap:wrap}
.lt-quiz-top p{margin:0}
.lt-hear{display:flex;gap:10px;flex-wrap:wrap;margin:12px 0}
.lt-hear .dm-btn{flex:1 1 150px}
.lt-opts{display:grid;grid-template-columns:1fr 1fr;gap:10px}
.lt-opts.lt-col{grid-template-columns:1fr}
.lt-opt{min-height:72px;padding:10px 8px;border:2px solid var(--dm-tinte,#2341B5);border-radius:14px;background:var(--dm-surface,#fff);color:var(--dm-ink,#172036);font:700 clamp(19px,5.6vw,26px)/1.2 var(--dm-font,system-ui);cursor:pointer;overflow-wrap:anywhere;min-width:0}
.lt-opt:hover:not(:disabled),.lt-opt:focus-visible{background:var(--dm-tinte-soft,#E8ECFA)}
.lt-opt:disabled{cursor:default;opacity:.55}
.lt-opt.is-right{opacity:1;border-color:var(--dm-gruen,#1D7A45);background:#E5F4EB}
.lt-opt.is-wrong{opacity:1;border-color:var(--dm-rot,#C2362B);background:#FBE9E7}
.lt-fb{min-height:1.5em;margin:12px 0 0;font-weight:700}
.lt-fb.good{color:var(--dm-gruen,#1D7A45)}.lt-fb.bad{color:var(--dm-rot,#C2362B)}
.lt-after{margin-top:10px}
.lt-rep{display:grid;gap:12px;margin:0;padding:0;list-style:none}
.lt-rep li{border:1px solid var(--dm-line,#DADFEA);border-radius:12px;padding:12px;display:grid;gap:10px;min-width:0}
.lt-rep-text{margin:0;font-size:20px;font-weight:700;overflow-wrap:anywhere}
.lt-rep .dm-row .dm-btn{flex:1 1 130px;padding-left:10px;padding-right:10px}
.lt-rec.is-on{background:var(--dm-rot,#C2362B)!important;border-color:var(--dm-rot,#C2362B)!important;color:#fff!important}
.lt-abc{width:100%;border-collapse:collapse;table-layout:fixed}
.lt-abc th{text-align:left;font-size:14px;color:var(--dm-muted,#566078);padding:4px 6px}
.lt-abc td{padding:5px 6px;border-top:1px solid var(--dm-line,#DADFEA);vertical-align:middle;overflow-wrap:anywhere}
.lt-abc th:first-child{width:86px}.lt-abc th:nth-child(2){width:86px}
.lt-abc button{font:700 18px/1.2 var(--dm-font,system-ui);min-height:44px;width:100%;text-align:left;padding:6px 8px;border:2px solid var(--dm-line,#DADFEA);border-radius:10px;background:var(--dm-surface,#fff);color:var(--dm-ink,#172036);cursor:pointer}
.lt-abc button:hover,.lt-abc button:focus-visible{background:var(--dm-tinte-soft,#E8ECFA)}
.lt-abc button.is-playing{background:var(--dm-marker,#FFE45C)}
.lt-abc .lt-letter{font-size:21px}
.lt-done{color:var(--dm-gruen,#1D7A45);font-weight:700}
.lt-pn{display:flex;gap:10px;flex-wrap:wrap;justify-content:space-between}
.lt-pn .dm-btn{flex:1 1 140px}
@media (max-width:420px){.lt-words{grid-template-columns:1fr 1fr}.lt-words.lt-sent{grid-template-columns:1fr}.lt-say{font-size:17px!important;padding-left:8px;padding-right:4px}.lt-slow{width:44px}.lt-abc th:first-child{width:74px}.lt-abc th:nth-child(2){width:78px}}
@media (max-width:340px){.lt-words{grid-template-columns:1fr}}
`;
    document.head.appendChild(s);
  }

  /* ---------- pages ---------- */
  const page = (html) => {
    css();
    cleanup();
    (
      DM.page ||
      ((h) => {
        const m = document.querySelector("main");
        if (m) m.innerHTML = h;
      })
    )(`<div class="lt-root">${html}</div>`, "lt-page");
    return document.querySelector(".lt-root");
  };
  const crumbs = (items) => (DM.crumbs ? DM.crumbs(items) : "");
  function bindListen(root) {
    root.addEventListener("click", (e) => {
      const b = e.target.closest("[data-say]");
      if (!b || !root.contains(b)) return;
      if (b.classList.contains("is-playing")) {
        stopAudio();
        return;
      }
      say(b.dataset.say, b.dataset.slow ? SLOW : NORMAL, b);
    });
  }

  function hub() {
    const st = state();
    const done = SECTIONS.filter((s) => st.best[s.id] !== undefined).length;
    const root = page(`${crumbs([["Laute und Buchstaben"]])}
      <div class="dm-head"><h1>Laute und Buchstaben</h1><p class="dm-lead">Hör zu und sprich nach. So lernst du die deutschen Laute – Schritt für Schritt.</p>${l1(UI.intro)}</div>
      <section class="dm-section"><div class="dm-section-head"><h2>Laute üben</h2><p>${done} von ${SECTIONS.length} geübt</p></div>
        <div class="dm-paths">${SECTIONS.map((s) => {
          const b = st.best[s.id],
            t = st.total[s.id] || 0;
          return `<a class="dm-path dm-g-mint" href="#laute/${s.id}"><span class="dm-path-icon" aria-hidden="true">${s.icon}</span><span class="dm-path-text"><b>${esc(s.title)}</b><span>${esc(s.short)}</span>${b !== undefined && t ? `<span class="dm-mini-progress"><i style="width:${Math.round((b / t) * 100)}%"></i></span><small class="lt-done">✓ Hör-Quiz: ${b} von ${t} richtig</small>` : ""}</span></a>`;
        }).join("")}</div></section>
      <section class="dm-section"><div class="dm-section-head"><h2>Das Alphabet</h2></div>
        <div class="dm-paths"><a class="dm-path dm-g-sun" href="#laute/abc"><span class="dm-path-icon" aria-hidden="true">🔡</span><span class="dm-path-text"><b>Buchstaben und Laute</b><span>Alle Buchstaben von A bis Z mit Ton und einem Beispielwort</span></span></a></div></section>
      <p class="dm-small">Tipp: Übe jeden Tag fünf Minuten. Sprich laut!</p>`);
    return root;
  }

  function abc() {
    const root =
      page(`${crumbs([["Laute und Buchstaben", "#laute"], ["Buchstaben und Laute"]])}
      <div class="dm-head"><h1>Buchstaben und Laute</h1><p class="dm-lead">Tippe auf einen Buchstaben oder auf ein Wort. Hör zu und sprich nach.</p>${l1(UI.abc)}</div>
      <section class="dm-card">
        <table class="lt-abc"><thead><tr><th scope="col">Buchstabe</th><th scope="col">Name</th><th scope="col">Beispiel</th></tr></thead>
        <tbody>${ABC.map(([letter, name, spoken, word]) => `<tr><td><button type="button" class="lt-letter" data-say="${esc(spoken)}" aria-label="Buchstabe ${esc(name)} hören">${esc(letter)}</button></td><td>${esc(name)}</td><td><button type="button" data-say="${esc(word)}"><span aria-hidden="true">🔊</span> ${esc(word)}</button></td></tr>`).join("")}</tbody></table>
        ${voiceHint}
      </section>
      <div class="dm-row dm-next"><a class="dm-btn" href="#erste-schritte/alphabet">Alphabet üben (Erste Schritte)</a><a class="dm-btn dm-btn-quiet" href="#laute">Zurück zu den Lauten</a></div>`);
    bindListen(root);
    showVoiceHint(
      root,
      ABC.map((a) => a[3]),
    );
  }

  function section(id) {
    const i = SECTIONS.findIndex((s) => s.id === id);
    if (i < 0) return hub();
    const sec = SECTIONS[i],
      prev = SECTIONS[i - 1],
      next = SECTIONS[i + 1];
    const words = sec.w.map((w) => (Array.isArray(w) ? w : [w, w]));
    const root =
      page(`${crumbs([["Laute und Buchstaben", "#laute"], [sec.title]])}
      <div class="dm-head"><h1>${esc(sec.title)}</h1></div>
      <section class="dm-card" aria-labelledby="lt-h-rule"><h2 id="lt-h-rule">So geht es</h2>
        <ul class="lt-rules">${sec.de.map((t) => `<li>${accent(t)}</li>`).join("")}</ul>${l1(sec.x)}</section>
      <section class="dm-card" aria-labelledby="lt-h-words"><h2 id="lt-h-words">Hör zu</h2>
        <p class="dm-small">Tippe auf ein Wort. 🐢 = langsam.</p>
        <div class="lt-words${sec.sentence ? " lt-sent" : ""}">${words.map(([t, shown]) => listenBtns(t, accent(shown))).join("")}</div>
        ${voiceHint}</section>
      <section class="dm-card" aria-labelledby="lt-h-quiz"><h2 id="lt-h-quiz">Hör zu: ${esc(sec.q || "Welches Wort hörst du?")}</h2>${l1(UI.quiz)}<div id="lt-quiz"></div></section>
      <section class="dm-card" aria-labelledby="lt-h-rep"><h2 id="lt-h-rep">Sprich nach</h2>
        <p>Hör das Vorbild. Nimm dich auf. Vergleiche dann.</p>${l1(UI.rep)}
        <ul class="lt-rep">${sec.rep.map((t, k) => `<li data-k="${k}"><p class="lt-rep-text">${esc(t)}</p><div class="dm-row"><button type="button" class="dm-btn dm-btn-quiet" data-say="${esc(t)}"><span aria-hidden="true">🔊</span> Vorbild</button><button type="button" class="dm-btn dm-btn-quiet lt-rec" data-rec="${k}" aria-pressed="false"><span aria-hidden="true">●</span> <span class="lt-rec-label">Aufnehmen</span></button><button type="button" class="dm-btn dm-btn-quiet lt-cmp" data-cmp="${k}" disabled><span aria-hidden="true">▶</span> Vergleichen</button></div></li>`).join("")}</ul>
        <p class="lt-fb" id="lt-rec-msg" role="status" aria-live="polite"></p>
        <p class="dm-small">Die Seite bewertet deine Aussprache nicht. Hör selbst: Klingt es wie das Vorbild? Deine Aufnahme bleibt auf deinem Gerät.</p></section>
      <nav class="lt-pn" aria-label="Weitere Laute">${prev ? `<a class="dm-btn dm-btn-quiet" href="#laute/${prev.id}">← ${esc(prev.title)}</a>` : '<a class="dm-btn dm-btn-quiet" href="#laute">← Übersicht</a>'}${next ? `<a class="dm-btn" href="#laute/${next.id}">${esc(next.title)} →</a>` : '<a class="dm-btn" href="#laute/abc">Buchstaben und Laute →</a>'}</nav>`);
    bindListen(root);
    showVoiceHint(
      root,
      words.map((w) => w[0]),
    );
    quiz(root.querySelector("#lt-quiz"), sec);
    recorder(root);
  }

  /* ---------- listening quiz ---------- */
  function buildRounds(sec) {
    if (sec.rounds)
      return shuffle(sec.rounds)
        .slice(0, 6)
        .map(([sayText, a, b, ans]) => ({
          say: sayText,
          opts: [a, b],
          ans,
          hear: [sayText],
        }));
    if (sec.melody)
      return shuffle(sec.melody)
        .slice(0, 6)
        .map((t) => {
          const ans = Math.random() < 0.5 ? 0 : 1;
          return {
            say: t + (ans ? "?" : "."),
            opts: ["Aussage  .", "Frage  ?"],
            ans,
            hear: [t + ".", t + "?"],
            show: [t + ".", t + "?"],
          };
        });
    return shuffle(sec.pairs)
      .slice(0, 6)
      .map((p) => {
        const ans = Math.random() < 0.5 ? 0 : 1;
        return { say: p[ans], opts: p, ans, hear: p };
      });
  }
  function quiz(box, sec) {
    let rounds = buildRounds(sec),
      n = 0,
      score = 0,
      heard = false,
      answered = false;
    const label = (o) => (sec.rounds ? accent(o) : esc(o));
    const draw = () => {
      const r = rounds[n];
      heard = false;
      answered = false;
      box.innerHTML = `<div class="lt-quiz-top"><p class="dm-path-meta">Runde ${n + 1} von ${rounds.length}</p><p class="dm-small">Richtig: ${score}</p></div>
        <div class="lt-hear"><button type="button" class="dm-btn" id="lt-q-play"><span aria-hidden="true">🔊</span> Hör zu</button><button type="button" class="dm-btn dm-btn-quiet" id="lt-q-slow"><span aria-hidden="true">🐢</span> Langsam</button></div>
        <div class="lt-opts${sec.sentence ? "" : ""}">${r.opts.map((o, k) => `<button type="button" class="lt-opt" data-opt="${k}" disabled>${label(o)}</button>`).join("")}</div>
        <p class="lt-fb" id="lt-q-fb" role="status" aria-live="polite">Hör zuerst zu. Tippe dann auf die Antwort.</p>
        <div class="lt-after" id="lt-q-after" hidden></div>`;
    };
    const finish = () => {
      const st = state(),
        id = sec.id;
      if (st.best[id] === undefined || score > st.best[id]) st.best[id] = score;
      st.total[id] = rounds.length;
      persist();
      const all = score === rounds.length;
      box.innerHTML = `<p class="lt-fb good">${all ? "Super! Alles richtig. 🎉" : `Du hast ${score} von ${rounds.length} richtig.`}</p>
        <p>${all ? "Deine Ohren sind gut! Sprich die Wörter jetzt laut." : "Das ist normal. Hör die Wörter oben noch einmal. Probiere es dann wieder."}</p>
        <div class="dm-row"><button type="button" class="dm-btn" id="lt-q-again">Noch einmal</button></div>`;
      if (all) {
        try {
          DM.celebrate && DM.celebrate(box);
        } catch {
          /* ignore */
        }
      }
    };
    box.addEventListener("click", (e) => {
      const t = e.target.closest("button");
      if (!t) return;
      const r = rounds[n];
      if (t.id === "lt-q-play" || t.id === "lt-q-slow") {
        say(r.say, t.id === "lt-q-slow" ? SLOW : NORMAL, t);
        if (!heard) {
          heard = true;
          if (!answered) {
            box.querySelectorAll(".lt-opt").forEach((o) => {
              o.disabled = false;
            });
            box.querySelector("#lt-q-fb").textContent =
              sec.q || "Welches Wort hörst du?";
          }
        }
        return;
      }
      if (t.dataset.opt !== undefined && !answered) {
        answered = true;
        stopAudio();
        const k = Number(t.dataset.opt),
          good = k === r.ans,
          fb = box.querySelector("#lt-q-fb");
        box.querySelectorAll(".lt-opt").forEach((o, j) => {
          o.disabled = true;
          if (j === r.ans) o.classList.add("is-right");
          else if (j === k) o.classList.add("is-wrong");
        });
        if (good) score++;
        const right = r.show ? r.show[r.ans] : r.opts[r.ans];
        fb.className = "lt-fb " + (good ? "good" : "bad");
        fb.innerHTML = good
          ? `Richtig! Das war: „${label(right)}“`
          : `Noch nicht. Das war: „${label(right)}“`;
        if (!good) {
          try {
            window.DMFehler &&
              window.DMFehler.add({
                q: sec.q || "Welches Wort hörst du?",
                a: right,
                src: "Laute",
                speak: r.say,
              });
          } catch {
            /* ignore */
          }
        }
        const after = box.querySelector("#lt-q-after");
        after.hidden = false;
        after.innerHTML = `${r.hear.length > 1 ? `<p class="dm-small">Hör noch einmal beide:</p><div class="lt-words${sec.melody ? " lt-sent" : ""}">${r.hear.map((h) => listenBtns(h, esc(h))).join("")}</div>` : ""}
          <div class="dm-row" style="margin-top:12px"><button type="button" class="dm-btn" id="lt-q-next">${n < rounds.length - 1 ? "Weiter" : "Ergebnis zeigen"}</button></div>`;
        box.querySelector(".lt-quiz-top .dm-small").textContent =
          "Richtig: " + score;
        return;
      }
      if (t.id === "lt-q-next") {
        stopAudio();
        n++;
        if (n < rounds.length) draw();
        else finish();
        return;
      }
      if (t.id === "lt-q-again") {
        rounds = buildRounds(sec);
        n = 0;
        score = 0;
        draw();
      }
    });
    draw();
  }

  /* ---------- record and compare (no scoring, nothing leaves the device) ---------- */
  let recState = null;
  function cleanup() {
    stopAudio();
    const r = recState;
    recState = null;
    if (!r) return;
    clearTimeout(r.timer);
    try {
      r.rec && r.rec.state !== "inactive" && r.rec.stop();
    } catch {
      /* ignore */
    }
    try {
      r.stream && r.stream.getTracks().forEach((t) => t.stop());
    } catch {
      /* ignore */
    }
    Object.values(r.urls).forEach((u) => {
      try {
        URL.revokeObjectURL(u);
      } catch {
        /* ignore */
      }
    });
  }
  function recorder(root) {
    const R = (recState = {
      rec: null,
      stream: null,
      timer: 0,
      urls: {},
      active: null,
    });
    const msg = root.querySelector("#lt-rec-msg");
    const tell = (text, cls) => {
      msg.textContent = text;
      msg.className = "lt-fb" + (cls ? " " + cls : "");
    };
    const setBtn = (b, on) => {
      b.classList.toggle("is-on", on);
      b.setAttribute("aria-pressed", on ? "true" : "false");
      b.querySelector(".lt-rec-label").textContent = on
        ? "Stopp"
        : R.urls[b.dataset.rec]
          ? "Noch einmal"
          : "Aufnehmen";
      b.firstElementChild.textContent = on ? "■" : "●";
    };
    const stop = () => {
      clearTimeout(R.timer);
      try {
        R.rec && R.rec.state !== "inactive" && R.rec.stop();
      } catch {
        /* ignore */
      }
    };
    root.addEventListener("click", async (e) => {
      const recBtn = e.target.closest("[data-rec]"),
        cmpBtn = e.target.closest("[data-cmp]");
      if (recBtn) {
        if (R.active !== null) {
          const same = R.active === recBtn.dataset.rec;
          stop();
          if (same) return;
        }
        if (
          !navigator.mediaDevices ||
          !navigator.mediaDevices.getUserMedia ||
          !window.MediaRecorder
        ) {
          tell(
            "Dein Browser kann hier nicht aufnehmen. Kein Problem: Hör das Vorbild und sprich laut nach.",
            "bad",
          );
          return;
        }
        stopAudio();
        let stream;
        try {
          stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        } catch {
          tell(
            "Das Mikrofon ist nicht erlaubt. Erlaube es im Browser (Schloss-Symbol oben). Oder übe ohne Aufnahme: Hör zu und sprich laut nach.",
            "bad",
          );
          return;
        }
        if (recState !== R || !root.isConnected) {
          stream.getTracks().forEach((t) => t.stop());
          return;
        }
        const k = recBtn.dataset.rec,
          chunks = [];
        let rec;
        try {
          rec = new MediaRecorder(stream);
        } catch {
          stream.getTracks().forEach((t) => t.stop());
          tell(
            "Die Aufnahme geht in diesem Browser leider nicht. Sprich einfach laut nach.",
            "bad",
          );
          return;
        }
        R.rec = rec;
        R.stream = stream;
        R.active = k;
        rec.ondataavailable = (ev) => {
          if (ev.data && ev.data.size) chunks.push(ev.data);
        };
        rec.onstop = () => {
          stream.getTracks().forEach((t) => t.stop());
          if (R.active === k) R.active = null;
          if (recState !== R) return;
          if (chunks.length) {
            if (R.urls[k]) URL.revokeObjectURL(R.urls[k]);
            R.urls[k] = URL.createObjectURL(
              new Blob(chunks, { type: rec.mimeType || "audio/webm" }),
            );
            const c = root.querySelector(`[data-cmp="${k}"]`);
            if (c) c.disabled = false;
            tell("Fertig! Tippe jetzt auf „Vergleichen“.", "good");
          } else
            tell("Ich habe nichts gehört. Probiere es noch einmal.", "bad");
          setBtn(recBtn, false);
        };
        rec.start();
        setBtn(recBtn, true);
        tell("Aufnahme läuft … Sprich jetzt. Tippe dann auf „Stopp“.");
        R.timer = setTimeout(stop, 8000);
        return;
      }
      if (cmpBtn && R.urls[cmpBtn.dataset.cmp]) {
        const li = cmpBtn.closest("li"),
          text = li.querySelector(".lt-rep-text").textContent,
          url = R.urls[cmpBtn.dataset.cmp];
        const mine = () => {
          if (recState !== R) return;
          tell("Jetzt du: deine Aufnahme.");
          const a = new Audio(url);
          playing = a;
          cmpBtn.classList.add("is-playing");
          a.onended = a.onerror = () => {
            cmpBtn.classList.remove("is-playing");
            tell("Klingt es gleich? Wenn nicht: Hör das Vorbild noch einmal.");
          };
          a.play().catch(() => a.onerror());
        };
        tell("Zuerst das Vorbild …");
        if (!say(text, NORMAL, cmpBtn, mine)) {
          /* no voice: say() already called mine() */
        }
      }
    });
  }

  window.addEventListener("hashchange", () => {
    if (!/^#laute(\/|$)/.test(location.hash)) cleanup();
  });

  DM.routes.laute = (p) => {
    const id = p && p[1];
    if (!id) hub();
    else if (id === "abc") abc();
    else section(id);
  };
})();
