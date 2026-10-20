import type { Metadata } from "next";
import { formatDate } from "@/lib/blog";
import { LEGAL_PAGES } from "@/lib/legal";

const pageFor = (path: string) => LEGAL_PAGES.find((p) => p.path === path)!;

export function legalMetadata(path: string): Metadata {
  const page = pageFor(path);
  return {
    title: page.title,
    description: page.description,
    alternates: { canonical: page.path },
  };
}

export default function LegalArticle({ path }: { path: string }) {
  const page = pageFor(path);
  return (
    <article className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:pt-16">
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{page.title}</h1>
      <p className="mt-3 text-sm text-muted">
        Last updated <time dateTime={page.updated}>{formatDate(page.updated)}</time>
      </p>
      {page.sections.map((s) => (
        <section key={s.heading} className="mt-8 leading-relaxed">
          <h2 className="mb-3 text-xl font-semibold">{s.heading}</h2>
          <div className="text-muted">{s.body}</div>
        </section>
      ))}
    </article>
  );
}
