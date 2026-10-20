// Tool pages. Each one is a separate landing page targeting its own search
// intent; the downloader itself auto-detects the link type on every page.

export type ToolId = "video" | "reels" | "photo" | "story" | "audio" | "profile";

export type Tool = {
  id: ToolId;
  path: string;
  label: string;
  /** Placeholder shown in the link field. */
  hint: string;
  /** One-line description shown under the link field. */
  about: string;
};

export const TOOLS: Tool[] = [
  { id: "video", path: "/", label: "Video", hint: "Paste a post or video link", about: "Feed videos and IGTV in original quality, as MP4." },
  { id: "reels", path: "/reels", label: "Reels", hint: "Paste a reel link", about: "Vertical reels with their original sound, as MP4." },
  { id: "photo", path: "/photo", label: "Photo", hint: "Paste a post link", about: "Single photos and every slide of a carousel, in full resolution." },
  { id: "story", path: "/story", label: "Story", hint: "Paste a story or highlight link", about: "Active stories and saved highlights from public accounts." },
  { id: "audio", path: "/audio", label: "Audio", hint: "Paste a reel or video link", about: "Extract the soundtrack of any video or reel as a 192 kbps MP3." },
  { id: "profile", path: "/profile", label: "Profile", hint: "Paste a profile link", about: "Profile pictures at the largest size Instagram stores." },
];

export const toolById = (id: ToolId) => TOOLS.find((t) => t.id === id)!;
