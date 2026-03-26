# KYTHEREX Field Demo

Interactive product demo for KYTHEREX timber procurement analytics. Built for field sales conversations in the MT/PNW region.

**Live:** [https://squirmywormy275.github.io/KYTHEREX-demo-app](https://squirmywormy275.github.io/KYTHEREX-demo-app)

## What This Is

A single-page mobile-first app that shows what KYTHEREX does. Four product screens using real public pricing data from Montana, Idaho, Washington, and Oregon:

- **Dashboard** - Species prices, stumpage spreads, market alerts from BBER, MT DOR, IDL, WA DNR
- **Delivered-Cost Benchmarking** - Active timber sources vs. regional benchmark with full cost identity breakdown
- **Moisture-Adjusted Pricing** - Live scale log showing flat vs. MC-adjusted value per load
- **Wood Basket Intelligence** - Haul-cost isochrones, profit rings, competing mill landscape

All data is pre-baked from public sources (BBER Q1 2025, MT DOR FY2023, IDL rolling averages). No backend. No API calls. No proprietary data.

## How to Use

Pull it up on your phone. Tap a feature. Show someone what the product looks like. End screen has contact info and pricing.

Works on any device with a browser. No install needed.

## Tech

Single `index.html`. React 18 from CDN. Zero build step. Zero dependencies to install. Hand-rolled SVG icons. Runs offline after first load.

## Updating

Edit `index.html`. Push to `main`. GitHub Pages redeploys automatically. Anyone with the bookmarked URL gets the update on next visit.

## Data Sources

| Source | Coverage | Update Frequency |
|--------|----------|-----------------|
| UM Bureau of Business and Economic Research (BBER) | MT delivered log prices, 14+ species | Quarterly |
| Montana Dept. of Revenue | Stumpage estimates by zone | Annual |
| Idaho Dept. of Lands (IDL) | Per-sale auction results, rolling averages | Semi-annual |
| Washington DNR | Stumpage value tables by species, zone, quality | Semi-annual |
| ATRI | Trucking operating cost benchmarks | Annual |

## Part Of

[KYTHEREX](https://github.com/SquirmyWormy275/KYTHEREX) - Predictive analytics for timber procurement optimization.

[STRATHEX, Inc.](https://github.com/SquirmyWormy275/KYTHEREX) - Parent company.

Built in Montana, for Montana.
