"use client";

import { useRef, type ReactNode } from "react";

const MAX = 9; // peak tilt in degrees

/** 3D tilt toward the pointer with a soft glare. Mouse only. */
export function TiltCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  const outer = useRef<HTMLDivElement>(null);
  const card = useRef<HTMLDivElement>(null);

  function reset() {
    outer.current?.classList.remove("is-hover");
    card.current?.classList.remove("is-tilting");
    card.current?.style.setProperty("--tilt-rx", "0deg");
    card.current?.style.setProperty("--tilt-ry", "0deg");
  }

  function track(e: React.PointerEvent) {
    if (e.pointerType !== "mouse" || !outer.current || !card.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = outer.current.getBoundingClientRect();
    const px = Math.min(1, Math.max(0, (e.clientX - r.left) / r.width));
    const py = Math.min(1, Math.max(0, (e.clientY - r.top) / r.height));
    outer.current.classList.add("is-hover");
    card.current.classList.add("is-tilting");
    card.current.style.setProperty("--tilt-ry", `${((px - 0.5) * MAX).toFixed(2)}deg`);
    card.current.style.setProperty("--tilt-rx", `${((0.5 - py) * MAX).toFixed(2)}deg`);
    card.current.style.setProperty("--tilt-gx", `${(px * 100).toFixed(1)}%`);
    card.current.style.setProperty("--tilt-gy", `${(py * 100).toFixed(1)}%`);
  }

  return (
    <div ref={outer} className={`t-tilt ${className}`} onPointerMove={track} onPointerLeave={reset}>
      <div ref={card} className="t-tilt-card h-full">
        {children}
        <div className="t-tilt-glare" aria-hidden="true" />
      </div>
    </div>
  );
}
