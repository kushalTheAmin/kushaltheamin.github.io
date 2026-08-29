const fs = require('fs');
const SRC = process.argv[2] || '/home/user/kushaltheamin.github.io/design/Main.dc.html';
const raw = fs.readFileSync(SRC, 'utf8');

const helmet = raw.match(/<helmet>([\s\S]*?)<\/helmet>/)[1];
let body = raw.slice(raw.indexOf('</helmet>') + 9, raw.indexOf('</x-dc>'));
const logic = raw.slice(raw.indexOf('>', raw.indexOf('<script data-dc-script')) + 1, raw.lastIndexOf('</script>'));

class DCLogic { constructor(p) { this.props = p || {}; } setState(s) { Object.assign(this.state, s); } }
const Component = new Function('DCLogic', logic + '; return Component;')(DCLogic);
const vals = new Component({}).renderVals();

const get = (scopes, path) => {
  for (let i = scopes.length - 1; i >= 0; i--) {
    let v = scopes[i], ok = true;
    for (const k of path.split('.')) {
      if (v != null && Object.prototype.hasOwnProperty.call(v, k)) v = v[k];
      else { ok = false; break; }
    }
    if (ok) return v;
  }
  return undefined;
};

// find the index just past the close tag matching an open tag of `name` starting at `from`
function matchClose(s, name, from) {
  const open = new RegExp(`<${name}\\b`, 'g'), close = new RegExp(`</${name}>`, 'g');
  let depth = 1, i = from;
  while (depth > 0) {
    open.lastIndex = close.lastIndex = i;
    const o = open.exec(s), c = close.exec(s);
    if (!c) throw new Error('unclosed ' + name);
    if (o && o.index < c.index) { depth++; i = o.index + 1; }
    else { depth--; i = c.index + 1; if (!depth) return { inner: [from, c.index], end: c.index + name.length + 3 }; }
  }
}

function render(tpl, scopes) {
  let out = '', i = 0;
  while (i < tpl.length) {
    const forAt = tpl.indexOf('<sc-for', i);
    const ifAt = tpl.indexOf('<sc-if', i);
    const at = (forAt < 0) ? ifAt : (ifAt < 0 ? forAt : Math.min(forAt, ifAt));
    if (at < 0) { out += interp(tpl.slice(i), scopes); break; }
    out += interp(tpl.slice(i, at), scopes);
    const isFor = (at === forAt);
    const tagEnd = tpl.indexOf('>', at) + 1;
    const attrs = tpl.slice(at, tagEnd);
    const m = matchClose(tpl, isFor ? 'sc-for' : 'sc-if', tagEnd);
    const inner = tpl.slice(m.inner[0], m.inner[1]);
    if (isFor) {
      const list = get(scopes, attrs.match(/list="\{\{\s*([\w.$]+)\s*\}\}"/)[1]) || [];
      const as = attrs.match(/as="([\w$]+)"/)[1];
      for (const item of list) out += render(inner, scopes.concat([{ [as]: item }]));
    } else {
      if (get(scopes, attrs.match(/value="\{\{\s*([\w.$]+)\s*\}\}"/)[1])) out += render(inner, scopes);
    }
    i = m.end;
  }
  return out;
}

const interp = (s, scopes) =>
  s.replace(/\son(Click|MouseDown|MouseMove|MouseUp|MouseLeave|TouchStart|TouchMove|TouchEnd)="\{\{[^}]*\}\}"/g, '')
   .replace(/\{\{\s*([\w.$]+)\s*\}\}/g, (_, p) => { const v = get(scopes, p); return v == null ? '' : String(v); });

fs.writeFileSync((process.argv[3] || 'preview.html'),
  `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">${helmet}</head><body>${render(body, [vals])}</body></html>`);
console.log('preview.html written,', fs.statSync((process.argv[3] || 'preview.html')).size, 'bytes');
