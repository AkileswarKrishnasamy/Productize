// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {addDoc, collection, setDoc,getFirestore,doc, onSnapshot} from 'firebase/firestore'
import 'firebase/firestore';
import {getAuth} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAlD3D7TVUsFExDULE8kHkXCBStDffxIs8",
  authDomain: "learn-firebase-c3505.firebaseapp.com",
  projectId: "learn-firebase-c3505",
  storageBucket: "learn-firebase-c3505.appspot.com",
  messagingSenderId: "940014854520",
  appId: "1:940014854520:web:e6f7bf8fc739af4722e88d",
  measurementId: "G-FBRNY95NWL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//get the firestore using the configuration
export const db = getFirestore(app)

export const auth = getAuth(app)
