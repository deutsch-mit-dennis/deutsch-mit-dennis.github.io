/* Verb-Rennen – schnelles Perfekt-Quiz: Partizip II und haben/sein. 60 Sekunden, 3 Leben. */
(() => {
  if (!window.DMGame) return;
  const SECONDS = 60, LIVES = 3, OK_MS = 700, BAD_MS = 1500;

  document.head.insertAdjacentHTML('beforeend', `<style id="sp-verben-css">
.sp-verben-card{text-align:center;padding:4px 0 6px}
.sp-verben-type{margin:4px 0 8px}
.sp-verben-verb{font-size:clamp(32px,9vw,46px);font-weight:800;margin:6px 0 4px;color:var(--dm-ink);overflow-wrap:anywhere}
.sp-verben-ask{margin:0 0 18px;color:#5b6680;font-weight:700;font-size:17px}
.sp-verben-sent{font-size:clamp(22px,5.4vw,28px);line-height:1.45;margin:10px 0 20px}
.sp-verben-gap{display:inline-block;min-width:2.8em;border-bottom:3px solid #c5cdf0;color:transparent}
.sp-verben-gap.is-filled{color:var(--dm-tinte);border-color:var(--dm-tinte)}
.sp-verben-opts{grid-template-columns:repeat(3,minmax(0,1fr))}
.sp-verben-opts.is-two{grid-template-columns:repeat(2,minmax(0,1fr))}
.sp-verben-opts .ch-opt{justify-content:center!important;text-align:center;font-size:20px;min-height:64px;overflow-wrap:anywhere}
.sp-verben-opts .ch-opt kbd{position:absolute;top:6px;left:8px}
@media (max-width:560px){.sp-verben-opts:not(.is-two){grid-template-columns:1fr}.sp-verben-opts:not(.is-two) .ch-opt{min-height:56px}}
.sp-verben-go{text-align:center;font-size:clamp(48px,14vw,72px);font-weight:800;color:var(--dm-tinte);margin:30px 0}
.sp-play.sp-verben .ch-feedback{min-height:0}
</style>`);

  /* Verben: [Infinitiv (| = trennbar), Präteritum (er/sie), Partizip II, Hilfsverb h/s, Typ, Fehler 1, Fehler 2]
     Typ: r = regelmäßig, u = unregelmäßig, m = gemischt, t = trennbar, i = untrennbar (be-/ver-/er-/emp-/ge-), ie = -ieren */
  const VERBS = [
    ['machen','machte','gemacht','h','r','gemachen','machte'],
    ['kaufen','kaufte','gekauft','h','r','gekaufen','gekäuft'],
    ['spielen','spielte','gespielt','h','r','gespielen','spielte'],
    ['lernen','lernte','gelernt','h','r','gelernen','gelarnt'],
    ['arbeiten','arbeitete','gearbeitet','h','r','gearbeiten','arbeitet'],
    ['wohnen','wohnte','gewohnt','h','r','gewohnen','wohnte'],
    ['kochen','kochte','gekocht','h','r','gekochen','kochte'],
    ['fragen','fragte','gefragt','h','r','gefragen','gefrogen'],
    ['hören','hörte','gehört','h','r','gehören','gehörten'],
    ['brauchen','brauchte','gebraucht','h','r','gebrauchen','gebrocht'],
    ['warten','wartete','gewartet','h','r','gewarten','wartet'],
    ['tanzen','tanzte','getanzt','h','r','getanzen','getonzen'],
    ['reisen','reiste','gereist','s','r','gereisen','gerissen'],
    ['regnen','regnete','geregnet','h','r','geregnt','geregnen'],
    ['antworten','antwortete','geantwortet','h','r','geantworten','geantwort'],
    ['heiraten','heiratete','geheiratet','h','r','geheiraten','geheirat'],
    ['öffnen','öffnete','geöffnet','h','r','geöffnen','geöffent'],
    ['zeigen','zeigte','gezeigt','h','r','gezeigen','geziegen'],
    ['suchen','suchte','gesucht','h','r','gesuchen','gesocht'],
    ['putzen','putzte','geputzt','h','r','geputzen','putzt'],
    ['gehen','ging','gegangen','s','u','gegeht','gegingen'],
    ['kommen','kam','gekommen','s','u','gekommt','gekamen'],
    ['fahren','fuhr','gefahren','s','u','gefahrt','gefuhren'],
    ['fliegen','flog','geflogen','s','u','gefliegt','gefliegen'],
    ['laufen','lief','gelaufen','s','u','gelauft','geliefen'],
    ['schwimmen','schwamm','geschwommen','s','u','geschwimmt','geschwammen'],
    ['bleiben','blieb','geblieben','s','u','gebleibt','gebleiben'],
    ['sein','war','gewesen','s','u','gesein','gewesst'],
    ['werden','wurde','geworden','s','u','gewordet','gewurden'],
    ['sterben','starb','gestorben','s','u','gesterbt','gestarben'],
    ['essen','aß','gegessen','h','u','geesst','gegassen'],
    ['trinken','trank','getrunken','h','u','getrinkt','getranken'],
    ['schreiben','schrieb','geschrieben','h','u','geschreibt','geschrieb'],
    ['lesen','las','gelesen','h','u','gelest','gelasen'],
    ['sprechen','sprach','gesprochen','h','u','gesprecht','gesprachen'],
    ['sehen','sah','gesehen','h','u','geseht','gesahen'],
    ['finden','fand','gefunden','h','u','gefindet','gefanden'],
    ['nehmen','nahm','genommen','h','u','genehmt','genahmen'],
    ['geben','gab','gegeben','h','u','gegebt','gegaben'],
    ['helfen','half','geholfen','h','u','gehelft','gehalfen'],
    ['schlafen','schlief','geschlafen','h','u','geschlaft','geschliefen'],
    ['treffen','traf','getroffen','h','u','getrefft','getraffen'],
    ['singen','sang','gesungen','h','u','gesingt','gesangen'],
    ['tragen','trug','getragen','h','u','getragt','getrugen'],
    ['waschen','wusch','gewaschen','h','u','gewascht','gewuschen'],
    ['rufen','rief','gerufen','h','u','geruft','geriefen'],
    ['sitzen','saß','gesessen','h','u','gesitzt','gesassen'],
    ['stehen','stand','gestanden','h','u','gesteht','gestandet'],
    ['ziehen','zog','gezogen','h','u','gezieht','gezogt'],
    ['schneiden','schnitt','geschnitten','h','u','geschneidet','geschnieden'],
    ['haben','hatte','gehabt','h','u','gehatt','gehaben'],
    ['liegen','lag','gelegen','h','u','geliegt','gelagen'],
    ['bringen','brachte','gebracht','h','m','gebringt','gebrungen'],
    ['denken','dachte','gedacht','h','m','gedenkt','gedunken'],
    ['wissen','wusste','gewusst','h','m','geweißt','gewissen'],
    ['kennen','kannte','gekannt','h','m','gekennt','gekannen'],
    ['ein|kaufen','kaufte ein','eingekauft','h','t','geeinkauft','eingekaufen'],
    ['auf|räumen','räumte auf','aufgeräumt','h','t','geaufräumt','aufgeräumen'],
    ['ab|holen','holte ab','abgeholt','h','t','geabholt','abgeholen'],
    ['an|fangen','fing an','angefangen','h','t','angefangt','geanfangen'],
    ['mit|bringen','brachte mit','mitgebracht','h','t','mitgebringt','gemitbracht'],
    ['fern|sehen','sah fern','ferngesehen','h','t','ferngeseht','geferngesehen'],
    ['ein|laden','lud ein','eingeladen','h','t','eingeladet','geeinladen'],
    ['aus|füllen','füllte aus','ausgefüllt','h','t','geausfüllt','ausgefüllen'],
    ['an|rufen','rief an','angerufen','h','t','angeruft','geanrufen'],
    ['auf|stehen','stand auf','aufgestanden','s','t','aufgesteht','geaufstanden'],
    ['ein|schlafen','schlief ein','eingeschlafen','s','t','eingeschlaft','geeinschlafen'],
    ['um|ziehen','zog um','umgezogen','s','t','umgeziehen','geumzogen'],
    ['an|kommen','kam an','angekommen','s','t','angekommt','geankommen'],
    ['ab|fahren','fuhr ab','abgefahren','s','t','abgefahrt','geabfahren'],
    ['aus|steigen','stieg aus','ausgestiegen','s','t','ausgesteigt','geausstiegen'],
    ['ein|steigen','stieg ein','eingestiegen','s','t','eingesteigt','geeinstiegen'],
    ['mit|kommen','kam mit','mitgekommen','s','t','mitgekommt','gemitkommen'],
    ['auf|hören','hörte auf','aufgehört','h','t','geaufhört','aufgehören'],
    ['an|melden','meldete an','angemeldet','h','t','geanmeldet','angemelden'],
    ['an|ziehen','zog an','angezogen','h','t','angezieht','geanziehen'],
    ['ab|geben','gab ab','abgegeben','h','t','abgegebt','geabgeben'],
    ['zurück|kommen','kam zurück','zurückgekommen','s','t','zurückgekommt','gezurückkommen'],
    ['vor|bereiten','bereitete vor','vorbereitet','h','t','vorgebereitet','gevorbereitet', 'vor|bereiten: trennbar, aber be- → kein zweites ge-: hat vorbereitet'],
    ['bezahlen','bezahlte','bezahlt','h','i','gebezahlt','bezahlen'],
    ['besuchen','besuchte','besucht','h','i','gebesucht','besuchen'],
    ['bestellen','bestellte','bestellt','h','i','gebestellt','bestellen'],
    ['erklären','erklärte','erklärt','h','i','geerklärt','erklären'],
    ['erzählen','erzählte','erzählt','h','i','geerzählt','erzählen'],
    ['verkaufen','verkaufte','verkauft','h','i','geverkauft','verkaufen'],
    ['verdienen','verdiente','verdient','h','i','geverdient','verdienen'],
    ['vergessen','vergaß','vergessen','h','i','gevergessen','vergaßen'],
    ['verstehen','verstand','verstanden','h','i','geverstanden','versteht'],
    ['bekommen','bekam','bekommen','h','i','gebekommen','bekommt'],
    ['beginnen','begann','begonnen','h','i','gebeginnt','begannen'],
    ['verlieren','verlor','verloren','h','i','geverloren','verliert'],
    ['gewinnen','gewann','gewonnen','h','i','gegewonnen','gewinnt'],
    ['erleben','erlebte','erlebt','h','i','geerlebt','erleben'],
    ['versuchen','versuchte','versucht','h','i','geversucht','versuchen'],
    ['verpassen','verpasste','verpasst','h','i','geverpasst','verpassen'],
    ['empfehlen','empfahl','empfohlen','h','i','geempfohlen','empfehlt'],
    ['bestehen','bestand','bestanden','h','i','gebestanden','bestehen'],
    ['telefonieren','telefonierte','telefoniert','h','ie','getelefoniert','telefonieren'],
    ['studieren','studierte','studiert','h','ie','gestudiert','studieren'],
    ['reparieren','reparierte','repariert','h','ie','gerepariert','reparieren'],
    ['fotografieren','fotografierte','fotografiert','h','ie','gefotografiert','fotografieren'],
    ['funktionieren','funktionierte','funktioniert','h','ie','gefunktioniert','funktionieren'],
    ['passieren','passierte','passiert','s','ie','gepassiert','passieren'],
    ['probieren','probierte','probiert','h','ie','geprobiert','probieren'],
    ['diskutieren','diskutierte','diskutiert','h','ie','gediskutiert','diskutieren'],
    ['informieren','informierte','informiert','h','ie','geinformiert','informieren'],
    ['buchstabieren','buchstabierte','buchstabiert','h','ie','gebuchstabiert','buchstabieren']
  ];

  /* haben oder sein: [Satz mit ___, richtig, falsch, Tipp] */
  const AUX = [
    ['Ich ___ nach Hause gefahren.','bin','habe','fahren → Bewegung → sein'],
    ['Wir ___ gestern ins Kino gegangen.','sind','haben','gehen → Bewegung → sein'],
    ['Er ___ eine Pizza gegessen.','hat','ist','essen → keine Bewegung → haben'],
    ['Ich ___ heute um sechs Uhr aufgestanden.','bin','habe','aufstehen → Veränderung → sein'],
    ['Meine Mutter ___ den ganzen Tag gearbeitet.','hat','ist','arbeiten → haben'],
    ['Mein Sohn ___ schnell gewachsen.','ist','hat','wachsen → Veränderung → sein'],
    ['Wir ___ im Sommer nach Spanien geflogen.','sind','haben','fliegen → Bewegung → sein'],
    ['Ich ___ meine Freundin angerufen.','habe','bin','anrufen → haben'],
    ['Du ___ zu spät gekommen!','bist','hast','kommen → Bewegung → sein'],
    ['Wir ___ letztes Jahr umgezogen.','sind','haben','umziehen → Ortswechsel → sein'],
    ['Er ___ im Urlaub viel geschlafen.','hat','ist','schlafen → keine Bewegung → haben'],
    ['Das Baby ___ endlich eingeschlafen.','ist','hat','einschlafen → Veränderung → sein'],
    ['Ich ___ zwei Wochen in Berlin geblieben.','bin','habe','bleiben → immer sein'],
    ['Wo ___ du gestern gewesen?','bist','hast','sein → Perfekt mit sein'],
    ['Was ___ passiert?','ist','hat','passieren → sein'],
    ['Ich ___ den Brief schon geschrieben.','habe','bin','schreiben → haben'],
    ['Wir ___ am Hauptbahnhof ausgestiegen.','sind','haben','aussteigen → Bewegung → sein'],
    ['Anna ___ ihrem Nachbarn geholfen.','hat','ist','helfen → haben'],
    ['Der Zug ___ pünktlich angekommen.','ist','hat','ankommen → Bewegung → sein'],
    ['Ich ___ einen Termin beim Arzt bekommen.','habe','bin','bekommen → haben'],
    ['Ihr ___ sehr schnell gelaufen.','seid','habt','laufen → Bewegung → sein'],
    ['Mein Opa ___ letztes Jahr gestorben.','ist','hat','sterben → Veränderung → sein'],
    ['Wir ___ lange auf den Bus gewartet.','haben','sind','warten → haben'],
    ['Er ___ Lehrer geworden.','ist','hat','werden → Veränderung → sein'],
    ['Ich ___ am Wochenende Freunde getroffen.','habe','bin','treffen → haben'],
    ['Meine Kollegin ___ mit dem Fahrrad zur Arbeit gefahren.','ist','hat','fahren → Bewegung → sein'],
    ['Wir ___ im Restaurant Fisch bestellt.','haben','sind','bestellen → haben'],
    ['Ich ___ das Auto in die Werkstatt gebracht.','habe','bin','bringen → haben (Akkusativ)'],
    ['Ich ___ die Prüfung bestanden!','habe','bin','bestehen → haben'],
    ['Der Film ___ um acht Uhr begonnen.','hat','ist','beginnen → haben (Achtung!)'],
    ['Er ___ seinen Schlüssel verloren.','hat','ist','verlieren → haben'],
    ['Wir ___ mit dem Zug nach Köln gereist.','sind','haben','reisen → Bewegung → sein'],
    ['Ich ___ gestern lange ferngesehen.','habe','bin','fernsehen → haben'],
    ['Du ___ die Tür nicht zugemacht.','hast','bist','zumachen → haben'],
    ['Meine Eltern ___ uns besucht.','haben','sind','besuchen → haben (Akkusativ)'],
    ['Ich ___ ins Auto eingestiegen.','bin','habe','einsteigen → Bewegung → sein'],
    ['Wann ___ ihr nach Deutschland gekommen?','seid','habt','kommen → Bewegung → sein'],
    ['Er ___ mit dem Rauchen aufgehört.','hat','ist','aufhören → haben (Achtung!)'],
    ['Das Wasser ___ kalt geworden.','ist','hat','werden → Veränderung → sein'],
    ['Ich ___ meinen Pass vergessen.','habe','bin','vergessen → haben'],
    ['Wir ___ zu Hause geblieben.','sind','haben','bleiben → immer sein'],
    ['Mein Mann ___ heute früh losgefahren.','ist','hat','losfahren → Bewegung → sein'],
    ['Ich ___ im Deutschkurs viel gelernt.','habe','bin','lernen → haben'],
    ['___ ihr den Kuchen schon gegessen?','Habt','Seid','essen → haben'],
    ['Mein Bruder ___ nach Kanada ausgewandert.','ist','hat','auswandern → Ortswechsel → sein'],
    ['Ich ___ mich für den Kurs angemeldet.','habe','bin','sich anmelden → haben'],
    ['Plötzlich ___ das Licht ausgegangen.','ist','hat','ausgehen → Veränderung → sein'],
    ['Wir ___ den Kindern eine Geschichte erzählt.','haben','sind','erzählen → haben'],
    ['Ich ___ heute schon fünf Kilometer gelaufen.','bin','habe','laufen → Bewegung → sein'],
    ['Die Kinder ___ schnell groß geworden.','sind','haben','werden → Veränderung → sein']
  ];

  const plain = v => v.replace('|', '');
  const tipFor = ([inf, prt, part, aux, typ, , , own]) => {
    if (own) return own;
    const forms = `${plain(inf)} – ${prt} – ${aux === 's' ? 'ist' : 'hat'} ${part}`;
    return ({ r: 'regelmäßig: ', u: 'unregelmäßig: ', m: 'gemischt: ', t: `trennbar (${inf}), ge- in der Mitte: `,
      i: 'nicht trennbar (be-, ver-, er- …) → ohne ge-: ', ie: 'Verben auf -ieren → ohne ge-: ' })[typ] + forms;
  };
  const LABEL = { r: 'Perfekt', u: 'Perfekt', m: 'Perfekt', t: 'Trennbares Verb', i: 'Mit oder ohne ge-?', ie: 'Mit oder ohne ge-?' };

  const POOL = [
    ...VERBS.map(v => ({ kind: 'p', label: LABEL[v[4]], verb: plain(v[0]), answer: v[2], wrong: [v[5], v[6]], tip: tipFor(v), correct: `${plain(v[0])} → ${v[3] === 's' ? 'ist' : 'hat'} ${v[2]}` })),
    ...AUX.map(([s, a, b, tip]) => ({ kind: 'a', label: 'haben oder sein?', sent: s, answer: a, wrong: [b], tip, correct: s.replace('___', a) }))
  ];

  DMGame.register({
    id: 'verben', title: 'Verb-Rennen', icon: '🏃', level: 'A2–B1',
    desc: 'Perfekt im Eiltempo: Partizip II und „haben oder sein?“ – 60 Sekunden.',
    intro: 'Du hast 60 Sekunden und 3 Leben. Wähle schnell die richtige Form: Partizip II oder haben/sein. Jede richtige Antwort gibt einen Punkt.',
    start(api) {
      const esc = api.esc, order = api.shuffle(POOL), wrong = [];
      let i = 0, score = 0, lives = LIVES, over = false, busy = false, wait = null, clock = null, rest = SECONDS;
      const live = () => api.el.isConnected;

      function end() {
        if (over) return; over = true;
        clearTimeout(wait); clock?.stop();
        if (live()) api.finish({ score, max: score + wrong.length, wrong });
      }

      function show() {
        if (over || !live()) return;
        busy = false;
        api.clearFeedback();
        if (i >= order.length) { i = 0; order.splice(0, order.length, ...api.shuffle(POOL)); }
        const it = order[i++];
        const opts = api.shuffle([it.answer, ...it.wrong]);
        const head = it.kind === 'p'
          ? `<p class="ch-label sp-verben-type">${esc(it.label)}</p><p class="sp-verben-verb" lang="de">${esc(it.verb)}</p><p class="sp-verben-ask">Wie heißt das Partizip II?</p>`
          : `<p class="ch-label sp-verben-type">${esc(it.label)}</p><p class="sp-verben-sent">${esc(it.sent).replace('___', '<span class="sp-verben-gap">___</span>')}</p>`;
        api.el.innerHTML = `<div class="sp-verben-card">${head}</div>
          <div class="ch-opts sp-verben-opts${opts.length === 2 ? ' is-two' : ''}" role="group" aria-label="Antworten">
            ${opts.map((o, k) => `<button type="button" class="ch-opt" data-k="${k}"><kbd>${k + 1}</kbd>${esc(o)}</button>`).join('')}
          </div>`;
        api.el.querySelectorAll('.ch-opt').forEach(b => b.onclick = () => answer(it, opts, b));
      }

      function answer(it, opts, b) {
        if (busy || over) return;
        busy = true;
        const ok = opts[+b.dataset.k] === it.answer;
        api.el.querySelectorAll('.ch-opt').forEach(x => { x.disabled = true; if (opts[+x.dataset.k] === it.answer) x.classList.add('is-right'); });
        const gap = api.el.querySelector('.sp-verben-gap');
        if (gap) { gap.textContent = it.answer; gap.classList.add('is-filled'); }
        if (ok) score++;
        else { b.classList.add('is-wrong'); lives--; wrong.push({ correct: it.correct, tip: it.tip }); }
        api.hud({ score, lives, maxLives: LIVES });
        api.feedback(ok, ok ? `Richtig! <span>${esc(it.tip)}</span>` : `Richtig ist: <b>${esc(it.answer)}</b><span>${esc(it.tip)}</span>`);
        if (lives <= 0) { clock?.stop(); wait = setTimeout(end, BAD_MS); return; }
        wait = setTimeout(show, ok ? OK_MS : BAD_MS);
      }

      // kurzer Countdown, dann geht es los
      api.hud({ score: 0, lives, maxLives: LIVES, time: SECONDS, progress: 0 });
      let c = 3;
      const tick = () => {
        if (!live()) return;
        if (c > 0) { api.el.innerHTML = `<p class="sp-verben-go" aria-live="assertive">${c}</p>`; c--; wait = setTimeout(tick, 600); return; }
        clock = api.timer(SECONDS, r => { rest = r; api.hud({ time: r, progress: (SECONDS - r) / SECONDS }); }, end);
        show();
      };
      tick();
    }
  });
})();
