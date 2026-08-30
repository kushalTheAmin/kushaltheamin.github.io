# Portfolio redesign — design canvas

https://claude.ai/code/artifact/97ea42e4-d086-4f0e-8938-aed853dc279c

Edit `Main.dc.html`, re-seed, republish. Never edit the generated
`kushal-amin-portfolio.html`.

    node "<design-skill>/seed-canvas.mjs" \
      --template "<design-skill>/payload.template.html" \
      --out kushal-amin-portfolio.html --title "Kushal Amin Portfolio" \
      --artboard Main.dc.html --canvas canvas.json

## Direction D — soft light

Chosen from four options after the cream/orange/yellow system was rejected.

- Ground `#F7F8FC` with slow-drifting tinted blobs; cards plain `#FFFFFF`
- Accent cycles (see below); text `#15162B` / `#55566E` / `#7A7B92`
- Depth from shadow only. No borders, no hard edges, no rotations.
- Radii 12–24px. Plus Jakarta Sans throughout.
- Chapter washes on work cards: health `#E2F4EE`, cars `#FBEEDF`, AI `#EEECFD`

## UX rules this page follows

Every one came from explicit feedback on the previous version:

- **Short.** ~4,300px, down from 12,800. Seven sections.
- **One device.** Soft white cards. Nothing tilts, tickers or shouts.
- **Real nav.** Sticky, every item anchors to a section, back-to-top in the
  footer. All sections carry `scroll-margin-top`.
- **Nothing fires on scroll.** No reveals, no parallax, no progress bar.
- **Nine chips, one card** instead of nine full-screen year panels.

## Twelve palettes, one switch

Every colour on the page except the text greys is a token. Sixteen of them:

    ground  card  surface  surface-2  line  shadow
    accent  accent-soft  accent-tint  accent-line
    tone-b  wash-b  tone-c  wash-c  tone-d  wash-d

Twelve palettes define all sixteen. `data-pal` on `<html>` picks one and the
whole page follows: the background, the cards, the neutral pill behind a
tech tag, the hairline under a stat, the colour the shadows are cast in.
Five seconds each, 1.8s crossfade.

    python3 tools/build-palette.py      # regenerates the CSS in both artboards
    node tools/sync-phone-data.cjs && node tools/build-site.cjs

`tools/palette.py` is the source. It carries an oklch to sRGB conversion with
the chroma-reduction gamut mapping browsers do, so the hex it prints is the
hex that gets painted; a naive clamp would shift the hue instead. Change a
seed hue there, rerun, and the eight blocks are rewritten in place between
the `>>> palette` markers. Nothing else should be edited by hand.

Why generate them rather than hand-pick eight sets of sixteen: the contrast
has to hold in all twelve, and there are more than a hundred pairings once
text, accents, washes and surfaces are crossed. Generating from a seed means
one lightness decision applies everywhere and can be checked in a loop.

- **The seeds are placed by perceptual distance, not by degrees.** Blue
  changes slowly per degree of hue and red changes fast, so twelve evenly
  spaced angles put three near-identical blue-greens next to each other. The
  first attempt did exactly that and two of the twelve were flagged as too
  close to the one before. Measured in oklab, the tightest neighbouring pair
  is now 0.057 against 0.032 for even spacing.
- **Nothing rests between 60 and 125 degrees.** Anything in that band dark
  enough to carry white text clips to olive, which is the one hue this page
  has no use for. Crossing it is the twelfth step, the one long hop.
- **The supporting triads are four different shapes, cycled**, and the
  chroma has three characters. Twelve runs of one formula would read as
  twelve tints of the same idea rather than twelve combinations. Every
  spacing still keeps at least 70 degrees between any two of a palette's
  four hues, which is about where two tones stop being reliably tellable
  apart at this size.
- **Every token is a registered custom property**, so it interpolates
  instead of snapping. That is the whole reason the swap reads as a fade.
- **Lightness is not luminance.** The same oklch L reads far brighter at
  yellow than at blue, so contrast drifts hue to hue. The numbers were fixed
  by checking every pairing in all twelve rather than eyeballing one.
  Worst measured pairing in the rendered page: 5.41:1.

`tools/palette.py` scores itself: run it through the checks in the commit and
it reports, per palette, the worst contrast, the closest pair of tones within
it, and the distance to the palette before. Three thresholds, and a palette
that trips one is named.

### The two greys

`#7A7B92` and `#9C9DB0` were below AA on the old page too, at 4.09 and 2.64
on white. Nothing to do with the palette, but "every colour" is a reasonable
moment to fix them. They are now `#5E5E6E` and `#676877`, which clear 4.5 on
every surface in every palette. The ramp is tighter than it was — 7.1 / 6.4 /
5.5 on white rather than 7.1 / 4.1 / 2.6 — because meta text that passes AA
cannot be very light. That is the trade, and it is the right way round.

### Degradation

`prefers-reduced-motion: reduce` holds palette 0 and turns the transition
off. A hidden tab stops the timer. Without `@property` the swap is a hard cut
rather than a fade. The floor is Chrome 111 / Safari 15.4 / Firefox 113,
which is what `oklch()` in the generator output needs — the emitted values
are plain hex, so only the crossfade depends on `@property`.

## Motion

Ambient and interaction-driven only:

- `.blobA` / `.blobB` — 34s and 42s background drift
- `.in1`–`.in4` — one-time hero entrance on load
- `.card` `.btn` `.ghost` `.chip` — hover lift
- `.navlink::after` — underline draws in
- `.go svg` — arrow nudges
- `kxSwapA` / `kxSwapB` — the year card fades in on every pick. Two identical
  keyframes; `renderVals` alternates the **name** so the animation actually
  restarts. React keeps the element, so a transition or a single keyframe
  would not re-fire.

## Cards that flip

Each work card turns over to show what the project taught me, split into
technical and beyond-the-code. Two rules keep it from breaking:

- **Both faces share one grid cell.** `.flip-in` is `display: grid` and each
  `.face` sits at `grid-area: 1 / 1`, so the card is as tall as its taller
  side. The obvious version — back `position: absolute; inset: 0` — sizes the
  card to the front alone and silently clips the back. That was cutting 240px
  off Fritz before anyone noticed, because `overflow: auto` hides it behind a
  scrollbar nobody scrolls.
- **Keep the two faces close in height.** The grid stretches every card in a
  row to the tallest, so one long back leaves a hole in five fronts. Backs run
  about five learnings of roughly two lines each; much past that and the fronts
  start looking empty. `design/tools/` has no check for this — render it and
  look.

## Voice

Human, not assistant. Contractions, uneven sentence length, opinions, and
zero em-dashes — the previous copy was full of them. No "open to X roles"
badge anywhere; the work is meant to make that obvious.

## Two layouts, one set of words

The phone is a separate design, not the desktop reflowed. A profile header,
rails you flick sideways, swipeable work cards, and a docked action bar.

The obvious cost of two layouts is two copies of the text drifting apart, so
they do not both hold it. `Main.dc.html` owns `years()`, `projects()`,
`aiAreas()` and `sideProjects()`; `tools/sync-phone-data.cjs` lifts them into
`Phone.dc.html`. After editing Main:

    node tools/sync-phone-data.cjs && <re-seed>

`Phone.dc.html` is generated. Edit `phone.shell.html` for phone markup.

## Responsive

Verified by rendering the built `index.html` at 1440, 834 and 390 and
checking `scrollWidth` against `clientWidth`: no horizontal scroll at any
width. Page heights 5424 / 6275 / 5365.

- `@media (hover: none)` — **the important one.** Touch devices never fire
  `:hover`, so anything hidden behind it is invisible on a phone. The work
  card outcome line, the ribbon and the side-row arrow are all forced on.
- `max-width: 1024px` — career card stacks, nav tightens
- `max-width: 760px` — hero stacks, photo caps at 300px
- `max-width: 680px` — nav wraps, accordion and side rows go single column

`design/tools/render-preview.cjs` renders the artboard to a standalone
`preview.html` (resolving `sc-for`, `sc-if` and `{{holes}}` against
`renderVals()`) so it can be screenshotted without the canvas editor,
which does not mount in a sandbox.

## Outstanding

- **Dates unconfirmed.** Express Scripts spans 2018–19, Bank of America sits
  in 2020. Only Sept 2018 and July 2021 are pinned by the record.
- **Turn.** The copy says "one of the engineers", which is the safe reading.
  Nothing in the record says he led it, and nothing says he didn't.
- **Health Connect 360** carries two technical learnings where the others
  carry three. Two more were drafted from the domain rather than from his
  record, so they were cut rather than invented.

## Note on local preview

The canvas editor will not mount in this sandbox — it sits on "Loading
artboard…" for any artboard, including 3KB ones. That is environmental, not
a property of the page. An earlier commit message blamed page size for it;
that was wrong.

## archive/

The rejected cream/orange page, kept for its copy and timeline data.
