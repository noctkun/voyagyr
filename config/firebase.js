// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { collection, getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyASymu-3KD_pNGAd7NJZd4q7lCn-biag38",
  authDomain: "voyagyr-6019f.firebaseapp.com",
  projectId: "voyagyr-6019f",
  storageBucket: "voyagyr-6019f.firebasestorage.app",
  messagingSenderId: "486214143076",
  appId: "1:486214143076:web:e42e06f497c31b7deee371"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

export const tripsRef = collection(db, 'trips');
export const expensesRef = collection(db, 'expenses');

export default app;