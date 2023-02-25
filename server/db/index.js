require('dotenv').config();

const { Pool } = require('pg');

const config = {
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
};

const client = new Pool(config);

client
  .connect()
  .then(() => console.log('connected!'))
  .catch((err) => console.error(err));

module.exports = client;
