// routes/rideRoutes.js
const express = require('express');
const router = express.Router();
const { postRideOffer, searchRideOffers } = require('../controllers/rideController');
const authMiddleware = require('../middleware/authMiddleware');
router.post('/rides', authMiddleware, postRideOffer);
router.get('/rides/search', searchRideOffers);

module.exports = router;
