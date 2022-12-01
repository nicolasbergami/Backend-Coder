const express = require('express');
const moment = require('moment');
const aplicacion = express();
const { Server: HttpServer } = require('http');
const { Server: IOServer } = require('socket.io');
const Contenedor = require('./contenedor/contenedorSql');
const options = require('./connection/options.js');

const port = 8080;
const publicRoot = './public';


aplicacion.use(express.json());
aplicacion.use(express.urlencoded({ extended: true }));

const httpServer = new HttpServer(aplicacion);
const io = new IOServer(httpServer);


aplicacion.use(express.static(publicRoot));


const productos = new Contenedor(options.mysql, 'productos');
const mensajes = new Contenedor(options.sqlite3, 'mensajes');



aplicacion.get('/', (peticion, respuesta) => {
  respuesta.send('index.html', { root: publicRoot });
});





const servidor = httpServer.listen(port, () => {
  console.log(`Servidor escuchando: ${servidor.address().port}`);
});

servidor.on('error', error => console.log(`Error: ${error}`));




io.on('connection', async (socket) => {
  console.log('Nuevo cliente conectado!');

  const listaProductos = await productos.getAll();
  socket.emit('nueva-conexion', listaProductos);

  socket.on("new-product", (data) => {
    productos.save(data);
    io.sockets.emit('producto', data);
  });

  
  const listaMensajes = await mensajes.getAll();
  socket.emit('messages', listaMensajes);

  //Evento para recibir nuevos mensajes
  socket.on('new-message', async data => {
    data.time = moment(new Date()).format('DD/MM/YYYY hh:mm:ss');
    await mensajes.save(data);
    const listaMensajes = await mensajes.getAll();
    io.sockets.emit('messages', listaMensajes);
  });
});