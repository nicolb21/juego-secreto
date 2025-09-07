let listaNumerosSorteados = [];
let numeroSecreto = 0; //luego en condicionesIniciales se cambiará
let intentos = 3; //luego en condicionesIniciales se cambiará
let numeroMaxIntentos = 3;
let numeroMaximoDelSecreto = 10;

//le paso la frase y este asigna un texto al h1 y al parrafo inferior
function asignarTextoElemento(elemento, texto) {
    let elementoHTML = document.querySelector(elemento);
    elementoHTML.innerHTML = texto;
}

//solo da una alerta al apretar el boton
function verificarIntento() {
    //let numeroDeUsuario = document.querySelector('input'); // solo para cuando hay un id

    let numeroDeUsuario = parseInt(document.getElementById('valorUsuario').value); //lo mismo que el anterior pero si tengo mas de un input lo busco por id

    //console.log(typeof(numeroDeUsuario));

    console.log("numeroDeUsuario=", numeroDeUsuario);
    console.log("numeroSecreto=", numeroSecreto); //mostrar en consola el numeroSecreto
    intentos++;
    if (numeroDeUsuario === numeroSecreto) {
        asignarTextoElemento('p', "Acertaste el numero");
        document.getElementById('reiniciar').removeAttribute('disabled');
        document.getElementById('intentar').setAttribute('disabled', 'true');
    }
    else {  //el usuario no acerto
        limpiarCaja();
        if (numeroMaxIntentos == intentos) {
            document.getElementById('intentar').setAttribute('disabled', 'true');
            asignarTextoElemento('p', 'SE AGOTARON TUS INTENTOS');
            if (numeroMaximoDelSecreto == (listaNumerosSorteados.length)) {
                asignarTextoElemento('p', "Ya se sortearon todos los numeros posibles. Actualiza la página");
                document.getElementById('reiniciar').setAttribute('disabled', 'true');
            }
            else {
                document.getElementById('reiniciar').removeAttribute('disabled');
            }
        }
        else
            if (numeroDeUsuario > numeroSecreto) {
                asignarTextoElemento('p', `el numero secreto es menor, Cantidad de intentos restantes= ${numeroMaxIntentos - intentos}`);
            }
            else {
                asignarTextoElemento('p', `el numero secreto es mayor, Cantidad de intentos restantes= ${numeroMaxIntentos - intentos}`);
            }

    }
    console.log("numeroDeUsuario = numeroSecreto=", numeroDeUsuario === numeroSecreto); // true o false === compara el numero y tambien el tipo de datos
    console.log("intentos=", intentos);

};

//funcion que borra el casillero para una mejor experiencia de usuario
function limpiarCaja() {
    //let valorCaja = document.querySelector('#valorUsuario'); // hace lo mismo que gerElementById pero de otra forma
    //valorCaja.value = '';
    document.querySelector('#valorUsuario').value = ''; //otra forma de hacer lo de los 2 reenglones de arriba pero simplificado
};

//nos devuelve un numero aleatoreo
function generarNumeroSecreto() {
    let numeroGenerado = Math.floor(Math.random() * numeroMaximoDelSecreto) + 1;
    console.log("lista=", listaNumerosSorteados);
    if (listaNumerosSorteados.includes(numeroGenerado)) { //include recorre toda la lista y nos da true o false si el valor existe o no  
        return generarNumeroSecreto();
    }
    else {
        listaNumerosSorteados.push(numeroGenerado);
        return numeroGenerado;
    }


};

//seteo parametros iniciales
function condicionesIniciales() {
    asignarTextoElemento('h1', 'Juego del numero secreto');
    asignarTextoElemento('p', `Indica un numero del 1 al ${numeroMaximoDelSecreto}`);
    numeroSecreto = generarNumeroSecreto();
    intentos = 0;
}

function reiniciarJuego() {
    condicionesIniciales();
    limpiarCaja();
    console.log("numeroSecreto=", numeroSecreto);
    document.getElementById('reiniciar').setAttribute('disabled', 'true');
    document.getElementById('intentar').removeAttribute('disabled')

};

condicionesIniciales();