/* Kurstagebuch renderer (vanilla JS, no libraries).
   <body data-view="protokoll|ueben|uebersicht" data-date="YYYY-MM-DD">
   Data files (see SCHEMA.md): daten/tage.js (KT_TAGE), daten/<date>.js (KT_DAY), daten/<date>-ueben.js (KT_UEBEN).
   Browser storage (all optional, always inside try/catch):
     kt-lang            chosen translation language
     kt-ueben-<date>    exercise progress of one day (answers per set + summary for the overview)
     kt-karten-<date>   known flashcards + card direction
     kt-kann            self-assessment of the "Ich kann ..." goals */
(function () {
  'use strict';

  var BASE = '/kurstagebuch/';
  var SITE = 'https://deutsch-mit-dennis.de';
  var LANGS = ['uk', 'ar', 'fa', 'tr', 'ro', 'sq', 'mn', 'fr'];
  var RTL = { ar: 1, fa: 1 };
  var NATIVE = {
    uk: 'Українська', ar: 'العربية', fa: 'فارسی / دری', tr: 'Türkçe',
    ro: 'Română', sq: 'Shqip', mn: 'Монгол', fr: 'Français'
  };
  var GERMAN_NAME = {
    uk: 'Ukrainisch', ar: 'Arabisch', fa: 'Persisch/Dari', tr: 'Türkisch',
    ro: 'Rumänisch', sq: 'Albanisch', mn: 'Mongolisch', fr: 'Französisch'
  };
  var MONTHS = ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'];
  var WEEKDAYS = ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'];

  // Exercise instructions: German + LANGS order.
  var INSTR = {
    choice: ['Wählen Sie die richtige Antwort.', [
      'Виберіть правильну відповідь.',
      'اختر الإجابة الصحيحة.',
      'پاسخ درست را انتخاب کنید.',
      'Doğru cevabı seçin.',
      'Alegeți răspunsul corect.',
      'Zgjidhni përgjigjen e saktë.',
      'Зөв хариултыг сонгоно уу.',
      'Choisissez la bonne réponse.'
    ]],
    gap: ['Wählen Sie das richtige Wort für die Lücke.', [
      'Виберіть правильне слово для пропуску.',
      'اختر الكلمة الصحيحة للفراغ.',
      'کلمهٔ درست را برای جای خالی انتخاب کنید.',
      'Boşluk için doğru kelimeyi seçin.',
      'Alegeți cuvântul corect pentru spațiul liber.',
      'Zgjidhni fjalën e duhur për vendin bosh.',
      'Хоосон зайд тохирох зөв үгийг сонгоно уу.',
      'Choisissez le mot correct pour compléter la phrase.'
    ]],
    order: ['Tippen Sie die Wörter in der richtigen Reihenfolge an.', [
      'Натискайте на слова в правильному порядку.',
      'اضغط على الكلمات بالترتيب الصحيح.',
      'کلمه‌ها را به ترتیب درست لمس کنید.',
      'Kelimelere doğru sırayla dokunun.',
      'Atingeți cuvintele în ordinea corectă.',
      'Prekni fjalët sipas renditjes së saktë.',
      'Үгсийг зөв дарааллаар нь дарна уу.',
      'Touchez les mots dans le bon ordre.'
    ]],
    match: ['Was passt zusammen? Tippen Sie zuerst links, dann rechts.', [
      'Що підходить одне до одного? Натисніть спочатку ліворуч, потім праворуч.',
      'ما الذي يتطابق؟ اضغط أولًا على اليسار، ثم على اليمين.',
      'کدام‌ها با هم جورند؟ اول سمت چپ، بعد سمت راست را لمس کنید.',
      'Hangileri eşleşiyor? Önce sola, sonra sağa dokunun.',
      'Ce se potrivește? Atingeți mai întâi în stânga, apoi în dreapta.',
      'Çfarë përputhet? Prekni fillimisht majtas, pastaj djathtas.',
      'Аль нь тохирох вэ? Эхлээд зүүн талд, дараа нь баруун талд дарна уу.',
      'Qu’est-ce qui va ensemble ? Touchez d’abord à gauche, puis à droite.'
    ]],
    steckbrief: ['Schreiben Sie über sich. Nichts wird gesendet.', [
      'Напишіть про себе. Нічого не надсилається.',
      'اكتب عن نفسك. لا يتم إرسال أي شيء.',
      'دربارهٔ خودتان بنویسید. هیچ چیزی ارسال نمی‌شود.',
      'Kendiniz hakkında yazın. Hiçbir şey gönderilmez.',
      'Scrieți despre dumneavoastră. Nu se trimite nimic.',
      'Shkruani për veten. Asgjë nuk dërgohet.',
      'Өөрийнхөө тухай бичээрэй. Юу ч илгээгдэхгүй.',
      'Écrivez sur vous. Rien n’est envoyé.'
    ]]
  };

  // UI and feedback strings: German (very simple A1) + LANGS order.
  var UI = {
    ok: ['Richtig!', ['Правильно!', 'صحيح!', 'درست است!', 'Doğru!', 'Corect!', 'Saktë!', 'Зөв!', 'Correct !']],
    bad: ['Falsch.', ['Неправильно.', 'خطأ.', 'نادرست است.', 'Yanlış.', 'Greșit.', 'Gabim.', 'Буруу.', 'Faux.']],
    tapLeft: ['Tippen Sie zuerst links.', ['Спочатку натисніть ліворуч.', 'اضغط أولًا على اليسار.', 'اول سمت چپ را لمس کنید.',
      'Önce sola dokunun.', 'Atingeți mai întâi în stânga.', 'Prekni fillimisht majtas.', 'Эхлээд зүүн талд дарна уу.', 'Touchez d’abord à gauche.']],
    noMatch: ['Das passt nicht. Noch einmal!', ['Це не підходить. Спробуйте ще раз!', 'هذا غير مناسب. حاول مرة أخرى!',
      'این جور نیست. دوباره امتحان کنید!', 'Bu uymuyor. Tekrar deneyin!', 'Nu se potrivește. Încercați din nou!',
      'Nuk përputhet. Provoni përsëri!', 'Тохирохгүй байна. Дахин оролдоно уу!', 'Ça ne va pas ensemble. Essayez encore !']],
    pairsDone: ['Alle Paare gefunden!', ['Усі пари знайдено!', 'وجدت كل الأزواج!', 'همهٔ جفت‌ها را پیدا کردید!', 'Bütün eşleri buldunuz!',
      'Ați găsit toate perechile!', 'I gjetët të gjitha çiftet!', 'Бүх хосыг оллоо!', 'Vous avez trouvé toutes les paires !']],
    allWords: ['Tippen Sie zuerst alle Wörter an.', ['Спочатку натисніть на всі слова.', 'اضغط أولًا على كل الكلمات.',
      'اول همهٔ کلمه‌ها را لمس کنید.', 'Önce bütün kelimelere dokunun.', 'Atingeți mai întâi toate cuvintele.',
      'Prekni fillimisht të gjitha fjalët.', 'Эхлээд бүх үгийг дарна уу.', 'Touchez d’abord tous les mots.']],
    next: ['Weiter', ['Далі', 'التالي', 'بعدی', 'Devam', 'Mai departe', 'Vazhdo', 'Цааш', 'Suivant']],
    again: ['Nochmal', ['Ще раз', 'مرة أخرى', 'دوباره', 'Tekrar', 'Încă o dată', 'Edhe një herë', 'Дахин', 'Encore une fois']],
    neu: ['Neu', ['Заново', 'من جديد', 'از نو', 'Yeniden', 'De la capăt', 'Nga e para', 'Шинээр', 'Recommencer']],
    check: ['Prüfen', ['Перевірити', 'تحقّق', 'بررسی', 'Kontrol et', 'Verificați', 'Kontrollo', 'Шалгах', 'Vérifier']],
    finished: ['Fertig!', ['Готово!', 'انتهيت!', 'تمام شد!', 'Bitti!', 'Gata!', 'Mbaroi!', 'Дууслаа!', 'Terminé !']],
    fixErrors: ['Fehler üben', ['Повторити помилки', 'تدرّب على الأخطاء', 'تمرین اشتباه‌ها', 'Hataları çalış', 'Exersați greșelile',
      'Ushtro gabimet', 'Алдаагаа давтах', 'Revoir les erreurs']],
    toProtocol: ['Zum Protokoll', ['До конспекту уроку', 'إلى ملخص الدرس', 'به خلاصهٔ درس', 'Ders özetine', 'La rezumatul lecției',
      'Te përmbledhja e mësimit', 'Хичээлийн тэмдэглэл рүү', 'Vers le résumé du cours']],
    practice: ['Üben', ['Вправи', 'تمارين', 'تمرین', 'Alıştırmalar', 'Exerciții', 'Ushtrime', 'Дасгал', 'Exercices']],
    cards: ['Karteikarten', ['Картки зі словами', 'بطاقات الكلمات', 'کارت‌های لغت', 'Kelime kartları', 'Cartonașe cu cuvinte',
      'Kartela me fjalë', 'Үгийн карт', 'Cartes de vocabulaire']],
    know: ['Weiß ich', ['Знаю', 'أعرفها', 'بلدم', 'Biliyorum', 'Știu', 'E di', 'Мэднэ', 'Je sais']],
    notYet: ['Noch nicht', ['Ще ні', 'ليس بعد', 'هنوز نه', 'Henüz değil', 'Încă nu', 'Ende jo', 'Хараахан үгүй', 'Pas encore']],
    flip: ['Tippen Sie auf die Karte.', ['Натисніть на картку.', 'اضغط على البطاقة.', 'روی کارت بزنید.', 'Karta dokunun.',
      'Atingeți cartonașul.', 'Prekni kartelën.', 'Карт дээр дарна уу.', 'Touchez la carte.']],
    direction: ['Richtung wechseln', ['Змінити напрямок', 'تغيير الاتجاه', 'تغییر جهت', 'Yönü değiştir', 'Schimbați direcția',
      'Ndrysho drejtimin', 'Чиглэл солих', 'Changer de sens']],
    chooseLang: ['Wählen Sie oben Ihre Sprache.', ['Виберіть угорі свою мову.', 'اختر لغتك في الأعلى.', 'زبان خود را در بالا انتخاب کنید.',
      'Yukarıdan dilinizi seçin.', 'Alegeți mai sus limba dumneavoastră.', 'Zgjidhni gjuhën tuaj më lart.', 'Дээрээс хэлээ сонгоно уу.',
      'Choisissez votre langue en haut.']],
    cardsDone: ['Sie kennen alle Karten!', ['Ви знаєте всі картки!', 'أنت تعرف كل البطاقات!', 'همهٔ کارت‌ها را بلدید!',
      'Bütün kartları biliyorsunuz!', 'Știți toate cartonașele!', 'I dini të gjitha kartelat!', 'Та бүх картыг мэдэж байна!',
      'Vous connaissez toutes les cartes !']],
    share: ['Teilen', ['Поділитися', 'مشاركة', 'اشتراک‌گذاری', 'Paylaş', 'Distribuiți', 'Shpërndaje', 'Хуваалцах', 'Partager']],
    copyLink: ['Link kopieren', ['Копіювати посилання', 'نسخ الرابط', 'کپی لینک', 'Bağlantıyı kopyala', 'Copiați linkul',
      'Kopjo lidhjen', 'Холбоос хуулах', 'Copier le lien']],
    copied: ['Kopiert', ['Скопійовано', 'تم النسخ', 'کپی شد', 'Kopyalandı', 'Copiat', 'U kopjua', 'Хуулсан', 'Copié']],
    selfCheck: ['Wie gut kann ich das?', ['Наскільки добре я це вмію?', 'ما مدى إتقاني لهذا؟', 'این را چقدر خوب بلدم؟',
      'Bunu ne kadar iyi yapabiliyorum?', 'Cât de bine știu asta?', 'Sa mirë e di këtë?', 'Би үүнийг хэр сайн чадах вэ?',
      'Est-ce que je sais bien le faire ?']],
    resetAll: ['Meinen Fortschritt löschen', ['Видалити мій прогрес', 'حذف تقدّمي', 'پاک کردن پیشرفت من', 'İlerlememi sil',
      'Ștergeți progresul meu', 'Fshi përparimin tim', 'Миний явцыг устгах', 'Effacer ma progression']]
  };

  var body = document.body;
  var view = body.getAttribute('data-view') || 'uebersicht';
  var date = body.getAttribute('data-date') || '';
  var params = new URLSearchParams(location.search);
  var forceAll = params.get('alle') === '1';
  var cardsMode = params.get('karten') === '1';
  // ?druck=de: German-only print version (translations hidden in print)
  if (params.get('druck') === 'de') body.classList.add('kt-de-only');
  // ?druck=blatt on the exercise page: printable worksheet (A4) + solutions page; &loesung=0 omits the solutions
  var blattMode = view === 'ueben' && params.get('druck') === 'blatt';
  var blattSolutions = params.get('loesung') !== '0';
  if (blattMode) { body.classList.add('kt-blatt'); forceAll = true; }
  var version = (function () {
    var s = document.currentScript && document.currentScript.src;
    var m = s && s.match(/[?&]v=([^&]+)/);
    return m ? m[1] : '';
  })();
  var langListeners = [];

  /* ---------- helpers ---------- */
  function el(tag, cls, html) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html != null) e.innerHTML = html;
    return e;
  }
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function plain(html) {
    var d = document.createElement('div');
    d.innerHTML = html;
    return (d.textContent || '').trim();
  }
  function parseDate(d) {
    var p = String(d).split('-');
    return new Date(+p[0], +p[1] - 1, +p[2]);
  }
  function deDate(d) {
    var x = parseDate(d);
    return x.getDate() + '. ' + MONTHS[x.getMonth()] + ' ' + x.getFullYear();
  }
  function hash(str) {
    var h = 2166136261;
    for (var i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 16777619); }
    return h >>> 0;
  }
  // Deterministic shuffle (mulberry32 seeded by a string).
  function shuffle(arr, seed) {
    var a = arr.slice(), s = hash(seed);
    function rnd() {
      s |= 0; s = (s + 0x6D2B79F5) | 0;
      var t = Math.imul(s ^ (s >>> 15), 1 | s);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    }
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(rnd() * (i + 1)); var tmp = a[i]; a[i] = a[j]; a[j] = tmp;
    }
    return a;
  }
  function sameOrder(a, b) {
    for (var i = 0; i < a.length; i++) if (a[i] !== b[i]) return false;
    return true;
  }
  function loadScript(src, ok, fail) {
    var s = document.createElement('script');
    s.src = src + (version ? '?v=' + version : '');
    s.onload = ok;
    s.onerror = fail;
    document.head.appendChild(s);
  }
  // localStorage: always optional (private mode, blocked storage) – never throw.
  function lsGet(key) {
    try { var v = localStorage.getItem(key); return v ? JSON.parse(v) : null; } catch (e) { return null; }
  }
  function lsSet(key, obj) {
    try { localStorage.setItem(key, JSON.stringify(obj)); } catch (e) { /* ignore */ }
  }
  function lsDel(key) {
    try { localStorage.removeItem(key); } catch (e) { /* ignore */ }
  }
  function copyText(text, ok) {
    function fallback() {
      var ta = el('textarea'); ta.value = text; ta.style.position = 'fixed'; ta.style.opacity = '0';
      document.body.appendChild(ta); ta.select();
      try { document.execCommand('copy'); ok(); } catch (e) { /* ignore */ }
      ta.remove();
    }
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).then(ok, fallback);
    else fallback();
  }
  function scrollToEl(node) {
    if (!node || !node.scrollIntoView) return;
    // long jumps (e.g. from the end card back to the first set) are instant, short ones smooth
    var far = Math.abs(node.getBoundingClientRect().top) > 3 * window.innerHeight;
    try { node.scrollIntoView({ block: 'start', behavior: far ? 'instant' : 'smooth' }); } catch (e) { node.scrollIntoView(true); }
  }

  /* ---------- language choice ---------- */
  function browserLang() {
    var list = (navigator.languages && navigator.languages.length) ? navigator.languages : [navigator.language || ''];
    for (var i = 0; i < list.length; i++) {
      var c = String(list[i] || '').toLowerCase().split(/[-_]/)[0];
      if (c === 'prs') c = 'fa'; // Dari
      if (LANGS.indexOf(c) >= 0) return c;
    }
    return '';
  }
  function getLang() {
    if (forceAll) return 'all';
    try {
      var v = localStorage.getItem('kt-lang');
      if (v === 'all' || v === 'de' || LANGS.indexOf(v) >= 0) return v;
    } catch (e) { /* storage blocked */ }
    // first visit: preselect from the browser languages (not stored until the learner taps a chip)
    return browserLang() || 'de';
  }
  function currentLang() { return body.getAttribute('data-lang') || 'de'; }
  function setLang(v, store) {
    body.setAttribute('data-lang', v);
    if (store) { try { localStorage.setItem('kt-lang', v); } catch (e) { /* ignore */ } }
    var chips = document.querySelectorAll('.kt-picker .kt-chip');
    for (var i = 0; i < chips.length; i++) {
      chips[i].setAttribute('aria-pressed', chips[i].getAttribute('data-l') === v ? 'true' : 'false');
    }
    langListeners.forEach(function (fn) { fn(v); });
  }
  // All 8 translations are always in the DOM; CSS shows the chosen one (body[data-lang]).
  // tag 'span' is used inside buttons and feedback lines (phrasing content).
  function trHTML(tr, tag, extraCls) {
    if (!tr || !tr.length) return '';
    tag = tag || 'div';
    var h = '<' + tag + ' class="kt-tr' + (extraCls ? ' ' + extraCls : '') + '">';
    for (var i = 0; i < LANGS.length; i++) {
      var l = LANGS[i];
      if (!tr[i]) continue;
      // label always left (LTR row), the text itself is an isolated span so RTL scripts keep their order
      h += '<span class="kt-t' + (RTL[l] ? ' rtl' : '') + '" data-l="' + l + '">' +
        '<span class="kt-l" title="' + GERMAN_NAME[l] + '">' + l + '</span>' +
        '<span class="kt-x" lang="' + l + '"' + (RTL[l] ? ' dir="rtl"' : '') + '>' + tr[i] + '</span></span>';
    }
    return h + '</' + tag + '>';
  }
  // Button label: German on top, chosen translation small below.
  function lbl(key, icon) {
    var u = UI[key];
    return (icon ? '<span class="kt-ico" aria-hidden="true">' + icon + '</span>' : '') +
      '<span class="kt-bl"><span class="kt-bde">' + u[0] + '</span>' + trHTML(u[1], 'span') + '</span>';
  }
  // Message line: German (with optional prefix/suffix HTML), translation below.
  function msg(key, pre, post) {
    var u = UI[key];
    return '<span class="kt-fbm">' + (pre || '') + u[0] + (post || '') + '</span>' + trHTML(u[1], 'span');
  }
  function btn(cls, html) {
    var b = el('button', cls, html);
    b.type = 'button';
    return b;
  }
  function picker() {
    var box = el('div', 'kt-picker kt-noprint');
    box.setAttribute('role', 'group');
    box.setAttribute('aria-label', 'Sprache wählen');
    box.appendChild(el('p', 'kt-picker-label',
      '🌍 Sprache · <bdi lang="uk">Мова</bdi> · <bdi lang="ar" dir="rtl">اللغة</bdi> · <bdi lang="fa" dir="rtl">زبان</bdi> · ' +
      '<bdi lang="tr">Dil</bdi> · <bdi lang="ro">Limba</bdi> · <bdi lang="sq">Gjuha</bdi> · <bdi lang="mn">Хэл</bdi> · <bdi lang="fr">Langue</bdi>'));
    var chips = el('div', 'kt-chips');
    var opts = [['de', 'Nur Deutsch']];
    LANGS.forEach(function (l) { opts.push([l, NATIVE[l]]); });
    opts.push(['all', 'Alle']);
    opts.forEach(function (o) {
      var b = btn('kt-chip');
      b.setAttribute('data-l', o[0]);
      if (RTL[o[0]]) { b.setAttribute('dir', 'rtl'); b.setAttribute('lang', o[0]); }
      b.textContent = o[1];
      if (GERMAN_NAME[o[0]]) b.title = GERMAN_NAME[o[0]];
      b.addEventListener('click', function () { forceAll = false; setLang(o[0], true); });
      chips.appendChild(b);
    });
    box.appendChild(chips);
    return box;
  }

  /* ---------- share ---------- */
  // navigator.share when available, otherwise a small panel with WhatsApp + copy link.
  function shareBox(path, title) {
    var url = SITE + path;
    var wrap = el('div', 'kt-sharebox kt-noprint');
    var b = btn('kt-btn quiet', lbl('share', '📤'));
    var panel = el('div', 'kt-sharepanel');
    panel.hidden = true;
    var wa = el('a', 'kt-btn quiet', '<span aria-hidden="true">💬</span> WhatsApp');
    wa.href = 'https://wa.me/?text=' + encodeURIComponent(title + ' ' + url);
    wa.target = '_blank';
    wa.rel = 'noopener';
    var cp = btn('kt-btn quiet', lbl('copyLink', '🔗'));
    cp.addEventListener('click', function () {
      copyText(url, function () {
        cp.innerHTML = lbl('copied', '✓');
        setTimeout(function () { cp.innerHTML = lbl('copyLink', '🔗'); }, 1600);
      });
    });
    panel.appendChild(wa); panel.appendChild(cp);
    b.addEventListener('click', function () {
      if (navigator.share) {
        navigator.share({ title: title, text: title, url: url }).catch(function (e) {
          if (!e || e.name !== 'AbortError') panel.hidden = false;
        });
      } else {
        panel.hidden = !panel.hidden;
      }
    });
    wrap.appendChild(b); wrap.appendChild(panel);
    return wrap;
  }

  /* ---------- page frame ---------- */
  function header() {
    var h = el('header', 'kt-header');
    h.innerHTML = '<a class="kt-logo" href="/">Deutsch mit <span>Dennis</span></a>';
    return h;
  }
  function crumbs(items) {
    var n = el('nav', 'kt-crumbs');
    n.setAttribute('aria-label', 'Brotkrümel');
    items.forEach(function (it, i) {
      var last = i === items.length - 1;
      var a = el(last ? 'span' : 'a', null, esc(it[0]));
      if (!last) a.href = it[1]; else a.setAttribute('aria-current', 'page');
      n.appendChild(a);
    });
    return n;
  }
  function measureHeader() {
    var h = document.querySelector('.kt-header');
    if (h) document.documentElement.style.setProperty('--kt-hh', h.offsetHeight + 'px');
  }
  function topButton() {
    var b = btn('kt-top kt-noprint', '<span aria-hidden="true">↑</span>');
    b.setAttribute('aria-label', 'Nach oben');
    b.title = 'Nach oben';
    b.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: 'smooth' }); });
    function onScroll() { b.classList.toggle('show', (window.pageYOffset || document.documentElement.scrollTop) > 500); }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return b;
  }
  function frame() {
    body.innerHTML = '';
    body.appendChild(header());
    var main = el('main', 'kt-main');
    main.id = 'inhalt';
    body.appendChild(main);
    if (!blattMode) body.appendChild(topButton());
    measureHeader();
    window.addEventListener('resize', measureHeader);
    return main;
  }
  function missing(main, what) {
    main.appendChild(el('div', 'kt-section',
      '<h2>Noch nicht da</h2><p>' + esc(what) + ' für diesen Tag fehlen noch. Bitte später noch einmal öffnen.</p>' +
      '<p><a class="kt-btn quiet" href="' + BASE + '">Zum Kurstagebuch</a></p>'));
  }

  /* ---------- protocol blocks ---------- */
  function tableHTML(head, rows) {
    var h = '<div class="kt-tablewrap"><table>';
    if (head && head.length) h += '<thead><tr>' + head.map(function (c) { return '<th scope="col">' + c + '</th>'; }).join('') + '</tr></thead>';
    h += '<tbody>' + (rows || []).map(function (r) {
      return '<tr>' + r.map(function (c) { return '<td>' + c + '</td>'; }).join('') + '</tr>';
    }).join('') + '</tbody></table></div>';
    return h;
  }
  function blockHTML(b) {
    var t = b.title ? '<h3>' + b.title + '</h3>' : '';
    switch (b.type) {
      case 'phrases':
        return t + '<ul class="kt-items">' + (b.items || []).map(function (it) {
          var tag = it.tag ? '<span class="kt-tag ' + (it.tag === 'du' ? 'du' : 'sie') + '">' + esc(it.tag) + '</span>' : '';
          return '<li class="kt-item"><div class="kt-de" lang="de">' + it.de + tag + '</div>' + trHTML(it.tr) + '</li>';
        }).join('') + '</ul>';
      case 'words':
        // same indent for every word: if one item of the block has an emoji, the others get an empty slot
        var anyEmoji = (b.items || []).some(function (it) { return it.emoji; });
        return t + '<ul class="kt-items">' + (b.items || []).map(function (it) {
          var em = anyEmoji ? '<span class="kt-emoji" aria-hidden="true">' + (it.emoji || '') + '</span>' : '';
          return '<li class="kt-item"><div class="kt-de" lang="de">' + em + it.de + '</div>' + trHTML(it.tr) + '</li>';
        }).join('') + '</ul>';
      case 'examples':
        return t + '<ul class="kt-examples" lang="de">' + (b.items || []).map(function (s) { return '<li>' + s + '</li>'; }).join('') + '</ul>';
      case 'rule':
        return '<div class="kt-rule">' + '<h3>📌 ' + (b.title || 'Regel') + '</h3><p lang="de">' + (b.text || '') + '</p>' +
          trHTML(b.tr) + (b.table ? tableHTML(b.table.head, b.table.rows) : '') + '</div>';
      case 'warn':
        return '<div class="kt-warn"><h3>⚠️ ' + (b.title || 'Achtung, typischer Fehler') + '</h3><ul>' + (b.items || []).map(function (it) {
          return '<li><span class="kt-wrong">' + it.wrong + '</span> → <span class="kt-right">' + it.right + '</span>' +
            (it.why ? '<span class="kt-why">' + it.why + '</span>' : '') + '</li>';
        }).join('') + '</ul></div>';
      case 'table':
        return t + tableHTML(b.head, b.rows);
      case 'text':
        return t + '<div class="kt-text" lang="de">' + (b.text || '') + '</div>';
      default:
        return '';
    }
  }

  /* ---------- "Das kann ich" self-assessment ---------- */
  var KANN = [['a', '😊', 'Das kann ich gut.'], ['b', '🙂', 'Das kann ich ein bisschen.'], ['c', '😕', 'Das kann ich noch nicht.']];
  function kannButtons(goal) {
    var key = date + '|' + hash(plain(goal)).toString(36);
    var box = el('span', 'kt-kann kt-noprint');
    box.setAttribute('role', 'group');
    box.setAttribute('aria-label', 'Wie gut kann ich das?');
    var all = lsGet('kt-kann') || {};
    var cur = all[key] || '';
    KANN.forEach(function (k) {
      var b = btn('kt-kb', k[1]);
      b.setAttribute('data-k', k[0]);
      b.setAttribute('aria-label', k[2]);
      b.title = k[2];
      b.setAttribute('aria-pressed', cur === k[0] ? 'true' : 'false');
      b.addEventListener('click', function () {
        var store = lsGet('kt-kann') || {};
        var on = store[key] === k[0];
        if (on) delete store[key]; else store[key] = k[0];
        lsSet('kt-kann', store);
        var bs = box.querySelectorAll('.kt-kb');
        for (var i = 0; i < bs.length; i++) bs[i].setAttribute('aria-pressed', (!on && bs[i] === b) ? 'true' : 'false');
      });
      box.appendChild(b);
    });
    return box;
  }

  function renderProtokoll(main) {
    var D = window.KT_DAY;
    main.appendChild(crumbs([['Startseite', '/'], ['Kurstagebuch', BASE], ['Tag ' + D.nr, '']]));
    main.appendChild(picker());

    var uebenUrl = BASE + D.date + '/ueben/';
    var weekday = D.weekday || WEEKDAYS[parseDate(D.date).getDay()];
    var hero = el('section', 'kt-hero');
    hero.innerHTML =
      '<p class="kt-kicker"><span>Tag ' + esc(D.nr) + ' · ' + esc(weekday) + ', ' + deDate(D.date) + '</span>' +
      (D.level ? '<span class="kt-badge">' + esc(D.level) + '</span>' : '') + '</p>' +
      '<h1>' + D.title + '</h1>';
    var actions = el('div', 'kt-row kt-actions kt-noprint');
    var go = el('a', 'kt-btn kt-big', lbl('practice', '✏️'));
    go.href = uebenUrl;
    var cards = el('a', 'kt-btn quiet', lbl('cards', '🃏'));
    cards.href = '?karten=1';
    actions.appendChild(go); actions.appendChild(cards);
    actions.appendChild(shareBox(BASE + D.date + '/', 'Kurstagebuch Tag ' + D.nr + ': ' + plain(D.title)));
    hero.appendChild(actions);
    if (D.intro) hero.appendChild(el('p', 'kt-intro', D.intro));
    if (D.goals && D.goals.length) {
      var goals = el('div', 'kt-goals', '<h2>Das kann ich jetzt</h2>' +
        '<div class="kt-kann-hint kt-noprint">' + msg('selfCheck') + '</div>');
      var ul = el('ul');
      D.goals.forEach(function (g) {
        var li = el('li', null, '<span class="kt-goal">' + g + '</span>');
        li.appendChild(kannButtons(g));
        ul.appendChild(li);
      });
      goals.appendChild(ul);
      hero.appendChild(goals);
    }
    main.appendChild(hero);

    var qr = el('aside', 'kt-qr');
    qr.innerHTML = '<img src="' + BASE + D.date + '/qr-ueben.svg" alt="QR-Code zu den Übungen" width="112" height="112">' +
      '<div class="kt-qr-text"><p class="kt-qr-scan">📱 Übungen auf dem Handy: QR-Code scannen</p>' +
      '<span class="kt-pdfnote">' + SITE.replace('https://', '') + uebenUrl + '</span>' +
      '<a class="kt-btn" href="' + uebenUrl + '">Zu den Übungen</a></div>' +
      '<p class="kt-noprint">PDF zum Drucken: <a href="protokoll-' + date + '-deutsch.pdf" download>kurz, nur Deutsch</a> · <a href="protokoll-' + date + '.pdf" download>lang, mit 8 Sprachen</a>' +
      ' · <a href="arbeitsblatt-' + date + '.pdf" download>Arbeitsblatt mit Lösungen</a></p>';
    main.appendChild(qr);

    var secs = D.sections || [];
    if (secs.length > 1) {
      var toc = el('nav', 'kt-toc kt-noprint');
      toc.setAttribute('aria-label', 'Inhalt');
      toc.innerHTML = '<h2>Inhalt</h2><div class="kt-chips">' + secs.map(function (s) {
        return '<a class="kt-chip" href="#' + esc(s.id) + '">' + (s.icon ? s.icon + ' ' : '') + s.title + '</a>';
      }).join('') + '</div>';
      main.appendChild(toc);
    }

    secs.forEach(function (s) {
      var sec = el('section', 'kt-section');
      sec.id = s.id;
      var h = '<h2>' + (s.icon ? '<span aria-hidden="true">' + s.icon + '</span>' : '') + '<span>' + s.title + '</span></h2>';
      (s.blocks || []).forEach(function (b) { h += '<div class="kt-block kt-b-' + esc(b.type) + '">' + blockHTML(b) + '</div>'; });
      sec.innerHTML = h;
      main.appendChild(sec);
    });

    var foot = el('footer', 'kt-foot');
    foot.innerHTML = (D.note ? '<p>' + D.note + '</p>' : '') +
      '<p>Übersetzungen mit KI erstellt und geprüft. Fehler gefunden? Sag es im Kurs.</p>' +
      '<div class="kt-row kt-noprint"><button type="button" class="kt-btn quiet" id="kt-print">🖨️ Drucken</button>' +
      '<a class="kt-btn" href="' + uebenUrl + '">Zu den Übungen</a></div>';
    main.appendChild(foot);
    document.getElementById('kt-print').addEventListener('click', function () { window.print(); });
  }

  /* ---------- flashcards (?karten=1 on the protocol page) ---------- */
  function collectCards(D) {
    var out = [], seen = {};
    (D.sections || []).forEach(function (s) {
      (s.blocks || []).forEach(function (b) {
        if (b.type !== 'words') return;
        (b.items || []).forEach(function (it) {
          if (!it || !it.de) return;
          var k = hash(plain(it.de)).toString(36);
          if (seen[k]) return;
          seen[k] = 1;
          out.push({ k: k, de: it.de, tr: it.tr || [], emoji: it.emoji || '' });
        });
      });
    });
    return out;
  }
  function renderKarten(main) {
    var D = window.KT_DAY;
    var dayUrl = BASE + D.date + '/';
    main.appendChild(crumbs([['Startseite', '/'], ['Kurstagebuch', BASE], ['Tag ' + D.nr, dayUrl], ['Karteikarten', '']]));
    main.appendChild(picker());
    var hero = el('section', 'kt-hero');
    hero.innerHTML = '<p class="kt-kicker"><span>Tag ' + esc(D.nr) + ' · ' + deDate(D.date) + '</span></p>' +
      '<h1>🃏 Karteikarten</h1>';
    var row = el('div', 'kt-row kt-noprint');
    var back = el('a', 'kt-btn quiet', lbl('toProtocol', '←'));
    back.href = dayUrl;
    var pr = el('a', 'kt-btn quiet', lbl('practice', '✏️'));
    pr.href = BASE + D.date + '/ueben/';
    row.appendChild(back); row.appendChild(pr);
    hero.appendChild(row);
    main.appendChild(hero);

    var deck = collectCards(D);
    var CK = 'kt-karten-' + D.date;
    var saved = lsGet(CK) || {};
    var known = {};
    (Array.isArray(saved.k) ? saved.k : []).forEach(function (k) { known[k] = 1; });
    var dir = saved.d === 'r' ? 'r' : 'f'; // f: Deutsch → meine Sprache, r: meine Sprache → Deutsch
    var queue = deck.filter(function (c) { return !known[c.k]; });
    var flipped = false;
    function save() {
      lsSet(CK, { k: deck.filter(function (c) { return known[c.k]; }).map(function (c) { return c.k; }), d: dir });
    }
    var box = el('section', 'kt-cards kt-noprint');
    box.setAttribute('aria-live', 'polite');
    main.appendChild(box);
    var foot = el('footer', 'kt-foot', '<p>Übersetzungen mit KI erstellt und geprüft. Fehler gefunden? Sag es im Kurs.</p>');
    main.appendChild(foot);

    function trOf(c, l) {
      var i = LANGS.indexOf(l);
      return (i >= 0 && c.tr[i]) ? c.tr[i] : '—';
    }
    function sideDe(c) {
      return '<span class="kt-card-emoji" aria-hidden="true">' + (c.emoji || '') + '</span>' +
        '<span class="kt-card-main" lang="de">' + c.de + '</span>';
    }
    function sideTr(c, l) {
      return '<span class="kt-card-main" lang="' + l + '"' + (RTL[l] ? ' dir="rtl"' : '') + '>' + trOf(c, l) + '</span>';
    }
    function draw() {
      var l = currentLang();
      box.innerHTML = '';
      if (LANGS.indexOf(l) < 0) {
        // de / all: the back side needs one language
        box.appendChild(el('div', 'kt-card-ask', msg('chooseLang', '👆 ').replace('class="kt-tr"', 'class="kt-tr kt-tr-all"')));
        return;
      }
      var nKnown = deck.filter(function (c) { return known[c.k]; }).length;
      var top = el('div', 'kt-card-top');
      top.innerHTML = '<span class="kt-card-count" aria-label="' + nKnown + ' von ' + deck.length + ' gewusst">✓ ' + nKnown + ' / ' + deck.length + '</span>';
      var dirBtn = btn('kt-btn quiet kt-small', '<span aria-hidden="true">🔄</span><span class="kt-bl"><span class="kt-bde">' +
        (dir === 'f' ? 'Deutsch → ' + NATIVE[l] : NATIVE[l] + ' → Deutsch') + '</span>' + trHTML(UI.direction[1], 'span') + '</span>');
      dirBtn.addEventListener('click', function () { dir = dir === 'f' ? 'r' : 'f'; flipped = false; save(); draw(); });
      top.appendChild(dirBtn);
      box.appendChild(top);
      var bar = el('div', 'kt-bar', '<i style="width:' + (deck.length ? Math.round(nKnown / deck.length * 100) : 0) + '%"></i>');
      box.appendChild(bar);

      if (!queue.length) {
        var done = el('div', 'kt-final', '<p class="kt-final-big">🎉 ' + msg('cardsDone') + '</p>');
        var again = btn('kt-btn', lbl('again', '↺'));
        again.addEventListener('click', function () {
          known = {}; queue = deck.slice(); flipped = false; save(); draw();
        });
        var r = el('div', 'kt-row'); r.appendChild(again); r.appendChild(back.cloneNode(true));
        done.appendChild(r);
        box.appendChild(done);
        return;
      }
      var c = queue[0];
      var front = dir === 'f' ? sideDe(c) : sideTr(c, l);
      var backSide = dir === 'f' ? sideTr(c, l) + '<span class="kt-card-sub" lang="de">' + c.de + '</span>'
        : sideDe(c) + '<span class="kt-card-sub" lang="' + l + '"' + (RTL[l] ? ' dir="rtl"' : '') + '>' + trOf(c, l) + '</span>';
      var card = btn('kt-card' + (flipped ? ' flipped' : ''), flipped ? backSide : front);
      card.setAttribute('aria-label', flipped ? 'Rückseite' : 'Vorderseite – tippen zum Umdrehen');
      card.addEventListener('click', function () { flipped = !flipped; draw(); var nc = box.querySelector('.kt-card'); if (nc) nc.focus(); });
      box.appendChild(card);
      box.appendChild(el('p', 'kt-card-hint', msg('flip')));
      var acts = el('div', 'kt-card-acts');
      var no = btn('kt-btn quiet kt-no', lbl('notYet', '✗'));
      var yes = btn('kt-btn kt-yes', lbl('know', '✓'));
      no.addEventListener('click', function () { queue.push(queue.shift()); flipped = false; draw(); });
      yes.addEventListener('click', function () { known[c.k] = 1; queue.shift(); flipped = false; save(); draw(); });
      acts.appendChild(no); acts.appendChild(yes);
      box.appendChild(acts);
    }
    langListeners.push(function () { flipped = false; draw(); });
    draw();
  }

  /* ---------- exercises ---------- */
  var recs = [];        // one record per set: {set, card, st, round, chip}
  var SKEY = 'kt-ueben-' + date;
  var restoring = false;
  function setHash(set) { return hash(set.type + '|' + JSON.stringify(set.items || [])).toString(36); }
  function scored(r) { return r.set.type !== 'steckbrief'; }
  function complete(r) { return r.st.total > 0 && r.st.done >= r.st.total; }
  function savedFor(set) {
    var o = lsGet(SKEY);
    var e = o && o.s && o.s[set.id];
    // stale entries (exercise content changed since) are discarded via the content hash
    return (e && e.h === setHash(set) && e.d && typeof e.d === 'object') ? e.d : null;
  }
  function saveProgress() {
    var out = { v: 1, s: {}, sum: { done: 0, total: 0, correct: 0 } };
    recs.forEach(function (r) {
      if (!scored(r)) return; // Steckbrief inputs are never stored
      out.sum.total += r.st.total; out.sum.done += r.st.done; out.sum.correct += r.st.correct;
      if (r.st.done > 0 || (r.st.data.x && r.st.data.x.length)) out.s[r.set.id] = { h: setHash(r.set), d: r.st.data };
    });
    lsSet(SKEY, out);
  }
  function changed(r, silent) {
    refreshSet(r);
    refreshAll();
    if (!silent && !restoring) saveProgress();
  }
  function refreshSet(r) {
    var st = r.st, card = r.card;
    var s = card.querySelector('.kt-score .kt-score-txt');
    if (s) s.textContent = st.done < st.total
      ? st.done + ' / ' + st.total + ' fertig'
      : (st.kind === 'steckbrief' ? 'Fertig ✓' : st.correct + ' von ' + st.total + ' richtig' + (st.correct === st.total ? ' 🎉' : ''));
    var nx = card.querySelector('.kt-next');
    if (nx) nx.hidden = !(complete(r) && nextTarget(r));
    if (r.chip) {
      r.chip.classList.toggle('done', complete(r));
      var m = r.chip.querySelector('.kt-chk');
      if (m) m.textContent = complete(r) ? ' ✓' : '';
    }
  }
  function totals() {
    var t = { total: 0, done: 0, correct: 0, all: true, wrong: 0 };
    recs.forEach(function (r) {
      if (!scored(r)) return;
      if (!r.st) { t.all = false; return; } // not rendered yet (during first render)
      t.total += r.st.total; t.done += r.st.done; t.correct += r.st.correct;
      if (!complete(r)) t.all = false;
      if (r.st.correct < r.st.total) t.wrong++;
    });
    if (!t.total) t.all = false;
    return t;
  }
  function refreshAll() {
    var t = totals();
    var p = document.getElementById('kt-total');
    if (p) {
      var pct = t.total ? Math.round(t.done / t.total * 100) : 0;
      p.querySelector('.kt-progress-txt').textContent = '✏️ ' + t.done + ' / ' + t.total + ' fertig · ✓ ' + t.correct + ' richtig';
      p.querySelector('i').style.width = pct + '%';
      p.querySelector('.kt-bar').setAttribute('aria-valuenow', pct);
    }
    var f = document.getElementById('kt-final');
    if (f) {
      f.hidden = !t.all;
      if (t.all) {
        f.querySelector('.kt-final-big').innerHTML = msg('finished', '🎉 ', ' ' + t.correct + ' von ' + t.total + ' richtig');
        f.querySelector('.kt-fix').hidden = t.wrong === 0;
      }
    }
    recs.forEach(function (r) {
      if (!r.st) return;
      var nx = r.card.querySelector('.kt-next');
      if (nx) nx.hidden = !(complete(r) && nextTarget(r));
    });
  }
  function nextTarget(r) {
    if (scored(r) && totals().all) return document.getElementById('kt-final');
    var i = recs.indexOf(r);
    return recs[i + 1] ? recs[i + 1].card : null;
  }
  function feedback(ok, right, why) {
    var f = el('p', 'kt-fb ' + (ok ? 'ok' : 'bad'));
    f.setAttribute('role', 'status');
    f.innerHTML = (ok ? msg('ok', '✓ ') : msg('bad', '✗ ', right ? ' Richtig: <b>' + right + '</b>' : '')) +
      (why ? '<span class="kt-fbwhy">' + why + '</span>' : '');
    return f;
  }

  function buildChoice(r, box, saved) {
    var set = r.set, st = r.st, round = r.round;
    (set.items || []).forEach(function (it, qi) {
      var q = el('div', 'kt-q');
      var isGap = set.type === 'gap';
      var qt = el('p', 'kt-qtext');
      if (isGap) {
        var parts = String(it.text).split('___');
        qt.innerHTML = parts[0] + '<span class="kt-gap">___</span>' + (parts[1] || '');
      } else {
        qt.innerHTML = it.q;
      }
      q.appendChild(qt);
      var opts = el('div', 'kt-opts');
      var order = (it.options || []).map(function (_, i) { return i; });
      order = shuffle(order, set.id + qi + 'r' + round);
      var answered = false;
      function answer(oi, silent) {
        if (answered) return;
        answered = true;
        var ok = oi === it.answer;
        var all = opts.querySelectorAll('button');
        for (var k = 0; k < all.length; k++) {
          all[k].disabled = true;
          var bi = +all[k].getAttribute('data-i');
          if (bi === oi) all[k].classList.add(ok ? 'ok' : 'bad');
          if (!ok && bi === it.answer) all[k].classList.add('ok');
        }
        if (isGap) {
          var g = qt.querySelector('.kt-gap');
          g.innerHTML = it.options[it.answer];
          g.classList.add(ok ? 'ok' : 'bad');
        }
        q.appendChild(feedback(ok, ok ? '' : it.options[it.answer], it.why));
        st.data[qi] = oi;
        st.done++; if (ok) st.correct++;
        changed(r, silent);
      }
      order.forEach(function (oi) {
        var b = btn('kt-opt', it.options[oi]);
        b.setAttribute('data-i', oi);
        b.addEventListener('click', function () { answer(oi, false); });
        opts.appendChild(b);
      });
      q.appendChild(opts);
      box.appendChild(q);
      var sv = saved && saved[qi];
      if (typeof sv === 'number' && sv >= 0 && sv < (it.options || []).length) answer(sv, true);
    });
    st.total = (set.items || []).length;
  }

  function buildOrder(r, box, saved) {
    var set = r.set, st = r.st, round = r.round;
    (set.items || []).forEach(function (it, qi) {
      var chunks = it.chunks || [];
      var q = el('div', 'kt-q');
      var built = el('div', 'kt-built');
      built.setAttribute('aria-label', 'Ihr Satz');
      var pool = el('div', 'kt-opts');
      var picked = [];
      var idx = chunks.map(function (_, i) { return i; });
      var sh = shuffle(idx, set.id + qi + 'r' + round);
      if (chunks.length > 1 && sameOrder(sh, idx)) sh.push(sh.shift());
      var checked = false, scoredOnce = false;
      function poolBtn(ci) { return pool.querySelector('[data-ci="' + ci + '"]'); }
      function drawBuilt() {
        built.innerHTML = '';
        picked.forEach(function (ci, pos) {
          var p = btn('kt-chunk', chunks[ci]);
          if (checked) { p.disabled = true; p.classList.add('fixed'); }
          else {
            p.title = 'Zurück';
            // tap a word in the sentence: it goes back into the pool
            p.addEventListener('click', function () {
              if (checked) return;
              picked.splice(pos, 1);
              var pb = poolBtn(ci); if (pb) pb.classList.remove('used');
              var old = q.querySelector('.kt-fb'); if (old) old.remove();
              drawBuilt();
            });
          }
          built.appendChild(p);
        });
      }
      function pick(ci) {
        var c = poolBtn(ci);
        if (checked || !c || c.classList.contains('used')) return;
        c.classList.add('used');
        picked.push(ci);
        drawBuilt();
      }
      sh.forEach(function (ci) {
        var c = btn('kt-chunk', chunks[ci]);
        c.setAttribute('data-ci', ci);
        c.addEventListener('click', function () { pick(ci); });
        pool.appendChild(c);
      });
      var row = el('div', 'kt-row');
      row.style.marginTop = '10px';
      var reset = btn('kt-btn quiet', lbl('neu', '↺'));
      var check = btn('kt-btn', lbl('check'));
      reset.addEventListener('click', function () {
        picked = []; built.className = 'kt-built';
        var all = pool.querySelectorAll('.kt-chunk');
        for (var k = 0; k < all.length; k++) all[k].classList.remove('used');
        var f = q.querySelector('.kt-fb'); if (f) f.remove();
        checked = false;
        drawBuilt();
      });
      function doCheck(silent) {
        if (checked) return;
        var prev = q.querySelector('.kt-fb'); if (prev) prev.remove();
        if (picked.length < chunks.length) {
          var hint = el('p', 'kt-fb bad', msg('allWords'));
          hint.setAttribute('role', 'status');
          q.appendChild(hint);
          return;
        }
        // Compare text, not index: identical chunks may appear twice.
        var ok = picked.map(function (i) { return chunks[i]; }).join(' ') === chunks.join(' ');
        checked = true;
        drawBuilt();
        built.classList.add(ok ? 'ok' : 'bad');
        q.appendChild(feedback(ok, ok ? '' : chunks.join(' '), it.why));
        if (!scoredOnce) {
          scoredOnce = true;
          st.data[qi] = picked.slice();
          st.done++; if (ok) st.correct++;
          changed(r, silent);
        }
      }
      check.addEventListener('click', function () { doCheck(false); });
      row.appendChild(reset); row.appendChild(check);
      q.appendChild(built); q.appendChild(pool); q.appendChild(row);
      box.appendChild(q);
      var sv = saved && saved[qi];
      if (Array.isArray(sv) && sv.length === chunks.length) {
        var okIdx = sv.every(function (ci) { return typeof ci === 'number' && ci >= 0 && ci < chunks.length; });
        if (okIdx) { sv.forEach(pick); doCheck(true); }
      }
    });
    st.total = (set.items || []).length;
  }

  function buildMatch(r, box, saved) {
    var set = r.set, st = r.st, round = r.round;
    var pairs = (set.items && set.items[0] && set.items[0].pairs) || [];
    var grid = el('div', 'kt-match');
    var L = el('div', 'kt-col'), R = el('div', 'kt-col');
    var sel = null, mistakes = {}, matched = 0;
    st.data = { m: [], x: [] };
    // feedback sits above the grid, so it is visible while tapping
    var fb = el('div', 'kt-fb kt-match-fb');
    fb.setAttribute('role', 'status');
    function badge(n) { return '<span class="kt-num" aria-label="Paar ' + n + '">' + n + '</span>'; }
    function doMatch(li, silent) {
      var lb = L.querySelector('[data-i="' + li + '"]'), rb = R.querySelector('[data-i="' + li + '"]');
      if (!lb || !rb || lb.disabled) return;
      matched++;
      [lb, rb].forEach(function (b) {
        b.classList.remove('sel'); b.classList.add('ok'); b.disabled = true;
        b.insertAdjacentHTML('afterbegin', badge(matched));
      });
      if (sel === lb) sel = null;
      st.data.m.push(li);
      st.done++; if (!mistakes[li]) st.correct++;
      fb.className = 'kt-fb kt-match-fb ok';
      fb.innerHTML = matched === pairs.length ? msg('pairsDone', '✓ ') : msg('ok', '✓ ');
      changed(r, silent);
    }
    pairs.forEach(function (p, i) {
      var b = btn('kt-opt', p[0]); b.setAttribute('data-i', i);
      b.addEventListener('click', function () {
        if (b.disabled) return;
        if (sel) sel.classList.remove('sel');
        sel = b; b.classList.add('sel');
      });
      L.appendChild(b);
    });
    var ro = pairs.map(function (_, i) { return i; });
    var sh = shuffle(ro, set.id + 'm' + round);
    if (pairs.length > 1 && sameOrder(sh, ro)) sh.push(sh.shift());
    sh.forEach(function (i) {
      var b = btn('kt-opt', pairs[i][1]); b.setAttribute('data-i', i);
      b.addEventListener('click', function () {
        if (b.disabled) return;
        if (!sel) { fb.className = 'kt-fb kt-match-fb bad'; fb.innerHTML = msg('tapLeft', '👈 '); return; }
        var li = +sel.getAttribute('data-i');
        if (li === i) {
          sel = null;
          doMatch(li, false);
        } else {
          if (!mistakes[li]) { mistakes[li] = true; st.data.x.push(li); if (!restoring) saveProgress(); }
          b.classList.add('bad');
          fb.className = 'kt-fb kt-match-fb bad'; fb.innerHTML = msg('noMatch', '✗ ');
          setTimeout(function () { b.classList.remove('bad'); }, 700);
        }
      });
      R.appendChild(b);
    });
    grid.appendChild(L); grid.appendChild(R);
    box.appendChild(fb); box.appendChild(grid);
    st.total = pairs.length;
    if (saved) {
      (Array.isArray(saved.x) ? saved.x : []).forEach(function (li) {
        if (typeof li === 'number' && li >= 0 && li < pairs.length && !mistakes[li]) { mistakes[li] = true; st.data.x.push(li); }
      });
      (Array.isArray(saved.m) ? saved.m : []).forEach(function (li) {
        if (typeof li === 'number' && li >= 0 && li < pairs.length) doMatch(li, true);
      });
    }
  }

  function buildSteckbrief(r, box) {
    var set = r.set, st = r.st;
    var it = (set.items && set.items[0]) || {};
    var form = el('form', 'kt-form');
    form.setAttribute('autocomplete', 'off');
    form.addEventListener('submit', function (e) { e.preventDefault(); make(); });
    (it.fields || []).forEach(function (f) {
      var lab = el('label');
      lab.appendChild(document.createTextNode(f.label));
      var inp = el('input');
      inp.type = 'text'; inp.name = f.key; inp.placeholder = f.placeholder || '';
      inp.setAttribute('autocomplete', 'off');
      lab.appendChild(inp);
      form.appendChild(lab);
    });
    var go = el('button', 'kt-btn', '✍️ Text erstellen');
    go.type = 'submit';
    form.appendChild(go);
    var out = el('div', 'kt-out');
    out.hidden = true;
    out.setAttribute('aria-live', 'polite');
    var copy = btn('kt-btn quiet', '📋 Kopieren');
    copy.hidden = true;
    var hint = el('p', 'kt-hint', 'Der Text wird nur hier auf Ihrem Gerät erstellt.');
    var made = false;
    function make() {
      var text = String(it.template || '').replace(/\{(\w+)\}/g, function (_, k) {
        var inp = form.elements[k];
        var v = inp && inp.value.trim();
        return v || '___';
      });
      out.textContent = text; // user input: textContent only
      out.hidden = false; copy.hidden = false;
      if (!made) { made = true; st.done = 1; st.correct = 1; changed(r, true); }
    }
    copy.addEventListener('click', function () {
      copyText(out.textContent, function () {
        copy.textContent = '✓ Kopiert';
        setTimeout(function () { copy.textContent = '📋 Kopieren'; }, 1500);
      });
    });
    box.appendChild(form); box.appendChild(out); box.appendChild(copy); box.appendChild(hint);
    st.total = 1;
  }

  function renderSet(r, saved) {
    var set = r.set, card = r.card;
    var ins = INSTR[set.type] || ['', []];
    card.innerHTML = '<h2>' + (set.icon ? '<span aria-hidden="true">' + set.icon + '</span>' : '') + '<span>' + set.title + '</span></h2>' +
      '<div class="kt-instr"><div class="kt-de">' + ins[0] + '</div>' + trHTML(ins[1]) + '</div>';
    var box = el('div', 'kt-qs');
    card.appendChild(box);
    var sc = el('div', 'kt-score');
    sc.innerHTML = '<span class="kt-score-txt"></span>';
    var acts = el('div', 'kt-row');
    var next = btn('kt-btn kt-next', lbl('next') + '<span class="kt-ico" aria-hidden="true">➜</span>');
    next.hidden = true;
    next.addEventListener('click', function () { scrollToEl(nextTarget(r)); });
    var again = btn('kt-btn quiet', lbl('again', '↺'));
    again.addEventListener('click', function () {
      r.round++;
      renderSet(r, null);   // "Nochmal" clears only this set
      saveProgress();
      refreshAll();
      scrollToEl(card);
    });
    acts.appendChild(again); acts.appendChild(next);
    sc.appendChild(acts);
    r.st = { total: 0, done: 0, correct: 0, kind: set.type, data: {} };
    // the score row must exist before restoring (builders fill box, which sits above it)
    card.appendChild(sc);
    if (set.type === 'choice' || set.type === 'gap') buildChoice(r, box, saved);
    else if (set.type === 'order') buildOrder(r, box, saved);
    else if (set.type === 'match') buildMatch(r, box, saved);
    else if (set.type === 'steckbrief') buildSteckbrief(r, box);
    refreshSet(r);
  }

  function renderUeben(main) {
    var U = window.KT_UEBEN;
    var d = U.date || date;
    var nr = (window.KT_DAY && window.KT_DAY.nr) || '';
    main.appendChild(crumbs([['Startseite', '/'], ['Kurstagebuch', BASE], [nr ? 'Tag ' + nr : deDate(d), BASE + d + '/'], ['Übungen', '']]));
    main.appendChild(picker());
    var hero = el('section', 'kt-hero');
    hero.innerHTML = '<p class="kt-kicker"><span>' + deDate(d) + '</span></p><h1>' + U.title + '</h1>';
    var row = el('div', 'kt-row kt-noprint');
    var back = el('a', 'kt-btn quiet', lbl('toProtocol', '←'));
    back.href = BASE + d + '/';
    row.appendChild(back);
    row.appendChild(shareBox(BASE + d + '/ueben/', plain(U.title) + (nr ? ' (Kurstagebuch Tag ' + nr + ')' : '')));
    hero.appendChild(row);
    main.appendChild(hero);

    var nav = el('nav', 'kt-setnav kt-chips kt-noprint');
    nav.setAttribute('aria-label', 'Übungen');
    main.appendChild(nav);

    var prog = el('div', 'kt-progress');
    prog.id = 'kt-total';
    prog.innerHTML = '<p class="kt-progress-txt">Fortschritt</p><div class="kt-bar" role="progressbar" aria-label="Fortschritt" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0"><i></i></div>';
    main.appendChild(prog);

    // restore without animations (no growing bar, no smooth scrolling)
    body.classList.add('kt-still');
    restoring = true;
    (U.sets || []).forEach(function (set) {
      var card = el('section', 'kt-set');
      card.id = set.id;
      main.appendChild(card);
      var chip = el('a', 'kt-chip', (set.icon ? '<span aria-hidden="true">' + set.icon + '</span> ' : '') + set.title + '<span class="kt-chk"></span>');
      chip.href = '#' + set.id;
      nav.appendChild(chip);
      var r = { set: set, card: card, st: null, round: 0, chip: chip };
      recs.push(r);
    });
    recs.forEach(function (r) { renderSet(r, scored(r) ? savedFor(r.set) : null); });

    var fin = el('section', 'kt-final kt-set');
    fin.id = 'kt-final';
    fin.hidden = true;
    fin.innerHTML = '<p class="kt-final-big"></p>';
    var frow = el('div', 'kt-row');
    var fix = btn('kt-btn kt-fix', lbl('fixErrors', '🔁'));
    fix.addEventListener('click', function () {
      var first = null;
      recs.forEach(function (r) {
        if (!scored(r) || r.st.correct >= r.st.total) return;
        r.round++;
        renderSet(r, null); // only sets with mistakes start again
        if (!first) first = r.card;
      });
      saveProgress();
      refreshAll();
      scrollToEl(first);
    });
    var fback = el('a', 'kt-btn quiet', lbl('toProtocol', '←'));
    fback.href = BASE + d + '/';
    frow.appendChild(fix); frow.appendChild(fback);
    fin.appendChild(frow);
    main.appendChild(fin);

    var foot = el('footer', 'kt-foot');
    foot.innerHTML = '<p>Übersetzungen mit KI erstellt und geprüft. Fehler gefunden? Sag es im Kurs.</p>' +
      '<div class="kt-row"><a class="kt-btn quiet" href="' + BASE + d + '/">← Zum Protokoll</a>' +
      '<a class="kt-btn quiet" href="' + BASE + '">Alle Kurstage</a>' +
      // the PDF sits next to the protocol page: /kurstagebuch/<date>/arbeitsblatt-<date>.pdf (= ../ from ueben/)
      '<a class="kt-btn quiet" href="' + BASE + d + '/arbeitsblatt-' + d + '.pdf" download>🖨️ Arbeitsblatt (PDF)</a></div>';
    var wipe = btn('kt-btn quiet kt-small kt-wipe', lbl('resetAll', '🗑️'));
    wipe.addEventListener('click', function () {
      if (!window.confirm('Möchten Sie Ihren Fortschritt löschen?')) return;
      lsDel(SKEY);
      recs.forEach(function (r) { r.round++; renderSet(r, null); });
      refreshAll();
      window.scrollTo(0, 0);
    });
    var wrow = el('div', 'kt-row');
    wrow.style.marginTop = '18px';
    wrow.appendChild(wipe);
    foot.appendChild(wrow);
    main.appendChild(foot);

    restoring = false;
    refreshAll();
    measureHeader();
    requestAnimationFrame(function () { requestAnimationFrame(function () { body.classList.remove('kt-still'); }); });
  }

  /* ---------- worksheet (?druck=blatt on the exercise page) ---------- */
  // Fixed seed: sheet and solutions always show the same order (independent of the online rounds).
  var BLATT_SEED = 'blatt';
  function letter(i) { return String.fromCharCode(97 + i); }
  function blank(mm) { return '<span class="kb-blank" style="min-width:' + mm + 'mm"></span>'; }
  function firstSentence(s) {
    var m = String(s).match(/^.*?[.!?](?=\s|$)/);
    return m ? m[0] : String(s);
  }
  // instructions for paper (no "tippen"); order of translations = LANGS
  var PAPER_INSTR = {
    choice: ['Kreuzen Sie die richtige Antwort an.', [
      'Позначте хрестиком правильну відповідь.', 'ضع علامة × على الإجابة الصحيحة.', 'جواب درست را علامت بزنید.',
      'Doğru cevabı işaretleyin.', 'Bifați răspunsul corect.', 'Shënoni me (×) përgjigjen e saktë.',
      'Зөв хариултыг чагтална уу.', 'Cochez la bonne réponse.']],
    gap: ['Schreiben Sie das richtige Wort in die Lücke.', [
      'Впишіть правильне слово в пропуск.', 'اكتب الكلمة الصحيحة في الفراغ.', 'کلمه درست را در جای خالی بنویسید.',
      'Boşluğa doğru kelimeyi yazın.', 'Scrieți cuvântul corect în spațiul liber.', 'Shkruani fjalën e saktë në vendin bosh.',
      'Хоосон зайд зөв үгийг бичнэ үү.', 'Écrivez le bon mot dans le trou.']],
    order: ['Schreiben Sie den Satz in der richtigen Reihenfolge.', [
      'Напишіть речення в правильному порядку.', 'اكتب الجملة بالترتيب الصحيح.', 'جمله را به ترتیب درست بنویسید.',
      'Cümleyi doğru sırayla yazın.', 'Scrieți propoziția în ordinea corectă.', 'Shkruani fjalinë në rendin e duhur.',
      'Өгүүлбэрийг зөв дарааллаар бичнэ үү.', 'Écrivez la phrase dans le bon ordre.']],
    match: ['Was passt zusammen? Schreiben Sie den Buchstaben zur Zahl.', [
      'Що підходить? Напишіть букву біля цифри.', 'ما الذي يتطابق؟ اكتب الحرف بجانب الرقم.', 'چه چیزی با هم جور است؟ حرف را کنار عدد بنویسید.',
      'Hangisi uyuyor? Harfi rakamın yanına yazın.', 'Ce se potrivește? Scrieți litera lângă număr.', 'Çfarë përputhet? Shkruani shkronjën pranë numrit.',
      'Юу тохирох вэ? Тооны хажууд үсгийг бичнэ үү.', 'Qu’est-ce qui va ensemble ? Écrivez la lettre à côté du chiffre.']]
  };
  function blattInstr(type) {
    if (PAPER_INSTR[type]) return PAPER_INSTR[type];
    var ins = INSTR[type] || ['', []];
    // paper: "Nichts wird gesendet." makes no sense, keep only the first sentence
    if (type === 'steckbrief') return [firstSentence(ins[0]), ins[1].map(firstSentence)];
    return ins;
  }
  function rawText(html) { var x = document.createElement('div'); x.innerHTML = html; return x.textContent || ''; } // not trimmed
  // gap solution: the whole word around the gap ("heiß___" + "e" → "heiße")
  function gapWord(text, opt) {
    var parts = String(text).split('___');
    var pre = (rawText(parts[0]).match(/\S*$/) || [''])[0].replace(/^[„“"'(«]+/, '');
    var post = (rawText(parts[1] || '').match(/^[^\s.,!?;:…“"')»]*/) || [''])[0];
    return pre + opt + post;
  }
  function blattItems(set) {
    var items = set.items || [], out = [], sol = [];
    if (set.type === 'choice') {
      items.forEach(function (it, qi) {
        var idx = (it.options || []).map(function (_, i) { return i; });
        var order = shuffle(idx, set.id + '|' + qi + '|' + BLATT_SEED);
        // never the same answer letter 3 times in a row (still deterministic: next fixed salt)
        for (var k = 1; k < 8 && sol.length >= 2 && sol[sol.length - 1] === sol[sol.length - 2] &&
          letter(order.indexOf(it.answer)) === sol[sol.length - 1]; k++) {
          order = shuffle(idx, set.id + '|' + qi + '|' + BLATT_SEED + k);
        }
        out.push('<div class="kb-item kb-choice" data-n="' + (qi + 1) + '"><p class="kb-q"><span class="kb-n">' + (qi + 1) + '.</span>' +
          '<span>' + it.q + '</span></p><ul class="kb-opts">' + order.map(function (oi, k) {
            return '<li data-l="' + letter(k) + '"><span class="kb-box" aria-hidden="true"></span><span class="kb-let">' + letter(k) + ')</span>' +
              '<span class="kb-otext">' + it.options[oi] + '</span></li>';
          }).join('') + '</ul></div>');
        sol.push(letter(order.indexOf(it.answer)));
      });
    } else if (set.type === 'gap') {
      items.forEach(function (it, qi) {
        var opts = it.options || [];
        var longest = opts.reduce(function (m, o) { return Math.max(m, plain(o).length); }, 1);
        var w = Math.min(60, Math.max(14, longest * 4 + 6));
        var parts = String(it.text).split('___');
        out.push('<div class="kb-item kb-gap" data-n="' + (qi + 1) + '"><p class="kb-q"><span class="kb-n">' + (qi + 1) + '.</span>' +
          '<span>' + parts[0] + blank(w) + (parts[1] || '') + ' <span class="kb-hint">(' + opts.join(' / ') + ')</span></span></p></div>');
        sol.push(gapWord(it.text, opts[it.answer]));
      });
    } else if (set.type === 'order') {
      items.forEach(function (it, qi) {
        var chunks = it.chunks || [];
        var idx = chunks.map(function (_, i) { return i; });
        var sh = shuffle(idx, set.id + '|' + qi + '|' + BLATT_SEED);
        if (chunks.length > 1 && sameOrder(sh, idx)) sh.push(sh.shift());
        out.push('<div class="kb-item kb-order" data-n="' + (qi + 1) + '"><p class="kb-q"><span class="kb-n">' + (qi + 1) + '.</span>' +
          '<span class="kb-chunks">' + sh.map(function (ci) { return chunks[ci]; }).join(' <span class="kb-sep">/</span> ') + '</span></p>' +
          '<div class="kb-line"></div></div>');
        sol.push(chunks.join(' '));
      });
    } else if (set.type === 'match') {
      var pairs = (items[0] && items[0].pairs) || [];
      var ro = pairs.map(function (_, i) { return i; });
      var sh = shuffle(ro, set.id + '|m|' + BLATT_SEED);
      if (pairs.length > 1 && sameOrder(sh, ro)) sh.push(sh.shift());
      var rows = '';
      pairs.forEach(function (p, i) {
        // "1." / "a)" like the choice items, so numbers in the data (Zahlen 0–10) are not confused with the labels
        rows += '<span class="kb-mn">' + (i + 1) + '.</span><span class="kb-mt">' + p[0] + '</span>' +
          '<span class="kb-mn">' + letter(i) + ')</span><span class="kb-mt" data-l="' + letter(i) + '">' + pairs[sh[i]][1] + '</span>';
      });
      out.push('<div class="kb-item kb-match"><div class="kb-mgrid">' + rows + '</div><p class="kb-mans">' +
        pairs.map(function (_, i) { return '<span><b>' + (i + 1) + '</b> ' + blank(9) + '</span>'; }).join('') + '</p></div>');
      pairs.forEach(function (_, i) { sol.push(letter(sh.indexOf(i))); });
    } else if (set.type === 'steckbrief') {
      ((items[0] && items[0].fields) || []).forEach(function (f) {
        out.push('<div class="kb-item kb-field"><span class="kb-flabel">' + esc(f.label) +
          (f.placeholder ? ' <span class="kb-ex">(z. B. ' + esc(f.placeholder) + ')</span>' : '') + '</span><span class="kb-fline"></span></div>');
      });
      sol = null;
    }
    return { html: out, sol: sol };
  }
  function renderBlatt(main) {
    var U = window.KT_UEBEN;
    var D = window.KT_DAY || null;
    var d = U.date || date;
    var nr = D && D.nr;
    var title = (D && D.title) || String(U.title || '').replace(/^Übungen:\s*/, '');
    var weekday = (D && D.weekday) || WEEKDAYS[parseDate(d).getDay()];
    document.title = 'Arbeitsblatt' + (nr ? ' Tag ' + nr : '') + ': ' + plain(title);
    var top = el('header', 'kb-top');
    top.innerHTML = '<div class="kb-title"><p class="kb-kicker">Deutsch mit Dennis · Kurstagebuch' + (D && D.level ? ' ' + esc(D.level) : '') + '</p>' +
      '<h1>Arbeitsblatt – ' + (nr ? 'Tag ' + esc(nr) : deDate(d)) + ': ' + title + '</h1>' +
      '<p class="kb-date">' + esc(weekday) + ', ' + deDate(d) + '</p>' +
      '<p class="kb-namerow"><span>Name: ' + blank(62) + '</span><span>Datum: ' + blank(32) + '</span></p></div>' +
      '<div class="kb-qr"><img src="' + BASE + d + '/qr-ueben.svg" alt="QR-Code zu den Übungen" width="90" height="90">' +
      '<span>Online üben mit Lösungen</span></div>';
    var img = top.querySelector('img');
    img.addEventListener('error', function () { img.remove(); });
    main.appendChild(top);

    var sols = [];
    (U.sets || []).forEach(function (set, si) {
      var ins = blattInstr(set.type);
      var r = blattItems(set);
      var head = '<div class="kb-head"><h2><span class="kb-nr">' + (si + 1) + '</span>' +
        (set.icon ? '<span class="kb-icon" aria-hidden="true">' + set.icon + '</span>' : '') + '<span>' + set.title + '</span></h2>' +
        '<div class="kb-instr"><div class="kt-de">' + ins[0] + '</div>' + trHTML(ins[1]) + '</div></div>';
      var sec = el('section', 'kb-set' + (r.html.length <= 4 || set.type === 'match' ? ' kb-short' : ''));
      sec.setAttribute('data-set', set.id);
      sec.setAttribute('data-type', set.type);
      // heading + instruction never stand alone at the bottom of a page: they travel with the first item
      sec.innerHTML = '<div class="kb-first">' + head + (r.html[0] || '') + '</div>' + r.html.slice(1).join('');
      main.appendChild(sec);
      if (r.sol && r.sol.length) sols.push({ set: set, nr: si + 1, sol: r.sol });
    });

    if (blattSolutions && sols.length) {
      var ls = el('section', 'kb-sols');
      ls.innerHTML = '<h2>Lösungen</h2><p class="kb-solsub">' + (nr ? 'Tag ' + esc(nr) + ': ' : '') + title + '</p>' +
        '<div class="kb-solcols">' + sols.map(function (s) {
          var t = s.set.type;
          var sep = t === 'match' ? ', ' : (t === 'order' ? '' : ' · ');
          return '<div class="kb-sol kb-sol-' + esc(t) + '" data-set="' + esc(s.set.id) + '"><h3>' + s.nr + ' ' + s.set.title + '</h3><p>' +
            s.sol.map(function (x, i) {
              return '<span class="kb-s" data-n="' + (i + 1) + '" data-v="' + esc(plain(x)) + '"><b>' + (i + 1) + '</b> ' + x + '</span>';
            }).join(sep) + '</p></div>';
        }).join('') + '</div>';
      main.appendChild(ls);
    }
  }

  /* ---------- overview ---------- */
  function renderUebersicht(main) {
    var T = (window.KT_TAGE || []).slice().sort(function (a, b) { return a.date < b.date ? 1 : -1; });
    main.appendChild(crumbs([['Startseite', '/'], ['Kurstagebuch', '']]));
    var hero = el('section', 'kt-hero');
    hero.innerHTML = '<h1>Kurstagebuch</h1><p class="kt-intro">Was haben wir im Kurs gemacht? Hier finden Sie jeden Kurstag: ' +
      'das Protokoll mit Übersetzungen und Übungen für das Handy.</p>';
    main.appendChild(hero);
    if (!T.length) { missing(main, 'Die Kurstage'); return; }
    var ul = el('ul', 'kt-days');
    T.forEach(function (t) {
      var li = el('li', 'kt-day');
      var wd = WEEKDAYS[parseDate(t.date).getDay()];
      var p = lsGet('kt-ueben-' + t.date);
      var prog = (p && p.sum && p.sum.total > 0 && p.sum.done > 0)
        ? '<span class="kt-daydone" title="Übungen fertig">✓ ' + (+p.sum.done) + '/' + (+p.sum.total) + '</span>' : '';
      li.innerHTML = '<p class="kt-kicker"><span>Tag ' + esc(t.nr) + ' · ' + wd + ', ' + deDate(t.date) + '</span>' +
        (t.level ? '<span class="kt-badge">' + esc(t.level) + '</span>' : '') + prog + '</p>' +
        '<h2>' + t.title + '</h2>' + (t.teaser ? '<p>' + t.teaser + '</p>' : '');
      var row = el('div', 'kt-row');
      row.innerHTML = '<a class="kt-btn" href="' + BASE + t.date + '/">📖 Protokoll</a>' +
        '<a class="kt-btn quiet" href="' + BASE + t.date + '/ueben/">✏️ Übungen</a>';
      row.appendChild(shareBox(BASE + t.date + '/', 'Kurstagebuch Tag ' + t.nr + ': ' + plain(t.title)));
      li.appendChild(row);
      ul.appendChild(li);
    });
    main.appendChild(ul);
  }

  /* ---------- start ---------- */
  function start() {
    body.setAttribute('data-lang', getLang());
    var main = frame();
    if (view === 'protokoll') {
      loadScript(BASE + 'daten/' + date + '.js', function () {
        if (!window.KT_DAY) return missing(main, 'Die Daten');
        if (cardsMode) { body.classList.add('kt-cardsview'); renderKarten(main); }
        else renderProtokoll(main);
        setLang(getLang(), false);
      }, function () { missing(main, 'Die Daten'); });
    } else if (view === 'ueben') {
      loadScript(BASE + 'daten/' + date + '-ueben.js', function () {
        if (!window.KT_UEBEN) return missing(main, 'Die Übungen');
        // Protocol data is optional here (only for "Tag n" in the breadcrumb).
        loadScript(BASE + 'daten/' + date + '.js', go, go);
        function go() { if (blattMode) renderBlatt(main); else renderUeben(main); setLang(getLang(), false); }
      }, function () { missing(main, 'Die Übungen'); });
    } else {
      loadScript(BASE + 'daten/tage.js', function () { renderUebersicht(main); }, function () { missing(main, 'Die Kurstage'); });
    }
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();
})();
