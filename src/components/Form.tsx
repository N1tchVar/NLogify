'use client'

import Link from "next/link"
import { useState } from "react"
import { addDoc, collection } from "firebase/firestore"
import { auth, db } from '../lib/fiebase/page'
import { ToastContainer, toast } from "react-toastify"
import { format } from 'date-fns';


const Form = () => {
  const [ title, setTitle ] = useState("");
  const [ postText, setPostText ] = useState("");

  const postCollectionRef = collection(db, "posts")
  const CreatePost = async () => {
    const currentDate = Date.now();
    const formattedDate = format(currentDate, 'dd MMM yyyy, HH:mm');
  
    await addDoc(postCollectionRef, {
      title,
      postText,
      createdAt: formattedDate, 
      author: {
        name: auth.currentUser?.displayName,
        id: auth.currentUser?.uid,
        pfp: auth.currentUser?.photoURL,
      },
    });
  
    toast.success('Successfully Created Post!', {
      pauseOnHover: false,
      hideProgressBar: true,
      theme: 'dark',
    });
  };

  return (
    <div className='w-full space-y-4'> 
      <div>
        <div className='flex flex-col gap-1.5 '>
          <div className="px-2 flex flex-col">
            <label className="text-sm py-2 font-medium">Title</label>
            <input className='
            rounded-md border px-4 py-2 outline-none bg-transparent
            text-accent-fg placeholder:text-accent-5 focus:border-accent-5'
            onChange={(event) => {setTitle(event.target.value)}}
            />
          </div>
          <div className="flex flex-col px-2 mt-2">
            <label className="text-sm py-2 font-medium">Description</label>
            <textarea className='
            rounded-md border px-4 py-2 outline-none bg-transparent
            text-accent-fg placeholder:text-accent-5 focus:border-accent-5'
            placeholder='Put your text here...'
            onChange={(event) => {setPostText(event.target.value)}} 
            />
          </div>
          <div className="flex justify-between items-center px-2 mt-2">
            <button className="px-4 py-2 rounded-lg border font-medium "><Link href={'/'}>Cancel</Link></button>
            <button className="px-4 py-2 rounded-lg text-black font-medium bg-white" onClick={CreatePost}>Publish</button>
          </div>
        </div>
      </div>
      <ToastContainer position='top-center' autoClose={2000} theme="dark" />
    </div>
  )
}

export default Form