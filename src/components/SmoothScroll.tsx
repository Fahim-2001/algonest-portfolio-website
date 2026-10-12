"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { resetScroll, setLenis } from "@/lib/scroll";

/**
 * Drift scrolling: wheel input eases toward its target, so the page glides and
 * settles after the wheel stops. Mouse and trackpad only. Touch keeps native
 * scrolling, and reduced motion switches it off entirely.
 */
export function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ lerp: 0.085, wheelMultiplier: 1, autoRaf: true });
    setLenis(lenis);
    return () => {
      setLenis(null);
      lenis.destroy();
    };
  }, []);

  // A new page starts at the top, without gliding there from the old position.
  useEffect(() => {
    resetScroll();
  }, [pathname]);

  return null;
}
