// Firebase SDK ইমপোর্ট করা (CDN এর মাধ্যমে)
importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-messaging-compat.js');


// Firebase ইনিশিয়ালাইজ করা
firebase.initializeApp(firebaseConfig);

// Messaging অবজেক্ট তৈরি
const messaging = firebase.messaging();

// ব্যাকগ্রাউন্ডে নোটিফিকেশন হ্যান্ডেল করার জন্য
messaging.onBackgroundMessage((payload) => {
    console.log('[firebase-messaging-sw.js] ব্যাকগ্রাউন্ড মেসেজ পাওয়া গেছে: ', payload);

    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: payload.notification.icon || '/firebase-logo.png' // আপনার অ্যাপ লোগোর পাথ
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});
