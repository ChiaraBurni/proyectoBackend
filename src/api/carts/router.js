const express = require("express")
const router = express.Router()
const CartManager = require("./src/services/cartsManager.js")
const newCartManager = new CartManager("./src/data/carts.json")
const { newProductManager } = require("./router.js")

router.post("/", async (req, res) => {
  try {
    await newCartManager.addCart()
    res.send({ status: "success", message: "Carro agregado correctamente" })
  } catch (error) {
    res.status(500).send({ status: "error", message: "Internal Server Error" })
  }
})

router.get("/:cid", async (req, res) => {
  try {
    let cid = req.params.cid
    let cartProducts = await newCartManager.getProductsByCartId(cid)
    res.send(cartProducts)
  } catch (error) {
    res.status(404).json({ error: `${error.message}` })
  }
})

router.post("/:cid/product/:pid", async (req, res) => {
  try {
    let cid = req.params.cid
    let pid = req.params.pid

    const existingProduct = await newProductManager.getProductById(pid);
    if (!existingProduct) {
      return res.status(404).json({ error: `Producto con ID ${pid} no encontrado` });
    }

    await newCartManager.addProduct(cid, pid)
    res.send({ status: "success", message: "Agregado correctamente al carrito" })
  } catch (error) {
    res.status(404).json({ error: `${error.message}` })
  }
})

router.delete("/:cid/product/:pid", async (req, res) => {
  try {
    let cid = req.params.cid
    let pid = req.params.pid
    await newCartManager.deleteProductById(cid, pid)
    res.send({ status: "success", message: `Producto con id: ${pid} eliminado correctamente del carrito con id: ${cid}` })
  } catch (error) {
    res.status(404).json({ error: `${error.message}` })
  }
})

router.delete("/:cid/products", async (req, res) => {
  try {
    let cid = req.params.cid
    await newCartManager.deleteAllProducts(cid)
    res.send({ status: "success", message: `Todos los productos fueron eliminados del carrito con id: ${cid}`})
  } catch (error) {
    res.status(404).json({ error: `${error.message}` })
  }
})

router.delete("/:cid", async (req, res) => {
  try {
    let cid = req.params.cid
    await newCartManager.deleteCart(cid)
    res.send({status: "success", message: `Carrito con id: ${cid} eliminado correctamente`})
  } catch (error) {
    res.status(404).json({ error: `${error.message}` })
  }
})

module.exports = router