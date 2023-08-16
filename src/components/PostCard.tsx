'use client'

import { useState, useEffect } from 'react'
import { getDocs, collection } from 'firebase/firestore'
import { db } from '@/lib/fiebase/page'
import { Post } from '@/types/post'

const PostCard = () => {
    const [postLists, setPostLists] = useState<Post[]>();;
    const postCollectionRef = collection(db, "posts");

    useEffect(() => {
        const getPosts = async () => {
            const data = await getDocs(postCollectionRef);
            const posts = data.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as Post[];
            setPostLists(posts);
            console.log(posts)
        };
        getPosts();
    }, []);

  return <div className='flex justify-center items-center mt-10'> 
    {postLists?.map((post)=> {
        return <div key={post.id} className='text-2xl'>{post.title}
        <img src={post.author?.pfp} alt="" /> </div>
    })} 
  </div>
}

export default PostCard