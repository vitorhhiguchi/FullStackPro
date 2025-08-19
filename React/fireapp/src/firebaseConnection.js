import { initializeApp } from "firebase/app"
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyB00i8c_OALxnJx56oGnV8r0pkZGRNh0h0",
  authDomain: "curso-4f9b3.firebaseapp.com",
  projectId: "curso-4f9b3",
  storageBucket: "curso-4f9b3.firebasestorage.app",
  messagingSenderId: "820150592710",
  appId: "1:820150592710:web:143a0eafc7929f83b8a3c7",
  measurementId: "G-M8LWHMMP5C"
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

export { db, auth };