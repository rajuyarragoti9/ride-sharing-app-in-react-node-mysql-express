// routes/rideRoutes.js
const express = require('express');
const router = express.Router();
const { postRideOffer, searchRideOffers } = require('../controllers/rideController');

router.post('/rides', postRideOffer);
router.get('/rides/search', searchRideOffers);

module.exports = router;
