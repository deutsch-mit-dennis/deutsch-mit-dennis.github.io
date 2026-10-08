/* Lernspiel „Dialog-Simulator“ – Alltagsgespräche mit Verzweigung (A2–B1, DTZ Sprechen).
   Die Gesprächspartner sprechen ihre Sätze (api.speak); alle gesprochenen Sätze stehen auch in spiele/tts-dialog.json. */
(() => {
  const ID = 'dialog';
  const CSS = `
.sp-dialog-head{display:flex;align-items:center;gap:12px;padding:10px 12px;border-radius:16px;background:#f3f5fb}
.sp-dialog-head b{display:block;font-size:18px;line-height:1.25}.sp-dialog-head small{display:block;color:#55607a;font-size:14px;line-height:1.3}
.sp-dialog-head>div{flex:1;min-width:0}
.sp-dialog-where{font-size:13px;font-weight:700;color:#55607a;background:#fff;border-radius:99px;padding:4px 10px;white-space:nowrap}
.sp-dialog-av{display:grid;place-items:center;flex:0 0 46px;width:46px;height:46px;border-radius:50%;color:#fff;font-weight:800;font-size:17px;letter-spacing:.02em}
.sp-dialog-av.is-sm{flex-basis:34px;width:34px;height:34px;font-size:13px;margin-top:2px}
.sp-dialog-sit{margin:10px 2px 8px;color:#3b4560;font-size:16px;line-height:1.45}
.sp-dialog-chat{display:flex;flex-direction:column;gap:10px;height:clamp(220px,40vh,430px);overflow-y:auto;overscroll-behavior:contain;padding:12px 10px;border:1px solid var(--dm-line);border-radius:18px;background:linear-gradient(#fbfcff,#f4f6fb);scroll-behavior:smooth}
.sp-dialog-msg{display:flex;gap:8px;align-items:flex-start;max-width:92%;animation:spDialogIn .25s ease-out}
.sp-dialog-msg.is-me{align-self:flex-end;flex-direction:row-reverse}
.sp-dialog-b{display:flex;align-items:flex-start;gap:2px;padding:8px 6px 8px 14px;border-radius:18px 18px 18px 6px;background:#fff;border:1px solid #e1e5ef;box-shadow:0 2px 6px rgba(23,32,54,.05)}
.sp-dialog-b p{margin:0;padding-top:3px;font-size:17px;line-height:1.45}
.is-me .sp-dialog-b{border-radius:18px 18px 6px 18px;background:var(--dm-tinte-soft);border-color:transparent;padding:10px 14px}
.is-me.is-bad .sp-dialog-b{background:#fdecea;border:1px dashed #e7a29d}
.is-me.is-bad .sp-dialog-b p::before{content:'✗ ';color:#c62828;font-weight:800}
.is-me.is-ok .sp-dialog-b p::before{content:'✓ ';color:#1f9d55;font-weight:800}
.sp-dialog-say{flex:0 0 44px;width:44px;height:44px;margin:-6px -2px -6px 0;border:0;border-radius:50%;background:transparent;font-size:18px;cursor:pointer}
.sp-dialog-say:hover,.sp-dialog-say:focus-visible{background:#eef1f8}
.sp-dialog-typing .sp-dialog-b{padding:12px 16px}
.sp-dialog-typing i{display:inline-block;width:8px;height:8px;margin:0 2px;border-radius:50%;background:#9aa3b8;animation:spDialogDot 1s infinite}
.sp-dialog-typing i:nth-child(2){animation-delay:.15s}.sp-dialog-typing i:nth-child(3){animation-delay:.3s}
.sp-dialog-opts{margin-top:4px}
.sp-dialog-opts .ch-opt{font-size:17px;min-height:56px}
.sp-dialog-opts .ch-opt kbd{flex:0 0 auto}
.sp-dialog-wait{color:#8a93a8;font-size:15px;margin:10px 2px;min-height:56px}
.sp-dialog-rm{margin-top:14px;padding:14px 16px;border-radius:16px;background:#f8f9fc}
.sp-dialog-rm h2{font-size:20px;margin:0 0 4px}.sp-dialog-rm>p{margin:0 0 8px;color:#55607a;font-size:15px}
.sp-dialog-rm ol{margin:0;padding-left:22px}.sp-dialog-rm li{margin:8px 0;line-height:1.4}
.sp-dialog-rm li small{display:block;color:#5b6680;font-size:14px}.sp-dialog-rm li b{font-weight:700}
@keyframes spDialogIn{from{opacity:0;transform:translateY(6px)}}
@keyframes spDialogDot{50%{opacity:.3;transform:translateY(-3px)}}
@media (max-width:520px){.sp-dialog-chat{height:clamp(200px,33vh,330px)}.sp-dialog-sit{font-size:15px}.sp-dialog-where{display:none}.sp-dialog-msg{max-width:96%}.sp-dialog-b p,.sp-dialog-opts .ch-opt{font-size:16px}}
@media (prefers-reduced-motion:reduce){.sp-dialog-msg,.sp-dialog-typing i{animation:none}.sp-dialog-chat{scroll-behavior:auto}}`;

  /* Jede Runde: s = Satz des Gegenübers, a = passende Antwort, n = kurzer Hinweis zur guten Antwort,
     w = falsche Antworten [Art, Text, Reaktion des Gegenübers, Erklärung]. Art: g = Grammatik, r = unhöflich/zu locker, o = passt nicht */
  const SC = [
    { id: 'arzt', label: '🩺 Arzttermin am Telefon', where: '📞 Telefon',
      p: { name: 'Frau Krüger', full: 'Sabine Krüger', role: 'Medizinische Fachangestellte · Praxis Dr. Becker', voice: 'f1', color: '#0f766e' },
      sit: 'Du hast seit drei Tagen Halsschmerzen und Fieber. Du rufst in der Arztpraxis an und möchtest einen Termin.',
      turns: [
        { s: 'Praxis Dr. Becker, Krüger am Apparat. Guten Tag!', a: 'Guten Tag! Ich möchte gern einen Termin vereinbaren.', n: 'Begrüßen und sofort sagen, was man möchte.',
          w: [['r', 'Hallo, gib mir mal einen Termin.', 'Wie bitte? Etwas freundlicher, bitte. Was kann ich für Sie tun?', 'Mit der Praxis sprichst du höflich und mit „Sie“: „Ich möchte gern einen Termin vereinbaren.“'],
              ['o', 'Guten Tag, ist da die Apotheke?', 'Nein, hier ist die Arztpraxis Dr. Becker. Was kann ich für Sie tun?', 'Du hast die Arztpraxis angerufen. Sag direkt, was du möchtest: einen Termin.']] },
        { s: 'Gern. Waren Sie schon einmal bei uns?', a: 'Ja, ich war im Frühling schon einmal bei Ihnen.',
          w: [['g', 'Ja, ich bin schon gewesen bei Sie.', 'Entschuldigung, das habe ich nicht verstanden. Waren Sie schon einmal in unserer Praxis?', 'Nach „bei“ steht der Dativ: „bei Ihnen“. Das Partizip steht am Ende: „Ich bin schon bei Ihnen gewesen.“ – oder einfacher: „Ich war schon einmal bei Ihnen.“'],
              ['o', 'Ja, ich nehme die Tabletten jeden Morgen.', 'Ähm … ich meine: Waren Sie schon einmal hier in der Praxis?', 'Die Frage ist: Kennt die Praxis dich schon? Antworte mit Ja oder Nein und einem kurzen Satz.']] },
        { s: 'Gut. Und was fehlt Ihnen?', a: 'Ich habe seit drei Tagen starke Halsschmerzen und Fieber.', n: 'Beschwerden nennen und sagen, seit wann.',
          w: [['g', 'Ich habe seit drei Tag Halsschmerzen und Fieber.', 'Seit wann, sagen Sie? Das habe ich nicht genau verstanden.', '„seit“ + Dativ, im Plural mit -n: „seit drei Tagen“.'],
              ['o', 'Mir fehlt nichts, ich habe schon alles eingekauft.', 'Nein, ich meine: Welche Beschwerden haben Sie? Was tut Ihnen weh?', '„Was fehlt Ihnen?“ heißt beim Arzt: Welche Beschwerden haben Sie?']] },
        { s: 'Oh, das tut mir leid. Können Sie morgen früh um halb neun kommen?', a: 'Morgen früh kann ich leider nicht. Geht es vielleicht auch am Nachmittag?', n: 'Höflich absagen und eine andere Zeit vorschlagen.',
          w: [['r', 'Nee, so früh ist doof. Was anderes!', 'Bitte bleiben Sie höflich. Wann hätten Sie denn Zeit?', 'Höflich ablehnen: „Morgen früh kann ich leider nicht. Geht es vielleicht auch …?“'],
              ['o', 'Ja, um halb neun gehe ich immer einkaufen.', 'Also passt Ihnen halb neun nicht? Möchten Sie lieber eine andere Uhrzeit?', 'Wenn ein Termin nicht passt, sag es klar und frag nach einer anderen Zeit.']] },
        { s: 'Am Nachmittag ist um 15 Uhr noch etwas frei.', a: 'Ja, 15 Uhr passt mir sehr gut.',
          w: [['g', 'Ja, 15 Uhr passt mich sehr gut.', 'Wie bitte? Passt Ihnen 15 Uhr oder nicht?', '„passen“ steht mit Dativ: „Das passt mir.“'],
              ['o', 'Mein Sohn ist 15 Jahre alt.', 'Ähm, ja … Aber passt Ihnen der Termin um 15 Uhr?', 'Es geht um die Uhrzeit für deinen Termin. Sag, ob sie dir passt.']] },
        { s: 'Wie ist Ihr Name, bitte?', a: 'Mein Name ist Nowak. Ich buchstabiere: N-O-W-A-K.', n: 'Am Telefon den Namen am besten buchstabieren.',
          w: [['r', 'Warum willst du das wissen?', 'Ich brauche Ihren Namen für den Termin. Bitte nennen Sie ihn mir.', 'Hier sagst du „Sie“, nicht „du“. Nenne einfach deinen Namen – am Telefon am besten buchstabiert.'],
              ['o', 'Ich wohne in der Goethestraße.', 'Danke, aber ich brauche zuerst Ihren Namen.', 'Die Frage war nach dem Namen, nicht nach der Adresse.']] },
        { s: 'Danke schön. Bringen Sie morgen bitte Ihre Versichertenkarte mit.', a: 'Ja, mache ich. Vielen Dank und auf Wiederhören!', n: 'Am Telefon verabschiedet man sich mit „Auf Wiederhören!“',
          w: [['g', 'Ja, ich mitbringe die Karte.', 'Wie bitte? Bringen Sie die Karte mit?', '„mitbringen“ ist trennbar: „Ich bringe die Karte mit.“'],
              ['r', 'Okay, ciao!', 'Na gut … Haben Sie das mit der Karte verstanden?', 'Am Telefon mit der Praxis verabschiedest du dich höflich: „Vielen Dank und auf Wiederhören!“']] }
      ],
      end: 'Gern geschehen. Gute Besserung und auf Wiederhören!' },

    { id: 'vermieter', label: '🔧 Schaden beim Vermieter melden', where: '📞 Telefon',
      p: { name: 'Herr Schmitt', full: 'Klaus Schmitt', role: 'Vermieter', voice: 'm1', color: '#1d4ed8' },
      sit: 'Im Bad ist das Rohr unter dem Waschbecken undicht. Du rufst deinen Vermieter an.',
      turns: [
        { s: 'Schmitt, guten Tag.', a: 'Guten Tag, Herr Schmitt. Hier ist Nowak aus der Lindenstraße 12, zweiter Stock.', n: 'Name und Adresse nennen – dann weiß der Vermieter sofort Bescheid.',
          w: [['r', 'Hey, hier ist Nowak. Du musst sofort kommen!', 'Moment mal! Wir sind doch per Sie. Und worum geht es überhaupt?', 'Mit dem Vermieter sprichst du mit „Sie“. Stell dich zuerst vor: Name und Adresse.'],
              ['o', 'Guten Tag, ich möchte eine Wohnung mieten.', 'Eine Wohnung? Ich habe leider gerade keine frei. Oder wohnen Sie schon bei mir?', 'Du wohnst schon in der Wohnung und willst einen Schaden melden. Stell dich als Mieter vor.']] },
        { s: 'Ach ja, guten Tag! Was kann ich für Sie tun?', a: 'Ich möchte einen Schaden melden. Im Bad ist das Rohr unter dem Waschbecken undicht.',
          w: [['g', 'Ich will melden einen Schaden. Das Rohr im Bad kaputt.', 'Entschuldigung, wie bitte? Was ist mit dem Rohr?', 'Der Infinitiv steht am Ende: „Ich möchte einen Schaden melden.“ Und das Verb fehlt: „Das Rohr ist kaputt.“'],
              ['o', 'Ich möchte fragen, wann die Müllabfuhr kommt.', 'Die Müllabfuhr kommt immer dienstags. Aber Sie klingen besorgt – ist etwas passiert?', 'Du rufst wegen des Schadens an. Sag das gleich am Anfang.']] },
        { s: 'Oh nein. Seit wann ist das so?', a: 'Seit gestern Abend. Jetzt ist schon Wasser auf dem Boden.',
          w: [['r', 'Keine Ahnung, ist doch egal. Kommen Sie halt!', 'Bitte bleiben Sie höflich. Ich möchte Ihnen ja helfen. Seit wann tropft es denn?', 'Auch wenn du dich ärgerst: Bleib sachlich und beantworte die Frage.'],
              ['o', 'Ich wohne seit fünf Jahren hier.', 'Das weiß ich doch. Ich meine: Seit wann ist das Rohr undicht?', '„Seit wann?“ fragt hier nach dem Problem, nicht nach deiner Wohnzeit.']] },
        { s: 'Haben Sie das Wasser schon abgestellt?', a: 'Ja, ich habe das Ventil zugedreht und das Wasser aufgewischt.',
          w: [['g', 'Ja, ich habe das Wasser abgestellen.', 'Wie bitte? Haben Sie es abgestellt?', 'Das Partizip II von „abstellen“ heißt „abgestellt“: „Ich habe das Wasser abgestellt.“'],
              ['o', 'Nein, ich trinke lieber Tee.', 'Ähm … ich meine das Wasser im Bad. Haben Sie das Ventil zugedreht?', '„Das Wasser abstellen“ heißt: das Wasser zudrehen, damit nichts mehr fließt.']] },
        { s: 'Sehr gut. Ich schicke Ihnen einen Handwerker. Wann sind Sie zu Hause?', a: 'Morgen bin ich den ganzen Vormittag zu Hause. Passt das?',
          w: [['r', 'Immer. Aber der soll sich beeilen, klar?', 'Bitte etwas freundlicher. Der Handwerker tut sein Bestes. Wann genau sind Sie da?', 'Nenne eine konkrete Zeit und bleib freundlich.'],
              ['g', 'Morgen ich bin den ganzen Vormittag zu Hause.', 'Entschuldigung, wann sind Sie zu Hause?', 'Das Verb steht an Position 2: „Morgen bin ich … zu Hause.“']] },
        { s: 'Ja, das passt. Der Handwerker kommt morgen zwischen 9 und 12 Uhr.', a: 'Prima, danke! Muss ich die Reparatur bezahlen?', n: 'Nachfragen ist gut: Wer zahlt die Reparatur?',
          w: [['o', 'Ich habe morgen Geburtstag.', 'Oh, herzlichen Glückwunsch! Aber passt Ihnen die Zeit von 9 bis 12 Uhr?', 'Reagiere auf die Information: Passt dir die Zeit?'],
              ['r', 'Zwischen 9 und 12? Ich habe Besseres zu tun!', 'Na hören Sie mal! Genauer kann ich es leider nicht sagen.', 'Wenn dir etwas nicht passt, sag es höflich: „Geht es vielleicht etwas genauer?“']] },
        { s: 'Nein, keine Sorge. Die Kosten übernehme ich als Vermieter.', a: 'Vielen Dank für Ihre schnelle Hilfe. Auf Wiederhören!',
          w: [['g', 'Vielen Dank für Ihre schnell Hilfe.', 'Bitte? Ich habe Sie nicht ganz verstanden.', 'Das Adjektiv braucht eine Endung: „für Ihre schnelle Hilfe“.'],
              ['r', 'Na, das will ich auch hoffen. Tschüss.', 'Hm. Ein bisschen Dankbarkeit wäre schön.', 'Der Vermieter hilft dir schnell – bedanke dich: „Vielen Dank für Ihre schnelle Hilfe!“']] }
      ],
      end: 'Gern geschehen. Auf Wiederhören!' },

    { id: 'jobcenter', label: '🏢 Termin im Jobcenter verschieben', where: '📞 Telefon',
      p: { name: 'Frau Weber', full: 'Petra Weber', role: 'Servicecenter · Jobcenter', voice: 'f2', color: '#9333ea' },
      sit: 'Du hast am Donnerstag einen Termin im Jobcenter. An dem Tag hast du aber ein Vorstellungsgespräch. Du rufst an.',
      turns: [
        { s: 'Jobcenter, Servicecenter, mein Name ist Weber. Was kann ich für Sie tun?', a: 'Guten Tag! Ich habe am Donnerstag um 10 Uhr einen Termin bei Herrn Krause und möchte ihn gern verschieben.', n: 'Termin genau nennen: Tag, Uhrzeit, bei wem.',
          w: [['r', 'Ich komm Donnerstag nicht. Mach mir einen neuen Termin.', 'Bitte etwas höflicher. Worum geht es genau?', 'Beim Amt sprichst du mit „Sie“ und höflich: „Ich möchte den Termin gern verschieben.“'],
              ['o', 'Guten Tag, ich suche eine Arbeit als Koch.', 'Dafür ist Ihr Arbeitsvermittler zuständig. Haben Sie schon einen Termin bei uns?', 'Du rufst an, weil du einen Termin verschieben möchtest. Sag das gleich am Anfang.']] },
        { s: 'Darf ich fragen, warum?', a: 'Ich habe an dem Tag ein Vorstellungsgespräch.', n: 'Beim Jobcenter brauchst du einen wichtigen Grund.',
          w: [['g', 'Weil ich habe an dem Tag ein Vorstellungsgespräch.', 'Entschuldigung, können Sie das bitte noch einmal sagen?', 'Nach „weil“ steht das Verb am Ende: „…, weil ich an dem Tag ein Vorstellungsgespräch habe.“ Oder einfach ohne „weil“.'],
              ['r', 'Nein, das dürfen Sie nicht.', 'Ich muss den Grund leider notieren. Ohne wichtigen Grund kann ich den Termin nicht verschieben.', 'Das Jobcenter braucht einen wichtigen Grund, zum Beispiel ein Vorstellungsgespräch oder eine Krankheit.']] },
        { s: 'Ein Vorstellungsgespräch ist natürlich ein wichtiger Grund. Wie ist Ihre Kundennummer?', a: 'Einen Moment, bitte … Meine Kundennummer ist 345D123456.',
          w: [['o', 'Meine Hausnummer ist 12.', 'Nicht die Hausnummer – die Kundennummer. Sie steht oben auf jedem Brief vom Jobcenter.', 'Die Kundennummer steht auf allen Briefen vom Jobcenter.'],
              ['g', 'Ich weiß nicht, aber ich suchen.', 'Wie bitte? Haben Sie die Nummer oder nicht?', 'Richtig ist „ich suche“. Noch besser: „Einen Moment, bitte, ich schaue nach.“']] },
        { s: 'Danke. Herr Krause hat am Montag um 9 Uhr oder am Dienstag um 14 Uhr Zeit.', a: 'Dienstag um 14 Uhr passt mir besser.',
          w: [['r', 'Montag? Nee, da schlaf ich lange.', 'Hm. Dann vielleicht Dienstag um 14 Uhr?', 'Das ist zu locker für ein Amt. Wähl einfach höflich: „Dienstag um 14 Uhr passt mir besser.“'],
              ['g', 'Ich nehme der Termin am Dienstag.', 'Den Termin am Dienstag? Habe ich Sie richtig verstanden?', '„nehmen“ braucht den Akkusativ: „Ich nehme den Termin am Dienstag.“']] },
        { s: 'Gut, dann trage ich Sie für Dienstag um 14 Uhr ein. Sie bekommen noch eine schriftliche Einladung.', a: 'Vielen Dank. Muss ich etwas mitbringen?',
          w: [['g', 'Vielen Dank. Muss ich etwas mitzubringen?', 'Entschuldigung, wie bitte?', 'Nach Modalverben steht der Infinitiv ohne „zu“: „Muss ich etwas mitbringen?“'],
              ['o', 'Gut, dann schreibe ich Ihnen einen Brief.', 'Nein, nein, wir schicken Ihnen die Einladung per Post. Haben Sie noch eine Frage?', '„Sie bekommen eine Einladung“ heißt: Das Jobcenter schreibt dir. Du musst keinen Brief schreiben.']] },
        { s: 'Bringen Sie bitte Ihren Ausweis und Ihren Lebenslauf mit.', a: 'In Ordnung, das mache ich. Die Einladung zum Vorstellungsgespräch schicke ich Ihnen heute noch.', n: 'Den wichtigen Grund kann man mit der Einladung belegen.',
          w: [['r', 'Schon wieder Papiere? Das nervt echt.', 'Ich verstehe, aber wir brauchen die Unterlagen. Bitte bringen Sie sie mit.', 'Bleib freundlich und bestätige: „In Ordnung, das mache ich.“'],
              ['o', 'Ja, ich laufe jeden Morgen.', 'Ähm … ich meine Ihren Lebenslauf, also Ihre Bewerbungsunterlagen.', 'Der Lebenslauf ist ein Dokument über deine Schule, Ausbildung und Arbeit – kein Sport.']] },
        { s: 'Haben Sie sonst noch Fragen?', a: 'Nein, danke. Sie haben mir sehr geholfen. Auf Wiederhören!',
          w: [['g', 'Nein, danke. Sie haben mich sehr geholfen.', 'Entschuldigung, wie meinen Sie das?', '„helfen“ steht mit Dativ: „Sie haben mir geholfen.“'],
              ['r', 'Nö. Tschau.', 'Hm … Also keine Fragen mehr?', 'Am Telefon mit dem Amt: „Nein, danke. Auf Wiederhören!“']] }
      ],
      end: 'Gern geschehen. Viel Erfolg beim Vorstellungsgespräch! Auf Wiederhören.' },

    { id: 'baecker', label: '🥖 In der Bäckerei reklamieren', where: '🏪 Im Geschäft',
      p: { name: 'Herr Wagner', full: 'Jonas Wagner', role: 'Verkäufer · Bäckerei', voice: 'm2', color: '#b45309' },
      sit: 'Du hast gestern in der Bäckerei ein Brot gekauft. Heute ist es schimmelig. Du gehst mit dem Brot und dem Kassenbon zurück.',
      turns: [
        { s: 'Guten Morgen! Was darf es sein?', a: 'Guten Morgen! Ich habe gestern hier ein Brot gekauft, und leider ist es schimmelig.', n: 'Freundlich bleiben und das Problem klar beschreiben.',
          w: [['r', 'Ihr Brot ist Müll! Das ist eine Frechheit!', 'Bitte bleiben Sie höflich. Was ist denn mit dem Brot?', 'Bei einer Reklamation bleibst du freundlich und beschreibst das Problem sachlich.'],
              ['o', 'Zwei Brötchen, bitte.', 'Gern. Aber Sie haben da eine Tüte in der Hand – ist etwas nicht in Ordnung?', 'Du willst reklamieren. Sag gleich, was das Problem ist.']] },
        { s: 'Oh, das tut mir leid. Darf ich mal sehen?', a: 'Ja, natürlich. Hier, unten ist alles grün.',
          w: [['g', 'Ja, hier. Das Brot ist schon schimmeln.', 'Wie bitte? Ist es schimmelig?', '„schimmeln“ ist ein Verb. Nach „ist“ brauchst du das Adjektiv: „Das Brot ist schimmelig.“'],
              ['r', 'Nein, das ist meine Tüte.', 'Aber ich muss das Brot sehen, wenn Sie es reklamieren möchten.', 'Der Verkäufer muss das Problem sehen. Zeig ihm das Brot.']] },
        { s: 'Stimmt, das ist wirklich schimmelig. Haben Sie den Kassenbon dabei?', a: 'Ja, hier ist der Kassenbon von gestern.',
          w: [['r', 'Bon? Glaubst du, ich lüge?', 'Nein, nein, ich brauche den Bon nur für die Kasse. Bitte bleiben Sie freundlich.', 'Den Verkäufer siezt du. Der Kassenbon ist normal bei einer Reklamation – gib ihn einfach.'],
              ['o', 'Ja, ich kaufe hier jeden Tag ein.', 'Das freut mich. Aber haben Sie den Bon von gestern dabei?', 'Der Kassenbon ist der Zettel von der Kasse. Er zeigt, dass du das Brot hier gekauft hast.']] },
        { s: 'Danke. Möchten Sie ein neues Brot oder lieber Ihr Geld zurück?', a: 'Ich hätte gern mein Geld zurück, bitte.', n: '„Ich hätte gern …“ ist höflich und klar.',
          w: [['o', 'Ja, gern.', 'Ja – was denn? Ein neues Brot oder das Geld?', 'Bei einer Frage mit „oder“ reicht „Ja“ nicht. Sag, was du möchtest.'],
              ['g', 'Ich möchte mein Geld zurück bekommt.', 'Entschuldigung, was möchten Sie?', 'Nach „möchte“ steht der Infinitiv am Ende: „Ich möchte mein Geld zurückbekommen.“']] },
        { s: 'Natürlich. Hier sind Ihre drei Euro achtzig. Es tut mir wirklich leid.', a: 'Danke schön. Das kann ja mal passieren.',
          w: [['r', 'Leid tun reicht nicht. Ich will sofort den Chef sprechen!', 'Der Chef ist gerade nicht da. Ich habe Ihnen doch das Geld zurückgegeben.', 'Das Problem ist gelöst. Bedanke dich und bleib freundlich.'],
              ['g', 'Danke schön. Das kann ja mal passiert.', 'Wie bitte?', 'Nach „kann“ steht der Infinitiv: „Das kann ja mal passieren.“']] },
        { s: 'Darf ich Ihnen als Entschuldigung ein Croissant schenken?', a: 'Oh, das ist sehr nett von Ihnen. Vielen Dank!',
          w: [['o', 'Nein, ich habe kein Geld mehr dabei.', 'Sie müssen nichts bezahlen – das Croissant ist ein Geschenk!', '„schenken“ heißt: etwas kostenlos geben. Bedanke dich einfach: „Das ist sehr nett von Ihnen!“'],
              ['r', 'Ein Croissant? Mehr nicht?', 'Ähm … Es ist nur eine kleine Entschuldigung. Möchten Sie es?', 'Ein Geschenk nimmt man mit Dank an.']] },
        { s: 'Gern geschehen. Einen schönen Tag noch!', a: 'Danke, Ihnen auch! Auf Wiedersehen!', n: '„Danke, Ihnen auch!“ ist die feste Antwort auf gute Wünsche.',
          w: [['o', 'Auf Wiederhören!', 'Wir telefonieren doch nicht! Hier sagt man: Auf Wiedersehen.', '„Auf Wiederhören“ sagt man nur am Telefon. Im Geschäft: „Auf Wiedersehen!“'],
              ['g', 'Danke, für Sie auch!', 'Bitte?', 'Die feste Antwort ist: „Danke, Ihnen auch!“ (Dativ).']] }
      ],
      end: 'Auf Wiedersehen!' },

    { id: 'feier', label: '🎉 Mit einer Kollegin eine Feier planen', where: '☕ Pause',
      p: { name: 'Anna', full: 'Anna Berger', role: 'Kollegin', voice: 'f3', color: '#db2777' },
      sit: 'Eure Kollegin Maria geht in Rente. Du planst mit deiner Kollegin Anna eine kleine Abschiedsfeier – wie im DTZ, Sprechen Teil 3: Vorschlag, Gegenvorschlag, Einigung. Unter Kollegen sagt ihr „du“.',
      turns: [
        { s: 'Du, Maria geht doch nächsten Monat in Rente. Wollen wir zusammen eine kleine Abschiedsfeier für sie planen?', a: 'Ja, gute Idee! Wann wollen wir feiern?', n: 'Zustimmen und gleich eine Frage stellen – so bleibt das Gespräch lebendig.',
          w: [['r', 'Keine Lust. Mach du das.', 'Schade. Ich dachte, wir machen das zusammen. Maria hat uns doch immer geholfen.', 'Im DTZ (Teil 3) plant ihr gemeinsam. Zeig Interesse: „Gute Idee!“'],
              ['o', 'Ja, ich fahre auch bald in den Urlaub.', 'Schön für dich! Aber hast du Lust, die Feier mit mir zu planen?', 'Es geht um die Feier für Maria. Bleib beim Thema.']] },
        { s: 'Ich schlage vor, wir feiern am Freitag nach der Arbeit. Was meinst du?', a: 'Am Freitag kann ich leider nicht. Wie wäre es mit Donnerstag?', n: 'Gegenvorschlag: „Wie wäre es mit …?“',
          w: [['g', 'Freitag ich kann leider nicht. Wie wäre es mit Donnerstag?', 'Wie bitte? Kannst du am Freitag oder nicht?', 'Das Verb steht an Position 2: „Am Freitag kann ich leider nicht.“'],
              ['r', 'Freitag? So ein Quatsch!', 'Hey, das war nur ein Vorschlag. Hast du eine bessere Idee?', 'Einen Vorschlag lehnst du freundlich ab und machst einen Gegenvorschlag: „Wie wäre es mit …?“']] },
        { s: 'Donnerstag geht auch. Und wo feiern wir? Vielleicht in einem Restaurant?', a: 'Ein Restaurant ist ziemlich teuer. Wir könnten doch im Pausenraum feiern.', n: 'Begründen und Alternative nennen: „Wir könnten doch …“',
          w: [['o', 'Ich esse gern Pizza.', 'Ich auch! Aber was meinst du: Restaurant oder lieber hier in der Firma?', 'Die Frage war: Wo feiern wir? Nenne einen Ort.'],
              ['r', 'Restaurant? Bist du verrückt? Viel zu teuer!', 'Okay, okay … Was schlägst du denn vor?', 'Kritik kannst du freundlich sagen: „Ein Restaurant ist ziemlich teuer. Wir könnten doch …“']] },
        { s: 'Stimmt, der Pausenraum ist eine gute Idee. Und was machen wir mit dem Essen?', a: 'Jeder bringt etwas mit, zum Beispiel einen Salat oder einen Kuchen.',
          w: [['g', 'Jeder bringen etwas mit, zum Beispiel Salat oder Kuchen.', 'Wie meinst du das? Alle zusammen?', '„jeder“ ist Singular: „Jeder bringt etwas mit.“'],
              ['o', 'Ich habe heute schon gegessen.', 'Ich meine doch für die Feier! Wer kümmert sich um das Essen?', 'Es geht um das Essen für die Feier, nicht um dein Mittagessen.']] },
        { s: 'Super! Ich backe einen Kuchen. Und was schenken wir Maria?', a: 'Maria arbeitet gern im Garten. Wir könnten ihr einen Gutschein für ein Gartencenter schenken.',
          w: [['r', 'Ein Geschenk? Die bekommt doch jetzt Rente.', 'Hey, das ist nicht nett! Maria war zwanzig Jahre bei uns.', 'Mach einen freundlichen Vorschlag und begründe ihn.'],
              ['g', 'Wir könnten sie einen Gutschein schenken.', 'Wem? Entschuldige, das habe ich nicht richtig verstanden.', '„schenken“: die Person steht im Dativ: „Wir könnten ihr einen Gutschein schenken.“']] },
        { s: 'Das ist eine schöne Idee! Wer sammelt das Geld bei den Kollegen ein?', a: 'Das kann ich machen. Ich frage morgen alle.', n: 'Aufgaben teilen: „Das kann ich machen.“',
          w: [['r', 'Du natürlich. Ich habe keine Zeit für so was.', 'Hm, ich backe doch schon den Kuchen … Kannst du nicht das Geld einsammeln?', 'Teilt die Aufgaben fair auf. Biete selbst etwas an: „Das kann ich machen.“'],
              ['o', 'Ich habe leider kein Kleingeld.', 'Das macht nichts. Ich meine: Wer von uns beiden sammelt das Geld ein?', 'Die Frage ist, wer die Aufgabe übernimmt – nicht, ob du Geld dabeihast.']] },
        { s: 'Perfekt. Also: Donnerstag im Pausenraum, jeder bringt etwas mit, und du sammelst das Geld ein. Einverstanden?', a: 'Ja, einverstanden! Dann machen wir das so.', n: 'Einigung: „Einverstanden! Dann machen wir das so.“',
          w: [['g', 'Ja, ich bin einverstehen.', 'Bist du jetzt einverstanden oder nicht?', 'Das Wort heißt „einverstanden“: „Ich bin einverstanden.“'],
              ['o', 'Nein, am Donnerstag habe ich Spätschicht.', 'Aber wir haben doch gerade Donnerstag ausgemacht! Also, einverstanden?', 'Am Ende fasst ihr zusammen und einigt euch: „Einverstanden, dann machen wir das so.“']] }
      ],
      end: 'Super! Maria wird sich bestimmt sehr freuen.' },

    { id: 'kita', label: '🧸 Kita: Kind krankmelden', where: '📞 Telefon',
      p: { name: 'Frau Hoffmann', full: 'Julia Hoffmann', role: 'Erzieherin · Kita Sonnenschein', voice: 'f1', color: '#16a34a' },
      sit: 'Deine Tochter Leyla hat Fieber und kann heute nicht in die Kita. Du rufst morgens in der Kita an.',
      turns: [
        { s: 'Kita Sonnenschein, Hoffmann am Apparat. Guten Morgen!', a: 'Guten Morgen, hier ist Nowak. Ich rufe wegen meiner Tochter Leyla aus der Bärengruppe an.', n: 'Name, Kind und Gruppe nennen.',
          w: [['r', 'Hallo. Leyla kommt heute nicht. Tschüss!', 'Moment, bitte nicht gleich auflegen! Wer spricht denn da, und was ist mit Leyla?', 'Stell dich zuerst vor und sag, warum du anrufst. Nicht einfach auflegen.'],
              ['o', 'Guten Morgen, ich möchte mein Kind in der Kita anmelden.', 'Für Anmeldungen ist die Leitung zuständig. Oder geht Ihr Kind schon zu uns?', 'Leyla geht schon in die Kita. Du willst sie krankmelden.']] },
        { s: 'Guten Morgen! Was ist denn los?', a: 'Leyla ist krank. Sie hat seit heute Nacht Fieber und kann leider nicht kommen.',
          w: [['g', 'Leyla hat Fieber, deshalb sie kann nicht kommen.', 'Entschuldigung, wie bitte? Kommt Leyla heute nicht?', 'Nach „deshalb“ kommt sofort das Verb: „deshalb kann sie nicht kommen“.'],
              ['o', 'Leyla hat heute Geburtstag.', 'Oh, wie schön! Aber Sie klingen besorgt. Ist alles in Ordnung?', 'Du rufst an, weil Leyla krank ist. Sag das klar.']] },
        { s: 'Oh, die Arme! Waren Sie schon beim Kinderarzt?', a: 'Nein, noch nicht. Wir haben heute um elf Uhr einen Termin.',
          w: [['r', 'Das geht dich nichts an.', 'Ich frage nur, weil gerade einige Kinder krank sind. Bitte bleiben Sie freundlich.', 'Die Erzieherin siezt du. Sie fragt, weil sie sich um alle Kinder kümmert.'],
              ['g', 'Nein, noch nicht. Wir haben um elf Uhr ein Termin.', 'Wann, sagen Sie? Um elf?', '„der Termin“ – im Akkusativ: „einen Termin“.']] },
        { s: 'Gut. Bitte sagen Sie uns Bescheid, wenn es etwas Ansteckendes ist.', a: 'Ja, natürlich. Ich rufe Sie nach dem Arztbesuch an.',
          w: [['o', 'Aber ich habe keinen Bescheid bekommen.', 'Nein, „Bescheid sagen“ heißt: Sie informieren uns. Rufen Sie uns bitte an, ja?', '„Bescheid sagen“ heißt: jemanden informieren. Ein „Bescheid“ ist dagegen ein Brief vom Amt.'],
              ['g', 'Ja, natürlich. Ich anrufe Sie nach dem Arzt.', 'Bitte? Sie rufen uns an?', '„anrufen“ ist trennbar: „Ich rufe Sie an.“']] },
        { s: 'Danke. Wie lange bleibt Leyla wohl zu Hause?', a: 'Das weiß ich noch nicht genau. Wahrscheinlich bis Freitag.', n: 'Unsicherheit ausdrücken: „Das weiß ich noch nicht genau.“',
          w: [['r', 'Woher soll ich das wissen?', 'Natürlich wissen Sie das noch nicht genau. Ich frage nur für unsere Planung.', 'Freundlicher: „Das weiß ich noch nicht genau. Wahrscheinlich …“'],
              ['o', 'Wir wohnen schon drei Jahre hier.', 'Ich meine: Wie viele Tage bleibt Leyla zu Hause?', 'Die Frage ist, wie viele Tage Leyla nicht in die Kita kommt.']] },
        { s: 'Kein Problem. Übrigens: Am Mittwoch ist Elternabend. Kommen Sie trotzdem?', a: 'Wenn Leyla wieder gesund ist, komme ich gern. Sonst sage ich Ihnen Bescheid.',
          w: [['g', 'Wenn Leyla ist wieder gesund, ich komme gern.', 'Entschuldigung, das habe ich nicht ganz verstanden. Kommen Sie am Mittwoch?', 'Im Nebensatz mit „wenn“ steht das Verb am Ende, dann folgt das Verb vom Hauptsatz: „Wenn Leyla gesund ist, komme ich gern.“'],
              ['o', 'Ja, Leyla isst abends immer gern.', 'Ach so, nein: Der Elternabend ist ein Treffen für alle Eltern hier in der Kita.', 'Elternabend = ein Treffen der Eltern mit den Erzieherinnen, meistens abends in der Kita.']] },
        { s: 'Prima. Dann gute Besserung für Leyla!', a: 'Vielen Dank, das richte ich ihr aus. Auf Wiederhören!',
          w: [['o', 'Danke, Ihnen auch gute Besserung!', 'Ich bin doch gar nicht krank! Aber danke.', '„Gute Besserung“ wünscht man nur Kranken. Antworte: „Danke, das richte ich ihr aus.“'],
              ['g', 'Danke, ich sage sie das.', 'Bitte? Das habe ich jetzt nicht verstanden.', '„sagen“: die Person steht im Dativ: „Ich sage es ihr.“']] }
      ],
      end: 'Gern. Auf Wiederhören!' }
  ];

  const KIND = { g: 'Grammatikfehler.', r: 'Nicht höflich genug.', o: 'Das passt nicht zum Gespräch.' };
  const ini = full => full.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();

  DMGame.register({
    id: ID, title: 'Dialog-Simulator', icon: '💬', level: 'A2–B1',
    desc: 'Telefonieren, reklamieren, planen: Wähle die passende Antwort im Alltagsgespräch.',
    intro: 'Du führst ein Gespräch wie im echten Leben. Das Gegenüber spricht – du wählst die passende Antwort: höflich, richtig und zum Thema. Für jede Antwort, die beim ersten Versuch passt, gibt es einen Punkt.',
    optionsLabel: 'Situation',
    options: SC.map(s => ({ id: s.id, label: s.label })),
    tts: () => SC.flatMap(s => [...s.turns.flatMap(t => [t.s, ...t.w.map(w => w[2])]), s.end].map(text => ({ text, voice: s.p.voice }))),
    start(api, opt) {
      if (!document.getElementById('sp-dialog-css')) document.head.insertAdjacentHTML('beforeend', `<style id="sp-dialog-css">${CSS}</style>`);
      const sc = SC.find(s => s.id === opt) || SC[0], P = sc.p, N = sc.turns.length, e = api.esc;
      let t = 0, score = 0, firstTry = true, timer = null;
      const wrong = [];
      const av = sm => `<span class="sp-dialog-av${sm ? ' is-sm' : ''}" style="background:${P.color}" aria-hidden="true">${e(ini(P.full))}</span>`;
      api.el.innerHTML = `
        <div class="sp-dialog-head">${av()}<div><b>${e(P.name)}</b><small>${e(P.role)}</small></div><span class="sp-dialog-where">${e(sc.where)}</span></div>
        <p class="sp-dialog-sit">${e(sc.sit)}</p>
        <div class="sp-dialog-chat" role="log" aria-label="Gespräch"></div>
        <p class="ch-label">Deine Antwort:</p>
        <div class="sp-dialog-bottom"></div>`;
      const chat = api.el.querySelector('.sp-dialog-chat'), bottom = api.el.querySelector('.sp-dialog-bottom'), label = api.el.querySelector('.ch-label');
      const down = () => { chat.scrollTop = chat.scrollHeight; };
      const add = html => { chat.insertAdjacentHTML('beforeend', html); down(); return chat.lastElementChild; };
      const alive = () => document.body.contains(chat);
      /* Handy: Gespräch und Antworten zusammen im Blick behalten */
      const frame = () => {
        if (innerWidth > 700) return;
        const top = chat.getBoundingClientRect().top, head = document.querySelector('header')?.getBoundingClientRect().bottom || 0;
        if (Math.abs(top - head - 8) > 24) window.scrollBy({ top: top - head - 8, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
      };
      chat.addEventListener('click', ev => { const b = ev.target.closest('.sp-dialog-say'); if (b) api.speak(b.dataset.line); });

      function them(text, cb) {
        const typing = add(`<div class="sp-dialog-msg sp-dialog-typing" aria-hidden="true">${av(true)}<div class="sp-dialog-b"><i></i><i></i><i></i></div></div>`);
        clearTimeout(timer);
        timer = setTimeout(() => {
          if (!alive()) return;
          typing.remove();
          add(`<div class="sp-dialog-msg is-them">${av(true)}<div class="sp-dialog-b"><p><span class="dm-sr">${e(P.name)}: </span>${e(text)}</p><button type="button" class="sp-dialog-say" data-line="${e(text)}" aria-label="Noch einmal anhören">🔊</button></div></div>`);
          api.speak(text);
          cb?.();
        }, 700);
      }
      const me = (text, ok) => add(`<div class="sp-dialog-msg is-me ${ok ? 'is-ok' : 'is-bad'}"><div class="sp-dialog-b"><p><span class="dm-sr">Du${ok ? '' : ' (passt nicht)'}: </span>${e(text)}</p></div></div>`);
      const wait = () => { bottom.innerHTML = '<p class="sp-dialog-wait">… hör zu …</p>'; };

      function turn() {
        const T = sc.turns[t];
        firstTry = true;
        api.hud({ progress: t / N, step: `${t + 1}/${N}`, score });
        wait();
        them(T.s, () => options(T));
      }
      function options(T) {
        const opts = api.shuffle([{ ok: true, text: T.a }, ...T.w.map(([k, text, react, tip]) => ({ k, text, react, tip }))]);
        bottom.innerHTML = `<div class="ch-opts sp-dialog-opts">${opts.map((o, i) => `<button type="button" class="ch-opt" data-k="${i}"><kbd>${i + 1}</kbd><span>${e(o.text)}</span></button>`).join('')}</div>`;
        bottom.querySelectorAll('.ch-opt').forEach((b, i) => { b.onclick = () => choose(T, opts[i], b); });
        frame();
      }
      function choose(T, o, btn) {
        if (o.ok) {
          bottom.querySelectorAll('.ch-opt').forEach(b => { b.disabled = true; });
          btn.classList.add('is-right');
          me(o.text, true);
          if (firstTry) score++;
          api.hud({ score, progress: (t + 1) / N });
          api.feedback(true, `<b>${firstTry ? 'Genau!' : 'Jetzt passt es!'}</b>${T.n ? ` <span>${e(T.n)}</span>` : ''}`);
          t++;
          setTimeout(() => { if (!alive()) return; t < N ? turn() : end(); }, 650);
        } else {
          btn.disabled = true; btn.classList.add('is-wrong');
          if (firstTry) wrong.push({ correct: T.a, tip: o.tip });
          firstTry = false;
          me(o.text, false);
          api.feedback(false, `<b>${KIND[o.k]}</b> <span>${e(o.tip)}</span>`);
          bottom.querySelectorAll('.ch-opt').forEach(b => { b.disabled = true; });
          them(o.react, () => bottom.querySelectorAll('.ch-opt:not(.is-wrong)').forEach(b => { b.disabled = false; }));
        }
      }
      function end() {
        wait();
        them(sc.end, () => {
          label.hidden = true;
          api.clearFeedback();
          bottom.innerHTML = `<section class="sp-dialog-rm"><h2>Redemittel</h2><p>Diese Sätze helfen dir in solchen Gesprächen:</p><ol>${sc.turns.map(T => `<li><small>${e(P.name)}: ${e(T.s)}</small><b>${e(T.a)}</b></li>`).join('')}</ol></section>`;
          api.hud({ progress: 1, step: `${N}/${N}` });
          api.next('Ergebnis ansehen', () => { clearTimeout(timer); api.finish({ score, max: N, wrong }); });
        });
      }
      turn();
    }
  });
})();
