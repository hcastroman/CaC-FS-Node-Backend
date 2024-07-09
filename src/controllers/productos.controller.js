const db = require("../db/db")

//GET ALL
const getProductos = (req, res) => {
  const sql = "SELECT p.id, p.nombre, p.precio, p.espesor, p.medidas, p.cubre, p.cant_unidades, p.imagen, p.stock, c.nombre AS categoria_nombre FROM productos p JOIN categorias c ON p.categoria_id = c.id";
  db.query(sql, (error, rows) => {
    if (error) {
      console.log(error); //Muestra el error en la terminal
      return res.status(500).json({ error: "Intente mas tarde" });
    }
    res.json(rows);
  });
};
    
//GET BY ID
const getProductoByID = (req, res) => {
  const { id } = req.params;
  const sql = "SELECT p.id, p.nombre, p.precio, p.espesor, p.medidas, p.cubre, p.cant_unidades, p.imagen, p.stock, c.nombre AS categoria_nombre FROM productos p JOIN categorias c ON p.categoria_id = c.id WHERE p.id = ?";
  db.query(sql, [id], (error, rows) => {
    if (error) {
      console.log(error); //Muestra el error en la terminal
      return res.status(500).json({ error: "Intente mas tarde" });
    }
    if (rows.length === 0) {
      return res.status(404).json({ message: "Producto Inexistente" });
    }
    res.json(rows[0]);
  });
};
  
//POST
const addProducto = (req, res) => { 
  const sql = "INSERT INTO productos (nombre, precio, espesor, medidas, cubre, cant_unidades, imagen, stock, categoria_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)"; 
  const {nombre, precio, espesor, medidas, cubre, cant_unidades, imagen, stock, categoria_id} = req.body; 
  const values = [nombre, precio, espesor, medidas, cubre, cant_unidades, imagen, stock, categoria_id]; 
  db.query (sql, values, (error, result) => { 
  if (error) {
    console.log(error); //Muestra el error en la terminal
    return res.status(500).json({ error: "Intente mas tarde" }); 
  }
  res.json({id: result.insertId, ...req.body }); 
  });
};

//PUT
const updateStockProducto = (req, res) =>{ 
  const { id } = req.params;  
  const sql = "UPDATE productos SET stock = ? WHERE id = ?"; 
  const {stock} = req.body; 
  const values = [stock, id]; 
  db.query (sql, values, (error, result) => { 
    if (error) {
      console.log(error) //Muestra el error en la terminal
      return res.status(500).json({ error: "Intente mas tarde" }); 
      }
    res.json({id:id, ...req.body }); 
  });
};

//DELETE
const deleteProducto = (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM productos WHERE id = ?";
  db.query(sql, [id], (error, result) => {
    if (error) {
      console.log(error); //Muestra el error en la terminal
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
  deleteProducto,
};