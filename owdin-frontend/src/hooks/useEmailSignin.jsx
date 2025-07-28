import { useDispatch } from "react-redux";
import { loginStart} from "../features/auth/index";
import { EMAIL_AUTH } from "../features/auth/constants";

const useEmailSignin = () => {
  const dispatch = useDispatch();

  const signin = async (email, password) => {
    dispatch(
      loginStart({ providerType: EMAIL_AUTH, credentials: { email, password } })
    );
  };
  return [signin];
};

export default useEmailSignin;
