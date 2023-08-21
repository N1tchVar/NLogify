'use client'

import { useEffect, useState } from 'react';
import { auth, db } from '@/lib/firebase/page';
import { doc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';
import Link from 'next/link';

type User = {
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
  

  useEffect(() => {
    const getUserData = async () => {
      const currentUser = auth.currentUser;

      if (currentUser) {
        const userRef = doc(db, 'users', currentUser.uid);
        const userDoc = await getDoc(userRef);

        if (userDoc.exists()) {
          setUser(userDoc.data() as User);

          // Retrieve user's posts
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
            <img className='rounded-full' src={user.photoUrl} alt="" />
            <h1 className='font-extrabold text-2xl px-4'>{user.displayName}</h1>
          </div>
          <hr className='my-4 border-gray-500/80 w-full' />
        </div>
      ) : (
        <p>Loading...</p>
      )}

      {userPosts.length > 0 ? (
        <div>
            {userPosts.map((post) => (
              <div key={post.id}>
                <h1>Posts by {user?.displayName} : </h1>
                <div className='flex flex-col p-4'>
                  <Link href={`/posts/${post.id}`}><h3 className='text-2xl'>{post.title}</h3></Link> 
                </div>
              </div>
            ))}
        </div>
      ) : (
        <div>
              
        </div>
      )}
    </div>
  );
};

export default UserProfilePage;
