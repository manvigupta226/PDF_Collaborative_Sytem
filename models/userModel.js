const db = require('../config/db');

exports.createUser = async (name, email, hashedPassword) => {
  const [rows] = await db.execute('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, hashedPassword]);
  return rows;
};

exports.getUserByEmail = async (email) => {
  const [rows] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
  return rows[0];
};
