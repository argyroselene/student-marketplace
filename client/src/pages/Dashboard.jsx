import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Chat from './Chat'; // Import your Chat component

const Dashboard = () => {
  const [listings, setListings] = useState([]);
  const [filteredListings, setFilteredListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showOnlyMine, setShowOnlyMine] = useState(false);
  const [currentUserId, setCurrentUserId] = useState(null);

  // Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('All');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  // Chat states
  const [conversations, setConversations] = useState([]);
  const [selectedChatUserId, setSelectedChatUserId] = useState(null);
  const [showChat, setShowChat] = useState(false);

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

      const sortedListings = (data.listings || []).sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );

      setListings(sortedListings);
      setFilteredListings(sortedListings);
    } catch (err) {
      console.error('Failed to fetch listings:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchConversations = async (userId) => {
    try {
      const res = await fetch(`http://localhost:5000/api/messages/conversations/${userId}`);
      const data = await res.json();
      setConversations(data);
    } catch (err) {
      console.error('Failed to fetch conversations:', err);
    }
  };

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    setCurrentUserId(userId);

    if (userId) {
      fetchListings();
      fetchConversations(userId);
    }
  }, []);

  useEffect(() => {
    if (currentUserId) {
      fetchListings();
      fetchConversations(currentUserId);
    }
  }, [showOnlyMine, currentUserId]);

  // Apply filters
  useEffect(() => {
    let filtered = listings;

    if (searchTerm.trim()) {
      filtered = filtered.filter((item) =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (category !== 'All') {
      filtered = filtered.filter((item) => item.category === category);
    }

    if (minPrice) {
      filtered = filtered.filter((item) => parseFloat(item.price) >= parseFloat(minPrice));
    }

    if (maxPrice) {
      filtered = filtered.filter((item) => parseFloat(item.price) <= parseFloat(maxPrice));
    }

    setFilteredListings(filtered);
  }, [searchTerm, category, minPrice, maxPrice, listings]);

  const handleDelete = async (listingId) => {
    const confirm = window.confirm('Are you sure you want to delete this listing?');
    if (!confirm) return;

    try {
      const res = await fetch(`http://localhost:5000/api/listings/${listingId}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || 'Failed to delete listing');
      }

      // Refresh listings
      fetchListings();
    } catch (error) {
      console.error('Delete error:', error);
      alert('Failed to delete listing');
    }
  };

  const handleEdit = (listingId) => {
    navigate(`/edit/${listingId}`);
  };

  const handleListingClick = (listingId) => {
    navigate(`/listings/${listingId}`);
  };

  const categories = ['All', ...new Set(listings.map((item) => item.category))];

  return (
    <div className="dashboard-container" style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar showOnlyMine={showOnlyMine} setShowOnlyMine={setShowOnlyMine} />

      <main style={{ flex: 1, padding: '20px' }}>
        <h2>{showOnlyMine ? 'My Listings' : 'All Listings'}</h2>

        {/* Filters */}
        <div style={{ marginBottom: '20px', display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
          <input
            type="text"
            placeholder="Search listings by title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ padding: '10px', width: '200px', border: '1px solid #ccc', borderRadius: '4px' }}
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
          >
            {categories.map((cat, idx) => (
              <option key={idx} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          <input
            type="number"
            placeholder="Min Price"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            style={{ padding: '10px', width: '120px', border: '1px solid #ccc', borderRadius: '4px' }}
          />

          <input
            type="number"
            placeholder="Max Price"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            style={{ padding: '10px', width: '120px', border: '1px solid #ccc', borderRadius: '4px' }}
          />
        </div>

        {loading && <div>Loading...</div>}
        {error && <p style={{ color: 'red' }}>{error}</p>}

        {!loading && filteredListings.length === 0 && (
          <p>{showOnlyMine ? "You haven't created any listings yet." : 'No listings found.'}</p>
        )}

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
            gap: '20px',
          }}
        >
          {filteredListings.map((item) => (
            <div
              key={item._id}
              style={{
                border: '1px solid #ccc',
                padding: '15px',
                borderRadius: '8px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                position: 'relative',
              }}
            >
              <div onClick={() => handleListingClick(item._id)} style={{ cursor: 'pointer' }}>
                {item.image && (
                  <img
                    src={`http://localhost:5000/${item.image}`}
                    alt={item.title}
                    style={{
                      width: '100%',
                      height: '150px',
                      objectFit: 'cover',
                      borderRadius: '4px',
                      marginBottom: '10px',
                    }}
                  />
                )}
                <h3>{item.title}</h3>
                <p style={{ fontSize: '0.9rem', color: '#555' }}>
                  {item.description.length > 60
                    ? item.description.slice(0, 60) + '...'
                    : item.description}
                </p>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <strong>${parseFloat(item.price).toFixed(2)}</strong>
                  <span>{item.category}</span>
                </div>
              </div>

              {item.userId === currentUserId && (
                <div style={{ marginTop: '10px', display: 'flex', gap: '10px' }}>
                  <button
                    onClick={() => handleEdit(item._id)}
                    style={{
                      padding: '6px 10px',
                      background: '#007bff',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                    }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item._id)}
                    style={{
                      padding: '6px 10px',
                      background: '#dc3545',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                    }}
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Messages Section */}
        <h3 style={{ marginTop: '40px' }}>Messages</h3>
        {conversations.length === 0 ? (
          <p>No messages yet.</p>
        ) : (
          <div style={{ marginTop: '10px' }}>
            {conversations.map((msg, idx) => {
              // Determine other user id
              const otherUserId = msg.senderId === currentUserId ? msg.recipientId : msg.senderId;
              return (
                <div
                  key={idx}
                  style={{
                    border: '1px solid #ddd',
                    padding: '10px',
                    borderRadius: '4px',
                    marginBottom: '10px',
                    backgroundColor: '#f9f9f9',
                  }}
                >
                  <p>
                    Chat with: <strong>{otherUserId}</strong>
                  </p>
                  <p>Last message: {msg.text}</p>
                  <button
                    onClick={() => {
                      setSelectedChatUserId(otherUserId);
                      setShowChat(true);
                    }}
                    style={{
                      padding: '6px 10px',
                      background: '#007bff',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                    }}
                  >
                    Open Chat
                  </button>
                </div>
              );
            })}
          </div>
        )}

        {/* Chat component */}
        {showChat && selectedChatUserId && (
          <Chat
            currentUserId={currentUserId}
            sellerId={selectedChatUserId}
            onClose={() => {
              setShowChat(false);
              setSelectedChatUserId(null);
              fetchConversations(currentUserId); // refresh conversations after chat close
            }}
          />
        )}
      </main>
    </div>
  );
};

export default Dashboard;







