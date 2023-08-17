'use client'

import { getDoc, doc } from "@firebase/firestore";
import { GetServerSideProps } from "next";
import { db } from "@/lib/firebase/page";
import React from "react";
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
    fetchPost()
  }, [id])

  if (!post) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <p>Title: {post.title}</p>
    </div>
  );
}

export default Post;