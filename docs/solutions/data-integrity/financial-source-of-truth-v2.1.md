---
type: bug
problem_type: data-integrity
severity: critical
symptoms:
  - "Demo app showed pricing $1-5K/month instead of $0.50/MBF"
  - "ROI claims of 3-60x did not match validated unit economics (10-25x)"
  - "Haul costs used TxDOT US South rates instead of Montana-calibrated rates"
tags:
  - "financial-model"
  - "demo-app"
  - "copy"
confidence: high
created: 2026-04-15
source: "knowledge-seed from CLAUDE.md and git history (9bc8b25)"
---

# Demo Numbers Must Match Financial Source of Truth v2.1

## Problem
The demo app drifted from the validated financial model, showing flat monthly pricing, exaggerated ROI ranges, and haul costs calibrated for a different region. Any number that appears on screen is a sales claim and must be defensible.

## Root Cause
Numbers were hardcoded during UI iteration without reference to the canonical financial model. Earlier placeholder pricing ($1-5K/month, 3-60x ROI) survived into customer-facing demos.

## Solution
All in-app numbers must match Financial Source of Truth v2.1:
- Pricing: $0.25-$0.75/MBF sliding scale (per-board-foot model, not monthly)
- ROI: 10-25x
- Savings: $116K-$290K per mill (25K MBF/yr, 1-2.5% improvement)
- Avg annual cost: ~$12,500
- TAM: $2.5M-$5M national (not $30M+)
- Haul costs: Montana-calibrated rates ($9.50-$25/ton)

## Prevention
- Before editing any numeric label, card, slider range, or CTA in index.html, re-read the "Financial Source of Truth" block in CLAUDE.md.
- In QA/review mode, grep the codebase for `$`, `MBF`, `ROI`, `TAM`, and any `x` multiplier and verify each matches v2.1.
- Treat pricing/ROI as a data contract, not copy.
