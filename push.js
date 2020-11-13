const webPush = require("web-push");

const vapidKeys = {
    publicKey : "BPwY8xrrJ8QirLZIC3ky7QejJevyNYtqeumf11o-p8PJm0vllnBFd4jMquHq4fI0g04_wDuRaeNRENlu-FtT0H4",
    privateKey : "QGTfWCmqA72r-GuB8gv8Px-krMsOuB6ZwWjJTjhvx8I"
}
const subscription = {
    endpoint : "",
    keys : {
        p256dh : "",
        auth : ""
    }
}
const options = {
    gcmAPIKey : "490016331585",
    TTL : 60
}
webPush.setVapidDetails('mailto:rajaikhsanhalomoan@gmail.com',vapidKeys.publicKey,vapidKeys.privateKey)

let payloads = "Selamat, push notification berhasil di gunakan!"

webPush.sendNotification(
    subscription,
    payloads,
    options
)