const express = require('express');
const router = express.Router();
const multer = require('multer');
const Listing = require('../models/Listing'); // Make sure this path is correct

// Configure multer for file uploads
const upload = multer({ dest: 'uploads/' });

// GET all listings (or filtered by user if query param exists)
router.get('/', async (req, res) => {
  try {
    let query = {};
    
    if (req.query.userId) {
      query.userId = req.query.userId;
    }

    const listings = await Listing.find(query);
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
    const { title, description, price, category, userId } = req.body;
    const imagePath = req.file ? req.file.path : null;

    const newListing = new Listing({
      title,
      description,
      price,
      category,
      image: imagePath,
      userId
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
// GET a single listing by ID
router.get('/:id', async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);

    if (!listing) {
      return res.status(404).json({ 
        success: false,
        error: 'Listing not found' 
      });
    }

    res.json({ 
      success: true, 
      listing 
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
