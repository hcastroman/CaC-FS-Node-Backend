const productosController = require("../controllers/productos.controller")
const express = require("express");
const router = express.Router();


router.get("/", productosController.getProductos);

router.get("/:id", productosController.getProductoByID);

router.post("/", productosController.addProducto);

router.put("/:id", productosController.updateStockProducto);

router.delete("/:id", productosController.deleteProducto);


module.exports = router;