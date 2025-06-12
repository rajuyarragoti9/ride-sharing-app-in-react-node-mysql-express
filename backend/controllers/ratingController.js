
const { addRating, getAverageRating } = require('../models/ratingModel');
const db = require('../config/db');

const rateRide = async (req, res) => {
  try {
    const user_id = req.user.id;
    const { ride_id, rating, comment } = req.body;

    if (!ride_id || !rating) {
      return res.status(400).json({ error: 'ride_id and rating are required' });
    }

    const [existing] = await db.query(
      'SELECT id FROM ratings WHERE user_id = ? AND ride_id = ?',
      [user_id, ride_id]
    );

    if (existing.length > 0) {
      return res.status(400).json({ error: 'You have already rated this ride.' });
    }

    await addRating(user_id, ride_id, rating, comment || '');
    res.status(201).json({ message: 'Rating submitted successfully' });
  } catch (err) {
    console.error('Rating Error:', err);
    res.status(500).json({ error: 'Error submitting rating' });
  }
};


const getDriverAverageRating = async (req, res) => {
  try {
    const driverId = req.params.driverId;
    const data = await getAverageRating(driverId);
    res.json({ average_rating: data.average_rating || 0 });
  } catch (err) {
    console.error('Average Rating Error:', err);
    res.status(500).json({ error: 'Failed to fetch average rating' });
  }
};

module.exports = { rateRide, getDriverAverageRating };
