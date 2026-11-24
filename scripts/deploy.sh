#!/usr/bin/env bash
set -euo pipefail

echo "==> Running @medshashin feed sync..."
if command -v python3 >/dev/null 2>&1; then
  python3 scripts/sync_instagram.py
fi

echo "==> Building Next.js production bundle..."
npm run build

echo "==> Build complete and ready for GitHub / Vercel."