const db = require("../db/db")

//GET ALL
const getProductos = (req, res) => {
  const sql = "SELECT p.id, p.nombre, p.precio, p.espesor, p.medidas, p.cubre, p.cant_unidades, p.imagen, p.stock, p.categoria_id, c.nombre AS categoria_nombre FROM productos p JOIN categorias c ON p.categoria_id = c.id";
  db.query(sql, (error, result) => {
    if (error) {
      console.log(error); 
      return res.status(500).json({ error: "Intente mas tarde" });
    }
    res.json(result);
  });
};
    
//GET BY ID
const getProductoByID = (req, res) => {
  const sql = "SELECT p.id, p.nombre, p.precio, p.espesor, p.medidas, p.cubre, p.cant_unidades, p.imagen, p.stock, p.categoria_id, c.nombre AS categoria_nombre FROM productos p JOIN categorias c ON p.categoria_id = c.id WHERE p.id = ?";
  const {id} = req.params;
  db.query(sql, [id], (error, result) => {
    if (error) {
      console.log(error); 
      return res.status(500).json({ error: "Intente mas tarde" });
    }
    if (result.length === 0) {
      return res.status(404).json({ message: "Producto Inexistente" });
    }
    res.json(result[0]);
  });
};
  
//POST
const addProducto = (req, res) => { 
  const sql = "INSERT INTO productos (nombre, precio, espesor, medidas, cubre, cant_unidades, imagen, stock, categoria_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)"; 
  const {nombre, precio, espesor, medidas, cubre, cant_unidades, imagen, stock, categoria_id} = req.body; 
  const values = [nombre, precio, espesor, medidas, cubre, cant_unidades, imagen, stock, categoria_id]; 
  db.query (sql, values, (error, result) => { 
  if (error) {
    console.log(error); 
    return res.status(500).json({ error: "Intente mas tarde" }); 
  }
  res.json({id: result.insertId, ...req.body }); 
  });
};

//PUT
const updateStockProducto = (req, res) =>{ 
  const sql = "UPDATE productos SET stock = ? WHERE id = ?"; 
  const {id} = req.params;  
  const {stock} = req.body; 
  const values = [stock, id]; 
  db.query (sql, values, (error, result) => { 
    if (error) {
      console.log(error); 
      return res.status(500).json({ error: "Intente mas tarde" }); 
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Producto Inexistente" });
    }
    res.json({id:id, ...req.body }); 
  });
};

//DELETE
const deleteProducto = (req, res) => {
  const sql = "DELETE FROM productos WHERE id = ?";
  const {id} = req.params;
  db.query(sql, [id], (error, result) => {
    if (error) {
      console.log(error); 
      return res.status(500).json({ error: "Intente mas tarde" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Producto Inexistente" });
    }
    res.json({ mensaje: "Producto Eliminado"});
  });
};
  
module.exports = {
  getProductos,
  getProductoByID,
  addProducto,
  updateStockProducto,
  deleteProducto
};