const express = require('express');
const router = express.Router();
const { bookRide,getMyBookings, getBookingsForMyRides} = require('../controllers/bookingController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, bookRide);
router.get('/my', authMiddleware, getMyBookings);
router.get('/for-my-rides', authMiddleware, getBookingsForMyRides);

module.exports = router;

