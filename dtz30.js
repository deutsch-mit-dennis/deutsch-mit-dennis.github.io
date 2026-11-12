/* DTZ in 30 Tagen (#dtz-30-tage): a fixed day-by-day plan that links the existing DTZ trainings,
   listening sets and the three model exams. Progress lives only on the device:
   DM.store.dtz30 = { start: "YYYY-MM-DD", done: { "1": timestamp, ... } } (saved with DM.save, part of the backup).
   To change the plan, edit DAYS below (task = [label, "#route" or "/path/", minutes]). */
(function () {
  "use strict";
  const DM = (window.DM = window.DM || {});

  // [title, tasks, tip]  – tasks: [label, href, minutes]
  const DAYS = [
    // Woche 1: die Prüfung kennenlernen
    ["Die Prüfung kennenlernen", [["Prüfungsinfos DTZ: Teile, Zeit, Ablauf", "#pruefungsinfo/dtz", 10], ["Video: So läuft die mündliche Prüfung", "#videos/pruefung/qL8vvlug8eQ", 15]], "Schreib dein Prüfungsdatum auf einen Zettel und häng ihn an den Kühlschrank."],
    ["Sich vorstellen", [["Sprechen Teil 1: Sich vorstellen", "#training/dtz-vorstellen", 20], ["Grammatik: und, aber, oder, denn", "#grammatik/a1-konnektoren", 10]], "Sprich laut – auch wenn du allein bist. Nimm dich mit dem Handy auf."],
    ["Hören: das Format", [["DTZ Hören · Übungssatz 1", "#hoeren/dtz-1", 25]], "Lies zuerst die Aufgabe. Dann weißt du, worauf du beim Hören achten musst."],
    ["Lesen im Alltag", [["Mitteilungen und Anzeigen verstehen", "#lesen/alltag", 20], ["DTZ-Lesetraining", "#training/dtz-lesen", 10]], "Du musst nicht jedes Wort verstehen. Such nur die Information für die Frage."],
    ["Der Brief: Aufbau", [["Video: Der DTZ-Brief – Aufbau und Mustersätze", "#videos/pruefung/3lsbv49Uy_U", 15], ["Vorbereitungspaket Schreiben", "/dtz-schreiben/", 15]], "Lerne Anrede, Einleitung und Gruß auswendig. Das gibt Sicherheit."],
    ["Ein Bild beschreiben", [["Bild-Trainer: 4 Bilder Schritt für Schritt", "#bild", 20], ["Sprechen Teil 2: Bild beschreiben", "#training/dtz-bild", 10]], "Erst sagen, was du siehst. Dann von dir erzählen: Das kenne ich auch …"],
    ["Wiederholen", [["Meine Fehler wiederholen", "#fehler", 15], ["Noch einmal: Sich vorstellen", "#training/dtz-vorstellen", 10]], "Eine Woche geschafft! Wiederholen ist genauso wichtig wie Neues lernen."],
    // Woche 2: gezielt üben + erste Probeprüfung
    ["Gemeinsam planen", [["Sprechen Teil 3: Gemeinsam planen", "#training/dtz-sprechen", 20], ["Grammatik: Modalverben", "#grammatik/a1-modalverben", 10]], "Reagiere auf deinen Partner: Gute Idee! / Das geht leider nicht, weil …"],
    ["Einen Brief schreiben", [["Schreiben: Brief mit vier Punkten", "#training/dtz-schreiben", 30]], "Hake jeden Punkt der Aufgabe ab. Ein fehlender Punkt kostet viel."],
    ["Probeprüfung 1: schriftlich", [["Modelltest 1 schriftlich – mit Uhr", "#simulation/dtz/schriftlich", 100]], "Mach die Probe wie echt: Handy weg, Uhr an, keine Pause."],
    ["Probeprüfung auswerten", [["Meine Fehler wiederholen", "#fehler", 15], ["Grammatik: Sätze mit dass und wenn", "#grammatik/a2-dass-wenn", 15]], "Schau nicht nur auf die Punkte. Wo hast du Zeit verloren?"],
    ["Hören vertiefen", [["DTZ Hören · Übungssatz 2", "#hoeren/dtz-2", 25]], "Achte auf Zahlen, Uhrzeiten und Tage – sie kommen oft in den Aufgaben vor."],
    ["Bild beschreiben und erzählen", [["Sprechen Teil 2: Bild beschreiben", "#training/dtz-bild", 20], ["Grammatik: war und hatte", "#grammatik/a2-praeteritum-war-hatte", 10]], "Erzähle eine kurze Geschichte aus deinem Leben – mit war und hatte."],
    ["Probeprüfung 1: mündlich", [["Modelltest 1 mündlich – mit Uhr", "#simulation/dtz/muendlich", 25]], "Übe am besten mit einer Partnerin oder einem Partner aus dem Kurs."],
    // Woche 3: sicherer werden + zweite Probeprüfung
    ["Zweiter Brief", [["Schreiben: neue Aufgabe („Andere Übung“)", "#training/dtz-schreiben", 30]], "Schreib in 30 Minuten. Plane 5 Minuten zum Kontrollieren ein."],
    ["Lesen mit Strategie", [["DTZ-Lesetraining", "#training/dtz-lesen", 20], ["Lesen im Alltag", "#lesen/alltag", 10]], "Unterstreiche in der Frage das wichtigste Wort. Such es dann im Text."],
    ["Höflich schreiben", [["Grammatik: Präpositionen mit Dativ und Akkusativ", "#grammatik/a2-praepositionen-dativ-akkusativ", 15], ["Grammatik: Könnten Sie …? (Konjunktiv II)", "#grammatik/b1-konjunktiv2", 15]], "„Könnten Sie mir bitte …“ klingt freundlich – das passt in jeden Brief."],
    ["Planen mit Argumenten", [["Sprechen Teil 3: Gemeinsam planen", "#training/dtz-sprechen", 20], ["Grammatik: Vergleichen", "#grammatik/a2-komparativ", 10]], "Vergleiche Vorschläge: Das ist billiger / schneller / besser für uns."],
    ["Hören: dritter Satz", [["DTZ Hören · Übungssatz 3", "#hoeren/dtz-3", 25]], "Hörst du ein Wort nicht? Weiter! Die nächste Aufgabe ist wichtiger."],
    ["Probeprüfung 2: schriftlich", [["Modelltest 2 schriftlich – mit Uhr", "#simulation/dtz-2/schriftlich", 100]], "Vergleiche mit Probe 1: Was ist schon besser?"],
    ["Auswerten und Pause", [["Meine Fehler wiederholen", "#fehler", 15]], "Heute nur 15 Minuten. Dein Kopf braucht auch Pausen."],
    // Woche 4: Feinschliff + Generalprobe
    ["Briefe mit echten Beispielen", [["Video: Briefe schreiben mit echten Beispielen", "#videos/pruefung/ey2Taffihac", 15], ["Schreiben: neue Aufgabe", "#training/dtz-schreiben", 30]], "Nutze deine Lieblingssätze aus den Musterbriefen."],
    ["Flüssig sprechen", [["Sich vorstellen", "#training/dtz-vorstellen", 10], ["Bild-Trainer", "#bild", 20]], "Langsam und klar ist besser als schnell und unsicher."],
    ["Probeprüfung 2: mündlich", [["Modelltest 2 mündlich – mit Uhr", "#simulation/dtz-2/muendlich", 25]], "Keine Angst vor Fehlern. Wichtig ist, dass du antwortest und reagierst."],
    ["Schwächen trainieren", [["Meine Fehler wiederholen", "#fehler", 15], ["DTZ-Lesetraining", "#training/dtz-lesen", 15]], "Welcher Teil ist am schwierigsten für dich? Übe heute nur diesen."],
    ["Kurzer Brief, sicher", [["Grammatik: Reflexive Verben", "#grammatik/a2-reflexive-verben", 15], ["Schreiben: neue Aufgabe", "#training/dtz-schreiben", 20]], "Ich freue mich auf … / Ich interessiere mich für … – gute Sätze für Briefe."],
    ["Planen und Satzbausteine", [["Sprechen Teil 3: Gemeinsam planen", "#training/dtz-sprechen", 20], ["Schreib-Bausteine", "#schreiben", 10]], "Sammle 5 Sätze, die du in jeder Prüfung benutzen kannst."],
    ["Generalprobe: schriftlich", [["Modelltest 3 schriftlich – mit Uhr", "#simulation/dtz-3/schriftlich", 100]], "Die letzte große Probe. Danach kommt nichts Neues mehr."],
    ["Generalprobe: mündlich", [["Modelltest 3 mündlich – mit Uhr", "#simulation/dtz-3/muendlich", 25], ["Meine Fehler wiederholen", "#fehler", 10]], "Morgen nur noch leicht wiederholen. Du bist bereit."],
    ["Bereit für die Prüfung", [["Prüfungsinfos DTZ: Ablauf noch einmal lesen", "#pruefungsinfo/dtz", 10], ["Noch einmal: Sich vorstellen", "#training/dtz-vorstellen", 10]], "Lies in deiner Einladung, was du mitbringen musst (zum Beispiel deinen Ausweis). Schlaf gut – viel Erfolg!"],
  ];
  const WEEKS = [["Woche 1", "Die Prüfung kennenlernen", 0, 7], ["Woche 2", "Gezielt üben und erste Probeprüfung", 7, 14], ["Woche 3", "Sicherer werden und zweite Probeprüfung", 14, 21], ["Woche 4", "Feinschliff und Generalprobe", 21, 30]];

  const esc = (s) => String(s ?? "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const today = () => { const d = new Date(); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`; };
  const st = () => {
    const s = (DM.store && (DM.store.dtz30 ||= { start: "", done: {} })) || { start: "", done: {} };
    s.done ||= {};
    return s;
  };
  const save = () => { try { DM.save && DM.save(); } catch {} };
  const doneCount = () => Object.keys(st().done).length;
  const nextDay = () => { for (let i = 1; i <= 30; i++) if (!st().done[i]) return i; return 0; };
  const calDay = () => { // day number by calendar (1 = start day)
    const s = st().start; if (!s) return 0;
    const n = Math.floor((Date.parse(today()) - Date.parse(s)) / 864e5) + 1;
    return Math.max(1, Math.min(30, n));
  };
  const mins = (d) => DAYS[d - 1][1].reduce((a, t) => a + t[2], 0);

  function dayCard(d, open) {
    const [title, tasks, tip] = DAYS[d - 1], done = !!st().done[d];
    return `<details class="d30-day${done ? " is-done" : ""}${open ? " is-today" : ""}" id="d30-tag-${d}"${open ? " open" : ""}>
      <summary><span class="d30-n" aria-hidden="true">${done ? "✓" : d}</span><span class="d30-t"><b>Tag ${d}: ${esc(title)}</b><small>ca. ${mins(d)} Minuten${done ? " · erledigt" : ""}</small></span></summary>
      <ul class="d30-tasks">${tasks.map(([l, h, m]) => `<li><a href="${esc(h)}">${esc(l)}</a> <span class="d30-min">${m} Min.</span></li>`).join("")}</ul>
      <p class="d30-tip"><span aria-hidden="true">💡</span> ${esc(tip)}</p>
      <label class="d30-check"><input type="checkbox" data-day="${d}"${done ? " checked" : ""}> Tag ${d} erledigt</label>
    </details>`;
  }

  function render() {
    const s = st(), n = doneCount(), next = nextDay(), cal = calDay();
    const head = `${DM.crumbs ? DM.crumbs([["Prüfung", "#pruefung/dtz"], ["DTZ in 30 Tagen"]]) : ""}
      <div class="dm-head"><h1>DTZ in 30 Tagen</h1>
      <p class="dm-lead">Dein Lernplan für den Deutsch-Test für Zuwanderer (A2–B1): jeden Tag 20 bis 40 Minuten, an sechs Tagen eine Probeprüfung mit Uhr. Alle Übungen sind kostenlos auf dieser Seite.</p></div>`;
    const status = !s.start
      ? `<div class="d30-start dm-card"><p><b>So geht's:</b> Starte heute mit Tag 1. Mach jeden Tag die Aufgaben und hake den Tag ab. Dein Fortschritt bleibt auf diesem Gerät.</p>
         <button type="button" class="btn d30-go">▶ Heute mit Tag 1 starten</button></div>`
      : `<div class="d30-status dm-card">
          <div class="dm-progress" role="progressbar" aria-valuemin="0" aria-valuemax="30" aria-valuenow="${n}" aria-label="Fortschritt"><i style="width:${Math.round((n / 30) * 100)}%"></i></div>
          <p>${n ? `<b>${n} von 30 Tagen</b> erledigt.` : "Noch kein Tag erledigt."} ${next ? `<a href="#dtz-30-tage" data-goto="${next}">Weiter mit Tag ${next} →</a>` : "<b>Alle 30 Tage geschafft – viel Erfolg in der Prüfung!</b>"}</p>
          ${next && cal > next + 1 ? `<p class="d30-late">Laut Kalender wärst du heute bei Tag ${cal}. Kein Problem – mach einfach dort weiter, wo du bist.</p>` : ""}
        </div>`;
    const weeks = WEEKS.map(([w, sub, a, b]) => `<section class="d30-week"><h2>${w}<small>${esc(sub)}</small></h2>
      ${Array.from({ length: b - a }, (_, i) => dayCard(a + i + 1, s.start && a + i + 1 === next)).join("")}</section>`).join("");
    const foot = `<div class="d30-foot">
        <button type="button" class="btn secondary d30-print">🖨 Plan ausdrucken</button>
        ${s.start ? '<button type="button" class="btn secondary d30-reset">Plan neu starten</button>' : ""}
      </div>
      <p class="d30-note">Die Übungen sind eigene Aufgaben im Stil der Prüfung – keine offiziellen Aufgaben von g.a.s.t. oder telc. Plan von Dennis, DTZ-Prüfer.</p>`;
    DM.page(head + status + weeks + foot, "d30-page");
    wire();
  }

  function wire() {
    const main = document.querySelector("main"); if (!main) return;
    main.querySelector(".d30-go")?.addEventListener("click", () => { st().start = today(); save(); render(); jump(1); });
    main.querySelector(".d30-print")?.addEventListener("click", () => { main.querySelectorAll(".d30-day").forEach((d) => (d.open = true)); window.print(); });
    main.querySelector(".d30-reset")?.addEventListener("click", () => {
      if (!confirm("Plan wirklich neu starten? Deine Häkchen werden gelöscht.")) return;
      DM.store.dtz30 = { start: "", done: {} }; save(); render();
    });
    main.querySelectorAll("[data-goto]").forEach((a) => a.addEventListener("click", (e) => { e.preventDefault(); jump(+a.dataset.goto); }));
    main.querySelectorAll("input[data-day]").forEach((cb) => cb.addEventListener("change", () => {
      const d = cb.dataset.day, s = st();
      if (cb.checked) { s.done[d] = Date.now(); if (!s.start) s.start = today(); } else delete s.done[d];
      save();
      if (cb.checked && DM.celebrate && doneCount() === 30) { try { DM.celebrate(); } catch {} }
      render(); if (cb.checked && nextDay()) jump(nextDay());
    }));
  }
  function jump(d) {
    const el = document.getElementById("d30-tag-" + d); if (!el) return;
    el.open = true; el.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  DM.routes = DM.routes || {};
  DM.routes["dtz-30-tage"] = render;
  DM.dtz30 = { DAYS };
})();
