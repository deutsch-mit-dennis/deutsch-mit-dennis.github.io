// Exercises for lesson 3 (2026-11-26). Format: see ../SCHEMA.md
// All names in the examples are invented.
window.KT_UEBEN = {
  date: '2026-11-26',
  title: 'Übungen: Berufe und Tätigkeiten',
  sets: [
    {
      id: 'wer-macht-was', icon: '🧑‍🚒', title: 'Wer macht was?', type: 'match',
      items: [
        { pairs: [
          ['der Schauspieler', 'spielt im Theater oder im Film.'],
          ['die Tierärztin', 'hilft kranken Tieren.'],
          ['die Friseurin', 'schneidet Haare.'],
          ['der Pilot', 'fliegt ein Flugzeug.'],
          ['die Krankenschwester', 'pflegt kranke Menschen.'],
          ['die Fußballspielerin', 'spielt Fußball.'],
          ['der Lehrer', 'unterrichtet in der Schule.'],
          ['die Polizistin', 'schützt Menschen.']
        ] }
      ]
    },
    {
      id: 'weiblich', icon: '👩‍✈️', title: 'Mann → Frau: die weibliche Form', type: 'choice',
      items: [
        { q: 'der Pilot → die …', options: ['Pilotin', 'Pilötin', 'Pilotfrau'], answer: 0,
          why: 'Oft hängt man einfach -in an: Pilot + -in = Pilotin.' },
        { q: 'der Schauspieler → die …', options: ['Schauspielin', 'Schauspielerin', 'Schauspielfrau'], answer: 1,
          why: 'Schauspieler + -in = Schauspielerin. Das -er bleibt.' },
        { q: 'der Polizist → die …', options: ['Polizistfrau', 'Polizisterin', 'Polizistin'], answer: 2,
          why: 'Polizist + -in = Polizistin.' },
        { q: 'der Fußballspieler → die …', options: ['Fußballspielerin', 'Fußballspielin', 'Fußballfrau'], answer: 0,
          why: 'Fußballspieler + -in = Fußballspielerin.' },
        { q: 'der Sänger → die …', options: ['Sangerin', 'Sängin', 'Sängerin'], answer: 2,
          why: 'Sänger + -in = Sängerin. Das ä bleibt.' },
        { q: 'der Tierarzt → die …', options: ['Tierarztin', 'Tierärztin', 'Tierärzterin'], answer: 1,
          why: 'Besondere Form: a wird ä, dazu -in: die Tierärztin.' },
        { q: 'der Feuerwehrmann → die …', options: ['Feuerwehrmannin', 'Feuerwehrmännin', 'Feuerwehrfrau'], answer: 2,
          why: 'Besondere Form: -mann wird -frau: die Feuerwehrfrau.' },
        { q: 'der Krankenpfleger → die …', options: ['Krankenschwester', 'Krankenpflegerfrau', 'Krankenmännin'], answer: 0,
          why: 'Besondere Form: die Krankenschwester. Offiziell heute: die Pflegefachfrau.' }
      ]
    },
    {
      id: 'taetigkeit-verb', icon: '🛠️', title: 'Welches Verb passt?', type: 'gap',
      items: [
        { text: 'Olena ist Friseurin. Sie ___ Haare.', options: ['singt', 'schneidet', 'löscht'], answer: 1,
          why: 'Eine Friseurin schneidet Haare.' },
        { text: 'Herr Weber ist Pilot. Er ___ ein Flugzeug.', options: ['fliegt', 'pflegt', 'spielt'], answer: 0,
          why: 'Ein Pilot fliegt ein Flugzeug.' },
        { text: 'Timo ist Fußballspieler. Er ___ Fußball.', options: ['hilft', 'unterrichtet', 'spielt'], answer: 2,
          why: 'Fußball spielen: Er spielt Fußball.' },
        { text: 'Nina ist Lehrerin. Sie ___ Mathe und Deutsch.', options: ['unterrichtet', 'schneidet', 'fliegt'], answer: 0,
          why: 'Eine Lehrerin unterrichtet ein Fach, z. B. Mathe.' },
        { text: 'Ali ist Tierarzt. Er ___ kranken Tieren.', options: ['löscht', 'hilft', 'singt'], answer: 1,
          why: 'Ein Tierarzt hilft kranken Tieren (helfen → er hilft).' },
        { text: 'Bat ist Feuerwehrmann. Er ___ Feuer.', options: ['spielt', 'pflegt', 'löscht'], answer: 2,
          why: 'Ein Feuerwehrmann löscht Feuer.' },
        { text: 'Mira ist Sängerin. Sie ___ Lieder.', options: ['singt', 'fliegt', 'hilft'], answer: 0,
          why: 'Eine Sängerin singt Lieder.' },
        { text: 'Ardit ist Krankenpfleger. Er ___ kranke Menschen.', options: ['schneidet', 'pflegt', 'spielt'], answer: 1,
          why: 'Ein Krankenpfleger pflegt kranke Menschen.' }
      ]
    },
    {
      id: 'richtig-falsch', icon: '✅', title: 'Richtig oder falsch?', type: 'choice',
      items: [
        { q: 'Ein Pilot schneidet Haare.', options: ['richtig', 'falsch'], answer: 1,
          why: 'Falsch: Ein Pilot fliegt ein Flugzeug. Ein Friseur schneidet Haare.' },
        { q: 'Eine Lehrerin arbeitet in der Schule.', options: ['richtig', 'falsch'], answer: 0,
          why: 'Richtig: Eine Lehrerin arbeitet in der Schule.' },
        { q: 'Ein Tierarzt untersucht kranke Tiere.', options: ['richtig', 'falsch'], answer: 0,
          why: 'Richtig: Ein Tierarzt untersucht und behandelt kranke Tiere.' },
        { q: 'Eine Feuerwehrfrau fliegt ein Flugzeug.', options: ['richtig', 'falsch'], answer: 1,
          why: 'Falsch: Eine Feuerwehrfrau löscht Feuer. Eine Pilotin fliegt ein Flugzeug.' },
        { q: 'Ein Polizist schützt Menschen.', options: ['richtig', 'falsch'], answer: 0,
          why: 'Richtig: Die Polizei schützt Menschen.' },
        { q: 'Ein Sänger spielt Fußball.', options: ['richtig', 'falsch'], answer: 1,
          why: 'Falsch: Ein Sänger singt Lieder. Ein Fußballspieler spielt Fußball.' }
      ]
    },
    {
      id: 'was-wo', icon: '❓', title: 'Was arbeiten Sie? Wo arbeiten Sie?', type: 'choice',
      items: [
        { q: '„Als was arbeiten Sie?“ – Was möchte die Person wissen?', options: ['die Firma', 'den Beruf', 'die Adresse'], answer: 1,
          why: '„Was / Als was arbeiten Sie?“ fragt nach dem Beruf.' },
        { q: '„Wo arbeiten Sie?“ – Was möchte die Person wissen?', options: ['die Firma', 'den Beruf', 'das Alter'], answer: 0,
          why: '„Wo arbeiten Sie?“ fragt nach der Firma (dem Arbeitsplatz).' },
        { q: 'Frage: „Wo arbeiten Sie?“ Welche Antwort passt?', options: ['Als Polizist.', 'Ich bin Polizist.', 'Bei der Polizei.'], answer: 2,
          why: 'Wo? → die Firma: bei der Polizei. „Als Polizist“ ist der Beruf.' },
        { q: 'Frage: „Was arbeiten Sie?“ Welche Antwort passt?', options: ['Bei der Post.', 'Ich bin Krankenpfleger.', 'In Köln.'], answer: 1,
          why: 'Was? → der Beruf: Ich bin Krankenpfleger.' },
        { q: 'Sie haben jetzt keine Arbeit. Sie lernen Deutsch. Frage: „Was machen Sie?“', options: ['Ich arbeite jetzt nicht, ich lerne Deutsch.', 'Ich arbeite als Deutsch.', 'Ich bin Deutsch von Beruf.'], answer: 0,
          why: 'Ohne Arbeit sagt man: Ich arbeite jetzt nicht, ich lerne Deutsch.' },
        { q: 'Herr Braun arbeitet zu Hause für die Familie. Er sagt:', options: ['Ich bin Hausfrau.', 'Ich bin Hausmann.', 'Ich bin Haus.'], answer: 1,
          why: 'Die Hausfrau kennen Sie von Tag 1. Ein Mann: der Hausmann.' },
        { q: 'Sara ist 17 Jahre alt. „Was machst du?“ – Sara sagt:', options: ['Ich besuche Schule.', 'Ich gehe zu Schule.', 'Ich gehe zur Schule.'], answer: 2,
          why: 'Man sagt: Ich gehe zur Schule (zu + der = zur).' }
      ]
    },
    {
      id: 'als-bei', icon: '🏢', title: 'arbeiten als … / arbeiten bei …', type: 'gap',
      items: [
        { text: 'Ich arbeite ___ Verkäufer.', options: ['bei', 'als', 'von'], answer: 1,
          why: 'Beruf → als: Ich arbeite als Verkäufer.' },
        { text: 'Olena arbeitet ___ der Post.', options: ['bei', 'als', 'von'], answer: 0,
          why: 'Firma → bei: Sie arbeitet bei der Post.' },
        { text: 'Timo arbeitet ___ Pilot.', options: ['bei', 'von', 'als'], answer: 2,
          why: 'Beruf → als: Er arbeitet als Pilot (ohne Artikel).' },
        { text: 'Bat arbeitet ___ der Feuerwehr.', options: ['als', 'von', 'bei'], answer: 2,
          why: 'die Feuerwehr ist der Arbeitsplatz → bei der Feuerwehr.' },
        { text: 'Mira arbeitet ___ Krankenschwester.', options: ['als', 'bei', 'von'], answer: 0,
          why: 'Beruf → als: Sie arbeitet als Krankenschwester.' },
        { text: 'Ardit arbeitet als Fahrer ___ der Firma Weber.', options: ['als', 'bei', 'von'], answer: 1,
          why: 'Erst der Beruf (als Fahrer), dann die Firma (bei der Firma Weber).' },
        { text: 'Als was arbeitest du? – ___ Tierarzt.', options: ['Bei', 'Als', 'Von'], answer: 1,
          why: 'Die Frage hat „als“ → die Antwort auch: Als Tierarzt.' },
        { text: 'Wo arbeitest du? – ___ der Bahn.', options: ['Als', 'Von', 'Bei'], answer: 2,
          why: 'Wo? → Firma → bei: Bei der Bahn.' }
      ]
    },
    {
      id: 'dialog-traumberuf', icon: '💬', title: 'Dialog: Mein Traumberuf', type: 'match',
      items: [
        { pairs: [
          ['Wie geht’s?', 'Geht so!'],
          ['Was bist du von Beruf?', 'Ich bin Verkäuferin.'],
          ['Wo arbeitest du?', 'Bei einer Firma in Köln.'],
          ['Was ist dein Traumberuf?', 'Mein Traumberuf ist Tierärztin.'],
          ['Warum? Was möchtest du machen?', 'Ich möchte kranken Tieren helfen.']
        ] }
      ]
    },
    {
      id: 'sein-adjektiv', icon: '🪑', title: 'sein + Adjektiv: ist oder sind?', type: 'gap',
      items: [
        { text: 'Der Tisch ___ groß.', options: ['sind', 'ist', 'bin'], answer: 1,
          why: 'der Tisch = ein Ding (Singular) → ist.' },
        { text: 'Die Stühle ___ bequem.', options: ['sind', 'ist', 'bist'], answer: 0,
          why: 'die Stühle = Plural (viele) → sind.' },
        { text: 'Das Handy ___ kaputt.', options: ['sind', 'bin', 'ist'], answer: 2,
          why: 'das Handy = Singular → ist.' },
        { text: 'Wir ___ Lehrer.', options: ['ist', 'sind', 'seid'], answer: 1,
          why: 'sein: wir sind.' },
        { text: 'Die Tische ___ schwarz.', options: ['ist', 'bin', 'sind'], answer: 2,
          why: 'die Tische = Plural → sind.' },
        { text: 'Das Gegenteil von dunkel ist ___.', options: ['hell', 'billig', 'kaputt'], answer: 0,
          why: 'dunkel ↔ hell: Der Raum ist hell.' },
        { text: 'Das Gegenteil von teuer ist ___.', options: ['groß', 'billig', 'schwarz'], answer: 1,
          why: 'teuer ↔ billig.' },
        { text: 'Das Gegenteil von groß ist ___.', options: ['hell', 'bequem', 'klein'], answer: 2,
          why: 'groß ↔ klein.' }
      ]
    },
    {
      id: 'plural-innen', icon: '👭', title: 'Plural: -in → -innen', type: 'choice',
      items: [
        { q: 'Ich habe eine Freundin. Olena hat zwei …', options: ['Freundinen', 'Freundinnen', 'Freundins'], answer: 1,
          why: '-in → -innen (mit nn): die Freundinnen.' },
        { q: 'eine Kollegin – zwei …', options: ['Kolleginnen', 'Kollegins', 'Kolleginen'], answer: 0,
          why: 'Kollegin + -nen = Kolleginnen.' },
        { q: 'eine Pilotin – zwei …', options: ['Pilotine', 'Pilotins', 'Pilotinnen'], answer: 2,
          why: 'Pilotin + -nen = Pilotinnen.' },
        { q: 'eine Polizistin – zwei …', options: ['Polizistine', 'Polizistinnen', 'Polizistinen'], answer: 1,
          why: 'Polizistin + -nen = Polizistinnen.' },
        { q: 'eine Nachbarin – zwei …', options: ['Nachbarinnen', 'Nachbarins', 'Nachbarine'], answer: 0,
          why: 'Nachbarin + -nen = Nachbarinnen.' },
        { q: 'eine Sängerin – zwei …', options: ['Sängerins', 'Sängerinen', 'Sängerinnen'], answer: 2,
          why: 'Sängerin + -nen = Sängerinnen. Nie -s am Ende.' }
      ]
    },
    {
      id: 'vokalwechsel', icon: '🔄', title: 'e → i / ie: hilft, spricht, sieht, liest', type: 'gap',
      items: [
        { text: 'Olena ___ gut Englisch.', options: ['sprecht', 'spricht', 'sprichst'], answer: 1,
          why: 'sprechen: er/sie spricht (e wird i).' },
        { text: 'Timo ___ gern Bücher.', options: ['liest', 'lest', 'liesst'], answer: 0,
          why: 'lesen: er/sie liest (e wird ie).' },
        { text: 'Ali ___ am Abend einen Film.', options: ['seht', 'siehst', 'sieht'], answer: 2,
          why: 'sehen: er/sie sieht (e wird ie).' },
        { text: 'Du ___ deiner Mutter in der Küche.', options: ['hilfst', 'hilft', 'helfst'], answer: 0,
          why: 'helfen: du hilfst (e wird i, dazu -st).' },
        { text: '___ du das Auto dort?', options: ['Sehst', 'Siehst', 'Sieht'], answer: 1,
          why: 'sehen: du siehst (e wird ie, dazu -st).' },
        { text: 'Ich ___ meinem Sohn bei den Hausaufgaben.', options: ['helfe', 'hilfe', 'hilft'], answer: 0,
          why: 'Bei „ich“ bleibt das e: ich helfe.' },
        { text: 'Was ___ du gern?', options: ['lest', 'lese', 'liest'], answer: 2,
          why: 'lesen: du liest (nur -t, weil das s schon da ist).' },
        { text: 'Frau Martin, ___ Sie die Tafel?', options: ['sieht', 'sehen', 'siehst'], answer: 1,
          why: 'Bei „Sie“ (höflich) bleibt das e: Sie sehen.' },
        { text: 'Die Krankenschwester ___ dem Arzt.', options: ['helft', 'hilfst', 'hilft'], answer: 2,
          why: 'helfen: er/sie hilft.' }
      ]
    },
    {
      id: 'perfekt-ge', icon: '⏪', title: 'Perfekt mit ge-', type: 'gap',
      items: [
        { text: 'machen: Was hast du gestern ___?', options: ['gemacht', 'gemachen', 'gemachtet'], answer: 0,
          why: 'machen → ge- + mach + -t = gemacht.' },
        { text: 'kaufen: Ich habe ein Handy ___.', options: ['kauft', 'gekauft', 'gekaufen'], answer: 1,
          why: 'kaufen → ge- + kauf + -t = gekauft.' },
        { text: 'sprechen: Ich habe mit dem Chef ___.', options: ['gesprecht', 'gespricht', 'gesprochen'], answer: 2,
          why: 'sprechen ist besonders: ge- + -en, und e wird o = gesprochen.' },
        { text: 'lesen: Hast du das Buch ___?', options: ['gelest', 'geliest', 'gelesen'], answer: 2,
          why: 'lesen → ge- + les + -en = gelesen.' },
        { text: 'kochen: Mira hat eine Suppe ___.', options: ['gekocht', 'gekochen', 'gekochtet'], answer: 0,
          why: 'kochen → ge- + koch + -t = gekocht.' },
        { text: 'sehen: Ich habe den Film ___.', options: ['gesieht', 'gesehen', 'gesehtet'], answer: 1,
          why: 'sehen → ge- + seh + -en = gesehen.' }
      ]
    },
    {
      id: 'perfekt-ohne-ge', icon: '🚫', title: 'Perfekt ohne ge-', type: 'choice',
      items: [
        { q: 'Frau Martin war Lehrerin. Sie hat Mathe … (unterrichten)', options: ['geunterrichtet', 'unterrichtet', 'untergerichtet'], answer: 1,
          why: 'unterrichten → kein ge-: Sie hat unterrichtet.' },
        { q: 'Der Mechaniker hat das Auto … (reparieren)', options: ['repariert', 'gerepariert', 'reparieren'], answer: 0,
          why: 'Verben auf -ieren haben kein ge-: repariert.' },
        { q: 'Ich habe die Frage … (verstehen)', options: ['verstehen', 'geverstanden', 'verstanden'], answer: 2,
          why: 'ver- am Anfang → kein ge-: verstanden.' },
        { q: 'Ali hat eine E-Mail … (bekommen)', options: ['bekommen', 'gebekommt', 'gebekommen'], answer: 0,
          why: 'be- am Anfang → kein ge-: bekommen.' },
        { q: 'Olena hat den Text … (übersetzen)', options: ['geübersetzt', 'übersetzt', 'übersetzen'], answer: 1,
          why: 'übersetzen → kein ge-: übersetzt.' },
        { q: 'Timo hat das Formular … (kopieren)', options: ['kopieren', 'gekopiert', 'kopiert'], answer: 2,
          why: 'Verben auf -ieren haben kein ge-: kopiert.' },
        { q: 'Die Ärztin hat das Kind … (untersuchen)', options: ['geuntersucht', 'untersuchen', 'untersucht'], answer: 2,
          why: 'untersuchen → kein ge-: untersucht.' },
        { q: 'Der Kellner hat den Kaffee … (servieren)', options: ['serviert', 'geserviert', 'servieren'], answer: 0,
          why: 'Verben auf -ieren haben kein ge-: serviert.' },
        { q: 'Die Tierärztin hat den Hund … (behandeln)', options: ['gebehandelt', 'behandelt', 'behandeln'], answer: 1,
          why: 'be- am Anfang → kein ge-: behandelt.' }
      ]
    },
    {
      id: 'satzbau-beruf', icon: '🧩', title: 'Satzbau: Das Verb steht auf Platz 2', type: 'order',
      items: [
        { chunks: ['Mein Traumberuf', 'ist', 'Pilot.'],
          why: '„Mein Traumberuf“ ist Platz 1, das Verb „ist“ Platz 2.' },
        { chunks: ['Der Friseur', 'schneidet', 'Haare.'],
          why: '„Der Friseur“ ist Platz 1, das Verb „schneidet“ Platz 2.' },
        { chunks: ['Ich', 'arbeite', 'als', 'Krankenpfleger.'],
          why: 'Das Verb (arbeite) steht auf Platz 2. Dann „als“ + Beruf.' },
        { chunks: ['Wo', 'arbeiten', 'Sie?'],
          why: 'W-Frage: W-Wort auf Platz 1, Verb auf Platz 2.' },
        { chunks: ['Jetzt', 'lerne', 'ich', 'Deutsch.'],
          why: 'Platz 1 ist „Jetzt“. Das Verb bleibt auf Platz 2, dann kommt „ich“.' },
        { chunks: ['Ich', 'habe', 'Physik', 'unterrichtet.'],
          why: 'Perfekt: „habe“ auf Platz 2, „unterrichtet“ am Ende.' },
        { chunks: ['Ich', 'möchte', 'Haare', 'schneiden.'],
          why: '„möchte“ auf Platz 2, das zweite Verb (schneiden) am Ende.' }
      ]
    },
    {
      id: 'traumberuf', icon: '🌟', title: 'Mein Traumberuf', type: 'steckbrief',
      items: [
        {
          fields: [
            { key: 'name', label: 'Name', placeholder: 'Olena' },
            { key: 'jetzt', label: 'Beruf jetzt (ganzer Satz: Ich bin … / Ich lerne Deutsch.)', placeholder: 'Ich lerne Deutsch und suche Arbeit.' },
            { key: 'traum', label: 'Traumberuf (ohne Artikel)', placeholder: 'Polizistin' },
            { key: 'moechte', label: 'Ich möchte … (was machen?)', placeholder: 'Menschen schützen' },
            { key: 'warum', label: 'Warum? (ganzer Satz)', placeholder: 'Ich helfe gern.' }
          ],
          template: 'Hallo! Ich heiße {name}. {jetzt} Mein Traumberuf ist {traum}. Ich möchte {moechte}. Warum? {warum}'
        }
      ]
    }
  ]
};
