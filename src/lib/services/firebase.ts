"use client";
import { FirebaseApp, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { Firestore, getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCkpeO9...",
  authDomain: "financefy-f9bd4.firebaseapp.com",
  projectId: "financefy-f9bd4",
  storageBucket: "financefy-f9bd4.firebasestorage.app",
  messagingSenderId: "920336670853",
  appId: "1:920336670853:web:eff69bb8915a3d4dd689ec",
  measurementId: "G-6SWQ351X0K"
};

const app: FirebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db: Firestore = getFirestore(app);

export { auth, db, app };
