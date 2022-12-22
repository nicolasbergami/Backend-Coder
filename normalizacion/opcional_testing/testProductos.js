import ContenedorSQL from '../src/contenedores/ContenedorSQL.js'
import config from '../src/config.js'

const dbName = 'mariaDb'
const tableName = 'productos'

const contenedor = new ContenedorSQL(config[dbName], tableName)

try {
    const res = await contenedor.guardar({
        title: 'Iphone 14 pro max',
        price: 500000,
        thumbnail: 'https://buytek.net/wp-content/uploads/2022/11/Iphone-14-pro-max.1.jpg'
    })

    console.log(res)

    const res2 = await contenedor.guardar({
        title: "samsung galaxy z flip 3",
        price: "180000",
        thumbnail: "https://i5.walmartimages.com/asr/ce82bee3-bff8-4717-b31c-df5e49df1dec.dbb1d56952600282bd72a6c7f5eb1414.jpeg",
    })

    console.log(res2)

    console.log(await contenedor.listarAll())

    await contenedor.actualizar({
        price: 56.99,
    }, 2)

    await contenedor.borrar(1)

    console.log(await contenedor.listarAll())

    console.log('----- fin test -----')

} catch (error) {
    console.log(error)
} finally {
    await contenedor.desconectar()
}