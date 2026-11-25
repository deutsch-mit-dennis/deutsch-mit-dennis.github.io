"""Links from section pages to the answer pages /antworten/<slug>/ (built by tools/make-answer-pages.py).

Used by make-share-pages.py, make-seo-pages.py and make-learn-pages.py. A link is only written when the
answer page exists, so the generators never produce broken links.
"""
import html
import os

R = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

ANSWERS = {  # slug -> short link text
    'dtz-pruefung-online-ueben': 'DTZ online üben – wie viele Punkte brauche ich?',
    'dtz-ergebnis-und-wiederholung': 'DTZ: Wann kommt das Ergebnis, was tun bei Nichtbestehen?',
    'dtz-schreiben-brief-muster': 'Den Brief im DTZ schreiben: Muster und Tipps',
    'leben-in-deutschland-test-kostenlos-ueben': 'Test „Leben in Deutschland“ kostenlos üben',
    'einbuergerung-deutschkenntnisse-test': 'Einbürgerung: Welche Deutschkenntnisse und welcher Test?',
    'telc-b1-modelltest-kostenlos': 'Kostenloser Modelltest telc Deutsch B1',
    'telc-b2-pruefung-ueben': 'telc Deutsch B2 kostenlos üben',
    'dtb-deutsch-test-fuer-den-beruf-ueben': 'Deutsch-Test für den Beruf (DTB B1/B2) üben',
    'unregelmaessige-verben-lernen': 'Unregelmäßige Verben lernen: haben oder sein?',
    'deutsch-diktat-online-ueben': 'Deutsch mit Diktaten üben',
    'deutsch-lernen-kostenlos-ohne-anmeldung': 'Kostenlos und ohne Anmeldung Deutsch lernen',
}
# exam / section id -> matching answer pages
TOPIC = {
    'dtz': ['dtz-pruefung-online-ueben', 'dtz-ergebnis-und-wiederholung', 'dtz-schreiben-brief-muster'],
    'lid': ['leben-in-deutschland-test-kostenlos-ueben', 'einbuergerung-deutschkenntnisse-test'],
    'telc-b1': ['telc-b1-modelltest-kostenlos'],
    'telc-b2': ['telc-b2-pruefung-ueben'],
    'dtb-b1': ['dtb-deutsch-test-fuer-den-beruf-ueben'],
    'dtb-b2': ['dtb-deutsch-test-fuer-den-beruf-ueben'],
    'pruefung': ['dtz-pruefung-online-ueben', 'dtz-ergebnis-und-wiederholung', 'leben-in-deutschland-test-kostenlos-ueben', 'einbuergerung-deutschkenntnisse-test',
                 'telc-b1-modelltest-kostenlos', 'telc-b2-pruefung-ueben', 'dtb-deutsch-test-fuer-den-beruf-ueben', 'dtz-schreiben-brief-muster'],
}


def exists(slug=''):
    return os.path.exists(os.path.join(R, 'antworten', *([slug] if slug else []), 'index.html'))


def answer_html(topic, lead='Kurz erklärt'):
    """<p>Kurz erklärt: <a>…</a> · <a>…</a></p> for a topic (empty string when no answer page exists)."""
    # exam ids with a suffix (dtz-2, telc-b1-3 …) use the topic of the exam
    key = next((k for k in TOPIC if topic == k or topic.startswith(k + '-')), topic)
    links = [f'<a href="/antworten/{s}/">{html.escape(ANSWERS[s])}</a>' for s in TOPIC.get(key, []) if exists(s)]
    if not links:
        return ''
    more = ' · <a href="/antworten/">Alle Antworten</a>' if exists() else ''
    return f'<p>{lead}: ' + ' · '.join(links) + more + '</p>\n'
