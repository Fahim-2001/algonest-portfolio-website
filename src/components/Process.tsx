"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";
import { Reveal } from "./Reveal";

type Tab = {
  id: string;
  label: string;
  summary: string;
  steps: readonly { title: string; body: string }[];
};

/** Two processes behind a sliding tab control, with a line that draws as the steps are read. */
export function Process({ heading, tabs }: { heading: string; tabs: readonly Tab[] }) {
  const [active, setActive] = useState(0);
  const bar = useRef<HTMLDivElement>(null);
  const pill = useRef<HTMLSpanElement>(null);
  const list = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: list, offset: ["start 0.75", "end 0.55"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 26 });

  // Position the pill. First paint and resizes snap; clicks animate.
  const first = useRef(true);
  useEffect(() => {
    const place = (animate: boolean) => {
      const tab = bar.current?.querySelectorAll<HTMLButtonElement>(".t-tab")[active];
      const p = pill.current;
      if (!tab || !p) return;
      if (!animate) p.style.transition = "none";
      p.style.transform = `translateX(${tab.offsetLeft}px)`;
      p.style.width = `${tab.offsetWidth}px`;
      if (!animate) {
        void p.offsetWidth;
        p.style.transition = "";
      }
    };
    place(!first.current);
    first.current = false;
    const onResize = () => place(false);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [active]);

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const next = (active + (e.key === "ArrowRight" ? 1 : -1) + tabs.length) % tabs.length;
    setActive(next);
    bar.current?.querySelectorAll<HTMLButtonElement>(".t-tab")[next]?.focus();
  }

  const tab = tabs[active];

  return (
    <section className="shell grid gap-12 py-24 md:py-36 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
      <div className="lg:sticky lg:top-32 lg:self-start">
        <h2 className="h2">{heading}</h2>
        <div className="mt-8 max-w-full overflow-x-auto">
          <div ref={bar} className="t-tabs" role="tablist" aria-label="Process" onKeyDown={onKeyDown}>
            <span ref={pill} className="t-tabs-pill" aria-hidden="true" />
            {tabs.map((t, i) => (
              <button
                key={t.id}
                type="button"
                role="tab"
                id={`tab-${t.id}`}
                aria-selected={i === active}
                aria-controls={`panel-${t.id}`}
                tabIndex={i === active ? 0 : -1}
                onClick={() => setActive(i)}
                className="t-tab"
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
        <p className="lead mt-6 max-w-[36ch]">{tab.summary}</p>
      </div>

      <div ref={list} id={`panel-${tab.id}`} role="tabpanel" aria-labelledby={`tab-${tab.id}`} className="relative">
        <div className="absolute bottom-3 left-[19px] top-3 w-px bg-line" aria-hidden="true">
          <motion.div style={{ scaleY: reduce ? 1 : scaleY }} className="size-full origin-top bg-accent" />
        </div>
        <Reveal key={tab.id} as="ol" className="grid gap-10 md:gap-12" amount={0.05}>
          {tab.steps.map((step, i) => (
            <li
              key={step.title}
              className="t-stagger-line relative grid grid-cols-[40px_1fr] gap-5 md:gap-8"
              style={{ "--i": i } as React.CSSProperties}
            >
              <span
                className="grid size-10 place-items-center rounded-full border border-line bg-bg font-mono text-sm text-accent-text"
                aria-hidden="true"
              >
                {i + 1}
              </span>
              <div>
                <h3 className="h3">{step.title}</h3>
                <p className="mt-2 max-w-[48ch] text-muted">{step.body}</p>
              </div>
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
