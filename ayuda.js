// Captura de datos de HTML

const formulario = document.getElementById("formAyuda");

const inputNombre = document.getElementById("nombreAyuda");

const inputCorreo = document.getElementById("correoAyuda");

const inputComentario = document.getElementById("comentarioAyuda");


// Captura de las etiquetas <small> para mostrar errores

const errorNombre = document.getElementById("errorNombreAyuda");

const errorCorreo = document.getElementById("errorCorreoAyuda");

const errorComentario = document.getElementById("errorComentarioAyuda");


// Evento para validar el formulario al enviarlo

formulario.addEventListener("submit", function (event) {

    // Evitar el envío automático del formulario

    event.preventDefault();


    // Capturar los valores de los campos

    const nombre = inputNombre.value.trim();

    const correo = inputCorreo.value.trim().toLowerCase();

    const comentario = inputComentario.value.trim();


    // Variable para verificar si el formulario es válido

    let formularioValido = true;

    console.log("Validando formulario de ayuda...");


    // Validar Nombre (Requerido, máximo 100 caracteres)

    console.log("Cantidad de caracteres del nombre: " + nombre.length);
    
    if (nombre === "") {

        errorNombre.innerHTML = "El nombre es obligatorio.";

        console.log("Error en Nombre: El campo está vacío.");

        formularioValido = false;

    } else if (nombre.length > 100) {

        errorNombre.innerHTML =
            "El nombre no puede superar los 100 caracteres.";

        console.log("Error en Nombre: Supera los 100 caracteres.");

        formularioValido = false;

    } else {

        errorNombre.innerHTML = "";

        console.log("Nombre válido: " + nombre);

    }


    // Validar Correo (Requerido, máximo 100 caracteres y dominios permitidos)

    const formatoCorreoValido =
        /^[^\s@]+@(duocuc\.cl|profesor\.duocuc\.cl|gmail\.com)$/.test(correo);


    if (correo === "") {

        errorCorreo.innerHTML = "El correo es obligatorio.";

        console.log("Error en Correo: El campo está vacío.");

        formularioValido = false;

    } else if (correo.length > 100) {

        errorCorreo.innerHTML =
            "El correo no puede superar los 100 caracteres.";

        console.log(
            "Error en Correo: Supera los 100 caracteres."
        );

        formularioValido = false;

    } else if (!formatoCorreoValido) {

        errorCorreo.innerHTML =
            "El correo debe ser @duocuc.cl, @profesor.duocuc.cl o @gmail.com.";

        console.log(
            "Error en Correo: El formato o dominio no está permitido."
        );

        formularioValido = false;

    } else {

        errorCorreo.innerHTML = "";

        console.log("Correo válido: " + correo);

    }


    // Validar Comentario (Requerido, máximo 500 caracteres)

    if (comentario === "") {

        errorComentario.innerHTML =
            "El comentario es obligatorio.";

        console.log("Error en Comentario: El campo está vacío.");

        formularioValido = false;

    } else if (comentario.length > 500) {

        errorComentario.innerHTML =
            "El comentario no puede superar los 500 caracteres.";

        console.log(
            "Error en Comentario: Supera los 500 caracteres."
        );

        formularioValido = false;

    } else {

        errorComentario.innerHTML = "";

        console.log("Comentario válido.");

    }


    console.log("---------------------------------------");


    // Revisar el resultado de las validaciones

    if (formularioValido) {

        console.log("ESTADO: Mensaje enviado correctamente.");

        alert("Tu mensaje fue enviado correctamente.");

        formulario.reset();

    } else {

        // Guardar los nombres de los campos con errores

        let camposConError = [];


        if (errorNombre.innerHTML !== "") {

            camposConError.push("- Nombre");

        }


        if (errorCorreo.innerHTML !== "") {

            camposConError.push("- Correo");

        }


        if (errorComentario.innerHTML !== "") {

            camposConError.push("- Comentario");

        }


        // Informar cuáles campos se deben corregir

        alert(
            "No se pudo enviar el mensaje. Revisa los siguientes campos:\n\n" +
            camposConError.join("\n")
        );

        console.log(
            "ESTADO: Mensaje rechazado por datos inválidos. Campos con errores: " +
            camposConError.join(", ")
        );

    }

});