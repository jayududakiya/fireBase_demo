import React, { useEffect, useState } from 'react'
import '../../style/commonStyles.css'
import avatar from '../../assets/user-avatar.png'
import { Bolt, ListCollapse, LogOut, Minus, Plus, Search, Video } from 'lucide-react'
import {useUserStore} from '../../lib/useUserStore'
import { auth, db } from '../../lib/firebase_init'
import { doc, getDoc, onSnapshot, updateDoc } from 'firebase/firestore'
import AddUsers from './addUser/AddUsers'
import { useChatStore } from '../../lib/useChatStore'

const AboutList = ({className}) => {
  const [chats,setChats] = useState([])
  const [clickPlus , setClickPlus] = useState(false)
  const [input,setInput]= useState("");
  const {currentUser} = useUserStore();
  const {changeChat } = useChatStore();


  //usersChats
  useEffect(()=>{
    const unSub =  onSnapshot(
      doc(db, "usersChats", currentUser.id), 
      async (res) => {
      // setChats(res.data())
      // store user chats array  in item 
      const items = res.data().chats;
      const promises = items.map(async(item)=>{
        const userDocRef = doc(db,"users",item.receiverId);
        const userDocSnap = await getDoc(userDocRef)

        const user = userDocSnap.data();

        return {...item,user};
      });

      const chatData = await Promise.all(promises)
      setChats(chatData.sort((a,b)=>b.updatedAt - a.updatedAt))
    });  

    return () =>  {
      unSub();
    }
  },[currentUser.id,chats])

  // console.log("chatData",chats);

  const handelSelect = async (chat) =>{
    const userChatsRef = doc(db, "usersChats", currentUser.id);
        // const userChatsSnapShot = await getDoc(userChatsRef);
        // if (userChatsSnapShot.exists()) {
        //   const userChatsData = userChatsSnapShot.data();

        //   const chatIndex = userChatsData.chats.findIndex(chat => chat.chatId === chatId);

        //   userChatsData.chats[chatIndex].isSeen = true;
  
        //   await updateDoc(userChatsRef, {
        //     chats: userChatsData.chats,
        //   });
        // }
    const userChats = chats.map(item => {
      const {user,...rest}=item;
      return rest;
    });
    const chatIndex = userChats.findIndex(item=>item.chatId === chat.chatId);

    userChats[chatIndex].isSeen = true;

    try {
      await updateDoc(userChatsRef,{
        chats:userChats,
      });
      changeChat(chat.chatId,chat.user);
    } catch (error) {
      console.log(error);
    }

  }

  const filteredChats =  chats.filter((c)=>{
    return c.user.userName.toLowerCase().includes(input.toLowerCase())
  });

  return (
    <div className={`${className} flex-1 p-2.5 flex flex-col items-stretch justify-stretch`}>
      
      {/* User Login Info Fild  */}

      <ul className='flex items-center justify-between border-b pb-2 '>
        <li className='flex items-center gap-3 text-[#d8f1ff]'>
          <img src={currentUser.avatar || avatar} alt="avatar" className='block w-[50px] object-cover rounded-full overflow-hidden' />
          <p className='text-base capitalize font-semibold flex items-start flex-col'>
             {currentUser.userName}
            <small className='text-xs font-light'>Hello I am Active </small>
          </p>
        </li>
        <li className='flex items-center gap-3 text-[#d8f1ff]'>
          <button className='custom-btn'><Video className='icon-size ' /></button>
          <button className='custom-btn'><ListCollapse className='icon-size ' /></button>
          <button className='custom-btn' onClick={()=>auth.signOut()} title='signOut'><LogOut className='icon-size ' /></button>
        </li>
      </ul>

      {/* search box fild */}
      <div className='p-1 flex items-center justify-between mt-4 text-[#d8f1ff]'>
        <label htmlFor="search-box" className='flex items-stretch justify-start p-1 rounded-lg md-backdrop'>
          <span>
            <Search className='icon-size cursor-pointer' />
          </span>
          <input  type="text" name="" onChange={(even)=>setInput(even.target.value)} id="search-box" className='px-1.5 text-base border-none outline-none bg-transparent' placeholder='Search..' />
        </label>
        <button type='button' className='custom-btn border-2 rounded-md hover:border-transparent'  onClick={()=>setClickPlus(prev => !prev)}>
          {clickPlus ?<Minus className='icon-size icon-hover' /> : <Plus className='icon-size' /> } 
        </button>
      </div>

      {/* Show All users */}
      <div className='py-2 mt-4'>
        <ul className='all-user-container'>
        {filteredChats.map((chat)=>{
          return(
            <li className={`${chat?.isSeen ? "" : "bg-green-400 rounded-md"} user-fild cursor-pointer`} key={chat.chatId} onClick={()=>handelSelect(chat)} >
            <img src={chat.user.blocked.includes(currentUser.id) ? avatar  : chat.user.avatar || avatar} alt="avatar" className='user-avatar-img' />
            <p className='user-name_text'>
              {/* {chat.user.userName} */}
              {chat.user.blocked.includes(currentUser.id) ? "User" : chat.user.userName} 
              <small className='user_text'>{chat.lastMessage}</small>
            </p>
          </li>
          )})}
        </ul>
        {clickPlus && <AddUsers/>}
      </div>
    </div>
  )
}

export default AboutList
