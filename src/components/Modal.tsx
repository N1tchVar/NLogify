import { IconBrandGoogle } from '@tabler/icons-react';
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { auth, db } from '@/lib/firebase/page';
import { doc, setDoc } from 'firebase/firestore';

interface ModalProps {
  visible: boolean;
  onClose: () => void;
  onLoginSuccess: () => void; 
}

const Modal: React.FC<ModalProps> = ({ visible, onClose, onLoginSuccess }) => {
  const [ signInWithGoogle ] = useSignInWithGoogle(auth);

  const handleSignInWithGoogle = async () => {
    try {
      await signInWithGoogle();
  
      const user = auth.currentUser;
  
      if (user) {
        const userRef = doc(db, 'users', user.uid);
  
        await setDoc(userRef, {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoUrl: user.photoURL
        });
  
        onLoginSuccess();
      }
    } catch (error) {
      console.error('Error logging in with Google:', error);
    }
  };

  return (
    <>
      <div
        className={`fixed top-0 inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center h-screen transition-opacity ${
          visible ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="bg-black p-8 px-20 border flex flex-col justify-center items-center border-white/20 gap-2 w-auto rounded-lg">
          <h1 className="font-semibold text-xl flex justify-start text-white text-center">
            Sign In With Google
          </h1>
          <div className="gap-4 flex flex-col justify-center items-center">
            <button
              type='button'
              onClick={handleSignInWithGoogle}
              className="flex justify-center items-center border rounded-md border-white/20 p-4"
            >
              <IconBrandGoogle size={16} className='mr-2' /> Sign in with Google
            </button>
            <button
              className="border rounded-md border-white/20 text-sm p-4 hover:bg-red-500 duration-300 transition-all"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
