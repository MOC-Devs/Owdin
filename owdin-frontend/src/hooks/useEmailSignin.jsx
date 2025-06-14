import { useState } from 'react';
import { auth } from '../../firebase-config';
import { signInWithEmailAndPassword } from "firebase/auth";

const useEmailSignin = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null)

    const signin = async (email, password) => {
        setLoading(true);
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            setLoading(false);
            return userCredential;
        } catch (err) {
            setError(err.message);
            setLoading(false);
            return null;
        }
    };

    return [signin, loading, error];
}

export default useEmailSignin;