document.addEventListener("DOMContentLoaded", function () {
    
    // Lista base oficial con categorías explícitas
    const catalogoPorDefecto = [
        {
            id: 1,
            codigo: "ART001",
            nombre: "Cuadro 'Mar y Playa'",
            categoria: "Fotografía Artística",
            precio: 45000,
            stock: 10,
            imagen: "../imagenes/fotoarte1.jpg",
            descripcion: "Fotografía aérea en plano cenital que captura el contraste entre las aguas turquesas del océano y la orilla de arena blanca.",
            artista: "AtelierStudio",
            tecnica: "Fotografía de autor"
        },
        {
            id: 2,
            codigo: "ART002",
            nombre: "Retrato 'Caballero con Pipa'",
            categoria: "Pintura al Óleo",
            precio: 60000,
            stock: 8,
            imagen: "../imagenes/fotoarte2.jpg",
            descripcion: "Pintura al óleo de estilo expresivo que retrata de perfil a un marinero o pescador de mirada reflexiva con pipa.",
            artista: "AtelierStudio",
            tecnica: "Óleo sobre lienzo"
        },
        {
            id: 3,
            codigo: "ART003",
            nombre: "Cuadro 'Paisaje de Montaña'",
            categoria: "Pintura al Óleo",
            precio: 48000,
            stock: 6,
            imagen: "../imagenes/fotoarte3.png",
            descripcion: "Pintura paisajística tradicional al óleo que muestra una cordillera alpina nevada reflejada en un lago.",
            artista: "AtelierStudio",
            tecnica: "Óleo sobre lienzo"
        },
        {
            id: 4,
            codigo: "ART004",
            nombre: "Retrato 'Gato entre Sombras'",
            categoria: "Acuarela y Técnica Mixta",
            precio: 72000,
            stock: 6,
            imagen: "../imagenes/fotoarte4.png",
            descripcion: "Acuarela luminosa que ilustra a un gato atigrado de pelaje naranja y blanco.",
            artista: "AtelierStudio",
            tecnica: "Acuarela y papel"
        }
    ];

    // Leer localStorage
    let catalogo = JSON.parse(localStorage.getItem("productos"));

    // Si no existe, está vacío o sus objetos no tienen categoría, forzar la lista oficial
    if (!catalogo || catalogo.length === 0 || !catalogo[0].categoria) {
        catalogo = catalogoPorDefecto;
        localStorage.setItem("productos", JSON.stringify(catalogo));
    }

    const grillaResultados = document.querySelector(".grilla_resultados_busq");
    const inputBusqueda = document.querySelector(".input_busq_texto");
    const btnBuscar = document.querySelector(".btn_ejecutar_busq");
    const itemsMenu = document.querySelectorAll(".sidebar_busq .item_menu");
    const linkDetalleGeneral = document.querySelector(".btn_det_busq .link_det_busq");

    // Función auxiliar para quitar acentos, tildes y mayúsculas
    function normalizarTexto(texto) {
        return (texto || "")
            .toString()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase()
            .trim();
    }

    // Renderizar tarjetas en la grilla manteniendo la estructura y tamaño idéntico
    function renderizarProductos(lista) {
        grillaResultados.innerHTML = "";

        if (lista.length === 0) {
            grillaResultados.innerHTML = `<p style="color: white; width: 100%; text-align: center; margin-top: 20px;">No se encontraron obras con los criterios seleccionados.</p>`;
            return;
        }

        lista.forEach(prod => {
            const card = document.createElement("article");
            card.className = "tarjeta_res_busq";
            card.innerHTML = `
                <img src="${prod.imagen}" alt="${prod.nombre}">
                <h4>${prod.nombre}</h4>
            `;
            grillaResultados.appendChild(card);
        });

        // Evento para abrir el producto específico en detalle_producto.html
        grillaResultados.querySelectorAll(".link_det_busq").forEach(enlace => {
            enlace.addEventListener("click", function (evento) {
                evento.preventDefault();
                const idProd = parseInt(this.dataset.id, 10);
                const productoSeleccionado = catalogo.find(p => p.id === idProd);
                if (productoSeleccionado) {
                    localStorage.setItem("productoSeleccionado", JSON.stringify(productoSeleccionado));
                }
                window.location.href = "detalle_producto.html";
            });
        });
    }

    // Marca el botón activo en la barra lateral
    function activarBotonMenu(enlaceSeleccionado) {
        itemsMenu.forEach(item => item.classList.remove("activo"));
        if (enlaceSeleccionado) {
            enlaceSeleccionado.classList.add("activo");
        }
    }

    // Enlace del botón general "VER DETALLES" del aside
    if (linkDetalleGeneral) {
        linkDetalleGeneral.addEventListener("click", function (evento) {
            evento.preventDefault();
            // Guarda el primer producto por defecto y redirige
            localStorage.setItem("productoSeleccionado", JSON.stringify(catalogo[0]));
            window.location.href = "detalle_producto.html";
        });
    }

    // Eventos para los filtros del menú lateral
    itemsMenu.forEach(item => {
        item.addEventListener("click", function (evento) {
            evento.preventDefault();
            const textoBoton = normalizarTexto(this.textContent);

            // 1. Obras no disponibles temporalmente
            if (textoBoton.includes("busqueda rapida") || textoBoton.includes("ayuda de filtros")) {
                alert("Esta función no está disponible por el momento.");
                return;
            }

            activarBotonMenu(this);

            // 2. Todas las Obras
            if (textoBoton.includes("todas las obras")) {
                renderizarProductos(catalogo);
                return;
            }

            // 3. Óleo sobre Lienzo
            if (textoBoton.includes("oleo")) {
                const filtrados = catalogo.filter(p => 
                    normalizarTexto(p.categoria).includes("oleo") || 
                    normalizarTexto(p.tecnica).includes("oleo") ||
                    normalizarTexto(p.nombre).includes("oleo") ||
                    normalizarTexto(p.descripcion).includes("oleo")
                );
                renderizarProductos(filtrados);
                return;
            }

            // 4. Acuarela y Papel
            if (textoBoton.includes("acuarela")) {
                const filtrados = catalogo.filter(p => 
                    normalizarTexto(p.categoria).includes("acuarela") || 
                    normalizarTexto(p.tecnica).includes("acuarela") ||
                    normalizarTexto(p.nombre).includes("acuarela") ||
                    normalizarTexto(p.descripcion).includes("acuarela")
                );
                renderizarProductos(filtrados);
                return;
            }

            // 5. Fotografía de Autor
            if (textoBoton.includes("fotografia")) {
                const filtrados = catalogo.filter(p => 
                    normalizarTexto(p.categoria).includes("fotografia") || 
                    normalizarTexto(p.tecnica).includes("fotografia") ||
                    normalizarTexto(p.nombre).includes("fotografia") ||
                    normalizarTexto(p.descripcion).includes("fotografia")
                );
                renderizarProductos(filtrados);
                return;
            }

            // 6. Menos de $50.000
            if (textoBoton.includes("menos de $50.000") || textoBoton.includes("50000")) {
                const filtrados = catalogo.filter(p => {
                    const precioNumerico = typeof p.precio === "string" ? parseInt(p.precio.replace(/\D/g, ""), 10) : p.precio;
                    return precioNumerico < 50000;
                });
                renderizarProductos(filtrados);
                return;
            }

            // 7. Obras Disponibles (stock > 0)
            if (textoBoton.includes("obras disponibles")) {
                const filtrados = catalogo.filter(p => (parseInt(p.stock, 10) || 0) > 0);
                renderizarProductos(filtrados);
                return;
            }
        });
    });

    // Filtro por Input: solo funciona al pulsar el botón "BUSCAR"
    if (btnBuscar && inputBusqueda) {
        btnBuscar.addEventListener("click", function () {
            const termino = normalizarTexto(inputBusqueda.value);

            if (termino === "") {
                renderizarProductos(catalogo);
                return;
            }

            // Desactivar botones laterales al usar la barra de texto
            itemsMenu.forEach(item => item.classList.remove("activo"));

            const resultados = catalogo.filter(prod => {
                const nombre = normalizarTexto(prod.nombre);
                const categoria = normalizarTexto(prod.categoria);
                const descripcion = normalizarTexto(prod.descripcion);
                const artista = normalizarTexto(prod.artista);
                const tecnica = normalizarTexto(prod.tecnica);

                return nombre.includes(termino) ||
                       categoria.includes(termino) ||
                       descripcion.includes(termino) ||
                       artista.includes(termino) ||
                       tecnica.includes(termino);
            });

            renderizarProductos(resultados);
        });
    }

    // Carga inicial mostrando todas las obras
    renderizarProductos(catalogo);
});

