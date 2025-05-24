import { useState } from "react";

export default function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  return (
    <div className="app-container">
      <h1>Welcome to Student Marketplace</h1>

      <p>Buy, sell, and exchange with fellow students securely and easily.</p>

      <div>
        <button
          onClick={() => {
            setShowSignup(false);
            setShowLogin(true);
          }}
        >
          Login
        </button>

        <button
          onClick={() => {
            setShowLogin(false);
            setShowSignup(true);
          }}
        >
          Sign Up
        </button>
      </div>

      {/* Login Form */}
      {showLogin && (
        <div className="form-container">
          <h2>Login</h2>
          <form>
            <input type="email" placeholder="University Email" required />
            <input type="password" placeholder="Password" required />
            <button type="submit">Login</button>
          </form>
        </div>
      )}

      {/* Signup Form */}
      {showSignup && (
        <div className="form-container">
          <h2>Sign Up</h2>
          <form>
            <input type="text" placeholder="Full Name" required />
            <input type="email" placeholder="University Email" required />
            <input type="password" placeholder="Password" required />
            <button type="submit">Sign Up</button>
          </form>
        </div>
      )}
    </div>
  );
}
