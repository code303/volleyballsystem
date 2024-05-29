self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open('my-cache').then(function(cache) {
            return cache.addAll([
                '/favicon.png',
                '/icon_144x144.png',
                '/icon_168x168.png',
                '/icon_192x192.png',
                '/icon_48x48.png',
                '/icon_72x72.png',
                '/icon_96x96.png',
                '/index.html',
                '/index.js',
                '/manifest.json',
                '/p1.png',
                '/p2.png',
                '/p3.png',
                '/p4.png',
                '/p5.png',
                '/p6.png',
                '/positions_team_default.json',
                '/style.css',
                '/sw.js',
                '/team_default.json'
            ]);
        })
    );
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
      caches.match(event.request)
       .then(function(response) {
          // Cache hit - return response
          if (response) {
            return response;
          }
          return fetch(event.request).then(
            function(response) {
              // Check that we're okay with cloning the response
              if (!response || response.status!== 200 || response.type!== 'basic') {
                return response;
              }
  
              var responseToCache = response.clone();
              caches.open('my-cache')
               .then(function(cache) {
                  cache.put(event.request, responseToCache);
                });
  
              return response;
            }
          );
        })
    );
  });