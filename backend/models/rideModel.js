// models/rideModel.js
const db = require('../config/db');

const createRide = async (rideData) => {
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

  const [result] = await db.execute(sql, [
    user_id,
    from_location,
    to_location,
    JSON.stringify(via_locations),
    departure_datetime,
    seats_available,
    price_per_km,
    total_price,
  ]);

  return result;
};

const searchRides = async (from, to, via) => {
  let sql = `SELECT * FROM ride_offers WHERE from_location = ? AND to_location = ?`;
  const params = [from, to];

  if (via) {
    sql += ` AND JSON_CONTAINS(via_locations, JSON_QUOTE(?))`;
    params.push(via);
  }

  const [results] = await db.execute(sql, params);
  return results;
};

module.exports = { createRide, searchRides };
