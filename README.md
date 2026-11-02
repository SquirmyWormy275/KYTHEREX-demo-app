# KYTHEREX Field Demo

Interactive product demo for KYTHEREX timber procurement analytics. Built for field sales conversations in the MT/PNW region.

**Live:** [https://squirmywormy275.github.io/KYTHEREX-demo-app](https://squirmywormy275.github.io/KYTHEREX-demo-app)

## What This Is

A single-screen, map-centric mobile app that shows what KYTHEREX does. One unified product view -- not tabs, not slides. A procurement forester opens it and sees:

1. **Where the wood is.** FIA county-level sawtimber inventory bubbles across western Montana and northern Idaho, on real county outlines.
2. **What it costs to get it here.** Profit rings in statute miles from the selected mill: green (profitable), yellow (marginal), red (uneconomic).
3. **Where the money leaks.** Moisture-adjusted pricing gaps, modeled cost ranges, and a bid recommendation with a max stumpage bid.

### Features

- **4 switchable demo mills** -- Sun Mountain (Deer Lodge), Stoltze (Columbia Falls), Thompson River (Thompson Falls), Idaho Forest Group (Lewiston)
- **Real geography** -- County and state outlines from US Census boundaries; 11 sawmills placed from their coordinates
- **Season selector** -- Watch profit rings contract in mud season and expand in frozen ground
- **Species selector** -- Douglas-fir, lodgepole, larch, ponderosa, cedar at the BBER Q3 2026 published price ranges
- **Bid recommendation card** -- Tap a county for delivered cost (haul priced by distance), confidence of clearing your target margin, max stumpage bid, moisture gap
- **What-if sliders** -- Diesel, stumpage ask, actual MC, target margin; defaults are each mill's own values
- **Supply intelligence panel** -- Species mix, ownership breakdown, growth-to-drain ratio, competing mills
- **Pricing screen** -- Financial Source of Truth v2.3 figures plus a mill-specific subscription estimate from the per-MBF tiers
- **Competition view** -- Multi-mill overlap map (3 demo mills, 18 demo timber sales) on dark CARTO tiles. Sale classes are computed from distance, season and which mills are toggled on. Contested-only filter.

All data is pre-baked from public sources. No backend. No API calls. No proprietary data.

## How to Use

Pull it up on your phone. Select a mill. Tap a county on the map. Show someone what procurement intelligence looks like. The "Your numbers" button has pricing and contact: Alex Kaper, (217) 552-4005.

Works on any device with a browser.

## Install on iPhone

1. Open [squirmywormy275.github.io/KYTHEREX-demo-app](https://squirmywormy275.github.io/KYTHEREX-demo-app) in Safari
2. Tap the Share button (square with arrow)
3. Tap "Add to Home Screen"
4. Tap "Add"

The app launches full-screen. After its first successful online load, the main
demo and competition controls/overlays work offline. The competition basemap
retains recently fetched tiles; new map areas may have no basemap while offline.

## Tech

Single `index.html`. React 18 from CDN. Zero build step. Zero dependencies to install. Hand-rolled SVG icons; the MAP view's county outlines are embedded, generated from Census boundaries. The service worker precaches React, Leaflet, the application and the design
fonts for offline use. Online launches fetch current HTML; offline launches
use the last cached version. Runtime caching retains at most 120 assets,
including recently viewed basemap tiles.

## Maintainer browser checks

The public app still has no build or package-install step. The separate
maintainer test tools require Node 22 or later:

```bash
npm ci
npx playwright install chromium
npm test
```

Use `CHROMIUM_EXECUTABLE` to select an existing browser instead of Playwright's
managed Chromium. The test serves this checkout on loopback and uses disposable
browser contexts. It checks the GitHub Pages path and a local root path, offline
launch and competition overlays, actual font/Leaflet precaching, an HTML-only
update, and a worker update that preserves another project's cache. Screenshots
and receipts go to ignored `test-results/`. GitHub Actions runs the same check;
it does not deploy the demo or change a personal browser profile.

## Updating

Edit `index.html`. Push to `main`. GitHub Pages redeploys automatically.

The MAP view's county geometry is generated. To change the extent or the FIA county list, edit
`scripts/build-geo.mjs` and run `npm ci && node scripts/build-geo.mjs`; it rewrites the `GEO` blob in
`index.html`. Do not hand-edit that blob.

## Data Sources

| Source | Used for | Vintage in the demo |
|--------|----------|---------------------|
| UM Bureau of Business and Economic Research (BBER) sawlog price report | Delivered log price ranges (average low / average high) by species | Q3 2026 |
| BBER estimated trucking costs, Idaho and Montana | Haul cost by distance ($12.51/ton at 30 mi to $58.40/ton at 250 mi) | 2022 |
| Montana Dept. of Revenue | Stumpage estimates | FY2023 |
| Idaho Dept. of Lands (IDL) | Stumpage, rolling averages | Apr 2025 |
| USDA Forest Inventory & Analysis (FIA) | County-level sawtimber volume | Carried from earlier demo data |
| US Census Bureau cartographic boundaries (via us-atlas 3.0.1) | County and state outlines | 2017 vintage files |
| `mills_mt_pnw.json` (project research) | Mill coordinates | March 2026 |

Distances are straight-line. No road circuity factor is applied, so long winding hauls are understated.

## Part Of

KYTHEREX - Predictive analytics for timber procurement optimization (private repository).

STRATHEX, Inc. - Parent company.

Built in Montana, for Montana.
