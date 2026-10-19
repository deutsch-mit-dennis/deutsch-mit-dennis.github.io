/* Schreib-Check: sofortiges Feedback für alle Schreibfelder der Website.
   Rechtschreibung, Grammatik und Zeichensetzung prüft LanguageTool (LanguageTooler GmbH, Hamburg) –
   erst wenn man auf „Text prüfen“ klickt. Dazu kommen einfache Prüfungen für Briefe (Anrede, Gruß, Länge). */
(() => {
  const API = 'https://api.languagetool.org/v2/check';
  const $ = (s, r = document) => r.querySelector(s);
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const CAT = { TYPOS: 'Rechtschreibung', GRAMMAR: 'Grammatik', PUNCTUATION: 'Zeichensetzung', CASING: 'Groß- und Kleinschreibung', CONFUSED_WORDS: 'Verwechslung', STYLE: 'Stil', TYPOGRAPHY: 'Typografie', REDUNDANCY: 'Wiederholung', COMPOUNDING: 'Zusammenschreibung', MISC: 'Sonstiges', SEMANTICS: 'Logik', COLLOQUIALISMS: 'Umgangssprache' };
  const COLOR = { TYPOS: 'sp', CASING: 'sp', COMPOUNDING: 'sp', GRAMMAR: 'gr', CONFUSED_WORDS: 'gr', PUNCTUATION: 'pu', TYPOGRAPHY: 'pu' };
  let lastCall = 0;

  function letterContext(ta) {
    const scope = (ta.closest('section, .dm-card, .pl-panel, .exam-card, main') || document).textContent.toLowerCase();
    const page = (document.querySelector('main h1')?.textContent || '').toLowerCase();
    return /brief|e-mail|email|nachricht|schreiben|antwort an|kundenantwort/.test(page + ' ' + scope.slice(0, 2500));
  }
  function extraChecks(text, ta) {
    const out = [], words = (text.match(/[\p{L}\p{N}]+/gu) || []).length;
    const lines = text.trim().split(/\n+/).map(s => s.trim()).filter(Boolean);
    if (letterContext(ta) && words >= 25) {
      if (!/^(liebe|lieber|liebes|hallo|hi|sehr geehrte|sehr geehrter|guten tag|moin|servus)\b/i.test(lines[0] || '')) out.push(['Anrede fehlt', 'Beginne mit einer Anrede, z. B. „Sehr geehrte Frau Müller,“ oder „Liebe Anna,“.']);
      else if (!/,\s*$/.test(lines[0]) && !/,/.test((lines[0] || '').slice(0, 60))) out.push(['Komma nach der Anrede', 'Nach der Anrede steht ein Komma. Danach schreibst du klein weiter (außer Nomen).']);
      if (!/(grüße|grüßen|gruß|grüssen|grüsse|bis bald|bis dann|hochachtungsvoll|liebe grüße)/i.test(lines.slice(-3).join(' '))) out.push(['Gruß fehlt', 'Beende den Brief mit einem Gruß, z. B. „Mit freundlichen Grüßen“ oder „Viele Grüße“ – und deinem Namen.']);
      if (/^(sehr geehrte)/i.test(lines[0] || '') && /\b(du|dich|dir|dein)\b/i.test(text)) out.push(['du oder Sie?', 'Formeller Brief: Benutze „Sie“, „Ihnen“, „Ihr“ – nicht „du“.']);
    }
    const sentences = text.split(/[.!?]+/).map(s => s.trim()).filter(s => s.split(/\s+/).length > 3);
    const long = sentences.filter(s => s.split(/\s+/).length > 28).length;
    if (long) out.push(['Sehr lange Sätze', `${long} Satz/Sätze mit mehr als 28 Wörtern. Teile lange Sätze – das ist leichter zu lesen.`]);
    const starts = sentences.map(s => s.split(/\s+/)[0].toLowerCase());
    const ich = starts.filter(w => w === 'ich').length;
    if (sentences.length >= 5 && ich / sentences.length > 0.6) out.push(['Abwechslung', 'Viele Sätze beginnen mit „Ich“. Beginne auch mal mit einer Zeit oder einem Verbindungswort: „Leider …“, „Deshalb …“, „Am Montag …“.']);
    return { out, words };
  }

  function marked(text, matches) {
    let html = '', pos = 0;
    matches.forEach((m, i) => {
      if (m.offset < pos) return;
      html += esc(text.slice(pos, m.offset));
      html += `<mark class="sc-${COLOR[m.rule?.category?.id] || 'st'}" data-i="${i}" tabindex="0" title="${esc(m.shortMessage || m.message)}">${esc(text.slice(m.offset, m.offset + m.length)) || '␣'}</mark>`;
      pos = m.offset + m.length;
    });
    return (html + esc(text.slice(pos))).replace(/\n/g, '<br>');
  }


  /* ---------- Eigene Prüfungen für typische Lernerfehler ----------
     LanguageTool übersieht vieles, was Deutschlernende falsch machen (z. B. „ich heißen“, „mit eine Freundin“,
     „ich habe ein Hund“). Diese Regeln nutzen ein kleines Lexikon (schreibcheck-lex.json). */
  let LEX = null;
  const lexReady = () => LEX ? Promise.resolve(LEX) : fetch('schreibcheck-lex.json').then(r => r.json()).then(j => {
    const forms = new Map();
    for (const [lemma, f] of Object.entries(j.verbs)) {
      f.forEach((w, p) => { const k = w.toLowerCase(); if (!forms.has(k)) forms.set(k, []); forms.get(k).push([lemma, p]); });
      forms.get(f[0].toLowerCase()).push([lemma, 2]);   // Konjunktiv I: „er habe“, „man sei“
      const stem = f[0].replace(/e$/, '');   // „komm“, „mach“: Imperativ/umgangssprachlich – nie richtig nach Pronomen
      if (stem !== f[0] && !/[aeiouäöü]$/.test(stem)) { const k = stem.toLowerCase(); if (!forms.has(k)) forms.set(k, [[lemma, -1]]); }
    }
    const lower = new Map(Object.keys(j.nouns).map(n => [n.toLowerCase(), n]));
    const plural = new Map();   // „Menschen“ → „Mensch“ (nur Pluralformen, die sich vom Singular unterscheiden)
    for (const [n, [, pl]] of Object.entries(j.nouns)) if (pl && pl !== n && /^\p{Lu}\p{L}+$/u.test(pl)) plural.set(pl, n);
    return (LEX = { ...j, forms, lower, plural });
  }).catch(() => (LEX = { nouns: {}, verbs: {}, forms: new Map(), lower: new Map(), plural: new Map() }));
  const PRON = { ich: [0], du: [1], er: [2], es: [2], man: [2], sie: [2, 5], wir: [3], ihr: [4] };
  const PNAME = ['ich', 'du', 'er/sie/es', 'wir', 'ihr', 'sie/Sie'];
  const SUB = /^(weil|dass|wenn|ob|obwohl|als|damit|bevor|nachdem|während|bis|da|sobald|falls|seitdem|sodass|wie|wo|was|wer|der|die|das|den|dem|deren|dessen)$/i;
  const MODAL = /^(kann|kannst|können|könnt|muss|musst|müssen|müsst|will|willst|wollen|wollt|darf|darfst|dürfen|dürft|soll|sollst|sollen|sollt|möchte|möchtest|möchten|möchtet|werde|wirst|wird|werden|werdet|mag|magst|mögen|zu)$/i;
  const DAT = /^(mit|bei|von|zu|aus|nach|seit|gegenüber)$/i, AKK = /^(für|ohne|gegen|durch|um)$/i;
  const POSS = /^(ein|kein|mein|dein|sein|ihr|unser|euer|Ihr)(e|en|em|er|es)?$/i;
  const DETS = /^(der|die|das|den|dem|des|ein|eine|einen|einem|einer|eines|kein|keine|keinen|keinem|keiner|mein|meine|meinen|meinem|meiner|dein|deine|deinen|deinem|deiner|sein|seine|seinen|seinem|seiner|unser|unsere|unseren|unserem|unserer|im|am|zum|zur|vom|beim|ins|ans)$/i;
  const AKKVERB = /^(habe|hast|hat|haben|habt|brauche|brauchst|braucht|brauchen|kaufe|kaufst|kauft|kaufen|suche|suchst|sucht|suchen|möchte|möchtest|möchten|sehe|siehst|sieht|sehen|seht|nehme|nimmst|nimmt|nehmen|nehmt|esse|isst|essen|esst|trinke|trinkst|trinkt|trinken|finde|findest|findet|finden|besuche|besuchst|besucht|besuchen|kenne|kennst|kennt|kennen|bestelle|bestellst|bestellt|bestellen|liebe|liebst|liebt|lieben|gibt)$/i;
  const LANG = /^(deutsch|englisch|russisch|ukrainisch|arabisch|türkisch|polnisch|französisch|spanisch|italienisch|persisch|kurdisch|rumänisch|chinesisch|albanisch|serbisch|kroatisch|bosnisch|bulgarisch|griechisch|portugiesisch|vietnamesisch|georgisch|armenisch|ungarisch|tschechisch|japanisch|koreanisch|hindi|tamilisch|somalisch|tigrinya|dari|paschtu|belarussisch|weißrussisch|litauisch|lettisch|moldauisch|niederländisch)$/i;
  const SPLIT = { 'Mutter Sprache': 'Muttersprache', 'Mutter Sprachen': 'Muttersprachen', 'Haupt Bahnhof': 'Hauptbahnhof', 'Bus Haltestelle': 'Bushaltestelle', 'Fahr Karte': 'Fahrkarte', 'Kranken Haus': 'Krankenhaus', 'Kinder Garten': 'Kindergarten', 'Arbeits Platz': 'Arbeitsplatz', 'Lebens Lauf': 'Lebenslauf', 'Fuß Ball': 'Fußball', 'Wochen Ende': 'Wochenende', 'Geburts Tag': 'Geburtstag', 'Super Markt': 'Supermarkt', 'Kühl Schrank': 'Kühlschrank', 'Straßen Bahn': 'Straßenbahn', 'Arbeits Zeit': 'Arbeitszeit', 'Haus Aufgaben': 'Hausaufgaben', 'Haus Aufgabe': 'Hausaufgabe', 'Deutsch Kurs': 'Deutschkurs', 'Integrations Kurs': 'Integrationskurs', 'Jobcenter': 'Jobcenter' };
  const DETSG = /^(ein|eine|der|die|das|mein|meine|dein|deine|sein|seine|ihr|ihre|unser|unsere|euer|eure|kein|keine|dieser|diese|dieses|jeder|jede|jedes)$/i;
  const DETPL = /^(die|meine|deine|seine|ihre|unsere|eure|keine|diese|viele|alle|einige|manche|beide|zwei|drei|vier|fünf|sechs|sieben|acht|neun|zehn|elf|zwölf|meine)$/i;
  const PLONLY = /^(Leute|Eltern|Geschwister|Großeltern|Kinder)$/;
  const PERC = /^(sehe|siehst|sieht|sehen|seht|höre|hörst|hört|hören|lasse|lässt|lassen|helfe|hilfst|hilft|helfen)$/i;
  const PREP = /^(mit|bei|von|zu|aus|nach|seit|für|ohne|gegen|durch|um|in|an|auf|über|unter|vor|hinter|neben|zwischen)$/i;
  const NOART = /^(Geld|Milch|Wasser|Kaffee|Tee|Brot|Fleisch|Fisch|Käse|Gemüse|Saft|Bier|Arbeit|Zeit|Hilfe|Musik|Sport|Urlaub|Regen|Sonne|Schnee|Morgen|Abend|Leben|Essen|Platz|Erfahrung|Verantwortung|Qualität|Ersatz|Zustimmung|Heimat|Tag|Woche|Monat|Jahr|Minute|Stunde|Uhr|Nacht|Wochenende|Haus|Familie|Frühstück|Entschuldigung|Beispiel|Grund|Kuchen|Suppe|Obst|Glück|Weg|Ende|Name)$/;
  const PRESENT = /^(lerne|lernst|lernt|lernen|wohne|wohnst|wohnt|wohnen|arbeite|arbeitest|arbeitet|arbeiten|lebe|lebst|lebt|leben|bin|bist|ist|sind|seid|studiere|studierst|studiert|studieren|spreche|sprichst|spricht|sprechen|mache|machst|macht|machen|besuche|besuchst|besucht|besuchen|kenne|kennst|kennt|kennen|habe|hast|hat|haben|habt)$/i;
  const PAST = /^(war|warst|waren|wart|hatte|hattest|hatten|kam|kamen|zog|zogen|wurde|wurden|ging|gingen|fing|fingen|begann|begannen)$/i;
  const keepCase = (src, w) => src[0] === src[0].toUpperCase() ? w[0].toUpperCase() + w.slice(1) : w;
  function learnerChecks(text, L, speech) {
    const out = [], toks = [];
    for (const m of text.matchAll(/[\p{L}ß]+|[.!?;:,\n]/gu)) toks.push({ t: m[0], i: m.index, w: /\p{L}/u.test(m[0]) });
    const add = (tok, msg, rep, cat = 'GRAMMAR', len) => out.push({ offset: tok.i, length: len ?? tok.t.length, message: msg, replacements: rep ? [{ value: rep }] : [], rule: { id: 'DMD_LERNER', category: { id: cat } }, own: true });
    const sentStart = k => k <= 0 || /[.!?\n]/.test(toks[k - 1].t);
    const clauseStart = k => { let j = k; while (j > 0 && toks[j - 1].w) j--; return j; };
    const isQuestion = k => { let j = k; while (j < toks.length && !/[.!?\n]/.test(toks[j].t)) j++; return toks[j]?.t === '?'; };
    const isSub = k => { const s = clauseStart(k); if (s >= toks.length || s === k || !SUB.test(toks[s].t)) return false;
      return !(sentStart(s) && /^(wie|wo|was|wer|wann|warum|woher|wohin)$/i.test(toks[s].t) && isQuestion(s)); };
    const persons = (tok, k) => tok.t === 'Sie' && !sentStart(k) ? [5] : PRON[tok.t.toLowerCase()];
    const agree = (pTok, k, vTok) => {
      const cand = L.forms.get(vTok.t.toLowerCase()); if (!cand) return;
      const ps = persons(pTok, k);
      if (cand.some(([lemma, p]) => ps.includes(p))) return;
      const lemma = cand[0][0], right = L.verbs[lemma][ps[0]];
      add(vTok, `Das Verb passt nicht zu „${pTok.t}“. Mit „${PNAME[ps[0]]}“ heißt es „${right}“ (${lemma}).`, keepCase(vTok.t, right));
    };
    let lastSubj = null;
    toks.forEach((tok, k) => {
      if (!tok.w) { if (/[.!?\n,;:]/.test(tok.t)) lastSubj = null; return; }
      const low = tok.t.toLowerCase(), nx = toks[k + 1], pv = toks[k - 1];
      // A) Subjekt + Verb
      if (PRON[low]) {
        const isSubj = low !== 'sie' && low !== 'es' || sentStart(k) || (pv && /^(und|aber|oder|denn)$/i.test(pv.t));
        const inverted = pv && pv.w && L.forms.has(pv.t.toLowerCase()) && !sentStart(k);
        if (nx && nx.w && isSubj && !isSub(k) && !inverted && (/^\p{Ll}/u.test(nx.t))) { agree(tok, k, nx); }
        if (isSubj && !isSub(k)) lastSubj = [tok, k];
        // Inversion: „Morgen gehen ich“, „Was machen du“
        if (pv && pv.w && /^(ich|du|er|wir|ihr)$/.test(low) && !isSub(k) && L.forms.has(pv.t.toLowerCase()) && !(nx && nx.w && L.forms.has(nx.t.toLowerCase()) && !MODAL.test(nx.t))) {
          const pp = toks[k - 2], colloq = (L.forms.get(pv.t.toLowerCase()) || []).every(([, p]) => p === -1);
          if ((!pp || !pp.w || clauseStart(k - 1) >= k - 2) && !colloq) { agree(tok, k, pv); lastSubj = [tok, k]; }
        }
      }
      // A2) Koordination: „Ich heiße Dennis und komm aus …“
      if (/^(und|aber|oder)$/i.test(low) && lastSubj && nx && nx.w && L.forms.has(nx.t.toLowerCase()) && !PRON[nx.t.toLowerCase()]) {
        const nn = toks[k + 2];
        const clauseHasModal = toks.slice(clauseStart(k), k).some(x => MODAL.test(x.t));
        if (!(nn && nn.w && PRON[nn.t.toLowerCase()]) && !clauseHasModal) agree(lastSubj[0], lastSubj[1], nx);
      }
      // B) Präpositionen mit Dativ / Akkusativ
      if (nx && nx.w && (DAT.test(tok.t) || AKK.test(tok.t))) {
        const a = nx.t, noun = toks[k + 2] && L.nouns[toks[k + 2].t], g = noun && noun[0];
        const pm = a.match(POSS);
        if (DAT.test(tok.t)) {
          const sing = noun && toks[k + 2].t !== noun[1];
          const nounFollows = toks[k + 2] && toks[k + 2].w && /^\p{Lu}/u.test(toks[k + 2].t);
          if (pm && nounFollows && !/^(em|er)$/i.test(pm[2] || '') && (pm[2] !== 'en' || sing)) {
            const right = pm[1] + (g === 'f' ? 'er' : g ? 'em' : 'em/' + pm[1] + 'er');
            add(nx, `Nach „${tok.t}“ steht immer Dativ: ${g ? `„${tok.t} ${right} ${toks[k + 2].t}“` : `„${pm[1]}em“ (der/das) oder „${pm[1]}er“ (die)`}.`, g ? right : null);
          } else if (/^das$/i.test(a)) add(nx, `Nach „${tok.t}“ steht immer Dativ: „${tok.t} dem …“.`, keepCase(a, 'dem'));
          else if (/^die$/i.test(a) && g === 'f' && toks[k + 2].t !== noun[1]) add(nx, `Nach „${tok.t}“ steht immer Dativ: „${tok.t} der ${toks[k + 2].t}“.`, keepCase(a, 'der'));
        } else if (pm && /^(em|er)$/i.test(pm[2] || '') || /^dem$/i.test(a)) {
          add(nx, `Nach „${tok.t}“ steht immer Akkusativ: „${tok.t} den/die/das …“ oder „${tok.t} einen/eine/ein …“.`);
        }
      }
      // C) Artikel und Genus
      const nTok = nx && nx.w ? nx : null, info = nTok && L.nouns[nTok.t];
      if (info && nTok.t !== info[1]) {   // Singularform eines bekannten Nomens
        const [g] = info, art = { m: 'der', f: 'die', n: 'das' }[g];
        const prevDat = pv && DAT.test(pv.t);
        const safeArt = !pv || !pv.w || sentStart(k) || DAT.test(pv.t) || AKK.test(pv.t) || /^(und|oder|aber|in|an|auf|über|unter|vor|hinter|neben|zwischen)$/i.test(pv.t) || L.forms.has(pv.t.toLowerCase());
        if ((low === 'ein' || low === 'kein' || /^(mein|dein|sein|unser)$/.test(low)) && g === 'f' && !prevDat) add(tok, `„${nTok.t}“ ist feminin (die ${nTok.t}). Es heißt „${low === 'ein' ? 'eine' : low + 'e'} ${nTok.t}“.`, keepCase(tok.t, (low === 'ein' ? 'eine' : low + 'e')));
        else if (/^(eine|keine|meine|deine|seine|unsere)$/.test(low) && g !== 'f' && !(pv && AKK.test(pv.t))) add(tok, `„${nTok.t}“ ist ${g === 'm' ? 'maskulin' : 'neutral'} (${art} ${nTok.t}). Es heißt „${low.replace(/e$/, '')}${g === 'm' ? '/…en' : ''} ${nTok.t}“.`, keepCase(tok.t, low.replace(/e$/, '')));
        else if (/^(einen|keinen|meinen|deinen|seinen)$/.test(low) && g !== 'm') add(tok, `„einen“ gibt es nur bei maskulinen Nomen. „${nTok.t}“ ist ${g === 'f' ? 'feminin' : 'neutral'} (${art} ${nTok.t}).`, keepCase(tok.t, low.replace(/en$/, g === 'f' ? 'e' : '')));
        else if (/^(ein|kein|mein|dein|sein)$/.test(low) && g === 'm' && !prevDat) {
          const back = toks.slice(Math.max(clauseStart(k), k - 3), k);
          const hasSubj = toks.slice(clauseStart(k), k).some(x => /^(ich|du|er|sie|wir|ihr|man)$/i.test(x.t));
          if (hasSubj && back.some(x => AKKVERB.test(x.t)) && !back.some(x => DAT.test(x.t) || AKK.test(x.t))) add(tok, `Akkusativ: „${nTok.t}“ ist maskulin – nach diesem Verb heißt es „${low}en ${nTok.t}“.`, keepCase(tok.t, low + 'en'));
        }
        else if (!safeArt) {}
        else if (low === 'das' && g !== 'n') add(tok, `Falscher Artikel: Es heißt „${art} ${nTok.t}“.`, keepCase(tok.t, art));
        else if (low === 'die' && g !== 'f' && !(info[1] === nTok.t)) add(tok, `Falscher Artikel: Es heißt „${art} ${nTok.t}“.`, keepCase(tok.t, art));
        else if (low === 'der' && g === 'n') add(tok, `Falscher Artikel: Es heißt „das ${nTok.t}“.`, keepCase(tok.t, 'das'));
        else if (low === 'dem' && g === 'f') add(tok, `„${nTok.t}“ ist feminin: im Dativ heißt es „der ${nTok.t}“.`, keepCase(tok.t, 'der'));
      }
      // D) Nomen klein geschrieben: „ein hund“, „die wohnung“
      if (nTok && DETS.test(tok.t) && /^\p{Ll}/u.test(nTok.t) && L.lower.has(nTok.t.toLowerCase())) {
        const N = L.lower.get(nTok.t.toLowerCase());
        add(nTok, `Nomen schreibt man im Deutschen groß: „${N}“.`, N, 'CASING');
      }
      // E) „Meinen Namen ist …“ → „Mein Name ist …“
      if (tok.t === 'Namen' && nx && /^ist$/i.test(nx.t)) {
        if (pv && /^(meinen|meine|meinem|meiner)$/i.test(pv.t)) add(pv, 'Nominativ: Es heißt „Mein Name ist …“ (nicht „meinen Namen“).', keepCase(pv.t, 'mein') + ' Name', 'GRAMMAR', tok.i + tok.t.length - pv.i);
        else add(tok, 'Nominativ: Es heißt „Name ist …“, z. B. „Mein Name ist Anna.“', 'Name');
      }
      // F) „Ich habe 34 Jahre alt“ → „Ich bin 34 Jahre alt“
      if (/^jahre$/i.test(tok.t) && nx && /^alt$/i.test(nx.t)) {
        for (let j = k - 1; j >= Math.max(0, k - 3) && toks[j].w; j--) {
          const c = (L.forms.get(toks[j].t.toLowerCase()) || []).find(([lemma]) => lemma === 'haben');
          if (c) { const right = L.verbs.sein[c[1] < 0 ? 0 : c[1]]; add(toks[j], `Das Alter sagt man mit „sein“: „Ich bin 34 Jahre alt.“ Hier: „${right}“.`, keepCase(toks[j].t, right)); break; }
        }
      }
      // G) „Ich lerne Deutsch vor zwei Jahren“ → „seit zwei Jahren“ (Gegenwart)
      if (/^vor$/i.test(tok.t)) {
        const z = [toks[k + 1], toks[k + 2]].find(x => x && x.w && /^(Jahren|Monaten|Wochen|Tagen|Stunden|Minuten)$/.test(x.t));
        if (z && (z === toks[k + 1] || toks[k + 1].w && !/^\p{Lu}/u.test(toks[k + 1].t))) {
          let a = clauseStart(k), b = k; while (b < toks.length && !/[.!?\n]/.test(toks[b].t)) b++;
          const cl = toks.slice(a, b);
          if (cl.some(x => PRESENT.test(x.t)) && !cl.some(x => PAST.test(x.t) || /^ge\p{L}{3,}(t|en)$/iu.test(x.t)))
            { const ph = text.slice(tok.i + tok.t.length, z.i + z.t.length).trim();
            add(tok, `Die Handlung dauert noch an (Gegenwart). Dann heißt es „seit ${ph}“. „Vor ${ph}“ benutzt man für die Vergangenheit: „Ich bin vor zwei Jahren gekommen.“`, keepCase(tok.t, 'seit')); }
        }
      }
      // H) Sprachen als Nomen groß: „Ich spreche russisch“ → „Russisch“
      if (LANG.test(tok.t) && /^\p{Ll}/u.test(tok.t) && !(nx && nx.w && /^\p{Lu}/u.test(nx.t)) && !(pv && /^(typisch|sehr|so|zu|ganz|echt|richtig|nicht)$/i.test(pv.t))) {
        add(tok, `Sprachen sind hier Nomen und werden großgeschrieben: „${tok.t[0].toUpperCase() + tok.t.slice(1)}“.`, tok.t[0].toUpperCase() + tok.t.slice(1), 'CASING');
      }
      // I) Getrennt geschriebene Wörter: „Mutter Sprache“ → „Muttersprache“
      if (nx && nx.w && SPLIT[tok.t + ' ' + nx.t] && nx.i === tok.i + tok.t.length + 1) {
        const one = SPLIT[tok.t + ' ' + nx.t];
        add(tok, `Das ist ein Wort: „${one}“.`, one, 'COMPOUNDING', nx.i + nx.t.length - tok.i);
      }
      // J) Nomen als Subjekt + Verb: „die Menschen steht“, „ein Mann tragen“
      if (/^\p{Lu}/u.test(tok.t) && nx && nx.w && /^\p{Ll}/u.test(nx.t) && !(tok.t === 'Namen' && /^ist$/i.test(nx.t))) {
        const pl = L.plural.get(tok.t) || PLONLY.test(tok.t) ? true : (L.nouns[tok.t] && L.nouns[tok.t][1] !== tok.t ? false : null);
        const cand = L.forms.get(nx.t.toLowerCase());
        let d = k - 1; if (toks[d] && toks[d].w && /^\p{Lu}/u.test(toks[d].t) && SPLIT[toks[d].t + ' ' + tok.t]) d--;
        const det = toks[d];
        const n2 = toks[k + 2], before = toks.slice(Math.max(0, d - 4), d);
        const subjPos = speech || sentStart(d) || (toks[d - 1] && /^(und|aber|oder|denn|weil|dass|wenn|ob|obwohl|damit|bevor|nachdem)$/i.test(toks[d - 1].t));
        if (subjPos && pl !== null && cand && det && det.w && (pl ? DETPL : DETSG).test(det.t)
          && !(toks[d - 1] && toks[d - 1].w && (PREP.test(toks[d - 1].t) || L.forms.has(toks[d - 1].t.toLowerCase())))
          && !before.some(x => MODAL.test(x.t)) && !(before.some(x => PERC.test(x.t)) && cand.some(([, p]) => p === 3))
          && !(n2 && n2.w && (PRON[n2.t.toLowerCase()] || MODAL.test(n2.t) || /^(hat|haben|ist|sind|wird|werden)$/i.test(n2.t)))) {
          const need = pl ? 5 : 2;
          if (!cand.some(([, p]) => p === need)) {
            const lemma = cand[0][0], right = L.verbs[lemma][need];
            add(nx, `Subjekt „${text.slice(det.i, tok.i + tok.t.length)}“ ist ${pl ? 'Plural' : 'Singular'} – das Verb heißt „${right}“ (${pl ? 'sie' : 'er/sie/es'} ${right}).`, keepCase(nx.t, right));
          }
        }
      }
      // K) Präposition ohne Artikel: „um Hauptbahnhof“, „mit Bus“, „in Schule“
      const artPrep = /^(in|an|um|bei|von|mit|auf)$/i.test(tok.t) && !(/^(mit|von)$/i.test(tok.t) && pv && pv.w && /^\p{Lu}/u.test(pv.t) && !sentStart(k - 1));
      if (artPrep && nx && nx.w && L.nouns[nx.t] && L.nouns[nx.t][1] !== nx.t && !NOART.test(nx.t) && !/^(Vorteil|Nachteil)$/.test(nx.t) || (PREP.test(tok.t) && /^(nach|zu)$/i.test(tok.t) && nx && L.nouns[nx.t] && /^(Bahnhof|Hauptbahnhof|Arzt|Ärztin|Supermarkt|Schule|Apotheke|Post|Bank|Kita|Kindergarten|Haltestelle|Bushaltestelle|Polizei|Krankenhaus|Flughafen|Markt|Amt|Kurs|Chef|Chefin|Firma|Büro|Restaurant|Kino|Park)$/.test(nx.t))) {
        const g = L.nouns[nx.t][0], nn = toks[k + 2];
        if (!(nn && nn.w && /^\p{Lu}/u.test(nn.t))) {
          const lw = tok.t.toLowerCase(), f = g === 'f';
          const fix = { in: f ? 'in der' : 'im', an: f ? 'an der' : 'am', um: f ? 'an der' : 'am', zu: f ? 'zur' : 'zum', nach: f ? 'zur' : 'zum', bei: f ? 'bei der' : 'beim', von: f ? 'von der' : 'vom', mit: f ? 'mit der' : 'mit dem' }[lw];
          const msg = lw === 'um' ? `„um“ passt hier nicht. Wo? → „${fix} ${nx.t}“.` : /^(nach)$/.test(lw) ? `Zu Personen und Orten wie „${nx.t}“ sagt man „${fix} ${nx.t}“.` : `Hier fehlt wahrscheinlich ein Artikel${fix ? `: „${fix} ${nx.t}“` : ` (der/die/das, ein/eine)`}.`;
          add(tok, msg, fix ? keepCase(tok.t, fix) : null);
        }
      }
      // L) Gesprochener Text: Wort doppelt („die die Menschen“)
      if (speech && nx && nx.w && nx.t.toLowerCase() === low && low.length > 1 && nx.i === tok.i + tok.t.length + 1) {
        add(tok, 'Dieses Wort steht zweimal hintereinander. Beim Sprechen passiert das schnell – sag es nur einmal.', tok.t, 'STYLE', nx.i + nx.t.length - tok.i);
      }
    });
    return out;
  }


  /* Gesprochener Text kommt ohne Punkte aus der Spracherkennung („… ist Dennis ich komme aus Belarus ich habe …“).
     Ohne Satzgrenzen findet LanguageTool kaum Fehler. Darum setzen wir vor der Prüfung Punkte an wahrscheinlichen
     Satzanfängen (vor „ich“, „mein“ … nach einem Nomen, nach „Guten Tag“) und rechnen die Fundstellen danach zurück. */
  const STARTERS = /^(ich|du|er|wir|ihr|mein|meine|dein|deine|unser|unsere)$/;
  const NOSPLIT = /^(und|aber|oder|denn|sondern|weil|dass|wenn|ob|als|wie|wo|was|wer|warum|wann|wohin|woher|damit|obwohl|bevor|nachdem|während|bis|da|sobald|falls|seit|seitdem|mit|bei|von|zu|aus|nach|für|ohne|gegen|durch|um|in|an|auf|über|unter|vor|hinter|neben|zwischen|auch|nicht|noch|schon|gern|gerne|so|also|deshalb|trotzdem|dann|jetzt|heute|morgen|gestern|hier|dort|sehr|nur|immer|oft|manchmal|zusammen|sagt|sage|sagen|glaube|denke|finde|weiß|meint|meine)$/;
  function prepSpeech(text, L) {
    const tk = [...text.matchAll(/[\p{L}\p{N}ß]+|[.!?;:,\n]/gu)].map(m => ({ t: m[0], i: m.index, w: /[\p{L}\p{N}]/u.test(m[0]) }));
    const ins = [], caps = new Set();
    for (let k = 1; k < tk.length; k++) {
      const cur = tk[k], pv = tk[k - 1];
      if (!cur.w || !pv.w) continue;
      const lc = cur.t.toLowerCase(), lp = pv.t.toLowerCase();
      const greet = (/^(tag|morgen|abend)$/.test(lp) && /^guten$/i.test(tk[k - 2]?.t || '')) || (/^(hallo|hi)$/.test(lp) && k === 1);
      const start = STARTERS.test(lc) && !NOSPLIT.test(lp) && !L.forms.has(lp) && !PRON[lp] && !STARTERS.test(lp) && !/^\p{N}+$/u.test(lp);
      if (greet || start) { ins.push(pv.i + pv.t.length); caps.add(cur.i); }
    }
    if (!ins.length) return { text, map: (o, l) => [o, l] };
    let out = '', last = 0;
    const at2 = [];   // Position des eingefügten Punkts im neuen Text
    ins.forEach(p => { out += text.slice(last, p); at2.push(out.length); out += '.'; last = p; });
    out += text.slice(last);
    const chars = [...out];
    caps.forEach(i => { const j = i + ins.filter(p => p <= i).length; chars[j] = chars[j].toUpperCase(); });
    out = chars.join('');
    const back = x => x - at2.filter(q => q < x).length;
    return { text: out, map: (o, l) => { const a = back(o), b = back(o + l); return b > a ? [a, b - a] : null; } };
  }

  async function check(ta, panel, btn) {
    const text = ta.value;
    if (text.trim().length < 3) { panel.hidden = false; panel.innerHTML = '<p>Schreib zuerst einen Text. Dann kannst du ihn prüfen lassen.</p>'; return; }
    if (text.length > 15000) { panel.hidden = false; panel.innerHTML = '<p>Der Text ist sehr lang. Prüfe ihn bitte in kleineren Teilen.</p>'; return; }
    const wait = 3200 - (Date.now() - lastCall);
    if (wait > 0) await new Promise(r => setTimeout(r, wait));
    lastCall = Date.now();
    btn.disabled = true; btn.classList.add('is-busy'); panel.hidden = false; panel.innerHTML = '<p class="sc-loading"><span></span> Dein Text wird geprüft …</p>';
    let data = { matches: [] }, ltFailed = false;
    const L = await lexReady();
    const speech = ta.dataset.speech === '1';
    const P = speech ? prepSpeech(text, L) : { text, map: (o, l) => [o, l] };
    const remap = list => list.map(m => { const r = P.map(m.offset, m.length); return r && { ...m, offset: r[0], length: r[1] }; }).filter(Boolean);
    try {
      const r = await fetch(API, { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: new URLSearchParams({ text: P.text, language: 'de-DE', level: 'picky' }) });
      if (r.status === 429) throw new Error('limit');
      if (!r.ok) throw new Error('http');
      data = await r.json();
    } catch (e) { ltFailed = e.message || 'http'; }
    btn.disabled = false; btn.classList.remove('is-busy');
    const lt = remap((data.matches || []).filter(m => !speech || (!['PUNCTUATION', 'TYPOGRAPHY'].includes(m.rule?.category?.id) && !/UPPERCASE_SENTENCE_START|KOMMA|COMMA|PUNCT|SATZZEICHEN|LEERZEICHEN|WHITESPACE|PUNKT|SENTENCE_FRAGMENT|SATZ_OHNE|WORD_REPEAT_BEGINNING/i.test(m.rule?.id || ''))));
    const own = remap(learnerChecks(P.text, L, speech)).filter(o => !lt.some(m => o.offset < m.offset + m.length && m.offset < o.offset + o.length));
    const matches = [...lt, ...own].sort((a, b) => a.offset - b.offset);
    const ex = extraChecks(text, ta), words = ex.words, out = speech ? [] : ex.out;
    const counts = {};
    matches.forEach(m => { const c = CAT[m.rule?.category?.id] || 'Sonstiges'; counts[c] = (counts[c] || 0) + 1; });
    const score = matches.length === 0 && !out.length ? 'sc-good' : matches.length <= 3 ? 'sc-mid' : 'sc-bad';
    panel.innerHTML = `
      <div class="sc-head ${score}"><b>${matches.length === 0 ? '✓ Keine Fehler gefunden' : `${matches.length} ${matches.length === 1 ? 'Stelle' : 'Stellen'} zum Verbessern`}</b><span>${words} Wörter${Object.keys(counts).length ? ' · ' + Object.entries(counts).map(([k, v]) => `${v}× ${k}`).join(' · ') : ''}</span></div>
      ${matches.length ? `<p class="sc-legend"><span class="sc-sp">Rechtschreibung</span><span class="sc-gr">Grammatik</span><span class="sc-pu">Zeichen</span><span class="sc-st">Stil</span></p><div class="sc-text" lang="de">${marked(text, matches)}</div>` : ''}
      ${matches.length ? `<ol class="sc-list">${matches.map((m, i) => `<li data-i="${i}" class="sc-${COLOR[m.rule?.category?.id] || 'st'}"><span class="sc-cat">${esc(CAT[m.rule?.category?.id] || 'Hinweis')}</span> <q>${esc(text.slice(m.offset, m.offset + m.length))}</q> – ${esc(m.message)}${m.replacements?.length ? `<span class="sc-fix">${m.replacements.slice(0, 3).map(r => `<button type="button" data-i="${i}" data-r="${esc(r.value)}">${esc(r.value) || '(löschen)'}</button>`).join('')}</span>` : ''}</li>`).join('')}</ol>` : ''}
      ${out.length ? `<ul class="sc-extra">${out.map(([t, d]) => `<li><b>${esc(t)}:</b> ${esc(d)}</li>`).join('')}</ul>` : ''}
      ${matches.length === 0 && !out.length ? '<p>Sehr gut! Lies deinen Text trotzdem noch einmal laut: Passt alles zur Aufgabe?</p>' : '<p class="sc-hint">Tipp: Klicke auf einen Vorschlag, um ihn zu übernehmen. Versuche aber zuerst selbst, den Fehler zu finden – so lernst du am meisten.</p>'}
      ${ltFailed ? `<p class="sc-hint">${ltFailed === 'limit' ? 'LanguageTool ist gerade ausgelastet' : 'LanguageTool ist gerade nicht erreichbar'} – angezeigt werden nur die typischen Lernerfehler. Prüfe später noch einmal.</p>` : ''}
      ${speech ? '<p class="sc-hint">Gesprochener Text: Satzzeichen werden hier nicht bewertet – achte auf Wortformen, Endungen und Satzbau.</p>' : ''}
      <p class="sc-privacy">Automatische Prüfung (LanguageTool und eigene Regeln für typische Lernerfehler). Sie findet nicht alle Fehler und bewertet nicht den Inhalt.</p>`;
    panel.querySelectorAll('.sc-fix button').forEach(b => b.onclick = () => {
      const m = matches[Number(b.dataset.i)];
      if (ta.value !== text) { check(ta, panel, btn); return; }
      ta.value = text.slice(0, m.offset) + b.dataset.r + text.slice(m.offset + m.length);
      ta.dispatchEvent(new Event('input', { bubbles: true }));
      check(ta, panel, btn);
    });
    panel.querySelectorAll('mark[data-i]').forEach(mk => mk.onclick = mk.onkeydown = e => {
      if (e.type === 'keydown' && e.key !== 'Enter') return;
      const li = panel.querySelector(`.sc-list li[data-i="${mk.dataset.i}"]`);
      li?.scrollIntoView({ behavior: 'smooth', block: 'nearest' }); li?.classList.add('is-hl'); setTimeout(() => li?.classList.remove('is-hl'), 1200);
    });
  }

  function enhance(ta) {
    if (ta.dataset.sc || ta.readOnly || ta.disabled || ta.closest('[data-nocheck], #site-helper') || location.hash.startsWith('#pinnwand')) return;
    ta.dataset.sc = '1';
    ta.spellcheck = true; ta.lang = 'de';
    const bar = document.createElement('div'); bar.className = 'sc-bar';
    bar.innerHTML = '<button type="button" class="sc-btn"><span aria-hidden="true">✓</span> Text prüfen</button><span class="sc-note">Sofort-Feedback zu Rechtschreibung, Grammatik und Zeichensetzung. Beim Klick wird dein Text an LanguageTool gesendet (<a href="#datenschutz">Datenschutz</a>).</span>';
    const panel = document.createElement('div'); panel.className = 'sc-panel'; panel.hidden = true; panel.setAttribute('aria-live', 'polite');
    ta.after(bar, panel);
    bar.querySelector('button').onclick = e => check(ta, panel, e.currentTarget);
  }
  const scan = () => document.querySelectorAll('main textarea').forEach(enhance);
  new MutationObserver(scan).observe(document.querySelector('main') || document.body, { childList: true, subtree: true });
  window.addEventListener('hashchange', () => setTimeout(scan, 50));
  scan();
})();
