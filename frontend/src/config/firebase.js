import {initializeApp} from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY || "AIzaSyAL47hd8WeoRhiMg9EcDw9cCRvIXaI3ndY",
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || "lighthouse-test-d4806.firebaseapp.com",
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || "lighthouse-test-d4806",
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET || "lighthouse-test-d4806.firebasestorage.app",
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID || "883544657664",
  appId: process.env.REACT_APP_FIREBASE_APP_ID || "1:883544657664:web:11aea6d96f03b0c6ca6de5",
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID || "G-YNPX68GJP8",
};

const app = initializeApp(firebaseConfig);
export const auth  = getAuth(app);
