
// Captura de datos de html
const formulario = document.getElementById("formRegistro");
const inputRun = document.getElementById("run");
const inputNombre = document.getElementById("nombre");
const inputApellidos = document.getElementById("apellidos");
const inputCorreo = document.getElementById("correo");
const inputFechaNacimiento = document.getElementById("fechaNacimiento");
const selectRegion = document.getElementById("region");
const selectComuna = document.getElementById("comuna");
const inputDireccion = document.getElementById("direccion");

// Captura de las etiquetas <small> para mostrar errores en pantalla
const errorRun = document.getElementById("errorRun");
const errorNombre = document.getElementById("errorNombre");
const errorApellidos = document.getElementById("errorApellidos");
const errorCorreo = document.getElementById("errorCorreo");
const errorRegion = document.getElementById("errorRegion");
const errorComuna = document.getElementById("errorComuna");
const errorDireccion = document.getElementById("errorDireccion");

//Cargar regiones y comunas
for (let i = 0; i < regionesYComunas.length; i++) {
    const opcionRegion = document.createElement("option");
    opcionRegion.value = regionesYComunas[i].region;
    opcionRegion.textContent = regionesYComunas[i].region;
    selectRegion.appendChild(opcionRegion);
}

// Evento para actualizar las comunas según la región seleccionada
selectRegion.addEventListener("change", function () {
    const regionSeleccionada = selectRegion.value;

    // Limpiar las opciones de comunas
    selectComuna.innerHTML = '<option value="">Seleccione una Comuna</option>';

    if(regionSeleccionada !== "") {
        // Buscar la región seleccionada en el arreglo
       for (let i = 0; i < regionesYComunas.length; i++) {
            if (regionesYComunas[i].region === regionSeleccionada) {
                const listaComunas = regionesYComunas[i].comunas;

                // Llenar el select con las comunas correspondientes
                for (let j = 0; j < listaComunas.length; j++) {
                    const opcionComuna = document.createElement("option");
                    opcionComuna.value = listaComunas[j];
                    opcionComuna.textContent = listaComunas[j];
                    selectComuna.appendChild(opcionComuna);
                }
            }
        }
    }
});

// Evento para validar el formulario al enviarlo
formulario.addEventListener("submit", function (event) {
    event.preventDefault(); // Evitar el envío del formulario por defecto
    
    // Capturar los valores de los campos
    const run = inputRun.value.trim();
    const nombre = inputNombre.value.trim();
    const apellidos = inputApellidos.value.trim();
    const correo = inputCorreo.value.trim().toLowerCase();
    const fechaNacimiento = inputFechaNacimiento.value;
    const region = selectRegion.value;
    const comuna = selectComuna.value;
    const direccion = inputDireccion.value.trim();


    // Variable para verificar si todo está correcto
    let registroValido = true;
    console.log("Validando registro de usuario...");

    //Validar RUN (Requerido, sin puntos ni guion, entre 7 y 9 caracteres)
    const formatoRunValido = /^[0-9]{6,8}[0-9Kk]$/.test(run);

    if (!formatoRunValido) {
        errorRun.innerHTML = "El RUN debe contener solo números y terminar en un número o K, sin puntos ni guion.";
        console.log("Error en RUN: Formato inválido.");
        registroValido = false;
    } else {
        errorRun.innerHTML = "";
        console.log("RUN válido: " + run);
    }

// Validar Nombre (Requerido, máximo 50 caracteres)
    if (nombre.trim() === "" || nombre.length > 50) {
        errorNombre.innerHTML = "El nombre es requerido y no puede superar los 50 caracteres.";
        console.log("Error en Nombre: Es requerido y no puede superar los 50 caracteres.");
        registroValido = false;
    } else {
        errorNombre.innerHTML = "";
        console.log("Nombre válido: " + nombre);
    }

    // Validar Apellidos (Requeridos, máximo 100 caracteres)
    if (apellidos.trim() === "" || apellidos.length > 100) {
        errorApellidos.innerHTML = "Los apellidos son requeridos y no pueden superar los 100 caracteres.";
        console.log("Error en Apellidos: Son requeridos y no pueden superar los 100 caracteres.");
        registroValido = false;
    } else {
        errorApellidos.innerHTML = "";
        console.log("Apellidos válidos: " + apellidos);
    }

    // Validar Correo (Requerido, máximo 100 caracteres y dominios permitidos)
    const esDominioValido = correo.endsWith("@duocuc.cl") || correo.endsWith("@profesor.duocuc.cl") || correo.endsWith("@gmail.com");

    if (correo === "") {
        errorCorreo.innerHTML = "El correo es requerido.";
        console.log("Error en Correo: El correo es requerido.");
        registroValido = false;
    } else if (correo.length > 100) {
        errorCorreo.innerHTML = "El correo no puede superar los 100 caracteres.";
        console.log("Error en Correo: No puede superar los 100 caracteres.");
        registroValido = false;
    } else if (!esDominioValido) {
        errorCorreo.innerHTML = "El correo debe ser @duocuc.cl, @profesor.duocuc.cl o @gmail.com.";
        console.log("Error en Correo: Debe ser @duocuc.cl, @profesor.duocuc.cl o @gmail.com.");
        registroValido = false;
    } else {
        errorCorreo.innerHTML = "";
        console.log("Correo válido: " + correo);
    }

    // Validar Fecha de Nacimiento (Opcional)
    if (fechaNacimiento === "") {
        console.log("Fecha de nacimiento: No ingresada (opcional).");
    } else {
        console.log("Fecha de nacimiento ingresada: " + fechaNacimiento);
    }

    //Validar Región (Requerido)
    if (region === "") {
        errorRegion.innerHTML = "Debe seleccionar una región de la lista.";
        console.log("Error en Región: Debe seleccionar una región de la lista.");
        registroValido = false;
    } else {
        errorRegion.innerHTML = "";
        console.log("Región seleccionada: " + region);
    }

    //Validar Comuna (Requerido)
    if (comuna === "") {
        errorComuna.innerHTML = "Debe seleccionar una comuna de la lista.";
        console.log("Error en Comuna: Debe seleccionar una comuna de la lista.");
        registroValido = false;
    } else {
        errorComuna.innerHTML = "";
        console.log("Comuna seleccionada: " + comuna);
    }

    // Validar Dirección (Requerida, máximo 300 caracteres)
    if (direccion.trim() === "" || direccion.length > 300) {
        errorDireccion.innerHTML = "La dirección es requerida y no puede superar los 300 caracteres.";
        console.log("Error en Dirección: Es requerida y no puede superar los 300 caracteres.");
        registroValido = false;
    } else {
        errorDireccion.innerHTML = "";
        console.log("Dirección válida: " + direccion);
    }


    console.log("---------------------------------------");
    if (registroValido) {
        console.log("ESTADO: Registro completado con éxito.");
        alert("Registro completado con éxito. Redirigiendo a la página de inicio de sesión...");

        // JavaScript realiza la navegación tras validar con éxito:
        window.location.href = "login.html";

    } else {
         //Nombres de los campos que quedaron con mensaje de error
        let camposConError = [];
        if (errorRun.innerHTML !== "") camposConError.push("- RUN");
        if (errorNombre.innerHTML !== "") camposConError.push("- Nombre");
        if (errorApellidos.innerHTML !== "") camposConError.push("- Apellidos");
        if (errorCorreo.innerHTML !== "") camposConError.push("- Correo");
        if (errorRegion.innerHTML !== "") camposConError.push("- Región");
        if (errorComuna.innerHTML !== "") camposConError.push("- Comuna");
        if (errorDireccion.innerHTML !== "") camposConError.push("- Dirección");

        // Se señala lo que se debe corregir en el formulario
        alert("Registro rechazado. Revisa y corrige los siguientes campos:\n\n" + camposConError.join("\n"));
        console.log("ESTADO: Registro rechazado por datos inválidos.");
        
    }

   

});