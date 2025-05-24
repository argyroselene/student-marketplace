import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './form.css';

export default function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    university: '',
    department: '',
    program: '',
    year: '',
    graduationYear: '',
    dob: '',
    phone: '',
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:5000/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem('user', JSON.stringify(data.user));
        localStorage.setItem('token', data.token);
        navigate('/dashboard');
      } else {
        alert(data.message || 'Signup failed');
      }
    } catch (err) {
      console.error('Signup error:', err);
      alert('Something went wrong!');
    }
  };

  return (
    <div className="form-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Full Name" required onChange={handleChange} />
        <input
          type="email"
          name="email"
          placeholder="Email (.edu only)"
          pattern="^[\\w.-]+@[\\w.-]+\\.edu$"
          title="Please enter a valid .edu email"
          required
          onChange={handleChange}
        />
        <input type="password" name="password" placeholder="Password" required onChange={handleChange} />
        <input type="text" name="university" placeholder="University" onChange={handleChange} />
        <input type="text" name="department" placeholder="Department" onChange={handleChange} />
        <input type="text" name="program" placeholder="Program" onChange={handleChange} />
        <input type="text" name="year" placeholder="Year" onChange={handleChange} />
        <input type="text" name="graduationYear" placeholder="Graduation Year" onChange={handleChange} />
        <input type="date" name="dob" placeholder="Date of Birth" onChange={handleChange} />
        <input type="tel" name="phone" placeholder="Phone Number" onChange={handleChange} />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}
