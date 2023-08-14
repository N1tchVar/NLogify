"use client"

import Form from '@/components/Form'

const NewPostPage = () => {
  return (
    <div className='mx-auto my-24 flex max-w-3xl flex-col items-center gap-4'>
      <h1 className='text-3xl font-bold'>New post</h1>

      <Form />
    </div>
    
  )
}

export default NewPostPage
