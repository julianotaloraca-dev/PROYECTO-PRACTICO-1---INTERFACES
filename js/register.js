document.getElementById('form-registro').addEventListener('submit', function (e) {
    e.preventDefault();

    const correo = e.target.correo.value.trim().toLowerCase();
    const password = e.target.password.value;
    const confirmPassword = e.target['confirm-password'].value;
    const rol = e.target.rol.value;

    if (!correo || !password || !confirmPassword || !rol) {
        alert("Complete todos los campos");
        return;
    }

    if (password !== confirmPassword) {
        alert("Las contraseñas no coinciden");
        return;
    }

    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    const yaExiste = usuarios.some(u => u.correo === correo);

    if (yaExiste) {
        alert("Ese correo ya está registrado");
        return;
    }

    const nombre = extraerNombreDeCorreo(correo);

    usuarios.push({ correo, password, rol, nombre });

    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    alert("Cuenta creada correctamente");
    window.location.href = "../login.html";
});


function extraerNombreDeCorreo(correo) {

    let nombre = correo.split("@")[0];

    nombre = nombre.replace(/[0-9._-]/g, " ").trim();

    if (!nombre) {
        nombre = correo.split("@")[0];
    }

    nombre = nombre.charAt(0).toUpperCase() + nombre.slice(1);

    return nombre;
}