---
type: knowledge
problem_type: best-practice
severity: high
tags:
  - "design-system"
  - "ui"
  - "aesthetic"
confidence: high
created: 2026-04-15
source: "knowledge-seed from DESIGN.md"
---

# Industrial Field Instrument Aesthetic — Anti-Patterns

## Context
The demo aesthetic is "purpose-built market terminal pulled up at a log landing" — disciplined, dense, credible. Most SaaS UI patterns (cards, shadows, gradients, rounded corners) actively undermine that read and push the demo toward generic startup-template territory.

## Pattern
Never-do list (enforced in QA):
- No card backgrounds or card borders — use 1px hairlines (`#243128`) and spatial grouping
- No rounded corners above 2px
- No gradient backgrounds
- No soft shadows or elevation effects
- No centered hero layouts — left-align everything
- No tree, leaf, or wood-grain illustrations
- No purple/violet gradients
- No 3-column icon grids
- No generic chart-first opening screens
- No animation longer than 150ms

## Rationale
The buyer is a procurement professional, not a consumer. Category convention is amber/green forestry branding and friendly cards; the deliberate counter-read (chartreuse on near-black, hairline layout, full monospace) signals "measured, not marketed" in one glance.

## Examples
If a new UI element needs a card background to feel "contained," the real fix is tighter spatial grouping (4px tight / 8px related / 24px section break) plus a hairline divider — not a `background-color` or `border-radius`.
