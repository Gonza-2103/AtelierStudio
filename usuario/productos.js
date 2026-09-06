document.addEventListener("DOMContentLoaded", function () {

    // Obtener el catálogo oficial (desde localStorage si fue cargado por admin o el inicial por defecto)
    let catalogo = JSON.parse(localStorage.getItem("productos"));

    if (!catalogo || catalogo.length === 0) {
        catalogo = [
            {
                id: 1,
                codigo: "ART001",
                nombre: "Cuadro 'Mar y Playa'",
                precio: 45000,
                stock: 10,
                imagen: "../imagenes/fotoarte1.jpg",
                descripcion: "Fotografía aérea que captura el contraste entre las aguas turquesas del océano y la arena blanca, destacando el movimiento de las olas al llegar a la costa."
            },
            {
                id: 2,
                codigo: "ART002",
                nombre: "Retrato 'Caballero con Pipa'",
                precio: 60000,
                stock: 8,
                imagen: "../imagenes/fotoarte2.jpg",
                descripcion: "Pintura al óleo de estilo expresivo que retrata de perfil a un marinero o pescador de mirada reflexiva, con una pipa y un paisaje de mar al fondo."
            },
            {
                id: 3,
                codigo: "ART003",
                nombre: "Cuadro 'Paisaje de Montaña'",
                precio: 48000,
                stock: 6,
                imagen: "../imagenes/fotoarte3.png",
                descripcion: "Pintura paisajística al óleo que muestra una cordillera nevada reflejada en un lago de aguas cristalinas, rodeado de bosques bajo un cielo parcialmente nublado."
            },
            {
                id: 4,
                codigo: "ART004",
                nombre: "Retrato 'Gato entre Sombras'",
                precio: 72000,
                stock: 6,
                imagen: "../imagenes/fotoarte4.png",
                descripcion: "Acuarela que representa a un gato atigrado de pelaje naranja y blanco, rodeado por un marcado juego de luces y sombras proyectadas por la vegetación."
            }
        ];
    }

    // Asociar eventos a cada tarjeta individual de producto
    const seccionesProductos = [
        { id: 1, selector: "#contenedor_prod_1" },
        { id: 2, selector: "#contenedor_prod_2" },
        { id: 3, selector: "#contenedor_prod_3" },
        { id: 4, selector: "#contenedor_prod_4" }
    ];

    seccionesProductos.forEach(item => {
        const contenedor = document.querySelector(item.selector);
        if (!contenedor) return;

        const btnRestar = contenedor.querySelector("#btn_restar");
        const btnSumar = contenedor.querySelector("#btn_sumar");
        const spanCantidad = contenedor.querySelector("#numero_prod strong") || contenedor.querySelector("#numero_prod");
        const btnAgregar = contenedor.querySelector("#btn_car_comp");

        const productoDatos = catalogo.find(p => p.id === item.id);
        const stockDisponible = productoDatos ? productoDatos.stock : 0;

        // Botón Restar
        if (btnRestar && spanCantidad) {
            btnRestar.addEventListener("click", function () {
                let cantidadActual = parseInt(spanCantidad.textContent, 10) || 1;
                if (cantidadActual > 1) {
                    spanCantidad.textContent = cantidadActual - 1;
                }
            });
        }

        // Botón Sumar con validación inmediata de stock disponible
        if (btnSumar && spanCantidad) {
            btnSumar.addEventListener("click", function () {
                let cantidadActual = parseInt(spanCantidad.textContent, 10) || 1;

                if (cantidadActual < stockDisponible) {
                    spanCantidad.textContent = cantidadActual + 1;
                } else {
                    alert("No hay más unidades disponibles en stock para este producto.");
                }
            });
        }

        // Botón Agregar al Carrito
        if (btnAgregar && spanCantidad) {
            btnAgregar.addEventListener("click", function () {
                const cantidadSeleccionada = parseInt(spanCantidad.textContent, 10) || 1;

                // Cargar carrito actual de localStorage
                let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

                // Verificar si el producto ya estaba en el carrito
                const itemExistente = carrito.find(p => p.id === item.id);
                const cantidadEnCarrito = itemExistente ? itemExistente.cantidad : 0;

                // Validación de stock acumulado
                if (cantidadEnCarrito + cantidadSeleccionada > stockDisponible) {
                    alert("No hay más unidades disponibles en stock para añadir.");
                    return;
                }

                if (itemExistente) {
                    itemExistente.cantidad += cantidadSeleccionada;
                } else {
                    carrito.push({
                        id: productoDatos.id,
                        nombre: productoDatos.nombre,
                        precio: productoDatos.precio,
                        imagen: productoDatos.imagen,
                        cantidad: cantidadSeleccionada,
                        stock: stockDisponible
                    });
                }

                // Guardar en localStorage
                localStorage.setItem("carrito", JSON.stringify(carrito));
                alert(`Se agregaron ${cantidadSeleccionada} unidad(es) de "${productoDatos.nombre}" al carrito.`);
                
                // Reiniciar contador visual a 1
                spanCantidad.textContent = "1";
            });
        }
    });

    // Botón "VER DETALLES"
    const btnVerDetalles = document.getElementById("btn_ver_det");
    if (btnVerDetalles) {
        btnVerDetalles.addEventListener("click", function (evento) {
            evento.preventDefault();

            // Guarda el primer producto o el seleccionado por defecto para mostrar en detalle
            localStorage.setItem("productoSeleccionado", JSON.stringify(catalogo[0]));
            window.location.href = "detalle_producto.html";
        });
    }
});

