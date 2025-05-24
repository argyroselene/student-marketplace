import React, { useEffect, useState } from 'react';

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
            <div key={listing._id} className="listing-card">
              <h3>{listing.title}</h3>
              <p>{listing.description}</p>
              <img src={listing.imageURL} alt={listing.title} style={{ width: '150px' }} />
              {/* Add other listing details */}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Listings;

