import type Lenis from "lenis";

/** The active smooth-scroll instance, if one is running. */
let lenis: Lenis | null = null;

export function setLenis(instance: Lenis | null) {
  lenis = instance;
}

export function scrollToTop() {
  if (lenis) lenis.scrollTo(0);
  else {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  }
}

/** Jump without animation, for route changes. */
export function resetScroll() {
  lenis?.scrollTo(0, { immediate: true, force: true });
}
