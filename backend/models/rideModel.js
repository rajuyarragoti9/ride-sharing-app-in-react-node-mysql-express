const db = require('../config/db');
const createRide = async (ride) => {
  const {
    user_id,
    from_location,
    to_location,
    via_locations,
    departure_datetime,
    seats_available,
    price_per_km,
    total_price,
  } = ride;

  return await db.execute(
    `INSERT INTO ride_offers 
(user_id, from_location, to_location, via_locations, departure_datetime, seats_available, price_per_km, total_price)
VALUES (?, ?, ?, ?, ?, ?, ?, ?)
`,
    [
      user_id,
      from_location,
      to_location,
      JSON.stringify(via_locations),
      departure_datetime,
      seats_available,
      price_per_km,
      total_price
    ]
  );
};


const searchRides = async ({
  from_location,
  to_location,
  via_location,
  min_seats,
  max_price,
}) => {
  let sql = `
    SELECT * FROM ride_offers
    WHERE from_location = ? AND to_location = ?
  `;
  const params = [from_location, to_location];

  if (via_location) {
    sql += ` AND JSON_CONTAINS(via_locations, JSON_QUOTE(?))`;
    params.push(via_location);
  }

  if (min_seats !== null) {
    sql += ` AND seats_available >= ?`;
    params.push(min_seats);
  }

  if (max_price !== null) {
    sql += ` AND total_price <= ?`;
    params.push(max_price);
  }

  sql += ` ORDER BY departure_datetime ASC`;

  const [results] = await db.execute(sql, params);
  return results;
};

module.exports = { createRide, searchRides };
