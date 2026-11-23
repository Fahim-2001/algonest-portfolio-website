import type Lenis from "lenis";

/** The active smooth-scroll instance, if one is running. */
let lenis: Lenis | null = null;

// Element targets need no offset: like a native jump, Lenis honours the
// target's scroll-margin-top and html's scroll-padding-top (globals.css), so
// passing one here would count the header twice.

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

/**
 * Scroll to an element on this page (in-page navigation such as the project
 * index), then move focus to it so keyboard and screen reader users land there
 * too. The target needs tabIndex={-1}.
 */
export function scrollToId(id: string) {
  const target = document.getElementById(id);
  if (!target) return;
  if (lenis) lenis.scrollTo(target);
  else {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    target.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  }
  target.focus({ preventScroll: true });
}

/**
 * Jump without animation, for route changes. A URL with a #hash lands on its
 * target (redirected service URLs and the footer's partner link rely on this);
 * anything else starts at the top.
 */
export function resetScroll() {
  if (!lenis) return;
  const id = decodeURIComponent(window.location.hash.slice(1));
  const target = id ? document.getElementById(id) : null;
  if (target) lenis.scrollTo(target, { immediate: true, force: true });
  else lenis.scrollTo(0, { immediate: true, force: true });
}
