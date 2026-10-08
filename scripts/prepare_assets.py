"""Build-time asset preparation for the portfolio (run locally, outputs are committed).

    npm run assets          # == python -P scripts/prepare_assets.py

Inputs (kept out of git, see .gitignore):
    Rounak Burman - Resume.pdf
    WhatsApp Image 2026-10-08 at 6.24.21 PM.jpeg      (graduation portrait)

Outputs:
    public/Rounak-Burman-Resume.pdf                   the downloadable resume
    src/assets/resume-page-{816,1224,1836}.webp        page 1 rendered, phone number redacted
    src/data/resume-layout.json                       layout elements read from the PDF with PyMuPDF
    src/assets/portrait-{bw,colour}.{avif,webp}       the art-directed B/W file and its colour twin
    public/apple-touch-icon.png

The layout elements are the hero's evidence: every box drawn over the page on the
site is one of these, at the coordinates PyMuPDF reported. Spans are grouped into
visual segments (a line splits wherever the horizontal gap is large, so right-
aligned dates separate from the left text), then classified by typography.
"""
from __future__ import annotations

import json
import re
import shutil
import sys
from pathlib import Path

import pymupdf
from PIL import Image, ImageDraw, ImageEnhance, ImageOps

ROOT = Path(__file__).resolve().parent.parent
PDF = ROOT / "Rounak Burman - Resume.pdf"
PHOTO = ROOT / "WhatsApp Image 2026-10-08 at 6.24.21 PM.jpeg"
ASSETS = ROOT / "src" / "assets"
DATA = ROOT / "src" / "data"
PUBLIC = ROOT / "public"

INK = (20, 23, 28)
SIGNAL = (255, 210, 31)
PHONE_RE = re.compile(r"\+?\d[\d ()\-]{8,}\d")


def classify(seg: dict, page_w: float) -> str:
    t = seg["text"]
    if seg["size"] >= 16:
        return "title"
    if "@" in t and "|" in t:
        return "contact"
    if t.startswith("•"):
        return "list-item"
    if seg["bold"] and t.isupper() and seg["x0"] < 60:
        return "section-header"
    if seg["x0"] > page_w * 0.6 and not seg["bold"]:
        return "meta"
    if seg["italic"]:
        return "role"
    if seg["bold"] and ":" in t and seg["x0"] < 60:
        return "key-value"
    if seg["bold"]:
        return "org"
    return "text"


def extract_layout(page: pymupdf.Page) -> list[dict]:
    W = page.rect.width
    segments = []
    for b in page.get_text("dict")["blocks"]:
        if b.get("type") != 0:
            continue
        for line in b["lines"]:
            spans = sorted((s for s in line["spans"] if s["text"].strip()), key=lambda s: s["bbox"][0])
            if not spans:
                continue
            groups = [[spans[0]]]
            for s in spans[1:]:
                if s["bbox"][0] - groups[-1][-1]["bbox"][2] > 24:
                    groups.append([s])
                else:
                    groups[-1].append(s)
            for g in groups:
                segments.append({
                    "x0": min(s["bbox"][0] for s in g), "y0": min(s["bbox"][1] for s in g),
                    "x1": max(s["bbox"][2] for s in g), "y1": max(s["bbox"][3] for s in g),
                    "text": "".join(s["text"] for s in g).strip(),
                    "size": max(s["size"] for s in g),
                    "bold": any(("Bold" in s["font"]) or (s["flags"] & 16) for s in g),
                    "italic": all(("Italic" in s["font"]) or (s["flags"] & 2) for s in g),
                })
    segments.sort(key=lambda s: (round(s["y0"]), s["x0"]))

    elements: list[dict] = []
    for s in segments:
        cls = classify(s, W)
        prev = elements[-1] if elements else None
        # Continuation lines merge into the element they wrap from.
        if prev and cls in ("text", "key-value") and prev["cls"] in ("list-item", "text", "key-value") \
                and s["y0"] - prev["y1"] < 6 and s["x0"] >= prev["x0"] - 2 and not s["bold"]:
            prev["x1"] = max(prev["x1"], s["x1"])
            prev["y1"] = s["y1"]
            prev["text"] += " " + s["text"]
            continue
        elements.append({**s, "cls": cls})
    return elements


def main() -> int:
    if not PDF.exists():
        print(f"missing {PDF.name}", file=sys.stderr)
        return 1
    for d in (ASSETS, DATA, PUBLIC):
        d.mkdir(parents=True, exist_ok=True)

    shutil.copyfile(PDF, PUBLIC / "Rounak-Burman-Resume.pdf")

    doc = pymupdf.open(PDF)
    page = doc[0]
    W, H = page.rect.width, page.rect.height
    elements = extract_layout(page)

    # PII: the phone number is redacted on the rendered page and in the data.
    redactions = []
    for e in elements:
        for m in PHONE_RE.finditer(e["text"]):
            for r in page.search_for(m.group(0)):
                redactions.append({"cls": "pii.phone", "rect": r})
            e["text"] = e["text"].replace(m.group(0), "[phone redacted]")

    pix = page.get_pixmap(matrix=pymupdf.Matrix(3, 3), alpha=False)
    page_img = Image.frombytes("RGB", (pix.width, pix.height), pix.samples)
    draw = ImageDraw.Draw(page_img)
    scale = pix.width / W
    pad = 1.5
    for red in redactions:
        r = red["rect"]
        draw.rectangle([(r.x0 - pad) * scale, (r.y0 - pad) * scale, (r.x1 + pad) * scale, (r.y1 + pad) * scale], fill=INK)
    for old in ASSETS.glob("resume-page*.webp"):
        old.unlink()
    for w in (816, 1224, 1836):
        h = round(pix.height * w / pix.width)
        page_img.resize((w, h), Image.LANCZOS).save(ASSETS / f"resume-page-{w}.webp", quality=80, method=6)

    out = {
        "source": PDF.name,
        "extractor": f"PyMuPDF {pymupdf.VersionBind}",
        "page": [W, H],
        "elements": [{
            "order": i + 1,
            "cls": e["cls"],
            "bbox": [round(e["x0"] / W, 4), round(e["y0"] / H, 4), round(e["x1"] / W, 4), round(e["y1"] / H, 4)],
            "text": re.sub(r"\s+", " ", e["text"]).strip(),
        } for i, e in enumerate(elements)],
        "redactions": [{
            "cls": red["cls"],
            "bbox": [round((red["rect"].x0 - pad) / W, 4), round((red["rect"].y0 - pad) / H, 4),
                     round((red["rect"].x1 + pad) / W, 4), round((red["rect"].y1 + pad) / H, 4)],
        } for red in redactions],
    }
    (DATA / "resume-layout.json").write_text(json.dumps(out, ensure_ascii=False, indent=1), encoding="utf-8")
    assert not any(PHONE_RE.search(e["text"]) for e in out["elements"]), "phone number leaked into layout data"

    # Portrait: an art-directed B/W file and its colour twin (two files, not a CSS filter).
    if PHOTO.exists():
        colour = ImageOps.exif_transpose(Image.open(PHOTO)).convert("RGB")
        bw = ImageOps.grayscale(colour)
        bw = ImageOps.autocontrast(bw, cutoff=(0.5, 0.5))
        bw = ImageEnhance.Contrast(bw).enhance(1.08).convert("RGB")
        for name, im in (("colour", colour), ("bw", bw)):
            im.save(ASSETS / f"portrait-{name}.webp", quality=74, method=6)
            im.save(ASSETS / f"portrait-{name}.avif", quality=48)

    # Touch icon: ink tile, annotation-yellow corner brackets.
    s = 180
    icon = Image.new("RGB", (s, s), INK)
    d = ImageDraw.Draw(icon)
    inset, arm, w = 38, 34, 10
    for cx, cy, dx, dy in ((inset, inset, 1, 1), (s - inset, inset, -1, 1), (inset, s - inset, 1, -1), (s - inset, s - inset, -1, -1)):
        d.rectangle([min(cx, cx + dx * arm), min(cy, cy + dy * w), max(cx, cx + dx * arm), max(cy, cy + dy * w)], fill=SIGNAL)
        d.rectangle([min(cx, cx + dx * w), min(cy, cy + dy * arm), max(cx, cx + dx * w), max(cy, cy + dy * arm)], fill=SIGNAL)
    d.ellipse([s / 2 - 13, s / 2 - 13, s / 2 + 13, s / 2 + 13], fill=SIGNAL)
    icon.save(PUBLIC / "apple-touch-icon.png")

    classes = sorted({e["cls"] for e in out["elements"]})
    print(f"{len(out['elements'])} elements, {len(classes)} classes, {len(out['redactions'])} redaction(s)")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
