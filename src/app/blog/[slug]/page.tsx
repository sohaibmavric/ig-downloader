import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import JsonLd from "@/components/JsonLd";
import { formatDate, POSTS, postBySlug, type Block } from "@/lib/blog";
import { CONTENT } from "@/lib/content";
import { absoluteUrl, SITE_NAME } from "@/lib/site";
import { toolById } from "@/lib/tools";

// Every article is prerendered from generateStaticParams, so navigations are
// fully static; the build fails if a dynamic API ever sneaks in.
export const ensureStatic = "navigation";

export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const post = postBySlug((await params).slug);
  if (!post) return {};
  const url = `/blog/${post.slug}`;
  const images = [{ url: "/opengraph-image", width: 1200, height: 630, alt: post.title }];
  return {
    title: post.title,
    description: post.description,
    keywords: post.keywords,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title: post.title,
      description: post.description,
      publishedTime: post.published,
      modifiedTime: post.updated ?? post.published,
      images,
    },
    twitter: { card: "summary_large_image", title: post.title, description: post.description, images },
  };
}

function Content({ block }: { block: Block }) {
  switch (block.type) {
    case "p":
      return <p className="mb-4 leading-relaxed">{block.text}</p>;
    case "h2":
      return <h2 className="mb-3 mt-10 text-2xl font-bold">{block.text}</h2>;
    case "h3":
      return <h3 className="mb-2 mt-6 text-lg font-semibold">{block.text}</h3>;
    case "ol":
      return (
        <ol className="mb-4 list-decimal space-y-2 pl-6 leading-relaxed marker:font-semibold marker:text-accent">
          {block.items.map((item) => <li key={item}>{item}</li>)}
        </ol>
      );
    case "ul":
      return (
        <ul className="mb-4 list-disc space-y-2 pl-6 leading-relaxed marker:text-accent">
          {block.items.map((item) => <li key={item}>{item}</li>)}
        </ul>
      );
    case "tip":
      return (
        <p className="mb-4 rounded-xl border border-accent/30 bg-accent/5 px-4 py-3 text-sm leading-relaxed">
          <strong className="text-accent">Tip: </strong>
          {block.text}
        </p>
      );
  }
}

// The slug is URL data, so it's read behind Suspense: in-app navigations show the
// skeleton instantly, while prerendered articles still ship their full HTML.
export default function BlogPostPage({ params }: PageProps<"/blog/[slug]">) {
  return (
    <Suspense fallback={<ArticleSkeleton />}>
      <BlogPost params={params} />
    </Suspense>
  );
}

function ArticleSkeleton() {
  return (
    <div className="mx-auto max-w-2xl px-4 pb-16 pt-8 sm:pt-12" aria-hidden>
      <div className="mb-6 h-4 w-24 animate-pulse rounded bg-surface-strong" />
      <div className="h-9 w-4/5 animate-pulse rounded bg-surface-strong" />
      <div className="mt-3 h-4 w-48 animate-pulse rounded bg-surface-strong" />
      <div className="mt-8 space-y-3">
        {[0, 1, 2, 3, 4].map((i) => (
          <div key={i} className="h-4 animate-pulse rounded bg-surface-strong" />
        ))}
      </div>
    </div>
  );
}

async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const post = postBySlug((await params).slug);
  if (!post) notFound();

  const tool = toolById(post.tool);
  const toolName = CONTENT[post.tool].h1;
  const url = absoluteUrl(`/blog/${post.slug}`);
  const related = POSTS.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <div className="px-4 pb-16 pt-8 sm:pt-12">
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.title,
            description: post.description,
            url,
            mainEntityOfPage: url,
            datePublished: post.published,
            dateModified: post.updated ?? post.published,
            image: absoluteUrl("/opengraph-image"),
            author: { "@type": "Organization", name: SITE_NAME, url: absoluteUrl("/") },
            publisher: { "@type": "Organization", name: SITE_NAME, url: absoluteUrl("/"), logo: absoluteUrl("/apple-icon.png") },
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: SITE_NAME, item: absoluteUrl("/") },
              { "@type": "ListItem", position: 2, name: "Blog", item: absoluteUrl("/blog") },
              { "@type": "ListItem", position: 3, name: post.title, item: url },
            ],
          },
        ]}
      />

      <article className="mx-auto max-w-2xl">
        <nav aria-label="Breadcrumb" className="mb-6 text-sm text-muted">
          <Link href="/" className="hover:text-foreground">Home</Link>
          <span aria-hidden> / </span>
          <Link href="/blog" className="hover:text-foreground">Blog</Link>
        </nav>
        <h1 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">{post.title}</h1>
        <p className="mt-3 text-sm text-muted">
          <time dateTime={post.published}>{formatDate(post.published)}</time> · {post.readingMinutes} min read · {SITE_NAME} team
        </p>

        <div className="mt-8">
          {post.body.map((block, i) => <Content key={i} block={block} />)}
        </div>

        <aside className="mt-12 rounded-2xl border border-line bg-surface p-6 text-center">
          <p className="text-lg font-semibold">Try the {toolName}</p>
          <p className="mt-1 text-sm text-muted">{tool.about}</p>
          <Link
            href={tool.path}
            className="mt-4 inline-flex items-center justify-center rounded-xl bg-accent px-5 py-2.5 text-sm font-semibold text-white transition hover:brightness-110"
          >
            Open the {tool.label.toLowerCase()} downloader
          </Link>
        </aside>
      </article>

      <section aria-labelledby="related" className="mx-auto mt-16 max-w-2xl">
        <h2 id="related" className="mb-4 text-xl font-bold">More guides</h2>
        <ul className="grid gap-3">
          {related.map((p) => (
            <li key={p.slug}>
              <Link href={`/blog/${p.slug}`} className="block rounded-xl border border-line bg-surface p-4 transition hover:border-accent/50">
                <span className="font-medium">{p.title}</span>
                <span className="mt-1 block text-sm text-muted">{p.description}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
