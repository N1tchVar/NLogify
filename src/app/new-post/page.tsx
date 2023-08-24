'use client'

import React, { useState } from 'react';
import Form from '@/components/Form';
import { auth } from '@/lib/firebase/page';
import Modal from '@/components/Modal'; 
import { useRouter } from 'next/navigation';

const NewPostPage = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const router = useRouter(); 

  const openLoginModal = () => {
    setShowLoginModal(true);
  };

  const closeLoginModal = () => {
    setShowLoginModal(false);
  };

  const handleLoginSuccess = () => {
    router.push('/new-post'); 
  };

  return (
    <div className='mx-auto my-24 flex max-w-3xl flex-col items-center gap-4'>
      <h1 className='text-3xl font-bold'>New post</h1>
      {auth ? (
        <Form />
      ) : (
        <Modal
          visible={true}
          onClose={closeLoginModal}
          onLoginSuccess={handleLoginSuccess}
        />
      )}
    </div>
  );
};

export default NewPostPage;
