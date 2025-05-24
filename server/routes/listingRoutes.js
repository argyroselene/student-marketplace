const express = require('express');
const router = express.Router();
const { createListing, getListings } = require('../controllers/listingController');
const verifyToken = require('../middleware/authMiddleware'); // if auth is set up

router.post('/', verifyToken, createListing);
router.get('/', getListings);

module.exports = router;
