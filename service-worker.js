importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.0.0/workbox-sw.js');
workbox.core.setLogLevel(workbox.core.LOG_LEVELS.debug);

const CACHE_NAME = 'fatschi-pwa';

workbox.routing.registerRoute(
    /.*\.(?:html)/,
    workbox.strategies.cacheFirst({
        cacheName: `${CACHE_NAME}:network-first`,
    }),
);

// Force Caching of Opaque Responses
// https://developers.google.com/web/tools/workbox/reference-docs/latest/workbox.cacheableResponse.Plugin
workbox.routing.registerRoute(
    new RegExp('https://scontent\.cdninstagram\.com/'),
    workbox.strategies.cacheFirst({
        cacheName: `${CACHE_NAME}:network-first`,
        plugins: [
            // Force Cache
            new workbox.cacheableResponse.Plugin({
                statuses: [0, 200], // One or more status codes that a Response can have and be considered cacheable.
            }),
        ]
    }),
);

self.addEventListener('install', function () {
    // For Develop Only
    self.skipWaiting();
});
