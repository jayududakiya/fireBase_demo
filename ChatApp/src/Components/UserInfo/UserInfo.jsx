import React from 'react'

import avatar from '../../assets/user-avatar.png'
import mediaFile from '../../assets/usama-akram-unsplash.jpg'

import '../../style/commonStyles.css'
import { ChevronDown, ChevronUp, Download } from 'lucide-react'
import { useUserStore } from '../../lib/useUserStore'
import { useChatStore } from '../../lib/useChatStore'
import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore'
import { db } from '../../lib/firebase_init'

function UserInfo({className}) {
  const {currentUser} = useUserStore();
  const {chatId , user , isCurrentUserBlocked,
    isReceiverBlocked,changeBlock} = useChatStore()

  const handleBlock = async () =>{
    if(!user) return ;

    const userDocRef = doc(db,"users",currentUser.id)


    try {
      await updateDoc(userDocRef , {
        blocked : isReceiverBlocked ? arrayRemove(user.id) : arrayUnion(user.id),
      });
      changeBlock();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className={`${className} p-2`}>
        <div className='border-b py-3.5'>
           <div className='flex items-center justify-center py-4'>
              <img src={user?.avatar || avatar} alt="avatar" className='block w-36 mx-auto object-cover object-center rounded-full'/>
           </div>
           <p className='flex flex-col items-center justify-center gap-1 text-xl capitalize font-bold'> 
             {user?.userName || ""}
             <span className='text-base font-normal'>
               Lorem ipsum dolor sit amet.
             </span>
           </p>
        </div> 

        <div className='sherd_media_container'>
          {/*  */}
           <div className='sherd_box'>
              <h1 className='sherd_btn'>
                Chat Settings
                <span><ChevronUp size={28} /></span>
              </h1>
              <div>

              </div>
           </div>
           {/*  */}
           <div className='sherd_box'>
           <h1 className='sherd_btn'>
                Privacy & Help
                <span><ChevronUp size={28} /></span>
              </h1>
              <div>

              </div>
           </div>
           {/*  */}
           <div className='sherd_box'>
           <h1 className='sherd_btn'>
                Sherd Photos
                <span><ChevronDown size={28} /></span>
              </h1>
              <div>

              </div>
           </div>
           {/*  */}
           <div className='sherd_box'>
              <h1 className='sherd_btn'>
                Sherd Files 
                <span><ChevronUp size={28} /></span>
              </h1>
              <div className='files_container'>
                <ul className='flex flex-col flex-nowrap items-stretch '>
                  <li className='file_fild'>
                    <img src={mediaFile} alt="" />
                    <p>File Name</p>
                    <button className='ml-auto custom-btn text-[#d8f1ff] bg-violet-500 rounded-md transition-all hover:opacity-55'>
                      <Download size={28} />
                    </button>
                  </li>
                  <li className='file_fild'>
                    <img src={mediaFile} alt="" />
                    <p>File Name</p>
                    <button className='ml-auto custom-btn text-[#d8f1ff] bg-violet-500 rounded-md transition-all hover:opacity-55'>
                      <Download size={28} />
                    </button>
                  </li>
                  <li className='file_fild'>
                    <img src={mediaFile} alt="" />
                    <p>File Name</p>
                    <button className='ml-auto custom-btn text-[#d8f1ff] bg-violet-500 rounded-md transition-all hover:opacity-55'>
                      <Download size={28} />
                    </button>
                  </li>
                </ul>
              </div>
           </div>
        </div>  

        <div className='w-full border-t pt-2'>
          <button onClick={handleBlock} className='flex items-center justify-center text-white bg-red-500 w-full h-10 rounded-xl transition-all hover:bg-red-950'>
            { isCurrentUserBlocked ? "You Are Blocked" : isReceiverBlocked ? "User Blocked" : "Blocked" }
            </button>
        </div>
    </div>
  )
}

export default UserInfo
