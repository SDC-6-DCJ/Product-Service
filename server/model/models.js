const client = require('../db/index');

// GET /products
const getProducts= ((page = 1, count = 5) => {
  let id1 = 1;
  let id2 = count;
  if (page > 1) {
    id1 = ((page - 1) * count) + 1;
    id2 = id1 + count - 1;
  }
  client
    .query('SELECT * FROM products WHERE id >= $1 and id <= $2', [id1, id2])
    .then((result) => {
      console.log('result: ', result)
    })
    .catch((error) => console.error('error: ', error))
})
// getProducts();

// GET /products/:product_id
const getProductById = ((id) => {
  let product;
  client
    .query('SELECT * FROM products WHERE id=$1', [id])
    .then((result) => {
      product = result.rows[0];
    })
    .then(() => {
      client
        .query('SELECT * FROM features WHERE product_id=$1', [id])
        .then((res) => {
          product.features = res.rows;
          console.log('product: ', product)
        })
    })
    .catch((error) => console.error('error: ', error))
})
getProductById(13);

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
