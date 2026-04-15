# KYTHEREX Field Demo

Interactive product demo for KYTHEREX timber procurement analytics. Built for field sales conversations in the MT/PNW region.

**Live:** [https://squirmywormy275.github.io/KYTHEREX-demo-app](https://squirmywormy275.github.io/KYTHEREX-demo-app)

## What This Is

A single-screen, map-centric mobile app that shows what KYTHEREX does. One unified product view -- not tabs, not slides. A procurement forester opens it and sees:

1. **Where the wood is.** FIA county-level sawtimber inventory bubbles across MT, ID, WA, OR.
2. **What it costs to get it here.** Profit rings radiating from the selected mill -- green (profitable), yellow (marginal), red (uneconomic).
3. **Where the money leaks.** Moisture-adjusted pricing gaps, Monte Carlo risk distributions, and a bid recommendation engine.

### Features

- **5 switchable demo mills** -- Sun Mountain (Deer Lodge), Stoltze (Columbia Falls), Thompson River (Thompson Falls), Idaho Forest Group (Lewiston), Sierra Pacific (Shelton)
- **Season selector** -- Watch profit rings contract in mud season and expand in frozen ground
- **Species selector** -- Douglas-fir, lodgepole, larch, ponderosa, cedar at real BBER prices
- **Bid recommendation card** -- Tap any county on the map for delivered cost, bid confidence (Monte Carlo), moisture gap analysis
- **What-if sliders** -- Diesel price, stumpage ask, actual MC -- all update the bid card in real time
- **Supply intelligence panel** -- Species mix, ownership breakdown, growth-to-drain ratio, competing mills
- **CTA screen** -- Correct financials from Financial Source of Truth v2.1 ($0.25-$0.75/MBF, 10-25x ROI, $116K-$290K savings)
- **Competition view** -- Toggle to the multi-mill overlap map (3 demo mills, 18 pre-baked timber sales). Leaflet-powered. Tap a contested sale to see how all three mills' delivered-cost rings classify it. Mill toggles + contested-only filter.

All data is pre-baked from public sources (BBER Q1 2025, MT DOR FY2023, IDL rolling averages, USDA FIA). No backend. No API calls. No proprietary data.

## How to Use

Pull it up on your phone. Select a mill. Tap a county on the map. Show someone what procurement intelligence looks like. The "Your numbers" button has contact info and pricing.

Works on any device with a browser.

## Install on iPhone

1. Open [squirmywormy275.github.io/KYTHEREX-demo-app](https://squirmywormy275.github.io/KYTHEREX-demo-app) in Safari
2. Tap the Share button (square with arrow)
3. Tap "Add to Home Screen"
4. Tap "Add"

The app launches full-screen and works offline.

## Tech

Single `index.html`. React 18 from CDN. Zero build step. Zero dependencies to install. Hand-rolled SVG icons and map. Runs offline after first load.

## Updating

Edit `index.html`. Push to `main`. GitHub Pages redeploys automatically.

## Data Sources

| Source | Coverage | Update Frequency |
|--------|----------|-----------------|
| UM Bureau of Business and Economic Research (BBER) | MT delivered log prices, 14+ species | Quarterly |
| Montana Dept. of Revenue | Stumpage estimates by zone | Annual |
| Idaho Dept. of Lands (IDL) | Per-sale auction results, rolling averages | Semi-annual |
| Washington DNR | Stumpage value tables by species, zone, quality | Semi-annual |
| USDA Forest Inventory & Analysis (FIA) | County-level sawtimber volume, species, ownership | Every 5 years |
| ATRI | Trucking operating cost benchmarks | Annual |

## Part Of

[KYTHEREX](https://github.com/SquirmyWormy275/KYTHEREX) - Predictive analytics for timber procurement optimization.

[STRATHEX, Inc.](https://github.com/SquirmyWormy275/KYTHEREX) - Parent company.

Built in Montana, for Montana.
