/* Forja Gym - Actividad 2 (Unidad 1) */
document.addEventListener("DOMContentLoaded", () => {

  /* 1. Menú móvil */
  const menu = document.getElementById("menu");
  const menuBoton = document.getElementById("menuBoton");
  const iconoMenu = abierto => menuBoton.innerHTML = abierto ? '<i class="fa-solid fa-xmark"></i>' : '<i class="fa-solid fa-bars"></i>';

  menuBoton.addEventListener("click", () => {
    const abierto = menu.classList.toggle("abierto");
    menuBoton.setAttribute("aria-expanded", abierto);
    iconoMenu(abierto);
  });
  menu.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
    menu.classList.remove("abierto");
    menuBoton.setAttribute("aria-expanded", "false");
    iconoMenu(false);
  }));

  /* 2. Botón "Ver más" en las tarjetas */
  document.querySelectorAll("[data-vermas]").forEach(boton => {
    boton.addEventListener("click", () => {
      const extra = boton.parentElement.querySelector(".tarjeta__extra");
      const abrir = extra.hidden;
      extra.hidden = !abrir;
      boton.setAttribute("aria-expanded", abrir);
      boton.querySelector("span").textContent = abrir ? "Ver menos" : "Ver más";
      boton.querySelector("i").className = abrir ? "fa-solid fa-minus" : "fa-solid fa-plus";
    });
  });

  /* 3. Galería de zonas con ventana modal */
  const zonas = [
    { src: "img/fuerza.svg",       alt: "Zona de pesas libres",         titulo: "Sala de pesas",   texto: "Racks de sentadilla, bancos, mancuernas hasta 50 kg y plataforma de peso muerto." },
    { src: "img/cardio.svg",       alt: "Zona de cardio",               titulo: "Zona de cardio",  texto: "20 caminadoras, elípticas y bicicletas con pantalla de frecuencia cardiaca." },
    { src: "img/funcional.svg",    alt: "Zona funcional",               titulo: "Zona funcional",  texto: "Pesas rusas, cuerdas, cajones y trineo para circuitos de cuerpo completo." },
    { src: "img/clases.svg",       alt: "Salón de clases grupales",     titulo: "Salón de clases", texto: "Espacio con espejos y buen sonido para spinning, yoga y baile." },
    { src: "img/recuperacion.svg", alt: "Zona de recuperación",         titulo: "Recuperación",    texto: "Área de estiramiento, rodillos de espuma y pistolas de masaje." }
  ];
  const modal = document.getElementById("modal");
  const modalImg = document.getElementById("modalImg");
  let actual = 0;
  let ultimoBoton = null;

  function mostrar(i) {
    actual = (i + zonas.length) % zonas.length;
    modalImg.src = zonas[actual].src;
    modalImg.alt = zonas[actual].alt;
    document.getElementById("modalTitulo").textContent = zonas[actual].titulo;
    document.getElementById("modalTexto").textContent = zonas[actual].texto;
  }
  function abrir(i, boton) {
    ultimoBoton = boton;
    mostrar(i);
    modal.hidden = false;
    document.body.style.overflow = "hidden";
    document.getElementById("modalCerrar").focus();
  }
  function cerrar() {
    modal.hidden = true;
    document.body.style.overflow = "";
    if (ultimoBoton) ultimoBoton.focus();
  }
  document.querySelectorAll(".galeria__item").forEach(b =>
    b.addEventListener("click", () => abrir(Number(b.dataset.indice), b)));
  document.getElementById("modalCerrar").addEventListener("click", cerrar);
  document.getElementById("modalAnt").addEventListener("click", () => mostrar(actual - 1));
  document.getElementById("modalSig").addEventListener("click", () => mostrar(actual + 1));
  modal.addEventListener("click", e => { if (e.target === modal) cerrar(); });
  document.addEventListener("keydown", e => {
    if (modal.hidden) return;
    if (e.key === "Escape") cerrar();
    if (e.key === "ArrowLeft") mostrar(actual - 1);
    if (e.key === "ArrowRight") mostrar(actual + 1);
  });

  /* 4. Planes: cambia el precio entre mensual y anual */
  const formato = n => "$" + n.toLocaleString("en-US");
  document.querySelectorAll(".selector__op").forEach(boton => boton.addEventListener("click", () => {
    const anual = boton.dataset.periodo === "anual";
    document.querySelectorAll(".selector__op").forEach(b => {
      b.classList.toggle("activo", b === boton);
      b.setAttribute("aria-pressed", b === boton);
    });
    document.querySelectorAll("[data-base]").forEach(precio => {
      const base = Number(precio.dataset.base);
      precio.textContent = formato(anual ? base * 10 : base);   // 12 meses al precio de 10
      precio.nextElementSibling.textContent = anual ? "/año" : "/mes";
    });
    document.querySelectorAll(".plan").forEach(p => {
      p.classList.remove("cambia");
      void p.offsetWidth;
      p.classList.add("cambia");
    });
  }));

  /* 5. Formulario de clase gratis con validación */
  const form = document.getElementById("formulario");
  const error = document.getElementById("formError");
  form.addEventListener("submit", e => {
    e.preventDefault();
    const nombre = form.nombre.value.trim();
    const correo = form.correo.value.trim();
    const meta = form.meta.value;
    let mensaje = "";
    if (nombre.length < 2) mensaje = "Escribe tu nombre.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) mensaje = "Escribe un correo válido, por ejemplo nombre@correo.com.";
    else if (!meta) mensaje = "Selecciona tu meta principal.";

    if (mensaje) {
      error.textContent = mensaje;
      error.hidden = false;
      return;
    }
    form.innerHTML = `<p class="formulario__ok"><i class="fa-solid fa-circle-check"></i> Listo, ${nombre}. Te escribiremos a ${correo} para confirmar tu clase de prueba. Meta registrada: ${meta.toLowerCase()}.</p>`;
  });

  /* 6. Año del pie de página */
  document.getElementById("anio").textContent = new Date().getFullYear();
});
