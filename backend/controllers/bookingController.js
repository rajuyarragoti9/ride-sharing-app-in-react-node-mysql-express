const { createBooking } = require('../models/bookingModel');

const bookRide = async (req, res) => {
  try {
    const { ride_id, seats_booked } = req.body;
    const user_id = req.user.id;

    if (!ride_id || !seats_booked) {
      return res.status(400).json({ error: 'ride_id and seats_booked are required' });
    }

    const result = await createBooking(user_id, ride_id, seats_booked);
    res.status(201).json({ message: 'Ride booked successfully', bookingId: result.insertId });
  } catch (error) {
    console.error('Booking failed:', error);
    res.status(500).json({ error: 'Database error while booking ride' });
  }
};

module.exports = { bookRide };
