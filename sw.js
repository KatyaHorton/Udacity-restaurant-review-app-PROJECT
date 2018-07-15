const staticCache= '';

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(staticCache)
      .then(cache => {
        return cache.addAll([
          '/index.html',
          // '/restaurant.html',
          '/css/styles.css',
          '/js/dbhelper.js',
          '/js/register_sw.js',
          '/js/main.js',
          '/js/restaurant_info.js',
          '/data/restaurants.json',
          '/restaurant.html?id=1',
          '/restaurant.html?id=2',
          '/restaurant.html?id=3',
          '/restaurant.html?id=4',
          '/restaurant.html?id=5',
          '/restaurant.html?id=6',
          '/restaurant.html?id=7',
          '/restaurant.html?id=8',
          '/restaurant.html?id=9',
          '/restaurant.html?id=10',
        ]).catch(error => {
          console.log('Caches open failed: ' + error);
        });
      })
  );
});



self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request).then(fetchResponse => {
        return caches.open(staticCache).then(cache => {
          cache.put(event.request, fetchResponse.clone());
          return fetchResponse;
        });
      });
    }).catch(error => {
      if (event.request.url.includes('.jpg')) {
        return caches.match('/img/fixed/offline_img1.png');
      }
      return new Response('Not connected to the internet', {
        status: 404,
        statusText: "Not connected to the internet"
      });
    })
  );
});