#!/usr/bin/env bash
# Cross-platform dev runner (works on Windows Git Bash where `make` is absent).
# Usage: ./scripts/dev.sh <serve|hooks|check-fsot>
set -e

cmd="${1:-serve}"
port="${PORT:-8000}"

case "$cmd" in
  serve)
    echo "Serving demo at http://localhost:$port/"
    python -m http.server "$port"
    ;;
  hooks)
    bash scripts/install-hooks.sh
    ;;
  check-fsot)
    echo "Checking hardcoded financial numbers outside FSOT block..."
    matches=$(grep -nE '\$0\.(25|50|75)|10-25x|\$116K|\$290K|\$12,500' index.html | grep -v "FSOT = " || true)
    non_fsot=$(echo "$matches" | awk -F: '$1 < 98 || $1 > 105')
    if [ -n "$non_fsot" ]; then
      echo "DRIFT detected outside FSOT block:"
      echo "$non_fsot"
      exit 1
    fi
    echo "OK: no drift detected"
    ;;
  *)
    echo "Usage: $0 <serve|hooks|check-fsot>"
    exit 1
    ;;
esac
