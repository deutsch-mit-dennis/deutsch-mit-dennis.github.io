/* Endungs-Blitz – schnelles Spiel zu Adjektivendungen (-e, -en, -er, -es, -em). 60 Sekunden, 3 Leben, Combo ab 3 richtigen. */
(() => {
  if (!window.DMGame) return;
  const SECONDS = 60,
    LIVES = 3,
    OK_MS = 1100,
    BAD_MS = 2100;
  const SAY = []; // no speech needed in this game
  const ENDS = ["e", "en", "er", "es", "em"];
  const KEYS = { e: "e", n: "en", r: "er", s: "es", m: "em" };

  if (!document.getElementById("sp-endungen-css"))
    document.head.insertAdjacentHTML(
      "beforeend",
      `<style id="sp-endungen-css">
.sp-endungen-card{text-align:center;padding:2px 0 6px}
.sp-endungen-chip{display:inline-block;max-width:100%;font-weight:800;font-size:15px;border-radius:99px;padding:4px 12px;margin:0 0 10px;border:2px solid currentColor;background:#fff;overflow-wrap:anywhere}
.sp-endungen-chip.g-m,.sp-endungen-art.g-m{color:#2463c7}.sp-endungen-chip.g-f,.sp-endungen-art.g-f{color:#c2362b}.sp-endungen-chip.g-n,.sp-endungen-art.g-n{color:#1d7a45}.sp-endungen-chip.g-pl,.sp-endungen-art.g-pl{color:#7a3db8}
.sp-endungen-chip.g-m{background:#eaf1fc}.sp-endungen-chip.g-f{background:#fdecec}.sp-endungen-chip.g-n{background:#e8f5ec}.sp-endungen-chip.g-pl{background:#f3ecfa}
.sp-endungen-sent{font:700 clamp(20px,5.4vw,27px)/1.5 var(--dm-font);color:var(--dm-ink);margin:6px 0 18px;overflow-wrap:break-word;hyphens:auto;-webkit-hyphens:auto}
.sp-endungen-art{font-weight:800}
.sp-endungen-adj{white-space:nowrap}
.sp-endungen-gap{display:inline-block;min-width:1.6em;border-bottom:3px solid #c5cdf0;color:transparent;line-height:1.1}
.sp-endungen-gap.is-filled{color:#1f7a45;border-color:#1f9d55}
.sp-endungen-gap.is-bad{color:#c62828;border-color:#c62828}
.sp-endungen-opts{grid-template-columns:repeat(5,minmax(0,1fr));gap:8px}
.sp-endungen-opts .ch-opt{justify-content:center!important;text-align:center;font-size:20px;font-weight:800;min-height:60px;min-width:44px;padding:8px 2px}
.sp-endungen-opts .ch-opt kbd{position:absolute;top:4px;left:5px;font-size:11px;padding:0 4px}
@media (max-width:420px){.sp-endungen-opts{gap:6px}.sp-endungen-opts .ch-opt{font-size:18px;min-height:56px}.sp-endungen-opts .ch-opt kbd{display:none}}
.sp-endungen-combo{min-height:26px;text-align:center;font-weight:800;color:#c2410c;font-size:16px;margin:10px 0 0}
.sp-endungen-combo b{display:inline-block;background:#fff1d0;border-radius:99px;padding:2px 12px}
.sp-endungen-go{text-align:center;font-size:clamp(48px,14vw,72px);font-weight:800;color:var(--dm-tinte);margin:30px 0}
.sp-play.sp-endungen .ch-feedback span{display:block;margin-top:4px}
</style>`,
    );

  /* Endungstabelle (zur Kontrolle der Daten): Typ b = bestimmter Artikel (der/dieser), u = ein, k = kein/Possessiv, o = ohne Artikel */
  const TABLE = {
    b: {
      N: { m: "e", f: "e", n: "e", pl: "en" },
      A: { m: "en", f: "e", n: "e", pl: "en" },
      D: { m: "en", f: "en", n: "en", pl: "en" },
    },
    u: {
      N: { m: "er", f: "e", n: "es", pl: null },
      A: { m: "en", f: "e", n: "es", pl: null },
      D: { m: "en", f: "en", n: "en", pl: null },
    },
    k: {
      N: { m: "er", f: "e", n: "es", pl: "en" },
      A: { m: "en", f: "e", n: "es", pl: "en" },
      D: { m: "en", f: "en", n: "en", pl: "en" },
    },
    o: {
      N: { m: "er", f: "e", n: "es", pl: "e" },
      A: { m: "en", f: "e", n: "es", pl: "e" },
      D: { m: "em", f: "er", n: "em", pl: "en" },
    },
  };
  const SIGNAL = {
    N: { m: "der", f: "die", n: "das", pl: "die" },
    A: { m: "den", f: "die", n: "das", pl: "die" },
    D: { m: "dem", f: "der", n: "dem", pl: "den" },
  };
  const KASUS = { N: "Nominativ", A: "Akkusativ", D: "Dativ" };
  const GENUS = { m: "maskulin", f: "feminin", n: "neutral", pl: "Plural" };
  const SHORT = {
    beim: "bei dem",
    zum: "zu dem",
    zur: "zu der",
    im: "in dem",
    am: "an dem",
    vom: "von dem",
  };

  /* Daten: [Satz mit Adjektivstamm + __, richtige Endung, Genus m/f/n/pl, Artikeltyp b/u/k/o, Nomen (Grundform)] */
  const NOM = [
    ["Der neu__ Kollege kommt aus Polen.", "e", "m", "b", "der Kollege"],
    ["Die klein__ Wohnung ist sehr hell.", "e", "f", "b", "die Wohnung"],
    ["Das alt__ Auto ist leider kaputt.", "e", "n", "b", "das Auto"],
    ["Die neu__ Nachbarn sind sehr nett.", "en", "pl", "b", "die Nachbarn"],
    ["Dieser schwarz__ Mantel kostet 80 Euro.", "e", "m", "b", "der Mantel"],
    ["Das frisch__ Brot schmeckt sehr gut.", "e", "n", "b", "das Brot"],
    ["Die freundlich__ Ärztin hat mir geholfen.", "e", "f", "b", "die Ärztin"],
    ["Die billig__ Schuhe sind schon kaputt.", "en", "pl", "b", "die Schuhe"],
    [
      "Der nett__ Busfahrer hat auf mich gewartet.",
      "e",
      "m",
      "b",
      "der Busfahrer",
    ],
    ["Die neu__ Lehrerin heißt Frau Weber.", "e", "f", "b", "die Lehrerin"],
    ["Das groß__ Zimmer ist für die Kinder.", "e", "n", "b", "das Zimmer"],
    ["Mein alt__ Computer ist sehr langsam.", "er", "m", "k", "der Computer"],
    [
      "Ein neu__ Supermarkt öffnet am Montag.",
      "er",
      "m",
      "u",
      "der Supermarkt",
    ],
    ["Das ist ein gut__ Angebot.", "es", "n", "u", "das Angebot"],
    ["Das ist eine schön__ Idee.", "e", "f", "u", "die Idee"],
    [
      "Meine klein__ Tochter geht in den Kindergarten.",
      "e",
      "f",
      "k",
      "die Tochter",
    ],
    [
      "Unser neu__ Kühlschrank ist sehr leise.",
      "er",
      "m",
      "k",
      "der Kühlschrank",
    ],
    ["Dein rot__ Kleid ist wirklich schön.", "es", "n", "k", "das Kleid"],
    ["Hier ist leider kein frei__ Platz.", "er", "m", "k", "der Platz"],
    ["Meine best__ Freunde wohnen in Berlin.", "en", "pl", "k", "die Freunde"],
    ["Ihr nächst__ Termin ist am Dienstag.", "er", "m", "k", "der Termin"],
    ["Das ist kein gut__ Zeichen.", "es", "n", "k", "das Zeichen"],
    ["Ein krank__ Kind braucht viel Ruhe.", "es", "n", "u", "das Kind"],
    ["Frisch__ Obst ist gesund.", "es", "n", "o", "das Obst"],
    ["Kalt__ Wasser ist hier kostenlos.", "es", "n", "o", "das Wasser"],
    ["Heiß__ Kaffee macht mich morgens wach.", "er", "m", "o", "der Kaffee"],
    ["Frisch__ Milch steht im Kühlschrank.", "e", "f", "o", "die Milch"],
    [
      "Neu__ Mitarbeiter bekommen eine Einführung.",
      "e",
      "pl",
      "o",
      "die Mitarbeiter",
    ],
    [
      "Gut__ Deutschkenntnisse sind wichtig für den Beruf.",
      "e",
      "pl",
      "o",
      "die Deutschkenntnisse",
    ],
    ["Grün__ Tee ist sehr gesund.", "er", "m", "o", "der Tee"],
    ["Warm__ Suppe tut gut, wenn man krank ist.", "e", "f", "o", "die Suppe"],
    ["Klein__ Kinder brauchen viel Schlaf.", "e", "pl", "o", "die Kinder"],
  ];
  const AKK = [
    ["Ich kaufe einen neu__ Tisch.", "en", "m", "u", "der Tisch"],
    ["Wir suchen eine günstig__ Wohnung.", "e", "f", "u", "die Wohnung"],
    ["Er hat ein neu__ Handy.", "es", "n", "u", "das Handy"],
    ["Ich brauche einen neu__ Termin.", "en", "m", "u", "der Termin"],
    ["Hast du keine warm__ Jacke?", "e", "f", "k", "die Jacke"],
    [
      "Ich finde meinen alt__ Schlüssel nicht.",
      "en",
      "m",
      "k",
      "der Schlüssel",
    ],
    ["Sie hat ihre neu__ Brille vergessen.", "e", "f", "k", "die Brille"],
    ["Wir haben keine klein__ Kinder.", "en", "pl", "k", "die Kinder"],
    ["Ich nehme den rot__ Pullover.", "en", "m", "b", "der Pullover"],
    ["Kennst du die neu__ Nachbarin?", "e", "f", "b", "die Nachbarin"],
    ["Ich lese gerade das neu__ Buch.", "e", "n", "b", "das Buch"],
    [
      "Wir besuchen am Sonntag die alt__ Großeltern.",
      "en",
      "pl",
      "b",
      "die Großeltern",
    ],
    ["Siehst du den groß__ Hund dort?", "en", "m", "b", "der Hund"],
    ["Ich möchte diesen blau__ Rock anprobieren.", "en", "m", "b", "der Rock"],
    [
      "Bitte füllen Sie das ganz__ Formular aus.",
      "e",
      "n",
      "b",
      "das Formular",
    ],
    [
      "Ich mag die frisch__ Brötchen vom Bäcker.",
      "en",
      "pl",
      "b",
      "die Brötchen",
    ],
    ["Er repariert das kaputt__ Fahrrad.", "e", "n", "b", "das Fahrrad"],
    ["Kennen Sie den neu__ Chef schon?", "en", "m", "b", "der Chef"],
    ["Ich nehme die klein__ Tasche.", "e", "f", "b", "die Tasche"],
    ["Ich suche einen gut__ Zahnarzt.", "en", "m", "u", "der Zahnarzt"],
    ["Haben Sie einen klein__ Moment Zeit?", "en", "m", "u", "der Moment"],
    ["Ich hätte gern ein groß__ Bier.", "es", "n", "u", "das Bier"],
    ["Sie trägt heute ein schön__ Kleid.", "es", "n", "u", "das Kleid"],
    ["Wir haben ein neu__ Auto gekauft.", "es", "n", "u", "das Auto"],
    ["Ich habe einen schlimm__ Husten.", "en", "m", "u", "der Husten"],
    ["Wir mieten eine möbliert__ Wohnung.", "e", "f", "u", "die Wohnung"],
    ["Ich trinke gern schwarz__ Kaffee.", "en", "m", "o", "der Kaffee"],
    ["Wir kaufen frisch__ Gemüse auf dem Markt.", "es", "n", "o", "das Gemüse"],
    ["Sie trinkt am liebsten kalt__ Milch.", "e", "f", "o", "die Milch"],
    ["Ich esse gern italienisch__ Pizza.", "e", "f", "o", "die Pizza"],
    [
      "Die Firma sucht erfahren__ Mitarbeiter.",
      "e",
      "pl",
      "o",
      "die Mitarbeiter",
    ],
    ["Ich brauche gut__ Schuhe für die Arbeit.", "e", "pl", "o", "die Schuhe"],
    ["Kinder haben im Museum frei__ Eintritt.", "en", "m", "o", "der Eintritt"],
  ];
  const DAT = [
    ["Ich fahre mit dem neu__ Bus zur Arbeit.", "en", "m", "b", "der Bus"],
    ["Sie spricht mit der neu__ Lehrerin.", "en", "f", "b", "die Lehrerin"],
    ["Ich helfe dem alt__ Nachbarn.", "en", "m", "b", "der Nachbar"],
    [
      "Wir gehen mit den klein__ Kindern in den Park.",
      "en",
      "pl",
      "b",
      "die Kinder",
    ],
    ["Wir treffen uns in dem neu__ Café am Markt.", "en", "n", "b", "das Café"],
    ["Das Handy gehört dem jung__ Mann.", "en", "m", "b", "der Mann"],
    [
      "Nach dem lang__ Arbeitstag bin ich müde.",
      "en",
      "m",
      "b",
      "der Arbeitstag",
    ],
    ["Er kauft Brötchen beim nett__ Bäcker.", "en", "m", "b", "der Bäcker"],
    ["Morgen gehe ich zum neu__ Zahnarzt.", "en", "m", "b", "der Zahnarzt"],
    ["Wir treffen uns in der groß__ Pause.", "en", "f", "b", "die Pause"],
    ["Ich komme mit dem früh__ Zug.", "en", "m", "b", "der Zug"],
    ["Seit dem letzt__ Jahr lerne ich Deutsch.", "en", "n", "b", "das Jahr"],
    ["Wir wohnen in einer klein__ Wohnung.", "en", "f", "u", "die Wohnung"],
    [
      "Ich arbeite in einem groß__ Krankenhaus.",
      "en",
      "n",
      "u",
      "das Krankenhaus",
    ],
    ["Sie kommt aus einem klein__ Dorf.", "en", "n", "u", "das Dorf"],
    ["Er wartet seit einer halb__ Stunde.", "en", "f", "u", "die Stunde"],
    ["Ich wohne in einem ruhig__ Viertel.", "en", "n", "u", "das Viertel"],
    ["Er spielt mit seinem klein__ Sohn.", "en", "m", "k", "der Sohn"],
    [
      "Das Geschenk ist von meiner alt__ Freundin.",
      "en",
      "f",
      "k",
      "die Freundin",
    ],
    [
      "Er telefoniert mit seinen deutsch__ Kollegen.",
      "en",
      "pl",
      "k",
      "die Kollegen",
    ],
    [
      "Ich gratuliere meiner klein__ Schwester.",
      "en",
      "f",
      "k",
      "die Schwester",
    ],
    [
      "Ich bin zufrieden mit meiner neu__ Arbeit.",
      "en",
      "f",
      "k",
      "die Arbeit",
    ],
    [
      "Wir fahren mit unserem alt__ Auto in den Urlaub.",
      "en",
      "n",
      "k",
      "das Auto",
    ],
    ["Ich trinke Tee mit warm__ Milch.", "er", "f", "o", "die Milch"],
    ["Ich wasche die Hände mit warm__ Wasser.", "em", "n", "o", "das Wasser"],
    ["Ich esse Brot mit frisch__ Käse.", "em", "m", "o", "der Käse"],
    ["Er kommt immer mit gut__ Laune zur Arbeit.", "er", "f", "o", "die Laune"],
    [
      "Wir suchen eine Wohnung mit groß__ Balkon.",
      "em",
      "m",
      "o",
      "der Balkon",
    ],
    ["Ein Zimmer mit eigen__ Bad kostet mehr.", "em", "n", "o", "das Bad"],
    ["Ich arbeite gern mit nett__ Menschen.", "en", "pl", "o", "die Menschen"],
    [
      "Die Firma sucht Leute mit gut__ Deutschkenntnissen.",
      "en",
      "pl",
      "o",
      "die Deutschkenntnisse",
    ],
    [
      "Nach kurz__ Zeit hat er eine Stelle gefunden.",
      "er",
      "f",
      "o",
      "die Zeit",
    ],
    [
      "Bei schlecht__ Wetter bleiben wir zu Hause.",
      "em",
      "n",
      "o",
      "das Wetter",
    ],
    ["Ich esse Nudeln mit rot__ Soße.", "er", "f", "o", "die Soße"],
    ["Mit freundlich__ Grüßen, Anna Schmidt", "en", "pl", "o", "die Grüße"],
    [
      "Ich habe Ihre Anzeige mit groß__ Interesse gelesen.",
      "em",
      "n",
      "o",
      "das Interesse",
    ],
  ];

  // split a sentence into: text before the article word, article word, text between, stem, text after the gap
  const parse = (s) => {
    const m = s.match(/^(.*?)(\S*?)__(.*)$/);
    if (!m) return null;
    const before = m[1],
      stem = m[2],
      after = m[3];
    const w = before.match(/(\S+)\s+$/);
    return {
      before,
      stem,
      after,
      artWord: w ? w[1] : "",
      pre: w ? before.slice(0, before.length - w[0].length) : before,
      gapAfterArt: w ? w[0].slice(w[1].length) : "",
    };
  };
  const artLabel = (w) => {
    const l = w === "Ihr" || w === "Ihre" ? w : w.toLowerCase();
    return SHORT[l] ? `${l} (= ${SHORT[l]})` : l;
  };
  const typeName = (t, art) =>
    t === "b"
      ? /^dies/.test(art)
        ? "dieser (wie der/die/das)"
        : "bestimmter Artikel"
      : t === "u"
        ? "unbestimmter Artikel"
        : /^kein/.test(art)
          ? "kein (wie ein)"
          : "Possessivartikel (wie ein)";

  // build one item; the tip is generated from the grammar table, the stored ending must agree with it
  function make(kasus, [sent, end, g, t, noun]) {
    const p = parse(sent),
      exp = TABLE[t]?.[kasus]?.[g];
    if (!p || exp == null || exp !== end || !ENDS.includes(end)) {
      console.warn("endungen: check data", sent);
      return null;
    }
    const art = artLabel(p.artWord);
    const tip =
      t === "o"
        ? `ohne Artikel → ${KASUS[kasus]} ${GENUS[g]}: Adjektiv zeigt den Kasus → -${end} (wie „${SIGNAL[kasus][g]}“)`
        : `${art} → ${KASUS[kasus]} ${GENUS[g]}: ${typeName(t, art)} → -${end}`;
    return {
      sent,
      stem: p.stem,
      end,
      tip,
      noun,
      g,
      t,
      kasus,
      p,
      correct: sent.replace("__", end),
    };
  }
  const build = (kasus, rows) =>
    rows.map((r) => make(kasus, r)).filter(Boolean);
  const SETS = { N: build("N", NOM), A: build("A", AKK), D: build("D", DAT) };
  const poolFor = (opt) =>
    opt === "dat"
      ? SETS.D
      : opt === "mix"
        ? [...SETS.N, ...SETS.A, ...SETS.D]
        : [...SETS.N, ...SETS.A];

  DMGame.register({
    id: "endungen",
    title: "Endungs-Blitz",
    icon: "🎯",
    level: "A2–B1",
    cat: "basis",
    desc: "Adjektivendungen im Eiltempo: -e, -en, -er, -es oder -em? 60 Sekunden.",
    intro:
      "Ein Satz, eine Lücke: Tippe die richtige Adjektivendung. Die Farbe zeigt das Nomen: der = blau, die = rot, das = grün, Plural = lila. Du hast 60 Sekunden und 3 Leben. Drei richtige Antworten hintereinander geben doppelte Punkte.",
    optionsLabel: "Was möchtest du üben?",
    options: [
      { id: "nom", label: "Nominativ + Akkusativ" },
      { id: "dat", label: "Mit Dativ" },
      { id: "mix", label: "Alles gemischt" },
    ],
    start(api, opt) {
      const esc = api.esc,
        pool = poolFor(opt),
        wrong = [];
      let order = api.shuffle(pool),
        i = 0,
        score = 0,
        streak = 0,
        lives = LIVES,
        over = false,
        busy = false,
        wait = null,
        clock = null,
        cur = null,
        shown = 0;
      const live = () => api.el.isConnected;

      const onKey = (e) => {
        if (!live()) {
          document.removeEventListener("keydown", onKey);
          return;
        }
        if (e.altKey || e.ctrlKey || e.metaKey || !cur || busy || over) return;
        const tag = document.activeElement?.tagName;
        if (tag === "INPUT" || tag === "TEXTAREA") return;
        // 1–4 are handled by spiele.js (.ch-opt[data-k]); 5 and the letters here
        const k =
          e.key === "5"
            ? 4
            : KEYS[e.key.toLowerCase()]
              ? ENDS.indexOf(KEYS[e.key.toLowerCase()])
              : -1;
        if (k < 0) return;
        const b = api.el.querySelector(`.ch-opt[data-k="${k}"]`);
        if (b && !b.disabled) {
          e.preventDefault();
          b.click();
        }
      };
      document.addEventListener("keydown", onKey);

      function end() {
        if (over) return;
        over = true;
        clearTimeout(wait);
        clock?.stop();
        document.removeEventListener("keydown", onKey);
        if (live())
          api.finish({
            score,
            max: 0,
            wrong: wrong.map(({ correct, tip }) => ({ correct, tip })),
          });
      }

      const sentHtml = (it, state) => {
        const p = it.p,
          gapCls =
            state === "ok" ? " is-filled" : state === "bad" ? " is-bad" : "";
        const art =
          it.t !== "o" && p.artWord
            ? `${esc(p.pre)}<span class="sp-endungen-art g-${it.g}">${esc(p.artWord)}</span>${esc(p.gapAfterArt)}`
            : esc(p.before);
        return `${art}<span class="sp-endungen-adj">${esc(p.stem)}<span class="sp-endungen-gap${gapCls}">${state ? esc(it.end) : "__"}</span></span>${esc(p.after)}`;
      };

      function show() {
        if (over || !live()) return;
        busy = false;
        api.clearFeedback();
        if (i >= order.length) {
          i = 0;
          order = api.shuffle(pool);
        }
        const it = (cur = order[i++]);
        shown++;
        api.el.innerHTML = `<div class="sp-endungen-card">
            <p class="sp-endungen-chip g-${it.g}">${esc(it.noun)}${it.g === "pl" ? " (Plural)" : ""} · ${KASUS[it.kasus]}</p>
            <p class="sp-endungen-sent" lang="de">${sentHtml(it)}</p>
          </div>
          <div class="ch-opts sp-endungen-opts" role="group" aria-label="Endung wählen">
            ${ENDS.map((o, k) => `<button type="button" class="ch-opt" data-k="${k}" aria-label="Endung -${o}"><kbd>${k + 1}</kbd>-${o}</button>`).join("")}
          </div>
          <p class="sp-endungen-combo" aria-live="polite">${streak >= 3 ? `<b>🔥 Combo ×2 · ${streak} richtig in Folge</b>` : streak > 0 ? `${streak} richtig in Folge` : ""}</p>
          <p class="ch-keys dm-small">Tastatur: 1–5 oder e · n · r · s · m</p>`;
        api.el
          .querySelectorAll(".ch-opt")
          .forEach((b) => (b.onclick = () => answer(it, b)));
        api.hud({ step: `Satz ${shown}` });
      }

      function answer(it, b) {
        if (busy || over || it !== cur) return;
        busy = true;
        const pick = ENDS[+b.dataset.k],
          ok = pick === it.end;
        api.el.querySelectorAll(".ch-opt").forEach((x) => {
          x.disabled = true;
          if (ENDS[+x.dataset.k] === it.end) x.classList.add("is-right");
        });
        if (ok) {
          streak++;
          score += streak >= 3 ? 2 : 1;
        } else {
          streak = 0;
          lives--;
          b.classList.add("is-wrong");
          if (!wrong.some((w) => w.correct === it.correct))
            wrong.push({ correct: it.correct, tip: it.tip });
        }
        api.el.querySelector(".sp-endungen-sent").innerHTML = sentHtml(
          it,
          ok ? "ok" : "bad",
        );
        const combo = api.el.querySelector(".sp-endungen-combo");
        if (combo)
          combo.innerHTML =
            streak >= 3
              ? `<b>🔥 Combo ×2 · ${streak} richtig in Folge</b>`
              : streak > 0
                ? `${streak} richtig in Folge`
                : "";
        api.hud({ score, lives, maxLives: LIVES });
        api.feedback(
          ok,
          ok
            ? `<b>Richtig!${streak >= 3 ? " 🔥 doppelte Punkte" : ""}</b><span>${esc(it.tip)}</span>`
            : `<b>Richtig ist: ${esc(it.stem + it.end)}</b><span>${esc(it.tip)}</span>`,
        );
        if (lives <= 0) {
          clock?.stop();
          wait = setTimeout(end, BAD_MS);
          return;
        }
        wait = setTimeout(show, ok ? OK_MS : BAD_MS);
      }

      // short countdown, then the clock starts
      api.hud({ score: 0, lives, maxLives: LIVES, time: SECONDS, progress: 0 });
      let c = 3;
      const tick = () => {
        if (!live()) return;
        if (c > 0) {
          api.el.innerHTML = `<p class="sp-endungen-go" aria-live="assertive">${c}</p>`;
          c--;
          wait = setTimeout(tick, 600);
          return;
        }
        clock = api.timer(
          SECONDS,
          (r) => api.hud({ time: r, progress: (SECONDS - r) / SECONDS }),
          end,
        );
        show();
      };
      tick();
    },
  });

  // for tools/tests: raw data and built items
  window.DMEndungen = { NOM, AKK, DAT, SETS, SAY };
})();
