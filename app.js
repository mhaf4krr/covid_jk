if('serviceWorker' in navigator){
    navigator.serviceWorker.register('/sw.js')
    .then((reg)=> console.log("service worker registered"))
    .catch((err)=> console.log("service worker failed"))
}



function showNoInternet(){
    let msg = document.querySelector(".no-internet")
    msg.style.display = "block"
}

function internetBack(){
    let msg = document.querySelector(".no-internet")
    msg.style.display = "none"
}

window.addEventListener("DOMContentLoaded",()=>{
    let current_status = navigator.onLine ? "online" : "offline"
    if(current_status == "offline"){
        showNoInternet
    }
})

window.addEventListener("online",internetBack)
window.addEventListener("offline",showNoInternet)