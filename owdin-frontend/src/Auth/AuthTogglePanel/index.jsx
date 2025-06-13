function AuthTogglePanel({signIn,onToggle}) {
  return (
    <div>
      <div style={{ textAlign: "center", marginTop: 16 }}>
        {signIn ? (
          <span>
            Don't have an account?{" "}
            <button type="button" onClick={onToggle} style={{ background: "none", border: "none", color: "#007bff", cursor: "pointer", textDecoration: "underline" }}>
              Sign Up
            </button>
          </span>
        ) : (
          <span>
            Already have an account?{" "}
            <button type="button" onClick={onToggle} style={{ background: "none", border: "none", color: "#007bff", cursor: "pointer", textDecoration: "underline" }}>
              Sign In
            </button>
          </span>
        )}
      </div>
    </div>
  );
}

export default AuthTogglePanel;
