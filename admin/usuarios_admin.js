// Usuarios iniciales del sistema

const usuariosIniciales = [

    {
        id: 1,
        run: "203456778",
        nombre: "Daniela",
        apellidos: "Muñoz González",
        correo: "daniela.munoz@duocuc.cl",
        contrasena: "admin123",
        telefono: "912345678",
        fechaNacimiento: "1992-04-15",
        tipoUsuario: "Administrador",
        region: "Región Metropolitana de Santiago",
        comuna: "Santiago",
        direccion: "Avenida Libertador Bernardo O'Higgins 1250"
    },

    {
        id: 2,
        run: "127894887",
        nombre: "Matías",
        apellidos: "Rojas Contreras",
        correo: "matias.rojas@gmail.com",
        contrasena: "venta123",
        telefono: "923456789",
        fechaNacimiento: "1997-09-23",
        tipoUsuario: "Vendedor",
        region: "Región de Valparaíso",
        comuna: "Viña del Mar",
        direccion: "Avenida Libertad 845"
    },

    {
        id: 3,
        run: "123456785",
        nombre: "Camila",
        apellidos: "Fernández Soto",
        correo: "camila.fernandez@gmail.com",
        contrasena: "cliente1",
        telefono: "934567890",
        fechaNacimiento: "2001-02-11",
        tipoUsuario: "Cliente",
        region: "Región de Los Lagos",
        comuna: "Puerto Montt",
        direccion: "Calle Antonio Varas 560"
    }

];


// Capturar elementos del HTML

const cuerpoTablaUsuarios =
    document.getElementById("cuerpoTablaUsuarios");

const mensajeSinUsuarios =
    document.getElementById("mensajeSinUsuarios");


// Recuperar los usuarios desde localStorage

let usuarios =
    JSON.parse(localStorage.getItem("usuarios"));


// Crear los usuarios iniciales solamente si aún no existen

if (usuarios === null) {
    usuarios = usuariosIniciales;
    guardarUsuarios();
}


// Guardar el arreglo de usuarios en localStorage

function guardarUsuarios() {
    localStorage.setItem(
        "usuarios",
        JSON.stringify(usuarios)
    );
}


// Mostrar los usuarios en la tabla

function mostrarUsuarios() {
    cuerpoTablaUsuarios.innerHTML = "";

    if (usuarios.length === 0) {
        mensajeSinUsuarios.style.display = "block";
        return;
    }

    mensajeSinUsuarios.style.display = "none";

    for (let i = 0; i < usuarios.length; i++) {
        const usuario = usuarios[i];

        const filaUsuario =
            document.createElement("tr");

        filaUsuario.innerHTML = `
            <td>${usuario.run}</td>

            <td>
                ${usuario.nombre} ${usuario.apellidos}
            </td>

            <td>${usuario.correo}</td>

            <td>${usuario.tipoUsuario}</td>

            <td class="acciones_tabla_admin">

                <button
                    type="button"
                    class="btn_mostrar_usuario"
                    data-id="${usuario.id}"
                >
                    Mostrar
                </button>

                <button
                    type="button"
                    class="btn_editar_usuario"
                    data-id="${usuario.id}"
                >
                    Editar
                </button>

                <button
                    type="button"
                    class="btn_eliminar_usuario"
                    data-id="${usuario.id}"
                >
                    Eliminar
                </button>

            </td>
        `;

        cuerpoTablaUsuarios.appendChild(
            filaUsuario
        );
    }

    conectarBotonesUsuarios();
}


// Conectar los botones creados mediante JavaScript

function conectarBotonesUsuarios() {
    const botonesMostrar =
        document.querySelectorAll(
            ".btn_mostrar_usuario"
        );

    const botonesEditar =
        document.querySelectorAll(
            ".btn_editar_usuario"
        );

    const botonesEliminar =
        document.querySelectorAll(
            ".btn_eliminar_usuario"
        );


    for (let i = 0; i < botonesMostrar.length; i++) {
        botonesMostrar[i].addEventListener(
            "click",
            function () {
                const idUsuario =
                    Number(
                        botonesMostrar[i].dataset.id
                    );

                mostrarDetalleUsuario(idUsuario);
            }
        );
    }


    for (let i = 0; i < botonesEditar.length; i++) {
        botonesEditar[i].addEventListener(
            "click",
            function () {
                const idUsuario =
                    Number(
                        botonesEditar[i].dataset.id
                    );

                editarUsuario(idUsuario);
            }
        );
    }


    for (let i = 0; i < botonesEliminar.length; i++) {
        botonesEliminar[i].addEventListener(
            "click",
            function () {
                const idUsuario =
                    Number(
                        botonesEliminar[i].dataset.id
                    );

                eliminarUsuario(idUsuario);
            }
        );
    }
}


// Buscar un usuario por su identificador

function buscarUsuario(idUsuario) {
    for (let i = 0; i < usuarios.length; i++) {
        if (usuarios[i].id === idUsuario) {
            return usuarios[i];
        }
    }

    return null;
}


// Guardar el usuario seleccionado para mostrarlo

function mostrarDetalleUsuario(idUsuario) {
    const usuario = buscarUsuario(idUsuario);

    localStorage.setItem(
        "usuarioSeleccionadoAdmin",
        JSON.stringify(usuario)
    );

    window.location.href =
        "usuario_detalle.html";
}


// Guardar el identificador del usuario que se editará

function editarUsuario(idUsuario) {
    localStorage.setItem(
        "usuarioEditarId",
        idUsuario
    );

    window.location.href =
        "usuario_formulario.html";
}


// Eliminar un usuario

function eliminarUsuario(idUsuario) {
    const usuario = buscarUsuario(idUsuario);

    const confirmarEliminacion = confirm(
        "¿Desea eliminar al usuario " +
        usuario.nombre +
        " " +
        usuario.apellidos +
        "?"
    );

    if (confirmarEliminacion) {
        for (let i = 0; i < usuarios.length; i++) {
            if (usuarios[i].id === idUsuario) {
                usuarios.splice(i, 1);
                break;
            }
        }

        guardarUsuarios();
        mostrarUsuarios();

        alert(
            "Usuario eliminado correctamente."
        );

        console.log(
            "Usuario eliminado: " +
            usuario.correo
        );
    }
}


// Ejecutar al cargar la página

mostrarUsuarios();