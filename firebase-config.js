// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { collection } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDIgjjK4QK3dHjeBMvv_W05S1Zvii4_A4g",
  authDomain: "ptud-aa0c7.firebaseapp.com",
  databaseURL: "https://ptud-aa0c7-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "ptud-aa0c7",
  storageBucket: "ptud-aa0c7.appspot.com",
  messagingSenderId: "550217081655",
  appId: "1:550217081655:web:77e2a1eea5abe32b74b0b2",
  measurementId: "G-3N4E5B889M"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);

export const orderRef = collection(db,"Orders");


