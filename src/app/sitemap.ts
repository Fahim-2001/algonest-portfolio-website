import type { MetadataRoute } from "next";
import { articles } from "@/content/articles";
import { capabilities } from "@/content/capabilities";
import { site } from "@/content/site";

export const dynamic = "force-static";

/** Canonical URLs only. Retired service URLs redirect and are left out. */
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "/",
    "/services/",
    ...capabilities.map((c) => `/${c.slug}/`),
    "/projects/",
    "/articles/",
    ...articles.map((a) => `/articles/${a.slug}/`),
    "/about-us/",
    "/contact-us/",
  ];
  return paths.map((p) => ({ url: new URL(p, site.url).toString() }));
}
