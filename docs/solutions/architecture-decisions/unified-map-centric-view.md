---
type: knowledge
problem_type: architecture-decision
severity: high
tags:
  - "ui-architecture"
  - "demo-app"
  - "navigation"
confidence: high
created: 2026-04-15
source: "knowledge-seed from CLAUDE.md and git history (77a768c)"
---

# Single Map-Centric View, No Tabs

## Context
The original demo used a 4-tab layout (Dashboard, Benchmarking, Moisture, Wood Basket). It fragmented the sales story: prospects had to hunt for the "aha" across tabs, and the map — the most visceral artifact — competed with itself.

## Pattern
One screen, map-centric, with an expandable drawer:
- Header: Mill selector (5 mills) + Season selector (4 seasons)
- Map: SVG topo with profit rings, FIA county inventory bubbles, mill markers
- Economics bar: delivered cost, spread, MC waste
- Drawer: bid recommendation card + what-if sliders (diesel, stumpage, MC)
- Supply panel: species, ownership, growth-to-drain, competing mills
- Bottom bar: species selector + CTA
- CTA screen: pricing, ROI, contact

No tabs. Tap-to-bid interaction collapses navigation into direct manipulation of the map.

## Rationale
- Field sales demo: the forestry buyer is already looking at terrain in their head — lead with the map.
- Tabs forced context switching and hid the strongest demo moment (profit ring contracting under a season change).
- Single screen forces every feature to earn its pixels.

## Examples
Adding a new analytic? Decide where it lives in the existing drawer/panel, not as a new tab. If it cannot fit, challenge whether it belongs in the demo at all.
