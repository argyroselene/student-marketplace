const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/^[\w.-]+@[\w.-]+\.(edu)$/, 'Must be a valid .edu email address'],
  },
  password: { type: String, required: true },
  university: { type: String, default: '' },   // Optional, default empty string
  department: { type: String, default: '' },   // Optional
  year: { type: String, default: '' },         // Optional
  dob: { type: Date, default: null },          // Optional, null if not provided
  phone: { type: String, default: '' },        // Optional
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);

