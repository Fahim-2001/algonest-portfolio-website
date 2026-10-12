"use client";

import { Moon, Sun } from "@phosphor-icons/react";

export function ThemeToggle() {
  function toggle() {
    const root = document.documentElement;
    const next = root.dataset.theme === "light" ? "dark" : "light";
    root.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {
      /* storage unavailable: the choice lasts for this page only */
    }
  }
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Switch colour theme"
      className="grid size-11 place-items-center rounded-full text-muted transition-colors duration-200 hover:text-ink"
    >
      <Sun size={20} className="hidden dark:block" aria-hidden="true" />
      <Moon size={20} className="block dark:hidden" aria-hidden="true" />
    </button>
  );
}
