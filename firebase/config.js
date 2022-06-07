import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDkR0VszBS9CQl21qji3GRgIVhnWVM6VGc",
  authDomain: "programa-vmc.firebaseapp.com",
  projectId: "programa-vmc",
  storageBucket: "programa-vmc.appspot.com",
  messagingSenderId: "156679315806",
  appId: "1:156679315806:web:6f0872f2a80f78df30afcf",
  measurementId: "G-B5S2QDLFP2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;