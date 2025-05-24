// src/components/EditListing.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function EditListing() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    category: '',
    image: null,
  });
  const [preview, setPreview] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchListing = async () => {
      const res = await fetch(`http://localhost:5000/api/listings/${id}`);
      const data = await res.json();
      if (data.success) {
        setFormData(data.listing);
        setPreview(`http://localhost:5000/${data.listing.image}`);
      } else {
        setMessage('Failed to load listing');
      }
    };
    fetchListing();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setFormData((prev) => ({ ...prev, image: files[0] }));
      setPreview(URL.createObjectURL(files[0]));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();

    for (const key in formData) {
      if (key !== '_id' && formData[key] !== null) {
        data.append(key, formData[key]);
      }
    }

    const res = await fetch(`http://localhost:5000/api/listings/${id}`, {
      method: 'PUT',
      body: data,
    });

    const result = await res.json();
    if (result.success) {
      setMessage('Listing updated successfully');
      navigate('/dashboard');
    } else {
      setMessage(result.error || 'Failed to update listing');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: 'auto' }}>
      <h2>Edit Listing</h2>
      {message && <p>{message}</p>}

      <input name="title" value={formData.title} onChange={handleChange} required placeholder="Title" />
      <textarea name="description" value={formData.description} onChange={handleChange} required placeholder="Description" />
      <input name="price" type="number" value={formData.price} onChange={handleChange} required placeholder="Price" />
      <select name="category" value={formData.category} onChange={handleChange}>
        <option value="">Select Category</option>
        <option value="Electronics">Electronics</option>
        <option value="Books">Books</option>
        <option value="Clothing">Clothing</option>
        <option value="Furniture">Furniture</option>
        <option value="Other">Other</option>
      </select>

      <input type="file" name="image" onChange={handleChange} />
      {preview && <img src={preview} alt="Preview" style={{ maxWidth: '100%' }} />}
      <button type="submit">Save Changes</button>
    </form>
  );
}

export default EditListing;
