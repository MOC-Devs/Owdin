import { useState } from "react";
import useEmailSignup from "../../../../hooks/useEmailSignup";
import useGoogleAuth from "../../../../hooks/useGoogleAuth";
import { useSelector } from "react-redux";
import {
  selectAuthError,
  selectAuthLoading,
  selectAuthUser,
} from "../../../../features/auth/selectors";
import { googleIcon } from "../../../../assets/icons";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signupEmail] = useEmailSignup();
  const [signupGoogle] = useGoogleAuth();

  const loading = useSelector(selectAuthLoading);
  const error = useSelector(selectAuthError);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = await signupEmail(name, email, password);
  };

  const handleGoogleSignup = async (e) => {
    e.preventDefault();
    const user = await signupGoogle();
  };

  return (
    <div className="md:max-w-lg max-w-sm border-1 rounded-lg mx-auto my-8">
      <p className="text-2xl font-semibold text-center py-2">Sign up</p>
      <p className="text-center">Create account with email and password</p>
      <form className="p-4" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full p-2 my-2 border-1 rounded-md focus:outline-none focus:shadow-sm focus:shadow-blue-300 focus:border-blue-500 transition-shadow"
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-2 my-2 border-1 rounded-md focus:outline-none focus:shadow-sm focus:shadow-blue-300 focus:border-blue-500 transition-shadow"
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-2 my-2 border-1 rounded-md focus:outline-none focus:shadow-sm focus:shadow-blue-300 focus:border-blue-500 transition-shadow"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full text-lg p-2 bg-blue-300 border-1"
        >
          {loading ? "..." : "Sign Up"}
        </button>
        <div className="flex items-center w-full mx-auto m-4">
          <div className="flex-grow border-t border-gray-300"></div>
          <button className="mx-4 flex bg-gray-200 border-1 p-2" onClick={handleGoogleSignup}>
            <span>Continue with</span>
            <span className="ml-1">{googleIcon()}</span>{" "}
          </button>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>
        {error && <div className="text-red-500 mt-2">{error}</div>}
      </form>
    </div>
  );
}

export default Signup;
