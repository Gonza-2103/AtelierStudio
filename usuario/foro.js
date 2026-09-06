document.addEventListener("DOMContentLoaded", function () {
    const inputTitulo = document.getElementById("titulo_tema");
    const selectCategoria = document.getElementById("categoria_tema");
    const textareaMensaje = document.getElementById("mensaje_tema");
    const btnPublicar = document.querySelector(".btn_publicar_foro");
    const seccionDebates = document.querySelector(".lista_temas_foro");

    // OBTENER PERFIL ACTIVO DE localStorage (O USUARIO REGISTRADO)
    const usuarioActivo = JSON.parse(localStorage.getItem("usuarioRegistrado")) ||
                          JSON.parse(localStorage.getItem("usuarioActivo")) || null;

    let nombreAutor = "Gonzalo H.";
    let fotoAutor = "../imagenes/gonza.jpg";

    if (usuarioActivo) {
        const nombre = usuarioActivo.nombre ? usuarioActivo.nombre.trim() : "";
        const apellidos = usuarioActivo.apellidos ? usuarioActivo.apellidos.trim() : "";
        const inicialApellido = apellidos.length > 0 ? `${apellidos.charAt(0)}.` : "";

        nombreAutor = nombre ? `${nombre} ${inicialApellido}`.trim() : "Usuario";
        fotoAutor = usuarioActivo.foto || "../imagenes/atelierstudiologo.png";
    }

    // DICCIONARIO DE CATEGORÍAS VISIBLES
    const nombresCategorias = {
        tecnicas: "Técnicas y Materiales",
        recomendaciones: "Recomendación de Obras",
        criticas: "Crítica y Apreciación Visual",
        eventos: "Talleres y Galerías"
    };

    // FUNCIÓN PARA CONTAR PALABRAS IGNORANDO TILDES, SIGNOS DE PUNTUACIÓN Y MAYÚSCULAS
    function contarPalabrasNormalizadas(texto) {
        if (!texto) return 0;
        const textoLimpio = texto
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "") // Remueve tildes
            .replace(/[.,;:¿?¡!'"\-_()[\]{}]/g, " ") // Remueve signos de puntuación
            .replace(/\s+/g, " ") // Colapsa espacios múltiples
            .trim();

        if (textoLimpio === "") return 0;
        return textoLimpio.split(" ").length;
    }

    // CARGAR DEBATES ALMACENADOS O INICIALIZAR CON LOS DEBATES DE EJEMPLO
    let debates = JSON.parse(localStorage.getItem("debatesForo"));

    if (!debates || debates.length === 0) {
        debates = [
            {
                autor: "Geraldinne G.",
                foto: "../imagenes/geraldinne.jpg",
                titulo: "Conservación de acuarelas en climas húmedos",
                categoriaTexto: "Técnicas y Materiales",
                mensaje: "¿Qué tipo de fijador o paspartú recomiendan para obras expuestas cerca de la costa? He notado que el exceso de humedad marina altera el grano del papel si no se sella de inmediato.",
                fecha: "Publicado hace 2 horas • 8 respuestas",
                conteoPalabras: contarPalabrasNormalizadas("¿Qué tipo de fijador o paspartú recomiendan para obras expuestas cerca de la costa? He notado que el exceso de humedad marina altera el grano del papel si no se sella de inmediato.")
            },
            {
                autor: "Gonzalo H.",
                foto: "../imagenes/gonza.jpg",
                titulo: "Apreciación del claroscuro en retratos al óleo",
                categoriaTexto: "Crítica y Apreciación Visual",
                mensaje: "Totalmente recomendada la obra 'Caballero con Pipa'. La transición de sombras en la mirada del marinero transmite una calma reflexiva que difícilmente se logra en formatos digitales.",
                fecha: "Publicado hace 1 día • 14 respuestas",
                conteoPalabras: contarPalabrasNormalizadas("Totalmente recomendada la obra 'Caballero con Pipa'. La transición de sombras en la mirada del marinero transmite una calma reflexiva que difícilmente se logra en formatos digitales.")
            }
        ];
        localStorage.setItem("debatesForo", JSON.stringify(debates));
    }

    // MANTENCIÓN DE LA ESTRUCTURA DEL COMENTARIO POSTEADO
    function renderizarDebates() {

        // Eliminar tarjetas renderizadas previamente para no duplicar
        const tarjetasActuales = seccionDebates.querySelectorAll(".tarjeta_debate");
        tarjetasActuales.forEach(t => t.remove());

        debates.forEach(item => {
            const article = document.createElement("article");
            article.className = "tarjeta_debate";
            article.innerHTML = `
                <figure class="autor_debate">
                    <img src="${item.foto}" alt="Foto de ${item.autor}" onerror="this.src='../imagenes/atelierstudiologo.png'">
                    <figcaption><strong>${item.autor}</strong></figcaption>
                </figure>

                <div class="cuerpo_debate">
                    <h4>${item.titulo}</h4>
                    <span class="badge_categoria">${item.categoriaTexto}</span>
                    <p>${item.mensaje}</p>
                    <footer class="pie_debate">
                        <small>${item.fecha}</small>
                        <a href="#" class="enlace_responder">Responder &rarr;</a>
                    </footer>
                </div>
            `;
            seccionDebates.appendChild(article);
        });

        // Configurar estado temporal de "Responder"
        document.querySelectorAll(".enlace_responder").forEach(enlace => {
            enlace.addEventListener("click", function (evento) {
                evento.preventDefault();
                alert("El botón 'Responder' no está en funcionamiento hasta una nueva actualización de la página web.");
            });
        });
    }

    // PUBLICACIÓN DEL NUEVO TEMA
    if (btnPublicar) {
        btnPublicar.addEventListener("click", function () {
            const tituloVal = inputTitulo.value.trim();
            const catClave = selectCategoria.value;
            const mensajeVal = textareaMensaje.value.trim();

            // Validar campos vacíos
            if (tituloVal === "" || catClave === "" || mensajeVal === "") {
                alert("Debes completar el título, la categoría y el comentario antes de publicar.");
                return;
            }

            // Conteo de palabras sin tildes ni puntuaciones
            const cantidadPalabras = contarPalabrasNormalizadas(mensajeVal);

            // Validar si ya existe un comentario con exactamente la misma cantidad de palabras
            const cantidadDuplicada = debates.some(d => d.conteoPalabras === cantidadPalabras);

            if (cantidadDuplicada) {
                alert("No es posible publicar: Ya existe un comentario registrado con la misma cantidad de palabras. Modifica o amplía la extensión de tu opinión.");
                return;
            }

            // Generar nuevo tema
            const nuevoTema = {
                autor: nombreAutor,
                foto: fotoAutor,
                titulo: tituloVal,
                categoriaTexto: nombresCategorias[catClave] || "General",
                mensaje: mensajeVal,
                fecha: "Publicado hace un momento • 0 respuestas",
                conteoPalabras: cantidadPalabras
            };

            // Insertar arriba en la lista
            debates.unshift(nuevoTema);
            localStorage.setItem("debatesForo", JSON.stringify(debates));

            // Limpiar formulario y refrescar vista
            inputTitulo.value = "";
            selectCategoria.value = "";
            textareaMensaje.value = "";

            renderizarDebates();
            alert("¡Tu tema ha sido publicado en el foro!");
        });
    }

    // Carga inicial
    renderizarDebates();
});

