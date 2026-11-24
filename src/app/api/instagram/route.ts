import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

export const dynamic = "force-dynamic";

export async function GET() {
  const token = process.env.IG_ACCESS_TOKEN?.trim();

  if (token) {
    try {
      const fields =
        "id,caption,media_type,media_url,thumbnail_url,permalink,timestamp";
      const url = `https://graph.instagram.com/me/media?fields=${fields}&access_token=${encodeURIComponent(
        token
      )}`;

      const res = await fetch(url, { cache: "no-store" });
      if (res.ok) {
        const json = await res.json();
        const items = (json.data || [])
          .filter((post: { media_type?: string }) =>
            ["IMAGE", "CAROUSEL_ALBUM", "VIDEO"].includes(post.media_type || "")
          )
          .slice(0, 12)
          .map(
            (
              post: {
                id: string;
                caption?: string;
                media_type?: string;
                media_url?: string;
                thumbnail_url?: string;
                permalink?: string;
                timestamp?: string;
              },
              idx: number
            ) => ({
              id: post.id,
              code: `IG_LIVE_0${idx + 1} // 35MM`,
              title_fr: `Publication #${idx + 1}`,
              title_en: `Post #${idx + 1}`,
              caption_fr: post.caption || "Nouvelle publication sur @medshashin.",
              caption_en: post.caption || "New post on @medshashin.",
              image:
                post.media_type === "VIDEO"
                  ? post.thumbnail_url || post.media_url || ""
                  : post.media_url || "",
              permalink: post.permalink || "https://instagram.com/medshashin",
              location: "Instagram @medshashin",
              tag: "IG LIVE SYNC",
              camera: "35mm / Mobile",
              aperture: "f/2.8",
              shutter: "1/250s",
              iso: "ISO 400",
              timestamp: post.timestamp || "",
            })
          );

        return NextResponse.json({
          source: "instagram_graph_api",
          syncedAt: new Date().toISOString(),
          posts: items,
        });
      }
    } catch {
      // Fallback to local JSON below
    }
  }

  try {
    const filePath = path.join(process.cwd(), "public", "data", "medshashin.json");
    const raw = await fs.readFile(filePath, "utf-8");
    const parsed = JSON.parse(raw);
    return NextResponse.json({
      source: "local_json_feed",
      syncedAt: parsed.synced_at || new Date().toISOString(),
      posts: parsed.posts || [],
    });
  } catch {
    return NextResponse.json({
      source: "empty",
      syncedAt: new Date().toISOString(),
      posts: [],
    });
  }
}