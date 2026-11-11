/* Course (#kurs, #kurs/<level>) and placement test (#einstufung).
   Data: kurs-data.js (DM.kurs). State: DM.store.kurs = { done: { "A1:#lektion/ankommen": ts }, test: {...} }.
   Public API (window.DMKurs):
     visit(routeStr)  – called by the router on every route change; ticks steps off automatically
     next(level)      – { href, title, done, total, courseHref, allDone } or null (unknown level)
     levels           – ['A0','A1','A2','B1','B2']
     t(key, vars)     – UI string in the learner's language (fallback German)
   A step counts as done when its route was open for 45 s (visible tab) or the learner went one level deeper inside it.
   The review step (#fehler) appears once per unit: it is ticked off for the first unit whose other steps are all done. */
(function () {
  "use strict";
  const DM = window.DM || (window.DM = {});
  const LEVELS = ["A0", "A1", "A2", "B1", "B2"];
  const DWELL = 45000,
    DWELL_REVIEW = 15000;
  const EXAMS = {
    A2: [["Probeprüfung DTZ", "#simulation/dtz"]],
    B1: [
      ["Probeprüfung DTZ", "#simulation/dtz"],
      ["Probeprüfung telc B1", "#simulation/telc-b1"],
      ["Probeprüfung DTB B1", "#simulation/dtb-b1"],
    ],
    B2: [
      ["Probeprüfung telc B2", "#simulation/telc-b2"],
      ["Probeprüfung DTB B2", "#simulation/dtb-b2"],
    ],
  };
  const esc = (s) =>
    String(s ?? "").replace(
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

  /* ---------- UI strings in nine languages (step titles stay German) ---------- */
  const I = {
    de: {
      kurs_h: "Dein Deutschkurs",
      kurs_lead: "Schritt für Schritt von A0 bis B2. Wähle dein Niveau.",
      steps_n: "{n} Schritte",
      prog: "{n} von {m} erledigt",
      your_level: "Dein Niveau",
      open: "Kurs öffnen",
      find_level:
        "Du kennst dein Niveau nicht? Mach den Einstufungstest (5 Minuten).",
      next: "Nächster Schritt",
      auto: "Du musst nichts abhaken. Öffne einen Schritt und lerne. Der Kurs merkt sich das.",
      done: "Erledigt",
      notdone: "Nicht erledigt",
      alldone: "Geschafft! Du hast alle Schritte gemacht.",
      nextcourse: "Weiter mit Kurs {lv}",
      exam: "Zur Probeprüfung",
      other: "Anderes Niveau wählen",
      test_h: "Einstufungstest",
      test_lead:
        "16 Fragen, ungefähr 5 Minuten. Danach weißt du, welcher Kurs zu dir passt.",
      q0: "Kannst du schon etwas Deutsch?",
      q0_no: "Nein, ich fange an",
      q0_yes: "Ja, ich kann schon etwas Deutsch",
      instr: "Tippe auf die richtige Antwort. Nur eine Antwort ist richtig.",
      idk: "Das weiß ich nicht",
      idk_hint:
        "Bitte nicht raten. Wenn du die Antwort nicht weißt, tippe auf „Das weiß ich nicht“.",
      qof: "Frage {n} von {m}",
      weiter: "Weiter",
      res_h: "Dein Niveau: ungefähr {lv}",
      res_a0: "Du fängst neu an. Dein Kurs: A0",
      res_note:
        "Das ist nur eine Orientierung und kein offizieller Test. Du kannst das Niveau immer ändern.",
      res_stop: "Der Test endet hier, weil die nächsten Fragen zu schwer sind.",
      start: "Kurs {lv} starten",
      again: "Test noch einmal machen",
      correct: "Richtige Antworten",
      read: "Lies den Text.",
      last_result: "Dein letztes Ergebnis: {lv}",
    },
    en: {
      kurs_h: "Your German course",
      kurs_lead: "Step by step from A0 to B2. Choose your level.",
      steps_n: "{n} steps",
      prog: "{n} of {m} done",
      your_level: "Your level",
      open: "Open course",
      find_level:
        "Not sure about your level? Take the placement test (5 minutes).",
      next: "Next step",
      auto: "You don’t need to tick anything. Open a step and learn. The course remembers it.",
      done: "Done",
      notdone: "Not done",
      alldone: "Well done! You have completed all steps.",
      nextcourse: "Continue with course {lv}",
      exam: "Go to the practice exam",
      other: "Choose another level",
      test_h: "Placement test",
      test_lead:
        "16 questions, about 5 minutes. Then you know which course fits you.",
      q0: "Do you already know some German?",
      q0_no: "No, I am just starting",
      q0_yes: "Yes, I know some German",
      instr: "Tap the correct answer. Only one answer is correct.",
      idk: "I don’t know",
      idk_hint:
        "Please don’t guess. If you don’t know the answer, tap “I don’t know”.",
      qof: "Question {n} of {m}",
      weiter: "Next",
      res_h: "Your level: about {lv}",
      res_a0: "You are starting from the beginning. Your course: A0",
      res_note:
        "This is only a guide, not an official test. You can change your level at any time.",
      res_stop:
        "The test ends here because the next questions are too difficult.",
      start: "Start course {lv}",
      again: "Take the test again",
      correct: "Correct answers",
      read: "Read the text.",
      last_result: "Your last result: {lv}",
    },
    uk: {
      kurs_h: "Твій курс німецької",
      kurs_lead: "Крок за кроком від A0 до B2. Обери свій рівень.",
      steps_n: "Кроків: {n}",
      prog: "Виконано: {n} з {m}",
      your_level: "Твій рівень",
      open: "Відкрити курс",
      find_level:
        "Не знаєш свого рівня? Пройди тест на визначення рівня (5 хвилин).",
      next: "Наступний крок",
      auto: "Нічого не треба відмічати. Відкрий крок і вчися. Курс запам’ятає це сам.",
      done: "Виконано",
      notdone: "Не виконано",
      alldone: "Чудово! Усі кроки виконано.",
      nextcourse: "Далі – курс {lv}",
      exam: "До пробного іспиту",
      other: "Обрати інший рівень",
      test_h: "Тест на визначення рівня",
      test_lead:
        "16 запитань, приблизно 5 хвилин. Після цього ти знатимеш, який курс тобі підходить.",
      q0: "Ти вже трохи знаєш німецьку?",
      q0_no: "Ні, я тільки починаю",
      q0_yes: "Так, я вже трохи знаю німецьку",
      instr: "Натисни на правильну відповідь. Правильна лише одна відповідь.",
      idk: "Не знаю",
      idk_hint:
        "Будь ласка, не вгадуй. Якщо не знаєш відповіді, натисни «Не знаю».",
      qof: "Запитання {n} з {m}",
      weiter: "Далі",
      res_h: "Твій рівень: приблизно {lv}",
      res_a0: "Ти починаєш з нуля. Твій курс: A0",
      res_note:
        "Це лише орієнтир, а не офіційний тест. Ти можеш будь-коли змінити рівень.",
      res_stop: "Тест закінчується тут, бо наступні запитання надто складні.",
      start: "Почати курс {lv}",
      again: "Пройти тест ще раз",
      correct: "Правильні відповіді",
      read: "Прочитай текст.",
      last_result: "Твій останній результат: {lv}",
    },
    ru: {
      kurs_h: "Твой курс немецкого",
      kurs_lead: "Шаг за шагом от A0 до B2. Выбери свой уровень.",
      steps_n: "Шагов: {n}",
      prog: "Выполнено: {n} из {m}",
      your_level: "Твой уровень",
      open: "Открыть курс",
      find_level:
        "Не знаешь свой уровень? Пройди тест на определение уровня (5 минут).",
      next: "Следующий шаг",
      auto: "Ничего отмечать не нужно. Открой шаг и занимайся. Курс запомнит это сам.",
      done: "Выполнено",
      notdone: "Не выполнено",
      alldone: "Отлично! Все шаги выполнены.",
      nextcourse: "Дальше – курс {lv}",
      exam: "К пробному экзамену",
      other: "Выбрать другой уровень",
      test_h: "Тест на определение уровня",
      test_lead:
        "16 вопросов, примерно 5 минут. После этого ты узнаешь, какой курс тебе подходит.",
      q0: "Ты уже немного знаешь немецкий?",
      q0_no: "Нет, я только начинаю",
      q0_yes: "Да, я уже немного знаю немецкий",
      instr: "Нажми на правильный ответ. Правильный ответ только один.",
      idk: "Не знаю",
      idk_hint:
        "Пожалуйста, не угадывай. Если не знаешь ответ, нажми «Не знаю».",
      qof: "Вопрос {n} из {m}",
      weiter: "Дальше",
      res_h: "Твой уровень: примерно {lv}",
      res_a0: "Ты начинаешь с нуля. Твой курс: A0",
      res_note:
        "Это только ориентир, а не официальный тест. Уровень можно изменить в любой момент.",
      res_stop:
        "Тест заканчивается здесь, потому что следующие вопросы слишком сложные.",
      start: "Начать курс {lv}",
      again: "Пройти тест ещё раз",
      correct: "Правильные ответы",
      read: "Прочитай текст.",
      last_result: "Твой последний результат: {lv}",
    },
    ar: {
      kurs_h: "دورتك لتعلّم الألمانية",
      kurs_lead: "خطوة بخطوة من A0 إلى B2. اختر مستواك.",
      steps_n: "عدد الخطوات: {n}",
      prog: "تم إنجاز {n} من {m}",
      your_level: "مستواك",
      open: "افتح الدورة",
      find_level: "لا تعرف مستواك؟ جرّب اختبار تحديد المستوى (5 دقائق).",
      next: "الخطوة التالية",
      auto: "لا تحتاج إلى وضع أي علامة. افتح الخطوة وتعلّم، والدورة تحفظ تقدّمك تلقائياً.",
      done: "تمّ",
      notdone: "لم يتمّ",
      alldone: "أحسنت! لقد أنجزت كل الخطوات.",
      nextcourse: "تابع مع دورة {lv}",
      exam: "إلى الامتحان التجريبي",
      other: "اختر مستوى آخر",
      test_h: "اختبار تحديد المستوى",
      test_lead: "16 سؤالاً، حوالي 5 دقائق. بعدها تعرف أي دورة تناسبك.",
      q0: "هل تعرف شيئاً من الألمانية؟",
      q0_no: "لا، أنا أبدأ من البداية",
      q0_yes: "نعم، أعرف بعض الألمانية",
      instr: "اضغط على الإجابة الصحيحة. إجابة واحدة فقط صحيحة.",
      idk: "لا أعرف",
      idk_hint: "من فضلك لا تخمّن. إذا لم تعرف الإجابة، اضغط على «لا أعرف».",
      qof: "السؤال {n} من {m}",
      weiter: "التالي",
      res_h: "مستواك: تقريباً {lv}",
      res_a0: "أنت تبدأ من البداية. دورتك: A0",
      res_note:
        "هذا مجرد توجيه وليس اختباراً رسمياً. يمكنك تغيير المستوى في أي وقت.",
      res_stop: "ينتهي الاختبار هنا لأن الأسئلة التالية صعبة جداً.",
      start: "ابدأ دورة {lv}",
      again: "أعد الاختبار",
      correct: "الإجابات الصحيحة",
      read: "اقرأ النص.",
      last_result: "نتيجتك الأخيرة: {lv}",
    },
    fa: {
      kurs_h: "دورهٔ آلمانی تو",
      kurs_lead: "قدم به قدم از A0 تا B2. سطح خودت را انتخاب کن.",
      steps_n: "تعداد قدم‌ها: {n}",
      prog: "{n} از {m} انجام شد",
      your_level: "سطح تو",
      open: "باز کردن دوره",
      find_level:
        "سطح خودت را نمی‌دانی؟ آزمون تعیین سطح را انجام بده (5 دقیقه).",
      next: "قدم بعدی",
      auto: "لازم نیست چیزی را تیک بزنی. یک قدم را باز کن و یاد بگیر. دوره خودش آن را به خاطر می‌سپارد.",
      done: "انجام شد",
      notdone: "انجام نشده",
      alldone: "آفرین! همهٔ قدم‌ها را انجام دادی.",
      nextcourse: "ادامه با دورهٔ {lv}",
      exam: "رفتن به آزمون آزمایشی",
      other: "انتخاب سطح دیگر",
      test_h: "آزمون تعیین سطح",
      test_lead:
        "16 سؤال، حدود 5 دقیقه. بعد می‌دانی کدام دوره برای تو مناسب است.",
      q0: "آیا کمی آلمانی بلدی؟",
      q0_no: "نه، تازه شروع می‌کنم",
      q0_yes: "بله، کمی آلمانی بلدم",
      instr: "روی جواب درست بزن. فقط یک جواب درست است.",
      idk: "نمی‌دانم",
      idk_hint: "لطفاً حدس نزن. اگر جواب را نمی‌دانی، روی «نمی‌دانم» بزن.",
      qof: "سؤال {n} از {m}",
      weiter: "بعدی",
      res_h: "سطح تو: تقریباً {lv}",
      res_a0: "تو از اول شروع می‌کنی. دورهٔ تو: A0",
      res_note:
        "این فقط یک راهنمایی است و آزمون رسمی نیست. هر وقت بخواهی می‌توانی سطح را عوض کنی.",
      res_stop: "آزمون اینجا تمام می‌شود، چون سؤال‌های بعدی خیلی سخت هستند.",
      start: "شروع دورهٔ {lv}",
      again: "تکرار آزمون",
      correct: "جواب‌های درست",
      read: "متن را بخوان.",
      last_result: "آخرین نتیجهٔ تو: {lv}",
    },
    tr: {
      kurs_h: "Almanca kursun",
      kurs_lead: "A0’dan B2’ye adım adım. Seviyeni seç.",
      steps_n: "{n} adım",
      prog: "{n} / {m} tamamlandı",
      your_level: "Seviyen",
      open: "Kursu aç",
      find_level:
        "Seviyeni bilmiyor musun? Seviye belirleme testini yap (5 dakika).",
      next: "Sonraki adım",
      auto: "Hiçbir şeyi işaretlemene gerek yok. Bir adımı aç ve öğren. Kurs bunu kendisi kaydeder.",
      done: "Tamamlandı",
      notdone: "Tamamlanmadı",
      alldone: "Harika! Bütün adımları tamamladın.",
      nextcourse: "{lv} kursuyla devam et",
      exam: "Deneme sınavına git",
      other: "Başka bir seviye seç",
      test_h: "Seviye belirleme testi",
      test_lead:
        "16 soru, yaklaşık 5 dakika. Sonra hangi kursun sana uygun olduğunu öğrenirsin.",
      q0: "Biraz Almanca biliyor musun?",
      q0_no: "Hayır, yeni başlıyorum",
      q0_yes: "Evet, biraz Almanca biliyorum",
      instr: "Doğru cevaba dokun. Yalnızca bir cevap doğru.",
      idk: "Bilmiyorum",
      idk_hint: "Lütfen tahmin etme. Cevabı bilmiyorsan “Bilmiyorum”a dokun.",
      qof: "Soru {n} / {m}",
      weiter: "İleri",
      res_h: "Seviyen: yaklaşık {lv}",
      res_a0: "Baştan başlıyorsun. Kursun: A0",
      res_note:
        "Bu yalnızca bir yönlendirmedir, resmî bir sınav değildir. Seviyeni istediğin zaman değiştirebilirsin.",
      res_stop: "Test burada bitiyor, çünkü sonraki sorular çok zor.",
      start: "{lv} kursuna başla",
      again: "Testi tekrar yap",
      correct: "Doğru cevaplar",
      read: "Metni oku.",
      last_result: "Son sonucun: {lv}",
    },
    es: {
      kurs_h: "Tu curso de alemán",
      kurs_lead: "Paso a paso de A0 a B2. Elige tu nivel.",
      steps_n: "{n} pasos",
      prog: "{n} de {m} completados",
      your_level: "Tu nivel",
      open: "Abrir el curso",
      find_level: "¿No sabes tu nivel? Haz la prueba de nivel (5 minutos).",
      next: "Siguiente paso",
      auto: "No tienes que marcar nada. Abre un paso y aprende. El curso lo recuerda solo.",
      done: "Hecho",
      notdone: "Sin hacer",
      alldone: "¡Muy bien! Has completado todos los pasos.",
      nextcourse: "Continuar con el curso {lv}",
      exam: "Ir al examen de práctica",
      other: "Elegir otro nivel",
      test_h: "Prueba de nivel",
      test_lead:
        "16 preguntas, unos 5 minutos. Después sabrás qué curso te conviene.",
      q0: "¿Ya sabes algo de alemán?",
      q0_no: "No, empiezo desde cero",
      q0_yes: "Sí, ya sé algo de alemán",
      instr: "Toca la respuesta correcta. Solo una respuesta es correcta.",
      idk: "No lo sé",
      idk_hint:
        "Por favor, no adivines. Si no sabes la respuesta, toca «No lo sé».",
      qof: "Pregunta {n} de {m}",
      weiter: "Siguiente",
      res_h: "Tu nivel: aproximadamente {lv}",
      res_a0: "Empiezas desde cero. Tu curso: A0",
      res_note:
        "Es solo una orientación, no un examen oficial. Puedes cambiar de nivel cuando quieras.",
      res_stop:
        "La prueba termina aquí porque las siguientes preguntas son demasiado difíciles.",
      start: "Empezar el curso {lv}",
      again: "Repetir la prueba",
      correct: "Respuestas correctas",
      read: "Lee el texto.",
      last_result: "Tu último resultado: {lv}",
    },
    it: {
      kurs_h: "Il tuo corso di tedesco",
      kurs_lead: "Passo dopo passo da A0 a B2. Scegli il tuo livello.",
      steps_n: "{n} passi",
      prog: "{n} di {m} completati",
      your_level: "Il tuo livello",
      open: "Apri il corso",
      find_level:
        "Non conosci il tuo livello? Fai il test di livello (5 minuti).",
      next: "Prossimo passo",
      auto: "Non devi spuntare niente. Apri un passo e studia. Il corso lo ricorda da solo.",
      done: "Fatto",
      notdone: "Non fatto",
      alldone: "Ottimo lavoro! Hai completato tutti i passi.",
      nextcourse: "Continua con il corso {lv}",
      exam: "Vai all’esame di prova",
      other: "Scegli un altro livello",
      test_h: "Test di livello",
      test_lead:
        "16 domande, circa 5 minuti. Poi saprai quale corso fa per te.",
      q0: "Sai già un po’ di tedesco?",
      q0_no: "No, comincio da zero",
      q0_yes: "Sì, so già un po’ di tedesco",
      instr: "Tocca la risposta giusta. Solo una risposta è corretta.",
      idk: "Non lo so",
      idk_hint:
        "Per favore, non tirare a indovinare. Se non sai la risposta, tocca «Non lo so».",
      qof: "Domanda {n} di {m}",
      weiter: "Avanti",
      res_h: "Il tuo livello: circa {lv}",
      res_a0: "Cominci da zero. Il tuo corso: A0",
      res_note:
        "È solo un orientamento, non un test ufficiale. Puoi cambiare livello quando vuoi.",
      res_stop:
        "Il test finisce qui perché le prossime domande sono troppo difficili.",
      start: "Inizia il corso {lv}",
      again: "Ripeti il test",
      correct: "Risposte corrette",
      read: "Leggi il testo.",
      last_result: "Il tuo ultimo risultato: {lv}",
    },
  };
  const RTL = ["ar", "fa"];
  const lang = () => {
    try {
      const l = DM.hi18n && DM.hi18n.get && DM.hi18n.get();
      return I[l] ? l : "de";
    } catch {
      return "de";
    }
  };
  const fill = (s, v) =>
    s.replace(/\{(\w+)\}/g, (_, k) => (v && v[k] != null ? v[k] : ""));
  const t = (k, v, l) => fill((I[l || lang()] || {})[k] || I.de[k] || "", v);
  /* German text + (if another language is chosen) the translation beneath in smaller type */
  const bi = (k, v) => {
    const l = lang(),
      de = `<span class="ku-de" lang="de">${esc(t(k, v, "de"))}</span>`;
    return l === "de"
      ? de
      : `${de}<small class="ku-tr" lang="${l}" dir="${RTL.includes(l) ? "rtl" : "ltr"}">${esc(t(k, v, l))}</small>`;
  };
  const langRow = () => {
    const H = DM.hi18n;
    if (!H || !H.langs) return "";
    return `<div class="dm-lang ku-lang" role="group" aria-label="${esc(H.t ? H.t("lang_h") : "Sprache")}" dir="ltr"><span aria-hidden="true">🌐</span>${H.langs.map(([c, n]) => `<button type="button" class="dm-lang-b" data-ku-lang="${c}" lang="${c}" aria-pressed="${c === lang()}">${esc(n)}</button>`).join("")}</div>`;
  };
  const wireLang = (redraw) =>
    document.querySelectorAll("[data-ku-lang]").forEach((b) => {
      b.onclick = () => {
        DM.hi18n.set(b.dataset.kuLang);
        redraw();
      };
    });

  /* ---------- state ---------- */
  const fallback = { done: {}, test: null };
  const state = () => {
    const st = DM.store;
    if (!st) return fallback;
    if (!st.kurs || typeof st.kurs !== "object")
      st.kurs = { done: {}, test: null };
    if (!st.kurs.done || typeof st.kurs.done !== "object") st.kurs.done = {};
    return st.kurs;
  };
  const save = () => {
    try {
      DM.save && DM.save();
    } catch {
      /* private mode */
    }
  };

  /* flat list of steps of a level, each with a stable key and its position */
  const flatCache = {};
  function flat(lv) {
    if (flatCache[lv]) return flatCache[lv];
    const c = DM.kurs && DM.kurs[lv];
    if (!c) return [];
    const seen = {},
      out = [];
    c.units.forEach((u, ui) =>
      u.steps.forEach((s, si) => {
        const occ = (seen[s.href] = (seen[s.href] || 0) + 1);
        out.push({
          t: s.t,
          href: s.href,
          kind: s.kind,
          min: s.min,
          unit: ui,
          pos: si,
          last: si === u.steps.length - 1,
          no: out.length + 1,
          route: s.href.replace(/^#/, ""),
          key: lv + ":" + s.href + (occ > 1 ? "~" + occ : ""),
        });
      }),
    );
    return (flatCache[lv] = out);
  }
  const isDone = (s) => !!state().done[s.key];
  const dur = (min) =>
    min >= 60
      ? `ca. ${String(Math.round(min / 30) / 2).replace(".", ",")} Std.`
      : `${min} Min.`;

  function next(lv) {
    lv = String(lv || "").toUpperCase();
    if (!DM.kurs || !DM.kurs[lv]) return null;
    const f = flat(lv),
      n = f.find((s) => !isDone(s)),
      courseHref = "#kurs/" + lv;
    return {
      href: n ? n.href : courseHref,
      title: n ? n.t : "",
      kind: n ? n.kind : "",
      min: n ? n.min : 0,
      done: f.filter(isDone).length,
      total: f.length,
      courseHref,
      allDone: !n,
    };
  }

  /* ---------- automatic completion ---------- */
  let cur = null,
    tick = null;
  const norm = (r) => {
    const p = String(r || "")
      .replace(/^#/, "")
      .replace(/^\/+/, "")
      .split("/")
      .filter(Boolean);
    if (p[0]) p[0] = p[0].toLowerCase();
    return p.join("/");
  };
  /* steps that the given route can tick off right now (not done yet; a repeated review step only when the rest of its unit is done) */
  function candidates(route) {
    const out = [];
    LEVELS.forEach((lv) => {
      const f = flat(lv),
        same = f.filter((s) => s.route === route && !isDone(s));
      if (!same.length) return;
      if (f.filter((s) => s.route === route).length === 1) {
        out.push(same[0]);
        return;
      }
      const ok = same.find((s) =>
        f.every((o) => o.unit !== s.unit || o === s || isDone(o)),
      );
      if (ok) out.push(ok);
    });
    return out;
  }
  function credit(route) {
    const c = candidates(route);
    if (!c.length) return false;
    const d = state().done,
      now = Date.now();
    c.forEach((s) => {
      d[s.key] = now;
    });
    save();
    return true;
  }
  const stopTick = () => {
    if (tick) {
      clearInterval(tick);
      tick = null;
    }
  };
  function flush() {
    if (!cur) return;
    const now = Date.now();
    if (cur.visible) cur.acc += Math.min(now - cur.last, 5000); // cap: sleeping tabs must not count
    cur.last = now;
    cur.visible = document.visibilityState !== "hidden";
    if (cur.credited) return;
    const c = candidates(cur.route);
    if (!c.length) {
      stopTick();
      return;
    }
    const need = c.every((s) => s.kind === "Wiederholen")
      ? DWELL_REVIEW
      : DWELL;
    if (cur.acc >= need) {
      credit(cur.route);
      cur.credited = true;
      stopTick();
    }
  }
  function visit(routeStr) {
    const route = norm(routeStr);
    if (cur && cur.route === route) return;
    if (cur) {
      flush();
      if (!cur.credited && route.indexOf(cur.route + "/") === 0)
        credit(cur.route); // went one level deeper inside the step
    }
    stopTick();
    cur = {
      route,
      acc: 0,
      last: Date.now(),
      visible: document.visibilityState !== "hidden",
      credited: false,
    };
    if (route && candidates(route).length) tick = setInterval(flush, 1000);
  }
  document.addEventListener("visibilitychange", flush);
  window.addEventListener("pagehide", flush);
  // fallback if the router does not call visit(): same normalised route string, so double calls are harmless
  const hashRoute = () => {
    try {
      return decodeURIComponent(location.hash);
    } catch {
      return location.hash;
    }
  };
  window.addEventListener("hashchange", () => visit(hashRoute()));
  document.addEventListener("DOMContentLoaded", () => {
    if (!cur) visit(hashRoute());
  });

  /* ---------- course pages ---------- */
  const page = (html, cls) => DM.page(html, "ku-page " + (cls || ""));
  const crumbs = (items) => (DM.crumbs ? DM.crumbs(items) : "");
  const bar = (d, n) =>
    `<div class="dm-progress ku-progress" role="progressbar" aria-valuemin="0" aria-valuemax="${n}" aria-valuenow="${d}" aria-label="Fortschritt"><i style="width:${n ? Math.round((d / n) * 100) : 0}%"></i></div>`;

  function overview() {
    const mine = (DM.store && DM.store.level) || "",
      test = state().test;
    page(`${crumbs([["Kurs"]])}
      <div class="dm-head"><h1>${esc(t("kurs_h", null, "de"))}</h1><p class="dm-lead ku-bi">${bi("kurs_lead")}</p></div>
      ${langRow()}
      <ul class="ku-levels">${LEVELS.filter((lv) => DM.kurs && DM.kurs[lv])
        .map((lv) => {
          const c = DM.kurs[lv],
            n = next(lv),
            is = lv === mine;
          return `<li><a class="ku-level${is ? " is-mine" : ""}" href="#kurs/${lv}">
          <span class="ku-level-lv" aria-hidden="true">${lv}</span>
          <span class="ku-level-body">${is ? `<span class="dm-tag ku-bi">${bi("your_level")}</span>` : ""}<b>Kurs ${lv} · ${esc(c.title)}</b><span class="ku-level-goal">${esc(c.goal)}</span>
            ${bar(n.done, n.total)}<span class="ku-level-prog ku-bi">${n.done ? bi("prog", { n: n.done, m: n.total }) : bi("steps_n", { n: n.total })}</span></span>
          <span class="ku-level-go" aria-hidden="true">▶</span></a></li>`;
        })
        .join("")}</ul>
      <a class="ku-find ku-bi" href="#einstufung"><span aria-hidden="true">🧭</span><span>${bi("find_level")}${test && test.level ? `<span class="ku-find-last ku-bi">${bi("last_result", { lv: test.level })}</span>` : ""}</span></a>`);
    wireLang(overview);
  }

  function course(lv) {
    const c = DM.kurs[lv],
      f = flat(lv),
      n = next(lv),
      nx = f.find((s) => !isDone(s));
    const st = state(),
      li = LEVELS.indexOf(lv),
      after = LEVELS[li + 1],
      exams = EXAMS[lv] || [];
    const top = nx
      ? `<a class="dm-btn ku-next" href="${esc(nx.href)}"><span class="ku-next-l ku-bi">${bi("next")}</span><b>${nx.no}. ${esc(nx.t)} <span aria-hidden="true">▶</span></b><small>${esc(nx.kind)} · ${dur(nx.min)}</small></a>
         <p class="dm-small ku-auto ku-bi">${bi("auto")}</p>`
      : `<section class="dm-card ku-finish" id="ku-finish"><h2 class="ku-bi"><span aria-hidden="true">🎉</span> ${bi("alldone")}</h2>
          <div class="dm-row">${after && DM.kurs[after] ? `<a class="dm-btn ku-bi" href="#kurs/${after}"><span>${bi("nextcourse", { lv: after })}</span> <span aria-hidden="true">▶</span></a>` : ""}
          ${exams.map(([lab, href]) => `<a class="dm-btn dm-btn-quiet" href="${href}">${esc(lab)}</a>`).join("")}</div></section>`;
    page(`${crumbs([["Kurs", "#kurs"], [lv]])}
      <div class="dm-head"><h1>Kurs ${lv} · ${esc(c.title)}</h1><p class="dm-lead">${esc(c.goal)}</p></div>
      ${bar(n.done, n.total)}
      <p class="dm-progress-text ku-bi">${bi("prog", { n: n.done, m: n.total })}</p>
      ${top}
      ${c.units
        .map((u, ui) => {
          const us = f.filter((s) => s.unit === ui),
            ud = us.filter(isDone).length;
          return `<section class="ku-unit${ud === us.length ? " is-done" : ""}" aria-labelledby="ku-u${ui}">
          <h2 id="ku-u${ui}"><span class="ku-unit-no">${ui + 1}</span><span>${esc(u.title)}</span><small>${ud}/${us.length}</small></h2>
          <ol class="ku-steps">${us
            .map((s) => {
              const d = isDone(s),
                isNext = nx === s;
              return `<li class="${d ? "is-done" : ""}${isNext ? " is-next" : ""}">
              <a class="ku-step" href="${esc(s.href)}"${isNext ? ' aria-current="step"' : ""}><span class="ku-no">${d ? '<span aria-hidden="true">✓</span><span class="dm-sr">erledigt: </span>' : s.no}</span>
                <span class="ku-step-body"><b>${esc(s.t)}</b><span class="ku-meta"><span class="dm-tag">${esc(s.kind)}</span> ${dur(s.min)}</span></span></a>
              <button type="button" class="ku-tog" data-ku-key="${esc(s.key)}" aria-pressed="${d}" aria-label="${esc(s.t)}: ${d ? "erledigt" : "nicht erledigt"} – tippen zum Ändern">${d ? "✓ " + esc(t("done", null, "de")) : esc(t("notdone", null, "de"))}</button></li>`;
            })
            .join("")}</ol></section>`;
        })
        .join("")}
      <p class="ku-foot"><a class="dm-btn dm-btn-quiet ku-bi" href="#kurs"><span>${bi("other")}</span></a>${exams.length && nx ? exams.map(([lab, href]) => `<a class="dm-btn dm-btn-quiet" href="${href}">${esc(lab)}</a>`).join("") : ""}</p>`);
    document.querySelectorAll("[data-ku-key]").forEach((b) => {
      b.onclick = () => {
        const k = b.dataset.kuKey,
          y = window.scrollY;
        if (st.done[k]) delete st.done[k];
        else st.done[k] = Date.now();
        save();
        course(lv);
        window.scrollTo(0, y);
        document
          .querySelector(`[data-ku-key="${CSS.escape(k)}"]`)
          ?.focus({ preventScroll: true });
      };
    });
    if (!nx) {
      st.cele = st.cele || {};
      if (!st.cele[lv]) {
        st.cele[lv] = Date.now();
        save();
        const el = document.getElementById("ku-finish");
        try {
          el && DM.celebrate && DM.celebrate(el);
        } catch {
          /* decoration only */
        }
      }
    } else if (st.cele && st.cele[lv]) {
      delete st.cele[lv];
      save();
    }
  }

  /* ---------- placement test ---------- */
  /* 4 items per level: grammar, vocabulary in context, short reading. a = index of the only correct option. Own items, no exam originals. */
  const ITEMS = [
    { lv: "A1", q: "Woher ______ du?", o: ["kommt", "kommst", "kommen"], a: 1 },
    {
      lv: "A1",
      q: "Ich habe Hunger. Ich möchte etwas ______.",
      o: ["essen", "schlafen", "lesen"],
      a: 0,
    },
    {
      lv: "A1",
      q: "Ich ______ zwei Kinder.",
      o: ["bin", "heiße", "habe"],
      a: 2,
    },
    {
      lv: "A1",
      text: "Die Bäckerei ist von Montag bis Samstag von 7 bis 18 Uhr geöffnet. Am Sonntag ist sie geschlossen.",
      q: "Wann kann man in der Bäckerei kein Brot kaufen?",
      o: ["Am Montag", "Am Samstag", "Am Sonntag"],
      a: 2,
    },

    {
      lv: "A2",
      q: "Gestern ______ ich den ganzen Tag zu Hause geblieben.",
      o: ["habe", "bin", "hat"],
      a: 1,
    },
    {
      lv: "A2",
      q: "Ich lerne Deutsch, weil ich in Deutschland ______.",
      o: ["möchte arbeiten", "arbeiten möchten", "arbeiten möchte"],
      a: 2,
    },
    {
      lv: "A2",
      q: "Ich habe starke Zahnschmerzen. Ich brauche schnell einen ______ beim Zahnarzt.",
      o: ["Termin", "Ausweis", "Vertrag", "Fahrplan"],
      a: 0,
    },
    {
      lv: "A2",
      text: "Liebe Frau Demir, leider kann ich morgen nicht zum Elternabend kommen, weil ich arbeiten muss. Können wir nächste Woche telefonieren? Viele Grüße, Olga Petrenko",
      q: "Warum kommt Frau Petrenko nicht zum Elternabend?",
      o: [
        "Sie ist krank.",
        "Sie muss arbeiten.",
        "Sie hat den Termin vergessen.",
      ],
      a: 1,
    },

    {
      lv: "B1",
      q: "Wenn ich mehr Zeit ______, würde ich öfter Sport machen.",
      o: ["habe", "hatte", "hätte", "wäre"],
      a: 2,
    },
    {
      lv: "B1",
      q: "Das ist der Kollege, ______ ich gestern geholfen habe.",
      o: ["dem", "den", "der", "dessen"],
      a: 0,
    },
    {
      lv: "B1",
      q: "Der Mietvertrag kann mit einer ______ von drei Monaten gekündigt werden.",
      o: ["Gebühr", "Quittung", "Mahnung", "Frist"],
      a: 3,
    },
    {
      lv: "B1",
      text: "Sehr geehrte Kundinnen und Kunden, wegen Bauarbeiten bleibt unsere Filiale in der Bahnhofstraße vom 3. bis zum 14. März geschlossen. In dieser Zeit sind wir in der Filiale am Marktplatz gern für Sie da. Den Geldautomaten in der Bahnhofstraße können Sie weiterhin nutzen.",
      q: "Was ist richtig?",
      o: [
        "Die Filiale am Marktplatz ist wegen Bauarbeiten geschlossen.",
        "Am Geldautomaten in der Bahnhofstraße bekommt man auch während der Bauarbeiten Geld.",
        "Die Filiale in der Bahnhofstraße schließt für immer.",
      ],
      a: 1,
    },

    {
      lv: "B2",
      q: "Der Bericht muss bis Freitag ______.",
      o: [
        "fertiggestellt werden",
        "fertiggestellt worden",
        "fertigstellen werden",
        "fertiggestellt wird",
      ],
      a: 0,
    },
    {
      lv: "B2",
      q: "Die noch ______ Unterlagen schicken wir Ihnen morgen zu.",
      o: ["fehlende", "gefehlten", "fehlenden", "fehlend"],
      a: 2,
    },
    {
      lv: "B2",
      q: "Wir müssen bald eine Entscheidung ______.",
      o: ["nehmen", "treffen", "stellen", "bringen"],
      a: 1,
    },
    {
      lv: "B2",
      text: "Ab dem kommenden Monat können Beschäftigte unserer Firma an bis zu zwei Tagen pro Woche von zu Hause aus arbeiten, sofern die Führungskraft zustimmt und betriebliche Gründe nicht dagegensprechen. Ein Anspruch auf Homeoffice besteht jedoch nicht.",
      q: "Welche Aussage passt zum Text?",
      o: [
        "Alle Beschäftigten haben ein Recht auf zwei Tage Homeoffice pro Woche.",
        "Über das Homeoffice entscheiden die Beschäftigten allein.",
        "Die Firma verbietet das Arbeiten von zu Hause aus.",
        "Homeoffice ist möglich, wenn die Führungskraft einverstanden ist.",
      ],
      a: 3,
    },
  ];
  const TEST_LEVELS = ["A1", "A2", "B1", "B2"];
  const fresh = () => ({
    phase: "start",
    i: 0,
    ans: [],
    pick: null,
    stopped: false,
  });
  let T = fresh();

  /* scores: { A1: 3, A2: 1 } (only levels that were asked). A level is passed with 3 of 4;
     2 of 4 still counts if the next level is passed with 3 of 4 (one slip should not send somebody back to the start). */
  function levelFrom(scores) {
    let res = "A0";
    for (let k = 0; k < TEST_LEVELS.length; k++) {
      const s = scores[TEST_LEVELS[k]],
        nx = scores[TEST_LEVELS[k + 1]];
      if (s == null) break;
      if (s >= 3 || (s === 2 && nx != null && nx >= 3)) res = TEST_LEVELS[k];
      else break;
    }
    return res;
  }
  function finish(skip) {
    const scores = {};
    T.ans.forEach((ok, i) => {
      const lv = ITEMS[i].lv;
      scores[lv] = (scores[lv] || 0) + (ok ? 1 : 0);
    });
    const level = skip ? "A0" : levelFrom(scores);
    T.phase = "result";
    T.result = {
      level,
      scores,
      asked: T.ans.length,
      skipped: !!skip,
      stopped: T.stopped,
    };
    state().test = {
      level,
      scores,
      asked: T.ans.length,
      skipped: !!skip,
      ts: Date.now(),
    };
    save();
    drawTest();
  }
  function answer(pick) {
    const it = ITEMS[T.i],
      ok = pick === it.a;
    T.ans.push(ok);
    if (!ok) {
      try {
        window.DMFehler &&
          DMFehler.add({
            q: (it.text ? it.text + " – " : "") + it.q,
            a: it.o[it.a],
            src: "Einstufungstest",
            level: it.lv,
          });
      } catch {
        /* notebook is optional */
      }
    }
    const missed = T.ans.filter((v, i) => !v && ITEMS[i].lv === it.lv).length;
    T.i++;
    T.pick = null;
    if (missed >= 3 && T.i < ITEMS.length) {
      T.stopped = true;
      return finish();
    }
    if (T.i >= ITEMS.length) return finish();
    drawTest();
  }
  const testHead = () => `${crumbs([["Kurs", "#kurs"], ["Einstufungstest"]])}`;
  function drawTest() {
    if (T.phase === "start") {
      const last = state().test;
      page(
        `${testHead()}
        <div class="dm-head"><h1>${esc(t("test_h", null, "de"))}</h1><p class="dm-lead ku-bi">${bi("test_lead")}</p></div>
        ${langRow()}
        <section class="dm-card ku-q">
          <h2 class="ku-q-h ku-bi">${bi("q0")}</h2>
          <div class="ku-opts">
            <button type="button" class="ku-opt ku-bi" data-ku-q0="no"><span class="ku-opt-ico" aria-hidden="true">🌱</span><span>${bi("q0_no")}</span></button>
            <button type="button" class="ku-opt ku-bi" data-ku-q0="yes"><span class="ku-opt-ico" aria-hidden="true">💬</span><span>${bi("q0_yes")}</span></button>
          </div>
        </section>
        <p class="dm-small ku-bi">${bi("res_note")}</p>
        ${last && last.level ? `<p class="ku-foot"><a class="dm-btn dm-btn-quiet ku-bi" href="#kurs/${esc(last.level)}"><span>${bi("last_result", { lv: last.level })}</span></a></p>` : ""}`,
        "ku-test",
      );
      wireLang(drawTest);
      document.querySelector('[data-ku-q0="no"]').onclick = () => finish(true);
      document.querySelector('[data-ku-q0="yes"]').onclick = () => {
        T.phase = "q";
        T.i = 0;
        T.ans = [];
        T.pick = null;
        drawTest();
        focusTop();
      };
      return;
    }
    if (T.phase === "q") {
      const it = ITEMS[T.i],
        n = T.i + 1,
        m = ITEMS.length;
      page(
        `${testHead()}
        <div class="ku-test-top"><h1 class="ku-test-h1">${esc(t("test_h", null, "de"))}</h1><p class="ku-qof ku-bi" id="ku-qof" tabindex="-1">${bi("qof", { n, m })}</p></div>
        ${bar(T.i, m)}
        <section class="dm-card ku-q" aria-labelledby="ku-q-h">
          ${it.text ? `<p class="ku-read ku-bi">${bi("read")}</p><blockquote class="ku-text" lang="de">${esc(it.text)}</blockquote>` : ""}
          <h2 class="ku-q-h" id="ku-q-h" lang="de">${esc(it.q)}</h2>
          <div class="ku-opts" role="radiogroup" aria-labelledby="ku-q-h">
            ${it.o.map((o, k) => `<button type="button" class="ku-opt" role="radio" aria-checked="${T.pick === k}" data-ku-pick="${k}" lang="de"><span class="ku-opt-ico" aria-hidden="true">${"ABCD"[k]}</span><span>${esc(o)}</span></button>`).join("")}
            <button type="button" class="ku-opt ku-idk ku-bi" role="radio" aria-checked="${T.pick === -1}" data-ku-pick="-1"><span class="ku-opt-ico" aria-hidden="true">?</span><span>${bi("idk")}</span></button>
          </div>
          <button type="button" class="dm-btn ku-weiter ku-bi${T.pick === null ? " dm-btn-disabled" : ""}" id="ku-weiter" aria-disabled="${T.pick === null}"><span>${bi("weiter")}</span> <span aria-hidden="true">▶</span></button>
          <p class="dm-small ku-instr ku-bi">${bi("instr")}</p>
          ${T.i === 0 ? `<p class="dm-small ku-instr ku-bi">${bi("idk_hint")}</p>` : ""}
        </section>`,
        "ku-test",
      );
      document.querySelectorAll("[data-ku-pick]").forEach((b) => {
        b.onclick = () => {
          T.pick = Number(b.dataset.kuPick);
          document
            .querySelectorAll("[data-ku-pick]")
            .forEach((o) => o.setAttribute("aria-checked", String(o === b)));
          const w = document.getElementById("ku-weiter");
          w.classList.remove("dm-btn-disabled");
          w.setAttribute("aria-disabled", "false");
        };
      });
      document.getElementById("ku-weiter").onclick = () => {
        if (T.pick === null) return;
        answer(T.pick);
        focusTop();
      };
      return;
    }
    const r = T.result,
      lv = r.level;
    page(
      `${testHead()}
      <div class="dm-head ku-result"><h1>${esc(r.skipped ? t("res_a0", null, "de") : t("res_h", { lv }, "de"))}</h1>
        ${lang() !== "de" ? `<p class="ku-result-tr ku-bi"><small class="ku-tr" lang="${lang()}" dir="${RTL.includes(lang()) ? "rtl" : "ltr"}">${esc(r.skipped ? t("res_a0") : t("res_h", { lv }))}</small></p>` : ""}
        <p class="dm-lead">Kurs ${lv} · ${esc(DM.kurs[lv].title)}: ${esc(DM.kurs[lv].goal)}</p></div>
      <p class="ku-res-actions"><button type="button" class="dm-btn ku-start ku-bi" id="ku-start"><span>${bi("start", { lv })}</span> <span aria-hidden="true">▶</span></button>
        <a class="dm-btn dm-btn-quiet ku-bi" href="#kurs"><span>${bi("other")}</span></a></p>
      <aside class="dm-card ku-res-note"><p class="ku-bi">${bi("res_note")}</p>${r.stopped ? `<p class="ku-bi">${bi("res_stop")}</p>` : ""}</aside>
      ${
        r.skipped
          ? ""
          : `<section class="ku-scores" aria-labelledby="ku-sc-h"><h2 id="ku-sc-h" class="ku-bi">${bi("correct")}</h2>
        <ul>${TEST_LEVELS.map((l) => {
          const n = ITEMS.filter((it, i) => it.lv === l && i < r.asked).length;
          return n
            ? `<li><b>${l}</b><span class="ku-dots" aria-hidden="true">${Array.from({ length: 4 }, (_, k) => `<i class="${k < r.scores[l] ? "on" : k < n ? "off" : "na"}"></i>`).join("")}</span><span>${r.scores[l] || 0} / ${n}</span></li>`
            : "";
        }).join("")}</ul></section>`
      }
      <p class="ku-foot"><button type="button" class="dm-btn dm-btn-quiet ku-bi" id="ku-again"><span>${bi("again")}</span></button></p>`,
      "ku-test",
    );
    document.getElementById("ku-start").onclick = () => {
      if (DM.store) {
        DM.store.level = lv;
        save();
      }
      location.hash = "#kurs/" + lv;
    };
    document.getElementById("ku-again").onclick = () => {
      T = fresh();
      drawTest();
      focusTop();
    };
    const h1 = document.querySelector("main h1");
    if (h1) document.title = h1.textContent.trim() + " – Deutsch mit Dennis";
  }
  function focusTop() {
    window.scrollTo(0, 0);
    const el =
      document.getElementById("ku-qof") || document.querySelector("main h1");
    if (el) {
      if (!el.hasAttribute("tabindex")) el.setAttribute("tabindex", "-1");
      el.focus({ preventScroll: true });
    }
  }

  /* ---------- routes ---------- */
  DM.routes = DM.routes || {};
  DM.routes.kurs = (p) => {
    const lv = String(p[1] || "").toUpperCase();
    if (DM.kurs && DM.kurs[lv]) course(lv);
    else overview();
  };
  DM.routes.einstufung = () => {
    if (T.phase === "result") T = fresh();
    drawTest();
  };

  window.DMKurs = {
    visit,
    next,
    levels: LEVELS.slice(),
    t: (k, v) => t(k, v),
    steps: (lv) =>
      flat(lv).map((s) => ({
        t: s.t,
        href: s.href,
        kind: s.kind,
        min: s.min,
        key: s.key,
        done: isDone(s),
      })),
    placement: { items: ITEMS, levelFrom },
  };
})();
