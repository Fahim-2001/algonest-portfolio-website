export const site = {
  name: "AlgoNest",
  legalName: "AlgoNest Software Solution",
  url: "https://algonest.net",
  tagline: "Nesting Innovation with Excellence",
  description:
    "AlgoNest builds AI, automation, data and custom software for growing businesses, and supplies the engineers to run them.",
  email: "hello@algonest.net",
  phones: [
    { region: "United States", display: "+1 917 459 2977", href: "tel:+19174592977" },
    { region: "Bangladesh", display: "+880 1684 155582", href: "tel:+8801684155582" },
  ],
  address: "West Hartford, Connecticut, United States",
  cta: { label: "Book a meeting", href: "/contact-us/" },
} as const;

export const nav = [
  { label: "Articles", href: "/articles/" },
  { label: "About Us", href: "/about-us/" },
  { label: "Contact Us", href: "/contact-us/" },
] as const;

export const home = {
  hero: {
    lines: ["Nesting innovation", "with excellence."],
    accentWord: "excellence.",
    sub: "AlgoNest builds AI, automation, data and custom software for growing businesses, and supplies the engineers to run them.",
    secondary: { label: "Explore services", href: "/services/" },
  },
  statement:
    "AlgoNest is your partner for web-based IT solutions. From custom software to data-driven applications and automation, we turn your ideas into digital products that help your business grow and run smoothly.",
  servicesHeading: "Our area of services",
  capabilities: [
    "Predictive analytics",
    "Workflow automation",
    "Interactive dashboards",
    "CRM",
    "ERP",
    "Machine learning models",
    "Real-time data processing",
    "Web applications",
    "Dedicated developers",
    "Business intelligence",
  ],
  process: {
    heading: "Our work process",
    tabs: [
      {
        id: "software",
        label: "Software development",
        summary: "Six steps from the first conversation to a product that keeps running.",
        steps: [
          { title: "Requirement gathering", body: "We define what you need and agree the scope of the project." },
          { title: "Planning and design", body: "We draw up the roadmap and the system architecture." },
          { title: "Development", body: "We build the software using established best practices." },
          { title: "Testing", body: "We check quality with a range of tests before anything ships." },
          { title: "Deployment", body: "We launch the software into production." },
          { title: "Maintenance and support", body: "We fix issues and ship updates so the product keeps working." },
        ],
      },
      {
        id: "team",
        label: "Dedicated team",
        summary: "Four steps to place skilled people inside your projects.",
        steps: [
          { title: "Understand your requirements", body: "We learn the roles, skills and expertise you need." },
          { title: "Select and onboard", body: "We choose the right developers and technical experts from our talent pool." },
          { title: "Collaborate with agile methods", body: "Regular communication keeps the team aligned with your business objectives." },
          { title: "Flexible engagement, ongoing support", body: "Engagement models adapt to you, and we keep supporting the team throughout." },
        ],
      },
    ],
  },
  why: {
    heading: "Why AlgoNest?",
    items: [
      { title: "Custom solutions", body: "Tailored IT services for your unique business needs." },
      { title: "Expert team", body: "Skilled professionals delivering innovative, quality results." },
      { title: "Reliability", body: "Secure, scalable solutions with proven consistency and trustworthiness." },
      { title: "End-to-end support", body: "Comprehensive assistance from concept to maintenance." },
    ],
  },
  cta: { heading: "Let's discuss your business." },
} as const;

export const about = {
  title: "Who we are: innovators, problem-solvers, partners.",
  pull: "We are AlgoNest, and we believe in nesting innovation with excellence.",
  story: [
    "The first step of AlgoNest was taken by Md. Tanvir Islam, Founder and CEO, with a vision of transforming and boosting businesses with smart solutions.",
    "The journey started in 2024 with our first client, All In One Tech Solutions, providing technical support across its business.",
    "From there we pushed ourselves to deliver custom solutions. Today we provide AI-based solutions, automation, data-driven solutions and tailored software development.",
    "Our core target is to give technical power to businesses and industries. Following that target, we also provide technical individuals and teams with deep expertise.",
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

export const contact = {
  title: "Let's connect, collaborate and innovate.",
  formHeading: "Connect with us",
} as const;
