import { FirebaseApp, initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth"; 
import { Firestore, getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCkpeO9Prow406ETbhP7Ncb0pl6raRSEaw",
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
const googleProvider = new GoogleAuthProvider();

export { auth, db, app, googleProvider }; 
