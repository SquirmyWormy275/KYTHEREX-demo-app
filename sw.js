const CACHE_NAME = 'kytherex-demo-v8';
const CACHE_PREFIX = 'kytherex-demo-';
const RUNTIME_CACHE = `${CACHE_NAME}-runtime`;
const RUNTIME_LIMIT = 120;
const local = path => new URL(path, self.registration.scope).href;
const INDEX_URL = local('index.html');
const ASSETS = [
  local('./'), INDEX_URL, local('manifest.json'),
  local('icons/icon-192.png'), local('icons/icon-512.png'),
  'https://cdnjs.cloudflare.com/ajax/libs/react/18.2.0/umd/react.production.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/react-dom/18.2.0/umd/react-dom.production.min.js',
  'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css',
  'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js',
];
const FONT_CSS = 'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700;800&family=Space+Grotesk:wght@400;500;600;700&display=swap';

// Fonts are optional: a font-provider outage must not prevent app installation.
async function cacheFonts(cache) {
  try {
    const response = await fetch(FONT_CSS);
    if (!response.ok) return;
    const css = await response.clone().text();
    await cache.put(FONT_CSS, response);
    const urls = [...css.matchAll(/url\(['"]?(https:\/\/fonts\.gstatic\.com\/[^)'"\s]+)['"]?\)/g)]
      .map(match => match[1]);
    await Promise.allSettled([...new Set(urls)].map(url => cache.add(url)));
  } catch {
    // The app retains its monospace fallback when optional fonts cannot load.
  }
}

self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    await cache.addAll(ASSETS);
    await cacheFonts(cache);
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys
      .filter(key => key.startsWith(CACHE_PREFIX) && key !== CACHE_NAME && key !== RUNTIME_CACHE)
      .map(key => caches.delete(key)));
    await self.clients.claim();
  })());
});

async function navigation(request) {
  const cache = await caches.open(CACHE_NAME);
  try {
    // Launches use current HTML even when only index.html changed on the server.
    const response = await fetch(request, { cache: 'no-store' });
    if (response.ok) {
      try {
        await cache.put(request, response.clone());
        await cache.put(INDEX_URL, response.clone());
        await cache.put(local('./'), response.clone());
      } catch {
        // A full cache must not prevent a successful online launch.
      }
    }
    return response;
  } catch {
    return (await cache.match(request)) || (await cache.match(INDEX_URL)) || Response.error();
  }
}

function cacheable(url) {
  return url.href.startsWith(self.registration.scope) ||
    url.origin === 'https://cdnjs.cloudflare.com' ||
    url.origin === 'https://unpkg.com' ||
    url.origin === 'https://fonts.googleapis.com' ||
    url.origin === 'https://fonts.gstatic.com' ||
    /^https:\/\/[abcd]\.basemaps\.cartocdn\.com$/.test(url.origin);
}

async function asset(request) {
  const cache = await caches.open(CACHE_NAME);
  const runtime = await caches.open(RUNTIME_CACHE);
  const cached = (await cache.match(request)) || (await runtime.match(request));
  if (cached) return cached;
  const response = await fetch(request);
  if (response.ok || response.type === 'opaque') {
    try {
      await runtime.put(request, response.clone());
      const keys = await runtime.keys();
      await Promise.all(keys.slice(0, Math.max(0, keys.length - RUNTIME_LIMIT))
        .map(key => runtime.delete(key)));
    } catch {
      // Return the network response even if runtime caching is unavailable.
    }
  }
  return response;
}

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  const url = new URL(event.request.url);
  if (!cacheable(url)) return;
  event.respondWith(event.request.mode === 'navigate'
    ? navigation(event.request)
    : asset(event.request));
});
