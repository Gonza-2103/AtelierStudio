// Recuperar el usuario seleccionado

const usuarioSeleccionado =
    JSON.parse(
        localStorage.getItem(
            "usuarioSeleccionadoAdmin"
        )
    );


// Capturar los elementos del HTML

const detalleRun =
    document.getElementById("detalleRun");

const detalleNombre =
    document.getElementById("detalleNombre");

const detalleApellidos =
    document.getElementById("detalleApellidos");

const detalleCorreo =
    document.getElementById("detalleCorreo");

const detalleTelefono =
    document.getElementById("detalleTelefono");

const detalleFechaNacimiento =
    document.getElementById(
        "detalleFechaNacimiento"
    );

const detalleTipoUsuario =
    document.getElementById(
        "detalleTipoUsuario"
    );

const detalleRegion =
    document.getElementById("detalleRegion");

const detalleComuna =
    document.getElementById("detalleComuna");

const detalleDireccion =
    document.getElementById("detalleDireccion");

const botonEditar =
    document.getElementById(
        "btnEditarUsuarioDetalle"
    );


// Mostrar la información del usuario

if (usuarioSeleccionado !== null) {
    detalleRun.textContent =
        usuarioSeleccionado.run;

    detalleNombre.textContent =
        usuarioSeleccionado.nombre;

    detalleApellidos.textContent =
        usuarioSeleccionado.apellidos;

    detalleCorreo.textContent =
        usuarioSeleccionado.correo;

    detalleTelefono.textContent =
        usuarioSeleccionado.telefono || "No ingresado";

    detalleFechaNacimiento.textContent =
        usuarioSeleccionado.fechaNacimiento ||
        "No ingresada";

    detalleTipoUsuario.textContent =
        usuarioSeleccionado.tipoUsuario;

    detalleRegion.textContent =
        usuarioSeleccionado.region;

    detalleComuna.textContent =
        usuarioSeleccionado.comuna;

    detalleDireccion.textContent =
        usuarioSeleccionado.direccion;

} else {
    alert(
        "No se encontró un usuario seleccionado."
    );

    window.location.href =
        "usuarios_admin.html";
}


// Abrir el formulario de edición

botonEditar.addEventListener(
    "click",
    function () {
        localStorage.setItem(
            "usuarioEditarId",
            usuarioSeleccionado.id
        );

        window.location.href =
            "usuario_formulario.html";
    }
);