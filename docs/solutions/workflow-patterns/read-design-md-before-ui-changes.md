---
type: knowledge
problem_type: workflow-pattern
severity: high
tags:
  - "workflow"
  - "design-system"
  - "qa"
confidence: high
created: 2026-04-15
source: "knowledge-seed from CLAUDE.md"
---

# Read DESIGN.md Before Any Visual or UI Decision

## Context
This project has a codified design system (DESIGN.md) with specific colors, type scale, spacing, motion rules, and anti-patterns. UI edits made without reference to it reliably drift into generic SaaS conventions that undermine the demo's positioning.

## Pattern
- Before editing any visual element in `index.html`, open DESIGN.md.
- Use the color tokens, type scale, and spacing scale defined there — do not invent new values.
- In `/qa` or `/review` mode, flag any code that does not match DESIGN.md (wrong hex, wrong font weight, card backgrounds, rounded corners > 2px, animations > 150ms, etc.).
- Deviations require explicit user approval and must be recorded in the DESIGN.md decisions log.

## Rationale
The design system encodes prior decisions (chartreuse over amber, monospace over sans, hairlines over cards) that were deliberately chosen against category convention. Each ad-hoc UI edit that ignores DESIGN.md is a small regression toward the template aesthetic the system was built to escape.

## Examples
Adding a new bid card? Pull colors from DESIGN.md's color block, type sizes from the type scale, and spacing from the 4/8/12/16/24/32/48 scale. If none of the existing tokens fit, that is a signal to discuss with the user, not to add a new token silently.
