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
| `Main.dc.html` | The page. One continuous scroll, ten movements. Opens focused so it scrolls like a real site. |
| `Project.dc.html` | Command Center case study. Clickable 4-layer stack. |
| `Mobile.dc.html` | The page at 390. |

## Positioning

"I build the whole product — then point AI at the busywork."

Product engineer who ships end to end, now moving toward applied AI.
Eight years and three industries carry the credibility; the AI section
carries the direction. The timeline is mostly non-AI; the hero says both.

## Page as a journey

Ten movements, no hard seams between any of them — colour bleeds through
gradient blends instead:

1. Hero + scroll cue  2. One-line statement on ink  3. Four layers (sticky heading)
4. **The journey** — nine year-panels  5. Where AI earns its place
6. Work strip (drag sideways, snap)  7. Numbers  8. Stack ticker
9. Away from work  10. Contact

The timeline is the spine, not a widget. Each year pins its big number and
company to the left while the story scrolls past, then swaps at the next
year. Backgrounds carry the industry (teal → blue → orange → violet) and
blend at each change of industry. Sticky year chips jump anywhere.

## Motion

All CSS, no scroll listeners. Everything scroll-driven sits inside
`@supports (animation-timeline: view())` with the base state visible, so a
browser without support renders a normal, complete page rather than
stranding content at `opacity: 0`.

- `.rise` — blocks lift in on entry (`view()`)
- `.prog` — top progress bar (`scroll()`)
- `.drift` — slow parallax on the hero and AI shapes
- `.kx-tick` / `.bounce` — plain infinite animations

## Design system

- Paper `#F5F2EA` · card `#FFFDF8` · ink `#141210` · body `#35302A` · muted `#7C746A`
- Era colours: healthcare `#0E9C87` · banking `#2F5FE0` · automotive `#E2542C` · AI `#6D46D9`
  Panel tints are keyed off these in `tint()` in `Main.dc.html`.
- Highlight `#FFD84D`. Hard 2px borders on cards only; slight rotations.
- Bricolage Grotesque (display) · Instrument Sans (body) · Space Mono (labels)
- Display sizes use `clamp()` — the artboard opens fluid-width.

## Timeline data

`years()` in `Main.dc.html` is the source of truth; `Mobile.dc.html` carries
a copy. Artboards share nothing at runtime, so edit both together.

## Outstanding

- **Dates unconfirmed.** Express Scripts spans 2018–19 and Bank of America
  sits in 2020. Only Sept 2018 and July 2021 are pinned by the record.
- Portrait placeholder expects `img/kushal.jpg`, 3:4.
- Email is a bracketed placeholder in both footers.
