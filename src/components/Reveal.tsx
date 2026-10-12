"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Plays the staggered text reveal once, when the block enters the viewport.
 * Children opt in with the `t-stagger-line` class and an `--i` index.
 */
export function Reveal({
  children,
  className = "",
  as: Tag = "div",
  amount = 0.25,
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "section" | "ul" | "ol" | "header";
  amount?: number;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          el.classList.add("is-shown");
          io.disconnect();
        }
      },
      { threshold: amount, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [amount]);

  return (
    // @ts-expect-error ref type varies with the tag
    <Tag ref={ref} className={`t-stagger ${className}`}>
      {children}
    </Tag>
  );
}
