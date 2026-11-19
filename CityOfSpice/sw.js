importScripts('./data.js');

const CACHE_PREFIX = 'city-of-spice-menu-';
const CACHE = CACHE_PREFIX + 'v77';
const HOME = new URL('./', self.registration.scope);
const LEGACY_HOME = new URL('index.html', HOME);
const MENU_FILES = ['./styles.css', './data.js', './app.js', './hero-slideshow.js', './manifest.webmanifest'];
const MENU_PATHS = new Set(MENU_FILES.map(file => new URL(file, HOME).pathname));
const CORE = [
  HOME.href, ...MENU_FILES,
  './city-of-spice-logo.jpg', './halal-badge.png', './icon.png', './icon-512.png',
  './images/samosa.jpg', './images/tandoori-chicken.jpg', './images/dosa.jpg',
  './images/malai-kofta.jpg', './images/lamb-biryani.jpg', './images/falooda-menu.jpg',
  './images/bullet-naan.jpg', './images/ras-malai.jpg',
  ...self.SEED_MENU.filter(dish => dish.image).map(dish => './' + dish.image),
];

async function freshResponse(request) {
  const cache = await caches.open(CACHE);
  let response;
  try {
    response = await fetch(request, { cache: 'no-cache' });
  } catch (error) {
    const saved = await cache.match(request);
    if (saved) return saved;
    throw error;
  }
  if (!response.ok) return await cache.match(request) || response;
  await cache.put(request, response.clone()).catch(() => {});
  return response;
}

self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE);
    await cache.addAll([...new Set(CORE)].map(url => new Request(url, { cache: 'reload' })));
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
      event.respondWith(freshResponse(HOME.href));
    }
    return;
  }

  if (MENU_PATHS.has(url.pathname) || request.destination === 'image') {
    event.respondWith(freshResponse(request));
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
