class Alumno {
    constructor(nombre, apellido, edad, curso , calificaciones) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.edad = edad;
        this.curso = curso;
        this.calificaciones = calificaciones;
    }
}
class cursos{
}
function monstrarContenido(contenido){
    document.getElementById("contenido-alumno").style.display="none";
    document.getElementById("contenido-curso").style.display="none";

    document.getElementById(contenido).style.display="block";
}

const alumnos = JSON.parse(localStorage.getItem("Alumno"))|| []
function agregarAlumnos(nombre, apellido, edad, curso , calificaciones){
    var nuevoAlumno = new Alumno(nombre, apellido, edad, curso , calificaciones);
    // Si no existe, crea un array vacío en el almacenamiento local
    if(localStorage.getItem("Alumno") === null){
        localStorage.setItem("Alumno", JSON.stringify([]));
    }
    // Obtén el array de objetos Alumno desde el almacenamiento local
    var alumnos = JSON.parse(localStorage.getItem("Alumno"));
    // Agrega el nuevo objeto Alumno al array
    alumnos.push(nuevoAlumno);
    // Guarda el array actualizado en el almacenamiento local
    localStorage.setItem("Alumno", JSON.stringify(alumnos));
    console.log("Nuevo alumno agregado:", nuevoAlumno);
    document.getElementById("contenido-curso").innerHTML = "Curso seleccionado: " + curso;
}

function agregarAlumno() {
    var nombre = document.getElementById("nombre").value;
    var apellido = document.getElementById("apellido").value;
    var edad = parseInt(document.getElementById("edad").value);
    var curso = document.getElementById("cursos").value;
    var calificacion = parseInt(document.getElementById("calificacion").value);

    var tabla = document.getElementById("alumno-tabla");
    var fila = tabla.insertRow();
    var celdaNombre = fila.insertCell();
    var celdaApellido = fila.insertCell();
    var celdaEdad = fila.insertCell();
    var celdaCurso = fila.insertCell();
    var celdaCalificaciones = fila.insertCell();
    celdaNombre.textContent ="" + nombre;
    celdaApellido.textContent ="" + apellido;
    celdaEdad.textContent ="" + edad;
    celdaCurso.textContent ="" + curso || "no hay curso";
    celdaCalificaciones.textContent ="" + calificacion || "Registrarse en un curso";

    var nuevoAlumno = {
        nombre: nombre,
        apellido: apellido,
        edad: edad,
        curso: curso,
        calificaciones: [calificacion],
    };

    var alumnos = JSON.parse(localStorage.getItem("Alumno")) || [];
    alumnos.push(nuevoAlumno);
    localStorage.setItem("Alumno", JSON.stringify(alumnos));
    if(nuevoAlumno.nombre === nombre && nuevoAlumno.apellido === apellido){
    alert("Gracias por registrarte " + nuevoAlumno.nombre + " " + nuevoAlumno.apellido);}
    else{(alert(nuevoAlumno.nombre + " " + nuevoAlumno.apellido + " gracias por entrar al curso de " + nuevoAlumno.curso))}

    ImprimirTablaCurso();
}
function calcularTotalCalificaciones() {
    var tabla = document.getElementById("alumno-tabla");
    var totalCalificaciones = 0;
    for (var i = 1; i < tabla.rows.length; i++) {
        var fila = tabla.rows[i];
        var calificaciones = fila.cells[4].textContent;
        try {
            // Asegurar que el valor de fila.cells[4].textContent sea una cadena JSON válida
            if (calificaciones.trim() === '') {
                throw new Error('La cadena de calificaciones no puede estar vacía');
            }
            calificaciones = JSON.parse(calificaciones);
            if (Array.isArray(calificaciones)) {
                totalCalificaciones += calificaciones.reduce(function(a, b) {
                    return a + b;
                }, 0);
            } else {
                totalCalificaciones += calificaciones;
            }
        } catch (e) {
            console.error('Error al calcular el total de calificaciones:', e);
        }
    }
    var totalCalificacionesCell = tabla.rows[0].cells[4];
    totalCalificacionesCell.textContent = ' Calificaciones '; // Vaciar la celda
    alert( "total de calificaciones del alumno: " + totalCalificaciones); // Agregar el total al final
}

function buscarAlumno() {
    var buscar = document.getElementById("buscar").value;
    var tablaAlumno = document.getElementById("alumno-tabla");
    var tablaCurso = document.getElementById("curso-tabla");
    var filasAlumno = tablaAlumno.getElementsByTagName("tr");
    var filasCurso = tablaCurso.getElementsByTagName("tr");

    // La función para buscar en la tabla de cursos
    for (var i = 0; i < filasCurso.length; i++) {
        var fila = filasCurso[i];
        var columnas = fila.getElementsByTagName("td");
        var mostrar = false;

        for (var j = 0; j < columnas.length; j++) {
            var columna = columnas[j];
            if (columna.textContent.toLowerCase().indexOf(buscar.toLowerCase()) > -1) {
                mostrar = true;
                break;
            }
        }

        if (mostrar) {
            fila.style.display = "";
        } else {
            fila.style.display = "none";
        }
    }

    // La función para buscar en la tabla de alumnos
    for (var i = 0; i < filasAlumno.length; i++) {
        var fila = filasAlumno[i];
        var columnas = fila.getElementsByTagName("td");
        var mostrar = false;

        for (var j = 0; j < columnas.length; j++) {
            var columna = columnas[j];
            if (columna.textContent.toLowerCase().indexOf(buscar.toLowerCase()) > -1) {
                mostrar = true;
                break;
            }
        }

        if (mostrar) {
            fila.style.display = "";
        } else {
            fila.style.display = "none";
        }
    }
}


function ImprimirTablaCurso() {
    var alumno = {
        nombre: document.getElementById("nombre").value,
        apellido: document.getElementById("apellido").value,
        edad: document.getElementById("edad").value,
        curso: document.getElementById("cursos").value,
        calificacion: parseInt(document.getElementById("calificacion").value)
    };

    var tablaCurso = document.getElementById("curso-tabla");
    var existeAlumno = false;

    for (var i = 1; i < tablaCurso.rows.length; i++) {
        if (tablaCurso.rows[i].cells[0].textContent == alumno.nombre &&
            tablaCurso.rows[i].cells[1].textContent == alumno.apellido && 
            tablaCurso.rows[i].cells[2].textContent == alumno.edad) {
            tablaCurso.rows[i].cells[3].textContent = alumno.curso;
            tablaCurso.rows[i].cells[4].textContent = alumno.calificacion;
            existeAlumno = true;
            break;
        }
    }

    if (!existeAlumno) {
        var fila = tablaCurso.insertRow();
        var celdaNombre = fila.insertCell();
        var celdaApellido = fila.insertCell();
        var celdaEdad = fila.insertCell();
        var celdaCurso = fila.insertCell();
        var celdaCalificaciones = fila.insertCell();
        celdaNombre.textContent = "" + alumno.nombre;
        celdaApellido.textContent = "" + alumno.apellido;
        celdaEdad.textContent = "" + alumno.edad;
        celdaCurso.textContent = alumno.curso;
        celdaCalificaciones.textContent =  "" + alumno.calificacion || "no hay calificacion";
    }
}
function RemplazarTablaAlumno() {
    var alumno = {
        nombre: document.getElementById("nombre").value,
        apellido: document.getElementById("apellido").value,
        edad: document.getElementById("edad").value,
        curso: document.getElementById("cursos").value,
        calificacion: parseInt(document.getElementById("calificacion").value)
    };

    var tablaCurso = document.getElementById("alumno-tabla");
    var existeAlumno = false;

    for (var i = 1; i < tablaCurso.rows.length; i++) {
        if (tablaCurso.rows[i].cells[0].textContent == alumno.nombre &&
            tablaCurso.rows[i].cells[1].textContent == alumno.apellido && 
            tablaCurso.rows[i].cells[2].textContent == alumno.edad) {
            tablaCurso.rows[i].cells[3].textContent = alumno.curso;
            tablaCurso.rows[i].cells[4].textContent = alumno.calificacion;
            existeAlumno = true;
            break;
        }
    }

    if (!existeAlumno) {
        var fila = tablaCurso.insertRow();
        var celdaNombre = fila.insertCell();
        var celdaApellido = fila.insertCell();
        var celdaEdad = fila.insertCell();
        var celdaCurso = fila.insertCell();
        var celdaCalificaciones = fila.insertCell();
        celdaNombre.textContent = alumno.nombre;
        celdaApellido.textContent = alumno.apellido;
        celdaEdad.textContent = alumno.edad;
        celdaCurso.textContent = alumno.curso;
        celdaCalificaciones.textContent = alumno.calificacion ;
    }
}
function getLocalStorage(){
    const local = JSON.parse(localStorage.getItem("Alumno"));
    localStorage.setItem("Curso", JSON.stringify(cursos));
    console.log(local)
}
function showCourses() {
    var selectContainer = document.getElementById("selectContainer");
    selectContainer.style.display = "block";
   
    var modal = document.getElementById("myModal1");
    modal.style.display = "block";
   }
   
   // Cambia a modal para ocultarlo cuando el usuario hace clic fuera de él
   window.onclick = function(event) {
    if (event.target == document.getElementById("myModal1")) {
       document.getElementById("myModal1").style.display = "none";
       document.getElementById("selectContainer").style.display = "none";
    }
   }
   function agregarCalificacion() {
    var selectContainer2 = document.getElementById("selectContainer2");
    selectContainer2.style.display = "block";
   
    var modal2 = document.getElementById("myModal2");
    modal2.style.display = "block";
}
window.onclick = function(event) {
    if (event.target == document.getElementById("myModal2")) {
       document.getElementById("myModal2").style.display = "none";
       document.getElementById("selectContainer2").style.display = "none";
    }
   }



