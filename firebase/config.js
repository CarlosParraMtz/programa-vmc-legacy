import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_APIKEY,
  authDomain: "programavmc.firebaseapp.com",
  projectId: "programavmc",
  storageBucket: "programavmc.appspot.com",
  messagingSenderId: process.env.NEXT_PUBLIC_MSID,
  appId: process.env.NEXT_PUBLIC_APPID,
  measurementId: process.env.NEXT_PUBLIC_MEASID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;

const db = getFirestore(app)
export {db};