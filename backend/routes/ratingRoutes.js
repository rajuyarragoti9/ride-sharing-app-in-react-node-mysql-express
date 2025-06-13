const express = require('express');
const router = express.Router();
const { rateRide, getDriverAverageRating } = require('../controllers/ratingController');
const authMiddleware = require('../middleware/authMiddleware');
const db = require('../config/db'); // 🆕 REQUIRED for the new route

// Route to rate a ride
router.post('/', authMiddleware, rateRide);

// Route to get average driver rating
router.get('/driver/:driverId', getDriverAverageRating);

// 🆕 New Route to check if user is a driver
router.get('/is-driver/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const [rows] = await db.query(
      "SELECT COUNT(*) AS ride_count FROM ride_offers WHERE user_id = ?",
      [userId]
    );
    const isDriver = rows[0].ride_count > 0;
    res.json({ isDriver });
  } catch (error) {
    console.error("Error checking driver status:", error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
