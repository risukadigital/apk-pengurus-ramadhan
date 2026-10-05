const CACHE_NAME = "apk-pengurus-ramadan-v28";

const FILES_TO_CACHE = [
    "./",
    "./index.html",
    "./manifest.json",
    "./PWA1.png",
    "./PWA1_192x192.png"
];
self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(FILES_TO_CACHE))
    );

    self.skipWaiting();
});

self.addEventListener("activate", event => {
    event.waitUntil(
        caches.keys().then(keys =>
            Promise.all(
                keys
                    .filter(key => key !== CACHE_NAME)
                    .map(key => caches.delete(key))
            )
        )
    );

    self.clients.claim();
});

self.addEventListener("fetch", event => {
    event.respondWith(
        fetch(event.request)
            .catch(() => caches.match(event.request))
    );
});