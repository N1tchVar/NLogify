'use client'

import { useState, useEffect } from 'react'
import { getDocs, collection } from 'firebase/firestore'
import { db } from '@/lib/firebase/page'
import { Post } from '@/types/post'
import { IconShare } from '@tabler/icons-react'
import Link from 'next/link';
import { toast } from 'react-toastify'
import { Skeleton } from "@/components/ui/skeleton"
 


const PostCard = () => {
    const [postLists, setPostLists] = useState<Post[]>();;
    const [loading, setLoading] = useState(true);
    const postCollectionRef = collection(db, "posts");

    const copyPostPath = (path : any) => {
        navigator.clipboard.writeText(path);
        toast.success('Post path copied to clipboard!', {
            position: toast.POSITION.TOP_CENTER
        });
    };

    useEffect(() => {
        
        const getPosts = async () => {
            const data = await getDocs(postCollectionRef);
            const posts = data.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as Post[];
            setPostLists(posts);
            setLoading(false);
        };
        getPosts();
    }, []);

    return (
        <div className='flex flex-col gap-4 justify-center items-center mt-10 w-full'> 
          {loading ? (
             [...Array(5)].map((_, index) => (
              <div key={index} className='border border-slate-100/20 p-4 rounded-lg md:w-full'>
                  <div className="flex py-4 items-center space-x-4">
                      <Skeleton className="h-12 w-12 rounded-full" />
                      <div className="space-y-2">
                          <Skeleton className="h-4 w-[250px]" />
                          <Skeleton className="h-4 w-[200px]" />
                      </div>
                  </div>
              </div>
          ))
          ) : (
            postLists?.map((post) => {
              return (
                <div key={post.id} className='flex flex-col gap-1.5 w-full'>
                  <div className='px-2 flex flex-col w-full'>
                     <div className='rounded-md border border-gray-500/80 px-4 py-2'>
                            <Link href={`/posts/${post.id}`}><h1 className='text-xl py-2'>{post.title}</h1></Link>
                            <hr className='mt-2 mb-4 border-gray-500/80 hr'/>
                        <div className='flex justify-between items-center'>
                            <div className='flex justify-center items-center'>
                                <Link href={``}>
                                <img className='h-8 rounded-3xl' src={post.author?.pfp}/> 
                                </Link>
                                <span className='px-2 text-sm text-white/80 font-bsemibold'> - {post.createdAt}</span>
                            </div>
                            <div className='flex justify-end items-center'>
                                <IconShare className='cursor-pointer duration-200 hover:text-gray-500/70' onClick={() => copyPostPath(`nlogify.vercel.app/posts/${post.id}`)} />
                            </div>
                        </div>
                     </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      );
}

export default PostCard