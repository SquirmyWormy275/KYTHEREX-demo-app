# Changelog

All notable changes to the KYTHEREX Field Demo are recorded here.
Format loosely follows [Keep a Changelog](https://keepachangelog.com/).
This project tracks a single-file React-from-CDN demo, so entries are coarse.

## [Unreleased]

## [0.5.0] — 2026-04-16

### Added
- Species selector now flows into bid card math (species spread, market price reference).
- County FIA volume, haul zone badge (PROFITABLE/MARGINAL/UNECONOMIC), and estimated
  haul distance shown in bid card header when a county is selected.
- Personalized CTA screen shows mill-specific moisture waste and payback period.
- Haul route dashed line drawn on SVG map from mill to selected county with distance label.
- Season overlay tints the SVG map (brown for mud, blue for winter, ice for frozen).
- Slider delta indicators show +/- change from defaults on each what-if control.
- Monte Carlo histogram shifts based on delivered cost changes, highlights current
  scenario bar, and includes "ILLUSTRATIVE MODEL" disclaimer.
- Season impact summary text below season selector for non-normal seasons.
- County hover tooltips (SVG title elements) show county name and FIA volume on desktop.
- Responsive landscape mode splits map and detail columns side-by-side (640px+ landscape).
- Bid recommendation badge (BID/CAUTIOUS/PASS) visible in collapsed drawer toggle.
- Explore summary counter in footer tracks how many of the 5 mills have been viewed.
- Shared `computeRec()` function extracts recommendation logic for reuse.

### Changed
- Economics bar spread now shows negative values in red when species price < delivered cost.
- Service worker cache bumped to v4.

### Fixed
- Division-by-zero guard on CTA payback calculation when moisture waste is zero.
- Histogram current-bin formula corrected (was using dimensional mismatch with p10*10).

## [0.4.1] — 2026-04-16

### Added
- Species selector now updates economics bar with selected species price and spread.
- Mill markers on SVG map are tappable to switch between the 5 demo mills.
- Competing mill names in Supply Intelligence are clickable links (when data exists).
- RESET button on What-If sliders appears when values differ from defaults.
- County selection shows tap feedback pulse animation on the map.
- Loading spinner overlay while Competition view Leaflet tiles load.
- Season selector visible on Competition tab; season multiplier scales ring radii.
- Back button and 3-tab navigation (MAP / COMPETITION / PRICING) across all views.

### Changed
- "36 mills mapped" replaced with dynamic count from actual data (15 mills).
- Economics bar first column shows selected species name instead of generic "DELIVERED".
- ALL_MILLS array extracted to top-level constant for reuse.
- DEFAULTS object moved outside render for memoization safety.

### Fixed
- Spread calculation was double-counting old spread value (adversarial review catch).
- Loading spinner could get stuck permanently when tiles loaded from browser cache.
- Rapid county taps could queue conflicting timeouts (race condition fix via useRef).

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
