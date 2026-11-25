"""write_page(file, html): used by all page generators.

The generators stamp the day of the run into every page (JSON-LD dateModified, "Stand" line at the end).
If nothing else changed, the existing file is kept, so <lastmod> in sitemap.xml only moves when the
content really changed (Google only trusts lastmod when it is consistently correct).
"""
import os
import re

# only the two lines that carry the date of the generator run – not the source dates ("Stand: … Quelle: …")
RUN_DATE = re.compile(r'"dateModified": "\d{4}-\d\d-\d\d"|<(?:span class="small"|p class="small stand")>Stand: \d\d\.\d\d\.\d{4}<')


def write_page(file, doc):
    """Write doc unless the file on disk differs only in the run dates. Returns True when written."""
    if os.path.exists(file):
        old = open(file, encoding='utf-8').read()  # universal newlines: CRLF checkouts compare equal
        if RUN_DATE.sub('', old) == RUN_DATE.sub('', doc):
            return False
    os.makedirs(os.path.dirname(file), exist_ok=True)
    with open(file, 'w', encoding='utf-8', newline='\n') as fh:
        fh.write(doc)
    return True
