#!/usr/bin/env python3
"""
Turn one photo into the responsive WebP + JPEG set the site expects.

    python3 tools/make-images.py path/to/photo.jpg hero-butter-chicken 800 1280 1920
    python3 tools/make-images.py path/to/photo.jpg real-butter-chicken 480 800 1200

Writes assets/img/<slug>-<width>.webp and .jpg for each width (never upscales),
then prints the <picture> markup to paste into index.html.
Requires Pillow:  pip3 install pillow
"""
import sys, os
from PIL import Image, ImageOps

if len(sys.argv) < 4:
    print(__doc__); sys.exit(1)
src, slug, widths = sys.argv[1], sys.argv[2], [int(w) for w in sys.argv[3:]]
out = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "assets", "img")
im = ImageOps.exif_transpose(Image.open(src)).convert("RGB")
W, H = im.size
done = []
for w in sorted(set(widths)):
    if w > W: w = W
    h = round(H * w / W)
    r = im.resize((w, h), Image.LANCZOS) if w != W else im
    r.save(f"{out}/{slug}-{w}.webp", "WEBP", quality=80, method=6)
    r.save(f"{out}/{slug}-{w}.jpg", "JPEG", quality=82, optimize=True, progressive=True)
    done.append((w, h))
    if w == W: break
ws = lambda ext: ", ".join(f"assets/img/{slug}-{w}.{ext} {w}w" for w, h in done)
mid = done[min(1, len(done) - 1)]
print(f"Wrote {len(done)*2} files to assets/img/\n")
print(f'<picture>\n  <source type="image/webp" srcset="{ws("webp")}" sizes="100vw">\n  <img src="assets/img/{slug}-{mid[0]}.jpg" srcset="{ws("jpg")}" sizes="100vw" width="{done[-1][0]}" height="{done[-1][1]}" alt="DESCRIBE THE PHOTO" loading="lazy" decoding="async">\n</picture>')
