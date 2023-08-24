'use client'

import React, { useState } from 'react';
import Form from '@/components/Form';
import { auth } from '@/lib/firebase/page';
import Modal from '@/components/Modal'; // Adjust the import path
import { useRouter } from 'next/router';

const NewPostPage = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);


  const openLoginModal = () => {
    setShowLoginModal(true);
  };

  const closeLoginModal = () => {
    setShowLoginModal(false);
  };


  return (
    <div className='mx-auto my-24 flex max-w-3xl flex-col items-center gap-4'>
      <h1 className='text-3xl font-bold'>New post</h1>
        <Form />
        <Modal
        visible={true}
        onClose={closeLoginModal}
      />
    </div>
  );
};

export default NewPostPage;
