# AlgoNest design system

## 1. Direction

Precise, dark, engineered. The logo is two folded ribbons on slate: cyan for the
"A", white for the "N". The site takes that literally: slate surfaces, one cyan
accent, off-white type, and diagonal ribbon geometry as the recurring motif.

Dark is the default because the logo lives on dark slate. A light theme is
provided through the header toggle, and the choice is remembered on the device.

## 2. Colour

Sampled from `materials/algonest_software_solution_logo.jpeg`:

| Logo element | Sampled | Role |
|---|---|---|
| Background | `#37464D` | Slate, the neutral family |
| "A" ribbon | `#63B8CB` | Cyan, the single accent |
| "N" ribbon | `#F5F2F0` | Off-white, type on dark |

### Tokens

| Token | Dark | Light | Use |
|---|---|---|---|
| `--bg` | `#0E161A` | `#F3F6F7` | Page |
| `--surface` | `#151F24` | `#FBFCFC` | Cards, panels |
| `--surface-2` | `#1D2A30` | `#E9EEF0` | Raised or tinted cells |
| `--slate` | `#37464D` | `#37464D` | Logo slate, feature fills |
| `--line` | `#26353C` | `#D5DEE2` | Hairlines, borders |
| `--field-line` | `#5D727B` | `#7F9099` | Input borders (3:1 against the field) |
| `--text` | `#EEF3F4` | `#111B20` | Primary text |
| `--muted` | `#9BAEB6` | `#4C5F68` | Secondary text |
| `--accent` | `#63B8CB` | `#63B8CB` | Fills, primary button |
| `--accent-text` | `#7CCBDC` | `#14687D` | Accent-coloured text and links |
| `--on-accent` | `#0A1317` | `#0A1317` | Text on accent fills |
| `--danger` | `#F08A80` | `#B3261E` | Form errors |

Rules
- One accent. No second hue anywhere, including charts, badges and hover states.
- No pure black or pure white.
- Accent as text uses `--accent-text`, which passes 4.5:1 on its theme's background.
- Gradients are slate to slate or slate to cyan at low opacity. No purple, no neon glow.

Contrast (WCAG): `--text` on `--bg` 15.6:1 dark, 16.4:1 light. `--muted` on `--bg`
7.6:1 dark, 6.3:1 light. `--on-accent` on `--accent` 8.3:1. `--accent-text` on
`--bg` 9.6:1 dark, 5.7:1 light.

## 3. Typography

- Sans: Geist. Mono: Geist Mono (numbers, small labels). Both self-hosted through `next/font`.
- Emphasis inside a headline is the accent colour in the same family. No serif, no mixed families.

| Role | Size | Weight | Tracking | Leading |
|---|---|---|---|---|
| Display (hero) | `clamp(2.75rem, 5.5vw, 5rem)` | 600 | -0.04em | 1.0 |
| H2 | `clamp(2rem, 4vw, 3.5rem)` | 600 | -0.03em | 1.05 |
| H3 | `clamp(1.375rem, 2vw, 1.75rem)` | 600 | -0.02em | 1.2 |
| Lead | `1.125rem` to `1.25rem` | 400 | 0 | 1.6 |
| Body | `1rem` | 400 | 0 | 1.65 |
| Label | `0.75rem` mono, uppercase | 500 | 0.14em | 1.4 |

Body copy is capped at 65 characters per line.

## 4. Layout

- Container: `max-width: 1320px`, side gutter 20px mobile, 32px tablet, 48px desktop.
- Spacing: 4px scale. Sections are `py-24` mobile, `py-36` desktop.
- Breakpoints: 640, 768, 1024, 1280.
- Every multi-column layout collapses to one column under 768px.
- Hero uses `min-height: 100dvh`, never `100vh`.

### Shape

| Element | Radius |
|---|---|
| Buttons, pills, nav | full |
| Cards, panels, images | 20px |
| Inputs | 12px |

### Elevation

Flat by default. Depth comes from surface steps and hairlines. The floating header
is the only blurred surface (with a solid fallback under reduced transparency).

### Z-index scale

`1` content overlays, `39` mobile menu, `40` header, `45` back-to-top, `60` scroll progress, `70` grain, `90` custom pointer.

## 5. Layout families per section (home)

| Section | Family |
|---|---|
| Hero | Asymmetric split with live canvas, offer strip along its foot |
| Reality | Three-column ledger between hairlines |
| Statement | Full-width scroll-scrubbed text |
| Our services | Focus panel, then five sticky stacked cards (split card per service) |
| What we build | Marquee |
| Projects | Index list with a pinned preview frame |
| Process | Pinned horizontal pan with a progress rail |
| Why AlgoNest | Asymmetric bento, then a comparison table |
| Partners | Spotlight card (orbit panel plus text) |
| Global coverage | Full-width dot map with place names, then a three-column legend |
| CTA | Centred, zoom-parallax artwork |

No family repeats on a page. Eyebrow labels: hero none, at most one per three sections.

### Project showcase (`/projects/`)

| Section | Family |
|---|---|
| Hero | Asymmetric split: headline, counts, a fan of three framed product screenshots |
| Projects | Sticky index with chapters (index left, one chapter per project right) |
| CTA | Centred, zoom-parallax artwork |

Each chapter: meta line (number, status chip, sector), name, tagline, client when
there is one, the product in a browser frame, why it was built, the problems it
solves, what it does, the services behind it, and its one action (visit the live
build, or ask for a walkthrough of a prototype).

## 6. Motion

Tokens come from transitions.dev (`src/app/motion.css`):

| Token | Value | Use |
|---|---|---|
| `--duration-quick` | 150ms | Close, hover |
| `--duration-fast` | 250ms | Dropdown open, tabs, icon swap |
| `--duration-slow` | 400ms | Panel and accordion |
| `--duration-very-slow` | 500ms | Text reveal, success check |
| `--ease-smooth-out` | `cubic-bezier(0.22, 1, 0.36, 1)` | Default |

Every animation has a job:

| Motion | Where | Job |
|---|---|---|
| Staggered text reveal | Hero, page heroes | Establish reading order |
| Points forming the logo, opening into an orbiting nest, and regrouping | Home hero canvas | Show the brand idea: scattered parts nest into structure |
| Looping motion graphic per capability and process step (signals through a network, a platform feeding a live chart, a dot-matrix reading, modules assembling, items riding streamlines, team members joining) | Capability heroes, capability stages, process panels (`HeroMotion`) | Explain what the service does before any text is read |
| Prototype scenes: invoices matched to payments with a score, one flagged (`ledger`, Kvitt); a member's week filling a ring and syncing to a gym that nudges drifting members (`fitness`, FitSync) | Project chapters without a public build | Show what an unreleased product does |
| Dot-map coverage: a line drawn from Bangladesh to the US and to Australia, a ripple spreading through the land where each arrives (`coverage`) | Home global coverage | Show where the team works and the markets it serves |
| Preview crossfade (one still frame per project) | Home projects list | Preview before click; follows the mouse and keyboard focus |
| Index marker sliding to the chapter in view | Project showcase index | Show where you are among the projects |
| Drift scrolling (Lenis, wheel input eases to its target) | Global, mouse and trackpad | Make the scroll-linked effects read as continuous |
| Custom pointer (dot plus trailing ring that grows over links) | Global, mouse only | Show what is clickable |
| Back-to-top button with progress ring | Global, after the first screen | Quick return on long pages |
| Word-by-word scrub | Home statement, about pull line | Pace a long sentence |
| Sticky stacked stages | Home services | Give each of the five services equal weight, one after the other |
| Pinned horizontal pan with filling rail | Home process | Show the four steps as a sequence in time |
| Comparison column fill | Why AlgoNest table | Draw the eye to the AlgoNest column once |
| Orbiting rings | Partners logo | Place the partner inside the nest |
| Sticky stacking cards | Service problems | Keep the previous problem in view as context |
| Spinning counter | Statistics, offer strip | Draw the eye to the figure once |
| Pointer tilt | Why AlgoNest bento | Hover feedback |
| Cursor-following artwork | Capabilities index rows | Preview before click |
| Zoom parallax | CTA | Signal the end of the page |
| Magnetic button | CTA | Feedback on the one action that matters |
| Header hide and show | Global | Return the viewport while reading |
| Scroll progress bar | Global | Position on long pages |
| Error shake, success check | Forms | Feedback |

Rules
- Animate `transform`, `opacity`, `filter` and `clip-path` only.
- No `window` scroll listeners. Use Motion `useScroll`, GSAP ScrollTrigger or IntersectionObserver.
- GSAP is used in one component (`HorizontalPan`, used by the process). Motion and GSAP never share a component.
- The custom pointer is off for touch, pen and reduced motion, and the system text cursor is kept inside form fields.
- Under `prefers-reduced-motion: reduce`: pins become normal flow, the pan becomes a native horizontal scroller, every canvas draws one static frame, drift scrolling and the custom pointer switch off, reveals show immediately, the marquee and the partner orbit stop.

## 7. Components

- Button: primary (accent fill), secondary (hairline), link (arrow slides on hover). Press state scales to 0.98. Focus ring 2px `--accent-text` with 2px offset.
- Header: floating pill, 64px, hides on scroll down. Our Services dropdown (two focuses, then all five services) opens on click and closes on Escape or outside click. Links: Our Services, Projects, Articles, About Us, Contact Us. The full row shows from 1280px; below that the menu button opens the full-screen panel.
- Flags: simple SVG files in `public/flags` (3:2, hairline border, 72px wide), shown with the country named beside them. They are the one place several colours appear, because a flag is information, not decoration.
- Browser frame: three dots and an address pill (globe for a public URL, lock for a private prototype) over a 16:9 visual.
- Mobile menu: full-screen panel, staggered links, focus trapped, body scroll locked.
- Form field: label above, helper optional, error below, validate on blur, re-validate on input after an error.
- Accordion: native button with `aria-expanded`, grid-rows height animation.
- Tabs: `role="tablist"`, arrow-key navigation, sliding pill.

## 8. Imagery

No stock illustration. Artwork is generated in the brand palette (canvas-design
skill) on one visual idea, "Lattice Calm": dense, patient fields of fine marks on
slate, crossed by one or two cyan ribbons at the logo's angle. One piece per
capability (`platform.webp` covers capability 02), plus the earlier service pieces
reused by articles and the bento, one for About, one for the CTA.
Partner logos live in `public/partners` and are shown exactly as supplied. Files live in `public/art`.

Projects are shown by what they really look like. A project with a public build
gets a screenshot of it (`public/projects`, WebP, 16:9 framing), cropped only to
remove personal data such as a signed-in user's name, and described in its alt
text. A project without one shows its `HeroMotion` scene in the same frame,
with the address bar reading "Prototype, not public yet". Frames are always the
browser chrome in `ProjectFrame.tsx`.

The coverage map is drawn from `src/content/world.ts`: a dot grid rasterised once
from Natural Earth 110m land data (public domain). The panel keeps the map's own
shape so the place names, positioned in percentages, land on their markers.

Movement statement: `docs/art-philosophy.md`.

## 9. Accessibility

- WCAG 2.2 AA.
- One `h1` per page, ordered headings, landmarks, skip link.
- Everything keyboard-operable, visible focus, 44px minimum touch targets.
- Decorative artwork has `alt=""`; the hero canvas is `aria-hidden`.
- Colour is never the only signal: errors carry an icon and text.
