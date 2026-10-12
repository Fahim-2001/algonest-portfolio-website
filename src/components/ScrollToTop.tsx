"use client";

import { useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { ArrowUp } from "@phosphor-icons/react";
import { scrollToTop } from "@/lib/scroll";

const R = 22;
const LENGTH = 2 * Math.PI * R;

/** Appears after the first screen. The ring shows how far down the page you are. */
export function ScrollToTop() {
  const { scrollY, scrollYProgress } = useScroll();
  const [shown, setShown] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    const next = y > 700;
    setShown((s) => (s === next ? s : next));
  });

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Back to top"
      tabIndex={shown ? 0 : -1}
      aria-hidden={!shown}
      className={`fixed bottom-5 right-5 z-[45] grid size-12 place-items-center rounded-full border border-line bg-surface text-ink shadow-[0_12px_30px_-12px_rgb(5_10_13/0.6)] transition-[opacity,transform,background-color,color] duration-300 hover:bg-accent hover:text-on-accent md:bottom-8 md:right-8 ${
        shown ? "opacity-100" : "pointer-events-none translate-y-3 opacity-0"
      }`}
    >
      <svg className="absolute inset-0 -rotate-90" viewBox="0 0 48 48" fill="none" aria-hidden="true">
        <motion.circle
          cx="24"
          cy="24"
          r={R}
          stroke="var(--accent)"
          strokeWidth="2"
          strokeDasharray={LENGTH}
          style={{ pathLength: scrollYProgress }}
        />
      </svg>
      <ArrowUp size={18} weight="bold" aria-hidden="true" />
    </button>
  );
}
