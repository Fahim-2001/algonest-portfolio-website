"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";

/** Artwork that drifts slower than the page inside a fixed frame. */
export function ParallaxImage({
  src,
  priority = false,
  className = "",
  sizes = "(min-width: 1024px) 50vw, 100vw",
}: {
  src: string;
  priority?: boolean;
  className?: string;
  sizes?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-7%", "7%"]);

  return (
    <div ref={ref} className={`relative overflow-hidden rounded-[20px] bg-slate ${className}`}>
      <motion.div style={{ y: reduce ? 0 : y }} className="absolute inset-[-8%]">
        <Image src={src} alt="" fill priority={priority} sizes={sizes} className="object-cover" />
      </motion.div>
    </div>
  );
}
