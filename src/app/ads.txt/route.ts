import { ADSENSE_CLIENT } from "@/lib/ads";

// Authorised Digital Sellers file for AdSense, generated from the publisher ID.
export function GET() {
  if (!ADSENSE_CLIENT) {
    return new Response("# No advertising configured.\n", { headers: { "Content-Type": "text/plain; charset=utf-8" } });
  }
  const publisherId = ADSENSE_CLIENT.replace(/^ca-/, "");
  return new Response(`google.com, ${publisherId}, DIRECT, f08c47fec0942fa0\n`, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
