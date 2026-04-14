// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD7QTxAYV3BDsQGohDrhE0mUuL84V9P4ns",
  authDomain: "saga-mobile-8e1b6.firebaseapp.com",
  projectId: "saga-mobile-8e1b6",
  storageBucket: "saga-mobile-8e1b6.firebasestorage.app",
  messagingSenderId: "1098877331398",
  appId: "1:1098877331398:web:527bce0283cb191fb374c7",
  measurementId: "G-LTX8NLR94P"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);