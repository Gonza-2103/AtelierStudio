document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector(".campos_registro");

    // Elementos de entrada
    const inputRun = document.getElementById("run");
    const inputNombre = document.getElementById("nombre");
    const inputApellidos = document.getElementById("apellidos");
    const inputCorreo = document.getElementById("correo");
    const inputContrasena = document.getElementById("contrasena");
    const inputConfirmar = document.getElementById("confirmarContrasena");
    const inputTelefono = document.getElementById("telefono");
    const selectRegion = document.getElementById("region");
    const selectComuna = document.getElementById("comuna");
    const inputDireccion = document.getElementById("direccion");

    // Contenedores de mensajes de error
    const errorRun = document.querySelector(".errorRun");
    const errorNombre = document.querySelector(".errorNombre");
    const errorApellidos = document.querySelector(".errorApellidos");
    const errorCorreo = document.querySelector(".errorCorreo");
    const errorContrasena = document.querySelector(".errorContrasena");
    const errorConfirmar = document.querySelector(".errorConfirmarContrasena");
    const errorTelefono = document.querySelector(".errorTelefono");
    const errorRegion = document.querySelector(".errorRegion");
    const errorComuna = document.querySelector(".errorComuna");
    const errorDireccion = document.querySelector(".errorDireccion");


    // ==========================================
    // CARGA DE REGIONES Y COMUNAS
    // ==========================================

    if (typeof regionesYComunas !== "undefined" && selectRegion && selectComuna) {
        // Cargar las opciones en el selector de regiones
        regionesYComunas.forEach(item => {
            const opcion = document.createElement("option");
            opcion.value = item.region;
            opcion.textContent = item.region;
            selectRegion.appendChild(opcion);
        });

        // Actualizar comunas cuando cambia la región
        selectRegion.addEventListener("change", function () {
            selectComuna.innerHTML = '<option value="">Seleccione una comuna</option>';

            const regionSeleccionada = selectRegion.value;
            const dataRegion = regionesYComunas.find(item => item.region === regionSeleccionada);

            if (dataRegion && dataRegion.comunas) {
                dataRegion.comunas.forEach(comuna => {
                    const opcion = document.createElement("option");
                    opcion.value = comuna;
                    opcion.textContent = comuna;
                    selectComuna.appendChild(opcion);
                });
            }
        });
    }


    // ==========================================
    // VALIDACIÓN DEL FORMULARIO
    // ==========================================

    function limpiarErrores() {
        const errores = form.querySelectorAll("small[class^='error']");
        errores.forEach(err => {
            err.textContent = "";
            err.style.color = "#d00000";
            err.style.display = "block";
        });
    }

    form.addEventListener("submit", function (evento) {
        evento.preventDefault();
        limpiarErrores();

        const runVal = inputRun.value.trim();
        const nombreVal = inputNombre.value.trim();
        const apellidosVal = inputApellidos.value.trim();
        const correoVal = inputCorreo.value.trim();
        const claveVal = inputContrasena.value;
        const confirmarVal = inputConfirmar.value;
        const regionVal = selectRegion.value;
        const comunaVal = selectComuna.value;
        const direccionVal = inputDireccion.value.trim();
        const telefonoVal = inputTelefono.value.trim();

        // CONDICIÓN 1: Todos los campos están vacíos
        if (
            runVal === "" &&
            nombreVal === "" &&
            apellidosVal === "" &&
            correoVal === "" &&
            claveVal === "" &&
            confirmarVal === "" &&
            regionVal === "" &&
            comunaVal === "" &&
            direccionVal === "" &&
            telefonoVal === ""
        ) {
            alert("No es posible registrar: todos los campos están vacíos.");
            return;
        }

        // CONDICIÓN 2: Algún campo obligatorio está vacío
        if (
            runVal === "" ||
            nombreVal === "" ||
            apellidosVal === "" ||
            correoVal === "" ||
            claveVal === "" ||
            confirmarVal === "" ||
            regionVal === "" ||
            comunaVal === "" ||
            direccionVal === ""
        ) {
            alert("Debe completar todos los campos obligatorios (*) antes de registrar.");
            return;
        }

        // CONDICIÓN 3: Las contraseñas no son iguales (AÑADIDO)
        if (claveVal !== confirmarVal) {
            errorConfirmar.textContent = "Las contraseñas ingresadas no coinciden.";
            alert("No es posible registrar: las contraseñas no coinciden.");
            return;
        }

        let formularioValido = true;

        // Validación específica: RUT (entre 7 y 9 caracteres, sin puntos ni guión)
        const regexRut = /^[0-9]{6,8}[0-9kK]$/;
        if (runVal === "") {
            errorRun.textContent = "El RUT es obligatorio.";
            formularioValido = false;
        } else if (!regexRut.test(runVal) || runVal.length < 7 || runVal.length > 9) {
            errorRun.textContent = "RUT inválido. Debe tener entre 7 y 9 caracteres sin puntos ni guión (ej: 19011022K).";
            formularioValido = false;
        }

        // Validación específica: Nombre
        if (nombreVal === "") {
            errorNombre.textContent = "El nombre es obligatorio.";
            formularioValido = false;
        }

        // Validación específica: Apellidos
        if (apellidosVal === "") {
            errorApellidos.textContent = "Los apellidos son obligatorios.";
            formularioValido = false;
        }

        // Validación específica: Correo electrónico (@duoc.cl, @profesor.duoc.cl, @gmail.com)
        const dominiosPermitidos = ["@duoc.cl", "@profesor.duoc.cl", "@gmail.com"];
        const dominioValido = dominiosPermitidos.some(d => correoVal.toLowerCase().endsWith(d));

        if (correoVal === "") {
            errorCorreo.textContent = "El correo electrónico es obligatorio.";
            formularioValido = false;
        } else if (!dominioValido) {
            errorCorreo.textContent = "Solo se permiten dominios: @duoc.cl, @profesor.duoc.cl y @gmail.com.";
            formularioValido = false;
        }

        // Validación específica: Contraseña (8 a 10 caracteres)
        if (claveVal === "") {
            errorContrasena.textContent = "La contraseña es obligatoria.";
            formularioValido = false;
        } else if (claveVal.length < 8 || claveVal.length > 10) {
            errorContrasena.textContent = "La contraseña debe contener entre 8 y 10 caracteres.";
            formularioValido = false;
        }

        // Validación específica: Confirmación de contraseña
        if (confirmarVal === "") {
            errorConfirmar.textContent = "Debe confirmar su contraseña.";
            formularioValido = false;
        } else if (confirmarVal !== claveVal) {
            errorConfirmar.textContent = "Las contraseñas ingresadas no coinciden.";
            formularioValido = false;
        }

        // Validación específica: Teléfono (opcional, pero si tiene datos debe tener 9 dígitos)
        if (telefonoVal !== "" && !/^[0-9]{9}$/.test(telefonoVal)) {
            errorTelefono.textContent = "El teléfono debe contener 9 dígitos numéricos (ej: 912345678).";
            formularioValido = false;
        }

        // Validación específica: Región y Comuna
        if (regionVal === "") {
            errorRegion.textContent = "Debe seleccionar una región.";
            formularioValido = false;
        }

        if (comunaVal === "") {
            errorComuna.textContent = "Debe seleccionar una comuna.";
            formularioValido = false;
        }

        // Validación específica: Dirección
        if (direccionVal === "") {
            errorDireccion.textContent = "La dirección es obligatoria.";
            formularioValido = false;
        }

        // Si cumple todas las reglas, se procede con el registro
        if (formularioValido) {
            alert("¡Usuario registrado con exito!");
            window.location.href = "login.html";
        }
    });
});

