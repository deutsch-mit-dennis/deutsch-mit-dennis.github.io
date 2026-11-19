/* Kurstagebuch renderer (vanilla JS, no libraries).
   <body data-view="protokoll|ueben|uebersicht" data-date="YYYY-MM-DD">
   Data files (see SCHEMA.md): daten/tage.js (KT_TAGE), daten/<date>.js (KT_DAY), daten/<date>-ueben.js (KT_UEBEN). */
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

  var body = document.body;
  var view = body.getAttribute('data-view') || 'uebersicht';
  var date = body.getAttribute('data-date') || '';
  var params = new URLSearchParams(location.search);
  var forceAll = params.get('alle') === '1';
  // ?druck=de: German-only print version (translations hidden in print)
  if (params.get('druck') === 'de') body.classList.add('kt-de-only');
  var version = (function () {
    var s = document.currentScript && document.currentScript.src;
    var m = s && s.match(/[?&]v=([^&]+)/);
    return m ? m[1] : '';
  })();

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

  /* ---------- language choice ---------- */
  function getLang() {
    if (forceAll) return 'all';
    try {
      var v = localStorage.getItem('kt-lang');
      if (v === 'all' || v === 'de' || LANGS.indexOf(v) >= 0) return v;
    } catch (e) { /* storage blocked */ }
    return 'de';
  }
  function setLang(v, store) {
    body.setAttribute('data-lang', v);
    if (store) { try { localStorage.setItem('kt-lang', v); } catch (e) { /* ignore */ } }
    var chips = document.querySelectorAll('.kt-picker .kt-chip');
    for (var i = 0; i < chips.length; i++) {
      var on = chips[i].getAttribute('data-l') === v;
      chips[i].setAttribute('aria-pressed', on ? 'true' : 'false');
      // Mobile: the chip row scrolls sideways; keep a remembered choice visible after page load.
      if (on && !store) {
        var row = chips[i].parentNode;
        if (row.scrollWidth > row.clientWidth) row.scrollLeft = Math.max(0, chips[i].offsetLeft - row.offsetLeft - 16);
      }
    }
  }
  // All 8 translations are always in the DOM; CSS shows the chosen one (body[data-lang]).
  function trHTML(tr) {
    if (!tr || !tr.length) return '';
    var h = '<div class="kt-tr">';
    for (var i = 0; i < LANGS.length; i++) {
      var l = LANGS[i];
      if (!tr[i]) continue;
      h += '<span class="kt-t" data-l="' + l + '" lang="' + l + '"' + (RTL[l] ? ' dir="rtl"' : '') + '>' +
        '<span class="kt-l" title="' + GERMAN_NAME[l] + '">' + l + '</span>' + tr[i] + '</span>';
    }
    return h + '</div>';
  }
  function picker() {
    var box = el('div', 'kt-picker kt-noprint');
    box.setAttribute('role', 'group');
    box.setAttribute('aria-label', 'Übersetzung wählen');
    box.appendChild(el('p', 'kt-picker-label', '🌍 Übersetzung'));
    var chips = el('div', 'kt-chips');
    var opts = [['de', 'Nur Deutsch']];
    LANGS.forEach(function (l) { opts.push([l, NATIVE[l]]); });
    opts.push(['all', 'Alle']);
    opts.forEach(function (o) {
      var b = el('button', 'kt-chip');
      b.type = 'button';
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
  function frame() {
    body.innerHTML = '';
    body.appendChild(header());
    var main = el('main', 'kt-main');
    main.id = 'inhalt';
    body.appendChild(main);
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
        return t + '<ul class="kt-items">' + (b.items || []).map(function (it) {
          var em = it.emoji ? '<span class="kt-emoji" aria-hidden="true">' + it.emoji + '</span>' : '';
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

  function renderProtokoll(main) {
    var D = window.KT_DAY;
    main.appendChild(crumbs([['Startseite', '/'], ['Kurstagebuch', BASE], ['Tag ' + D.nr, '']]));
    main.appendChild(picker());

    var weekday = D.weekday || WEEKDAYS[parseDate(D.date).getDay()];
    var hero = el('section', 'kt-hero');
    hero.innerHTML =
      '<p class="kt-kicker"><span>Tag ' + esc(D.nr) + ' · ' + esc(weekday) + ', ' + deDate(D.date) + '</span>' +
      (D.level ? '<span class="kt-badge">' + esc(D.level) + '</span>' : '') + '</p>' +
      '<h1>' + D.title + '</h1>' + (D.intro ? '<p class="kt-intro">' + D.intro + '</p>' : '') +
      (D.goals && D.goals.length ? '<div class="kt-goals"><h2>Das kann ich jetzt</h2><ul>' +
        D.goals.map(function (g) { return '<li>' + g + '</li>'; }).join('') + '</ul></div>' : '');
    main.appendChild(hero);

    var uebenUrl = BASE + D.date + '/ueben/';
    var qr = el('aside', 'kt-qr');
    qr.innerHTML = '<img src="' + BASE + D.date + '/qr-ueben.svg" alt="QR-Code zu den Übungen" width="112" height="112">' +
      '<div class="kt-qr-text"><p>📱 Übungen auf dem Handy: QR-Code scannen</p>' +
      '<span class="kt-pdfnote">' + SITE.replace('https://', '') + uebenUrl + '</span>' +
      '<a class="kt-btn" href="' + uebenUrl + '">Zu den Übungen</a></div>' +
      '<p class="kt-noprint">PDF zum Drucken: <a href="protokoll-' + date + '-deutsch.pdf" download>kurz, nur Deutsch</a> · <a href="protokoll-' + date + '.pdf" download>lang, mit 8 Sprachen</a></p>';
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

  /* ---------- exercises ---------- */
  var sets = {};      // id -> {total, done, correct}
  function updateTotal() {
    var tot = 0, done = 0, ok = 0;
    Object.keys(sets).forEach(function (k) { tot += sets[k].total; done += sets[k].done; ok += sets[k].correct; });
    var p = document.getElementById('kt-total');
    if (!p) return;
    p.querySelector('p').textContent = 'Fortschritt: ' + done + ' von ' + tot + ' erledigt · ' + ok + ' richtig';
    p.querySelector('i').style.width = (tot ? Math.round(done / tot * 100) : 0) + '%';
    p.querySelector('.kt-bar').setAttribute('aria-valuenow', tot ? Math.round(done / tot * 100) : 0);
  }
  function setScore(card, st) {
    var s = card.querySelector('.kt-score span');
    if (s) s.textContent = st.done < st.total
      ? st.done + ' / ' + st.total + ' erledigt'
      : (st.kind === 'steckbrief' ? 'Fertig ✓' : st.correct + ' von ' + st.total + ' richtig' + (st.correct === st.total ? ' 🎉' : ''));
    updateTotal();
  }
  function feedback(ok, right, why) {
    var f = el('p', 'kt-fb ' + (ok ? 'ok' : 'bad'));
    f.setAttribute('role', 'status');
    f.innerHTML = (ok ? '✓ Richtig!' : '✗ Leider falsch.' + (right ? ' Richtig ist: <b>' + right + '</b>' : '')) +
      (why ? '<span>' + why + '</span>' : '');
    return f;
  }

  function buildChoice(set, box, st, round) {
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
      if (set.type === 'choice' || isGap) order = shuffle(order, set.id + qi + 'r' + round);
      order.forEach(function (oi) {
        var b = el('button', 'kt-opt');
        b.type = 'button';
        b.innerHTML = it.options[oi];
        b.addEventListener('click', function () {
          var ok = oi === it.answer;
          var all = opts.querySelectorAll('button');
          for (var k = 0; k < all.length; k++) all[k].disabled = true;
          b.classList.add(ok ? 'ok' : 'bad');
          if (!ok) {
            for (var m = 0; m < all.length; m++) if (+all[m].getAttribute('data-i') === it.answer) all[m].classList.add('ok');
          }
          if (isGap) {
            var g = qt.querySelector('.kt-gap');
            g.innerHTML = it.options[it.answer];
            g.classList.add(ok ? 'ok' : 'bad');
          }
          q.appendChild(feedback(ok, ok ? '' : it.options[it.answer], it.why));
          st.done++; if (ok) st.correct++;
          setScore(box.parentNode, st);
        });
        b.setAttribute('data-i', oi);
        opts.appendChild(b);
      });
      q.appendChild(opts);
      box.appendChild(q);
    });
    st.total = (set.items || []).length;
  }

  function buildOrder(set, box, st, round) {
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
      var checked = false;
      sh.forEach(function (ci) {
        var c = el('button', 'kt-chunk');
        c.type = 'button';
        c.innerHTML = chunks[ci];
        c.addEventListener('click', function () {
          if (checked || c.classList.contains('used')) return;
          c.classList.add('used');
          picked.push(ci);
          var p = el('span', 'kt-chunk');
          p.innerHTML = chunks[ci];
          p.style.cursor = 'default';
          built.appendChild(p);
        });
        pool.appendChild(c);
      });
      var row = el('div', 'kt-row');
      row.style.marginTop = '10px';
      var reset = el('button', 'kt-btn quiet', '↺ Zurücksetzen');
      reset.type = 'button';
      var check = el('button', 'kt-btn', 'Prüfen');
      check.type = 'button';
      reset.addEventListener('click', function () {
        picked = []; built.innerHTML = ''; built.className = 'kt-built';
        var all = pool.querySelectorAll('.kt-chunk');
        for (var k = 0; k < all.length; k++) all[k].classList.remove('used');
        if (checked) { var f = q.querySelector('.kt-fb'); if (f) f.remove(); checked = false; }
      });
      var scored = false;
      check.addEventListener('click', function () {
        if (checked) return;
        if (picked.length < chunks.length) {
          var old = q.querySelector('.kt-fb'); if (old) old.remove();
          var hint = el('p', 'kt-fb bad', 'Bitte zuerst alle Wörter antippen.');
          q.appendChild(hint);
          return;
        }
        var prev = q.querySelector('.kt-fb'); if (prev) prev.remove();
        // Compare text, not index: identical chunks may appear twice.
        var ok = picked.map(function (i) { return chunks[i]; }).join(' ') === chunks.join(' ');
        checked = true;
        built.classList.add(ok ? 'ok' : 'bad');
        q.appendChild(feedback(ok, ok ? '' : chunks.join(' '), it.why));
        if (!scored) { scored = true; st.done++; if (ok) st.correct++; setScore(box.parentNode, st); }
      });
      row.appendChild(reset); row.appendChild(check);
      q.appendChild(built); q.appendChild(pool); q.appendChild(row);
      box.appendChild(q);
    });
    st.total = (set.items || []).length;
  }

  function buildMatch(set, box, st, round) {
    var pairs = (set.items && set.items[0] && set.items[0].pairs) || [];
    var grid = el('div', 'kt-match');
    var L = el('div', 'kt-col'), R = el('div', 'kt-col');
    var sel = null, mistakes = {}, matched = 0;
    var fb = el('p', 'kt-fb');
    fb.setAttribute('role', 'status');
    pairs.forEach(function (p, i) {
      var b = el('button', 'kt-opt'); b.type = 'button'; b.innerHTML = p[0]; b.setAttribute('data-i', i);
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
      var b = el('button', 'kt-opt'); b.type = 'button'; b.innerHTML = pairs[i][1]; b.setAttribute('data-i', i);
      b.addEventListener('click', function () {
        if (b.disabled) return;
        if (!sel) { fb.className = 'kt-fb bad'; fb.textContent = 'Tippen Sie zuerst links.'; return; }
        var li = +sel.getAttribute('data-i');
        if (li === i) {
          sel.classList.remove('sel'); sel.classList.add('ok'); sel.disabled = true;
          b.classList.add('ok'); b.disabled = true;
          sel = null; matched++;
          st.done++; if (!mistakes[li]) st.correct++;
          fb.className = 'kt-fb ok'; fb.textContent = matched === pairs.length ? '✓ Alles richtig zugeordnet!' : '✓ Richtig!';
          setScore(box.parentNode, st);
        } else {
          mistakes[li] = true;
          b.classList.add('bad');
          fb.className = 'kt-fb bad'; fb.textContent = '✗ Das passt nicht. Versuchen Sie es noch einmal.';
          setTimeout(function () { b.classList.remove('bad'); }, 700);
        }
      });
      R.appendChild(b);
    });
    grid.appendChild(L); grid.appendChild(R);
    box.appendChild(grid); box.appendChild(fb);
    st.total = pairs.length;
  }

  function buildSteckbrief(set, box, st) {
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
    var copy = el('button', 'kt-btn quiet', '📋 Kopieren');
    copy.type = 'button'; copy.hidden = true;
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
      if (!made) { made = true; st.done = 1; st.correct = 1; setScore(box.parentNode, st); }
    }
    copy.addEventListener('click', function () {
      var text = out.textContent;
      function done() { copy.textContent = '✓ Kopiert'; setTimeout(function () { copy.textContent = '📋 Kopieren'; }, 1500); }
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done, fallback);
      } else fallback();
      function fallback() {
        var ta = el('textarea'); ta.value = text; ta.style.position = 'fixed'; ta.style.opacity = '0';
        document.body.appendChild(ta); ta.select();
        try { document.execCommand('copy'); done(); } catch (e) { /* ignore */ }
        ta.remove();
      }
    });
    box.appendChild(form); box.appendChild(out); box.appendChild(copy); box.appendChild(hint);
    st.total = 1;
  }

  function renderSet(set, card, round) {
    card.innerHTML = '';
    var ins = INSTR[set.type] || ['', []];
    card.innerHTML = '<h2>' + (set.icon ? '<span aria-hidden="true">' + set.icon + '</span>' : '') + '<span>' + set.title + '</span></h2>' +
      '<div class="kt-instr"><div class="kt-de">' + ins[0] + '</div>' + trHTML(ins[1]) + '</div>';
    var box = el('div', 'kt-qs');
    card.appendChild(box);
    var st = { total: 0, done: 0, correct: 0, kind: set.type };
    sets[set.id] = st;
    if (set.type === 'choice' || set.type === 'gap') buildChoice(set, box, st, round);
    else if (set.type === 'order') buildOrder(set, box, st, round);
    else if (set.type === 'match') buildMatch(set, box, st, round);
    else if (set.type === 'steckbrief') buildSteckbrief(set, box, st);
    var sc = el('div', 'kt-score');
    sc.innerHTML = '<span></span>';
    var again = el('button', 'kt-btn quiet', '↺ Nochmal');
    again.type = 'button';
    again.addEventListener('click', function () { renderSet(set, card, round + 1); card.scrollIntoView({ block: 'start' }); });
    sc.appendChild(again);
    card.appendChild(sc);
    setScore(card, st);
  }

  function renderUeben(main) {
    var U = window.KT_UEBEN;
    var nr = (window.KT_DAY && window.KT_DAY.nr) || '';
    main.appendChild(crumbs([['Startseite', '/'], ['Kurstagebuch', BASE], [nr ? 'Tag ' + nr : deDate(date), BASE + date + '/'], ['Übungen', '']]));
    main.appendChild(picker());
    var hero = el('section', 'kt-hero');
    hero.innerHTML = '<p class="kt-kicker"><span>' + deDate(U.date || date) + '</span></p><h1>' + U.title + '</h1>' +
      '<p class="kt-row"><a class="kt-btn quiet" href="' + BASE + (U.date || date) + '/">← Zum Protokoll</a></p>';
    main.appendChild(hero);
    var prog = el('div', 'kt-progress');
    prog.id = 'kt-total';
    prog.innerHTML = '<p>Fortschritt</p><div class="kt-bar" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0"><i></i></div>';
    main.appendChild(prog);
    (U.sets || []).forEach(function (set) {
      var card = el('section', 'kt-set');
      card.id = set.id;
      main.appendChild(card);
      renderSet(set, card, 0);
    });
    var foot = el('footer', 'kt-foot');
    foot.innerHTML = '<p>Übersetzungen mit KI erstellt und geprüft. Fehler gefunden? Sag es im Kurs.</p>' +
      '<div class="kt-row"><a class="kt-btn quiet" href="' + BASE + (U.date || date) + '/">← Zum Protokoll</a>' +
      '<a class="kt-btn quiet" href="' + BASE + '">Alle Kurstage</a></div>';
    main.appendChild(foot);
    updateTotal();
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
      li.innerHTML = '<p class="kt-kicker"><span>Tag ' + esc(t.nr) + ' · ' + wd + ', ' + deDate(t.date) + '</span>' +
        (t.level ? '<span class="kt-badge">' + esc(t.level) + '</span>' : '') + '</p>' +
        '<h2>' + t.title + '</h2>' + (t.teaser ? '<p>' + t.teaser + '</p>' : '') +
        '<div class="kt-row"><a class="kt-btn" href="' + BASE + t.date + '/">📖 Protokoll</a>' +
        '<a class="kt-btn quiet" href="' + BASE + t.date + '/ueben/">✏️ Übungen</a></div>';
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
        renderProtokoll(main); setLang(getLang(), false);
      }, function () { missing(main, 'Die Daten'); });
    } else if (view === 'ueben') {
      loadScript(BASE + 'daten/' + date + '-ueben.js', function () {
        if (!window.KT_UEBEN) return missing(main, 'Die Übungen');
        // Protocol data is optional here (only for "Tag n" in the breadcrumb).
        loadScript(BASE + 'daten/' + date + '.js', go, go);
        function go() { renderUeben(main); setLang(getLang(), false); }
      }, function () { missing(main, 'Die Übungen'); });
    } else {
      loadScript(BASE + 'daten/tage.js', function () { renderUebersicht(main); }, function () { missing(main, 'Die Kurstage'); });
    }
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();
})();
