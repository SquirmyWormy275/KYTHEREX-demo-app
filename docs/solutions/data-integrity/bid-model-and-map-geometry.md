---
type: bug
problem_type: data-integrity
severity: critical
symptoms:
  - "Bid card said BID 68% at a -$188/MBF spread (confidence ignored spread, diesel and MC)"
  - "Economics bar and bid card showed different delivered costs and moisture waste for the same mill"
  - "Sierra Pacific Shelton's rings classified Idaho counties as profitable (schematic map placement)"
  - "Competition popups disagreed with the drawn rings in 11 of 18 sales"
tags:
  - "bid-model"
  - "geometry"
  - "demo-app"
confidence: high
created: 2026-11-02
source: "Audit and fix, v0.6.0"
---

# One Evaluation Path, Real Coordinates, Computed Classes

## Root causes
- Two copies of the bid logic (`BidCard` and `computeRec`) with a stumpage threshold hardcoded from one mill.
- Slider defaults were one mill's values applied to every mill, while summary tiles read per-mill stored values.
- Stored moisture overpay values did not come from the formula the app ran.
- Map positions were hand-placed SVG coordinates, so distances and ring membership were artistic, not geographic.
- Competition sale classes were pre-baked and never recomputed against the drawn circles or the season.

## Pattern now in place
- `evaluate(mill, county, season, species, sliders)` is the only bid/cost computation. The economics bar
  (county = null, mill's typical haul), bid card, drawer badge and CTA all call it or `moistureGap()`.
- Slider defaults come from `millDefaults(mill)` and reset when the mill changes.
- Haul cost uses the BBER 2022 trucking curve at straight-line miles from real coordinates.
  `refMiles(mill)` recovers the distance that reproduces each mill's stored typical haul cost.
- Confidence = P(delivered <= (1 - target margin) x price midpoint), normal approximation combining the
  mill's cost band (P10-P90, $/ton x 8 tons/MBF) and the BBER low-high price range (uniform).
- Map geometry comes from `scripts/build-geo.mjs` (us-atlas / Census boundaries). Do not hand-edit the
  `GEO` blob; change the extent or county list in the script and rerun it.
- `BANDS` (0-50 profitable, 50-100 marginal, 100-125 unprofitable) is shared by MAP and COMPETITION;
  `classify()` and `saleStatus()` recompute classes from distance, season and visible mills.

## Known limits (do not paper over in copy)
- Straight-line miles: no road circuity factor is sourced, so long winding hauls are understated.
  Valhalla haul-cost isochrones from the main KYTHEREX repo are the real fix.
- At the 15% default target margin, the stored stumpage asks clear the target rarely; most counties show
  PASS with a max-bid figure below the ask. That is the model's honest output on this data.
- Per-mill supply totals, FIA county volumes and capacities other than Sun Mountain's are carried from
  earlier demo data and are not independently sourced.
