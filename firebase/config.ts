import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD4nijICWrbUIC9Z0MOJlzijyAkPV6VSPs",
  authDomain: "playgroundscout-f93c3.firebaseapp.com",
  projectId: "playgroundscout-f93c3",
  storageBucket: "playgroundscout-f93c3.appspot.com",
  messagingSenderId: "797298024576",
  appId: "1:797298024576:web:ba6df91f4f81d8840f0665",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
// const auth = getAuth(app);
const storage = getStorage(app);

export { app, db, storage };