import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: true,
  turbopack: { root: path.resolve(__dirname) },
  // The five services became two capabilities (docs/PLAN.md, update 2). The old
  // URLs stay alive as permanent redirects so inbound links and ranking carry
  // over. Never remove these (docs/RULES.md, rule 13).
  async redirects() {
    return [
      {
        source: "/automation",
        destination: "/tailored-software-development/#process-automation",
        permanent: true,
      },
      {
        source: "/data-driven-solutions",
        destination: "/tailored-software-development/#data-analytics",
        permanent: true,
      },
      { source: "/technical-team-hiring", destination: "/contact-us/", permanent: true },
    ];
  },
};

export default nextConfig;
