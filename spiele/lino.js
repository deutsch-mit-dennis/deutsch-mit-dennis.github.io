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
@media (max-width:520px){.sp-lino-banner{top:54px;font-size:12.5px;padding:5px 10px;border-radius:12px}}
/* Handy quer: Kopfzeile scrollt mit, damit das Spielfeld groß bleibt */
@media (max-height:520px) and (orientation:landscape){body:has(.sp-lino-wrap) header.dm-header,body:has(.sp-lino-wrap) .dm-backbar{position:static}.sp-play.sp-lino{scroll-margin-top:6px!important}.sp-lino-wrap canvas{scroll-margin-top:6px}.sp-lino-wrap canvas{max-height:calc(100vh - 128px)!important}.sp-lino-banner{top:50px;font-size:12.5px;padding:4px 10px}}
.sp-lino-panel{margin-top:12px}
.sp-lino-jump{display:flex;align-items:center;justify-content:center;gap:10px;width:100%;min-height:64px;border:0;border-radius:18px;background:linear-gradient(180deg,#ff9a3c,#e5622b);color:#fff;font:800 20px var(--dm-font);box-shadow:0 5px 0 #b8461c;cursor:pointer;touch-action:manipulation;-webkit-user-select:none;user-select:none;-webkit-touch-callout:none;-webkit-tap-highlight-color:transparent}
.sp-lino-jump:active{transform:translateY(3px);box-shadow:0 2px 0 #b8461c}
.sp-lino-jump.is-q{background:linear-gradient(180deg,#ffd84a,#f5a800);color:#3d2a06;box-shadow:0 6px 0 #b77d00}
.sp-lino-jump.is-now{animation:linoQ .5s ease-in-out infinite alternate}
@keyframes linoQ{from{transform:scale(1)}to{transform:scale(1.04)}}
@media (prefers-reduced-motion:reduce){.sp-lino-jump.is-now{animation:none}}
.sp-lino-hint{margin:8px 0 0;text-align:center;color:#5b6680;font-size:14px}
.sp-play.sp-lino{scroll-margin-top:96px}
.sp-lino-wrap canvas{scroll-margin-top:84px}
@media (max-width:760px){body:has(.sp-lino-wrap) #site-helper{display:none}}
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
.sp-lino-sub{margin:18px 0 4px;font-size:19px}
.sp-lino-lv.is-ride{background:linear-gradient(135deg,#fff7e6,#eef6ff)}
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
    /* ---------- Neue Welten: unterwegs mit Fahrzeug (öffnen sich nach Welt A1) ---------- */
    {
      id: "Auto",
      lv: "A2",
      name: "Autobahn",
      emoji: "🚗",
      theme: "road",
      ride: "car",
      d: 1,
      sky: ["#8fd0ff", "#eaf6ff"],
      hill: "#86c26f",
      hill2: "#6aa95a",
      ground: "#4b4f58",
      grass: "#9aa0a8",
      questions: [
        ["Ich fahre ___ Auto zur Arbeit.", "mit dem", "mit der", "mit den", "mit + Dativ: das Auto → mit dem Auto"],
        ["Die Ampel ist rot. Ich muss ___.", "halten", "parken", "tanken", "Bei Rot hält man an."],
        ["Der Tank ist fast leer. Ich muss ___.", "tanken", "waschen", "reparieren", "An der Tankstelle tankt man Benzin oder Diesel."],
        ["Biegen Sie an der Kreuzung ___ ab.", "links", "geradeaus", "weiter", "links / rechts abbiegen"],
        ["Fahren Sie immer ___ bis zum Bahnhof.", "geradeaus", "abbiegen", "zurück", "geradeaus = nicht links und nicht rechts"],
        ["Mein Auto ist kaputt. Ich bringe es in die ___.", "Werkstatt", "Apotheke", "Bäckerei", "Autos repariert man in der Werkstatt."],
        ["Hast du schon einen ___?", "Führerschein", "Fahrschein", "Fahrplan", "Mit dem Führerschein darf man Auto fahren."],
        ["Wo kann ich hier ___?", "parken", "geparkt", "parkt", "Modalverb + Infinitiv am Ende: kann … parken"],
        ["Ich bin gestern nach Köln ___.", "gefahren", "gefahrt", "fahren", "Perfekt mit sein: ich bin gefahren"],
        ["Der Bus fährt ___ Hauptbahnhof.", "zum", "zur", "zu die", "der Bahnhof → zu dem = zum Bahnhof"],
        ["Die Straße ist gesperrt. Es gibt eine ___.", "Umleitung", "Umzug", "Unterschrift", "Umleitung = ein anderer Weg wegen einer Sperrung"],
        ["Im Stau ___ wir eine Stunde gewartet.", "haben", "sind", "werden", "warten → Perfekt mit haben"],
        ["Bitte ___ Sie sich an!", "schnallen", "schnallst", "schnallt", "Imperativ mit Sie: Schnallen Sie sich an!"],
        ["Das Auto ist ___ als das Fahrrad.", "schneller", "schnell", "am schnellsten", "Komparativ: schneller als"],
        ["Ich suche einen Parkplatz in der ___ vom Kino.", "Nähe", "Nah", "Nahe", "in der Nähe von"],
        ["Mit dem Auto ___ ich 20 Minuten ins Büro.", "brauche", "dauere", "nehme", "Ich brauche 20 Minuten. / Es dauert 20 Minuten."],
      ],
    },
    {
      id: "Schnee",
      lv: "B1",
      name: "Winterberg",
      emoji: "🛷",
      theme: "snow",
      ride: "sled",
      d: 2,
      sky: ["#b9d6f2", "#f1f7ff"],
      hill: "#e9f2fb",
      hill2: "#c9dcef",
      ground: "#dfeaf5",
      grass: "#ffffff",
      questions: [
        ["Wir bleiben zu Hause, ___ es draußen stark schneit.", "weil", "obwohl", "deshalb", "weil + Grund, das Verb steht am Ende"],
        ["___ es kalt ist, fahren wir Schlitten.", "Obwohl", "Weil", "Trotzdem", "obwohl = Gegengrund"],
        ["Ich freue mich ___ die Winterferien.", "auf", "über", "an", "sich freuen auf + Akkusativ (etwas kommt noch)"],
        ["Zieh eine Mütze an, ___ du dich nicht erkältest!", "damit", "dass", "weil", "damit = Ziel oder Zweck"],
        ["Gestern ___ es den ganzen Tag.", "schneite", "schneit", "geschneit", "Präteritum: es schneite"],
        ["Das ist der Berg, ___ wir letztes Jahr bestiegen haben.", "den", "der", "dem", "Relativpronomen im Akkusativ, maskulin: den"],
        ["Wenn ich Zeit ___, würde ich Ski fahren lernen.", "hätte", "habe", "hatte", "Konjunktiv II: hätte"],
        ["Ich interessiere mich ___ Wintersport.", "für", "auf", "an", "sich interessieren für + Akkusativ"],
        ["Es ist so glatt, ___ man kaum laufen kann.", "dass", "damit", "ob", "so …, dass = Folge"],
        ["Weißt du, ___ der Lift heute fährt?", "ob", "wenn", "dass", "indirekte Ja/Nein-Frage: ob"],
        ["Nachdem wir gerodelt ___, tranken wir Kakao.", "waren", "haben", "sind", "nachdem + Plusquamperfekt: waren gerodelt"],
        ["Der Weg wird jeden Morgen ___.", "geräumt", "räumen", "räumt", "Passiv: wird + Partizip II"],
        ["Trotz ___ Kälte gehen wir spazieren.", "der", "die", "dem", "trotz + Genitiv: trotz der Kälte"],
        ["Je mehr es schneit, ___ schöner wird es.", "desto", "als", "wie", "je …, desto"],
        ["Bei dem Wetter habe ich keine Lust ___.", "rauszugehen", "rausgehen", "rauszugehst", "Lust haben + zu + Infinitiv"],
        ["Pass auf, die Straßen sind ___ Schnee bedeckt.", "mit", "von", "aus", "mit Schnee bedeckt"],
      ],
    },
    {
      id: "Strand",
      lv: "B2",
      name: "Ostseestrand",
      emoji: "🚲",
      theme: "beach",
      ride: "bike",
      d: 3,
      sky: ["#7fc9ff", "#fff3d1"],
      hill: "#2f8fd1",
      hill2: "#5bb5ea",
      ground: "#e9cf94",
      grass: "#f3e0ae",
      questions: [
        ["___ des schlechten Wetters fiel der Ausflug aus.", "Wegen", "Trotz", "Während", "wegen + Genitiv = Grund"],
        ["Ich hätte gern ein Zimmer ___ Meerblick.", "mit", "von", "bei", "ein Zimmer mit Meerblick"],
        ["Der Urlaub muss bis Ende März ___ werden.", "beantragt", "beantragen", "beantragte", "Passiv mit Modalverb: muss beantragt werden"],
        ["Die Pension, ___ Preis sehr günstig war, lag direkt am Strand.", "deren", "dessen", "denen", "die Pension → deren (Genitiv, feminin)"],
        ["Hätten wir früher gebucht, ___ wir ein Zimmer bekommen.", "hätten", "würden", "wären", "Konjunktiv II der Vergangenheit: hätten … bekommen"],
        ["Der Flug ist ___ eines Streiks gestrichen worden.", "aufgrund", "anhand", "anstatt", "aufgrund + Genitiv = wegen"],
        ["Sie hat sich ___ den Lärm im Hotel beschwert.", "über", "auf", "an", "sich beschweren über + Akkusativ"],
        ["Am Strand ist auf Sonnenschutz ___ achten.", "zu", "um", "für", "sein + zu + Infinitiv (= man muss)"],
        ["Die Kurtaxe wird ___ Ankunft bezahlt.", "bei", "mit", "zu", "bei Ankunft = wenn man ankommt"],
        ["Es wäre schön, ___ wir mehr Zeit am Meer hätten.", "wenn", "ob", "als", "irrealer Wunsch: wenn … hätten"],
        ["Nicht nur das Wetter, ___ auch das Essen war toll.", "sondern", "aber", "sowie", "nicht nur …, sondern auch"],
        ["Ich bin es nicht gewohnt, so früh ___.", "aufzustehen", "aufstehen", "aufgestanden", "gewohnt sein + zu + Infinitiv"],
        ["___ ich am Strand lag, ging die Sonne unter.", "Während", "Nachdem", "Bevor", "während = gleichzeitig"],
        ["Die Reise wurde uns von einer Kollegin ___.", "empfohlen", "empfehlt", "empfahl", "Passiv Präteritum: wurde empfohlen"],
        ["Er tut so, ___ er schon alles wüsste.", "als ob", "ob", "wie", "als ob + Konjunktiv II"],
        ["Die Strandkörbe können online ___ werden.", "gemietet", "mieten", "gemietete", "Passiv mit Modalverb: können … gemietet werden"],
      ],
    },
  ];
  // Fehlermonster am Ende jeder Welt: [Name, Körperfarbe, dunkle Farbe]
  const BOSSES = {
    A1: ["Artikel-Troll", "#7bc96f", "#3f8a3a"],
    A2: ["Verb-Krake", "#b07be0", "#6c3fa3"],
    B1: ["Konnektor-Golem", "#8d9bb0", "#4f5d73"],
    B2: ["Passiv-Drache", "#e0703c", "#9c3d17"],
    C1: ["Nominalstil-Riese", "#5c6bd6", "#2c3790"],
    Auto: ["Stau-Roboter", "#f2b33a", "#a8740c"],
    Schnee: ["Eis-Yeti", "#bfe3ff", "#5b8fc4"],
    Strand: ["Kauderwelsch-Krake", "#ff7f8f", "#b33b4d"],
  };
  const MAIN = 5; // Welten 1–5 (A1–C1); danach die Fahrzeug-Welten
  const wTitle = (w) => (w.lv ? `${w.emoji} ${w.name}` : `Welt ${w.id}`);
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
      roar: (t) => {
        tone(110, t, 0.6, "sawtooth", 0.5, 55);
        noise(t, 0.5, 0.35, 700);
      },
      bosshit: (t) => {
        noise(t, 0.18, 0.45, 2500);
        [880, 660, 440].forEach((f, i) => tone(f, t + i * 0.06, 0.1, "square", 0.4));
      },
      shoot: (t) => tone(300, t, 0.12, "triangle", 0.3, 160),
      honk: (t) => {
        tone(392, t, 0.12, "square", 0.4);
        tone(392, t + 0.16, 0.22, "square", 0.4);
      },
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
        const root = [60, 62, 57, 64, 55, 62, 57, 65, 50, 53][world] ?? 60,
          bpm = [108, 114, 120, 126, 100, 134, 104, 116, 152, 92][world] ?? 112;
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
    const d = WORLDS[L].d ?? L;
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
      gapMax = d < 2 ? 2 : 3;
    // Booster für die ?-Kisten: Joker und Herz kommen in jeder Welt vor
    const bag = ["joker", "herz", "magnet", "stern", "doppel", d < 2 ? "joker" : "herz"];
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
      const nGap = [1, 1, 2, 2, 2][d] + (r() < 0.35 && d > 0 ? 1 : 0);
      const nEn = [g > 1 ? 1 : 0, 1, 1, 2, 2][d] + (r() < 0.3 && d > 2 ? 1 : 0);
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
          add(d >= 2 ? 10 : 8); // Platz nach dem Käfer, damit danach keine Lücke direkt folgt
          enemies.push({ x: (x0 + 4) * T, min: (x0 + 1) * T, max: (x0 + 6) * T, dir: -1, sp: 22 + d * 9, alive: true, t: r() * 6 });
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
    add(6);
    const arena = solid.length * T; // Kampfplatz mit dem Fehlermonster
    add(24);
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
    return { solid, coins, enemies, plats, clouds, gates, goal, arena, secret, ch, T, mainLen, len: solid.length * T };
  }

  DMGame.register({
    id: "lino",
    cat: "abenteuer",
    title: "Lino läuft – das Deutsch-Abenteuer",
    icon: "🏃",
    level: "A1–C1",
    desc: "Jump’n’Run in 8 Welten: Springe über Lücken und Fehlerkäfer, fahre Auto, Schlitten und Fahrrad, finde Booster und geheime Kammern, löse an jedem Tor eine Deutschfrage und besiege am Ende das Fehlermonster – von A1 bis C1.",
    intro:
      "Deine Figur läuft von selbst – tippe zum Springen (lange drücken = höher). Löse an jedem Tor eine Deutschfrage, öffne ❓-Kisten und besiege am Ende das Fehlermonster. 8 Welten von A1 bis C1, auch mit Auto, Schlitten und Fahrrad.",
    start(api) {
      const prog = load();
      prog.unlocked = Math.max(1, prog.unlocked || 1);
      let total = 0;
      const wrongAll = [];
      menu();

      function isOpen(i) {
        if (i < MAIN || prog.unlocked >= WORLDS.length) return i < prog.unlocked;
        return prog.unlocked >= 2 && (i === MAIN || prog["best" + WORLDS[i - 1].id] != null);
      }
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
            const open = isOpen(i),
              best = prog["best" + w.id],
              key = prog.secrets?.[w.id];
            return `${i === MAIN ? '</div><h3 class="sp-lino-sub">Neu: Unterwegs mit Auto, Schlitten und Fahrrad</h3><p class="dm-small" style="margin:0 0 8px">Öffnen sich, wenn du Welt A1 geschafft hast – eine nach der anderen. An der Autobahn wartet statt Toren eine Ampel.</p><div class="sp-lino-levels">' : ""}<button type="button" class="sp-lino-lv${w.lv ? " is-ride" : ""}" data-i="${i}"${open ? "" : " disabled"}><i aria-hidden="true">${open ? (best != null ? "⭐" : w.lv ? w.emoji : "▶") : "🔒"}</i><b>${w.lv || w.id}</b><span>Welt ${i + 1}: ${w.name}</span><small>${best != null ? `Rekord: ${best} Punkte` : open ? "Bereit" : w.lv ? (i === MAIN ? "Nach Welt A1" : `Nach „${WORLDS[i - 1].name}“`) : "Noch gesperrt"}${key ? " · 🗝 Kammer" : ""}${prog.bosses?.[w.id] ? " · 🏆 Monster besiegt" : ""}</small></button>`;
          }).join("")}</div>
          <details class="sp-lino-legend"><summary>Booster und Geheimnisse</summary><ul>
            <li><b>❓</b><span><b>Kisten</b> sind fest. Stoß die ❓-Kiste von unten mit dem Kopf an – dann kommt ein Booster heraus.</span></li>
            ${Object.values(BOOSTS).map((b) => `<li><b>${b.ic}</b><span><b>${b.name}:</b> ${b.txt}</span></li>`).join("")}
            <li><b>👾</b><span><b>Fehlermonster:</b> Am Ende jeder Welt wartet ein Monster. Spring über die roten falschen Wörter, die es wirft (ab B1 fliegen manche lila Wörter oben vorbei – dann nicht springen). Danach kommt eine Frage: Jede richtige Antwort ist ein Treffer. 3 Treffer (ab B2: 4) – dann ist es besiegt.</span></li>
            <li><b>☁️</b><span><b>Wolken</b> kannst du von unten durchspringen und oben darauf landen.</span></li>
            <li><b>🗝</b><span><b>Geheime Kammer:</b> In jeder Welt versteckt – hoch oben. Tipp: Lange drücken springt höher. In der Kammer wartet eine Schatztruhe mit Bonusfrage – ohne Risiko.</span></li>
          </ul></details>
          ${WORLDS.some((w, i) => !isOpen(i)) ? '<p style="text-align:center;margin:6px 0 0"><button type="button" class="sp-lino-unlock">Ich kann schon mehr – alle Welten öffnen</button></p>' : ""}`;
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
        const TH = W0.theme || ["", "city", "", "zeche", "night"][L],
          ROAD = TH === "road";
        const look = heroLook(prog.look);
        const qs = api.shuffle(W0.questions).slice(0, GATES);
        const lvl = buildLevel(L);
        const narrow = api.el.clientWidth < 520;
        const VW = narrow ? 480 : 640,
          VH = 360,
          GROUND = VH - 48,
          T = lvl.T;
        const dpr = Math.min(2, window.devicePixelRatio || 1);
        api.el.innerHTML = `<div class="sp-lino-wrap"><canvas width="${VW * dpr}" height="${VH * dpr}" aria-label="Spielfeld: ${heroName(look)} läuft durch die Welt ${W0.name}" role="img"></canvas><div class="sp-lino-banner">${W0.lv ? `${W0.emoji} ${W0.name} · ${W0.lv}` : `Welt ${W0.id}: ${W0.name}`}</div><button type="button" class="sp-lino-snd sp-lino-pause" aria-pressed="false" aria-label="Pause">⏸</button><button type="button" class="sp-lino-snd" aria-pressed="${SND.on}" aria-label="Ton">${SND.on ? "🔊" : "🔇"}</button></div>
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
          if (SND.on && !(state === "dead")) SND.startMusic(inCh ? 9 : L);
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
        const speed = 138 + (W0.d ?? L) * 16 + (W0.ride === "car" ? 14 : 0),
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
          bannerT = 0,
          qHold = 0,
          qTarget = null, // ❓-Kiste, unter der automatisch gesprungen wird
          qMode = ""; // Zustand des Sprungknopfs: "", "near", "under"
        const wrong = [],
          wrongItems = [],
          fx = [],
          B = { joker: 0, magnet: 0, stern: 0, doppel: 0 };
        // Fehlermonster
        const BI = BOSSES[W0.id] || ["Fehlermonster", "#9b6bd6", "#5a3a8c"];
        const boss = {
          name: BI[0],
          col: BI[1],
          dark: BI[2],
          hp: (W0.d ?? L) >= 3 ? 4 : 3,
          max: (W0.d ?? L) >= 3 ? 4 : 3,
          phase: "wait", // wait → intro → attack → (ask) → hurt → … → dead → gone
          t: 0,
          spawn: 0,
          shots: [],
          beam: null,
          used: [],
          stand: lvl.arena + 3 * T,
          x: lvl.arena + 3 * T + VW - 170,
          mouth: 0,
          flash: 0,
        };
        const bossWords = W0.questions.flatMap((q) => [q[2], q[3]]).filter((w) => w && w.length <= 14);
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
            step: `${W0.lv || W0.id} · ${ROAD ? "Ampel" : "Tor"} ${Math.min(gateIdx + 1, GATES)}/${GATES}`,
            progress: gateIdx / GATES,
            score: total + score,
            lives,
            maxLives: 3,
          });
        }
        hud();
        runPanel();

        // Spielfeld und Sprungknopf ganz zeigen (unter der festen Kopfzeile)
        function showField() {
          requestAnimationFrame(() => {
            const hd = document.querySelector("header.dm-header"),
              hh = hd && getComputedStyle(hd).position === "sticky" ? hd.getBoundingClientRect().height : 0,
              card = api.el.closest(".sp-play") || api.el,
              c = cv.getBoundingClientRect(),
              jb = panel.getBoundingClientRect();
            if (c.top < hh + 4 || jb.bottom > innerHeight) window.scrollBy({ top: card.getBoundingClientRect().top - hh - 8, behavior: "instant" });
          });
        }
        function runPanel() {
          panel.innerHTML = `<button type="button" class="sp-lino-jump" aria-label="Springen"><span aria-hidden="true">⤒</span> <span class="sp-lino-jl">Springen</span></button>
            <p class="sp-lino-hint">Tippe aufs Spielfeld oder den Knopf · Lange drücken = höher · ❓-Kiste: tippe direkt auf die Kiste oder auf den gelben Knopf · Am Computer: Leertaste, P = Pause</p>`;
          qMode = "";
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

        /* ❓-Kisten-Hilfe fürs Handy: Kiste vor der Figur finden; Sprung genau darunter auslösen */
        const qCenter = (pl) => pl.x + pl.q * T + T / 2;
        function nextQ(range) {
          const cx = P.x + P.w / 2;
          let best = null;
          for (const pl of lvl.plats) {
            if (pl.used || pl.q < 0) continue;
            if (inCh ? pl.x < lvl.ch.x0 : pl.x > lvl.mainLen) continue;
            const qc = qCenter(pl);
            if (cx > pl.x + pl.w - 6 || qc - cx > range) continue;
            if (!best || pl.x < best.x) best = pl;
          }
          return best;
        }
        const underQ = (pl) => {
          const cx = P.x + P.w / 2;
          return cx > pl.x + 4 && cx < pl.x + pl.w - 4;
        };
        function setQMode(m) {
          if (m === qMode) return;
          qMode = m;
          const jb = panel.querySelector(".sp-lino-jump");
          if (!jb) return;
          jb.classList.toggle("is-q", m !== "");
          jb.classList.toggle("is-now", m === "under");
          const l = jb.querySelector(".sp-lino-jl");
          if (l) l.textContent = m === "under" ? "❓ Jetzt springen!" : m === "near" ? "❓ Kiste öffnen" : "Springen";
          jb.setAttribute("aria-label", m ? "Springen und die Fragezeichen-Kiste öffnen" : "Springen");
        }
        function updateQ() {
          if (state !== "run") return setQMode("");
          const pl = qTarget && !qTarget.used ? qTarget : nextQ(3.2 * T);
          if (!pl) return setQMode("");
          setQMode(underQ(pl) ? "under" : "near");
        }
        function press() {
          if (state !== "run") return;
          // Kiste kurz vor der Figur: nicht zu früh springen, sondern genau unter dem ❓ (automatisch)
          if (P.onGround && !qTarget) {
            const pl = nextQ(3.2 * T);
            if (pl && !underQ(pl) && P.y + P.h > pl.y + CRATE_H) {
              // kurz tippen = Kiste öffnen; lange drücken = normaler hoher Sprung (z. B. auf die Kiste)
              qTarget = pl;
              qHold = 0;
              return;
            }
          }
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
          // Tipp direkt auf eine ❓-Kiste: die Figur springt automatisch darunter hoch
          if (state === "run") {
            const r = cv.getBoundingClientRect(),
              k = Math.min(r.width / VW, r.height / VH),
              ox = (r.width - VW * k) / 2,
              oy = (r.height - VH * k) / 2,
              wx = (e.clientX - r.left - ox) / k + camX,
              wy = (e.clientY - r.top - oy) / k,
              cx = P.x + P.w / 2;
            const pl = lvl.plats.find((q) => !q.used && q.q >= 0 && wx > q.x - 16 && wx < q.x + q.w + 16 && wy > q.y - 40 && wy < q.y + CRATE_H + 40 && cx < q.x + q.w - 6);
            if (pl) {
              if (underQ(pl) && (P.onGround || coyote > 0)) press();
              else if (P.y + P.h > pl.y + CRATE_H) {
                qTarget = pl;
                held = false;
                say("👆 Gleich springt deine Figur unter die ❓-Kiste!", 1.6);
              } else press();
              return;
            }
          }
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
          qTarget = null;
          if (["intro", "attack", "hurt"].includes(boss.phase)) {
            boss.shots = [];
            boss.phase = "intro";
            boss.t = 1.2;
          }
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
          SND.startMusic(9);
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
            // Kampfplatz: die Figur bleibt stehen, bis das Fehlermonster besiegt ist
            if (gateIdx >= GATES && boss.phase !== "gone" && P.x + P.w >= boss.stand) {
              vx = 0;
              P.x = boss.stand - P.w;
              if (boss.phase === "wait" && P.onGround) startBoss();
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
          if (!inCh && boss.phase !== "wait" && boss.phase !== "gone") {
            bossStep(dt);
            if (state !== "run") return;
          }
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
          // Automatischer Sprung unter der gewählten ❓-Kiste
          if (qTarget && held && P.onGround && (qHold += dt) > 0.2) {
            qTarget = null;
            P.vy = -JUMP * 0.78;
            P.onGround = false;
            coyote = 0;
            holdT = 0;
            SND.play("jump");
          }
          if (qTarget) {
            const cx = P.x + P.w / 2;
            if (qTarget.used || cx > qTarget.x + qTarget.w - 6) qTarget = null;
            else if (P.onGround && cx >= Math.min(qCenter(qTarget), qTarget.x + qTarget.w - 14) - 6) {
              qTarget = null;
              P.vy = -JUMP * 0.78;
              P.onGround = false;
              coyote = 0;
              holdT = 1; // kurzer Sprung reicht – der Kopf stößt an
              SND.play("jump");
            }
          }
          updateQ();
          if (inCh) camX = Math.max(lvl.ch.x0, Math.min(lvl.ch.x1 - VW, P.x - VW * 0.3));
          else {
            let target = P.x - VW * 0.3;
            // Kampf: Figur und Monster gleichzeitig zeigen
            if (gateIdx >= GATES && boss.phase !== "gone") target = Math.max(target, Math.min(boss.stand - 80, P.x - 40));
            target = Math.max(0, Math.min(lvl.mainLen - VW, target));
            camX = gateIdx >= GATES && Math.abs(target - camX) > 1 ? camX + (target - camX) * Math.min(1, dt * 4) : target;
          }
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
                  showField();
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
            tag: `${ROAD ? "🚦 Ampel" : "🚪 Tor"} ${gateIdx + 1} von ${GATES} · ${W0.lv || W0.id}`,
            onAnswer(ok, full) {
              gate.open = true;
              gate.ok = ok;
              if (ok) {
                right++;
                score += 100;
                if (ROAD) SND.play("honk");
                return ROAD ? "<b>Richtig! Die Ampel ist grün. +100</b>" : "<b>Richtig! Das Tor ist offen. +100</b>";
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
          if (L < MAIN && L + 2 > prog.unlocked) prog.unlocked = Math.min(MAIN, L + 2);
          save(prog);
          const nextW = WORLDS[L + 1];
          panel.innerHTML = `<div class="sp-lino-res"><div class="sp-lino-stars" aria-label="${stars} von 3 Sternen">${"⭐".repeat(stars)}${"☆".repeat(3 - stars)}</div>
            <h2>${wTitle(W0)} geschafft!</h2>
            <p>${right} von ${GATES} Fragen richtig · 👾 ${boss.name} besiegt · ${coinsGot} Münzen · Herz-Bonus ${bonus}<br><b>${score} Punkte</b></p>
            <div class="ch-actions">${nextW ? `<button type="button" class="dm-btn ch-go" id="sp-lino-next">Weiter: ${nextW.lv ? `${nextW.emoji} ${nextW.name}` : `Welt ${nextW.id}`} ▶</button>` : `<button type="button" class="dm-btn ch-go" id="sp-lino-end">Abenteuer beenden 🏆</button>`}
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
            <div class="ch-actions"><button type="button" class="dm-btn ch-go" id="sp-lino-retry">${wTitle(W0)} neu starten</button><button type="button" class="dm-btn dm-btn-quiet" id="sp-lino-stop">Beenden</button></div></div>`;
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
          else if (TH === "night") {
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
            if (TH === "beach") beachBack(t);
            else {
              if (TH === "snow") mountains();
              hills(W0.hill2, 0.25, 150, 70);
              hills(W0.hill, 0.45, 110, 50);
            }
            if (TH === "city" || TH === "night") city();
            if (TH === "zeche") zeche();
            if (TH === "road") roadside();
          }
          ctx.save();
          ctx.translate(-Math.round(camX), 0);
          // Boden
          const i0 = Math.max(0, Math.floor(camX / T) - 1),
            i1 = Math.min(lvl.solid.length, i0 + Math.ceil(VW / T) + 3);
          for (let i = i0; i < i1; i++)
            if (!lvl.solid[i]) {
              ctx.fillStyle = TH === "beach" && !inCh ? "#2f8fd1" : pitG;
              ctx.fillRect(i * T, GROUND + 6, T, VH - GROUND);
              if (TH === "beach" && !inCh) {
                ctx.fillStyle = "rgba(255,255,255,.55)";
                ctx.fillRect(i * T + ((t * 20 + i * 9) % T), GROUND + 12 + (i % 2) * 8, 10, 2);
              }
            } else {
              ctx.fillStyle = inCh ? "#4a3626" : W0.ground;
              ctx.fillRect(i * T, GROUND, T, VH - GROUND);
              ctx.fillStyle = inCh ? "#7a5a3a" : W0.grass;
              ctx.fillRect(i * T, GROUND, T, 9);
              if (TH === "road" && !inCh) {
                // Fahrbahnmarkierung
                if (i % 3 === 0) {
                  ctx.fillStyle = "#f4f4f4";
                  ctx.fillRect(i * T + 4, GROUND + 22, T + 8, 4);
                }
              } else if (TH === "snow" && !inCh) {
                ctx.fillStyle = "rgba(120,160,210,.25)";
                ctx.fillRect(i * T + (i % 2 ? 6 : 18), GROUND + 20, 8, 3);
              } else {
                ctx.fillStyle = "rgba(0,0,0,.12)";
                ctx.fillRect(i * T + (i % 2 ? 6 : 18), GROUND + 20, 6, 6);
              }
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
            if (ROAD) return trafficLight(gt, k, t);
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
            if (TH === "road" || TH === "snow" || TH === "beach") {
              themedEnemy(en);
              continue;
            }
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
          drawBoss(t);
          lino(t);
          if (TH === "snow" && !inCh) {
            ctx.save();
            ctx.translate(Math.round(camX), 0);
            snowfall(t);
            ctx.restore();
          }
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
          bossBar();
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
          drawHero(ctx, P.x, P.y, look, W0.ride ? W0.ride === "bike" && !P.onGround : !P.onGround, W0.ride === "bike" ? P.run * 14 : W0.ride ? 0.7 : P.run * 14, t);
          ctx.restore();
          if (W0.ride && !inCh) vehicle(t);
        }


        /* ---------- Fehlermonster: Kampf am Ende der Welt ---------- */
        function startBoss() {
          boss.phase = "intro";
          boss.t = 0;
          held = false;
          qTarget = null;
          SND.startMusic(8);
          SND.play("roar");
          say(`👾 <b>${boss.name}!</b> Rote Wörter: springen${(W0.d ?? L) >= 2 ? " · Lila Wörter: stehen bleiben" : ""}`, 3.6);
        }
        function bossShoot() {
          const dd = W0.d ?? L,
            // ab B1: manche Wörter fliegen hoch – dann NICHT springen, sondern stehen bleiben
            high = dd >= 2 && boss.shots.length === 0 && Math.random() < 0.3;
          boss.shots.push({
            x: boss.x - 40,
            y: high ? GROUND - 66 : GROUND - 14,
            high,
            vx: -(160 + dd * 14),
            vy: 0,
            hop: 0,
            word: bossWords.length ? bossWords[Math.floor(Math.random() * bossWords.length)] : "✗",
            r: 0,
          });
          boss.mouth = 0.35;
          SND.play("shoot");
        }
        function bossStep(dt) {
          const dd = W0.d ?? L;
          boss.t += dt;
          if (boss.mouth > 0) boss.mouth -= dt;
          if (boss.flash > 0) boss.flash -= dt;
          // falsche Wörter fliegen auf die Figur zu
          const pcx = P.x + P.w / 2;
          for (const sh of boss.shots) {
            sh.x += sh.vx * dt;
            sh.r += dt * 5;
            if (sh.hop) {
              sh.vy += 900 * dt;
              sh.y += sh.vy * dt;
              if (sh.y > GROUND - 14) {
                sh.y = GROUND - 14;
                sh.vy = -sh.hop;
              }
            }
            if (!sh.dead && Math.abs(sh.x - pcx) < 18 && P.y + P.h > sh.y - 9 && P.y < sh.y + 9) {
              if (B.stern > 0) {
                sh.dead = true;
                score += 20;
                SND.play("stomp");
                hud();
              } else if (P.inv <= 0) {
                sh.dead = true;
                hit();
                return;
              }
            }
            if (!sh.dead && !sh.passed && sh.x < P.x - 16) {
              sh.passed = true;
              score += 10;
            }
          }
          boss.shots = boss.shots.filter((sh) => !sh.dead && sh.x > camX - 80);
          if (boss.phase === "intro") {
            if (boss.t > 2.4) {
              boss.phase = "attack";
              boss.t = 0;
              boss.spawn = 0.4;
            }
          } else if (boss.phase === "attack") {
            const dur = 4.6 + dd * 0.5;
            boss.spawn -= dt;
            if (boss.t < dur && boss.spawn <= 0) {
              bossShoot();
              boss.spawn = Math.max(1, 1.55 - dd * 0.12) * (0.85 + Math.random() * 0.35);
            }
            if (boss.t >= dur && boss.shots.every((sh) => sh.x < P.x - 20) && P.onGround) askBoss();
          } else if (boss.phase === "hurt") {
            if (boss.t > 1.1) {
              if (boss.hp <= 0) {
                boss.phase = "dead";
                boss.t = 0;
                score += 300;
                SND.play("win");
                fx.push({ x: boss.x, y: GROUND - 110, t: 0, text: "🏆 +300" });
                for (let k = 0; k < 10; k++) lvl.coins.push({ x: boss.x - 60 + k * 14, y: GROUND - 30 - (k % 3) * 18, got: false });
                hud();
              } else {
                boss.phase = "attack";
                boss.t = 0;
                boss.spawn = 0.7;
              }
            }
          } else if (boss.phase === "dead") {
            if (boss.t > 1.6) {
              boss.phase = "gone";
              prog.bosses = { ...(prog.bosses || {}), [W0.id]: true };
              save(prog);
              SND.startMusic(L);
              say(`🏆 <b>${boss.name} besiegt!</b> Lauf ins Ziel ▶`, 2.6);
            }
          }
        }
        function askBoss() {
          let pool = W0.questions.filter((x) => !qs.includes(x) && !boss.used.includes(x));
          if (!pool.length) pool = wrongItems.length ? wrongItems.slice() : W0.questions.filter((x) => x !== boss.used[boss.used.length - 1]);
          const item = api.pick(pool, 1)[0];
          boss.used.push(item);
          boss.phase = "ask";
          boss.shots = [];
          quiz({
            item,
            tag: `👾 ${boss.name} · noch ${boss.hp} ${boss.hp === 1 ? "Treffer" : "Treffer"}`,
            note: "Richtige Antwort = Treffer. Falsche Antwort = ein Herz weniger.",
            onAnswer(ok, full) {
              if (ok) {
                boss.hp--;
                score += 150;
                boss.phase = "hurt";
                boss.t = 0;
                boss.beam = { t: 0 };
                boss.flash = 0.6;
                SND.play("bosshit");
                return boss.hp <= 0 ? `<b>Volltreffer! Der ${boss.name} ist besiegt! +150</b>` : `<b>Treffer! +150 · Das Monster hat noch ${boss.hp} ${boss.hp === 1 ? "Leben" : "Leben"}.</b>`;
              }
              lives--;
              api.vibrate();
              wrong.push({ correct: full, tip: item[4] });
              wrongAll.push({ correct: full, tip: item[4] });
              boss.phase = "attack";
              boss.t = 0;
              boss.spawn = 0.9;
              return "<b>Daneben – ein Herz weniger. Das Monster greift wieder an!</b>";
            },
          });
        }
        function drawBoss(t) {
          if (boss.phase === "gone" || inCh) return;
          if (boss.x > camX + VW + 120) return;
          const dying = boss.phase === "dead" ? Math.min(1, boss.t / 1.4) : 0;
          const bx = boss.x,
            by = GROUND,
            bob = Math.sin(t * 3) * 3,
            stun = boss.phase === "ask" || boss.phase === "hurt";
          ctx.save();
          ctx.translate(bx, by);
          ctx.scale(1 - dying * 0.6, 1 - dying * 0.9);
          ctx.globalAlpha = 1 - dying;
          const shake = boss.flash > 0 ? Math.sin(t * 60) * 4 : 0;
          ctx.translate(shake, 0);
          const body = boss.flash > 0 && Math.floor(t * 20) % 2 ? "#ffffff" : boss.col;
          // Füße
          ctx.fillStyle = boss.dark;
          ctx.beginPath();
          ctx.ellipse(-26, -6, 16, 8, 0, 0, 7);
          ctx.ellipse(26, -6, 16, 8, 0, 0, 7);
          ctx.fill();
          // Körper
          ctx.fillStyle = body;
          ctx.beginPath();
          ctx.ellipse(0, -58 + bob, 54, 52, 0, 0, 7);
          ctx.fill();
          ctx.strokeStyle = boss.dark;
          ctx.lineWidth = 4;
          ctx.stroke();
          ctx.fillStyle = "rgba(255,255,255,.22)";
          ctx.beginPath();
          ctx.ellipse(0, -44 + bob, 32, 28, 0, 0, 7);
          ctx.fill();
          // Hörner
          ctx.fillStyle = boss.dark;
          for (const k of [-1, 1]) {
            ctx.beginPath();
            ctx.moveTo(k * 22, -100 + bob);
            ctx.lineTo(k * 40, -132 + bob);
            ctx.lineTo(k * 38, -96 + bob);
            ctx.fill();
          }
          // Arme
          ctx.strokeStyle = body;
          ctx.lineWidth = 10;
          ctx.lineCap = "round";
          const wave = boss.mouth > 0 ? -18 : Math.sin(t * 4) * 6;
          ctx.beginPath();
          ctx.moveTo(-48, -60 + bob);
          ctx.lineTo(-70, -48 + wave + bob);
          ctx.moveTo(48, -60 + bob);
          ctx.lineTo(68, -44 - wave * 0.5 + bob);
          ctx.stroke();
          ctx.lineCap = "butt";
          // Augen (schauen zur Figur)
          const look = Math.max(-3, Math.min(3, (P.x - bx) / 60));
          for (const k of [-1, 1]) {
            ctx.fillStyle = "#fff";
            ctx.beginPath();
            ctx.ellipse(k * 18, -78 + bob, 12, 13, 0, 0, 7);
            ctx.fill();
            ctx.fillStyle = "#172036";
            if (stun) {
              ctx.font = "900 15px system-ui,sans-serif";
              ctx.textAlign = "center";
              ctx.fillText("✕", k * 18, -73 + bob);
            } else {
              ctx.beginPath();
              ctx.arc(k * 18 + look, -76 + bob, 5, 0, 7);
              ctx.fill();
            }
            // böse Augenbrauen
            ctx.strokeStyle = boss.dark;
            ctx.lineWidth = 4;
            ctx.beginPath();
            ctx.moveTo(k * 30, -96 + bob);
            ctx.lineTo(k * 8, -90 + bob);
            ctx.stroke();
          }
          // Maul mit Zähnen
          const open = boss.mouth > 0 ? 16 : stun ? 4 : 8;
          ctx.fillStyle = "#3a0f18";
          ctx.beginPath();
          ctx.ellipse(0, -46 + bob, 24, open, 0, 0, 7);
          ctx.fill();
          ctx.fillStyle = "#fff";
          for (let k = -2; k <= 2; k++) {
            ctx.beginPath();
            ctx.moveTo(k * 9 - 4, -46 - open + 2 + bob);
            ctx.lineTo(k * 9 + 4, -46 - open + 2 + bob);
            ctx.lineTo(k * 9, -46 - open + 9 + bob);
            ctx.fill();
          }
          // ✗ auf dem Bauch
          ctx.fillStyle = "rgba(214,51,43,.9)";
          ctx.font = "900 20px system-ui,sans-serif";
          ctx.textAlign = "center";
          ctx.fillText("✗", 0, -14 + bob);
          ctx.restore();
          ctx.globalAlpha = 1;
          // Sterne über dem Kopf, wenn das Monster betäubt ist
          if (stun) {
            ctx.font = "16px system-ui,sans-serif";
            for (let k = 0; k < 3; k++) {
              const a = t * 3 + (k * Math.PI * 2) / 3;
              ctx.fillText("⭐", bx + Math.cos(a) * 34, GROUND - 140 + Math.sin(a) * 8);
            }
          }
          // Treffer-Strahl: Wortstern von der Figur zum Monster
          if (boss.beam && boss.phase === "hurt") {
            const k = Math.min(1, boss.t / 0.45),
              sx = P.x + 11 + (bx - P.x - 11) * k,
              sy = P.y + 10 + (GROUND - 70 - P.y - 10) * k - Math.sin(k * Math.PI) * 60;
            if (k < 1) {
              ctx.font = "26px system-ui,sans-serif";
              ctx.fillText("🌟", sx, sy);
            } else if (boss.t < 0.9) {
              ctx.font = "800 20px system-ui,sans-serif";
              ctx.lineWidth = 4;
              ctx.strokeStyle = "#fff";
              ctx.strokeText("TREFFER!", bx, GROUND - 150);
              ctx.fillStyle = "#d6332b";
              ctx.fillText("TREFFER!", bx, GROUND - 150);
            }
          }
          // fliegende falsche Wörter
          for (const sh of boss.shots) {
            ctx.font = "800 12px system-ui,sans-serif";
            const w = Math.max(28, ctx.measureText(sh.word).width + 16);
            const wy = sh.high ? Math.sin(sh.r * 2) * 3 : 0;
            ctx.save();
            ctx.translate(0, wy);
            ctx.fillStyle = sh.high ? "#7b3fd0" : "#d6332b";
            roundRect(sh.x - w / 2, sh.y - 11, w, 22, 11);
            ctx.fill();
            if (sh.high) {
              // kleine Flügel: dieses Wort fliegt oben vorbei
              ctx.fillStyle = "rgba(255,255,255,.9)";
              ctx.beginPath();
              ctx.ellipse(sh.x + w / 2 - 2, sh.y - 12, 8, 4, -0.5, 0, 7);
              ctx.fill();
            }
            ctx.strokeStyle = sh.high ? "#3e1a7a" : "#7a1410";
            ctx.lineWidth = 2;
            ctx.stroke();
            ctx.fillStyle = "#fff";
            ctx.textAlign = "center";
            ctx.fillText(sh.word, sh.x, sh.y + 4);
            ctx.restore();
          }
        }
        function bossBar() {
          if (inCh || boss.phase === "wait" || boss.phase === "gone") return;
          // links oben (rechts sind Pause und Ton); unter den Booster-Anzeigen
          const hasB = B.joker > 0 || B.magnet > 0 || B.stern > 0 || B.doppel > 0,
            w = Math.min(220, VW - 150),
            x = 16,
            y = hasB ? 70 : 32;
          ctx.fillStyle = "rgba(23,32,54,.82)";
          roundRect(x - 8, y - 22, w + 16, 40, 12);
          ctx.fill();
          ctx.fillStyle = "#fff";
          ctx.font = "800 13px system-ui,sans-serif";
          ctx.textAlign = "center";
          ctx.fillText("👾 " + boss.name, x + w / 2, y - 6);
          ctx.fillStyle = "rgba(255,255,255,.2)";
          roundRect(x, y + 2, w, 9, 5);
          ctx.fill();
          ctx.fillStyle = "#ff5a4e";
          roundRect(x, y + 2, Math.max(0, (w * boss.hp) / boss.max), 9, 5);
          ctx.fill();
        }
        /* ---------- Fahrzeuge und Themen-Welten ---------- */
        function wheel(x, y, r, t) {
          ctx.fillStyle = "#1d2230";
          ctx.beginPath();
          ctx.arc(x, y, r, 0, 7);
          ctx.fill();
          ctx.fillStyle = "#c9ced8";
          ctx.beginPath();
          ctx.arc(x, y, r * 0.45, 0, 7);
          ctx.fill();
          const a = P.run * 12;
          ctx.strokeStyle = "#1d2230";
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.moveTo(x + Math.cos(a) * r * 0.45, y + Math.sin(a) * r * 0.45);
          ctx.lineTo(x - Math.cos(a) * r * 0.45, y - Math.sin(a) * r * 0.45);
          ctx.stroke();
        }
        function vehicle(t) {
          const x = P.x + 11,
            y = P.y + 34; // Füße der Figur
          const tilt = P.onGround ? 0 : Math.max(-0.18, Math.min(0.18, P.vy / 2600));
          ctx.save();
          ctx.translate(x, y);
          ctx.rotate(tilt);
          if (W0.ride === "car") {
            // kleines rotes Auto – die Figur sitzt darin
            const bob = P.onGround ? Math.sin(t * 18) * 0.6 : 0;
            ctx.fillStyle = "#e5322b";
            roundRect(-26, -22 + bob, 54, 16, 6);
            ctx.fill();
            ctx.fillStyle = "#c4241e";
            roundRect(-26, -12 + bob, 54, 6, 3);
            ctx.fill();
            ctx.fillStyle = "rgba(190,230,255,.55)";
            roundRect(-14, -38 + bob, 30, 17, 6);
            ctx.fill();
            ctx.strokeStyle = "#e5322b";
            ctx.lineWidth = 3;
            roundRect(-14, -38 + bob, 30, 17, 6);
            ctx.stroke();
            ctx.fillStyle = "#ffe27a";
            ctx.fillRect(22, -19 + bob, 6, 5);
            ctx.fillStyle = "#ffffff";
            ctx.font = "800 9px system-ui,sans-serif";
            ctx.textAlign = "center";
            ctx.fillText("DE", 0, -13 + bob);
            wheel(-15, -4, 7, t);
            wheel(17, -4, 7, t);
            if (P.onGround && Math.floor(t * 10) % 2) {
              ctx.fillStyle = "rgba(160,160,170,.45)";
              ctx.beginPath();
              ctx.arc(-32 - (t * 40) % 8, -8, 4, 0, 7);
              ctx.fill();
            }
          } else if (W0.ride === "sled") {
            ctx.strokeStyle = "#7a4a1e";
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.moveTo(-20, -1);
            ctx.lineTo(16, -1);
            ctx.quadraticCurveTo(26, -1, 24, -10);
            ctx.stroke();
            ctx.fillStyle = "#b5702e";
            ctx.fillRect(-18, -9, 32, 5);
            ctx.strokeStyle = "#7a4a1e";
            ctx.lineWidth = 2;
            for (const k of [-12, 6]) {
              ctx.beginPath();
              ctx.moveTo(k, -4);
              ctx.lineTo(k, -1);
              ctx.stroke();
            }
            if (P.onGround) {
              ctx.fillStyle = "rgba(255,255,255,.9)";
              for (let k = 0; k < 3; k++) {
                ctx.beginPath();
                ctx.arc(-24 - k * 7 - ((t * 60) % 7), -2 - k * 2, 3 - k * 0.6, 0, 7);
                ctx.fill();
              }
            }
          } else if (W0.ride === "bike") {
            wheel(-14, -7, 8, t);
            wheel(16, -7, 8, t);
            ctx.strokeStyle = "#1f9d8a";
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.moveTo(-14, -7);
            ctx.lineTo(-2, -20);
            ctx.lineTo(12, -20);
            ctx.lineTo(16, -7);
            ctx.moveTo(-2, -20);
            ctx.lineTo(2, -7);
            ctx.lineTo(-14, -7);
            ctx.moveTo(12, -20);
            ctx.lineTo(10, -27);
            ctx.stroke();
            ctx.fillStyle = "#172036";
            ctx.fillRect(-6, -23, 9, 3);
          }
          ctx.restore();
        }
        function trafficLight(gt, k, t) {
          const x = gt.x + 14,
            top = GROUND - 120;
          ctx.fillStyle = "#5c616d";
          ctx.fillRect(x - 3, top + 40, 6, GROUND - top - 40);
          ctx.fillStyle = "#222631";
          roundRect(x - 14, top, 28, 64, 8);
          ctx.fill();
          const red = !gt.open,
            green = gt.open;
          const lamp = (yy, on, col) => {
            ctx.fillStyle = on ? col : "#3b404c";
            ctx.beginPath();
            ctx.arc(x, top + yy, 7, 0, 7);
            ctx.fill();
            if (on) {
              ctx.fillStyle = col.replace(")", ",.25)").replace("rgb", "rgba");
              ctx.beginPath();
              ctx.arc(x, top + yy, 13, 0, 7);
              ctx.fill();
            }
          };
          lamp(12, red, "rgb(240,60,50)");
          lamp(32, false, "rgb(255,200,40)");
          lamp(52, green, "rgb(40,200,90)");
          // Haltelinie und Schild
          ctx.fillStyle = red ? "#ffffff" : "rgba(255,255,255,.4)";
          ctx.fillRect(x - 16, GROUND + 2, 6, 24);
          ctx.fillStyle = gt.open ? (gt.ok ? "#1f9d55" : "#d6332b") : "#2341B5";
          roundRect(x - 34, top - 30, 68, 24, 8);
          ctx.fill();
          ctx.fillStyle = "#fff";
          ctx.font = "800 13px system-ui,sans-serif";
          ctx.textAlign = "center";
          ctx.fillText(gt.open ? (gt.ok ? "✓ grün" : "✗ grün") : `Ampel ${k + 1}`, x, top - 13);
        }
        function themedEnemy(en) {
          const ex = en.x,
            sq = en.alive ? 1 : 0.35;
          ctx.save();
          ctx.translate(ex, GROUND - 12 + (1 - sq) * 10);
          ctx.scale(1, sq);
          if (TH === "road") {
            // Verkehrshütchen
            ctx.fillStyle = "#ff7a1a";
            ctx.beginPath();
            ctx.moveTo(-5, -14);
            ctx.lineTo(5, -14);
            ctx.lineTo(12, 10);
            ctx.lineTo(-12, 10);
            ctx.fill();
            ctx.fillStyle = "#fff";
            ctx.fillRect(-8, -2, 16, 4);
            ctx.fillStyle = "#2b2f3a";
            ctx.fillRect(-15, 9, 30, 4);
            ctx.fillStyle = "#3a1010";
            ctx.font = "900 10px system-ui,sans-serif";
            ctx.textAlign = "center";
            ctx.fillText("✗", 0, -5);
          } else if (TH === "snow") {
            // rollender Schneeball mit Gesicht
            ctx.rotate(en.t * en.dir * 3);
            ctx.fillStyle = "#ffffff";
            ctx.strokeStyle = "#9ab8d8";
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.arc(0, -1, 13, 0, 7);
            ctx.fill();
            ctx.stroke();
            ctx.rotate(-en.t * en.dir * 3);
            ctx.fillStyle = "#d6332b";
            ctx.font = "900 12px system-ui,sans-serif";
            ctx.textAlign = "center";
            ctx.fillText("✗", 0, 3);
            ctx.fillStyle = "#172036";
            ctx.beginPath();
            ctx.arc(en.dir * 7, -5, 2, 0, 7);
            ctx.fill();
          } else {
            // Krebs
            ctx.strokeStyle = "#a3241c";
            ctx.lineWidth = 2;
            for (let k = -1; k <= 1; k += 2)
              for (let j = 0; j < 3; j++) {
                const lg = Math.sin(en.t * 16 + j) * 2;
                ctx.beginPath();
                ctx.moveTo(k * 8, 2 + j * 2);
                ctx.lineTo(k * (15 + j) + lg, 9 + j);
                ctx.stroke();
              }
            ctx.fillStyle = "#e0462f";
            ctx.beginPath();
            ctx.ellipse(0, 0, 14, 9, 0, 0, 7);
            ctx.fill();
            const cl = Math.sin(en.t * 6) * 0.3;
            for (const k of [-1, 1]) {
              ctx.beginPath();
              ctx.ellipse(k * 17, -8, 6, 4, k * (0.6 + cl), 0, 7);
              ctx.fill();
            }
            ctx.fillStyle = "#fff";
            ctx.font = "900 11px system-ui,sans-serif";
            ctx.textAlign = "center";
            ctx.fillText("✗", 0, 4);
            ctx.fillStyle = "#172036";
            for (const k of [-4, 4]) {
              ctx.beginPath();
              ctx.arc(k, -10, 2, 0, 7);
              ctx.fill();
            }
          }
          ctx.restore();
        }
        function roadside() {
          // Bäume und blaue Autobahnschilder am Rand
          for (let i = 0; i < 8; i++) {
            const bx = (((i * 150 - camX * 0.6) % (VW + 200)) + VW + 200) % (VW + 200) - 100;
            ctx.fillStyle = "#6b4a2b";
            ctx.fillRect(bx + 8, GROUND - 40, 6, 40);
            ctx.fillStyle = i % 2 ? "#3f8f46" : "#4fa253";
            ctx.beginPath();
            ctx.arc(bx + 11, GROUND - 48, 18, 0, 7);
            ctx.fill();
          }
          const sx = (((700 - camX * 0.8) % (VW + 500)) + VW + 500) % (VW + 500) - 250;
          ctx.fillStyle = "#6f7480";
          ctx.fillRect(sx + 10, GROUND - 120, 5, 120);
          ctx.fillRect(sx + 105, GROUND - 120, 5, 120);
          ctx.fillStyle = "#1f4fb8";
          roundRect(sx, GROUND - 150, 120, 46, 6);
          ctx.fill();
          ctx.strokeStyle = "#fff";
          ctx.lineWidth = 2;
          roundRect(sx + 3, GROUND - 147, 114, 40, 5);
          ctx.stroke();
          ctx.fillStyle = "#fff";
          ctx.font = "800 13px system-ui,sans-serif";
          ctx.textAlign = "center";
          ctx.fillText("A 40  Essen", sx + 60, GROUND - 130);
          ctx.font = "700 11px system-ui,sans-serif";
          ctx.fillText("Deutschland ↑", sx + 60, GROUND - 114);
        }
        function mountains() {
          ctx.fillStyle = "#a9c3dd";
          for (let i = 0; i < 6; i++) {
            const bx = (((i * 220 - camX * 0.1) % (VW + 300)) + VW + 300) % (VW + 300) - 150,
              h = 150 + ((i * 53) % 60);
            ctx.beginPath();
            ctx.moveTo(bx - 120, GROUND - 60);
            ctx.lineTo(bx, GROUND - 60 - h);
            ctx.lineTo(bx + 120, GROUND - 60);
            ctx.fill();
            ctx.fillStyle = "#ffffff";
            ctx.beginPath();
            ctx.moveTo(bx - 32, GROUND - 60 - h + 40);
            ctx.lineTo(bx, GROUND - 60 - h);
            ctx.lineTo(bx + 32, GROUND - 60 - h + 40);
            ctx.lineTo(bx + 12, GROUND - 60 - h + 30);
            ctx.lineTo(bx, GROUND - 60 - h + 42);
            ctx.lineTo(bx - 12, GROUND - 60 - h + 30);
            ctx.fill();
            ctx.fillStyle = "#a9c3dd";
          }
        }
        function snowfall(t) {
          ctx.fillStyle = "rgba(255,255,255,.9)";
          for (let i = 0; i < 45; i++) {
            const x = ((((i * 97 + Math.sin(t + i) * 20 - camX * 0.3) % VW) + VW) % VW),
              y = (i * 61 + t * (30 + (i % 5) * 8)) % VH;
            ctx.beginPath();
            ctx.arc(x, y, 1.5 + (i % 3) * 0.7, 0, 7);
            ctx.fill();
          }
        }
        function beachBack(t) {
          ctx.fillStyle = "#ffd75e";
          ctx.beginPath();
          ctx.arc(VW - 90, 70, 30, 0, 7);
          ctx.fill();
          // Meer mit Wellen und Segelboot
          ctx.fillStyle = W0.hill2;
          ctx.fillRect(0, GROUND - 90, VW, 90);
          ctx.fillStyle = W0.hill;
          ctx.fillRect(0, GROUND - 50, VW, 50);
          ctx.strokeStyle = "rgba(255,255,255,.6)";
          ctx.lineWidth = 2;
          for (let i = 0; i < 12; i++) {
            const wx = (((i * 90 - camX * 0.2 + Math.sin(t + i) * 6) % (VW + 90)) + VW + 90) % (VW + 90) - 45;
            ctx.beginPath();
            ctx.arc(wx, GROUND - 70 + (i % 3) * 18, 8, Math.PI * 1.1, Math.PI * 1.9);
            ctx.stroke();
          }
          const bx = (((400 - camX * 0.12) % (VW + 200)) + VW + 200) % (VW + 200) - 100,
            by = GROUND - 92 + Math.sin(t * 1.5) * 2;
          ctx.fillStyle = "#ffffff";
          ctx.beginPath();
          ctx.moveTo(bx, by);
          ctx.lineTo(bx + 22, by - 40);
          ctx.lineTo(bx + 22, by);
          ctx.fill();
          ctx.fillStyle = "#c0392b";
          ctx.fillRect(bx - 10, by, 44, 7);
          // Palmen und Strandkorb
          for (let i = 0; i < 4; i++) {
            const px = (((i * 260 + 80 - camX * 0.55) % (VW + 300)) + VW + 300) % (VW + 300) - 150;
            if (i % 2) {
              ctx.fillStyle = "#d9c08a";
              roundRect(px, GROUND - 46, 34, 46, 8);
              ctx.fill();
              ctx.fillStyle = "#e5622b";
              for (let k = 0; k < 4; k++) ctx.fillRect(px + 4 + k * 8, GROUND - 42, 3, 24);
              continue;
            }
            ctx.strokeStyle = "#8a5a32";
            ctx.lineWidth = 6;
            ctx.beginPath();
            ctx.moveTo(px, GROUND);
            ctx.quadraticCurveTo(px + 10, GROUND - 60, px + 4, GROUND - 110);
            ctx.stroke();
            ctx.fillStyle = "#2f9a4a";
            for (let k = 0; k < 5; k++) {
              ctx.beginPath();
              ctx.ellipse(px + 4 + Math.cos(k * 1.3) * 22, GROUND - 110 + Math.sin(k * 1.3) * 6, 26, 7, k * 1.3, 0, 7);
              ctx.fill();
            }
          }
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
          ctx.fillStyle = TH === "night" ? "#161c3d" : "rgba(120,110,100,.45)";
          for (let i = 0; i < 14; i++) {
            const bx = (i * 70 - camX * 0.3) % (VW + 140);
            const x = ((bx + VW + 140) % (VW + 140)) - 70,
              h = 60 + ((i * 37) % 70);
            ctx.fillRect(x, GROUND - h, 50, h);
            if (TH === "night") {
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
          // nur für automatische Tests
          give: (type) => give(type, P.x, P.y),
          boss,
          get qMode() {
            return qMode;
          },
        };
      }
    },
  });
})();
