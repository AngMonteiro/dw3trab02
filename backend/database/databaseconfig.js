//-- arquivo: database/databaseconfig.js
const { Pool, types } = require('pg');

// Faz o pg devolver campos DATE como texto 'AAAA-MM-DD' (evita problema de fuso horário)
types.setTypeParser(1082, (valor) => valor);

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};
