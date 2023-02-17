const client = require('./index');

// sample query
const selectById = ((name) => {
  client
    .query('SELECT * FROM products WHERE name=$1', [name])
    .then((result) => console.log('result: ', result))
    .catch((error) => console.error('error: ', error))
})

selectById('Camo Onesie');
