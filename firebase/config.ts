// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD4nijICWrbUIC9Z0MOJlzijyAkPV6VSPs",
  authDomain: "playgroundscout-f93c3.firebaseapp.com",
  projectId: "playgroundscout-f93c3",
  storageBucket: "playgroundscout-f93c3.firebasestorage.app",
  messagingSenderId: "797298024576",
  appId: "1:797298024576:web:ba6df91f4f81d8840f0665",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);