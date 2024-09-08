const cacheName = 'v1';
const filesToCache = [
    '/',
    '/index.html',
    '/css/style.css',
    '/images/background.jpg',
    '/images/icon-152x152.png',
    '/images/icon-192x192.png',
    '/images/icon-256x256.png',
    '/fonts/CustomFont.woff',
    '/fonts/CustomFont.woff2',
    '/js/main.js'
];

self.addEventListener('install', (event) => {
    event.waitUntil((async () => {
        try {
            const cache = await caches.open(cacheName);
            return cache.addAll(filesToCache);
        } catch (e) {
            console.error('Cache installation failed:', e.message);
        }
    })());
});

self.addEventListener('fetch', (event) => {
    event.respondWith((async () => {
        try {
            const response = await caches.match(event.request);
            return response || fetch(event.request);
        } catch (e) {
            console.error('Fetch failed:', e.message);
        }
    })());
});
