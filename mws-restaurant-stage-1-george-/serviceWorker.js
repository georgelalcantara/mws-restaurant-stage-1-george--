let cacheVersion = 'v-1';

let cacheAll = [
    './index.html',
    './restaurant.html',
    './css/styles.css',
    './data/restaurants.json',
    './img/1.jpg',
    './img/2.jpg',
    './img/3.jpg',
    './img/4.jpg',
    './img/5.jpg',
    './img/6.jpg',
    './img/7.jpg',
    './img/8.jpg',
    './img/9.jpg',
    './img/10.jpg',
    './js/dbhelper.js',
    './js/main.js',
    './js/restaurant_info.js',
];

self.addEventListener('install', function(e) {
    console.log("SW installed")
    e.waitUntil(caches.open(cacheVersion).then(function(cache) {
            console.log("Caching");
            return cache.addAll(cacheAll);
        })
        .catch(function(error) {
            console.log('Failed ', error);
        })
    );
});

self.addEventListener('activate', function(e) {
    console.log("SW activated")
    e.waitUntil(caches.keys().then(function(names){
            return Promise.all(names.filter(function(name) {
                return name.startsWith('v-') && name !== cacheVersion;})
                .map(function(name){
                    return caches.delete(name);
                })
            );
        })
    );
});

self.addEventListener('fetch', function (e) {
    console.log('SW fetching', e.request.url);
    e.respondWith(
      caches.match(e.request)
      .then(function (r) {
        return r || fetch(e.request)
      .then(function (resp) {
        return caches.open('v-1').then(function (cache) {
          cache.put(e.request, resp.clone());
          console.log('SW new cache', e.request.url);
          return resp;
          });
        });
      })
      .catch(function(error) {
        console.log('SW error', error);
        })
    );
});
