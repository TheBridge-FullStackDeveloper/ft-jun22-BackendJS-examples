const express = require('express');
// Rutas de productos
const productsController = require("../controllers/productsController");
const productsRouter = express.Router();

// /products
productsRouter.get('/products/:id?',productsController.getProducts);
productsRouter.post('/products',productsController.createProduct);
productsRouter.delete("/products", productsController.deleteProduct)

module.exports = productsRouter;
