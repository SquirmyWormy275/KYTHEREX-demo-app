# Design System — KYTHEREX Field Demo

## Product Context
- **What this is:** Standalone mobile-first sales demo for KYTHEREX timber procurement analytics
- **Who it's for:** Forestry/timber procurement professionals in MT/PNW, shown during field sales conversations
- **Space/industry:** Timber procurement, commodity analytics, forestry
- **Project type:** Mobile-first single-page demo app (single index.html, React from CDN, no build step)

## Aesthetic Direction
- **Direction:** Industrial Field Instrument
- **Decoration level:** Intentional — subtle hairline rules for structure, no glossy effects, no shadows, no decorative elements
- **Mood:** Purpose-built market terminal pulled up at a log landing. Disciplined, dense, credible. More "premium field instrument" than "startup analytics template."

## Typography
- **Primary (everything):** JetBrains Mono (400-800) — Full monospace dominance. The entire app reads like instrument output. Numbers, labels, nav, body — all monospace. Signals "measured, not marketed."
- **Secondary (marketing copy only):** Space Grotesk (400-600) — Used sparingly for longer descriptive text in the contact/CTA section. Everything else is monospace.
- **Code:** JetBrains Mono (same as primary)
- **Loading:** Google Fonts CDN — `https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700;800&family=Space+Grotesk:wght@400;500;600;700&display=swap`
- **Scale:**
  - 48px / 800 — Hero price (one per viewport)
  - 32px / 700 — Section price
  - 22px / 700 — Card-level price
  - 18px / 700-800 — Inline data emphasis
  - 16px / 600 — Row heading
  - 13px / 500 — Row detail, body
  - 12px / 500-700 — Table data, species rows
  - 11px / 400-600 — Metadata, timestamps, deltas
  - 10px / 600 — Labels (uppercase, letter-spacing: 0.15em)
  - 9px / 400 — Source attribution

## Color
- **Approach:** Restrained — one high-voltage accent (chartreuse) on near-black forest, with teal for positive signals and red for negative
- **Background:** `#0A0C0B` — Near-black with green undertone. Not flat black, not navy.
- **Surface:** `#111614` — Barely-there elevation for grouped areas. Cards feel inset, not raised.
- **Surface High:** `#1C2420` — Active/hover states only.
- **Text Primary:** `#F0EDE6` — Warm parchment off-white. Not pure white.
- **Text Secondary:** `#9CA38C` — Sage. For descriptions and supporting text.
- **Text Muted:** `#6B7260` — Deep sage. Labels, timestamps, metadata.
- **Accent (Chartreuse):** `#C8F560` — Primary accent. Prices, alerts, active nav, CTAs. High-voltage and unexpected in the forestry category.
- **Accent Dim:** `rgba(200, 245, 96, 0.12)` — Accent backgrounds, highlight strips.
- **Positive / Teal:** `#3DFFD0` — Up deltas, positive signals, "below benchmark" indicators.
- **Negative / Red:** `#D94840` — Down deltas, negative signals, "above benchmark" warnings.
- **Hairline / Border:** `#243128` — Barely visible structural lines.
- **Dark mode:** This IS dark mode. No light mode for the demo app.
- **Light mode (preview/docs only):**
  - Background: `#F4F2ED`
  - Surface: `#ECEAE4`
  - Text: `#1A1D1B`
  - Accent: `#4A7A00`
  - Teal: `#0B7A66`

## Spacing
- **Base unit:** 4px
- **Density:** Compact — this is a mobile field tool, no wasted space
- **Scale:** 4 / 8 / 12 / 16 / 24 / 32 / 48
- **Spatial grouping:** Use whitespace ratios (4px tight / 8px related / 24px section break) instead of card backgrounds for visual hierarchy

## Layout
- **Approach:** Cardless instrument panel — no card backgrounds, no card borders. Data separated by 1px hairlines and spatial grouping.
- **Grid:** Single column on mobile. Stats use 2-column grid divided by hairlines (not card gaps).
- **Max content width:** 400px (mobile-first demo)
- **Border radius:** 0px default. 2px maximum for buttons. No rounded corners — structural and angular.
- **Nav:** Underline-active tabs with uppercase labels, not pill/chip tabs.
- **Numbers-first hierarchy:** Prices render at 22-48px with 10px labels above. The number is the dominant element, not the label.

## Motion
- **Approach:** Minimal-functional — instant is better than animated for a field tool
- **Easing:** enter(ease-out) exit(ease-in)
- **Duration:** micro(50ms) short(150ms) — no medium or long durations
- **Rules:** View transitions at 150ms ease-out. State changes at 50ms. No entrance animations, no scroll effects, no decorative motion.

## Anti-Patterns (Never Do)
- No card backgrounds or card borders — use hairlines
- No rounded corners above 2px — keep it structural
- No gradient backgrounds — instrument UIs are flat
- No soft shadows or elevation effects
- No centered hero layouts — left-align everything
- No tree, leaf, or wood-grain illustrations
- No purple/violet gradients
- No 3-column icon grids
- No generic chart-first opening screens
- No animation longer than 150ms

## Decisions Log
| Date | Decision | Rationale |
|------|----------|-----------|
| 2026-03-26 | Initial design system created | Created by /design-consultation with Codex + Claude subagent input |
| 2026-03-26 | Chartreuse accent (#C8F560) over amber | Polarizing but unforgettable — signals a real design decision in a category where everything is amber/green |
| 2026-03-26 | Full monospace (JetBrains Mono) | Entire app reads as instrument output. "Measured, not marketed." Short copy means readability tradeoff is minimal. |
| 2026-03-26 | Cardless hairline layout | Bloomberg terminal density. No card backgrounds, just 1px hairlines and spatial grouping. Increases information density without clutter. |
