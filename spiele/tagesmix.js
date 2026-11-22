/* Lernspiel „B2-Tagesmix“ – jeden Tag 5 Aufgaben B1–B2 (Prüfungsniveau DTB/telc), gleich für alle an diesem Datum.
   Ergänzt die Tages-Challenge (#challenge, A1–B1). Eigene Serie: localStorage 'dm-tagesmix'
   { last:'JJJJ-MM-TT', streak, best, doneDates:[letzte 30], day:{ date, score, max, lvl, wrong } }.
   Highscore/Spielanzahl über api.save (spiele.js). Übungsrunden nach dem Tagesmix zählen nicht. */
(() => {
  if (!window.DMGame) return;
  const SAY = []; // no speech in this game

  /* ---------- CSS (einmalig) ---------- */
  if (
    typeof document !== "undefined" &&
    !document.getElementById("sp-tagesmix-css")
  ) {
    const st = document.createElement("style");
    st.id = "sp-tagesmix-css";
    st.textContent = `
.sp-tagesmix.sp-tagesmix-end .sp-hud{display:none}
.sp-tagesmix-tag{display:inline-block;max-width:100%;background:var(--dm-tinte-soft);color:var(--dm-tinte-dark);font-weight:800;font-size:14px;border-radius:99px;padding:3px 12px;margin:0 0 10px;overflow-wrap:anywhere}
.sp-tagesmix-q{font-size:clamp(19px,4.8vw,24px);line-height:1.45;margin:0 0 16px;overflow-wrap:break-word;hyphens:auto;-webkit-hyphens:auto}
.sp-tagesmix-opts .ch-opt{min-height:54px;font-size:17px;min-width:0;overflow-wrap:break-word;hyphens:auto;-webkit-hyphens:auto}
.sp-tagesmix-opts .ch-opt span{min-width:0}
.sp-tagesmix-q .ch-gap.is-bad{color:#c62828;border-color:#c62828}
.sp-tagesmix-res h1{margin-bottom:6px}
.sp-tagesmix-cal{margin:6px 0 4px}
.sp-tagesmix-cal li{padding:4px 0;font-size:12px;min-width:0}
.sp-tagesmix-cal li b{font-size:16px}
.sp-tagesmix-cal li i{display:block;font-style:normal;font-size:13px;line-height:1.2;min-height:1.2em}
.sp-tagesmix-cal-h{margin:14px 0 0;font-weight:700;color:#5b6680;font-size:15px;text-align:left}
.sp-tagesmix-tom{margin:12px 0 0;font-weight:700;color:var(--dm-tinte-dark);font-size:17px}
.sp-tagesmix-hint{margin:10px 0 0;color:#5b6680;font-size:15px}
.sp-tagesmix-res .ch-level{justify-content:center}
.sp-tagesmix-res .ch-level label{min-width:110px}
.sp-tagesmix-res .ch-level span{min-height:44px;padding:10px}
@media (max-width:360px){.sp-tagesmix-cal{gap:4px}.sp-tagesmix-cal li{font-size:11px}.sp-tagesmix-opts .ch-opt{font-size:16px;padding:10px 12px}}
`;
    document.head.appendChild(st);
  }

  /* ---------- Fragen: [Aufgabe (___ = Lücke), richtig, falsch, falsch, Tipp] ---------- */
  const AREAS = {
    konn: "Konnektoren",
    praep: "Verben mit Präpositionen",
    nvv: "Nomen-Verb-Verbindungen",
    passiv: "Passiv und Passiversatz",
    konj: "Konjunktiv II und indirekte Rede",
    rel: "Relativsätze",
    nom: "Nominalstil",
    adj: "Adjektivendungen",
    form: "Formelle Wendungen",
    beruf: "Wortschatz Beruf",
  };
  const RAW = {
    b1: {
      konn: [
        [
          "Ich gehe zur Arbeit, ___ ich erkältet bin.",
          "obwohl",
          "weil",
          "damit",
          "obwohl = Gegengrund; das Verb steht am Ende.",
        ],
        [
          "Ich lerne jeden Tag, ___ ich die Prüfung bestehe.",
          "damit",
          "obwohl",
          "falls",
          "damit = Ziel; das Verb steht am Ende.",
        ],
        [
          "___ Sie Fragen haben, rufen Sie mich bitte an.",
          "Falls",
          "Damit",
          "Obwohl",
          "falls = wenn (Bedingung).",
        ],
        [
          "Es regnete, ___ gingen wir spazieren.",
          "trotzdem",
          "deshalb",
          "obwohl",
          "trotzdem = Gegensatz; danach steht das Verb auf Position 2.",
        ],
        [
          "Er ist krank, ___ bleibt er heute zu Hause.",
          "deshalb",
          "trotzdem",
          "obwohl",
          "deshalb = Folge; danach steht das Verb auf Position 2.",
        ],
        [
          "Ich weiß nicht, ___ der Zug pünktlich ist.",
          "ob",
          "dass",
          "wenn",
          "ob leitet eine indirekte Ja/Nein-Frage ein.",
        ],
        [
          "___ ich nach Deutschland kam, sprach ich kein Deutsch.",
          "Als",
          "Wenn",
          "Wann",
          "als = einmal in der Vergangenheit.",
        ],
        [
          "Ich rufe an, ___ einen Termin zu vereinbaren.",
          "um",
          "damit",
          "weil",
          "um … zu + Infinitiv = Ziel (gleiches Subjekt).",
        ],
        [
          "Er hat die Prüfung bestanden, ___ er wenig gelernt hat.",
          "obwohl",
          "weil",
          "damit",
          "obwohl = das Ergebnis ist überraschend.",
        ],
        [
          "Ich trinke abends keinen Kaffee, ___ ich kann sonst nicht schlafen.",
          "denn",
          "weil",
          "obwohl",
          "denn + normale Wortstellung (Verb auf Position 2).",
        ],
        [
          "Wir warten, ___ die Chefin kommt.",
          "bis",
          "seit",
          "als",
          "bis = Ende eines Zeitraums.",
        ],
      ],
      praep: [
        [
          "Ich interessiere mich ___ die Stelle als Lagerist.",
          "für",
          "an",
          "auf",
          "sich interessieren für + Akkusativ.",
        ],
        [
          "Wir freuen uns ___ Ihre Antwort.",
          "auf",
          "über",
          "an",
          "sich freuen auf = etwas kommt noch (Zukunft).",
        ],
        [
          "Die Nachbarin hat sich ___ den Lärm beschwert.",
          "über",
          "auf",
          "von",
          "sich beschweren über + Akkusativ.",
        ],
        [
          "Das hängt ___ der Situation ab.",
          "von",
          "an",
          "aus",
          "abhängen von + Dativ.",
        ],
        [
          "Ich nehme nächste Woche ___ einer Schulung teil.",
          "an",
          "bei",
          "in",
          "teilnehmen an + Dativ.",
        ],
        [
          "Er bewirbt sich ___ eine Stelle als Koch.",
          "um",
          "für",
          "an",
          "sich bewerben um + Akk. (auch: auf), bei einer Firma.",
        ],
        [
          "Ich bin ___ Ihrem Vorschlag einverstanden.",
          "mit",
          "für",
          "zu",
          "einverstanden sein mit + Dativ.",
        ],
        [
          "Wir warten noch ___ die Lieferung.",
          "auf",
          "für",
          "an",
          "warten auf + Akkusativ.",
        ],
        [
          "Erinnerst du dich ___ den Namen des Kunden?",
          "an",
          "über",
          "auf",
          "sich erinnern an + Akkusativ.",
        ],
        [
          "Ich habe ___ meinem Kollegen über das Problem gesprochen.",
          "mit",
          "zu",
          "an",
          "sprechen mit (Person) über (Thema).",
        ],
        [
          "Frau Yilmaz kümmert sich ___ die neuen Kunden.",
          "um",
          "für",
          "über",
          "sich kümmern um + Akkusativ.",
        ],
      ],
      nvv: [
        [
          "Sie müssen bis Freitag einen Antrag ___.",
          "stellen",
          "machen",
          "geben",
          "einen Antrag stellen = etwas beantragen.",
        ],
        [
          "Wir müssen heute eine Entscheidung ___.",
          "treffen",
          "machen",
          "stellen",
          "eine Entscheidung treffen = entscheiden.",
        ],
        [
          "Darf ich Ihnen eine Frage ___?",
          "stellen",
          "machen",
          "geben",
          "eine Frage stellen = fragen.",
        ],
        [
          "Bitte ___ Sie mir Bescheid, wenn die Ware da ist.",
          "geben",
          "machen",
          "stellen",
          "Bescheid geben = informieren.",
        ],
        [
          "Wir haben mit der Firma einen Vertrag ___.",
          "abgeschlossen",
          "gestellt",
          "getroffen",
          "einen Vertrag abschließen = einen Vertrag machen und unterschreiben.",
        ],
        [
          "Herr Kaya ___ morgen einen Vortrag über Sicherheit.",
          "hält",
          "stellt",
          "trifft",
          "einen Vortrag halten = vor Publikum sprechen.",
        ],
        [
          "Darf ich einen Vorschlag ___?",
          "machen",
          "stellen",
          "treffen",
          "einen Vorschlag machen = etwas vorschlagen.",
        ],
        [
          "Sie hat im Deutschkurs große Fortschritte ___.",
          "gemacht",
          "gestellt",
          "genommen",
          "Fortschritte machen = besser werden.",
        ],
        [
          "Wir sollten auf die Kollegen Rücksicht ___.",
          "nehmen",
          "geben",
          "machen",
          "Rücksicht nehmen auf = an andere denken.",
        ],
        [
          "Bitte ___ Sie Platz, Frau Berger.",
          "nehmen",
          "setzen",
          "stellen",
          "Platz nehmen = sich setzen.",
        ],
        [
          "Ich muss noch einen Termin beim Arzt ___.",
          "vereinbaren",
          "stellen",
          "treffen",
          "einen Termin vereinbaren = einen Termin ausmachen.",
        ],
      ],
      passiv: [
        [
          "Das Paket ___ morgen geliefert.",
          "wird",
          "ist",
          "hat",
          "Passiv Präsens: werden + Partizip II.",
        ],
        [
          "Die Briefe ___ gestern verschickt.",
          "wurden",
          "werden",
          "worden",
          "Passiv Präteritum: wurden + Partizip II.",
        ],
        [
          "Hier ___ nicht geraucht.",
          "wird",
          "ist",
          "hat",
          "Passiv ohne Subjekt: Es wird nicht geraucht.",
        ],
        [
          "Das Gebäude wurde 1990 ___.",
          "gebaut",
          "bauen",
          "baute",
          "Passiv: werden + Partizip II.",
        ],
        [
          "Die Rechnung ist schon bezahlt ___.",
          "worden",
          "geworden",
          "wurde",
          "Passiv Perfekt: ist … worden (nicht geworden).",
        ],
        [
          "Die Fenster müssen heute geputzt ___.",
          "werden",
          "wird",
          "worden",
          "Modalverb + Partizip II + werden.",
        ],
        [
          "Der Vertrag wird ___ Chefin unterschrieben.",
          "von der",
          "bei der",
          "aus der",
          "Im Passiv steht die Person mit von + Dativ.",
        ],
        [
          "Die Besprechung ___ auf Montag verschoben.",
          "wurde",
          "hatte",
          "hat",
          "Passiv Präteritum: wurde + Partizip II.",
        ],
        [
          "In Deutschland ___ viel Brot gegessen.",
          "wird",
          "ist",
          "hat",
          "Passiv Präsens: wird + Partizip II.",
        ],
        [
          "Die neuen Mitarbeiter ___ heute eingearbeitet.",
          "werden",
          "wird",
          "worden",
          "Plural: werden + Partizip II.",
        ],
        [
          "Der Kunde ___ sofort informiert.",
          "wurde",
          "hatte",
          "hat",
          "Passiv Präteritum: wurde + Partizip II.",
        ],
      ],
      konj: [
        [
          "Wenn ich mehr Zeit ___, würde ich einen Kurs machen.",
          "hätte",
          "habe",
          "hatte",
          "Irrealer Wunsch: Konjunktiv II von haben = hätte.",
        ],
        [
          "___ Sie mir bitte helfen?",
          "Könnten",
          "Konnten",
          "Kannten",
          "Höfliche Bitte mit Konjunktiv II: Könnten Sie …?",
        ],
        [
          "Ich ___ gern einen Termin für nächste Woche.",
          "hätte",
          "hatte",
          "habe gehabt",
          "Höflich: Ich hätte gern …",
        ],
        [
          "An deiner Stelle ___ ich zum Arzt gehen.",
          "würde",
          "werde",
          "wurde",
          "Ratschlag: An deiner Stelle würde ich …",
        ],
        [
          "Wenn ich Chef ___, würde ich mehr Homeoffice erlauben.",
          "wäre",
          "bin",
          "war",
          "Konjunktiv II von sein = wäre.",
        ],
        [
          "Du ___ mehr schlafen.",
          "solltest",
          "sollen",
          "gesollt",
          "Ratschlag: du solltest …",
        ],
        [
          "Ich wünschte, ich ___ besser Deutsch sprechen.",
          "könnte",
          "kann",
          "konnte",
          "Irrealer Wunsch: Konjunktiv II (könnte).",
        ],
        [
          "Es wäre schön, wenn du morgen kommen ___.",
          "könntest",
          "konntest",
          "gekonnt",
          "Konjunktiv II von können: du könntest.",
        ],
        [
          "Wenn der Bus pünktlich gewesen ___, wäre ich nicht zu spät gekommen.",
          "wäre",
          "hätte",
          "war",
          "Vergangenheit irreal: wäre/hätte + Partizip II; sein → wäre gewesen.",
        ],
        [
          "Er tut so, als ___ er alles.",
          "wüsste",
          "weiß",
          "wusste",
          "als (ob) + Konjunktiv II.",
        ],
        [
          "Wenn ich das gewusst ___, wäre ich gekommen.",
          "hätte",
          "wäre",
          "habe",
          "wissen → hätte gewusst.",
        ],
      ],
      rel: [
        [
          "Das ist der Kollege, ___ mir geholfen hat.",
          "der",
          "den",
          "dem",
          "Maskulin, Nominativ (wer hat geholfen?): der.",
        ],
        [
          "Das ist die Frau, ___ ich gestern getroffen habe.",
          "die",
          "der",
          "deren",
          "Feminin, Akkusativ: die.",
        ],
        [
          "Der Laptop, ___ ich gekauft habe, ist sehr schnell.",
          "den",
          "der",
          "dem",
          "Maskulin, Akkusativ: den.",
        ],
        [
          "Die Kollegin, ___ ich das Buch gegeben habe, liest viel.",
          "der",
          "die",
          "dem",
          "Feminin, Dativ (wem?): der.",
        ],
        [
          "Das Hotel, in ___ wir gewohnt haben, war schön.",
          "dem",
          "das",
          "der",
          "in + Dativ (wo?), neutral: in dem.",
        ],
        [
          "Die Leute, ___ neben uns wohnen, sind sehr nett.",
          "die",
          "denen",
          "der",
          "Plural, Nominativ: die.",
        ],
        [
          "Der Mann, ___ ich geholfen habe, war dankbar.",
          "dem",
          "den",
          "der",
          "helfen + Dativ, maskulin: dem.",
        ],
        [
          "Das ist das Kind, ___ Mutter Ärztin ist.",
          "dessen",
          "deren",
          "das",
          "Genitiv bei maskulin/neutral: dessen.",
        ],
        [
          "Das ist die Firma, für ___ ich arbeite.",
          "die",
          "der",
          "deren",
          "für + Akkusativ, feminin: für die.",
        ],
        [
          "Ich habe alles, ___ ich brauche.",
          "was",
          "das",
          "welches",
          "Nach alles, nichts, etwas: was.",
        ],
        [
          "Berlin ist die Stadt, ___ ich geboren bin.",
          "wo",
          "wohin",
          "was",
          "Ort (in der): wo.",
        ],
      ],
      nom: [
        [
          "Nomen zu „entscheiden“:",
          "die Entscheidung",
          "die Entscheidheit",
          "die Entscheidschaft",
          "Viele Verben bilden das Nomen mit -ung (immer feminin).",
        ],
        [
          "Nomen zu „ankommen“:",
          "die Ankunft",
          "die Ankommung",
          "das Ankommnis",
          "ankommen → die Ankunft.",
        ],
        [
          "Nomen zu „abfahren“:",
          "die Abfahrt",
          "die Abfahrung",
          "der Abfahr",
          "abfahren → die Abfahrt.",
        ],
        [
          "Nomen zu „sich bewerben“:",
          "die Bewerbung",
          "die Bewerbschaft",
          "der Beworben",
          "sich bewerben → die Bewerbung.",
        ],
        [
          "Nomen zu „kündigen“:",
          "die Kündigung",
          "die Kündigkeit",
          "der Kündiger",
          "kündigen → die Kündigung.",
        ],
        [
          "„Wenn es regnet, fällt das Fest aus.“ = Bei ___ fällt das Fest aus.",
          "Regen",
          "regnen",
          "geregnet",
          "wenn + Verb → bei + Nomen.",
        ],
        [
          "„Weil er krank war, …“ = ___ seiner Krankheit …",
          "Wegen",
          "Trotz",
          "Während",
          "weil → wegen + Genitiv.",
        ],
        [
          "„Obwohl es kalt war, …“ = ___ der Kälte …",
          "Trotz",
          "Wegen",
          "Bei",
          "obwohl → trotz + Genitiv.",
        ],
        [
          "„Nachdem er angekommen war, …“ = ___ seiner Ankunft …",
          "Nach",
          "Vor",
          "Seit",
          "nachdem → nach + Dativ.",
        ],
        [
          "„Bevor die Sitzung beginnt, …“ = ___ Beginn der Sitzung …",
          "Vor",
          "Nach",
          "Bei",
          "bevor → vor + Dativ.",
        ],
        [
          "„Während wir arbeiten, …“ = ___ der Arbeit …",
          "Während",
          "Wegen",
          "Nach",
          "während (Konnektor) → während + Genitiv.",
        ],
      ],
      adj: [
        [
          "Wir suchen einen erfahren___ Mitarbeiter.",
          "erfahrenen",
          "erfahrener",
          "erfahrenes",
          "einen + maskulin Akkusativ: -en.",
        ],
        [
          "Mit freundlich___ Grüßen",
          "freundlichen",
          "freundliche",
          "freundlicher",
          "Dativ Plural ohne Artikel: -en.",
        ],
        [
          "Die neu___ Kollegin heißt Frau Aksoy.",
          "neue",
          "neuen",
          "neuer",
          "Nach die (Nominativ Singular): -e.",
        ],
        [
          "Ich wohne in einer klein___ Wohnung.",
          "kleinen",
          "kleine",
          "kleiner",
          "Nach einer (Dativ): -en.",
        ],
        [
          "Das ist ein interessant___ Angebot.",
          "interessantes",
          "interessante",
          "interessanten",
          "ein + neutral (Nominativ/Akkusativ): -es.",
        ],
        [
          "Ein gut___ Chef hört zu.",
          "guter",
          "gute",
          "guten",
          "ein + maskulin Nominativ: -er.",
        ],
        [
          "Ich trinke gern kalt___ Wasser.",
          "kaltes",
          "kalte",
          "kalten",
          "Ohne Artikel zeigt das Adjektiv den Artikel: das Wasser → kaltes.",
        ],
        [
          "Wir hatten einen lang___ Arbeitstag.",
          "langen",
          "langer",
          "langes",
          "einen + maskulin Akkusativ: -en.",
        ],
        [
          "Die alt___ Computer werden ersetzt.",
          "alten",
          "alte",
          "alter",
          "Plural mit die: -en.",
        ],
        [
          "Neu___ Mitarbeiter bekommen einen Paten.",
          "Neue",
          "Neuen",
          "Neuer",
          "Plural ohne Artikel, Nominativ: -e.",
        ],
        [
          "Mit dem neu___ Programm arbeiten wir schneller.",
          "neuen",
          "neue",
          "neues",
          "Nach dem (Dativ): -en.",
        ],
      ],
      form: [
        [
          "Beginn einer E-Mail an eine Firma (Name unbekannt):",
          "Sehr geehrte Damen und Herren,",
          "Hallo zusammen,",
          "Liebe Firma,",
          "Formell und ohne Namen: Sehr geehrte Damen und Herren,",
        ],
        [
          "Ende eines formellen Briefs:",
          "Mit freundlichen Grüßen",
          "Bis bald!",
          "Liebe Grüße und tschüss",
          "Formell: Mit freundlichen Grüßen",
        ],
        [
          "Anrede im Brief an Herrn Müller:",
          "Sehr geehrter Herr Müller,",
          "Sehr geehrte Herr Müller,",
          "Sehr geehrtes Herr Müller,",
          "Herr → geehrter, Frau → geehrte.",
        ],
        [
          "Am Telefon höflich nachfragen:",
          "Könnten Sie das bitte wiederholen?",
          "Was? Nochmal!",
          "Sag das nochmal.",
          "Höflich: Konjunktiv II + bitte.",
        ],
        [
          "Formell um einen Termin bitten:",
          "Ich würde gern einen Termin vereinbaren.",
          "Ich will sofort einen Termin.",
          "Gib mir einen Termin.",
          "Höflich: Ich würde gern …",
        ],
        [
          "Formell einen Termin verschieben:",
          "Wäre es möglich, den Termin zu verschieben?",
          "Verschieb den Termin!",
          "Termin geht nicht, sorry.",
          "Höflich fragen: Wäre es möglich, … zu …?",
        ],
        [
          "Sich formell entschuldigen:",
          "Bitte entschuldigen Sie die Verspätung.",
          "Sorry, bin spät.",
          "Sorry Leute, der Bus war weg.",
          "Formell: Bitte entschuldigen Sie …",
        ],
        [
          "Formell auf den Anhang hinweisen:",
          "Im Anhang finden Sie meinen Lebenslauf.",
          "Hier ist mein Lebenslauf, guck mal.",
          "Lebenslauf kommt anbei, okay?",
          "Formell: Im Anhang finden Sie …",
        ],
        [
          "Formell um Antwort bitten:",
          "Ich freue mich auf Ihre Rückmeldung.",
          "Meld dich mal!",
          "Schreib schnell zurück!",
          "Formell: Ich freue mich auf Ihre Rückmeldung.",
        ],
        [
          "Am Telefon: Sie möchten mit Frau Kraus sprechen.",
          "Könnten Sie mich bitte mit Frau Kraus verbinden?",
          "Gib mir mal Frau Kraus.",
          "Ist die Kraus da?",
          "Formell: Könnten Sie mich bitte mit … verbinden?",
        ],
        [
          "Formell ein Angebot ablehnen:",
          "Leider muss ich Ihr Angebot ablehnen.",
          "Nö, kein Interesse.",
          "Das will ich nicht.",
          "Formell mit leider: Leider muss ich …",
        ],
      ],
      beruf: [
        [
          "Das Dokument vom Arbeitgeber am Ende eines Arbeitsverhältnisses heißt …",
          "Arbeitszeugnis",
          "Lebenslauf",
          "Anschreiben",
          "Arbeitszeugnis = Bewertung durch den Arbeitgeber.",
        ],
        [
          "Die Zeit am Anfang, in der man leichter kündigen kann:",
          "Probezeit",
          "Elternzeit",
          "Kündigungsfrist",
          "Probezeit = meist die ersten sechs Monate.",
        ],
        [
          "Ein Treffen, um etwas im Team zu besprechen:",
          "Besprechung",
          "Bescheinigung",
          "Bewerbung",
          "Besprechung = Meeting.",
        ],
        [
          "Die gewählte Vertretung der Mitarbeiter in einer Firma:",
          "Betriebsrat",
          "Geschäftsführung",
          "Personalabteilung",
          "Der Betriebsrat vertritt die Arbeitnehmer.",
        ],
        [
          "Bis zu diesem Termin muss die Arbeit fertig sein:",
          "Frist",
          "Pause",
          "Schicht",
          "Frist = letzter Termin.",
        ],
        [
          "Ich bin im Urlaub. Frau Wolf übernimmt meine …",
          "Vertretung",
          "Verwaltung",
          "Verspätung",
          "Vertretung = jemand macht die Arbeit für mich.",
        ],
        [
          "Die Firma beendet den Arbeitsvertrag. Sie erhalten eine …",
          "Kündigung",
          "Beförderung",
          "Einarbeitung",
          "Kündigung = Ende des Vertrags.",
        ],
        [
          "Sie sind krank. Sie schicken Ihrem Arbeitgeber eine …",
          "Krankmeldung",
          "Bewerbung",
          "Abmahnung",
          "Krankmeldung = Bescheinigung vom Arzt.",
        ],
        [
          "Die monatliche Übersicht über Ihren Lohn heißt …",
          "Gehaltsabrechnung",
          "Steuererklärung",
          "Kontoauszug",
          "Gehaltsabrechnung = Lohnzettel.",
        ],
        [
          "Sie arbeiten länger, als im Vertrag steht. Sie machen …",
          "Überstunden",
          "Kurzarbeit",
          "Teilzeit",
          "Überstunden = mehr Stunden als vereinbart.",
        ],
        [
          "Eine freie Stelle wird veröffentlicht in einer …",
          "Stellenanzeige",
          "Stellvertretung",
          "Stellungnahme",
          "Stellenanzeige = Jobangebot.",
        ],
      ],
    },
    b2: {
      konn: [
        [
          "Je mehr man übt, ___ sicherer wird man.",
          "desto",
          "als",
          "wie",
          "je … desto (umso) + Komparativ.",
        ],
        [
          "Er kommt entweder heute ___ morgen.",
          "oder",
          "noch",
          "als",
          "entweder … oder = eins von beiden.",
        ],
        [
          "Sie spricht ___ Englisch als auch Spanisch.",
          "sowohl",
          "weder",
          "entweder",
          "sowohl … als auch = beides.",
        ],
        [
          "Er hat weder Zeit ___ Geld.",
          "noch",
          "oder",
          "und",
          "weder … noch = keins von beiden.",
        ],
        [
          "___ ich gegessen hatte, ging ich ins Büro.",
          "Nachdem",
          "Während",
          "Seitdem",
          "nachdem + Plusquamperfekt (erst essen, dann gehen).",
        ],
        [
          "Das Projekt war gut geplant, ___ es pünktlich fertig wurde.",
          "sodass",
          "damit",
          "obwohl",
          "sodass = Folge.",
        ],
        [
          "___ du bei uns arbeitest, ist das Team viel entspannter.",
          "Seitdem",
          "Nachdem",
          "Bevor",
          "seitdem = von einem Zeitpunkt bis heute.",
        ],
        [
          "Er schrieb eine E-Mail, ___ anzurufen.",
          "anstatt",
          "damit",
          "obwohl",
          "(an)statt … zu = etwas anderes tun.",
        ],
        [
          "Die Kosten sind gestiegen. ___ müssen wir sparen.",
          "Folglich",
          "Obwohl",
          "Falls",
          "folglich = deshalb; danach Verb auf Position 2.",
        ],
        [
          "Ich helfe dir gern, ___ du mir auch hilfst.",
          "sofern",
          "sodass",
          "obwohl",
          "sofern = unter der Bedingung, dass.",
        ],
        [
          "___ er lange gesucht hat, hat er keine Wohnung gefunden.",
          "Obwohl",
          "Weil",
          "Sobald",
          "obwohl = Gegengrund.",
        ],
        [
          "___ die Unterlagen vollständig sind, bearbeiten wir den Antrag.",
          "Sobald",
          "Obwohl",
          "Damit",
          "sobald = direkt wenn.",
        ],
      ],
      praep: [
        [
          "Wir müssen uns ___ das Wesentliche konzentrieren.",
          "auf",
          "an",
          "für",
          "sich konzentrieren auf + Akkusativ.",
        ],
        [
          "Die Firma verzichtet dieses Jahr ___ eine Weihnachtsfeier.",
          "auf",
          "an",
          "über",
          "verzichten auf + Akkusativ.",
        ],
        [
          "Der Erfolg beruht ___ guter Teamarbeit.",
          "auf",
          "an",
          "von",
          "beruhen auf + Dativ.",
        ],
        [
          "Das Team besteht ___ fünf Personen.",
          "aus",
          "von",
          "in",
          "bestehen aus + Dativ = sich zusammensetzen.",
        ],
        [
          "Wir bestehen ___ einer schriftlichen Bestätigung.",
          "auf",
          "aus",
          "an",
          "bestehen auf = unbedingt verlangen.",
        ],
        [
          "Ich habe mich schnell ___ die neue Software gewöhnt.",
          "an",
          "auf",
          "mit",
          "sich gewöhnen an + Akkusativ.",
        ],
        [
          "Die Kollegin hat viel ___ dem Erfolg des Projekts beigetragen.",
          "zu",
          "an",
          "für",
          "beitragen zu + Dativ.",
        ],
        [
          "Er zweifelt ___ der Richtigkeit der Zahlen.",
          "an",
          "über",
          "von",
          "zweifeln an + Dativ.",
        ],
        [
          "Wir haben uns ___ einen neuen Lieferanten entschieden.",
          "für",
          "zu",
          "an",
          "sich entscheiden für + Akkusativ.",
        ],
        [
          "Bitte achten Sie ___ die Sicherheitsvorschriften.",
          "auf",
          "an",
          "für",
          "achten auf + Akkusativ.",
        ],
        [
          "Die Chefin hat sich ___ die Verspätung entschuldigt.",
          "für",
          "über",
          "an",
          "sich entschuldigen für (Sache) / bei (Person).",
        ],
        [
          "Viele Betriebe leiden ___ dem Fachkräftemangel.",
          "unter",
          "an",
          "von",
          "leiden unter (Situation), leiden an (Krankheit).",
        ],
      ],
      nvv: [
        [
          "Das neue Gesetz ___ im Januar in Kraft.",
          "tritt",
          "kommt",
          "geht",
          "in Kraft treten = ab jetzt gelten.",
        ],
        [
          "Wir können Ihnen einen Laptop zur Verfügung ___.",
          "stellen",
          "geben",
          "setzen",
          "zur Verfügung stellen = bereitstellen.",
        ],
        [
          "Das Problem sollten wir im nächsten Meeting zur Sprache ___.",
          "bringen",
          "stellen",
          "nehmen",
          "zur Sprache bringen = ansprechen.",
        ],
        [
          "Ich habe mich mit dem Lieferanten in Verbindung ___.",
          "gesetzt",
          "gestellt",
          "gebracht",
          "sich in Verbindung setzen = Kontakt aufnehmen.",
        ],
        [
          "Am Ende des Projekts ___ die Leiterin Bilanz.",
          "zog",
          "stellte",
          "nahm",
          "Bilanz ziehen = das Ergebnis bewerten.",
        ],
        [
          "Bitte ___ Sie Stellung zu den Vorwürfen.",
          "nehmen",
          "geben",
          "machen",
          "Stellung nehmen = sich äußern.",
        ],
        [
          "Wir müssen die Wünsche der Kunden stärker in Betracht ___.",
          "ziehen",
          "nehmen",
          "stellen",
          "in Betracht ziehen = berücksichtigen.",
        ],
        [
          "Die Firma ___ die Kosten in voller Höhe.",
          "übernimmt",
          "nimmt",
          "stellt",
          "die Kosten übernehmen = bezahlen.",
        ],
        [
          "Wir müssen das Problem endlich in Angriff ___.",
          "nehmen",
          "bringen",
          "setzen",
          "in Angriff nehmen = mit etwas anfangen.",
        ],
        [
          "Die Kollegin hat einen wichtigen Beitrag ___.",
          "geleistet",
          "gemacht",
          "gestellt",
          "einen Beitrag leisten = beitragen.",
        ],
        [
          "Der Kunde ___ scharfe Kritik an unserem Service.",
          "übte",
          "machte",
          "stellte",
          "Kritik üben = kritisieren.",
        ],
        [
          "Wir sollten die Kosten im Auge ___.",
          "behalten",
          "stellen",
          "bringen",
          "im Auge behalten = beobachten.",
        ],
      ],
      passiv: [
        [
          "Das Problem lässt sich leicht ___.",
          "lösen",
          "gelöst",
          "zu lösen",
          "sich lassen + Infinitiv = kann … werden.",
        ],
        [
          "Die Aufgabe ist bis Freitag zu ___.",
          "erledigen",
          "erledigt",
          "erledigend",
          "sein + zu + Infinitiv = muss … werden.",
        ],
        [
          "Die Anleitung ist leicht ___.",
          "verständlich",
          "verstanden",
          "verstehend",
          "-bar/-lich = kann … werden.",
        ],
        [
          "Das Formular muss noch ___ werden.",
          "ausgefüllt",
          "ausfüllen",
          "ausgefüllen",
          "Modalverb + Partizip II + werden.",
        ],
        [
          "Die Ware hätte gestern geliefert werden ___.",
          "sollen",
          "gesollt",
          "soll",
          "Modalverb im Passiv der Vergangenheit: Infinitiv statt Partizip.",
        ],
        [
          "Die Unterlagen ___ bereits geprüft worden.",
          "sind",
          "haben",
          "werden",
          "Perfekt Passiv: sind … worden.",
        ],
        [
          "„Man hat das Büro renoviert.“ = Das Büro ___ renoviert worden.",
          "ist",
          "hat",
          "wird",
          "Perfekt Passiv: ist … worden.",
        ],
        [
          "Diese Regel ___ sich nicht ändern.",
          "lässt",
          "wird",
          "ist",
          "sich lassen + Infinitiv = kann nicht geändert werden.",
        ],
        [
          "Das Gerät ist einfach zu ___.",
          "bedienen",
          "bedient",
          "bedienbar",
          "sein + zu + Infinitiv = kann … werden.",
        ],
        [
          "Nachdem die Daten ___ worden waren, begann die Sitzung.",
          "ausgewertet",
          "auswerten",
          "ausgewerten",
          "Plusquamperfekt Passiv: waren … worden.",
        ],
        [
          "Der Antrag ___ erst morgen bearbeitet werden.",
          "kann",
          "ist",
          "hat",
          "Modalverb + Partizip II + werden.",
        ],
        [
          "Bis Ende Mai wird die Brücke repariert worden ___.",
          "sein",
          "haben",
          "werden",
          "Futur II Passiv: wird … worden sein.",
        ],
      ],
      konj: [
        [
          "Der Chef sagt, er ___ heute keine Zeit.",
          "habe",
          "haben",
          "gehabt",
          "Indirekte Rede: Konjunktiv I (er habe).",
        ],
        [
          "Laut Pressemitteilung ___ das Unternehmen 200 neue Stellen schaffen.",
          "wolle",
          "wollen",
          "gewollt",
          "Indirekte Rede: Konjunktiv I (es wolle).",
        ],
        [
          "Die Sprecherin erklärte, die Verhandlungen ___ erfolgreich gewesen.",
          "seien",
          "sein",
          "gewesen",
          "Konjunktiv I Plural von sein: seien.",
        ],
        [
          "Er fragte, ob ich morgen Zeit ___.",
          "hätte",
          "haben",
          "hattet",
          "„ich habe“ sieht aus wie Indikativ → Ersatz mit Konjunktiv II: hätte.",
        ],
        [
          "Sie sagte, sie ___ morgen später.",
          "komme",
          "kommen",
          "gekommen",
          "Konjunktiv I: sie komme.",
        ],
        [
          "Der Kunde behauptet, er ___ die Rechnung schon bezahlt.",
          "habe",
          "sei",
          "werde",
          "bezahlen → Perfekt mit haben: er habe bezahlt.",
        ],
        [
          "Hätte ich das früher gewusst, ___ ich anders entschieden.",
          "hätte",
          "wäre",
          "würde",
          "entscheiden → hätte entschieden.",
        ],
        [
          "Die Firma ___ beinahe Insolvenz anmelden müssen.",
          "hätte",
          "wäre",
          "würde",
          "Konjunktiv II Vergangenheit mit Modalverb: hätte … müssen.",
        ],
        [
          "Ohne deine Hilfe ___ ich das nie geschafft.",
          "hätte",
          "wäre",
          "habe",
          "schaffen → hätte geschafft.",
        ],
        [
          "Der Minister sagte, man ___ die Steuern senken.",
          "werde",
          "wurde",
          "geworden",
          "Konjunktiv I von werden: man werde.",
        ],
        [
          "Er sprach so, als ___ er der Chef.",
          "wäre",
          "war",
          "gewesen",
          "als (ob) + Konjunktiv II: als wäre er …",
        ],
        [
          "Es wäre besser, wenn wir sofort ___.",
          "handelten",
          "handeln würden haben",
          "gehandelt",
          "Konjunktiv II regelmäßiger Verben = Präteritum-Form (oder würde + Infinitiv).",
        ],
      ],
      rel: [
        [
          "Die Mitarbeiter, ___ wir gekündigt haben, bekommen eine Abfindung.",
          "denen",
          "die",
          "deren",
          "jemandem kündigen (Dativ), Plural: denen.",
        ],
        [
          "Die Kundin, ___ Bestellung verloren ging, beschwerte sich.",
          "deren",
          "dessen",
          "die",
          "Genitiv feminin: deren.",
        ],
        [
          "Der Kollege, mit ___ Hilfe wir es geschafft haben, ist jetzt Teamleiter.",
          "dessen",
          "deren",
          "dem",
          "Genitiv maskulin: dessen.",
        ],
        [
          "Das ist das Beste, ___ ich je gegessen habe.",
          "was",
          "das",
          "welches",
          "Nach einem Superlativ (neutral): was.",
        ],
        [
          "Er hat die Prüfung bestanden, ___ mich sehr freut.",
          "was",
          "das",
          "die",
          "Bezug auf den ganzen Satz: was.",
        ],
        [
          "Das Projekt, an ___ wir arbeiten, ist noch geheim.",
          "dem",
          "das",
          "den",
          "arbeiten an + Dativ: an dem.",
        ],
        [
          "Die Länder, aus ___ unsere Kunden kommen, sind sehr verschieden.",
          "denen",
          "die",
          "deren",
          "aus + Dativ Plural: denen.",
        ],
        [
          "Das ist etwas, ___ ich mich sehr interessiere.",
          "wofür",
          "woran",
          "worauf",
          "sich interessieren für → wofür.",
        ],
        [
          "Die Bewerber, ___ Unterlagen vollständig sind, werden eingeladen.",
          "deren",
          "dessen",
          "denen",
          "Genitiv Plural: deren.",
        ],
        [
          "Der Grund, ___ ich anrufe, ist folgender.",
          "weshalb",
          "wo",
          "was",
          "Grund: weshalb / warum.",
        ],
        [
          "Die Methode, ___ wir arbeiten, ist neu.",
          "nach der",
          "nach dem",
          "nach die",
          "nach + Dativ feminin: nach der.",
        ],
        [
          "Die Stadt, ___ ich gezogen bin, liegt am Meer.",
          "wohin",
          "wo",
          "woher",
          "Richtung (in die): wohin.",
        ],
      ],
      nom: [
        [
          "„Um Kosten zu sparen, …“ = ___ Kosteneinsparung …",
          "Zur",
          "Zum",
          "Beim",
          "um … zu → zu + Nomen; die Einsparung → zur.",
        ],
        [
          "„Wenn man die Regeln nicht beachtet, …“ = Bei ___ der Regeln …",
          "Nichtbeachtung",
          "Nichtbeachtheit",
          "Unbeachtlichkeit",
          "beachten → die Beachtung; verneint: die Nichtbeachtung.",
        ],
        [
          "„Die Firma hat die Preise erhöht.“ = die ___ der Preise",
          "Erhöhung",
          "Erhöhe",
          "Erhöhnis",
          "erhöhen → die Erhöhung.",
        ],
        [
          "Nomen zu „verbessern“:",
          "die Verbesserung",
          "die Verbesserheit",
          "die Verbessernis",
          "verbessern → die Verbesserung.",
        ],
        [
          "Nomen zu „teilnehmen“:",
          "die Teilnahme",
          "die Teilnehmung",
          "das Teilnehmnis",
          "teilnehmen → die Teilnahme.",
        ],
        [
          "Nomen zu „zustimmen“:",
          "die Zustimmung",
          "die Zustimmnis",
          "die Zustimmheit",
          "zustimmen → die Zustimmung.",
        ],
        [
          "Nomen zu „sich verspäten“:",
          "die Verspätung",
          "die Verspätheit",
          "die Verspätnis",
          "sich verspäten → die Verspätung.",
        ],
        [
          "Infolge ___ Unfalls wurde die Straße gesperrt.",
          "des",
          "dem",
          "den",
          "infolge + Genitiv.",
        ],
        [
          "„Indem wir digitalisieren, …“ = Durch ___ Digitalisierung …",
          "die",
          "der",
          "den",
          "durch + Akkusativ, feminin: durch die.",
        ],
        [
          "„Sobald der Vertrag unterschrieben ist, …“ = ___ Unterzeichnung des Vertrags …",
          "Nach",
          "Vor",
          "Trotz",
          "sobald/nachdem → nach + Dativ.",
        ],
        [
          "Nomen zu „anerkennen“ (einen Berufsabschluss):",
          "die Anerkennung",
          "die Anerkennheit",
          "die Anerkunft",
          "anerkennen → die Anerkennung.",
        ],
        [
          "„Falls Sie Fragen haben, …“ = Bei ___ …",
          "Fragen",
          "Fragung",
          "Gefrage",
          "falls/wenn → bei + Nomen.",
        ],
      ],
      adj: [
        [
          "Trotz des schlecht___ Wetters fand das Fest statt.",
          "schlechten",
          "schlechtes",
          "schlechte",
          "Genitiv mit Artikel: -en.",
        ],
        [
          "Bei gut___ Wetter findet das Fest draußen statt.",
          "gutem",
          "guten",
          "gutes",
          "Dativ neutral ohne Artikel: -em (wie dem).",
        ],
        [
          "Das ist die Meinung eines erfahren___ Kollegen.",
          "erfahrenen",
          "erfahrener",
          "erfahrenes",
          "Genitiv: -en.",
        ],
        [
          "Wir danken Ihnen für Ihr groß___ Interesse.",
          "großes",
          "großen",
          "großer",
          "Ihr + neutral Akkusativ: -es.",
        ],
        [
          "Ich trinke morgens heiß___ Kaffee.",
          "heißen",
          "heißer",
          "heißes",
          "Akkusativ maskulin ohne Artikel: -en (wie den).",
        ],
        [
          "Die Ergebnisse der letzt___ Umfrage liegen vor.",
          "letzten",
          "letzte",
          "letzter",
          "Genitiv feminin mit Artikel: -en.",
        ],
        [
          "Wegen dringend___ Termine muss ich leider absagen.",
          "dringender",
          "dringenden",
          "dringende",
          "Genitiv Plural ohne Artikel: -er (wie der).",
        ],
        [
          "Er arbeitet mit modern___ Maschinen.",
          "modernen",
          "moderne",
          "moderner",
          "Dativ Plural ohne Artikel: -en.",
        ],
        [
          "Alle neu___ Mitarbeiter müssen die Schulung machen.",
          "neuen",
          "neue",
          "neuer",
          "Nach alle: -en.",
        ],
        [
          "Viele jung___ Leute suchen einen Ausbildungsplatz.",
          "junge",
          "jungen",
          "junger",
          "Nach viele: Endung wie ohne Artikel (-e).",
        ],
        [
          "Das Gehalt eines angestellt___ Arztes ist hoch.",
          "angestellten",
          "angestellter",
          "angestelltes",
          "Genitiv: -en.",
        ],
        [
          "Sie hat mit groß___ Erfolg studiert.",
          "großem",
          "großen",
          "großer",
          "Dativ maskulin ohne Artikel: -em.",
        ],
      ],
      form: [
        [
          "Eine Beschwerde formell beginnen:",
          "Hiermit möchte ich mich über die verspätete Lieferung beschweren.",
          "Ich bin echt sauer wegen der Lieferung.",
          "Was soll das mit der Lieferung?",
          "Formell: Hiermit möchte ich mich über … beschweren.",
        ],
        [
          "In einer Diskussion die eigene Meinung sagen:",
          "Meiner Ansicht nach sollten wir das Budget erhöhen.",
          "Das Budget ist voll doof.",
          "Ey, mehr Geld, oder?",
          "Meiner Ansicht nach … / Ich bin der Meinung, dass …",
        ],
        [
          "Formeller Schluss einer E-Mail:",
          "Für Rückfragen stehe ich Ihnen gern zur Verfügung.",
          "Wenn was ist, ruf an.",
          "Fragen? Einfach melden!",
          "Für Rückfragen stehe ich Ihnen gern zur Verfügung.",
        ],
        [
          "Höflich widersprechen:",
          "Da muss ich Ihnen leider widersprechen.",
          "Das ist totaler Quatsch.",
          "Nee, falsch.",
          "Höflich: Da muss ich Ihnen leider widersprechen.",
        ],
        [
          "Sich auf einen Brief beziehen:",
          "Bezug nehmend auf Ihr Schreiben vom 3. Mai …",
          "Wegen deinem Brief …",
          "Zu dem Ding, das du geschickt hast …",
          "Formell: Bezug nehmend auf Ihr Schreiben vom …",
        ],
        [
          "Formell um etwas bitten:",
          "Ich wäre Ihnen dankbar, wenn Sie mir die Unterlagen schicken könnten.",
          "Schick mir die Unterlagen.",
          "Unterlagen her, bitte.",
          "Ich wäre Ihnen dankbar, wenn …",
        ],
        [
          "Einen Vorschlag machen:",
          "Ich schlage vor, dass wir uns nächste Woche zusammensetzen.",
          "Lass mal nächste Woche treffen.",
          "Treffen? Nächste Woche oder so.",
          "Ich schlage vor, dass …",
        ],
        [
          "Formell zustimmen:",
          "Da stimme ich Ihnen voll und ganz zu.",
          "Jo, passt.",
          "Klar, Mann.",
          "Da stimme ich Ihnen zu.",
        ],
        [
          "Einleitung einer Bewerbung:",
          "Mit großem Interesse habe ich Ihre Stellenanzeige gelesen.",
          "Hey, ich hab eure Anzeige gesehen.",
          "Ich will den Job.",
          "Mit großem Interesse habe ich … gelesen.",
        ],
        [
          "Als Firma Bedauern ausdrücken:",
          "Wir bedauern die entstandenen Unannehmlichkeiten.",
          "Blöd gelaufen.",
          "Pech gehabt.",
          "Wir bedauern …",
        ],
        [
          "Höflich auf eine schnelle Antwort drängen:",
          "Ich bitte um eine baldige Antwort.",
          "Antworte endlich!",
          "Wie lange noch?",
          "Ich bitte um eine baldige Antwort.",
        ],
        [
          "Ein Telefonat formell beenden:",
          "Vielen Dank für Ihren Anruf. Auf Wiederhören!",
          "Okay, tschüss!",
          "Ciao, bis dann.",
          "Am Telefon: Auf Wiederhören!",
        ],
      ],
      beruf: [
        [
          "Eine schriftliche Warnung vom Arbeitgeber heißt …",
          "Abmahnung",
          "Beförderung",
          "Zulage",
          "Abmahnung = Warnung vor der Kündigung.",
        ],
        [
          "Eine Mitarbeiterin bekommt eine höhere Position. Sie wird …",
          "befördert",
          "beurlaubt",
          "entlassen",
          "befördert werden = aufsteigen.",
        ],
        [
          "Wer zu Hause am Computer für die Firma arbeitet, arbeitet im …",
          "Homeoffice",
          "Außendienst",
          "Schichtdienst",
          "Homeoffice = Arbeit von zu Hause.",
        ],
        [
          "Zusätzliches Geld für Nachtarbeit heißt …",
          "Zuschlag",
          "Abschlag",
          "Rabatt",
          "Nachtzuschlag, Sonntagszuschlag …",
        ],
        [
          "Die Zeit zwischen Kündigung und letztem Arbeitstag:",
          "Kündigungsfrist",
          "Probezeit",
          "Elternzeit",
          "Kündigungsfrist = so lange gilt der Vertrag noch.",
        ],
        [
          "Die Firma gibt eine Aufgabe an eine andere Firma ab. Sie will sie …",
          "auslagern",
          "einlagern",
          "ablagern",
          "auslagern = von einer anderen Firma machen lassen.",
        ],
        [
          "Ein neuer Mitarbeiter lernt die Arbeit kennen. Das ist die …",
          "Einarbeitung",
          "Ausschreibung",
          "Abmeldung",
          "Einarbeitung = Zeit des Kennenlernens.",
        ],
        [
          "Flexible Arbeitszeit mit einer festen Kernzeit heißt …",
          "Gleitzeit",
          "Teilzeit",
          "Freizeit",
          "Gleitzeit = Beginn und Ende sind flexibel.",
        ],
        [
          "Ein Gespräch, in dem die Chefin Ihre Arbeit bewertet und Ziele bespricht:",
          "Mitarbeitergespräch",
          "Vorstellungsgespräch",
          "Verkaufsgespräch",
          "Mitarbeitergespräch = meist einmal im Jahr.",
        ],
        [
          "Alle Aufgaben, die zu Ihrer Stelle gehören:",
          "Aufgabenbereich",
          "Arbeitsweg",
          "Feierabend",
          "Aufgabenbereich = Zuständigkeiten.",
        ],
        [
          "„Wer ist dafür zuständig?“ = Wer ist dafür …?",
          "verantwortlich",
          "vorhanden",
          "vorsichtig",
          "zuständig = verantwortlich.",
        ],
        [
          "Tarifverträge handeln die Arbeitgeber mit den … aus.",
          "Gewerkschaften",
          "Krankenkassen",
          "Finanzämtern",
          "Gewerkschaften vertreten die Arbeitnehmer bei Tarifverhandlungen.",
        ],
      ],
    },
  };

  /* ---------- Zufall mit Startwert ---------- */
  const hash = (str) => {
    let h = 2166136261;
    for (let i = 0; i < str.length; i++) {
      h ^= str.charCodeAt(i);
      h = Math.imul(h, 16777619);
    }
    return h >>> 0;
  };
  const mulberry32 = (seed) => () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = seed;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  const rngFor = (s) => mulberry32(hash(s));
  const sshuffle = (a, r) => {
    a = [...a];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(r() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };

  /* ---------- Fragenbank {id, lvl, area, q, options[3], a, tip} ---------- */
  const BANK = [];
  for (const lvl of Object.keys(RAW))
    for (const area of Object.keys(RAW[lvl]))
      RAW[lvl][area].forEach(([q, ok, w1, w2, tip], n) => {
        const options = sshuffle([ok, w1, w2], rngFor(lvl + area + q));
        BANK.push({
          id: `${lvl}-${area}-${n}`,
          lvl,
          area,
          q,
          options,
          a: options.indexOf(ok),
          tip,
        });
      });

  /* 5 Fragen aus 5 verschiedenen Bereichen – gleich für alle mit gleichem Startwert */
  function pickSet(seed, lvl) {
    const r = rngFor("tagesmix|" + seed + "|" + lvl);
    return sshuffle(Object.keys(AREAS), r)
      .slice(0, 5)
      .map((area) => {
        const pool = BANK.filter((x) => x.lvl === lvl && x.area === area);
        return pool[Math.floor(r() * pool.length)];
      });
  }

  /* ---------- Datum und Serie ---------- */
  const KEY = "dm-tagesmix",
    LV = { b1: "B1–B2 leichter", b2: "B2" };
  const iso = (d = new Date()) =>
    `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  const addDays = (s, n) => {
    const d = new Date(s + "T12:00:00");
    d.setDate(d.getDate() + n);
    return iso(d);
  };
  const load = () => {
    try {
      return JSON.parse(localStorage.getItem(KEY) || "{}") || {};
    } catch {
      return {};
    }
  };
  const store = (s) => {
    try {
      localStorage.setItem(KEY, JSON.stringify(s));
    } catch {}
  };
  const curStreak = (s, t) =>
    s.last === t || s.last === addDays(t, -1) ? s.streak || 0 : 0;
  const lastOpt = () => {
    try {
      return JSON.parse(localStorage.getItem("dm-spiele") || "{}").tagesmix
        ?.opt;
    } catch {
      return null;
    }
  };

  function record(date, lvl, score, wrong) {
    const s = load();
    if (s.last !== date) {
      s.streak = s.last === addDays(date, -1) ? (s.streak || 0) + 1 : 1;
      s.last = date;
    }
    s.best = Math.max(s.best || 0, s.streak);
    s.doneDates = [
      ...new Set([...(s.doneDates || []).filter((d) => d !== date), date]),
    ]
      .sort()
      .slice(-30);
    s.day = { date, score, max: 5, lvl, wrong };
    store(s);
    return s;
  }

  DMGame.register({
    id: "tagesmix",
    cat: "b2",
    title: "B2-Tagesmix",
    icon: "📅",
    level: "B1–B2",
    desc: "Jeden Tag 5 neue Prüfungsfragen B1–B2 – mit Lernserie.",
    intro:
      "Jeden Tag 5 kurze Aufgaben auf Prüfungsniveau: Konnektoren, Passiv, Konjunktiv, Relativsätze, Nominalstil, Präpositionen, formelle Wendungen und mehr. Heute bekommen alle die gleichen Fragen – morgen gibt es neue. Spiel jeden Tag und bau deine Serie auf!",
    options: [
      { id: "b1", label: LV.b1 },
      { id: "b2", label: LV.b2 },
    ],
    optionsLabel: "Dein Niveau",
    againLabel: "Noch einmal üben",
    autoStart() {
      return load().last === iso();
    },
    bank: BANK,
    areas: AREAS,
    pickSet,
    SAY,

    start(api, opt) {
      const root = api.el.closest(".sp-play");
      let lvl = LV[opt] ? opt : LV[lastOpt()] ? lastOpt() : "b1";
      const today = iso();
      const save = (o) => {
        try {
          const all = JSON.parse(localStorage.getItem("dm-spiele") || "{}");
          all.tagesmix = { ...(all.tagesmix || {}), ...o };
          localStorage.setItem("dm-spiele", JSON.stringify(all));
        } catch {}
      };

      function run(practice) {
        root?.classList.remove("sp-tagesmix-end");
        if (practice) window.scrollTo({ top: 0, behavior: "instant" });
        let set = pickSet(today, lvl);
        if (practice) {
          const ids = set.map((x) => x.id).join();
          for (let k = 0; k < 20; k++) {
            const s = pickSet("p" + Math.random(), lvl);
            if (s.map((x) => x.id).join() !== ids) {
              set = s;
              break;
            }
          }
        }
        let i = 0,
          score = 0,
          busy = false;
        const wrong = [];
        const gap = (q, fill, cls) =>
          api
            .esc(q)
            .replace(
              /_{3,}/,
              `<span class="ch-gap${fill ? " is-filled" : ""}${cls ? " " + cls : ""}">${fill ? api.esc(fill) : "&nbsp;"}</span>`,
            );
        api.hud({ progress: 0, score: 0, step: "1 / 5" });

        function show() {
          if (!api.el.isConnected) return;
          const it = set[i];
          busy = false;
          api.clearFeedback();
          api.el.innerHTML = `<p class="sp-tagesmix-tag">${practice ? "Übung · " : ""}${api.esc(AREAS[it.area])}</p>
            <p class="ch-q sp-tagesmix-q">${gap(it.q)}</p>
            <div class="ch-opts sp-tagesmix-opts" role="group" aria-label="Antworten">${it.options.map((o, k) => `<button type="button" class="ch-opt" data-k="${k}"><kbd>${k + 1}</kbd><span>${api.esc(o)}</span></button>`).join("")}</div>`;
          const btns = [...api.el.querySelectorAll(".ch-opt")];
          btns.forEach((b, k) => (b.onclick = () => answer(k, btns)));
          api.hud({ step: `${i + 1} / 5` });
        }

        function answer(k, btns) {
          if (busy) return;
          busy = true;
          const it = set[i],
            ok = k === it.a,
            right = it.options[it.a];
          btns.forEach((b, n) => {
            b.disabled = true;
            if (n === it.a) b.classList.add("is-right");
          });
          if (!ok) btns[k].classList.add("is-wrong");
          const qEl = api.el.querySelector(".sp-tagesmix-q");
          if (qEl && /_{3,}/.test(it.q))
            qEl.innerHTML = gap(it.q, right, ok ? "" : "is-bad");
          if (ok) score++;
          else
            wrong.push({
              correct: /_{3,}/.test(it.q)
                ? it.q.replace(/_{3,}/, right)
                : right,
              tip: it.tip,
            });
          i++;
          api.hud({ score, progress: i / 5 });
          api.feedback(
            ok,
            ok
              ? `<b>Richtig!</b><span>${api.esc(it.tip)}</span>`
              : `<b>Leider falsch.</b><span>Richtig: <b>${api.esc(right)}</b></span><span>${api.esc(it.tip)}</span>`,
          );
          api.next(
            i >= 5 ? "Ergebnis ansehen" : "Weiter",
            i >= 5 ? done : show,
          );
          const nb = document.getElementById("sp-next");
          if (nb && nb.getBoundingClientRect().bottom > innerHeight)
            nb.scrollIntoView({ block: "end", behavior: "smooth" });
        }

        function done() {
          if (practice) return end({ practice: true, score, wrong });
          const s = record(today, lvl, score, wrong);
          api.save({ score });
          save({ opt: lvl });
          end({ s, score, wrong, fresh: true });
        }
        show();
      }

      function calendar(s) {
        const D = ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"],
          doneSet = new Set(s.doneDates || []);
        return `<p class="sp-tagesmix-cal-h">Deine letzten 14 Tage</p><ol class="ch-week sp-tagesmix-cal" aria-label="Kalender der letzten 14 Tage">${Array.from(
          { length: 14 },
          (_, n) => {
            const d = addDays(today, n - 13),
              dt = new Date(d + "T12:00:00"),
              on = doneSet.has(d);
            return `<li class="${on ? "is-done" : ""}${d === today ? " is-today" : ""}" aria-label="${D[dt.getDay()]} ${dt.getDate()}.${dt.getMonth() + 1}.: ${on ? "geschafft" : "nicht gespielt"}">${D[dt.getDay()]}<b>${dt.getDate()}</b><i aria-hidden="true">${on ? "✔" : ""}</i></li>`;
          },
        ).join("")}</ol>`;
      }

      function end({
        s = load(),
        score,
        wrong = [],
        practice = false,
        fresh = false,
      } = {}) {
        root?.classList.add("sp-tagesmix-end");
        api.clearFeedback();
        const day = s.day && s.day.date === today ? s.day : null;
        const sc = practice ? score : day ? day.score : (score ?? 0);
        const wr = practice ? wrong : day ? day.wrong || [] : wrong;
        const streak = curStreak(s, today);
        const head = practice
          ? "Übungsrunde geschafft!"
          : sc === 5
            ? "Perfekt – 5 von 5!"
            : sc >= 3
              ? "Gut gemacht!"
              : "Dranbleiben – morgen klappt es besser!";
        api.el.innerHTML = `<div class="ch-result sp-done sp-tagesmix-res">
          <p class="ch-kicker">${practice ? "Übung (zählt nicht für die Serie)" : `Tagesmix vom ${today.split("-").reverse().join(".")}${day ? " · " + api.esc(LV[day.lvl] || "") : ""}`}</p>
          <h1>${head}</h1>
          <p class="ch-big">${sc} <small>von 5</small></p>
          ${!practice && !fresh ? '<p class="ch-done">✅ Den Tagesmix für heute hast du schon geschafft.</p>' : ""}
          <div class="ch-streak${streak ? " is-on" : ""}"><span class="ch-flame" aria-hidden="true">🔥</span><div><b>Serie: ${streak} ${streak === 1 ? "Tag" : "Tage"} in Folge</b><span>Rekord: ${s.best || streak} ${(s.best || streak) === 1 ? "Tag" : "Tage"}</span></div></div>
          ${calendar(s)}
          <p class="sp-tagesmix-tom">📅 Morgen gibt es neue Fragen.</p>
          ${wr.length ? `<details class="ch-review" open><summary>Das solltest du dir merken (${wr.length})</summary><ul>${wr.map((w) => `<li><b>${api.esc(w.correct)}</b>${w.tip ? ` – ${api.esc(w.tip)}` : ""}</li>`).join("")}</ul></details>` : ""}
          <fieldset class="ch-level"><legend>Niveau für die Übung</legend>${Object.keys(
            LV,
          )
            .map(
              (k) =>
                `<label><input type="radio" name="sp-tagesmix-lv" value="${k}"${k === lvl ? " checked" : ""}><span>${LV[k]}</span></label>`,
            )
            .join("")}</fieldset>
          <div class="ch-actions"><button type="button" class="dm-btn ch-go" id="sp-tagesmix-again">${practice ? "Noch eine Übungsrunde" : "Trotzdem noch einmal üben"}</button><a class="dm-btn dm-btn-quiet" href="#spiele/b2">Andere Spiele</a></div>
          <p class="sp-tagesmix-hint">Für A1–B1 gibt es die <a href="#challenge">Tages-Challenge</a>.</p>
        </div>`;
        window.scrollTo({ top: 0, behavior: "instant" });
        if (fresh && sc === 5)
          try {
            window.DM?.celebrate?.(api.el.querySelector(".sp-tagesmix-res"));
          } catch {}
        api.el.querySelector("#sp-tagesmix-again").onclick = () => {
          lvl =
            api.el.querySelector("input[name=sp-tagesmix-lv]:checked")?.value ||
            lvl;
          run(true);
        };
      }

      if (load().last === today) end();
      else run(false);
    },
  });
})();
