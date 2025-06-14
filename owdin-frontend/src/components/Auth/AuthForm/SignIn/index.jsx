import { useState } from "react";
import useEmailSignin from "../../../../hooks/useEmailSignin";
import useGoogleAuth from "../../../../hooks/useGoogleAuth";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signinEmail,loadingEmail,errorEmail] = useEmailSignin();
  const [signinGoogle,loadingGoogle,errorGoogle] = useGoogleAuth()

  const handleSubmit = async(e) => {
    e.preventDefault();
    const user = await signinEmail(email,password);
    console.log('succesfully logged: ',user);
  };
  const handleGoogleSignin = async (e)=>{
    e.preventDefault();
    const user = await signinGoogle();
    console.log('succesfully logged: ',user);
  }
  const loading = loadingEmail || loadingGoogle
  const error = errorEmail || errorGoogle;

  return (
    <div style={{ maxWidth: 400, margin: "2rem auto", padding: 24, border: "1px solid #ccc", borderRadius: 8 }}>
      <h2>Sign In</h2>
      <h3><button onClick={handleGoogleSignin}> Signin with Google</button></h3>
      <p>Or else enter your email and password to sign in.</p>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 16 }}>
          <label htmlFor="email" style={{ display: "block", marginBottom: 4 }}>Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            style={{ width: "100%", padding: 8, boxSizing: "border-box" }}
          />
        </div>
        <div style={{ marginBottom: 16 }}>
          <label htmlFor="password" style={{ display: "block", marginBottom: 4 }}>Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            style={{ width: "100%", padding: 8, boxSizing: "border-box" }}
          />
        </div>
        <button type="submit" disabled={loading} style={{ width: "100%", padding: 10 }}>{loading?'...':'Sign In'}</button>
        {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
      </form>
    </div>
  );
}

export default SignIn;