importScripts('https://www.gstatic.com/firebasejs/5.5.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/5.5.0/firebase-messaging.js');

firebase.initializeApp({
  apiKey: "AIzaSyCVyfQ9egh3JN_p6o89yoWCZJcVr1AQbos",
  authDomain: "studfood-34f42.firebaseapp.com",
  projectId: "studfood-34f42",
  storageBucket: "studfood-34f42.appspot.com",
  messagingSenderId: "148127920061",
  appId: "1:148127920061:web:87be6a9548d3b8b63a2cd4",
  measurementId: "G-GC12XCJH6Y"
});

const message = firebase.messaging();
