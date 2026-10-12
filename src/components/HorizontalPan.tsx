"use client";

import { useLayoutEffect, useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Pins the section and turns vertical scroll into a horizontal pan.
 * On small screens and under reduced motion it stays a native horizontal
 * scroller with snap points, so every panel is still reachable.
 */
export function HorizontalPan({
  header,
  children,
  label,
}: {
  header: ReactNode;
  children: ReactNode;
  label: string;
}) {
  const pin = useRef<HTMLDivElement>(null);
  const wrap = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);

  // Layout effect: the pin must be reverted before React removes the DOM on navigation.
  useLayoutEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
      const wrapEl = wrap.current;
      const trackEl = track.current;
      if (!pin.current || !wrapEl || !trackEl) return;
      wrapEl.scrollLeft = 0;
      wrapEl.dataset.pinned = "true";
      const distance = () => Math.max(0, trackEl.scrollWidth - wrapEl.clientWidth);
      const tween = gsap.to(trackEl, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: pin.current,
          start: "top top",
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 0.6,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });
      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
        gsap.set(trackEl, { clearProps: "transform" });
        delete wrapEl.dataset.pinned;
      };
    });
    return () => mm.revert();
  }, []);

  return (
    // GSAP wraps the pinned element in a spacer. Pinning an inner div keeps that
    // spacer inside the section, so React still owns the node it will remove.
    <section aria-label={label}>
      <div ref={pin} className="flex flex-col justify-center py-24 lg:min-h-[100dvh] lg:py-0">
      <div className="shell">{header}</div>
      <div ref={wrap} className="pan-wrap relative mt-10 lg:mt-12" tabIndex={0} role="group" aria-label={`${label}, scrollable`}>
        <div ref={track} className="flex w-max gap-5 px-5 md:px-8 lg:gap-8 xl:px-[max(48px,calc((100vw-1320px)/2+48px))]">
          {children}
        </div>
      </div>
      </div>
    </section>
  );
}
