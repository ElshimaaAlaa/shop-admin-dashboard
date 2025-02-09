// firebase-config.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAiPxGWocCvIEo4ION9mCzd1uL7UwQ_Vek",
  authDomain: "milestone-website-548db.firebaseapp.com",
  projectId: "milestone-website-548db",
  storageBucket: "milestone-website-548db.firebasestorage.app",
  messagingSenderId: "296089442305",
  appId: "1:296089442305:web:4d5826ca9a990a1dab4800",
  measurementId: "G-G2QZ174514",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
