# Kurstagebuch – data format (contract between data files and kt.js)

Section of the website for Dennis' current integration course (A1). One folder per lesson day.

```
kurstagebuch/
  index.html                  overview of all days (reads daten/tage.js)
  kt.css  kt.js               shared style + renderer (protocol view, exercise view, overview)
  daten/tage.js               window.KT_TAGE = [{date:'2026-11-19', nr:1, title:'Sich vorstellen', level:'A1', teaser:'…'}]  (newest first)
  daten/<date>.js             window.KT_DAY = {...}     protocol of the day
  daten/<date>-ueben.js       window.KT_UEBEN = {...}   exercises of the day
  <date>/index.html           protocol page  (body data-view="protokoll" data-date="<date>")
  <date>/ueben/index.html     exercise page  (body data-view="ueben" data-date="<date>")
  <date>/qr-ueben.svg         QR code → https://deutsch-mit-dennis.de/kurstagebuch/<date>/ueben/
  <date>/protokoll-<date>.pdf printable version (all languages, with QR)
```
All asset paths are absolute (`/kurstagebuch/kt.js`). No build step, no external libraries.

## Languages (fixed order everywhere)
`LANGS = ['uk','ar','fa','tr','ro','sq','mn','fr']`
Ukrainisch (Українська), Arabisch (العربية, RTL), Persisch/Dari (فارسی, RTL), Türkisch (Türkçe), Rumänisch (Română),
Albanisch (Shqip), Mongolisch (Монгол), Französisch (Français).
A translation `tr` is ALWAYS an array of exactly 8 strings in that order.

## KT_DAY (protocol)
```js
window.KT_DAY = {
  date: '2026-11-19', nr: 1, weekday: 'Donnerstag', level: 'A1',
  title: 'Sich vorstellen',
  intro: 'Heute haben wir uns kennengelernt: …',          // 1–2 short German sentences
  goals: ['Ich kann sagen, wie ich heiße.', …],            // "Ich kann …" statements (German)
  sections: [{
    id: 'begruessung', icon: '👋', title: 'Begrüßung und Verabschiedung',
    blocks: [ /* any of the block types below, in order */ ]
  }],
  note: 'Alle Namen in den Beispielen sind erfunden.'
}
```
Block types:
- `{type:'phrases', title?, items:[{de:'Wie heißen Sie?', tr:[8], tag?:'Sie'|'du'}]}` – key sentences with translation
- `{type:'words', title?, items:[{de:'der Sohn – die Söhne', tr:[8], emoji?:'👦'}]}` – vocabulary
- `{type:'examples', title?, items:['Ich bin Koch von Beruf. …']}` – German example sentences from class (no translation)
- `{type:'rule', title, text:'German rule, may contain <b>', tr?:[8], table?:{head:[..], rows:[[..],..]}}` – grammar box (yellow marker look)
- `{type:'warn', items:[{wrong:'in dem Irak geboren', right:'im Irak geboren', why:'in + dem = im'}]}` – "Achtung, typischer Fehler"
- `{type:'table', title?, head:[..], rows:[[..],..]}` – plain table (e.g. alphabet, conjugation)
- `{type:'text', title?, text:'German model text'}` – e.g. Mustertext "Mein Steckbrief"
Strings may contain simple inline HTML (`<b>`, `<i>`, `<br>`) only.

## KT_UEBEN (exercises)
```js
window.KT_UEBEN = {
  date: '2026-11-19', title: 'Übungen: Sich vorstellen',
  sets: [{
    id: 'gruss', icon: '👋', title: 'Hallo und Tschüss', type: 'choice',
    items: [ … ]
  }]
}
```
Set types and their items:
- `choice`: `{q:'Es ist 8 Uhr. Sie sagen:', options:['Guten Abend!','Guten Morgen!','Gute Nacht!'], answer:1, why?:'short German explanation'}`
- `gap`:    `{text:'Ich heiß___ Mira.', options:['e','st','en'], answer:0, why?}`  – exactly one `___` in text
- `order`:  `{chunks:['Ich','komme','aus der Ukraine.'], why?}` – chunks in CORRECT order; renderer shuffles
- `match`:  `{pairs:[['Wie heißen Sie?','Ich heiße Mira.'], …]}` – one item per set, 4–8 pairs; renderer shuffles right column
- `steckbrief`: `{fields:[{key:'name', label:'Vorname', placeholder:'Mira'}, …], template:'Hallo! Ich heiße {name}. …'}` – learner fills, text is generated locally (nothing is sent anywhere)
Instructions per type are translated by kt.js (UI strings), so data only holds German.
