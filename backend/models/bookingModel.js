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

module.exports = { createBooking };
