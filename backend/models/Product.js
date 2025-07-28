const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true, min: 0 },
  sku: { type: String, required: true, unique: true }
});

productSchema.index({ sku: 1, name: 1 });
module.exports = mongoose.model('Product', productSchema);