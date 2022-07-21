const express = require('express');
// Rutas de productos
const productsController = require("../controllers/productsController");
const productsRouter = express.Router();

// /products
productsRouter.get('/:id?',productsController.getProducts);
productsRouter.post('/',productsController.createProduct);
productsRouter.delete("/", productsController.deleteProduct)

module.exports = productsRouter;
