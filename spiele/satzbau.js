/* Lernspiel „Satz-Baumeister“ – Wortkarten in die richtige Reihenfolge bringen (A1–B1, Satzbau).
   Datenformat je Aufgabe: [Lösung(en), Verben, Regel]
     Lösung(en) – ein Satz oder eine Liste gleichwertiger richtiger Sätze (alle aus genau denselben Karten).
                  Geschrieben wie mitten im Satz: erstes Wort klein (außer Nomen, Namen, „Sie“), Satzzeichen am Ende.
                  Kommas gehören zur Lösung, sind aber keine Karten. „_“ verbindet mehrere Wörter zu einer Karte.
     Verben     – Karten, die in der Lösung markiert werden (durch Leerzeichen getrennt).
     Regel      – eine Zeile, z. B. „weil → Verb ans Ende“.
   Kein Vorlesen. */
(() => {
  const ID = "satzbau",
    ROUNDS = 10;
  const SAY = [];

  const CSS = `
.sp-satzbau-q{text-align:center;margin:2px 0 12px}
.sp-satzbau-tag{display:inline-block;max-width:100%;background:var(--dm-tinte-soft);color:var(--dm-tinte-dark);font-weight:800;font-size:14px;border-radius:99px;padding:3px 12px;margin:0 0 6px}
.sp-satzbau-h{font:700 clamp(18px,4.8vw,22px)/1.35 var(--dm-font);margin:0;color:var(--dm-ink)}
.sp-satzbau-built{min-height:72px;margin-bottom:12px}
.sp-satzbau-ph{flex:1 1 auto;color:#8a93a8;font-size:15px;line-height:1.35}
.sp-satzbau-end{font:800 26px/1 var(--dm-font);color:#55607a;align-self:flex-end;padding:0 2px 10px}
.sp-satzbau-pool{justify-content:center;min-height:46px}
.sp-satzbau .ch-chip{max-width:100%;font-size:18px;line-height:1.25;overflow-wrap:anywhere;touch-action:manipulation;transition:transform .08s}
.sp-satzbau .ch-chip:active:not(:disabled){transform:scale(.96)}
.sp-satzbau .ch-chip:disabled{cursor:default;color:var(--dm-ink);opacity:1}
.sp-satzbau .ch-chip.sp-satzbau-good{border-color:#1f9d55;background:#e8f6ec}
.sp-satzbau .ch-chip.sp-satzbau-vc{border-color:#d9a400;background:#fff4cc}
.sp-satzbau-btns{display:flex;flex-wrap:wrap;gap:10px;margin-top:16px}
.sp-satzbau-btns .dm-btn{flex:1 1 140px;min-height:48px;justify-content:center;font-size:17px}
.sp-satzbau-btns .dm-btn:disabled{opacity:.5;cursor:not-allowed}
.sp-satzbau-btns [hidden]{display:none}
.sp-satzbau-keys{text-align:center;color:#7a849c;font-size:13px}
.sp-satzbau .ch-feedback .sp-satzbau-sol{font-size:18px;font-weight:700;color:var(--dm-ink);line-height:1.5}
.sp-satzbau .ch-feedback .sp-satzbau-alt{font-size:15px}
mark.sp-satzbau-v{background:#ffe08a;color:inherit;border-radius:5px;padding:0 3px;box-decoration-break:clone;-webkit-box-decoration-break:clone}
@media (max-width:380px){.sp-satzbau .ch-chip{font-size:16.5px;padding:8px 11px}.sp-satzbau-built{padding:10px}}
@media (prefers-reduced-motion:reduce){.sp-satzbau .ch-chip{transition:none}}`;

  const V2 = "Aussagesatz: Das Verb steht auf Position 2.";
  const W = "W-Frage: Fragewort zuerst, dann sofort das Verb.";
  const JN = "Ja/Nein-Frage: Das Verb steht ganz vorne.";
  const INV = "Zeitangabe vorne → Verb auf Position 2, dann das Subjekt.";
  const MOD = "Modalverb auf Position 2, Infinitiv ans Ende.";
  const PERF = "Perfekt: haben/sein auf Position 2, Partizip ans Ende.";
  const TRENN = "Trennbares Verb: Verb auf Position 2, Vorsilbe ans Ende.";

  const ITEMS = {
    a1: [
      [
        [
          "ich wohne seit zwei Jahren in Köln.",
          "seit zwei Jahren wohne ich in Köln.",
          "in Köln wohne ich seit zwei Jahren.",
        ],
        "wohne",
        V2 + " Zeit oder Ort kann auch vorne stehen.",
      ],
      [["mein Name ist Leyla_Demir.", "Leyla_Demir ist mein Name."], "ist", V2],
      ["wie heißen Sie?", "heißen", W],
      ["woher kommst du?", "kommst", W],
      ["kommst du aus Syrien?", "kommst", JN],
      ["wo arbeitet dein Bruder?", "arbeitet", W],
      [
        [
          "ich trinke morgens einen Kaffee.",
          "morgens trinke ich einen Kaffee.",
        ],
        "trinke",
        V2 + " „morgens“ vorne → Verb, dann „ich“.",
      ],
      [
        [
          "Ali spielt am Wochenende Fußball.",
          "am Wochenende spielt Ali Fußball.",
        ],
        "spielt",
        V2,
      ],
      ["was kostet das Brot?", "kostet", W],
      ["haben Sie heute Zeit?", "haben", JN],
      ["wann beginnt der Deutschkurs?", "beginnt", W],
      [
        [
          "der Supermarkt ist am Sonntag geschlossen.",
          "am Sonntag ist der Supermarkt geschlossen.",
        ],
        "ist",
        V2,
      ],
      ["sprechen Sie Englisch?", "sprechen", JN],
      ["meine Tochter geht in die Schule.", "geht", V2],
      ["wie alt sind Ihre Kinder?", "sind", W],
      [
        [
          "wir kaufen Obst_und_Gemüse auf dem Markt.",
          "auf dem Markt kaufen wir Obst_und_Gemüse.",
          "wir kaufen auf dem Markt Obst_und_Gemüse.",
        ],
        "kaufen",
        V2,
      ],
      ["wohnst du in der Nähe?", "wohnst", JN],
      [
        [
          "Frau_Nowak arbeitet im Krankenhaus.",
          "im Krankenhaus arbeitet Frau_Nowak.",
        ],
        "arbeitet",
        V2,
      ],
      ["wie viel Uhr ist es?", "ist", W + " „wie viel Uhr“ ist das Fragewort."],
      [
        ["heute ist das Wetter schön.", "das Wetter ist heute schön."],
        "ist",
        V2,
      ],
      ["wer ist die Frau auf dem Foto?", "ist", W],
      [
        [
          "nimmst du den Bus oder die Bahn?",
          "nimmst du die Bahn oder den Bus?",
        ],
        "nimmst",
        "Frage ohne Fragewort: Das Verb steht ganz vorne.",
      ],
      [
        ["mein Mann kocht jeden Abend.", "jeden Abend kocht mein Mann."],
        "kocht",
        V2,
      ],
      ["wo ist hier die Toilette?", "ist", W],
      ["Tom_und_Anna haben zwei Kinder.", "haben", V2],
      ["brauchst du eine Tüte?", "brauchst", JN],
      ["warum lernst du Deutsch?", "lernst", W],
      [
        [
          "ich habe am Montag einen Arzttermin.",
          "am Montag habe ich einen Arzttermin.",
        ],
        "habe",
        V2,
      ],
    ],
    a2: [
      [
        [
          "am Wochenende besuche ich meine Oma.",
          "ich besuche am Wochenende meine Oma.",
          "ich besuche meine Oma am Wochenende.",
        ],
        "besuche",
        INV,
      ],
      [
        [
          "heute Abend kocht Jonas Spaghetti.",
          "Jonas kocht heute Abend Spaghetti.",
        ],
        "kocht",
        INV,
      ],
      [
        [
          "nach der Arbeit gehe ich ins Fitnessstudio.",
          "ich gehe nach der Arbeit ins Fitnessstudio.",
        ],
        "gehe",
        INV,
      ],
      [
        [
          "jeden Morgen fährt Herr_Yilmaz mit dem Fahrrad zur Arbeit.",
          "Herr_Yilmaz fährt jeden Morgen mit dem Fahrrad zur Arbeit.",
        ],
        "fährt",
        INV,
      ],
      [
        [
          "im Sommer fliegen wir nach Spanien.",
          "wir fliegen im Sommer nach Spanien.",
        ],
        "fliegen",
        INV,
      ],
      [
        ["ich muss heute lange arbeiten.", "heute muss ich lange arbeiten."],
        "muss arbeiten",
        MOD,
      ],
      [
        "kannst du mir bitte helfen?",
        "kannst helfen",
        "Ja/Nein-Frage: Modalverb vorne, Infinitiv ans Ende.",
      ],
      [
        ["hier darf man nicht rauchen.", "man darf hier nicht rauchen."],
        "darf rauchen",
        MOD,
      ],
      [
        [
          "wir wollen nächstes Jahr ein Auto kaufen.",
          "nächstes Jahr wollen wir ein Auto kaufen.",
        ],
        "wollen kaufen",
        MOD,
      ],
      [
        [
          "Sie müssen das Formular bis Freitag abgeben.",
          "bis Freitag müssen Sie das Formular abgeben.",
          "Sie müssen bis Freitag das Formular abgeben.",
        ],
        "müssen abgeben",
        MOD,
      ],
      [
        "möchten Sie einen Termin vereinbaren?",
        "möchten vereinbaren",
        "Ja/Nein-Frage: Modalverb vorne, Infinitiv ans Ende.",
      ],
      [
        [
          "meine Kinder sollen um acht Uhr ins Bett gehen.",
          "um acht Uhr sollen meine Kinder ins Bett gehen.",
        ],
        "sollen gehen",
        MOD,
      ],
      [
        "wo kann ich hier Fahrkarten kaufen?",
        "kann kaufen",
        "W-Frage mit Modalverb: Fragewort, Modalverb … Infinitiv am Ende.",
      ],
      [
        [
          "ich habe gestern einen Kuchen gebacken.",
          "gestern habe ich einen Kuchen gebacken.",
        ],
        "habe gebacken",
        PERF,
      ],
      [
        [
          "Elena ist letzte Woche nach Hamburg gefahren.",
          "letzte Woche ist Elena nach Hamburg gefahren.",
        ],
        "ist gefahren",
        PERF + " fahren → mit „sein“.",
      ],
      [
        [
          "wir haben am Sonntag lange geschlafen.",
          "am Sonntag haben wir lange geschlafen.",
        ],
        "haben geschlafen",
        PERF,
      ],
      [
        "hast du schon gegessen?",
        "hast gegessen",
        "Ja/Nein-Frage im Perfekt: haben vorne, Partizip ans Ende.",
      ],
      [
        "wann bist du nach Deutschland gekommen?",
        "bist gekommen",
        "W-Frage im Perfekt: Fragewort, sein … Partizip am Ende.",
      ],
      [
        [
          "am Samstag haben wir unsere Freunde getroffen.",
          "wir haben am Samstag unsere Freunde getroffen.",
        ],
        "haben getroffen",
        PERF,
      ],
      [
        "der Zug ist pünktlich angekommen.",
        "ist angekommen",
        PERF + " ankommen → mit „sein“.",
      ],
      [
        [
          "der Unterricht fängt um neun Uhr an.",
          "um neun Uhr fängt der Unterricht an.",
        ],
        "fängt an",
        TRENN,
      ],
      [
        ["ich rufe dich heute Abend an.", "heute Abend rufe ich dich an."],
        "rufe an",
        TRENN,
      ],
      [
        ["ich kaufe nach der Arbeit ein.", "nach der Arbeit kaufe ich ein."],
        "kaufe ein",
        TRENN,
      ],
      [
        [
          "Marta steht jeden Tag um sechs Uhr auf.",
          "jeden Tag steht Marta um sechs Uhr auf.",
          "um sechs Uhr steht Marta jeden Tag auf.",
        ],
        "steht auf",
        TRENN,
      ],
      [
        [
          "räumst du bitte dein Zimmer auf?",
          "räumst du dein Zimmer bitte auf?",
        ],
        "räumst auf",
        "Frage mit trennbarem Verb: Verb vorne, Vorsilbe ans Ende.",
      ],
      [
        [
          "der Bus fährt in fünf Minuten ab.",
          "in fünf Minuten fährt der Bus ab.",
        ],
        "fährt ab",
        TRENN,
      ],
      [
        [
          "meine Schwester zieht morgen in eine neue Wohnung um.",
          "morgen zieht meine Schwester in eine neue Wohnung um.",
        ],
        "zieht um",
        TRENN,
      ],
      [
        ["machst du bitte das Fenster zu?", "machst du das Fenster bitte zu?"],
        "machst zu",
        "Frage mit trennbarem Verb: Verb vorne, Vorsilbe ans Ende.",
      ],
    ],
    b1: [
      [
        [
          "ich bleibe heute zu Hause, weil ich krank bin.",
          "heute bleibe ich zu Hause, weil ich krank bin.",
          "weil ich krank bin, bleibe ich heute zu Hause.",
        ],
        "bleibe bin",
        "weil → Verb ans Ende. Nebensatz vorne → danach sofort das Verb.",
      ],
      [
        [
          "ich glaube, dass der Kurs am Montag beginnt.",
          "ich glaube, dass am Montag der Kurs beginnt.",
        ],
        "glaube beginnt",
        "dass → Verb ans Ende.",
      ],
      [
        [
          "wenn das Wetter schön ist, gehen wir in den Park.",
          "wir gehen in den Park, wenn das Wetter schön ist.",
        ],
        "ist gehen",
        "wenn → Verb ans Ende. Nebensatz vorne → danach sofort das Verb.",
      ],
      [
        [
          "Karim geht zur Arbeit, obwohl er müde ist.",
          "obwohl Karim müde ist, geht er zur Arbeit.",
          "obwohl er müde ist, geht Karim zur Arbeit.",
        ],
        "geht ist",
        "obwohl → Verb ans Ende. Nebensatz vorne → danach sofort das Verb.",
      ],
      [
        [
          "ich lerne jeden Tag Deutsch, damit ich die Prüfung bestehe.",
          "jeden Tag lerne ich Deutsch, damit ich die Prüfung bestehe.",
          "damit ich die Prüfung bestehe, lerne ich jeden Tag Deutsch.",
        ],
        "lerne bestehe",
        "damit → Verb ans Ende.",
      ],
      [
        "das ist die Frau, die neben uns wohnt.",
        "ist wohnt",
        "Relativsatz: Das Verb steht am Ende.",
      ],
      [
        [
          "der Mann, der dort steht, ist mein Nachbar.",
          "mein Nachbar ist der Mann, der dort steht.",
        ],
        "steht ist",
        "Relativsatz: Verb ans Ende – danach geht der Hauptsatz weiter.",
      ],
      [
        "kannst du mir sagen, wann der Zug abfährt?",
        "kannst sagen abfährt",
        "Indirekte Frage: „wann“ leitet den Nebensatz ein → Verb ans Ende (abfährt zusammen).",
      ],
      [
        "ich hoffe, dass du bald wieder gesund bist.",
        "hoffe bist",
        "dass → Verb ans Ende.",
      ],
      [
        [
          "ich bin zu spät gekommen, weil der Bus Verspätung hatte.",
          "weil der Bus Verspätung hatte, bin ich zu spät gekommen.",
        ],
        "bin gekommen hatte",
        "weil → Verb ans Ende. Nebensatz vorne → danach sofort das Verb.",
      ],
      [
        [
          "wenn du Zeit hast, kannst du mich besuchen.",
          "du kannst mich besuchen, wenn du Zeit hast.",
        ],
        "hast kannst besuchen",
        "wenn → Verb ans Ende. Nebensatz vorne → danach sofort das Verb.",
      ],
      [
        [
          "Sara macht einen Deutschkurs, weil sie in Deutschland arbeiten möchte.",
          "weil Sara in Deutschland arbeiten möchte, macht sie einen Deutschkurs.",
          "weil sie in Deutschland arbeiten möchte, macht Sara einen Deutschkurs.",
        ],
        "macht arbeiten möchte",
        "weil → konjugiertes Verb ganz ans Ende: „arbeiten möchte“.",
      ],
      [
        "ich weiß nicht, ob der Laden heute geöffnet hat.",
        "weiß geöffnet hat",
        "ob → Verb ans Ende.",
      ],
      [
        "das Buch, das du mir geschenkt hast, ist sehr spannend.",
        "geschenkt hast ist",
        "Relativsatz: Verb ans Ende („geschenkt hast“), dann geht der Hauptsatz weiter.",
      ],
      [
        [
          "obwohl es regnet, fahre ich mit dem Fahrrad.",
          "ich fahre mit dem Fahrrad, obwohl es regnet.",
        ],
        "regnet fahre",
        "obwohl → Verb ans Ende. Nebensatz vorne → danach sofort das Verb.",
      ],
      [
        [
          "wir sparen Geld, damit wir im Sommer in Urlaub fahren können.",
          "damit wir im Sommer in Urlaub fahren können, sparen wir Geld.",
        ],
        "sparen fahren können",
        "damit → konjugiertes Verb ganz ans Ende: „fahren können“.",
      ],
      [
        [
          "Herr_Becker sagt, dass die Heizung morgen repariert wird.",
          "Herr_Becker sagt, dass morgen die Heizung repariert wird.",
        ],
        "sagt repariert wird",
        "dass → konjugiertes Verb ganz ans Ende: „repariert wird“.",
      ],
      [
        [
          "wenn ich nach Hause komme, mache ich zuerst einen Tee.",
          "ich mache zuerst einen Tee, wenn ich nach Hause komme.",
          "zuerst mache ich einen Tee, wenn ich nach Hause komme.",
        ],
        "komme mache",
        "wenn → Verb ans Ende. Nebensatz vorne → danach sofort das Verb.",
      ],
      [
        "ich suche eine Wohnung, die nicht so teuer ist.",
        "suche ist",
        "Relativsatz: Das Verb steht am Ende.",
      ],
      [
        "ich bin froh, dass ich eine Arbeit gefunden habe.",
        "bin gefunden habe",
        "dass → konjugiertes Verb ganz ans Ende: „gefunden habe“.",
      ],
      [
        [
          "mein Sohn kann heute nicht in die Kita gehen, weil er Fieber hat.",
          "weil mein Sohn Fieber hat, kann er heute nicht in die Kita gehen.",
          "weil er Fieber hat, kann mein Sohn heute nicht in die Kita gehen.",
        ],
        "kann gehen hat",
        "weil → Verb ans Ende. Nebensatz vorne → danach sofort das Verb.",
      ],
      [
        [
          "Lukas hat die Prüfung nicht bestanden, obwohl er viel gelernt hat.",
          "obwohl Lukas viel gelernt hat, hat er die Prüfung nicht bestanden.",
          "obwohl er viel gelernt hat, hat Lukas die Prüfung nicht bestanden.",
        ],
        "hat bestanden gelernt",
        "obwohl → „gelernt hat“ ans Ende. Nebensatz vorne → danach sofort das Verb.",
      ],
      [
        "der Arzt, bei dem ich gestern war, ist sehr freundlich.",
        "war ist",
        "Relativsatz mit Präposition: „bei dem“ … Verb ans Ende.",
      ],
      [
        [
          "ruf mich bitte an, wenn du am Bahnhof bist.",
          "wenn du am Bahnhof bist, ruf mich bitte an.",
        ],
        "ruf an bist",
        "wenn → Verb ans Ende. Nebensatz vorne → danach sofort das Verb.",
      ],
      [
        "meine Kollegin hat erzählt, dass sie ein Baby bekommt.",
        "hat erzählt bekommt",
        "dass → Verb ans Ende.",
      ],
      [
        [
          "ich mache das Fenster auf, damit frische Luft ins Zimmer kommt.",
          "damit frische Luft ins Zimmer kommt, mache ich das Fenster auf.",
        ],
        "mache auf kommt",
        "damit → Verb ans Ende. Nebensatz vorne → danach sofort das Verb.",
      ],
      [
        [
          "Frau_Schulz ist die Lehrerin, mit der ich oft spreche.",
          "die Lehrerin, mit der ich oft spreche, ist Frau_Schulz.",
        ],
        "ist spreche",
        "Relativsatz mit Präposition: „mit der“ … Verb ans Ende.",
      ],
      [
        [
          "wenn der Termin nicht passt, rufen Sie uns bitte an.",
          "rufen Sie uns bitte an, wenn der Termin nicht passt.",
        ],
        "passt rufen an",
        "wenn → Verb ans Ende. Nebensatz vorne → danach sofort das Verb.",
      ],
    ],
  };

  const noComma = (t) => t.replace(/,$/, "");
  const toks = (s) =>
    s
      .trim()
      .replace(/[.?!]$/, "")
      .trim()
      .split(/\s+/);
  const show = (t) => t.replace(/_/g, " ");
  const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);
  const keyOf = (arr) => arr.map(noComma).join(" ");

  function parse([sols, verbs, rule]) {
    sols = [].concat(sols);
    const end = (sols[0].trim().match(/[.?!]$/) || ["."])[0];
    const list = sols.map(toks);
    return {
      sols: list,
      keys: list.map(keyOf),
      cards: list[0].map(noComma),
      verbs: new Set(verbs.split(/\s+/)),
      rule,
      end,
    };
  }
  const DATA = Object.fromEntries(
    Object.entries(ITEMS).map(([k, v]) => [k, v.map(parse)]),
  );

  // whole sentence as plain text / as html with the verbs highlighted
  const plain = (it, sol) => cap(sol.map((t, i) => show(t)).join(" ")) + it.end;
  const html = (it, sol, esc) =>
    sol
      .map((t, i) => {
        const w = noComma(t),
          c = t.endsWith(",") ? "," : "";
        let s = esc(i ? show(w) : cap(show(w)));
        if (it.verbs.has(w)) s = `<mark class="sp-satzbau-v">${s}</mark>`;
        return s + c;
      })
      .join(" ") + esc(it.end);

  let onKey = null;

  DMGame.register({
    id: ID,
    title: "Satz-Baumeister",
    icon: "🧱",
    level: "A1–B1",
    cat: "basis",
    desc: "Bring die Wortkarten in die richtige Reihenfolge – Satzbau von A1 bis B1.",
    intro:
      "Tippe die Wortkarten in der richtigen Reihenfolge an. Noch einmal tippen = Karte zurück. Dann „Prüfen“. Beim ersten Versuch gibt es 2 Punkte, beim zweiten 1 Punkt. Das Satzzeichen am Ende zeigt dir: Aussage oder Frage?",
    optionsLabel: "Niveau",
    options: [
      { id: "a1", label: "A1: Aussagesätze, W-Fragen, Ja/Nein-Fragen" },
      {
        id: "a2",
        label: "A2: Zeit vorne, Modalverben, Perfekt, trennbare Verben",
      },
      {
        id: "b1",
        label:
          "B1: Nebensätze mit weil, dass, wenn, obwohl, damit, Relativsätze",
      },
    ],
    start(api, opt) {
      if (!document.getElementById("sp-satzbau-css"))
        document.head.insertAdjacentHTML(
          "beforeend",
          `<style id="sp-satzbau-css">${CSS}</style>`,
        );
      const e = api.esc,
        pool = DATA[opt] || DATA.a1;
      const deck = api.pick(pool, Math.min(ROUNDS, pool.length)),
        total = deck.length,
        max = total * 2,
        wrong = [];
      let i = 0,
        score = 0,
        it = null,
        placed = [],
        tries = 0,
        locked = true,
        good = 0;

      if (onKey) document.removeEventListener("keydown", onKey);
      onKey = (ev) => {
        if (!api.el.isConnected) {
          document.removeEventListener("keydown", onKey);
          onKey = null;
          return;
        }
        if (
          ev.defaultPrevented ||
          ev.altKey ||
          ev.ctrlKey ||
          ev.metaKey ||
          locked
        )
          return;
        const tag = document.activeElement?.tagName;
        if (tag === "INPUT" || tag === "TEXTAREA") return;
        const nb = document.getElementById("sp-next");
        if (nb && !nb.hidden) return;
        if (ev.key === "Enter") {
          if (placed.length === it.cards.length) {
            ev.preventDefault();
            check();
          }
        } else if (ev.key === "Backspace") {
          if (placed.length) {
            ev.preventDefault();
            placed.pop();
            good = 0;
            render();
          }
        }
      };
      document.addEventListener("keydown", onKey);

      const $ = (s) => api.el.querySelector(s);

      function round() {
        if (!api.el.isConnected) return;
        if (i >= total) return api.finish({ score, max, wrong });
        api.clearFeedback();
        it = deck[i];
        placed = [];
        tries = 0;
        good = 0;
        locked = false;
        const order = api.shuffle(it.cards.map((_, k) => k));
        // never start with the solution already in place
        if (
          order.length > 1 &&
          it.keys.includes(keyOf(order.map((k) => it.cards[k])))
        )
          order.push(order.shift());
        api.el.innerHTML = `<div class="sp-satzbau-q"><p class="sp-satzbau-tag">${it.end === "?" ? "❓ Frage" : "💬 Aussage"}</p><p class="sp-satzbau-h">Bau den Satz in der richtigen Reihenfolge.</p></div>
          <div class="ch-built sp-satzbau-built" aria-label="Dein Satz" aria-live="polite"></div>
          <div class="ch-pool sp-satzbau-pool" role="group" aria-label="Wortkarten">${order.map((k) => `<button type="button" class="ch-chip" data-c="${k}">${e(show(it.cards[k]))}</button>`).join("")}</div>
          <div class="sp-satzbau-btns"><button type="button" class="dm-btn ch-go" id="sp-satzbau-check" disabled>Prüfen</button><button type="button" class="dm-btn dm-btn-quiet" id="sp-satzbau-reset" disabled>Alle zurück</button></div>
          <p class="ch-keys sp-satzbau-keys">Tastatur: Enter = Prüfen · ⌫ = letzte Karte zurück</p>`;
        api.el.querySelectorAll(".sp-satzbau-pool .ch-chip").forEach(
          (b) =>
            (b.onclick = () => {
              if (locked) return;
              const k = +b.dataset.c;
              if (!placed.includes(k)) {
                placed.push(k);
                good = 0;
                render();
              }
            }),
        );
        $(".sp-satzbau-built").onclick = (ev) => {
          const b = ev.target.closest(".ch-chip");
          if (!b || locked) return;
          placed.splice(+b.dataset.p, 1);
          good = 0;
          render();
        };
        $("#sp-satzbau-check").onclick = check;
        $("#sp-satzbau-reset").onclick = () => {
          if (!locked) {
            placed = [];
            good = 0;
            render();
          }
        };
        api.hud({ step: `${i + 1} / ${total}`, progress: i / total, score });
        render();
      }

      function render(solution) {
        const built = $(".sp-satzbau-built");
        const seq = solution || placed.map((k) => it.cards[k]);
        built.classList.remove("is-right", "is-wrong");
        built.innerHTML =
          (seq.length
            ? seq
                .map((t, p) => {
                  const w = noComma(t),
                    txt = p ? show(w) : cap(show(w));
                  const cls = solution
                    ? it.verbs.has(w)
                      ? " sp-satzbau-vc"
                      : ""
                    : p < good
                      ? " sp-satzbau-good"
                      : "";
                  return `<button type="button" class="ch-chip is-placed${cls}" data-p="${p}"${locked ? " disabled" : ""} aria-label="${e(txt)}${locked ? "" : " – antippen zum Entfernen"}">${e(txt)}</button>`;
                })
                .join("")
            : '<span class="sp-satzbau-ph">Tippe unten die Wörter in der richtigen Reihenfolge an.</span>') +
          `<span class="sp-satzbau-end" aria-hidden="true">${e(it.end)}</span>`;
        api.el.querySelectorAll(".sp-satzbau-pool .ch-chip").forEach((b) => {
          b.hidden = placed.includes(+b.dataset.c) || !!solution;
          b.disabled = locked;
        });
        const full = placed.length === it.cards.length;
        $("#sp-satzbau-check").disabled = locked || !full;
        $("#sp-satzbau-reset").disabled = locked || !placed.length;
      }

      function alsoHtml(skip) {
        const rest = it.sols.filter((_, k) => k !== skip);
        return rest.length
          ? `<span class="sp-satzbau-alt">Auch richtig: ${rest.map((s) => html(it, s, e)).join(" · ")}</span>`
          : "";
      }

      function done() {
        locked = true;
        i++;
        api.hud({ score, progress: i / total });
        $(".sp-satzbau-btns").hidden = true;
        $(".sp-satzbau-pool").hidden = true;
        const k = $(".sp-satzbau-keys");
        if (k) k.hidden = true;
        api.next(i >= total ? "Ergebnis ansehen" : "Weiter", round);
        const nb = document.getElementById("sp-next");
        if (nb && nb.getBoundingClientRect().bottom > innerHeight)
          nb.scrollIntoView({
            block: "end",
            behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
              ? "auto"
              : "smooth",
          });
      }

      function check() {
        if (locked || placed.length !== it.cards.length) return;
        const seq = placed.map((k) => it.cards[k]),
          key = seq.join(" ");
        const hit = it.keys.indexOf(key);
        const built = $(".sp-satzbau-built");
        if (hit >= 0) {
          const pts = tries ? 1 : 2;
          score += pts;
          if (tries)
            wrong.push({ correct: plain(it, it.sols[hit]), tip: it.rule });
          locked = true;
          render(it.sols[hit]);
          built.classList.add("is-right");
          api.feedback(
            true,
            `<b>${tries ? "Richtig – im zweiten Versuch! +1" : "Super, richtig! +2"}</b><span class="sp-satzbau-sol">${html(it, it.sols[hit], e)}</span><span>💡 ${e(it.rule)}</span>${alsoHtml(hit)}`,
          );
          return done();
        }
        tries++;
        if (tries < 2) {
          // how many cards from the start are already right (best match over all accepted orders)
          good = Math.max(
            ...it.sols.map((s) => {
              const c = s.map(noComma);
              let n = 0;
              while (n < seq.length && seq[n] === c[n]) n++;
              return n;
            }),
          );
          render();
          built.classList.add("is-wrong");
          api.feedback(
            false,
            `<b>Noch nicht ganz – versuch es noch einmal!</b>${good ? `<span>${good === 1 ? "Die erste Karte stimmt" : "Die ersten " + good + " Karten stimmen"} schon (grün).</span>` : "<span>Schon die erste Karte stimmt nicht.</span>"}<span>💡 Tipp: ${e(it.rule)}</span>`,
          );
          return;
        }
        wrong.push({ correct: plain(it, it.sols[0]), tip: it.rule });
        locked = true;
        render(it.sols[0]);
        built.classList.add("is-wrong");
        api.feedback(
          false,
          `<b>Leider falsch. So ist es richtig:</b><span class="sp-satzbau-sol">${html(it, it.sols[0], e)}</span><span>💡 ${e(it.rule)}</span>${alsoHtml(0)}`,
        );
        done();
      }

      round();
    },
  });
})();
