require('dotenv').config();

const { Client } = require("pg");

const credentials = {
  // user: process.env.DB_USER,
  host: process.env.HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: process.env.PORT
};

const client = new Client(credentials);

client
  .connect()
  .then(() => console.log('connected!'))
  .catch((err) => console.error(err));

module.exports = client;
