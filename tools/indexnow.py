#!/usr/bin/env python3
"""IndexNow: tell Bing, Yandex, Seznam, Naver … right away which pages changed (Google does not use IndexNow).

The key is public on purpose: the file <key>.txt in the site root proves that we own the domain.
The script finds the key file itself (a .txt in the root whose name is 32 hex characters and equals its content).

Run in the repo folder, AFTER the changes are live (pushed to main, about 1 minute):
  python3 tools/indexnow.py                      # dry run: list the URLs from sitemap.xml with <lastmod> = today
  python3 tools/indexnow.py --since 2026-11-20   # dry run: all URLs changed on or after this date
  python3 tools/indexnow.py --send               # really submit (same selection)
  python3 tools/indexnow.py --send https://deutsch-mit-dennis.de/pruefung/   # submit only these URLs

Without --send nothing is sent. At most 10,000 URLs per request (IndexNow limit).
"""
import datetime
import json
import os
import re
import sys
import urllib.error
import urllib.request

R = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
HOST = "deutsch-mit-dennis.de"
SITE = f"https://{HOST}"
ENDPOINT = "https://api.indexnow.org/indexnow"


def find_key():
    for f in sorted(os.listdir(R)):
        m = re.fullmatch(r"([0-9a-f]{32})\.txt", f)
        if m and open(os.path.join(R, f), encoding="utf-8").read().strip() == m.group(1):
            return m.group(1)
    raise SystemExit("No IndexNow key file (<32 hex>.txt with the key as content) in the site root.")


def changed_urls(since):
    xml = open(os.path.join(R, "sitemap.xml"), encoding="utf-8").read()
    return [loc for loc, mod in re.findall(r"<loc>([^<]+)</loc><lastmod>([^<]+)</lastmod>", xml) if mod >= since]


def main(argv):
    send = "--send" in argv
    since = datetime.date.today().isoformat()
    if "--since" in argv:
        since = argv[argv.index("--since") + 1]
    urls = [a for a in argv if a.startswith(SITE)] or changed_urls(since)
    if not urls:
        print(f"No changed URLs (lastmod >= {since}) in sitemap.xml.")
        return
    key = find_key()
    print(f"{len(urls)} URL(s){'' if any(a.startswith(SITE) for a in argv) else f' with lastmod >= {since}'}:")
    for u in urls[:20]:
        print("  " + u)
    if len(urls) > 20:
        print(f"  … and {len(urls) - 20} more")
    if not send:
        print("Dry run – nothing sent. Add --send to submit (only after the pages are live).")
        return
    body = json.dumps({"host": HOST, "key": key, "keyLocation": f"{SITE}/{key}.txt", "urlList": urls[:10000]}).encode()
    req = urllib.request.Request(ENDPOINT, data=body, headers={"Content-Type": "application/json; charset=utf-8"}, method="POST")
    try:
        with urllib.request.urlopen(req, timeout=30) as r:
            print(f"IndexNow answered {r.status} (200/202 = accepted).")
    except urllib.error.HTTPError as e:
        # 403: key file not reachable yet (push first), 422: URLs do not belong to the host, 429: too many requests
        print(f"IndexNow error {e.code}: {e.reason}")
        sys.exit(1)


if __name__ == "__main__":
    main(sys.argv[1:])
