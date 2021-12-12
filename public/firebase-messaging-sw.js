importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-messaging.js'); // Initialize Firebase var config = { apiKey: "xxxxxx", authDomain: "xxxxxx", projectId: "xxxxxx", storageBucket: "xxxxxx", messagingSenderId: "xxxxxx", }; firebase.initializeApp(config); const messaging = firebase.messaging(); messaging.setBackgroundMessageHandler(function (payload) { const title = "Hello World"; const options = { body: payload.data.status }; return self.registration.showNotification(title, options); });

const config = {
    apiKey: "AIzaSyAE2WeLg2L9n2niQMysGbXzACLNIXd5msE",
    authDomain: "zempie-dev.firebaseapp.com",
    projectId: "zempie-dev",
    storageBucket: "zempie-dev.appspot.com",
    messagingSenderId: "797641160577",
    appId: "1:797641160577:web:3c10f8e96f7827d2645a80",
    measurementId: "G-NFY628EX60"
};
firebase.initializeApp(config);

const messaging = firebase.messaging();
messaging.setBackgroundMessageHandler(function (payload) {

    const title = "Hello World";
    const options = {
        body: payload.data.status
    };

    return self.registration.showNotification(title, options);
});