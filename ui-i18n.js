/* Site-wide help in the learner's language (load AFTER home-i18n.js).
   German stays visible – it is the learning language. Under known German UI texts (navigation, back bar, buttons,
   headlines, instructions) a small gloss in the chosen language is added. Nothing is replaced.
   - Language: DM.hi18n (home-i18n.js), 9 languages: de, en, uk, ru, ar, fa, tr, es, it. Active only when language != de.
   - Switcher: 🌐 button in the header (always reachable) -> DM.hi18n.set(code).
   - Dictionary: ROWS below, one line per text: "Deutsch|en|uk|ru|ar|fa|tr|es|it". {1} {2} {3} = number or level (A1 …).
     The German part must be exactly the text on the page (icons, arrows and a final colon are ignored).
   - A gloss is an empty <small class="ui-tr" data-t="…">; the text is drawn with CSS (::after). So textContent of buttons
     stays German and no click handler or answer check can break. Never inside [data-no-i18n].
   - 🔊 next to instructions reads the TRANSLATION aloud with the device voice (speechSynthesis) – only if the device has
     a voice for that language. No recordings, no cost.
   - Erste Schritte: titles, intros, tips and "Sätze zum Nachsprechen" come from topic.i18n (erste-schritte-data.js).
   - Help widget: Ukrainian texts (siteHelpText.uk) are added here because help-data.js has none.
   Please have native speakers spot-check, especially ar and fa. */
(function () {
  "use strict";
  const DM = (window.DM = window.DM || {});
  const ORDER = ["en", "uk", "ru", "ar", "fa", "tr", "es", "it"];
  const RTL = { ar: 1, fa: 1 };
  const VOICE = { en: "en-US", uk: "uk-UA", ru: "ru-RU", ar: "ar-SA", fa: "fa-IR", tr: "tr-TR", es: "es-ES", it: "it-IT" };
  const SAY_LABEL = { en: "Read aloud", uk: "Прочитати вголос", ru: "Прочитать вслух", ar: "اقرأ بصوت عالٍ", fa: "بلند بخوان", tr: "Sesli oku", es: "Leer en voz alta", it: "Leggi ad alta voce" };

  const ROWS = [
    /* ---- header navigation, back bar ---- */
    "Mein Lernweg|My learning path|Мій шлях навчання|Мой путь обучения|مساري التعليمي|مسیر یادگیری من|Öğrenme yolum|Mi camino de aprendizaje|Il mio percorso",
    "Mein Kurs|My course|Мій курс|Мой курс|دورتي|دورهٔ من|Kursum|Mi curso|Il mio corso",
    "Lektionen|Lessons|Уроки|Уроки|الدروس|درس‌ها|Dersler|Lecciones|Lezioni",
    "Üben|Practise|Вправи|Упражнения|تدريب|تمرین|Alıştırma|Practicar|Esercizi",
    "Spiele|Games|Ігри|Игры|ألعاب|بازی‌ها|Oyunlar|Juegos|Giochi",
    "Lernspiele|Learning games|Навчальні ігри|Обучающие игры|ألعاب تعليمية|بازی‌های آموزشی|Öğrenme oyunları|Juegos para aprender|Giochi didattici",
    "Prüfung|Exam|Іспит|Экзамен|الامتحان|آزمون|Sınav|Examen|Esame",
    "Materialien|Materials|Матеріали|Материалы|مواد تعليمية|مطالب آموزشی|Materyaller|Materiales|Materiali",
    "Lieder|Songs|Пісні|Песни|أغانٍ|آهنگ‌ها|Şarkılar|Canciones|Canzoni",
    "Lernpakete|Learning packages|Навчальні пакети|Учебные пакеты|حِزم تعليمية|بسته‌های آموزشی|Öğrenme paketleri|Paquetes de estudio|Pacchetti di studio",
    "Videos|Videos|Відео|Видео|فيديوهات|ویدیوها|Videolar|Vídeos|Video",
    "Menü|Menu|Меню|Меню|القائمة|منو|Menü|Menú|Menu",
    "Teilen|Share|Поділитися|Поделиться|مشاركة|اشتراک‌گذاری|Paylaş|Compartir|Condividi",
    "Zurück|Back|Назад|Назад|رجوع|بازگشت|Geri|Atrás|Indietro",
    "Startseite|Home page|Головна сторінка|Главная страница|الصفحة الرئيسية|صفحهٔ اصلی|Ana sayfa|Página de inicio|Pagina iniziale",
    "Start|Home|Головна|Главная|الرئيسية|خانه|Ana sayfa|Inicio|Inizio",
    "Erste Schritte|First steps|Перші кроки|Первые шаги|الخطوات الأولى|قدم‌های اول|İlk adımlar|Primeros pasos|Primi passi",
    "Lernstand sichern|Save my progress|Зберегти мій прогрес|Сохранить мой прогресс|حفظ تقدّمي|ذخیرهٔ پیشرفت من|İlerlememi kaydet|Guardar mi progreso|Salva i miei progressi",
    "Dennis in deiner Sprache|Dennis in your language|Деніс твоєю мовою|Деннис на твоём языке|دينيس بلغتك|دنیس به زبان تو|Dennis senin dilinde|Dennis en tu idioma|Dennis nella tua lingua",
    "Hilfe in deiner Sprache|Help in your language|Допомога твоєю мовою|Помощь на твоём языке|مساعدة بلغتك|راهنمایی به زبان خودت|Kendi dilinde yardım|Ayuda en tu idioma|Aiuto nella tua lingua",
    /* ---- common buttons and labels ---- */
    "Starten|Start|Почати|Начать|ابدأ|شروع|Başla|Empezar|Inizia",
    "Jetzt starten|Start now|Почати зараз|Начать сейчас|ابدأ الآن|همین حالا شروع کن|Şimdi başla|Empezar ahora|Inizia ora",
    "Weiter|Next|Далі|Дальше|التالي|بعدی|İleri|Siguiente|Avanti",
    "Weitermachen|Continue|Продовжити|Продолжить|تابع|ادامه|Devam et|Continuar|Continua",
    "Hier weitermachen|Continue here|Продовжити тут|Продолжить здесь|تابع من هنا|از اینجا ادامه بده|Buradan devam et|Continuar aquí|Continua da qui",
    "Weiterlernen|Keep learning|Вчитися далі|Учиться дальше|تابع التعلّم|ادامهٔ یادگیری|Öğrenmeye devam et|Seguir aprendiendo|Continua a studiare",
    "Nächster Schritt|Next step|Наступний крок|Следующий шаг|الخطوة التالية|قدم بعدی|Sonraki adım|Siguiente paso|Prossimo passo",
    "Dein nächster Schritt|Your next step|Твій наступний крок|Твой следующий шаг|خطوتك التالية|قدم بعدی تو|Bir sonraki adımın|Tu siguiente paso|Il tuo prossimo passo",
    "Nochmal üben|Practise again|Повторити ще раз|Повторить ещё раз|تدرّب مرة أخرى|دوباره تمرین کن|Tekrar çalış|Practicar otra vez|Esercitati ancora",
    "Noch einmal üben|Practise again|Повторити ще раз|Повторить ещё раз|تدرّب مرة أخرى|دوباره تمرین کن|Tekrar çalış|Practicar otra vez|Esercitati ancora",
    "Prüfen|Check|Перевірити|Проверить|تحقّق|بررسی کن|Kontrol et|Comprobar|Controlla",
    "Antworten prüfen|Check answers|Перевірити відповіді|Проверить ответы|تحقّق من الإجابات|جواب‌ها را بررسی کن|Cevapları kontrol et|Comprobar respuestas|Controlla le risposte",
    "Text prüfen|Check text|Перевірити текст|Проверить текст|تحقّق من النص|متن را بررسی کن|Metni kontrol et|Comprobar el texto|Controlla il testo",
    "Fehler prüfen|Check mistakes|Перевірити помилки|Проверить ошибки|تحقّق من الأخطاء|اشتباه‌ها را بررسی کن|Hataları kontrol et|Comprobar errores|Controlla gli errori",
    "Lösung zeigen|Show solution|Показати відповідь|Показать ответ|أظهر الحل|جواب را نشان بده|Çözümü göster|Mostrar solución|Mostra la soluzione",
    "Vorlesen|Read aloud|Прочитати вголос|Прочитать вслух|اقرأ بصوت عالٍ|بلند بخوان|Sesli oku|Leer en voz alta|Leggi ad alta voce",
    "Anhören|Listen|Послухати|Послушать|استمع|گوش کن|Dinle|Escuchar|Ascolta",
    "Alle anhören|Listen to all|Послухати все|Послушать всё|استمع إلى الكل|همه را گوش کن|Hepsini dinle|Escuchar todo|Ascolta tutto",
    "Abspielen|Play|Відтворити|Воспроизвести|تشغيل|پخش|Oynat|Reproducir|Riproduci",
    "Deutsch hören|Listen in German|Слухати німецькою|Слушать по-немецки|استمع بالألمانية|به آلمانی گوش کن|Almanca dinle|Escuchar en alemán|Ascolta in tedesco",
    "Beispiel anhören|Listen to the example|Послухати приклад|Послушать пример|استمع إلى المثال|مثال را گوش کن|Örneği dinle|Escuchar el ejemplo|Ascolta l’esempio",
    "Rückfrage anhören|Listen to the question|Послухати запитання|Послушать вопрос|استمع إلى السؤال الإضافي|سؤال تکمیلی را گوش کن|Soruyu dinle|Escuchar la pregunta|Ascolta la domanda",
    "Aufnahme starten|Start recording|Почати запис|Начать запись|ابدأ التسجيل|شروع ضبط|Kaydı başlat|Empezar a grabar|Avvia la registrazione",
    "Langsam|Slow|Повільно|Медленно|ببطء|آهسته|Yavaş|Despacio|Lento",
    "Normal|Normal|Нормально|Нормально|عادي|عادی|Normal|Normal|Normale",
    "Tempo|Speed|Швидкість|Скорость|السرعة|سرعت|Hız|Velocidad|Velocità",
    "Richtig|Correct|Правильно|Правильно|صحيح|درست|Doğru|Correcto|Giusto",
    "Richtig!|Correct!|Правильно!|Правильно!|صحيح!|درست!|Doğru!|¡Correcto!|Giusto!",
    "Richtig ist|The correct answer is|Правильна відповідь|Правильный ответ|الإجابة الصحيحة هي|جواب درست|Doğru cevap|Lo correcto es|La risposta giusta è",
    "Falsch|Wrong|Неправильно|Неправильно|خطأ|غلط|Yanlış|Incorrecto|Sbagliato",
    "Noch nicht richtig|Not correct yet|Ще не правильно|Пока неправильно|ليس صحيحا بعد|هنوز درست نیست|Henüz doğru değil|Todavía no es correcto|Non ancora giusto",
    "So passt es|This is correct|Так правильно|Так правильно|هكذا صحيح|این‌طور درست است|Böyle doğru|Así está bien|Così va bene",
    "Erledigt|Done|Готово|Готово|تمّ|انجام شد|Tamamlandı|Hecho|Fatto",
    "Als erledigt markieren|Mark as done|Позначити як виконане|Отметить как выполненное|ضع علامة «مُنجَز»|علامت بزن: انجام شد|Tamamlandı olarak işaretle|Marcar como hecho|Segna come fatto",
    "Fertig|Finished|Готово|Готово|انتهيت|تمام|Bitti|Terminado|Finito",
    "Gut gemacht!|Well done!|Молодець!|Молодец!|أحسنت!|آفرین!|Aferin!|¡Bien hecho!|Ben fatto!",
    "Übungen|Exercises|Вправи|Упражнения|تمارين|تمرین‌ها|Alıştırmalar|Ejercicios|Esercizi",
    "Wortschatz|Vocabulary|Словниковий запас|Словарный запас|المفردات|واژگان|Kelime bilgisi|Vocabulario|Vocabolario",
    "Grammatik|Grammar|Граматика|Грамматика|القواعد|دستور زبان|Dil bilgisi|Gramática|Grammatica",
    "Hören|Listening|Аудіювання|Аудирование|الاستماع|شنیدن|Dinleme|Escuchar|Ascolto",
    "Lesen|Reading|Читання|Чтение|القراءة|خواندن|Okuma|Leer|Lettura",
    "Sprechen|Speaking|Говоріння|Говорение|المحادثة|صحبت کردن|Konuşma|Hablar|Parlare",
    "Schreiben|Writing|Письмо|Письмо|الكتابة|نوشتن|Yazma|Escribir|Scrivere",
    "Hören und Lesen|Listening and reading|Аудіювання і читання|Аудирование и чтение|الاستماع والقراءة|شنیدن و خواندن|Dinleme ve okuma|Escuchar y leer|Ascolto e lettura",
    "Sprechen und Schreiben|Speaking and writing|Говоріння і письмо|Говорение и письмо|المحادثة والكتابة|صحبت کردن و نوشتن|Konuşma ve yazma|Hablar y escribir|Parlare e scrivere",
    "Aufgabe|Task|Завдання|Задание|مهمة|تمرین|Görev|Tarea|Compito",
    "Beispiel|Example|Приклад|Пример|مثال|مثال|Örnek|Ejemplo|Esempio",
    "Lösung|Solution|Відповідь|Ответ|الحل|جواب|Çözüm|Solución|Soluzione",
    "Eine mögliche Lösung|A possible solution|Можлива відповідь|Возможный ответ|حل ممكن|یک جواب ممکن|Olası bir çözüm|Una solución posible|Una soluzione possibile",
    "Tipp|Tip|Порада|Совет|نصيحة|نکته|İpucu|Consejo|Consiglio",
    "Text zum Mitlesen|Text to read along|Текст для читання|Текст для чтения|النص للقراءة مع الاستماع|متن برای همراه‌خوانی|Birlikte okumak için metin|Texto para leer|Testo da leggere",
    "Fragen|Questions|Запитання|Вопросы|الأسئلة|سؤال‌ها|Sorular|Preguntas|Domande",
    "Neu versuchen|Try again|Спробувати ще раз|Попробовать ещё раз|حاول مرة أخرى|دوباره امتحان کن|Tekrar dene|Intentar de nuevo|Riprova",
    "Neue Runde|New round|Новий раунд|Новый раунд|جولة جديدة|دور جدید|Yeni tur|Nueva ronda|Nuovo giro",
    "Fertig? Neue Runde|Finished? New round|Готово? Новий раунд|Готово? Новый раунд|انتهيت؟ جولة جديدة|تمام شد؟ دور جدید|Bitti mi? Yeni tur|¿Terminado? Nueva ronda|Finito? Nuovo giro",
    "Ergebnis|Result|Результат|Результат|النتيجة|نتیجه|Sonuç|Resultado|Risultato",
    "Übersetzung|Translation|Переклад|Перевод|الترجمة|ترجمه|Çeviri|Traducción|Traduzione",
    "Wortübersetzung|Word translation|Переклад слів|Перевод слов|ترجمة الكلمات|ترجمهٔ کلمه‌ها|Kelime çevirisi|Traducción de palabras|Traduzione delle parole",
    "Kurzregel übersetzen|Translate the short rule|Перекласти коротке правило|Перевести краткое правило|ترجم القاعدة القصيرة|قاعدهٔ کوتاه را ترجمه کن|Kısa kuralı çevir|Traducir la regla breve|Traduci la regola breve",
    "Sprache für Beispiel und Erklärung|Language for example and explanation|Мова для прикладу і пояснення|Язык для примера и объяснения|لغة المثال والشرح|زبان مثال و توضیح|Örnek ve açıklama dili|Idioma para el ejemplo y la explicación|Lingua per esempio e spiegazione",
    "Schwierigkeit|Difficulty|Складність|Сложность|الصعوبة|سختی|Zorluk|Dificultad|Difficoltà",
    "Deine Antwort|Your answer|Твоя відповідь|Твой ответ|إجابتك|جواب تو|Cevabın|Tu respuesta|La tua risposta",
    "Dein Text|Your text|Твій текст|Твой текст|نصّك|متن تو|Metnin|Tu texto|Il tuo testo",
    "Meine Notizen|My notes|Мої нотатки|Мои заметки|ملاحظاتي|یادداشت‌های من|Notlarım|Mis notas|I miei appunti",
    "Andere Übung|Another exercise|Інша вправа|Другое упражнение|تمرين آخر|تمرین دیگر|Başka alıştırma|Otro ejercicio|Un altro esercizio",
    "Andere Aufgabe|Another task|Інше завдання|Другое задание|مهمة أخرى|تمرین دیگر|Başka görev|Otra tarea|Un altro compito",
    "Alle ansehen|See all|Переглянути все|Посмотреть всё|عرض الكل|دیدن همه|Hepsini gör|Ver todo|Vedi tutto",
    "Alle Themen|All topics|Усі теми|Все темы|كل المواضيع|همهٔ موضوع‌ها|Tüm konular|Todos los temas|Tutti gli argomenti",
    "Alle Videos|All videos|Усі відео|Все видео|كل الفيديوهات|همهٔ ویدیوها|Tüm videolar|Todos los vídeos|Tutti i video",
    "Alle Lieder|All songs|Усі пісні|Все песни|كل الأغاني|همهٔ آهنگ‌ها|Tüm şarkılar|Todas las canciones|Tutte le canzoni",
    "Thema suchen|Search for a topic|Шукати тему|Искать тему|ابحث عن موضوع|جستجوی موضوع|Konu ara|Buscar un tema|Cerca un argomento",
    "Jetzt spielen|Play now|Грати зараз|Играть сейчас|العب الآن|همین حالا بازی کن|Şimdi oyna|Jugar ahora|Gioca ora",
    "Spielen|Play|Грати|Играть|العب|بازی کن|Oyna|Jugar|Gioca",
    "Text herunterladen|Download text|Завантажити текст|Скачать текст|تنزيل النص|دانلود متن|Metni indir|Descargar el texto|Scarica il testo",
    "Leeren|Clear|Очистити|Очистить|مسح|پاک کردن|Temizle|Borrar|Svuota",
    "Arbeitsblatt (PDF)|Worksheet (PDF)|Робочий аркуш (PDF)|Рабочий лист (PDF)|ورقة عمل (PDF)|برگهٔ تمرین (PDF)|Çalışma kâğıdı (PDF)|Hoja de ejercicios (PDF)|Scheda di lavoro (PDF)",
    "Meinen Text als PDF speichern|Save my text as PDF|Зберегти мій текст як PDF|Сохранить мой текст как PDF|حفظ نصّي بصيغة PDF|متن من را به‌صورت PDF ذخیره کن|Metnimi PDF olarak kaydet|Guardar mi texto como PDF|Salva il mio testo in PDF",
    "Meine Fehler|My mistakes|Мої помилки|Мои ошибки|أخطائي|اشتباه‌های من|Hatalarım|Mis errores|I miei errori",
    "Meine Fehler wiederholen|Repeat my mistakes|Повторити мої помилки|Повторить мои ошибки|مراجعة أخطائي|مرور اشتباه‌های من|Hatalarımı tekrar et|Repasar mis errores|Ripassa i miei errori",
    "Zum Fehlerheft|To my mistakes notebook|До зошита помилок|К тетради ошибок|إلى دفتر الأخطاء|به دفتر اشتباه‌ها|Hata defterine git|Al cuaderno de errores|Al quaderno degli errori",
    "Dein Fehlerheft ist leer.|Your mistakes notebook is empty.|Твій зошит помилок порожній.|Твоя тетрадь ошибок пуста.|دفتر أخطائك فارغ.|دفتر اشتباه‌های تو خالی است.|Hata defterin boş.|Tu cuaderno de errores está vacío.|Il tuo quaderno degli errori è vuoto.",
    "Zum Kurs|To the course|До курсу|К курсу|إلى الدورة|به دوره|Kursa git|Al curso|Al corso",
    "Zum Lernweg|To the learning path|До шляху навчання|К пути обучения|إلى المسار التعليمي|به مسیر یادگیری|Öğrenme yoluna git|Al camino de aprendizaje|Al percorso",
    "Zur Lektion|To the lesson|До уроку|К уроку|إلى الدرس|به درس|Derse git|A la lección|Alla lezione",
    "Tages-Challenge|Daily challenge|Челендж дня|Челлендж дня|تحدّي اليوم|چالش روز|Günün meydan okuması|Reto del día|Sfida del giorno",
    "Einstufungstest – 5 Minuten|Placement test – 5 minutes|Тест на визначення рівня – 5 хвилин|Тест на определение уровня – 5 минут|اختبار تحديد المستوى – 5 دقائق|آزمون تعیین سطح – 5 دقیقه|Seviye testi – 5 dakika|Prueba de nivel – 5 minutos|Test di livello – 5 minuti",
    "Niveau ändern|Change level|Змінити рівень|Изменить уровень|تغيير المستوى|تغییر سطح|Seviyeyi değiştir|Cambiar de nivel|Cambia livello",
    "Mehr entdecken|Discover more|Більше можливостей|Больше возможностей|اكتشف المزيد|بیشتر ببین|Daha fazlasını keşfet|Descubre más|Scopri di più",
    "Alle Materialien {1}|All materials for {1}|Усі матеріали {1}|Все материалы {1}|كل المواد للمستوى {1}|همهٔ مطالب {1}|Tüm {1} materyalleri|Todos los materiales de {1}|Tutti i materiali {1}",
    "Alle Materialien für {1}|All materials for {1}|Усі матеріали для {1}|Все материалы для {1}|كل المواد للمستوى {1}|همهٔ مطالب برای {1}|{1} için tüm materyaller|Todos los materiales para {1}|Tutti i materiali per {1}",
    /* ---- level names ---- */
    "Ich fange an|I'm just starting|Я тільки починаю|Я только начинаю|أنا في البداية|تازه شروع می‌کنم|Yeni başlıyorum|Estoy empezando|Sto iniziando",
    "Erste Sätze|First sentences|Перші речення|Первые предложения|جمل أولى|جمله‌های اول|İlk cümleler|Primeras frases|Prime frasi",
    "Alltag|Everyday life|Повсякденне життя|Повседневная жизнь|الحياة اليومية|زندگی روزمره|Günlük hayat|Vida cotidiana|Vita quotidiana",
    "Gespräche|Conversations|Розмови|Разговоры|محادثات|گفتگو|Sohbetler|Conversaciones|Conversazioni",
    "Beruf|Work|Робота|Работа|العمل|کار|İş|Trabajo|Lavoro",
    "Alltag meistern|Managing everyday life|Упоратися в повсякденні|Справляться в повседневной жизни|التعامل مع الحياة اليومية|از پس زندگی روزمره برآمدن|Günlük hayatla başa çık|Manejarse en el día a día|Cavarsela nella vita quotidiana",
    "Sicher ausdrücken|Express yourself with confidence|Висловлюватися впевнено|Выражаться уверенно|التعبير بثقة|با اطمینان صحبت کردن|Kendini güvenle ifade et|Expresarse con seguridad|Esprimersi con sicurezza",
    "Deutsch im Beruf|German at work|Німецька на роботі|Немецкий на работе|الألمانية في العمل|آلمانی در محل کار|İşte Almanca|Alemán en el trabajo|Tedesco al lavoro",
    "Niveau {1}|Level {1}|Рівень {1}|Уровень {1}|المستوى {1}|سطح {1}|Seviye {1}|Nivel {1}|Livello {1}",
    /* ---- Lektionen overview ---- */
    "Jede Lektion hat sieben kurze Schritte: Einstieg, Wortschatz, Grammatik, Dialog, Übungen, Anwenden, Mitnehmen.|Every lesson has seven short steps: introduction, vocabulary, grammar, dialogue, exercises, use it yourself, take away.|Кожен урок має сім коротких кроків: вступ, слова, граматика, діалог, вправи, застосування, матеріали з собою.|В каждом уроке семь коротких шагов: введение, слова, грамматика, диалог, упражнения, применение, материалы с собой.|في كل درس سبع خطوات قصيرة: مدخل، مفردات، قواعد، حوار، تمارين، تطبيق، مواد تأخذها معك.|هر درس هفت قدم کوتاه دارد: شروع، واژگان، دستور زبان، گفتگو، تمرین، کاربرد، مطالب برای همراه بردن.|Her derste yedi kısa adım var: giriş, kelimeler, dil bilgisi, diyalog, alıştırmalar, uygulama, yanına al.|Cada lección tiene siete pasos cortos: introducción, vocabulario, gramática, diálogo, ejercicios, aplicación, para llevar.|Ogni lezione ha sette brevi passi: introduzione, vocabolario, grammatica, dialogo, esercizi, applicazione, da portare via.",
    "{1} Lektionen auf {2}|{1} lessons at {2}|Уроків на рівні {2}: {1}|Уроков на уровне {2}: {1}|{1} دروس في المستوى {2}|{1} درس در سطح {2}|{2} seviyesinde {1} ders|{1} lecciones de {2}|{1} lezioni di livello {2}",
    "Alle {1}-Lektionen|All {1} lessons|Усі уроки {1}|Все уроки {1}|كل دروس {1}|همهٔ درس‌های {1}|Tüm {1} dersleri|Todas las lecciones de {1}|Tutte le lezioni {1}",
    "Lektion · {1}|Lesson · {1}|Урок · {1}|Урок · {1}|درس · {1}|درس · {1}|Ders · {1}|Lección · {1}|Lezione · {1}",
    "Arbeitsblätter zur Grammatik|Grammar worksheets|Робочі аркуші з граматики|Рабочие листы по грамматике|أوراق عمل للقواعد|برگه‌های تمرین دستور زبان|Dil bilgisi çalışma kâğıtları|Hojas de gramática|Schede di grammatica",
    "Die Lektionen vertiefen ausgewählte Themen. Sie ersetzen keinen vollständigen Sprachkurs.|The lessons go deeper into selected topics. They do not replace a full language course.|Уроки поглиблюють окремі теми. Вони не замінюють повний мовний курс.|Уроки углубляют отдельные темы. Они не заменяют полный языковой курс.|الدروس تتعمّق في مواضيع مختارة. وهي لا تغني عن دورة لغة كاملة.|درس‌ها موضوع‌های انتخابی را عمیق‌تر می‌کنند. جای یک دورهٔ کامل زبان را نمی‌گیرند.|Dersler seçilmiş konuları derinleştirir. Tam bir dil kursunun yerini tutmaz.|Las lecciones profundizan en temas elegidos. No sustituyen un curso de idiomas completo.|Le lezioni approfondiscono temi scelti. Non sostituiscono un corso di lingua completo.",
    /* ---- level pages (#niveau/…) ---- */
    "Deine Materialien|Your materials|Твої матеріали|Твои материалы|موادك|مطالب تو|Materyallerin|Tus materiales|I tuoi materiali",
    "Du fängst ganz neu an? Hier sind deine ersten Schritte – in dieser Reihenfolge.|Are you starting from zero? Here are your first steps – in this order.|Починаєш з нуля? Ось твої перші кроки – у такому порядку.|Начинаешь с нуля? Вот твои первые шаги – в таком порядке.|هل تبدأ من الصفر؟ هذه خطواتك الأولى – بهذا الترتيب.|از صفر شروع می‌کنی؟ این قدم‌های اول تو است – به همین ترتیب.|Sıfırdan mı başlıyorsun? İşte ilk adımların – bu sırayla.|¿Empiezas desde cero? Aquí están tus primeros pasos, en este orden.|Cominci da zero? Ecco i tuoi primi passi, in questo ordine.",
    "Alles für {1} an einem Ort: Lektionen, Wörter, Übungen, Hörtexte und Arbeitsblätter.|Everything for {1} in one place: lessons, words, exercises, listening texts and worksheets.|Усе для {1} в одному місці: уроки, слова, вправи, аудіотексти та робочі аркуші.|Всё для {1} в одном месте: уроки, слова, упражнения, аудиотексты и рабочие листы.|كل شيء للمستوى {1} في مكان واحد: دروس، كلمات، تمارين، نصوص استماع وأوراق عمل.|همه‌چیز برای {1} در یک جا: درس‌ها، کلمه‌ها، تمرین‌ها، متن‌های شنیداری و برگه‌های تمرین.|{1} için her şey tek yerde: dersler, kelimeler, alıştırmalar, dinleme metinleri ve çalışma kâğıtları.|Todo para {1} en un solo lugar: lecciones, palabras, ejercicios, audios y hojas de ejercicios.|Tutto per {1} in un unico posto: lezioni, parole, esercizi, ascolti e schede.",
    "Erste Schritte: Bildkarten mit Ton|First steps: picture cards with sound|Перші кроки: картки з малюнками і звуком|Первые шаги: карточки с картинками и звуком|الخطوات الأولى: بطاقات مصوّرة مع صوت|قدم‌های اول: کارت‌های تصویری با صدا|İlk adımlar: sesli resimli kartlar|Primeros pasos: tarjetas con imagen y sonido|Primi passi: schede illustrate con audio",
    "Bildkarten mit Ton|Picture cards with sound|Картки з малюнками і звуком|Карточки с картинками и звуком|بطاقات مصوّرة مع صوت|کارت‌های تصویری با صدا|Sesli resimli kartlar|Tarjetas con imagen y sonido|Schede illustrate con audio",
    "Starte hier. Jedes Thema hat Bilder, Ton und kleine Übungen. Die Übersetzung kannst du in deine Sprache stellen.|Start here. Every topic has pictures, sound and small exercises. You can set the translation to your language.|Почни тут. У кожній темі є малюнки, звук і маленькі вправи. Переклад можна увімкнути своєю мовою.|Начни здесь. В каждой теме есть картинки, звук и маленькие упражнения. Перевод можно включить на своём языке.|ابدأ هنا. في كل موضوع صور وصوت وتمارين صغيرة. يمكنك اختيار الترجمة بلغتك.|از اینجا شروع کن. هر موضوع تصویر، صدا و تمرین‌های کوچک دارد. می‌توانی ترجمه را به زبان خودت بگذاری.|Buradan başla. Her konuda resimler, ses ve küçük alıştırmalar var. Çeviriyi kendi diline ayarlayabilirsin.|Empieza aquí. Cada tema tiene imágenes, sonido y ejercicios cortos. Puedes poner la traducción en tu idioma.|Comincia qui. Ogni argomento ha immagini, audio e piccoli esercizi. Puoi impostare la traduzione nella tua lingua.",
    "Danach: die ersten Lektionen|After that: the first lessons|Потім: перші уроки|Потом: первые уроки|بعد ذلك: الدروس الأولى|بعد از آن: اولین درس‌ها|Sonra: ilk dersler|Después: las primeras lecciones|Poi: le prime lezioni",
    "Hören, sprechen, spielen|Listen, speak, play|Слухати, говорити, грати|Слушать, говорить, играть|استمع، تكلّم، العب|گوش کن، صحبت کن، بازی کن|Dinle, konuş, oyna|Escuchar, hablar, jugar|Ascoltare, parlare, giocare",
    "Lernwege mit Plan|Learning paths with a plan|Шляхи навчання з планом|Пути обучения с планом|مسارات تعليمية مع خطة|مسیرهای یادگیری با برنامه|Planlı öğrenme yolları|Caminos de aprendizaje con plan|Percorsi con un piano",
    "Arbeitsblätter zum Ausdrucken (PDF)|Worksheets to print (PDF)|Робочі аркуші для друку (PDF)|Рабочие листы для печати (PDF)|أوراق عمل للطباعة (PDF)|برگه‌های تمرین برای چاپ (PDF)|Yazdırılabilir çalışma kâğıtları (PDF)|Hojas para imprimir (PDF)|Schede da stampare (PDF)",
    "Alle {1} PDFs|All {1} PDFs|Усі PDF: {1}|Все PDF: {1}|كل ملفات PDF: {1}|همهٔ {1} فایل PDF|Tüm PDF’ler: {1}|Los {1} PDF|Tutti i {1} PDF",
    "Für alle Prüfungen: Grammatik, Wortschatz, Sprechen|For all exams: grammar, vocabulary, speaking|Для всіх іспитів: граматика, лексика, говоріння|Для всех экзаменов: грамматика, лексика, говорение|لكل الامتحانات: القواعد والمفردات والمحادثة|برای همهٔ آزمون‌ها: دستور، واژگان، صحبت|Tüm sınavlar için: dil bilgisi, kelime, konuşma|Para todos los exámenes: gramática, vocabulario, hablar|Per tutti gli esami: grammatica, lessico, parlato",
    "Arbeitsblätter zu den Lektionen|Worksheets for the lessons|Робочі аркуші до уроків|Рабочие листы к урокам|أوراق عمل للدروس|برگه‌های تمرین درس‌ها|Derslerin çalışma kâğıtları|Hojas de las lecciones|Schede delle lezioni",
    "Lieder und Spiele|Songs and games|Пісні та ігри|Песни и игры|أغانٍ وألعاب|آهنگ‌ها و بازی‌ها|Şarkılar ve oyunlar|Canciones y juegos|Canzoni e giochi",
    "Prüfungsvorbereitung|Exam preparation|Підготовка до іспиту|Подготовка к экзамену|التحضير للامتحان|آمادگی برای آزمون|Sınava hazırlık|Preparación para el examen|Preparazione all’esame",
    "Alle Prüfungen|All exams|Усі іспити|Все экзамены|كل الامتحانات|همهٔ آزمون‌ها|Tüm sınavlar|Todos los exámenes|Tutti gli esami",
    "Dein Weg zur Prüfung|Your way to the exam|Твій шлях до іспиту|Твой путь к экзамену|طريقك إلى الامتحان|راه تو تا آزمون|Sınava giden yolun|Tu camino al examen|La tua strada verso l’esame",
    "Mit Zeit und Auswertung|With timer and results|З часом і результатом|Со временем и результатом|مع الوقت والتقييم|با زمان و ارزیابی|Süre ve değerlendirme ile|Con tiempo y evaluación|Con tempo e valutazione",
    "Aufbau und Strategien|Structure and strategies|Структура і стратегії|Структура и стратегии|البنية والاستراتيجيات|ساختار و راهبردها|Yapı ve stratejiler|Estructura y estrategias|Struttura e strategie",
    "Jeder Teil mit Fallen und Lernplan|Every part with traps and a study plan|Кожна частина з пастками і планом навчання|Каждая часть с ловушками и планом обучения|كل جزء مع الأخطاء الشائعة وخطة دراسة|هر بخش با دام‌ها و برنامهٔ مطالعه|Her bölüm tuzaklar ve çalışma planıyla|Cada parte con trampas y plan de estudio|Ogni parte con trappole e piano di studio",
    "PDF · mit Lösungen und Antwortbogen|PDF · with answers and answer sheet|PDF · з відповідями і бланком|PDF · с ответами и бланком|PDF · مع الحلول وورقة الإجابة|PDF · با پاسخ‌ها و پاسخ‌نامه|PDF · cevaplar ve cevap kâğıdıyla|PDF · con soluciones y hoja de respuestas|PDF · con soluzioni e foglio risposte",
    "Einstufungstest|Placement test|Тест на рівень|Тест на уровень|اختبار تحديد المستوى|آزمون تعیین سطح|Seviye testi|Prueba de nivel|Test di livello",
    "5 Minuten · finde dein Niveau|5 minutes · find your level|5 хвилин · дізнайся свій рівень|5 минут · узнай свой уровень|5 دقائق · اعرف مستواك|۵ دقیقه · سطح خودت را پیدا کن|5 dakika · seviyeni bul|5 minutos · descubre tu nivel|5 minuti · trova il tuo livello",
    "Welche Prüfung brauche ich?|Which exam do I need?|Який іспит мені потрібен?|Какой экзамен мне нужен?|أي امتحان أحتاج؟|به کدام آزمون نیاز دارم؟|Hangi sınava ihtiyacım var?|¿Qué examen necesito?|Di quale esame ho bisogno?",
    "Lieder, Spiele und Prüfung|Songs, games and exam|Пісні, ігри та іспит|Песни, игры и экзамен|أغانٍ وألعاب وامتحان|آهنگ‌ها، بازی‌ها و آزمون|Şarkılar, oyunlar ve sınav|Canciones, juegos y examen|Canzoni, giochi ed esame",
    "Probeprüfungen|Practice exams|Пробні іспити|Пробные экзамены|امتحانات تجريبية|آزمون‌های آزمایشی|Deneme sınavları|Exámenes de prueba|Esami di prova",
    "Sprechen · {1}|Speaking · {1}|Говоріння · {1}|Говорение · {1}|المحادثة · {1}|صحبت کردن · {1}|Konuşma · {1}|Hablar · {1}|Parlare · {1}",
    "Gespräche aus dem Alltag|Everyday conversations|Розмови з повсякденного життя|Разговоры из повседневной жизни|محادثات من الحياة اليومية|گفتگوهای روزمره|Günlük hayattan konuşmalar|Conversaciones cotidianas|Conversazioni quotidiane",
    "Mit Sofort-Korrektur und Mustertext|With instant correction and model text|З миттєвою перевіркою і зразком тексту|С мгновенной проверкой и образцом текста|مع تصحيح فوري ونص نموذجي|با تصحیح فوری و متن نمونه|Anında düzeltme ve örnek metinle|Con corrección inmediata y texto modelo|Con correzione immediata e testo modello",
    "20 Wortkarten mit Bild und Lernspielen|20 word cards with pictures and learning games|20 карток зі словами, малюнками та іграми|20 карточек со словами, картинками и играми|20 بطاقة كلمات مع صور وألعاب تعليمية|20 کارت واژه با تصویر و بازی آموزشی|Resimli ve oyunlu 20 kelime kartı|20 tarjetas de palabras con imagen y juegos|20 schede di parole con immagini e giochi",
    "Mit Text und Aufgaben|With lyrics and tasks|З текстом і завданнями|С текстом и заданиями|مع النص والتمارين|با متن و تمرین|Metin ve görevlerle|Con letra y tareas|Con testo ed esercizi",
    "Mitsingen und lernen|Sing along and learn|Співай і вчись|Пой и учись|غنِّ وتعلّم|همراه بخوان و یاد بگیر|Birlikte söyle ve öğren|Canta y aprende|Canta e impara",
    "Mich vorstellen|Introducing myself|Розповісти про себе|Рассказать о себе|التعريف بنفسي|معرفی خودم|Kendimi tanıtmak|Presentarme|Presentarmi",
    "Spiel|Game|Гра|Игра|لعبة|بازی|Oyun|Juego|Gioco",
    /* ---- Erste Schritte ---- */
    "Erste Schritte auf Deutsch|First steps in German|Перші кроки в німецькій|Первые шаги в немецком|الخطوات الأولى في الألمانية|قدم‌های اول در آلمانی|Almancada ilk adımlar|Primeros pasos en alemán|Primi passi in tedesco",
    "Bildkarten zum Hören und Nachsprechen, mit Übersetzung in deine Sprache und kleinen Übungen. Für ganz neue Lernende (A0) und für A1.|Picture cards to listen to and repeat, with translation into your language and small exercises. For complete beginners (A0) and for A1.|Картки з малюнками: слухай і повторюй. З перекладом твоєю мовою і маленькими вправами. Для тих, хто починає з нуля (A0), і для A1.|Карточки с картинками: слушай и повторяй. С переводом на твой язык и маленькими упражнениями. Для тех, кто начинает с нуля (A0), и для A1.|بطاقات مصوّرة للاستماع والتكرار، مع ترجمة إلى لغتك وتمارين صغيرة. للمبتدئين تماما (A0) وللمستوى A1.|کارت‌های تصویری برای گوش دادن و تکرار، با ترجمه به زبان تو و تمرین‌های کوچک. برای کسانی که تازه شروع می‌کنند (A0) و برای A1.|Dinleyip tekrar etmek için resimli kartlar; kendi dilinde çeviri ve küçük alıştırmalarla. Yeni başlayanlar (A0) ve A1 için.|Tarjetas con imágenes para escuchar y repetir, con traducción a tu idioma y ejercicios cortos. Para principiantes absolutos (A0) y para A1.|Schede illustrate da ascoltare e ripetere, con traduzione nella tua lingua e piccoli esercizi. Per principianti assoluti (A0) e per A1.",
    "A0 · Ich fange an|A0 · I'm just starting|A0 · Я тільки починаю|A0 · Я только начинаю|A0 · أنا في البداية|A0 · تازه شروع می‌کنم|A0 · Yeni başlıyorum|A0 · Estoy empezando|A0 · Sto iniziando",
    "A1 · Wörter für den Alltag|A1 · Words for everyday life|A1 · Слова для повсякденного життя|A1 · Слова для повседневной жизни|A1 · كلمات للحياة اليومية|A1 · کلمه‌هایی برای زندگی روزمره|A1 · Günlük hayat için kelimeler|A1 · Palabras para el día a día|A1 · Parole per la vita quotidiana",
    "{1} von {2} Themen geschafft|{1} of {2} topics done|Пройдено тем: {1} з {2}|Пройдено тем: {1} из {2}|أنجزت {1} من {2} مواضيع|{1} از {2} موضوع انجام شد|{2} konudan {1} tamamlandı|{1} de {2} temas hechos|{1} di {2} argomenti completati",
    "{1} von {2} geschafft|{1} of {2} done|Пройдено: {1} з {2}|Пройдено: {1} из {2}|أنجزت {1} من {2}|{1} از {2} انجام شد|{2} içinden {1} tamamlandı|{1} de {2} hechos|{1} di {2} completati",
    "{1} · {2} Karten|{1} · {2} cards|{1} · карток: {2}|{1} · карточек: {2}|{1} · {2} بطاقات|{1} · {2} کارت|{1} · {2} kart|{1} · {2} tarjetas|{1} · {2} schede",
    "{1} · Erste Schritte|{1} · First steps|{1} · Перші кроки|{1} · Первые шаги|{1} · الخطوات الأولى|{1} · قدم‌های اول|{1} · İlk adımlar|{1} · Primeros pasos|{1} · Primi passi",
    "die Farbe zeigt den Artikel.|the colour shows the article.|колір показує артикль.|цвет показывает артикль.|اللون يدلّ على أداة التعريف.|رنگ، حرف تعریف را نشان می‌دهد.|renk artikeli gösterir.|el color muestra el artículo.|il colore indica l’articolo.",
    "ohne Plural|no plural|без множини|без множественного числа|بدون جمع|بدون جمع|çoğulu yok|sin plural|senza plurale",
    "Sätze zum Nachsprechen|Sentences to repeat|Речення для повторення|Предложения для повторения|جمل للتكرار|جمله‌هایی برای تکرار|Tekrar etmek için cümleler|Frases para repetir|Frasi da ripetere",
    "Hör zu und sprich nach.|Listen and repeat.|Слухай і повторюй.|Слушай и повторяй.|استمع وكرّر.|گوش کن و تکرار کن.|Dinle ve tekrar et.|Escucha y repite.|Ascolta e ripeti.",
    "Aufgabe {1} von {2}: Hör zu. Was passt?|Task {1} of {2}: Listen. What fits?|Завдання {1} з {2}: Слухай. Що підходить?|Задание {1} из {2}: Слушай. Что подходит?|المهمة {1} من {2}: استمع. ما المناسب؟|تمرین {1} از {2}: گوش کن. کدام درست است؟|Görev {1} / {2}: Dinle. Hangisi uyuyor?|Tarea {1} de {2}: Escucha. ¿Qué corresponde?|Esercizio {1} di {2}: Ascolta. Che cosa corrisponde?",
    "Aufgabe {1} von {2}: Lies das Wort. Welches Bild passt?|Task {1} of {2}: Read the word. Which picture fits?|Завдання {1} з {2}: Прочитай слово. Який малюнок підходить?|Задание {1} из {2}: Прочитай слово. Какая картинка подходит?|المهمة {1} من {2}: اقرأ الكلمة. أي صورة مناسبة؟|تمرین {1} از {2}: کلمه را بخوان. کدام تصویر درست است؟|Görev {1} / {2}: Kelimeyi oku. Hangi resim uyuyor?|Tarea {1} de {2}: Lee la palabra. ¿Qué imagen corresponde?|Esercizio {1} di {2}: Leggi la parola. Quale immagine corrisponde?",
    "Aufgabe {1} von {2}: Welcher Artikel?|Task {1} of {2}: Which article?|Завдання {1} з {2}: Який артикль?|Задание {1} из {2}: Какой артикль?|المهمة {1} من {2}: أي أداة تعريف؟|تمرین {1} از {2}: کدام حرف تعریف؟|Görev {1} / {2}: Hangi artikel?|Tarea {1} de {2}: ¿Qué artículo?|Esercizio {1} di {2}: Quale articolo?",
    "Super! Thema geschafft.|Great! Topic done.|Чудово! Тему пройдено.|Отлично! Тема пройдена.|ممتاز! أنجزت الموضوع.|عالی! موضوع انجام شد.|Süper! Konu tamamlandı.|¡Genial! Tema hecho.|Ottimo! Argomento completato.",
    "Gut gemacht! Hör dir die Karten noch einmal an und versuch es wieder.|Well done! Listen to the cards once more and try again.|Молодець! Послухай картки ще раз і спробуй знову.|Молодец! Послушай карточки ещё раз и попробуй снова.|أحسنت! استمع إلى البطاقات مرة أخرى وحاول من جديد.|آفرین! کارت‌ها را یک بار دیگر گوش کن و دوباره امتحان کن.|Aferin! Kartları bir daha dinle ve tekrar dene.|¡Bien hecho! Escucha las tarjetas otra vez e inténtalo de nuevo.|Ben fatto! Ascolta ancora le schede e riprova.",
    "Weiter mit {1}|Continue with {1}|Далі з {1}|Дальше с {1}|تابع مع {1}|ادامه با {1}|{1} ile devam et|Continuar con {1}|Continua con {1}",
    /* ---- lesson steps and instructions (platform.js, practice.js, vocab.js) ---- */
    "Lernschritte|Learning steps|Кроки навчання|Шаги обучения|خطوات التعلّم|قدم‌های یادگیری|Öğrenme adımları|Pasos de aprendizaje|Passi di studio",
    "Lernschritt wählen|Choose a step|Обери крок|Выбери шаг|اختر خطوة|یک قدم را انتخاب کن|Adım seç|Elige un paso|Scegli un passo",
    "Einstieg|Introduction|Вступ|Введение|مدخل|شروع|Giriş|Introducción|Introduzione",
    "Dialog & Lesen|Dialogue & reading|Діалог і читання|Диалог и чтение|حوار وقراءة|گفتگو و خواندن|Diyalog ve okuma|Diálogo y lectura|Dialogo e lettura",
    "Selbst anwenden|Use it yourself|Застосуй сам|Примени сам|طبّق بنفسك|خودت به کار ببر|Kendin uygula|Aplícalo tú|Applica da solo",
    "Mitnehmen|Take away|Візьми з собою|Возьми с собой|خذ معك|با خودت ببر|Yanına al|Para llevar|Da portare via",
    "Schauen|Look|Дивись|Смотри|انظر|نگاه کن|Bak|Mirar|Guarda",
    "Wörter|Words|Слова|Слова|كلمات|کلمه‌ها|Kelimeler|Palabras|Parole",
    "Sätze|Sentences|Речення|Предложения|جمل|جمله‌ها|Cümleler|Frases|Frasi",
    "Hören & Lesen|Listening & reading|Слухати і читати|Слушать и читать|استماع وقراءة|شنیدن و خواندن|Dinleme ve okuma|Escuchar y leer|Ascoltare e leggere",
    "Schau das Bild an.|Look at the picture.|Подивись на малюнок.|Посмотри на картинку.|انظر إلى الصورة.|به تصویر نگاه کن.|Resme bak.|Mira la imagen.|Guarda l’immagine.",
    "Heute: {1} Wörter. 👆 Tippe auf ein Wort.|Today: {1} words. Tap a word.|Сьогодні: {1} слів. Натисни на слово.|Сегодня: {1} слов. Нажми на слово.|اليوم: {1} كلمات. اضغط على كلمة.|امروز: {1} کلمه. روی یک کلمه بزن.|Bugün: {1} kelime. Bir kelimeye dokun.|Hoy: {1} palabras. Toca una palabra.|Oggi: {1} parole. Tocca una parola.",
    "Nomen|Nouns|Іменники|Существительные|الأسماء|اسم‌ها|İsimler|Sustantivos|Nomi",
    "Verben|Verbs|Дієслова|Глаголы|الأفعال|فعل‌ها|Fiiller|Verbos|Verbi",
    "Adjektive|Adjectives|Прикметники|Прилагательные|الصفات|صفت‌ها|Sıfatlar|Adjetivos|Aggettivi",
    "Satzbau|Sentence structure|Будова речення|Построение предложения|بناء الجملة|ساخت جمله|Cümle yapısı|Estructura de la frase|Struttura della frase",
    "Alle {1} Wörter zeigen|Show all {1} words|Показати всі слова ({1})|Показать все слова ({1})|أظهر كل الكلمات ({1})|همهٔ {1} کلمه را نشان بده|{1} kelimenin hepsini göster|Mostrar las {1} palabras|Mostra tutte le {1} parole",
    "Lernkarten|Flashcards|Картки для вивчення|Карточки для изучения|بطاقات تعليمية|فلش‌کارت‌ها|Öğrenme kartları|Tarjetas de estudio|Schede di studio",
    "Bild & Wort|Picture & word|Малюнок і слово|Картинка и слово|صورة وكلمة|تصویر و کلمه|Resim ve kelime|Imagen y palabra|Immagine e parola",
    "Satzbausteine|Sentence building blocks|Частини речення|Части предложения|أجزاء الجملة|تکه‌های جمله|Cümle parçaları|Piezas de la frase|Pezzi di frase",
    "Themenübersicht|Topic overview|Огляд тем|Обзор тем|نظرة على المواضيع|فهرست موضوع‌ها|Konulara genel bakış|Resumen de temas|Panoramica degli argomenti",
    "So geht der Satz.|This is how the sentence works.|Так будується речення.|Так строится предложение.|هكذا تُبنى الجملة.|جمله این‌طور ساخته می‌شود.|Cümle böyle kurulur.|Así se forma la frase.|Così si costruisce la frase.",
    "Mehr Erklärung & Übersetzung|More explanation & translation|Більше пояснень і переклад|Больше объяснений и перевод|شرح أكثر وترجمة|توضیح بیشتر و ترجمه|Daha fazla açıklama ve çeviri|Más explicación y traducción|Più spiegazioni e traduzione",
    "Ein typischer Fehler|A typical mistake|Типова помилка|Типичная ошибка|خطأ شائع|یک اشتباه رایج|Tipik bir hata|Un error típico|Un errore tipico",
    "Lies mit.|Read along.|Читай разом.|Читай вместе.|اقرأ مع النص.|همراه متن بخوان.|Birlikte oku.|Lee el texto.|Leggi insieme.",
    "Was ist richtig?|What is correct?|Що правильно?|Что правильно?|ما الصحيح؟|کدام درست است؟|Hangisi doğru?|¿Qué es correcto?|Che cosa è giusto?",
    "Hör zu. Sprich nach.|Listen. Repeat.|Слухай. Повторюй.|Слушай. Повторяй.|استمع. كرّر.|گوش کن. تکرار کن.|Dinle. Tekrar et.|Escucha. Repite.|Ascolta. Ripeti.",
    "Höre die Beispielsätze dieser Lektion und sprich sie nach.|Listen to the example sentences of this lesson and repeat them.|Послухай приклади речень цього уроку і повтори їх.|Послушай примеры предложений этого урока и повтори их.|استمع إلى جمل هذا الدرس وكرّرها.|جمله‌های نمونهٔ این درس را گوش کن و تکرار کن.|Bu dersin örnek cümlelerini dinle ve tekrar et.|Escucha las frases de ejemplo de esta lección y repítelas.|Ascolta le frasi di esempio di questa lezione e ripetile.",
    "Hören & nachsprechen|Listen & repeat|Слухати і повторювати|Слушать и повторять|استمع وكرّر|گوش کن و تکرار کن|Dinle ve tekrar et|Escuchar y repetir|Ascolta e ripeti",
    "Du bist dran.|Your turn.|Твоя черга.|Твоя очередь.|دورك الآن.|نوبت تو است.|Sıra sende.|Te toca a ti.|Tocca a te.",
    "Wähle die Antwort.|Choose the answer.|Обери відповідь.|Выбери ответ.|اختر الإجابة.|جواب را انتخاب کن.|Cevabı seç.|Elige la respuesta.|Scegli la risposta.",
    "Wähle ein Wort.|Choose a word.|Обери слово.|Выбери слово.|اختر كلمة.|یک کلمه انتخاب کن.|Bir kelime seç.|Elige una palabra.|Scegli una parola.",
    "Dein Satz|Your sentence|Твоє речення|Твоё предложение|جملتك|جملهٔ تو|Cümlen|Tu frase|La tua frase",
    "Schreibe 1–2 Sätze.|Write 1–2 sentences.|Напиши 1–2 речення.|Напиши 1–2 предложения.|اكتب جملة أو جملتين.|یک یا دو جمله بنویس.|1–2 cümle yaz.|Escribe 1–2 frases.|Scrivi 1–2 frasi.",
    "Prüfe deinen Satz.|Check your sentence.|Перевір своє речення.|Проверь своё предложение.|تحقّق من جملتك.|جمله‌ات را بررسی کن.|Cümleni kontrol et.|Comprueba tu frase.|Controlla la tua frase.",
    "Mein Satz passt.|My sentence is correct.|Моє речення правильне.|Моё предложение правильное.|جملتي صحيحة.|جملهٔ من درست است.|Cümlem doğru.|Mi frase está bien.|La mia frase è giusta.",
    "Mein Verb passt.|My verb is correct.|Моє дієслово правильне.|Мой глагол правильный.|فعلي صحيح.|فعل من درست است.|Fiilim doğru.|Mi verbo está bien.|Il mio verbo è giusto.",
    "Auch sprechen|Speak too|Ще й говорити|Ещё и говорить|تكلّم أيضا|صحبت هم بکن|Konuşmayı da dene|También hablar|Anche parlare",
    "Sprechen üben|Practise speaking|Тренувати говоріння|Тренировать говорение|تدرّب على المحادثة|تمرین صحبت کردن|Konuşma alıştırması yap|Practicar el habla|Esercitati a parlare",
    "Mit Mustertext schreiben|Write with a model text|Писати зі зразком тексту|Писать с образцом текста|اكتب مع نص نموذجي|با متن نمونه بنویس|Örnek metinle yaz|Escribir con un texto modelo|Scrivi con un testo modello",
    "Sage {1} Wörter.|Say {1} words.|Скажи {1} слова.|Скажи {1} слова.|قل {1} كلمات.|{1} کلمه بگو.|{1} kelime söyle.|Di {1} palabras.|Di’ {1} parole.",
    "Sage {1} Satz.|Say {1} sentence.|Скажи {1} речення.|Скажи {1} предложение.|قل جملة واحدة.|{1} جمله بگو.|{1} cümle söyle.|Di {1} frase.|Di’ {1} frase.",
    "Dreh die Karte um.|Turn the card over.|Переверни картку.|Переверни карточку.|اقلب البطاقة.|کارت را برگردان.|Kartı çevir.|Dale la vuelta a la tarjeta.|Gira la scheda.",
    "Antwort aufdecken|Show the answer|Показати відповідь|Показать ответ|اكشف الإجابة|جواب را نشان بده|Cevabı göster|Mostrar la respuesta|Mostra la risposta",
    "Gewusst|I knew it|Знаю|Знаю|عرفتها|بلد بودم|Biliyordum|Lo sabía|Lo sapevo",
    "Grammatik ansehen|See the grammar|Переглянути граматику|Посмотреть грамматику|انظر إلى القواعد|دستور زبان را ببین|Dil bilgisine bak|Ver la gramática|Vedi la grammatica",
    "{1} · Erst überlegen, dann umdrehen|{1} · Think first, then turn over|{1} · Спочатку подумай, потім переверни|{1} · Сначала подумай, потом переверни|{1} · فكّر أولا ثم اقلب|{1} · اول فکر کن، بعد برگردان|{1} · Önce düşün, sonra çevir|{1} · Primero piensa, luego gira|{1} · Prima pensa, poi gira",
    "Wähle eine Antwort.|Choose an answer.|Обери відповідь.|Выбери ответ.|اختر إجابة.|یک جواب انتخاب کن.|Bir cevap seç.|Elige una respuesta.|Scegli una risposta.",
    "{1} von {2} richtig. Lies die Erklärungen und versuche es noch einmal.|{1} of {2} correct. Read the explanations and try again.|Правильно: {1} з {2}. Прочитай пояснення і спробуй ще раз.|Правильно: {1} из {2}. Прочитай объяснения и попробуй ещё раз.|{1} من {2} صحيحة. اقرأ الشرح وحاول مرة أخرى.|{1} از {2} درست. توضیح‌ها را بخوان و دوباره امتحان کن.|{2} sorudan {1} doğru. Açıklamaları oku ve tekrar dene.|{1} de {2} correctas. Lee las explicaciones e inténtalo otra vez.|{1} su {2} giuste. Leggi le spiegazioni e riprova.",
    /* ---- Hören / Lesen ---- */
    "Ansagen, Mailbox-Nachrichten, Gespräche und Radiobeiträge – mit Fragen und Lösungen. Die Texte sind mit natürlich klingenden KI-Stimmen vertont, verschiedene Figuren sprechen.|Announcements, voicemail messages, conversations and radio reports – with questions and solutions. The texts are spoken by natural-sounding AI voices; different characters speak.|Оголошення, голосові повідомлення, розмови та радіосюжети – із запитаннями і відповідями. Тексти озвучено природними голосами ШІ, говорять різні персонажі.|Объявления, голосовые сообщения, разговоры и радиосюжеты – с вопросами и ответами. Тексты озвучены естественными голосами ИИ, говорят разные персонажи.|إعلانات، رسائل بريد صوتي، محادثات وتقارير إذاعية – مع أسئلة وحلول. النصوص مسجّلة بأصوات ذكاء اصطناعي طبيعية، وتتكلم شخصيات مختلفة.|اعلان‌ها، پیام‌های صوتی، گفتگوها و گزارش‌های رادیویی – با سؤال و جواب. متن‌ها با صداهای طبیعی هوش مصنوعی خوانده شده‌اند و شخصیت‌های مختلف صحبت می‌کنند.|Anonslar, sesli mesajlar, konuşmalar ve radyo haberleri – sorular ve çözümlerle. Metinler doğal yapay zekâ sesleriyle seslendirildi; farklı kişiler konuşuyor.|Avisos, mensajes de buzón de voz, conversaciones y reportajes de radio, con preguntas y soluciones. Los textos están grabados con voces de IA naturales; hablan distintos personajes.|Annunci, messaggi in segreteria, conversazioni e servizi radio, con domande e soluzioni. I testi sono letti da voci IA naturali; parlano personaggi diversi.",
    "Kurze Hörtexte zum Einstieg|Short listening texts to start with|Короткі аудіотексти для початку|Короткие аудиотексты для начала|نصوص استماع قصيرة للبداية|متن‌های شنیداری کوتاه برای شروع|Başlangıç için kısa dinleme metinleri|Audios cortos para empezar|Brevi ascolti per cominciare",
    "Alle Hörtexte sind eigene Übungstexte im Stil der Prüfungen, keine offiziellen Prüfungsaufgaben. Die Stimmen sind künstlich erzeugt (KI).|All listening texts are our own practice texts in the style of the exams, not official exam tasks. The voices are artificially generated (AI).|Усі аудіотексти – власні навчальні тексти в стилі іспитів, а не офіційні екзаменаційні завдання. Голоси створено штучно (ШІ).|Все аудиотексты – собственные учебные тексты в стиле экзаменов, а не официальные экзаменационные задания. Голоса созданы искусственно (ИИ).|كل نصوص الاستماع نصوص تدريبية خاصة بنا على نمط الامتحانات، وليست مهام امتحان رسمية. الأصوات مولّدة بالذكاء الاصطناعي.|همهٔ متن‌های شنیداری، متن‌های تمرینی خود ما به سبک آزمون‌ها هستند، نه سؤال‌های رسمی آزمون. صداها با هوش مصنوعی ساخته شده‌اند.|Tüm dinleme metinleri sınav tarzında kendi alıştırma metinlerimizdir, resmî sınav soruları değildir. Sesler yapay zekâ ile üretilmiştir.|Todos los audios son textos de práctica propios al estilo de los exámenes, no tareas oficiales. Las voces son artificiales (IA).|Tutti gli ascolti sono testi di esercizio nostri, nello stile degli esami, non prove ufficiali. Le voci sono artificiali (IA).",
    "Teil {1} · Hörtext {2} von {3}|Part {1} · Listening text {2} of {3}|Частина {1} · Аудіотекст {2} з {3}|Часть {1} · Аудиотекст {2} из {3}|الجزء {1} · نص الاستماع {2} من {3}|بخش {1} · متن شنیداری {2} از {3}|Bölüm {1} · Dinleme metni {2} / {3}|Parte {1} · Audio {2} de {3}|Parte {1} · Ascolto {2} di {3}",
    "Lies zuerst die Fragen. Dann hör den Text – du kannst ihn zweimal hören.|Read the questions first. Then listen to the text – you can listen to it twice.|Спочатку прочитай запитання. Потім послухай текст – його можна слухати двічі.|Сначала прочитай вопросы. Потом послушай текст – его можно слушать два раза.|اقرأ الأسئلة أولا. ثم استمع إلى النص – يمكنك سماعه مرتين.|اول سؤال‌ها را بخوان. بعد متن را گوش کن – می‌توانی دو بار گوش کنی.|Önce soruları oku. Sonra metni dinle – iki kez dinleyebilirsin.|Lee primero las preguntas. Luego escucha el texto: puedes escucharlo dos veces.|Leggi prima le domande. Poi ascolta il testo: puoi ascoltarlo due volte.",
    "Nächster Hörtext|Next listening text|Наступний аудіотекст|Следующий аудиотекст|نص الاستماع التالي|متن شنیداری بعدی|Sonraki dinleme metni|Siguiente audio|Prossimo ascolto",
    "Mitteilungen, Anzeigen, E-Mails und Artikel verstehen – wie im Alltag, im DTZ und im DTB B2. Jede Woche kommt ein neuer Text dazu.|Understand notices, adverts, e-mails and articles – as in everyday life, in the DTZ and in the DTB B2. A new text is added every week.|Розуміти повідомлення, оголошення, електронні листи та статті – як у житті, на DTZ і DTB B2. Щотижня додається новий текст.|Понимать сообщения, объявления, электронные письма и статьи – как в жизни, на DTZ и DTB B2. Каждую неделю добавляется новый текст.|افهم الإشعارات والإعلانات والرسائل الإلكترونية والمقالات – كما في الحياة اليومية وفي امتحانَي DTZ و DTB B2. كل أسبوع يُضاف نص جديد.|اطلاعیه‌ها، آگهی‌ها، ایمیل‌ها و مقاله‌ها را بفهم – مثل زندگی روزمره، DTZ و DTB B2. هر هفته یک متن جدید اضافه می‌شود.|Duyuruları, ilanları, e-postaları ve makaleleri anla – günlük hayatta, DTZ’de ve DTB B2’de olduğu gibi. Her hafta yeni bir metin eklenir.|Entiende avisos, anuncios, correos y artículos, como en la vida diaria, en el DTZ y en el DTB B2. Cada semana hay un texto nuevo.|Capire avvisi, annunci, e-mail e articoli, come nella vita quotidiana, nel DTZ e nel DTB B2. Ogni settimana arriva un testo nuovo.",
    "Alle Lesetexte sind eigene Übungstexte im Stil der Prüfungen, keine offiziellen Prüfungsaufgaben.|All reading texts are our own practice texts in the style of the exams, not official exam tasks.|Усі тексти для читання – власні навчальні тексти в стилі іспитів, а не офіційні екзаменаційні завдання.|Все тексты для чтения – собственные учебные тексты в стиле экзаменов, а не официальные экзаменационные задания.|كل نصوص القراءة نصوص تدريبية خاصة بنا على نمط الامتحانات، وليست مهام امتحان رسمية.|همهٔ متن‌های خواندنی، متن‌های تمرینی خود ما به سبک آزمون‌ها هستند، نه سؤال‌های رسمی آزمون.|Tüm okuma metinleri sınav tarzında kendi alıştırma metinlerimizdir, resmî sınav soruları değildir.|Todos los textos de lectura son textos de práctica propios al estilo de los exámenes, no tareas oficiales.|Tutti i testi di lettura sono testi di esercizio nostri, nello stile degli esami, non prove ufficiali.",
    /* ---- Üben / Sprechen ---- */
    "Sprechen, schreiben, hören und lesen – ohne Prüfungsdruck. Wähle dein Niveau.|Speaking, writing, listening and reading – without exam pressure. Choose your level.|Говоріння, письмо, аудіювання і читання – без екзаменаційного тиску. Обери свій рівень.|Говорение, письмо, аудирование и чтение – без экзаменационного давления. Выбери свой уровень.|محادثة، كتابة، استماع وقراءة – بدون ضغط الامتحان. اختر مستواك.|صحبت کردن، نوشتن، شنیدن و خواندن – بدون فشار آزمون. سطح خودت را انتخاب کن.|Konuşma, yazma, dinleme ve okuma – sınav baskısı olmadan. Seviyeni seç.|Hablar, escribir, escuchar y leer, sin la presión del examen. Elige tu nivel.|Parlare, scrivere, ascoltare e leggere, senza la pressione dell’esame. Scegli il tuo livello.",
    "Erst mit Hilfen, dann frei. Allein oder zu zweit.|First with help, then freely. Alone or in pairs.|Спочатку з підказками, потім вільно. Самостійно або вдвох.|Сначала с подсказками, потом свободно. Самостоятельно или вдвоём.|أولا مع مساعدة، ثم بحرية. وحدك أو مع شخص آخر.|اول با کمک، بعد آزاد. تنها یا دونفره.|Önce yardımla, sonra serbest. Tek başına veya iki kişi.|Primero con ayudas, luego libre. Solo o en pareja.|Prima con aiuti, poi liberamente. Da solo o in due.",
    "Situation {1} von {2}|Situation {1} of {2}|Ситуація {1} з {2}|Ситуация {1} из {2}|الموقف {1} من {2}|موقعیت {1} از {2}|Durum {1} / {2}|Situación {1} de {2}|Situazione {1} di {2}",
    "Sprich laut|Speak out loud|Говори вголос|Говори вслух|تكلّم بصوت عالٍ|بلند صحبت کن|Yüksek sesle konuş|Habla en voz alta|Parla ad alta voce",
    "Satzanfänge helfen|Sentence starters help|Початки речень допоможуть|Начала предложений помогут|بدايات الجمل تساعدك|شروع جمله‌ها کمک می‌کند|Cümle başlangıçları yardımcı olur|Los comienzos de frase ayudan|Gli inizi di frase aiutano",
    "Antworte auf eine Rückfrage|Answer a follow-up question|Дай відповідь на зустрічне запитання|Ответь на встречный вопрос|أجب عن سؤال إضافي|به یک سؤال تکمیلی جواب بده|Bir ek soruya cevap ver|Responde a una pregunta|Rispondi a una domanda",
    "Die andere Person sagt|The other person says|Інша людина каже|Другой человек говорит|الشخص الآخر يقول|نفر دیگر می‌گوید|Diğer kişi şöyle diyor|La otra persona dice|L’altra persona dice",
    "Antworte mit einem Satz.|Answer with one sentence.|Відповідай одним реченням.|Ответь одним предложением.|أجب بجملة واحدة.|با یک جمله جواب بده.|Bir cümleyle cevap ver.|Responde con una frase.|Rispondi con una frase.",
    "Deine Stichwörter|Your key words|Твої ключові слова|Твои ключевые слова|كلماتك المفتاحية|کلیدواژه‌های تو|Anahtar kelimelerin|Tus palabras clave|Le tue parole chiave",
    "Notiere Wörter. Sprich danach möglichst frei.|Note down words. Then speak as freely as you can.|Запиши слова. Потім говори якомога вільніше.|Запиши слова. Потом говори как можно свободнее.|دوّن كلمات. ثم تكلّم بحرية قدر الإمكان.|کلمه‌ها را یادداشت کن. بعد تا می‌توانی آزاد صحبت کن.|Kelimeleri not et. Sonra olabildiğince serbest konuş.|Anota palabras. Después habla lo más libre posible.|Annota delle parole. Poi parla il più liberamente possibile.",
    "Hör dir ein Beispiel an|Listen to an example|Послухай приклад|Послушай пример|استمع إلى مثال|یک مثال گوش کن|Bir örnek dinle|Escucha un ejemplo|Ascolta un esempio",
    "Andere passende Sätze sind auch richtig.|Other suitable sentences are correct too.|Інші відповідні речення теж правильні.|Другие подходящие предложения тоже правильные.|الجمل المناسبة الأخرى صحيحة أيضا.|جمله‌های مناسب دیگر هم درست هستند.|Uygun başka cümleler de doğrudur.|Otras frases adecuadas también son correctas.|Anche altre frasi adatte sono giuste.",
    "Prüfe deine Antwort|Check your answer|Перевір свою відповідь|Проверь свой ответ|تحقّق من إجابتك|جوابت را بررسی کن|Cevabını kontrol et|Comprueba tu respuesta|Controlla la tua risposta",
    "Nächste Situation|Next situation|Наступна ситуація|Следующая ситуация|الموقف التالي|موقعیت بعدی|Sonraki durum|Siguiente situación|Prossima situazione",
    "Jeder Weg ist eine Reihenfolge von Übungen. Hake ab, was du geschafft hast – dein Fortschritt bleibt auf deinem Gerät gespeichert.|Every path is a sequence of exercises. Tick off what you have done – your progress stays saved on your device.|Кожен шлях – це послідовність вправ. Відмічай те, що вже зроблено, – твій прогрес зберігається на твоєму пристрої.|Каждый путь – это последовательность упражнений. Отмечай, что ты уже сделал, – твой прогресс сохраняется на твоём устройстве.|كل مسار هو سلسلة من التمارين. علّم ما أنجزته – تقدّمك يبقى محفوظا على جهازك.|هر مسیر یک رشته تمرین است. هر چه را انجام دادی علامت بزن – پیشرفت تو روی دستگاهت ذخیره می‌ماند.|Her yol bir alıştırma sırasıdır. Yaptıklarını işaretle – ilerlemen cihazında kayıtlı kalır.|Cada camino es una serie de ejercicios. Marca lo que ya has hecho: tu progreso queda guardado en tu dispositivo.|Ogni percorso è una serie di esercizi. Spunta quello che hai fatto: i tuoi progressi restano salvati sul tuo dispositivo.",
    /* ---- Lernstand sichern ---- */
    "Alles bleibt auf deinem Gerät. Nichts wird an uns gesendet.|Everything stays on your device. Nothing is sent to us.|Усе залишається на твоєму пристрої. Нам нічого не надсилається.|Всё остаётся на твоём устройстве. Нам ничего не отправляется.|كل شيء يبقى على جهازك. لا يُرسل إلينا أي شيء.|همه‌چیز روی دستگاه تو می‌ماند. چیزی برای ما فرستاده نمی‌شود.|Her şey cihazında kalır. Bize hiçbir şey gönderilmez.|Todo se queda en tu dispositivo. No se nos envía nada.|Tutto resta sul tuo dispositivo. A noi non viene inviato nulla.",
    "Dein Fortschritt (Kurs, erledigte Schritte, Fehlerheft, Niveau, Challenge, Spiele) liegt nur auf diesem Gerät. Sichere ihn, bevor du das Handy wechselst oder Browserdaten löschst.|Your progress (course, completed steps, mistakes notebook, level, challenge, games) is stored only on this device. Save it before you change your phone or delete browser data.|Твій прогрес (курс, виконані кроки, зошит помилок, рівень, челендж, ігри) зберігається лише на цьому пристрої. Збережи його, перш ніж міняти телефон або видаляти дані браузера.|Твой прогресс (курс, выполненные шаги, тетрадь ошибок, уровень, челлендж, игры) хранится только на этом устройстве. Сохрани его, прежде чем менять телефон или удалять данные браузера.|تقدّمك (الدورة، الخطوات المنجزة، دفتر الأخطاء، المستوى، التحدّي، الألعاب) محفوظ على هذا الجهاز فقط. احفظه قبل أن تغيّر هاتفك أو تحذف بيانات المتصفح.|پیشرفت تو (دوره، قدم‌های انجام‌شده، دفتر اشتباه‌ها، سطح، چالش، بازی‌ها) فقط روی همین دستگاه است. قبل از عوض کردن گوشی یا پاک کردن داده‌های مرورگر آن را ذخیره کن.|İlerlemen (kurs, tamamlanan adımlar, hata defteri, seviye, meydan okuma, oyunlar) yalnızca bu cihazda durur. Telefonunu değiştirmeden veya tarayıcı verilerini silmeden önce onu kaydet.|Tu progreso (curso, pasos hechos, cuaderno de errores, nivel, reto, juegos) está solo en este dispositivo. Guárdalo antes de cambiar de móvil o borrar los datos del navegador.|I tuoi progressi (corso, passi completati, quaderno degli errori, livello, sfida, giochi) sono solo su questo dispositivo. Salvali prima di cambiare telefono o cancellare i dati del browser.",
    "Datei speichern|Save file|Зберегти файл|Сохранить файл|حفظ الملف|ذخیرهٔ فایل|Dosyayı kaydet|Guardar archivo|Salva il file",
    "Code kopieren|Copy code|Скопіювати код|Скопировать код|نسخ الرمز|کپی کردن کد|Kodu kopyala|Copiar el código|Copia il codice",
    "Senden|Send|Надіслати|Отправить|إرسال|فرستادن|Gönder|Enviar|Invia",
    "Wiederherstellen|Restore|Відновити|Восстановить|استعادة|بازیابی|Geri yükle|Restaurar|Ripristina",
    "Datei auswählen|Choose file|Вибрати файл|Выбрать файл|اختر ملفا|انتخاب فایل|Dosya seç|Elegir archivo|Scegli il file",
    "oder Code einfügen|or paste the code|або встав код|или вставь код|أو ألصق الرمز|یا کد را جای‌گذاری کن|veya kodu yapıştır|o pega el código|oppure incolla il codice",
    "Beim Wiederherstellen bleiben deine vorhandenen Daten erhalten. Es kommt nur dazu, was fehlt.|When you restore, your existing data is kept. Only what is missing is added.|Під час відновлення твої наявні дані зберігаються. Додається лише те, чого бракує.|При восстановлении твои имеющиеся данные сохраняются. Добавляется только то, чего не хватает.|عند الاستعادة تبقى بياناتك الحالية. يُضاف فقط ما ينقص.|هنگام بازیابی، داده‌های فعلی تو می‌مانند. فقط چیزهایی که کم است اضافه می‌شود.|Geri yüklerken mevcut verilerin korunur. Yalnızca eksik olanlar eklenir.|Al restaurar, tus datos actuales se conservan. Solo se añade lo que falta.|Con il ripristino i tuoi dati attuali restano. Si aggiunge solo quello che manca.",
    /* ---- 404 ---- */
    "Diese Seite gibt es nicht (mehr)|This page does not exist (any more)|Цієї сторінки (вже) немає|Этой страницы (больше) нет|هذه الصفحة غير موجودة (أو لم تعد موجودة)|این صفحه (دیگر) وجود ندارد|Bu sayfa (artık) yok|Esta página (ya) no existe|Questa pagina non esiste (più)",
    "Vielleicht ist der Link alt oder falsch geschrieben. Hier geht es weiter:|Maybe the link is old or misspelt. Continue here:|Можливо, посилання старе або з помилкою. Продовжуй тут:|Возможно, ссылка старая или с ошибкой. Продолжай здесь:|ربما الرابط قديم أو مكتوب بشكل خاطئ. تابع من هنا:|شاید لینک قدیمی است یا اشتباه نوشته شده. از اینجا ادامه بده:|Bağlantı eski veya yanlış yazılmış olabilir. Buradan devam et:|Quizá el enlace es antiguo o está mal escrito. Continúa aquí:|Forse il link è vecchio o scritto male. Continua da qui:",
  ];

  /* ---------- help widget: Ukrainian (same structure as the other languages in help-data.js) ---------- */
  try {
    if (typeof siteHelpText !== "undefined" && siteHelpText && !siteHelpText.uk) {
      siteHelpText.uk = {
        ui: [
          "Допомога із сайтом",
          "Мова",
          "Закрити",
          "Твоє запитання про сайт",
          "Надіслати",
          "Почати спочатку",
          "Привіт! Я допоможу тобі розібратися із сайтом. Обери тему або напиши коротке запитання.",
          "Я використовую готові відповіді про сайт. З іншими запитаннями про німецьку допоможе Деніс.",
          "Цього мені ще треба навчитися! Поки що я не можу відповісти на твоє запитання, але вже можу допомогти з цими темами. Обери запитання нижче:",
          "Відкрити",
          "Теми",
        ],
        titles: ["Обрати рівень", "Навігація", "Нові вправи", "Слова і граматика", "Переклади", "Аудіоприклади", "Завантажити PDF", "Підготовка до іспиту", "Відео", "Контакт"],
        answers: [
          "Реєстрація не потрібна. A1 – перші кроки, A2 – повсякденні ситуації, B1 – самостійне спілкування, B2 – німецька для роботи. Це орієнтир, а не тест рівня. Відкрий свій рівень нижче.",
          "Обери свою мету на головній сторінці. Кожен урок має сім кроків. Користуйся кнопками Weiter і Zurück або обери крок одразу. На телефоні та планшеті розділи є в Menü.",
          "Натисни «Neue Runde» або кнопку нової вправи. Обери легше, таку саму складність або складніше. Завдання змінюються в межах підготовлених наборів.",
          "Відкрий урок і натисни «Wortschatz». Там 20 слів: іменники, дієслова і прикметники. На картці слова є приклади, дієвідмінювання і прийменники.",
          "На рівнях A1 і A2 обери мову в «Kurzregel übersetzen» або «Wortübersetzung». Уроки B1 і B2 – німецькою. Розділ «Deutschland verstehen» має власні переклади. Мова чату не змінює мову уроку.",
          "Аудіоприклади є в кроці Dialog & Lesen. Натисни відтворення. Tempo змінює швидкість. Перевір гучність свого пристрою.",
          "Натисни «Lerneinheit als PDF» в уроці або «20 Wörter & Grammatik als PDF» у словнику. PDF містить навчальний матеріал і вправи. Файл можна також зберегти у вікні перегляду PDF у браузері.",
          "DTZ і DTB B2 є в розділі Prüfungstraining. Орієнтаційний курс і Leben in Deutschland мають окремий розділ: Deutschland verstehen.",
          "Пояснення є в розділі «Videos». Якщо програвач не працює, натисни «Video auf YouTube öffnen». Там є також посилання на канал Деніса.",
          "Напиши Денісу електронною поштою або залиш відгук у розділі «Deine Meinung» (твоя думка). Повідомлення не надсилаються автоматично.",
        ],
      };
    }
  } catch (_) {}

  /* ---------- dictionary ---------- */
  const norm = (s) => s.replace(/\s+/g, " ").trim();
  const stripEnd = (s) => s.replace(/[\s→←↻↗↓✓▶☰:…]+$/u, "");
  const strip = (s) => stripEnd(s.replace(/^[^\p{L}„“"«({]+/u, ""));
  const EXACT = new Map();
  const PATTERNS = [];
  ROWS.forEach((row) => {
    const a = row.split("|");
    if (a.length !== 9) return;
    const key = strip(norm(a[0]));
    if (key.indexOf("{1}") > -1) {
      const re = new RegExp("^" + key.replace(/[.*+?^$()|[\]\\]/g, "\\$&").replace(/\{\d\}/g, "(\\S+)") + "$", "u");
      const order = (key.match(/\{\d\}/g) || []).map((m) => m.charAt(1));
      PATTERNS.push({ re, order, a });
    } else EXACT.set(key, a);
  });
  function lookup(text, lang) {
    const i = ORDER.indexOf(lang) + 1;
    if (i < 1) return "";
    const tries = [text, stripEnd(text), strip(text)];
    for (let k = 0; k < tries.length; k++) {
      const t = tries[k];
      if (k && t === tries[k - 1]) continue;
      const hit = EXACT.get(t);
      if (hit) return hit[i];
      if (/\d|[AB][0-2]/.test(t))
        for (const p of PATTERNS) {
          const m = p.re.exec(t);
          if (m) return hit2(p, m, i);
        }
    }
    return "";
  }
  function hit2(p, m, i) {
    let out = p.a[i];
    p.order.forEach((n, k) => {
      out = out.split("{" + n + "}").join(m[k + 1]);
    });
    return out;
  }
  /* Erste Schritte: title / intro / tip (anywhere) and sentences (only in the sentence list) */
  let esMaps = null;
  function esLookup(text, lang, inSent) {
    const ES = DM.ersteSchritte;
    if (!ES || !ES.topics) return "";
    if (!esMaps) {
      esMaps = { any: new Map(), sent: new Map() };
      ES.topics.forEach((t) => {
        if (!t.i18n) return;
        esMaps.any.set(strip(norm(t.title)), [t, "title"]);
        esMaps.any.set(strip(norm(t.intro)), [t, "intro"]);
        esMaps.any.set(strip(norm(t.tip)), [t, "tip"]);
        (t.sentences || []).forEach((s, k) => esMaps.sent.set(norm(s[0]), [t, k]));
      });
    }
    if (inSent) {
      const s = esMaps.sent.get(text);
      if (s && s[0].i18n[lang]) return s[0].i18n[lang].sentences[s[1]] || "";
    }
    const h = esMaps.any.get(strip(text));
    return h && h[0].i18n[lang] ? h[0].i18n[lang][h[1]] || "" : "";
  }

  /* ---------- state ---------- */
  const hi = () => DM.hi18n || null;
  const cur = () => (hi() ? hi().get() : "de");
  let done = new WeakMap(); // text node -> signature (lang + text) already handled
  let busy = false,
    pendingEs = null,
    obs = null;
  const SKIP =
    '[data-no-i18n],[data-i18n],script,style,textarea,select,option,input,code,pre,[contenteditable="true"],.ui-tr,.ui-say,svg,audio,video,' +
    ".es-card,.es-opt,.es-qword,.es-fb b,.dm-model,.translation-copy,.sentence-part,#site-helper,.dm-lang";
  const HOST = "button,a,h1,h2,h3,h4,label,summary,legend,p,th,figcaption,li,.dm-lead,.dm-hint,.dm-kicker,.dm-tag";
  const SAY_HOST = "p:not(.dm-kicker):not(.dm-small):not(.dm-path-meta),.dm-lead,.dm-hint,legend";

  /* ---------- voices ---------- */
  let voices = [];
  function loadVoices() {
    try {
      voices = window.speechSynthesis ? speechSynthesis.getVoices() || [] : [];
    } catch (_) {
      voices = [];
    }
  }
  const voiceFor = (l) => voices.find((v) => v.lang && v.lang.replace("_", "-").toLowerCase() === VOICE[l].toLowerCase()) || voices.find((v) => v.lang && v.lang.toLowerCase().indexOf(l) === 0) || null;
  function say(text, l) {
    try {
      const v = voiceFor(l);
      if (!v) return;
      speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.lang = VOICE[l];
      try {
        u.voice = v;
      } catch (_) {}
      u.rate = 0.9;
      speechSynthesis.speak(u);
    } catch (_) {}
  }

  /* ---------- glosses ---------- */
  function makeGloss(text, l, line) {
    const g = document.createElement("small");
    g.className = "ui-tr" + (line ? " ui-tr-line" : "");
    g.lang = l;
    g.dir = RTL[l] ? "rtl" : "ltr";
    g.setAttribute("data-t", text);
    return g;
  }
  function gloss(node, text, l, isEs) {
    const p = node.parentElement;
    const inter = p.closest("button,a,label,summary");
    const line = !inter;
    const g = makeGloss(text, l, line);
    if (isEs) g.classList.add("ui-tr-es");
    let cs = null;
    try {
      cs = getComputedStyle(p);
    } catch (_) {}
    // German text that is only there for screen readers (e.g. "Menü" next to the ☰ icon) gets no visible gloss
    if ((cs && parseFloat(cs.fontSize) < 6) || p.closest(".dm-sr,.es-sr,.sr-only,[hidden]")) return;
    if (line && cs && (cs.textAlign === "start" || cs.textAlign === "left")) g.classList.add("ui-tr-l");
    if (line && node.nodeValue.trim().length >= 15 && p.matches(SAY_HOST) && voiceFor(l)) {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "ui-say";
      b.setAttribute("aria-label", SAY_LABEL[l] || "🔊");
      b.title = SAY_LABEL[l] || "";
      g.appendChild(b);
    }
    if (cs && /flex|grid/.test(cs.display)) {
      // in a flex/grid parent a new child would sit NEXT to the German text: keep both in one column
      const w = document.createElement("span");
      w.className = "ui-w";
      p.insertBefore(w, node);
      w.appendChild(node);
      w.appendChild(g);
    } else node.after(g);
    if (inter && (inter.tagName === "BUTTON" || inter.tagName === "A") && !inter.title) {
      inter.title = text;
      inter.setAttribute("data-ui-title", "1");
    }
  }
  function esLang(site) {
    const sel = document.getElementById("es-lang");
    if (sel) return sel.value;
    return site;
  }
  function roots() {
    const r = [];
    document.querySelectorAll("header.dm-header, main, .dm-backbar").forEach((e) => r.push(e));
    return r;
  }
  function scan() {
    if (busy) return;
    const site = cur();
    const sel = document.getElementById("es-lang");
    if (pendingEs && sel) {
      const want = pendingEs;
      pendingEs = null;
      if (sel.value !== want && Array.prototype.some.call(sel.options, (o) => o.value === want)) {
        sel.value = want;
        if (typeof sel.onchange === "function") {
          sel.onchange(); // re-renders the page -> the observer calls scan again
          return;
        }
      }
    }
    const esL = esLang(site);
    if (site === "de" && (esL === "de" || !sel)) return;
    busy = true;
    try {
      // Farsi in Erste Schritte cards is right-to-left (the page only knows Arabic)
      document.querySelectorAll('main .es-tr[lang="fa"][dir="ltr"]').forEach((e) => (e.dir = "rtl"));
      const todo = [];
      roots().forEach((root) => {
        const w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
        let n;
        while ((n = w.nextNode())) {
          const v = n.nodeValue;
          if (v.length < 2 || v.length > 400) continue;
          const sig = site + "|" + esL + "|" + v;
          if (done.get(n) === sig) continue;
          done.set(n, sig);
          todo.push(n);
        }
      });
      todo.forEach((n) => {
        const p = n.parentElement;
        if (!p || !n.isConnected) return;
        if (p.classList.contains("ui-w")) {
          // text changed inside our wrapper: drop the old gloss
          const old = p.querySelector(":scope > .ui-tr");
          if (old) old.remove();
        } else if (n.nextSibling && n.nextSibling.nodeType === 1 && n.nextSibling.classList.contains("ui-tr")) n.nextSibling.remove();
        const text = norm(n.nodeValue);
        if (text.length < 2 || text.length > 240 || !/\p{L}{2}/u.test(text)) return;
        if (p.closest(SKIP)) return;
        const foreign = p.closest("[lang]");
        if (foreign && foreign.lang && foreign.lang.slice(0, 2) !== "de") return;
        if (!(p.closest(HOST) || p.childNodes.length === 1 || p.classList.contains("ui-w"))) return;
        let tr = site !== "de" ? lookup(text, site) : "",
          isEs = false;
        if (!tr && esL !== "de" && p.closest("main")) {
          tr = esLookup(text, esL, !!p.closest(".es-sent"));
          isEs = !!tr;
        }
        if (!tr || tr === text || tr === strip(text)) return;
        gloss(n, tr, isEs ? esL : site, isEs);
      });
    } catch (e) {
      if (window.console) console.warn("ui-i18n", e);
    }
    if (obs) obs.takeRecords();
    busy = false;
  }
  function clear() {
    busy = true;
    document.querySelectorAll(".ui-tr").forEach((e) => e.remove());
    document.querySelectorAll(".ui-w").forEach((w) => {
      while (w.firstChild) w.parentNode.insertBefore(w.firstChild, w);
      w.remove();
    });
    document.querySelectorAll("[data-ui-title]").forEach((e) => {
      e.removeAttribute("title");
      e.removeAttribute("data-ui-title");
    });
    done = new WeakMap();
    if (obs) obs.takeRecords();
    busy = false;
  }
  let timer = 0,
    first = 0;
  function later() {
    const now = Date.now();
    if (!timer) first = now;
    clearTimeout(timer);
    // debounce 120 ms, but never wait longer than 600 ms while the page keeps changing
    timer = setTimeout(
      () => {
        timer = 0;
        scan();
      },
      now - first > 480 ? 0 : 120,
    );
  }
  function refresh() {
    clear();
    updateButton();
    scan();
  }

  /* ---------- language switcher in the header ---------- */
  let btn = null,
    menu = null;
  function updateButton() {
    if (!btn) return;
    const l = cur();
    btn.querySelector("b").textContent = l.toUpperCase();
    if (menu) menu.querySelectorAll("button").forEach((b) => b.setAttribute("aria-checked", String(b.dataset.l === l)));
  }
  function closeMenu() {
    if (!menu || menu.hidden) return;
    menu.hidden = true;
    btn.setAttribute("aria-expanded", "false");
  }
  function openMenu() {
    const r = btn.getBoundingClientRect();
    menu.hidden = false;
    menu.style.top = Math.round(r.bottom + 6) + "px";
    const w = menu.offsetWidth,
      vw = document.documentElement.clientWidth;
    menu.style.left = Math.max(8, Math.min(vw - w - 8, Math.round(r.left + r.width / 2 - w / 2))) + "px";
    btn.setAttribute("aria-expanded", "true");
    const on = menu.querySelector('[aria-checked="true"]') || menu.querySelector("button");
    if (on) on.focus();
  }
  function header() {
    const head = document.querySelector("header.dm-header");
    const H = hi();
    if (!head || !H || head.querySelector(".ui-lang-btn")) return;
    btn = document.createElement("button");
    btn.type = "button";
    btn.className = "ui-lang-btn";
    btn.setAttribute("data-no-i18n", "");
    btn.setAttribute("aria-haspopup", "true");
    btn.setAttribute("aria-expanded", "false");
    btn.setAttribute("aria-label", "Sprache für Hilfen wählen / Language");
    btn.title = "Sprache / Language";
    btn.innerHTML = '<span aria-hidden="true">🌐</span><b></b>';
    const anchor = head.querySelector(".dm-hshare") || head.querySelector(".dm-bell");
    if (anchor) anchor.before(btn);
    else if (head.querySelector(".logo")) head.querySelector(".logo").after(btn);
    else head.appendChild(btn);
    menu = document.createElement("div");
    menu.className = "ui-lang-menu";
    menu.setAttribute("role", "menu");
    menu.setAttribute("data-no-i18n", "");
    menu.setAttribute("aria-label", "Sprache / Language");
    menu.hidden = true;
    H.langs.forEach(([c, n]) => {
      const b = document.createElement("button");
      b.type = "button";
      b.setAttribute("role", "menuitemradio");
      b.dataset.l = c;
      b.lang = c;
      b.dir = RTL[c] ? "rtl" : "ltr";
      b.textContent = n;
      b.onclick = () => {
        H.set(c);
        closeMenu();
        btn.focus();
      };
      menu.appendChild(b);
    });
    document.body.appendChild(menu);
    btn.onclick = (e) => {
      e.stopPropagation();
      if (menu.hidden) openMenu();
      else closeMenu();
    };
    document.addEventListener("click", (e) => {
      if (menu && !menu.hidden && !menu.contains(e.target)) closeMenu();
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && menu && !menu.hidden) {
        closeMenu();
        btn.focus();
      }
    });
    window.addEventListener("scroll", closeMenu, { passive: true });
    window.addEventListener("resize", closeMenu);
    updateButton();
  }

  /* ---------- CSS (this file owns no stylesheet) ---------- */
  function css() {
    if (document.getElementById("ui-i18n-css")) return;
    const s = document.createElement("style");
    s.id = "ui-i18n-css";
    s.textContent = [
      ".ui-tr{display:block;margin:2px 0 0;font-size:max(11.5px,.72em);line-height:1.3;font-weight:400;font-style:normal;letter-spacing:0;text-transform:none;white-space:normal;opacity:.82;unicode-bidi:isolate;overflow-wrap:anywhere;text-decoration:none}",
      ".ui-tr::after{content:attr(data-t)}",
      ".ui-tr-line{font-size:max(13px,.8em);opacity:.78;margin-top:3px}",
      "h1 .ui-tr-line,h2 .ui-tr-line,h3 .ui-tr-line{font-size:max(13px,.52em);line-height:1.35}",
      ".ui-tr-l[dir=rtl]{text-align:left}",
      ".ui-tr[lang=ar],.ui-tr[lang=fa]{font-size:max(13px,.8em);line-height:1.5}",
      "h1 .ui-tr[lang=ar],h1 .ui-tr[lang=fa],h2 .ui-tr[lang=ar],h2 .ui-tr[lang=fa]{font-size:max(14px,.56em)}",
      ".ui-w{display:inline-flex;flex-direction:column;text-align:inherit}",
      "header.dm-header nav .ui-tr{font-size:11.5px;line-height:1.2;margin-top:1px}",
      ".es-sbtn .ui-tr,.es-sent .dm-note .ui-tr{font-size:max(13px,.82em)}",
      ".ui-say{all:unset;box-sizing:border-box;display:inline-flex;align-items:center;justify-content:center;width:44px;height:44px;margin:-12px 2px -12px -6px;vertical-align:middle;cursor:pointer;border-radius:50%;font-size:17px;opacity:1}",
      "[dir=rtl]>.ui-say{margin:-12px -6px -12px 2px}",
      ".ui-say::before{content:'🔊'}",
      ".ui-say:hover,.ui-say:focus-visible{background:rgba(127,127,127,.18)}",
      ".ui-say:focus-visible{outline:2px solid currentColor;outline-offset:-4px}",
      ".ui-lang-btn{flex:0 0 auto;display:inline-flex;align-items:center;justify-content:center;gap:3px;min-width:44px;height:40px;padding:0 7px;border:1px solid var(--dm-line,#d9d9d2);border-radius:999px;background:var(--dm-card,#fff);color:inherit;font:inherit;font-size:15px;line-height:1;cursor:pointer}",
      ".ui-lang-btn b{font-size:11.5px;font-weight:700;letter-spacing:.02em}",
      ".ui-lang-btn:hover,.ui-lang-btn[aria-expanded=true]{border-color:currentColor}",
      "@media (max-width:400px){.ui-lang-btn{min-width:40px;padding:0 5px;gap:2px;border-color:transparent;background:transparent}}",
      "@media (max-width:345px){.ui-lang-btn b{display:none}}",
      ".ui-lang-menu{position:fixed;z-index:1000;display:grid;gap:2px;min-width:168px;max-width:calc(100vw - 16px);max-height:calc(100vh - 80px);overflow:auto;padding:6px;border:1px solid var(--dm-line,#d9d9d2);border-radius:14px;background:var(--dm-card,#fff);color:var(--dm-ink,#1c1c1a);box-shadow:0 12px 32px rgba(0,0,0,.2)}",
      ".ui-lang-menu[hidden]{display:none}",
      ".ui-lang-menu button{display:block;width:100%;min-height:44px;padding:8px 14px;border:0;border-radius:10px;background:transparent;color:inherit;font:inherit;font-size:16px;text-align:start;cursor:pointer}",
      ".ui-lang-menu button:hover,.ui-lang-menu button:focus-visible{background:rgba(127,127,127,.16)}",
      ".ui-lang-menu button[aria-checked=true]{font-weight:700;background:rgba(127,127,127,.12)}",
      "@media print{.ui-tr,.ui-say,.ui-lang-btn,.ui-lang-menu{display:none!important}}",
    ].join("\n");
    document.head.appendChild(s);
  }

  /* ---------- start ---------- */
  function hookSet() {
    const H = hi();
    if (!H || H._uiHook) return;
    const orig = H.set;
    H.set = function (l) {
      orig.apply(H, arguments);
      if (H.get() !== "de") {
        pendingEs = H.get();
        try {
          localStorage.setItem("dmd.eslang", H.get());
        } catch (_) {}
      }
      refresh();
    };
    H._uiHook = true;
  }
  function start() {
    css();
    hookSet();
    header();
    loadVoices();
    try {
      if (window.speechSynthesis && speechSynthesis.addEventListener)
        speechSynthesis.addEventListener("voiceschanged", () => {
          const had = voices.length;
          loadVoices();
          if (voices.length !== had) refresh();
        });
    } catch (_) {}
    // read the translated instruction aloud; never trigger the surrounding element
    document.addEventListener(
      "click",
      (e) => {
        const b = e.target && e.target.closest ? e.target.closest(".ui-say") : null;
        if (!b) return;
        e.preventDefault();
        e.stopPropagation();
        const g = b.closest(".ui-tr");
        if (g) say(g.getAttribute("data-t"), g.lang);
      },
      true,
    );
    window.addEventListener("hashchange", later);
    try {
      obs = new MutationObserver(() => {
        if (!busy) later();
      });
      obs.observe(document.body, { childList: true, subtree: true, characterData: true });
    } catch (_) {}
    scan();
    setTimeout(() => {
      header();
      scan();
    }, 1600);
  }
  DM.uiI18n = { refresh, scan, lookup, rows: () => ROWS.length };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start);
  else start();
})();
