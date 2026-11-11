/* LiD-Trainer: alle 300 allgemeinen Fragen + 10 Fragen des gewählten Bundeslandes (alle 16 Länder)
   aus dem BAMF-Gesamtfragenkatalog. Lernen in Blöcken, Fehler wiederholen, Fragenliste und
   Testsimulation (33 Fragen, 60 Minuten). Nach jeder Antwort: kurze Erklärung „Warum?“ (lid-warum.js).
   Data: lid-katalog.js (general + NRW, eager), lid-laender.js + lid-warum.js (lazy, may be missing).
   State (only in the browser): DM.store.lid = { land: 'by', '<question id>': {r, f, last}, _best, _tests, _m }.
   Public helpers for simulation.js: DM.lidLand(), DM.lidSetLand(code), DM.lidLandPicker(), DM.lidLabel(q), DM.lidWarum(q). */
(() => {
  const K = window.LID_KATALOG || [];
  const GEN = K.filter((q) => typeof q.nr === "number");
  const NRW = K.filter((q) => typeof q.nr !== "number"); // fallback if lid-laender.js is missing
  const BLOCK = 30;
  const BLOCKS = Math.ceil(GEN.length / BLOCK); // 10 blocks + state block
  const IMG = "assets/lid-fragen/";
  const ALT = (f, fb) => e((window.LID_BILD_ALT || {})[f] || fb); // lid-bilder-alt.js + lid-laender.js
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const e = (s) => DM.esc(s);
  const mem = () => {
    const m = DM.store;
    m.lid ||= {};
    return m.lid;
  };
  const stat = (id) => mem()[id] || (mem()[id] = { r: 0, f: 0, last: null });
  const shuffle = (a) => {
    a = [...a];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };

  /* ---------- Bundesland ---------- */
  const laender = () =>
    window.LID_LAENDER || { nw: { name: "Nordrhein-Westfalen", fragen: NRW } };
  const allLand = () => Object.values(laender()).flatMap((l) => l.fragen);
  const isStat = (v) => v && typeof v === "object" && "last" in v;
  const hadProgress = (m) =>
    m._best != null || Object.keys(m).some((k) => k[0] !== "_" && isStat(m[k]));
  function landCode() {
    const m = mem(),
      L = laender();
    if (m.land) return L[m.land] ? m.land : null;
    if (hadProgress(m) && L.nw) {
      m.land = "nw";
      DM.save();
      return "nw";
    } // learners from the time when only NRW existed
    return null;
  }
  const land = () => {
    const c = landCode();
    return c ? { code: c, ...laender()[c] } : null;
  };
  const LAND = () => land()?.fragen || [];
  const pool = () => [...GEN, ...LAND()];
  function setLand(code) {
    if (!laender()[code]) return false;
    mem().land = code;
    DM.save();
    return true;
  }
  const landOf = (q) => laender()[String(q.id).split("-")[0].toLowerCase()];
  const nrLabel = (q) =>
    typeof q.nr === "number"
      ? `Frage ${q.nr}`
      : `${landOf(q)?.name || "Bundesland"}: Frage ${+String(q.id).split("-")[1] || ""}`;
  const warum = (q) => (window.LID_WARUM || {})[q.id] || "";
  const warumHTML = (q) =>
    warum(q) ? `<p class="lid-warum"><b>Warum?</b> ${e(warum(q))}</p>` : "";
  const landGrid = () => {
    const cur = landCode();
    return `<div class="lid-land-grid" role="group" aria-label="Bundesland wählen">${Object.entries(
      laender(),
    )
      .map(
        ([c, l]) =>
          `<button type="button" class="lid-land-btn" data-land="${c}" aria-pressed="${c === cur}">${e(l.name)}</button>`,
      )
      .join("")}</div>`;
  };
  function landCard() {
    const l = land(),
      one = Object.keys(laender()).length < 2;
    if (!l)
      return `<section class="dm-card lid-land is-ask" id="lid-land"><h2>Wo wohnst du?</h2><p>Im Test kommen 3 Fragen zu deinem Bundesland. Wähle dein Bundesland:</p>${landGrid()}</section>`;
    return `<details class="dm-card lid-land" id="lid-land"><summary>Dein Bundesland: <b>${e(l.name)}</b> <span class="lid-land-change">ändern</span></summary>${one ? '<p class="dm-small">Die Fragen für die anderen Bundesländer konnten nicht geladen werden. Bitte lade die Seite neu.</p>' : `<p class="dm-small">Dein Lernstand bleibt gespeichert, auch wenn du das Bundesland wechselst.</p>${landGrid()}`}</details>`;
  }
  const bindLand = (after) =>
    $$("[data-land]").forEach(
      (b) =>
        (b.onclick = () => {
          if (setLand(b.dataset.land)) after();
        }),
    );

  const blockOf = (n) =>
    n === "land" ? LAND() : GEN.slice((n - 1) * BLOCK, n * BLOCK);
  const blockName = (n) =>
    n === "land"
      ? `${land()?.name || "Bundesland"} (10 Fragen)`
      : `Fragen ${(n - 1) * BLOCK + 1}–${Math.min(n * BLOCK, GEN.length)}`;
  const blockKey = (v) =>
    v === "land" || v === "nrw"
      ? "land"
      : Math.min(Math.max(+v || 1, 1), BLOCKS); // 'nrw' = old links
  const isPicAnswer = (q) => q.img.length === 4 && /^Bild \d$/.test(q.a[0]);
  const known = (q) => {
    const s = mem()[q.id];
    return s && s.last === true;
  };
  const wrongList = () => pool().filter((q) => mem()[q.id]?.last === false);
  const head = (
    title,
    lead,
  ) => `${DM.crumbs([["Prüfungstraining", "#pruefung/lid"], ["Leben in Deutschland", title ? "#lid" : null], ...(title ? [[title]] : [])])}
    <div class="dm-head"><h1>${title || "Leben in Deutschland: alle 310 Fragen"}</h1>${lead ? `<p class="dm-lead">${lead}</p>` : ""}</div>${!title && window.lidHubNav ? lidHubNav("#lid") : ""}`;
  /* One source line for all pages with catalogue questions: LID_QUELLE_HTML (lid-katalog.js). */
  const WARUM_NOTE = "Erklärungen: Deutsch mit Dennis – nicht vom BAMF.";
  const foot = () =>
    `${window.LID_QUELLE_HTML || ""}<p class="dm-small lid-src">Enthalten sind die 300 allgemeinen Fragen und je 10 Fragen für alle 16 Bundesländer. Aufbereitet nach dem Datensatz <a href="https://github.com/YehorAltshuler/bamf-lid-dataset" target="_blank" rel="noopener">bamf-lid-dataset ↗</a>.${window.LID_WARUM ? ` ${WARUM_NOTE}` : ""}</p>`;

  /* Wrong answers also go to the global notebook (#fehler). Picture-only answers cannot be shown there. */
  function toNotebook(q) {
    try {
      if (!window.DMFehler || isPicAnswer(q)) return;
      const item = {
        q: q.q,
        a: q.a[q.s],
        src: "Leben in Deutschland",
        hint: warum(q),
        opts: [...q.a],
      };
      if (q.img.length === 1) item.img = IMG + q.img[0];
      DMFehler.add(item);
    } catch {
      /* the notebook must never break the trainer */
    }
  }

  function questionHTML(q, { chosen = null, reveal = false } = {}) {
    const pic = isPicAnswer(q);
    const top =
      !pic && q.img.length
        ? `<figure class="lid-q-img">${q.img.map((f) => `<img src="${IMG}${f}" alt="${ALT(f, "Abbildung zur Frage")}" loading="lazy">`).join("")}</figure>`
        : "";
    const opts = q.a
      .map((t, i) => {
        let cls = "lid-opt";
        if (reveal && i === q.s) cls += " is-right";
        else if (reveal && i === chosen) cls += " is-wrong";
        else if (!reveal && i === chosen) cls += " is-chosen";
        const body = pic
          ? `<img src="${IMG}${q.img[i]}" alt="Bild ${i + 1}: ${ALT(q.img[i], "")}" loading="lazy"><span>Bild ${i + 1}</span>`
          : `<span>${e(t)}</span>`;
        return `<button type="button" class="${cls}${pic ? " lid-opt-pic" : ""}" data-i="${i}" ${reveal ? "disabled" : ""}><b>${"ABCD"[i]}</b>${body}</button>`;
      })
      .join("");
    return `<div class="lid-q"><p class="lid-q-nr">${e(nrLabel(q))}</p><h2 class="lid-q-text">${e(q.q)}</h2>${top}<div class="lid-opts${pic ? " lid-opts-pic" : ""}" role="group" aria-label="Antworten">${opts}</div></div>`;
  }
  const speakText = (q) =>
    `${q.q}. ${isPicAnswer(q) ? "" : q.a.map((t, i) => `${"ABCD"[i]}: ${t}`).join(". ")}`;

  /* ---------- Übersicht ---------- */
  function hub() {
    const l = land(),
      P = pool(),
      all = P.length,
      ok = P.filter(known).length,
      wrong = wrongList().length;
    const blockCard = (n) => {
      const qs = blockOf(n),
        done = qs.filter(known).length;
      return `<a class="lid-block" href="#lid/lernen/${n}"><b>${e(blockName(n))}</b><span class="lid-bar"><i style="width:${Math.round((done / qs.length) * 100)}%"></i></span><small>${done} von ${qs.length} sicher</small></a>`;
    };
    const landBlock = l
      ? blockCard("land")
      : `<a class="lid-block lid-block-ask" href="#lid" data-pick><b>Dein Bundesland (10 Fragen)</b><small>Wähle zuerst dein Bundesland.</small></a>`;
    DM.page(
      `${head("", "Alle 300 allgemeinen Fragen und die 10 Fragen für dein Bundesland. Die Fragen und Antworten stammen aus dem offiziellen Gesamtfragenkatalog des Bundesamts für Migration und Flüchtlinge (BAMF). Lerne in Blöcken, wiederhole deine Fehler und mach den Test unter echten Bedingungen.")}
      ${landCard()}
      <section class="lid-stats dm-card">
        <div><b>${ok}</b><span>von ${all} Fragen sicher</span></div>
        <div><b>${wrong}</b><span>Fragen zum Wiederholen</span></div>
        <div><b>${mem()._best ?? "–"}</b><span>beste Testpunktzahl (von 33)</span></div>
        <span class="lid-bar lid-bar-big"><i style="width:${Math.round((ok / all) * 100)}%"></i></span>
      </section>
      <div class="lid-actions">
        <a class="dm-btn" href="#lid/test">⏱ Test simulieren (33 Fragen, 60 Min.)</a>
        <a class="dm-btn dm-btn-quiet" href="#lid/fehler" ${wrong ? "" : 'aria-disabled="true"'}>Fehler wiederholen (${wrong})</a>
        <a class="dm-btn dm-btn-quiet" href="#lid/zufall">10 zufällige Fragen</a>
        <a class="dm-btn dm-btn-quiet" href="#lid/liste/1">Fragen mit Lösungen lesen</a>
      </div>
      <h2 class="lid-h2">Lernen in Blöcken</h2>
      <div class="lid-blocks">${Array.from({ length: BLOCKS }, (_, i) => blockCard(i + 1)).join("")}${landBlock}</div>
      <details class="dm-card lid-info"><summary>So funktioniert der Test „Leben in Deutschland“</summary>
        <p>Der Test hat <b>33 Fragen</b>: 30 aus den 300 allgemeinen Fragen und 3 aus den 10 Fragen zu deinem Bundesland${l ? ` (hier: ${e(l.name)})` : ""}. Pro Frage ist genau eine von vier Antworten richtig. Du hast <b>60 Minuten</b> Zeit.</p>
        <p>Mit <b>mindestens 15 richtigen Antworten</b> hast du den Test bestanden (Orientierungskurs). Für die <b>Einbürgerung</b> brauchst du <b>mindestens 17</b>.</p>
        <p>Tipp von Dennis: Lerne jeden Tag einen Block. Mach am Ende des Blocks „Fehler wiederholen“, bis die Liste leer ist. Wenn du im Test dreimal hintereinander über 28 Punkte hast, bist du gut vorbereitet.</p></details>
      <p class="dm-small"><button type="button" class="dm-linkbtn" id="lid-reset">Fortschritt zurücksetzen</button> – dein Fortschritt bleibt nur auf diesem Gerät.</p>
      ${foot()}`,
      "lid-page",
    );
    bindLand(hub);
    const pick = $("[data-pick]");
    if (pick)
      pick.onclick = (ev) => {
        ev.preventDefault();
        $("#lid-land")?.scrollIntoView({ block: "center" });
        $(".lid-land-btn")?.focus({ preventScroll: true });
      };
    $("#lid-reset").onclick = () => {
      if (!confirmReset()) return;
      const old = mem(),
        keep = {}; // keep the chosen state and the progress of "Deutschland verstehen" (lid.js)
      if (old.land) keep.land = old.land;
      if (old._m) keep._m = old._m;
      DM.store.lid = keep;
      DM.save();
      hub();
    };
  }
  function confirmReset() {
    const b = $("#lid-reset");
    if (b.dataset.sure) return true;
    b.dataset.sure = "1";
    b.textContent = "Wirklich alles löschen? Nochmal klicken.";
    return false;
  }

  /* ---------- Lernmodus: eine Frage nach der anderen ---------- */
  let session = null;
  function learn(list, title, back) {
    session = { list, pos: 0, right: 0, title, back, key: location.hash };
    drawLearn();
  }
  function drawLearn() {
    const s = session,
      q = s.list[s.pos];
    if (!q) return learnEnd();
    DM.page(
      `${head(s.title, "")}
      <div class="lid-progress"><span>${s.pos + 1} / ${s.list.length}</span><span class="lid-bar"><i style="width:${Math.round((s.pos / s.list.length) * 100)}%"></i></span><span>✓ ${s.right}</span></div>
      <section class="dm-card lid-card">${questionHTML(q)}
        <div class="lid-under"><button type="button" class="dm-btn dm-btn-quiet dm-speak-lid">🔊 Vorlesen</button><div class="lid-feedback" role="status" aria-live="polite"></div><button type="button" class="dm-btn lid-next" hidden>Weiter →</button></div>
      </section>
      <p><a href="${s.back}">← Zurück zur Übersicht</a></p>${foot()}`,
      "lid-page",
    );
    $(".dm-speak-lid").onclick = () => DM.speak?.(speakText(q));
    $$(".lid-opt").forEach(
      (b) =>
        (b.onclick = () => {
          const i = +b.dataset.i,
            ok = i === q.s,
            st = stat(q.id);
          ok ? st.r++ : st.f++;
          st.last = ok;
          DM.save();
          if (ok) s.right++;
          else toNotebook(q);
          $(".lid-card .lid-q").outerHTML = questionHTML(q, {
            chosen: i,
            reveal: true,
          });
          $(".lid-feedback").innerHTML =
            `<p>${ok ? '<b class="ok">Richtig!</b>' : `<b class="no">Leider falsch.</b> Richtig ist <b>${"ABCD"[q.s]}</b>${isPicAnswer(q) ? "" : ": " + e(q.a[q.s].replace(/\.$/, ""))}. Die Frage kommt in „Fehler wiederholen“.`}</p>${warumHTML(q)}`;
          const n = $(".lid-next");
          n.hidden = false;
          n.focus();
          n.onclick = () => {
            s.pos++;
            drawLearn();
            window.scrollTo({ top: 0 });
          };
        }),
    );
  }
  function learnEnd() {
    const s = session,
      wrong = s.list.length - s.right;
    DM.page(
      `${head(s.title, "")}
      <section class="dm-card lid-result ${wrong ? "" : "is-pass"}"><p class="lid-big">${s.right} / ${s.list.length}</p><h2>${wrong ? "Gut gemacht – jetzt die Fehler wiederholen." : "Super – alles richtig!"}</h2>
      <div class="lid-actions">${wrong ? '<a class="dm-btn" href="#lid/fehler">Fehler wiederholen</a>' : ""}<button type="button" class="dm-btn dm-btn-quiet" id="lid-again">Noch einmal (gemischt)</button><a class="dm-btn dm-btn-quiet" href="#lid">Zur Übersicht</a></div></section>${foot()}`,
      "lid-page",
    );
    $("#lid-again").onclick = () => learn(shuffle(s.list), s.title, s.back);
  }

  /* ---------- Liste mit Lösungen ---------- */
  function list(n) {
    n = blockKey(n);
    const l = land();
    if (n === "land" && !l) return hub();
    const tabs = [
      ...Array.from({ length: BLOCKS }, (_, i) => i + 1),
      ...(l ? ["land"] : []),
    ]
      .map(
        (k) =>
          `<a href="#lid/liste/${k}" ${String(k) === String(n) ? 'aria-current="page"' : ""}><b>${k === "land" ? e(l.name) : `${(k - 1) * BLOCK + 1}–${k * BLOCK}`}</b></a>`,
      )
      .join("");
    DM.page(
      `${head("Fragen mit Lösungen", "Lies die Fragen und die richtige Antwort. Danach übst du den Block ohne Lösungen.")}
      <nav class="dm-tabs dm-tabs-small lid-tabs" aria-label="Block">${tabs}</nav>
      <ol class="lid-list">${blockOf(n)
        .map(
          (
            q,
          ) => `<li class="dm-card"><p class="lid-q-nr">${e(nrLabel(q))} ${known(q) ? '<span class="lid-ok">✓ sicher</span>' : mem()[q.id]?.last === false ? '<span class="lid-no">↻ wiederholen</span>' : ""}</p><p class="lid-q-text">${e(q.q)}</p>${q.img.length && !isPicAnswer(q) ? `<figure class="lid-q-img">${q.img.map((f) => `<img src="${IMG}${f}" alt="${ALT(f, "Abbildung zur Frage")}" loading="lazy">`).join("")}</figure>` : ""}
        ${isPicAnswer(q) ? `<div class="lid-opts-pic lid-mini">${q.img.map((f, i) => `<figure class="${i === q.s ? "is-right" : ""}"><img src="${IMG}${f}" alt="Bild ${i + 1}: ${ALT(f, "")}" loading="lazy"><figcaption>Bild ${i + 1}${i === q.s ? " ✓" : ""}</figcaption></figure>`).join("")}</div>` : `<ul class="lid-ans">${q.a.map((t, i) => `<li class="${i === q.s ? "is-right" : ""}">${i === q.s ? "✓ " : ""}${e(t)}</li>`).join("")}</ul>`}${warumHTML(q)}</li>`,
        )
        .join("")}</ol>
      <div class="lid-actions"><a class="dm-btn" href="#lid/lernen/${n}">Diesen Block üben</a><a class="dm-btn dm-btn-quiet" href="#lid">Zur Übersicht</a></div>${foot()}`,
      "lid-page",
    );
  }

  /* ---------- Testsimulation ---------- */
  let test = null,
    timer = null;
  function startTest() {
    const qs = [...shuffle(GEN).slice(0, 30), ...shuffle(LAND()).slice(0, 3)];
    test = {
      qs,
      land: land()?.name || "",
      ans: Array(qs.length).fill(null),
      pos: 0,
      end: Date.now() + 60 * 60 * 1000,
      done: false,
    };
    drawTest();
  }
  const fmt = (ms) => {
    const t = Math.max(0, Math.round(ms / 1000));
    return `${String(Math.floor(t / 60)).padStart(2, "0")}:${String(t % 60).padStart(2, "0")}`;
  };
  function tick() {
    const el = $("#lid-clock");
    if (!el || !test || test.done) {
      clearInterval(timer);
      return;
    }
    const left = test.end - Date.now();
    el.textContent = fmt(left);
    el.classList.toggle("is-low", left < 5 * 60000);
    if (left <= 0) finishTest(true);
  }
  function drawTest() {
    if (!test || test.done) return startIntro();
    const N = test.qs.length,
      q = test.qs[test.pos],
      answered = test.ans.filter((a) => a !== null).length;
    DM.page(
      `${head("Testsimulation", "")}
      <div class="lid-testbar dm-card"><span>Frage <b>${test.pos + 1}</b> von ${N}</span><span>${answered} beantwortet</span><span class="lid-clock" aria-label="Restzeit">⏱ <b id="lid-clock">${fmt(test.end - Date.now())}</b></span></div>
      <nav class="lid-grid" aria-label="Fragen">${test.qs.map((_, i) => `<button type="button" data-go="${i}" class="${i === test.pos ? "is-cur" : ""} ${test.ans[i] !== null ? "is-done" : ""}">${i + 1}</button>`).join("")}</nav>
      <section class="dm-card lid-card">${questionHTML(q, { chosen: test.ans[test.pos] })}</section>
      <div class="lid-actions"><button type="button" class="dm-btn dm-btn-quiet" id="lid-prev" ${test.pos ? "" : "disabled"}>← Zurück</button><button type="button" class="dm-btn dm-btn-quiet" id="lid-nxt" ${test.pos < N - 1 ? "" : "disabled"}>Weiter →</button><button type="button" class="dm-btn" id="lid-fin">Test abgeben</button></div>
      <p class="dm-small">Wie in der Prüfung: Du bekommst die Lösungen erst am Ende. Du kannst jede Antwort bis zur Abgabe ändern.</p>${foot()}`,
      "lid-page",
    );
    $$(".lid-opt").forEach(
      (b) =>
        (b.onclick = () => {
          test.ans[test.pos] = +b.dataset.i;
          if (test.pos < N - 1) test.pos++;
          drawTest();
        }),
    );
    $$("[data-go]").forEach(
      (b) =>
        (b.onclick = () => {
          test.pos = +b.dataset.go;
          drawTest();
        }),
    );
    $("#lid-prev").onclick = () => {
      test.pos--;
      drawTest();
    };
    $("#lid-nxt").onclick = () => {
      test.pos++;
      drawTest();
    };
    $("#lid-fin").onclick = () => {
      const open = test.ans.filter((a) => a === null).length,
        b = $("#lid-fin");
      if (open && !b.dataset.sure) {
        b.dataset.sure = 1;
        b.textContent = `${open} Fragen offen – trotzdem abgeben?`;
        return;
      }
      finishTest(false);
    };
    clearInterval(timer);
    timer = setInterval(tick, 1000);
  }
  function finishTest(timeout) {
    clearInterval(timer);
    test.done = true;
    const N = test.qs.length,
      score = test.qs.filter((q, i) => test.ans[i] === q.s).length;
    test.qs.forEach((q, i) => {
      const st = stat(q.id),
        ok = test.ans[i] === q.s;
      ok ? st.r++ : st.f++;
      st.last = ok;
      if (!ok) toNotebook(q);
    });
    const m = mem();
    m._best = Math.max(m._best || 0, score);
    (m._tests ||= []).push({ d: Date.now(), s: score });
    m._tests = m._tests.slice(-20);
    DM.save();
    const pass = score >= 15,
      citizen = score >= 17;
    const wrong = test.qs
      .map((q, i) => [q, test.ans[i]])
      .filter(([q, a]) => a !== q.s);
    DM.page(
      `${head("Dein Testergebnis", timeout ? "Die Zeit ist abgelaufen. Der Test wurde automatisch abgegeben." : "")}
      <section class="dm-card lid-result ${pass ? "is-pass" : "is-fail"}"><p class="lid-big">${score} / ${N}</p>
        <h2>${citizen ? "Bestanden – auch für die Einbürgerung (ab 17 Punkten)." : pass ? "Bestanden (ab 15 Punkten). Für die Einbürgerung brauchst du 17." : "Noch nicht bestanden. Du brauchst mindestens 15 richtige Antworten."}</h2>
        ${test.land ? `<p class="dm-small">Bundesland in diesem Test: ${e(test.land)}</p>` : ""}
        <div class="lid-actions"><button type="button" class="dm-btn" id="lid-new">Neuer Test</button>${wrong.length ? '<a class="dm-btn dm-btn-quiet" href="#lid/fehler">Fehler wiederholen</a>' : ""}<a class="dm-btn dm-btn-quiet" href="#lid">Zur Übersicht</a></div></section>
      ${wrong.length ? `<h2 class="lid-h2">Diese Fragen waren falsch oder offen</h2><div class="lid-review">${wrong.map(([q, a]) => `<section class="dm-card">${questionHTML(q, { chosen: a, reveal: true })}${warumHTML(q)}</section>`).join("")}</div>` : ""}${foot()}`,
      "lid-page",
    );
    $("#lid-new").onclick = startTest;
  }
  function startIntro() {
    const l = land();
    if (!l) {
      DM.page(
        `${head("Testsimulation", "Wie in der echten Prüfung: 33 Fragen (30 allgemeine + 3 zu deinem Bundesland), 60 Minuten.")}
        <section class="dm-card lid-land is-ask" id="lid-land"><h2>Wo wohnst du?</h2><p>Für den Test brauchen wir dein Bundesland. Wähle es bitte zuerst:</p>${landGrid()}</section>${foot()}`,
        "lid-page",
      );
      return bindLand(startIntro);
    }
    DM.page(
      `${head("Testsimulation", `Wie in der echten Prüfung: 33 Fragen (30 allgemeine + 3 zu ${e(l.name)}), 60 Minuten, ab 15 richtigen Antworten bestanden.`)}
      <section class="dm-card lid-intro"><ul><li>Die Fragen werden zufällig aus dem offiziellen Gesamtfragenkatalog des BAMF gezogen.</li><li>Die 3 Länderfragen sind für <b>${e(l.name)}</b>. <a href="#lid">Bundesland ändern</a></li><li>Die Uhr läuft ab dem Start. Nach 60 Minuten wird automatisch abgegeben.</li><li>Lösungen und Erklärungen siehst du erst am Ende.</li><li>Für die Einbürgerung brauchst du mindestens 17 richtige Antworten.</li></ul>
      <button type="button" class="dm-btn" id="lid-start">Test starten</button></section>${foot()}`,
      "lid-page",
    );
    $("#lid-start").onclick = startTest;
  }

  /* ---------- Helpers for the LiD exam simulation (simulation.js) ---------- */
  DM.lidLand = () => {
    try {
      return land();
    } catch {
      return null;
    }
  };
  DM.lidSetLand = (code) => {
    try {
      return setLand(code);
    } catch {
      return false;
    }
  };
  DM.lidLabel = (q) => nrLabel(q);
  DM.lidWarum = (q) => warum(q);
  DM.lidAllLand = () => allLand();
  DM.lidLandPicker = () => {
    try {
      const cur = landCode();
      return `<p class="dm-small lid-land-sim"><label for="lid-land-sel">Die 3 Länderfragen sind für:</label> <select id="lid-land-sel" onchange="DM.lidSetLand(this.value)">${cur ? "" : '<option value="">Bundesland wählen …</option>'}${Object.entries(
        laender(),
      )
        .map(
          ([c, l]) =>
            `<option value="${c}"${c === cur ? " selected" : ""}>${e(l.name)}</option>`,
        )
        .join(
          "",
        )}</select>${cur ? "" : " Ohne Auswahl nimmt der Test Nordrhein-Westfalen."}</p>`;
    } catch {
      return "";
    }
  };

  DM.routes ||= {};
  DM.routes.lid = (p) => {
    if (p[1] !== "test") clearInterval(timer);
    if (!p[1]) return hub();
    if (p[1] === "lernen") {
      const n = blockKey(p[2]);
      if (n === "land" && !land()) return hub();
      return learn(blockOf(n), `Lernen: ${blockName(n)}`, "#lid");
    }
    if (p[1] === "fehler") {
      const w = wrongList();
      return w.length ? learn(shuffle(w), "Fehler wiederholen", "#lid") : hub();
    }
    if (p[1] === "zufall")
      return learn(shuffle(pool()).slice(0, 10), "10 zufällige Fragen", "#lid");
    if (p[1] === "liste") return list(p[2]);
    if (p[1] === "test") return test && !test.done ? drawTest() : startIntro();
    hub();
  };
})();
