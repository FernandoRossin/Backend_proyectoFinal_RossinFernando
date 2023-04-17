const {ProductManager} = require('../../DAO/ProductManager')

const productManager = new ProductManager('./src/DAO/Productos.json')

const socketProducts = async (io) => {
    const products = await productManager.getProducts()
    
    io.on('connection', socket => {
        console.log('socketProducts.js')
        socket.emit('productos', products)
    }) 

} 

module.exports = {socketProducts}