"use client";

import { createRef, Fragment, useEffect, useMemo, useRef, useState, type ReactNode, type RefObject } from "react";
import { motion, useScroll, useTransform, type MotionStyle } from "motion/react";

/** Same condition as `.stage` in globals.css: stack only where a whole card fits. */
const STACK_QUERY = "(min-width: 1024px) and (min-height: 580px) and (prefers-reduced-motion: no-preference)";
/** Where the second card comes to rest (matches the CSS top offset). */
const REST = "start 122px";

function useStacking() {
  const [on, setOn] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(STACK_QUERY);
    const sync = () => setOn(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);
  return on;
}

/**
 * Cards that pin one after another. While the next card slides up over it, the
 * current one recedes and dims, so it stays in view as context. Elsewhere the
 * cards are an ordinary stack.
 */
export function StackedStages({ children }: { children: ReactNode[] }) {
  const stacking = useStacking();
  const count = children.length;
  // Zero-height markers in normal flow. A sticky card cannot be measured
  // reliably while it is stuck, so progress is read from the marker before it.
  const markers = useMemo(() => Array.from({ length: count }, () => createRef<HTMLDivElement>()), [count]);

  return (
    <div className="stage-stack">
      {children.map((child, i) => (
        <Fragment key={i}>
          <div ref={markers[i]} aria-hidden="true" />
          <Stage index={i} next={markers[i + 1]} stacking={stacking}>
            {child}
          </Stage>
        </Fragment>
      ))}
    </div>
  );
}

function Stage({
  children,
  index,
  next,
  stacking,
}: {
  children: ReactNode;
  index: number;
  next?: RefObject<HTMLDivElement | null>;
  stacking: boolean;
}) {
  const self = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: next ?? self, offset: ["start end", REST] });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.93]);
  const dim = useTransform(scrollYProgress, [0, 1], [0, 0.55]);
  const recedes = stacking && !!next;

  return (
    <motion.div
      ref={self}
      className="stage"
      style={{ "--i": index, scale: recedes ? scale : 1 } as MotionStyle}
    >
      {children}
      {recedes && (
        <motion.div
          aria-hidden="true"
          style={{ opacity: dim }}
          className="pointer-events-none absolute inset-0 rounded-[20px] bg-bg"
        />
      )}
    </motion.div>
  );
}
