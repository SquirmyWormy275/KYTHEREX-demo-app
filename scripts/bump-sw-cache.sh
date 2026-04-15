#!/usr/bin/env bash
# Pre-commit hook: if index.html is staged, bump sw.js cache version.
# Prevents installed PWAs from serving stale index.html after deploy.
# See docs/solutions/configuration-issues/pwa-service-worker-cache-staleness.md

set -e

# Only run if index.html is staged
if ! git diff --cached --name-only | grep -qx "index.html"; then
  exit 0
fi

SW_FILE="sw.js"
[ -f "$SW_FILE" ] || exit 0

# Extract current version (e.g. kytherex-demo-v1 -> 1)
current=$(grep -oE "kytherex-demo-v[0-9]+" "$SW_FILE" | head -1 | sed 's/kytherex-demo-v//')
if [ -z "$current" ]; then
  echo "bump-sw-cache: could not find kytherex-demo-vN in $SW_FILE; skipping"
  exit 0
fi

next=$((current + 1))
old="kytherex-demo-v${current}"
new="kytherex-demo-v${next}"

# Cross-platform in-place sed (works on Windows Git Bash, macOS, Linux)
tmp=$(mktemp)
sed "s/${old}/${new}/g" "$SW_FILE" > "$tmp"
mv "$tmp" "$SW_FILE"

git add "$SW_FILE"
echo "bump-sw-cache: $old -> $new (index.html changed)"
