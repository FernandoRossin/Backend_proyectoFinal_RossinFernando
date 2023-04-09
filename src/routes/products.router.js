const {Router} = require('express')
const {ProductManager} = require('../DAO/ProductManager')


const router = Router()
const productManager = new ProductManager('./src/DAO/Productos.json')

router.get('/',async (request,response)=>{
    try {
        const products = await productManager.getProducts()
        const limit = request.query.limit

        limit ? response.send(products.slice(0, limit)) : response.send( products )  
    } catch (error) {
        console.log(error)
    }
         
 })
 
router.get('/:id', async (request, response) => {
     try {
         const params = Number(request.params.id)
         const product = await productManager.getProductById(params)
         response.send(product)
 
     } catch (error) {
         console.log(error)
     }
 })

router.post('/', async (req,res)=>{
    try {
        
        const {title,description,price,thumbnail,code,stock} = req.body
     
        await productManager.addProduct(title,description,price,thumbnail,code,stock)
                
        res.status(200).send({title,description,price,thumbnail,code,stock})
          
    } catch (error) {
        console.log(error)
    }

})



router.put('/:pid', async (req,res)=>{
    try {
        const {pid} = req.params
        const productUpdate = req.body

        const result = await productManager.updateProduct(Number(pid),productUpdate)
        
       res.send({result})

    }
    catch (error) {
        console.log(error)
    }
})

router.delete('/:pid', async (req,res)=>{
    try {
        const {pid} = req.params
        const response = await productManager.deleteProduct(Number(pid))
        
        res.status(200).send({response})
    }
    catch (error) {
        console.log(error)
    }
})


module.exports = router