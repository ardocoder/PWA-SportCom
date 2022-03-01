var webPush = require('web-push');

var pushSubscription = {
    "endpoint": "https://fcm.googleapis.com/fcm/send/e9L-PTnvqpo:APA91bH_2EnLlPRtzOfCyYGggNUPvSGizMs-qPjf9K79T6jh7Ib0YawaX8PrbLCEU8FWpnXlVcVHQPcvYWkzDTbrkNtc1SlUgp0KdXMB29ZYowQwewULz_oKGis9Smo7V28tuNuGzs3b",
    "keys": {
        "p256dh": "BOKgWfuc986EmtXkDArlqUkezVDwolIuAiBVBjc6+nnrDDuHeM2gRbD742igjCXRkrfAJwrkk/h9dXy43vIm3v8=",
        "auth": "RpmV66gd9zOEoO9qZS1tqA=="
    }
};

var payload = 'Here is a playload!';

var options = {
    gcmAPIKey: 'AAAAdjanIz8:APA91bGAoZyYtdRcHJJOjRwbBDd1XJTxl0Ry_qhk1K6SyRqtFiQA93vYEjshxcC4GocDLx5c93H5IIQf0no4olvMwP_HRjKw2sFZ_0vW85y0a_3FneP728GWOMM8Dw6MZ3r2KUHQHQuX',
    TTL: 60
};

webPush.sendNotification(
    pushSubscription,
    payload,
    options
);