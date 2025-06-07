const express = require('express');
const router = express.Router();
const { postRideOffer } = require('../controllers/rideController');

router.post('/rides', postRideOffer);

module.exports = router;
