const db = require("../config/db");

const addRating = async (user_id, ride_id, rating, comment) => {
  const sql = `INSERT INTO ratings (user_id, ride_id, rating, comment) VALUES (?, ?, ?, ?)`;
  const [result] = await db.query(sql, [user_id, ride_id, rating, comment]);
  return result;
};

const getAverageRating = async (driverId) => {
  const sql = `
    SELECT ROUND(AVG(r.rating), 1) AS average_rating
    FROM ratings r
    JOIN ride_offers ro ON r.ride_id = ro.id
    WHERE ro.user_id = ?
  `;
  const [rows] = await db.query(sql, [driverId]);
  return rows[0];
};

module.exports = { addRating, getAverageRating };
