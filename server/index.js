require('dotenv').config();
const express = require('express');
const router = require('./routes');

const { LOCAL_PORT, LOADER_IO } = process.env;

const app = express();

app.use(express.json());

app.use('/api', router);
app.get('/', (req, res) => res.send('Hello World'));
app.get(`/${LOADER_IO}`, (req, res) => res.send(`${LOADER_IO}`));

app.listen(LOCAL_PORT);
console.log('Server listening');
