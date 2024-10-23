import React, { useEffect, useRef, useState } from "react";
import avatar from "../../assets/user-avatar.png";
import imgFile from "../../assets/usama-akram-unsplash.jpg";
import "./chatbox.css";

import {
  Camera,
  Image,
  Info,
  Mic,
  Phone,
  SendHorizontal,
  SmilePlus,
  Video,
} from "lucide-react";

import EmojiPicker from "emoji-picker-react";

import { arrayUnion, doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";

import { useUserStore } from "../../lib/useUserStore";
import { useChatStore } from "../../lib/useChatStore";
import { db } from "../../lib/firebase_init";
import uploadFile from "../../lib/uploadFile";

// ============================== main FUNCTION

function ChatBox({ className }) {
  const { currentUser } = useUserStore();
  const {chatId , user , isCurrentUserBlocked,
    isReceiverBlocked,changBlock} = useChatStore();
  // For EMOJI
  const [open, setOpen] = useState(false);
  // for TEXT fild
  const [text, setText] = useState("");
  // for chats
  const [chats, setChats] = useState();
  // for img
  const [img, setImg] = useState({
    file : null,
    url : "",
  });
  // for imgUrl
  // const [imgUrl, setImgUrl] = useState(null);

  const handleEmoji = (even) => {
    setText((prevVal) => prevVal + even.emoji);
    setOpen(false);
  };

  // endScroll
  const endScroll = useRef(null)

  useEffect(()=>{
    endScroll?.current.scrollIntoView({behavior: 'smooth'})
  },[chatId,currentUser,chats])

  // fetch data 
  useEffect(()=>{
    const unSub = onSnapshot(
      doc(db,"chats",chatId),
      (res)=>{
        setChats(res.data());
      }
    );

    return ()=> {
      unSub();
    }
  },[chatId,user])

  const handelImg = (even) => {
    if(even.target.files[0]){
      setImg({
        file :even.target.files[0],
        url:URL.createObjectURL(even.target.files[0])
      })
      // uploadFile(img.file)
      // setImgUrl(async ()=> await uploadFile(img.file))
    }
  }

  // send message in chat box FUNCTION
  const handleSend = async () => {
    if (text === "") return;
    let imgUrl = null;
    try {

      if(img.file){
        imgUrl = await uploadFile(img.file)
      }
      
      await updateDoc(doc(db, "chats", chatId), {
        messages: arrayUnion({
          senderId: currentUser.id,
          text,
          createdAt: new Date(),
          ...(imgUrl && {img : imgUrl}),
        }),
      });

      //

      const userIDs = [currentUser.id, user.id];

      userIDs.forEach(async (id) => {
        const userChatRef = doc(db, "usersChats", id);
        const userChatsSnapshot = await getDoc(userChatRef);

        if (userChatsSnapshot.exists()) {
          const userChatsData = userChatsSnapshot.data();

          const chatIndex = userChatsData.chats.findIndex(
            (c) => c.chatId === chatId
          );

          userChatsData.chats[chatIndex].lastMessage = text;
          userChatsData.chats[chatIndex].isSeen = id === currentUser.id ? true : false;
          userChatsData.chats[chatIndex].updateAt = Date.now();

          await updateDoc(userChatRef, {
            chats: userChatsData.chats,
          });
        }
      });


    } catch (error) {
      console.log(error);
    }

    setImg({
      file:null,
      url:"",
    })
    setText("")

  };

  return (
    <div className={`${className} chat flex flex-col`}>
      <div className="top  flex items-stretch justify-between p-3 border-b">
        <div className="user flex justify-start items-stretch gap-3">
          <img
            src={ user?.avatar || avatar}
            alt="avatar"
            className="block rounded-full h-14 object-cover object-center"
          />
          <div className="user_desc text-slate-300 flex flex-col items-start justify-center ">
            <p className="font-semibold text-lg">{user?.userName || ""}</p>
            <span className="text-sm ">Lorem ipsum dolor sit amet.</span>
          </div>
        </div>
        <ul className="user_icons flex flex-wrap items-center justify-center gap-3 ">
          <li>
            <button className="text-slate-200 transition-all hover:text-violet-900">
              <Phone />
            </button>
          </li>
          <li>
            <button className="text-slate-200 transition-all hover:text-violet-900">
              <Video />
            </button>
          </li>
          <li>
            <button className="text-slate-200 transition-all hover:text-violet-900">
              <Info />
            </button>
          </li>
        </ul>
      </div>
      {/*  */}
      <div className="center flex-[400px] px-2 flex flex-col justify-center gap-y-6">
  

        {/* new Message */}
        {chats?.messages?.map((message)=>{
          // console.log(message);
          return(
            <div className={`${message.senderId === currentUser.id ? "own-message" : ""} message flex max-w-[70%] items-start gap-3`} key={message?.createdAt}>
            {message.senderId !== currentUser.id ?<img src={user?.avatar || avatar} alt=""   className="block rounded-full h-10 object-cover object-center"/> : null }
            <div className="texts flex flex-col gap-y-2 text-slate-900 text-base capitalize">
              {message.img && <img
                src={message.img}
                alt="..."
                className="block object-cover object-center rounded-lg"
              />}
              <p className="border-b pb-1.5">
                {message.text}
              </p>
              {/* <span>1 min ago</span> */}
            </div>
          </div>
          )
        })}
      {img.url && 
      <div className="message own-message">
          <div className="texts">
            <img src={img.url} alt="...." />
          </div>
        </div>}
        {/*  */}
        <div  ref={endScroll} className="end_scroll"></div>
      </div>
      {/*  */}
      <div className="bottom  flex mt-auto flex-wrap items-center border-t gap-3 px-1 py-2">
        <ul className="button_icons flex flex-1 flex-wrap items-stretch justify-center gap-3">
          <li>
            <label disabled={isCurrentUserBlocked || isReceiverBlocked} htmlFor="imgFile" className="text-slate-200 transition-all hover:text-violet-900 disabled:cursor-not-allowed">
              <Image />
            </label>
            <input  type="file" onChange={handelImg} name="imgFile" id="imgFile" className="hidden" />
          </li>
          <li>
            <button className="text-slate-200 transition-all hover:text-violet-900">
              <Camera />
            </button>
          </li>
          <li>
            <button className="text-slate-200 transition-all hover:text-violet-900">
              <Mic />
            </button>
          </li>
        </ul>
        <input
          type="text"
          value={text}
          disabled={isCurrentUserBlocked || isReceiverBlocked}
          className="flex flex-[3] w-full h-9 rounded-lg bg-transparent border outline-none px-2.5 disabled:border-red-800 disabled:cursor-not-allowed"
          onChange={(even) => setText(even.target.value)}
          placeholder="Text Message..."
        />
        <ul className="flex flex-1 flex-wrap items-center justify-center gap-3">
          <li className="relative">
            <button
              className="text-slate-200 transition-all hover:text-violet-900"
              onClick={() => setOpen((prev) => !prev)}
            >
              <SmilePlus />
            </button>
            <div className="absolute bottom-5 -translate-x-2/4 -translate-y-2/4">
              <EmojiPicker
                open={open}
                reactionsDefaultOpen={true}
                onEmojiClick={handleEmoji}
              />
            </div>
          </li>
          <li>
            <button onClick={handleSend} disabled={isCurrentUserBlocked || isReceiverBlocked} className="bg-violet-700 text-slate-200 px-4 py-1 rounded-lg transition-all hover:text-violet-900 hover:bg-slate-300 disabled:cursor-not-allowed disabled:bg-red-500">
              <SendHorizontal />
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default ChatBox;
