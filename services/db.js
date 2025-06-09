// services/db.js
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'Pocholo5',
  database: 'GESTION_AEROLINEA'
});

module.exports = pool;