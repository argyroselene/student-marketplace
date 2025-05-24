import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Listings() {
  const [listings, setListings] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredListings, setFilteredListings] = useState([]);

  useEffect(() => {
    async function fetchListings() {
      try {
        const res = await fetch('http://localhost:5000/api/listings');
        const data = await res.json();
        setListings(data);
        setFilteredListings(data);
      } catch (error) {
        console.error('Failed to fetch listings:', error);
      }
    }
    fetchListings();
  }, []);

  useEffect(() => {
    const filtered = listings.filter(listing =>
      listing.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredListings(filtered);
  }, [searchTerm, listings]);

  return (
    <div>
      <h1>All Listings</h1>
      <input
        type="search"
        placeholder="Search products..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div>
        {filteredListings.length === 0 ? (
          <p>No listings found.</p>
        ) : (
          filteredListings.map(listing => (
            <Link
              key={listing._id}
              to={`/listings/${listing._id}`}
              className="listing-card"
              style={{
                textDecoration: 'none',
                color: 'inherit',
                border: '1px solid #ddd',
                marginBottom: '1rem',
                padding: '1rem',
                display: 'block',
              }}
            >
              <h3>{listing.title}</h3>
              <p>{listing.description}</p>
              <img
                src={listing.imageURL}
                alt={listing.title}
                style={{ width: '150px', objectFit: 'cover' }}
              />
            </Link>
          ))
        )}
      </div>
    </div>
  );
}

export default Listings;


