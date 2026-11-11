/* Mistakes notebook with spaced repetition ("Meine Fehler"), route #fehler.
   API: window.DMFehler = { add(item), count(), due(), dueList(), list(), remove(id), learned() }
   add({ q, a, src, level?, hint?, opts?, speak?, ctx?, img?, listen?, lkey? })
     q      prompt as shown to the learner (plain text)
     a      correct answer (plain text)
     src    human-readable origin, e.g. "Lektion: Hallo, das bin ich"
     hint   optional explanation ("why")
     opts   optional answer options -> review is multiple choice, otherwise a reveal card
     speak  false = no audio button, string = text to read instead of the answer
     ctx    optional reading text the question refers to (shown folded)
     img    optional picture (path) that belongs to the prompt
     listen optional text that is read aloud as the prompt (listening item), lkey = recording key
   Leitner system: 5 boxes, intervals 0 / 1 / 3 / 7 / 21 days. Correct -> next box, wrong -> box 1,
   correct in box 5 -> learned. State: DM.store.fehler (saved with DM.save, part of the backup).
   Safe to call before site.js has run (items wait in a queue) and never throws. */
(function () {
  "use strict";
  const DM = (window.DM = window.DM || {});
  const DAY = 864e5,
    IV = [0, 1, 3, 7, 21],
    CAP = 400,
    SESSION = 10;
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
  const txt = (s, max) =>
    String(s ?? "")
      .replace(/­/g, "")
      .replace(/[ \t]+/g, " ")
      .trim()
      .slice(0, max);
  const norm = (s) =>
    txt(s, 600)
      .toLocaleLowerCase("de")
      .replace(/\s+/g, " ")
      .replace(/[.!?,;:]+$/, "");
  const hash = (s) => {
    let h = 0x811c9dc5;
    for (let i = 0; i < s.length; i++) {
      h ^= s.charCodeAt(i);
      h = Math.imul(h, 0x01000193) >>> 0;
    }
    return "f" + h.toString(36);
  };
  const dayStart = (t = Date.now()) => {
    const d = new Date(t);
    d.setHours(0, 0, 0, 0);
    return d.getTime();
  };
  const queue = [];

  /* ---------- state ---------- */
  function state() {
    try {
      if (!DM.store) return null;
      let s = DM.store.fehler;
      if (!s || typeof s !== "object" || !Array.isArray(s.items))
        s = DM.store.fehler = { v: 1, items: [], learned: 0 };
      s.learned = Number(s.learned) || 0;
      return s;
    } catch {
      return null;
    }
  }
  function save() {
    try {
      DM.save && DM.save();
    } catch {}
    try {
      window.dispatchEvent(new Event("dm-fehler"));
    } catch {}
  }
  function flush() {
    const s = state();
    if (!s || !queue.length) return s;
    queue.splice(0).forEach((it) => put(s, it));
    save();
    return s;
  }
  function clean(raw) {
    if (!raw || typeof raw !== "object") return null;
    const q = txt(raw.q, 500),
      a = txt(raw.a, 300);
    if (!a || (!q && !raw.listen && !raw.img)) return null;
    const it = {
      id: hash(norm(q || raw.listen || raw.img) + "|" + norm(a)),
      q,
      a,
      src: txt(raw.src, 90) || "Übung",
    };
    if (raw.level) it.level = txt(raw.level, 8);
    if (raw.hint) it.hint = txt(raw.hint, 400);
    if (Array.isArray(raw.opts)) {
      const o = [
        ...new Set(raw.opts.map((v) => txt(v, 200)).filter(Boolean)),
      ].slice(0, 6);
      if (o.length > 1 && o.some((v) => norm(v) === norm(a))) it.opts = o;
    }
    if (raw.speak === false) it.speak = false;
    else if (typeof raw.speak === "string" && raw.speak.trim())
      it.speak = txt(raw.speak, 300);
    if (raw.ctx) it.ctx = String(raw.ctx).trim().slice(0, 1500);
    if (raw.img && /^[\w\-./]+\.(webp|png|jpg|jpeg|svg)$/i.test(raw.img))
      it.img = raw.img;
    if (raw.listen) {
      it.listen = txt(raw.listen, 300);
      if (raw.lkey) it.lkey = txt(raw.lkey, 60);
    }
    return it;
  }
  function put(s, it) {
    const now = Date.now(),
      old = s.items.find((o) => o.id === it.id);
    if (old) {
      // known mistake made again: back to box 1
      if (old.done) {
        delete old.done;
        s.learned = Math.max(0, s.learned - 1);
      }
      Object.assign(old, it, {
        box: 1,
        due: now,
        n: (old.n || 1) + 1,
        added: old.added || now,
      });
      return;
    }
    s.items.push({ ...it, box: 1, due: now, n: 1, added: now });
    if (s.items.length > CAP) {
      // drop oldest learned first, then the oldest items in the highest boxes
      const order = [...s.items].sort(
        (x, y) =>
          (y.done ? 1 : 0) - (x.done ? 1 : 0) ||
          (x.done || 0) - (y.done || 0) ||
          y.box - x.box ||
          x.added - y.added,
      );
      const drop = new Set(
        order.slice(0, s.items.length - CAP).map((o) => o.id),
      );
      drop.delete(it.id);
      s.items = s.items.filter((o) => !drop.has(o.id));
    }
  }
  const active = () => {
    const s = flush();
    return s ? s.items.filter((o) => !o.done) : queue.slice();
  };
  const dueList = () => {
    const now = Date.now();
    return active()
      .filter((o) => (o.due || 0) <= now)
      .sort((x, y) => (x.due || 0) - (y.due || 0) || x.box - y.box);
  };

  const api = {
    add(raw) {
      try {
        const it = clean(raw);
        if (!it) return false;
        const s = state();
        if (!s) {
          if (queue.length < 60) queue.push(it);
          return true;
        }
        flush();
        put(s, it);
        save();
        return true;
      } catch {
        return false;
      }
    },
    count() {
      try {
        return active().length;
      } catch {
        return 0;
      }
    },
    due() {
      try {
        return dueList().length;
      } catch {
        return 0;
      }
    },
    dueList() {
      try {
        return dueList().map((o) => ({ ...o }));
      } catch {
        return [];
      }
    },
    list() {
      try {
        return active().map((o) => ({ ...o }));
      } catch {
        return [];
      }
    },
    learned() {
      try {
        return (state() || {}).learned || 0;
      } catch {
        return 0;
      }
    },
    remove(id) {
      try {
        const s = flush();
        if (!s) return false;
        const n = s.items.length;
        s.items = s.items.filter((o) => o.id !== id);
        if (s.items.length !== n) save();
        return s.items.length !== n;
      } catch {
        return false;
      }
    },
  };
  window.DMFehler = api;

  /* grade one answer: returns { from, to, learned, days } */
  function grade(id, ok) {
    const s = flush(),
      it = s && s.items.find((o) => o.id === id);
    if (!it) return null;
    const from = it.box || 1;
    let res;
    if (!ok) {
      it.box = 1;
      it.due = Date.now();
      it.n = (it.n || 1) + 1;
      res = { from, to: 1, days: 0 };
    } else if (from >= 5) {
      it.done = Date.now();
      it.box = 5;
      s.learned++;
      res = { from, to: 5, learned: true };
    } else {
      it.box = from + 1;
      it.due = dayStart() + IV[it.box - 1] * DAY;
      res = { from, to: it.box, days: IV[it.box - 1] };
    }
    it.last = Date.now();
    save();
    return res;
  }

  /* ---------- UI strings in the learner's language (second line under the German) ---------- */
  const RTL = ["ar", "fa"];
  const T = {
    en: {
      help: "Your mistakes are collected here. You repeat them after 1, 3, 7 and 21 days – this way you remember them.",
      start: "Review now",
      empty:
        "Your notebook is empty. Do an exercise – your mistakes are saved here automatically.",
      nodue: "Nothing to review today. Come back tomorrow!",
      show: "Show answer",
      known: "I knew it",
      unknown: "I didn’t know it",
      correct: "Correct answer:",
      next: "Next",
      list: "Show all mistakes",
      del: "Delete",
      learned: "Learned",
      result: "Done for today!",
      listen: "Listen",
    },
    uk: {
      help: "Тут зібрані твої помилки. Ти повторюєш їх через 1, 3, 7 і 21 день – так вони краще запам’ятовуються.",
      start: "Повторити зараз",
      empty:
        "Твій зошит помилок порожній. Зроби вправу – помилки зберігаються тут автоматично.",
      nodue: "Сьогодні нічого повторювати. Приходь завтра!",
      show: "Показати відповідь",
      known: "Знаю",
      unknown: "Не знаю",
      correct: "Правильно:",
      next: "Далі",
      list: "Показати всі помилки",
      del: "Видалити",
      learned: "Вивчено",
      result: "На сьогодні все!",
      listen: "Слухати",
    },
    ru: {
      help: "Здесь собраны твои ошибки. Ты повторяешь их через 1, 3, 7 и 21 день – так они лучше запоминаются.",
      start: "Повторить сейчас",
      empty:
        "Твоя тетрадь ошибок пуста. Сделай упражнение – ошибки сохраняются здесь автоматически.",
      nodue: "Сегодня повторять нечего. Приходи завтра!",
      show: "Показать ответ",
      known: "Знаю",
      unknown: "Не знаю",
      correct: "Правильно:",
      next: "Дальше",
      list: "Показать все ошибки",
      del: "Удалить",
      learned: "Выучено",
      result: "На сегодня всё!",
      listen: "Слушать",
    },
    ar: {
      help: "هنا تجد أخطاءك. تكرّرها بعد 1 و3 و7 و21 يومًا – هكذا تبقى في الذاكرة.",
      start: "راجع الآن",
      empty: "دفتر الأخطاء فارغ. حلّ تمرينًا – تُحفظ أخطاؤك هنا تلقائيًا.",
      nodue: "لا شيء للمراجعة اليوم. عُد غدًا!",
      show: "أظهر الإجابة",
      known: "عرفتُها",
      unknown: "لم أعرفها",
      correct: "الصحيح:",
      next: "التالي",
      list: "عرض كل الأخطاء",
      del: "حذف",
      learned: "تمّ تعلّمه",
      result: "انتهيت لليوم!",
      listen: "استمع",
    },
    fa: {
      help: "اشتباه‌های تو اینجا جمع می‌شوند. آن‌ها را بعد از ۱، ۳، ۷ و ۲۱ روز تکرار می‌کنی – این‌طور در ذهنت می‌مانند.",
      start: "همین حالا مرور کن",
      empty:
        "دفتر اشتباه‌های تو خالی است. یک تمرین انجام بده – اشتباه‌هایت خودکار اینجا ذخیره می‌شوند.",
      nodue: "امروز چیزی برای مرور نیست. فردا دوباره بیا!",
      show: "نمایش جواب",
      known: "بلد بودم",
      unknown: "بلد نبودم",
      correct: "درست:",
      next: "بعدی",
      list: "نمایش همهٔ اشتباه‌ها",
      del: "حذف",
      learned: "یاد گرفته‌شده",
      result: "برای امروز تمام شد!",
      listen: "گوش کن",
    },
    tr: {
      help: "Hataların burada toplanır. Onları 1, 3, 7 ve 21 gün sonra tekrar edersin – böylece aklında kalır.",
      start: "Şimdi tekrar et",
      empty:
        "Hata defterin boş. Bir alıştırma yap – hataların otomatik olarak buraya kaydedilir.",
      nodue: "Bugün tekrar edilecek bir şey yok. Yarın yine gel!",
      show: "Cevabı göster",
      known: "Biliyordum",
      unknown: "Bilmiyordum",
      correct: "Doğrusu:",
      next: "Devam",
      list: "Tüm hataları göster",
      del: "Sil",
      learned: "Öğrenildi",
      result: "Bugünlük bitti!",
      listen: "Dinle",
    },
    es: {
      help: "Aquí están tus errores. Los repites después de 1, 3, 7 y 21 días: así se quedan en la memoria.",
      start: "Repasar ahora",
      empty:
        "Tu cuaderno de errores está vacío. Haz un ejercicio: tus errores se guardan aquí automáticamente.",
      nodue: "Hoy no hay nada que repasar. ¡Vuelve mañana!",
      show: "Mostrar respuesta",
      known: "Lo sabía",
      unknown: "No lo sabía",
      correct: "Correcto:",
      next: "Siguiente",
      list: "Ver todos los errores",
      del: "Borrar",
      learned: "Aprendido",
      result: "¡Listo por hoy!",
      listen: "Escuchar",
    },
    it: {
      help: "Qui trovi i tuoi errori. Li ripeti dopo 1, 3, 7 e 21 giorni: così restano in mente.",
      start: "Ripassa ora",
      empty:
        "Il tuo quaderno degli errori è vuoto. Fai un esercizio: i tuoi errori vengono salvati qui automaticamente.",
      nodue: "Oggi non c’è niente da ripassare. Torna domani!",
      show: "Mostra la risposta",
      known: "Lo sapevo",
      unknown: "Non lo sapevo",
      correct: "Corretto:",
      next: "Avanti",
      list: "Mostra tutti gli errori",
      del: "Elimina",
      learned: "Imparato",
      result: "Per oggi hai finito!",
      listen: "Ascolta",
    },
  };
  const uiLang = () => {
    try {
      const l = DM.hi18n && DM.hi18n.get();
      return T[l] ? l : "";
    } catch {
      return "";
    }
  };
  /* small second line in the learner's language ("" for German) */
  const tr = (key, tag = "span") => {
    const l = uiLang();
    return l && T[l][key]
      ? `<${tag} class="fh-tr" lang="${l}" dir="${RTL.includes(l) ? "rtl" : "ltr"}">${esc(T[l][key])}</${tag}>`
      : "";
  };

  /* ---------- page ---------- */
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const shuffle = (a) => {
    a = [...a];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };
  const crumbs = () => (DM.crumbs ? DM.crumbs([["Meine Fehler"]]) : "");
  const say = (text, key, btn) => {
    try {
      if (!DM.speak || !text) return;
      btn && btn.classList.add("is-playing");
      const r = DM.speak(text, {
        key: key || undefined,
        onend: () => btn && btn.classList.remove("is-playing"),
      });
      if (r === false && btn) btn.classList.remove("is-playing");
    } catch {}
  };
  const speakText = (it) =>
    it.speak === false
      ? ""
      : typeof it.speak === "string"
        ? it.speak
        : it.listen || it.a;
  const whenText = (it) => {
    const d = Math.round((dayStart(it.due || 0) - dayStart()) / DAY);
    return d <= 0
      ? "heute dran"
      : d === 1
        ? "morgen dran"
        : `in ${d} Tagen dran`;
  };
  const boxRow = (items) =>
    `<ol class="fh-boxes" aria-label="Deine 5 Fächer">${[1, 2, 3, 4, 5]
      .map((b) => {
        const n = items.filter((o) => (o.box || 1) === b).length;
        return `<li class="${n ? "is-on" : ""}"><span>Fach ${b}</span><b>${n}</b><small>${["heute", "+1 Tag", "+3 Tage", "+7 Tage", "+21 Tage"][b - 1]}</small></li>`;
      })
      .join("")}</ol>`;

  function home() {
    const items = active(),
      due = dueList(),
      learned = api.learned();
    const head = `${crumbs()}<div class="dm-head"><p class="dm-kicker">Wiederholen</p><h1>Meine Fehler</h1>`;
    if (!items.length) {
      DM.page(
        `${head}<p class="dm-lead">Dein Fehlerheft ist leer.</p></div>
        <section class="dm-card fh-empty"><p class="fh-big" aria-hidden="true">📓</p>
          <p><b>Mach eine Übung.</b> Deine Fehler kommen automatisch hierher. Dann kannst du sie wiederholen.</p>${tr("empty", "p")}
          ${learned ? `<p class="fh-learned">✓ Gelernt: <b>${learned}</b></p>` : ""}
          <p class="dm-row"><a class="dm-btn" href="#kurs">Zum Kurs →</a><a class="dm-btn dm-btn-quiet" href="#challenge">Tages-Challenge →</a></p></section>
        ${help()}`,
        "fh-page",
      );
      return;
    }
    const n = items.length,
      d = due.length;
    const nextDue = d
      ? null
      : items.reduce((m, o) => Math.min(m, o.due || 0), Infinity);
    const groups = {};
    items.forEach((o) => (groups[o.src] ||= []).push(o));
    DM.page(
      `${head}<p class="dm-lead fh-count"><b>${n}</b> Fehler im Heft · ${d === 0 ? "heute ist <b>nichts</b> dran" : d === 1 ? "<b>1</b> ist heute dran" : `<b>${d}</b> sind heute dran`}</p></div>
      <section class="dm-card fh-start">
        ${
          d
            ? `<button type="button" class="dm-btn fh-go" id="fh-go">Jetzt wiederholen ▶${tr("start")}</button><p class="dm-small">${d > SESSION ? `Eine Runde hat ${SESSION} Aufgaben.` : `Eine Runde: ${d} ${d === 1 ? "Aufgabe" : "Aufgaben"}.`} Das dauert nur ein paar Minuten.</p>`
            : `<p><b>Heute ist nichts dran. Komm ${Math.round((dayStart(nextDue) - dayStart()) / DAY) <= 1 ? "morgen" : `in ${Math.round((dayStart(nextDue) - dayStart()) / DAY)} Tagen`} wieder!</b></p>${(Math.round((dayStart(nextDue) - dayStart()) / DAY) <= 1 ? tr("nodue", "p") : "")}<p class="dm-row"><a class="dm-btn" href="#kurs">Weiterlernen →</a><a class="dm-btn dm-btn-quiet" href="#challenge">Tages-Challenge →</a></p>`
        }
        ${boxRow(items)}
        <p class="fh-learned">✓ Gelernt: <b>${learned}</b>${tr("learned")}</p>
      </section>
      ${help()}
      <details class="dm-card fh-list" data-rv="1"><summary>Alle Fehler ansehen (${n})${tr("list")}</summary>
        ${Object.entries(groups)
          .map(
            ([src, list]) =>
              `<section class="fh-group"><h3>${esc(src)} <small>(${list.length})</small></h3><ul>${list.map((o) => `<li data-id="${o.id}"><div><p class="fh-q">${esc(o.q || (o.listen ? "🔊 " + o.listen : "Was ist das?"))}</p><p class="fh-a">✓ ${esc(o.a)}</p><p class="dm-small">Fach ${o.box || 1} · ${whenText(o)}</p></div><button type="button" class="fh-del" data-del="${o.id}" aria-label="Löschen: ${esc(o.a)}"><span aria-hidden="true">🗑</span><span class="fh-del-t">Löschen</span></button></li>`).join("")}</ul></section>`,
          )
          .join("")}
      </details>
      ${items.some((o) => o.level === "LiD") && window.LID_QUELLE_HTML ? window.LID_QUELLE_HTML : ""}`,
      "fh-page",
    );
    const go = $("#fh-go");
    if (go) go.onclick = () => session();
    $$("[data-del]").forEach(
      (b) =>
        (b.onclick = () => {
          api.remove(b.dataset.del);
          const open = !!$(".fh-list")?.open;
          home();
          const l = $(".fh-list");
          if (l && open) l.open = true;
        }),
    );
  }
  const help = () =>
    `<aside class="dm-note fh-help"><p><b>So geht es:</b> Hier stehen deine Fehler. Du wiederholst sie nach 1, 3, 7 und 21 Tagen – so bleiben sie im Kopf.</p>${tr("help", "p")}</aside>`;

  function session() {
    const cards = dueList().slice(0, SESSION);
    if (!cards.length) return home();
    let i = 0,
      right = 0,
      moved = 0,
      done = 0;
    const top = () =>
      `${crumbs()}<div class="fh-top"><span>${i + 1} / ${cards.length}</span><div class="fh-bar"><i style="width:${(i / cards.length) * 100}%"></i></div><a href="#fehler" class="fh-quit" id="fh-quit">Beenden</a></div>`;
    const prompt = (
      it,
    ) => `<p class="fh-src"><span class="dm-tag">${esc(it.src)}</span> <span class="dm-small">Fach ${it.box || 1}</span></p>
      ${it.ctx ? `<details class="fh-ctx"><summary>Text lesen</summary><p>${esc(it.ctx)}</p></details>` : ""}
      ${it.img ? `<img class="fh-img" src="${esc(it.img)}" alt="" onerror="this.remove()">` : ""}
      ${it.listen ? `<p><button type="button" class="dm-btn dm-btn-quiet fh-listen"><span aria-hidden="true">🔊</span> Anhören${tr("listen")}</button></p>` : ""}
      ${it.q ? `<h1 class="fh-question">${esc(it.q)}</h1>` : `<h1 class="fh-question">${it.listen ? "Hör zu. Was passt?" : "Was ist das?"}</h1>`}`;
    function feedback(it, ok) {
      const res = grade(it.id, ok) || { from: 1, to: 1 };
      if (ok) right++;
      if (res.learned) done++;
      else if (ok) moved++;
      const sp = speakText(it);
      const move = res.learned
        ? "Gelernt! Diese Aufgabe ist jetzt fertig. 🎉"
        : ok
          ? `Fach ${res.from} → Fach ${res.to}. Du siehst die Aufgabe in ${res.days} ${res.days === 1 ? "Tag" : "Tagen"} wieder.`
          : "Zurück in Fach 1. Du übst die Aufgabe bald noch einmal.";
      const fb = $("#fh-fb");
      fb.hidden = false;
      fb.className = "fh-fb " + (ok ? "is-ok" : "is-bad");
      fb.innerHTML = `<p class="fh-verdict"><b>${ok ? "✓ Richtig!" : "✗ Noch nicht richtig."}</b></p>
        <p class="fh-answer"><span>Richtig ist:${tr("correct")}</span> <b lang="de">${esc(it.a)}</b>${sp ? ` <button type="button" class="fh-say" aria-label="Anhören: ${esc(sp)}">🔊</button>` : ""}</p>
        ${it.hint ? `<p class="fh-hint">💡 ${esc(it.hint)}</p>` : ""}
        <p class="dm-small fh-move">${move}</p>
        <p><button type="button" class="dm-btn" id="fh-next">${i + 1 < cards.length ? "Weiter →" : "Ergebnis ansehen"}${tr("next")}</button></p>`;
      const sb = $(".fh-say", fb);
      if (sb) sb.onclick = () => say(sp, it.lkey, sb);
      const nx = $("#fh-next");
      nx.onclick = () => {
        i++;
        i < cards.length ? render() : result();
      };
      nx.focus({ preventScroll: true });
      fb.scrollIntoView({ block: "nearest" });
    }
    function render() {
      const it = cards[i];
      const opts = it.opts ? shuffle(it.opts) : null;
      DM.page(
        `${top()}<section class="dm-card fh-card" aria-live="polite">${prompt(it)}
        ${
          opts
            ? `<div class="fh-opts">${opts.map((o, k) => `<button type="button" class="fh-opt" data-k="${k}" lang="de">${esc(o)}</button>`).join("")}</div>`
            : `<p id="fh-reveal-box"><button type="button" class="dm-btn" id="fh-reveal">Antwort zeigen${tr("show")}</button></p>
             <div id="fh-self" hidden><p class="fh-answer"><span>Richtig ist:${tr("correct")}</span> <b lang="de">${esc(it.a)}</b>${speakText(it) ? ` <button type="button" class="fh-say" aria-label="Anhören">🔊</button>` : ""}</p>${it.hint ? `<p class="fh-hint">💡 ${esc(it.hint)}</p>` : ""}
             <p class="fh-ask">Hast du es gewusst?</p><div class="fh-two"><button type="button" class="dm-btn fh-yes" id="fh-yes">✓ Gewusst${tr("known")}</button><button type="button" class="dm-btn dm-btn-quiet fh-no" id="fh-no">✗ Nicht gewusst${tr("unknown")}</button></div></div>`
        }
        <div id="fh-fb" class="fh-fb" hidden></div></section>`,
        "fh-page fh-run",
      );
      window.scrollTo({ top: 0, behavior: "instant" });
      const lb = $(".fh-listen");
      if (lb) {
        lb.onclick = () => say(it.listen, it.lkey, lb);
        setTimeout(() => document.body.contains(lb) && lb.click(), 300);
      }
      if (opts) {
        const btns = $$(".fh-opt");
        btns.forEach(
          (b) =>
            (b.onclick = () => {
              const ok = norm(opts[+b.dataset.k]) === norm(it.a);
              btns.forEach((x) => {
                x.disabled = true;
                if (norm(opts[+x.dataset.k]) === norm(it.a))
                  x.classList.add("is-right");
              });
              if (!ok) b.classList.add("is-wrong");
              feedback(it, ok);
            }),
        );
      } else {
        $("#fh-reveal").onclick = () => {
          $("#fh-reveal-box").hidden = true;
          const self = $("#fh-self");
          self.hidden = false;
          const sb = $(".fh-say", self);
          if (sb) sb.onclick = () => say(speakText(it), it.lkey, sb);
          $("#fh-yes").focus({ preventScroll: true });
        };
        const self = (ok) => {
          const res = grade(it.id, ok);
          if (ok) right++;
          if (res && res.learned) done++;
          else if (ok) moved++;
          i++;
          i < cards.length ? render() : result();
        };
        $("#fh-yes").onclick = () => self(true);
        $("#fh-no").onclick = () => self(false);
      }
    }
    function result() {
      const left = dueList().length,
        all = right === cards.length;
      DM.page(
        `${crumbs()}<section class="dm-card fh-result">
        <p class="dm-kicker">Runde fertig${tr("result")}</p>
        <h1>${all ? "Super! Alles richtig." : right >= cards.length / 2 ? "Gut gemacht!" : "Weiter üben – das wird!"}</h1>
        <p class="fh-score">${right} <small>von ${cards.length} richtig</small></p>
        <ul class="fh-sum">${moved ? `<li>⬆ ${moved} ${moved === 1 ? "Aufgabe ist" : "Aufgaben sind"} ein Fach weiter.</li>` : ""}${done ? `<li>🎉 ${done} ${done === 1 ? "Aufgabe ist" : "Aufgaben sind"} jetzt gelernt.</li>` : ""}${cards.length - right ? `<li>↺ ${cards.length - right} ${cards.length - right === 1 ? "Aufgabe kommt" : "Aufgaben kommen"} noch einmal.</li>` : ""}</ul>
        <p class="dm-row">${left ? `<button type="button" class="dm-btn" id="fh-more">Noch eine Runde ▶ (${Math.min(left, SESSION)})</button>` : ""}<a class="dm-btn${left ? " dm-btn-quiet" : ""}" href="#fehler" id="fh-back">Zum Fehlerheft</a><a class="dm-btn dm-btn-quiet" href="#kurs">Weiterlernen →</a></p>
        ${left ? "" : '<p class="dm-small">Für heute bist du fertig. Komm morgen wieder!</p>'}</section>`,
        "fh-page",
      );
      window.scrollTo({ top: 0, behavior: "instant" });
      if (all && DM.celebrate)
        try {
          DM.celebrate($(".fh-result"));
        } catch {}
      const m = $("#fh-more");
      if (m) m.onclick = () => session();
      $("#fh-back").onclick = (e) => {
        e.preventDefault();
        home();
        window.scrollTo({ top: 0, behavior: "instant" });
      };
    }
    render();
    // "Beenden" has the same hash as the page itself -> render the overview by hand
    document.addEventListener("click", function quit(e) {
      if (!document.querySelector(".fh-run")) {
        document.removeEventListener("click", quit);
        return;
      }
      if (e.target.closest && e.target.closest("#fh-quit")) {
        e.preventDefault();
        document.removeEventListener("click", quit);
        home();
      }
    });
  }

  DM.routes = DM.routes || {};
  DM.routes.fehler = (p) => {
    flush();
    if (p && p[1] === "start" && dueList().length) session();
    else home();
  };
  // items added before site.js was ready
  window.addEventListener("DOMContentLoaded", () => setTimeout(flush, 0));
  window.addEventListener("load", flush);
})();
