import { useState } from "react";
import "./login&Register.css";
import avatar from "../../assets/panda-avatar.png";
import {
  ErrorToast,
  SuccessToast
} from "../../Components/Common_components/Notification/notification";
import { Toaster } from "react-hot-toast";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "firebase/auth";
import { auth, db } from "../../lib/firebase_init";
import { doc, setDoc } from "firebase/firestore";
import uploadFile from "../../lib/uploadFile";

function Login_Register() {
  const [avatarImg, setAvatarImg] = useState({
    file: null,
    url: ""
  });

  const [isLoading, setIsLoading] = useState(false);

  const handelAvatarImg = (even) => {
    // console.log(even);
    // console.log(even.target.files[0]);
    if (even.target.files[0]) {
      setAvatarImg({
        file: even.target.files[0],
        url: URL.createObjectURL(even.target.files[0])
      });
    }
  };

  // handelRegister
  const handelRegister = async (even) => {
    even.preventDefault();
    const fromData = new FormData(even.target);
    const { userName, email, password } = Object.fromEntries(fromData);

    // start FireBase Add User Function
    try {
      setIsLoading(true);

      // step 01 := create users
      const res = await createUserWithEmailAndPassword(auth, email, password);

      // step 02 := set userAvatar Image
      const imgURL = await uploadFile(avatarImg.file);

      // step 03 := add user Object in db
      // store All the user Info In this db
      await setDoc(doc(db, "users", res.user.uid), {
        userName: userName.toLocaleLowerCase(),
        email,
        avatar: imgURL,
        id: res.user.uid,
        blocked: []
      });

      // step 04 := create new db and add user chats array white uid
      // store All the chats In this db
      await setDoc(doc(db, "usersChats", res.user.uid), {
        chats: []
      });

      // Toasts
      SuccessToast("Account Created SuccessFly... You Can LogIn Now !");
      even.target.reset();
    } catch (error) {
      // Error Handel Section
      console.log(error);
      ErrorToast(error.message);
    } finally {
      // last section of code
      setIsLoading(false);
    }
  };

  // handelLogin
  const handelLogin = async (even) => {
    even.preventDefault();
    const fromData = new FormData(even.target);
    const { email, password } = Object.fromEntries(fromData);
    try {
      setIsLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.log(error);
      ErrorToast(error.message);
    } finally {
      // last section of code
      setIsLoading(false);
    }
    const res = signInWithEmailAndPassword(auth, email, password);
    console.log("➡ ~ handelLogin ~ res:", res);
  };

  return (
    <div className="grid place-items-center min-h-[inherit]">
      <Toaster position="bottom-right" reverseOrder={false} />
      <div className="main">
        <input type="checkbox" id="chk" aria-hidden="true" />

        <div className="login">
          <form className="form" onSubmit={handelLogin}>
            <label htmlFor="chk" aria-hidden="true">
              Log in
            </label>
            <input
              className="input"
              type="email"
              name="email"
              placeholder="Email"
              required
            />
            <input
              className="input"
              type="password"
              name="password"
              placeholder="Password"
              required
            />
            <button type="submit" disabled={isLoading}>
              {isLoading ? "LOADING" : "Log in"}
            </button>
          </form>
        </div>

        <div className="register">
          <form className="form" onSubmit={handelRegister}>
            <label htmlFor="chk" aria-hidden="true" className="chk-in">
              Register
            </label>
            <div className="flex flex-wrap items-center justify-center">
              <img
                src={avatarImg.url || avatar}
                alt="avatar"
                className="block w-[68px] h-[68px] rounded-full object-cover object-center"
              />
              <label
                htmlFor="avatar_Upload"
                className="text-3xl text-black underline hover:no-underline"
              >
                Upload Image
              </label>
              <input
                type="file"
                name="avatar_file"
                onChange={handelAvatarImg}
                className="hidden"
                id="avatar_Upload"
              />
            </div>
            <input
              className="input"
              type="text"
              name="userName"
              placeholder="Username"
            />
            <input
              className="input"
              type="email"
              name="email"
              placeholder="Email"
            />
            <input
              className="input"
              type="password"
              name="password"
              placeholder="Password"
            />
            <button type="submit" disabled={isLoading}>
              {isLoading ? "LOADING" : "Register"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login_Register;
