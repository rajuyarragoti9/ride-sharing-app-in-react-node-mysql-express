const { createBooking ,getUserBookings,getBookingsForRidesByOwner} = require('../models/bookingModel');

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

const getMyBookings = async (req, res) => {
  try {
    const user_id = req.user.id;
    const bookings = await getUserBookings(user_id);
    res.status(200).json({ bookings });
  } catch (error) {
    console.error('Error fetching my bookings:', error);
    res.status(500).json({ error: 'Failed to fetch bookings' });
  }
};

const getBookingsForMyRides = async (req, res) => {
  try {
    const owner_id = req.user.id;
    const bookings = await getBookingsForRidesByOwner(owner_id);
    res.status(200).json({ bookings });
  } catch (error) {
    console.error('Error fetching ride bookings:', error);
    res.status(500).json({ error: 'Failed to fetch bookings for your rides' });
  }
};

module.exports = { bookRide ,getMyBookings,getBookingsForMyRides};
