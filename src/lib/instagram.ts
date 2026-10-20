// Instagram media extractor.
//
// Resolution order for posts/reels:
//   1. Mobile web API  /api/v1/media/{pk}/info/   (needs IG_SESSIONID)
//   2. Public GraphQL  /graphql/query (doc_id)     (anonymous, often rate-limited)
//   3. Embed page      /p/{code}/embed/captioned/  (anonymous fallback)
// Stories and HD profile pictures need IG_SESSIONID.

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Obj = Record<string, any>;

export type MediaItem = {
  type: "video" | "image";
  url: string;
  thumbnail: string;
  width?: number;
  height?: number;
};

export type MediaResult = {
  kind: "post" | "story" | "profile";
  shortcode?: string;
  author?: { username: string; fullName?: string; avatar?: string };
  caption?: string;
  items: MediaItem[];
};

// What the API exposes to clients. Author and caption are extracted for
// server-side use only and never leave the server.
export type PublicMediaResult = Omit<MediaResult, "author" | "caption">;

export function toPublicResult({ kind, shortcode, items }: MediaResult): PublicMediaResult {
  return { kind, shortcode, items };
}

export class ExtractError extends Error {
  constructor(
    message: string,
    public status = 400,
    public loginRequired = false,
  ) {
    super(message);
  }
}

const APP_ID = "936619743392459";
const POST_DOC_ID = "8845758582119845";
const UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36";
const SHORTCODE_ALPHABET =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_";

const SESSION_ID = process.env.IG_SESSIONID?.trim();

// ---------------------------------------------------------------------------
// URL parsing

export type ParsedUrl =
  | { type: "post"; shortcode: string }
  | { type: "story"; username: string; storyId?: string }
  | { type: "highlight"; highlightId: string }
  | { type: "profile"; username: string };

const RESERVED_PATHS = new Set([
  "p",
  "reel",
  "reels",
  "tv",
  "stories",
  "explore",
  "accounts",
  "direct",
  "about",
  "legal",
]);

export function parseInstagramUrl(input: string): ParsedUrl {
  let url: URL;
  try {
    url = new URL(input.trim());
  } catch {
    throw new ExtractError("That doesn't look like a valid link.");
  }
  const host = url.hostname.toLowerCase();
  if (!/(^|\.)instagram\.com$/.test(host) && host !== "instagr.am") {
    throw new ExtractError("Only instagram.com links are supported.");
  }

  const parts = url.pathname.split("/").filter(Boolean);
  const [first, second, third] = parts;

  if (["p", "reel", "reels", "tv"].includes(first) && second) {
    return { type: "post", shortcode: second };
  }
  // instagram.com/{user}/p/{code} and /{user}/reel/{code}
  if (["p", "reel"].includes(second) && third) {
    return { type: "post", shortcode: third };
  }
  if (first === "stories" && second === "highlights" && third) {
    return { type: "highlight", highlightId: third };
  }
  if (first === "stories" && second) {
    return { type: "story", username: second, storyId: third };
  }
  if (first && !RESERVED_PATHS.has(first)) {
    return { type: "profile", username: first };
  }
  throw new ExtractError("Unsupported Instagram link.");
}

export function shortcodeToPk(shortcode: string): string {
  // Private-post shortcodes carry a suffix after the first 11 chars.
  const code = shortcode.length > 28 ? shortcode.slice(0, -28) : shortcode;
  let pk = BigInt(0);
  for (const ch of code) {
    const idx = SHORTCODE_ALPHABET.indexOf(ch);
    if (idx < 0) throw new ExtractError("Invalid post code in link.");
    pk = pk * BigInt(64) + BigInt(idx);
  }
  return pk.toString();
}

// ---------------------------------------------------------------------------
// HTTP helpers

function baseHeaders(
  extra: Record<string, string> = {},
): Record<string, string> {
  const headers: Record<string, string> = {
    "User-Agent": UA,
    Accept: "*/*",
    "Accept-Language": "en-US,en;q=0.9",
    "X-IG-App-ID": APP_ID,
    "X-ASBD-ID": "198387",
    "X-IG-WWW-Claim": "0",
    Origin: "https://www.instagram.com",
    Referer: "https://www.instagram.com/",
    ...extra,
  };
  return headers;
}

function sessionCookie(): string | undefined {
  return SESSION_ID ? `sessionid=${SESSION_ID}` : undefined;
}

const RATE_LIMITED = () =>
  new ExtractError("Instagram is rate-limiting this server right now. Try again in a few minutes.", 429);

async function getJson(
  url: string,
  headers: Record<string, string>,
): Promise<Obj | null> {
  const res = await fetch(url, {
    headers,
    redirect: "manual",
    cache: "no-store",
  });
  if (res.status === 429) throw RATE_LIMITED();
  if (!res.ok) return null;
  const type = res.headers.get("content-type") ?? "";
  if (!type.includes("json")) return null;
  return (await res.json()) as Obj;
}

function cookiesFrom(res: Response): Record<string, string> {
  const out: Record<string, string> = {};
  for (const raw of res.headers.getSetCookie()) {
    const [pair] = raw.split(";");
    const eq = pair.indexOf("=");
    if (eq > 0) out[pair.slice(0, eq).trim()] = pair.slice(eq + 1).trim();
  }
  return out;
}

// ---------------------------------------------------------------------------
// Normalisers: Instagram returns two shapes ("product" from the mobile API and
// embed pages, "graphql" from the web GraphQL endpoint).

function pickLargest(list: Obj[] | undefined): Obj | undefined {
  if (!list?.length) return undefined;
  return [...list].sort(
    (a, b) =>
      (b.width ?? 0) * (b.height ?? 0) - (a.width ?? 0) * (a.height ?? 0),
  )[0];
}

function productItem(node: Obj): MediaItem | null {
  const image = pickLargest(node.image_versions2?.candidates);
  const video = pickLargest(node.video_versions);
  if (video?.url) {
    return {
      type: "video",
      url: video.url,
      thumbnail: image?.url ?? "",
      width: video.width,
      height: video.height,
    };
  }
  if (image?.url) {
    return {
      type: "image",
      url: image.url,
      thumbnail: image.url,
      width: image.width,
      height: image.height,
    };
  }
  return null;
}

function fromProduct(media: Obj): MediaResult {
  const nodes: Obj[] = media.carousel_media?.length
    ? media.carousel_media
    : [media];
  return {
    kind: "post",
    shortcode: media.code,
    author: media.user && {
      username: media.user.username,
      fullName: media.user.full_name,
      avatar: media.user.profile_pic_url,
    },
    caption: media.caption?.text,
    items: nodes.map(productItem).filter((x): x is MediaItem => x !== null),
  };
}

function graphqlItem(node: Obj): MediaItem | null {
  const image = pickLargest(
    node.display_resources?.map((r: Obj) => ({
      url: r.src,
      width: r.config_width,
      height: r.config_height,
    })),
  );
  const thumbnail = image?.url ?? node.display_url ?? "";
  if (node.is_video && node.video_url) {
    return {
      type: "video",
      url: node.video_url,
      thumbnail,
      width: node.dimensions?.width,
      height: node.dimensions?.height,
    };
  }
  if (thumbnail) {
    return {
      type: "image",
      url: thumbnail,
      thumbnail,
      width: image?.width,
      height: image?.height,
    };
  }
  return null;
}

function fromGraphql(media: Obj): MediaResult {
  const children: Obj[] | undefined =
    media.edge_sidecar_to_children?.edges?.map((e: Obj) => e.node);
  const nodes = children?.length ? children : [media];
  return {
    kind: "post",
    shortcode: media.shortcode,
    author: media.owner && {
      username: media.owner.username,
      fullName: media.owner.full_name,
      avatar: media.owner.profile_pic_url,
    },
    caption: media.edge_media_to_caption?.edges?.[0]?.node?.text,
    items: nodes.map(graphqlItem).filter((x): x is MediaItem => x !== null),
  };
}

// ---------------------------------------------------------------------------
// Post strategies

async function postViaMobileApi(
  shortcode: string,
): Promise<MediaResult | null> {
  const cookie = sessionCookie();
  if (!cookie) return null;
  const data = await getJson(
    `https://i.instagram.com/api/v1/media/${shortcodeToPk(shortcode)}/info/`,
    baseHeaders({ Cookie: cookie }),
  );
  const media = data?.items?.[0];
  return media ? fromProduct(media) : null;
}

async function postViaGraphql(shortcode: string): Promise<MediaResult | null> {
  // Prime a csrftoken cookie, the same way the web app does on first load.
  const prime = await fetch(
    `https://i.instagram.com/api/v1/web/get_ruling_for_content/?content_type=MEDIA&target_id=${shortcodeToPk(shortcode)}`,
    { headers: baseHeaders(), cache: "no-store" },
  );
  const cookies = cookiesFrom(prime);
  const csrf = cookies.csrftoken ?? "";
  const cookieHeader = [
    ...Object.entries(cookies).map(([k, v]) => `${k}=${v}`),
    sessionCookie(),
  ]
    .filter(Boolean)
    .join("; ");

  const variables = JSON.stringify({
    shortcode,
    fetch_tagged_user_count: null,
    hoisted_comment_id: null,
    hoisted_reply_id: null,
  });
  const params = new URLSearchParams({ doc_id: POST_DOC_ID, variables });
  const data = await getJson(
    `https://www.instagram.com/graphql/query/?${params}`,
    baseHeaders({
      "X-CSRFToken": csrf,
      "X-Requested-With": "XMLHttpRequest",
      Referer: `https://www.instagram.com/p/${shortcode}/`,
      ...(cookieHeader ? { Cookie: cookieHeader } : {}),
    }),
  );
  const media = data?.data?.xdt_shortcode_media ?? data?.data?.shortcode_media;
  return media ? fromGraphql(media) : null;
}

function extractBalancedJson(text: string, start: number): string | null {
  // Return the JSON object beginning at `start` (which must be "{").
  let depth = 0;
  let inString = false;
  for (let i = start; i < text.length; i++) {
    const ch = text[i];
    if (inString) {
      if (ch === "\\") i++;
      else if (ch === '"') inString = false;
    } else if (ch === '"') inString = true;
    else if (ch === "{") depth++;
    else if (ch === "}" && --depth === 0) return text.slice(start, i + 1);
  }
  return null;
}

async function postViaEmbed(shortcode: string): Promise<MediaResult | null> {
  const res = await fetch(
    `https://www.instagram.com/p/${shortcode}/embed/captioned/`,
    {
      headers: { "User-Agent": UA, "Accept-Language": "en-US,en;q=0.9" },
      cache: "no-store",
    },
  );
  if (!res.ok) return null;
  const html = await res.text();

  const marker = html.indexOf("__additionalDataLoaded(");
  if (marker >= 0) {
    const brace = html.indexOf("{", marker);
    const json = brace >= 0 ? extractBalancedJson(html, brace) : null;
    if (json) {
      try {
        const media = (JSON.parse(json) as Obj).items?.[0];
        if (media) return fromProduct(media);
      } catch {
        /* fall through */
      }
    }
  }

  const ctx = html.match(/"contextJSON":"((?:[^"\\]|\\.)*)"/);
  if (ctx) {
    try {
      const context = JSON.parse(JSON.parse(`"${ctx[1]}"`)) as Obj;
      const media = context.gql_data?.shortcode_media;
      if (media) return fromGraphql(media);
    } catch {
      /* fall through */
    }
  }
  return null;
}

async function resolvePost(shortcode: string): Promise<MediaResult> {
  let rateLimited = false;
  for (const strategy of [postViaMobileApi, postViaGraphql, postViaEmbed]) {
    try {
      const result = await strategy(shortcode);
      if (result?.items.length) return result;
    } catch (err) {
      // Try the next strategy.
      if (err instanceof ExtractError && err.status === 429) rateLimited = true;
    }
  }
  if (rateLimited) throw RATE_LIMITED();
  throw new ExtractError(
    SESSION_ID
      ? "Couldn't fetch this post. It may be private, deleted, or Instagram is rate-limiting this server."
      : "Instagram refused anonymous access. Set IG_SESSIONID on the server, or the post may be private.",
    502,
    !SESSION_ID,
  );
}

// ---------------------------------------------------------------------------
// Profiles and stories

// Username -> user id never changes, so cache it for the process lifetime.
// web_profile_info is the most heavily rate-limited endpoint we call.
const userIdCache = new Map<string, string>();

async function profileInfo(username: string): Promise<Obj> {
  const cookie = sessionCookie();
  const data = await getJson(
    `https://i.instagram.com/api/v1/users/web_profile_info/?username=${encodeURIComponent(username)}`,
    baseHeaders(cookie ? { Cookie: cookie } : {}),
  );
  const user = data?.data?.user;
  if (!user) {
    throw new ExtractError("Couldn't find that account. Check the username, or it may be private.", 404, !SESSION_ID);
  }
  userIdCache.set(username.toLowerCase(), String(user.id));
  return user;
}

async function userIdFor(username: string): Promise<string> {
  return userIdCache.get(username.toLowerCase()) ?? String((await profileInfo(username)).id);
}

async function resolveProfile(username: string): Promise<MediaResult> {
  const user = await profileInfo(username);
  let avatar: string = user.profile_pic_url_hd ?? user.profile_pic_url;

  // The mobile API exposes the original-resolution avatar when logged in.
  const cookie = sessionCookie();
  if (cookie && user.id) {
    const info = await getJson(
      `https://i.instagram.com/api/v1/users/${user.id}/info/`,
      baseHeaders({ Cookie: cookie }),
    ).catch(() => null);
    avatar = info?.user?.hd_profile_pic_url_info?.url ?? avatar;
  }

  return {
    kind: "profile",
    author: {
      username: user.username,
      fullName: user.full_name,
      avatar: user.profile_pic_url,
    },
    caption: user.biography,
    items: [{ type: "image", url: avatar, thumbnail: avatar }],
  };
}

async function resolveReel(
  reelId: string,
  onlyItemId?: string,
): Promise<MediaResult> {
  const cookie = sessionCookie();
  if (!cookie) {
    throw new ExtractError(
      "Stories require IG_SESSIONID to be set on the server.",
      401,
      true,
    );
  }
  const data = await getJson(
    `https://i.instagram.com/api/v1/feed/reels_media/?reel_ids=${encodeURIComponent(reelId)}`,
    baseHeaders({ Cookie: cookie }),
  );
  const reel = data?.reels?.[reelId] ?? data?.reels_media?.[0];
  if (!reel?.items?.length) {
    throw new ExtractError(
      "No active stories found (they may have expired, or the account is private).",
      404,
    );
  }
  const items: Obj[] = onlyItemId
    ? reel.items.filter(
        (i: Obj) =>
          String(i.pk) === onlyItemId || String(i.id).startsWith(onlyItemId),
      )
    : reel.items;
  return {
    kind: "story",
    author: reel.user && {
      username: reel.user.username,
      fullName: reel.user.full_name,
      avatar: reel.user.profile_pic_url,
    },
    caption: reel.title,
    items: (items.length ? items : reel.items)
      .map(productItem)
      .filter((x: MediaItem | null): x is MediaItem => x !== null),
  };
}

// ---------------------------------------------------------------------------

const cache = new Map<string, { at: number; value: MediaResult }>();
const CACHE_TTL_MS = 5 * 60 * 1000;

export async function resolveInstagram(input: string): Promise<MediaResult> {
  const parsed = parseInstagramUrl(input);
  const key = JSON.stringify(parsed);
  const hit = cache.get(key);
  if (hit && Date.now() - hit.at < CACHE_TTL_MS) return hit.value;

  let value: MediaResult;
  switch (parsed.type) {
    case "post":
      value = await resolvePost(parsed.shortcode);
      break;
    case "profile":
      value = await resolveProfile(parsed.username);
      break;
    case "highlight":
      value = await resolveReel(`highlight:${parsed.highlightId}`);
      break;
    case "story": {
      value = await resolveReel(await userIdFor(parsed.username), parsed.storyId);
      break;
    }
  }

  cache.set(key, { at: Date.now(), value });
  if (cache.size > 500) cache.delete(cache.keys().next().value!);
  return value;
}

// Media hosts we are willing to proxy. Anything else is rejected so the proxy
// can't be used to fetch arbitrary URLs.
export function isAllowedMediaUrl(raw: string): URL | null {
  try {
    const url = new URL(raw);
    if (url.protocol !== "https:") return null;
    const host = url.hostname.toLowerCase();
    return host.endsWith(".cdninstagram.com") || host.endsWith(".fbcdn.net")
      ? url
      : null;
  } catch {
    return null;
  }
}

export const MEDIA_USER_AGENT = UA;
