import {initializeApp} from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAhj45KzRvY7rvz5qmCjM3VLc7Hc-ZFQtM",
  authDomain: "lighthouse-13921.firebaseapp.com",
  projectId: "lighthouse-13921",
  storageBucket: "lighthouse-13921.firebasestorage.app",
  messagingSenderId: "608562030878",
  appId: "1:608562030878:web:e3e6b056ea252ecc14c10f",
  measurementId: "G-L87BVVR891"
};


const app = initializeApp(firebaseConfig);
export const auth  = getAuth(app);
