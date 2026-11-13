/* „Erste Schritte“ (#erste-schritte, #erste-schritte/<id>) and level pages (#niveau/<A0..B2>).
   Data: erste-schritte-data.js. Loaded on demand by lazy.js (group "erste"). */
(function () {
  const DM = window.DM,
    ES = DM.ersteSchritte,
    x = DM.esc;
  const $ = (s, r = document) => r.querySelector(s),
    $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const mem = DM.store;
  mem.done ||= {};
  const topic = (id) => ES.topics.find((t) => t.id === id);
  const LV_NAME = {
    A0: "Ich fange an",
    A1: "Erste Sätze",
    A2: "Alltag",
    B1: "Gespräche",
    B2: "Beruf",
  };

  /* ---------- helpers ---------- */
  const ART_CLS = { der: "es-der", die: "es-die", das: "es-das" };
  const label = (it) => (it.art ? `${it.art} ${it.w}` : it.w);
  const sayOf = (it) => it.say || label(it);
  const itemKey = (t, i) => `es-${t.id}-${i}`;
  const sentKey = (t, i) => `es-${t.id}-s${i}`;
  const play = (text, key, btn) => {
    if (btn) btn.classList.add("is-playing");
    const ok =
      DM.speak &&
      DM.speak(text, {
        key,
        onend: () => btn && btn.classList.remove("is-playing"),
      });
    if (ok === false && btn) btn.classList.remove("is-playing");
  };
  let lang = (() => {
    try {
      const v =
        localStorage.getItem("dmd.eslang") ||
        localStorage.getItem("dmd.vlang") ||
        localStorage.getItem("dmd.lang");
      return ES.langs.some(([k]) => k === v) ? v : v === "de" ? "de" : "en";
    } catch {
      return "en";
    }
  })();
  const trOf = (it) => {
    if (!it.tr || lang === "de") return "";
    const i = ES.langs.findIndex(([k]) => k === lang);
    return (it.tr.split("|")[i] || "").trim();
  };
  const RTL = { ar: 1 };
  function clockSvg(time, size = 96) {
    const [h, m] = time.split(":").map(Number),
      ha = ((h % 12) + m / 60) * 30,
      ma = m * 6;
    const ticks = Array.from({ length: 12 }, (_, i) => {
      const a = (i * 30 * Math.PI) / 180,
        r1 = i % 3 ? 40 : 36;
      return `<line x1="${50 + r1 * Math.sin(a)}" y1="${50 - r1 * Math.cos(a)}" x2="${50 + 44 * Math.sin(a)}" y2="${50 - 44 * Math.cos(a)}" stroke="currentColor" stroke-width="${i % 3 ? 1.5 : 3}" stroke-linecap="round"/>`;
    }).join("");
    return `<svg class="es-clock" viewBox="0 0 100 100" width="${size}" height="${size}" role="img" aria-label="Uhr: ${x(time)}"><circle cx="50" cy="50" r="47" fill="var(--es-clock-bg,#fff)" stroke="currentColor" stroke-width="3"/>${ticks}<line x1="50" y1="50" x2="${50 + 24 * Math.sin((ha * Math.PI) / 180)}" y2="${50 - 24 * Math.cos((ha * Math.PI) / 180)}" stroke="currentColor" stroke-width="5" stroke-linecap="round"/><line x1="50" y1="50" x2="${50 + 36 * Math.sin((ma * Math.PI) / 180)}" y2="${50 - 36 * Math.cos((ma * Math.PI) / 180)}" stroke="#d7263d" stroke-width="3" stroke-linecap="round"/><circle cx="50" cy="50" r="3.5" fill="currentColor"/></svg>`;
  }
  /* the picture side of an item: photo, emoji, colour, clock or big text */
  function visual(t, it, big = false) {
    if (it.color)
      return `<span class="es-swatch${it.color === "#ffffff" ? " es-white" : ""}" style="background:${it.color}" aria-hidden="true"></span>`;
    if (it.time) return clockSvg(it.time, big ? 120 : 96);
    if (it.img && it.img.includes("/"))
      return `<img class="es-img" src="assets/${it.img}.webp" alt="" width="256" height="256" loading="lazy" data-w="${x(it.w)}">`;
    if (it.img)
      return `<span class="es-emoji" aria-hidden="true">${it.img}</span>`;
    return `<span class="es-tile${it.w.length > 3 ? " es-tile-long" : ""}" aria-hidden="true">${x(it.w)}</span>`;
  }
  /* picture not there yet (assets/a0 is filled step by step): show the word tile / topic icon instead of a broken image */
  document.addEventListener("error", (e) => {
    const im = e.target;
    if (!(im instanceof HTMLImageElement) || !/\/assets\/a0\//.test(im.src)) return;
    const s = document.createElement("span");
    s.setAttribute("aria-hidden", "true");
    if (im.dataset.w) { s.className = "es-tile" + (im.dataset.w.length > 3 ? " es-tile-long" : ""); s.textContent = im.dataset.w; }
    else { s.className = "es-tcard-ic"; s.textContent = im.dataset.ic || "🖼️"; }
    im.replaceWith(s);
  }, true);
  const isVisual = (t) =>
    t.kind === "pic" || t.kind === "color" || t.kind === "clock";
  const doneCount = (list) => list.filter((t) => mem.done["es:" + t.id]).length;

  /* ---------- hub ---------- */
  function topicCard(t) {
    const it = t.items.find((i) => i.img && i.img.includes("/"));
    return `<li><a class="es-tcard${mem.done["es:" + t.id] ? " is-done" : ""}" href="#erste-schritte/${t.id}">${it ? `<img src="assets/${it.img}.webp" alt="" width="256" height="256" loading="lazy" data-ic="${x(t.icon)}">` :`<span class="es-tcard-ic" aria-hidden="true">${t.icon}</span>`}<span class="es-tcard-t"><small>${t.level}${mem.done["es:" + t.id] ? " · ✓ geschafft" : ` · ${t.items.length} Karten`}</small><b>${x(t.title)}</b></span></a></li>`;
  }
  const topicGrid = (list) =>
    `<ul class="es-tgrid">${list.map(topicCard).join("")}</ul>`;
  function hub() {
    const a0 = ES.topics.filter((t) => t.level === "A0"),
      a1 = ES.topics.filter((t) => t.level === "A1");
    DM.page(`${DM.crumbs([["Erste Schritte"]])}
      <div class="dm-head"><h1>Erste Schritte auf Deutsch</h1><p class="dm-lead">Bildkarten zum Hören und Nachsprechen, mit Übersetzung in deine Sprache und kleinen Übungen. Für ganz neue Lernende (A0) und für A1.</p></div>
      <section class="dm-section" aria-labelledby="es-a0"><div class="dm-section-head"><h2 id="es-a0">A0 · Ich fange an</h2><p>${doneCount(a0)} von ${a0.length} Themen geschafft</p></div>${topicGrid(a0)}</section>
      <section class="dm-section" aria-labelledby="es-a1"><div class="dm-section-head"><h2 id="es-a1">A1 · Wörter für den Alltag</h2><p>${doneCount(a1)} von ${a1.length} Themen geschafft</p></div>${topicGrid(a1)}</section>
      <p class="dm-center"><a class="dm-btn dm-btn-quiet" href="#niveau/A1">Alle Materialien für A1 →</a></p>`);
  }

  /* ---------- topic page ---------- */
  function card(t, it, i) {
    const tr = trOf(it);
    return `<li class="es-card ${ART_CLS[it.art] || ""}"><button type="button" class="es-card-btn" data-say="${x(sayOf(it))}" data-key="${itemKey(t, i)}" aria-label="${x(label(it))} anhören">
      <span class="es-vis">${visual(t, it)}</span>
      <span class="es-word">${it.art ? `<em>${it.art}</em> ` : ""}${x(it.w)}</span>
      ${it.sub ? `<span class="es-sub">${x(it.sub)}</span>` : ""}${it.pl ? `<span class="es-sub">${x(it.pl)}</span>` : it.art ? '<span class="es-sub">ohne Plural</span>' : ""}
      ${tr ? `<span class="es-tr" lang="${lang}" dir="${RTL[lang] ? "rtl" : "ltr"}">${x(tr)}</span>` : ""}
      <span class="es-play" aria-hidden="true">🔊</span></button></li>`;
  }
  function topicPage(id) {
    const t = topic(id);
    if (!t) return hub();
    const i = ES.topics.indexOf(t),
      prev = ES.topics[i - 1],
      next = ES.topics[i + 1];
    const hasTr = t.items.some((it) => it.tr);
    const modes = [
      ["hoeren", "🎧 Hören"],
      ...(isVisual(t) ? [["lesen", "📖 Lesen"]] : []),
      ...(t.items.filter((it) => it.art).length >= 4
        ? [["artikel", "der · die · das"]]
        : []),
    ];
    DM.page(`${DM.crumbs([["Erste Schritte", "#erste-schritte"], [t.title]])}
      <div class="dm-head"><p class="dm-kicker">${t.level} · Erste Schritte</p><h1><span aria-hidden="true">${t.icon}</span> ${x(t.title)}</h1><p class="dm-lead">${x(t.intro)}</p></div>
      <div class="es-bar">${hasTr ? `<label class="es-lang">Übersetzung <select id="es-lang"><option value="de">keine</option>${ES.langs.map(([k, n]) => `<option value="${k}"${k === lang ? " selected" : ""}>${n}</option>`).join("")}</select></label>` : ""}<button type="button" class="dm-btn dm-btn-quiet" id="es-all"><span aria-hidden="true">▶</span> Alle anhören</button><a class="dm-btn dm-btn-quiet" href="material/arbeitsblaetter/es-${t.id}.pdf" download target="_blank" rel="noopener"><span aria-hidden="true">📄</span> Arbeitsblatt (PDF)</a></div>
      ${t.items.some((it) => it.art) ? '<p class="es-legend"><span class="es-der">der</span> <span class="es-die">die</span> <span class="es-das">das</span> – die Farbe zeigt den Artikel.</p>' : ""}
      <ul class="es-grid${t.kind === "phrase" ? " es-grid-phrase" : ""}${t.kind === "tile" ? " es-grid-tile" : ""}">${t.items.map((it, k) => card(t, it, k)).join("")}</ul>
      <section class="dm-section es-sent" aria-labelledby="es-sent-h"><h2 id="es-sent-h">Sätze zum Nachsprechen</h2><ol>${t.sentences.map(([s, say], k) => `<li><button type="button" class="es-sbtn" data-say="${x(say || s)}" data-key="${sentKey(t, k)}"><span aria-hidden="true">🔊</span><span>${x(s)}</span></button></li>`).join("")}</ol>
        <aside class="dm-note"><p>${x(t.tip)}</p><span>– Dennis</span></aside></section>
      <section class="dm-section es-quiz" aria-labelledby="es-quiz-h"><h2 id="es-quiz-h">Üben</h2>
        <div class="dm-tabs dm-tabs-small es-modes" role="group" aria-label="Übung wählen">${modes.map(([m, n], k) => `<button type="button" data-mode="${m}" aria-pressed="${k === 0}"><b>${n}</b></button>`).join("")}</div>
        <div id="es-quiz" aria-live="polite"></div></section>
      <nav class="es-pn" aria-label="Weitere Themen">${prev ? `<a class="dm-btn dm-btn-quiet" href="#erste-schritte/${prev.id}">← ${x(prev.title)}</a>` : "<span></span>"}${next ? `<a class="dm-btn" href="#erste-schritte/${next.id}">${x(next.title)} →</a>` : `<a class="dm-btn" href="#niveau/A1">Weiter mit A1 →</a>`}</nav>`);
    const main = $("main");
    $$("[data-say]", main).forEach(
      (b) => (b.onclick = () => play(b.dataset.say, b.dataset.key, b)),
    );
    const sel = $("#es-lang");
    if (sel)
      sel.onchange = () => {
        lang = sel.value;
        try {
          localStorage.setItem("dmd.eslang", lang);
        } catch {}
        topicPage(id);
      };
    let stopAll = false;
    $("#es-all").onclick = function () {
      const btns = $$(".es-card-btn", main);
      let k = 0;
      stopAll = false;
      const step = () => {
        if (stopAll || k >= btns.length || !document.body.contains(btns[0]))
          return;
        const b = btns[k++];
        b.scrollIntoView({ block: "nearest" });
        b.classList.add("is-playing");
        const ok = DM.speak(b.dataset.say, {
          key: b.dataset.key,
          onend: () => {
            b.classList.remove("is-playing");
            setTimeout(step, 450);
          },
        });
        if (ok === false) {
          b.classList.remove("is-playing");
        }
      };
      step();
    };
    $$(".es-modes button", main).forEach(
      (b) =>
        (b.onclick = () => {
          $$(".es-modes button", main).forEach((o) =>
            o.setAttribute("aria-pressed", String(o === b)),
          );
          quiz(t, b.dataset.mode);
        }),
    );
    quiz(t, modes[0][0]);
  }

  /* ---------- quiz: 6 rounds ---------- */
  const shuffle = (a) => {
    a = [...a];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };
  function quiz(t, mode) {
    const box = $("#es-quiz");
    if (!box) return;
    const pool = t.items
      .map((it, i) => ({ it, i }))
      .filter((o) => mode !== "artikel" || o.it.art);
    const rounds = shuffle(pool).slice(0, Math.min(6, pool.length));
    let r = 0,
      score = 0;
    // tiles show only the big sign (B, 13); emoji tiles (times of day) show their word instead
    const optText = (it) =>
      t.kind === "tile" && !/[\p{L}\p{N}]/u.test(it.w) ? it.sub : it.w;
    const optHtml = (o, k) =>
      `<button type="button" class="es-opt" data-k="${k}">${isVisual(t) ? visual(t, o.it) : `<span class="es-opt-w">${x(optText(o.it))}</span>`}<span class="es-sr">${x(label(o.it))}</span></button>`;
    function round() {
      if (r >= rounds.length) return finish();
      const cur = rounds[r];
      if (mode === "artikel") {
        box.innerHTML = `<p class="es-q">Aufgabe ${r + 1} von ${rounds.length}: Welcher Artikel?</p><div class="es-qvis">${visual(t, cur.it, true)}<b class="es-qword">___ ${x(cur.it.w)}</b></div><div class="es-opts es-opts-art">${["der", "die", "das"].map((a) => `<button type="button" class="es-opt es-${a}" data-a="${a}">${a}</button>`).join("")}</div><p class="es-fb" role="status"></p>`;
        $$(".es-opt", box).forEach(
          (b) =>
            (b.onclick = () =>
              answer(
                b,
                b.dataset.a === cur.it.art,
                `${cur.it.art} ${cur.it.w}`,
                cur,
              )),
        );
        return;
      }
      const others = shuffle(pool.filter((o) => o !== cur)).slice(0, 3),
        opts = shuffle([cur, ...others]);
      box.innerHTML = `<p class="es-q">Aufgabe ${r + 1} von ${rounds.length}: ${mode === "hoeren" ? "Hör zu. Was passt?" : "Lies das Wort. Welches Bild passt?"}</p>
        ${mode === "hoeren" ? `<p><button type="button" class="dm-btn es-hear"><span aria-hidden="true">🔊</span> Anhören</button></p>` : `<p class="es-qword es-qword-big">${x(label(cur.it))}</p>`}
        <div class="es-opts${isVisual(t) ? "" : " es-opts-text"}">${opts.map((o, k) => optHtml(o, k)).join("")}</div><p class="es-fb" role="status"></p>`;
      const hear = $(".es-hear", box);
      if (hear) {
        hear.onclick = () => play(sayOf(cur.it), itemKey(t, cur.i), hear);
        setTimeout(() => hear.click(), 250);
      }
      $$(".es-opt", box).forEach(
        (b) =>
          (b.onclick = () =>
            answer(b, opts[+b.dataset.k] === cur, label(cur.it), cur, opts)),
      );
    }
    // short reason for the article where a safe rule exists (word endings)
    const artWhy = (it) => {
      const w = it.w.toLowerCase();
      const m = w.match(/(ung|heit|keit|schaft|ion|tät)$/);
      if (it.art === "die" && m) return `Wörter auf -${m[1]} haben fast immer „die“.`;
      if (it.art === "das" && /(chen|lein)$/.test(w))
        return "Wörter auf -chen und -lein haben „das“.";
      if (it.art === "die" && /e$/.test(w))
        return "Viele Wörter auf -e haben „die“.";
      return "";
    };
    // wrong answer -> mistakes notebook (fehlerheft.js)
    function note(cur, opts) {
      if (!window.DMFehler || !cur) return;
      const it = cur.it,
        shown = (o) => (t.kind === "tile" ? optText(o) : label(o)),
        base = {
          src: "Erste Schritte: " + t.title,
          level: t.level,
          speak: sayOf(it),
          lkey: itemKey(t, cur.i),
        };
      if (mode === "artikel")
        return DMFehler.add({
          ...base,
          q: `Der, die oder das? ___ ${it.w}`,
          a: `${it.art} ${it.w}`,
          opts: ["der", "die", "das"].map((a) => `${a} ${it.w}`),
          hint: [artWhy(it), it.pl ? "Plural: " + it.pl : ""]
            .filter(Boolean)
            .join(" "),
        });
      const texts = (opts || []).map((o) => shown(o.it));
      if (mode === "lesen" && it.img)
        return DMFehler.add({
          ...base,
          q: it.img.includes("/") ? "Was ist das?" : `Was ist das? ${it.img}`,
          img: it.img.includes("/") ? `assets/${it.img}.webp` : "",
          a: shown(it),
          opts: texts,
        });
      DMFehler.add({
        ...base,
        q: "Hör zu. Was passt?",
        listen: sayOf(it),
        a: shown(it),
        opts: texts,
      });
    }
    function answer(btn, ok, right, cur, opts) {
      $$(".es-opt", box).forEach((b) => (b.disabled = true));
      btn.classList.add(ok ? "is-right" : "is-wrong");
      if (ok) score++;
      if (!ok) {
        const k = $$(".es-opt", box).find((b) =>
          b.dataset.a
            ? b.dataset.a === rounds[r].it.art
            : b.querySelector(".es-sr")?.textContent === right,
        );
        if (k) k.classList.add("is-right");
      }
      if (!ok) note(cur, opts);
      // feedback with a reason: the word with its coloured article, plural, a short rule, and the audio
      const it = cur.it,
        why = mode === "artikel" ? artWhy(it) : "";
      $(".es-fb", box).innerHTML =
        `${ok ? "✓ Richtig!" : "✗ Richtig ist:"} <b class="es-fbw${it.art ? " es-" + it.art : ""}">${it.art ? `<em>${it.art}</em> ${x(it.w)}` : x(right)}</b> <button type="button" class="es-fbsay" aria-label="Anhören: ${x(label(it))}">🔊</button>${mode === "artikel" && it.pl ? `<span class="es-why">Plural: ${x(it.pl)}</span>` : ""}${why ? `<span class="es-why">💡 ${x(why)}</span>` : ""} <button type="button" class="dm-btn es-next">${r + 1 < rounds.length ? "Weiter →" : "Ergebnis"}</button>`;
      const sb = $(".es-fbsay", box);
      sb.onclick = () => play(sayOf(it), itemKey(t, cur.i), sb);
      // hear the right word: always in the article quiz, otherwise after a mistake
      if (mode === "artikel" || !ok) sb.click();
      const nx = $(".es-next", box);
      nx.onclick = () => {
        r++;
        round();
      };
      nx.focus();
    }
    function finish() {
      const good = score >= rounds.length - 1;
      if (good) {
        mem.done["es:" + t.id] = Date.now();
        DM.save && DM.save();
        if (DM.celebrate)
          try {
            DM.celebrate();
          } catch {}
      }
      box.innerHTML = `<div class="es-result"><p class="es-score">${score} / ${rounds.length}</p><p>${good ? "Super! Thema geschafft. ✓" : "Gut gemacht! Hör dir die Karten noch einmal an und versuch es wieder."}</p><p class="dm-row"><button type="button" class="dm-btn" id="es-again">Neue Runde ↻</button></p></div>`;
      $("#es-again").onclick = () => quiz(t, mode);
    }
    round();
  }

  /* ---------- level page: everything for one level ---------- */
  const LEVEL_PATHS = {
    A0: ["start"],
    A1: ["start", "sprechen", "schreiben"],
    A2: ["dtz", "sprechen", "schreiben", "lid"],
    B1: ["telcb1", "dtz", "dtbb1", "bridge", "sprechen", "schreiben"],
    B2: ["telcb2", "dtbb2", "bridge", "repeat", "sprechen", "schreiben"],
  };
  const tile = (href, ico, title, sub, dl) =>
    `<li><a class="es-link" href="${x(href)}"${dl ? ' download target="_blank" rel="noopener"' : ""}><span class="es-link-ic" aria-hidden="true">${ico}</span><span><b>${x(title)}</b>${sub ? `<small>${x(sub)}</small>` : ""}</span></a></li>`;
  const block = (id, title, items, more) =>
    items.length
      ? `<section class="dm-section es-lv-sec" aria-labelledby="lv-${id}"><div class="dm-section-head"><h2 id="lv-${id}">${title}</h2>${more || ""}</div><ul class="es-links">${items.join("")}</ul></section>`
      : "";
  const hasLv = (s, lv) =>
    String(s || "")
      .split(/[–-]/)
      .map((t) => t.trim())
      .some(
        (a, i, arr) =>
          a === lv ||
          (arr.length === 2 &&
            ["A1", "A2", "B1", "B2", "C1"].indexOf(lv) >
              ["A1", "A2", "B1", "B2", "C1"].indexOf(arr[0]) &&
            ["A1", "A2", "B1", "B2", "C1"].indexOf(lv) <
              ["A1", "A2", "B1", "B2", "C1"].indexOf(arr[1])),
      );
  /* exam preparation per level: one group per exam (online training, preparation, mock exams, printable PDFs) */
  const SIM = "material/simulation/";
  const mock = (id, name, n) =>
    tile(`#simulation/${id}`, "⏱️", `${name} · Probeprüfung ${n}`, "Mit Zeit und Auswertung");
  const mockPdf = (id, name, n) =>
    tile(`${SIM}${id}-schriftlich.pdf`, "📄", `${name} · Probeprüfung ${n} zum Ausdrucken`, "PDF · mit Lösungen und Antwortbogen", true);
  const EXAM = {
    dtz: () => ({
      h: "DTZ – Deutsch-Test für Zuwanderer (A2–B1)",
      items: [
        tile("#pruefung/dtz", "🎯", "DTZ-Prüfungstraining", "Alle Prüfungsteile mit Übungen"),
        tile("#dtz-30-tage", "📅", "DTZ in 30 Tagen", "Lernplan Tag für Tag"),
        tile("/dtz-schreiben/", "✍️", "DTZ Schreiben", "Übungen, Muster, Timer"),
        tile("#bild", "🖼️", "Bild beschreiben", "Sprechen Teil 2 – Schritt für Schritt"),
        tile("#pruefungsinfo/dtz", "ℹ️", "DTZ-Infos", "Ablauf, Punkte, Anmeldung"),
        ...[["dtz", 1], ["dtz-2", 2], ["dtz-3", 3]].map(([id, n]) => mock(id, "DTZ", n)),
        ...[["dtz", 1], ["dtz-2", 2], ["dtz-3", 3]].map(([id, n]) => mockPdf(id, "DTZ", n)),
      ],
    }),
    lid: () => ({
      h: "Leben in Deutschland",
      items: [
        tile("#lid", "🇩🇪", "LiD-Trainer: alle 310 Fragen", "Block für Block, Fehler wiederholen"),
        tile("#simulation/lid", "⏱️", "LiD · Probetest", "33 Fragen · 60 Minuten"),
        tile(`${SIM}lid-test-1.pdf`, "📄", "LiD · Probetest 1 zum Ausdrucken", "PDF · mit Lösungen", true),
        tile(`${SIM}lid-test-2.pdf`, "📄", "LiD · Probetest 2 zum Ausdrucken", "PDF · mit Lösungen", true),
      ],
    }),
    telcb1: () => ({
      h: "telc Deutsch B1",
      items: [
        tile("#pruefung/telcb1", "🎯", "telc B1 – Prüfungstraining", "Lesen, Hören, Schreiben, Sprechen"),
        tile("#vorbereitung/telc-b1", "🧭", "Aufbau und Strategien", "Jeder Teil mit Fallen und Lernplan"),
        ...[["telc-b1", 1], ["telc-b1-2", 2]].map(([id, n]) => mock(id, "telc B1", n)),
        ...[["telc-b1", 1], ["telc-b1-2", 2]].map(([id, n]) => mockPdf(id, "telc B1", n)),
      ],
    }),
    dtbb1: () => ({
      h: "DTB B1 – Deutsch-Test für den Beruf",
      items: [
        tile("#pruefung/dtbb1", "🎯", "DTB B1 – Prüfungstraining", "Kunden-E-Mail, Notiz, Gespräche im Team"),
        tile("#vorbereitung/dtb-b1", "🧭", "Aufbau und Strategien", "Jeder Teil mit Fallen und Lernplan"),
        ...[["dtb-b1", 1], ["dtb-b1-2", 2], ["dtb-b1-3", 3]].map(([id, n]) => mock(id, "DTB B1", n)),
        ...[["dtb-b1", 1], ["dtb-b1-2", 2], ["dtb-b1-3", 3]].map(([id, n]) => mockPdf(id, "DTB B1", n)),
      ],
    }),
    telcb2: () => ({
      h: "telc Deutsch B2",
      items: [
        tile("#pruefung/telcb2", "🎯", "telc B2 – Prüfungstraining", "Lesen, Hören, E-Mail, Sprechen"),
        tile("#vorbereitung/telc-b2", "🧭", "Aufbau und Strategien", "Jeder Teil mit Fallen und Lernplan"),
        tile("#b2-30-tage/telc", "📅", "B2 in 30 Tagen", "Lernplan telc B2 Tag für Tag"),
        ...[["telc-b2", 1], ["telc-b2-2", 2]].map(([id, n]) => mock(id, "telc B2", n)),
        ...[["telc-b2", 1], ["telc-b2-2", 2]].map(([id, n]) => mockPdf(id, "telc B2", n)),
      ],
    }),
    dtbb2: () => ({
      h: "DTB B2 – Deutsch-Test für den Beruf",
      items: [
        tile("#pruefung/dtbb2", "🎯", "DTB B2 – Prüfungstraining", "Beschwerde, Telefonnotiz, Besprechung"),
        tile("#vorbereitung/dtb-b2", "🧭", "Aufbau und Strategien", "Jeder Teil mit Fallen und Lernplan"),
        tile("#b2-30-tage/dtb", "📅", "B2 in 30 Tagen", "Lernplan DTB B2 Tag für Tag"),
        ...[["dtb-b2", 1], ["dtb-b2-2", 2], ["dtb-b2-3", 3]].map(([id, n]) => mock(id, "DTB B2", n)),
        ...[["dtb-b2", 1], ["dtb-b2-2", 2], ["dtb-b2-3", 3]].map(([id, n]) => mockPdf(id, "DTB B2", n)),
      ],
    }),
    start: () => ({
      h: "Dein Weg zur Prüfung",
      items: [
        tile("#einstufung", "🧭", "Einstufungstest", "5 Minuten · finde dein Niveau"),
        tile("#pruefungsinfo", "ℹ️", "Welche Prüfung brauche ich?", "DTZ, telc, DTB, Leben in Deutschland"),
        tile("#pruefung/dtz", "🎯", "Ziel nach A2: der DTZ", "So sieht die Prüfung im Integrationskurs aus"),
      ],
    }),
  };
  const LEVEL_EXAMS = {
    A0: ["start"],
    A1: ["start", "lid"],
    A2: ["dtz", "lid"],
    B1: ["dtz", "telcb1", "dtbb1", "lid"],
    B2: ["telcb2", "dtbb2"],
  };
  /* B2 has two exam formats: a switch shows only telc, only DTB, or both (choice remembered on this device) */
  const fmtLi = (li, f) => (f ? li.replace("<li>", `<li data-fmt="${f}">`) : li);
  const FMT_KEY = "dmd.b2fmt";
  const fmtGet = () => { try { return localStorage.getItem(FMT_KEY) || "all"; } catch { return "all"; } };
  const fmtSwitch = () => {
    const cur = fmtGet();
    const b = (v, label, sub) => `<button type="button" class="es-fmt-b" data-fmt-set="${v}" aria-pressed="${cur === v}"><b>${label}</b><small>${sub}</small></button>`;
    return `<section class="es-fmt" aria-labelledby="es-fmt-h"><h2 id="es-fmt-h" class="es-fmt-h">Welche Prüfung machst du?</h2><div class="es-fmt-row" role="group" aria-labelledby="es-fmt-h">${b("telc", "telc Deutsch B2", "allgemein")}${b("dtb", "DTB B2", "Deutsch-Test für den Beruf")}${b("all", "Beide / weiß noch nicht", "alles zeigen")}</div><p class="es-fmt-note"><a href="#pruefungsinfo">Unterschied telc B2 und DTB B2?</a></p></section>`;
  };
  function fmtBind() {
    const wrap = document.querySelector(".es-fmtwrap");
    document.querySelectorAll("[data-fmt-set]").forEach((btn) => (btn.onclick = () => {
      const v = btn.dataset.fmtSet;
      try { localStorage.setItem(FMT_KEY, v); } catch {}
      if (wrap) wrap.dataset.show = v;
      document.querySelectorAll("[data-fmt-set]").forEach((o) => o.setAttribute("aria-pressed", String(o === btn)));
      lvProgress();
    }));
  }
  function examSection(lv) {
    const FMT = { telcb2: "telc", dtbb2: "dtb", telcb1: "telc", dtbb1: "dtb" };
    const groups = (LEVEL_EXAMS[lv] || []).map((k) => ({ ...EXAM[k](), fmt: FMT[k] || "" }));
    if (!groups.length) return "";
    return `<section class="dm-section es-lv-sec es-lv-exam" aria-labelledby="lv-exam"><div class="dm-section-head"><h2 id="lv-exam">Prüfungsvorbereitung</h2><a href="#pruefung">Alle Prüfungen</a></div>${groups
      .map((g) => `<div class="es-fmtgrp"${g.fmt ? ` data-fmt="${g.fmt}"` : ""}><h3 class="es-lv-h3">${x(g.h)}</h3><ul class="es-links">${g.items.join("")}</ul></div>`)
      .join("")}</section>`;
  }
  /* level page progress: which tiles were opened on this device (DM.store.seen = { "<href>": timestamp }, saved with DM.save,
     part of the learning-progress backup) plus results that already exist elsewhere (lessons, listening, reading, mock exams …).
     Nothing is sent anywhere. */
  const seenStore = () => (mem.seen ||= {});
  function doneElsewhere(href) {
    const m = /^#([^/]+)\/?([^/]*)/.exec(href || "");
    if (!m) return false;
    const [, r, id] = m, d = mem.done || {};
    const anyKey = (pre) => Object.keys(d).some((k) => k.startsWith(pre));
    try {
      if (r === "lektion") return !!d["lektion:" + id] || (typeof platformDone !== "undefined" && platformDone.has(id));
      if (r === "hoeren") return anyKey(`hoeren:${id}:`);
      if (r === "lesen") return ((DM.reading || []).find((s) => s.id === id)?.items || []).some((it) => d["lesen:" + it.id] !== undefined);
      if (r === "lernweg") return anyKey(`weg:${id}:`);
      if (r === "simulation") {
        const sim = mem.sim || {};
        return !!(sim.done && sim.done[id] && Object.keys(sim.done[id]).length) || !!(sim[id + "_hist"] || []).length;
      }
      if (r === "b2-30-tage") return !!Object.keys((mem.b2_30 && mem.b2_30[id] && mem.b2_30[id].done) || {}).length;
      if (r === "b2-woerter") return !!Object.keys((mem.b2w && mem.b2w.s) || {}).length;
    } catch {}
    return false;
  }
  const isSeen = (href) => !!seenStore()[href] || doneElsewhere(href);
  function lvProgress() {
    const wrap = $(".es-fmtwrap"), out = $("#es-prog");
    if (!wrap || !out) return;
    const show = wrap.dataset.show || "all";
    const hrefs = new Set();
    $$("a.es-link", wrap).forEach((a) => {
      const href = a.getAttribute("href"), on = isSeen(href);
      if (on && !a.classList.contains("is-seen")) {
        a.classList.add("is-seen");
        a.insertAdjacentHTML("beforeend", '<span class="es-seen" aria-hidden="true">✓</span><span class="dm-sr"> – bereits geöffnet</span>');
      }
      const g = a.closest("[data-fmt]");
      if (show === "all" || !g || g.dataset.fmt === show) hrefs.add(href);
    });
    const total = hrefs.size, n = [...hrefs].filter(isSeen).length, pct = total ? Math.round((n / total) * 100) : 0;
    out.innerHTML = `<p class="es-prog-t">Du hast <b>${n} von ${total}</b> Materialien geöffnet</p><div class="es-prog-bar" role="progressbar" aria-label="Geöffnete Materialien" aria-valuemin="0" aria-valuemax="${total}" aria-valuenow="${n}" aria-valuetext="${n} von ${total}"><span style="width:${pct}%"></span></div><p class="es-prog-note">Nur auf diesem Gerät gespeichert · <a href="#lernstand">Lernstand sichern</a></p>`;
  }
  function lvTrack() {
    const wrap = $(".es-fmtwrap");
    if (!wrap) return;
    const mark = (e) => {
      const a = e.target.closest && e.target.closest("a.es-link");
      if (!a || (e.type === "auxclick" && e.button !== 1)) return;
      seenStore()[a.getAttribute("href")] = Date.now();
      DM.save && DM.save();
      lvProgress();
    };
    wrap.addEventListener("click", mark);
    wrap.addEventListener("auxclick", mark);
  }
  function levelPage(lv) {
    if (!LV_NAME[lv]) lv = "A1";
    mem.level = lv;
    DM.save && DM.save();
    const L = lv === "A0" ? "A1" : lv;
    const LS =
      typeof lessons !== "undefined"
        ? lessons.filter((l) => l.level === L)
        : [];
    const es = ES.topics.filter(
      (t) => t.level === lv || (lv === "A1" && t.level === "A0"),
    );
    const mats = (DM.materials || []).filter((m) => hasLv(m.level, L));
    const paths = (LEVEL_PATHS[lv] || []).filter(
      (id) => DM.paths && DM.paths[id],
    );
    const hoer = Object.entries(DM.listeningExam || {}).filter(([, s]) =>
      hasLv(s.level, L),
    );
    const les = (DM.reading || []).filter((s) => hasLv(s.level, L));
    const S = [];
    if (lv === "A0") {
      S.push(
        `<section class="dm-section es-lv-sec" aria-labelledby="lv-es"><div class="dm-section-head"><h2 id="lv-es">1 · Erste Schritte: Bildkarten mit Ton</h2><p>${doneCount(es)} von ${es.length} geschafft</p></div><p>Starte hier. Jedes Thema hat Bilder, Ton und kleine Übungen. Die Übersetzung kannst du in deine Sprache stellen.</p>${topicGrid(es)}</section>`,
      );
      S.push(
        block(
          "next",
          "2 · Danach: die ersten Lektionen",
          LS.slice(0, 3).map((l) =>
            tile("#lektion/" + l.id, "📘", l.title, "Lektion · A1"),
          ),
        ),
      );
      S.push(
        block("ueben", "3 · Hören, sprechen, spielen", [
          tile(
            "#ueben/sprechen/A1/0",
            "💬",
            "Mich vorstellen",
            "Sprechen · A1",
          ),
          tile("#spiele/zahlen", "🔢", "Zahlen-Ohr", "Spiel · Zahlen hören"),
          tile(
            "#spiele/artikel",
            "👆",
            "Der, die, das – Wisch!",
            "Spiel · Artikel",
          ),
          tile("#spiele/memory", "🃏", "Wort-Memory", "Spiel"),
          tile("#lieder/A1", "🎵", "Lieder A1", "Mitsingen und lernen"),
          tile(
            "#hallo",
            "🎧",
            "Dennis in deiner Sprache",
            "Hilfe in deiner Sprache",
          ),
        ]),
      );
      S.push(examSection(lv));
    } else {
      if (es.length)
        S.push(
          `<section class="dm-section es-lv-sec" aria-labelledby="lv-es"><div class="dm-section-head"><h2 id="lv-es">Bildkarten mit Ton</h2><a href="#erste-schritte">Alle Themen</a></div>${topicGrid(lv === "A1" ? es.filter((t) => t.level === "A1") : es)}${lv === "A1" ? `<p class="dm-small">Noch ganz am Anfang? <a href="#niveau/A0">Zu den A0-Themen</a> (Alphabet, Zahlen, Farben …).</p>` : ""}</section>`,
        );
      S.push(
        block(
          "lek",
          "Lektionen",
          LS.map((l) =>
            tile("#lektion/" + l.id, "📘", l.title, `Lektion · ${l.level}`),
          ),
          `<a href="#lernen/${L}">Alle ${L}-Lektionen</a>`,
        ),
      );
      S.push(examSection(lv));
      S.push(
        block(
          "wort",
          "Wortschatz",
          [
            ...(lv === "B2" ? [tile("#b2-woerter", "🗂️", "B2-Wörter nach Prüfungsthemen – Karteikarten", "8 Themen · Wort, Artikel, Plural, Beispielsatz")] : []),
            ...LS.map((l) =>
            tile(
              "#wortschatz/" + l.id + "/0",
              "🗂️",
              l.title.replace(/[.!?]$/, ""),
              "20 Wortkarten mit Bild und Lernspielen",
            ),
          ),
          ],
        ),
      );
      S.push(
        block("ueben", "Sprechen und Schreiben", [
          tile(
            `#ueben/sprechen/${L}`,
            "💬",
            `Sprechen ${L}`,
            "Gespräche aus dem Alltag",
          ),
          tile(
            `#ueben/schreiben/${L}`,
            "✍️",
            `Schreiben ${L}`,
            "Mit Sofort-Korrektur und Mustertext",
          ),
        ]),
      );
      S.push(
        block("hl", "Hören und Lesen", [
          ...hoer.map(([id, s]) =>
            fmtLi(tile("#hoeren/" + id, "🎧", s.title, `Hören · ${s.level}`), /DTB/.test(s.title) ? "dtb" : /telc/i.test(s.title) ? "telc" : ""),
          ),
          ...les.map((s) =>
            tile("#lesen/" + s.id, "📖", s.title, `Lesen · ${s.level}`),
          ),
        ]),
      );
      const lessonPdfs = LS.map((l) =>
        tile(`material/${l.id}.pdf`, "📘", `Lektion: ${l.title}`, `${l.level} · Arbeitsblatt zur Lektion`, true),
      );
      const matTile = (m) =>
        tile(
          m.file,
          "📄",
          m.title,
          `${m.level} · ${m.pages} ${m.pages === 1 ? "Seite" : "Seiten"}${m.loes ? " · mit Lösungen" : ""}`,
          true,
        );
      const allPdfs = `<a href="#material/alle/${L}">Alle ${mats.length} PDFs</a>`;
      if (mats.some((m) => m.fmt)) {
        // levels with several exam formats (B2): shared material first, then one group per exam format
        const groups = [
          ["Für alle Prüfungen: Grammatik, Wortschatz, Sprechen", mats.filter((m) => !m.fmt).map(matTile)],
          ["DTB B2 – Deutsch-Test für den Beruf", mats.filter((m) => m.fmt === "dtb").map(matTile), "dtb"],
          ["telc Deutsch B2 – allgemein", mats.filter((m) => m.fmt === "telc").map(matTile), "telc"],
          ["Arbeitsblätter zu den Lektionen", lessonPdfs],
        ].filter(([, items]) => items.length);
        S.push(
          `<section class="dm-section es-lv-sec es-lv-exam" aria-labelledby="lv-pdf"><div class="dm-section-head"><h2 id="lv-pdf">Arbeitsblätter zum Ausdrucken (PDF)</h2>${allPdfs}</div>${groups
            .map(([h, items, f]) => `<div class="es-fmtgrp"${f ? ` data-fmt="${f}"` : ""}><h3 class="es-lv-h3">${x(h)}</h3><ul class="es-links">${items.join("")}</ul></div>`)
            .join("")}</section>`,
        );
      } else {
        S.push(block("pdf", "Arbeitsblätter zum Ausdrucken (PDF)", [...lessonPdfs, ...mats.slice(0, 24).map(matTile)], allPdfs));
      }
      S.push(
        block("mehr", "Lieder und Spiele", [
          tile("#lieder/" + L, "🎵", `Lieder ${L}`, "Mit Text und Aufgaben"),
          tile("#spiele", "🎮", "Lernspiele", "Artikel, Verben, Alltag …"),
          tile("#kahoot", "🟣", "Kahoot-Quiz", "Allein oder im Kurs"),
        ]),
      );
    }
    if (paths.length)
      S.push(
        block(
          "wege",
          "Lernwege mit Plan",
          paths.map((id) => {
            const q = DM.paths[id];
            return fmtLi(tile("#lernweg/" + id, q.icon, q.title, q.level), /^telc/.test(id) ? "telc" : /^dtb/.test(id) ? "dtb" : "");
          }),
        ),
      );
    DM.page(`${DM.crumbs([["Niveau " + lv]])}
      <div class="dm-head"><p class="dm-kicker">Deine Materialien</p><h1>Niveau ${lv} · ${x(lv === "B2" ? "Beruf und Prüfung" : LV_NAME[lv])}</h1><p class="dm-lead">${lv === "A0" ? "Du fängst ganz neu an? Hier sind deine ersten Schritte – in dieser Reihenfolge." : `Alles für ${L} an einem Ort: Lektionen, Wörter, Übungen, Hörtexte und Arbeitsblätter.`}</p><div class="es-prog" id="es-prog"></div></div>
      <nav class="dm-tabs dm-tabs-small es-lvtabs" aria-label="Niveau wechseln">${Object.keys(
        LV_NAME,
      )
        .map(
          (k) =>
            `<a href="#niveau/${k}"${k === lv ? ' aria-current="page"' : ""}><b>${k}</b><small>${x(LV_NAME[k])}</small></a>`,
        )
        .join("")}</nav>
      ${lv === "B2" ? fmtSwitch() : ""}<div class="es-fmtwrap" data-show="${lv === "B2" ? fmtGet() : "all"}">${S.join("")}</div>`);
    if (lv === "B2") fmtBind();
    lvProgress();
    lvTrack();
  }

  DM.routes["erste-schritte"] = (p) => (p[1] ? topicPage(p[1]) : hub());
  DM.routes.niveau = (p) => levelPage((p[1] || "").toUpperCase());
})();
