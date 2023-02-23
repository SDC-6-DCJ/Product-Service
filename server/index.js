require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const router = require('./routes');

const { SERVER_HOST, LOCAL_PORT } = process.env;

const app = express();

app.use(morgan('dev'));
app.use(express.json());

app.use('/api', router);
app.get('/', (req, res) => res.send('Hello World'));

app.listen(LOCAL_PORT);
console.log(`Server listening at ${SERVER_HOST}:${LOCAL_PORT}`);
