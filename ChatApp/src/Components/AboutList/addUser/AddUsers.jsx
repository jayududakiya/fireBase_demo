import React, { useState } from 'react'
import avatar from "../../../assets/user-avatar.png"
import '../../../style/commonStyles.css'
import { arrayUnion, collection, doc, getDocs, query, serverTimestamp, setDoc, updateDoc, where } from 'firebase/firestore'
import { db } from '../../../lib/firebase_init'
import { useUserStore } from '../../../lib/useUserStore'

const AddUsers = () => {
    const [user ,setUser] = useState();
    const {currentUser} = useUserStore();
    const handelSearch = async (even) => {
        even.preventDefault();
        const fromData = new FormData(even.target);
        const userName = fromData.get("userName");
        try {
            const userRef = collection(db,"users");
            const q = query(userRef , where("userName","==",userName.toLocaleLowerCase()));
            const querySnapShot = await getDocs(q);
            
            console.log(querySnapShot.docs[0].data());
            if(!querySnapShot.empty){
                setUser(querySnapShot.docs[0].data())
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handelAddUser = async () => {
        const chatRef = collection(db,"chats");
        const userChatsRef =  collection(db,"usersChats");

        try {
            const newChatRef = doc(chatRef);
            await setDoc(newChatRef,{
                createAt : serverTimestamp(),
                messages : [],
            });
            // user Chats 
            await updateDoc(doc(userChatsRef,user.id),{
                chats:arrayUnion({
                    chatId : newChatRef.id,
                    lastMessage:"",
                    receiverId : currentUser.id,
                    updatedAt : Date.now()
                })
            });

            // our Chats 
            await updateDoc(doc(userChatsRef,currentUser.id),{
                chats:arrayUnion({
                    chatId : newChatRef.id,
                    lastMessage:"",
                    receiverId : user.id,
                    updatedAt : Date.now()
                })
            });

        } catch (error) {
            console.log(error);
        }
    }

  return (
    <div className='absolute bg-gray-900 rounded-lg inset-2/4 -translate-x-2/4 -translate-y-2/4 z-10 border h-[250px] w-[340px] flex items-center justify-center flex-col flex-wrap'>
      <form onSubmit={handelSearch}>
        <input type="search" name="userName" id="searchUser" className="text-lg rounded-lg border bg-transparent text-white px-1.5" placeholder='userName' />
        <button type='submit' className='border ml-auto mr-2 text-base capitalize p-1.5 rounded-xl'>Search</button>
      </form>
      <div className='all-user-container'> 
        {user && <div className='user-fild cursor-pointer mt-2.5'>
            <img src={user.avatar || avatar} alt="avatar" className='user-avatar-img' />
            <p className='user-name_text'>
              {user.userName || "avatar Name "}
              <small className='user_text'>Hello </small>
            </p>
            <button onClick={handelAddUser} className='border ml-auto mr-2 text-base capitalize p-1.5 rounded-xl'>
                add 
            </button>
        </div>}
      </div>
    </div>
  )
}

export default AddUsers
