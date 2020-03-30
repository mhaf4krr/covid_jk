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


let deferredPrompt;
const addBtn = document.querySelector('.installBtn');
addBtn.style.display = 'none';

window.addEventListener('beforeinstallprompt', (e) => {
    // Prevent Chrome 67 and earlier from automatically showing the prompt
    e.preventDefault();
    // Stash the event so it can be triggered later.
    deferredPrompt = e;
    // Update UI to notify the user they can add to home screen
    addBtn.style.display = 'inline';
  
    addBtn.addEventListener('click', (e) => {
      // hide our user interface that shows our A2HS button
      addBtn.style.display = 'none';
      // Show the prompt
      deferredPrompt.prompt();
      // Wait for the user to respond to the prompt
      deferredPrompt.userChoice.then((choiceResult) => {
          if (choiceResult.outcome === 'accepted') {
            console.log('User accepted the A2HS prompt');
          } else {
            console.log('User dismissed the A2HS prompt');
          }
          deferredPrompt = null;
        });
    });
  });


  