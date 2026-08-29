# design

Source for <https://kushaltheamin.github.io>. This branch carries the design
files; `master` carries only the built site.

## Layout

| Path | What it is |
|---|---|
| `design/Main.dc.html` | Desktop artboard. Owns all copy and data. |
| `design/Phone.dc.html` | Phone artboard. Generated - do not hand-edit. |
| `design/phone.shell.html` | The phone's markup and styles, minus the data. |
| `design/canvas.json` | Artboard layout for the design canvas. |
| `design/tools/` | Sync, build, crop and preview scripts. |
| `design/archive/` | Earlier directions, kept for their copy. |

## Changing the site

    git checkout design
    # edit design/Main.dc.html, or design/phone.shell.html for phone markup
    cd design
    node tools/sync-phone-data.cjs      # copy Main's data into the phone artboard
    node tools/build-site.cjs           # regenerate ../index.html

Then copy the built `index.html` onto `master` and push. The site is plain
static files, so that is the whole deploy.

## Why the split

The artboards are Design Component files. They carry `{{holes}}`, `<sc-for>`
and a logic class that only the canvas runtime understands, so they are not
servable and have no business sitting in a published site root.

See `design/README.md` for the design system, the motion, and what is still
outstanding.
