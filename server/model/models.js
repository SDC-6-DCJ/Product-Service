const client = require('../db/index');

// GET /products
const getProducts = ((page = 1, count = 5) => {
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
    .then((res) => res.rows);
});

// GET /products/:product_id
const getProductById = ((id) => {
  let product;
  return client // promises need to be returned on the outer scope
    .query('SELECT * FROM products WHERE id=$1', [id])
    .then(({ rows }) => {
      const [first] = rows;
      product = first;
    })
    .then(() => {
      client
        .query('SELECT * FROM features WHERE product_id=$1', [id])
        .then((res) => {
          product.features = res.rows;
          return product;
        });
    });
});

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
    });
});

// GET /products/:product_id/styles
const getProductStyle = ((id) => {
  const query = `SELECT
  styles.id AS style_id,
  styles.name,
  styles.sale_price,
  styles.original_price,
  styles.default_style AS "default?",
  array_agg(json_build_object('thumbnail_url', photos.thumbnail_url, 'url', photos.url)) as photos,
  json_object_agg(skus.id,
  json_build_object('quantity',
  skus.quantity, 'size',
  skus.size)) AS skus
FROM styles
LEFT JOIN photos ON styles.id = photos.style_id
LEFT JOIN skus ON styles.id = skus.style_id
WHERE product_id=$1
GROUP BY styles.id, skus.id`;

  const query2 = `SELECT
  json_build_object("id",
  json_build_object('quantity',
  skus.quantity, 'size',
  skus.size)) AS skus

FROM skus WHERE style_id=$1;`;
  return client
    .query(query, [id])
    .then((res) => {
      console.log('res: ', res);
      return res.rows;
    });
});


module.exports = {
  getProducts,
  getProductById,
  getRelatedProduct,
  getProductStyle
};
