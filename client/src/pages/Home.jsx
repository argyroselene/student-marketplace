import React from 'react';
import { Link } from 'react-router-dom';
// import './Home.css'; // optional: style it professionally

export default function Home() {
  return (
    <div className="home-container">
      <header className="hero">
        <img
          src="https://media.istockphoto.com/id/1419532732/photo/diversity-in-working-team-using-internet-on-phones-and-digital-tablet-for-teamwork-growth-in.jpg?s=612x612&w=0&k=20&c=cLeHG0e07LEDi2Mx8KZG9xxay7D4MSQK4NMdsKYRe1k=" // add your marketplace image to public/images
          alt="Student Marketplace"
          className="hero-image"
        />
        <div className="hero-text">
          <h1>Welcome to Campus Exchange</h1>
          <p>Buy, sell, and connect with your student community.</p>
          <div className="hero-buttons">
            <Link to="/login">
              <button className="btn login-btn">Login</button>
            </Link>
            <Link to="/signup">
              <button className="btn signup-btn">Sign Up</button>
            </Link>
          </div>
        </div>
      </header>
    </div>
  );
}



