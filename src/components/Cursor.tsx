"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

const INTERACTIVE = "a, button, [role='tab'], label, select";
const TEXT = "input, textarea";

/**
 * Custom pointer: a dot that tracks the mouse exactly and a ring that trails it,
 * growing over anything clickable. Mouse users only. Touch, pen, keyboard and
 * reduced-motion users keep the system pointer.
 */
export function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [mode, setMode] = useState<"default" | "link" | "text" | "hidden">("hidden");
  const [down, setDown] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const rx = useSpring(x, { stiffness: 420, damping: 32, mass: 0.5 });
  const ry = useSpring(y, { stiffness: 420, damping: 32, mass: 0.5 });

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setEnabled(fine.matches && !reduce.matches);
    sync();
    fine.addEventListener("change", sync);
    reduce.addEventListener("change", sync);
    return () => {
      fine.removeEventListener("change", sync);
      reduce.removeEventListener("change", sync);
    };
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const root = document.documentElement;
    root.classList.add("has-cursor");

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      x.set(e.clientX);
      y.set(e.clientY);
      const target = e.target as Element | null;
      const next = target?.closest?.(TEXT) ? "text" : target?.closest?.(INTERACTIVE) ? "link" : "default";
      setMode((m) => (m === next ? m : next));
    };
    const onDown = () => setDown(true);
    const onUp = () => setDown(false);
    const onLeave = () => setMode("hidden");

    document.addEventListener("pointermove", onMove);
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("pointerup", onUp);
    root.addEventListener("pointerleave", onLeave);
    return () => {
      root.classList.remove("has-cursor");
      document.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("pointerup", onUp);
      root.removeEventListener("pointerleave", onLeave);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  const visible = mode !== "hidden" && mode !== "text";
  const link = mode === "link";

  return (
    <div aria-hidden="true">
      <motion.div
        className="cursor-ring"
        style={{ x: rx, y: ry }}
        animate={{
          scale: !visible ? 0.4 : down ? 0.8 : link ? 1.7 : 1,
          opacity: !visible ? 0 : link ? 0.9 : 0.55,
          backgroundColor: link ? "rgba(99,184,203,0.18)" : "rgba(99,184,203,0)",
          borderColor: link ? "var(--accent)" : "var(--text)",
        }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      />
      <motion.div
        className="cursor-dot"
        style={{ x, y }}
        animate={{ scale: !visible ? 0 : link ? 0.6 : 1, opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.2 }}
      />
    </div>
  );
}
