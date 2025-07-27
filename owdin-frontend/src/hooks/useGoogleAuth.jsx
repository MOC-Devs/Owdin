import { useDispatch } from 'react-redux';
import { signInWithGoogle } from '../features/auth/api';
import { loginFailure, loginStart, loginSuccess } from '../features/auth';
import { fetchExpensesRequest } from '../features/expense';

const useGoogleAuth = () => {
  const dispatch = useDispatch()

  const signup = async () => {
    try {
      dispatch(loginStart())
      const userCredential = await signInWithGoogle();
      const user = {uid: userCredential.user.uid,email: userCredential.user.email}
      dispatch(loginSuccess(user))
      return user;
    } catch (err) {
      dispatch(loginFailure(err.message));
    }
  };

  return [signup];
}

export default useGoogleAuth;