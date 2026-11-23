import type { MotionScene } from "@/components/HeroMotion";

export type Stat = { value: string; label: string };
export type Point = { title: string; body: string };

/** Icon keys. Components map them to Phosphor icons, so content stays free of React. */
export type IncludeIcon =
  | "agents"
  | "pipelines"
  | "predict"
  | "knowledge"
  | "apps"
  | "automation"
  | "insights";

export type Include = {
  /** Anchor on the capability page. Retired service URLs redirect to some of these. */
  id: string;
  title: string;
  body: string;
  icon: IncludeIcon;
};

export type ServiceIcon = "automation" | "insights" | "apps" | "process" | "team";

/** One of the five services from the pitch deck ("Our services"). */
export type Service = {
  id: string;
  /** Small label above the title, as on the pitch slide. */
  category: string;
  title: string;
  body: string;
  icon: ServiceIcon;
  /** Live scene shown beside it on the home page. */
  motion: MotionScene;
  /** Slug of the focus it belongs to, or "both" when it delivers either. */
  focus: string;
  href: string;
};

export type Capability = {
  slug: string;
  /** "01", "02": the order the pitch presents them in. */
  index: string;
  name: string;
  /** Shorter name for the footer, menus and links. */
  short: string;
  /** One line under the name in the header menu. */
  menuNote: string;
  art: string;
  motion: MotionScene;
  summary: string;
  hero: string;
  subhead: string;
  lead: string;
  /** Ids of the services (below) that sit under this focus. */
  serviceIds: string[];
  includesHeading: string;
  includes: Include[];
  pointsHeading: string;
  points: Point[];
  statsHeading: string;
  stats: Stat[];
};

/**
 * The two focuses of "Our services": web-based AI solutions, and tailored
 * software for business automation and data analytics. The five services of the
 * pitch deck sit under them (see `services` below).
 */
export const capabilities: Capability[] = [
  {
    slug: "ai-solutions",
    index: "01",
    name: "Web-based AI Solutions",
    short: "Web-based AI Solutions",
    menuNote: "AI agents, decision pipelines, predictive ML",
    art: "/art/ai-solutions.webp",
    motion: "network",
    summary:
      "AI agents, smart decision pipelines and predictive models, built into web applications your team opens in any browser. Repetitive work goes to the machine, high-value work stays with your people.",
    hero: "Advanced AI, not just basic automation.",
    subhead: "Smarter decisions, powered by AI",
    lead: "We build agentic AI, predictive machine learning, knowledge bases and custom LLM integrations, delivered as web applications your team can use from the first day. Production-grade from the start, with no technical debt, so the system keeps up as your business grows.",
    serviceIds: ["intelligent-automation"],
    includesHeading: "What we build",
    includes: [
      {
        id: "ai-agents",
        title: "AI agents",
        body: "Agentic AI that takes on repetitive, multi-step tasks, freeing your team for high-value work.",
        icon: "agents",
      },
      {
        id: "decision-pipelines",
        title: "Smart decision pipelines",
        body: "Workflow automation with judgement built in. Routine cases are handled end to end, and the exceptions go to the right person.",
        icon: "pipelines",
      },
      {
        id: "predictive-ml",
        title: "Predictive machine learning",
        body: "Models trained on the data you already collect, to forecast demand, flag risk and catch anomalies early.",
        icon: "predict",
      },
      {
        id: "knowledge-bases",
        title: "Knowledge bases and LLM integrations",
        body: "Custom large language model integrations that let your team search, ask and act on your own documents and systems.",
        icon: "knowledge",
      },
    ],
    pointsHeading: "Problems that AI solves",
    points: [
      {
        title: "Supply chain disruptions",
        body: "Global supply chains face disruption from geopolitical issues, natural disasters and demand swings. AI predicts demand, manages inventory and finds alternative routes, improving resilience and efficiency.",
      },
      {
        title: "Quality control inconsistencies",
        body: "Product defects harm reputation and raise costs in manufacturing and food processing. AI vision systems detect defects in real time during production by spotting anomalies in materials and finished goods.",
      },
      {
        title: "Worker safety measurements",
        body: "Construction, mining, and oil and gas sites are hazardous. AI monitors workplaces through IoT devices and cameras, detecting unsafe conditions or behaviour in real time to prevent accidents.",
      },
    ],
    statsHeading: "Why does your business need AI solutions?",
    stats: [
      { value: "20-30%", label: "increase in efficiency reported by companies using AI in their operations" },
      { value: "$1.5T", label: "projected size of the AI market by 2030" },
      { value: "25%", label: "average reduction in operational costs for businesses using AI" },
      { value: "30-40%", label: "higher satisfaction rates with AI-powered customer service tools" },
      { value: "50%", label: "better sales forecasting accuracy with AI-powered predictive analytics" },
    ],
  },
  {
    slug: "tailored-software-development",
    index: "02",
    name: "Tailored Software for Business Automation and Data Analytics",
    short: "Tailored Software, Automation and Data",
    menuNote: "Web applications, process automation, analytics",
    art: "/art/platform.webp",
    motion: "platform",
    summary:
      "CRM, ERP and bespoke web platforms built to your exact process, automation that removes manual hand-offs, and analytics that turn raw data into decisions.",
    hero: "Software that fits. Automation that flows. Data that speaks.",
    subhead: "Software designed to fit your goals",
    lead: "Your process is part of what makes your business different, so your software should follow it. We build web applications around the way you work, automate the routine hand-offs between your tools, and turn the data they produce into dashboards and forecasts you can act on. Scalable from day one, with no technical debt.",
    serviceIds: ["data-driven-insights", "tailored-web-applications", "process-automation"],
    includesHeading: "What we build",
    includes: [
      {
        id: "web-applications",
        title: "Tailored web applications",
        body: "CRM, ERP and bespoke web platforms built to your exact process. Scalable from day one, no technical debt.",
        icon: "apps",
      },
      {
        id: "process-automation",
        title: "Process automation",
        body: "Custom automation layers that connect your existing tools, eliminate manual hand-offs and scale with your operations.",
        icon: "automation",
      },
      {
        id: "data-analytics",
        title: "Data-driven insights",
        body: "Interactive dashboards, predictive analytics and real-time data processing that turn raw data into decisions that move the business.",
        icon: "insights",
      },
    ],
    pointsHeading: "Problems we solve",
    points: [
      {
        title: "Generic tools that need workarounds",
        body: "Custom software addresses the unique challenges and workflows of a business, where generic tools need workarounds. A retailer's system can integrate with its e-commerce platform and supply chain to optimise inventory.",
      },
      {
        title: "Inventory management errors",
        body: "In retail, logistics and warehousing, manual tracking causes stock discrepancies, overstocking and shortages. Automated systems using RFID tags, barcode scanners and IoT devices track stock in real time.",
      },
      {
        title: "Compliance and regulatory reporting",
        body: "Financial institutions face complex, changing rules such as AML and KYC that are slow to manage by hand. Automation aggregates data, generates compliant reports and monitors transactions, cutting compliance costs.",
      },
      {
        title: "Customer churn and retention",
        body: "High customer turnover in banking, insurance and wealth management reduces profitability. Models built on transaction history, engagement and demographics predict churn risk and recommend offers that retain high-value clients.",
      },
    ],
    statsHeading: "Why does your business need tailored software, automation and data?",
    stats: [
      { value: "89%", label: "of businesses believe tailored software gives them a competitive advantage" },
      { value: "20-30%", label: "reduction in operational inefficiencies with custom software" },
      { value: "35%", label: "upper bound on operating cost savings for businesses implementing automation" },
      { value: "50-70%", label: "gain in task efficiency, depending on the industry" },
      { value: "91%", label: "of companies using data analytics report improved decision-making" },
      { value: "5-10%", label: "increase in revenue for businesses that adopt data-driven strategies" },
    ],
  },
];

/**
 * The five services, in the order the pitch deck lists them. Intelligent
 * Automation is the first focus (web-based AI); Data Driven Insights, Tailored
 * Web Applications and Process Automation make up the second (tailored
 * software for business automation and data analytics); the Embedded Tech Wing
 * is how both are delivered.
 */
export const services: Service[] = [
  {
    id: "intelligent-automation",
    category: "AI Solutions",
    title: "Intelligent Automation",
    body: "Workflow automation, smart decision pipelines and AI agents that handle repetitive tasks, freeing your team for high-value work.",
    icon: "automation",
    motion: "network",
    focus: "ai-solutions",
    href: "/ai-solutions/",
  },
  {
    id: "data-driven-insights",
    category: "Data & Analytics",
    title: "Data Driven Insights",
    body: "Interactive dashboards, predictive analytics and real-time data processing, turning raw data into decisions that move the business.",
    icon: "insights",
    motion: "reading",
    focus: "tailored-software-development",
    href: "/tailored-software-development/#data-analytics",
  },
  {
    id: "tailored-web-applications",
    category: "Custom Software",
    title: "Tailored Web Applications",
    body: "CRM, ERP and bespoke web platforms built to your exact process. Scalable from day one, with no technical debt.",
    icon: "apps",
    motion: "platform",
    focus: "tailored-software-development",
    href: "/tailored-software-development/#web-applications",
  },
  {
    id: "process-automation",
    category: "Automation",
    title: "Process Automation",
    body: "Custom automation layers that connect your existing tools, eliminate manual hand-offs and scale with your operations.",
    icon: "process",
    motion: "streams",
    focus: "tailored-software-development",
    href: "/tailored-software-development/#process-automation",
  },
  {
    id: "embedded-tech-wing",
    category: "Dedicated Team",
    title: "Embedded Tech Wing",
    body: "We become your technical department: developers and specialists working as part of your team, not as external contractors.",
    icon: "team",
    motion: "team",
    focus: "both",
    href: "/services/#embedded-tech-wing",
  },
];

export function getServices(ids: string[]) {
  return ids.map((id) => services.find((s) => s.id === id)).filter((s): s is Service => !!s);
}

export const capabilitySlugs = capabilities.map((c) => c.slug);

export function getCapability(slug: string) {
  return capabilities.find((c) => c.slug === slug);
}
