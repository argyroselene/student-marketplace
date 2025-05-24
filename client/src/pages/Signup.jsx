import React from 'react';
import './form.css'; // style as needed

export default function Signup() {
  return (
    <div className="form-container">
      <h2>Sign Up</h2>
      <form>
        {/* same inputs you provided earlier */}
        <input type="text" name="name" placeholder="Full Name" required />
        <input
          type="email"
          name="email"
          placeholder="Email (.edu only)"
          pattern="^[\\w.-]+@[\\w.-]+\\.edu$"
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