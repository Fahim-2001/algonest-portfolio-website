"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { home, site } from "@/content/site";
import { MagneticLink } from "./MagneticLink";

/** Closing call to action. The artwork panel grows to full size as it arrives. */
export function Cta({ heading = home.cta.heading }: { heading?: string }) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const scale = useTransform(scrollYProgress, [0, 1], [0.86, 1]);
  const artScale = useTransform(scrollYProgress, [0, 1], [1.35, 1.05]);

  return (
    <section ref={ref} className="shell py-16 md:py-24">
      <motion.div
        style={{ scale: reduce ? 1 : scale }}
        className="relative grid min-h-[70dvh] place-items-center overflow-hidden rounded-[20px] bg-slate px-6 py-20 text-center"
      >
        <motion.div style={{ scale: reduce ? 1.05 : artScale }} className="absolute inset-0" aria-hidden="true">
          <Image src="/art/cta.webp" alt="" fill sizes="100vw" className="object-cover opacity-70" />
        </motion.div>
        <div className="relative">
          <h2 className="h2 mx-auto max-w-[14ch] text-on-art">{heading}</h2>
          <MagneticLink href={site.cta.href} className="btn btn-primary mt-4 min-h-14 px-8 text-lg">
            {site.cta.label}
          </MagneticLink>
        </div>
      </motion.div>
    </section>
  );
}
