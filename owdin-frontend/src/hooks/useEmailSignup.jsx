import { useDispatch } from 'react-redux';
import { signUpWithEmailPassword } from '../features/auth/authApi';
import { loginFailure, loginStart, loginSuccess } from '../features/auth/authSlice';

const useEmailSignup = () => {
  const dispatch = useDispatch()

  const signup = async (email, password) => {
    try {
      dispatch(loginStart())
      const userCredential = await signUpWithEmailPassword(email, password);
      const user = {uid: userCredential.user.uid,email: userCredential.user.email}
      dispatch(loginSuccess(user))
      return user;
    } catch (err) {
      dispatch(loginFailure(err.message));
    }
  };

  return [signup];
}

export default useEmailSignup;