import knex from 'knex'
import config from '../src/config.js'

try {
    const mariaDbClient = knex(config.mariaDb)

    const producto = {
        title: "samsung galaxy z flip 3",
        price: "180000",
        thumbnail: "https://i5.walmartimages.com/asr/ce82bee3-bff8-4717-b31c-df5e49df1dec.dbb1d56952600282bd72a6c7f5eb1414.jpeg",
        id: 1
    }

    await mariaDbClient.insert(producto).into('productos')

    await mariaDbClient.destroy()

    console.log('productos agregados con éxito en mariaDb')
} catch (error) {
    console.log('error al agregar productos en mariaDb')
    console.log(error)
}