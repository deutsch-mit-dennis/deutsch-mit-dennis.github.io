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
      return `<img class="es-img" src="assets/${it.img}.webp" alt="" width="256" height="256" loading="lazy">`;
    if (it.img)
      return `<span class="es-emoji" aria-hidden="true">${it.img}</span>`;
    return `<span class="es-tile${it.w.length > 3 ? " es-tile-long" : ""}" aria-hidden="true">${x(it.w)}</span>`;
  }
  const isVisual = (t) =>
    t.kind === "pic" || t.kind === "color" || t.kind === "clock";
  const doneCount = (list) => list.filter((t) => mem.done["es:" + t.id]).length;

  /* ---------- hub ---------- */
  function topicCard(t) {
    const it = t.items.find((i) => i.img && i.img.includes("/"));
    return `<li><a class="es-tcard${mem.done["es:" + t.id] ? " is-done" : ""}" href="#erste-schritte/${t.id}">${it ? `<img src="assets/${it.img}.webp" alt="" width="256" height="256" loading="lazy">` : `<span class="es-tcard-ic" aria-hidden="true">${t.icon}</span>`}<span class="es-tcard-t"><small>${t.level}${mem.done["es:" + t.id] ? " · ✓ geschafft" : ` · ${t.items.length} Karten`}</small><b>${x(t.title)}</b></span></a></li>`;
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
            answer(b, opts[+b.dataset.k] === cur, label(cur.it))),
      );
    }
    function answer(btn, ok, right) {
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
      $(".es-fb", box).innerHTML =
        `${ok ? "✓ Richtig!" : "✗ Richtig ist:"} <b>${x(right)}</b> <button type="button" class="dm-btn es-next">${r + 1 < rounds.length ? "Weiter →" : "Ergebnis"}</button>`;
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
      S.push(
        block(
          "wort",
          "Wortschatz",
          LS.map((l) =>
            tile(
              "#wortschatz/" + l.id + "/0",
              "🗂️",
              l.title.replace(/[.!?]$/, ""),
              "20 Wortkarten mit Bild und Lernspielen",
            ),
          ),
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
            tile("#hoeren/" + id, "🎧", s.title, `Hören · ${s.level}`),
          ),
          ...les.map((s) =>
            tile("#lesen/" + s.id, "📖", s.title, `Lesen · ${s.level}`),
          ),
        ]),
      );
      S.push(
        block(
          "pdf",
          "Arbeitsblätter zum Ausdrucken (PDF)",
          mats
            .slice(0, 24)
            .map((m) =>
              tile(
                m.file,
                "📄",
                m.title,
                `${m.level} · ${m.pages} ${m.pages === 1 ? "Seite" : "Seiten"}${m.loes ? " · mit Lösungen" : ""}`,
                true,
              ),
            ),
          `<a href="#material/alle/${L}">Alle ${mats.length} PDFs</a>`,
        ),
      );
      S.push(
        block("mehr", "Lieder, Spiele und Prüfung", [
          tile("#lieder/" + L, "🎵", `Lieder ${L}`, "Mit Text und Aufgaben"),
          tile("#spiele", "🎮", "Lernspiele", "Artikel, Verben, Alltag …"),
          tile("#kahoot", "🟣", "Kahoot-Quiz", "Allein oder im Kurs"),
          ...(L !== "A1"
            ? [
                tile(
                  "#simulation",
                  "🏆",
                  "Probeprüfungen",
                  "DTZ, telc, DTB – mit Zeit und Punkten",
                ),
              ]
            : []),
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
            return tile("#lernweg/" + id, q.icon, q.title, q.level);
          }),
        ),
      );
    DM.page(`${DM.crumbs([["Niveau " + lv]])}
      <div class="dm-head"><p class="dm-kicker">Deine Materialien</p><h1>Niveau ${lv} · ${x(LV_NAME[lv])}</h1><p class="dm-lead">${lv === "A0" ? "Du fängst ganz neu an? Hier sind deine ersten Schritte – in dieser Reihenfolge." : `Alles für ${L} an einem Ort: Lektionen, Wörter, Übungen, Hörtexte und Arbeitsblätter.`}</p></div>
      <nav class="dm-tabs dm-tabs-small es-lvtabs" aria-label="Niveau wechseln">${Object.keys(
        LV_NAME,
      )
        .map(
          (k) =>
            `<a href="#niveau/${k}"${k === lv ? ' aria-current="page"' : ""}><b>${k}</b><small>${x(LV_NAME[k])}</small></a>`,
        )
        .join("")}</nav>
      ${S.join("")}`);
  }

  DM.routes["erste-schritte"] = (p) => (p[1] ? topicPage(p[1]) : hub());
  DM.routes.niveau = (p) => levelPage((p[1] || "").toUpperCase());
})();
