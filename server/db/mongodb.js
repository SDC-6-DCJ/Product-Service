const mongoose = require("mongoose");

mongoose.connect('mongodb://localhost/productservices');

const productSchema = new mongoose.Schema({
  id: {type:Number, unique: true},
  name: String,
  slogan: String,
  description: String,
  category: String,
  default_price: String,
  created_at: Date,
  updated_at: Date,
  related: [Number],
  styles: [Number],
  features: [{feature1: String, value1: String}, {feature2: String, value2: String}]
});

const Products = mongoose.model('Products', productSchema);
const product = new Products();
product.save(function (err) {
  if (err) return handleError(err);
});

const styleSchema = new mongoose.Schema({
  id: {type:Number, unique: true},
  skus:[{quantity: Number, size: String}],
  name: String,
  original_price: String,
  sale_price: String,
  default: Boolean,
  photos: [{thumbnail1: String, main1: String}, {thumbnail2: String, main2: String}]
});

const Styles = mongoose.model('Styles', styleSchema);
const style = new Styles();
style.save(function (err) {
  if (err) return handleError(err);
});


