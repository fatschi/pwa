importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.0.0/workbox-sw.js');
workbox.core.setLogLevel(workbox.core.LOG_LEVELS.debug);

const CACHE_NAME = 'fatschi-pwa';

workbox.routing.registerRoute(
    /.*\.(?:html|js)/,
    workbox.strategies.staleWhileRevalidate({
        cacheName: `${CACHE_NAME}:static`,
    }),
);

workbox.routing.registerRoute(
    new RegExp('https://scontent\.cdninstagram\.com/'),
    workbox.strategies.staleWhileRevalidate({
        cacheName: `${CACHE_NAME}:images`
    })
);

workbox.routing.registerRoute(
    new RegExp('https://api\.instagram\.com/'),
    workbox.strategies.staleWhileRevalidate({
        cacheName: `${CACHE_NAME}:api`,
        plugins: [
            {
                requestWillFetch: async ({ request }) => {
                    const url = new URL(request.url);
                    url.searchParams.set('callback', 'instafeedCache123.parse');
                    return new Request(url.href, { headers: request.headers });
                },
                fetchDidFail: async ({ originalRequest, request, error, event }) => {
                    console.log("bar")
                }
            }
        ]
    }),
);

self.addEventListener('install', function () {
    // For Develop Only
    self.skipWaiting();
});
