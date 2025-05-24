import React, { useEffect, useState } from 'react';

export default function Listings() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/api/listings')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setListings(data.data);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch listings', err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading listings...</p>;

  return (
    <div>
      {listings.length === 0 ? (
        <p>No listings available.</p>
      ) : (
        listings.map(listing => (
          <div key={listing._id} className="listing-card">
            <h3>{listing.title}</h3>
            <p>{listing.description}</p>
            <p>Price: ${listing.price}</p>
            <p>Owner: {listing.owner.name} ({listing.owner.university})</p>
          </div>
        ))
      )}
    </div>
  );
}
