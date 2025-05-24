//BASIC CRUD
const Listing = require('../models/Listing');

exports.createListing = async (req, res) => {
  try {
    const listing = new Listing({
      ...req.body,
      owner: req.user.id, // assuming you use auth middleware
      university: req.user.university,
    });
    await listing.save();
    res.status(201).json({ success: true, data: listing });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

exports.getListings = async (req, res) => {
  try {
    const filters = {};

    if (req.query.type) filters.type = req.query.type;
    if (req.query.pricingModel) filters.pricingModel = req.query.pricingModel;
    if (req.query.category) filters.category = req.query.category;
    if (req.query.university) filters.university = req.query.university;
    if (req.query.condition) filters.condition = req.query.condition;

    if (req.query.minPrice || req.query.maxPrice) {
      filters.price = {};
      if (req.query.minPrice) filters.price.$gte = req.query.minPrice;
      if (req.query.maxPrice) filters.price.$lte = req.query.maxPrice;
    }

    const listings = await Listing.find(filters).populate('owner', 'name university');
    res.json({ success: true, data: listings });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
