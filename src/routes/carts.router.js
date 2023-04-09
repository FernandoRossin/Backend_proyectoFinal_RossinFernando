const {Router} = require('express')
const {CartManager} = require('../DAO/CartManager')


const router = Router()
const carts = new CartManager('./src/DAO/carts.json')

router.get('/:cid', async (req,res)=>{

    const {cid} = req.params
    try{
        const cartReturn = await carts.getCartById(Number(cid))
        if (!cartReturn) return res.status(200).send({status:'No hay carrito'})
        res.status(200).send({status:'Carrito',cartReturn})
    }
    catch (error) {
        console.log(error)
    }
})

router.post('/', async (req,res)=>{
    try{
        const cart = req.body
        await carts.addCart(cart)
        res.status(200).send(cart)
    }
    catch (error) {
        console.log(error)
    }

})

router.post('/:cid/product/:pid', async (req,res)=>{
    try{
        let producto = req.body
        
        const {cid,pid} =req.params
        
        const carrito = await carts.getCartById(Number(cid))
       
        if(!carrito) return res.status(400).send({carrito})
        let prodEnCart = carrito.productos.findIndex(productos => productos.idProduct === Number(pid))
        

        if(prodEnCart !== -1){
            carrito.productos[prodEnCart].cantidad = Number(carrito.productos[prodEnCart].cantidad) + Number(producto.cantidad)
            await carts.updateCart(cid,carrito)
            return res.status(200).send('Producto actualizado')
        }

    }
    catch (error) {
        console.log(error)
    }
})



module.exports = router