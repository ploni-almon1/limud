const CACHE_NAME = 'limud-cache-v1';
const ASSETS = [
  './index.html',
  './manifest.json',
  './icon.png'
];

// Při instalaci aplikace se uloží soubory do offline mezipaměti
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

// Při načítání stránek se přednostně berou data z offline paměti
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});
