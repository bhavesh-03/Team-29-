
import express from 'express';
import Product from '../models/product.model.js'; 
import { uploadProduct } from '../controllers/uploadProduct.js';
const router = express.Router();
import cloudinary from '../utils/cloudinary.js';
import upload from '../utils/multer.js';


const generateSKU = (category, shape, colour, size) => {
  const categoryCode = category.split(' ').map(word => word[0]).join('').toUpperCase();
  const shapeCode = shape.substring(0, 3).toUpperCase();
  const colourCode = colour.substring(0, 3).toUpperCase();
  const sizeCode = size.replace(/\s+/g, '').toUpperCase();

  return `${categoryCode}-${shapeCode}-${colourCode}-${sizeCode}`;
};

router.get('/get-subadmin-product', async (req, res) => {
  try {
    const products = await Product.find({ sku_id: { $in: [null, ''] } });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});




//  subadmin product detail update
router.put('/:productId/update-details', async (req, res) => {
  try {
    const { productId } = req.params;
    const { name, type, colour, size, shape, category } = req.body;

    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      { name, type, colour, size, shape, category },
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// delete the product by subadmin
router.delete('/:productId/delete', async (req, res) => {
  try {
    const { productId } = req.params;

    const deletedProduct = await Product.findByIdAndDelete(productId);

    if (!deletedProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// accept subadmin product and then update sku_id 
router.put('/:productId/accept', async (req, res) => {
  try {
    const { productId } = req.params;

    // Find the product by ID
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Ensure all necessary fields are filled
    if (!product.name || !product.type || !product.colour || !product.size || !product.shape || !product.category ) {
      return res.status(400).json({ error: 'All product details must be filled before acceptance' });
    }

    // Generate SKU ID
    const sku_id = generateSKU(product.category, product.shape, product.colour, product.size);

    // Check if a product with the same SKU ID already exists
    const existingProduct = await Product.findOne({ sku_id });

    if (existingProduct) {
      // Update the quantity of the existing product
      existingProduct.quantity += 1;
      await existingProduct.save();

      // Remove the original product since it has been merged into the existing one
      await Product.findByIdAndDelete(productId);

      return res.status(200).json({ message: 'Product accepted and quantity updated', existingProduct });
    } else {
      // Update the product with the generated SKU ID
      product.sku_id = sku_id;
      await product.save();

      return res.status(200).json({ message: 'Product accepted and SKU ID generated', product });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/get-admin-products', async (req, res) => {
  try {
    const products = await Product.find({
      sku_id: { $nin: [null, ''] },
      name: { $nin: [null, ''] },
      type: { $nin: [null, ''] },
      colour: { $nin: [null, ''] },
      size: { $nin: [null, ''] },
      shape: { $nin: [null, ''] },
      category: { $nin: [null, ''] },
      quantity: { $nin: [null, ''] },
      description: { $nin: [null, ''] },
      imageUrl: { $nin: [null, ''] },
    });

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



router.delete('/:sku_id/delpro-superadmin', async (req, res) => {
  try {
    const { sku_id } = req.params;

    // Find and delete the product by sku_id
    const product = await Product.findOneAndDelete({ sku_id });

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Update product quantity by superadmin
router.put('/:sku_id/quantity', async (req, res) => {
  try {
    const { sku_id } = req.params;
    const { quantityChange } = req.body;

    if (typeof quantityChange !== 'number') {
      return res.status(400).json({ message: 'Quantity change must be a number' });
    } 
    // Find the product by sku_id
    const product = await Product.findOne({ sku_id });

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Update the product quantity
    product.quantity += quantityChange;

    if (product.quantity < 0) {
      return res.status(400).json({ message: 'Quantity cannot be negative' });
    }

    await product.save();

    res.status(200).json({ message: 'Product quantity updated successfully', product });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});


// This is remaining: can be done with cloudinary : 
router.post("/upload", upload.single("image"), async (req, res) => {
  

});



// approved by superadmin
router.get('/approved-superadmin', async (req, res) => {
  try {
    // Find all products that are approved
    const products = await Product.find({ approved: true });

    // Iterate through products to check and update approval status
    const updatedProducts = [];
    for (let product of products) {
      if (product.quantity === 0) {
        // Update product to disapprove if quantity is zero
        const updatedProduct = await Product.findByIdAndUpdate(
          product._id,
          { approved: false },
          { new: true }
        );
      } else {
        updatedProducts.push(product);
      }
    }

    res.status(200).json(updatedProducts);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});


export default router;