"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { ArrowUpRight } from "@phosphor-icons/react";
import type { Service } from "@/content/services";

/** Service list. With a mouse, the artwork for the hovered row follows the cursor. */
export function ServiceRows({ items }: { items: Service[] }) {
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
      <ul className="border-t border-line">
        {items.map((s, i) => (
          <li key={s.slug} className="border-b border-line">
            <Link
              href={`/${s.slug}/`}
              onPointerEnter={(e) => e.pointerType === "mouse" && setActive(i)}
              onFocus={() => setActive(-1)}
              className="group grid items-center gap-5 py-8 md:grid-cols-[220px_minmax(0,4fr)_minmax(0,5fr)_48px] md:gap-10 md:py-12 [@media(hover:hover)]:md:grid-cols-[minmax(0,5fr)_minmax(0,6fr)_48px]"
            >
              <Image
                src={s.art}
                alt=""
                width={640}
                height={480}
                sizes="100vw"
                className="aspect-[16/9] w-full rounded-[20px] object-cover [@media(hover:hover)]:hidden"
              />
              <h2 className="h2 transition-colors duration-300 group-hover:text-accent-text">{s.name}</h2>
              <p className="max-w-[52ch] text-muted">{s.summary}</p>
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
            {items.map((s, i) => (
              <Image
                key={s.slug}
                src={s.art}
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
