// Kurstagebuch – lesson 4 (protocol). Data contract: /kurstagebuch/SCHEMA.md
// Translation order (tr): uk, ar, fa, tr, ro, sq, mn, fr
// All names in examples are invented.
window.KT_DAY = {
  "date": "2026-11-27",
  "nr": 4,
  "weekday": "Freitag",
  "level": "A1",
  "title": "Dinge im Kursraum und Bitten",
  "intro": "Heute ging es um Dinge im Kursraum: Was ist das? Wem gehört das? Wir haben ein / kein, mein / dein und er / es / sie geübt, dazu den Akkusativ (einen, ein, eine) und freundliche Bitten mit du und Sie.",
  "goals": [
    "Ich kann Dinge im Kursraum mit Artikel und Plural nennen.",
    "Ich kann fragen und sagen, was das ist und wem es gehört: ein, kein, mein, dein.",
    "Ich kann der, das, die durch er, es, sie ersetzen: Der Laptop ist neu. Er ist schnell.",
    "Ich kann um etwas bitten und den Akkusativ benutzen: einen Stift, ein Heft, eine Maus.",
    "Ich kann freundliche Bitten mit du und Sie sagen: Verb auf Position 1.",
    "Ich kann sagen, ob etwas an oder aus, auf oder zu ist."
  ],
  "sections": [
    {
      "id": "dinge",
      "icon": "🎒",
      "title": "Dinge im Kursraum",
      "blocks": [
        {
          "type": "text",
          "text": "Wiederholung: der Kugelschreiber = der Kuli (<a href=\"/kurstagebuch/2026-11-19/\">Tag 1</a>), der Tisch, der Stuhl, das Handy (<a href=\"/kurstagebuch/2026-11-26/\">Tag 3</a>)."
        },
        {
          "type": "words",
          "title": "der-Wörter",
          "items": [
            { "de": "der Stift – die Stifte", "emoji": "🖊️",
              "tr": ["ручка", "القلم", "خودکار", "kalem", "pixul", "stilolapsi", "үзэг", "le stylo"] },
            { "de": "der Bleistift – die Bleistifte", "emoji": "✏️",
              "tr": ["олівець", "قلم الرصاص", "مداد", "kurşun kalem", "creionul", "lapsi", "харандаа", "le crayon (à papier)"] },
            { "de": "der Rucksack – die Rucksäcke", "emoji": "🎒",
              "tr": ["рюкзак", "حقيبة الظهر", "کوله‌پشتی", "sırt çantası", "rucsacul", "çanta e shpinës", "үүргэвч", "le sac à dos"] },
            { "de": "der Schlüssel – die Schlüssel", "emoji": "🔑",
              "tr": ["ключ", "المفتاح", "کلید", "anahtar", "cheia", "çelësi", "түлхүүр", "la clé"] },
            { "de": "der Computer – die Computer", "emoji": "🖥️",
              "tr": ["комп’ютер", "الحاسوب (الكمبيوتر)", "کامپیوتر", "bilgisayar", "calculatorul", "kompjuteri", "компьютер", "l’ordinateur"] },
            { "de": "der Laptop – die Laptops", "emoji": "💻",
              "tr": ["ноутбук", "الحاسوب المحمول (اللابتوب)", "لپ‌تاپ", "dizüstü bilgisayar", "laptopul", "laptopi", "зөөврийн компьютер", "l’ordinateur portable"] },
            { "de": "der Bildschirm – die Bildschirme", "emoji": "📺",
              "tr": ["екран", "الشاشة", "صفحه‌نمایش", "ekran", "ecranul", "ekrani", "дэлгэц", "l’écran"] }
          ]
        },
        {
          "type": "words",
          "title": "das-Wörter",
          "items": [
            { "de": "das Heft – die Hefte", "emoji": "📓",
              "tr": ["зошит", "الدفتر", "دفتر", "defter", "caietul", "fletorja", "дэвтэр", "le cahier"] },
            { "de": "das Buch – die Bücher", "emoji": "📕",
              "tr": ["книга", "الكتاب", "کتاب", "kitap", "cartea", "libri", "ном", "le livre"] },
            { "de": "das Tablet – die Tablets", "emoji": "📱",
              "tr": ["планшет", "الجهاز اللوحي (التابلت)", "تبلت", "tablet", "tableta", "tableti", "таблет", "la tablette"] },
            { "de": "das Fenster – die Fenster", "emoji": "🪟",
              "tr": ["вікно", "النافذة", "پنجره", "pencere", "fereastra", "dritarja", "цонх", "la fenêtre"] },
            { "de": "das Licht – die Lichter", "emoji": "🔆",
              "tr": ["світло", "الضوء", "نور", "ışık", "lumina", "drita", "гэрэл", "la lumière"] }
          ]
        },
        {
          "type": "words",
          "title": "die-Wörter",
          "items": [
            { "de": "die Tasche – die Taschen", "emoji": "👜",
              "tr": ["сумка", "الحقيبة", "کیف", "çanta", "geanta", "çanta", "цүнх", "le sac"] },
            { "de": "die Brille – die Brillen", "emoji": "👓",
              "tr": ["окуляри", "النظارة", "عینک", "gözlük", "ochelarii", "syzet", "нүдний шил", "les lunettes"] },
            { "de": "die Flasche – die Flaschen", "emoji": "🍾",
              "tr": ["пляшка", "الزجاجة", "بطری", "şişe", "sticla", "shishja", "лонх", "la bouteille"] },
            { "de": "die Lampe – die Lampen", "emoji": "💡",
              "tr": ["лампа", "المصباح", "چراغ", "lamba", "lampa", "llamba", "чийдэн", "la lampe"] },
            { "de": "die Tür – die Türen", "emoji": "🚪",
              "tr": ["двері", "الباب", "در", "kapı", "ușa", "dera", "хаалга", "la porte"] },
            { "de": "die Tafel – die Tafeln", "emoji": "🟩",
              "tr": ["дошка", "السبورة", "تختهٔ کلاس", "yazı tahtası", "tabla", "tabela", "самбар", "le tableau"] },
            { "de": "die Maus – die Mäuse (am Computer)", "emoji": "🖱️",
              "tr": ["мишка (комп’ютерна)", "الفأرة (للحاسوب)", "ماوس", "fare (bilgisayar)", "mouse-ul", "mausi", "хулгана (компьютерийн)", "la souris"] }
          ]
        }
      ]
    },
    {
      "id": "ein-kein-mein",
      "icon": "❓",
      "title": "Was ist das? Wem gehört das? – ein, kein, mein",
      "blocks": [
        {
          "type": "phrases",
          "items": [
            { "de": "Was ist das?",
              "tr": ["Що це?", "ما هذا؟", "این چیست؟", "Bu ne?", "Ce este asta?", "Çfarë është kjo?", "Энэ юу вэ?", "Qu’est-ce que c’est ?"] },
            { "de": "Wem gehört das?",
              "tr": ["Чиє це?", "لمن هذا؟", "این مال کیست؟", "Bu kimin?", "Al cui este?", "E kujt është kjo?", "Энэ хэнийх вэ?", "C’est à qui ?"] },
            { "de": "Das ist die Tasche von Timo.",
              "tr": ["Це сумка Тімо.", "هذه حقيبة تيمو.", "این کیفِ تیمو است.", "Bu Timo’nun çantası.", "Aceasta este geanta lui Timo.", "Kjo është çanta e Timos.", "Энэ Тимогийн цүнх.", "C’est le sac de Timo."] }
          ]
        },
        {
          "type": "text",
          "text": "Wiederholung von <a href=\"/kurstagebuch/2026-11-20/\">Tag 2</a>: mein / meine, dein / deine. Neu: Die gleiche Regel gilt auch für ein und kein."
        },
        {
          "type": "rule",
          "title": "Die -e-Regel: ein, kein, mein, dein",
          "text": "Bei <b>der</b> und <b>das</b> sind die Wörter kurz (ohne -e).<br>Bei <b>die</b> bekommen alle Wörter ein <b>-e</b>: ein<b>e</b>, kein<b>e</b>, mein<b>e</b>, dein<b>e</b>.",
          "tr": [
            "Правило з -e: при der і das – ein, kein, mein, dein (без -e). При die – eine, keine, meine, deine (з -e).",
            "قاعدة -e: مع der و das نقول ein و kein و mein و dein (بدون -e). ومع die نقول eine و keine و meine و deine (مع -e).",
            "قاعدهٔ -e: با der و das می‌گوییم ein، kein، mein، dein (بدون -e). با die می‌گوییم eine، keine، meine، deine (با -e).",
            "-e kuralı: der ve das ile ein, kein, mein, dein (-e yok). die ile eine, keine, meine, deine (-e var).",
            "Regula cu -e: la der și das – ein, kein, mein, dein (fără -e). La die – eine, keine, meine, deine (cu -e).",
            "Rregulli me -e: te der dhe das – ein, kein, mein, dein (pa -e). Te die – eine, keine, meine, deine (me -e).",
            "-e дүрэм: der болон das-тай бол ein, kein, mein, dein (-e байхгүй). die-тай бол eine, keine, meine, deine (-e нэмэгдэнэ).",
            "La règle du -e : avec der et das – ein, kein, mein, dein (sans -e). Avec die – eine, keine, meine, deine (avec -e)."
          ],
          "table": {
            "head": ["Artikel", "ein", "kein", "mein / dein"],
            "rows": [
              ["der Rucksack", "ein Rucksack", "kein Rucksack", "mein / dein Rucksack"],
              ["das Heft", "ein Heft", "kein Heft", "mein / dein Heft"],
              ["die Brille", "ein<b>e</b> Brille", "kein<b>e</b> Brille", "mein<b>e</b> / dein<b>e</b> Brille"]
            ]
          }
        },
        {
          "type": "rule",
          "title": "kein oder nicht?",
          "text": "<b>kein</b> = nicht + ein: Ist das ein Buch? – Nein, das ist <b>kein</b> Buch.<br>Vor mein, dein und der / das / die steht <b>nicht</b>: Das ist <b>nicht</b> mein Buch.",
          "tr": [
            "kein = nicht + ein (жодного / не). Перед mein, dein і der / das / die кажемо nicht.",
            "kein = nicht + ein (ليس / لا). قبل mein و dein و der / das / die نقول nicht.",
            "kein = nicht + ein (هیچ / نه). قبل از mein، dein و der / das / die می‌گوییم nicht.",
            "kein = nicht + ein (hiç / değil). mein, dein ve der / das / die önünde nicht kullanılır.",
            "kein = nicht + ein (niciun / nu). Înainte de mein, dein și der / das / die folosim nicht.",
            "kein = nicht + ein (asnjë / nuk). Para mein, dein dhe der / das / die përdorim nicht.",
            "kein = nicht + ein (биш / ямар ч … байхгүй). mein, dein болон der / das / die-ийн өмнө nicht хэрэглэнэ.",
            "kein = nicht + ein (pas de / pas un). Devant mein, dein et der / das / die, on dit nicht."
          ]
        },
        {
          "type": "warn",
          "items": [
            { "wrong": "Das ist kein meine Tasche.", "right": "Das ist nicht meine Tasche.", "why": "vor mein / meine → nicht" }
          ]
        },
        {
          "type": "text",
          "title": "Dialog 1: Was ist das?",
          "text": "<b>Timo:</b> Hallo Nina! Was ist das hier? Ist das ein Bleistift?<br><b>Nina:</b> Nein, das ist kein Bleistift. Das ist ein Kuli.<br><b>Timo:</b> Und was ist das auf dem Stuhl? Ist das eine Tasche?<br><b>Nina:</b> Nein, das ist keine Tasche. Das ist ein Rucksack!"
        },
        {
          "type": "text",
          "title": "Dialog 2: Wem gehört das?",
          "text": "<b>Sara:</b> Guten Morgen, Ali! Hier liegt ein Heft. Ist das dein Heft?<br><b>Ali:</b> Nein, das ist nicht mein Heft. Das ist das Heft von Olena.<br><b>Sara:</b> Aha. Und ist das deine Flasche?<br><b>Ali:</b> Ja! Das ist meine Flasche. Danke, Sara!"
        }
      ]
    },
    {
      "id": "er-es-sie",
      "icon": "👉",
      "title": "der → er, das → es, die → sie",
      "blocks": [
        {
          "type": "rule",
          "title": "Pronomen für Nomen",
          "text": "Für ein Nomen sagen wir oft ein kleines Wort (Pronomen): <b>der</b> → <b>er</b>, <b>das</b> → <b>es</b>, <b>die</b> → <b>sie</b>. Plural (<b>die</b>) → <b>sie</b>.<br>Das gilt auch für Dinge, nicht nur für Personen.",
          "tr": [
            "Замість іменника часто кажемо займенник: der → er, das → es, die → sie. Множина (die) → sie. Це правило діє і для речей, не тільки для людей.",
            "بدلًا من الاسم نستخدم غالبًا ضميرًا: der ← er، و das ← es، و die ← sie. وفي الجمع (die) ← sie. وهذا يصحّ للأشياء أيضًا، وليس للأشخاص فقط.",
            "به‌جای اسم اغلب از ضمیر استفاده می‌کنیم: der ← er، das ← es، die ← sie. در جمع (die) ← sie. این قاعده برای اشیا هم صدق می‌کند، نه فقط برای انسان‌ها.",
            "İsmin yerine çoğu zaman bir zamir kullanırız: der → er, das → es, die → sie. Çoğul (die) → sie. Bu kural sadece insanlar için değil, eşyalar için de geçerlidir.",
            "În loc de substantiv folosim des un pronume: der → er, das → es, die → sie. La plural (die) → sie. Regula este valabilă și pentru lucruri, nu doar pentru persoane.",
            "Në vend të emrit përdorim shpesh një përemër: der → er, das → es, die → sie. Shumësi (die) → sie. Kjo vlen edhe për sendet, jo vetëm për njerëzit.",
            "Нэр үгийн оронд ихэвчлэн төлөөний үг хэрэглэнэ: der → er, das → es, die → sie. Олон тоо (die) → sie. Энэ нь зөвхөн хүн биш, эд зүйлд ч хамаатай.",
            "À la place du nom, on utilise souvent un pronom : der → er, das → es, die → sie. Au pluriel (die) → sie. C’est valable aussi pour les choses, pas seulement pour les personnes."
          ],
          "table": {
            "head": ["Nomen", "Pronomen"],
            "rows": [
              ["der Bildschirm", "<b>er</b>"],
              ["das Fenster", "<b>es</b>"],
              ["die Tür", "<b>sie</b>"],
              ["die Bücher (Plural)", "<b>sie</b>"]
            ]
          }
        },
        {
          "type": "examples",
          "title": "Sätze aus dem Kurs",
          "items": [
            "Das Buch liegt auf dem Tisch. Es ist gut.",
            "Die Lampe ist schön. Sie ist weiß."
          ]
        },
        {
          "type": "text",
          "title": "Dialog 3: Was funktioniert?",
          "text": "<b>Frau Martin:</b> Guten Tag, Herr Adam! Funktioniert der Computer?<br><b>Herr Adam:</b> Nein, der Computer ist alt. Er ist kaputt.<br><b>Frau Martin:</b> Oh! Und funktioniert das Tablet?<br><b>Herr Adam:</b> Ja, das Tablet ist gut. Es ist neu.<br><b>Frau Martin:</b> Super! Aber wo ist die Brille?<br><b>Herr Adam:</b> Die Brille ist nicht hier. Sie ist zu Hause."
        }
      ]
    },
    {
      "id": "schluessel",
      "icon": "🔑",
      "title": "Wo ist mein Schlüssel? – Singular, Plural und ein oder der",
      "blocks": [
        {
          "type": "phrases",
          "items": [
            { "de": "Wo ist mein Schlüssel?",
              "tr": ["Де мій ключ?", "أين مفتاحي؟", "کلیدم کجاست؟", "Anahtarım nerede?", "Unde este cheia mea?", "Ku është çelësi im?", "Миний түлхүүр хаана байна?", "Où est ma clé ?"] },
            { "de": "Wo sind meine Schlüssel?",
              "tr": ["Де мої ключі?", "أين مفاتيحي؟", "کلیدهایم کجا هستند؟", "Anahtarlarım nerede?", "Unde sunt cheile mele?", "Ku janë çelësat e mi?", "Миний түлхүүрүүд хаана байна?", "Où sont mes clés ?"] }
          ]
        },
        {
          "type": "rule",
          "title": "ist oder sind?",
          "text": "Bei <b>Schlüssel</b> sehen Singular und Plural gleich aus. Das Verb und mein zeigen den Plural: <b>ist</b> → <b>sind</b>, mein → mein<b>e</b>.",
          "tr": [
            "У слова Schlüssel однина і множина виглядають однаково. Множину показують дієслово і mein: ist → sind, mein → meine.",
            "في كلمة Schlüssel يتشابه المفرد والجمع. الفعل و mein يدلّان على الجمع: ist ← sind، و mein ← meine.",
            "در کلمهٔ Schlüssel مفرد و جمع یک شکل دارند. فعل و mein جمع را نشان می‌دهند: ist ← sind، mein ← meine.",
            "Schlüssel kelimesinde tekil ve çoğul aynı görünür. Çoğulu fiil ve mein gösterir: ist → sind, mein → meine.",
            "La cuvântul Schlüssel singularul și pluralul arată la fel. Pluralul se vede la verb și la mein: ist → sind, mein → meine.",
            "Te fjala Schlüssel njëjësi dhe shumësi duken njësoj. Shumësin e tregojnë folja dhe mein: ist → sind, mein → meine.",
            "Schlüssel гэдэг үгэнд ганц ба олон тоо адилхан. Олон тоог үйл үг ба mein харуулна: ist → sind, mein → meine.",
            "Pour Schlüssel, le singulier et le pluriel sont identiques. Le verbe et mein montrent le pluriel : ist → sind, mein → meine."
          ]
        },
        {
          "type": "text",
          "text": "Wiederholung von <a href=\"/kurstagebuch/2026-11-19/\">Tag 1</a>: Meine Muttersprache ist … / Meine Muttersprachen sind …"
        },
        {
          "type": "rule",
          "title": "Achtung: Schlüssel oder Schüssel?",
          "text": "<b>der Schlüssel</b> 🔑 – für die Tür.<br><b>die Schüssel</b> 🥣 – für den Salat.<br>Die Wörter klingen ähnlich: Schlüssel hat ein <b>l</b>.",
          "tr": [
            "der Schlüssel – ключ (для дверей). die Schüssel – миска (для салату). Слова схожі: у Schlüssel є «l».",
            "der Schlüssel = المفتاح (للباب). die Schüssel = الوعاء (للسلطة). الكلمتان متشابهتان: في Schlüssel يوجد حرف l.",
            "der Schlüssel = کلید (برای در). die Schüssel = کاسه (برای سالاد). این دو کلمه شبیه هم هستند: در Schlüssel حرف l هست.",
            "der Schlüssel = anahtar (kapı için). die Schüssel = kase (salata için). Kelimeler birbirine benzer: Schlüssel’de bir „l“ var.",
            "der Schlüssel = cheia (pentru ușă). die Schüssel = castronul (pentru salată). Cuvintele seamănă: în Schlüssel există un „l”.",
            "der Schlüssel = çelësi (për derën). die Schüssel = tasi (për sallatën). Fjalët ngjajnë: te Schlüssel ka një „l“.",
            "der Schlüssel = түлхүүр (хаалганы). die Schüssel = аяга (салатны). Үгс төстэй: Schlüssel-д „l“ үсэг бий.",
            "der Schlüssel = la clé (pour la porte). die Schüssel = le saladier (pour la salade). Les mots se ressemblent : Schlüssel a un « l »."
          ]
        },
        {
          "type": "rule",
          "title": "ein oder der?",
          "text": "<b>ein / eine</b> = neu, irgendein Ding: Hier liegt ein Schlüssel.<br><b>der / das / die</b> = genau, bekannt: Das ist der Schlüssel von Ali.",
          "tr": [
            "ein / eine – щось нове, будь-яке. der / das / die – щось відоме, конкретне.",
            "ein / eine: شيء جديد أو غير محدد. der / das / die: شيء معروف ومحدد.",
            "ein / eine: چیزی تازه یا نامعین. der / das / die: چیزی معلوم و مشخص.",
            "ein / eine: yeni, herhangi bir şey. der / das / die: belli, bilinen bir şey.",
            "ein / eine: ceva nou, oarecare. der / das / die: ceva cunoscut, anume.",
            "ein / eine: diçka e re, çfarëdo. der / das / die: diçka e njohur, e caktuar.",
            "ein / eine: шинэ, тодорхой бус зүйл. der / das / die: мэддэг, тодорхой зүйл.",
            "ein / eine : quelque chose de nouveau, n’importe lequel. der / das / die : quelque chose de connu, précis."
          ]
        },
        {
          "type": "text",
          "title": "Dialog 4: Wo ist mein Handy?",
          "text": "<b>Olena:</b> Hallo Nina! Hier ist ein Schlüssel. Ist das dein Schlüssel?<br><b>Nina:</b> Nein, das ist nicht mein Schlüssel … Oh, ja! Das ist mein Schlüssel! Er ist neu.<br><b>Olena:</b> Und wo ist mein Handy? Es ist nicht auf dem Tisch.<br><b>Nina:</b> Auf dem Stuhl liegt ein Handy! Ist das dein Handy?<br><b>Olena:</b> Nein, das ist das Handy von Timo. Mein Handy ist in der Tasche.<br><b>Nina:</b> Deine Tasche ist hier! Sie ist unter dem Stuhl.<br><b>Olena:</b> Super! Vielen Dank!"
        }
      ]
    },
    {
      "id": "akkusativ",
      "icon": "🤲",
      "title": "Gib mir bitte einen Stift! – der Akkusativ",
      "blocks": [
        {
          "type": "text",
          "text": "Wiederholung von <a href=\"/kurstagebuch/2026-11-19/\">Tag 1</a>: haben + einen (Ich habe einen Sohn). Heute: Das gilt auch für viele andere Verben."
        },
        {
          "type": "rule",
          "title": "Akkusativ: Wen? Was?",
          "text": "Viele Verben brauchen den <b>Akkusativ</b>: geben, nehmen, kaufen, essen, sehen, lesen, trinken, schreiben, haben, wollen, möchten.<br>Nur bei <b>der</b> ändert sich etwas: der → <b>den</b>, ein → <b>einen</b>, kein → <b>keinen</b>, mein → <b>meinen</b>, dein → <b>deinen</b>.<br><b>das</b>, <b>die</b> und der Plural bleiben gleich.",
          "tr": [
            "Багато дієслів вимагають знахідного відмінка (Akkusativ): geben, nehmen, kaufen, essen, sehen, lesen, trinken, schreiben, haben, wollen, möchten. Змінюється тільки der: der → den, ein → einen, kein → keinen, mein → meinen, dein → deinen. das, die і множина не змінюються.",
            "كثير من الأفعال تحتاج حالة النصب (Akkusativ): geben, nehmen, kaufen, essen, sehen, lesen, trinken, schreiben, haben, wollen, möchten. يتغيّر فقط der: der ← den، ein ← einen، kein ← keinen، mein ← meinen، dein ← deinen. أما das و die والجمع فلا تتغيّر.",
            "بسیاری از فعل‌ها حالت مفعولی (Akkusativ) می‌خواهند: geben, nehmen, kaufen, essen, sehen, lesen, trinken, schreiben, haben, wollen, möchten. فقط der تغییر می‌کند: der ← den، ein ← einen، kein ← keinen، mein ← meinen، dein ← deinen. das، die و جمع تغییر نمی‌کنند.",
            "Birçok fiil Akkusativ (belirtme hâli) ister: geben, nehmen, kaufen, essen, sehen, lesen, trinken, schreiben, haben, wollen, möchten. Sadece der değişir: der → den, ein → einen, kein → keinen, mein → meinen, dein → deinen. das, die ve çoğul aynı kalır.",
            "Multe verbe cer acuzativul (Akkusativ): geben, nehmen, kaufen, essen, sehen, lesen, trinken, schreiben, haben, wollen, möchten. Se schimbă doar der: der → den, ein → einen, kein → keinen, mein → meinen, dein → deinen. das, die și pluralul rămân la fel.",
            "Shumë folje kërkojnë rasën kallëzore (Akkusativ): geben, nehmen, kaufen, essen, sehen, lesen, trinken, schreiben, haben, wollen, möchten. Ndryshon vetëm der: der → den, ein → einen, kein → keinen, mein → meinen, dein → deinen. das, die dhe shumësi mbeten njësoj.",
            "Олон үйл үг заахын тийн ялгал (Akkusativ) шаарддаг: geben, nehmen, kaufen, essen, sehen, lesen, trinken, schreiben, haben, wollen, möchten. Зөвхөн der өөрчлөгдөнө: der → den, ein → einen, kein → keinen, mein → meinen, dein → deinen. das, die болон олон тоо өөрчлөгдөхгүй.",
            "Beaucoup de verbes demandent l’accusatif : geben, nehmen, kaufen, essen, sehen, lesen, trinken, schreiben, haben, wollen, möchten. Seul der change : der → den, ein → einen, kein → keinen, mein → meinen, dein → deinen. das, die et le pluriel ne changent pas."
          ]
        },
        {
          "type": "phrases",
          "title": "Bitten: Gib mir bitte …",
          "items": [
            { "de": "Gib mir bitte einen Stift!",
              "tr": ["Дай мені, будь ласка, ручку!", "أعطني قلمًا من فضلك!", "لطفاً یک خودکار به من بده!", "Bana bir kalem ver, lütfen!", "Dă-mi, te rog, un pix!", "Më jep, të lutem, një stilolaps!", "Надад нэг үзэг өгөөч!", "Donne-moi un stylo, s’il te plaît !"] },
            { "de": "Gib mir bitte ein Heft!",
              "tr": ["Дай мені, будь ласка, зошит!", "أعطني دفترًا من فضلك!", "لطفاً یک دفتر به من بده!", "Bana bir defter ver, lütfen!", "Dă-mi, te rog, un caiet!", "Më jep, të lutem, një fletore!", "Надад нэг дэвтэр өгөөч!", "Donne-moi un cahier, s’il te plaît !"] },
            { "de": "Gib mir bitte eine Maus!",
              "tr": ["Дай мені, будь ласка, мишку!", "أعطني فأرة من فضلك!", "لطفاً یک ماوس به من بده!", "Bana bir fare ver, lütfen!", "Dă-mi, te rog, un mouse!", "Më jep, të lutem, një maus!", "Надад нэг хулгана өгөөч!", "Donne-moi une souris, s’il te plaît !"] },
            { "de": "Gib mir bitte drei Stifte!",
              "tr": ["Дай мені, будь ласка, три ручки!", "أعطني ثلاثة أقلام من فضلك!", "لطفاً سه تا خودکار به من بده!", "Bana üç kalem ver, lütfen!", "Dă-mi, te rog, trei pixuri!", "Më jep, të lutem, tre stilolapsa!", "Надад гурван үзэг өгөөч!", "Donne-moi trois stylos, s’il te plaît !"] }
          ]
        },
        {
          "type": "examples",
          "title": "Sätze aus dem Kurs",
          "items": [
            "Ich kaufe keinen Tisch, ich kaufe einen Stuhl.",
            "Ich möchte keinen Stift, ich möchte einen Bleistift."
          ]
        },
        {
          "type": "rule",
          "title": "sein → Nominativ",
          "text": "Nach <b>sein</b> steht immer der <b>Nominativ</b> – auch bei der-Wörtern: Das ist <b>mein</b> Computer. (nicht: meinen)",
          "tr": [
            "Після sein завжди називний відмінок (Nominativ) – також зі словами з der: mein, ein (не meinen, einen).",
            "بعد sein تأتي دائمًا حالة الرفع (Nominativ) – حتى مع كلمات der: نقول mein و ein (وليس meinen أو einen).",
            "بعد از sein همیشه حالت فاعلی (Nominativ) می‌آید – حتی با کلمه‌های der: mein و ein (نه meinen یا einen).",
            "sein fiilinden sonra her zaman Nominativ (yalın hâl) gelir – der kelimelerinde de: mein, ein (meinen, einen değil).",
            "După sein urmează mereu nominativul – și la cuvintele cu der: mein, ein (nu meinen, einen).",
            "Pas sein vjen gjithmonë rasa emërore (Nominativ) – edhe te fjalët me der: mein, ein (jo meinen, einen).",
            "sein-ий дараа үргэлж нэрлэхийн тийн ялгал (Nominativ) орно – der үгтэй ч гэсэн: mein, ein (meinen, einen биш).",
            "Après sein, on utilise toujours le nominatif – aussi avec les mots en der : mein, ein (pas meinen, einen)."
          ]
        },
        {
          "type": "warn",
          "items": [
            { "wrong": "Das ist einen Laptop.", "right": "Das ist ein Laptop.", "why": "sein → Nominativ" },
            { "wrong": "Ich sehe ein Bildschirm.", "right": "Ich sehe einen Bildschirm.", "why": "sehen → Akkusativ: der → einen" }
          ]
        }
      ]
    },
    {
      "id": "faelle",
      "icon": "📊",
      "title": "Überblick: Nominativ, Akkusativ, Dativ",
      "blocks": [
        {
          "type": "rule",
          "title": "Drei Fälle – der Dativ kommt später",
          "text": "<b>Nominativ</b> – Wer? Was? Wer oder was macht etwas?<br><b>Akkusativ</b> – Wen? Was? Was gebe, nehme, kaufe ich?<br><b>Dativ</b> – Wem? Wem gebe ich etwas? <i>Nur zum Kennenlernen – der Dativ kommt später.</i>",
          "tr": [
            "Nominativ (називний): Хто? Що? – хто або що виконує дію. Akkusativ (знахідний): Кого? Що? – на кого або на що спрямована дія. Dativ (давальний): Кому? – кому я щось даю. Dativ – тільки для знайомства, ми вивчимо його пізніше.",
            "Nominativ (حالة الرفع): مَن؟ ماذا؟ – مَن أو ما الذي يقوم بالفعل. Akkusativ (حالة النصب): مَن؟ ماذا؟ – مَن أو ما الذي يقع عليه الفعل مباشرةً. Dativ (المفعول غير المباشر): لِمَن؟ – لِمَن أعطي شيئًا. الـ Dativ للتعرّف فقط، وسندرسه لاحقًا.",
            "Nominativ (حالت فاعلی): چه کسی؟ چه چیزی؟ – چه کسی یا چه چیزی کاری را انجام می‌دهد. Akkusativ (حالت مفعولی): چه کسی را؟ چه چیزی را؟ – کار مستقیماً روی چه کسی یا چه چیزی انجام می‌شود. Dativ (مفعول غیرمستقیم): به چه کسی؟ – به چه کسی چیزی می‌دهم. Dativ فقط برای آشنایی است و بعداً آن را یاد می‌گیریم.",
            "Nominativ (yalın hâl): Kim? Ne? – işi kim veya ne yapıyor. Akkusativ (belirtme hâli): Kimi? Neyi? – eylem doğrudan kime veya neye yöneliyor. Dativ (yönelme hâli): Kime? – kime bir şey veriyorum. Dativ sadece tanışmak için, onu daha sonra öğreneceğiz.",
            "Nominativ: Cine? Ce? – cine sau ce face acțiunea. Akkusativ (acuzativ): Pe cine? Ce? – asupra cui sau a ce se îndreaptă direct acțiunea. Dativ: Cui? – cui îi dau ceva. Dativul este doar pentru cunoaștere, îl învățăm mai târziu.",
            "Nominativ (rasa emërore): Kush? Çfarë? – kush ose çfarë e kryen veprimin. Akkusativ (rasa kallëzore): Kë? Çfarë? – mbi kë ose mbi çfarë kryhet drejtpërdrejt veprimi. Dativ (rasa dhanore): Kujt? – kujt i jap diçka. Dativi është vetëm për njohje, do ta mësojmë më vonë.",
            "Nominativ (нэрлэхийн тийн ялгал): Хэн? Юу? – үйлдлийг хэн эсвэл юу хийж байна. Akkusativ (заахын тийн ялгал): Хэнийг? Юуг? – үйлдэл шууд хэнд эсвэл юунд чиглэж байна. Dativ (өгөх-оршихын тийн ялгал): Хэнд? – би хэнд юм өгч байна. Dativ-ийг зөвхөн танилцах зорилгоор үзүүлэв, дараа нь сурна.",
            "Nominativ (nominatif) : Qui ? Quoi ? – qui ou quoi fait l’action. Akkusativ (accusatif) : Qui ? Quoi ? – la personne ou la chose qui reçoit directement l’action. Dativ (datif) : À qui ? – à qui je donne quelque chose. Le datif est seulement pour découvrir, on l’apprendra plus tard."
          ],
          "table": {
            "head": ["Artikel", "Nominativ<br>Wer? Was?", "Akkusativ<br>Wen? Was?", "Dativ (später)<br>Wem?"],
            "rows": [
              ["der", "der / ein / mein / kein", "<b>den</b> / ein<b>en</b> / mein<b>en</b> / kein<b>en</b>", "dem / einem / meinem / keinem"],
              ["das", "das / ein / mein / kein", "das / ein / mein / kein", "dem / einem / meinem / keinem"],
              ["die", "die / eine / meine / keine", "die / eine / meine / keine", "der / einer / meiner / keiner"]
            ]
          }
        }
      ]
    },
    {
      "id": "bitten",
      "icon": "🙏",
      "title": "Freundliche Bitten: der Imperativ",
      "blocks": [
        {
          "type": "text",
          "text": "Wiederholung: Arbeitsanweisungen wie lesen, schreiben, buchstabieren (<a href=\"/kurstagebuch/2026-11-19/\">Tag 1</a>) und e → i / ie: du sprichst, du liest (<a href=\"/kurstagebuch/2026-11-26/\">Tag 3</a>)."
        },
        {
          "type": "rule",
          "title": "Bitte: Verb auf Position 1",
          "text": "Normalerweise steht das Verb auf Position 2. Bei einer Bitte steht das Verb auf <b>Position 1</b>.<br><b>Sie:</b> Verb (Infinitiv) + Sie.<br><b>du:</b> ohne <b>du</b> und ohne <b>-st</b>: du gibst → <b>gib</b>, du sprichst → <b>sprich</b>, du liest → <b>lies</b> (das s bleibt), du nimmst → <b>nimm</b>, du machst → <b>mach</b>.",
          "tr": [
            "Імператив (наказовий спосіб): зазвичай дієслово стоїть на 2-му місці. У проханні дієслово стоїть на 1-му місці. Sie: дієслово (інфінітив) + Sie. du: без du і без -st: du gibst → gib, du sprichst → sprich, du liest → lies (s залишається), du nimmst → nimm, du machst → mach.",
            "صيغة الأمر (Imperativ): عادةً يأتي الفعل في المكان الثاني. في الطلب يأتي الفعل في المكان الأول. مع Sie: الفعل (المصدر) + Sie. مع du: بدون du وبدون -st: du gibst ← gib، du sprichst ← sprich، du liest ← lies (يبقى حرف s)، du nimmst ← nimm، du machst ← mach.",
            "وجه امری (Imperativ): معمولاً فعل در جایگاه دوم است. در درخواست، فعل در جایگاه اول می‌آید. با Sie: فعل (مصدر) + Sie. با du: بدون du و بدون -st: du gibst ← gib، du sprichst ← sprich، du liest ← lies (حرف s می‌ماند)، du nimmst ← nimm، du machst ← mach.",
            "Emir kipi (Imperativ): Normalde fiil 2. sıradadır. Bir ricada fiil 1. sıraya gelir. Sie: fiil (mastar) + Sie. du: du ve -st olmadan: du gibst → gib, du sprichst → sprich, du liest → lies (s kalır), du nimmst → nimm, du machst → mach.",
            "Modul imperativ: de obicei verbul stă pe locul 2. La o rugăminte verbul stă pe locul 1. Sie: verbul (infinitiv) + Sie. du: fără du și fără -st: du gibst → gib, du sprichst → sprich, du liest → lies (s rămâne), du nimmst → nimm, du machst → mach.",
            "Mënyra urdhërore (Imperativ): zakonisht folja është në vendin e 2-të. Në një kërkesë folja vjen në vendin e 1-rë. Sie: folja (paskajore) + Sie. du: pa du dhe pa -st: du gibst → gib, du sprichst → sprich, du liest → lies (s mbetet), du nimmst → nimm, du machst → mach.",
            "Захирах хэлбэр (Imperativ): ихэвчлэн үйл үг 2-р байранд байдаг. Хүсэлт гаргахад үйл үг 1-р байранд орно. Sie: үйл үг (үндсэн хэлбэр) + Sie. du: du болон -st-гүй: du gibst → gib, du sprichst → sprich, du liest → lies (s үсэг хэвээр үлдэнэ), du nimmst → nimm, du machst → mach.",
            "L’impératif : d’habitude, le verbe est en 2e position. Dans une demande, le verbe est en 1re position. Sie : verbe (infinitif) + Sie. du : sans du et sans -st : du gibst → gib, du sprichst → sprich, du liest → lies (le s reste), du nimmst → nimm, du machst → mach."
          ],
          "table": {
            "head": ["du", "Sie"],
            "rows": [
              ["<b>Gib</b> mir bitte die Flasche!", "<b>Geben</b> Sie mir bitte die Flasche!"],
              ["<b>Sprich</b> bitte lauter!", "<b>Sprechen</b> Sie bitte lauter!"],
              ["<b>Lies</b> bitte den Satz laut!", "<b>Lesen</b> Sie bitte den Satz laut!"],
              ["<b>Nimm</b> bitte einen Stift!", "<b>Nehmen</b> Sie bitte einen Stift!"],
              ["<b>Mach</b> bitte das Licht aus!", "<b>Machen</b> Sie bitte das Licht aus!"],
              ["<b>Schreib</b> bitte deinen Namen!", "<b>Schreiben</b> Sie bitte Ihren Namen!"]
            ]
          }
        },
        {
          "type": "warn",
          "items": [
            { "wrong": "Gebe mir bitte das Heft!", "right": "Gib mir bitte das Heft!", "why": "geben: e → i – auch bei der Bitte mit du" },
            { "wrong": "Machst bitte die Tür zu!", "right": "Mach bitte die Tür zu!", "why": "Bitte mit du: ohne -st" }
          ]
        },
        {
          "type": "text",
          "title": "Dialog 5: Im Deutschkurs",
          "text": "<b>Frau Martin:</b> Guten Morgen, Ali! Lesen Sie bitte den Text!<br><b>Ali:</b> Entschuldigung, Frau Martin. Sprechen Sie bitte langsam!<br><b>Frau Martin:</b> Gern! Machen Sie bitte auch Notizen!<br><b>Ali:</b> Gut. Hier ist mein Heft. Wie heißt das Wort auf Deutsch?<br><b>Frau Martin:</b> Das ist die Tafel. Schreiben Sie bitte „Tafel“!<br><b>Ali:</b> Buchstabieren Sie bitte das Wort!<br><b>Frau Martin:</b> T – A – F – E – L."
        }
      ]
    },
    {
      "id": "an-aus",
      "icon": "💡",
      "title": "an / aus und auf / zu",
      "blocks": [
        {
          "type": "rule",
          "title": "Was ist an, aus, auf oder zu?",
          "text": "Licht und Elektrogeräte (das Licht, der Computer, das Handy): <b>an</b> / <b>aus</b>.<br>Fenster, Tür, Rucksack: <b>auf</b> / <b>zu</b>.<br>Bei der Bitte steht der kleine Teil (ein, aus, an, auf, zu) am Satzende.",
          "tr": [
            "Світло й електроприлади: an (увімкнено) / aus (вимкнено). Вікно, двері, рюкзак: auf (відчинено) / zu (зачинено). У проханні маленька частина (ein, aus, an, auf, zu) стоїть у кінці речення.",
            "الضوء والأجهزة الكهربائية: an (يعمل) / aus (مطفأ). النافذة والباب وحقيبة الظهر: auf (مفتوح) / zu (مغلق). في الطلب يأتي الجزء الصغير (ein, aus, an, auf, zu) في آخر الجملة.",
            "چراغ و وسایل برقی: an (روشن) / aus (خاموش). پنجره، در، کوله‌پشتی: auf (باز) / zu (بسته). در درخواست، بخش کوچک (ein, aus, an, auf, zu) در آخر جمله می‌آید.",
            "Işık ve elektrikli aletler: an (açık) / aus (kapalı). Pencere, kapı, sırt çantası: auf (açık) / zu (kapalı). Ricada küçük parça (ein, aus, an, auf, zu) cümlenin sonuna gelir.",
            "Lumina și aparatele electrice: an (pornit) / aus (oprit). Fereastra, ușa, rucsacul: auf (deschis) / zu (închis). La rugăminte, partea mică (ein, aus, an, auf, zu) stă la sfârșitul propoziției.",
            "Drita dhe pajisjet elektrike: an (e ndezur) / aus (e fikur). Dritarja, dera, çanta e shpinës: auf (e hapur) / zu (e mbyllur). Në kërkesë pjesa e vogël (ein, aus, an, auf, zu) vjen në fund të fjalisë.",
            "Гэрэл ба цахилгаан хэрэгсэл: an (асаалттай) / aus (унтраалттай). Цонх, хаалга, үүргэвч: auf (онгорхой) / zu (хаалттай). Хүсэлтэд жижиг хэсэг (ein, aus, an, auf, zu) өгүүлбэрийн төгсгөлд орно.",
            "La lumière et les appareils électriques : an (allumé) / aus (éteint). La fenêtre, la porte, le sac à dos : auf (ouvert) / zu (fermé). Dans une demande, la petite partie (ein, aus, an, auf, zu) se met à la fin de la phrase."
          ],
          "table": {
            "head": ["Verb", "Ergebnis"],
            "rows": [
              ["einschalten = anmachen", "Der Laptop ist <b>an</b>."],
              ["ausschalten = ausmachen", "Das Handy ist <b>aus</b>."],
              ["öffnen = aufmachen", "Die Tür ist <b>auf</b>."],
              ["schließen = zumachen", "Das Fenster ist <b>zu</b>."]
            ]
          }
        },
        {
          "type": "phrases",
          "items": [
            { "de": "Schalte bitte das Licht ein!",
              "tr": ["Увімкни, будь ласка, світло!", "شغّل الضوء من فضلك!", "لطفاً چراغ را روشن کن!", "Lütfen ışığı aç!", "Aprinde, te rog, lumina!", "Ndize dritën, të lutem!", "Гэрлээ асаагаач!", "Allume la lumière, s’il te plaît !"] },
            { "de": "Mach bitte das Handy aus!",
              "tr": ["Вимкни, будь ласка, телефон!", "أطفئ الهاتف من فضلك!", "لطفاً گوشی را خاموش کن!", "Lütfen telefonu kapat!", "Închide, te rog, telefonul!", "Fike celularin, të lutem!", "Утсаа унтраагаач!", "Éteins le portable, s’il te plaît !"] },
            { "de": "Mach bitte das Fenster auf!",
              "tr": ["Відчини, будь ласка, вікно!", "افتح النافذة من فضلك!", "لطفاً پنجره را باز کن!", "Lütfen pencereyi aç!", "Deschide, te rog, fereastra!", "Hape dritaren, të lutem!", "Цонхоо онгойлгоорой!", "Ouvre la fenêtre, s’il te plaît !"] }
          ]
        }
      ]
    }
  ],
  "note": "Alle Namen in den Beispielen sind erfunden."
}
