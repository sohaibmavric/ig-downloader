"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import type { MediaItem, PublicMediaResult as MediaResult } from "@/lib/instagram";
import { TOOLS, toolById, type ToolId } from "@/lib/tools";

const focusRing = "outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background";

const mediaUrl = (url: string, download?: string) =>
  `/api/media?url=${encodeURIComponent(url)}${download ? `&download=1&filename=${encodeURIComponent(download)}` : ""}`;

const audioUrl = (url: string, filename: string) =>
  `/api/audio?url=${encodeURIComponent(url)}&filename=${encodeURIComponent(filename)}&download=1`;

const isInstagramUrl = (value: string) => /^https?:\/\/([\w-]+\.)?(instagram\.com|instagr\.am)\/\S+/i.test(value);

function baseName(result: MediaResult, index: number) {
  const id = `instagram-${result.shortcode ?? result.kind}`;
  return result.items.length > 1 ? `${id}-${index + 1}` : id;
}

export default function Downloader({ tool }: { tool: ToolId }) {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<MediaResult | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  const abortRef = useRef<AbortController | null>(null);
  const lastSubmitted = useRef("");

  const submit = useCallback(async (link: string) => {
    const value = link.trim();
    if (!value) return;
    // A newer link replaces any request still in flight.
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;
    lastSubmitted.current = value;
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetch(`/api/resolve?url=${encodeURIComponent(value)}`, { signal: controller.signal });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Something went wrong.");
      setResult(data as MediaResult);
      requestAnimationFrame(() => resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" }));
    } catch (err) {
      if (controller.signal.aborted) return;
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      if (abortRef.current === controller) setLoading(false);
    }
  }, []);

  // Auto-load once the field holds a complete Instagram link (typed or dropped).
  useEffect(() => {
    const value = input.trim();
    if (!isInstagramUrl(value) || value === lastSubmitted.current) return;
    const timer = setTimeout(() => submit(value), 500);
    return () => clearTimeout(timer);
  }, [input, submit]);

  // Pasting a link loads it immediately.
  const onPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const text = e.clipboardData.getData("text").trim();
    if (!isInstagramUrl(text)) return;
    e.preventDefault();
    setInput(text);
    submit(text);
  };

  // Support deep links: /?url=https://www.instagram.com/reel/...
  useEffect(() => {
    const link = new URLSearchParams(window.location.search).get("url");
    if (!link) return;
    const timer = setTimeout(() => {
      setInput(link);
      submit(link);
    }, 0);
    return () => clearTimeout(timer);
  }, [submit]);

  const paste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setInput(text);
      submit(text);
    } catch {
      setError("Clipboard access was blocked. Paste the link manually.");
    }
  };

  const clear = () => {
    abortRef.current?.abort();
    abortRef.current = null;
    lastSubmitted.current = "";
    setLoading(false);
    setInput("");
    setResult(null);
    setError(null);
    inputRef.current?.focus();
  };

  const current = toolById(tool);

  return (
    <div className="w-full">
      <nav
        aria-label="Downloader type"
        className="mx-auto mb-4 grid max-w-md grid-cols-3 gap-1 rounded-2xl bg-surface-strong p-1 sm:flex sm:w-fit sm:max-w-none sm:rounded-full"
      >
        {TOOLS.map((t) => (
          <Link
            key={t.id}
            href={t.path}
            aria-current={tool === t.id ? "page" : undefined}
            className={`rounded-xl px-4 py-2 text-center text-sm font-medium transition-colors sm:rounded-full ${focusRing} ${
              tool === t.id ? "bg-surface text-foreground shadow-sm" : "text-muted hover:text-foreground"
            }`}
          >
            {t.label}
          </Link>
        ))}
      </nav>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          submit(input);
        }}
        aria-busy={loading}
        className="relative mx-auto flex max-w-2xl items-center overflow-hidden rounded-2xl border border-line bg-surface p-2 shadow-sm transition focus-within:border-accent focus-within:ring-4 focus-within:ring-accent/15"
      >
        {loading && (
          <div role="progressbar" aria-label="Loading media" className="absolute inset-x-0 bottom-0 h-1 overflow-hidden bg-accent/15">
            <div className="loader-bar h-full w-1/3 rounded-full bg-accent" />
          </div>
        )}
        <div className="flex min-w-0 flex-1 items-center">
          <svg className="ml-3 shrink-0 text-muted" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7" />
            <path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7" />
          </svg>
          <input
            ref={inputRef}
            type="url"
            required
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onPaste={onPaste}
            placeholder={`${current.hint}…`}
            aria-label="Instagram link"
            className="min-w-0 flex-1 bg-transparent px-3 py-3 text-base outline-none placeholder:text-muted"
          />
          {input ? (
            <button
              type="button"
              onClick={clear}
              aria-label="Clear link"
              className={`mr-1 grid h-8 w-8 shrink-0 place-items-center rounded-full text-muted hover:bg-surface-strong hover:text-foreground ${focusRing}`}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden>
                <path d="M6 6l12 12M18 6 6 18" />
              </svg>
            </button>
          ) : (
            <button
              type="button"
              onClick={paste}
              className={`mr-1 shrink-0 rounded-lg px-3 py-1.5 text-sm font-medium text-muted hover:bg-surface-strong hover:text-foreground ${focusRing}`}
            >
              Paste
            </button>
          )}
        </div>
      </form>

      <p className="mx-auto mt-3 max-w-2xl text-center text-sm text-muted">{current.about}</p>

      <div ref={resultsRef} aria-live="polite" className="scroll-mt-6">
        {error && (
          <div role="alert" className="mx-auto mt-6 flex max-w-2xl items-start gap-3 rounded-xl border border-danger/30 bg-danger/10 px-4 py-3 text-sm text-danger">
            <svg className="mt-0.5 shrink-0" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden>
              <circle cx="12" cy="12" r="9" />
              <path d="M12 8v5M12 16.5v.01" />
            </svg>
            <span>{error}</span>
          </div>
        )}

        {loading && (
          <div className="mx-auto mt-8 max-w-sm">
            <div className="aspect-[9/14] animate-pulse rounded-2xl bg-surface-strong" />
          </div>
        )}

        {result && <Results result={result} audioFirst={tool === "audio"} />}
      </div>
    </div>
  );
}

function Results({ result, audioFirst }: { result: MediaResult; audioFirst: boolean }) {
  const multiple = result.items.length > 1;
  return (
    <section className={`mx-auto mt-8 ${multiple ? "max-w-3xl" : "max-w-sm"}`}>
      {multiple && (
        <p className="mb-3 text-center text-sm font-medium text-muted">{result.items.length} items</p>
      )}
      <div className={`grid gap-4 ${multiple ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1"}`}>
        {result.items.map((item, i) => (
          <MediaCard key={item.url} item={item} name={baseName(result, i)} audioFirst={audioFirst} index={multiple ? i + 1 : undefined} />
        ))}
      </div>
    </section>
  );
}

function qualityLabel(item: MediaItem) {
  if (!item.width || !item.height) return null;
  const short = Math.min(item.width, item.height);
  if (item.type === "image") return `${item.width}×${item.height}`;
  return short >= 1080 ? "1080p" : short >= 720 ? "720p" : `${short}p`;
}

function MediaCard({ item, name, audioFirst, index }: { item: MediaItem; name: string; audioFirst: boolean; index?: number }) {
  const isVideo = item.type === "video";
  const ext = isVideo ? "mp4" : "jpg";
  const quality = qualityLabel(item);
  // Use the media's own aspect ratio, clamped so very tall or wide media still fits.
  const ratio = item.width && item.height ? Math.min(Math.max(item.width / item.height, 9 / 16), 16 / 9) : 4 / 5;

  return (
    <article className="overflow-hidden rounded-2xl border border-line bg-surface shadow-sm">
      <div className="relative bg-black" style={{ aspectRatio: ratio }}>
        {isVideo ? (
          <video
            controls
            preload="metadata"
            playsInline
            poster={item.thumbnail ? mediaUrl(item.thumbnail) : undefined}
            className="absolute inset-0 h-full w-full object-contain"
          >
            <source src={mediaUrl(item.url)} type="video/mp4" />
          </video>
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={mediaUrl(item.url)} alt="" className="absolute inset-0 h-full w-full object-contain" />
        )}
        <div className="pointer-events-none absolute left-2 top-2 flex gap-1.5">
          {index && <Chip>{index}</Chip>}
          <Chip>{isVideo ? "Video" : "Photo"}</Chip>
          {quality && <Chip>{quality}</Chip>}
        </div>
      </div>
      <div className="grid gap-2 p-3">
        {isVideo && audioFirst ? (
          <>
            <a href={audioUrl(item.url, name)} className={`${primaryBtn} ${focusRing}`}>
              <DownloadIcon /> Download MP3
            </a>
            <a href={mediaUrl(item.url, `${name}.${ext}`)} className={`${secondaryBtn} ${focusRing}`}>
              Download MP4
            </a>
          </>
        ) : (
          <>
            <a href={mediaUrl(item.url, `${name}.${ext}`)} className={`${primaryBtn} ${focusRing}`}>
              <DownloadIcon /> Download {isVideo ? "MP4" : "JPG"}
            </a>
            {isVideo && (
              <a href={audioUrl(item.url, name)} className={`${secondaryBtn} ${focusRing}`}>
                <MusicIcon /> Extract MP3
              </a>
            )}
          </>
        )}
      </div>
    </article>
  );
}

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-md bg-black/60 px-1.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-white backdrop-blur-sm">
      {children}
    </span>
  );
}

function DownloadIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M12 4v11m0 0-4.5-4.5M12 15l4.5-4.5M5 20h14" />
    </svg>
  );
}

function MusicIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M9 18V5l11-2v13" />
      <circle cx="6" cy="18" r="3" />
      <circle cx="17" cy="16" r="3" />
    </svg>
  );
}

const primaryBtn =
  "flex items-center justify-center gap-2 rounded-xl bg-accent px-4 py-2.5 text-sm font-semibold text-white transition hover:brightness-110";
const secondaryBtn =
  "flex items-center justify-center gap-2 rounded-xl border border-line bg-surface-strong px-4 py-2.5 text-sm font-medium transition hover:border-muted/40";
