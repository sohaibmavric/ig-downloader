import { sendGAEvent } from "@next/third-parties/google";
import type { ToolId } from "./tools";

// Google Analytics 4 events. Nothing is sent unless NEXT_PUBLIC_GA_MEASUREMENT_ID
// is set. Parameters never include the pasted URL, usernames or post codes.

export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

export type LinkType = "post" | "reel" | "story" | "highlight" | "profile" | "unknown";
export type SubmitMethod = "paste" | "paste_button" | "typed" | "enter" | "deeplink";
export type ErrorReason = "rate_limited" | "login_required" | "not_found" | "invalid_link" | "network" | "other";

type Events = {
  link_submitted: { tool: ToolId; link_type: LinkType; method: SubmitMethod };
  media_resolved: { tool: ToolId; link_type: LinkType; item_count: number; video_count: number; image_count: number; duration_ms: number };
  media_error: { tool: ToolId; link_type: LinkType; reason: ErrorReason; status: number };
  download_click: { tool: ToolId; format: "mp4" | "jpg" | "mp3"; item_index: number; item_count: number };
  clipboard_blocked: { tool: ToolId };
  link_cleared: { tool: ToolId };
};

export function track<E extends keyof Events>(name: E, params: Events[E]) {
  if (!GA_MEASUREMENT_ID) return;
  try {
    sendGAEvent("event", name, params);
  } catch {
    // Analytics must never break the app.
  }
}

export function linkType(url: string): LinkType {
  try {
    const [first, second] = new URL(url).pathname.split("/").filter(Boolean);
    if (first === "reel" || first === "reels") return "reel";
    if (first === "p" || first === "tv" || second === "p") return "post";
    if (second === "reel") return "reel";
    if (first === "stories") return second === "highlights" ? "highlight" : "story";
    if (first) return "profile";
  } catch {
    /* fall through */
  }
  return "unknown";
}

export function errorReason(status: number, loginRequired?: boolean): ErrorReason {
  if (status === 429) return "rate_limited";
  if (loginRequired || status === 401) return "login_required";
  if (status === 404) return "not_found";
  if (status === 400) return "invalid_link";
  if (status === 0) return "network";
  return "other";
}
