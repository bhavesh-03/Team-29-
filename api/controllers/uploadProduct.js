import Product from "../models/product.model.js";

const bufferToBase64 = (buffer) => {
  return buffer.toString("base64");
};

export const uploadProduct = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "Image file is required" });
  }

  const base64Image = bufferToBase64(req.file.buffer);
  const image = `data:${req.file.mimetype};base64,${base64Image}`;

  try {
    const newProduct = new Product({
      image,
      // category: req.body.category,
    });

    await newProduct.save();
    res.status(200).json({
      message: "Image uploaded successfully",
      product: newProduct,
    });
  } catch (error) {
    res.status(500).json({ message: "Error saving image", error });
  }
};

export const updateProduct = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "Image file is required" });
  }

  const base64Image = bufferToBase64(req.file.buffer);
  const image = `data:${req.file.mimetype};base64,${base64Image}`;

  try {
    const product = await Product.findById(req.params.id);
    console.log(product);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    product.image = image;
    // Update other fields if necessary
    // product.category = req.body.category;

    await product.save();

    res.status(200).json({
      message: "Image updated successfully",
      product,
    });
  } catch (error) {
    res.status(500).json({ message: "Error updating image", error });
  }
};
