# Portfolio redesign — design canvas

Working files for https://claude.ai/code/artifact/97ea42e4-d086-4f0e-8938-aed853dc279c

Edit these and re-seed. Never edit `kushal-amin-portfolio.html` — it is generated.

    node "<design-skill>/seed-canvas.mjs" \
      --template "<design-skill>/payload.template.html" \
      --out kushal-amin-portfolio.html --title "Kushal Amin Portfolio" \
      --artboard Main.dc.html --artboard Project.dc.html --artboard Mobile.dc.html \
      --canvas canvas.json

| File | What it is |
|---|---|
| `Main.dc.html` | Home, desktop. Scrubbable 8-year timeline (drag or tap), 9 stops, plus the AI section and a 9-card work grid. |
| `Project.dc.html` | Command Center case study. Clickable 4-layer stack. |
| `Mobile.dc.html` | Home at 390. Same timeline, touch-enabled. |

## Positioning

"I build the whole product — then point AI at the busywork."

Product engineer who ships end to end, now moving toward applied AI.
Eight years and three industries carry the credibility; the AI section
carries the direction. Neither swallows the other — the timeline is
mostly non-AI, and the hero says both in one line.

Page order is deliberate: hero (both) → what "database to pixel" means →
eight years of doing it → where AI earns its place → the work → contact.

## Design system

- Paper `#F5F2EA` · card `#FFFDF8` · ink `#141210` · body `#35302A` · muted `#7C746A`
- Era colours: healthcare `#0E9C87` · banking `#2F5FE0` · automotive `#E2542C` · AI `#6D46D9`
- Highlight `#FFD84D`. Hard 2px borders, offset shadows, slight rotations.
- Bricolage Grotesque (display) · Instrument Sans (body) · Space Mono (labels)

## Timeline data

The `years()` method in `Main.dc.html` is the source of truth; `Mobile.dc.html`
carries a copy. Artboards share nothing at runtime, so edit both together.

## Outstanding

- **Dates unconfirmed.** Express Scripts is shown across 2018–19 and Bank of
  America in 2020. Only Sept 2018 and July 2021 are pinned by the record.
- Portrait placeholder expects `img/kushal.jpg`, 3:4.
- Email is a bracketed placeholder in both footers.
