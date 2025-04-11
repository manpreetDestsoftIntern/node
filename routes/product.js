const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

// Create Product
router.post("/", async (req, res) => {
  try {
    const { name, description, price } = req.body;
    if(price < 0){
      res.status(404).json({ message: "please add valid price" });
      return; 
    }
    const existingProduct = await Product.findOne({ name })
    if(existingProduct) {
      res.status(409).json({ message: "Product with same name allready exist", product: existingProduct });
      return; // imp -- Error: if not return then two responses will send
    }
    const newProduct = new Product({ name, description, price });
    await newProduct.save();

    res.status(201).json({ message: "Product created", product: newProduct });
  } catch (err) {
    console.error("Product creation error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Get All Products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    console.error("Fetch products error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Get Single Product
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    res.json(product);
  } catch (err) {
    console.error("Fetch product error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Update Product
router.put("/:id", async (req, res) => {
  try {
    const { name, description, price } = req.body;
    if(price < 0){
      res.status(404).json({ message: "please add valid price" });
      return; 
    }
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { name, description, price },
      { new: true }
    );

    if (!updatedProduct) return res.status(404).json({ message: "Product not found" });

    res.json({ message: "Product updated", product: updatedProduct });
  } catch (err) {
    console.error("Update product error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Delete Product
router.delete("/:id", async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) return res.status(404).json({ message: "Product not found" });

    res.json({ message: "Product deleted" });
  } catch (err) {
    console.error("Delete product error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
