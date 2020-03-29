const staticCacheName = "site-static-v2";

const assets = [
    '/',
    '/index.html',
    '/new.css',
    '/svg.css',
    '/svg.js',
    '/map.svg',
    '/app.js',
    "https://cdn.jsdelivr.net/npm/chart.js@2.8.0"
]


self.addEventListener('install',(evt)=>{
    console.log("Service Worker Installed")


    evt.waitUntil(

        caches.open(staticCacheName)
        .then( cache =>{
            console.log("Caching all assets")
            cache.addAll(assets)
        })
    
    )
   

})


self.addEventListener('activate',(evt)=>{
    console.log("Service Worker Activated")
    evt.waitUntil(
        caches.keys().then(keys =>{

            return Promise.all(
                keys.filter( key => key!== staticCacheName)
                .map(key =>caches.delete())
            )

        })
    )
})


self.addEventListener('fetch', evt =>{
  
   evt.respondWith(
       caches.match(evt.request)
       .then( cacheRes =>{
           return cacheRes || fetch(evt.request)
       }).catch((err)=>{
       
       })
   )
})