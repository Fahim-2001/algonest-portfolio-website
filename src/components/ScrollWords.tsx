"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";

function Word({
  children,
  progress,
  range,
  still,
  accent,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
  still: boolean;
  accent: boolean;
}) {
  const opacity = useTransform(progress, range, [0.16, 1]);
  return (
    <motion.span style={{ opacity: still ? 1 : opacity }} className={accent ? "text-accent-text" : undefined}>
      {children}{" "}
    </motion.span>
  );
}

/**
 * Brings a sentence up to full strength word by word as it is scrolled.
 * `accent` names a closing phrase of `text` to set in the accent colour.
 * The markup is the same with reduced motion (only the values are fixed), so
 * server and client output always match.
 */
export function ScrollWords({ text, accent, className = "" }: { text: string; accent?: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.5"] });
  const words = text.split(" ");
  const from = accent && text.endsWith(accent) ? words.length - accent.split(" ").length : words.length;

  return (
    <p ref={ref} className={className}>
      {words.map((word, i) => (
        <Word
          key={i}
          progress={scrollYProgress}
          range={[i / words.length, (i + 1) / words.length]}
          still={!!reduce}
          accent={i >= from}
        >
          {word}
        </Word>
      ))}
    </p>
  );
}
