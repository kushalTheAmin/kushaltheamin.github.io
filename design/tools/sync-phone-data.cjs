// Phone.dc.html is a separate layout, not a reflow of Main, but the words and the
// dates have to stay identical. Main owns them; this lifts its four data methods
// and the shared render logic into the phone file. Run after editing Main.
const fs = require('fs');
const dir = __dirname + '/..';
const main = fs.readFileSync(dir + '/Main.dc.html', 'utf8');
const shell = fs.readFileSync(dir + '/phone.shell.html', 'utf8');

const grab = name => {
  const start = main.indexOf('  ' + name + '() {');
  if (start < 0) throw new Error('missing ' + name + '() in Main.dc.html');
  const end = main.indexOf('\n  }\n', start);
  return main.slice(start, end + 5);
};

const body = ['years', 'projects', 'aiAreas', 'sideProjects'].map(grab).join('\n');

const tail = `
  pick(i) {
    var j = Math.max(0, Math.min(this.years().length - 1, i));
    if (j !== this.state.i) this.setState({ i: j, n: this.state.n + 1 });
  }

  turnCard(k) {
    var next = {};
    for (var key in this.state.flipped) next[key] = this.state.flipped[key];
    next[k] = !next[k];
    this.setState({ flipped: next });
  }

  toggleArea(k) {
    this.setState({ open: this.state.open === k ? -1 : k });
  }

  renderVals() {
    var self = this;
    var list = this.years();
    var i = Math.max(0, Math.min(list.length - 1, this.state.i));
    var cur = list[i];

    return {
      cur: {
        year: cur.year, company: cur.company, role: cur.role, color: cur.color,
        title: cur.title, paras: cur.paras, stack: cur.stack,
        awards: cur.awards, hasAward: cur.awards.length > 0,
        links: cur.links, hasLinks: cur.links.length > 0
      },
      // React keeps the element, so flipping the keyframe name is what restarts the animation
      swap: (this.state.n % 2) ? 'kxSwapA' : 'kxSwapB',
      chips: list.map(function (y, k) {
        var on = k === i;
        return {
          year: y.year,
          bg: on ? 'var(--accent)' : 'var(--card)',
          fg: on ? '#FFFFFF' : '#55566E',
          shadow: on ? '0 6px 16px color-mix(in srgb, var(--accent) 26%, transparent)' : '0 3px 12px color-mix(in srgb, var(--shadow) 7%, transparent)',
          pick: function () { self.pick(k); }
        };
      }),
      work: this.projects().map(function (p, k) {
        return Object.assign({}, p, {
          flip: self.state.flipped[k] ? 'rotateY(180deg)' : 'none',
          turn: function () { self.turnCard(k); }
        });
      }),
      side: this.sideProjects(),
      areas: this.aiAreas().map(function (a, k) {
        var on = k === self.state.open;
        return {
          n: a.n, title: a.title, paras: a.paras, tags: a.tags,
          rows: on ? '1fr' : '0fr',
          rot: on ? 'rotate(180deg)' : 'rotate(0deg)',
          rowbg: on ? 'var(--card)' : 'transparent',
          numcol: on ? 'var(--accent)' : '#5E5E6E',
          toggle: function () { self.toggleArea(k); }
        };
      })
    };
  }
}
</script>
</body>
</html>
`;

fs.writeFileSync(dir + '/Phone.dc.html', shell + body + tail);
console.log('Phone.dc.html rebuilt from Main data');
