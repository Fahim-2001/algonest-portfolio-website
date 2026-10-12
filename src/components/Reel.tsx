"use client";

import { useEffect, useRef, useState } from "react";

const DIGITS = Array.from({ length: 20 }, (_, i) => i % 10);

/** Slot-machine digits that spin once when scrolled into view. Non-digits stay put. */
export function Reel({ value, className = "" }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [go, setGo] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setGo(true);
          io.disconnect();
        }
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  let col = 0;
  return (
    <span ref={ref} className={className}>
      <span className="sr-only">{value}</span>
      <span className="t-reel" aria-hidden="true">
        {value.split("").map((ch, i) => {
          if (!/\d/.test(ch)) return <span key={i}>{ch}</span>;
          const d = Number(ch);
          const index = col++;
          return (
            <span key={i} className="t-reel-col">
              <span
                className="t-reel-strip"
                style={
                  {
                    "--col": index,
                    transform: `translateY(calc(var(--reel-cell) * ${go ? -(10 + d) : 0}))`,
                  } as React.CSSProperties
                }
              >
                {DIGITS.map((n, k) => (
                  <span key={k} className="t-reel-digit">
                    {n}
                  </span>
                ))}
              </span>
            </span>
          );
        })}
      </span>
    </span>
  );
}
