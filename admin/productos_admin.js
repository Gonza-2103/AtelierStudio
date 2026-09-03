// Productos iniciales del sistema

const productosIniciales = [
    {
        id: 1,
        codigo: "ART001",
        nombre: "Retrato Mar y Playa",
        descripcion: "Obra inspirada en el paisaje costero.",
        medidas: "60x70 cm",
        precio: 45000,
        stock: 10,
        stockCritico: 2,
        categoria: "Pintura",
        imagen: "../imagenes/fotoarte1.jpg"
    },
    {
        id: 2,
        codigo: "ART002",
        nombre: "Caballero con Pipa",
        descripcion: "Pintura de estilo clásico sobre lienzo.",
        medidas: "50x60 cm",
        precio: 60000,
        stock: 8,
        stockCritico: 2,
        categoria: "Pintura",
        imagen: "../imagenes/fotoarte2.jpg"
    },
    {
        id: 3,
        codigo: "ART003",
        nombre: "Paisaje de Montaña",
        descripcion: "Obra inspirada en un paisaje cordillerano.",
        medidas: "70x80 cm",
        precio: 35000,
        stock: 6,
        stockCritico: 2,
        categoria: "Acuarela",
        imagen: "../imagenes/fotoarte3.png"

    
    },

    {
    id: 4,
    codigo: "ART004",
    nombre: "Gato entre Sombras",
    descripcion: "Acuarela que captura la esencia de un gato en un entorno misterioso.",
    medidas: "50x60 cm",
    precio: 35000,
    stock: 6,
    stockCritico: 2,
    categoria: "Acuarela",
    imagen: "../imagenes/fotoarte4.png",
  
    }
];


// Capturar elementos del HTML

const cuerpoTablaProductos =
    document.getElementById("cuerpoTablaProductos");

const mensajeSinProductos =
    document.getElementById("mensajeSinProductos");


// Recuperar los productos desde localStorage

let productos =
    JSON.parse(localStorage.getItem("productos"));


// Crear los productos iniciales solamente si aún no existen

if (productos === null) {

    productos = productosIniciales;

    guardarProductos();

}


// Guardar el arreglo de productos en localStorage

function guardarProductos() {

    localStorage.setItem(
        "productos",
        JSON.stringify(productos)
    );

}



// Mostrar los productos en la tabla

function mostrarProductos() {

    cuerpoTablaProductos.innerHTML = "";


    if (productos.length === 0) {

        mensajeSinProductos.style.display = "block";

        return;

    }


    mensajeSinProductos.style.display = "none";


    for (let i = 0; i < productos.length; i++) {

        const producto = productos[i];

        const filaProducto =
            document.createElement("tr");


        let mensajeStock = producto.stock;


        if (
            producto.stockCritico !== "" &&
            producto.stock <= producto.stockCritico
        ) {

            mensajeStock =
                producto.stock + " - Stock crítico";

        }


        filaProducto.innerHTML = `
            <td>${producto.codigo}</td>

            <td>${producto.nombre}</td>

            <td>${producto.categoria}</td>

            <td>
                $${producto.precio.toLocaleString("es-CL")}
            </td>

            <td>${mensajeStock}</td>

            <td class="acciones_tabla_admin">

                <button
                    type="button"
                    class="btn_mostrar_producto"
                    data-id="${producto.id}"
                >
                    Mostrar
                </button>

                <button
                    type="button"
                    class="btn_editar_producto"
                    data-id="${producto.id}"
                >
                    Editar
                </button>

                <button
                    type="button"
                    class="btn_eliminar_producto"
                    data-id="${producto.id}"
                >
                    Eliminar
                </button>

            </td>
        `;


        cuerpoTablaProductos.appendChild(filaProducto);

    }


    conectarBotonesProductos();

}


// Conectar los botones creados mediante JavaScript

function conectarBotonesProductos() {

    const botonesMostrar =
        document.querySelectorAll(".btn_mostrar_producto");

    const botonesEditar =
        document.querySelectorAll(".btn_editar_producto");

    const botonesEliminar =
        document.querySelectorAll(".btn_eliminar_producto");


    for (let i = 0; i < botonesMostrar.length; i++) {

        botonesMostrar[i].addEventListener(
            "click",
            function () {

                const idProducto =
                    Number(botonesMostrar[i].dataset.id);

                mostrarDetalleProducto(idProducto);

            }
        );

    }


    for (let i = 0; i < botonesEditar.length; i++) {

        botonesEditar[i].addEventListener(
            "click",
            function () {

                const idProducto =
                    Number(botonesEditar[i].dataset.id);

                editarProducto(idProducto);

            }
        );

    }


    for (let i = 0; i < botonesEliminar.length; i++) {

        botonesEliminar[i].addEventListener(
            "click",
            function () {

                const idProducto =
                    Number(botonesEliminar[i].dataset.id);

                eliminarProducto(idProducto);

            }
        );

    }

}


// Buscar un producto por su identificador

function buscarProducto(idProducto) {

    for (let i = 0; i < productos.length; i++) {

        if (productos[i].id === idProducto) {

            return productos[i];

        }

    }


    return null;

}


// Guardar el producto seleccionado para mostrarlo

function mostrarDetalleProducto(idProducto) {

    const producto = buscarProducto(idProducto);


    localStorage.setItem(
        "productoSeleccionadoAdmin",
        JSON.stringify(producto)
    );


    window.location.href = "producto_detalle.html";

}


// Guardar el identificador del producto que se editará

function editarProducto(idProducto) {

    localStorage.setItem(
        "productoEditarId",
        idProducto
    );


    window.location.href = "producto_formulario.html";

}


// Eliminar un producto

function eliminarProducto(idProducto) {

    const producto = buscarProducto(idProducto);


    const confirmarEliminacion = confirm(
        "¿Desea eliminar el producto " +
        producto.nombre +
        "?"
    );


    if (confirmarEliminacion) {

        for (let i = 0; i < productos.length; i++) {

            if (productos[i].id === idProducto) {

                productos.splice(i, 1);

                break;

            }

        }


        guardarProductos();

        mostrarProductos();


        alert("Producto eliminado correctamente.");

        console.log(
            "Producto eliminado: " +
            producto.nombre
        );

    }

}


// Ejecutar al cargar la página


mostrarProductos();