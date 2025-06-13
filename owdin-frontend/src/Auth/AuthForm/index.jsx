import SignIn from "./SignIn";
import SignUp from "./SignUp";

function AuthForm({ signIn }) {
  return (
    <div>
      {signIn ? <SignIn /> : <SignUp />}
    </div>
  );
}

export default AuthForm;