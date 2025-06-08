// controllers/rideController.js
const { createRide, searchRides } = require('../models/rideModel');

const postRideOffer = async (req, res) => {
  try {
    const rideData = req.body;
    const result = await createRide(rideData);

    res.status(201).json({
      message: 'Ride offer created successfully',
      rideId: result.insertId,
    });
  } catch (error) {
    console.error('Error creating ride offer:', error);
    res.status(500).json({ error: 'Database error while creating ride' });
  }
};

const searchRideOffers = async (req, res) => {
  try {
    const { from_location, to_location, via_location } = req.query;

    if (!from_location || !to_location) {
      return res.status(400).json({ error: 'from_location and to_location are required' });
    }

    const results = await searchRides(from_location, to_location, via_location);
    res.json(results);
  } catch (error) {
    console.error('Error searching ride offers:', error);
    res.status(500).json({ error: 'Database error during search' });
  }
};

module.exports = { postRideOffer, searchRideOffers };
