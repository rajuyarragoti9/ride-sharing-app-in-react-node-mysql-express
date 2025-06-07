const db = require('../config/db');

const createRide = (rideData, callback) => {
  const {
    user_id,
    from_location,
    to_location,
    via_locations,
    departure_datetime,
    seats_available,
    price_per_km,
    total_price,
  } = rideData;

  const sql = `
    INSERT INTO ride_offers (
      user_id, from_location, to_location, via_locations,
      departure_datetime, seats_available, price_per_km, total_price
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(sql, [
    user_id,
    from_location,
    to_location,
    JSON.stringify(via_locations),
    departure_datetime,
    seats_available,
    price_per_km,
    total_price
  ], callback);
};

module.exports = { createRide };
