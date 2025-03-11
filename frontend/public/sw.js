const CACHE_NAME = "video-cache";

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Cache opened");
      return cache.addAll(["/offline.html"]);
    })
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.url.includes("/video/") && event.request.method === "GET") {
    event.respondWith(
      caches.open(CACHE_NAME).then(async (cache) => {
        const cachedResponse = await cache.match(event.request);
        if (cachedResponse) return cachedResponse;

        return fetch(event.request).then((response) => {
          if (response.ok) {
            cache.put(event.request, response.clone()); // ✅ Cache only if response is OK
          }
          return response;
        });
      })
    );
  }
});

// ✅ Handle video deletion in cache
self.addEventListener("message", async (event) => {
  if (event.data && event.data.action === "DELETE_VIDEO") {
    const cache = await caches.open(CACHE_NAME);
    const cachedRequests = await cache.keys();
    
    // 🔴 Find and delete matching video from cache
    cachedRequests.forEach((request) => {
      if (request.url.includes(event.data.videoUrl)) {
        cache.delete(request);
        console.log("Deleted from cache:", event.data.videoUrl);
      }
    });
  }
});
