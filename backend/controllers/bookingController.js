const { createBooking, getUserBookings, getBookingsForRidesByOwner } = require('../models/bookingModel');
const db = require("../config/db");

const bookRide = async (req, res) => {
  const userId = req.user.id;
  const { ride_id, seats_booked } = req.body;

  const connection = await db.getConnection();
  try {
    await connection.beginTransaction();

    // Check if user already booked this ride
    const [existing] = await connection.query(
      'SELECT id FROM bookings WHERE user_id = ? AND ride_id = ? FOR UPDATE',
      [userId, ride_id]
    );
    if (existing.length > 0) {
      await connection.rollback();
      return res.status(400).json({ message: 'You have already booked this ride.' });
    }

    // Check available seats
    const [rideRows] = await connection.query(
      'SELECT seats_available FROM ride_offers WHERE id = ? FOR UPDATE',
      [ride_id]
    );
    if (rideRows.length === 0) {
      await connection.rollback();
      return res.status(404).json({ message: 'Ride not found' });
    }

    const availableSeats = rideRows[0].seats_available;
    if (availableSeats < seats_booked) {
      await connection.rollback();
      return res.status(400).json({ message: `Only ${availableSeats} seats are available.` });
    }

    // Proceed with booking
    await connection.query(
      'UPDATE ride_offers SET seats_available = seats_available - ? WHERE id = ?',
      [seats_booked, ride_id]
    );
    await connection.query(
      'INSERT INTO bookings (user_id, ride_id, seats_booked) VALUES (?, ?, ?)',
      [userId, ride_id, seats_booked]
    );

    await connection.commit();
    res.status(201).json({ message: 'Ride booked successfully' });
  } catch (err) {
    await connection.rollback();
    console.error('Booking error:', err);
    res.status(500).json({ message: 'Failed to book ride' });
  } finally {
    connection.release();
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

module.exports = { bookRide, getMyBookings, getBookingsForMyRides };
