import type { ToolId } from "./tools";

export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "ol"; items: string[] }
  | { type: "ul"; items: string[] }
  | { type: "tip"; text: string };

export type Post = {
  slug: string;
  title: string;
  description: string;
  /** ISO date (YYYY-MM-DD). */
  published: string;
  updated?: string;
  readingMinutes: number;
  /** Tool page this guide promotes. */
  tool: ToolId;
  keywords: string[];
  body: Block[];
};

export const POSTS: Post[] = [
  {
    slug: "how-to-download-instagram-reels-with-audio",
    title: "How to Download Instagram Reels with Audio (iPhone, Android & PC)",
    description:
      "A step-by-step guide to saving Instagram Reels with their original sound on any device, plus fixes for reels that download silent or blurry.",
    published: "2026-10-20",
    readingMinutes: 6,
    tool: "reels",
    keywords: ["download instagram reels with audio", "save reels with sound", "instagram reels download iphone", "reels downloader"],
    body: [
      { type: "p", text: "Instagram's own Save button only bookmarks a reel inside the app. It doesn't put a file on your phone, and if the creator deletes the reel, your saved copy disappears with it. If you want a reel you can watch offline, keep in your camera roll, or drop into an editing app, you need the actual video file, sound included." },
      { type: "p", text: "This guide shows how to do that on every device using Snaplift, and how to deal with the most common problems." },
      { type: "h2", text: "Step 1: Copy the reel's link" },
      { type: "p", text: "Every reel has its own web address. To copy it in the Instagram app:" },
      { type: "ol", items: [
        "Open the reel you want to download.",
        "Tap the paper-plane Share icon below the reel (on some versions it's under the ··· menu).",
        "Tap Copy link. The link is now on your clipboard.",
      ] },
      { type: "p", text: "On a computer, open the reel on instagram.com and copy the address from the browser bar. It will look like instagram.com/reel/ followed by a short code." },
      { type: "h2", text: "Step 2: Paste it into Snaplift" },
      { type: "p", text: "Open the Reels downloader and paste the link into the box. There's no button to press: Snaplift starts fetching the reel as soon as the link is pasted, and a preview appears a second or two later with the video's resolution shown in the corner." },
      { type: "h2", text: "Step 3: Save the MP4" },
      { type: "p", text: "Tap Download MP4. The file includes the reel's original audio track exactly as Instagram stores it, so there's nothing extra to enable. Where the file ends up depends on your device:" },
      { type: "h3", text: "iPhone and iPad" },
      { type: "ol", items: [
        "In Safari, tap Download when asked. The video goes to the Files app, in the Downloads folder.",
        "Open Files → Downloads and tap the video.",
        "Tap the Share icon and choose Save Video to move it into the Photos app.",
      ] },
      { type: "h3", text: "Android" },
      { type: "p", text: "Chrome saves the reel straight to your Downloads folder. Most gallery apps pick it up automatically; if yours doesn't, open the Files app and look in Downloads." },
      { type: "h3", text: "Windows and Mac" },
      { type: "p", text: "The MP4 lands in your browser's download folder (usually Downloads). It plays in any modern video player and imports into editors such as Premiere, Final Cut, CapCut or DaVinci Resolve." },
      { type: "h2", text: "Only want the sound?" },
      { type: "p", text: "If you're after the song, voiceover or a trending sound rather than the video, use Extract MP3 on the same card. Snaplift converts the reel's audio track to a 192 kbps MP3 that plays in any music app." },
      { type: "h2", text: "Troubleshooting" },
      { type: "h3", text: "The downloaded reel has no sound" },
      { type: "p", text: "Check that your phone isn't on silent and that the media volume is up; iPhones mute video playback when the ring switch is off. If the reel itself had its audio removed by Instagram for copyright reasons, the file will be silent too, because there is no audio track to download." },
      { type: "h3", text: "The reel looks blurry" },
      { type: "p", text: "Snaplift always saves the highest-quality version Instagram has. If the creator uploaded a low-resolution clip, or Instagram only kept a compressed copy, that is the best version available. The resolution label on the preview tells you exactly what you'll get." },
      { type: "h3", text: "\"Couldn't fetch this post\"" },
      { type: "p", text: "The reel is private, deleted, or the link is incomplete. Copy it again using Share → Copy link rather than selecting text by hand." },
      { type: "h2", text: "Use downloads responsibly" },
      { type: "p", text: "Downloading a reel for personal, offline viewing is very different from re-uploading it. If you want to repost someone's reel, ask for permission first and credit them clearly." },
    ],
  },
  {
    slug: "how-to-download-instagram-carousel-photos",
    title: "How to Download All Photos from an Instagram Carousel",
    description:
      "Save every slide of a multi-photo Instagram post in full resolution, including carousels that mix photos and videos.",
    published: "2026-10-20",
    readingMinutes: 5,
    tool: "photo",
    keywords: ["download instagram carousel", "save all photos from instagram post", "instagram multiple photos download", "instagram photo downloader"],
    body: [
      { type: "p", text: "Carousel posts let creators share up to twenty photos and videos in one post. They're great for tutorials, recipes and photo dumps, and annoying to save, because screenshots crop each image and lose quality. Downloading the original files keeps every slide at full resolution." },
      { type: "h2", text: "How carousels work on Instagram" },
      { type: "p", text: "A carousel is a single post with one link, but each slide is stored as a separate image or video file. That's why some tools only grab the first slide. Snaplift reads the whole post and lists every slide individually." },
      { type: "h2", text: "Download a carousel step by step" },
      { type: "ol", items: [
        "In Instagram, open the carousel post and tap the Share icon, then Copy link.",
        "Open the Photo downloader and paste the link. The post loads automatically.",
        "Each slide appears as its own card, numbered in the same order as on Instagram.",
        "Tap Download JPG on the photos you want, or Download MP4 on video slides.",
      ] },
      { type: "tip", text: "You don't have to save the whole carousel. Scroll through the cards and download only the slides you need." },
      { type: "h2", text: "What resolution will I get?" },
      { type: "p", text: "Instagram stores feed photos at up to 1080 pixels wide, in square, portrait (4:5) or landscape shapes. Snaplift picks the largest version Instagram keeps, and the exact dimensions are shown on each card before you download, so you know what you're getting." },
      { type: "h2", text: "Carousels with videos" },
      { type: "p", text: "Mixed carousels are handled slide by slide. Video slides get a Download MP4 button and an Extract MP3 option; photo slides download as JPG." },
      { type: "h2", text: "Where the photos are saved" },
      { type: "ul", items: [
        "iPhone: Safari asks whether to download; files go to Files → Downloads. To add a photo to your library, open it in Files and choose Share → Save Image.",
        "Android: photos go to the Downloads folder and normally appear in your gallery.",
        "Computer: files go to your browser's download folder.",
      ] },
      { type: "h2", text: "Common questions" },
      { type: "h3", text: "Why do I only see one image?" },
      { type: "p", text: "The post has a single photo, or you pasted the link to one specific image from a profile grid. Copy the link from the post itself using Share → Copy link." },
      { type: "h3", text: "Can I download a carousel from a private account?" },
      { type: "p", text: "No. Snaplift only works with posts that anyone can see without following the account." },
      { type: "p", text: "As with any download, keep it personal: if you plan to share someone's photos, ask them first and give credit." },
    ],
  },
  {
    slug: "how-to-save-instagram-stories-and-highlights",
    title: "How to Save Instagram Stories and Highlights Before They Disappear",
    description:
      "Learn how to download Instagram stories and highlights from public accounts as MP4 or JPG, and what to do once a story has expired.",
    published: "2026-10-20",
    readingMinutes: 5,
    tool: "story",
    keywords: ["download instagram stories", "save instagram story", "instagram highlights download", "story saver"],
    body: [
      { type: "p", text: "Stories are built to vanish: they're visible for 24 hours and then gone, unless the creator pins them to a highlight on their profile. If there's a story you want to keep, whether it's your own or useful information from a public account, you need to save it while it's still live." },
      { type: "h2", text: "Saving your own stories" },
      { type: "p", text: "Instagram keeps an archive of your own stories (Profile → menu → Archive), so you can download them from the app at any time. Snaplift is useful when you need the original file in a different format, on another device, or from a public account that isn't yours." },
      { type: "h2", text: "Download a story from a public account" },
      { type: "ol", items: [
        "Open the story in Instagram, tap ··· or the Share icon, and choose Copy link.",
        "Alternatively, use the account's story address directly: instagram.com/stories/username/.",
        "Paste the link into the Story downloader.",
        "Every active story item appears with its own preview. Photos download as JPG, videos as MP4 with sound.",
      ] },
      { type: "tip", text: "A link to one specific story shows just that item. A link to the account's stories (without an ID at the end) shows everything they've posted in the last 24 hours." },
      { type: "h2", text: "Downloading highlights" },
      { type: "p", text: "Highlights are stories that a creator has saved permanently to their profile. They have their own links in the form instagram.com/stories/highlights/ followed by a number. Open the highlight, copy its link, and paste it into Snaplift to see every item in it." },
      { type: "h2", text: "What about expired stories?" },
      { type: "p", text: "Once a story's 24 hours are up, it's no longer available on Instagram unless it was added to a highlight, so no downloader can retrieve it. If a story matters to you, save it on the day it's posted." },
      { type: "h2", text: "Does the account see that I saved their story?" },
      { type: "p", text: "Snaplift fetches stories on its own servers rather than through your Instagram account, so the download itself isn't linked to you. Stories from private accounts can't be downloaded." },
      { type: "h2", text: "Troubleshooting" },
      { type: "ul", items: [
        "\"No active stories found\": the account hasn't posted a story in the last 24 hours, or the story was deleted.",
        "\"Couldn't find that account\": check the username in the link for typos.",
        "Rate-limit message: Instagram is temporarily limiting requests. Wait a few minutes and try again.",
      ] },
    ],
  },
  {
    slug: "how-to-convert-instagram-reels-to-mp3",
    title: "How to Convert Instagram Reels and Videos to MP3",
    description:
      "Extract the song, voiceover or sound from any Instagram reel or video as an MP3 file, with tips on quality and finding the original track.",
    published: "2026-10-20",
    readingMinutes: 5,
    tool: "audio",
    keywords: ["instagram to mp3", "reels to mp3", "download instagram audio", "instagram sound downloader", "extract audio from instagram video"],
    body: [
      { type: "p", text: "Sometimes the best part of a reel is the sound: a remix you can't find anywhere else, a voiceover, a podcast clip or a trending audio you want to use as a reference. Converting the reel to MP3 gives you a small audio file that plays in any music app, without the video." },
      { type: "h2", text: "Convert a reel to MP3 in three steps" },
      { type: "ol", items: [
        "Copy the reel's link in Instagram (Share → Copy link).",
        "Paste it into the Audio downloader.",
        "Tap Download MP3. The audio is converted and starts downloading straight away.",
      ] },
      { type: "p", text: "This works for reels, regular feed videos and video stories. On the other tool pages, the same option appears as Extract MP3 under the video download button." },
      { type: "h2", text: "What quality is the MP3?" },
      { type: "p", text: "Snaplift converts the video's original audio track to MP3 at 192 kbps. That's a good balance of quality and size for music and speech: a one-minute reel comes out at roughly 1.5 MB. The result can't be better than the audio Instagram stores, so a reel recorded with a phone microphone in a noisy room will still sound like that." },
      { type: "h2", text: "MP3 or MP4: which should I download?" },
      { type: "ul", items: [
        "MP3 if you only want to listen: smaller files, works in music players and as a ringtone source.",
        "MP4 if you need the video or want to keep the audio perfectly in sync for editing.",
      ] },
      { type: "h2", text: "Finding the original song" },
      { type: "p", text: "Many reels use licensed music from Instagram's audio library. If you like the song, tap the audio name at the bottom of the reel in Instagram to see the track and artist, then listen to the full version on a streaming service. That supports the artist and gets you the full-length, full-quality track." },
      { type: "h2", text: "A note on copyright" },
      { type: "p", text: "Converting a reel's sound for personal listening is one thing; using it in your own published videos or music is another. Licensed songs and creators' original audio are protected, so check the rights before you reuse anything publicly." },
    ],
  },
  {
    slug: "how-to-save-instagram-videos-to-iphone",
    title: "How to Save Instagram Videos to Your iPhone Camera Roll",
    description:
      "Download Instagram videos and reels on iPhone without installing an app, then move them from the Files app into Photos in a few taps.",
    published: "2026-10-20",
    readingMinutes: 4,
    tool: "video",
    keywords: ["save instagram video to iphone", "download instagram video iphone", "instagram video to camera roll", "instagram downloader iphone"],
    body: [
      { type: "p", text: "On iPhone, downloading anything from the web works a little differently from Android or a computer. Files go to the Files app first, not straight into Photos. Once you know the two extra taps, saving Instagram videos to your camera roll takes less than a minute, with no app to install." },
      { type: "h2", text: "What you need" },
      { type: "ul", items: [
        "iOS 13 or later (any iPhone from the last several years).",
        "Safari, or another browser that supports downloads.",
        "A link to a public Instagram post, reel or story.",
      ] },
      { type: "h2", text: "Download the video" },
      { type: "ol", items: [
        "In the Instagram app, open the video, tap the Share icon and choose Copy link.",
        "Open Safari and go to Snaplift.",
        "Tap the link box and choose Paste. The video loads automatically.",
        "Tap Download MP4, then Download in the pop-up that appears.",
      ] },
      { type: "p", text: "You'll see a small download indicator in Safari's address bar. When it finishes, the video is in the Files app." },
      { type: "h2", text: "Move it into the Photos app" },
      { type: "ol", items: [
        "Open the Files app and go to Downloads (or tap the download indicator in Safari and select the file).",
        "Tap the video to open it.",
        "Tap the Share icon in the bottom-left corner.",
        "Choose Save Video. It now appears in Photos, ready to share, edit or post.",
      ] },
      { type: "tip", text: "Add Snaplift to your Home Screen (Safari → Share → Add to Home Screen) so it opens like an app next time." },
      { type: "h2", text: "If the download doesn't start" },
      { type: "ul", items: [
        "Make sure you're using Safari; some in-app browsers (inside Instagram or other apps) block downloads. Open the page in Safari instead.",
        "Check you have enough free storage in Settings → General → iPhone Storage.",
        "If Safari shows the video playing instead of downloading, tap the Share icon and choose Save to Files.",
      ] },
      { type: "h2", text: "What about photos?" },
      { type: "p", text: "The process is the same for photos: tap Download JPG, open it in Files, then Share → Save Image. For posts with several photos, each one has its own download button." },
    ],
  },
  {
    slug: "how-to-view-instagram-profile-picture-full-size",
    title: "How to View an Instagram Profile Picture in Full Size",
    description:
      "Instagram only shows profile pictures as a tiny circle. Here's how to see and download any public account's profile photo in its largest size.",
    published: "2026-10-20",
    readingMinutes: 3,
    tool: "profile",
    keywords: ["view instagram profile picture full size", "instagram dp download", "zoom instagram profile picture", "instagram pfp viewer"],
    body: [
      { type: "p", text: "Instagram displays profile pictures as a small circle and doesn't let you tap to enlarge them. That makes it hard to tell whether an account is who it claims to be, or to see a photo properly. The full-size image does exist on Instagram's servers. You just need a way to load it." },
      { type: "h2", text: "See a profile picture in full size" },
      { type: "ol", items: [
        "Copy the profile's link. In the app, open the profile, tap ··· and choose Copy profile URL. On the web, copy the address, for example instagram.com/username.",
        "Paste it into the Profile Picture downloader.",
        "The profile picture appears at the largest size Instagram stores, uncropped and as a square.",
        "Tap Download JPG to save it.",
      ] },
      { type: "h2", text: "How big is the full-size image?" },
      { type: "p", text: "That depends on what the account uploaded. Instagram keeps profile photos at up to around 1080 pixels square; older accounts or small uploads may be lower. Either way, it's far larger than the circle shown in the app." },
      { type: "h2", text: "Does the person know I viewed their picture?" },
      { type: "p", text: "No. Instagram doesn't notify anyone when their profile is visited, and Snaplift loads the picture without using your Instagram account." },
      { type: "h2", text: "Using profile pictures responsibly" },
      { type: "p", text: "Viewing a profile picture at full size is useful for checking whether an account is genuine. Reusing someone's photo, such as setting it as your own avatar or posting it elsewhere, can violate their rights and Instagram's rules, so keep downloads personal." },
    ],
  },
];

export const postBySlug = (slug: string) => POSTS.find((p) => p.slug === slug);
export const formatDate = (iso: string) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" });
export const postsForTool = (tool: ToolId) => POSTS.filter((p) => p.tool === tool);
