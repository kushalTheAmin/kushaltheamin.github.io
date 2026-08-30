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

Twelve palettes define all sixteen, but not as twelve sets of sixteen
colours. Each palette is **seven numbers** — a hue, three offsets and three
chroma weights — and the sixteen derive from them in CSS. Five seconds each,
1.8s crossfade.

    python3 tools/build-palette.py      # regenerates the CSS in both artboards
    node tools/sync-phone-data.cjs && node tools/build-site.cjs

### Why seven numbers and not sixteen colours

The first version stored sixteen literal hex values per palette and
cross-faded between them. Chrome interpolates registered colours through
sRGB, so a change from emerald to magenta passed through `rgb(74,73,53)`, a
grey-olive, for about four hundred milliseconds. The only way to hide that
was to keep every change small, which meant ordering the twelve around the
wheel — and neighbours in wheel order come out about 0.08 apart in oklab,
which is one colour in two shades. Every palette looked like the last one.

Rotating a hue instead sweeps around the wheel rather than across the middle
of it. Measured through a real transition, the lowest chroma seen anywhere
is now 0.112 against 0.032 before. So the fade no longer constrains the
order, and the order can be chosen for difference.

### Order

    CYCLE = [(i * 5) % 12 for i in range(12)]

Five positions apart, which puts at least 0.217 in oklab between anything
you see one after another, against 0.056 at its worst before. Five is
coprime with twelve so it still visits all of them. The switch rotates
whichever way is shorter, so nothing spins more than half a turn.

### Placing the twelve

Seeds are placed by perceptual distance, not by degrees: blue changes slowly
per degree of hue and red fast, so twelve evenly spaced angles put three
near-identical blue-greens in the set. Nothing rests between 60 and 125,
where anything dark enough to carry white text clips to olive.

The supporting triads are four different shapes, cycled, and the chroma has
three characters. Twelve runs of one formula would read as twelve tints of
one idea. Every shape still keeps at least 70 degrees between any two of a
palette's four hues.

### Contrast

Checked at 9,792 pairings — twelve palettes crossed with every 15 degrees of
the sweep, against the foreground-on-background pairs the page actually
contains rather than every pair that could theoretically exist. Worst
anywhere, at rest or mid-sweep: **4.60:1**.

Two things that search turned up:

- The card-back pill was `rgba(255,255,255,0.18)`, which lightens the tone
  under it until white text on it falls to 3.70. It is `rgba(0,0,0,0.16)`
  now, which can never be worse than white on the tone itself.
- `#7A7B92` and `#9C9DB0` were below AA on the old page too, at 4.09 and
  2.64 on white. They are `#5E5E6E` and `#676877`. The ramp is tighter than
  it was, because meta text that passes AA cannot be very light.

### Degradation

`prefers-reduced-motion: reduce` holds the first palette and turns the
transition off. A hidden tab stops the timer. Without `@property` the swap
is a hard cut rather than a fade. `oklch()` is required, so the floor is
Chrome 111 / Safari 15.4 / Firefox 113.

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
