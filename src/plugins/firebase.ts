import Vue from 'vue';
import firebase from 'firebase/app';
import 'firebase/auth'
import {LoginState} from "src/store/modules/user";
import store from "@/store/index";
import Login from "@/script/login";
import 'firebase/messaging'


const firebaseConfig = {
    apiKey: "AIzaSyAXt32ipLLoSlyijdCKAMSpapooo7wbTTE",
    authDomain: "zempie.firebaseapp.com",
    databaseURL: "https://zempie.firebaseio.com",
    projectId: "zempie",
    storageBucket: "zempie.appspot.com",
    messagingSenderId: "235654438895",
    appId: "1:235654438895:web:03bb6a5b89826f37c9601a",
    measurementId: "G-Z3JMFZBKM3"
};

const dev_firebaseConfig = {
    apiKey: "AIzaSyAE2WeLg2L9n2niQMysGbXzACLNIXd5msE",
    authDomain: "zempie-dev.firebaseapp.com",
    projectId: "zempie-dev",
    storageBucket: "zempie-dev.appspot.com",
    messagingSenderId: "797641160577",
    appId: "1:797641160577:web:3c10f8e96f7827d2645a80",
    measurementId: "G-NFY628EX60"
};

// let firebaseInitStartTime = Date.now();
firebase.initializeApp(process.env.VUE_APP_FIRESTORE_CONFIG === 'development' ? dev_firebaseConfig : firebaseConfig);
firebase.auth().onAuthStateChanged(Login.autoLogin);

// export {
//     firebaseInitStartTime
// }

/* FCM */
//
// const messaging = firebase.messaging()
//
// Notification.requestPermission()
//     .then((permission) => {
//         console.log('permission ', permission)
//         if (permission !== 'granted') {
//             alert('알림을 허용해주세요')
//         }
//     })
//
// messaging.getToken({vapidKey: 'BFUXVse06AIo0oFfqIKbuNtBw0VXf4F4VffsPp1Oe4J9L0qpsYiojByk3Lm_zUXwtv392IbIqHiR25UnWSLc5NA'}).then((currentToken) => {
//     if (currentToken) {
//         store.commit('fcmToken', currentToken)
//         // Send the token to your server and update the UI if necessary
//         // ...
//     }
//     else {
//         // Show permission request UI
//         console.log('No registration token available. Request permission to generate one.');
//         // ...
//     }
// }).catch((err) => {
//     console.log('An error occurred while retrieving token. ', err);
//     // ...
// });
//
//
// // Handle received push notification at foreground
// messaging.onMessage(payload => {
//     console.log('Message received. ', payload);
// })

/* FCM */
