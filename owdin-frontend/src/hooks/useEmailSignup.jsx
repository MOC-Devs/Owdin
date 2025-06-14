import { useState } from 'react';
import { auth } from '../../firebase-config';
import { createUserWithEmailAndPassword } from 'firebase/auth';

const useEmailSignup = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null)

  const signup = async (email, password) => {
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      setLoading(false);
      return userCredential;
    } catch (err) {
      setError(err.message);
      setLoading(false);
      return null;
    }
  };

  return [signup, loading, error];
}

export default useEmailSignup;