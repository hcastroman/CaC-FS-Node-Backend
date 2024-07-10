const express = require("express");
const router = express.Router();

const productosController = require("../controllers/productos.controller");

router.get("/", productosController.getProductos);
router.get("/:id", productosController.getProductoByID);
router.post("/", productosController.addProducto);
router.put("/:id", productosController.updateStockProducto);
router.delete("/:id", productosController.deleteProducto);

module.exports = router;