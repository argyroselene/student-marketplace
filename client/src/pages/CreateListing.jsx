import React, { useState } from 'react';

const categories = ['Electronics', 'Books', 'Clothing', 'Furniture', 'Other'];

function CreateListing() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    category: '',
    image: null,
  });
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      const file = files[0];
      setFormData((prev) => ({ ...prev, image: file }));
      if (file) {
        setPreview(URL.createObjectURL(file));
      } else {
        setPreview(null);
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
    setMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.category) {
      setMessage('Please select a category.');
      return;
    }

    setLoading(true);
    const data = new FormData();

    // Append all form fields
    for (const key in formData) {
      data.append(key, formData[key]);
    }

    // Append userId from localStorage
    try {
      const storedUser = localStorage.getItem('user');
      const user = storedUser ? JSON.parse(storedUser) : null;

      if (!user || !user.id) {
        setMessage('User not logged in or ID not found.');
        setLoading(false);
        return;
      }

      data.append('userId', user.id);

      const res = await fetch('http://localhost:5000/api/listings', {
        method: 'POST',
        body: data,
      });

      if (!res.ok) {
        const error = await res.text();
        throw new Error(error);
      }

      const result = await res.json();
      if (result.success) {
        setMessage('Listing created successfully!');
        setFormData({
          title: '',
          description: '',
          price: '',
          category: '',
          image: null,
        });
        setPreview(null);
      } else {
        setMessage(result.message || 'Failed to create listing.');
      }
    } catch (err) {
      setMessage('Upload failed, please try again.');
      console.error('Upload failed:', err);
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="listing-form" style={{ maxWidth: 400, margin: 'auto' }}>
      <h2>Create New Listing</h2>

      <label>
        Title:
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          placeholder="Enter product title"
        />
      </label>

      <label>
        Description:
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          placeholder="Enter product description"
          rows={4}
        />
      </label>

      <label>
        Price ($):
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          required
          min="0"
          step="0.01"
          placeholder="Enter price"
        />
      </label>

      <label>
        Category:
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
        >
          <option value="">-- Select category --</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </label>

      <label>
        Product Image:
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleChange}
          required
        />
      </label>

      {preview && (
        <img
          src={preview}
          alt="Preview"
          style={{ width: '100%', maxHeight: 200, objectFit: 'contain', marginBottom: 10 }}
        />
      )}

      <button type="submit" disabled={loading}>
        {loading ? 'Creating...' : 'Create Listing'}
      </button>

      {message && <p style={{ marginTop: 10, color: message.includes('success') ? 'green' : 'red' }}>{message}</p>}
    </form>
  );
}

export default CreateListing;
