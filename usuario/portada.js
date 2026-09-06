document.addEventListener("DOMContentLoaded", function() {
    const btnCerrarSesion = document.getElementById("btnCerrarSesion");

    if (btnCerrarSesion) {
        btnCerrarSesion.addEventListener("click", function (evento) {
            evento.preventDefault();
            const respuesta = confirm("¿Estás seguro que le gustaría cerrar sesión?");

            if (respuesta) {
                window.location.href = "login.html";
            }
        });
    }
});