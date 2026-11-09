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
    ["tr", "Türkçe"],
  ];
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
      el.dir = cur === "ar" ? "rtl" : "ltr";
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
  DM.hi18n = { langs: LANGS, t, apply, set, get: () => cur };
})();
