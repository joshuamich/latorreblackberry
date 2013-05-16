/* 
 * Javascript para la sección de calculadora
 */

var anchotext = anchopantalla * 0.125;
var altocalculadora = anchopantalla * 0.50;
var altotextS = anchotext + "px";
var calculadora = document.getElementById("calculadora");
calculadora.style.height = altocalculadora + "px";

/*********** Variables de estado *********/

var estadoOperacion = false;
var valorTemporal = null;
var operacionActiva = null;

/*********** Variables de estado *********/

function setNumero(e) {
    var numero = e.innerHTML;
    var resultadoImpreso = document.getElementById("resultadoImpreso");
    if (estadoOperacion === false) {
        if (resultadoImpreso.value === "0") {
            resultadoImpreso.value = numero;
        } else {
            resultadoImpreso.value = resultadoImpreso.value + numero
        }
    } else if (estadoOperacion === true) {
        resultadoImpreso.value = numero;
        estadoOperacion = false;
    }
}

function setDecimal() {
    var resultadoImpreso = document.getElementById("resultadoImpreso");
    var n = resultadoImpreso.value.indexOf(".");
    if(n===-1){
        resultadoImpreso.value = resultadoImpreso.value + ".";
    }else {
        
    }
    
}

function borrarCaracter() {
    var resultadoImpreso = document.getElementById("resultadoImpreso");
    var resultadoImpresoString = resultadoImpreso.value;
    if (resultadoImpreso.value === "0") {
        valorTemporal = 0;
        operacionActiva = null;
    } else if (resultadoImpresoString.length == 1) {
        document.getElementById("resultadoImpreso").value = "0";
    } else if (resultadoImpresoString.length == 2 & resultadoImpresoString.substr(0, 1) == "-") {
        document.getElementById("resultadoImpreso").value = "0";
    } else if (resultadoImpreso.value > 9 || resultadoImpreso.value < 9) {
        fraccion = resultadoImpreso.value.split('');
        var nuevoValor = "";
        for (i = 0; i < (fraccion.length - 1); i++) {
            nuevoValor = nuevoValor + "" + fraccion[i];
        }
        document.getElementById("resultadoImpreso").value = nuevoValor;
    }
}

function sumar() {
    var resultadoImpreso = document.getElementById("resultadoImpreso");
    if (valorTemporal === null) {
        valorTemporal = resultadoImpreso.value;
    } else {
        valorTemporal = parseFloat(valorTemporal) + parseFloat(resultadoImpreso.value);
        resultadoImpreso.value = valorTemporal.toFixed(2);
    }
    estadoOperacion = true;
    operacionActiva = "+";
}

function restar() {
    var resultadoImpreso = document.getElementById("resultadoImpreso");
    if (valorTemporal === null) {
        valorTemporal = resultadoImpreso.value;
    } else {
        valorTemporal = parseFloat(valorTemporal) - parseFloat(resultadoImpreso.value);
        resultadoImpreso.value = valorTemporal.toFixed(2);
    }
    estadoOperacion = true;
    operacionActiva = "-";
}

function multiplicacion() {
    var resultadoImpreso = document.getElementById("resultadoImpreso");
    if (valorTemporal === null) {
        valorTemporal = resultadoImpreso.value;
    } else {
        valorTemporal = parseFloat(valorTemporal) * parseFloat(resultadoImpreso.value);
        resultadoImpreso.value = valorTemporal.toFixed(2);
    }
    estadoOperacion = true;
    operacionActiva = "X";
}

function division() {
    var resultadoImpreso = document.getElementById("resultadoImpreso");
    if (valorTemporal === null) {
        valorTemporal = resultadoImpreso.value;
        estadoOperacion = true;
        operacionActiva = "/";
    } else {
        if (resultadoImpreso.value === "0") {
            alert("No es posible la división entre 0");
            operacionActiva = null;
        } else {
            valorTemporal = parseFloat(valorTemporal) / parseFloat(resultadoImpreso.value);
            resultadoImpreso.value = valorTemporal.toFixed(2);
            estadoOperacion = true;
            operacionActiva = "/";
        }
    }
}

function operar(n) {
    if (operacionActiva == null) {
        switch (n.innerHTML) {
            case "+":
                sumar();
                break;
            case "-":
                restar();
                break;
            case "X":
                multiplicacion();
                break;
            case "/":
                division();
                break;
        }
    } else {
        switch (operacionActiva) {
            case "+":
                sumar();
                operacionActiva = n.innerHTML;
                break;
            case "-":
                restar();
                operacionActiva = n.innerHTML;
                break;
            case "X":
                multiplicacion();
                operacionActiva = n.innerHTML;
                break;
            case "/":
                division();
                operacionActiva = n.innerHTML;
                break;
        }
        if (n.innerHTML === "=") {
            operacionActiva = null;
            valorTemporal = null;
        }
    }
}