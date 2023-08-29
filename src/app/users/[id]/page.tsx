'use client'

import { useEffect, useState } from 'react';
import { auth, db } from '@/lib/firebase/page';
import { doc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { IconFileText, IconShare } from '@tabler/icons-react'
import Link from 'next/link';
import { toast } from 'react-toastify';


export type User = {
  displayName: string;
  email: string;
  photoUrl: string;
  uid: string;
};

type Post = {
  id: string;
  imageUrl: string;
  postText: string;
  title: string;
  author: {
    id: string;
    name: string;
    pfp: string;
  };
  createdAt: string;
};

const UserProfilePage = () => {
  const [user, setUser] = useState<User | null>(null);
  const [userPosts, setUserPosts] = useState<Post[]>([]);
  
  const copyPostPath = (path : any) => {
    navigator.clipboard.writeText(path);
    toast.success('Post path copied to clipboard!', {
        position: toast.POSITION.TOP_CENTER
    });
};

  useEffect(() => {
    const getUserData = async () => {
      const currentUser = auth.currentUser;

      if (currentUser) {
        const userRef = doc(db, 'users', currentUser.uid);
        const userDoc = await getDoc(userRef);

        if (userDoc.exists()) {
          setUser(userDoc.data() as User);

          const postsQuery = query(collection(db, 'posts'), where('author.id', '==', currentUser.uid));
          const querySnapshot = await getDocs(postsQuery);
          const posts = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Post));
          setUserPosts(posts);
          console.log(setUserPosts(posts));    

        }
      }
    };

    getUserData();
  }, []);

  return (
    <div className='mx-auto min-h-[calc(100vh-68px)] max-w-4xl px-8 pb-16 pt-24'>
      {user ? (
        <div className='flex flex-col items-start p-2'>
          <div className='flex items-center'>
            <img className='rounded-full h-20' src={user.photoUrl} alt="" />
            <h1 className='font-extrabold text-2xl px-4'>{user.displayName}</h1>
          </div>
          <hr className='my-4 border-gray-500/80 w-full' />
        </div>
      ) : (
        <p>Loading...</p>
      )}

      {userPosts.length > 0 ? (
        <div>
          <h1>Posts by {user?.displayName} : </h1>
            {userPosts.map((post) => (
              <div key={post.id}>
                <div className='flex flex-col p-4 gap-2'>
                  <div className='flex items-center justify-between border border-gray-500/80 p-4 rounded-2xl '>
                    <Link href={`/posts/${post.id}`}><h3 className='text-2xl'>{post.title}</h3></Link> 
                    <div className=''>
                      <IconShare className='cursor-pointer duration-200 hover:text-gray-500/70' onClick={() => copyPostPath(`nlogify.vercel.app/posts/${post.id}`)} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      ) : (
        <div className='flex justify-center items-center'>
          <div className='flex flex-col justify-center items-center gap-4'>
            <IconFileText size={68} className='bg-gray-500/50 p-2 rounded-full '/>
            <h1>{user?.displayName} hasn&apos;t any post yet. 😞</h1>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfilePage;
