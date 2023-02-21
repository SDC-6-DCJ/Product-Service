const router = require('express').Router();
const controllers = require('./controller/index');

router.get('/products', controllers.getProducts);
router.get('/products/:product_id', controllers.getProductById);
router.get('/products/:product_id/related', controllers.getRelatedProduct);
router.get('/products/:product_id/styles', controllers.getProductStyle);

module.exports = router;
