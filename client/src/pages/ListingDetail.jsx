import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaMapMarkerAlt } from 'react-icons/fa';
import Chat from './Chat';

const ListingDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showChat, setShowChat] = useState(false);

  // Get logged-in user (replace with your auth logic)
  const currentUser = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/listings/${id}`);
        const data = await res.json();

        if (!res.ok) throw new Error(data.message || 'Failed to fetch listing');

        setListing(data.listing);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchListing();
  }, [id]);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!listing) return <div>Listing not found</div>;

  return (
    <div className="listing-detail-container">
      <button 
        onClick={() => navigate(-1)}
        className="back-button"
      >
        <FaArrowLeft /> Back to Listings
      </button>

      <div className="listing-header">
        <h1>{listing.title}</h1>
        <p className="price">${listing.price.toFixed(2)}</p>
      </div>

      <div className="image-gallery">
        {listing.image && (
          <img 
            src={`http://localhost:5000/${listing.image}`} 
            alt={listing.title}
          />
        )}
      </div>

      <div className="listing-body">
        <div className="details-section">
          <h3>Description</h3>
          <p>{listing.description}</p>

          <h3>Category</h3>
          <p>{listing.category}</p>
        </div>

        <div className="delivery-section">
          <h3>Delivery Information</h3>
          {listing.deliveryLocation?.address && (
            <p><FaMapMarkerAlt /> {listing.deliveryLocation.address}</p>
          )}
        </div>

        <div className="seller-section">
          <h3>Seller Information</h3>
          {listing.userId ? (
            <>
              <p><strong>Name:</strong> {listing.userId.name}</p>
              <p><strong>Email:</strong> {listing.userId.email}</p>
            </>
          ) : (
            <p>Seller information not available</p>
          )}
        </div>
      </div>

      {currentUser && currentUser._id !== listing.userId._id && (
        <button className="contact-button" onClick={() => setShowChat(true)}>
          Contact Seller
        </button>
      )}

      {showChat && (
        <Chat
          currentUserId={currentUser._id}
          sellerId={listing.userId._id}
          onClose={() => setShowChat(false)}
        />
      )}
    </div>
  );
};

export default ListingDetail;

