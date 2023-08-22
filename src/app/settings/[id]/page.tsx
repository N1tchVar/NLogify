'use client'

import { useEffect, useState } from 'react';
import { auth, db } from '@/lib/firebase/page';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { updateProfile } from '@firebase/auth';

export type User = {
    displayName: string;
    email: string;
    photoUrl: string;
    uid: string;
};

const ProfileUpdate = () => {
    const [user, setUser] = useState<User | null>(null);
    const [displayName, setDisplayName] = useState('');
    const [photoUrl, setPhotoUrl] = useState('');

    useEffect(() => {
        const getUserData = async () => {
          const currentUser = auth.currentUser;
    
          if (currentUser) {
            const userRef = doc(db, 'users', currentUser.uid);
            const userDoc = await getDoc(userRef);
    
            if (userDoc.exists()) {
              setUser(userDoc.data() as User);   
    
            }
          }
        };
    
        getUserData();
      }, []);

      const handleUpdateProfile = async () => {
        try {
          const currentUser = auth.currentUser;
          if (currentUser) {
            await updateProfile(currentUser, { displayName, photoURL: photoUrl });
    
            await updateDoc(doc(db, 'users', currentUser.uid), {
              displayName,
              photoUrl,
            });
    
            toast.success('Profile updated successfully!');
          }
        } catch (error) {
          console.error('Error updating profile:', error);
          toast.error('An error occurred while updating profile.');
        }
      };

      return (
        <div className='mx-auto min-h-[calc(100vh-68px)] max-w-4xl px-8 pb-16 pt-24'>
          {user ? (
            <div className='flex flex-col items-start p-2'>
              <div className='flex items-center'>
                <img className='rounded-full' src={user.photoUrl} alt="" />
                <h1 className='font-extrabold text-2xl px-4'>{user.displayName}</h1>
              </div>
              <hr className='my-4 border-gray-500/80 w-full' />
            </div>
          ) : (
            <p>Loading...</p>
          )}
          <div className='flex flex-col items-start p-2'>
            <input
              type='text'
              placeholder='New Display Name'
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
            />
            <input
              type='text'
              placeholder='New Photo URL'
              value={photoUrl}
              onChange={(e) => setPhotoUrl(e.target.value)}
            />
            <button onClick={handleUpdateProfile}>Update Profile</button>
          </div>
        </div>
      );
}

export default ProfileUpdate
