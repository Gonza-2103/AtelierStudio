//Recuperar el producto seleccionado

const productoSeleccionado =
    JSON.parse(
        localStorage.getItem(
            "productoSeleccionadoAdmin"
        )
    );


//Capturar elementos del HTML

const detalleImagen =
    document.getElementById(
        "detalleImagenProducto"
    );

const detalleCodigo =
    document.getElementById(
        "detalleCodigoProducto"
    );

const detalleNombre =
    document.getElementById(
        "detalleNombreProducto"
    );

const detalleDescripcion =
    document.getElementById(
        "detalleDescripcionProducto"
    );

const detalleMedidas =
    document.getElementById(
        "detalleMedidasProducto"
    );

const detallePrecio =
    document.getElementById(
        "detallePrecioProducto"
    );

const detalleStock =
    document.getElementById(
        "detalleStockProducto"
    );

const detalleStockCritico =
    document.getElementById(
        "detalleStockCriticoProducto"
    );

const detalleCategoria =
    document.getElementById(
        "detalleCategoriaProducto"
    );

const botonEditar =
    document.getElementById(
        "btnEditarProducto"
    );


//Mostrar los datos del producto

if (productoSeleccionado !== null) {

    detalleImagen.src =
        productoSeleccionado.imagen;

    detalleImagen.alt =
        productoSeleccionado.nombre;

    detalleCodigo.innerHTML =
        productoSeleccionado.codigo;

    detalleNombre.innerHTML =
        productoSeleccionado.nombre;

    detalleDescripcion.innerHTML =
        productoSeleccionado.descripcion;

    detalleMedidas.innerHTML =
        productoSeleccionado.medidas;

    detallePrecio.innerHTML =
        "$" +
        productoSeleccionado.precio.toLocaleString(
            "es-CL"
        );

    detalleStock.innerHTML =
        productoSeleccionado.stock;

    detalleStockCritico.innerHTML =
        productoSeleccionado.stockCritico;

    detalleCategoria.innerHTML =
        productoSeleccionado.categoria;

}


//Editar el producto mostrado

botonEditar.addEventListener(
    "click",
    function () {

        if (productoSeleccionado !== null) {

            localStorage.setItem(
                "productoEditarId",
                productoSeleccionado.id
            );

            window.location.href =
                "producto_formulario.html";

        }

    }
);