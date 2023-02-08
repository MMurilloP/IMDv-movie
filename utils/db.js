require ('dotenv').config();

const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

pool.connect((err) => {
  if (err) {
    console.error('Error de conexion a ElephantSQL', err.stack);
  } else {
    console.log('Conectado a ElephantSQL');
  }
});

module.exports = pool;