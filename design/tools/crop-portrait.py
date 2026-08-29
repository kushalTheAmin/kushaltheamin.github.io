#!/usr/bin/env python3
"""Crop the waterfront photo down to a head-and-shoulders portrait for the hero.

The source is a full-length shot, so nearly all of it has to go. Defaults below
are measured off that photo at 1500x2000: face centred just left of middle, eyes
a bit above a third of the way down. Pass --box to override if the source differs.

    python3 crop-portrait.py in.jpeg ../../img/kushal.jpg
"""
import argparse
from PIL import Image

# fractions of the source, not pixels, so a different export size still works
FACE_X, EYE_Y = 0.450, 0.378
FRAME_H = 0.195          # head ends up ~57% of the frame, which reads as a portrait
EYE_FROM_TOP = 0.36      # eyes land on the upper third, where a viewer expects them
OUT_W, OUT_H = 900, 1125 # 4:5, matches the frame in the hero

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("src")
    ap.add_argument("dst")
    ap.add_argument("--box", nargs=4, type=int, metavar=("L", "T", "R", "B"),
                    help="exact crop box in source pixels, skips the defaults")
    ap.add_argument("--frame", type=float, default=FRAME_H,
                    help="height of the crop as a fraction of the source; bigger pulls back")
    ap.add_argument("--quality", type=int, default=82)
    args = ap.parse_args()

    im = Image.open(args.src)
    im = im.convert("RGB")
    w, h = im.size

    if args.box:
        box = tuple(args.box)
    else:
        fh = args.frame * h
        fw = fh * OUT_W / OUT_H
        top = EYE_Y * h - EYE_FROM_TOP * fh
        left = FACE_X * w - fw / 2
        box = (round(left), round(top), round(left + fw), round(top + fh))

    # keep the box inside the source rather than letting PIL pad with black
    l, t, r, b = box
    l, t = max(0, l), max(0, t)
    r, b = min(w, r), min(h, b)
    im = im.crop((l, t, r, b)).resize((OUT_W, OUT_H), Image.LANCZOS)
    im.save(args.dst, "JPEG", quality=args.quality, optimize=True, progressive=True)

    print(f"{args.src} {w}x{h} -> {args.dst} {OUT_W}x{OUT_H} from box {(l, t, r, b)}")

if __name__ == "__main__":
    main()
