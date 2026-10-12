"use client";

import { useEffect, useRef } from "react";

type P = { x: number; y: number; vx: number; vy: number; tx: number; ty: number; c: 0 | 1; ph: number; ra: number; rr: number };

// One cycle: the points hold the logo, then loosen into an orbiting nest and return.
const CYCLE = 13;
const NEST_FROM = 8.5;

const MAX_POINTS = 2200;

/**
 * A field of points that settles into the logo's two ribbons (sampled from the
 * logo file itself), opens into an orbiting nest, and gathers back into the
 * logo. The points part around the pointer. Decorative.
 */
export function HeroCanvas({ src }: { src: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let points: P[] = [];
    let samples: { u: number; v: number; c: 0 | 1 }[] = [];
    let w = 0;
    let h = 0;
    let dpr = 1;
    let size = 0;
    let raf = 0;
    let t0 = 0;
    let visible = true;
    let colours = ["#63b8cb", "#eef3f4"];
    const pointer = { x: -9999, y: -9999 };

    const readColours = () => {
      const cs = getComputedStyle(document.documentElement);
      colours = [cs.getPropertyValue("--accent").trim(), cs.getPropertyValue("--text").trim()];
    };

    const layout = () => {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = rect.width;
      h = rect.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      size = Math.min(w, h) * 0.74;
      const ox = (w - size) / 2;
      const oy = (h - size) / 2;
      points = samples.map((s, i) => {
        const prev = points[i];
        const tx = ox + s.u * size;
        const ty = oy + s.v * size;
        return {
          x: prev ? prev.x : reduce ? tx : Math.random() * w,
          y: prev ? prev.y : reduce ? ty : Math.random() * h,
          vx: 0,
          vy: 0,
          tx,
          ty,
          c: s.c,
          ph: Math.random() * Math.PI * 2,
          ra: prev ? prev.ra : Math.random() * Math.PI * 2,
          rr: prev ? prev.rr : 0.62 + Math.random() * 0.4,
        };
      });
    };

    const draw = (t: number) => {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      const r = Math.max(1.1, Math.min(w, h) / 360);
      if (!t0) t0 = t;
      const secs = (t - t0) / 1000;
      const nest = !reduce && secs % CYCLE > NEST_FROM;
      for (const c of [0, 1] as const) {
        ctx.fillStyle = colours[c];
        ctx.beginPath();
        for (const p of points) {
          if (p.c !== c) continue;
          if (!reduce) {
            const dx = p.x - pointer.x;
            const dy = p.y - pointer.y;
            const d2 = dx * dx + dy * dy;
            let gx = p.tx + Math.sin(t / 1400 + p.ph) * 1.6;
            let gy = p.ty + Math.cos(t / 1700 + p.ph) * 1.6;
            if (nest) {
              const a = p.ra + secs * (0.35 + (1 - p.rr) * 0.5);
              gx = w / 2 + Math.cos(a) * size * 0.56 * p.rr;
              gy = h / 2 + Math.sin(a) * size * 0.44 * p.rr;
            }
            let ax = (gx - p.x) * (nest ? 0.02 : 0.045);
            let ay = (gy - p.y) * (nest ? 0.02 : 0.045);
            if (d2 < 12100) {
              const f = (1 - d2 / 12100) * 2.4;
              const d = Math.sqrt(d2) || 1;
              ax += (dx / d) * f;
              ay += (dy / d) * f;
            }
            p.vx = (p.vx + ax) * 0.86;
            p.vy = (p.vy + ay) * 0.86;
            p.x += p.vx;
            p.y += p.vy;
          }
          ctx.rect(p.x - r, p.y - r, r * 2, r * 2);
        }
        ctx.fill();
      }
    };

    const loop = (t: number) => {
      draw(t);
      raf = requestAnimationFrame(loop);
    };
    const start = () => {
      cancelAnimationFrame(raf);
      if (reduce) return draw(0);
      if (visible && !document.hidden) raf = requestAnimationFrame(loop);
    };

    // Sample the two ribbon colours out of the logo bitmap.
    const img = new Image();
    img.onload = () => {
      const n = 200;
      const off = document.createElement("canvas");
      off.width = off.height = n;
      const octx = off.getContext("2d", { willReadFrequently: true });
      if (!octx) return;
      octx.drawImage(img, 0, 0, n, n);
      const data = octx.getImageData(0, 0, n, n).data;
      const found: { x: number; y: number; c: 0 | 1 }[] = [];
      let minX = n, minY = n, maxX = 0, maxY = 0;
      for (let y = 0; y < n; y++) {
        for (let x = 0; x < n; x++) {
          const i = (y * n + x) * 4;
          const r = data[i], g = data[i + 1], b = data[i + 2];
          const cyan = b > 160 && g > 140 && r < 150;
          const white = r > 205 && g > 205 && b > 205;
          if (!cyan && !white) continue;
          found.push({ x, y, c: cyan ? 0 : 1 });
          if (x < minX) minX = x;
          if (x > maxX) maxX = x;
          if (y < minY) minY = y;
          if (y > maxY) maxY = y;
        }
      }
      const span = Math.max(maxX - minX, maxY - minY) || 1;
      const padX = (span - (maxX - minX)) / 2;
      const padY = (span - (maxY - minY)) / 2;
      const keep = Math.min(1, MAX_POINTS / found.length);
      samples = found
        .filter(() => Math.random() < keep)
        .map((f) => ({ u: (f.x - minX + padX) / span, v: (f.y - minY + padY) / span, c: f.c }));
      layout();
      start();
    };
    img.src = src;

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
    };
    const onLeave = () => {
      pointer.x = pointer.y = -9999;
    };
    const onVisibility = () => start();

    readColours();
    const ro = new ResizeObserver(() => {
      layout();
      if (reduce) draw(0);
    });
    ro.observe(canvas);
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      start();
    });
    io.observe(canvas);
    const mo = new MutationObserver(() => {
      readColours();
      if (reduce) draw(0);
    });
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerleave", onLeave);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelAnimationFrame(raf);
      img.onload = null;
      ro.disconnect();
      io.disconnect();
      mo.disconnect();
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [src]);

  return <canvas ref={ref} aria-hidden="true" className="block size-full" />;
}
