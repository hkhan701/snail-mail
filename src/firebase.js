import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD7Nz1boyazFLwtS8rnf27ROIbnL5w_SvI",
  authDomain: "snailmail-33588.firebaseapp.com",
  projectId: "snailmail-33588",
  storageBucket: "snailmail-33588.appspot.com",
  messagingSenderId: "166287589177",
  appId: "1:166287589177:web:36d83e3f9ac15414b532e8"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();