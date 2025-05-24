import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';

const Dashboard = () => {
  const [listings, setListings] = useState([]);
  const [filteredListings, setFilteredListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showOnlyMine, setShowOnlyMine] = useState(false);
  const [currentUserId, setCurrentUserId] = useState(null);
  const navigate = useNavigate();

  const fetchListings = async () => {
    try {
      setLoading(true);
      const url = showOnlyMine 
        ? `http://localhost:5000/api/listings?userId=${currentUserId}`
        : 'http://localhost:5000/api/listings';
      
      const res = await fetch(url, {
        method: 'GET',
        credentials: 'include',
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.message || 'Failed to fetch listings');
      }

      setListings(data.listings || []);
      setFilteredListings(data.listings || []);
    } catch (err) {
      console.error('Failed to fetch listings:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    setCurrentUserId(userId);
    fetchListings();
  }, []);

  useEffect(() => {
    if (showOnlyMine && currentUserId) {
      fetchListings();
    } else {
      fetchListings();
    }
  }, [showOnlyMine, currentUserId]);

  const handleListingClick = (listingId) => {
    navigate(`/listings/${listingId}`);
  };

  return (
    <div className="dashboard-container" style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar showOnlyMine={showOnlyMine} setShowOnlyMine={setShowOnlyMine} />

      <main style={{ flex: 1, padding: '20px' }}>
        <h2>{showOnlyMine ? 'My Listings' : 'All Listings'}</h2>
        {loading && <div>Loading...</div>}
        {error && <p style={{ color: 'red' }}>{error}</p>}

        {!loading && filteredListings.length === 0 && (
          <p>{showOnlyMine ? "You haven't created any listings yet." : "No listings found."}</p>
        )}

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', 
          gap: '20px',
          cursor: 'pointer'
        }}>
          {filteredListings.map(item => (
            <div
              key={item._id}
              onClick={() => handleListingClick(item._id)}
              style={{ 
                border: '1px solid #ccc',
                padding: '15px',
                borderRadius: '8px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                transition: 'transform 0.2s',
                ':hover': {
                  transform: 'translateY(-5px)'
                }
              }}
            >
              {item.image && (
                <img 
                  src={`http://localhost:5000/${item.image}`} 
                  alt={item.title}
                  style={{ 
                    width: '100%',
                    height: '150px',
                    objectFit: 'cover',
                    borderRadius: '4px',
                    marginBottom: '10px'
                  }} 
                />
              )}
              <h3 style={{ margin: '0 0 5px 0' }}>{item.title}</h3>
              <p style={{ 
                color: '#666',
                fontSize: '0.9rem',
                margin: '0 0 10px 0',
                minHeight: '40px'
              }}>
                {item.description.length > 60 
                  ? `${item.description.substring(0, 60)}...` 
                  : item.description}
              </p>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <p style={{ fontWeight: 'bold', margin: '0' }}>
                  ${parseFloat(item.price).toFixed(2)}
                </p>
                <p style={{ 
                  color: '#888',
                  fontSize: '0.8rem',
                  margin: '0'
                }}>
                  {item.category}
                </p>
              </div>
              {item.userId === currentUserId && (
                <p style={{ 
                  color: '#007bff',
                  fontSize: '0.8rem',
                  margin: '5px 0 0 0'
                }}>
                  (Your listing)
                </p>
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;

