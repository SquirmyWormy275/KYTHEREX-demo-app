---
type: bug
problem_type: configuration-issue
severity: high
symptoms:
  - "GitHub Pages could not serve the demo when the entry file was named 'Demo App.html'"
  - "PWA install flow broke because the entry URL had a space"
tags:
  - "github-pages"
  - "pwa"
  - "deployment"
confidence: high
created: 2026-04-15
source: "knowledge-seed from git history (43b8db3)"
---

# GitHub Pages Requires index.html at Root

## Problem
The demo was originally authored as `Demo App.html`. GitHub Pages did not serve it as the site root, and the space in the filename broke the PWA manifest `start_url` and service worker scope.

## Root Cause
GitHub Pages serves `index.html` at the directory root by default. Any other filename requires an explicit path, and URL-encoded spaces are fragile for PWA install.

## Solution
Rename the entry file to `index.html` at the repo root. Keep PWA assets (`manifest.json`, `sw.js`, `icons/`) beside it so relative paths resolve cleanly.

## Prevention
- Never name a user-facing entry file with spaces or mixed case.
- Entry file is always `index.html` at repo root for GitHub Pages projects.
- When adding PWA support, verify `start_url: "./"` and service worker scope both resolve on the deployed URL.
