/* B2 exam trainers (loaded on demand by lazy.js):
   #sprachbausteine[/<set id>]  – interactive gap texts for telc B2 and DTB B2 (data: sprachbausteine-data.js, DM.sbSets,
                                  same part format as sim/*.js: material[{h,t with {n}}], opts (word bank) or item.opts (a/b/c))
   #telc-b2-sprechen[/1|2|3]   – speaking practice for the telc B2 oral exam (data: telc-b2-sprechen-data.js, DM.telcB2Oral)
   Progress stays on this device: DM.store.sb = { "<set>|<part>": best percent }. Own tasks in exam style, no official tasks. */
(function () {
  const DM = window.DM,
    x = DM.esc;
  const $ = (s, r = document) => r.querySelector(s);
  const save = () => {
    try {
      DM.save && DM.save();
    } catch {}
  };
  const shuffle = (a) => {
    a = a.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };
  const nl = (s) => x(s).replace(/\n/g, "<br>");

  /* ---------------- Sprachbausteine ---------------- */
  const EXAMS = {
    "telc B2": {
      tab: "#pruefung/telcb2",
      time: "Empfehlung: ca. 20 Minuten für beide Teile (Lesen und Sprachbausteine haben zusammen 90 Minuten)",
    },
    "DTB B2": {
      tab: "#pruefung/dtbb2",
      time: "Die Sprachbausteine gehören zum Teil „Sprachbausteine und Schreiben“ – nicht länger als 10 Minuten.",
    },
  };
  const sbStore = () => (DM.store.sb ||= {});

  function sbOverview(filter) {
    const sets = DM.sbSets || [];
    const S = sbStore();
    const groups = Object.keys(EXAMS).filter(
      (e) => !filter || e.replace(" ", "").toLowerCase() === filter,
    );
    DM.page(`${DM.crumbs([["Niveau B2", "#niveau/B2"], ["Sprachbausteine"]])}
      <div class="dm-head"><p class="dm-kicker">Training B2 · telc Deutsch B2 und DTB B2</p><h1>Sprachbausteine üben</h1>
      <p class="dm-lead">Lückentexte wie in der Prüfung: Grammatik, Konnektoren, feste Verbindungen. Du siehst sofort, was richtig ist – mit Erklärung.</p></div>
      <div class="b2t-filter" role="group" aria-label="Prüfung wählen"><a class="b2t-chip" href="#sprachbausteine"${!filter ? ' aria-current="page"' : ""}>Alle</a><a class="b2t-chip" href="#sprachbausteine/telcb2"${filter === "telcb2" ? ' aria-current="page"' : ""}>telc B2</a><a class="b2t-chip" href="#sprachbausteine/dtbb2"${filter === "dtbb2" ? ' aria-current="page"' : ""}>DTB B2</a></div>
      ${groups
        .map(
          (g) =>
            `<section class="b2t-group" aria-labelledby="g-${x(g.replace(" ", ""))}"><h2 id="g-${x(g.replace(" ", ""))}">${x(g)}</h2><div class="b2t-sets">${sets
              .filter((s) => s.exam === g)
              .map((s) => {
                const res = s.parts
                  .map((p, i) => S[`${s.id}|${i}`])
                  .filter((v) => v >= 0);
                return `<a class="b2t-set" href="#sprachbausteine/${x(s.id)}"><b>${x(s.title)}</b><small>${s.parts.map((p) => `${x(p.title)}: ${p.items.length} Lücken`).join(" · ")}</small><span class="b2t-res">${res.length ? `Dein bestes Ergebnis: ${res.map((v) => v + " %").join(" · ")}` : "Noch nicht geübt"}</span></a>`;
              })
              .join("")}</div></section>`,
        )
        .join("")}
      <p class="dm-small">Eigene Übungsaufgaben im Stil der Prüfung, keine offiziellen Prüfungsaufgaben. Mehr Übung: <a href="#material/pruefung/B2">Arbeitsblätter B2 als PDF</a> · <a href="#spiele/b2">Lernspiele B2</a>.</p>`);
  }

  function sbSet(set, partIdx) {
    const S = sbStore();
    const part = set.parts[partIdx];
    const bank = Array.isArray(part.opts) && part.opts.length;
    const ex = EXAMS[set.exam] || {};
    const sel = (n, it) => {
      const opts = bank
        ? part.opts
        : (it.opts || []).map((o, i) => `${"abc"[i]}) ${o}`);
      return `<select class="b2t-gap" data-n="${n}" aria-label="Lücke ${n}"><option value="">${n} …</option>${opts.map((o, i) => `<option value="${i}">${x(o)}</option>`).join("")}</select>`;
    };
    const text = (t) =>
      nl(t).replace(/\{(\d+)\}/g, (m, n) => {
        const it = part.items[n - 1];
        return it
          ? `<span class="b2t-slot" data-slot="${n}">${sel(+n, it)}</span>`
          : m;
      });
    const idx = (DM.sbSets || []).indexOf(set),
      next = (DM.sbSets || [])[idx + 1];
    DM.page(`${DM.crumbs([["Niveau B2", "#niveau/B2"], ["Sprachbausteine", "#sprachbausteine"], [set.title]])}
      <div class="dm-head"><p class="dm-kicker">${x(set.exam)} · Sprachbausteine</p><h1>${x(set.title)}</h1>
      <p class="dm-lead">${x(part.instr)}</p></div>
      <nav class="b2t-tabs" aria-label="Teil wählen">${set.parts.map((p, i) => `<a href="#sprachbausteine/${x(set.id)}/${i + 1}"${i === partIdx ? ' aria-current="page"' : ""}>${x(p.title)}</a>`).join("")}</nav>
      <p class="b2t-time">⏱ ${x(ex.time || "")}</p>
      ${bank ? `<div class="b2t-bank" aria-label="Wörter zur Auswahl">${part.opts.map((o) => `<span>${x(o)}</span>`).join("")}</div>` : ""}
      ${part.material.map((m) => `<article class="b2t-text"><h2>${x(m.h)}</h2><p>${text(m.t)}</p></article>`).join("")}
      <div class="b2t-actions"><button type="button" class="b2w-btn b2w-k" id="b2t-check">Prüfen</button><button type="button" class="b2w-btn" id="b2t-reset">Neu anfangen</button></div>
      <div id="b2t-result" aria-live="polite"></div>
      <p class="b2t-more">${partIdx + 1 < set.parts.length ? `<a class="dm-btn" href="#sprachbausteine/${x(set.id)}/${partIdx + 2}">Weiter mit ${x(set.parts[partIdx + 1].title)} →</a>` : next ? `<a class="dm-btn" href="#sprachbausteine/${x(next.id)}">Nächster Übungssatz: ${x(next.title)} →</a>` : ""} <a href="#sprachbausteine">Alle Übungssätze</a> · <a href="${x(ex.tab || "#pruefung")}">Prüfungstraining ${x(set.exam)}</a></p>`);

    const gaps = [...document.querySelectorAll(".b2t-gap")];
    if (bank) {
      // a word in the bank fits only once: mark used words in the other gaps
      const sync = () => {
        const used = new Set(gaps.map((g) => g.value).filter(Boolean));
        gaps.forEach((g) =>
          [...g.options].forEach((o) => {
            if (o.value)
              o.textContent =
                (used.has(o.value) && g.value !== o.value ? "· " : "") +
                part.opts[o.value];
          }),
        );
      };
      gaps.forEach((g) => g.addEventListener("change", sync));
    }
    $("#b2t-check").onclick = () => {
      let ok = 0;
      const rows = part.items.map((it, i) => {
        const g = gaps.find((e) => +e.dataset.n === i + 1),
          v = g.value === "" ? null : +g.value,
          right = v === it.a;
        if (right) ok++;
        g.closest(".b2t-slot").className =
          "b2t-slot " + (right ? "is-ok" : "is-bad");
        const sol = bank ? part.opts[it.a] : `${"abc"[it.a]}) ${it.opts[it.a]}`;
        return `<li class="${right ? "is-ok" : "is-bad"}"><b>${i + 1}: ${right ? "✓" : "✗"} ${x(sol)}</b>${v === null ? " – keine Antwort" : right ? "" : ` – deine Antwort: ${x(bank ? part.opts[v] : `${"abc"[v]}) ${it.opts[v]}`)}`}<br><span>${x(it.why || "")}</span></li>`;
      });
      const pct = Math.round((ok / part.items.length) * 100),
        key = `${set.id}|${partIdx}`;
      if (!(S[key] >= pct)) {
        S[key] = pct;
        save();
      }
      $("#b2t-result").innerHTML =
        `<section class="b2t-res-box"><h2>${ok} von ${part.items.length} richtig (${pct} %)</h2><p>${pct >= 80 ? "Sehr gut – das ist Prüfungsniveau." : pct >= 60 ? "Gut. Lies die Erklärungen zu den Fehlern und mach den Teil morgen noch einmal." : "Lies zuerst die Erklärungen. Wiederhole dann den Teil – in der Prüfung brauchst du ca. 60 %."}</p><ol class="b2t-sol">${rows.join("")}</ol></section>`;
      if (pct >= 80 && DM.celebrate)
        try {
          DM.celebrate();
        } catch {}
      $("#b2t-result").scrollIntoView({ behavior: "smooth", block: "start" });
    };
    $("#b2t-reset").onclick = () => sbSet(set, partIdx);
  }

  DM.routes.sprachbausteine = (p) => {
    const sets = DM.sbSets || [];
    const set = sets.find((s) => s.id === p[1]);
    if (!set) return sbOverview(["telcb2", "dtbb2"].includes(p[1]) ? p[1] : "");
    const n = parseInt(p[2], 10);
    sbSet(set, n >= 1 && n <= set.parts.length ? n - 1 : 0);
  };

  /* ---------------- telc B2 Sprechen ---------------- */
  const PARTS = [
    ["1", "Präsentation", "Über Erfahrungen sprechen"],
    ["2", "Diskussion", "Meinungen austauschen"],
    ["3", "Gemeinsam planen", "Vorschläge machen und sich einigen"],
  ];
  const OS = { praes: null, disk: null, plan: null, pi: 0, notes: {} };
  const bag = {};
  const draw = (k, arr) => {
    if (!bag[k] || !bag[k].length) bag[k] = shuffle(arr.map((_, i) => i));
    return arr[bag[k].pop()];
  };
  let timerId = null;
  const fmt = (s) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
  const timer = (sec, label) =>
    `<div class="b2t-timer"><button type="button" class="b2w-btn" data-sec="${sec}">⏱ ${x(label)} (${fmt(sec)})</button><span class="b2t-clock" aria-live="polite"></span></div>`;
  const red = (groups) =>
    `<details class="b2t-red"><summary>Redemittel – so kannst du es sagen</summary>${groups.map(([h, l]) => `<h3>${x(h)}</h3><ul>${l.map((s) => `<li>${x(s)}</li>`).join("")}</ul>`).join("")}</details>`;
  const list = (l) =>
    `<ul class="b2t-points">${l.map((s) => `<li>${x(s)}</li>`).join("")}</ul>`;
  const checks = (l) =>
    `<section class="b2t-check"><h2>So prüfst du dich</h2>${l.map((s) => `<label class="check"><input type="checkbox"> ${x(s)}</label>`).join("")}</section>`;

  function oral(p) {
    const D = DM.telcB2Oral;
    if (!D) {
      DM.page(
        `<div class="dm-head"><h1>Sprechen telc B2</h1><p class="dm-lead">Die Aufgaben konnten nicht geladen werden. Bitte lade die Seite neu.</p></div>`,
      );
      return;
    }
    const n = ["1", "2", "3"].includes(p[1]) ? +p[1] : 1;
    const R = D.redemittel || {};
    let body = "";
    if (n === 1) {
      OS.praes ||= draw("praes", D.praes);
      const t = OS.praes;
      body = `<section class="b2t-panel"><h2>Deine Themen – wähle eines</h2>
        <fieldset class="b2t-choice"><legend class="dm-small">In der Prüfung bekommst du zwei Themen und wählst eins.</legend>
        ${[t.a, t.b].map((s, i) => `<label class="b2t-opt"><input type="radio" name="b2t-th" value="${i}"${i === OS.pi ? " checked" : ""}> <span>${x(s)}</span></label>`).join("")}</fieldset>
        <h3>Sprich über diese Punkte</h3>${list(t.points)}
        ${timer(90, "Sprechen starten")}
        <p class="dm-small">Höchstens etwa anderthalb Minuten zusammenhängend sprechen. Danach stellt dir deine Partnerin oder dein Partner Fragen – dann tauscht ihr die Rollen.</p>
        <details class="b2t-q"><summary>Fragen danach (zum Üben einzeln aufdecken)</summary><ol>${t.questions.map((q) => `<li>${x(q)}</li>`).join("")}</ol></details>
        </section>${red(R.praes || [])}`;
    } else if (n === 2) {
      OS.disk ||= draw("disk", D.disk);
      const t = OS.disk;
      body = `<section class="b2t-panel"><h2>Zeitungsmeldung</h2><article class="b2t-text"><h3>${x(t.h)}</h3><p>${nl(t.t)}</p></article>
        <p>Diskutiert zu zweit: Sag deine Meinung, begründe sie mit Beispielen und geh auf die Argumente der anderen Person ein. Fasst am Ende zusammen, wo ihr euch einig seid.</p>
        ${timer(300, "Diskussion starten")}
        <details class="b2t-q"><summary>Ideen, wenn dir nichts einfällt</summary><div class="b2t-two"><div><h3>Dafür</h3>${list(t.pro)}</div><div><h3>Dagegen</h3>${list(t.contra)}</div></div></details>
        <details class="b2t-q"><summary>Fragen der Partnerin oder des Prüfers</summary><ol>${t.questions.map((q) => `<li>${x(q)}</li>`).join("")}</ol></details>
        </section>${red(R.disk || [])}`;
    } else {
      OS.plan ||= draw("plan", D.plan);
      const t = OS.plan;
      body = `<section class="b2t-panel"><h2>${x(t.title)}</h2><p>${x(t.task)}</p><h3>Plant gemeinsam</h3>${list(t.points)}
        ${timer(300, "Planung starten")}
        <h3>Üben ohne Partner</h3><p class="dm-small">Tippe auf „Partner sagt …“ und reagiere laut: zustimmen, widersprechen oder eine andere Idee vorschlagen.</p>
        <div class="b2t-partner"><button type="button" class="b2w-btn" id="b2t-say">💬 Partner sagt …</button><p id="b2t-line" class="b2t-line" aria-live="polite"></p></div>
        </section>${red(R.plan || [])}`;
    }
    const CHECK = {
      1: [
        "Ich habe ein Thema gewählt und am Anfang gesagt, worüber ich spreche.",
        "Ich habe alle Punkte angesprochen.",
        "Ich habe ein eigenes Beispiel oder Erlebnis erzählt.",
        "Ich habe frei gesprochen, nicht abgelesen.",
        "Ich habe die Fragen danach ausführlich beantwortet.",
      ],
      2: [
        "Ich habe meine Meinung klar gesagt und begründet.",
        "Ich habe auf die Argumente der anderen Person reagiert.",
        "Ich habe nachgefragt, wenn etwas unklar war.",
        "Ich habe Konnektoren benutzt (weil, obwohl, deshalb, einerseits … andererseits).",
        "Am Ende haben wir zusammengefasst.",
      ],
      3: [
        "Ich habe selbst Vorschläge gemacht.",
        "Ich habe auf Vorschläge reagiert – mit Gründen.",
        "Wir haben alle Punkte besprochen.",
        "Wir haben die Aufgaben verteilt.",
        "Am Ende stand ein gemeinsamer Plan.",
      ],
    }[n];
    DM.page(`${DM.crumbs([["Niveau B2", "#niveau/B2"], ["telc B2", "#pruefung/telcb2"], ["Sprechen"]])}
      <div class="dm-head"><p class="dm-kicker">telc Deutsch B2 · Mündliche Prüfung</p><h1>Sprechen üben: ${x(PARTS[n - 1][1])}</h1>
      <p class="dm-lead">Teil ${n}: ${x(PARTS[n - 1][2])}. Die Prüfung dauert zu zweit ca. 15 Minuten, vorher hast du 20 Minuten Vorbereitung.</p></div>
      <nav class="b2t-tabs" aria-label="Teil wählen">${PARTS.map(([k, t]) => `<a href="#telc-b2-sprechen/${k}"${+k === n ? ' aria-current="page"' : ""}>${k}. ${x(t)}</a>`).join("")}</nav>
      <div class="b2t-actions"><button type="button" class="b2w-btn" id="b2t-new">↻ Neue Aufgabe</button></div>
      ${body}
      <label class="b2t-notes">Deine Stichwörter (bleiben nur in dieser Sitzung)<textarea id="b2t-notes" rows="4" placeholder="Notiere Stichwörter wie in der Vorbereitung – nicht ganze Sätze.">${x(OS.notes[n] || "")}</textarea></label>
      ${DM.speechCoach ? DM.speechCoach() : ""}
      ${checks(CHECK)}
      <p class="dm-small">Eigene Übungsaufgaben im Stil der Prüfung, keine offiziellen Prüfungsaufgaben. Bewertet werden u. a. Aufgabenerfüllung, Flüssigkeit, Wortschatz und Grammatik. <a href="#vorbereitung/telc-b2">Aufbau und Strategien</a> · <a href="#simulation/telc-b2">Probeprüfung</a></p>`);
    DM.bindSpeechCoach && DM.bindSpeechCoach();
    $("#b2t-new").onclick = () => {
      OS[["praes", "disk", "plan"][n - 1]] = null;
      OS.notes[n] = "";
      OS.pi = 0;
      oral(p);
      $("#b2t-new")?.focus({ preventScroll: true });
    };
    $("#b2t-notes").oninput = (e) => {
      OS.notes[n] = e.target.value;
    };
    document.querySelectorAll('input[name="b2t-th"]').forEach(
      (r) =>
        (r.onchange = () => {
          OS.pi = +r.value;
        }),
    );
    const say = $("#b2t-say");
    if (say)
      say.onclick = () => {
        const l = draw("pl" + D.plan.indexOf(OS.plan), OS.plan.partner);
        $("#b2t-line").textContent = "„" + l + "“";
      };
    clearInterval(timerId);
    document.querySelectorAll(".b2t-timer button").forEach(
      (b) =>
        (b.onclick = () => {
          clearInterval(timerId);
          let s = +b.dataset.sec;
          const c = b.parentElement.querySelector(".b2t-clock");
          c.textContent = fmt(s);
          timerId = setInterval(() => {
            s--;
            if (!document.body.contains(c)) return clearInterval(timerId);
            c.textContent = s > 0 ? fmt(s) : "Zeit ist um!";
            if (s <= 0) clearInterval(timerId);
          }, 1000);
        }),
    );
  }
  DM.routes["telc-b2-sprechen"] = oral;
})();
