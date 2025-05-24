const express = require('express');
const router = express.Router();
const multer = require('multer');
const Listing = require('../models/Listing'); // Make sure you have this model

const upload = multer({ dest: 'uploads/' });

// GET all listings
router.get('/', async (req, res) => {
  try {
    const listings = await Listing.find(); // Fetch from database
    res.json({ 
      success: true,
      listings 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      success: false, 
      error: 'Server error' 
    });
  }
});

// POST create new listing
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { title, description, price, category } = req.body;
    const imagePath = req.file ? req.file.path : null;

    // Create and save to database
    const newListing = new Listing({
      title,
      description,
      price,
      category,
      image: imagePath
    });

    await newListing.save();

    res.status(201).json({ 
      success: true, 
      listing: newListing 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      success: false, 
      error: 'Server error' 
    });
  }
});

module.exports = router;
