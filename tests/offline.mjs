// Exercise actual service-worker installation, offline navigation and updates.
import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { readFile, mkdir, writeFile } from 'node:fs/promises';
import { dirname, resolve, extname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium, expect } from '@playwright/test';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const html = await readFile(resolve(root, 'index.html'), 'utf8');
const worker = await readFile(resolve(root, 'sw.js'), 'utf8');
const initialVersion = /kytherex-demo-v(\d+)/.exec(worker)[1];
let htmlRevision = 'initial';
let workerRevision = initialVersion;
const types = { '.html': 'text/html', '.js': 'text/javascript', '.json': 'application/json', '.png': 'image/png' };
const server = createServer(async (request, response) => {
  try {
    let path = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
    if (path.startsWith('/KYTHEREX-demo-app/')) path = path.slice('/KYTHEREX-demo-app'.length);
    const file = resolve(root, '.' + (path === '/' ? '/index.html' : path));
    if (!file.startsWith(root + '/')) throw Error('Invalid path');
    response.setHeader('Content-Type', types[extname(file)] || 'application/octet-stream');
    response.setHeader('Cache-Control', 'no-store');
    let content;
    if (file === resolve(root, 'index.html')) {
      content = html.replace('</head>', `<meta name="offline-smoke-revision" content="${htmlRevision}"></head>`);
    } else if (file === resolve(root, 'sw.js')) {
      content = worker.replaceAll(`kytherex-demo-v${initialVersion}`, `kytherex-demo-v${workerRevision}`);
    } else {
      content = await readFile(file);
    }
    response.end(content);
  } catch {
    response.writeHead(404); response.end('Not found');
  }
});
await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
const origin = `http://127.0.0.1:${server.address().port}`;
const output = resolve(root, 'test-results');
await mkdir(output, { recursive: true });
const browser = await chromium.launch({
  executablePath: process.env.CHROMIUM_EXECUTABLE || undefined,
  headless: true,
});
const receipts = [];
try {
  for (const mount of ['/KYTHEREX-demo-app/', '/']) {
    htmlRevision = 'initial'; workerRevision = initialVersion;
    const context = await browser.newContext({ viewport: { width: 390, height: 844 } });
    const page = await context.newPage();
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.goto(origin + mount);
    await page.locator('#root button').first().waitFor();
    await page.evaluate(async () => { await navigator.serviceWorker.ready; });
    const cached = await page.evaluate(async () => {
      const keys = await caches.keys();
      const cache = await caches.open(keys.find(key => /^kytherex-demo-v\d+$/.test(key)));
      return (await cache.keys()).map(request => request.url);
    });
    assert(cached.includes(origin + mount + 'index.html'), 'HTML was not precached for this scope');
    assert(cached.some(url => url.endsWith('leaflet.js')), 'Leaflet JS was not precached');
    assert(cached.some(url => url.endsWith('leaflet.css')), 'Leaflet CSS was not precached');
    assert(cached.some(url => url.includes('JetBrains+Mono')), 'Actual font stylesheet was not precached');
    assert(cached.some(url => url.startsWith('https://fonts.gstatic.com/')), 'Font files were not precached');
    assert(!cached.some(url => url.includes('Outfit')), 'Retired font was cached');

    await context.setOffline(true);
    await page.reload();
    await page.locator('#root button').first().waitFor();
    await page.getByRole('button', { name: /competition/i }).click();
    await page.locator('.leaflet-container').waitFor();
    await expect.poll(() => page.locator('.leaflet-overlay-pane path').count()).toBeGreaterThan(0);
    await page.screenshot({ path: resolve(output, mount === '/' ? 'offline-root.png' : 'offline-pages.png') });

    await context.setOffline(false);
    htmlRevision = 'updated-without-worker-change';
    await page.reload();
    assert.equal(await page.locator('meta[name="offline-smoke-revision"]').getAttribute('content'), htmlRevision);
    await context.setOffline(true);
    await page.reload();
    assert.equal(await page.locator('meta[name="offline-smoke-revision"]').getAttribute('content'), htmlRevision);

    await context.setOffline(false);
    await page.evaluate(async () => {
      await caches.open('another-project-cache');
      await caches.open('kytherex-demo-v0');
    });
    workerRevision = String(Number(initialVersion) + 1);
    await page.evaluate(async () => { await (await navigator.serviceWorker.getRegistration()).update(); });
    await expect.poll(() => page.evaluate(() => caches.keys()), { timeout: 30000 })
      .toContain(`kytherex-demo-v${workerRevision}`);
    await expect.poll(() => page.evaluate(() => caches.keys()), { timeout: 30000 })
      .not.toContain(`kytherex-demo-v${initialVersion}`);
    const finalKeys = await page.evaluate(() => caches.keys());
    assert(finalKeys.includes('another-project-cache'), 'Update deleted another project cache');
    assert(!finalKeys.includes('kytherex-demo-v0'), 'Retired app cache survived update');
    assert.deepEqual(errors, [], 'Application JavaScript failed');
    receipts.push({ mount, cachedAssets: cached.length, offlineMap: true, htmlUpdate: true, workerUpdate: true, preservesOtherCaches: true, pageErrors: errors });
    await context.close();
  }
  await writeFile(resolve(output, 'offline.json'), JSON.stringify(receipts, null, 2));
  console.log('Offline app/map, font assets, HTML refresh and scoped cache updates passed at Pages and root paths.');
} finally {
  await browser.close();
  await new Promise(resolve => server.close(resolve));
}
