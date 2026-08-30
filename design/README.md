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

## The whole page turns

Asked for: a theme that moves every ten seconds like a string of diyas,
smoothly, over the same white base, with the black Applied AI panel gone.

**One angle, not a list of hexes.** `--hue` is the only thing that changes.
Four hues hang off it at 0 / 100 / 190 / 280 degrees, and every colour on the
page is `oklch()` at one of those four. Seven resting stops, ten seconds
apart, three second eased sweep between them.

    STEPS = [45, 45, 90, 45, 45, 45, 45]   START = 320

Three decisions worth keeping:

- **oklch, so the ride is smooth.** Holding lightness and chroma while only
  the hue sweeps means the transit between two colours goes round the wheel
  rather than through the grey a straight hex-to-hex fade passes through.
  It also keeps contrast roughly flat as the hue moves.
- **Offsets are 100/190/280, not 90/180/270.** At exactly a quarter turn the
  set of four maps onto itself every other stop, so the page would only ever
  wear two combinations. Ten degrees off the grid makes all seven different.
- **The wide 90 degree step skips 70-110.** Anything in that band dark
  enough to read on white comes out olive, so the accent never rests there.
  The other three still cross it, which four hues covering a full circle
  cannot avoid.

**Lightness is not luminance.** The same oklch L reads much brighter at
yellow than at blue, so contrast drifts as the hue turns. The token values
came from sweeping all four hues right round the wheel in 5 degree steps and
taking the worst ratio of every pairing — not from checking the seven stops,
which would have missed what happens mid-sweep. Worst case anywhere is
4.66:1; at the stops themselves it is 5.14:1. All measured through a canvas,
so the numbers are painted pixels rather than `color-mix()` expressions.

**Nothing is exempt any more.** Employer colours on the year cards and
industry tones on the work cards used to be fixed, on the argument that
cycling them loses what they mean. Holding them a fixed distance apart in
hue keeps that meaning while letting them move: three chapters that are
always different from each other, and always turning.

**The dark panel is gone.** Applied AI is now `--accent-tint` with white
rows inside it. `--accent-lift`, which existed only for light text on that
black, went with it.

**Degradation.** `prefers-reduced-motion: reduce` freezes it on 320 and a
hidden tab stops the timer. Without `@property` the sweep becomes a hard cut
every ten seconds; without `oklch` there is no page, so the floor is
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
