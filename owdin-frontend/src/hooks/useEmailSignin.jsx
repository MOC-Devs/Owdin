import { signInWithEmailPassword } from '../features/auth/authApi';
import { useDispatch } from 'react-redux';
import { loginFailure, loginStart, loginSuccess } from '../features/auth/authSlice';

const useEmailSignin = () => {
    const dispatch = useDispatch()

    const signin = async (email, password) => {
        try {
            dispatch(loginStart())
            const userCredential = await signInWithEmailPassword(email, password);
            const user = {uid: userCredential.user.uid,email: userCredential.user.email}
            dispatch(loginSuccess(user))
            return user;
        } catch (err) {
            dispatch(loginFailure(err.message));
        }
    };

    return [signin];
}

export default useEmailSignin;