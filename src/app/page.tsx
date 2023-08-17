import PostCard from '@/components/PostCard'
import Image from 'next/image'


export default function Home() {
  return (
    <div className='mx-auto flex max-w-2xl flex-col gap-4 py-12 overflow-x-hidden'>
      <PostCard/>
    </div>
  )
}
