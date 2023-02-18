require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const router = require('./routes');

const { HOST, LOCAL_PORT } = process.env;

const app = express();

/* MIDDLEWARE */
app.use(morgan('dev'));
app.use(express.json());

app.use('/api', router);

app.listen(LOCAL_PORT);
console.log(`Server listening at ${HOST}:${LOCAL_PORT}`);