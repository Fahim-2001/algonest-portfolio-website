import type { MotionScene } from "@/components/HeroMotion";

export type ProjectStatus = "live" | "demo" | "prototype";

export type Problem = { title: string; body: string };

export type Project = {
  /** Anchor on /projects/ and the link target from the home page. */
  id: string;
  name: string;
  tagline: string;
  sector: string;
  status: ProjectStatus;
  /** Set when the project was built for a client rather than as our own product. */
  client?: string;
  /** Why it was built: the motive. */
  motive: string;
  problems: Problem[];
  features: string[];
  /** Ids from `services` in capabilities.ts. */
  services: string[];
  /** One fact from the project's own material, shown large. */
  figure?: { value: string; label: string };
  /** Prototypes: what runs today and what comes next. */
  progress?: { built: string[]; next: string[] };
  /** Public address, when there is one. */
  link?: { href: string; label: string };
  /** Screenshot of the live product (informative, so it carries alt text). */
  shot?: { src: string; width: number; height: number; alt: string };
  /** Shown in place of a screenshot when there is no public build. */
  scene?: MotionScene;
};

/**
 * Projects and prototypes built by AlgoNest, in the order the client listed them.
 * Sources, read 2026-11-24:
 * - TradeFlow: tradeflow-booking.vercel.app and allinonetechsolutions.com.au/tradeflow
 * - Qantly: materials/Qantly_Pitch_Deck.pdf and qantly.ai
 * - Kvitt: materials/Kvitt-Pitch-Deck.pptx
 * - FitSync: FitSync_Pitch_Deck.pdf (supplied by the client)
 * - Voltari AI: voltariai.netlify.app
 * Market figures in the decks are not used: they have no sources (docs/RULES.md, 7 and 8).
 * Screenshots live in public/projects; the TradeFlow one is cropped to drop a personal greeting.
 */
export const projects: Project[] = [
  {
    id: "tradeflow",
    name: "TradeFlow",
    tagline: "One platform to run an import and export business, from first order to final delivery.",
    sector: "Import and export operations",
    status: "live",
    client: "AIO Tech Solutions",
    motive:
      "A trading business moves every order through buyers, suppliers, factories, forwarders and banks, and most of that work lives in email threads and spreadsheets. TradeFlow brings the whole operation into one platform, so every order, partner, price and payment sits in one place and nothing falls between the steps.",
    problems: [
      {
        title: "Orders spread across inboxes",
        body: "Every order moves through one pipeline, from confirmation and supplier assignment to production, payment, shipping and delivery, with its documents, notes and tasks attached.",
      },
      {
        title: "Deadlines and payments that slip",
        body: "Smart notifications flag payments due and outstanding tasks, so no deadline is missed and every shipment is planned in time.",
      },
      {
        title: "Leads that go cold",
        body: "A visual lead pipeline, from exploration to quote to negotiation, with an activity planner for follow-ups and quick actions for email, calls and video meetings.",
      },
      {
        title: "Decisions made without the numbers",
        body: "Buyer, supplier, product and freight reports by month, year or custom range, with country-wise buyer analytics and export to CSV and Excel.",
      },
    ],
    features: [
      "Order pipeline, end to end",
      "Buyers, suppliers and forwarders",
      "Supplier and freight price lists",
      "Leads and opportunities",
      "Accounting dashboard",
      "Reports with CSV and Excel export",
      "Research and development library",
    ],
    services: ["tailored-web-applications", "process-automation", "data-driven-insights"],
    figure: { value: "12", label: "integrated modules, from orders to accounts" },
    link: { href: "https://tradeflow-booking.vercel.app/", label: "tradeflow-booking.vercel.app" },
    shot: {
      src: "/projects/tradeflow.webp",
      width: 1366,
      height: 716,
      alt: "TradeFlow dashboard: an order status pipeline from production to delivery, a leads funnel, monthly sales and an order summary.",
    },
  },
  {
    id: "qantly",
    name: "Qantly",
    tagline: "From raw data to defensible insight, in one guided AI workspace.",
    sector: "Research and data analysis",
    status: "live",
    motive:
      "Researchers, PhD scholars and analysts lose weeks switching between SPSS, R, Excel and Python, and one wrong test can sink a study. Qantly puts the whole workflow in the browser: upload a dataset, ask a question in plain language, and get the analysis, the charts and the explanation together, without writing code.",
    problems: [
      {
        title: "A different tool for every step",
        body: "Data, analysis, charts and the report stay in one workspace, so the work never breaks between programs.",
      },
      {
        title: "Weeks lost before the first result",
        body: "A recommendations engine suggests the right method from the data type, the research question and the variables, so nobody needs deep statistics to begin.",
      },
      {
        title: "Errors that get research rejected",
        body: "Each analysis shows its diagnostics and interpretation guidance beside the result, so assumptions are checked before the findings are used.",
      },
      {
        title: "Results nobody can share",
        body: "Findings export as structured reports to Word and PowerPoint, ready for journals, supervisors and stakeholders.",
      },
    ],
    features: [
      "CSV, Excel and JSON upload",
      "Questions in plain language",
      "AI-guided method selection",
      "Hypothesis tests and regression",
      "Machine learning and forecasting",
      "Survival and causal analysis",
      "Reports to Word and PowerPoint",
    ],
    services: ["data-driven-insights", "intelligent-automation"],
    figure: { value: "80+", label: "statistical and analytical tools in one workspace" },
    link: { href: "https://qantly.ai/", label: "qantly.ai" },
    shot: {
      src: "/projects/qantly.webp",
      width: 2000,
      height: 1125,
      alt: "Qantly home page: \"Your spreadsheet has a story. Find it with Qantly.\" beside an example that compares revenue by product from a sample sales file.",
    },
  },
  {
    id: "kvitt",
    name: "Kvitt",
    tagline: "Every invoice, matched to the krone.",
    sector: "Accounting and tax, Norway",
    status: "prototype",
    motive:
      "In most Norwegian companies, supplier invoices and bank payments are still joined up by hand at month end, often on the amount alone. Kvitt is built to read the invoice, sync the bank and settle the two against each other, and it shows its reasoning every time, because an accountant signs their name to the books.",
    problems: [
      {
        title: "Invoices retyped by hand",
        body: "Kvitt is designed to read the date, KID, amount, MVA, supplier and organisation number from the PDF or photo, so nobody types them into the ledger.",
      },
      {
        title: "Payments that do not say what they pay",
        body: "A bank line such as \"NETS AVTALEGIRO 4451\" names no supplier and no invoice. Kvitt scores every candidate on five independent signals, never on the amount alone.",
      },
      {
        title: "Exceptions nobody notices",
        body: "Unpaid invoices, undocumented payments, duplicates, amount mismatches and unverified suppliers are flagged the moment they appear. Wages and internal transfers are never flagged.",
      },
      {
        title: "Scores nobody can audit",
        body: "Every match carries its full breakdown in plain language, such as \"Off by 486,00 kr (5,4%)\", and the reasoning is stored with the decision as the audit trail.",
      },
    ],
    features: [
      "Five-signal match engine",
      "Match scores that explain themselves",
      "Supplier check against Enhetsregisteret",
      "Flags for five kinds of exception",
      "MVA position and MVA-melding",
      "Ledger export",
    ],
    services: ["intelligent-automation", "process-automation"],
    figure: { value: "5", label: "independent signals behind every match" },
    progress: {
      built: [
        "The match engine, end to end, with the full scoring breakdown",
        "Live supplier lookup in Enhetsregisteret",
        "Automatic flags across five exception types",
        "MVA position, MVA-melding generation and ledger export",
      ],
      next: [
        "Choose a provider for reading invoices (OCR)",
        "Connect a first bank over open banking (PSD2)",
        "Prove the match rate on real books with ten design partners",
      ],
    },
    scene: "ledger",
  },
  {
    id: "fitsync",
    name: "FitSync",
    tagline: "An app for members and a dashboard for owners, built for gyms in Bangladesh.",
    sector: "Fitness, Bangladesh",
    status: "prototype",
    motive:
      "People track every step, meal and personal best on their phones, yet most gyms in Bangladesh still run on paper and WhatsApp and give members nothing beyond the equipment. FitSync gives each gym an app its members want to open and a dashboard its owner can run the business from, so members see their progress and owners see who is about to leave.",
    problems: [
      {
        title: "No plan from the trainer",
        body: "Trainers build day-by-day workout routines and diet plans, with calorie targets and macros, synced live to each member's app.",
      },
      {
        title: "Progress nobody can see",
        body: "Weight charts, strength records, streaks and milestones give members visible proof of their transformation, and a reason to come back.",
      },
      {
        title: "Members who leave unnoticed",
        body: "Owners are alerted before a membership expires, can follow up in one tap and can broadcast offers to every member at once.",
      },
      {
        title: "A business run on paper",
        body: "A live dashboard for revenue, expiries and check-ins, a financial ledger that logs itself, and every branch under one account.",
      },
    ],
    features: [
      "Member app",
      "Trainer-built workout plans",
      "Diet plans with macros",
      "Progress, streaks and milestones",
      "Renewal alerts and offer broadcasts",
      "Owner dashboard and ledger",
      "Several branches, one account",
    ],
    services: ["tailored-web-applications", "data-driven-insights"],
    scene: "fitness",
  },
  {
    id: "voltari",
    name: "Voltari AI",
    tagline: "AI monitoring for power infrastructure, from substation to backup generator.",
    sector: "Energy and utilities",
    status: "demo",
    motive:
      "A power network spreads its risk across substations, feeder lines and backup generators, and a fault found late becomes an outage. Voltari watches the whole fleet live, raises an alert when a reading crosses its limit, and uses AI to flag the unusual behaviour that a fixed threshold would miss.",
    problems: [
      {
        title: "No single view of the fleet",
        body: "A live overview shows every transformer, generator and feeder line with its current reading, its status and its trend.",
      },
      {
        title: "Faults found too late",
        body: "Alerts fire the moment a reading crosses its limit, such as a power factor below 0.90, and collect in one alerts centre.",
      },
      {
        title: "Drift that thresholds miss",
        body: "AI anomaly detection flags unusual patterns with a confidence score and a recommended action, at a sensitivity the team can tune.",
      },
      {
        title: "History scattered across logs",
        body: "Live and historical telemetry, from the last hour to the last 30 days, sits beside a log of events and maintenance filtered by severity, status and component.",
      },
    ],
    features: [
      "Live fleet overview",
      "Live and historical telemetry",
      "Threshold alerts",
      "AI anomaly detection",
      "Confidence scores and recommended actions",
      "Components, areas and users",
      "Adjustable anomaly sensitivity",
    ],
    services: ["intelligent-automation", "data-driven-insights"],
    link: { href: "https://voltariai.netlify.app/", label: "voltariai.netlify.app" },
    shot: {
      src: "/projects/voltari.webp",
      width: 2000,
      height: 1125,
      alt: "Voltari fleet overview: live load, RPM and power factor readings for substations, feeder lines and backup generators, with one active alert for a power factor below 0.90.",
    },
  },
];
