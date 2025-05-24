// db.js
const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 5432, // default Postgres port
   ssl: {
    rejectUnauthorized: false, // Needed for Render or Railway
  },
});

module.exports = pool;
