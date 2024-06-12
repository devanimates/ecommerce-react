const Product = require('../models/Product');

const ProductService = {
  async createProduct(productData) {
    const newProduct = new Product(productData);
    const savedProduct = await newProduct.save();
    return savedProduct;
  },

  async updateProduct(productId, updatedData) {
    const updatedProduct = await Product.findByIdAndUpdate(productId, { $set: updatedData }, { new: true });
    return updatedProduct;
  },

  async deleteProduct(productId) {
    await Product.findByIdAndDelete(productId);
  },

  async findProductById(productId) {
    const product = await Product.findById(productId);
    return product;
  },

  async getNewProducts() {
    const newProducts = await Product.find().sort({ createdAt: -1 }).limit(1);
    return newProducts;
  },

  async getProductsByCategory(category) {
    const products = await Product.find({ categories: { $in: [category] } });
    return products;
  },

  async getAllProducts() {
    const products = await Product.find();
    return products;
  },
};

module.exports = ProductService;
