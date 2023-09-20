//cargo en un arreglo las imganes de las banderas. Este sera el orden que se mostrarán
let banderas = ["foto1.jpg", "messi.jpg", "foto3.jpg", "foto4.jpg", "foto5.png"];

//arreglo que guardara la opcion correcta
let correcta = [2,0,3,0,3];

let preguntas = [
    "¿De que día es esta foto?",
    "¿Cuántas Champions League tiene Messi?",
    "¿De que día es esta foto?",
    "¿Que pasó ese día?",
    "¿De que es esta fórmula?"
];


//arreglo que guardara los paises a mostrar en cada jugada
let opciones = [];
//cargo en el arreglo opciones las opciones a mostrar en cada jugada
opciones.push(["5 de octubre de 2022", "4 de octubre de 2022", "6 de octubre de 2022", "7 de octubre de 2022"]);
opciones.push(["4", "5", "2", "3"]);
opciones.push(["5 de septiembre de 2020", "13 de septiembre de 2020", "16 de agosto de 2020", "20 de septiembre de 2020"]);
opciones.push(["Ganó Ecuador", "Se jugó el segundo partido del mundial", "Ganó Qatar", "Todas las anteriores"]);
opciones.push(["Integral de superficie", "Integral por partes", "Integral triple", "Integral de línea"]);

//variable que guarda la posicion actual
let posActual = 0;
//variable que guarda la cantidad acertadas hasta el moemento
let cantidadAcertadas = 0;

function comenzarJuego(){
    //reseteamos las variables
    posActual = 0;
    cantidadAcertadas = 0;
    //activamos las pantallas necesarias
    document.getElementById("pantalla-inicial").style.display = "none";
    document.getElementById("pantalla-juego").style.display = "block";
    cargarBandera();
}

//funcion que carga la siguiente bandera y sus opciones
function cargarBandera() {
    // Controla si se acabaron las banderas
    if (banderas.length <= posActual) {
        terminarJuego();
    } else {
        // Limpia las clases que se asignaron
        limpiarOpciones();

        // Configura la pregunta arriba de la imagen en función de la bandera actual
        document.getElementById("pantalla-juego").querySelector("p").textContent = preguntas[posActual];

        document.getElementById("imgBandera").src = "img/" + banderas[posActual];

        // Configura las opciones en función de la bandera actual
        for (let i = 0; i < 4; i++) {
            document.getElementById("n" + i).innerHTML = opciones[posActual][i];
        }
    }
}

function limpiarOpciones(){
    document.getElementById("n0").className = "nombre";
    document.getElementById("n1").className = "nombre";
    document.getElementById("n2").className = "nombre";
    document.getElementById("n3").className = "nombre";

    document.getElementById("l0").className = "letra";
    document.getElementById("l1").className = "letra";
    document.getElementById("l2").className = "letra";
    document.getElementById("l3").className = "letra";
}

function comprobarRespuesta(opElegida){
    if(opElegida==correcta[posActual]){//acertó
        //agregamos las clases para colocar el color verde a la opcion elegida
        document.getElementById("n" + opElegida).className = "nombre nombreAcertada";
        document.getElementById("l" + opElegida).className = "letra letraAcertada";
        cantidadAcertadas++;
    }else{//no acerto
        //agramos las clases para colocar en rojo la opcion elegida
        document.getElementById("n" + opElegida).className = "nombre nombreNoAcertada";
        document.getElementById("l" + opElegida).className = "letra letraNoAcertada";

        //opcion que era correcta
        document.getElementById("n" + correcta[posActual]).className = "nombre nombreAcertada";
        document.getElementById("l" + correcta[posActual]).className = "letra letraAcertada";
    }
    posActual++;
    //Esperamos 1 segundo y pasamos mostrar la siguiente bandera y sus opciones
    setTimeout(cargarBandera,1000);
}
function terminarJuego() {
    // Oculta la pantalla de juego
    document.getElementById("pantalla-juego").style.display = "none";
    
    // Muestra el mensaje en función del rendimiento del usuario
    let resultadoMensaje = document.getElementById("mensajeResultado");

    if (cantidadAcertadas === 5) {
        resultadoMensaje.textContent = "¡Felicitaciones! Respondiste bien las 5 preguntas.";
        // Muestra el botón "Reclamar Premio" si gana
        document.getElementById("reclamar").style.display = "block";
    } else {
        resultadoMensaje.textContent = "No respondiste correctamente las 5 preguntas. Tonta.";
        // Oculta el botón "Reclamar Premio" si pierde
        document.getElementById("reclamar").style.display = "none";
    }

    // Muestra la pantalla final
    document.getElementById("pantalla-final").style.display = "block";

    // Actualiza la puntuación
    document.getElementById("numCorrectas").innerHTML = cantidadAcertadas;
    document.getElementById("numIncorrectas").innerHTML = banderas.length - cantidadAcertadas;
}


function volverAlInicio(){
    //ocultamos las pantallas y activamos la inicial
    document.getElementById("pantalla-final").style.display = "none";
    document.getElementById("pantalla-inicial").style.display = "block";
    document.getElementById("pantalla-juego").style.display = "none";
}

function reclamarPremio(){
    window.location.href = "premio.html";
}

function volverAJugar(){
    window.location.href = "index.html";
    //ocultamos las pantallas y activamos la inicial
    document.getElementById("pantalla-final").style.display = "none";
    document.getElementById("pantalla-inicial").style.display = "block";
    document.getElementById("pantalla-juego").style.display = "none";
}