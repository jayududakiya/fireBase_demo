import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const apiKey = import.meta.env.VITE_API_KEY;
const appId = import.meta.env.VITE_APP_ID;

const firebaseConfig = {
  apiKey: apiKey,
  authDomain: "chatapp-a1dc1.firebaseapp.com",
  projectId: "chatapp-a1dc1",
  storageBucket: "chatapp-a1dc1.appspot.com",
  messagingSenderId: "474041243472",
  appId: appId
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
