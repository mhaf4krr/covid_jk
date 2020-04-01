const staticCacheName = "site-static-v11";


const assets = [
    '/covid_jk/',
    '/covid_jk/index.html',
    '/covid_jk/new.css',
    '/covid_jk/svg.css',
    '/covid_jk/svg.js',
    '/covid_jk/map.svg',
    '/covid_jk/app.js',
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
                .map(key =>caches.delete(key))
            )

        })
    )
})


self.addEventListener('fetch', evt =>{
  
   evt.respondWith(
       caches.match(evt.request)
       .then( cacheRes =>{
           return cacheRes || fetch(evt.request)
       })
   )
})
