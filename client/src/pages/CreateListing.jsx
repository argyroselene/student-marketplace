import React, { useState } from 'react';

export default function CreateListing() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'item', // default value
    price: '',
    pricingModel: 'fixed', // default value
    condition: '',
    visibility: 'university',
    category: '',
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const response = await fetch('http://localhost:5000/api/listings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Add auth token here if you use one, e.g.:
          // 'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Listing created successfully!');
        setFormData({
          title: '',
          description: '',
          type: 'item',
          price: '',
          pricingModel: 'fixed',
          condition: '',
          visibility: 'university',
          category: '',
        });
      } else {
        setMessage(data.message || 'Failed to create listing.');
      }
    } catch (err) {
      setMessage('Server error. Try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: 'auto', padding: '1rem' }}>
      <h2>Create a New Listing</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Title:<br />
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            />
        </label><br /><br />

        <label>
          Description:<br />
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows={4}
          />
        </label><br /><br />

        <label>
          Type:<br />
          <select name="type" value={formData.type} onChange={handleChange}>
            <option value="item">Item</option>
            <option value="service">Service</option>
          </select>
        </label><br /><br />

        <label>
          Price:<br />
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
            min="0"
            step="0.01"
          />
        </label><br /><br />

        <label>
          Pricing Model:<br />
          <select name="pricingModel" value={formData.pricingModel} onChange={handleChange}>
            <option value="fixed">Fixed</option>
            <option value="hourly">Hourly</option>
          </select>
        </label><br /><br />

        <label>
          Condition:<br />
          <input
            type="text"
            name="condition"
            value={formData.condition}
            onChange={handleChange}
            placeholder="e.g. new, used"
          />
        </label><br /><br />

        <label>
          Visibility:<br />
          <select name="visibility" value={formData.visibility} onChange={handleChange}>
            <option value="university">University</option>
            <option value="public">Public</option>
          </select>
        </label><br /><br />

        <label>
          Category:<br />
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="e.g. electronics, tutoring"
          />
        </label><br /><br />

        <button type="submit" disabled={loading}>
          {loading ? 'Creating...' : 'Create Listing'}
        </button>
      </form>
    </div>
  );
}
