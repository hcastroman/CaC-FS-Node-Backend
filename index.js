
const express = require("express");
const app = express();

const path = require("path");

//Middleware para archivos estáticos y públicos
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

const productosRoutes = require("./src/routes/productos.router");
const authRoutes = require("./src/routes/auth.router");

app.use('/productos',productosRoutes);
app.use('/auth',authRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`App funcionando en http://localhost:${PORT}`)
});