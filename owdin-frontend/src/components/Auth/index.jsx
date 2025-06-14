import { useState } from "react";
import AuthTogglePanel from "./AuthTogglePanel";
import AuthForm from "./AuthForm";

function Auth() {
  const [signIn, setSignIn] = useState(true);
  const handleToggle = () => setSignIn((prev) => !prev);

  return (
    <div>
      <AuthTogglePanel signIn={signIn} onToggle={handleToggle} />
      <AuthForm signIn={signIn} />
    </div>
  );
}

export default Auth;