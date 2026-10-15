/* Witz des Tages – jeden Tag ein neuer Witz (für alle gleich, nach Datum in Deutschland),
   mit Erklärung in einfachem Deutsch und Übersetzung in viele Sprachen (öffnet Google Übersetzer).
   Neue Witze einfach unten in JOKES ergänzen: { t: 'Text (Zeilen mit \n)', lvl: 'A2', why: 'Warum ist das witzig?' } */
(() => {
  const JOKES = [
    {
      t: "Treffen sich zwei Magnete.\nFragt der eine: „Was soll ich heute bloß anziehen?“",
      lvl: "B1",
      why: "„Anziehen“ hat zwei Bedeutungen: Kleidung anziehen – und ein Magnet zieht Metall an.",
    },
    {
      t: "Lehrerin: „Fritzchen, nenne mir drei Tiere aus Afrika!“\nFritzchen: „Zwei Löwen und ein Elefant.“",
      lvl: "A2",
      why: "Die Lehrerin meint drei verschiedene Tierarten. Fritzchen zählt einfach drei Tiere.",
    },
    {
      t: "Was ist ein Keks unter einem Baum?\nEin schattiges Plätzchen.",
      lvl: "B1",
      why: "„Plätzchen“ ist ein kleiner Keks – und auch ein kleiner Platz. Unter einem Baum ist Schatten.",
    },
    {
      t: "Durchsage im Zug: „Unser Zug ist heute pünktlich.“\nAlle Fahrgäste steigen aus: „Das ist bestimmt der falsche Zug!“",
      lvl: "A2",
      why: "In Deutschland haben Züge oft Verspätung. Ein pünktlicher Zug ist so ungewöhnlich, dass niemand ihm glaubt.",
    },
    {
      t: "Gast: „Herr Ober, was macht die Fliege in meiner Suppe?“\nKellner: „Ich glaube, Rückenschwimmen.“",
      lvl: "A2",
      why: "Der Gast beschwert sich. Der Kellner versteht die Frage wörtlich und sagt, was die Fliege gerade „macht“.",
    },
    {
      t: "Was ist braun, klebrig und läuft durch die Wüste?\nEin Karamel.",
      lvl: "B1",
      why: "Karamell ist braun und klebrig. „Kamel“ steckt im Wort – und Kamele laufen durch die Wüste.",
    },
    {
      t: "Im Deutschkurs: „Heißt es der, die oder das Butter?“\nSchüler: „Egal – Hauptsache, auf dem Brot!“",
      lvl: "A1",
      why: "Die Artikel im Deutschen sind schwer. Dem Schüler ist das egal – er will nur essen. (Richtig ist: die Butter.)",
    },
    {
      t: "Treffen sich zwei Fische.\nSagt der eine: „Hi!“\nRuft der andere: „Wo?!“",
      lvl: "A2",
      why: "„Hi“ klingt wie „Hai“. Ein Hai ist ein gefährlicher Fisch – deshalb erschrickt der andere Fisch.",
    },
    {
      t: "Fritzchen: „Papa, kannst du im Dunkeln schreiben?“\nPapa: „Ja, warum?“\nFritzchen: „Dann mach bitte das Licht aus und unterschreib mein Zeugnis.“",
      lvl: "A2",
      why: "Das Zeugnis ist schlecht. Papa soll es unterschreiben, ohne die Noten zu sehen.",
    },
    {
      t: "Was liegt am Strand und spricht undeutlich?\nEine Nuschel.",
      lvl: "B1",
      why: "„Nuscheln“ heißt undeutlich sprechen. Am Strand liegen Muscheln. Muschel + nuscheln = Nuschel.",
    },
    {
      t: "Wie nennt man einen Bumerang, der nicht zurückkommt?\nEinen Stock.",
      lvl: "A2",
      why: "Ein Bumerang fliegt zurück. Wenn er das nicht tut, ist er nur ein Stück Holz – ein Stock.",
    },
    {
      t: "„Ich hätte gern einen Termin beim Bürgeramt.“\n„Der nächste freie Termin ist im März.“\n„Gut. Und in welchem Jahr?“",
      lvl: "A2",
      why: "Auf einen Termin beim Amt wartet man in Deutschland oft lange. Der Mann rechnet schon mit über einem Jahr.",
    },
    {
      t: "Was ist orange und wandert durch die Berge?\nEine Wanderine.",
      lvl: "B1",
      why: "Mandarine (eine orange Frucht) + wandern = Wanderine.",
    },
    {
      t: "Wie nennt man ein Schaf ohne Beine?\nEine Wolke.",
      lvl: "A2",
      why: "Ein Schaf ist weiß und weich. Ohne Beine sieht es aus wie eine Wolke am Himmel.",
    },
    {
      t: "Lehrerin: „Kann man für etwas bestraft werden, das man nicht gemacht hat?“\nFritzchen: „Nein?“\nLehrerin: „Richtig.“\nFritzchen: „Gut. Ich habe meine Hausaufgaben nicht gemacht.“",
      lvl: "A2",
      why: "Fritzchen nutzt die Regel clever: Für etwas, das man nicht gemacht hat, gibt es keine Strafe – also auch nicht für fehlende Hausaufgaben.",
    },
    {
      t: "Was macht ein Pirat am Computer?\nEr drückt die Enter-Taste.",
      lvl: "B1",
      why: "Piraten „entern“ Schiffe (sie springen auf ein fremdes Schiff). „Enter“ klingt genauso.",
    },
    {
      t: "Was sagt die Null zur Acht?\n„Schicker Gürtel!“",
      lvl: "A2",
      why: "Die 8 sieht aus wie eine 0 mit einem Gürtel in der Mitte.",
    },
    {
      t: "Welcher Bus ist über den Atlantik gefahren?\nKolumbus.",
      lvl: "A2",
      why: "Christoph Kolumbus ist über den Atlantik nach Amerika gesegelt. Sein Name endet auf „-bus“.",
    },
    {
      t: "Patient: „Herr Doktor, ich vergesse in letzter Zeit alles!“\nArzt: „Seit wann haben Sie das?“\nPatient: „Was denn?“",
      lvl: "A2",
      why: "Der Patient hat sogar schon vergessen, worüber er gerade gesprochen hat.",
    },
    {
      t: "Was ist grün und klopft an die Tür?\nEin Klopfsalat.",
      lvl: "B1",
      why: "„Kopfsalat“ ist grün. Mit einem „l“ mehr wird daraus „Klopf-salat“ – er klopft an die Tür.",
    },
    {
      t: "Kellner: „Wie haben Sie das Steak gefunden?“\nGast: „Ganz zufällig – unter einer Kartoffel.“",
      lvl: "B1",
      why: "„Wie finden Sie …?“ heißt: Wie gefällt es Ihnen? Der Gast versteht „finden“ als „entdecken“ – das Steak war sehr klein.",
    },
    {
      t: "Zwei Zahnstocher gehen durch den Wald.\nDa kommt ein Igel vorbei.\nSagt der eine: „Ich wusste gar nicht, dass hier ein Bus fährt!“",
      lvl: "B1",
      why: "Für Zahnstocher sieht ein Igel mit seinen vielen Stacheln aus wie ein Bus voller anderer Zahnstocher.",
    },
    {
      t: "„Herr Doktor, ich höre immer ein Klingeln im Ohr!“\n„Dann gehen Sie doch mal ran!“",
      lvl: "A2",
      why: "Wenn das Telefon klingelt, geht man „ran“ (man nimmt ab). Der Arzt tut so, als wäre im Ohr ein Telefon.",
    },
    {
      t: "Was macht ein Mathematiker im Garten?\nEr zieht Wurzeln.",
      lvl: "B1",
      why: "Im Garten zieht man Pflanzen mit den Wurzeln aus der Erde. In Mathe „zieht“ man die Wurzel aus einer Zahl (√9 = 3).",
    },
    {
      t: "Wo wohnen Katzen am liebsten?\nIm Miezhaus.",
      lvl: "B1",
      why: "„Mieze“ ist ein liebes Wort für Katze. Ein „Mietshaus“ ist ein Haus mit Mietwohnungen.",
    },
    {
      t: "Was ist schlimmer als ein Wurm im Apfel?\nEin halber Wurm im Apfel.",
      lvl: "A2",
      why: "Wenn nur noch ein halber Wurm da ist, hat man die andere Hälfte schon gegessen …",
    },
    {
      t: "Chef: „Wie viele Leute arbeiten in Ihrer Abteilung?“\nMitarbeiter: „Ungefähr die Hälfte.“",
      lvl: "B1",
      why: "Der Chef meint: Wie viele Personen sind in der Abteilung? Die Antwort heißt: Nur die Hälfte arbeitet wirklich.",
    },
    {
      t: "Was ist rot und schlecht für die Zähne?\nEin Ziegelstein.",
      lvl: "A2",
      why: "Man denkt an Süßigkeiten. Aber ein Ziegelstein ist rot – und sehr schlecht für die Zähne, wenn er einen trifft.",
    },
    {
      t: "Was sagt der große Stift zum kleinen Stift?\n„Wachs mal, Stift!“",
      lvl: "B1",
      why: "Ein „Wachsmalstift“ ist ein Stift zum Malen. „Wachs mal!“ klingt wie „Wachse mal!“ – also: Werd endlich größer!",
    },
    {
      t: "Was ist das Gegenteil von Reformhaus?\nReh hinterm Haus.",
      lvl: "B1",
      why: "„Reformhaus“ klingt wie „Reh vorm Haus“. Das Gegenteil von „vor“ ist „hinter“.",
    },
    {
      t: "Was ist ein Cowboy ohne Pferd?\nEin Sattelschlepper.",
      lvl: "B2",
      why: "Ohne Pferd muss der Cowboy seinen Sattel selbst schleppen (tragen). Ein „Sattelschlepper“ ist eigentlich ein großer Lkw.",
    },
    {
      t: "Lehrer: „Was ist die Mehrzahl von ‚Baum‘?“\nFritzchen: „Wald!“",
      lvl: "A1",
      why: "Die richtige Antwort ist „Bäume“. Fritzchen denkt: Viele Bäume zusammen sind ein Wald.",
    },
    {
      t: "Warum können Geister so schlecht lügen?\nWeil man sie so leicht durchschaut.",
      lvl: "B1",
      why: "„Jemanden durchschauen“ heißt: merken, dass er lügt. Durch einen Geist kann man auch wirklich durchsehen.",
    },
    {
      t: "Was ist weiß und stört beim Essen?\nEine Lawine.",
      lvl: "A2",
      why: "Man denkt an etwas Kleines, zum Beispiel Salz. Aber eine Lawine (viel Schnee) stört beim Essen natürlich sehr.",
    },
    {
      t: "Was ist grün und läuft durch den Wald?\nEine Herde Gurken.",
      lvl: "A2",
      why: "Ein Witz ohne Logik: Gurken sind grün, aber sie laufen nicht. Gerade das ist lustig.",
    },
    {
      t: "Papa: „Weißt du, was ein Optimist ist?“\nSohn: „Nein.“\nPapa: „Jemand, der ein Kreuzworträtsel mit dem Kugelschreiber löst.“",
      lvl: "B1",
      why: "Mit einem Kugelschreiber kann man Fehler nicht wegradieren. Ein Optimist glaubt, dass er keine Fehler macht.",
    },
    {
      t: "Fritzchen kommt zu spät zur Schule.\nLehrerin: „Warum kommst du zu spät?“\nFritzchen: „Auf dem Schild stand: Schule – langsam fahren!“",
      lvl: "A2",
      why: "Das Schild ist für Autofahrer gedacht. Fritzchen tut so, als hätte er es befolgt.",
    },
    {
      t: "Was macht ein Clown im Büro?\nFaxen.",
      lvl: "B2",
      why: "„Faxe schicken“ macht man im Büro. „Faxen machen“ heißt: Unsinn machen – wie ein Clown.",
    },
    {
      t: "Treffen sich zwei Kühe auf der Weide.\nSagt die eine: „Muh!“\nSagt die andere: „Genau das wollte ich auch gerade sagen!“",
      lvl: "A1",
      why: "Kühe sagen immer nur „Muh“ – sie können also gar nichts anderes sagen.",
    },
    {
      t: "Warum hat der Mann seinen Wecker aus dem Fenster geworfen?\nEr wollte sehen, wie die Zeit verfliegt.",
      lvl: "B1",
      why: "„Die Zeit verfliegt“ heißt: Die Zeit geht schnell vorbei. Der Wecker fliegt aber wirklich durch die Luft.",
    },
    {
      t: "Arzt: „Sie müssen mehr Sport machen.“\nPatient: „Ich spiele doch jeden Tag Fußball!“\nArzt: „Wirklich?“\nPatient: „Ja – an der Spielkonsole.“",
      lvl: "A2",
      why: "Der Patient spielt Fußball nur als Videospiel – dabei sitzt er auf dem Sofa.",
    },
    {
      t: "Was ist gelb und kann nicht schwimmen?\nEin Bagger.\nUnd warum nicht?\nEr hat nur einen Arm.",
      lvl: "A2",
      why: "Ein Witz ohne Logik: Bagger sind oft gelb und haben einen „Arm“. Dass das der Grund sein soll, ist das Lustige.",
    },
    {
      t: "Lehrer: „Wie viele Artikel gibt es im Deutschen?“\nSchülerin: „Zu viele!“",
      lvl: "A1",
      why: "Es gibt drei: der, die, das. Aber für Lernende fühlen sie sich oft wie viel mehr an.",
    },
    {
      t: "Opa: „Ich koche heute zum ersten Mal selbst.“\nEnkel: „Okay. Wo steht denn der Feuerlöscher?“",
      lvl: "A2",
      why: "Der Enkel glaubt nicht, dass Opa kochen kann – er rechnet schon mit einem Brand in der Küche.",
    },
    {
      t: "Was ist schwarz-weiß und kommt nicht durch die Drehtür?\nEin Pinguin mit Skiern.",
      lvl: "A2",
      why: "Ein Witz ohne Logik: Mit langen Skiern passt man nicht durch eine Drehtür – auch nicht als Pinguin.",
    },
    {
      t: "Sagt die Lehrerin: „Wenn ich sage ‚Ich bin schön‘ – welche Zeitform ist das?“\nFritzchen: „Vergangenheit!“",
      lvl: "B1",
      why: "Die richtige Antwort ist Präsens (Gegenwart). Fritzchen meint frech: Schön war sie früher einmal.",
    },
    {
      t: "Kundin in der Bäckerei: „Ist das Brot von heute?“\nVerkäufer: „Nein, von morgen – wir sind sehr früh dran!“",
      lvl: "A2",
      why: "Die Kundin will frisches Brot. Der Verkäufer übertreibt: Es ist so frisch, dass es schon von morgen ist.",
    },
    {
      t: "Warum nehmen Golfspieler zwei Hosen mit?\nFalls sie ein Loch in einer haben.",
      lvl: "B1",
      why: "Beim Golf spielt man den Ball in ein „Loch“. Ein Loch in der Hose ist etwas ganz anderes.",
    },
    {
      t: "Ich wollte heute einen Witz über die Post erzählen.\nAber ich weiß nicht, ob er ankommt.",
      lvl: "B1",
      why: "„Ein Witz kommt an“ heißt: Die Leute finden ihn lustig. Ein Brief „kommt an“, wenn er gut zugestellt wird.",
    },
    {
      t: "Was trinken Kühe?\nMilch? Falsch – Wasser!",
      lvl: "A1",
      why: "Kühe geben Milch – aber sie trinken Wasser. Fast jeder antwortet zuerst falsch.",
    },
    {
      t: "„Warum sitzt du mit der Taschenlampe vor dem Kühlschrank?“\n„Ich will wissen, ob das Licht wirklich ausgeht, wenn die Tür zu ist.“",
      lvl: "B1",
      why: "Diese Frage hat sich fast jeder schon einmal gestellt – nur prüft man es normalerweise nicht so.",
    },
    {
      t: "Was macht eine Wolke mit Juckreiz?\nSie fliegt zum Wolkenkratzer.",
      lvl: "B1",
      why: "Ein „Wolkenkratzer“ ist ein sehr hohes Haus. Eine Wolke, die es juckt, kann sich dort „kratzen“.",
    },
  ];

  const LANGS = [
    ["en", "English"],
    ["ar", "العربية – Arabisch"],
    ["uk", "Українська – Ukrainisch"],
    ["ru", "Русский – Russisch"],
    ["tr", "Türkçe – Türkisch"],
    ["fa", "فارسی – Persisch"],
    ["fa-AF", "دری – Dari"],
    ["ps", "پښتو – Paschtu"],
    ["ku", "Kurdî – Kurmandschi"],
    ["ckb", "کوردی – Sorani"],
    ["ti", "ትግርኛ – Tigrinya"],
    ["am", "አማርኛ – Amharisch"],
    ["so", "Soomaali – Somali"],
    ["pl", "Polski – Polnisch"],
    ["ro", "Română – Rumänisch"],
    ["bg", "Български – Bulgarisch"],
    ["sq", "Shqip – Albanisch"],
    ["sr", "Srpski – Serbisch"],
    ["hr", "Hrvatski – Kroatisch"],
    ["bs", "Bosanski – Bosnisch"],
    ["el", "Ελληνικά – Griechisch"],
    ["it", "Italiano – Italienisch"],
    ["es", "Español – Spanisch"],
    ["pt", "Português – Portugiesisch"],
    ["fr", "Français – Französisch"],
    ["vi", "Tiếng Việt – Vietnamesisch"],
    ["ur", "اردو – Urdu"],
    ["hi", "हिन्दी – Hindi"],
    ["bn", "বাংলা – Bengalisch"],
    ["ta", "தமிழ் – Tamil"],
    ["zh-CN", "中文 – Chinesisch"],
    ["ja", "日本語 – Japanisch"],
    ["ko", "한국어 – Koreanisch"],
    ["th", "ไทย – Thai"],
    ["tl", "Tagalog"],
    ["ka", "ქართული – Georgisch"],
    ["hy", "Հայերեն – Armenisch"],
    ["az", "Azərbaycan – Aserbaidschanisch"],
    ["uz", "Oʻzbek – Usbekisch"],
    ["kk", "Қазақ – Kasachisch"],
    ["hu", "Magyar – Ungarisch"],
    ["cs", "Čeština – Tschechisch"],
    ["sk", "Slovenčina – Slowakisch"],
    ["mk", "Македонски – Mazedonisch"],
    ["ha", "Hausa"],
    ["yo", "Yorùbá"],
    ["ig", "Igbo"],
    ["sw", "Kiswahili – Suaheli"],
    ["ne", "नेपाली – Nepali"],
    ["nl", "Nederlands – Niederländisch"],
  ];
  const KEY = "dm-witz-lang";
  const VERSION = "20261015b";
  const esc = (s) =>
    String(s).replace(
      /[&<>"]/g,
      (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c],
    );
  const getLang = () => {
    try {
      return localStorage.getItem(KEY) || "en";
    } catch {
      return "en";
    }
  };
  const setLang = (l) => {
    try {
      localStorage.setItem(KEY, l);
    } catch {}
  };

  // Datum in Deutschland → für alle Besucher derselbe Witz am selben Tag
  function berlinDay(offset = 0) {
    const s = new Date(Date.now() - offset * 864e5).toLocaleDateString(
      "sv-SE",
      { timeZone: "Europe/Berlin" },
    );
    const [y, m, d] = s.split("-").map(Number);
    return {
      iso: s,
      n: Math.round((Date.UTC(y, m - 1, d) - Date.UTC(2026, 0, 1)) / 864e5),
    };
  }
  const jokeFor = (n) =>
    JOKES[((n % JOKES.length) + JOKES.length) % JOKES.length];
  const today = () => jokeFor(berlinDay().n);
  const lines = (t) =>
    t
      .split("\n")
      .map((l) => `<span>${esc(l)}</span>`)
      .join("");
  // Prüfwert über den Witztext (gleich wie in tools/witz/translate.py)
  const fnv = (str) => {
    let h = 0x811c9dc5;
    for (const b of new TextEncoder().encode(str)) {
      h ^= b;
      h = Math.imul(h, 0x01000193) >>> 0;
    }
    return h.toString(16).padStart(8, "0");
  };
  const RTL = ["ar", "fa", "fa-AF", "ps", "ckb", "ur"];
  const cache = {};
  const loadLang = (lang) =>
    (cache[lang] ||= fetch(`witz-i18n/${lang}.json?v=${VERSION}`)
      .then((r) => (r.ok ? r.json() : {}))
      .catch(() => ({})));
  // Ersatz: KI-Übersetzung direkt im Browser (Chrome mit eingebautem Übersetzer), falls die Datei fehlt
  async function onDevice(j, lang) {
    try {
      if (!("Translator" in self)) return null;
      const a = await self.Translator.availability({ sourceLanguage: "de", targetLanguage: lang });
      if (a === "unavailable") return null;
      const tr = await self.Translator.create({ sourceLanguage: "de", targetLanguage: lang });
      return { t: await tr.translate(j.t), why: await tr.translate(j.why) };
    } catch {
      return null;
    }
  }
  const dateLabel = (iso) =>
    new Date(iso + "T12:00:00").toLocaleDateString("de-DE", {
      weekday: "long",
      day: "numeric",
      month: "long",
    });

  function tools(j, id) {
    const lang = getLang();
    return `<div class="wz-tools">
      <label class="wz-lang"><span class="wz-sr">Sprache für die Übersetzung</span><select data-wz-lang aria-label="Sprache für die Übersetzung">${LANGS.map(([c, n]) => `<option value="${c}"${c === lang ? " selected" : ""}>${esc(n)}</option>`).join("")}</select></label>
      <button type="button" class="wz-btn wz-tr" data-wz-tr="${id}" aria-expanded="false">🌍 Übersetzen</button>
      <button type="button" class="wz-btn wz-quiet" data-wz-share="${id}">📤 Teilen</button>
    </div>`;
  }

  function block(j, id, big) {
    return `<div class="wz-joke${big ? " is-big" : ""}" data-wz-id="${id}">
      <p class="wz-text">${lines(j.t)}</p>
      <details class="wz-why"><summary>🤔 Warum ist das lustig?</summary><p>${esc(j.why)}</p></details>
      ${tools(j, id)}
      <div class="wz-out" aria-live="polite" hidden></div>
    </div>`;
  }

  function card() {
    const d = berlinDay(),
      j = jokeFor(d.n);
    return `<section class="dm-section wz-home" aria-labelledby="wz-h">
      <div class="wz-card">
        <div class="wz-head"><span class="wz-sun" aria-hidden="true">😄</span><h2 id="wz-h">Witz des Tages</h2><span class="wz-lvl">${j.lvl}</span><a class="wz-more" href="#witz">Mehr Witze →</a></div>
        ${block(j, "d" + d.n)}
      </div></section>`;
  }

  function page() {
    const main = document.getElementById("main");
    const d = berlinDay(),
      j = jokeFor(d.n);
    const past = [1, 2, 3, 4, 5, 6].map((o) => {
      const x = berlinDay(o);
      return { ...x, j: jokeFor(x.n) };
    });
    main.innerHTML = `<section class="dm-section wz-page">
      <p class="step-label">Jeden Tag neu · gute Laune auf Deutsch</p>
      <h1>Witz des Tages</h1>
      <p class="wz-intro">Lachen hilft beim Lernen! Jeden Tag gibt es hier einen neuen deutschen Witz. Du verstehst ihn nicht? Klick auf „Warum ist das lustig?“ oder lass ihn in deine Sprache übersetzen.</p>
      <div class="wz-card is-page">
        <div class="wz-head"><span class="wz-sun" aria-hidden="true">😄</span><h2>Heute, ${esc(dateLabel(d.iso))}</h2><span class="wz-lvl">${j.lvl}</span></div>
        ${block(j, "d" + d.n, true)}
      </div>
      <p class="wz-note">Tipp: Viele Witze sind Wortspiele. In der Übersetzung ist das Spiel mit den Wörtern oft weg – deshalb steht die Erklärung gleich mit dabei. Die Übersetzungen wurden mit KI erstellt.</p>
      <h2 class="wz-past-h">Die Witze der letzten Tage</h2>
      <div class="wz-past">${past.map((x) => `<article class="wz-card is-small"><div class="wz-head"><h3>${esc(dateLabel(x.iso))}</h3><span class="wz-lvl">${x.j.lvl}</span></div>${block(x.j, "d" + x.n)}</article>`).join("")}</div>
      <p class="wz-foot">Morgen gibt es einen neuen Witz. Schau wieder vorbei! 🙂</p>
    </section>`;
  }

  async function translate(btn) {
    const box = btn.closest(".wz-joke"),
      out = box.querySelector(".wz-out"),
      sel = box.querySelector("[data-wz-lang]"),
      lang = sel.value,
      j = jokeFor(+btn.dataset.wzTr.slice(1)),
      name = sel.selectedOptions[0]?.textContent || lang;
    out.hidden = false;
    out.removeAttribute("dir");
    out.innerHTML = `<p class="wz-wait">⏳ Übersetze …</p>`;
    btn.setAttribute("aria-expanded", "true");
    let tr = (await loadLang(lang))[fnv(j.t)];
    if (!tr)
      tr = await Promise.race([
        onDevice(j, lang),
        new Promise((r) => setTimeout(() => r(null), 6000)),
      ]);
    if (sel.value !== lang) return; // inzwischen andere Sprache gewählt
    if (!tr) {
      out.innerHTML = `<p class="wz-wait">Für diese Sprache ist die Übersetzung noch nicht fertig. Bitte versuche es später noch einmal – oder wähle eine andere Sprache.</p><button type="button" class="wz-close" data-wz-close>Schließen</button>`;
      return;
    }
    const rtl = RTL.includes(lang);
    out.innerHTML = `<p class="wz-out-h">🌍 ${esc(name)} <span>· mit KI übersetzt</span></p>
      <div class="wz-out-b"${rtl ? ' dir="rtl"' : ""} lang="${esc(lang)}"><p class="wz-text">${lines(tr.t)}</p>${tr.why ? `<p class="wz-out-why">🤔 ${esc(tr.why)}</p>` : ""}</div>
      <button type="button" class="wz-close" data-wz-close>Übersetzung schließen</button>`;
  }

  // Ereignisse (gelten für Startseite und Witz-Seite)
  document.addEventListener("change", (e) => {
    const s = e.target.closest("[data-wz-lang]");
    if (!s) return;
    setLang(s.value);
    loadLang(s.value);
    document.querySelectorAll("[data-wz-lang]").forEach((x) => {
      x.value = s.value;
    });
    // offene Übersetzung gleich in der neuen Sprache zeigen
    const btn = s.closest(".wz-joke")?.querySelector("[data-wz-tr]");
    if (btn && btn.getAttribute("aria-expanded") === "true") translate(btn);
  });
  document.addEventListener("click", (e) => {
    const t = e.target.closest("[data-wz-tr]");
    if (t) return translate(t);
    const c = e.target.closest("[data-wz-close]");
    if (c) {
      const box = c.closest(".wz-joke");
      box.querySelector(".wz-out").hidden = true;
      box.querySelector("[data-wz-tr]").setAttribute("aria-expanded", "false");
    }
  });
  document.addEventListener("click", async (e) => {
    const b = e.target.closest("[data-wz-share]");
    if (!b) return;
    const j = jokeFor(+b.dataset.wzShare.slice(1));
    const text = `😄 Witz des Tages:\n${j.t}\n\nMehr auf https://deutsch-mit-dennis.de/#witz`;
    try {
      if (navigator.share) {
        await navigator.share({ title: "Witz des Tages", text });
        return;
      }
      await navigator.clipboard.writeText(text);
      b.textContent = "✓ Kopiert";
      setTimeout(() => {
        b.textContent = "📤 Teilen";
      }, 1800);
    } catch {}
  });

  if (!document.getElementById("wz-css")) {
    const st = document.createElement("style");
    st.id = "wz-css";
    st.textContent = `
.wz-card{background:linear-gradient(135deg,#fff8d6,#ffe9b8);border:2px solid #ffd76a;border-radius:20px;padding:16px 18px 14px;box-shadow:0 6px 18px rgba(201,140,0,.12)}
.wz-card.is-small{background:#fffbea;box-shadow:none;padding:12px 14px}
.wz-head{display:flex;align-items:center;gap:10px;flex-wrap:wrap;margin:0 0 8px}
.wz-head h2,.wz-head h3{margin:0;font-size:20px;color:#172036}
.wz-card.is-small .wz-head h3{font-size:16px}
.wz-sun{font-size:30px;line-height:1;font-family:"Apple Color Emoji","Segoe UI Emoji","Noto Color Emoji",sans-serif}
.wz-lvl{background:#fff;border:1.5px solid #e8b931;color:#7a5600;border-radius:99px;padding:1px 9px;font-weight:800;font-size:13px}
.wz-more{margin-left:auto;font-weight:800;color:#2341B5;text-decoration:none;white-space:nowrap}
.wz-more:hover{text-decoration:underline}
.wz-text{margin:0 0 8px;font-size:18px;line-height:1.5;color:#172036}
.wz-text span{display:block}
.wz-text span:last-child{font-weight:800}
.wz-joke.is-big .wz-text{font-size:clamp(19px,4.6vw,23px)}
.wz-why{margin:0 0 10px}
.wz-why summary{cursor:pointer;font-weight:700;color:#7a5600;min-height:32px;display:inline-flex;align-items:center}
.wz-why p{margin:4px 0 0;background:rgba(255,255,255,.7);border-radius:12px;padding:8px 12px;color:#3b4258}
.wz-tools{display:flex;flex-wrap:wrap;gap:8px;align-items:center}
.wz-lang select{min-height:44px;max-width:100%;border-radius:12px;border:2px solid #e8b931;background:#fff;padding:6px 10px;font:600 15px var(--dm-font);color:#172036}
.wz-btn{display:inline-flex;align-items:center;justify-content:center;gap:6px;min-height:44px;padding:8px 16px;border-radius:99px;border:2px solid #2341B5;background:#2341B5;color:#fff;font:800 15px var(--dm-font);text-decoration:none;cursor:pointer}
.wz-btn.wz-quiet{background:#fff;color:#2341B5}
.wz-btn:focus-visible,.wz-lang select:focus-visible{outline:3px solid #2341B5;outline-offset:2px}
.wz-sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0)}
.wz-out{margin-top:12px;background:#fff;border:2px solid #c9d4ff;border-radius:16px;padding:12px 14px}
.wz-out-h{margin:0 0 6px;font-weight:800;color:#2341B5;font-size:15px}
.wz-out-h span{font-weight:600;color:#5b6680}
.wz-out .wz-text{margin:0 0 6px}
.wz-out-why{margin:6px 0 0;color:#3b4258;font-size:15.5px;line-height:1.5}
.wz-out-b[dir=rtl]{text-align:right;font-size:1.05em}
.wz-wait{margin:0;color:#5b6680}
.wz-close{margin-top:8px;background:none;border:0;padding:6px 0;min-height:36px;color:#2341B5;font:700 14px var(--dm-font);text-decoration:underline;cursor:pointer}
.wz-intro{max-width:62ch}
.wz-note{color:#5b6680;font-size:15px;margin:10px 0 0}
.wz-past-h{margin:26px 0 10px}
.wz-past{display:grid;gap:12px;grid-template-columns:repeat(auto-fill,minmax(300px,1fr))}
.wz-foot{margin-top:18px;font-weight:700}
@media (max-width:480px){.wz-card{padding:14px 14px 12px}.wz-tools>*{flex:1 1 auto}.wz-lang{flex-basis:100%}.wz-lang select{width:100%}.wz-past{grid-template-columns:1fr}}
`;
    document.head.appendChild(st);
  }

  window.DMWitz = { today, card, count: JOKES.length, all: JOKES, langs: LANGS };
  window.DM ||= {};
  DM.routes ||= {};
  DM.routes.witz = () => page();
})();
