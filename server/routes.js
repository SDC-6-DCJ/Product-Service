const router = require('express').Router();
// const multer = require('multer');
const controllers = require('./controller');

/* PRODUCTS */
router.get('/products', controller.getProducts);
router.get('/products/:product_id', controller.getProductById);
router.get('/products/:product_id/related', controller.getRelatedProduct);
router.get('/products/:product_id/styles', controller.getProductStyle);

module.exports = router;