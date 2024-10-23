import { doc, getDoc } from "firebase/firestore";
import { create } from "zustand";
import { db } from "./firebase_init";

export const useUserStore = create((set) => ({
  currentUser: null,
  isLoading: true,
  fetchUserData: async (uid) => {
    if (!uid) {
      return set({ currentUser: null, isLoading: false });
    }

    try {
      const docRef = doc(db, "users", uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log("Document data :", docSnap.data());
        set({ currentUser: docSnap.data(), isLoading: false });
      } else {
        set({ currentUser: null, isLoading: false });
      }
    } catch (error) {
      console.log(error);
      return set({ currentUser: null, isLoading: false });
    }
  }
}));
