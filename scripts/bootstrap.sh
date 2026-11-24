#!/usr/bin/env bash
set -euo pipefail

mkdir -p public/data public/images src/context src/data src/components src/app database scripts

if command -v python3 >/dev/null 2>&1; then
  python3 scripts/sync_instagram.py
fi

echo "Bootstrap complete."