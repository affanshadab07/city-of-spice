const CACHE_PREFIX = 'city-of-spice-menu-';
const CACHE = CACHE_PREFIX + 'v38';
const HOME = new URL('./', self.registration.scope);
const LEGACY_HOME = new URL('index.html', HOME);
const CORE = [
  HOME.href, './styles.css', './data.js', './app.js', './manifest.webmanifest',
  './city-of-spice-logo.jpg', './halal-badge.png', './icon.png', './icon-512.png',
];

self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE);
    await cache.addAll(CORE.map(url => new Request(url, { cache: 'reload', redirect: 'error' })));
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys
      .filter(key => key.startsWith(CACHE_PREFIX) && key !== CACHE)
      .map(key => caches.delete(key)));
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', event => {
  const request = event.request;
  const url = new URL(request.url);
  if (request.method !== 'GET' || url.origin !== HOME.origin) return;

  if (request.mode === 'navigate') {
    if (url.pathname === HOME.pathname || url.pathname === LEGACY_HOME.pathname) {
      // Older Home Screen installs can still launch /index.html. Serve the
      // canonical page without Cloudflare's redirect on both launch URLs.
      event.respondWith((async () => {
        const cache = await caches.open(CACHE);
        return await cache.match(HOME.href) || fetch(HOME.href, { redirect: 'error' });
      })());
    }
    return;
  }

  event.respondWith((async () => {
    const cache = await caches.open(CACHE);
    const cached = await cache.match(request);
    if (cached) return cached;

    const response = await fetch(request);
    if (response.ok && !response.redirected) {
      await cache.put(request, response.clone()).catch(() => {});
    }
    return response;
  })());
});
