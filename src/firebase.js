import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD7Nz1boyazFLwtS8rnf27ROIbnL5w_SvI",
  authDomain: "snailmail-33588.firebaseapp.com",
  projectId: "snailmail-33588",
  storageBucket: "snailmail-33588.appspot.com",
  messagingSenderId: "166287589177",
  appId: "1:166287589177:web:36d83e3f9ac15414b532e8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);
const db = getFirestore(app);

export {auth, storage, db};

