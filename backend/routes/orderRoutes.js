const express = require('express');
const router = express.Router();
const { authenticate, authorize } = require('../middleware/authMiddleware');
const {
  createOrder,
  getOrders,
  updateStatus,
  getOrderById,
  getCustomerOrders
} = require('../controllers/orderController');

// Customer routes
router.post('/', authenticate, createOrder);

// Admin routes
router.get('/', authenticate, authorize(['admin', 'staff']), getOrders);
router.patch('/:orderId/status', authenticate, authorize(['admin', 'staff']), updateStatus);

// Add to existing routes
router.get('/:id', authenticate, getOrderById);
router.get('/customer/:customerId', authenticate, getCustomerOrders);

module.exports = router;