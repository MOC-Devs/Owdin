import { useDispatch } from "react-redux";
import { loginStart } from "../features/auth";
import { GOOGLE_AUTH } from "../features/auth/constants";

const useGoogleAuth = () => {
  const dispatch = useDispatch();

  const signup = async () => {
    dispatch(loginStart({ providerType: GOOGLE_AUTH }));
  };

  return [signup];
};

export default useGoogleAuth;
