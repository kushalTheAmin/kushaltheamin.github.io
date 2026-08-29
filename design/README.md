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
- Accent `#5B4BE8`; text `#15162B` / `#55566E` / `#7A7B92`
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

## Voice

Human, not assistant. Contractions, uneven sentence length, opinions, and
zero em-dashes — the previous copy was full of them. No "open to X roles"
badge anywhere; the work is meant to make that obvious.

## Two layouts, one set of words

The phone is a separate design, not the desktop reflowed. A profile header,
rails you flick sideways, swipeable work cards, and a docked action bar.
4,557px against 9,120px for the responsive version.

The obvious cost of two layouts is two copies of the text drifting apart, so
they do not both hold it. `Main.dc.html` owns `years()`, `projects()`,
`aiAreas()` and `sideProjects()`; `tools/sync-phone-data.cjs` lifts them into
`Phone.dc.html`. After editing Main:

    node tools/sync-phone-data.cjs && <re-seed>

`Phone.dc.html` is generated. Edit `phone.shell.html` for phone markup.

## Responsive

Verified by rendering `Main.dc.html` standalone at 1440, 834 and 390 and
checking `scrollWidth` against `clientWidth`: no horizontal scroll at any
width. Page heights 4724 / 5410 / 9120.

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
- Photo: the user's path is on their own Mac and unreachable from a remote
  container. Frame is 4:5, sized for a close head-and-shoulders crop.

## Note on local preview

The canvas editor will not mount in this sandbox — it sits on "Loading
artboard…" for any artboard, including 3KB ones. That is environmental, not
a property of the page. An earlier commit message blamed page size for it;
that was wrong.

## archive/

The rejected cream/orange page, kept for its copy and timeline data.
