const model = require('../model/models')

module.exports = {
  getProducts: (req, res) => {
    model.getProducts(req.query?.page, req.query?.count)
      .then((results) => res.status(200).send(results))
      .catch((err) => {
        console.error('Controller error - getProducts: ', err);
        res.status(500).send(err.message);
      });
  },

  getProductById: (req, res) => {
    model.getProductById(req.params.product_id)
      .then((results) => res.status(200).send(results))
      .catch((err) => {
        console.error('Controller error - getProductById: ', err);
        res.status(500).send(err.message);
      });
  },

  getRelatedProduct: (req, res) => {
    model.getRelatedProduct(req.params.product_id)
      .then((results) => res.status(200).send(results))
      .catch((err) => {
        console.error('Controller error - getRelatedProduct: ', err);
        res.status(500).send(err.message);
      });
  },

  getProductStyle: (req, res) => {
    model.getProductStyle(req.params.product_id)
      .then((results) => res.status(200).send(results))
      .catch((err) => {
        console.error('Controller error - getProductStyle: ', err);
        res.status(500).send(err.message);
      });
  },
};