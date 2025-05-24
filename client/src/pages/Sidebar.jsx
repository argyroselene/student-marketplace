import React from 'react';
import { Link } from 'react-router-dom';

export default function Sidebar() {
  return (
    <nav style={{ width: '250px', backgroundColor: '#f4f4f4', padding: '20px' }}>
      <h3>Dashboard</h3>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        <li><Link to="/dashboard">Listings</Link></li>
        <li><Link to="/dashboard/profile">Profile</Link></li>
        <li><Link to="/dashboard/orders">Orders</Link></li>
        <li><Link to="/dashboard/settings">Settings</Link></li>
        <li><Link to="/create-listing">Create Listing</Link></li>
        <li><Link to="/logout">Logout</Link></li>
      </ul>
    </nav>
  );
}
