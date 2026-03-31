# KYTHEREX Field Demo

Standalone mobile-first sales demo for KYTHEREX timber procurement analytics. Single `index.html`, React 18 from CDN, zero build step. Deployed via GitHub Pages.

## Architecture

One unified map-centric product view. No tabs. One screen with expandable drawer for bid analysis.

- **Header:** Mill selector (5 mills) + Season selector (4 seasons)
- **Map:** SVG topo map with profit rings, FIA county inventory bubbles, mill markers
- **Economics bar:** Delivered cost, spread, MC waste at a glance
- **Drawer:** Bid recommendation card + what-if sliders (diesel, stumpage, MC)
- **Supply panel:** Species mix, ownership, growth-to-drain, competing mills
- **Bottom bar:** Species selector + CTA button
- **CTA screen:** Pricing, ROI, contact info

## Financial Source of Truth

All numbers match Financial Source of Truth v2.1:
- Pricing: $0.25-$0.75/MBF sliding scale
- ROI: 10-25x (NOT 3x-60x)
- Savings: $116K-$290K per mill (at 25K MBF/yr, 1-2.5% improvement)
- Avg annual cost: ~$12,500
- TAM: $2.5M-$5M national (NOT $30M+)

## Design System
Always read DESIGN.md before making any visual or UI decisions.
All font choices, colors, spacing, and aesthetic direction are defined there.
Do not deviate without explicit user approval.
In QA mode, flag any code that doesn't match DESIGN.md.
