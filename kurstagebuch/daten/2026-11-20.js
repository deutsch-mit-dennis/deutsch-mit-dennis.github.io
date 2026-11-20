// Kurstagebuch – lesson 2 (protocol). Data contract: /kurstagebuch/SCHEMA.md
// Translation order (tr): uk, ar, fa, tr, ro, sq, mn, fr
// All names in examples are invented.
window.KT_DAY = {
  "date": "2026-11-20",
  "nr": 2,
  "weekday": "Freitag",
  "level": "A1",
  "title": "Zahlen, Daten und Formulare",
  "intro": "Heute ging es um Zahlen, Daten und Formulare. Wir haben Telefonnummern, große Zahlen und Jahreszahlen geübt, „am“ und „im“ gelernt und mit er und sie über andere Personen gesprochen.",
  "goals": [
    "Ich kann „Mahlzeit!“ und „Auf Wiederhören!“ richtig benutzen.",
    "Ich kann in einem Formular Anschrift, Geburtsort, Wohnort und Heimatland verstehen.",
    "Ich kann nach Adresse und Telefonnummer fragen und meine Telefonnummer sagen.",
    "Ich kann große Zahlen (auch über 1000) und Jahreszahlen sagen und schreiben.",
    "Ich kann Datum, Wochentag, Monat und Jahreszeit mit „am“ und „im“ sagen.",
    "Ich kann mit er und sie über eine andere Person sprechen."
  ],
  "sections": [
    {
      "id": "begruessung",
      "icon": "🍽️",
      "title": "Begrüßung im Alltag",
      "blocks": [
        {
          "type": "phrases",
          "title": "Mittags und am Telefon",
          "items": [
            {
              "de": "Mahlzeit!",
              "tr": [
                "Смачного! / Добрий день! (опівдні, на роботі)",
                "بالهناء! / نهارك سعيد! (عند الظهر، في العمل)",
                "نوش جان! / روز بخیر! (ظهر، سر کار)",
                "Afiyet olsun! / İyi günler! (öğlen, işte)",
                "Poftă bună! / Bună ziua! (la prânz, la muncă)",
                "Ju bëftë mirë! / Mirëdita! (në drekë, në punë)",
                "Сайхан хооллоорой! / Өдрийн мэнд! (үдээр, ажил дээр)",
                "Bon appétit ! / Bonjour ! (à midi, au travail)"
              ]
            },
            {
              "de": "Guten Appetit!",
              "tr": [
                "Смачного!",
                "بالهناء والشفاء!",
                "نوش جان!",
                "Afiyet olsun!",
                "Poftă bună!",
                "Ju bëftë mirë!",
                "Сайхан хооллоорой!",
                "Bon appétit !"
              ]
            },
            {
              "de": "Danke, dir auch! / Danke, Ihnen auch!",
              "tr": [
                "Дякую, і тобі! / Дякую, і вам!",
                "شكرًا، ولك أيضًا! / شكرًا، ولحضرتك أيضًا!",
                "ممنون، تو هم همین‌طور! / ممنون، شما هم همین‌طور!",
                "Teşekkürler, sana da! / Teşekkürler, size de!",
                "Mulțumesc, și ție! / Mulțumesc, și dumneavoastră!",
                "Faleminderit, edhe ty! / Faleminderit, edhe juve!",
                "Баярлалаа, чамд ч бас! / Баярлалаа, танд ч бас!",
                "Merci, à toi aussi ! / Merci, à vous aussi !"
              ]
            },
            {
              "de": "Auf Wiederhören! (am Telefon)",
              "tr": [
                "До побачення! (по телефону)",
                "إلى اللقاء! (على الهاتف)",
                "خداحافظ! (پشت تلفن)",
                "Hoşça kalın! (telefonda)",
                "La revedere! (la telefon)",
                "Mirupafshim! (në telefon)",
                "Баяртай! (утсаар)",
                "Au revoir ! (au téléphone)"
              ]
            }
          ]
        },
        {
          "type": "rule",
          "title": "Auf Wiedersehen oder Auf Wiederhören?",
          "text": "<b>Auf Wiedersehen!</b> – wir sehen uns: im Büro, im Kurs, im Geschäft.<br><b>Auf Wiederhören!</b> – wir hören uns: am Telefon.",
          "tr": [
            "Auf Wiedersehen! – ми бачимо одне одного: в офісі, на курсі, в магазині. Auf Wiederhören! – ми чуємо одне одного: по телефону.",
            "Auf Wiedersehen! – نرى بعضنا: في المكتب، في الدورة، في المتجر. Auf Wiederhören! – نسمع بعضنا: على الهاتف.",
            "Auf Wiedersehen! – همدیگر را می‌بینیم: در اداره، در کلاس، در مغازه. Auf Wiederhören! – صدای همدیگر را می‌شنویم: پشت تلفن.",
            "Auf Wiedersehen! – yüz yüze görüşüyoruz: ofiste, kursta, mağazada. Auf Wiederhören! – birbirimizi duyuyoruz: telefonda.",
            "Auf Wiedersehen! – ne vedem: la birou, la curs, în magazin. Auf Wiederhören! – ne auzim: la telefon.",
            "Auf Wiedersehen! – shihemi: në zyrë, në kurs, në dyqan. Auf Wiederhören! – dëgjohemi: në telefon.",
            "Auf Wiedersehen! – бие биеэ хардаг үед: оффис, курс, дэлгүүрт. Auf Wiederhören! – бие биеэ сонсдог үед: утсаар.",
            "Auf Wiedersehen! – on se voit : au bureau, au cours, au magasin. Auf Wiederhören! – on s’entend : au téléphone."
          ]
        }
      ]
    },
    {
      "id": "formular",
      "icon": "📋",
      "title": "Formular und Anschrift",
      "blocks": [
        {
          "type": "text",
          "text": "Wiederholung von <a href=\"/kurstagebuch/2026-11-19/\">Tag 1</a>: die Adresse, die Straße, die Hausnummer, die Postleitzahl (PLZ), der Ort, die Telefonnummer, der Vorname, der Nachname, der Geburtsort, der Wohnort.<br>Neu: <b>der Ort</b> = die Stadt. <b>der Geburtsort</b> = die Stadt, wo ich geboren bin. <b>der Wohnort</b> = die Stadt, wo ich wohne."
        },
        {
          "type": "words",
          "title": "Neue Wörter im Formular",
          "items": [
            {
              "de": "die Anschrift (= die Adresse)",
              "tr": [
                "адреса",
                "العنوان",
                "نشانی (آدرس)",
                "adres",
                "adresa",
                "adresa",
                "хаяг",
                "l’adresse"
              ]
            },
            {
              "de": "das Heimatland – die Heimatländer",
              "tr": [
                "батьківщина, рідна країна",
                "الوطن الأم، البلد الأصلي",
                "وطن، کشورِ اصلی",
                "anavatan, memleket",
                "țara de origine",
                "atdheu, vendi i origjinës",
                "эх орон",
                "le pays d’origine"
              ]
            },
            {
              "de": "die Vorwahl",
              "tr": [
                "телефонний код (міста або країни)",
                "رمز الاتصال (للمدينة أو الدولة)",
                "پیش‌شماره",
                "alan kodu",
                "prefixul (telefonic)",
                "prefiksi (i telefonit)",
                "утасны код (хот, улсын)",
                "l’indicatif (téléphonique)"
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "fragen",
      "icon": "❓",
      "title": "Fragen mit „Wie ist …?“",
      "blocks": [
        {
          "type": "phrases",
          "items": [
            {
              "de": "Wie ist Ihre Adresse?",
              "tag": "Sie",
              "tr": [
                "Яка ваша адреса?",
                "ما عنوان حضرتك؟",
                "آدرس شما چیست؟",
                "Adresiniz nedir?",
                "Care este adresa dumneavoastră?",
                "Cila është adresa juaj?",
                "Таны хаяг юу вэ?",
                "Quelle est votre adresse ?"
              ]
            },
            {
              "de": "Wie ist deine Telefonnummer?",
              "tag": "du",
              "tr": [
                "Який твій номер телефону?",
                "ما رقم هاتفك؟",
                "شماره تلفنت چند است؟",
                "Telefon numaran kaç?",
                "Care e numărul tău de telefon?",
                "Cili është numri yt i telefonit?",
                "Чиний утасны дугаар хэд вэ?",
                "Quel est ton numéro de téléphone ?"
              ]
            },
            {
              "de": "Wie ist Ihre PLZ?",
              "tag": "Sie",
              "tr": [
                "Який ваш поштовий індекс?",
                "ما الرمز البريدي لحضرتك؟",
                "کد پستی شما چیست؟",
                "Posta kodunuz nedir?",
                "Care este codul dumneavoastră poștal?",
                "Cili është kodi juaj postar?",
                "Таны шуудангийн код хэд вэ?",
                "Quel est votre code postal ?"
              ]
            },
            {
              "de": "Wie ist dein Vorname?",
              "tag": "du",
              "tr": [
                "Яке твоє ім’я?",
                "ما اسمك الأول؟",
                "اسم کوچکت چیست؟",
                "Adın ne?",
                "Care e prenumele tău?",
                "Si e ke emrin?",
                "Чиний нэр хэн бэ?",
                "Quel est ton prénom ?"
              ]
            },
            {
              "de": "Wie lautet Ihre Telefonnummer?",
              "tag": "Sie",
              "tr": [
                "Який ваш номер телефону? (офіційно)",
                "ما رقم هاتف حضرتك؟ (بشكل رسمي)",
                "شماره تلفن شما چیست؟ (رسمی)",
                "Telefon numaranız nedir? (resmî)",
                "Care este numărul dumneavoastră de telefon? (formal)",
                "Cili është numri juaj i telefonit? (zyrtar)",
                "Таны утасны дугаар хэд вэ? (албан ёсоор)",
                "Quel est votre numéro de téléphone ? (formel)"
              ]
            },
            {
              "de": "Meine Adresse ist Hauptstraße 5, 53111 Bonn.",
              "tr": [
                "Моя адреса: Hauptstraße 5, 53111 Bonn.",
                "عنواني: Hauptstraße 5، 53111 Bonn.",
                "آدرس من: Hauptstraße 5، 53111 Bonn.",
                "Adresim: Hauptstraße 5, 53111 Bonn.",
                "Adresa mea este Hauptstraße 5, 53111 Bonn.",
                "Adresa ime është Hauptstraße 5, 53111 Bonn.",
                "Миний хаяг: Hauptstraße 5, 53111 Bonn.",
                "Mon adresse est Hauptstraße 5, 53111 Bonn."
              ]
            }
          ]
        },
        {
          "type": "rule",
          "title": "Wie ist …? = Wie lautet …?",
          "text": "Nach Adresse, Telefonnummer, PLZ und Name fragt man mit <b>Wie ist …?</b><br><b>Wie lautet …?</b> bedeutet dasselbe – das hört man oft im Amt und am Telefon.",
          "tr": [
            "Про адресу, номер телефону, індекс та ім’я питають: Wie ist …? Wie lautet …? означає те саме – так часто кажуть в установах і по телефону.",
            "للسؤال عن العنوان ورقم الهاتف والرمز البريدي والاسم نقول: Wie ist …؟ وعبارة Wie lautet …؟ لها المعنى نفسه – نسمعها كثيرًا في الدوائر الرسمية وعلى الهاتف.",
            "برای پرسیدن آدرس، شماره تلفن، کد پستی و نام می‌گوییم: Wie ist …؟ عبارت Wie lautet …؟ همان معنی را دارد – آن را اغلب در اداره‌ها و پشت تلفن می‌شنوید.",
            "Adres, telefon numarası, posta kodu ve isim Wie ist …? ile sorulur. Wie lautet …? aynı anlama gelir – resmî dairelerde ve telefonda sık duyulur.",
            "Despre adresă, număr de telefon, cod poștal și nume se întreabă cu Wie ist …? Wie lautet …? înseamnă același lucru – se aude des la autorități și la telefon.",
            "Për adresën, numrin e telefonit, kodin postar dhe emrin pyesim me Wie ist …? Wie lautet …? do të thotë e njëjta gjë – dëgjohet shpesh në zyra dhe në telefon.",
            "Хаяг, утасны дугаар, шуудангийн код, нэрийг Wie ist …? гэж асуудаг. Wie lautet …? мөн адил утгатай – албан газар болон утсаар их сонсогддог.",
            "Pour demander l’adresse, le numéro de téléphone, le code postal et le nom, on dit Wie ist …? Wie lautet …? veut dire la même chose – on l’entend souvent dans les administrations et au téléphone."
          ]
        },
        {
          "type": "rule",
          "title": "mein, dein, Ihr, sein, ihr (Nominativ)",
          "text": "Bei <b>der</b>- und <b>das</b>-Wörtern: mein, dein, Ihr, sein, ihr.<br>Bei <b>die</b>-Wörtern und im Plural kommt <b>-e</b> dazu: mein<b>e</b>, dein<b>e</b>, Ihr<b>e</b>, sein<b>e</b>, ihr<b>e</b>.",
          "tr": [
            "Для слів з der і das: mein (мій), dein (твій), Ihr (ваш), sein (його), ihr (її). Для слів з die і в множині додаємо -e: meine, deine, Ihre, seine, ihre.",
            "مع كلمات der وdas: mein (ـي)، dein (ـكَ)، Ihr (ـكم، للاحترام)، sein (ـه)، ihr (ـها). مع كلمات die وفي الجمع نضيف ‎-e: meine، deine، Ihre، seine، ihre.",
            "با کلمه‌های der و das: mein (ـم)، dein (ـت)، Ihr (ـتان، مؤدبانه)، sein (ـش، برای مرد)، ihr (ـش، برای زن). با کلمه‌های die و در جمع ‎-e اضافه می‌شود: meine، deine، Ihre، seine، ihre.",
            "der ve das kelimelerinde: mein (benim), dein (senin), Ihr (sizin, kibar), sein (onun – erkek), ihr (onun – kadın). die kelimelerinde ve çoğulda -e eklenir: meine, deine, Ihre, seine, ihre.",
            "La cuvintele cu der și das: mein (meu), dein (tău), Ihr (dumneavoastră), sein (lui), ihr (ei). La cuvintele cu die și la plural se adaugă -e: meine, deine, Ihre, seine, ihre.",
            "Te fjalët me der dhe das: mein (im), dein (yt), Ihr (juaj, me respekt), sein (i tij), ihr (i saj). Te fjalët me die dhe në shumës shtohet -e: meine, deine, Ihre, seine, ihre.",
            "der, das үгтэй: mein (миний), dein (чиний), Ihr (таны), sein (түүний – эрэгтэй), ihr (түүний – эмэгтэй). die үгтэй болон олон тоонд -e нэмнэ: meine, deine, Ihre, seine, ihre.",
            "Avec les mots en der et das : mein (mon), dein (ton), Ihr (votre), sein (son – à lui), ihr (son – à elle). Avec les mots en die et au pluriel, on ajoute -e : meine, deine, Ihre, seine, ihre."
          ],
          "table": {
            "head": [
              "",
              "der / das (der Vorname, das Hobby)",
              "die / Plural (die Adresse, die Kinder)"
            ],
            "rows": [
              [
                "ich",
                "mein",
                "mein<b>e</b>"
              ],
              [
                "du",
                "dein",
                "dein<b>e</b>"
              ],
              [
                "Sie (höflich)",
                "Ihr",
                "Ihr<b>e</b>"
              ],
              [
                "er",
                "sein",
                "sein<b>e</b>"
              ],
              [
                "sie (eine Frau)",
                "ihr",
                "ihr<b>e</b>"
              ]
            ]
          }
        },
        {
          "type": "rule",
          "title": "Ihre oder ihre?",
          "text": "<b>Ihre</b> mit großem I = höflich, von <b>Sie</b>: Frau Otto, wie ist <b>Ihre</b> Adresse?<br><b>ihre</b> = von <b>ihr</b>, von einer Frau: Das ist Nina. Wie ist <b>ihre</b> Adresse?<br>Am Satzanfang schreibt man immer groß – dann zeigt der Kontext, wer gemeint ist.",
          "tr": [
            "Ihre з великої I = ввічливо, від Sie («ваша»): Frau Otto, wie ist Ihre Adresse? ihre = «її» – належить жінці (sie, «вона»): Das ist Nina. Wie ist ihre Adresse? На початку речення завжди пишемо з великої літери – тоді контекст показує, про кого мова.",
            "Ihre بحرف I كبير = للاحترام، من Sie (ـكم): Frau Otto, wie ist Ihre Adresse? أما ihre = ـها – يخصّ امرأة (sie = هي): Das ist Nina. Wie ist ihre Adresse? في بداية الجملة نكتب دائمًا بحرف كبير – وعندها يوضّح السياق المقصود.",
            "Ihre با I بزرگ = مؤدبانه، از Sie (ـتان): Frau Otto, wie ist Ihre Adresse? و ihre = ـش – مالِ یک زن (sie = او، زن): Das ist Nina. Wie ist ihre Adresse? در آغاز جمله همیشه با حرف بزرگ نوشته می‌شود – آن وقت از متن معلوم می‌شود منظور کیست.",
            "Büyük I ile Ihre = kibar, Sie’den (sizin): Frau Otto, wie ist Ihre Adresse? ihre = onun – bir kadının (sie = o, kadın): Das ist Nina. Wie ist ihre Adresse? Cümle başında her zaman büyük harf yazılır – o zaman kimin kastedildiği bağlamdan anlaşılır.",
            "Ihre cu I mare = politicos, de la Sie (dumneavoastră): Frau Otto, wie ist Ihre Adresse? ihre = ei – al unei femei (sie = ea): Das ist Nina. Wie ist ihre Adresse? La început de propoziție se scrie mereu cu majusculă – atunci contextul arată despre cine e vorba.",
            "Ihre me I të madhe = me respekt, nga Sie (juaj): Frau Otto, wie ist Ihre Adresse? ihre = e saj – e një gruaje (sie = ajo): Das ist Nina. Wie ist ihre Adresse? Në fillim të fjalisë shkruhet gjithmonë me shkronjë të madhe – atëherë konteksti tregon për kë bëhet fjalë.",
            "Том I-тэй Ihre = эелдэг, Sie-ээс (таны): Frau Otto, wie ist Ihre Adresse? ihre = түүний – эмэгтэй хүний (sie = тэр эмэгтэй): Das ist Nina. Wie ist ihre Adresse? Өгүүлбэрийн эхэнд үргэлж том үсгээр бичнэ – тэгэхэд хэнийг хэлж байгааг агуулгаас ойлгоно.",
            "Ihre avec un I majuscule = poli, de Sie (votre) : Frau Otto, wie ist Ihre Adresse? ihre = son/sa – à elle, d’une femme (sie = elle) : Das ist Nina. Wie ist ihre Adresse? En début de phrase, on met toujours une majuscule – c’est alors le contexte qui montre de qui on parle."
          ]
        },
        {
          "type": "warn",
          "items": [
            {
              "wrong": "Was ist Ihre Telefonnummer?",
              "right": "Wie ist Ihre Telefonnummer?",
              "why": "Nach Nummer, Adresse und Name fragt man auf Deutsch mit <b>Wie</b>."
            }
          ]
        }
      ]
    },
    {
      "id": "telefon",
      "icon": "📞",
      "title": "Telefonnummern sprechen",
      "blocks": [
        {
          "type": "rule",
          "title": "Ziffer für Ziffer",
          "text": "Telefonnummern spricht man <b>Ziffer für Ziffer</b>. Gleiche Ziffern hintereinander: <b>zweimal die Acht</b>, <b>dreimal die Eins</b>.<br>Am Anfang steht oft die <b>Vorwahl</b>, z. B. (0228). <b>+49</b> oder <b>0049</b> = Deutschland.",
          "tr": [
            "Номери телефону називають цифра за цифрою. Однакові цифри підряд: zweimal die Acht (двічі вісімка = 88), dreimal die Eins (тричі одиниця = 111). На початку часто стоїть код (Vorwahl), напр. (0228). +49 або 0049 = Німеччина.",
            "نقرأ أرقام الهاتف رقمًا رقمًا. الأرقام المتكررة: zweimal die Acht (ثمانية مرتين = 88)، dreimal die Eins (واحد ثلاث مرات = 111). في البداية يأتي غالبًا رمز الاتصال (Vorwahl)، مثل (0228). ‎+49 أو 0049 = ألمانيا.",
            "شماره تلفن را رقم به رقم می‌خوانیم. رقم‌های تکراری پشت سر هم: zweimal die Acht (دو بار هشت = 88)، dreimal die Eins (سه بار یک = 111). در ابتدا اغلب پیش‌شماره (Vorwahl) می‌آید، مثلاً (0228). ‎+49 یا 0049 = آلمان.",
            "Telefon numaraları rakam rakam söylenir. Art arda aynı rakamlar: zweimal die Acht (iki kere sekiz = 88), dreimal die Eins (üç kere bir = 111). Başta çoğu zaman alan kodu (Vorwahl) olur, örn. (0228). +49 veya 0049 = Almanya.",
            "Numerele de telefon se spun cifră cu cifră. Cifre identice la rând: zweimal die Acht (de două ori opt = 88), dreimal die Eins (de trei ori unu = 111). La început este adesea prefixul (Vorwahl), de ex. (0228). +49 sau 0049 = Germania.",
            "Numrat e telefonit thuhen shifër pas shifre. Shifra të njëjta njëra pas tjetrës: zweimal die Acht (dy herë tetë = 88), dreimal die Eins (tri herë një = 111). Në fillim shpesh është prefiksi (Vorwahl), p.sh. (0228). +49 ose 0049 = Gjermania.",
            "Утасны дугаарыг цифр цифрээр нь хэлдэг. Дараалсан ижил цифр: zweimal die Acht (хоёр удаа найм = 88), dreimal die Eins (гурван удаа нэг = 111). Эхэнд нь ихэвчлэн код (Vorwahl) байдаг, ж.нь (0228). +49 эсвэл 0049 = Герман.",
            "On dit les numéros de téléphone chiffre par chiffre. Chiffres identiques à la suite : zweimal die Acht (deux fois huit = 88), dreimal die Eins (trois fois un = 111). Au début, il y a souvent l’indicatif (Vorwahl), p. ex. (0228). +49 ou 0049 = Allemagne."
          ]
        },
        {
          "type": "table",
          "title": "So spricht man die Nummern (Beispiele erfunden)",
          "head": [
            "So schreibt man",
            "So sagt man"
          ],
          "rows": [
            [
              "0173 88 4444",
              "null – eins – sieben – drei – <b>zweimal die Acht</b> – <b>viermal die Vier</b>"
            ],
            [
              "(0228)",
              "Vorwahl: null – <b>zweimal die Zwei</b> – acht"
            ],
            [
              "+49 / 0049",
              "plus vier – neun / <b>zweimal die Null</b> – vier – neun"
            ]
          ]
        },
        {
          "type": "words",
          "items": [
            {
              "de": "die Ziffer – die Ziffern",
              "tr": [
                "цифра – цифри",
                "الرقم – الأرقام (خانة العدد)",
                "رقم – رقم‌ها",
                "rakam – rakamlar",
                "cifra – cifrele",
                "shifra – shifrat",
                "цифр – цифрүүд",
                "le chiffre – les chiffres"
              ]
            },
            {
              "de": "zweimal – dreimal – viermal",
              "tr": [
                "двічі – тричі – чотири рази",
                "مرتين – ثلاث مرات – أربع مرات",
                "دو بار – سه بار – چهار بار",
                "iki kez – üç kez – dört kez",
                "de două ori – de trei ori – de patru ori",
                "dy herë – tri herë – katër herë",
                "хоёр удаа – гурван удаа – дөрвөн удаа",
                "deux fois – trois fois – quatre fois"
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "zahlen",
      "icon": "🔢",
      "title": "Zahlen ab 11",
      "blocks": [
        {
          "type": "text",
          "text": "Wiederholung von <a href=\"/kurstagebuch/2026-11-19/\">Tag 1</a>: die Zahlen 0 bis 10."
        },
        {
          "type": "rule",
          "title": "Große Zahlen: ein Wort, zuerst die Einer",
          "text": "Ab 21: zuerst die <b>Einer</b>, dann <b>und</b>, dann die <b>Zehner</b>. Man schreibt alles <b>klein und in einem Wort</b> – auch mit hundert und tausend.<br>Achtung: 16 und 60 ohne <b>s</b>, 17 und 70 ohne <b>en</b>, 30 mit <b>ß</b>.",
          "tr": [
            "Від 21: спочатку одиниці, потім und («і»), потім десятки (21 = «один-і-двадцять»). Усе пишемо з малої літери й одним словом – також із hundert і tausend. Увага: 16 і 60 без s, 17 і 70 без en, 30 з ß.",
            "ابتداءً من 21: أولًا الآحاد، ثم und (و)، ثم العشرات – مثل العربية: واحد وعشرون. نكتب العدد كله بحروف صغيرة وفي كلمة واحدة – حتى مع hundert وtausend. انتبه: 16 و60 بدون s، و17 و70 بدون en، و30 مع ß.",
            "از 21 به بعد: اول یکان، بعد und (و)، بعد دهگان – یعنی «یک و بیست». همه را با حرف کوچک و سرهم در یک کلمه می‌نویسیم – حتی با hundert و tausend. دقت کنید: 16 و 60 بدون s، 17 و 70 بدون en، 30 با ß.",
            "21’den itibaren: önce birler, sonra und (ve), sonra onlar (21 = «bir ve yirmi»). Hepsi küçük harfle ve tek kelime olarak yazılır – hundert ve tausend ile de. Dikkat: 16 ve 60 s olmadan, 17 ve 70 en olmadan, 30 ß ile.",
            "De la 21: întâi unitățile, apoi und (și), apoi zecile (21 = „unu-și-douăzeci”). Totul se scrie cu literă mică și într-un singur cuvânt – și cu hundert și tausend. Atenție: 16 și 60 fără s, 17 și 70 fără en, 30 cu ß.",
            "Nga 21: së pari njëshet, pastaj und (e), pastaj dhjetëshet (21 = „një e njëzet”). Gjithçka shkruhet me shkronjë të vogël dhe në një fjalë – edhe me hundert dhe tausend. Kujdes: 16 dhe 60 pa s, 17 dhe 70 pa en, 30 me ß.",
            "21-ээс эхлэн: эхлээд нэгж, дараа нь und (ба), дараа нь аравт (21 = «нэг ба хорь»). Бүгдийг жижиг үсгээр, нэг үг болгож бичнэ – hundert, tausend-тэй ч мөн адил. Анхаар: 16, 60 нь s-гүй, 17, 70 нь en-гүй, 30 нь ß-тэй.",
            "À partir de 21 : d’abord les unités, puis und (et), puis les dizaines (21 = « un-et-vingt »). On écrit tout en minuscules et en un seul mot – aussi avec hundert et tausend. Attention : 16 et 60 sans s, 17 et 70 sans en, 30 avec ß."
          ],
          "table": {
            "head": [
              "Zahl",
              "So schreibt man",
              "Zahl",
              "So schreibt man"
            ],
            "rows": [
              [
                "11",
                "elf",
                "40",
                "vierzig"
              ],
              [
                "12",
                "zwölf",
                "47",
                "siebenundvierzig"
              ],
              [
                "13",
                "dreizehn",
                "50",
                "fünfzig"
              ],
              [
                "14",
                "vierzehn",
                "60",
                "sech<b>z</b>ig"
              ],
              [
                "15",
                "fünfzehn",
                "70",
                "sieb<b>z</b>ig"
              ],
              [
                "16",
                "sech<b>z</b>ehn",
                "80",
                "achtzig"
              ],
              [
                "17",
                "sieb<b>z</b>ehn",
                "90",
                "neunzig"
              ],
              [
                "18",
                "achtzehn",
                "100",
                "(ein)hundert"
              ],
              [
                "19",
                "neunzehn",
                "122",
                "hundertzweiundzwanzig"
              ],
              [
                "20",
                "zwanzig",
                "243",
                "zweihundertdreiundvierzig"
              ],
              [
                "21",
                "einundzwanzig",
                "1000",
                "(ein)tausend"
              ],
              [
                "22",
                "zweiundzwanzig",
                "1256",
                "tausendzweihundertsechsundfünfzig"
              ],
              [
                "30",
                "drei<b>ß</b>ig",
                "2363",
                "zweitausenddreihundertdreiundsechzig"
              ]
            ]
          }
        },
        {
          "type": "warn",
          "items": [
            {
              "wrong": "ein und zwanzig, (ein)tausend zweihundert sechs und fünfzig",
              "right": "einundzwanzig, tausendzweihundertsechsundfünfzig",
              "why": "Zahlen schreibt man klein und in einem Wort – auch große Zahlen."
            }
          ]
        }
      ]
    },
    {
      "id": "jahre",
      "icon": "📅",
      "title": "Jahreszahlen",
      "blocks": [
        {
          "type": "rule",
          "title": "So spricht man Jahreszahlen",
          "text": "Von 1900 bis 1999 sagt man <b>neunzehnhundert</b> + Rest. Ab 2000 sagt man <b>zweitausend</b> + Rest. Man schreibt das Jahr in einem Wort.",
          "tr": [
            "Від 1900 до 1999 року кажуть neunzehnhundert («дев’ятнадцять сотень») + решта. Від 2000 кажуть zweitausend («дві тисячі») + решта. Рік пишемо одним словом.",
            "من 1900 حتى 1999 نقول neunzehnhundert (تسعة عشر مئة) + الباقي. ومن 2000 نقول zweitausend (ألفان) + الباقي. نكتب السنة في كلمة واحدة.",
            "از 1900 تا 1999 می‌گوییم neunzehnhundert (نوزده صد) + بقیه. از 2000 به بعد می‌گوییم zweitausend (دو هزار) + بقیه. سال را سرهم در یک کلمه می‌نویسیم.",
            "1900’den 1999’a kadar neunzehnhundert (on dokuz yüz) + kalanı söylenir. 2000’den itibaren zweitausend (iki bin) + kalanı. Yıl tek kelime olarak yazılır.",
            "De la 1900 până la 1999 se spune neunzehnhundert („nouăsprezece sute”) + restul. De la 2000 se spune zweitausend (două mii) + restul. Anul se scrie într-un singur cuvânt.",
            "Nga 1900 deri në 1999 thuhet neunzehnhundert („nëntëmbëdhjetë qind”) + pjesa tjetër. Nga 2000 thuhet zweitausend (dy mijë) + pjesa tjetër. Viti shkruhet në një fjalë.",
            "1900-аас 1999 он хүртэл neunzehnhundert («арван есөн зуу») + үлдсэн хэсэг гэж хэлнэ. 2000 оноос zweitausend (хоёр мянга) + үлдсэн хэсэг. Оныг нэг үг болгож бичнэ.",
            "De 1900 à 1999, on dit neunzehnhundert (« dix-neuf cents ») + le reste. À partir de 2000, on dit zweitausend (deux mille) + le reste. On écrit l’année en un seul mot."
          ],
          "table": {
            "head": [
              "Jahr",
              "So sagt man"
            ],
            "rows": [
              [
                "1965",
                "<b>neunzehnhundert</b>fünfundsechzig"
              ],
              [
                "1987",
                "<b>neunzehnhundert</b>siebenundachtzig"
              ],
              [
                "1999",
                "<b>neunzehnhundert</b>neunundneunzig"
              ],
              [
                "2001",
                "<b>zweitausend</b>eins"
              ],
              [
                "2016",
                "<b>zweitausend</b>sechzehn"
              ],
              [
                "2026",
                "<b>zweitausend</b>sechsundzwanzig"
              ]
            ]
          }
        },
        {
          "type": "phrases",
          "items": [
            {
              "de": "Wann sind Sie geboren?",
              "tag": "Sie",
              "tr": [
                "Коли ви народилися?",
                "متى وُلدت حضرتك؟",
                "شما کی به دنیا آمده‌اید؟",
                "Ne zaman doğdunuz?",
                "Când v-ați născut?",
                "Kur keni lindur?",
                "Та хэзээ төрсөн бэ?",
                "Quand êtes-vous né(e) ?"
              ]
            },
            {
              "de": "Ich bin am 1. Januar 1987 geboren.",
              "tr": [
                "Я народився / народилася 1 січня 1987 року.",
                "وُلدت في 1 يناير (كانون الثاني) 1987.",
                "من در 1 ژانویه 1987 به دنیا آمده‌ام.",
                "1 Ocak 1987’de doğdum.",
                "M-am născut pe 1 ianuarie 1987.",
                "Kam lindur më 1 janar 1987.",
                "Би 1987 оны нэгдүгээр сарын 1-нд төрсөн.",
                "Je suis né(e) le 1er janvier 1987."
              ]
            }
          ]
        },
        {
          "type": "warn",
          "items": [
            {
              "wrong": "Neunzehn Sieben und Achtzig",
              "right": "neunzehnhundertsiebenundachtzig",
              "why": "Von 1900 bis 1999 sagt man <b>neunzehnhundert</b> … Ohne „hundert“ hört man es manchmal im Alltag – richtig ist immer mit „hundert“."
            },
            {
              "wrong": "Zwanzig und Eins",
              "right": "zweitausendeins",
              "why": "Ab 2000 sagt man <b>zweitausend</b> …"
            },
            {
              "wrong": "zwanzig sechzehn",
              "right": "zweitausendsechzehn",
              "why": "„zwanzig-sechzehn“ hört man manchmal (wie im Englischen). Richtig ist <b>zweitausend</b> …"
            },
            {
              "wrong": "Ich bin am 1987 geboren.",
              "right": "Ich bin 1987 geboren.",
              "why": "Nur das Jahr: <b>ohne am</b>. „am“ nur mit Datum."
            }
          ]
        }
      ]
    },
    {
      "id": "datum",
      "icon": "🗓️",
      "title": "am oder im? Datum, Monate, Wochentage",
      "blocks": [
        {
          "type": "rule",
          "title": "am oder im?",
          "text": "<b>am</b> + Datum oder Wochentag: am 20. November, am Montag, am 1. Januar.<br><b>im</b> + Monat oder Jahreszeit: im Dezember, im Winter.<br>Ich bin <b>am</b> 3. Mai geboren (Datum). Ich bin <b>in</b> Bonn geboren (Ort).",
          "tr": [
            "am + дата або день тижня: am 20. November, am Montag, am 1. Januar. im + місяць або пора року: im Dezember, im Winter. Ich bin am 3. Mai geboren (дата). Ich bin in Bonn geboren (місце).",
            "am + تاريخ أو يوم من الأسبوع: am 20. November، am Montag، am 1. Januar. و im + شهر أو فصل: im Dezember، im Winter. Ich bin am 3. Mai geboren (تاريخ). Ich bin in Bonn geboren (مكان).",
            "am + تاریخ یا روز هفته: am 20. November، am Montag، am 1. Januar. im + ماه یا فصل: im Dezember، im Winter. Ich bin am 3. Mai geboren (تاریخ). Ich bin in Bonn geboren (مکان).",
            "am + tarih veya haftanın günü: am 20. November, am Montag, am 1. Januar. im + ay veya mevsim: im Dezember, im Winter. Ich bin am 3. Mai geboren (tarih). Ich bin in Bonn geboren (yer).",
            "am + dată sau zi a săptămânii: am 20. November, am Montag, am 1. Januar. im + lună sau anotimp: im Dezember, im Winter. Ich bin am 3. Mai geboren (dată). Ich bin in Bonn geboren (loc).",
            "am + datë ose ditë e javës: am 20. November, am Montag, am 1. Januar. im + muaj ose stinë: im Dezember, im Winter. Ich bin am 3. Mai geboren (datë). Ich bin in Bonn geboren (vend).",
            "am + огноо эсвэл гараг: am 20. November, am Montag, am 1. Januar. im + сар эсвэл улирал: im Dezember, im Winter. Ich bin am 3. Mai geboren (огноо). Ich bin in Bonn geboren (газар).",
            "am + date ou jour de la semaine : am 20. November, am Montag, am 1. Januar. im + mois ou saison : im Dezember, im Winter. Ich bin am 3. Mai geboren (date). Ich bin in Bonn geboren (lieu)."
          ]
        },
        {
          "type": "examples",
          "title": "Sätze aus dem Kurs",
          "items": [
            "Ich habe am Montag eine Prüfung.",
            "Ich fahre im Sommer in den Urlaub."
          ]
        },
        {
          "type": "phrases",
          "items": [
            {
              "de": "Welcher Tag ist heute?",
              "tr": [
                "Який сьогодні день?",
                "أيّ يوم هو اليوم؟",
                "امروز چه روزی است؟",
                "Bugün günlerden ne?",
                "Ce zi este azi?",
                "Çfarë dite është sot?",
                "Өнөөдөр ямар гараг вэ?",
                "Quel jour sommes-nous ?"
              ]
            },
            {
              "de": "Heute ist Freitag, der 20. November.",
              "tr": [
                "Сьогодні п’ятниця, 20 листопада.",
                "اليوم الجمعة، 20 نوفمبر (تشرين الثاني).",
                "امروز جمعه، 20 نوامبر است.",
                "Bugün cuma, 20 Kasım.",
                "Azi este vineri, 20 noiembrie.",
                "Sot është e premte, 20 nëntor.",
                "Өнөөдөр баасан гараг, арван нэгдүгээр сарын 20.",
                "Aujourd’hui, c’est vendredi 20 novembre."
              ]
            }
          ]
        },
        {
          "type": "words",
          "title": "Die Jahreszeiten",
          "items": [
            {
              "de": "der Frühling",
              "emoji": "🌸",
              "tr": [
                "весна",
                "الربيع",
                "بهار",
                "ilkbahar",
                "primăvara",
                "pranvera",
                "хавар",
                "le printemps"
              ]
            },
            {
              "de": "der Sommer",
              "emoji": "☀️",
              "tr": [
                "літо",
                "الصيف",
                "تابستان",
                "yaz",
                "vara",
                "vera",
                "зун",
                "l’été"
              ]
            },
            {
              "de": "der Herbst",
              "emoji": "🍂",
              "tr": [
                "осінь",
                "الخريف",
                "پاییز",
                "sonbahar",
                "toamna",
                "vjeshta",
                "намар",
                "l’automne"
              ]
            },
            {
              "de": "der Winter",
              "emoji": "❄️",
              "tr": [
                "зима",
                "الشتاء",
                "زمستان",
                "kış",
                "iarna",
                "dimri",
                "өвөл",
                "l’hiver"
              ]
            },
            {
              "de": "die Jahreszeit – die Jahreszeiten",
              "emoji": "🗓️",
              "tr": [
                "пора року – пори року",
                "الفصل – الفصول",
                "فصل – فصل‌ها",
                "mevsim – mevsimler",
                "anotimpul – anotimpurile",
                "stina – stinët",
                "улирал – улирлууд",
                "la saison – les saisons"
              ]
            }
          ]
        },
        {
          "type": "words",
          "title": "Die Monate",
          "items": [
            {
              "de": "der Januar",
              "tr": [
                "січень",
                "يناير (كانون الثاني)",
                "ژانویه",
                "Ocak",
                "ianuarie",
                "janar",
                "нэгдүгээр сар",
                "janvier"
              ]
            },
            {
              "de": "der Februar",
              "tr": [
                "лютий",
                "فبراير (شباط)",
                "فوریه",
                "Şubat",
                "februarie",
                "shkurt",
                "хоёрдугаар сар",
                "février"
              ]
            },
            {
              "de": "der März",
              "tr": [
                "березень",
                "مارس (آذار)",
                "مارس",
                "Mart",
                "martie",
                "mars",
                "гуравдугаар сар",
                "mars"
              ]
            },
            {
              "de": "der April",
              "tr": [
                "квітень",
                "أبريل (نيسان)",
                "آوریل",
                "Nisan",
                "aprilie",
                "prill",
                "дөрөвдүгээр сар",
                "avril"
              ]
            },
            {
              "de": "der Mai",
              "tr": [
                "травень",
                "مايو (أيار)",
                "مه",
                "Mayıs",
                "mai",
                "maj",
                "тавдугаар сар",
                "mai"
              ]
            },
            {
              "de": "der Juni",
              "tr": [
                "червень",
                "يونيو (حزيران)",
                "ژوئن",
                "Haziran",
                "iunie",
                "qershor",
                "зургадугаар сар",
                "juin"
              ]
            },
            {
              "de": "der Juli",
              "tr": [
                "липень",
                "يوليو (تموز)",
                "ژوئیه",
                "Temmuz",
                "iulie",
                "korrik",
                "долдугаар сар",
                "juillet"
              ]
            },
            {
              "de": "der August",
              "tr": [
                "серпень",
                "أغسطس (آب)",
                "اوت",
                "Ağustos",
                "august",
                "gusht",
                "наймдугаар сар",
                "août"
              ]
            },
            {
              "de": "der September",
              "tr": [
                "вересень",
                "سبتمبر (أيلول)",
                "سپتامبر",
                "Eylül",
                "septembrie",
                "shtator",
                "есдүгээр сар",
                "septembre"
              ]
            },
            {
              "de": "der Oktober",
              "tr": [
                "жовтень",
                "أكتوبر (تشرين الأول)",
                "اکتبر",
                "Ekim",
                "octombrie",
                "tetor",
                "аравдугаар сар",
                "octobre"
              ]
            },
            {
              "de": "der November",
              "tr": [
                "листопад",
                "نوفمبر (تشرين الثاني)",
                "نوامبر",
                "Kasım",
                "noiembrie",
                "nëntor",
                "арван нэгдүгээр сар",
                "novembre"
              ]
            },
            {
              "de": "der Dezember",
              "tr": [
                "грудень",
                "ديسمبر (كانون الأول)",
                "دسامبر",
                "Aralık",
                "decembrie",
                "dhjetor",
                "арван хоёрдугаар сар",
                "décembre"
              ]
            },
            {
              "de": "der Monat – die Monate",
              "tr": [
                "місяць – місяці",
                "الشهر – الأشهر",
                "ماه – ماه‌ها",
                "ay – aylar",
                "luna – lunile",
                "muaji – muajt",
                "сар – сарууд",
                "le mois – les mois"
              ]
            }
          ]
        },
        {
          "type": "words",
          "title": "Die Wochentage",
          "items": [
            {
              "de": "der Montag",
              "tr": [
                "понеділок",
                "الاثنين",
                "دوشنبه",
                "Pazartesi",
                "luni",
                "e hënë",
                "даваа гараг",
                "lundi"
              ]
            },
            {
              "de": "der Dienstag",
              "tr": [
                "вівторок",
                "الثلاثاء",
                "سه‌شنبه",
                "Salı",
                "marți",
                "e martë",
                "мягмар гараг",
                "mardi"
              ]
            },
            {
              "de": "der Mittwoch",
              "tr": [
                "середа",
                "الأربعاء",
                "چهارشنبه",
                "Çarşamba",
                "miercuri",
                "e mërkurë",
                "лхагва гараг",
                "mercredi"
              ]
            },
            {
              "de": "der Donnerstag",
              "tr": [
                "четвер",
                "الخميس",
                "پنجشنبه",
                "Perşembe",
                "joi",
                "e enjte",
                "пүрэв гараг",
                "jeudi"
              ]
            },
            {
              "de": "der Freitag",
              "tr": [
                "п’ятниця",
                "الجمعة",
                "جمعه",
                "Cuma",
                "vineri",
                "e premte",
                "баасан гараг",
                "vendredi"
              ]
            },
            {
              "de": "der Samstag",
              "tr": [
                "субота",
                "السبت",
                "شنبه",
                "Cumartesi",
                "sâmbătă",
                "e shtunë",
                "бямба гараг",
                "samedi"
              ]
            },
            {
              "de": "der Sonntag",
              "tr": [
                "неділя",
                "الأحد",
                "یکشنبه",
                "Pazar",
                "duminică",
                "e diel",
                "ням гараг",
                "dimanche"
              ]
            },
            {
              "de": "der Wochentag – die Wochentage",
              "tr": [
                "день тижня – дні тижня",
                "يوم الأسبوع – أيام الأسبوع",
                "روز هفته – روزهای هفته",
                "haftanın günü – haftanın günleri",
                "ziua săptămânii – zilele săptămânii",
                "dita e javës – ditët e javës",
                "гараг – гарагууд",
                "le jour de la semaine – les jours de la semaine"
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "personen",
      "icon": "👥",
      "title": "er, sie oder Sie? Über andere sprechen",
      "blocks": [
        {
          "type": "text",
          "text": "Wiederholung von <a href=\"/kurstagebuch/2026-11-19/\">Tag 1</a>: ich <b>-e</b>, du <b>-st</b>, Sie <b>-en</b> und „du oder Sie?“."
        },
        {
          "type": "rule",
          "title": "Neu: er / sie → -t",
          "text": "<b>er</b> und <b>sie</b> (eine Person) → Endung <b>-t</b>. <b>heißen</b>: er/sie heißt – wie du heißt.",
          "tr": [
            "er (він) і sie (вона) → закінчення -t. heißen: er/sie heißt – як du heißt.",
            "er (هو) و sie (هي) ← النهاية ‎-t. الفعل heißen: er/sie heißt – مثل du heißt.",
            "er (او، مرد) و sie (او، زن) ← پسوند ‎-t. فعل heißen: er/sie heißt – مثل du heißt.",
            "er (o – erkek) ve sie (o – kadın) → -t eki. heißen: er/sie heißt – du heißt gibi.",
            "er (el) și sie (ea) → terminația -t. heißen: er/sie heißt – ca du heißt.",
            "er (ai) dhe sie (ajo) → mbaresa -t. heißen: er/sie heißt – si du heißt.",
            "er (тэр – эрэгтэй), sie (тэр – эмэгтэй) → -t нөхцөл. heißen: er/sie heißt – du heißt-тэй адил.",
            "er (il) et sie (elle) → terminaison -t. heißen : er/sie heißt – comme du heißt."
          ],
          "table": {
            "head": [
              "",
              "kommen",
              "wohnen",
              "heißen",
              "lernen"
            ],
            "rows": [
              [
                "er / sie",
                "komm<b>t</b>",
                "wohn<b>t</b>",
                "heiß<b>t</b>",
                "lern<b>t</b>"
              ]
            ]
          }
        },
        {
          "type": "rule",
          "title": "er, sie oder Sie?",
          "text": "<b>er</b> = ein Mann: Herr Abadi → <b>Er</b> wohnt in Bonn.<br><b>sie</b> = eine Frau: Frau Kovalenko → <b>Sie</b> wohnt in Köln.<br>Am Satzanfang sehen sie und Sie gleich aus: <b>Sie</b>. Das Verb hilft: Sie wohn<b>t</b> (-t = eine Frau). Sie wohn<b>en</b> (-en = höflich, Sie).",
          "tr": [
            "er = чоловік: Herr Abadi → Er wohnt in Bonn. sie = жінка: Frau Kovalenko → Sie wohnt in Köln. На початку речення sie («вона») і Sie («ви») виглядають однаково: Sie. Допомагає дієслово: Sie wohnt (-t = вона). Sie wohnen (-en = ввічливе «ви»).",
            "er = رجل: Herr Abadi → Er wohnt in Bonn. و sie = امرأة: Frau Kovalenko → Sie wohnt in Köln. في بداية الجملة تبدو sie (هي) وSie (حضرتك) متشابهتين: Sie. الفعل يساعد: Sie wohnt (‎-t = هي). Sie wohnen (‎-en = حضرتك، للاحترام).",
            "er = یک مرد: Herr Abadi → Er wohnt in Bonn. sie = یک زن: Frau Kovalenko → Sie wohnt in Köln. در آغاز جمله sie (او، زن) و Sie (شما) یک‌شکل‌اند: Sie. فعل کمک می‌کند: Sie wohnt (‎-t = او، زن). Sie wohnen (‎-en = شما، مؤدبانه).",
            "er = bir erkek: Herr Abadi → Er wohnt in Bonn. sie = bir kadın: Frau Kovalenko → Sie wohnt in Köln. Cümle başında sie (o, kadın) ve Sie (siz) aynı görünür: Sie. Fiil yardım eder: Sie wohnt (-t = kadın). Sie wohnen (-en = kibar hitap, siz).",
            "er = un bărbat: Herr Abadi → Er wohnt in Bonn. sie = o femeie: Frau Kovalenko → Sie wohnt in Köln. La început de propoziție sie (ea) și Sie (dumneavoastră) arată la fel: Sie. Verbul ajută: Sie wohnt (-t = ea). Sie wohnen (-en = politicos, dumneavoastră).",
            "er = një burrë: Herr Abadi → Er wohnt in Bonn. sie = një grua: Frau Kovalenko → Sie wohnt in Köln. Në fillim të fjalisë sie (ajo) dhe Sie (ju) duken njësoj: Sie. Folja ndihmon: Sie wohnt (-t = ajo). Sie wohnen (-en = ju, me respekt).",
            "er = эрэгтэй хүн: Herr Abadi → Er wohnt in Bonn. sie = эмэгтэй хүн: Frau Kovalenko → Sie wohnt in Köln. Өгүүлбэрийн эхэнд sie (тэр, эмэгтэй) ба Sie (та) адилхан харагдана: Sie. Үйл үг тусална: Sie wohnt (-t = тэр эмэгтэй). Sie wohnen (-en = та, эелдэг).",
            "er = un homme : Herr Abadi → Er wohnt in Bonn. sie = une femme : Frau Kovalenko → Sie wohnt in Köln. En début de phrase, sie (elle) et Sie (vous) se ressemblent : Sie. Le verbe aide : Sie wohnt (-t = elle). Sie wohnen (-en = vous de politesse)."
          ]
        },
        {
          "type": "phrases",
          "title": "Über andere sprechen (Partner-Interview)",
          "items": [
            {
              "de": "Sie heißt Lina.",
              "tr": [
                "Її звати Ліна.",
                "اسمها لينا.",
                "اسم او لینا است.",
                "Onun adı Lina.",
                "Ea se numește Lina.",
                "Ajo quhet Lina.",
                "Түүнийг Лина гэдэг.",
                "Elle s’appelle Lina."
              ]
            },
            {
              "de": "Er ist verheiratet und hat drei Kinder.",
              "tr": [
                "Він одружений і має трьох дітей.",
                "هو متزوج وعنده ثلاثة أولاد.",
                "او متأهل است و سه فرزند دارد.",
                "O evli ve üç çocuğu var.",
                "El este căsătorit și are trei copii.",
                "Ai është i martuar dhe ka tre fëmijë.",
                "Тэр гэрлэсэн, гурван хүүхэдтэй.",
                "Il est marié et a trois enfants."
              ]
            },
            {
              "de": "Seine Muttersprache ist Arabisch.",
              "tr": [
                "Його рідна мова – арабська.",
                "لغته الأم هي العربية.",
                "زبان مادری او عربی است.",
                "Onun anadili Arapça.",
                "Limba lui maternă este araba.",
                "Gjuha e tij amtare është arabishtja.",
                "Түүний эх хэл нь араб хэл.",
                "Sa langue maternelle est l’arabe."
              ]
            },
            {
              "de": "Ihre Muttersprachen sind Arabisch und Kurdisch.",
              "tr": [
                "Її рідні мови – арабська й курдська.",
                "لغتاها الأم هما العربية والكردية.",
                "زبان‌های مادری او عربی و کردی است.",
                "Onun anadilleri Arapça ve Kürtçe.",
                "Limbile ei materne sunt araba și kurda.",
                "Gjuhët e saj amtare janë arabishtja dhe kurdishtja.",
                "Түүний эх хэл нь араб, курд хэл.",
                "Ses langues maternelles sont l’arabe et le kurde."
              ]
            },
            {
              "de": "Sie spielt gern Schach.",
              "tr": [
                "Вона любить грати в шахи.",
                "هي تحب لعب الشطرنج.",
                "او دوست دارد شطرنج بازی کند.",
                "O satranç oynamayı seviyor.",
                "Ei îi place să joace șah.",
                "Asaj i pëlqen të luajë shah.",
                "Тэр шатар тоглох дуртай.",
                "Elle aime jouer aux échecs."
              ]
            }
          ]
        },
        {
          "type": "warn",
          "items": [
            {
              "wrong": "Sie mag joggen. / Er mag Bücher lesen.",
              "right": "Sie joggt gern. / Er liest gern Bücher.",
              "why": "<b>gern + Verb</b>. <b>mögen + Nomen</b>: Er mag Bücher. (Regel von Tag 1)"
            }
          ]
        }
      ]
    },
    {
      "id": "aussprache",
      "icon": "👂",
      "title": "Aussprache: -ig und -er",
      "blocks": [
        {
          "type": "rule",
          "title": "-ig und -er am Wortende",
          "text": "<b>-ig</b> am Wortende klingt wie <b>„ich“</b>.<br><b>-er</b> am Wortende klingt wie ein kurzes <b>„a“</b> – das r hört man kaum.",
          "tr": [
            "-ig у кінці слова звучить як «ich». -er у кінці слова звучить як коротке «а» – r майже не чути.",
            "‎-ig في آخر الكلمة تُلفظ مثل «ich». و‎-er في آخر الكلمة تُلفظ مثل «a» قصيرة – لا نكاد نسمع الـ r.",
            "‎-ig در آخر کلمه مثل «ich» تلفظ می‌شود. ‎-er در آخر کلمه مثل یک «اَ»ی کوتاه شنیده می‌شود – r تقریباً شنیده نمی‌شود.",
            "Kelime sonundaki -ig «ich» gibi okunur. Kelime sonundaki -er kısa bir «a» gibi okunur – r neredeyse duyulmaz.",
            "-ig la sfârșitul cuvântului se pronunță ca „ich”. -er la sfârșitul cuvântului sună ca un „a” scurt – r aproape nu se aude.",
            "-ig në fund të fjalës shqiptohet si „ich”. -er në fund të fjalës tingëllon si një „a” e shkurtër – r pothuajse nuk dëgjohet.",
            "Үгийн төгсгөлийн -ig нь «ich» шиг дуудагдана. Үгийн төгсгөлийн -er нь богино «а» шиг сонсогдоно – r бараг сонсогдохгүй.",
            "-ig en fin de mot se prononce comme « ich ». -er en fin de mot sonne comme un « a » bref – on n’entend presque pas le r."
          ],
          "table": {
            "head": [
              "-ig wie „ich“",
              "-er wie „a“"
            ],
            "rows": [
              [
                "billig",
                "Mutter"
              ],
              [
                "ledig",
                "Vater"
              ],
              [
                "zwanzig",
                "Bruder"
              ]
            ]
          }
        }
      ]
    },
    {
      "id": "lesetexte",
      "icon": "📖",
      "title": "Lesetexte",
      "blocks": [
        {
          "type": "text",
          "title": "Bei der Anmeldung",
          "text": "Nina ist neu in Berlin. Sie kommt aus Albanien. Heute geht sie zur Anmeldung für den Deutschkurs. Im Büro sitzt Frau Martin.<br>Frau Martin sagt: „Guten Tag! Wie heißen Sie, bitte?“<br>„Guten Tag! Ich heiße Nina. Mein Familienname ist Otto: O – T – T – O.“<br>Frau Martin schreibt den Namen auf das Formular. Dann fragt sie: „Woher kommen Sie, Frau Otto?“<br>„Ich komme aus Albanien.“<br>„Und wo wohnen Sie in Berlin?“<br>„Ich wohne in der Parkstraße 8.“<br>„Wie ist Ihre Telefonnummer?“<br>„Meine Telefonnummer ist 0162 495.“<br>Ein Mann kommt ins Büro. Er sagt: „Hallo! Ich heiße Ali. Ich komme aus Syrien.“<br>Nina sagt: „Hallo, Ali! Ich bin auch im Deutschkurs!“<br>Frau Martin sagt: „Super! Willkommen im Kurs! Auf Wiedersehen!“<br>Nina und Ali gehen zusammen nach Hause. Sie sagen: „Tschüss! Bis morgen!“"
        },
        {
          "type": "text",
          "title": "Die neue Nachbarin",
          "text": "Timo wohnt in Bonn, in der Waldstraße 6. Heute ist Sonntag. Um zehn Uhr macht Timo die Tür auf. Vor der Tür steht eine Frau.<br>Sie sagt: „Guten Morgen! Ich bin neu hier. Ich heiße Olena: O – L – E – N – A.“<br>Timo sagt: „Hallo, Olena! Ich heiße Timo. Ich komme aus Deutschland.“<br>Neben Olena steht ein Mann. Olena sagt: „Das ist Ivan. Er kommt aus der Ukraine. Ich komme auch aus der Ukraine.“<br>Timo fragt: „Wo wohnst du, Olena?“<br>Olena sagt: „Ich wohne auch hier in der Waldstraße 6, in Wohnung 3.“<br>Timo lächelt: „Super! Ich wohne in Wohnung 2. Hier ist meine Telefonnummer: 0174 293.“<br>Olena notiert die Nummer und sagt: „Vielen Dank, Timo! Auf Wiedersehen!“<br>Timo sagt: „Tschüss, Olena! Tschüss, Ivan! Bis morgen!“"
        },
        {
          "type": "text",
          "text": "Fragen zu den Texten: siehe <a href=\"/kurstagebuch/2026-11-20/ueben/\">Übungen</a>."
        }
      ]
    },
    {
      "id": "kahoot",
      "icon": "🎮",
      "title": "Kahoot-Quiz",
      "blocks": [
        {
          "type": "text",
          "title": "Kahoot-Quiz zum Tag",
          "text": "Wiederhole den Tag mit dem Quiz: <a href=\"https://create.kahoot.it/details/caed22fa-4a08-4c41-8d6a-6616a9f5e574\" target=\"_blank\" rel=\"noopener\">Kahoot öffnen</a>"
        }
      ]
    }
  ],
  "note": "Alle Namen in den Beispielen sind erfunden."
};
