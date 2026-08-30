# -*- coding: utf-8 -*-
"""Generates the eight palettes.

Every non-text colour on the page is a token here. The eight combinations are
produced from a seed hue each, then chroma-mapped into sRGB the way a browser
does, so what this prints is what gets painted. Run it and paste the output
into the artboards' :root block, or just run tools/build-palette.py which
writes it in place.
"""
import math

# ---------- oklch -> sRGB, with the gamut mapping browsers actually do -------

def _lin_to_srgb(c):
    return 12.92 * c if c <= 0.0031308 else 1.055 * (c ** (1 / 2.4)) - 0.055

def _srgb_to_lin(c):
    return c / 12.92 if c <= 0.04045 else ((c + 0.055) / 1.055) ** 2.4

def oklch_to_linear(L, C, H):
    h = math.radians(H)
    a, b = C * math.cos(h), C * math.sin(h)
    l_ = L + 0.3963377774 * a + 0.2158037573 * b
    m_ = L - 0.1055613458 * a - 0.0638541728 * b
    s_ = L - 0.0894841775 * a - 1.2914855480 * b
    l, m, s = l_ ** 3, m_ ** 3, s_ ** 3
    return (
        +4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
        -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
        -0.0041960863 * l - 0.7034186147 * m + 1.7076147010 * s,
    )

def in_gamut(rgb, eps=1e-4):
    return all(-eps <= c <= 1 + eps for c in rgb)

def oklch_hex(L, C, H):
    """Reduce chroma until the colour fits sRGB, which is what CSS Color 4
    gamut mapping does; a naive clamp would shift the hue instead."""
    lo, hi = 0.0, C
    if not in_gamut(oklch_to_linear(L, C, H)):
        for _ in range(24):
            mid = (lo + hi) / 2
            if in_gamut(oklch_to_linear(L, mid, H)):
                lo = mid
            else:
                hi = mid
        C = lo
    rgb = oklch_to_linear(L, C, H)
    out = [min(1.0, max(0.0, _lin_to_srgb(c))) for c in rgb]
    return '#%02X%02X%02X' % tuple(round(c * 255) for c in out)

# ---------- contrast --------------------------------------------------------

def lum(hex_):
    h = hex_.lstrip('#')
    return sum(k * _srgb_to_lin(int(h[i:i + 2], 16) / 255.0)
               for k, i in ((0.2126, 0), (0.7152, 2), (0.0722, 4)))

def contrast(a, b):
    x, y = lum(a), lum(b)
    return (max(x, y) + 0.05) / (min(x, y) + 0.05)

# ---------- the twelve -----------------------------------------------------

# Twelve seeds in wheel order, so every switch is a short hop and the
# crossfade never has far to travel. The one long jump, brass to emerald,
# skips 70-110: anything in that band dark enough to read on white is olive.
#
# The supporting triads deliberately are not all the same shape. Four
# different spacings, cycled, so the twelve read as a set of combinations
# rather than one formula run twelve times. Every spacing keeps at least 70
# degrees between any two of the four hues, which is about where two tones
# stop being reliably tellable apart at this size.
SPACINGS = {
    'balanced': (100, 190, 280),   # gaps 100 / 90 / 90 / 80
    'wide':     (110, 205, 290),   # gaps 110 / 95 / 85 / 70
    'near':     ( 75, 160, 250),   # gaps  75 / 85 / 90 / 110
    'even':     ( 85, 165, 265),   # gaps  85 / 80 / 100 / 95
}

# chroma character, cycled too: some palettes come out rich, some composed.
# A set where every entry is equally saturated flattens into one note.
CHARACTER = {
    'rich':     dict(aC=0.200, tC=0.175, nC=1.00),
    'composed': dict(aC=0.165, tC=0.145, nC=0.78),
    'deep':     dict(aC=0.185, tC=0.160, nC=1.15),
}

SEEDS = [
    # Placed by perceptual distance, not by degrees: blues change slowly per
    # degree and reds fast, so twelve evenly spaced angles would have put three
    # near-identical blue-greens in a row. Measured, the tightest neighbouring
    # pair is now 0.057 in oklab against 0.032 for even spacing.
    #
    # Nothing rests between 60 and 125. Anything in that band dark enough for
    # white text on it clips to olive, which is the one hue this page has no
    # use for. The long hop across it is the twelfth step.
    ('emerald',   143, 'balanced', 'rich'),
    ('jade',      168, 'wide',     'composed'),
    ('teal',      213, 'near',     'deep'),
    ('cobalt',    248, 'even',     'rich'),
    ('sapphire',  265, 'balanced', 'composed'),
    ('indigo',    288, 'wide',     'deep'),
    ('violet',    312, 'near',     'rich'),
    ('orchid',    331, 'even',     'composed'),
    ('magenta',   350, 'balanced', 'deep'),
    ('rose',        8, 'wide',     'rich'),
    ('vermilion',  26, 'near',     'composed'),
    ('rust',       45, 'even',     'deep'),
]

def palette(seed, spacing, character):
    oB, oC, oD = SPACINGS[spacing]
    k = CHARACTER[character]
    hA = seed
    hB, hC, hD = (seed + oB) % 360, (seed + oC) % 360, (seed + oD) % 360
    n = k['nC']
    return {
        # surfaces carry a trace of the seed, so the page itself changes and
        # not only the things sitting on it
        'ground':      oklch_hex(0.975, 0.010 * n, hA),
        'card':        oklch_hex(0.995, 0.004 * n, hA),
        'surface':     oklch_hex(0.955, 0.016 * n, hA),
        'surface-2':   oklch_hex(0.943, 0.019 * n, hA),
        'line':        oklch_hex(0.910, 0.024 * n, hA),
        'shadow':      oklch_hex(0.230, 0.045 * n, hA),
        'accent':      oklch_hex(0.480, k['aC'], hA),
        'accent-soft': oklch_hex(0.968, 0.034 * n, hA),
        'accent-tint': oklch_hex(0.940, 0.065 * n, hA),
        'accent-line': oklch_hex(0.860, 0.070 * n, hA),
        'tone-b': oklch_hex(0.470, k['tC'], hB), 'wash-b': oklch_hex(0.968, 0.036 * n, hB),
        'tone-c': oklch_hex(0.470, k['tC'], hC), 'wash-c': oklch_hex(0.968, 0.036 * n, hC),
        'tone-d': oklch_hex(0.470, k['tC'], hD), 'wash-d': oklch_hex(0.968, 0.036 * n, hD),
    }

PALETTES = [(name, palette(h, sp, ch)) for name, h, sp, ch in SEEDS]
HUES = {name: [(h + o) % 360 for o in (0,) + SPACINGS[sp]] for name, h, sp, _ in SEEDS}
ORDER = ['ground', 'card', 'surface', 'surface-2', 'line', 'shadow',
         'accent', 'accent-soft', 'accent-tint', 'accent-line',
         'tone-b', 'wash-b', 'tone-c', 'wash-c', 'tone-d', 'wash-d']

if __name__ == '__main__':
    for name, p in PALETTES:
        print('%-11s %s' % (name, '  '.join(p[k] for k in ORDER)))

# ---------- scoring --------------------------------------------------------

def hex_oklab(h):
    """sRGB hex back to oklab, so distances are measured on the colours that
    actually get painted rather than on the values asked for before gamut
    mapping clipped them."""
    h = h.lstrip('#')
    r, g, b = (_srgb_to_lin(int(h[i:i + 2], 16) / 255.0) for i in (0, 2, 4))
    l = (0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b) ** (1 / 3)
    m = (0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b) ** (1 / 3)
    s = (0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b) ** (1 / 3)
    return (0.2104542553 * l + 0.7936177850 * m - 0.0040720468 * s,
            1.9779984951 * l - 2.4285922050 * m + 0.4505937099 * s,
            0.0259040371 * l + 0.7827717662 * m - 0.8086757660 * s)

def dE(a, b):
    x, y = hex_oklab(a), hex_oklab(b)
    return math.sqrt(sum((p - q) ** 2 for p, q in zip(x, y)))
