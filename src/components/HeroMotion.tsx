"use client";

import { useEffect, useRef } from "react";

export type MotionVariant =
  | "ai-solutions"
  | "automation"
  | "data-driven-solutions"
  | "tailored-software-development"
  | "technical-team-hiring";

type Draw = (ctx: CanvasRenderingContext2D, t: number) => void;
type Scene = (w: number, h: number) => Draw;

// The panel is dark slate in both themes, so the palette is fixed.
const CYAN = "99,184,203";
const WHITE = "238,243,244";
const c = (rgb: string, a: number) => `rgba(${rgb},${a})`;

/** Small seeded generator so each scene is laid out the same on every visit. */
function rng(seed: number) {
  let s = seed;
  return () => {
    s = (s + 0x6d2b79f5) | 0;
    let x = Math.imul(s ^ (s >>> 15), 1 | s);
    x = (x + Math.imul(x ^ (x >>> 7), 61 | x)) ^ x;
    return ((x ^ (x >>> 14)) >>> 0) / 4294967296;
  };
}

/** AI: signals travel through a layered network and settle on one path. */
const ai: Scene = (w, h) => {
  const rand = rng(11);
  const cols = 7;
  const layers = Array.from({ length: cols }, (_, i) => {
    const t = i / (cols - 1);
    const n = Math.round(4 + 6 * Math.sin(Math.PI * t));
    const span = (0.3 + 0.48 * Math.sin(Math.PI * t)) * h;
    const x = w * (0.1 + 0.8 * t);
    return Array.from({ length: n }, (_, k) => ({
      x,
      y: h / 2 + (n === 1 ? 0 : (k / (n - 1) - 0.5) * span) + (rand() - 0.5) * 6,
    }));
  });
  const makePath = () => layers.map((l) => Math.floor(rand() * l.length));
  const pulses = Array.from({ length: 5 }, (_, i) => ({ path: makePath(), offset: i / 5, lap: 0 }));
  const SPEED = 0.16;

  return (ctx, t) => {
    ctx.lineWidth = 1;
    ctx.strokeStyle = c(WHITE, 0.07);
    ctx.beginPath();
    for (let i = 0; i < cols - 1; i++)
      for (const a of layers[i]) for (const b of layers[i + 1]) {
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
      }
    ctx.stroke();

    const lit = new Map<string, number>();
    for (const pulse of pulses) {
      const raw = t * SPEED + pulse.offset;
      const lap = Math.floor(raw);
      if (lap !== pulse.lap) {
        pulse.lap = lap;
        pulse.path = makePath();
      }
      const pos = (raw - lap) * (cols - 1);
      const seg = Math.min(cols - 2, Math.floor(pos));
      const f = pos - seg;
      // Trail: the segments already travelled, fading with distance.
      for (let i = 0; i <= seg; i++) {
        const a = layers[i][pulse.path[i]];
        const b = layers[i + 1][pulse.path[i + 1]];
        const end = i === seg ? f : 1;
        ctx.strokeStyle = c(CYAN, 0.75 * Math.max(0.12, 1 - (pos - i) / 3));
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(a.x + (b.x - a.x) * end, a.y + (b.y - a.y) * end);
        ctx.stroke();
        const key = `${i}:${pulse.path[i]}`;
        lit.set(key, Math.max(lit.get(key) ?? 0, 1 - (pos - i) / 3));
      }
      const a = layers[seg][pulse.path[seg]];
      const b = layers[seg + 1][pulse.path[seg + 1]];
      ctx.fillStyle = c(CYAN, 1);
      ctx.beginPath();
      ctx.arc(a.x + (b.x - a.x) * f, a.y + (b.y - a.y) * f, 4, 0, Math.PI * 2);
      ctx.fill();
    }

    layers.forEach((l, i) =>
      l.forEach((n, k) => {
        const glow = Math.max(0, lit.get(`${i}:${k}`) ?? 0);
        ctx.fillStyle = glow > 0 ? c(CYAN, 0.5 + glow * 0.5) : c(WHITE, 0.55);
        ctx.beginPath();
        ctx.arc(n.x, n.y, 2.6 + glow * 3, 0, Math.PI * 2);
        ctx.fill();
      }),
    );
  };
};

/** Automation: work items ride along streamlines without stopping. */
const automation: Scene = (w, h) => {
  const rand = rng(23);
  const angle = (x: number, y: number) => {
    const u = x / w;
    const v = y / h;
    return (1.1 * Math.sin(2.4 * u + 3.9 * v) + 0.8 * Math.cos(3.3 * v - 1.7 * u)) * 0.55 - 0.1;
  };
  const lines: { x: number; y: number }[][] = [];
  for (let i = 0; i < 46; i++) {
    let x = w * 0.04;
    let y = h * (0.08 + (0.84 * i) / 45);
    const pts = [{ x, y }];
    for (let s = 0; s < 240; s++) {
      const a = angle(x, y);
      x += Math.cos(a) * 5;
      y += Math.sin(a) * 5;
      if (x > w * 0.96 || y < h * 0.05 || y > h * 0.95) break;
      pts.push({ x, y });
    }
    if (pts.length > 30) lines.push(pts);
  }
  const riders = Array.from({ length: 16 }, () => ({
    line: Math.floor(rand() * lines.length),
    offset: rand(),
    speed: 0.05 + rand() * 0.06,
  }));

  return (ctx, t) => {
    ctx.lineWidth = 1;
    ctx.strokeStyle = c(WHITE, 0.1);
    for (const pts of lines) {
      ctx.beginPath();
      ctx.moveTo(pts[0].x, pts[0].y);
      for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i].x, pts[i].y);
      ctx.stroke();
    }
    for (const r of riders) {
      const pts = lines[r.line];
      const head = Math.floor(((t * r.speed + r.offset) % 1) * (pts.length - 1));
      const tail = Math.max(0, head - 22);
      for (let i = tail + 1; i <= head; i++) {
        ctx.strokeStyle = c(CYAN, ((i - tail) / (head - tail || 1)) * 0.9);
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(pts[i - 1].x, pts[i - 1].y);
        ctx.lineTo(pts[i].x, pts[i].y);
        ctx.stroke();
      }
      ctx.fillStyle = c(CYAN, 1);
      ctx.beginPath();
      ctx.arc(pts[head].x, pts[head].y, 3.2, 0, Math.PI * 2);
      ctx.fill();
    }
  };
};

/** Data: a live reading. Columns rise and fall, the crest is the insight. */
const data: Scene = (w, h) => {
  const cols = Math.max(24, Math.min(46, Math.round(w / 13)));
  const rows = Math.max(14, Math.round((h * 0.7) / (w * 0.84 / (cols - 1))));
  const x0 = w * 0.08;
  const stepX = (w * 0.84) / (cols - 1);
  const stepY = (h * 0.7) / (rows - 1);
  const y1 = h * 0.86;

  return (ctx, t) => {
    for (let col = 0; col < cols; col++) {
      const u = col / (cols - 1);
      const v =
        0.46 +
        0.22 * Math.sin(2 * Math.PI * (u * 1.2 - t * 0.07)) +
        0.12 * Math.sin(2 * Math.PI * (u * 3.1 + t * 0.11)) +
        0.06 * Math.sin(2 * Math.PI * (u * 7 - t * 0.19)) +
        0.14 * u;
      const top = Math.max(1, Math.min(rows - 1, Math.round(v * rows)));
      const x = x0 + col * stepX;
      for (let row = 0; row < rows; row++) {
        const y = y1 - row * stepY;
        if (row < top) {
          ctx.fillStyle = c(WHITE, 0.14 + 0.42 * (row / top) ** 1.6);
          ctx.fillRect(x - 1.5, y - 1.5, 3, 3);
        } else if (row === top) {
          ctx.fillStyle = c(CYAN, 1);
          ctx.beginPath();
          ctx.arc(x, y, 3.2, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.fillStyle = c(WHITE, 0.07);
          ctx.fillRect(x - 0.75, y - 0.75, 1.5, 1.5);
        }
      }
    }
  };
};

/** Tailored software: modules assemble into a system, then light up in turn. */
const software: Scene = (w, h) => {
  const rand = rng(47);
  const cells: { x: number; y: number; w: number; h: number; order: number }[] = [];
  const split = (x: number, y: number, cw: number, ch: number, depth: number) => {
    if (depth === 0 || Math.min(cw, ch) < 46 || (depth < 3 && rand() < 0.2)) {
      cells.push({ x, y, w: cw, h: ch, order: 0 });
      return;
    }
    const r = [0.382, 0.5, 0.618][Math.floor(rand() * 3)];
    if (cw > ch) {
      split(x, y, cw * r, ch, depth - 1);
      split(x + cw * r, y, cw * (1 - r), ch, depth - 1);
    } else {
      split(x, y, cw, ch * r, depth - 1);
      split(x, y + ch * r, cw, ch * (1 - r), depth - 1);
    }
  };
  split(w * 0.07, h * 0.09, w * 0.86, h * 0.82, 5);
  // Assemble outward from the top-left corner.
  cells.forEach((cell) => (cell.order = (cell.x + cell.y) / (w + h) + rand() * 0.08));
  const LOOP = 9;
  const GAP = 4;

  return (ctx, t) => {
    const time = t % LOOP;
    const out = time > LOOP - 0.9 ? (LOOP - time) / 0.9 : 1;
    cells.forEach((cell, i) => {
      const k = Math.max(0, Math.min(1, (time - cell.order * 2.2) / 0.55));
      const ease = 1 - (1 - k) ** 3;
      if (ease <= 0) return;
      const s = 0.7 + 0.3 * ease;
      const cw = (cell.w - GAP * 2) * s;
      const ch = (cell.h - GAP * 2) * s;
      const x = cell.x + cell.w / 2 - cw / 2;
      const y = cell.y + cell.h / 2 - ch / 2;
      // One module is "running" at a time once the system has assembled.
      const active = time > 3 && Math.floor((time - 3) / 0.55) % cells.length === (i * 7) % cells.length;
      ctx.beginPath();
      ctx.roundRect(x, y, cw, ch, 6);
      ctx.fillStyle = active ? c(CYAN, 0.92 * out) : c(WHITE, (0.05 + ((i * 37) % 10) * 0.008) * ease * out);
      ctx.fill();
      if (!active) {
        ctx.strokeStyle = c(WHITE, 0.2 * ease * out);
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    });
  };
};

/** Team: people join one by one and their reach overlaps into one body. */
const team: Scene = (w, h) => {
  const n = 5;
  const cy = h / 2;
  const R = Math.min(h * 0.36, w * 0.24);
  const xs = Array.from({ length: n }, (_, i) => w * (0.2 + (0.6 * i) / (n - 1)));
  const LOOP = 10;

  return (ctx, t) => {
    const time = t % LOOP;
    const out = time > LOOP - 0.8 ? (LOOP - time) / 0.8 : 1;
    const joined = (i: number) => Math.max(0, Math.min(1, (time - i * 0.7) / 0.9));

    // Line linking members as they join.
    ctx.strokeStyle = c(CYAN, 0.55 * out);
    ctx.lineWidth = 1.5;
    for (let i = 0; i < n - 1; i++) {
      const k = joined(i + 1);
      if (k <= 0) continue;
      ctx.beginPath();
      ctx.moveTo(xs[i], cy);
      ctx.lineTo(xs[i] + (xs[i + 1] - xs[i]) * k, cy);
      ctx.stroke();
    }

    xs.forEach((x, i) => {
      const k = joined(i);
      if (k <= 0) return;
      const core = i === Math.floor(n / 2);
      for (let ring = 0; ring < 5; ring++) {
        const phase = (t * 0.16 + ring / 5 + i * 0.13) % 1;
        const hot = core && ring % 2 === 0;
        ctx.strokeStyle = c(hot ? CYAN : WHITE, (1 - phase) * (hot ? 0.75 : 0.26) * k * out);
        ctx.lineWidth = hot ? 1.5 : 1;
        ctx.beginPath();
        ctx.arc(x, cy, phase * R * k, 0, Math.PI * 2);
        ctx.stroke();
      }
      ctx.fillStyle = c(core ? CYAN : WHITE, k * out);
      ctx.beginPath();
      ctx.arc(x, cy, 4 + (core ? 1.5 : 0), 0, Math.PI * 2);
      ctx.fill();
    });
  };
};

const SCENES: Record<MotionVariant, Scene> = {
  "ai-solutions": ai,
  automation,
  "data-driven-solutions": data,
  "tailored-software-development": software,
  "technical-team-hiring": team,
};

// A representative moment for the single frame shown under reduced motion.
const STILL_AT: Record<MotionVariant, number> = {
  "ai-solutions": 4.6,
  automation: 3,
  "data-driven-solutions": 2,
  "tailored-software-development": 6,
  "technical-team-hiring": 6,
};

/** Looping motion graphic for a service hero. Decorative. */
export function HeroMotion({ variant, className = "" }: { variant: MotionVariant; className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let draw: Draw | null = null;
    let raf = 0;
    let dpr = 1;
    let w = 0;
    let h = 0;
    let visible = true;
    let started = 0;

    const frame = (now: number) => {
      if (!draw) return;
      if (!started) started = now;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      draw(ctx, reduce ? STILL_AT[variant] : (now - started) / 1000);
    };
    const loop = (now: number) => {
      frame(now);
      raf = requestAnimationFrame(loop);
    };
    const start = () => {
      cancelAnimationFrame(raf);
      if (reduce) return frame(0);
      if (visible && !document.hidden) raf = requestAnimationFrame(loop);
    };
    const layout = () => {
      const rect = canvas.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = rect.width;
      h = rect.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      draw = SCENES[variant](w, h);
      start();
    };

    const ro = new ResizeObserver(layout);
    ro.observe(canvas);
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      start();
    });
    io.observe(canvas);
    document.addEventListener("visibilitychange", start);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", start);
    };
  }, [variant]);

  return (
    <div className={`art-panel overflow-hidden rounded-[20px] ${className}`}>
      <canvas ref={ref} aria-hidden="true" className="block size-full" />
    </div>
  );
}
