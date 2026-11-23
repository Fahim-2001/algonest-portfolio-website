import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Cta } from "@/components/Cta";
import { Reveal } from "@/components/Reveal";
import { articles, type Article } from "@/content/articles";

export const metadata: Metadata = {
  title: "Articles",
  description:
    "Plain-spoken notes from AlgoNest on AI, automation, data, tailored software and working with an embedded technical team.",
};

const i = (n: number) => ({ "--i": n }) as React.CSSProperties;

function Meta({ article }: { article: Article }) {
  return (
    <p className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted">
      <span className="text-accent-text">{article.topic}</span>
      <span>{article.minutes} min read</span>
    </p>
  );
}

export default function ArticlesPage() {
  const [lead, ...rest] = articles;

  return (
    <>
      <section className="shell pb-12 pt-36 md:pb-16 md:pt-44">
        <Reveal amount={0}>
          <h1 className="display t-stagger-line">Articles</h1>
          <p className="lead t-stagger-line mt-6" style={i(1)}>
            Notes from our work on AI, automation, data, tailored software and embedded teams. Written for the people
            who run the business, not only the people who write the code.
          </p>
        </Reveal>
      </section>

      <section className="shell pb-16" aria-label="All articles">
        <Link
          href={`/articles/${lead.slug}/`}
          className="group grid overflow-hidden rounded-[20px] border border-line bg-surface md:grid-cols-2"
        >
          <div className="relative aspect-[4/3] overflow-hidden bg-slate md:aspect-auto md:min-h-[420px]">
            <Image
              src={lead.art}
              alt=""
              fill
              priority
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
          </div>
          <div className="flex flex-col justify-center gap-5 p-8 md:p-12">
            <Meta article={lead} />
            <h2 className="h2 transition-colors duration-300 group-hover:text-accent-text">{lead.title}</h2>
            <p className="max-w-[52ch] text-muted">{lead.excerpt}</p>
          </div>
        </Link>

        <Reveal as="ul" className="mt-6 grid gap-6 md:grid-cols-2">
          {rest.map((article, n) => (
            <li key={article.slug} className="t-stagger-line" style={i(n)}>
              <Link
                href={`/articles/${article.slug}/`}
                className="group flex h-full flex-col overflow-hidden rounded-[20px] border border-line bg-surface"
              >
                <div className="relative aspect-[16/9] overflow-hidden bg-slate">
                  <Image
                    src={article.art}
                    alt=""
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col gap-4 p-8">
                  <Meta article={article} />
                  <h2 className="h3 transition-colors duration-300 group-hover:text-accent-text">{article.title}</h2>
                  <p className="text-muted">{article.excerpt}</p>
                </div>
              </Link>
            </li>
          ))}
        </Reveal>
      </section>

      <Cta />
    </>
  );
}
