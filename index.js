const Contenedor = require("./contenedor");

const productos = new Contenedor("./productos.json");

productos.save({ title: "primero", price: 250 });
