const { Pool } = require('pg');

const pool = new Pool({
  host: 'manny.db.elephantsql.com',
  port: 5432,
  user: 'fcmakyzw',
  password: 'Pd49U1oidj3ShQDFBX1iMK1xZnlCtJAY',
  database: 'fcmakyzw'
});

pool.connect((err) => {
  if (err) {
    console.error('Error de conexion a ElephantSQL', err.stack);
  } else {
    console.log('Conectado a ElephantSQL');
  }
});

module.exports = pool;