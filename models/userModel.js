const db = require('../config/db');

exports.createUser = async (name, email, hashedPassword) => {
  const {rows} = await db.query('INSERT INTO users (name, email, password) VALUES ($1, $2, $3)', [name, email, hashedPassword]);
  return rows;
};

exports.getUserByEmail = async (email) => {
  const {rows} = await db.query('SELECT * FROM users WHERE email = $1', [email]);
  return rows[0];
};
