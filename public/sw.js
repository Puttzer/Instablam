const staticCacheName = "static-files";
const assets = ["/", "/index.html", "/offline.html"];


// This part installs the service worker
self.addEventListener("install", (evt) => {
  console.log(self);
  self.skipWaiting();
  console.log(evt);
  console.log("SW installed at: ", new Date().toLocaleTimeString());
  evt.waitUntil(
    caches.open(staticCacheName).then((cache) => {
      cache.addAll(assets);
    })
  );
});
// Activating the Service worker
self.addEventListener("activate", (event) => {
  self.skipWaiting();
  console.log("SW activated at: ", new Date().toLocaleTimeString());
});
// Fetching the Service Worker
self.addEventListener("fetch", (evt) => {
  console.log(evt.request.url);
  if (!navigator.onLine) {
    evt.respondWith(
      caches.match(evt.request).then((response) => {
        console.log("RESPONSE: ", response);
        if (response) {
          return response;
        } else {
          return caches.match(new Request("offline.html"));
        }
      })
    );
  } else {
    console.log("IM ALIVE!");
    if (evt.request.method === "GET") {
      return updateCache(evt.request);
    } else {
      return fetch(evt.request);
    }
  }
});

//LListening for Pushnotifications and logs out if successfully sent
self.addEventListener("push", (event) => {
  console.log("Push notification Sent!");
  if (event.data) {
    createNotification(event.data.text());
  }
});

// Creates a notification with the notification API
const createNotification = (text) => {
  self.registration.showNotification("You got a push!", {
    body: text,
    icon: "./images/icons/icon192x192.png",
  });
};

// Hey scotty!
//Caches man!
function updateCache(request) {
  return fetch(request).then((response) => {
    if (response) {
      return caches.open(staticCacheName).then((cache) => {
        return cache.put(request, response.clone()).then(() => {
          return response;
        });
      });
    }
  });
}
