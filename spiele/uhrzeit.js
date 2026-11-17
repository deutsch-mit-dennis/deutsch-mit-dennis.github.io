/* Uhrzeit-Ohr – listening game: hear a sentence with a time, pick the matching clock (DTZ Hören, A1–A2).
   Every spoken sentence is a fixed entry in SAY (so it can get a natural recording):
     { say, h, m, mode }
       say  = exactly the text for api.speak (numbers written as words) – also the transcript shown after answering
       h, m = the correct time. mode 'informell': h = 1–12 (analog clock), mode 'formell': h = 0–23 (24 h, digital)
   Options: 'informell' (analog clocks), 'digital' (same sentences, digital times), 'formell' (Bahnhof/Termin, 24 h), 'mix'.
   Distractors are generated from the classic confusions (halb drei = 2:30 not 3:30, Viertel vor/nach, 12 h vs 24 h,
   fünfunddreißig vs dreiundfünfzig, hour and minute hand swapped). */
(() => {
  if (!window.DMGame) return;
  const ID = "uhrzeit",
    ROUNDS = 10,
    EXTRA_PLAYS = 2,
    SEEN_KEY = "dm-uhrzeit-seen";

  if (!document.getElementById("sp-uhrzeit-css"))
    document.head.insertAdjacentHTML(
      "beforeend",
      `<style id="sp-uhrzeit-css">
.sp-uhrzeit-listen{display:flex;flex-direction:column;align-items:center;gap:6px;margin:4px 0 14px}
.sp-uhrzeit-play{display:inline-flex;align-items:center;justify-content:center;gap:10px;min-height:64px;min-width:min(100%,280px);padding:12px 26px;border:0;border-radius:99px;background:var(--dm-tinte);color:#fff;font:700 21px/1.2 var(--dm-font);cursor:pointer;box-shadow:0 8px 20px rgba(35,65,181,.25);transition:transform .08s,background .15s}
.sp-uhrzeit-play:hover:not(:disabled){background:var(--dm-tinte-dark)}
.sp-uhrzeit-play:active:not(:disabled){transform:scale(.97)}
.sp-uhrzeit-play:focus-visible{outline:3px solid #ff8a2a;outline-offset:3px}
.sp-uhrzeit-play:disabled{background:#c5cdf0;box-shadow:none;cursor:default}
.sp-uhrzeit-play.is-playing:disabled{opacity:1;color:#fff;background:var(--dm-tinte);box-shadow:0 8px 20px rgba(35,65,181,.25)}
.sp-uhrzeit-play.is-playing{animation:sp-uhrzeit-pulse 1s ease-in-out infinite}
.sp-uhrzeit-play kbd{font:600 12px var(--dm-font);color:#dfe5ff;border:1px solid rgba(255,255,255,.45);border-radius:6px;padding:1px 6px}
@keyframes sp-uhrzeit-pulse{50%{box-shadow:0 0 0 10px rgba(35,65,181,.15)}}
.sp-uhrzeit-left{font-size:14px;color:#5b6680;font-weight:700;min-height:1.4em}
.sp-uhrzeit-q{text-align:center}
.sp-uhrzeit-opts{grid-template-columns:repeat(2,minmax(0,1fr))}
.sp-uhrzeit-opts .ch-opt{flex-direction:column;justify-content:center!important;gap:4px;min-width:0;min-height:64px;padding:10px 8px}
.sp-uhrzeit-opts .ch-opt kbd{position:absolute;top:6px;left:8px}
.sp-uhrzeit-clock{display:block;width:100%;max-width:132px;height:auto;aspect-ratio:1}
.sp-uhrzeit-face{fill:#fff;stroke:var(--dm-ink,#1d2433);stroke-width:3}
.sp-uhrzeit-tick{stroke:#8a93a8;stroke-width:1.5;stroke-linecap:round}
.sp-uhrzeit-tick.is-big{stroke:var(--dm-ink,#1d2433);stroke-width:3}
.sp-uhrzeit-num{font:700 11px var(--dm-font,sans-serif);fill:#3b4560;text-anchor:middle;dominant-baseline:central}
.sp-uhrzeit-hh{stroke:var(--dm-ink,#1d2433);stroke-width:5.5;stroke-linecap:round}
.sp-uhrzeit-mh{stroke:var(--dm-tinte,#2341b5);stroke-width:3.5;stroke-linecap:round}
.sp-uhrzeit-dot{fill:var(--dm-ink,#1d2433)}
.sp-uhrzeit-lbl{font:700 15px var(--dm-font);color:#3b4560;font-variant-numeric:tabular-nums;min-height:1.3em}
.sp-uhrzeit-lbl:empty{visibility:hidden}
.sp-uhrzeit-dig{font:700 30px/1.1 var(--dm-font);font-variant-numeric:tabular-nums;letter-spacing:.02em;padding:14px 0}
.sp-uhrzeit-rule{display:block;margin-top:6px}
.sp-uhrzeit-show{display:inline-flex;align-items:center;min-height:44px;margin-top:8px;padding:6px 16px;border:2px solid var(--dm-tinte);border-radius:99px;background:#fff;color:var(--dm-tinte-dark);font:700 16px var(--dm-font);cursor:pointer}
.sp-uhrzeit-say{display:block;margin-top:8px;font-style:italic;color:#3b4560}
.sp-uhrzeit-say[hidden]{display:none}
.sp-uhrzeit-say b{font-style:normal;color:var(--dm-ink);background:#fff1d0;border-radius:4px;padding:0 3px}
@media (max-width:380px){.sp-uhrzeit-dig{font-size:25px}.sp-uhrzeit-opts .ch-opt{padding:8px 6px}}
@media (prefers-reduced-motion:reduce){.sp-uhrzeit-play{transition:none}.sp-uhrzeit-play.is-playing{animation:none}}
</style>`,
    );

  const SAY = [
    // informell: h = 1–12
    {
      say: "Der Kurs beginnt um Viertel nach neun.",
      h: 9,
      m: 15,
      mode: "informell",
    },
    { say: "Wir treffen uns um halb drei.", h: 2, m: 30, mode: "informell" },
    {
      say: "Mein Termin beim Arzt ist um Viertel vor elf.",
      h: 10,
      m: 45,
      mode: "informell",
    },
    { say: "Die Kita macht um halb acht auf.", h: 7, m: 30, mode: "informell" },
    {
      say: "Ich hole meine Tochter um Viertel nach vier von der Kita ab.",
      h: 4,
      m: 15,
      mode: "informell",
    },
    {
      say: "Die Sprechstunde beginnt um acht Uhr.",
      h: 8,
      m: 0,
      mode: "informell",
    },
    {
      say: "Kommen Sie bitte um zehn nach neun in die Praxis.",
      h: 9,
      m: 10,
      mode: "informell",
    },
    {
      say: "Der Deutschkurs ist heute schon um fünf vor halb zwölf zu Ende.",
      h: 11,
      m: 25,
      mode: "informell",
    },
    {
      say: "Meine Schicht fängt um fünf nach halb sechs an.",
      h: 5,
      m: 35,
      mode: "informell",
    },
    {
      say: "Das Bürgeramt öffnet um halb neun.",
      h: 8,
      m: 30,
      mode: "informell",
    },
    {
      say: "Die Pause ist um zwanzig nach zehn.",
      h: 10,
      m: 20,
      mode: "informell",
    },
    {
      say: "Wir essen um zwölf Uhr zu Mittag.",
      h: 12,
      m: 0,
      mode: "informell",
    },
    {
      say: "Der Bus kommt immer um zehn vor sieben.",
      h: 6,
      m: 50,
      mode: "informell",
    },
    {
      say: "Ich bin um fünf vor acht im Büro.",
      h: 7,
      m: 55,
      mode: "informell",
    },
    {
      say: "Der Elternabend beginnt um halb sieben.",
      h: 6,
      m: 30,
      mode: "informell",
    },
    {
      say: "Die Kinder gehen um Viertel vor acht in die Schule.",
      h: 7,
      m: 45,
      mode: "informell",
    },
    {
      say: "Mein Mann kommt um kurz nach sechs nach Hause.",
      h: 6,
      m: 3,
      mode: "informell",
    },
    {
      say: "Der Film fängt um Viertel nach acht an.",
      h: 8,
      m: 15,
      mode: "informell",
    },
    {
      say: "Ich habe um zwanzig vor fünf einen Termin beim Jobcenter.",
      h: 4,
      m: 40,
      mode: "informell",
    },
    {
      say: "Die Praxis macht um halb eins Mittagspause.",
      h: 12,
      m: 30,
      mode: "informell",
    },
    {
      say: "Wir treffen uns um fünf nach drei vor dem Supermarkt.",
      h: 3,
      m: 5,
      mode: "informell",
    },
    {
      say: "Das Training ist um zehn nach halb fünf zu Ende.",
      h: 4,
      m: 40,
      mode: "informell",
    },
    {
      say: "Mein Zahnarzttermin ist um Viertel vor drei.",
      h: 2,
      m: 45,
      mode: "informell",
    },
    {
      say: "Die Bibliothek schließt um sieben Uhr.",
      h: 7,
      m: 0,
      mode: "informell",
    },
    {
      say: "Der Kurs fängt um zehn vor halb zehn an.",
      h: 9,
      m: 20,
      mode: "informell",
    },
    {
      say: "Ich muss um kurz vor neun beim Ausländeramt sein.",
      h: 8,
      m: 57,
      mode: "informell",
    },
    { say: "Die Kita schließt um halb fünf.", h: 4, m: 30, mode: "informell" },
    {
      say: "Wir frühstücken um Viertel nach sieben.",
      h: 7,
      m: 15,
      mode: "informell",
    },
    {
      say: "Die Besprechung ist um fünf vor zwölf.",
      h: 11,
      m: 55,
      mode: "informell",
    },
    {
      say: "Der Hausmeister kommt um zehn nach elf.",
      h: 11,
      m: 10,
      mode: "informell",
    },
    {
      say: "Bitte seien Sie um Viertel vor neun im Wartezimmer.",
      h: 8,
      m: 45,
      mode: "informell",
    },
    {
      say: "Der Laden macht um halb zehn auf.",
      h: 9,
      m: 30,
      mode: "informell",
    },
    {
      say: "Mein Sohn hat um fünf nach halb drei Fußball.",
      h: 2,
      m: 35,
      mode: "informell",
    },
    {
      say: "Das Vorstellungsgespräch ist um Viertel nach zwei.",
      h: 2,
      m: 15,
      mode: "informell",
    },
    {
      say: "Ich komme um zwanzig nach eins zu dir.",
      h: 1,
      m: 20,
      mode: "informell",
    },
    {
      say: "Die Schule ist um Viertel vor eins aus.",
      h: 12,
      m: 45,
      mode: "informell",
    },
    {
      say: "Wir fahren um fünf vor halb sieben los.",
      h: 6,
      m: 25,
      mode: "informell",
    },
    {
      say: "Die Ärztin hat um zehn vor vier noch einen Termin frei.",
      h: 3,
      m: 50,
      mode: "informell",
    },
    {
      say: "Der Integrationskurs beginnt um neun Uhr.",
      h: 9,
      m: 0,
      mode: "informell",
    },
    {
      say: "Meine Arbeit ist um halb vier zu Ende.",
      h: 3,
      m: 30,
      mode: "informell",
    },
    {
      say: "Kannst du mich um Viertel nach fünf anrufen?",
      h: 5,
      m: 15,
      mode: "informell",
    },
    {
      say: "Das Fest in der Kita beginnt um drei Uhr.",
      h: 3,
      m: 0,
      mode: "informell",
    },
    {
      say: "Die Post macht um zehn nach zwei wieder auf.",
      h: 2,
      m: 10,
      mode: "informell",
    },
    {
      say: "Ich nehme die Tabletten um halb elf.",
      h: 10,
      m: 30,
      mode: "informell",
    },
    {
      say: "Wir treffen uns um Viertel vor sechs am Bahnhof.",
      h: 5,
      m: 45,
      mode: "informell",
    },
    {
      say: "Die Elternsprechstunde ist um fünf nach vier.",
      h: 4,
      m: 5,
      mode: "informell",
    },
    // formell: h = 0–23
    {
      say: "Der Zug fährt um vierzehn Uhr fünfunddreißig.",
      h: 14,
      m: 35,
      mode: "formell",
    },
    {
      say: "Ihr Termin ist am Montag um acht Uhr zwanzig.",
      h: 8,
      m: 20,
      mode: "formell",
    },
    {
      say: "Der ICE nach München fährt um sechzehn Uhr zwölf ab.",
      h: 16,
      m: 12,
      mode: "formell",
    },
    {
      say: "Die Sprechzeiten sind heute bis achtzehn Uhr dreißig.",
      h: 18,
      m: 30,
      mode: "formell",
    },
    {
      say: "Der Bus zum Krankenhaus fährt um sieben Uhr fünfundvierzig.",
      h: 7,
      m: 45,
      mode: "formell",
    },
    {
      say: "Ihr Termin im Bürgeramt ist um zehn Uhr fünfzehn.",
      h: 10,
      m: 15,
      mode: "formell",
    },
    {
      say: "Der Regionalzug kommt um dreizehn Uhr achtundvierzig an.",
      h: 13,
      m: 48,
      mode: "formell",
    },
    {
      say: "Die Kita schließt um sechzehn Uhr dreißig.",
      h: 16,
      m: 30,
      mode: "formell",
    },
    {
      say: "Das Jobcenter erwartet Sie um neun Uhr vierzig.",
      h: 9,
      m: 40,
      mode: "formell",
    },
    {
      say: "Der letzte Zug fährt um dreiundzwanzig Uhr zehn.",
      h: 23,
      m: 10,
      mode: "formell",
    },
    {
      say: "Die Prüfung beginnt um acht Uhr dreißig.",
      h: 8,
      m: 30,
      mode: "formell",
    },
    {
      say: "Ihre Nachtschicht beginnt um zweiundzwanzig Uhr.",
      h: 22,
      m: 0,
      mode: "formell",
    },
    {
      say: "Die Praxis ist heute ab fünfzehn Uhr geschlossen.",
      h: 15,
      m: 0,
      mode: "formell",
    },
    {
      say: "Der Flug nach Istanbul startet um zwölf Uhr fünfundfünfzig.",
      h: 12,
      m: 55,
      mode: "formell",
    },
    {
      say: "Ihre Untersuchung ist um elf Uhr fünfundzwanzig.",
      h: 11,
      m: 25,
      mode: "formell",
    },
    {
      say: "Der Zug nach Hamburg hat Verspätung und kommt erst um siebzehn Uhr dreiundfünfzig.",
      h: 17,
      m: 53,
      mode: "formell",
    },
    {
      say: "Die Ausländerbehörde ist donnerstags bis achtzehn Uhr geöffnet.",
      h: 18,
      m: 0,
      mode: "formell",
    },
    {
      say: "Der Elternabend beginnt um neunzehn Uhr fünfzehn.",
      h: 19,
      m: 15,
      mode: "formell",
    },
    {
      say: "Die S-Bahn fährt um sechs Uhr achtzehn.",
      h: 6,
      m: 18,
      mode: "formell",
    },
    {
      say: "Ihr Termin bei der Agentur für Arbeit ist um vierzehn Uhr.",
      h: 14,
      m: 0,
      mode: "formell",
    },
    {
      say: "Der Kurs endet um zwölf Uhr fünfzehn.",
      h: 12,
      m: 15,
      mode: "formell",
    },
    {
      say: "Das Paket können Sie ab zehn Uhr dreißig abholen.",
      h: 10,
      m: 30,
      mode: "formell",
    },
    {
      say: "Der Anschlusszug fährt um einundzwanzig Uhr vierzig von Gleis zwei.",
      h: 21,
      m: 40,
      mode: "formell",
    },
    {
      say: "Die Spätschicht endet um einundzwanzig Uhr dreißig.",
      h: 21,
      m: 30,
      mode: "formell",
    },
    {
      say: "Der Zahnarzt hat um fünfzehn Uhr fünfundvierzig einen Termin frei.",
      h: 15,
      m: 45,
      mode: "formell",
    },
    {
      say: "Das Rathaus öffnet um sieben Uhr dreißig.",
      h: 7,
      m: 30,
      mode: "formell",
    },
    {
      say: "Der Bus nach Kassel fährt um zwanzig Uhr fünf.",
      h: 20,
      m: 5,
      mode: "formell",
    },
    {
      say: "Die Frühschicht beginnt um fünf Uhr fünfzig.",
      h: 5,
      m: 50,
      mode: "formell",
    },
    {
      say: "Der Zug nach Köln fährt um dreizehn Uhr vierzehn.",
      h: 13,
      m: 14,
      mode: "formell",
    },
    {
      say: "Ihr Impftermin ist um sechzehn Uhr fünf.",
      h: 16,
      m: 5,
      mode: "formell",
    },
    {
      say: "Die Tagesmutter bringt das Kind um siebzehn Uhr dreißig nach Hause.",
      h: 17,
      m: 30,
      mode: "formell",
    },
    {
      say: "Der Nachtbus fährt um null Uhr fünfzehn.",
      h: 0,
      m: 15,
      mode: "formell",
    },
    {
      say: "Die Beratung im Familienzentrum beginnt um neun Uhr fünfundvierzig.",
      h: 9,
      m: 45,
      mode: "formell",
    },
    {
      say: "Der Zug aus Berlin kommt um achtzehn Uhr siebenunddreißig an.",
      h: 18,
      m: 37,
      mode: "formell",
    },
    {
      say: "Bitte kommen Sie morgen um sieben Uhr fünfzehn nüchtern ins Labor.",
      h: 7,
      m: 15,
      mode: "formell",
    },
  ];

  // --- number words and time phrases ---
  const SMALL = [
    "null",
    "eins",
    "zwei",
    "drei",
    "vier",
    "fünf",
    "sechs",
    "sieben",
    "acht",
    "neun",
    "zehn",
    "elf",
    "zwölf",
    "dreizehn",
    "vierzehn",
    "fünfzehn",
    "sechzehn",
    "siebzehn",
    "achtzehn",
    "neunzehn",
  ];
  const UNIT = [
    "",
    "ein",
    "zwei",
    "drei",
    "vier",
    "fünf",
    "sechs",
    "sieben",
    "acht",
    "neun",
  ];
  const TENS = ["", "", "zwanzig", "dreißig", "vierzig", "fünfzig"];
  const word = (n) =>
    n < 20
      ? SMALL[n]
      : (n % 10 ? UNIT[n % 10] + "und" : "") + TENS[Math.floor(n / 10)];
  const hourWord = (n) => (n === 1 ? "eins" : word(n)); // "halb eins", "Viertel nach eins"
  const h12 = (h) => ((((h - 1) % 12) + 12) % 12) + 1; // 0, 12, 24 → 12; 13 → 1
  const pad = (m) => String(m).padStart(2, "0");
  const fmt = (h, m) => `${h}:${pad(m)}`;

  // informal phrases for h 1–12 → [{ p: phrase, rule }]
  function infPhrases(h, m) {
    const H = hourWord(h),
      N = hourWord(h12(h + 1)),
      t = fmt(h, m),
      half = fmt(h, 30),
      out = [];
    const add = (p, rule) => out.push({ p, rule });
    if (m === 0)
      add(
        `${h === 1 ? "ein" : H} Uhr`,
        `${h === 1 ? "ein" : H} Uhr = ${t} – der lange Zeiger steht oben auf der 12.`,
      );
    if (m === 3)
      add(
        `kurz nach ${H}`,
        `kurz nach ${H} = ein paar Minuten nach ${H}, etwa ${t}`,
      );
    if (m === 57)
      add(
        `kurz vor ${N}`,
        `kurz vor ${N} = ein paar Minuten vor ${N}, etwa ${t}`,
      );
    if (m === 15)
      add(
        `Viertel nach ${H}`,
        `Viertel nach ${H} = 15 Minuten nach ${H} = ${t}`,
      );
    if (m === 45)
      add(`Viertel vor ${N}`, `Viertel vor ${N} = 15 Minuten vor ${N} = ${t}`);
    if (m === 30)
      add(
        `halb ${N}`,
        `halb ${N} = 30 Minuten vor ${N} = ${t} (nicht ${fmt(h12(h + 1), 30)}!)`,
      );
    if ([5, 10, 20].includes(m))
      add(
        `${word(m)} nach ${H}`,
        `${word(m)} nach ${H} = ${m} Minuten nach ${H} = ${t}`,
      );
    if ([40, 50, 55].includes(m))
      add(
        `${word(60 - m)} vor ${N}`,
        `${word(60 - m)} vor ${N} = ${60 - m} Minuten vor ${N} = ${t}`,
      );
    if (m === 20 || m === 25)
      add(
        `${word(30 - m)} vor halb ${N}`,
        `${word(30 - m)} vor halb ${N} = ${30 - m} Minuten vor halb ${N} (${half}) = ${t}`,
      );
    if (m === 35 || m === 40)
      add(
        `${word(m - 30)} nach halb ${N}`,
        `${word(m - 30)} nach halb ${N} = ${m - 30} Minuten nach halb ${N} (${half}) = ${t}`,
      );
    return out;
  }
  function formPhrase(h, m) {
    const p = `${h === 1 ? "ein" : word(h)} Uhr${m ? " " + word(m) : ""}`;
    let rule = `${p} = ${fmt(h, m)}`;
    if (h >= 13)
      rule += ` – die 24-Stunden-Zeit: ${h} Uhr = ${h - 12} Uhr ${h >= 18 ? "abends" : "nachmittags"}.`;
    else if (h === 0) rule += " – 0 Uhr = 12 Uhr nachts (Mitternacht).";
    else if (h === 12) rule += " – 12 Uhr = mittags.";
    else rule += " – offizielle Zeit: erst die Stunde, dann die Minuten.";
    if (m > 20 && m % 10)
      rule += ` Achtung: ${word(m)} = ${m} – man sagt zuerst die ${m % 10}, dann die ${m - (m % 10)}.`;
    return { p, rule };
  }
  // the phrase (and rule) inside a sentence: longest phrase that matches as whole words
  const hasWords = (s, p) =>
    new RegExp(
      `(^|[\\s„"(])${p.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}(?=$|[\\s.,!?“")])`,
    ).test(s);
  function analyse(it) {
    const all =
      it.mode === "formell"
        ? [{ ...formPhrase(it.h, it.m), h: it.h, m: it.m }]
        : infPhrases(it.h, it.m).map((x) => ({ ...x, h: it.h, m: it.m }));
    return (
      all
        .filter((x) => hasWords(it.say, x.p))
        .sort((a, b) => b.p.length - a.p.length)[0] || null
    );
  }

  // --- distractors (classic confusions first) ---
  const norm = (h, m, mode) => {
    let t = h * 60 + m;
    t = ((t % 1440) + 1440) % 1440;
    h = Math.floor(t / 60);
    m = t % 60;
    return mode === "formell" ? [h, m] : [h12(h), m];
  };
  function distractors(it, pick, shuffle) {
    const { h, m, mode } = it,
      t1 = [],
      t2 = [];
    if (mode === "formell") {
      t1.push([h >= 12 ? h - 12 : h + 12, m]); // 12 h vs 24 h
      if (
        m > 12 &&
        m % 10 &&
        m % 10 <= 5 &&
        (m % 10) * 10 + Math.floor(m / 10) !== m
      )
        t1.push([h, (m % 10) * 10 + Math.floor(m / 10)]); // fünfunddreißig ↔ dreiundfünfzig
      if ([13, 14, 15].includes(m)) t1.push([h, (m - 10) * 10]); // fünfzehn ↔ fünfzig
      if ([30, 40, 50].includes(m)) t1.push([h, m / 10 + 10]);
      if (m === 5) t1.push([h, 50]); // fünf ↔ fünfzig
      if (h === 21 || h === 12) t1.push([h === 21 ? 12 : 21, m]); // einundzwanzig ↔ zwölf ("zwei-eins")
      t2.push(
        [h + 1, m],
        [h - 1, m],
        [h, (m + 10) % 60],
        [h, (m + 50) % 60],
        [h, (m + 15) % 60],
      );
    } else {
      const swap =
        m % 5 === 0 && m
          ? [h12(m / 5), (h % 12) * 5]
          : m === 0
            ? [12, (h % 12) * 5]
            : null; // hands swapped
      if (m === 30)
        t1.push([h + 1, 30], [h + 1, 0], [h, 0]); // halb drei → 3:30 / 3:00
      else if (m > 0 && m < 20)
        t1.push([h - 1, 60 - m], [h, 60 - m]); // Viertel nach ↔ Viertel vor
      else if (m > 40)
        t1.push([h + 1, 60 - m], [h + 1, m]); // Viertel vor zehn → 10:15 / 10:45
      else if (m >= 20)
        t1.push([h + 1, m], [h, 60 - m]); // fünf vor halb drei → 3:25 / 2:35
      else t1.push([h - 1, 30], [h + 1, 0]); // drei Uhr → halb drei? vier Uhr?
      if (swap) t1.push(swap);
      t2.push(
        [h + 1, m],
        [h - 1, m],
        [h, (m + 30) % 60],
        [h, (m + 15) % 60],
        [h + 2, m],
      );
    }
    const key = ([a, b]) => (mode === "formell" ? fmt(a, b) : fmt(h12(a), b));
    const seen = new Set([key([h, m])]),
      out = [];
    const take = (list) => {
      for (const x of list) {
        const n = norm(x[0], x[1], mode),
          k = key(n);
        if (out.length < 3 && !seen.has(k)) {
          seen.add(k);
          out.push(n);
        }
      }
    };
    take(shuffle(t1));
    take(shuffle(t2));
    return out.slice(0, pick);
  }

  // --- drawing ---
  function clockSvg(h, m) {
    const hourA = ((h % 12) + m / 60) * 30,
      minA = m * 6;
    const pt = (a, r) => {
      const rad = ((a - 90) * Math.PI) / 180;
      return [
        (50 + r * Math.cos(rad)).toFixed(1),
        (50 + r * Math.sin(rad)).toFixed(1),
      ];
    };
    let ticks = "";
    for (let i = 0; i < 60; i += 5) {
      const big = i % 15 === 0,
        [x1, y1] = pt(i * 6, big ? 38 : 41),
        [x2, y2] = pt(i * 6, 45);
      ticks += `<line class="sp-uhrzeit-tick${big ? " is-big" : ""}" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}"/>`;
    }
    const nums = [12, 3, 6, 9]
      .map((n) => {
        const [x, y] = pt(n * 30, 31);
        return `<text class="sp-uhrzeit-num" x="${x}" y="${y}">${n}</text>`;
      })
      .join("");
    const [hx, hy] = pt(hourA, 22),
      [mx, my] = pt(minA, 34);
    return `<svg class="sp-uhrzeit-clock" viewBox="0 0 100 100" aria-hidden="true" focusable="false"><circle class="sp-uhrzeit-face" cx="50" cy="50" r="47"/>${ticks}${nums}<line class="sp-uhrzeit-hh" x1="50" y1="50" x2="${hx}" y2="${hy}"/><line class="sp-uhrzeit-mh" x1="50" y1="50" x2="${mx}" y2="${my}"/><circle class="sp-uhrzeit-dot" cx="50" cy="50" r="3.5"/></svg>`;
  }

  // --- round selection (fresh sentences first, like Zahlen-Ohr) ---
  const readSeen = () => {
    try {
      return JSON.parse(localStorage.getItem(SEEN_KEY) || "[]");
    } catch {
      return [];
    }
  };
  const writeSeen = (a) => {
    try {
      localStorage.setItem(SEEN_KEY, JSON.stringify(a.slice(-80)));
    } catch {}
  };
  function choose(api, opt) {
    const want =
      opt === "formell"
        ? ["formell"]
        : opt === "mix"
          ? ["informell", "formell"]
          : ["informell"];
    const seen = new Set(readSeen());
    const order = (ids) => [
      ...api.shuffle(ids.filter((i) => !seen.has(i))),
      ...api.shuffle(ids.filter((i) => seen.has(i))),
    ];
    let pick;
    if (want.length === 2) {
      const inf = order(
        SAY.map((x, i) => i).filter((i) => SAY[i].mode === "informell"),
      ).slice(0, 6);
      const frm = order(
        SAY.map((x, i) => i).filter((i) => SAY[i].mode === "formell"),
      ).slice(0, ROUNDS - 6);
      pick = api.shuffle([...inf, ...frm]);
    } else
      pick = order(
        SAY.map((x, i) => i).filter((i) => want.includes(SAY[i].mode)),
      ).slice(0, ROUNDS);
    writeSeen([...readSeen().filter((i) => !pick.includes(i)), ...pick]);
    return pick.map((i) => SAY[i]);
  }

  DMGame.register({
    id: ID,
    title: "Uhrzeit-Ohr",
    icon: "🕒",
    level: "A1–A2",
    cat: "basis",
    desc: "Hör die Uhrzeit und wähle die richtige Uhr: halb drei, Viertel vor, 14:35 …",
    intro:
      "Du hörst einen kurzen Satz mit einer Uhrzeit. Wähle die passende Uhr. Der kurze Zeiger zeigt die Stunde, der lange die Minuten. Du kannst jeden Satz bis zu dreimal hören. 10 Runden.",
    optionsLabel: "Was möchtest du üben?",
    options: [
      { id: "informell", label: "Alltag: halb, Viertel (Uhr mit Zeigern)" },
      { id: "digital", label: "Alltag: halb, Viertel (Digitaluhr)" },
      { id: "formell", label: "Bahnhof & Termine: 14:35" },
      { id: "mix", label: "Alles gemischt" },
    ],
    start(api, opt) {
      const esc = api.esc,
        rounds = choose(api, opt),
        wrong = [];
      let n = 0,
        score = 0,
        streak = 0;
      const live = () => api.el.isConnected;

      function round() {
        const it = rounds[n],
          info0 = analyse(it);
        const analog = it.mode === "informell" && opt !== "digital";
        let left = EXTRA_PLAYS,
          answered = false,
          playing = false,
          guard = null;
        api.clearFeedback();
        api.hud({
          step: `${n + 1}/${rounds.length}`,
          progress: n / rounds.length,
          score,
        });
        const opts = api.shuffle([
          [it.h, it.m],
          ...distractors(it, 3, api.shuffle),
        ]);
        const label = ([h, m]) => fmt(h, m);
        api.el.innerHTML = `
          <div class="sp-uhrzeit-listen">
            <button type="button" class="sp-uhrzeit-play"><span aria-hidden="true">🔊</span> <span class="sp-uhrzeit-pl">Anhören</span> <kbd class="ch-keys">Leertaste</kbd></button>
            <span class="sp-uhrzeit-left" aria-live="polite"></span>
          </div>
          <p class="ch-q sp-uhrzeit-q">${analog ? "Welche Uhr passt?" : "Welche Uhrzeit passt?"}</p>
          <div class="ch-opts sp-uhrzeit-opts" role="group" aria-label="Uhrzeiten">
            ${opts
              .map(
                (o, k) =>
                  `<button type="button" class="ch-opt" data-k="${k}" aria-label="${label(o)}"><kbd>${k + 1}</kbd>${
                    analog
                      ? `${clockSvg(o[0], o[1])}<span class="sp-uhrzeit-lbl" aria-hidden="true"></span>`
                      : `<span class="sp-uhrzeit-dig" aria-hidden="true">${label(o)}</span>`
                  }</button>`,
              )
              .join("")}
          </div>`;
        const btn = api.el.querySelector(".sp-uhrzeit-play"),
          lbl = btn.querySelector(".sp-uhrzeit-pl"),
          info = api.el.querySelector(".sp-uhrzeit-left");

        const paint = () => {
          btn.classList.toggle("is-playing", playing);
          if (answered) {
            lbl.textContent = "Nochmal anhören";
            info.textContent = "";
            btn.disabled = playing;
            return;
          }
          lbl.textContent = playing ? "Hör zu …" : "Anhören";
          btn.disabled = playing || left <= 0;
          info.textContent = playing
            ? ""
            : left > 0
              ? `Du kannst noch ${left}× hören.`
              : "Jetzt wählen!";
        };
        const done = () => {
          if (!live()) return;
          clearTimeout(guard);
          playing = false;
          paint();
        };
        const play = () => {
          if (playing || !live()) return;
          playing = true;
          paint();
          guard = setTimeout(done, Math.max(3500, it.say.length * 110)); // safety net if the device never reports "end"
          const ok = api.speak(it.say, done);
          if (ok === false) {
            done();
            info.textContent =
              "Dein Gerät kann gerade nicht vorlesen. Prüfe den Ton.";
          }
        };
        btn.onclick = () => {
          if (!answered) {
            if (left <= 0) return;
            left--;
          }
          play();
        };
        paint();

        api.el.querySelectorAll(".ch-opt").forEach(
          (b) =>
            (b.onclick = () => {
              if (answered) return;
              answered = true;
              const o = opts[+b.dataset.k],
                ok = o[0] === it.h && o[1] === it.m,
                right = fmt(it.h, it.m);
              api.el.querySelectorAll(".ch-opt").forEach((x) => {
                x.disabled = true;
                const ox = opts[+x.dataset.k];
                if (ox[0] === it.h && ox[1] === it.m)
                  x.classList.add("is-right");
                const l = x.querySelector(".sp-uhrzeit-lbl");
                if (l) l.textContent = label(ox);
              });
              if (!ok) b.classList.add("is-wrong");
              const rule = info0 ? info0.rule : right;
              if (ok) {
                score++;
                streak++;
              } else {
                streak = 0;
                wrong.push({ correct: `${right} – „${it.say}“`, tip: rule });
              }
              const said = info0
                ? esc(it.say).replace(esc(info0.p), `<b>${esc(info0.p)}</b>`)
                : esc(it.say);
              api.feedback(
                ok,
                `${ok ? (streak >= 3 ? `Richtig! 🔥 ${streak} in Folge` : "Richtig! ✅") : `Leider falsch. Richtig ist: <b>${esc(right)}</b>`}
            <span class="sp-uhrzeit-rule">${esc(rule)}</span>
            <button type="button" class="sp-uhrzeit-show" aria-expanded="${ok ? "false" : "true"}">${ok ? "Text zeigen" : "Text verbergen"}</button>
            <span class="sp-uhrzeit-say"${ok ? " hidden" : ""}>„${said}“</span>`,
              );
              const fb = api.el.parentElement.querySelector(".ch-feedback"),
                sb = fb && fb.querySelector(".sp-uhrzeit-show"),
                sy = fb && fb.querySelector(".sp-uhrzeit-say");
              if (sb && sy)
                sb.onclick = () => {
                  const open = sy.hidden;
                  sy.hidden = !open;
                  sb.setAttribute("aria-expanded", String(open));
                  sb.textContent = open ? "Text verbergen" : "Text zeigen";
                };
              api.hud({ score, progress: (n + 1) / rounds.length });
              paint();
              const last = n === rounds.length - 1;
              api.next(last ? "Zum Ergebnis" : "Weiter", () => {
                if (last) api.finish({ score, max: rounds.length, wrong });
                else {
                  n++;
                  round();
                }
              });
            }),
        );

        // plays once automatically (does not count as a repeat)
        const auto = () => {
          if (live() && rounds[n] === it && !playing) play();
        };
        Promise.race([
          window.DM?.ttsReady || Promise.resolve(),
          new Promise((r) => setTimeout(r, 1200)),
        ]).then(() => setTimeout(auto, 250));
      }

      round();
    },
  });

  // Space (or H) = listen again
  const isSpace = (e) => e.key === " " || e.code === "Space";
  document.addEventListener("keydown", (e) => {
    if (
      e.altKey ||
      e.ctrlKey ||
      e.metaKey ||
      !(isSpace(e) || e.key === "h" || e.key === "H")
    )
      return;
    const tag = document.activeElement?.tagName;
    if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;
    const b = document.querySelector(".sp-play .sp-uhrzeit-play");
    if (!b) return;
    e.preventDefault();
    if (!e.repeat && !b.disabled) b.click();
  });
  // keep Space from also "clicking" a focused button in this game
  document.addEventListener("keyup", (e) => {
    if (
      isSpace(e) &&
      document.querySelector(".sp-play .sp-uhrzeit-play") &&
      document.activeElement?.tagName === "BUTTON"
    )
      e.preventDefault();
  });
})();
