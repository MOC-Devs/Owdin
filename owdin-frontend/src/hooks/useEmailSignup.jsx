import { useDispatch } from "react-redux";
import { signupStart } from "../features/auth";
import { EMAIL_AUTH } from "../features/auth/constants";

const useEmailSignup = () => {
  const dispatch = useDispatch();

  const signup = async (name, email, password) => {
    dispatch(
      signupStart({
        providerType: EMAIL_AUTH,
        credentials: { name, email, password },
      })
    );
  };

  return [signup];
};

export default useEmailSignup;
