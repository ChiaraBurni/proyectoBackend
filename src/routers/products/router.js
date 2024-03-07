import express from "express";
import ProductManager from "../../../services/productsManager.js";
import { routes } from '../utils.js';

const router = express.Router();
const rutaProductos = routes.products;
const products = new ProductManager(rutaProductos);

router.get("/", async (req, res) => {
    try {
        const limit = req.query.limit;
        let productList = limit ? (await products.getProducts()).slice(0, limit) : await products.getProducts();
        res.json({ products: productList });
    } catch (error) {
        res.status(500).json({ error: "Error interno del servidor" });
    }
});

router.get("/:pid", async (req, res) => {
    try {
        const productId = parseInt(req.params.pid);
        const product = await products.getProductById(productId);
        res.json({ product });
    } catch (error) {
        res.status(404).json({ error: "Producto no encontrado" });
    }
});

router.post("/", async (req, res) => {
    try {
        const newProduct = req.body;
        await products.addProduct(newProduct);
        res.status(201).json({ message: "Producto creado correctamente" });
    } catch (error) {
        res.status(400).json({ error: "Error al crear el producto" });
    }
});

router.put("/:pid", async (req, res) => {
    try {
        const productId = parseInt(req.params.pid);
        const updatedProduct = req.body;
        await products.updateProduct(productId, updatedProduct);
        res.json({ message: "Producto actualizado correctamente" });
    } catch (error) {
        res.status(400).json({ error: "Error al actualizar el producto" });
    }
});

router.delete("/:pid", async (req, res) => {
    try {
        const productId = parseInt(req.params.pid);
        await products.deleteProduct(productId);
        res.json({ message: "Producto eliminado correctamente" });
    } catch (error) {
        res.status(404).json({ error: "Error al eliminar el producto" });
    }
});

export default router;
