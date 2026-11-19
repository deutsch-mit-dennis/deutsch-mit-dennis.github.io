// Kurstagebuch – lesson 1 (protocol). Data contract: /kurstagebuch/SCHEMA.md
// Translation order (tr): uk, ar, fa, tr, ro, sq, mn, fr
// All names in examples are invented.
window.KT_DAY = {
  "date": "2026-11-19",
  "nr": 1,
  "weekday": "Donnerstag",
  "level": "A1",
  "title": "Sich vorstellen",
  "intro": "Heute haben wir uns kennengelernt. Wir haben gelernt: Wie heiße ich? Woher komme ich? Was bin ich von Beruf? Welche Sprachen spreche ich? Wie ist meine Familie? Was mache ich gern?",
  "goals": [
    "Ich kann jemanden begrüßen und mich verabschieden.",
    "Ich kann sagen, wie ich heiße, und meinen Namen buchstabieren.",
    "Ich kann sagen, woher ich komme, wo ich geboren bin und wo ich wohne.",
    "Ich kann über meinen Beruf sprechen.",
    "Ich kann sagen, welche Sprachen ich spreche und seit wann ich Deutsch lerne.",
    "Ich kann über meine Familie und meine Hobbys sprechen."
  ],
  "sections": [
    {
      "id": "begruessung",
      "icon": "👋",
      "title": "Begrüßung und Verabschiedung",
      "blocks": [
        {
          "type": "phrases",
          "title": "Hallo und Tschüss",
          "items": [
            {
              "de": "Hallo!",
              "tr": [
                "Привіт!",
                "مرحبًا!",
                "سلام!",
                "Merhaba!",
                "Bună!",
                "Përshëndetje!",
                "Сайн уу!",
                "Salut !"
              ]
            },
            {
              "de": "Guten Morgen!",
              "tr": [
                "Доброго ранку!",
                "صباح الخير!",
                "صبح بخیر!",
                "Günaydın!",
                "Bună dimineața!",
                "Mirëmëngjes!",
                "Өглөөний мэнд!",
                "Bonjour ! (le matin)"
              ]
            },
            {
              "de": "Guten Tag!",
              "tr": [
                "Добрий день!",
                "نهارك سعيد!",
                "روز بخیر!",
                "İyi günler!",
                "Bună ziua!",
                "Mirëdita!",
                "Өдрийн мэнд!",
                "Bonjour !"
              ]
            },
            {
              "de": "Guten Abend!",
              "tr": [
                "Добрий вечір!",
                "مساء الخير!",
                "عصر بخیر!",
                "İyi akşamlar!",
                "Bună seara!",
                "Mirëmbrëma!",
                "Оройн мэнд!",
                "Bonsoir !"
              ]
            },
            {
              "de": "Gute Nacht!",
              "tr": [
                "На добраніч!",
                "تصبح على خير!",
                "شب بخیر!",
                "İyi geceler!",
                "Noapte bună!",
                "Natën e mirë!",
                "Сайхан амраарай!",
                "Bonne nuit !"
              ]
            },
            {
              "de": "Tschüss!",
              "tag": "du",
              "tr": [
                "Бувай!",
                "مع السلامة!",
                "خداحافظ!",
                "Hoşça kal!",
                "Pa!",
                "Tung! / Ciao!",
                "Баяртай!",
                "Salut ! / Ciao !"
              ]
            },
            {
              "de": "Auf Wiedersehen!",
              "tag": "Sie",
              "tr": [
                "До побачення!",
                "إلى اللقاء!",
                "خدا نگهدار!",
                "Hoşça kalın!",
                "La revedere!",
                "Mirupafshim!",
                "Баяртай!",
                "Au revoir !"
              ]
            },
            {
              "de": "Bis morgen!",
              "tr": [
                "До завтра!",
                "إلى الغد!",
                "تا فردا!",
                "Yarın görüşürüz!",
                "Pe mâine!",
                "Shihemi nesër!",
                "Маргааш уулзъя!",
                "À demain !"
              ]
            }
          ]
        },
        {
          "type": "phrases",
          "title": "Wie geht’s?",
          "items": [
            {
              "de": "Wie geht es Ihnen?",
              "tag": "Sie",
              "tr": [
                "Як у Вас справи?",
                "كيف حالُ حضرتك؟",
                "حال شما چطور است؟",
                "Nasılsınız?",
                "Ce mai faceți?",
                "Si jeni?",
                "Таны бие сайн уу?",
                "Comment allez-vous ?"
              ]
            },
            {
              "de": "Wie geht es dir? / Wie geht’s?",
              "tag": "du",
              "tr": [
                "Як справи?",
                "كيف حالك؟",
                "حالت چطور است؟ / چطوری؟",
                "Nasılsın?",
                "Ce mai faci?",
                "Si je?",
                "Чи сайн уу? / Юу байна?",
                "Comment vas-tu ? / Ça va ?"
              ]
            },
            {
              "de": "Mir geht’s gut, danke. Und Ihnen?",
              "tag": "Sie",
              "tr": [
                "Добре, дякую. А у Вас?",
                "أنا بخير، شكرًا. وحضرتك؟",
                "خوبم، ممنون. شما چطورید؟",
                "İyiyim, teşekkürler. Ya siz?",
                "Bine, mulțumesc. Dar dumneavoastră?",
                "Mirë, faleminderit. Po ju?",
                "Сайн, баярлалаа. Та сайн уу?",
                "Je vais bien, merci. Et vous ?"
              ]
            },
            {
              "de": "Mir geht’s gut, danke. Und dir?",
              "tag": "du",
              "tr": [
                "Добре, дякую. А в тебе?",
                "أنا بخير، شكرًا. وأنت؟",
                "خوبم، ممنون. تو چطوری؟",
                "İyiyim, teşekkürler. Ya sen?",
                "Bine, mulțumesc. Dar tu?",
                "Mirë, faleminderit. Po ti?",
                "Сайн, баярлалаа. Чи сайн уу?",
                "Je vais bien, merci. Et toi ?"
              ]
            },
            {
              "de": "Super! / Sehr gut!",
              "tr": [
                "Чудово! / Дуже добре!",
                "ممتاز! / جيد جدًا!",
                "عالی! / خیلی خوب!",
                "Süper! / Çok iyi!",
                "Super! / Foarte bine!",
                "Shkëlqyeshëm! / Shumë mirë!",
                "Маш сайн!",
                "Super ! / Très bien !"
              ]
            },
            {
              "de": "Es geht.",
              "tr": [
                "Так собі.",
                "لا بأس.",
                "بد نیستم.",
                "İdare eder.",
                "Merge.",
                "Ashtu-ashtu.",
                "Дажгүй.",
                "Comme ci, comme ça."
              ]
            },
            {
              "de": "Nicht so gut.",
              "tr": [
                "Не дуже добре.",
                "لستُ على ما يُرام.",
                "زیاد خوب نیستم.",
                "Pek iyi değilim.",
                "Nu prea bine.",
                "Jo shumë mirë.",
                "Тийм ч сайн биш.",
                "Pas très bien."
              ]
            }
          ]
        },
        {
          "type": "phrases",
          "title": "Höflich sein",
          "items": [
            {
              "de": "bitte",
              "tr": [
                "будь ласка",
                "من فضلك",
                "لطفاً",
                "lütfen",
                "te rog / vă rog",
                "të lutem / ju lutem",
                "гуйя",
                "s’il te plaît / s’il vous plaît"
              ]
            },
            {
              "de": "danke / vielen Dank",
              "tr": [
                "дякую / щиро дякую",
                "شكرًا / شكرًا جزيلًا",
                "ممنون / خیلی ممنون",
                "teşekkürler / çok teşekkürler",
                "mulțumesc / mulțumesc mult",
                "faleminderit / shumë faleminderit",
                "баярлалаа / их баярлалаа",
                "merci / merci beaucoup"
              ]
            },
            {
              "de": "Entschuldigung!",
              "tr": [
                "Вибачте!",
                "عفوًا! / المعذرة!",
                "ببخشید!",
                "Affedersiniz!",
                "Scuzați!",
                "Më falni!",
                "Уучлаарай!",
                "Excusez-moi !"
              ]
            }
          ]
        },
        {
          "type": "words",
          "items": [
            {
              "de": "die Begrüßung",
              "emoji": "🤝",
              "tr": [
                "привітання",
                "التحية",
                "سلام و احوال‌پرسی",
                "selamlama",
                "salutul",
                "përshëndetja",
                "мэндчилгээ",
                "la salutation"
              ]
            },
            {
              "de": "die Verabschiedung",
              "emoji": "👋",
              "tr": [
                "прощання",
                "الوداع",
                "خداحافظی",
                "vedalaşma",
                "despărțirea / rămas-bunul",
                "përshëndetja e ndarjes",
                "салах ёс",
                "l’au revoir / les adieux"
              ]
            }
          ]
        },
        {
          "type": "rule",
          "title": "du oder Sie?",
          "text": "<b>du</b> = Familie, Freunde, Kinder (oft auch im Kurs).<br><b>Sie</b> = fremde Personen, Ämter, Arzt, Chef. <b>Sie</b> schreibt man immer groß.",
          "tr": [
            "«du» – родина, друзі, діти. «Sie» – незнайомі люди, установи, лікар, начальник. Sie завжди пишемо з великої літери.",
            "«du» للعائلة والأصدقاء والأطفال. «Sie» للأشخاص الغرباء والدوائر الرسمية والطبيب والمدير. تُكتب Sie دائمًا بحرف كبير.",
            "«du» برای خانواده، دوستان و بچه‌ها. «Sie» برای افراد ناآشنا، اداره‌ها، دکتر و رئیس. Sie همیشه با حرف بزرگ نوشته می‌شود.",
            "«du» aile, arkadaşlar ve çocuklar için. «Sie» tanımadığınız kişiler, resmî daireler, doktor ve patron için. Sie her zaman büyük harfle yazılır.",
            "„du” – familie, prieteni, copii. „Sie” – persoane necunoscute, autorități, medic, șef. Sie se scrie mereu cu literă mare.",
            "«du» – familja, miqtë, fëmijët. «Sie» – njerëz që nuk i njihni, zyrat, mjeku, shefi. Sie shkruhet gjithmonë me shkronjë të madhe.",
            "«du» – гэр бүл, найз нөхөд, хүүхдүүдэд. «Sie» – танихгүй хүн, албан газар, эмч, даргад. Sie-г үргэлж том үсгээр бичнэ.",
            "« du » = tu : famille, amis, enfants. « Sie » = vous : personnes inconnues, administrations, médecin, chef. Sie s’écrit toujours avec une majuscule."
          ],
          "table": {
            "head": [
              "",
              "du 🙂",
              "Sie 🤝"
            ],
            "rows": [
              [
                "Name",
                "Wie heißt du?",
                "Wie heißen Sie?"
              ],
              [
                "Herkunft",
                "Woher kommst du?",
                "Woher kommen Sie?"
              ],
              [
                "Befinden",
                "Wie geht es dir?",
                "Wie geht es Ihnen?"
              ],
              [
                "Antwort",
                "… Und dir?",
                "… Und Ihnen?"
              ],
              [
                "Tschüss",
                "Tschüss!",
                "Auf Wiedersehen!"
              ]
            ]
          }
        },
        {
          "type": "warn",
          "items": [
            {
              "wrong": "Wie geht´s?",
              "right": "Wie geht’s?",
              "why": "geht’s = geht es. Das Zeichen ’ ist ein Apostroph (hier fehlt das e), kein Akzent ´."
            }
          ]
        }
      ]
    },
    {
      "id": "name",
      "icon": "🔤",
      "title": "Name und Buchstabieren",
      "blocks": [
        {
          "type": "phrases",
          "items": [
            {
              "de": "Wie heißen Sie?",
              "tag": "Sie",
              "tr": [
                "Як Вас звати?",
                "ما اسمُ حضرتك؟",
                "اسم شما چیست؟",
                "Adınız ne?",
                "Cum vă numiți?",
                "Si quheni?",
                "Таны нэр хэн бэ?",
                "Comment vous appelez-vous ?"
              ]
            },
            {
              "de": "Wie heißt du?",
              "tag": "du",
              "tr": [
                "Як тебе звати?",
                "ما اسمك؟",
                "اسمت چیست؟",
                "Adın ne?",
                "Cum te numești?",
                "Si quhesh?",
                "Чиний нэр хэн бэ?",
                "Comment tu t’appelles ?"
              ]
            },
            {
              "de": "Ich heiße Mira.",
              "tr": [
                "Мене звати Міра.",
                "اسمي ميرا.",
                "اسم من میرا است.",
                "Adım Mira.",
                "Mă numesc Mira.",
                "Unë quhem Mira.",
                "Намайг Мира гэдэг.",
                "Je m’appelle Mira."
              ]
            },
            {
              "de": "Mein Vorname ist Mira.",
              "tr": [
                "Моє ім’я – Міра.",
                "اسمي الأول ميرا.",
                "نام کوچک من میرا است.",
                "Adım Mira.",
                "Prenumele meu este Mira.",
                "Emri im është Mira.",
                "Миний нэр Мира.",
                "Mon prénom est Mira."
              ]
            },
            {
              "de": "Mein Nachname (Familienname) ist Ammann.",
              "tr": [
                "Моє прізвище – Амман.",
                "اسم عائلتي أمّان.",
                "نام خانوادگی من آمان است.",
                "Soyadım Ammann.",
                "Numele meu de familie este Ammann.",
                "Mbiemri im është Ammann.",
                "Миний овог Амманн.",
                "Mon nom de famille est Ammann."
              ]
            },
            {
              "de": "Buchstabieren Sie bitte Ihren Namen!",
              "tag": "Sie",
              "tr": [
                "Назвіть, будь ласка, своє ім’я по літерах!",
                "تهجَّ اسمك من فضلك!",
                "لطفاً اسم‌تان را هجی کنید!",
                "Lütfen adınızı harf harf söyleyin!",
                "Vă rog să vă spuneți numele pe litere!",
                "Ju lutem, gërmëzoni emrin tuaj!",
                "Нэрээ үсэглэж хэлнэ үү!",
                "Épelez votre nom, s’il vous plaît !"
              ]
            },
            {
              "de": "Wie schreibt man das?",
              "tr": [
                "Як це пишеться?",
                "كيف يُكتب هذا؟",
                "این را چطور می‌نویسند؟",
                "Bu nasıl yazılır?",
                "Cum se scrie asta?",
                "Si shkruhet kjo?",
                "Үүнийг яаж бичдэг вэ?",
                "Comment ça s’écrit ?"
              ]
            },
            {
              "de": "Noch einmal, bitte. / Langsam, bitte.",
              "tr": [
                "Ще раз, будь ласка. / Повільніше, будь ласка.",
                "مرة أخرى من فضلك. / ببطء من فضلك.",
                "لطفاً یک بار دیگر. / لطفاً آهسته‌تر.",
                "Bir kez daha, lütfen. / Yavaş, lütfen.",
                "Încă o dată, vă rog. / Mai rar, vă rog.",
                "Edhe një herë, ju lutem. / Më ngadalë, ju lutem.",
                "Дахиад нэг хэлнэ үү. / Удаан хэлнэ үү.",
                "Encore une fois, s’il vous plaît. / Plus lentement, s’il vous plaît."
              ]
            },
            {
              "de": "mit Doppel-M (zweimal M)",
              "tr": [
                "з подвійним M (двічі M)",
                "بحرفَي M (مرّتين)",
                "با دو تا M",
                "iki M ile",
                "cu doi de M",
                "me dy M",
                "хоёр M-тэй",
                "avec deux M"
              ]
            }
          ]
        },
        {
          "type": "table",
          "title": "Das Alphabet – so spricht man die Buchstaben",
          "head": [
            "Buchstabe",
            "So sagt man",
            "Beispiel",
            "Buchstabe",
            "So sagt man",
            "Beispiel"
          ],
          "rows": [
            [
              "A a",
              "a",
              "Apfel",
              "P p",
              "pe",
              "Post"
            ],
            [
              "B b",
              "be",
              "Brot",
              "Q q",
              "ku",
              "Quark"
            ],
            [
              "C c",
              "tse",
              "Café",
              "R r",
              "er",
              "Reis"
            ],
            [
              "D d",
              "de",
              "Deutschland",
              "S s",
              "es",
              "Sohn / Schule"
            ],
            [
              "E e",
              "e",
              "Esel / Ei",
              "T t",
              "te",
              "Tag"
            ],
            [
              "F f",
              "ef",
              "Fisch",
              "U u",
              "u",
              "Uhr ⏰"
            ],
            [
              "G g",
              "ge",
              "Garten",
              "V v",
              "fau",
              "Vater"
            ],
            [
              "H h",
              "ha",
              "Hand / Hut",
              "W w",
              "we",
              "Wasser"
            ],
            [
              "I i",
              "i",
              "Igel",
              "X x",
              "iks",
              "Xylofon"
            ],
            [
              "J j",
              "jot",
              "Jahr",
              "Y y",
              "üpsilon",
              "Yoga"
            ],
            [
              "K k",
              "ka",
              "Kind",
              "Z z",
              "zett (klingt wie ts)",
              "Zahl"
            ],
            [
              "L l",
              "el",
              "Land",
              "Ä ä",
              "a-Umlaut",
              "Ärztin"
            ],
            [
              "M m",
              "em",
              "Mond",
              "Ö ö",
              "o-Umlaut",
              "Öl"
            ],
            [
              "N n",
              "en",
              "Name",
              "Ü ü",
              "u-Umlaut",
              "Übung"
            ],
            [
              "O o",
              "o",
              "Obst",
              "ß",
              "eszett (scharfes s)",
              "Straße"
            ]
          ]
        },
        {
          "type": "rule",
          "title": "Umlaute und ß",
          "text": "Ä, Ö, Ü haben zwei Punkte. Im Formular oder am Computer schreibt man auch <b>ae, oe, ue</b>: Müller = Mueller. <b>ß</b> = <b>ss</b>: Straße = Strasse.<br>Zwei gleiche Buchstaben: <b>Doppel-M</b> = mm, <b>Doppel-N</b> = nn.",
          "tr": [
            "Ä, Ö, Ü мають дві крапки. У формулярі або на комп’ютері можна писати ae, oe, ue: Müller = Mueller. ß = ss. Doppel-M = дві літери m (mm).",
            "الحروف Ä وÖ وÜ عليها نقطتان. في الاستمارة أو على الحاسوب يمكن كتابة ae وoe وue: Müller = Mueller. ‏ß = ss. ‏Doppel-M تعني حرفَي m (mm).",
            "Ä، Ö و Ü دو نقطه دارند. در فرم یا روی کامپیوتر می‌توان ae، oe، ue نوشت: Müller = Mueller. ‏ß = ss. ‏Doppel-M یعنی دو تا m (mm).",
            "Ä, Ö, Ü harflerinin üstünde iki nokta vardır. Formda veya bilgisayarda ae, oe, ue de yazılabilir: Müller = Mueller. ß = ss. Doppel-M = iki m (mm).",
            "Ä, Ö, Ü au două puncte. În formular sau la calculator se poate scrie și ae, oe, ue: Müller = Mueller. ß = ss. Doppel-M = doi de m (mm).",
            "Ä, Ö, Ü kanë dy pika. Në formular ose në kompjuter mund të shkruhet edhe ae, oe, ue: Müller = Mueller. ß = ss. Doppel-M = dy shkronja m (mm).",
            "Ä, Ö, Ü үсэг дээр хоёр цэг байдаг. Маягт эсвэл компьютерт ae, oe, ue гэж бичиж болно: Müller = Mueller. ß = ss. Doppel-M = хоёр m (mm).",
            "Ä, Ö, Ü ont deux points. Dans un formulaire ou à l’ordinateur, on peut écrire ae, oe, ue : Müller = Mueller. ß = ss. Doppel-M = deux m (mm)."
          ]
        },
        {
          "type": "examples",
          "title": "So haben wir buchstabiert",
          "items": [
            "Mein Vorname ist Mira: M wie Mond, I wie Igel, R wie Reis, A wie Apfel.",
            "Mein Nachname ist Ammann: A wie Apfel, Doppel-M, A wie Apfel, Doppel-N."
          ]
        },
        {
          "type": "warn",
          "items": [
            {
              "wrong": "I wie Ice",
              "right": "I wie Igel",
              "why": "Ice ist Englisch. Auf Deutsch heißt das Eis – und Eis beginnt mit E. Achtung: ei spricht man wie „ai“."
            }
          ]
        }
      ]
    },
    {
      "id": "herkunft",
      "icon": "🌍",
      "title": "Herkunft, Geburtsort und Wohnort",
      "blocks": [
        {
          "type": "phrases",
          "items": [
            {
              "de": "Woher kommen Sie?",
              "tag": "Sie",
              "tr": [
                "Звідки Ви?",
                "من أين حضرتك؟",
                "شما اهل کجا هستید؟",
                "Nerelisiniz?",
                "De unde sunteți?",
                "Nga jeni?",
                "Та хаанаас ирсэн бэ?",
                "D’où venez-vous ?"
              ]
            },
            {
              "de": "Woher kommst du?",
              "tag": "du",
              "tr": [
                "Звідки ти?",
                "من أين أنت؟",
                "تو اهل کجا هستی؟",
                "Nerelisin?",
                "De unde ești?",
                "Nga je?",
                "Чи хаанаас ирсэн бэ?",
                "D’où viens-tu ?"
              ]
            },
            {
              "de": "Ich komme aus Syrien.",
              "tr": [
                "Я з Сирії.",
                "أنا من سوريا.",
                "من اهل سوریه هستم.",
                "Suriye’den geliyorum.",
                "Sunt din Siria.",
                "Unë vij nga Siria.",
                "Би Сириэс ирсэн.",
                "Je viens de Syrie."
              ]
            },
            {
              "de": "Ich komme aus der Ukraine.",
              "tr": [
                "Я з України.",
                "أنا من أوكرانيا.",
                "من اهل اوکراین هستم.",
                "Ukrayna’dan geliyorum.",
                "Sunt din Ucraina.",
                "Unë vij nga Ukraina.",
                "Би Украинаас ирсэн.",
                "Je viens d’Ukraine."
              ]
            },
            {
              "de": "Ich komme aus dem Irak.",
              "tr": [
                "Я з Іраку.",
                "أنا من العراق.",
                "من اهل عراق هستم.",
                "Irak’tan geliyorum.",
                "Sunt din Irak.",
                "Unë vij nga Iraku.",
                "Би Иракаас ирсэн.",
                "Je viens d’Irak."
              ]
            },
            {
              "de": "Wo sind Sie geboren?",
              "tag": "Sie",
              "tr": [
                "Де Ви народилися?",
                "أين وُلدتَ؟",
                "شما کجا به دنیا آمده‌اید؟",
                "Nerede doğdunuz?",
                "Unde v-ați născut?",
                "Ku keni lindur?",
                "Та хаана төрсөн бэ?",
                "Où êtes-vous né(e) ?"
              ]
            },
            {
              "de": "Ich bin in … geboren.",
              "tr": [
                "Я народився / народилася в …",
                "وُلدتُ في …",
                "من در … به دنیا آمده‌ام.",
                "…’da doğdum.",
                "M-am născut în …",
                "Unë kam lindur në …",
                "Би …-д төрсөн.",
                "Je suis né(e) à / en …"
              ]
            },
            {
              "de": "Wo wohnen Sie? / Wo wohnst du?",
              "tr": [
                "Де Ви живете? / Де ти живеш?",
                "أين تسكن؟",
                "کجا زندگی می‌کنید؟ / کجا زندگی می‌کنی؟",
                "Nerede oturuyorsunuz? / Nerede oturuyorsun?",
                "Unde locuiți? / Unde locuiești?",
                "Ku banoni? / Ku banon?",
                "Та хаана амьдардаг вэ? / Чи хаана амьдардаг вэ?",
                "Où habitez-vous ? / Où habites-tu ?"
              ]
            },
            {
              "de": "Ich wohne in Köln.",
              "tr": [
                "Я живу в Кельні.",
                "أسكن في كولونيا.",
                "من در کلن زندگی می‌کنم.",
                "Köln’de oturuyorum.",
                "Locuiesc în Köln.",
                "Unë banoj në Këln.",
                "Би Кёльн хотод амьдардаг.",
                "J’habite à Cologne."
              ]
            },
            {
              "de": "Ich lebe seit 2 Jahren in Deutschland.",
              "tr": [
                "Я живу в Німеччині вже 2 роки.",
                "أعيش في ألمانيا منذ سنتين.",
                "دو سال است که در آلمان زندگی می‌کنم.",
                "2 yıldır Almanya’da yaşıyorum.",
                "Locuiesc în Germania de 2 ani.",
                "Jetoj në Gjermani prej 2 vjetësh.",
                "Би Германд 2 жил амьдарч байна.",
                "Je vis en Allemagne depuis 2 ans."
              ]
            }
          ]
        },
        {
          "type": "rule",
          "title": "aus + Land",
          "text": "Die meisten Länder haben <b>keinen Artikel</b>: aus Syrien, aus Afghanistan.<br>Einige Länder haben einen Artikel: <b>die</b> Ukraine → aus <b>der</b> Ukraine. <b>der</b> Irak → aus <b>dem</b> Irak.<br>Man kann auch sagen: Ich <b>bin aus</b> Syrien. = Ich <b>komme aus</b> Syrien.",
          "tr": [
            "Більшість країн без артикля: aus Syrien. Деякі країни мають артикль: die Ukraine → aus der Ukraine, der Irak → aus dem Irak.",
            "معظم البلدان بدون أداة تعريف: aus Syrien. بعض البلدان لها أداة: die Ukraine ← aus der Ukraine، der Irak ← aus dem Irak.",
            "بیشتر کشورها حرف تعریف ندارند: aus Syrien. بعضی کشورها حرف تعریف دارند: die Ukraine ← aus der Ukraine، der Irak ← aus dem Irak.",
            "Çoğu ülke artikelsizdir: aus Syrien. Bazı ülkelerin artikeli vardır: die Ukraine → aus der Ukraine, der Irak → aus dem Irak.",
            "Majoritatea țărilor nu au articol: aus Syrien. Unele țări au articol: die Ukraine → aus der Ukraine, der Irak → aus dem Irak.",
            "Shumica e vendeve nuk kanë nyje: aus Syrien. Disa vende kanë nyje: die Ukraine → aus der Ukraine, der Irak → aus dem Irak.",
            "Ихэнх улсын нэр артикльгүй: aus Syrien. Зарим улс артикльтэй: die Ukraine → aus der Ukraine, der Irak → aus dem Irak.",
            "La plupart des pays n’ont pas d’article : aus Syrien. Certains pays ont un article : die Ukraine → aus der Ukraine, der Irak → aus dem Irak."
          ],
          "table": {
            "head": [
              "ohne Artikel",
              "die-Länder → aus der",
              "der-Länder → aus dem"
            ],
            "rows": [
              [
                "aus Syrien",
                "aus der Ukraine",
                "aus dem Irak"
              ],
              [
                "aus Afghanistan",
                "aus der Türkei",
                "aus dem Iran"
              ],
              [
                "aus Deutschland",
                "aus der Schweiz",
                "aus dem Libanon"
              ],
              [
                "aus Frankreich",
                "aus der Mongolei",
                ""
              ],
              [
                "aus Rumänien, aus Albanien",
                "",
                ""
              ]
            ]
          }
        },
        {
          "type": "rule",
          "title": "geboren in …",
          "text": "Ich bin <b>in</b> Syrien geboren. Ich bin <b>in der</b> Ukraine geboren.<br><b>in + dem = im</b>: Ich bin <b>im</b> Irak geboren.<br>Aber: Ich komme aus <b>dem</b> Irak. (aus dem = richtig)",
          "tr": [
            "in + dem = im: Ich bin im Irak geboren (Я народився в Іраку). Але: Ich komme aus dem Irak – це правильно.",
            "in + dem = im: ‏Ich bin im Irak geboren (وُلدتُ في العراق). لكن: Ich komme aus dem Irak صحيحة.",
            "in + dem = im: ‏Ich bin im Irak geboren (در عراق به دنیا آمده‌ام). اما: Ich komme aus dem Irak درست است.",
            "in + dem = im: Ich bin im Irak geboren (Irak’ta doğdum). Ama: Ich komme aus dem Irak doğrudur.",
            "in + dem = im: Ich bin im Irak geboren (M-am născut în Irak). Dar: Ich komme aus dem Irak este corect.",
            "in + dem = im: Ich bin im Irak geboren (Kam lindur në Irak). Por: Ich komme aus dem Irak është e saktë.",
            "in + dem = im: Ich bin im Irak geboren (Би Иракт төрсөн). Харин: Ich komme aus dem Irak зөв.",
            "in + dem = im : Ich bin im Irak geboren (Je suis né en Irak). Mais : Ich komme aus dem Irak est correct."
          ],
          "table": {
            "head": [
              "ohne Artikel",
              "die-Länder",
              "der-Länder"
            ],
            "rows": [
              [
                "in Syrien geboren",
                "in der Ukraine geboren",
                "im Irak geboren"
              ],
              [
                "in Frankreich geboren",
                "in der Mongolei geboren",
                "im Iran geboren"
              ],
              [
                "in Deutschland geboren",
                "in der Türkei geboren",
                "im Libanon geboren"
              ]
            ]
          }
        },
        {
          "type": "words",
          "items": [
            {
              "de": "das Land – die Länder",
              "emoji": "🗺️",
              "tr": [
                "країна – країни",
                "البلد – البلدان",
                "کشور – کشورها",
                "ülke – ülkeler",
                "țara – țările",
                "vendi – vendet",
                "улс – улсууд",
                "le pays – les pays"
              ]
            },
            {
              "de": "die Heimat",
              "emoji": "🏡",
              "tr": [
                "батьківщина",
                "الوطن",
                "وطن / زادگاه",
                "memleket / vatan",
                "patria / țara natală",
                "vendlindja / atdheu",
                "эх орон / төрсөн нутаг",
                "le pays d’origine"
              ]
            },
            {
              "de": "die Stadt – die Städte",
              "emoji": "🏙️",
              "tr": [
                "місто – міста",
                "المدينة – المدن",
                "شهر – شهرها",
                "şehir – şehirler",
                "orașul – orașele",
                "qyteti – qytetet",
                "хот – хотууд",
                "la ville – les villes"
              ]
            },
            {
              "de": "der Geburtsort",
              "emoji": "👶",
              "tr": [
                "місце народження",
                "مكان الولادة",
                "محل تولد",
                "doğum yeri",
                "locul nașterii",
                "vendlindja",
                "төрсөн газар",
                "le lieu de naissance"
              ]
            },
            {
              "de": "der Wohnort",
              "emoji": "🏠",
              "tr": [
                "місце проживання",
                "مكان السكن",
                "محل سکونت",
                "ikamet yeri",
                "domiciliul",
                "vendbanimi",
                "оршин суугаа газар",
                "le lieu de résidence"
              ]
            }
          ]
        },
        {
          "type": "warn",
          "items": [
            {
              "wrong": "Ich bin in dem Irak / in dem Iran geboren.",
              "right": "Ich bin im Irak / im Iran geboren.",
              "why": "in + dem = im."
            },
            {
              "wrong": "Ich komme aus Ukraine.",
              "right": "Ich komme aus der Ukraine.",
              "why": "die Ukraine hat einen Artikel: aus der Ukraine."
            },
            {
              "wrong": "Ich komme aus die Türkei.",
              "right": "Ich komme aus der Türkei.",
              "why": "Nach aus kommt der Dativ: die → der."
            }
          ]
        }
      ]
    },
    {
      "id": "beruf",
      "icon": "💼",
      "title": "Beruf und Arbeit",
      "blocks": [
        {
          "type": "phrases",
          "title": "Fragen",
          "items": [
            {
              "de": "Was sind Sie von Beruf?",
              "tag": "Sie",
              "tr": [
                "Ким Ви працюєте? / Яка у Вас професія?",
                "ما مهنةُ حضرتك؟",
                "شغل شما چیست؟",
                "Mesleğiniz nedir?",
                "Ce profesie aveți?",
                "Çfarë profesioni keni?",
                "Та ямар мэргэжилтэй вэ?",
                "Quelle est votre profession ?"
              ]
            },
            {
              "de": "Was bist du von Beruf?",
              "tag": "du",
              "tr": [
                "Ким ти працюєш? / Яка в тебе професія?",
                "ما مهنتك؟",
                "شغلت چیست؟",
                "Mesleğin ne?",
                "Ce profesie ai?",
                "Çfarë profesioni ke?",
                "Чи ямар мэргэжилтэй вэ?",
                "Quel est ton métier ?"
              ]
            },
            {
              "de": "Was haben Sie beruflich gemacht?",
              "tag": "Sie",
              "tr": [
                "Ким Ви працювали раніше?",
                "ماذا كان عملُ حضرتك؟",
                "قبلاً چه کاری می‌کردید؟",
                "Daha önce ne iş yaptınız?",
                "Ce ați lucrat înainte?",
                "Çfarë pune keni bërë?",
                "Та өмнө нь ямар ажил хийж байсан бэ?",
                "Qu’est-ce que vous avez fait comme travail ?"
              ]
            },
            {
              "de": "Als was haben Sie gearbeitet?",
              "tag": "Sie",
              "tr": [
                "Ким Ви працювали?",
                "بأيّ وظيفة عملتَ؟",
                "به عنوان چه کاری کار کرده‌اید؟",
                "Ne olarak çalıştınız?",
                "Ca ce ați lucrat?",
                "Si çfarë keni punuar?",
                "Та ямар ажил эрхэлж байсан бэ?",
                "Vous avez travaillé comme quoi ?"
              ]
            }
          ]
        },
        {
          "type": "phrases",
          "title": "Antworten",
          "items": [
            {
              "de": "Ich bin Lehrerin (von Beruf).",
              "tr": [
                "Я вчителька (за професією).",
                "أنا معلّمة.",
                "من معلم هستم.",
                "Öğretmenim.",
                "Sunt profesoară.",
                "Jam mësuese.",
                "Би багш мэргэжилтэй.",
                "Je suis enseignante."
              ]
            },
            {
              "de": "Ich arbeite als Koch.",
              "tr": [
                "Я працюю кухарем.",
                "أعمل طبّاخًا.",
                "من به عنوان آشپز کار می‌کنم.",
                "Aşçı olarak çalışıyorum.",
                "Lucrez ca bucătar.",
                "Punoj si kuzhinier.",
                "Би тогоочоор ажилладаг.",
                "Je travaille comme cuisinier."
              ]
            },
            {
              "de": "Ich habe 10 Jahre als Verkäufer gearbeitet.",
              "tr": [
                "Я 10 років працював продавцем.",
                "عملتُ بائعًا لمدة 10 سنوات.",
                "ده سال به عنوان فروشنده کار کرده‌ام.",
                "10 yıl satıcı olarak çalıştım.",
                "Am lucrat 10 ani ca vânzător.",
                "Kam punuar 10 vjet si shitës.",
                "Би 10 жил худалдагчаар ажилласан.",
                "J’ai travaillé 10 ans comme vendeur."
              ]
            },
            {
              "de": "Ich bin / war Hausfrau.",
              "tr": [
                "Я домогосподарка. / Я була домогосподаркою.",
                "أنا ربّة منزل. / كنتُ ربّة منزل.",
                "من خانه‌دار هستم. / خانه‌دار بودم.",
                "Ev hanımıyım. / Ev hanımıydım.",
                "Sunt casnică. / Am fost casnică.",
                "Jam shtëpiake. / Isha shtëpiake.",
                "Би гэрийн эзэгтэй. / Гэрийн эзэгтэй байсан.",
                "Je suis / J’étais femme au foyer."
              ]
            },
            {
              "de": "Ich habe noch nicht gearbeitet.",
              "tr": [
                "Я ще не працював / не працювала.",
                "لم أعمل بعد.",
                "هنوز کار نکرده‌ام.",
                "Henüz çalışmadım.",
                "Încă nu am lucrat.",
                "Nuk kam punuar ende.",
                "Би одоохондоо ажил хийж байгаагүй.",
                "Je n’ai pas encore travaillé."
              ]
            },
            {
              "de": "Heute arbeite ich nicht. Ich lerne Deutsch.",
              "tr": [
                "Зараз я не працюю. Я вивчаю німецьку.",
                "الآن لا أعمل. أتعلّم الألمانية.",
                "الان کار نمی‌کنم. آلمانی یاد می‌گیرم.",
                "Şu an çalışmıyorum. Almanca öğreniyorum.",
                "Acum nu lucrez. Învăț germana.",
                "Tani nuk punoj. Mësoj gjermanisht.",
                "Одоо би ажил хийхгүй байна. Герман хэл сурч байна.",
                "En ce moment, je ne travaille pas. J’apprends l’allemand."
              ]
            },
            {
              "de": "Ich habe in meiner Heimat keinen Beruf gelernt.",
              "tr": [
                "На батьківщині я не здобув / не здобула професії.",
                "لم أتعلّم مهنة في وطني.",
                "در کشورم حرفه‌ای یاد نگرفته‌ام.",
                "Memleketimde bir meslek öğrenmedim.",
                "În țara mea nu am învățat o meserie.",
                "Në vendin tim nuk kam mësuar ndonjë profesion.",
                "Би эх орондоо мэргэжил эзэмшээгүй.",
                "Dans mon pays, je n’ai pas appris de métier."
              ]
            }
          ]
        },
        {
          "type": "rule",
          "title": "Beruf ohne Artikel – Frauen mit -in",
          "text": "Beim Beruf steht <b>kein Artikel</b>: Ich bin Lehrerin. Ich arbeite als Koch.<br>Frauen: meistens <b>-in</b>: Lehrer → Lehrer<b>in</b>. Oft mit Umlaut: Arzt → <b>Ä</b>rztin, Koch → K<b>ö</b>chin, Bauer → B<b>ä</b>uerin. Und: Kaufmann → Kauf<b>frau</b>.",
          "tr": [
            "Перед професією немає артикля: Ich bin Lehrerin. Для жінок зазвичай закінчення -in: Lehrer → Lehrerin, Arzt → Ärztin. Kaufmann → Kauffrau.",
            "لا نستخدم أداة التعريف مع المهنة: Ich bin Lehrerin. للمؤنث غالبًا نضيف ‎-in: Lehrer ← Lehrerin، Arzt ← Ärztin. ‏Kaufmann ← Kauffrau.",
            "قبل از شغل حرف تعریف نمی‌آید: Ich bin Lehrerin. برای زنان معمولاً ‎-in اضافه می‌شود: Lehrer ← Lehrerin، Arzt ← Ärztin. ‏Kaufmann ← Kauffrau.",
            "Meslekten önce artikel kullanılmaz: Ich bin Lehrerin. Kadınlar için genellikle -in eklenir: Lehrer → Lehrerin, Arzt → Ärztin. Kaufmann → Kauffrau.",
            "Înaintea profesiei nu se pune articol: Ich bin Lehrerin. Pentru femei se adaugă de obicei -in: Lehrer → Lehrerin, Arzt → Ärztin. Kaufmann → Kauffrau.",
            "Para profesionit nuk vihet nyje: Ich bin Lehrerin. Për gratë zakonisht shtohet -in: Lehrer → Lehrerin, Arzt → Ärztin. Kaufmann → Kauffrau.",
            "Мэргэжлийн өмнө артикль хэрэглэхгүй: Ich bin Lehrerin. Эмэгтэйд ихэвчлэн -in нэмнэ: Lehrer → Lehrerin, Arzt → Ärztin. Kaufmann → Kauffrau.",
            "Pas d’article devant le métier : Ich bin Lehrerin (je suis enseignante). Au féminin, on ajoute souvent -in : Lehrer → Lehrerin, Arzt → Ärztin. Kaufmann → Kauffrau."
          ]
        },
        {
          "type": "rule",
          "title": "Früher und heute",
          "text": "Heute: Ich <b>arbeite</b> als Koch.<br>Früher: Ich <b>habe</b> 10 Jahre als Koch <b>gearbeitet</b>.",
          "table": {
            "head": [
              "",
              "Platz 2",
              "Mitte",
              "Ende"
            ],
            "rows": [
              [
                "Ich",
                "arbeite",
                "als Lehrer.",
                ""
              ],
              [
                "Ich",
                "habe",
                "10 Jahre als Lehrer",
                "gearbeitet."
              ],
              [
                "Ich",
                "habe",
                "in meiner Heimat als Verkäufer",
                "gearbeitet."
              ]
            ]
          }
        },
        {
          "type": "words",
          "title": "Berufe",
          "items": [
            {
              "de": "der Lehrer – die Lehrerin",
              "emoji": "👩‍🏫",
              "tr": [
                "вчитель – вчителька",
                "المعلّم – المعلّمة",
                "معلم",
                "öğretmen",
                "profesorul – profesoara",
                "mësuesi – mësuesja",
                "багш",
                "l’enseignant – l’enseignante"
              ]
            },
            {
              "de": "der Arzt – die Ärztin",
              "emoji": "🩺",
              "tr": [
                "лікар – лікарка",
                "الطبيب – الطبيبة",
                "پزشک / دکتر",
                "doktor / hekim",
                "medicul – doctorița",
                "mjeku – mjekja",
                "эмч",
                "le médecin – la médecin"
              ]
            },
            {
              "de": "der Verkäufer – die Verkäuferin",
              "emoji": "🛒",
              "tr": [
                "продавець – продавчиня",
                "البائع – البائعة",
                "فروشنده",
                "satıcı",
                "vânzătorul – vânzătoarea",
                "shitësi – shitësja",
                "худалдагч",
                "le vendeur – la vendeuse"
              ]
            },
            {
              "de": "der Ingenieur – die Ingenieurin",
              "emoji": "👷",
              "tr": [
                "інженер – інженерка",
                "المهندس – المهندسة",
                "مهندس",
                "mühendis",
                "inginerul – inginera",
                "inxhinieri – inxhinierja",
                "инженер",
                "l’ingénieur – l’ingénieure"
              ]
            },
            {
              "de": "der Koch – die Köchin",
              "emoji": "🍳",
              "tr": [
                "кухар – кухарка",
                "الطبّاخ – الطبّاخة",
                "آشپز",
                "aşçı",
                "bucătarul – bucătăreasa",
                "kuzhinieri – kuzhinierja",
                "тогооч",
                "le cuisinier – la cuisinière"
              ]
            },
            {
              "de": "der Bauer – die Bäuerin",
              "emoji": "🚜",
              "tr": [
                "фермер – фермерка",
                "المزارع – المزارعة",
                "کشاورز",
                "çiftçi",
                "fermierul – fermiera",
                "fermeri – fermerja",
                "тариаланч",
                "l’agriculteur – l’agricultrice"
              ]
            },
            {
              "de": "der Friseur – die Friseurin",
              "emoji": "💇",
              "tr": [
                "перукар – перукарка",
                "الحلّاق – مصفّفة الشعر",
                "آرایشگر",
                "kuaför",
                "frizerul – frizerița",
                "parukieri – parukierja",
                "үсчин",
                "le coiffeur – la coiffeuse"
              ]
            },
            {
              "de": "der Masseur – die Masseurin",
              "emoji": "💆",
              "tr": [
                "масажист – масажистка",
                "المدلّك – المدلّكة",
                "ماساژور",
                "masör – masöz",
                "maseurul – maseuza",
                "masazhatori – masazhatorja",
                "иллэгч (массажист)",
                "le masseur – la masseuse"
              ]
            },
            {
              "de": "der Kaufmann – die Kauffrau",
              "emoji": "🧾",
              "tr": [
                "фахівець – фахівчиня з комерції",
                "الموظّف التجاري – الموظّفة التجارية",
                "کارمند بازرگانی",
                "ticaret elemanı",
                "funcționarul comercial – funcționara comercială",
                "nëpunësi tregtar – nëpunësja tregtare",
                "худалдааны ажилтан",
                "l’employé de commerce – l’employée de commerce"
              ]
            },
            {
              "de": "der Apotheker – die Apothekerin",
              "emoji": "💊",
              "tr": [
                "фармацевт – фармацевтка",
                "الصيدلي – الصيدلانية",
                "داروساز",
                "eczacı",
                "farmacistul – farmacista",
                "farmacisti – farmacistja",
                "эм зүйч",
                "le pharmacien – la pharmacienne"
              ]
            },
            {
              "de": "der Teamleiter – die Teamleiterin",
              "emoji": "👥",
              "tr": [
                "керівник – керівниця команди",
                "قائد الفريق – قائدة الفريق",
                "سرپرست گروه",
                "ekip lideri",
                "șeful de echipă – șefa de echipă",
                "drejtuesi i ekipit – drejtuesja e ekipit",
                "багийн ахлагч",
                "le chef d’équipe – la cheffe d’équipe"
              ]
            },
            {
              "de": "die Hausfrau – der Hausmann",
              "emoji": "🏠",
              "tr": [
                "домогосподарка – домогосподар",
                "ربّة المنزل – ربّ المنزل",
                "زن خانه‌دار – مرد خانه‌دار",
                "ev hanımı – ev erkeği",
                "casnica – casnicul",
                "shtëpiakja – shtëpiaku",
                "гэрийн эзэгтэй – гэрийн эзэн",
                "la femme au foyer – l’homme au foyer"
              ]
            },
            {
              "de": "der Beruf – die Berufe",
              "emoji": "💼",
              "tr": [
                "професія – професії",
                "المهنة – المهن",
                "شغل / حرفه – شغل‌ها",
                "meslek – meslekler",
                "profesia – profesiile",
                "profesioni – profesionet",
                "мэргэжил – мэргэжлүүд",
                "le métier – les métiers"
              ]
            }
          ]
        },
        {
          "type": "examples",
          "title": "Sätze aus dem Kurs (korrigiert)",
          "items": [
            "Ich bin Ingenieurin von Beruf und habe 25 Jahre gearbeitet.",
            "Ich habe zwei Berufe: Friseurin und Masseurin. Ich habe 4 Jahre als Masseurin in meiner Heimat gearbeitet.",
            "Ich habe in meiner Heimat als Verkäufer gearbeitet. Heute arbeite ich nicht. Ich lerne Deutsch.",
            "Ich habe 25 Jahre als Bauer in meiner Heimat gearbeitet. Jetzt lerne ich Deutsch.",
            "Ich bin Kauffrau von Beruf. Ich habe 11 Jahre als HR-Managerin in meiner Heimat gearbeitet.",
            "Ich bin Koch von Beruf. Ich habe 30 Jahre als Pizzabäcker gearbeitet.",
            "Ich habe 8 Jahre als Apothekerin und 5 Jahre als Lehrerin in der Schule gearbeitet."
          ]
        },
        {
          "type": "warn",
          "items": [
            {
              "wrong": "Ich bin eine Lehrerin.",
              "right": "Ich bin Lehrerin.",
              "why": "Beim Beruf steht kein Artikel."
            },
            {
              "wrong": "Ich habe in meine Heimat gearbeitet.",
              "right": "Ich habe in meiner Heimat gearbeitet.",
              "why": "Wo? in + Dativ: meine → meiner."
            },
            {
              "wrong": "Ich habe keinen Beruf in meiner Heimat.",
              "right": "Ich habe in meiner Heimat keinen Beruf gelernt.",
              "why": "Einen Beruf lernt man. Die Ortsangabe steht vor „keinen Beruf“."
            },
            {
              "wrong": "Ich habe 10 Jahre als Koch arbeiten.",
              "right": "Ich habe 10 Jahre als Koch gearbeitet.",
              "why": "Früher: haben + gearbeitet (am Satzende)."
            }
          ]
        }
      ]
    },
    {
      "id": "sprachen",
      "icon": "🗣️",
      "title": "Sprachen und „seit“",
      "blocks": [
        {
          "type": "phrases",
          "items": [
            {
              "de": "Welche Sprachen sprechen Sie?",
              "tag": "Sie",
              "tr": [
                "Якими мовами Ви розмовляєте?",
                "ما اللغات التي تتحدّثها؟",
                "به چه زبان‌هایی صحبت می‌کنید؟",
                "Hangi dilleri konuşuyorsunuz?",
                "Ce limbi vorbiți?",
                "Çfarë gjuhësh flisni?",
                "Та ямар хэлээр ярьдаг вэ?",
                "Quelles langues parlez-vous ?"
              ]
            },
            {
              "de": "Was ist Ihre Muttersprache?",
              "tag": "Sie",
              "tr": [
                "Яка Ваша рідна мова?",
                "ما لغتُك الأم؟",
                "زبان مادری شما چیست؟",
                "Ana diliniz nedir?",
                "Care este limba dumneavoastră maternă?",
                "Cila është gjuha juaj amtare?",
                "Таны эх хэл юу вэ?",
                "Quelle est votre langue maternelle ?"
              ]
            },
            {
              "de": "Meine Muttersprache ist Arabisch.",
              "tr": [
                "Моя рідна мова – арабська.",
                "لغتي الأم هي العربية.",
                "زبان مادری من عربی است.",
                "Ana dilim Arapça.",
                "Limba mea maternă este araba.",
                "Gjuha ime amtare është arabishtja.",
                "Миний эх хэл араб хэл.",
                "Ma langue maternelle est l’arabe."
              ]
            },
            {
              "de": "Meine Muttersprachen sind Ukrainisch und Russisch.",
              "tr": [
                "Мої рідні мови – українська і російська.",
                "لغتاي الأم هما الأوكرانية والروسية.",
                "زبان‌های مادری من اوکراینی و روسی است.",
                "Ana dillerim Ukraynaca ve Rusça.",
                "Limbile mele materne sunt ucraineana și rusa.",
                "Gjuhët e mia amtare janë ukrainishtja dhe rusishtja.",
                "Миний эх хэл украин, орос хэл.",
                "Mes langues maternelles sont l’ukrainien et le russe."
              ]
            },
            {
              "de": "Ich spreche auch Türkisch und Englisch und lerne Deutsch.",
              "tr": [
                "Я також розмовляю турецькою та англійською і вивчаю німецьку.",
                "أتحدّث أيضًا التركية والإنجليزية وأتعلّم الألمانية.",
                "من ترکی و انگلیسی هم صحبت می‌کنم و آلمانی یاد می‌گیرم.",
                "Türkçe ve İngilizce de konuşuyorum ve Almanca öğreniyorum.",
                "De asemenea, vorbesc turcă și engleză și învăț germana.",
                "Flas edhe turqisht dhe anglisht dhe mësoj gjermanisht.",
                "Би бас турк, англи хэлээр ярьдаг бөгөөд герман хэл сурч байна.",
                "Je parle aussi turc et anglais, et j’apprends l’allemand."
              ]
            },
            {
              "de": "Ich spreche ein bisschen Deutsch.",
              "tr": [
                "Я трохи розмовляю німецькою.",
                "أتحدّث الألمانية قليلًا.",
                "من کمی آلمانی صحبت می‌کنم.",
                "Biraz Almanca konuşuyorum.",
                "Vorbesc puțin germana.",
                "Flas pak gjermanisht.",
                "Би бага зэрэг герман хэлээр ярьдаг.",
                "Je parle un peu allemand."
              ]
            },
            {
              "de": "Wie lange lernen Sie schon Deutsch?",
              "tag": "Sie",
              "tr": [
                "Як довго Ви вже вивчаєте німецьку?",
                "منذ متى تتعلّم الألمانية؟",
                "چند وقت است که آلمانی یاد می‌گیرید؟",
                "Ne zamandır Almanca öğreniyorsunuz?",
                "De cât timp învățați germana?",
                "Sa kohë keni që mësoni gjermanisht?",
                "Та хэр удаан герман хэл сурч байна вэ?",
                "Depuis combien de temps apprenez-vous l’allemand ?"
              ]
            },
            {
              "de": "Ich lerne seit 2 Monaten / 2 Jahren Deutsch.",
              "tr": [
                "Я вивчаю німецьку вже 2 місяці / 2 роки.",
                "أتعلّم الألمانية منذ شهرين / منذ سنتين.",
                "دو ماه / دو سال است که آلمانی یاد می‌گیرم.",
                "2 aydır / 2 yıldır Almanca öğreniyorum.",
                "Învăț germana de 2 luni / de 2 ani.",
                "Mësoj gjermanisht prej 2 muajsh / 2 vjetësh.",
                "Би 2 сар / 2 жил герман хэл сурч байна.",
                "J’apprends l’allemand depuis 2 mois / 2 ans."
              ]
            }
          ]
        },
        {
          "type": "rule",
          "title": "seit + Dativ",
          "text": "<b>seit</b> + Dativ. Im Plural kommt <b>-n</b> dazu: seit 2 Tage<b>n</b>, seit 2 Monate<b>n</b>, seit 2 Jahre<b>n</b>. (Wochen hat schon ein -n.)<br>Singular: seit <b>einem</b> Tag / Monat / Jahr – seit <b>einer</b> Woche.",
          "tr": [
            "Після «seit» у множині додаємо закінчення «-n»: seit 2 Tagen. В однині: seit einem Tag, seit einer Woche.",
            "بعد «seit» نضيف في الجمع النهاية «‎-n»: seit 2 Tagen. وفي المفرد: seit einem Tag / seit einer Woche.",
            "بعد از «seit» در جمع پسوند «‎-n» را اضافه می‌کنیم: seit 2 Tagen. در مفرد: seit einem Tag / seit einer Woche.",
            "«seit»ten sonra çoğulda «-n» eki gelir: seit 2 Tagen. Tekilde: seit einem Tag / seit einer Woche.",
            "După „seit”, la plural adăugăm terminația „-n”: seit 2 Tagen. La singular: seit einem Tag / seit einer Woche.",
            "Pas «seit», në shumës shtojmë mbaresën «-n»: seit 2 Tagen. Në njëjës: seit einem Tag / seit einer Woche.",
            "«seit»-ийн дараа олон тоонд «-n» төгсгөл нэмнэ: seit 2 Tagen. Ганц тоонд: seit einem Tag / seit einer Woche.",
            "Après « seit », on ajoute « -n » au pluriel : seit 2 Tagen. Au singulier : seit einem Tag / seit einer Woche."
          ],
          "table": {
            "head": [
              "Singular",
              "Plural",
              "seit + Plural",
              "seit + Singular"
            ],
            "rows": [
              [
                "der Tag",
                "2 Tage",
                "seit 2 Tage<b>n</b>",
                "seit <b>einem</b> Tag"
              ],
              [
                "die Woche",
                "2 Wochen",
                "seit 2 Wochen",
                "seit <b>einer</b> Woche"
              ],
              [
                "der Monat",
                "2 Monate",
                "seit 2 Monate<b>n</b>",
                "seit <b>einem</b> Monat"
              ],
              [
                "das Jahr",
                "2 Jahre",
                "seit 2 Jahre<b>n</b>",
                "seit <b>einem</b> Jahr"
              ]
            ]
          }
        },
        {
          "type": "table",
          "title": "Länder und Sprachen (Sprachen schreibt man groß)",
          "head": [
            "Land",
            "Sprache"
          ],
          "rows": [
            [
              "die Ukraine",
              "Ukrainisch"
            ],
            [
              "Syrien, der Irak",
              "Arabisch"
            ],
            [
              "der Iran, Afghanistan",
              "Persisch / Dari"
            ],
            [
              "die Türkei",
              "Türkisch"
            ],
            [
              "Rumänien",
              "Rumänisch"
            ],
            [
              "Albanien",
              "Albanisch"
            ],
            [
              "die Mongolei",
              "Mongolisch"
            ],
            [
              "Frankreich",
              "Französisch"
            ],
            [
              "Deutschland",
              "Deutsch"
            ]
          ]
        },
        {
          "type": "words",
          "items": [
            {
              "de": "die Sprache – die Sprachen",
              "emoji": "💬",
              "tr": [
                "мова – мови",
                "اللغة – اللغات",
                "زبان – زبان‌ها",
                "dil – diller",
                "limba – limbile",
                "gjuha – gjuhët",
                "хэл – хэлнүүд",
                "la langue – les langues"
              ]
            },
            {
              "de": "die Muttersprache",
              "emoji": "❤️",
              "tr": [
                "рідна мова",
                "اللغة الأم",
                "زبان مادری",
                "ana dil",
                "limba maternă",
                "gjuha amtare",
                "эх хэл",
                "la langue maternelle"
              ]
            },
            {
              "de": "ein bisschen",
              "emoji": "🤏",
              "tr": [
                "трохи",
                "قليلًا",
                "کمی",
                "biraz",
                "puțin",
                "pak",
                "бага зэрэг",
                "un peu"
              ]
            }
          ]
        },
        {
          "type": "warn",
          "items": [
            {
              "wrong": "Ich lerne seit 2 Tage / 2 Jahre Deutsch.",
              "right": "Ich lerne seit 2 Tagen / 2 Jahren Deutsch.",
              "why": "seit + Plural: -n am Ende."
            },
            {
              "wrong": "Ich spreche auch Türkisch, Englisch Und lerne Deutsch.",
              "right": "Ich spreche auch Türkisch und Englisch und lerne Deutsch.",
              "why": "Zwischen zwei Sprachen steht „und“. „und“ schreibt man klein."
            }
          ]
        }
      ]
    },
    {
      "id": "familie",
      "icon": "👨‍👩‍👧",
      "title": "Familie",
      "blocks": [
        {
          "type": "phrases",
          "items": [
            {
              "de": "Sind Sie verheiratet?",
              "tag": "Sie",
              "tr": [
                "Ви одружені / заміжні?",
                "هل أنت متزوّج / متزوّجة؟",
                "آیا متأهل هستید؟",
                "Evli misiniz?",
                "Sunteți căsătorit / căsătorită?",
                "A jeni i martuar / e martuar?",
                "Та гэрлэсэн үү?",
                "Êtes-vous marié(e) ?"
              ]
            },
            {
              "de": "Ich bin verheiratet / ledig / geschieden.",
              "tr": [
                "Я одружений (заміжня) / неодружений (незаміжня) / розлучений (розлучена).",
                "أنا متزوّج / أعزب / مطلّق.",
                "من متأهل / مجرد / جداشده هستم.",
                "Evliyim / Bekârım / Boşandım.",
                "Sunt căsătorit(ă) / necăsătorit(ă) / divorțat(ă).",
                "Jam i/e martuar / beqar(e) / i/e divorcuar.",
                "Би гэрлэсэн / ганц бие / салсан.",
                "Je suis marié(e) / célibataire / divorcé(e)."
              ]
            },
            {
              "de": "Haben Sie Kinder?",
              "tag": "Sie",
              "tr": [
                "У Вас є діти?",
                "هل لديك أطفال؟",
                "بچه دارید؟",
                "Çocuğunuz var mı?",
                "Aveți copii?",
                "Keni fëmijë?",
                "Та хүүхэдтэй юу?",
                "Avez-vous des enfants ?"
              ]
            },
            {
              "de": "Ich habe ein Kind. / Ich habe zwei Kinder.",
              "tr": [
                "У мене одна дитина. / У мене двоє дітей.",
                "لديّ طفل واحد. / لديّ طفلان.",
                "یک بچه دارم. / دو بچه دارم.",
                "Bir çocuğum var. / İki çocuğum var.",
                "Am un copil. / Am doi copii.",
                "Kam një fëmijë. / Kam dy fëmijë.",
                "Би нэг хүүхэдтэй. / Би хоёр хүүхэдтэй.",
                "J’ai un enfant. / J’ai deux enfants."
              ]
            },
            {
              "de": "Ich habe keine Kinder.",
              "tr": [
                "У мене немає дітей.",
                "ليس لديّ أطفال.",
                "بچه ندارم.",
                "Çocuğum yok.",
                "Nu am copii.",
                "Nuk kam fëmijë.",
                "Би хүүхэдгүй.",
                "Je n’ai pas d’enfants."
              ]
            },
            {
              "de": "Ich habe einen Sohn und eine Tochter.",
              "tr": [
                "У мене є син і дочка.",
                "لديّ ابن وابنة.",
                "یک پسر و یک دختر دارم.",
                "Bir oğlum ve bir kızım var.",
                "Am un fiu și o fiică.",
                "Kam një djalë dhe një vajzë.",
                "Би нэг хүү, нэг охинтой.",
                "J’ai un fils et une fille."
              ]
            },
            {
              "de": "Ich habe zwei Söhne und zwei Töchter.",
              "tr": [
                "У мене двоє синів і дві дочки.",
                "لديّ ابنان وابنتان.",
                "دو پسر و دو دختر دارم.",
                "İki oğlum ve iki kızım var.",
                "Am doi fii și două fiice.",
                "Kam dy djem dhe dy vajza.",
                "Би хоёр хүү, хоёр охинтой.",
                "J’ai deux fils et deux filles."
              ]
            },
            {
              "de": "Wie alt ist Ihre Tochter?",
              "tag": "Sie",
              "tr": [
                "Скільки років Вашій дочці?",
                "كم عمر ابنتك؟",
                "دخترتان چند سال دارد؟",
                "Kızınız kaç yaşında?",
                "Câți ani are fiica dumneavoastră?",
                "Sa vjeç është vajza juaj?",
                "Таны охин хэдэн настай вэ?",
                "Quel âge a votre fille ?"
              ]
            },
            {
              "de": "Meine Tochter ist 18 Jahre alt.",
              "tr": [
                "Моїй дочці 18 років.",
                "عمر ابنتي 18 سنة.",
                "دخترم ۱۸ سال دارد.",
                "Kızım 18 yaşında.",
                "Fiica mea are 18 ani.",
                "Vajza ime është 18 vjeç.",
                "Миний охин 18 настай.",
                "Ma fille a 18 ans."
              ]
            },
            {
              "de": "Haben Sie Geschwister?",
              "tag": "Sie",
              "tr": [
                "У Вас є брати чи сестри?",
                "هل لديك إخوة أو أخوات؟",
                "آیا خواهر یا برادر دارید؟",
                "Kardeşiniz var mı?",
                "Aveți frați sau surori?",
                "Keni vëllezër ose motra?",
                "Та ах эгч дүүтэй юу?",
                "Avez-vous des frères et sœurs ?"
              ]
            },
            {
              "de": "Ja, ich habe einen Bruder und eine Schwester.",
              "tr": [
                "Так, у мене є брат і сестра.",
                "نعم، لديّ أخ وأخت.",
                "بله، یک برادر و یک خواهر دارم.",
                "Evet, bir erkek kardeşim ve bir kız kardeşim var.",
                "Da, am un frate și o soră.",
                "Po, kam një vëlla dhe një motër.",
                "Тийм, би нэг ах (дүү), нэг эгч (дүү)-тэй.",
                "Oui, j’ai un frère et une sœur."
              ]
            },
            {
              "de": "Nein, ich bin Einzelkind.",
              "tr": [
                "Ні, я єдина дитина в сім’ї.",
                "لا، أنا الابن الوحيد / البنت الوحيدة.",
                "نه، من تک‌فرزند هستم.",
                "Hayır, tek çocuğum.",
                "Nu, sunt copil unic.",
                "Jo, jam fëmijë i vetëm.",
                "Үгүй, би ганц хүүхэд.",
                "Non, je suis enfant unique."
              ]
            },
            {
              "de": "Ich habe drei Enkel (Enkelkinder).",
              "tr": [
                "У мене троє онуків.",
                "لديّ ثلاثة أحفاد.",
                "سه نوه دارم.",
                "Üç torunum var.",
                "Am trei nepoți.",
                "Kam tre nipër e mbesa.",
                "Би гурван ач зээтэй.",
                "J’ai trois petits-enfants."
              ]
            }
          ]
        },
        {
          "type": "words",
          "items": [
            {
              "de": "die Familie",
              "emoji": "👨‍👩‍👧",
              "tr": [
                "сім’я",
                "العائلة",
                "خانواده",
                "aile",
                "familia",
                "familja",
                "гэр бүл",
                "la famille"
              ]
            },
            {
              "de": "der Mann / die Frau",
              "emoji": "💑",
              "tr": [
                "чоловік / дружина",
                "الزوج / الزوجة",
                "شوهر / همسر (زن)",
                "koca / eş (karı)",
                "soțul / soția",
                "burri / gruaja",
                "нөхөр / эхнэр",
                "le mari / la femme"
              ]
            },
            {
              "de": "das Kind – die Kinder",
              "emoji": "🧒",
              "tr": [
                "дитина – діти",
                "الطفل – الأطفال",
                "بچه – بچه‌ها",
                "çocuk – çocuklar",
                "copilul – copiii",
                "fëmija – fëmijët",
                "хүүхэд – хүүхдүүд",
                "l’enfant – les enfants"
              ]
            },
            {
              "de": "der Sohn – die Söhne",
              "emoji": "👦",
              "tr": [
                "син – сини",
                "الابن – الأبناء",
                "پسر – پسرها",
                "oğul – oğullar",
                "fiul – fiii",
                "djali – djemtë",
                "хүү – хөвгүүд",
                "le fils – les fils"
              ]
            },
            {
              "de": "die Tochter – die Töchter",
              "emoji": "👧",
              "tr": [
                "дочка – дочки",
                "الابنة – البنات",
                "دختر – دخترها",
                "kız – kızlar",
                "fiica – fiicele",
                "vajza – vajzat",
                "охин – охид",
                "la fille – les filles"
              ]
            },
            {
              "de": "der Bruder – die Brüder",
              "emoji": "🧑",
              "tr": [
                "брат – брати",
                "الأخ – الإخوة",
                "برادر – برادرها",
                "erkek kardeş – erkek kardeşler",
                "fratele – frații",
                "vëllai – vëllezërit",
                "ах / эрэгтэй дүү",
                "le frère – les frères"
              ]
            },
            {
              "de": "die Schwester – die Schwestern",
              "emoji": "👩",
              "tr": [
                "сестра – сестри",
                "الأخت – الأخوات",
                "خواهر – خواهرها",
                "kız kardeş – kız kardeşler",
                "sora – surorile",
                "motra – motrat",
                "эгч / эмэгтэй дүү",
                "la sœur – les sœurs"
              ]
            },
            {
              "de": "die Geschwister (nur Plural)",
              "tr": [
                "брати і сестри",
                "الإخوة والأخوات",
                "خواهر و برادر",
                "kardeşler",
                "frații și surorile",
                "vëllezërit dhe motrat",
                "ах эгч дүү",
                "les frères et sœurs"
              ]
            },
            {
              "de": "das Einzelkind",
              "emoji": "☝️",
              "tr": [
                "єдина дитина",
                "الطفل الوحيد",
                "تک‌فرزند",
                "tek çocuk",
                "copilul unic",
                "fëmija i vetëm",
                "ганц хүүхэд",
                "l’enfant unique"
              ]
            },
            {
              "de": "der Enkel – die Enkel / das Enkelkind – die Enkelkinder",
              "emoji": "👶",
              "tr": [
                "онук – онуки",
                "الحفيد – الأحفاد",
                "نوه – نوه‌ها",
                "torun – torunlar",
                "nepotul – nepoții",
                "nipi / mbesa – nipërit dhe mbesat",
                "ач, зээ",
                "le petit-fils – les petits-enfants"
              ]
            },
            {
              "de": "alt – Wie alt …? – … Jahre alt",
              "emoji": "🎂",
              "tr": [
                "старий – Скільки років …? – … років",
                "عمر – كم عمر …؟ – … سنة",
                "سن – چند سال دارد؟ – … ساله",
                "yaşında – Kaç yaşında? – … yaşında",
                "vârstă – Câți ani are? – … ani",
                "vjeç – Sa vjeç? – … vjeç",
                "нас – Хэдэн настай вэ? – … настай",
                "âge – Quel âge …? – … ans"
              ]
            }
          ]
        },
        {
          "type": "rule",
          "title": "Ich habe einen Sohn – haben + Akkusativ",
          "text": "Nach <b>haben</b> kommt der Akkusativ. Nur bei <b>der</b> ändert sich etwas: der Sohn → Ich habe <b>einen</b> Sohn.<br>die Tochter → <b>eine</b> Tochter. das Kind → <b>ein</b> Kind. Plural: zwei Kinder / <b>keine</b> Kinder.",
          "tr": [
            "Після «haben» – знахідний відмінок (Akkusativ). Змінюється тільки der: der Sohn → Ich habe einen Sohn. die Tochter → eine Tochter, das Kind → ein Kind.",
            "بعد «haben» تأتي حالة المفعول به (Akkusativ). يتغيّر فقط der: der Sohn ← Ich habe einen Sohn. ‏die Tochter ← eine Tochter، das Kind ← ein Kind.",
            "بعد از «haben» حالت مفعولی (Akkusativ) می‌آید. فقط der تغییر می‌کند: der Sohn ← Ich habe einen Sohn. ‏die Tochter ← eine Tochter، das Kind ← ein Kind.",
            "«haben»dan sonra Akkusativ (-i hâli) gelir. Sadece der değişir: der Sohn → Ich habe einen Sohn. die Tochter → eine Tochter, das Kind → ein Kind.",
            "După „haben” urmează acuzativul. Se schimbă doar der: der Sohn → Ich habe einen Sohn. die Tochter → eine Tochter, das Kind → ein Kind.",
            "Pas «haben» vjen rasa kallëzore (Akkusativ). Ndryshon vetëm der: der Sohn → Ich habe einen Sohn. die Tochter → eine Tochter, das Kind → ein Kind.",
            "«haben»-ийн дараа заах тийн ялгал (Akkusativ) орно. Зөвхөн der өөрчлөгдөнө: der Sohn → Ich habe einen Sohn. die Tochter → eine Tochter, das Kind → ein Kind.",
            "Après « haben », on utilise l’accusatif. Seul der change : der Sohn → Ich habe einen Sohn. die Tochter → eine Tochter, das Kind → ein Kind."
          ],
          "table": {
            "head": [
              "",
              "der",
              "die",
              "das",
              "Plural"
            ],
            "rows": [
              [
                "Das ist …",
                "ein Sohn",
                "eine Tochter",
                "ein Kind",
                "– Kinder"
              ],
              [
                "Ich habe …",
                "<b>einen</b> Sohn",
                "eine Tochter",
                "ein Kind",
                "zwei Kinder / <b>keine</b> Kinder"
              ]
            ]
          }
        },
        {
          "type": "examples",
          "items": [
            "Ich habe zwei Kinder. Mein Sohn ist 5 Jahre alt. Meine Tochter ist 6 Jahre alt."
          ]
        },
        {
          "type": "warn",
          "items": [
            {
              "wrong": "Ich habe 3 Enkeln.",
              "right": "Ich habe 3 Enkel / 3 Enkelkinder.",
              "why": "Plural: der Enkel – die Enkel (ohne -n). Mit -n nur im Dativ: mit meinen Enkeln."
            },
            {
              "wrong": "Nein, Ich bin Einzelkind.",
              "right": "Nein, ich bin Einzelkind.",
              "why": "„ich“ schreibt man klein – nur am Satzanfang groß."
            },
            {
              "wrong": "Ich habe ein Sohn.",
              "right": "Ich habe einen Sohn.",
              "why": "der Sohn → haben + einen."
            }
          ]
        }
      ]
    },
    {
      "id": "hobbys",
      "icon": "⚽",
      "title": "Hobbys und Freizeit",
      "blocks": [
        {
          "type": "phrases",
          "items": [
            {
              "de": "Was machen Sie gern in Ihrer Freizeit?",
              "tag": "Sie",
              "tr": [
                "Що Ви любите робити у вільний час?",
                "ماذا تحبّ أن تفعل في وقت فراغك؟",
                "در وقت آزاد چه کاری را دوست دارید؟",
                "Boş zamanınızda ne yapmayı seversiniz?",
                "Ce vă place să faceți în timpul liber?",
                "Çfarë ju pëlqen të bëni në kohën e lirë?",
                "Та чөлөөт цагаараа юу хийх дуртай вэ?",
                "Qu’est-ce que vous aimez faire pendant votre temps libre ?"
              ]
            },
            {
              "de": "Was machst du gern am Wochenende?",
              "tag": "du",
              "tr": [
                "Що ти любиш робити на вихідних?",
                "ماذا تحبّ أن تفعل في عطلة نهاية الأسبوع؟",
                "آخر هفته دوست داری چه کار کنی؟",
                "Hafta sonu ne yapmayı seversin?",
                "Ce îți place să faci în weekend?",
                "Çfarë të pëlqen të bësh në fundjavë?",
                "Чи амралтын өдрөөр юу хийх дуртай вэ?",
                "Qu’est-ce que tu aimes faire le week-end ?"
              ]
            },
            {
              "de": "Welche Hobbys haben Sie?",
              "tag": "Sie",
              "tr": [
                "Які у Вас хобі?",
                "ما هي هواياتك؟",
                "سرگرمی‌های شما چیست؟",
                "Hobileriniz neler?",
                "Ce hobby-uri aveți?",
                "Çfarë hobish keni?",
                "Та ямар хоббитой вэ?",
                "Quels sont vos loisirs ?"
              ]
            },
            {
              "de": "Was magst du? / Was mögen Sie?",
              "tr": [
                "Що ти любиш? / Що Ви любите?",
                "ماذا تحبّ؟",
                "چه چیزی را دوست داری؟ / دوست دارید؟",
                "Neyi seversin? / Neyi seversiniz?",
                "Ce îți place? / Ce vă place?",
                "Çfarë të pëlqen? / Çfarë ju pëlqen?",
                "Чи юунд дуртай вэ? / Та юунд дуртай вэ?",
                "Qu’est-ce que tu aimes ? / Qu’est-ce que vous aimez ?"
              ]
            },
            {
              "de": "Ich mache gern Sport.",
              "tr": [
                "Я люблю займатися спортом.",
                "أحبّ ممارسة الرياضة.",
                "ورزش کردن را دوست دارم.",
                "Spor yapmayı severim.",
                "Îmi place să fac sport.",
                "Më pëlqen të bëj sport.",
                "Би спортоор хичээллэх дуртай.",
                "J’aime faire du sport."
              ]
            },
            {
              "de": "Ich gehe gern schwimmen / tanzen / wandern.",
              "tr": [
                "Я люблю плавати / танцювати / ходити в походи.",
                "أحبّ السباحة / الرقص / المشي في الطبيعة.",
                "شنا / رقص / پیاده‌روی در طبیعت را دوست دارم.",
                "Yüzmeye / dansa / doğa yürüyüşüne gitmeyi severim.",
                "Îmi place să merg la înot / la dans / în drumeții.",
                "Më pëlqen të shkoj për not / për vallëzim / për ecje në natyrë.",
                "Би усанд сэлэх / бүжиглэх / явган аялах дуртай.",
                "J’aime aller nager / danser / faire de la randonnée."
              ]
            },
            {
              "de": "Ich singe gern.",
              "tr": [
                "Я люблю співати.",
                "أحبّ الغناء.",
                "آواز خواندن را دوست دارم.",
                "Şarkı söylemeyi severim.",
                "Îmi place să cânt.",
                "Më pëlqen të këndoj.",
                "Би дуулах дуртай.",
                "J’aime chanter."
              ]
            },
            {
              "de": "Ich mag Musik.",
              "tr": [
                "Я люблю музику.",
                "أحبّ الموسيقى.",
                "موسیقی را دوست دارم.",
                "Müziği severim.",
                "Îmi place muzica.",
                "Më pëlqen muzika.",
                "Би хөгжимд дуртай.",
                "J’aime la musique."
              ]
            },
            {
              "de": "Mein Hobby ist Lesen.",
              "tr": [
                "Моє хобі – читання.",
                "هوايتي القراءة.",
                "سرگرمی من کتاب‌خوانی است.",
                "Hobim okumak.",
                "Hobby-ul meu este cititul.",
                "Hobi im është leximi.",
                "Миний хобби бол ном унших.",
                "Mon loisir, c’est la lecture."
              ]
            },
            {
              "de": "Meine Hobbys sind Kochen, Singen und Deutsch lernen.",
              "tr": [
                "Мої хобі – готування, спів і вивчення німецької.",
                "هواياتي الطبخ والغناء وتعلّم الألمانية.",
                "سرگرمی‌های من آشپزی، آواز خواندن و یادگیری آلمانی است.",
                "Hobilerim yemek yapmak, şarkı söylemek ve Almanca öğrenmek.",
                "Hobby-urile mele sunt gătitul, cântatul și învățarea limbii germane.",
                "Hobet e mia janë gatimi, këndimi dhe mësimi i gjermanishtes.",
                "Миний хобби хоол хийх, дуулах, герман хэл сурах.",
                "Mes loisirs sont la cuisine, le chant et l’apprentissage de l’allemand."
              ]
            },
            {
              "de": "Ich bleibe mit meinen Kindern zu Hause.",
              "tr": [
                "Я залишаюся вдома зі своїми дітьми.",
                "أبقى في البيت مع أطفالي.",
                "با بچه‌هایم در خانه می‌مانم.",
                "Çocuklarımla evde kalırım.",
                "Rămân acasă cu copiii mei.",
                "Rri në shtëpi me fëmijët e mi.",
                "Би хүүхдүүдтэйгээ гэртээ байдаг.",
                "Je reste à la maison avec mes enfants."
              ]
            },
            {
              "de": "Ich spiele mit meinen Kindern.",
              "tr": [
                "Я граюся зі своїми дітьми.",
                "ألعب مع أطفالي.",
                "با بچه‌هایم بازی می‌کنم.",
                "Çocuklarımla oynarım.",
                "Mă joc cu copiii mei.",
                "Luaj me fëmijët e mi.",
                "Би хүүхдүүдтэйгээ тоглодог.",
                "Je joue avec mes enfants."
              ]
            }
          ]
        },
        {
          "type": "rule",
          "title": "gern + Verb – mögen + Nomen",
          "text": "<b>gern + Verb</b>: Ich lese <b>gern</b>. Ich koche <b>gern</b>. Ich gehe <b>gern</b> schwimmen.<br><b>mögen + Nomen</b>: Ich <b>mag</b> Musik. Ich <b>mag</b> Kuchen.<br>mögen ≈ gern haben. (lieben ist stärker: Ich liebe meine Familie.)<br>Auch richtig: Ich mag Bücher lesen. Einfacher: Ich lese gern Bücher.<br><b>gern = gerne</b> (beides ist richtig).",
          "tr": [
            "gern + дієслово: Ich lese gern (я люблю читати). mögen + іменник: Ich mag Musik (я люблю музику). mögen ≈ «подобатися»; lieben – сильніше («кохати, дуже любити»).",
            "gern + فعل: Ich lese gern (أحبّ القراءة). mögen + اسم: Ich mag Musik (أحبّ الموسيقى). ‏mögen تعني «يُعجبه»، أما lieben فأقوى.",
            "gern + فعل: Ich lese gern (خواندن را دوست دارم). mögen + اسم: Ich mag Musik (موسیقی را دوست دارم). ‏mögen یعنی «خوش آمدن از»؛ lieben قوی‌تر است.",
            "gern + fiil: Ich lese gern (okumayı severim). mögen + isim: Ich mag Musik (müziği severim). mögen ≈ «hoşlanmak»; lieben daha güçlüdür.",
            "gern + verb: Ich lese gern (îmi place să citesc). mögen + substantiv: Ich mag Musik (îmi place muzica). mögen ≈ „a plăcea”; lieben este mai puternic.",
            "gern + folje: Ich lese gern (më pëlqen të lexoj). mögen + emër: Ich mag Musik (më pëlqen muzika). mögen ≈ «më pëlqen»; lieben është më i fortë.",
            "gern + үйл үг: Ich lese gern (би унших дуртай). mögen + нэр үг: Ich mag Musik (би хөгжимд дуртай). mögen ≈ «дуртай байх»; lieben илүү хүчтэй.",
            "gern + verbe : Ich lese gern (j’aime lire). mögen + nom : Ich mag Musik (j’aime la musique). mögen ≈ « aimer bien » ; lieben est plus fort."
          ]
        },
        {
          "type": "rule",
          "title": "kochen oder backen?",
          "text": "<b>kochen</b> = im Topf 🍲 (Suppe, Kartoffeln, Reis). <b>backen</b> = im Ofen 🧁 (Kuchen, Torte, Kekse, Brot).",
          "table": {
            "head": [
              "kochen 🍲",
              "backen 🧁"
            ],
            "rows": [
              [
                "die Suppe",
                "der Kuchen"
              ],
              [
                "die Kartoffeln",
                "die Torte"
              ],
              [
                "der Reis",
                "die Kekse"
              ],
              [
                "das Essen",
                "das Brot"
              ]
            ]
          }
        },
        {
          "type": "rule",
          "title": "zu Hause oder nach Hause?",
          "text": "<b>Wo?</b> → <b>zu Hause</b> (ich bin, bleibe, lerne, schlafe … zu Hause).<br><b>Wohin?</b> → <b>nach Hause</b> (ich gehe, fahre, muss … nach Hause).",
          "tr": [
            "«zu Hause» = вдома (де?). «nach Hause» = додому (куди?).",
            "«zu Hause» = في البيت (أين؟). «nach Hause» = إلى البيت (إلى أين؟).",
            "«zu Hause» = در خانه (کجا؟). «nach Hause» = به خانه (به کجا؟).",
            "«zu Hause» = evde (nerede?). «nach Hause» = eve (nereye?).",
            "„zu Hause” = acasă (unde?). „nach Hause” = spre casă (încotro?).",
            "«zu Hause» = në shtëpi (ku?). «nach Hause» = për në shtëpi (për ku?).",
            "«zu Hause» = гэртээ (хаана?). «nach Hause» = гэр лүүгээ (хаашаа?).",
            "« zu Hause » = à la maison (où ?). « nach Hause » = (aller) à la maison (où vas-tu ?)."
          ],
          "table": {
            "head": [
              "Wo? → zu Hause 🏠",
              "Wohin? → nach Hause 🏃‍♀️🏠"
            ],
            "rows": [
              [
                "Ich bin zu Hause.",
                "Ich gehe nach Hause."
              ],
              [
                "Ich bleibe zu Hause.",
                "Ich fahre nach Hause."
              ],
              [
                "Ich lerne zu Hause.",
                "Ich muss nach Hause."
              ]
            ]
          }
        },
        {
          "type": "words",
          "items": [
            {
              "de": "die Freizeit",
              "emoji": "🌴",
              "tr": [
                "вільний час",
                "وقت الفراغ",
                "وقت آزاد",
                "boş zaman",
                "timpul liber",
                "koha e lirë",
                "чөлөөт цаг",
                "le temps libre"
              ]
            },
            {
              "de": "das Wochenende",
              "emoji": "📆",
              "tr": [
                "вихідні",
                "عطلة نهاية الأسبوع",
                "آخر هفته",
                "hafta sonu",
                "weekendul",
                "fundjava",
                "амралтын өдөр",
                "le week-end"
              ]
            },
            {
              "de": "das Hobby – die Hobbys",
              "emoji": "🎨",
              "tr": [
                "хобі",
                "الهواية – الهوايات",
                "سرگرمی – سرگرمی‌ها",
                "hobi – hobiler",
                "hobby-ul – hobby-urile",
                "hobi – hobet",
                "хобби",
                "le loisir – les loisirs"
              ]
            },
            {
              "de": "schwimmen",
              "emoji": "🏊",
              "tr": [
                "плавати",
                "يسبح",
                "شنا کردن",
                "yüzmek",
                "a înota",
                "notoj",
                "усанд сэлэх",
                "nager"
              ]
            },
            {
              "de": "tanzen",
              "emoji": "💃",
              "tr": [
                "танцювати",
                "يرقص",
                "رقصیدن",
                "dans etmek",
                "a dansa",
                "vallëzoj",
                "бүжиглэх",
                "danser"
              ]
            },
            {
              "de": "singen",
              "emoji": "🎤",
              "tr": [
                "співати",
                "يغنّي",
                "آواز خواندن",
                "şarkı söylemek",
                "a cânta",
                "këndoj",
                "дуулах",
                "chanter"
              ]
            },
            {
              "de": "kochen",
              "emoji": "🍲",
              "tr": [
                "готувати (їжу), варити",
                "يطبخ",
                "آشپزی کردن",
                "yemek pişirmek",
                "a găti",
                "gatuaj",
                "хоол хийх",
                "cuisiner"
              ]
            },
            {
              "de": "backen",
              "emoji": "🧁",
              "tr": [
                "пекти",
                "يخبز",
                "پختن (در فر)",
                "fırında pişirmek",
                "a coace",
                "pjek",
                "жигнэх",
                "faire cuire au four"
              ]
            },
            {
              "de": "wandern",
              "emoji": "🥾",
              "tr": [
                "ходити в походи",
                "يتنزّه سيرًا في الطبيعة",
                "پیاده‌روی در طبیعت",
                "doğa yürüyüşü yapmak",
                "a face drumeții",
                "bëj ecje në natyrë",
                "явган аялах",
                "faire de la randonnée"
              ]
            },
            {
              "de": "joggen",
              "emoji": "🏃",
              "tr": [
                "бігати (підтюпцем)",
                "يهرول",
                "آهسته دویدن",
                "koşu yapmak",
                "a alerga (jogging)",
                "vrapoj",
                "гүйх",
                "faire du jogging"
              ]
            },
            {
              "de": "Musik hören",
              "emoji": "🎧",
              "tr": [
                "слухати музику",
                "يستمع إلى الموسيقى",
                "موسیقی گوش دادن",
                "müzik dinlemek",
                "a asculta muzică",
                "dëgjoj muzikë",
                "хөгжим сонсох",
                "écouter de la musique"
              ]
            },
            {
              "de": "Sport machen",
              "emoji": "⚽",
              "tr": [
                "займатися спортом",
                "يمارس الرياضة",
                "ورزش کردن",
                "spor yapmak",
                "a face sport",
                "bëj sport",
                "спортоор хичээллэх",
                "faire du sport"
              ]
            },
            {
              "de": "spielen",
              "emoji": "🎲",
              "tr": [
                "грати(ся)",
                "يلعب",
                "بازی کردن",
                "oynamak",
                "a se juca",
                "luaj",
                "тоглох",
                "jouer"
              ]
            }
          ]
        },
        {
          "type": "warn",
          "items": [
            {
              "wrong": "Was magst du am Wochenende?",
              "right": "Was machst du gern am Wochenende?",
              "why": "Für eine Aktivität: gern + Verb. mögen steht meistens mit einem Nomen: Ich mag Musik."
            },
            {
              "wrong": "mögen = lieben",
              "right": "mögen ≈ gern haben",
              "why": "lieben ist stärker: Ich liebe meine Familie. Ich mag Kuchen."
            },
            {
              "wrong": "Ich bleibe zu Hause mit meinen Kindern.",
              "right": "Ich bleibe mit meinen Kindern zu Hause.",
              "why": "„zu Hause“ steht meistens am Satzende."
            },
            {
              "wrong": "Ich gehe zu Hause.",
              "right": "Ich gehe nach Hause.",
              "why": "Wohin? → nach Hause. Wo? → zu Hause."
            }
          ]
        }
      ]
    },
    {
      "id": "grammatik",
      "icon": "🧩",
      "title": "Grammatik: Verb auf Platz 2 und Endungen",
      "blocks": [
        {
          "type": "rule",
          "title": "Das Verb steht auf Platz 2",
          "text": "Im Satz und in der W-Frage steht das Verb immer auf <b>Platz 2</b>.<br>Steht etwas anderes auf Platz 1 (<b>Heute</b>, <b>In Deutschland</b>), kommt <b>ich</b> nach dem Verb.",
          "tr": [
            "Дієслово завжди стоїть на 2-му місці – і в реченні, і в питанні з питальним словом. Якщо на 1-му місці інше слово (Heute), то «ich» стоїть після дієслова.",
            "الفعل يأتي دائمًا في المكان الثاني، في الجملة وفي السؤال بأداة استفهام. إذا بدأت الجملة بكلمة أخرى (Heute) يأتي «ich» بعد الفعل.",
            "فعل همیشه در جایگاه دوم است، در جمله و در سؤال با کلمهٔ پرسشی. اگر کلمهٔ دیگری در جایگاه اول باشد (Heute)، «ich» بعد از فعل می‌آید.",
            "Fiil her zaman 2. sıradadır – cümlede ve soru kelimesiyle başlayan soruda. 1. sırada başka bir kelime varsa (Heute), «ich» fiilden sonra gelir.",
            "Verbul stă mereu pe locul 2 – în propoziție și în întrebarea cu cuvânt interogativ. Dacă pe locul 1 este alt cuvânt (Heute), „ich” vine după verb.",
            "Folja qëndron gjithmonë në vendin e 2-të – në fjali dhe në pyetjen me fjalë pyetëse. Nëse në vendin e 1-rë është një fjalë tjetër (Heute), «ich» vjen pas foljes.",
            "Үйл үг үргэлж 2-р байранд байна – өгүүлбэрт ч, асуух үгтэй асуултад ч. 1-р байранд өөр үг (Heute) байвал «ich» үйл үгийн дараа орно.",
            "Le verbe est toujours en position 2 – dans la phrase et dans la question avec un mot interrogatif. Si un autre mot est en position 1 (Heute), « ich » vient après le verbe."
          ],
          "table": {
            "head": [
              "Platz 1",
              "Platz 2 (Verb)",
              "Rest"
            ],
            "rows": [
              [
                "Ich",
                "<b>heiße</b>",
                "Ali."
              ],
              [
                "Ich",
                "<b>komme</b>",
                "aus Syrien."
              ],
              [
                "Ich",
                "<b>wohne</b>",
                "in Köln."
              ],
              [
                "Heute",
                "<b>lerne</b>",
                "ich Deutsch."
              ],
              [
                "In Deutschland",
                "<b>arbeite</b>",
                "ich als Koch."
              ],
              [
                "Woher",
                "<b>kommen</b>",
                "Sie?"
              ],
              [
                "Wie",
                "<b>heißt</b>",
                "du?"
              ],
              [
                "Was",
                "<b>machst</b>",
                "du gern?"
              ]
            ]
          }
        },
        {
          "type": "rule",
          "title": "Endungen: ich -e, du -st, Sie -en",
          "text": "ich → <b>-e</b>: ich heiß<b>e</b>, ich komm<b>e</b>.<br>du → <b>-st</b>: du komm<b>st</b>, du wohn<b>st</b>.<br>Sie → <b>-en</b>: Sie komm<b>en</b>, Sie wohn<b>en</b>.<br>Achtung: du hei<b>ßt</b> – nur <b>-t</b>, weil ß schon wie s klingt.",
          "tr": [
            "ich → -e, du → -st, Sie → -en. Увага: du heißt – тільки -t, бо ß уже звучить як s.",
            "ich ← ‎-e، du ← ‎-st، Sie ← ‎-en. انتبه: du heißt – فقط ‎-t، لأن ß تُلفظ مثل s.",
            "ich ← ‎-e، du ← ‎-st، Sie ← ‎-en. توجه: du heißt – فقط ‎-t، چون ß خودش مثل s تلفظ می‌شود.",
            "ich → -e, du → -st, Sie → -en. Dikkat: du heißt – sadece -t, çünkü ß zaten s gibi okunur.",
            "ich → -e, du → -st, Sie → -en. Atenție: du heißt – doar -t, pentru că ß sună deja ca s.",
            "ich → -e, du → -st, Sie → -en. Kujdes: du heißt – vetëm -t, sepse ß tingëllon tashmë si s.",
            "ich → -e, du → -st, Sie → -en. Анхаар: du heißt – зөвхөн -t, учир нь ß аль хэдийн s шиг дуудагддаг.",
            "ich → -e, du → -st, Sie → -en. Attention : du heißt – seulement -t, car ß se prononce déjà comme s."
          ],
          "table": {
            "head": [
              "",
              "heißen",
              "kommen",
              "wohnen",
              "lernen",
              "machen"
            ],
            "rows": [
              [
                "ich",
                "heiß<b>e</b>",
                "komm<b>e</b>",
                "wohn<b>e</b>",
                "lern<b>e</b>",
                "mach<b>e</b>"
              ],
              [
                "du",
                "hei<b>ßt</b>",
                "komm<b>st</b>",
                "wohn<b>st</b>",
                "lern<b>st</b>",
                "mach<b>st</b>"
              ],
              [
                "Sie",
                "heiß<b>en</b>",
                "komm<b>en</b>",
                "wohn<b>en</b>",
                "lern<b>en</b>",
                "mach<b>en</b>"
              ]
            ]
          }
        },
        {
          "type": "table",
          "title": "Wichtige Verben: sein, haben, mögen, sprechen",
          "head": [
            "",
            "sein",
            "haben",
            "mögen",
            "sprechen"
          ],
          "rows": [
            [
              "ich",
              "bin",
              "habe",
              "mag",
              "spreche"
            ],
            [
              "du",
              "bist",
              "hast",
              "magst",
              "spr<b>i</b>chst"
            ],
            [
              "er / sie / es",
              "ist",
              "hat",
              "mag",
              "spr<b>i</b>cht"
            ],
            [
              "wir",
              "sind",
              "haben",
              "mögen",
              "sprechen"
            ],
            [
              "ihr",
              "seid",
              "habt",
              "mögt",
              "sprecht"
            ],
            [
              "sie / Sie",
              "sind",
              "haben",
              "mögen",
              "sprechen"
            ]
          ]
        },
        {
          "type": "words",
          "title": "W-Fragen und kleine Wörter",
          "items": [
            {
              "de": "Wie?",
              "tr": [
                "Як?",
                "كيف؟",
                "چطور؟",
                "Nasıl?",
                "Cum?",
                "Si?",
                "Яаж? / Ямар?",
                "Comment ?"
              ]
            },
            {
              "de": "Was?",
              "tr": [
                "Що?",
                "ماذا؟ / ما؟",
                "چه؟ / چی؟",
                "Ne?",
                "Ce?",
                "Çfarë?",
                "Юу?",
                "Quoi ? / Qu’est-ce que ?"
              ]
            },
            {
              "de": "Woher?",
              "tr": [
                "Звідки?",
                "من أين؟",
                "از کجا؟",
                "Nereden?",
                "De unde?",
                "Nga?",
                "Хаанаас?",
                "D’où ?"
              ]
            },
            {
              "de": "Wo?",
              "tr": [
                "Де?",
                "أين؟",
                "کجا؟",
                "Nerede?",
                "Unde?",
                "Ku?",
                "Хаана?",
                "Où ?"
              ]
            },
            {
              "de": "Wer?",
              "tr": [
                "Хто?",
                "مَن؟",
                "چه کسی؟",
                "Kim?",
                "Cine?",
                "Kush?",
                "Хэн?",
                "Qui ?"
              ]
            },
            {
              "de": "ich",
              "tr": [
                "я",
                "أنا",
                "من",
                "ben",
                "eu",
                "unë",
                "би",
                "je"
              ]
            },
            {
              "de": "du",
              "tr": [
                "ти",
                "أنتَ / أنتِ",
                "تو",
                "sen",
                "tu",
                "ti",
                "чи",
                "tu"
              ]
            },
            {
              "de": "er / sie",
              "tr": [
                "він / вона",
                "هو / هي",
                "او",
                "o",
                "el / ea",
                "ai / ajo",
                "тэр",
                "il / elle"
              ]
            },
            {
              "de": "Sie (höflich)",
              "tr": [
                "Ви",
                "حضرتك",
                "شما",
                "Siz",
                "dumneavoastră",
                "Ju",
                "Та",
                "vous"
              ]
            },
            {
              "de": "aus (aus Köln)",
              "tr": [
                "з / із",
                "من",
                "از",
                "-den / -dan (Köln’den)",
                "din",
                "nga",
                "-аас / -ээс",
                "de"
              ]
            },
            {
              "de": "in (in Köln)",
              "tr": [
                "в / у",
                "في",
                "در",
                "-de / -da (Köln’de)",
                "în",
                "në",
                "-д / -т",
                "à / en"
              ]
            },
            {
              "de": "und",
              "tr": [
                "і / та",
                "و",
                "و",
                "ve",
                "și",
                "dhe",
                "ба / болон",
                "et"
              ]
            },
            {
              "de": "oder",
              "tr": [
                "або",
                "أو",
                "یا",
                "veya / ya da",
                "sau",
                "ose",
                "эсвэл",
                "ou"
              ]
            }
          ]
        },
        {
          "type": "warn",
          "items": [
            {
              "wrong": "Ich bin heiße Mira.",
              "right": "Ich heiße Mira. / Ich bin Mira.",
              "why": "Nur ein Verb auf Platz 2."
            },
            {
              "wrong": "Heute ich lerne Deutsch.",
              "right": "Heute lerne ich Deutsch.",
              "why": "Das Verb steht auf Platz 2. ich kommt danach."
            },
            {
              "wrong": "Du sprechst Arabisch.",
              "right": "Du sprichst Arabisch.",
              "why": "sprechen: bei du und er/sie wird e zu i."
            },
            {
              "wrong": "Du heißst Ali.",
              "right": "Du heißt Ali.",
              "why": "ß klingt schon wie s – darum nur -t."
            }
          ]
        }
      ]
    },
    {
      "id": "kurswoerter",
      "icon": "📝",
      "title": "Wörter im Kurs",
      "blocks": [
        {
          "type": "words",
          "title": "Zahlen 0 bis 10",
          "items": [
            {
              "de": "0 – null",
              "tr": [
                "нуль",
                "صفر",
                "صفر",
                "sıfır",
                "zero",
                "zero",
                "тэг",
                "zéro"
              ]
            },
            {
              "de": "1 – eins",
              "tr": [
                "один",
                "واحد",
                "یک",
                "bir",
                "unu",
                "një",
                "нэг",
                "un"
              ]
            },
            {
              "de": "2 – zwei",
              "tr": [
                "два",
                "اثنان",
                "دو",
                "iki",
                "doi",
                "dy",
                "хоёр",
                "deux"
              ]
            },
            {
              "de": "3 – drei",
              "tr": [
                "три",
                "ثلاثة",
                "سه",
                "üç",
                "trei",
                "tre",
                "гурав",
                "trois"
              ]
            },
            {
              "de": "4 – vier",
              "tr": [
                "чотири",
                "أربعة",
                "چهار",
                "dört",
                "patru",
                "katër",
                "дөрөв",
                "quatre"
              ]
            },
            {
              "de": "5 – fünf",
              "tr": [
                "п’ять",
                "خمسة",
                "پنج",
                "beş",
                "cinci",
                "pesë",
                "тав",
                "cinq"
              ]
            },
            {
              "de": "6 – sechs",
              "tr": [
                "шість",
                "ستة",
                "شش",
                "altı",
                "șase",
                "gjashtë",
                "зургаа",
                "six"
              ]
            },
            {
              "de": "7 – sieben",
              "tr": [
                "сім",
                "سبعة",
                "هفت",
                "yedi",
                "șapte",
                "shtatë",
                "долоо",
                "sept"
              ]
            },
            {
              "de": "8 – acht",
              "tr": [
                "вісім",
                "ثمانية",
                "هشت",
                "sekiz",
                "opt",
                "tetë",
                "найм",
                "huit"
              ]
            },
            {
              "de": "9 – neun",
              "tr": [
                "дев’ять",
                "تسعة",
                "نه",
                "dokuz",
                "nouă",
                "nëntë",
                "ес",
                "neuf"
              ]
            },
            {
              "de": "10 – zehn",
              "tr": [
                "десять",
                "عشرة",
                "ده",
                "on",
                "zece",
                "dhjetë",
                "арав",
                "dix"
              ]
            },
            {
              "de": "die Zahl – die Zahlen",
              "emoji": "🔢",
              "tr": [
                "число – числа",
                "الرقم – الأرقام",
                "عدد – اعداد",
                "sayı – sayılar",
                "numărul – numerele",
                "numri – numrat",
                "тоо",
                "le nombre – les nombres"
              ]
            }
          ]
        },
        {
          "type": "words",
          "title": "Arbeitsanweisungen im Buch",
          "items": [
            {
              "de": "markieren",
              "emoji": "🖍️",
              "tr": [
                "позначити, виділити",
                "يحدّد / يضع علامة",
                "علامت زدن",
                "işaretlemek",
                "a marca",
                "shënoj",
                "тэмдэглэх",
                "marquer / surligner"
              ]
            },
            {
              "de": "schreiben",
              "emoji": "✍️",
              "tr": [
                "писати",
                "يكتب",
                "نوشتن",
                "yazmak",
                "a scrie",
                "shkruaj",
                "бичих",
                "écrire"
              ]
            },
            {
              "de": "ergänzen",
              "emoji": "➕",
              "tr": [
                "доповнити",
                "يُكمل",
                "کامل کردن",
                "tamamlamak",
                "a completa",
                "plotësoj",
                "нөхөх",
                "compléter"
              ]
            },
            {
              "de": "lesen",
              "emoji": "📖",
              "tr": [
                "читати",
                "يقرأ",
                "خواندن",
                "okumak",
                "a citi",
                "lexoj",
                "унших",
                "lire"
              ]
            },
            {
              "de": "hören",
              "emoji": "👂",
              "tr": [
                "слухати",
                "يستمع",
                "گوش دادن",
                "dinlemek",
                "a asculta",
                "dëgjoj",
                "сонсох",
                "écouter"
              ]
            },
            {
              "de": "sprechen",
              "emoji": "🗣️",
              "tr": [
                "говорити",
                "يتكلّم",
                "صحبت کردن",
                "konuşmak",
                "a vorbi",
                "flas",
                "ярих",
                "parler"
              ]
            },
            {
              "de": "spielen (einen Dialog spielen)",
              "emoji": "🎭",
              "tr": [
                "розіграти (діалог)",
                "يمثّل (حوارًا)",
                "اجرا کردن (گفت‌وگو)",
                "canlandırmak (diyalog)",
                "a juca (un dialog)",
                "luaj (një dialog)",
                "(харилцан яриа) тоглох",
                "jouer (un dialogue)"
              ]
            },
            {
              "de": "wählen",
              "emoji": "☝️",
              "tr": [
                "вибрати",
                "يختار",
                "انتخاب کردن",
                "seçmek",
                "a alege",
                "zgjedh",
                "сонгох",
                "choisir"
              ]
            },
            {
              "de": "ankreuzen",
              "emoji": "☑️",
              "tr": [
                "поставити хрестик",
                "يضع علامة (×)",
                "علامت ضربدر زدن",
                "çarpı işareti koymak",
                "a bifa",
                "shënoj me kryq (×)",
                "чагтлах",
                "cocher"
              ]
            },
            {
              "de": "ordnen",
              "emoji": "🔀",
              "tr": [
                "упорядкувати",
                "يرتّب",
                "مرتب کردن",
                "sıralamak",
                "a pune în ordine",
                "rendis",
                "дараалалд оруулах",
                "mettre dans l’ordre"
              ]
            },
            {
              "de": "zählen",
              "emoji": "🔢",
              "tr": [
                "рахувати",
                "يعدّ",
                "شمردن",
                "saymak",
                "a număra",
                "numëroj",
                "тоолох",
                "compter"
              ]
            },
            {
              "de": "notieren",
              "emoji": "📝",
              "tr": [
                "записати",
                "يدوّن",
                "یادداشت کردن",
                "not almak",
                "a nota",
                "mbaj shënim",
                "тэмдэглэж авах",
                "noter"
              ]
            },
            {
              "de": "laut lesen",
              "emoji": "🔊",
              "tr": [
                "читати вголос",
                "يقرأ بصوت عالٍ",
                "بلند خواندن",
                "sesli okumak",
                "a citi cu voce tare",
                "lexoj me zë të lartë",
                "чангаар унших",
                "lire à voix haute"
              ]
            },
            {
              "de": "buchstabieren",
              "emoji": "🔤",
              "tr": [
                "називати по літерах",
                "يتهجّى",
                "هجی کردن",
                "harf harf söylemek",
                "a spune pe litere",
                "gërmëzoj",
                "үсэглэх",
                "épeler"
              ]
            },
            {
              "de": "groß schreiben",
              "emoji": "🔠",
              "tr": [
                "писати з великої літери",
                "يكتب بحرف كبير",
                "با حرف بزرگ نوشتن",
                "büyük harfle yazmak",
                "a scrie cu literă mare",
                "shkruaj me shkronjë të madhe",
                "том үсгээр бичих",
                "écrire avec une majuscule"
              ]
            },
            {
              "de": "die Frage – die Fragen",
              "emoji": "❓",
              "tr": [
                "питання",
                "السؤال – الأسئلة",
                "سؤال – سؤال‌ها",
                "soru – sorular",
                "întrebarea – întrebările",
                "pyetja – pyetjet",
                "асуулт",
                "la question – les questions"
              ]
            },
            {
              "de": "die Antwort – die Antworten",
              "emoji": "💬",
              "tr": [
                "відповідь – відповіді",
                "الجواب – الأجوبة",
                "جواب – جواب‌ها",
                "cevap – cevaplar",
                "răspunsul – răspunsurile",
                "përgjigjja – përgjigjet",
                "хариулт",
                "la réponse – les réponses"
              ]
            },
            {
              "de": "der Satz – die Sätze",
              "tr": [
                "речення",
                "الجملة – الجُمل",
                "جمله – جمله‌ها",
                "cümle – cümleler",
                "propoziția – propozițiile",
                "fjalia – fjalitë",
                "өгүүлбэр",
                "la phrase – les phrases"
              ]
            },
            {
              "de": "der Satzanfang",
              "tr": [
                "початок речення",
                "بداية الجملة",
                "اول جمله",
                "cümle başı",
                "începutul propoziției",
                "fillimi i fjalisë",
                "өгүүлбэрийн эхлэл",
                "le début de la phrase"
              ]
            },
            {
              "de": "die Tabelle",
              "emoji": "📊",
              "tr": [
                "таблиця",
                "الجدول",
                "جدول",
                "tablo",
                "tabelul",
                "tabela",
                "хүснэгт",
                "le tableau"
              ]
            },
            {
              "de": "der Dialog",
              "emoji": "👥",
              "tr": [
                "діалог",
                "الحوار",
                "گفت‌وگو",
                "diyalog",
                "dialogul",
                "dialogu",
                "харилцан яриа",
                "le dialogue"
              ]
            },
            {
              "de": "die Hilfe",
              "emoji": "🆘",
              "tr": [
                "допомога",
                "المساعدة",
                "کمک",
                "yardım",
                "ajutorul",
                "ndihma",
                "тусламж",
                "l’aide"
              ]
            }
          ]
        },
        {
          "type": "words",
          "title": "Anmeldung und Formular",
          "items": [
            {
              "de": "die Anmeldung",
              "emoji": "🗒️",
              "tr": [
                "реєстрація",
                "التسجيل",
                "ثبت‌نام",
                "kayıt",
                "înscrierea",
                "regjistrimi",
                "бүртгэл",
                "l’inscription"
              ]
            },
            {
              "de": "das Formular",
              "emoji": "📄",
              "tr": [
                "формуляр, бланк",
                "الاستمارة",
                "فرم",
                "form",
                "formularul",
                "formulari",
                "маягт",
                "le formulaire"
              ]
            },
            {
              "de": "die Information",
              "emoji": "ℹ️",
              "tr": [
                "інформація",
                "المعلومة",
                "اطلاعات",
                "bilgi",
                "informația",
                "informacioni",
                "мэдээлэл",
                "l’information"
              ]
            },
            {
              "de": "die Adresse",
              "emoji": "🏠",
              "tr": [
                "адреса",
                "العنوان",
                "آدرس / نشانی",
                "adres",
                "adresa",
                "adresa",
                "хаяг",
                "l’adresse"
              ]
            },
            {
              "de": "die Straße",
              "emoji": "🛣️",
              "tr": [
                "вулиця",
                "الشارع",
                "خیابان",
                "sokak / cadde",
                "strada",
                "rruga",
                "гудамж",
                "la rue"
              ]
            },
            {
              "de": "die Hausnummer",
              "tr": [
                "номер будинку",
                "رقم المنزل",
                "پلاک (شمارهٔ خانه)",
                "kapı numarası",
                "numărul casei",
                "numri i shtëpisë",
                "байрны дугаар",
                "le numéro (de rue)"
              ]
            },
            {
              "de": "die Postleitzahl (PLZ)",
              "emoji": "📮",
              "tr": [
                "поштовий індекс",
                "الرمز البريدي",
                "کد پستی",
                "posta kodu",
                "codul poștal",
                "kodi postar",
                "шуудангийн код",
                "le code postal"
              ]
            },
            {
              "de": "der Ort",
              "emoji": "📍",
              "tr": [
                "населений пункт, місто",
                "المدينة / المكان",
                "شهر / محل",
                "yer / şehir",
                "localitatea",
                "vendi / qyteti",
                "хот / суурин",
                "la ville / la localité"
              ]
            },
            {
              "de": "die Telefonnummer",
              "emoji": "📞",
              "tr": [
                "номер телефону",
                "رقم الهاتف",
                "شماره تلفن",
                "telefon numarası",
                "numărul de telefon",
                "numri i telefonit",
                "утасны дугаар",
                "le numéro de téléphone"
              ]
            },
            {
              "de": "die Nachbarländer",
              "emoji": "🤝",
              "tr": [
                "сусідні країни",
                "الدول المجاورة",
                "کشورهای همسایه",
                "komşu ülkeler",
                "țările vecine",
                "vendet fqinje",
                "хөрш орнууд",
                "les pays voisins"
              ]
            },
            {
              "de": "der Kugelschreiber = der Kuli = der Stift",
              "emoji": "🖊️",
              "tr": [
                "ручка",
                "القلم (الجاف)",
                "خودکار",
                "tükenmez kalem",
                "pixul",
                "stilolapsi",
                "бал",
                "le stylo (à bille)"
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "steckbrief",
      "icon": "🪪",
      "title": "Mustertext: Mein Steckbrief",
      "blocks": [
        {
          "type": "text",
          "title": "Kurz – für alle",
          "text": "Hallo! Ich heiße Ali.<br>Ich komme aus Syrien.<br>Ich wohne in Köln."
        },
        {
          "type": "text",
          "title": "Lang – mit Extra",
          "text": "Hallo! Mein Name ist Olena Koval. Mein Vorname ist Olena: O – L – E – N – A.<br>Ich komme aus der Ukraine. Ich bin in Charkiw geboren. Jetzt wohne ich in Köln.<br>Ich bin Ingenieurin von Beruf. Ich habe 12 Jahre in meiner Heimat gearbeitet. Heute arbeite ich nicht. Ich lerne Deutsch.<br>Meine Muttersprache ist Ukrainisch. Ich spreche auch Russisch und ein bisschen Englisch. Ich lerne seit 3 Monaten Deutsch.<br>Ich bin verheiratet und habe zwei Kinder: einen Sohn und eine Tochter. Mein Sohn ist 8 Jahre alt, meine Tochter ist 5.<br>In meiner Freizeit lese ich gern. Ich mag Musik. Am Wochenende backe ich gern Kuchen."
        }
      ]
    }
  ],
  "note": "Alle Namen in den Beispielen sind erfunden."
};
