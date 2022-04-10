/* eslint-disable prefer-regex-literals */
/* eslint-disable comma-dangle */
/* eslint-disable no-restricted-globals */
import 'regenerator-runtime/runtime';
import { setCacheNameDetails } from 'workbox-core';
import { cleanupOutdatedCaches, precacheAndRoute } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { StaleWhileRevalidate, CacheFirst, NetworkFirst } from 'workbox-strategies';
import { ExpirationPlugin } from 'workbox-expiration';

setCacheNameDetails({
    prefix: 'juto-app',
    suffix: 'v1',
    precache: 'precache',
    runtime: 'runtime',
});

precacheAndRoute(self.__WB_MANIFEST);

registerRoute(
    ({ request }) => request.mode === 'navigate',
    new NetworkFirst({
        cacheName: 'my-pages-cache',
    })
);

registerRoute(
    /^https:\/\/restaurant-api\.dicoding\.dev\/(?:(list|detail))/,
    new NetworkFirst({
        cacheName: 'dicoding-restaurant-api-cache',
        plugins: [
            new ExpirationPlugin({
                maxAgeSeconds: 60 * 60 * 24 * 30,
                maxEntries: 100,
            }),
        ],
    })
);

registerRoute(
    ({ request }) => request.destination === 'image',
    new CacheFirst({
        cacheName: 'my-image-cache',
        plugins: [
            new ExpirationPlugin({
                maxAgeSeconds: 60 * 60 * 24 * 30,
                maxEntries: 50,
            }),
        ],
    })
);

// cache font-awesome
registerRoute(
    new RegExp('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.css'),
    new CacheFirst({
        cacheName: 'my-font-awesome-css-cache',
    })
);

// cache fonts request
registerRoute(
    ({ url }) => url.origin === 'https://fonts.googleapis.com' || url.origin === 'https://fonts.gstatic.com',
    new StaleWhileRevalidate({
        cacheName: 'my-google-fonts-cache',
        // Don't cache more than 50 items
        plugins: [new ExpirationPlugin({ maxEntries: 50 })],
    })
);

// Cache CSS, JS, and Web Worker requests
registerRoute(
    ({ request }) => request.destination === 'style' || request.destination === 'script' || request.destination === 'worker',
    new StaleWhileRevalidate({
        cacheName: 'my-assets-cache',
    })
);

cleanupOutdatedCaches();

self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
});
