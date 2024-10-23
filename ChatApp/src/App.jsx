// import React, { useEffect } from "react";
// import AboutList from "./Components/AboutList/AboutList";
// import ChatBox from "./Components/ChatBox/ChatBox";
// import UserInfo from "./Components/UserInfo/UserInfo";

// import "./style/commonStyles.css";
// import "./style/LoaderStyle.css";
// import Login_Register from "./Components/login&Register/Login_Register";
// import { onAuthStateChanged } from "firebase/auth";
// import { auth } from "./lib/firebase_init";
// import { useUserStore } from "./lib/useUserStore";
// import { useChatStore } from "./lib/useChatStore";
// import { doc, getDoc } from "firebase/firestore";
// import { create } from "zustand";
// import { db } from "./firebase_init";

// function App() {
//   const { currentUser, isLoading } = useUserStore();
//   console.log("➡ ~ App ~ currentUser:", currentUser);
//   const { chatId } = useChatStore();
//   console.log("➡ ~ App ~ chatId:", chatId);

//   useEffect(() => {
//     const unSub = onAuthStateChanged(auth, (user) => {
//       console.log(user);
//       create((set) => ({
//         fetchUserData: async (user?.uid) => {
//           if (!uid) {
//             return set({ currentUser: null, isLoading: false });
//           }

//           try {
//             const docRef = doc(db, "users", uid);
//             const docSnap = await getDoc(docRef);

//             if (docSnap.exists()) {
//               console.log("Document data :", docSnap.data());
//               set({ currentUser: docSnap.data(), isLoading: false });
//             } else {
//               set({ currentUser: null, isLoading: false });
//             }
//           } catch (error) {
//             console.log(error);
//             return set({ currentUser: null, isLoading: false });
//           }
//         }
//       }));
//     });
//     return () => {
//       unSub();
//     };
//   }, [fetchUserData]);

//   if (isLoading) {
//     return (
//       <div>
//         <div className="loader"></div>
//       </div>
//     );
//   }
//   if (chatId) return <Login_Register />;
//   return (
//     <div className="sm:container mx-auto bg-backdrop min-h-[100vh] sm:min-h-[640px] w-[98vw] lg:w-[85vw] p-2">
//       {
//         <section className="min-h-[inherit] w-full flex ">
//           <AboutList className="flex-1" />
//           {<ChatBox className="flex-[2] border-l border-r" />}
//           {<UserInfo className="flex-1" />}
//         </section>
//       }
//     </div>
//   );
// }

// export default App;

import { useEffect } from "react";
import AboutList from "./Components/AboutList/AboutList";
import ChatBox from "./Components/ChatBox/ChatBox";
import UserInfo from "./Components/UserInfo/UserInfo";

import "./style/commonStyles.css";
import "./style/LoaderStyle.css";
import Login_Register from "./Components/login&Register/Login_Register";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "./lib/firebase_init";
import { useUserStore } from "./lib/useUserStore";
import { useChatStore } from "./lib/useChatStore";
import { doc, getDoc } from "firebase/firestore";

function App() {
  const { currentUser, isLoading, setUser, setIsLoading } = useUserStore(); // Access Zustand methods
  const { chatId } = useChatStore();

  console.log("➡ ~ App ~ currentUser:", currentUser);
  console.log("➡ ~ App ~ chatId:", chatId);

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, async (user) => {
      setIsLoading(true); // Start loading when auth state changes
      if (user) {
        const uid = user.uid;
        try {
          const docRef = doc(db, "users", uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            setUser(docSnap.data()); // Set user data in Zustand store
          } else {
            setUser(null); // Set null if user data doesn't exist
          }
        } catch (error) {
          console.log(error);
          setUser(null); // Set null on error
        }
      } else {
        setUser(null); // If no user is authenticated
      }
      setIsLoading(false); // Stop loading after processing
    });

    return () => {
      unSub(); // Cleanup subscription on component unmount
    };
  }, [setUser, setIsLoading]);

  if (isLoading) {
    return (
      <div>
        <div className="loader"></div>
      </div>
    );
  }

  if (!currentUser) return <Login_Register />;

  if (!isLoading)
    return (
      <div className="sm:container mx-auto bg-backdrop min-h-[100vh] sm:min-h-[640px] w-[98vw] lg:w-[85vw] p-2">
        <section className="min-h-[inherit] w-full flex ">
          <AboutList className="flex-1" />
          <ChatBox className="flex-[2] border-l border-r" />
          <UserInfo className="flex-1" />
        </section>
      </div>
    );
}

export default App;
