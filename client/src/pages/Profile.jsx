import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [user, setUser] = useState({ name: '', email: '' });
  const [editing, setEditing] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const userId = localStorage.getItem('userId');

  useEffect(() => {
    if (!userId) {
      navigate('/login');
      return;
    }

    const fetchUser = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/users/${userId}`, {
          credentials: 'include',
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || 'Failed to load user');

        setUser({ name: data.user.name, email: data.user.email });
      } catch (err) {
        setError(err.message);
      }
    };

    fetchUser();
  }, [userId, navigate]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      const res = await fetch(`http://localhost:5000/api/users/${userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(user),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Update failed');

      setSuccess('Profile updated successfully!');
      setEditing(false);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="form-container">
      <h2 style={{ textAlign: 'center', marginBottom: '1rem' }}>My Profile</h2>

      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
      {success && <p style={{ color: 'green', textAlign: 'center' }}>{success}</p>}

      {editing ? (
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Name:</label>
          <input
            id="name"
            name="name"
            value={user.name}
            onChange={handleChange}
            required
          />

          <label htmlFor="email">Email:</label>
          <input
            id="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            required
          />

          <button className="btn login-btn" type="submit">Save</button>
          <button
            className="btn signup-btn"
            type="button"
            onClick={() => setEditing(false)}
            style={{ marginTop: '0.5rem' }}
          >
            Cancel
          </button>
        </form>
      ) : (
        <div style={{ textAlign: 'center' }}>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <button
            className="btn login-btn"
            onClick={() => setEditing(true)}
          >
            Edit Profile
          </button>
          <button
  className="btn signup-btn"
  onClick={() => navigate(-1)} // or navigate('/dashboard') if you want a fixed route
  style={{ marginBottom: '1rem' }}
>
  ← Back
</button>

        </div>
      )}
    </div>
  );
};

export default Profile;


