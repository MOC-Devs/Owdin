// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
export { app, auth };