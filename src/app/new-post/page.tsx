'use client'

import React, { useState } from 'react';
import Form from '@/components/Form';
import { auth } from '@/lib/fiebase/page';
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

  const handleLoginSuccess = () => {
    useRouter().push('/new-post');
  };

  return (
    <div className='mx-auto my-24 flex max-w-3xl flex-col items-center gap-4'>
      <h1 className='text-3xl font-bold'>New post</h1>
      {auth.currentUser ? (
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
