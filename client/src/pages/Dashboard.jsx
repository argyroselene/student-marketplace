import React from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';

export default function Dashboard() {
  return (
    <div className="dashboard-container">
      <h1>Welcome to Your Dashboard</h1>
      <nav>
        <ul>
          <li><Link to="/chat">Chat</Link></li>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/login">Logout</Link></li>
        </ul>
      </nav>
    </div>
  );
}
