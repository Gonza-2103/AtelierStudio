// Capturar los elementos del formulario

const formularioProducto =
    document.getElementById("formProducto");

const inputCodigo =
    document.getElementById("codigoProducto");

const inputNombre =
    document.getElementById("nombreProducto");

const inputDescripcion =
    document.getElementById("descripcionProducto");

const inputPrecio =
    document.getElementById("precioProducto");

const inputStock =
    document.getElementById("stockProducto");

const inputStockCritico =
    document.getElementById("stockCriticoProducto");

const selectCategoria =
    document.getElementById("categoriaProducto");

const inputImagen =
    document.getElementById("imagenProducto");

const tituloFormulario =
    document.getElementById("tituloFormularioProducto");

const botonGuardar =
    document.getElementById("btnGuardarProducto");


// Recuperar los productos guardados

let productos =
    JSON.parse(localStorage.getItem("productos")) || [];


// Revisar cómo se abrió el formulario

const parametros =
    new URLSearchParams(window.location.search);

const modoNuevo =
    parametros.get("modo") === "nuevo";


// Variables utilizadas para la edición

let productoEditarId = null;
let productoEditado = null;


// Preparar el formulario según la opción seleccionada

if (modoNuevo) {
    // Eliminar cualquier edición anterior

    localStorage.removeItem("productoEditarId");

    tituloFormulario.innerHTML = "Nuevo producto";
    botonGuardar.innerHTML = "GUARDAR PRODUCTO";

    formularioProducto.reset();

} else {
    // Recuperar el identificador del producto seleccionado

    productoEditarId =
        localStorage.getItem("productoEditarId");


    // Buscar el producto dentro del arreglo

    if (productoEditarId !== null) {
        const idProducto = Number(productoEditarId);

        for (let i = 0; i < productos.length; i++) {
            if (productos[i].id === idProducto) {
                productoEditado = productos[i];
                break;
            }
        }
    }


    // Mostrar los datos del producto encontrado

    if (productoEditado !== null) {
        tituloFormulario.innerHTML = "Editar producto";
        botonGuardar.innerHTML = "GUARDAR CAMBIOS";

        inputCodigo.value = productoEditado.codigo;
        inputNombre.value = productoEditado.nombre;
        inputDescripcion.value =
            productoEditado.descripcion;

        inputPrecio.value = productoEditado.precio;
        inputStock.value = productoEditado.stock;
        inputStockCritico.value =
            productoEditado.stockCritico;

        selectCategoria.value =
            productoEditado.categoria;

        inputImagen.value = productoEditado.imagen;
    } else {
        // Si no existe un producto seleccionado,
        // abrir el formulario como nuevo

        tituloFormulario.innerHTML = "Nuevo producto";
        botonGuardar.innerHTML = "GUARDAR PRODUCTO";

        formularioProducto.reset();
    }

}

    // Capturar las etiquetas para mostrar errores

const errorCodigo =
    document.getElementById("errorCodigoProducto");

const errorNombre =
    document.getElementById("errorNombreProducto");

const errorDescripcion =
    document.getElementById("errorDescripcionProducto");

const errorPrecio =
    document.getElementById("errorPrecioProducto");

const errorStock =
    document.getElementById("errorStockProducto");

const errorStockCritico =
    document.getElementById("errorStockCriticoProducto");

const errorCategoria =
    document.getElementById("errorCategoriaProducto");


// Validar el formulario al enviarlo

formularioProducto.addEventListener(
    "submit",
    function (event) {

        // Evitar el envío automático del formulario

        event.preventDefault();


        // Capturar los valores ingresados

        const codigo =
            inputCodigo.value.trim().toUpperCase();

        const nombre =
            inputNombre.value.trim();

        const descripcion =
            inputDescripcion.value.trim();

        const precioTexto =
            inputPrecio.value.trim();

        const stockTexto =
            inputStock.value.trim();

        const stockCriticoTexto =
            inputStockCritico.value.trim();

        const categoria =
            selectCategoria.value;

        const imagen =
            inputImagen.value.trim();


        // Convertir los valores numéricos

        const precio = Number(precioTexto);
        const stock = Number(stockTexto);

        let stockCritico = "";

        if (stockCriticoTexto !== "") {
            stockCritico =
                Number(stockCriticoTexto);
        }


        // Variable que controla el resultado

        let formularioValido = true;

        console.log(
            "Validando formulario de producto..."
        );


        // Limpiar los mensajes anteriores

        errorCodigo.innerHTML = "";
        errorNombre.innerHTML = "";
        errorDescripcion.innerHTML = "";
        errorPrecio.innerHTML = "";
        errorStock.innerHTML = "";
        errorStockCritico.innerHTML = "";
        errorCategoria.innerHTML = "";


        // Validar código

        if (codigo === "") {
            errorCodigo.innerHTML =
                "El código es obligatorio.";

            formularioValido = false;

        } else if (codigo.length < 3) {
            errorCodigo.innerHTML =
                "El código debe contener al menos 3 caracteres.";

            formularioValido = false;
        }


        // Revisar que el código no esté repetido

        for (let i = 0; i < productos.length; i++) {

            const esElMismoProducto =
                productoEditado !== null &&
                productos[i].id === productoEditado.id;

            if (
                productos[i].codigo.toUpperCase() === codigo &&
                !esElMismoProducto
            ) {
                errorCodigo.innerHTML =
                    "Ya existe un producto con este código.";

                formularioValido = false;
                break;
            }
        }


        // Validar nombre

        if (nombre === "") {
            errorNombre.innerHTML =
                "El nombre es obligatorio.";

            formularioValido = false;

        } else if (nombre.length > 100) {
            errorNombre.innerHTML =
                "El nombre no puede superar los 100 caracteres.";

            formularioValido = false;
        }


        // Validar descripción

        if (descripcion.length > 500) {
            errorDescripcion.innerHTML =
                "La descripción no puede superar los 500 caracteres.";

            formularioValido = false;
        }


        // Validar precio

        if (precioTexto === "") {
            errorPrecio.innerHTML =
                "El precio es obligatorio.";

            formularioValido = false;

        } else if (
            Number.isNaN(precio) ||
            precio < 0
        ) {
            errorPrecio.innerHTML =
                "El precio debe ser un número igual o superior a 0.";

            formularioValido = false;
        }


        // Validar stock

        if (stockTexto === "") {
            errorStock.innerHTML =
                "El stock es obligatorio.";

            formularioValido = false;

        } else if (
            Number.isNaN(stock) ||
            stock < 0 ||
            !Number.isInteger(stock)
        ) {
            errorStock.innerHTML =
                "El stock debe ser un número entero igual o superior a 0.";

            formularioValido = false;
        }


        // Validar stock crítico

        if (
            stockCriticoTexto !== "" &&
            (
                Number.isNaN(stockCritico) ||
                stockCritico < 0 ||
                !Number.isInteger(stockCritico)
            )
        ) {
            errorStockCritico.innerHTML =
                "El stock crítico debe ser un número entero igual o superior a 0.";

            formularioValido = false;
        }


        // Validar categoría

        if (
            categoria !== "Pintura" &&
            categoria !== "Acuarela"
        ) {
            errorCategoria.innerHTML =
                "Debe seleccionar una categoría.";

            formularioValido = false;
        }


        // Detener el proceso si existen errores

        if (!formularioValido) {
            alert(
                "No se pudo guardar el producto. Revise los campos indicados."
            );

            console.log(
                "ESTADO: Producto rechazado por datos inválidos."
            );

            return;
        }


        // Editar el producto seleccionado

        if (
            productoEditado !== null &&
            !modoNuevo
        ) {
            productoEditado.codigo = codigo;
            productoEditado.nombre = nombre;
            productoEditado.descripcion = descripcion;
            productoEditado.precio = precio;
            productoEditado.stock = stock;
            productoEditado.stockCritico = stockCritico;
            productoEditado.categoria = categoria;
            productoEditado.imagen = imagen;

            alert(
                "Producto actualizado correctamente."
            );

            console.log(
                "Producto actualizado: " + nombre
            );

        } else {
            // Buscar el próximo identificador disponible

            let nuevoId = 1;

            for (let i = 0; i < productos.length; i++) {
                if (productos[i].id >= nuevoId) {
                    nuevoId =
                        productos[i].id + 1;
                }
            }


            // Crear el producto nuevo

            const nuevoProducto = {
                id: nuevoId,
                codigo: codigo,
                nombre: nombre,
                descripcion: descripcion,
                precio: precio,
                stock: stock,
                stockCritico: stockCritico,
                categoria: categoria,
                imagen: imagen
            };


            // Añadirlo al arreglo

            productos.push(nuevoProducto);

            alert(
                "Producto creado correctamente."
            );

            console.log(
                "Producto creado: " + nombre
            );
        }


        // Guardar el arreglo actualizado

        localStorage.setItem(
            "productos",
            JSON.stringify(productos)
        );


        // Limpiar la selección de edición

        localStorage.removeItem(
            "productoEditarId"
        );


        // Volver al listado de productos

        window.location.href =
            "productos_admin.html";
    }
);
