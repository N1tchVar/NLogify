'use client'

import { useState, useEffect } from 'react'
import { getDocs, collection } from 'firebase/firestore'
import { db } from '@/lib/firebase/page'
import { Post } from '@/types/post'
import { IconShare } from '@tabler/icons-react'
import Link from 'next/link';
 
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

  return <div  className='flex flex-col gap-4 justify-center items-center mt-10 w-full'> 
    {postLists?.map((post)=> {
        return <div key={post.id} className='flex flex-col gap-1.5 w-full'>
            
            <div className='px-2 flex flex-col w-full'>
                <div className='rounded-md border px-4 py-2'>
                <Link href={`/posts/${post.id}`}><h1 className='text-xl py-2'>{post.title}</h1></Link>
                    <hr className='mt-2 mb-4'/>
                        <div className='flex justify-between items-center'>
                            <div className='flex justify-center items-center'>
                                <img className='h-8 rounded-3xl' src={post.author?.pfp}/> 
                                <span className='px-2 text-sm font-bsemibold'> - {post.createdAt}</span>
                            </div>
                            <div className='flex justify-end items-center'>
                                <IconShare/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    })} 
  </div>
}

export default PostCard