import React from 'react';
import './index.css';

export default function App() {
  return (
    <div className="app-container">
      <header className="header">
        <h1>Student Marketplace Signup</h1>
        <p>Create an account with your university email</p>
      </header>

      <form className="form-container">
        <input type="text" name="name" placeholder="Full Name" required />

        <input
          type="email"
          name="email"
          placeholder="Email (.edu only)"
          pattern="^[\w.-]+@[\w.-]+\.edu$"
          title="Please enter a valid .edu email"
          required
        />

        <input type="password" name="password" placeholder="Password" required />

        <input type="text" name="university" placeholder="University" />
        <input type="text" name="department" placeholder="Department" />
        <input type="text" name="program" placeholder="Program" />
        <input type="text" name="year" placeholder="Year" />
        <input type="text" name="graduationYear" placeholder="Graduation Year" />

        <input type="date" name="dob" placeholder="Date of Birth" />
        <input type="tel" name="phone" placeholder="Phone Number" />

        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

