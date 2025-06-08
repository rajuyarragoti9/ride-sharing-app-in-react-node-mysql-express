const db = require('../config/db');

const createUser = async (name, email, hashedPassword) => {
  const sql = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
  const [result] = await db.execute(sql, [name, email, hashedPassword]);
  return result;
};

const findUserByEmail = async (email) => {
  const sql = 'SELECT * FROM users WHERE email = ?';
  const [rows] = await db.execute(sql, [email]);
  return rows;
};

module.exports = { createUser, findUserByEmail };
