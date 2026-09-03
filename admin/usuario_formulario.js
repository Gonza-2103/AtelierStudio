// Capturar los elementos del formulario

const formularioUsuario =
    document.getElementById("formUsuario");

const inputRun =
    document.getElementById("run");

const inputNombre =
    document.getElementById("nombre");

const inputApellidos =
    document.getElementById("apellidos");

const inputCorreo =
    document.getElementById("correo");

const inputContrasena =
    document.getElementById("contrasena");

const inputConfirmarContrasena =
    document.getElementById("confirmarContrasena");

const inputTelefono =
    document.getElementById("telefono");

const inputFechaNacimiento =
    document.getElementById("fechaNacimiento");

const selectTipoUsuario =
    document.getElementById("tipoUsuario");

const selectRegion =
    document.getElementById("region");

const selectComuna =
    document.getElementById("comuna");

const inputDireccion =
    document.getElementById("direccion");

const tituloFormulario =
    document.getElementById("tituloFormularioUsuario");

const botonGuardar =
    document.getElementById("btnGuardarUsuario");


// Recuperar los usuarios guardados

let usuarios =
    JSON.parse(localStorage.getItem("usuarios")) || [];


// Revisar cómo se abrió el formulario

const parametros =
    new URLSearchParams(window.location.search);

const modoNuevo =
    parametros.get("modo") === "nuevo";


// Preparar las variables para la edición

let usuarioEditarId = null;
let usuarioEditado = null;


// Cargar las regiones desde regiones.js

function cargarRegiones() {
    for (let i = 0; i < regionesYComunas.length; i++) {
        const opcionRegion =
            document.createElement("option");

        opcionRegion.value =
            regionesYComunas[i].region;

        opcionRegion.textContent =
            regionesYComunas[i].region;

        selectRegion.appendChild(opcionRegion);
    }
}


// Cargar las comunas correspondientes a una región

function cargarComunas(regionSeleccionada) {
    selectComuna.innerHTML =
        '<option value="">Seleccione una comuna</option>';

    if (regionSeleccionada === "") {
        return;
    }

    for (let i = 0; i < regionesYComunas.length; i++) {
        if (
            regionesYComunas[i].region ===
            regionSeleccionada
        ) {
            const comunas =
                regionesYComunas[i].comunas;

            for (let j = 0; j < comunas.length; j++) {
                const opcionComuna =
                    document.createElement("option");

                opcionComuna.value = comunas[j];
                opcionComuna.textContent = comunas[j];

                selectComuna.appendChild(
                    opcionComuna
                );
            }

            break;
        }
    }
}


// Actualizar las comunas al cambiar la región

selectRegion.addEventListener(
    "change",
    function () {
        cargarComunas(selectRegion.value);
    }
);


// Cargar las regiones al abrir el formulario

cargarRegiones();


// Preparar el formulario según la opción seleccionada

if (modoNuevo) {
    localStorage.removeItem("usuarioEditarId");

    tituloFormulario.innerHTML =
        "Nuevo usuario";

    botonGuardar.innerHTML =
        "GUARDAR USUARIO";

    formularioUsuario.reset();

} else {
    usuarioEditarId =
        localStorage.getItem("usuarioEditarId");

    if (usuarioEditarId !== null) {
        const idUsuario =
            Number(usuarioEditarId);

        for (let i = 0; i < usuarios.length; i++) {
            if (usuarios[i].id === idUsuario) {
                usuarioEditado = usuarios[i];
                break;
            }
        }
    }


    // Mostrar los datos del usuario seleccionado

    if (usuarioEditado !== null) {
        tituloFormulario.innerHTML =
            "Editar usuario";

        botonGuardar.innerHTML =
            "GUARDAR CAMBIOS";

        inputRun.value =
            usuarioEditado.run;

        inputNombre.value =
            usuarioEditado.nombre;

        inputApellidos.value =
            usuarioEditado.apellidos;

        inputCorreo.value =
            usuarioEditado.correo;

        inputContrasena.value =
            usuarioEditado.contrasena;

        inputConfirmarContrasena.value =
            usuarioEditado.contrasena;

        inputTelefono.value =
            usuarioEditado.telefono;

        inputFechaNacimiento.value =
            usuarioEditado.fechaNacimiento;

        selectTipoUsuario.value =
            usuarioEditado.tipoUsuario;

        selectRegion.value =
            usuarioEditado.region;

        cargarComunas(
            usuarioEditado.region
        );

        selectComuna.value =
            usuarioEditado.comuna;

        inputDireccion.value =
            usuarioEditado.direccion;

    } else {
        tituloFormulario.innerHTML =
            "Nuevo usuario";

        botonGuardar.innerHTML =
            "GUARDAR USUARIO";

        formularioUsuario.reset();
    }

}

    // Capturar las etiquetas de error

const errorRun =
    document.getElementById("errorRun");

const errorNombre =
    document.getElementById("errorNombre");

const errorApellidos =
    document.getElementById("errorApellidos");

const errorCorreo =
    document.getElementById("errorCorreo");

const errorContrasena =
    document.getElementById("errorContrasena");

const errorConfirmarContrasena =
    document.getElementById(
        "errorConfirmarContrasena"
    );

const errorTelefono =
    document.getElementById("errorTelefono");

const errorTipoUsuario =
    document.getElementById("errorTipoUsuario");

const errorRegion =
    document.getElementById("errorRegion");

const errorComuna =
    document.getElementById("errorComuna");

const errorDireccion =
    document.getElementById("errorDireccion");


// Validar el dígito verificador del RUN

function runChilenoValido(run) {
    const runLimpio =
        run.trim().toUpperCase();

    const formatoValido =
        /^[0-9]{6,8}[0-9K]$/.test(runLimpio);

    if (!formatoValido) {
        return false;
    }

    const cuerpo =
        runLimpio.slice(0, -1);

    const digitoIngresado =
        runLimpio.slice(-1);

    let suma = 0;
    let multiplicador = 2;

    for (let i = cuerpo.length - 1; i >= 0; i--) {
        suma +=
            Number(cuerpo[i]) * multiplicador;

        multiplicador++;

        if (multiplicador === 8) {
            multiplicador = 2;
        }
    }

    const resultado =
        11 - (suma % 11);

    let digitoCalculado;

    if (resultado === 11) {
        digitoCalculado = "0";
    } else if (resultado === 10) {
        digitoCalculado = "K";
    } else {
        digitoCalculado =
            String(resultado);
    }

    return digitoIngresado === digitoCalculado;
}


// Validar RUN

function validarRun() {
    const run =
        inputRun.value.trim().toUpperCase();

    if (run === "") {
        errorRun.innerHTML =
            "El RUN es obligatorio.";

        return false;
    }

    if (run.length < 7 || run.length > 9) {
        errorRun.innerHTML =
            "El RUN debe tener entre 7 y 9 caracteres.";

        return false;
    }

    if (!runChilenoValido(run)) {
        errorRun.innerHTML =
            "El RUN ingresado no es válido.";

        return false;
    }

    for (let i = 0; i < usuarios.length; i++) {
        const esElMismoUsuario =
            usuarioEditado !== null &&
            usuarios[i].id === usuarioEditado.id;

        if (
            usuarios[i].run.toUpperCase() === run &&
            !esElMismoUsuario
        ) {
            errorRun.innerHTML =
                "Ya existe un usuario con este RUN.";

            return false;
        }
    }

    errorRun.innerHTML = "";
    return true;
}


// Validar nombre

function validarNombre() {
    const nombre =
        inputNombre.value.trim();

    if (nombre === "") {
        errorNombre.innerHTML =
            "El nombre es obligatorio.";

        return false;
    }

    if (nombre.length > 50) {
        errorNombre.innerHTML =
            "El nombre no puede superar los 50 caracteres.";

        return false;
    }

    errorNombre.innerHTML = "";
    return true;
}


// Validar apellidos

function validarApellidos() {
    const apellidos =
        inputApellidos.value.trim();

    if (apellidos === "") {
        errorApellidos.innerHTML =
            "Los apellidos son obligatorios.";

        return false;
    }

    if (apellidos.length > 100) {
        errorApellidos.innerHTML =
            "Los apellidos no pueden superar los 100 caracteres.";

        return false;
    }

    errorApellidos.innerHTML = "";
    return true;
}


// Validar correo electrónico

function validarCorreo() {
    const correo =
        inputCorreo.value.trim().toLowerCase();

    const formatoCorreoValido =
        /^[^\s@]+@(duocuc\.cl|profesor\.duocuc\.cl|gmail\.com)$/.test(
            correo
        );

    if (correo === "") {
        errorCorreo.innerHTML =
            "El correo es obligatorio.";

        return false;
    }

    if (correo.length > 100) {
        errorCorreo.innerHTML =
            "El correo no puede superar los 100 caracteres.";

        return false;
    }

    if (!formatoCorreoValido) {
        errorCorreo.innerHTML =
            "El correo debe ser @duocuc.cl, " +
            "@profesor.duocuc.cl o @gmail.com.";

        return false;
    }

    for (let i = 0; i < usuarios.length; i++) {
        const esElMismoUsuario =
            usuarioEditado !== null &&
            usuarios[i].id === usuarioEditado.id;

        if (
            usuarios[i].correo.toLowerCase() === correo &&
            !esElMismoUsuario
        ) {
            errorCorreo.innerHTML =
                "Ya existe un usuario con este correo.";

            return false;
        }
    }

    errorCorreo.innerHTML = "";
    return true;
}


// Validar contraseña

function validarContrasena() {
    const contrasena =
        inputContrasena.value;

    if (
        contrasena.length < 4 ||
        contrasena.length > 10
    ) {
        errorContrasena.innerHTML =
            "La contraseña debe tener entre 4 y 10 caracteres.";

        return false;
    }

    errorContrasena.innerHTML = "";
    return true;
}


// Validar confirmación de contraseña

function validarConfirmacion() {
    const contrasena =
        inputContrasena.value;

    const confirmacion =
        inputConfirmarContrasena.value;

    if (confirmacion === "") {
        errorConfirmarContrasena.innerHTML =
            "Debe confirmar la contraseña.";

        return false;
    }

    if (confirmacion !== contrasena) {
        errorConfirmarContrasena.innerHTML =
            "Las contraseñas no coinciden.";

        return false;
    }

    errorConfirmarContrasena.innerHTML = "";
    return true;
}


// Validar teléfono opcional

function validarTelefono() {
    const telefono =
        inputTelefono.value.trim();

    if (telefono === "") {
        errorTelefono.innerHTML = "";
        return true;
    }

    if (!/^[0-9]{9}$/.test(telefono)) {
        errorTelefono.innerHTML =
            "El teléfono debe contener 9 números.";

        return false;
    }

    errorTelefono.innerHTML = "";
    return true;
}


// Validar tipo de usuario

function validarTipoUsuario() {
    const tipoUsuario =
        selectTipoUsuario.value;

    if (
        tipoUsuario !== "Administrador" &&
        tipoUsuario !== "Cliente" &&
        tipoUsuario !== "Vendedor"
    ) {
        errorTipoUsuario.innerHTML =
            "Debe seleccionar un tipo de usuario.";

        return false;
    }

    errorTipoUsuario.innerHTML = "";
    return true;
}


// Validar región

function validarRegion() {
    if (selectRegion.value === "") {
        errorRegion.innerHTML =
            "Debe seleccionar una región.";

        return false;
    }

    errorRegion.innerHTML = "";
    return true;
}


// Validar comuna

function validarComuna() {
    if (selectComuna.value === "") {
        errorComuna.innerHTML =
            "Debe seleccionar una comuna.";

        return false;
    }

    errorComuna.innerHTML = "";
    return true;
}


// Validar dirección

function validarDireccion() {
    const direccion =
        inputDireccion.value.trim();

    if (direccion === "") {
        errorDireccion.innerHTML =
            "La dirección es obligatoria.";

        return false;
    }

    if (direccion.length > 300) {
        errorDireccion.innerHTML =
            "La dirección no puede superar los 300 caracteres.";

        return false;
    }

    errorDireccion.innerHTML = "";
    return true;
}


// Validaciones en tiempo real

inputRun.addEventListener("input", validarRun);
inputNombre.addEventListener("input", validarNombre);
inputApellidos.addEventListener("input", validarApellidos);
inputCorreo.addEventListener("input", validarCorreo);

inputContrasena.addEventListener(
    "input",
    function () {
        validarContrasena();

        if (
            inputConfirmarContrasena.value !== ""
        ) {
            validarConfirmacion();
        }
    }
);

inputConfirmarContrasena.addEventListener(
    "input",
    validarConfirmacion
);

inputTelefono.addEventListener(
    "input",
    validarTelefono
);

selectTipoUsuario.addEventListener(
    "change",
    validarTipoUsuario
);

selectRegion.addEventListener(
    "change",
    function () {
        validarRegion();
        validarComuna();
    }
);

selectComuna.addEventListener(
    "change",
    validarComuna
);

inputDireccion.addEventListener(
    "input",
    validarDireccion
);


// Validar y guardar el formulario

formularioUsuario.addEventListener(
    "submit",
    function (event) {
        event.preventDefault();

        let formularioValido = true;

        if (!validarRun()) {
            formularioValido = false;
        }

        if (!validarNombre()) {
            formularioValido = false;
        }

        if (!validarApellidos()) {
            formularioValido = false;
        }

        if (!validarCorreo()) {
            formularioValido = false;
        }

        if (!validarContrasena()) {
            formularioValido = false;
        }

        if (!validarConfirmacion()) {
            formularioValido = false;
        }

        if (!validarTelefono()) {
            formularioValido = false;
        }

        if (!validarTipoUsuario()) {
            formularioValido = false;
        }

        if (!validarRegion()) {
            formularioValido = false;
        }

        if (!validarComuna()) {
            formularioValido = false;
        }

        if (!validarDireccion()) {
            formularioValido = false;
        }


        if (!formularioValido) {
            alert(
                "No se pudo guardar el usuario. " +
                "Revise los campos indicados."
            );

            console.log(
                "ESTADO: Usuario rechazado por datos inválidos."
            );

            return;
        }


        // Capturar los datos validados

        const run =
            inputRun.value.trim().toUpperCase();

        const nombre =
            inputNombre.value.trim();

        const apellidos =
            inputApellidos.value.trim();

        const correo =
            inputCorreo.value.trim().toLowerCase();

        const contrasena =
            inputContrasena.value;

        const telefono =
            inputTelefono.value.trim();

        const fechaNacimiento =
            inputFechaNacimiento.value;

        const tipoUsuario =
            selectTipoUsuario.value;

        const region =
            selectRegion.value;

        const comuna =
            selectComuna.value;

        const direccion =
            inputDireccion.value.trim();


        // Actualizar un usuario existente

        if (
            usuarioEditado !== null &&
            !modoNuevo
        ) {
            usuarioEditado.run = run;
            usuarioEditado.nombre = nombre;
            usuarioEditado.apellidos = apellidos;
            usuarioEditado.correo = correo;
            usuarioEditado.contrasena = contrasena;
            usuarioEditado.telefono = telefono;
            usuarioEditado.fechaNacimiento =
                fechaNacimiento;

            usuarioEditado.tipoUsuario =
                tipoUsuario;

            usuarioEditado.region = region;
            usuarioEditado.comuna = comuna;
            usuarioEditado.direccion = direccion;

            alert(
                "Usuario actualizado correctamente."
            );

            console.log(
                "Usuario actualizado: " + correo
            );

        } else {
            // Buscar el próximo identificador

            let nuevoId = 1;

            for (let i = 0; i < usuarios.length; i++) {
                if (usuarios[i].id >= nuevoId) {
                    nuevoId =
                        usuarios[i].id + 1;
                }
            }


            // Crear un usuario nuevo

            const nuevoUsuario = {
                id: nuevoId,
                run: run,
                nombre: nombre,
                apellidos: apellidos,
                correo: correo,
                contrasena: contrasena,
                telefono: telefono,
                fechaNacimiento: fechaNacimiento,
                tipoUsuario: tipoUsuario,
                region: region,
                comuna: comuna,
                direccion: direccion
            };

            usuarios.push(nuevoUsuario);

            alert(
                "Usuario creado correctamente."
            );

            console.log(
                "Usuario creado: " + correo
            );
        }


        // Guardar los usuarios actualizados

        localStorage.setItem(
            "usuarios",
            JSON.stringify(usuarios)
        );

        localStorage.removeItem(
            "usuarioEditarId"
        );

        window.location.href =
            "usuarios_admin.html";
    }
);

