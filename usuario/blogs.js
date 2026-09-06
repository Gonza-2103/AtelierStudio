document.addEventListener("DOMContentLoaded", function () {
    const botonCaso1 = document.querySelector(".btn_caso1");
    const botonCaso2 = document.querySelector(".btn_caso2");

    if (botonCaso1) {
        botonCaso1.addEventListener("click", function (evento) {
            evento.preventDefault();
            window.location.href = "detalle_blog1.html";
        });
    }

    if (botonCaso2) {
        botonCaso2.addEventListener("click", function (evento) {
            evento.preventDefault();
            window.location.href = "detalle_blog2.html";
        });
    }
});

