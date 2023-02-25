const pool = require('../db/index');

// GET /products
const getProducts = ((page = 1, count = 5) => {
  const pg = Number(page);
  const ct = Number(count);
  let id1 = 1;
  let id2 = ct;
  if (pg > 1) {
    id1 = ((pg - 1) * ct) + 1;
    id2 = id1 + ct - 1;
  }
  return pool.connect()
    .then((client) => client
      .query('SELECT * FROM products WHERE id >= $1 and id <= $2', [id1, id2])
      .then((res) => res.rows)
      .catch(() => {
        client.release();
      }));
});

// GET /products/:product_id
const getProductById = ((id) => {
  let product;
  return pool.connect()
    .then((client) => client
      .query('SELECT * FROM products WHERE id=$1', [id])
      .then(({ rows }) => {
        const [first] = rows;
        product = first;
      })
      .then(() => client.query('SELECT * FROM features WHERE product_id=$1', [id]))
      .then((res) => {
        product.features = res.rows;
        return product;
      })
      .catch(() => {
        client.release();
      }));
});

// GET /products/:product_id/related
const getRelatedProduct = ((id) => client
  .query('SELECT * FROM related WHERE current_product_id=$1', [id])
  .then((res) => res.rows.map((item) => item.related_product_id)));

// GET /products/:product_id/styles
const getProductStyle = ((id) => {
  const product = { product_id: id };

  const query = `SELECT
  styles.id AS style_id,
  styles.name,
  styles.sale_price,
  styles.original_price,
  styles.default_style AS "default?",
  array_agg(json_build_object('thumbnail_url', photos.thumbnail_url, 'url', photos.url)) as photos,
  (SELECT json_object_agg(
      skus.id,
      json_build_object('quantity', skus.quantity, 'size', skus.size)
    )
    AS skus FROM skus WHERE skus.style_id = styles.id
  )
  FROM styles
  LEFT JOIN photos ON styles.id = photos.style_id
  WHERE product_id=$1
  GROUP BY styles.id;`;

  return client
    .query(query, [id])
    .then(({ rows }) => {
      product.results = rows;
      for (let i = 0; i < product.results.length; i += 1) {
        if (product.results[i].skus === null) {
          product.results[i].skus = {};
          product.results[i].skus.null = { quantity: null, size: null };
        }
      }
      return product;
    });
});

module.exports = {
  getProducts,
  getProductById,
  getRelatedProduct,
  getProductStyle,
};
