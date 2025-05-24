import React from 'react';

export default function Login() {
  return (
    <div className="form-container">
      <h2>Login</h2>
      <form>
        <input type="email" name="email" placeholder="Email" required />
        <input type="password" name="password" placeholder="Password" required />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}