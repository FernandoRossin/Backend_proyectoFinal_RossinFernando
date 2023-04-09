const {promises} = require('fs')
const fs = promises

class CartManager{

    constructor (filePath){
        this.carts = []
        this.path = filePath
        
    }
    addCart = async (productos) => {
        await this.getCarts()
        try{
        const cart =     productos    
        

        if(this.carts.length === 0){
            cart.id = 1
        }else{
            cart.id = this.carts[this.carts.length - 1].id + 1
        }
        if (Object.values(cart).every(value => value)){
            this.carts.push(cart)
            await fs.writeFile(this.path,JSON.stringify(this.carts,'null',2),'utf-8') 
            return 'Producto agregado'
        }else {
            return 'Faltan datos del carrito'
        }
    }
    catch (error){
        return error
    }

    }
    getCarts = async () => {
        try{
            const data = await fs.readFile(this.path,'utf-8') 
            this.carts = JSON.parse(data)
            return this.carts
        }
        catch (error){
            return error
        }
    }
    getCartById = async (id) => {
        await this.getCarts()
        try{
        const cartID = this.carts.find(p => p.id === id)
        if(cartID){
            return cartID
        }else{
            return "Not found"
        }
        } catch (error) {
            return error
        }
    }
    
    updateCart = async (id,updateProd) => {
        await this.getCarts()
        try {
            let producto = this.carts.find(prod => prod.id === Number(id))
            if (!producto) return 'Not found'
            producto.productos = updateProd.productos
            await fs.writeFile(this.path,JSON.stringify(this.carts,'null',2),'utf-8')
            return 'Producto Actualizado'
        } catch (error) {
            return error
        }

    }
    
}

module.exports = {CartManager}
