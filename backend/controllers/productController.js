const Product = require('../models/Product');
const mongoose = require('mongoose');

// Create Product (Admin only)
exports.createProduct = async (req, res) => {
  try {
    const { name, price, stock, sku } = req.body;

    // Validate required fields
    if (!name || !price || stock === undefined || !sku) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Check for duplicate SKU
    const existingProduct = await Product.findOne({ sku });
    if (existingProduct) {
      return res.status(409).json({ message: 'SKU already exists' });
    }

    const product = new Product({
      name,
      price,
      stock,
      sku,
      createdBy: req.user.userId // Track who created it
    });

    await product.save();
    res.status(201).json(product);

  } catch (err) {
    console.error('Product creation error:', err);
    res.status(500).json({ message: 'Failed to create product' });
  }
};

// Get All Products (Public)
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find().select('-__v');
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch products' });
  }
};

// Get Single Product
exports.getProductById = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid product ID' });
    }

    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(product);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Update Product (Admin only)
exports.updateProduct = async (req, res) => {
  try {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'price', 'stock', 'sku'];
    const isValidOperation = updates.every(update => 
      allowedUpdates.includes(update)
    );

    if (!isValidOperation) {
      return res.status(400).json({ message: 'Invalid updates!' });
    }

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(product);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete Product (Admin only)
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};