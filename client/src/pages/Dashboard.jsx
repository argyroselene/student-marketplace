import React from 'react';
import { Link } from 'react-router-dom';
import CampusMap from "./CampusMap";
 
import './Dashboard.css';

export default function Dashboard() {
  return (
    <div className="dashboard-container" style={{ padding: '20px' }}>
      <h1>Welcome to Your Dashboard</h1>
      <nav>
        <ul>
          <li><Link to="/chat">Chat</Link></li>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/login">Logout</Link></li>
        </ul>
      </nav>

      {/* Embed the map below the navigation */}
      <div style={{ marginTop: '20px' }}>
        <h2>Campus Map - Safe Meetup Spots</h2>
        <CampusMap />
      </div>
    </div>
  );
}


