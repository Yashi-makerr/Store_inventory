const express = require("express");
const router = express.Router();

const Product = require("../models/Product");


// GET ALL PRODUCTS
router.get("/products", async (req, res) => {

  try {

    const products = await Product.find();
    res.status(200).json(products);

  } catch (error) {

    res.status(500).json({ message: "Server error" });

  }

});


// SEARCH BY NAME
router.get("/products/search", async (req, res) => {
  try {
    const name = req.query.name;

    const products = await Product.find({
      productName: { $regex: name, $options: "i" }
    });

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});


// FILTER BY CATEGORY
router.get("/products/category", async (req, res) => {
  try {
    const cat = req.query.cat;

    const products = await Product.find({ category: cat });

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});



// GET PRODUCT BY ID
router.get("/products/:id", async (req, res) => {

  try {

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product);

  } catch (error) {

    res.status(500).json({ message: "Server error" });

  }

});



// ADD PRODUCT
router.post("/products", async (req, res) => {

  try {

    const product = new Product(req.body);
    const savedProduct = await product.save();

    res.status(201).json(savedProduct);

  } catch (error) {

    res.status(400).json({ message: error.message });

  }

});



// UPDATE PRODUCT
router.put("/products/:id", async (req, res) => {

  try {

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(updatedProduct);

  } catch (error) {

    res.status(400).json({ message: error.message });

  }

});



// DELETE PRODUCT
router.delete("/products/:id", async (req, res) => {

  try {

    const deletedProduct = await Product.findByIdAndDelete(req.params.id);

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted successfully" });

  } catch (error) {

    res.status(500).json({ message: "Server error" });

  }

});



module.exports = router;