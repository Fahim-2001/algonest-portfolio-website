export type Partner = {
  name: string;
  url: string;
  /** Link text: the bare domain. */
  domain: string;
  /** Supplied logo, used as is (see docs/RULES.md). */
  logo: string;
  relationship: string;
  body: string;
  /** Work of ours for this partner, on the project showcase. */
  project?: { href: string; label: string };
  facts: string[];
  story: string;
};

/**
 * Partners describe themselves from their own published material only.
 * AIO Tech Solutions: allinonetechsolutions.com.au, read 2026-11-24.
 */
export const partners = {
  heading: "Our partners",
  lead: "We grow with the companies we work with. Our first client is now our partner.",
  visit: "Visit",
  newTab: "(opens in a new tab)",
  items: [
    {
      name: "AIO Tech Solutions",
      url: "https://www.allinonetechsolutions.com.au",
      domain: "allinonetechsolutions.com.au",
      logo: "/partners/aio-tech-solutions.png",
      relationship: "First client in 2024, partner today",
      body: "AIO Tech Solutions is a client-first software company with offices in Sydney and Dhaka. As an official Odoo partner it licenses, implements and supports Odoo for its clients, and it offers TradeFlow, an operations platform that runs orders, suppliers, freight and accounts across 12 integrated modules.",
      project: { href: "/projects/#tradeflow", label: "See TradeFlow in our project showcase" },
      facts: ["Official Odoo partner", "TradeFlow, 12 integrated modules", "Sydney and Dhaka"],
      story:
        "AIO was our first client in 2024, when we provided technical support across its business. Today we work together as partners.",
    },
  ] satisfies Partner[],
};
