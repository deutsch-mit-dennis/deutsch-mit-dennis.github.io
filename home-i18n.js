/* Start page help in the learner's own language (short UI texts only, German stays the learning language).
   Texts: de (original), en, uk, ru, ar, tr. Please have native speakers check them before big campaigns.
   Used by site.js (home): elements with data-i18n="key" are replaced; the choice is stored in localStorage "dmd.lang". */
(function () {
  "use strict";
  const DM = (window.DM = window.DM || {});
  const LANGS = [
    ["de", "Deutsch"],
    ["en", "English"],
    ["uk", "Українська"],
    ["ru", "Русский"],
    ["ar", "العربية"],
    ["fa", "فارسی"],
    ["tr", "Türkçe"],
    ["es", "Español"],
    ["it", "Italiano"],
  ];
  const RTL = ["ar", "fa"];
  const D = {
    de: {
      lvl_q: "Wie gut ist dein Deutsch?",
      lvl_hint: "Tippe auf dein Niveau. Ich zeige dir den ersten Schritt.",
      lv_a0: "Ich fange an",
      lv_a1: "Erste Sätze",
      lv_a2: "Alltag",
      lv_b1: "Gespräche",
      lv_b2: "Beruf",
      lvl_unk: "Ich weiß es nicht",
      go_start: "Jetzt starten",
      go_lessons: "Lektionen öffnen",
      go_cont: "Weitermachen",
      free: "Kostenlos · A1 bis B2 · ohne Anmeldung",
      paths_h: "Wähle deinen Weg",
      games_h: "Spiele zum Üben",
      lang_h: "Hilfe in deiner Sprache",
      chal_l: "Tages-Challenge",
      hello_l: "Dennis in deiner Sprache",
      mem_l: "Lernstand & Erinnerung",
    },
    en: {
      lvl_q: "How good is your German?",
      lvl_hint: "Tap your level. I will show you the first step.",
      lv_a0: "I'm just starting",
      lv_a1: "First sentences",
      lv_a2: "Everyday life",
      lv_b1: "Conversations",
      lv_b2: "Work",
      lvl_unk: "I don't know",
      go_start: "Start now",
      go_lessons: "Open lessons",
      go_cont: "Continue",
      free: "Free · A1 to B2 · no sign-up",
      paths_h: "Choose your path",
      games_h: "Games to practise",
      lang_h: "Help in your language",
      chal_l: "Daily challenge",
      hello_l: "Dennis in your language",
      mem_l: "Progress & reminder",
    },
    uk: {
      lvl_q: "Наскільки добре ти знаєш німецьку?",
      lvl_hint: "Натисни свій рівень. Я покажу перший крок.",
      lv_a0: "Я тільки починаю",
      lv_a1: "Перші речення",
      lv_a2: "Повсякденне життя",
      lv_b1: "Розмови",
      lv_b2: "Робота",
      lvl_unk: "Не знаю",
      go_start: "Почати",
      go_lessons: "Відкрити уроки",
      go_cont: "Продовжити",
      free: "Безкоштовно · A1–B2 · без реєстрації",
      paths_h: "Обери свій шлях",
      games_h: "Ігри для практики",
      lang_h: "Допомога твоєю мовою",
      chal_l: "Челендж дня",
      hello_l: "Деніс твоєю мовою",
      mem_l: "Прогрес і нагадування",
    },
    ru: {
      lvl_q: "Насколько хорошо ты знаешь немецкий?",
      lvl_hint: "Нажми на свой уровень. Я покажу первый шаг.",
      lv_a0: "Я только начинаю",
      lv_a1: "Первые предложения",
      lv_a2: "Повседневная жизнь",
      lv_b1: "Разговоры",
      lv_b2: "Работа",
      lvl_unk: "Не знаю",
      go_start: "Начать",
      go_lessons: "Открыть уроки",
      go_cont: "Продолжить",
      free: "Бесплатно · A1–B2 · без регистрации",
      paths_h: "Выбери свой путь",
      games_h: "Игры для практики",
      lang_h: "Помощь на твоём языке",
      chal_l: "Челлендж дня",
      hello_l: "Деннис на твоём языке",
      mem_l: "Прогресс и напоминание",
    },
    ar: {
      lvl_q: "ما مستوى لغتك الألمانية؟",
      lvl_hint: "اضغط على مستواك وسأريك الخطوة الأولى.",
      lv_a0: "أنا في البداية",
      lv_a1: "جمل أولى",
      lv_a2: "الحياة اليومية",
      lv_b1: "محادثات",
      lv_b2: "العمل",
      lvl_unk: "لا أعرف",
      go_start: "ابدأ الآن",
      go_lessons: "افتح الدروس",
      go_cont: "تابع",
      free: "مجاني · من A1 إلى B2 · بدون تسجيل",
      paths_h: "اختر طريقك",
      games_h: "ألعاب للتدريب",
      lang_h: "مساعدة بلغتك",
      chal_l: "تحدّي اليوم",
      hello_l: "دينيس بلغتك",
      mem_l: "تقدّمي والتذكير",
    },
    tr: {
      lvl_q: "Almancan ne kadar iyi?",
      lvl_hint: "Seviyene dokun. Sana ilk adımı göstereyim.",
      lv_a0: "Yeni başlıyorum",
      lv_a1: "İlk cümleler",
      lv_a2: "Günlük hayat",
      lv_b1: "Sohbetler",
      lv_b2: "İş",
      lvl_unk: "Bilmiyorum",
      go_start: "Şimdi başla",
      go_lessons: "Dersleri aç",
      go_cont: "Devam et",
      free: "Ücretsiz · A1'den B2'ye · kayıt gerekmez",
      paths_h: "Yolunu seç",
      games_h: "Alıştırma oyunları",
      lang_h: "Kendi dilinde yardım",
      chal_l: "Günün meydan okuması",
      hello_l: "Dennis kendi dilinde",
      mem_l: "İlerleme ve hatırlatma",
    },
    fa: {
      lvl_q: "آلمانی تو چقدر خوب است؟",
      lvl_hint: "روی سطح خودت بزن. قدم اول را نشانت می‌دهم.",
      lv_a0: "تازه شروع می‌کنم",
      lv_a1: "جمله‌های اول",
      lv_a2: "زندگی روزمره",
      lv_b1: "گفتگو",
      lv_b2: "کار",
      lvl_unk: "نمی‌دانم",
      go_start: "همین حالا شروع کن",
      go_lessons: "باز کردن درس‌ها",
      go_cont: "ادامه",
      free: "رایگان · از A1 تا B2 · بدون ثبت‌نام",
      paths_h: "راه خودت را انتخاب کن",
      games_h: "بازی برای تمرین",
      lang_h: "راهنمایی به زبان خودت",
      chal_l: "چالش روز",
      hello_l: "دنیس به زبان تو",
      mem_l: "پیشرفت و یادآوری",
    },
    es: {
      lvl_q: "¿Qué tan bueno es tu alemán?",
      lvl_hint: "Toca tu nivel. Te muestro el primer paso.",
      lv_a0: "Estoy empezando",
      lv_a1: "Primeras frases",
      lv_a2: "Vida cotidiana",
      lv_b1: "Conversaciones",
      lv_b2: "Trabajo",
      lvl_unk: "No lo sé",
      go_start: "Empezar ahora",
      go_lessons: "Abrir lecciones",
      go_cont: "Continuar",
      free: "Gratis · de A1 a B2 · sin registro",
      paths_h: "Elige tu camino",
      games_h: "Juegos para practicar",
      lang_h: "Ayuda en tu idioma",
      chal_l: "Reto del día",
      hello_l: "Dennis en tu idioma",
      mem_l: "Progreso y recordatorio",
    },
    it: {
      lvl_q: "Quanto è buono il tuo tedesco?",
      lvl_hint: "Tocca il tuo livello. Ti mostro il primo passo.",
      lv_a0: "Sto iniziando",
      lv_a1: "Prime frasi",
      lv_a2: "Vita quotidiana",
      lv_b1: "Conversazioni",
      lv_b2: "Lavoro",
      lvl_unk: "Non lo so",
      go_start: "Inizia ora",
      go_lessons: "Apri le lezioni",
      go_cont: "Continua",
      free: "Gratis · da A1 a B2 · senza registrazione",
      paths_h: "Scegli il tuo percorso",
      games_h: "Giochi per esercitarti",
      lang_h: "Aiuto nella tua lingua",
      chal_l: "Sfida del giorno",
      hello_l: "Dennis nella tua lingua",
      mem_l: "Progressi e promemoria",
    },
  };
  const KEY = "dmd.lang";
  function read() {
    try {
      const v = localStorage.getItem(KEY);
      if (v && D[v]) return v;
    } catch (_) {}
    return null;
  }
  function detect() {
    const n = (navigator.language || "de").slice(0, 2).toLowerCase();
    return D[n] && n !== "de" ? n : "de";
  }
  let cur = read() || detect();
  const t = (k, l) => (D[l || cur] && D[l || cur][k]) || D.de[k] || "";
  function apply(root) {
    root = root || document;
    root.querySelectorAll("[data-i18n]").forEach((el) => {
      const txt = t(el.dataset.i18n);
      if (txt && el.textContent !== txt) el.textContent = txt;
      el.lang = cur;
    });
    root.querySelectorAll("[data-i18n-dir]").forEach((el) => {
      el.dir = RTL.indexOf(cur) > -1 ? "rtl" : "ltr";
    });
    root.querySelectorAll("[data-lang-set]").forEach((b) => {
      b.setAttribute("aria-pressed", String(b.dataset.langSet === cur));
    });
  }
  function set(l) {
    if (!D[l]) return;
    cur = l;
    try {
      localStorage.setItem(KEY, l);
    } catch (_) {}
    apply(document);
  }

  /* Greeting of Dennis in seven languages (text for the #hallo page and for the voice recording). Please have native speakers check. */
  DM.hallo = [
    ["uk", "Українська", "Привіт, я Деніс, твій викладач німецької. На цьому сайті ти безкоштовно вивчаєш німецьку крок за кроком. Натисни свій рівень на головній сторінці, і я покажу тобі перший крок. Ти впораєшся. Успіхів!"],
    ["ru", "Русский", "Привет, я Деннис, твой учитель немецкого. На этом сайте ты бесплатно учишь немецкий шаг за шагом. Нажми на свой уровень на главной странице, и я покажу тебе первый шаг. У тебя всё получится. Удачи!"],
    ["ar", "العربية", "مرحباً، أنا دينيس، مدرّس اللغة الألمانية. في هذا الموقع تتعلّم الألمانية مجاناً خطوة بعد خطوة. اضغط على مستواك في الصفحة الرئيسية وسأريك الخطوة الأولى. أنت قادر على ذلك. بالتوفيق!"],
    ["fa", "فارسی", "سلام، من دنیس هستم، معلم زبان آلمانی تو. در این سایت رایگان و قدم به قدم آلمانی یاد می‌گیری. در صفحهٔ اصلی روی سطح خودت بزن تا قدم اول را نشانت بدهم. تو می‌توانی. موفق باشی!"],
    ["tr", "Türkçe", "Merhaba, ben Dennis, Almanca öğretmenin. Bu sitede Almancayı ücretsiz ve adım adım öğrenirsin. Ana sayfada seviyene dokun, sana ilk adımı göstereyim. Başarabilirsin. Bol şans!"],
    ["es", "Español", "Hola, soy Dennis, tu profesor de alemán. En esta página aprendes alemán gratis, paso a paso. Toca tu nivel en la página de inicio y te muestro el primer paso. Tú puedes. ¡Mucho éxito!"],
    ["it", "Italiano", "Ciao, sono Dennis, il tuo insegnante di tedesco. Su questo sito impari il tedesco gratis, passo dopo passo. Tocca il tuo livello nella pagina iniziale e ti mostro il primo passo. Ce la farai. Buona fortuna!"],
  ];
  DM.hi18n = { langs: LANGS, t, apply, set, get: () => cur };
})();
