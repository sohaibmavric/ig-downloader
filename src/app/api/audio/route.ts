import { spawn } from "node:child_process";
import type { NextRequest } from "next/server";
import ffmpegStatic from "ffmpeg-static";
import { isAllowedMediaUrl, MEDIA_USER_AGENT } from "@/lib/instagram";

// Extracts the audio track of an Instagram video and streams it back as MP3.

export const maxDuration = 120;

const FFMPEG = process.env.FFMPEG_PATH || ffmpegStatic || "ffmpeg";

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const target = isAllowedMediaUrl(params.get("url") ?? "");
  if (!target) {
    return new Response("Unsupported media URL", { status: 400 });
  }

  const ffmpeg = spawn(
    /*turbopackIgnore: true*/ FFMPEG,
    [
      "-hide_banner", "-loglevel", "error",
      "-user_agent", MEDIA_USER_AGENT,
      "-i", target.toString(),
      "-vn", "-codec:a", "libmp3lame", "-b:a", "192k",
      "-f", "mp3", "pipe:1",
    ],
    { stdio: ["ignore", "pipe", "pipe"] },
  );

  let stderr = "";
  ffmpeg.stderr.on("data", (chunk: Buffer) => {
    stderr += chunk.toString();
  });

  request.signal.addEventListener("abort", () => ffmpeg.kill("SIGKILL"));

  const body = new ReadableStream<Uint8Array>({
    start(controller) {
      ffmpeg.stdout.on("data", (chunk: Buffer) => controller.enqueue(new Uint8Array(chunk)));
      ffmpeg.on("close", (code) => {
        if (code === 0) controller.close();
        else controller.error(new Error(`ffmpeg exited with ${code}: ${stderr.slice(0, 500)}`));
      });
      ffmpeg.on("error", (err) => controller.error(err));
    },
    cancel() {
      ffmpeg.kill("SIGKILL");
    },
  });

  const filename = (params.get("filename") ?? "instagram-audio").replace(/[^\w.\- ]+/g, "").slice(0, 120) || "instagram-audio";
  return new Response(body, {
    headers: {
      "Content-Type": "audio/mpeg",
      "Content-Disposition": `${params.get("download") === "1" ? "attachment" : "inline"}; filename="${filename}.mp3"`,
      "Cache-Control": "no-store",
    },
  });
}
