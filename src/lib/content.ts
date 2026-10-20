import type { ToolId } from "./tools";

export type Faq = { q: string; a: string };

export type PageContent = {
  /** <title> (the layout template appends the site name, except on the home page). */
  title: string;
  description: string;
  keywords: string[];
  h1: string;
  subtitle: string;
  features: { title: string; body: string }[];
  /** Longer explanatory copy, one string per paragraph. */
  article: { heading: string; paragraphs: string[] };
  /** Additional in-depth sections shown after the article. */
  sections?: { heading: string; paragraphs: string[]; bullets?: string[] }[];
  faqs: Faq[];
};

export const STEPS = [
  { title: "Copy the link", body: "In Instagram, tap ··· or Share on a post, reel, story or profile and choose Copy link." },
  { title: "Paste it here", body: "Paste the link into the box. Snaplift detects the content type and loads it instantly." },
  { title: "Save the file", body: "Preview the media, then download the original MP4 or JPG, or extract the audio as MP3." },
];

const SHARED_FAQS: Faq[] = [
  { q: "Is Snaplift free?", a: "Yes. Every tool is free to use, with no sign-up and no daily limit for normal use." },
  { q: "Do I need to log in to Instagram?", a: "No. You only paste a link. Snaplift never asks for your Instagram username or password." },
  { q: "Can I download from private accounts?", a: "No. Snaplift only works with content that is publicly visible on Instagram." },
  { q: "Do you store the files I download?", a: "No. Media is streamed from Instagram to your browser and is never saved on our servers." },
];

export const CONTENT: Record<ToolId, PageContent> = {
  video: {
    title: "Instagram Video Downloader – Save Videos & Reels in HD",
    description:
      "Download Instagram videos, reels and photos in original HD quality. Paste a link and save MP4 or MP3 in seconds. Free, no login, no watermark.",
    keywords: ["instagram video downloader", "download instagram video", "instagram downloader", "save instagram video", "ig video download", "instagram mp4"],
    h1: "Instagram Video Downloader",
    subtitle: "Paste a link and save Instagram videos, reels and photos in original quality. No app, no login, no watermark.",
    features: [
      { title: "Original quality", body: "Files come straight from Instagram's servers at the highest resolution available, with nothing re-encoded." },
      { title: "Every format", body: "Videos, reels, photos, carousels, stories, profile pictures and audio, all from one box." },
      { title: "Works everywhere", body: "iPhone, Android, Mac, Windows or tablet. It runs in the browser, so there's nothing to install." },
      { title: "Private by design", body: "No account, no tracking of what you download, and no files kept on our servers." },
    ],
    article: {
      heading: "Download Instagram videos without an app",
      paragraphs: [
        "Instagram lets you save posts to a collection, but not to your device. Snaplift fills that gap: paste the link of any public video and you get the original MP4 file, ready to watch offline, back up, or use in your own edits.",
        "The downloader detects the link type automatically, so the same box handles feed videos, reels, carousels, stories and profile pictures. Carousels show every slide separately, and each video can also be converted to MP3 if you only need the sound.",
        "Please only download content you own or have permission to use, and credit creators when you share their work.",
      ],
    },
    sections: [
      {
        heading: "What you can download",
        paragraphs: ["Snaplift works with every type of public Instagram content. Paste any of these links and the right download options appear automatically:"],
        bullets: [
          "Feed videos and IGTV: saved as MP4 at the original resolution.",
          "Reels: vertical MP4 with the original sound.",
          "Photos: full-size JPG, including every slide of carousel posts.",
          "Stories and highlights: photos and videos from public accounts, while they're live or saved to a highlight.",
          "Profile pictures: the largest version Instagram stores, far bigger than the circle in the app.",
          "Audio: the soundtrack of any video or reel, converted to MP3.",
        ],
      },
      {
        heading: "Download Instagram videos on iPhone, Android and PC",
        paragraphs: [
          "Snaplift runs entirely in your browser, so it works the same way on every device and there's nothing to install.",
          "On iPhone and iPad, use Safari: downloads go to the Files app (Downloads folder), and from there you can tap Share → Save Video to add them to Photos. On Android, files go straight to your Downloads folder and appear in your gallery. On Windows, Mac, Linux and Chromebook, they land in your browser's download folder.",
          "You can add Snaplift to your phone's home screen from the browser's share menu, so it opens like an app whenever you need it.",
        ],
      },
      {
        heading: "Original quality, no watermark",
        paragraphs: [
          "Many downloaders re-encode videos or stamp their logo on them. Snaplift doesn't: it hands you the exact file Instagram serves, at the highest resolution available for that post, up to 1080p. The resolution is shown on every preview, so you know what you're getting before you save.",
          "The only time anything is converted is when you choose MP3, where the audio track is encoded at 192 kbps.",
        ],
      },
      {
        heading: "Is it legal to download Instagram videos?",
        paragraphs: [
          "Saving public content for personal, offline viewing is generally treated very differently from redistributing it. The content still belongs to its creator, so reposting, selling or claiming it as your own without permission can infringe their copyright and break Instagram's rules.",
          "A good rule of thumb: download freely for yourself, and ask before you share. When you do repost with permission, credit the original creator.",
        ],
      },
    ],
    faqs: [
      { q: "How do I download an Instagram video?", a: "Copy the video's link from Instagram (Share → Copy link), paste it into the box above and press Download MP4 on the preview that appears." },
      { q: "What quality are the downloads?", a: "You get the same file Instagram serves, at the highest resolution the creator uploaded, up to 1080p. Nothing is compressed or watermarked." },
      { q: "Does it work on iPhone?", a: "Yes. Open Snaplift in Safari, paste the link and tap Download. The file saves to the Files app, and you can move it to Photos from there." },
      ...SHARED_FAQS,
    ],
  },
  reels: {
    title: "Instagram Reels Downloader – Download Reels with Audio",
    description:
      "Download Instagram Reels in HD with the original sound. Paste a reel link to save it as MP4 on iPhone, Android or PC. Free and no watermark.",
    keywords: ["instagram reels downloader", "download instagram reels", "reels download", "save reels with audio", "instagram reel to mp4"],
    h1: "Instagram Reels Downloader",
    subtitle: "Save any public reel in HD with its original audio, as an MP4 that plays everywhere.",
    features: [
      { title: "Sound included", body: "Reels download with their original audio track, perfectly in sync." },
      { title: "Full vertical quality", body: "The 9:16 video is saved at the resolution the creator uploaded, up to 1080×1920." },
      { title: "Audio only option", body: "Need just the music or voiceover? Extract the reel's soundtrack as MP3 in one tap." },
      { title: "No watermark", body: "Snaplift adds no logo or branding to the file." },
    ],
    article: {
      heading: "Save reels for offline viewing and inspiration",
      paragraphs: [
        "Reels disappear into the feed fast. Downloading the ones you care about lets you watch them offline, keep a library of ideas for your own content, or archive your own reels in their original quality.",
        "Paste the reel link and Snaplift shows a preview with the video's real resolution. Download the MP4 directly, or use Extract MP3 to keep only the audio.",
      ],
    },
    faqs: [
      { q: "How do I download a reel with sound?", a: "Copy the reel link, paste it above and tap Download MP4. Audio is always included in the file." },
      { q: "Can I download someone else's reel?", a: "You can download public reels for personal use. Ask the creator for permission before reposting, and always give credit." },
      { q: "Why is my reel low resolution?", a: "Snaplift saves the best version Instagram has. If the creator uploaded a low-resolution clip, that is the highest quality available." },
      ...SHARED_FAQS,
    ],
  },
  photo: {
    title: "Instagram Photo Downloader – Save Photos & Carousels in HD",
    description:
      "Download Instagram photos and every slide of carousel posts in full resolution. Paste a post link and save JPG images instantly. Free, no login.",
    keywords: ["instagram photo downloader", "download instagram photos", "instagram picture download", "instagram carousel downloader", "save instagram image"],
    h1: "Instagram Photo Downloader",
    subtitle: "Save single photos or every slide of a carousel in full resolution, as JPG.",
    features: [
      { title: "Full resolution", body: "Images are saved at the largest size Instagram stores, usually 1080 px wide or more." },
      { title: "Whole carousels", body: "Multi-photo posts are split into separate slides, so you can save just the ones you want." },
      { title: "Mixed posts", body: "Carousels that mix photos and videos work too; each slide gets the right download button." },
      { title: "Clean files", body: "No watermark, no cropping and no extra compression." },
    ],
    article: {
      heading: "Download Instagram pictures in full size",
      paragraphs: [
        "Screenshots crop and compress photos. Snaplift downloads the actual image file from Instagram instead, so you keep the full resolution and colours of the original post.",
        "For carousel posts, every slide is listed with its own preview and download button, numbered in the same order as on Instagram.",
      ],
    },
    faqs: [
      { q: "How do I download all photos from a carousel?", a: "Paste the post link. Every slide appears as its own card; tap Download JPG on each one you want." },
      { q: "What size are downloaded photos?", a: "The largest version Instagram has, typically 1080 px wide; the exact dimensions are shown on each preview." },
      ...SHARED_FAQS,
    ],
  },
  story: {
    title: "Instagram Story Downloader – Save Stories & Highlights",
    description:
      "Download Instagram stories and highlights from public accounts as MP4 or JPG. Paste a story or highlight link to save it before it disappears.",
    keywords: ["instagram story downloader", "download instagram stories", "instagram highlights downloader", "save instagram story", "story saver"],
    h1: "Instagram Story Downloader",
    subtitle: "Save stories and highlights from public accounts before they disappear.",
    features: [
      { title: "Stories and highlights", body: "Works with active 24-hour stories and with highlights saved on a profile." },
      { title: "Photos and videos", body: "Video stories save as MP4 with sound; photo stories save as JPG." },
      { title: "Single or all", body: "Paste a link to one story to get just that item, or a profile's story link to see all active stories." },
      { title: "Original quality", body: "Stories are saved exactly as they were uploaded." },
    ],
    article: {
      heading: "Keep stories after 24 hours",
      paragraphs: [
        "Stories vanish after a day. Snaplift lets you keep a copy of public stories and highlights, which is useful for saving your own stories in original quality or keeping information you want to refer back to.",
        "Paste a story link (instagram.com/stories/username/…) or a highlight link (instagram.com/stories/highlights/…). Every item in the story appears with its own download button.",
      ],
    },
    faqs: [
      { q: "How do I get a story link?", a: "Open the story in Instagram, tap ··· or the share icon and choose Copy link. You can also use instagram.com/stories/username/." },
      { q: "Can I download expired stories?", a: "Only if they were saved to a highlight. Expired stories that aren't in a highlight are no longer available on Instagram." },
      { q: "Does the account know I downloaded their story?", a: "Snaplift fetches stories on its own servers, not from your Instagram account." },
      ...SHARED_FAQS,
    ],
  },
  audio: {
    title: "Instagram Audio Downloader – Convert Reels to MP3",
    description:
      "Extract audio from Instagram reels and videos as high-quality MP3. Paste a link to download the song, sound or voiceover in seconds. Free, no app.",
    keywords: ["instagram audio downloader", "instagram to mp3", "reels to mp3", "download instagram music", "instagram sound downloader"],
    h1: "Instagram Audio Downloader",
    subtitle: "Turn any reel or video into an MP3 and keep just the sound.",
    features: [
      { title: "192 kbps MP3", body: "Audio is converted to a widely compatible MP3 at 192 kbps." },
      { title: "Any video", body: "Works with reels, feed videos and video stories." },
      { title: "Video too", body: "Changed your mind? The full MP4 is one tap away on the same card." },
      { title: "Fast conversion", body: "The MP3 starts downloading straight away while it's being converted." },
    ],
    article: {
      heading: "Download the sound from Instagram reels",
      paragraphs: [
        "Heard a song, voiceover or sound you want to keep? Paste the reel link and Snaplift converts its audio track to MP3, ready for any music player or editing app.",
        "Many reels use licensed music. Downloads are for personal use; check the rights before using a sound in your own published work.",
      ],
    },
    faqs: [
      { q: "How do I convert a reel to MP3?", a: "Paste the reel link above and tap Download MP3 on the preview. The audio is converted and downloaded straight away." },
      { q: "What audio quality do I get?", a: "MP3 at 192 kbps, converted from the original audio track of the video." },
      ...SHARED_FAQS,
    ],
  },
  profile: {
    title: "Instagram Profile Picture Downloader – View DP in Full Size",
    description:
      "View and download Instagram profile pictures in full size and HD. Paste a profile link to save the DP of any public account. Free and anonymous.",
    keywords: ["instagram profile picture downloader", "instagram dp download", "view instagram profile picture full size", "insta dp viewer", "instagram pfp downloader"],
    h1: "Instagram Profile Picture Downloader",
    subtitle: "See and save any public profile picture at full size, not the tiny circle.",
    features: [
      { title: "Full size", body: "Get the largest version of the profile picture that Instagram stores." },
      { title: "Just a link", body: "Paste instagram.com/username; no need to follow the account." },
      { title: "JPG download", body: "Saves as a standard JPG that opens anywhere." },
      { title: "Anonymous", body: "Viewing a profile picture here doesn't notify the account." },
    ],
    article: {
      heading: "View Instagram profile pictures in HD",
      paragraphs: [
        "Instagram only shows profile pictures as a small circle and doesn't let you zoom in. Snaplift loads the full-size image so you can actually see it, and save it if you need to.",
      ],
    },
    faqs: [
      { q: "How do I see an Instagram profile picture in full size?", a: "Paste the profile link (instagram.com/username) above. The largest available version of the picture appears with a download button." },
      ...SHARED_FAQS,
    ],
  },
};
