const CACHE_NAME = 'watch-store-cache-v1';
const urlsToCache = [
    '/',
    'index.html',
    'style.css',
    'image/watch1.png',
    'image/watch2.png'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                if (response) {
                    return response;
                }
                return fetch(event.request)
                    .then(response => {
                        if (!response || response.status !== 200 || response.type !== 'basic') {
                            return response;
                        }
                        const responseToCache = response.clone();
                        caches.open(CACHE_NAME)
                            .then(cache => {
                                cache.put(event.request, responseToCache);
                            });
                        return response;
                    });
            })
    );
});

self.addEventListener('push', event => {
    const title = 'Watch Store';
    const options = {
        body: event.data.text()
    };
    event.waitUntil(
        self.registration.showNotification(title, options)
    );
});

self.addEventListener('sync', event => {
    if (event.tag === 'sync-products') {
        event.waitUntil(syncProducts());
    }
});

function syncProducts() {
    // Implement syncing logic here
    console.log('Syncing products...');
}
