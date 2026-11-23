"use client";

import { useLayoutEffect, useRef, type ReactNode, type RefObject } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/** Pin only where a whole panel fits on screen and motion is welcome. */
const PIN_QUERY = "(min-width: 1024px) and (min-height: 700px) and (prefers-reduced-motion: no-preference)";

/**
 * Pins the section and turns vertical scroll into a horizontal pan, with an
 * optional rail that fills as the pan advances. On small or short screens and
 * under reduced motion it stays a native horizontal scroller with snap points,
 * so every panel is still reachable.
 */
export function HorizontalPan({
  header,
  children,
  label,
  id,
  ordered = false,
  progress = false,
}: {
  header: ReactNode;
  children: ReactNode;
  label: string;
  id?: string;
  /** Render the track as an ordered list. Children must then be `li` elements. */
  ordered?: boolean;
  progress?: boolean;
}) {
  const pin = useRef<HTMLDivElement>(null);
  const wrap = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLElement>(null);
  const fill = useRef<HTMLDivElement>(null);

  // Layout effect: the pin must be reverted before React removes the DOM on navigation.
  useLayoutEffect(() => {
    const mm = gsap.matchMedia();
    mm.add(PIN_QUERY, () => {
      const pinEl = pin.current;
      const wrapEl = wrap.current;
      const trackEl = track.current;
      const fillEl = fill.current;
      if (!pinEl || !wrapEl || !trackEl) return;
      wrapEl.scrollLeft = 0;
      pinEl.dataset.pinned = "true";
      const distance = () => Math.max(0, trackEl.scrollWidth - wrapEl.clientWidth);
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: pinEl,
          start: "top top",
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 0.6,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });
      tl.to(trackEl, { x: () => -distance() }, 0);
      if (fillEl) tl.fromTo(fillEl, { scaleX: 0 }, { scaleX: 1 }, 0);
      return () => {
        tl.scrollTrigger?.kill();
        tl.kill();
        gsap.set(trackEl, { clearProps: "transform" });
        if (fillEl) gsap.set(fillEl, { clearProps: "transform" });
        delete pinEl.dataset.pinned;
      };
    });
    return () => mm.revert();
  }, []);

  const trackProps = {
    className: "flex w-max gap-5 px-5 md:px-8 lg:gap-8 xl:px-[max(48px,calc((100vw-1320px)/2+48px))]",
    children,
  };

  return (
    // GSAP wraps the pinned element in a spacer. Pinning an inner div keeps that
    // spacer inside the section, so React still owns the node it will remove.
    <section id={id} aria-label={label}>
      <div ref={pin} className="pan flex flex-col justify-center py-24 lg:min-h-[100dvh] lg:py-0">
        <div className="shell">{header}</div>
        {progress && (
          <div className="shell pan-rail-shell" aria-hidden="true">
            <div className="pan-rail">
              <div ref={fill} className="pan-rail-fill" />
            </div>
          </div>
        )}
        <div ref={wrap} className="pan-wrap relative mt-10 lg:mt-12" tabIndex={0} role="group" aria-label={`${label}, scrollable`}>
          {/* role="list" keeps list semantics in Safari, which drops them when list-style is none. */}
          {ordered ? (
            <ol ref={track as RefObject<HTMLOListElement>} role="list" {...trackProps} />
          ) : (
            <div ref={track as RefObject<HTMLDivElement>} {...trackProps} />
          )}
        </div>
      </div>
    </section>
  );
}
