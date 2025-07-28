import { useDispatch } from "react-redux";
import { logoutRequest } from "../features/auth/index";

const useLogout = () => {
  const dispatch = useDispatch();

  const signout = async () => {
    dispatch(logoutRequest());
  };
  return [signout];
};

export default useLogout;
