'use client'

import { useState, useEffect } from 'react'
import { getDocs, collection } from 'firebase/firestore'
import { db } from '@/lib/fiebase/page'
import { Post } from '@/types/post'

const PostCard = () => {
    const [postLists, setPostLists] = useState<Post[]>([]);;
    const postCollectionRef = collection(db, "posts");

    useEffect(() => {
        const getPosts = async () => {
            const data = await getDocs(postCollectionRef);
            const posts = data.docs.map((doc) => ({
                id: doc.id,
                title: doc.data().title,
                content: doc.data().content,
                authorId: doc.data().authorId,
                createdAt: doc.data().createdAt
            }));
            setPostLists(posts);
        }
        getPosts();
    }, []);

  return <div> 
    {postLists.map((post)=> {
        return <div className='text-2xl'>{post.title}</div>
    })} 
  </div>
}

export default PostCard