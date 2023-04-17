const socket = io()

socket.on('productos', data =>{
    console.log(data)
    let logs = ''
    let div = document.getElementById('mostrarProductos')

    data.forEach(element => {
        logs += `<li>Title: ${element.title}</li>
                <li>Description: ${element.description}</li>
                <li>Price: ${element.price}</li>
                <li>Thumbnails: ${element.thumbnail}</li>
                <li>Code: ${element.code}</li>
                <li>Stock: ${element.stock}</li>
                <li>ID: ${element.id}</li>
                <hr>`
        
    })
    div.innerHTML = logs
})