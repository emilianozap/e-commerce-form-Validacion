const produc = document.querySelector(".productos")
const botonesCategoria = document.querySelectorAll(".button-menu")
const numeroCar = document.querySelector(".numero-compras")
/* navbar-carrito */
const productosCarrito = document.getElementById("container-compras")
const btnVerCar = document.getElementById("car")
const carContainer = document.querySelector(".carrito")
const precioTotal = document.querySelector(".total-precio")

const btnComprar = document.querySelector(".bcomprar")

const btnEliminar = document.querySelector(".eliminar")


const btnMenuToggle = document.getElementById("toggle-menu")
const containerMenuToggle = document.querySelector(".list-nav")

/* hero-carrusel */
const img1 = document.querySelector(`.img1`)
const img2 = document.querySelector(`.img2`)
const progressBar = document.getElementById(`progress-bar`)
const divIndicadores = document.getElementById(`indicadores`)



let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const guardarLocalStorage = (listaCar) => {
    localStorage.setItem("carrito", JSON.stringify(listaCar))
}

/* render productos */

const renderProductos = (categorias) => {
    produc.innerHTML = "";

    categorias.forEach((producto) => {
        let content = document.createElement("div");
        content.className = "caracteristicas-producto"
        content.innerHTML = `
            <img class="imagen-producto" src="${producto.img}" alt="guitarra">
            <div class="datos">
                <p>serial:${producto.id}</p>
                <h3>${producto.nombre}</h3>
                <p>${producto.caracteristicas}</p>
                <div class="comprar">
                <p>${producto.precio}$</p>
            
                <button class="bcomprar agregar"
                    data-id='${producto.id}'
                    data-nombre='${producto.nombre}'
                    data-img='${producto.img}'
                    data-precio='${producto.precio}'
                    >Add</button>
            
            </div>`;

        produc.append(content);
    });

}






botonesCategoria.forEach(buton => {
    buton.addEventListener("click", (e) => {

        botonesCategoria.forEach(boton => boton.classList.remove("active"))
        e.currentTarget.classList.add("active")
        if (e.currentTarget.id != "todos") {
            const productosBoton = producto.filter(producto => producto.categoria.id === e.currentTarget.id);
            renderProductos(productosBoton);
        }
        else {
            renderProductos(producto);
        }
    })
})



/* menu navbar */
const menuNavbar = () => {
    containerMenuToggle.classList.toggle("list-nav")
    if (carContainer.classList.contains("open-car")) {
        carContainer.classList.remove("open-car")
        return;
    }
}

/* menu carrito */
const menuCar = () => {
    carContainer.classList.toggle("open-car")
   


    if (containerMenuToggle.classList.add("list-nav")) {
        containerMenuToggle.classList.remove("list-nav")
        return;
    }
    
}



/* carrusel-hero */

const slide = () => {


    const imagenes = [
        `./assets/img-guitarras/hero1.jpg`,
        `./assets/img-guitarras/hero2.jpg`,
        `./assets/img-guitarras/hero3.jpg`,
        `./assets/img-guitarras/hero4.jpg`,
        `./assets/img-guitarras/hero5.jpg`,
        `./assets/img-guitarras/hero6.jpg`,
        `./assets/img-guitarras/hero7.jpg`,

    ];

    let i = 1
    let porcentajeBase = 100 / imagenes.length
    let porcentajeActual = porcentajeBase

    for (let index = 0; index < imagenes.length; index++) {
        const div = document.createElement(`div`)
        div.classList.add(`circles`)
        div.id = index
        divIndicadores.appendChild(div)
    }

    progressBar.style.width = `${porcentajeBase}%`
    img1.src = imagenes[0]
    const circulos = document.querySelectorAll(`.circles`)
    circulos[0].classList.add(`resaltado`)

    const slideShow = () => {
        img2.src = imagenes[i]
        const circuloActual = Array.from(circulos).find(e => e.id == i)
        Array.from(circulos).forEach(c => c.classList.remove(`resaltado`))
        circuloActual.classList.add(`resaltado`)

        img2.classList.add(`active`)
        i++
        porcentajeActual += porcentajeBase
        progressBar.style.width = `${porcentajeActual}%`
        if (i == imagenes.length) {
            i = 0
            porcentajeActual = porcentajeBase - porcentajeBase
        }

        setTimeout(() => {
            img1.src = img2.src
            /*  img2.className.remove(`active`) */
        }, 1000)
    }

    setInterval(slideShow, 4000)
}


const renderProductosCarrito = ({img, nombre, id, cantidad, precio}) =>{
    return `<div class="compras">
    <img class="imagen-compra" src=${img} alt="imagen compra">
    <div class="carrito-producto-nombre">
        <small>PRODUCTO</small>
        <h3>${nombre}</h3>
    </div>
    <div class="carrito-cantidad">
        <small>CANTIDAD</small>
        <div class="contador-cantidad">
        <span class="restar" data-id=${id}>-</span>
        <p>${cantidad}</p>
        <span class="sumar" data-id=${id}>+</span>

        </div>
    </div>
    <div class="precio-producto">
        <small>PRECIO</small>
        <h3>${precio}</h3>
    </div>

    </div>`
}

const renderCarrito = () => {
    if (!carrito.length) {
        productosCarrito.innerHTML =
            `<p class="carrito-vacio">su carro esta vacio</p>
        `
        return
    }
    productosCarrito.innerHTML = carrito.map (renderProductosCarrito).join()
}


const totalPagarCarrito = () =>{
    return carrito.reduce((acc, valor)=> acc + Number(valor.precio) * valor.cantidad, 0)
}

const total = () =>{
    precioTotal.innerHTML = `${totalPagarCarrito().toFixed(2)}$`
}

const existenProductoCarrito= ({id}) =>{
    return carrito.some(productos => productos.id === id)
}

const carritoProductos = product =>{
    carrito = [...carrito, {... product, cantidad: 1 }]
}

const desabilitar = (boton) =>{
    if (!carrito.length) {
        boton.classList.add ("desabilitar")
        boton.classList.remove("bcomprar")
    }else{
        boton.classList.remove ("desabilitar")
        boton.classList.add("bcomprar")
    }
}

const estadoCarrito = () =>{
    guardarLocalStorage(carrito)
    renderCarrito()
    total()
    desabilitar(btnComprar)
    desabilitar(btnEliminar)
    numeroDeCompras()
}

const productoExistente = (product) => {
 carrito = carrito.map(cartProduct => 
    cartProduct.id === product.id 
    ? {...cartProduct, cantidad: cartProduct.cantidad + 1  }
    : cartProduct
    );
};


const agregarProductos = (e) =>{
 if (!e.target.classList.contains(`agregar`))return; 
    const {id, nombre, precio, img} = e.target.dataset;
   
    const product = {id, nombre, precio, img}
    if (existenProductoCarrito(product)) {
        productoExistente(product)
    }else{
        carritoProductos(product)
    }
  estadoCarrito()
}

const numeroDeCompras = () =>{
    numeroCar.textContent = carrito.reduce((acc, cur) => acc + cur.cantidad, 0)
}

const eliminarTodosLosProductos = () =>{
    carrito = [];
    estadoCarrito ()
}

const completarAccion = (comfirmarMsg, sucesomsg) =>{
 if (!carrito.length) return;
 if  (window.confirm(comfirmarMsg)) {
    eliminarTodosLosProductos()
    alert(sucesomsg);
 }  
 
}

const compraCompletada= ()=>{
 completarAccion(
    "¿desea completar su compra?",
 "gracias por su compra")
}



const eliminarTodo = () =>{
 completarAccion (
    "¿quieres eliminar todos los productos?",
 "el carrito esta vacio")
}


const SumarProductos = id =>{
 const existenProductos = carrito.find(product => product.id === id)
 productoExistente(existenProductos)
}

const emilinarProductoDelCarrito = ({id}) =>{
    carrito = carrito.filter(product => product.id !== id)
    estadoCarrito()
}

const sustraerProducto = ({id}) =>{
    carrito = carrito.map(product => product.id === id ? {...product, cantidad: product.cantidad - 1} : product)
    
}

const restarProductos = (id) =>{
    const existenProductos = carrito.find((product) => product.id === id)
    if (existenProductos.cantidad === 1 ) {
        if (window.confirm("¿desea eliminar el producto del carrito?")) {
            emilinarProductoDelCarrito(existenProductos)

        }
        return
    
    }
    sustraerProducto(existenProductos)

}

const cantidades = (e) => {
if (e.target.classList.contains ("restar")) {
    restarProductos(e.target.dataset.id)
    
}else if (e.target.classList.contains ("sumar")){
    SumarProductos(e.target.dataset.id)
}
estadoCarrito()



}

const init = () => {
    /* renderProducts() */
    renderProductos(producto)

    /* barra nav */
    btnVerCar.addEventListener("click", menuCar)
    btnMenuToggle.addEventListener("click", menuNavbar)
    /* hero */
    addEventListener(`DOMContentLoaded`, slide)
    /* render cart */
    document.addEventListener("DOMContentLoaded", renderCarrito);
    document.addEventListener("DOMContentLoaded", total)
    produc.addEventListener("click", agregarProductos)
    desabilitar(btnComprar)
    desabilitar(btnEliminar)
    numeroDeCompras()
    btnComprar.addEventListener("click", compraCompletada)
    btnEliminar.addEventListener("click", eliminarTodo)
    productosCarrito.addEventListener("click", cantidades)
 }
init()



