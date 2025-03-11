const CACHE_NAME = "video-cache";
const VIDEO_CACHE = [];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Cache opened");
      return cache.addAll(["/offline.html"]);
    })
  );
});

self.addEventListener("fetch", (event) => {
    if (event.request.url.includes("/video/")) {
      event.respondWith(
        caches.open(CACHE_NAME).then(async (cache) => {
          const cachedResponse = await cache.match(event.request);
          if (cachedResponse) return cachedResponse;
  
          return fetch(event.request).then((response) => {
            const clonedResponse = response.clone();
            cache.put(event.request, clonedResponse);
            return response;
          });
        })
      );
    }
  });
