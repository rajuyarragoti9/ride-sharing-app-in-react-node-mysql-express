const express = require('express');
const router = express.Router();
const { rateRide, getDriverAverageRating } = require('../controllers/ratingController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, rateRide);
router.get('/driver/:driverId', getDriverAverageRating);

module.exports = router;
