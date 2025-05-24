import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';

export default function Dashboard() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/api/listings', {
      method: 'GET',
      credentials: 'include', // if using cookies/session auth
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setListings(data.data);  // <- Use data.data here
        } else {
          setListings([]);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch listings:', err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="dashboard-container" style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar />

      <main style={{ flex: 1, padding: '20px' }}>
        <h2>Listings</h2>
        {loading && <p>Loading...</p>}

        {!loading && listings.length === 0 && <p>No listings found.</p>}

        <div
          className="listings-grid"
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(250px,1fr))', gap: '20px' }}
        >
          {listings.map(item => (
            <div
              key={item._id} // <- use _id for key
              className="listing-card"
              style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '8px' }}
            >
              {/* Remove or add image URL field in backend */}
              {/* <img src={item.image} alt={item.title} style={{ width: '100%', height: '150px', objectFit: 'cover' }} /> */}
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <p>
                <b>Price:</b> ${item.price}
              </p>
              {/* You can add more details here */}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}



