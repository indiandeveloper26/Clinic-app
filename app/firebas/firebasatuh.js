// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyDbyB6eMCs5PUG5zsw_PIHrAVRjwu7l6nI",
    authDomain: "clinic-booking-9131f.firebaseapp.com",
    projectId: "clinic-booking-9131f",
    storageBucket: "clinic-booking-9131f.firebasestorage.app",
    messagingSenderId: "626664858892",
    appId: "1:626664858892:web:5a1b8ce6dedff0310c5529",
    measurementId: "G-60WL91K366"
};

const app = initializeApp(firebaseConfig);

// ✅ Analytics client-side safe
let analytics;
if (typeof window !== "undefined") {
    isSupported().then(supported => {
        if (supported) {
            analytics = getAnalytics(app);
        }
    });
}

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
export { analytics }; // optional export
export default app;
