const { createRide, searchRides } = require('../models/rideModel');

const postRideOffer = async (req, res) => {
  try {
    const rideData = {
      ...req.body,
      user_id: req.user.id,
    };
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
    const {
      from_location,
      to_location,
      via_location,
      min_seats,
      max_price,
    } = req.query;

    if (!from_location || !to_location) {
      return res
        .status(400)
        .json({ error: 'from_location and to_location are required' });
    }

    const filters = {
      from_location,
      to_location,
      via_location,
      min_seats: min_seats ? parseInt(min_seats) : null,
      max_price: max_price ? parseFloat(max_price) : null,
    };

    const results = await searchRides(filters);

    const formattedResults = results.map((ride) => ({
      ...ride,
      via_locations: Array.isArray(ride.via_locations)
        ? ride.via_locations
        : (() => {
            try {
              return JSON.parse(ride.via_locations);
            } catch (err) {
              return ride.via_locations.split(',').map((s) => s.trim());
            }
          })(),
    }));

    res.json({ rides: formattedResults });
  } catch (error) {
    console.error('Error searching ride offers:', error);
    res.status(500).json({ error: 'Database error during search' });
  }
};

module.exports = { postRideOffer, searchRideOffers };
