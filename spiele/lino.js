/* Jump'n'Run „Lino läuft“ – 5 Welten von A1 bis C1. Lino läuft automatisch, Tippen/Leertaste = springen.
   An jedem Tor wartet eine Deutschfrage. Lücken, Fehlerkäfer und Münzen auf dem Weg. (spiele.js / DMGame) */
(() => {
  if (!window.DMGame) return;

  if (!document.getElementById("sp-lino-css")) {
    const st = document.createElement("style");
    st.id = "sp-lino-css";
    st.textContent = `
.sp-lino .sp-area{margin-top:10px}
.sp-lino-wrap{position:relative;border-radius:16px;overflow:hidden;background:#bfe3ff;box-shadow:0 6px 20px rgba(23,32,54,.12);touch-action:manipulation;-webkit-user-select:none;user-select:none;-webkit-touch-callout:none;-webkit-tap-highlight-color:transparent}
.sp-lino-wrap canvas{display:block;width:100%;height:auto;max-height:62vh;object-fit:contain;cursor:pointer;-webkit-touch-callout:none}
.sp-lino-banner{position:absolute;left:50%;top:14px;transform:translateX(-50%);background:rgba(255,255,255,.94);border-radius:99px;padding:6px 16px;font:800 15px var(--dm-font);color:var(--dm-ink);box-shadow:0 4px 12px rgba(0,0,0,.12);white-space:nowrap;pointer-events:none;transition:opacity .3s}
.sp-lino-banner[hidden]{display:block;opacity:0}
.sp-lino-panel{margin-top:12px}
.sp-lino-jump{display:flex;align-items:center;justify-content:center;gap:10px;width:100%;min-height:64px;border:0;border-radius:18px;background:linear-gradient(180deg,#ff9a3c,#e5622b);color:#fff;font:800 20px var(--dm-font);box-shadow:0 5px 0 #b8461c;cursor:pointer;touch-action:manipulation;-webkit-user-select:none;user-select:none;-webkit-touch-callout:none;-webkit-tap-highlight-color:transparent}
.sp-lino-jump:active{transform:translateY(3px);box-shadow:0 2px 0 #b8461c}
.sp-lino-hint{margin:8px 0 0;text-align:center;color:#5b6680;font-size:14px}
.sp-play.sp-lino{scroll-margin-top:96px}
@media (max-height:520px){.sp-play.sp-lino{scroll-margin-top:74px}.sp-lino-wrap canvas{max-height:calc(100vh - 240px);min-height:140px}.sp-lino-hint{display:none}.sp-lino-panel{margin-top:8px}.sp-lino-jump{min-height:46px;font-size:18px}.sp-lino .sp-hud{margin-bottom:4px}}
.sp-lino-q{background:#fff;border:2px solid var(--dm-tinte);border-radius:18px;padding:14px 14px 12px}
.sp-lino-q .sp-lino-tag{display:inline-block;background:var(--dm-tinte-soft);color:var(--dm-tinte-dark);font-weight:800;font-size:13px;border-radius:99px;padding:3px 10px;margin:0 0 8px}
.sp-lino-q p.sp-lino-text{margin:0 0 12px;font:700 clamp(18px,4.6vw,23px)/1.4 var(--dm-font);color:var(--dm-ink);overflow-wrap:break-word}
.sp-lino-gap{display:inline-block;min-width:2.6em;border-bottom:3px solid #c5cdf0;color:transparent}
.sp-lino-gap.is-ok{color:var(--dm-tinte);border-color:var(--dm-tinte)}
.sp-lino-q .ch-opts{gap:8px}
.sp-lino-q .ch-opt{min-height:52px;font-size:17px;justify-content:flex-start}
.sp-lino-pick{display:flex;gap:14px;align-items:center;background:var(--dm-tinte-soft,#eef1fb);border-radius:16px;padding:10px 12px;margin:0 0 12px}
.sp-lino-prev{width:96px;height:112px;flex:none;background:linear-gradient(#bfe3ff,#e8f6ff);border-radius:12px}
.sp-lino-opts{display:grid;gap:8px;min-width:0;flex:1}
.sp-lino-ptitle{margin:0;font-weight:700}
.sp-lino-row{display:flex;flex-wrap:wrap;gap:6px}
.sp-lino-row button{min-height:44px;padding:6px 12px;border-radius:99px;border:2px solid var(--dm-line,#d5dbea);background:#fff;font:700 15px var(--dm-font);color:var(--dm-ink,#172036);cursor:pointer}
.sp-lino-row button[aria-pressed="true"]{border-color:var(--dm-tinte,#2341B5);background:var(--dm-tinte,#2341B5);color:#fff}
.sp-lino-skins button{width:44px;padding:0;background:var(--sk)}
.sp-lino-skins button[aria-pressed="true"]{background:var(--sk);box-shadow:0 0 0 3px #fff inset;outline:3px solid var(--dm-tinte,#2341B5);outline-offset:1px}
@media (max-width:560px){.sp-lino-pick{flex-wrap:wrap;justify-content:center;gap:8px}.sp-lino-prev{width:72px;height:84px}.sp-lino-opts{flex-basis:100%}.sp-lino-ptitle{text-align:center}.sp-lino-row{justify-content:center}.sp-lino-row button{font-size:14.5px;padding:6px 12px}.sp-lino-skins button{width:42px}}
.sp-lino-levels{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:10px;margin:4px 0 6px}
.sp-lino-lv{position:relative;display:flex;flex-direction:column;align-items:flex-start;gap:2px;min-height:96px;padding:12px 14px;border:2px solid var(--dm-line);border-radius:16px;background:#fff;color:var(--dm-ink);font:inherit;text-align:left;cursor:pointer}
.sp-lino-lv:hover:not(:disabled){border-color:var(--dm-tinte)}
.sp-lino-lv b{font-size:22px}.sp-lino-lv span{font-size:14px;color:#3b4560}.sp-lino-lv small{font-size:13px;color:#7a5b20;font-weight:700}
.sp-lino-lv:disabled{opacity:.55;cursor:default}
.sp-lino-lv i{position:absolute;right:10px;top:8px;font-style:normal;font-size:22px}
.sp-lino-res{text-align:center;padding:6px 0}
.sp-lino-res h2{margin:4px 0 6px;font-size:clamp(22px,5.5vw,28px)}
.sp-lino-res .sp-lino-stars{font-size:34px;letter-spacing:4px}
.sp-lino-res .ch-actions{justify-content:center;flex-wrap:wrap}
.sp-lino-unlock{background:none;border:0;color:var(--dm-tinte);text-decoration:underline;font:inherit;font-size:14px;cursor:pointer;padding:6px}
@media (hover:none){.sp-lino-q .ch-opt:hover:not(:disabled){border-color:var(--dm-line)}}
`;
    document.head.appendChild(st);
  }

  /* Fragen: [Aufgabe mit ___, richtig, falsch, falsch, Tipp] */
  const WORLDS = [
    {
      id: "A1",
      name: "Wiese",
      sky: ["#9fd8ff", "#e3f4ff"],
      hill: "#7cc46a",
      hill2: "#5aa84c",
      ground: "#8a5a32",
      grass: "#4fb341",
      questions: [
        [
          "Ich ___ Anna.",
          "heiße",
          "heißt",
          "heißen",
          "ich heiße, du heißt, er/sie heißt",
        ],
        ["___ Tisch ist groß.", "Der", "Die", "Das", "der Tisch"],
        [
          "„Wie geht es dir?“ – „___“",
          "Danke, gut!",
          "Ich heiße Tom.",
          "Ich komme aus Polen.",
          "Auf „Wie geht’s?“ antwortet man mit dem Befinden.",
        ],
        ["Du ___ aus Syrien.", "kommst", "komme", "kommt", "du kommst"],
        ["Wir ___ in Essen.", "wohnen", "wohnt", "wohne", "wir wohnen"],
        [
          "Das ist ___ Mutter.",
          "meine",
          "mein",
          "meinen",
          "die Mutter → meine Mutter",
        ],
        [
          "Ich habe ___ Bruder.",
          "einen",
          "ein",
          "eine",
          "haben + Akkusativ: einen Bruder",
        ],
        ["Er ___ Lehrer.", "ist", "bist", "sind", "er ist"],
        [
          "Es ist 8:30 Uhr. Das heißt: Es ist ___.",
          "halb neun",
          "halb acht",
          "Viertel nach acht",
          "8:30 = halb neun (eine halbe Stunde vor neun)",
        ],
        [
          "Am Morgen sagt man: „___“",
          "Guten Morgen!",
          "Gute Nacht!",
          "Guten Abend!",
          "Guten Morgen!",
        ],
        ["___ du Kaffee?", "Trinkst", "Trinke", "Trinken", "du trinkst"],
        ["Die Banane ist ___.", "gelb", "blau", "laut", "Bananen sind gelb."],
        ["Sieben plus fünf ist ___.", "zwölf", "elf", "zwanzig", "7 + 5 = 12"],
        ["Wo ist ___ Toilette, bitte?", "die", "der", "das", "die Toilette"],
      ],
    },
    {
      id: "A2",
      name: "Stadt",
      sky: ["#ffd29a", "#fff1dc"],
      hill: "#c9b8a6",
      hill2: "#a8967f",
      ground: "#6b6f7a",
      grass: "#9aa0ab",
      questions: [
        [
          "Gestern ___ ich ins Kino gegangen.",
          "bin",
          "habe",
          "war",
          "gehen → Perfekt mit sein",
        ],
        [
          "Ich ___ einen Brief geschrieben.",
          "habe",
          "bin",
          "hat",
          "schreiben → Perfekt mit haben",
        ],
        [
          "Ich gebe ___ Kind das Buch.",
          "dem",
          "den",
          "das",
          "wem? → Dativ: dem Kind",
        ],
        [
          "Wir fahren ___ Bus.",
          "mit dem",
          "mit den",
          "mit das",
          "mit + Dativ: mit dem Bus",
        ],
        ["Hier ___ du nicht rauchen.", "darfst", "dürft", "darf", "du darfst"],
        [
          "Ich lege das Handy auf ___ Tisch.",
          "den",
          "dem",
          "der",
          "Wohin? → Akkusativ",
        ],
        ["Das Handy liegt auf ___ Tisch.", "dem", "den", "der", "Wo? → Dativ"],
        [
          "Ich bleibe zu Hause, ___ ich krank bin.",
          "weil",
          "denn",
          "deshalb",
          "weil + Verb am Ende",
        ],
        [
          "Berlin ist ___ als Essen.",
          "größer",
          "großer",
          "am größten",
          "Komparativ: größer als",
        ],
        [
          "Ich interessiere ___ für Musik.",
          "mich",
          "mir",
          "sich",
          "ich interessiere mich",
        ],
        [
          "Wann ___ der Zug ab?",
          "fährt",
          "fahrt",
          "fahren",
          "der Zug fährt ab",
        ],
        ["Kannst du ___ helfen?", "mir", "mich", "ich", "helfen + Dativ: mir"],
        [
          "Als Kind ___ ich in einem Dorf.",
          "wohnte",
          "wohne",
          "gewohnt",
          "Präteritum: ich wohnte",
        ],
      ],
    },
    {
      id: "B1",
      name: "Bahnhof",
      sky: ["#c7a6ff", "#ffe1c4"],
      hill: "#8c7bb8",
      hill2: "#6e5f99",
      ground: "#5a4b3c",
      grass: "#c48a3a",
      questions: [
        [
          "Ich weiß nicht, ___ er heute kommt.",
          "ob",
          "wenn",
          "als",
          "indirekte Ja/Nein-Frage → ob",
        ],
        [
          "Das ist der Mann, ___ ich geholfen habe.",
          "dem",
          "den",
          "der",
          "helfen + Dativ → dem",
        ],
        [
          "Wenn ich Zeit ___, würde ich reisen.",
          "hätte",
          "habe",
          "hatte",
          "Konjunktiv II: hätte",
        ],
        [
          "Das Rathaus ___ 1950 gebaut.",
          "wurde",
          "wird",
          "würde",
          "Passiv Präteritum: wurde gebaut",
        ],
        [
          "Obwohl es regnet, ___ spazieren.",
          "gehen wir",
          "wir gehen",
          "wir gehen nicht",
          "Nach dem Nebensatz kommt das Verb zuerst.",
        ],
        [
          "Ich freue mich ___ das Wochenende.",
          "auf",
          "über",
          "für",
          "Zukunft → sich freuen auf",
        ],
        [
          "Er hat vergessen, die Tür ___.",
          "abzuschließen",
          "zu abschließen",
          "abschließen",
          "trennbar: ab-zu-schließen",
        ],
        [
          "Als ich nach Deutschland ___, sprach ich kein Deutsch.",
          "kam",
          "komme",
          "gekommen",
          "als + Präteritum",
        ],
        [
          "Je mehr ich lerne, ___ besser spreche ich.",
          "desto",
          "als",
          "wie",
          "je … desto",
        ],
        [
          "Ich warte schon lange ___ den Bus.",
          "auf",
          "für",
          "an",
          "warten auf",
        ],
        [
          "Die Frau, ___ Auto kaputt ist, ruft die Werkstatt an.",
          "deren",
          "dessen",
          "die",
          "die Frau → deren",
        ],
        [
          "Du siehst müde aus. Du ___ früher ins Bett gehen.",
          "solltest",
          "hättest",
          "wärst",
          "Rat: du solltest …",
        ],
      ],
    },
    {
      id: "B2",
      name: "Zeche",
      sky: ["#7fa3c7", "#d9e6f2"],
      hill: "#5f6f7f",
      hill2: "#46535f",
      ground: "#3d3a37",
      grass: "#7a6a55",
      questions: [
        [
          "Trotz ___ Regens fand das Fest statt.",
          "des",
          "dem",
          "den",
          "trotz + Genitiv: des Regens",
        ],
        [
          "Der Antrag muss bis Freitag eingereicht ___.",
          "werden",
          "sein",
          "worden",
          "Passiv mit Modalverb: muss … werden",
        ],
        [
          "Wir müssen jetzt eine Entscheidung ___.",
          "treffen",
          "machen",
          "stellen",
          "eine Entscheidung treffen",
        ],
        [
          "Er tut so, ___ er nichts gehört hätte.",
          "als ob",
          "obwohl",
          "damit",
          "irrealer Vergleich: als ob",
        ],
        [
          "Das Problem ___ sich leicht lösen.",
          "lässt",
          "wird",
          "ist",
          "sich lassen + Infinitiv",
        ],
        [
          "Ich beziehe mich ___ Ihre E-Mail vom 3. Mai.",
          "auf",
          "an",
          "zu",
          "sich beziehen auf",
        ],
        [
          "Nicht nur die Kosten, ___ auch die Zeit ist wichtig.",
          "sondern",
          "aber",
          "oder",
          "nicht nur … sondern auch",
        ],
        [
          "Die Kosten werden von der Firma ___.",
          "übernommen",
          "übernehmen",
          "übernahmen",
          "Passiv: werden + Partizip II",
        ],
        [
          "___ der Verspätung bitten wir um Entschuldigung.",
          "Wegen",
          "Trotz",
          "Statt",
          "Grund → wegen",
        ],
        [
          "Sie hat bestanden, ___ sie wenig gelernt hatte.",
          "obwohl",
          "weil",
          "damit",
          "Gegensatz → obwohl",
        ],
        [
          "Wer übernimmt die ___ für das Projekt?",
          "Verantwortung",
          "Verantworten",
          "Antwort",
          "die Verantwortung übernehmen",
        ],
        [
          "Kaum ___ er angekommen, klingelte das Telefon.",
          "war",
          "hatte",
          "ist",
          "ankommen → Plusquamperfekt mit sein",
        ],
      ],
    },
    {
      id: "C1",
      name: "Nachtstadt",
      sky: ["#1d2550", "#4a3f7a"],
      hill: "#2c3466",
      hill2: "#222a55",
      ground: "#2a2433",
      grass: "#6b5bb3",
      questions: [
        [
          "Die ___ Regeln vergisst man nicht so schnell.",
          "mühsam gelernten",
          "mühsam lernenden",
          "mühsam gelernte",
          "Partizipialattribut: die mühsam gelernten Regeln",
        ],
        [
          "Der Minister sagte, er ___ nichts davon gewusst.",
          "habe",
          "hat",
          "hatte",
          "indirekte Rede: Konjunktiv I",
        ],
        [
          "Angesichts ___ Lage müssen wir handeln.",
          "der schwierigen",
          "die schwierige",
          "dem schwierigen",
          "angesichts + Genitiv",
        ],
        [
          "Sie hat mir reinen ___ eingeschenkt.",
          "Wein",
          "Wasser",
          "Saft",
          "jemandem reinen Wein einschenken = die Wahrheit sagen",
        ],
        [
          "Mit dem neuen Job ist sie ins kalte ___ gesprungen.",
          "Wasser",
          "Meer",
          "Bad",
          "ins kalte Wasser springen",
        ],
        [
          "„Weil die Preise steigen“ im Nominalstil: ___",
          "aufgrund der steigenden Preise",
          "wegen die Preise steigen",
          "trotz steigender Preise",
          "aufgrund + Genitiv",
        ],
        [
          "___ er sich auch bemüht, er schafft es nicht.",
          "So sehr",
          "Obwohl",
          "Weil",
          "konzessiv: so sehr … auch",
        ],
        [
          "Hätte ich das gewusst, ___ ich früher gekommen.",
          "wäre",
          "hätte",
          "würde",
          "kommen → Konjunktiv II Vergangenheit mit sein",
        ],
        [
          "Er ist ein Mensch, auf ___ man sich verlassen kann.",
          "den",
          "dem",
          "dessen",
          "sich verlassen auf + Akkusativ",
        ],
        [
          "Der Vorschlag stieß auf breite ___.",
          "Zustimmung",
          "Erlaubnis",
          "Abstimmung",
          "auf Zustimmung stoßen",
        ],
        [
          "Infolge ___ Sturms fiel der Strom aus.",
          "des",
          "dem",
          "den",
          "infolge + Genitiv",
        ],
        [
          "Die Ergebnisse sind mit ___ zu interpretieren.",
          "Vorsicht",
          "vorsichtig",
          "Vorsichten",
          "mit Vorsicht",
        ],
      ],
    },
  ];
  const GATES = 6,
    KEY = "dm-lino";
  const load = () => {
    try {
      return JSON.parse(localStorage.getItem(KEY) || "{}");
    } catch {
      return {};
    }
  };
  const save = (s) => {
    try {
      localStorage.setItem(KEY, JSON.stringify(s));
    } catch {}
  };

  // Spielfigur: Junge (Lino) oder Mädchen (Lina), 5 Hautfarben, Mädchen wahlweise mit Kopftuch
  const SKINS = ["#f7dcc6", "#eab98c", "#c98c5a", "#8f5b36", "#5c3a24"],
    HAIRS = ["#a5652e", "#5a3a22", "#2e1f15", "#1f1510", "#130d09"],
    SKIN_NAMES = ["sehr hell", "hell", "mittel", "dunkel", "sehr dunkel"],
    HIJAB = "#7a3fa8";
  const heroLook = (l) => {
    l = l || {};
    const g = l.g === "f" ? "f" : "m";
    const skin = Number.isInteger(l.skin) && l.skin >= 0 && l.skin < SKINS.length ? l.skin : 1;
    return { g, skin, hijab: g === "f" && !!l.hijab };
  };
  const heroName = (l) => (l.g === "f" ? "Lina" : "Lino");
  function drawHero(c, x, y, look, air, ph, t) {
    const rr = (X, Y, W, H, R) => {
      c.beginPath();
      c.moveTo(X + R, Y);
      c.arcTo(X + W, Y, X + W, Y + H, R);
      c.arcTo(X + W, Y + H, X, Y + H, R);
      c.arcTo(X, Y + H, X, Y, R);
      c.arcTo(X, Y, X + W, Y, R);
      c.closePath();
    };
    const girl = look.g === "f",
      skin = SKINS[look.skin],
      hair = HAIRS[look.skin],
      top = girl ? "#c2185b" : "#2341B5";
    // Beine
    c.strokeStyle = "#2b2f45";
    c.lineWidth = 5;
    c.lineCap = "round";
    const l1 = air ? 4 : Math.sin(ph) * 6,
      l2 = air ? -3 : -Math.sin(ph) * 6;
    c.beginPath();
    c.moveTo(x + 8, y + 24);
    c.lineTo(x + 8 + l1, y + 33);
    c.moveTo(x + 15, y + 24);
    c.lineTo(x + 15 + l2, y + 33);
    c.stroke();
    // Rucksack
    c.fillStyle = "#ffc928";
    rr(x - 5, y + 11, 9, 13, 3);
    c.fill();
    // Pferdeschwanz (Mädchen ohne Kopftuch) – hinter dem Kopf
    if (girl && !look.hijab) {
      const sw = Math.sin(t * 10) * 1.5;
      c.fillStyle = hair;
      c.beginPath();
      c.ellipse(x + 3, y + 7 + sw, 3.6, 7, -0.45, 0, 7);
      c.fill();
    }
    // Körper (Kapuzenpulli, beim Mädchen etwas länger wie eine Tunika)
    c.fillStyle = top;
    rr(x + 1, y + 10, 21, girl ? 18 : 16, 6);
    c.fill();
    // Arm
    c.strokeStyle = top;
    c.lineWidth = 5;
    c.beginPath();
    c.moveTo(x + 14, y + 15);
    c.lineTo(x + 21 + (air ? 3 : Math.cos(ph) * 3), y + (air ? 6 : 21));
    c.stroke();
    if (look.hijab) {
      // Kopftuch: umrahmt das Gesicht und fällt über die Schultern
      c.fillStyle = HIJAB;
      c.beginPath();
      c.arc(x + 13, y + 6, 10, 0, 7);
      c.fill();
      rr(x + 3, y + 6, 19, 10, 4);
      c.fill();
      c.fillStyle = skin;
      c.beginPath();
      c.ellipse(x + 14.5, y + 6.8, 5.4, 6.4, 0, 0, 7);
      c.fill();
    } else {
      // Kopf und Haare
      c.fillStyle = skin;
      c.beginPath();
      c.arc(x + 13, y + 6, 8, 0, 7);
      c.fill();
      c.fillStyle = hair;
      c.beginPath();
      c.arc(x + 12, y + 3, 8, Math.PI * 1.05, Math.PI * 1.95);
      c.fill();
      if (girl) {
        c.beginPath();
        c.arc(x + 9, y + 4, 5, Math.PI * 0.6, Math.PI * 1.6);
        c.fill();
      }
    }
    // Auge
    c.fillStyle = "#172036";
    c.beginPath();
    c.arc(x + 17, y + 6, 1.6, 0, 7);
    c.fill();
    if (girl) {
      c.strokeStyle = "#172036";
      c.lineWidth = 1;
      c.beginPath();
      c.moveTo(x + 17.5, y + 4.4);
      c.lineTo(x + 19.2, y + 3.3);
      c.stroke();
    }
    // Schal (nicht zusammen mit Kopftuch)
    if (!look.hijab) {
      c.fillStyle = "#ff7a2f";
      c.fillRect(x + 4, y + 11, 16, 4);
      const fl = Math.sin(t * 16) * 3;
      c.beginPath();
      c.moveTo(x + 4, y + 11);
      c.lineTo(x - 8, y + 9 + fl);
      c.lineTo(x - 7, y + 15 + fl);
      c.lineTo(x + 4, y + 15);
      c.fill();
    }
    c.lineCap = "butt";
  }

  // kleiner Zufallsgenerator mit Startwert – jede Welt sieht immer gleich aus
  const rng = (seed) => () => {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return seed / 4294967296;
  };

  function buildLevel(L) {
    const r = rng(1234 + L * 97),
      T = 32;
    const solid = [],
      coins = [],
      enemies = [],
      plats = [],
      gates = [];
    const add = (n) => {
      for (let i = 0; i < n; i++) solid.push(true);
    };
    const hole = (n) => {
      for (let i = 0; i < n; i++) solid.push(false);
    };
    const gapMin = L < 2 ? 2 : 2,
      gapMax = L < 2 ? 2 : 3;
    add(10);
    for (let g = 0; g < GATES; g++) {
      add(3);
      const feats = [];
      const nGap = [1, 1, 2, 2, 2][L] + (r() < 0.35 && L > 0 ? 1 : 0);
      const nEn = [g > 1 ? 1 : 0, 1, 1, 2, 2][L] + (r() < 0.3 && L > 2 ? 1 : 0);
      for (let i = 0; i < nGap; i++) feats.push("gap");
      for (let i = 0; i < nEn; i++) feats.push("enemy");
      feats.push("plat");
      for (let i = feats.length - 1; i > 0; i--) {
        const j = Math.floor(r() * (i + 1));
        [feats[i], feats[j]] = [feats[j], feats[i]];
      }
      for (const f of feats) {
        if (f === "gap") {
          const w = gapMin + Math.floor(r() * (gapMax - gapMin + 1)),
            x0 = solid.length;
          hole(w);
          for (let k = 0; k < 3; k++)
            coins.push({
              x: (x0 + w / 2) * T + (k - 1) * 22,
              y: 360 - 48 - 70 - (k === 1 ? 18 : 0),
              got: false,
            });
          add(5);
        } else if (f === "enemy") {
          const x0 = solid.length;
          add(L >= 2 ? 10 : 8); // Platz nach dem Käfer, damit danach keine Lücke direkt folgt
          enemies.push({
            x: (x0 + 4) * T,
            min: (x0 + 1) * T,
            max: (x0 + 6) * T,
            dir: -1,
            sp: 22 + L * 9,
            alive: true,
            t: r() * 6,
          });
        } else {
          const x0 = solid.length;
          add(7);
          plats.push({ x: (x0 + 2) * T, y: 360 - 48 - 78, w: 3 * T });
          for (let k = 0; k < 3; k++)
            coins.push({
              x: (x0 + 2) * T + 16 + k * 32,
              y: 360 - 48 - 104,
              got: false,
            });
        }
      }
      add(4);
      gates.push({ x: solid.length * T, open: false, ok: null });
      add(5);
    }
    add(8);
    const goal = solid.length * T;
    add(12);
    return {
      solid,
      coins,
      enemies,
      plats,
      gates,
      goal,
      T,
      len: solid.length * T,
    };
  }

  DMGame.register({
    id: "lino",
    cat: "abenteuer",
    title: "Lino läuft – das Deutsch-Abenteuer",
    icon: "🏃",
    level: "A1–C1",
    desc: "Jump’n’Run in 5 Welten: Springe über Lücken und Fehlerkäfer und löse an jedem Tor eine Deutschfrage – von A1 bis C1.",
    intro:
      "Wähle zuerst deine Figur: Junge (Lino) oder Mädchen (Lina), Hautfarbe und – beim Mädchen – mit oder ohne Kopftuch. Deine Figur läuft von selbst. Tippe auf das Spielfeld oder den großen Knopf (am Computer: Leertaste oder ↑), um zu springen – lange drücken springt höher. Springe über Lücken, hüpf auf die Fehlerkäfer und sammle Münzen. An jedem Tor wartet eine Frage. Jede Welt ist schwerer: A1, A2, B1, B2, C1.",
    start(api) {
      const prog = load();
      prog.unlocked = Math.max(1, prog.unlocked || 1);
      let total = 0;
      const wrongAll = [];
      menu();

      function menu() {
        api.clearFeedback();
        api.hud({ step: "Welt wählen", progress: 0, score: total });
        const lk = heroLook(prog.look);
        api.el.innerHTML = `<div class="sp-lino-pick">
            <canvas class="sp-lino-prev" width="192" height="224" role="img" aria-label="Deine Spielfigur"></canvas>
            <div class="sp-lino-opts">
              <p class="sp-lino-ptitle">Deine Figur: <b>${heroName(lk)}</b></p>
              <div class="sp-lino-row" role="group" aria-label="Junge oder Mädchen">
                <button type="button" data-g="m" aria-pressed="${lk.g === "m"}">👦 Junge</button>
                <button type="button" data-g="f" aria-pressed="${lk.g === "f"}">👧 Mädchen</button>
              </div>
              <div class="sp-lino-row sp-lino-skins" role="group" aria-label="Hautfarbe">${SKINS.map((c, k) => `<button type="button" data-skin="${k}" aria-pressed="${lk.skin === k}" aria-label="Hautfarbe ${SKIN_NAMES[k]}" title="${SKIN_NAMES[k]}" style="--sk:${c}"></button>`).join("")}</div>
              ${lk.g === "f" ? `<div class="sp-lino-row" role="group" aria-label="Kopftuch">
                <button type="button" data-h="0" aria-pressed="${!lk.hijab}">ohne Kopftuch</button>
                <button type="button" data-h="1" aria-pressed="${lk.hijab}">mit Kopftuch</button>
              </div>` : ""}
            </div>
          </div>
          <p class="dm-small" style="margin:0 0 8px">Wähle eine Welt. Jede neue Welt öffnet sich, wenn du die vorherige geschafft hast.</p>
          <div class="sp-lino-levels">${WORLDS.map((w, i) => {
            const open = i < prog.unlocked,
              best = prog["best" + w.id];
            return `<button type="button" class="sp-lino-lv" data-i="${i}"${open ? "" : " disabled"}><i aria-hidden="true">${open ? (best != null ? "⭐" : "▶") : "🔒"}</i><b>${w.id}</b><span>Welt ${i + 1}: ${w.name}</span><small>${best != null ? `Rekord: ${best} Punkte` : open ? "Bereit" : "Noch gesperrt"}</small></button>`;
          }).join("")}</div>
          ${prog.unlocked < WORLDS.length ? '<p style="text-align:center;margin:6px 0 0"><button type="button" class="sp-lino-unlock">Ich kann schon mehr – alle Welten öffnen</button></p>' : ""}`;
        const pc = api.el.querySelector(".sp-lino-prev");
        if (pc) {
          const c2 = pc.getContext("2d");
          c2.setTransform(4.6, 0, 0, 4.6, 0, 0);
          drawHero(c2, 12.5, 7.5, lk, false, 0.7, 0.3);
        }
        const setLook = (ch) => {
          prog.look = heroLook({ ...lk, ...ch });
          save(prog);
          const keep = document.activeElement?.matches?.("[data-g],[data-skin],[data-h]") ? document.activeElement.outerHTML.match(/data-(g|skin|h)="[^"]*"/)[0] : null;
          menu();
          if (keep) api.el.querySelector(`[${keep}]`)?.focus({ preventScroll: true });
        };
        api.el.querySelectorAll("[data-g]").forEach((b) => (b.onclick = () => setLook({ g: b.dataset.g, hijab: b.dataset.g === "f" ? lk.hijab : false })));
        api.el.querySelectorAll("[data-skin]").forEach((b) => (b.onclick = () => setLook({ skin: +b.dataset.skin })));
        api.el.querySelectorAll("[data-h]").forEach((b) => (b.onclick = () => setLook({ hijab: b.dataset.h === "1" })));
        api.el
          .querySelectorAll(".sp-lino-lv")
          .forEach((b) => (b.onclick = () => play(+b.dataset.i)));
        const u = api.el.querySelector(".sp-lino-unlock");
        if (u)
          u.onclick = () => {
            prog.unlocked = WORLDS.length;
            save(prog);
            menu();
          };
        if (!document.activeElement?.closest?.(".sp-lino-pick"))
          api.el
            .querySelector(".sp-lino-lv:not(:disabled)")
            ?.focus({ preventScroll: true });
      }

      function play(L) {
        api.clearFeedback();
        const W0 = WORLDS[L];
        const look = heroLook(prog.look);
        const qs = api.shuffle(W0.questions).slice(0, GATES);
        const lvl = buildLevel(L);
        const narrow = api.el.clientWidth < 520;
        const VW = narrow ? 480 : 640,
          VH = 360,
          GROUND = VH - 48,
          T = lvl.T;
        const dpr = Math.min(2, window.devicePixelRatio || 1);
        api.el.innerHTML = `<div class="sp-lino-wrap"><canvas width="${VW * dpr}" height="${VH * dpr}" aria-label="Spielfeld: ${heroName(look)} läuft durch die Welt ${W0.id}" role="img"></canvas><div class="sp-lino-banner">Welt ${W0.id}: ${W0.name}</div></div>
          <div class="sp-lino-panel"></div>`;
        const cv = api.el.querySelector("canvas"),
          ctx = cv.getContext("2d"),
          panel = api.el.querySelector(".sp-lino-panel"),
          banner = api.el.querySelector(".sp-lino-banner");
        ctx.scale(dpr, dpr);
        // Auf kleinen Bildschirmen (z. B. Handy quer) Spielfeld und Sprungknopf ganz zeigen
        requestAnimationFrame(() => {
          const card = api.el.closest(".sp-play") || api.el;
          const b = panel.getBoundingClientRect();
          if (b.top + 80 > innerHeight) card.scrollIntoView({ block: "start", behavior: "smooth" });
        });
        const speed = 138 + L * 16,
          G = 1650,
          JUMP = 667;
        const P = {
          x: 3 * T,
          y: GROUND - 34,
          w: 22,
          h: 34,
          vy: 0,
          onGround: true,
          inv: 0,
          run: 0,
        };
        let camX = 0,
          lives = 3,
          score = 0,
          right = 0,
          coinsGot = 0,
          gateIdx = 0,
          checkpoint = 3 * T;
        let coyote = 0,
          buffer = 0,
          state = "run",
          last = 0,
          held = false,
          holdT = 0,
          raf = 0,
          ended = false,
          deadT = 0;
        const wrong = [];
        setTimeout(() => {
          banner.hidden = true;
        }, 2200);

        function hud() {
          api.hud({
            step: `${W0.id} · Tor ${Math.min(gateIdx + 1, GATES)}/${GATES}`,
            progress: gateIdx / GATES,
            score: total + score,
            lives,
            maxLives: 3,
          });
        }
        hud();
        runPanel();

        function runPanel() {
          panel.innerHTML = `<button type="button" class="sp-lino-jump" aria-label="Springen"><span aria-hidden="true">⤒</span> Springen</button>
            <p class="sp-lino-hint">Tippe aufs Spielfeld oder den Knopf · Lange drücken = höher · Am Computer: Leertaste</p>`;
          const jb = panel.querySelector(".sp-lino-jump");
          jb.addEventListener("pointerdown", (e) => {
            e.preventDefault();
            press();
          });
          jb.addEventListener("pointerup", release);
          jb.addEventListener("pointerleave", release);
          jb.addEventListener("pointercancel", release);
          jb.addEventListener("contextmenu", (e) => e.preventDefault());
          jb.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              press();
              setTimeout(release, 160);
            }
          });
        }

        function press() {
          if (state !== "run") return;
          held = true;
          holdT = 0;
          if (P.onGround || coyote > 0) {
            P.vy = -JUMP * 0.78;
            P.onGround = false;
            coyote = 0;
            buffer = 0;
          } else buffer = 0.14; // kurz vor der Landung gedrückt → Sprung direkt nach der Landung
        }
        function release() {
          // Loslassen beendet nur den Extra-Schub – ein kurzes Tippen ergibt trotzdem einen vollen Sprung
          held = false;
        }
        cv.addEventListener("pointerdown", (e) => {
          e.preventDefault();
          press();
        });
        cv.addEventListener("pointerup", release);
        cv.addEventListener("pointercancel", release);
        api.el.querySelector(".sp-lino-wrap").addEventListener("contextmenu", (e) => e.preventDefault());
        const onKey = (e) => {
          if (!api.el.isConnected) return removeEventListener("keydown", onKey);
          if (
            [" ", "ArrowUp", "w", "W"].includes(e.key) &&
            state === "run" &&
            !/INPUT|TEXTAREA/.test(document.activeElement?.tagName || "")
          ) {
            e.preventDefault();
            if (e.type === "keydown" && !e.repeat) press();
            if (e.type === "keyup") release();
          }
        };
        addEventListener("keydown", onKey);
        addEventListener("keyup", onKey);
        const onVis = () => {
          if (document.hidden && state === "run") {
            state = "pause";
          } else if (!document.hidden && state === "pause") {
            state = "run";
            last = 0;
          }
        };
        document.addEventListener("visibilitychange", onVis);
        function cleanup() {
          removeEventListener("keydown", onKey);
          removeEventListener("keyup", onKey);
          document.removeEventListener("visibilitychange", onVis);
          cancelAnimationFrame(raf);
        }

        function solidAt(px) {
          const i = Math.floor(px / T);
          return i >= 0 && i < lvl.solid.length && lvl.solid[i];
        }

        function hit() {
          if (P.inv > 0 || state !== "run") return;
          lives--;
          api.vibrate();
          hud();
          if (lives <= 0) {
            state = "dead";
            deadT = 0;
            return;
          }
          state = "respawn";
          deadT = 0;
        }

        function respawn() {
          P.x = checkpoint;
          P.y = GROUND - P.h;
          P.vy = 0;
          P.onGround = true;
          P.inv = 1.6;
          state = "run";
        }

        function step(dt) {
          P.run += dt;
          if (P.inv > 0) P.inv -= dt;
          // Bewegung nach rechts bis zum nächsten Tor
          const gate = lvl.gates[gateIdx];
          let vx = speed;
          if (gate && !gate.open && P.x + P.w >= gate.x - 6) {
            vx = 0;
            P.x = gate.x - 6 - P.w;
            if (P.onGround) return askGate();
          }
          P.x += vx * dt;
          if (held && P.vy < 0 && holdT < 0.26) {
            holdT += dt;
            P.vy -= 1200 * dt;
          }
          P.vy += G * dt;
          if (P.vy > 900) P.vy = 900;
          const oldBottom = P.y + P.h;
          P.y += P.vy * dt;
          const wasGround = P.onGround;
          P.onGround = false;
          // Plattformen (nur von oben)
          for (const pl of lvl.plats) {
            if (
              P.x + P.w > pl.x + 2 &&
              P.x < pl.x + pl.w - 2 &&
              oldBottom <= pl.y + 1 &&
              P.y + P.h >= pl.y &&
              P.vy >= 0
            ) {
              P.y = pl.y - P.h;
              P.vy = 0;
              P.onGround = true;
            }
          }
          // Boden
          if (
            P.y + P.h >= GROUND &&
            oldBottom <= GROUND + 16 &&
            P.vy >= 0 &&
            (solidAt(P.x + 2) || solidAt(P.x + P.w - 2) || solidAt(P.x + P.w / 2 - P.vy * dt * 0.3))
          ) {
            P.y = GROUND - P.h;
            P.vy = 0;
            P.onGround = true;
          }
          if (buffer > 0) {
            buffer -= dt;
            if (P.onGround) {
              buffer = 0;
              P.vy = -JUMP * 0.78;
              P.onGround = false;
              holdT = 0;
            }
          }
          if (P.onGround) coyote = 0.11;
          else if (wasGround && P.vy >= 0) coyote = Math.max(coyote, 0.11);
          else coyote = Math.max(0, coyote - dt);
          if (P.y > VH + 40) {
            P.inv = 0;
            hit();
          }
          // Münzen
          for (const c of lvl.coins)
            if (
              !c.got &&
              Math.abs(c.x - (P.x + P.w / 2)) < 18 &&
              Math.abs(c.y - (P.y + P.h / 2)) < 24
            ) {
              c.got = true;
              coinsGot++;
              score += 10;
              hud();
            }
          // Fehlerkäfer
          for (const en of lvl.enemies) {
            if (!en.alive) continue;
            en.t += dt;
            en.x += en.dir * en.sp * dt;
            if (en.x < en.min) {
              en.x = en.min;
              en.dir = 1;
            }
            if (en.x > en.max) {
              en.x = en.max;
              en.dir = -1;
            }
            const ex = en.x - 14,
              ey = GROUND - 22;
            if (
              P.x + P.w > ex + 4 &&
              P.x < ex + 24 &&
              P.y + P.h > ey + 2 &&
              P.y < GROUND
            ) {
              if (P.vy > 0 && oldBottom <= ey + 10) {
                en.alive = false;
                en.dead = 0.5;
                P.vy = -JUMP * 0.62;
                score += 50;
                hud();
              } else hit();
            }
          }
          for (const en of lvl.enemies)
            if (!en.alive && en.dead > 0) en.dead -= dt;
          // Ziel
          if (gateIdx >= GATES && P.x >= lvl.goal) {
            state = "goal";
            finishLevel();
          }
          camX = Math.max(0, Math.min(lvl.len - VW, P.x - VW * 0.3));
        }

        function askGate() {
          state = "ask";
          held = false;
          const [q, a, w1, w2, tip] = qs[gateIdx];
          const opts = api.shuffle([a, w1, w2]);
          const qHtml = api
            .esc(q)
            .replace("___", '<span class="sp-lino-gap">&nbsp;</span>');
          panel.innerHTML = `<div class="sp-lino-q" role="group" aria-label="Frage am Tor"><span class="sp-lino-tag">🚪 Tor ${gateIdx + 1} von ${GATES} · ${W0.id}</span>
            <p class="sp-lino-text">${qHtml}</p>
            <div class="ch-opts">${opts.map((o, k) => `<button type="button" class="ch-opt" data-k="${k}"><kbd>${k + 1}</kbd><span>${api.esc(o)}</span></button>`).join("")}</div></div>`;
          const btns = [...panel.querySelectorAll(".ch-opt")];
          btns[0].focus({ preventScroll: true });
          if (panel.getBoundingClientRect().bottom > innerHeight)
            panel.scrollIntoView({ block: "end", behavior: "smooth" });
          btns.forEach(
            (b, k) =>
              (b.onclick = () => {
                const ok = opts[k] === a,
                  gate = lvl.gates[gateIdx];
                btns.forEach((x, j) => {
                  x.disabled = true;
                  if (opts[j] === a) x.classList.add("is-right");
                });
                if (!ok) b.classList.add("is-wrong");
                const gap = panel.querySelector(".sp-lino-gap");
                if (gap) {
                  gap.textContent = a;
                  gap.classList.add("is-ok");
                }
                gate.open = true;
                gate.ok = ok;
                if (ok) {
                  right++;
                  score += 100;
                } else {
                  lives--;
                  api.vibrate();
                  const c = q.replace("___", a);
                  wrong.push({ correct: c, tip });
                  wrongAll.push({ correct: c, tip });
                }
                hud();
                api.feedback(
                  ok,
                  ok
                    ? `<b>Richtig! Das Tor ist offen. +100</b><span>${api.esc(tip)}</span>`
                    : `<b>Leider falsch – ein Herz weniger.</b><span>Richtig: <b>${api.esc(a)}</b> · ${api.esc(tip)}</span>`,
                );
                if (lives <= 0) {
                  api.next("Weiter", () => {
                    state = "dead";
                    deadT = 1;
                  });
                  return;
                }
                api.next("Weiter laufen ▶", () => {
                  api.clearFeedback();
                  gateIdx++;
                  checkpoint = gate.x + 10;
                  hud();
                  runPanel();
                  state = "run";
                  last = 0;
                  panel
                    .querySelector(".sp-lino-jump")
                    ?.focus({ preventScroll: true });
                  cv.scrollIntoView({ block: "nearest", behavior: "smooth" });
                });
                // „Weiter laufen“ auf dem Handy sichtbar machen
                setTimeout(() => {
                  const nb = document.getElementById("sp-next");
                  if (nb && nb.getBoundingClientRect().bottom > innerHeight) nb.scrollIntoView({ block: "end", behavior: "smooth" });
                }, 60);
              }),
          );
        }

        function finishLevel() {
          cleanup();
          const bonus = lives * 50;
          score += bonus;
          total += score;
          hud();
          const stars = right >= 6 ? 3 : right >= 4 ? 2 : 1;
          prog["best" + W0.id] = Math.max(prog["best" + W0.id] || 0, score);
          if (L + 2 > prog.unlocked)
            prog.unlocked = Math.min(WORLDS.length, L + 2);
          save(prog);
          const nextW = WORLDS[L + 1];
          panel.innerHTML = `<div class="sp-lino-res"><div class="sp-lino-stars" aria-label="${stars} von 3 Sternen">${"⭐".repeat(stars)}${"☆".repeat(3 - stars)}</div>
            <h2>Welt ${W0.id} geschafft!</h2>
            <p>${right} von ${GATES} Fragen richtig · ${coinsGot} Münzen · Herz-Bonus ${bonus}<br><b>${score} Punkte</b></p>
            <div class="ch-actions">${nextW ? `<button type="button" class="dm-btn ch-go" id="sp-lino-next">Weiter zu Welt ${nextW.id} ▶</button>` : `<button type="button" class="dm-btn ch-go" id="sp-lino-end">Abenteuer beenden 🏆</button>`}
              <button type="button" class="dm-btn dm-btn-quiet" id="sp-lino-menu">Weltkarte</button></div></div>`;
          DM.celebrate?.(panel);
          panel
            .querySelector("#sp-lino-next")
            ?.addEventListener("click", () => play(L + 1));
          panel
            .querySelector("#sp-lino-end")
            ?.addEventListener("click", () =>
              api.finish({ score: total, max: 0, wrong: wrongAll }),
            );
          panel.querySelector("#sp-lino-menu").onclick = menu;
          (
            panel.querySelector("#sp-lino-next") ||
            panel.querySelector("#sp-lino-end")
          ).focus({ preventScroll: true });
          panel.scrollIntoView({ block: "nearest", behavior: "smooth" });
        }

        function gameOver() {
          cleanup();
          api.clearFeedback();
          panel.innerHTML = `<div class="sp-lino-res"><div class="sp-lino-stars" aria-hidden="true">💔</div><h2>Keine Herzen mehr</h2>
            <p>Du hast ${right} von ${GATES} Fragen richtig beantwortet. Versuch es noch einmal – die Welt bleibt gleich, die Fragen wechseln.</p>
            <div class="ch-actions"><button type="button" class="dm-btn ch-go" id="sp-lino-retry">Welt ${W0.id} neu starten</button><button type="button" class="dm-btn dm-btn-quiet" id="sp-lino-stop">Beenden</button></div></div>`;
          panel.querySelector("#sp-lino-retry").onclick = () => play(L);
          panel.querySelector("#sp-lino-stop").onclick = () =>
            api.finish({ score: total + score, max: 0, wrong: wrongAll });
          panel.querySelector("#sp-lino-retry").focus({ preventScroll: true });
        }

        /* ---------- Zeichnen ---------- */
        function draw() {
          const t = performance.now() / 1000;
          const g = ctx.createLinearGradient(0, 0, 0, VH);
          g.addColorStop(0, W0.sky[0]);
          g.addColorStop(1, W0.sky[1]);
          ctx.fillStyle = g;
          ctx.fillRect(0, 0, VW, VH);
          if (L === 4) {
            ctx.fillStyle = "rgba(255,255,255,.8)";
            for (let i = 0; i < 40; i++) {
              const sx = (i * 137 - camX * 0.05) % VW,
                sy = (i * 53) % 170;
              ctx.fillRect((sx + VW) % VW, sy, 2, 2);
            }
            ctx.fillStyle = "#f5f0c8";
            ctx.beginPath();
            ctx.arc(VW - 80, 60, 24, 0, 7);
            ctx.fill();
          } else {
            ctx.fillStyle = "rgba(255,255,255,.85)";
            for (let i = 0; i < 5; i++) {
              const cx = (i * 230 + 60 - camX * 0.15) % (VW + 200);
              cloud(((cx + VW + 200) % (VW + 200)) - 100, 50 + (i % 3) * 30);
            }
          }
          hills(W0.hill2, 0.25, 150, 70);
          hills(W0.hill, 0.45, 110, 50);
          if (L === 1 || L === 4) city();
          if (L === 3) zeche();
          ctx.save();
          ctx.translate(-Math.round(camX), 0);
          // Boden
          const i0 = Math.max(0, Math.floor(camX / T) - 1),
            i1 = Math.min(lvl.solid.length, i0 + Math.ceil(VW / T) + 3);
          for (let i = i0; i < i1; i++)
            if (!lvl.solid[i]) {
              const pit = ctx.createLinearGradient(0, GROUND, 0, VH);
              pit.addColorStop(0, "rgba(20,14,10,.55)");
              pit.addColorStop(1, "rgba(5,3,2,.95)");
              ctx.fillStyle = pit;
              ctx.fillRect(i * T, GROUND + 6, T, VH - GROUND);
            } else {
              ctx.fillStyle = W0.ground;
              ctx.fillRect(i * T, GROUND, T, VH - GROUND);
              ctx.fillStyle = W0.grass;
              ctx.fillRect(i * T, GROUND, T, 9);
              ctx.fillStyle = "rgba(0,0,0,.12)";
              ctx.fillRect(i * T + (i % 2 ? 6 : 18), GROUND + 20, 6, 6);
            }
          // Plattformen (Holzkisten)
          for (const pl of lvl.plats)
            for (let k = 0; k < pl.w / T; k++) {
              const x = pl.x + k * T;
              ctx.fillStyle = "#c98b4b";
              ctx.fillRect(x, pl.y, T - 1, 22);
              ctx.strokeStyle = "#8b5a2b";
              ctx.lineWidth = 2;
              ctx.strokeRect(x + 1, pl.y + 1, T - 3, 20);
              ctx.beginPath();
              ctx.moveTo(x + 2, pl.y + 2);
              ctx.lineTo(x + T - 3, pl.y + 20);
              ctx.stroke();
            }
          // Münzen
          for (const c of lvl.coins)
            if (!c.got) {
              const sx = Math.abs(Math.cos(t * 3 + c.x));
              ctx.fillStyle = "#ffc928";
              ctx.beginPath();
              ctx.ellipse(
                c.x,
                c.y + Math.sin(t * 3 + c.x) * 2,
                9 * Math.max(0.25, sx),
                10,
                0,
                0,
                7,
              );
              ctx.fill();
              ctx.strokeStyle = "#d18f00";
              ctx.lineWidth = 2;
              ctx.stroke();
              if (sx > 0.6) {
                ctx.fillStyle = "#9a6400";
                ctx.font = "800 11px system-ui,sans-serif";
                ctx.textAlign = "center";
                ctx.fillText("Ä", c.x, c.y + 4 + Math.sin(t * 3 + c.x) * 2);
              }
            }
          // Tore
          lvl.gates.forEach((gt, k) => {
            const x = gt.x,
              top = GROUND - 92;
            ctx.fillStyle = "#7d7f8c";
            ctx.fillRect(x - 4, top, 12, 92);
            ctx.fillRect(x + 34, top, 12, 92);
            ctx.fillStyle = gt.open
              ? gt.ok
                ? "#1f9d55"
                : "#d6332b"
              : "#2341B5";
            roundRect(x - 10, top - 26, 62, 30, 8);
            ctx.fill();
            ctx.fillStyle = "#fff";
            ctx.font = "800 15px system-ui,sans-serif";
            ctx.textAlign = "center";
            ctx.fillText(
              gt.open ? (gt.ok ? "✓" : "✗") : `Tor ${k + 1}`,
              x + 21,
              top - 6,
            );
            if (!gt.open) {
              ctx.fillStyle = "rgba(35,65,181,.25)";
              ctx.fillRect(x + 8, top, 26, 92);
              ctx.strokeStyle = "#2341B5";
              ctx.lineWidth = 2;
              for (let yy = top + 8; yy < GROUND; yy += 14) {
                ctx.beginPath();
                ctx.moveTo(x + 8, yy);
                ctx.lineTo(x + 34, yy);
                ctx.stroke();
              }
            }
          });
          // Ziel: Haus mit Fahne
          const gx = lvl.goal + 40;
          ctx.fillStyle = "#fff3d6";
          ctx.fillRect(gx, GROUND - 70, 80, 70);
          ctx.fillStyle = "#e5622b";
          ctx.beginPath();
          ctx.moveTo(gx - 8, GROUND - 70);
          ctx.lineTo(gx + 40, GROUND - 110);
          ctx.lineTo(gx + 88, GROUND - 70);
          ctx.fill();
          ctx.fillStyle = "#2341B5";
          ctx.fillRect(gx + 30, GROUND - 40, 20, 40);
          ctx.fillStyle = "#555";
          ctx.fillRect(gx + 64, GROUND - 160, 4, 90);
          ctx.fillStyle = "#ffc928";
          ctx.beginPath();
          ctx.moveTo(gx + 68, GROUND - 160);
          ctx.lineTo(gx + 104 + Math.sin(t * 4) * 3, GROUND - 150);
          ctx.lineTo(gx + 68, GROUND - 138);
          ctx.fill();
          ctx.fillStyle = "#172036";
          ctx.font = "800 13px system-ui,sans-serif";
          ctx.textAlign = "center";
          ctx.fillText("ZIEL", gx + 40, GROUND - 52);
          // Fehlerkäfer
          for (const en of lvl.enemies) {
            if (!en.alive && !(en.dead > 0)) continue;
            const ex = en.x,
              ey = GROUND - 12,
              sq = en.alive ? 1 : 0.35;
            ctx.save();
            ctx.translate(ex, ey + (1 - sq) * 10);
            ctx.scale(1, sq);
            ctx.strokeStyle = "#3a1010";
            ctx.lineWidth = 2;
            for (let k = -1; k <= 1; k++) {
              const lg = Math.sin(en.t * 14 + k) * 3;
              ctx.beginPath();
              ctx.moveTo(k * 7, 4);
              ctx.lineTo(k * 7 + lg, 12);
              ctx.stroke();
            }
            ctx.fillStyle = "#d6332b";
            ctx.beginPath();
            ctx.ellipse(0, 0, 15, 11, 0, 0, 7);
            ctx.fill();
            ctx.fillStyle = "#fff";
            ctx.font = "900 13px system-ui,sans-serif";
            ctx.textAlign = "center";
            ctx.fillText("✗", 0, 5);
            ctx.fillStyle = "#3a1010";
            ctx.beginPath();
            ctx.arc(en.dir * 13, -3, 6, 0, 7);
            ctx.fill();
            ctx.fillStyle = "#fff";
            ctx.beginPath();
            ctx.arc(en.dir * 15, -5, 2, 0, 7);
            ctx.fill();
            ctx.restore();
          }
          lino(t);
          ctx.restore();
          if (state === "respawn" || state === "dead") {
            ctx.fillStyle = `rgba(214,51,43,${Math.max(0, 0.35 - deadT * 0.3)})`;
            ctx.fillRect(0, 0, VW, VH);
          }
        }
        function lino(t) {
          if (P.inv > 0 && Math.floor(t * 12) % 2 === 0) return;
          ctx.save();
          ctx.translate(P.x + 11, P.y + 34);
          ctx.scale(1.25, 1.25);
          ctx.translate(-(P.x + 11), -(P.y + 34));
          drawHero(ctx, P.x, P.y, look, !P.onGround, P.run * 14, t);
          ctx.restore();
        }
        function cloud(x, y) {
          ctx.beginPath();
          ctx.arc(x, y, 16, 0, 7);
          ctx.arc(x + 18, y - 8, 20, 0, 7);
          ctx.arc(x + 40, y, 16, 0, 7);
          ctx.fill();
        }
        function hills(col, par, h, amp) {
          ctx.fillStyle = col;
          ctx.beginPath();
          ctx.moveTo(0, VH);
          for (let x = 0; x <= VW; x += 16) {
            const wx = x + camX * par;
            ctx.lineTo(
              x,
              GROUND -
                h +
                Math.sin(wx / 140) * amp * 0.5 +
                Math.sin(wx / 61) * amp * 0.2,
            );
          }
          ctx.lineTo(VW, VH);
          ctx.fill();
        }
        function city() {
          ctx.fillStyle = L === 4 ? "#161c3d" : "rgba(120,110,100,.45)";
          for (let i = 0; i < 14; i++) {
            const bx = (i * 70 - camX * 0.3) % (VW + 140);
            const x = ((bx + VW + 140) % (VW + 140)) - 70,
              h = 60 + ((i * 37) % 70);
            ctx.fillRect(x, GROUND - h, 50, h);
            if (L === 4) {
              ctx.fillStyle = "#ffd86b";
              for (let w = 0; w < 4; w++)
                if ((i + w) % 3)
                  ctx.fillRect(
                    x + 8 + (w % 2) * 22,
                    GROUND - h + 12 + Math.floor(w / 2) * 18,
                    8,
                    8,
                  );
              ctx.fillStyle = "#161c3d";
            }
          }
        }
        function zeche() {
          const x =
            ((((300 - camX * 0.3) % (VW + 300)) + VW + 300) % (VW + 300)) - 150;
          ctx.strokeStyle = "#3b4652";
          ctx.lineWidth = 5;
          ctx.beginPath();
          ctx.moveTo(x, GROUND);
          ctx.lineTo(x + 40, GROUND - 130);
          ctx.lineTo(x + 80, GROUND);
          ctx.moveTo(x + 15, GROUND - 60);
          ctx.lineTo(x + 65, GROUND - 60);
          ctx.stroke();
          ctx.beginPath();
          ctx.arc(x + 40, GROUND - 130, 14, 0, 7);
          ctx.stroke();
        }
        function roundRect(x, y, w, h, r) {
          ctx.beginPath();
          ctx.moveTo(x + r, y);
          ctx.arcTo(x + w, y, x + w, y + h, r);
          ctx.arcTo(x + w, y + h, x, y + h, r);
          ctx.arcTo(x, y + h, x, y, r);
          ctx.arcTo(x, y, x + w, y, r);
          ctx.closePath();
        }

        function loop(ts) {
          if (!api.el.isConnected || !cv.isConnected) {
            cleanup();
            return;
          }
          raf = requestAnimationFrame(loop);
          const dt = last ? Math.min(1 / 30, (ts - last) / 1000) : 0;
          last = ts;
          if (state === "run") step(dt);
          else if (state === "respawn") {
            deadT += dt;
            if (deadT > 0.8) respawn();
          } else if (state === "dead") {
            deadT += dt;
            if (deadT > 1.0 && !ended) {
              ended = true;
              gameOver();
            }
          }
          draw();
        }
        raf = requestAnimationFrame(loop);
        window.__linoDebug = {
          P,
          lvl,
          get state() {
            return state;
          },
          get answer() {
            return qs[gateIdx] && qs[gateIdx][1];
          },
          get lives() {
            return lives;
          },
          get gateIdx() {
            return gateIdx;
          },
        };
      }
    },
  });
})();
