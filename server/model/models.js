const client = require('../db/index');

// GET /products
const getProducts= ((page = 1, count = 5) => {
  page = Number(page);
  count = Number(count);
  let id1 = 1;
  let id2 = count;
  if (page > 1) {
    id1 = ((page - 1) * count) + 1;
    id2 = id1 + count - 1;
  }
  return client
    .query('SELECT * FROM products WHERE id >= $1 and id <= $2', [id1, id2])
    .then((res) => {
      return res.rows;
    })
})

// GET /products/:product_id
const getProductById = ((id) => {
  let product;
  return client // promises need to be returned on the outer scope
    .query('SELECT * FROM products WHERE id=$1', [id])
    .then((result) => {
      product = result.rows[0];
    })
    .then(() => {
      client
        .query('SELECT * FROM features WHERE product_id=$1', [id])
        .then((res) => {
          product.features = res.rows;
          return product;
        })
    })
})

// GET /products/:product_id/related
const getRelatedProduct = ((id) => {
  return client
    .query('SELECT * FROM related WHERE current_product_id=$1', [id])
    .then((res) => {
      let related = [];
      for (let obj of res.rows) {
        related.push(obj.related_product_id)
      }
      return related;
    })
})

// GET /products/:product_id/styles
const getProductStyle = (() => {
  console.log('work in progress')
})

module.exports = {
  getProducts,
  getProductById,
  getRelatedProduct,
  getProductStyle
}
