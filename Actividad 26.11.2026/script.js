// RECUPERAR DATOS DEL NAVEGADOR
let juegos = JSON.parse(localStorage.getItem("juegos")) || [];

let actualizacion = JSON.parse(
  localStorage.getItem("actualizaciones")
) || [];

let opiniones = JSON.parse(
  localStorage.getItem("opiniones")
) || [];

// CAMBIAR DE SECCION
function mostrar(id) {
  let secciones = document.querySelectorAll(".seccion");

  secciones.forEach(function(seccion) {
    seccion.classList.remove("activa");
  });

  document.getElementById(id).classList.add("activa");
  actualizarPantalla();
}

// GUARDAR DATOS
function guardarDatos() {
  localStorage.setItem("juegos", JSON.stringify(juegos));

  localStorage.setItem(
    "actualizaciones",
    JSON.stringify(actualizaciones)
  );

  localStorage.setItem("opiniones", JSON.stringify(opiniones));
}

// PUBLICAR VIDEOJUEGO
function publicar() {
  let nombre = document.getElementById("nombre").value.trim();
  let version = document.getElementById("version").value.trim();
  let plataforma = document.getElementById("plataforma").value;
  let descripcion = document.getElementById("descripcion").value.trim();
  let optimizacion = document.getElementById("optimizacion").value;
  let firma = document.getElementById("firma").value;

  if (!nombre || !version || !descripcion) {
    alert("Completa todos los datos del videojuego.");
    return;
  }

  if (optimizacion !== "Completada" || firma !== "Verificada") {
    alert("Completa la optimización y verifica la firma antes de publicar.");
    return;
  }

  let juego = {
    nombre: nombre,
    version: version,
    plataforma: plataforma,
    descripcion: descripcion,
    estado: "Publicado"
  };

  juegos.push(juego);
  guardarDatos();

  document.getElementById("resultadoPublicacion").textContent =
    "¡Videojuego publicado correctamente!";

  document.getElementById("nombre").value = "";
  document.getElementById("version").value = "";
  document.getElementById("descripcion").value = "";
  actualizarPantalla();
}

// REGISTRAR ACTUALIZACION
function registrarActualizacion() {
  let tipo = document.getElementById("tipoActualizacion").value;
  let detalle = document.getElementById("detalleActualizacion").value.trim();
  let version = document.getElementById("nuevaVersion").value.trim();

  if (!detalle || !version) {
    alert("Completa la descripción y la versión.");
    return;
  }

  let actualizacionObj = {
    tipo: tipo,
    detalle: detalle,
    version: version,
    fecha: new Date().toLocaleDateString()
  };

  actualizaciones.push(actualizacionObj);
  guardarDatos();
  document.getElementById("detalleActualizacion").value = "";
  document.getElementById("nuevaVersion").value = "";
  actualizarPantalla();
}

// REGISTRAR OPINION
function registrarFeedback() {
  let usuario = document.getElementById("usuario").value.trim();
  let calificacion = Number(
    document.getElementById("calificacion").value
  );

  let comentario = document.getElementById("comentario").value.trim();

  if (!usuario || !comentario) {
    alert("Completa el nombre y el comentario.");
    return;
  }

  opiniones.push({
    usuario: usuario,
    calificacion: calificacion,
    comentario: comentario
  });

  guardarDatos();
  document.getElementById("usuario").value = "";
  document.getElementById("comentario").value = "";
  actualizarPantalla();
}

// MOSTRAR HISTORIAL DE ACTUALIZACIONES
function mostrarActualizaciones() {
  let contenedor = document.getElementById("listaActualizaciones");
  contenedor.innerHTML = "";

  actualizaciones.forEach(function(item) {
    let registro = document.createElement("div");
    registro.className = "registro";
    let titulo = document.createElement("strong");
    titulo.textContent = item.tipo;
    let detalle = document.createElement("p");
    detalle.textContent =
      "Versión: " + item.version + " | " + item.detalle;
    let fecha = document.createElement("small");
    fecha.textContent = "Fecha: " + item.fecha;
    registro.appendChild(titulo);
    registro.appendChild(detalle);
    registro.appendChild(fecha);
    contenedor.appendChild(registro);
  });
}

// MOSTRAR OPINIONES
function mostrarOpiniones() {
  let contenedor = document.getElementById("listaFeedback");
  contenedor.innerHTML = "";

  opiniones.forEach(function(item) {
    let registro = document.createElement("div");
    registro.className = "registro";
    let titulo = document.createElement("strong");
    titulo.textContent =
      item.usuario + " - " + "⭐".repeat(item.calificacion);
    let texto = document.createElement("p");
    texto.textContent = item.comentario;
    registro.appendChild(titulo);
    registro.appendChild(texto);
    contenedor.appendChild(registro);
  });
}

// ACTUALIZAR ESTADISTICAS
function actualizarEstadisticas() {
  document.getElementById("totalJuegos").textContent = juegos.length;
  document.getElementById("totalActualizaciones").textContent = actualizaciones.length;

  document.getElementById("totalOpiniones").textContent = opiniones.length;
  let suma = 0;

  opiniones.forEach(function(item) {
    suma += item.calificacion;
  });

  let promedio = opiniones.length > 0 ? suma / opiniones.length : 0;
  document.getElementById("promedio").textContent =
    promedio.toFixed(1);
  let propuesta = document.getElementById("propuestas");
  propuesta.innerHTML = "";

  if (opiniones.length === 0) {
    propuesta.textContent = "Se necesitan opiniones para generar propuestas.";
    return;
  }

  if (promedio < 3) {
    propuesta.textContent = "Prioridad: revisar errores y mejorar la experiencia del juego.";
  } else if (promedio < 4) {
    propuesta.textContent = "Prioridad: analizar comentarios y mejorar funcionalidades.";
  } else {
    propuesta.textContent = "Buen resultado. Considerar nuevos niveles y características.";
  }
}

// ACTUALIZAR TODA LA PANTALLA
function actualizarPantalla() {
  mostrarActualizaciones();
  mostrarOpiniones();
  actualizarEstadisticas();
}

// CARGAR INFORMACION AL INICIAR
actualizarPantalla();