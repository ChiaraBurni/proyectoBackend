const express = require("express");
const router = express.Router();
const ProductManager = require("../dao/controllers/ProductManager.js");
const newProductManager = new ProductManager();

router.get("/", async (req, res) => {
  try {
    const products = await newProductManager.getProducts();
    let limit = parseInt(req.query.limit);
    if (limit) {
      const limitedProducts = products.slice(0, limit);
      res.send(limitedProducts);
      return;
    }
    res.send(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/:pid", async (req, res) => {
  let pid = req.params.pid;
  try {
    const product = await newProductManager.getProductById(pid);
    res.send(product);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

router.post("/", async (req, res) => {
  const newProduct = req.body;
  try {
    await newProductManager.addProduct(newProduct);
    res.status(201).json({ status: "success", message: "Correctly aggregated product" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put("/:pid", async (req, res) => {
  let pid = req.params.pid;
  const updatedProduct = req.body;
  try {
    await newProductManager.updateProduct(pid, updatedProduct);
    res.json({ status: "success", message: "Correctly updated product" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete("/:pid", async (req, res) => {
  let pid = req.params.pid;
  try {
    await newProductManager.deleteProduct(pid);
    res.json({ status: "success", message: `Product with id: ${pid} correctly deleted` });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = { router, newProductManager };

