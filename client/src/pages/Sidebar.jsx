import React from 'react';
import { Link } from 'react-router-dom';

export default function Sidebar({ showOnlyMine, setShowOnlyMine }) {
  return (
    <nav style={{ width: '250px', backgroundColor: '#f4f4f4', padding: '20px' }}>
      <h3>Dashboard</h3>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        <li><Link to="/dashboard">All Listings</Link></li>
        <li>
          <button 
            onClick={() => setShowOnlyMine(!showOnlyMine)}
            style={{
              background: 'none',
              border: 'none',
              color: showOnlyMine ? '#007bff' : '#333',
              cursor: 'pointer',
              padding: '5px 0',
              textAlign: 'left',
              width: '100%'
            }}
          >
            My Listings
          </button>
        </li>
        <li><Link to="/dashboard/profile">Profile</Link></li>
        <li><Link to="/dashboard/orders">Orders</Link></li>
        <li><Link to="/dashboard/settings">Settings</Link></li>
        <li><Link to="/create-listing">Create Listing</Link></li>
        <li><Link to="/logout">Logout</Link></li>
      </ul>
    </nav>
  );
}