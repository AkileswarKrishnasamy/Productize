// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {addDoc, collection, setDoc,getFirestore,doc, onSnapshot} from 'firebase/firestore'
import 'firebase/firestore';
import {getAuth} from 'firebase/auth'

//YOUR FIREBASE CONFIGURATION HERE

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//get the firestore using the configuration
export const db = getFirestore(app)

export const auth = getAuth(app)
