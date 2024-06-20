
import express from 'express';
import Product from '../models/product.model.js'; 
const router = express.Router();
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import multer from 'multer';

// const generateSKU = (category, shape, colour, size) => {
//   const categoryCode = category.split(' ').map(word => word[0]).join('').toUpperCase();
//   const shapeCode = shape.substring(0, 3).toUpperCase();
//   const colourCode = colour.substring(0, 3).toUpperCase();
//   const sizeCode = size.replace(/\s+/g, '').toUpperCase();

//   return `${categoryCode}-${shapeCode}-${colourCode}-${sizeCode}`;
// };

router.get('/get-subadmin-product', async (req, res) => {
  try {
    const products = await Product.find({ sku_id: { $in: [null, ''] } });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});




// //  subadmin product detail update
// router.put('/:productId/update', async (req, res) => {
//   try {
//     const { productId } = req.params;
//     const { name, shape, color, description } = req.body;

//     // Validate ObjectId
//     if (!ObjectId.isValid(productId)) {
//       return res.status(400).json({ error: 'Invalid product ID' });
//     }

//     // Find the product by ID and update its details
//     const updatedProduct = await Product.findByIdAndUpdate(
//       productId,
//       { name, shape, color, description },
//       { new: true } // To return the updated document
//     );

//     if (!updatedProduct) {
//       return res.status(404).json({ error: 'Product not found' });
//     }

//     res.status(200).json({ message: 'Product updated successfully', product: updatedProduct });
//   } catch (error) {
//     console.error('Error updating product:', error.message);
//     res.status(500).json({ error: 'Server error' });
//   }
// });



// Function to generate SKU ID
const generateSKU = (category, shape, colour) => {
  const categoryCode = category.split(' ').map(word => word[0]).join('').toUpperCase();
  const shapeCode = shape.substring(0, 3).toUpperCase();
  const colourCode = colour.substring(0, 3).toUpperCase();
  return `${categoryCode}-${shapeCode}-${colourCode}`;
};

// Route to accept a product and update details
router.put('/:productId/accept', async (req, res) => {
  try {
    const { productId } = req.params;
    const { name, shape, colour, description } = req.body;

    // Validate inputs (you may want more robust validation here)
    if (!name || !shape || !colour || !description) {
      console.log("Fill all fields");
      return res.status(400).json({ error: 'Please provide all required fields' });
    }

    // Find the existing product
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Generate SKU ID
    const sku_id = generateSKU(product.category, shape, colour);

    // Update product details
    product.name = name;
    product.shape = shape;
    product.colour = colour;
    product.description = description;
    product.sku_id = sku_id;
    product.approved = true;

    const updatedProduct = await product.save();
    res.status(200).json({ message: 'Product details updated and accepted successfully', product: updatedProduct });
  } catch (error) {
    console.error('Error accepting product:', error.message);
    res.status(500).json({ error: 'Server error' });
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


const storage = multer.memoryStorage();
const upload = multer({ storage });


router.post('/upload-image', upload.none(), async (req, res) => {
  try {
    const { category, image_url, seller_id } = req.body;
    console.log(seller_id);
    console.log(image_url);
    console.log(category);
    if (!category || !image_url || !seller_id) {
      return res.status(400).json({ error: 'Category, image_url, and seller_id are required' });
    }

    // Create new product instance
    const product = new Product({ category, image_url, seller_id });
    console.log("Product in backend",product);
    // Save product to MongoDB
    await product.save();

    // console.log('Product uploaded:', product);
    res.status(201).json({ message: 'Product uploaded successfully' });
  } catch (error) {
    console.error('Error uploading product:', error);
    res.status(500).json({ error: 'Failed to upload product' });
  }
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

router.post('/send-email', async (req, res) => {
  const { buyerName, buyerEmail, queryDetails } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    host:'smtp.gmail.com',
    port:'587',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
  from: `${buyerEmail}`,
  to: 'jpmmss.supera@gmail.com',
  subject: `New ORDER FROM ${buyerName}`,
  html: `
    <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
          }
          .container {
            margin: 0 auto;
            padding: 20px;
            max-width: 600px;
            background-color: #f9f9f9;
            border: 1px solid #ddd;
            border-radius: 10px;
          }
          .header {
            font-size: 24px;
            margin-bottom: 20px;
            color: #333;
          }
          .details {
            margin-bottom: 20px;
          }
          .details p {
            margin: 5px 0;
          }
          .query-item {
            margin-bottom: 15px;
            padding: 10px;
            border: 1px solid #ddd;
            border-radius: 5px;
            background-color: #fff;
          }
          .query-item p {
            margin: 5px 0;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">New Query from ${buyerName}</div>
          <div class="details">
            <p><strong>Buyer Name:</strong> ${buyerName}</p>
            <p><strong>Buyer Email:</strong> ${buyerEmail}</p>
          </div>
          <div class="query-details">
            ${queryDetails.map(item => `
              <div class="query-item">
                <p><strong>Item Name:</strong> ${item.itemname}</p>
                <p><strong>Quantity:</strong> ${item.quantity}</p>
                <p><strong>SKU ID:</strong> ${item.sku_id}</p>
              </div>
            `).join('')}
          </div>
        </div>
      </body>
    </html>
  `,
};


  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send('Mail sent successfully');
  } catch (error) {
    res.status(500).send('Error sending mail');
  }
});

export default router;