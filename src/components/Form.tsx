'use client'

import Link from "next/link"
import { useState } from "react"
import { addDoc, collection } from "firebase/firestore"
import { auth, db, storage } from '@/lib/firebase/page'
import { ToastContainer, toast } from "react-toastify"
import { format } from 'date-fns';
import { getDownloadURL, ref, uploadBytes } from "firebase/storage"

// Loader
import { PuffLoader } from 'react-spinners';

const Form = () => {
  const [ title, setTitle ] = useState("");
  const [ postText, setPostText ] = useState("");
  const [imageUpload, setImageUpload] = useState<File | null>(null);
  const [ loader, setLoader ] = useState(false);
  const postCollectionRef = collection(db, "posts")

  const CreatePost = async () => {
    if (!title || !postText || !imageUpload) {
      toast.error('Please fill all fields', {
        pauseOnHover: false,
        hideProgressBar: true,
        theme: 'dark',
      });
      return
    }

    setLoader(true);

    const currentDate = Date.now();
    const formattedDate = format(currentDate, "dd MMM yyyy, HH:mm");

    const imageRef = ref(
      storage,
      `images/${imageUpload.name}`
    );

    try {
      await uploadBytes(imageRef, imageUpload);
      const downloadURL = await getDownloadURL(imageRef);

      await addDoc(postCollectionRef, {
        title,
        postText,
        createdAt: formattedDate,
        imageUrl: downloadURL,
        author: {
          name: auth.currentUser?.displayName,
          id: auth.currentUser?.uid,
          pfp: auth.currentUser?.photoURL,
        },
      });
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  

    setLoader(false);
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
          <div className="flex flex-col px-2 mt-2">
            <label className="text-sm py-2 font-medium">Upload an Image</label>
            <input
              className="file-input"
              type="file"
              onChange={(event) => {
                setImageUpload(event.target.files?.[0] || null);
              }}
            />
          </div>
          <div className="flex justify-between items-center px-2 mt-2">
            <button className="px-4 py-2 rounded-lg border font-medium "><Link href={'/'}>Cancel</Link></button>
            <button className="px-4 py-2 rounded-lg text-black font-medium bg-white"
             onClick={CreatePost}
             disabled={loader}
             >
               {loader ? (
                <PuffLoader color={'#000'} loading={loader} size={32} />
              ) : (
                'Publish'
              )}
             </button>
          </div>
        </div>
      </div>
      <ToastContainer position='top-center' autoClose={2000} theme="dark" />
    </div>
  )
}

export default Form

