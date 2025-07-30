// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth,connectAuthEmulator} from "firebase/auth";
import { getFirestore,connectFirestoreEmulator } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCR1Cw7V6ZThlz7Cl9-TH_mTOt5Aw2neMo",
  authDomain: "owdin-moc-devs.firebaseapp.com",
  projectId: "owdin-moc-devs",
  storageBucket: "owdin-moc-devs.firebasestorage.app",
  messagingSenderId: "725998390921",
  appId: "1:725998390921:web:ce1d9af71b2cf0f2430058",
  measurementId: "G-NPF55TS80E"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Only connect emulators locally
const env = import.meta.env.VITE_ENV

if (env=="LOCAL" && window.location.hostname === "localhost") {
  connectAuthEmulator(auth, "http://localhost:9099");
  connectFirestoreEmulator(db,"http://localhost:8080")
}

export { app, auth, db };