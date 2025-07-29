function AuthTogglePanel({ signIn, onToggle }) {
  return (
    <div>
      <div className="text-center my-8">
        {signIn ? (
          <>
            <span>Don't have an account? </span>
            <span>
              <button type="button" onClick={onToggle} className="border rounded-md ml-2 p-1 bg-green-100">
                Sign Up
              </button>
            </span>
          </>
        ) : (
          <>
            <span>Already have an account?</span>
            <span>
              <button type="button" onClick={onToggle} className="border rounded-md ml-2 p-1 bg-amber-100">
                Sign In
              </button>
            </span>
          </>
        )}
      </div>
    </div>
  );
}

export default AuthTogglePanel;
