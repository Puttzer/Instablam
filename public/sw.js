let cacheName = 'InstablamTime';

var contentToCache = [
  '/offline.html',
];

self.addEventListener('install', (e) => {
    console.log('[Service Worker] Installing');

    self.skipWaiting()

    e.waitUntil(
        caches.open(cacheName).then((cache) => {
            console.log('[Service Worker] Caching static files');
            return cache.addAll(contentToCache);
        })
    );
});

self.addEventListener('activate', (e) => {
    console.log('[Service Worker] Activated');

    // Deletes old cache
    const cacheWhitelist = [cacheName];

    e.waitUntil(
      caches.keys().then(nameOfCaches => {
        return Promise.all(
          nameOfCaches.map(title => {
            if(cacheWhitelist.indexOf(title) === -1) {
              return caches.delete(title)
            }
          })
        )
      })
    )
});

self.addEventListener('fetch', event => {
  // console.log('Fetch event for ', event.request.url);
  event.respondWith(
    caches.match(event.request)
    .then(response => {
      // Returns cached site
      if (response) {
        // console.log('Found ', event.request.url, ' in cache');
        return response;
      }

      //Fetch new
      // console.log('Network request for ', event.request.url);
      return fetch(event.request)


      // Saves the new fetched site in cache
      .then(response => {
        return caches.open(cacheName).then(cache => {
          
          cache.put(event.request.url, response.clone());
          return response;
        });
      });

      // Returns custom offline.html if page is not cached
    }).catch(error => {

      console.log('[Service worker] ', error)
      return caches.match('offline.html')

    })
  );
});