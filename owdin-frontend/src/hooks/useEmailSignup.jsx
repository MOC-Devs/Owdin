import { useDispatch } from 'react-redux';
import { signUpWithEmailPassword } from '../features/auth/api';
import { loginFailure, loginStart, loginSuccess } from '../features/auth';
import { fetchExpensesRequest } from '../features/expense';

const useEmailSignup = () => {
  const dispatch = useDispatch()

  const signup = async (name, email, password) => {
    try {
      dispatch(loginStart())
      const userCredential = await signUpWithEmailPassword(name, email, password);
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