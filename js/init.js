// service worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
        navigator.serviceWorker.register('./serviceWorker.js').then(function () {
            console.log('Pendaftaran serviceWorker berhasil')
        }).catch(function () {
            console.log('Pendaftaran serviceWorker gagal');
        })
    })
} else {
    console.log('Browser tidak mendukung serviceWorker');
}

function requestPermission() {
// notification API
if ('Notification' in window) {
    Notification.requestPermission().then( perm => {
        if (perm == 'denied') {
            return
        }else if(perm == 'default'){
            return
        }
    })
}

// push notification API
if ('PushManager' in window) {
    navigator.serviceWorker.getRegistration().then( regis => {
        regis.pushManager.subscribe({
            userVisibleOnly : true,
            applicationServerKey : urlBase64ToUint8Array("BPwY8xrrJ8QirLZIC3ky7QejJevyNYtqeumf11o-p8PJm0vllnBFd4jMquHq4fI0g04_wDuRaeNRENlu-FtT0H4")
        }).then(subscribe=>{
            console.log('Berhasil melakukan subscribe dengan endpoin : ',subscribe.endpoint);
            console.log('Berhasil melakukan subscribe dengan p265dh key : ',btoa(String.fromCharCode.apply(null,new Uint8Array(subscribe.getKey('p256dh')))));
            console.log('Berhasil melakukan subscribe dengan auth key : ',btoa(String.fromCharCode.apply(null,new Uint8Array(subscribe.getKey('auth')))));
        }).catch( err => {
            console.log('Subscribe error : ' +err.message)
        })
    }).catch(e => {
        console.log('Push manager error : '+ e);
    })
}

function urlBase64ToUint8Array(base64String) {
    const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding)
      .replace(/-/g, "+")
      .replace(/_/g, "/");
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }
}