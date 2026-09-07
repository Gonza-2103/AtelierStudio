document.addEventListener("DOMContentLoaded", function () {
    const formLogin = document.querySelector(".campos_login");
    const inputCorreo = document.getElementById("correo");
    const inputClave = document.getElementById("clave");
    const btnRegistro = document.getElementById("btnRegistro");
    const btnAdmin = document.querySelector(".btn_admin");

    // Dominios autorizados
    const dominiosPermitidos = [
        "@duoc.cl",
        "@profesor.duoc.cl",
        "@gmail.com",
        "@admin.cl"
    ];

    // Redirección a registro de usuario
    if (btnRegistro) {
        btnRegistro.addEventListener("click", function () {
            window.location.href = "registro_usuario.html";
        });
    }

    // Confirmación de acceso administrador (botón con ícono de escudo)
    if (btnAdmin) {
        btnAdmin.addEventListener("click", function () {
            const esAdmin = confirm("Área restringida. ¿Confirmas que eres administrador del sistema?");

            if (esAdmin) {
                // Se guarda la autorización
                sessionStorage.setItem("modoAdminActivado", "true");
                alert("Acceso administrador habilitado. Ahora ingrese su cuenta @admin.cl y contraseña en el formulario.");
                
                // NO recargamos la página para no perder el estado. Llevamos el foco al campo:
                if (inputCorreo) {
                    inputCorreo.focus();
                }
            }
        });
    }

    // Validación y envío del formulario
    if (formLogin) {
        formLogin.addEventListener("submit", function (evento) {
            evento.preventDefault();

            const correo = inputCorreo.value.trim().toLowerCase();
            const clave = inputClave.value.trim();

            // Validación de casillas vacías
            if (correo === "" || clave === "") {
                alert("Ambas casillas deben completarse antes de entrar.");
                return;
            }

            // Comprobar dominio permitido
            const dominioValido = dominiosPermitidos.some(dominio => correo.endsWith(dominio));

            if (!dominioValido) {
                alert("Correo no válido. Solo se permiten dominios: @duoc.cl, @profesor.duoc.cl, @gmail.com o @admin.cl.");
                return;
            }

            // Validar largo de contraseña (entre 8 y 10 caracteres)
            const largoClaveValido = clave.length >= 8 && clave.length <= 10;

            if (!largoClaveValido) {
                alert("La contraseña debe contener entre 8 y 10 caracteres.");
                return;
            }

            // Usuarios predeterminados del sistema
            const usuariosPredeterminados = [
                {
                    nombre: "Daniela",
                    apellidos: "Muñoz",
                    correo: "daniela.munoz@admin.cl",
                    contrasena: "holiholi",
                    rol: "Administrador"
                },
                {
                    nombre: "Camila",
                    apellidos: "Fernández",
                    correo: "camila.fernandez@gmail.com",
                    contrasena: "nanonano",
                    rol: "Cliente"
                }
            ];

            // Cargar usuarios desde localStorage (tanto lista grupal como registro individual)
            let usuariosGuardados = JSON.parse(localStorage.getItem("usuarios")) || [];
            const usuarioRegistradoIndividual = JSON.parse(localStorage.getItem("usuarioRegistrado"));

            if (usuarioRegistradoIndividual) {
                usuariosGuardados.push(usuarioRegistradoIndividual);
            }

            // Unir todos los usuarios disponibles (predeterminados + guardados)
            const todosLosUsuarios = [...usuariosPredeterminados, ...usuariosGuardados];

            // Búsqueda flexible de usuario verificando todas las posibles claves de contraseña
            let usuarioEncontrado = null;

            for (let i = 0; i < todosLosUsuarios.length; i++) {
                const u = todosLosUsuarios[i];
                if (!u || !u.correo) continue;

                const correoBD = u.correo.trim().toLowerCase();
                const claveBD = (u.contrasena || u.clave || u.password || u.contraseña || "").trim();

                if (correoBD === correo && claveBD === clave) {
                    usuarioEncontrado = u;
                    break;
                }
            }

            if (!usuarioEncontrado) {
                alert("Correo o contraseña incorrectos.");
                return;
            }

            // Guardar usuario que inició sesión
            sessionStorage.setItem("usuarioActivo", JSON.stringify(usuarioEncontrado));

            // Redirección según rol
            if (usuarioEncontrado.rol === "Administrador" || correo.endsWith("@admin.cl")) {
                sessionStorage.removeItem("modoAdminActivado");
                window.location.href = "../admin/admin.html";
            } else if (usuarioEncontrado.rol === "Vendedor") {
                window.location.href = "../admin/productos_admin.html";
            } else {
                window.location.href = "portada.html";
            }
        });
    }
});

