import type { MetadataRoute } from "next";
import { POSTS } from "@/lib/blog";
import { LEGAL_PAGES } from "@/lib/legal";
import { absoluteUrl } from "@/lib/site";
import { TOOLS } from "@/lib/tools";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const newestPost = POSTS.map((p) => p.updated ?? p.published).sort().at(-1);

  return [
    ...TOOLS.map((tool) => ({
      url: absoluteUrl(tool.path),
      lastModified,
      changeFrequency: "weekly" as const,
      priority: tool.path === "/" ? 1 : 0.9,
    })),
    {
      url: absoluteUrl("/blog"),
      lastModified: newestPost ? new Date(newestPost) : lastModified,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    ...POSTS.map((post) => ({
      url: absoluteUrl(`/blog/${post.slug}`),
      lastModified: new Date(post.updated ?? post.published),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...LEGAL_PAGES.map((page) => ({
      url: absoluteUrl(page.path),
      lastModified: new Date(page.updated),
      changeFrequency: "yearly" as const,
      priority: 0.3,
    })),
  ];
}
