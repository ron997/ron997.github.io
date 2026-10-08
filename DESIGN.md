---
name: Rounak Burman Portfolio
description: A resume being read by a layout model; every section is an extracted field set at full scale.
colors:
  annotation-yellow: "#FFD21F"
  signal-ink: "#14171C"
  canvas: "#F1F2EF"
  panel-light: "#E4E6E2"
  paper: "#FAFAF8"
  night: "#14171C"
  night-2: "#1D2127"
  night-3: "#2A2F36"
  ink: "#14171C"
  ink-2: "#4C5159"
  ink-3: "#62676F"
  on-night: "#EEEFEC"
  on-night-2: "#A3A8AF"
  rule: "#CDD0CB"
  rule-night: "#343940"
typography:
  display:
    fontFamily: "Archivo Variable, Archivo, system-ui, sans-serif"
    fontSize: "min(13rem, 100cqw / measured-ratio)"
    fontWeight: 850
    lineHeight: 0.74
    letterSpacing: "-0.045em"
    fontVariation: "'wdth' 112"
  display-name:
    fontFamily: "Archivo Variable, Archivo, system-ui, sans-serif"
    fontSize: "100cqw / measured-ratio"
    fontWeight: 850
    lineHeight: 0.84
    letterSpacing: "-0.045em"
    fontVariation: "'wdth' 112"
  headline:
    fontFamily: "Archivo Variable, Archivo, system-ui, sans-serif"
    fontSize: "clamp(1.75rem, 2.6vw, 2.75rem)"
    fontWeight: 800
    lineHeight: 1
    letterSpacing: "-0.035em"
    fontVariation: "'wdth' 108"
  lead:
    fontFamily: "Archivo Variable, Archivo, system-ui, sans-serif"
    fontSize: "clamp(1.75rem, 3.35vw, 3.35rem)"
    fontWeight: 600
    lineHeight: 1.14
    letterSpacing: "-0.028em"
  title:
    fontFamily: "Archivo Variable, Archivo, system-ui, sans-serif"
    fontSize: "clamp(1.0625rem, 1.3vw, 1.25rem)"
    fontWeight: 600
    lineHeight: 1.4
  body:
    fontFamily: "Archivo Variable, Archivo, system-ui, sans-serif"
    fontSize: "clamp(1rem, 1.05vw, 1.125rem)"
    fontWeight: 400
    lineHeight: 1.55
  label:
    fontFamily: "Fragment Mono, ui-monospace, Cascadia Mono, SFMono-Regular, monospace"
    fontSize: "0.8125rem"
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: "0"
    fontFeature: "'tnum' 1"
  chip-label:
    fontFamily: "Fragment Mono, ui-monospace, Cascadia Mono, SFMono-Regular, monospace"
    fontSize: "12px"
    fontWeight: 400
    lineHeight: 1.3
    letterSpacing: "0"
rounded:
  bracket: "3px"
  inner: "18px"
  card: "clamp(20px, 2vw, 28px)"
  panel: "clamp(28px, 3vw, 44px)"
  pill: "999px"
spacing:
  gutter: "clamp(12px, 1.6vw, 24px)"
  inset: "clamp(20px, 4vw, 64px)"
  section-y: "clamp(64px, 8vw, 112px)"
  gap-block: "clamp(48px, 5.6vw, 88px)"
  container: "1600px"
  nav-h: "76px"
components:
  button-primary:
    backgroundColor: "{colors.annotation-yellow}"
    textColor: "{colors.signal-ink}"
    rounded: "{rounded.pill}"
    padding: "0 22px 0 26px"
    height: "54px"
  button-primary-hover-on-light:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.on-night}"
  button-primary-hover-on-night:
    backgroundColor: "{colors.on-night}"
    textColor: "{colors.ink}"
  button-ink:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.on-night}"
    rounded: "{rounded.pill}"
    padding: "0 22px 0 26px"
    height: "54px"
  button-ink-hover:
    backgroundColor: "{colors.night-3}"
  button-ghost:
    textColor: "{colors.on-night}"
    rounded: "{rounded.pill}"
    padding: "0 22px 0 26px"
    height: "54px"
  button-small:
    rounded: "{rounded.pill}"
    padding: "0 16px 0 20px"
    height: "44px"
  chip:
    backgroundColor: "{colors.night-3}"
    textColor: "{colors.on-night}"
    rounded: "{rounded.pill}"
    padding: "0 13px"
    height: "34px"
  detection-chip:
    backgroundColor: "{colors.annotation-yellow}"
    textColor: "{colors.signal-ink}"
    typography: "{typography.chip-label}"
    rounded: "{rounded.bracket}"
    padding: "3px 8px 3px 7px"
  panel-night:
    backgroundColor: "{colors.night}"
    textColor: "{colors.on-night}"
    rounded: "{rounded.panel}"
    padding: "{spacing.section-y} {spacing.inset}"
  panel-light:
    backgroundColor: "{colors.panel-light}"
    textColor: "{colors.ink}"
    rounded: "{rounded.panel}"
    padding: "{spacing.section-y} {spacing.inset}"
  panel-signal:
    backgroundColor: "{colors.annotation-yellow}"
    textColor: "{colors.signal-ink}"
    rounded: "{rounded.panel}"
  role-card:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.card}"
    padding: "clamp(24px, 3.4vw, 52px)"
---

# Design System: Rounak Burman Portfolio

## Overview

**Creative North Star: "Parsed"**

The page is his own resume being read by a layout model. The first viewport shows the real resume page, tilted, with its layout elements landing as yellow bounding boxes in reading order; everything below it is one extracted field set at full scale. The grammar is Curvedpixel's: container-sized giant words that the next panel tucks up under, rounded light and dark panels on a pale canvas, a single accent, pill buttons, a black-and-white photograph with a colour twin, scroll-scrubbed word reveal, count-up figures, and sticky stacked cards under Lenis smooth scroll. That grammar is re-keyed here with annotation yellow, Archivo at wide widths with Fragment Mono for machine labels, and bounding-box corner brackets.

The density is editorial rather than dashboard. Each section has one giant header, one panel, and one reading structure (a ledger, a stack, field rows), with generous space between them. The machine layer of boxes, class chips, line numbers and a "redacted" label sits on top of human-scale type and never replaces it. The design explicitly turns down the terminal-styled hero, the skill-chip cloud, and the project card grid.

**Key Characteristics:**
- Giant uppercase section words: they are the resume's own section headers, sized to the container and tucked onto the panel below.
- Annotation yellow is the only accent. It is used for detection boxes, highlighter marks and the primary action, and nowhere else.
- Detection boxes have corner brackets, drawn edges and a mono class chip on the box corner.
- Rounded night, light and yellow panels sit on a pale canvas.
- Pill buttons whose arrow pulls away on hover.
- The motion explains the parse. Under reduced motion it resolves to the finished state.

## Colors

The palette is cool neutral greys and a near-black "night", plus one saturated annotation yellow.

### Primary
- **Annotation Yellow** (annotation-yellow): the highlighter and bounding-box colour. It is used for detection boxes and their class chips, the `mark` highlighter sweep, the hero's layout boxes and wire, text selection, the primary pill, and the yellow Contact panel. Text on it is always Signal Ink.

### Neutral
- **Canvas** (canvas): the page ground behind all panels, and the theme colour.
- **Light Panel** (panel-light): the light rounded panels (Experience, Skills, Projects). It is also the shade colour a stacked role card fades toward as the next card pushes it.
- **Paper** (paper): the role cards inside the Experience stack. It is the brightest surface, so the cards read as sheets lifted off the panel.
- **Night** (night): the dark panels (Hero, Results, Education). It has the same value as Ink, so dark panels and type share one black.
- **Night 2 / Night 3** (night-2, night-3): night-2 is the ledger row hover and the portrait backing. night-3 is the chip fill on night and the hover fill for ink and ghost pills.
- **Ink / Ink 2 / Ink 3** (ink, ink-2, ink-3): primary text, secondary text (role titles, stack items), and tertiary text (meta keys, sources).
- **On Night / On Night 2** (on-night, on-night-2): primary and secondary text on night panels.
- **Rule / Rule Night** (rule, rule-night): 1px hairlines between rows, field keys and degrees, on light and dark ground respectively. Rule is also the colour of the "/" separator in stack and skill lists.

### Named Rules
**The Annotation-Only Rule.** Yellow appears in three roles: the detection box (with its chip), the highlight (`mark`), and the primary action. Result figures, headings, icons and decorative fills are never yellow. The yellow surname in the hero is the end of the title wire, so it counts as an annotation of the extracted title; it is not licence for yellow display type anywhere else.

**The Ink-on-Signal Rule.** On a yellow ground the annotation layer flips. Boxes are drawn in Ink, chip text is yellow on Ink, selection is Ink with yellow text, and the focus ring is Ink.

## Typography

**Display Font:** Archivo Variable (with Archivo, system-ui fallback)
**Body Font:** Archivo Variable (the same family, at normal width)
**Label/Mono Font:** Fragment Mono (with ui-monospace, Cascadia Mono, SFMono-Regular)

**Character:** Archivo set wide and very heavy (850 at 112% width) carries the human voice at scale. Fragment Mono at 12 to 13px is the model's voice: class names, line numbers, field keys, table headers. Wide heavy type is the person and small mono is the parser.

### Hierarchy
- **Display** (850, 112% width, sized to the container, capped at 13rem / 208px, line-height 0.74, -0.045em, uppercase): the giant section words. Only Results, Work experience, Technical skills, Projects and Education use it.
- **Display Name** (850, 112% width, sized to the container, line-height 0.84): the hero name, two lines. The contact email uses the same fitted treatment at 104% width.
- **Headline** (800, 108% width, clamp(1.75rem, 2.6vw, 2.75rem), line-height 1, -0.035em): role organisations, project names and degree names.
- **Lead** (600, clamp(1.75rem, 3.35vw, 3.35rem), line-height 1.14, -0.028em): the summary paragraph, revealed word by word. The contact lead uses a smaller step of the same voice.
- **Title** (600, clamp(1.0625rem, 1.3vw, 1.25rem)): role titles, schools, project stack items, ledger result text.
- **Body** (400, clamp(1rem, 1.05vw, 1.125rem), line-height 1.55): running text and bullets, kept to about 70ch.
- **Label** (Fragment Mono 400, 0.8125rem, line-height 1.4, tracking 0, tabular figures): field keys, table headers, sources, meta, footer note. It is set in lowercase or as written, never letterspaced uppercase.

### Named Rules
**The Container-Fit Rule.** One-line display type (the giant words, the hero name, the contact email) is sized to its container, never to the viewport. The hook measures the text's width-to-size ratio once per font load, with the element at a fixed 100px and its transitions off. CSS then sets `font-size: min(max, 100cqw / ratio)` inside an inline-size container. This lets long words shrink while short ones reach the cap, and resizing never waits on a script.

**The Em-Only Padding Rule.** A fitted element carries only em padding, so the measured ratio scales exactly. Any clearance a detection bracket needs comes from the detection box's own padding (`--det-pad`) reaching past the text, never from px padding on the measured element.

**The Two Voices Rule.** Mono is reserved for what the parser says: classes, line numbers, keys, counts and sources. Human claims are set in Archivo.

## Layout

The content sits in one centred container (1600px max, with a fluid gutter of 12 to 24px either side). Each section is a giant header followed by one rounded panel whose inner padding is the fluid inset (20 to 64px). Section rhythm is `section-y` (64 to 112px), and blocks inside a section are separated by `gap-block` (48 to 88px). Fixed values sit on an 8px grid. The sticky nav is 76px tall (64px at 760px and below), and anchor scrolling clears it.

Giant words are left-aligned to the content edge and sit on the following panel's top edge. The panel tucks up to the word's baseline (`margin-top: 0`, line-height 0.74) so the word stands on it.

Section structures as built:
- **Hero:** a night panel with two columns, the parsed page on the left and key/value field rows on the right (a mono key over a hairline, then the value). Below 1024px it becomes one column in the order name, summary, contact, page, skills.
- **Results:** one ledger table on night with four columns (figure, result, method, source). Each row traces back to its resume line. Below 960px every row becomes a block with the figure leading.
- **Experience:** on desktop (1024px wide and 700px tall or more), role cards sit in a sticky stack inside a light panel. Each card sizes to its content, and card N scales to 0.92 and shades as card N+1 arrives. Below that breakpoint they are a plain column with 20px gaps.
- **Skills and Projects:** parsed field rows on the light panel (a key column of 3–4fr and a value column of 8–9fr, separated by hairlines). They collapse to one column at 760px.
- **Education:** a portrait plus degree list on night, splitting 5fr/7fr, one column at 860px.
- **Contact:** the yellow panel, with a lead, the fitted email in a detection box, and pills.

## Elevation & Depth

Depth comes mostly from tone. Panels are flat, and contrast between canvas, light panel, night and paper separates the planes. Only two shadows exist, and both mean "this is a sheet of paper": the tilted resume page in the hero, and the role cards in the stack. Hover is shown by tone shifts (a fill or background change), never by lift.

### Shadow Vocabulary
- **Card sheet** (`box-shadow: 0 18px 44px rgba(20,23,28,0.10), 0 2px 6px rgba(20,23,28,0.05)`): role cards in the Experience stack only.
- **Page on night** (`box-shadow: 0 34px 80px rgba(0,0,0,0.5), 0 2px 0 rgba(255,255,255,0.05)`): the resume page lying on the hero's night panel.

### Named Rules
**The Paper-Only Shadow Rule.** A shadow means a physical sheet. Panels, pills, chips and rows stay flat.

## Shapes

There are two corner languages, and they do not mix. Containers are soft: panels use 28–44px, cards and the portrait 20–28px, pills and chips are fully round. The annotation layer is sharp: boxes are 1.5px lines with 16px corner brackets (4px thick, set 2px outside the box), and class chips are 3px tabs with the corner nearest the box squared off. Lists use the same corner bracket in place of a bullet: role bullets are a 10px top-left bracket in Ink. The nav monogram is framed by four 9px corner brackets.

## Components

### Buttons
The grammar is a pill whose arrow pulls away on hover.
- **Shape:** fully round (999px), 54px tall, padding 0 22px 0 26px, 600 weight at 1rem, with an 18px trailing icon.
- **Primary:** Annotation Yellow with Signal Ink text. On light ground it hovers to Ink with On Night text; on night it hovers to On Night with Ink text.
- **Ink:** an Ink fill with On Night text, hovering to night-3.
- **Ghost:** a 1.5px inset ring in currentColor. On night it hovers to a night-3 fill, on light to 7% Ink.
- **Hover motion:** the icon gap widens from 10px to 16px over 0.5s on the hover ease, and the colours swap over 0.3s on the house ease. Hover effects apply only on hover-capable pointers.
- **Small:** 44px tall, padding 0 16px 0 20px, 0.9375rem. Used in the nav.

### Chips
- **Style:** fully round, 34px tall, padding 0 13px, 0.875rem at 500. The fill is night-3 on night and 7% Ink on light. Chips are used only for the hero's short selected-skills row, never as a skill cloud.
- **Role tags:** a mono hairline-ring variant (inset 1px Rule, 3px 9px). These are pipeline-derived tags shown as derived and never presented as claims.

### Cards / Containers
- **Panels:** a panel radius, filled night, light or yellow, padded section-y by inset. Panels are flat.
- **Role card:** a Paper ground with a card radius and the card shadow. A 4fr/7fr grid holds org, title and meta on the left and bullets on the right, with a hairline-topped tag row. It sizes to its content.
- **Project rows and skill rows are not cards.** They are hairline-separated field rows.

### Navigation
A sticky bar with a three-column grid: the bracket monogram plus name, centred links, and a small Email pill. Links are 500 weight at 0.9375rem, with a 2px Ink underline that wipes in from the left on hover. After scroll the bar turns solid as 86% canvas with a blur. At 900px and below the links move into a full-screen canvas sheet of giant 850-weight links divided by hairlines, opened from a 44px ringed toggle.

### Detection Box (signature)
This box wraps any element and draws itself once when the element is in view. The corners snap in, the four 1.5px edges draw over 0.7s, then the class chip lands. The chip is a 12px Fragment Mono label on a yellow tab attached to the box's top-left corner, or bottom-left with `below`. The chip text names a layout class and its reading order, for example `section-header · 11`, `table · derived · N rows`, `text · summary`. Chips belong to the annotation layer: they label the box they sit on and are never kickers or eyebrows above a heading.

### Hero Layout Boxes
One box is drawn per element that the build-time PyMuPDF pass extracted. Title and section headers get a 20% yellow fill, meta boxes are dashed, and hovering any box raises its fill to 42% and shows its label in the inspector line. Labels are placed by class so none covers the text it classifies. The title keeps its label above. Section headers and the contact line put theirs at the empty right end of the same line. The redaction label sits in the clear space above the bar. Every other label appears only on hover. The `pii.phone · redacted` label is always visible. Below 1024px the labels hide and the boxes remain.

### Results Ledger
A single-column table on night. Each row has the figure in Archivo 800 at 108% width with tabular figures and a count-up, the result in Title, then the method and source in mono. Rows are divided by hairlines and hover to night-2. Figures are On Night, not yellow.

### Portrait
A black-and-white photograph with its colour twin clipped to a detection box. The colour resolves upward inside the box once the portrait is in view, and fills the whole frame on hover. It has a mono caption pill on 78% night with a blur.

### Motion
CSS drives the entrance (`rise`: 24px and fade over 0.9s), so the LCP never waits on JS. Scroll-scrubbed motion covers the summary word reveal (rest opacity 0.18, with marks swept in over the same window), the stack push, and count-up. The eases are a long out-ease for reveals, a symmetric house ease for colour, and a slight-overshoot hover ease for the pill gap. Under reduced motion, animations jump to their end state and transitions are removed (`transition: none`). Scrubbed components render their final static markup.

## Do's and Don'ts

### Do:
- **Do** set every section heading as the resume's own section header: uppercase, 850 weight at 112% width, sized to the container by a measured ratio, left-aligned to the content edge, with a detection box and a `section-header · N` chip on the box corner.
- **Do** measure fitted type at a fixed 100px with transitions off, and remeasure when fonts load.
- **Do** get bracket clearance from the detection box padding (`--det-pad`), keeping only em padding on the measured element.
- **Do** keep yellow to boxes, `mark` highlights and the primary action. On a yellow panel, draw the annotation layer in Ink.
- **Do** keep the hero's `pii.phone · redacted` label always visible, and place every hero box label by class so it never covers its own text.
- **Do** present results as one ledger table with each row traced to its source line, projects as parsed field rows, and experience as content-sized cards in a sticky stack on desktop.
- **Do** make reduced motion mean the end state: zero animation duration and delay, `transition: none`.

### Don't:
- **Don't** colour result figures, headings or icons yellow.
- **Don't** put a class chip, or any small label, above a heading as a kicker or eyebrow. Chips attach to a box's corner.
- **Don't** size giant words or the hero name to the viewport (`vw`). Size them to the container.
- **Don't** set `transition-duration` on `*` for reduced motion. `transition-property` defaults to `all`, so doing that switches transitions on for every property and breaks fit measurement.
- **Don't** add px padding to a fitted element to make room for brackets.
- **Don't** build a project card grid, a skill-chip cloud, or a terminal-styled hero (prompt glyphs, green-on-black console type). The dark night panel itself is native to the world.
- **Don't** add shadows to panels, pills or chips. Shadows belong to paper sheets only.
