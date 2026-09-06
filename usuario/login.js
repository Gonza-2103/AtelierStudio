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

            const correo = inputCorreo.value.trim();
            const clave = inputClave.value;

            // 1. Validación de casillas vacías
            if (correo === "" || clave === "") {
                alert("Ambas casillas deben completarse antes de entrar.");
                return;
            }

            // 2. Comprobar dominio permitido
            const dominioValido = dominiosPermitidos.some(dominio => correo.toLowerCase().endsWith(dominio));

            if (!dominioValido) {
                alert("Correo no válido. Solo se permiten dominios: @duoc.cl, @profesor.duoc.cl, @gmail.com o @admin.cl.");
                return;
            }

            // 3. Validar largo de contraseña (entre 8 y 10 caracteres)
            const largoClaveValido = clave.length >= 8 && clave.length <= 10;

            if (!largoClaveValido) {
                alert("La contraseña debe contener entre 8 y 10 caracteres.");
                return;
            }

            // 4. Validación de tipo de usuario
            if (correo.toLowerCase().endsWith("@admin.cl")) {
                const autorizacionAdmin = sessionStorage.getItem("modoAdminActivado");

                if (autorizacionAdmin !== "true") {
                    alert("No puedes entrar directamente como administrador. Debes usar primero el botón de administrador (escudo).");
                    return;
                }

                // Limpiar permiso de acceso
                sessionStorage.removeItem("modoAdminActivado");

                // Redirección al panel 'admin'
                window.location.assign("../admin/admin.html");

            } else {
                // Usuario estándar
                window.location.assign("portada.html");
            }
        });
    }
});

