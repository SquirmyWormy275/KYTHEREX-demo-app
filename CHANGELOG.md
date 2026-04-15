# Changelog

All notable changes to the KYTHEREX Field Demo are recorded here.
Format loosely follows [Keep a Changelog](https://keepachangelog.com/).
This project tracks a single-file React-from-CDN demo, so entries are coarse.

## [Unreleased]

### Added
- `docs/solutions/` knowledge seed for Compound Engineering (8 entries extracted
  from CLAUDE.md and git history).
- CE routing block in CLAUDE.md; project-level `.claude/` configured.

## [0.4.0] — 2026-04-14

### Changed
- Repainted Competition view to match main dashboard dark palette.

## [0.3.0] — 2026-04-13

### Added
- Competition view with 3-mill profit ring overlap.

## [0.2.0] — 2026-04-10

### Changed
- Rebuilt demo as unified map-centric product view (no tabs).
- Single-screen layout: header + map + economics bar + drawer + supply panel + bottom bar.
- 5 switchable demo mills, 4 seasons, tap-to-bid interaction.

### Fixed
- Synced all user-facing numbers with Financial Source of Truth v2.1
  ($0.25-$0.75/MBF pricing, 10-25x ROI, Montana-calibrated haul costs).

## [0.1.0] — Initial

### Added
- Initial KYTHEREX demo app.
- Tab navigation (Dashboard, Benchmarking, Moisture, Wood Basket) — later removed.
- JetBrains Mono + hairline aesthetic.
- Progressive Web App conversion for offline field use (`manifest.json`, `sw.js`).
- Renamed `Demo App.html` → `index.html` for GitHub Pages compatibility.
