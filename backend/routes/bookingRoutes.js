const express = require('express');
const router = express.Router();
const { bookRide } = require('../controllers/bookingController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, bookRide);

module.exports = router;
