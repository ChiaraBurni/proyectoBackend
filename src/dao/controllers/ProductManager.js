const ProductModel = require("../dao/models/products.model.js");

class ProductManager {

  async addProduct({title, description, price, thumbnail, code, stock, category, status}) {
    try {
      const productExists = await ProductModel.findOne({code: code})
      if (productExists) {
        throw new Error("Product already exists")
      }
      if (!title || !description || !price || !code || !stock || !category) {
        throw new Error("Product missing fields")
      }
      const newProduct = new ProductModel({
        title,
        description,
        price,
        thumbnail: thumbnail || [],
        code,
        stock,
        category,
        status: status === false ? false : true
      })
      
      await newProduct.save()
    } catch (error) {
      throw error
    }
  }

  async getProducts() {
    try {
      const products = await ProductModel.find()
      return products
    } catch (error) {
      throw error      
    }
  }

  async getProductById(id) {
    try {
      const product = await ProductModel.findById(id)
      if (!product) {
        throw new Error(`Product with Id: ${id} not found`)
      }
      return product
    } catch (error) {
      throw error
    }
  }

  async updateProduct(id, updatedProduct) {
    try {
      const updateProduct = await ProductModel.findByIdAndUpdate(id, updatedProduct)
      if (!updateProduct) {
        throw new Error(`Product with Id: ${id} not found`)
      }
    } catch (error) {
      throw error
    }
  }

  async deleteProduct(id) {
    try {
      const productToDelete = await ProductModel.findByIdAndDelete(id)
      if (!productToDelete) {
        throw new Error(`Product with id ${id} not found`);
      }
    } catch (error) {
      throw error
    }
  }
}

module.exports = ProductManager