"""Render the "Lattice Calm" artwork set into public/art.

Usage: python3 scripts/generate-art.py            # the whole set
       python3 scripts/generate-art.py platform   # named pieces only
Requires: numpy, Pillow. See docs/art-philosophy.md.
"""
from __future__ import annotations

import math
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw, ImageFilter

OUT = Path(__file__).resolve().parent.parent / "public" / "art"
W, H = 1600, 1200
S = 2  # supersample factor

BG = (14, 22, 26)
SLATE = (55, 70, 77)
CYAN = (99, 184, 203)
WHITE = (238, 243, 244)


def ground(seed: int, glow=(0.68, 0.42), strength=0.55) -> Image.Image:
    """Slate ground: near-black edges, a soft lit region, fine grain."""
    w, h = W * S, H * S
    y, x = np.mgrid[0:h, 0:w].astype(np.float32)
    dx = (x / w - glow[0]) / 0.75
    dy = (y / h - glow[1]) / 0.85
    g = np.exp(-(dx * dx + dy * dy) * 2.2) * strength
    base = np.array(BG, dtype=np.float32)
    lit = np.array(SLATE, dtype=np.float32)
    arr = base[None, None, :] + (lit - base)[None, None, :] * g[..., None]
    rng = np.random.default_rng(seed)
    arr += rng.normal(0, 1.6, size=(h, w, 1)).astype(np.float32)
    return Image.fromarray(np.clip(arr, 0, 255).astype(np.uint8), "RGB")


def rgba(c, a):
    return (c[0], c[1], c[2], int(a))


def finish(img: Image.Image, name: str) -> None:
    out = img.resize((W, H), Image.LANCZOS)
    OUT.mkdir(parents=True, exist_ok=True)
    out.save(OUT / f"{name}.webp", "WEBP", quality=88, method=6)
    print("wrote", name)


def layer(img):
    over = Image.new("RGBA", img.size, (0, 0, 0, 0))
    return over, ImageDraw.Draw(over)


def merge(img, over):
    return Image.alpha_composite(img.convert("RGBA"), over).convert("RGB")


# 1. AI: a layered network with one resolved path.
def art_ai():
    rng = np.random.default_rng(11)
    img = ground(1, glow=(0.62, 0.5))
    over, d = layer(img)
    cols = 9
    x0, x1 = 0.16 * W * S, 0.9 * W * S
    layers = []
    for c in range(cols):
        t = c / (cols - 1)
        n = int(7 + 15 * math.sin(math.pi * t) ** 1.3)
        span = (0.2 + 0.56 * math.sin(math.pi * t) ** 0.8) * H * S
        cx = x0 + (x1 - x0) * t
        ys = np.linspace(-span / 2, span / 2, n) + H * S * 0.5
        ys += rng.normal(0, 3 * S, n)
        layers.append([(cx, float(yv)) for yv in ys])
    path = [len(l) // 2 + int(rng.integers(-2, 3)) for l in layers]
    path = [max(0, min(len(layers[i]) - 1, p)) for i, p in enumerate(path)]
    for i in range(cols - 1):
        for a in layers[i]:
            for b in layers[i + 1]:
                d.line([a, b], fill=rgba(WHITE, 15), width=S)
    for i in range(cols - 1):
        a, b = layers[i][path[i]], layers[i + 1][path[i + 1]]
        d.line([a, b], fill=rgba(CYAN, 235), width=3 * S)
    for i, l in enumerate(layers):
        for j, (px, py) in enumerate(l):
            on = j == path[i]
            r = (6 if on else 3.2) * S
            d.ellipse([px - r, py - r, px + r, py + r], fill=rgba(CYAN if on else WHITE, 255 if on else 190))
            if on:
                rr = 13 * S
                d.ellipse([px - rr, py - rr, px + rr, py + rr], outline=rgba(CYAN, 110), width=S)
    finish(merge(img, over), "ai-solutions")


# 2. Automation: streamlines through a smooth field.
def art_automation():
    rng = np.random.default_rng(23)
    img = ground(2, glow=(0.4, 0.55))
    over, d = layer(img)

    def angle(px, py):
        u, v = px / (W * S), py / (H * S)
        return (
            1.15 * math.sin(2.4 * u + 1.3 * v * 3.1)
            + 0.8 * math.cos(3.3 * v - 1.7 * u)
            + 0.35 * math.sin(7.0 * u * v + 0.6)
        ) * 0.62 - 0.18

    def trace(sx, sy, steps=260, h=5.0 * S):
        pts = [(sx, sy)]
        px, py = sx, sy
        for _ in range(steps):
            a = angle(px, py)
            px += math.cos(a) * h
            py += math.sin(a) * h
            if px < 0.07 * W * S or px > 0.93 * W * S or py < 0.09 * H * S or py > 0.91 * H * S:
                break
            pts.append((px, py))
        return pts

    seeds = [(0.07 * W * S + 2, yv) for yv in np.linspace(0.1, 0.9, 150) * H * S]
    seeds += [(float(rng.uniform(0.1, 0.6)) * W * S, float(rng.uniform(0.1, 0.9)) * H * S) for _ in range(190)]
    for sx, sy in seeds:
        pts = trace(sx, sy)
        if len(pts) > 12:
            d.line(pts, fill=rgba(WHITE, 30), width=S, joint="curve")
    for yv in (0.34, 0.345, 0.35, 0.58, 0.585, 0.59, 0.595):
        pts = trace(0.07 * W * S + 2, yv * H * S, steps=420)
        d.line(pts, fill=rgba(CYAN, 225), width=2 * S, joint="curve")
        ex, ey = pts[-1]
        d.ellipse([ex - 5 * S, ey - 5 * S, ex + 5 * S, ey + 5 * S], fill=rgba(CYAN, 255))
    finish(merge(img, over), "automation")


# 3. Data: a dot-matrix reading with a cyan crest.
def art_data():
    img = ground(3, glow=(0.55, 0.62))
    over, d = layer(img)
    cols, rows = 74, 40
    gx0, gx1 = 0.1 * W * S, 0.9 * W * S
    gy0, gy1 = 0.16 * H * S, 0.86 * H * S
    stepx = (gx1 - gx0) / (cols - 1)
    stepy = (gy1 - gy0) / (rows - 1)
    for c in range(cols):
        t = c / (cols - 1)
        v = (
            0.42
            + 0.24 * math.sin(2 * math.pi * (t * 1.25 + 0.08))
            + 0.13 * math.sin(2 * math.pi * (t * 3.6 + 0.4))
            + 0.07 * math.sin(2 * math.pi * (t * 8.2))
            + 0.2 * t
        )
        hgt = max(2, min(rows, int(v * rows)))
        px = gx0 + c * stepx
        for r in range(rows):
            py = gy1 - r * stepy
            if r < hgt - 1:
                a = 46 + 120 * (r / max(1, hgt - 1)) ** 1.6
                rad = 2.6 * S
                d.ellipse([px - rad, py - rad, px + rad, py + rad], fill=rgba(WHITE, a))
            elif r == hgt - 1:
                rad = 4.6 * S
                d.ellipse([px - rad, py - rad, px + rad, py + rad], fill=rgba(CYAN, 255))
            else:
                rad = 1.1 * S
                d.ellipse([px - rad, py - rad, px + rad, py + rad], fill=rgba(WHITE, 26))
    finish(merge(img, over), "data-driven-solutions")


# 4. Software: a rectangle divided until it cannot be divided.
def art_software():
    rng = np.random.default_rng(47)
    img = ground(4, glow=(0.3, 0.4))
    over, d = layer(img)
    cells = []

    def split(x, y, w, h, depth):
        small = min(w, h) < 70 * S
        if depth == 0 or small or (depth < 4 and rng.random() < 0.16):
            cells.append((x, y, w, h))
            return
        r = float(rng.choice([0.382, 0.5, 0.618]))
        if w > h * 1.15 or (abs(w - h) < h * 0.15 and rng.random() < 0.5):
            split(x, y, w * r, h, depth - 1)
            split(x + w * r, y, w * (1 - r), h, depth - 1)
        else:
            split(x, y, w, h * r, depth - 1)
            split(x, y + h * r, w, h * (1 - r), depth - 1)

    split(0.1 * W * S, 0.13 * H * S, 0.8 * W * S, 0.74 * H * S, 7)
    gap = 5 * S
    order = sorted(range(len(cells)), key=lambda i: cells[i][2] * cells[i][3])
    accents = set(order[len(order) // 3 :: max(1, len(order) // 7)][:6])
    for i, (x, y, w, h) in enumerate(cells):
        box = [x + gap, y + gap, x + w - gap, y + h - gap]
        if i in accents:
            d.rounded_rectangle(box, radius=7 * S, fill=rgba(CYAN, 235))
            continue
        kind = rng.random()
        d.rounded_rectangle(box, radius=7 * S, fill=rgba(WHITE, 9 + int(kind * 22)), outline=rgba(WHITE, 52), width=S)
        if kind > 0.62:
            n = int((w + h) / (9 * S))
            for k in range(n):
                o = k * 9 * S
                ax, ay = box[0] + o, box[1]
                bx, by = box[0], box[1] + o
                if ax > box[2]:
                    ay += ax - box[2]
                    ax = box[2]
                if by > box[3]:
                    bx += by - box[3]
                    by = box[3]
                if ay < box[3] and bx < box[2]:
                    d.line([(ax, ay), (bx, by)], fill=rgba(WHITE, 34), width=S)
    finish(merge(img, over), "tailored-software-development")


# 5. Team: rings that join into one body.
def art_team():
    img = ground(5, glow=(0.5, 0.5), strength=0.6)
    over, d = layer(img)
    n = 7
    cy = 0.5 * H * S
    R = 0.2 * H * S * 1.35
    xs = np.linspace(0.2, 0.8, n) * W * S
    for i, cx in enumerate(xs):
        core = i in (2, 3, 4)
        for k in range(1, 27):
            r = R * k / 26
            hot = core and k % 4 == 0
            d.ellipse([cx - r, cy - r, cx + r, cy + r], outline=rgba(CYAN if hot else WHITE, 215 if hot else 40), width=(2 if hot else 1) * S)
    for i, cx in enumerate(xs):
        r = 5 * S
        d.ellipse([cx - r, cy - r, cx + r, cy + r], fill=rgba(CYAN if i in (2, 3, 4) else WHITE, 255))
    finish(merge(img, over), "technical-team-hiring")


# 6. About: chords across an ellipse until a hollow appears.
def art_about():
    rng = np.random.default_rng(71)
    img = ground(6, glow=(0.5, 0.52), strength=0.6)
    over, d = layer(img)
    cx, cy = 0.5 * W * S, 0.52 * H * S
    a, b = 0.36 * W * S, 0.33 * H * S
    for i in range(1500):
        t0 = float(rng.uniform(0, 2 * math.pi))
        dt = float(rng.normal(2.0, 0.24))
        jit = 1 + float(rng.normal(0, 0.018))
        p0 = (cx + a * jit * math.cos(t0), cy + b * jit * math.sin(t0))
        p1 = (cx + a * jit * math.cos(t0 + dt), cy + b * jit * math.sin(t0 + dt))
        hot = i % 26 == 0
        d.line([p0, p1], fill=rgba(CYAN if hot else WHITE, 205 if hot else 24), width=(2 if hot else 1) * S)
    finish(merge(img, over), "about")


# 7. CTA: the folded ribbon, ruled in hairlines.
def art_cta():
    img = ground(7, glow=(0.5, 0.55), strength=0.7)
    over, d = layer(img)
    ang = math.radians(58)
    ux, uy = math.cos(ang), -math.sin(ang)
    span = 2.2 * H * S
    for k in range(-90, 190):
        bx = k * 22 * S
        d.line([(bx, H * S), (bx + ux * span, H * S + uy * span)], fill=rgba(WHITE, 14), width=S)

    def ribbon(x_base, colour, lines, lean, top, bottom):
        for k in range(lines):
            bx = x_base + k * 6.5 * S
            y0, y1 = bottom * H * S, top * H * S
            x0 = bx
            x1 = bx + lean * (y0 - y1) / math.tan(ang)
            alpha = 80 + 160 * math.sin(math.pi * (k + 0.5) / lines) ** 0.7
            d.line([(x0, y0), (x1, y1)], fill=rgba(colour, alpha), width=2 * S)

    ribbon(0.07 * W * S, CYAN, 44, 1, 0.14, 0.86)
    ribbon(0.29 * W * S, CYAN, 14, 1, 0.14, 0.86)
    ribbon(0.4 * W * S, WHITE, 44, 1, 0.14, 0.86)
    finish(merge(img, over), "cta")


# 8. Platform: modules feed streams of work into a reading. Software, automation
#    and data in one field, for the second capability.
def art_platform():
    rng = np.random.default_rng(83)
    img = ground(8, glow=(0.5, 0.5), strength=0.6)
    over, d = layer(img)

    # Zones: modules on the left, a reading on the right, streams between.
    lx0, lx1 = 0.08 * W * S, 0.37 * W * S
    rx0, rx1 = 0.63 * W * S, 0.92 * W * S
    y0, y1 = 0.2 * H * S, 0.8 * H * S

    cells = []

    def split(x, y, w, h, depth):
        small = min(w, h) < 58 * S
        if depth == 0 or small or (depth < 3 and rng.random() < 0.18):
            cells.append((x, y, w, h))
            return
        r = float(rng.choice([0.382, 0.5, 0.618]))
        if w > h * 1.1 or (abs(w - h) < h * 0.1 and rng.random() < 0.5):
            split(x, y, w * r, h, depth - 1)
            split(x + w * r, y, w * (1 - r), h, depth - 1)
        else:
            split(x, y, w, h * r, depth - 1)
            split(x, y + h * r, w, h * (1 - r), depth - 1)

    split(lx0, y0, lx1 - lx0, y1 - y0, 6)

    # The reading: column heights from a smooth rule.
    cols, rows = 30, 38
    stepx = (rx1 - rx0) / (cols - 1)
    stepy = (y1 - y0) / (rows - 1)
    heights = []
    for c in range(cols):
        t = c / (cols - 1)
        v = (
            0.44
            + 0.2 * math.sin(2 * math.pi * (t * 1.1 + 0.15))
            + 0.11 * math.sin(2 * math.pi * (t * 2.9 + 0.5))
            + 0.05 * math.sin(2 * math.pi * (t * 7.3))
            + 0.18 * t
        )
        heights.append(max(3, min(rows, int(v * rows))))

    def crest(c):
        return rx0 + c * stepx, y1 - (heights[c] - 1) * stepy

    # Streams: a woven band of S-curves between the zones.
    def curve(ax, ay, bx, by, n=90):
        mx = (ax + bx) / 2
        pts = []
        for k in range(n + 1):
            t = k / n
            u = 1 - t
            x = u * u * u * ax + 3 * u * u * t * mx + 3 * u * t * t * mx + t * t * t * bx
            y = u * u * u * ay + 3 * u * u * t * ay + 3 * u * t * t * by + t * t * t * by
            pts.append((x, y))
        return pts

    sx0, sx1 = lx1 + 14 * S, rx0 - 18 * S
    for k in range(150):
        ay = float(rng.uniform(y0 + 0.04 * (y1 - y0), y1 - 0.04 * (y1 - y0)))
        by = float(rng.uniform(y0 + 0.04 * (y1 - y0), y1 - 0.04 * (y1 - y0)))
        d.line(curve(sx0, ay, sx1, by), fill=rgba(WHITE, 22), width=S, joint="curve")

    # Modules. The ones on the right edge that carry an answer are cyan.
    gap = 5 * S
    edge = [i for i, (x, y, w, h) in enumerate(cells) if x + w > lx1 - 2]
    picks = sorted(rng.choice(edge, size=min(3, len(edge)), replace=False).tolist())
    targets = [int(cols * f) for f in (0.22, 0.55, 0.86)]
    for i, (x, y, w, h) in enumerate(cells):
        box = [x + gap, y + gap, x + w - gap, y + h - gap]
        if i in picks:
            d.rounded_rectangle(box, radius=7 * S, fill=rgba(CYAN, 235))
            continue
        kind = rng.random()
        d.rounded_rectangle(box, radius=7 * S, fill=rgba(WHITE, 9 + int(kind * 20)), outline=rgba(WHITE, 52), width=S)

    # Cyan streams: each lit module answers in one column of the reading.
    for i, c in zip(picks, targets):
        x, y, w, h = cells[i]
        ax, ay = x + w - gap, y + h / 2
        bx, by = crest(c)
        d.line([(ax, ay), (sx0, ay)], fill=rgba(CYAN, 225), width=2 * S)
        d.line(curve(sx0, ay, sx1, by), fill=rgba(CYAN, 225), width=2 * S, joint="curve")
        d.line([(sx1, by), (bx - 9 * S, by)], fill=rgba(CYAN, 225), width=2 * S)
        r = 13 * S
        d.ellipse([bx - r, by - r, bx + r, by + r], outline=rgba(CYAN, 120), width=S)

    for c in range(cols):
        px = rx0 + c * stepx
        hgt = heights[c]
        for r in range(rows):
            py = y1 - r * stepy
            if r < hgt - 1:
                a = 46 + 120 * (r / max(1, hgt - 1)) ** 1.6
                rad = 2.4 * S
                d.ellipse([px - rad, py - rad, px + rad, py + rad], fill=rgba(WHITE, a))
            elif r == hgt - 1:
                rad = (5.2 if c in targets else 4.2) * S
                d.ellipse([px - rad, py - rad, px + rad, py + rad], fill=rgba(CYAN, 255))
            else:
                rad = 1.1 * S
                d.ellipse([px - rad, py - rad, px + rad, py + rad], fill=rgba(WHITE, 26))
    finish(merge(img, over), "platform")


ALL = {
    "ai-solutions": art_ai,
    "automation": art_automation,
    "data-driven-solutions": art_data,
    "tailored-software-development": art_software,
    "technical-team-hiring": art_team,
    "about": art_about,
    "cta": art_cta,
    "platform": art_platform,
}


if __name__ == "__main__":
    import sys

    # No arguments renders the whole set; names render only those pieces.
    for name in sys.argv[1:] or ALL:
        ALL[name]()
