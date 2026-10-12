# AlgoNest website upgrade: plan

Design read: redesign (overhaul) of a software-services company site for business
decision makers, in a precise dark-tech language built from the logo's slate and
cyan, on Next.js + Tailwind v4 + Motion + GSAP.

Dials: `DESIGN_VARIANCE 8`, `MOTION_INTENSITY 8`, `VISUAL_DENSITY 4`.

## 1. Audit of the live site (algonest.net, scraped 2026-10-12)

WordPress + Astra + Elementor. Nine pages, one "hello world" post, no blog content.

| Page | Slug | What is there |
|---|---|---|
| Home | `/` | Hero tagline, intro paragraph, 5 service blurbs, 2 process descriptions (as images), 4 "Why AlgoNest" points, CTA |
| Services | `/services/` | 5 service blurbs with stock images |
| AI Solutions | `/ai-solutions/` | Lead, 3 problems, 5 stats, CTA |
| Automation | `/automation/` | Lead, 3 problems, 5 stats, CTA |
| Data Driven Solutions | `/data-driven-solutions/` | Lead, 3 problems, 5 stats, CTA |
| Tailored Software Development | `/tailored-software-development/` | Lead, 3 benefits, 4 stats, CTA |
| Technical Team Hiring | `/technical-team-hiring/` | Lead, 4 stats, requirements form |
| About Us | `/about-us/` | Founding story, 4 principles, CTA |
| Contact Us | `/contact-us/` | Phone, email, contact form |

### Problems found

Structure and UX
- Nine top-level nav items on one row; the five services are siblings of Home and About.
- "Emergency Call" header button links to `#` and does nothing.
- Three footer social icons link to `#`.
- Headings are misused: body paragraphs set as `H2`, several `H1`s per page, empty `H2`s.
- The two process sections are flat images of diagrams, unreadable on mobile and invisible to screen readers.
- Images have no alt text.
- The About page CTA links to `#` instead of the contact page.

Visual
- Brand colours from the logo (slate, cyan) are barely used; the page runs on white, grey and a red accent.
- Three unrelated font families (Astra default, Heebo, Lato).
- Stock vector illustrations in mixed styles, several at 300px.
- No motion, no hover feedback beyond defaults, no dark mode.

Content
- Two different phone numbers: `+1 9174592977` (footer) and `+880 1684-155582` (contact page).
- Address reads "West Hardford, Connecticut" (the town is West Hartford).
- The "Inaccurate Risk Assessment" card on the data page carries the compliance paragraph copied from the automation page.
- "Why AlgoNest" has the Reliability and End-to-end Support descriptions swapped.
- Statistics ("20-30% increase in efficiency") are quoted with no source.
- The team-hiring form has a field labelled "should your Name".

## 2. Goals

1. Make the brand recognisable: one palette taken from the logo, used everywhere.
2. Cut the navigation to what a buyer needs and give every page one clear next step.
3. Replace static images of diagrams with real, accessible, animated components.
4. Add motion that explains something: sequence, hierarchy, feedback.
5. Keep every existing URL so search ranking and inbound links survive.

## 3. Information architecture

Slugs are unchanged. Navigation is regrouped, not renamed.

```
/                                  Home
/services                          Services index
  /ai-solutions                    AI Solutions
  /automation                      Automation
  /data-driven-solutions           Data Driven Solutions
  /tailored-software-development   Tailored Software Development
  /technical-team-hiring           Technical Team Hiring
/articles                          Articles index (added after launch plan)
  /articles/[slug]                 One article per service, five in total
/about-us                          About Us
/contact-us                        Contact Us
```

Header: logo, Services (dropdown with the five services), About Us, Contact Us,
theme toggle, one primary button "Book a meeting". "Emergency Call" is removed;
the phone number becomes a real `tel:` link on the contact page and in the footer.

## 4. Page plans

### Home
1. Hero: asymmetric split. Headline is the brand line, one sentence of support, two actions. The visual is a live canvas: a field of points that settles into the logo's A and N strokes and reacts to the pointer.
2. Statement: the intro paragraph revealed word by word as it is scrolled.
3. Services: pinned horizontal pan through five panels, each with its own generated artwork.
4. Capabilities marquee (the only marquee on the site).
5. Process: sliding tabs switch between "Software development" (six steps) and "Dedicated team" (four steps); a line draws down the timeline with scroll.
6. Why AlgoNest: four-cell bento with pointer tilt and mixed backgrounds.
7. CTA: zoom-on-scroll artwork behind one magnetic button.
8. Footer.

### Services index
Large rows, one per service. Pointer devices get an artwork that follows the cursor; touch devices get an inline thumbnail.

### Service detail (AI, Automation, Data, Tailored software)
Hero with parallax artwork, lead paragraph, three problem cards that stack while scrolling (CSS sticky), statistics with spinning counters, CTA, link to the next service.

### Technical Team Hiring
Same hero and statistics, then the requirements form in place of the problem cards.

### About Us
Founding story with a scroll-revealed pull line, four principles as an accordion, CTA.

### Contact Us
Phone and email on the left, validated form on the right with inline errors, shake on invalid submit and a drawn check on success.

## 5. Stack

- Next.js (App Router, static generation), React, TypeScript
- Tailwind CSS v4 with CSS-variable tokens
- Motion (`motion/react`) for UI and scroll-linked motion
- GSAP ScrollTrigger only for the pinned horizontal pan
- Phosphor icons
- Geist and Geist Mono through `next/font`
- transitions.dev snippets for dropdown, tabs, accordion, error shake, success check, text reveal, card tilt, spinning counter
- Artwork rendered with Python (canvas-design skill) into `public/art`

## 6. Skills used

| Skill | Used for |
|---|---|
| design-taste-frontend | Design read, dials, layout families, pre-flight check |
| ux-designer | Audit, navigation, forms, accessibility, state design |
| transitions-dev | Motion tokens and component transitions |
| canvas-design | Generated artwork for services, about and CTA |

## 7. Build order

1. Docs (this folder)
2. Scaffold, tokens, fonts, layout shell (header, footer, theme)
3. Content model in `src/content`
4. Artwork generation
5. Home sections
6. Inner pages
7. Forms and states
8. Verify: production build, screenshots at 375 / 768 / 1440 in both themes, reduced motion, keyboard pass

## 8. Decisions needed from AlgoNest

- Which phone number is correct, or should both be shown?
- Confirm the address correction to "West Hartford".
- Where should the forms send? They post to `NEXT_PUBLIC_FORM_ENDPOINT` when it is set and fall back to opening an email draft.
- Real social profile URLs (the footer omits them until they exist).
- Sources for the statistics on the service pages.
- A vector (SVG) logo; the only asset supplied is a 200px JPEG.
