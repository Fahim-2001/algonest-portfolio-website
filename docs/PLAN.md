# AlgoNest website upgrade: plan

Design read: redesign (overhaul) of an AI and software company site for business
decision makers, repositioned in update 2 around the pitch deck as an embedded
"AI & tech team, without the overhead", in a precise dark-tech language built from the logo's slate and
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
5. Keep every existing URL working (directly or by permanent redirect) so search ranking and inbound links survive.
6. Lead with the offer: a free audit and a free prototype before any contract (update 2).

## 3. Information architecture

Current structure after update 4 (see sections 9 to 11). Every old URL still resolves.

```
/                                  Home
/services                          Our Services: five services under two focuses (URL kept)
  /ai-solutions                    01 Web-based AI Solutions
  /tailored-software-development   02 Tailored Software for Business Automation and Data Analytics
/projects                          Project Showcase: five projects, one chapter each (#tradeflow, #qantly, #kvitt, #fitsync, #voltari)
/articles                          Articles index
  /articles/[slug]                 Five articles, each tied to a capability or to embedded teams
/about-us                          About Us
/contact-us                        Contact Us (free discovery call)

Permanent redirects (next.config.ts, never remove)
/automation             -> /tailored-software-development/#process-automation
/data-driven-solutions  -> /tailored-software-development/#data-analytics
/technical-team-hiring  -> /contact-us/
```

Header: logo, Our Services (dropdown with the two focuses, then all five services, then "All five services"; the mobile menu lists the same), Projects, Articles, About Us, Contact Us,
theme toggle, one primary button "Book a free discovery call". "Emergency Call" is
removed; the phone numbers are real `tel:` links on the contact page and in the footer.
`sitemap.xml` lists canonical URLs only; `robots.txt` points to it.

## 4. Page plans

### Home
1. Hero: asymmetric split. Headline "Your AI & tech team, without the overhead." with the second line in the accent, one sentence of support, two actions. The visual is the live logo canvas. The four offer terms (Free start, 48hr, 70%, Always) run along the foot of the hero as a strip, figures spinning in once.
2. The reality: three-column ledger of why AI projects stall (hiring cost, agency speed, no-code limits), each with its figure.
3. Statement: "There is a better way..." revealed word by word as it is scrolled.
4. Our services: "What we build for you". A highlighted panel, "Our services are focusing on" (1 Web-based AI Solutions, 2 Tailored Software for Business Automation and Data Analytics). Below it five stacked cards, one per service in the pitch order, each tagged Focus 01, Focus 02 or Both focuses and each with its own live scene; every card slides over the one before on large screens.
5. Marquee of what we build (the only marquee on the site).
6. Projects we have built: a glimpse of the five projects. A list on the left (number, name, tagline, status) links each to its chapter on `/projects/`; on large screens a framed preview beside it follows the row under the mouse or keyboard focus, and on small screens each row carries its own preview. Ends with "See the project showcase".
7. Process: "From conversation to live system". Pinned horizontal pan through four steps (Free discovery and AI audit, Free prototype, Build sprint, Always connected), each with a looping scene and a duration chip; a rail fills as the pan advances.
8. Why AlgoNest: four-cell bento with pointer tilt, then the comparison table (Agency, Hire, AlgoNest) that fills the AlgoNest column row by row.
9. Our partners: spotlight card for AIO Tech Solutions, its supplied logo inside an orbiting "nest", the relationship, verified facts, a link to TradeFlow on the showcase and a link to its site.
10. Global coverage: "From Bangladesh to the US and Australia". An animated dot map of the world with a line from Bangladesh (where the team works) to the United States and to Australia (the markets we serve), place names on the map from tablet up, and a legend of three columns with flags and one line each. Ends with a link to About Us.
11. CTA: "Let's build something remarkable together." Zoom-on-scroll artwork behind one magnetic button.
12. Footer.

### Our Services (`/services/`)
Hero, the same "focusing on" panel, large rows for the two focuses (pointer devices get artwork that follows the cursor; touch gets an inline thumbnail), "All five services" as cards (each tagged Focus 01, Focus 02 or Both focuses, and linking to its section), the embedded tech wing section, CTA.

### Focus detail (`/ai-solutions/`, `/tailored-software-development/`)
Hero with the capability's looping motion graphic, subhead and lead, four includes (each with an anchor that redirects can target), problem cards that stack while scrolling, statistics with spinning counters and an "industry estimates" note, the four-step engagement summary linking to `/#process`, CTA, link to the next capability.

### Project Showcase (`/projects/`)
Hero: "Project showcase." with a lead, three counts taken from the data (projects, live to explore, prototypes) and a fan of the three live products in browser frames. Then a sticky index (a marker follows the chapter being read; a row of jump links on small screens) beside one chapter per project: number, status, sector, name, tagline, client, the product in a browser frame (screenshot, or the animated scene for a prototype), why we built it, the problems it solves, one figure from the project's own material where there is one, what it does, the services behind it, where it stands (Kvitt), and one action: visit the live build, or ask for a walkthrough. CTA: "Your project could be next."

### About Us
Title "Who we are: innovators, problem-solvers, partners working from Bangladesh across US and Australia market" with the flags of Bangladesh (where we work from), the United States and Australia (markets we serve) beside it. Founding story (2024, first client AIO Tech Solutions, now a partner) with a scroll-revealed pull line, four principles as an accordion, CTA.

### Contact Us
"Book your free discovery call." What happens next (call, prototype within 48 hours, you decide), email and both phone numbers (no office address), validated form on the right with inline errors, shake on invalid submit and a drawn check on success.

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
| ux-designer | Audit, navigation, forms, accessibility, state design, the update 2 restructure |
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

- Where should the forms send? They post to `NEXT_PUBLIC_FORM_ENDPOINT` when it is set and fall back to opening an email draft.
- Real social profile URLs (the footer omits them until they exist).
- Sources for the statistics on the capability pages and for the pitch figures ($150K+, 6-12 months, 70% below local agency rates). The pitch's "80% fail" figure for no-code tools is not used until it has a source.
- A vector (SVG) logo; the only asset supplied is a 200px JPEG.
- Written approval from AIO Tech Solutions to show its logo and description, and whether the partner card should say more about the relationship.
- TradeFlow credit: the showcase says "Built for AIO Tech Solutions", while TradeFlow's own site says "A product of AIO Tech Solutions" and "Designed and developed by AIO Tech Solutions". Confirm the wording both companies are happy with.
- Qantly's tool count: its deck says 80+ tools (used on the showcase); the AlgoNest pitch said 100+. Confirm the current figure.
- qantly.ai's own page description names the parent company the site leaves out (see 11a in RULES). Update it there if the brands should match.
- Voltari AI: the brief spelled it "Voltary"; the live demo says "Voltari", which the site uses. Confirm.
- FitSync: its deck was not in `materials/`; the copy comes from `FitSync_Pitch_Deck.pdf` supplied separately. Add it to `materials/` so the source stays with the project, and confirm FitSync's current status (shown as a prototype).
- Permission to name and describe each project publicly, and a public demo or screenshots for Kvitt and FitSync when there are some.

## 9. Update 2: pitch deck (2026-11-24)

Source: `materials/algonest-pitch.pdf` (six slides) and `materials/Partner-Logo.png`.

### What changed and why

| Area | Before | After | Source |
|---|---|---|---|
| Positioning | Five-service software house | "Your AI & tech team, without the overhead." An embedded technical wing that starts free | Slide 1 |
| Offer | None | Free start, 48hr prototype, 70% below local agency rates, always connected | Slide 1 |
| Problem framing | None | "Why most businesses struggle to get AI done": hiring, agencies, no-code | Slide 2 |
| Services | Five services | Two capabilities: Web-based AI Solutions; Tailored Software for Business Automation and Data Analytics. Update 3 then shows the pitch's five services (below) under those two focuses | Slide 3, client brief |
| Process | Two diagrams (six and four steps) | One four-step engagement with durations, two free steps first | Slide 4 |
| Why AlgoNest | Four generic points | Four pitch points plus an Agency / Hire / AlgoNest comparison | Slide 5 |
| Call to action | "Book a meeting" | "Book a free discovery call" everywhere; CTA copy from slide 6 | Slide 6 |
| Partners | None | "Our partners" on home with AIO Tech Solutions | Client brief, allinonetechsolutions.com.au |

### Mapping the five services to two capabilities

| Old service | New home |
|---|---|
| AI Solutions | 01 Web-based AI Solutions (`/ai-solutions/`) |
| Automation | 02, "Process automation" (`#process-automation`) |
| Data Driven Solutions | 02, "Data-driven insights" (`#data-analytics`) |
| Tailored Software Development | 02 (`/tailored-software-development/`) |
| Technical Team Hiring | How both capabilities are delivered (embedded tech wing); URL redirects to contact |

### Content rules applied

- The pitch footer's parent-company line is not used anywhere on the site, by client instruction.
- Em dashes from the pitch are rewritten as commas or full stops (RULES 9).
- The pitch's gradient (cyan to blue) and its red, amber and purple card colours are not carried over: the site keeps one accent (RULES 2). Accent words in headings ("struggle", "build", "smarter") use `--accent-text`.
- AIO Tech Solutions is described only from its own site, read 2026-11-24: client-first software company, official Odoo partner, offices in Sydney and Dhaka, TradeFlow with 12 integrated modules. The logo is used as supplied.
- "First client in 2024" comes from the original About page ("All In One Tech Solutions").

### Done

- [x] Content model: `src/content/capabilities.ts`, `src/content/partners.ts`, `src/content/site.ts` rewritten; `services.ts` removed
- [x] Redirects for retired URLs, sitemap and robots
- [x] Home: offer strip, reality ledger, stacked capability stages, process pan, comparison, partners
- [x] Capabilities index, two capability pages, about, contact and articles aligned to the new model
- [x] New artwork `public/art/platform.webp` and the `platform` motion scene for capability 02
- [x] Production build passes; checked at 375, 768 and 1440 in dark and light, no horizontal overflow, no console errors

### Next

- [ ] Answers to section 8
- [ ] Partner logos for any further partners (the section already takes a list)
- [ ] Lighthouse pass against the targets in RULES 43 on the deployed build

## 10. Update 3: Our Services, contact details (2026-11-24)

- **Contact:** email is `hello@algonest.net`. Two phone numbers everywhere (footer, contact page): Bangladesh +880 1684-155582 and United States +1 917 459 2977, both as `tel:` links.
- **Our Services:** the "Capabilities" label becomes "Our Services" (nav, footer, headings). The pitch's five services are shown as such, in this order:

| # | Service | Pitch label | Sits under |
|---|---|---|---|
| 1 | Intelligent Automation | AI Solutions | Focus 01 |
| 2 | Data Driven Insights | Data & Analytics | Focus 02 |
| 3 | Tailored Web Applications | Custom Software | Focus 02 |
| 4 | Process Automation | Automation | Focus 02 |
| 5 | Embedded Tech Wing | Dedicated Team | Both focuses |

- **Highlighted focus:** "Our services are focusing on 1. Web-based AI Solutions, 2. Tailored Software for Business Automation and Data Analytics" appears as a panel on the home page and on `/services/`, and the two detail pages stay as the focus pages. Their URLs are unchanged.
- **Qantly** (the pitch's sixth card) is not in the client's list of five services, so it is removed from the site. Add it back as a service if wanted.
- Content lives in `services` and `capabilities` in `src/content/capabilities.ts`.

## 11. Update 4: Project Showcase (2026-11-24)

A new page, `/projects/` ("Project Showcase"), and a glimpse of it on the home page.

### The projects

| # | Project | What it is | Status | Link | Source |
|---|---|---|---|---|---|
| 1 | TradeFlow | Import and export operations platform, built for AIO Tech Solutions | Live product | tradeflow-booking.vercel.app | The site, and AIO's TradeFlow page |
| 2 | Qantly | Guided AI workspace for research and data analysis | Live product | qantly.ai | `materials/Qantly_Pitch_Deck.pdf`, qantly.ai |
| 3 | Kvitt | Invoice and bank reconciliation for Norwegian businesses, with explained match scores | Prototype | None yet | `materials/Kvitt-Pitch-Deck.pptx` |
| 4 | FitSync | Member app and owner dashboard for gyms in Bangladesh | Prototype | None yet | `FitSync_Pitch_Deck.pdf` |
| 5 | Voltari AI | AI monitoring for power infrastructure | Live demo | voltariai.netlify.app | The live demo |

Each project states its motive, four problems it solves, what it does, the
AlgoNest services behind it and its link. Copy lives in `src/content/projects.ts`;
page strings in `projectsPage` and `home.projects` in `src/content/site.ts`.

### Content rules applied

- Only facts from each project's own material. Market figures in the decks (researcher counts, market sizes, churn rates, revenue potential, gym and user targets) are not used: they have no sources (RULES 7 and 8).
- Figures shown: TradeFlow's 12 integrated modules (AIO's TradeFlow page), Qantly's 80+ tools (Qantly deck), Kvitt's five match signals (Kvitt deck).
- Kvitt is described as built to read invoices: its deck says the reading (OCR) backend is still simulated, so "Where it stands" lists what runs today and what comes next.
- Screenshots: TradeFlow's dashboard image from its site, cropped to remove a signed-in user's name; Qantly and Voltari captured from their live pages. Kvitt and FitSync have no public build, so they show new scenes (`ledger`, `fitness`) instead of invented screens.
- The partner card no longer says AIO builds TradeFlow itself; it links to TradeFlow on the showcase.

### Built

- [x] `/projects/` with hero fan, data-driven counts, sticky index with scroll-spy marker and jump links, five chapters, CTA
- [x] Home glimpse with pinned preview that follows mouse and keyboard focus
- [x] Two new `HeroMotion` scenes and a `still` mode for previews
- [x] Projects in the header, mobile menu, footer and sitemap
- [x] In-page scrolling fixed: Lenis already honours CSS scroll margins, so the extra offset in `src/lib/scroll.ts` is gone (redirected service anchors no longer land about 200px low)
- [x] Production build passes; checked at 375, 768, 1024 and 1440, dark and light, reduced motion, keyboard focus on the home list and the index links

## 12. Update 5: About title, navbar, no office address (2026-11-24)

- **About Us title** is now "Who we are: innovators, problem-solvers, partners working from Bangladesh across US and Australia market", set a step smaller than the display size so it fits. Beside it, the flags of Bangladesh ("Where we work from"), the United States and Australia ("Market we serve"). The flags are small SVG files in `public/flags` (an image, never an emoji, per RULES 10); each is decorative because the country is named beside it.
- **Contact Us** is now a link in the navbar (it was already in the mobile menu). The primary button still reads "Book a free discovery call".
- **Office address removed** from the footer and the Contact Us page, and `address` removed from the site data. The contact page now lists email and the two phone numbers only. The earlier "West Hartford" address question is closed.

## 13. Update 6: Global coverage on the home page (2026-11-24)

A new section after Our Partners: a dot map of the world, a line from Bangladesh to the United States and to Australia, and a three-column legend (flag, country, role, one line). The map is decorative; the legend says the same in words. Notes come from the owner's brief (works from Bangladesh, serves the US and Australia) and from AIO Tech Solutions' own site (offices in Sydney and Dhaka). No office, client count or time-zone claim is made. The land data is public domain; see `src/content/world.ts`.
