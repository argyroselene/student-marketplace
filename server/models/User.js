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
  university: { type: String },       // Optional now
  department: { type: String },       // Optional
  year: { type: String },             // Optional
  dob: { type: Date },                // Optional
  phone: { type: String },            // Optional
  program: { type: String },          // Newly added optional field
  graduationYear: { type: String },   // Newly added optional field
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
