# Rounak Burman — portfolio

Live at **https://ron997.github.io**

A one-page portfolio that reads its own resume: the first screen shows page one of
the resume being parsed (56 layout elements PyMuPDF extracted from the PDF, the phone
number redacted), and every section below is one of those extracted fields set at
full scale. Built with React, Vite and TypeScript; motion with
[Motion](https://motion.dev) and [Lenis](https://lenis.darkroom.engineering).

## Run it locally

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # type-check and build to dist/
npm run preview    # serve dist/ at http://localhost:4173
```

## Edit the content

All copy lives in **`src/content/resume.ts`**: name, contact links, summary, skills,
every role and bullet, the results ledger, projects and education. Components only
lay it out.

- `metrics` on a bullet are substrings that get the yellow highlighter.
- `tools` are substrings set in bold.
- `results` entries name the bullet they come from (`source`), so the ledger can
  show the resume line number.

## When the resume PDF changes

The hero image and the layout data are generated from the PDF. Put the new
`Rounak Burman - Resume.pdf` (and, if it changes, the portrait JPEG) in the project
root, then run:

```bash
npm run assets     # needs Python 3 with PyMuPDF and Pillow: pip install pymupdf pillow
```

This rewrites `public/Rounak-Burman-Resume.pdf`, `src/assets/resume-page-*.webp`,
`src/data/resume-layout.json` and the portrait files. The phone number is found and
redacted automatically; the script refuses to write layout data that still contains it.
The raw PDF and photo in the project root are git-ignored on purpose.

## Deploy

Pushing to `main` runs `.github/workflows/deploy.yml`, which builds the site and
publishes `dist/` to GitHub Pages. In the repository settings, **Pages → Source**
must be set to **GitHub Actions** (one time).

## Design

- `PRODUCT.md` — who the site is for and what it must never claim.
- `DESIGN.md` — the visual system (tokens, type, motion, rules).
- The direction contract is the HTML comment at the top of `<body>` in `index.html`.
