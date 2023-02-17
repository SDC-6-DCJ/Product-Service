const client = require('../db/index');

// GET /products
const getProducts= ((page = 1, count = 5) => {
  client
    .query('SELECT * FROM products WHERE id > :last_id ORDER BY id LIMIT $1', [count])
    .then((result) => {
      console.log('result: ', result)
    })
    .catch((error) => console.error('error: ', error))
})
getProducts();

// // GET /products/:product_id
// const getProductById = ((id) => {
//   client
//     .query('SELECT * FROM products WHERE id=$1', [id])
//     .then((result) => console.log('result: ', result))
//     .catch((error) => console.error('error: ', error))
// })
// getProductById('40344');

// // GET /products/:product_id/related
// const getRelatedProduct = ((name) => {
//   client
//     .query('SELECT * FROM products WHERE name=$1', [name])
//     .then((result) => console.log('result: ', result))
//     .catch((error) => console.error('error: ', error))
// })

// // GET /products/:product_id/styles
// const getProductStyle = ((name) => {
//   client
//     .query('SELECT * FROM products WHERE name=$1', [name])
//     .then((result) => console.log('result: ', result))
//     .catch((error) => console.error('error: ', error))
// })

// module.exports = {
//   getProducts,
//   getProductById,
//   getRelatedProduct,
//   getProductStyle
// }
