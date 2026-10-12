export type Stat = { value: string; label: string };
export type Point = { title: string; body: string };

export type Service = {
  slug: string;
  name: string;
  /** Short name for navigation and rows. */
  short: string;
  art: string;
  summary: string;
  hero: string;
  subhead: string;
  lead: string;
  pointsHeading?: string;
  points?: Point[];
  statsHeading: string;
  stats: Stat[];
  hasForm?: boolean;
};

export const services: Service[] = [
  {
    slug: "ai-solutions",
    name: "AI Solutions",
    short: "AI Solutions",
    art: "/art/ai-solutions.webp",
    summary:
      "Intelligent tools that automate workflows, improve customer experiences and turn your data into business intelligence you can act on.",
    hero: "AI that works for you. Smarter, faster, better.",
    subhead: "Smarter decisions, powered by AI",
    lead: "AI technologies that automate tasks, analyse data and deliver sharper insight. From predictive models to intelligent systems, our solutions help you innovate, stay agile and achieve more with less effort.",
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
    statsHeading: "Why does your business need AI Solutions?",
    stats: [
      { value: "20-30%", label: "increase in efficiency reported by companies using AI in their operations" },
      { value: "$1.5T", label: "projected size of the AI market by 2030" },
      { value: "25%", label: "average reduction in operational costs for businesses using AI" },
      { value: "30-40%", label: "higher satisfaction rates with AI-powered customer service tools" },
      { value: "50%", label: "better sales forecasting accuracy with AI-powered predictive analytics" },
    ],
  },
  {
    slug: "automation",
    name: "Automation",
    short: "Automation",
    art: "/art/automation.webp",
    summary:
      "Custom, scalable web platforms that automate repetitive tasks, streamline workflows and connect your web applications.",
    hero: "Redefining productivity through automation.",
    subhead: "Simplify tasks, amplify results",
    lead: "Take the hassle out of routine operations with custom automation. Our web-based tools streamline workflows so you can focus on growing your business. They are efficient, reliable and scale with your needs.",
    pointsHeading: "Problems that automation solves",
    points: [
      {
        title: "Inventory management errors",
        body: "In retail, logistics and warehousing, manual tracking causes stock discrepancies, overstocking and shortages. Automated systems using RFID tags, barcode scanners and IoT devices track stock in real time.",
      },
      {
        title: "Production bottlenecks",
        body: "Inefficient workflows in automotive and electronics manufacturing cause delays and reduced output. Programmable logic controllers and automated guided vehicles synchronise production lines and remove bottlenecks.",
      },
      {
        title: "Compliance and regulatory reporting",
        body: "Financial institutions face complex, changing rules such as AML and KYC that are slow to manage by hand. Automation aggregates data, generates compliant reports and monitors transactions, cutting compliance costs.",
      },
    ],
    statsHeading: "Why does your business need Automation Solutions?",
    stats: [
      { value: "35%", label: "upper bound on operating cost savings for businesses implementing automation" },
      { value: "50-70%", label: "gain in task efficiency, depending on the industry" },
      { value: "30%", label: "increase in employee productivity after automating routine tasks" },
      { value: "$300B", label: "expected global market for automation technologies by 2028" },
      { value: "85%", label: "of businesses believe automation is essential for staying competitive" },
    ],
  },
  {
    slug: "data-driven-solutions",
    name: "Data Driven Solutions",
    short: "Data Driven Solutions",
    art: "/art/data-driven-solutions.webp",
    summary:
      "Interactive dashboards, predictive analytics and real-time data processing that help you make informed decisions and gain a competitive edge.",
    hero: "Data that speaks, solutions that deliver.",
    subhead: "Make smarter moves with data power",
    lead: "Make confident decisions backed by data. Our solutions turn raw information into meaningful insight through advanced analytics and interactive visualisations, so you can optimise strategy and spot opportunities.",
    pointsHeading: "Problems that data driven solutions solve",
    points: [
      {
        title: "Customer churn and retention",
        body: "High customer turnover in banking, insurance and wealth management reduces profitability. Models built on transaction history, engagement and demographics predict churn risk and recommend offers that retain high-value clients.",
      },
      {
        title: "Fraud and financial crime detection",
        body: "Sophisticated fraud, including money laundering and account takeovers, defeats traditional detection. Anomaly detection monitors transaction patterns and flags suspicious activity in real time.",
      },
      {
        title: "Inaccurate risk assessment",
        body: "Decisions made on incomplete data misjudge risk. Models that combine customer history, transaction behaviour and market signals score risk more accurately and update as conditions change.",
      },
    ],
    statsHeading: "Why does your business need Data Driven Solutions?",
    stats: [
      { value: "91%", label: "of companies using data analytics report improved decision-making" },
      { value: "5-10%", label: "increase in revenue for businesses that adopt data-driven strategies" },
      { value: "20-30%", label: "reduction in operational risks from data-driven insights" },
      { value: "35%", label: "improvement in productivity with advanced data visualisation tools" },
      { value: "$650B", label: "expected size of the big data analytics market by 2029" },
    ],
  },
  {
    slug: "tailored-software-development",
    name: "Tailored Software Development",
    short: "Tailored Software",
    art: "/art/tailored-software-development.webp",
    summary:
      "Custom web applications built around your business, whether that is a CRM, an ERP or a bespoke system that fits your goals.",
    hero: "Personalised software for unmatched performance.",
    subhead: "Software designed to fit your goals",
    lead: "Your vision and our expertise, together. Whether you need a web application or a fully customised system, our team delivers intuitive, scalable tools that meet your exact requirements.",
    pointsHeading: "Ease of a tailored software solution",
    points: [
      {
        title: "Solves specific business needs",
        body: "Custom software addresses the unique challenges and workflows of a business, where generic tools need workarounds. A retailer's system can integrate with its e-commerce platform and supply chain to optimise inventory.",
      },
      {
        title: "Enhanced scalability and flexibility",
        body: "Custom solutions adapt to growth and changing needs without major redesigns. A logistics company can extend its routing software to larger fleets or new markets as demand shifts.",
      },
      {
        title: "User-friendly, minimal training required",
        body: "Interfaces are designed for specific roles and workflows. A finance firm's loan processing tool can simplify staff tasks with clear dashboards, reducing training time and raising adoption.",
      },
    ],
    statsHeading: "Why does your business need Tailored Software?",
    stats: [
      { value: "89%", label: "of businesses believe tailored software gives them a competitive advantage" },
      { value: "20-30%", label: "reduction in operational inefficiencies with custom software" },
      { value: "$24B", label: "annual value of the global custom software development market" },
      { value: "95%", label: "of executives say custom software significantly enhances business performance" },
    ],
  },
  {
    slug: "technical-team-hiring",
    name: "Technical Team Hiring",
    short: "Technical Team Hiring",
    art: "/art/technical-team-hiring.webp",
    summary:
      "Skilled developers and IT professionals who work as an extension of your team, for one project or for ongoing development.",
    hero: "Access top talent to accelerate your success.",
    subhead: "Expert developers at your fingertips",
    lead: "Strengthen your projects with our dedicated developers and IT specialists. We extend your team with the technical skills and flexibility needed to execute your vision, from start to finish.",
    statsHeading: "Why does your business need to hire a Technical Team?",
    stats: [
      { value: "30-50%", label: "saved on development costs by companies using remote technical teams" },
      { value: "35%", label: "increase in project scalability with dedicated technical teams" },
      { value: "75%", label: "of businesses achieve higher flexibility and efficiency with outsourced teams" },
      { value: "30%", label: "fewer errors during deployment on projects with skilled technical teams" },
    ],
    hasForm: true,
  },
];

export const serviceSlugs = services.map((s) => s.slug);

export function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}
