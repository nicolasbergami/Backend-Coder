const Contenedor = require("./contenedor");

const productos = new Contenedor("./productos.json");

productos.save({ title: "prueba", price: 150 });