---
type: bug
problem_type: configuration-issue
severity: medium
symptoms:
  - "Updated index.html does not appear on installed PWA after deploy"
  - "Users see stale pricing/ROI numbers even after a fresh deploy"
tags:
  - "pwa"
  - "service-worker"
  - "deployment"
confidence: medium
created: 2026-04-15
source: "knowledge-seed from CLAUDE.md + PWA conversion (43b8db3)"
---

# PWA Service Worker Can Serve Stale Demo to Field Users

## Problem
The demo is installed as a PWA on sales phones. A service worker (`sw.js`) caches `index.html` and assets for offline use, which means after a deploy, installed instances can continue serving the previous version until the cache is invalidated.

## Root Cause
Default service worker cache strategies return cached assets first. Without a cache-version bump or an explicit update check on launch, installed PWAs do not pull the new `index.html` automatically.

## Solution
When shipping a change that alters user-facing numbers (pricing, ROI, TAM) or removes a screen:
- Bump the cache version constant in `sw.js` so the old cache is purged.
- Verify on an already-installed device (not a fresh browser) that the new version loads.

## Prevention
- Treat `sw.js` cache version as part of every release that touches `index.html`.
- Before a field demo, cold-launch the PWA once with network enabled so it can self-update.
- If a user reports "the demo shows old numbers," check service-worker cache before suspecting code.
