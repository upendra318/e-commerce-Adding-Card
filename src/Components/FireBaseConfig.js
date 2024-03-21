// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAPlsN_0U41obj0EtRuE6-kX7cUFdHNAZI",
  authDomain: "e-commerce-7d7b8.firebaseapp.com",
  projectId: "e-commerce-7d7b8",
  storageBucket: "e-commerce-7d7b8.appspot.com",
  messagingSenderId: "1074903800307",
  appId: "1:1074903800307:web:d451e542272fdadaa45a86",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const database = getAuth(app);
const db = getFirestore(app);

export { database, db };
