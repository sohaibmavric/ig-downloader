import type { NextRequest } from "next/server";
import { ExtractError, resolveInstagram, toPublicResult } from "@/lib/instagram";

export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get("url");
  if (!url) {
    return Response.json({ error: "Missing url parameter." }, { status: 400 });
  }

  try {
    const result = await resolveInstagram(url);
    // result.author / result.caption are available here for server-side use.
    return Response.json(toPublicResult(result), { headers: { "Cache-Control": "no-store" } });
  } catch (err) {
    if (err instanceof ExtractError) {
      return Response.json(
        { error: err.message, loginRequired: err.loginRequired },
        { status: err.status },
      );
    }
    console.error("resolve failed", err);
    return Response.json({ error: "Unexpected error while fetching media." }, { status: 500 });
  }
}
