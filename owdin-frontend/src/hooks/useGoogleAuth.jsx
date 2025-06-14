import { useState } from 'react';
import { auth } from '../../firebase-config';
import { signInWithPopup,GoogleAuthProvider } from 'firebase/auth';

const useGoogleAuth = () => {
  const [loading,setLoading] = useState(false);
  const [error,setError] = useState(null)
  const provider = new GoogleAuthProvider()

  const signup = async()=>{
    setLoading(true);
    try{
      const userCredential = await signInWithPopup(auth,provider);
      setLoading(false);
      return userCredential;
    }catch(err){
      setError(err.message);
      setLoading(false);
      return null;
    }
  };
  
  return [signup,loading,error];
}

export default useGoogleAuth;