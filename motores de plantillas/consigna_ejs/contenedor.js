const express = require('express');
const { Router } = express;
const aplicacion = express();
const rutaProductos = Router();
const port = 8080;

aplicacion.use(express.json());
aplicacion.use(express.urlencoded({ extended: true }));

aplicacion.set('views', __dirname + '/views');
aplicacion.set('view engine', 'pug');

aplicacion.use('/static', express.static(__dirname + '/public'));

class Contenedor {
    constructor(archivo) {
        this.archivo = archivo;
    }

    exists(archivo) {
        
        try {
            if (!fs.existsSync(archivo)) {
                throw new Error("Archivo no existente");
            } else {
                return true;
            }
        } catch (error) {
            console.log(`Error en la busqueda: ${error.message}`);
        }
    }

    async readFile(archivo) {
        try {
            
            const data = await fs.readFileSync(archivo);
            return JSON.parse(data);
        } catch (error) {
            console.log(`Error al leer el archivo: ${error.message}`);
        }
    }

    async writeFile(archivo, contenido) {
        try {
        
            await fs.writeFileSync(archivo, JSON.stringify(contenido, null, 4));
        } catch (error) {
            console.log(`Error al escribir el archivo: ${error.message}`);
        }
    }

    async save(producto) {
        try {
          
            if (!this.exists(this.archivo)) {
                console.log(`Se crean datos nuevos`);
                let arrayProductos = [];
                producto = { id: 1, ...producto };
                arrayProductos.push(producto);
                console.log(`Agregando producto...`);
                await fs.writeFile(this.archivo, arrayProductos);
                console.log(
                    `Se agrego el producto nuevo con el id: ${producto.id}`
                );
                return producto.id;
            } else {
               
                if (this.readFile(this.archivo)) {
                    console.log(`Leyendo archivo...`);
                    const data = await this.readFile(this.archivo);
                    if (data.length === 0) {
                   
                        producto = { id: 1, ...producto };
                    } else {
                        
                        let ultimoId = data[data.length - 1].id;
                        producto = { id: ultimoId + 1, ...producto };
                    }
                    console.log(`Agregando producto al archivo...`);
                    data.push(producto);
                    
                    this.writeFile(this.archivo, data);
                    console.log(
                        `Se agrego el nuevo producto con el id: ${producto.id}`
                    );
                    return producto.id;
                }
            }
        } catch (error) {
            console.log(`Error agregando el producto: ${error.message}`);
        }
    }

    async getById(id) {
        try {
            
            if (this.exists(this.archivo)) {
                const data = await this.readFile(this.archivo);
                /* uso filter para buscar el producto con el id que queramos */
                const dataId = data.filter(item => item.id === id);
                if (dataId.length === 0) {
                    throw new Error(
                        "No se encontro un producto con el id solicitado"
                    );
                } else {
                    console.log(`Producto con id ${id} encontrado:\n`, dataId);
                    return dataId;
                }
            }
        } catch (error) {
            console.log(`Error buscando producto con el id: ${error.message}`);
        }
    }

    async getAll() {

        try {
            if (this.exists(this.archivo)) {
                console.log(`Leyendo archivo...`);
                const data = await this.readFile(this.archivo);
             
                if (data.length !== 0) {
                    console.log(`Archivo con contenido:`);
                    console.log(data);
                    return data;
                } else {
                    throw new Error(`El archivo ${this.archivo} esta vacio`);
                }
            }
        } catch (error) {
            console.log(
                `Error obteniendo todos los productos: ${error.message}`
            );
        }
    }

    async deleteById(id) {
        try {
            if (this.exists(this.archivo)) {
                const data = await this.readFile(this.archivo);
                
                console.log(`Buscando producto con el id solicitado...`);
                if (data.some(item => item.id === id)) {
                    const data = await this.readFile(this.archivo);
                   
                    console.log(`Eliminando producto con id solicitado...`);
                    const datos = data.filter(item => item.id !== id);
                    this.writeFile(this.archivo, datos);
                    console.log(`Producto con el id ${id} eliminado`);
                } else {
                    throw new Error(
                        `No se encontro el producto con el id ${id}`
                    );
                }
            }
        } catch (error) {
            console.log(
                `Ocurrio un error eliminando el producto con el id solicitado: ${error.message}`
            );
        }
    }

    async deleteAll() {
        try {
            
            let nuevoArray = [];
            console.log(`Borrando datos...`);
            await this.writeFile(this.archivo, nuevoArray);
            console.log(
                `Se borraron todos los datos del archivo ${this.archivo}`
            );
        } catch (error) {
            console.log(
                `Ocurrio un error eliminando los datos: ${error.message}`
            );
        }
    }

}

const productos = new Contenedor([]);

aplicacion.get('/productos', (peticion, respuesta) => {
    const listaProductos = productos.getAll();
    respuesta.render('lista', {
      productos: listaProductos
    });
  });
  
  aplicacion.post('/productos', (peticion, respuesta) => {
    const producto = peticion.body;
    productos.save(producto);
    respuesta.render('formulario', {});
  });
  
  aplicacion.get('/', (peticion, respuesta) => {
    respuesta.render('formulario', {});
  });
  
  
  
  
  const servidor = aplicacion.listen(port, () => {
    console.log(`Servidor escuchando: ${servidor.address().port}`);
  });
  
  servidor.on('error', error => console.log(`Error: ${error}`));