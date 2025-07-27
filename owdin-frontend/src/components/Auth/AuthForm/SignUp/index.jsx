import{ useState } from "react";
import useEmailSignup from "../../../../hooks/useEmailSignup";
import useGoogleAuth from "../../../../hooks/useGoogleAuth";
import { useSelector } from "react-redux";
import { selectAuthError, selectAuthLoading, selectAuthUser } from "../../../../features/auth/selectors";


function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signupEmail] = useEmailSignup();
  const [signupGoogle] = useGoogleAuth()

  const loading = useSelector(selectAuthLoading);
  const error = useSelector(selectAuthError);


  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = await signupEmail(name,email,password);
  };

  const handleGoogleSignup = async (e)=>{
    e.preventDefault();
    const user = await signupGoogle();
  }

  return (
    <div style={{ maxWidth: 400, margin: "2rem auto", padding: 24, border: "1px solid #ccc", borderRadius: 8 }}>
      <h2>Sign Up</h2>
      <h3><button onClick={handleGoogleSignup}> Sign Up with Google</button></h3>
      <p>Or else use email and password to create an account.</p>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 16 }}>
          <label htmlFor="name" style={{ display: "block", marginBottom: 4 }}>Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={e => setName(e.target.value)}
            required
            style={{ width: "100%", padding: 8, boxSizing: "border-box" }}
          />
        </div>
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
        <button type="submit" disabled={loading} style={{ width: "100%", padding: 10 }}>{loading?'...':'Sign Up'}</button>
        {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
      </form>
    </div>
  );
}

export default Signup