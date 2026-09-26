document.addEventListener("DOMContentLoaded", () => {

    /* ================= ELEMENTOS ================= */

    const botonMenu = document.querySelector("header > .fa-bars");
    const enlaces = document.querySelectorAll("nav li a");
    const body = document.body;
    const usuario = document.querySelector(".usuario");
    const main = document.querySelector("main");


    /* ================= USUARIO ACTIVO ================= */

    const nombreActivo = localStorage.getItem("nombreActivo");

    if (nombreActivo) {
        document.querySelector(".usuario span").textContent = "Hola, " + nombreActivo;
    }


    /* ================= BOTON HAMBURGUESA ================= */

    botonMenu.addEventListener("click", () => {
        body.classList.toggle("menu-cerrado");
    });


    /* ================= CERRAR SESION ================= */

    usuario.addEventListener("click", () => {

        const confirmar = confirm("¿Deseas cerrar sesión?");

        if (confirmar) {
            localStorage.removeItem("usuarioActivo");
            localStorage.removeItem("rolActivo");
            window.location.href = "login.html";
        }
    });


    /* =================================================
       ACTUALIZACIONES

       Cada vez que se agrega algo nuevo, se corrige un
       error o se arregla una funcion, se agrega un
       objeto aqui con la version y los cambios. El
       numero de la campana es la cantidad de items de
       esta lista; si esta vacia, no se muestra nada.
    ================================================= */

    const actualizaciones = [
        { version: "1.2.0", cambios: "Se agregó el botón de notificaciones para mostrar las novedades de la app." },
    ];

    const spanNotificaciones = document.querySelector(".notificaciones span");

    if (actualizaciones.length > 0) {

        spanNotificaciones.textContent = actualizaciones.length;

        const panel = document.createElement("div");
        panel.className = "panel-notificaciones";

        panel.innerHTML = actualizaciones.map((item) => `
            <div class="panel-notificaciones-item">
                <div class="panel-notificaciones-version">Versión ${item.version}</div>
                <div class="panel-notificaciones-cambios">${item.cambios}</div>
            </div>
        `).join("");

        const notificaciones = document.querySelector(".notificaciones");
        notificaciones.appendChild(panel);

        notificaciones.addEventListener("click", (event) => {
            event.stopPropagation();
            panel.classList.toggle("activo");
            notificaciones.classList.add("vista"); // oculta el numero al abrir el panel
        });

        document.addEventListener("click", () => {
            panel.classList.remove("activo");
        });

    } else {

        spanNotificaciones.style.display = "none";
    }


    /* =====================================================
       CALCULADORAS
    ===================================================== */

    function calcularSuperficie(ancho, largo) {
        return ancho * largo;
    }

    function calcularVolumen(espesor, ancho, largo) {
        return espesor * ancho * largo;
    }

    function crearCalculadora(titulo, subtitulo, icono, contenido, resultados) {

        main.innerHTML = `
            <div class="muro-calculadora">

                <div class="muro-titulo">
                    <img src="${icono}" alt="Icono">
                    <div class="muro-titulo-texto">
                        <h2>${titulo}</h2>
                        <p>${subtitulo}</p>
                    </div>
                </div>

                <div class="muro-paneles">

                    <div class="muro-datos">
                        ${contenido}
                    </div>

                    <div class="muro-resultados">

                        <div class="muro-resultados-titulo">
                            <i class="fa-solid fa-calculator"></i>
                            <span>Resultados</span>
                        </div>

                        ${resultados}

                    </div>

                </div>
            </div>
        `;
    }

    function mostrarMuro() {

        crearCalculadora(
            "Calcular muro de ladrillo",
            "Ingresa los datos para calcular los materiales necesarios",
            "img/nav/muro.ico",

            `
                <label class="muro-label">Espesor del muro</label>

                <div class="muro-espesores">

                    <label class="muro-espesor-opcion">
                        <input type="radio" name="muroEspesor" value="20" checked>
                        <span class="muro-radio"></span>
                        20 cm
                    </label>

                    <label class="muro-espesor-opcion">
                        <input type="radio" name="muroEspesor" value="30">
                        <span class="muro-radio"></span>
                        30 cm
                    </label>

                </div>

                <label class="muro-label">Largo del muro (m)</label>

                <div class="muro-campo">
                    <span class="muro-icono-campo">📏</span>
                    <input type="number" id="muroLargo" placeholder="Ej: 5" min="0" step="0.01">
                </div>

                <label class="muro-label">Alto del muro (m)</label>

                <div class="muro-campo">
                    <span class="muro-icono-campo">↕</span>
                    <input type="number" id="muroAlto" placeholder="Ej: 2.5" min="0" step="0.01">
                </div>

                <button type="button" class="muro-boton" id="calcularMuro">
                    <i class="fa-solid fa-calculator"></i>
                    Calcular
                </button>
            `,

            `
                <div class="muro-superficie">
                    <span>Superficie del muro</span>
                    <strong id="resultadoSuperficie">0.00 m²</strong>
                </div>

                <div class="muro-materiales">

                    <div class="muro-material">
                        <span>Cemento</span>
                        <span id="resultadoCemento">0.00 kg</span>
                    </div>

                    <div class="muro-material">
                        <span>Arena</span>
                        <span id="resultadoArena">0.00 m³</span>
                    </div>

                    <div class="muro-material">
                        <span>Ladrillos</span>
                        <span id="resultadoLadrillos">0 unidades</span>
                    </div>

                </div>
            `
        );

        document.querySelector("#calcularMuro").addEventListener("click", () => {

            const largo = parseFloat(document.querySelector("#muroLargo").value);
            const alto = parseFloat(document.querySelector("#muroAlto").value);

            if (isNaN(largo) || isNaN(alto) || largo <= 0 || alto <= 0) {
                alert("Ingresa valores válidos para el largo y el alto del muro.");
                return;
            }

            const superficie = calcularSuperficie(largo, alto);
            const espesor = document.querySelector('input[name="muroEspesor"]:checked').value;

            let cemento, arena, ladrillos;

            if (espesor === "20") {
                cemento = superficie * 10.9;
                arena = superficie * 0.09;
                ladrillos = Math.ceil(superficie * 90);
            } else {
                cemento = superficie * 15.2;
                arena = superficie * 0.115;
                ladrillos = Math.ceil(superficie * 120);
            }

            document.querySelector("#resultadoSuperficie").textContent = superficie.toFixed(2) + " m²";
            document.querySelector("#resultadoCemento").textContent = cemento.toFixed(2) + " kg";
            document.querySelector("#resultadoArena").textContent = arena.toFixed(3) + " m³";
            document.querySelector("#resultadoLadrillos").textContent = ladrillos + " unidades";
        });
    }

    function mostrarViga() {

        crearCalculadora(
            "Calcular viga de hormigón",
            "Ingresa el largo de la viga para calcular los materiales",
            "img/nav/viga.ico",

            `
                <label class="muro-label">Largo de la viga (m)</label>

                <div class="muro-campo">
                    <span class="muro-icono-campo">📏</span>
                    <input type="number" id="vigaLargo" placeholder="Ej: 5" min="0" step="0.01">
                </div>

                <button type="button" class="muro-boton" id="calcularViga">
                    <i class="fa-solid fa-calculator"></i>
                    Calcular
                </button>
            `,

            `
                <div class="muro-materiales">

                    <div class="muro-material">
                        <span>Cemento</span>
                        <span id="vigaCemento">0.00 kg</span>
                    </div>

                    <div class="muro-material">
                        <span>Arena</span>
                        <span id="vigaArena">0.000 m³</span>
                    </div>

                    <div class="muro-material">
                        <span>Piedra</span>
                        <span id="vigaPiedra">0.000 m²</span>
                    </div>

                    <div class="muro-material">
                        <span>Hierro del 8</span>
                        <span id="vigaHierro8">0.00 m</span>
                    </div>

                    <div class="muro-material">
                        <span>Hierro del 4</span>
                        <span id="vigaHierro4">0.00 m</span>
                    </div>

                </div>
            `
        );

        document.querySelector("#calcularViga").addEventListener("click", () => {

            const largo = parseFloat(document.querySelector("#vigaLargo").value);

            if (isNaN(largo) || largo <= 0) {
                alert("Ingresa un largo válido para la viga.");
                return;
            }

            document.querySelector("#vigaCemento").textContent = (largo * 9).toFixed(2) + " kg";
            document.querySelector("#vigaArena").textContent = (largo * 0.02).toFixed(3) + " m³";
            document.querySelector("#vigaPiedra").textContent = (largo * 0.02).toFixed(3) + " m²";
            document.querySelector("#vigaHierro8").textContent = (largo * 4).toFixed(2) + " m";
            document.querySelector("#vigaHierro4").textContent = (largo * 3).toFixed(2) + " m";
        });
    }

    function mostrarColumna() {

        crearCalculadora(
            "Calcular columna de hormigón",
            "Ingresa el largo de la columna para calcular los materiales",
            "img/nav/columna.ico",

            `
                <label class="muro-label">Largo de la columna (m)</label>

                <div class="muro-campo">
                    <span class="muro-icono-campo">↕</span>
                    <input type="number" id="columnaLargo" placeholder="Ej: 3" min="0" step="0.01">
                </div>

                <button type="button" class="muro-boton" id="calcularColumna">
                    <i class="fa-solid fa-calculator"></i>
                    Calcular
                </button>
            `,

            `
                <div class="muro-materiales">

                    <div class="muro-material">
                        <span>Cemento</span>
                        <span id="columnaCemento">0.00 kg</span>
                    </div>

                    <div class="muro-material">
                        <span>Arena</span>
                        <span id="columnaArena">0.000 m³</span>
                    </div>

                    <div class="muro-material">
                        <span>Piedra</span>
                        <span id="columnaPiedra">0.000 m²</span>
                    </div>

                    <div class="muro-material">
                        <span>Hierro del 10</span>
                        <span id="columnaHierro10">0.00 m</span>
                    </div>

                    <div class="muro-material">
                        <span>Hierro del 4</span>
                        <span id="columnaHierro4">0.00 m</span>
                    </div>

                </div>
            `
        );

        document.querySelector("#calcularColumna").addEventListener("click", () => {

            const largo = parseFloat(document.querySelector("#columnaLargo").value);

            if (isNaN(largo) || largo <= 0) {
                alert("Ingresa un largo válido para la columna.");
                return;
            }

            document.querySelector("#columnaCemento").textContent = (largo * 7.5).toFixed(2) + " kg";
            document.querySelector("#columnaArena").textContent = (largo * 0.016).toFixed(3) + " m³";
            document.querySelector("#columnaPiedra").textContent = (largo * 0.016).toFixed(3) + " m²";
            document.querySelector("#columnaHierro10").textContent = (largo * 6).toFixed(2) + " m";
            document.querySelector("#columnaHierro4").textContent = (largo * 3).toFixed(2) + " m";
        });
    }

    function mostrarContrapiso() {

        crearCalculadora(
            "Calcular contrapiso",
            "Ingresa las medidas del contrapiso",
            "img/nav/piso.ico",

            `
                <label class="muro-label">Espesor (m)</label>

                <div class="muro-campo">
                    <span class="muro-icono-campo">↕</span>
                    <input type="number" id="contrapisoEspesor" placeholder="Ej: 0.10" min="0" step="0.01">
                </div>

                <label class="muro-label">Ancho (m)</label>

                <div class="muro-campo">
                    <span class="muro-icono-campo">↔</span>
                    <input type="number" id="contrapisoAncho" placeholder="Ej: 4" min="0" step="0.01">
                </div>

                <label class="muro-label">Largo (m)</label>

                <div class="muro-campo">
                    <span class="muro-icono-campo">📏</span>
                    <input type="number" id="contrapisoLargo" placeholder="Ej: 5" min="0" step="0.01">
                </div>

                <button type="button" class="muro-boton" id="calcularContrapiso">
                    <i class="fa-solid fa-calculator"></i>
                    Calcular
                </button>
            `,

            `
                <div class="muro-superficie">
                    <span>Volumen del contrapiso</span>
                    <strong id="contrapisoVolumen">0.000 m³</strong>
                </div>

                <div class="muro-materiales">

                    <div class="muro-material">
                        <span>Cemento</span>
                        <span id="contrapisoCemento">0.00 kg</span>
                    </div>

                    <div class="muro-material">
                        <span>Arena</span>
                        <span id="contrapisoArena">0.000 m³</span>
                    </div>

                    <div class="muro-material">
                        <span>Piedra</span>
                        <span id="contrapisoPiedra">0.000 m³</span>
                    </div>

                </div>
            `
        );

        document.querySelector("#calcularContrapiso").addEventListener("click", () => {

            const espesor = parseFloat(document.querySelector("#contrapisoEspesor").value);
            const ancho = parseFloat(document.querySelector("#contrapisoAncho").value);
            const largo = parseFloat(document.querySelector("#contrapisoLargo").value);

            if (isNaN(espesor) || isNaN(ancho) || isNaN(largo) || espesor <= 0 || ancho <= 0 || largo <= 0) {
                alert("Ingresa valores válidos para el contrapiso.");
                return;
            }

            const volumen = calcularVolumen(espesor, ancho, largo);

            document.querySelector("#contrapisoVolumen").textContent = volumen.toFixed(3) + " m³";
            document.querySelector("#contrapisoCemento").textContent = (volumen * 105).toFixed(2) + " kg";
            document.querySelector("#contrapisoArena").textContent = (volumen * 0.45).toFixed(3) + " m³";
            document.querySelector("#contrapisoPiedra").textContent = (volumen * 0.9).toFixed(3) + " m³";
        });
    }

    function mostrarTecho() {

        crearCalculadora(
            "Calcular techo",
            "Ingresa las medidas del techo para calcular los materiales",
            "img/nav/techo.ico",

            `
                <label class="muro-label">Espesor (m)</label>

                <div class="muro-campo">
                    <span class="muro-icono-campo">↕</span>
                    <input type="number" id="techoEspesor" placeholder="Ej: 0.10" min="0" step="0.01">
                </div>

                <label class="muro-label">Ancho (m)</label>

                <div class="muro-campo">
                    <span class="muro-icono-campo">↔</span>
                    <input type="number" id="techoAncho" placeholder="Ej: 5" min="0" step="0.01">
                </div>

                <label class="muro-label">Largo (m)</label>

                <div class="muro-campo">
                    <span class="muro-icono-campo">📏</span>
                    <input type="number" id="techoLargo" placeholder="Ej: 8" min="0" step="0.01">
                </div>

                <button type="button" class="muro-boton" id="calcularTecho">
                    <i class="fa-solid fa-calculator"></i>
                    Calcular
                </button>
            `,

            `
                <div class="muro-superficie">
                    <span>Superficie del techo</span>
                    <strong id="techoSuperficie">0.00 m²</strong>
                </div>

                <div class="muro-materiales">

                    <div class="muro-material">
                        <span>Cemento</span>
                        <span id="techoCemento">0.00 kg</span>
                    </div>

                    <div class="muro-material">
                        <span>Arena</span>
                        <span id="techoArena">0.000 m³</span>
                    </div>

                    <div class="muro-material">
                        <span>Piedra</span>
                        <span id="techoPiedra">0.000 m³</span>
                    </div>

                    <div class="muro-material">
                        <span>Hierro del 8</span>
                        <span id="techoHierro8">0.00 m</span>
                    </div>

                    <div class="muro-material">
                        <span>Hierro del 6</span>
                        <span id="techoHierro6">0.00 m</span>
                    </div>

                </div>
            `
        );

        document.querySelector("#calcularTecho").addEventListener("click", () => {

            const ancho = parseFloat(document.querySelector("#techoAncho").value);
            const largo = parseFloat(document.querySelector("#techoLargo").value);
            const espesor = parseFloat(document.querySelector("#techoEspesor").value);

            if (isNaN(espesor) || isNaN(ancho) || isNaN(largo) || espesor <= 0 || ancho <= 0 || largo <= 0) {
                alert("Ingresa valores válidos para el techo.");
                return;
            }

            const superficie = calcularSuperficie(ancho, largo);

            document.querySelector("#techoSuperficie").textContent = superficie.toFixed(2) + " m²";
            document.querySelector("#techoCemento").textContent = (superficie * 33).toFixed(2) + " kg";
            document.querySelector("#techoArena").textContent = (superficie * 0.072).toFixed(3) + " m³";
            document.querySelector("#techoPiedra").textContent = (superficie * 0.072).toFixed(3) + " m³";
            document.querySelector("#techoHierro8").textContent = (superficie * 7).toFixed(2) + " m";
            document.querySelector("#techoHierro6").textContent = (superficie * 4).toFixed(2) + " m";
        });
    }

    function mostrarPisos() {

        crearCalculadora(
            "Calcular pisos",
            "Ingresa las medidas del paño de piso",
            "img/nav/piso.ico",

            `
                <label class="muro-label">Ancho del piso (m)</label>

                <div class="muro-campo">
                    <span class="muro-icono-campo">↔</span>
                    <input type="number" id="pisoAncho" placeholder="Ej: 4" min="0" step="0.01">
                </div>

                <label class="muro-label">Largo del piso (m)</label>

                <div class="muro-campo">
                    <span class="muro-icono-campo">📏</span>
                    <input type="number" id="pisoLargo" placeholder="Ej: 5" min="0" step="0.01">
                </div>

                <button type="button" class="muro-boton" id="calcularPisos">
                    <i class="fa-solid fa-calculator"></i>
                    Calcular
                </button>
            `,

            `
                <div class="muro-superficie">
                    <span>Superficie con 10% extra</span>
                    <strong id="pisoSuperficie">0.00 m²</strong>
                </div>

                <div class="muro-materiales">

                    <div class="muro-material">
                        <span>Superficie original</span>
                        <span id="pisoOriginal">0.00 m²</span>
                    </div>

                    <div class="muro-material">
                        <span>10% adicional</span>
                        <span id="pisoExtra">0.00 m²</span>
                    </div>

                </div>
            `
        );

        document.querySelector("#calcularPisos").addEventListener("click", () => {

            const ancho = parseFloat(document.querySelector("#pisoAncho").value);
            const largo = parseFloat(document.querySelector("#pisoLargo").value);

            if (isNaN(ancho) || isNaN(largo) || ancho <= 0 || largo <= 0) {
                alert("Ingresa valores válidos para el piso.");
                return;
            }

            const superficie = calcularSuperficie(ancho, largo);
            const extra = superficie * 0.10;
            const total = superficie + extra;

            document.querySelector("#pisoOriginal").textContent = superficie.toFixed(2) + " m²";
            document.querySelector("#pisoExtra").textContent = extra.toFixed(2) + " m²";
            document.querySelector("#pisoSuperficie").textContent = total.toFixed(2) + " m²";
        });
    }

    function mostrarPintura() {

        crearCalculadora(
            "Calcular pintura",
            "Ingresa la superficie del muro para calcular la pintura",
            "img/nav/pintura.ico",

            `
                <label class="muro-label">Superficie del muro (m²)</label>

                <div class="muro-campo">
                    <span class="muro-icono-campo">▦</span>
                    <input type="number" id="pinturaSuperficie" placeholder="Ej: 30" min="0" step="0.01">
                </div>

                <button type="button" class="muro-boton" id="calcularPintura">
                    <i class="fa-solid fa-calculator"></i>
                    Calcular
                </button>
            `,

            `
                <div class="muro-superficie">
                    <span>Pintura necesaria</span>
                    <strong id="pinturaLitros">0.00 L</strong>
                </div>

                <div class="muro-materiales">

                    <div class="muro-material">
                        <span>Rendimiento</span>
                        <span>6 m² / litro</span>
                    </div>

                </div>
            `
        );

        document.querySelector("#calcularPintura").addEventListener("click", () => {

            const superficie = parseFloat(document.querySelector("#pinturaSuperficie").value);

            if (isNaN(superficie) || superficie <= 0) {
                alert("Ingresa una superficie válida.");
                return;
            }

            const litros = superficie / 6;

            document.querySelector("#pinturaLitros").textContent = litros.toFixed(2) + " L";
        });
    }


    /* ================= NAVEGACION DEL MENU ================= */

    enlaces.forEach((enlace) => {

        enlace.addEventListener("click", (event) => {

            event.preventDefault();

            enlaces.forEach((item) => item.classList.remove("active"));
            enlace.classList.add("active");

            const destino = enlace.getAttribute("href");

            if (destino === "#muro") {
                mostrarMuro();
            } else if (destino === "#viga") {
                mostrarViga();
            } else if (destino === "#columna") {
                mostrarColumna();
            } else if (destino === "#contrapiso") {
                mostrarContrapiso();
            } else if (destino === "#piso") {
                mostrarPisos();
            } else if (destino === "#techo") {
                mostrarTecho();
            } else if (destino === "#pintura") {
                mostrarPintura();
            }
        });
    });
});