import type { MotionScene } from "@/components/HeroMotion";

export const site = {
  name: "AlgoNest",
  legalName: "AlgoNest Software Solution",
  url: "https://algonest.net",
  tagline: "Nesting Innovation with Excellence",
  description:
    "Your AI and tech team, without the overhead. Web-based AI solutions and tailored software for business automation and data analytics, starting free.",
  email: "hello@algonest.net",
  phones: [
    { region: "Bangladesh", display: "+880 1684-155582", href: "tel:+8801684155582" },
    { region: "United States", display: "+1 917 459 2977", href: "tel:+19174592977" },
  ],
  cta: { label: "Book a free discovery call", href: "/contact-us/" },
} as const;

export const nav = [
  { label: "Projects", href: "/projects/" },
  { label: "Articles", href: "/articles/" },
  { label: "About Us", href: "/about-us/" },
  { label: "Contact Us", href: "/contact-us/" },
] as const;

/** A run of text where some parts carry the accent colour. */
export type Part = { text: string; accent?: boolean };

export type ProcessStep = {
  title: string;
  body: string;
  badge: string;
  /** Free steps get the accent badge. */
  free?: boolean;
  motion: MotionScene;
};

export const home = {
  hero: {
    lines: ["Your AI & tech team,", "without the overhead."],
    accent: "without the overhead.",
    sub: "We embed as your dedicated technical wing, building production-grade AI, automation and custom software, starting free with zero commitment.",
    secondary: { label: "See our services", href: "/services/" },
  },
  offerLabel: "Our offer",
  /** The four terms of the offer, from the first page of the pitch. */
  offer: [
    { parts: [{ text: "Free", accent: true }, { text: " start" }], note: "We build first, you decide later" },
    { parts: [{ text: "48" }, { text: "hr", accent: true }], note: "First working prototype" },
    { parts: [{ text: "70" }, { text: "%", accent: true }], note: "Below local agency rates" },
    { parts: [{ text: "Always", accent: true }], note: "Connected to your project" },
  ] satisfies { parts: Part[]; note: string }[],
  reality: {
    heading: "Why most businesses struggle to get AI done",
    accent: "struggle",
    items: [
      {
        icon: "hire",
        title: "Hiring is too expensive",
        body: "A single senior AI engineer costs $150K+ per year, before benefits, equity or management overhead. Most startups can't sustain that.",
        figure: "$150K+",
        unit: "a year",
        caption: "for one senior AI engineer, before benefits",
      },
      {
        icon: "agency",
        title: "Agencies move too slowly",
        body: "Traditional agencies quote 6-12 months for delivery, charge upfront retainers and hand you over to junior teams after the pitch.",
        figure: "6-12",
        unit: "months",
        caption: "a typical agency delivery quote",
      },
      {
        icon: "nocode",
        title: "No-code tools break at scale",
        body: "Low-code platforms work until they don't: when your data volume, security needs or workflow complexity outgrows their limits.",
        figure: "Rebuild",
        unit: "",
        caption: "what follows when the platform hits its limits",
      },
    ],
  },
  statement: {
    text: "There is a better way. AlgoNest works as your embedded technical team, always aligned and always building, with a model that lets you see results before you spend a dollar.",
    accent: "see results before you spend a dollar.",
  },
  capabilities: {
    eyebrow: "Our services",
    heading: "What we build for you",
    accent: "build",
    lead: "Five services, built around two focuses. Every engagement starts with a free audit and a working prototype.",
    focusLabel: "Our services are focusing on",
    focus: ["Web-based AI Solutions", "Tailored Software for Business Automation and Data Analytics"],
    explore: "Explore this focus",
    exploreService: "Learn more",
    focusTag: "Focus",
    bothTag: "Both focuses",
  },
  marquee: [
    "Agentic AI",
    "Predictive ML",
    "Knowledge bases",
    "Custom LLM integrations",
    "Smart decision pipelines",
    "CRM",
    "ERP",
    "Workflow automation",
    "Interactive dashboards",
    "Real-time data processing",
    "Bespoke web platforms",
    "Embedded tech wing",
  ],
  projects: {
    heading: "Projects we have built",
    accent: "built",
    lead: "A glimpse of the products and prototypes we have built, for clients and for ourselves. Each one began with a problem a business could not solve with the tools it had.",
    listLabel: "Projects",
    link: "See the project showcase",
  },
  coverage: {
    heading: "From Bangladesh to the US and Australia",
    accent: "the US and Australia",
    lead: "Our team works from Bangladesh and builds for businesses in the United States and Australia. Same quality, a fraction of the local price.",
    listLabel: "Where we work",
    link: "Who we are",
  },
  process: {
    heading: "From conversation to live system",
    chip: "Start free",
    intro: [
      { text: "We believe in " },
      { text: "earning trust through work, not promises.", accent: true },
      {
        text: " Every engagement starts with a free discovery and a working proof-of-concept, so you see real results before we talk about a contract.",
      },
    ] satisfies Part[],
    steps: [
      {
        title: "Free discovery and AI audit",
        body: "We map your workflows, identify every automation and AI opportunity, and produce a prioritised action plan, at zero cost.",
        badge: "Free · 30 min",
        free: true,
        motion: "reading",
      },
      {
        title: "Free prototype",
        body: "We build a working proof-of-concept for your highest-value opportunity. You see real results, not mockups or slides, before spending anything.",
        badge: "Free · 48 hrs",
        free: true,
        motion: "modules",
      },
      {
        title: "Build sprint",
        body: "If you're aligned, we move into full development. Weekly delivery cycles, daily check-ins and production-grade code from the start.",
        badge: "2-6 weeks",
        motion: "streams",
      },
      {
        title: "Always connected",
        body: "We stay embedded as your technical team, monitoring, iterating and scaling as your business grows. Project-based or retainer.",
        badge: "Ongoing",
        motion: "team",
      },
    ] satisfies ProcessStep[],
  },
  why: {
    eyebrow: "Why AlgoNest",
    heading: "The smarter choice for modern businesses",
    accent: "smarter",
    items: [
      {
        title: "We start free. You commit only when convinced.",
        body: "We absorb the initial risk so you don't have to. The free audit and prototype mean you have seen real value before signing anything.",
      },
      {
        title: "Your technical wing, not a vendor",
        body: "We work project by project but stay connected: embedded in your process, attending your syncs and thinking about your product as if it were our own.",
      },
      {
        title: "Advanced AI, not just basic automation",
        body: "We build agentic AI, predictive ML, knowledge bases and custom LLM integrations, not just no-code flows. Production-grade from day one, with no technical debt.",
      },
      {
        title: "70% below local agency cost",
        body: "Same quality, a fraction of the price. We pass the cost advantage of our global talent model directly to you, without compromising on code quality or communication.",
      },
    ],
    compare: {
      heading: "How we compare",
      caption: "AlgoNest compared with a traditional agency and a direct hire",
      corner: "Vs.",
      columns: ["Agency", "Hire", "AlgoNest"],
      /** Column that gets the highlight. */
      us: 2,
      rows: [
        { label: "Free start", values: ["No", "No", "Yes"] },
        { label: "Ships in weeks", values: ["Rarely", "No", "Always"] },
        { label: "Stays embedded", values: ["No", "Yes", "Yes"] },
        { label: "AI-native team", values: ["Some", "Maybe", "Yes"] },
      ],
      positive: ["Yes", "Always"],
      negative: ["No"],
    },
  },
  cta: {
    heading: "Let's build something remarkable together.",
    sub: "Start with a free 30-minute discovery call. We'll map exactly where AI and automation can transform your business, with zero cost and zero commitment. If you like what you see, we build.",
    note: ["30 minutes", "No sales pitch", "Just honest value"],
  },
};

export const articlesPage = {
  relatesTo: "This article relates to",
  explore: "Explore this focus",
};

export const footer = {
  company: "Company",
  contact: "Contact info",
  links: [
    { label: "Home", href: "/" },
    { label: "Our Services", href: "/services/" },
    { label: "Projects", href: "/projects/" },
    { label: "Partners", href: "/#partners" },
    { label: "Articles", href: "/articles/" },
    { label: "About Us", href: "/about-us/" },
    { label: "Contact Us", href: "/contact-us/" },
  ],
};

/** Capability pages: the short version of the process, before the call to action. */
export const engagement = {
  heading: "How every engagement starts",
  link: "See the whole process",
  href: "/#process",
};

/** The services index page (/services/). */
export const capabilitiesPage = {
  crumb: "Our Services",
  nextLabel: "Next focus",
  statsNote: "Industry estimates. Results vary by business.",
  title: "Our services. Two focuses. One embedded team.",
  accent: "Two focuses.",
  lead: "Our services focus on web-based AI solutions, and on tailored software for business automation and data analytics. Both are built by developers and specialists who work as part of your team.",
  focusHeading: "Our services are focusing on",
  listLabel: "Our two focuses",
  menuAll: "All five services",
  menuServices: "Services",
  insideHeading: "All five services",
  insideLead: "Each service sits under one of the two focuses, and the embedded tech wing delivers both.",
  focusTag: "Focus",
  bothTag: "Both focuses",
  more: "Explore this focus",
  team: {
    heading: "Delivered by your embedded tech wing",
    body: "We become your technical department: developers and specialists working as part of your team, not as external contractors. We stay connected after launch, project-based or on a retainer.",
    link: "See how every engagement starts",
  },
};

/** The project showcase (/projects/). Project copy lives in src/content/projects.ts. */
export const projectsPage = {
  metaTitle: "Project Showcase",
  metaDescription:
    "Products and prototypes built by AlgoNest: TradeFlow, Qantly, Kvitt, FitSync and Voltari AI. Why each one was built, the problems it solves and where to see it.",
  title: "Project showcase.",
  accent: "showcase.",
  lead: "Products and prototypes built by AlgoNest. Each one began with a problem a business could not solve with the tools it had. Here is why we built it, what it solves and where to see it.",
  counts: { projects: "Projects", live: "Live to explore", prototypes: "Prototypes" },
  indexLabel: "Projects on this page",
  status: { live: "Live product", demo: "Live demo", prototype: "Prototype" },
  builtFor: "Built for",
  why: "Why we built it",
  problems: "Problems it solves",
  features: "What it does",
  services: "Services behind it",
  progress: { heading: "Where it stands", built: "Built and running", next: "Next" },
  visit: "Visit",
  newTab: "(opens in a new tab)",
  privateBuild: "Prototype, not public yet",
  walkthrough: "Ask for a walkthrough",
  ctaHeading: "Your project could be next.",
};

export const about = {
  title: "Who we are: innovators, problem-solvers, partners working from Bangladesh across US and Australia market",
  /** Flags beside the title: where we work from, and the markets we serve. Images are in public/flags. */
  reach: {
    label: "Where we work",
    items: [
      {
        name: "Bangladesh",
        role: "Where we work from",
        note: "Our developers and specialists work from here, as part of your team.",
        flag: "/flags/bd.svg",
        place: "bangladesh",
      },
      {
        name: "United States",
        role: "Market we serve",
        note: "Businesses here get an embedded tech team at a fraction of the local price.",
        flag: "/flags/us.svg",
        place: "us",
      },
      {
        name: "Australia",
        role: "Market we serve",
        note: "Home to our partner AIO Tech Solutions, with offices in Sydney and Dhaka.",
        flag: "/flags/au.svg",
        place: "australia",
      },
    ],
  },
  pull: "We are AlgoNest, and we believe in nesting innovation with excellence.",
  story: [
    "The first step of AlgoNest was taken by Md. Tanvir Islam, Founder and CEO, with a vision of transforming and boosting businesses with smart solutions.",
    "The journey started in 2024 with our first client, AIO Tech Solutions, providing technical support across its business. Today AIO is our partner.",
    "From there we pushed ourselves to deliver custom solutions. Today we focus on two capabilities: web-based AI solutions, and tailored software for business automation and data analytics.",
    "Our core target is to give technical power to businesses. We do it as an embedded technical wing: developers and specialists who work as part of your team, not as external contractors.",
  ],
  principlesHeading: "Principles of AlgoNest",
  principles: [
    {
      title: "Quality and reliability",
      body: "Delivering high-quality, reliable solutions is at the heart of our operations. We maintain rigorous standards at every stage of development, so our products and services are efficient, scalable and secure.",
    },
    {
      title: "Customer-centric approach",
      body: "Our success is rooted in understanding and fulfilling our clients' needs. We prioritise customer satisfaction by delivering tailored solutions that add real value to their businesses.",
    },
    {
      title: "Innovation and continuous improvement",
      body: "We stay ahead by embracing new technologies and fostering a culture of innovation. Through continuous learning and improvement, our solutions stay current and ready for what comes next.",
    },
    {
      title: "Transparency and integrity",
      body: "We believe in building trust through honesty and transparency. By maintaining open communication and ethical practices, we forge long-term partnerships with our clients and stakeholders.",
    },
  ],
} as const;

export type FieldDef = {
  name: string;
  label: string;
  type: "text" | "email" | "textarea" | "select";
  required?: boolean;
  autoComplete?: string;
  options?: string[];
  placeholder?: string;
  half?: boolean;
};

export const contact = {
  title: "Book your free discovery call.",
  lead: "Thirty minutes, no sales pitch, just honest value. Tell us where you want AI and automation to help, and we'll map it with you at zero cost.",
  formHeading: "Tell us about your business",
  next: {
    heading: "What happens next",
    steps: [
      "A free 30-minute discovery call",
      "A free working prototype within 48 hours",
      "You decide whether we build",
    ],
  },
  form: {
    subject: "Free discovery call request",
    submit: "Send request",
    fields: [
      { name: "firstName", label: "First name", type: "text", required: true, autoComplete: "given-name", half: true },
      { name: "lastName", label: "Last name", type: "text", required: true, autoComplete: "family-name", half: true },
      { name: "email", label: "Email", type: "email", required: true, autoComplete: "email" },
      { name: "company", label: "Company name", type: "text", autoComplete: "organization" },
      {
        name: "need",
        label: "What do you need help with?",
        type: "select",
        placeholder: "Choose one",
        options: [
          "Web-based AI solutions",
          "Tailored software, automation or data",
          "An embedded technical team",
          "Not sure yet",
        ],
      },
      { name: "message", label: "Tell us about your business or project", type: "textarea" },
    ] as FieldDef[],
    sending: "Sending...",
    optional: "Optional",
    sent: { heading: "Request sent.", body: "Thank you. We will reply to the email address you gave us to arrange your call." },
    drafted: {
      heading: "Your email draft is ready.",
      body: "Your email app should have opened with the request filled in. Press send there to reach us. If nothing opened, write to",
    },
    again: "Write another message",
    failed: "The request could not be sent. Try again, or email us at",
    errors: {
      required: "Enter your {label}.",
      email: "Enter an email address like name@company.com.",
    },
  },
};
