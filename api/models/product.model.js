import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    sku_id: {
      type: String,
      unique: true,
    },
    name: {
      type: String,
    },
    colour: {
      type: String,
    },
    shape: {
      type: String,
      enum: ["Square", "Rectangle", "Circle", "Triangle", "Other"],
    },
    category: {
      type: String,
      enum: [
        "Terracotta Ornaments & Home Décor",
        "Macrame Based Handicraft",
        "Moonj Based Handicrafts",
        "Outdoor",
        "Banana Fiber based ornaments & Home Décor",
        "Jute Bags & Allied Products",
        "Other",
      ],
    },
    description: {
      type: String,
    },
    quantity: {
      type: Number,
      min: 0, // Ensuring that quantity cannot be negative
    },
    approved: {
      type: Boolean,
      default: false,
    },
    image_url: {
      type: String,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
