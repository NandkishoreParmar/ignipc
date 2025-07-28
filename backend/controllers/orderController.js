const Order = require('../models/Order');
const Product = require('../models/Product');

// Create Order
exports.createOrder = async (req, res) => {
  const { items, customerId } = req.body;

  try {
    // Remove transaction blocks
    for (const item of items) {
      const product = await Product.findById(item.productId);
      if (!product || product.stock < item.quantity) {
        throw new Error(`Insufficient stock for ${item.productId}`);
      }
      product.stock -= item.quantity;
      await product.save(); // Save individually
    }

    const order = await Order.create({
      customerId,
      items,
      status: 'PENDING'
    });

    res.status(201).json(order);

  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get all orders
exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('customerId', 'email');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Update order status
exports.updateStatus = async (req, res) => {
  const { orderId } = req.params;
  const { status } = req.body;
  const session = await Order.startSession();

  try {
    session.startTransaction();
    const order = await Order.findById(orderId).session(session);

    if (!order) {
      await session.abortTransaction();
      return res.status(404).json({ message: 'Order not found' });
    }

    // Handle inventory changes
    if (status === 'CANCELLED' && order.status !== 'CANCELLED') {
      for (const item of order.items) {
        await Product.findByIdAndUpdate(
          item.productId,
          { $inc: { stock: item.quantity } },
          { session }
        );
      }
    }

    order.status = status;
    await order.save({ session });
    await session.commitTransaction();
    res.json(order);

  } catch (err) {
    await session.abortTransaction();
    res.status(500).json({ message: 'Server error' });
  } finally {
    session.endSession();
  }
};

// Add to existing code

// Get Single Order with Product Details
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('customerId', 'email')
      .populate('items.productId', 'name price sku');

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Calculate order total
    const total = order.items.reduce((sum, item) => {
      return sum + (item.quantity * item.productId.price);
    }, 0);

    res.json({ ...order.toObject(), total });

  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get Customer's Order History
exports.getCustomerOrders = async (req, res) => {
  try {
    // Authorization check
    if (req.user.userId !== req.params.customerId && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    const orders = await Order.find({ customerId: req.params.customerId })
      .populate('items.productId', 'name price')
      .sort({ createdAt: -1 });

    res.json(orders);

  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};