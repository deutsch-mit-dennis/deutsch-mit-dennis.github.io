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
.sp-lino-snd{position:absolute;right:8px;top:8px;width:44px;height:44px;border:0;border-radius:50%;background:rgba(255,255,255,.88);font-size:20px;line-height:1;cursor:pointer;box-shadow:0 2px 8px rgba(0,0,0,.15);display:grid;place-items:center;padding:0}
.sp-lino-snd:focus-visible{outline:3px solid var(--dm-tinte,#2341B5);outline-offset:2px}
.sp-lino-banner{position:absolute;left:50%;top:62px;transform:translateX(-50%);max-width:calc(100% - 24px);width:max-content;text-align:center;background:rgba(255,255,255,.95);border-radius:16px;padding:6px 14px;font:700 14.5px/1.35 var(--dm-font);color:var(--dm-ink);box-shadow:0 4px 12px rgba(0,0,0,.12);pointer-events:none;transition:opacity .3s}
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
.sp-lino-pause{right:60px}
.sp-lino-q.is-bonus{border-color:#d9a400;background:linear-gradient(#fffaf0,#fff)}
.sp-lino-q.is-bonus .sp-lino-tag{background:#ffe9a8;color:#6b4a00}
.sp-lino-note{margin:-2px 0 10px;font-size:15px;color:#6b4a00;font-weight:700}
.sp-lino-q .ch-opt.is-gone{opacity:.3;text-decoration:line-through}
.sp-lino-joker{margin-top:10px;width:100%;min-height:46px;border:2px dashed #d9a400;border-radius:14px;background:#fff8e1;color:#5a3d00;font:800 15.5px var(--dm-font);cursor:pointer}
.sp-lino-say{margin-top:8px;min-height:40px;border:0;border-radius:99px;padding:6px 14px;background:rgba(255,255,255,.8);font:700 15px var(--dm-font);color:inherit;cursor:pointer;box-shadow:0 1px 4px rgba(0,0,0,.12)}
.sp-lino-legend{margin:12px 0 0;border:1px solid var(--dm-line,#d5dbea);border-radius:14px;padding:4px 12px;background:#fff}
.sp-lino-legend summary{cursor:pointer;font-weight:800;padding:8px 0;min-height:28px}
.sp-lino-legend ul{margin:0 0 10px;padding-left:0;list-style:none;display:grid;gap:6px}
.sp-lino-legend li{display:flex;gap:8px;align-items:baseline;font-size:15px;line-height:1.4}
.sp-lino-legend li b:first-child{flex:none;width:1.6em;text-align:center}
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

  // Ton: alles live mit der Web-Audio-API erzeugt (keine Dateien) – Musik je Welt und Geräusche
  const SND = (() => {
    const KEYS = "dm-lino-ton";
    let enabled = true;
    try {
      enabled = localStorage.getItem(KEYS) !== "0";
    } catch {}
    let ac = null,
      master,
      music,
      sfx,
      noiseBuf,
      timer = 0,
      song = null,
      step = 0,
      nextT = 0;
    const hz = (m) => 440 * Math.pow(2, (m - 69) / 12);
    function init() {
      if (!ac) {
        const AC = window.AudioContext || window.webkitAudioContext;
        if (!AC) return null;
        try {
          ac = new AC();
        } catch {
          return null;
        }
        master = ac.createGain();
        master.gain.value = enabled ? 1 : 0;
        master.connect(ac.destination);
        music = ac.createGain();
        music.gain.value = 0.17;
        music.connect(master);
        sfx = ac.createGain();
        sfx.gain.value = 0.34;
        sfx.connect(master);
        noiseBuf = ac.createBuffer(1, ac.sampleRate * 0.5, ac.sampleRate);
        const d = noiseBuf.getChannelData(0);
        for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
      }
      if (ac.state === "suspended" && !document.hidden) ac.resume().catch(() => {});
      return ac;
    }
    function tone(f, t, dur, type = "square", vol = 0.5, f2 = 0, dest = sfx) {
      const o = ac.createOscillator(),
        g = ac.createGain();
      o.type = type;
      o.frequency.setValueAtTime(f, t);
      if (f2) o.frequency.exponentialRampToValueAtTime(f2, t + dur);
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(vol, t + 0.012);
      g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
      o.connect(g);
      g.connect(dest);
      o.start(t);
      o.stop(t + dur + 0.03);
    }
    function noise(t, dur, vol, freq = 6000, dest = sfx) {
      const n = ac.createBufferSource(),
        flt = ac.createBiquadFilter(),
        g = ac.createGain();
      n.buffer = noiseBuf;
      flt.type = "bandpass";
      flt.frequency.value = freq;
      g.gain.setValueAtTime(vol, t);
      g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
      n.connect(flt);
      flt.connect(g);
      g.connect(dest);
      n.start(t);
      n.stop(t + dur + 0.02);
    }
    const FX = {
      jump: (t) => tone(290, t, 0.17, "square", 0.42, 760),
      coin: (t) => {
        tone(988, t, 0.07, "square", 0.38);
        tone(1319, t + 0.07, 0.2, "square", 0.38);
      },
      stomp: (t) => {
        tone(500, t, 0.13, "square", 0.5, 110);
        noise(t, 0.09, 0.35, 1800);
      },
      hurt: (t) => {
        tone(440, t, 0.13, "sawtooth", 0.42, 220);
        tone(330, t + 0.13, 0.25, "sawtooth", 0.42, 110);
      },
      fall: (t) => tone(900, t, 0.75, "triangle", 0.55, 80),
      gate: (t) => [523, 659, 784, 1047].forEach((f, i) => tone(f, t + i * 0.055, 0.13, "triangle", 0.45)),
      right: (t) => [659, 784, 988, 1319].forEach((f, i) => tone(f, t + i * 0.08, i === 3 ? 0.35 : 0.14, "square", 0.34)),
      wrong: (t) => {
        tone(311, t, 0.2, "square", 0.38);
        tone(233, t + 0.2, 0.4, "square", 0.38);
      },
      win: (t) =>
        [523, 659, 784, 1047, 0, 784, 1047, 1319].forEach((f, i) => f && tone(f, t + i * 0.12, i === 7 ? 0.7 : 0.14, "square", 0.34)),
      over: (t) => {
        [392, 370, 349, 330].forEach((f, i) => tone(f, t + i * 0.26, 0.3, "triangle", 0.5));
        tone(262, t + 1.05, 0.8, "triangle", 0.5, 130);
      },
      start: (t) => [392, 523, 659].forEach((f, i) => tone(f, t + i * 0.07, 0.12, "triangle", 0.4)),
      bump: (t) => {
        tone(180, t, 0.09, "square", 0.45, 90);
        noise(t, 0.05, 0.25, 900);
      },
      power: (t) => [523, 659, 784, 1047, 1319, 1568].forEach((f, i) => tone(f, t + i * 0.045, 0.1, "square", 0.3)),
      secret: (t) => {
        [784, 988, 1175, 1568, 1976].forEach((f, i) => tone(f, t + i * 0.09, 0.4, "triangle", 0.35));
        tone(392, t, 0.9, "sine", 0.3, 784);
      },
      joker: (t) => tone(660, t, 0.25, "triangle", 0.4, 1320),
    };
    // Akkordfolge I–V–vi–IV, jede Welt mit eigener Tonart, eigenem Tempo und eigener Melodie
    const PROG = [
      [0, 4, 7],
      [7, 11, 14],
      [9, 12, 16],
      [5, 9, 12],
    ];
    const PENT = [0, 2, 4, 7, 9, 12, 14, 16];
    function sched() {
      if (!song || !ac) return;
      while (nextT < ac.currentTime + 0.18) {
        const st = step % 64,
          ch = PROG[Math.floor(st / 16)],
          b = st % 16,
          sp = song.sp,
          r = song.root;
        if (b % 4 === 0) tone(hz(r - 24 + ch[0]), nextT, sp * 3.4, "triangle", 0.9, 0, music);
        if (b % 4 === 2) tone(hz(r - 12 + ch[0]), nextT, sp * 1.2, "triangle", 0.55, 0, music);
        if (b % 4 === 2 || b % 4 === 3) tone(hz(r + ch[(b + st) % 3]), nextT, sp * 0.9, "square", 0.12, 0, music);
        if (b % 8 === 4) noise(nextT, 0.12, 0.25, 2500, music);
        if (b % 2 === 1) noise(nextT, 0.04, 0.12, 9000, music);
        const n = song.mel[st];
        if (n != null) tone(hz(r + 12 + n), nextT, sp * (song.len[st] || 1.6), "square", 0.3, 0, music);
        nextT += sp;
        step++;
      }
    }
    return {
      unlock: () => init(),
      play(name) {
        if (!enabled || !init() || !FX[name]) return;
        try {
          FX[name](ac.currentTime + 0.01);
        } catch {}
      },
      startMusic(world) {
        this.stopMusic();
        if (!init()) return;
        const root = [60, 62, 57, 64, 55, 53][world] ?? 60,
          bpm = [108, 114, 120, 126, 100, 92][world] ?? 112;
        let seed = world * 7919 + 17;
        const rnd = () => ((seed = (seed * 1103515245 + 12345) & 0x7fffffff), seed / 0x7fffffff);
        const motif = [],
          len = [];
        for (let i = 0; i < 16; i++) {
          const on = i % 2 === 0 ? rnd() < 0.8 : rnd() < 0.25;
          motif.push(on ? PENT[Math.floor(rnd() * PENT.length)] : null);
          len.push(on && rnd() < 0.3 ? 3 : 1.6);
        }
        // Melodie: Motiv – Variation – Motiv – Schluss auf dem Grundton
        const mel = [],
          L2 = [];
        for (let bar = 0; bar < 4; bar++)
          for (let i = 0; i < 16; i++) {
            let n = motif[i];
            if (bar === 1 && n != null) n = PENT[Math.min(PENT.length - 1, PENT.indexOf(n) + 1)];
            if (bar === 3 && i >= 12) n = i === 12 ? 0 : null;
            mel.push(n);
            L2.push(bar === 3 && i === 12 ? 4 : len[i]);
          }
        song = { root, sp: 60 / bpm / 4, mel, len: L2 };
        step = 0;
        nextT = ac.currentTime + 0.12;
        timer = setInterval(sched, 40);
      },
      stopMusic() {
        clearInterval(timer);
        timer = 0;
        song = null;
      },
      duck(on) {
        if (ac && music) music.gain.setTargetAtTime(on ? 0.06 : 0.17, ac.currentTime, 0.15);
      },
      pause(on) {
        if (!ac) return;
        if (on) ac.suspend().catch(() => {});
        else if (enabled) ac.resume().catch(() => {});
      },
      get on() {
        return enabled;
      },
      set on(v) {
        enabled = !!v;
        try {
          localStorage.setItem(KEYS, enabled ? "1" : "0");
        } catch {}
        if (ac && master) {
          master.gain.setTargetAtTime(enabled ? 1 : 0, ac.currentTime, 0.04);
          if (enabled) ac.resume().catch(() => {});
        }
      },
    };
  })();

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

  /* Level: Boden aus Kacheln, Lücken, Käfer, Holzkisten (fest – auch von unten und von der Seite),
     ?-Kisten mit Booster, Wolken (nur von oben begehbar), eine geheime Kammer pro Welt. */
  const CRATE_H = 22,
    BOOSTS = {
      joker: { ic: "💡", name: "Joker", txt: "Am nächsten Tor verschwindet eine falsche Antwort." },
      herz: { ic: "❤️", name: "Herz", txt: "Ein Leben zurück." },
      magnet: { ic: "🧲", name: "Magnet", txt: "10 Sekunden: Münzen fliegen zu dir.", dur: 10 },
      stern: { ic: "⭐", name: "Stern", txt: "8 Sekunden: Käfer können dir nichts tun.", dur: 8 },
      doppel: { ic: "🪽", name: "Flügel", txt: "15 Sekunden: In der Luft noch einmal springen.", dur: 15 },
    };
  function buildLevel(L) {
    const r = rng(1234 + L * 97),
      T = 32,
      GR = 360 - 48;
    const solid = [],
      coins = [],
      enemies = [],
      plats = [],
      clouds = [],
      gates = [];
    const add = (n) => {
      for (let i = 0; i < n; i++) solid.push(true);
    };
    const hole = (n) => {
      for (let i = 0; i < n; i++) solid.push(false);
    };
    const coin = (x, y) => coins.push({ x, y, got: false });
    const gapMin = 2,
      gapMax = L < 2 ? 2 : 3;
    // Booster für die ?-Kisten: Joker und Herz kommen in jeder Welt vor
    const bag = ["joker", "herz", "magnet", "stern", "doppel", L < 2 ? "joker" : "herz"];
    for (let i = bag.length - 1; i > 0; i--) {
      const j = Math.floor(r() * (i + 1));
      [bag[i], bag[j]] = [bag[j], bag[i]];
    }
    const secretSeg = 1 + Math.floor(r() * 3);
    let secret = null;
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
      // Die Kammer-Wolke braucht Platz: Kiste nicht direkt vor einer Lücke
      if (g === secretSeg) {
        const i = feats.indexOf("plat");
        feats.splice(i, 1);
        feats.push("plat");
      }
      for (const f of feats) {
        if (f === "gap") {
          const w = gapMin + Math.floor(r() * (gapMax - gapMin + 1)),
            x0 = solid.length;
          hole(w);
          for (let k = 0; k < 3; k++) coin((x0 + w / 2) * T + (k - 1) * 22, GR - 70 - (k === 1 ? 18 : 0));
          add(5);
        } else if (f === "enemy") {
          const x0 = solid.length;
          add(L >= 2 ? 10 : 8); // Platz nach dem Käfer, damit danach keine Lücke direkt folgt
          enemies.push({ x: (x0 + 4) * T, min: (x0 + 1) * T, max: (x0 + 6) * T, dir: -1, sp: 22 + L * 9, alive: true, t: r() * 6 });
        } else {
          const x0 = solid.length,
            py = GR - 70;
          add(g === secretSeg ? 10 : 7);
          plats.push({ x: (x0 + 2) * T, y: py, w: 3 * T, q: 1, boost: bag[g % bag.length], used: false, bumpK: -1, bumpT: 0 });
          for (let k = 0; k < 3; k++) coin((x0 + 2) * T + 16 + k * 32, py - 26);
          if (g === secretSeg) {
            // Wolke über den Kisten – nur mit langem Drücken (höherer Sprung) erreichbar
            const cy = py - 132;
            clouds.push({ x: (x0 + 4) * T, y: cy, w: 5 * T });
            coin((x0 + 4) * T + 20, py - 62);
            coin((x0 + 5) * T + 10, cy - 30);
            coin((x0 + 6) * T + 10, cy - 30);
            secret = { x: (x0 + 8) * T + 6, y: cy, used: false, ret: (x0 + 8) * T };
          }
        }
      }
      add(4);
      gates.push({ x: solid.length * T, open: false, ok: null });
      add(5);
    }
    add(8);
    const goal = solid.length * T;
    add(12);
    const mainLen = solid.length * T;
    // Geheime Kammer: eigener Bereich weit hinter dem Ziel (die Kamera zeigt ihn nur, wenn man drin ist)
    hole(20);
    const c0 = solid.length;
    add(36);
    const ch = { x0: c0 * T, x1: (c0 + 36) * T, chest: { x: (c0 + 25) * T, open: false }, exit: (c0 + 32) * T };
    for (let k = 0; k < 5; k++) coin((c0 + 5 + k) * T, GR - 22);
    for (let k = 0; k < 5; k++) coin((c0 + 11 + k) * T + 16, GR - 40 - Math.sin((k / 4) * Math.PI) * 60);
    plats.push({ x: (c0 + 18) * T, y: GR - 70, w: 3 * T, q: 1, boost: ["magnet", "doppel", "stern"][L % 3], used: false, bumpK: -1, bumpT: 0 });
    for (let k = 0; k < 3; k++) coin((c0 + 18) * T + 16 + k * 32, GR - 96);
    for (let k = 0; k < 3; k++) coin((c0 + 28 + k) * T + 16, GR - 22);
    return { solid, coins, enemies, plats, clouds, gates, goal, secret, ch, T, mainLen, len: solid.length * T };
  }

  DMGame.register({
    id: "lino",
    cat: "abenteuer",
    title: "Lino läuft – das Deutsch-Abenteuer",
    icon: "🏃",
    level: "A1–C1",
    desc: "Jump’n’Run in 5 Welten: Springe über Lücken und Fehlerkäfer, finde Booster und geheime Kammern und löse an jedem Tor eine Deutschfrage – von A1 bis C1.",
    intro:
      "Wähle zuerst deine Figur: Junge (Lino) oder Mädchen (Lina), Hautfarbe und – beim Mädchen – mit oder ohne Kopftuch. Deine Figur läuft von selbst. Tippe auf das Spielfeld oder den großen Knopf (am Computer: Leertaste oder ↑), um zu springen – lange drücken springt höher. Springe über Lücken, hüpf auf die Fehlerkäfer und sammle Münzen. Stoß die ❓-Kisten von unten an – darin stecken Booster wie Joker, Herz, Magnet, Stern und Flügel. In jeder Welt ist eine geheime Kammer mit Schatztruhe versteckt. An jedem Tor wartet eine Frage. Oben rechts: ⏸ Pause und 🔊 Ton. Jede Welt ist schwerer: A1, A2, B1, B2, C1.",
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
              best = prog["best" + w.id],
              key = prog.secrets?.[w.id];
            return `<button type="button" class="sp-lino-lv" data-i="${i}"${open ? "" : " disabled"}><i aria-hidden="true">${open ? (best != null ? "⭐" : "▶") : "🔒"}</i><b>${w.id}</b><span>Welt ${i + 1}: ${w.name}</span><small>${best != null ? `Rekord: ${best} Punkte` : open ? "Bereit" : "Noch gesperrt"}${key ? " · 🗝 Kammer gefunden" : ""}</small></button>`;
          }).join("")}</div>
          <details class="sp-lino-legend"><summary>Booster und Geheimnisse</summary><ul>
            <li><b>❓</b><span><b>Kisten</b> sind fest. Stoß die ❓-Kiste von unten mit dem Kopf an – dann kommt ein Booster heraus.</span></li>
            ${Object.values(BOOSTS).map((b) => `<li><b>${b.ic}</b><span><b>${b.name}:</b> ${b.txt}</span></li>`).join("")}
            <li><b>☁️</b><span><b>Wolken</b> kannst du von unten durchspringen und oben darauf landen.</span></li>
            <li><b>🗝</b><span><b>Geheime Kammer:</b> In jeder Welt versteckt – hoch oben. Tipp: Lange drücken springt höher. In der Kammer wartet eine Schatztruhe mit Bonusfrage – ohne Risiko.</span></li>
          </ul></details>
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
        api.el.innerHTML = `<div class="sp-lino-wrap"><canvas width="${VW * dpr}" height="${VH * dpr}" aria-label="Spielfeld: ${heroName(look)} läuft durch die Welt ${W0.id}" role="img"></canvas><div class="sp-lino-banner">Welt ${W0.id}: ${W0.name}</div><button type="button" class="sp-lino-snd sp-lino-pause" aria-pressed="false" aria-label="Pause">⏸</button><button type="button" class="sp-lino-snd" aria-pressed="${SND.on}" aria-label="Ton">${SND.on ? "🔊" : "🔇"}</button></div>
          <div class="sp-lino-panel"></div>`;
        const cv = api.el.querySelector("canvas"),
          ctx = cv.getContext("2d"),
          panel = api.el.querySelector(".sp-lino-panel"),
          banner = api.el.querySelector(".sp-lino-banner");
        ctx.scale(dpr, dpr);
        // Ton starten (der Klick auf die Welt erlaubt dem Browser die Wiedergabe)
        SND.unlock();
        SND.play("start");
        SND.startMusic(L);
        const sndBtn = api.el.querySelector(".sp-lino-snd:not(.sp-lino-pause)"),
          pauseBtn = api.el.querySelector(".sp-lino-pause");
        pauseBtn.addEventListener("pointerdown", (e) => e.stopPropagation());
        pauseBtn.onclick = (e) => {
          e.stopPropagation();
          togglePause();
          pauseBtn.blur();
        };
        sndBtn.addEventListener("pointerdown", (e) => e.stopPropagation());
        sndBtn.onclick = (e) => {
          e.stopPropagation();
          SND.on = !SND.on;
          if (SND.on && !(state === "dead")) SND.startMusic(inCh ? 5 : L);
          sndBtn.textContent = SND.on ? "🔊" : "🔇";
          sndBtn.setAttribute("aria-pressed", SND.on);
          sndBtn.blur();
        };
        // Auf kleinen Bildschirmen (z. B. Handy quer) Spielfeld und Sprungknopf ganz zeigen
        requestAnimationFrame(() => {
          const card = api.el.closest(".sp-play") || api.el;
          const c = cv.getBoundingClientRect(),
            b = panel.getBoundingClientRect();
          // Spielfeld oben verdeckt (z. B. nach dem Scrollen in der Weltkarte) oder Knopf unten nicht sichtbar → Karte nach oben holen
          if (c.top < 70 || b.top + 80 > innerHeight) card.scrollIntoView({ block: "start", behavior: "instant" });
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
          deadT = 0,
          inCh = false,
          userPause = false,
          flash = 0,
          bannerT = 0;
        const wrong = [],
          wrongItems = [],
          fx = [],
          B = { joker: 0, magnet: 0, stern: 0, doppel: 0 };
        const HEAD = 6; // die Figur wird 1,25-fach gezeichnet: der Kopf ragt etwas über die Rechenbox
        function say(html, sec = 2.6) {
          banner.innerHTML = html;
          banner.hidden = false;
          bannerT = sec;
        }
        function togglePause(force) {
          const want = force ?? state !== "pause";
          if (want && state === "run") {
            state = "pause";
            userPause = true;
            held = false;
            SND.pause(true);
          } else if (!want && state === "pause") {
            state = "run";
            userPause = false;
            last = 0;
            SND.pause(false);
          } else return;
          pauseBtn.textContent = state === "pause" ? "▶" : "⏸";
          pauseBtn.setAttribute("aria-label", state === "pause" ? "Weiterspielen" : "Pause");
          pauseBtn.setAttribute("aria-pressed", state === "pause");
        }
        bannerT = 2.2;
        if (!prog.secrets?.[W0.id] && L === 0 && !prog.hintSecret) {
          prog.hintSecret = 1;
          save(prog);
          setTimeout(() => state === "run" && say("Psst … hier ist eine geheime Kammer versteckt ✨", 3.2), 2600);
        }

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
            <p class="sp-lino-hint">Tippe aufs Spielfeld oder den Knopf · Lange drücken = höher · ❓-Kisten von unten anstoßen · Am Computer: Leertaste, P = Pause</p>`;
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
            SND.play("jump");
          } else if (B.doppel > 0 && !P.dbl) {
            // Flügel-Booster: zweiter Sprung in der Luft
            P.dbl = true;
            P.vy = -JUMP * 0.72;
            holdT = 0;
            SND.play("jump");
            fx.push({ x: P.x + 11, y: P.y + 34, t: 0, puff: 1 });
          } else buffer = 0.14; // kurz vor der Landung gedrückt → Sprung direkt nach der Landung
        }
        function release() {
          // Loslassen beendet nur den Extra-Schub – ein kurzes Tippen ergibt trotzdem einen vollen Sprung
          held = false;
        }
        cv.addEventListener("pointerdown", (e) => {
          e.preventDefault();
          if (state === "pause" && userPause) return togglePause(false);
          press();
        });
        cv.addEventListener("pointerup", release);
        cv.addEventListener("pointercancel", release);
        api.el.querySelector(".sp-lino-wrap").addEventListener("contextmenu", (e) => e.preventDefault());
        const onKey = (e) => {
          if (!api.el.isConnected) return removeEventListener("keydown", onKey);
          if (e.type === "keydown" && ["p", "P", "Escape"].includes(e.key) && (state === "run" || state === "pause")) {
            e.preventDefault();
            return togglePause();
          }
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
          if (!userPause) SND.pause(document.hidden);
          if (document.hidden && state === "run") {
            state = "pause";
          } else if (!document.hidden && state === "pause" && !userPause) {
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
          SND.stopMusic();
          SND.duck(false);
        }

        function solidAt(px) {
          const i = Math.floor(px / T);
          return i >= 0 && i < lvl.solid.length && lvl.solid[i];
        }

        function hit(how) {
          if (state !== "run" || (how !== "fall" && (P.inv > 0 || B.stern > 0))) return;
          lives--;
          api.vibrate();
          SND.play(how === "fall" ? "fall" : "hurt");
          hud();
          if (lives <= 0) {
            state = "dead";
            deadT = 0;
            SND.stopMusic();
            setTimeout(() => SND.play("over"), how === "fall" ? 700 : 350);
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
          P.dbl = false;
          B.magnet = B.stern = B.doppel = 0;
          state = "run";
        }

        function give(type, x, y) {
          const b = BOOSTS[type];
          SND.play("power");
          if (type === "joker") B.joker++;
          else if (type === "herz") {
            if (lives < 3) lives++;
            else score += 50;
          } else B[type] = b.dur;
          fx.push({ x, y, t: 0, text: b.ic + " " + b.name });
          say(`${b.ic} <b>${b.name}!</b> ${type === "herz" && lives >= 3 ? "Herzen voll – +50 Punkte." : b.txt}`, 3);
          hud();
        }

        function bump(pl) {
          const cx = P.x + P.w / 2,
            n = Math.round(pl.w / T);
          pl.bumpK = Math.max(0, Math.min(n - 1, Math.floor((cx - pl.x) / T)));
          pl.bumpT = 0.16;
          SND.play("bump");
          const qx = pl.x + pl.q * T + T / 2;
          if (!pl.used && pl.q >= 0 && Math.abs(cx - qx) < T * 1.3) {
            pl.used = true;
            pl.bumpK = pl.q;
            give(pl.boost, qx, pl.y - 10);
          }
          // Käfer oder Münzen auf der Kiste werden mit angestoßen
          for (const c of lvl.coins)
            if (!c.got && c.x > pl.x && c.x < pl.x + pl.w && c.y < pl.y && c.y > pl.y - 40) {
              c.got = true;
              coinsGot++;
              score += 10;
              SND.play("coin");
            }
          hud();
        }

        function enterChamber() {
          const ch = lvl.ch;
          inCh = true;
          lvl.secret.used = true;
          P.x = ch.x0 + 2 * T;
          P.y = GROUND - P.h;
          P.vy = 0;
          P.onGround = true;
          held = false;
          flash = 0.6;
          score += 100;
          prog.secrets = { ...(prog.secrets || {}), [W0.id]: true };
          save(prog);
          SND.play("secret");
          SND.startMusic(5);
          say("🗝 <b>Geheime Kammer gefunden!</b> +100", 3);
          hud();
        }
        function leaveChamber() {
          inCh = false;
          P.x = lvl.secret.ret;
          P.y = GROUND - P.h;
          P.vy = 0;
          P.onGround = true;
          P.inv = 1;
          flash = 0.5;
          SND.startMusic(L);
          say("Zurück auf dem Weg ▶", 1.6);
        }

        function step(dt) {
          P.run += dt;
          if (P.inv > 0) P.inv -= dt;
          for (const k of ["magnet", "stern", "doppel"]) if (B[k] > 0) B[k] = Math.max(0, B[k] - dt);
          let vx = speed;
          if (!inCh) {
            // Bewegung nach rechts bis zum nächsten Tor
            const gate = lvl.gates[gateIdx];
            if (gate && !gate.open && P.x + P.w >= gate.x - 6) {
              vx = 0;
              P.x = gate.x - 6 - P.w;
              if (P.onGround) return askGate();
            }
          } else {
            const chest = lvl.ch.chest;
            if (!chest.open && P.x + P.w >= chest.x - 4) {
              vx = 0;
              P.x = chest.x - 4 - P.w;
              if (P.onGround) return askChest();
            }
          }
          // waagerecht – Kisten sind fest: von links dagegen = anhalten
          const oldX = P.x;
          P.x += vx * dt;
          for (const pl of lvl.plats)
            if (P.x + P.w > pl.x && oldX + P.w <= pl.x + 1 && P.y + P.h > pl.y + 3 && P.y - HEAD < pl.y + CRATE_H - 2) P.x = pl.x - P.w;
          if (held && P.vy < 0 && holdT < 0.26) {
            holdT += dt;
            P.vy -= 1200 * dt;
          }
          P.vy += G * dt;
          if (P.vy > 900) P.vy = 900;
          const oldBottom = P.y + P.h,
            oldTop = P.y - HEAD;
          P.y += P.vy * dt;
          const wasGround = P.onGround;
          P.onGround = false;
          // Kisten: von oben landen, von unten mit dem Kopf anstoßen
          for (const pl of lvl.plats) {
            if (!(P.x + P.w > pl.x + 2 && P.x < pl.x + pl.w - 2)) continue;
            const bottom = pl.y + CRATE_H;
            if (P.vy >= 0 && oldBottom <= pl.y + 1 && P.y + P.h >= pl.y) {
              P.y = pl.y - P.h;
              P.vy = 0;
              P.onGround = true;
            } else if (P.vy < 0 && oldTop >= bottom - 1 && P.y - HEAD < bottom) {
              P.y = bottom + HEAD;
              P.vy = 60;
              holdT = 1;
              bump(pl);
            }
          }
          // Wolken: nur von oben
          for (const cl of lvl.clouds)
            if (P.x + P.w > cl.x + 2 && P.x < cl.x + cl.w - 2 && oldBottom <= cl.y + 1 && P.y + P.h >= cl.y && P.vy >= 0) {
              P.y = cl.y - P.h;
              P.vy = 0;
              P.onGround = true;
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
          if (P.onGround) P.dbl = false;
          if (buffer > 0) {
            buffer -= dt;
            if (P.onGround) {
              buffer = 0;
              P.vy = -JUMP * 0.78;
              P.onGround = false;
              holdT = 0;
              SND.play("jump");
            }
          }
          if (P.onGround) coyote = 0.11;
          else if (wasGround && P.vy >= 0) coyote = Math.max(coyote, 0.11);
          else coyote = Math.max(0, coyote - dt);
          if (P.y > VH + 40) {
            P.inv = 0;
            hit("fall");
          }
          // Münzen (mit Magnet: fliegen heran)
          const pcx = P.x + P.w / 2,
            pcy = P.y + P.h / 2;
          for (const c of lvl.coins) {
            if (c.got) continue;
            if (B.magnet > 0 && Math.abs(c.x - pcx) < 170 && Math.abs(c.y - pcy) < 200) {
              const k = Math.min(1, dt * 9);
              c.x += (pcx - c.x) * k;
              c.y += (pcy - c.y) * k;
            }
            if (Math.abs(c.x - pcx) < 18 && Math.abs(c.y - pcy) < 24) {
              c.got = true;
              SND.play("coin");
              coinsGot++;
              score += 10;
              hud();
            }
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
            if (P.x + P.w > ex + 4 && P.x < ex + 24 && P.y + P.h > ey + 2 && P.y < GROUND) {
              if ((P.vy > 0 && oldBottom <= ey + 10) || B.stern > 0) {
                en.alive = false;
                en.dead = 0.5;
                if (!(B.stern > 0) || P.vy > 0) P.vy = -JUMP * 0.62;
                SND.play("stomp");
                score += 50;
                hud();
              } else hit();
            }
          }
          for (const en of lvl.enemies) if (!en.alive && en.dead > 0) en.dead -= dt;
          for (const pl of lvl.plats) if (pl.bumpT > 0) pl.bumpT -= dt;
          // Geheime Kammer: Tür auf der Wolke / Ausgang in der Kammer
          const sc = lvl.secret;
          if (!inCh && sc && !sc.used && P.x + P.w > sc.x + 4 && P.x < sc.x + 26 && P.y + P.h > sc.y - 44 && P.y < sc.y) enterChamber();
          if (inCh && P.x >= lvl.ch.exit) leaveChamber();
          // Ziel
          if (!inCh && gateIdx >= GATES && P.x >= lvl.goal) {
            state = "goal";
            finishLevel();
          }
          camX = inCh
            ? Math.max(lvl.ch.x0, Math.min(lvl.ch.x1 - VW, P.x - VW * 0.3))
            : Math.max(0, Math.min(lvl.mainLen - VW, P.x - VW * 0.3));
        }

        // Frage stellen (Tor oder Schatztruhe). item = [Satz mit ___, richtig, falsch, falsch, Tipp]
        function quiz({ item, tag, note, bonus, onAnswer, onNext }) {
          state = "ask";
          held = false;
          SND.duck(true);
          const [q, a, w1, w2, tip] = item;
          const opts = api.shuffle([a, w1, w2]);
          const qHtml = api.esc(q).replace("___", '<span class="sp-lino-gap">&nbsp;</span>');
          panel.innerHTML = `<div class="sp-lino-q${bonus ? " is-bonus" : ""}" role="group" aria-label="${bonus ? "Bonusfrage" : "Frage am Tor"}"><span class="sp-lino-tag">${tag}</span>
            ${note ? `<p class="sp-lino-note">${note}</p>` : ""}
            <p class="sp-lino-text">${qHtml}</p>
            <div class="ch-opts">${opts.map((o, k) => `<button type="button" class="ch-opt" data-k="${k}"><kbd>${k + 1}</kbd><span>${api.esc(o)}</span></button>`).join("")}</div>
            ${!bonus && B.joker > 0 ? `<button type="button" class="sp-lino-joker">💡 Joker einsetzen (${B.joker}) – eine falsche Antwort verschwindet</button>` : ""}</div>`;
          const btns = [...panel.querySelectorAll(".ch-opt")];
          btns[0].focus({ preventScroll: true });
          if (panel.getBoundingClientRect().bottom > innerHeight) panel.scrollIntoView({ block: "end", behavior: "smooth" });
          const jk = panel.querySelector(".sp-lino-joker");
          if (jk)
            jk.onclick = () => {
              B.joker--;
              SND.play("joker");
              const k = opts.findIndex((o) => o !== a);
              btns[k].disabled = true;
              btns[k].classList.add("is-gone");
              btns[k].setAttribute("aria-label", "durch Joker entfernt");
              jk.remove();
              btns.find((x) => !x.disabled)?.focus({ preventScroll: true });
            };
          btns.forEach(
            (b, k) =>
              (b.onclick = () => {
                const ok = opts[k] === a;
                btns.forEach((x, j) => {
                  x.disabled = true;
                  if (opts[j] === a) x.classList.add("is-right");
                });
                panel.querySelector(".sp-lino-joker")?.remove();
                if (!ok) b.classList.add("is-wrong");
                const gap = panel.querySelector(".sp-lino-gap");
                if (gap) {
                  gap.textContent = a;
                  gap.classList.add("is-ok");
                }
                SND.play(ok ? "right" : "wrong");
                const full = q.replace("___", a);
                const head = onAnswer(ok, full);
                hud();
                api.feedback(
                  ok,
                  `${head}<span>${ok ? api.esc(tip) : `Richtig: <b>${api.esc(a)}</b> · ${api.esc(tip)}`}</span><button type="button" class="sp-lino-say">🔈 Satz anhören</button>`,
                );
                const sb = document.querySelector(".ch-feedback .sp-lino-say");
                if (sb)
                  sb.onclick = () => {
                    SND.duck(true);
                    api.speak(full);
                  };
                if (lives <= 0) {
                  SND.stopMusic();
                  api.next("Weiter", () => {
                    state = "dead";
                    deadT = 1;
                    SND.play("over");
                  });
                  return;
                }
                api.next("Weiter laufen ▶", () => {
                  api.clearFeedback();
                  try {
                    window.speechSynthesis?.cancel();
                  } catch {}
                  onNext?.();
                  hud();
                  runPanel();
                  state = "run";
                  last = 0;
                  SND.duck(false);
                  panel.querySelector(".sp-lino-jump")?.focus({ preventScroll: true });
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

        function askGate() {
          SND.play("gate");
          const item = qs[gateIdx],
            gate = lvl.gates[gateIdx];
          quiz({
            item,
            tag: `🚪 Tor ${gateIdx + 1} von ${GATES} · ${W0.id}`,
            onAnswer(ok, full) {
              gate.open = true;
              gate.ok = ok;
              if (ok) {
                right++;
                score += 100;
                return "<b>Richtig! Das Tor ist offen. +100</b>";
              }
              lives--;
              api.vibrate();
              wrong.push({ correct: full, tip: item[4] });
              wrongAll.push({ correct: full, tip: item[4] });
              wrongItems.push(item);
              return "<b>Leider falsch – ein Herz weniger.</b>";
            },
            onNext() {
              gateIdx++;
              checkpoint = gate.x + 10;
            },
          });
        }

        // Schatztruhe: Wiederholung einer falsch beantworteten Frage – oder eine neue Frage. Kein Risiko.
        function askChest() {
          SND.play("gate");
          const chest = lvl.ch.chest,
            rep = wrongItems.shift(),
            pool = W0.questions.filter((x) => !qs.includes(x)),
            item = rep || (pool.length ? api.pick(pool, 1)[0] : api.pick(W0.questions, 1)[0]);
          quiz({
            item,
            bonus: true,
            tag: "🗝 Schatztruhe · Bonusfrage",
            note: rep ? "Zweite Chance: Diese Frage war vorhin schwierig." : "Ohne Risiko – hier verlierst du kein Herz.",
            onAnswer(ok) {
              chest.open = true;
              if (!ok) return "<b>Nicht ganz – macht nichts, hier kostet es kein Herz.</b>";
              score += 150;
              let gift;
              if (lives < 3) {
                lives++;
                gift = "❤️ +1 Herz";
              } else {
                B.joker++;
                gift = "💡 +1 Joker";
              }
              SND.play("power");
              fx.push({ x: chest.x + 18, y: GROUND - 50, t: 0, text: gift });
              return `<b>Richtig! Die Truhe ist offen: +150 und ${gift}</b>`;
            },
          });
        }

        function finishLevel() {
          cleanup();
          SND.play("win");
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
        const skyG = ctx.createLinearGradient(0, 0, 0, VH);
        skyG.addColorStop(0, W0.sky[0]);
        skyG.addColorStop(1, W0.sky[1]);
        const caveG = ctx.createLinearGradient(0, 0, 0, VH);
        caveG.addColorStop(0, "#1a110b");
        caveG.addColorStop(1, "#4d3421");
        const pitG = ctx.createLinearGradient(0, GROUND, 0, VH);
        pitG.addColorStop(0, "rgba(20,14,10,.55)");
        pitG.addColorStop(1, "rgba(5,3,2,.95)");
        function draw() {
          const t = performance.now() / 1000;
          ctx.fillStyle = inCh ? caveG : skyG;
          ctx.fillRect(0, 0, VW, VH);
          if (inCh) cave(t);
          else if (L === 4) {
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
          if (!inCh) {
            hills(W0.hill2, 0.25, 150, 70);
            hills(W0.hill, 0.45, 110, 50);
            if (L === 1 || L === 4) city();
            if (L === 3) zeche();
          }
          ctx.save();
          ctx.translate(-Math.round(camX), 0);
          // Boden
          const i0 = Math.max(0, Math.floor(camX / T) - 1),
            i1 = Math.min(lvl.solid.length, i0 + Math.ceil(VW / T) + 3);
          for (let i = i0; i < i1; i++)
            if (!lvl.solid[i]) {
              ctx.fillStyle = pitG;
              ctx.fillRect(i * T, GROUND + 6, T, VH - GROUND);
            } else {
              ctx.fillStyle = inCh ? "#4a3626" : W0.ground;
              ctx.fillRect(i * T, GROUND, T, VH - GROUND);
              ctx.fillStyle = inCh ? "#7a5a3a" : W0.grass;
              ctx.fillRect(i * T, GROUND, T, 9);
              ctx.fillStyle = "rgba(0,0,0,.12)";
              ctx.fillRect(i * T + (i % 2 ? 6 : 18), GROUND + 20, 6, 6);
            }
          // Holzkisten und ?-Kisten
          for (const pl of lvl.plats) {
            if (pl.x > camX + VW + 40 || pl.x + pl.w < camX - 40) continue;
            for (let k = 0; k < pl.w / T; k++) {
              const x = pl.x + k * T,
                up = pl.bumpT > 0 && pl.bumpK === k ? Math.sin((pl.bumpT / 0.16) * Math.PI) * 7 : 0,
                y = pl.y - up,
                isQ = k === pl.q && pl.q >= 0;
              if (isQ && !pl.used) {
                ctx.fillStyle = "#ffc928";
                ctx.fillRect(x, y, T - 1, CRATE_H);
                ctx.strokeStyle = "#b07a00";
                ctx.lineWidth = 2;
                ctx.strokeRect(x + 1, y + 1, T - 3, CRATE_H - 2);
                ctx.fillStyle = "#7a4a00";
                ctx.font = "900 17px system-ui,sans-serif";
                ctx.textAlign = "center";
                ctx.fillText("?", x + T / 2, y + 17 + Math.sin(t * 5) * 1);
              } else {
                ctx.fillStyle = isQ ? "#a8865f" : "#c98b4b";
                ctx.fillRect(x, y, T - 1, CRATE_H);
                ctx.strokeStyle = isQ ? "#6f5638" : "#8b5a2b";
                ctx.lineWidth = 2;
                ctx.strokeRect(x + 1, y + 1, T - 3, CRATE_H - 2);
                if (!isQ) {
                  ctx.beginPath();
                  ctx.moveTo(x + 2, y + 2);
                  ctx.lineTo(x + T - 3, y + CRATE_H - 2);
                  ctx.stroke();
                }
              }
            }
          }
          // Wolken (nur von oben begehbar)
          for (const cl of lvl.clouds) {
            ctx.fillStyle = "rgba(255,255,255,.95)";
            for (let x = cl.x + 12; x < cl.x + cl.w; x += 24) {
              ctx.beginPath();
              ctx.arc(x, cl.y + 8, 13, 0, 7);
              ctx.fill();
            }
            ctx.fillStyle = "rgba(160,190,220,.5)";
            ctx.fillRect(cl.x + 4, cl.y + 14, cl.w - 8, 4);
          }
          // Geheimtür auf der Wolke
          const sc = lvl.secret;
          if (sc && !sc.used) {
            const glow = 0.5 + Math.sin(t * 4) * 0.25;
            ctx.fillStyle = `rgba(255,214,80,${glow * 0.5})`;
            ctx.beginPath();
            ctx.arc(sc.x + 15, sc.y - 20, 26, 0, 7);
            ctx.fill();
            ctx.fillStyle = "#7b3f1d";
            roundRect(sc.x + 2, sc.y - 42, 26, 42, 10);
            ctx.fill();
            ctx.fillStyle = "#ffc928";
            ctx.beginPath();
            ctx.arc(sc.x + 22, sc.y - 20, 2.6, 0, 7);
            ctx.fill();
            ctx.font = "15px system-ui,sans-serif";
            ctx.textAlign = "center";
            ctx.fillText("✨", sc.x + 15 + Math.sin(t * 3) * 10, sc.y - 50);
          }
          if (inCh) chamberProps(t);
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
          // schwebende Texte (Booster, Truhe) und Wölkchen beim Doppelsprung
          for (const f of fx) {
            const a = Math.max(0, 1 - f.t / 1.4);
            if (f.puff) {
              ctx.fillStyle = `rgba(255,255,255,${a * 0.8})`;
              ctx.beginPath();
              ctx.arc(f.x - 8, f.y + f.t * 20, 6 + f.t * 14, 0, 7);
              ctx.arc(f.x + 8, f.y + f.t * 20, 6 + f.t * 14, 0, 7);
              ctx.fill();
              continue;
            }
            ctx.globalAlpha = a;
            ctx.font = "800 16px system-ui,sans-serif";
            ctx.textAlign = "center";
            ctx.lineWidth = 4;
            ctx.strokeStyle = "rgba(255,255,255,.9)";
            ctx.strokeText(f.text, f.x, f.y - f.t * 36);
            ctx.fillStyle = "#172036";
            ctx.fillText(f.text, f.x, f.y - f.t * 36);
            ctx.globalAlpha = 1;
          }
          ctx.restore();
          boosterHud();
          if (state === "respawn" || state === "dead") {
            ctx.fillStyle = `rgba(214,51,43,${Math.max(0, 0.35 - deadT * 0.3)})`;
            ctx.fillRect(0, 0, VW, VH);
          }
          if (flash > 0) {
            ctx.fillStyle = `rgba(255,248,220,${Math.min(1, flash * 1.6)})`;
            ctx.fillRect(0, 0, VW, VH);
          }
          if (state === "pause" && userPause) {
            ctx.fillStyle = "rgba(23,32,54,.55)";
            ctx.fillRect(0, 0, VW, VH);
            ctx.fillStyle = "#fff";
            ctx.textAlign = "center";
            ctx.font = "800 30px system-ui,sans-serif";
            ctx.fillText("⏸ Pause", VW / 2, VH / 2 - 6);
            ctx.font = "600 16px system-ui,sans-serif";
            ctx.fillText("Tippen oder ▶ drücken zum Weiterspielen", VW / 2, VH / 2 + 24);
          }
        }
        // aktive Booster oben links
        function boosterHud() {
          const items = [];
          if (B.joker > 0) items.push(["💡", "×" + B.joker, 1]);
          for (const k of ["magnet", "stern", "doppel"]) if (B[k] > 0) items.push([BOOSTS[k].ic, Math.ceil(B[k]) + " s", B[k] / BOOSTS[k].dur]);
          let x = 8;
          for (const [ic, label, part] of items) {
            ctx.fillStyle = "rgba(255,255,255,.9)";
            roundRect(x, 8, 66, 30, 15);
            ctx.fill();
            ctx.fillStyle = "rgba(35,65,181,.18)";
            roundRect(x, 8, 66 * Math.max(0.12, Math.min(1, part)), 30, 15);
            ctx.fill();
            ctx.font = "16px system-ui,sans-serif";
            ctx.textAlign = "left";
            ctx.fillText(ic, x + 7, 29);
            ctx.font = "800 13px system-ui,sans-serif";
            ctx.fillStyle = "#172036";
            ctx.fillText(label, x + 30, 28);
            x += 72;
          }
        }
        function cave(t) {
          // Höhle mit Kristallen und Fackeln
          ctx.fillStyle = "#24170f";
          ctx.beginPath();
          ctx.moveTo(0, 0);
          for (let x = 0; x <= VW + 20; x += 20) {
            const wx = x + camX * 0.6;
            ctx.lineTo(x, 26 + ((Math.sin(wx / 23) + 1) * 0.5) ** 3 * 34);
          }
          ctx.lineTo(VW, 0);
          ctx.fill();
          for (let i = 0; i < 9; i++) {
            const bx = (((i * 113 - camX * 0.35) % (VW + 120)) + VW + 120) % (VW + 120) - 60,
              by = 120 + ((i * 47) % 110),
              hue = ["#7fe3ff", "#c49bff", "#7dffb0"][i % 3];
            ctx.globalAlpha = 0.55 + Math.sin(t * 2 + i) * 0.2;
            ctx.fillStyle = hue;
            ctx.beginPath();
            ctx.moveTo(bx, by);
            ctx.lineTo(bx + 7, by + 14);
            ctx.lineTo(bx, by + 30);
            ctx.lineTo(bx - 7, by + 14);
            ctx.fill();
            ctx.globalAlpha = 1;
          }
        }
        function chamberProps(t) {
          const ch = lvl.ch;
          // Fackeln
          for (let k = 0; k < 4; k++) {
            const x = ch.x0 + 140 + k * 260;
            ctx.fillStyle = "#5a3b22";
            ctx.fillRect(x - 3, GROUND - 120, 6, 34);
            ctx.fillStyle = `rgba(255,${150 + Math.sin(t * 13 + k) * 40},40,.95)`;
            ctx.beginPath();
            ctx.ellipse(x, GROUND - 128 + Math.sin(t * 17 + k) * 1.5, 7, 12, 0, 0, 7);
            ctx.fill();
          }
          // Schatztruhe
          const c = ch.chest,
            x = c.x,
            y = GROUND - 30;
          ctx.fillStyle = "#8b5a2b";
          ctx.fillRect(x, y, 40, 30);
          ctx.fillStyle = "#ffc928";
          ctx.fillRect(x, y + 10, 40, 4);
          ctx.fillRect(x + 17, y + 6, 6, 12);
          ctx.fillStyle = "#6d4420";
          if (c.open) {
            ctx.fillRect(x - 2, y - 22, 44, 10);
            ctx.fillStyle = `rgba(255,214,80,${0.5 + Math.sin(t * 6) * 0.2})`;
            ctx.beginPath();
            ctx.arc(x + 20, y - 4, 16, 0, 7);
            ctx.fill();
          } else {
            roundRect(x - 2, y - 14, 44, 16, 8);
            ctx.fill();
            ctx.fillStyle = "#ffc928";
            ctx.fillRect(x + 17, y - 4, 6, 8);
          }
          // Ausgang
          const ex = ch.exit;
          ctx.fillStyle = "rgba(160,220,255,.35)";
          roundRect(ex - 6, GROUND - 74, 46, 74, 22);
          ctx.fill();
          ctx.strokeStyle = "#a0dcff";
          ctx.lineWidth = 3;
          ctx.stroke();
          ctx.fillStyle = "#fff";
          ctx.font = "800 12px system-ui,sans-serif";
          ctx.textAlign = "center";
          ctx.fillText("Ausgang", ex + 17, GROUND - 82);
        }
        function lino(t) {
          if (P.inv > 0 && Math.floor(t * 12) % 2 === 0) return;
          if (B.stern > 0) {
            ctx.fillStyle = `hsla(${(t * 360) % 360},90%,60%,.45)`;
            ctx.beginPath();
            ctx.arc(P.x + 11, P.y + 14, 28, 0, 7);
            ctx.fill();
          }
          if (B.doppel > 0) {
            const fl = Math.sin(t * (P.onGround ? 6 : 22)) * 5;
            ctx.fillStyle = "rgba(255,255,255,.95)";
            ctx.strokeStyle = "#9fb4d9";
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.ellipse(P.x - 4, P.y + 8 - fl, 11, 6, -0.6, 0, 7);
            ctx.fill();
            ctx.stroke();
          }
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
          const rdt = last && dt ? dt : 1 / 60;
          if (flash > 0) flash -= rdt;
          if (bannerT > 0 && (bannerT -= rdt) <= 0) banner.hidden = true;
          for (let i = fx.length - 1; i >= 0; i--) if ((fx[i].t += state === "pause" ? 0 : rdt) > 1.4) fx.splice(i, 1);
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
          get inCh() {
            return inCh;
          },
          B,
          get score() {
            return score;
          },
        };
      }
    },
  });
})();
