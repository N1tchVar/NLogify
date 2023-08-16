"use client"

import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/lib/fiebase/page';
import { signOut } from 'firebase/auth';
import Modal from './Modal';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';

import { IconSquarePlus, IconHeart, IconUser, IconSettings } from '@tabler/icons-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import Link from 'next/link';
import { User } from "@/types/user"

export default function Menu() {
  const [useModal, setUseModal] = useState(false);
  const [userAuthState] = useAuthState(auth);
  const user = auth.currentUser

  const logout = () => {
    signOut(auth);
  };

  const openModal = () => {
    setUseModal(true);
  };

  const closeModal = () => {
    setUseModal(false);
  };

  const handleSignOutSuccess = async () => {
    try {
      logout();
      toast.success('Successfully logged out!', {
        pauseOnHover: false,
        hideProgressBar: true,
        theme: 'dark'
      });
    } catch (error) {
      // Handle error if needed
      console.error('Error logging in with Google:', error);
    };
  };

  const handleLoginSuccess = () => {
    toast.success('Successfully logged in', {
      pauseOnHover: false,
      hideProgressBar: true
    });
  };

  return (
    <>
      {userAuthState ? (
        <div className='flex gap-2 items-center'>
          {user ? (
            <>
              
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <div className='flex justify-center items-center gap-2 text-md p-2 border rounded-xl border-white'>
                    <img src={user.photoURL || '/default-avatar.png'} alt='User Avatar' className='w-6 h-6 rounded-full' />
                    {user.displayName || 'User'}
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem><Link href={'/new-post'}>
                    <div className="flex gap-2">
                    <IconSquarePlus />New Post
                    </div>
                    </Link></DropdownMenuItem>
                  <DropdownMenuItem><Link href={'/liked-posts'}>
                    <div className='flex gap-2'>
                      <IconHeart/>Liked Posts
                    </div>
                    </Link></DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem><Link href={'/profile'}>
                    <div className='flex gap-2'>
                      <IconUser/>Profile
                    </div>
                    </Link></DropdownMenuItem>
                  <DropdownMenuItem><Link href={'/settings'}>
                    <div className='flex gap-2'>
                      <IconSettings/>Settings
                    </div>
                    </Link></DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : null}
          <button className='bg-white p-2 px-4 font-semibold rounded-xl text-sm text-black' onClick={handleSignOutSuccess}>
            Sign Out
          </button>
        </div>
      ) : (
        <button
          className='bg-white p-2 px-4 font-semibold rounded-xl text-sm text-black'
          onClick={openModal}
        >
          Log In
        </button>
      )}
      <Modal
        visible={useModal}
        onClose={closeModal}
        onLoginSuccess={handleLoginSuccess} 
      />
      <div className='fixed bottom-0'>
        <ToastContainer position='top-center' autoClose={2000} theme="dark" />
      </div>
    </>
  );
}
