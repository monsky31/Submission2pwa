const CACHE_NAME = 'Football-v1'
const urlToCache = [
    '/',
    '/index.html',
    '/nav.html',
    '/manifest.json',
    '/serviceWorker.js',
    '/pages/fav-team.html',
    '/pages/home.html',
    '/pages/match.html',
    '/pages/team.html',
    '/pages/about-me.html',
    '/css/materialize.css',
    '/css/style.css',
    '/assets/icons/soccer-72.png',
    '/assets/icons/soccer-192.png',
    '/assets/icons/soccer-512.png',
    '/js/api.js',
    '/js/DB.js',
    '/js/functions.js',
    '/js/idb.js',
    '/js/init.js',
    '/js/materialize.js',
    '/js/script.js',
    'https://fonts.googleapis.com/css2?family=Poppins:wght@500&display=swap'
]
const base_url = 'https://api.football-data.org/v2'

// * Install
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll(urlToCache)
        })
    )
})

// * Fetch
self.addEventListener("fetch", function (event) {
    event.respondWith(
      caches
      .match(event.request, {
        cacheName: CACHE_NAME
      })
      .then(function (response) {
        if (response) {
          console.log("ServiceWorker: Gunakan aset dari cache: ", response.url);
          return response;
        }
  
        console.log(
          "ServiceWorker: Memuat aset dari server: ",
          event.request.url
        );
        return fetch(event.request);
      })
    );
  });
  

// *Delete
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then( cacheNames => {
            return Promise.all(
                cacheNames.map( cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('cache '+cacheName+' dihapus')
                        return caches.delete(cacheName)
                    }
                })
            )
        })
    )
})

// * Push Notif
self.addEventListener('push', event => {
    console.log(event);
    let body;
    if (event.data) {
        body = event.data.text()
    }else{
        body = "push message no payload"
    }

    let opt ={
        body,
        icon : './assets/icons/soccer-512.png',
        vibrate : [100,50,100],
        data : {
            dateOfArrival : Date.now(),
            primaryKey : 1
        }
    }

    event.waitUntil(
        self.registration.showNotification('Push notification',opt)
    )
})