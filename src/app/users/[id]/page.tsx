'use client'

import { useEffect, useState } from 'react';
import { auth, db } from '@/lib/firebase/page';
import { doc, getDoc } from 'firebase/firestore';

type User = {
    Posts: [];
    displayName: string;
    email: string;
    photoURL: string;
    uid: string;

  }
const UserProfilePage = () => {
  const [user, setUser] = useState<User | null>(null); 

  useEffect(() => {
    const getUserData = async () => {
      const user = auth.currentUser;

      if (user) {
        const userRef = doc(db, 'users', user.uid);
        const userDoc = await getDoc(userRef);

        if (userDoc.exists()) {
          setUser(userDoc.data() as User); 
        }
      }
    };

    getUserData();
  }, []);

  return (
    <div>
      {user ? (
        <div>
          <h1>Welcome, {user.displayName}</h1>
          <p>Email: {user.email}</p>
          {/* Other user profile information */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default UserProfilePage;
