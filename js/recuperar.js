const form = document.getElementById('form-recuperar');
const btnAccion = document.getElementById('btnAccion');
const cajaNuevaPassword = document.getElementById('cajaNuevaPassword');
const cajaConfirmarPassword = document.getElementById('cajaConfirmarPassword');
const campoCorreo = document.getElementById('correo');

let correoEncontrado = null;

form.addEventListener('submit', function (e) {
    e.preventDefault();

    if (!correoEncontrado) {

        buscarCuenta();

    } else {

        cambiarPassword();

    }
});


function buscarCuenta() {

    const correo = campoCorreo.value.trim().toLowerCase();

    if (!correo) {
        alert("Ingresa tu correo");
        return;
    }

    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    const usuario = usuarios.find(u => u.correo === correo);

    if (!usuario) {
        alert("No existe ninguna cuenta con ese correo");
        return;
    }

    correoEncontrado = correo;

    campoCorreo.disabled = true;

    cajaNuevaPassword.style.display = "block";
    cajaConfirmarPassword.style.display = "block";

    btnAccion.textContent = "Cambiar contraseña";
}


function cambiarPassword() {

    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    if (!password || !confirmPassword) {
        alert("Completa ambos campos de contraseña");
        return;
    }

    if (password !== confirmPassword) {
        alert("Las contraseñas no coinciden");
        return;
    }

    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    const indice = usuarios.findIndex(u => u.correo === correoEncontrado);

    usuarios[indice].password = password;

    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    alert("Contraseña actualizada correctamente");
    window.location.href = "../login.html";
}