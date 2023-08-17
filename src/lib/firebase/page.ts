import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getAuth, GoogleAuthProvider } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyCgrQU8q0-l34fp5Gx36XrPE6TDnNPgnMs",
  authDomain: "nlogify.firebaseapp.com",
  projectId: "nlogify",
  storageBucket: "nlogify.appspot.com",
  messagingSenderId: "566846349100",
  appId: "1:566846349100:web:68e3dfb7efd38d33c49689",
  measurementId: "G-84R81Z6YKH"
};


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();