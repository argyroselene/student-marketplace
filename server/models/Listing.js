const mongoose = require('mongoose');

const listingSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  type: { type: String, enum: ['item', 'service'], required: true },
  price: { type: Number, required: true },
  pricingModel: { type: String, enum: ['fixed', 'hourly'], required: true },
  condition: { type: String },
  visibility: { type: String, enum: ['university', 'public'], default: 'university' },
  category: { type: String },
  university: { type: String },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

module.exports = mongoose.model('Listing', listingSchema);
