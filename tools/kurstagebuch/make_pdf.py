"""Build the printable PDFs of one Kurstagebuch day.

Usage:  py -X utf8 tools/kurstagebuch/make_pdf.py 2026-11-19 [outdir]
        creates three PDFs in kurstagebuch/<date>/:
          protokoll-<date>.pdf          protocol, German + 8 languages      (/kurstagebuch/<date>/?alle=1)
          protokoll-<date>-deutsch.pdf  protocol, German only, two columns  (/kurstagebuch/<date>/?druck=de)
          arbeitsblatt-<date>.pdf       worksheet + solutions page          (/kurstagebuch/<date>/ueben/?druck=blatt)

- creates kurstagebuch/<date>/qr-ueben.svg if missing (segno)
- serves the repo root with http.server on a free port
- renders each page in Playwright Chromium (print media, A4, same margins + footer with page numbers)
- recompresses each PDF with PyMuPDF if installed and copies it to outdir if given
- the worksheet is skipped (with a message) if kurstagebuch/daten/<date>-ueben.js is missing
Requires: pip install segno playwright && playwright install chromium   (optional: pip install pymupdf)
"""
import functools
import http.server
import re
import shutil
import socket
import sys
import threading
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
SITE = "https://deutsch-mit-dennis.de"
FOOTER = (
    '<div style="width:100%;font-size:7px;color:#566078;font-family:Arial,sans-serif;'
    'padding:0 12mm;display:flex;justify-content:space-between">'
    '<span>created by D.Prudnikau · deutsch-mit-dennis.de</span>'
    '<span><span class="pageNumber"></span> / <span class="totalPages"></span></span></div>'
)


def free_port() -> int:
    with socket.socket() as s:
        s.bind(("127.0.0.1", 0))
        return s.getsockname()[1]


class QuietHandler(http.server.SimpleHTTPRequestHandler):
    def log_message(self, *args):  # keep console clean
        pass


def ensure_qr(day_dir: Path, date: str) -> None:
    qr = day_dir / "qr-ueben.svg"
    if qr.exists():
        return
    import segno

    segno.make(f"{SITE}/kurstagebuch/{date}/ueben/", error="m").save(str(qr), scale=8, border=2)
    print(f"QR created: {qr}")


def shrink(pdf: Path) -> None:
    """Optional: recompress the Chromium PDF with PyMuPDF (about half the size). Skipped if not installed."""
    try:
        import pymupdf
    except ImportError:
        return
    tmp = pdf.with_suffix(".tmp.pdf")
    before = pdf.stat().st_size
    with pymupdf.open(pdf) as doc:
        doc.save(tmp, garbage=4, deflate=True, deflate_fonts=True, use_objstms=1)
    if tmp.stat().st_size < before:
        tmp.replace(pdf)
        print(f"Compressed: {before // 1024} KB -> {pdf.stat().st_size // 1024} KB")
    else:
        tmp.unlink()


def main() -> int:
    if len(sys.argv) < 2 or not re.fullmatch(r"\d{4}-\d{2}-\d{2}", sys.argv[1]):
        print(__doc__)
        return 2
    date = sys.argv[1]
    outdir = Path(sys.argv[2]).resolve() if len(sys.argv) > 2 else None
    day_dir = ROOT / "kurstagebuch" / date
    if not (day_dir / "index.html").exists():
        print(f"Missing page shell: {day_dir / 'index.html'}")
        return 1
    if not (ROOT / "kurstagebuch" / "daten" / f"{date}.js").exists():
        print(f"Missing data file: kurstagebuch/daten/{date}.js")
        return 1
    ensure_qr(day_dir, date)

    port = free_port()
    handler = functools.partial(QuietHandler, directory=str(ROOT))
    server = http.server.ThreadingHTTPServer(("127.0.0.1", port), handler)
    threading.Thread(target=server.serve_forever, daemon=True).start()
    # (pdf, page path + query, selector that shows the page has rendered)
    variants = [
        (day_dir / f"protokoll-{date}.pdf", f"/kurstagebuch/{date}/?alle=1", ".kt-section"),
        (day_dir / f"protokoll-{date}-deutsch.pdf", f"/kurstagebuch/{date}/?druck=de", ".kt-section"),
    ]
    if (ROOT / "kurstagebuch" / "daten" / f"{date}-ueben.js").exists() and (day_dir / "ueben" / "index.html").exists():
        variants.append((day_dir / f"arbeitsblatt-{date}.pdf", f"/kurstagebuch/{date}/ueben/?druck=blatt", ".kb-set"))
    else:
        print(f"Worksheet skipped: kurstagebuch/daten/{date}-ueben.js or {date}/ueben/index.html missing")
    try:
        from playwright.sync_api import sync_playwright

        with sync_playwright() as p:
            browser = p.chromium.launch()
            for pdf, path, selector in variants:
                page = browser.new_page()
                errors = []
                page.on("pageerror", lambda e: errors.append(str(e)))
                page.goto(f"http://127.0.0.1:{port}{path}", wait_until="networkidle")
                page.wait_for_selector(selector, timeout=15000)
                page.evaluate("document.fonts.ready")
                page.emulate_media(media="print")
                page.pdf(
                    path=str(pdf),
                    format="A4",
                    print_background=True,
                    margin={"top": "12mm", "bottom": "14mm", "left": "12mm", "right": "12mm"},
                    display_header_footer=True,
                    header_template="<div></div>",
                    footer_template=FOOTER,
                )
                page.close()
                if errors:
                    print("JS errors on page:", *errors, sep="\n  ")
            browser.close()
    finally:
        server.shutdown()
        server.server_close()
    for pdf, _, _ in variants:
        shrink(pdf)
        print(f"PDF: {pdf}")
        if outdir:
            outdir.mkdir(parents=True, exist_ok=True)
            # copies for the WhatsApp group get Dennis' names: "19.11.26_Kurze Version-deutsch.pdf" …
            y, m, d = date.split("-")
            nice = {f"protokoll-{date}-deutsch.pdf": "Kurze Version-deutsch",
                    f"protokoll-{date}.pdf": "Lange Version mit Übersetzungen",
                    f"arbeitsblatt-{date}.pdf": None}.get(pdf.name, pdf.name)
            day = f"{d}.{m}.{y[2:]}"
            # one folder per lesson day, like Dennis keeps it: <outdir>/19.11.26/
            target_dir = outdir / day
            target_dir.mkdir(parents=True, exist_ok=True)
            if pdf.name == f"arbeitsblatt-{date}.pdf":
                target = target_dir / f"Arbeitsblatt {day}.pdf"
            else:
                target = target_dir / f"{day}_{nice}.pdf"
            if target.exists() and "--force" not in sys.argv:
                print(f"Exists, not overwritten (use --force): {target}")
                continue
            shutil.copy2(pdf, target)
            print(f"Copied to: {target}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
