/* Grammar trainer: #grammatik (overview), #grammatik/<id> (rule page), #grammatik/<id>/ueben (round of 10 items).
   Data: grammatik-data.js (window.DMGrammatik). Both files are loaded lazily for the route "grammatik" (lazy.js).
   Progress: DM.store.grammatik = { [id]: { seen, best, rounds, mastered: { itemIndex: n } } }
     seen = 1 once the topic was opened, best = best round result in percent (topic is done at >= 80),
     rounds = finished rounds, mastered[i] = correct answers in a row for item i (0 after a mistake).
   Wrong answers go to the mistakes notebook (DMFehler.add). */
(() => {
  const DM = (window.DM = window.DM || {});
  const LEVELS = ["A1", "A2", "B1", "B2"];
  const LEVEL_NAMES = {
    A1: "Erste Schritte",
    A2: "Alltag meistern",
    B1: "Sicher ausdrücken",
    B2: "Deutsch im Beruf",
  };
  const ROUND = 10,
    PASS = 80;
  const topics = () => window.DMGrammatik || [];
  const esc = (s) =>
    DM.esc
      ? DM.esc(s)
      : String(s ?? "").replace(
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
  const mark = (s) => esc(s).replace(/\*([^*]+)\*/g, "<mark>$1</mark>");
  const plain = (s) => String(s).replace(/\*/g, "");
  const $ = (s, r = document) => r.querySelector(s);
  const shuffle = (a) => {
    a = [...a];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };

  /* ---------- progress ---------- */
  let fallback = {};
  const all = () => {
    const s = DM.store || fallback;
    return (s.grammatik ||= {});
  };
  const prog = (id) => {
    const g = all();
    const p = (g[id] ||= { seen: 0, best: 0, rounds: 0, mastered: {} });
    p.mastered ||= {};
    return p;
  };
  const peek = (id) =>
    all()[id] || { seen: 0, best: 0, rounds: 0, mastered: {} };
  const save = () => {
    try {
      DM.save && DM.save();
    } catch {
      /* private mode */
    }
  };
  const isDone = (id) => (peek(id).best || 0) >= PASS;
  const sure = (t) =>
    t.items.filter((_, i) => (peek(t.id).mastered || {})[i] > 0).length;

  /* ---------- small view helpers ---------- */
  const say = (text, label = "") =>
    `<button type="button" class="dm-btn dm-btn-quiet dm-speak gr-say" data-gr-say="${esc(plain(text))}" aria-label="Vorlesen: ${esc(plain(text))}"><span aria-hidden="true">🔊</span>${label ? " " + esc(label) : ""}</button>`;
  const ring = (pct, done) => {
    const r = 17,
      c = 2 * Math.PI * r,
      off = c * (1 - Math.max(0, Math.min(100, pct)) / 100);
    return `<span class="gr-ring${done ? " is-done" : ""}" aria-hidden="true"><svg viewBox="0 0 44 44" width="44" height="44"><circle cx="22" cy="22" r="${r}" class="gr-ring-bg"/><circle cx="22" cy="22" r="${r}" class="gr-ring-fg" stroke-dasharray="${c.toFixed(1)}" stroke-dashoffset="${off.toFixed(1)}" transform="rotate(-90 22 22)"/></svg><b>${done ? "✓" : pct ? pct : ""}</b></span>`;
  };
  const crumbs = (items) => (DM.crumbs ? DM.crumbs(items) : "");
  const page = (html, cls) => {
    if (DM.page) DM.page(html, cls);
    else {
      const m = $("main");
      if (m) m.innerHTML = `<div class="dm-page ${cls}">${html}</div>`;
    }
  };
  const lang = () => {
    try {
      return (DM.hi18n && DM.hi18n.get && DM.hi18n.get()) || "de";
    } catch {
      return "de";
    }
  };

  document.addEventListener("click", (e) => {
    const b = e.target.closest && e.target.closest("[data-gr-say]");
    if (!b) return;
    if (DM.speak) DM.speak(b.dataset.grSay, { rate: 0.9 });
  });

  /* ---------- overview ---------- */
  let filter = null;
  function overview() {
    const T = topics();
    if (filter === null) {
      const lv = DM.store && DM.store.level;
      filter = LEVELS.includes(lv) ? lv : lv === "A0" ? "A1" : "";
    }
    const doneAll = T.filter((t) => isDone(t.id)).length;
    const card = (t) => {
      const p = peek(t.id),
        done = isDone(t.id),
        n = sure(t);
      const info = done
        ? `Geschafft · bestes Ergebnis: ${p.best} %`
        : p.rounds
          ? `Bestes Ergebnis: ${p.best} % · ${n} von ${t.items.length} Aufgaben sicher`
          : `${t.items.length} Aufgaben · noch nicht geübt`;
      return `<li><a class="dm-card gr-card${done ? " is-done" : ""}" href="#grammatik/${t.id}">${ring(p.best || 0, done)}<span class="gr-card-text"><b>${esc(t.title)}</b><small>${esc(info)}</small><span class="dm-mini-progress" aria-hidden="true"><i style="width:${Math.round((n / t.items.length) * 100)}%"></i></span></span></a></li>`;
    };
    const section = (lv) => {
      const list = T.filter((t) => t.level === lv);
      if (!list.length) return "";
      const d = list.filter((t) => isDone(t.id)).length;
      return `<section class="dm-section gr-level" aria-labelledby="gr-h-${lv}"><div class="dm-section-head"><h2 id="gr-h-${lv}">${lv} <span class="gr-lvname">${esc(LEVEL_NAMES[lv])}</span></h2><p>${d} von ${list.length} Themen geschafft</p></div><ul class="gr-grid">${list.map(card).join("")}</ul><p class="dm-small gr-kurslink"><a href="#kurs/${lv}">Zum Kurs ${lv}</a></p></section>`;
    };
    const chip = (v, label) =>
      `<button type="button" class="gr-chip" data-lv="${v}" aria-pressed="${filter === v}">${label}</button>`;
    page(
      `${crumbs([["Grammatik"]])}
      <header class="dm-head"><h1>Grammatik üben</h1><p class="dm-lead">Lies die kurze Regel. Dann übe mit vielen Aufgaben. Du siehst sofort: richtig oder falsch – und warum.</p></header>
      <div class="gr-top"><div class="gr-filter" role="group" aria-label="Niveau wählen">${chip("", "Alle")}${LEVELS.map((l) => chip(l, l)).join("")}</div>
      <p class="dm-small gr-total">${doneAll} von ${T.length} Themen geschafft</p></div>
      <div id="gr-list">${(filter ? [filter] : LEVELS).map(section).join("")}</div>`,
      "gr-page",
    );
    document.querySelectorAll(".gr-chip").forEach(
      (b) =>
        (b.onclick = () => {
          filter = b.dataset.lv;
          document
            .querySelectorAll(".gr-chip")
            .forEach((c) => c.setAttribute("aria-pressed", String(c === b)));
          $("#gr-list").innerHTML = (filter ? [filter] : LEVELS)
            .map(section)
            .join("");
        }),
    );
  }

  /* ---------- topic page: rule, table, examples, typical mistakes ---------- */
  function topicPage(t) {
    const p = prog(t.id);
    if (!p.seen) {
      p.seen = 1;
      save();
    }
    const lg = lang(),
      tr = lg !== "de" && t.kurz_i18n && t.kurz_i18n[lg];
    const rtl = lg === "ar" || lg === "fa";
    const n = sure(t),
      done = isDone(t.id);
    const table = t.tabelle
      ? `<div class="gr-tablewrap" tabindex="0" role="group" aria-label="Tabelle mit Formen"><table class="gr-table" lang="de"><thead><tr>${t.tabelle.head.map((h) => `<th scope="col">${mark(h)}</th>`).join("")}</tr></thead><tbody>${t.tabelle.rows.map((r) => `<tr>${r.map((c, i) => (i ? `<td>${mark(c)}</td>` : `<th scope="row">${mark(c)}</th>`)).join("")}</tr>`).join("")}</tbody></table></div>`
      : "";
    const status = p.rounds
      ? `<p class="dm-small gr-status">${done ? "✓ Geschafft. " : ""}Bestes Ergebnis: ${p.best} % · ${n} von ${t.items.length} Aufgaben sicher</p>`
      : `<p class="dm-small gr-status">${t.items.length} Aufgaben · eine Runde hat ${ROUND} Aufgaben.</p>`;
    page(
      `${crumbs([["Grammatik", "#grammatik"], [t.title]])}
      <header class="dm-head gr-head"><span class="dm-tag">${t.level} · Grammatik</span><h1>${esc(t.title)}</h1></header>
      <section class="dm-card gr-rule" aria-labelledby="gr-rule-h"><h2 id="gr-rule-h">Die Regel</h2>
        <p class="gr-kurz" lang="de">${mark(t.kurz)}</p>
        ${tr ? `<p class="gr-tr" lang="${lg}" dir="${rtl ? "rtl" : "ltr"}">${mark(tr)}</p>` : ""}
        ${table}
        <div class="dm-row gr-cta"><a class="dm-btn" href="#grammatik/${t.id}/ueben">Üben <span aria-hidden="true">▶</span></a></div>${status}
      </section>
      <section class="dm-section gr-sec" aria-labelledby="gr-ex-h"><h2 id="gr-ex-h">Beispiele</h2>
        <ul class="gr-examples">${t.beispiele.map((b) => `<li>${say(b)}<span lang="de">${mark(b)}</span></li>`).join("")}</ul></section>
      <section class="dm-section gr-sec" aria-labelledby="gr-err-h"><h2 id="gr-err-h">Typische Fehler</h2>
        <ul class="gr-errors">${t.fehler.map(([bad, good, why]) => `<li><p class="gr-bad" lang="de"><span aria-hidden="true">✗</span><span class="gr-sr">Falsch: </span> <s>${esc(bad)}</s></p><p class="gr-good" lang="de"><span aria-hidden="true">✓</span><span class="gr-sr">Richtig: </span> ${esc(good)}</p><p class="dm-small">${esc(why)}</p></li>`).join("")}</ul></section>
      <div class="dm-row gr-cta gr-cta-end"><a class="dm-btn" href="#grammatik/${t.id}/ueben">Üben <span aria-hidden="true">▶</span></a><a class="dm-btn dm-btn-quiet" href="#grammatik">Alle Themen</a></div>`,
      "gr-page",
    );
  }

  /* ---------- answer checking ---------- */
  const norm = (s) =>
    String(s ?? "")
      .toLocaleLowerCase("de")
      .replace(/\s+/g, " ")
      .trim()
      .replace(/[.!?,;:…]+$/, "")
      .trim();
  const fold = (s) =>
    norm(s)
      .replace(/ä/g, "ae")
      .replace(/ö/g, "oe")
      .replace(/ü/g, "ue")
      .replace(/ß/g, "ss");
  /* returns { ok, exact, shown } – exact=false: accepted with ae/oe/ue/ss, show proper spelling */
  function checkGap(input, answers) {
    const v = norm(input);
    let hit = answers.find((a) => norm(a) === v);
    if (hit) return { ok: true, exact: true, shown: hit };
    hit = v && answers.find((a) => fold(a) === fold(v));
    if (hit) return { ok: true, exact: false, shown: hit };
    return { ok: false, exact: false, shown: answers[0] };
  }
  DM.grammatikCheck = checkGap; // used by tests

  const TASK = {
    mc: "Was passt? Tippe auf die richtige Antwort.",
    gap: "Was fehlt? Schreib das Wort.",
    order: "Bau den Satz. Tippe auf die Wörter.",
    fix: "Welcher Satz ist richtig?",
  };
  const blankHtml = (q, fill) =>
    esc(q)
      .replace(
        "___",
        fill != null
          ? `<mark class="gr-filled">${esc(fill)}</mark>`
          : '<span class="gr-blank" aria-label="Lücke">___</span>',
      )
      .replace(/___/g, '<span class="gr-blank" aria-label="Lücke">___</span>');
  const solution = (it) =>
    it.t === "mc"
      ? it.opts[it.a]
      : it.t === "gap"
        ? it.a[0]
        : it.t === "order"
          ? it.sol
          : it.good;
  /* full correct sentence for the audio button (only where it reads naturally) */
  function fullSentence(it) {
    if (it.t === "order") return it.sol;
    if (it.t === "fix") return it.good;
    const ans = solution(it),
      q = it.q.replace(/\s*\([^)]*\)\s*$/, "");
    if (
      /[→:„“]/.test(q) ||
      / – /.test(q) ||
      /…/.test(ans) ||
      (q.match(/___/g) || []).length !== 1
    )
      return null;
    return q.replace("___", ans);
  }
  const promptText = (it) =>
    it.t === "fix"
      ? "Welcher Satz ist richtig?"
      : it.t === "order"
        ? "Bau den Satz: " +
          [...it.words].sort((a, b) => a.localeCompare(b, "de")).join(" / ")
        : it.q;

  /* ---------- practice round ---------- */
  let round = null;
  function newRound(t) {
    const m = prog(t.id).mastered;
    const idx = shuffle(t.items.map((_, i) => i))
      .sort((a, b) => (m[a] || 0) - (m[b] || 0))
      .slice(0, ROUND)
      .sort((a, b) => a - b);
    return {
      id: t.id,
      list: idx,
      pos: 0,
      right: 0,
      wrong: [],
      answered: false,
      done: false,
      view: {},
    };
  }
  function practice(t) {
    if (!round || round.id !== t.id || round.done) round = newRound(t);
    page(
      `${crumbs([["Grammatik", "#grammatik"], [t.title, "#grammatik/" + t.id], ["Üben"]])}
      <div class="gr-play"><header class="gr-play-head"><span class="dm-tag">${t.level} · Grammatik</span><h1>${esc(t.title)}</h1></header>
      <div id="gr-stage"></div></div>`,
      "gr-page",
    );
    round.answered = false;
    round.view = {};
    showItem(t);
  }

  function showItem(t) {
    const stage = $("#gr-stage");
    if (!stage) return;
    const R = round,
      i = R.list[R.pos],
      it = t.items[i],
      total = R.list.length;
    R.answered = false;
    let body = "";
    if (it.t === "mc") {
      const opts = R.view.opts || (R.view.opts = shuffle(it.opts));
      body = `<p class="gr-q" lang="de" id="gr-q">${blankHtml(it.q)}</p><div class="gr-opts" role="group" aria-labelledby="gr-task">${opts.map((o) => `<button type="button" class="gr-opt" lang="de" data-v="${esc(o)}">${esc(o)}</button>`).join("")}</div>`;
    } else if (it.t === "fix") {
      const opts = R.view.opts || (R.view.opts = shuffle([it.good, it.bad]));
      body = `<div class="gr-opts gr-opts-fix" role="group" aria-labelledby="gr-task">${opts.map((o) => `<button type="button" class="gr-opt" lang="de" data-v="${esc(o)}">${esc(o)}</button>`).join("")}</div>`;
    } else if (it.t === "gap") {
      body = `<p class="gr-q" lang="de" id="gr-q">${blankHtml(it.q)}</p><form class="gr-gapform" id="gr-form" novalidate><label class="gr-sr" for="gr-in">Deine Antwort</label><input id="gr-in" class="gr-in" type="text" lang="de" autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false" enterkeyhint="done" placeholder="Deine Antwort"><button type="submit" class="dm-btn" id="gr-check">Prüfen</button></form><p class="dm-small gr-tip">Kein ä, ö, ü, ß auf der Tastatur? Schreib ae, oe, ue, ss.</p>`;
    } else {
      if (!R.view.pool) {
        let s = shuffle(it.words.map((w, k) => ({ w, k })));
        if (s.map((x) => x.w).join(" ") === it.sol && s.length > 1)
          s = [...s.slice(1), s[0]];
        R.view.pool = s;
        R.view.line = [];
      }
      body = `<p class="gr-sr" id="gr-line-l">Dein Satz:</p><div class="gr-line" id="gr-line" lang="de" role="group" aria-labelledby="gr-line-l"></div><p class="gr-sr" id="gr-pool-l">Wörter zur Auswahl:</p><div class="gr-pool" id="gr-pool" lang="de" role="group" aria-labelledby="gr-pool-l"></div><div class="dm-row gr-order-actions"><button type="button" class="dm-btn" id="gr-check" disabled>Prüfen</button><button type="button" class="dm-btn dm-btn-quiet" id="gr-clear">Neu anfangen</button></div>`;
    }
    stage.innerHTML = `<div class="gr-bar"><span id="gr-count">Aufgabe ${R.pos + 1} von ${total}</span><div class="dm-progress" role="progressbar" aria-valuemin="0" aria-valuemax="${total}" aria-valuenow="${R.pos}" aria-label="Fortschritt in dieser Runde"><i style="width:${Math.round((R.pos / total) * 100)}%"></i></div></div>
      <div class="dm-card gr-item gr-t-${it.t}"><h2 class="gr-task" id="gr-task" tabindex="-1">${TASK[it.t]}</h2>${body}
      <div class="gr-fb" id="gr-fb" role="status" aria-live="polite"></div>
      <div class="dm-row gr-next-row"><button type="button" class="dm-btn" id="gr-next" hidden>${R.pos + 1 < total ? "Weiter" : "Ergebnis"} <span aria-hidden="true">▶</span></button></div></div>
      <p class="dm-small gr-leave"><a href="#grammatik/${t.id}">Zur Regel</a></p>`;

    const finish = (ok, opts = {}) => {
      if (R.answered) return;
      R.answered = true;
      const p = prog(t.id);
      p.mastered[i] = ok ? (p.mastered[i] || 0) + 1 : 0;
      save();
      if (ok) R.right++;
      else {
        R.wrong.push(i);
        try {
          window.DMFehler &&
            DMFehler.add({
              q: promptText(it),
              a: solution(it),
              src: "Grammatik: " + t.title,
              level: t.level,
              hint: it.why,
              opts:
                it.t === "mc"
                  ? [...it.opts]
                  : it.t === "fix"
                    ? [it.good, it.bad]
                    : undefined,
            });
        } catch {
          /* notebook is optional */
        }
      }
      const full = fullSentence(it),
        sol = solution(it);
      const fb = $("#gr-fb");
      fb.className = "gr-fb " + (ok ? "is-ok" : "is-bad");
      fb.innerHTML = `<p class="gr-fb-head">${ok ? '<span aria-hidden="true">✓</span> Richtig!' : '<span aria-hidden="true">✗</span> Leider falsch.'}</p>
        ${ok && opts.spell ? `<p>So schreibt man es richtig: <b lang="de">${esc(opts.spell)}</b></p>` : ""}
        ${!ok ? `<p>Richtig ist: <b lang="de">${esc(sol)}</b></p>` : ""}
        <p class="gr-why">${esc(it.why)}</p>${full ? `<p class="gr-fb-say">${say(full, "Anhören")}</p>` : ""}`;
      const q = $("#gr-q");
      if (q && (it.q.match(/___/g) || []).length === 1 && !/…/.test(sol))
        q.innerHTML = blankHtml(it.q, opts.spell || sol);
      const nx = $("#gr-next");
      nx.hidden = false;
      nx.focus({ preventScroll: true });
      try {
        nx.scrollIntoView({ block: "nearest", behavior: "smooth" });
      } catch {
        /* old browsers */
      }
    };

    if (it.t === "mc" || it.t === "fix") {
      const right = it.t === "mc" ? it.opts[it.a] : it.good;
      stage.querySelectorAll(".gr-opt").forEach(
        (b) =>
          (b.onclick = () => {
            if (R.answered) return;
            const ok = b.dataset.v === right;
            stage.querySelectorAll(".gr-opt").forEach((o) => {
              o.disabled = true;
              if (o.dataset.v === right) o.classList.add("is-ok");
            });
            if (!ok) b.classList.add("is-bad");
            b.setAttribute("aria-pressed", "true");
            finish(ok);
          }),
      );
    } else if (it.t === "gap") {
      const inp = $("#gr-in");
      $("#gr-form").onsubmit = (e) => {
        e.preventDefault();
        if (R.answered) return;
        if (!norm(inp.value)) {
          inp.focus();
          return;
        }
        const r = checkGap(inp.value, it.a);
        inp.readOnly = true;
        inp.classList.add(r.ok ? "is-ok" : "is-bad");
        $("#gr-check").disabled = true;
        finish(r.ok, {
          spell:
            r.ok &&
            (!r.exact ||
              inp.value.trim().replace(/[.!?,;:…]+$/, "") !== r.shown)
              ? r.shown
              : "",
        });
      };
    } else {
      const line = $("#gr-line"),
        pool = $("#gr-pool"),
        V = R.view;
      const draw = (focusSel) => {
        line.innerHTML = V.line.length
          ? V.line
              .map(
                (x, n) =>
                  `<button type="button" class="gr-chip-w is-placed" data-n="${n}" aria-label="${esc(x.w)} – wieder wegnehmen">${esc(x.w)}</button>`,
              )
              .join("")
          : '<span class="gr-line-empty" aria-hidden="true">Tippe unten auf das erste Wort.</span>';
        pool.innerHTML = V.pool
          .map(
            (x) =>
              `<button type="button" class="gr-chip-w" data-k="${x.k}" ${V.line.includes(x) ? 'disabled aria-hidden="true"' : ""}>${esc(x.w)}</button>`,
          )
          .join("");
        $("#gr-check").disabled = V.line.length !== V.pool.length || R.answered;
        if (R.answered) return;
        line.querySelectorAll("button").forEach(
          (b) =>
            (b.onclick = () => {
              V.line.splice(+b.dataset.n, 1);
              draw("pool");
            }),
        );
        pool.querySelectorAll("button:not([disabled])").forEach(
          (b) =>
            (b.onclick = () => {
              V.line.push(V.pool.find((x) => x.k === +b.dataset.k));
              draw("pool");
            }),
        );
        if (focusSel) {
          const f =
            pool.querySelector("button:not([disabled])") || $("#gr-check");
          f && f.focus({ preventScroll: true });
        }
      };
      draw();
      $("#gr-clear").onclick = () => {
        if (R.answered) return;
        V.line = [];
        draw("pool");
      };
      $("#gr-check").onclick = () => {
        if (R.answered || V.line.length !== V.pool.length) return;
        const got = V.line.map((x) => x.w).join(" "),
          ok = got === it.sol || (it.alt || []).includes(got);
        line.classList.add(ok ? "is-ok" : "is-bad");
        line.querySelectorAll("button").forEach((b) => {
          b.disabled = true;
        });
        $("#gr-check").disabled = true;
        $("#gr-clear").disabled = true;
        finish(ok);
      };
    }
    $("#gr-next").onclick = () => {
      R.pos++;
      R.view = {};
      if (R.pos >= R.list.length) return result(t);
      showItem(t);
    };
    // focus: typed items go straight to the input, others to the task line (screen readers hear the new task)
    if (R.pos > 0 || R.fresh === false) {
      const f = it.t === "gap" ? $("#gr-in") : $("#gr-task");
      f && f.focus({ preventScroll: it.t !== "gap" });
    }
    R.fresh = false;
  }

  function nextTopic(t) {
    const T = topics(),
      same = T.filter((x) => x.level === t.level),
      k = same.indexOf(t);
    if (k + 1 < same.length) return { t: same[k + 1], label: "Nächstes Thema" };
    const lv = LEVELS[LEVELS.indexOf(t.level) + 1],
      first = lv && T.find((x) => x.level === lv);
    return first ? { t: first, label: "Weiter mit " + lv } : null;
  }

  function result(t) {
    const R = round,
      total = R.list.length,
      pct = Math.round((R.right / total) * 100),
      p = prog(t.id);
    const wasDone = (p.best || 0) >= PASS;
    R.done = true;
    p.rounds = (p.rounds || 0) + 1;
    p.best = Math.max(p.best || 0, pct);
    save();
    const pass = pct >= PASS,
      nx = nextTopic(t);
    const msg = pass
      ? pct === 100
        ? "Perfekt! Alles richtig."
        : "Super! Das Thema ist geschafft."
      : pct >= 50
        ? "Gut! Du brauchst 8 von 10. Mach noch eine Runde."
        : "Lies die Regel noch einmal. Dann übe weiter.";
    const wrong = R.wrong.map((i) => t.items[i]);
    const again = `<button type="button" class="dm-btn${pass ? " dm-btn-quiet" : ""}" id="gr-again">Noch eine Runde</button>`;
    const next = nx
      ? `<a class="dm-btn${pass ? "" : " dm-btn-quiet"}" href="#grammatik/${nx.t.id}">${esc(nx.label)} <span aria-hidden="true">▶</span></a>`
      : `<a class="dm-btn${pass ? "" : " dm-btn-quiet"}" href="#grammatik">Alle Themen</a>`;
    $("#gr-stage").innerHTML =
      `<div class="dm-card gr-result${pass ? " is-pass" : ""}"><h2 id="gr-res-h" tabindex="-1">Dein Ergebnis</h2>
      <div class="gr-score">${ring(pct, pass)}<p><b>${R.right} von ${total}</b> richtig (${pct} %)</p></div>
      <p class="gr-msg">${esc(msg)}${pass && !wasDone ? ' <span aria-hidden="true">🎉</span>' : ""}</p>
      ${wrong.length ? `<div class="gr-review"><h3>Das war noch schwer</h3><ul>${wrong.map((it) => `<li><span lang="de">${it.t === "mc" || it.t === "gap" ? ((it.q.match(/___/g) || []).length === 1 && !/…/.test(solution(it)) ? blankHtml(it.q, solution(it)) : esc(it.q) + " → <b>" + esc(solution(it)) + "</b>") : esc(solution(it))}</span><small>${esc(it.why)}</small></li>`).join("")}</ul>${window.DMFehler ? '<p class="dm-small">Diese Aufgaben stehen jetzt in <a href="#fehler">Meine Fehler</a>. Dort kannst du sie wiederholen.</p>' : ""}</div>` : ""}
      <div class="dm-row gr-result-actions">${pass ? next + again : again + next}</div>
      <p class="dm-small gr-result-links"><a href="#grammatik/${t.id}">Zur Regel</a> · <a href="#kurs/${t.level}">Zurück zum Kurs ${t.level}</a> · <a href="#grammatik">Alle Themen</a></p></div>`;
    $("#gr-again").onclick = () => {
      round = newRound(t);
      round.fresh = false;
      showItem(t);
    };
    $("#gr-res-h").focus({ preventScroll: true });
    try {
      $("#gr-stage").scrollIntoView({ block: "start", behavior: "smooth" });
    } catch {
      /* old browsers */
    }
    if (pass && DM.celebrate) {
      try {
        DM.celebrate($(".gr-result"));
      } catch {
        /* decoration only */
      }
    }
  }

  /* ---------- route ---------- */
  (DM.routes ||= {}).grammatik = (p) => {
    if (!p[1]) return overview();
    const t = topics().find((x) => x.id === p[1]);
    if (!t) return overview();
    return p[2] === "ueben" ? practice(t) : topicPage(t);
  };
})();
