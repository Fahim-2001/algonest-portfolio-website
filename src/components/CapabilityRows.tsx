"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { ArrowUpRight } from "@phosphor-icons/react";
import type { Capability } from "@/content/capabilities";

/** Capability list. With a mouse, the artwork for the hovered row follows the cursor. */
export function CapabilityRows({ items, label }: { items: Capability[]; label: string }) {
  const [active, setActive] = useState(-1);
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 260, damping: 28, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 260, damping: 28, mass: 0.5 });

  return (
    <div
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse") return;
        x.set(e.clientX);
        y.set(e.clientY);
      }}
      onPointerLeave={() => setActive(-1)}
    >
      <ul aria-label={label} className="border-t border-line">
        {items.map((c, i) => (
          <li key={c.slug} className="border-b border-line">
            <Link
              href={`/${c.slug}/`}
              onPointerEnter={(e) => e.pointerType === "mouse" && setActive(i)}
              onFocus={() => setActive(-1)}
              className="group grid items-start gap-5 py-10 md:grid-cols-[56px_minmax(0,6fr)_minmax(0,5fr)_48px] md:gap-x-10 md:py-14"
            >
              {/* Touch devices get the artwork inline; mouse users get it on the cursor. */}
              <Image
                src={c.art}
                alt=""
                width={1280}
                height={960}
                sizes="(min-width: 1320px) 1224px, 100vw"
                className="col-span-full aspect-[16/9] w-full rounded-[20px] object-cover md:aspect-[21/9] [@media(hover:hover)]:hidden"
              />
              <span className="font-mono text-sm text-accent-text md:pt-3">{c.index}</span>
              <h2 className="h2 text-balance transition-colors duration-300 group-hover:text-accent-text">{c.name}</h2>
              <p className="max-w-[52ch] text-muted md:pt-2">{c.summary}</p>
              <span
                className="hidden size-12 place-items-center rounded-full border border-line transition-colors duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-on-accent md:grid"
                aria-hidden="true"
              >
                <ArrowUpRight size={20} />
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <motion.div
        aria-hidden="true"
        style={{ x: reduce ? x : sx, y: reduce ? y : sy }}
        className="pointer-events-none fixed left-0 top-0 z-[1] hidden [@media(hover:hover)]:block"
      >
        <motion.div
          animate={{ opacity: active >= 0 ? 1 : 0, scale: active >= 0 ? 1 : 0.85 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="relative ml-8 mt-8 h-[225px] w-[300px] overflow-hidden rounded-[20px] bg-slate shadow-[0_30px_70px_-25px_rgb(5_10_13/0.7)]"
        >
          {items.map((c, i) => (
            <Image
              key={c.slug}
              src={c.art}
              alt=""
              fill
              sizes="300px"
              className={`object-cover transition-opacity duration-300 ${i === active ? "opacity-100" : "opacity-0"}`}
            />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}
