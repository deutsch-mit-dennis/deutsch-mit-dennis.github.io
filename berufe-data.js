/* Data for #berufe (berufe.js) and the game spiele/berufe-a1.js. Content approved 2026-11-26
   (qa-out/berufe-2026-11-26/02_konzept_freigegeben.md). Data only, no logic.
   Item: { id, gruppe: alltag|traum, m, f, pm, pf, neutral?, ort, taetigkeit, satz: [position 1, verb, rest],
           bild: "a0/x" (assets/<bild>.webp) or an emoji, hinweis?, tr: { en, uk, ru, ar, fa, tr, es, it, fr, ro } }
   Audio keys (for later recordings): bf-<id>-w (word), bf-<id>-s (sentence), bf-rm-<n>, bf-sie-<n>, bf-du-<n> (1-based). */
(window.DM || (window.DM = {})).berufe = {
 "langs": [
  "en",
  "uk",
  "ru",
  "ar",
  "fa",
  "tr",
  "es",
  "it",
  "fr",
  "ro"
 ],
 "list": [
  {
   "id": "friseur",
   "gruppe": "alltag",
   "m": "der Friseur",
   "f": "die Friseurin",
   "pm": "die Friseure",
   "pf": "die Friseurinnen",
   "ort": "im Friseursalon",
   "taetigkeit": "Haare schneiden",
   "satz": [
    "Ich",
    "schneide",
    "Haare."
   ],
   "bild": "a0/friseur",
   "tr": {
    "en": "hairdresser",
    "uk": "перукар / перукарка",
    "ru": "парикмахер",
    "ar": "مصفف شعر / مصففة شعر",
    "fa": "آرایشگر",
    "tr": "kuaför",
    "es": "peluquero / peluquera",
    "it": "parrucchiere / parrucchiera",
    "fr": "coiffeur / coiffeuse",
    "ro": "coafor / coafeză"
   }
  },
  {
   "id": "pfleger",
   "gruppe": "alltag",
   "m": "der Pfleger",
   "f": "die Pflegerin",
   "pm": "die Pfleger",
   "pf": "die Pflegerinnen",
   "ort": "im Krankenhaus",
   "taetigkeit": "kranke Menschen pflegen",
   "satz": [
    "Im Krankenhaus",
    "pflege",
    "ich kranke Menschen."
   ],
   "bild": "a0/pflegerin",
   "hinweis": "Offizieller Name seit 2020 (Pflegeberufegesetz): Pflegefachmann / Pflegefachfrau. ‚Krankenschwester‘ ist ein altes Wort, man hört es aber noch.",
   "tr": {
    "en": "nurse",
    "uk": "медбрат / медсестра",
    "ru": "медбрат / медсестра",
    "ar": "ممرض / ممرضة",
    "fa": "پرستار",
    "tr": "hemşire",
    "es": "enfermero / enfermera",
    "it": "infermiere / infermiera",
    "fr": "infirmier / infirmière",
    "ro": "asistent medical / asistentă medicală"
   }
  },
  {
   "id": "lehrer",
   "gruppe": "alltag",
   "m": "der Lehrer",
   "f": "die Lehrerin",
   "pm": "die Lehrer",
   "pf": "die Lehrerinnen",
   "ort": "in der Schule",
   "taetigkeit": "unterrichten",
   "satz": [
    "Ich",
    "unterrichte",
    "Deutsch."
   ],
   "bild": "a0/lehrer",
   "tr": {
    "en": "teacher",
    "uk": "вчитель / вчителька",
    "ru": "учитель / учительница",
    "ar": "معلم / معلمة",
    "fa": "معلم",
    "tr": "öğretmen",
    "es": "profesor / profesora",
    "it": "insegnante",
    "fr": "enseignant / enseignante",
    "ro": "profesor / profesoară"
   }
  },
  {
   "id": "polizist",
   "gruppe": "alltag",
   "m": "der Polizist",
   "f": "die Polizistin",
   "pm": "die Polizisten",
   "pf": "die Polizistinnen",
   "ort": "bei der Polizei",
   "taetigkeit": "Menschen helfen und schützen",
   "satz": [
    "Der Polizist",
    "kontrolliert",
    "das Auto."
   ],
   "bild": "🚓",
   "tr": {
    "en": "police officer",
    "uk": "поліцейський / поліцейська",
    "ru": "полицейский",
    "ar": "شرطي / شرطية",
    "fa": "پلیس",
    "tr": "polis",
    "es": "policía",
    "it": "poliziotto / poliziotta",
    "fr": "policier / policière",
    "ro": "polițist / polițistă"
   }
  },
  {
   "id": "arzt",
   "gruppe": "alltag",
   "m": "der Arzt",
   "f": "die Ärztin",
   "pm": "die Ärzte",
   "pf": "die Ärztinnen",
   "ort": "in der Praxis",
   "taetigkeit": "kranke Menschen untersuchen",
   "satz": [
    "Die Ärztin",
    "untersucht",
    "das Kind."
   ],
   "bild": "wort/aerztin",
   "tr": {
    "en": "doctor",
    "uk": "лікар / лікарка",
    "ru": "врач",
    "ar": "طبيب / طبيبة",
    "fa": "پزشک / دکتر",
    "tr": "doktor",
    "es": "médico / médica",
    "it": "medico",
    "fr": "médecin",
    "ro": "medic"
   }
  },
  {
   "id": "koch",
   "gruppe": "alltag",
   "m": "der Koch",
   "f": "die Köchin",
   "pm": "die Köche",
   "pf": "die Köchinnen",
   "ort": "im Restaurant",
   "taetigkeit": "Essen kochen",
   "satz": [
    "Ich",
    "koche",
    "im Restaurant."
   ],
   "bild": "a0/koch",
   "tr": {
    "en": "cook",
    "uk": "кухар / кухарка",
    "ru": "повар",
    "ar": "طباخ / طباخة",
    "fa": "آشپز",
    "tr": "aşçı",
    "es": "cocinero / cocinera",
    "it": "cuoco / cuoca",
    "fr": "cuisinier / cuisinière",
    "ro": "bucătar / bucătăreasă"
   }
  },
  {
   "id": "kellner",
   "gruppe": "alltag",
   "m": "der Kellner",
   "f": "die Kellnerin",
   "pm": "die Kellner",
   "pf": "die Kellnerinnen",
   "ort": "im Café",
   "taetigkeit": "Essen und Getränke bringen",
   "satz": [
    "Der Kellner",
    "bringt",
    "den Kaffee."
   ],
   "bild": "a0/kellnerin",
   "tr": {
    "en": "waiter / waitress",
    "uk": "офіціант / офіціантка",
    "ru": "официант / официантка",
    "ar": "نادل / نادلة",
    "fa": "پیشخدمت",
    "tr": "garson",
    "es": "camarero / camarera",
    "it": "cameriere / cameriera",
    "fr": "serveur / serveuse",
    "ro": "ospătar / ospătăriță"
   }
  },
  {
   "id": "verkaeufer",
   "gruppe": "alltag",
   "m": "der Verkäufer",
   "f": "die Verkäuferin",
   "pm": "die Verkäufer",
   "pf": "die Verkäuferinnen",
   "ort": "im Geschäft",
   "taetigkeit": "Waren verkaufen",
   "satz": [
    "Sie",
    "verkauft",
    "Obst im Supermarkt."
   ],
   "bild": "a0/verkaeuferin",
   "tr": {
    "en": "shop assistant",
    "uk": "продавець / продавчиня",
    "ru": "продавец / продавщица",
    "ar": "بائع / بائعة",
    "fa": "فروشنده",
    "tr": "satış elemanı",
    "es": "vendedor / vendedora",
    "it": "commesso / commessa",
    "fr": "vendeur / vendeuse",
    "ro": "vânzător / vânzătoare"
   }
  },
  {
   "id": "baecker",
   "gruppe": "alltag",
   "m": "der Bäcker",
   "f": "die Bäckerin",
   "pm": "die Bäcker",
   "pf": "die Bäckerinnen",
   "ort": "in der Bäckerei",
   "taetigkeit": "Brot und Brötchen backen",
   "satz": [
    "Am Morgen",
    "backt",
    "der Bäcker Brot."
   ],
   "bild": "a0/baeckerei",
   "tr": {
    "en": "baker",
    "uk": "пекар / пекарка",
    "ru": "пекарь",
    "ar": "خباز / خبازة",
    "fa": "نانوا",
    "tr": "fırıncı",
    "es": "panadero / panadera",
    "it": "panettiere / panettiera",
    "fr": "boulanger / boulangère",
    "ro": "brutar / brutăreasă"
   }
  },
  {
   "id": "mechaniker",
   "gruppe": "alltag",
   "m": "der Automechaniker",
   "f": "die Automechanikerin",
   "pm": "die Automechaniker",
   "pf": "die Automechanikerinnen",
   "ort": "in der Werkstatt",
   "taetigkeit": "Autos reparieren",
   "satz": [
    "Ich",
    "repariere",
    "Autos."
   ],
   "bild": "a0/mechanikerin",
   "hinweis": "In Stellenanzeigen: Kfz-Mechatroniker / Kfz-Mechatronikerin.",
   "tr": {
    "en": "car mechanic",
    "uk": "автомеханік",
    "ru": "автомеханик",
    "ar": "ميكانيكي سيارات / ميكانيكية سيارات",
    "fa": "مکانیک خودرو",
    "tr": "oto tamircisi",
    "es": "mecánico / mecánica de coches",
    "it": "meccanico / meccanica d'auto",
    "fr": "mécanicien / mécanicienne auto",
    "ro": "mecanic auto"
   }
  },
  {
   "id": "postbote",
   "gruppe": "alltag",
   "m": "der Postbote",
   "f": "die Postbotin",
   "pm": "die Postboten",
   "pf": "die Postbotinnen",
   "ort": "bei der Post",
   "taetigkeit": "Briefe und Pakete bringen",
   "satz": [
    "Die Postbotin",
    "bringt",
    "ein Paket."
   ],
   "bild": "a0/post",
   "tr": {
    "en": "postman / postwoman",
    "uk": "листоноша",
    "ru": "почтальон",
    "ar": "ساعي البريد / ساعية البريد",
    "fa": "پستچی",
    "tr": "postacı",
    "es": "cartero / cartera",
    "it": "postino / postina",
    "fr": "facteur / factrice",
    "ro": "poștaș / poștăriță"
   }
  },
  {
   "id": "informatiker",
   "gruppe": "alltag",
   "m": "der Informatiker",
   "f": "die Informatikerin",
   "pm": "die Informatiker",
   "pf": "die Informatikerinnen",
   "ort": "im Büro",
   "taetigkeit": "am Computer arbeiten",
   "satz": [
    "Sie",
    "schreibt",
    "ein Programm."
   ],
   "bild": "a0/programmiererin",
   "tr": {
    "en": "IT specialist",
    "uk": "програміст / програмістка",
    "ru": "IT-специалист / программист",
    "ar": "مبرمج / مبرمجة",
    "fa": "متخصص کامپیوتر",
    "tr": "bilişimci",
    "es": "informático / informática",
    "it": "informatico / informatica",
    "fr": "informaticien / informaticienne",
    "ro": "informatician / informaticiană"
   }
  },
  {
   "id": "kassierer",
   "gruppe": "alltag",
   "m": "der Kassierer",
   "f": "die Kassiererin",
   "pm": "die Kassierer",
   "pf": "die Kassiererinnen",
   "ort": "im Supermarkt",
   "taetigkeit": "an der Kasse arbeiten",
   "satz": [
    "Ich",
    "arbeite",
    "an der Kasse."
   ],
   "bild": "a0/supermarkt",
   "tr": {
    "en": "cashier",
    "uk": "касир / касирка",
    "ru": "кассир",
    "ar": "أمين صندوق / أمينة صندوق",
    "fa": "صندوق‌دار",
    "tr": "kasiyer",
    "es": "cajero / cajera",
    "it": "cassiere / cassiera",
    "fr": "caissier / caissière",
    "ro": "casier / casieră"
   }
  },
  {
   "id": "reinigung",
   "gruppe": "alltag",
   "m": "der Gebäudereiniger",
   "f": "die Gebäudereinigerin",
   "pm": "die Gebäudereiniger",
   "pf": "die Gebäudereinigerinnen",
   "neutral": "die Reinigungskraft, die Reinigungskräfte (für Männer und Frauen)",
   "ort": "im Büro",
   "taetigkeit": "putzen und sauber machen",
   "satz": [
    "Am Abend",
    "putze",
    "ich Büros."
   ],
   "bild": "wort/putzen",
   "tr": {
    "en": "cleaner",
    "uk": "прибиральник / прибиральниця",
    "ru": "уборщик / уборщица",
    "ar": "عامل نظافة / عاملة نظافة",
    "fa": "کارگر نظافت",
    "tr": "temizlik görevlisi",
    "es": "limpiador / limpiadora",
    "it": "addetto / addetta alle pulizie",
    "fr": "agent / agente d'entretien",
    "ro": "agent de curățenie"
   }
  },
  {
   "id": "erzieher",
   "gruppe": "alltag",
   "m": "der Erzieher",
   "f": "die Erzieherin",
   "pm": "die Erzieher",
   "pf": "die Erzieherinnen",
   "ort": "in der Kita",
   "taetigkeit": "Kinder betreuen",
   "satz": [
    "Der Erzieher",
    "spielt",
    "mit den Kindern."
   ],
   "bild": "🧸",
   "tr": {
    "en": "nursery teacher",
    "uk": "вихователь / вихователька",
    "ru": "воспитатель / воспитательница",
    "ar": "مربي أطفال / مربية أطفال",
    "fa": "مربی مهد کودک",
    "tr": "okul öncesi öğretmeni",
    "es": "educador / educadora infantil",
    "it": "educatore / educatrice",
    "fr": "éducateur / éducatrice",
    "ro": "educator / educatoare"
   }
  },
  {
   "id": "lagerarbeiter",
   "gruppe": "alltag",
   "m": "der Lagerarbeiter",
   "f": "die Lagerarbeiterin",
   "pm": "die Lagerarbeiter",
   "pf": "die Lagerarbeiterinnen",
   "ort": "im Lager",
   "taetigkeit": "Pakete packen und sortieren",
   "satz": [
    "Ich",
    "packe",
    "Pakete im Lager."
   ],
   "bild": "📦",
   "hinweis": "In Stellenanzeigen auch: Lagerhelfer/in, Fachkraft für Lagerlogistik.",
   "tr": {
    "en": "warehouse worker",
    "uk": "працівник / працівниця складу",
    "ru": "работник / работница склада",
    "ar": "عامل مستودع / عاملة مستودع",
    "fa": "کارگر انبار",
    "tr": "depo işçisi",
    "es": "mozo / moza de almacén",
    "it": "magazziniere / magazziniera",
    "fr": "magasinier / magasinière",
    "ro": "lucrător / lucrătoare în depozit"
   }
  },
  {
   "id": "busfahrer",
   "gruppe": "alltag",
   "m": "der Busfahrer",
   "f": "die Busfahrerin",
   "pm": "die Busfahrer",
   "pf": "die Busfahrerinnen",
   "ort": "im Bus",
   "taetigkeit": "Bus fahren",
   "satz": [
    "Die Busfahrerin",
    "fährt",
    "durch die Stadt."
   ],
   "bild": "a0/busfahrer",
   "tr": {
    "en": "bus driver",
    "uk": "водій автобуса",
    "ru": "водитель автобуса",
    "ar": "سائق حافلة / سائقة حافلة",
    "fa": "رانندهٔ اتوبوس",
    "tr": "otobüs şoförü",
    "es": "conductor / conductora de autobús",
    "it": "autista di autobus",
    "fr": "conducteur / conductrice de bus",
    "ro": "șofer / șoferiță de autobuz"
   }
  },
  {
   "id": "lkwfahrer",
   "gruppe": "alltag",
   "m": "der Lkw-Fahrer",
   "f": "die Lkw-Fahrerin",
   "pm": "die Lkw-Fahrer",
   "pf": "die Lkw-Fahrerinnen",
   "ort": "auf der Autobahn",
   "taetigkeit": "Waren transportieren",
   "satz": [
    "Er",
    "fährt",
    "nach Hamburg."
   ],
   "bild": "🚚",
   "tr": {
    "en": "lorry driver",
    "uk": "водій вантажівки",
    "ru": "водитель грузовика",
    "ar": "سائق شاحنة / سائقة شاحنة",
    "fa": "رانندهٔ کامیون",
    "tr": "tır şoförü",
    "es": "camionero / camionera",
    "it": "camionista",
    "fr": "chauffeur routier / chauffeuse routière",
    "ro": "șofer de camion"
   }
  },
  {
   "id": "altenpfleger",
   "gruppe": "alltag",
   "m": "der Altenpfleger",
   "f": "die Altenpflegerin",
   "pm": "die Altenpfleger",
   "pf": "die Altenpflegerinnen",
   "ort": "im Altenheim",
   "taetigkeit": "alte Menschen pflegen",
   "satz": [
    "Er",
    "pflegt",
    "alte Menschen."
   ],
   "bild": "🧓",
   "hinweis": "Seit 2020 heißt die Ausbildung Pflegefachmann / Pflegefachfrau. Im Alltag sagt man noch Altenpfleger/in.",
   "tr": {
    "en": "elderly carer",
    "uk": "доглядальник / доглядальниця літніх людей",
    "ru": "работник / работница по уходу за пожилыми",
    "ar": "مقدّم رعاية للمسنين / مقدّمة رعاية للمسنين",
    "fa": "پرستار سالمندان",
    "tr": "yaşlı bakıcısı",
    "es": "cuidador / cuidadora de personas mayores",
    "it": "assistente per anziani",
    "fr": "aide-soignant / aide-soignante",
    "ro": "îngrijitor / îngrijitoare de bătrâni"
   }
  },
  {
   "id": "elektriker",
   "gruppe": "alltag",
   "m": "der Elektriker",
   "f": "die Elektrikerin",
   "pm": "die Elektriker",
   "pf": "die Elektrikerinnen",
   "ort": "auf der Baustelle",
   "taetigkeit": "Kabel und Lampen reparieren",
   "satz": [
    "Die Elektrikerin",
    "repariert",
    "das Licht."
   ],
   "bild": "a0/elektriker",
   "tr": {
    "en": "electrician",
    "uk": "електрик",
    "ru": "электрик",
    "ar": "كهربائي / كهربائية",
    "fa": "برق‌کار",
    "tr": "elektrikçi",
    "es": "electricista",
    "it": "elettricista",
    "fr": "électricien / électricienne",
    "ro": "electrician / electriciană"
   }
  },
  {
   "id": "maler",
   "gruppe": "alltag",
   "m": "der Maler",
   "f": "die Malerin",
   "pm": "die Maler",
   "pf": "die Malerinnen",
   "ort": "auf der Baustelle",
   "taetigkeit": "Wände streichen",
   "satz": [
    "Heute",
    "streicht",
    "sie die Wand weiß."
   ],
   "bild": "🖌️",
   "hinweis": "Maler/in kann auch Künstler/in heißen. Im Handwerk: Maler und Lackierer.",
   "tr": {
    "en": "painter (walls)",
    "uk": "маляр / малярка",
    "ru": "маляр",
    "ar": "دهّان / دهّانة",
    "fa": "نقاش ساختمان",
    "tr": "boyacı",
    "es": "pintor / pintora",
    "it": "imbianchino / imbianchina",
    "fr": "peintre en bâtiment",
    "ro": "zugrav / zugravă"
   }
  },
  {
   "id": "hausmeister",
   "gruppe": "alltag",
   "m": "der Hausmeister",
   "f": "die Hausmeisterin",
   "pm": "die Hausmeister",
   "pf": "die Hausmeisterinnen",
   "ort": "im Wohnhaus",
   "taetigkeit": "kleine Sachen reparieren",
   "satz": [
    "Der Hausmeister",
    "repariert",
    "die Tür."
   ],
   "bild": "🧰",
   "tr": {
    "en": "caretaker",
    "uk": "завгосп",
    "ru": "завхоз",
    "ar": "عامل صيانة / عاملة صيانة",
    "fa": "سرایدار",
    "tr": "bina görevlisi",
    "es": "conserje",
    "it": "custode",
    "fr": "gardien / gardienne d'immeuble",
    "ro": "îngrijitor / îngrijitoare de clădire"
   }
  },
  {
   "id": "bauarbeiter",
   "gruppe": "alltag",
   "m": "der Bauarbeiter",
   "f": "die Bauarbeiterin",
   "pm": "die Bauarbeiter",
   "pf": "die Bauarbeiterinnen",
   "ort": "auf der Baustelle",
   "taetigkeit": "Häuser bauen",
   "satz": [
    "Wir",
    "bauen",
    "ein Haus."
   ],
   "bild": "👷",
   "tr": {
    "en": "construction worker",
    "uk": "будівельник / будівельниця",
    "ru": "строитель",
    "ar": "عامل بناء / عاملة بناء",
    "fa": "کارگر ساختمانی",
    "tr": "inşaat işçisi",
    "es": "obrero / obrera de la construcción",
    "it": "operaio / operaia edile",
    "fr": "ouvrier / ouvrière du bâtiment",
    "ro": "muncitor / muncitoare în construcții"
   }
  },
  {
   "id": "dolmetscher",
   "gruppe": "alltag",
   "m": "der Dolmetscher",
   "f": "die Dolmetscherin",
   "pm": "die Dolmetscher",
   "pf": "die Dolmetscherinnen",
   "ort": "beim Amt",
   "taetigkeit": "Gespräche übersetzen",
   "satz": [
    "Ich",
    "spreche",
    "Arabisch und Deutsch."
   ],
   "bild": "🗣️",
   "tr": {
    "en": "interpreter",
    "uk": "перекладач / перекладачка",
    "ru": "переводчик / переводчица",
    "ar": "مترجم فوري / مترجمة فورية",
    "fa": "مترجم شفاهی",
    "tr": "tercüman",
    "es": "intérprete",
    "it": "interprete",
    "fr": "interprète",
    "ro": "interpret / interpretă"
   }
  },
  {
   "id": "schauspieler",
   "gruppe": "traum",
   "m": "der Schauspieler",
   "f": "die Schauspielerin",
   "pm": "die Schauspieler",
   "pf": "die Schauspielerinnen",
   "ort": "im Theater",
   "taetigkeit": "im Theater oder im Film spielen",
   "satz": [
    "Ich",
    "spiele",
    "im Theater."
   ],
   "bild": "🎭",
   "tr": {
    "en": "actor / actress",
    "uk": "актор / акторка",
    "ru": "актёр / актриса",
    "ar": "ممثل / ممثلة",
    "fa": "بازیگر",
    "tr": "oyuncu",
    "es": "actor / actriz",
    "it": "attore / attrice",
    "fr": "acteur / actrice",
    "ro": "actor / actriță"
   }
  },
  {
   "id": "tierarzt",
   "gruppe": "traum",
   "m": "der Tierarzt",
   "f": "die Tierärztin",
   "pm": "die Tierärzte",
   "pf": "die Tierärztinnen",
   "ort": "in der Tierarztpraxis",
   "taetigkeit": "kranke Tiere behandeln",
   "satz": [
    "Die Tierärztin",
    "untersucht",
    "den Hund."
   ],
   "bild": "🐕",
   "tr": {
    "en": "vet",
    "uk": "ветеринар / ветеринарка",
    "ru": "ветеринар",
    "ar": "طبيب بيطري / طبيبة بيطرية",
    "fa": "دامپزشک",
    "tr": "veteriner",
    "es": "veterinario / veterinaria",
    "it": "veterinario / veterinaria",
    "fr": "vétérinaire",
    "ro": "medic veterinar"
   }
  },
  {
   "id": "saenger",
   "gruppe": "traum",
   "m": "der Sänger",
   "f": "die Sängerin",
   "pm": "die Sänger",
   "pf": "die Sängerinnen",
   "ort": "auf der Bühne",
   "taetigkeit": "Lieder singen",
   "satz": [
    "Am Abend",
    "singt",
    "die Sängerin auf der Bühne."
   ],
   "bild": "🎤",
   "tr": {
    "en": "singer",
    "uk": "співак / співачка",
    "ru": "певец / певица",
    "ar": "مغنٍّ / مغنية",
    "fa": "خواننده",
    "tr": "şarkıcı",
    "es": "cantante",
    "it": "cantante",
    "fr": "chanteur / chanteuse",
    "ro": "cântăreț / cântăreață"
   }
  },
  {
   "id": "pilot",
   "gruppe": "traum",
   "m": "der Pilot",
   "f": "die Pilotin",
   "pm": "die Piloten",
   "pf": "die Pilotinnen",
   "ort": "im Flugzeug",
   "taetigkeit": "ein Flugzeug fliegen",
   "satz": [
    "Die Pilotin",
    "fliegt",
    "nach Spanien."
   ],
   "bild": "a0/flugzeug",
   "tr": {
    "en": "pilot",
    "uk": "пілот",
    "ru": "пилот",
    "ar": "قائد طائرة / قائدة طائرة",
    "fa": "خلبان",
    "tr": "pilot",
    "es": "piloto",
    "it": "pilota",
    "fr": "pilote",
    "ro": "pilot"
   }
  },
  {
   "id": "feuerwehr",
   "gruppe": "traum",
   "m": "der Feuerwehrmann",
   "f": "die Feuerwehrfrau",
   "pm": "die Feuerwehrmänner",
   "pf": "die Feuerwehrfrauen",
   "neutral": "die Feuerwehrleute (Männer und Frauen zusammen)",
   "ort": "bei der Feuerwehr",
   "taetigkeit": "Feuer löschen",
   "satz": [
    "Die Feuerwehrfrau",
    "löscht",
    "das Feuer."
   ],
   "bild": "🚒",
   "tr": {
    "en": "firefighter",
    "uk": "пожежник / пожежниця",
    "ru": "пожарный",
    "ar": "إطفائي / إطفائية",
    "fa": "آتش‌نشان",
    "tr": "itfaiyeci",
    "es": "bombero / bombera",
    "it": "vigile del fuoco",
    "fr": "pompier",
    "ro": "pompier"
   }
  },
  {
   "id": "fussballspieler",
   "gruppe": "traum",
   "m": "der Fußballspieler",
   "f": "die Fußballspielerin",
   "pm": "die Fußballspieler",
   "pf": "die Fußballspielerinnen",
   "ort": "im Stadion",
   "taetigkeit": "Fußball spielen",
   "satz": [
    "Am Sonntag",
    "spielt",
    "sie Fußball."
   ],
   "bild": "⚽",
   "tr": {
    "en": "football player",
    "uk": "футболіст / футболістка",
    "ru": "футболист / футболистка",
    "ar": "لاعب كرة قدم / لاعبة كرة قدم",
    "fa": "فوتبالیست",
    "tr": "futbolcu",
    "es": "futbolista",
    "it": "calciatore / calciatrice",
    "fr": "footballeur / footballeuse",
    "ro": "fotbalist / fotbalistă"
   }
  }
 ],
 "redemittel": [
  {
   "t": "Was sind Sie von Beruf? / Was bist du von Beruf?",
   "say": "Was sind Sie von Beruf? Was bist du von Beruf?"
  },
  {
   "t": "Ich bin Köchin.",
   "say": "Ich bin Köchin.",
   "note": "ohne Artikel!",
   "wrong": "Ich bin eine Köchin."
  },
  {
   "t": "Ich arbeite als Busfahrer.",
   "say": "Ich arbeite als Busfahrer."
  },
  {
   "t": "Ich arbeite im Krankenhaus. / in der Kita. / bei der Post.",
   "say": "Ich arbeite im Krankenhaus. Ich arbeite in der Kita. Ich arbeite bei der Post."
  },
  {
   "t": "In meinem Land war ich Lehrerin.",
   "say": "In meinem Land war ich Lehrerin."
  },
  {
   "t": "Ich suche Arbeit. / Ich suche eine Stelle als Verkäufer.",
   "say": "Ich suche Arbeit. Ich suche eine Stelle als Verkäufer."
  },
  {
   "t": "Ich bin arbeitslos. / Ich mache einen Deutschkurs.",
   "say": "Ich bin arbeitslos. Ich mache einen Deutschkurs."
  },
  {
   "t": "Ich möchte als Erzieherin arbeiten.",
   "say": "Ich möchte als Erzieherin arbeiten."
  }
 ],
 "dialogSie": [
  [
   "A",
   "Guten Tag! Was sind Sie von Beruf?"
  ],
  [
   "B",
   "Ich bin Köchin. Ich arbeite im Restaurant. Und Sie?"
  ],
  [
   "A",
   "In meinem Land war ich Lehrer. Jetzt suche ich Arbeit."
  ],
  [
   "B",
   "Was möchten Sie machen?"
  ],
  [
   "A",
   "Ich möchte als Erzieher arbeiten."
  ]
 ],
 "dialogDu": [
  [
   "A",
   "Hallo! Was bist du von Beruf?"
  ],
  [
   "B",
   "Ich bin Busfahrer. Und du?"
  ],
  [
   "A",
   "Ich arbeite als Verkäuferin im Supermarkt."
  ],
  [
   "B",
   "Und was ist dein Traumberuf?"
  ],
  [
   "A",
   "Mein Traumberuf ist Pilotin. Ich möchte fliegen!"
  ]
 ]
};
