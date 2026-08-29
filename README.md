# kushaltheamin.github.io

My portfolio. Live at <https://kushaltheamin.github.io>.

`index.html` is generated, not hand-written. The source is two design
artboards under `design/`, and the site is built from them:

    cd design && node tools/build-site.cjs

That resolves the artboards' template syntax ahead of time and emits one
static page holding both layouts, with every year card and accordion panel
already in the HTML so the page needs almost no JavaScript to work.

See `design/README.md` for how the artboards fit together and what to edit.
