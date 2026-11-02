// Rebuild the MAP view's embedded county/state geometry in index.html.
// Source: us-atlas counties-10m (US Census Bureau cartographic boundaries), projected equirectangular at the
// extent's mid-latitude into a 360-unit-wide viewBox. Writes between the GEO:BEGIN / GEO:END markers.
// Usage (maintainers): npm ci && node scripts/build-geo.mjs
import { readFileSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { feature, mesh } from 'topojson-client';

const require = createRequire(import.meta.url);
const topo = JSON.parse(readFileSync(require.resolve('us-atlas/counties-10m.json'), 'utf8'));
const indexPath = new URL('../index.html', import.meta.url);

// Map extent: western Montana and northern/central Idaho, covering every FIA county and demo mill.
const lonMin = -117.35, lonMax = -111.7, latMin = 45.5, latMax = 49.05;
// Counties that carry FIA inventory bubbles in the demo.
const FIA = ['30063','30081','30061','30089','30047','30029','30053','30077','30039','30023','30049',
  '16079','16009','16057','16035','16049','16017','16055'];
const STATES = { '30': 'MT', '16': 'ID', '53': 'WA', '41': 'OR' };

const W = 360;
const lat0 = (latMin + latMax) / 2;
const kx = Math.cos(lat0 * Math.PI / 180);
const k = W / ((lonMax - lonMin) * kx);
const H = Math.round((latMax - latMin) * k);
const P = ([lon, lat]) => [(lon - lonMin) * kx * k, (latMax - lat) * k];
const inv = ([x, y]) => [lonMin + x / (kx * k), latMax - y / k];
const r1 = v => Math.round(v * 10) / 10;
const polys = g => (g.type === 'Polygon' ? [g.coordinates] : g.coordinates);

function bbox(g) {
  let b = [180, 90, -180, -90];
  for (const poly of polys(g)) for (const ring of poly) for (const [x, y] of ring)
    b = [Math.min(b[0], x), Math.min(b[1], y), Math.max(b[2], x), Math.max(b[3], y)];
  return b;
}
const inExtent = b => b[2] > lonMin - 0.05 && b[0] < lonMax + 0.05 && b[3] > latMin - 0.05 && b[1] < latMax + 0.05;

function pathOf(rings) {
  let d = '';
  for (const ring of rings) {
    const pts = [];
    for (const c of ring) {
      const p = P(c).map(r1);
      const last = pts[pts.length - 1];
      if (!last || last[0] !== p[0] || last[1] !== p[1]) pts.push(p);
    }
    if (pts.length > 1) d += 'M' + pts.map(p => p.join(',')).join('L');
  }
  return d;
}

// Area-weighted centroid of the largest polygon, in projected units.
function centroid(g) {
  let best = null, bestArea = 0;
  for (const poly of polys(g)) {
    const ring = poly[0].map(P);
    let a = 0, cx = 0, cy = 0;
    for (let i = 0; i < ring.length - 1; i++) {
      const [x0, y0] = ring[i], [x1, y1] = ring[i + 1];
      const f = x0 * y1 - x1 * y0;
      a += f; cx += (x0 + x1) * f; cy += (y0 + y1) * f;
    }
    a /= 2;
    if (Math.abs(a) > bestArea) { bestArea = Math.abs(a); best = [cx / (6 * a), cy / (6 * a)]; }
  }
  return best;
}

const counties = [];
for (const c of feature(topo, topo.objects.counties).features) {
  const fips = String(c.id);
  const st = STATES[fips.slice(0, 2)];
  if (!st || !inExtent(bbox(c.geometry))) continue;
  const cen = centroid(c.geometry);
  const [lon, lat] = inv(cen);
  const rings = polys(c.geometry).flatMap(p => p);
  counties.push({
    fips, name: c.properties.name, st,
    d: pathOf(rings).replace(/(M[^M]+)/g, '$1Z'),
    cx: r1(cen[0]), cy: r1(cen[1]),
    lat: Math.round(lat * 1e4) / 1e4, lon: Math.round(lon * 1e4) / 1e4,
    fia: FIA.includes(fips),
  });
}
const missing = FIA.filter(f => !counties.some(c => c.fips === f));
if (missing.length) throw new Error('FIA counties missing from extent: ' + missing.join(', '));

const borders = mesh(topo, topo.objects.states, (a, b) => a !== b);
const states = pathOf(borders.coordinates);

const geo = { W, H, lonMin, lonMax, latMin, latMax, kx, k, counties, states };
const html = readFileSync(indexPath, 'utf8');
const re = /\/\*GEO:BEGIN\*\/[\s\S]*?\/\*GEO:END\*\//;
if (!re.test(html)) throw new Error('GEO markers not found in index.html');
writeFileSync(indexPath, html.replace(re, '/*GEO:BEGIN*/' + JSON.stringify(geo) + '/*GEO:END*/'));
console.log(`GEO: ${counties.length} counties (${counties.filter(c => c.fia).length} FIA), ${W}x${H}, ${JSON.stringify(geo).length} bytes`);
