import type { NextRequest } from "next/server";
import { isAllowedMediaUrl, MEDIA_USER_AGENT } from "@/lib/instagram";

// Streams Instagram CDN media through our origin so the browser can preview it
// (no CORS/referrer issues) and save it with a proper filename.

const PASSTHROUGH = ["content-type", "content-length", "content-range", "accept-ranges", "last-modified", "etag"];

function safeFilename(name: string | null, fallback: string) {
  const cleaned = (name ?? "").replace(/[^\w.\- ]+/g, "").trim().slice(0, 120);
  return cleaned || fallback;
}

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const target = isAllowedMediaUrl(params.get("url") ?? "");
  if (!target) {
    return new Response("Unsupported media URL", { status: 400 });
  }

  const headers: Record<string, string> = { "User-Agent": MEDIA_USER_AGENT };
  const range = request.headers.get("range");
  if (range) headers.Range = range;

  const upstream = await fetch(target, { headers, redirect: "follow", signal: request.signal });
  if (!isAllowedMediaUrl(upstream.url) || (!upstream.ok && upstream.status !== 206)) {
    return new Response("Media unavailable (the link may have expired, try again)", { status: 502 });
  }

  const out = new Headers();
  for (const name of PASSTHROUGH) {
    const value = upstream.headers.get(name);
    if (value) out.set(name, value);
  }
  out.set("Cache-Control", "private, max-age=3600");

  if (params.get("download") === "1") {
    const type = upstream.headers.get("content-type") ?? "";
    const ext = type.includes("video") ? "mp4" : type.includes("png") ? "png" : type.includes("webp") ? "webp" : "jpg";
    const filename = safeFilename(params.get("filename"), `instagram-media.${ext}`);
    out.set("Content-Disposition", `attachment; filename="${filename}"`);
  }

  return new Response(upstream.body, { status: upstream.status, headers: out });
}
