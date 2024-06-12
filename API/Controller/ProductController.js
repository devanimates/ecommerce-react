const express = require('express');
const router = express.Router();
const ProductService = require('../routes/ProductService');
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require('../routes/verifyToken');

// CREATE
router.post('/', verifyTokenAndAdmin, async (req, res) => {
  console.log('Headers:', req.headers); 
  try {
    const savedProduct = await ProductService.createProduct(req.body);
    res.status(200).json(savedProduct);
  } catch (err) {
    console.error('Error creating product:', err);
    res.status(500).json({ message: 'Error creating product', error: err });
  }
});

// UPDATE
router.put('/:id', verifyTokenAndAdmin, async (req, res) => {
  console.log('Headers:', req.headers); 
  try {
    const updatedProduct = await ProductService.updateProduct(req.params.id, req.body);
    res.status(200).json(updatedProduct);
  } catch (err) {
    console.error('Error updating product:', err);
    res.status(500).json({ message: 'Error updating product', error: err });
  }
});

// DELETE
router.delete('/:id', verifyTokenAndAdmin, async (req, res) => {
  console.log('Headers:', req.headers); 
  try {
    await ProductService.deleteProduct(req.params.id);
    res.status(200).json('Product has been deleted...');
  } catch (err) {
    console.error('Error deleting product:', err);
    res.status(500).json(err);
  }
});

// GET PRODUCT
router.get('/find/:id', async (req, res) => {
  try {
    const product = await ProductService.findProductById(req.params.id);
    res.status(200).json(product);
  } catch (err) {
    console.error('Error finding product:', err);
    res.status(500).json(err);
  }
});

// GET ALL PRODUCTS
router.get('/', async (req, res) => {
  const qNew = req.query.new;
  const qCategory = req.query.category;
  try {
    let products;

    if (qNew) {
      products = await ProductService.getNewProducts();
    } else if (qCategory) {
      products = await ProductService.getProductsByCategory(qCategory);
    } else {
      products = await ProductService.getAllProducts();
    }

    res.status(200).json(products);
  } catch (err) {
    console.error('Error getting products:', err);
    res.status(500).json(err);
  }
});

module.exports = router;
