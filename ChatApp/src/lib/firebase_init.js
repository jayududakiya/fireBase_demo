import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAZ-zbJRAMPs8ISddRYluTeV5S7H4ETLbM",
  authDomain: "chatapp-a1dc1.firebaseapp.com",
  projectId: "chatapp-a1dc1",
  storageBucket: "chatapp-a1dc1.appspot.com",
  messagingSenderId: "474041243472",
  appId: "1:474041243472:web:b931a9ae52d3ad5bf6be55"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
