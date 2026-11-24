import json
import os
from datetime import datetime, timezone
from pathlib import Path
from urllib.request import Request, urlopen


def build_medshashin_feed(output_file: str = "public/data/medshashin.json") -> None:
    """
    Generates a structured JSON feed for @medshashin.
    If IG_ACCESS_TOKEN is configured in environment variables, fetches live media
    from the Instagram Graph API; otherwise writes a clean local fallback feed.
    """
    target = Path(output_file)
    target.parent.mkdir(parents=True, exist_ok=True)

    token = os.getenv("IG_ACCESS_TOKEN", "").strip()
    posts = []

    if token:
        endpoint = (
            "https://graph.instagram.com/me/media"
            f"?fields=id,caption,media_type,media_url,permalink,timestamp&access_token={token}"
        )
        req = Request(endpoint, headers={"User-Agent": "med-portfolio-sync/1.0"})
        with urlopen(req, timeout=15) as resp:
            raw = json.loads(resp.read().decode("utf-8"))
            for idx, item in enumerate(raw.get("data", [])[:12], start=1):
                if item.get("media_type") in {"IMAGE", "CAROUSEL_ALBUM"}:
                    caption = (item.get("caption") or "").strip()
                    posts.append(
                        {
                            "id": item.get("id", f"ig-{idx}"),
                            "title_fr": f"Capture #{idx:02d}",
                            "title_en": f"Frame #{idx:02d}",
                            "caption_fr": caption or "Archive visuelle @medshashin.",
                            "caption_en": caption or "Visual archive @medshashin.",
                            "image": item.get("media_url", ""),
                            "permalink": item.get("permalink", "https://instagram.com/medshashin"),
                            "location": "Morocco",
                            "tag": "IG GRAPH SYNC",
                            "camera": "35mm / Compact Digital",
                            "aperture": "f/2.8",
                            "shutter": "1/250s",
                            "iso": "ISO 400",
                        }
                    )

    payload = {
        "account": "medshashin",
        "profile_url": "https://instagram.com/medshashin",
        "synced_at": datetime.now(timezone.utc).isoformat(),
        "mode": "graph_api" if token else "local_ready",
        "posts": posts,
    }

    target.write_text(json.dumps(payload, indent=2, ensure_ascii=False), encoding="utf-8")
    print(f"[OK] Synced {len(posts)} posts -> {target}")


if __name__ == "__main__":
    build_medshashin_feed()