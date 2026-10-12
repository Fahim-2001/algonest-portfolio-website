# AlgoNest build rules

Rules for anyone (human or agent) changing this site. `DESIGN.md` holds the
values; this file holds the constraints.

## Brand

1. Colours come from tokens in `src/app/globals.css`. No hex values in components.
2. One accent (logo cyan). Do not add a second hue.
3. The logo file is used as supplied. Do not redraw, recolour or crop it.
4. One font family (Geist) plus Geist Mono for numbers and labels.
5. Radii: full for buttons and pills, 20px for cards and images, 12px for inputs.

## Content

6. All copy and page data live in `src/content`. Components do not hard-code copy.
7. Do not invent clients, testimonials, team members, awards or numbers. Articles follow the same rule: no made-up statistics or case studies.
8. Statistics shown on service pages are the ones on the live site and are still unsourced. Add a source before adding a new one.
9. No em dashes or en dashes in visible copy. Use a hyphen, comma or full stop.
10. No emoji in UI. Icons come from `@phosphor-icons/react` only.
11. One label per intent. Contact intent is always "Book a meeting".
12. Hero: headline of two lines or fewer on desktop, support text of 20 words or fewer, at most two actions.

## URLs and SEO

13. Slugs never change: `/services`, `/ai-solutions`, `/automation`, `/data-driven-solutions`, `/tailored-software-development`, `/technical-team-hiring`, `/about-us`, `/contact-us`.
14. Every page exports `metadata` with a unique title and description.
15. One `h1` per page. Heading levels do not skip.

## Layout

16. Never `h-screen` or `100vh`. Use `min-h-[100dvh]`.
17. Grid for columns. No percentage flex maths.
18. Every multi-column section declares its single-column layout under 768px.
19. A layout family appears once per page.
20. Eyebrow labels: at most one per three sections.
21. Header stays on one line and at or under 72px.
22. Z-index only from the scale in `DESIGN.md`.

## Motion

23. Each animation must have a stated job (see the table in `DESIGN.md`). If it has none, remove it.
24. Animate `transform`, `opacity`, `filter`, `clip-path` only. Never `transition: all`.
25. No `window.addEventListener("scroll")`. Use Motion `useScroll`, ScrollTrigger or IntersectionObserver.
26. Continuous values (pointer, scroll) go through motion values or refs, never React state.
27. Motion components are client leaves with `"use client"`. Pages and sections stay server components.
28. GSAP only in `HorizontalPan`. Never import GSAP and Motion in the same file.
29. Every effect that subscribes, observes or animates returns a cleanup.
30. Everything respects `prefers-reduced-motion`. Reduced motion must leave all content reachable.
31. One marquee per page at most.
31a. The custom pointer must never be the only pointer for touch, pen, keyboard or reduced-motion users, and never replaces the text cursor in form fields.
31b. Scroll programmatically through `src/lib/scroll.ts`, so drift scrolling and native scrolling stay in step.
31c. A pinned (GSAP) element must sit inside a wrapper React owns, and its effect must clean up in `useLayoutEffect`, or page navigation crashes.
32. Durations and easings come from the motion tokens.

## Accessibility

33. WCAG 2.2 AA. Text contrast 4.5:1, large text and UI boundaries 3:1.
34. Native elements first (`button`, `a`, `label`, `input`). ARIA only where no element fits.
35. Visible focus on every interactive element. Never remove an outline without a replacement.
36. Touch targets are at least 44px.
37. Forms: label above the field, error below it, never placeholder as label, never colour alone.
38. Decorative images use `alt=""`. Informative images get real alt text.
39. Hover-only behaviour needs a touch and keyboard equivalent.

## Performance

40. Images go through `next/image` with explicit dimensions. Above-the-fold images set `priority`.
41. Canvas work pauses when off screen and when the tab is hidden.
42. No new dependency without checking `package.json` first.
43. Targets: LCP under 2.5s, CLS under 0.1, INP under 200ms.

## Before shipping

44. `npm run build` passes with no type or lint errors.
45. Check 375px, 768px and 1440px, in dark and light.
46. Tab through the page with the keyboard.
47. Check with reduced motion on.
48. Re-read every visible string.
