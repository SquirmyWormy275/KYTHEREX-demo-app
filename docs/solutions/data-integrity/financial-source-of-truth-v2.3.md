---
type: bug
problem_type: data-integrity
severity: critical
symptoms:
  - "Demo app showed pricing $1-5K/month instead of per-MBF pricing"
  - "ROI claims of 3-60x did not match validated unit economics (10-25x)"
  - "Knowledge seed still carried retired v2.1 figures (TAM $2.5M-$5M, haul $9.50-$25/ton)"
tags:
  - "financial-model"
  - "demo-app"
  - "copy"
confidence: high
created: 2026-04-15
updated: 2026-11-02
source: "KYTHEREX_Financial_Source_of_Truth_v2_3.md (canonical, 2026-04-15)"
---

# Demo Numbers Must Match Financial Source of Truth v2.3

## Problem
The demo app drifted from the validated financial model, showing flat monthly pricing, exaggerated ROI
ranges, and haul costs calibrated for a different region. Any number that appears on screen is a sales
claim and must be defensible. This note itself carried retired v2.1 figures until 2026-11-02, which could
steer an agent back to them during /ce-plan or /ce-review.

## Canonical figures (FSOT v2.3)
- Pricing: per-board-foot sliding scale. Under 20,000 MBF/yr $0.75/MBF; 20,000-50,000 $0.50/MBF;
  over 50,000 $0.25/MBF. Reference customer: 25,000 MBF/yr at $0.50 = $12,500/yr.
- Savings: ~$116K (1%) to ~$290K (2.5%) per reference mill (25K MBF x $464 DF delivered).
- ROI: ~9x (1%) to ~23x (2.5%); pitch framing ~10x-25x.
- National TAM: ~$15M (800-1,000 commercial sawmills, Census CBP 2023, Forisk 2024).
- PNW SAM: ~$3M-$4M (~160 mills).
- Haul cost source: BBER 2022 trucking costs, $12.51/ton at 30 mi to $58.40/ton at 250 mi.
- Conversion: ~8 tons/MBF.

## Retired (DO NOT USE)
TAM $2.5M-$5M and $3M-$10M; SAM $30M-$48M or $1.75M-$1.9M; tier pricing $1K-$5K/mo; 3x-60x ROI;
$150K/$375K savings; $200K at 2% (correct math is $232K). Full list: FSOT v2.3 section 5.

## Where the app keeps them
- `FSOT` block in `index.html` is the only place pricing/ROI/savings strings live, including the
  per-MBF tier table that the Pricing screen applies to each demo mill's stated capacity.
- `scripts/dev.sh check-fsot` (run by the pre-commit hook) blocks these strings outside that block.

## Market prices are separate from the FSOT
FSOT savings math is built on BBER Q1 2025 DF delivered ($464/MBF) and stays that way until the FSOT
itself is revised. The demo's market prices moved to BBER Q3 2026, which publishes an average low and
average high per species instead of a single average. Do not "correct" the FSOT savings to the new
range midpoint, and do not present the midpoint as an average.

## Prevention
- Before editing any numeric label, card, slider range, or CTA in index.html, re-read the FSOT block.
- In QA/review mode, grep for `$`, `MBF`, `ROI`, `TAM`, and any `x` multiplier and verify each against v2.3.
- Treat pricing/ROI as a data contract, not copy.
