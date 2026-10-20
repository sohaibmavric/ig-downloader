import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";
import { TOOLS } from "@/lib/tools";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return TOOLS.map((tool) => ({
    url: absoluteUrl(tool.path),
    lastModified,
    changeFrequency: "weekly",
    priority: tool.path === "/" ? 1 : 0.8,
  }));
}
