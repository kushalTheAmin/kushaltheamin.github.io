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

# ---------- the eight ------------------------------------------------------

# Ordered so neighbours are close on the wheel: every switch is a short hop,
# which is what keeps the crossfade from wandering somewhere muddy.
SEEDS = [
    ('rani pink',  320), ('vermilion',  355), ('marigold',    30),
    ('brass',       62), ('emerald',    145), ('peacock',    178),
    ('cobalt',     212), ('violet',     272),
]

# supporting hues sit 100/190/280 off the seed: near enough a quarter turn to
# stay tellable apart, off the grid so no two palettes share a set
OFF_B, OFF_C, OFF_D = 100, 190, 280

def palette(seed):
    hA = seed
    hB, hC, hD = (seed + OFF_B) % 360, (seed + OFF_C) % 360, (seed + OFF_D) % 360
    return {
        # surfaces: tinted toward the seed so the page itself changes, not
        # just the things sitting on it
        'ground':      oklch_hex(0.975, 0.010, hA),
        'card':        oklch_hex(0.995, 0.004, hA),
        'surface':     oklch_hex(0.955, 0.016, hA),
        'surface-2':   oklch_hex(0.943, 0.019, hA),
        'line':        oklch_hex(0.910, 0.024, hA),
        'shadow':      oklch_hex(0.230, 0.045, hA),
        # accent family
        'accent':      oklch_hex(0.480, 0.200, hA),
        'accent-soft': oklch_hex(0.968, 0.034, hA),
        'accent-tint': oklch_hex(0.940, 0.065, hA),
        'accent-line': oklch_hex(0.860, 0.070, hA),
        # the three chapters
        'tone-b': oklch_hex(0.470, 0.170, hB), 'wash-b': oklch_hex(0.968, 0.036, hB),
        'tone-c': oklch_hex(0.470, 0.170, hC), 'wash-c': oklch_hex(0.968, 0.036, hC),
        'tone-d': oklch_hex(0.470, 0.170, hD), 'wash-d': oklch_hex(0.968, 0.036, hD),
    }

PALETTES = [(name, palette(h)) for name, h in SEEDS]
ORDER = ['ground', 'card', 'surface', 'surface-2', 'line', 'shadow',
         'accent', 'accent-soft', 'accent-tint', 'accent-line',
         'tone-b', 'wash-b', 'tone-c', 'wash-c', 'tone-d', 'wash-d']

if __name__ == '__main__':
    for name, p in PALETTES:
        print('%-11s %s' % (name, '  '.join(p[k] for k in ORDER)))
