const express = require('express')
const productsRouter = require('./routes/products.router')
const cartsRouter = require('./routes/carts.router')
const viewsRouter = require('./routes/views.router')
const handlebars = require('express-handlebars')
const { Server } = require('socket.io') 
const {socketProducts} = require ('./public/js/socketProducts')


const app = express()

app.engine('handlebars', handlebars.engine())
app.set('views',__dirname + '/views')
app.set('view engine', 'handlebars')
app.use('/', viewsRouter)
app.use('/realTimeProducts', viewsRouter)


app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/static', express.static(__dirname +'/public'))


app.use('/api/products', productsRouter)

app.use('/api/carts', cartsRouter)


const PORT = 8080

const httpServer = app.listen(PORT,()=>{
    console.log(`Escuchando puerto ${PORT}`)
})



const io = new Server(httpServer)

socketProducts(io)

