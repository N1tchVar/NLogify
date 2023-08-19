'use client'

import React from "react";
import { getDoc, doc } from "@firebase/firestore";
import { db, storage } from "@/lib/firebase/page";
import { Post } from '@/types/post';
import { useRouter } from 'next/navigation';

const Post = ({ params }: { params: { id: string } }) => {
  const id = params.id;
  const [post, setPost] = React.useState<Post>();
  const router = useRouter();

  React.useEffect(() => {
    const fetchPost = async () => {
      const docRef = doc(db, "posts", id);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        router.push('/404')
      }
      const post = docSnap.data()
      
      setPost(post as Post)
    }
    console.log(post?.imageUrl)
    fetchPost()
  }, [id])

  if (!post) {
    return <div>Loading...</div>
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex justify-center flex-col items-center">
        <h1 className="text-2xl font-bold">{post.title}</h1>
        <div className="py-2 w-1/2 text-center">
          <p className="text-md">{post.postText}</p>
        </div>
        <div className="flex justify-start items-center py-8  ">
          <img src={post.author.pfp} className="h-10 rounded-3xl" alt="" />
          <p className="px-2 text-sm font-semibold">{post.author.name}</p>
          <p className="text-sm text-gray-500/70"> - {post.createdAt}</p>
        </div>
      </div>
      <img src={post.imageUrl} alt="" />
    </div>
  );
}

export default Post;