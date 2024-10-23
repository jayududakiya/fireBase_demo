// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIRE_API_KEY,
  authDomain: process.env.REACT_APP_FIRE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIRE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIRE_STORAGE_BACKET,
  messagingSenderId: process.env.REACT_APP_FIRE_MESSAG_INGSENDER_ID,
  appId: process.env.REACT_APP_FIRE_APP_ID,
  measurementId: process.env.REACT_APP_FIRE_MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
