const { createRide } = require('../models/rideModel');

const postRideOffer = (req, res) => {
  const rideData = req.body;

  createRide(rideData, (err, result) => {
    if (err) return res.status(500).json({ error: 'Database error while creating ride' });
    res.status(201).json({ message: 'Ride offer created successfully', rideId: result.insertId });
  });
};

module.exports = { postRideOffer };
