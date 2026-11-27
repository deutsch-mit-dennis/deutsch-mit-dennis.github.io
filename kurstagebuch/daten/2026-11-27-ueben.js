// Exercises for lesson 4 (2026-11-27). Format: see ../SCHEMA.md
// All names in the examples are invented.
window.KT_UEBEN = {
  date: '2026-11-27',
  title: 'Übungen: Dinge im Kursraum und Bitten',
  sets: [
    {
      id: 'dinge-kursraum', icon: '🎒', title: 'Dinge im Kursraum', type: 'match',
      items: [
        { pairs: [
          ['🎒', 'der Rucksack'],
          ['👓', 'die Brille'],
          ['📱', 'das Tablet'],
          ['🔑', 'der Schlüssel'],
          ['💡', 'die Lampe'],
          ['✏️', 'der Bleistift'],
          ['🖱️', 'die Maus'],
          ['📓', 'das Heft']
        ] }
      ]
    },
    {
      id: 'artikel-dinge', icon: '🏷️', title: 'der, das oder die?', type: 'gap',
      items: [
        { text: '___ Tisch', options: ['der', 'das', 'die'], answer: 0,
          why: 'Es heißt der Tisch. Tipp: Lerne jedes Nomen mit Artikel.' },
        { text: '___ Tasche', options: ['das', 'die', 'der'], answer: 1,
          why: 'Es heißt die Tasche. Viele Wörter mit -e am Ende haben „die“.' },
        { text: '___ Buch', options: ['die', 'der', 'das'], answer: 2,
          why: 'Es heißt das Buch.' },
        { text: '___ Schlüssel', options: ['der', 'die', 'das'], answer: 0,
          why: 'Es heißt der Schlüssel.' },
        { text: '___ Brille', options: ['der', 'die', 'das'], answer: 1,
          why: 'Es heißt die Brille (-e am Ende).' },
        { text: '___ Handy', options: ['die', 'der', 'das'], answer: 2,
          why: 'Es heißt das Handy.' },
        { text: '___ Stift', options: ['das', 'der', 'die'], answer: 1,
          why: 'Es heißt der Stift.' },
        { text: '___ Tür', options: ['die', 'das', 'der'], answer: 0,
          why: 'Es heißt die Tür.' }
      ]
    },
    {
      id: 'plural-dinge', icon: '✌️', title: 'Plural: ein … → zwei …', type: 'choice',
      items: [
        { q: 'ein Stift → zwei …', options: ['Stifts', 'Stifte', 'Stiften'], answer: 1,
          why: 'der Stift – die Stifte (Plural mit -e).' },
        { q: 'eine Maus → zwei …', options: ['Mäuse', 'Mause', 'Mäusen'], answer: 0,
          why: 'die Maus – die Mäuse: au wird äu, dazu -e.' },
        { q: 'ein Heft → zwei …', options: ['Heften', 'Hefts', 'Hefte'], answer: 2,
          why: 'das Heft – die Hefte (Plural mit -e).' },
        { q: 'ein Buch → zwei …', options: ['Buchs', 'Bücher', 'Buche'], answer: 1,
          why: 'das Buch – die Bücher: u wird ü, dazu -er.' },
        { q: 'eine Flasche → zwei …', options: ['Flaschen', 'Flasches', 'Fläsche'], answer: 0,
          why: 'die Flasche – die Flaschen: Wörter mit -e bekommen oft -n.' },
        { q: 'eine Lampe → zwei …', options: ['Lampes', 'Lämpe', 'Lampen'], answer: 2,
          why: 'die Lampe – die Lampen (-e → -en).' }
      ]
    },
    {
      id: 'schluessel-schuessel', icon: '🔑', title: 'Schlüssel oder Schüssel?', type: 'choice',
      items: [
        { q: 'Ich mache die Tür auf. Ich brauche einen …', options: ['Schüssel', 'Schlüssel', 'Schüler'], answer: 1,
          why: 'Mit dem Schlüssel (mit „l“) öffnet man die Tür.' },
        { q: 'Ich mache Salat. Ich brauche eine große …', options: ['Schüssel', 'Schlüssel', 'Brille'], answer: 0,
          why: 'Der Salat kommt in die Schüssel (ohne „l“).' },
        { q: 'Welcher Artikel passt? … Schüssel', options: ['der', 'das', 'die'], answer: 2,
          why: 'die Schüssel, aber: der Schlüssel.' },
        { q: 'ein Schlüssel → zwei …', options: ['Schlüsseln', 'Schlüssel', 'Schlüssels'], answer: 1,
          why: 'Wörter mit -el bleiben im Plural oft gleich: der Schlüssel – die Schlüssel.' },
        { q: 'Ich habe zwei Schlüssel. Wo … meine Schlüssel?', options: ['sind', 'ist', 'bin'], answer: 0,
          why: 'Plural (zwei Schlüssel) → meine und sind: Wo sind meine Schlüssel?' }
      ]
    },
    {
      id: 'ein-kein', icon: '❔', title: 'ein / eine oder kein / keine?', type: 'gap',
      items: [
        { text: 'Was ist das? – Das ist ___ Heft.', options: ['eine', 'ein', 'einen'], answer: 1,
          why: 'das Heft → ein Heft. Nach „Das ist …“ ändert sich nichts.' },
        { text: 'Ist das eine Lampe? – Ja, das ist ___ Lampe.', options: ['ein', 'keine', 'eine'], answer: 2,
          why: 'die Lampe → eine Lampe. Die Antwort ist „Ja“ → also nicht „keine“.' },
        { text: 'Ist das ein Kuli? – Nein, das ist ___ Kuli. Das ist eine Brille.', options: ['kein', 'keine', 'ein'], answer: 0,
          why: 'Nein + der Kuli → kein Kuli (ohne -e).' },
        { text: 'Ist das ___ Buch? – Nein, das ist kein Buch. Das ist ein Bildschirm.', options: ['einen', 'eine', 'ein'], answer: 2,
          why: 'das Buch → ein Buch.' },
        { text: 'Ist das eine Tasse? – Nein, das ist ___ Tasse.', options: ['keine', 'kein', 'eine'], answer: 0,
          why: 'Nein + die Tasse → keine Tasse. Bei „die“ immer mit -e.' }
      ]
    },
    {
      id: 'kein-sondern', icon: '🔄', title: 'Nein, das ist kein … Das ist …', type: 'choice',
      items: [
        { q: '📱 Ist das ein Computer? (→ Tablet)',
          options: ['Nein, das ist keine Computer. Das ist ein Tablet.', 'Nein, das ist kein Computer. Das ist ein Tablet.', 'Nein, das ist kein Computer. Das ist eine Tablet.'], answer: 1,
          why: 'der Computer → kein Computer, das Tablet → ein Tablet.' },
        { q: '📕 Ist das ein Heft? (→ Buch)',
          options: ['Nein, das ist nicht Heft. Das ist ein Buch.', 'Nein, das ist kein Heft. Das ist einen Buch.', 'Nein, das ist kein Heft. Das ist ein Buch.'], answer: 2,
          why: 'Vor dem Nomen sagt man „kein“, nicht „nicht“. Nach „Das ist …“: ein Buch (nicht „einen“).' },
        { q: '👓 Ist das eine Lampe? (→ Brille)',
          options: ['Nein, das ist keine Lampe. Das ist eine Brille.', 'Nein, das ist kein Lampe. Das ist eine Brille.', 'Nein, das ist keine Lampe. Das ist ein Brille.'], answer: 0,
          why: 'die Lampe → keine Lampe, die Brille → eine Brille. Bei „die“ immer mit -e.' },
        { q: '🍾 Ist das ein Glas? (→ Flasche)',
          options: ['Nein, das ist kein Glas. Das ist ein Flasche.', 'Nein, das ist kein Glas. Das ist eine Flasche.', 'Nein, das ist keine Glas. Das ist eine Flasche.'], answer: 1,
          why: 'das Glas → kein Glas, die Flasche → eine Flasche.' },
        { q: '🪑 Ist das ein Tisch? (→ Stuhl)',
          options: ['Nein, das ist keinen Tisch. Das ist ein Stuhl.', 'Nein, das ist kein Tisch. Das ist einen Stuhl.', 'Nein, das ist kein Tisch. Das ist ein Stuhl.'], answer: 2,
          why: 'Nach „Das ist …“ steht kein Akkusativ: kein Tisch, ein Stuhl (nicht „keinen“, „einen“).' },
        { q: '🚪 Ist das ein Fenster? (→ Tür)',
          options: ['Nein, das ist kein Fenster. Das ist eine Tür.', 'Nein, das ist keine Fenster. Das ist eine Tür.', 'Nein, das ist kein Fenster. Das ist ein Tür.'], answer: 0,
          why: 'das Fenster → kein Fenster, die Tür → eine Tür.' }
      ]
    },
    {
      id: 'er-es-sie', icon: '👉', title: 'er, es oder sie?', type: 'gap',
      items: [
        { text: 'Der Kuli ist hier. ___ ist blau.', options: ['Er', 'Es', 'Sie'], answer: 0,
          why: 'der Kuli → er.' },
        { text: 'Das Handy ist neu. ___ funktioniert gut.', options: ['Sie', 'Es', 'Er'], answer: 1,
          why: 'das Handy → es.' },
        { text: 'Die Lampe ist schön. ___ ist weiß.', options: ['Er', 'Es', 'Sie'], answer: 2,
          why: 'die Lampe → sie.' },
        { text: 'Das Tablet liegt auf dem Tisch. ___ ist schwarz.', options: ['Es', 'Er', 'Sie'], answer: 0,
          why: 'das Tablet → es.' },
        { text: 'Der Bildschirm ist sehr groß. ___ ist neu.', options: ['Sie', 'Er', 'Es'], answer: 1,
          why: 'der Bildschirm → er.' },
        { text: 'Die Tasche ist groß. ___ ist von Frau Martin.', options: ['Es', 'Er', 'Sie'], answer: 2,
          why: 'die Tasche → sie.' }
      ]
    },
    {
      id: 'mein-dein-dinge', icon: '🙋', title: 'Wem gehört das? mein / meine – dein / deine', type: 'gap',
      items: [
        { text: 'Ali, ist das ___ Rucksack?', options: ['deine', 'dein', 'meine'], answer: 1,
          why: 'Ich frage Ali (du) → dein. der Rucksack → dein (ohne -e).' },
        { text: 'Hier ist eine Brille. Ist das ___ Brille, Nina?', options: ['deine', 'dein', 'mein'], answer: 0,
          why: 'Ich frage Nina (du) → dein. die Brille → deine (mit -e).' },
        { text: 'Ist das deine Tasche, Sara? – Ja, das ist ___ Tasche!', options: ['mein', 'deine', 'meine'], answer: 2,
          why: 'Sara spricht über sich → mein. die Tasche → meine.' },
        { text: 'Timo sagt: „Das ist ___ Heft. Es gehört mir.“', options: ['meine', 'mein', 'dein'], answer: 1,
          why: '„Es gehört mir“ → mein. das Heft → mein (ohne -e).' },
        { text: 'Ist das ___ Kuli, Olena? – Nein, das ist der Kuli von Timo.', options: ['dein', 'meine', 'deine'], answer: 0,
          why: 'Ich frage Olena (du) → dein. der Kuli → dein (ohne -e).' },
        { text: 'Ist das dein Stuhl? – Nein, das ist nicht ___ Stuhl.', options: ['meine', 'dein', 'mein'], answer: 2,
          why: 'Ich spreche über mich → mein. der Stuhl → mein (ohne -e).' }
      ]
    },
    {
      id: 'dialoge-kursraum', icon: '💬', title: 'Dialoge im Kursraum: Was fehlt?', type: 'gap',
      items: [
        { text: 'Timo: Hallo Nina! Was ist das? Ist das ___ Bleistift?', options: ['eine', 'ein', 'einen'], answer: 1,
          why: 'der Bleistift → ein Bleistift. Nach „Ist das …?“ ändert sich nichts.' },
        { text: 'Nina: Nein, das ist ___ Bleistift. Das ist ein Kuli.', options: ['kein', 'keine', 'nicht'], answer: 0,
          why: 'Nein + der Bleistift → kein Bleistift.' },
        { text: 'Nina: Nein, das ist keine Tasche. Das ist ___ Rucksack!', options: ['eine', 'keine', 'ein'], answer: 2,
          why: 'der Rucksack → ein Rucksack.' },
        { text: 'Sara: Guten Morgen, Ali! Hier liegt ein Heft. Ist das ___ Heft?', options: ['dein', 'deine', 'meine'], answer: 0,
          why: 'Sara fragt Ali (du) → dein. das Heft → dein (ohne -e).' },
        { text: 'Ali: Nein, das ist nicht mein Heft. Das ist ___ Heft von Olena.', options: ['der', 'die', 'das'], answer: 2,
          why: 'Wir wissen genau, wem es gehört → der / das / die: das Heft von Olena.' },
        { text: 'Sara: Ist das deine Flasche? – Ali: Ja! Das ist ___ Flasche.', options: ['mein', 'deine', 'meine'], answer: 2,
          why: 'Ali spricht über sich → mein. die Flasche → meine.' },
        { text: 'Frau Martin: Guten Tag, Herr Adam! Funktioniert ___ Computer?', options: ['das', 'der', 'die'], answer: 1,
          why: 'Es heißt der Computer.' },
        { text: 'Herr Adam: Nein, der Computer ist alt. ___ ist kaputt.', options: ['Er', 'Es', 'Sie'], answer: 0,
          why: 'der Computer → er.' },
        { text: 'Frau Martin: Super! Aber wo ist ___ Brille?', options: ['der', 'die', 'das'], answer: 1,
          why: 'Es heißt die Brille.' },
        { text: 'Frau Martin: Guten Morgen, Ali! Lesen Sie bitte den ___!', options: ['Heft', 'Text', 'Tafel'], answer: 1,
          why: '„den“ passt nur zu einem der-Wort: der Text → Lesen Sie den Text!' },
        { text: 'Ali: Gut. Hier ist mein ___. Wie heißt das Wort auf Deutsch?', options: ['Heft', 'Tafel', 'Notizen'], answer: 0,
          why: '„mein“ passt zu der/das: das Heft. Die Tafel → meine, Notizen = Plural.' },
        { text: 'Olena: Und wo ist mein ___? Es ist nicht auf dem Tisch.', options: ['Handy', 'Schlüssel', 'Tasche'], answer: 0,
          why: '„es“ zeigt: ein das-Wort → das Handy.' },
        { text: 'Nina: Deine ___ ist hier! Sie ist unter dem Stuhl.', options: ['Schlüssel', 'Tasche', 'Handy'], answer: 1,
          why: '„deine“ und „sie“ zeigen: ein die-Wort → die Tasche.' }
      ]
    },
    {
      id: 'an-aus-auf-zu', icon: '💡', title: 'an / aus oder auf / zu?', type: 'gap',
      items: [
        { text: 'Das Licht ist ___. Der Raum ist hell.', options: ['auf', 'an', 'zu'], answer: 1,
          why: 'Licht, Computer, Handy (Strom) → an / aus. Hell → das Licht ist an.' },
        { text: 'Die Tür ist ___. Bitte klopfen!', options: ['zu', 'an', 'aus'], answer: 0,
          why: 'Tür, Fenster, Rucksack → auf / zu. Klopfen → die Tür ist zu.' },
        { text: 'Das Handy ist ___. Es klingelt nicht.', options: ['auf', 'zu', 'aus'], answer: 2,
          why: 'Handy (Strom) → an / aus. Es klingelt nicht → aus.' },
        { text: 'Das Fenster ist ___. Frische Luft kommt in den Raum.', options: ['aus', 'auf', 'an'], answer: 1,
          why: 'Fenster → auf / zu. Frische Luft kommt herein → das Fenster ist auf.' },
        { text: 'Der Laptop ist ___. Ich kann arbeiten.', options: ['an', 'aus', 'zu'], answer: 0,
          why: 'Laptop (Strom) → an / aus. Ich arbeite → er ist an.' },
        { text: 'Der Rucksack ist ___. Ich sehe das Buch im Rucksack.', options: ['aus', 'an', 'auf'], answer: 2,
          why: 'Rucksack → auf / zu. Ich sehe hinein → er ist auf.' },
        { text: 'Es ist kalt. Mach bitte das Fenster ___!', options: ['zu', 'aus', 'an'], answer: 0,
          why: 'Fenster → aufmachen / zumachen. Kalt → Mach das Fenster zu!' },
        { text: 'Der Kurs ist fertig. Schalte bitte den Computer ___!', options: ['auf', 'aus', 'zu'], answer: 1,
          why: 'Computer → einschalten / ausschalten. Der Kurs ist fertig → ausschalten.' }
      ]
    },
    {
      id: 'bitten-du-sie', icon: '🙏', title: 'Bitten: Verb auf Position 1 (du und Sie)', type: 'gap',
      items: [
        { text: '___ Sie bitte langsam!', options: ['Lesen', 'Sprechen', 'Machen'], answer: 1,
          why: 'langsam sprechen → Sprechen Sie bitte langsam! Bei einer Bitte steht das Verb auf Position 1.' },
        { text: '___ Sie bitte das Wort „Schlüssel“! – S – C – H – L – …', options: ['Buchstabieren', 'Machen', 'Geben'], answer: 0,
          why: 'Buchstabe für Buchstabe → Buchstabieren Sie bitte!' },
        { text: '___ Sie bitte die Sätze laut!', options: ['Machen', 'Buchstabieren', 'Lesen'], answer: 2,
          why: 'Sätze laut lesen → Lesen Sie bitte die Sätze laut!' },
        { text: '___ Sie bitte Notizen!', options: ['Sprechen', 'Machen', 'Buchstabieren'], answer: 1,
          why: 'Notizen machen → Machen Sie bitte Notizen!' },
        { text: '___ Sie bitte Ihren Namen auf das Blatt!', options: ['Schreiben', 'Sprechen', 'Machen'], answer: 0,
          why: 'auf das Blatt schreiben → Schreiben Sie bitte Ihren Namen!' },
        { text: 'Nina, ___ mir bitte die Flasche!', options: ['geben', 'gibst', 'gib'], answer: 2,
          why: 'du-Bitte: geben → du gibst → gib! (ohne -st, ohne „du“).' },
        { text: 'Ali, ___ bitte lauter!', options: ['sprech', 'sprich', 'sprechen'], answer: 1,
          why: 'du-Bitte: sprechen → du sprichst → sprich! (e wird i).' },
        { text: 'Timo, ___ bitte das Licht aus!', options: ['machst', 'machen', 'mach'], answer: 2,
          why: 'du-Bitte: machen → du machst → mach!' },
        { text: 'Olena, ___ bitte einen Stift!', options: ['nimm', 'nehm', 'nimmst'], answer: 0,
          why: 'du-Bitte: nehmen → du nimmst → nimm! (e wird i, dazu mm).' },
        { text: 'Sara, ___ bitte das Wort „Heft“!', options: ['buchstabierst', 'buchstabiere', 'buchstabieren'], answer: 1,
          why: 'du-Bitte: buchstabieren → du buchstabierst → buchstabiere! (Verben auf -ieren meist mit -e)' }
      ]
    },
    {
      id: 'akkusativ-einen', icon: '🤲', title: 'Gib mir bitte …: einen, ein, eine', type: 'gap',
      items: [
        { text: 'Gib mir bitte ___ Stift! (der)', options: ['ein', 'einen', 'eine'], answer: 1,
          why: 'geben → Akkusativ (Was?). der → einen: einen Stift.' },
        { text: 'Gib mir bitte ___ Heft! (das)', options: ['ein', 'eine', 'einen'], answer: 0,
          why: 'Akkusativ: das bleibt gleich → ein Heft.' },
        { text: 'Gib mir bitte ___ Maus! (die)', options: ['einen', 'ein', 'eine'], answer: 2,
          why: 'Akkusativ: die bleibt gleich → eine Maus.' },
        { text: 'Ich kaufe ___ Stuhl. (der)', options: ['eine', 'einen', 'ein'], answer: 1,
          why: 'kaufen → Akkusativ. der → einen: einen Stuhl.' },
        { text: 'Ich nehme ___ Flasche Wasser. (die)', options: ['eine', 'einen', 'ein'], answer: 0,
          why: 'Akkusativ: die bleibt gleich → eine Flasche.' },
        { text: 'Ich möchte ___ Kaffee, ich möchte einen Tee. (der)', options: ['keine', 'kein', 'keinen'], answer: 2,
          why: 'möchten → Akkusativ. der → keinen (wie einen).' },
        { text: 'Ich habe ___ Buch. Gib mir bitte dein Buch! (das)', options: ['keinen', 'keine', 'kein'], answer: 2,
          why: 'haben → Akkusativ. das bleibt gleich → kein Buch.' },
        { text: 'Das ist ___ Kuli. (der)', options: ['einen', 'ein', 'eine'], answer: 1,
          why: 'Vorsicht: Nach „Das ist …“ (sein) gibt es keinen Akkusativ → ein Kuli.' }
      ]
    },
    {
      id: 'satzbau-bitten', icon: '🧩', title: 'Satzbau: Verb auf Position 1 oder 2', type: 'order',
      items: [
        { chunks: ['Gib', 'mir bitte', 'den Schlüssel!'],
          why: 'Bitte (du) → das Verb „Gib“ steht auf Position 1.' },
        { chunks: ['Schließen', 'Sie', 'bitte', 'die Tür!'],
          why: 'Bitte (Sie) → Verb auf Position 1, dann „Sie“.' },
        { chunks: ['Öffne', 'bitte', 'das Fenster!'],
          why: 'Bitte (du) → das Verb „Öffne“ steht auf Position 1.' },
        { chunks: ['Das Buch', 'liegt', 'auf dem Tisch.'],
          why: 'Aussage → das Verb „liegt“ steht auf Position 2.' },
        { chunks: ['Wo', 'liegt', 'die Brille?'],
          why: 'W-Frage → W-Wort auf Position 1, Verb auf Position 2.' },
        { chunks: ['Ich', 'kaufe', 'einen Rucksack.'],
          why: 'Aussage → Verb auf Position 2. kaufen + Akkusativ: einen Rucksack.' },
        { chunks: ['Heute', 'lernen', 'wir', 'neue Wörter.'],
          why: '„Heute“ ist Position 1, das Verb „lernen“ bleibt auf Position 2.' }
      ]
    },
    {
      id: 'mein-tisch', icon: '🗂️', title: 'Mein Tisch im Kurs', type: 'steckbrief',
      items: [
        {
          fields: [
            { key: 'ding1', label: 'Ding 1 mit mein / meine (der, das → mein · die → meine)', placeholder: 'mein Kuli' },
            { key: 'satz1', label: 'Wie ist Ding 1? (Satz mit er / es / sie)', placeholder: 'Er ist blau.' },
            { key: 'ding2', label: 'Ding 2 mit mein / meine', placeholder: 'meine Flasche' },
            { key: 'satz2', label: 'Wie ist Ding 2? (Satz mit er / es / sie)', placeholder: 'Sie ist rot.' },
            { key: 'ding3', label: 'Ding 3 mit mein / meine', placeholder: 'mein Heft' },
            { key: 'satz3', label: 'Wie ist Ding 3? (Satz mit er / es / sie)', placeholder: 'Es ist neu.' },
            { key: 'bitte', label: 'Eine Bitte: Gib mir bitte … (einen / ein / eine + Ding)', placeholder: 'einen Bleistift' }
          ],
          template: 'Auf meinem Tisch im Kurs liegen drei Dinge. Das ist {ding1}. {satz1} Das ist {ding2}. {satz2} Das ist {ding3}. {satz3} Und jetzt meine Bitte: Gib mir bitte {bitte}!'
        }
      ]
    }
  ]
};
