"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useMotionValueEvent, useReducedMotion, useScroll } from "motion/react";
import { CaretDown, List, X } from "@phosphor-icons/react";
import { capabilities, services } from "@/content/capabilities";
import { capabilitiesPage, nav, site } from "@/content/site";
import { ThemeToggle } from "./ThemeToggle";

const CLOSE_MS = 150; // matches --dropdown-close-dur

export function Header() {
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropState, setDropState] = useState<"closed" | "open" | "closing">("closed");
  const [menuShown, setMenuShown] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const dropRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Hide on the way down, return on the way up.
  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    const next = y > prev && y > 160;
    setHidden((h) => (h === next ? h : next));
  });

  function closeDropdown() {
    setDropState((s) => {
      if (s !== "open") return s;
      if (closeTimer.current) clearTimeout(closeTimer.current);
      closeTimer.current = setTimeout(() => setDropState("closed"), CLOSE_MS);
      return "closing";
    });
  }

  function toggleDropdown() {
    if (dropState === "open") return closeDropdown();
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setDropState("open");
  }

  // Close everything on navigation.
  useEffect(() => {
    setMenuOpen(false);
    setDropState("closed");
  }, [pathname]);

  useEffect(() => () => void (closeTimer.current && clearTimeout(closeTimer.current)), []);

  // Dropdown: outside click and Escape.
  useEffect(() => {
    if (dropState !== "open") return;
    const onDown = (e: PointerEvent) => {
      if (!dropRef.current?.contains(e.target as Node)) closeDropdown();
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeDropdown();
        dropRef.current?.querySelector("button")?.focus();
      }
    };
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [dropState]);

  // Mobile menu: lock scroll, trap focus, close on Escape.
  useEffect(() => {
    if (!menuOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") return setMenuOpen(false);
      if (e.key !== "Tab" || !wrapRef.current) return;
      const items = Array.from(
        wrapRef.current.querySelectorAll<HTMLElement>("a[href], button:not([disabled])"),
      ).filter((el) => el.offsetParent !== null);
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    // Reveal the links one frame after the panel is displayed so the stagger plays.
    const raf = requestAnimationFrame(() => setMenuShown(true));
    return () => {
      cancelAnimationFrame(raf);
      setMenuShown(false);
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  const isActive = (href: string) => pathname === href || pathname === href.replace(/\/$/, "");
  const inCapabilities =
    pathname.startsWith("/services") || capabilities.some((c) => pathname.startsWith(`/${c.slug}`));
  const show = !hidden || menuOpen || dropState === "open";

  return (
    <div ref={wrapRef}>
    <motion.header
      initial={false}
      animate={{ y: show ? 0 : -96 }}
      transition={reduce ? { duration: 0 } : { duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      onFocusCapture={() => setHidden(false)}
      className="fixed inset-x-0 top-0 z-40 pt-3"
    >
      <div className="shell">
        <div className="flex h-16 items-center justify-between gap-4 rounded-full border border-line bg-[var(--header-bg)] pl-3 pr-2 backdrop-blur-xl backdrop-saturate-150">
          <Link href="/" className="flex items-center gap-2.5 rounded-full pr-2" aria-label={`${site.name} home`}>
            <Image src="/logo.jpeg" alt="" width={40} height={40} priority className="rounded-full" />
            <span className="text-lg font-semibold tracking-tight">{site.name}</span>
          </Link>

          <nav aria-label="Main" className="hidden items-center gap-1 xl:flex">
            <div ref={dropRef} className="relative">
              <button
                type="button"
                onClick={toggleDropdown}
                aria-expanded={dropState === "open"}
                aria-controls="capabilities-menu"
                className={`inline-flex h-11 items-center gap-1.5 whitespace-nowrap rounded-full px-4 font-medium transition-colors duration-200 hover:text-ink ${inCapabilities ? "text-ink" : "text-muted"}`}
              >
                {capabilitiesPage.crumb}
                <CaretDown
                  size={14}
                  weight="bold"
                  aria-hidden="true"
                  className={`transition-transform duration-200 ${dropState === "open" ? "rotate-180" : ""}`}
                />
              </button>
              <div
                id="capabilities-menu"
                data-origin="top-center"
                className={`t-dropdown absolute left-1/2 top-[calc(100%+14px)] w-[440px] -translate-x-1/2 ${
                  dropState === "open" ? "is-open" : dropState === "closing" ? "is-closing" : ""
                }`}
              >
                <ul className="rounded-[20px] border border-line bg-surface p-2 shadow-[0_24px_60px_-20px_rgb(5_10_13/0.6)]">
                  {capabilities.map((c) => (
                    <li key={c.slug}>
                      <Link
                        href={`/${c.slug}/`}
                        aria-current={isActive(`/${c.slug}/`) ? "page" : undefined}
                        className="group grid grid-cols-[36px_minmax(0,1fr)] gap-3 rounded-xl px-3 py-3 transition-colors duration-150 hover:bg-surface-2"
                      >
                        <span className="font-mono text-sm leading-6 text-accent-text">{c.index}</span>
                        <span>
                          <span className="block font-medium leading-6 group-aria-[current=page]:text-accent-text">{c.short}</span>
                          <span className="mt-0.5 block text-sm text-muted">{c.menuNote}</span>
                        </span>
                      </Link>
                    </li>
                  ))}
                  <li className="mt-1 border-t border-line px-3 pb-1 pt-3" aria-hidden="true">
                    <span className="label">{capabilitiesPage.menuServices}</span>
                  </li>
                  {services.map((svc) => (
                    <li key={svc.id}>
                      <Link
                        href={svc.href}
                        className="flex min-h-11 items-center justify-between gap-4 rounded-xl px-3 transition-colors duration-150 hover:bg-surface-2"
                      >
                        <span className="font-medium">{svc.title}</span>
                        <span className="text-sm text-muted">{svc.category}</span>
                      </Link>
                    </li>
                  ))}
                  <li className="mt-1 border-t border-line pt-1">
                    <Link
                      href="/services/"
                      className="flex min-h-11 items-center rounded-xl px-3 text-muted transition-colors duration-150 hover:bg-surface-2 hover:text-ink"
                    >
                      {capabilitiesPage.menuAll}
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <Link
              href="/projects/"
              aria-current={isActive("/projects/") ? "page" : undefined}
              className="inline-flex h-11 items-center whitespace-nowrap rounded-full px-4 font-medium text-muted transition-colors duration-200 hover:text-ink aria-[current=page]:text-ink"
            >
              Projects
            </Link>
            <Link
              href="/articles/"
              aria-current={pathname.startsWith("/articles") ? "page" : undefined}
              className="inline-flex h-11 items-center whitespace-nowrap rounded-full px-4 font-medium text-muted transition-colors duration-200 hover:text-ink aria-[current=page]:text-ink"
            >
              Articles
            </Link>
            <Link
              href="/about-us/"
              aria-current={isActive("/about-us/") ? "page" : undefined}
              className="inline-flex h-11 items-center whitespace-nowrap rounded-full px-4 font-medium text-muted transition-colors duration-200 hover:text-ink aria-[current=page]:text-ink"
            >
              About Us
            </Link>
            <Link
              href="/contact-us/"
              aria-current={isActive("/contact-us/") ? "page" : undefined}
              className="inline-flex h-11 items-center whitespace-nowrap rounded-full px-4 font-medium text-muted transition-colors duration-200 hover:text-ink aria-[current=page]:text-ink"
            >
              Contact Us
            </Link>
          </nav>

          <div className="flex items-center gap-1">
            <ThemeToggle />
            <Link href={site.cta.href} className="btn btn-primary btn-sm hidden sm:inline-flex">
              {site.cta.label}
            </Link>
            <button
              type="button"
              onClick={() => setMenuOpen((o) => !o)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              className="grid size-11 place-items-center rounded-full xl:hidden"
            >
              {menuOpen ? <X size={22} aria-hidden="true" /> : <List size={22} aria-hidden="true" />}
            </button>
          </div>
        </div>
      </div>
    </motion.header>

      {/* Outside the animated header: a transformed ancestor would capture position: fixed. */}
      <div
        id="mobile-menu"
        hidden={!menuOpen}
        data-lenis-prevent
        className="fixed inset-0 z-[39] overflow-y-auto bg-bg pb-10 pt-28 xl:hidden"
      >
        <nav aria-label="Mobile" className={`shell t-stagger ${menuShown ? "is-shown" : ""}`}>
          <p className="t-stagger-line text-sm text-muted" style={{ "--i": 0 } as React.CSSProperties}>
            {capabilitiesPage.crumb}
          </p>
          <ul className="mt-3 grid gap-3">
            {capabilities.map((c, i) => (
              <li key={c.slug} className="t-stagger-line" style={{ "--i": i + 1 } as React.CSSProperties}>
                <Link
                  href={`/${c.slug}/`}
                  className="grid min-h-12 grid-cols-[2.25rem_minmax(0,1fr)] items-baseline text-2xl font-semibold leading-tight tracking-tight"
                >
                  <span className="font-mono text-sm font-normal text-accent-text">{c.index}</span>
                  {c.short}
                </Link>
              </li>
            ))}
          </ul>
          <ul className="mt-6 grid gap-1 border-t border-line pt-5" aria-label={capabilitiesPage.menuServices}>
            {services.map((svc, i) => (
              <li key={svc.id} className="t-stagger-line" style={{ "--i": i + 3 } as React.CSSProperties}>
                <Link href={svc.href} className="flex min-h-11 items-center text-lg">
                  {svc.title}
                </Link>
              </li>
            ))}
          </ul>
          <ul className="mt-6 grid border-t border-line pt-4">
            {[{ label: capabilitiesPage.menuAll, href: "/services/" }, ...nav].map((l, i) => (
              <li key={l.href} className="t-stagger-line" style={{ "--i": i + 8 } as React.CSSProperties}>
                <Link href={l.href} className="flex min-h-12 items-center text-lg text-muted">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href={site.cta.href}
            className="btn btn-primary t-stagger-line mt-8 w-full sm:hidden"
            style={{ "--i": 13 } as React.CSSProperties}
          >
            {site.cta.label}
          </Link>
        </nav>
      </div>
    </div>
  );
}
