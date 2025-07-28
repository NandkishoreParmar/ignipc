const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [{
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true }
  }],
  status: { 
    type: String, 
    enum: ['PENDING', 'PAID', 'FULFILLED', 'CANCELLED'], 
    default: 'PENDING' 
  },
  paymentCollected: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

orderSchema.index({ customerId: 1, status: 1 });
module.exports = mongoose.model('Order', orderSchema);