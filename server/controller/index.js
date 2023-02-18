const model = require('../model/models')

module.exports = {
  getProducts: (req, res) => {
    model.getProducts(req.query?.page, req.query?.count)
      .then((results) => res.status(200).send(results))
      .catch((err) => {
        console.error('Controller error - getProducts: ', err);
        res.sendStatus(500);
      });
  },

  getProductById: (req, res) => {
    model.getProductById(req.params.product_id)
      .then((results) => res.status(200).send(results))
      .catch((err) => {
        console.error('Controller error - getProductById: ', err);
        res.sendStatus(500);
      });
  },

  getRelatedProduct: (req, res) => {
    model.getRelatedProduct(req.params.product_id)
      .then((results) => res.status(200).send(results))
      .catch((err) => {
        console.error('Controller error - getRelatedProduct: ', err);
        res.sendStatus(500);
      });
  },

  getProductStyle: (req, res) => {
    model.getProductStyle(req.params.product_id)
      .then((results) => res.status(200).send(results))
      .catch((err) => {
        console.error('Controller error - getProductStyle: ', err);
        res.sendStatus(500);
      });
  },
};