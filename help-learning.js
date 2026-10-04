/* Search only reviewed local lesson content. Free-form AI tutoring is not enabled. */
function findLearningHelp(input,previous,selectedLanguage='de'){
 const norm=s=>s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/ß/g,'ss');
 const q=norm(input),tokens=q.match(/[\p{L}\p{N}]+/gu)||[];
 const level=q.match(/\b(a1|a2|b1|b2)\b/)?.[1]?.toUpperCase();
 if(selectedLanguage==='de'){
  const link= /b2.*(wiederhol|nicht bestanden|durchgefallen)|(wiederhol|durchgefallen).*b2/.test(q)?['B2 gezielt wiederholen','#lernweg/repeat']:/b2.*(vorbereit|anfang|start)|bsk/.test(q)?['Vorbereitung auf B2','#lernweg/bridge']:/schreib.*(besser|uben|verbessern)|(besser|mehr).*schreib/.test(q)?['Schreibwerkstatt','#ueben/schreiben/'+(level||'A2')]:/sprech.*(besser|uben|verbessern)|(besser|mehr).*sprech/.test(q)?['Sprechtraining','#ueben/sprechen/'+(level||'A2')]:/pinnwand|feedback|wunsch/.test(q)?['Unsere Pinnwand','#pinnwand']:null;
  if(link)return {topic:'learning',paragraphs:['Dafür gibt es einen eigenen Bereich. Wähle dort dein Niveau und übe mit Beispielen und Hilfen.'],actions:[link]};
 }
 const studyQuestion=/(wie|was|tipps?|methode|plan|besser|besten|effektiv|schnell|richtig|anfangen|beginnen).*(lern|deutsch|vokabel|worter)|(lern|deutsch|vokabel|worter).*(besser|besten|effektiv|schnell|richtig|tipps?|methode|plan)|how.*(learn|study)|как.*(учить|изучать)|كيف.*(أتعلم|اتعلم)/.test(q);
 const levelReply=previous?.studyAdvice&&level&&/^(ich bin |mein niveau ist |niveau |ich lerne )?(a1|a2|b1|b2)[.!? ]*$/.test(q.trim());
 if((studyQuestion&&!/konjug|bedeut|pdf|download/.test(q))||levelReply){
  const selected=level||null;
  const focus={A1:'A1: Beginne mit kurzen Alltagssätzen: „Ich heiße …“, „Ich wohne in …“. Lerne Nomen immer mit Artikel.',A2:'A2: Erzähle mit drei bis fünf Sätzen von deinem Tag. Übe auch das Perfekt: „Gestern habe ich …“.',B1:'B1: Begründe deine Meinung, beschreibe Bilder und plane etwas gemeinsam. Verwende zum Beispiel „weil“, „deshalb“ und „obwohl“.',B2:'B2 Beruf: Übe Situationen aus dem Arbeitsalltag: höflich nachfragen, ein Problem erklären und Lösungen vorschlagen.'};
  return {topic:'learning',studyAdvice:true,paragraphs:[
   'Ein guter Anfang: Lerne regelmäßig in kleinen Portionen. Probiere diesen 15-Minuten-Plan aus:',
   '1. Wiederholen (3 Minuten): Schau dir fünf bekannte Wörter an. Versuche, die Bedeutung ohne Hilfe zu nennen.',
   '2. Verstehen (5 Minuten): Lies eine kurze Erklärung in deiner Lektion. Wähle drei bis fünf neue Wörter und bilde zu jedem einen Satz.',
   '3. Anwenden (5 Minuten): Mache eine Übung und sprich deine Beispielsätze laut. Schau bei Fehlern in die Erklärung und versuche es erneut.',
   '4. Merken (2 Minuten): Schließe die Erklärung. Was kannst du jetzt aus dem Kopf sagen? Wiederhole diese Wörter am nächsten Tag.',
   selected?focus[selected]:'Auf welchem Niveau lernst du gerade: A1, A2, B1 oder B2? Schreibe mir dein Niveau, dann gebe ich dir einen passenden Schwerpunkt.'
  ],actions:selected?[[selected+' · Lernweg öffnen','#buch/'+selected]]:[]};
 }
 const follow=/^(?:(?:und|noch|ein|mehr|bitte|and|another)\s+)*(?:beispiel|example|praposition|konjugation|perfekt|prateritum)/.test(q);
 const cue=/konjug|bedeut|heisst|verb|nomen|substantiv|adjektiv|plural|artikel|praposition|perfekt|prateritum|beispiel|erklar|meaning|mean|conjug|example|объяс|спряж|значит|معنى|تصريف|صرف|معنی|çekim|anlam|解释|变位|significa|coniug|conjug/.test(q);
 const keys=Object.keys(wordLibrary);
 let key=(follow&&previous?.wordKey)||keys.find(k=>norm(k)===q.trim()||norm(wordLibrary[k].word)===q.trim());
 if(!key&&cue)key=keys.filter(k=>tokens.includes(norm(k))&&!['sein','haben','lernen','gut','neu'].includes(k)).sort((a,b)=>b.length-a.length)[0];
 if(!key&&cue)key=keys.find(k=>q.includes('„'+norm(k)+'“')||q.includes('"'+norm(k)+'"')||q.replace(/[?!.,]+$/,'').endsWith(' '+norm(k)));
 if(!key&&follow&&previous?.wordKey)key=previous.wordKey;
 if(key){
  const w=wordLibrary[key],l=lessons.find(l=>lessonWords[l.id]?.includes(key)&&(!level||l.level===level))||lessons.find(l=>lessonWords[l.id]?.includes(key));
  const rows=[w.word+' · '+w.pos,w.meaning];
  if(w.forms)rows.push('Präsens: '+['ich','du','er/sie/es','wir','ihr','sie/Sie'].map((p,i)=>p+' '+w.forms[i]).join(' · '));
  if(w.plural)rows.push('Plural: '+w.plural);
  if(w.prep)rows.push(w.prep);
  if(l&&!['A1','A2'].includes(l.level)&&w.perf)rows.push('Perfekt: '+w.perf+' · Präteritum: '+w.past);
  rows.push(w.example);if(w.example2)rows.push(w.example2);
  const tr=l&&['A1','A2'].includes(l.level)?wordTranslations[key]?.[selectedLanguage]:null;if(typeof tr==='string'&&selectedLanguage!=='de')rows.push(tr);
  return {topic:'learning',wordKey:key,paragraphs:rows,actions:l?[[l.level+' · '+w.word,'#wort/'+l.id+'/'+encodeURIComponent(key)]]:[]};
 }
 // Navigation questions keep the website guide; recommend content only for learning requests.
 if(/pdf|download|ubersetz|translation|audio|gerausch|blattern|kontakt/.test(q))return null;
 const subjects=[['perfekt','alltag'],['vergangenheit','alltag'],['adjektivend','kleidung'],['kleidung','kleidung'],['modalverb','gesundheit'],['wechselpraposition','unterwegs'],['relativsatz','reklamation'],['konjunktiv','planen'],['passiv','beschwerde-b2'],['bewerbung','bewerbung-b2'],['wohnen','wohnen'],['einkaufen','einkaufen']];
 const matches=subjects.filter(([term])=>q.includes(term));
 const found=[...new Set(matches.map(([,id])=>id))].map(id=>lessons.find(l=>l.id===id)).filter(Boolean);
 if(found.length)return {topic:'learning',paragraphs:found.flatMap(l=>[l.level+' · '+l.title,l.rule,l.example]),actions:found.map(l=>[l.title,'#lektion/'+l.id])};
 return null;
}
