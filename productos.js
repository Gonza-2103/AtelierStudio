// Arreglo de productos

const productos = [
    {
        id: 1,
        nombre: "Retrato Mar y Playa",
        precio: 45000,
        imagen: "imagenes/fotoarte1.jpg",
        descripcion: "Retrato inspirado en el paisaje costero.",
        stock: 10
    },
    {
        id: 2,
        nombre: "Cuadro Caballero con Pipa",
        precio: 60000,
        imagen: "imagenes/fotoarte2.jpg",
        descripcion: "Pintura de estilo clásico realizada sobre lienzo.",
        stock: 8
    },

    {
    id: 3,
    nombre: "Paisaje de Montaña",
    precio: 35000,
    imagen: "imagenes/fotoarte3.png",
    descripcion: "Pintura inspirada en un paisaje cordillerano.",
    stock: 6
    },

    {
    id: 4,
    nombre: "Gato entre Sombras",
    precio: 35000,
    imagen: "imagenes/fotoarte4.png",
    descripcion: "Acuarela de un gato rodeado de plantas y suaves contrastes de luz y sombra.",
    stock: 6
    }
];


// Captura del contenedor de productos

const contenedorProductos =
    document.getElementById("contenedor_prod");


// Objeto para guardar temporalmente las cantidades seleccionadas

let cantidadesSeleccionadas = {};


// Recuperar el carrito guardado en localStorage

let carrito =
    JSON.parse(localStorage.getItem("carrito")) || [];


// Inicializar la cantidad seleccionada de cada producto

for (let i = 0; i < productos.length; i++) {

    cantidadesSeleccionadas[productos[i].id] = 0;

}


// Mostrar todos los productos del arreglo

function mostrarProductos() {

    contenedorProductos.innerHTML = "";


    for (let i = 0; i < productos.length; i++) {

        const producto = productos[i];

        const tarjetaProducto = document.createElement("article");

        tarjetaProducto.className = "producto_card";


        tarjetaProducto.innerHTML = `
            <h2>${producto.nombre}</h2>

            <img
                src="${producto.imagen}"
                alt="${producto.nombre}"
                class="imagen_producto"
            >

            <p class="descripcion_producto">
                ${producto.descripcion}
            </p>

            <p class="precio_producto">
                <strong>
                    $${producto.precio.toLocaleString("es-CL")}
                </strong>
            </p>

            <p class="stock_producto">
                Stock disponible: ${producto.stock}
            </p>

            <div class="contador_producto">

                <button
                    type="button"
                    class="btn_restar"
                    data-id="${producto.id}"
                >
                    <strong>&minus;</strong>
                </button>

                <span
                    id="cantidadProducto${producto.id}"
                    class="numero_producto"
                >
                    <strong>0</strong>
                </span>

                <button
                    type="button"
                    class="btn_sumar"
                    data-id="${producto.id}"
                >
                    <strong>+</strong>
                </button>

            </div>

            <div class="acciones_producto">

                <button
                    type="button"
                    class="btn_ver_detalle"
                    data-id="${producto.id}"
                >
                    VER DETALLES
                </button>

                <button
                    type="button"
                    class="btn_agregar_carrito"
                    data-id="${producto.id}"
                    aria-label="Añadir ${producto.nombre} al carrito"
                >
                    <svg
                        class="icono_carrito"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
            >
                        <path
                            d="m2.05 2.05 1.099-.028a1 1 0 0 1 1.008.815l2.69 14.347A1 1 0 0 0 7.83 18H18"
                        ></path>

                        <path
                            d="M4.563 5h16.435a1 1 0 0 1 .981 1.204l-1.026 6.226A2 2 0 0 1 18.962 14H6.25"
                        ></path>

                        <circle cx="18" cy="20" r="2"></circle>

                        <circle cx="8" cy="20" r="2"></circle>
                    </svg>
                </button>

            </div>
        `;


        contenedorProductos.appendChild(tarjetaProducto);

    }


    conectarBotones();

}


// Conectar los eventos de los botones creados con JavaScript

function conectarBotones() {

    const botonesSumar =
        document.querySelectorAll(".btn_sumar");

    const botonesRestar =
        document.querySelectorAll(".btn_restar");

    const botonesCarrito =
        document.querySelectorAll(".btn_agregar_carrito");

    const botonesDetalle =
        document.querySelectorAll(".btn_ver_detalle");


    for (let i = 0; i < botonesSumar.length; i++) {

        botonesSumar[i].addEventListener("click", function () {

            const idProducto =
                Number(botonesSumar[i].dataset.id);

            aumentarCantidad(idProducto);

        });

    }


    for (let i = 0; i < botonesRestar.length; i++) {

        botonesRestar[i].addEventListener("click", function () {

            const idProducto =
                Number(botonesRestar[i].dataset.id);

            disminuirCantidad(idProducto);

        });

    }


    for (let i = 0; i < botonesCarrito.length; i++) {

        botonesCarrito[i].addEventListener("click", function () {

            const idProducto =
                Number(botonesCarrito[i].dataset.id);

            agregarAlCarrito(idProducto);

        });

    }


    for (let i = 0; i < botonesDetalle.length; i++) {

        botonesDetalle[i].addEventListener("click", function () {

            const idProducto =
                Number(botonesDetalle[i].dataset.id);

            verDetalle(idProducto);

        });

    }

}


// Buscar un producto utilizando su identificador

function buscarProducto(idProducto) {

    for (let i = 0; i < productos.length; i++) {

        if (productos[i].id === idProducto) {

            return productos[i];

        }

    }


    return null;

}


// Aumentar la cantidad seleccionada

function aumentarCantidad(idProducto) {

    const producto = buscarProducto(idProducto);

    const cantidadActual =
        cantidadesSeleccionadas[idProducto];


    if (cantidadActual < producto.stock) {

        cantidadesSeleccionadas[idProducto]++;

        actualizarCantidadEnPantalla(idProducto);

        console.log(
            "Cantidad aumentada: " +
            producto.nombre +
            " - " +
            cantidadesSeleccionadas[idProducto]
        );

    } else {

        alert(
            "No puede seleccionar más unidades que el stock disponible."
        );

    }

}


// Disminuir la cantidad seleccionada

function disminuirCantidad(idProducto) {

    if (cantidadesSeleccionadas[idProducto] > 0) {

        cantidadesSeleccionadas[idProducto]--;

        actualizarCantidadEnPantalla(idProducto);

    }

}


// Actualizar la cantidad mostrada en la tarjeta

function actualizarCantidadEnPantalla(idProducto) {

    const numeroProducto =
        document.getElementById(
            "cantidadProducto" + idProducto
        );


    numeroProducto.innerHTML =
        "<strong>" +
        cantidadesSeleccionadas[idProducto] +
        "</strong>";

}


// Añadir el producto seleccionado al carrito

function agregarAlCarrito(idProducto) {

    const producto = buscarProducto(idProducto);

    const cantidad =
        cantidadesSeleccionadas[idProducto];


    if (cantidad === 0) {

        alert(
            "Debe seleccionar al menos una unidad antes de añadir el producto."
        );

        return;

    }


    let productoEncontrado = false;


    for (let i = 0; i < carrito.length; i++) {

        if (carrito[i].id === idProducto) {

            const nuevaCantidad =
                carrito[i].cantidad + cantidad;


            if (nuevaCantidad > producto.stock) {

                alert(
                    "La cantidad total supera el stock disponible."
                );

                return;

            }


            carrito[i].cantidad = nuevaCantidad;

            productoEncontrado = true;

        }

    }


    if (!productoEncontrado) {

        const productoCarrito = {
            id: producto.id,
            nombre: producto.nombre,
            precio: producto.precio,
            imagen: producto.imagen,
            cantidad: cantidad,
            stock: producto.stock
        };


        carrito.push(productoCarrito);

    }


    guardarCarrito();


    alert(
        cantidad +
        " unidad(es) de " +
        producto.nombre +
        " añadida(s) al carrito."
    );


    cantidadesSeleccionadas[idProducto] = 0;

    actualizarCantidadEnPantalla(idProducto);

}


// Guardar el carrito en localStorage

function guardarCarrito() {

    localStorage.setItem(
        "carrito",
        JSON.stringify(carrito)
    );


    console.log("Carrito guardado:", carrito);

}


// Guardar el producto seleccionado y abrir su detalle

function verDetalle(idProducto) {

    const producto = buscarProducto(idProducto);


    localStorage.setItem(
        "productoSeleccionado",
        JSON.stringify(producto)
    );


    window.location.href = "detalle_producto.html";

}


// Ejecutar la función al cargar la página

mostrarProductos();