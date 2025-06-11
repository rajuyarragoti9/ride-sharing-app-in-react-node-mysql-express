const db = require('../config/db');

const createBooking = async (user_id, ride_id, seats_booked) => {
  const checkSeatsSql = `
    SELECT seats_available FROM ride_offers WHERE id = ?
  `;
const [ride] = await db.query(checkSeatsSql, [ride_id]);
  const available = ride[0]?.seats_available || 0;

  if (available < seats_booked) {
    throw new Error('Not enough seats available');
  }

  const bookingSql = `
    INSERT INTO bookings (user_id, ride_id, seats_booked) VALUES (?, ?, ?)
  `;
  await db.query(bookingSql, [user_id, ride_id, seats_booked]);

  const updateSeatsSql = `
    UPDATE ride_offers SET seats_available = seats_available - ? WHERE id = ?
  `;
  return db.query(updateSeatsSql, [seats_booked, ride_id]);
};


const getUserBookings = async (user_id) => {
  const sql = `
    SELECT b.*, r.from_location, r.to_location, r.departure_datetime, r.status AS ride_status
    FROM bookings b
    JOIN ride_offers r ON b.ride_id = r.id
    WHERE b.user_id = ?
    ORDER BY r.departure_datetime DESC
  `;
  const [rows] = await db.query(sql, [user_id]);
  return rows;
};
const getBookingsForRidesByOwner = async (owner_id) => {
  const sql = `
    SELECT b.*, u.name AS passenger_name, r.from_location, r.to_location, r.departure_datetime
    FROM bookings b
    JOIN ride_offers r ON b.ride_id = r.id
    JOIN users u ON b.user_id = u.id
    WHERE r.user_id = ?
    ORDER BY r.departure_datetime DESC
  `;
  const [rows] = await db.query(sql, [owner_id]);
  return rows;
};

module.exports = { createBooking ,getUserBookings,getBookingsForRidesByOwner};
