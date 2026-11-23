"use client";

import { useEffect, useRef } from "react";
import { places, project, world } from "@/content/world";

/** Named looping scenes. Capabilities, process steps and prototypes pick one each. */
export type MotionScene =
  | "network"
  | "platform"
  | "reading"
  | "modules"
  | "streams"
  | "team"
  | "ledger"
  | "fitness"
  | "coverage";

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

/**
 * Platform: software, automation and data in one field. Modules assemble on the
 * left; work leaves the running module along a stream and lands in the reading
 * on the right, where the column it reaches lights up.
 */
const platform: Scene = (w, h) => {
  const rand = rng(61);
  const lx = w * 0.06;
  const lw = w * 0.3;
  const top = h * 0.18;
  const zh = h * 0.64;
  const rx = w * 0.64;
  const rw = w * 0.3;

  const cells: { x: number; y: number; w: number; h: number; order: number }[] = [];
  const split = (x: number, y: number, cw: number, ch: number, depth: number) => {
    if (depth === 0 || Math.min(cw, ch) < 30 || (depth < 2 && rand() < 0.3)) {
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
  split(lx, top, lw, zh, 5);
  cells.forEach((cell) => (cell.order = (cell.x - lx + cell.y - top) / (lw + zh) + rand() * 0.1));
  // Streams leave from modules on the zone's right edge.
  const edge = cells.filter((cell) => cell.x + cell.w > lx + lw - 1);

  const cols = Math.max(12, Math.min(24, Math.round(rw / 10)));
  const stepX = rw / (cols - 1);
  const rows = Math.max(12, Math.round(zh / stepX));
  const stepY = zh / (rows - 1);
  const base = top + zh;
  const heightAt = (col: number, t: number) => {
    const u = col / (cols - 1);
    const v =
      0.42 +
      0.2 * Math.sin(2 * Math.PI * (u * 1.1 - t * 0.06)) +
      0.1 * Math.sin(2 * Math.PI * (u * 2.9 + t * 0.09)) +
      0.05 * Math.sin(2 * Math.PI * (u * 7 - t * 0.17)) +
      0.16 * u;
    return Math.max(2, Math.min(rows - 1, Math.round(v * rows)));
  };

  const x0 = lx + lw + 6;
  const x1 = rx - 8;
  const streams = Array.from({ length: 7 }, (_, i) => {
    const cell = edge[i % edge.length];
    return {
      cell,
      y0: cell.y + cell.h * (0.3 + 0.4 * rand()),
      y1: top + zh * (0.12 + 0.76 * rand()),
      col: Math.floor(rand() * cols),
      speed: 0.11 + rand() * 0.07,
      offset: rand(),
    };
  });
  const point = (s: (typeof streams)[number], k: number) => {
    const u = 1 - k;
    const mx = (x0 + x1) / 2;
    return [
      u * u * u * x0 + 3 * u * u * k * mx + 3 * u * k * k * mx + k * k * k * x1,
      u * u * u * s.y0 + 3 * u * u * k * s.y0 + 3 * u * k * k * s.y1 + k * k * k * s.y1,
    ] as const;
  };
  const ASSEMBLED = 2.4;

  return (ctx, t) => {
    // Work only flows once the system has assembled.
    const flow = Math.max(0, Math.min(1, (t - ASSEMBLED) / 0.8));
    const running = new Set<(typeof cells)[number]>();
    const landed = new Map<number, number>();
    for (const s of streams) {
      const k = (t * s.speed + s.offset) % 1;
      if (k < 0.14) running.add(s.cell);
      if (k > 0.86) landed.set(s.col, Math.max(landed.get(s.col) ?? 0, (k - 0.86) / 0.14));
    }

    cells.forEach((cell, i) => {
      const k = Math.max(0, Math.min(1, (t - cell.order * 1.8) / 0.5));
      const ease = 1 - (1 - k) ** 3;
      if (ease <= 0) return;
      const s = 0.72 + 0.28 * ease;
      const cw = (cell.w - 6) * s;
      const ch = (cell.h - 6) * s;
      const on = flow > 0 && running.has(cell);
      ctx.beginPath();
      ctx.roundRect(cell.x + cell.w / 2 - cw / 2, cell.y + cell.h / 2 - ch / 2, cw, ch, 5);
      ctx.fillStyle = on ? c(CYAN, 0.9 * flow) : c(WHITE, (0.05 + ((i * 37) % 10) * 0.008) * ease);
      ctx.fill();
      if (!on) {
        ctx.strokeStyle = c(WHITE, 0.2 * ease);
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    });

    // The streams, faint, then the work travelling along them.
    ctx.lineWidth = 1;
    ctx.strokeStyle = c(WHITE, 0.08 * Math.max(0.35, flow));
    const mx = (x0 + x1) / 2;
    for (const s of streams) {
      ctx.beginPath();
      ctx.moveTo(x0, s.y0);
      ctx.bezierCurveTo(mx, s.y0, mx, s.y1, x1, s.y1);
      ctx.stroke();
    }
    if (flow > 0) {
      for (const s of streams) {
        const k = (t * s.speed + s.offset) % 1;
        let prev = point(s, k);
        for (let j = 1; j <= 16; j++) {
          const kk = k - j * 0.012;
          if (kk < 0) break;
          const p = point(s, kk);
          ctx.strokeStyle = c(CYAN, (1 - j / 16) * 0.85 * flow);
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(prev[0], prev[1]);
          ctx.lineTo(p[0], p[1]);
          ctx.stroke();
          prev = p;
        }
        const [hx, hy] = point(s, k);
        ctx.fillStyle = c(CYAN, flow);
        ctx.beginPath();
        ctx.arc(hx, hy, 3.2, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // The reading. A column glows as work lands in it.
    for (let col = 0; col < cols; col++) {
      const crest = heightAt(col, t);
      const x = rx + col * stepX;
      const glow = (landed.get(col) ?? 0) * flow;
      for (let row = 0; row < rows; row++) {
        const y = base - row * stepY;
        if (row < crest) {
          ctx.fillStyle = c(WHITE, 0.14 + 0.4 * (row / crest) ** 1.6);
          ctx.fillRect(x - 1.4, y - 1.4, 2.8, 2.8);
        } else if (row === crest) {
          ctx.fillStyle = c(CYAN, 1);
          ctx.beginPath();
          ctx.arc(x, y, 3 + glow * 2.5, 0, Math.PI * 2);
          ctx.fill();
          if (glow > 0) {
            ctx.strokeStyle = c(CYAN, 0.6 * (1 - glow));
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.arc(x, y, 6 + glow * 12, 0, Math.PI * 2);
            ctx.stroke();
          }
        } else {
          ctx.fillStyle = c(WHITE, 0.07);
          ctx.fillRect(x - 0.7, y - 0.7, 1.4, 1.4);
        }
      }
    }
  };
};

type Pt = { x: number; y: number };
const clamp01 = (v: number) => Math.max(0, Math.min(1, v));
const easeOut = (v: number) => 1 - (1 - v) ** 3;

/** Point on the S-curve that links a point on the left to one on the right. */
function sCurve(a: Pt, b: Pt, k: number): Pt {
  const mx = (a.x + b.x) / 2;
  const u = 1 - k;
  return {
    x: u * u * u * a.x + 3 * u * u * k * mx + 3 * u * k * k * mx + k * k * k * b.x,
    y: u * u * u * a.y + 3 * u * u * k * a.y + 3 * u * k * k * b.y + k * k * k * b.y,
  };
}

/** Strokes the S-curve from its start up to `upto` (0 to 1) of its length. */
function strokeS(ctx: CanvasRenderingContext2D, a: Pt, b: Pt, upto: number) {
  if (upto <= 0) return;
  ctx.beginPath();
  const steps = 32;
  for (let j = 0; j <= steps; j++) {
    const p = sCurve(a, b, (j / steps) * upto);
    if (j === 0) ctx.moveTo(p.x, p.y);
    else ctx.lineTo(p.x, p.y);
  }
  ctx.stroke();
}

/**
 * Reconciliation (Kvitt): each invoice on the left is read, its candidate
 * payments on the right are weighed, and the best one settles with its score.
 * One invoice has no payment, so it is flagged instead of guessed.
 */
const ledger: Scene = (w, h) => {
  const rand = rng(83);
  const s = Math.max(0.55, Math.min(w / 880, h / 495));
  const top = h * 0.11;
  const span = h * 0.78;

  const N = 5;
  const iw = w * 0.25;
  const ih = Math.min((span / N) * 0.76, 84 * s);
  const igap = (span - ih * N) / (N - 1);
  const invoices = Array.from({ length: N }, (_, i) => ({
    x: w * 0.07,
    y: top + i * (ih + igap),
    lines: [0.5 + rand() * 0.3, 0.3 + rand() * 0.45, 0.2 + rand() * 0.3],
  }));

  const M = 7;
  const tw = w * 0.3;
  const th = Math.min((span / M) * 0.6, 32 * s);
  const tgap = (span - th * M) / (M - 1);
  const rows = Array.from({ length: M }, (_, k) => ({
    x: w * 0.63,
    y: top + k * (th + tgap),
    text: 0.28 + rand() * 0.3,
    amount: 0.1 + rand() * 0.08,
  }));

  // The payment that settles each invoice, and the candidates weighed first.
  const match: (number | null)[] = [4, 0, 6, null, 2];
  const cands = [
    [4, 1, 5],
    [0, 3, 6],
    [6, 2, 1],
    [5, 3, 1],
    [2, 4, 3],
  ];
  const scores = [0.96, 0.88, 0.93, 0, 0.81];
  const D = 2.3;
  const LOOP = N * D + 1.6;
  const left = (i: number) => ({ x: invoices[i].x + iw, y: invoices[i].y + ih / 2 });
  const right = (k: number) => ({ x: rows[k].x, y: rows[k].y + th / 2 });
  const BG = "17,27,32"; // --art-bg, behind the score dial

  return (ctx, t) => {
    const time = t % LOOP;
    const out = time > LOOP - 0.7 ? (LOOP - time) / 0.7 : 1;
    const local = (i: number) => (time - i * D) / D;
    const cur = Math.floor(time / D);

    // Payments that have settled an invoice so far, and the ones being weighed.
    const settled = new Map<number, number>();
    match.forEach((k, i) => {
      if (k !== null && local(i) > 0.62) settled.set(k, clamp01((local(i) - 0.62) / 0.2));
    });
    const weighing = new Set<number>();
    if (cur < N && local(cur) > 0.28 && local(cur) < 0.7) cands[cur].forEach((k) => weighing.add(k));

    // Bank lines.
    rows.forEach((r, k) => {
      const v = (settled.get(k) ?? 0) * out;
      const cy = r.y + th / 2;
      ctx.beginPath();
      ctx.roundRect(r.x, r.y, tw, th, th / 2);
      ctx.fillStyle = v > 0 ? c(CYAN, 0.08 + 0.14 * v) : c(WHITE, 0.04 * out);
      ctx.fill();
      ctx.lineWidth = 1;
      ctx.strokeStyle = weighing.has(k) ? c(WHITE, 0.5 * out) : v > 0 ? c(CYAN, 0.6 * v) : c(WHITE, 0.14 * out);
      ctx.stroke();
      ctx.fillStyle = v > 0 ? c(CYAN, 0.9 * v) : c(WHITE, 0.35 * out);
      ctx.beginPath();
      ctx.arc(r.x + th / 2, cy, Math.max(2, th * 0.16), 0, Math.PI * 2);
      ctx.fill();
      const bar = Math.max(2, th * 0.14);
      ctx.fillStyle = c(WHITE, 0.22 * out);
      ctx.fillRect(r.x + th, cy - bar / 2, tw * r.text, bar);
      ctx.fillStyle = c(WHITE, 0.4 * out);
      ctx.fillRect(r.x + tw - th * 0.5 - tw * r.amount, cy - bar / 2, tw * r.amount, bar);
    });

    // Links: the current invoice reaches for its candidates, lets them go and
    // settles on one; settled pairs stay linked, quieter.
    for (let i = 0; i < N; i++) {
      const l = local(i);
      if (l <= 0.28) continue;
      const a = left(i);
      const k = match[i];
      const reach = easeOut(clamp01((l - 0.28) / 0.22));
      const letGo = 1 - clamp01((l - 0.62) / 0.14);
      if (letGo > 0) {
        ctx.lineWidth = 1;
        ctx.strokeStyle = c(WHITE, 0.32 * letGo * out);
        for (const cand of cands[i]) if (cand !== k || l < 0.62) strokeS(ctx, a, right(cand), reach);
      }
      if (k === null || l < 0.62) continue;
      const lock = clamp01((l - 0.62) / 0.16);
      ctx.lineWidth = 2;
      ctx.strokeStyle = c(CYAN, (l < 1 ? 0.35 + 0.55 * lock : 0.32) * out);
      strokeS(ctx, a, right(k), 1);

      // The score, filling as the match is confirmed.
      const dial = clamp01((l - 0.64) / 0.08) * (1 - clamp01((l - 1) / 0.2)) * out;
      if (dial > 0) {
        const m = sCurve(a, right(k), 0.5);
        const r = 11 * s;
        ctx.fillStyle = c(BG, dial);
        ctx.beginPath();
        ctx.arc(m.x, m.y, r + 4 * s, 0, Math.PI * 2);
        ctx.fill();
        ctx.lineWidth = 2.5 * s;
        ctx.strokeStyle = c(WHITE, 0.15 * dial);
        ctx.beginPath();
        ctx.arc(m.x, m.y, r, 0, Math.PI * 2);
        ctx.stroke();
        const fill = easeOut(clamp01((l - 0.66) / 0.22)) * scores[i];
        ctx.strokeStyle = c(CYAN, dial);
        ctx.beginPath();
        ctx.arc(m.x, m.y, r, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * fill);
        ctx.stroke();
      }
    }

    // Invoices.
    invoices.forEach((inv, i) => {
      const l = local(i);
      const active = l >= 0 && l < 1;
      const flagged = match[i] === null && l >= 0.62;
      const done = match[i] !== null && l >= 0.8;
      ctx.beginPath();
      ctx.roundRect(inv.x, inv.y, iw, ih, 6 * s);
      ctx.fillStyle = c(WHITE, (active ? 0.08 : 0.05) * out);
      ctx.fill();
      ctx.lineWidth = active ? 1.5 : 1;
      if (flagged) ctx.setLineDash([4 * s, 3 * s]);
      ctx.strokeStyle = flagged
        ? c(WHITE, 0.55 * out)
        : active
          ? c(CYAN, 0.85 * out)
          : c(WHITE, 0.16 * out);
      ctx.stroke();
      ctx.setLineDash([]);

      // Lines of text light up as the scan passes over them.
      const q = l <= 0 ? 0 : clamp01(l / 0.28);
      const pad = Math.max(6, iw * 0.07);
      inv.lines.forEach((len, j) => {
        const ly = inv.y + ih * (0.27 + j * 0.24);
        const bh = j === 0 ? Math.max(3, ih * 0.1) : Math.max(2, ih * 0.065);
        const read = q > (j + 0.6) / 3;
        ctx.fillStyle = read ? c(CYAN, (active ? 0.75 : 0.32) * out) : c(WHITE, (j === 0 ? 0.32 : 0.18) * out);
        ctx.fillRect(inv.x + pad, ly - bh / 2, (iw - pad * 2) * len, bh);
      });
      if (active && l < 0.28) {
        const sy = inv.y + ih * (0.08 + 0.84 * (l / 0.28));
        ctx.strokeStyle = c(CYAN, 0.9 * out);
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(inv.x + 3, sy);
        ctx.lineTo(inv.x + iw - 3, sy);
        ctx.stroke();
      }

      // A dot once settled, a flag when there is no payment to settle it.
      const mx = inv.x + iw;
      const my = inv.y + ih / 2;
      if (done) {
        ctx.fillStyle = c(CYAN, out);
        ctx.beginPath();
        ctx.arc(mx, my, 3.5 * s, 0, Math.PI * 2);
        ctx.fill();
      }
      if (flagged) {
        const v = clamp01((l - 0.62) / 0.15) * out;
        ctx.fillStyle = c(BG, v);
        ctx.beginPath();
        ctx.arc(mx, my, 10 * s, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = c(WHITE, 0.85 * v);
        ctx.lineWidth = 1.5;
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(mx, my - 5 * s);
        ctx.lineTo(mx, my + 1.5 * s);
        ctx.stroke();
        ctx.fillStyle = c(WHITE, 0.85 * v);
        ctx.beginPath();
        ctx.arc(mx, my + 4.5 * s, 1.2 * s, 0, Math.PI * 2);
        ctx.fill();
      }
    });
  };
};

/**
 * Fitness (FitSync): a member's week fills a progress ring day by day, and each
 * workout syncs to the gym. Around the gym, members drift away over time, and
 * each one gets a nudge before they fade.
 */
const fitness: Scene = (w, h) => {
  const rand = rng(97);
  const s = Math.max(0.55, Math.min(w / 880, h / 495));
  const ring = { x: w * 0.26, y: h * 0.5, r: Math.min(h * 0.3, w * 0.155) };
  const hub = { x: w * 0.72, y: h * 0.5 };
  const R = Math.min(h * 0.39, w * 0.21);
  const members = [
    ...Array.from({ length: 6 }, (_, j) => ({ r: R * 0.56, a0: (j / 6) * Math.PI * 2 + 0.4, dir: 1 })),
    ...Array.from({ length: 10 }, (_, j) => ({ r: R, a0: (j / 10) * Math.PI * 2, dir: -0.6 })),
  ].map((m) => ({ ...m, rate: 0.06 + rand() * 0.07, off: rand() }));
  // The member's progress across the week: a rising line with small setbacks.
  const trend = Array.from({ length: 8 }, (_, d) => 0.15 + 0.7 * (d / 7) + (rand() - 0.5) * 0.12);
  const DAY = 0.85;
  const LOOP = 7 * DAY + 1.8;
  const from = { x: ring.x + ring.r + 16 * s, y: ring.y };
  const to = { x: hub.x - 10 * s, y: hub.y };
  const bend = { x: (from.x + to.x) / 2, y: ring.y - h * 0.3 };
  const arcPoint = (k: number) => {
    const u = 1 - k;
    return {
      x: u * u * from.x + 2 * u * k * bend.x + k * k * to.x,
      y: u * u * from.y + 2 * u * k * bend.y + k * k * to.y,
    };
  };

  return (ctx, t) => {
    const time = t % LOOP;
    const out = time > LOOP - 0.6 ? (LOOP - time) / 0.6 : 1;
    const lit = Math.min(7, Math.floor(time / DAY));
    const week = clamp01(time / (7 * DAY));

    // Member side: the week's ring, its ticks and the streak.
    ctx.lineCap = "round";
    ctx.lineWidth = 7 * s;
    ctx.strokeStyle = c(WHITE, 0.08 * out);
    ctx.beginPath();
    ctx.arc(ring.x, ring.y, ring.r, 0, Math.PI * 2);
    ctx.stroke();
    if (week > 0) {
      const end = -Math.PI / 2 + Math.PI * 2 * week;
      ctx.strokeStyle = c(CYAN, 0.95 * out);
      ctx.beginPath();
      ctx.arc(ring.x, ring.y, ring.r, -Math.PI / 2, end);
      ctx.stroke();
      ctx.fillStyle = c(WHITE, out);
      ctx.beginPath();
      ctx.arc(ring.x + Math.cos(end) * ring.r, ring.y + Math.sin(end) * ring.r, 3 * s, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.lineCap = "butt";
    ctx.lineWidth = 2 * s;
    for (let d = 0; d < 7; d++) {
      const a = -Math.PI / 2 + ((d + 1) / 7) * Math.PI * 2;
      ctx.strokeStyle = d < lit ? c(CYAN, 0.9 * out) : c(WHITE, 0.2 * out);
      ctx.beginPath();
      ctx.moveTo(ring.x + Math.cos(a) * (ring.r + 9 * s), ring.y + Math.sin(a) * (ring.r + 9 * s));
      ctx.lineTo(ring.x + Math.cos(a) * (ring.r + 15 * s), ring.y + Math.sin(a) * (ring.r + 15 * s));
      ctx.stroke();
    }
    // Progress chart inside the ring: the week's course, faint, with the days so
    // far drawn over it and a point for each day logged.
    const gx = ring.r * 0.21;
    const x0 = ring.x - gx * 3.5;
    const yTop = ring.y - ring.r * 0.5;
    const yBottom = ring.y - ring.r * 0.02;
    const at = (d: number) => ({ x: x0 + d * gx, y: yBottom - (yBottom - yTop) * trend[d] });
    ctx.lineWidth = 1;
    ctx.strokeStyle = c(WHITE, 0.14 * out);
    ctx.beginPath();
    ctx.moveTo(x0, yBottom);
    ctx.lineTo(x0 + 7 * gx, yBottom);
    ctx.stroke();
    ctx.strokeStyle = c(WHITE, 0.18 * out);
    ctx.beginPath();
    for (let d = 0; d <= 7; d++) {
      const p = at(d);
      if (d === 0) ctx.moveTo(p.x, p.y);
      else ctx.lineTo(p.x, p.y);
    }
    ctx.stroke();
    const reach = Math.min(7, time / DAY);
    ctx.lineWidth = 2 * s;
    ctx.strokeStyle = c(CYAN, 0.95 * out);
    ctx.beginPath();
    for (let d = 0; d <= Math.floor(reach); d++) {
      const p = at(d);
      if (d === 0) ctx.moveTo(p.x, p.y);
      else ctx.lineTo(p.x, p.y);
    }
    if (reach < 7) {
      const d = Math.floor(reach);
      const a = at(d);
      const b = at(d + 1);
      const f = reach - d;
      ctx.lineTo(a.x + (b.x - a.x) * f, a.y + (b.y - a.y) * f);
    }
    ctx.stroke();
    for (let d = 0; d <= lit; d++) {
      const p = at(d);
      ctx.fillStyle = c(d === lit ? WHITE : CYAN, out);
      ctx.beginPath();
      ctx.arc(p.x, p.y, (d === lit ? 3 : 2.4) * s, 0, Math.PI * 2);
      ctx.fill();
    }
    // The streak: one dot a day.
    for (let d = 0; d < 7; d++) {
      const x = x0 + (d + 0.5) * gx;
      const y = ring.y + ring.r * 0.28;
      ctx.fillStyle = d < lit ? c(CYAN, out) : c(WHITE, 0.2 * out);
      ctx.beginPath();
      ctx.arc(x, y, (d < lit ? 3.6 : 2.6) * s, 0, Math.PI * 2);
      ctx.fill();
    }
    // A full week is a milestone.
    if (lit === 7) {
      const k = clamp01((time - 7 * DAY) / 1.1);
      for (let n = 0; n < 2; n++) {
        const kk = clamp01(k - n * 0.25);
        if (kk <= 0) continue;
        ctx.strokeStyle = c(CYAN, (1 - kk) * 0.6 * out);
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(ring.x, ring.y, ring.r + 18 * s + kk * ring.r * 0.7, 0, Math.PI * 2);
        ctx.stroke();
      }
    }

    // Each workout syncs to the gym.
    ctx.lineWidth = 1;
    ctx.strokeStyle = c(WHITE, 0.07 * out);
    ctx.beginPath();
    ctx.moveTo(from.x, from.y);
    ctx.quadraticCurveTo(bend.x, bend.y, to.x, to.y);
    ctx.stroke();
    for (let d = 1; d <= lit; d++) {
      const k = (time - d * DAY) / 0.8;
      if (k < 0 || k > 1) continue;
      for (let j = 0; j < 10; j++) {
        const kk = k - j * 0.018;
        if (kk < 0) break;
        const p = arcPoint(kk);
        ctx.fillStyle = c(CYAN, (1 - j / 10) * 0.9 * out);
        ctx.beginPath();
        ctx.arc(p.x, p.y, (j === 0 ? 3.4 : 2.2) * s, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Owner side: the gym and its members.
    ctx.lineWidth = 1;
    ctx.strokeStyle = c(WHITE, 0.07);
    for (const r of [R * 0.56, R]) {
      ctx.beginPath();
      ctx.arc(hub.x, hub.y, r, 0, Math.PI * 2);
      ctx.stroke();
    }
    const beat = (t * 0.6) % 1;
    ctx.strokeStyle = c(CYAN, (1 - beat) * 0.5);
    ctx.beginPath();
    ctx.arc(hub.x, hub.y, 9 * s + beat * 16 * s, 0, Math.PI * 2);
    ctx.stroke();
    ctx.fillStyle = c(CYAN, 1);
    ctx.beginPath();
    ctx.arc(hub.x, hub.y, 6.5 * s, 0, Math.PI * 2);
    ctx.fill();

    for (const m of members) {
      const ang = m.a0 + t * 0.07 * m.dir;
      const x = hub.x + Math.cos(ang) * m.r;
      const y = hub.y + Math.sin(ang) * m.r;
      const phase = (t * m.rate + m.off) % 1;
      const engaged = 1 - phase;
      // A nudge leaves the gym as the member is about to fade.
      if (phase > 0.8) {
        const k = easeOut((phase - 0.8) / 0.2);
        ctx.strokeStyle = c(CYAN, 0.6);
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(hub.x, hub.y);
        ctx.lineTo(hub.x + (x - hub.x) * k, hub.y + (y - hub.y) * k);
        ctx.stroke();
      }
      if (phase > 0.62) {
        ctx.strokeStyle = c(WHITE, 0.35);
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(x, y, 7.5 * s, 0, Math.PI * 2);
        ctx.stroke();
      }
      const flash = phase < 0.12 ? 1 - phase / 0.12 : 0;
      ctx.fillStyle = flash > 0 ? c(CYAN, 0.5 + 0.5 * flash) : c(WHITE, 0.18 + 0.7 * engaged);
      ctx.beginPath();
      ctx.arc(x, y, 3.4 * s, 0, Math.PI * 2);
      ctx.fill();
    }
  };
};

/**
 * Coverage: the world as a field of dots. From Bangladesh, where the team works,
 * a line is drawn to the United States and another to Australia; when each
 * arrives, a ripple spreads through the land around it.
 */
const coverage: Scene = (w, h) => {
  const cols = world.rows[0].length;
  const rows = world.rows.length;
  const cell = Math.min(w / cols, h / rows);
  const ox = (w - cell * cols) / 2;
  const oy = (h - cell * rows) / 2;
  // On a phone the cells are under 2px, so the dots keep a floor size and a brighter base.
  const sz = Math.max(cell * 0.58, 1.5);
  const base = cell < 3 ? 0.34 : 0.2;
  const dots: Pt[] = [];
  world.rows.forEach((row, r) => {
    for (let k = 0; k < cols; k++)
      if (row[k] === "#") dots.push({ x: ox + (k + 0.5) * cell, y: oy + (r + 0.5) * cell });
  });
  const at = (p: { lon: number; lat: number }): Pt => {
    const f = project(p);
    return { x: ox + f.x * cols * cell, y: oy + f.y * rows * cell };
  };
  const bd = at(places.bangladesh);
  const us = at(places.us);
  const au = at(places.australia);
  const s = Math.max(0.9, cell / 3.6);
  const R = w * 0.17;

  // Each route bends upward in proportion to its length.
  const route = (a: Pt, b: Pt) => {
    const lift = Math.hypot(b.x - a.x, b.y - a.y) * 0.28;
    return { a, b, c: { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 - lift } };
  };
  const along = (r: ReturnType<typeof route>, k: number): Pt => {
    const u = 1 - k;
    return {
      x: u * u * r.a.x + 2 * u * k * r.c.x + k * k * r.b.x,
      y: u * u * r.a.y + 2 * u * k * r.c.y + k * k * r.b.y,
    };
  };
  const toUs = route(bd, us);
  const toAu = route(bd, au);
  // When each line starts, how long it takes, and when its ripple follows.
  const legs = [
    { r: toUs, from: 0.8, dur: 2.8, end: us },
    { r: toAu, from: 2.2, dur: 2.2, end: au },
  ];
  const ripples = [
    { at: bd, from: 0.2, dur: 2.4, power: 0.55 },
    { at: bd, from: 3.0, dur: 2.4, power: 0.55 },
    { at: bd, from: 5.8, dur: 2.4, power: 0.55 },
    { at: us, from: 3.6, dur: 2.8, power: 1 },
    { at: au, from: 4.4, dur: 2.8, power: 1 },
  ];
  const LOOP = 9;

  return (ctx, t) => {
    const time = t % LOOP;
    const out = time > LOOP - 0.7 ? (LOOP - time) / 0.7 : 1;

    // The land, all at once.
    ctx.fillStyle = c(WHITE, base * out);
    ctx.beginPath();
    for (const d of dots) ctx.rect(d.x - sz / 2, d.y - sz / 2, sz, sz);
    ctx.fill();

    // Ripples light the dots they pass over.
    for (const rp of ripples) {
      const age = (time - rp.from) / rp.dur;
      if (age < 0 || age > 1) continue;
      const radius = easeOut(age) * R;
      const band = cell * 3.4;
      const fade = (1 - age) * rp.power * out;
      for (const d of dots) {
        const k = 1 - Math.abs(Math.hypot(d.x - rp.at.x, d.y - rp.at.y) - radius) / band;
        if (k <= 0) continue;
        ctx.fillStyle = c(CYAN, Math.min(1, base + 0.8 * k * fade));
        ctx.fillRect(d.x - sz * 0.75, d.y - sz * 0.75, sz * 1.5, sz * 1.5);
      }
    }

    // Lines from Bangladesh, drawn as they travel.
    for (const leg of legs) {
      const p = clamp01((time - leg.from) / leg.dur);
      if (p <= 0) continue;
      const k = easeOut(p);
      ctx.lineWidth = 1.5 * s;
      ctx.strokeStyle = c(CYAN, (p < 1 ? 0.7 : 0.4) * out);
      ctx.beginPath();
      const steps = 48;
      for (let j = 0; j <= steps; j++) {
        const q = along(leg.r, (j / steps) * k);
        if (j === 0) ctx.moveTo(q.x, q.y);
        else ctx.lineTo(q.x, q.y);
      }
      ctx.stroke();
      if (p < 1) {
        for (let j = 0; j < 9; j++) {
          const q = along(leg.r, Math.max(0, k - j * 0.012));
          ctx.fillStyle = c(WHITE, (1 - j / 9) * 0.9 * out);
          ctx.beginPath();
          ctx.arc(q.x, q.y, (j === 0 ? 3.2 : 2) * s, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }

    // Places. Bangladesh pulses; the others light up as the line arrives.
    const beat = (t * 0.45) % 1;
    ctx.lineWidth = 1.2 * s;
    ctx.strokeStyle = c(CYAN, (1 - beat) * 0.7 * out);
    ctx.beginPath();
    ctx.arc(bd.x, bd.y, (4 + beat * 12) * s, 0, Math.PI * 2);
    ctx.stroke();
    ctx.fillStyle = c(CYAN, out);
    ctx.beginPath();
    ctx.arc(bd.x, bd.y, 4.2 * s, 0, Math.PI * 2);
    ctx.fill();
    for (const leg of legs) {
      const k = clamp01((time - leg.from - leg.dur * 0.92) / 0.4);
      if (k <= 0) continue;
      ctx.strokeStyle = c(WHITE, 0.8 * k * out);
      ctx.lineWidth = 1.2 * s;
      ctx.beginPath();
      ctx.arc(leg.end.x, leg.end.y, (6 + (1 - k) * 8) * s, 0, Math.PI * 2);
      ctx.stroke();
      ctx.fillStyle = c(WHITE, k * out);
      ctx.beginPath();
      ctx.arc(leg.end.x, leg.end.y, 3.6 * s, 0, Math.PI * 2);
      ctx.fill();
    }
  };
};

const SCENES: Record<MotionScene, Scene> = {
  network: ai,
  platform,
  reading: data,
  modules: software,
  streams: automation,
  team,
  ledger,
  fitness,
  coverage,
};

// A representative moment for the single frame shown under reduced motion.
const STILL_AT: Record<MotionScene, number> = {
  network: 4.6,
  platform: 6.2,
  reading: 2,
  modules: 6,
  streams: 3,
  team: 6,
  ledger: 6.7,
  fitness: 4.7,
  coverage: 5.2,
};

/**
 * Looping motion graphic on a dark art panel. Decorative. The panel takes its
 * size, radius and position from `className`. `still` draws one representative
 * frame and never loops, for small previews.
 */
export function HeroMotion({
  scene,
  className = "",
  still = false,
}: {
  scene: MotionScene;
  className?: string;
  still?: boolean;
}) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduce = still || window.matchMedia("(prefers-reduced-motion: reduce)").matches;
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
      draw(ctx, reduce ? STILL_AT[scene] : (now - started) / 1000);
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
      draw = SCENES[scene](w, h);
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
  }, [scene, still]);

  return (
    <div className={`art-panel overflow-hidden ${className}`}>
      <canvas ref={ref} aria-hidden="true" className="block size-full" />
    </div>
  );
}
