---
type: knowledge
problem_type: architecture-decision
severity: medium
tags:
  - "design-system"
  - "typography"
  - "color"
confidence: high
created: 2026-04-15
source: "knowledge-seed from DESIGN.md decisions log"
---

# Chartreuse Accent + Full Monospace

## Context
Forestry/timber SaaS is saturated with amber, forest-green, and wood-grain branding. The demo needs to be memorable after a 5-minute field conversation and read as a precision instrument, not marketing.

## Pattern
- Single high-voltage accent: chartreuse `#C8F560` on near-black `#0A0C0B` (green undertone, not flat black).
- Teal `#3DFFD0` for positive deltas, red `#D94840` for negative — used sparingly.
- Typography: JetBrains Mono (400-800) for everything — nav, body, numbers, labels. Space Grotesk only for longer marketing copy on the CTA screen.
- Numbers-first hierarchy: prices at 22-48px, labels at 10px uppercase with 0.15em letter-spacing.

## Rationale
- Chartreuse is polarizing but unforgettable in a category where everything else is amber/green.
- Full monospace signals "instrument output, measured, not marketed." Short copy in the demo keeps the readability tradeoff minimal.
- Numbers-dominant hierarchy matches what the buyer actually cares about: delivered cost, spread, MC waste.

## Examples
Do not substitute Inter/SF Pro/Roboto into data rows even for "readability." The monospace discipline is load-bearing for the aesthetic. Adding a second accent color (amber, orange) breaks the "one high-voltage accent" rule.
