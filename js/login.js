document.getElementById('form-login').addEventListener('submit', function (e) {
    e.preventDefault();

    const correo = e.target.correo.value.trim().toLowerCase();
    const password = e.target.password.value;

    if (!correo || !password) {
        alert("Complete todos los campos");
        return;
    }

    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    const usuario = usuarios.find(u => u.correo === correo && u.password === password);

    if (!usuario) {
        alert("Correo o contraseña incorrectos");
        return;
    }

    localStorage.setItem("usuarioActivo", usuario.correo);
    localStorage.setItem("rolActivo", usuario.rol);
    localStorage.setItem("nombreActivo", usuario.nombre);

    window.location.href = "index.html";
});


let clienteGoogle;

window.addEventListener('load', () => {

    clienteGoogle = google.accounts.oauth2.initTokenClient({
        client_id: "914587244049-9sidqp8b8auuq5bik1vtol3mcpuov68m.apps.googleusercontent.com",
        scope: "openid email profile",
        callback: manejarTokenGoogle
    });

    document.getElementById("btnGoogle").addEventListener("click", () => {
        clienteGoogle.requestAccessToken();
    });

});

async function manejarTokenGoogle(respuesta) {

    const datosUsuario = await fetch(
        "https://www.googleapis.com/oauth2/v3/userinfo",
        { headers: { Authorization: `Bearer ${respuesta.access_token}` } }
    ).then(r => r.json());

    localStorage.setItem("usuarioActivo", datosUsuario.email);
    localStorage.setItem("nombreActivo", datosUsuario.given_name);

    window.location.href = "index.html";
}