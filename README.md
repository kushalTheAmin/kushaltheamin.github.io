# kushaltheamin.github.io

My portfolio. Live at <https://kushaltheamin.github.io>.

This branch is the published site and nothing else: one static `index.html`
and the photo it uses.

`index.html` is generated, not hand-written. The design sources and the build
script live on the [`design`](../../tree/design) branch:

    git checkout design
    cd design && node tools/build-site.cjs

That resolves the design files' template syntax ahead of time and emits one
page holding both the desktop and phone layouts, with every year card and
accordion panel already in the HTML so it needs almost no JavaScript to work.
