const CACHE_NAME = "sportcom-v4";
var urlsToCache = [
    "/",
    "/index.html",
    "/nav.html",
    "/teams.html",
    "/matches.html",
    "/players.html",
    "/pages/home.html",
    "/pages/competitions.html",
    "/pages/matches.html",
    "/pages/favorite.html",
    "/pages/about.html",
    "/css/materialize.css",
    "/css/materialize.min.css",
    "/js/materialize.js",
    "/js/materialize.min.js",
    "/js/script.js",
    "/js/api.js",
    "/js/database.js",
    "/js/idb.js",
    "/js/favorite.js",
    "/img/LaLiga.png",
    "/img/background.png",
    "/img/matchday.png",
    "/img/profile.png",
    "/img/logo.png",
    "/img/notification.png",
    "/icon-192x192.png",
    "/icon-512x512.png"
];

self.addEventListener("install", function (event) {
    event.waitUntil(
        caches.open(CACHE_NAME).then(function (cache) {
            return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener("fetch", function (event) {
    var base_url = "https://api.football-data.org/v2/";

    if (event.request.url.indexOf(base_url) > -1) {
        event.respondWith(
            caches.open(CACHE_NAME).then(function (cache) {
                return fetch(event.request).then(function (response) {
                    cache.put(event.request.url, response.clone());
                    return response;
                })
            })
        );
    } else {
        event.respondWith(
            caches.match(event.request, {ignoreSearch: true}).then(function (response) {
                return response || fetch(event.request);
            })
        )
    }

});

self.addEventListener("activate", function (event) {
    event.waitUntil(
        caches.keys().then(function (cacheNames) {
            return Promise.all(
                cacheNames.map(function (cacheName) {
                    if (cacheName != CACHE_NAME) {
                        console.log("ServiceWorker: cache " + cacheName + " dihapus");
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

self.addEventListener('push', function (event) {
    var body;

    if (event.data) {
        body = event.data.text();
    } else {
        body = 'Push message no payload';
    }

    var options = {
        body: body,
        icon: 'img/notification.png',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        }
    };
    event.waitUntil(
        self.registration.showNotification('Push Notification', options)
    );
    
});