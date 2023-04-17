const {Router} = require('express')
const {ProductManager} = require('../DAO/ProductManager')
const router = Router()
const producto = new ProductManager('./src/DAO/Productos.json')


router.get('/', async (req,res)=>{
    
    const prodLista = await producto.getProducts()

    let dataProd = {
        mostrarProductos: prodLista
    }
    res.render('home',dataProd)
    console.log('mostrarProductos.js')
})

router.get('/realTimeProducts', async (req,res)=>{

    const prodLista = await producto.getProducts()
    let dataProd = {
        mostrarProductosActual: prodLista
    }
    res.render('realTimeProducts.handlebars',dataProd)
    console.log('mostrarProductosActual')

})



module.exports = router



