---
type: knowledge
problem_type: architecture-decision
severity: high
tags:
  - "build-system"
  - "react"
  - "github-pages"
confidence: high
created: 2026-04-15
source: "knowledge-seed from CLAUDE.md"
---

# Zero-Build Single index.html via React CDN

## Context
This is a sales demo shown on phones at log landings and in trucks. It must load fast, work offline, and deploy to GitHub Pages with no CI.

## Pattern
- Single `index.html` at repo root.
- React 18 loaded from CDN (no bundler, no package.json-driven build).
- PWA layer: `manifest.json`, `sw.js`, icons in `icons/` for offline field use.
- Deploy = push to main; GitHub Pages serves the file directly.

## Rationale
- No build step = no broken deploys, no toolchain drift across machines.
- Field use requires PWA offline caching, which is simpler over a flat file.
- Single file keeps the demo grep-able and auditable against the Financial Source of Truth in one pass.

## Examples
Do not introduce Vite, webpack, bundlers, or a `src/` directory without explicit approval. If a feature needs a build step, it probably does not belong in the demo.
