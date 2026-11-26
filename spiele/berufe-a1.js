/* Lernspiel „Berufe-Quiz A1“ (spiele.js / DMGame). Data: berufe-data.js (DM.berufe, loaded before this file in lazy.js).
   4 exercises: picture, activity, workplace, „Ich bin …“ (no article). 10 questions, 3 answers, shuffled; checked by index. */
(() => {
  if (!window.DMGame) return;
  if (!document.getElementById('sp-berufe-a1-css')) {
    const st = document.createElement('style');
    st.id = 'sp-berufe-a1-css';
    st.textContent = `
.sp-berufe-a1-pic{display:flex;justify-content:center;margin:0 0 12px}
.sp-berufe-a1-pic img,.sp-berufe-a1-pic .sp-berufe-a1-emo{width:140px;height:140px;border-radius:16px;background:var(--dm-tinte-soft)}
.sp-berufe-a1-pic img{object-fit:cover;display:block}
.sp-berufe-a1-emo{display:flex;align-items:center;justify-content:center;font-size:84px;line-height:1}
.sp-berufe-a1-q{display:flex;gap:10px;align-items:flex-start}
.sp-berufe-a1-q .ch-q{flex:1;min-width:0;overflow-wrap:anywhere}
.sp-berufe-a1-say{flex:0 0 auto;min-width:44px;min-height:44px;border:2px solid var(--dm-line);border-radius:12px;background:var(--dm-surface);font-size:20px;cursor:pointer}
.sp-berufe-a1-say:hover{border-color:var(--dm-tinte)}
.sp-berufe-a1-hint{margin:-8px 0 12px;color:var(--dm-muted);font-size:16px}
.sp-berufe-a1 .ch-opt{overflow-wrap:anywhere}
@media (max-width:360px){.sp-berufe-a1-pic img,.sp-berufe-a1-pic .sp-berufe-a1-emo{width:112px;height:112px}.sp-berufe-a1-emo{font-size:66px}}
`;
    document.head.appendChild(st);
  }
  const isImg = s => /^[\w-]+\/[\w-]+$/.test(s);
  const noun = s => s.replace(/^(der|die) /, '');
  const cap = s => s.charAt(0).toUpperCase() + s.slice(1);
  // pictures that do not show one profession clearly are never asked in "Wer ist das?"
  const NO_PIC = ['kassierer', 'erzieher', 'lagerarbeiter', 'altenpfleger', 'hausmeister', 'dolmetscher'];
  // professions that are too close to be used as wrong answers for each other (picture and activity)
  const NEAR = [['pfleger', 'altenpfleger', 'arzt'], ['arzt', 'tierarzt'], ['polizist', 'feuerwehr', 'pfleger', 'altenpfleger', 'arzt'], ['busfahrer', 'lkwfahrer'], ['verkaeufer', 'kassierer'],
    ['elektriker', 'hausmeister', 'mechaniker'], ['bauarbeiter', 'maler', 'elektriker', 'hausmeister'], ['postbote', 'lagerarbeiter'],
    ['lehrer', 'erzieher'], ['reinigung', 'hausmeister'], ['schauspieler', 'saenger'], ['baecker', 'verkaeufer']];
  const near = (a, b) => a === b || NEAR.some(g => g.includes(a) && g.includes(b));
  // workplaces that are also true for a profession: never offered as a "wrong" place
  const ALSO = { kellner: ['im Restaurant'], koch: ['im Café'], arzt: ['im Krankenhaus', 'in der Tierarztpraxis'], tierarzt: ['in der Praxis'],
    pfleger: ['in der Praxis', 'im Altenheim'], altenpfleger: ['im Krankenhaus'], verkaeufer: ['im Supermarkt', 'in der Bäckerei'], baecker: ['im Geschäft'], kassierer: ['im Geschäft'],
    elektriker: ['im Wohnhaus', 'in der Werkstatt'], maler: ['im Wohnhaus'], lehrer: ['in der Kita'], erzieher: ['in der Schule'],
    dolmetscher: ['im Krankenhaus', 'in der Praxis', 'in der Schule', 'bei der Polizei'], busfahrer: ['auf der Autobahn'], lkwfahrer: ['im Bus'],
    polizist: ['auf der Autobahn'], feuerwehr: ['auf der Autobahn'],
    schauspieler: ['auf der Bühne'], saenger: ['im Theater'], lagerarbeiter: ['bei der Post'], postbote: ['im Lager'] };
  const NO_ORT = ['reinigung', 'hausmeister']; // work in many places

  DMGame.register({
    id: 'berufe-a1', cat: 'basis', level: 'A1', icon: '👩‍🔧', title: 'Berufe-Quiz A1',
    desc: 'Bild, Tätigkeit, Arbeitsort und „Ich bin …“ – 10 Fragen pro Runde.',
    intro: 'Wähle die richtige Antwort. Es gibt 10 Fragen und 3 Antworten pro Frage. Tipp: Erst alle Berufe auf der Seite „Berufe auf Deutsch A1“ ansehen.',
    optionsLabel: 'Übung',
    options: [{ id: 'bild', label: 'Wer ist das? (Bild)' }, { id: 'taetigkeit', label: 'Was macht …? (Tätigkeit)' },
      { id: 'ort', label: 'Wo arbeitet …? (Arbeitsort)' }, { id: 'ichbin', label: 'Ich bin … (ohne Artikel)' }],
    next: [['#berufe', 'Alle Berufe ansehen'], ['#spiele/satzbau', 'Satz-Baumeister']],
    start(api, opt) {
      const B = (window.DM && DM.berufe && DM.berufe.list) || [];
      if (!B.length) { api.el.innerHTML = '<p>Die Berufe konnten nicht geladen werden. Bitte lade die Seite neu.</p>'; return; }
      const mode = ['bild', 'taetigkeit', 'ort', 'ichbin'].includes(opt) ? opt : 'bild';
      const pool = B.filter(b => mode === 'bild' ? !NO_PIC.includes(b.id) : mode === 'ort' ? !NO_ORT.includes(b.id) : true);
      const round = api.pick(pool, 10), N = round.length, wrong = [];
      let i = 0, score = 0;
      const picHTML = b => isImg(b.bild) ? `<img src="assets/${api.esc(b.bild)}.webp" width="256" height="256" alt="">` : `<span class="sp-berufe-a1-emo" aria-hidden="true">${api.esc(b.bild)}</span>`;
      // 2 wrong answers: other professions, never the same text as the right answer, never two equal texts
      const others = (b, val, ok) => {
        const seen = new Set([val]), out = [];
        for (const o of api.shuffle(B)) { const v = ok(o); if (o.id !== b.id && v && !seen.has(v)) { seen.add(v); out.push(v); } if (out.length === 2) break; }
        return out;
      };
      function ask() {
        api.clearFeedback();
        const b = round[i], fem = i % 2 === 1, form = fem ? b.f : b.m;
        let q, say = '', hint = '', right, wrongs, tip, top = '';
        if (mode === 'bild') {
          q = 'Wer ist das?'; top = picHTML(b); right = `${b.m} · ${b.f}`;
          wrongs = others(b, right, o => near(b.id, o.id) ? '' : `${o.m} · ${o.f}`);
          tip = `${b.m} · ${b.f} – ${b.taetigkeit}`;
        } else if (mode === 'taetigkeit') {
          q = `Was macht ${form}?`; say = q; right = b.taetigkeit;
          wrongs = others(b, right, o => near(b.id, o.id) ? '' : o.taetigkeit);
          tip = `${cap(form)}: ${b.taetigkeit}`;
        } else if (mode === 'ort') {
          q = `Wo arbeitet ${form}?`; say = q; right = b.ort;
          wrongs = others(b, right, o => (ALSO[b.id] || []).includes(o.ort) ? '' : o.ort);
          tip = `${cap(form)} arbeitet ${b.ort}.`;
        } else {
          const n = noun(form), ein = fem ? 'eine' : 'ein', art = fem ? 'die' : 'der';
          // no picture here: the photos show one gender, the question alternates m/f
          q = 'Ich bin ___ .'; hint = `${fem ? 'Frau' : 'Mann'}: ${form}`; right = n;
          wrongs = [`${ein} ${n}`, `${art} ${n}`];
          tip = `Beruf nach „sein“: ohne Artikel. Ich bin ${n}.`;
        }
        const opts = api.shuffle([right, ...wrongs]), k = opts.indexOf(right);
        api.hud({ step: `Frage ${i + 1} von ${N}`, progress: i / N });
        api.el.innerHTML = `${top ? `<div class="sp-berufe-a1-pic">${top}</div>` : ''}
          <div class="sp-berufe-a1-q"><p class="ch-q" lang="de">${api.esc(q)}</p>${say ? `<button type="button" class="sp-berufe-a1-say" aria-label="Frage anhören"><span aria-hidden="true">🔊</span></button>` : ''}</div>
          ${hint ? `<p class="sp-berufe-a1-hint" lang="de">${api.esc(hint)}</p>` : ''}
          <div class="ch-opts" role="group" aria-label="Antworten">${opts.map((o, j) => `<button type="button" class="ch-opt" data-k="${j}" lang="de"><kbd>${j + 1}</kbd>${api.esc(o)}</button>`).join('')}</div>`;
        const sb = api.el.querySelector('.sp-berufe-a1-say');
        if (sb) sb.onclick = () => api.speak(say);
        api.el.querySelectorAll('.ch-opt').forEach(btn => {
          btn.onclick = () => {
            const pickN = Number(btn.dataset.k), ok = pickN === k;
            api.el.querySelectorAll('.ch-opt').forEach(o => { o.disabled = true; if (Number(o.dataset.k) === k) o.classList.add('is-right'); });
            if (ok) score++;
            else {
              btn.classList.add('is-wrong');
              wrong.push({ correct: mode === 'ichbin' ? `Ich bin ${right}.` : right, tip });
              if (window.DMFehler) DMFehler.add({ q: mode === 'bild' ? `Wer ist das? (${b.taetigkeit})` : mode === 'ichbin' ? `Ich bin ___ . (${form})` : q,
                a: right, opts, hint: tip, src: 'Spiel: Berufe-Quiz A1', level: 'A1', ...(isImg(b.bild) ? { img: `assets/${b.bild}.webp` } : {}) });
            }
            api.hud({ score, progress: (i + 1) / N });
            api.feedback(ok, ok ? `<b>✓ Richtig: ${api.esc(right)}</b>${mode === 'ichbin' ? `<span>${api.esc(tip)}</span>` : ''}`
              : `<b>Richtig: ${api.esc(right)}</b><span>💡 ${api.esc(tip)}</span>`);
            i++;
            api.next(i < N ? 'Weiter' : 'Ergebnis', () => i < N ? ask() : api.finish({ score, max: N, wrong }));
          };
        });
      }
      ask();
    }
  });
})();
