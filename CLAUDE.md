# KYTHEREX Field Demo

Standalone mobile-first sales demo for KYTHEREX timber procurement analytics. Single `index.html`, React 18 from CDN, zero build step. Deployed via GitHub Pages.

## Architecture

One unified map-centric product view. No tabs. One screen with expandable drawer for bid analysis.

- **Header:** Mill selector (5 mills) + Season selector (4 seasons)
- **Map:** SVG topo map with profit rings, FIA county inventory bubbles, mill markers
- **Economics bar:** Delivered cost, spread, MC waste at a glance
- **Drawer:** Bid recommendation card + what-if sliders (diesel, stumpage, MC)
- **Supply panel:** Species mix, ownership, growth-to-drain, competing mills
- **Bottom bar:** Species selector + CTA button
- **CTA screen:** Pricing, ROI, contact info

## Financial Source of Truth

All numbers match Financial Source of Truth v2.1:
- Pricing: $0.25-$0.75/MBF sliding scale
- ROI: 10-25x (NOT 3x-60x)
- Savings: $116K-$290K per mill (at 25K MBF/yr, 1-2.5% improvement)
- Avg annual cost: ~$12,500
- TAM: $2.5M-$5M national (NOT $30M+)

## Design System
Always read DESIGN.md before making any visual or UI decisions.
All font choices, colors, spacing, and aesthetic direction are defined there.
Do not deviate without explicit user approval.
In QA mode, flag any code that doesn't match DESIGN.md.

## Skill routing

### Compound Engineering (CE) Commands
CE commands chain multiple skills into gated pipelines. Each phase must pass before
the next begins. Failures are fixed in-place with atomic commits.

- Full verification (review + QA, no test runner in this project) → invoke ce-verify
- Verified ship (review + QA + ship) → invoke ce-ship
- Full deploy (review + QA + ship + land) → invoke ce-deploy
- Hotfix fast lane (ship only) → invoke ce-hotfix
- Plan and build (autoplan + TDD implementation) → invoke ce-plan
- Configure CE stack → invoke ce-setup

### Project-specific notes
- **No test runner.** This is a single-file React-from-CDN demo. CE pipelines skip the
  pytest/npm-test phase. QA is browser-based via `/qa` against a local static server.
- **Knowledge seed.** Established patterns and solved problems live in `docs/solutions/`.
  The learnings-researcher reads these during `/ce-plan` and `/ce-review`.

## Deploy Configuration (configured by /setup-deploy)
- Platform: GitHub Pages
- Production URL: https://squirmywormy275.github.io/KYTHEREX-demo-app/
- Deploy workflow: auto-deploy on push to main (GitHub Pages native, no Actions workflow)
- Deploy status command: none (GitHub Pages has no CLI status; poll the URL)
- Merge method: squash
- Project type: mobile-first static SPA (single index.html, React from CDN, PWA)
- Post-deploy health check: `curl -sf https://squirmywormy275.github.io/KYTHEREX-demo-app/ -o /dev/null -w "%{http_code}"` should return 200

### Custom deploy hooks
- Pre-merge: none (no build step)
- Deploy trigger: automatic on push to main (GitHub Pages picks up within ~30-60s)
- Deploy status: poll production URL until new `index.html` etag/content is served
- Health check: production URL returns 200 AND contains expected version/build marker
- **Service worker caveat:** If `index.html` was changed, bump the cache version in `sw.js`
  or installed PWAs will continue serving the stale version. See
  `docs/solutions/configuration-issues/pwa-service-worker-cache-staleness.md`.
