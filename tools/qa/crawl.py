#!/usr/bin/env python3
"""Site crawler: opens every #route reachable from the start page (phone size) and reports
JS errors, HTTP errors, "Nicht gefunden" pages, horizontal page overflow and missing local files.

Usage (from repo root):
  python3 -m http.server 8765 &          # serve the site locally
  python3 tools/qa/crawl.py [base_url] [width]
Results: qa-out/crawl.json (+ summary on stdout). Needs: pip install playwright && playwright install chromium
"""
import asyncio, json, os, sys, urllib.request
from playwright.async_api import async_playwright

BASE = sys.argv[1] if len(sys.argv) > 1 else "http://localhost:8765/"
WIDTH = int(sys.argv[2]) if len(sys.argv) > 2 else 390
OUT = "qa-out"
SKIP = ("/run", "ergebnis")  # running exams / result pages need state


async def main():
    os.makedirs(OUT, exist_ok=True)
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        ctx = await browser.new_context(viewport={"width": WIDTH, "height": 844}, is_mobile=True, has_touch=True)
        page = await ctx.new_page()
        errs, cur = [], {"r": ""}
        page.on("pageerror", lambda e: errs.append((cur["r"], "JS", str(e)[:200])))
        page.on("console", lambda m: errs.append((cur["r"], "console", m.text[:200])) if m.type == "error" else None)
        page.on("response", lambda r: errs.append((cur["r"], f"HTTP{r.status}", r.url)) if r.status >= 400 and r.url.startswith(BASE) else None)
        await page.goto(BASE)
        await page.wait_for_timeout(1500)
        seen, queue, res, assets = set(), [("", "")], [], set()
        while queue and len(seen) < 5000:
            r, parent = queue.pop(0)
            if r in seen:
                continue
            seen.add(r)
            cur["r"] = r
            await page.evaluate("h => { location.hash = h }", "#" + r)
            await page.wait_for_timeout(220)
            info = await page.evaluate("""() => {
              const m = document.querySelector('main') || document.body;
              const links = [...document.querySelectorAll('a[href]')].map(a => a.getAttribute('href'));
              const files = [...document.querySelectorAll('a[href],img[src],audio[src],source[src],video[src],iframe[src]')]
                .map(a => a.href || a.src).filter(u => u && u.startsWith(location.origin) && !u.includes('#'));
              return { links, files, sw: document.documentElement.scrollWidth, iw: innerWidth,
                       len: (m.innerText || '').trim().length,
                       h1: (document.querySelector('main h1') || {}).innerText || '' };
            }""")
            assets.update(info["files"])
            res.append({"route": r, "from": parent, "overflow": info["sw"] > info["iw"] + 1,
                        "textLen": info["len"], "h1": info["h1"]})
            for link in info["links"]:
                if link.startswith("#") and len(link) > 1 and not any(s in link for s in SKIP) and link[1:] not in seen:
                    queue.append((link[1:], r))
        await browser.close()

    missing = []
    for url in sorted(assets):
        try:
            urllib.request.urlopen(urllib.request.Request(url.split("?")[0], method="HEAD"), timeout=10)
        except Exception as e:
            missing.append((url, str(e)[:60]))
    notfound = [x for x in res if "gefunden" in x["h1"].lower() or x["textLen"] < 80]
    overflow = [x["route"] for x in res if x["overflow"]]
    json.dump({"routes": res, "errors": errs, "missingFiles": missing, "notFound": notfound, "overflow": overflow},
              open(f"{OUT}/crawl.json", "w"), ensure_ascii=False, indent=1)
    print(f"{len(res)} routes, {len(assets)} local files checked")
    print(f"JS/HTTP errors: {len(errs)}");  [print("  ", e) for e in errs[:30]]
    print(f"Missing files: {len(missing)}"); [print("  ", m) for m in missing[:30]]
    print(f"Empty / not found pages: {len(notfound)}"); [print("  ", x["route"], "<-", x["from"]) for x in notfound[:30]]
    print(f"Horizontal overflow: {len(overflow)}"); [print("  ", o) for o in overflow[:30]]


asyncio.run(main())
