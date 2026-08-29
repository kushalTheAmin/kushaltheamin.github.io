// Turns the two artboards into the static site.
//
// The artboards are Design Component files: they carry {{holes}}, <sc-for> and a
// logic class that the canvas runtime evaluates. A browser has none of that, so
// this resolves all of it ahead of time and emits one plain index.html.
//
// The only interactive parts are the year picker and the accordion. Rather than
// ship a templating layer to do that in the browser, every year card and every
// accordion panel is rendered into the page and the script just shows one.
const fs = require('fs');
const path = require('path');

const DIR = path.join(__dirname, '..');
const ROOT = path.join(DIR, '..');

function load(file) {
  const raw = fs.readFileSync(path.join(DIR, file), 'utf8');
  const helmet = raw.match(/<helmet>([\s\S]*?)<\/helmet>/)[1];
  const body = raw.slice(raw.indexOf('</helmet>') + 9, raw.indexOf('</x-dc>'));
  const logic = raw.slice(raw.indexOf('>', raw.indexOf('<script data-dc-script')) + 1, raw.lastIndexOf('</script>'));
  return { helmet, body, logic };
}

class DCLogic {
  constructor(p) { this.props = p || {}; }
  setState(s) { Object.assign(this.state, s); }
}

const component = logic => new (new Function('DCLogic', logic + '; return Component;')(DCLogic))({});

// ── the template engine the runtime would otherwise provide ────────────────
const lookup = (scopes, p) => {
  for (let i = scopes.length - 1; i >= 0; i--) {
    let v = scopes[i], ok = true;
    for (const k of p.split('.')) {
      if (v != null && Object.prototype.hasOwnProperty.call(v, k)) v = v[k];
      else { ok = false; break; }
    }
    if (ok) return v;
  }
};

const fill = (s, scopes) => s
  .replace(/\son[A-Z][A-Za-z]*="\{\{[^}]*\}\}"/g, '')          // handlers are re-bound by the site script
  .replace(/\shint-(placeholder-val|placeholder-count|size)="[^"]*"/g, '')
  .replace(/\{\{\s*([\w.$]+)\s*\}\}/g, (_, p) => {
    const v = lookup(scopes, p);
    return v == null ? '' : String(v);
  });

function closeOf(s, tag, from) {
  const open = new RegExp(`<${tag}\\b`, 'g'), close = new RegExp(`</${tag}>`, 'g');
  let depth = 1, i = from;
  for (;;) {
    open.lastIndex = close.lastIndex = i;
    const o = open.exec(s), c = close.exec(s);
    if (!c) throw new Error('unclosed <' + tag + '>');
    if (o && o.index < c.index) { depth++; i = o.index + 1; continue; }
    if (--depth === 0) return { inner: [from, c.index], end: c.index + tag.length + 3 };
    i = c.index + 1;
  }
}

function render(tpl, scopes) {
  let out = '', i = 0;
  for (;;) {
    const f = tpl.indexOf('<sc-for', i), c = tpl.indexOf('<sc-if', i);
    const at = f < 0 ? c : c < 0 ? f : Math.min(f, c);
    if (at < 0) return out + fill(tpl.slice(i), scopes);
    out += fill(tpl.slice(i, at), scopes);
    const isFor = at === f;
    const head = tpl.slice(at, tpl.indexOf('>', at) + 1);
    const m = closeOf(tpl, isFor ? 'sc-for' : 'sc-if', tpl.indexOf('>', at) + 1);
    const inner = tpl.slice(m.inner[0], m.inner[1]);
    if (isFor) {
      const list = lookup(scopes, head.match(/list="\{\{\s*([\w.$]+)\s*\}\}"/)[1]) || [];
      const as = head.match(/as="([\w$]+)"/)[1];
      for (const item of list) out += render(inner, scopes.concat([{ [as]: item }]));
    } else if (lookup(scopes, head.match(/value="\{\{\s*([\w.$]+)\s*\}\}"/)[1])) {
      out += render(inner, scopes);
    }
    i = m.end;
  }
}

// ── find the year card so it can be emitted once per year ──────────────────
function yearCardRange(body) {
  const anchor = body.indexOf('animation: {{swap}}');
  if (anchor < 0) throw new Error('no year card found');
  const start = body.lastIndexOf('<div', anchor);
  return { start, ...closeOf(body, 'div', body.indexOf('>', start) + 1) };
}

function buildLayout(file, years) {
  const { helmet, body, logic } = load(file);
  const range = yearCardRange(body);
  const card = body.slice(range.start, range.end);

  // one pane per year, all in the page, the script only flips which is visible
  let panes = '';
  for (let i = 0; i < years; i++) {
    const c = component(logic);
    c.setState({ i });
    panes += `<div data-year-pane${i === years - 1 ? '' : ' hidden'}>` +
             render(card, [c.renderVals()]) + '</div>';
  }

  const c = component(logic);
  const vals = c.renderVals();
  const html = render(body.slice(0, range.start), [vals]) +
               `<div data-years>${panes}</div>` +
               render(body.slice(range.end), [vals]);

  // the canvas keeps images flat at the document root; the site keeps them in img/
  const withAssets = html
    .replace(/src="(?!https?:|\/|img\/)([^"]+\.(?:jpg|jpeg|png|webp|svg))"/g, 'src="img/$1"')
    // every project link leaves the site, so none of them should take the tab with it
    .replace(/<a (?=[^>]*href="https?:)/g, '<a target="_blank" rel="noopener noreferrer" ');

  const css = helmet.replace(/<link[^>]*>/g, '').replace(/<\/?style>/g, '');
  const font = (helmet.match(/<link[^>]*fonts\.googleapis[^>]*>/) || [''])[0];
  return { html: withAssets, css, font };
}

const years = component(load('Main.dc.html').logic).years().length;
const desktop = buildLayout('Main.dc.html', years);
const phone = buildLayout('Phone.dc.html', years);

// only one layout carries the anchors; duplicate ids would be invalid
const phoneHtml = phone.html.replace(/\sid="[\w-]+"/g, '');

const SCRIPT = `
(function () {
  var ON = { bg: '#5B4BE8', fg: '#FFFFFF', shadow: '0 6px 16px rgba(91,75,232,.26)' };
  var OFF = { bg: '#FFFFFF', fg: '#55566E', shadow: '0 3px 12px rgba(21,22,43,.07)' };

  function paintChip(chip, on) {
    var s = on ? ON : OFF;
    chip.style.background = s.bg;
    chip.style.color = s.fg;
    chip.style.boxShadow = s.shadow;
    chip.setAttribute('aria-pressed', on ? 'true' : 'false');
  }

  Array.prototype.forEach.call(document.querySelectorAll('[data-years]'), function (group) {
    var panes = group.querySelectorAll('[data-year-pane]');
    var chips = group.parentNode.querySelectorAll('.chip');
    if (chips.length !== panes.length) return;

    Array.prototype.forEach.call(chips, function (chip, i) {
      chip.setAttribute('role', 'button');
      chip.setAttribute('tabindex', '0');
      function show() {
        Array.prototype.forEach.call(chips, function (c, j) { paintChip(c, i === j); });
        Array.prototype.forEach.call(panes, function (p, j) { p.hidden = i !== j; });
        var card = panes[i].firstElementChild;
        if (card) { card.style.animation = 'none'; void card.offsetHeight; card.style.animation = ''; }
      }
      chip.addEventListener('click', show);
      chip.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); show(); }
      });
    });
  });

  Array.prototype.forEach.call(document.querySelectorAll('.turn'), function (btn) {
    var card = btn.closest('.flip');
    if (!card) return;
    var inner = card.querySelector('.flip-in');
    btn.setAttribute('role', 'button');
    btn.setAttribute('tabindex', '0');
    function turn() {
      var showing = inner.style.transform === 'rotateY(180deg)';
      inner.style.transform = showing ? 'none' : 'rotateY(180deg)';
      // only the visible face should be reachable by tab or a screen reader
      card.querySelector('.face.front').setAttribute('aria-hidden', showing ? 'false' : 'true');
      card.querySelector('.face.back').setAttribute('aria-hidden', showing ? 'true' : 'false');
    }
    btn.addEventListener('click', turn);
    btn.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); turn(); }
    });
  });

  Array.prototype.forEach.call(document.querySelectorAll('.foldrow'), function (row) {
    var fold = row.querySelector('.fold');
    var chevron = row.querySelector('svg');
    var num = row.querySelector('.foldnum');
    var dark = row.parentNode.querySelectorAll('.foldrow');
    row.setAttribute('role', 'button');
    row.setAttribute('tabindex', '0');

    function paint(open) {
      if (fold) fold.style.gridTemplateRows = open ? '1fr' : '0fr';
      if (chevron) chevron.style.transform = open ? 'rotate(180deg)' : 'rotate(0deg)';
      if (num) num.style.color = open ? '#A99BFF' : '#5C5E80';
      row.style.background = open ? '#1E2038' : 'transparent';
      row.setAttribute('aria-expanded', open ? 'true' : 'false');
    }
    function toggle() {
      var open = row.getAttribute('aria-expanded') !== 'true';
      Array.prototype.forEach.call(dark, function (other) {
        if (other !== row) { other.dispatchEvent(new CustomEvent('kx-close')); }
      });
      paint(open);
    }
    row.addEventListener('kx-close', function () { paint(false); });
    row.addEventListener('click', toggle);
    row.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); }
    });
    paint(fold && fold.style.gridTemplateRows === '1fr');
  });
})();
`;

const page = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Kushal Amin — Product Engineer</title>
<meta name="description" content="Product engineer. Eight years across healthcare, banking and automotive, from the database to the pixel, and lately the AI layer on top.">
<meta property="og:title" content="Kushal Amin — Product Engineer">
<meta property="og:description" content="Eight years across healthcare, banking and automotive, from the database to the pixel.">
<meta property="og:image" content="https://kushaltheamin.github.io/img/kushal.jpg">
<meta property="og:url" content="https://kushaltheamin.github.io/">
<meta property="og:type" content="profile">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="img/kushal.jpg">
${desktop.font}
<style>
${desktop.css}
${phone.css}
.layout-phone { display: none; }
@media (max-width: 760px) {
  .layout-desktop { display: none; }
  .layout-phone { display: block; }
}
.chip, .foldrow { -webkit-tap-highlight-color: transparent; }
.chip:focus-visible, .foldrow:focus-visible { outline: 2px solid #5B4BE8; outline-offset: 3px; }
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation-duration: .01ms !important; animation-iteration-count: 1 !important; transition-duration: .01ms !important; }
}
</style>
</head>
<body>
<div class="layout-desktop">${desktop.html}</div>
<div class="layout-phone">${phoneHtml}</div>
<script>${SCRIPT}</script>
</body>
</html>
`;

fs.writeFileSync(path.join(ROOT, 'index.html'), page);
console.log('index.html written,', (page.length / 1024).toFixed(0) + 'KB,', years, 'year panes per layout');
